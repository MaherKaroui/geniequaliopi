import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import type { Jour, Creneau } from "./bdcModel";

export interface BdcSessionInput {
  numero: number;
  phase: 1 | 2 | 3;
  date: string;
  heureDebut: string;
  heureFin: string;
  duree: number;
  modalite: "presentiel" | "distanciel";
  objet: string;
  presence: boolean;
  compteRendu: string;
}

export interface BdcDeclarations {
  besoins: string;
  attentes: string;
  contraintes: string;
  parcours: string;
  competences: string;
  motivations: string;
  metiers: string;
  enquete: string;
  entretien: string;
  carnet: string;
  planAction: string;
  synthese: string;
  satisfaction: string;
  suivi: string;
}

export interface StandaloneBdcData {
  organisme: OrganismeInfo;
  formation: FormationInfo;
  beneficiaire: StagiaireInfo;
  jours: Jour[];
  creneaux: Creneau[];
  dateEntretien: string;
  dateSignature: string;
  reglement: string;
  paiement: string;
  mediateur: string;
  declarations: BdcDeclarations;
  sessions: BdcSessionInput[];
}

export function emptyBdcData(): StandaloneBdcData {
  return {
    organisme: {
      nom: "", siret: "", adresse: "", codePostal: "", ville: "", telephone: "", email: "", siteWeb: "",
      nda: "", dirigeant: "", responsablePedagogique: "", referentHandicap: "", referentQualite: "",
      poleAdministratif: "", relationEntreprises: "", referentMobilite: "", domainesFormation: "",
      typesActions: ["bilans-competences"], certifications: "", outilsUtilises: "", version: "1",
      dateMaj: new Date().toISOString().slice(0, 10),
    },
    formation: {
      intitule: "Bilan de compétences", objectifs: "", prerequis: "", duree: "", modalites: "Présentiel",
      tarif: "", programme: "", methodesEvaluation: "", moyensPedagogiques: "", publicVise: "",
      delaiAcces: "", dateDebut: "", dateFin: "", lieu: "", nombreParticipants: "1", formateur: "",
      typeAction: "bilans-competences",
    },
    beneficiaire: { civilite: "", prenom: "", nom: "", email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "", financeur: "Personnel" },
    jours: ["lundi", "mardi", "mercredi", "jeudi", "vendredi"],
    creneaux: ["matin", "apres-midi"],
    dateEntretien: "", dateSignature: "", reglement: "", paiement: "", mediateur: "",
    declarations: { besoins: "", attentes: "", contraintes: "", parcours: "", competences: "", motivations: "", metiers: "", enquete: "", entretien: "", carnet: "", planAction: "", synthese: "", satisfaction: "", suivi: "" },
    sessions: [],
  };
}

export const BDC_DECLARATION_FIELDS: Array<{ key: keyof BdcDeclarations; label: string }> = [
  { key: "besoins", label: "Demande et besoins exprimés" },
  { key: "attentes", label: "Attentes et objectifs personnels" },
  { key: "contraintes", label: "Contraintes, disponibilités et aménagements" },
  { key: "parcours", label: "Parcours professionnel et formations suivies" },
  { key: "competences", label: "Compétences et réalisations décrites" },
  { key: "motivations", label: "Motivations, intérêts et valeurs" },
  { key: "metiers", label: "Métiers et pistes à explorer" },
  { key: "enquete", label: "Enquêtes métier : sources, dates et enseignements" },
  { key: "entretien", label: "Compte rendu réel de l’entretien préalable" },
  { key: "carnet", label: "Carnet de bord : travaux et exercices réalisés" },
  { key: "planAction", label: "Plan d’action : actions, échéances et ressources" },
  { key: "synthese", label: "Synthèse validée avec le bénéficiaire" },
  { key: "satisfaction", label: "Réponses recueillies à la satisfaction à chaud" },
  { key: "suivi", label: "Réponses et compte rendu du suivi à six mois" },
];