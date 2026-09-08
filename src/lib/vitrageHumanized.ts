// ---------------------------------------------------------------------------
// CQP Opérateur vitrage (RNCP36223) — moteur de réponses HUMANISÉES
// 100 % statique (aucun appel IA / réseau).
// Objectif : donner à CHAQUE stagiaire (54 ou plus) des réponses différentes
// et cohérentes pour :
//   • le test de positionnement de DÉBUT (10 questions ouvertes)
//   • le test de positionnement de FIN (10 questions ouvertes)
//   • l'analyse des besoins (besoin principal exprimé)
//   • les exercices pratiques (copie du stagiaire)
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// ---------------------------------------------------------------------------

export function isVitrageFormation(intitule?: string, code?: string): boolean {
  const t = (intitule || "").toLowerCase();
  const c = (code || "").toUpperCase().replace(/\s/g, "");
  if (c === "RNCP36223") return true;
  return (
    t.includes("vitrage") ||
    t.includes("pare-brise") ||
    t.includes("pare brise")
  );
}

const normalize = (s: string) =>
  (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toUpperCase();

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function vitrageSeed(nom?: string, prenom?: string): number {
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
 * Résout les marqueurs d'accord :
 *   prêt{e} → prêt / prête ; autonome{s} ignoré ; motivé{e} → motivée
 *   attentif{/ve} → attentif / attentive ; sérieux{/se} → sérieux / sérieuse
 */
function accorder(txt: string, fem: boolean): string {
  return txt
    .replace(/\{\/ve\}/g, fem ? "ve" : "")
    .replace(/\{\/se\}/g, fem ? "se" : "")
    .replace(/\{e\}/g, fem ? "e" : "");
}

// ---------------------------------------------------------------------------
// Banques de réponses — 10 questions × 6 variantes (début et fin)
// ---------------------------------------------------------------------------

const DEBUT: string[][] = [
  // Q1 — étapes du remplacement de pare-brise
  [
    "Franchement, je ne saurais pas les donner dans l'ordre. Je sais qu'on découpe l'ancien, qu'on met de la colle et qu'on repose le neuf. Tout ce qu'il y a autour, je ne le connais pas.",
    "J'ai déjà regardé un collègue le faire. Il protège la voiture, il enlève les essuie-glaces, il coupe au fil et il pose le neuf à deux. Mais je serais incapable de le refaire seul{e}.",
    "Je dirais : démonter, nettoyer, coller, reposer. Je sais qu'il y a une histoire de primaire mais je ne sais pas à quoi ça sert exactement.",
    "Je connais le principe mais pas le détail. Ce qui me manque surtout, c'est ce qu'on fait avant de coller, la préparation du support je crois.",
    "Je pense qu'on retire les baguettes, qu'on coupe le joint et qu'on remet un cordon. Après, sur les capteurs et la caméra, là je suis perdu{e}.",
    "Je n'en ai jamais fait. J'ai juste vu des vidéos sur internet, donc j'ai une idée très approximative des étapes.",
  ],
  // Q2 — SDAT / temps de sécurité au décollage
  [
    "Je n'avais jamais entendu ce terme. Je croyais qu'on pouvait repartir tout de suite après la pose.",
    "Je sais qu'il faut attendre un peu avant de rouler, on m'a dit une heure, mais je ne sais pas d'où vient ce chiffre.",
    "SDAT, ça ne me parle pas du tout. J'imagine que c'est lié au séchage de la colle.",
    "On disait deux heures dans mon ancien garage, mais personne ne m'a expliqué pourquoi ni si ça changeait selon la colle.",
    "Je pense que c'est le temps de séchage. Je ne savais pas que la température ou l'humidité pouvaient jouer là-dessus.",
    "Aucune idée honnêtement. Je découvre que ça a un rapport avec l'airbag passager, ça m'inquiète un peu de ne pas l'avoir su.",
  ],
  // Q3 — ravoir du cordon / tôle à nu
  [
    "Le mot « ravoir » je ne le connaissais pas. Je pensais qu'il fallait tout enlever jusqu'à la tôle pour bien nettoyer.",
    "Je croyais qu'il fallait gratter au maximum. On m'a dit ici qu'il faut au contraire laisser un peu d'ancien cordon, ça me surprend.",
    "Je ne sais pas quelle épaisseur laisser. Et si la tôle est à nu, je ne saurais pas quoi mettre dessus.",
    "J'aurais mis de la colle directement sur la tôle. Je comprends maintenant que ce n'est pas la bonne méthode.",
    "Je sais qu'il ne faut pas de rouille, ça c'est logique pour moi, mais je ne connais pas le produit à appliquer.",
    "Là-dessus je pars vraiment de zéro, je n'ai jamais préparé un support de collage.",
  ],
  // Q4 — critères de réparabilité d'un impact
  [
    "Je fais à l'œil : si c'est petit, je dirais réparable, si c'est grand, remplacement. Je ne connais aucun critère précis.",
    "Je sais qu'on ne répare pas devant le conducteur, c'est tout ce que je peux dire.",
    "Je pensais qu'on pouvait réparer presque tout tant qu'il n'y a pas de fissure qui part.",
    "Je ne savais pas qu'il y avait des critères écrits ni qu'il fallait mesurer la distance au bord.",
    "Pour moi c'était surtout une question de prix pour le client, pas une question technique.",
    "Je n'aurais pas pensé à regarder la zone de la caméra, je découvre ce point.",
  ],
  // Q5 — procédure de réparation d'impact
  [
    "Je n'en ai jamais fait. Je sais juste qu'on injecte une résine et qu'on passe une lampe.",
    "J'ai vu un kit une fois. On colle un support avec des ventouses et on pousse la résine, mais je ne connais pas les cycles.",
    "Je ne savais pas qu'il fallait faire le vide avant d'injecter, je pensais qu'on injectait directement.",
    "Je connais le résultat attendu, que l'impact devienne presque invisible, mais pas la méthode pour y arriver.",
    "J'imagine qu'il faut que le vitrage soit sec, mais je ne saurais pas dire s'il faut ouvrir le point d'impact.",
    "Là, je suis vraiment débutant{e}, c'est même une des raisons pour lesquelles je viens en formation.",
  ],
  // Q6 — calibrage caméra ADAS
  [
    "Je sais que les voitures récentes ont une caméra derrière le pare-brise, mais je ne savais pas qu'il fallait la recalibrer après.",
    "On envoyait ça chez le concessionnaire. Je ne connais ni la procédure statique ni la dynamique.",
    "Je pensais que la caméra se remettait toute seule puisqu'elle est repositionnée au même endroit.",
    "J'ai déjà entendu parler de mires au sol, mais je n'ai jamais assisté à un calibrage.",
    "Je sais que ça touche au freinage d'urgence, donc j'imagine que c'est important, mais je ne sais pas faire.",
    "Aucune connaissance sur ce sujet, c'est ce qui me fait le plus peur dans le métier aujourd'hui.",
  ],
  // Q7 — glace latérale, lève-vitre, anti-pincement
  [
    "J'ai déjà démonté une garniture de porte, mais je n'ai jamais changé une glace ni touché à un lève-vitre.",
    "Je sais qu'il faut aspirer le verre cassé dans la porte, sinon ça raye. Le reste, non.",
    "Je ne connaissais pas le mot anti-pincement, et encore moins qu'il fallait le réinitialiser.",
    "Je pense qu'on remet la vitre dans des pinces et qu'on serre, mais je ne connais pas les réglages à faire après.",
    "Je saurais démonter, mais je ne saurais pas régler l'affleurement ni la course de la vitre.",
    "Je n'ai jamais ouvert une porte de voiture pour ça, donc je découvre complètement.",
  ],
  // Q8 — expliquer un refus de réparation au client
  [
    "Je dirais juste que ce n'est pas réparable. Je n'aurais pas d'argument technique derrière si le client insiste.",
    "J'appellerais mon chef d'atelier, je ne me sentirais pas légitime pour l'expliquer moi-même.",
    "Je sais parler aux clients, c'est mon point fort, mais là il me manque les mots justes sur le vitrage.",
    "Je crois qu'il faut lui montrer l'impact, mais je ne saurais pas nommer le critère qui bloque.",
    "Je le ferais avec le sourire mais sans explication précise, donc pas très convaincant honnêtement.",
    "C'est justement ce que je viens chercher : savoir dire non en étant crédible.",
  ],
  // Q9 — conseil et vente additionnelle
  [
    "Je n'aime pas trop vendre, j'ai peur de forcer le client. Je préfère ne rien proposer.",
    "Je propose parfois des balais d'essuie-glace, mais un peu au hasard, pas à partir d'un vrai constat.",
    "Dans mon poste actuel je fais surtout du technique, la partie conseil n'est pas dans mes habitudes.",
    "Je sais le faire sur d'autres produits, mais je ne connais pas les prestations liées au vitrage.",
    "J'aurais tendance à réciter une offre au lieu de partir de ce que j'ai vu sur le véhicule.",
    "Je voudrais apprendre à proposer sans avoir l'impression d'être un vendeur insistant.",
  ],
  // Q10 — sécurité, EPI, déchets
  [
    "Je mets des gants et des chaussures de sécurité par habitude, mais je ne connais pas les risques propres au verre.",
    "Je porte les EPI de base. Pour les produits chimiques, je n'ai jamais lu de fiche de données de sécurité.",
    "Je pensais qu'un pare-brise partait dans la benne à verre comme une bouteille.",
    "La manutention à deux, oui, je le fais déjà. Les déchets dangereux, je ne connais pas la procédure.",
    "Je sais qu'il faut ventiler quand ça sent fort, mais je n'ai jamais eu de consigne écrite.",
    "Je suis rigoureux{/se} sur la sécurité en général, mais tout ce qui touche au tri des colles et chiffons m'échappe.",
  ],
];

const FIN: string[][] = [
  // Q1
  [
    "Maintenant je peux les dérouler dans l'ordre : protection du véhicule et de la planche de bord, identification du vitrage par le VIN, dépose des essuie-glaces, de l'auvent et des baguettes, débranchement de la caméra et du capteur de pluie, découpe au fil ou à la lame, extraction à deux à la ventouse, ravoir en laissant un à deux millimètres, préparation du vitrage neuf (nettoyant, activateur, primaire, temps de flash-off), encollage en cordon triangulaire continu, pose sur cales, remontage, calibrage, essai d'étanchéité et traçabilité sur l'ordre de réparation.",
    "J'ai retenu la logique complète : on protège, on identifie, on dépose les périphériques et les connecteurs, on découpe, on extrait à deux, on rase le cordon en gardant un à deux millimètres, on prépare le vitrage neuf avec activateur et primaire en respectant le temps d'attente, on encolle en un seul cordon régulier, on pose sur les cales avec une pression uniforme, on remonte, on calibre la caméra, on teste l'étanchéité et on note le lot de colle.",
    "Ce que j'ai surtout compris, c'est que la pose ne représente qu'une partie du travail : la préparation du support et du vitrage neuf conditionne tout. Je sais aujourd'hui enchaîner protection, identification VIN, dépose, découpe, ravoir, activateur, primaire, encollage continu, pose sur cales, remontage, calibrage, contrôle d'étanchéité et traçabilité.",
    "Je suis capable de faire l'intervention complète en autonomie encadrée : protection, relevé du VIN, dépose auvent et essuie-glaces, débranchement des capteurs, découpe, extraction à la ventouse double, ravoir à un ou deux millimètres, préparation chimique du vitrage, cordon triangulaire continu, pose, remontage, calibrage, test à l'eau et consignes client.",
    "L'ordre est clair pour moi : protéger, identifier, déposer, découper, extraire, raser, préparer, encoller, poser, remonter, calibrer, contrôler, tracer. Et je sais expliquer pourquoi chaque étape existe, ce qui n'était pas le cas au début.",
    "Je maîtrise la chronologie et surtout les points de non-retour : ne jamais coller sans primaire ni sans respecter le flash-off, ne jamais poser seul{e} un pare-brise, et toujours contrôler l'étanchéité avant de rendre le véhicule.",
  ],
  // Q2
  [
    "Le SDAT est le temps de sécurité au décollage : le délai avant lequel le véhicule ne doit pas rouler. Il est donné par le fabricant de la colle et varie selon le produit, la température et l'hygrométrie. Tant qu'il n'est pas écoulé, le pare-brise n'assure pas son rôle structurel ni l'appui de l'airbag passager.",
    "C'est le délai fixé par le fabricant de la colle avant remise en circulation. Je ne donne plus de durée par habitude : je lis la cartouche et je tiens compte de la température et de l'humidité du jour.",
    "Le temps de sécurité au décollage conditionne la sécurité du client. Le pare-brise participe à la rigidité de la caisse et sert d'appui à l'airbag passager : rouler trop tôt, c'est risquer une éjection du vitrage en cas de choc.",
    "C'est la donnée fabricant qui indique quand le véhicule peut repartir. Je la note sur l'ordre de réparation avec le lot de colle, et je l'annonce au client avant même de commencer l'intervention.",
    "Le SDAT dépend de la colle utilisée et des conditions atelier. C'est un engagement de sécurité, pas une estimation : je ne le raccourcis jamais, même si le client est pressé.",
    "C'est le délai avant lequel on ne rend pas le véhicule. Il figure sur la fiche technique de la colle, il augmente quand il fait froid ou sec, et il est directement lié au fonctionnement de l'airbag passager.",
  ],
  // Q3
  [
    "Le ravoir consiste à raser l'ancien cordon en laissant un à deux millimètres réguliers : c'est sur ce résidu que la colle neuve accroche le mieux. On ne met jamais la tôle à nu volontairement.",
    "On garde un à deux millimètres d'ancien cordon. Si la tôle est mise à nu par accident, on dégraisse, on applique un primaire anticorrosion et on respecte le temps de séchage indiqué avant d'encoller.",
    "J'ai compris qu'enlever tout le cordan serait une erreur : le résidu régulier assure l'adhérence. En cas de tôle nue ou de rouille, traitement anticorrosion obligatoire avant collage.",
    "Ravoir, c'est araser proprement à un ou deux millimètres. Toute zone de tôle apparente est dégraissée puis primairisée, sinon la corrosion se développe sous le cordon et l'étanchéité est perdue.",
    "Le geste est de raser régulièrement en gardant une fine base. Une tôle nue non traitée, c'est de la rouille à moyen terme et un décollement possible : dégraissage, primaire, temps de séchage respecté.",
    "On laisse un à deux millimètres d'ancien cordon bien plan. Si la peinture est entamée, on traite avant de coller, jamais de colle directement sur métal nu.",
  ],
  // Q4
  [
    "Les critères sont cumulatifs : taille de l'impact, position hors du champ de vision du conducteur, distance suffisante au bord, absence de fissure ramifiée, hors zone caméra, film PVB intact, impact propre et sec, et non déjà réparé. Un seul critère non respecté impose le remplacement, et dans le doute on ne répare pas.",
    "Je mesure au lieu d'estimer : diamètre, distance au bord, position par rapport au regard du conducteur et à la zone de la caméra. S'il y a une fissure qui part ou de l'humidité dans l'impact, c'est un remplacement.",
    "Réparabilité = taille limitée + hors champ visuel + éloigné du bord + hors zone ADAS + feuilleté intact + impact sec et non pollué. Les critères se cumulent, aucun ne se négocie.",
    "J'applique une grille : dimension, localisation, distance au bord, état du film PVB, propreté et sécheresse de l'impact, présence d'une caméra. Un seul point bloquant suffit à basculer en remplacement.",
    "L'impact doit être petit, loin du bord, hors du regard conducteur et hors zone caméra, sans fissure qui progresse et sans humidité. En cas de doute, je remplace : c'est la sécurité du client qui prime sur le prix.",
    "Ce sont des critères cumulatifs et objectifs, pas une appréciation à l'œil. Je les vérifie tous et je trace ma décision avec une photo avant intervention.",
  ],
  // Q5
  [
    "Vitrage sec et non brûlant, nettoyage et ouverture du point d'impact, injecteur centré sur le support à ventouses, puis alternance de cycles vide/pression jusqu'à disparition de l'effet miroir dans toutes les branches. Polymérisation UV, résine de finition sous film, nouveau passage UV, arasage à la lame à plat et polissage. Contrôle en lumière rasante des deux côtés et photos avant/après.",
    "La clé, c'est le vide avant l'injection : sans lui, l'air reste emprisonné et la réparation est ratée. Ensuite cycles vide/pression, UV, finition sous film, second passage UV, arasage et polissage, puis contrôle qualité.",
    "On travaille sur un vitrage propre et sec, on ouvre le point d'impact, on centre l'injecteur, on enchaîne les cycles jusqu'à disparition du miroir, on polymérise, on pose la résine de finition avec le film, on repasse aux UV, on arase et on polit. J'ai validé mes réparations en travaux pratiques.",
    "Préparation, mise sous vide, injection, cycles répétés, polymérisation UV, finition, arasage, polissage, contrôle. Je surveille aussi la température du vitrage : trop chaud, la résine polymérise trop vite.",
    "Le protocole est rigoureux et se contrôle visuellement : tant qu'il reste une branche argentée, on refait un cycle. Une fois l'effet miroir disparu, UV, finition, arasage à plat et polissage.",
    "J'ai réalisé plusieurs réparations en atelier : ouverture du point d'impact, injecteur bien centré, alternance vide et pression, UV, résine de finition sous film, arasage et polissage, puis vérification des deux côtés du vitrage.",
  ],
  // Q6
  [
    "Après remplacement du pare-brise, l'angle de visée de la caméra change : un calibrage est obligatoire selon la procédure constructeur, en statique avec mires sur sol plan, en dynamique sur route, parfois les deux. Sans calibrage, le freinage d'urgence et le maintien de voie peuvent être inopérants ou intempestifs, et la responsabilité de l'atelier est engagée.",
    "Le calibrage remet la caméra en référence. Je respecte les conditions constructeur (sol plan, éclairage, pression des pneus, véhicule à vide) et je conserve le procès-verbal de calibrage dans le dossier.",
    "Statique en atelier avec les mires, dynamique en roulant à vitesse stabilisée, ou mixte selon le véhicule. Le PV de calibrage est une pièce de traçabilité que l'assureur peut réclamer.",
    "Sans calibrage, les aides à la conduite lisent la route de travers. C'est une opération de sécurité, pas une option commerciale : je l'annonce au client dès le devis.",
    "Je vérifie systématiquement la présence d'une caméra ou d'un capteur derrière le pare-brise avant l'intervention, et je planifie le calibrage dans le temps d'immobilisation annoncé au client.",
    "La procédure dépend du constructeur ; je la consulte à chaque fois plutôt que de généraliser. Le résultat est validé par la valise et archivé avec l'ordre de réparation.",
  ],
  // Q7
  [
    "On aspire l'intégralité des débris dans le caisson de porte et les coulisses, on repositionne la glace dans ses pinces, on serre au couple, on règle parallélisme, affleurement et course, puis on réinitialise l'anti-pincement selon la procédure constructeur. Remise en place du pare-vapeur et de la garniture, puis essai des commandes.",
    "Le point critique est l'aspiration complète du verre : sans elle, la glace neuve est rayée dès la première descente. Ensuite serrage au couple, réglages et réinitialisation de l'anti-pincement.",
    "Dépose de garniture et de pare-vapeur sans les déchirer, aspiration, montage de la glace dans les pinces, serrage au couple, réglage de la course et de l'affleurement, réapprentissage du lève-vitre, remontage et contrôle.",
    "Je sais aujourd'hui régler l'affleurement et la course, et surtout refaire l'apprentissage anti-pincement par montée et descente complètes maintenues, comme l'exige la procédure constructeur.",
    "Aspiration soignée, remontage au couple, réglages géométriques, réinitialisation électronique, contrôle d'étanchéité du pare-vapeur : c'est ce dernier point qui évite les infiltrations et les bruits d'air.",
    "L'intervention se termine toujours par un essai complet des commandes, y compris depuis le poste conducteur, et par la vérification de la fonction anti-pincement.",
  ],
  // Q8
  [
    "Je montre l'impact au client, je nomme précisément le critère qui bloque — par exemple la distance au bord ou la zone caméra — j'explique le risque concret si on réparait quand même, puis je propose immédiatement la solution, le délai et le prix, et je vérifie sa garantie bris de glace et sa franchise.",
    "J'explique avec des mots simples, je m'appuie sur un constat visible et mesuré, et je ne dis jamais « c'est comme ça ». Le client comprend qu'il s'agit de sa sécurité, pas d'un argument commercial.",
    "Je fais constater le dommage au client, je lui donne le critère technique en cause, je lui montre la conséquence prévisible, puis j'enchaîne sur la solution de remplacement avec un délai clair. Je gère seul{e} cet échange maintenant.",
    "Je m'appuie sur la grille de réparabilité pour objectiver le refus, je photographie l'impact, et je propose le remplacement avec devis et prise en charge assurance.",
    "Je reformule d'abord la demande du client pour montrer que je l'ai entendu{e}, puis j'explique le critère bloquant et je propose une alternative concrète et chiffrée.",
    "Refuser une réparation, c'est protéger le client : je le dis ainsi, calmement, avec la preuve sous les yeux, et je propose toujours une solution dans la foulée.",
  ],
  // Q9
  [
    "Je pars d'un constat réel fait sur le véhicule, par exemple des balais fendus repérés à la dépose. J'explique le bénéfice concret — visibilité de nuit sous la pluie et pas de rayure sur un pare-brise neuf — j'annonce le prix, je précise que l'immobilisation n'augmente pas, et j'accepte le refus sans insister.",
    "Le conseil part toujours d'une observation, jamais d'un argumentaire récité. Je propose, je chiffre, je laisse choisir, et je note le refus pour la visite suivante.",
    "J'ai compris que la vente additionnelle est du conseil : balais, traitement hydrophobe, contrôle des joints. Je le formule comme une recommandation professionnelle argumentée.",
    "Je montre la pièce usée au client, je lui explique l'impact sur sa sécurité, je donne un prix clair et un délai, puis je le laisse décider librement.",
    "Je propose une seule prestation complémentaire pertinente, celle qui découle du constat, plutôt que d'énumérer un catalogue : c'est plus crédible et mieux accepté.",
    "Je suis à l'aise avec cette étape maintenant : constat, bénéfice client, prix, choix laissé au client. Le refus fait partie du jeu et ne remet rien en cause.",
  ],
  // Q10
  [
    "Gants anti-coupure, lunettes de protection, chaussures de sécurité, gants nitriles dès qu'on manipule primaire ou colle, poste rangé et ventilé, lecture des fiches de données de sécurité. Manutention du pare-brise à deux ou à la ventouse double. Le pare-brise feuilleté ne va pas dans la benne à verre : filière spécifique pour séparer le verre et le PVB, et cartouches et chiffons souillés en déchets dangereux avec bordereau de suivi.",
    "Je raisonne risques : coupure, projection, produits chimiques, manutention. D'où les EPI adaptés à chaque phase, la ventilation du poste et le travail à deux pour la dépose et la pose.",
    "J'ai retenu la partie déchets, que je ne connaissais pas : verre feuilleté en filière dédiée, colles et chiffons en déchets dangereux avec traçabilité par bordereau.",
    "Sécurité au poste : sol dégagé, éclairage suffisant, EPI complets, fiches de données de sécurité consultées avant usage d'un nouveau produit, et jamais de pare-brise porté seul{e}.",
    "Les EPI sont systématiques et adaptés : anti-coupure au démontage, nitrile pour les produits, lunettes en permanence. Les déchets sont triés et tracés, pas jetés en mélange.",
    "Je suis vigilant{e} sur la manutention, première cause d'accident dans notre métier, et sur la ventilation lors de l'encollage. Le tri des déchets fait partie de l'intervention, pas de l'après.",
  ],
];

// ---------------------------------------------------------------------------
// Réponses ouvertes automatiques (tout stagiaire du CQP vitrage)
// ---------------------------------------------------------------------------

export function getVitrageAutoAnswers(
  nom: string | undefined,
  prenom: string | undefined,
  civilite: string | undefined,
  isDebut: boolean,
  nbQuestions = 10,
): { reponses: string[]; scores: number[] } {
  const seed = vitrageSeed(nom, prenom);
  const fem = isFeminin(civilite, prenom);
  const bank = isDebut ? DEBUT : FIN;

  const reponses: string[] = [];
  const scores: number[] = [];
  for (let q = 0; q < nbQuestions; q++) {
    const pool = bank[q % bank.length];
    const idx = (seed + q * 7 + Math.floor(seed / (q + 3))) % pool.length;
    reponses.push(accorder(pool[idx], fem));
    if (isDebut) {
      // Positionnement d'entrée : niveau faible et variable (0 / 0.5 / 1)
      const r = (seed + q * 11) % 10;
      scores.push(r < 5 ? 0 : r < 8 ? 0.5 : 1);
    } else {
      // Positionnement de fin : niveau acquis (1 majoritairement)
      const r = (seed + q * 13) % 10;
      scores.push(r < 8 ? 1 : 0.5);
    }
  }
  return { reponses, scores };
}

// ---------------------------------------------------------------------------
// Analyse des besoins — besoin principal exprimé, humanisé, par stagiaire
// ---------------------------------------------------------------------------

const BESOINS_VARIANTES: string[] = [
  "Savoir remplacer un pare-brise collé de A à Z sans avoir à demander de l'aide à chaque étape.",
  "Comprendre enfin le temps de séchage de la colle pour arrêter de donner un délai au hasard au client.",
  "Apprendre à réparer un impact proprement, parce que je n'ai jamais touché un kit d'injection.",
  "Être capable de dire si un impact est réparable ou non avec de vrais critères, pas à l'œil.",
  "Me mettre à niveau sur les caméras derrière le pare-brise et le calibrage, ça me fait peur aujourd'hui.",
  "Savoir changer une glace latérale et refaire le réglage du lève-vitre sans casser la garniture.",
  "Gagner en rapidité : je sais faire, mais je suis beaucoup trop lent{e} par rapport à l'atelier.",
  "Pouvoir expliquer un refus de réparation au client sans appeler mon chef d'atelier.",
  "Oser proposer des prestations complémentaires sans avoir l'impression de forcer la vente.",
  "Sécuriser mes gestes : manutention du pare-brise, produits chimiques et tri des déchets.",
  "Valider officiellement une pratique que j'ai apprise sur le tas, pour être reconnu{e} dans mon poste.",
  "Réussir le CQP pour changer de métier et être opérationnel{le} dès l'embauche.",
  "Comprendre la préparation du support : activateur, primaire, temps d'attente, tout ça est flou pour moi.",
  "Apprendre à tracer mon intervention correctement sur l'ordre de réparation.",
  "Être autonome sur les véhicules récents équipés d'aides à la conduite.",
  "Arrêter d'improviser sur la découpe : je veux la bonne méthode et les bons outils.",
  "Savoir contrôler l'étanchéité après la pose pour éviter les retours client.",
  "Prendre confiance en moi sur les interventions que je n'ai jamais faites seul{e}.",
];

export function getVitrageBesoin(
  nom?: string,
  prenom?: string,
  civilite?: string,
): string {
  const seed = vitrageSeed(nom, prenom);
  const fem = isFeminin(civilite, prenom);
  const txt = BESOINS_VARIANTES[seed % BESOINS_VARIANTES.length];
  return accorder(txt.replace(/\{le\}/g, fem ? "le" : ""), fem);
}

// ---------------------------------------------------------------------------
// Exercices pratiques — production écrite du stagiaire, différente à chaque fois
// ---------------------------------------------------------------------------

const EXERCICES_PRODUCTIONS: string[][] = [
  // Bloc 1 — diagnostic / réparabilité
  [
    "J'ai commencé par relever le VIN pour identifier la référence exacte du vitrage, puis j'ai mesuré l'impact : 7 mm de diamètre, situé à 11 cm du bord bas côté passager, hors du champ de vision du conducteur et hors zone caméra. Le film PVB est intact, aucune fissure ne part de l'impact, le vitrage est sec. J'ai conclu à une réparation possible et je l'ai justifiée par écrit sur la fiche de diagnostic, avec photo avant intervention.",
    "Après nettoyage de la zone, j'ai constaté un impact en étoile de 14 mm avec une branche de 3 cm qui progresse vers le bord. Il est également situé dans le champ de vision direct du conducteur. Deux critères sont bloquants, donc j'ai proposé un remplacement et non une réparation. J'ai expliqué au client que réparer ici laisserait une déformation optique permanente devant ses yeux.",
    "J'ai contrôlé chaque critère de la grille : diamètre 5 mm, distance au bord 15 cm, hors zone ADAS, impact propre et sec, non déjà réparé. Réparation validée. J'ai relevé la référence, préparé le kit et planifié l'intervention dans la journée pour éviter que l'humidité ne pénètre dans l'impact.",
    "Le véhicule est équipé d'une caméra de maintien de voie. L'impact se trouve à 4 cm de la zone de vision de cette caméra : j'ai considéré ce point comme bloquant et j'ai orienté vers un remplacement avec calibrage. J'ai tracé la décision et pris une photo de la zone pour le dossier.",
    "Diagnostic réalisé en lumière rasante des deux côtés du vitrage : impact de 9 mm, propre, sec, à 13 cm du bord, sans ramification. J'ai coché tous les critères de la grille de réparabilité et validé une réparation par injection de résine, avec accord écrit du client.",
    "J'ai relevé un impact humide, le client ayant roulé sous la pluie plusieurs jours. Même si la taille et la position étaient favorables, l'humidité présente dans l'éclat empêche une réparation durable. J'ai proposé au client soit un séchage contrôlé avant réparation, soit un remplacement, en expliquant les deux options.",
  ],
  // Bloc 2 — dépose / préparation
  [
    "J'ai protégé les ailes, le capot et la planche de bord, relevé le VIN, déposé les essuie-glaces après avoir repéré leur position, puis la grille d'auvent et les baguettes. J'ai débranché la caméra et le capteur de pluie en libérant les connecteurs sans tirer sur les fils. Découpe au fil à l'intérieur, extraction à deux à la ventouse double, puis ravoir en laissant un cordon résiduel régulier de 1 à 2 mm.",
    "Avant toute chose j'ai bâché l'habitacle et repéré les positions des essuie-glaces au ruban adhésif. Dépose des périphériques, déconnexion des capteurs, découpe à la lame oscillante côté extérieur là où l'accès le permettait. Extraction à deux. Au ravoir, j'ai mis la tôle à nu sur environ 3 cm : j'ai dégraissé et appliqué le primaire anticorrosion en respectant le temps de séchage.",
    "J'ai travaillé méthodiquement : protection complète du véhicule, identification du vitrage, dépose, découpe au fil bi-directionnel, extraction à la ventouse, puis arasage à 1,5 mm. J'ai contrôlé la planéité du cordon résiduel à la main avant de préparer le vitrage neuf.",
    "La dépose s'est faite sans casse : protection, repérage, déconnexion des faisceaux, découpe progressive en surveillant la planche de bord, extraction à deux. J'ai ensuite nettoyé la baie, contrôlé l'absence de corrosion et rasé l'ancien cordon en gardant une base régulière.",
    "J'ai insisté sur la préparation du vitrage neuf : nettoyage de la sérigraphie au nettoyant dédié, application de l'activateur, puis du primaire en une passe régulière, et respect strict du temps de flash-off indiqué sur la fiche produit avant l'encollage.",
    "Après extraction, j'ai vérifié l'état des cales et des agrafes de baguettes et j'ai remplacé celles qui étaient cassées. J'ai rasé le cordon à 1 à 2 mm, dépoussiéré la baie et préparé les deux surfaces de collage avant d'ouvrir la cartouche.",
  ],
  // Bloc 3 — pose / collage
  [
    "J'ai encollé en un seul cordon triangulaire continu, sans reprise, à hauteur constante, en soignant le raccord de départ et d'arrivée. Pose à deux sur les cales de centrage, pression répartie sur tout le pourtour, contrôle des jeux et de l'affleurement. J'ai noté le lot de colle et l'heure de pose sur l'ordre de réparation et annoncé le SDAT au client.",
    "Le cordon a été réalisé en une passe, buse coupée en V pour obtenir un profil triangulaire régulier. J'ai posé le vitrage à deux sans le faire glisser, appuyé uniformément, puis vérifié visuellement l'écrasement du cordon depuis l'intérieur. Traçabilité complète du lot de colle.",
    "J'ai vérifié la température de l'atelier et de la cartouche avant l'encollage, car cela influence la mise en œuvre et le SDAT. Cordon continu, pose sur cales, pression uniforme, contrôle des jeux, puis remontage des baguettes, de l'auvent et des essuie-glaces à leur repère.",
    "Encollage régulier sans interruption, pose immédiate avant formation d'une peau en surface, positionnement sur les cales et pression franche mais répartie. J'ai ensuite reconnecté la caméra et le capteur de pluie et vérifié l'absence de défaut au tableau de bord.",
    "J'ai contrôlé l'alignement du vitrage avant appui définitif, car une reprise après contact dégrade le cordon. Pose validée, jeux réguliers, puis essai d'étanchéité à l'eau au jet diffusé après le temps de prise initiale.",
    "Après la pose, j'ai réalisé le calibrage statique de la caméra avec les mires, sol plan et véhicule à vide, puis un essai routier de contrôle. Le procès-verbal de calibrage a été joint au dossier client avec le rapport d'intervention.",
  ],
  // Bloc 4 — relation client / sécurité
  [
    "J'ai reçu le client, reformulé sa demande, montré l'impact et expliqué le critère bloquant : l'éclat est à moins de 5 cm du bord, zone où le vitrage travaille le plus. J'ai annoncé le remplacement, le prix, le délai d'immobilisation calibrage compris, et j'ai vérifié sa garantie bris de glace et le montant de sa franchise.",
    "Face au refus du client de laisser le véhicule le temps du SDAT, j'ai expliqué le rôle structurel du pare-brise et l'appui de l'airbag passager. Je lui ai proposé de patienter à l'accueil ou de repasser en fin de journée. Il a accepté d'attendre après cette explication.",
    "J'ai profité de la dépose pour constater des balais d'essuie-glace fendus. Je l'ai signalé au client avec le bénéfice concret — pas de rayure sur un vitrage neuf, meilleure visibilité de nuit — j'ai donné le prix et précisé que l'immobilisation restait la même. Il a accepté.",
    "J'ai réalisé l'analyse des risques du poste avant intervention : coupure au démontage, projection de particules, exposition au primaire et à la colle, manutention du vitrage. J'ai listé les EPI correspondants et vérifié la ventilation avant d'ouvrir la cartouche.",
    "J'ai trié les déchets de l'intervention : pare-brise feuilleté orienté vers la filière spécifique de séparation verre/PVB, cartouche entamée et chiffons souillés en déchets dangereux avec bordereau de suivi. Rien n'est parti dans la benne à verre courante.",
    "J'ai rédigé le compte rendu remis au client : nature de l'intervention, référence du vitrage, lot de colle, heure de pose, SDAT annoncé, calibrage réalisé, consignes des 48 premières heures (ne pas claquer les portes, ne pas retirer les adhésifs de maintien, éviter le lavage haute pression).",
  ],
];

export function pickVitrageExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string },
  contexte?: string,
): string | null {
  if (!isVitrageFormation(intitule, code)) return null;
  const seed = vitrageSeed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);

  // Choix du bloc de production selon le thème réel de l'exercice
  const t = (contexte || "").toLowerCase();
  let bloc: number;
  if (/impact|réparabilité|reparabilite|diagnostic|résine|resine|injection/.test(t)) bloc = 0;
  else if (/dépose|depose|découpe|decoupe|extraction|ravoir|préparation|preparation/.test(t)) bloc = 1;
  else if (/pose|collage|encoll|cordon|calibrage|adas/.test(t)) bloc = 2;
  else if (/client|accueil|devis|sécurité|securite|déchet|dechet|epi|risque/.test(t)) bloc = 3;
  else bloc = exerciceIdx % EXERCICES_PRODUCTIONS.length;

  const pool = EXERCICES_PRODUCTIONS[bloc];
  const idx = (seed + exerciceIdx * 5 + stagiaireIdx) % pool.length;
  return accorder(pool[idx], fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "CAP Maintenance des véhicules automobiles, option voitures particulières, obtenu en 2016",
  "Baccalauréat professionnel Maintenance des véhicules – option A voitures particulières",
  "CAP Peinture en carrosserie, suivi de quatre ans en atelier de carrosserie",
  "Baccalauréat général série S, puis trois ans en centre auto (pneumatiques, révisions)",
  "CAP Réparation des carrosseries préparé en apprentissage chez un carrossier indépendant",
  "Brevet des collèges, puis parcours entièrement réalisé sur le terrain en atelier familial",
  "Baccalauréat professionnel Maintenance des matériels agricoles, en reconversion vers l'automobile",
  "CAP Carrossier-réparateur complété par l'habilitation électrique B0L",
  "Titre professionnel Mécanicien automobile obtenu à l'AFPA en 2019",
  "Baccalauréat technologique STI2D, première expérience en réparation rapide",
  "CAP Employé de vente, reconversion après cinq ans en grande distribution",
  "Aucun diplôme dans la branche : compétences acquises par l'expérience en atelier",
  "CAP Maintenance des véhicules obtenu en 2011, puis mention complémentaire Maintenance des systèmes embarqués",
  "Baccalauréat professionnel Réparation des carrosseries, session 2018",
  "BEP Maintenance des véhicules et des matériels, dernier diplôme obtenu",
  "CAP Serrurier-métallier, reconversion vers le vitrage après un licenciement économique",
  "Baccalauréat professionnel Logistique, deux ans de conduite de véhicules de société",
  "Titre professionnel Carrossier-peintre automobile, obtenu en formation continue",
  "CAP Maintenance des véhicules option motocycles, passage vers l'automobile",
  "Baccalauréat professionnel Électrotechnique, orientation récente vers l'après-vente auto",
  "Diplôme étranger de mécanique automobile obtenu au Maroc, non encore équivalé en France",
  "CAP Installateur en froid et conditionnement d'air, reconversion complète",
  "Baccalauréat professionnel Commerce, puis trois ans en réception atelier",
  "CAP Peintre applicateur de revêtements, expérience de pose de films et vitrages",
  "Brevet professionnel Maintenance des véhicules obtenu en alternance",
  "Baccalauréat général série ES, reconversion manuelle assumée après un BTS abandonné",
  "CAP Menuisier-installateur, habitué à la pose de vitrages sur bâtiment",
  "Titre professionnel Agent de maintenance industrielle, réorientation vers l'automobile",
  "CAP Maintenance des véhicules, obtenu en candidat libre en 2021",
  "Baccalauréat professionnel Technicien d'usinage, reconversion en cours",
  "BEP Carrosserie, complété par dix ans de pratique en atelier de vitrage",
  "CAP Cuisine, reconversion totale après une inaptitude au métier initial",
  "Baccalauréat professionnel Maintenance des véhicules – option C motocycles",
  "CAP Métiers du pressing, reconversion vers un métier technique en tension",
  "Titre professionnel Mécanicien réparateur de véhicules particuliers, session 2022",
  "CAP Agent d'entreposage, expérience de manutention et de préparation de véhicules",
  "Baccalauréat professionnel Systèmes numériques, appétence pour l'électronique embarquée",
  "CAP Maçon, reconversion après plusieurs années dans le bâtiment",
  "BTS Maintenance des véhicules non validé, arrêt en deuxième année",
  "CAP Vendeur-magasinier en pièces de rechange automobile",
  "Baccalauréat professionnel Métiers de l'accueil, reconversion vers un poste technique",
  "CAP Réparation des carrosseries obtenu en 2009, longue expérience terrain depuis",
  "Titre professionnel Agent de service en atelier automobile",
  "CAP Peinture en carrosserie et attestation de formation au collage structurel",
  "Baccalauréat professionnel Gestion-administration, reconversion vers l'atelier",
  "CAP Maintenance des véhicules option véhicules de transport routier",
  "Brevet des collèges, puis huit ans d'intérim en industrie automobile",
  "CAP Électricien, expérience en pose d'équipements sur véhicules utilitaires",
  "Baccalauréat professionnel Maintenance nautique, transfert de compétences vers l'automobile",
  "CAP Conducteur d'installations de production, reconversion vers un métier de service",
  "Titre professionnel Technicien après-vente automobile obtenu en 2020",
  "CAP Plomberie, reconversion vers le vitrage automobile par goût du travail manuel",
  "Baccalauréat professionnel Maintenance des véhicules, session 2023, sans expérience longue",
];

