import { getFicheFC, unitesFC, type FicheFC } from "./franceCompetences";
export interface RNCPFiche {
  code: string;
  intitule: string;
  niveau: string;
  certificateur: string;
  dateEnregistrement: string;
  dateEcheance: string;
  codeNSF: string;
  formacodes: string;
  resume: string;
  activitesVisees: string;
  blocsCompetences: { titre: string; competences: string[]; matieres: { competence: string; contenu: string; volume: string }[]; modalitesEval: string }[];
  secteursActivite: string;
  typesEmplois: string[];
  codesROME: string[];
  voiesAcces: string[];
  dureeIndicative: string;
  /** Fiche échue ou remplacée : ne plus la proposer pour un nouveau parcours. */
  inactif?: boolean;
  remplacePar?: string;
}

export const RNCP_FICHES: RNCPFiche[] = [
  {
    code: "RNCP36223",
    intitule: "CQP Opérateur vitrage",
    niveau: "Niveau 3 (CAP/BEP)",
    certificateur: "ANFA — Branche des services de l'automobile (CPNE)",
    dateEnregistrement: "25/02/2022",
    dateEcheance: "25/02/2027",
    codeNSF: "252r – Réparation - maintenance de véhicules à moteur",
    formacodes: "23631 – Carrosserie / 23632 – Vitrage automobile",
    resume: "Le titulaire du CQP Opérateur vitrage réalise le remplacement des vitrages d'un véhicule automobile (pare-brise et lunette collés, glaces latérales et custodes) ainsi que la réparation des impacts sur vitrage feuilleté. Il repère les équipements d'aide à la conduite associés au pare-brise et déclenche la procédure de calibrage. Il assure l'accueil de la clientèle, le recueil du besoin, la restitution du véhicule et le traitement du dossier de prise en charge par l'assureur. Fiche accessible sur France Compétences : https://www.francecompetences.fr/recherche/rncp/36223/",
    activitesVisees: "Préparation du poste et du véhicule, identification du vitrage à partir du VIN et du marquage d'homologation, dépose et repose des vitrages inamovibles collés, préparation de la baie (ravoir, traitement anticorrosion), encollage et pose selon les préconisations du fabricant de colle et du constructeur, dépose et repose des vitrages amovibles et remise en service des mécanismes de lève-vitre, diagnostic de réparabilité d'un impact et réparation à la résine, repérage des systèmes d'aide à la conduite et déclenchement du calibrage, accueil et conseil de la clientèle, traitement du dossier assurance, application des règles d'hygiène, de sécurité et d'environnement propres au vitrage automobile.",
    blocsCompetences: [
      {
        titre: "BC01 — Remplacement des vitrages",
        competences: [
          "Préparer le poste de travail et le véhicule dans le respect des règles d'hygiène et de sécurité",
          "Identifier le vitrage et sa référence à partir du VIN, des options et du marquage d'homologation",
          "Déposer un vitrage inamovible collé et préparer la baie (ravoir, traitement anticorrosion)",
          "Encoller et poser un vitrage inamovible selon les préconisations fabricant et constructeur",
          "Déposer et reposer un vitrage amovible et remettre en service un mécanisme de lève-vitre",
          "Repérer les équipements d'aide à la conduite et déclencher la procédure de calibrage",
          "Contrôler la conformité de l'intervention et renseigner la traçabilité",
        ],
        matieres: [
          { competence: "Hygiène, sécurité, environnement et organisation du poste", contenu: "EPI, risque chimique (isocyanates), manutention et prévention des TMS, méthode 5S, filière déchets du vitrage feuilleté", volume: "7h" },
          { competence: "Technologie du vitrage automobile", contenu: "Verre feuilleté et film PVB, verre trempé, vitrages athermique, acoustique, chauffant, zones capteurs, marquage et homologation ONU R43, identification par le VIN", volume: "7h" },
          { competence: "Outillage et systèmes de collage", contenu: "Systèmes à fil, lames oscillantes, ventouses, pistolets ; nettoyant, activateur, primaire, colle polyuréthane, temps de flash-off et temps de sécurité au décollage", volume: "7h" },
          { competence: "Dépose et repose d'un vitrage collé", contenu: "Protection du véhicule, dépose des périphériques, découpe, extraction, ravoir, anticorrosion, encollage, pose, contrôles et essai d'étanchéité", volume: "21h" },
          { competence: "Vitrages amovibles et lève-vitres", contenu: "Garniture de porte, pare-vapeur, aspiration des débris, pose et serrage au couple, réglages, réinitialisation de l'anti-pincement, lunette chauffante", volume: "7h" },
        ],
        modalitesEval: "Mise en situation professionnelle sur véhicule (2h30) : dépose et repose d'un pare-brise collé avec déclenchement de la procédure de calibrage. Mise en situation professionnelle (1h15) : remplacement d'un vitrage amovible et remise en service du lève-vitre. Évaluation par un jury paritaire de branche.",
      },
      {
        titre: "BC02 — Réparation d'un impact",
        competences: [
          "Réaliser le diagnostic de réparabilité d'un impact selon les critères cumulatifs",
          "Argumenter et tracer la décision de réparation ou de remplacement",
          "Réaliser la réparation d'un impact à la résine et en contrôler la qualité",
        ],
        matieres: [
          { competence: "Systèmes d'aide à la conduite (ADAS)", contenu: "Repérage des équipements, calibrage statique et dynamique, procès-verbal de calibrage, responsabilités", volume: "7h" },
          { competence: "Diagnostic de réparabilité", contenu: "Typologie des dommages, critères cumulatifs, règle du doute, mesure au gabarit, traçabilité photographique", volume: "7h" },
          { competence: "Réparation à la résine", contenu: "Ouverture du point d'impact, cycles vide/pression, disparition de l'effet miroir, polymérisation UV, finition, arasage, polissage, contrôle qualité", volume: "7h" },
        ],
        modalitesEval: "Mise en situation professionnelle (15 min) : diagnostic de réparabilité et décision argumentée sur trois vitrages endommagés. Mise en situation professionnelle (1h15) : réparation complète d'un impact à la résine avec contrôle qualité et traçabilité.",
      },
      {
        titre: "BC03 — Accueil de la clientèle et relation de service",
        competences: [
          "Accueillir le client, recueillir son besoin et réaliser l'examen contradictoire du véhicule",
          "Annoncer un diagnostic, y compris un refus de réparation, en langage clair et argumenté",
          "Traiter le dossier de prise en charge par l'assureur (garantie bris de glace, franchise, cession de créance)",
          "Proposer une prestation additionnelle à partir d'un constat réel et traiter une réclamation",
        ],
        matieres: [
          { competence: "Accueil et recueil du besoin", contenu: "Trame d'accueil, écoute et reformulation, examen contradictoire, photographies datées", volume: "7h" },
          { competence: "Assurance et relation de service", contenu: "Garantie bris de glace, franchise, cession de créance, pièces du dossier, prestation additionnelle, traitement d'une réclamation", volume: "7h" },
        ],
        modalitesEval: "Mise en situation professionnelle (15 min) : jeu de rôle d'accueil client, annonce d'un diagnostic négatif et traitement du dossier assurance, suivi d'un entretien technique avec le jury.",
      },
    ],
    secteursActivite: "Centres et réseaux spécialisés dans le vitrage automobile, carrosseries, concessions et agents de marque, ateliers d'entretien rapide, entreprises d'intervention mobile à domicile, services après-vente de loueurs et de gestionnaires de flottes.",
    typesEmplois: [
      "Opérateur vitrage",
      "Monteur en vitrage automobile",
      "Poseur de pare-brise",
      "Technicien vitrage mobile",
      "Opérateur pose et réparation de vitrage",
    ],
    codesROME: ["I1606 – Réparation de carrosserie", "I1604 – Mécanique automobile et entretien de véhicules"],
    voiesAcces: [
      "Formation initiale",
      "Formation continue",
      "Contrat de professionnalisation",
      "Apprentissage",
      "VAE",
    ],
    dureeIndicative: "90 heures en formation continue (13 jours ouvrés), dont 60 % de plateau technique",
  },
  {
    code: "RNCP39063",
    intitule: "TP - Négociateur technico-commercial",
    niveau: "Niveau 5 (Bac+2)",
    certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
    dateEnregistrement: "10/06/2024",
    dateEcheance: "10/06/2029",
    codeNSF: "312t – Négociation et vente",
    formacodes: "34581 – Technico-commercial / 34572 – Négociation grand compte / 34593 – Prospection vente",
    resume: "Le négociateur technico-commercial élabore une stratégie de prospection, organise et met en œuvre un plan d'actions commerciales et en évalue les résultats. Il conçoit des propositions techniques et commerciales personnalisées et les négocie avec les interlocuteurs de l'entreprise prospect ou cliente. Il assure leur suivi afin d'optimiser la satisfaction de l'entreprise cliente et de la fidéliser.",
    activitesVisees: "Le négociateur technico-commercial assure une veille continue. Il analyse le positionnement des produits et des services par rapport à ses concurrents, les tendances du marché, les évolutions de l'offre et les changements réglementaires. Il contribue à l'élaboration du plan commercial et met en œuvre les actions en fonction des besoins des entreprises. Il recueille les données relatives aux attentes des entreprises, crée les profils idéaux (personas) de chaque segment et personnalise son approche de prospection.",
    blocsCompetences: [
      {
        titre: "Élaborer une stratégie de prospection et la mettre en œuvre",
        competences: [
          "Assurer une veille commerciale",
          "Concevoir et organiser un plan d'actions commerciales",
          "Prospecter un secteur défini",
          "Analyser ses performances, élaborer et mettre en œuvre des actions correctives",
        ],
        matieres: [
          { competence: "Assurer une veille commerciale", contenu: "Outils de veille, analyse concurrentielle, tendances marché, environnement réglementaire", volume: "35h" },
          { competence: "Concevoir et organiser un plan d'actions commerciales", contenu: "Définition d'objectifs SMART, planification, outils CRM, tableaux de bord", volume: "42h" },
          { competence: "Prospecter un secteur défini", contenu: "Personas, canaux de prospection (phoning, emailing, social selling, terrain), prise de RDV", volume: "49h" },
          { competence: "Analyser ses performances", contenu: "KPIs commerciaux, analyse des écarts, plan d'actions correctives, reporting", volume: "28h" },
        ],
        modalitesEval: "Mise en situation professionnelle (2h30) : étude de cas écrite (1h30) + oral (1h). Entretien technique (50 min). Questionnement à partir de productions (40 min). Durée totale : 4h00.",
      },
      {
        titre: "Négocier une solution technique et commerciale et consolider l'expérience client",
        competences: [
          "Représenter l'entreprise et valoriser son image",
          "Concevoir une proposition technique et commerciale",
          "Négocier une solution technique et commerciale",
          "Réaliser le bilan, ajuster son activité commerciale et rendre compte",
          "Optimiser la gestion de la relation client",
        ],
        matieres: [
          { competence: "Représenter l'entreprise et valoriser son image", contenu: "Communication professionnelle, image de marque, réseaux professionnels, événementiel", volume: "28h" },
          { competence: "Concevoir une proposition technique et commerciale", contenu: "Analyse des besoins, rédaction de propositions, chiffrage, argumentation", volume: "42h" },
          { competence: "Négocier une solution technique et commerciale", contenu: "Techniques de négociation, traitement des objections, closing, gestion de conflits", volume: "56h" },
          { competence: "Réaliser le bilan et ajuster son activité commerciale", contenu: "Reporting, analyse de résultats, recommandations, amélioration continue", volume: "21h" },
          { competence: "Optimiser la gestion de la relation client", contenu: "Fidélisation, CRM avancé, gestion des réclamations, upselling/cross-selling", volume: "35h" },
        ],
        modalitesEval: "Mise en situation professionnelle (4h45) : étude de cas écrite (3h) + oral (1h45). Entretien technique (50 min). Questionnement à partir de productions (30 min). Durée totale : 6h05.",
      },
    ],
    secteursActivite: "Tous les secteurs d'activité qui nécessitent des négociateurs technico-commerciaux",
    typesEmplois: ["Technico-commercial", "Chargé d'affaires", "Responsable grands comptes", "Chargé de développement commercial", "Business developer", "Key account manager"],
    codesROME: ["D1402", "D1406", "D1407"],
    voiesAcces: ["Après un parcours de formation continue", "En contrat d'apprentissage", "Après un parcours de formation hors temps de travail", "Par expérience (VAE)"],
    dureeIndicative: "420h",
  },
  {
    code: "RNCP36803",
    intitule: "TP - Assistant(e) de direction",
    niveau: "Niveau 5 (Bac+2)",
    certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
    dateEnregistrement: "01/09/2022",
    dateEcheance: "01/09/2027",
    codeNSF: "324t – Saisie, mise en forme et communication des données",
    formacodes: "35054 – Secrétariat assistanat direction",
    resume: "L'assistant de direction assiste au quotidien un dirigeant et facilite sa prise de décision. Il gère la relation entre le dirigeant et ses interlocuteurs.",
    activitesVisees: "L'assistant de direction optimise les processus administratifs et contribue à l'amélioration de l'organisation de la structure. Il assure l'interface entre le dirigeant et les collaborateurs, les partenaires et les clients.",
    blocsCompetences: [
      {
        titre: "Assister la direction au quotidien et faciliter la prise de décisions",
        competences: ["Organiser et coordonner les activités quotidiennes", "Concevoir des outils de pilotage", "Optimiser les processus administratifs"],
        matieres: [
          { competence: "Organiser et coordonner les activités quotidiennes", contenu: "Gestion d'agenda, organisation de réunions, déplacements, communication interne", volume: "56h" },
          { competence: "Concevoir des outils de pilotage", contenu: "Tableaux de bord, indicateurs, reporting, outils bureautiques avancés", volume: "42h" },
          { competence: "Optimiser les processus administratifs", contenu: "Procédures, dématérialisation, classement, archivage, veille informationnelle", volume: "35h" },
        ],
        modalitesEval: "Mise en situation professionnelle écrite et orale. Dossier professionnel.",
      },
      {
        titre: "Gérer le traitement, l'organisation et le partage de l'information",
        competences: ["Assurer la recherche, la synthèse et la diffusion de l'information", "Communiquer par écrit et en anglais", "Assurer l'interface entre la direction et les partenaires"],
        matieres: [
          { competence: "Recherche et synthèse de l'information", contenu: "Veille, sources d'information, rédaction de notes de synthèse", volume: "35h" },
          { competence: "Communication écrite et anglais professionnel", contenu: "Rédaction professionnelle, correspondance, anglais des affaires B2", volume: "56h" },
          { competence: "Interface direction / partenaires", contenu: "Accueil, gestion de conflits, communication interpersonnelle", volume: "28h" },
        ],
        modalitesEval: "Mise en situation professionnelle. Questionnement oral.",
      },
    ],
    secteursActivite: "Tous secteurs d'activité (entreprises privées, publiques, associations)",
    typesEmplois: ["Assistant de direction", "Office manager", "Assistant de manager", "Secrétaire de direction"],
    codesROME: ["M1604"],
    voiesAcces: ["Formation continue", "Contrat d'apprentissage", "VAE"],
    dureeIndicative: "252h",
  },
  {
    code: "RNCP37674",
    intitule: "TP - Développeur web et web mobile",
    niveau: "Niveau 5 (Bac+2)",
    certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
    dateEnregistrement: "29/08/2023",
    dateEcheance: "29/08/2028",
    codeNSF: "326t – Programmation, mise en place de logiciels",
    formacodes: "31088 – Programmation / 46270 – Création site internet",
    resume: "Le développeur web et web mobile développe ou fait évoluer des applications orientées web, ou web mobile, en respectant les normes et standards reconnus par la profession et en suivant l'état de l'art de la sécurité informatique.",
    activitesVisees: "Le développeur web conçoit la partie visuelle de l'application et code l'ensemble avec les langages adaptés. Il réalise des composants d'interface, crée des pages web, développe la partie back-end et crée des bases de données.",
    blocsCompetences: [
      {
        titre: "Développer la partie front-end d'une application web ou web mobile",
        competences: ["Installer et configurer son environnement de travail", "Maquetter des interfaces utilisateur", "Réaliser des interfaces utilisateur statiques et adaptables", "Développer des interfaces utilisateur dynamiques"],
        matieres: [
          { competence: "Environnement de travail et maquettage", contenu: "IDE, Git, Figma, wireframes, maquettes UI/UX", volume: "35h" },
          { competence: "Interfaces statiques et adaptables", contenu: "HTML5, CSS3, responsive design, accessibilité WCAG", volume: "56h" },
          { competence: "Interfaces dynamiques", contenu: "JavaScript, TypeScript, React, Vue.js, APIs REST", volume: "84h" },
        ],
        modalitesEval: "Mise en situation professionnelle. Entretien technique. Dossier professionnel.",
      },
      {
        titre: "Développer la partie back-end d'une application web ou web mobile",
        competences: ["Mettre en place une base de données relationnelle", "Développer des composants d'accès aux données", "Développer des composants métier", "Documenter le déploiement"],
        matieres: [
          { competence: "Base de données", contenu: "SQL, PostgreSQL, modélisation, migration, ORM", volume: "42h" },
          { competence: "Composants back-end", contenu: "Node.js, Express, API REST, authentification, sécurité", volume: "70h" },
          { competence: "Déploiement et documentation", contenu: "Docker, CI/CD, documentation technique, tests", volume: "35h" },
        ],
        modalitesEval: "Mise en situation professionnelle. Entretien technique. Dossier professionnel.",
      },
    ],
    secteursActivite: "ESN, agences web, startups, DSI d'entreprises",
    typesEmplois: ["Développeur web", "Développeur front-end", "Développeur back-end", "Développeur full-stack", "Développeur web mobile"],
    codesROME: ["M1805"],
    voiesAcces: ["Formation continue", "Contrat d'apprentissage", "VAE"],
    dureeIndicative: "322h",
  },
  {
    code: "RNCP35634",
    intitule: "TP - Employé commercial",
    niveau: "Niveau 3 (CAP/BEP)",
    certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
    dateEnregistrement: "10/06/2021",
    dateEcheance: "10/06/2026",
    codeNSF: "312m – Commerce, vente",
    formacodes: "34502 – Vente spécialisée",
    resume: "L'employé commercial contribue au développement de l'activité commerciale du point de vente en assurant la mise en valeur des produits et en participant à la relation client.",
    activitesVisees: "L'employé commercial met en rayon les marchandises, assure la présentation marchande des produits, accueille et renseigne les clients, encaisse les achats.",
    blocsCompetences: [
      {
        titre: "Mettre à disposition des clients les produits de l'unité marchande",
        competences: ["Approvisionner l'unité marchande", "Assurer la présentation marchande des produits", "Contribuer à la gestion et optimiser les stocks"],
        matieres: [
          { competence: "Approvisionnement", contenu: "Gestion des livraisons, contrôle marchandises, rotation des stocks", volume: "42h" },
          { competence: "Présentation marchande", contenu: "Merchandising, facing, PLV, étiquetage, hygiène et sécurité", volume: "35h" },
          { competence: "Gestion des stocks", contenu: "Inventaires, outils de gestion, seuils d'alerte, commandes", volume: "28h" },
        ],
        modalitesEval: "Mise en situation professionnelle. Entretien technique.",
      },
      {
        titre: "Accueillir les clients et répondre à leur demande",
        competences: ["Accueillir, renseigner et servir les clients", "Contribuer à l'amélioration de l'expérience d'achat", "Tenir un poste de caisse"],
        matieres: [
          { competence: "Accueil et service client", contenu: "Techniques d'accueil, argumentation produit, gestion des réclamations", volume: "35h" },
          { competence: "Expérience d'achat", contenu: "Fidélisation, vente additionnelle, satisfaction client", volume: "28h" },
          { competence: "Caisse", contenu: "Encaissement, moyens de paiement, ouverture/fermeture de caisse", volume: "21h" },
        ],
        modalitesEval: "Mise en situation professionnelle. Entretien technique.",
      },
    ],
    secteursActivite: "Grande distribution, commerce spécialisé, commerce de proximité",
    typesEmplois: ["Employé de commerce", "Employé de rayon", "Vendeur", "Employé de libre-service", "Hôte de caisse"],
    codesROME: ["D1507", "D1106"],
    voiesAcces: ["Formation continue", "Contrat d'apprentissage", "VAE"],
    dureeIndicative: "189h",
  },
  {
    code: "RNCP37098",
    intitule: "TP - Gestionnaire de paie",
    niveau: "Niveau 5 (Bac+2)",
    certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
    dateEnregistrement: "29/12/2022",
    dateEcheance: "29/12/2027",
    codeNSF: "315t – Établissement de la paie, recrutement du personnel",
    formacodes: "32688 – Traitement paie",
    resume: "Le gestionnaire de paie assure le traitement de la paie et la gestion administrative du personnel. Il prend en charge l'ensemble des déclarations sociales et veille à la conformité légale.",
    activitesVisees: "Le gestionnaire de paie recueille et traite les informations nécessaires à l'établissement de la paie. Il contrôle la conformité des bulletins et gère les déclarations sociales.",
    blocsCompetences: [
      {
        titre: "Réaliser la gestion administrative, juridique et la présentation des bulletins de paie",
        competences: ["Traiter les informations pour déterminer la rémunération brute", "Garantir les calculs des cotisations sociales", "Traiter les événements liés au temps de travail"],
        matieres: [
          { competence: "Rémunération brute", contenu: "Éléments de salaire, conventions collectives, temps de travail, absences", volume: "70h" },
          { competence: "Cotisations sociales", contenu: "Organismes sociaux, taux, plafonds, DSN, régularisation", volume: "56h" },
          { competence: "Événements de paie", contenu: "Congés, maladie, maternité, AT/MP, activité partielle", volume: "42h" },
        ],
        modalitesEval: "Mise en situation professionnelle. Entretien technique. Dossier professionnel.",
      },
      {
        titre: "Valoriser en paie les événements de la vie professionnelle",
        competences: ["Évaluer les événements particuliers liés au temps de travail", "Gérer les dernières étapes du départ du salarié", "Contrôler les données de synthèse"],
        matieres: [
          { competence: "Événements particuliers", contenu: "Primes, avantages en nature, épargne salariale, titres-restaurant", volume: "42h" },
          { competence: "Départ du salarié", contenu: "Solde de tout compte, documents de fin de contrat, portabilité", volume: "35h" },
          { competence: "Contrôle et synthèse", contenu: "État de charges, bilan social, reporting, audit de paie", volume: "28h" },
        ],
        modalitesEval: "Mise en situation professionnelle. Entretien technique.",
      },
    ],
    secteursActivite: "Cabinets comptables, services RH/paie, ESN spécialisées",
    typesEmplois: ["Gestionnaire de paie", "Technicien paie", "Collaborateur paie", "Assistant paie"],
    codesROME: ["M1501", "M1503"],
    voiesAcces: ["Formation continue", "Contrat d'apprentissage", "VAE"],
    dureeIndicative: "273h",
  },
  {
    code: "RS6674",
    intitule: "Communiquer en français dans les secteurs du social et du médico-social (niveau B1)",
    niveau: "Répertoire Spécifique",
    certificateur: "MYCENES CONSEIL",
    dateEnregistrement: "27/06/2024",
    dateEcheance: "27/06/2027",
    codeNSF: "136 – Langues vivantes, civilisations étrangères et régionales",
    formacodes: "15242 – Français à visée professionnelle / 15281 – Français mise à niveau / 44072 – Travail social",
    resume: "La certification s'adresse aux professionnels exerçant ou souhaitant exercer dans les secteurs du social et du médico-social. Elle vise à faire acquérir et valider des compétences dans la communication en français des travailleurs étrangers récemment arrivés et ayant intégré des postes mais ne maîtrisant pas le vocabulaire et modes d'expressions écrites et orales spécifiques au secteur. Le niveau B1 correspond à un niveau d'utilisateur indépendant.",
    activitesVisees: "Communication professionnelle en français dans le secteur social et médico-social : compréhension et rédaction de documents professionnels, échanges oraux avec patients, collègues et partenaires, utilisation du vocabulaire spécifique au secteur.",
    blocsCompetences: [
      {
        titre: "C1 – Compréhension écrite",
        competences: [
          "Lire et identifier les informations recherchées sur les différents documents relatifs aux activités en lien avec les secteurs du social et du médico-social (plan de travail, consignes, prescriptions…)",
          "S'appuyer sur le vocabulaire utilisé dans le cadre professionnel spécifique et les habitudes de formulation (syntaxes raccourcies, abréviations…)",
          "Assurer une prise en compte adéquate des écrits professionnels",
        ],
        matieres: [
          { competence: "Compréhension du vocabulaire spécifique", contenu: "Vocabulaire spécifique au domaine social et médico-social, textes factuels et clairs, environnement professionnel", volume: "10h" },
          { competence: "Compréhension de textes professionnels", contenu: "Messages, consignes, textes courts en lien avec le niveau de responsabilité et d'intervention dans le secteur", volume: "8h" },
          { competence: "Compréhension des demandes", contenu: "Messages exprimant des demandes des patients ou personnes accompagnées, consignes des collaborateurs", volume: "7h" },
        ],
        modalitesEval: "Evaluation E1 : Compréhension écrite – QCM 4 sections, 60 questions (51 écrans), durée 40 minutes. Une seule réponse exacte par question.",
      },
      {
        titre: "C2 – Expression écrite",
        competences: [
          "Rédiger des comptes rendus, écrits et messages professionnels en français en utilisant le vocabulaire spécifique du secteur social et médico-social",
          "Planifier ou gérer les rendez-vous de patients ou d'usagers pour le secteur médico-social",
          "Retranscrire des informations à caractère social",
          "Utiliser le champ lexical et la grammaire du secteur social et médico-social",
        ],
        matieres: [
          { competence: "Expression écrite professionnelle", contenu: "Planification de rendez-vous (80 mots min.), production de documents professionnels courants (200 mots min.), vocabulaire et argumentation", volume: "10h" },
          { competence: "Champ lexical et grammaire", contenu: "Expressions, vocabulaire professionnel, expressions téléphoniques, mots de liaison, expressions empathiques, adjectifs, adverbes, prépositions, temps, verbes modaux, comparatifs, conditionnels, gérondifs, voix passive, pronoms", volume: "10h" },
          { competence: "Documents administratifs", contenu: "Documents de prise en charge sociale, transmissions écrites, comptes rendus d'intervention, courriers professionnels", volume: "5h" },
        ],
        modalitesEval: "Evaluation E2 : Expression écrite – 2 sections (Section A : planification 80 mots min., Section B : retranscription 200 mots min.), durée 1h. Evaluation E3 : Champ lexical et grammaire – QCM 4 sections, 40 questions, durée 30 min, seuil 80%.",
      },
      {
        titre: "C3 – Compréhension orale",
        competences: [
          "Comprendre les informations transmises en direct ou à distance (téléphone, visio ou sur bande audio)",
          "S'adapter aux différents niveaux de langages (techniques et émotionnels)",
          "S'adapter aux différentes vitesses d'élocutions et typologies d'accents",
          "Faire usage des informations comprises lors des échanges à finalité professionnelle",
        ],
        matieres: [
          { competence: "Compréhension orale en situation", contenu: "Écoute de consignes, conversations téléphoniques, réunions d'équipe, transmissions orales entre collègues", volume: "10h" },
          { competence: "Vocabulaire médical et social courant", contenu: "Vocabulaire utilisé dans le champ habituel d'intervention, articulation et vocabulaire distinctement exprimé", volume: "10h" },
        ],
        modalitesEval: "Evaluation E4 : Compréhension orale – QCM 4 sections, 50 questions (64 écrans), durée 1h. Une seule réponse exacte par question.",
      },
      {
        titre: "C4 – Expression orale",
        competences: [
          "S'exprimer à l'oral en construisant différents types de phrases (questions, réponses, déclarations, explications)",
          "Utiliser des structures grammaticales compréhensibles et des champs lexicaux appropriés",
          "Communiquer et interagir de façon claire, concise et efficace dans le cadre d'activités du secteur social et médico-social",
          "Obtenir des renseignements et argumenter pour convaincre",
        ],
        matieres: [
          { competence: "Expression orale en situation professionnelle", contenu: "Relater des faits professionnels, donner des explications, demande de renseignements, orientation et conseil", volume: "5h" },
          { competence: "Argumentation et vocabulaire oral", contenu: "Expression d'opinions, argumentation simple, vocabulaire spécifique oral du domaine social et médico-social : termes, sigles et expressions courants", volume: "5h" },
        ],
        modalitesEval: "Evaluation E5 : Expression orale – Face à face avec examinateur, 15 minutes. Section A : Obtenir des renseignements (5 min). Section B : Argumenter pour convaincre (10 min).",
      },
    ],
    secteursActivite: "Social et médico-social : établissements de santé, EHPAD, services d'aide à domicile, centres médico-sociaux, hôpitaux, cliniques",
    typesEmplois: ["Secrétaire médical", "Secrétaire médico-social", "Assistant médico-administratif", "Assistant médical", "Secrétaire hospitalier", "Auxiliaire de vie", "Assistant de vie", "Agent à domicile", "Garde d'enfant à domicile"],
    codesROME: ["K1301", "K1302", "J1501"],
    voiesAcces: ["Après un parcours de formation continue"],
    dureeIndicative: "90h",
  },
  {
    code: "RS6776",
    intitule: "Création de contenus rédactionnels et visuels par l'usage responsable de l'intelligence artificielle générative",
    niveau: "Répertoire Spécifique",
    certificateur: "INKREA FORMATIONS",
    dateEnregistrement: "01/10/2024",
    dateEcheance: "01/10/2029",
    codeNSF: "324p – Organisation du travail de bureau / 326p – Informatique, traitement de l'information",
    formacodes: "31028 – Intelligence artificielle",
    resume: "Cette certification atteste les compétences nécessaires pour utiliser l'Intelligence Artificielle (IA) Générative de façon efficace, sécurisée, inclusive et réglementaire, dans le but de créer des contenus rédactionnels et visuels et de gagner en productivité. Elle s'adresse aux salariés et demandeurs d'emploi du secteur tertiaire dont le métier inclut la production de contenus rédactionnels ou visuels.",
    activitesVisees: "Définition de la stratégie d'implémentation de l'IA Générative sur le poste de travail, utilisation optimale des outils d'IA Générative pour créer des contenus rédactionnels et visuels, évaluation et résolution des problématiques éthiques et réglementaires liées à l'utilisation d'outils d'IA générative.",
    blocsCompetences: [
      {
        titre: "C1 – Stratégie d'implémentation de l'IA Générative",
        competences: [
          "Définir la stratégie d'implémentation de l'IA Générative en fonction du contexte professionnel et des outils existants (ChatGPT, Google Gemini, Adobe Firefly, Microsoft Copilot)",
          "Identifier les optimisations envisageables sur le poste de travail",
          "Dégager un plan stratégique d'intégration et d'installation des outils d'IA Générative",
        ],
        matieres: [
          { competence: "Panorama des outils d'IA Générative", contenu: "ChatGPT, Google Gemini, Adobe Firefly, Microsoft Copilot : fonctionnalités, cas d'usage, installation et configuration", volume: "4h" },
          { competence: "Analyse du contexte professionnel", contenu: "Analyse du poste, identification des tâches optimisables, évaluation des gains de productivité", volume: "2h" },
          { competence: "Plan stratégique d'intégration", contenu: "Élaboration d'un plan d'implémentation, justification des choix d'outils, organisation des tâches optimisées", volume: "2h" },
        ],
        modalitesEval: "E1 : Mise en situation professionnelle – Rapport écrit (préparation 10 jours) + soutenance orale (20 min). Élaboration et mise en œuvre d'une stratégie d'implémentation de l'IA Générative sur le poste de travail.",
      },
      {
        titre: "C2 – Prompt Engineering (requêtage)",
        competences: [
          "Rédiger un prompt optimal sur un outil d'IA Générative en utilisant les techniques de Prompt Engineering",
          "Respecter la structure de rédaction de prompt (Rôle, Cible, Objectif, Contexte, Format)",
          "Produire des contenus satisfaisants au regard de la demande",
        ],
        matieres: [
          { competence: "Techniques de Prompt Engineering", contenu: "Structure Rôle-Cible-Objectif-Contexte-Format, rédaction de prompts efficaces, itération conversationnelle", volume: "4h" },
          { competence: "Optimisation des résultats", contenu: "Évaluation de la pertinence des contenus générés, ajustement des prompts, few-shot prompting, chain-of-thought", volume: "3h" },
        ],
        modalitesEval: "E2 : Mise en situation professionnelle – Rédaction d'un prompt à partir d'une demande imposée + soutenance orale justifiant la structure et les contenus générés.",
      },
      {
        titre: "C3 – Confidentialité des données professionnelles",
        competences: [
          "Garantir la confidentialité des données professionnelles dans l'utilisation d'outils d'IA Générative",
          "Appliquer les bonnes pratiques en matière de sécurité et de protection des informations sensibles",
          "Prévenir toute fuite ou violation de la confidentialité",
        ],
        matieres: [
          { competence: "Sécurité des données et IA", contenu: "Identification des données sensibles, risques de fuite, anonymisation, paramétrage de confidentialité des outils", volume: "2h" },
          { competence: "Bonnes pratiques de protection", contenu: "Politiques de sécurité internes, correction de prompts à risque, justification des mesures de protection", volume: "1h" },
        ],
        modalitesEval: "E3 : Mise en situation professionnelle – Correction d'un prompt présentant des risques de violation de données internes + justification orale des corrections apportées.",
      },
      {
        titre: "C4 – Production de contenus inclusifs",
        competences: [
          "Produire des contenus inclusifs en les adaptant aux besoins spécifiques des personnes en situation de handicap",
          "Garantir l'accessibilité des contenus rédactionnels et visuels",
          "Adapter les contenus aux handicaps visuel, auditif et cognitif",
        ],
        matieres: [
          { competence: "Accessibilité et handicap visuel", contenu: "Descriptions textuelles (textes alternatifs), adaptation aux lecteurs d'écran, versions audios des contenus", volume: "1h" },
          { competence: "Accessibilité et handicap auditif", contenu: "Transcription écrite des contenus audio, sous-titrage, alternatives visuelles", volume: "1h" },
          { competence: "Accessibilité et handicap cognitif", contenu: "Langage simple et clair, structure logique et hiérarchisée, FALC (Facile à Lire et à Comprendre)", volume: "1h" },
        ],
        modalitesEval: "E4 : Mise en situation professionnelle – Production d'un contenu rédactionnel accessible tenant compte d'un handicap cognitif + soutenance orale sur les 3 types de handicap.",
      },
      {
        titre: "C5 – Optimisation des contenus générés par l'IA",
        competences: [
          "Utiliser les techniques d'optimisation des contenus générés par les outils d'IA Générative",
          "Enrichir le contexte de la demande dans les échanges conversationnels",
          "Affiner le prompt initial pour produire des contenus adaptés et améliorés selon des critères définis",
        ],
        matieres: [
          { competence: "Techniques d'optimisation", contenu: "Enrichissement du contexte, affinage itératif des prompts, critères de qualité (contrainte, contexte, style, format)", volume: "2h" },
          { competence: "Workflow intégré et amélioration", contenu: "Stratégie d'amélioration des contenus, prise en compte du ton et du handicap, évaluation de la qualité finale", volume: "2h" },
        ],
        modalitesEval: "E5 : Mise en situation professionnelle – Amélioration d'un contenu déjà généré via un prompt d'optimisation selon des critères imposés (ton, handicap) + soutenance orale.",
      },
      {
        titre: "C6 – Conformité IA Act et RGPD",
        competences: [
          "Appliquer les directives de l'IA Act et du RGPD",
          "Mettre en place une veille réglementaire",
          "Identifier les risques au sein des contenus et mettre en œuvre des mesures préventives et correctives",
        ],
        matieres: [
          { competence: "Cadre réglementaire IA Act", contenu: "Directives européennes IA Act, obligations de transparence, classification des risques, dernières révisions", volume: "2h" },
          { competence: "RGPD appliqué à l'IA", contenu: "Protection des données personnelles, veille réglementaire, identification et résolution des problématiques éthiques et réglementaires", volume: "2h" },
        ],
        modalitesEval: "E6 : Mise en situation professionnelle – Identification et analyse des risques liés à l'utilisation d'outils d'IA Générative + proposition de solutions conformes IA Act et RGPD + soutenance orale.",
      },
    ],
    secteursActivite: "Secteur tertiaire : assistanat, secrétariat, marketing, communication, ressources humaines, juridique",
    typesEmplois: ["Assistant de direction", "Community manager", "Chargé de communication", "Rédacteur", "Responsable marketing", "Assistant RH"],
    codesROME: ["E1104", "E1101", "M1604"],
    voiesAcces: ["Après un parcours de formation continue", "Par candidature individuelle", "Par expérience (VAE)"],
    dureeIndicative: "28h",
  },
  {
    code: "RNCP31041",
    intitule: "CAP Esthétique Cosmétique Parfumerie (fiche inactive — remplacée par RNCP39030)",
    niveau: "Niveau 3 (CAP)",
    certificateur: "Ministère de l'Éducation nationale et de la Jeunesse",
    dateEnregistrement: "05/07/2017",
    dateEcheance: "23/05/2024",
    inactif: true,
    remplacePar: "RNCP39030",
    codeNSF: "336",
    formacodes: "42032, 42040, 42056",
    resume: "Le titulaire du CAP Esthétique Cosmétique Parfumerie est un professionnel qualifié qui réalise des soins esthétiques du visage et du corps, des épilations, des maquillages, des manucures et des conseils de vente de produits cosmétiques et de parfumerie. Il accueille, conseille et fidélise la clientèle dans le respect des protocoles d'hygiène et de sécurité.",
    activitesVisees: "Réalisation de techniques esthétiques : soins du visage et du corps, épilations, maquillage, manucure et beauté des pieds. Conseil et vente de produits cosmétiques et de parfumerie. Accueil et prise en charge de la clientèle. Gestion de l'espace de travail et respect des protocoles d'hygiène.",
    blocsCompetences: [
      {
        titre: "Bloc 1 – Techniques esthétiques du visage, des mains et des pieds",
        competences: [
          "Réaliser des soins esthétiques du visage",
          "Réaliser des épilations du visage",
          "Réaliser un maquillage du visage",
          "Réaliser des soins des mains et des pieds (manucure, beauté des pieds)",
          "Mettre en œuvre les protocoles d'hygiène et de sécurité"
        ],
        matieres: [
          { competence: "Soins du visage", contenu: "Analyse de peau, nettoyage, gommage, modelage, masques, soins spécifiques", volume: "60h" },
          { competence: "Épilation du visage", contenu: "Techniques à la cire chaude et tiède, finitions", volume: "20h" },
          { competence: "Maquillage", contenu: "Étude du visage, maquillage jour et soir, auto-maquillage, maquillage correctif", volume: "40h" },
          { competence: "Soins des mains et pieds", contenu: "Manucure, mise en beauté des ongles, soin des pieds, pose de vernis", volume: "30h" }
        ],
        modalitesEval: "Épreuve pratique : réalisation de soins esthétiques du visage, d'un maquillage, d'une manucure et d'une épilation sur modèle vivant."
      },
      {
        titre: "Bloc 2 – Techniques esthétiques liées aux phanères",
        competences: [
          "Réaliser des épilations sur différentes zones du corps",
          "Réaliser des soins des ongles et des prothèses ongulaires simples",
          "Réaliser des colorations et décolorations des poils et cils",
          "Appliquer les règles d'hygiène et de sécurité spécifiques"
        ],
        matieres: [
          { competence: "Épilations corporelles", contenu: "Techniques d'épilation à la cire (toutes zones), utilisation des différents types de cire", volume: "40h" },
          { competence: "Soins des ongles", contenu: "Techniques de limage, polissage, pose de vernis semi-permanent, décorations simples", volume: "30h" },
          { competence: "Coloration/décoloration", contenu: "Teinture des cils et sourcils, décoloration des duvets", volume: "15h" }
        ],
        modalitesEval: "Épreuve pratique : réalisation d'une épilation et de soins des ongles sur modèle vivant."
      },
      {
        titre: "Bloc 3 – Conduite d'un institut de beauté et de bien-être : conseil et vente",
        competences: [
          "Accueillir et prendre en charge la clientèle",
          "Conseiller et vendre des produits cosmétiques et de parfumerie",
          "Mettre en valeur et promouvoir des produits, des services",
          "Participer à la vie d'un institut (organisation, encaissement, fidélisation)",
          "Gérer les rendez-vous et l'espace de vente"
        ],
        matieres: [
          { competence: "Conseil et vente", contenu: "Connaissance des produits cosmétiques, techniques de vente, argumentation commerciale, fidélisation", volume: "40h" },
          { competence: "Gestion d'institut", contenu: "Gestion des stocks, encaissement, tenue de caisse, planification des rendez-vous", volume: "25h" },
          { competence: "Communication professionnelle", contenu: "Accueil client, écoute active, gestion des réclamations", volume: "15h" }
        ],
        modalitesEval: "Épreuve orale et écrite : mise en situation de conseil et vente, analyse d'une situation professionnelle en institut."
      }
    ],
    secteursActivite: "Esthétique, cosmétique, parfumerie, bien-être, spa, parapharmacie, grande distribution spécialisée",
    typesEmplois: ["Esthéticien(ne)", "Conseiller(ère) de vente en parfumerie", "Prothésiste ongulaire", "Maquilleur(se)", "Spa praticien(ne)"],
    codesROME: ["D1208", "D1214"],
    voiesAcces: ["Formation initiale sous statut scolaire", "Apprentissage", "Formation professionnelle continue", "Candidature individuelle", "VAE"],
    dureeIndicative: "600h (formation) + 12 semaines de stage en milieu professionnel",
  },
  {
    code: "RNCP39030",
    intitule: "CAP - Esthétique Cosmétique Parfumerie",
    niveau: "Niveau 3 (CAP)",
    certificateur: "Ministère de l'Éducation nationale et de la Jeunesse",
    dateEnregistrement: "23/05/2024",
    dateEcheance: "31/12/2028",
    codeNSF: "336 – Coiffure, esthétique et autres spécialités des services aux personnes",
    formacodes: "42032 – Esthétique soin corporel / 42040 – Esthétique cosmétique / 42056 – Vente produit beauté",
    resume: "Le titulaire du CAP Esthétique Cosmétique Parfumerie (RNCP39030) est un professionnel qualifié qui réalise des techniques de soins esthétiques (visage, mains, pieds), des épilations, des maquillages, des soins des phanères ainsi que la conduite d'un institut de beauté incluant le conseil et la vente de produits cosmétiques et de parfumerie. Il accueille, conseille et fidélise la clientèle dans le strict respect des règles d'hygiène, de sécurité et de la réglementation cosmétique européenne (Règlement CE 1223/2009).",
    activitesVisees: "Réaliser des techniques esthétiques du visage, des mains et des pieds (soins, modelage, maquillage, manucure, beauté des pieds). Réaliser des techniques esthétiques liées aux phanères (épilations corps et visage, soins des ongles, colorations et décolorations des cils et sourcils). Conduire un institut de beauté et de bien-être : accueil, conseil, vente, fidélisation, gestion administrative simple de l'espace de vente. Appliquer en permanence les règles d'hygiène, de sécurité et de développement durable.",
    blocsCompetences: [
      {
        titre: "Bloc 1 – Techniques esthétiques du visage, des mains et des pieds",
        competences: [
          "Réaliser un diagnostic de peau et des phanères",
          "Mettre en œuvre un protocole de soins esthétiques du visage",
          "Réaliser un maquillage du visage (jour, soir, correctif)",
          "Réaliser des soins esthétiques des mains et des pieds (manucure, beauté des pieds)",
          "Réaliser des épilations du visage",
          "Appliquer les règles d'hygiène, de sécurité et d'ergonomie",
        ],
        matieres: [
          { competence: "Anatomie, physiologie et dermatologie", contenu: "Structure de la peau, types et états de peau, phanères, pathologies cutanées courantes, contre-indications", volume: "40h" },
          { competence: "Soins du visage", contenu: "Diagnostic, démaquillage, gommage, vapozone, modelage, masque, soins spécifiques, produits adaptés", volume: "70h" },
          { competence: "Maquillage", contenu: "Étude morphologique, maquillage jour/soir, maquillage correctif, conseil personnalisé, mise en valeur des couleurs", volume: "45h" },
          { competence: "Soins des mains et des pieds", contenu: "Manucure, beauté des pieds, modelage, pose de vernis classique et semi-permanent, décorations simples", volume: "40h" },
          { competence: "Épilation du visage", contenu: "Techniques cire tiède et chaude, finitions, gestion des contre-indications, soins post-épilation", volume: "20h" },
          { competence: "Hygiène et sécurité", contenu: "Décret 2008-87, désinfection, DASRI, ergonomie, prévention TMS", volume: "15h" },
        ],
        modalitesEval: "Épreuve EP1 – Pratique sur modèle vivant (3h00) : soin du visage + maquillage + manucure + épilation visage. Écrit (1h00) : analyse de cas et justification des techniques.",
      },
      {
        titre: "Bloc 2 – Techniques esthétiques liées aux phanères",
        competences: [
          "Réaliser des épilations sur différentes zones du corps",
          "Réaliser des soins des ongles et des prothèses ongulaires simples",
          "Réaliser des colorations et décolorations des poils, des cils et des sourcils",
          "Appliquer les règles d'hygiène et de sécurité spécifiques aux phanères",
        ],
        matieres: [
          { competence: "Épilations corporelles", contenu: "Techniques cire tiède, chaude, jetable, roll-on – jambes, bras, aisselles, maillot, dos – sens du poil, contre-indications", volume: "50h" },
          { competence: "Prothésie ongulaire de base", contenu: "Préparation, base, vernis semi-permanent, catalysation UV/LED, dépose sécurisée", volume: "35h" },
          { competence: "Coloration/décoloration", contenu: "Teinture cils et sourcils, décoloration du duvet, test allergique préalable", volume: "15h" },
        ],
        modalitesEval: "Épreuve EP2 – Pratique sur modèle vivant (2h30) : épilation + soins des ongles + coloration cils ou sourcils. Écrit (1h00) : sciences appliquées et technologie.",
      },
      {
        titre: "Bloc 3 – Conduite d'un institut de beauté et de bien-être : conseil et vente",
        competences: [
          "Accueillir, prendre en charge et fidéliser la clientèle",
          "Conseiller et vendre des produits cosmétiques et de parfumerie",
          "Mettre en valeur et promouvoir des produits et des services",
          "Participer à la vie de l'institut (organisation, encaissement, gestion des rendez-vous)",
          "Inscrire son activité dans une démarche de développement durable",
        ],
        matieres: [
          { competence: "Connaissance des produits cosmétiques", contenu: "Catégories de produits, lecture INCI, réglementation CE 1223/2009, allergènes, DLUO/PAO", volume: "30h" },
          { competence: "Techniques de vente conseil", contenu: "Méthode CAB, écoute active, argumentation, démonstration, traitement des objections, vente additionnelle", volume: "35h" },
          { competence: "Communication professionnelle et accueil", contenu: "Accueil physique et téléphonique, écoute, gestion des réclamations, fidélisation, CRM institut", volume: "20h" },
          { competence: "Gestion d'institut", contenu: "Gestion des stocks, encaissement, tenue de caisse, planification des rendez-vous, hygiène du point de vente", volume: "20h" },
          { competence: "Développement durable", contenu: "Éco-gestes, tri des déchets, produits bio et naturels, économie d'eau et d'énergie", volume: "10h" },
        ],
        modalitesEval: "Épreuve EP3 – Écrit (1h00) : étude d'une situation professionnelle en institut. Oral (30 min) : mise en situation de conseil et vente sur un produit ou service.",
      },
    ],
    secteursActivite: "Institut de beauté, spa, centre de bien-être, parfumerie, parapharmacie, grande distribution spécialisée, marques de cosmétiques, croisière, hôtellerie de luxe.",
    typesEmplois: ["Esthéticien(ne)", "Conseiller(ère) de vente en parfumerie/cosmétique", "Prothésiste ongulaire", "Maquilleur(se)", "Spa praticien(ne)", "Animateur(trice) beauté en grande distribution"],
    codesROME: ["D1208 – Soins esthétiques et corporels", "D1214 – Vente en habillement et accessoires"],
    voiesAcces: ["Formation initiale sous statut scolaire", "Apprentissage", "Formation professionnelle continue", "Candidature individuelle", "VAE"],
    dureeIndicative: "Formation continue : 600 à 1200h en centre + 12 semaines de PFMP. Format court professionnalisant : 42h (préparation accélérée à l'examen pour candidats déjà expérimentés). Apprentissage : 800h/an en CFA sur 2 ans.",
  },
  {
    code: "RS6702",
    intitule: "Développer son activité professionnelle grâce au marketing de contenus et aux réseaux sociaux",
    niveau: "Sans niveau spécifique",
    certificateur: "WEBMARKETING & CO'M",
    dateEnregistrement: "29/09/2023",
    dateEcheance: "29/09/2026",
    codeNSF: "320 – Spécialités plurivalentes de la communication et de l'information",
    formacodes: "46301 – Communication entreprise / 46205 – Réseau social / 46341 – Marketing digital / 34093 – Stratégie commerciale",
    resume: "La certification RS6702 atteste de la capacité du candidat à définir et déployer une stratégie de marketing de contenus et de réseaux sociaux pour développer la visibilité, l'audience et l'activité commerciale d'une entreprise ou d'un professionnel indépendant.",
    activitesVisees: "Élaboration d'une stratégie webmarketing, création de contenus digitaux (articles, visuels, vidéos), gestion de communautés sur les réseaux sociaux, mise en place de campagnes d'acquisition, analyse des performances et optimisation continue.",
    blocsCompetences: [
      {
        titre: "C1 – Définir une stratégie webmarketing",
        competences: [
          "Analyser le marché et la concurrence en ligne",
          "Définir les objectifs webmarketing (notoriété, trafic, leads, ventes)",
          "Identifier les personas et les parcours clients",
          "Élaborer un plan de communication digitale",
          "Choisir les canaux pertinents (SEO, SEA, réseaux sociaux, emailing)"
        ],
        matieres: [
          { competence: "Audit digital", contenu: "Analyse de la présence en ligne, benchmarking concurrentiel, analyse SWOT digitale, outils d'audit (SEMrush, Ubersuggest, SimilarWeb)", volume: "7h" },
          { competence: "Stratégie digitale", contenu: "Définition des objectifs SMART, tunnel de conversion, buyer personas, parcours client digital, plan d'action marketing", volume: "7h" }
        ],
        modalitesEval: "Étude de cas : élaboration d'une stratégie webmarketing complète pour un projet réel ou simulé, avec présentation orale et soutenance devant un jury professionnel."
      },
      {
        titre: "C2 – Créer du contenu digital professionnel",
        competences: [
          "Rédiger des contenus optimisés pour le web (SEO)",
          "Concevoir des visuels attractifs pour les réseaux sociaux",
          "Produire des contenus vidéo pour les plateformes digitales",
          "Adapter le contenu selon les plateformes (LinkedIn, Instagram, Facebook, TikTok)",
          "Mettre en place un calendrier éditorial"
        ],
        matieres: [
          { competence: "Rédaction web & SEO", contenu: "Techniques de rédaction web, optimisation SEO on-page, structure de contenu, balises HTML, mots-clés, méta-descriptions, outils (Yoast, Answer the Public)", volume: "7h" },
          { competence: "Création visuelle", contenu: "Design graphique pour le web, outils de création (Canva, Adobe Express), formats visuels par plateforme, charte graphique digitale, banques d'images", volume: "7h" },
          { competence: "Production vidéo", contenu: "Formats vidéo courts (Reels, TikTok, Shorts), scénarisation, tournage smartphone, montage basique (CapCut, InShot), sous-titrage", volume: "3h30" }
        ],
        modalitesEval: "Production d'un portefeuille de contenus : 3 articles optimisés SEO, 10 visuels réseaux sociaux, 2 vidéos courtes, accompagnés d'un calendrier éditorial sur 1 mois."
      },
      {
        titre: "C3 – Gérer les réseaux sociaux et développer une communauté",
        competences: [
          "Créer et optimiser des profils professionnels sur les réseaux sociaux",
          "Planifier et publier du contenu de manière régulière",
          "Animer une communauté en ligne et gérer les interactions",
          "Modérer les commentaires et gérer la e-réputation",
          "Utiliser les outils de programmation (Buffer, Hootsuite, Meta Business Suite)"
        ],
        matieres: [
          { competence: "Community management", contenu: "Stratégie communautaire, tonalité de marque, gestion des interactions, modération, gestion de crise, outils de veille (Mention, Google Alerts)", volume: "7h" },
          { competence: "Outils et programmation", contenu: "Planification de contenu, outils de scheduling, Meta Business Suite, LinkedIn Campaign Manager, analyse des meilleurs horaires de publication", volume: "3h30" }
        ],
        modalitesEval: "Mise en situation : gestion d'un compte professionnel sur 2 semaines avec création de contenu, planification, interaction communauté et rapport d'activité."
      },
      {
        titre: "C4 – Mettre en place une stratégie d'acquisition digitale",
        competences: [
          "Concevoir des tunnels de vente (landing pages, lead magnets, séquences email)",
          "Mettre en place des campagnes publicitaires (Facebook Ads, Google Ads)",
          "Créer des séquences d'email marketing (newsletters, automation)",
          "Optimiser les taux de conversion (CRO)",
          "Gérer un budget publicitaire"
        ],
        matieres: [
          { competence: "Publicité en ligne", contenu: "Facebook Ads Manager, Google Ads, ciblage d'audience, retargeting, A/B testing, budgétisation, pixels de conversion", volume: "7h" },
          { competence: "Email marketing & tunnel de vente", contenu: "Plateformes d'emailing (Mailchimp, Brevo), création de landing pages, lead magnets, séquences automatisées, segmentation, taux d'ouverture et de clic", volume: "7h" }
        ],
        modalitesEval: "Création d'un tunnel de vente complet avec landing page, lead magnet, séquence email automatisée et configuration d'une campagne publicitaire (budget simulé)."
      },
      {
        titre: "C5 – Analyser les performances et optimiser la stratégie",
        competences: [
          "Mettre en place des KPI pertinents",
          "Utiliser Google Analytics et les statistiques des réseaux sociaux",
          "Interpréter les données et rédiger des rapports de performance",
          "Proposer des actions correctives basées sur les données",
          "Effectuer une veille permanente sur les tendances digitales"
        ],
        matieres: [
          { competence: "Analytics & KPI", contenu: "Google Analytics 4, UTM, tableaux de bord, KPI (taux de conversion, coût par lead, ROI, engagement rate), data visualization", volume: "7h" },
          { competence: "Veille et optimisation", contenu: "Veille concurrentielle, veille technologique, tendances (IA, social commerce, short video), optimisation continue, rapports mensuels", volume: "3h30" }
        ],
        modalitesEval: "Analyse de données réelles : interprétation d'un dashboard Google Analytics, rédaction d'un rapport de performance avec recommandations d'optimisation."
      }
    ],
    secteursActivite: "Marketing digital, communication, commerce, entrepreneuriat, consulting, e-commerce, services aux entreprises",
    typesEmplois: ["Community manager", "Chargé(e) de communication digitale", "Responsable webmarketing", "Social media manager", "Content manager", "Entrepreneur / Freelance"],
    codesROME: ["E1101", "M1705", "E1103"],
    voiesAcces: ["Formation continue", "Formation professionnelle", "CPF"],
    dureeIndicative: "70 heures (10 jours)",
  },
  {
    code: "RNCP40800",
    intitule: "TP - Secrétaire assistant médico-administratif",
    niveau: "Niveau 4 (Bac)",
    certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
    dateEnregistrement: "19/06/2025",
    dateEcheance: "01/09/2030",
    codeNSF: "324 – Secrétariat, bureautique",
    formacodes: "35015 – Secrétariat assistanat médicosocial / 43421 – Accueil hôpital / 43401 – Dossier soin",
    resume: "Le secrétaire assistant médico-administratif est le premier interlocuteur du patient et travaille en étroite collaboration avec les professionnels de santé d'une structure médicale. Il assure l'accueil, la prise en charge administrative et financière du patient, la planification des activités des professionnels de santé, la transcription d'écrits médicaux et le suivi médico-administratif du dossier patient.",
    activitesVisees: "Accueil physique et téléphonique du patient, prise en charge administrative et financière, gestion des plannings et agendas des professionnels de santé, transmission d'informations administratives et médicales, suivi médico-administratif du dossier patient, transcription et mise en forme de documents médicaux, traitement des demandes d'accès au dossier médical. Le secrétaire assistant médico-administratif exerce dans le respect du secret professionnel, du secret médical, des règles de confidentialité et d'identitovigilance.",
    blocsCompetences: [
      {
        titre: "Assurer l'accueil du patient et les activités administratives courantes d'une structure médicale",
        competences: [
          "Accueillir, renseigner et orienter un patient",
          "Gérer les plannings et les agendas des professionnels de santé",
          "Réaliser la prise en charge administrative et financière du patient",
          "Transmettre par écrit des informations administratives et médicales à l'interne et à l'externe"
        ],
        matieres: [
          { competence: "Accueil patient", contenu: "Techniques d'accueil physique et téléphonique, gestion des situations difficiles, orientation du patient, communication adaptée, identitovigilance, respect du secret médical, gestion des urgences et des priorités", volume: "40h" },
          { competence: "Gestion des plannings", contenu: "Utilisation de logiciels de gestion de rendez-vous (Doctolib, etc.), planification des consultations et examens, gestion des annulations et reports, coordination multi-praticiens, optimisation des créneaux", volume: "30h" },
          { competence: "Prise en charge administrative et financière", contenu: "Collecte et vérification des documents (carte vitale, mutuelle, CMU), enregistrement dans le logiciel métier (ERP), création et mise à jour du dossier administratif, facturation des actes médicaux, télétransmission, gestion des impayés", volume: "50h" },
          { competence: "Transmission d'informations", contenu: "Rédaction de courriers administratifs et médicaux, comptes rendus, notes de service, utilisation de la messagerie sécurisée de santé (MSSanté), communication interne et externe, respect de la confidentialité", volume: "30h" }
        ],
        modalitesEval: "Mise en situation professionnelle écrite (1h) et orale (45 min) : accueil physique (10 min), accueil téléphonique (5 min), rédaction et transmission de documents, mise à jour d'agenda. Entretien technique (20 min). Durée totale : 2h05."
      },
      {
        titre: "Assister les professionnels de santé d'une structure médicale dans le suivi et la coordination du parcours du patient",
        competences: [
          "Assurer le suivi médico-administratif du dossier patient",
          "Transcrire, vérifier et mettre en forme des documents médicaux",
          "Renseigner sur l'accès au dossier médical du patient ou préparer les éléments"
        ],
        matieres: [
          { competence: "Suivi dossier patient", contenu: "Gestion du dossier patient informatisé (DPI), suivi des examens et résultats, coordination avec les services (imagerie, laboratoire, spécialistes), mise à jour des informations médicales, gestion des correspondances médicales, parcours de soins coordonnés", volume: "50h" },
          { competence: "Transcription médicale", contenu: "Terminologie médicale (anatomie, pathologies, spécialités), transcription de comptes rendus opératoires et de consultations, mise en forme selon les normes, vérification orthographique spécialisée, dictée numérique, utilisation de logiciels de reconnaissance vocale", volume: "60h" },
          { competence: "Accès au dossier médical", contenu: "Cadre réglementaire de l'accès au dossier médical (loi Kouchner), procédures de communication, délais légaux, préparation des éléments communicables, anonymisation si nécessaire, gestion des demandes (patient, ayant droit, médecin), archivage et conservation", volume: "25h" }
        ],
        modalitesEval: "Mise en situation professionnelle écrite (1h35) : analyse de situations, traitement de dossiers, production de documents. Entretien technique (10 min). Durée totale : 1h45."
      }
    ],
    secteursActivite: "Établissements publics et privés de santé (hôpitaux, centres hospitaliers spécialisés, cliniques), structures de ville (cabinets médicaux, maisons de santé, centres de santé, centres d'imagerie médicale, laboratoires d'analyses médicales)",
    typesEmplois: ["Secrétaire médical", "Secrétaire assistant médical", "Secrétaire administratif et médical", "Assistant médico-administratif"],
    codesROME: ["M1609"],
    voiesAcces: ["Contrat d'apprentissage", "Formation continue", "Contrat de professionnalisation", "VAE"],
    dureeIndicative: "285 heures (6 mois en alternance)",
  },
  {
    code: "RNCP36805",
    intitule: "TP - Secrétaire assistant médico-social",
    niveau: "Niveau 4 (Bac)",
    certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
    dateEnregistrement: "14/12/2017",
    dateEcheance: "01/09/2025",
    codeNSF: "324t – Saisie, mise en forme et communication des données",
    formacodes: "35015 – Secrétariat assistanat médicosocial / 35056 – Télésecrétariat / 43421 – Accueil hôpital / 43401 – Dossier soin",
    resume: "Le secrétaire assistant médico-social assure, au sein des structures sanitaires, médico-sociales ou sociales, l'accueil et la prise en charge des patients et des usagers, la planification des activités du service, le traitement et le suivi administratif des dossiers, la coordination des opérations liées au parcours des patients ou des usagers. Il exerce sous l'autorité d'un professionnel de santé ou d'un chef de service, dans le respect des procédures et de la réglementation en vigueur, en utilisant la terminologie et les techniques spécifiques au secteur.",
    activitesVisees: "Production de documents professionnels courants, communication écrite et orale, traçabilité et conservation des informations, accueil physique et téléphonique, planification des activités d'équipe, renseignement et orientation du public, gestion des rendez-vous patients/usagers, prise en charge médico-administrative et sociale, retranscription d'informations médicales ou sociales, suivi et mise à jour des dossiers, coordination des opérations du parcours patient/usager, élaboration de tableaux de suivi. Soumis au secret professionnel et médical, dans le respect de la loi relative aux droits des malades.",
    blocsCompetences: [
      {
        titre: "Assister une équipe dans la communication des informations et l'organisation des activités",
        competences: [
          "Produire des documents professionnels courants",
          "Communiquer des informations par écrit",
          "Assurer la traçabilité et la conservation des informations",
          "Accueillir un visiteur et transmettre des informations oralement",
          "Planifier et organiser les activités de l'équipe"
        ],
        matieres: [
          { competence: "Production de documents professionnels courants", contenu: "Saisie et présentation de documents professionnels (courriers, notes, comptes rendus), utilisation des applications bureautiques (traitement de texte, tableur, PréAO), respect de la charte graphique et des normes typographiques, règles orthographiques et grammaticales, vocabulaire technique du secteur sanitaire et social, contrôle de la production avant transmission", volume: "35h" },
          { competence: "Communication écrite professionnelle", contenu: "Rédaction d'écrits professionnels (mails, courriers, notes, comptes rendus, diaporamas), prise de notes, synthèse d'informations, recherche et exploitation d'informations fiables sur le web, choix du mode de transmission adapté, normes de communication professionnelle, règles de sécurité informatique et protection des données numériques", volume: "25h" },
          { competence: "Traçabilité et conservation des informations", contenu: "Conception et mise en œuvre d'un plan de classement, classement et archivage physiques et numériques, numérisation et nommage de documents, gestion électronique des documents (GED), sauvegarde des fichiers, dématérialisation, règles juridiques de conservation des documents, RGPD, sécurité et confidentialité des informations", volume: "20h" },
          { competence: "Accueil et transmission orale", contenu: "Accueil physique et téléphonique des visiteurs, traitement des appels sur différents canaux (téléphone, messagerie instantanée, visioconférence), filtrage et orientation, prise de messages, transmission des informations, gestion simultanée accueil/secrétariat, communication en anglais (phrases types, épeler noms/adresses), techniques de communication adaptées aux situations difficiles", volume: "30h" },
          { competence: "Planification et organisation des activités", contenu: "Gestion d'agendas partagés, planification de réunions pluridisciplinaires, coordination des emplois du temps, outils de planification collaborative, gestion des priorités et des urgences, organisation des déplacements professionnels, tableaux de bord d'activité, suivi des échéances", volume: "25h" }
        ],
        modalitesEval: "Mise en situation professionnelle : 2h20 (écrite 2h + orale 20 min avec accueil téléphonique 10 min incluant rédaction de message). Entretien technique : 20 min (classement, archivage, traçabilité, planification et organisation). Durée totale : 2h40."
      },
      {
        titre: "Assurer l'accueil et la prise en charge administrative du patient ou de l'usager",
        competences: [
          "Renseigner et orienter le public dans un service sanitaire, médico-social ou social",
          "Planifier et gérer les rendez-vous de patients ou d'usagers",
          "Assurer la prise en charge médico-administrative et sociale du patient ou de l'usager"
        ],
        matieres: [
          { competence: "Renseignement et orientation du public", contenu: "Accueil en milieu sanitaire, médico-social et social, évaluation des demandes avec discernement, orientation vers les services et professionnels compétents, connaissance de l'organisation hospitalière (pôles, services, parcours de soins), droits des usagers du système de santé, code de l'action sociale et des familles, gestion des situations d'urgence sociale, communication adaptée aux publics fragiles et en difficulté, gestion des situations conflictuelles, écoute active et assertivité", volume: "30h" },
          { competence: "Planification et gestion des rendez-vous", contenu: "Logiciels de planification de rendez-vous (Doctolib, logiciels hospitaliers), gestion des agendas des praticiens et intervenants, définition des délais et dates de rendez-vous selon la spécificité des demandes et la chronologie des actes/examens, évaluation de l'urgence, gestion du flux des appels et des demandes, continuité de service, procédures d'identification (identitovigilance), coordination multi-praticiens, centres d'appels et plateformes externalisées, reporting", volume: "25h" },
          { competence: "Prise en charge médico-administrative et sociale", contenu: "Constitution et vérification des dossiers patients/usagers, collecte des documents (carte vitale, mutuelle, CMU-C, AME), admission et sortie des patients, facturation (T2A, codage CCAM/NGAP/NABM, CIM), télétransmission des feuilles de soins électroniques, gestion des tiers payants, encaissement, gestion des impayés et relances, montage de dossiers d'aide financière (secteur social), numérisation, devis, tarification des soins, PMSI, parcours de soins coordonnés, règles d'identitovigilance, protection des données personnelles (CNIL)", volume: "40h" }
        ],
        modalitesEval: "Mise en situation professionnelle : 2h (écrite 1h15 + orale 45 min). Orale : accueil téléphonique 20 min (planification RDV + accueil) et face à face 25 min (orientation public + prise en charge médico-administrative). Entretien technique : 20 min (prise en charge administrative, compétences non évaluées). Durée totale : 2h20."
      },
      {
        titre: "Traiter les dossiers et coordonner les opérations liées au parcours du patient ou de l'usager",
        competences: [
          "Retranscrire des informations à caractère médical ou social",
          "Assurer le suivi et la mise à jour des dossiers de patients ou d'usagers",
          "Coordonner les opérations liées au parcours du patient ou de l'usager",
          "Élaborer et actualiser des tableaux de suivi dans un service sanitaire, médico-social ou social"
        ],
        matieres: [
          { competence: "Retranscription médicale et sociale", contenu: "Saisie et mise en forme de documents médicaux/sociaux (courriers, lettres de liaison, comptes rendus opératoires, rapports sociaux, certificats, prescriptions), outils de retranscription (dictaphone numérique, pédalier, casque audio), logiciels de reconnaissance vocale, terminologie médicale approfondie (anatomie, pathologies, pharmacologie, spécialités), vérification orthographique spécialisée, normes de présentation professionnelle, démarche qualité, validation par le professionnel de santé, transmission sécurisée (MSSanté)", volume: "50h" },
          { competence: "Suivi et mise à jour des dossiers", contenu: "Gestion du dossier patient informatisé (DPI), logiciels métier spécialisés (HM, Orbis, Crossway), mise à jour quotidienne des dossiers actifs, vérification de l'exactitude des données administratives, complétude et organisation des dossiers, numérisation et nommage des pièces, réception/tri/diffusion du courrier, archivage matérialisé et dématérialisé, délais légaux de conservation, traitement des demandes d'accès aux dossiers (loi Kouchner), interface avec prestataires d'archivage, traçabilité et identitovigilance", volume: "35h" },
          { competence: "Coordination du parcours patient/usager", contenu: "Identification et programmation des actions tout au long du parcours (consultation, examen, admission, hospitalisation, transfert, sortie), coordination avec les intervenants internes (médecins, soignants, services médico-techniques, TIM) et externes (médecins traitants, spécialistes, structures SSR/HAD/EHPAD), réservation de moyens (salles, blocs, matériels, transports), participation aux réunions pluridisciplinaires (synthèse, concertation), rédaction d'ordres du jour et comptes rendus, gestion des stocks de fournitures administratives, commandes", volume: "35h" },
          { competence: "Tableaux de suivi et indicateurs", contenu: "Création et actualisation de tableaux de bord (activité du service, taux d'occupation, délais d'attente, file active), indicateurs qualité, statistiques médicales (PMSI), tableur avancé (Excel/Calc : formules, TCD, graphiques), extraction et analyse de données, rapports d'activité pour les autorités de tutelle, suivi budgétaire (secteur social/médico-social), data visualization, démarche qualité et amélioration continue", volume: "20h" }
        ],
        modalitesEval: "Mise en situation professionnelle écrite : 3h (analyse de situations professionnelles, traitement de dossiers, production de documents dans le contexte d'une structure fictive sanitaire/médico-sociale/sociale). Entretien technique : 20 min (analyse des travaux 10 min + questionnement sur la coordination du parcours patient/usager 10 min). Durée totale : 3h20."
      }
    ],
    secteursActivite: "Secteur sanitaire (hôpitaux CH/CHR/CHU/CHRU/EPSM, établissements à but non lucratif, cliniques privées, cabinets médicaux/paramédicaux, maisons de santé pluridisciplinaires, centres d'imagerie, laboratoires d'analyses, SSR, médecine du travail, cabinets d'expertise), secteur médico-social (CMPP, CRP, EHPAD, ESAT, IME), secteur social (CCAS, CAF, MDPH, CHRS, MECS, associations d'entraide), télétravail en libéral ou sociétés de télésecrétariat",
    typesEmplois: ["Secrétaire médical", "Secrétaire médico-social", "Secrétaire social", "Assistant médico-administratif", "Assistant médical", "Secrétaire hospitalier", "Télésecrétaire médical"],
    codesROME: ["M1609"],
    voiesAcces: ["Contrat d'apprentissage", "Formation continue", "Contrat de professionnalisation", "VAE"],
    dureeIndicative: "700 heures (6 à 8 mois)",
  },
  {
    code: "RNCP35329",
    intitule: "TP - Enseignant de la conduite et de la sécurité routière (ECSR)",
    niveau: "Niveau 5 (Bac+2)",
    certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
    dateEnregistrement: "29/04/2021",
    dateEcheance: "28/04/2026",
    codeNSF: "311u – Conduite des véhicules, conduite des engins de manutention et de levage",
    formacodes: "31802 – Monitorat auto-école",
    resume: "L'enseignant de la conduite et de la sécurité routière contribue à la mise en œuvre de la politique de sécurité routière. Il prépare des actions de formation pour tous publics, dans le cadre du « continuum éducatif », en se conformant au Référentiel pour l'éducation à une mobilité citoyenne (REMC). Il anime ces actions dans le but de faire adopter aux apprenants un comportement respectueux des autres usagers de la route et de favoriser leur prise de conscience des enjeux du développement durable.",
    activitesVisees: "Il prépare des apprenants à la conduite d'un véhicule de catégorie B et BE, construit et anime des séances collectives de formation sur les règles du Code de la route et les facteurs de risques. Il assure des prestations de sensibilisation auprès de publics diversifiés (enfants, adolescents, conducteurs novices et expérimentés, salariés d'entreprise). Il représente l'établissement et contribue à son image de marque. Il participe à la gestion administrative et logistique des formations.",
    blocsCompetences: [
      {
        titre: "RNCP35329BC01 – Former des apprenants conducteurs par des actions individuelles et collectives, dans le respect des cadres réglementaires en vigueur",
        competences: [
          "Construire et préparer le scénario d'une séance individuelle ou collective de formation",
          "Animer une séance collective de formation à la sécurité routière",
          "Animer une séance individuelle ou collective de formation à la conduite d'un véhicule léger",
          "Évaluer le degré d'acquisition des compétences des apprenants",
          "Encadrer et faciliter l'intervention d'un tiers dans une situation d'apprentissage",
          "Repérer les difficultés d'apprentissage et essayer d'y remédier",
          "Apprécier la dynamique de l'environnement routier et en identifier les risques potentiels"
        ],
        matieres: [
          { competence: "Construire et préparer le scénario d'une séance individuelle ou collective de formation", contenu: "Identification des objectifs pédagogiques, choix des outils et méthodes, élaboration du scénario pédagogique, préparation des ressources matérielles, utilisation du REMC", volume: "80h" },
          { competence: "Animer une séance collective de formation à la sécurité routière", contenu: "Techniques d'animation de groupe, pédagogie active, gestion des dynamiques de groupe, utilisation de supports multimédias, Code de la route et réglementation", volume: "100h" },
          { competence: "Animer une séance individuelle ou collective de formation à la conduite d'un véhicule léger", contenu: "Pédagogie de la conduite accompagnée, apprentissage anticipé, conduite supervisée, progression en conduite, gestion du véhicule à double commande", volume: "200h" },
          { competence: "Évaluer le degré d'acquisition des compétences des apprenants", contenu: "Méthodes d'évaluation formative et sommative, grilles d'évaluation, livret d'apprentissage, analyse des acquis, préparation à l'examen du permis de conduire", volume: "60h" },
          { competence: "Encadrer et faciliter l'intervention d'un tiers dans une situation d'apprentissage", contenu: "Rôle de l'accompagnateur en AAC/conduite supervisée, rendez-vous pédagogiques, communication avec les tiers, consignes de sécurité", volume: "40h" },
          { competence: "Repérer les difficultés d'apprentissage et essayer d'y remédier", contenu: "Diagnostic des difficultés, stratégies de remédiation, adaptation pédagogique, psychologie de l'apprentissage, gestion du stress de l'apprenant", volume: "40h" },
          { competence: "Apprécier la dynamique de l'environnement routier et en identifier les risques potentiels", contenu: "Analyse des situations de conduite, anticipation des risques, éco-conduite, développement durable, accidentologie", volume: "40h" }
        ],
        modalitesEval: "Mise en situation professionnelle : animation d'une séance de formation en salle et d'une séance de conduite en circulation sur véhicule à double commande. Entretien technique. Dossier professionnel. Résultats des évaluations en cours de formation."
      },
      {
        titre: "RNCP35329BC02 – Sensibiliser l'ensemble des usagers de la route à l'adoption de comportements sûrs et respectueux de l'environnement",
        competences: [
          "Analyser une demande relative à une prestation de sensibilisation",
          "Construire et préparer une action de sensibilisation",
          "Animer une séance de sensibilisation à la sécurité routière, au respect des usagers et de l'environnement",
          "Analyser ses pratiques professionnelles afin de les faire évoluer"
        ],
        matieres: [
          { competence: "Analyser une demande relative à une prestation de sensibilisation", contenu: "Analyse du cahier des charges, identification du public cible, étude des besoins, contexte réglementaire, proposition commerciale", volume: "60h" },
          { competence: "Construire et préparer une action de sensibilisation", contenu: "Conception de supports pédagogiques, scénarisation de l'intervention, outils de communication, logistique de l'action, partenariats institutionnels", volume: "80h" },
          { competence: "Animer une séance de sensibilisation à la sécurité routière", contenu: "Techniques d'animation tous publics, interventions en milieu scolaire, sensibilisation en entreprise, prévention des risques routiers, enjeux du développement durable", volume: "120h" },
          { competence: "Analyser ses pratiques professionnelles afin de les faire évoluer", contenu: "Auto-évaluation, veille réglementaire et pédagogique, retour d'expérience, formation continue, évolution du métier d'enseignant de la conduite", volume: "90h" }
        ],
        modalitesEval: "Mise en situation professionnelle : préparation et animation d'une action de sensibilisation devant un public. Entretien technique portant sur l'analyse de la prestation. Dossier professionnel. Résultats des évaluations en cours de formation."
      }
    ],
    secteursActivite: "Établissements privés d'enseignement de la conduite et de la sécurité routière, établissements associatifs d'enseignement de la conduite et de la sécurité routière",
    typesEmplois: ["Enseignant de la conduite et de la sécurité routière", "Coordinateur d'enseignants", "Coordinateur pédagogique en auto-école", "Formateur sécurité routière en entreprise"],
    codesROME: ["K2110"],
    voiesAcces: ["Formation continue", "Contrat de professionnalisation", "Contrat d'apprentissage", "VAE"],
    dureeIndicative: "1190 heures (910h centre + 280h entreprise)",
  },
  {
    code: "RS6905",
    intitule: "VTest Business English – 4 Skills",
    niveau: "Certification (niveaux A2 à C2 CECRL)",
    certificateur: "EXASSESS (Burlington English)",
    dateEnregistrement: "20/07/2023",
    dateEcheance: "20/07/2026",
    codeNSF: "136 – Langues vivantes, civilisations étrangères et régionales",
    formacodes: "15214 – Anglais commercial / 15234 – Anglais appliqué",
    resume: "Le test VTest Business English – 4 Skills évalue les compétences professionnelles en anglais selon l'échelle du Cadre Européen commun de Référence pour les Langues (CECRL), du niveau A2 au niveau C2. Il est destiné aux personnes désireuses de certifier leurs compétences en anglais dans un contexte professionnel, pour les compétences de compréhension et d'expression, à l'oral ou à l'écrit. Le test est accessible en ligne via la plateforme VTEST.",
    activitesVisees: "Écouter et comprendre des énoncés, dialogues et monologues en anglais professionnel. Comprendre et analyser des textes, emails et articles. S'exprimer et communiquer à l'oral sur des sujets professionnels. Rédiger en anglais avec un vocabulaire et des tournures grammaticales appropriées. Identifier la problématique lors d'échanges ou dialogues. Mener un exposé, conduire une réunion, lire à haute voix, écouter et répéter, répondre à des questions ouvertes.",
    blocsCompetences: [
      {
        titre: "C1 – Compréhension orale (Listening)",
        competences: [
          "Écouter et comprendre un ensemble d'énoncés, de dialogues et de monologues en anglais professionnel",
          "Repérer, distinguer, identifier, sélectionner et apprécier des informations en anglais parlé",
          "Interpréter un ensemble varié d'affirmations, conversations et interrogations",
          "Identifier la problématique lors d'un échange ou d'un dialogue entre deux personnes",
        ],
        matieres: [
          { competence: "Compréhension de déclarations orales", contenu: "Écouter des déclarations enregistrées et répondre à des QCM. Repérer les informations clés dans des consignes de travail simples à complexes.", volume: "10h" },
          { competence: "Compréhension de dialogues courts et longs", contenu: "Écouter des dialogues en deux parties, répondre à des questions de compréhension. Identifier les idées principales et les nuances d'un discours complexe.", volume: "10h" },
          { competence: "Compréhension de monologues", contenu: "Écouter des monologues professionnels (présentations, exposés), répondre à des QCM sur les détails et les idées principales.", volume: "5h" },
          { competence: "Réponse construite orale", contenu: "Écouter un court dialogue/monologue et saisir des informations spécifiques mentionnées. Exercices de prise de notes et reformulation.", volume: "5h" },
        ],
        modalitesEval: "Évaluation en ligne adaptative sur la plateforme VTest. Déclarations – écouter et sélectionner (QCM 4 options). Réponse construite (saisie d'informations spécifiques). Dialogues courts et longs – écouter et sélectionner. Monologues – écouter et sélectionner. Le test se termine lorsque l'algorithme a suffisamment d'informations pour déterminer le niveau.",
      },
      {
        titre: "C2 – Compréhension écrite (Reading)",
        competences: [
          "Comprendre et analyser un ensemble de textes, emails et articles en anglais professionnel",
          "Repérer, distinguer, identifier, sélectionner et apprécier des informations écrites",
          "Comprendre dans un article ou document le sujet énoncé en sélectionnant les informations pertinentes",
          "Distinguer les nuances afin de répondre aux questions avec précision",
        ],
        matieres: [
          { competence: "Lecture de textes professionnels courts", contenu: "Notes, mémos, messages texte, courriels. Identifier les points essentiels et informations spécifiques.", volume: "8h" },
          { competence: "Lecture de documents longs", contenu: "Textes commerciaux, articles, rapports. Comprendre les éléments d'argumentation et identifier les détails y compris attitudes et opinions implicites.", volume: "8h" },
          { competence: "Vocabulaire et structures écrites", contenu: "Vocabulaire professionnel, faux-amis, connecteurs logiques, structures grammaticales complexes.", volume: "7h" },
          { competence: "Stratégies de lecture", contenu: "Skimming, scanning, lecture intensive. Repérer les informations pertinentes dans des documents variés.", volume: "7h" },
        ],
        modalitesEval: "Évaluation en ligne adaptative sur la plateforme VTest. Lire et sélectionner : QCM à 4 options sur des notes, mémos, emails, textes commerciaux et articles. Les questions testent les informations dans l'ordre de présentation. La difficulté augmente progressivement.",
      },
      {
        titre: "C3 – Expression orale (Speaking)",
        competences: [
          "S'exprimer et communiquer à l'oral en anglais professionnel",
          "Échanger, décrire, formuler, argumenter sur un ensemble de sujets professionnels",
          "Mener un exposé en présentant ses arguments de façon structurée",
          "Conduire une réunion ou un entretien en donnant des indications précises et détaillées",
        ],
        matieres: [
          { competence: "Lecture à haute voix", contenu: "Lire à haute voix 3 textes de longueur croissante. Travailler la prononciation, l'intonation et le rythme.", volume: "5h" },
          { competence: "Écoute et répétition", contenu: "Écouter puis répéter 6 énoncés de la longueur d'une phrase. Travailler la fluidité et la précision phonétique.", volume: "5h" },
          { competence: "Expression libre et argumentation", contenu: "Répondre à des questions ouvertes sur des sujets professionnels variés. Produire un discours clair, fluide et structuré.", volume: "10h" },
          { competence: "Présentations et réunions", contenu: "Mener un exposé, conduire une réunion, décrire objectifs et attendus. Argumenter avec nuance et précision.", volume: "10h" },
        ],
        modalitesEval: "Évaluation en ligne sur la plateforme VTest avec notation automatique par système vocal. 3 parties : Lecture à haute voix (3 textes), Écoute et répétition (6 énoncés), Questions ouvertes sur la fluidité. Évaluation sur : temps de production, qualité de la production, respect du sujet traité.",
      },
      {
        titre: "C4 – Expression écrite (Writing)",
        competences: [
          "Rédiger en anglais avec un vocabulaire et des tournures grammaticales appropriées",
          "Écrire, décrire, formuler, questionner, argumenter et structurer ses idées sur un sujet professionnel",
          "Rédiger un document préparatoire à une réunion, une revue de projet ou un retour d'expérience",
          "Rédiger un texte structuré en anglais sur un sujet professionnel précis",
        ],
        matieres: [
          { competence: "Rédaction d'emails et notes professionnels", contenu: "Répondre à des emails, rédiger des notes simples à complexes. Registres formel et semi-formel.", volume: "8h" },
          { competence: "Rédaction de documents élaborés", contenu: "Rapports techniques, analyses de marché, cahiers des charges, brochures commerciales. Structure et argumentation.", volume: "8h" },
          { competence: "Cohérence et cohésion textuelle", contenu: "Mots de liaison, connecteurs logiques, structuration des paragraphes, développement d'arguments.", volume: "7h" },
          { competence: "Grammaire et vocabulaire avancés", contenu: "Contrôle des formes grammaticales, vocabulaire exhaustif et précis, registre adapté au contexte.", volume: "7h" },
        ],
        modalitesEval: "Évaluation en ligne sur la plateforme VTest. Rédaction d'un essai libre en 30 minutes sur un sujet professionnel. Nombre de mots minimum selon le niveau : 80 mots (A2), 150 mots (B1/B2.1), 200 mots (B2.2+). Critères : respect du sujet et du temps, cohérence et cohésion, contrôle grammatical, qualité et exhaustivité du vocabulaire.",
      },
    ],
    secteursActivite: "Tous secteurs d'activité nécessitant des compétences en anglais professionnel",
    typesEmplois: ["Cadre international", "Commercial export", "Assistant de direction bilingue", "Chef de projet international", "Responsable achats internationaux", "Ingénieur en contexte international"],
    codesROME: ["M1204", "D1406", "M1607"],
    voiesAcces: ["Formation continue", "CPF", "Plan de développement des compétences"],
    dureeIndicative: "40 heures (6 jours)",
  },
  {
    code: "RNCP37274",
    intitule: "TP - Conseiller en insertion professionnelle",
    niveau: "Niveau 5 (Bac+2)",
    certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
    dateEnregistrement: "29/05/2023",
    dateEcheance: "29/05/2028",
    codeNSF: "332t – Travail social",
    formacodes: "44569 – Conseil insertion professionnelle / 44556 – Accompagnement vers emploi",
    resume: "Le conseiller en insertion professionnelle (CIP) accueille les personnes individuellement ou en groupe et facilite leur insertion professionnelle. Il analyse la demande, pose un diagnostic, informe et aide à l'orientation. Il accompagne la personne dans son parcours d'insertion socioprofessionnelle, il co-construit avec elle un projet professionnel et en planifie la mise en œuvre.",
    activitesVisees: "Le CIP accueille des personnes en recherche d'emploi ou en reconversion, les aide à identifier leurs compétences et leurs freins, co-construit des parcours d'insertion, mobilise des dispositifs de droit commun et d'insertion, développe des partenariats et anime des ateliers collectifs.",
    blocsCompetences: [
      {
        titre: "Accueillir pour analyser la demande des personnes et poser les bases d'un diagnostic partagé",
        competences: [
          "Informer une personne ou un groupe sur les ressources en matière d'insertion et les services dématérialisés",
          "Analyser la demande de la personne et poser les bases d'un diagnostic partagé",
          "Exercer une veille informationnelle, technique et prospective pour adapter son activité au public et au contexte",
          "Travailler en équipe, en réseau et dans un cadre partenarial pour optimiser la réponse aux besoins des personnes accueillies",
        ],
        matieres: [
          { competence: "Informer sur les ressources en matière d'insertion", contenu: "Connaissance des dispositifs d'insertion (Pôle emploi/France Travail, missions locales, PLIE, Cap emploi), aides sociales (RSA, ASS, ARE, prime d'activité), formation professionnelle (CPF, AIF, POEI, AFPR), services dématérialisés, droits des demandeurs d'emploi", volume: "42h" },
          { competence: "Analyser la demande et poser un diagnostic partagé", contenu: "Techniques d'entretien (non-directif, semi-directif, directif), écoute active, reformulation, grilles d'analyse des besoins, freins périphériques à l'emploi (logement, santé, mobilité, garde d'enfants), posture professionnelle du CIP", volume: "56h" },
          { competence: "Exercer une veille informationnelle et prospective", contenu: "Sources d'information (DARES, INSEE, Pôle emploi, CARIF-OREF), marché du travail local, évolutions réglementaires, veille sectorielle, outils de veille (alertes, flux RSS, réseaux professionnels)", volume: "28h" },
          { competence: "Travailler en équipe, en réseau et en partenariat", contenu: "Cartographie des acteurs de l'insertion, partenariats institutionnels, coordination pluridisciplinaire, techniques de communication professionnelle, outils collaboratifs, secret professionnel et éthique", volume: "35h" },
        ],
        modalitesEval: "Mise en situation professionnelle (45 min) : simulation d'un entretien d'accueil. Dossier professionnel avec annexes. Entretien technique (30 min). Questionnement à partir de productions (1h). Durée totale : 2h15.",
      },
      {
        titre: "Accompagner les personnes dans leur parcours d'insertion sociale et professionnelle",
        competences: [
          "Contractualiser et conduire un projet d'insertion professionnelle",
          "Accompagner la réalisation du projet d'insertion professionnelle",
          "Concevoir, préparer et animer des ateliers thématiques favorisant l'insertion professionnelle",
          "Préparer et animer des ateliers thématiques favorisant l'insertion",
        ],
        matieres: [
          { competence: "Contractualiser et conduire un projet d'insertion", contenu: "Élaboration du projet professionnel (bilan de compétences, portefeuille de compétences, ADVP, test d'intérêts professionnels), contrat d'engagement réciproque, plan d'action individualisé, suivi et évaluation de parcours", volume: "63h" },
          { competence: "Accompagner la réalisation du projet", contenu: "Techniques de recherche d'emploi (CV, lettre de motivation, entretien d'embauche, réseaux sociaux professionnels), immersions professionnelles (PMSMP), formation qualifiante, création d'entreprise, accompagnement des transitions professionnelles", volume: "56h" },
          { competence: "Concevoir et animer des ateliers thématiques", contenu: "Ingénierie pédagogique (objectifs, méthodes, supports), animation de groupe (techniques participatives, gestion de la dynamique de groupe), ateliers TRE, ateliers numériques, ateliers confiance en soi, évaluation des ateliers", volume: "49h" },
          { competence: "Préparer et animer des ateliers d'insertion", contenu: "Ateliers CV et lettre de motivation, simulation d'entretien d'embauche, ateliers mobilité, ateliers savoirs de base, ateliers orientation professionnelle, outils numériques pour la recherche d'emploi", volume: "42h" },
        ],
        modalitesEval: "Mise en situation professionnelle (1h) : conduite d'un entretien d'accompagnement. Dossier professionnel. Entretien technique (30 min). Questionnement à partir de productions (1h15). Durée totale : 2h45.",
      },
      {
        titre: "Mettre en œuvre une offre de services auprès des employeurs pour favoriser l'insertion professionnelle",
        competences: [
          "Déployer, dans une démarche projet, des actions de prospection avec les employeurs du territoire pour favoriser l'insertion professionnelle",
          "Apporter un appui technique aux employeurs en matière de recrutement",
          "Faciliter l'intégration et le maintien du salarié dans son environnement professionnel",
          "Inscrire ses actes professionnels dans une démarche de développement durable et inclusive",
        ],
        matieres: [
          { competence: "Déployer des actions de prospection employeurs", contenu: "Prospection commerciale en insertion (phoning, mailing, visites entreprises), argumentaire de l'offre de services, connaissance du tissu économique local, partenariats entreprises, clauses sociales dans les marchés publics", volume: "42h" },
          { competence: "Apporter un appui technique au recrutement", contenu: "Analyse de poste, rédaction et diffusion d'offres d'emploi, présélection de candidats, méthode de recrutement par simulation (MRS), job dating, forums emploi, aides à l'embauche (contrats aidés, alternance)", volume: "35h" },
          { competence: "Faciliter l'intégration et le maintien en emploi", contenu: "Accompagnement post-placement, médiation employeur-salarié, aménagement de poste, prévention de la désinsertion professionnelle, suivi en emploi, bilan à 3 et 6 mois", volume: "28h" },
          { competence: "Inscrire ses actes dans une démarche durable et inclusive", contenu: "RSE et insertion, non-discrimination à l'embauche, diversité et inclusion, handicap et emploi, égalité professionnelle, développement durable dans l'accompagnement", volume: "21h" },
        ],
        modalitesEval: "Mise en situation professionnelle (45 min) : simulation d'un entretien de prospection employeur. Dossier professionnel. Entretien technique (30 min). Questionnement à partir de productions (45 min). Durée totale : 2h.",
      },
    ],
    secteursActivite: "Insertion sociale et professionnelle, emploi, formation, action sociale",
    typesEmplois: ["Conseiller en insertion professionnelle", "Conseiller emploi formation", "Chargé d'accompagnement social et professionnel", "Chargé de relation entreprise", "Conseiller à l'emploi", "Conseiller de mission locale"],
    codesROME: ["K1801", "K1207"],
    voiesAcces: ["Après un parcours de formation continue", "En contrat d'apprentissage", "Par expérience (VAE)"],
    dureeIndicative: "497h",
  },
  {
    code: "RS5992",
    intitule: "Réaliser des soins socio-esthétiques",
    niveau: "Sans niveau spécifique",
    certificateur: "PARIS BEAUTY ACADEMY",
    dateEnregistrement: "22/04/2022",
    dateEcheance: "22/04/2025",
    codeNSF: "336 – Coiffure, esthétique",
    formacodes: "42040 – Esthétique soin corporel / 44028 – Aide médico-sociale",
    resume: "Cette certification permet aux titulaires d'acquérir un ensemble de soins et de conseils socio-esthétiques adaptés aux besoins des publics en situation de fragilité (handicap, maladie, isolement, vieillissement).",
    activitesVisees: "Analyse de la situation de personnes fragilisées. Élaboration de protocoles de soins adaptés. Accueil bienveillant et recueil du consentement. Réalisation de soins d'entretien corporel et d'embellissement adaptés. Pratique de massages de bien-être adaptés. Conseil en image de soi. Transmission de techniques d'auto-soin. Évaluation des interventions. Transmission à l'équipe pluridisciplinaire. Conception et animation d'ateliers socio-esthétiques.",
    blocsCompetences: [
      {
        titre: "Analyser et concevoir l'intervention socio-esthétique",
        competences: [
          "C1 – Analyser la situation d'une personne fragilisée en tenant compte du contexte d'intervention, du projet d'établissement et des problématiques corporelles et relationnelles",
          "C2 – Élaborer un protocole de soins adaptés à partir du diagnostic établi, des objectifs visés et des aspects biologiques, psychologiques et sociaux",
        ],
        matieres: [
          { competence: "C1 – Analyse de situation", contenu: "Contexte d'intervention (oncologie, gériatrie, insertion), projet d'établissement, diagnostic socio-esthétique, problématiques corporelles et relationnelles", volume: "8h" },
          { competence: "C2 – Protocole de soins", contenu: "Diagnostic cutané et des phanères, tensions musculaires, image de soi, estime de soi, schéma corporel, recommandations pluridisciplinaires", volume: "6h" },
        ],
        modalitesEval: "Étude de cas écrite (30 min) + entretien oral avec le jury (20 min) portant sur l'analyse de situation et l'élaboration du protocole de soins.",
      },
      {
        titre: "Réaliser des soins socio-esthétiques adaptés",
        competences: [
          "C3 – Accueillir la personne en adoptant une attitude d'écoute et de bienveillance",
          "C4 – Informer la personne du déroulement de la séance afin d'obtenir son consentement",
          "C5 – Réaliser des soins d'entretien corporel et d'embellissement adaptés aux peaux fragilisées",
          "C6 – Pratiquer des massages de bien-être contenants et relaxants adaptés",
          "C7 – Conseiller la personne sur la mise en valeur de son image personnelle",
          "C8 – Expliquer des techniques d'auto-soin pour accompagner la personne dans son autonomie",
        ],
        matieres: [
          { competence: "C3-C4 – Accueil et consentement", contenu: "Communication verbale et non-verbale, écoute active, relation d'aide, consentement éclairé", volume: "4h" },
          { competence: "C5 – Soins d'entretien", contenu: "Hygiène, sécurité, soins cutanés, phanères, produits dermo-cosmétiques pour peaux fragilisées", volume: "8h" },
          { competence: "C6 – Massages adaptés", contenu: "Gestuelle adaptée, manœuvres relaxantes, limites corporelles, adaptations aux fragilités", volume: "8h" },
          { competence: "C7-C8 – Image et auto-soin", contenu: "Maquillage correcteur, morphologie, couleurs, prothèses, transmission des gestes d'auto-soin", volume: "6h" },
        ],
        modalitesEval: "Mise en situation professionnelle reconstituée (1h15) : prise en charge (C3-C4), soins adaptés (C5-C6), conseils en image (C7), guidage auto-soin (C8). Analyse avec le jury (15 min).",
      },
      {
        titre: "Évaluer et transmettre – Concevoir des ateliers",
        competences: [
          "C9 – Évaluer le déroulement du soin socio-esthétique",
          "C10 – Transmettre à l'équipe pluridisciplinaire les informations liées aux séances",
          "C11 – Concevoir des ateliers de soins socio-esthétiques",
        ],
        matieres: [
          { competence: "C9 – Évaluation du soin", contenu: "Critères d'évaluation, entretien, observation, identification des améliorations", volume: "4h" },
          { competence: "C10 – Transmission", contenu: "Synthèse, écrits professionnels, continuité des soins, communication pluridisciplinaire", volume: "4h" },
          { competence: "C11 – Ateliers collectifs", contenu: "Conception d'atelier, thématique, objectifs, fiche technique, méthodes et outils d'animation", volume: "4h" },
        ],
        modalitesEval: "Étude de cas (1h30) : production d'une fiche technique d'atelier socio-esthétique.",
      },
    ],
    secteursActivite: "Sanitaire, médico-social, social, médical, paramédical",
    typesEmplois: ["Socio-esthéticien(ne)", "Esthéticien(ne) en milieu hospitalier", "Esthéticien(ne) en EHPAD", "Animateur(trice) d'ateliers socio-esthétiques"],
    codesROME: ["D1208", "K1302"],
    voiesAcces: ["Après un parcours de formation continue", "Par expérience (VAE)"],
    dureeIndicative: "52h",
  },
  {
    code: "RS5637",
    intitule: "Conduite d'une voiture de transport avec chauffeur (VTC)",
    niveau: "Sans niveau spécifique",
    certificateur: "CHAMBRE DES MÉTIERS ET DE L'ARTISANAT (CMA France)",
    dateEnregistrement: "20/12/2021",
    dateEcheance: "31/12/2026",
    codeNSF: "311 – Transports, manutention, magasinage",
    formacodes: "31845 – Conduite voiture transport avec chauffeur / 31854 – Transport personne",
    resume: "L'examen VTC vise à habiliter les candidats à exercer la profession de chauffeur de voiture de transport avec chauffeur. Il évalue les compétences réglementaires, sécuritaires, linguistiques, commerciales et de gestion d'entreprise nécessaires à l'exercice de l'activité, conformément à l'arrêté du 11 août 2017 modifié.",
    activitesVisees: "Le titulaire de la carte professionnelle VTC assure le transport de personnes à titre onéreux avec un véhicule de moins de 10 places. Il accueille la clientèle, sécurise le déplacement, gère sa relation commerciale, facture la prestation, tient sa comptabilité, respecte la réglementation T3P (transport public particulier de personnes) et le Code de la route.",
    blocsCompetences: [
      {
        titre: "Épreuves communes T3P (Taxi, VTC, Voitures de petite remise)",
        competences: [
          "Maîtriser la réglementation des transports publics particuliers de personnes (T3P)",
          "Gérer une entreprise de VTC (statut juridique, fiscalité, comptabilité)",
          "Appliquer la réglementation routière (Code de la route, sécurité)",
          "Pratiquer la sécurité et le secourisme adapté au transport de personnes",
          "Communiquer en français à l'oral et à l'écrit avec la clientèle",
        ],
        matieres: [
          { competence: "Réglementation T3P", contenu: "Loi Thévenoud, décret 2017-483, arrêté 11/08/2017, distinction Taxi/VTC, registre VTC, carte professionnelle, signalétique macaron, contrôles, sanctions", volume: "14h" },
          { competence: "Gestion d'entreprise VTC", contenu: "Statuts juridiques (micro-entrepreneur, EURL, SASU), URSSAF, TVA, comptabilité simplifiée, assurance RC pro, prévoyance, fiscalité", volume: "14h" },
          { competence: "Sécurité routière", contenu: "Code de la route, conduite préventive, gestion fatigue, vitesse, alcool/stupéfiants, distances de sécurité, éco-conduite", volume: "10h" },
          { competence: "Sécurité et secourisme", contenu: "PSC1, gestes de premiers secours, gestion d'accident, équipements de sécurité du véhicule, alerte des secours", volume: "7h" },
          { competence: "Français à l'oral et à l'écrit", contenu: "Compréhension orale/écrite, expression orale, rédaction professionnelle (facture, courriel client), communication interculturelle", volume: "7h" },
        ],
        modalitesEval: "Examens écrits (QCM ou questions à réponse courte) – durée totale 3h30. Note ≥ 10/20 par épreuve, sans note éliminatoire (< 6/20).",
      },
      {
        titre: "Épreuves spécifiques VTC",
        competences: [
          "Maîtriser la réglementation spécifique à l'activité VTC",
          "Développer la relation client et l'activité commerciale d'un VTC",
        ],
        matieres: [
          { competence: "Réglementation VTC", contenu: "Obligations spécifiques VTC (réservation préalable, retour à la base, interdiction de la maraude, tarification libre), Code des transports articles L3122-1 et suivants", volume: "7h" },
          { competence: "Développement commercial VTC", contenu: "Plateformes de réservation (Uber, Bolt, Heetch, Marcel), tarification (course, kilométrage, attente), facturation, fidélisation, gestion des avis client, image de marque", volume: "7h" },
        ],
        modalitesEval: "Examens écrits (QCM) – durée 1h00. Note ≥ 10/20 par épreuve.",
      },
      {
        titre: "Épreuve d'admission – Conduite et accueil clientèle",
        competences: [
          "Conduire un véhicule de transport de personnes en sécurité et confort",
          "Accueillir et prendre en charge un client dans des conditions professionnelles",
        ],
        matieres: [
          { competence: "Conduite professionnelle VTC", contenu: "Conduite souple et confortable, anticipation, itinéraires (GPS, applications), gestion du stress, respect du Code de la route en situation réelle", volume: "10h pratique" },
          { competence: "Accueil et prise en charge client", contenu: "Tenue professionnelle, accueil verbal et non verbal, aide aux bagages, gestion des demandes spéciales, confidentialité, paiement, remise de facture", volume: "5h pratique" },
        ],
        modalitesEval: "Épreuve pratique de conduite et d'accueil – durée 1h00. Évaluation par un examinateur agréé sur grille critériée. Réussite : aucune erreur éliminatoire + note ≥ 12/20.",
      },
    ],
    secteursActivite: "Transport public particulier de personnes (T3P) – Voitures de Transport avec Chauffeur (VTC) – Plateformes numériques de mise en relation (Uber, Bolt, Heetch, Marcel, Allocab) – Sociétés de transport haut de gamme – Conciergerie privée",
    typesEmplois: ["Chauffeur VTC indépendant", "Chauffeur VTC salarié", "Capacitaire VTC (gérant d'exploitation)", "Conducteur de transport de personnes (T3P)"],
    codesROME: ["N4102 – Conduite de transport de particuliers"],
    voiesAcces: ["Après un parcours de formation continue auprès d'un organisme habilité par la CMA France", "Inscription libre à l'examen via le site de la CMA"],
    dureeIndicative: "140h (épreuves communes + spécifiques + pratique)",
  },
  {
    code: "RNCP40990",
    intitule: "TP - Gestionnaire des opérations de transport routier de marchandises",
    niveau: "Niveau 5 (Bac+2)",
    certificateur: "MINISTÈRE DU TRAVAIL, DE LA SANTÉ, DES SOLIDARITÉS ET DES FAMILLES",
    dateEnregistrement: "14/06/2025",
    dateEcheance: "24/08/2030",
    codeNSF: "311n – Études et projets d'organisation de transit de biens ou de personnes",
    formacodes: "31827 / 31856 / 31822 / 31895 / 31839 – Transport routier de marchandises, exploitation, affrètement",
    resume: "Le Gestionnaire des opérations de transport routier de marchandises (GOTRM, sigle TP-01329, millésime 03, arrêté du 03/06/2025 publié au JO du 14/06/2025) conçoit, organise, met en œuvre et pilote les prestations de transport routier de marchandises jusqu'à la clôture des dossiers. Il pilote les trafics réguliers sous contrat de sous-traitance et optimise l'ensemble des moyens humains, matériels et financiers liés à l'activité de transport. Le titre procure par équivalence l'attestation de capacité professionnelle en transport routier de marchandises (>3,5 t) et de commissionnaire de transport.",
    activitesVisees: "Étudier la faisabilité des demandes de transport (y compris affrétées), tarifer et formaliser les propositions techniques. Affecter, affréter et planifier les moyens. Encadrer une équipe de conducteurs dans le respect de la réglementation sociale (RSE 561/2006, AETR, temps de conduite/repos). Coordonner l'exécution, renseigner les tableaux de suivi qualité-rentabilité. Négocier et contractualiser les opérations sous-traitées. Superviser traction, groupage, dégroupage, camionnage. Assurer le SAV (litiges, avaries, manquants). Animer et superviser le personnel exploitation. Reconstituer les indicateurs de performance et préconiser des mesures correctives.",
    blocsCompetences: [
      {
        titre: "CCP1 – Concevoir, organiser, mettre en œuvre et piloter des prestations de transport routier de marchandises jusqu'à la clôture des dossiers",
        competences: [
          "Étudier la faisabilité des demandes de transport, y compris affrétées, les tarifer et transmettre par écrit une proposition technique détaillée au donneur d'ordres",
          "Affecter, affréter et planifier les moyens adaptés à la réalisation des opérations de transport routier de marchandises",
          "Encadrer au quotidien une équipe de conducteurs dans le respect des réglementations en vigueur",
          "Coordonner l'exécution de chaque opération de transport, renseigner les tableaux de suivi et contrôler le respect des objectifs qualité et de rentabilité fixés par l'entreprise",
        ],
        matieres: [
          { competence: "Étude de faisabilité et tarification", contenu: "Cahier des charges client, contraintes réglementaires (Code des transports, ADR, ATP, conventions internationales CMR/TIR), méthodes de calcul de prix de revient kilométrique (PRK), grilles tarifaires, indices CNR, formalisation de la proposition commerciale conforme au code des transports", volume: "60h" },
          { competence: "Affectation, affrètement et planification", contenu: "Choix des moyens humains et matériels, sélection et contrôle administratif des sous-traitants (licence, attestation de capacité, assurance RC), bourses de fret (B2P, Teleroute, Wtransnet), TMS (Akanea, Shippeo, Trans-iX), planning d'exploitation, prise en compte des situations de handicap", volume: "70h" },
          { competence: "Encadrement d'équipe de conducteurs", contenu: "Réglementation sociale européenne (R(CE) 561/2006), AETR, accord 35h transport, lecture des chronotachygraphes numériques, plans de marche, déclaration des infractions, communication managériale, gestion des conflits", volume: "60h" },
          { competence: "Coordination et clôture des dossiers", contenu: "Suivi temps réel des opérations, gestion des aléas (panne, accident, marchandises non prêtes, refus livraison), réserves CMR, indicateurs qualité (taux de service, OTIF), indicateurs de rentabilité, alertes hiérarchie", volume: "50h" },
        ],
        modalitesEval: "Mise en situation professionnelle (1ère partie – 5h00) : dossier technique sous Word® + Excel® sur poste informatique, sans annotation jury. Entretien technique (1h00, dont 20 min de préparation hors décompte). Questionnement à partir de production(s) (30 min) basé sur un document de 8 à 12 pages (10 000 à 17 000 caractères) rédigé en amont par le candidat à partir d'une période en entreprise de 280h minimum, décrivant une opération de rechargement, un aléa et une situation de litige.",
      },
      {
        titre: "CCP2 – Piloter les trafics réguliers sous contrat de sous-traitance",
        competences: [
          "Négocier et contractualiser les opérations de transport régulièrement sous-traitées",
          "Superviser les opérations de traction, groupage, dégroupage ou camionnage",
          "Assurer le service après-vente des opérations de livraisons et de retours de marchandises",
        ],
        matieres: [
          { competence: "Négociation et contractualisation sous-traitance", contenu: "Contrat-type sous-traitance transport (décret du 26/12/2017), clauses tarifaires et indexation gazole, négociation B2B, due diligence, plan de transport régulier, KPI contractuels", volume: "55h" },
          { competence: "Supervision traction / groupage / dégroupage / camionnage", contenu: "Organisation des hubs et plateformes de messagerie, optimisation des tournées (logiciels de tournée type ORTEC, PTV, OptimoRoute), suivi temps réel (géolocalisation), gestion des écarts plan/réel", volume: "55h" },
          { competence: "Service après-vente transport", contenu: "Traitement des litiges (avaries, manquants, retards), procédures de réclamation, expertise contradictoire, indemnisations (Convention CMR, contrat-type général), satisfaction client, fidélisation B2B", volume: "40h" },
        ],
        modalitesEval: "Mise en situation professionnelle (2ème partie – 5h00) sur poste informatique. Entretien technique (1h00) portant notamment sur le SAV et la qualité de service.",
      },
      {
        titre: "CCP3 – Optimiser l'ensemble des moyens liés à l'activité de transport",
        competences: [
          "Animer et superviser l'activité du personnel du service exploitation",
          "Reconstituer les indicateurs de performance de l'activité globale et, si besoin, préconiser des mesures correctives",
        ],
        matieres: [
          { competence: "Animation et supervision de l'exploitation", contenu: "Management d'équipe exploitation, conduite de réunion, briefings/débriefings, plan de formation interne, entretiens professionnels, prévention des RPS dans le secteur transport", volume: "45h" },
          { competence: "Indicateurs de performance et mesures correctives", contenu: "Tableau de bord exploitation (km/litre, taux de remplissage, taux de retour à vide, productivité conducteur, marge brute par client), reporting direction, plans d'actions correctives, démarche d'amélioration continue (PDCA, 5 pourquoi)", volume: "50h" },
        ],
        modalitesEval: "Mise en situation professionnelle (intégrée à la 2ème partie). Entretien technique. Entretien final (30 min) avec le jury sur la culture professionnelle, le rôle et la fonction de gestionnaire des opérations de transport.",
      },
    ],
    secteursActivite: "Entreprises de transport public routier de marchandises et commissionnaires de transport. Entreprises industrielles et commerciales avec activité de transport intégré. Logistique. Messagerie, lot, vrac, température dirigée, TMD (transport de matières dangereuses).",
    typesEmplois: [
      "Exploitant en transport routier de marchandises",
      "Technicien d'exploitation en transport routier de marchandises",
      "Agent / Assistant d'exploitation en transport routier de marchandises",
      "Affréteur transport routier / Affréteur transport international",
      "Chef de service affrètement",
      "Technicien de planning – Dispatcheur / Répartiteur",
      "Responsable camionnage / Chef de service camionnage",
      "Responsable d'exploitation messagerie",
      "Chef d'agence transport routier de marchandises",
      "Chef de trafic messagerie / Responsable d'agence messagerie",
      "Responsable opérationnel / d'exploitation en transport routier de marchandises",
      "Gestionnaire de transport routier de marchandises",
      "Employé / Responsable du Service Après-Vente (SAV) transport",
      "Employé du service litiges",
    ],
    codesROME: [
      "N1207 – Chef / Cheffe de groupe affrètement",
      "N4203 – Agent d'intervention technique d'exploitation des transports routiers de marchandises",
      "N4201 – Responsable d'agence transport routier de marchandises",
      "N1201 – Affréteur / Affréteuse",
    ],
    voiesAcces: [
      "Parcours continu de formation (avec période en entreprise obligatoire de 280h minimum)",
      "Contrat d'apprentissage ou de professionnalisation",
      "Validation des Acquis de l'Expérience (VAE)",
      "Capitalisation des 3 CCP",
    ],
    dureeIndicative: "Session du titre : 12h00 (Mise en situation 10h en 2 jours + Entretien technique 1h + Questionnement 30 min + Entretien final 30 min). Parcours de formation : environ 485h en centre + 280h minimum en entreprise.",
  },
  {
    code: "RNCP40995",
    intitule: "CAP - Conducteur routier de marchandises (options Livraisons de proximité et Livraisons longue distance)",
    niveau: "Niveau 3 (CAP)",
    certificateur: "MINISTÈRE DE L'ÉDUCATION NATIONALE ET DE LA JEUNESSE",
    dateEnregistrement: "01/09/2025",
    dateEcheance: "31/08/2030",
    codeNSF: "311 – Transports, manutention, magasinage",
    formacodes: "31807 – Livraison",
    resume: "Le titulaire du CAP « Conducteur routier de marchandises » est un professionnel qui intervient dans des entreprises pour compte d'autrui ou compte propre (marchandises générales, messagerie, lots partiels et lots complets) à l'aide de véhicules du groupe lourd. Il utilise des véhicules « porteurs » (permis C – option Livraisons de proximité) ou des ensembles articulés (permis CE – option Livraisons longue distance). La formation inclut la préparation et le passage du permis C ou CE ainsi que la CQC. Son activité consiste à préparer le transport, réaliser les opérations de chargement/déchargement, réaliser la livraison et clôturer l'opération de transport, en intégrant les impératifs d'hygiène-santé-sécurité, de respect de l'environnement (écoconduite, gestion des déchets), de coûts/qualité/délais et de veille réglementaire.",
    activitesVisees: "Préparation de l'opération de transport : collecte et vérification des documents (conducteur, véhicule, marchandises), vérification de l'adéquation du véhicule avec la marchandise, préparation du plan de chargement, ordonnancement de la tournée (proximité) ou préparation de l'itinéraire (longue distance), planification des temps de repos. Réalisation du transport en toute sécurité : participation/réalisation des opérations de chargement, contrôle et arrimage de la marchandise, conduite rationnelle et éco-conduite, exploitation des instruments de bord (chronotachygraphe, GPS, outils embarqués), réalisation de la livraison, utilisation des matériels de manutention (catégorie 1A et 3 en longue distance), gestion des supports de charge. Application des procédures : prévention et traitement des incidents/accidents, communication citoyenne et professionnelle, préservation de la sûreté des biens (aire de stationnement, vérification d'intrusions). Préservation de la santé et de l'environnement : analyse des risques professionnels, hygiène de vie, gestion des rebuts et déchets. Clôture de l'opération de transport : restitution des documents et du véhicule, compte rendu aux services compétents.",
    blocsCompetences: [
      {
        titre: "BC01 – Préparer et clôturer l'opération de transport routier (option Livraisons de proximité)",
        competences: [
          "Identifier les contraintes de l'opération de transport",
          "Vérifier l'adéquation du véhicule avec les marchandises à transporter",
          "Identifier les dysfonctionnements liés au véhicule",
          "Respecter et adapter les itinéraires",
          "Établir le plan de chargement",
          "Planifier ses temps de conduite et de repos",
          "Renseigner et restituer les documents relatifs à son activité",
          "Restituer le véhicule et le préparer pour une prochaine mission",
          "Rendre compte aux services compétents de l'opération de transport",
        ],
        matieres: [
          { competence: "Documents de transport et réglementation", contenu: "Lettre de voiture CMR, ordre de mission, bons de livraison, documents douaniers, documents conducteur (permis C, CQC, carte conducteur chronotachygraphe), documents véhicule (carte grise, attestation d'assurance, contrôle technique, visite Mines)", volume: "35h" },
          { competence: "Adéquation véhicule / marchandise", contenu: "PTAC, PTRA, charge utile, gabarit, typologie des marchandises (sèches, frais, dangereuses ADR classe 1 à 9), contraintes d'accès urbain (ZFE, Crit'Air)", volume: "28h" },
          { competence: "Plan de chargement et tournée", contenu: "Répartition des charges, arrimage, ordonnancement de tournée journalière, optimisation (plus court chemin, plages horaires clients), cartographie numérique et GPS poids lourds", volume: "42h" },
          { competence: "RSE, AETR et temps de conduite", contenu: "Règlement (CE) 561/2006, accord AETR, chronotachygraphe numérique et intelligent (2e génération), pauses 45 min, repos journalier/hebdomadaire, infractions et sanctions", volume: "35h" },
          { competence: "Clôture et compte rendu", contenu: "Retour documents, procédures d'exploitation, transmission d'informations (anomalies, incidents, litiges), remise en état du véhicule", volume: "21h" },
        ],
        modalitesEval: "Contrôle en Cours de Formation (CCF) en établissement habilité, ou épreuve ponctuelle pratique, écrite et orale pour les candidats hors CCF et VAE.",
      },
      {
        titre: "BC02 – Préparer et clôturer l'opération de transport routier (option Livraisons longue distance)",
        competences: [
          "Identifier les contraintes de l'opération de transport",
          "Vérifier l'adéquation du véhicule avec les marchandises à transporter",
          "Identifier les dysfonctionnements liés au véhicule",
          "Respecter et adapter les itinéraires",
          "Établir le plan de chargement",
          "Planifier et gérer ses temps de conduite et de repos en fonction des aléas",
          "Renseigner et restituer les documents relatifs à son activité",
          "Restituer le véhicule et le préparer pour une prochaine mission",
          "Rendre compte aux services compétents de l'opération de transport",
        ],
        matieres: [
          { competence: "Documents et réglementation internationale", contenu: "Convention CMR, TIR, documents douaniers (T1, T2, EX1), CQC, documents ADR le cas échéant, réglementation transport international (licence communautaire, attestation de conducteur)", volume: "42h" },
          { competence: "Adéquation véhicule articulé / marchandise", contenu: "Tracteurs routiers, semi-remorques (tautliner, frigo, benne, citerne), PTRA jusqu'à 44T, répartition des charges par essieu, arrimage EN 12195", volume: "35h" },
          { competence: "Préparation d'itinéraire longue distance", contenu: "Cartographie européenne, restrictions de circulation (interdictions WE/fériés), péages, zones transfrontalières, points de repos sécurisés (parkings certifiés ESPORG)", volume: "49h" },
          { competence: "Gestion des temps et aléas", contenu: "RSE, AETR, dérogations art. 12 en cas de force majeure, planification conduite sur plusieurs jours, double équipage, repos hebdo normal/réduit", volume: "35h" },
          { competence: "Clôture et traçabilité", contenu: "Rapport de tournée, réserves CMR, bordereaux de livraison, transmission des données chronotachygraphe, débriefing exploitation", volume: "21h" },
        ],
        modalitesEval: "CCF en établissement habilité, ou épreuve ponctuelle pratique, écrite et orale pour les candidats hors CCF et VAE.",
      },
      {
        titre: "BC03 – Réaliser le transport routier",
        competences: [
          "Contrôler la conformité du véhicule et des équipements",
          "Effectuer les manœuvres en toute sécurité",
          "Anticiper les conditions et les risques de conduite pour un itinéraire à venir",
          "Réaliser un attelage / un dételage (uniquement pour l'option longue distance)",
          "Conduire un véhicule en toute sécurité",
          "Mettre en œuvre les principes d'écoconduite",
          "Gérer ses temps de conduite et de repos en fonction des évènements et des aléas rencontrés",
          "Gérer une situation d'incident, d'accident et de contrôle routier",
          "Conduire en sécurité les engins de manutention",
          "Contrôler la marchandise",
          "Charger et/ou décharger, caler et arrimer la marchandise",
          "Suivre un itinéraire imposé",
          "Exploiter les moyens embarqués de conduite",
          "Utiliser le chronotachygraphe",
          "Utiliser les outils de communication",
        ],
        matieres: [
          { competence: "Prise en charge et manœuvre du véhicule", contenu: "Contrôle de départ (niveaux, pneus, éclairages, sécurité), attelage/dételage pour véhicule articulé, manœuvres en sécurité (créneau, demi-tour, mise à quai)", volume: "70h" },
          { competence: "Conduite rationnelle et écoconduite", contenu: "Permis C (option proximité) / CE (option longue distance), anticipation, allure économique, régulation de vitesse, limiteur, principes de l'écoconduite (freinage moteur, coupure anticipée, régime moteur optimal)", volume: "105h" },
          { competence: "Manutention et engins de catégorie 1A (et 3 en longue distance)", contenu: "CACES R489 catégorie 1A (transpalettes électriques à conducteur porté), catégorie 3 pour longue distance (chariots frontaux en porte-à-faux jusqu'à 6t), règles de sécurité, VGP, gestes et postures", volume: "49h" },
          { competence: "Instrumentation de bord et communication", contenu: "Chronotachygraphe numérique 2e génération, GPS poids lourds, téléphonie main-libre, TMS embarqués, gestion de la fatigue, communication exploitation", volume: "35h" },
          { competence: "Gestion d'incident, d'accident et de contrôle routier", contenu: "Constat amiable, procédure d'alerte, mise en sécurité, contrôle DREAL/gendarmerie, tolérance zéro alcool, drogue au volant", volume: "28h" },
        ],
        modalitesEval: "CCF en établissement habilité (épreuve pratique sur véhicule + oral), ou épreuve ponctuelle pratique, écrite et orale. Évaluation du permis C (proximité) ou CE (longue distance) en sus – passage inclus dans le parcours.",
      },
      {
        titre: "BC04 – Appliquer les procédures liées à la santé, la sûreté et l'environnement",
        competences: [
          "Recueillir les informations utiles à l'application des procédures",
          "Identifier les procédures à mettre en œuvre",
          "Identifier et trier les déchets",
          "Appliquer les procédures relatives à la sûreté des biens et des personnes",
        ],
        matieres: [
          { competence: "Santé et prévention au poste de conducteur", contenu: "TMS (troubles musculo-squelettiques), fatigue et micro-sommeil, hygiène de vie, gestes et postures lors des manutentions, document unique d'évaluation des risques (DUERP)", volume: "28h" },
          { competence: "Sûreté des biens et des personnes", contenu: "Stationnement sécurisé (parkings certifiés), contrôle d'intrusion avant reprise de mission, procédures anti-vol, plombages, scellés", volume: "21h" },
          { competence: "Environnement et gestion des déchets", contenu: "Tri des déchets (emballages, déchets dangereux, huiles usées), bordereaux de suivi des déchets (BSD), écoconduite, réduction des émissions CO2, Crit'Air, ZFE", volume: "21h" },
        ],
        modalitesEval: "CCF ou épreuve ponctuelle orale.",
      },
      {
        titre: "BC05 – Français et Histoire-géographie – Enseignement moral et civique",
        competences: [
          "Communiquer : écouter, dialoguer et s'exprimer",
          "Reformuler à l'écrit ou à l'oral un message lu ou entendu",
          "Évaluer sa production orale ou écrite en vue de l'améliorer",
          "Lire, comprendre et présenter des textes documentaires ou fictionnels, des œuvres littéraires et artistiques",
          "Rendre compte à l'oral ou à l'écrit d'une expérience en lien avec le métier",
          "Maîtriser et utiliser des repères chronologiques et spatiaux",
          "S'approprier les démarches historiques et géographiques",
          "Construire et exprimer une argumentation cohérente (EMC)",
          "Mettre à distance ses opinions personnelles pour construire son jugement (EMC)",
          "Mobiliser ses connaissances pour penser et s'engager dans le monde (HG-EMC)",
        ],
        matieres: [
          { competence: "Français", contenu: "Communication écrite et orale, lecture analytique, rédaction (compte rendu, courrier professionnel), œuvres au programme CAP", volume: "56h" },
          { competence: "Histoire-Géographie – EMC", contenu: "Programme CAP : repères chronologiques et spatiaux, démarches historique et géographique, valeurs de la République, EMC (engagement, laïcité, pluralisme)", volume: "56h" },
        ],
        modalitesEval: "CCF ou épreuve ponctuelle écrite et orale.",
      },
      {
        titre: "BC06 – Mathématiques et physique-chimie",
        competences: [
          "Rechercher, extraire et organiser l'information",
          "Proposer, choisir, exécuter une méthode de résolution ou un protocole opératoire en respectant les règles de sécurité",
          "Expérimenter, utiliser une simulation",
          "Critiquer un résultat, argumenter",
          "Rendre compte d'une démarche, d'un résultat, à l'oral ou à l'écrit",
        ],
        matieres: [
          { competence: "Mathématiques CAP", contenu: "Calcul numérique et algébrique, proportionnalité, pourcentages (PRK, consommation carburant, marges), statistiques et probabilités, géométrie", volume: "56h" },
          { competence: "Physique-Chimie CAP", contenu: "Mécanique (freinage, énergie cinétique), électricité (circuits véhicule), chimie (combustion, carburants, gaz d'échappement, AdBlue)", volume: "28h" },
        ],
        modalitesEval: "CCF ou épreuve ponctuelle écrite.",
      },
      {
        titre: "BC07 – Éducation physique et sportive",
        competences: [
          "Développer sa motricité",
          "S'organiser pour apprendre et s'entraîner",
          "Exercer sa responsabilité dans un engagement personnel et solidaire",
          "Construire durablement sa santé",
          "Accéder au patrimoine culturel sportif et artistique",
        ],
        matieres: [
          { competence: "EPS adapté au métier de conducteur", contenu: "Endurance cardio-vasculaire, renforcement musculaire (dos, ceinture abdominale), étirements, prévention des TMS, activité physique hors poste", volume: "84h" },
        ],
        modalitesEval: "CCF ou épreuve ponctuelle.",
      },
      {
        titre: "BC08 – Prévention-Santé-Environnement (PSE)",
        competences: [
          "Appliquer une méthode d'analyse d'une situation de la vie professionnelle ou quotidienne et d'une documentation",
          "Mettre en relation un phénomène physiologique, un enjeu environnemental, une disposition réglementaire, avec une mesure de prévention",
          "Proposer une solution pour résoudre un problème lié à la santé, l'environnement ou la consommation et argumenter un choix",
          "Communiquer à l'écrit et à l'oral avec une syntaxe claire et un vocabulaire technique adapté",
          "Agir face à une situation d'urgence",
        ],
        matieres: [
          { competence: "Prévention santé au travail", contenu: "Risques professionnels du conducteur (TMS, fatigue, stress, bruit, vibrations, qualité de l'air habitacle), PRAP 2S, SST", volume: "42h" },
          { competence: "Environnement et consommation", contenu: "Développement durable, empreinte carbone, consommation responsable, alimentation et hygiène de vie du routier", volume: "14h" },
        ],
        modalitesEval: "CCF ou épreuve ponctuelle écrite.",
      },
      {
        titre: "BC09 – Langue vivante étrangère (Anglais niveau A2)",
        competences: [
          "Comprendre la langue orale",
          "Comprendre un document écrit",
          "S'exprimer à l'écrit",
          "S'exprimer à l'oral en continu",
          "Interagir à l'oral",
        ],
        matieres: [
          { competence: "Anglais du transport (niveau A2 CECRL)", contenu: "Vocabulaire du transport (truck, trailer, delivery, loading/unloading, customs), situations de la vie quotidienne et professionnelle (demander son chemin, remplir un CMR en anglais, échanger avec un quai de chargement étranger)", volume: "70h" },
        ],
        modalitesEval: "CCF ou épreuve ponctuelle écrite et orale.",
      },
    ],
    secteursActivite: "Associations, collectivités, entreprises de messagerie, de groupage, de service et de transports routiers de marchandises, en compte propre ou compte d'autrui. Option Livraisons de proximité : porteurs (permis C + CQC). Option Livraisons longue distance : ensembles articulés (permis CE + CQC), avec transports internationaux possibles.",
    typesEmplois: [
      "N4105 – Conducteur / Conductrice livreur(euse) (option Livraisons de proximité)",
      "N4101 – Conducteur / Conductrice de transport de marchandises sur longue distance (option Livraisons longue distance)",
      "Conducteur routier messagerie / groupage",
      "Conducteur poids lourd en compte propre (industrie, BTP, grande distribution)",
      "Chauffeur-livreur spécialisé (frais, surgelés, ADR après formation complémentaire)",
    ],
    codesROME: ["N4101", "N4105"],
    voiesAcces: [
      "Voie scolaire (lycée professionnel, établissement public ou privé sous contrat)",
      "Contrat d'apprentissage (CFA habilité ou section d'apprentissage)",
      "Formation professionnelle continue (établissements publics avec CCF, ou privés en épreuve ponctuelle)",
      "Enseignement à distance",
      "Validation des Acquis de l'Expérience (VAE)",
      "Candidats justifiant de 3 années d'activités professionnelles (épreuve ponctuelle)",
    ],
    dureeIndicative: "CAP en 2 ans : environ 1800h en centre (dont permis C ou CE inclus) + 12 semaines (420h) de PFMP (Période de Formation en Milieu Professionnel). En apprentissage : 800h/an en CFA + alternance en entreprise sur 2 ans.",
  },
  {
    code: "RNCP35808",
    intitule: "Bac Professionnel Pilote de Ligne de Production (PLP)",
    niveau: "Niveau 4 (Bac)",
    certificateur: "MINISTÈRE DE L'ÉDUCATION NATIONALE",
    dateEnregistrement: "01/09/2021",
    dateEcheance: "31/08/2026",
    codeNSF: "251 – Mécanique générale et de précision, usinage / 200 – Technologies industrielles fondamentales",
    formacodes: "23554 – Conduite installation industrielle / 31652 – Conduite ligne production / 31654 – Conduite système industriel",
    resume: "Le titulaire du Baccalauréat Professionnel Pilote de Ligne de Production (PLP) est un technicien capable de préparer, conduire et réguler une ligne de production automatisée ou semi-automatisée dans les industries de process (agroalimentaire, pharmacie, cosmétique, papier-carton, électronique, métallurgie, automobile, textile, céramique, traitement des déchets). Il assure la qualité de la production, le respect des cadences, la sécurité des biens et des personnes, et contribue à l'amélioration continue de la ligne. Il peut accéder à des fonctions de premier encadrement d'atelier et faire le lien entre production, maintenance et gestion de production.",
    activitesVisees: "Le pilote de ligne de production organise la production (A1), conduit l'équipement de production (A2), intervient et régule durant les opérations (A3), applique et fait appliquer les règles QSSE – Qualité, Santé, Sécurité, Environnement (A4) et participe à l'optimisation des opérations (A5). Il approvisionne et prépare les installations, règle et met en production selon le dossier machine, ordonnance la production à venir, assure la continuité de production lors des changements d'équipe, conduit la ligne depuis un poste de commandes centralisées, renseigne les documents de suivi, réalise la maintenance préventive de premier niveau, corrige les dérives, alerte en cas de dysfonctionnement, conduit en mode dégradé et propose des pistes d'amélioration.",
    blocsCompetences: [
      {
        titre: "Bloc 1 – Organiser la production (A1)",
        competences: [
          "A1T1 Approvisionner et préparer les installations, machines et accessoires",
          "A1T2 Régler et mettre en production selon le document de réglage, le dossier machine et le manuel de poste",
          "A1T3 Ordonnancer, organiser, préparer la production à venir",
          "A1T4 Assurer la continuité de la production (changement d'équipe, transmission de consignes)",
        ],
        matieres: [
          { competence: "Préparer et approvisionner", contenu: "Lecture du dossier machine, préparation matières premières, contrôle accessoires", volume: "90h" },
          { competence: "Régler et lancer la production", contenu: "Procédures de réglage, changement de format, démarrage ligne", volume: "120h" },
          { competence: "Ordonnancer la production", contenu: "GPAO, ordonnancement, gestion des flux, planification", volume: "80h" },
          { competence: "Transmission de consignes", contenu: "Compte-rendu, passation de poste, communication équipe 3x8", volume: "40h" },
        ],
        modalitesEval: "Sous-épreuve E31 – Pratique de pilotage en entreprise (coeff. 4) : évaluation en milieu professionnel sur situation de travail réelle, grille d'observation par le maître d'apprentissage et le formateur, dossier d'activités professionnelles.",
      },
      {
        titre: "Bloc 2 – Conduire l'équipement de production (A2)",
        competences: [
          "A2T1 Conduire la ligne, y compris depuis un poste de commandes centralisées",
          "A2T2 Conduire différents postes opérateurs de la ligne de production",
          "A2T3 Poursuivre une production à la prise de poste",
          "A2T4 Renseigner les documents de suivi de la production",
          "A2T5 Réaliser les opérations de maintenance préventive de premier niveau",
          "A2T6 Gérer l'activité et les moyens de la ligne",
          "A2T7 Assurer la circulation de l'information concernant la production",
          "A2T8 Vérifier la bonne exécution des inspections périodiques de maintenance préventive",
        ],
        matieres: [
          { competence: "Conduite de ligne automatisée", contenu: "Supervision, IHM, automates Schneider/Siemens, robotique", volume: "140h" },
          { competence: "Maintenance préventive niveau 1", contenu: "Graissage, nettoyage, contrôles visuels, check-list machines", volume: "80h" },
          { competence: "Suivi de production", contenu: "Documents de suivi, indicateurs TRS, SPC, traçabilité", volume: "60h" },
        ],
        modalitesEval: "Sous-épreuve E32 – Présentation d'un dossier d'activités (coeff. 3) : soutenance orale de 40 minutes devant jury professionnel à partir du dossier rédigé en entreprise.",
      },
      {
        titre: "Bloc 3 – Intervenir et réguler durant les opérations (A3)",
        competences: [
          "A3T1 Corriger les dérives de la production dans les situations connues",
          "A3T2 Alerter en cas de dysfonctionnement et mettre en œuvre le mode opératoire adapté",
          "A3T3 Conduire le système de production en mode dégradé",
          "A3T4 Réagir aux situations non prévues (dysfonctionnements, aléas)",
          "A3T5 Réaliser les opérations de maintenance corrective de premier niveau",
          "A3T6 Être en appui à la fonction support pour la maintenance de niveau 2",
        ],
        matieres: [
          { competence: "Diagnostic et régulation", contenu: "Analyse AMDEC, diagnostic de panne, arbres de défaillance", volume: "90h" },
          { competence: "Maintenance corrective niveau 1/2", contenu: "Intervention sécurisée, consignation, remise en service", volume: "80h" },
          { competence: "Mode dégradé et aléas", contenu: "Procédures d'urgence, by-pass sécurisé, gestion de crise ligne", volume: "60h" },
        ],
        modalitesEval: "Épreuve E2 – Analyse d'une situation professionnelle (coeff. 3, durée 4h écrit) : étude de cas technique à partir d'un dossier industriel, dimensionnement, diagnostic et propositions d'amélioration.",
      },
      {
        titre: "Bloc 4 – Hygiène, santé, sécurité, environnement (A4)",
        competences: [
          "A4T1 Identifier les risques liés à l'intervention et à son environnement",
          "A4T2 Appliquer les règles d'hygiène, de santé et d'environnement",
          "A4T3 Accompagner le personnel de production dans la mise en œuvre des nouvelles procédures QSSE",
        ],
        matieres: [
          { competence: "QSSE – Prévention des risques", contenu: "Document unique, plan de prévention, EPI, risques chimiques/mécaniques", volume: "60h" },
          { competence: "Hygiène industrielle", contenu: "BPF, HACCP (agroalimentaire), 5S, propreté des zones", volume: "50h" },
          { competence: "Environnement", contenu: "Tri des déchets, ICPE, économies d'énergie, effluents", volume: "40h" },
        ],
        modalitesEval: "Sous-épreuve E34 – Prévention Santé Environnement (PSE) (coeff. 1, durée 2h) : épreuve écrite ponctuelle.",
      },
      {
        titre: "Bloc 5 – Optimisation des opérations (A5)",
        competences: [
          "A5T1 Proposer des pistes d'amélioration",
          "A5T2 Accompagner le personnel de production dans la mise en place des plans d'actions",
          "A5T3 Collecter les informations auprès du personnel concernant les difficultés de production",
          "A5T4 Identifier les sources d'amélioration et formuler des propositions",
          "A5T5 Accompagner à la prise de poste et expliquer procédures et modes opératoires",
        ],
        matieres: [
          { competence: "Lean Manufacturing", contenu: "5S, Kaizen, SMED, VSM, résolution de problèmes 8D/PDCA", volume: "70h" },
          { competence: "Accompagnement opérateurs", contenu: "Tutorat, transmission de savoirs, animation de briefings", volume: "40h" },
          { competence: "Indicateurs et reporting", contenu: "TRS, TRG, analyse des arrêts, rendement matière", volume: "50h" },
        ],
        modalitesEval: "Épreuve E1 – Épreuve scientifique et technique (coeff. 3) : mathématiques (1h) + sciences physiques et chimiques (1h), mise en œuvre d'outils d'analyse et de résolution.",
      },
    ],
    secteursActivite: "Industries de process et de production en continu ou semi-continu : agroalimentaire, pharmacie, cosmétique, transformation pâtes-papiers-cartons, électronique, métallurgie, sidérurgie, automobile, textile, cuirs et peaux, céramique, traitement des déchets. Entreprises de toutes tailles (PME à grands groupes industriels) disposant de lignes automatisées ou semi-automatisées.",
    typesEmplois: [
      "Pilote de ligne de production automatisée",
      "Conducteur de ligne de fabrication",
      "Conducteur de machine industrielle",
      "Opérateur-régleur sur ligne automatisée",
      "Technicien de production",
      "Chef d'équipe de production (après expérience)",
      "Agent de maîtrise d'atelier (évolution)",
    ],
    codesROME: ["H2701", "H2102", "H2502", "H2504"],
    voiesAcces: [
      "Après un parcours de formation sous statut d'élève ou d'étudiant (lycée professionnel)",
      "En contrat d'apprentissage (CFA habilité)",
      "Après un parcours de formation continue (GRETA, organismes privés)",
      "En contrat de professionnalisation",
      "Par candidature individuelle (épreuve ponctuelle)",
      "Par expérience (VAE)",
    ],
    dureeIndicative: "Bac Pro en 3 ans (seconde, première, terminale) : environ 1850h en centre de formation + 22 semaines de PFMP (770h) en milieu professionnel. En apprentissage : alternance sur 2 ou 3 ans (rythme type 1 semaine CFA / 2 ou 3 semaines entreprise), environ 675h/an en CFA.",
  },
  {
    code: "RNCP38663",
    intitule: "TP - Employé polyvalent en restauration",
    niveau: "Niveau 3 (CAP/BEP)",
    certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
    dateEnregistrement: "27/03/2025",
    dateEcheance: "27/03/2030",
    codeNSF: "334t – Réception, hébergement, service de restauration, accompagnement",
    formacodes: "42753 – Restauration / 42716 – Production cuisine / 42735 – Service salle restauration",
    resume: "Par sa maîtrise de la technique culinaire et sa posture de service, l'employé polyvalent en restauration contribue à la satisfaction de la clientèle et à la réputation de l'établissement. Il réalise des productions culinaires simples (entrées, plats chauds, snacking, desserts), les dresse avec goût, accueille et sert les clients, encaisse les prestations et assure la plonge ainsi que le nettoyage des locaux et des matériels.",
    activitesVisees: "L'employé polyvalent en restauration met en place et réalise des entrées, des desserts, des plats chauds et des produits snacking selon les fiches techniques. Il accueille, conseille et sert la clientèle (y compris en situation de handicap), encaisse les prestations. Il conduit le poste laverie vaisselle, réalise la plonge batterie et effectue le nettoyage des locaux et des matériels dans le respect du PMS, des bonnes pratiques d'hygiène (HACCP), de la lutte anti-gaspillage (loi Egalim, loi climat et résilience) et des règles de sécurité au travail.",
    blocsCompetences: [
      {
        titre: "Préparer et dresser des entrées et des desserts",
        competences: [
          "Réaliser la mise en place des entrées et des desserts",
          "Assembler et dresser les entrées et les desserts",
        ],
        matieres: [
          { competence: "Mise en place des entrées et des desserts", contenu: "Lecture de fiches techniques, déconditionnement, épluchage/lavage/désinfection des végétaux, taillage, portionnage (fromages, charcuteries, poissons, viandes, préparations végétales), réalisation de pâtes, sauces et appareils de base, cuissons, traçabilité, PMS/HACCP, EPI", volume: "70h" },
          { competence: "Assemblage et dressage des entrées et desserts", contenu: "Respect des fiches techniques, assaisonnement, dégustation/rectification, dressage esthétique, contenants adaptés, mise en attente, lutte anti-gaspillage, tri des déchets", volume: "35h" },
        ],
        modalitesEval: "Mise en situation professionnelle (préparation et dressage d'entrées et desserts) + entretien technique. Durée totale CCP1 : 02h40min.",
      },
      {
        titre: "Préparer et dresser des plats chauds et des produits snacking",
        competences: [
          "Réaliser la mise en place des plats chauds et des produits snacking",
          "Assembler et dresser les plats chauds et les produits snacking",
        ],
        matieres: [
          { competence: "Mise en place des plats chauds et snacking", contenu: "Prétraitement, taillage, marinades, panures, cuissons (griller, snacker, sauter, rôtir, pocher, frire, vapeur), remise en température des PCEA, contrôle températures à cœur (≥ +63°C), thermomètre sonde, liaisons chaude/froide/directe", volume: "84h" },
          { competence: "Assemblage et dressage plats chauds / snacking", contenu: "Cuissons minute, montage des sandwichs/burgers/wraps/pizzas, dressage à l'assiette ou en contenant snacking, envoi au passe, vocabulaire professionnel", volume: "42h" },
        ],
        modalitesEval: "Mise en situation professionnelle (préparation, cuissons et dressage de plats chauds et de produits snacking) + entretien technique. Durée totale CCP2 : 02h20min.",
      },
      {
        titre: "Accueillir, conseiller et servir la clientèle",
        competences: [
          "Réaliser la mise en place des espaces de distribution et de restauration",
          "Accueillir et conseiller la clientèle",
          "Servir la clientèle et encaisser les prestations",
        ],
        matieres: [
          { competence: "Mise en place espaces distribution / restauration", contenu: "Approvisionnement vitrines et postes de vente, dressage des tables, alimentation des consoles, marchandisage, affichages obligatoires (origine produits, allergènes, prix), contrôle des températures vitrines/bains-marie", volume: "35h" },
          { competence: "Accueil et conseil clientèle", contenu: "Posture de service, accueil des clients (y compris en situation de handicap), commercialisation de l'offre, conseil sur composition/origine, ventes additionnelles, prise de commande sur outils digitaux (bornes, caisses, click & collect)", volume: "35h" },
          { competence: "Service et encaissement", contenu: "Service à l'assiette / au plat / self / vente à emporter, gestion de la caisse (NF525), moyens de paiement (espèces, CB, titres-restaurant), édition de la facture, gestion des réclamations", volume: "28h" },
        ],
        modalitesEval: "Mise en situation professionnelle (mise en place, accueil, conseil, service, encaissement) + entretien technique. Durée totale CCP3 : 01h20min.",
      },
      {
        titre: "Réaliser la plonge et le nettoyage des locaux et des matériels",
        competences: [
          "Assurer la conduite du poste laverie vaisselle",
          "Réaliser la plonge batterie",
          "Effectuer le nettoyage des locaux et des matériels",
        ],
        matieres: [
          { competence: "Conduite poste laverie vaisselle", contenu: "Mise en marche machine, dérochage des plateaux, tri des déchets, classement et chargement des paniers, pré-rinçage, contrôle qualité sortie machine, rangement protégé des contaminations", volume: "21h" },
          { competence: "Plonge batterie", contenu: "Pré-débarrassage, lavage manuel, rinçage et séchage de la batterie de cuisine, contrôle propreté, rangement, économies d'eau et d'énergie", volume: "14h" },
          { competence: "Nettoyage locaux et matériels", contenu: "Plan de nettoyage et désinfection (PND), méthode TACT (Température/Action mécanique/Concentration/Temps), produits lessiviels (FDS), sécurité chimique, traçabilité du nettoyage, marche en avant", volume: "21h" },
        ],
        modalitesEval: "Mise en situation professionnelle (conduite laverie + plonge batterie + nettoyage) + entretien technique. Durée totale CCP4 : 00h50min.",
      },
    ],
    secteursActivite: "Restauration commerciale (traditionnelle, brasserie, bistrot, à thème, cafétéria, restauration rapide), circuits alternatifs (boulangerie, point chaud), restauration collective (travail, enseignement, hospitalier, médico-social), catering aérien et ferroviaire.",
    typesEmplois: [
      "Employé polyvalent de restauration / employé polyvalent de restaurant",
      "Agent de restauration",
      "Employé de restauration collective / employé de cantine",
      "Employé de cafétéria / employé de snack-bar",
      "Équipier polyvalent de restauration rapide / agent de restauration rapide",
      "Préparateur-vendeur en point chaud",
    ],
    codesROME: ["G1603"],
    voiesAcces: [
      "Après un parcours de formation continue",
      "En contrat d'apprentissage",
      "Après un parcours de formation hors temps de travail",
      "En contrat de professionnalisation",
      "Par candidature individuelle (épreuve ponctuelle)",
      "Par expérience (VAE)",
    ],
    dureeIndicative: "Parcours indicatif 385h en centre + période d'application en entreprise (PAE) de 4 à 8 semaines selon le profil. Examen final TP : 4h30 (mise en situation professionnelle + entretien technique avec le jury, sur la base d'un dossier professionnel).",
  },
  {
    code: "RNCP38575",
    intitule: "TP - Responsable de petite ou moyenne structure (RPMS)",
    niveau: "Niveau 5 (Bac+2)",
    certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
    dateEnregistrement: "08/02/2024",
    dateEcheance: "08/02/2029",
    codeNSF: "310p – Spécialités plurivalentes des échanges et de la gestion (organisation, gestion)",
    formacodes: "32094 – Gestion PME PMI / 13175 – Économie sociale / 32008 – Responsabilité sociétale entreprise / 32047 – Création entreprise / 32048 – Reprise entreprise",
    resume: "Le responsable de petite ou moyenne structure (RPMS) dirige et gère une entreprise, un établissement ou une association de moins de 50 salariés dans ses dimensions stratégique, humaine, commerciale, productive, financière, administrative et sociétale. Il traduit les orientations stratégiques en objectifs opérationnels, anime une équipe, met en œuvre l'objet social de la structure et rend compte de son activité à la gouvernance.",
    activitesVisees: "Le RPMS développe une vision systémique de sa structure dans son environnement, l'inscrit dans son territoire, manage et anime une équipe. Il adapte l'offre à la demande, organise et développe la diffusion de cette offre, organise la production. Il analyse le bilan et le compte de résultat de la structure, rédige et présente le rapport d'activité (incluant données financières, RSE, QVCT, parité, handicap, transition écologique).",
    blocsCompetences: [
      {
        titre: "Bloc 1 – Diriger une structure avec une équipe",
        competences: [
          "CP1 – Développer une vision systémique de la structure dans son environnement",
          "CP2 – Inscrire la structure dans son territoire",
          "CP3 – Manager et animer une équipe",
        ],
        matieres: [
          { competence: "CP1 – Vision systémique de la structure", contenu: "Diagnostic interne/externe (PESTEL, SWOT, 5 forces de Porter, chaîne de valeur), veille stratégique (outils Feedly, Google Alerts, observatoires sectoriels), approche systémique, identification des acteurs clés, définition d'un plan d'action stratégique, environnement fiscal et social, RSE, risques civils et pénaux du dirigeant, sécurité numérique", volume: "60h" },
          { competence: "CP2 – Inscription dans le territoire", contenu: "Définition d'un territoire, acteurs institutionnels et consulaires (CCI, CMA, Région, communauté de communes), réseaux professionnels (clubs d'entreprises, French Tech, BPI), partenariats et conventionnement, communication sur Internet et réseaux sociaux (LinkedIn, Facebook Pro, Instagram, site vitrine, SEO local Google Business), événementiel territorial", volume: "50h" },
          { competence: "CP3 – Manager et animer une équipe", contenu: "Organisation du travail, recrutement (fiche de poste, sourcing, entretien structuré, DPAE, intégration / onboarding), styles de management (Hersey & Blanchard), motivation (Maslow, Herzberg, McClelland), entretiens (annuel, professionnel, recadrage), conduite de réunions, gestion des conflits (DESC, médiation), GEPP, droit du travail (CDI/CDD, durée du travail, congés, CSE, DUERP), QVCT, non-discrimination, handicap (RQTH, AGEFIPH)", volume: "120h" },
        ],
        modalitesEval: "Présentation d'un projet réalisé en amont de la session (30 min, dossier imprimé + diaporama) suivie d'un entretien technique (15 min) devant un jury de professionnels, sur la base du Dossier Professionnel (DP).",
      },
      {
        titre: "Bloc 2 – Mettre en œuvre l'objet social de la structure",
        competences: [
          "CP4 – Adapter l'offre de la structure à la demande",
          "CP5 – Organiser et développer la diffusion de l'offre",
          "CP6 – Organiser la production",
        ],
        matieres: [
          { competence: "CP4 – Adapter l'offre à la demande", contenu: "Étude de marché (qualitative/quantitative), segmentation/ciblage/positionnement (STP), persona, parcours client, analyse des besoins (Kano), mix-marketing 4P/7P, fixation des prix (cost+, valeur perçue, marché), cycle de vie produit, innovation, écoconception, accessibilité de l'offre", volume: "70h" },
          { competence: "CP5 – Diffusion de l'offre", contenu: "Plan d'actions commerciales (PAC), prospection multicanale (phoning, social selling, emailing RGPD), CRM (Axonaut, HubSpot, Sellsy), entonnoir de conversion, négociation commerciale, contractualisation (CGV, devis, bon de commande), fidélisation (NPS, CSAT, programme fidélité), gestion des réclamations (méthode CRAC), e-commerce, marketplaces", volume: "80h" },
          { competence: "CP6 – Organiser la production", contenu: "Planification (PERT, GANTT, Kanban), gestion des stocks (Wilson, ABC, juste-à-temps), approvisionnement et appel d'offres (achats responsables), qualité (PDCA, Ishikawa, 5 pourquoi, ISO 9001), Lean / 5S, indicateurs de production (TRS, taux de service, taux de rebut), sécurité (DUERP, EPI), environnement (ISO 14001, économie circulaire, bilan carbone simplifié), digitalisation (ERP, GPAO)", volume: "90h" },
        ],
        modalitesEval: "Présentation d'un projet réalisé en amont de la session (30 min, dossier imprimé + diaporama) suivie d'un entretien technique (15 min) devant un jury de professionnels, sur la base du Dossier Professionnel (DP).",
      },
      {
        titre: "Bloc 3 – Établir et présenter un rapport d'activité de la structure",
        competences: [
          "CP7 – Analyser le bilan de la structure",
          "CP8 – Analyser le compte de résultat de la structure",
          "CP9 – Rédiger le rapport d'activité de la structure",
        ],
        matieres: [
          { competence: "CP7 – Analyse du bilan", contenu: "Présentation du bilan comptable (PCG), bilan fonctionnel (emplois/ressources), Fonds de Roulement (FR), Besoin en Fonds de Roulement (BFR), trésorerie nette, BFR normatif, ratios de structure (autonomie financière, indépendance, liquidité), situation nette, financement court / moyen / long terme, cessation de paiement et procédures collectives (sauvegarde, redressement, liquidation), tribunal de commerce", volume: "60h" },
          { competence: "CP8 – Analyse du compte de résultat", contenu: "Structure du compte de résultat, Soldes Intermédiaires de Gestion (marge commerciale, valeur ajoutée, EBE, résultat d'exploitation, résultat courant, résultat net), Capacité d'Autofinancement (CAF), comptabilité analytique (coûts complets, coûts partiels, méthode ABC), seuil de rentabilité et point mort, charges fixes/variables, M/CV, retraitements (crédit-bail, intérim), techniques budgétaires et prévisionnelles, demande de subvention (BPI, Région, Europe)", volume: "60h" },
          { competence: "CP9 – Rapport d'activité", contenu: "Collecte et structuration des données financières et extra-financières, RSE et critères ESG, Déclaration de Performance Extra-Financière (DPEF), CSRD, indicateurs de durabilité, QVCT, parité H/F, index égalité professionnelle, handicap (DOETH), bilan carbone, tableau de bord équilibré (Balanced Scorecard), data-visualisation (Power BI, Looker Studio), rédaction professionnelle, présentation orale à la gouvernance / AG", volume: "55h" },
        ],
        modalitesEval: "Présentation d'un projet réalisé en amont de la session (30 min, dossier imprimé + diaporama) suivie d'un entretien technique (15 min) devant un jury de professionnels, sur la base du Dossier Professionnel (DP).",
      },
    ],
    secteursActivite: "Tous secteurs : industrie, artisanat, commerce, services, BTP, économie sociale et solidaire (associations, mutuelles, coopératives), secteur public et parapublic. PME, ETI, établissements de moins de 50 salariés, agences, centres de profit, sites, unités opérationnelles.",
    typesEmplois: [
      "Manageur / chef / responsable / directeur adjoint / directeur",
      "Délégué / délégué général",
      "Responsable de proximité / d'agence / d'unité / de centre de profit",
      "Responsable de site / de centre / d'établissement / d'entreprise",
      "Directeur d'association / délégué général d'association",
      "Adjoint de direction de PME-PMI",
    ],
    codesROME: ["M1302"],
    voiesAcces: [
      "Après un parcours de formation continue (GRETA, AFPA, organismes privés)",
      "En contrat d'apprentissage (CFA habilité)",
      "Après un parcours de formation hors temps de travail",
      "En contrat de professionnalisation",
      "Par candidature individuelle (épreuve ponctuelle)",
      "Par expérience (VAE)",
    ],
    dureeIndicative: "Parcours indicatif 645h en centre de formation + période d'application en entreprise (PAE) de 8 à 12 semaines (280 à 420h). Examen : pour chacun des 3 blocs, présentation d'un projet réalisé en amont (30 min) suivie d'un entretien technique (15 min), sur la base du Dossier Professionnel ; titre obtenu en totalité ou par blocs.",
  },
  {
    code: "RNCP38363",
    intitule: "BTS - Gestion de la PME",
    niveau: "Niveau 5 (Bac+2)",
    certificateur: "MINISTÈRE DE L'ENSEIGNEMENT SUPÉRIEUR ET DE LA RECHERCHE",
    dateEnregistrement: "01/01/2024",
    dateEcheance: "31/08/2028",
    codeNSF: "310 – Spécialités plurivalentes des échanges et de la gestion / 314 – Comptabilité, gestion",
    formacodes: "32062 – Gestion PME PMI / 34076 – Direction PME PMI / 35054 – Secrétariat assistanat",
    resume: "Le titulaire du BTS Gestion de la PME est un collaborateur direct du dirigeant ou d'un cadre dirigeant d'une petite ou moyenne entreprise (5 à 50 salariés). Sa mission se caractérise par une forte polyvalence à dominante administrative et lui permet de participer à la gestion opérationnelle de l'entreprise dans ses dimensions humaine, comptable, commerciale et administrative. Il contribue à l'amélioration de l'efficacité de l'entreprise par l'optimisation de son organisation et à sa pérennité par l'anticipation des besoins, l'accompagnement du développement et la participation au contrôle de l'activité.",
    activitesVisees: "Le titulaire du BTS GPME exerce sa mission auprès du chef d'entreprise d'une PME ou d'un cadre dirigeant. Il participe à la gestion de la relation client et fournisseur, au soutien à la gestion des ressources humaines, à l'organisation et à la planification des activités, à la gestion des risques, à la gestion du système d'information, à la pérennisation de l'entreprise, à la gestion des risques financiers et à la communication globale.",
    blocsCompetences: [
      {
        titre: "BLOC 1 – Gérer la relation avec les clients et les fournisseurs de la PME",
        competences: [
          "Rechercher des clientèles et contacter (prospection, fidélisation)",
          "Administrer les ventes et assurer le suivi de la relation client",
          "Maintenir et développer la relation avec les clients de la PME",
          "Rechercher et choisir les fournisseurs de la PME",
          "Suivre et contrôler les opérations d'achats et d'investissement de la PME",
          "Assurer le suivi comptable des opérations commerciales",
        ],
        matieres: [
          { competence: "Gestion de la relation client (GRC)", contenu: "Prospection, ciblage, qualification de fichiers, fidélisation, CRM (HubSpot, Sellsy, Axonaut), social selling, RGPD appliqué au marketing", volume: "70h" },
          { competence: "Administration des ventes", contenu: "Devis, bon de commande, bon de livraison, facturation (mentions obligatoires, TVA, LME), encaissement, lettrage, relances, impayés, indemnité forfaitaire 40 €, facture électronique 2026-2027", volume: "84h" },
          { competence: "Gestion des achats et fournisseurs", contenu: "Sourcing, appel d'offres, grille multicritères (prix/qualité/délai/RSE), 3-way match, négociation, suivi performance fournisseurs, archivage légal 10 ans", volume: "70h" },
          { competence: "Suivi comptable des opérations commerciales", contenu: "Plan comptable général, comptes clients (411) et fournisseurs (401), TVA collectée/déductible, états de rapprochement, balance âgée", volume: "56h" },
        ],
        modalitesEval: "E4 – Gérer la relation avec les clients et les fournisseurs de la PME : situation pratique en CCF (épreuves orales 30 min) ou épreuve ponctuelle écrite (4h00) + orale (30 min). Coefficient 6.",
      },
      {
        titre: "BLOC 2 – Participer à la gestion des risques de la PME",
        competences: [
          "Conduire une veille (informationnelle, réglementaire, concurrentielle)",
          "Accompagner la mise en place d'un travail en mode projet",
          "Mettre en œuvre une démarche de gestion des risques de la PME",
          "Participer à la gestion des risques financiers de la PME",
          "Participer à la gestion des risques non financiers de la PME (numériques, environnementaux, RH)",
          "Mettre en place une démarche qualité au sein de la PME",
        ],
        matieres: [
          { competence: "Veille et gestion documentaire", contenu: "Sources d'information (Légifrance, INSEE, observatoires de branche), agrégateurs (Feedly, Inoreader), Google Alerts, GED, plan de classement", volume: "42h" },
          { competence: "Démarche de gestion des risques (ISO 31000)", contenu: "Cartographie, matrice probabilité×gravité, traitement (éviter/réduire/transférer/accepter), DUERP obligatoire dès 1 salarié", volume: "56h" },
          { competence: "Risques financiers et trésorerie", contenu: "Plan de trésorerie, FRNG, BFR, TN, DSO, DPO, assurance-crédit (Allianz Trade, Coface), affacturage, escompte, Dailly", volume: "56h" },
          { competence: "Risques numériques et RGPD", contenu: "Cybersécurité (sauvegardes 3-2-1, MFA), phishing, registre des traitements, droits des personnes, sanctions CNIL", volume: "42h" },
          { competence: "Démarche qualité", contenu: "ISO 9001, PDCA, indicateurs qualité, traitement des non-conformités, satisfaction client (NPS, CSAT)", volume: "35h" },
        ],
        modalitesEval: "E5 – Participer à la gestion des risques de la PME : épreuve écrite ponctuelle (2h30) ou CCF (2 situations d'évaluation). Coefficient 4.",
      },
      {
        titre: "BLOC 3 – Gérer le personnel et contribuer à la gestion des ressources humaines de la PME",
        competences: [
          "Assurer le suivi administratif du personnel (DPAE, contrats, paie, DSN)",
          "Préparer et accompagner le recrutement, l'intégration et la formation",
          "Contribuer à la cohésion interne du personnel et au climat social",
          "Participer à la gestion des compétences (plan de développement, GPEC)",
        ],
        matieres: [
          { competence: "Administration du personnel", contenu: "DPAE, contrats (CDI, CDD, alternance, intérim), bulletin de paie (mentions R.3243-1), DSN mensuelle, registre unique du personnel, visite VIP", volume: "70h" },
          { competence: "Recrutement et intégration", contenu: "Fiche de poste, sourcing multicanal (France Travail, APEC, LinkedIn), méthode STAR, non-discrimination (25 critères art. L.1132-1), Index Égapro, onboarding", volume: "56h" },
          { competence: "Climat social et cohésion", contenu: "QVCT, prévention des RPS, baromètre social, CSE (≥ 11 salariés), instances représentatives, communication interne", volume: "42h" },
          { competence: "Développement des compétences", contenu: "Plan de développement des compétences, CPF, Pro-A, VAE (loi 2022), PTP, AFEST, entretien professionnel obligatoire (tous les 2 ans, état des lieux à 6 ans, sanction 3 000 €)", volume: "49h" },
        ],
        modalitesEval: "E6 – Gérer le personnel et contribuer à la GRH de la PME : épreuve orale ponctuelle (30 min) ou CCF. Présentation d'un dossier professionnel. Coefficient 4.",
      },
      {
        titre: "BLOC 4 – Soutenir le fonctionnement et le développement de la PME",
        competences: [
          "Contribuer à la qualité du système d'information de la PME (PGI, GED, dématérialisation)",
          "Organiser les activités, l'information et la communication de la PME",
          "Participer au développement commercial national ou international de la PME",
          "Contribuer à la mise en œuvre de la communication globale (interne et externe)",
          "Analyser l'activité de la PME (analyse financière, tableaux de bord)",
          "Produire et analyser des informations de nature financière",
          "Identifier les facteurs explicatifs de la performance et proposer des améliorations",
        ],
        matieres: [
          { competence: "Système d'information et numérique", contenu: "PGI/ERP (Sage, Cegid, EBP, Odoo, Dolibarr), GED, signature électronique eIDAS, Microsoft 365 / Google Workspace, facture électronique Factur-X (réforme 09/2026 et 09/2027)", volume: "70h" },
          { competence: "Tableur avancé et data", contenu: "Fonctions avancées (RECHERCHEX, INDEX/EQUIV, SOMME.SI.ENS), TCD, Power Query, mise en forme conditionnelle, graphiques, Power BI, Looker Studio", volume: "56h" },
          { competence: "Analyse financière", contenu: "SIG (marge com., VA, EBE, RE, RN), CAF, ratios (autonomie, indépendance, capacité de remboursement, rentabilité), bilan fonctionnel, seuil de rentabilité", volume: "70h" },
          { competence: "Développement commercial", contenu: "Étude de marché, segmentation, mix marketing 7P, e-commerce (Shopify, WooCommerce), export (Team France Export, Bpifrance), CIR/CII", volume: "56h" },
          { competence: "Communication globale", contenu: "Plan de communication, charte graphique, réseaux sociaux (LinkedIn, Instagram, Facebook), site web, RSE (ISO 26000, EcoVadis, B Corp), bilan carbone ADEME", volume: "49h" },
        ],
        modalitesEval: "E7 – Communication (oral 30 min) + Analyse de la rentabilité d'une activité (écrit 4h30). Coefficient 5 (dont 2 pour la communication et 3 pour l'analyse).",
      },
    ],
    secteursActivite: "Toutes les petites et moyennes entreprises (de 5 à 50 salariés) au sens de la recommandation européenne 2003/361/CE, dans tous les secteurs d'activité : industrie, BTP, commerce de gros et de détail, services aux entreprises et aux particuliers, artisanat, transport, hôtellerie-restauration, économie sociale et solidaire (associations, coopératives).",
    typesEmplois: [
      "Assistant(e) de gestion PME",
      "Assistant(e) de direction PME",
      "Gestionnaire administratif et financier",
      "Office manager",
      "Chargé(e) de clientèle / Chargé(e) de relation fournisseurs",
      "Assistant(e) RH",
      "Adjoint(e) au dirigeant de PME",
      "Collaborateur de direction / Bras droit du dirigeant",
    ],
    codesROME: ["M1605 – Assistanat technique et administratif", "M1203 – Comptabilité", "M1501 – Assistanat en ressources humaines", "M1701 – Administration des ventes"],
    voiesAcces: [
      "Formation initiale sous statut scolaire (lycées publics et privés)",
      "Contrat d'apprentissage en CFA habilité",
      "Contrat de professionnalisation",
      "Formation continue (GRETA, AFPA, organismes privés)",
      "Candidat libre",
      "Validation des Acquis de l'Expérience (VAE)",
    ],
    dureeIndicative: "1 350 heures sur 2 ans en centre de formation (grille horaire hebdomadaire : Culture générale et expression 3h, LV étrangère A 3h, CEJM 4h, CEJM appliqué 1h, Atelier de professionnalisation 4h, Bloc 1 6h, Bloc 2 4h, Bloc 3 4h, Bloc 4 5h) + 12 semaines de stage minimum en milieu professionnel (6 semaines en 1ère année et 6 semaines en 2ème année). Examen : 7 épreuves dont 4 professionnelles (E4, E5, E6, E7).",
  },
  {
    code: "RNCP38362",
    intitule: "BTS - Management commercial opérationnel (MCO)",
    niveau: "Niveau 5 (Bac+2)",
    certificateur: "MINISTÈRE DE L'ENSEIGNEMENT SUPÉRIEUR ET DE LA RECHERCHE",
    dateEnregistrement: "01/01/2024",
    dateEcheance: "31/12/2028",
    codeNSF: "310 – Spécialités plurivalentes des échanges et de la gestion / 312 – Commerce, vente",
    formacodes: "34054 – Gestion commerciale achats / 32154 – Encadrement management",
    resume: "Le titulaire du BTS Management commercial opérationnel (MCO) a pour perspective de prendre la responsabilité opérationnelle de tout ou partie d'une unité commerciale (physique et/ou virtuelle). Il prend en charge la relation client dans sa globalité, l'animation et la dynamisation de l'offre, la gestion opérationnelle de l'unité commerciale ainsi que le management de son équipe commerciale. Cette polyvalence s'inscrit dans un contexte d'activités commerciales digitalisées et omnicanales visant à mettre en œuvre la politique commerciale du réseau et/ou de l'unité commerciale.",
    activitesVisees: "Développement de la relation client et vente conseil (collecte et analyse de l'information commerciale, vente conseil, suivi de la relation client, qualité de service, fidélisation, développement de clientèle). Animation et dynamisation de l'offre commerciale (adaptation de l'offre, agencement et attractivité de l'espace, mise en valeur, promotions et animations, communication interne et externe, analyse de l'action commerciale). Gestion opérationnelle (fixation d'objectifs, approvisionnements et achats, stocks, règlements, budgets, gestion des risques, investissements, performances, reporting). Management de l'équipe commerciale (évaluation des besoins en personnel, plannings, recrutement, intégration, animation, évaluation des performances, individualisation de la formation).",
    blocsCompetences: [
      {
        titre: "RNCP38362BC01 – Développement de la relation client et vente conseil",
        competences: [
          "Assurer la veille informationnelle",
          "Réaliser et exploiter des études commerciales",
          "Vendre dans un contexte omnicanal",
          "Entretenir la relation client",
        ],
        matieres: [
          { competence: "Veille informationnelle et études commerciales", contenu: "Sources d'information (INSEE, Xerfi, Kantar, observatoires de branche), agrégateurs (Feedly, Google Alerts), enquêtes quanti/quali, panels, géomarketing, exploitation de données clients", volume: "98h" },
          { competence: "Vente conseil omnicanale", contenu: "Parcours client phygital, méthode SONCAS(E), CAB, traitement d'objections, closing, click & collect, drive, marketplace, ventes additionnelles", volume: "112h" },
          { competence: "Relation et fidélisation client", contenu: "CRM (Salesforce, HubSpot, Sellsy), programmes de fidélité, NPS/CSAT, réclamations, RGPD appliqué à la relation client, marketing automation", volume: "84h" },
        ],
        modalitesEval: "E4 – Développement de la relation client et vente conseil : épreuve orale ponctuelle (40 min) ou CCF (2 situations d'évaluation). Coefficient 4.",
      },
      {
        titre: "RNCP38362BC02 – Animation, dynamisation de l'offre commerciale",
        competences: [
          "Élaborer et adapter en continu l'offre de produits et de services",
          "Organiser l'espace commercial",
          "Développer les performances de l'espace commercial",
          "Concevoir et mettre en place la communication commerciale",
          "Évaluer l'action commerciale",
        ],
        matieres: [
          { competence: "Élaboration et adaptation de l'offre", contenu: "Gamme et assortiment, matrice ADL/BCG, méthode 20/80, e-merchandising, gestion de la disponibilité (omnicanal vs. stock physique)", volume: "84h" },
          { competence: "Espace commercial et merchandising", contenu: "Zoning, flux clients, façade et vitrine, théâtralisation, ILV/PLV, planogramme, ratios merchandising (linéaire au sol, IS, IR)", volume: "70h" },
          { competence: "Communication commerciale", contenu: "Plan de communication 360°, social media (Instagram, TikTok, Facebook, LinkedIn), SEO/SEA, emailing, influence, événementiel point de vente", volume: "84h" },
          { competence: "Évaluation de l'action commerciale", contenu: "Indicateurs (CA, marge, panier moyen, taux de transformation, fréquentation, ROI campagne), tableaux de bord, A/B testing", volume: "56h" },
        ],
        modalitesEval: "E5 – Animation, dynamisation de l'offre commerciale : épreuve écrite ponctuelle (3h) ou CCF (2 situations d'évaluation). Coefficient 4.",
      },
      {
        titre: "RNCP38362BC03 – Gestion opérationnelle",
        competences: [
          "Gérer les opérations courantes (caisse, approvisionnements, stocks, règlements)",
          "Prévoir et budgétiser l'activité",
          "Analyser les performances de l'unité commerciale",
        ],
        matieres: [
          { competence: "Opérations courantes et gestion des stocks", contenu: "Méthodes de réapprovisionnement (point de commande, calendaire, Wilson), inventaires, démarque (connue/inconnue), TPV, encaissement, monétique", volume: "84h" },
          { competence: "Budgétisation et prévision", contenu: "Budget des ventes, budget de trésorerie, écarts sur volume/prix/marge, plan d'investissement, calcul de rentabilité (VAN, TRI, ROI)", volume: "70h" },
          { competence: "Analyse de la performance commerciale", contenu: "Marge brute, marge commerciale, MUB/MUN, taux de marque, rotation des stocks, productivité au m², CA/employé, tableaux de bord BI (Power BI)", volume: "70h" },
        ],
        modalitesEval: "E6 – Gestion opérationnelle : épreuve écrite ponctuelle (3h) ou CCF. Coefficient 3.",
      },
      {
        titre: "RNCP38362BC04 – Management de l'équipe commerciale",
        competences: [
          "Organiser le travail de l'équipe commerciale",
          "Recruter des collaborateurs",
          "Animer l'équipe commerciale",
          "Évaluer les performances de l'équipe commerciale",
        ],
        matieres: [
          { competence: "Organisation et plannings", contenu: "Plannings (modulation, annualisation), gestion des absences, polyvalence, droit du travail appliqué au commerce (durée, repos, dimanche, jours fériés)", volume: "56h" },
          { competence: "Recrutement et intégration", contenu: "Fiche de poste, sourcing (France Travail, Indeed, LinkedIn), entretien structuré STAR, non-discrimination, onboarding, période d'essai", volume: "49h" },
          { competence: "Animation et motivation d'équipe", contenu: "Styles de management (Hersey-Blanchard), brief/débrief, challenges commerciaux, rémunération variable, reconnaissance, prévention RPS", volume: "63h" },
          { competence: "Évaluation des performances", contenu: "Objectifs SMART, entretiens annuels et professionnels (loi 2014), grille d'évaluation, plan de développement des compétences, GPEC, AFEST", volume: "56h" },
        ],
        modalitesEval: "E7 – Management de l'équipe commerciale : épreuve écrite ponctuelle (2h30) ou CCF. Coefficient 3.",
      },
    ],
    secteursActivite: "Entreprises de distribution des secteurs alimentaires ou spécialisés, unités commerciales d'entreprises de production, entreprises de commerce électronique, entreprises de prestation de services, associations à but lucratif. Clientèle de particuliers (B2C) ou de professionnels (B2B).",
    typesEmplois: [
      "Conseiller de vente et de services",
      "Vendeur / conseiller e-commerce",
      "Chargé de clientèle / Chargé du service client",
      "Marchandiseur",
      "Manageur adjoint / Second de rayon",
      "Manageur d'une unité commerciale de proximité",
      "Chef de rayon / Chef des ventes (avec expérience)",
      "Responsable e-commerce / Responsable de drive (avec expérience)",
      "Manageur de rayon, de secteur, de département (avec expérience)",
      "Manageur d'une unité commerciale (avec expérience)",
    ],
    codesROME: ["D1401 – Assistanat commercial", "D1501 – Animation de vente", "M1704 – Management relation clientèle", "M1705 – Marketing"],
    voiesAcces: [
      "Formation initiale sous statut scolaire (lycées publics et privés sous contrat)",
      "Contrat d'apprentissage en CFA habilité",
      "Contrat de professionnalisation",
      "Formation professionnelle continue (GRETA, AFPA, organismes privés)",
      "Candidat libre / Enseignement à distance",
      "Validation des Acquis de l'Expérience (VAE)",
    ],
    dureeIndicative: "1 350 heures sur 2 ans en centre de formation (grille horaire hebdomadaire : Culture générale et expression 3h, LV étrangère 3h, CEJM 4h, CEJM appliqué 1h, Bloc 1 – Relation client 5h, Bloc 2 – Animation offre 5h, Bloc 3 – Gestion opérationnelle 4h, Bloc 4 – Management équipe 4h, Atelier de professionnalisation 4h) + 16 semaines de stage minimum en milieu professionnel (réparties sur les deux années). Examen : 7 épreuves dont 4 professionnelles (E4, E5, E6, E7).",
  },
];

