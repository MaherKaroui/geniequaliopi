// ---------------------------------------------------------------------------
// « Machinerie scénique, moteurs et ponts : équipements fixes et grils provisoires – 70 h »
// — moteur de réponses HUMANISÉES
// Formation professionnelle non certifiante : évaluation interne + attestation de fin de formation.
// 70 h sur 10 jours (7 h par jour), groupe de 6 techniciens du spectacle (intermittents et permanents).
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes de
//     l'employeur…), puis parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes, dans l'ordre des 10 mises en situation,
//     12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par exercice + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Le Théâtre des Quatre Vents, cité dans les copies, est la salle FICTIVE du support de cours ;
// les calculs des copies reprennent exactement les données des exercices du preset.
// ---------------------------------------------------------------------------

const normalize = (s?: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Machinerie scénique, moteurs et ponts : équipements fixes et grils
 * provisoires – 70 h ». Reconnue par son intitulé seulement : il contient « machinerie », ou « gril(s) »
 * et « provisoire(s) », ou « moteur(s) » et « pont(s) » (accents, apostrophes et casse indifférents).
 */
export function isMSC70Formation(intitule?: string, code?: string): boolean {
  void code;
  const t = normalize(intitule).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[^a-z0-9']+/g, " ").trim();
  if (!t) return false;
  if (/\bmachineries?\b/.test(t)) return true;
  if (/\bgrils?\b/.test(t) && /\bprovisoires?\b/.test(t)) return true;
  return /\bmoteurs?\b/.test(t) && /\bponts?\b/.test(t);
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function msc70Seed(nom?: string, prenom?: string): number {
  const src = normalize(nom) + "|" + normalize(prenom);
  let h = 2166136261;
  for (let i = 0; i < src.length; i++) {
    h ^= src.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function isFeminin(civilite?: string, prenom?: string): boolean {
  const c = (civilite || "").toLowerCase();
  if (c.startsWith("mme") || c.startsWith("madame") || c.startsWith("mlle")) return true;
  if (c.startsWith("m.") || c === "m" || c.startsWith("monsieur")) return false;
  const p = (prenom || "").trim().toLowerCase();
  return p.endsWith("a") || p.endsWith("e");
}

/**
 * {e} → e au féminin ; {le} → le ; {ne} → ne ; {/rice} → rice (sinon eur) ;
 * {ier} → ière (sinon ier, cintrier / cintrière) ; {eur} → euse (sinon eur, régisseur / régisseuse)
 */
function accorder(txt: string, fem: boolean): string {
  return txt
    .replace(/\{\/rice\}/g, fem ? "rice" : "eur")
    .replace(/\{ier\}/g, fem ? "ière" : "ier")
    .replace(/\{eur\}/g, fem ? "euse" : "eur")
    .replace(/\{le\}/g, fem ? "le" : "")
    .replace(/\{ne\}/g, fem ? "ne" : "")
    .replace(/\{e\}/g, fem ? "e" : "");
}

const PAS = [1, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];
const pgcd = (a: number, b: number): number => (b === 0 ? a : pgcd(b, a % b));

/**
 * Rang dans une banque de n réponses : permutation de l'indice du stagiaire.
 * Pour n stagiaires consécutifs, les n rangs sont tous différents ; `sel` change le pas
 * et le décalage, ce qui décorrèle les questions (et les champs) entre eux.
 */
function rang(idx: number, sel: number, n: number): number {
  if (n <= 1) return 0;
  let pas = PAS[sel % PAS.length] % n || 1;
  while (pgcd(pas, n) !== 1) pas++;
  const r = (idx * pas + sel * 7 + Math.floor(sel / 3)) % n;
  return (r + n) % n;
}

/** Indice de travail : le rang dans la session s'il est connu, sinon l'empreinte nom + prénom. */
const baseIndex = (idx: number | undefined, nom?: string, prenom?: string) =>
  typeof idx === "number" && idx >= 0 ? idx : msc70Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// responsabilités et prévention, porteuse contrebalancée, porteuse motorisée et rideau de fer,
// élingage et angles, accessoires et rebut, mise en place d'un palan, diagnostic de palan,
// répartition des charges, table de charge, conduite d'une installation et incident
// ---------------------------------------------------------------------------
export const MSC70_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Lorsqu'une compagnie arrive avec son propre matériel d'accroche, qui est responsable de quoi, et quels documents demandez-vous ?", reponseAttendue: "Chaque employeur reste responsable de la sécurité de ses salariés ; l'exploitant du lieu coordonne la prévention par un plan de prévention ; documents attendus : plan d'accroche, feuille de charges, rapports de vérification des palans et accessoires, notices, capacité des points du lieu." },
    { question: "Comment chargez-vous et déchargez-vous une porteuse contrebalancée, et pourquoi dans cet ordre ?", reponseAttendue: "Porteuse en position basse ; au chargement, la charge d'abord puis les contrepoids dans l'équipe ; au déchargement, les contrepoids d'abord puis la charge ; sinon l'équipe ou la porteuse devient trop lourde et le système s'emballe. Le frein ne retient pas un déséquilibre important." },
    { question: "Comment préparez-vous la manœuvre d'une porteuse motorisée pendant un spectacle, et que savez-vous du rideau de fer ?", reponseAttendue: "Sécurités vérifiées (fins de course, frein, arrêt d'urgence), repères, annonce, zone sous les yeux, arrêt au repère et confirmation ; le rideau de fer sépare la scène de la salle en cas d'incendie, sa ligne de chute reste dégagée et il est essayé selon la consigne du lieu." },
    { question: "Comment évaluez-vous l'effort dans chaque brin d'une élingue à deux brins ?", reponseAttendue: "Effort par brin = (charge / 2) / cos (angle au sommet / 2) ; l'effort augmente avec l'angle ; à 120°, chaque brin porte la charge entière ; dans la pratique courante, on limite l'angle au sommet à 90° ; distinction masse et poids." },
    { question: "Comment contrôlez-vous un accessoire de levage avant de l'utiliser, et quand le mettez-vous au rebut ?", reponseAttendue: "Contrôle visuel de chaque accessoire : marquage et étiquette lisibles, CMU, état (fils cassés, écrasement, coupure, déformation, allongement, goupille d'origine) ; rebut en cas de défaut ou d'identification absente, rendu inutilisable et tracé." },
    { question: "Comment installez-vous et contrôlez-vous un palan électrique à chaîne avant de lever une charge ?", reponseAttendue: "Rapport de vérification valide, marquage, chaîne, crochets et linguets, sac à chaîne, câbles, frein, sens de marche et fins de course ; en commande directe, l'ordre des phases conditionne le bon fonctionnement des fins de course ; élingue de sécurité après mise à hauteur pour un usage D8 au-dessus de personnes." },
    { question: "Que faites-vous face à un palan qui ne se comporte pas normalement (sens inversé, chaîne vrillée, frein qui glisse) ?", reponseAttendue: "Arrêt, analyse de la cause probable, aucune manœuvre sous charge en cas de doute ; correction de l'ordre des phases à la source, chaîne redressée selon la notice, palan retiré du service si le frein glisse ou si le limiteur patine ; intervention d'une personne compétente et consignation." },
    { question: "Comment répartissez-vous la charge d'un pont entre ses palans ?", reponseAttendue: "Masse totale calculée (pont, projecteurs, câblage) ; deux appuis : moitié chacun ; trois appuis égaux : 3/16 à chaque extrémité et 5/8 au milieu ; charges ponctuelles par la règle du levier ; comparaison avec la CMU des palans et la capacité des points." },
    { question: "Comment vérifiez-vous qu'un pont peut porter la charge prévue ?", reponseAttendue: "Lecture de la table de charge du fabricant pour la configuration exacte (portée, charge répartie ou ponctuelle, appuis) ; combinaison prudente des charges ; pas d'extrapolation ; assemblage d'origine, élingage aux nœuds, éléments sans déformation." },
    { question: "Comment organisez-vous la levée d'un gril provisoire en équipe, et que faites-vous en cas d'incident ?", reponseAttendue: "Préparation (plan, feuille de charges, documents, registre), balisage, un seul chef de manœuvre, annonces avec réponse, « Stop » pour tous, levée par paliers, élingues de sécurité ; incident : arrêt, éloignement, sécurisation, information, consignation électrique avant intervention, inscription au registre." },
  ],
  fin: [
    { question: "Quelles responsabilités et quelles mesures de prévention mettez-vous en place pour l'accueil d'une compagnie qui accroche ?", reponseAttendue: "Responsabilités de chaque employeur et coordination par l'exploitant ; plan de prévention écrit ; documents réunis avant l'accroche ; matériel non vérifié refusé ; charges au-dessus du public avec matériel prévu ou sécurité secondaire, sans manœuvre au-dessus des personnes ; protections collectives d'abord pour le travail en hauteur." },
    { question: "Décrivez le chargement d'une porteuse contrebalancée avec le calcul des contrepoids.", reponseAttendue: "Vérification de la charge par rapport à la CMU ; calcul du nombre de pains ; porteuse en position basse, charge accrochée d'abord puis contrepoids chargés depuis la passerelle sur annonce ; essai lent ; au déchargement, contrepoids retirés en premier." },
    { question: "Décrivez la manœuvre d'une porteuse motorisée en spectacle et l'essai du rideau de fer.", reponseAttendue: "Sécurités contrôlées, repères, annonce et réponse, zone surveillée pendant le mouvement, arrêt immédiat si quelqu'un entre dans la zone, confirmation ; rideau de fer essayé selon la consigne du lieu, ligne de chute dégagée et marquée, défaut signalé à l'exploitant et consigné." },
    { question: "Calculez et commentez l'effort dans les brins d'une élingue de 400 kg à 60°, 90° et 120°.", reponseAttendue: "Environ 231 kg, 283 kg et 400 kg par brin ; l'effort augmente avec l'angle ; limitation courante à 90° d'angle au sommet ; brins de même longueur ; essai de décollement ; choix d'accessoires de CMU adaptée." },
    { question: "Comment décidez-vous de remettre en service ou de mettre au rebut un accessoire de levage ?", reponseAttendue: "Critères de rebut : identification illisible, fils cassés ou écrasement d'un câble, gaine coupée avec âme visible, maillon allongé, déformation, goupille non d'origine ; rebut rendu définitif et tracé ; accessoire intact remis en service après contrôle." },
    { question: "Présentez votre contrôle avant usage d'un palan à chaîne en commande directe.", reponseAttendue: "Rapport de vérification, marquage, chaîne, crochets, sac à chaîne, câbles, frein, sens de marche, fins de course ; ordre des phases vérifié, correction à la source ; élingue de sécurité après la mise à hauteur pour un usage D8." },
    { question: "Comment diagnostiquez-vous un défaut de palan et qui doit intervenir ?", reponseAttendue: "Sens inversé : ordre des phases ; chaîne vrillée : bloc crochet retourné ; montée impossible sous charge : limiteur de couple qui patine ; descente à l'arrêt : frein qui glisse ; arrêt, mise hors service selon le cas, intervention d'une personne compétente, consignation." },
    { question: "Quelle répartition des charges obtenez-vous pour le pont de 12 m sur deux puis sur trois palans ?", reponseAttendue: "364 kg au total ; 182 kg par palan sur deux palans ; sur trois palans, environ 68 kg à chaque extrémité et 227,5 kg au milieu ; écran de 120 kg à 4 m : 80 kg et 40 kg ; comparaison avec la CMU des palans et la capacité des points." },
    { question: "Comment utilisez-vous la table de charge du fabricant pour valider une configuration ?", reponseAttendue: "Valeurs de la configuration exacte, charge utile hors poids propre si la table l'indique ; somme des taux d'utilisation inférieure ou égale à 1 pour des charges combinées ; changement de configuration si nécessaire ; pas d'extrapolation, avis du fabricant sinon." },
    { question: "Décrivez la conduite d'une installation complète et votre réaction à un palan bloqué charge en l'air.", reponseAttendue: "Déroulé préparation, montage au sol, levée par paliers, sécurisation, exploitation, démontage ; communication avec un seul chef de manœuvre ; incident : arrêt, zone élargie et gardée, information, consignation électrique, diagnostic par une personne compétente, palan retiré du service, inscription au registre." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle.
// Aucune réponse à 1 au début : au plus 5 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — responsabilités et documents
  [
    ["C'est le théâtre qui est responsable de tout, puisque c'est chez lui.", 0],
    ["Je demanderais la fiche technique de la compagnie. Pour les responsabilités, je ne sais pas exactement qui signe quoi.", 0.5],
    ["En général, on fait confiance au régisseur de la compagnie, il connaît son matériel.", 0],
    ["Chacun est responsable de son équipe, je crois, et le théâtre doit vérifier que les points tiennent.", 0.5],
    ["J'ai déjà vu un plan de prévention, mais je n'ai jamais su à quoi il servait vraiment.", 0.5],
    ["Le régisseur général décide, c'est lui le chef sur place.", 0],
    ["Je demanderais au moins le plan d'accroche et le poids total, le reste je ne sais pas.", 0.5],
    ["Dans les festivals où je travaille, personne ne demande de document, on accroche et on vérifie à l'œil.", 0],
    ["Je pense que les palans doivent être contrôlés, mais je ne sais pas par qui ni tous les combien.", 0.5],
    ["Si la compagnie a l'habitude, il n'y a pas besoin de papiers.", 0],
    ["On m'a parlé d'un registre de sécurité dans le théâtre, je ne l'ai jamais ouvert.", 0.5],
    ["La responsabilité, c'est l'assurance qui s'en occupe.", 0],
  ],
  // Q2 — porteuse contrebalancée
  [
    ["On met les contrepoids en premier pour que la porteuse soit prête.", 0],
    ["Je charge la porteuse en bas puis on ajoute les pains en haut, c'est ce qu'on m'a appris, sans savoir exactement pourquoi.", 0.5],
    ["Je n'ai jamais manœuvré de porteuse contrebalancée, seulement des porteuses motorisées.", 0],
    ["On équilibre à peu près, et le frein fait le reste.", 0],
    ["Je sais qu'au démontage il faut enlever les pains avant le décor, sinon la porteuse part en haut.", 0.5],
    ["L'ordre dépend du cintrier, chacun a sa méthode.", 0],
    ["On compte les pains selon le poids du décor ; je ne sais pas faire le calcul exact.", 0.5],
    ["Je laisse ça au chef cintrier, moi je reste au plateau.", 0],
    ["Il faut que la porteuse soit en bas pour charger, je crois, et que tout le monde soit prévenu.", 0.5],
    ["On peut charger en hauteur si on tient bien la corde.", 0],
    ["Je sais qu'une porteuse mal équilibrée peut s'emballer, mais je ne connais pas la procédure complète.", 0.5],
    ["Aucune idée de l'ordre ; dans mon lieu, il n'y a que des perches fixes.", 0],
  ],
  // Q3 — porteuse motorisée et rideau de fer
  [
    ["On appuie sur le bouton au top, c'est tout.", 0],
    ["Je vérifie que personne n'est dessous avant d'envoyer, et j'attends le top du régisseur.", 0.5],
    ["Le rideau de fer, c'est le rideau rouge devant la scène.", 0],
    ["Je sais qu'il y a des fins de course, mais je ne les ai jamais testées.", 0.5],
    ["Le rideau de fer protège la salle en cas de feu, je crois, mais je ne sais pas comment on l'essaie.", 0.5],
    ["Les porteuses motorisées sont sûres, il n'y a rien à vérifier.", 0],
    ["On annonce la manœuvre à la radio, on attend la réponse ; pour le reste, je suis la conduite.", 0.5],
    ["Je n'ai jamais travaillé dans une salle avec rideau de fer.", 0],
    ["On pose des choses sous le rideau de fer quand on manque de place, ce n'est pas grave.", 0],
    ["Je sais qu'il y a un arrêt d'urgence sur le pupitre, je ne sais pas ce qu'il coupe exactement.", 0.5],
    ["La porteuse s'arrête toute seule à la bonne hauteur grâce à l'ordinateur.", 0],
    ["Il faut garder la zone sous les yeux pendant le mouvement, mais je n'ai pas de procédure écrite.", 0.5],
  ],
  // Q4 — élingage et angles
  [
    ["Chaque brin porte la moitié de la charge, quel que soit l'angle.", 0],
    ["Je sais que plus les brins sont écartés, plus ça tire, mais je ne sais pas calculer.", 0.5],
    ["Je prends toujours des élingues larges, ça suffit.", 0],
    ["Il y a un tableau avec les angles, je l'ai vu une fois chez un loueur.", 0.5],
    ["L'angle n'a pas d'importance si les élingues sont neuves.", 0],
    ["On m'a dit de ne pas dépasser un certain angle, peut-être 90°, sans m'expliquer pourquoi.", 0.5],
    ["Plus l'angle est ouvert, moins chaque brin travaille, puisque la charge est partagée.", 0],
    ["Je sais que la masse et le poids ne sont pas la même chose, mais je confonds encore kilos et newtons.", 0.5],
    ["Je laisse le calcul au rigger, je ne fais pas d'élingage.", 0],
    ["Il y a une formule avec le cosinus, je l'ai oubliée.", 0.5],
    ["Avec un angle très ouvert, chaque brin peut porter autant que la charge entière, je l'ai lu quelque part.", 0.5],
    ["On double les élingues et on ne se pose pas la question.", 0],
  ],
  // Q5 — accessoires et rebut
  [
    ["Si l'accessoire a l'air solide, je l'utilise.", 0],
    ["Je regarde l'étiquette de l'élingue et l'état général, mais je ne connais pas tous les critères de rebut.", 0.5],
    ["Une élingue un peu coupée peut encore servir pour des charges légères.", 0],
    ["Je sais qu'une élingue sans étiquette ne doit pas servir, on me l'a appris dans un théâtre.", 0.5],
    ["On remplace une goupille perdue par un boulon, ça tient pareil.", 0],
    ["Je vérifie qu'il n'y a pas de fils cassés sur les élingues acier, c'est tout ce que je sais.", 0.5],
    ["Le rebut, c'est le magasinier qui décide, pas moi.", 0],
    ["Je mets de côté ce qui me paraît abîmé, sans le noter nulle part.", 0.5],
    ["Les manilles ne s'usent pas, on n'a pas besoin de les contrôler.", 0],
    ["Je connais le code couleur des élingues rondes, pas les critères d'usure.", 0.5],
    ["Je n'ai jamais contrôlé d'accessoire moi-même, je prends ce qu'on me donne.", 0],
    ["Je sais qu'un maillon de chaîne allongé est mauvais signe, mais je ne sais pas mesurer.", 0.5],
  ],
  // Q6 — mise en place d'un palan
  [
    ["On accroche le palan, on branche et on monte.", 0],
    ["Je vérifie que la chaîne n'est pas vrillée et que le sac est bien accroché.", 0.5],
    ["Le palan est vérifié par le loueur, je n'ai rien à contrôler.", 0],
    ["Je fais un essai à vide pour voir si ça monte quand j'appuie sur monter.", 0.5],
    ["Je ne connais pas la différence entre commande directe et basse tension.", 0],
    ["On m'a dit de mettre une élingue de sécurité au-dessus du public, je ne sais pas à quel moment.", 0.5],
    ["Le sens de marche n'a pas d'importance, on inverse les boutons sur le pupitre.", 0],
    ["Je regarde l'étiquette de contrôle sur le palan, sans savoir lire le rapport.", 0.5],
    ["Je n'ai jamais installé de palan, je travaille sur des porteuses.", 0],
    ["Je vérifie les crochets et les linguets, et que le câble n'est pas abîmé.", 0.5],
    ["Si ça fait du bruit, on continue, ça s'arrange en chauffant.", 0],
    ["Je sais qu'il existe des fins de course, mais je ne les ai jamais testées avant une levée.", 0.5],
  ],
  // Q7 — diagnostic de palan
  [
    ["Si le palan part dans le mauvais sens, j'inverse simplement les boutons.", 0],
    ["J'arrête et j'appelle le responsable, je ne sais pas diagnostiquer.", 0.5],
    ["Une chaîne vrillée se redresse toute seule en montant.", 0],
    ["Je sais qu'un sens inversé vient souvent des phases, mais pas pourquoi c'est dangereux.", 0.5],
    ["Si le frein glisse un peu, on peut finir la journée.", 0],
    ["Quand le palan peine, je relance plusieurs fois jusqu'à ce qu'il passe.", 0],
    ["Je mets le palan de côté avec un mot dessus si quelque chose me paraît anormal.", 0.5],
    ["Un palan ne tombe jamais en panne s'il est neuf.", 0],
    ["Je sais qu'il y a un embrayage dans certains palans, je ne sais pas à quoi il sert.", 0.5],
    ["Je n'ai jamais rencontré de panne, je ne saurais pas quoi faire.", 0],
    ["Pour une chaîne vrillée, il faut retourner le crochet, je l'ai vu faire une fois.", 0.5],
    ["Je dirais de ne pas passer sous la charge et d'attendre un technicien.", 0.5],
  ],
  // Q8 — répartition des charges
  [
    ["Je divise toujours le poids total par le nombre de moteurs.", 0],
    ["Avec deux moteurs aux bouts, chacun prend la moitié ; avec trois, je ne sais pas.", 0.5],
    ["Je ne calcule pas, je regarde si les moteurs peinent.", 0],
    ["Je fais la somme du pont et des projecteurs, et je compare avec la capacité des moteurs.", 0.5],
    ["Le moteur du milieu prend moins, puisqu'il est au milieu.", 0],
    ["Je sais qu'il faut compter le câblage, mais je ne sais pas faire la répartition.", 0.5],
    ["Le rigger s'occupe des calculs, moi je pose les projecteurs.", 0],
    ["Une charge près d'un moteur pèse surtout sur ce moteur, mais je ne sais pas le chiffrer.", 0.5],
    ["Avec des moteurs d'une tonne, il n'y a jamais de problème de charge.", 0],
    ["J'ai entendu dire que le moteur du milieu est le plus chargé sur trois points.", 0.5],
    ["Je connais la règle du levier de l'école, sans l'avoir appliquée à un pont.", 0.5],
    ["Je compte à peu près vingt kilos par projecteur, ça suffit.", 0],
  ],
  // Q9 — table de charge
  [
    ["Un pont en aluminium supporte tout ce qu'on accroche dans un théâtre.", 0],
    ["Je sais qu'il existe des tables de charge chez les fabricants, je ne les ai jamais lues.", 0.5],
    ["Plus le pont est long, plus il est solide.", 0],
    ["La charge admissible dépend de la portée, je crois, mais je ne sais pas lire le tableau.", 0.5],
    ["On peut mélanger des éléments de marques différentes s'ils ont le même diamètre.", 0],
    ["Je sais qu'il faut mettre les goupilles et les épingles, c'est tout.", 0.5],
    ["Si le pont plie un peu, c'est normal, on continue.", 0],
    ["Je n'ai jamais vérifié un pont, il arrive monté du dépôt.", 0],
    ["Je vérifie qu'il n'y a pas de tube enfoncé ou de soudure fissurée avant le montage.", 0.5],
    ["Il y a une différence entre charge répartie et charge ponctuelle, mais je ne sais pas laquelle compte le plus.", 0.5],
    ["On élingue le pont n'importe où, du moment que l'élingue entoure un tube.", 0],
    ["Je sais qu'il faut élinguer près des nœuds, on me l'a montré.", 0.5],
  ],
  // Q10 — conduite d'une installation et incident
  [
    ["Tout le monde lève en même temps et on regarde.", 0],
    ["Il faut baliser sous la charge et que quelqu'un dirige la manœuvre.", 0.5],
    ["En cas de problème, on passe dessous pour voir ce qui se passe.", 0],
    ["Je sais qu'on doit pouvoir dire stop à tout moment, mais je n'ai pas de procédure écrite.", 0.5],
    ["L'important c'est d'aller vite pour tenir le planning.", 0],
    ["On communique par gestes et à la voix, la radio n'est pas utile.", 0],
    ["Si un moteur s'arrête, j'appelle le régisseur et j'éloigne les gens.", 0.5],
    ["Je n'ai jamais entendu parler de consignation électrique pour un palan.", 0],
    ["On note les incidents quand ils sont graves, sinon ce n'est pas la peine.", 0],
    ["Je prépare un plan avec les points d'accroche, sans feuille de charges.", 0.5],
    ["Je sais qu'il faut monter par étapes pour garder le pont droit.", 0.5],
    ["Je fais confiance à l'équipe, chacun sait ce qu'il a à faire.", 0],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["Chaque employeur reste responsable de ses salariés ; le théâtre, entreprise utilisatrice, coordonne la prévention avec la compagnie dans un plan de prévention écrit.", 1],
    ["Avant toute accroche, je demande le plan d'accroche, la feuille de charges, les rapports de vérification des palans et des accessoires et les notices, et je donne la capacité des points du gril.", 1],
    ["Si les palans de la compagnie n'ont pas de rapport de vérification, on ne les utilise pas : on prend le matériel vérifié du théâtre.", 1],
    ["Pour des palans D8 au-dessus du public, pas de manœuvre en présence du public et une élingue de sécurité sur chaque point après la mise à hauteur.", 1],
    ["Pour le travail en hauteur au gril, les garde-corps et les protections collectives passent avant le harnais.", 0.5],
    ["L'arrêté du 1er mars 2004 fixe les vérifications des appareils et accessoires de levage ; les observations vont dans le registre de sécurité.", 1],
    ["Le levage de personnes n'est possible qu'avec un équipement prévu pour cela, jamais avec un palan pour charges.", 1],
    ["Le régisseur général organise l'accueil et valide le plan d'accroche avec le régisseur de la compagnie.", 0.5],
    ["J'ai appris à rédiger trois mesures concrètes du plan de prévention : balisage, chef de manœuvre unique, contrôle conjoint des accessoires.", 1],
    ["Les charges au-dessus du public se font avec du matériel prévu pour cet usage, D8+ ou C1 selon le besoin, ou avec une sécurité secondaire.", 1],
    ["Le document unique recense les risques du lieu ; l'accroche d'une compagnie s'ajoute au plan de prévention.", 0.5],
    ["Je ne cède pas à la pression du planning sur les documents de vérification.", 0.5],
  ],
  [
    ["Porteuse en bas, j'accroche le décor puis on charge les pains dans l'équipe depuis la passerelle ; au déchargement, on retire d'abord les pains.", 1],
    ["Pour 140 kg de frise et quatre projecteurs de 12 kg, j'ai 188 kg : 18 pains et un demi-pain, il reste 3 kg côté porteuse.", 1],
    ["Je vérifie d'abord que la charge reste sous la CMU de la porteuse, 250 kg répartis au Théâtre des Quatre Vents.", 1],
    ["Si on décharge le décor avant les pains, l'équipe devient lourde et la porteuse part vers les cintres.", 1],
    ["Le frein maintient une porteuse équilibrée ; il ne doit pas retenir un gros déséquilibre.", 1],
    ["Chaque annonce entre plateau et passerelle reçoit une réponse avant l'action suivante.", 0.5],
    ["Après le chargement, je fais un essai de manœuvre lent avant de libérer complètement le frein.", 1],
    ["On vise l'équilibre à quelques kilos près, en répartissant les projecteurs sur la longueur.", 0.5],
    ["Le calcul est simple : charge ajoutée divisée par la masse d'un pain, et on complète avec des demi-pains.", 0.5],
    ["Personne ne doit rester sur la passerelle de chargement sans annonce pendant la manœuvre.", 0.5],
    ["Je note le nombre de pains de chaque porteuse sur la feuille de service.", 0.5],
    ["La position basse de la porteuse au chargement protège : une porteuse lourde ne peut pas descendre plus bas.", 1],
  ],
  [
    ["Avant la première manœuvre, je teste les fins de course, le frein et l'arrêt d'urgence, et je vérifie la charge accrochée.", 1],
    ["En spectacle : annonce « en attente », top, mouvement en gardant la zone sous les yeux, arrêt au repère, confirmation.", 1],
    ["Si un comédien est dans la zone au moment du top, je n'envoie pas et je préviens le régisseur.", 1],
    ["Le rideau de fer sépare la scène de la salle en cas d'incendie ; sa ligne de chute est marquée et toujours dégagée.", 1],
    ["L'essai quotidien du rideau de fer se fait selon la consigne du lieu, avec quelqu'un qui surveille la scène.", 1],
    ["Si le rideau de fer ne descend pas jusqu'au sol, je préviens l'exploitant et on consigne l'incident.", 1],
    ["La détection de mou de câble arrête la porteuse si la charge rencontre un obstacle en descente.", 0.5],
    ["Je ne passe jamais sous le rideau de fer en mouvement.", 0.5],
    ["Les repères de position sont contrôlés au service avant le spectacle.", 0.5],
    ["Pendant le mouvement, j'arrête immédiatement si quelqu'un entre dans la zone.", 1],
    ["J'ai compris que la sécurité des personnes passe avant le top.", 0.5],
    ["Je vérifie l'état des câbles et des poulies visibles depuis la passerelle.", 0.5],
  ],
  [
    ["Effort par brin = (charge / 2) / cos (angle au sommet / 2) : pour 400 kg, environ 231 kg à 60°, 283 kg à 90° et 400 kg à 120°.", 1],
    ["À 120°, chaque brin porte la charge entière : c'est pour ça qu'on limite l'angle au sommet à 90°.", 1],
    ["400 kg, c'est environ 3,9 kN de poids ; en pratique, je compte un kilo pour un décanewton.", 1],
    ["Avec 283 kg par brin, des élingues rondes violettes de 1 000 kg conviennent largement.", 1],
    ["Si les brins n'ont pas la même longueur, le plus court prend presque tout : je corrige et je fais un essai de décollement.", 1],
    ["Pour deux brins jusqu'à 90°, la CMU de l'ensemble vaut 1,4 fois celle d'un brin.", 1],
    ["L'effort augmente avec l'angle, je ne lève plus sans faire le calcul.", 0.5],
    ["Je vérifie aussi les manilles : même CMU suffisante, charge dans l'axe.", 0.5],
    ["Je garde sur moi le tableau des facteurs d'angle.", 0.5],
    ["Pour le lustre de 300 kg du cas pratique, environ 212 kg par brin à 90°.", 1],
    ["J'ai compris la différence entre masse et poids.", 0.5],
    ["Au-delà de 120° d'angle au sommet, on ne lève pas.", 0.5],
  ],
  [
    ["Étiquette illisible, fils cassés, câble écrasé, gaine coupée avec âme visible, maillon allongé : rebut.", 1],
    ["Une manille dont la goupille a été remplacée par un boulon du commerce ne repart pas en service.", 1],
    ["Le rebut est rendu définitif : élingue coupée, accessoire marqué et isolé, puis noté dans l'inventaire.", 1],
    ["Un accessoire sans marquage de CMU ne sert pas au levage.", 1],
    ["Une élingue simplement salie mais intacte, étiquette lisible, repart après nettoyage selon la notice.", 1],
    ["Je contrôle chaque accessoire avant usage, même s'il sort du stock.", 0.5],
    ["Je note la date, la raison et la personne qui décide du rebut.", 0.5],
    ["Le marquage CE et la déclaration de conformité accompagnent tout accessoire neuf.", 0.5],
    ["En cas de doute, je mets à part et je fais examiner par une personne compétente.", 1],
    ["J'informe l'équipe et le magasin de chaque mise au rebut.", 0.5],
    ["Le coefficient d'utilisation est de 7 pour le textile, 5 pour le câble, 4 pour la chaîne.", 1],
    ["Je connais maintenant les critères de rebut pour chaque famille d'accessoires.", 0.5],
  ],
  [
    ["Je vérifie le rapport de vérification, le marquage, la chaîne, les crochets, le sac à chaîne, les câbles, le frein et les fins de course.", 1],
    ["En commande directe, une inversion des phases rend les fins de course inopérantes ; je corrige à la source, jamais en forçant.", 1],
    ["J'essaie à vide puis sous faible charge : la montée doit monter, la fin de course basse doit couper la descente.", 1],
    ["L'élingue de sécurité se pose après la mise à hauteur définitive, avec le moins de mou possible.", 1],
    ["J'élingue le palan au point du gril avec une manille de CMU adaptée, sans arête vive.", 0.5],
    ["Le sac à chaîne doit correspondre à la longueur de la chaîne, sinon il déborde.", 0.5],
    ["Je reporte le numéro du palan sur le plan et sur le pupitre.", 0.5],
    ["En commande basse tension, les contacteurs sont dans le palan ; en directe, dans le pupitre.", 1],
    ["Je vérifie que la chaîne n'est pas vrillée avant chaque mise en charge.", 0.5],
    ["Le D8+ a un double frein et une CMU réduite ; le C1 permet de déplacer des charges au-dessus des personnes.", 1],
    ["Je contrôle que les câbles ne tirent pas sur les connecteurs.", 0.5],
    ["Un bruit anormal au contrôle, et le palan ne sert pas.", 0.5],
  ],
  [
    ["Palan qui monte sur « descente » : phases inversées ; j'arrête tout jusqu'à correction et nouvel essai des fins de course.", 1],
    ["Chaîne vrillée : bloc crochet retourné entre les brins ; je redresse selon la notice avant de charger.", 1],
    ["Si le moteur tourne mais que la charge ne monte plus, le limiteur de couple patine : charge trop lourde ou réglage à revoir par une personne compétente.", 1],
    ["Un frein qui laisse descendre la charge à chaque arrêt : palan retiré du service, charge sécurisée, zone balisée.", 1],
    ["Le réglage du limiteur n'est pas l'affaire du plateau.", 0.5],
    ["Chaque défaut est noté avec la décision prise et la personne prévenue.", 0.5],
    ["Je ne me place jamais sous la charge pour diagnostiquer.", 0.5],
    ["J'étiquette le palan défectueux pour que personne ne le réutilise.", 0.5],
    ["Le limiteur de couple ne sert pas de fin de course.", 1],
    ["Je sais distinguer un défaut que je corrige moi-même d'un défaut qui demande une personne compétente.", 0.5],
    ["En cas de doute sur le frein, je ne prends aucun risque : hors service.", 1],
    ["Je préviens le chef de manœuvre avant toute correction.", 0.5],
  ],
  [
    ["Pont de 12 m : 84 kg de structure, 256 kg de projecteurs, 24 kg de câblage, soit 364 kg ; 182 kg par palan sur deux palans.", 1],
    ["Sur trois palans, 3/16 à chaque extrémité et 5/8 au milieu : environ 68 kg, 227,5 kg et 68 kg.", 1],
    ["L'écran de 120 kg à 4 m de la gauche donne 80 kg à gauche et 40 kg à droite, par la règle du levier.", 1],
    ["Le palan du milieu est le plus chargé : le partage en trois parts égales est faux.", 1],
    ["Je compare chaque charge à la CMU du palan et à la capacité du point du gril.", 1],
    ["Je n'oublie plus le câblage dans la masse totale.", 0.5],
    ["Avec l'écran, j'obtiens 262 kg à gauche et 222 kg à droite sur deux palans.", 1],
    ["La répartition va sur la feuille de charges, une ligne par point.", 0.5],
    ["Une charge proche d'un palan pèse surtout sur ce palan.", 0.5],
    ["Je refais le calcul dès que la charge change.", 0.5],
    ["Je vérifie ensuite le pont lui-même avec la table du fabricant.", 0.5],
    ["Pour quatre points, je demande un calcul ou j'utilise le tableur fourni.", 0.5],
  ],
  [
    ["Je lis la table pour la configuration exacte : portée, charge répartie ou ponctuelle, mode d'appui.", 1],
    ["Pour des charges combinées, je fais la somme des taux d'utilisation, qui doit rester inférieure ou égale à 1.", 1],
    ["280 kg sur 450 kg et 120 kg sur 300 kg donnent 1,02 : sur 12 m avec deux palans, ça ne passe pas.", 1],
    ["En ajoutant un palan au milieu, les travées font 6 m et la table admet bien plus.", 1],
    ["Je n'extrapole jamais : si le cas n'est pas dans la table, je demande au fabricant.", 1],
    ["Je vérifie si la table donne la charge utile hors poids propre.", 0.5],
    ["Éléments de la même série, manchons et goupilles d'origine, épingles en place.", 0.5],
    ["J'élingue autour des membrures principales, près d'un nœud.", 0.5],
    ["Un élément déformé est écarté avant le montage.", 0.5],
    ["La table n'est valable que si les charges sont réellement réparties comme prévu.", 1],
    ["Je garde une copie de la table avec la feuille de charges.", 0.5],
    ["J'ai appris à lire une table de charge sans me tromper de ligne.", 0.5],
  ],
  [
    ["Je prépare plan, feuille de charges, rapports et registre ; montage au sol ; levée par paliers ; élingues de sécurité ; exploitation ; démontage inverse.", 1],
    ["Un seul chef de manœuvre, des annonces avec réponse, et « Stop » pour tout le monde.", 1],
    ["Palan bloqué charge en l'air : arrêt, zone élargie et gardée, information du régisseur, personne dessous.", 1],
    ["Avant toute intervention, consignation : séparer, condamner, identifier, vérifier l'absence de tension.", 1],
    ["Tout incident est inscrit au registre avec la date, les circonstances et les suites.", 1],
    ["Le pont n'est démonté qu'au sol, une fois déchargé.", 0.5],
    ["Je contrôle l'horizontalité à chaque palier pendant la levée.", 0.5],
    ["La zone sous la charge est balisée et gardée pendant toute la manœuvre.", 0.5],
    ["Un presque-accident est analysé comme un accident.", 0.5],
    ["Je retire les élingues de sécurité avant toute nouvelle manœuvre.", 0.5],
    ["Le palan défaillant est retiré du service et étiqueté.", 0.5],
    ["Les radios sont testées et les canaux attribués avant la levée.", 0.5],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début. */
const SEL_DEBUT = [54, 51, 45, 46, 4, 8, 57, 36, 47, 13];

export function getMSC70AutoAnswers(
  nom: string | undefined,
  prenom: string | undefined,
  civilite: string | undefined,
  isDebut: boolean,
  nbQuestions = 10,
  idx?: number,
): { reponses: string[]; scores: number[] } {
  const base = baseIndex(idx, nom, prenom);
  const fem = isFeminin(civilite, prenom);
  const bank = isDebut ? DEBUT : FIN;
  const reponses: string[] = [];
  const scores: number[] = [];
  for (let q = 0; q < nbQuestions; q++) {
    const pool = bank[q % bank.length];
    const sel = isDebut ? SEL_DEBUT[q % SEL_DEBUT.length] : q + 5;
    const [txt, score] = pool[rang(base, sel, pool.length)];
    reponses.push(accorder(txt, fem));
    scores.push(score);
  }
  return { reponses, scores };
}

/**
 * Note du QCM de positionnement de DÉBUT, sur 20 : jamais au-dessus de 12, et différente pour
 * 8 stagiaires consécutifs (rang dans la session, sinon empreinte du nom).
 */
const NOTES_DEBUT_SUR_20 = [10, 7, 12, 8, 5, 11, 6, 9];
export function msc70NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6). */
export function msc70BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((msc70NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `msc70BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function msc70ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = msc70BonnesQcmDebut(n, idx, nom, prenom);
  const base = baseIndex(idx, nom, prenom);
  const justes = new Set<number>();
  for (let k = 0; justes.size < bonnes && k < n * 4; k++) justes.add(rang(base + k, 47, n));
  return questions.map((q, qi) => {
    if (justes.has(qi)) return q.correctIndex;
    const fausses = q.options.map((_, i) => i).filter(i => i !== q.correctIndex);
    return fausses[rang(base, qi + 3, fausses.length)];
  });
}

/**
 * Notes des exercices, différentes d'un stagiaire à l'autre pour un même exercice :
 * QCM de compétence (10 questions : 6 à 10 bonnes réponses), mise en situation sur 5 (2,5 à 5).
 */
const NOTES_QCM_SUR_10 = [8, 7, 9, 6, 10];
const NOTES_EXERCICE_SUR_5 = [4, 3, 4.5, 3.5, 5, 2.5];
export function msc70NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet (partie stagiaire), attentes, missions et contribution (partie employeur).
// ---------------------------------------------------------------------------
interface ProfilBesoin {
  besoin: string;
  objectif: string;
  projet: string;
  attentes: string;
  missions: string;
  contribution: string;
}

const PROFILS: ProfilBesoin[] = [
  {
    besoin: "Organiser l'accueil technique des compagnies qui accrochent dans le théâtre et exiger les bons documents.",
    objectif: "Je veux savoir précisément qui est responsable de quoi lors d'un accueil, rédiger un plan de prévention utile et refuser sans hésiter un matériel non vérifié.",
    projet: "Elle m'aidera à évoluer vers un poste de régiss{eur} général{e} dans un lieu équipé.",
    attentes: "L'employeur attend que {le_sal} structure l'accueil des équipes extérieures et la tenue du registre de sécurité.",
    missions: "Accueil technique des compagnies, coordination du plateau, préparation des fiches techniques et des plannings de montage.",
    contribution: "Elle doit sécuriser l'accueil des compagnies et limiter les décisions prises dans l'urgence.",
  },
  {
    besoin: "Manœuvrer les porteuses contrebalancées en toute sécurité et maîtriser le calcul des contrepoids.",
    objectif: "Mon objectif est de charger, équilibrer et décharger une porteuse sans jamais risquer d'emballement, et de savoir calculer les contrepoids seul{e}.",
    projet: "Elle me permettra de devenir cintr{ier} titulaire dans le théâtre.",
    attentes: "L'employeur attend que {le_sal} puisse tenir seul{e} un poste aux cintres pendant les montages et les spectacles.",
    missions: "Manœuvre des porteuses, chargement des équipes, montage des décors suspendus, service de spectacle.",
    contribution: "Elle doit fiabiliser les manœuvres aux cintres et la transmission des consignes entre plateau et passerelle.",
  },
  {
    besoin: "Comprendre les palans électriques à chaîne, leurs usages D8, D8+ et C1 et leur commande.",
    objectif: "Je souhaite installer, contrôler et commander des palans moi-même, et savoir réagir à un défaut au lieu d'attendre.",
    projet: "Elle m'aidera à prendre en charge l'accroche lors des tournées de la compagnie.",
    attentes: "Nous attendons que {le_sal} contrôle les palans de la compagnie avant chaque date et sache lire leurs rapports de vérification.",
    missions: "Montage et démontage en tournée, gestion du parc de palans et d'accessoires de la compagnie.",
    contribution: "Elle doit éviter les refus de matériel dans les lieux d'accueil et sécuriser les montages en tournée.",
  },
  {
    besoin: "Calculer les charges d'un gril provisoire et lire les tables de charge des fabricants.",
    objectif: "Mon objectif est de faire moi-même la répartition des charges entre les palans et de vérifier un pont avec la table, sans dépendre d'un tiers.",
    projet: "Elle me permettra de proposer des plans d'accroche aux compagnies et aux organisateurs.",
    attentes: "L'employeur attend que {le_sal} établisse des feuilles de charges fiables pour les spectacles accueillis.",
    missions: "Préparation des plans d'accroche, montage des ponts, accroche des projecteurs.",
    contribution: "Elle doit réduire les erreurs de répartition et sécuriser les grils provisoires.",
  },
  {
    besoin: "Contrôler les accessoires de levage et gérer un parc d'élingues et de manilles.",
    objectif: "Je veux connaître les critères de mise au rebut et organiser le contrôle et la traçabilité du parc d'accessoires.",
    projet: "Elle m'aidera à prendre la responsabilité du magasin technique.",
    attentes: "L'employeur attend que {le_sal} tienne à jour l'inventaire et le suivi des vérifications des accessoires.",
    missions: "Gestion du magasin, préparation du matériel des montages, suivi des retours de tournée.",
    contribution: "Elle doit garantir que seuls des accessoires en bon état et identifiés sortent du magasin.",
  },
  {
    besoin: "Passer de l'accroche des projecteurs à la responsabilité de l'accroche complète d'un pont.",
    objectif: "Mon objectif est de comprendre ce qui se passe au-dessus des projecteurs : palans, élingage, points d'accroche et calcul des charges.",
    projet: "Elle me permettra d'élargir mes missions d'intermittent{e} de la lumière à l'accroche.",
    attentes: "Nous attendons que {le_sal} participe à l'accroche des ponts lumière en respectant les règles du lieu.",
    missions: "Accroche, câblage et réglage des projecteurs, montage des ponts lumière.",
    contribution: "Elle doit renforcer l'équipe d'accroche pendant les montages chargés.",
  },
  {
    besoin: "Diriger une manœuvre de levée en équipe avec une communication claire et gérer un incident.",
    objectif: "Je souhaite tenir le rôle de chef{fe} de manœuvre : préparer, annoncer, faire respecter le balisage et réagir correctement à un incident.",
    projet: "Elle m'aidera à encadrer les équipes de montage sur les festivals.",
    attentes: "L'employeur attend que {le_sal} encadre les levées de ponts sur les scènes extérieures.",
    missions: "Encadrement d'équipes de montage, levée de ponts sur ground support, coordination avec les prestataires.",
    contribution: "Elle doit sécuriser les levées et améliorer la coordination avec les prestataires.",
  },
  {
    besoin: "Remettre à jour mes connaissances réglementaires sur le levage et le travail en hauteur.",
    objectif: "Mon objectif est de connaître les vérifications obligatoires, les règles du levage de personnes et des charges au-dessus du public, et de pouvoir les expliquer à l'équipe.",
    projet: "Elle me permettra d'assurer le rôle de référent{e} sécurité du plateau.",
    attentes: "L'employeur attend que {le_sal} actualise les consignes de sécurité du plateau et sensibilise l'équipe.",
    missions: "Direction du plateau, organisation des services, rédaction des consignes, relation avec les vérificateurs.",
    contribution: "Elle doit mettre à jour les consignes de sécurité et le suivi des vérifications.",
  },
  {
    besoin: "Comprendre les porteuses motorisées et leurs sécurités pour les exploiter en spectacle.",
    objectif: "Je veux préparer et conduire une manœuvre motorisée en spectacle, connaître les sécurités et savoir quoi faire si quelqu'un est dans la zone.",
    projet: "Elle m'aidera à prendre en charge le pupitre de machinerie du théâtre.",
    attentes: "L'employeur attend que {le_sal} puisse conduire les porteuses motorisées pendant les spectacles.",
    missions: "Conduite des effets de machinerie, préparation des repères, service de spectacle.",
    contribution: "Elle doit fiabiliser la conduite des effets motorisés pendant les représentations.",
  },
  {
    besoin: "Monter un ground support en plein air et le lever en synchronisant les palans.",
    objectif: "Mon objectif est de maîtriser l'aplomb, les stabilisateurs, le lestage et la levée par paliers d'une structure sur tours.",
    projet: "Elle me permettra de travailler sur des scènes extérieures en toute sécurité.",
    attentes: "Nous attendons que {le_sal} monte les structures sur tours des événements extérieurs selon les notices.",
    missions: "Montage de structures scéniques extérieures, levée de grils sur tours, démontage.",
    contribution: "Elle doit sécuriser les montages extérieurs et réduire les reprises.",
  },
  {
    besoin: "Savoir élinguer correctement un décor lourd et calculer les efforts selon l'angle.",
    objectif: "Je souhaite choisir mes élingues et mes manilles en fonction du calcul, et ne plus élinguer au jugé.",
    projet: "Elle m'aidera à construire des décors pensés dès le départ pour être suspendus en sécurité.",
    attentes: "L'employeur attend que {le_sal} prévoie les points de levage dès la construction des décors.",
    missions: "Construction de décors, préparation des éléments suspendus, montage au plateau.",
    contribution: "Elle doit faciliter et sécuriser la suspension des décors construits à l'atelier.",
  },
  {
    besoin: "Acquérir des bases solides en machinerie après une reconversion vers les métiers du plateau.",
    objectif: "Mon objectif est de comprendre l'ensemble des équipements, fixes et provisoires, et d'acquérir les bons réflexes de sécurité dès le départ.",
    projet: "Elle me permettra de travailler comme machiniste dans des lieux équipés.",
    attentes: "Nous attendons que {le_sal} applique les procédures du plateau et monte progressivement en autonomie.",
    missions: "Assistance au chef machiniste, montage et démontage, rangement et entretien du matériel.",
    contribution: "Elle doit permettre l'intégration rapide d'{un} {collab} récemment arrivé{e} dans l'équipe plateau.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilMSC70(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

function entAccords(txt: string, fem: boolean): string {
  return accorder(
    txt
      .replace(/\{un\}/g, fem ? "une" : "un")
      .replace(/\{collab\}/g, fem ? "collaboratrice" : "collaborateur")
      .replace(/\{le_sal\}/g, fem ? "la salariée" : "le salarié")
      .replace(/\{fe\}/g, fem ? "fe" : ""),
    fem,
  );
}

export function getMSC70Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return entAccords(profilMSC70(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production du stagiaire
// Indices : 0 responsabilités / prévention, 1 contrepoids, 2 porteuse motorisée / rideau de fer,
//           3 élingage à deux brins, 4 tri et rebut, 5 mise en place d'un palan, 6 diagnostic,
//           7 répartition des charges, 8 table de charge, 9 installation et incident ;
//           8 productions par banque.
// La k-ième production de chaque banque suit le même technicien fictif : un stagiaire garde le même
// métier d'un exercice à l'autre.
//   0 chef machiniste · 1 cintrier·ère · 2 régisseur·se plateau intermittent·e
//   3 technicien·ne polyvalent·e de salle municipale · 4 technicien·ne d'accroche débutant·e
//   5 régisseur·se général·e de compagnie · 6 technicien·ne lumière qui accroche
//   7 machiniste constructeur·rice
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Responsabilités et prévention
  [
    "Je suis chef machiniste. Pour Les Passe-Murailles, j'ai réparti les rôles : chaque employeur reste responsable de ses techniciens, le théâtre coordonne la prévention et donne la capacité de ses points. J'ai listé six documents : plan de prévention, plan d'accroche, feuille de charges, rapports de vérification des deux palans et des accessoires, notices, capacité des points du gril. Pour des palans D8 au-dessus des premiers rangs : levée sans public, élingue de sécurité sur chaque point, aucune manœuvre ensuite. Sans rapport de vérification, on prend nos palans vérifiés.",
    "En tant que cintr{ier}, j'ai surtout travaillé la partie plan de prévention : zone balisée pendant la levée, un seul chef de manœuvre, contrôle commun des accessoires avant usage, travail au gril avec les garde-corps du lieu. Pour les responsabilités, l'exploitant coordonne, chaque employeur répond de ses salariés. Si la compagnie n'a pas les rapports de ses palans, on ne les utilise pas, même si elle insiste à cause du planning.",
    "Régiss{eur} plateau intermittent{e}, j'ai déjà vécu ce cas en tournée. Le régisseur de la compagnie fournit la masse totale, qui manque ici : je la demande avant tout. Documents : plan d'accroche, feuille de charges, rapports de vérification, notices, et le plan de prévention signé des deux côtés. Pour le D8 au-dessus du public, je prévois l'élingue de sécurité après la mise à hauteur ; si la compagnie veut bouger le pont pendant le spectacle, il faut des palans C1, sinon on refuse.",
    "Je suis technicien{ne} polyvalent{e} dans une salle municipale. J'ai compris que la mairie, comme exploitant, coordonne la prévention, mais que l'employeur de la compagnie reste responsable de ses techniciens. Ma liste : plan de prévention, plan d'accroche avec les masses, rapports de vérification des palans et des élingues, notices, capacité de nos points. Mesure du plan de prévention que je retiens : personne sous le pont pendant la levée, zone balisée et gardée.",
    "Je débute dans l'accroche. J'ai mis du temps à distinguer les rôles : l'exploitant du lieu coordonne, chaque employeur protège ses salariés, le régisseur général valide le plan d'accroche avec la compagnie. J'ai listé cinq documents, dont les rapports de vérification des palans, qui manquent ici : dans ce cas, les palans de la compagnie ne servent pas. Pour le public, élingue de sécurité après la mise à hauteur et aucune manœuvre au-dessus de lui. Le plan de prévention fixe un chef de manœuvre unique.",
    "Je suis régiss{eur} général{e} d'une compagnie, donc de l'autre côté. Ma fiche technique devra désormais donner la masse totale du pont, des projecteurs et du câblage, et je joindrai les rapports de vérification de nos palans et de nos accessoires. J'ai compris que le théâtre peut refuser un matériel non vérifié, et qu'il a raison. Trois mesures de prévention : balisage, chef de manœuvre unique, contrôle conjoint des accessoires.",
    "Technicien{ne} lumière, j'accroche souvent sans me poser la question des responsabilités. L'exercice m'a montré que le plan de prévention est le document qui règle tout cela avant le montage. Pour le pont au-dessus des premiers rangs : palans D8 levés hors présence du public, puis élingues de sécurité ; ou des palans D8+ si le lieu l'accepte. Sans rapport de vérification, refus des palans de la compagnie.",
    "Machiniste construct{/rice}, je pense d'abord au décor : sa masse doit figurer sur la feuille de charges. Pour les rôles, chaque employeur répond de ses salariés et l'exploitant coordonne. Documents : plan de prévention, plan d'accroche, feuille de charges, rapports de vérification, notices, déclaration de conformité des accessoires. Mesures : levée sans personne dessous, contrôle des accessoires à deux, garde-corps au gril.",
  ],
  // 1 — Contrepoids
  [
    "Charge ajoutée : 140 + 4 × 12 = 188 kg, sous la CMU de 250 kg. Contrepoids : 18 pains de 10 kg et un demi-pain de 5 kg, soit 185 kg ; il reste 3 kg côté porteuse. En tant que chef machiniste, j'impose l'ordre : porteuse en bas, décor et projecteurs d'abord, puis les pains depuis la passerelle ; au déchargement, les pains d'abord.",
    "Je suis cintr{ier}, c'est mon quotidien. 188 kg ajoutés, donc 18 pains et un demi-pain dans l'équipe, 3 kg de déséquilibre côté porteuse, acceptable. Le frein tient une porteuse équilibrée, pas un déséquilibre de plusieurs dizaines de kilos : il glisserait. Annonces : « Passerelle, ici plateau, porteuse 12 chargée, tu peux charger dix-huit pains et un demi », puis « Plateau, chargement terminé ».",
    "J'ai d'abord vérifié la CMU : 188 kg sur 250 kg répartis, c'est bon si les projecteurs sont répartis sur la longueur. Contrepoids : 185 kg avec 18 pains et un demi-pain. Procédure : porteuse au point bas, frein serré, décor accroché, puis chargement de l'équipe sur annonce, et essai lent. Au démontage, je décharge l'équipe avant la porteuse.",
    "Dans ma salle municipale, il n'y a que deux porteuses contrebalancées, et je ne connaissais pas l'ordre. Je retiens : la porteuse d'abord, les contrepoids ensuite, et l'inverse au déchargement. Calcul : 188 kg, donc 18 pains et un demi-pain. Le déséquilibre restant de 3 kg est faible ; on vise l'équilibre à quelques kilos près.",
    "Le calcul m'a pris un peu de temps : 140 kg plus 48 kg de projecteurs, 188 kg. Avec des pains de 10 kg, 18 pains font 180 kg, plus un demi-pain : 185 kg. Ordre de chargement : porteuse en bas, charge accrochée, puis contrepoids. Si on décharge le décor avant les pains, la porteuse part vers les cintres : c'est le scénario à ne jamais vivre.",
    "Comme régiss{eur} de compagnie, je dois donner des masses justes : sans les 4 projecteurs de 12 kg, le cintrier aurait chargé 14 pains, et la porteuse aurait été lourde de 48 kg. Le bon calcul : 188 kg, 18 pains et un demi-pain. Je comprends pourquoi le chargement se fait porteuse en bas et pourquoi le frein ne doit pas compenser un mauvais équilibrage.",
    "Je suis technicien{ne} lumière : mes 4 projecteurs de 12 kg comptent dans les 188 kg. Contrepoids : 18 pains et un demi-pain. Au démontage, j'attends que la passerelle ait retiré les pains avant de décrocher mes projecteurs, sinon la porteuse s'allège d'un coup et l'équipe l'emporte vers le haut. Annonce et réponse à chaque étape.",
    "Machiniste construct{/rice}, je pèse désormais chaque élément de décor à l'atelier : ici 140 kg pour la frise. Avec les projecteurs, 188 kg, sous la CMU de 250 kg. Contrepoids : 185 kg en 18 pains et un demi-pain. Procédure : porteuse au point bas, accroche, chargement de l'équipe depuis la passerelle, essai lent, puis réglage.",
  ],
  // 2 — Porteuse motorisée et rideau de fer
  [
    "Chef machiniste, je fais vérifier avant le premier service : fins de course haute et basse, frein, arrêt d'urgence, détection de mou de câble, charge accrochée de 90 kg sous la CMU de 500 kg. Manœuvre en spectacle : « Attention porteuse 3, en attente », top, mouvement en gardant la zone sous les yeux, arrêt au repère, « Porteuse 3 en place ». Rideau de fer essayé chaque jour, ligne de chute marquée et dégagée.",
    "Je suis cintr{ier} et je conduis aussi le pupitre. Si un comédien est dans la zone au top, je ne lance pas la manœuvre et je préviens le régisseur : la sécurité passe avant l'effet. Si quelqu'un entre pendant le mouvement, arrêt immédiat. Pour le rideau de fer, rien ne doit être posé sur sa ligne de chute, pas même un câble.",
    "Régiss{eur} plateau, je prépare la conduite avec les repères vérifiés au service. Sécurités contrôlées : fins de course, frein, arrêt d'urgence. Annonce, attente, top, mouvement surveillé, arrêt, confirmation. Essai du rideau de fer avant l'ouverture des portes, avec quelqu'un qui surveille la scène ; s'il ne descend pas jusqu'au sol, j'avertis l'exploitant et l'incident va au registre.",
    "Dans ma salle municipale, il n'y a pas de rideau de fer, mais j'ai compris son rôle : séparer la scène de la salle en cas d'incendie. Pour la porteuse motorisée, ma check-list : fins de course, frein, arrêt d'urgence testé, câbles et poulies visibles, zone de débattement libre. La manœuvre se fait sur annonce et réponse, zone toujours sous les yeux.",
    "Je débute, et la procédure écrite m'aide : préparation, annonce, mouvement, arrêt, confirmation. Je vérifie que la toile de 90 kg reste bien sous les 500 kg de la porteuse. Si le rideau de fer bloque pendant l'essai, je ne passe pas dessous pour chercher l'obstacle pendant qu'il bouge ; je préviens le responsable de la sécurité du lieu.",
    "Régiss{eur} général{e} de compagnie, je donne les tops. J'ai compris que le cintrier ou le machiniste au pupitre peut refuser un top si la zone n'est pas libre, et que c'est normal. Nos décors ne doivent jamais empiéter sur la ligne de chute du rideau de fer : je l'indiquerai sur notre plan d'implantation.",
    "Technicien{ne} lumière, je pose souvent des pieds de projecteurs au cadre de scène : je sais maintenant que la ligne de chute du rideau de fer est marquée au sol et doit rester libre. Pour la manœuvre motorisée, annonce, top, mouvement surveillé, arrêt au repère, confirmation ; arrêt d'urgence à portée de main.",
    "Machiniste construct{/rice}, je pense aux décors qui descendent sur une porteuse motorisée : la détection de mou de câble arrête la descente si le décor touche un obstacle. Avant chaque spectacle, contrôle des sécurités et des repères ; pendant la manœuvre, zone sous les yeux. Rideau de fer : essai quotidien et rien sur sa ligne de chute.",
  ],
  // 3 — Élingage à deux brins
  [
    "400 kg de masse, environ 3,9 kN de poids. Effort par brin : à 60°, 200 / 0,866, environ 231 kg ; à 90°, 200 / 0,707, environ 283 kg ; à 120°, 400 kg par brin. Je choisis des élingues rondes violettes de 1 000 kg pour 90°, avec des manilles adaptées. En chef machiniste, je limite l'angle au sommet à 90° sur nos levées.",
    "Je fais le calcul avec la formule : (charge / 2) / cos (angle / 2). Pour le lustre de 400 kg, 231 kg à 60°, 283 kg à 90°, 400 kg à 120°. À 120°, chaque brin porte la charge entière : c'est pour ça qu'on ne dépasse pas 90° en pratique. Élingues violettes, CMU de 1 000 kg en levage direct.",
    "Ce que je retiens : l'effort dans chaque brin augmente vite avec l'angle. 400 kg, c'est environ 3 924 N. Par brin : environ 231 kg à 60°, 283 kg à 90°, 400 kg à 120°. Si les brins ont des longueurs différentes, le plus court prend presque tout ; je corrige et je fais un essai de décollement à quelques centimètres.",
    "Je ne savais pas calculer un élingage. Avec le cosinus : 90° au sommet, 45° de chaque côté de la verticale, cos 45° = 0,707, donc 200 / 0,707 = environ 283 kg par brin. À 120°, 400 kg par brin. Choix : élingues rondes violettes de 1 000 kg ; au-delà de 120°, on ne lève pas.",
    "Le facteur de mode m'a éclairé{e} : deux brins jusqu'à 90°, la CMU de l'ensemble vaut 1,4 fois celle d'un brin. Calcul du lustre : 231 kg par brin à 60°, 283 kg à 90°, 400 kg à 120°. Je vérifie chaque étiquette et je prends des manilles dont la CMU couvre l'effort, charge dans l'axe.",
    "Régiss{eur} de compagnie, j'ai des élingues dans nos caisses sans jamais avoir fait le calcul. Pour 400 kg et un angle au sommet de 90°, chaque brin prend environ 283 kg, pas 200 kg. Nos élingues violettes de 1 000 kg conviennent, mais je ne les utiliserai plus avec un angle ouvert à 120°, où chaque brin porterait 400 kg.",
    "Je suis technicien{ne} lumière : je pensais que chaque brin prenait toujours la moitié. Faux : à 90°, environ 283 kg par brin pour 400 kg, et 400 kg à 120°. Masse et poids : 400 kg font environ 3,9 kN. Je garde le tableau des facteurs d'angle dans ma caisse.",
    "Machiniste construct{/rice}, je vais placer les points de levage du lustre pour que l'angle au sommet reste sous 90° : environ 283 kg par brin au maximum. À 60°, on descend à 231 kg. Les deux brins doivent avoir la même longueur ; sinon la charge penche et un brin reprend presque tout.",
  ],
  // 4 — Tri et rebut
  [
    "Chef machiniste, j'ai trié le lot : élingue sans étiquette lisible au rebut ; élingue acier avec fils cassés et écrasement au rebut ; manille avec boulon du commerce au rebut ou en examen, jamais en service ; élingue à l'âme visible au rebut ; collier sans CMU hors levage ; élingue chaîne au maillon allongé au rebut ; élingue simplement salie, en service après nettoyage. Chaque rebut est coupé ou marqué et noté dans l'inventaire.",
    "En tant que cintr{ier}, je vois passer ces accessoires. Mon tri : 1, 2, 4 et 6 au rebut, 3 au rebut faute de goupille d'origine, 5 hors service pour le levage, 7 en service après nettoyage et contrôle. Pour que le rebut soit définitif, on coupe l'élingue, on isole la manille, et on écrit la date, la raison et le nom de la personne qui décide.",
    "Régiss{eur} plateau, j'applique une règle simple : pas d'identification, pas de levage. Donc l'élingue sans étiquette et le collier sans CMU sortent du service. Câble avec fils cassés et écrasement, gaine coupée avec âme visible, maillon allongé : rebut. La manille au boulon : rebut. Seule l'élingue salie mais intacte repart. J'informe le magasin et l'équipe.",
    "Je n'avais jamais trié d'accessoires. Les critères de rebut sont clairs : étiquette illisible, fils cassés, écrasement, âme visible, maillon allongé, pièce non d'origine. J'ai classé six accessoires sur sept hors service ; l'élingue salie reste en service après nettoyage selon la notice. Le rebut est noté dans le registre du parc.",
    "Technicien{ne} d'accroche débutant{e}, j'ai hésité sur la manille : un boulon du commerce semble solide, mais ce n'est pas la pièce d'origine, donc rebut ou examen par une personne compétente. Le reste : rebut pour 1, 2, 4 et 6, collier sans marquage hors levage, élingue salie en service. Rendre le rebut définitif évite qu'un collègue le récupère.",
    "Comme régiss{eur} de compagnie, je reconnais notre lot de retour de tournée. Je mets au rebut l'élingue sans étiquette, le câble abîmé, l'élingue à l'âme visible et la chaîne au maillon allongé ; la manille au boulon part en examen ; le collier sans CMU ne sert plus au levage. Je tiendrai désormais un inventaire avec les dates de vérification.",
    "Technicien{ne} lumière, j'utilise surtout des colliers et des élingues de sécurité. J'ai appris qu'un collier sans marquage de CMU ne doit pas servir au levage. Pour le reste du lot, rebut des accessoires sans identification ou abîmés, l'élingue salie mais intacte repart. Chaque mise au rebut est tracée.",
    "Machiniste construct{/rice}, j'ai l'habitude de réparer : ici, on ne répare pas un accessoire de levage. Le câble aux fils cassés, l'élingue coupée et la chaîne au maillon allongé vont au rebut, coupés ou marqués pour ne plus resservir. La manille sans sa goupille d'origine aussi. Inscription dans l'inventaire avec la raison.",
  ],
  // 5 — Mise en place d'un palan (ordre des phases)
  [
    "Chef machiniste, ma check-list : rapport de vérification valide, plaque lisible, chaîne sans usure ni vrillage, crochets et linguets, sac à chaîne adapté, câbles et connecteurs, frein, sens de marche, fins de course, bruit. En commande directe, l'ordre des phases est vérifié dès le premier essai : inversé, il rend les fins de course inopérantes. Élingue de sécurité après la mise à hauteur.",
    "Cintri{/rice}, je découvre les palans. J'ai compris la différence : en commande directe, les contacteurs sont dans le pupitre ; une inversion des phases fait partir le palan à l'envers et les fins de course coupent le mauvais mouvement. Je corrige à la source avec l'inverseur du pupitre, jamais en inversant les boutons. Essai à vide puis sous faible charge.",
    "Régiss{eur} plateau, j'élingue le palan au point du gril avec une manille de CMU adaptée, sans arête vive ; la chaîne entre droite dans le sac ; les câbles ne tirent pas sur les connecteurs. Je contrôle l'ordre des phases avant toute charge : la touche montée doit faire monter. L'élingue de sécurité est posée après la mise à hauteur, avec le moins de mou possible.",
    "Ma check-list en huit points : rapport de vérification, marquage, chaîne, crochets, sac, câbles, frein, fins de course. Pour le sens de marche, essai à vide : si ça descend sur « montée », les phases sont inversées et je ne lève rien. Je reporte le numéro du palan sur le plan d'accroche et sur le pupitre.",
    "Je débute dans l'accroche. Le piège de la commande directe m'a marqué{e} : avec les phases inversées, la fin de course basse ne coupe plus la descente. Donc j'essaie d'abord à vide, je vérifie le sens et je teste les fins de course. L'élingue de sécurité se pose une fois le pont à sa hauteur définitive, avant que le public soit dessous.",
    "Régiss{eur} général{e} de compagnie, nos palans tournent sur des distributions différentes chaque soir : l'ordre des phases change d'un lieu à l'autre. J'ajoute à notre procédure un essai du sens et des fins de course à chaque arrivée. Le rapport de vérification de chaque palan voyage avec lui.",
    "Technicien{ne} lumière, je branche souvent les palans sans savoir ce qu'il y a derrière. Commande directe : contacteurs dans le pupitre ; commande basse tension : contacteurs dans le palan. Avec des phases inversées en directe, les fins de course ne protègent plus : je vérifie le sens avant toute charge. Check-list complète avant usage.",
    "Machiniste construct{/rice}, j'ai pratiqué la mise en place : palan orienté pour que la chaîne entre droite dans le sac, sac fixé et adapté à la longueur. Contrôle de la chaîne, des crochets et du frein. Essai du sens et de l'ordre des phases, puis des fins de course haute et basse. Élingue de sécurité après mise à hauteur.",
  ],
  // 6 — Diagnostic (frein, chaîne vrillée, limiteur, phases)
  [
    "Chef machiniste, mon diagnostic : palan 4, phases inversées, arrêt et correction à la source ; palan 2, bloc crochet retourné, chaîne redressée selon la notice avant charge ; palan 6, limiteur de couple qui patine, charge à recalculer, réglage par une personne compétente ; palan 1, frein qui glisse, hors service immédiat et étiquetage. Tout est noté.",
    "Le cas le plus grave pour moi, cintr{ier}, c'est le frein du palan 1 : une charge qui descend de quelques centimètres à chaque arrêt, c'est un palan qu'on retire du service, après avoir sécurisé ou posé la charge. Le palan 4 qui monte sur « descente » vient des phases : plus aucune fin de course n'est fiable tant que ce n'est pas corrigé.",
    "Régiss{eur} plateau, j'ai rempli le tableau cause, risque, conduite, intervenant. Phases inversées : risque de dépassement des fins de course. Chaîne vrillée : blocage et usure. Limiteur qui patine : surcharge. Frein qui glisse : chute possible de la charge, palan hors service. Dans les quatre cas, j'informe le chef de manœuvre et je consigne.",
    "Je n'avais jamais diagnostiqué un palan. Ce que je retiens : je peux redresser une chaîne vrillée en suivant la notice, mais le réglage du limiteur et la réparation du frein relèvent d'une personne compétente. Pour le sens inversé, je corrige l'ordre des phases à la distribution, puis je reteste les fins de course.",
    "Technicien{ne} d'accroche débutant{e}, j'ai failli dire qu'on pouvait finir la journée avec le frein du palan 1 : non, il sort du service. Le palan 6 qui ne monte plus sous charge n'est pas en panne de moteur, c'est le limiteur de couple qui patine ; on redescend et on recalcule. Personne sous la charge pendant le diagnostic.",
    "Régiss{eur} général{e} de compagnie, je retiens la conduite à tenir pour la tournée : un palan au frein défaillant est étiqueté hors service et ne repart pas dans le camion sans réparation. Pour la chaîne vrillée, le bloc crochet s'est retourné entre les brins. Pour le sens inversé, l'ordre des phases du lieu diffère du nôtre.",
    "Technicien{ne} lumière, j'ai appris à ne plus « inverser les boutons » quand un palan part à l'envers : ce sont les phases, et ça neutralise les fins de course. Pour le frein qui glisse : palan hors service. Pour le limiteur qui patine : charge trop lourde ou réglage, pas de nouvel essai en forçant.",
    "Machiniste construct{/rice}, je vois le lien avec mes décors : si le limiteur du palan 6 patine, la masse annoncée était sans doute fausse ; je repèse l'élément. Frein qui glisse : retrait du service. Chaîne vrillée : redressée avant charge. Phases inversées : correction à la source et essai des fins de course.",
  ],
  // 7 — Répartition des charges
  [
    "Chef machiniste. Masse : 84 kg de pont, 256 kg de projecteurs, 24 kg de câblage, 364 kg. Sur deux palans : 182 kg chacun. Sur trois palans, répartition 3/16, 5/8, 3/16 : environ 68 kg, 227,5 kg et 68 kg. Avec l'écran de 120 kg à 4 m de la gauche : 80 kg à gauche, 40 kg à droite, soit 262 kg et 222 kg. Tout reste sous 500 kg et sous les 750 kg des points.",
    "Cintri{/rice}, je n'avais jamais fait de répartition sur trois appuis. Le palan du milieu reprend 5/8 de la charge : 227,5 kg sur 364 kg, beaucoup plus qu'un tiers. Les extrémités prennent chacune environ 68 kg. Ligne de feuille de charges : point, palan, charge calculée, CMU, capacité du point, accessoires, visa.",
    "Régiss{eur} plateau. Total suspendu : 364 kg. Deux palans aux extrémités : 182 kg chacun. L'écran de 120 kg, par la règle du levier : 120 × 8 / 12 = 80 kg à gauche et 120 × 4 / 12 = 40 kg à droite. Répartition finale : 262 kg et 222 kg, sous la CMU de 500 kg des palans.",
    "J'ai refait le calcul deux fois. Pont 12 × 7 = 84 kg, projecteurs 8 × 32 = 256 kg, câblage 12 × 2 = 24 kg : 364 kg. Trois palans : 364 × 3/16 = 68,25 kg aux extrémités, 364 × 5/8 = 227,5 kg au milieu ; la somme fait bien 364 kg. Cette répartition va sur la feuille de charges.",
    "Technicien{ne} d'accroche débutant{e}, j'aurais partagé en trois parts égales : 121 kg chacun. Erreur : le palan du milieu reprend 227,5 kg. Avec deux palans, 182 kg chacun ; avec l'écran, 262 kg et 222 kg. La répartition correcte change le choix des palans et la vérification des points.",
    "Régiss{eur} général{e} de compagnie, je retiens qu'il faut annoncer la masse du câblage : 24 kg ici. Total 364 kg ; répartition sur deux palans, 182 kg chacun ; sur trois, 68 kg, 227,5 kg et 68 kg. Je joindrai ce calcul à notre fiche technique.",
    "Technicien{ne} lumière, mes 8 projecteurs pèsent 256 kg à eux seuls. La répartition sur deux palans donne 182 kg chacun avec le pont et le câblage. L'écran à 4 m de la gauche charge surtout le palan gauche : 80 kg contre 40 kg. Je vérifie ensuite le pont avec la table.",
    "Machiniste construct{/rice}, j'ai appliqué la règle du levier à l'écran de 120 kg : 80 kg à gauche, 40 kg à droite. Avec la répartition du pont, 262 kg et 222 kg. Sur trois palans, le milieu prend 5/8 de la charge répartie. Toutes les valeurs restent sous les capacités des palans et des points.",
  ],
  // 8 — Table de charge
  [
    "Chef machiniste. Charge utile répartie : 280 kg, sous les 450 kg de la table pour 12 m. Avec l'écran au centre : 280 / 450 = 0,62 et 120 / 300 = 0,40, somme 1,02 : refusé sur deux palans. Solution : un troisième palan au milieu, travées de 6 m, table à 1 400 kg répartis. Je n'extrapole jamais une table.",
    "Cintri{/rice}, la lecture de la table m'a demandé de l'attention : charge utile hors poids propre, pont suspendu à ses extrémités. 280 kg passent sur 12 m ; avec l'écran, la somme des taux dépasse 1. Avec trois palans, chaque travée fait 6 m et la configuration convient. Je refais ensuite la répartition entre les palans.",
    "Régiss{eur} plateau, conditions de validité de la table : éléments de la même série, manchons, goupilles et épingles d'origine, élingage autour des membrures principales près d'un nœud, aucun élément déformé. Résultat : 280 kg admissibles sur 12 m, mais pas avec l'écran (1,02) ; trois palans règlent le problème.",
    "Je n'avais jamais lu une table de charge. Ici : 12 m, 450 kg répartis ou 300 kg au centre. Pour le cas combiné, la notice de l'exercice demande la somme des taux : 0,62 + 0,40 = 1,02, donc non. Si la table ne donne pas mon cas, je demande au fabricant ou à un bureau d'études.",
    "Technicien{ne} d'accroche débutant{e}, j'ai d'abord comparé 280 + 120 = 400 kg à 450 kg et conclu que ça passait : faux, car l'écran est une charge ponctuelle, limitée à 300 kg au centre. La somme des taux d'utilisation de la table donne 1,02. Configuration retenue : trois palans.",
    "Régiss{eur} général{e} de compagnie, je joindrai désormais la table de charge de nos ponts à la fiche technique. Pour ce cas : 280 kg répartis acceptés sur 12 m, refus avec l'écran au centre, acceptation avec un palan au milieu. Je vérifie aussi que nos éléments ne sont pas déformés.",
    "Technicien{ne} lumière, je comprends mieux pourquoi le rigger refuse parfois d'ajouter un projecteur : la table fixe la limite. 280 kg sur 450 kg passent ; l'écran au centre fait dépasser 1. Avec un troisième palan ou l'écran suspendu près d'un point de levage, c'est possible.",
    "Machiniste construct{/rice}, je retiens la différence entre charge répartie et charge ponctuelle dans la table : 450 kg contre 300 kg sur 12 m. La somme des taux, 1,02, interdit la configuration à deux palans. Une configuration hors table n'est jamais extrapolée.",
  ],
  // 9 — Installation et incident (registre)
  [
    "Chef de manœuvre : vérification du plan, de la feuille de charges, des rapports et du registre ; contrôle des palans et des accessoires ; montage au sol ; balisage ; levée par paliers ; élingues de sécurité ; exploitation ; démontage inverse. Palan du milieu bloqué à 4 m : arrêt de tous les palans, zone élargie et gardée, régisseur informé, consignation, diagnostic par une personne compétente, inscription au registre.",
    "Cintri{/rice}, j'ai écrit le code radio : annonces courtes, numérotées, avec réponse ; « Stop » pour tout le monde, appliqué immédiatement. Pour l'incident, je fais arrêter tous les palans, j'éloigne tout le monde, personne sous le pont, et j'appelle le régisseur général. Le registre reçoit la date, l'heure, les circonstances et les suites.",
    "Régiss{eur} plateau, minute par minute : arrêt, zone élargie, vérification que le pont tient, information du régisseur général, consignation électrique du palan (séparer, condamner, identifier, vérifier l'absence de tension), diagnostic, descente selon une solution validée, palan étiqueté hors service, registre complété.",
    "Pour moi, technicien{ne} polyvalent{e}, l'important est l'ordre : sécuriser avant de comprendre. Palan bloqué : personne ne passe dessous, zone gardée, responsable prévenu. Avant que le technicien intervienne, consignation électrique. Ensuite, inscription au registre avec les mesures prises et les personnes informées.",
    "Technicien{ne} d'accroche débutant{e}, j'ai joué le chef de manœuvre et c'était difficile de tout surveiller. Ce qui m'a aidé{e} : un seul chef, des annonces avec réponse, des paliers courts. Pour l'incident : arrêt, balisage élargi, information, consignation, et le registre pour garder la trace et analyser les causes.",
    "Régiss{eur} général{e} de compagnie, je retiens le déroulé complet et la gestion de l'incident : arrêt, zone élargie, information du régisseur du théâtre, consignation avant toute intervention, palan retiré du service. L'incident est consigné dans le registre du lieu et dans notre propre suivi de tournée.",
    "Technicien{ne} lumière, je pensais pouvoir monter voir le moteur : non, personne sous la charge ni à côté sans décision du chef de manœuvre. Arrêt, zone gardée, information, consignation électrique par une personne habilitée, diagnostic. Puis le registre : date, matériel, circonstances, suites.",
    "Machiniste construct{/rice}, j'ai insisté sur le démontage : élingues de sécurité retirées, descente par paliers, pont déchargé au sol avant tout démontage d'élément. Pour l'incident du palan du milieu : arrêt, zone élargie, information, consignation, intervention d'une personne compétente, inscription au registre.",
  ],
];

const BILANS_PERSONNELS = [
  "Cet exercice m'a obligé{e} à poser le calcul au lieu d'estimer.",
  "Je vais refaire cette procédure dans mon lieu dès le prochain montage.",
  "J'ai comparé ma copie avec celle de mon binôme, ce qui m'a fait corriger un oubli.",
  "Le corrigé du formateur m'a montré une étape que je sautais par habitude.",
  "Je garde la check-list dans ma caisse à outils.",
  "J'avais des doutes en arrivant, je me sens maintenant capable de le refaire seul{e}.",
  "Je vais en parler au régisseur général de mon lieu pour adapter nos consignes.",
  "J'ai posé une question au formateur pendant l'exercice, ce qui m'a évité une erreur.",
  "Je dois encore m'entraîner sur les calculs, mais je sais comment m'y prendre.",
  "Je n'ai pas tout détaillé, mais l'essentiel est là.",
  "Je vais ajouter ce point à mes fiches de tournée.",
  "Le travail en binôme m'a aidé{e} à vérifier chaque étape.",
];

/** Banque de la mise en situation à partir de son titre (ou de sa consigne), sinon de son rang. */
function blocExercice(contexte: string, exerciceIdx: number): number {
  const t = contexte || "";
  const num = t.match(/\bExercice\s+(\d{1,2})\b/i);
  if (num) {
    const n = parseInt(num[1], 10);
    if (n >= 1 && n <= EXERCICES_PRODUCTIONS.length) return n - 1;
  }
  if (/pr[ée]vention|responsabilit/i.test(t)) return 0;
  if (/contrepoids|contrebalanc/i.test(t)) return 1;
  if (/motoris[ée]e|rideau de fer/i.test(t)) return 2;
  if (/[ée]lingage|brins?\b|angle/i.test(t)) return 3;
  if (/rebut|accessoires/i.test(t)) return 4;
  if (/mettre en place|contr[ôo]ler un palan/i.test(t)) return 5;
  if (/diagnosti|d[ée]faut/i.test(t)) return 6;
  if (/r[ée]partir|r[ée]partition/i.test(t)) return 7;
  if (/table/i.test(t)) return 8;
  if (/incident|installation|registre/i.test(t)) return 9;
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickMSC70ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isMSC70Formation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);
  const bloc = blocExercice(contexte || "", exerciceIdx);

  // Production tirée par permutation du rang du stagiaire, avec le même décalage pour toutes les
  // banques : un stagiaire garde le même métier d'un exercice à l'autre, et sur un groupe de
  // 8 stagiaires les 8 productions d'un même exercice sont toutes différentes. Le bilan personnel
  // change d'un exercice à l'autre. La structure du stagiaire est citée quand elle est renseignée.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[rang(stagiaireIdx, 3, pool.length)];
  const bilan = BILANS_PERSONNELS[rang(stagiaireIdx, bloc + 11, BILANS_PERSONNELS.length)];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai rapproché l'exercice des pratiques de ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "CAP Menuisier fabricant, puis expérience de plateau",
  "Baccalauréat professionnel Technicien constructeur bois",
  "BTS Métiers de l'audiovisuel",
  "Baccalauréat professionnel Métiers de l'électricité et de ses environnements connectés",
  "Licence Arts du spectacle",
  "BTS Électrotechnique",
  "CAP Serrurier métallier",
  "DUT Génie mécanique et productique",
  "DMA Régie du spectacle",
  "Baccalauréat général, puis apprentissage du métier sur le plateau",
  "Aucun diplôme du secteur : quinze ans d'expérience de plateau",
  "BTS Conception et réalisation de systèmes automatiques",
  "CAP Charpentier bois",
  "Baccalauréat STI2D",
  "Master Arts de la scène",
  "BTS Systèmes constructifs bois et habitat",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour préparer les calculs.",
  "Non, aucune situation de handicap déclarée. Mon aptitude au travail en hauteur est à jour auprès de mon service de santé au travail.",
  "Non. Je porte des lunettes et j'apprécie des plans et des tables de charge imprimés en grand format.",
  "Non, pas de handicap. J'entends moins bien dans le bruit : je préfère être placé{e} près du formateur pendant les démonstrations.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je préfère disposer des corrigés de calcul par écrit pour les revoir le soir.",
  "Non, aucune situation de handicap. Une ancienne blessure à l'épaule me demande d'éviter le port de charges lourdes au-dessus de la tête ; je le signalerai si besoin.",
  "Non. Je préfère avoir les fiches en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté avant la formation.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible les dix jours de formation, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>.",
  "J'ai bloqué les dix jours de formation (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) entre deux contrats ; aucune date de spectacle n'est prévue sur cette période.",
  "Je suis disponible les dix jours de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; mon employeur a organisé mon remplacement au plateau.",
  "Je peux suivre l'intégralité des dix jours, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible les dix jours (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). J'ai décalé une date de tournée pour suivre la formation en entier.",
  "Disponibilité complète sur les dix jours de formation (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). J'ai prévenu mes employeurs habituels que je ne serai pas disponible.",
  "Les dix jours de formation, je suis disponible de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; le planning du théâtre a été adapté.",
  "Je suis disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> les dix jours, et je prévois de revoir les calculs le soir.",
  "Je suivrai les dix jours de formation (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) et je garde mes soirées libres pour les fiches à retenir.",
  "Aucune contrainte sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> des dix jours. Mon régisseur général a validé mon absence.",
];

/** Réponses d'évaluation des besoins propres à la formation Machinerie scénique 70 h, différentes pour chaque stagiaire. */
export function getMSC70EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = msc70Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilMSC70(idx, s.nom, s.prenom);
  const pick = (arr: string[], sel: number) => accorder(arr[rang(base, sel, arr.length)], fem);
  const civilite = s.civilite === "Mme" ? "Madame" : s.civilite === "M." ? "Monsieur" : (s.civilite || "Madame");

  return {
    civilite,
    raisonSociale: hasEntreprise ? (s.entreprise as string) : "/",
    attentes: entAccords(profil.attentes, fem),
    missions: entAccords(profil.missions, fem),
    contribution: entAccords(profil.contribution, fem),
    diplome: pick(BESOINS_DIPLOMES, 4),
    objectif: entAccords(profil.objectif, fem),
    budget: hasEntreprise
      ? "Formation financée par l'employeur, avec une demande de prise en charge à l'Afdas."
      : "Demande de prise en charge à l'Afdas au titre des intermittents du spectacle ; à défaut, financement personnel.",
    projetPro: entAccords(profil.projet, fem),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles peuvent être lues hors de la session,
    // sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
