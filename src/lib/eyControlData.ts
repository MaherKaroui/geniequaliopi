/**
 * Liste des documents exigés par EY/Sauléa pour un contrôle exhaustif EDOF (RNCP/RS).
 * Chaque entrée a un code EY, un libellé, et un mapping optionnel vers les templates internes.
 */

export interface EYDocumentItem {
  code: string;
  label: string;
  description: string;
  /** Internal template IDs that can auto-generate this document (empty = manual upload needed) */
  autoTemplates: string[];
  /** Whether this document is per-stagiaire */
  perStagiaire: boolean;
  /** Category for grouping */
  category: EYCategory;
}

export type EYCategory =
  | "pedagogique"
  | "administratif"
  | "evaluation"
  | "formateurs"
  | "materiel"
  | "certification"
  | "qualite"
  | "communication";

export const EY_CATEGORIES: Record<EYCategory, string> = {
  pedagogique: "📚 Documents pédagogiques",
  administratif: "📋 Documents administratifs",
  evaluation: "📝 Évaluation & Positionnement",
  formateurs: "👨‍🏫 Formateurs & Intervenants",
  materiel: "🖥️ Moyens matériels & techniques",
  certification: "🎓 Certification & Examens",
  qualite: "✅ Qualité & Suivi",
  communication: "📣 Communication & Information",
};

