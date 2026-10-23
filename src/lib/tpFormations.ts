import type { FormationInfo } from "@/types/qualiopi";

/**
 * Titres professionnels du ministère du Travail proposés au catalogue (fiches France Compétences
 * vérifiées le 23/10/2026). Leur contenu (besoins, QCM, mises en situation, support) vient des
 * presets intégrés de formationPresets/builtinTP. Dates, lieu, formateur, tarif et effectif restent à saisir.
 */
type Def = { intitule: string; code: string; niveau: 4 | 5; heures: number; echeance: string; blocs: [string, string[]][]; metier: string; public: string };

const DEFS: Def[] = [
  {
    intitule: "TP Exploitant en transport routier de marchandises", code: "RNCP40992", niveau: 4, heures: 744, echeance: "23/08/2030",
    metier: "organiser et piloter des prestations de transport routier de marchandises jusqu'à la clôture des dossiers",
    public: "Personnes souhaitant exercer comme exploitant ou agent d'exploitation en transport routier de marchandises (salariés, demandeurs d'emploi, personnes en reconversion).",
    blocs: [
      ["CCP 1 – Concevoir et organiser des prestations de transport routier de marchandises", ["Analyser une demande de transport et vérifier sa faisabilité", "Construire et tarifer une solution de transport", "Affecter les moyens humains et matériels", "Planifier les opérations dans le respect de la réglementation"]],
      ["CCP 2 – Mettre en œuvre et piloter les opérations de transport jusqu'à la clôture du dossier", ["Transmettre les instructions aux conducteurs et coordonner leur activité", "Suivre l'exécution et traiter les aléas et réclamations", "Contrôler les documents et clôturer les dossiers", "Analyser coûts, résultats et indicateurs qualité"]],
    ],
  },
  {
    intitule: "TP Gestionnaire comptable et fiscal", code: "RNCP37949", niveau: 5, heures: 712, echeance: "01/12/2028",
    metier: "établir les arrêtés comptables, les déclarations fiscales et les états prévisionnels d'une entreprise",
    public: "Personnes souhaitant exercer comme gestionnaire comptable et fiscal en entreprise ou en cabinet d'expertise comptable (salariés, demandeurs d'emploi, personnes en reconversion).",
    blocs: [
      ["CCP 1 – Établir et présenter les arrêtés comptables périodiques et annuels", ["Réaliser l'arrêté des comptes", "Réviser et présenter les comptes annuels"]],
      ["CCP 2 – Renseigner et contrôler les déclarations fiscales", ["Établir et contrôler les déclarations fiscales périodiques", "Établir et contrôler les déclarations fiscales annuelles"]],
      ["CCP 3 – Établir et présenter des états prévisionnels de l'activité de l'entreprise", ["Analyser les états de synthèse", "Établir et présenter des budgets et prévisions financières"]],
    ],
  },
  {
    intitule: "TP Gestionnaire de paie", code: "RNCP37948", niveau: 5, heures: 712, echeance: "29/12/2028",
    metier: "réaliser la paie et la gestion administrative et juridique du personnel",
    public: "Personnes souhaitant exercer comme gestionnaire de paie en entreprise, en cabinet ou en centre de services (salariés, demandeurs d'emploi, personnes en reconversion).",
    blocs: [
      ["CCP 1 – Réaliser la gestion administrative, juridique et la présentation des bulletins de paie", ["Traiter les informations pour déterminer la rémunération brute", "Garantir les calculs des cotisations sociales en paie", "Traiter les informations impactant la rémunération nette"]],
      ["CCP 2 – Valoriser en paie les événements de la vie professionnelle", ["Évaluer les événements particuliers liés au temps de travail", "Gérer les informations juridiques et sociales lors du départ", "Contrôler les données issues du traitement de la paie"]],
    ],
  },
  {
    intitule: "TP Comptable assistant", code: "RNCP37121", niveau: 4, heures: 744, echeance: "01/03/2028",
    metier: "assurer les opérations comptables courantes, préparer les opérations périodiques et participer aux travaux de fin d'exercice",
    public: "Personnes souhaitant exercer comme comptable assistant en entreprise ou en cabinet d'expertise comptable (salariés, demandeurs d'emploi, personnes en reconversion).",
    blocs: [
      ["CCP 1 – Assurer les opérations comptables au quotidien", ["Assurer la gestion administrative et comptable des clients", "Assurer la gestion administrative et comptable des fournisseurs", "Assurer la gestion administrative et comptable des opérations de trésorerie"]],
      ["CCP 2 – Préparer les opérations comptables périodiques", ["Assurer la gestion administrative, comptable et fiscale de la déclaration de TVA", "Assurer la gestion des variables et paramètres de paie", "Présenter et transmettre des tableaux de bord"]],
      ["CCP 3 – Participer aux opérations comptables de fin d'exercice", ["Traiter les immobilisations et les valeurs mobilières de placement", "Traiter les stocks, créances et dettes d'exploitation", "Traiter les emprunts et l'affectation du résultat"]],
    ],
  },
  {
    intitule: "TP Secrétaire comptable", code: "RNCP37123", niveau: 4, heures: 712, echeance: "01/03/2028",
    metier: "assurer les travaux administratifs de secrétariat et les opérations comptables courantes et périodiques",
    public: "Personnes souhaitant exercer comme secrétaire comptable dans une TPE, une PME, une association ou un cabinet (salariés, demandeurs d'emploi, personnes en reconversion).",
    blocs: [
      ["CCP 1 – Assurer les travaux administratifs de secrétariat au quotidien", ["Présenter des documents professionnels courants à l'aide d'outils numériques", "Organiser son environnement de travail et son classement au quotidien", "Rechercher et transmettre des informations usuelles par écrit", "Assurer l'accueil d'une structure au quotidien"]],
      ["CCP 2 – Assurer les opérations comptables au quotidien", ["Assurer la gestion administrative et comptable des clients", "Assurer la gestion administrative et comptable des fournisseurs", "Assurer la gestion administrative et comptable des opérations de trésorerie"]],
      ["CCP 3 – Préparer les opérations comptables périodiques", ["Assurer la gestion administrative, comptable et fiscale de la déclaration de TVA", "Assurer la gestion des variables et paramètres de paie", "Présenter et transmettre des tableaux de bord"]],
    ],
  },
];