const BESOINS_OBJECTIFS = [
  "Devenir pleinement autonome sur le remplacement d'un pare-brise collé, calibrage ADAS compris.",
  "Passer des vitres latérales au pare-brise collé, qui représente l'essentiel de la demande.",
  "Obtenir le CQP pour candidater dans un centre spécialisé et sortir de l'intérim.",
  "Réduire mon temps d'intervention, aujourd'hui proche du double du temps barème.",
  "Maîtriser le calibrage des caméras et radars, que je ne sais pas réaliser actuellement.",
  "Ouvrir à terme une activité de réparation d'impact en intervention mobile.",
  "Sécuriser mon poste : mon employeur veut un opérateur certifié pour garder l'agrément assureur.",
  "Apprendre la réparation par injection de résine, technique que je ne pratique pas du tout.",
  "Me reconvertir dans un métier manuel qui recrute, après des années dans un secteur bouché.",
  "Savoir décider seul entre réparation et remplacement et pouvoir le justifier au client.",
  "Pouvoir travailler seul en atelier le samedi sans validation d'un chef d'atelier.",
  "Monter en compétence sur les colles et les temps de séchage, mon principal point faible.",
  "Être capable de traiter un véhicule de bout en bout, de l'accueil à la restitution.",
  "Savoir déposer un pare-brise sans abîmer la peinture ni les joints d'encadrement.",
  "Devenir la personne référente vitrage de l'atelier où je travaille depuis trois ans.",
  "Obtenir une qualification reconnue pour négocier une évolution de salaire.",
  "Apprendre à travailler proprement en respectant les temps de séchage avant restitution.",
  "Être capable d'intervenir sur véhicules utilitaires et poids lourds, pas seulement sur VP.",
  "Élargir mes prestations à la lunette arrière et aux vitres latérales collées.",
  "Comprendre enfin le rôle du primaire et de l'apprêt, que j'applique aujourd'hui sans savoir pourquoi.",
  "Passer d'un poste de préparateur à un poste d'opérateur vitrage à part entière.",
  "Décrocher un CDI dans un réseau de vitrage national à l'issue de la formation.",
  "Savoir identifier la référence exacte d'un vitrage à partir du VIN sans me tromper.",
  "Gagner en confiance sur les véhicules récents équipés de capteurs de pluie et caméras.",
  "Pouvoir reprendre l'atelier de mon employeur qui part à la retraite dans deux ans.",
  "Maîtriser la sécurité liée au collage structurel et les délais de remise en circulation.",
  "Réussir le CQP du premier coup pour ne pas perdre une année supplémentaire.",
  "Améliorer la qualité de mes finitions : aujourd'hui j'ai encore des reprises pour bruit d'air.",
  "Apprendre à établir un devis et à monter un dossier de prise en charge assurance.",
  "Devenir polyvalent entre atelier et intervention mobile chez le client.",
  "Pouvoir former à mon tour les apprentis de l'atelier sur la pose de vitrage.",
  "Sortir du travail non déclaré et exercer enfin avec une qualification officielle.",
  "Retrouver un emploi stable après dix-huit mois d'inactivité.",
  "Compléter ma qualification de carrossier par une spécialisation vitrage.",
  "Réduire les casses de vitrage neuf lors de la manutention, encore trop fréquentes chez moi.",
  "Savoir gérer les déchets et les produits chimiques conformément à la réglementation.",
  "Être opérationnel sur les véhicules électriques, avec les précautions haute tension.",
  "Passer du statut d'aide-opérateur à celui d'opérateur autonome facturable.",
  "Acquérir la rigueur méthodologique qui me manque pour travailler vite et bien.",
  "Obtenir un titre me permettant de m'installer comme auto-entrepreneur crédible.",
  "Maîtriser la pose sur véhicules haut de gamme, où l'exigence client est très forte.",
  "Pouvoir intervenir seul sur un chantier extérieur, y compris par temps froid.",
  "Apprendre les critères de réparabilité pour ne plus remplacer inutilement un pare-brise.",
  "Améliorer ma relation client : expliquer clairement l'intervention et les précautions après pose.",
  "Valider officiellement dix ans de pratique acquise sans diplôme.",
  "Être capable de contrôler la qualité de mon travail avant restitution, avec une vraie check-list.",
  "Savoir utiliser les outils de découpe à fil et à lame oscillante en sécurité.",
  "Intégrer une équipe de vitrage sur véhicules de flotte et gérer des volumes importants.",
  "Comprendre les procédures constructeur et savoir les retrouver dans la documentation technique.",
  "Réussir mon insertion professionnelle après un parcours d'accompagnement France Travail.",
  "Diminuer le nombre de retours atelier liés à des infiltrations d'eau.",
  "Savoir organiser mon poste de travail pour enchaîner plusieurs véhicules dans la journée.",
  "Obtenir une certification qui me permettra de travailler à l'étranger dans le même métier.",
];

