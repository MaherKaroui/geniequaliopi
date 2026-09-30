export type DocTheme = 'classique' | 'moderne' | 'elegant' | 'minimaliste' | 'bold' | 'nature' | 'academique' | 'corporate' | 'editorial' | 'neobrutaliste' | 'futuriste' | 'luxe' | 'scandinave' | 'artdeco' | 'consulting' | 'notarial' | 'techstartup' | 'botanique' | 'suisse' | 'monochrome' | 'pastel' | 'presse' | 'terracotta' | 'simplepro' | 'epure';
export type HeadingStyle = 'line-bottom' | 'filled' | 'gradient' | 'left-bar' | 'underline-double' | 'plain' | 'pill';
export type HeaderStyle = 'classic' | 'banner' | 'compact' | 'elegant' | 'boxed' | 'split';

export interface DocStyleConfig {
  primaryColor: string;    // hex color for headers, accents
  secondaryColor: string;  // hex color for section borders
  fontFamily: string;      // font family for body
  headingFont: string;     // font family for headings
  fontSize: number;        // base font size in px
  logoPosition: 'left' | 'center' | 'right';
  theme: DocTheme;
  showSectionBorder: boolean;
  headingStyle: HeadingStyle;
  headerStyle: HeaderStyle;
}

export const DEFAULT_DOC_STYLE: DocStyleConfig = {
  primaryColor: "#1e3a7b",
  secondaryColor: "#2d8659",
  fontFamily: "'Segoe UI', Arial, sans-serif",
  headingFont: "'Segoe UI', Arial, sans-serif",
  fontSize: 13,
  logoPosition: 'center',
  theme: 'classique',
  showSectionBorder: true,
  headingStyle: 'line-bottom',
  headerStyle: 'classic',
};

export interface OrganismeInfo {
  nom: string;
  siret: string;
  adresse: string;
  codePostal: string;
  ville: string;
  telephone: string;
  email: string;
  siteWeb: string;
  nda: string;
  dirigeant: string;
  responsablePedagogique: string;
  referentHandicap: string;
  referentQualite: string;
  poleAdministratif: string;
  relationEntreprises: string;
  referentMobilite: string;
  referentDecrochage?: string;
  coordinateurPedagogique?: string;
  conseillerFormation?: string;
  referentNumerique?: string;
  domainesFormation: string;
  typesActions: ('actions-formation' | 'bilans-competences' | 'vae' | 'apprentissage')[];
  certifications: string;
  outilsUtilises: string;
  version: string;
  dateMaj: string;
  logoUrl?: string;
  signatureUrl?: string;
  tamponUrl?: string;
  /** Régime de TVA : exonéré (art. 261-4-4° a du CGI, défaut) ou assujetti. */
  regimeTva?: "exonere" | "assujetti";
  numeroCertificatQualiopi?: string;
  organismeCertificateur?: string;
  dateObtentionQualiopi?: string;
  dateFinValiditeQualiopi?: string;
  /** Type d'audit préparé : « auto » (défaut) = déduit du certificat Qualiopi. */
  typeAudit?: "auto" | "initial" | "surveillance" | "renouvellement";
}

export interface StagiaireInfo {
  civilite: "M." | "Mme" | "";
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  entreprise: string;
  responsableEntreprise?: string;
  signatureResponsableUrl?: string;
  poste: string;
  dateNaissance: string;
  dateDebutFormation?: string;
  dateFinFormation?: string;
  tarifFormation?: string;
  signatureUrl?: string;
  // Champs fiche de renseignement CFA
  adresse?: string;
  codePostal?: string;
  commune?: string;
  nationalite?: string;
  nir?: string;
  departementNaissance?: string;
  communeNaissance?: string;
  diplome?: string;
  rqth?: "oui" | "non" | "";
  formateur?: string;
  formateurSignatureUrl?: string;
  adresseEntreprise?: string;
  siretEntreprise?: string;
  dateNaissanceResponsable?: string;
  emailResponsable?: string;
  numeroAction?: string;
  /** Financeur de la formation (CPF, OPCO, Entreprise, Personnel, France Travail, Région, Autre) */
  financeur?: string;
  /** true si le stagiaire a été produit par un générateur de données fictives */
  fictif?: boolean;
}

