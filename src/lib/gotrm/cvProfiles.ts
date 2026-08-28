/**
 * Profils candidats GOTRM issus des CV réels transmis par le centre.
 * Utilisés pour personnaliser le DP (dossier professionnel) et l'ECF
 * de chaque stagiaire : contexte d'entreprise, expériences, outils,
 * collègues, diplômes et périodes d'exercice.
 *
 * Les candidats sans CV transmis disposent d'un profil reconstitué
 * cohérent avec le secteur du transport routier de marchandises.
 */

export interface GotrmCvExperience {
  periode: string;
  poste: string;
  employeur: string;
  missions: string[];
}

export interface GotrmCvProfile {
  /** Clé = NOM de famille en majuscules */
  nom: string;
  prenom: string;
  entreprise: { nom: string; service: string; ville: string };
  posteOccupe: string;
  profil: string;
  experiences: GotrmCvExperience[];
  outils: string;
  collegues: string;
  diplomes: [string, string, string][];
  permis: string;
  periodeExercice: string;
  /** Phrase d'accroche contextuelle par activité-type (AT1 / AT2 / AT3) */
  accroches: [string, string, string];
  /**
   * Source du profil.
   * « Parcours de formation » = aucun CV transmis : le DP se rédige sur la voie
   * du parcours de formation (cas d'entreprise support en plateau technique),
   * sans jamais fabriquer d'employeur ni de période d'emploi.
   */
  source: "CV transmis" | "Profil reconstitué" | "Profil à compléter" | "Parcours de formation";
  /** Adresse personnelle telle qu'indiquée sur le CV */
  adresse?: string;
  /**
   * Points forts exprimés en compétences du référentiel.
   * Vide = aucune donnée : le générateur ECF ne doit RIEN inventer.
   */
  pointsForts: string[];
  /** Compétences à consolider, exprimées en compétences du référentiel. */
  pointsAConsolider: string[];
  /**
   * Source de CHAQUE exemple, activité-type par activité-type (index 0 = AT1).
   * Valeur = nom de l'employeur réel (repris d'une expérience du CV) ou
   * « PARCOURS » lorsque l'exemple s'ancre sur la pratique acquise en centre
   * de formation (cas d'entreprise support). Absent = employeur de référence
   * du dossier pour tous les exemples.
   */
  experienceParAT?: (string | "PARCOURS")[];
}

