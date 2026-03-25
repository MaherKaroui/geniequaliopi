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
];

export function getRNCPByCode(code: string): RNCPFiche | undefined {
  return RNCP_FICHES.find(f => f.code.toLowerCase() === code.toLowerCase());
}
