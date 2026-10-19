import JSZip from "jszip";
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

export async function buildVAEZip(
  d: VAEData,
  onProgress?: (msg: string) => void,
  options?: { includeCV?: boolean; format?: "word" | "pdf" }
): Promise<Blob> {
  const zip = new JSZip();
  const NOM = safe(d.candidat.nom).toUpperCase();
  const Prenom = safe(d.candidat.prenom);
  const suffix = `VAE_${NOM}_${Prenom}`;
  const orgSuffix = orgTag(d.organisme.nom);
  const certSuffix = certTag(d.certification.intitule);

  const docs: Array<[string, () => string]> = [
    // A. Documents personnalisés candidat
    [`Evaluation_Besoins_${suffix}.docx`, () => getBesoinsHTML(d)],
    [`Dossier_Faisabilite_${suffix}.docx`, () => getLivret1HTML(d)],
    [`Dossier_Validation_${suffix}.docx`, () => getLivret2HTML(d)],
    [`Convention_${suffix}.docx`, () => getConventionHTML(d)],
    [`Convocation_${suffix}.docx`, () => getConvocationHTML(d)],
    [`Autorisation_RGPD_${suffix}.docx`, () => getAutorisationRGPDHTML(d)],
    // B. Documents organisme
    [`Programme_VAE_${certSuffix}.docx`, () => getProgrammeHTML(d)],
    [`CGV_VAE_${orgSuffix}.docx`, () => getCGVHTML(d)],
    [`Charte_Qualite_${orgSuffix}.docx`, () => getCharteHTML(d)],
    [`Livret_Accueil_VAE_${orgSuffix}.docx`, () => getLivretAccueilHTML(d)],
    [`Reglement_Interieur_${orgSuffix}.docx`, () => getReglementInterieurHTML(d)],
    [`Checklist_Dossier_${suffix}.docx`, () => getChecklistHTML(d)],
  ];

  if (options?.includeCV) {
    docs.push([`CV_${suffix}.docx`, () => getCVHTML(d)]);
  }

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
