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
];

export function getRNCPByCode(code: string): RNCPFiche | undefined {
  return RNCP_FICHES.find(f => f.code.toLowerCase() === code.toLowerCase());
}
