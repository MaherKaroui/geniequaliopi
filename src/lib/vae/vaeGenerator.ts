import JSZip from "jszip";
import { limiterCheminsZip } from "@/lib/fileNaming";
import { htmlToWordBlob } from "@/lib/wordExport";
import { htmlToPdfBlob, getActivePdfOptions } from "@/lib/pdfExport";
import { withActiveDossierStyle } from "@/lib/dossierDesign";
import type { VAEData } from "./vaeTypes";
import {
  getBesoinsHTML,
  getLivret1HTML,
  getLivret2HTML,
  getConventionHTML,
  getConvocationHTML,
  getAutorisationRGPDHTML,
  getCVHTML,
  getProgrammeHTML,
  getCGVHTML,
  getCharteHTML,
  getLivretAccueilHTML,
  getReglementInterieurHTML,
  getChecklistHTML,
} from "./vaeTemplates";

function safe(s: string): string {
  return (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 80);
}

function orgTag(nom: string): string {
  return safe(nom).toUpperCase();
}

function certTag(intitule: string): string {
  return safe(intitule).slice(0, 40);
}

/** Pièces du générateur VAE : nom de fichier (.docx), titre et rendu HTML. */
export function vaeDocuments(d: VAEData, includeCV = false): Array<{ fichier: string; titre: string; html: () => string }> {
  const NOM = safe(d.candidat.nom).toUpperCase();
  const Prenom = safe(d.candidat.prenom);
  const suffix = `VAE_${NOM}_${Prenom}`;
  const orgSuffix = orgTag(d.organisme.nom);
  const certSuffix = certTag(d.certification.intitule);
  const docs: Array<{ fichier: string; titre: string; html: () => string }> = [
    // A. Documents personnalisés candidat
    { fichier: `Evaluation_Besoins_${suffix}.docx`, titre: "Évaluation des besoins", html: () => getBesoinsHTML(d) },
    { fichier: `Dossier_Faisabilite_${suffix}.docx`, titre: "Dossier de faisabilité (livret 1)", html: () => getLivret1HTML(d) },
    { fichier: `Dossier_Validation_${suffix}.docx`, titre: "Dossier de validation (livret 2)", html: () => getLivret2HTML(d) },
    { fichier: `Convention_${suffix}.docx`, titre: "Convention d'accompagnement", html: () => getConventionHTML(d) },
    { fichier: `Convocation_${suffix}.docx`, titre: "Convocation", html: () => getConvocationHTML(d) },
    { fichier: `Autorisation_RGPD_${suffix}.docx`, titre: "Autorisation RGPD", html: () => getAutorisationRGPDHTML(d) },
    // B. Documents organisme
    { fichier: `Programme_VAE_${certSuffix}.docx`, titre: "Programme d'accompagnement VAE", html: () => getProgrammeHTML(d) },
    { fichier: `CGV_VAE_${orgSuffix}.docx`, titre: "CGV", html: () => getCGVHTML(d) },
    { fichier: `Charte_Qualite_${orgSuffix}.docx`, titre: "Charte qualité", html: () => getCharteHTML(d) },
    { fichier: `Livret_Accueil_VAE_${orgSuffix}.docx`, titre: "Livret d'accueil", html: () => getLivretAccueilHTML(d) },
    { fichier: `Reglement_Interieur_${orgSuffix}.docx`, titre: "Règlement intérieur", html: () => getReglementInterieurHTML(d) },
    { fichier: `Checklist_Dossier_${suffix}.docx`, titre: "Checklist du dossier", html: () => getChecklistHTML(d) },
  ];
  if (includeCV) docs.push({ fichier: `CV_${suffix}.docx`, titre: "CV", html: () => getCVHTML(d) });
  return docs;
}

export async function buildVAEZip(
  d: VAEData,
  onProgress?: (msg: string) => void,
  options?: { includeCV?: boolean; format?: "word" | "pdf" }
): Promise<Blob> {
  const zip = new JSZip();
  const docs = vaeDocuments(d, options?.includeCV).map((x) => [x.fichier, x.html] as const);

  for (const [name, fn] of docs) {
    onProgress?.(name);
    try {
      const styledHtml = withActiveDossierStyle(fn());
      const blob = options?.format === "pdf" ? await htmlToPdfBlob(styledHtml, { ...getActivePdfOptions(), keepTablesTogether: false }) : await htmlToWordBlob(styledHtml);
      const isDocx = blob.type.includes("officedocument");
      const finalName = options?.format === "pdf" ? name.replace(/\.docx$/i, ".pdf") : isDocx ? name : name.replace(/\.docx$/i, ".doc");
      zip.file(finalName, blob);
    } catch (e) {
      console.error("VAE gen error", name, e);
      zip.file(`ERREUR_${name}.txt`, String((e as Error).message));
    }
  }

  zip.file(
    "README.txt",
    [
      `Dossier VAE — généré par ${d.organisme.nom}`,
      `Candidat : ${d.candidat.prenom} ${d.candidat.nom}`,
      `Certification : ${d.certification.intitule} (RNCP ${d.certification.rncp})`,
      `Fiche France Compétences : ${d.certification.lien}`,
      `Généré le ${new Date().toLocaleString("fr-FR")}`,
    ].join("\n")
  );

  await limiterCheminsZip(zip);
  return zip.generateAsync({ type: "blob" });
}

export async function downloadCVWord(html: string, filename: string) {
  const blob = await htmlToWordBlob(html);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".docx") ? filename : filename + ".docx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