const BESOINS_PROJET = [
  "Cette formation apporte la partie technique qui me manque : la méthode et les règles du collage structurel.",
  "Le vitrage automobile recrute en continu dans ma région : la certification me permet de choisir mon employeur.",
  "Sans maîtrise du calibrage ADAS je serais hors marché rapidement : tous les véhicules récents en sont équipés.",
  "Elle me permettra de facturer des prestations à plus forte valeur ajoutée que les petites interventions.",
  "À l'issue du parcours je pourrai prendre un véhicule en charge du diagnostic à la restitution.",
  "C'est l'étape indispensable avant de m'installer en intervention mobile, faute de quoi aucun assureur ne référence.",
  "Je veux cesser d'être cantonné aux tâches annexes et devenir la personne référente sur le vitrage.",
  "Un métier manuel en tension, non délocalisable, avec une évolution possible vers chef d'atelier : cela sécurise mon parcours.",
  "Mon employeur conditionne mon passage en CDI à l'obtention de cette qualification.",
  "Elle me permet de repartir sur des bases solides après une longue période sans emploi.",
  "Je pratique déjà, mais sans reconnaissance : ce certificat officialisera mes compétences réelles.",
  "Elle rend mon profil complet aux yeux des réseaux nationaux, qui exigent une qualification vitrage.",
  "C'est le complément logique de mon CAP carrosserie et cela élargit mon champ d'intervention.",
  "Elle me permettra d'augmenter ma rémunération, aujourd'hui bloquée faute de qualification.",
  "Ce parcours répond à une commande directe de mon employeur, qui veut internaliser le vitrage.",
  "Elle me donne les bases sécurité indispensables : je manipule des colles structurelles sans formation préalable.",
  "C'est la condition pour reprendre l'activité de vitrage d'un artisan qui cesse son activité.",
  "Elle m'ouvre un second métier en complément de la mécanique, utile pendant les périodes creuses.",
  "Le pare-brise est devenu un organe de sécurité : je veux travailler avec le niveau d'exigence correspondant.",
  "Elle me permettra d'accéder à des chantiers de flotte, plus réguliers et mieux rémunérés.",
  "Je souhaite quitter l'intérim pour un poste fixe : la certification est le principal critère demandé.",
  "Elle valide un projet mûri depuis deux ans, préparé avec mon conseiller France Travail.",
  "Sans elle, je continuerai à refuser les véhicules équipés de caméras, soit la majorité des demandes.",
  "Elle me permettra d'assumer la responsabilité qualité de l'atelier sur la partie vitrage.",
  "C'est un moyen concret de sortir d'un métier devenu physiquement trop exigeant pour moi.",
  "Elle crédibilisera mon activité indépendante auprès des compagnies d'assurance et des loueurs.",
  "Elle m'apporte la rigueur méthodologique qui manque à mon apprentissage sur le tas.",
  "Elle me donne accès à un secteur qui embauche localement, ce qui évite un déménagement familial.",
  "Le certificat me permettra de répondre aux appels d'offres des sociétés de flotte de ma région.",
  "C'est un tremplin vers un poste de chef d'équipe, objectif que je vise à trois ans.",
  "Elle sécurise juridiquement mes interventions : je saurai ce qui engage ma responsabilité.",
  "Elle me permettra d'encadrer des apprentis, ce que je ne peux pas faire aujourd'hui.",
  "Après un accident de parcours professionnel, elle marque une reprise durable.",
  "Elle complète mon expérience en carrosserie par une compétence rare et recherchée.",
  "Elle m'apporte la confiance nécessaire pour intervenir seul chez le client.",
  "Elle me permettra de réduire mes reprises, qui pèsent aujourd'hui sur ma rentabilité.",
  "C'est la seule voie pour transformer une pratique familiale en vrai métier déclaré.",
  "Elle correspond exactement au poste que l'on me propose sous condition de qualification.",
  "Elle m'ouvre la possibilité de travailler dans un centre agréé constructeur.",
  "Elle me donnera les arguments techniques pour dialoguer avec les experts d'assurance.",
  "C'est un investissement dans un métier stable, où la demande ne faiblit pas.",
  "Elle me permettra de mieux organiser mon temps et d'augmenter le nombre de véhicules traités.",
  "Elle me sortira d'un poste de manutentionnaire sans perspective d'évolution.",
  "Elle apportera à mon atelier la compétence ADAS que nous sous-traitons actuellement.",
  "Elle est indispensable pour obtenir l'agrément qui conditionne nos partenariats assureurs.",
  "Elle valide une reconversion choisie et non subie, mûrie après une immersion en atelier.",
  "Elle me permettra de proposer la réparation d'impact, prestation que je ne sais pas faire.",
  "Elle renforcera la qualité de service de la structure et donc sa réputation locale.",
  "Elle me donnera une compétence transférable si je change de région.",
  "Elle m'apportera la maîtrise documentaire : savoir lire une procédure constructeur.",
  "Elle me permettra de mieux conseiller le client sur les précautions après intervention.",
  "Elle rend cohérent mon parcours : mécanique, carrosserie, et désormais vitrage.",
  "Elle constitue la dernière brique avant la création de mon entreprise, prévue l'an prochain.",
];

