/**
 * MyCertif – Data : organismes, jury, stagiaires, grille de compétences, questionnaire
 * Certification RS 7302 — Techniques de prothésie ongulaire (Code NSF 336)
 */

export const ORG_FORMATION = {
  nom: "Pro Forma",
  adresse: "6 B Rue du Bas Village",
  codePostal: "35510",
  ville: "Cesson-Sévigné",
  siret: "90038394400015",
  siren: "900383944",
  nda: "53351103735",
  presidente: "Ben Abdelhadi Soufiane",
  email: "proforma.contact@yahoo.com",
  tel: "",
  rcs: "900 383 944",
};

export const ORG_CERTIFICATEUR = {
  nom: "ESCALE BEAUTY",
  adresse: "34 rue de Jemmapes",
  codePostal: "57100",
  ville: "Thionville",
  rcs: "901 474 395",
};

export const CERTIFICATION = {
  code: "RS 7302",
  intitule: "Techniques de prothésie ongulaire",
  codeNSF: "336",
  decisionDate: "24/09/2027",
};

export const JURY = [
  { nom: "TAMBA", prenom: "Cindy", fonction: "Présidente du jury" },
  { nom: "LUBANZADIO BAZU", prenom: "Noémie", fonction: "Membre du jury" },
  { nom: "BEN ABDELHADI", prenom: "Soufiane", fonction: "Représentant organisme" },
];

export interface CertifStagiaire {
  nom: string;
  prenom: string;
  dateNaissance: string; // dd/mm/yyyy
  adresse: string;
  ville: string;
  dateDebut: string; // dd/mm/yyyy — début de formation (EDOF)
  dateFin: string;   // dd/mm/yyyy — fin de formation (EDOF) = date de délivrance
  sessionDate: string; // alias de dateFin (date de jury / délivrance)
  membreJury?: string;
}

