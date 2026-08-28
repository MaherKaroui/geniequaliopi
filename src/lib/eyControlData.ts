/**
 * Liste des documents exigés par EY/Sauléa pour un contrôle exhaustif EDOF (RNCP/RS).
 * Codes alignés sur le PDF officiel « Annexe pour un contrôle exhaustif » (codes 1–68).
 */

export interface EYDocumentItem {
  code: string;
  label: string;
  description: string;
  /** Internal template IDs that can auto-generate this document (empty = manual upload needed) */
  autoTemplates: string[];
  /** Whether this document is per-stagiaire */
  perStagiaire: boolean;
  /** Whether this document generates one file per training day (per stagiaire). Requires perStagiaire. */
  perDay?: boolean;
  /** Category for grouping */
  category: EYCategory;
  /** Optional path to a static file in public/ that is pre-provided */
  staticFile?: string;
}

export type EYCategory =
  | "pedagogique"
  | "administratif"
  | "evaluation"
  | "formateurs"
  | "materiel"
  | "certification"
  | "qualite"
  | "communication"
  | "controle_bac_pro";

export const EY_CATEGORIES: Record<EYCategory, string> = {
  pedagogique: "📚 Documents pédagogiques",
  administratif: "📋 Documents administratifs",
  evaluation: "📝 Évaluation & Positionnement",
  formateurs: "👨‍🏫 Formateurs & Intervenants",
  materiel: "🖥️ Moyens matériels & techniques",
  certification: "🎓 Certification & Examens",
  qualite: "✅ Qualité & Suivi",
  communication: "📣 Communication & Information",
  controle_bac_pro: "📦 Contrôle – Bac Pro Logistique (La Maison d'Apprentissage)",
};

