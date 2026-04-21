/**
 * Catalogue des documents demandés par OPCO Mobilités lors d'un contrôle de service fait.
 * Source : Courrier de demande de pièces OPCO Mobilités (réf. dossier type 202604140414_*).
 *
 * Le module est volontairement orienté "audit OPCO" : il reprend les pièces standards
 * exigées (conformité légale, capacité pédagogique et matérielle, contrôle du service rendu).
 */

export type OpcoCategory = "conformite" | "pedagogique" | "service_apprenant";

export interface OpcoDocumentItem {
  /** Code court (A1, A2, B1, …) repris dans le ZIP et la nomenclature */
  code: string;
  /** Libellé court (sera utilisé dans le nom de fichier) */
  label: string;
  /** Libellé long affiché dans la checklist */
  longLabel: string;
  /** Description / précision OPCO */
  description: string;
  /** Templates internes capables de générer ce document (vide = upload manuel) */
  autoTemplates: string[];
  /** Document par stagiaire (génère un fichier par apprenant) */
  perStagiaire: boolean;
  /** Catégorie OPCO */
  category: OpcoCategory;
  /** Document demandé pour TOUS les apprenants (vs échantillon) */
  forAllApprentis?: boolean;
  /** Document à uploader manuellement (pas de génération auto possible) */
  manualUpload?: boolean;
}

export const OPCO_CATEGORIES: Record<OpcoCategory, string> = {
  conformite: "A. Conformité légale et administrative",
  pedagogique: "B. Capacité pédagogique et matérielle",
  service_apprenant: "C. Contrôle du service rendu aux apprenants",
};

