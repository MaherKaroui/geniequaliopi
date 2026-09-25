export interface VAEOrganisme {
  nom: string;
  adresse: string;
  siret: string;
  nda: string;
  dirigeant: string;
  email: string;
  telephone?: string;
  lienVisio: string;
  referentHandicap: string;
  prixTTC: string; // "4 000 €"
  duree: string; // "40 heures à distance"
  logo?: string;
  signature?: string;
  tampon?: string;
}

export interface VAEBloc {
  code: string;
  intitule: string;
}

export interface VAECertification {
  intitule: string;
  rncp: string; // ex "38362"
  niveau: string; // "6"
  certificateur: string;
  dateEcheance: string;
  lien: string; // https://www.francecompetences.fr/recherche/rncp/38362/
  blocs: VAEBloc[];
}

export interface VAEExperience {
  poste: string;
  entreprise: string;
  dateDebut: string;
  dateFin: string;
  missions: string;
}

export interface VAEDiplome {
  intitule: string;
  etablissement: string;
  annee: string;
}

export interface VAECandidat {
  civilite: "M." | "Mme" | "";
  prenom: string;
  nom: string;
  dateNaissance: string; // YYYY-MM-DD
  lieuNaissance?: string;
  adresse: string;
  codePostal: string;
  ville: string;
  telephone: string;
  email: string;
  emploiActuel: string;
  employeur: string;
  statut: "Salarié" | "Demandeur d'emploi" | "Autre" | "";
  niveauFormation: string;
  diplomes: VAEDiplome[];
  experiences: VAEExperience[];
  competences?: string[];
  signature?: string; // data URL
  tampon?: string;    // data URL
  fictif?: boolean;
}

export interface VAESession {
  dateEntretienPositionnement: string;
  dateDebut: string;
  dateFin: string;
  dateDemandeRecevabilite: string;
  modalite: string; // "100 % à distance"
  financement: string; // "CPF"
  lieuSignature: string;
  dateSignature: string;
}

export interface VAESituationBloc {
  codeBloc: string;
  intitule: string;
  situations: string; // long text
}

export interface VAEContents {
  motivation: string;
  parcours: string;
  situationsParBloc: VAESituationBloc[];
  besoins: {
    attentes: string;
    freins: string;
    disponibilites: string;
    materiel: string;
    handicap: string;
  };
  planAccompagnement: string;
  synthese: string;
}

export interface VAEData {
  organisme: VAEOrganisme;
  certification: VAECertification;
  candidat: VAECandidat;
  session: VAESession;
  contents: VAEContents;
}

export const DEFAULT_ORGANISME: VAEOrganisme = {
  nom: "",
  adresse: "",
  siret: "",
  nda: "",
  dirigeant: "",
  email: "",
  telephone: "",
  lienVisio: "",
  referentHandicap: "",
  prixTTC: "",
  duree: "",
};

export const EMPTY_CERTIFICATION: VAECertification = {
  intitule: "",
  rncp: "",
  niveau: "",
  certificateur: "",
  dateEcheance: "",
  lien: "",
  blocs: [],
};

export const EMPTY_CANDIDAT: VAECandidat = {
  civilite: "",
  prenom: "",
  nom: "",
  dateNaissance: "",
  adresse: "",
  codePostal: "",
  ville: "",
  telephone: "",
  email: "",
  emploiActuel: "",
  employeur: "",
  statut: "",
  niveauFormation: "",
  diplomes: [],
  experiences: [],
};

export const EMPTY_SESSION: VAESession = {
  dateEntretienPositionnement: "",
  dateDebut: "",
  dateFin: "",
  dateDemandeRecevabilite: "",
  modalite: "100 % à distance",
  financement: "CPF",
  lieuSignature: "Luxeuil-les-Bains",
  dateSignature: new Date().toISOString().slice(0, 10),
};

export const EMPTY_CONTENTS: VAEContents = {
  motivation: "",
  parcours: "",
  situationsParBloc: [],
  besoins: { attentes: "", freins: "", disponibilites: "", materiel: "", handicap: "" },
  planAccompagnement: "",
  synthese: "",
};