export interface ReferentielAnalyse {
  code: string;
  type: "RNCP" | "RS" | "";
  intitule: string;
  niveau: number | null;
  certificateur: string;
  dateFinEnregistrement: string;
  actif: boolean | null;
  blocs: { code: string; intitule: string }[];
  prerequis: string;
  publicVise: string;
  codesRome: string[];
  metiers: string[];
  secteurs: string[];
  modalitesEvaluation: string;
}

export interface FormationInfo {
  intitule: string;
  objectifs: string;
  prerequis: string;
  duree: string;
  modalites: string;
  tarif: string;
  programme: string;
  methodesEvaluation: string;
  moyensPedagogiques: string;
  publicVise: string;
  delaiAcces: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  nombreParticipants: string;
  formateur: string;
  codeRNCP?: string;
  rythmeAlternance?: string;
  /** Type d'action Qualiopi : pilote la « Nature de l'action » des contrats/conventions. */
  typeAction?: 'actions-formation' | 'bilans-competences' | 'vae' | 'apprentissage';
  formateurSignatureUrl?: string;
  // ===== Indicateurs de résultats (critère 1) — saisis, jamais fabriqués =====
  anneeIndicateurs?: string;
  tauxSatisfaction?: string;
  nombreAvisSatisfaction?: string;
  tauxAssiduite?: string;
  nombreStagiairesFormes?: string;
  nbPresentesCertification?: string;
  nbAdmisCertification?: string;
  commentaireIndicateurs?: string;
  /** Fiche France Compétences analysée, conservée avec le dossier. */
  referentiel?: ReferentielAnalyse;
}

export interface IndicateurData {
  numero: number;
  titre: string;
  niveauAttendu: string;
  preuves: string;
  reponse: string;
}

export interface CritereData {
  numero: number;
  titre: string;
  indicateurs: IndicateurData[];
}

export interface QualiopiData {
  organisme: OrganismeInfo;
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
  criteres: CritereData[];
}

export interface DocEntry {
  id: string;
  nom: string;
  critere: number;
  indicateur: number;
  template: string;
  params?: Record<string, any>;
}

export interface CritereInfo {
  numero: number;
  titre: string;
  indicateurs: { numero: number; titre: string }[];
}

// ===== Référentiel national qualité — décret n° 2026-728 (en vigueur au 01/11/2026), 33 indicateurs =====
export const CRITERES_INFO: CritereInfo[] = [
  {
    numero: 1, titre: "Information du public",
    indicateurs: [
      { numero: 1, titre: "Information accessible et vérifiable sur les prestations" },
      { numero: 2, titre: "Indicateurs de résultats adaptés aux prestations" },
      { numero: 3, titre: "Taux d'obtention des certifications" },
    ]
  },
  {
    numero: 2, titre: "Objectifs et adaptation des prestations",
    indicateurs: [
      { numero: 4, titre: "Analyse du besoin du bénéficiaire" },
      { numero: 5, titre: "Objectifs opérationnels et évaluables" },
      { numero: 6, titre: "Contenus et modalités adaptés" },
      { numero: 7, titre: "Adéquation contenus / exigences certification" },
      { numero: 8, titre: "Positionnement et évaluation des acquis à l'entrée" },
    ]
  },
  {
    numero: 3, titre: "Accueil, accompagnement, suivi et évaluation",
    indicateurs: [
      { numero: 9, titre: "Conditions de déroulement de la prestation" },
      { numero: 10, titre: "Adaptation de la prestation et accompagnement" },
      { numero: 11, titre: "Évaluation de l'atteinte des objectifs" },
      { numero: 12, titre: "Engagement des bénéficiaires et prévention des ruptures" },
      { numero: 13, titre: "Coordination et progressivité des apprentissages (alternance)" },
      { numero: 14, titre: "Accompagnement socio-professionnel et citoyenneté" },
      { numero: 15, titre: "Droits et devoirs de l'apprenti, santé et sécurité" },
      { numero: 16, titre: "Présentation des bénéficiaires à la certification" },
    ]
  },
  {
    numero: 4, titre: "Adéquation des moyens pédagogiques, techniques et d'encadrement",
    indicateurs: [
      { numero: 17, titre: "Moyens humains, techniques et environnement adapté" },
      { numero: 18, titre: "Coordination des intervenants internes et externes" },
      { numero: 19, titre: "Ressources pédagogiques mises à disposition" },
      { numero: 20, titre: "Personnels dédiés : mobilité, référent handicap, conseil de perfectionnement" },
    ]
  },
  {
    numero: 5, titre: "Qualification et développement des compétences du personnel",
    indicateurs: [
      { numero: 21, titre: "Compétences des intervenants adaptées aux prestations" },
      { numero: 22, titre: "Entretien et développement des compétences des salariés" },
    ]
  },
  {
    numero: 6, titre: "Investissement dans l'environnement professionnel",
    indicateurs: [
      { numero: 23, titre: "Veille légale et réglementaire" },
      { numero: 24, titre: "Veille sur les évolutions des compétences, métiers et emplois" },
      { numero: 25, titre: "Veille sur les innovations pédagogiques et technologiques" },
      { numero: 26, titre: "Accueil et accompagnement des publics en situation de handicap" },
      { numero: 27, titre: "Conformité de la sous-traitance et du portage salarial" },
      { numero: 28, titre: "Formation en situation de travail et réseau partenaires" },
      { numero: 29, titre: "Insertion professionnelle et poursuite d'étude" },
    ]
  },
  {
    numero: 7, titre: "Appréciation et amélioration continue des prestations",
    indicateurs: [
      { numero: 30, titre: "Recueil des appréciations des parties prenantes" },
      { numero: 31, titre: "Traitement des difficultés, réclamations et aléas" },
      { numero: 32, titre: "Amélioration continue et analyse des risques sur la qualité" },
      { numero: 33, titre: "Évaluation des contenus et des enseignements par les apprenants (CFA)" },
    ]
  },
];

