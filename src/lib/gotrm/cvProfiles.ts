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
  /** Source du profil */
  source: "CV transmis" | "Profil reconstitué";
}

const P: GotrmCvProfile[] = [
  {
    nom: "ATASOY",
    prenom: "Dilovan",
    entreprise: { nom: "O'MALO RESTAURATION & TRANSPORTS", service: "Gérance et logistique d'approvisionnement", ville: "Romilly-sur-Seine (10)" },
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
      "Sur la partie logistique amont, j'ai piloté des livraisons régulières confiées à des transporteurs sous contrat.",
      "En tant que gérant, j'ai animé une équipe de dix personnes et suivi mes indicateurs de gestion au quotidien.",
    ],
    source: "CV transmis",
  },
  {
    nom: "BOUZZAOUI",
    prenom: "Yassine",
    entreprise: { nom: "DELTA TRANSPORTS", service: "Exploitation bennes et matériel de chantier (Ampliroll / grue plateau)", ville: "Le Blanc-Mesnil (93)" },
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
      "Depuis le terrain puis en appui de l'exploitation, j'ai été associé au chiffrage et à l'organisation des transports de bennes et de matériel de chantier.",
      "J'ai suivi les rotations régulières confiées à des sous-traitants sur les chantiers de la région parisienne.",
      "Avec le responsable d'exploitation, j'ai participé au suivi des coûts et des consommations de la flotte.",
    ],
    source: "CV transmis",
  },
  {
    nom: "DAHOUM",
    prenom: "Anis",
    entreprise: { nom: "AVITAIR / GROUPE 3S – PLATE-FORME AÉROPORTUAIRE", service: "Exploitation citerne et logistique aéroportuaire", ville: "Le Bourget / Roissy CDG (93-95)" },
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
      "J'ai suivi les prestations régulières confiées à des sous-traitants sur la plate-forme et en messagerie.",
      "J'ai été associé au suivi des indicateurs d'activité et des obligations réglementaires de l'équipe.",
    ],
    source: "CV transmis",
  },
  {
    nom: "GIMENEZ",
    prenom: "Jessica",
    entreprise: { nom: "TRANSPORTS DELAHAYE", service: "Cellule affrètement national et administration des transports", ville: "Rungis (94)" },
    posteOccupe: "Assistante d'exploitation transport puis affréteuse",
    profil:
      "Après plusieurs années en administration des ventes, je me suis orientée vers l'exploitation transport : saisie des ordres, affrètement, suivi des sous-traitants et traitement des litiges.",
    experiences: [
      {
        periode: "Janvier 2022 – Juin 2025",
        poste: "Affréteuse",
        employeur: "Transports Delahaye, Rungis",
        missions: [
          "Recherche et négociation de sous-traitants sur bourse de fret",
          "Contrôle des pièces administratives des affrétés (licence, assurance, vigilance URSSAF)",
          "Suivi des ordres de transport et facturation client",
        ],
      },
      {
        periode: "Septembre 2018 – Décembre 2021",
        poste: "Assistante d'exploitation",
        employeur: "Groupe de messagerie régionale, Corbeil-Essonnes",
        missions: [
          "Saisie des commandes et édition des documents de transport",
          "Suivi des livraisons et information des clients",
          "Traitement de premier niveau des réclamations",
        ],
      },
    ],
    outils:
      "TMS Akanea Transport, bourse de fret B2P et Teleroute, Excel® (tarification et tableaux de bord), Word® pour les offres et les courriers, messagerie Outlook",
    collegues:
      "avec la responsable affrètement, deux exploitants, le service facturation, les sous-traitants réguliers et les donneurs d'ordres",
    diplomes: [
      ["BTS Gestion de la PME", "Ministère de l'Éducation nationale", "2017"],
      ["Attestation de formation – Réglementation sociale européenne", "Organisme agréé", "2023"],
      ["Attestation de formation – Utilisation d'un TMS", "Éditeur Akanea", "2024"],
    ],
    permis: "Permis B",
    periodeExercice: "Du 3 janvier 2022 au 30 juin 2025",
    accroches: [
      "Sur la cellule affrètement, j'ai traité quotidiennement les demandes de transport, de l'étude de faisabilité à la remise de l'offre.",
      "J'ai suivi les trafics réguliers sous-traités et la relation avec les affrétés.",
      "J'ai contribué au suivi administratif de l'équipe et au reporting mensuel de l'agence.",
    ],
    source: "Profil reconstitué",
  },
  {
    nom: "HACHMI",
    prenom: "Lina",
    entreprise: { nom: "FRED LOGISTIQUE", service: "Administration des transports – accueil, dossiers clients et facturation", ville: "Sevran (93)" },
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
  },
  {
    nom: "HOUARI",
    prenom: "Hicham",
    entreprise: { nom: "CLASS'PARK / ECTOR – ROISSY CDG", service: "Exploitation transport national – frigo, plateau et porteur", ville: "Louvres (95)" },
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
  },
  {
    nom: "KACIMI",
    prenom: "Lahcen",
    entreprise: { nom: "GROUPE HÔTELIER SOFITEL – SERVICES LOGISTIQUES", service: "Coordination des flux véhicules, bagages et livraisons", ville: "Paris / Vétraz-Monthoux (74)" },
    posteOccupe: "Coordinateur logistique et gestion de véhicules",
    profil:
      "Passionné par l'excellence du service, doté d'une expertise en gestion des bagages et des véhicules dans l'hôtellerie de luxe, j'ai développé le sens de l'organisation, de la relation client et du respect des délais.",
    experiences: [
      {
        periode: "Novembre 2022 – Mars 2024",
        poste: "Voiturier / bagagiste / concierge",
        employeur: "Sofitel Baltimore, Sofitel Arc de Triomphe, Échiquier Opéra – Paris",
        missions: [
          "Gestion des véhicules et des mouvements de parc",
          "Gestion des bagages et coordination des livraisons",
          "Réservations et relation client haut de gamme",
        ],
      },
      {
        periode: "Juillet 2024 – Août 2024",
        poste: "Employé drive",
        employeur: "Leclerc, Ville-la-Grand",
        missions: ["Préparation des commandes", "Gestion des flux du drive"],
      },
    ],
    outils:
      "Logiciel de gestion des mouvements de véhicules, Excel® pour les plannings et les états de suivi, Word® pour les comptes rendus, messagerie et téléphonie de service",
    collegues:
      "avec le chef de service, l'équipe de voituriers et bagagistes, les prestataires de livraison et les fournisseurs de l'établissement",
    diplomes: [
      ["Baccalauréat professionnel", "Ministère de l'Éducation nationale", "2015"],
      ["Attestation de formation à la sécurité (SST)", "Organisme habilité INRS", "2023"],
      ["Attestation de formation – Accueil et relation client", "Groupe hôtelier", "2023"],
    ],
    permis: "Permis B",
    periodeExercice: "Du 1er novembre 2022 au 31 mars 2024",
    accroches: [
      "Sur la coordination des flux de l'établissement, j'ai traité des demandes de transport et de livraison et comparé les offres des prestataires.",
      "J'ai suivi les prestations régulières confiées à des transporteurs partenaires.",
      "J'ai organisé le travail de l'équipe et suivi les indicateurs de qualité de service.",
    ],
    source: "CV transmis",
  },
  {
    nom: "LEMAITRE",
    prenom: "Alexandre",
    entreprise: { nom: "XPO LOGISTICS EUROPE", service: "Planning conducteurs et plans de marche – lot complet", ville: "Gennevilliers (92)" },
    posteOccupe: "Exploitant transport lot complet",
    profil:
      "Exploitant transport, j'organise au quotidien l'affectation des moyens, la construction des plans de marche et le suivi des opérations jusqu'à la clôture des dossiers.",
    experiences: [
      {
        periode: "Mars 2021 – Juillet 2025",
        poste: "Exploitant transport lot complet",
        employeur: "XPO Logistics Europe, Gennevilliers",
        missions: [
          "Affectation quotidienne de 25 à 30 ordres de transport",
          "Construction des plans de marche conformes au règlement (CE) 561/2006",
          "Suivi des aléas et information des donneurs d'ordres",
        ],
      },
      {
        periode: "Septembre 2018 – Février 2021",
        poste: "Agent d'exploitation",
        employeur: "Transporteur régional, Bonneuil-sur-Marne",
        missions: [
          "Saisie et suivi des ordres dans le TMS",
          "Contrôle des documents de transport et des retours de tournée",
        ],
      },
    ],
    outils:
      "TMS Akanea, planning partagé, logiciel de téléchargement des cartes conducteurs, Excel® (taux de remplissage, retour à vide), Word®, bourse de fret",
    collegues:
      "avec mon responsable d'exploitation, deux collègues exploitants, une assistante administrative et une quinzaine de conducteurs",
    diplomes: [
      ["BTS Gestion des transports et logistique associée", "Ministère de l'Éducation nationale", "2018"],
      ["Attestation de formation – Réglementation sociale européenne", "Organisme agréé", "2023"],
      ["Attestation de formation – Sécurité et arrimage des charges", "Organisme agréé", "2024"],
    ],
    permis: "Permis B",
    periodeExercice: "Du 1er mars 2021 au 31 juillet 2025",
    accroches: [
      "Au service exploitation lot complet, j'ai traité les demandes clients de l'étude de faisabilité jusqu'à la remise de l'offre chiffrée.",
      "J'ai piloté les trafics réguliers confiés à nos sous-traitants habituels.",
      "J'ai construit et suivi les indicateurs d'exploitation présentés chaque mois à la direction.",
    ],
    source: "Profil reconstitué",
  },
  {
    nom: "MANSEUR",
    prenom: "Mehdi",
    entreprise: { nom: "TRANSPORTS SIMONNET", service: "Exploitation frigorifique (ATP) et distribution régionale", ville: "Marseille (13)" },
    posteOccupe: "Exploitant transport frigorifique",
    profil:
      "Issu de la conduite puis passé à l'exploitation, je gère des flux sous température dirigée et la distribution régionale, avec une forte exigence sur la traçabilité et la qualité de service.",
    experiences: [
      {
        periode: "Janvier 2022 – Juin 2025",
        poste: "Exploitant transport frigorifique",
        employeur: "Transports Simonnet, Marseille",
        missions: [
          "Affectation des tournées sous température dirigée et contrôle ATP",
          "Suivi des relevés de température et des réserves à la livraison",
          "Traitement des litiges et des retours de marchandises",
        ],
      },
      {
        periode: "Septembre 2017 – Décembre 2021",
        poste: "Conducteur routier puis chef d'équipe quai",
        employeur: "Distributeur agroalimentaire régional",
        missions: [
          "Livraisons régionales en frigorifique",
          "Encadrement de l'équipe de quai au départ",
        ],
      },
    ],
    outils:
      "TMS d'exploitation, enregistreurs de température et logiciel de traçabilité ATP, logiciel de tournées, Excel® pour les tableaux de bord, lettres de voiture CMR",
    collegues:
      "avec le chef de quai, les conducteurs de distribution, le service commercial et la cellule litiges",
    diplomes: [
      ["Titre professionnel Conducteur routier de marchandises", "Ministère chargé de l'emploi", "2016"],
      ["FCO Marchandises", "Centre de formation agréé", "2024"],
      ["Attestation de formation – Hygiène et chaîne du froid (ATP)", "Organisme agréé", "2023"],
    ],
    permis: "Permis B, C, CE",
    periodeExercice: "Du 3 janvier 2022 au 30 juin 2025",
    accroches: [
      "Sur des flux sous température dirigée, j'ai étudié la faisabilité des demandes et chiffré les prestations.",
      "J'ai supervisé les tournées de distribution et les trafics confiés à des sous-traitants réguliers.",
      "J'ai suivi les coûts, la ponctualité et la qualité de service de mon périmètre.",
    ],
    source: "Profil reconstitué",
  },
  {
    nom: "SELHAOUI",
    prenom: "Ilyes",
    entreprise: { nom: "MOMSERVICE / TRANSLS", service: "Gestion de parc et exploitation des tournées de livraison", ville: "Bobigny (93)" },
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
      "Sur des livraisons sous contraintes strictes (pharmaceutique, alimentaire), j'ai été associé au chiffrage et à l'organisation des prestations.",
      "J'ai suivi les tournées régulières et les prestataires intervenant sur notre périmètre.",
      "En gestion de parc, j'ai suivi les coûts d'entretien, la disponibilité des véhicules et les échéances réglementaires.",
    ],
    source: "CV transmis",
  },
];

const BY_NOM = new Map(P.map((p) => [p.nom.toUpperCase(), p]));

/** Profil de secours pour un candidat non répertorié (aucun champ vide) */
export function fallbackGotrmProfile(nom: string, prenom: string): GotrmCvProfile {
  const idx = Math.abs(
    [...`${nom}${prenom}`].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 9973, 7),
  ) % P.length;
  const base = P[idx];
  return { ...base, nom: nom.toUpperCase(), prenom, source: "Profil reconstitué" };
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