const BESOINS_HANDICAP = [
  "Non, je ne suis pas en situation de handicap. Aucun aménagement n'est nécessaire.",
  "Non. Je porte des lunettes de correction, sans incidence sur le suivi de la formation.",
  "Non, aucune situation de handicap déclarée. Je suis apte au port de charges et au travail en atelier.",
  "Non. Je signale une gêne au genou droit après une ancienne blessure : j'évite les postures à genoux prolongées, sans aménagement formel.",
  "Non. Je précise être daltonien léger, sans difficulté pour les travaux réalisés.",
  "Non. Aucun aménagement pédagogique, technique ou matériel n'est sollicité.",
  "Non. J'ai informé le référent handicap d'un traitement médical sans incidence sur la pratique.",
  "Non. Je suis suivi pour un mal de dos chronique et j'appliquerai les gestes et postures enseignés.",
  "Non. Aucun handicap, mais j'apprécierais des supports écrits en gros caractères pour le confort de lecture.",
  "Non, aucune restriction médicale. Ma visite d'aptitude est à jour.",
  "Non. Je suis simplement un peu gêné par le bruit prolongé et porterai des protections auditives.",
  "Non. Aucun handicap reconnu ; je n'ai jamais déposé de dossier MDPH.",
  "Non. Je suis asthmatique et veillerai à travailler dans une zone correctement ventilée lors du ponçage.",
  "Non, pas de handicap. Aucune adaptation demandée pour les évaluations.",
  "Non. Je précise une allergie cutanée aux solvants : je travaille systématiquement avec des gants nitrile.",
  "Non. Aucun besoin d'adaptation, ni pédagogique ni matérielle.",
  "Non. J'ai des difficultés à l'écrit et j'apprécierais que les consignes soient aussi données à l'oral.",
  "Non. Aucun handicap déclaré, je suis autonome sur toutes les modalités de formation.",
  "Non. Je porte un appareillage dentaire sans lien avec la formation ; rien à signaler.",
  "Non. Je suis en bonne condition physique et pratique un sport régulièrement.",
  "Non. Une ancienne fracture du poignet me limite légèrement en force, sans gêne pour le métier.",
  "Non. Rien à signaler ; j'ai pris connaissance des coordonnées du référent handicap.",
  "Non, aucune situation de handicap. Je demande simplement des pauses régulières lors des séquences debout prolongées.",
  "Non. Je porte des lentilles de contact et éviterai les projections en portant systématiquement des lunettes de protection.",
  "Non. Aucun aménagement requis pour les épreuves pratiques comme théoriques.",
  "Non. J'ai signalé un léger vertige en hauteur, sans incidence pour un travail au sol.",
  "Non. Aucun handicap ; je suis toutefois preneur d'un tutorat renforcé sur la partie théorique.",
  "Non. Pas de restriction d'aptitude médicale au poste d'opérateur vitrage.",
  "Non. Je suis suivi pour un diabète équilibré et prendrai mes pauses repas à heure fixe.",
  "Non. Aucun aménagement matériel, mais je préfère être placé près du poste de démonstration.",
  "Non. Rien à déclarer. Je m'engage à signaler immédiatement toute difficulté rencontrée.",
  "Non. Je suis droitier sans limitation, aucune adaptation d'outillage nécessaire.",
  "Non. Aucune situation de handicap ; j'ai néanmoins un suivi kinésithérapique hebdomadaire en fin de journée.",
  "Non. Aucun handicap. Les modalités présentielles me conviennent parfaitement.",
  "Non. Je précise une sensibilité au froid : je prévoirai une tenue adaptée pour les interventions extérieures.",
  "Non, aucun handicap déclaré ni aménagement souhaité.",
  "Non. Je bénéficie d'un accompagnement social sans lien avec une situation de handicap.",
  "Non. Aucune adaptation nécessaire ; j'ai lu la procédure d'accessibilité de l'organisme.",
  "Non. Je porte une orthèse plantaire, sans incidence sur la station debout prolongée.",
  "Non. Aucune situation de handicap ; je suis à l'aise avec les supports numériques et papier.",
  "Non. Je suis gaucher : je souhaite simplement pouvoir adapter ma position sur les postes de travail.",
  "Non. Aucun handicap. Je précise être en cours de récupération d'une entorse, sans gêne attendue.",
  "Non. Rien à signaler, mon aptitude au poste a été confirmée par la médecine du travail.",
  "Non. Aucun aménagement demandé, y compris pour les évaluations chronométrées.",
  "Non. Je précise une fatigue visuelle en fin de journée : des pauses écran suffisent.",
  "Non. Aucune situation de handicap ; je préfère toutefois éviter les travaux prolongés en position accroupie.",
  "Non. Aucun handicap déclaré, je participerai à l'ensemble des travaux pratiques.",
  "Non. Je suis en pleine capacité physique et n'ai aucune demande particulière.",
  "Non. J'ai un léger acouphène et me placerai à distance des outils les plus bruyants.",
  "Non. Aucune adaptation nécessaire ; j'informerai le formateur en cas de besoin ponctuel.",
  "Non. Aucune reconnaissance de handicap, aucune restriction professionnelle.",
  "Non. Je précise porter des semelles de sécurité personnelles adaptées à mes pieds sensibles.",
  "Non. Aucun handicap ni aménagement horaire lié à la santé à prévoir.",
];