export const OPCO_DOCUMENTS: OpcoDocumentItem[] = [
  // ════════════════════════════════════════════════
  // A. CONFORMITÉ LÉGALE ET ADMINISTRATIVE
  // ════════════════════════════════════════════════
  {
    code: "A1",
    label: "Extrait K-Bis",
    longLabel: "Extrait K-Bis de moins de 3 mois",
    description: "Extrait K-Bis du CFA / OF, daté de moins de 3 mois",
    autoTemplates: [],
    perStagiaire: false,
    category: "conformite",
    manualUpload: true,
  },
  {
    code: "A2",
    label: "Statuts",
    longLabel: "Statuts à jour",
    description: "Statuts juridiques à jour de l'organisme",
    autoTemplates: ["statuts_organisme"],
    perStagiaire: false,
    category: "conformite",
  },
  {
    code: "A3",
    label: "Declaration Activite",
    longLabel: "Déclaration d'activité (NDA)",
    description: "Récépissé de déclaration d'activité de prestataire de formation (NDA)",
    autoTemplates: ["declaration_activite_nda"],
    perStagiaire: false,
    category: "conformite",
  },
  {
    code: "A4",
    label: "Certificat Qualiopi",
    longLabel: "Certificat Qualiopi en cours de validité",
    description: "Certificat Qualiopi (actions de formation et/ou apprentissage) en cours de validité",
    autoTemplates: [],
    perStagiaire: false,
    category: "conformite",
    manualUpload: true,
  },
  {
    code: "A5",
    label: "Attestation Assurance",
    longLabel: "Attestation d'assurance Responsabilité Civile",
    description: "Attestation d'assurance RC professionnelle en cours de validité",
    autoTemplates: [],
    perStagiaire: false,
    category: "conformite",
    manualUpload: true,
  },
  {
    code: "A6",
    label: "BPF",
    longLabel: "Dernier Bilan Pédagogique et Financier",
    description: "Dernier Bilan Pédagogique et Financier (BPF) déposé",
    autoTemplates: [],
    perStagiaire: false,
    category: "conformite",
    manualUpload: true,
  },
  {
    code: "A7",
    label: "Reglement Interieur",
    longLabel: "Règlement intérieur du CFA",
    description: "Règlement intérieur applicable aux apprenants / apprentis",
    autoTemplates: ["reglement_interieur_cfa_v2", "reglement_interieur"],
    perStagiaire: false,
    category: "conformite",
  },
  {
    code: "A8",
    label: "CGV",
    longLabel: "Conditions Générales de Vente",
    description: "CGV applicables aux prestations de formation et d'apprentissage",
    autoTemplates: ["cgv_cfa", "cgv"],
    perStagiaire: false,
    category: "conformite",
  },
  {
    code: "A9",
    label: "Organigramme",
    longLabel: "Organigramme de la structure",
    description: "Organigramme à jour avec les fonctions clés (direction, pédagogique, qualité, handicap)",
    autoTemplates: ["organigramme"],
    perStagiaire: false,
    category: "conformite",
  },

  // ════════════════════════════════════════════════
  // B. CAPACITÉ PÉDAGOGIQUE ET MATÉRIELLE
  // ════════════════════════════════════════════════
  {
    code: "B1",
    label: "Programme Formation",
    longLabel: "Programme détaillé de la formation",
    description: "Programme de formation : objectifs, compétences visées, durée, modalités, évaluation",
    autoTemplates: ["programme_formation"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "B2",
    label: "Referentiel Certification",
    longLabel: "Référentiel de la certification visée",
    description: "Fiche RNCP / RS et référentiel de compétences associé",
    autoTemplates: ["fiche_certification_rs", "referentiel_certification"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "B3",
    label: "Calendrier Alternance",
    longLabel: "Calendrier d'alternance CFA / Entreprise",
    description: "Calendrier prévisionnel d'alternance sur la durée du contrat",
    autoTemplates: ["calendrier_cfa", "planning_alternance"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "B4",
    label: "Deroule Pedagogique",
    longLabel: "Déroulé pédagogique détaillé",
    description: "Déroulé pédagogique séance par séance avec objectifs et méthodes",
    autoTemplates: ["deroule_pedagogique_detaille", "synopsis_formation_cfa"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "B5",
    label: "Supports Cours",
    longLabel: "Supports de cours (format éditable)",
    description: "Supports de formation utilisés (PowerPoint, livret, polycopiés)",
    autoTemplates: ["supports_cours", "support_cours_cfa"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "B6",
    label: "CV Formateurs",
    longLabel: "CV et qualifications des formateurs",
    description: "CV à jour des formateurs intervenants sur la formation contrôlée",
    autoTemplates: ["cv_formateurs", "fiche_poste_formateur"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "B7",
    label: "Liste Materiel Pedagogique",
    longLabel: "Liste des moyens matériels et techniques",
    description: "Inventaire des locaux, équipements et plateforme LMS utilisés",
    autoTemplates: ["liste_materiel", "moyens_techniques"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "B8",
    label: "Procedure Handicap",
    longLabel: "Procédure d'accueil des personnes en situation de handicap",
    description: "Procédure handicap + nom et coordonnées du référent handicap",
    autoTemplates: ["procedure_handicap", "charte_handicap_cfa"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "B9",
    label: "Calendrier Formation",
    longLabel: "Calendrier précisant dates exactes, horaires et lieu",
    description: "Calendrier détaillé (dates exactes, horaires précis et lieu de déroulement) pour l'ensemble des dossiers ayant fait l'objet d'une demande de financement",
    autoTemplates: ["calendrier_formation_opco"],
    perStagiaire: false,
    category: "pedagogique",
  },

  // ════════════════════════════════════════════════
  // C. CONTRÔLE DU SERVICE RENDU AUX APPRENANTS
  // ════════════════════════════════════════════════
  {
    code: "C1",
    label: "Contrat Apprentissage",
    longLabel: "Contrat d'apprentissage signé (Cerfa)",
    description: "Cerfa 10103 signé pour chaque apprenti contrôlé",
    autoTemplates: ["contrat_apprentissage"],
    perStagiaire: true,
    category: "service_apprenant",
    forAllApprentis: true,
  },
  {
    code: "C2",
    label: "Convention Formation",
    longLabel: "Convention de formation tripartite",
    description: "Convention CFA / Employeur / Apprenti signée par les 3 parties",
    autoTemplates: ["convention_formation_cfa", "convention_formation_apprentissage", "convention_formation_tripartite"],
    perStagiaire: true,
    category: "service_apprenant",
    forAllApprentis: true,
  },
  {
    code: "C3",
    label: "Dossier Inscription",
    longLabel: "Dossier d'inscription de l'apprenti",
    description: "Dossier complet d'inscription avec pièces justificatives",
    autoTemplates: ["dossier_inscription_cfa", "dossier_inscription"],
    perStagiaire: true,
    category: "service_apprenant",
    forAllApprentis: true,
  },
  {
    code: "C4",
    label: "Livret Apprentissage",
    longLabel: "Livret d'apprentissage / Livret de suivi",
    description: "Livret de suivi pédagogique tenu sur la période contrôlée",
    autoTemplates: ["livret_apprentissage_cfa_v2", "livret_apprentissage_cfa", "livre_apprentissage_cfa"],
    perStagiaire: true,
    category: "service_apprenant",
    forAllApprentis: true,
  },
  {
    code: "C5",
    label: "Emargements",
    longLabel: "Feuilles d'émargement signées (par apprenti)",
    description: "Feuilles d'émargement individuelles signées sur toute la période — un fichier par apprenti, dates et signatures personnalisées",
    autoTemplates: ["emargement_stagiaire"],
    perStagiaire: true,
    category: "service_apprenant",
    forAllApprentis: true,
  },
  {
    code: "C6",
    label: "Evaluations",
    longLabel: "Évaluations IA (positionnement début/fin, intermédiaire, finale)",
    description: "Pack d'évaluation 100% personnalisé par IA et adapté à la formation : QCM positionnement début (10 Q), QCM positionnement fin (10 Q), exercice intermédiaire (4 questions ouvertes), évaluation finale (5 exercices pratiques). Réponses différentes par stagiaire.",
    autoTemplates: ["ai_test_positionnement_debut", "ai_test_positionnement_fin", "ai_exercice_intermediaire", "ai_evaluation_finale"],
    perStagiaire: true,
    category: "service_apprenant",
    forAllApprentis: true,
  },
  {
    code: "C7",
    label: "Attestation Realisation",
    longLabel: "Attestation / Certificat de réalisation",
    description: "Certificat de réalisation des heures de formation par apprenti",
    autoTemplates: ["certificat_realisation", "certificat_realisation_cfa", "attestation_formation"],
    perStagiaire: true,
    category: "service_apprenant",
    forAllApprentis: true,
  },
  {
    code: "C8",
    label: "Questionnaire Satisfaction",
    longLabel: "Questionnaire de satisfaction (par apprenant)",
    description: "Questionnaire de satisfaction complété par chaque apprenant (note globale ≥ 90% — Très satisfaisant), réponses individualisées",
    autoTemplates: ["ey_questionnaire_satisfaction"],
    perStagiaire: true,
    category: "service_apprenant",
    forAllApprentis: true,
  },
  {
    code: "C9",
    label: "Bilan Satisfaction Chaud",
    longLabel: "Bilan de satisfaction à chaud (par apprenant)",
    description: "Bilan à chaud rempli par chaque apprenant en fin de formation — réponses personnalisées (≥ 90% Très satisfaisant)",
    autoTemplates: ["bilan_chaud_stagiaire"],
    perStagiaire: true,
    category: "service_apprenant",
    forAllApprentis: true,
  },
  {
    code: "C10",
    label: "Bilan Satisfaction Froid",
    longLabel: "Bilan de satisfaction à froid (par apprenant)",
    description: "Bilan à froid rempli par chaque apprenant 3 à 6 mois après la formation — réponses personnalisées (≥ 90% Très satisfaisant)",
    autoTemplates: ["bilan_froid_stagiaire"],
    perStagiaire: true,
    category: "service_apprenant",
    forAllApprentis: true,
  },
  {
    code: "C11",
    label: "Temps de Connexion",
    longLabel: "Relevé des temps de connexion par session",
    description: "Relevé des temps de connexion réels par session (groupement par dates), une session par page. Affiche uniquement les jours école écoulés (formation en cours = jours futurs vierges). Tient compte du rythme d'alternance.",
    autoTemplates: ["temps_connexion_opco"],
    perStagiaire: false,
    category: "service_apprenant",
  },
];

export type OpcoDocStatus = "pending" | "auto" | "uploaded" | "not_applicable";

export interface OpcoDocState {
  code: string;
  status: OpcoDocStatus;
  uploadedFileName?: string;
  uploadedFile?: File;
  note?: string;
}