// Stagiaires réels — données extraites des exports EDOF (PRO FORMA / Academy by Djika)
export const STAGIAIRES: CertifStagiaire[] = [
  // Session du 12/03 → 18/03/2026
  { nom: "GAZENAY", prenom: "Farid", dateNaissance: "08/04/1985", adresse: "4 Rue Victor Basch", ville: "93150 LE BLANC MESNIL", dateDebut: "12/03/2026", dateFin: "18/03/2026", sessionDate: "18/03/2026", membreJury: "TAMBA Cindy" },
  { nom: "CLAUZEL", prenom: "Gwenaelle", dateNaissance: "17/09/1987", adresse: "121 Rue Du Général Leclerc", ville: "25230 SELONCOURT", dateDebut: "12/03/2026", dateFin: "18/03/2026", sessionDate: "18/03/2026", membreJury: "LUBANZADIO BAZU Noémie" },
  { nom: "VIVOT", prenom: "Melany", dateNaissance: "22/06/1993", adresse: "3 Rue Avicenne", ville: "25000 BESANCON", dateDebut: "12/03/2026", dateFin: "18/03/2026", sessionDate: "18/03/2026", membreJury: "TAMBA Cindy" },
  // Session du 12/03 → 20/03/2026
  { nom: "FUGIER", prenom: "Mathieu", dateNaissance: "11/02/1984", adresse: "30 Avenue De la Contamine", ville: "38210 TULLINS", dateDebut: "12/03/2026", dateFin: "20/03/2026", sessionDate: "20/03/2026", membreJury: "LUBANZADIO BAZU Noémie" },
  { nom: "ZETTOUTI", prenom: "Sanaa", dateNaissance: "05/11/1990", adresse: "26 Rue De Gascogne", ville: "25200 GRAND CHARMONT", dateDebut: "12/03/2026", dateFin: "20/03/2026", sessionDate: "20/03/2026", membreJury: "TAMBA Cindy" },
  { nom: "MESSAOUDI", prenom: "Tahar", dateNaissance: "19/07/1982", adresse: "18 Avenue Des Mélèzes", ville: "25200 GRAND CHARMONT", dateDebut: "12/03/2026", dateFin: "20/03/2026", sessionDate: "20/03/2026", membreJury: "LUBANZADIO BAZU Noémie" },
  // Session du 12/03 → 23/03/2026
  { nom: "BOUHADDOU", prenom: "Jamal", dateNaissance: "03/12/1981", adresse: "24 Rue Renaud de Bourgogne", ville: "25200 MONTBELIARD", dateDebut: "12/03/2026", dateFin: "23/03/2026", sessionDate: "23/03/2026", membreJury: "TAMBA Cindy" },
  { nom: "BEME", prenom: "Latifa", dateNaissance: "27/05/1988", adresse: "28 Rue Sous la Chaux", ville: "25200 MONTBELIARD", dateDebut: "12/03/2026", dateFin: "23/03/2026", sessionDate: "23/03/2026", membreJury: "LUBANZADIO BAZU Noémie" },
  { nom: "AZEGGOUAR", prenom: "Sabrina", dateNaissance: "14/08/1986", adresse: "18 B bis Rue De la Harpe", ville: "25600 SOCHAUX", dateDebut: "12/03/2026", dateFin: "23/03/2026", sessionDate: "23/03/2026", membreJury: "TAMBA Cindy" },
  // Session du 16/03 → 23/03/2026
  { nom: "HAOUES", prenom: "Farid", dateNaissance: "09/10/1983", adresse: "3 Rue Cerisiers", ville: "77100 MAREUIL LES MEAUX", dateDebut: "16/03/2026", dateFin: "23/03/2026", sessionDate: "23/03/2026", membreJury: "LUBANZADIO BAZU Noémie" },
  { nom: "ZUINE", prenom: "Zineb", dateNaissance: "06/03/1991", adresse: "16 Rue Emmanuel Vinson", ville: "93700 DRANCY", dateDebut: "16/03/2026", dateFin: "23/03/2026", sessionDate: "23/03/2026", membreJury: "TAMBA Cindy" },
  // Session du 16/03 → 24/03/2026
  { nom: "ABERAOUZE", prenom: "Fahd", dateNaissance: "21/01/1989", adresse: "14 Avenue Du Huit Mai", ville: "25400 AUDINCOURT", dateDebut: "16/03/2026", dateFin: "24/03/2026", sessionDate: "24/03/2026", membreJury: "LUBANZADIO BAZU Noémie" },
  { nom: "SERRAJI", prenom: "Hanan", dateNaissance: "12/04/1985", adresse: "20 Rue De la Martinique", ville: "60100 CREIL", dateDebut: "16/03/2026", dateFin: "24/03/2026", sessionDate: "24/03/2026", membreJury: "TAMBA Cindy" },
  { nom: "SERRAJI", prenom: "Mourad", dateNaissance: "30/06/1980", adresse: "20 Rue De la Martinique", ville: "60100 CREIL", dateDebut: "16/03/2026", dateFin: "24/03/2026", sessionDate: "24/03/2026", membreJury: "LUBANZADIO BAZU Noémie" },
  { nom: "ADJERIT", prenom: "Sofiane", dateNaissance: "02/02/1992", adresse: "29 Rue Robert Schuman", ville: "60100 CREIL", dateDebut: "16/03/2026", dateFin: "24/03/2026", sessionDate: "24/03/2026", membreJury: "TAMBA Cindy" },
  // Session du 16/03 → 27/03/2026
  { nom: "ARAUJO", prenom: "Bruno", dateNaissance: "15/05/1987", adresse: "5 Rue Du Chêne Prieur", ville: "77127 LIEUSAINT", dateDebut: "16/03/2026", dateFin: "27/03/2026", sessionDate: "27/03/2026", membreJury: "LUBANZADIO BAZU Noémie" },
  { nom: "BORGES-CARVALHO", prenom: "Sylvia", dateNaissance: "23/09/1986", adresse: "88 Rue Victor Renelle", ville: "93240 STAINS", dateDebut: "16/03/2026", dateFin: "27/03/2026", sessionDate: "27/03/2026", membreJury: "TAMBA Cindy" },
];

// Grille d'évaluation : 10 compétences avec critères (extrait fidèle du référentiel RS 7302)
export interface Critere {
  texte: string;
  acquis: boolean;
}
export interface Competence {
  num: number;
  titre: string;
  description: string;
  criteres: Critere[];
}