export const EY_DOCUMENTS: EYDocumentItem[] = [
  // === PEDAGOGIQUE ===
  {
    code: "1",
    label: "Programme de la prestation",
    description: "Programme détaillé de la formation contrôlée",
    autoTemplates: ["programme_formation"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "2",
    label: "Référentiel de la certification",
    description: "Référentiel de compétences de la certification visée",
    autoTemplates: ["fiche_certification_rs"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "3",
    label: "Tableau croisé contenu / référentiel",
    description: "Tableau croisé du contenu de la formation et du référentiel de compétences",
    autoTemplates: ["tableau_croise_cfa", "matrice_competences_excel"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "5",
    label: "Supports de formation (format éditable)",
    description: "Supports de formation au format éditable (Word, PowerPoint) pour vérifier qu'ils ont été réalisés par l'OF",
    autoTemplates: ["support_cours"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "6",
    label: "Autres ressources pédagogiques",
    description: "Vidéos pédagogiques, quizz, tests de positionnement, simulateurs, immersion",
    autoTemplates: [],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "7",
    label: "Parcours standard / déroulé pédagogique",
    description: "Séquences, durée, calendrier de la prestation contrôlée",
    autoTemplates: ["deroule_pedagogique_detaille"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "8",
    label: "Parcours individualisé par stagiaire",
    description: "Déroulé pédagogique individualisé post entretien de positionnement",
    autoTemplates: ["trame_eval_besoins_stagiaire"],
    perStagiaire: true,
    category: "pedagogique",
  },
  {
    code: "10",
    label: "Méthodes d'animation",
    description: "Document présentant les méthodes d'animation utilisées",
    autoTemplates: ["procedure_adaptation"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "14",
    label: "Processus de veille / mise à jour des supports",
    description: "Processus de veille et de mise à jour des supports pédagogiques utilisés",
    autoTemplates: ["veille_pedagogique", "veille_technique", "veille_reglementaire"],
    perStagiaire: false,
    category: "pedagogique",
  },

  // === MATERIEL ===
  {
    code: "11",
    label: "Descriptif des moyens matériels",
    description: "Vidéo projecteur, paperboard, ordinateur, équipements spécifiques, plateformes LMS, etc.",
    autoTemplates: [],
    perStagiaire: false,
    category: "materiel",
  },
  {
    code: "12",
    label: "Supports de communication pédagogique",
    description: "Exemples de supports permettant la prise en main des ressources pédagogiques par le stagiaire",
    autoTemplates: [],
    perStagiaire: false,
    category: "materiel",
  },
  {
    code: "15",
    label: "Cahier de maintenance / matériel pédagogique",
    description: "Photos, factures d'achats des équipements démontrant leur état fonctionnel et performant",
    autoTemplates: [],
    perStagiaire: false,
    category: "materiel",
  },
  {
    code: "16",
    label: "Adaptations pour personnes handicapées",
    description: "Exemples de modifications techniques pour mise à disposition de matériel adapté",
    autoTemplates: ["fiche_eval_besoins_psh"],
    perStagiaire: false,
    category: "materiel",
  },
  {
    code: "17",
    label: "Contrats de propriété des supports achetés",
    description: "Contrats ou preuves indiquant les droits de propriété pour les supports achetés auprès d'un tiers",
    autoTemplates: [],
    perStagiaire: false,
    category: "materiel",
  },

  // === EVALUATION ===
  {
    code: "18",
    label: "Outils de suivi de la progression",
    description: "Livret de compétences, outils de suivi des compétences ou des acquis",
    autoTemplates: ["grille_acquisition_stagiaire"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "26",
    label: "Compte-rendu des entretiens de positionnement",
    description: "Entretiens de positionnement avec les bénéficiaires en amont de la prestation",
    autoTemplates: ["test_positionnement_debut_stagiaire"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "27",
    label: "Vérification du projet professionnel",
    description: "Preuve attestant la vérification par l'OF de la dimension professionnelle du projet du titulaire",
    autoTemplates: ["trame_eval_besoins_stagiaire"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "28",
    label: "Test d'évaluation en amont",
    description: "Test d'évaluation ou bilan des connaissances/compétences en amont de la prestation",
    autoTemplates: ["test_positionnement_debut_stagiaire"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "29",
    label: "Outils d'auto-évaluation pendant la prestation",
    description: "Outils d'auto-évaluation mis à disposition des bénéficiaires pendant la formation",
    autoTemplates: ["exercices_stagiaire"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "30",
    label: "Bilans intermédiaires",
    description: "Bilans intermédiaires des bénéficiaires (pour prestations de plus de 3 mois)",
    autoTemplates: [],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "31",
    label: "Test d'évaluation en fin de prestation",
    description: "Test d'évaluation ou bilan des connaissances/compétences à la fin de la prestation",
    autoTemplates: ["test_positionnement_fin_stagiaire"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "32",
    label: "Évaluations blanches",
    description: "Exemples d'évaluations « à blanc » en vue du passage des certifications professionnelles",
    autoTemplates: ["exercices_stagiaire"],
    perStagiaire: true,
    category: "evaluation",
  },

  // === FORMATEURS ===
  {
    code: "20",
    label: "CV des formateurs / intervenants",
    description: "CV des formateurs et intervenants sur le périmètre de l'action contrôlée",
    autoTemplates: [],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "21",
    label: "Certifications et diplômes des formateurs",
    description: "Certifications et diplômes des formateurs/intervenants",
    autoTemplates: [],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "22",
    label: "Fichier des formateurs (statut contractuel)",
    description: "Nom, statut (CDI/CDD/sous-traitant), statut juridique, NDA et numéros Qualiopi",
    autoTemplates: [],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "23",
    label: "Contrats des sous-traitants pédagogiques",
    description: "Contrats de prestations de service pour les sous-traitants pédagogiques",
    autoTemplates: [],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "24",
    label: "Processus qualité sous-traitants",
    description: "Processus générique de suivi de la qualité des prestations des sous-traitants pédagogiques",
    autoTemplates: ["procedure_sous_traitance"],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "25",
    label: "Éléments de sélection des sous-traitants",
    description: "Process de sélection, justificatifs, approche qualité, charte",
    autoTemplates: [],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "CV_RP",
    label: "CV du responsable pédagogique",
    description: "CV du responsable pédagogique intervenant sur l'action contrôlée",
    autoTemplates: [],
    perStagiaire: false,
    category: "formateurs",
  },

  // === ADMINISTRATIF ===
  {
    code: "BAIL",
    label: "Bail / contrat de location des locaux",
    description: "Bail ou contrat de location précisant la conformité des locaux pour l'accueil du public",
    autoTemplates: [],
    perStagiaire: false,
    category: "administratif",
  },
  {
    code: "BPF",
    label: "Bilan pédagogique et financier",
    description: "Bilan pédagogique et financier de l'OF",
    autoTemplates: [],
    perStagiaire: false,
    category: "administratif",
  },
  {
    code: "ORGANIGRAMME",
    label: "Organigramme de l'OF",
    description: "Organigramme de l'organisme de formation",
    autoTemplates: ["organigramme"],
    perStagiaire: false,
    category: "administratif",
  },
  {
    code: "CGV",
    label: "Supports contractuels et précontractuels",
    description: "Supports contractuels et précontractuels pour la prestation vendue au stagiaire",
    autoTemplates: ["cgv_stagiaire"],
    perStagiaire: true,
    category: "administratif",
  },
  {
    code: "CONVOCATION",
    label: "Convocation / informations pratiques",
    description: "Justificatifs d'information du stagiaire sur les modalités d'accès au référent administratif/pédagogique",
    autoTemplates: ["convocation_stagiaire"],
    perStagiaire: true,
    category: "administratif",
  },
  {
    code: "EMARGEMENT",
    label: "Feuilles d'émargement",
    description: "Feuilles d'émargement pour les dossiers contrôlés",
    autoTemplates: ["emargement_stagiaire", "emargement_jour"],
    perStagiaire: true,
    category: "administratif",
  },
  {
    code: "PLANNING_I",
    label: "Planning des intervenants",
    description: "Planning des intervenants pour la prestation contrôlée",
    autoTemplates: [],
    perStagiaire: false,
    category: "administratif",
  },
  {
    code: "PLANNING_S",
    label: "Planning des sessions",
    description: "Planning des sessions de formation",
    autoTemplates: [],
    perStagiaire: false,
    category: "administratif",
  },

  // === CERTIFICATION ===
  {
    code: "33",
    label: "Taux de réussite aux certifications",
    description: "Document indiquant le taux de réussite pour les certifications/concours",
    autoTemplates: ["indicateurs_performance"],
    perStagiaire: false,
    category: "certification",
  },
  {
    code: "34",
    label: "Certifications délivrées",
    description: "Certifications délivrées dans le cadre des dossiers objets du contrôle",
    autoTemplates: ["attestation_reussite_stagiaire"],
    perStagiaire: true,
    category: "certification",
  },
  {
    code: "QUALIOPI",
    label: "Certificat Qualiopi de l'OF",
    description: "Article 3.1.1 des CGU de la plateforme MCF",
    autoTemplates: [],
    perStagiaire: false,
    category: "certification",
  },
  {
    code: "AUTORISATIONS",
    label: "Autorisations du porteur de certification",
    description: "Autorisations accordées par le porteur de la certification (RNCP/RS)",
    autoTemplates: [],
    perStagiaire: false,
    category: "certification",
  },
  {
    code: "AGREMENTS",
    label: "Agréments ministériels",
    description: "Agréments délivrés par les Ministères concernés (ex: écoles de conduite)",
    autoTemplates: [],
    perStagiaire: false,
    category: "certification",
  },
  {
    code: "PV_EXAMEN",
    label: "Procès-verbaux d'examen",
    description: "PV des sessions d'examen visant les dossiers contrôlés",
    autoTemplates: ["pv_examen_certification"],
    perStagiaire: true,
    category: "certification",
  },
  {
    code: "PROC_EXAMEN",
    label: "Procédures d'examen en fin de prestation",
    description: "Descriptif des procédures d'examen en fin de prestation",
    autoTemplates: ["procedure_presentation_certification"],
    perStagiaire: false,
    category: "certification",
  },
  {
    code: "PREREQUIS",
    label: "Vérification des prérequis",
    description: "Tout document probant la vérification des prérequis pour les actions concernées",
    autoTemplates: ["procedure_eval_besoins"],
    perStagiaire: false,
    category: "certification",
  },

  // === QUALITE ===
  {
    code: "FACTURES",
    label: "Factures des dossiers contrôlés",
    description: "Factures indiquant le montant facturé dans le cadre des dossiers objets du contrôle",
    autoTemplates: [],
    perStagiaire: true,
    category: "qualite",
  },
  {
    code: "GRILLE_TARIF",
    label: "Grille tarifaire de l'OF",
    description: "Grille tarifaire présentant l'intégralité des prestations de l'OF (tout financeur confondu)",
    autoTemplates: [],
    perStagiaire: false,
    category: "qualite",
  },
  {
    code: "FACTURES_HORS_MCF",
    label: "Factures hors dispositif MCF",
    description: "Exemples de factures pour les prestations vendues hors dispositif MCF (politique tarifaire)",
    autoTemplates: [],
    perStagiaire: false,
    category: "qualite",
  },
  {
    code: "DEVIS",
    label: "Devis de la prestation",
    description: "Devis de la prestation pour les dossiers objet du contrôle",
    autoTemplates: [],
    perStagiaire: true,
    category: "qualite",
  },
  {
    code: "INDICATEURS",
    label: "Indicateurs de performance",
    description: "Supports et outils d'information portant sur les indicateurs de performance de l'OF",
    autoTemplates: ["indicateurs_performance", "procedure_indicateurs_performance"],
    perStagiaire: false,
    category: "qualite",
  },
  {
    code: "CERTIF_INFO",
    label: "Informations certifications (taux, blocs, passerelles)",
    description: "Taux d'obtention, blocs de compétences, équivalences, passerelles, suites de parcours et débouchés",
    autoTemplates: ["fiche_certification_rs"],
    perStagiaire: false,
    category: "qualite",
  },

  // === COMMUNICATION ===
  {
    code: "COMM_REPORT",
    label: "Communications reports de sessions",
    description: "Exemples de communications lors des reports de sessions et reprogrammations",
    autoTemplates: [],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "PLAQUETTE",
    label: "Plaquette / supports de communication",
    description: "Exemples de supports de communication, plaquette de présentation transmis au stagiaire",
    autoTemplates: [],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "SITE_WEB",
    label: "Lien vers la page web de la prestation",
    description: "Lien vers la page web de la prestation sur le site web de l'OF",
    autoTemplates: ["lien_site_internet"],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "ENGAGEMENT",
    label: "Actions d'engagement & prévention des ruptures",
    description: "Éléments justificatifs permettant d'apprécier les actions de prévention des ruptures de parcours",
    autoTemplates: [],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "FOAD",
    label: "Accompagnement technique FOAD",
    description: "Actions d'accompagnement technique et pédagogique en cas de FOAD",
    autoTemplates: ["temps_connexion_reel"],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "PROCESSUS_DEMANDE",
    label: "Processus d'analyse des demandes stagiaire",
    description: "Processus formalisé d'analyse d'une demande/sollicitation (pédagogique, adaptation, accompagnement)",
    autoTemplates: ["procedure_adaptation", "procedure_accueil_stagiaires"],
    perStagiaire: false,
    category: "communication",
  },
];

export type EYDocStatus = "pending" | "auto" | "uploaded" | "not_applicable";

export interface EYDocState {
  code: string;
  status: EYDocStatus;
  uploadedFileName?: string;
  uploadedFile?: File;
  note?: string;
}
