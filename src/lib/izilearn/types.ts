/**
 * Données transmises par IZILearn (izilearn.netlify.app) à l'espace /izilearn.
 * Tout vient de la base IZILearn : aucune valeur n'est complétée ici.
 * Les preuves (émargements, connexions, réponses) ne sont présentes que si elles
 * existent réellement ; sinon le document est rendu en trame vierge nominative.
 */

export type IzTypeAction = "actions-formation" | "bilans-competences" | "vae" | "apprentissage";

export interface IzOrganisme {
  id: string;
  nom: string;
  siret?: string;
  nda?: string;
  uai?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  telephone?: string;
  email?: string;
  siteWeb?: string;
  dirigeant?: string;
  referentHandicap?: string;
  referentQualite?: string;
  logoUrl?: string;
  tamponUrl?: string;
  signatureUrl?: string;
  tvaExonere?: boolean;
}

export interface IzContenu {
  chapitres: { titre: string; description?: string; sections: { titre: string; html: string }[] }[];
  exercices: { titre: string; consigne: string; reponseAttendue?: string }[];
  positionnement: { question: string; options: string[] }[];
  examenFinal?: { question: string; options: string[] }[];
  /** Contenu créé par l'IA et pas encore validé par un formateur. */
  brouillonIA?: boolean;
}

export interface IzModule { titre: string; objectifs?: string; dureeHeures?: number | null; bloc?: string }
export interface IzBloc { code: string; intitule: string; competences?: string[] }

export interface IzFormation {
  id: string;
  intitule: string;
  code?: string;
  codeCertification?: string;
  typeAction: IzTypeAction;
  objectifs?: string;
  prerequis?: string;
  publicVise?: string;
  dureeHeures?: number | null;
  modalitesAcces?: string;
  delaiAcces?: string;
  tarif?: string;
  methodesPedagogiques?: string;
  methodesEvaluation?: string;
  accessibilite?: string;
  modules: IzModule[];
  blocs: IzBloc[];
  /** Date de version du programme (sert de date de mise à jour des documents). */
  miseAJour?: string;
  /** Contenu pédagogique de la formation dans IZILearn (leçons, exercices, test d'entrée) — créé automatiquement par l'IA d'IZILearn s'il manquait. */
  contenu?: IzContenu | null;
  version?: number;
}

export interface IzSlot {
  id: string;
  debut: string;          // ISO
  fin: string;            // ISO
  demiJournee: "matin" | "apres_midi";
  mode: string;           // presentiel | distanciel | hybride…
  formateur?: string;
}

export interface IzSignature { slotId: string; statut: string; signeLe: string; svg?: string | null; retardMinutes?: number | null }
export interface IzConnexion { slotId?: string | null; debut: string; fin?: string | null; secondes: number; source: "meet" | "lms" }
export interface IzQR { question: string; reponse: string }
export interface IzReponses { titre: string; date: string; reponses: IzQR[]; score?: string | null; signataire?: string | null }
export interface IzQuiz { titre: string; date: string; score?: number | null; max?: number | null; reussi?: boolean | null; appreciation?: string | null }

export interface IzApprenant {
  inscriptionId: string;
  contactId: string;
  civilite?: string;
  prenom: string;
  nom: string;
  email?: string;
  telephone?: string;
  dateNaissance?: string;
  adresse?: string;
  poste?: string;
  /** Reusable signature supplied explicitly by the learner, not attendance evidence. */
  signatureUrl?: string;
  entreprise?: { nom: string; siret?: string; adresse?: string; representant?: string; email?: string } | null;
  financeur?: string;
  statut: string;
  heuresPrevues?: number | null;
  handicap?: { declare: boolean; details?: string };
  signatures: IzSignature[];
  connexions: IzConnexion[];
  besoins?: IzReponses | null;
  besoinsEntreprise?: IzReponses | null;
  positionnement?: IzQuiz[];
  examenFinal?: IzQuiz[];
  bilanChaud?: IzReponses | null;
  bilanFroid?: IzReponses | null;
}

export interface IzSession {
  id: string;
  code?: string;
  libelle?: string;
  dateDebut: string;      // YYYY-MM-DD
  dateFin: string;
  modalite: string;
  lieu?: string;
  formateur?: string;
  formateurEmail?: string;
  formateurSignatures?: { slotId: string; signeLe: string; svg?: string | null }[];
  tarif?: string;
  places?: number;
}

export interface IzPayload {
  version: 1;
  source: { app: "izilearn"; url: string; orgId: string; sessionId: string; utilisateur?: string };
  organisme: IzOrganisme;
  formation: IzFormation;
  session: IzSession;
  creneaux: IzSlot[];
  apprenants: IzApprenant[];
  /** Questions de la trame d'évaluation des besoins d'IZILearn (même libellés que le formulaire en ligne). */
  questionsBesoins?: { apprenant: string[]; entreprise: string[] };
}

/** Fichier renvoyé à IZILearn pour être rangé dans les documents de la session. */
export interface IzFichierRetour {
  nom: string;
  dossier: string;
  categorie: string;
  inscriptionId?: string;
  contactId?: string;
  blob: Blob;
}

export const IZ_MSG = {
  ready: "geniequaliopi:ready",
  data: "izilearn:data",
  save: "geniequaliopi:save",
  saved: "izilearn:saved",
} as const;