export const COMPETENCES: Competence[] = [
  {
    num: 1, titre: "C1 — Accueillir le client",
    description: "en favorisant une relation de confiance, en établissant un dialogue par des questions sur les souhaits et attentes (forme, longueur, couleur, déco), en prenant en compte l'état des ongles naturels et les éventuelles contre-indications, en l'informant sur les procédures (gel, acrygel…), en prenant en compte les éventuelles situations de handicap, en validant la faisabilité de la prestation afin de proposer une prestation adaptée.",
    criteres: [
      { texte: "Le candidat demande les habitudes de la cliente", acquis: true },
      { texte: "Identifie ses attentes (forme, longueur, déco)", acquis: true },
      { texte: "Vérifie l'état des ongles : santé, solidité", acquis: true },
      { texte: "Valide la faisabilité de la prestation et remplit une fiche diagnostique", acquis: true },
      { texte: "Communique des informations exhaustives : étapes, prix", acquis: true },
      { texte: "Posture accueillante (sourire, empathie)", acquis: true },
    ],
  },
  {
    num: 2, titre: "C2 — Préparer l'espace de travail",
    description: "en choisissant les produits adaptés à la demande, en agençant outils sur le plan de travail, en ajustant l'environnement matériel au client (handicap si applicable), afin d'optimiser l'espace et faciliter la prestation.",
    criteres: [
      { texte: "Outils adaptés à la prestation choisie", acquis: true },
      { texte: "Prépare les consommables adaptés", acquis: true },
      { texte: "Se positionne en respectant une bonne ergonomie", acquis: true },
      { texte: "Prend en compte les besoins spécifiques de la cliente (situation de handicap)", acquis: true },
    ],
  },
  {
    num: 3, titre: "C3 — Respecter le protocole d'hygiène et sécurité",
    description: "en vérifiant l'état de fonctionnement des outils, en se protégeant par les EPI appropriés, en désinfectant le poste avant et après la prestation, en stérilisant le matériel, en désinfectant les mains du client, afin de travailler dans des conditions d'hygiène optimales.",
    criteres: [
      { texte: "Nettoie son poste de travail (lampe LED, périmètre, sol)", acquis: true },
      { texte: "Utilise les produits d'hygiène adaptés (NF)", acquis: true },
      { texte: "Stérilise les outils (autoclave / bac ultrason)", acquis: true },
      { texte: "Porte les EPI appropriés (masque, gants si nécessaire)", acquis: true },
      { texte: "Désinfecte les mains du client avant la prestation", acquis: true },
    ],
  },
  {
    num: 4, titre: "C4 — Préparer l'ongle naturel du client",
    description: "en repoussant les cuticules, en limant le bord libre si nécessaire, en matifiant la plaque (le lit) des ongles, en dépoussiérant les ongles, de façon à garantir une meilleure adhérence du soin.",
    criteres: [
      { texte: "Choisit la lime adaptée (taille, grain)", acquis: true },
      { texte: "Repousse les cuticules correctement", acquis: true },
      { texte: "Matifie l'ongle (gestes adaptés, confort du client)", acquis: true },
      { texte: "Dépoussière les ongles avant pose", acquis: true },
    ],
  },
  {
    num: 5, titre: "C5 — Maîtriser les techniques de pose",
    description: "en sélectionnant la technique adaptée (chablon, capsules, tips), en positionnant correctement le support, en réalisant la mise en forme, afin d'obtenir une structure solide et esthétique.",
    criteres: [
      { texte: "Positionne correctement le chablon par rapport à l'ongle", acquis: true },
      { texte: "Découpe le chablon en cas de besoin", acquis: true },
      { texte: "Choisit la technique adaptée (capsules, tips, chablon)", acquis: true },
      { texte: "Respecte la forme et la longueur souhaitée", acquis: true },
    ],
  },
  {
    num: 6, titre: "C6 — Procéder à la construction de la prothésie",
    description: "en appliquant le Primer ou Nail Prep en fine couche, le gel de base, le gel de construction et le gel de finition, en respectant les temps de catalysation, sans déborder sur les replis latéraux ni les cuticules.",
    criteres: [
      { texte: "Applique Primer / Nail Prep en fine couche", acquis: true },
      { texte: "Applique le gel de base sans déborder", acquis: true },
      { texte: "Construction : ne touche pas les cuticules ni les replis latéraux", acquis: true },
      { texte: "Catalyse 2× 60 secondes", acquis: true },
      { texte: "Applique le gel de finition en couche moyenne", acquis: true },
    ],
  },
  {
    num: 7, titre: "C7 — Réaliser la décoration (nail-art, 3D, stickers)",
    description: "en sélectionnant les techniques adaptées (peinture, stickers, bijoux 3D), en respectant l'harmonie du design, en utilisant la quantité de colle appropriée, afin d'offrir un résultat esthétique et durable.",
    criteres: [
      { texte: "La technique 3D (bijoux, stickers) : relief visible, design harmonieux", acquis: true },
      { texte: "Quantité de colle adaptée", acquis: true },
      { texte: "Respecte l'harmonie du design avec les souhaits du client", acquis: true },
    ],
  },
  {
    num: 8, titre: "C8 — Maîtriser les techniques de remplissage",
    description: "en effectuant la dépose de l'ancienne couleur, en limant l'ancien gel, en préparant à nouveau l'ongle et en réalisant le remplissage selon les standards de qualité, afin d'assurer la longévité de la pose.",
    criteres: [
      { texte: "Toutes les étapes de remplissage sont réalisées", acquis: true },
      { texte: "Dépose : lime l'ancienne couleur, l'ancien gel, laisse une fine couche", acquis: true },
      { texte: "Préparation : repousse cuticules, nettoie l'ongle des poussières", acquis: true },
      { texte: "Remplissage : couche d'épaisseur suffisante", acquis: true },
    ],
  },
  {
    num: 9, titre: "C9 — Effectuer les soins de finition",
    description: "en appliquant l'huile à cuticules et la crème hydratante, en respectant les zones à traiter, afin d'apporter le confort et l'hydratation nécessaires à la cliente.",
    criteres: [
      { texte: "Applique la bonne quantité d'huile cuticule sans déborder", acquis: true },
      { texte: "Applique la crème hydratante de façon homogène", acquis: true },
    ],
  },
  {
    num: 10, titre: "C10 — Conseiller et informer sur les soins post-prestation",
    description: "en indiquant les techniques d'entretien adaptées et les précautions à prendre, afin de préserver les ongles dans la durée.",
    criteres: [
      { texte: "Précise les gestes adaptés et les contre-indications", acquis: true },
      { texte: "Le discours est clair et structuré", acquis: true },
      { texte: "Donne les conseils de remplissage et la fréquence recommandée", acquis: true },
    ],
  },
];