// Keep old CRITERES for backward compat with CriteresForm
export const CRITERES: CritereData[] = [
  {
    numero: 1, titre: "Information du public",
    indicateurs: [
      { numero: 1, titre: "Information accessible et vérifiable sur les prestations", niveauAttendu: "Information accessible, exhaustive, datée et actualisée sur prérequis, objectifs, durée, modalités, tarifs, contacts, méthodes d'évaluation, accessibilité handicap.", preuves: "Site internet, catalogues, fiches formation, CGV, mentions légales.", reponse: "" },
      { numero: 2, titre: "Indicateurs de résultats adaptés aux prestations", niveauAttendu: "Indicateurs de résultats chiffrés, adaptés à la nature des prestations et des publics.", preuves: "Taux de satisfaction, taux de réussite, taux d'insertion, statistiques annuelles.", reponse: "" },
      { numero: 3, titre: "Taux d'obtention des certifications", niveauAttendu: "Information chiffrée sur les taux d'obtention, possibilités de validation par blocs, équivalences et débouchés.", preuves: "Taux d'obtention, blocs de compétences, passerelles, suites de parcours.", reponse: "" },
    ]
  },
  {
    numero: 2, titre: "Objectifs et adaptation des prestations",
    indicateurs: [
      { numero: 4, titre: "Analyse du besoin du bénéficiaire", niveauAttendu: "Analyse du besoin en lien avec l'entreprise et/ou le financeur.", preuves: "Questionnaires de positionnement, entretiens, analyses.", reponse: "" },
      { numero: 5, titre: "Objectifs opérationnels et évaluables", niveauAttendu: "Objectifs formulés de manière opérationnelle et évaluable.", preuves: "Programmes avec objectifs 'être capable de...'.", reponse: "" },
      { numero: 6, titre: "Contenus et modalités adaptés", niveauAttendu: "Contenus et modalités adaptés aux objectifs et aux publics bénéficiaires.", preuves: "Déroulés pédagogiques, programmes, plans pédagogiques.", reponse: "" },
      { numero: 7, titre: "Adéquation contenus / exigences certification", niveauAttendu: "Adéquation du contenu aux exigences de la certification visée.", preuves: "Référentiel de certification, programme aligné.", reponse: "" },
      { numero: 8, titre: "Positionnement et évaluation des acquis à l'entrée", niveauAttendu: "Procédures de positionnement et d'évaluation des acquis à l'entrée.", preuves: "Tests de positionnement, QCM, grilles d'évaluation.", reponse: "" },
    ]
  },
  {
    numero: 3, titre: "Accueil, accompagnement, suivi et évaluation",
    indicateurs: [
      { numero: 9, titre: "Conditions de déroulement de la prestation", niveauAttendu: "Information des bénéficiaires sur les conditions de déroulement.", preuves: "Convocations, livret d'accueil, convention, règlement intérieur.", reponse: "" },
      { numero: 10, titre: "Adaptation de la prestation et accompagnement", niveauAttendu: "Mise en œuvre et adaptation de la prestation, accompagnement et suivi.", preuves: "Feuilles d'émargement, rapports de connexion, tableaux de présence.", reponse: "" },
      { numero: 11, titre: "Évaluation de l'atteinte des objectifs", niveauAttendu: "Évaluation de l'atteinte par les bénéficiaires des objectifs de la prestation.", preuves: "Évaluations formatives et sommatives, QCM, exercices pratiques.", reponse: "" },
      { numero: 12, titre: "Engagement des bénéficiaires et prévention des ruptures", niveauAttendu: "Mesures pour favoriser l'engagement et prévenir les ruptures de parcours.", preuves: "Attestations, certificats, suivi des abandons.", reponse: "" },
      { numero: 13, titre: "Coordination et progressivité des apprentissages (alternance)", niveauAttendu: "Anticipation des missions, coordination et progressivité des apprentissages centre/entreprise.", preuves: "Livret d'apprentissage, suivi tuteur, grille compétences alternance.", reponse: "" },
      { numero: 14, titre: "Accompagnement socio-professionnel et citoyenneté", niveauAttendu: "Accompagnement socio-professionnel, éducatif et relatif à la citoyenneté.", preuves: "Suivi post-formation, questionnaire insertion, accompagnement individualisé.", reponse: "" },
      { numero: 15, titre: "Droits et devoirs de l'apprenti, santé et sécurité", niveauAttendu: "Information des apprentis sur leurs droits et devoirs, santé et sécurité.", preuves: "Livret apprenti, charte, règlement intérieur apprenti.", reponse: "" },
      { numero: 16, titre: "Présentation des bénéficiaires à la certification", niveauAttendu: "Respect des exigences formelles de l'autorité de certification.", preuves: "Convocations examen, PV de jury, conditions de certification.", reponse: "" },
    ]
  },
  {
    numero: 4, titre: "Adéquation des moyens",
    indicateurs: [
      { numero: 17, titre: "Moyens humains, techniques et environnement adapté", niveauAttendu: "Mise à disposition de moyens humains et techniques adaptés.", preuves: "Inventaire matériel, liste moyens, CV formateurs.", reponse: "" },
      { numero: 18, titre: "Coordination des intervenants internes et externes", niveauAttendu: "Mobilisation et coordination des différents intervenants.", preuves: "CR réunions, planning formateurs, coordination pédagogique.", reponse: "" },
      { numero: 19, titre: "Ressources pédagogiques mises à disposition", niveauAttendu: "Mise à disposition et appropriation des ressources pédagogiques.", preuves: "Supports de cours, plateforme e-learning, guides.", reponse: "" },
      { numero: 20, titre: "Personnels dédiés : mobilité, handicap, perfectionnement", niveauAttendu: "Personnel dédié à la mobilité, référent handicap, conseil de perfectionnement.", preuves: "Fiches de poste, organigramme, PV conseil de perfectionnement.", reponse: "" },
    ]
  },
  {
    numero: 5, titre: "Qualification et développement des compétences",
    indicateurs: [
      { numero: 21, titre: "Compétences des intervenants adaptées aux prestations", niveauAttendu: "Compétences déterminées, mobilisées et évaluées.", preuves: "CV, diplômes, fiches compétences, évaluations formateurs, portfolios, attestations.", reponse: "" },
      { numero: 22, titre: "Entretien et développement des compétences des salariés", niveauAttendu: "Entretien et développement des compétences des salariés.", preuves: "Plan de développement, formations continues, entretiens professionnels.", reponse: "" },
    ]
  },
  {
    numero: 6, titre: "Investissement dans l'environnement professionnel",
    indicateurs: [
      { numero: 23, titre: "Veille légale et réglementaire", niveauAttendu: "Veille légale et réglementaire sur la formation professionnelle.", preuves: "Procédure de veille, tableaux de veille, CR de veille, newsletters.", reponse: "" },
      { numero: 24, titre: "Veille sur les évolutions des compétences, métiers et emplois", niveauAttendu: "Veille sur les évolutions des compétences, des métiers et des emplois.", preuves: "Tableaux de veille métiers, analyses sectorielles, études prospectives.", reponse: "" },
      { numero: 25, titre: "Veille sur les innovations pédagogiques et technologiques", niveauAttendu: "Veille sur les innovations pédagogiques et technologiques.", preuves: "Fiches innovation, benchmark outils, veille pédagogique.", reponse: "" },
      { numero: 26, titre: "Accueil et accompagnement des publics en situation de handicap", niveauAttendu: "Mobilisation des expertises, outils et réseaux pour accueillir et accompagner les publics handicapés.", preuves: "Procédure handicap, réseau partenaires, aménagements.", reponse: "" },
      { numero: 27, titre: "Conformité de la sous-traitance et du portage salarial", niveauAttendu: "Respect de la conformité au RNQ par le sous-traitant ou le salarié porté, tracé dans chaque contrat de sous-traitance (décret n° 2026-728).", preuves: "Contrats de sous-traitance / portage avec clause Qualiopi, charte qualité, contrôles.", reponse: "" },
      { numero: 28, titre: "Formation en situation de travail et réseau partenaires", niveauAttendu: "Mobilisation du réseau de partenaires socio-économiques.", preuves: "Conventions partenariats, accueil entreprise, ingénierie FEST.", reponse: "" },
      { numero: 29, titre: "Insertion professionnelle et poursuite d'étude", niveauAttendu: "Actions concourant à l'insertion professionnelle ou la poursuite d'étude.", preuves: "Taux d'insertion, partenariats entreprises, suivi des diplômés.", reponse: "" },
    ]
  },
  {
    numero: 7, titre: "Appréciation et amélioration continue",
    indicateurs: [
      { numero: 30, titre: "Recueil des appréciations des parties prenantes", niveauAttendu: "Recueil des appréciations : bénéficiaires, financeurs, équipes pédagogiques, entreprises.", preuves: "Questionnaires de satisfaction, enquêtes, synthèses retours.", reponse: "" },
      { numero: 31, titre: "Traitement des difficultés, réclamations et aléas", niveauAttendu: "Modalités de traitement des difficultés, réclamations et aléas.", preuves: "Registre réclamations, procédure de traitement, fiches réclamation.", reponse: "" },
      { numero: 32, titre: "Amélioration continue et analyse des risques sur la qualité", niveauAttendu: "Démarche d'amélioration continue à partir de l'analyse des appréciations et réclamations, et analyse des risques sur la qualité des formations délivrées (décret n° 2026-728).", preuves: "Tableau d'amélioration continue, analyse des risques qualité, fiches action, revue de direction.", reponse: "" },
      { numero: 33, titre: "Évaluation des contenus et des enseignements par les apprenants (CFA)", niveauAttendu: "Dispositif d'évaluation des contenus et des enseignements par les apprenants, distinct de la satisfaction, résultats partagés avec l'équipe pédagogique, plan d'amélioration dont l'efficacité est mesurée.", preuves: "Grille d'évaluation des enseignements, synthèse partagée, plan d'action, mesure d'efficacité.", reponse: "" },
    ]
  }
];