const isoToFr = (d: string) => (/^\d{4}-\d{2}-\d{2}$/.test(d) ? d.split("-").reverse().join("/") : d);

/**
 * Fusionne une fiche locale (contenus pédagogiques rédigés : matières, volumes)
 * avec la fiche officielle synchronisée France Compétences, qui fait foi pour
 * l'intitulé, le niveau, le certificateur, les dates, le statut, les codes et les blocs.
 */
function fusionFC(local: RNCPFiche | undefined, fc: FicheFC): RNCPFiche {
  const unites = unitesFC(fc);
  const blocsOfficiels = unites.map((u, i) => ({
    titre: `Bloc ${i + 1} – ${u.titre}`,
    competences: u.competences,
    matieres: u.competences.map((c) => ({ competence: c, contenu: c, volume: "" })),
    modalitesEval: u.modalites || fc.modalitesEvaluation || "",
  }));
  return {
    code: fc.c,
    intitule: fc.a ? `${fc.a} - ${fc.i}` : fc.i,
    niveau: fc.n ? `Niveau ${fc.n}` : local?.niveau || "Sans niveau (répertoire spécifique)",
    certificateur: fc.cert.join(", ") || local?.certificateur || "",
    dateEnregistrement: isoToFr(fc.dateDecision) || local?.dateEnregistrement || "",
    dateEcheance: isoToFr(fc.fin) || local?.dateEcheance || "",
    codeNSF: fc.nsf.map((n) => `${n.code} – ${n.libelle}`).join(" / ") || local?.codeNSF || "",
    formacodes: fc.formacodes.map((n) => `${n.code} – ${n.libelle}`).join(" / ") || local?.formacodes || "",
    resume: local?.resume || fc.objectifs || fc.activites.join(" ; "),
    activitesVisees: local?.activitesVisees || fc.activites.join(" ; "),
    // Les blocs rédigés localement sont conservés quand ils correspondent aux blocs officiels.
    blocsCompetences: local && local.blocsCompetences.length === blocsOfficiels.length ? local.blocsCompetences : blocsOfficiels,
    secteursActivite: fc.secteurs || local?.secteursActivite || "",
    typesEmplois: local?.typesEmplois?.length ? local.typesEmplois : fc.typesEmplois.split(/[,;]\s*/).filter((x) => x.length > 2).slice(0, 10),
    codesROME: fc.rome.length ? fc.rome.map((r) => `${r.code} – ${r.libelle}`) : local?.codesROME || [],
    voiesAcces: fc.voies.length ? fc.voies : local?.voiesAcces || [],
    dureeIndicative: local?.dureeIndicative || "",
    inactif: !fc.on,
  };
}

export function getRNCPByCode(code: string): RNCPFiche | undefined {
  const local = RNCP_FICHES.find(f => f.code.toLowerCase() === (code || "").toLowerCase());
  const fc = getFicheFC(code);
  return fc ? fusionFC(local, fc) : local;
}

/** Échéance d'une fiche (jj/mm/aaaa ou aaaa-mm-jj) en Date, null si illisible. */
function echeanceRNCP(f: RNCPFiche): Date | null {
  const t = (f.dateEcheance || "").trim();
  const m = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const d = m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date(t);
  return isNaN(d.getTime()) ? null : d;
}

/** Vrai si la fiche est connue, non marquée inactive et non échue à la date donnée. */
export function isRNCPActif(code: string, at: Date = new Date()): boolean {
  const f = getRNCPByCode(code || "");
  if (!f || f.inactif) return false;
  const e = echeanceRNCP(f);
  return !e || e.getTime() >= new Date(at.getFullYear(), at.getMonth(), at.getDate()).getTime();
}
