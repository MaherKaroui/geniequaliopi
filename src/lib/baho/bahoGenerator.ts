/**
 * BAHO - Génération du ZIP global
 * Pour chaque entreprise (groupe par SIRET) : Convention, Devis, Facture, Règlement intérieur, CGV
 * Format : PDF tamponnés uniquement
 */
import JSZip from "jszip";
import { getBahoEntreprises, FORMAT_SPHERE_ORG, type BahoEntreprise } from "./bahoData";
import { getRIHTML, getCGVHTML, getFactureHTML, getConventionHTML, getDevisHTML, getProgrammeHTML, getEmargementHTML } from "./bahoStaticDocs";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import type { JobReporter } from "@/lib/backgroundJobs";

function safeName(s: string): string {
  return s.replace(/[^\w\-]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").slice(0, 80);
}

/** Build full BAHO ZIP and return as Blob */
export async function buildBahoZip(reporter?: JobReporter, customFsStamp?: string): Promise<Blob> {
  const zip = new JSZip();
  const entreprises = getBahoEntreprises();
  const totalEmargements = entreprises.reduce((acc, e) => acc + e.stagiaires.length, 0);
  const totalSteps = entreprises.length * 6 + totalEmargements; // 6 docs entreprise + 1 émargement par stagiaire
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
    `Nombre total de stagiaires : ${entreprises.reduce((acc, e) => acc + e.stagiaires.length, 0)}`,
    "",
    "Pour chaque entreprise (PDF uniquement) :",
    " - Programme de formation (PDF tamponné)",
    " - Convention de formation (PDF tamponnée avec liste participants)",
    " - Devis (PDF tamponné)",
    " - Facture (PDF tamponnée)",
    " - Règlement intérieur (PDF tamponné)",
    " - CGV (PDF tamponnée)",
    " - Une feuille d'émargement INDIVIDUELLE par stagiaire (3 jours × 2 demi-journées)",
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

    // 2. Devis PDF tamponné
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

    // 3. Facture PDF (tamponnée)
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

    // 4. Règlement intérieur PDF — un seul par hôtel (tamponné)
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

    // 5. CGV PDF (tamponnée)
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

    // 6. Feuilles d'émargement INDIVIDUELLES — une par stagiaire (priorité au stagiaire)
    const emargFolder = folder.folder("Emargements")!;
    for (let s = 0; s < e.stagiaires.length; s++) {
      const stg = e.stagiaires[s];
      try {
        reporter?.setMessage(`${e.nom} – Émargement ${stg.prenom} ${stg.nom}…`);
        const emargHtml = getEmargementHTML(e, stg, customFsStamp);
        const emargPdf = await htmlToPdfBlob(emargHtml);
        const stgName = safeName(`${stg.nom}_${stg.prenom}`);
        emargFolder.file(`Emargement_${stgName}_${stg.codeStagiaire}.pdf`, emargPdf);
      } catch (err) {
        console.error("Emargement error:", err);
        emargFolder.file(`ERREUR_Emargement_${safeName(stg.nom)}.txt`, `Erreur: ${(err as Error).message}`);
      }
      step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));
    }

    // Allow GC between entreprises
    if (i % 2 === 1) await new Promise((r) => setTimeout(r, 30));
  }

  reporter?.setMessage("Compression du ZIP…");
  reporter?.setProgress(99);
  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
  reporter?.setProgress(100);
  reporter?.setMessage("Pack BAHO prêt !");
  return blob;
}
