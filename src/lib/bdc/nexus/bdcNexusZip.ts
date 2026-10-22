/**
 * Dossier Qualiopi « bilan de compétences » complet, au format du dossier audité NEXUS :
 * même arborescence Critere_X/Indicateur_Y (+ « Bénéficiaire - Prénom NOM »), mêmes pièces,
 * mêmes noms de fichiers, toutes les pièces documentaires en PDF, classeurs en .xlsx.
 *
 * Le contenu suit la formation (intitulé, durée, tarif, consultant, modalité) et les dates de
 * chaque bénéficiaire (planning, chronologie contractuelle, suivi à six mois) : voir nexusModele.ts.
 * Les pièces elles-mêmes sont décrites dans nexusDocs.ts (partagé avec le catalogue).
 */
import JSZip from "jszip";
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import type { JobReporter } from "@/lib/backgroundJobs";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { htmlToXlsxBlob } from "@/lib/htmlToXlsx";
import { limiterCheminsZip } from "@/lib/fileNaming";
import { ceder } from "@/lib/arrierePlan";
import { financeurEffectifBC } from "../bdcModel";
import { avecPiedUnique, supportsDeCoursBDC } from "../bdcNTConseilsZip";
import { NEXUS_TEMPLATES } from "./nexusTemplates";
import { NEXUS_PDF_AGEFIPH, planNexus } from "./nexusDocs";

export async function buildBDCNexusZip(
  org: OrganismeInfo,
  formation: FormationInfo,
  stagiaires: StagiaireInfo[],
  reporter?: JobReporter,
): Promise<Blob> {
  const zip = new JSZip();
  const docs = planNexus(org, formation, stagiaires, NEXUS_TEMPLATES);
  const total = docs.length + 2;
  let etape = 0;
  const avancer = (msg: string) => { etape++; reporter?.setProgress(Math.min(98, (etape / total) * 100)); reporter?.setMessage(msg); };

  for (const d of docs) {
    avancer(d.chemin.split("/").pop() || d.chemin);
    try {
      const html = d.html();
      zip.file(d.chemin, d.format === "xlsx" ? htmlToXlsxBlob(html) : await htmlToPdfBlob(html));
    } catch (e) {
      console.warn("[BDC NEXUS] pièce échouée", d.chemin, e);
    }
    await ceder();
  }

  // Ressource statique : contacts Agefiph (PDF du dossier de référence)
  avancer("Contacts AGEFIPH");
  try {
    const res = await fetch(NEXUS_PDF_AGEFIPH.url);
    if (res.ok) zip.file(NEXUS_PDF_AGEFIPH.chemin, await res.arrayBuffer());
  } catch (e) {
    console.warn("[BDC NEXUS] contacts Agefiph indisponibles", e);
  }

  // Supports de cours propres au profil de la formation (indicateur 19)
  avancer("Supports de cours");
  try {
    const benList = stagiaires.map((s) => ({ ...s, financeur: financeurEffectifBC(s, org, formation) }));
    const toPdf = async (html: string) => await htmlToPdfBlob(avecPiedUnique(html, org));
    for (const p of await supportsDeCoursBDC(org, formation, benList, toPdf)) zip.file(p.chemin, p.blob);
  } catch (e) {
    console.warn("[BDC NEXUS] support de cours échoué", e);
  }

  reporter?.setProgress(99);
  reporter?.setMessage("Compression du ZIP…");
  await limiterCheminsZip(zip);
  const blob = await zip.generateAsync({ type: "blob", compression: "STORE", streamFiles: true }, (meta) => reporter?.setProgress(Math.min(100, 99 + meta.percent / 100)));
  reporter?.setProgress(100);
  return blob;
}