export const DOCUMENTS_GENERABLES = [
  { id: 'convention', nom: 'Convention de formation', description: 'Convention entre l\'organisme et le client' },
  { id: 'programme', nom: 'Programme de formation', description: 'Programme détaillé de la formation' },
  { id: 'convocation', nom: 'Convocation', description: 'Convocation du stagiaire' },
  { id: 'emargement', nom: 'Feuille d\'émargement', description: 'Feuille de présence' },
  { id: 'evaluation-acquis', nom: 'Évaluation des acquis', description: 'Questionnaire d\'évaluation' },
  { id: 'evaluation-satisfaction', nom: 'Questionnaire de satisfaction', description: 'Évaluation de la satisfaction' },
  { id: 'attestation', nom: 'Attestation de formation', description: 'Attestation de fin de formation' },
  { id: 'reglement', nom: 'Règlement intérieur', description: 'Règlement intérieur' },
  { id: 'livret-accueil', nom: 'Livret d\'accueil', description: 'Livret d\'accueil du stagiaire' },
  { id: 'recueil-besoins', nom: 'Recueil des besoins', description: 'Questionnaire de recueil' },
  { id: 'bilan-formation', nom: 'Bilan de formation', description: 'Bilan pédagogique' },
  { id: 'dossier-qualiopi', nom: 'Dossier Qualiopi complet', description: 'Dossier avec tous les critères' },
];
