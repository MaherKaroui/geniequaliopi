// ---------------------------------------------------------------------------
// « Projecteurs automatiques et pupitre grandMA – 70 h » — moteur de réponses HUMANISÉES
// Formation professionnelle non certifiante : évaluation interne + attestation de fin de formation.
// 70 h sur 10 jours (7 h par jour), groupe de 6 techniciens du spectacle (intermittents et permanents).
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes de
//     l'employeur…), puis parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes, dans l'ordre des 10 mises en situation, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par mise en situation + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Le Théâtre des Quatre Vents, cité dans les copies, est la salle FICTIVE du support de cours.
// La modalité de la formation n'est jamais citée.
// ---------------------------------------------------------------------------

const normalize = (s?: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Projecteurs automatiques et pupitre grandMA – 70 h ».
 * Reconnue par son intitulé seulement : l'intitulé normalisé (minuscules, sans accents) contient
 * « grandma », ou à la fois « projecteur » et « automatique ».
 */
export function isGMA70Formation(intitule?: string, code?: string): boolean {
  void code;
  const t = normalize(intitule).toLowerCase();
  if (!t) return false;
  return t.includes("grandma") || (t.includes("projecteur") && t.includes("automatique"));
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function gma70Seed(nom?: string, prenom?: string): number {
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

/** {e} → e au féminin ; {le} → le ; {ne} → ne ; {/rice} → rice (sinon eur) ; {/euse} → euse (sinon eur) */
function accorder(txt: string, fem: boolean): string {
  return txt
    .replace(/\{\/rice\}/g, fem ? "rice" : "eur")
    .replace(/\{\/euse\}/g, fem ? "euse" : "eur")
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
  typeof idx === "number" && idx >= 0 ? idx : gma70Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// fiche technique, choix du parc, accroche, adressage DMX, réseau et univers, show file et patch,
// groupes et presets, cues et tracking, effets et conduite, maintenance et pannes
// ---------------------------------------------------------------------------
export const GMA70_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Quand vous recevez la fiche technique d'un projecteur automatique, quelles informations y cherchez-vous et pour quoi faire ?", reponseAttendue: "Masse et dimensions pour l'accroche, consommation pour la distribution électrique, modes et charte DMX pour le patch, zoom et flux pour l'implantation, niveau sonore ; lecture des attributs en 8 ou 16 bits et du canal de contrôle." },
    { question: "Comment choisiriez-vous les projecteurs automatiques d'un spectacle (familles, nombre, sources) ?", reponseAttendue: "Choix guidé par les besoins artistiques et techniques : spot pour les découpes et gobos, wash pour les ambiances, beam pour les faisceaux, hybride pour la polyvalence ; sources (décharge, LED, laser-phosphore) comparées sur le bruit, la consommation et la maintenance ; contraintes de poids, de canaux et de budget." },
    { question: "Comment accrochez-vous un projecteur automatique sur une perche, et quelles règles de sécurité appliquez-vous ?", reponseAttendue: "Oméga verrouillé, crochets ou colliers adaptés, élingue de sécurité indépendante de l'accroche principale ; contrôle visuel du matériel ; perche descendue à hauteur de travail, protections collectives avant les protections individuelles ; personne sous la charge, ordre de manœuvre donné par le responsable." },
    { question: "Comment adressez-vous et câblez-vous une ligne DMX de plusieurs appareils ?", reponseAttendue: "Calcul des adresses selon le mode de chaque appareil sans recouvrement ni dépassement de l'univers, câble DMX de 110 ohms, chaînage, terminaison de 120 ohms en fin de ligne, splitter au-delà de 32 appareils ou pour plusieurs branches, contrôle par testeur ou par RDM." },
    { question: "Comment organisez-vous les univers, le plan de feux et le réseau entre le pupitre et les projecteurs ?", reponseAttendue: "Patch papier cohérent avec le plan de feux, répartition des appareils par univers avec réserve, réseau lumière dédié, nodes, adresses IP notées, choix d'Art-Net ou de sACN par univers, règles de fiabilité." },
    { question: "Avez-vous déjà utilisé un pupitre grandMA, et comment prépareriez-vous un nouveau spectacle dessus ?", reponseAttendue: "Architecture du système (console, onPC, processing units, MA-Net3), création du show file, import des types d'appareils, patch avec fixture ID, univers et adresses, layout, utilisateur et profil, sauvegardes datées et copie externe." },
    { question: "Comment organisez-vous votre programmation pour pouvoir la modifier rapidement ?", reponseAttendue: "Groupes ordonnés, presets de position, de couleur, de gobo et de faisceau nommés, cues programmées par presets pour corriger toute la conduite en modifiant un preset." },
    { question: "Comment enregistrez-vous et modifiez-vous une suite de cues, et que savez-vous du tracking ?", reponseAttendue: "Séquence affectée à un executor, store et update, temps de transition et delays, tracking compris (une valeur se propage jusqu'à la prochaine valeur enregistrée), corrections limitées à une cue si nécessaire, préparation des mouvements dans le noir." },
    { question: "Comment créez-vous des effets et encodez-vous une conduite écrite sur un pupitre ?", reponseAttendue: "Phasers avec vitesse, amplitude et phase répartie, MAtricks (wings, interleave, groups, block), pages d'executors, macros, déclenchements par timecode, encodage cue par cue à partir des tops de la conduite écrite." },
    { question: "Que faites-vous pour entretenir un parc de projecteurs automatiques et face à une panne pendant un spectacle ?", reponseAttendue: "Maintenance préventive (optiques, filtres, ventilateurs, accessoires d'accroche), diagnostic ordonné (adressage, liaison DMX, alimentation, mécanique, capteurs), mesure provisoire sans arrêter le spectacle, mise à jour logicielle hors exploitation, archivage du spectacle." },
  ],
  fin: [
    { question: "Comment exploitez-vous maintenant une fiche technique et une charte DMX pour préparer un spectacle ?", reponseAttendue: "Données relevées et utilisées (masse pour l'accroche, consommation pour l'électricité, modes pour le patch, zoom pour l'implantation, bruit), choix d'un mode DMX justifié, attributs en 16 bits, canal de contrôle repéré et jamais enregistré dans une cue de spectacle." },
    { question: "Comment justifiez-vous le choix d'un parc de projecteurs automatiques pour un projet ?", reponseAttendue: "Familles choisies selon les besoins (découpes, ambiances, faisceaux), sources comparées, calcul des masses par perche et des canaux par univers, questions au loueur (modes, versions, entretien, accessoires)." },
    { question: "Comment procédez-vous désormais pour accrocher un appareil en sécurité ?", reponseAttendue: "Matériel vérifié et adapté à la masse, oméga verrouillé, deux crochets ou colliers, élingue de sécurité courte passée dans le point prévu, perche à hauteur de travail, protections collectives, aucune personne sous la charge, ordre de manœuvre annoncé." },
    { question: "Comment calculez-vous les adresses et vérifiez-vous une ligne DMX ?", reponseAttendue: "Adresse suivante = adresse + nombre de canaux, dernier canal contrôlé, câble adapté, terminaison de 120 ohms, splitter quand nécessaire, contrôle par RDM ou testeur au sol, contrôle appareil par appareil depuis le pupitre." },
    { question: "Comment concevez-vous le réseau lumière et la répartition des univers ?", reponseAttendue: "Patch papier cohérent avec le plan de feux, répartition par zone avec réserve, réseau dédié, adresses IP fixes, Art-Net ou sACN choisi par univers, nodes au plus près, vérification de chaque univers avant la représentation." },
    { question: "Comment créez-vous un show file et patchez-vous un parc sur grandMA3 ?", reponseAttendue: "Show file nommé selon la convention, types d'appareils importés avec le bon mode, fixture ID identiques au plan de feux, adresses sans conflit, layout fidèle à l'implantation, utilisateur et vue de travail, sauvegardes datées et copie externe." },
    { question: "Comment utilisez-vous les groupes et les presets dans votre programmation ?", reponseAttendue: "Groupes ordonnés pour les effets, presets nommés selon les zones et les intentions, cues programmées uniquement par presets, correction de toute la conduite par la mise à jour d'un preset." },
    { question: "Comment encodez-vous une séquence de cues et maîtrisez-vous le tracking ?", reponseAttendue: "Séquence sur un executor, cues numérotées comme la conduite écrite, temps et delays, mouvements préparés dans le noir, update et store en merge, propagation des valeurs maîtrisée (cue only ou valeur bloquante)." },
    { question: "Comment créez-vous des effets et restituez-vous une conduite complète ?", reponseAttendue: "Phasers réglés (vitesse, amplitude, phase), MAtricks appliqués (wings, interleave), pages d'executors claires, macros testées, timecode vérifié, restitution aux tops sans erreur." },
    { question: "Comment entretenez-vous le parc et réagissez-vous face à une panne ?", reponseAttendue: "Fiche de maintenance préventive suivie, diagnostic du plus simple au plus complexe et en sécurité, appareil neutralisé depuis le pupitre pendant la représentation, réparation après, mise à jour hors exploitation, archive complète du spectacle." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle.
// Aucune réponse à 1 au début : au plus 5 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — fiche technique et charte DMX
  [
    ["Je regarde surtout la puissance de l'appareil, le reste je le découvre sur place.", 0],
    ["Je cherche le poids pour l'accroche et la consommation pour savoir combien en mettre par ligne.", 0.5],
    ["Je ne lis pas vraiment les fiches techniques, c'est le régisseur qui s'en occupe.", 0],
    ["Je regarde le nombre de canaux du mode DMX, mais je ne sais pas bien à quoi servent les canaux fins.", 0.5],
    ["Je regarde les photos et la liste des gobos pour voir si l'appareil est joli.", 0],
    ["Je relève le poids, la consommation et les modes DMX ; je ne fais pas attention au niveau sonore.", 0.5],
    ["Je n'ai jamais eu de charte DMX entre les mains.", 0],
    ["Je repère le canal de reset sur la charte, parce qu'une fois on l'a déclenché par erreur pendant un spectacle.", 0.5],
    ["Pour moi, tous les automatiques se ressemblent, la fiche ne change pas grand-chose.", 0],
    ["Je regarde l'angle du zoom pour savoir si l'appareil couvrira la scène.", 0.5],
    ["Je demande au loueur, il connaît mieux ses appareils que moi.", 0],
    ["Je sais qu'il y a plusieurs modes DMX, mais je prends toujours le plus complet sans réfléchir.", 0.5],
  ],
  // Q2 — choix d'un parc
  [
    ["Je prends ce qui est disponible chez le loueur au meilleur prix.", 0],
    ["Je mets des spots pour les découpes et des wash pour les ambiances, mais je connais mal les beams.", 0.5],
    ["Plus il y a d'automatiques, mieux c'est.", 0],
    ["Je sais que les appareils à LED consomment moins, mais je n'ai jamais comparé leur bruit.", 0.5],
    ["C'est l'éclairagiste qui choisit, moi j'installe.", 0],
    ["Je pense au poids sur les perches, parce que notre salle a des limites de charge.", 0.5],
    ["Je choisis les modèles que je connais déjà, pour ne pas me tromper.", 0],
    ["Je sais qu'un hybride fait un peu de tout, mais je ne sais pas s'il remplace un vrai wash.", 0.5],
    ["Je ne me suis jamais posé la question des canaux DMX dans le choix.", 0],
    ["Les lampes à décharge doivent chauffer avant de donner tout leur flux, je le prends en compte pour les premières.", 0.5],
    ["Je choisis à l'œil, sur des vidéos de démonstration.", 0],
    ["Je compare la puissance électrique et le flux, mais pas le niveau sonore pour le théâtre.", 0.5],
  ],
  // Q3 — accroche et sécurité
  [
    ["Je mets deux crochets, ça tient très bien.", 0],
    ["Je mets toujours une élingue de sécurité, mais je la passe parfois dans l'oméga.", 0.5],
    ["Je monte à l'échelle et j'accroche, c'est plus rapide que de descendre la perche.", 0],
    ["J'utilise un oméga et deux crochets, et une élingue autour de la perche ; je ne vérifie pas toujours la charge de l'élingue.", 0.5],
    ["L'élingue, c'est surtout pour les appareils lourds.", 0],
    ["On fait descendre la perche à hauteur de travail quand c'est possible, sinon on prend une nacelle.", 0.5],
    ["Je ne me suis jamais occupé{e} de l'accroche, je fais surtout du pupitre.", 0],
    ["Je sais qu'on ne doit pas passer sous une perche en mouvement, mais on le fait souvent pour gagner du temps.", 0.5],
    ["Je serre les crochets à la main, sans clé.", 0],
    ["Je contrôle visuellement les crochets et les élingues, mais je ne sais pas quand les mettre au rebut.", 0.5],
    ["Un harnais suffit pour travailler en hauteur dans tous les cas.", 0],
    ["Je sais que c'est le machiniste qui donne l'ordre de manœuvre, mais je ne connais pas les règles précises.", 0.5],
  ],
  // Q4 — adressage DMX
  [
    ["Je mets tous les appareils à la même adresse quand ils doivent faire la même chose.", 0],
    ["J'ajoute le nombre de canaux à l'adresse précédente, mais je me trompe parfois d'un canal.", 0.5],
    ["Je branche, et je cherche ensuite pourquoi ça ne marche pas.", 0],
    ["Je mets un bouchon en fin de ligne quand ça clignote, sinon je n'en mets pas.", 0.5],
    ["J'utilise du câble micro, c'est le même connecteur.", 0],
    ["Je sais qu'il faut une terminaison, mais je ne connais pas sa valeur.", 0.5],
    ["Je n'ai jamais calculé d'adresses, le pupitre le fait tout seul.", 0],
    ["Je fais des tableaux d'adresses, mais je ne connais pas la limite d'appareils par ligne.", 0.5],
    ["Je règle les adresses en montant voir chaque appareil.", 0],
    ["J'ai entendu parler du RDM pour adresser à distance, mais je ne l'ai jamais utilisé.", 0.5],
    ["Le splitter, je ne vois pas bien à quoi ça sert.", 0],
    ["Je chaîne les appareils dans l'ordre de la perche, mais je ne vérifie pas le mode avant d'adresser.", 0.5],
  ],
  // Q5 — réseau, univers et plan de feux
  [
    ["On branche un câble réseau entre le pupitre et le boîtier, et ça marche.", 0],
    ["Je sais qu'au-delà de 512 canaux il faut un deuxième univers, mais je ne sais pas comment les répartir.", 0.5],
    ["Le réseau, c'est le travail du service informatique.", 0],
    ["J'ai déjà utilisé un node Art-Net, mais je ne sais pas configurer les adresses IP.", 0.5],
    ["Je ne fais pas de plan de feux, je retiens où sont les appareils.", 0],
    ["Je fais un plan de feux à la main avec les numéros, mais pas de patch papier.", 0.5],
    ["Je ne connais pas la différence entre Art-Net et sACN.", 0],
    ["On partage le réseau avec le son et la vidéo, et parfois ça décroche.", 0.5],
    ["Je prends un câble DMX très long plutôt qu'un réseau.", 0],
    ["Je répartis les univers par perche, mais je ne laisse pas de réserve.", 0.5],
    ["Je n'ai jamais touché à un switch.", 0],
    ["Je sais que le sACN existe, mais je n'ai jamais choisi entre les deux protocoles.", 0.5],
  ],
  // Q6 — grandMA3, show file et patch
  [
    ["Je n'ai jamais utilisé de grandMA.", 0],
    ["J'ai utilisé une grandMA2 en accueil, mais seulement pour rejouer des conduites déjà faites.", 0.5],
    ["Je reprendrais le show d'un autre spectacle et je modifierais.", 0],
    ["J'ai essayé grandMA3 onPC chez moi, mais je me suis perdu{e} dans le patch.", 0.5],
    ["Je travaille sur une console traditionnelle, je pense que c'est pareil.", 0],
    ["Je sais qu'il faut importer les appareils depuis la bibliothèque, mais je ne connais pas les modes.", 0.5],
    ["Je ne sauvegarde qu'à la fin de la journée.", 0],
    ["Je connais une autre marque de pupitre ; je sais patcher par numéro d'appareil, pas encore sur grandMA3.", 0.5],
    ["Je ne sais pas ce qu'est un show file.", 0],
    ["J'ai entendu parler des processing units et du MA-Net, sans savoir à quoi ils servent.", 0.5],
    ["Je patche en adresses DMX directement, sans numéros d'appareils.", 0],
    ["Je fais une sauvegarde sur clé, mais toujours sous le même nom.", 0.5],
  ],
  // Q7 — groupes et presets
  [
    ["Je règle chaque projecteur à la main dans chaque mémoire.", 0],
    ["Je fais quelques groupes, mais pas de presets.", 0.5],
    ["Les presets, je ne sais pas ce que c'est.", 0],
    ["J'utilise des presets de couleur, mais mes positions sont en valeurs brutes.", 0.5],
    ["Quand un décor bouge, je reprends toutes les mémoires une par une.", 0],
    ["Je sais qu'un preset modifié change toutes les cues, mais je n'ose pas trop les utiliser.", 0.5],
    ["Je préfère tout faire au fader, c'est plus simple.", 0],
    ["Je fais des groupes par perche, sans penser à l'ordre de sélection.", 0.5],
    ["Je n'ai jamais eu besoin de recaler une conduite.", 0],
    ["J'ai déjà recalé un spectacle en tournée, ça m'a pris toute une après-midi parce que je n'avais pas de presets.", 0.5],
    ["Je nomme rarement ce que j'enregistre.", 0],
    ["J'utilise des presets sur mon pupitre actuel, mais je ne connais pas leur fonctionnement sur grandMA3.", 0.5],
  ],
  // Q8 — cues, séquence et tracking
  [
    ["J'enregistre des mémoires et je les lance dans l'ordre.", 0],
    ["Je mets un temps sur chaque cue, mais je n'utilise pas de delay.", 0.5],
    ["Le tracking, je n'en ai jamais entendu parler.", 0],
    ["Je sais que les valeurs se propagent d'une cue à l'autre, et ça m'a déjà joué des tours.", 0.5],
    ["Quand une cue est fausse, je la refais entièrement.", 0],
    ["J'utilise update quelquefois, mais je ne suis pas sûr{e} de ce qu'il modifie.", 0.5],
    ["Je fais bouger les projecteurs pendant qu'ils sont allumés, ça se voit mais tant pis.", 0],
    ["Je prépare les positions dans le noir quand j'y pense.", 0.5],
    ["Je n'ai jamais programmé de cue, je fais seulement de l'accroche.", 0],
    ["Je connais la différence entre fade et delay, mais je ne sais pas les régler par attribut.", 0.5],
    ["Je travaille sans séquence, tout en direct.", 0],
    ["J'ai déjà utilisé une séquence sur un fader, sans savoir ce qu'était un executor.", 0.5],
  ],
  // Q9 — effets et conduite
  [
    ["Je prends les effets tout faits du pupitre.", 0],
    ["Je sais faire un cercle de position, mais pas répartir l'effet sur plusieurs appareils.", 0.5],
    ["Les effets, c'est pour les concerts, pas pour le théâtre.", 0],
    ["Je règle la vitesse d'un effet au fader, mais je ne connais pas les phasers.", 0.5],
    ["Je n'ai jamais lu de conduite écrite.", 0],
    ["J'encode une conduite à partir des notes du régisseur, mais je numérote mal mes cues.", 0.5],
    ["Le timecode, c'est pour la vidéo.", 0],
    ["J'ai entendu parler des MAtricks, sans les avoir utilisés.", 0.5],
    ["Je lance les effets à la main pendant le spectacle, sans les enregistrer.", 0],
    ["J'utilise des pages pour séparer les effets, mais je m'y perds en représentation.", 0.5],
    ["Je ne sais pas ce qu'est une macro.", 0],
    ["J'ai déjà synchronisé un tableau sur une bande son à l'oreille, pas avec du timecode.", 0.5],
  ],
  // Q10 — maintenance et pannes
  [
    ["Quand un appareil est en panne, je le renvoie au loueur.", 0],
    ["Je nettoie les optiques quand je vois que la lumière baisse.", 0.5],
    ["Je n'ai jamais ouvert un projecteur automatique.", 0],
    ["Quand un appareil ne répond plus, je vérifie l'adresse et le câble, puis je ne sais plus.", 0.5],
    ["En plein spectacle, je monte réparer.", 0],
    ["Je sais que les ventilateurs s'encrassent avec la fumée, mais on ne les nettoie pas régulièrement.", 0.5],
    ["Je redémarre le pupitre quand quelque chose ne marche pas.", 0],
    ["Je débranche avant d'intervenir, mais je n'attends pas toujours que l'appareil refroidisse.", 0.5],
    ["Les mises à jour, je les fais quand le pupitre me le propose, même avant une générale.", 0],
    ["J'ai déjà neutralisé un projecteur bloqué en baissant son intensité, sans savoir s'il y avait mieux.", 0.5],
    ["L'archivage, on garde le show sur la console et c'est tout.", 0],
    ["Je note les pannes sur un carnet, mais il n'y a pas de fiche de maintenance dans la salle.", 0.5],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["Je relève la masse pour l'accroche, la consommation pour la distribution, les modes pour le patch et le zoom pour l'implantation.", 1],
    ["Je choisis le mode DMX selon le besoin : pan et tilt en 16 bits pour des mouvements lents et précis.", 1],
    ["Le canal grossier et le canal fin donnent 65 536 pas au lieu de 256.", 1],
    ["Je repère le canal de contrôle et je n'enregistre jamais une valeur de reset dans une cue.", 1],
    ["Je regarde maintenant le niveau sonore, important pour les scènes parlées.", 0.5],
    ["Je fais la différence entre un gobo indexable et un gobo en rotation continue sur la charte.", 1],
    ["Je compare le flux et la consommation de deux modèles avant de choisir.", 0.5],
    ["Je vérifie le mode réglé sur l'appareil avant de le patcher.", 1],
    ["Je lis la charte DMX pour connaître l'ordre des canaux et les plages de valeurs de chaque effet.", 1],
    ["Je prépare un tableau avec masse, consommation et nombre de canaux de chaque appareil.", 1],
    ["Je sais où trouver les valeurs à éviter en représentation, comme l'extinction de la source.", 0.5],
    ["Je contrôle les unités : kilogrammes, watts, degrés, lumens.", 0.5],
  ],
  [
    ["Je choisis des spots pour les découpes, des wash pour les ambiances et des beams pour les faisceaux.", 1],
    ["Je compare les sources : LED et laser-phosphore sans préchauffage, lampes à décharge plus lentes à démarrer.", 1],
    ["Je calcule la masse par perche et je la compare à la charge admissible donnée par la salle.", 1],
    ["Je calcule le nombre de canaux du parc et je le répartis par univers.", 1],
    ["Pour le théâtre, je vérifie le mode silencieux des ventilateurs.", 1],
    ["Je demande au loueur les modes DMX, les versions de logiciel et l'état d'entretien.", 1],
    ["Un hybride est polyvalent, mais un vrai wash reste meilleur pour un lavage homogène.", 0.5],
    ["Je pars des besoins de la mise en scène avant de penser aux modèles.", 1],
    ["Je garde une réserve d'appareils et de canaux pour les ajouts de dernière minute.", 0.5],
    ["Je vérifie que les accessoires d'accroche sont fournis avec le parc.", 0.5],
    ["Je prends en compte la consommation pour dimensionner les lignes électriques.", 1],
    ["J'argumente mon choix auprès de l'éclairagiste avec des chiffres.", 0.5],
  ],
  [
    ["Oméga verrouillé, deux crochets serrés à la clé et élingue de sécurité passée dans le point prévu.", 1],
    ["L'élingue de sécurité ne passe jamais par l'oméga : elle doit être indépendante de l'accroche.", 1],
    ["Je fais descendre la perche à hauteur de travail plutôt que de monter.", 1],
    ["Les protections collectives passent avant le harnais.", 1],
    ["Personne sous la perche pendant la manœuvre, et l'ordre est annoncé par le responsable.", 1],
    ["Je contrôle visuellement les accessoires avant chaque usage et je mets au rebut ce qui est déformé.", 1],
    ["Je choisis une élingue de charge adaptée et la plus courte possible.", 1],
    ["Je vérifie la masse totale de la perche avant de l'équiper.", 0.5],
    ["Je porte casque et gants pendant l'accroche.", 0.5],
    ["Si je dois travailler en hauteur, je passe par une nacelle avec la bonne autorisation.", 0.5],
    ["Je contrôle le serrage des crochets après la mise en position.", 0.5],
    ["Je refuse d'accrocher si le matériel n'est pas adapté.", 1],
  ],
  [
    ["L'adresse suivante est l'adresse précédente plus le nombre de canaux du mode.", 1],
    ["Je vérifie que le dernier canal ne dépasse pas 512.", 1],
    ["Je mets une terminaison de 120 ohms en fin de ligne.", 1],
    ["J'utilise du câble DMX de 110 ohms, pas du câble micro.", 1],
    ["Au-delà de 32 appareils, ou pour plusieurs branches, je mets un splitter.", 1],
    ["J'adresse et je contrôle les appareils par RDM sans monter.", 1],
    ["Je règle le mode avant l'adresse, sinon le calcul est faux.", 1],
    ["Je contrôle chaque appareil depuis le pupitre avant de valider la ligne.", 0.5],
    ["J'étiquette chaque appareil avec son numéro et son adresse.", 0.5],
    ["Je garde le tableau d'adresses avec le plan de feux.", 0.5],
    ["Un testeur DMX me permet de vérifier la ligne au sol.", 0.5],
    ["Je chaîne dans l'ordre de la perche pour simplifier le dépannage.", 0.5],
  ],
  [
    ["Je fais un patch papier cohérent avec le plan de feux : numéro, type, mode, univers, adresse.", 1],
    ["Je répartis les univers par zone et je laisse une réserve.", 1],
    ["Le réseau lumière est dédié, avec des adresses IP fixes et notées.", 1],
    ["Je choisis Art-Net ou sACN pour chaque univers, sans mélanger.", 1],
    ["Je place les nodes au plus près des perches.", 0.5],
    ["Je vérifie chaque univers avant la représentation.", 1],
    ["Si le réseau est partagé, j'utilise un switch géré.", 1],
    ["Art-Net passe en UDP sur Ethernet ; le sACN est normalisé sous ANSI E1.31.", 1],
    ["Je repère tous les câbles réseau.", 0.5],
    ["Je prévois une solution de secours si le réseau tombe.", 0.5],
    ["Même numérotation sur le plan, dans le pupitre et sur les appareils.", 1],
    ["Je documente l'architecture réseau dans le dossier du spectacle.", 0.5],
  ],
  [
    ["Je crée le show file avec un nom daté et je l'enregistre tout de suite.", 1],
    ["J'importe les types d'appareils de la bibliothèque avec le bon mode.", 1],
    ["Mes fixture ID suivent la numérotation du plan de feux.", 1],
    ["Le pupitre me signale les conflits d'adresses au patch.", 0.5],
    ["Je reproduis l'implantation dans le layout pour sélectionner vite.", 1],
    ["J'ai mon utilisateur, mon profil et ma vue de travail.", 1],
    ["Je sauvegarde souvent, sous des noms datés, avec une copie sur clé.", 1],
    ["onPC me permet de préparer le spectacle avant d'arriver en salle.", 0.5],
    ["Je connais le rôle des processing units et de MA-Net3.", 0.5],
    ["Je vérifie la sortie appareil par appareil après le patch.", 1],
    ["Je contrôle la version du logiciel avant de charger un show.", 0.5],
    ["Le show file contient tout le spectacle : je ne travaille jamais sans copie.", 1],
  ],
  [
    ["Je crée des groupes avec un ordre de sélection pensé pour les effets.", 1],
    ["Mes cues n'appellent que des presets, jamais des valeurs brutes.", 1],
    ["Quand une zone de jeu bouge, je modifie le preset et toutes les cues suivent.", 1],
    ["Je nomme mes presets selon les zones et les intentions.", 1],
    ["J'ai des presets de position, de couleur, de gobo et de faisceau.", 1],
    ["En tournée, je recale les presets de position et la conduite est prête.", 1],
    ["Je mets à jour un preset avec update.", 0.5],
    ["Mes groupes séparent jardin et cour, pairs et impairs.", 0.5],
    ["Je garde une feuille des presets avec leur nom.", 0.5],
    ["Je vérifie qu'un preset modifié ne casse pas une autre scène.", 0.5],
    ["Je prépare les presets avant d'encoder la conduite.", 1],
    ["Les presets me font gagner du temps aux répétitions.", 0.5],
  ],
  [
    ["Je mets la séquence sur un executor et je numérote les cues comme la conduite écrite.", 1],
    ["Je règle un temps et, si besoin, un delay pour chaque cue.", 1],
    ["Avec le tracking, une valeur reste active jusqu'à la prochaine valeur enregistrée.", 1],
    ["Je limite une correction à une cue quand elle ne doit pas se propager.", 1],
    ["Je prépare les mouvements dans le noir pour qu'ils ne se voient pas.", 1],
    ["J'utilise update pour corriger une cue existante.", 1],
    ["Store en merge ajoute mes valeurs sans effacer celles de la cue.", 0.5],
    ["Je vide le programmer après chaque enregistrement.", 0.5],
    ["Je vérifie la cue suivante après chaque modification.", 0.5],
    ["Je nomme mes cues comme dans la conduite.", 0.5],
    ["Le delay retarde le départ de la transition après le Go.", 1],
    ["Je relis la conduite complète en aveugle avant la répétition.", 0.5],
  ],
  [
    ["Je crée les effets avec les phasers : vitesse, amplitude et phase répartie.", 1],
    ["J'utilise wings pour un effet en miroir et interleave pour un appareil sur deux.", 1],
    ["Je mets les effets sur une page d'executors dédiée, avec un fader de vitesse.", 1],
    ["J'encode la conduite écrite cue par cue, aux tops du régisseur.", 1],
    ["Je vérifie la réception du timecode avant d'encoder le tableau musical.", 1],
    ["J'ai créé une macro de remise à zéro du plateau.", 0.5],
    ["Je règle la phase de 0 à 360 degrés pour obtenir une vague.", 1],
    ["Je travaille en aveugle pour corriger un effet sans perturber la scène.", 1],
    ["Je nomme mes pages pour ne pas me perdre en représentation.", 0.5],
    ["Je teste chaque macro avant le spectacle.", 0.5],
    ["L'ordre de sélection du groupe détermine le sens de l'effet.", 1],
    ["Je restitue la conduite complète sans erreur de déclenchement.", 0.5],
  ],
  [
    ["Je suis une fiche de maintenance : optiques, filtres, ventilateurs, accessoires d'accroche.", 1],
    ["Je débranche et je laisse refroidir avant d'ouvrir un appareil.", 1],
    ["Je diagnostique du plus simple au plus complexe : adresse, câble, terminaison, alimentation, mécanique.", 1],
    ["En représentation, je neutralise l'appareil depuis le pupitre et je répare après.", 1],
    ["Je fais les mises à jour hors exploitation, après sauvegarde.", 1],
    ["J'archive le show file, la version du logiciel, le patch, le plan de feux et la conduite.", 1],
    ["Une extinction après vingt minutes me fait penser à une protection thermique.", 1],
    ["Des clignotements en bout de ligne, je vérifie d'abord la terminaison.", 1],
    ["Une erreur au reset me fait chercher un obstacle mécanique ou un capteur.", 0.5],
    ["Je note chaque panne et sa réparation.", 0.5],
    ["J'adapte la fréquence de nettoyage à la fumée utilisée.", 0.5],
    ["Je garde une pièce de rechange pour les appareils les plus fragiles.", 0.5],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [54, 51, 45, 45, 4, 8, 57, 36, 47, 13];

export function getGMA70AutoAnswers(
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
export function gma70NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6). */
export function gma70BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((gma70NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `gma70BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function gma70ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = gma70BonnesQcmDebut(n, idx, nom, prenom);
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
export function gma70NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
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
    besoin: "Programmer seul{e} les spectacles accueillis sur le pupitre grandMA3 que la salle vient d'acquérir.",
    objectif: "Je veux être autonome sur le pupitre de la salle : patch, presets, séquences et effets, pour accueillir les compagnies sans faire appel à un pupitreur extérieur.",
    projet: "Elle m'aidera à évoluer vers un poste de régisseur lumière principal.",
    attentes: "L'employeur attend que {le_sal} exploite le nouveau pupitre de la salle et forme ensuite l'équipe permanente.",
    missions: "Régie lumière des spectacles accueillis, préparation des plans de feux, encadrement des techniciens lumière.",
    contribution: "Elle doit rentabiliser l'investissement dans le pupitre et réduire le recours à des pupitreurs extérieurs.",
  },
  {
    besoin: "Passer d'une console traditionnelle à la programmation de projecteurs automatiques pour élargir mes contrats.",
    objectif: "Mon objectif est de pouvoir accepter les tournées équipées de projecteurs automatiques et d'un pupitre grandMA3.",
    projet: "Elle me permettra de travailler pour des compagnies et des festivals qui me refusaient faute de compétences sur les automatiques.",
    attentes: "Les employeurs attendent que {le_sal} sache encoder et restituer une conduite avec automatiques.",
    missions: "Technicien{ne} lumière intermittent{e} : montages, réglages, restitution de conduites en tournée.",
    contribution: "Elle doit sécuriser mes contrats de tournée et la qualité des restitutions.",
  },
  {
    besoin: "Accrocher, câbler et adresser un parc d'automatiques en sécurité et sans erreur.",
    objectif: "Je souhaite maîtriser l'accroche, la distribution électrique, le DMX et le réseau pour que le parc fonctionne du premier coup.",
    projet: "Elle m'aidera à devenir responsable de la mise en œuvre technique sur les grands montages.",
    attentes: "L'employeur attend que {le_sal} prenne en charge l'implantation électrique et le câblage des parcs d'automatiques.",
    missions: "Électricien{ne} du spectacle : distribution électrique, accroche, câblage, maintenance du parc.",
    contribution: "Elle doit réduire les erreurs de câblage et les risques lors des montages.",
  },
  {
    besoin: "Transposer sur grandMA3 ma pratique de programmation acquise sur une autre marque de pupitre.",
    objectif: "Mon objectif est de retrouver sur grandMA3 la même rapidité que sur mon pupitre habituel : presets, séquences, effets.",
    projet: "Elle me permettra de répondre aux fiches techniques des tournées qui demandent un grandMA3.",
    attentes: "Les employeurs attendent que {le_sal} soit opérationnel{le} sur grandMA3 dès les prochaines productions.",
    missions: "Pupitr{/euse} lumière : programmation et restitution de conduites, accueil des éclairagistes.",
    contribution: "Elle doit élargir les productions sur lesquelles je peux être engagé{e}.",
  },
  {
    besoin: "Exploiter et entretenir les projecteurs automatiques du centre culturel avec une petite équipe.",
    objectif: "Je souhaite savoir installer, programmer simplement et entretenir les automatiques de la salle, pour les manifestations et les spectacles.",
    projet: "Elle m'aidera à rendre la salle plus autonome techniquement.",
    attentes: "L'employeur attend que {le_sal} assure l'exploitation courante des automatiques et leur entretien.",
    missions: "Technicien{ne} polyvalent{e} de salle : son, lumière, accueil technique des manifestations.",
    contribution: "Elle doit limiter les pannes et les frais de location de matériel et de personnel.",
  },
  {
    besoin: "Consolider mes bases sur les projecteurs automatiques et prendre confiance au pupitre.",
    objectif: "Mon objectif est de comprendre ce que je fais quand j'adresse et programme, au lieu de reproduire ce qu'on me montre.",
    projet: "Elle me permettra d'être engagé{e} comme technicien{ne} lumière à part entière, et plus seulement en renfort.",
    attentes: "Les employeurs attendent que {le_sal} gagne en autonomie sur l'installation et la programmation.",
    missions: "Technicien{ne} lumière en début de carrière : montages, câblage, aide à la programmation.",
    contribution: "Elle doit me rendre autonome sur les montages courants.",
  },
  {
    besoin: "Mieux dialoguer avec les équipes lumière et organiser des montages d'automatiques sûrs et réalistes.",
    objectif: "Je souhaite comprendre les contraintes des automatiques (poids, électricité, réseau, temps de programmation) pour mieux planifier.",
    projet: "Elle m'aidera à établir des plannings et des fiches techniques plus justes.",
    attentes: "L'employeur attend que {le_sal} anticipe les contraintes techniques des productions accueillies.",
    missions: "Régiss{/euse} général{e} : coordination technique, plannings, sécurité, relation avec les compagnies.",
    contribution: "Elle doit améliorer la préparation des accueils et la sécurité des montages.",
  },
  {
    besoin: "Préparer et dépanner rapidement des parcs d'automatiques sur des événements à délais courts.",
    objectif: "Mon objectif est de patcher, programmer des ambiances et dépanner rapidement sur des installations qui changent chaque semaine.",
    projet: "Elle me permettra de prendre la responsabilité lumière des événements.",
    attentes: "L'employeur attend que {le_sal} prépare les parcs en atelier et assure la lumière des événements.",
    missions: "Technicien{ne} de prestation : préparation du matériel, montage d'événements, exploitation.",
    contribution: "Elle doit réduire les retours de matériel en panne et le temps de montage.",
  },
  {
    besoin: "Programmer des effets et des conduites synchronisées pour des concerts.",
    objectif: "Je veux maîtriser les phasers, les MAtricks et le timecode pour encoder des concerts complets.",
    projet: "Elle m'aidera à travailler sur les concerts et les tournées musicales.",
    attentes: "Les employeurs attendent que {le_sal} encode des effets propres et synchronisés.",
    missions: "Technicien{ne} lumière en salle de musiques actuelles : accueil des groupes, programmation, exploitation.",
    contribution: "Elle doit améliorer la qualité lumière des concerts accueillis.",
  },
  {
    besoin: "Préparer et archiver des spectacles pour la reprise et la tournée.",
    objectif: "Mon objectif est de préparer un show file propre, avec presets, pour recaler rapidement un spectacle dans chaque nouvelle salle.",
    projet: "Elle me permettra de partir en tournée comme régiss{/euse} lumière.",
    attentes: "La compagnie attend que {le_sal} assure la reprise du spectacle dans les lieux de la tournée.",
    missions: "Régie lumière d'une compagnie : adaptation des plans de feux, recalage, restitution.",
    contribution: "Elle doit réduire le temps de recalage dans chaque salle de la tournée.",
  },
  {
    besoin: "Renforcer la sécurité des interventions en hauteur et de l'accroche des automatiques.",
    objectif: "Je souhaite appliquer les bonnes règles d'accroche, d'élingage et de travail en hauteur, et savoir refuser une situation dangereuse.",
    projet: "Elle m'aidera à devenir référent{e} sécurité de l'équipe lumière.",
    attentes: "L'employeur attend que {le_sal} fasse respecter les règles d'accroche et de travail en hauteur.",
    missions: "Technicien{ne} lumière permanent{e} : accroche, réglages, maintenance, sécurité du plateau.",
    contribution: "Elle doit diminuer les situations à risque pendant les montages.",
  },
  {
    besoin: "Organiser la maintenance du parc d'automatiques et réduire les pannes en exploitation.",
    objectif: "Mon objectif est de mettre en place des fiches de maintenance et une méthode de diagnostic des pannes.",
    projet: "Elle m'aidera à prendre en charge la gestion du parc de matériel.",
    attentes: "L'employeur attend que {le_sal} organise la maintenance préventive du parc.",
    missions: "Responsable du parc lumière : entretien, réparations, suivi des appareils, mises à jour.",
    contribution: "Elle doit allonger la durée de vie du parc et éviter les pannes en représentation.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilGMA70(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

function entAccords(txt: string, fem: boolean): string {
  return accorder(
    txt
      .replace(/\{un\}/g, fem ? "une" : "un")
      .replace(/\{le_sal\}/g, fem ? "la salariée" : "le salarié"),
    fem,
  );
}

export function getGMA70Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return entAccords(profilGMA70(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production du stagiaire
// Indices : 0 fiche technique, 1 choix du parc, 2 accroche, 3 adressage DMX, 4 réseau et univers,
//           5 show file et patch, 6 groupes et presets, 7 cues et tracking, 8 phasers et conduite,
//           9 maintenance et panne ; 8 productions par banque.
// La k-ième production de chaque banque suit le même technicien fictif : un stagiaire garde le même
// profil d'un exercice à l'autre.
//   0 régisseur·se lumière permanent·e · 1 technicien·ne lumière intermittent·e en tournée
//   2 électricien·ne du spectacle · 3 pupitreur·se venant d'une autre console
//   4 technicien·ne polyvalent·e de centre culturel · 5 technicien·ne en début de carrière
//   6 régisseur·se général·e · 7 technicien·ne de prestation événementielle
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Fiche technique et charte DMX
  [
    "Je suis régiss{/euse} lumière permanent{e}. Sur la fiche technique du spot LED du Théâtre des Quatre Vents, j'ai relevé la masse, la consommation maximale, la plage du zoom et le niveau sonore, que je reporte dans mon tableau de salle. J'ai choisi le mode étendu pour avoir pan et tilt en 16 bits, car les mouvements du spectacle sont lents. Sur la charte, j'ai surligné le canal de contrôle : aucune valeur de reset dans une cue.",
    "En tournée, je reçois souvent des fiches techniques à la dernière minute. Cette fois, j'ai lu la fiche technique dans l'ordre : masse pour l'accroche, consommation pour les lignes, modes DMX pour le patch. J'ai découvert que le mode de base n'a pas de canal fin : pour des mouvements lents, il faut le mode étendu. J'ai noté la valeur d'extinction de la source à éviter en représentation.",
    "Électricien{ne} du spectacle, j'ai d'abord cherché sur la fiche technique la consommation maximale et le connecteur d'alimentation, puis la masse et les points d'accroche. J'ai calculé combien d'appareils je peux mettre sur une ligne de 16 ampères avec une marge. Sur la charte DMX, j'ai repéré le canal de contrôle et les plages de valeurs des effets.",
    "Je viens d'une autre console. La fiche technique et la charte DMX m'ont permis de comparer les modes : 22 canaux en mode de base, 34 en mode étendu avec les canaux fins. J'ai listé les effets : deux roues de gobos tournants indexables, prisme, iris, frost, CMY et CTO. J'ai choisi le mode étendu et noté le canal de contrôle à protéger.",
    "Dans notre centre culturel, personne ne lisait la fiche technique des appareils. J'ai relevé la masse, la consommation, le zoom et le flux, puis j'ai regardé le niveau sonore, important pour les conférences. J'ai compris la différence entre un gobo fixe et un gobo tournant sur la charte DMX. Mode choisi : le mode de base, suffisant pour nos besoins.",
    "C'était ma première vraie lecture de fiche technique. J'ai confondu au début le flux de la source et le flux en sortie, le formateur m'a montré la différence. Sur la charte DMX, j'ai compris le principe du canal grossier et du canal fin. J'ai repéré le canal de reset et pourquoi il ne faut pas l'enregistrer.",
    "Comme régiss{/euse} général{e}, je retiens de la fiche technique ce qui touche à la sécurité et au planning : masse pour vérifier la charge des perches, consommation pour la puissance disponible, nombre de canaux pour les univers. J'ai lu la charte DMX avec mon binôme et noté le canal de contrôle.",
    "En prestation, je prépare les parcs en atelier : j'ai fait de la fiche technique une fiche de préparation avec masse, consommation, mode DMX choisi et accessoires. Sur la charte, j'ai relevé que le mode étendu double les canaux de mouvement. J'ai noté la valeur d'extinction de la source à ne jamais enregistrer.",
  ],
  // 1 — Choix du parc
  [
    "Pour la création au Théâtre des Quatre Vents, j'ai proposé un parc de huit spots à couteaux en face, six wash en contre-jour et quatre beams au sol pour les tableaux musicaux. J'ai calculé la masse par perche et le nombre de canaux, réparti sur deux univers. Questions au loueur : modes DMX, versions de logiciel et date du dernier entretien.",
    "J'ai choisi des hybrides pour limiter le nombre d'appareils à transporter en tournée, mais j'ai gardé des wash pour un lavage homogène. Les sources LED évitent le préchauffage. J'ai calculé la masse totale de chaque perche et vérifié le nombre de canaux du parc complet. Je demande au loueur l'état des accessoires d'accroche.",
    "Mon choix de parc part de l'électricité : sources LED et laser-phosphore pour réduire la consommation, répartition sur les lignes de la salle avec une marge. J'ai mis des spots en face et des wash en contre-jour. J'ai vérifié la masse de chaque perche par rapport à la charge admissible donnée par la salle.",
    "Habitué{e} à un autre parc, j'ai comparé les familles : spots pour découpes et gobos, wash pour ambiances, beams pour faisceaux dans la fumée. Mon parc : spots en face, wash en contre-jour, beams au sol. J'ai vérifié le niveau sonore des appareils pour les scènes parlées. Le nombre de canaux tient sur deux univers.",
    "Pour notre salle, j'ai proposé un parc réduit et polyvalent : quatre hybrides et quatre wash, faciles à entretenir. J'ai calculé la masse par perche et la consommation par ligne. Je demanderais au loueur les modes disponibles et une démonstration du mode silencieux.",
    "J'ai d'abord voulu mettre uniquement des beams, puis j'ai compris qu'ils n'éclairent pas bien les comédiens. Mon parc final : spots en face, wash en contre-jour, quelques beams pour la fumée. J'ai fait le calcul de masse par perche avec l'aide de mon binôme et compté les canaux.",
    "J'ai choisi le parc avec un regard de planning : le nombre d'appareils détermine le temps de montage et de programmation. Spots en face, wash en contre-jour, beams au sol. J'ai vérifié la masse par perche et la puissance disponible. Question au loueur : délai de remplacement en cas de panne.",
    "En événementiel, je privilégie des appareils légers et polyvalents : un parc d'hybrides et de wash à LED, rapides à installer. J'ai calculé la masse sur chaque pont et les canaux par univers. Je demande toujours au loueur les versions de logiciel pour éviter les surprises au patch.",
  ],
  // 2 — Accroche en sécurité
  [
    "J'ai organisé l'accroche des quatre spots de 30 kg sur la perche 3 : perche descendue à hauteur de travail par le machiniste, oméga verrouillé, deux crochets serrés, élingue de sécurité passée autour de la perche et dans le point prévu de l'appareil. Personne sous la perche pendant la remontée, ordre annoncé.",
    "En tournée, je n'ai pas toujours le temps ; l'exercice m'a rappelé les étapes : contrôle visuel des crochets et des élingues, oméga verrouillé, élingue de sécurité de charge adaptée, la plus courte possible. J'ai vérifié que l'élingue ne passe pas par l'oméga.",
    "J'ai préparé le matériel d'accroche pour chaque appareil : oméga, deux crochets, élingue de sécurité marquée. Avant usage, contrôle visuel : déformation, corrosion, verrouillage du mousqueton. J'ai demandé la charge admissible de la perche et calculé la masse totale avec les câbles.",
    "J'ai fait l'accroche en binôme : l'un tient l'appareil, l'autre serre les crochets. L'élingue de sécurité retient l'appareil si l'accroche cède, elle ne remplace pas un crochet. Pendant la manœuvre, l'ordre est donné par le machiniste et nous sommes hors de la zone sous la perche.",
    "Dans notre salle, on montait à l'échelle pour accrocher. J'ai retenu qu'il faut d'abord descendre la perche à hauteur de travail, privilégier les protections collectives et ne prendre le harnais qu'en dernier recours. L'élingue de sécurité est systématique, passée dans le point prévu par le fabricant.",
    "C'était ma première accroche d'un appareil de 30 kg. Le formateur m'a montré comment poser l'appareil en butée, verrouiller l'oméga et serrer les crochets. J'ai passé l'élingue de sécurité moi-même et fait vérifier mon travail. Je sais maintenant contrôler une élingue avant usage.",
    "En tant que régiss{/euse} général{e}, j'ai rédigé la consigne d'accroche : matériel vérifié, élingue de sécurité obligatoire, perche à hauteur de travail, interdiction de stationner sous une charge, ordre de manœuvre donné par une seule personne. Je l'affiche au plateau.",
    "Sur les ponts en événementiel, je mets des colliers adaptés au diamètre du tube et une élingue de sécurité par appareil. J'ai appliqué la même rigueur sur la perche du théâtre : contrôle visuel, serrage, élingue la plus courte possible, zone dégagée pendant la levée.",
  ],
  // 3 — Adressage et câblage DMX
  [
    "Calcul des adresses de la perche 3 : spots en 1, 35, 69 et 103 ; wash en 137, 159, 181 et 203 ; dernier canal 224. Câble DMX de 110 ohms, chaînage dans l'ordre de la perche, terminaison de 120 ohms sur le dernier wash. Vérification par RDM depuis la régie.",
    "J'ai calculé les adresses en ajoutant le nombre de canaux du mode : 1, 35, 69, 103, puis 137, 159, 181, 203. En tournée, j'utilise le RDM pour vérifier l'adresse et le mode sans monter. Terminaison en fin de ligne systématique.",
    "J'ai câblé la ligne en DMX 5 broches, chaînage de la sortie d'un appareil vers l'entrée du suivant, terminaison de 120 ohms sur la dernière sortie. Les adresses calculées vont jusqu'au canal 224 : pas de dépassement de l'univers. Un splitter servira pour la branche vers les latéraux.",
    "Sur mon ancien pupitre, j'adressais sans réfléchir au mode. Ici, j'ai d'abord réglé le mode, puis calculé chaque adresse : 1, 35, 69, 103, 137, 159, 181, 203. Contrôle au testeur DMX, puis appareil par appareil depuis le pupitre.",
    "J'ai fait le tableau d'adresses avant de monter : mode, nombre de canaux, adresse de départ, dernier canal. J'ai appris la règle des 32 appareils par segment et l'usage du splitter pour isoler les branches. Terminaison posée et vérifiée.",
    "Je me suis trompé{e} d'un canal sur le deuxième spot : j'avais mis 34 au lieu de 35. Le formateur m'a rappelé que l'adresse suivante est l'adresse plus le nombre de canaux. Après correction, toutes les adresses étaient justes et la terminaison en place.",
    "J'ai vérifié le travail de l'équipe : adresses conformes au patch papier, câble DMX et non câble micro, terminaison présente. J'ai demandé qu'un splitter soit placé au pied de chaque perche pour qu'une panne ne coupe pas toute la ligne.",
    "En atelier, j'adresse les appareils avant le départ et je les étiquette avec numéro et adresse. Pour la perche 3, j'ai calculé les adresses jusqu'au canal 224 et contrôlé chaque appareil par RDM. Terminaison de 120 ohms sur la sortie du dernier wash.",
  ],
  // 4 — Réseau et univers
  [
    "J'ai établi le patch papier des 48 automatiques et réparti le parc sur quatre univers par zone, en laissant une réserve dans chaque univers. Réseau lumière dédié, adresses IP fixes, nodes au pied des perches. J'ai choisi le sACN pour tous les univers.",
    "En tournée, je retrouve des réseaux partagés. J'ai proposé un réseau lumière séparé avec un switch géré, Art-Net sur tous les univers, adresses IP notées dans le dossier. Patch papier cohérent avec le plan de feux, même numérotation partout.",
    "J'ai organisé les univers par perche : un univers par perche électrique, plus un univers pour les latéraux et le sol, avec une réserve. Les nodes sont placés au plus près pour raccourcir les lignes DMX. J'ai noté chaque adresse IP sur le plan.",
    "Venant d'un pupitre qui sortait directement en DMX, j'ai découvert les nodes et le choix entre Art-Net et sACN. J'ai fait le patch papier et la répartition des univers, puis un schéma réseau avec switch, nodes et adresses IP.",
    "Pour notre centre culturel, deux univers suffisent : j'ai fait le patch papier, réparti les appareils et laissé une réserve. J'ai compris qu'il ne faut pas brancher le réseau lumière sur le réseau administratif.",
    "J'ai fait mon premier patch papier : numéro, type, mode, univers, adresse, emplacement. Je me suis aperçu{e} que j'avais saturé un univers ; j'ai déplacé une perche sur un autre univers. Le formateur m'a montré la configuration d'un node.",
    "Comme régiss{/euse} général{e}, je retiens les règles de fiabilité : réseau dédié, câblage repéré, vérification de chaque univers avant la représentation, solution de secours. Je les ai intégrées à la fiche technique de la salle.",
    "En événementiel, on monte un réseau différent chaque semaine. J'ai préparé un schéma type : pupitre, switch, nodes, univers numérotés, adresses IP fixes. Pour le Théâtre des Quatre Vents, quatre univers en Art-Net avec réserve.",
  ],
  // 5 — Show file et patch grandMA3
  [
    "J'ai créé le show file au nom du spectacle, de la salle et de la date, puis patché les 48 appareils depuis la bibliothèque avec leur mode, leur fixture ID, leur univers et leur adresse. Le layout reprend les perches. Sauvegarde interne et copie sur clé faites.",
    "En tournée, je prépare le show file sur grandMA3 onPC avant d'arriver. J'ai importé les types d'appareils, patché selon le patch papier et vérifié les conflits d'adresses. J'ai créé ma vue de travail et sauvegardé sous un nom daté.",
    "J'ai patché le parc en suivant le patch papier que j'avais fait pour le câblage : les fixture ID correspondent aux étiquettes des appareils. J'ai contrôlé la sortie appareil par appareil depuis le pupitre. Copie du show sur clé USB.",
    "Sur grandMA3, la logique de patch m'a demandé un temps d'adaptation par rapport à mon pupitre habituel. J'ai importé les types d'appareils, vérifié les modes, créé les fixture ID et placé les appareils dans le layout. Utilisateur et profil créés.",
    "J'ai créé un show file simple pour notre salle : patch des huit automatiques, layout de la scène, vue de travail. J'ai retenu l'importance de sauvegarder souvent et de garder une copie sur clé.",
    "Pour mon premier show file, j'ai suivi la procédure pas à pas. J'avais choisi le mauvais mode pour un wash ; le patch ne correspondait plus à l'appareil. Après correction, tout répondait. J'ai sauvegardé sous un nom daté.",
    "J'ai observé la création du show file pour mieux planifier : le patch d'un parc de 48 appareils prend du temps, il faut le prévoir dans le planning. J'ai patché une perche moi-même et vérifié la sortie.",
    "En prestation, je réutilise des modèles : j'ai créé un show file type avec patch, layout et vues, que je dupliquerai pour chaque événement. Sauvegarde et copie externe systématiques.",
  ],
  // 6 — Groupes et presets
  [
    "J'ai créé les groupes du spectacle : spots face, wash contre, beams, jardin, cour, pairs et impairs, avec un ordre de sélection de jardin à cour. Presets de position pour cinq zones, presets de couleur et trois presets de gobo. Quand la zone centrale a été décalée, j'ai modifié le preset et toutes les cues ont suivi.",
    "En tournée, les presets de position sont essentiels : j'ai nommé mes presets selon les zones de jeu pour les recaler vite dans chaque salle. Ma cue de test n'appelle que des presets. Correction de la zone centrale faite par update du preset.",
    "J'ai fait les groupes par perche puis par fonction. Pour les presets, j'ai d'abord enregistré des valeurs brutes dans une cue, puis j'ai recommencé avec des presets pour garder le lien. La correction de la zone centrale a mis à jour toutes les cues.",
    "Sur mon pupitre habituel, j'utilisais déjà des palettes ; sur grandMA3, j'ai retrouvé la même logique avec les presets. J'ai créé les groupes avec un ordre pensé pour les effets et des presets de position, couleur, gobo et faisceau.",
    "J'ai créé quelques groupes simples et des presets de couleur et de position pour les usages courants de la salle. J'ai vu que modifier un preset corrige toutes les cues qui l'utilisent, ce qui nous fera gagner beaucoup de temps.",
    "J'ai mis du temps à comprendre la différence entre groupe et preset. Après l'exercice : le groupe sélectionne les appareils, le preset donne une valeur nommée. J'ai réussi la correction de la zone centrale en modifiant un seul preset.",
    "J'ai compris pourquoi les éclairagistes demandent du temps pour créer les presets : c'est ce qui permet ensuite de modifier vite. J'ai créé les groupes jardin et cour et un preset de position, puis testé la correction.",
    "En événementiel, j'ai des presets génériques que je recale à chaque installation. J'ai créé les groupes et presets du spectacle, et vérifié qu'une cue programmée par presets suit bien la modification de la zone centrale.",
  ],
  // 7 — Cues, séquence et tracking
  [
    "J'ai encodé les huit premières cues de la conduite dans une séquence sur un executor, avec les temps et les delays de la conduite écrite. En modifiant l'intensité d'un wash dans la cue 3, j'ai vu le tracking la propager ; j'ai limité la modification à la cue 3. Les mouvements sont préparés dans le noir.",
    "En tournée, je restitue des conduites écrites par d'autres : j'ai encodé les huit cues avec leurs temps, puis testé le tracking. Une valeur modifiée se propage jusqu'à la prochaine valeur enregistrée ; j'ai utilisé l'option cue only pour la cue 3.",
    "J'ai encodé les cues et vérifié chaque temps de transition. Le tracking m'a surpris{e} : un wash restait allumé dans les cues suivantes. J'ai corrigé avec une valeur bloquante dans la cue 4. J'ai utilisé update pour corriger une cue existante.",
    "Mon ancien pupitre ne travaillait pas en tracking ; j'ai dû changer de réflexe. J'ai encodé la séquence, réglé fade et delay, puis comparé update et store en merge. J'ai préparé les mouvements des spots dans des cues où ils sont éteints.",
    "J'ai encodé une séquence simple de huit cues sur un executor. J'ai compris la différence entre le temps de transition et le delay. Le tracking m'a montré qu'il faut vérifier la cue suivante après chaque correction.",
    "J'ai encodé mes premières cues sur grandMA3 avec store, puis j'ai oublié de vider le programmer : la cue suivante contenait des valeurs en trop. Le formateur m'a expliqué le programmer et le tracking. Après correction, la séquence était juste.",
    "J'ai encodé quatre cues et observé le tracking pour comprendre le temps nécessaire aux corrections pendant les répétitions. Je retiens que la séquence suit la numérotation de la conduite écrite, ce qui facilite les échanges avec la régie.",
    "En prestation, j'enregistre souvent des ambiances indépendantes. Ici, j'ai encodé une séquence complète avec temps et delays et j'ai appris à maîtriser le tracking pour éviter les valeurs qui traînent d'une cue à l'autre.",
  ],
  // 8 — Phasers, MAtricks et conduite
  [
    "J'ai créé un phaser de position en vague sur les beams, phase répartie de jardin à cour, et un effet de couleur alterné sur les wash avec interleave. Wings pour le miroir à partir du centre. Les effets sont sur une page d'executors avec un fader de vitesse. Cues 9 à 20 encodées, tableau musical déclenché par timecode.",
    "En tournée, les effets doivent être réglables vite : mes phasers sont sur une page dédiée, avec un fader de vitesse et un fader d'amplitude. J'ai utilisé wings et interleave et encodé la fin de la conduite, avec une macro de remise à zéro.",
    "J'ai découvert les phasers : vitesse, amplitude et phase. L'ordre de sélection de mon groupe a donné le sens de la vague. J'ai encodé les cues 9 à 20 et vérifié la réception du timecode avant le tableau musical.",
    "Sur mon pupitre habituel, j'utilisais un générateur d'effets ; le phaser de grandMA3 m'a demandé de repenser l'approche. J'ai réussi la vague avec MAtricks et l'effet alterné avec interleave. Encodage de la conduite fait cue par cue.",
    "J'ai créé avec un phaser un effet de couleur simple et un mouvement lent pour nos spectacles jeune public. J'ai placé les effets sur une page nommée et créé une macro de remise à zéro. J'ai encodé une partie de la conduite écrite.",
    "J'ai eu du mal avec la phase répartie du phaser : au départ, tous les appareils bougeaient ensemble. Le formateur m'a montré le réglage de 0 à 360 degrés. Ensuite, j'ai réussi la vague et l'effet en miroir avec wings.",
    "J'ai encodé la conduite écrite en suivant les tops, avec l'aide d'un binôme au pupitre pour les phasers. J'ai compris le principe du timecode et l'importance de vérifier sa réception avant le tableau musical.",
    "En événementiel, je travaille beaucoup en direct : j'ai mis mes phasers sur une page d'executors pour les lancer à la main, avec un fader de vitesse. J'ai aussi encodé une conduite complète, ce qui m'a obligé{e} à numéroter proprement.",
  ],
  // 9 — Maintenance et diagnostic de panne
  [
    "Pour la panne de clignotement en bout de perche 3, j'ai vérifié la terminaison puis le câble : la terminaison manquait. Pour l'erreur de pan, hors tension et à froid, j'ai trouvé une courroie détendue ; appareil parqué pour la générale. Pour l'extinction du wash, filtres encrassés et protection thermique. J'ai rédigé la fiche de maintenance du parc.",
    "En tournée, je dois dépanner vite : clignotement, je vérifie la terminaison ; erreur au reset, je neutralise l'appareil depuis le pupitre et je cherche la cause après la représentation ; extinction après vingt minutes, je pense à la ventilation. Fiche de panne remplie pour chaque incident.",
    "Pour chaque panne, j'ai procédé du plus simple au plus complexe : alimentation, liaison DMX, adresse, puis mécanique. Avant d'ouvrir le spot, débranchement et refroidissement. Fiche de maintenance : nettoyage des optiques, filtres, ventilateurs, contrôle des accessoires d'accroche.",
    "J'ai traité la panne de clignotement en remplaçant le câble de fin de ligne et en posant une terminaison. J'ai rédigé la check-list d'archivage : show file final, version du logiciel, types d'appareils, patch, plan de feux et conduite.",
    "Dans notre salle, il n'y avait pas de fiche de maintenance ; j'en ai rédigé une avec une fréquence adaptée à la fumée utilisée. Pour la panne d'extinction, j'ai nettoyé filtres et ventilateurs et contrôlé la température affichée.",
    "J'ai cherché la panne de clignotement en changeant d'abord l'appareil, ce qui n'a rien donné ; le formateur m'a rappelé de commencer par la terminaison. Je retiens la méthode : symptôme, hypothèses, vérifications du plus simple au plus complexe.",
    "J'ai organisé le traitement des trois pannes pendant la générale : mesure provisoire pour chacune, appareil neutralisé depuis le pupitre, réparation après la représentation. J'ai intégré la fiche de maintenance au planning de la salle.",
    "En atelier, je fais le contrôle de retour de chaque appareil : lecture des erreurs, nettoyage, test des moteurs. Pour la panne de pan, j'ai vérifié le capteur et la courroie. Je note chaque panne dans le carnet de suivi du parc.",
  ],
];

const BILANS_PERSONNELS = [
  "Cette mise en situation m'a surtout appris à vérifier avant d'agir.",
  "Le plus difficile a été de tenir le temps imparti ; je referai l'exercice sur mon prochain montage.",
  "J'ai montré mon travail à mon binôme, qui m'a fait une remarque que j'ai intégrée.",
  "Je vais réutiliser cette méthode dès ma prochaine production.",
  "J'ai comparé mon travail avec celui d'un collègue, ce qui m'a fait corriger un oubli.",
  "Le retour du formateur m'a permis de repérer une erreur que je faisais sans m'en rendre compte.",
  "J'avais des doutes sur ce sujet en arrivant, je me sens maintenant capable de le refaire seul{e}.",
  "Je me suis appuyé{e} sur la fiche à retenir du support, que je garderai en régie.",
  "Je n'ai pas eu le temps de tout détailler, mais l'essentiel est là.",
  "J'ai posé une question au formateur pendant l'exercice, ce qui m'a évité une erreur.",
  "Je vais ajouter cette vérification à ma check-list de montage.",
  "Je dois encore m'entraîner, mais je sais maintenant comment m'y prendre.",
];

/** Banque de la mise en situation à partir de son titre (ou de sa consigne), sinon de son rang. */
function blocExercice(contexte: string, exerciceIdx: number): number {
  const t = contexte || "";
  const num = t.match(/\bExercice\s+(\d{1,2})\b/i);
  if (num) {
    const n = parseInt(num[1], 10);
    if (n >= 1 && n <= EXERCICES_PRODUCTIONS.length) return n - 1;
  }
  if (/fiche technique|charte/i.test(t)) return 0;
  if (/choisir un parc|choix du parc/i.test(t)) return 1;
  if (/accroch|élingue/i.test(t)) return 2;
  if (/adresse|câbler une ligne/i.test(t)) return 3;
  if (/réseau|univers|art-net|sacn/i.test(t)) return 4;
  if (/show file|patch/i.test(t)) return 5;
  if (/preset|groupe/i.test(t)) return 6;
  if (/tracking|séquence|cue/i.test(t)) return 7;
  if (/phaser|matricks|conduite|effet/i.test(t)) return 8;
  if (/panne|maintenance|diagnostic/i.test(t)) return 9;
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickGMA70ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isGMA70Formation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);
  const bloc = blocExercice(contexte || "", exerciceIdx);

  // Production tirée par permutation du rang du stagiaire, avec le même décalage pour toutes les
  // banques : un stagiaire garde le même profil d'un exercice à l'autre, et sur un groupe de
  // 8 stagiaires les 8 productions d'un même exercice sont toutes différentes. Le bilan personnel
  // change d'un exercice à l'autre. La structure employeuse est citée quand elle est renseignée.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[rang(stagiaireIdx, 3, pool.length)];
  const bilan = BILANS_PERSONNELS[rang(stagiaireIdx, bloc + 11, BILANS_PERSONNELS.length)];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai rapproché l'exercice des installations sur lesquelles je travaille chez ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "Diplôme des métiers d'art Régie du spectacle, option lumière",
  "BTS Métiers de l'audiovisuel, option techniques d'ingénierie et exploitation des équipements",
  "Baccalauréat professionnel Métiers de l'électricité et de ses environnements connectés",
  "Licence professionnelle Techniques du son et de l'image",
  "CAP Électricien, puis expérience de technicien du spectacle",
  "Diplôme d'une école supérieure de techniques du spectacle, section lumière",
  "BTS Électrotechnique",
  "Baccalauréat général, puis formation sur le terrain comme technicien lumière",
  "DUT Génie électrique et informatique industrielle",
  "Formation de technicien lumière suivie dans un centre de formation du spectacle",
  "Aucun diplôme technique : longue expérience de plateau",
  "Licence arts du spectacle, puis spécialisation en régie lumière",
  "Baccalauréat professionnel Systèmes numériques",
  "BTS Systèmes numériques, option électronique et communications",
  "Master arts de la scène, puis reconversion en régie",
  "Brevet professionnel Électricien",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant chaque journée.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières pendant les dix jours me conviennent.",
  "Non. Je porte des lunettes et j'apprécie des écrans et des supports bien lisibles.",
  "Non, pas de handicap. J'ai une légère perte auditive : je préfère être placé{e} près du formateur pendant les démonstrations.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je préfère avoir les fiches techniques en version numérique pour les agrandir.",
  "Non, aucune situation de handicap. J'ai une douleur au dos : je signalerai si une manutention me pose problème pendant les ateliers d'accroche.",
  "Non. Je préfère avoir les fiches en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté avant la formation.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible les dix jours de formation, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>.",
  "J'ai bloqué les dix jours de formation dans mon planning (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) ; je n'ai accepté aucun contrat sur cette période.",
  "Je suis disponible les dix jours de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; la salle m'a libéré{e} de l'exploitation pendant la formation.",
  "Je peux suivre l'intégralité des dix jours de formation, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible les dix jours (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). Mes dates de tournée reprennent après la formation.",
  "Disponibilité complète sur les dix jours de formation (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Un collègue assure les accueils de la salle.",
  "Les dix jours de formation, je suis disponible de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; les montages prévus ont été replanifiés.",
  "Je suis disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> les dix jours, et je relirai le support le soir.",
  "Je suivrai les dix jours de formation (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) et je m'entraînerai sur grandMA3 onPC entre les journées.",
  "Aucune contrainte sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> des dix jours. Mon employeur a validé mon absence.",
];

/** Réponses d'évaluation des besoins propres à la formation GMA70, différentes pour chaque stagiaire. */
export function getGMA70EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = gma70Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilGMA70(idx, s.nom, s.prenom);
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
      ? "Formation financée par l'employeur, avec une demande de prise en charge auprès de l'Afdas au titre du plan de développement des compétences."
      : "Demande de prise en charge auprès de l'Afdas au titre des intermittents du spectacle.",
    projetPro: entAccords(profil.projet, fem),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session,
    // sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
