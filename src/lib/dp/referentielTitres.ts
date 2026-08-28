/**
 * Table de référentiel des titres professionnels utilisée par le moteur unique
 * DP (45A) / ECF (45B).
 *
 * Règle absolue : le code titre n'est JAMAIS fabriqué à partir du numéro RNCP.
 * S'il n'est pas connu pour un RNCP donné, il vaut `undefined` et la ligne
 * correspondante est omise du document.
 */

import type { FormationInfo } from "@/types/qualiopi";
import { getRNCPByCode, type RNCPFiche } from "@/lib/rncpData";
import { GOTRM_TITRE, GOTRM_CCP } from "@/data/gotrm";

/** Version de la trame officielle du DP (constante de référentiel, jamais en dur dans le générateur). */
export const DP_TRAME_VERSION = "01/06/2016";

/** Sigle officiel du livret ECF selon la trame ministérielle. */
export const ECF_SIGLE = "EPR";
export const ECF_TYPE_DOC = "Livret d'évaluations passées en cours de formation";

export interface DpActiviteType {
  titre: string;
  competences: string[];
}

export interface DpReferentiel {
  /** Intitulé officiel du titre (jamais l'intitulé de session saisi). */
  titreOfficiel: string;
  /** Code titre officiel (TP-xxxxx). `undefined` si inconnu → ligne omise. */
  codeTitre?: string;
  millesime?: string;
  rncp?: string;
  /** Date de l'arrêté (JJ/MM/AAAA). */
  dateArrete?: string;
  /** Date de publication au J.O. (JJ/MM/AAAA). */
  dateJo?: string;
  niveau?: string;
  sigle?: string;
  activitesTypes: DpActiviteType[];
}

/** Table des codes titres connus, indexée par numéro RNCP normalisé. */
interface EntreeTable {
  titreOfficiel: string;
  codeTitre: string;
  millesime: string;
  sigle?: string;
  dateArrete?: string;
  dateJo?: string;
  niveau?: string;
}

const TABLE_CODES_TITRE: Record<string, EntreeTable> = {
  RNCP40990: {
    titreOfficiel: "Gestionnaire des opérations de transport routier de marchandises",
    codeTitre: "TP-01329",
    millesime: "03",
    sigle: "GOTRM",
    dateArrete: "03/06/2025",
    dateJo: "14/06/2025",
    niveau: "Niveau 5",
  },
};

function normRncp(code?: string): string {
  const c = (code || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!c) return "";
  return c.startsWith("RNCP") ? c : `RNCP${c.replace(/[^0-9]/g, "")}`;
}

/**
 * Retire d'un intitulé saisi les parenthèses de session ou de code
 * (« … (TP-01329 / RNCP40990) », « … (session septembre) »).
 */
export function nettoyerIntitule(intitule: string): string {
  return (intitule || "")
    .replace(/\s*[([][^)\]]*[)\]]\s*/g, " ")
    .replace(/\s*[-–—]\s*(TP-?\d+|RNCP\s*\d+).*$/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function fromRncpFiche(fiche: RNCPFiche): DpActiviteType[] {
  return fiche.blocsCompetences.map((b) => ({ titre: b.titre, competences: b.competences }));
}

const ACTIVITES_FALLBACK: DpActiviteType[] = [
  { titre: "Activité-type 1", competences: ["Compétence 1.1", "Compétence 1.2", "Compétence 1.3"] },
  { titre: "Activité-type 2", competences: ["Compétence 2.1", "Compétence 2.2", "Compétence 2.3"] },
];

/** Résout le référentiel d'un titre à partir de la formation saisie. */
export function resolveReferentiel(f: FormationInfo): DpReferentiel {
  const rncp = normRncp(f.codeRNCP);
  const entree = TABLE_CODES_TITRE[rncp];

  // GOTRM : référentiel dédié (activités-types issues du REAC officiel)
  if (rncp === normRncp(GOTRM_TITRE.rncp)) {
    return {
      titreOfficiel: GOTRM_TITRE.intitule,
      codeTitre: GOTRM_TITRE.codeTitre,
      millesime: GOTRM_TITRE.millesime,
      rncp: GOTRM_TITRE.rncp,
      dateArrete: GOTRM_TITRE.arrete.replace(/^Arrêté du\s*:?\s*/i, ""),
      dateJo: GOTRM_TITRE.jo.replace(/^J\.?O\.?\s*du\s*:?\s*/i, ""),
      niveau: GOTRM_TITRE.niveau,
      sigle: GOTRM_TITRE.sigle,
      activitesTypes: GOTRM_CCP.map((c) => ({
        titre: c.libelle,
        competences: c.competences.map((cp) => cp.libelle),
      })),
    };
  }

  const fiche = f.codeRNCP ? getRNCPByCode(f.codeRNCP) : null;
  return {
    titreOfficiel: entree?.titreOfficiel || fiche?.intitule || nettoyerIntitule(f.intitule) || "Titre professionnel",
    codeTitre: entree?.codeTitre,
    millesime: entree?.millesime,
    rncp: rncp || undefined,
    dateArrete: entree?.dateArrete,
    dateJo: entree?.dateJo || fiche?.dateEnregistrement,
    niveau: entree?.niveau || fiche?.niveau,
    sigle: entree?.sigle,
    activitesTypes: fiche && fiche.blocsCompetences.length > 0 ? fromRncpFiche(fiche) : ACTIVITES_FALLBACK,
  };
}
