// ---------------------------------------------------------------------------
// « Enseignement : fondamentaux du droit et des institutions » — moteur de réponses HUMANISÉES
// Formation professionnelle non certifiante : évaluation interne + attestation de fin de formation.
// 47 heures, 100 % à distance en classe virtuelle (Google Meet / Zoom), formateur unique.
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes de
//     l'entreprise…), puis parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes, dans l'ordre des 10 mises en situation, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par mise en situation + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Camille, Valmont-sur-Seine et Atelier Valmontais, cités dans les copies, sont des personnes et situations FICTIVES.
// ---------------------------------------------------------------------------

const normalize = (s?: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Enseignement : fondamentaux du droit et des institutions ».
 * Reconnue par son intitulé seulement : « fondamentaux du droit », « droit et des institutions »,
 * « droit et institutions » (accents, apostrophes et casse indifférents).
 * À tester AVANT les règles génériques (« droit », « enseignement »…).
 */
export function isDRI47Formation(intitule?: string, code?: string): boolean {
  void code;
  const t = normalize(intitule).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[^a-z0-9']+/g, " ").trim();
  return /\bfondamentaux du droit\b/.test(t) || /\bdroit et (des )?institutions\b/.test(t);
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function dri47Seed(nom?: string, prenom?: string): number {
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

/** {e} → e au féminin ; {le} → le ; {ne} → ne ; {/rice} → rice (sinon eur) */
function accorder(txt: string, fem: boolean): string {
  return txt
    .replace(/\{\/rice\}/g, fem ? "rice" : "eur")
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
  typeof idx === "number" && idx >= 0 ? idx : dri47Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// hiérarchie des normes, loi / règlement / entrée en vigueur, branches du droit, contrat et
// responsabilité, Président et Gouvernement, procédure législative et Conseil constitutionnel,
// collectivités territoriales, citoyenneté et libertés, droit européen, juridictions
// ---------------------------------------------------------------------------
export const DRI47_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Selon vous, d'où viennent les règles de droit et existe-t-il un ordre entre elles ?", reponseAttendue: "Repérage de quelques sources (Constitution, traités, loi, règlement, jurisprudence) et de l'idée d'une hiérarchie des normes : une norme inférieure doit respecter la norme supérieure ; place de la Constitution au sommet de l'ordre interne." },
    { question: "Qui fait les lois en France, et qui prend les décrets ?", reponseAttendue: "Le Parlement vote la loi dans les matières de l'article 34 ; le Gouvernement exerce le pouvoir réglementaire (article 37) par décrets ; idée de publication au Journal officiel et d'entrée en vigueur ; la loi ne dispose que pour l'avenir." },
    { question: "Connaissez-vous la différence entre le droit public et le droit privé ? Pouvez-vous donner un exemple de chacun ?", reponseAttendue: "Droit public : organisation de l'État et relations avec l'administration (droit constitutionnel, administratif, fiscal) ; droit privé : relations entre particuliers ou entreprises (droit civil, commercial, du travail) ; place particulière du droit pénal." },
    { question: "Qu'est-ce qu'un contrat et que se passe-t-il si vous causez un dommage à quelqu'un ?", reponseAttendue: "Accord de volontés qui crée des obligations, conditions de validité (consentement, capacité, contenu licite et certain), force obligatoire ; responsabilité civile : obligation de réparer le dommage causé par sa faute (article 1240 du Code civil)." },
    { question: "Quel est, selon vous, le rôle du Président de la République et celui du Premier ministre ?", reponseAttendue: "Président élu au suffrage universel direct pour cinq ans, garant des institutions, nomme le Premier ministre, peut dissoudre l'Assemblée nationale ; Gouvernement qui détermine et conduit la politique de la Nation, responsable devant l'Assemblée nationale ; notion de cohabitation." },
    { question: "Comment une loi est-elle votée, et qui vérifie qu'elle respecte la Constitution ?", reponseAttendue: "Dépôt, examen par l'Assemblée nationale et le Sénat, navette, commission mixte paritaire, dernier mot de l'Assemblée nationale, promulgation ; contrôle par le Conseil constitutionnel avant promulgation et par la question prioritaire de constitutionnalité après." },
    { question: "Que savez-vous du rôle de la commune, du département, de la région et du préfet ?", reponseAttendue: "Collectivités territoriales administrées par des conseils élus, compétences propres, décentralisation ; préfet représentant de l'État dans le département, contrôle de légalité des actes des collectivités (déconcentration)." },
    { question: "Quels droits vous donne votre qualité de citoyen et comment les libertés sont-elles protégées ?", reponseAttendue: "Droit de vote, éligibilité, citoyenneté européenne ; libertés fondamentales (DDHC, Convention européenne des droits de l'homme), laïcité ; juges et autorités de protection : juge administratif et référé-liberté, juge judiciaire, Défenseur des droits." },
    { question: "Selon vous, le droit européen s'impose-t-il à la loi française ? Quelle différence faites-vous entre l'Union européenne et le Conseil de l'Europe ?", reponseAttendue: "Primauté du droit de l'Union et effet direct, article 55 de la Constitution ; règlement directement applicable, directive à transposer ; Union européenne à 27 États distincte du Conseil de l'Europe à 46 États, dont relève la Cour européenne des droits de l'homme." },
    { question: "Si vous aviez un litige avec votre employeur, votre bailleur ou la mairie, vers quel tribunal vous tourneriez-vous ?", reponseAttendue: "Dualité des ordres : ordre judiciaire (conseil de prud'hommes, tribunal judiciaire, juridictions pénales, cour d'appel, Cour de cassation) et ordre administratif (tribunal administratif, cour administrative d'appel, Conseil d'État) ; voies de recours ; Tribunal des conflits ; aide juridictionnelle." },
  ],
  fin: [
    { question: "Comment situez-vous désormais un texte dans la hiérarchie des normes ?", reponseAttendue: "Bloc de constitutionnalité (Constitution, DDHC, Préambule de 1946, Charte de l'environnement, principes fondamentaux reconnus par les lois de la République), traités et droit de l'Union (article 55), loi, règlements, actes administratifs ; contrôle de constitutionnalité et de conventionnalité." },
    { question: "Comment distinguez-vous le domaine de la loi et celui du règlement, et comment vérifiez-vous qu'un texte est en vigueur ?", reponseAttendue: "Articles 34 et 37, ordonnances de l'article 38 ; publication au Journal officiel, entrée en vigueur à la date fixée ou le lendemain de la publication (article 1er du Code civil) ; non-rétroactivité (article 2 du Code civil, article 8 de la DDHC en matière pénale) ; vérification sur Légifrance." },
    { question: "Comment qualifiez-vous une situation et la rattachez-vous à une branche du droit ?", reponseAttendue: "Identification des personnes en présence (personne publique ou privée), de l'objet du litige et de la règle applicable ; droit public (constitutionnel, administratif, finances publiques, fiscal), droit privé (civil, commercial, travail), droit pénal mixte, droit de l'Union et droit international." },
    { question: "Quelles règles appliquez-vous à la formation d'un contrat et à la réparation d'un dommage ?", reponseAttendue: "Conditions de validité (article 1128 : consentement, capacité, contenu licite et certain), force obligatoire (article 1103), capacité des mineurs et majeurs protégés ; responsabilité civile (article 1240 : fait générateur, dommage, lien de causalité) ; charge de la preuve (article 1353)." },
    { question: "Comment s'organisent les rapports entre le Président de la République, le Gouvernement et le Parlement ?", reponseAttendue: "Président élu au suffrage universel direct, quinquennat, deux mandats consécutifs au plus, nomination du Premier ministre (article 8), dissolution (article 12), référendum (article 11), pouvoirs exceptionnels (article 16), contreseing (article 19) ; Gouvernement responsable devant l'Assemblée nationale (article 49) ; cohabitation." },
    { question: "Comment décririez-vous la procédure législative et le contrôle de constitutionnalité ?", reponseAttendue: "Navette, commission mixte paritaire, dernier mot de l'Assemblée nationale (article 45), article 49 alinéa 3 limité depuis 2008, motion de censure ; Conseil constitutionnel : contrôle a priori (article 61) et question prioritaire de constitutionnalité (article 61-1) ; révision de la Constitution (article 89)." },
    { question: "Comment fonctionnent les collectivités territoriales et le contrôle de l'État sur leurs actes ?", reponseAttendue: "Communes, départements, régions, collectivités à statut particulier et d'outre-mer (article 72), libre administration par des conseils élus ; lois de décentralisation de 1982, révision de 2003 ; préfet, déconcentration et contrôle de légalité par déféré au tribunal administratif." },
    { question: "Quels droits du citoyen et quelles protections des libertés pouvez-vous expliquer ?", reponseAttendue: "Droit de vote, modes de scrutin, référendum, nationalité, citoyenneté européenne (article 20 du TFUE) ; libertés fondamentales (DDHC, Convention européenne des droits de l'homme), laïcité (article 1er, loi de 1905), Défenseur des droits (article 71-1), référé-liberté (article L. 521-2 du Code de justice administrative)." },
    { question: "Comment le droit de l'Union européenne et les traités s'articulent-ils avec le droit français ?", reponseAttendue: "Construction européenne de 1951 à Lisbonne, traité sur l'Union européenne, traité sur le fonctionnement de l'Union européenne, Charte des droits fondamentaux ; institutions et procédure législative ordinaire ; règlement et directive (article 288) ; primauté et effet direct (Costa contre ENEL, Van Gend en Loos), article 55, Jacques Vabre et Nicolo ; Conseil de l'Europe et Cour européenne des droits de l'homme ; ratification (articles 52 à 54)." },
    { question: "Comment identifiez-vous la juridiction compétente et la voie de recours dans un litige ?", reponseAttendue: "Ordre judiciaire ou administratif selon les parties et l'objet, Tribunal des conflits et arrêt Blanco ; juridictions civiles et pénales (tribunal de police, tribunal correctionnel, cour criminelle départementale, cour d'assises) ; tribunal administratif, cour administrative d'appel, Conseil d'État ; appel, opposition, pourvoi en cassation, recours pour excès de pouvoir ; procès équitable (article 6 de la Convention), aide juridictionnelle." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle.
// Aucune réponse à 1 au début : au plus 5 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — sources et hiérarchie des normes
  [
    ["Les règles viennent de l'État, mais je ne sais pas s'il y a un ordre entre elles.", 0],
    ["Je pense que la Constitution est au-dessus des lois, mais je ne sais pas où placer les décrets.", 0.5],
    ["Pour moi, toutes les lois se valent, la plus récente gagne.", 0],
    ["Il y a les lois et les décisions des juges ; je ne connais pas d'autres sources.", 0.5],
    ["Je n'ai jamais entendu parler de hiérarchie des normes.", 0],
    ["J'ai entendu parler de la pyramide de Kelsen en cours, mais je ne saurais pas la reconstituer.", 0.5],
    ["Les règles viennent surtout de Bruxelles, d'après ce que j'entends.", 0],
    ["Je crois qu'un arrêté du maire doit respecter la loi, mais je ne saurais pas l'expliquer.", 0.5],
    ["C'est le Président qui fait les règles, je pense.", 0],
    ["Il y a la Constitution, les lois, les décrets ; pour les traités européens, je ne sais pas où ils se placent.", 0.5],
    ["Je ne sais pas, c'est justement pour ça que je suis cette formation.", 0],
    ["La Déclaration des droits de l'homme compte encore aujourd'hui, mais je ne sais pas à quel niveau.", 0.5],
  ],
  // Q2 — loi, règlement, entrée en vigueur
  [
    ["C'est l'Assemblée nationale qui fait tout, lois et décrets.", 0],
    ["Le Parlement vote les lois ; les décrets, je crois que c'est le Gouvernement.", 0.5],
    ["Les décrets sont pris par le Président seul, c'est ce que j'ai toujours pensé.", 0],
    ["Une loi s'applique dès qu'elle est votée.", 0],
    ["Je sais qu'il faut une publication au Journal officiel, mais je ne connais pas la date d'entrée en vigueur.", 0.5],
    ["Le Sénat fait les lois et l'Assemblée les décrets, je crois.", 0],
    ["Le Gouvernement prend des décrets pour appliquer les lois, c'est tout ce que je sais.", 0.5],
    ["Je ne connais pas la différence entre une loi et un décret.", 0],
    ["On m'a parlé des ordonnances pendant les réformes, mais je ne sais pas ce que c'est.", 0.5],
    ["Une loi nouvelle peut s'appliquer au passé si le Parlement le décide, je pense.", 0],
    ["Je crois qu'une loi ne s'applique en principe que pour l'avenir, sans en être sûr{e}.", 0.5],
    ["Ce sont les ministres qui votent les lois au Conseil des ministres.", 0],
  ],
  // Q3 — droit public / droit privé
  [
    ["Le droit public, c'est ce qui est affiché en public ; le droit privé, ce qui est confidentiel.", 0],
    ["Le droit public concerne l'État, le droit privé les particuliers ; je ne connais pas les sous-branches.", 0.5],
    ["Je ne connais pas cette distinction.", 0],
    ["Le droit du travail, c'est du droit public puisque l'État fixe les règles.", 0],
    ["Je pense que le droit administratif est du droit public et que le droit civil est du droit privé.", 0.5],
    ["Le droit pénal est du droit privé, puisqu'il concerne les personnes.", 0],
    ["Le droit public, ce sont les impôts ; le droit privé, les contrats. J'ai du mal à aller plus loin.", 0.5],
    ["Pour moi, tout le droit est public puisqu'il vient de l'État.", 0],
    ["Le droit commercial, c'est pour les entreprises ; je le classe dans le droit privé.", 0.5],
    ["Je ne vois pas à quoi sert de classer le droit en branches.", 0],
    ["Un litige avec la mairie relève du droit public, je crois, mais je ne sais pas pourquoi.", 0.5],
    ["Je ne saurais pas donner d'exemple.", 0],
  ],
  // Q4 — contrat et responsabilité
  [
    ["Un contrat, c'est un papier signé ; sans signature, il n'y a pas de contrat.", 0],
    ["C'est un accord entre deux personnes qui les oblige ; pour le dommage, il faut réparer, mais je ne connais pas la règle.", 0.5],
    ["Si je cause un dommage, c'est mon assurance qui s'en occupe, le droit n'intervient pas.", 0],
    ["Un contrat doit être signé devant notaire pour être valable.", 0],
    ["Je sais qu'un mineur ne peut pas tout signer seul, mais je ne connais pas les règles exactes.", 0.5],
    ["Si je casse quelque chose chez quelqu'un, je dois le rembourser : c'est la responsabilité, je crois.", 0.5],
    ["Je ne sais pas ce qu'est la responsabilité civile.", 0],
    ["On peut toujours revenir sur un contrat si on change d'avis.", 0],
    ["Le contrat doit être accepté par les deux parties ; je ne sais pas ce qu'il faut d'autre.", 0.5],
    ["Le dommage est réparé seulement si on va en prison.", 0],
    ["Il faut prouver le dommage pour être indemnisé, mais je ne sais pas qui doit prouver quoi.", 0.5],
    ["Je n'ai jamais lu d'article du Code civil.", 0],
  ],
  // Q5 — Président, Gouvernement
  [
    ["Le Président dirige tout, le Premier ministre exécute ses ordres.", 0],
    ["Le Président est élu par les Français pour cinq ans ; le Premier ministre est nommé, je crois, par le Président.", 0.5],
    ["Le Premier ministre est élu par les députés.", 0],
    ["Je ne connais pas bien la différence entre leurs rôles.", 0],
    ["Le Président peut dissoudre l'Assemblée, je l'ai vu aux informations, mais je ne connais pas les règles.", 0.5],
    ["Le Président est élu pour sept ans.", 0],
    ["Le Gouvernement peut être renversé par les députés, c'est ce que j'ai compris des actualités.", 0.5],
    ["Le Président fait les lois et le Premier ministre les applique.", 0],
    ["J'ai entendu le mot cohabitation, quand le Président et le Gouvernement ne sont pas du même bord, mais sans plus.", 0.5],
    ["Le Président peut rester autant de mandats qu'il veut s'il est réélu.", 0],
    ["Le Premier ministre dirige le Gouvernement ; le Président s'occupe surtout des affaires étrangères, je crois.", 0.5],
    ["Je ne sais pas.", 0],
  ],
  // Q6 — procédure législative, Conseil constitutionnel
  [
    ["Une loi est votée par l'Assemblée nationale, puis elle s'applique.", 0],
    ["Je sais que la loi passe à l'Assemblée et au Sénat, mais je ne sais pas ce qui se passe s'ils ne sont pas d'accord.", 0.5],
    ["C'est le Conseil d'État qui vérifie que les lois respectent la Constitution.", 0],
    ["J'ai entendu parler du « 49.3 », qui permet de faire passer une loi sans vote, mais je ne sais pas comment.", 0.5],
    ["Le Président signe la loi, mais je ne connais pas le mot exact.", 0.5],
    ["Personne ne contrôle les lois une fois qu'elles sont votées.", 0],
    ["Le Conseil constitutionnel contrôle les lois, je crois, mais je ne sais pas qui peut le saisir.", 0.5],
    ["C'est la Cour de cassation qui annule les lois.", 0],
    ["Je ne connais pas la procédure.", 0],
    ["Les sénateurs votent en dernier, ils ont toujours le dernier mot.", 0],
    ["Un citoyen peut contester une loi lors d'un procès, j'en ai entendu parler sans savoir comment ça marche.", 0.5],
    ["Le référendum est obligatoire pour chaque loi importante.", 0],
  ],
  // Q7 — collectivités territoriales, préfet
  [
    ["La commune s'occupe de tout ce qui est local, le reste c'est l'État.", 0],
    ["Le maire gère la commune, le département s'occupe du social et la région des lycées, je crois. Le préfet, je ne sais pas.", 0.5],
    ["Le préfet est le chef du maire.", 0],
    ["Je ne connais pas le rôle du département.", 0],
    ["Le préfet représente l'État dans le département, mais je ne sais pas ce qu'il contrôle.", 0.5],
    ["Le maire est nommé par le préfet.", 0],
    ["J'ai entendu parler de décentralisation, sans savoir exactement ce que c'est.", 0.5],
    ["Les régions font leurs propres lois.", 0],
    ["Le conseil municipal est élu et il élit le maire, je crois.", 0.5],
    ["Je ne vois pas la différence entre la commune et la mairie.", 0],
    ["Le préfet peut annuler une décision du maire, à ce que j'en sais.", 0],
    ["Il me semble que les collectivités votent leur budget, mais je ne connais pas leurs compétences.", 0.5],
  ],
  // Q8 — citoyenneté, libertés
  [
    ["Je peux voter, c'est le principal droit.", 0],
    ["Je peux voter à partir de 18 ans ; pour les libertés, il y a la Déclaration des droits de l'homme, mais je ne sais pas qui les protège.", 0.5],
    ["Les étrangers européens ne peuvent voter à aucune élection en France.", 0],
    ["La laïcité interdit à tout le monde de porter un signe religieux partout.", 0],
    ["La laïcité vient de la loi de 1905, je crois, mais je ne saurais pas l'expliquer.", 0.5],
    ["Si la mairie porte atteinte à une liberté, on ne peut rien faire.", 0],
    ["Je sais qu'on peut saisir un juge en urgence, mais je ne sais pas lequel.", 0.5],
    ["Les libertés sont protégées par la police.", 0],
    ["J'ai entendu parler du Défenseur des droits, sans savoir quand le saisir.", 0.5],
    ["Je ne connais pas mes droits de citoyen.", 0],
    ["La Convention européenne des droits de l'homme protège aussi nos libertés, je crois.", 0.5],
    ["La citoyenneté, c'est le fait d'habiter dans une ville.", 0],
  ],
  // Q9 — droit européen
  [
    ["L'Union européenne et le Conseil de l'Europe, c'est la même chose.", 0],
    ["Je crois que le droit européen passe avant la loi française, mais je ne sais pas pourquoi.", 0.5],
    ["La France peut toujours écarter une règle européenne si le Parlement le décide.", 0],
    ["Les directives s'appliquent directement à tout le monde, sans rien faire.", 0],
    ["Je sais qu'il y a une Commission et un Parlement européen, mais pas qui fait quoi.", 0.5],
    ["La Cour européenne des droits de l'homme est à Bruxelles et dépend de l'Union.", 0],
    ["Il y a des règlements et des directives, mais je ne connais pas la différence.", 0.5],
    ["Je n'ai aucune idée de la place du droit européen.", 0],
    ["L'Union européenne compte une trentaine de pays, je crois, mais je ne connais pas le chiffre exact.", 0.5],
    ["Les traités européens sont au-dessus de la Constitution française.", 0],
    ["La Cour européenne des droits de l'homme est à Strasbourg, mais je ne sais pas de quelle organisation elle dépend.", 0.5],
    ["Le droit européen ne concerne que les agriculteurs et les entreprises.", 0],
  ],
  // Q10 — juridictions
  [
    ["J'irais au tribunal, il n'y en a qu'un par ville.", 0],
    ["Pour l'employeur, aux prud'hommes ; pour la mairie, je ne sais pas.", 0.5],
    ["Tous les litiges vont devant la Cour de cassation.", 0],
    ["Pour un problème avec la mairie, je pense qu'il faut aller au tribunal administratif.", 0.5],
    ["J'irais voir la police, elle tranche les litiges.", 0],
    ["Je sais qu'on peut faire appel d'un jugement, mais je ne connais pas les autres recours.", 0.5],
    ["Le Conseil constitutionnel juge les litiges entre particuliers.", 0],
    ["Je ne connais pas l'organisation des tribunaux.", 0],
    ["Pour mon bailleur, ce serait l'ancien tribunal d'instance, je crois, mais je sais qu'il a changé de nom.", 0.5],
    ["Il faut toujours un avocat, même pour un petit litige.", 0],
    ["Il existe une aide pour payer l'avocat quand on a peu de revenus, je crois.", 0.5],
    ["Le juge du tribunal décide aussi des lois.", 0],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["Au sommet de l'ordre interne, le bloc de constitutionnalité ; puis les traités et le droit de l'Union, supérieurs aux lois selon l'article 55 ; puis la loi, les règlements et les actes administratifs.", 1],
    ["Le bloc de constitutionnalité comprend la Constitution de 1958, la DDHC de 1789, le Préambule de 1946, la Charte de l'environnement et les principes fondamentaux reconnus par les lois de la République.", 1],
    ["Une norme inférieure doit respecter la norme supérieure : un arrêté municipal contraire à un décret est illégal.", 1],
    ["La décision du 16 juillet 1971 sur la liberté d'association a fait entrer le Préambule et la DDHC dans le contrôle de constitutionnalité.", 1],
    ["Le contrôle de constitutionnalité revient au Conseil constitutionnel ; le contrôle de conventionnalité aux juges ordinaires.", 1],
    ["J'utilise la pyramide de Kelsen pour classer les textes que je rencontre au travail.", 0.5],
    ["La jurisprudence et la doctrine complètent les textes ; la coutume reste une source secondaire.", 0.5],
    ["Les traités sont au-dessus des lois mais en dessous de la Constitution dans l'ordre interne.", 1],
    ["Je vérifie la place d'un texte avant de l'appliquer : loi, décret ou arrêté.", 0.5],
    ["Le droit objectif est l'ensemble des règles ; les droits subjectifs sont les prérogatives des personnes.", 1],
    ["Une circulaire n'a pas la même force qu'un décret.", 0.5],
    ["La hiérarchie des normes garantit la cohérence de l'ordre juridique.", 0.5],
  ],
  [
    ["L'article 34 fixe le domaine de la loi ; tout le reste relève du règlement selon l'article 37.", 1],
    ["Avec l'article 38, le Gouvernement peut, s'il y est habilité par une loi, prendre des ordonnances qui doivent être ratifiées expressément.", 1],
    ["Sans date prévue, une loi entre en vigueur le lendemain de sa publication au Journal officiel.", 1],
    ["La loi ne dispose que pour l'avenir ; en matière pénale, la loi plus sévère n'est jamais rétroactive.", 1],
    ["Je vérifie sur Légifrance la version en vigueur et la date de l'article.", 1],
    ["Un décret d'application est parfois nécessaire pour que la loi s'applique réellement.", 0.5],
    ["Les crimes et délits sont définis par la loi, les contraventions par le règlement.", 1],
    ["Je lis l'entrée en vigueur avant de citer un texte dans une note.", 0.5],
    ["Le Parlement vote la loi, le Premier ministre exerce le pouvoir réglementaire.", 1],
    ["J'ai appris à consulter les versions antérieures d'un article sur Légifrance.", 0.5],
    ["La non-rétroactivité protège la sécurité juridique.", 0.5],
    ["Une ordonnance non ratifiée garde une valeur réglementaire.", 0.5],
  ],
  [
    ["Je regarde d'abord les personnes en présence : une personne publique agissant comme telle oriente vers le droit public.", 1],
    ["Droit public : constitutionnel, administratif, finances publiques, fiscal. Droit privé : civil, commercial, travail.", 1],
    ["Le droit pénal est mixte : il protège l'intérêt général mais il est appliqué par les juridictions judiciaires.", 1],
    ["Un refus de permis de construire relève du droit administratif ; un licenciement du droit du travail.", 1],
    ["Le droit de l'Union européenne a sa propre logique : droit primaire, les traités, et droit dérivé, les règlements, directives et décisions.", 1],
    ["Je classe un litige entre deux commerçants en droit commercial.", 0.5],
    ["L'impôt relève du droit fiscal, une branche du droit public.", 0.5],
    ["Qualifier, c'est faire entrer des faits dans une catégorie juridique pour savoir quelle règle s'applique.", 1],
    ["La procédure civile et la procédure pénale organisent le déroulement des procès.", 0.5],
    ["Le droit international public règle les relations entre États.", 0.5],
    ["Le droit public et le droit privé ne sont pas étanches, certaines matières empruntent aux deux.", 0.5],
    ["Le budget de l'État relève des finances publiques et du droit constitutionnel.", 1],
  ],
  [
    ["Un contrat valable suppose le consentement, la capacité et un contenu licite et certain (article 1128).", 1],
    ["Le contrat légalement formé tient lieu de loi à ceux qui l'ont fait (article 1103).", 1],
    ["Un mineur peut faire seul les actes courants ; pour le reste, il faut ses représentants légaux.", 1],
    ["Article 1240 : celui qui cause un dommage par sa faute doit le réparer ; il faut un fait générateur, un dommage et un lien de causalité.", 1],
    ["L'employeur répond du dommage causé par son salarié dans ses fonctions.", 1],
    ["Celui qui réclame l'exécution d'une obligation doit la prouver (article 1353).", 1],
    ["Une personne morale, comme une société, a des droits et des obligations propres.", 0.5],
    ["Un contrat peut être oral, sauf exceptions prévues par la loi.", 0.5],
    ["Le consentement doit être libre et éclairé, sans erreur, dol ni violence.", 1],
    ["Les majeurs protégés relèvent de la tutelle, de la curatelle ou de la sauvegarde de justice.", 0.5],
    ["Je relis les conditions d'un contrat avant de le signer au nom de mon employeur.", 0.5],
    ["La responsabilité civile répare ; la responsabilité pénale sanctionne.", 0.5],
  ],
  [
    ["Le Président est élu au suffrage universel direct depuis 1962, pour cinq ans depuis 2000, deux mandats consécutifs au plus.", 1],
    ["Il nomme le Premier ministre (article 8), peut dissoudre l'Assemblée (article 12) et soumettre un projet de loi au référendum (article 11).", 1],
    ["Le Gouvernement détermine et conduit la politique de la Nation (article 20) et il est responsable devant l'Assemblée nationale.", 1],
    ["Les actes du Président sont contresignés, sauf ses pouvoirs propres listés à l'article 19.", 1],
    ["En cohabitation, le Premier ministre est issu de la majorité de l'Assemblée, opposée au Président : 1986, 1993, 1997.", 1],
    ["L'article 16 donne des pouvoirs exceptionnels au Président en cas de menace grave et immédiate.", 1],
    ["Le régime est parlementaire, mais rationalisé, avec un Président fort.", 0.5],
    ["Le Premier ministre dirige l'action du Gouvernement (article 21).", 0.5],
    ["Le Président est garant de l'indépendance nationale et veille au respect de la Constitution (article 5).", 1],
    ["La séparation des pouvoirs vient de Montesquieu : législatif, exécutif, judiciaire.", 0.5],
    ["Une dissolution ne peut pas être renouvelée dans l'année qui suit les élections.", 0.5],
    ["Le quinquennat a rapproché l'élection présidentielle des élections législatives.", 0.5],
  ],
  [
    ["La loi fait la navette entre les deux assemblées ; en cas de désaccord, une commission mixte paritaire se réunit, puis l'Assemblée peut avoir le dernier mot.", 1],
    ["L'article 49 alinéa 3 permet au Gouvernement de faire adopter un texte sauf motion de censure ; depuis 2008, un seul texte hors budget par session.", 1],
    ["La motion de censure doit réunir la majorité absolue des membres de l'Assemblée.", 1],
    ["Avant la promulgation, soixante députés ou soixante sénateurs peuvent saisir le Conseil constitutionnel.", 1],
    ["Depuis 2010, la question prioritaire de constitutionnalité permet à un justiciable de contester une loi en vigueur ; la Cour de cassation ou le Conseil d'État filtrent.", 1],
    ["Le Président promulgue la loi dans les quinze jours.", 0.5],
    ["Le Conseil constitutionnel compte neuf membres nommés pour neuf ans, plus les anciens Présidents.", 1],
    ["La révision de la Constitution passe par l'article 89 : référendum ou Congrès à la majorité des trois cinquièmes.", 1],
    ["Une disposition jugée inconstitutionnelle après une question prioritaire est abrogée.", 0.5],
    ["Je sais maintenant suivre un texte sur les sites de l'Assemblée nationale et du Sénat.", 0.5],
    ["Le projet de loi vient du Gouvernement, la proposition de loi des parlementaires.", 0.5],
    ["La commission mixte paritaire réunit sept députés et sept sénateurs.", 0.5],
  ],
  [
    ["Article 72 : communes, départements, régions, collectivités à statut particulier et collectivités d'outre-mer.", 1],
    ["Décentralisation : compétences confiées à des collectivités élues ; déconcentration : pouvoirs confiés au préfet, représentant de l'État.", 1],
    ["Le préfet ne peut pas annuler un acte : il le défère au tribunal administratif s'il l'estime illégal.", 1],
    ["Les lois de 1982 ont supprimé la tutelle a priori ; la révision de 2003 a inscrit l'organisation décentralisée à l'article 1er.", 1],
    ["Les collectivités s'administrent librement par des conseils élus, dans les conditions prévues par la loi.", 1],
    ["Le maire est élu par le conseil municipal parmi ses membres.", 0.5],
    ["La région s'occupe notamment des lycées et des transports, le département de l'action sociale et des collèges.", 1],
    ["Le maire agit aussi comme agent de l'État, par exemple pour l'état civil.", 0.5],
    ["Depuis 2016, la métropole compte 13 régions.", 0.5],
    ["Les collectivités votent leur budget et lèvent certains impôts locaux.", 0.5],
    ["Le contrôle de légalité est un contrôle a posteriori.", 1],
    ["Les communes peuvent se regrouper en intercommunalités pour exercer certaines compétences.", 0.5],
  ],
  [
    ["Les citoyens européens résidant en France votent aux municipales et aux européennes, pas aux élections nationales.", 1],
    ["En cas d'atteinte grave et manifestement illégale à une liberté fondamentale, le référé-liberté permet une décision en 48 heures.", 1],
    ["La laïcité impose la neutralité aux agents publics ; les usagers gardent leur liberté de conscience.", 1],
    ["Le Défenseur des droits peut être saisi gratuitement, notamment en cas de discrimination.", 1],
    ["Les libertés sont protégées par la DDHC, la Constitution et la Convention européenne des droits de l'homme.", 1],
    ["Les députés sont élus au scrutin uninominal majoritaire à deux tours, les sénateurs au suffrage indirect.", 1],
    ["La nationalité française s'acquiert notamment par filiation, par naissance et résidence en France, ou par naturalisation.", 0.5],
    ["Le référendum permet au peuple d'exercer directement sa souveraineté.", 0.5],
    ["Être citoyen, c'est aussi des devoirs : respecter la loi, contribuer aux charges publiques.", 0.5],
    ["La loi de 1905 garantit le libre exercice des cultes et sépare les Églises de l'État.", 1],
    ["Je sais vers quelle autorité orienter une personne qui s'estime discriminée.", 0.5],
    ["Le droit de vote s'exerce à partir de 18 ans, sous réserve d'être inscrit sur les listes électorales.", 0.5],
  ],
  [
    ["Le règlement s'applique directement ; la directive fixe un résultat et doit être transposée (article 288 du TFUE).", 1],
    ["Primauté : le juge écarte une loi contraire au droit de l'Union, même postérieure (Costa contre ENEL, 1964).", 1],
    ["L'article 55 place les traités au-dessus des lois ; Jacques Vabre en 1975 et Nicolo en 1989 l'ont fait appliquer par les juges.", 1],
    ["La Commission propose, le Parlement européen et le Conseil adoptent dans la procédure législative ordinaire.", 1],
    ["La Cour européenne des droits de l'homme dépend du Conseil de l'Europe, pas de l'Union européenne.", 1],
    ["Le traité de Lisbonne est en vigueur depuis le 1er décembre 2009 ; la Charte des droits fondamentaux a la même valeur que les traités.", 1],
    ["Van Gend en Loos, en 1963, a reconnu l'effet direct du droit communautaire.", 1],
    ["Le Président négocie et ratifie les traités ; certains exigent une loi (article 53).", 0.5],
    ["L'Union européenne compte 27 États, le Conseil de l'Europe 46.", 0.5],
    ["Avant de saisir la Cour de Strasbourg, il faut épuiser les recours internes.", 0.5],
    ["L'article 88-1 prévoit la participation de la France à l'Union européenne.", 0.5],
    ["La Cour de justice de l'Union européenne siège à Luxembourg.", 0.5],
  ],
  [
    ["Un licenciement va devant le conseil de prud'hommes ; un refus de permis de construire devant le tribunal administratif.", 1],
    ["Le tribunal judiciaire est la juridiction civile de droit commun depuis 2020.", 1],
    ["Contraventions au tribunal de police, délits au tribunal correctionnel, crimes devant la cour criminelle départementale ou la cour d'assises.", 1],
    ["Après le tribunal administratif, l'appel va devant la cour administrative d'appel, puis le pourvoi devant le Conseil d'État.", 1],
    ["Le Tribunal des conflits tranche les conflits de compétence entre les deux ordres ; l'arrêt Blanco date de 1873.", 1],
    ["La Cour de cassation juge le droit, pas les faits.", 1],
    ["L'aide juridictionnelle prend en charge tout ou partie des frais d'avocat sous conditions de ressources.", 0.5],
    ["Le recours pour excès de pouvoir permet de demander l'annulation d'un acte administratif illégal.", 1],
    ["Les magistrats du siège jugent et sont inamovibles ; ceux du parquet requièrent au nom de la société.", 1],
    ["Le procès équitable est garanti par l'article 6 de la Convention européenne des droits de l'homme.", 0.5],
    ["L'opposition permet de contester un jugement rendu par défaut.", 0.5],
    ["Le tribunal de commerce juge les litiges entre commerçants, avec des juges élus.", 0.5],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [54, 51, 45, 45, 4, 8, 57, 36, 47, 13];

export function getDRI47AutoAnswers(
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
export function dri47NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6). */
export function dri47BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((dri47NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `dri47BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function dri47ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = dri47BonnesQcmDebut(n, idx, nom, prenom);
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
 * QCM par compétence (10 questions : 6 à 9 bonnes réponses), mise en situation sur 5 (2,5 à 5).
 */
const NOTES_QCM_SUR_10 = [8, 7, 9, 6];
const NOTES_EXERCICE_SUR_5 = [4, 3, 4.5, 3.5, 5, 2.5];
export function dri47NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet (partie stagiaire), attentes, missions et contribution (partie entreprise).
// Public : toute personne, salariée ou particulier, sans formation juridique préalable.
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
    besoin: "Comprendre l'organisation des collectivités territoriales et le contrôle de légalité pour rédiger des actes administratifs sûrs.",
    objectif: "Je veux savoir situer une délibération ou un arrêté dans la hiérarchie des normes et comprendre ce que contrôle le préfet.",
    projet: "Elle m'aidera à évoluer vers un poste d'assistant{e} juridique dans une collectivité.",
    attentes: "L'employeur attend que {le_sal} sécurise la rédaction des actes et sache vérifier les textes applicables.",
    missions: "Secrétariat des assemblées, préparation des délibérations et arrêtés, accueil du public.",
    contribution: "Elle doit limiter les actes mal fondés et les échanges avec la préfecture.",
  },
  {
    besoin: "Acquérir les bases du droit des contrats et de la responsabilité pour mieux traiter les litiges clients.",
    objectif: "Mon objectif est de comprendre ce qui rend un contrat valable et dans quels cas l'entreprise doit réparer un dommage.",
    projet: "Elle me permettra de prendre en charge les premières réclamations clients avant transmission au conseil de l'entreprise.",
    attentes: "L'entreprise attend que {le_sal} qualifie correctement une réclamation et sache vers qui l'orienter.",
    missions: "Service client, suivi des réclamations, relations avec l'assureur.",
    contribution: "Elle doit améliorer le traitement des réclamations et la qualité des dossiers transmis.",
  },
  {
    besoin: "Comprendre le fonctionnement des institutions de la Ve République pour suivre l'actualité politique et législative.",
    objectif: "Je souhaite comprendre qui fait la loi, comment elle est votée et comment fonctionne le Conseil constitutionnel.",
    projet: "Elle m'aidera à suivre les évolutions législatives qui concernent mon activité professionnelle.",
    attentes: "L'employeur attend que {le_sal} assure une veille sur les textes nouveaux et leur entrée en vigueur.",
    missions: "Veille documentaire, rédaction de notes de synthèse, communication interne.",
    contribution: "Elle doit fiabiliser la veille réglementaire du service.",
  },
  {
    besoin: "Savoir orienter un salarié ou un usager vers la bonne juridiction et la bonne voie de recours.",
    objectif: "Mon objectif est de connaître l'organisation de la justice et les délais de recours principaux.",
    projet: "Elle me permettra de mieux informer les personnes que j'accompagne dans leurs démarches.",
    attentes: "La structure attend que {le_sal} donne une première orientation fiable, sans se substituer à un avocat.",
    missions: "Accueil et accompagnement des usagers, information sur les droits, constitution de dossiers.",
    contribution: "Elle doit améliorer la qualité de l'information donnée aux usagers.",
  },
  {
    besoin: "Comprendre la place du droit de l'Union européenne dans les règles qui s'appliquent à l'entreprise.",
    objectif: "Je veux savoir faire la différence entre un règlement et une directive et comprendre la primauté du droit européen.",
    projet: "Elle m'aidera à suivre les obligations européennes de l'entreprise, notamment sur les données personnelles.",
    attentes: "L'entreprise attend que {le_sal} repère les textes européens applicables et leur date d'application.",
    missions: "Assistance de direction, suivi de la conformité, relations avec les partenaires européens.",
    contribution: "Elle doit sécuriser le suivi des obligations européennes de l'entreprise.",
  },
  {
    besoin: "Reprendre des bases solides en droit avant une reconversion vers les métiers du droit.",
    objectif: "Mon objectif est d'acquérir le vocabulaire et les raisonnements de base pour poursuivre des études juridiques.",
    projet: "Elle me permettra de préparer sereinement une reprise d'études en droit.",
    attentes: "Formation suivie à titre personnel, dans le cadre d'un projet de reprise d'études : aucune attente d'employeur.",
    missions: "Activité professionnelle actuelle sans lien avec le droit.",
    contribution: "Elle doit consolider un projet de reconversion personnel.",
  },
  {
    besoin: "Comprendre ses droits de citoyen et les mécanismes de protection des libertés fondamentales.",
    objectif: "Je souhaite comprendre la laïcité, la citoyenneté européenne et les recours possibles en cas d'atteinte à une liberté.",
    projet: "Elle m'aidera dans mon engagement associatif et dans l'animation d'ateliers de citoyenneté.",
    attentes: "L'association attend que {le_sal} anime des temps d'information fiables sur les droits et libertés.",
    missions: "Animation d'ateliers, accueil du public, organisation d'événements associatifs.",
    contribution: "Elle doit améliorer la fiabilité des contenus présentés au public.",
  },
  {
    besoin: "Lire et comprendre des textes juridiques et des décisions de justice dans le cadre de ses fonctions RH.",
    objectif: "Mon objectif est de savoir lire un article de code, vérifier sa version en vigueur et comprendre une décision de justice.",
    projet: "Elle me permettra de prendre en charge davantage de dossiers en autonomie au service des ressources humaines.",
    attentes: "L'entreprise attend que {le_sal} vérifie les textes avant de répondre aux questions des salariés.",
    missions: "Gestion administrative du personnel, contrats de travail, réponses aux salariés.",
    contribution: "Elle doit réduire les erreurs dans l'application des textes.",
  },
  {
    besoin: "Comprendre l'organisation de l'État, des collectivités et de l'Union européenne pour un futur poste dans la fonction publique.",
    objectif: "Je veux maîtriser les bases des institutions et du droit administratif pour préparer un poste dans une administration.",
    projet: "Elle m'aidera à préparer mon entrée dans la fonction publique territoriale.",
    attentes: "Formation suivie à titre personnel, pour préparer un futur poste administratif : aucune attente d'employeur.",
    missions: "Poste actuel d'agent{e} contractuel{le} dans une administration.",
    contribution: "Elle doit consolider les connaissances utiles à un futur poste administratif.",
  },
  {
    besoin: "Comprendre le cadre juridique d'une petite entreprise : personnes morales, contrats, juridictions compétentes.",
    objectif: "Mon objectif est de comprendre ce qu'implique la personnalité morale de ma société et vers quel tribunal me tourner en cas de litige.",
    projet: "Elle me permettra de gérer plus sereinement la partie juridique de mon activité.",
    attentes: "Dirigeant{e} de la structure : besoin d'autonomie dans les premières analyses juridiques.",
    missions: "Direction d'une petite entreprise, relations commerciales, suivi des contrats.",
    contribution: "Elle doit limiter le recours systématique à des conseils extérieurs pour les questions simples.",
  },
  {
    besoin: "Comprendre la procédure législative et le rôle du Conseil constitutionnel pour un poste en relation avec des élus.",
    objectif: "Je souhaite comprendre le parcours d'une loi, l'article 49 et la question prioritaire de constitutionnalité.",
    projet: "Elle m'aidera à préparer les dossiers des élus avec lesquels je travaille.",
    attentes: "L'employeur attend que {le_sal} suive l'avancement des textes et en explique les étapes.",
    missions: "Assistance d'élus, préparation de dossiers, suivi de l'agenda institutionnel.",
    contribution: "Elle doit améliorer la qualité des dossiers préparés pour les élus.",
  },
  {
    besoin: "Acquérir une culture juridique générale pour mieux comprendre l'actualité et ses propres démarches.",
    objectif: "Mon objectif est de comprendre comment fonctionnent la justice, les institutions et l'Europe, sans jargon.",
    projet: "Elle m'aidera à défendre mes droits dans mes démarches personnelles et à mieux informer mon entourage.",
    attentes: "Formation suivie à titre personnel, par intérêt pour le droit et les institutions : aucune attente d'employeur.",
    missions: "Activité professionnelle sans lien direct avec le droit.",
    contribution: "Elle doit développer une culture juridique générale.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilDRI47(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

function entAccords(txt: string, fem: boolean): string {
  return accorder(
    txt.replace(/\{le_sal\}/g, fem ? "la salariée" : "le salarié"),
    fem,
  );
}

export function getDRI47Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return entAccords(profilDRI47(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — copie du stagiaire sur les cas pratiques fictifs
// Indices : 0 hiérarchie des normes, 1 loi / règlement / entrée en vigueur, 2 branches du droit,
//           3 contrat et responsabilité, 4 Président et Gouvernement, 5 procédure législative et
//           Conseil constitutionnel, 6 collectivités et préfet, 7 citoyenneté et libertés,
//           8 droit européen, 9 juridictions et voies de recours ; 8 productions par banque.
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Hiérarchie des normes
  [
    "Classement retenu pour la note de Camille : Constitution et DDHC au sommet, puis la Convention européenne des droits de l'homme et le règlement européen, puis la loi, le décret et enfin l'arrêté municipal. J'ai justifié la place des traités par l'article 55. Pour l'administré, j'ai parlé du principe de légalité : l'arrêté doit respecter le décret, sinon le juge administratif peut l'annuler. J'avais oublié la Charte de l'environnement dans le bloc de constitutionnalité, je l'ai ajoutée à la correction.",
    "J'ai d'abord placé le règlement européen au-dessus de la Constitution ; le formateur m'a rappelé que, dans l'ordre interne, la Constitution reste au sommet de la hiérarchie des normes. Classement final : bloc de constitutionnalité, traités et droit de l'Union, loi, décret, arrêté. Bloc de constitutionnalité : Constitution de 1958, DDHC, Préambule de 1946, Charte de l'environnement, principes fondamentaux reconnus par les lois de la République.",
    "Pour la hiérarchie des normes, j'ai construit la pyramide sur le tableau blanc : Constitution et DDHC, traités, loi, décret, arrêté du maire. La décision du 16 juillet 1971 a intégré le Préambule et donc la DDHC dans le contrôle du Conseil constitutionnel : c'est la naissance du bloc de constitutionnalité. L'arrêté contraire au décret est illégal ; l'administré peut saisir le tribunal administratif.",
    "J'ai classé les sept textes sans erreur sur le sommet de la hiérarchie des normes, mais j'avais inversé le décret et la loi. Après correction : la loi est votée par le Parlement et le décret doit la respecter. J'ai retenu que la Convention européenne des droits de l'homme a une autorité supérieure aux lois grâce à l'article 55, sans être au-dessus de la Constitution.",
    "Ma note pour Camille commence par le bloc de constitutionnalité, dont j'ai cité les cinq composantes. Ensuite, traités ratifiés et droit de l'Union, loi, règlement, puis actes des autorités locales. J'ai expliqué à l'oral la différence entre contrôle de constitutionnalité, confié au Conseil constitutionnel, et contrôle de conventionnalité, exercé par les juges ordinaires. Respect de la hiérarchie des normes : l'arrêté contraire au décret doit être écarté.",
    "Je ne connaissais pas l'expression hiérarchie des normes en arrivant. J'ai réussi le classement avec l'aide du schéma : Constitution, traités, loi, décret, arrêté. Je me suis trompé{e} sur la décision de 1971, que j'attribuais au Conseil d'État ; c'est bien une décision du Conseil constitutionnel sur la liberté d'association.",
    "J'ai rattaché l'exercice à mon travail : les arrêtés que je prépare doivent respecter les décrets et les lois, c'est la hiérarchie des normes. Classement : bloc de constitutionnalité, Convention européenne et règlement européen, loi, décret, arrêté municipal. L'administré invoque le principe de légalité ; le juge administratif peut annuler l'arrêté.",
    "Classement réalisé et justifié, avec les numéros d'articles : article 55 pour les traités, articles 34 et 37 pour la loi et le règlement. Le bloc de constitutionnalité a été complété par les principes fondamentaux reconnus par les lois de la République, comme la liberté d'association. Je retiens la logique de la hiérarchie des normes : chaque norme tire sa validité de la norme supérieure.",
  ],
  // 1 — Loi, règlement, entrée en vigueur, non-rétroactivité
  [
    "Droits civiques et crimes et délits : domaine de la loi, article 34. Le formulaire administratif relève du règlement, article 37. Pour aller vite, le Gouvernement peut demander une habilitation et prendre des ordonnances (article 38), à ratifier expressément. Sans date prévue, la loi entre en vigueur le lendemain de sa publication au Journal officiel. Elle ne peut pas sanctionner des faits antérieurs : non-rétroactivité de la loi pénale plus sévère.",
    "J'avais répondu que la loi entre en vigueur le jour de son vote ; correction : à la date qu'elle fixe ou, à défaut, le lendemain de sa publication (article 1er du Code civil). Sur Légifrance, j'ai retrouvé un article, vérifié la mention de version en vigueur et consulté la version antérieure. Article 2 du Code civil : la loi ne dispose que pour l'avenir.",
    "Pour Atelier Valmontais, j'ai classé le premier texte dans le domaine de la loi (article 34), le deuxième dans le domaine réglementaire (article 37). Les ordonnances de l'article 38 supposent une loi d'habilitation, un avis du Conseil d'État et un projet de loi de ratification. Une loi pénale plus sévère n'est jamais rétroactive : article 8 de la DDHC.",
    "J'ai eu du mal à distinguer l'article 34 et l'article 37 ; le formateur m'a donné la règle : la loi fixe les règles dans les matières listées, le reste est réglementaire. Entrée en vigueur : lendemain de la publication au Journal officiel, sauf date prévue ou décret d'application nécessaire. Recherche sur Légifrance réussie à la deuxième tentative.",
    "Sur la non-rétroactivité, j'ai expliqué que la règle de l'article 2 du Code civil a valeur législative, mais qu'en matière pénale elle a valeur constitutionnelle pour la loi plus sévère. Pour l'entrée en vigueur, j'ai cité l'article 1er du Code civil. J'ai ajouté que les ordonnances non ratifiées gardent une valeur réglementaire.",
    "J'ai cherché sur Légifrance l'article 1er du Code civil pour vérifier la règle d'entrée en vigueur : le lendemain de la publication au Journal officiel, sauf date fixée. Textes d'Atelier Valmontais : le premier relève de l'article 34, le deuxième de l'article 37. Pas de sanction pénale rétroactive possible.",
    "Ma réponse sur l'article 38 était incomplète : j'avais oublié la ratification expresse. Le reste est juste : domaine de la loi pour les droits civiques et les crimes et délits, domaine réglementaire pour le formulaire, entrée en vigueur le lendemain de la publication, non-rétroactivité de la loi pénale plus sévère.",
    "Dans mon service, nous appliquons souvent un texte trop tôt : l'exercice m'a montré l'importance de vérifier l'entrée en vigueur et la nécessité éventuelle d'un décret d'application. J'ai retenu la méthode Légifrance : texte, article, version en vigueur, date. Domaines : article 34 pour la loi, article 37 pour le règlement.",
  ],
  // 2 — Branches du droit
  [
    "Qualifications : 1 droit public, droit administratif ; 2 droit privé, droit commercial ; 3 droit privé, droit du travail ; 4 droit pénal ; 5 finances publiques et droit constitutionnel ; 6 droit fiscal ; 7 droit de l'Union européenne dérivé, règlement directement applicable. Le droit pénal est mixte : il protège l'intérêt général mais il est appliqué par le juge judiciaire.",
    "J'avais classé le licenciement en droit public parce que l'État fixe les règles du Code du travail ; correction : le droit du travail relève du droit privé, il régit les relations entre employeurs et salariés de droit privé. Les autres situations sont justes, notamment le refus de permis de construire, qui relève du droit public administratif.",
    "J'ai construit un tableau à deux colonnes, droit public et droit privé, avec les sous-branches. Le budget de l'État relève des finances publiques ; l'impôt sur les sociétés du droit fiscal ; le délit routier du droit pénal, branche mixte. Le règlement européen sur les données s'applique directement à Atelier Valmontais, sans transposition.",
    "Je me suis appuyé{e} sur la question « qui sont les personnes en présence ? ». Une personne publique qui agit avec ses prérogatives oriente vers le droit public ; deux personnes privées vers le droit privé. Ma seule erreur : j'avais classé le droit pénal en droit privé ; il est plutôt mixte.",
    "Pour la situation 7, j'ai expliqué la différence entre droit primaire, les traités, et droit dérivé, règlements, directives, décisions. Le reste du tableau distingue clairement droit public et droit privé. J'ai ajouté la procédure civile et la procédure pénale, qui organisent le déroulement des procès.",
    "Exercice réussi, sauf pour le budget de l'État, que je n'avais rattaché à aucune branche ; correction : droit public, finances publiques et droit constitutionnel, puisque la loi de finances est votée par le Parlement. Je retiens que qualifier une situation, c'est la faire entrer dans une catégorie juridique.",
    "J'ai fait le lien avec mon travail : les contrats de travail relèvent du droit privé, mais les questions posées à l'inspection du travail touchent aussi au droit public. Pour l'exercice, mes qualifications sont justes ; j'ai bien expliqué le caractère mixte du droit pénal.",
    "Dans mes réponses, j'ai cité l'article 288 du TFUE pour le règlement. Qualification du refus de permis de construire : droit public, droit administratif, avec recours devant le juge administratif. Le non-paiement entre professionnels relève du droit privé, droit commercial.",
  ],
  // 3 — Contrat, responsabilité, preuve
  [
    "Atelier Valmontais est une personne morale de droit privé ; Camille une personne physique. Mineure, elle ne pouvait faire seule que des actes courants : l'achat d'un ordinateur peut être contesté. Conditions de validité du contrat (article 1128) : consentement, capacité, contenu licite et certain. Le voisin agit sur l'article 1240 et contre l'employeur, responsable du fait de son salarié.",
    "J'ai d'abord écrit qu'un contrat doit être écrit pour être valable ; correction : le contrat peut être oral, sauf exceptions prévues par la loi, mais l'écrit facilite la preuve. Force obligatoire du contrat : article 1103. Responsabilité civile : fait générateur, dommage, lien de causalité. Charge de la preuve : article 1353.",
    "J'ai bien distingué les deux problèmes : le contrat conclu par Camille, mineure, et le dommage causé au voisin. Pour le contrat, capacité limitée aux actes courants. Pour le dommage, l'employeur répond du fait de son salarié dans ses fonctions. Le voisin doit prouver son dommage et le lien avec la livraison.",
    "Ma réponse sur la personnalité morale était imprécise : une société à responsabilité limitée est une personne morale avec un patrimoine propre, distinct de celui des associés. Pour le contrat, j'ai cité l'article 1128 ; pour la responsabilité, l'article 1240, avec ses trois conditions.",
    "J'ai fait le parallèle avec les réclamations que je traite : quand un client invoque un dommage, je vérifie le fait générateur, le dommage et le lien de causalité, comme dans le cas du voisin. Le contrat d'achat de Camille pose une question de capacité ; les contrats légalement formés tiennent lieu de loi à ceux qui les ont faits.",
    "J'ai confondu au début responsabilité civile et responsabilité pénale. Correction : la responsabilité civile répare le dommage, la responsabilité pénale sanctionne une infraction. Pour l'exercice : action du voisin sur l'article 1240 et contre l'employeur ; validité du contrat de Camille discutée au regard de sa capacité.",
    "Le contrat de vente avec Atelier Valmontais suppose un consentement libre et éclairé, une capacité et un contenu licite et certain. Camille étant mineure, l'achat important pourrait être annulé. Pour le dommage, j'ai rappelé la charge de la preuve : celui qui réclame doit prouver.",
    "J'ai présenté le cas comme une petite consultation : faits, problème juridique, règles (articles 1103, 1128, 1240, 1353), application, conclusion. Le formateur a noté que ma conclusion sur le contrat de Camille était trop catégorique : l'annulation n'est pas automatique, elle dépend du caractère courant ou non de l'acte.",
  ],
  // 4 — Président, Gouvernement, cohabitation
  [
    "Le Président nomme le Premier ministre (article 8), dissout l'Assemblée nationale après consultation (article 12), soumet un projet de loi au référendum sur proposition du Gouvernement ou des deux assemblées (article 11). Ses pouvoirs propres sont dispensés de contreseing (article 19). Cohabitations : 1986-1988, 1993-1995, 1997-2002. Deux mandats consécutifs au plus depuis 2008.",
    "J'avais écrit que le Président est élu pour sept ans ; correction : quinquennat depuis le référendum de 2000. Pour la dissolution, élections dans les vingt à quarante jours et pas de nouvelle dissolution dans l'année. Le contreseing transfère la responsabilité au Gouvernement, responsable devant l'Assemblée nationale.",
    "J'ai présenté la cohabitation : le Président de la République et la majorité de l'Assemblée nationale sont de bords opposés, le Premier ministre vient de la majorité parlementaire et le Gouvernement conduit la politique de la Nation (article 20). Trois périodes depuis 1958. J'ai cité l'article 16 pour les pouvoirs exceptionnels.",
    "Sur le contreseing, j'ai listé les pouvoirs propres de l'article 19 : nomination du Premier ministre, référendum, dissolution, article 16, messages au Parlement, saisine du Conseil constitutionnel, nominations au Conseil constitutionnel. Le Président est élu au suffrage universel direct depuis 1962.",
    "Je pensais que le Premier ministre était élu par les députés. Correction : il est nommé par le Président, mais il doit disposer de la confiance de l'Assemblée, qui peut renverser le Gouvernement par une motion de censure. Le reste de ma copie sur les articles 8, 11 et 12 est juste.",
    "J'ai construit un schéma des relations entre le Président, le Gouvernement et le Parlement : nomination, responsabilité, dissolution. Pour la cohabitation, j'ai expliqué que le Président garde ses pouvoirs propres mais que le Gouvernement conduit la politique de la Nation. Limite des mandats : deux consécutifs, article 6.",
    "Ma réponse sur le référendum était incomplète : l'article 11 suppose une proposition du Gouvernement ou des deux assemblées, le Président ne l'organise pas seul. Dissolution, nomination du Premier ministre et cohabitation correctement expliquées.",
    "J'ai rattaché l'exercice aux dossiers des élus que je prépare : comprendre le rôle du Président et du Gouvernement m'aide à suivre l'agenda institutionnel. Articles cités : 5, 8, 11, 12, 16, 19, 20 et 21. Trois cohabitations datées sans erreur.",
  ],
  // 5 — Procédure législative, article 49, QPC
  [
    "Parcours de la loi : dépôt, commission, séance, navette entre l'Assemblée nationale et le Sénat, commission mixte paritaire de sept députés et sept sénateurs, puis dernier mot à l'Assemblée à la demande du Gouvernement (article 45). Promulgation dans les quinze jours. Article 49 alinéa 3 : texte adopté sauf motion de censure ; limité depuis 2008 aux textes budgétaires et à un autre texte par session.",
    "J'ai bien décrit la motion de censure : signée par un dixième des députés, adoptée à la majorité absolue des membres. Avant la promulgation, soixante députés ou soixante sénateurs saisissent le Conseil constitutionnel (article 61). Après, Camille peut poser une question prioritaire de constitutionnalité devant son juge.",
    "Pour la question prioritaire de constitutionnalité, j'ai décrit les filtres : le juge du procès transmet à la Cour de cassation ou au Conseil d'État, qui renvoie au Conseil constitutionnel. La disposition jugée contraire à la Constitution est abrogée à compter de la publication ou d'une date fixée (article 62). J'avais oublié la commission mixte paritaire dans la navette.",
    "J'ai confondu au départ la proposition et le projet de loi : le projet vient du Gouvernement, la proposition des parlementaires. Le reste est juste : navette, commission mixte paritaire, dernier mot de l'Assemblée, contrôle a priori du Conseil constitutionnel et question prioritaire depuis 2010.",
    "Mon schéma du parcours de la loi a été repris par le formateur comme exemple. Pour l'article 49 alinéa 3, j'ai indiqué la délibération préalable du Conseil des ministres et la limite de 2008. Pour la loi contestée par Camille, j'ai décrit la question prioritaire de constitutionnalité et ses effets.",
    "J'ai eu du mal sur le décompte des voix de la motion de censure : seuls les votes favorables sont recensés et il faut la majorité absolue des membres de l'Assemblée. La saisine a priori du Conseil constitutionnel par soixante parlementaires est bien expliquée ; pour Camille, j'ai décrit la question prioritaire de constitutionnalité et ses deux filtres.",
    "J'ai suivi sur le site de l'Assemblée nationale un dossier législatif réel pour illustrer la navette. Pour le cas pratique, j'ai décrit la commission mixte paritaire et le dernier mot de l'Assemblée. La question prioritaire de constitutionnalité est ouverte depuis le 1er mars 2010.",
    "Ma copie relie la procédure législative au contrôle de constitutionnalité : avant la promulgation, contrôle a priori (article 61) ; après, contrôle a posteriori par question prioritaire (article 61-1). L'article 49 alinéa 3 et la motion de censure sont correctement présentés.",
  ],
  // 6 — Collectivités territoriales, préfet
  [
    "Article 72 : communes, départements, régions, collectivités à statut particulier, collectivités d'outre-mer de l'article 74. Décentralisation : la région gère les lycées ; déconcentration : le préfet représente l'État. Le préfet ne peut pas annuler la délibération de Valmont-sur-Seine : il la défère au tribunal administratif. Le maire est élu par le conseil municipal.",
    "J'avais écrit que le préfet annule les actes illégaux ; correction : depuis 1982, il exerce un contrôle de légalité a posteriori et saisit le tribunal administratif par déféré. Libre administration : conseils élus et compétences fixées par la loi. Révision de 2003 : organisation décentralisée inscrite à l'article 1er.",
    "J'ai fait le lien avec mon poste en mairie : les délibérations sont transmises à la préfecture, et le préfet peut les déférer au tribunal administratif. Pour l'exercice, j'ai distingué décentralisation et déconcentration avec deux exemples. Repères : lois de 1982, révision de 2003, réforme des régions de 2015.",
    "Je ne savais pas que le maire est élu par le conseil municipal ; je pensais à une élection directe. Correction faite. Le reste est juste : catégories de l'article 72, libre administration, rôle du préfet comme représentant de l'État chargé du contrôle administratif et du respect des lois.",
    "Pour le gymnase de Valmont-sur-Seine, j'ai expliqué que plusieurs collectivités peuvent cofinancer un projet. Le contrôle de légalité est exercé par le préfet ; s'il estime la délibération illégale, il saisit le tribunal administratif. Décentralisation et déconcentration correctement opposées.",
    "Ma confusion entre la commune, collectivité territoriale, et la mairie, bâtiment et services, a été corrigée. Article 72 et collectivités d'outre-mer de l'article 74 cités. Le préfet de département est l'exemple type de déconcentration.",
    "J'ai présenté les grandes étapes de la décentralisation : 1982 avec la suppression de la tutelle a priori, 2003 avec l'organisation décentralisée de la République, 2015 avec la nouvelle carte des régions. Le préfet défère au juge les actes qu'il estime illégaux.",
    "J'ai construit un tableau des compétences : commune, département, région. Pour la question du préfet, ma réponse est juste : déféré préfectoral devant le tribunal administratif. Libre administration expliquée, avec la limite des compétences fixées par la loi.",
  ],
  // 7 — Citoyenneté, libertés, laïcité, recours
  [
    "Camille vote à toutes les élections ; son voisin italien, citoyen européen, vote aux municipales et aux européennes. L'interdiction de la réunion sans motif sérieux porte atteinte à la liberté de réunion : référé-liberté devant le juge administratif, décision en 48 heures. L'agent public est tenu à la neutralité, l'usager garde sa liberté de conscience. Discrimination : Défenseur des droits, saisine gratuite.",
    "J'avais répondu que le voisin italien ne pouvait voter à aucune élection ; correction : la citoyenneté européenne lui ouvre les municipales et les européennes. Pour la liberté de réunion, j'ai cité l'article L. 521-2 du Code de justice administrative et la condition d'urgence.",
    "Sur la laïcité, j'ai cité l'article 1er de la Constitution et la loi du 9 décembre 1905. J'ai distingué l'agent, soumis à la neutralité, et l'usager, libre de manifester ses convictions dans les limites de l'ordre public. Libertés fondamentales protégées aussi par la Convention européenne des droits de l'homme.",
    "J'ai préparé ma réponse comme un atelier de citoyenneté pour mon association : droits du citoyen, citoyenneté européenne, libertés, laïcité, recours. Le formateur a validé le contenu, en précisant que le Défenseur des droits est inscrit dans la Constitution depuis 2008 (article 71-1).",
    "Pour le référé-liberté, j'avais oublié la condition d'urgence ; elle est maintenant dans ma copie. Le reste est juste : atteinte grave et manifestement illégale à une liberté fondamentale, décision dans les 48 heures. Vote du voisin italien correctement expliqué.",
    "Je pensais que la laïcité interdisait tout signe religieux partout. Correction : la neutralité s'impose aux agents publics, pas aux usagers, sauf règles particulières prévues par la loi. Pour la liberté de réunion, référé-liberté devant le juge administratif.",
    "J'ai rattaché le cas à mon travail d'accompagnement : orienter vers le Défenseur des droits en cas de discrimination dans l'accès à un service public, et rappeler l'existence du référé-liberté. Les droits de vote de Camille et de son voisin sont correctement distingués.",
    "Ma copie présente les modes de scrutin en introduction, puis les quatre réponses : vote, liberté de réunion et référé-liberté, laïcité et neutralité des agents, Défenseur des droits. J'ai cité l'article 88-3 de la Constitution pour le vote des citoyens européens aux municipales.",
  ],
  // 8 — Droit européen, primauté, CEDH
  [
    "Le règlement s'applique directement ; la directive fixe un résultat et doit être transposée (article 288 du TFUE). La loi française contraire au règlement est écartée par le juge : primauté (Costa contre ENEL, 1964), effet direct (Van Gend en Loos, 1963), article 55, Jacques Vabre (1975), Nicolo (1989). Procédure législative ordinaire : proposition de la Commission, adoption par le Parlement européen et le Conseil.",
    "J'avais confondu la Cour de justice de l'Union et la Cour européenne des droits de l'homme. Correction : pour la durée excessive de son procès, Camille saisit la Cour de Strasbourg, juridiction du Conseil de l'Europe, après épuisement des recours internes ; l'article 6 de la Convention garantit le délai raisonnable. La directive non transposée relève du droit de l'Union.",
    "J'ai bien expliqué la différence entre règlement et directive. Pour la ratification, j'ai cité les articles 52, 53 et 54 : le Président ratifie, certains traités exigent une loi, et un traité contraire à la Constitution impose une révision préalable. J'avais oublié l'arrêt Nicolo, ajouté à la correction.",
    "Je n'avais aucune idée de la primauté en arrivant. Ma copie présente maintenant le raisonnement : le juge français applique le règlement européen et écarte la loi contraire, même postérieure, depuis Jacques Vabre pour le juge judiciaire et Nicolo pour le juge administratif.",
    "Pour Atelier Valmontais, j'ai repéré qu'un règlement européen sur les données personnelles s'applique directement, alors qu'une directive nécessite une loi ou un décret de transposition. J'ai présenté les institutions : Commission, Parlement européen, Conseil de l'Union, Conseil européen, Cour de justice.",
    "J'ai construit une frise de la construction européenne : CECA en 1951, Rome en 1957, Maastricht en 1992, Lisbonne signé en 2007 et en vigueur en 2009. Pour le cas pratique, la primauté du règlement et la saisine de la Cour européenne des droits de l'homme sont correctement expliquées.",
    "Ma réponse sur la procédure législative ordinaire était juste ; celle sur la Cour européenne des droits de l'homme aussi, après avoir précisé qu'elle n'appartient pas à l'Union. Le règlement et la directive sont distingués avec l'article 288.",
    "J'ai fait un tableau Union européenne et Conseil de l'Europe : 27 États contre 46, Cour de justice à Luxembourg contre Cour européenne des droits de l'homme à Strasbourg. Pour le cas pratique : primauté du règlement, directive à transposer, ratification par le Président.",
  ],
  // 9 — Juridictions et voies de recours
  [
    "Licenciement : conseil de prud'hommes, appel devant la cour d'appel, pourvoi en cassation. Permis de construire : tribunal administratif, recours pour excès de pouvoir dans les deux mois, cour administrative d'appel, Conseil d'État. Litige locatif : tribunal judiciaire. Contravention : tribunal de police ; délit : tribunal correctionnel. Conflit de compétence : Tribunal des conflits.",
    "J'avais envoyé le litige locatif devant le tribunal d'instance ; correction : le tribunal judiciaire depuis le 1er janvier 2020. Le crime puni de quinze ans relève de la cour criminelle départementale, avec des magistrats professionnels ; la cour d'assises juge notamment les crimes punis de plus de vingt ans. Aide juridictionnelle sous conditions de ressources.",
    "J'ai construit le schéma des deux ordres : judiciaire (tribunal judiciaire, conseil de prud'hommes, tribunal de commerce, juridictions pénales, cour d'appel, Cour de cassation) et administratif (tribunal administratif, cour administrative d'appel, Conseil d'État). Le Tribunal des conflits tranche entre les deux ; arrêt Blanco en 1873.",
    "Je pensais que la Cour de cassation rejugeait toute l'affaire. Correction : elle juge le droit, pas les faits, comme le Conseil d'État en cassation. Pour le litige entre deux sociétés : tribunal de commerce, appel devant la cour d'appel. Pour le refus du permis : tribunal administratif.",
    "J'ai rattaché l'exercice à mon accompagnement des usagers : l'orientation vers le bon tribunal et l'information sur l'aide juridictionnelle font partie de mes missions. Les huit situations sont correctement traitées, avec les voies de recours : appel, pourvoi, recours pour excès de pouvoir, opposition contre une décision par défaut.",
    "Ma copie distingue les juridictions pénales selon la gravité : tribunal de police pour les contraventions, tribunal correctionnel pour les délits, cour criminelle départementale et cour d'assises pour les crimes. J'ai précisé que la cour d'assises siège avec des jurés tirés au sort parmi les citoyens.",
    "J'ai hésité pour le salarié d'Atelier Valmontais entre le tribunal judiciaire et le conseil de prud'hommes ; c'est bien le conseil de prud'hommes, juridiction paritaire. Le reste est juste : tribunal administratif pour le permis, tribunal judiciaire pour le bailleur, Tribunal des conflits en cas de double incompétence.",
    "J'ai présenté les principes du procès équitable (article 6 de la Convention européenne des droits de l'homme) : tribunal indépendant et impartial, délai raisonnable, droits de la défense. Pour les situations : conseil de prud'hommes, tribunal administratif, tribunal judiciaire, tribunal de police puis tribunal correctionnel, cour criminelle départementale, tribunal de commerce.",
  ],
];

const BILANS_PERSONNELS = [
  "Cette mise en situation m'a surtout appris à citer l'article précis plutôt que de rester vague.",
  "Le plus difficile a été de tenir le temps de l'exercice ; je relirai la fiche à retenir avant la prochaine séance.",
  "J'ai repris ma copie après la correction en classe virtuelle et j'ai ajouté ce qui manquait.",
  "Je vais réutiliser cette méthode de raisonnement dans mon travail.",
  "J'ai vérifié mes réponses sur Légifrance, ce qui m'a fait corriger un oubli.",
  "Le retour du formateur m'a permis de repérer une confusion que je faisais sans m'en rendre compte.",
  "J'avais des doutes sur ce sujet en arrivant, je me sens maintenant capable de l'expliquer.",
  "Je me suis appuyé{e} sur le schéma de synthèse fourni, que je garderai.",
  "Je n'ai pas eu le temps de tout détailler, mais l'essentiel est là.",
  "J'ai posé une question au formateur pendant la séance, ce qui m'a évité une erreur de qualification.",
  "J'ai ajouté les notions nouvelles à mon glossaire juridique.",
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
  if (/hi[ée]rarchie/i.test(t)) return 0;
  if (/entr[ée]e en vigueur|r[ée]troactivit|domaine de la loi/i.test(t)) return 1;
  if (/branche|qualifier/i.test(t)) return 2;
  if (/contrat|responsabilit[ée] civile/i.test(t)) return 3;
  if (/Pr[ée]sident|cohabitation/i.test(t)) return 4;
  if (/l[ée]gislative|constitutionnalit[ée]|article 49/i.test(t)) return 5;
  if (/collectivit|pr[ée]fet|d[ée]centralisation/i.test(t)) return 6;
  if (/citoyennet|libert|la[iï]cit/i.test(t)) return 7;
  if (/europ[ée]en|primaut|directive/i.test(t)) return 8;
  if (/juridiction|recours|tribunal/i.test(t)) return 9;
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickDRI47ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isDRI47Formation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);
  const bloc = blocExercice(contexte || "", exerciceIdx);

  // Production tirée par permutation du rang du stagiaire, avec le même décalage pour toutes les
  // banques ; sur un groupe de 8 stagiaires, les 8 productions d'un même exercice sont toutes
  // différentes. Le bilan personnel change d'un exercice à l'autre. L'entreprise du stagiaire est
  // citée quand elle est renseignée.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[rang(stagiaireIdx, 3, pool.length)];
  const bilan = BILANS_PERSONNELS[rang(stagiaireIdx, bloc + 11, BILANS_PERSONNELS.length)];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai rapproché le cas pratique de situations rencontrées chez ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "BTS Support à l'action managériale",
  "Baccalauréat général, puis expérience dans l'administration",
  "Licence d'histoire",
  "BTS Gestion de la PME",
  "Baccalauréat professionnel Assistance à la gestion des organisations et de leurs activités",
  "Licence de sciences politiques, sans spécialisation juridique",
  "DUT Gestion des entreprises et des administrations",
  "Master de lettres modernes",
  "BTS Négociation et digitalisation de la relation client",
  "Baccalauréat STMG",
  "Licence de langues étrangères appliquées",
  "Diplôme d'école de commerce",
  "CAP, puis longue expérience professionnelle dans le commerce",
  "Licence professionnelle Métiers de la gestion des ressources humaines",
  "Aucun diplôme supérieur : expérience professionnelle dans le secteur associatif",
  "Diplôme d'ingénieur, sans formation juridique",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant chaque séance.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières pendant les classes virtuelles me conviennent.",
  "Non. Je porte des lunettes et j'apprécie des supports en police suffisamment grande à l'écran.",
  "Non, pas de handicap. J'utilise un casque pour bien entendre pendant les classes virtuelles.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je préfère que les schémas soient envoyés en PDF pour pouvoir les agrandir.",
  "Non, aucune situation de handicap. Je signalerai au formateur toute difficulté de connexion.",
  "Non. Je préfère avoir les fiches en format numérique pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté avant la formation.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible pour suivre les <strong>47 heures</strong> de classe virtuelle aux horaires fixés, depuis mon domicile, avec une connexion stable.",
  "Je bloque les créneaux des classes virtuelles dans mon agenda pour suivre l'intégralité des <strong>47 heures</strong> ; je me connecte depuis un bureau au calme.",
  "Je peux suivre toutes les séances en classe virtuelle (Google Meet / Zoom) sur la période de la formation, soit <strong>47 heures</strong>.",
  "Je suis disponible sur toute la période de la formation pour les <strong>47 heures</strong> de classe virtuelle, sans contrainte particulière.",
  "J'ai posé des congés pour suivre l'ensemble des <strong>47 heures</strong> de classe virtuelle dans de bonnes conditions.",
  "Disponibilité complète pour les <strong>47 heures</strong> de formation à distance. J'ai testé ma connexion et mon micro avant la première séance.",
  "Je suivrai les <strong>47 heures</strong> de classe virtuelle depuis mon domicile et je prévois un temps de relecture des supports entre les séances.",
  "Je suis disponible pour toutes les séances à distance ; mon employeur a validé mon absence de poste pendant les <strong>47 heures</strong> de formation.",
  "Les créneaux de classe virtuelle me conviennent : je suivrai l'intégralité des <strong>47 heures</strong> et je consulterai les ressources en ligne entre les séances.",
  "Aucune contrainte sur les horaires des classes virtuelles ; je suivrai les <strong>47 heures</strong> depuis un ordinateur équipé d'une webcam et d'un micro.",
];

/** Réponses d'évaluation des besoins propres à la formation, différentes pour chaque stagiaire. */
export function getDRI47EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = dri47Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilDRI47(idx, s.nom, s.prenom);
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
      ? "Formation financée par l'entreprise dans le cadre de son plan de développement des compétences."
      : "Financement personnel",
    projetPro: entAccords(profil.projet, fem),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