const P: GotrmCvProfile[] = [
  {
    nom: "ATASOY",
    prenom: "Dilovan",
    entreprise: { nom: "O'malo", service: "Gérance et logistique d'approvisionnement", ville: "Romilly-sur-Seine (10)" },
    posteOccupe: "Gérant d'établissement – gestion des approvisionnements et des livraisons",
    profil:
      "Ancien surveillant de travaux caténaires à la SNCF, puis créateur et gérant d'un restaurant employant dix personnes, j'ai l'habitude d'organiser des flux, de piloter une équipe et de tenir un budget.",
    experiences: [
      {
        periode: "Septembre 2019 – aujourd'hui",
        poste: "Gérant – création d'entreprise (restaurant O'malo)",
        employeur: "O'malo, Romilly-sur-Seine",
        missions: [
          "Management d'une équipe de 10 personnes",
          "Gestion des stocks, du budget et du chiffre d'affaires",
          "Négociation avec les fournisseurs et pilotage des livraisons",
        ],
      },
      {
        periode: "Juillet 2015 – Septembre 2019",
        poste: "Surveillant travaux caténaires / agent de sécurité",
        employeur: "SNCF, Paris",
        missions: [
          "Représentant SNCF sur chantier, responsabilité du personnel sur les voies",
          "Demandes de fermeture de voies et consignations électriques",
          "Rapports journaliers et maintenance des outillages",
        ],
      },
      {
        periode: "Février 2015 – Juin 2015",
        poste: "Contrôleur sorties de marchandises",
        employeur: "IKEA, Villiers-sur-Marne",
        missions: [
          "Contrôle des articles à la sortie du dépôt",
          "Préparation et gestion des colis pour les livraisons",
        ],
      },
    ],
    outils:
      "TMS de suivi des commandes, tableur Excel® (budget, stocks, marges), Word® pour les courriers et les commandes, messagerie professionnelle et téléphone d'exploitation",
    collegues:
      "avec mon équipe de dix salariés, mes fournisseurs et les transporteurs assurant les livraisons de l'établissement",
    diplomes: [
      ["Niveau BTS Systèmes électroniques et numériques", "Lycée Louis Armand, Nogent-sur-Marne", "2014"],
      ["Formation RPTX – Responsable planche travaux & CCH chef de chantier", "SNCF", "2017"],
      ["Formation Amiante sous-sections 1b et 3b", "Organisme agréé", "2018"],
    ],
    permis: "Permis B",
    periodeExercice: "Du 1er septembre 2019 au 31 décembre 2024",
    accroches: [
      "Dans le cadre de la gestion des approvisionnements de mon établissement, j'ai régulièrement traité des demandes de transport pour mes fournisseurs et pour mes propres flux.",
      "Côté logistique amont, j'organisais les approvisionnements réguliers assurés par nos transporteurs contractuels.",
      "En tant que gérant, j'ai animé une équipe de dix personnes et suivi mes indicateurs de gestion au quotidien.",
    ],
    source: "CV transmis",
    adresse: "4 Allée Louis Jouvet, 94500 Champigny-sur-Marne",
    pointsForts: [
      "Encadrement et animation d'une équipe",
      "Gestion budgétaire et suivi du chiffre d'affaires",
      "Suivi d'indicateurs d'activité",
      "Contrôle des flux de marchandises",
    ],
    pointsAConsolider: [
      "Réglementation du transport routier de marchandises",
      "Tarification et calcul du prix de revient",
      "Affrètement et sous-traitance",
    ],
  },
  {
    nom: "BOUZZAOUI",
    prenom: "Yassine",
    entreprise: { nom: "Delta", service: "Exploitation bennes et matériel de chantier (Ampliroll / grue plateau)", ville: "Le Blanc-Mesnil (93)" },
    posteOccupe: "Conducteur poids lourd Ampliroll puis référent d'exploitation",
    profil:
      "Chauffeur poids lourd expérimenté, spécialisé dans la conduite de véhicules Ampliroll et de camions équipés de grue plateau, rigoureux sur les règles de sécurité et les opérations de chargement et de déchargement.",
    experiences: [
      {
        periode: "2023 – 2025",
        poste: "Conducteur poids lourd Ampliroll",
        employeur: "Delta, Le Blanc-Mesnil",
        missions: [
          "Conduite de camions Ampliroll pour le transport de bennes",
          "Chargement, transport et déchargement en toute sécurité",
          "Contrôle quotidien de l'état du véhicule et entretien de base",
        ],
      },
      {
        periode: "2021 – 2023",
        poste: "Conducteur poids lourd grue plateau",
        employeur: "MNC",
        missions: [
          "Conduite de poids lourds équipés de grue plateau",
          "Arrimage et sécurisation des charges transportées",
          "Respect des délais de livraison et des consignes de sécurité",
        ],
      },
    ],
    outils:
      "TMS d'exploitation, chronotachygraphe numérique et logiciel de téléchargement des cartes conducteurs, Excel® pour le suivi des rotations et des coûts, lettres de voiture CMR, téléphone d'exploitation",
    collegues:
      "avec le responsable d'exploitation, deux exploitants, le service atelier et une douzaine de conducteurs bennes et plateaux",
    diplomes: [
      ["Baccalauréat professionnel Électrotechnique", "Ministère de l'Éducation nationale", "2016"],
      ["Permis C et CE", "Préfecture", "2019"],
      ["FIMO Marchandises", "Centre de formation agréé", "2019"],
    ],
    permis: "Permis B, C, CE",
    periodeExercice: "Du 1er janvier 2021 au 31 juillet 2025",
    accroches: [
      "Venu du terrain puis passé en appui exploitation, je chiffrais et j'organisais les rotations de bennes et de matériel de chantier.",
      "Je pilotais les rotations récurrentes de nos partenaires affrétés sur les chantiers franciliens.",
      "Avec le responsable d'exploitation, j'ai participé au suivi des coûts et des consommations de la flotte.",
    ],
    source: "CV transmis",
    adresse: "Le Blanc-Mesnil (93)",
    pointsForts: [
      "Sécurité des opérations de chargement et de déchargement",
      "Arrimage et sécurisation des charges",
      "Entretien et contrôle du véhicule",
      "Gestion d'itinéraire et respect des délais",
    ],
    pointsAConsolider: [
      "Conception d'une prestation de transport",
      "Calcul des coûts de revient",
      "Recours à la sous-traitance et à l'affrètement",
    ],
  },
  {
    nom: "DAHOUM",
    prenom: "Anis",
    entreprise: { nom: "Avitair", service: "Exploitation citerne et logistique aéroportuaire", ville: "Le Bourget / Roissy CDG (93-95)" },
    posteOccupe: "Conducteur SPL citerne – avitaillement et coordination de piste",
    profil:
      "Conducteur SPL titulaire des permis C et CE, formé aux matières dangereuses (ADR initial et citerne, DGR8), habitué aux environnements réglementés et aux procédures de piste.",
    experiences: [
      {
        periode: "Mai 2022 – Octobre 2023",
        poste: "Chauffeur citerne SPL – avitaillement des aéronefs en JET A1",
        employeur: "Avitair (Aéroport du Bourget) – Intérim Crit Fosses",
        missions: [
          "Avitaillement des aéronefs en carburant JET A1",
          "Application des procédures réglementaires de piste et de sûreté",
          "Tenue des documents de bord et des relevés d'avitaillement",
        ],
      },
      {
        periode: "Juin 2020 – Janvier 2022",
        poste: "Conducteur PL puis SPL",
        employeur: "Mobifret",
        missions: [
          "Transport de lots complets et partiels en régional et national",
          "Respect de la réglementation sociale européenne et des temps de conduite",
          "Contrôle des lettres de voiture et des documents de transport",
        ],
      },
      {
        periode: "Mai 2019 – Mars 2020",
        poste: "Agent de piste",
        employeur: "Groupe 3S (SFH) – Intérim Crit",
        missions: ["Chargement et déchargement d'avions", "Conduite d'engins de piste"],
      },
    ],
    outils:
      "TMS d'exploitation, chronotachygraphe numérique, documentation ADR et consignes de sécurité citerne, Excel® pour les relevés d'activité, Word® pour les comptes rendus, radio et téléphone d'exploitation",
    collegues:
      "avec le coordinateur d'exploitation, les agents de piste, le service sûreté de la plate-forme et les conducteurs citerne de l'équipe",
    diplomes: [
      ["Baccalauréat professionnel Gestion-Administration", "Ministère de l'Éducation nationale", "2016"],
      ["Formation ADR – matières dangereuses initial et citerne", "Organisme agréé", "2021"],
      ["Certification marchandises dangereuses DGR8 / Code IATA", "Organisme agréé", "2022"],
    ],
    permis: "Permis B, C, CE",
    periodeExercice: "Du 1er juin 2020 au 31 octobre 2023",
    accroches: [
      "Dans un environnement très réglementé (matières dangereuses, plate-forme aéroportuaire), j'ai participé à l'étude de faisabilité et au chiffrage des prestations.",
      "Je supervisais les navettes récurrentes de nos affrétés entre la plate-forme et la messagerie.",
      "J'ai été associé au suivi des indicateurs d'activité et des obligations réglementaires de l'équipe.",
    ],
    source: "CV transmis",
    adresse: "7 rue Louise Michel, 93440 Dugny",
    pointsForts: [
      "Transport de matières dangereuses (ADR, citerne)",
      "Application des procédures réglementaires",
      "Tenue des documents de bord et de transport",
      "Travail en environnement sous contrainte",
    ],
    pointsAConsolider: [
      "Tarification des prestations",
      "Relation avec les donneurs d'ordres",
      "Pilotage d'un trafic et suivi d'exploitation",
    ],
  },
  {
    nom: "GIMENEZ",
    prenom: "Jessica",
    entreprise: {
      nom: "Boulangerie – glacier – crêperie (gérance)",
      service: "Gérance – production, vente et encadrement de l'équipe",
      ville: "",
    },
    posteOccupe: "Gérante de commerce",
    profil:
      "J'ai dirigé pendant cinq ans deux commerces de détail : une boutique de vêtements, bijoux fantaisie et chaussures, puis une boulangerie-glacier-crêperie. J'y ai encadré une équipe, géré les achats et la caisse et suivi l'activité au quotidien. Mon parcours ne comporte pas d'expérience dans le transport : les situations relevant de l'exploitation transport ont été travaillées en centre de formation, sur le cas d'entreprise support.",
    experiences: [
      {
        periode: "2024 – 2024",
        poste: "Employée d'hôtel (ménage, repassage, réception)",
        employeur: "Hôtel à Lloret de Mar (Espagne)",
        missions: ["Entretien des chambres et repassage", "Accueil et réception des clients"],
      },
      {
        periode: "2019 – 2019",
        poste: "Agent d'entretien de bureaux",
        employeur: "Centre commercial",
        missions: ["Entretien des bureaux et des espaces communs"],
      },
      {
        periode: "2018 – 2018",
        poste: "Assistante de vie à domicile",
        employeur: "Particuliers employeurs",
        missions: ["Accompagnement des personnes à domicile"],
      },
      {
        periode: "2015 – 2018",
        poste: "Gérante de boulangerie / glacier / crêperie",
        employeur: "Boulangerie – glacier – crêperie (gérance)",
        missions: [
          "Élaboration et vente des produits",
          "Gestion de l'équipe et organisation du service",
          "Gestion des achats, des approvisionnements et de la caisse",
        ],
      },
      {
        periode: "2013 – 2015",
        poste: "Gérante de boutique de vêtements, bijoux fantaisie et chaussures",
        employeur: "Boutique de prêt-à-porter et accessoires (gérance)",
        missions: [
          "Accueil et conseil client",
          "Gestion de la caisse et des achats",
          "Présentation et mise en valeur des produits",
        ],
      },
    ],
    outils:
      "Logiciel de caisse et suivi des ventes, tableur de suivi des achats et des marges, bons de commande fournisseurs, planning de l'équipe",
    collegues:
      "avec mon équipe de vente et de production, mes fournisseurs et ma clientèle de proximité",
    diplomes: [],
    permis: "Permis B",
    periodeExercice: "Du 1er janvier 2015 au 31 décembre 2018",
    accroches: [
      "À la tête de mon commerce, j'organisais le travail de l'équipe et je répartissais les tâches de la journée.",
      "Le champ de l'exploitation transport a été travaillé en centre de formation, sur le cas d'entreprise support.",
      "En gérance de boutique, je suivais mes achats, ma caisse et mes résultats pour ajuster mes décisions.",
    ],
    source: "CV transmis",
    pointsForts: [
      "Gestion d'un commerce",
      "Encadrement d'équipe",
      "Gestion des achats et de la caisse",
      "Relation et conseil client",
      "Organisation du travail au quotidien",
    ],
    pointsAConsolider: [
      "Réglementation du transport routier de marchandises",
      "Exploitation et planification des moyens de transport",
      "Affrètement et sous-traitance",
      "Tarification des prestations de transport",
    ],
    experienceParAT: [
      "Boulangerie – glacier – crêperie (gérance)",
      "PARCOURS",
      "Boutique de prêt-à-porter et accessoires (gérance)",
    ],
  },

  {
    nom: "HACHMI",
    prenom: "Lina",
    entreprise: { nom: "Fred Logistique", service: "Administration des transports – accueil, dossiers clients et facturation", ville: "Sevran (93)" },
    posteOccupe: "Assistante secrétaire d'exploitation logistique",
    profil:
      "Titulaire d'un baccalauréat professionnel Gestion-Administration et d'un BTS Support à l'action managériale, j'ai exercé en logistique et en transport sur la gestion des appels, des dossiers clients et de la facturation.",
    experiences: [
      {
        periode: "06/05/2025 – 30/09/2025",
        poste: "Assistante secrétaire",
        employeur: "Fred Logistique, Sevran",
        missions: [
          "Gestion du flux d'appels et traitement du courrier et des mails",
          "Mise à jour des dossiers clients",
          "Classement et archivage des documents administratifs",
        ],
      },
      {
        periode: "Mars 2021 – Avril 2021",
        poste: "Stagiaire administration transport",
        employeur: "MRT Transport, Saint-Denis",
        missions: ["Réalisation de factures", "Flux d'appels téléphoniques", "Archivage des dossiers"],
      },
      {
        periode: "Novembre 2019 – Décembre 2019",
        poste: "Stagiaire exploitation",
        employeur: "Star Trans, Saint-Denis",
        missions: [
          "Flux d'appels téléphoniques et gestion du courrier",
          "Gestion des factures et planification des rendez-vous",
        ],
      },
    ],
    outils:
      "Word®, Excel® et PowerPoint®, logiciel de facturation, TMS de suivi des ordres de transport, standard téléphonique et messagerie Outlook",
    collegues:
      "avec la responsable administrative, deux exploitants transport, le service facturation et les conducteurs en contact quotidien",
    diplomes: [
      ["BTS Support à l'action managériale", "Lycée Jean Rostand", "2024"],
      ["Baccalauréat professionnel Gestion-Administration", "Lycée les Jacobins, Beauvais", "2022"],
      ["Certification Management d'unité marchande", "Organisme certificateur", "2024"],
    ],
    permis: "Permis B",
    periodeExercice: "Du 6 mai 2025 au 30 septembre 2025",
    accroches: [
      "Au sein du service administration des transports, j'ai été associée au traitement des demandes clients et à la formalisation des offres.",
      "J'ai assuré le suivi administratif des prestations confiées aux transporteurs partenaires.",
      "J'ai participé au suivi des indicateurs de l'agence et à la préparation des éléments transmis à la direction.",
    ],
    source: "CV transmis",
    adresse: "1 Allée la Boétie, 93270 Sevran",
    pointsForts: [
      "Administration des dossiers de transport",
      "Facturation et contrôle des pièces",
      "Relation client et traitement des appels",
      "Classement, archivage et traçabilité documentaire",
    ],
    pointsAConsolider: [
      "Exploitation et affectation des moyens",
      "Réglementation sociale européenne",
      "Calcul des coûts d'une prestation",
    ],
  },
  {
    nom: "HOUARI",
    prenom: "Hicham",
    entreprise: { nom: "Class'Park / ECTOR", service: "Exploitation transport national – frigo, plateau et porteur", ville: "Louvres (95)" },
    posteOccupe: "Conducteur routier SPL (permis CE) – transport national",
    profil:
      "Conducteur routier sérieux, rigoureux et polyvalent, titulaire du permis CE, de la FIMO et de l'ADR, expérimenté en environnement exigeant (Roissy CDG) et maîtrisant les véhicules frigorifiques, plateaux et porteurs.",
    experiences: [
      {
        periode: "2025 – 2026",
        poste: "Conducteur SPL frigo (transport national)",
        employeur: "Entreprise de transport national",
        missions: [
          "Transport sous température dirigée et respect de la chaîne du froid (ATP)",
          "Chargement, déchargement et arrimage sécurisé",
          "Respect de la réglementation sociale européenne",
        ],
      },
      {
        periode: "2023 – 2026",
        poste: "Agent d'exploitation / conducteur",
        employeur: "Class'Park et ECTOR – Roissy CDG",
        missions: [
          "Gestion des flux de véhicules et des rotations sur plate-forme",
          "Suivi des consignes clients et respect des créneaux",
        ],
      },
      {
        periode: "2022 – 2023",
        poste: "Chauffeur-livreur",
        employeur: "Euromatic Warning / NEWREST (Roissy CDG)",
        missions: ["Livraisons sur plate-forme aéroportuaire", "Tenue des feuilles de route"],
      },
    ],
    outils:
      "TMS d'exploitation, chronotachygraphe numérique, enregistreur de température ATP, Excel® pour le suivi des tournées, lettres de voiture CMR, téléphone d'exploitation et application de suivi",
    collegues:
      "avec le responsable d'exploitation, le chef de quai, les conducteurs de l'équipe et les correspondants qualité des clients",
    diplomes: [
      ["Baccalauréat STMG", "Ministère de l'Éducation nationale", "2017"],
      ["Permis C, CE et FIMO", "Préfecture / centre agréé", "2024"],
      ["ADR de base et R490 bras de grue auxiliaire", "Organisme agréé", "2024"],
    ],
    permis: "Permis B, A, C, CE",
    periodeExercice: "Du 1er janvier 2023 au 30 juin 2026",
    accroches: [
      "Sur des flux nationaux sous température dirigée, j'ai été associé à l'étude de faisabilité et au chiffrage des transports.",
      "J'ai suivi des rotations régulières sur plate-forme, en propre et en sous-traitance.",
      "J'ai contribué au suivi de la consommation, de la ponctualité et des coûts de la flotte.",
    ],
    source: "CV transmis",
    adresse: "95390 Louvres",
    pointsForts: [
      "Réglementation des temps de conduite et de repos",
      "Respect de la chaîne du froid (ATP)",
      "Arrimage et sécurisation des charges",
      "Adaptation des matériels et des remorques à la marchandise",
    ],
    pointsAConsolider: [
      "Conception d'une prestation de transport",
      "Tarification et remise d'offre",
      "Suivi des indicateurs de rentabilité",
    ],
  },
  {
    nom: "KACIMI",
    prenom: "Lahcen",
    adresse: "74100 Vétraz-Monthoux",
    entreprise: { nom: "GIANT TRANSPORTS", service: "Service commercial et exploitation – relation clients et litiges", ville: "Paris" },
    posteOccupe: "Responsable commercial transport",
    profil:
      "Titulaire d'un BTS Gestion des transports et logistique associée, j'ai exercé comme responsable commercial dans le transport et le déménagement : construction du planning commercial, réponse aux demandes clients, résolution des litiges et visites en clientèle. Je pratique couramment l'anglais et l'espagnol.",
    experiences: [
      {
        periode: "Septembre 2022 – Mars 2024",
        poste: "Responsable commercial",
        employeur: "GIANT TRANSPORTS, Paris",
        missions: [
          "Élaboration et suivi du planning commercial",
          "Réponse aux demandes des clients et remise des offres",
          "Résolution des litiges et suivi de la satisfaction",
          "Visites commerciales et prospection",
        ],
      },
      {
        periode: "Février 2021 – Septembre 2022",
        poste: "Responsable commercial puis déménageur",
        employeur: "ANK Déménagement",
        missions: [
          "Devis et organisation des prestations de déménagement",
          "Coordination des équipes et des moyens sur les chantiers",
        ],
      },
      {
        periode: "2022 – 2024",
        poste: "Voiturier-bagagiste",
        employeur: "Sofitel, Paris",
        missions: ["Gestion des mouvements de véhicules", "Relation client haut de gamme"],
      },
    ],
    outils:
      "TMS d'exploitation, Excel® (planning commercial, suivi des litiges, tarifs), Word® pour les offres et les courriers, messagerie Outlook, téléphonie professionnelle",
    collegues:
      "avec la direction commerciale, les exploitants, le service facturation, les clients donneurs d'ordres et les transporteurs partenaires",
    diplomes: [
      ["BTS Gestion des transports et logistique associée", "Lycée Martin Nadaud", "2022"],
      ["Baccalauréat", "Ministère de l'Éducation nationale", "2020"],
      ["Attestation de formation – Anglais professionnel", "Organisme agréé", "2023"],
    ],
    permis: "Permis B",
    periodeExercice: "Du 1er février 2021 au 31 mars 2024",
    accroches: [
      "Au service commercial, j'ai traité les demandes clients de l'étude de faisabilité jusqu'à la remise de l'offre chiffrée.",
      "J'ai suivi les prestations confiées à nos transporteurs partenaires et traité les litiges associés.",
      "J'ai construit le planning commercial et suivi les indicateurs de satisfaction et de réclamation.",
    ],
    source: "CV transmis",
    pointsForts: [
      "Relation avec les donneurs d'ordres et prospection",
      "Traitement des litiges et des réclamations",
      "Construction et suivi d'un planning",
      "Élaboration d'une offre commerciale de transport",
      "Communication professionnelle en anglais",
    ],
    pointsAConsolider: [
      "Encadrement au quotidien d'une équipe de conducteurs",
      "Supervision des opérations de traction, groupage et camionnage",
    ],
  },
  {
    nom: "LEMAITRE",
    prenom: "Alexandre",
    adresse: "93700 Drancy",
    entreprise: {
      nom: "LSR LOGISTIC / K.D.S / BUSINESS CORE",
      service: "Direction – transport et logistique, exploitation et développement commercial",
      ville: "Drancy (93)",
    },
    posteOccupe: "Chef d'entreprise – transport et logistique",
    profil:
      "Conducteur livreur devenu chef d'équipe puis chef d'entreprise, j'ai encadré au quotidien des équipes de conducteurs, organisé les tournées et leur continuité, géré les remplacements et transporté des matières sensibles soumises à réglementation. Je dirige aujourd'hui trois structures de transport et de logistique.",
    experiences: [
      {
        periode: "2024 – 2026",
        poste: "Chef d'entreprise, fondateur et dirigeant",
        employeur: "LSR LOGISTIC / K.D.S / BUSINESS CORE",
        missions: [
          "Développement commercial et relation avec les donneurs d'ordres",
          "Organisation des tournées et affectation des moyens",
          "Encadrement des équipes et pilotage de l'activité",
        ],
      },
      {
        periode: "2019 – 2024",
        poste: "Chauffeur livreur matières radioactives",
        employeur: "ISOVITAL-ISOLIFE",
        missions: [
          "Livraison de produits radioactifs auprès des établissements hospitaliers sur toute la France",
          "Application des procédures de sécurité et de la réglementation du transport de matières sensibles",
          "Tenue des documents de transport et des relevés d'activité",
        ],
      },
      {
        periode: "Avril 2019 – Mai 2019",
        poste: "Livreur en carburant",
        employeur: "THANK YOU",
        missions: ["Livraison de carburant", "Respect des consignes de sécurité au dépotage"],
      },
      {
        periode: "2017 – 2019",
        poste: "Chauffeur livreur puis chef d'équipe",
        employeur: "GEODIS EUROMATIC",
        missions: [
          "Supervision de la logistique quotidienne",
          "Suivi de l'activité de l'équipe de conducteurs",
          "Organisation des remplacements des chauffeurs absents et continuité des tournées",
        ],
      },
      {
        periode: "2011 – 2016",
        poste: "Chauffeur livreur matières radioactives",
        employeur: "ISOVITAL-ISOLIFE",
        missions: [
          "Livraison de produits radioactifs auprès des établissements de santé",
          "Contrôle des colis et respect des procédures de sûreté",
        ],
      },
    ],
    outils:
      "Planning d'exploitation et feuilles de tournée, chronotachygraphe et cartes conducteurs, documents de transport de matières sensibles, Excel® pour le suivi d'activité, téléphone d'exploitation",
    collegues:
      "avec mon équipe de conducteurs, les clients hospitaliers et industriels, les services de sûreté des sites livrés et mes partenaires transporteurs",
    diplomes: [
      ["BAC+1", "École de Richeval, Morne-à-l'Eau (Guadeloupe)", "2012"],
      ["BEP Finition", "École de Richeval, Morne-à-l'Eau (Guadeloupe)", "2009"],
    ],
    permis: "Permis B, C",
    periodeExercice: "Du 1er janvier 2024 au 31 décembre 2026",
    accroches: [
      "Comme chef d'équipe, j'encadrais au quotidien les conducteurs, j'organisais les remplacements et j'assurais la continuité des tournées.",
      "Sur le transport de matières sensibles, je conduisais les livraisons hospitalières dans un cadre réglementaire strict.",
      "À la tête de mes structures, je développe le portefeuille clients et je pilote l'exécution des tournées.",
    ],
    source: "CV transmis",
    pointsForts: [
      "Encadrement au quotidien d'une équipe de conducteurs",
      "Organisation et continuité des tournées",
      "Gestion des remplacements de conducteurs",
      "Transport de matières sensibles et réglementation associée",
      "Développement commercial",
      "Direction d'une entreprise de transport",
    ],
    pointsAConsolider: [
      "Tarification et calcul du prix de revient",
      "Contractualisation de la sous-traitance",
      "Reconstitution des indicateurs de performance",
    ],
    experienceParAT: ["GEODIS EUROMATIC", "ISOVITAL-ISOLIFE", "LSR LOGISTIC / K.D.S / BUSINESS CORE"],
  },
  {
    nom: "MANSEUR",
    prenom: "Mehdi",
    adresse: "3 traverse Beaulieu, Les Résidences de Bompard, 13007 Marseille",
    entreprise: {
      nom: "Chantier Naval de Marseille",
      service: "Coordination logistique – planning, arrivages et expéditions",
      ville: "Marseille (13)",
    },
    posteOccupe: "Coordinateur logistique – CACES 1-3-4-5",
    profil:
      "Coordinateur logistique titulaire des CACES 1-3-4-5, j'ai organisé et animé le travail d'une équipe, réalisé les plannings, organisé les arrivages, les réceptions et les expéditions, suivi l'état des stocks et établi les devis et coûts de manutention et de transport. Je pratique l'espagnol, l'anglais et l'arabe.",
    experiences: [
      {
        periode: "2017 – 2019",
        poste: "Coordinateur logistique",
        employeur: "Chantier Naval de Marseille",
        missions: [
          "Organisation et animation du travail de l'équipe, réalisation du planning",
          "Organisation des arrivages, de la réception et de l'expédition des marchandises",
          "Gestion des imprévus et anticipation des anomalies, suivi de l'état des stocks",
          "Établissement des devis et des coûts de manutention et de transport",
        ],
      },
      {
        periode: "2015 – 2017",
        poste: "Cariste de production",
        employeur: "Saint-Gobain PAM, Brasserie de Champigneulles, usine Coca-Cola",
        missions: [
          "Préparation et exécution des commandes de production",
          "Contrôle de l'état des chargements et des règles liées",
          "Application des techniques du transport et de leur réglementation",
        ],
      },
      {
        periode: "2006 – 2015",
        poste: "Cariste, agent de quai, magasinier puis commercial",
        employeur: "Postes successifs en logistique et en distribution",
        missions: [
          "Réception, quai et magasinage",
          "Préparation de commandes et contrôle des chargements",
          "Relation client et vente",
        ],
      },
    ],
    outils:
      "Logiciels de gestion de stocks, tableur de devis et de coûts de manutention, planning d'équipe, bons de réception et d'expédition, chariots CACES 1-3-4-5",
    collegues:
      "avec l'équipe de caristes et d'agents de quai, le service achats, les transporteurs livreurs et les clients internes du chantier",
    diplomes: [
      ["CACES catégories 1, 3, 4 et 5", "Organisme agréé", "2015"],
      ["Attestation de coordination logistique", "Chantier Naval de Marseille", "2019"],
    ],
    permis: "Permis B, CACES 1-3-4-5",
    periodeExercice: "Du 1er janvier 2017 au 31 décembre 2019",
    accroches: [
      "Comme coordinateur logistique, je réalisais le planning et j'affectais les moyens de manutention et de transport à la charge de la semaine.",
      "J'animais et supervisais l'équipe de quai et de caristes sur les arrivages et les expéditions.",
      "Je suivais l'état des stocks, les devis et les coûts de manutention pour préconiser des mesures correctives.",
    ],
    source: "CV transmis",
    pointsForts: [
      "Réalisation du planning et affectation des moyens",
      "Animation et supervision d'une équipe",
      "Organisation des arrivages, réceptions et expéditions",
      "Contrôle de l'état des chargements",
      "Gestion des imprévus et anticipation des anomalies",
      "Établissement des devis et des coûts de manutention et de transport",
    ],
    pointsAConsolider: [
      "Affrètement",
      "Contractualisation de la sous-traitance",
      "Réglementation sociale des conducteurs",
    ],
    experienceParAT: ["Chantier Naval de Marseille", "Saint-Gobain PAM", "Chantier Naval de Marseille"],
  },

  {
    nom: "SELHAOUI",
    prenom: "Ilyes",
    entreprise: { nom: "Momservice", service: "Gestion de parc et exploitation des tournées de livraison", ville: "Bobigny (93)" },
    posteOccupe: "Gestionnaire de parc et chauffeur-livreur (transport sensible)",
    profil:
      "Chauffeur livreur expérimenté et polyvalent, ayant exercé dans la livraison pharmaceutique sous contraintes strictes ainsi que dans l'alimentaire, avec une expérience récente en gestion de parc automobile.",
    experiences: [
      {
        periode: "Avril 2026 – Juillet 2026",
        poste: "Gestionnaire de parc",
        employeur: "Momservice",
        missions: [
          "Suivi et entretien de la flotte de véhicules",
          "Organisation du parc, gestion des entrées/sorties et contrôle de l'état des véhicules",
        ],
      },
      {
        periode: "Janvier 2026 – Mars 2026",
        poste: "Chauffeur livreur – secteur pharmaceutique",
        employeur: "TransLs",
        missions: [
          "Transport et livraison sécurisés de produits pharmaceutiques (normes d'hygiène et de sécurité)",
          "Respect strict des horaires de passage et tenue des feuilles de route",
        ],
      },
      {
        periode: "Septembre 2025 – Décembre 2025",
        poste: "Chauffeur livreur – secteur alimentaire",
        employeur: "Sitycash",
        missions: [
          "Chargement, acheminement et livraison de marchandises alimentaires",
          "Relation client et optimisation du parcours de tournée",
        ],
      },
    ],
    outils:
      "Logiciel de gestion de parc, application de tournée et de preuve de livraison, Excel® pour le suivi des coûts d'entretien, feuilles de route, téléphone d'exploitation",
    collegues:
      "avec le responsable d'exploitation, l'atelier, les chauffeurs-livreurs de l'équipe et les clients pharmaceutiques et alimentaires",
    diplomes: [
      ["Baccalauréat STMG", "Lycée Louise Michel, Bobigny", "2018"],
      ["Permis B et A2", "Préfecture", "2019"],
      ["Attestation de formation – Transport de produits de santé", "Organisme agréé", "2026"],
    ],
    permis: "Permis B, A2",
    periodeExercice: "Du 1er septembre 2025 au 31 juillet 2026",
    accroches: [
      "Sur des flux pharmaceutiques et alimentaires très contraints, je participais au calcul des prix et au montage des tournées.",
      "J'ai suivi les tournées régulières et les prestataires intervenant sur notre périmètre.",
      "En gestion de parc, j'ai suivi les coûts d'entretien, la disponibilité des véhicules et les échéances réglementaires.",
    ],
    source: "CV transmis",
    adresse: "93000 Bobigny",
    pointsForts: [
      "Gestion de parc et des moyens matériels",
      "Transport sous contrainte (pharmaceutique, alimentaire)",
      "Optimisation des tournées de livraison",
      "Tenue des feuilles de route et preuves de livraison",
    ],
    pointsAConsolider: [
      "Conception d'une prestation de transport",
      "Recours à la sous-traitance",
      "Tarification et calcul du prix de vente",
    ],
  },
];