function formation(d: Def): FormationInfo {
  const titre = d.intitule.replace(/^TP /, "");
  return {
    intitule: d.intitule,
    objectifs: `Formation certifiante.\nObjectif général : préparer le titre professionnel « ${titre} » (${d.code}, niveau ${d.niveau}, ministère du Travail, enregistrement valable jusqu'au ${d.echeance}) pour ${d.metier}.\nÀ l'issue de la formation, le stagiaire sera capable de :\n${d.blocs.flatMap(([, cs]) => cs).map((c) => `- ${c}.`).join("\n")}`,
    prerequis: `Niveau ${d.niveau === 4 ? "3 (CAP / BEP) ou expérience professionnelle équivalente" : "4 (baccalauréat) ou expérience professionnelle dans le domaine"} ; maîtrise du français écrit et des outils bureautiques de base. Entretien et test de positionnement à l'entrée.`,
    duree: `${d.heures} heures`,
    dureeSaisiePrioritaire: true,
    modalites: "présentiel",
    tarif: "",
    programme: d.blocs.map(([b, cs]) => `${b} : ${cs.join(" ; ")}.`).join("\n"),
    methodesEvaluation: `Test de positionnement en début de formation, évaluations en cours de formation (ECF) et mises en situation corrigées par compétence, QCM de fin de période, évaluation intermédiaire et évaluation finale, questionnaires de satisfaction à chaud et à froid. Certification : session d'examen du titre professionnel devant un jury habilité (mise en situation professionnelle, entretien technique, entretien final et dossier professionnel), selon le référentiel d'évaluation du titre ; chaque CCP peut être validé séparément.`,
    moyensPedagogiques: "Apports théoriques et méthodologiques, études de cas et mises en situation professionnelles à partir de documents réels anonymisés, logiciels et outils bureautiques du métier, supports de cours numériques, exercices corrigés, accompagnement individualisé par le formateur et préparation au dossier professionnel.",
    publicVise: d.public,
    delaiAcces: "14 jours minimum entre la demande d'inscription et l'entrée en formation",
    dateDebut: "",
    dateFin: "",
    lieu: "",
    nombreParticipants: "",
    formateur: "",
    codeRNCP: d.code,
    typeAction: "actions-formation",
  };
}

export const [FORMATION_TP_ETRM, FORMATION_TP_GCF, FORMATION_TP_GP, FORMATION_TP_CA, FORMATION_TP_SC] = DEFS.map(formation);
