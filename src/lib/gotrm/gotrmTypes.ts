import type { OrganismeInfo } from "@/types/qualiopi";
import type { GotrmParcours } from "@/data/gotrm";

export interface GotrmJure {
  nom: string;
  qualite: string;
}

export interface GotrmCandidat {
  id: string;
  civilite: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  identifiant: string;
  dossierComplet: boolean;
  motifIncomplet: string;
  parcours: GotrmParcours;
  ccpVises: string[];
  ordrePassage: number;
  msp1Date: string;
  msp1Horaire: string;
  msp2Date: string;
  msp2Horaire: string;
  /** Historique de capitalisation : CCP déjà obtenus */
  ccpObtenus: { ccp: string; date: string; session: string }[];
}

export interface GotrmSession {
  intitule: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  jury: GotrmJure[];
  surveillants: string[];
  organisme: OrganismeInfo;
  candidats: GotrmCandidat[];
}

export function gotrmCandidatNomComplet(c: GotrmCandidat): string {
  return [c.civilite, c.prenom, c.nom].filter(Boolean).join(" ").trim();
}

/** Identifiant candidat au format GOTRM-MMYY-NN */
export function buildGotrmIdentifiant(dateRef: string, index: number): string {
  const d = dateRef ? new Date(dateRef) : new Date();
  const safe = isNaN(d.getTime()) ? new Date() : d;
  const mm = String(safe.getMonth() + 1).padStart(2, "0");
  const yy = String(safe.getFullYear()).slice(-2);
  return `GOTRM-${mm}${yy}-${String(index + 1).padStart(2, "0")}`;
}
