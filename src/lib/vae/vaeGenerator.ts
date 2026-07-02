import JSZip from "jszip";
import { htmlToWordBlob } from "@/lib/wordExport";
import type { VAEData } from "./vaeTypes";
import {
  getConventionHTML, getLivret1HTML, getLivret2HTML, getProgrammeHTML,
  getBesoinsHTML, getPlanAccompagnementHTML, getDevisHTML,
  getAttestationEntreeHTML, getLivretSuiviHTML, getFicheCertifHTML,
} from "./vaeTemplates";

function safe(s: string): string {
  return (s || "").replace(/[^\w\-]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").slice(0, 80);
}

export async function buildVAEZip(d: VAEData, onProgress?: (msg: string) => void): Promise<Blob> {
  const zip = new JSZip();
  const base = `${safe(d.candidat.nom)}_${safe(d.candidat.prenom)}_${safe(d.certification.rncp)}`;

  const docs: Array<[string, () => string]> = [
    [`01_Convention_Accompagnement_VAE_${base}.docx`, () => getConventionHTML(d)],
    [`02_Livret_1_Recevabilite_${base}.docx`, () => getLivret1HTML(d)],
    [`03_Livret_2_${base}.docx`, () => getLivret2HTML(d)],
    [`04_Programme_Accompagnement_${base}.docx`, () => getProgrammeHTML(d)],
    [`05_Evaluation_Besoins_${base}.docx`, () => getBesoinsHTML(d)],
    [`06_Plan_Accompagnement_${base}.docx`, () => getPlanAccompagnementHTML(d)],
    [`07_Devis_${base}.docx`, () => getDevisHTML(d)],
    [`08_Attestation_Entree_${base}.docx`, () => getAttestationEntreeHTML(d)],
    [`09_Livret_Suivi_${base}.docx`, () => getLivretSuiviHTML(d)],
    [`10_Fiche_Certification_${base}.docx`, () => getFicheCertifHTML(d)],
  ];

  for (const [name, fn] of docs) {
    onProgress?.(name);
    try {
      const blob = await htmlToWordBlob(fn());
      zip.file(name, blob);
    } catch (e) {
      console.error("VAE gen error", name, e);
      zip.file(`ERREUR_${name}.txt`, String((e as Error).message));
    }
  }

  zip.file("README.txt", [
    "Dossier VAE — généré par LCA DIGITAL",
    `Candidat : ${d.candidat.prenom} ${d.candidat.nom}`,
    `Certification : ${d.certification.intitule} (RNCP ${d.certification.rncp})`,
    `Fiche France Compétences : ${d.certification.lien}`,
    `Généré le ${new Date().toLocaleString("fr-FR")}`,
  ].join("\n"));

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
