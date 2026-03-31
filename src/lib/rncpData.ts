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
}

export const RNCP_FICHES: RNCPFiche[] = [
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
    intitule: "CAP Esthétique Cosmétique Parfumerie",
    niveau: "Niveau 3 (CAP)",
    certificateur: "Ministère de l'Éducation nationale et de la Jeunesse",
    dateEnregistrement: "2017-07-05",
    dateEcheance: "2028-12-31",
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
];

export function getRNCPByCode(code: string): RNCPFiche | undefined {
  return RNCP_FICHES.find(f => f.code.toLowerCase() === code.toLowerCase());
}
