// ---------------------------------------------------------------------------
// Techniques de prothésie ongulaire (RS7302) — moteur de réponses HUMANISÉES
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire (10, 30 ou 60) reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins (diplôme, objectif, projet, handicap, disponibilités…)
//   • test de positionnement de DÉBUT (10 questions ouvertes)
//   • test de positionnement de FIN (10 questions ouvertes)
//   • exercices pratiques (copie du stagiaire)
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// ---------------------------------------------------------------------------

export function isOngulaireFormation(intitule?: string, code?: string): boolean {
  const t = (intitule || "").toLowerCase();
  const c = (code || "").toUpperCase().replace(/\s/g, "");
  if (c === "RS7302") return true;
  return (
    t.includes("prothésie ongulaire") ||
    t.includes("prothesie ongulaire") ||
    t.includes("rs7302") ||
    t.includes("prothésiste ongulaire") ||
    t.includes("prothesiste ongulaire")
  );
}

const normalize = (s: string) =>
  (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toUpperCase();

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function ongulaireSeed(nom?: string, prenom?: string): number {
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

/** {e} → e au féminin ; {le} → le ; {/ve} → ve ; {/se} → se */
function accorder(txt: string, fem: boolean): string {
  return txt
    .replace(/\{\/ve\}/g, fem ? "ve" : "")
    .replace(/\{\/se\}/g, fem ? "se" : "")
    .replace(/\{le\}/g, fem ? "le" : "")
    .replace(/\{e\}/g, fem ? "e" : "");
}

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 6 variantes
// ---------------------------------------------------------------------------
const DEBUT: string[][] = [
  // Q1 — anatomie de l'ongle
  [
    "Je connais juste le mot « cuticule ». La matrice et le lit de l'ongle, je ne saurais pas les situer sur un doigt.",
    "Je sais qu'il y a une partie blanche à la base, la lunule je crois, mais je ne sais pas à quoi elle sert exactement.",
    "Je dirais qu'il y a l'ongle, la peau autour et la racine. C'est tout ce que je peux dire honnêtement.",
    "En institut on parle surtout de la tablette et du bord libre. La matrice, on ne me l'a jamais expliquée.",
    "Je pense que l'ongle pousse depuis la base, mais je ne savais pas qu'on pouvait l'abîmer définitivement à cet endroit.",
    "Aucune notion d'anatomie. J'ai appris à poser en regardant des vidéos, pas à comprendre comment l'ongle est fait.",
  ],
  // Q2 — pousse et fréquence de remplissage
  [
    "Je n'ai aucune idée de la vitesse de pousse. On m'a dit de revenir toutes les trois semaines, sans m'expliquer pourquoi.",
    "Je dirais un centimètre par mois, mais ce n'est vraiment qu'une impression.",
    "Je sais que ça repousse et qu'il faut refaire, par contre le lien avec le remplissage je ne l'avais pas fait.",
    "Chez moi je laisse jusqu'à deux mois, du coup je crois que je fais mal.",
    "Je pense que ça dépend des personnes. Je n'ai jamais entendu parler d'un chiffre précis.",
    "Je ne sais pas. C'est justement une des questions que je voulais poser en formation.",
  ],
  // Q3 — contre-indications
  [
    "Je ne saurais pas dire quand il faut refuser. Si l'ongle est moche, je pensais justement qu'on posait pour le cacher.",
    "Je devine qu'une plaie, ça empêche. Mais une mycose, je ne sais même pas la reconnaître.",
    "On m'a parlé des ongles jaunes sans plus d'explication. Je ne sais pas ce que ça veut dire pour la pose.",
    "J'aurais tendance à poser quand même, en faisant attention. Je comprends là que ce n'est pas la bonne réponse.",
    "Je connais le mot mycose mais je serais incapable de faire la différence avec un ongle simplement taché.",
    "Je n'ai jamais refusé une cliente. Je ne saurais pas comment lui dire non sans la vexer.",
  ],
  // Q4 — cuticules
  [
    "Je les coupe, comme j'ai vu faire à la maison. Je découvre que ce n'est pas ce qu'il faut faire.",
    "Je les repousse au bâtonnet mais sans savoir jusqu'où aller.",
    "Je les ramollis avec un produit et je les enlève avec une pince. J'imagine que ce n'est pas très professionnel.",
    "Je n'y touche pas trop, j'ai peur de faire mal. Du coup ma pose déborde souvent dessus.",
    "Je sais qu'il faut les repousser, mais le ptérygion je n'avais jamais entendu ce mot.",
    "Je n'ai jamais préparé un ongle correctement, je posais directement le vernis.",
  ],
  // Q5 — matification / préparation
  [
    "Je passais un coup de lime rapide sur le dessus, sans vraiment savoir pourquoi.",
    "Je ne matifie pas partout, surtout au milieu. C'est peut-être pour ça que ça se décolle sur les côtés.",
    "Je pensais que le primer suffisait pour que ça tienne, sans limer.",
    "Je lime beaucoup, parfois l'ongle devient sensible. Je sens que je fais trop.",
    "Je ne connaissais pas le mot matifier. Je devine que c'est enlever la brillance.",
    "Je dépoussière avec un souffle, je ne savais pas qu'il fallait une brosse et un cleaner.",
  ],
  // Q6 — capsule / chablon
  [
    "J'ai déjà collé des capsules du commerce mais jamais avec une vraie méthode de taille.",
    "Le chablon, je ne sais même pas à quoi ça ressemble. Je n'ai vu que des capsules.",
    "Je prends la capsule qui rentre, quitte à ce qu'elle appuie un peu sur les côtés.",
    "Je n'ai jamais fait d'extension du tout, uniquement du semi-permanent sur ongle naturel.",
    "J'ai essayé le chablon une fois, ça partait vers le haut et je ne comprenais pas pourquoi.",
    "Je pensais que capsule et chablon c'était la même chose sous deux noms différents.",
  ],
  // Q7 — apex
  [
    "Le mot apex ne me dit rien du tout.",
    "Je crois que c'est le bombé au milieu, mais je ne saurais pas dire où le placer.",
    "Je mets le gel le plus épais vers le bout, je pense que c'est ça qui casse chez mes clientes.",
    "J'ai déjà entendu parler d'apex sur les réseaux, sans jamais comprendre la logique.",
    "Pour moi tant que l'ongle est joli, l'épaisseur n'a pas d'importance. Je vois que c'est faux.",
    "Je ne contrôle jamais de profil, je regarde seulement de dessus.",
  ],
  // Q8 — hygiène et stérilisation
  [
    "Je nettoie mes outils à l'alcool entre deux personnes, je pensais que ça suffisait.",
    "J'ai entendu parler de l'autoclave sans savoir ce que c'est vraiment.",
    "Je réutilise mes limes pour tout le monde, je comprends que c'est un problème.",
    "Je désinfecte la table, mais pas la lampe ni la ponceuse.",
    "Je me lave les mains, oui, mais pas selon un protocole précis avec un temps.",
    "Je ne mets pas de masque, je ne savais pas que les poussières posaient un problème.",
  ],
  // Q9 — risque allergique / sécurité
  [
    "Je ne savais pas qu'on pouvait devenir allergique. Ça m'inquiète un peu de l'apprendre.",
    "Je touche le gel avec les doigts pour l'étaler, je vois que c'est exactement ce qu'il ne faut pas faire.",
    "Je travaille sans gants et sans ventilation particulière chez moi.",
    "Je pensais que le risque venait des odeurs, pas du contact avec la peau.",
    "J'ai déjà eu des rougeurs au bout des doigts, je n'avais pas fait le lien.",
    "Aucune notion sur ce sujet, je découvre complètement.",
  ],
  // Q10 — accueil, conseils et prix
  [
    "Je ne fais pas de fiche cliente. Je discute et je pose, c'est tout.",
    "J'annonce le prix à la fin, ce qui crée parfois des tensions. Je sais que je devrais le dire avant.",
    "Je ne donne aucun conseil après la pose, je ne savais pas quoi dire exactement.",
    "Je pose des questions mais sans trame, du coup j'oublie souvent quelque chose d'important.",
    "Je n'ai jamais accueilli de cliente en situation de handicap, je ne saurais pas m'adapter.",
    "Je ne parle pas du remplissage, et après mes clientes arrachent leur gel toutes seules.",
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 6 variantes
// ---------------------------------------------------------------------------
const FIN: string[][] = [
  [
    "Je situe maintenant la matrice sous le repli à la base, la lunule qui en est la partie visible, le lit vascularisé sous la tablette, les replis latéraux et les cuticules qui font barrière contre les infections. Je sais que toute agression de la matrice est irréversible.",
    "L'ongle est une production de kératine dure fabriquée par la matrice. Je ne lime jamais dans cette zone et j'adapte ma préparation à l'épaisseur réelle de la tablette.",
    "Je connais les repères : matrice, lunule, lit, tablette, bord libre, replis et cuticules. Ça m'a changé la façon de travailler, je comprends enfin ce que je touche.",
    "Je sais que la cuticule est une barrière naturelle : on la repousse, on ne la coupe pas, sinon on ouvre une porte aux infections.",
    "La matrice fabrique l'ongle, le lit le nourrit. C'est ce qui explique pourquoi une mauvaise pose se voit trois mois plus tard.",
    "Je suis maintenant capable de montrer chaque partie sur la main de la cliente et de lui expliquer pourquoi je fais tel ou tel geste.",
  ],
  [
    "La pousse est d'environ 3 mm par mois à la main, deux fois moins au pied : c'est ce qui impose un remplissage toutes les 3 à 4 semaines.",
    "3 mm par mois environ. Au-delà de quatre semaines, l'apex se retrouve décalé et l'ongle casse à la zone de stress.",
    "J'ai retenu les 3 mm mensuels et surtout la conséquence : je programme le rendez-vous de remplissage dès la fin de la pose.",
    "Environ 3 mm par mois. Je l'explique à la cliente pour qu'elle comprenne que le remplissage n'est pas une vente forcée.",
    "3 mm à la main, moitié moins au pied. Je décale à trois semaines pour les métiers très manuels ou les lavages fréquents.",
    "Je connais le chiffre et je m'en sers pour bâtir mon planning de rappels clientes.",
  ],
  [
    "Pose interdite : mycose, onycholyse, périonyxis ou panaris, allergie connue aux acrylates, plaie ouverte. À reporter ou avis médical : psoriasis unguéal, lichen, verrue, ongle très fin ou traumatisé. Je ne pose jamais de diagnostic, j'oriente.",
    "Je repère un ongle épaissi, jauni, friable ou décollé et je refuse la pose en expliquant la conséquence : enfermer l'humidité aggrave la situation.",
    "Je contrôle les dix doigts avant de commencer. Un seul critère bloquant suffit à reporter la pose sur ce doigt-là, et je le note sur la fiche.",
    "J'ai appris à formuler le refus : je montre, je nomme ce que je vois, j'explique et je propose une suite avec un rendez-vous.",
    "Mycose, décollement, inflammation : trois interdictions absolues. Dans le doute, je reporte et j'oriente vers un médecin.",
    "Je sais faire la différence entre une simple tache et une pathologie, et je trace toujours ma décision par écrit.",
  ],
  [
    "Je repousse les cuticules après les avoir ramollies, je retire le ptérygion adhérent avec un embout adapté à vitesse maîtrisée, sans jamais couper ni entamer la matrice.",
    "On ne coupe jamais les cuticules : c'est la barrière contre les infections. On les repousse, et on nettoie la peau morte adhérente.",
    "Repoussage puis retrait du ptérygion, en surveillant le confort de la cliente et sans agresser la base de l'ongle.",
    "J'ai corrigé ma mauvaise habitude : plus de pince à cuticules, uniquement le repousse-cuticules et un embout doux.",
    "Cuticules ramollies, repoussées, ptérygion retiré : c'est cette étape qui évite les décollements à la base.",
    "Je contrôle le résultat au toucher et à la vue avant de passer à la matification, contour net et sans peau qui remonte.",
  ],
  [
    "Je matifie toute la surface jusqu'à disparition complète de la brillance, y compris le long des replis, puis je dépoussière à la brosse et je déshydrate au cleaner.",
    "Chaque zone restée brillante devient un décollement. Je vérifie donc à la lumière avant de poser la base.",
    "Bord libre limé dans un seul sens, surface matifiée au buffer 180/240, dépoussiérage soigné, cleaner. Rien de plus, rien de moins.",
    "J'ai appris à doser : matifier suffit, amincir la tablette la fragilise et rend la cliente sensible.",
    "Matification complète, y compris les côtés et la base, puis déshydratation. Depuis, je n'ai plus de soulèvement latéral.",
    "Je contrôle systématiquement l'absence de poussière et de trace grasse avant d'appliquer le primer.",
  ],
  [
    "Capsule : taille couvrant d'un repli à l'autre sans les chevaucher, colle en petite quantité, pose droite dans l'axe, bascule pour chasser les bulles, découpe puis fondu du raccord. Chablon : ajusté sous le bord libre sans espace, alignement contrôlé de profil et de dessus.",
    "Je choisis le chablon quand je veux une base fine et une architecture sur mesure, la capsule quand la cliente veut aller vite ou que l'ongle est très court et plat.",
    "Le contrôle d'alignement se fait avant de construire : vu de dessus la ligne centrale est dans l'axe, vu de profil elle prolonge le bord libre.",
    "Je sais désormais pourquoi mes chablons partaient vers le haut : ils n'étaient pas plaqués sous le bord libre.",
    "Capsule trop étroite, bulle d'air ou chevauchement des replis : trois défauts qui garantissent un décollement, je les contrôle à chaque doigt.",
    "Je maîtrise les deux techniques et je peux justifier mon choix devant la cliente selon l'état de ses ongles.",
  ],
  [
    "L'apex est le point le plus épais, situé à la zone de stress, centré dans l'axe. De profil, la courbe est continue ; de dessus, la ligne centrale est droite et l'épaisseur symétrique.",
    "Un apex mal placé, trop proche de la cuticule, provoque la casse. Je contrôle systématiquement de profil avant la finition.",
    "Je construis en une ou deux gouttes travaillées à la spatule, je laisse le produit s'auto-niveler, puis je vérifie ma courbe à hauteur d'œil.",
    "J'ai compris que la solidité venait de l'architecture, pas de l'épaisseur générale : un ongle épais partout est lourd et casse quand même.",
    "Apex régulier, aucun contact avec les cuticules, aucun débordement latéral : ce sont mes trois points de contrôle.",
    "Je sais corriger un apex raté au limage plutôt que de rajouter du produit par-dessus.",
  ],
  [
    "Avant : nettoyage puis désinfection du poste, de la lampe et de la ponceuse avec un produit bactéricide, fongicide et virucide aux normes NF ; lavage des mains 1 minute au savon antiseptique puis 30 secondes de gel hydroalcoolique ; masque et gants ; désinfection des mains de la cliente. Après : usage unique jeté, outils stérilisés à l'autoclave ou au bac à ultrasons, poste nettoyé.",
    "Les limes carton et les buffers sont à usage unique par cliente, les embouts de ponceuse sont stérilisés entre chaque personne. C'est non négociable.",
    "J'ai mis en place une check-list de désinfection avant et après, et je vérifie les dates de péremption des produits en début de journée.",
    "La désinfection n'est pas la stérilisation : l'alcool ne remplace pas l'autoclave, je l'ai bien intégré.",
    "Protocole complet appliqué, avec traçabilité : je note les produits utilisés et je conserve les outils stérilisés en pochette fermée.",
    "Je sais expliquer mon protocole à une cliente qui me le demande, c'est devenu un argument de confiance.",
  ],
  [
    "Les gels contiennent des (méth)acrylates, sensibilisants cutanés : une allergie acquise est définitive. Je ne mets jamais le produit en contact avec la peau, je ventile, j'aspire les poussières et je respecte les temps de catalyse.",
    "Un gel sous-catalysé reste allergène : je respecte les 60 secondes pour la base et les 2 × 60 secondes pour la finition.",
    "Masque, gants nitrile, aspiration, ventilation, retrait immédiat de tout débordement avant catalyse : c'est ma routine désormais.",
    "J'ai aussi retenu l'ergonomie : dos droit, avant-bras en appui, éclairage sans ombre. C'est ma carrière sur dix ans qui est en jeu.",
    "Je lis les fiches de données de sécurité et je vérifie la conformité cosmétique des produits (INCI, lot, péremption, responsable de mise sur le marché).",
    "Je ne touche plus jamais le gel non polymérisé à mains nues, c'était mon principal mauvais réflexe.",
  ],
  [
    "Je conduis un accueil structuré : questionnement sur les habitudes, les attentes et le mode de vie, examen des dix ongles, validation de la faisabilité, fiche diagnostique, annonce des étapes et du prix avant de commencer.",
    "En fin de prestation, huile à cuticules, modelage hydratant, puis conseils écrits : gants pour le ménage, huile quotidienne, ne pas arracher le gel, revenir en cas de douleur, remplissage à 3-4 semaines, jamais de dépose maison.",
    "J'adapte le poste à une personne en situation de handicap en décidant l'aménagement avec elle : hauteur de table, annonce des gestes, prestation fractionnée, ventilation renforcée.",
    "Je remplis systématiquement la fiche diagnostique et je remets une fiche de conseils. Cela a supprimé les litiges sur le prix et la tenue.",
    "Je sais annoncer un refus argumenté sans braquer la cliente, et proposer immédiatement une alternative ou un rendez-vous.",
    "Je pars du coût réel pour tarifer, j'annonce le prix de la pose et du remplissage dès le début, et je fixe le rendez-vous suivant avant que la cliente ne parte.",
  ],
];

// ---------------------------------------------------------------------------
// Réponses ouvertes automatiques (tout stagiaire de la formation RS7302)
// ---------------------------------------------------------------------------
export function getOngulaireAutoAnswers(
  nom: string | undefined,
  prenom: string | undefined,
  civilite: string | undefined,
  isDebut: boolean,
  nbQuestions = 10,
): { reponses: string[]; scores: number[] } {
  const seed = ongulaireSeed(nom, prenom);
  const fem = isFeminin(civilite, prenom);
  const bank = isDebut ? DEBUT : FIN;

  const reponses: string[] = [];
  const scores: number[] = [];
  for (let q = 0; q < nbQuestions; q++) {
    const pool = bank[q % bank.length];
    const idx = (seed + q * 7 + Math.floor(seed / (q + 3))) % pool.length;
    reponses.push(accorder(pool[idx], fem));
    if (isDebut) {
      const r = (seed + q * 11) % 10;
      scores.push(r < 5 ? 0 : r < 8 ? 0.5 : 1);
    } else {
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
  "Apprendre à poser du gel de A à Z, parce que je pars vraiment de zéro.",
  "Réussir enfin un apex correct : mes poses cassent toujours au même endroit.",
  "Savoir reconnaître une mycose et oser refuser une pose sans vexer la cliente.",
  "Maîtriser un vrai protocole d'hygiène et de stérilisation, pas juste un coup d'alcool.",
  "Arrêter les décollements à la base : je pense que je prépare mal l'ongle.",
  "Apprendre le chablon, je ne connais que la capsule et ça me limite.",
  "Faire un semi-permanent sans traces et une French symétrique sur les dix doigts.",
  "Maîtriser le remplissage dans le bon ordre, aujourd'hui j'improvise.",
  "Gagner en rapidité : je mets trois heures pour une pose complète.",
  "Ajouter la prestation ongles à mon institut pour ne plus refuser ces demandes.",
  "Me mettre à mon compte comme prothésiste ongulaire après ma reconversion.",
  "Comprendre l'anatomie de l'ongle pour arrêter de travailler à l'aveugle.",
  "Me protéger du risque d'allergie aux résines, j'ai déjà des rougeurs aux doigts.",
  "Savoir conduire un vrai accueil avec fiche diagnostique et annonce du prix.",
  "Apprendre le nail art et les effets pour élargir ma carte de prestations.",
  "Structurer mes gestes : je fais tout d'instinct depuis les vidéos internet.",
  "Passer la certification pour être reconnu{e} officiellement dans mon salon.",
  "Savoir adapter la prestation à une cliente en situation de handicap.",
  "Corriger ma posture, j'ai mal au dos après deux clientes.",
  "Apprendre la dépose propre : aujourd'hui mes clientes arrachent leur gel elles-mêmes.",
];

export function getOngulaireBesoin(nom?: string, prenom?: string, civilite?: string): string {
  const seed = ongulaireSeed(nom, prenom);
  const fem = isFeminin(civilite, prenom);
  return accorder(BESOINS_VARIANTES[seed % BESOINS_VARIANTES.length], fem);
}

// ---------------------------------------------------------------------------
// Exercices pratiques — production écrite du stagiaire, différente à chaque fois
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // Bloc 0 — accueil, diagnostic, contre-indications, conseils
  [
    "J'ai commencé par installer ma cliente et lui proposer de se laver les mains. Je lui ai demandé si elle avait déjà porté du gel, ce qu'elle attendait comme forme et comme longueur, et si son métier était manuel. Elle travaille en cuisine : je lui ai proposé une longueur courte en forme carrée arrondie. J'ai examiné les dix ongles à la lumière, relevé des cuticules épaisses et une petite fissure à l'index gauche, et j'ai tout noté sur la fiche diagnostique avant d'annoncer la durée et le prix.",
    "Mon questionnement a suivi la trame : habitudes, attentes, mode de vie, antécédents. Ma cliente m'a signalé des décollements systématiques au bout de dix jours chez sa précédente prothésiste. En examinant, j'ai vu que la brillance restait présente le long des replis : le problème venait d'une matification incomplète. Je le lui ai expliqué simplement et j'ai annoncé le déroulé, la durée de deux heures et le prix de la pose et du remplissage.",
    "J'ai repéré une rougeur avec léger gonflement autour de l'auriculaire droit. J'ai considéré qu'il s'agissait d'une inflammation débutante et j'ai refusé la pose sur ce doigt. Je lui ai dit : « Là, la peau est irritée. Si je pose, j'enferme l'inflammation et je risque d'aggraver. Je fais les neuf autres et je reprends celui-ci quand ce sera calmé. » Elle a très bien compris et j'ai noté la décision sur la fiche.",
    "La cliente demandait une longueur stiletto sur des ongles très fins et rongés. J'ai expliqué que le support ne le permettait pas aujourd'hui, et j'ai proposé une longueur moyenne en amande avec une reconstruction progressive sur deux ou trois poses. Elle a accepté. J'ai noté l'objectif à trois mois sur la fiche pour assurer le suivi.",
    "J'ai conduit l'accueil avec une cliente malentendante. Je me suis placée face à elle, en lumière, j'ai parlé lentement et j'ai complété par des photos pour le choix de la forme et de la couleur. J'ai écrit les points importants, notamment le prix et la date de remplissage. L'adaptation s'est décidée avec elle, pas à sa place.",
    "Après examen, j'ai constaté un ongle jauni, épaissi et friable au gros orteil signalé par la cliente. J'ai refusé la pose sur ce doigt et je l'ai orientée vers un médecin en précisant que je ne pose pas de diagnostic mais que ce type d'aspect nécessite un avis. Je lui ai proposé de la reprendre sur présentation d'un feu vert médical, et j'ai réalisé la prestation sur les mains.",
  ],
  // Bloc 1 — hygiène, sécurité, poste de travail
  [
    "Avant l'arrivée de la cliente, j'ai nettoyé puis désinfecté le plan de travail, la lampe LED, la ponceuse et le repose-main avec un produit bactéricide, fongicide et virucide. J'ai aligné mes produits dans l'ordre d'utilisation, vérifié les dates de péremption et l'état des embouts. Je me suis lavé les mains une minute au savon antiseptique puis trente secondes au gel hydroalcoolique, j'ai mis mon masque et mes gants, et j'ai désinfecté les mains de la cliente.",
    "J'ai monté mon poste en respectant l'ergonomie : assise réglée, dos droit, avant-bras en appui, éclairage sans ombre portée, aspiration en marche. J'ai constaté qu'un embout de ponceuse était usé et je l'ai écarté. Après la prestation, j'ai jeté les consommables à usage unique, stérilisé les outils métalliques au bac à ultrasons puis en autoclave, et rangé le tout en pochette fermée.",
    "J'ai listé les risques de mon poste : contact cutané avec les acrylates, inhalation de poussières de limage, coupure, posture prolongée. J'ai adapté : gants nitrile, masque, aspiration directe, aucun contact avec le gel non polymérisé, retrait immédiat de tout débordement avant catalyse, pauses de mobilisation entre deux clientes.",
    "J'ai vérifié la conformité cosmétique de mes produits : étiquetage, liste INCI, numéro de lot, date de durabilité et responsable de mise sur le marché identifié. Deux flacons étaient périmés, je les ai retirés. J'ai consulté les fiches de données de sécurité du primer et du cleaner avant de les utiliser.",
    "Après la prestation, j'ai nettoyé le périmètre complet : sol, poubelle fermée, plan de travail, lampe. Les limes carton et les buffers ont été jetés, ils sont à usage unique par cliente. Les embouts de ponceuse et les outils métalliques ont été stérilisés. J'ai tracé les produits utilisés sur la fiche cliente.",
    "J'ai expliqué mon protocole à la cliente qui me questionnait sur l'hygiène. Je lui ai montré la pochette stérile ouverte devant elle, la lime neuve et le désinfectant utilisé. Ce moment a rassuré la cliente et je le referai systématiquement : l'hygiène est aussi un argument professionnel.",
  ],
  // Bloc 2 — préparation de l'ongle et extension
  [
    "J'ai ramolli puis repoussé les cuticules au bâtonnet, retiré le ptérygion à la ponceuse avec un embout boule sécurité à vitesse réduite, sans jamais approcher la matrice. J'ai raccourci le bord libre à la lime 180 en un seul sens, matifié toute la surface au buffer jusqu'à disparition complète de la brillance, y compris le long des replis, puis dépoussiéré à la brosse et déshydraté au cleaner.",
    "Ma préparation a été contrôlée à la lumière : il restait deux zones brillantes à la base de l'annulaire et de l'auriculaire. Je suis repassée dessus avant de continuer, en sachant que ces zones auraient décollé sous quinze jours. La tablette n'a pas été amincie et la cliente n'a ressenti ni chaleur ni sensibilité.",
    "Pour les capsules, j'ai mesuré chaque doigt : la capsule doit couvrir d'un repli à l'autre sans les chevaucher. Sur le majeur, aucune taille ne convenait exactement, j'ai pris la taille au-dessus et limé les côtés. Colle en petite quantité, pose droite dans l'axe, appui au stop puis bascule pour chasser les bulles, découpe puis fondu du raccord.",
    "J'ai travaillé au chablon sur les dix doigts. J'ai ajusté la découpe à la courbure de chaque doigt, glissé le chablon sous le bord libre sans laisser d'espace, puis contrôlé deux fois : de dessus, la ligne centrale prolonge l'axe du doigt ; de profil, elle prolonge le bord libre sans plonger. J'ai repositionné deux chablons avant de construire.",
    "Sur ma modèle aux ongles rongés, la préparation a été plus délicate : peu de bord libre, replis très proches. J'ai choisi le chablon pour recréer une ligne, en veillant à ne pas comprimer la peau, et j'ai limité la longueur pour ne pas surcharger un support fragile.",
    "J'ai commis une erreur au début : une capsule posée légèrement de travers sur l'index. Je l'ai retirée et reposée plutôt que de compenser au limage, car un axe dévié se voit sur toute la main. Le formateur a validé la reprise, c'est ce réflexe que je veux garder.",
  ],
  // Bloc 3 — construction, décoration, remplissage
  [
    "J'ai appliqué le nail prep en fine couche, laissé sécher à l'air libre, puis le gel de base sans toucher les cuticules, catalysé 60 secondes. J'ai déposé le gel de construction en deux gouttes travaillées à la spatule, laissé le produit s'auto-niveler et formé l'apex à la zone de stress. Contrôle de profil : courbe continue sans marche ni creux. Limage de mise en forme, dépoussiérage, finition en couche moyenne, catalyse 2 × 60 secondes.",
    "Mon premier apex était trop proche de la cuticule. Je l'ai corrigé au limage plutôt qu'en rajoutant du produit, et j'ai refait le contrôle à hauteur d'œil. Le formateur a validé la reprise. J'ai retenu que la solidité vient de l'architecture et non de l'épaisseur générale.",
    "Pour le semi-permanent, j'ai travaillé en couches fines, deux passages, en capsulant systématiquement le bord libre. Aucune trace, aucun raclage, contours nets. Sur la seconde main, j'ai tracé la French au pinceau liner en veillant à aligner les deux pointes du sourire sur les replis latéraux, et j'ai contrôlé la symétrie doigt par doigt.",
    "J'ai réalisé un Babyboomer : dégradé estompé à l'éponge entre le blanc et la teinte naturelle, sans démarcation visible. J'ai dû reprendre le majeur où le blanc remontait trop haut. Sur l'annulaire, j'ai ajouté un décor 3D en veillant au relief et à la quantité de colle, puis j'ai capsulé pour la tenue.",
    "Pour le remplissage, j'ai énoncé les étapes dans l'ordre avant de commencer : désinfecter, préparer, limer, poncer, déposer l'ancienne couleur, préparer et reconstruire, remplir, catalyser, modeler et limer, nettoyer, finir. J'ai laissé une fine couche de gel sain sans remettre l'ongle naturel à nu, repoussé les cuticules et reconstruit un nouvel apex.",
    "J'ai rencontré un décollement de 3 mm à la base du pouce. Je l'ai limé jusqu'au gel parfaitement sain avant de reconstruire : recouvrir aurait emprisonné de l'humidité et provoqué une mycose. J'ai expliqué le geste à la cliente et je lui ai rappelé de revenir dès l'apparition d'un décollement plutôt que d'attendre le rendez-vous.",
  ],
];

export function pickOngulaireExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string },
  contexte?: string,
): string | null {
  if (!isOngulaireFormation(intitule, code)) return null;
  const seed = ongulaireSeed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);

  const t = (contexte || "").toLowerCase();
  let bloc: number;
  if (/accueil|diagnostic|cliente|contre-indication|conseil|refus|fiche/.test(t)) bloc = 0;
  else if (/hygi|stéril|steril|sécurité|securite|poste|désinfect|desinfect|epi/.test(t)) bloc = 1;
  else if (/préparation|preparation|cuticule|matif|capsule|chablon|extension|limage/.test(t)) bloc = 2;
  else if (/construction|apex|gel|décor|decor|french|babyboomer|remplissage|semi-permanent|finition/.test(t)) bloc = 3;
  else bloc = exerciceIdx % EXERCICES_PRODUCTIONS.length;

  const pool = EXERCICES_PRODUCTIONS[bloc];
  const idx = (seed + exerciceIdx * 5 + stagiaireIdx) % pool.length;
  return accorder(pool[idx], fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "CAP Esthétique-cosmétique-parfumerie obtenu en 2018",
  "Baccalauréat professionnel Esthétique-cosmétique-parfumerie, session 2020",
  "CAP Coiffure, puis quatre ans en salon avec prestations beauté des mains",
  "Brevet professionnel Esthétique-cosmétique-parfumerie obtenu en alternance",
  "Baccalauréat général, aucune formation initiale dans l'esthétique",
  "CAP Vente, reconversion après six ans en grande distribution",
  "Brevet des collèges, parcours entièrement construit par la pratique",
  "BTS Métiers de l'esthétique-cosmétique-parfumerie, option formation-marques",
  "CAP Petite enfance, reconversion vers l'esthétique après un congé parental",
  "Baccalauréat technologique ST2S, orientation récente vers les métiers de la beauté",
  "CAP Esthétique préparé en candidat libre en 2022",
  "Titre professionnel Conseiller de vente, expérience en parfumerie",
  "Baccalauréat professionnel Commerce, puis deux ans en institut comme assistante",
  "CAP Cuisine, reconversion complète vers un métier manuel de précision",
  "Diplôme d'esthétique obtenu à l'étranger, non équivalé en France",
  "CAP Esthétique et mention complémentaire Maquillage",
  "Licence de langues non achevée, reconversion assumée vers un métier manuel",
  "CAP Fleuriste, habitude du travail minutieux et du contact clientèle",
  "Baccalauréat professionnel Accompagnement soins et services à la personne",
  "Aucun diplôme : compétences acquises en autodidacte et sur les réseaux",
  "CAP Employé de pharmacie, sensibilité forte aux règles d'hygiène",
  "Titre professionnel Secrétaire assistante, reconversion vers l'esthétique",
  "Brevet de maîtrise Esthétique en cours de validation",
  "Baccalauréat professionnel Métiers de la mode, goût pour la création",
  "CAP Prothésiste dentaire, reconversion vers un travail de modelage plus créatif",
  "BTS Management commercial opérationnel, projet d'ouverture d'un bar à ongles",
  "CAP Esthétique obtenu en 2011, longue interruption d'activité",
  "Titre professionnel Agent de propreté, reconversion vers un métier de contact",
  "Baccalauréat professionnel Gestion-administration, activité ongles en complément",
  "CAP Boulangerie, reconversion pour raisons de santé vers un métier assis",
];

const BESOINS_OBJECTIFS = [
  "Mon objectif est de maîtriser l'ensemble des techniques de prothésie ongulaire pour proposer des poses complètes en toute autonomie et obtenir la certification RS7302.",
  "Je souhaite ajouter la prestation ongles à mon offre d'institut, aujourd'hui je refuse ces demandes et j'oriente mes clientes ailleurs.",
  "Mon objectif est de m'installer à mon compte comme prothésiste ongulaire à l'issue de la formation, avec une base technique solide et un protocole d'hygiène irréprochable.",
  "Je veux transformer une pratique apprise sur les réseaux sociaux en compétence structurée et certifiée, reconnue par les employeurs.",
  "Mon but est de réussir des extensions solides et durables, sans les casses et les décollements que je constate aujourd'hui.",
  "Je souhaite devenir polyvalente dans le salon où je travaille et prendre en charge les rendez-vous ongles du planning.",
  "Mon objectif est de me reconvertir complètement vers un métier manuel et créatif, avec une vraie qualification à la clé.",
  "Je veux sécuriser ma pratique sur le plan sanitaire : reconnaître les contre-indications et appliquer un protocole de stérilisation complet.",
  "Mon objectif est d'élargir ma carte de prestations avec le nail art et les techniques de décoration avancées.",
  "Je souhaite gagner en rapidité et en régularité pour rendre mon activité rentable sans sacrifier la qualité.",
  "Mon objectif est d'ouvrir un bar à ongles dans les dix-huit mois et de recruter ensuite une seconde prothésiste.",
  "Je veux obtenir la certification pour être reconnue officiellement dans mon poste et faire évoluer ma rémunération.",
  "Mon objectif est d'apprendre le chablon et la structure, techniques que je ne maîtrise pas du tout aujourd'hui.",
  "Je souhaite proposer une prestation complète à domicile, avec un poste mobile conforme aux règles d'hygiène.",
  "Mon objectif est de fidéliser ma clientèle par une prestation soignée et des conseils d'entretien pertinents.",
];

const BESOINS_PROJETS = [
  "Cette formation s'inscrit directement dans mon projet : elle me permettra de proposer une prestation ongulaire complète et facturable dès la fin du parcours.",
  "Elle me donnera la légitimité technique qui me manque aujourd'hui face à mes clientes, et la certification qui atteste de mon niveau.",
  "Elle est la condition de mon installation en micro-entreprise : sans maîtrise de l'hygiène et de la construction, je ne peux pas ouvrir sereinement.",
  "Elle me permettra de compléter mon activité d'esthéticienne par une prestation à forte demande et à bonne marge.",
  "Elle corrigera les mauvaises habitudes que j'ai prises seule, et c'est précisément ce que je viens chercher.",
  "Elle sécurisera ma pratique sur le plan sanitaire, ce qui est ma préoccupation première avant de recevoir des clientes.",
  "Elle me permettra de reprendre une activité professionnelle après plusieurs années d'interruption, dans un métier que j'ai choisi.",
  "Elle m'ouvrira les portes d'un poste en institut : les annonces demandent toutes une qualification en prothésie ongulaire.",
  "Elle me donnera la structure et le vocabulaire technique nécessaires pour former à mon tour mes futures collaboratrices.",
  "Elle m'apportera la maîtrise du remplissage et de la dépose, qui représentent la moitié de mon chiffre d'affaires potentiel.",
  "Elle valorisera mon expérience de terrain par une certification reconnue au Répertoire spécifique.",
  "Elle me permettra d'aligner ma pratique sur la réglementation cosmétique et les exigences d'hygiène d'un institut.",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je porte des lunettes de correction et j'apprécierais un poste bien éclairé pour le confort visuel lors du travail de précision.",
  "Non, aucune situation de handicap déclarée. Je souhaite simplement pouvoir me lever régulièrement, je supporte mal la position assise prolongée.",
  "Non. J'ai eu une tendinite au poignet il y a deux ans : un repose-poignet et des pauses régulières suffiront amplement.",
  "Non, pas de handicap. Je suis en revanche sensible aux odeurs fortes et je serais rassurée par une bonne ventilation de la salle.",
  "Non. Aucun aménagement nécessaire, je suis pleinement disponible pour la pratique quotidienne.",
  "Non, je ne suis pas en situation de handicap. Un poste réglable en hauteur me conviendrait mieux car je suis de petite taille.",
  "Non. Je précise seulement que je suis gauchère et que j'aurai besoin d'un poste adapté à cette latéralité.",
  "Non, aucune situation de handicap. J'ai néanmoins des douleurs cervicales et je serai attentive à l'ergonomie enseignée.",
  "Non, pas de handicap déclaré à ce jour. Je sais que je peux solliciter le référent handicap à tout moment si besoin.",
];

const BESOINS_DISPOS = [
  "Je suis pleinement disponible en journée, du lundi au vendredi, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. Ce rythme de 7 h/jour me convient parfaitement pour la pratique quotidienne sur modèle.",
  "Mes disponibilités sont totales en journée du lundi au vendredi (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). Je peux amener un modèle différent chaque jour de pratique.",
  "Je suis disponible en journée du lundi au vendredi, de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>. Je dépose mon enfant à l'école à 08h30, le démarrage à 09h00 est donc idéal pour moi.",
  "Disponible en journée du lundi au vendredi sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. Mon employeur a validé mon absence sur toute la durée de la session.",
  "Je suis disponible du lundi au vendredi en journée (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Je souhaite simplement pouvoir consulter mes messages professionnels pendant la pause déjeuner.",
  "Mes disponibilités me permettent de suivre l'intégralité de la formation en journée, du lundi au vendredi, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible en journée du lundi au vendredi (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). Je viens en transports en commun, un démarrage à 09h00 me laisse la marge nécessaire.",
  "Disponibilité complète en journée, du lundi au vendredi de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>. J'ai organisé la garde de mes enfants sur toute la durée du parcours.",
  "Je suis disponible du lundi au vendredi en journée sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. Je n'ai aucune demande d'aménagement horaire à formuler.",
  "Mes disponibilités couvrent l'ensemble de la session en journée, du lundi au vendredi (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). J'ai mis mon activité en pause pour me consacrer pleinement à la formation.",
];

// Réponses employeur (partie entreprise), du point de vue de l'employeur
const BESOINS_ATTENTES_ENT = [
  "Nous attendons {un} {collab} capable de réaliser une pose complète en autonomie, dans le respect strict de notre protocole d'hygiène.",
  "Notre attente est de pouvoir ouvrir des créneaux « ongles » sur le planning de l'institut sans dépendre d'une intervenante extérieure.",
  "Nous souhaitons que le/la salarié{e} maîtrise l'extension et le remplissage afin de fidéliser la clientèle sur un rendez-vous mensuel.",
  "Nous attendons une montée en qualité sur la tenue des poses : les retouches non facturées pèsent aujourd'hui sur notre rentabilité.",
  "Notre objectif est de disposer en interne d'une compétence certifiée, opposable en cas de contrôle et rassurante pour la clientèle.",
  "Nous attendons que la prestation ongulaire devienne un axe de développement du salon, avec une carte élargie (French, Babyboomer, nail art).",
  "Nous souhaitons sécuriser nos pratiques sanitaires : stérilisation, usage unique, conformité des produits cosmétiques.",
  "Notre attente est un gain de temps par prestation, sans perte de qualité, pour absorber la demande du samedi.",
];

const BESOINS_MISSIONS_ENT = [
  "Accueil de la clientèle, diagnostic de l'ongle, pose complète en gel, remplissage, dépose, décoration et conseils d'entretien.",
  "Réalisation des prestations ongulaires du planning, gestion du stock de produits et application du protocole d'hygiène du poste.",
  "Prestations de beauté des mains et des pieds, pose de semi-permanent et d'extensions, tenue de la fiche cliente.",
  "Prise de rendez-vous, réalisation des poses et des remplissages, encaissement et relance des clientes à trois semaines.",
  "Prestations ongulaires en institut, accompagnement des nouvelles recrues sur les gestes de base, entretien du matériel.",
  "Réalisation des prestations, mise en avant des créations sur les réseaux sociaux du salon et conseil produits.",
];

const BESOINS_CONTRIBUTION_ENT = [
  "Cette formation permettra à notre {collab} d'assurer seul{e} les rendez-vous ongulaires et de réduire notre dépendance à la sous-traitance.",
  "Elle sécurisera nos pratiques d'hygiène et limitera notre exposition au risque sanitaire et au litige client.",
  "Elle nous permettra d'élargir notre carte de prestations et d'augmenter le panier moyen par cliente.",
  "Elle réduira le taux de retouches gratuites, qui représente aujourd'hui une perte sèche de temps de fauteuil.",
  "Elle apportera une qualification certifiée à l'équipe, argument de confiance auprès de notre clientèle.",
  "Elle facilitera la fidélisation grâce au rendez-vous de remplissage régulier, structurant pour notre planning.",
];

/** Réponses d'évaluation des besoins propres à la formation RS7302, différentes pour chaque stagiaire. */
export function getOngulaireEvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = ongulaireSeed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = typeof idx === "number" && idx >= 0 ? idx : seed;
  const pick = (arr: string[], off: number) => accorder(arr[(base + off) % arr.length], fem);
  const ent = (txt: string) =>
    accorder(
      txt.replace(/\{un\}/g, fem ? "une" : "un").replace(/\{collab\}/g, fem ? "collaboratrice" : "collaborateur"),
      fem,
    );
  const civilite = s.civilite === "Mme" ? "Madame" : s.civilite === "M." ? "Monsieur" : (s.civilite || "Madame");

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
      : pick(
          [
            "Financement personnel, avec règlement échelonné en trois fois.",
            "Mobilisation de mon Compte personnel de formation (CPF) pour la totalité du coût.",
            "Financement personnel complété par un reste à charge après mobilisation du CPF.",
            "Dossier de financement déposé auprès de France Travail dans le cadre de mon projet de reconversion.",
            "Financement personnel : j'ai provisionné le coût de la formation sur les six derniers mois.",
          ],
          2,
        ),
    projetPro: pick(BESOINS_PROJETS, 13),
    handicap: pick(BESOINS_HANDICAP, 4),
    disponibilites: pick(BESOINS_DISPOS, 9),
  };
}