const BESOINS_DISPO = [
  "Je suis disponible en journée du lundi au vendredi, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. Aucune contrainte particulière.",
  "Disponible en journée du lundi au vendredi (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Je dépose mon enfant à l'école le matin : merci de me prévenir d'un démarrage avancé.",
  "Je peux suivre la formation de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>. Je viens en transports, un départ à 17h00 me convient.",
  "Disponibilité totale en journée sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, y compris pour rester plus tard sur les travaux pratiques.",
  "Disponible en journée (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>) du lundi au vendredi, sans demande d'aménagement.",
  "Journée complète du lundi au vendredi, <strong>09h00 – 12h30</strong> puis <strong>13h30 – 17h00</strong>. Un rendez-vous médical déjà pris sera décalé si nécessaire.",
  "Disponible du lundi au vendredi sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. Je fais 40 minutes de route matin et soir, ce qui reste compatible.",
  "Je suis disponible en journée toute la semaine. Je demande simplement à être prévenu une semaine à l'avance en cas de modification du planning.",
  "Disponible <strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong> du lundi au vendredi. Je peux également venir le samedi matin pour du rattrapage.",
  "Journée du lundi au vendredi. Je covoiture avec un autre stagiaire, un horaire fixe m'arrange particulièrement.",
  "Disponible en journée. Je suis actuellement en recherche d'emploi, donc aucune contrainte professionnelle.",
  "Disponible du lundi au vendredi en journée. Je garde ma fille le mercredi après-midi une semaine sur deux et le signalerai à l'avance.",
  "Disponibilité en journée complète. Je préfère éviter les fins de journée après 17h00 pour des raisons de garde d'enfants.",
  "Disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. Aucune demande d'aménagement horaire.",
  "Je suis disponible toute la semaine en journée. Mon employeur a validé ma libération sur la période de formation.",
  "Disponible en journée, avec une contrainte : un rendez-vous à la médecine du travail à planifier durant la période.",
  "Disponible du lundi au vendredi. Je peux arriver dès 08h30 pour préparer les postes si cela aide l'organisation.",
  "Journée complète, du lundi au vendredi. Je n'ai aucune contrainte familiale ou professionnelle sur la période.",
  "Disponible en journée. Je précise deux jours d'absence prévus pour un déménagement, déjà signalés à l'organisme.",
  "Disponible <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. Je suis véhiculé et peux me rendre sur des sites extérieurs si besoin.",
  "Disponible en journée du lundi au vendredi ; je souhaite conserver la pause déjeuner d'une heure pour rentrer chez moi.",
  "Disponibilité complète en journée. Je suis prêt à suivre des séances de rattrapage le soir si je prends du retard.",
  "Disponible du lundi au vendredi en journée, sans aménagement particulier à demander.",
  "Disponible en journée. Je travaille actuellement le week-end, ce qui ne gêne pas le suivi en semaine.",
  "Disponible <strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>. Je demande un planning communiqué à l'avance pour organiser la garde de mes enfants.",
  "Journée complète du lundi au vendredi. Aucun aménagement horaire n'est sollicité.",
  "Disponible en journée. Je signale une convocation administrative sur une demi-journée pendant la formation.",
  "Disponible toute la semaine en journée, y compris sur les créneaux de mise en pratique prolongés.",
  "Disponible du lundi au vendredi. Je préfère les journées continues plutôt qu'un étalement sur plusieurs semaines.",
  "Disponible en journée. Habitant à 5 minutes du centre, je peux m'adapter facilement à un changement d'horaire.",
  "Disponibilité en journée complète, avec une contrainte de transport : dernier bus à 17h45.",
  "Disponible du lundi au vendredi de <strong>09h00 à 17h00</strong>. Aucune demande particulière.",
  "Disponible en journée. Je suis inscrit à France Travail et mes rendez-vous seront calés hors temps de formation.",
  "Disponible toute la semaine. Je peux également participer à des visites d'entreprise organisées en dehors du centre.",
  "Disponible en journée. Je demande à être prévenu si une séance se déroule sur un site extérieur, pour organiser mon trajet.",
  "Journée du lundi au vendredi, <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. Aucun problème de disponibilité.",
  "Disponible en journée. Je précise être en congé sans solde sur la période, donc totalement mobilisé.",
  "Disponible du lundi au vendredi. Je souhaite éviter les vendredis après-midi si le programme le permet, sans que ce soit bloquant.",
  "Disponibilité complète en journée, sans contrainte de garde ni de transport.",
  "Disponible en journée. Je peux rester après 17h00 pour revoir un geste technique avec le formateur.",
  "Disponible du lundi au vendredi. Une visite d'entretien avec mon conseiller est prévue en fin de parcours.",
  "Disponible en journée, avec un impératif : partir à 16h30 le jeudi pour un traitement médical hebdomadaire.",
  "Disponible sur toute la semaine en journée. Je suis flexible sur d'éventuels ajustements de planning.",
  "Disponible du lundi au vendredi en journée. Je précise venir en deux-roues, ce qui me rend autonome sur les horaires.",
  "Disponibilité en journée complète. Aucune demande d'aménagement, y compris pour les évaluations.",
  "Disponible en journée. Je signale un engagement associatif le samedi, sans impact sur la formation.",
  "Disponible du lundi au vendredi. Je peux commencer plus tôt si le groupe le souhaite.",
  "Disponible en journée. Mon conjoint assure la garde des enfants sur toute la période de formation.",
  "Disponible toute la semaine en journée, sans aucune contrainte à signaler à ce jour.",
  "Disponible <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. Je préviendrai immédiatement en cas d'imprévu.",
  "Disponible en journée. J'ai anticipé mes rendez-vous personnels en dehors des heures de formation.",
  "Disponible du lundi au vendredi. Je peux effectuer les séquences en atelier sur un autre site si nécessaire.",
  "Disponible en journée. Aucun aménagement horaire demandé, ma situation me permet une présence assidue.",
];


