/**
 * MyCertif – Build a ZIP with 5 documents per stagiaire.
 * Doc per stagiaire :
 *  1. Attestation de délivrance
 *  2. Grille d'évaluation
 *  3. Attestation sur l'honneur
 *  4. Questionnaire rempli
 * Doc partagé par session :
 *  5. Feuille d'émargement jury
 */
import JSZip from "jszip";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import type { JobReporter } from "@/lib/backgroundJobs";
import { STAGIAIRES, CERTIFICATION, ORG_FORMATION } from "./myCertifData";
import {
  getAttestationDelivranceHTML, getEmargementJuryHTML, getGrilleEvaluationHTML,
  getAttestationHonneurHTML, getQuestionnaireHTML,
} from "./myCertifTemplates";

const safe = (s: string) => s.replace(/[^\w\-]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").slice(0, 80);

export async function buildMyCertifZip(reporter?: JobReporter): Promise<Blob> {
  const zip = new JSZip();
  const sessions = new Set(STAGIAIRES.map(s => s.sessionDate));
  const totalSteps = STAGIAIRES.length * 4 + sessions.size; // 4 docs/stagiaire + 1 émargement/session
  let step = 0;

  reporter?.setMessage(`Génération MyCertif – ${STAGIAIRES.length} stagiaires`);

  // README
  zip.file("README.txt", [
    `PACK MYCERTIF – ${CERTIFICATION.code} ${CERTIFICATION.intitule}`,
    `Organisme : ${ORG_FORMATION.nom} – SIRET ${ORG_FORMATION.siret} – NDA ${ORG_FORMATION.nda}`,
    "",
    `Nombre de stagiaires : ${STAGIAIRES.length}`,
    `Nombre de sessions de jury : ${sessions.size}`,
    "",
    "Pour chaque stagiaire :",
    " 1. Attestation de délivrance de certification (PDF)",
    " 2. Grille d'évaluation (PDF, 10 compétences)",
    " 3. Attestation sur l'honneur (PDF, signée)",
    " 4. Questionnaire prothésie ongulaire rempli (PDF)",
    "",
    "Pour chaque session de jury :",
    " 5. Feuille d'émargement des membres du jury (PDF)",
    "",
    "Liste des stagiaires :",
    ...STAGIAIRES.map((s, i) => ` ${i + 1}. ${s.prenom} ${s.nom} – Session ${s.sessionDate}`),
  ].join("\n"));

  // Émargements jury (groupés par date de session)
  const emargementFolder = zip.folder("00_Emargements_Jury")!;
  for (const date of sessions) {
    try {
      reporter?.setMessage(`Émargement jury – ${date}`);
      const html = getEmargementJuryHTML(date);
      const pdf = await htmlToPdfBlob(html);
      emargementFolder.file(`Emargement_Jury_${date.replace(/\//g, "-")}.pdf`, pdf);
    } catch (err) {
      console.error("Émargement err:", err);
      emargementFolder.file(`ERREUR_${date.replace(/\//g, "-")}.txt`, String(err));
    }
    step++; reporter?.setProgress(Math.round((step / totalSteps) * 90));
  }

  // Docs individuels
  for (let i = 0; i < STAGIAIRES.length; i++) {
    const s = STAGIAIRES[i];
    const folderName = `${String(i + 1).padStart(2, "0")}_${safe(s.prenom)}_${safe(s.nom)}`;
    const folder = zip.folder(folderName)!;
    const baseName = `${safe(s.prenom)}_${safe(s.nom)}`;

    const tasks: { html: string; file: string; label: string }[] = [
      { html: getAttestationDelivranceHTML(s), file: `1_Attestation_Delivrance_${baseName}.pdf`, label: "Attestation délivrance" },
      { html: getGrilleEvaluationHTML(s), file: `2_Grille_Evaluation_${baseName}.pdf`, label: "Grille d'évaluation" },
      { html: getAttestationHonneurHTML(s), file: `3_Attestation_Honneur_${baseName}.pdf`, label: "Attestation honneur" },
      { html: getQuestionnaireHTML(s), file: `4_Questionnaire_${baseName}.pdf`, label: "Questionnaire" },
    ];

    for (const t of tasks) {
      try {
        reporter?.setMessage(`${s.prenom} ${s.nom} – ${t.label}`);
        const pdf = await htmlToPdfBlob(t.html);
        folder.file(t.file, pdf);
      } catch (err) {
        console.error(`${t.label} err:`, err);
        folder.file(`ERREUR_${t.label}.txt`, String(err));
      }
      step++; reporter?.setProgress(Math.round((step / totalSteps) * 90));
    }

    if (i % 2 === 1) await new Promise(r => setTimeout(r, 30));
  }

  reporter?.setMessage("Compression du ZIP…");
  reporter?.setProgress(95);
  const blob = await zip.generateAsync(
    { type: "blob", compression: "STORE", streamFiles: true },
    (meta) => reporter?.setProgress(Math.min(100, 95 + meta.percent / 20))
  );
  reporter?.setProgress(100);
  reporter?.setMessage("Pack MyCertif prêt !");
  return blob;
}