// Questionnaire RS 7302 — questions + réponses types (audit-ready)
// Variantes de réponse par question (3 formulations différentes par question)
// Choisies selon (stagiaireIdx + questionIdx) % 3 pour varier d'une candidate à l'autre.
export const QUESTIONNAIRE_VARIANTES: string[][] = [
  // Q1 - Nouvelle cliente
  [
    "Ses habitudes (fréquence, type de produit utilisé), ses attentes (forme, longueur, déco), l'état de ses ongles, ses allergies éventuelles et son métier (impact sur la résistance attendue).",
    "Je commence par lui demander si elle a déjà eu des poses, quelle technique elle préfère (gel, acrygel, capsules), si elle a des allergies ou problèmes de santé, et son rythme de vie pour adapter la longueur.",
    "Je lui pose des questions sur son historique de poses, ses goûts (formes/couleurs), d'éventuelles contre-indications médicales (grossesse, allergies HEMA), et son budget pour orienter le choix de la prestation.",
  ],
  // Q2 - Tache verdâtre / greenie
  [
    "C'est une bactérie pseudomonas (greenie). Je dépose entièrement le gel, je désinfecte l'ongle, je ne repose pas immédiatement et j'oriente la cliente vers un dermatologue.",
    "Il s'agit du « greenie », infection bactérienne due à de l'humidité piégée. Je retire toute la pose, je désinfecte à l'alcool, je laisse l'ongle respirer et je recommande une consultation médicale avant toute nouvelle pose.",
    "C'est une mycobactérie (pseudomonas aeruginosa). Dépose complète obligatoire, désinfection minutieuse, pas de repose tant que la tache n'a pas disparu, et orientation vers un médecin si elle persiste.",
  ],
  // Q3 - French capsules
  [
    "Après la construction et la mise en forme du gel, avant le gel de finition. La french se réalise sur la couche de construction limée et matifiée.",
    "Une fois la capsule posée, l'architecture réalisée et la forme limée, je matifie puis j'applique la french avant le top coat de finition.",
    "Sur la couche de construction limée et matifiée, juste avant le gel de finition, pour que le sourire soit protégé sous le top coat.",
  ],
  // Q4 - Construction sur ongles naturels
  [
    "Après la préparation de l'ongle (cuticules, matification, dépoussiérage), l'application du Primer/Nail Prep, et le gel de base catalysé.",
    "Une fois le primer appliqué et le gel de base catalysé sous lampe, je pose le gel de construction pour sculpter l'architecture.",
    "Après préparation complète : repousse cuticules, matification, dégraissage au cleaner, primer, puis base catalysée — la construction vient ensuite.",
  ],
  // Q5 - Compétences prothésiste
  [
    "Maîtrise des techniques de pose (gel, acrygel, capsules), connaissance de l'anatomie de l'ongle et des pathologies, sens du conseil, rigueur d'hygiène, créativité et gestion de la relation client.",
    "Techniques de pose et de remplissage, connaissance des produits et des pathologies unguéales, hygiène irréprochable, écoute, créativité (nail-art) et gestion d'une activité indépendante.",
    "Compétences techniques (architecture, formes, nail-art), théoriques (anatomie, hygiène, pathologies), commerciales (accueil, conseil, fidélisation) et entrepreneuriales (gestion, communication).",
  ],
  // Q6 - Refuser cliente
  [
    "Toute cliente présentant une mycose, une infection bactérienne (greenie), un psoriasis sévère, des ongles décollés (onycholyse), ou enceinte si solvants forts utilisés sans ventilation. Orienter vers un médecin.",
    "Cliente avec pathologie unguéale active (mycose, panaris, paronychie), allergie déclarée aux composants, ou plaie ouverte. Refus poli et orientation vers un dermatologue.",
    "Mycose, greenie, psoriasis sur les mains, onycholyse, allergie HEMA connue, ou femme enceinte au premier trimestre si extraction puissante prévue : refuser et orienter vers un professionnel de santé.",
  ],
  // Q7 - Lunule
  [
    "La lunule. C'est la partie visible de la matrice de l'ongle.",
    "Cette demi-lune blanche s'appelle la lunule, c'est la partie superficielle de la matrice.",
    "C'est la lunule, zone visible de la matrice qui produit la kératine de l'ongle.",
  ],
  // Q8 - Sous les cuticules
  [
    "L'éponychium (peau vivante qui protège la matrice) et la matrice elle-même qui produit la kératine.",
    "On trouve l'éponychium et la matrice, qui est la zone de fabrication de l'ongle.",
    "La matrice (zone germinative) protégée par l'éponychium ; il ne faut jamais l'endommager au risque de marquer définitivement l'ongle.",
  ],
  // Q9 - Plaque
  [
    "C'est la partie dure et visible de l'ongle composée de kératine. On l'appelle aussi 'tablette unguéale' ou 'corps de l'ongle'.",
    "La plaque, ou tablette unguéale, est la partie kératinisée visible de l'ongle.",
    "Composée de kératine, c'est la tablette unguéale (corpus unguis) — la surface dure sur laquelle on travaille.",
  ],
  // Q10 - Préparation ongles naturels
  [
    "Repousser les cuticules, limer le bord libre, matifier la plaque avec un buffer, dépoussiérer à la brosse, dégraisser au Cleaner.",
    "Cuticules repoussées au repousse-cuticule, bord libre limé à la forme voulue, matification douce de la plaque, dépoussiérage et nettoyage au cleaner.",
    "Étapes : repousse des cuticules, mise en forme du bord libre, matification de la plaque, dépoussiérage soigneux, dégraissage au cleaner avant primer.",
  ],
  // Q11 - Délai remplissage
  [
    "En moyenne toutes les 3 à 4 semaines selon la pousse de l'ongle.",
    "Toutes les 3 semaines pour une pose qui reste impeccable, jusqu'à 4 semaines maximum.",
    "Entre 3 et 4 semaines selon la rapidité de pousse de la cliente et la sollicitation des mains.",
  ],
  // Q12 - Onycholyse
  [
    "Il s'agit d'une onycholyse (décollement de l'ongle). Je ne pose pas sur cette zone, je désinfecte et je conseille une consultation chez un dermatologue.",
    "C'est un début d'onycholyse. Pas de pose sur la zone décollée, désinfection, et orientation vers un dermatologue pour identifier la cause (choc, mycose, médicament).",
    "Onycholyse : décollement de la tablette unguéale du lit. Je n'applique aucun produit dessus, je désinfecte, et j'oriente la cliente vers un médecin.",
  ],
  // Q13 - Ongles colorés
  [
    "C'est probablement une coloration due à un vernis foncé porté longtemps sans base. Réaliser un soin éclaircissant et toujours appliquer une base avant un vernis pigmenté.",
    "Tâche due à des pigments de vernis foncés sans base protectrice. Soin éclaircissant doux, et systématiquement une base avant tout vernis pigmenté.",
    "Coloration des pigments dans la kératine. Je propose un soin blanchissant et je rappelle qu'une base coat est indispensable avant un vernis foncé.",
  ],
  // Q14 - Cuticules rouges
  [
    "Probablement une paronychie (inflammation/infection de la cuticule). Ne pas réaliser la prestation, désinfecter, orienter vers un médecin.",
    "Une paronychie (panaris), inflammation des replis. Refus de la prestation, désinfection, et orientation médicale.",
    "Inflammation infectieuse type paronychie. Je ne touche pas, je désinfecte la zone et j'envoie la cliente consulter rapidement.",
  ],
  // Q15 - Après gel construction
  [
    "Catalyser sous lampe LED/UV (60 secondes minimum), puis limer la forme, matifier, dépoussiérer et passer au gel de finition.",
    "Catalysation sous lampe, puis sculpture/limage de la forme, matification, dépoussiérage et application du top coat.",
    "Polymérisation sous LED, limage de l'architecture, matification douce, dépoussiérage à la brosse puis gel de finition catalysé.",
  ],
  // Q16 - Doigts fins
  [
    "Une forme amande, ovale ou stiletto qui allonge visuellement le doigt et féminise la main.",
    "Forme amande ou ovale pour féminiser et allonger le doigt sans le déséquilibrer.",
    "Privilégier l'amande ou l'ovale. La forme carrée alourdirait visuellement la main.",
  ],
  // Q17 - Hygiène et sécurité
  [
    "Désinfection systématique du poste, stérilisation des outils, port des EPI (masque FFP2, gants), aspiration des poussières, ventilation, gestion des déchets, formation continue.",
    "Poste désinfecté entre chaque cliente, outils stérilisés (autoclave/ultrasons), EPI obligatoires, aspiration et ventilation, traçabilité des déchets, veille réglementaire.",
    "Hygiène stricte : désinfection, stérilisation, EPI (masque FFP2, gants nitrile, lunettes), aspiration des poussières, ventilation, gestion des DASRI et formation régulière.",
  ],
  // Q18 - Choix produits
  [
    "Marques professionnelles aux normes CE/NF, composition surveillée (sans HEMA si possible, sans Toluène), respect des fiches techniques, privilégier les produits hypoallergéniques.",
    "Toujours du matériel pro normé CE, fiches de données de sécurité disponibles, sans HEMA ni MMA, et adaptés à la sensibilité des clientes.",
    "Marques reconnues, composition saine (HEMA-free de préférence), MMA proscrit, respect des MAJ produits et formation aux gammes choisies.",
  ],
  // Q19 - Protéger soi/clientes
  [
    "Pour soi : masque FFP2, lunettes, gants nitrile, aspiration. Pour la cliente : désinfection des mains, lunettes lors du meulage, vérification des allergies, fiche diagnostique signée.",
    "EPI complets côté pro (masque, lunettes, gants), désinfection des mains et fiche client signée côté cliente, ventilation et aspiration côté poste.",
    "Côté praticienne : FFP2, gants, lunettes. Côté cliente : mains désinfectées, lunettes pendant le ponçage, fiche allergies remplie. Côté local : ventilation et aspirateur de poussières.",
  ],
  // Q20 - Mycose
  [
    "Ongle jauni, épaissi, cassant, parfois décollé. Refuser la pose, conseiller une consultation médicale, traitement antifongique, attendre la guérison complète.",
    "Aspect jaunâtre, épaississement, friabilité. Pas de pose, orientation dermatologue, antifongique prescrit, retour seulement après guérison totale.",
    "Couleur jaune/blanche, ongle qui s'effrite ou se décolle. Refus catégorique, orientation médicale et reprise de pose uniquement sur ongle sain.",
  ],
  // Q21 - Conseils post-traitement
  [
    "Hydrater quotidiennement les cuticules à l'huile, porter des gants pour les tâches ménagères, ne pas utiliser les ongles comme outils, remplissage toutes les 3-4 semaines, ne jamais arracher la pose.",
    "Huile à cuticules tous les soirs, gants pour le ménage et la vaisselle, pas d'outil avec les ongles, remplissage régulier, jamais d'arrachage qui abîmerait la matrice.",
    "Hydratation quotidienne, port de gants pour les produits agressifs, respect du planning de remplissage (3-4 semaines), aucune dépose sauvage, et venir en cabine si décollement.",
  ],
];

