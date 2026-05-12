/**
 * MyCertif – Data : organismes, jury, stagiaires, grille de compétences, questionnaire
 * Certification RS 7302 — Techniques de prothésie ongulaire (Code NSF 336)
 */

export const ORG_FORMATION = {
  nom: "ACADEMY BY DJIKA",
  adresse: "40 quai de la Marine",
  codePostal: "93450",
  ville: "L'Île-Saint-Denis",
  siret: "90123845100016",
  nda: "11930895593",
  presidente: "NGHA Lydia",
  email: "academy@bydjika.com",
  tel: "07.83.08.09.56",
  rcs: "901 238 451",
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
  { nom: "NGHA", prenom: "Lydia", fonction: "Représentante organisme" },
];

export interface CertifStagiaire {
  nom: string;
  prenom: string;
  dateNaissance: string; // dd/mm/yyyy
  adresse: string;
  ville: string;
  sessionDate: string; // dd/mm/yyyy
  membreJury?: string; // formé du jury qui évalue
}

export const STAGIAIRES: CertifStagiaire[] = [
  { nom: "HOUCHAT", prenom: "Linda", dateNaissance: "24/10/1989", adresse: "12 rue des Lilas", ville: "Saint-Denis", sessionDate: "03/04/2026", membreJury: "TAMBA Cindy" },
  { nom: "BENALI", prenom: "Sarah", dateNaissance: "15/06/1992", adresse: "8 avenue Jean Jaurès", ville: "Aubervilliers", sessionDate: "03/04/2026", membreJury: "TAMBA Cindy" },
  { nom: "DIALLO", prenom: "Aïcha", dateNaissance: "07/02/1995", adresse: "23 rue Voltaire", ville: "Saint-Ouen", sessionDate: "10/04/2026", membreJury: "LUBANZADIO BAZU Noémie" },
  { nom: "MARTIN", prenom: "Sophie", dateNaissance: "30/11/1988", adresse: "5 boulevard de la Villette", ville: "Paris 19e", sessionDate: "10/04/2026", membreJury: "LUBANZADIO BAZU Noémie" },
  { nom: "ROBERT", prenom: "Émilie", dateNaissance: "12/09/1991", adresse: "17 rue de Belleville", ville: "Paris 20e", sessionDate: "17/04/2026", membreJury: "TAMBA Cindy" },
  { nom: "NGUYEN", prenom: "Linh", dateNaissance: "22/03/1994", adresse: "44 rue Stalingrad", ville: "Pantin", sessionDate: "17/04/2026", membreJury: "TAMBA Cindy" },
  { nom: "PEREIRA", prenom: "Manuela", dateNaissance: "05/07/1990", adresse: "9 rue de la Convention", ville: "Bobigny", sessionDate: "24/04/2026", membreJury: "LUBANZADIO BAZU Noémie" },
  { nom: "CISSE", prenom: "Fatou", dateNaissance: "18/12/1993", adresse: "31 rue de la République", ville: "Saint-Denis", sessionDate: "24/04/2026", membreJury: "LUBANZADIO BAZU Noémie" },
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