const BY_NOM = new Map(P.map((p) => [p.nom.toUpperCase(), p]));

/**
 * Profil de secours : aucun contenu inventé. Un candidat non répertorié
 * ressort explicitement « à compléter » et son livret reste vide.
 */
export function fallbackGotrmProfile(nom: string, prenom: string): GotrmCvProfile {
  return {
    nom: (nom || "").toUpperCase(),
    prenom: prenom || "",
    entreprise: { nom: "", service: "", ville: "" },
    posteOccupe: "",
    profil: "",
    experiences: [],
    outils: "",
    collegues: "",
    diplomes: [],
    permis: "",
    periodeExercice: "",
    accroches: ["", "", ""],
    source: "Profil à compléter",
    pointsForts: [],
    pointsAConsolider: [],
  };
}

/** Recherche stricte : retourne `undefined` si aucun profil n'a été transmis. */
export function findGotrmProfile(nom?: string, prenom?: string): GotrmCvProfile | undefined {
  void prenom;
  return BY_NOM.get((nom || "").toUpperCase());
}

export function getGotrmProfile(nom?: string, prenom?: string): GotrmCvProfile {
  const p = BY_NOM.get((nom || "").toUpperCase());
  if (p) return p;
  return fallbackGotrmProfile(nom || "CANDIDAT", prenom || "");
}

export const GOTRM_CV_PROFILES = P;
