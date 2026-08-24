/**
 * BAHO - Génération du ZIP global
 * Pour chaque entreprise (groupe par SIRET) : Convention, Devis, Facture, Règlement intérieur, CGV
 * Format : PDF tamponnés uniquement
 */
import JSZip from "jszip";
import { getBahoEntreprises, FORMAT_SPHERE_ORG, type BahoEntreprise } from "./bahoData";
import { getRIHTML, getCGVHTML, getFactureHTML, getConventionHTML, getDevisHTML, getProgrammeHTML, getConvocationHTML, getCertificatRealisationHTML } from "./bahoStaticDocs";
import { getTestPositionnementDebutHTML, getTestPositionnementFinHTML } from "./bahoTests";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import type { JobReporter } from "@/lib/backgroundJobs";

function safeName(s: string): string {
  return s.replace(/[^\w\-]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").slice(0, 80);
}

/** Build full BAHO ZIP and return as Blob */
export async function buildBahoZip(reporter?: JobReporter, customFsStamp?: string): Promise<Blob> {
  const zip = new JSZip();
  const entreprises = getBahoEntreprises();
  const totalStagiaires = entreprises.reduce((acc, e) => acc + e.stagiaires.length, 0);
  // 6 docs par entreprise + 4 docs par stagiaire (convocation, certificat, 2 tests de positionnement)
  const totalSteps = entreprises.length * 6 + totalStagiaires * 4;
  let step = 0;

  reporter?.setMessage(`Génération de ${entreprises.length} dossiers BAHO…`);

  // README global
  const readmeLines = [
    "BAHO – FORMAT SPHERE",
    "Pack documentaire généré automatiquement",
    "",
    `Organisme : ${FORMAT_SPHERE_ORG.nom}`,
    `SIRET : ${FORMAT_SPHERE_ORG.siret}`,
    `NDA : ${FORMAT_SPHERE_ORG.nda}`,
    "",
    `Nombre d'entreprises : ${entreprises.length}`,
    `Nombre total de stagiaires : ${totalStagiaires}`,
    "",
    "Pour chaque entreprise (PDF uniquement) :",
    " - Programme de formation (PDF tamponné)",
    " - Convention de formation (PDF tamponnée avec liste participants)",
    " - Devis (PDF tamponné)",
    " - Facture (PDF tamponnée avec liste participants + modalité présentiel)",
    " - Règlement intérieur (PDF tamponné)",
    " - CGV (PDF tamponnée)",
    "",
    "Pour chaque stagiaire (PDF tamponné) :",
    " - Convocation individuelle",
    " - Certificat de réalisation individuel",
    " - Test de positionnement de début (score plafonné à 7/10)",
    " - Test de positionnement de fin (score minimum 7/10, progression positive)",
    "",
    "Liste :",
    ...entreprises.map((e, i) => ` ${i + 1}. ${e.nom} – ${e.siret} (${e.stagiaires.length} stagiaires)`),
  ];
  zip.file("README.txt", readmeLines.join("\n"));

  let invoiceCounter = 1;

  for (let i = 0; i < entreprises.length; i++) {
    const e = entreprises[i];
    const folder = zip.folder(`${String(i + 1).padStart(2, "0")}_${safeName(e.nom)}_${e.siret}`)!;
    const baseName = `${safeName(e.nom)}_${e.siret}`;
    const devisNumero = `BAHO-${new Date().getFullYear()}-${String(invoiceCounter++).padStart(3, "0")}`;

    // 1. Programme de formation PDF tamponné
    try {
      reporter?.setMessage(`${e.nom} – Programme de formation…`);
      const progHtml = getProgrammeHTML(e, customFsStamp);
      const progPdf = await htmlToPdfBlob(progHtml);
      folder.file(`Programme_de_formation_${baseName}.pdf`, progPdf);
    } catch (err) {
      console.error("Programme error:", err);
      folder.file(`ERREUR_Programme.txt`, `Erreur génération Programme: ${(err as Error).message}`);
    }
    step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

    // 2. Convention PDF tamponnée
    try {
      reporter?.setMessage(`${e.nom} – Convention PDF tamponnée…`);
      const conventionHtml = getConventionHTML(e, customFsStamp);
      const conventionPdf = await htmlToPdfBlob(conventionHtml);
      folder.file(`Convention_de_formation_${baseName}.pdf`, conventionPdf);
    } catch (err) {
      console.error("Convention error:", err);
      folder.file(`ERREUR_Convention.txt`, `Erreur génération Convention: ${(err as Error).message}`);
    }
    step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

    // 3. Devis PDF tamponné
    try {
      reporter?.setMessage(`${e.nom} – Devis PDF tamponné…`);
      const devisHtml = getDevisHTML(e, devisNumero, customFsStamp);
      const devisPdf = await htmlToPdfBlob(devisHtml);
      folder.file(`Devis_${devisNumero}_${baseName}.pdf`, devisPdf);
    } catch (err) {
      console.error("Devis error:", err);
      folder.file(`ERREUR_Devis.txt`, `Erreur génération Devis: ${(err as Error).message}`);
    }
    step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

    // 4. Facture PDF (tamponnée)
    try {
      reporter?.setMessage(`${e.nom} – Facture PDF…`);
      const factureHTML = getFactureHTML(e, devisNumero, customFsStamp);
      const facturePdf = await htmlToPdfBlob(factureHTML);
      folder.file(`Facture_${devisNumero}_${baseName}.pdf`, facturePdf);
    } catch (err) {
      console.error("Facture PDF error:", err);
      folder.file(`ERREUR_Facture.txt`, `Erreur: ${(err as Error).message}`);
    }
    step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

    // 5. Règlement intérieur PDF — un seul par hôtel (tamponné)
    try {
      reporter?.setMessage(`${e.nom} – Règlement intérieur…`);
      const riHTML = getRIHTML(e, undefined, customFsStamp);
      const riPdf = await htmlToPdfBlob(riHTML);
      folder.file(`Reglement_interieur_${baseName}.pdf`, riPdf);
    } catch (err) {
      console.error("RI error:", err);
      folder.file(`ERREUR_RI.txt`, `Erreur: ${(err as Error).message}`);
    }
    step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

    // 6. CGV PDF (tamponnée)
    try {
      reporter?.setMessage(`${e.nom} – CGV…`);
      const cgvHTML = getCGVHTML(e, customFsStamp);
      const cgvPdf = await htmlToPdfBlob(cgvHTML);
      folder.file(`CGV_${baseName}.pdf`, cgvPdf);
    } catch (err) {
      console.error("CGV error:", err);
      folder.file(`ERREUR_CGV.txt`, `Erreur: ${(err as Error).message}`);
    }
    step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

    // 7. Documents individuels par stagiaire : Convocation + Certificat de réalisation
    const stagiairesFolder = folder.folder("Stagiaires")!;
    for (let si = 0; si < e.stagiaires.length; si++) {
      const s = e.stagiaires[si];
      const stagNameSafe = safeName(`${s.nom}_${s.prenom}`);
      const stagFolder = stagiairesFolder.folder(`${String(si + 1).padStart(2, "0")}_${stagNameSafe}_${s.codeStagiaire}`)!;

      // 7a. Convocation
      try {
        reporter?.setMessage(`${e.nom} – Convocation ${s.prenom} ${s.nom}…`);
        const convocHtml = getConvocationHTML(e, s, customFsStamp);
        const convocPdf = await htmlToPdfBlob(convocHtml);
        stagFolder.file(`Convocation_${stagNameSafe}_${s.codeStagiaire}.pdf`, convocPdf);
      } catch (err) {
        console.error("Convocation error:", err);
        stagFolder.file(`ERREUR_Convocation.txt`, `Erreur: ${(err as Error).message}`);
      }
      step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

      // 7b. Certificat de réalisation
      try {
        reporter?.setMessage(`${e.nom} – Certificat ${s.prenom} ${s.nom}…`);
        const certifHtml = getCertificatRealisationHTML(e, s, customFsStamp);
        const certifPdf = await htmlToPdfBlob(certifHtml);
        stagFolder.file(`Certificat_de_realisation_${stagNameSafe}_${s.codeStagiaire}.pdf`, certifPdf);
      } catch (err) {
        console.error("Certificat error:", err);
        stagFolder.file(`ERREUR_Certificat.txt`, `Erreur: ${(err as Error).message}`);
      }
      step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

      // 7c. Test de positionnement — début
      try {
        reporter?.setMessage(`${e.nom} – Test positionnement début ${s.prenom} ${s.nom}…`);
        const html = getTestPositionnementDebutHTML(e, s, si, customFsStamp);
        const pdf = await htmlToPdfBlob(html);
        stagFolder.file(`Test_positionnement_debut_${stagNameSafe}_${s.codeStagiaire}.pdf`, pdf);
      } catch (err) {
        console.error("Test debut error:", err);
        stagFolder.file(`ERREUR_Test_debut.txt`, `Erreur: ${(err as Error).message}`);
      }
      step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

      // 7d. Test de positionnement — fin
      try {
        reporter?.setMessage(`${e.nom} – Test positionnement fin ${s.prenom} ${s.nom}…`);
        const html = getTestPositionnementFinHTML(e, s, si, customFsStamp);
        const pdf = await htmlToPdfBlob(html);
        stagFolder.file(`Test_positionnement_fin_${stagNameSafe}_${s.codeStagiaire}.pdf`, pdf);
      } catch (err) {
        console.error("Test fin error:", err);
        stagFolder.file(`ERREUR_Test_fin.txt`, `Erreur: ${(err as Error).message}`);
      }
      step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));


      // GC pause every 3 stagiaires
      if (si % 3 === 2) await new Promise((r) => setTimeout(r, 30));
    }

    // Allow GC between entreprises
    if (i % 2 === 1) await new Promise((r) => setTimeout(r, 30));
  }

  reporter?.setMessage("Compression du ZIP…");
  reporter?.setProgress(99);
  // STORE: PDF déjà compressé, DEFLATE n'apporte rien et coûte cher en CPU
  const blob = await zip.generateAsync(
    { type: "blob", compression: "STORE", streamFiles: true },
    (meta) => reporter?.setProgress(99 + Math.min(1, meta.percent / 100))
  );
  reporter?.setProgress(100);
  reporter?.setMessage("Pack BAHO prêt !");
  return blob;
}