const BESOINS_BUDGET_PERSO = [
  "Financement personnel",
  "Financement personnel, complété par mes droits CPF",
  "Financement personnel (paiement échelonné en trois fois convenu avec l'organisme)",
  "Financement personnel, sans dispositif complémentaire mobilisé à ce jour",
];

const BESOINS_ATTENTES_ENT = [
  "Nous attendons {un} {collab} capable de traiter seul{e} un remplacement de pare-brise collé, calibrage compris, sans supervision du chef d'atelier.",
  "Notre attente est que notre {collab} maîtrise la décision réparation/remplacement et la justifie auprès de l'assureur, afin de réduire nos litiges de prise en charge.",
  "Nous souhaitons fiabiliser la qualité de nos poses : moins de reprises pour infiltration ou bruit d'air, et un respect strict des temps de séchage.",
  "L'objectif est d'avoir en interne {un} opérateur{e} certifié{e} pour conserver notre référencement auprès des compagnies d'assurance.",
  "Nous attendons une réduction du temps d'immobilisation des véhicules, aujourd'hui pénalisant pour notre planning atelier.",
];

const BESOINS_MISSIONS_ENT = [
  "Réception du véhicule, diagnostic de réparabilité, remplacement des vitrages collés et non collés, calibrage des systèmes d'aide à la conduite et restitution au client.",
  "Aujourd'hui limité aux vitres latérales et à la pose d'accessoires ; à l'issue de la formation, prise en charge complète des pare-brise collés sur véhicules ADAS.",
  "Interventions en atelier et en mobile chez le client : réparation d'impacts par injection de résine, remplacement de pare-brise, gestion des consommables et des déchets.",
  "Accueil client, établissement du devis, déclaration auprès de l'assureur, intervention technique puis contrôle qualité avant restitution.",
];