export const QUESTIONNAIRE: { question: string; reponse: string }[] = [
  { question: "Quelles questions dois-je poser à une nouvelle cliente ?", reponse: "Ses habitudes (fréquence des poses, type de gel utilisé), ses attentes (forme, longueur, couleur, déco), l'état de ses ongles, ses éventuelles allergies ou contre-indications, son métier (impact sur la résistance attendue)." },
  { question: "Lors d'un remplissage, je m'aperçois qu'une tache verdâtre est sous le gel, que dois-je faire ?", reponse: "Il s'agit d'une bactérie pseudomonas (greenie). Je dois déposer entièrement le gel, désinfecter l'ongle, ne pas reposer immédiatement et orienter la cliente vers un médecin/dermatologue avant toute nouvelle pose." },
  { question: "Pour une pose capsules, à quel moment dois-je appliquer la french ?", reponse: "Après la construction et la mise en forme du gel, avant la pose du gel de finition. La french se réalise sur la couche de construction limée et matifiée." },
  { question: "Sur ongles naturels, à quel moment dois-je appliquer la construction ?", reponse: "Après la préparation de l'ongle (repoussage des cuticules, matification, dépoussiérage), l'application du Primer / Nail Prep, et le gel de base catalysé." },
  { question: "Quelles compétences doit avoir une prothésiste ongulaire ?", reponse: "Maîtrise des techniques de pose (gel, acrygel, capsules), connaissance de l'anatomie de l'ongle et des pathologies, sens du conseil, rigueur d'hygiène, créativité (nail-art), gestion de la relation client et adaptation aux situations de handicap." },
  { question: "Quel client la prothésiste doit refuser ?", reponse: "Toute cliente présentant une mycose, une infection bactérienne (greenie), un psoriasis sévère, des ongles très abîmés ou décollés (onycholyse), ou enceinte si solvants forts utilisés sans ventilation adaptée. Orienter vers un professionnel de santé." },
  { question: "Sur ongle naturel, comment s'appelle la petite marque blanche en forme de demi-lune ?", reponse: "La lunule. C'est la partie visible de la matrice de l'ongle." },
  { question: "Qu'est-ce qu'il y a en dessous des cuticules ?", reponse: "L'éponychium (la peau vivante qui protège la matrice) et la matrice elle-même qui produit la kératine de l'ongle." },
  { question: "Qu'est-ce que la plaque de l'ongle ? Quel autre nom on peut lui donner ?", reponse: "C'est la partie dure et visible de l'ongle composée de kératine. On l'appelle aussi 'tablette unguéale' ou 'corps de l'ongle'." },
  { question: "Comment préparer les ongles naturels ?", reponse: "Repousser les cuticules avec un repousse-cuticules, limer le bord libre à la forme souhaitée, matifier la plaque avec un buffer/lime fine, dépoussiérer avec une brosse, dégraisser avec du Cleaner." },
  { question: "Les remplissages sont à faire dans combien de temps ?", reponse: "En moyenne toutes les 3 à 4 semaines selon la pousse de l'ongle de la cliente." },
  { question: "Sur l'ongle de votre cliente, au niveau du bord libre, une tache blanche de la même couleur que le bord libre apparaît. Qu'est-ce que c'est ? Que devez-vous faire ?", reponse: "Il s'agit d'une onycholyse (décollement de l'ongle de son lit). Je ne dois pas poser sur cette zone, désinfecter, et conseiller à la cliente de consulter un dermatologue." },
  { question: "Les ongles de vos clientes sont colorés rouge/orangé. Qu'est-ce que c'est ? Que devez-vous faire ?", reponse: "Probablement une coloration due à un vernis foncé porté longtemps sans base. Réaliser un soin éclaircissant (jus de citron, blanchissant doux) et toujours appliquer une base avant un vernis pigmenté." },
  { question: "Les cuticules de votre cliente sont boursouflées et très rouges, qu'est-ce que cela peut être ? Que devez-vous faire ?", reponse: "Probablement une paronychie (inflammation/infection de la cuticule). Ne pas réaliser la prestation, désinfecter, et orienter la cliente vers un médecin." },
  { question: "Après l'application du gel de construction qu'est-ce que vous devez faire ?", reponse: "Catalyser sous lampe LED/UV (60 secondes minimum), puis limer la forme avec une lime adaptée, matifier, dépoussiérer, et passer au gel de finition." },
  { question: "Ma cliente a les doigts fins, quelle forme je peux lui conseiller ?", reponse: "Une forme amande, ovale ou stiletto qui allonge visuellement le doigt et féminise la main." },
  { question: "Quelles sont les conditions d'hygiène et sécurité pour préserver la pérennité de votre activité ?", reponse: "Désinfection systématique du poste, stérilisation des outils en autoclave/bac ultrasons, port des EPI (masque FFP2, gants, lunettes si meulage), aspiration des poussières, ventilation, gestion des déchets, formation continue." },
  { question: "Comment choisir les produits ?", reponse: "Sélectionner des marques professionnelles aux normes CE/NF, vérifier la composition (pas de HEMA si possible, pas de Toluène), respecter les fiches techniques, privilégier les produits hypoallergéniques." },
  { question: "Comment doit-on se protéger et protéger nos clients ?", reponse: "Pour soi : masque FFP2 lors du meulage, lunettes, gants nitrile, aspiration des poussières, ventilation. Pour le client : désinfection des mains, lunettes lors du meulage, vérification des allergies, fiche diagnostique signée." },
  { question: "Comment reconnaître une mycose ? Comment conseiller la cliente ?", reponse: "Ongle jauni/épaissi/cassant, parfois décollé. Refuser la pose, conseiller une consultation médicale (dermatologue), traitement antifongique, attendre la guérison complète avant nouvelle pose." },
  { question: "Quelles sont les conseils post-traitement ?", reponse: "Hydrater quotidiennement les cuticules avec de l'huile, porter des gants pour les tâches ménagères, ne pas utiliser les ongles comme outils, prévoir un remplissage toutes les 3-4 semaines, ne jamais arracher la pose." },
];

export const FOOTER_ACADEMY = `<div style="margin-top:30px;padding-top:8px;border-top:1px solid #999;font-size:9px;text-align:center;color:#555;line-height:1.4">
<strong>${ORG_FORMATION.nom}</strong> – ${ORG_FORMATION.adresse}, ${ORG_FORMATION.codePostal} ${ORG_FORMATION.ville}<br>
SIRET ${ORG_FORMATION.siret} – Numéro de déclaration d'activité : ${ORG_FORMATION.nda} – Présidente : ${ORG_FORMATION.presidente}
</div>`;

export const FOOTER_ESCALE = `<div style="margin-top:30px;padding-top:8px;border-top:1px solid #999;font-size:9px;text-align:center;color:#555;line-height:1.4">
<strong>${ORG_CERTIFICATEUR.nom}</strong> – RCS ${ORG_CERTIFICATEUR.rcs} – ${ORG_CERTIFICATEUR.adresse}, ${ORG_CERTIFICATEUR.codePostal} ${ORG_CERTIFICATEUR.ville}
</div>`;