export const EY_DOCUMENTS: EYDocumentItem[] = [
  // ═══════════════════════════════════════════════
  // PEDAGOGIQUE (codes 1–10, 14)
  // ═══════════════════════════════════════════════
  {
    code: "1",
    label: "Programme de la prestation",
    description: "Programme détaillé de la formation contrôlée",
    autoTemplates: ["programme_formation"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "1B",
    label: "Programme de la formation – Version CFA (apprentissage)",
    description: "Programme détaillé version CFA / apprentissage (14 missions, rythme alternance, tuteur entreprise, référentiel RNCP)",
    autoTemplates: ["programme_cfa"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "70",
    label: "Conditions Générales de Vente",
    description: "Conditions Générales de Vente de l'organisme, individualisées par stagiaire (signature stagiaire + tampon organisme, date = début formation – 14 jours ouvrés)",
    autoTemplates: ["cgv_stagiaire"],
    perStagiaire: true,
    category: "administratif",
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
    code: "4",
    label: "Objectifs et méthodes par séquence",
    description: "Autres documents de présentation du contenu de la prestation permettant d'analyser les objectifs et les méthodes pédagogiques par séquence",
    autoTemplates: ["ey_objectifs_methodes_sequence"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "6",
    label: "Supports de formation (format éditable)",
    description: "Supports de formation au format éditable (Word, PowerPoint) pour vérifier qu'ils ont été réalisés par l'OF et non par un tiers",
    autoTemplates: ["supports_cours"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "7",
    label: "Autres ressources pédagogiques",
    description: "Vidéos pédagogiques, quizz, tests de positionnement, simulateurs, immersion",
    autoTemplates: ["ey_ressources_pedagogiques"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "8",
    label: "Parcours standard / déroulé pédagogique",
    description: "Parcours standard / déroulé pédagogique de la prestation (séquences, durée, calendrier)",
    autoTemplates: ["deroule_pedagogique_detaille"],
    perStagiaire: false,
    category: "pedagogique",
  },
  {
    code: "9",
    label: "Parcours individualisé par stagiaire",
    description: "Parcours nominatif / déroulé pédagogique individualisé post entretien de positionnement",
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
    autoTemplates: ["procedure_veille"],
    perStagiaire: false,
    category: "pedagogique",
  },

  // ═══════════════════════════════════════════════
  // EVALUATION & POSITIONNEMENT (codes 11, 19, 28–35)
  // ═══════════════════════════════════════════════
  {
    code: "11",
    label: "Dossiers des stagiaires contrôlés",
    description: "Dossiers des stagiaires dont les noms sont indiqués (notamment les résultats du positionnement amont)",
    autoTemplates: ["ey_dossier_stagiaire"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "19",
    label: "Outils de suivi de la progression",
    description: "Livret de compétences, outils de suivi des compétences ou des acquis pour les dossiers contrôlés",
    autoTemplates: ["ey_outils_suivi_progression"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "TEMPS_CONNEXION",
    label: "Relevé des temps de connexion (LMS / distanciel)",
    description: "Relevé individuel des temps de connexion à la plateforme LMS (jour par jour, IP, horaires, durée) — preuve d'assiduité en distanciel/mixte. Un fichier par stagiaire.",
    autoTemplates: ["temps_connexion_reel"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "28",
    label: "Compte-rendu des entretiens de positionnement",
    description: "Entretiens de positionnement avec les bénéficiaires en amont de la prestation (IA: cohérent avec la formation)",
    autoTemplates: ["ai_test_positionnement_debut"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "29",
    label: "Vérification du projet professionnel",
    description: "Preuve attestant la vérification par l'OF de la dimension professionnelle du projet du titulaire",
    autoTemplates: ["trame_eval_besoins_stagiaire"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "30",
    label: "Attestation de fin de formation",
    description: "Attestation de fin de formation remise à chaque stagiaire à l'issue de la prestation",
    autoTemplates: ["attestation_fin_formation_stagiaire"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "31",
    label: "Test d'évaluation en amont (IA)",
    description: "Test de positionnement personnalisé par IA en amont de la prestation, cohérent avec l'intitulé de formation",
    autoTemplates: ["ai_test_positionnement_debut"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "32",
    label: "Outils d'auto-évaluation pendant la prestation (IA)",
    description: "Exercice intermédiaire (4 questions ouvertes) personnalisé par IA — réponses différentes par stagiaire",
    autoTemplates: ["ai_exercice_intermediaire"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "32B",
    label: "Exercices quotidiens — 1 par jour de formation",
    description: "Un exercice par journée de formation pour chaque stagiaire (avec énoncé, production stagiaire et corrigé), généré par IA et varié d'un stagiaire à l'autre",
    autoTemplates: ["ai_exercices_par_jour"],
    perStagiaire: true,
    perDay: true,
    category: "evaluation",
  },
  {
    code: "33",
    label: "Bilans intermédiaires",
    description: "Bilans intermédiaires des bénéficiaires réalisés par l'OF (pour prestations de plus de 3 mois)",
    autoTemplates: ["ey_bilan_intermediaire"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "34",
    label: "Test d'évaluation en fin de prestation (IA)",
    description: "Évaluation finale (5 exercices pratiques) personnalisée par IA, cohérente avec la formation",
    autoTemplates: ["ai_evaluation_finale", "ai_test_positionnement_fin"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "34B",
    label: "Grille d'acquisition des compétences (exemple)",
    description: "Exemple type Genius Form / Academy : grille d'acquisition du référentiel + QCM rempli + analyse formateur (un fichier par stagiaire)",
    autoTemplates: ["ey_test_evaluation_fin"],
    perStagiaire: true,
    category: "evaluation",
  },
  {
    code: "35",
    label: "Évaluations blanches",
    description: "Exemples d'évaluations « à blanc » en vue du passage des certifications professionnelles/concours",
    autoTemplates: ["ey_evaluation_blanche"],
    perStagiaire: true,
    category: "evaluation",
  },

  // ═══════════════════════════════════════════════
  // MATERIEL (codes 12–13, 15–18)
  // ═══════════════════════════════════════════════
  {
    code: "12",
    label: "Descriptif des moyens matériels",
    description: "Vidéo projecteur, paperboard, ordinateur, équipements spécifiques, plateformes LMS, aides à la connexion à distance, etc.",
    autoTemplates: ["ey_descriptif_moyens_materiels"],
    perStagiaire: false,
    category: "materiel",
  },
  {
    code: "13",
    label: "Supports de communication pédagogique",
    description: "Exemples de supports permettant la prise en main des ressources pédagogiques par le stagiaire",
    autoTemplates: ["guide_elearning"],
    perStagiaire: false,
    category: "materiel",
  },
  {
    code: "15",
    label: "Photos / factures matériel pédagogique",
    description: "Photos, vidéos ou factures démontrant que les équipements mobilisés sont fonctionnels et performants",
    autoTemplates: ["ey_factures_equipements"],
    perStagiaire: false,
    category: "materiel",
  },
  {
    code: "16",
    label: "Cahier de maintenance du matériel",
    description: "Cahier de maintenance ou autres documents probants portant sur le matériel pédagogique",
    autoTemplates: ["ey_equipements_pedagogiques"],
    perStagiaire: false,
    category: "materiel",
  },
  {
    code: "17",
    label: "Adaptations pour personnes handicapées",
    description: "Exemples de modifications d'ordre technique pour mise à disposition de matériel adapté aux PSH",
    autoTemplates: ["ey_adaptations_handicap"],
    perStagiaire: false,
    category: "materiel",
  },
  {
    code: "18",
    label: "Contrats de propriété des supports achetés",
    description: "Contrats ou preuves indiquant les droits de propriété pour les supports achetés auprès d'un tiers",
    autoTemplates: ["ey_contrats_propriete_supports"],
    perStagiaire: false,
    category: "materiel",
  },

  // ═══════════════════════════════════════════════
  // FORMATEURS (codes 5, 20–26, 64)
  // ═══════════════════════════════════════════════
  {
    code: "5",
    label: "Fiches de poste des formateurs",
    description: "Fiches de poste des formateurs / intervenants mobilisés sur l'action de formation",
    autoTemplates: ["fiche_poste_formateur"],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "20",
    label: "CV des formateurs / intervenants",
    description: "CV des formateurs et intervenants sur le périmètre de l'action contrôlée",
    autoTemplates: ["cv_formateur"],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "21",
    label: "Certifications et diplômes des formateurs",
    description: "Certifications et diplômes des formateurs/intervenants",
    autoTemplates: ["ey_attestation_diplomes_formateurs"],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "22",
    label: "Fichier des formateurs (statut contractuel)",
    description: "Nom, statut (CDI/CDD/sous-traitant), statut juridique, NDA et numéros Qualiopi",
    autoTemplates: ["ey_fichier_formateurs_statut"],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "23",
    label: "Attestations de formation continue des formateurs",
    description: "Éléments probants de la formation continue des formateurs (attestations, certificats, justificatifs)",
    autoTemplates: ["ey_formation_continue_formateurs"],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "24",
    label: "Contrats des sous-traitants pédagogiques",
    description: "Contrats de prestations de service pour les sous-traitants pédagogiques",
    autoTemplates: ["contrat_sous_traitance_v2"],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "25",
    label: "Processus qualité sous-traitants",
    description: "Processus générique de suivi de la qualité des prestations des sous-traitants pédagogiques",
    autoTemplates: ["charte_qualite_formateur_externe"],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "26",
    label: "Éléments de sélection des sous-traitants",
    description: "Process de sélection, justificatifs, approche qualité, charte des sous-traitants pédagogiques",
    autoTemplates: ["charte_qualite_formateur_externe"],
    perStagiaire: false,
    category: "formateurs",
  },
  {
    code: "64",
    label: "CV du responsable pédagogique",
    description: "CV du responsable pédagogique intervenant sur l'action contrôlée",
    autoTemplates: ["ey_cv_responsable_pedagogique"],
    perStagiaire: false,
    category: "formateurs",
  },

  // ═══════════════════════════════════════════════
  // ADMINISTRATIF (codes 27, 47, 53–54, 57, 60–63)
  // ═══════════════════════════════════════════════
  {
    code: "27",
    label: "Bail / contrat de location des locaux",
    description: "Bail ou contrat de location précisant la conformité des locaux pour l'accueil du public",
    autoTemplates: ["ey_bail_locaux"],
    perStagiaire: false,
    category: "administratif",
  },
  {
    code: "47",
    label: "Vérification des prérequis",
    description: "Tout document probant la vérification des prérequis pour les actions de prestation concernées",
    autoTemplates: ["procedure_eval_besoins"],
    perStagiaire: false,
    category: "administratif",
  },
  {
    code: "53",
    label: "Organigramme de l'OF",
    description: "Organigramme de l'organisme de formation",
    autoTemplates: ["organigramme"],
    perStagiaire: false,
    category: "administratif",
  },
  {
    code: "54",
    label: "Convocation / informations pratiques",
    description: "Justificatifs d'information du stagiaire sur les modalités d'accès au référent administratif/pédagogique",
    autoTemplates: ["convocation_stagiaire"],
    perStagiaire: true,
    category: "administratif",
  },
  {
    code: "57",
    label: "Contrat de formation",
    description: "Contrat de formation pour la prestation vendue au stagiaire",
    autoTemplates: ["contrat_formation_pro_stagiaire"],
    perStagiaire: true,
    category: "administratif",
  },
  {
    code: "60",
    label: "Planning des intervenants",
    description: "Planning des intervenants pour la prestation contrôlée",
    autoTemplates: ["ey_planning_intervenants"],
    perStagiaire: false,
    category: "administratif",
  },
  {
    code: "61",
    label: "Planning des sessions",
    description: "Planning des sessions de formation",
    autoTemplates: ["ey_planning_sessions"],
    perStagiaire: false,
    category: "administratif",
  },
  {
    code: "62",
    label: "Feuilles d'émargement",
    description: "Feuilles d'émargement pour les dossiers contrôlés",
    autoTemplates: ["emargement_stagiaire"],
    perStagiaire: true,
    category: "administratif",
  },
  {
    code: "63",
    label: "Bilan pédagogique et financier",
    description: "Bilan pédagogique et financier de l'OF",
    autoTemplates: ["ey_bpf"],
    perStagiaire: false,
    category: "administratif",
  },
  {
    code: "SATISFACTION",
    label: "Questionnaire de satisfaction stagiaire",
    description: "Questionnaire de satisfaction rempli par chaque stagiaire en fin de formation",
    autoTemplates: ["ey_questionnaire_satisfaction"],
    perStagiaire: true,
    category: "qualite",
  },
  {
    code: "CONTRAT_BLOC",
    label: "Contrat de formation par bloc (N° action)",
    description: "Contrat tripartite listant les blocs de compétences avec le numéro d'action EDOF correspondant",
    autoTemplates: ["contrat_formation_par_bloc"],
    perStagiaire: true,
    category: "administratif",
  },
  {
    code: "DOSSIER_INSCRIPTION",
    label: "Dossier d'inscription stagiaire",
    description: "Dossier d'inscription comprenant les informations personnelles, entreprise et pièces justificatives",
    autoTemplates: ["dossier_inscription_cfa"],
    perStagiaire: true,
    category: "administratif",
  },
  {
    code: "FACTURE",
    label: "Facture de formation (3 versements)",
    description: "Facture individuelle par stagiaire avec échéancier de paiement en 3 fois (30% / 35% / 35%)",
    autoTemplates: ["facture_edof"],
    perStagiaire: true,
    category: "administratif",
  },
  {
    code: "FACTURE_100",
    label: "Facture de formation (100%)",
    description: "Facture individuelle par stagiaire – paiement intégral 100% en une seule fois",
    autoTemplates: ["facture_edof_100"],
    perStagiaire: true,
    category: "administratif",
  },

  // ═══════════════════════════════════════════════
  // CERTIFICATION & EXAMENS (codes 36–37, 42–46)
  // ═══════════════════════════════════════════════
  {
    code: "36",
    label: "Taux de réussite aux certifications",
    description: "Document indiquant le taux de réussite pour les certifications/concours",
    autoTemplates: ["ey_taux_reussite"],
    perStagiaire: false,
    category: "certification",
  },
  {
    code: "37",
    label: "Certifications délivrées",
    description: "Certifications délivrées dans le cadre des dossiers objets du contrôle",
    autoTemplates: ["attestation_reussite_stagiaire"],
    perStagiaire: true,
    category: "certification",
  },
  {
    code: "42",
    label: "Certificat Qualiopi de l'OF",
    description: "Article 3.1.1 des CGU de la plateforme MCF",
    autoTemplates: ["ey_certificat_qualiopi"],
    perStagiaire: false,
    category: "certification",
  },
  {
    code: "43",
    label: "Autorisations du porteur de certification",
    description: "Autorisations accordées par le porteur de la certification (RNCP/RS)",
    autoTemplates: ["ey_autorisations_certificateur"],
    perStagiaire: false,
    category: "certification",
  },
  {
    code: "44",
    label: "Agréments ministériels",
    description: "Agréments délivrés par les Ministères concernés",
    autoTemplates: ["ey_agrements_ministeriels"],
    perStagiaire: false,
    category: "certification",
  },
  {
    code: "45",
    label: "Procès-verbaux d'examen",
    description: "PV des sessions d'examen visant les dossiers contrôlés",
    autoTemplates: ["pv_examen_certification"],
    perStagiaire: true,
    category: "certification",
  },
  {
    code: "45A",
    label: "Dossier Professionnel (DP) – Officiel Ministère du Travail",
    description: "Dossier Professionnel rédigé par le candidat à partir des activités-types et compétences du référentiel RNCP, format officiel Ministère du Travail (1 par stagiaire)",
    autoTemplates: ["dp_officiel"],
    perStagiaire: true,
    category: "certification",
  },
  {
    code: "45B",
    label: "Livret d'évaluations (ECF) – Officiel Ministère du Travail",
    description: "Évaluations en Cours de Formation (ECF) – livret de suivi des évaluations par CCP/bloc de compétences, format officiel Ministère du Travail (1 par stagiaire)",
    autoTemplates: ["ecf_officiel"],
    perStagiaire: true,
    category: "certification",
  },
  {
    code: "45D",
    label: "Grilles d'évaluation de l'épreuve (GJ1) – Dossier technique d'évaluation",
    description: "Grille 1 jury du DTE : guides d'observation de la mise en situation professionnelle, guide de lecture de la production et grilles d'évaluation des activités-types (1 par stagiaire)",
    autoTemplates: ["gj1_grilles_jury"],
    perStagiaire: true,
    category: "certification",
  },
  {
    code: "45E",
    label: "Grille d'évaluation de l'entretien final (GJ2) – Dossier technique d'évaluation",
    description: "Grille 2 jury du DTE : guide de l'entretien final et grille d'évaluation des champs d'observation (1 par stagiaire)",
    autoTemplates: ["gj2_entretien_final"],
    perStagiaire: true,
    category: "certification",
  },
  {
    code: "45C",
    label: "Procès-verbal global de session – Officiel Ministère du Travail",
    description: "PV global de session d'examen Titre Professionnel : récapitulatif des candidats, des CCP obtenus et de la décision du jury (1 document pour la session)",
    autoTemplates: ["pv_session_global"],
    perStagiaire: false,
    category: "certification",
  },
  {
    code: "46",
    label: "Procédures d'examen en fin de prestation",
    description: "Descriptif des procédures d'examen en fin de prestation",
    autoTemplates: ["procedure_presentation_certification"],
    perStagiaire: false,
    category: "certification",
  },

  // ═══════════════════════════════════════════════
  // QUALITE & TARIFS (codes 38–41, 58–59)
  // ═══════════════════════════════════════════════
  {
    code: "38",
    label: "Factures des dossiers contrôlés",
    description: "Factures indiquant le montant facturé dans le cadre des dossiers objets du contrôle",
    autoTemplates: ["facture_edof"],
    perStagiaire: true,
    category: "qualite",
  },
  {
    code: "39",
    label: "Grille tarifaire de l'OF",
    description: "Grille tarifaire présentant l'intégralité des prestations de l'OF (tout financeur confondu et prix grand public)",
    autoTemplates: ["ey_grille_tarifaire"],
    perStagiaire: false,
    category: "qualite",
  },
  {
    code: "40",
    label: "Factures hors dispositif MCF",
    description: "Exemples de factures pour les prestations vendues hors dispositif MCF (politique tarifaire)",
    autoTemplates: ["ey_facture_hors_mcf"],
    perStagiaire: false,
    category: "qualite",
  },
  {
    code: "41",
    label: "Devis de la prestation",
    description: "Devis de la prestation pour les dossiers objet du contrôle",
    autoTemplates: ["ey_devis"],
    perStagiaire: true,
    category: "qualite",
  },
  {
    code: "58",
    label: "Indicateurs de performance",
    description: "Supports et outils d'information portant sur les indicateurs de performance de l'OF",
    autoTemplates: ["ey_indicateurs_performance"],
    perStagiaire: false,
    category: "qualite",
  },
  {
    code: "59",
    label: "Informations certifications (taux, blocs, passerelles)",
    description: "Taux d'obtention, blocs de compétences, équivalences, passerelles, suites de parcours et débouchés",
    autoTemplates: ["ey_infos_certifications"],
    perStagiaire: false,
    category: "qualite",
  },

  // ═══════════════════════════════════════════════
  // COMMUNICATION (codes 48–50, 55–56, 65–68)
  // ═══════════════════════════════════════════════
  {
    code: "48",
    label: "Communications reports de sessions",
    description: "Exemples de communications à destination des stagiaires lors des éventuels reports de la session",
    autoTemplates: ["ey_communication_report"],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "49",
    label: "Communications reprogrammation",
    description: "Mails / communications portant sur la reprogrammation des sessions",
    autoTemplates: ["ey_communication_report"],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "50",
    label: "Preuve de création d'une nouvelle session",
    description: "Preuve de la création d'une nouvelle session de formation",
    autoTemplates: ["ey_preuve_creation_session"],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "51",
    label: "Preuve de reprogrammation de session",
    description: "Preuve de la reprogrammation d'une session de formation",
    autoTemplates: ["ey_preuve_reprogrammation"],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "52",
    label: "Règlement intérieur de l'OF",
    description: "Règlement intérieur applicable aux stagiaires, signé au début de la prestation",
    autoTemplates: ["reglement_interieur_stagiaire"],
    perStagiaire: true,
    category: "communication",
  },
  {
    code: "55",
    label: "Plaquette / supports de communication",
    description: "Exemples de supports de communication, plaquette de présentation transmis au stagiaire",
    autoTemplates: ["ey_plaquette_presentation"],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "56",
    label: "Lien vers la page web de la prestation",
    description: "Lien vers la page web de la prestation sur le site web de l'OF",
    autoTemplates: ["lien_site_internet"],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "65",
    label: "Actions d'engagement & prévention des ruptures",
    description: "Éléments justificatifs permettant d'apprécier les actions pour favoriser l'engagement et prévenir les ruptures de parcours",
    autoTemplates: ["ey_actions_engagement"],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "66",
    label: "Actions pour faciliter le passage des examens",
    description: "Éléments justificatifs permettant d'apprécier les actions pour faciliter le passage des examens de certification",
    autoTemplates: ["ey_actions_passage_examen"],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "67",
    label: "Accompagnement technique FOAD",
    description: "Actions d'accompagnement technique et pédagogique en cas de FOAD",
    autoTemplates: ["ey_accompagnement_foad"],
    perStagiaire: false,
    category: "communication",
  },
  {
    code: "68",
    label: "Processus d'analyse des demandes stagiaire",
    description: "Processus formalisé d'analyse d'une demande/sollicitation (pédagogique, adaptation, accompagnement)",
    autoTemplates: ["ey_processus_analyse_demandes"],
    perStagiaire: false,
    category: "communication",
  },

  // ═══════════════════════════════════════════════
  // CONTRÔLE – BAC PRO LOGISTIQUE
  // ═══════════════════════════════════════════════
  {
    code: "BPL_01",
    label: "Déroulé Pédagogique",
    description: "Déroulé pédagogique détaillé – Bac Pro Logistique RNCP 38302 (589h)",
    autoTemplates: [],
    perStagiaire: false,
    category: "controle_bac_pro",
    staticFile: "/pdfs/bac_pro_logistique/Deroule_Pedagogique.docx",
  },
  {
    code: "BPL_02",
    label: "Planning de Formation",
    description: "Planning complet du 08/09/2025 au 15/05/2026",
    autoTemplates: [],
    perStagiaire: false,
    category: "controle_bac_pro",
    staticFile: "/pdfs/bac_pro_logistique/Planning_Formation_Bac_Pro_Logistique.docx",
  },
  {
    code: "BPL_03",
    label: "Contrat de Formation Professionnelle",
    description: "Contrat de formation professionnelle individualisé par stagiaire",
    autoTemplates: ["bpl_contrat"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_04",
    label: "Convocation à la Formation",
    description: "Convocation officielle individualisée par stagiaire",
    autoTemplates: ["bpl_convocation"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_05",
    label: "Convocation à l'Examen",
    description: "Convocation à l'examen individualisée par stagiaire",
    autoTemplates: ["bpl_convocation_examen"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_06",
    label: "Test de Positionnement",
    description: "Test de positionnement initial rempli par stagiaire",
    autoTemplates: ["bpl_test_positionnement"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_07",
    label: "Grille d'acquisition",
    description: "Grille d'acquisition des compétences par stagiaire",
    autoTemplates: ["bpl_grille_acquisition"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_08",
    label: "Questionnaire de Satisfaction",
    description: "Questionnaire de satisfaction rempli par stagiaire",
    autoTemplates: ["bpl_satisfaction"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_09",
    label: "Bilan de Formation",
    description: "Bilan de formation individualisé par stagiaire",
    autoTemplates: ["bpl_bilan"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E01",
    label: "Éval 1 – QCM Introduction à la logistique",
    description: "QCM rempli – Module 1 : Introduction à la chaîne logistique",
    autoTemplates: ["bpl_eval01"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E02",
    label: "Éval 2 – QCM Réception des marchandises",
    description: "QCM rempli – Réception des marchandises",
    autoTemplates: ["bpl_eval02"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E03",
    label: "Éval 3 – Cas pratique Réception",
    description: "Cas pratique rempli – Réception des marchandises",
    autoTemplates: ["bpl_eval03"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E04",
    label: "Éval 4 – Cas pratique Stockage",
    description: "Cas pratique rempli – Stockage des marchandises",
    autoTemplates: ["bpl_eval04"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E05",
    label: "Éval 5 – QCM Préparation de commandes",
    description: "QCM rempli – Préparation de commandes",
    autoTemplates: ["bpl_eval05"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E06",
    label: "Éval 6 – Exercice Préparation de commandes",
    description: "Exercice rempli – Préparation de commandes",
    autoTemplates: ["bpl_eval06"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E07",
    label: "Éval 7 – Étude de cas Expédition",
    description: "Étude de cas remplie – Expédition",
    autoTemplates: ["bpl_eval07"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E08",
    label: "Éval 8 – QCM Organisation des flux",
    description: "QCM rempli – Organisation des flux",
    autoTemplates: ["bpl_eval08"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E09",
    label: "Éval 9 – Cas pratique Organisation des flux",
    description: "Cas pratique rempli – Organisation des flux",
    autoTemplates: ["bpl_eval09"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E10",
    label: "Éval 10 – Exercice Gestion des stocks",
    description: "Exercice rempli – Gestion des stocks",
    autoTemplates: ["bpl_eval10"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E11",
    label: "Éval 11 – QCM Gestion des stocks",
    description: "QCM rempli – Gestion des stocks",
    autoTemplates: ["bpl_eval11"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E12",
    label: "Éval 12 – QCM Sécurité Conduite d'engins",
    description: "QCM rempli – Sécurité conduite d'engins",
    autoTemplates: ["bpl_eval12"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E13",
    label: "Éval 13 – Mise en situation Communication",
    description: "Mise en situation remplie – Communication professionnelle",
    autoTemplates: ["bpl_eval13"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E14",
    label: "Éval 14 – Révisions globales / Examen blanc",
    description: "Révisions globales remplies – Examen blanc",
    autoTemplates: ["bpl_eval14"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_E15",
    label: "Éval 15 – Examen blanc final / Certification",
    description: "Examen blanc final rempli – Préparation certification",
    autoTemplates: ["bpl_eval15"],
    perStagiaire: true,
    category: "controle_bac_pro",
  },
  {
    code: "BPL_CONNEXION",
    label: "Rapport de temps de connexion",
    description: "Relevé détaillé des connexions par jour avec IP, horaires et durées",
    autoTemplates: ["bpl_connexion"],
    perStagiaire: true,
    category: "controle_bac_pro",
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
