/**
 * BAHO — Registre des documents individuels générés par stagiaire.
 * Source unique utilisée par le ZIP (bahoGenerator) et par la modale (aperçu + téléchargement unitaire),
 * afin que libellés, dates et noms de fichiers restent identiques partout.
 */
import { FORMAT_SPHERE_ORG, type BahoEntreprise, type BahoStagiaire } from "./bahoData";
import { getThreeWorkingDays } from "./bahoStaticDocs";
import { getTestPositionnementDebutHTML, getTestPositionnementFinHTML } from "./bahoTests";
import { getExerciceJour1HTML, getExerciceJour2HTML, getEvaluationFinaleHTML } from "./bahoExercices";
import { getEvaluationBesoinsHTML, dateEvaluationBesoins, normalizeStagiaire } from "./bahoBesoins";
import { buildPerStagiairePdfFileName } from "@/lib/eyExport";
import type { StagiaireInfo } from "@/types/qualiopi";

export type BahoStagiaireDocKind =
  | "besoins"
  | "positionnement_debut"
  | "exercice_j1"
  | "exercice_j2"
  | "evaluation_finale"
  | "positionnement_fin";

export interface BahoStagiaireDocDef {
  kind: BahoStagiaireDocKind;
  /** Intitulé affiché dans la liste et repris dans le nom de fichier */
  label: string;
  /** Nom de fichier normalisé (convention projet) */
  fileName: string;
  /** Date du document (ISO) */
  date: string;
  /** Rendu HTML (en-tête, pied de page et tampons FORMAT SPHERE + hôtel inclus) */
  render: (customFsStamp?: string) => string;
}

const ORG_SEGMENT = FORMAT_SPHERE_ORG.nom;

/** Les 6 documents individuels, dans l'ordre chronologique du parcours. */
export function getBahoStagiaireDocs(
  e: BahoEntreprise,
  rawStagiaire: BahoStagiaire,
  si: number
): BahoStagiaireDocDef[] {
  const s = normalizeStagiaire(rawStagiaire);
  const days = getThreeWorkingDays(e.dateDebut);
  const j1 = days[0] || e.dateDebut;
  const j2 = days[1] || e.dateDebut;
  const j3 = days[2] || e.dateFin;
  const info = { nom: s.nom, prenom: s.prenom } as unknown as StagiaireInfo;

  const def = (
    kind: BahoStagiaireDocKind,
    label: string,
    date: string,
    render: (c?: string) => string
  ): BahoStagiaireDocDef => ({
    kind,
    label,
    date,
    render,
    fileName: buildPerStagiairePdfFileName(ORG_SEGMENT, kind, label, info, si, "1", date),
  });

  return [
    def("besoins", "Trame evaluation besoins", dateEvaluationBesoins(e), (c) =>
      getEvaluationBesoinsHTML(e, rawStagiaire, si, c)
    ),
    def("positionnement_debut", "Test positionnement debut", j1, (c) =>
      getTestPositionnementDebutHTML(e, rawStagiaire, si, c)
    ),
    def("exercice_j1", "Exercice jour 1", j1, (c) => getExerciceJour1HTML(e, rawStagiaire, si, c)),
    def("exercice_j2", "Exercice jour 2", j2, (c) => getExerciceJour2HTML(e, rawStagiaire, si, c)),
    def("evaluation_finale", "Evaluation finale", j3, (c) =>
      getEvaluationFinaleHTML(e, rawStagiaire, si, c)
    ),
    def("positionnement_fin", "Test positionnement fin", j3, (c) =>
      getTestPositionnementFinHTML(e, rawStagiaire, si, c)
    ),
  ];
}

export const BAHO_STAGIAIRE_DOCS_COUNT = 6;
