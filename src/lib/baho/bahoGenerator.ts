/**
 * BAHO - Génération du ZIP global
 * Pour chaque entreprise (groupe par SIRET) : Convention, Devis, Facture, Règlement intérieur, CGV
 * Format : DOCX (templates remplis) + PDF
 */
import JSZip from "jszip";
import { getBahoEntreprises, FORMAT_SPHERE_ORG, type BahoEntreprise } from "./bahoData";
import { getRIHTML, getCGVHTML, getFactureHTML, getConventionHTML, getDevisHTML } from "./bahoStaticDocs";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { processDocxTemplate, type ConventionTemplateData, type DevisTemplateData } from "./bahoTemplate";
import type { JobReporter } from "@/lib/backgroundJobs";

function safeName(s: string): string {
  return s.replace(/[^\w\-]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").slice(0, 80);
}

function formatDateLong(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function buildConventionData(e: BahoEntreprise): ConventionTemplateData {
  return {
    nom_entreprise: e.nom,
    siretEntreprise: e.siret,
    adresse_entreprise: e.adresse,
    directriceEntreprise: e.dirigeant,
    datedebut: formatDateLong(e.dateDebut),
    datedefin: formatDateLong(e.dateFin),
    dateConvention: formatDateLong(e.dateConvention),
  };
}

function buildDevisData(e: BahoEntreprise, devisNumero: string): DevisTemplateData {
  const stagiairesNames = e.stagiaires
    .map((s) => `${s.nom} ${s.prenom}`)
    .join(", ");
  return {
    numero: devisNumero,
    nomEntreprise: e.nom,
    adresseEntreprise: e.adresse,
    siret: e.siret,
    mailEntreprise: e.email,
    date_debut: formatDateLong(e.dateDebut),
    date_fin: formatDateLong(e.dateFin),
    date_facture: formatDateLong(e.dateConvention),
    nom: stagiairesNames,
    prenom: "",
    directeur: e.dirigeant,
    adresse: e.adresse,
  };
}

/** Build full BAHO ZIP and return as Blob */
export async function buildBahoZip(reporter?: JobReporter, customFsStamp?: string): Promise<Blob> {
  const zip = new JSZip();
  const entreprises = getBahoEntreprises();
  const totalSteps = entreprises.length * 5; // 5 documents par entreprise
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
    "Pour chaque entreprise :",
    " - Convention de formation (DOCX template + PDF tamponnée avec liste participants)",
    " - Devis (DOCX)",
    " - Facture (PDF tamponnée)",
    " - Règlements intérieurs : 1 PDF par stagiaire (tamponné)",
    " - CGV (PDF tamponnée)",
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

    // 1. Convention DOCX (template) + PDF tamponné
    try {
      reporter?.setMessage(`${e.nom} – Convention DOCX…`);
      const conventionBlob = await processDocxTemplate(
        "/templates/baho/convention_template.docx",
        buildConventionData(e) as unknown as Record<string, string>
      );
      folder.file(`Convention_de_formation_${baseName}.docx`, conventionBlob);

      // PDF version with all participants + tampons (RI, hôtel + FORMAT SPHERE)
      reporter?.setMessage(`${e.nom} – Convention PDF tamponnée…`);
      const conventionHtml = getConventionHTML(e, customFsStamp);
      const conventionPdf = await htmlToPdfBlob(conventionHtml);
      folder.file(`Convention_de_formation_${baseName}_TAMPONNEE.pdf`, conventionPdf);
    } catch (err) {
      console.error("Convention error:", err);
      folder.file(`ERREUR_Convention.txt`, `Erreur génération Convention: ${(err as Error).message}`);
    }
    step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

    // 2. Devis DOCX (template)
    try {
      reporter?.setMessage(`${e.nom} – Devis DOCX…`);
      const devisBlob = await processDocxTemplate(
        "/templates/baho/devis_template.docx",
        buildDevisData(e, devisNumero) as unknown as Record<string, string>
      );
      folder.file(`Devis_${devisNumero}_${baseName}.docx`, devisBlob);

      // Devis PDF tamponné
      reporter?.setMessage(`${e.nom} – Devis PDF tamponné…`);
      const devisHtml = getDevisHTML(e, devisNumero, customFsStamp);
      const devisPdf = await htmlToPdfBlob(devisHtml);
      folder.file(`Devis_${devisNumero}_${baseName}_TAMPONNE.pdf`, devisPdf);
    } catch (err) {
      console.error("Devis DOCX error:", err);
      folder.file(`ERREUR_Devis.txt`, `Erreur génération Devis DOCX: ${(err as Error).message}`);
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

    // 4. Règlement intérieur PDF — un par stagiaire (avec tampons hôtel + FORMAT SPHERE)
    try {
      reporter?.setMessage(`${e.nom} – Règlements intérieurs (${e.stagiaires.length})…`);
      const riFolder = folder.folder("Reglements_interieurs")!;
      for (const s of e.stagiaires) {
        const riHTML = getRIHTML(e, s, customFsStamp);
        const riPdf = await htmlToPdfBlob(riHTML);
        const stgName = `${safeName(s.prenom)}_${safeName(s.nom)}_${s.codeStagiaire}`;
        riFolder.file(`RI_${stgName}.pdf`, riPdf);
      }
      // Aussi un RI "entreprise" générique (sans stagiaire) pour archive
      const riEntHTML = getRIHTML(e, undefined, customFsStamp);
      const riEntPdf = await htmlToPdfBlob(riEntHTML);
      folder.file(`Reglement_interieur_${baseName}_entreprise.pdf`, riEntPdf);
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