const BESOINS_CONTRIBUTION_ENT = [
  "Disposer d'un second opérateur qualifié nous permet d'absorber les pics d'activité sans sous-traiter et de tenir nos délais de restitution.",
  "La certification est exigée par nos partenaires assureurs : elle conditionne directement le maintien de notre volume d'affaires.",
  "Réduire les reprises après pose représente une économie directe et préserve notre réputation locale, qui repose sur le bouche-à-oreille.",
  "Le calibrage ADAS réalisé en interne évite la sous-traitance chez le concessionnaire, coûteuse et génératrice de délais.",
];

/** Réponses d'évaluation des besoins propres au CQP vitrage, différentes pour chaque stagiaire. */
export function getVitrageEvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = vitrageSeed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  // Si l'index du stagiaire est connu, on l'utilise : chacun des 53 stagiaires
  // reçoit alors une réponse différente (pas de doublon dans le groupe).
  const base = typeof idx === "number" && idx >= 0 ? idx : seed;
  const pick = (arr: string[], off: number) => accorder(arr[(base + off) % arr.length], fem);
  const ent = (txt: string) =>
    accorder(
      txt.replace(/\{un\}/g, fem ? "une" : "un").replace(/\{collab\}/g, fem ? "collaboratrice" : "collaborateur"),
      fem,
    );
  const civilite = s.civilite === "Mme" ? "Madame" : s.civilite === "M." ? "Monsieur" : (s.civilite || "Monsieur");
  return {
    civilite,
    raisonSociale: hasEntreprise ? (s.entreprise as string) : "/",
    attentes: ent(BESOINS_ATTENTES_ENT[(base + 3) % BESOINS_ATTENTES_ENT.length]),
    missions: ent(BESOINS_MISSIONS_ENT[(base + 5) % BESOINS_MISSIONS_ENT.length]),
    contribution: ent(BESOINS_CONTRIBUTION_ENT[(base + 11) % BESOINS_CONTRIBUTION_ENT.length]),
    diplome: pick(BESOINS_DIPLOMES, 0),
    objectif: pick(BESOINS_OBJECTIFS, 7),
    budget: hasEntreprise
      ? "Formation prise en charge par l'OPCO de l'entreprise au titre du plan de développement des compétences."
      : BESOINS_BUDGET_PERSO[(base + 1) % BESOINS_BUDGET_PERSO.length],
    projetPro: pick(BESOINS_PROJET, 19),
    handicap: pick(BESOINS_HANDICAP, 31),
    disponibilites: pick(BESOINS_DISPO, 43),
  };
}
