/**
 * BAHO - Génération du ZIP global
 * Pour chaque entreprise (groupe par SIRET) : Convention, Devis, Facture, Règlement intérieur, CGV
 * Format : DOCX (templates remplis) + PDF
 */
import JSZip from "jszip";
import { getBahoEntreprises, FORMAT_SPHERE_ORG, type BahoEntreprise } from "./bahoData";
import { getRIHTML, getCGVHTML, getFactureHTML } from "./bahoStaticDocs";
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
export async function buildBahoZip(reporter?: JobReporter): Promise<Blob> {
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
    " - Convention de formation (DOCX + PDF)",
    " - Devis (DOCX + PDF)",
    " - Facture (PDF)",
    " - Règlement intérieur (PDF)",
    " - CGV (PDF)",
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

    // 1. Convention DOCX (template)
    try {
      reporter?.setMessage(`${e.nom} – Convention DOCX…`);
      const conventionBlob = await processDocxTemplate(
        "/templates/baho/convention_template.docx",
        buildConventionData(e) as unknown as Record<string, string>
      );
      folder.file(`Convention_de_formation_${baseName}.docx`, conventionBlob);
    } catch (err) {
      console.error("Convention DOCX error:", err);
      folder.file(`ERREUR_Convention.txt`, `Erreur génération Convention DOCX: ${(err as Error).message}`);
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
    } catch (err) {
      console.error("Devis DOCX error:", err);
      folder.file(`ERREUR_Devis.txt`, `Erreur génération Devis DOCX: ${(err as Error).message}`);
    }
    step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

    // 3. Facture PDF
    try {
      reporter?.setMessage(`${e.nom} – Facture PDF…`);
      const factureHTML = getFactureHTML(e, devisNumero);
      const facturePdf = await exportToPDF(factureHTML, "blob");
      if (facturePdf instanceof Blob) {
        folder.file(`Facture_${devisNumero}_${baseName}.pdf`, facturePdf);
      }
    } catch (err) {
      console.error("Facture PDF error:", err);
      folder.file(`ERREUR_Facture.txt`, `Erreur: ${(err as Error).message}`);
    }
    step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

    // 4. Règlement intérieur PDF
    try {
      reporter?.setMessage(`${e.nom} – Règlement intérieur…`);
      const riHTML = getRIHTML(e);
      const riPdf = await exportToPDF(riHTML, "blob");
      if (riPdf instanceof Blob) {
        folder.file(`Reglement_interieur_${baseName}.pdf`, riPdf);
      }
    } catch (err) {
      console.error("RI error:", err);
      folder.file(`ERREUR_RI.txt`, `Erreur: ${(err as Error).message}`);
    }
    step++; reporter?.setProgress(Math.round((step / totalSteps) * 100));

    // 5. CGV PDF
    try {
      reporter?.setMessage(`${e.nom} – CGV…`);
      const cgvHTML = getCGVHTML(e);
      const cgvPdf = await exportToPDF(cgvHTML, "blob");
      if (cgvPdf instanceof Blob) {
        folder.file(`CGV_${baseName}.pdf`, cgvPdf);
      }
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
