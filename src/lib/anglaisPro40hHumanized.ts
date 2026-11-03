// ---------------------------------------------------------------------------
// « Anglais Professionnel – 40 h » — moteur de réponses HUMANISÉES
// Formation professionnelle sans titre visé : évaluation interne + attestation de fin de formation.
// 40 h sur 6 jours (5 × 7 h + 1 × 5 h), présentiel dans les locaux de l'entreprise cliente.
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes de
//     l'entreprise…), puis parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes : diagnostic puis C1 à C6, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par exercice + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// ---------------------------------------------------------------------------

/**
 * Vrai pour la formation exemple « Anglais Professionnel – 40 h ».
 * Seule la mention « 40 h » (ou « 40h ») dans un intitulé contenant « anglais » déclenche ce moteur.
 */
export function isANG40Formation(intitule?: string, code?: string): boolean {
  void code;
  const t = (intitule || "").toLowerCase();
  return t.includes("anglais") && /\b40\s?h\b/.test(t);
}

const normalize = (s: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function ang40Seed(nom?: string, prenom?: string): number {
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

/** {e} → e au féminin ; {le} → le ; {/ve} → ve ; {/se} → se ; {/rice} → rice (sinon eur) */
function accorder(txt: string, fem: boolean): string {
  return txt
    .replace(/\{\/rice\}/g, fem ? "rice" : "eur")
    .replace(/\{\/ve\}/g, fem ? "ve" : "")
    .replace(/\{\/se\}/g, fem ? "se" : "")
    .replace(/\{le\}/g, fem ? "le" : "")
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
  typeof idx === "number" && idx >= 0 ? idx : ang40Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// diagnostic, C1 présentation, C1 glossaire, C2 email, C2 ordre du jour / compte rendu,
// C3 téléphone, C3 visioconférence, C4 réunion, C5 présentation, C6 négociation
// ---------------------------------------------------------------------------
export const ANG40_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Dans quelles situations utilisez-vous l'anglais au travail aujourd'hui, et comment évalueriez-vous votre niveau à l'écrit et à l'oral ?", reponseAttendue: "Inventaire des usages réels (emails, téléphone, visioconférences, réunions, salons, documentation), fréquence, interlocuteurs, auto-évaluation distincte pour la compréhension et l'expression, à l'écrit et à l'oral, en se situant sur l'échelle du CECRL (A1 à C2) et en citant des difficultés concrètes." },
    { question: "Comment vous présenteriez-vous, vous et votre entreprise, à un partenaire étranger en anglais ?", reponseAttendue: "Nom, poste et missions, activité de l'entreprise, chiffres clés (effectif, chiffre d'affaires, marchés), localisation, avec les bonnes structures : « I'm a… », « We design and manufacture… », « I've been working here since… », et une question pour lancer l'échange." },
    { question: "Quel vocabulaire de votre métier connaissez-vous en anglais, et quels temps utilisez-vous pour parler d'un fait passé, d'une situation actuelle et d'un projet ?", reponseAttendue: "Vocabulaire métier précis (commande, délai, facture, livraison, panne…), prétérit pour un fait daté, present perfect pour un résultat actuel ou une durée, present continuous pour ce qui est en cours, « will » et « going to » pour le futur, modaux de politesse et faux amis courants." },
    { question: "Comment rédigeriez-vous un email professionnel en anglais pour annoncer un retard, relancer un client ou répondre à une réclamation ?", reponseAttendue: "Salutation adaptée (Dear Mr / Ms, prénom), objet annoncé en une phrase (I am writing to…), une idée par paragraphe, ton courtois et factuel, solution proposée, demande claire, formule de fin (Kind regards), relecture des temps, des pluriels et des montants." },
    { question: "Savez-vous préparer un ordre du jour et rédiger un compte rendu de réunion en anglais ?", reponseAttendue: "Ordre du jour numéroté envoyé à l'avance, avec agenda et AOB, compte rendu (minutes) court envoyé rapidement : participants, décisions au passé, risques, action points avec responsable et échéance, formules « We agreed on… », « It was decided that… »." },
    { question: "Comment vous débrouillez-vous au téléphone en anglais : décrocher, faire répéter, prendre ou laisser un message ?", reponseAttendue: "Décrocher avec le nom de l'entreprise, faire répéter et épeler poliment (Could you say that again, please?), noter nom, société, numéro, objet et délai, relire le message, laisser un message vocal court et structuré, préciser le fuseau horaire, conclure en résumant." },
    { question: "Comment préparez-vous et menez-vous une visioconférence en anglais ?", reponseAttendue: "Ordre du jour et invitation avec les fuseaux horaires, test du matériel, document partagé ; ouverture, distribution de la parole, gestion des incidents techniques (you're on mute, you froze), utilisation du chat pour les chiffres, synthèse et envoi du compte rendu." },
    { question: "En réunion en anglais, comment donnez-vous votre avis, reformulez-vous ce qui est dit ou exprimez-vous un désaccord ?", reponseAttendue: "Reformuler (If I understand correctly…), argumenter avec des faits et des chiffres, approuver (That's a good point), réfuter avec diplomatie (I see your point, but… / I'm afraid that won't be possible), proposer une alternative, solliciter l'avis des autres." },
    { question: "Comment présenteriez-vous un projet ou des résultats en anglais avec un support visuel ?", reponseAttendue: "Accroche, plan annoncé (First… then… finally…), slides sobres, transitions (Let's move on to…), commentaire de graphiques avec increase / decrease by, conclusion et appel aux questions, gestion du temps, du regard et du débit, réponses aux questions en anglais." },
    { question: "Comment réagiriez-vous en anglais face à l'objection d'un client ou à la réclamation d'un partenaire étranger ?", reponseAttendue: "Écouter et reformuler, s'excuser sans rejeter la faute, proposer une solution, répondre à l'objection par un argument de valeur, concession conditionnelle (If you…, we could…), recherche de compromis, résumé de l'accord, formules à éviter (Calm down, It's not our fault)." },
  ],
  fin: [
    { question: "Quel diagnostic de départ aviez-vous établi sur vos usages de l'anglais et votre niveau, et comment avez-vous progressé ?", reponseAttendue: "Usages et niveau de départ situés sur le CECRL, erreurs récurrentes identifiées, priorités de travail, comparaison des productions du premier et du dernier jour, progrès constatés avec des exemples de phrases, points restant à travailler et moyens prévus." },
    { question: "Comment vous présentez-vous désormais, vous et votre entreprise, à un partenaire étranger ?", reponseAttendue: "Présentation de 30 à 60 secondes : poste et rôle, activité, chiffres clés, marchés, preuve ou valeur, present perfect pour l'ancienneté, articles devant les métiers, question finale pour engager la conversation, adaptée au client, au fournisseur ou au candidat." },
    { question: "Quel glossaire métier avez-vous construit et quelles structures grammaticales maîtrisez-vous maintenant ?", reponseAttendue: "Glossaire de 40 à 50 termes de son métier classés par thème, choix du temps selon la situation (prétérit, present perfect, going to, will), voix passive, conditionnel pour négocier, prépositions de temps, modaux de politesse, faux amis corrigés." },
    { question: "Comment construisez-vous aujourd'hui un email professionnel complexe en anglais ?", reponseAttendue: "Salutation adaptée, phrase d'objet (I am writing to…), une idée par paragraphe, mauvaise nouvelle annoncée avec excuse et solution, demande adoucie (We would appreciate…), formule de fin, formules trop françaises évitées, ponctuation anglaise des montants, relecture." },
    { question: "Comment préparez-vous un ordre du jour et rédigez-vous un compte rendu de réunion en anglais ?", reponseAttendue: "Agenda numéroté avec AOB et durées, minutes envoyées le jour même : participants, décisions au passé, risques, action points avec responsable et date, formules de décision, demande de validation (Please let me know if I missed anything)." },
    { question: "Comment gérez-vous maintenant un appel téléphonique en anglais, pour prendre ou laisser un message ?", reponseAttendue: "Accueil avec le nom de l'entreprise, faire répéter et épeler, fiche message (nom, société, numéro, objet, délai), relecture du message, message vocal structuré en moins de 30 secondes, fuseau horaire précisé, transfert d'appel, conclusion par un résumé." },
    { question: "Comment préparez-vous et animez-vous une visioconférence en anglais ?", reponseAttendue: "Invitation avec les deux fuseaux horaires, ordre du jour, test technique, ouverture et cadrage du temps, distribution de la parole, gestion des coupures et des micros, partage d'écran commenté, chat pour les chiffres, synthèse finale et compte rendu." },
    { question: "Quelles formules utilisez-vous en réunion pour reformuler, argumenter, approuver et réfuter avec diplomatie ?", reponseAttendue: "If I understand correctly…, I see your point, but…, That's a good point, I'm afraid that won't be possible, With respect, I'd suggest…, What if we…?, What do you think?, arguments appuyés sur des faits et des chiffres, ton non accusateur." },
    { question: "Comment structurez-vous une présentation professionnelle appuyée sur des diapositives ?", reponseAttendue: "Accroche, plan annoncé, une idée par slide avec peu de texte, transitions, commentaire de graphique avec pourcentages (increased by 12 %), conclusion et questions, temps maîtrisé, regard vers le public, réponses aux questions en anglais." },
    { question: "Comment conduisez-vous une négociation et traitez-vous une réclamation d'un partenaire international ?", reponseAttendue: "Préparation de sa limite et de ses concessions, écoute et reformulation, excuse et solution, réponse aux objections par la valeur, concession conditionnelle, compromis (meet halfway), résumé de l'accord, formules à éviter et silences assumés." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Ordre : diagnostic, C1 présentation, C1 glossaire, C2 email, C2 compte rendu, C3 téléphone,
// C3 visioconférence, C4 réunion, C5 présentation, C6 négociation.
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle, 1 = juste.
// Une seule réponse à 1 dans deux questions seulement (C1 glossaire et C3 téléphone) : au plus 6 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — diagnostic des usages et du niveau
  [
    ["J'utilise l'anglais seulement pour lire des emails, avec le traducteur. Je ne sais pas du tout quel est mon niveau.", 0],
    ["Au travail, je réponds à quelques emails simples, du genre « Thank you, I send you the document ». À l'oral, je laisse un collègue parler.", 0.5],
    ["J'ai fait de l'anglais au lycée, mais ça fait vingt ans. Je dirais débutant, peut-être un peu plus en compréhension écrite.", 0],
    ["Je me débrouille à l'écrit, je comprends les devis et les commandes. À l'oral je bloque dès que ça va vite. Je pense être A2.", 0.5],
    ["Je ne savais pas qu'il existait des niveaux, du A1 au C2. Je pensais qu'on parlait anglais ou pas.", 0],
    ["Je téléphone parfois à des clients étrangers, mais je prépare toutes mes phrases par écrit avant. Mon niveau, je ne sais pas trop, moyen ?", 0.5],
    ["Mon manager dit que mon anglais est « scolaire ». Je comprends à peu près, mais je ne fais pas de phrases complètes.", 0.5],
    ["Je n'utilise presque jamais l'anglais, sauf sur les salons une fois par an. Là, je fais beaucoup de gestes.", 0],
    ["En réunion avec le groupe, je comprends le sujet général mais pas les détails. Quand on me pose une question, je réponds « yes » même si je n'ai pas tout compris.", 0.5],
    ["Je lis la documentation technique en anglais sans trop de problème, c'est le vocabulaire de mon métier. Parler, c'est autre chose.", 0.5],
    ["Le niveau A2, je crois que c'est pour les touristes. Je n'ai jamais fait de test.", 0],
    ["J'écris en anglais tous les jours mais avec beaucoup de copier-coller d'anciens emails. Je n'ose pas écrire quelque chose de nouveau.", 0.5],
  ],
  // Q2 — C1 se présenter et présenter son entreprise
  [
    ["Je dirais « My name is… I work in the company since five years ». Je sais que ce n'est pas tout à fait juste.", 0.5],
    ["Je ne saurais pas présenter mon entreprise, je ne connais pas les mots pour le secteur ni pour les chiffres.", 0],
    ["« Hello, I am the responsible of the logistic. » Pour l'entreprise, je dirais juste le nom et la ville.", 0.5],
    ["Je donnerais ma carte de visite et je dirais « Nice to meet you ». Après, je ne saurais pas continuer.", 0],
    ["Je sais dire mon nom et mon poste. Pour l'entreprise, je dirais « We make… » mais je ne connais pas le verbe pour notre activité.", 0.5],
    ["Je présenterais l'entreprise en français et je demanderais à un collègue de traduire.", 0],
    ["Je ne sais pas dire le chiffre d'affaires ni le nombre de salariés en anglais. Je confonds « million » et « billion ».", 0],
    ["« I am buyer in a company of plastic. » Je sais que c'est maladroit mais on me comprend.", 0.5],
    ["Je réciterais un texte appris par cœur, mais si on me pose une question, je serais perdu{e}.", 0.5],
    ["Je pense qu'il suffit de dire son nom ; l'entreprise, l'autre personne la connaît déjà.", 0],
    ["Je connais « We are based in Lyon » et « We have 50 employees », c'est à peu près tout.", 0.5],
    ["En visio avec des étrangers, je ne me présente pas, c'est mon chef qui le fait.", 0],
  ],
  // Q3 — C1 vocabulaire métier et temps
  [
    ["Je connais quelques mots de mon métier, comme « order » ou « invoice », mais je ne fais pas attention aux temps.", 0.5],
    ["Je parle toujours au présent, même pour le passé. Les gens comprennent avec le contexte.", 0],
    ["Pour le passé, je mets « -ed » à la fin des verbes. Je sais qu'il y a des verbes irréguliers mais je les ai oubliés.", 0.5],
    ["Je ne connais pas le vocabulaire de mon métier en anglais, je cherche chaque mot sur internet.", 0],
    ["Le present perfect, je n'ai jamais compris quand on l'utilise par rapport au prétérit.", 0],
    ["J'utilise « will » pour le futur, c'est le seul que je connais.", 0.5],
    ["Le prétérit sert pour une action terminée à un moment précis, « We shipped the order yesterday » ; le present perfect pour un résultat actuel, « We have received your payment » ; « going to » pour un projet décidé. Je connais bien le vocabulaire de mes commandes, mais je manque d'aisance à l'oral.", 1],
    ["Je mélange souvent « do » et « make ». Le vocabulaire technique, je l'ai appris sur le tas.", 0.5],
    ["Je pense que « actually » veut dire « actuellement ».", 0],
    ["Je connais une vingtaine de mots de mon métier, mais je ne sais pas toujours les prononcer.", 0.5],
    ["Les verbes irréguliers, j'en connais quelques-uns : « go, went », « buy, bought ». Pas assez pour parler naturellement.", 0.5],
    ["Je ne sais pas faire une question en anglais avec « do », je ne sais jamais où le mettre.", 0],
  ],
  // Q4 — C2 email professionnel
  [
    ["Je commence par « Hello » et je termine par « Thanks ». Entre les deux, je fais des phrases très courtes.", 0.5],
    ["J'utilise un traducteur automatique pour tout l'email, puis je l'envoie sans relire.", 0],
    ["Je sais qu'on commence par « Dear », mais je ne sais pas quand mettre « Mr » ou le prénom.", 0.5],
    ["Je copie un ancien email et je change les chiffres. Si la situation est nouvelle, je demande à un collègue.", 0.5],
    ["Je ne sais pas comment relancer poliment un client qui ne paie pas, j'ai peur d'être trop direct{e}.", 0],
    ["J'écris « I write you for… » au début de mes emails, je pense que c'est correct.", 0],
    ["Je connais « Please find attached » et « Best regards », ce sont mes deux phrases sûres.", 0.5],
    ["Pour moi, un email en anglais a la même structure qu'en français, je traduis mot à mot.", 0],
    ["Je n'écris jamais d'email en anglais, mon responsable s'en charge.", 0],
    ["Je fais des emails très longs pour être sûr{e} d'être compris{e}, avec beaucoup d'excuses.", 0],
    ["J'essaie de mettre une idée par paragraphe, mais je ne connais pas les formules pour annoncer une mauvaise nouvelle.", 0.5],
    ["Je sais que « Yours faithfully » existe, mais je ne sais pas quand l'utiliser.", 0.5],
  ],
  // Q5 — C2 ordre du jour et compte rendu
  [
    ["Je n'ai jamais rédigé de compte rendu en anglais. En français, je fais une liste de ce qui a été dit.", 0],
    ["Je ne connais pas le mot « agenda » dans ce sens, je pensais que c'était l'agenda des rendez-vous.", 0],
    ["Pour un ordre du jour, je mettrais une liste de points numérotés, avec des mots simples comme « prices » ou « delivery ».", 0.5],
    ["Le compte rendu, c'est le chef de projet qui le fait. Moi je prends quelques notes en français.", 0],
    ["Je sais qu'il faut noter les décisions, mais je ne sais pas les écrire en anglais au passé.", 0.5],
    ["J'ai déjà vu « minutes » en haut d'un document anglais, je ne savais pas que ça voulait dire compte rendu.", 0.5],
    ["Je résumerais la réunion en deux lignes, je ne vois pas l'intérêt de détailler.", 0],
    ["J'enverrais le compte rendu en français, les participants peuvent le traduire.", 0],
    ["Je sais qu'il faut écrire qui fait quoi et pour quand, je ne connais pas l'expression en anglais.", 0.5],
    ["Je note « next steps » à la fin, comme dans les emails que je reçois de nos clients.", 0.5],
    ["Je ne prends jamais de notes en réunion en anglais, je suis déjà concentré{e} pour comprendre.", 0],
    ["Je copierais le modèle d'un collègue anglais, mais je ne saurais pas écrire les phrases moi-même.", 0.5],
  ],
  // Q6 — C3 téléphone
  [
    ["Quand le téléphone sonne et que c'est en anglais, je passe l'appel à un collègue.", 0],
    ["Je dis « Hello » puis « Wait please » et je cherche quelqu'un.", 0],
    ["Je sais dire « Can you repeat please? » mais je le dis cinq fois dans la conversation.", 0.5],
    ["Prendre un message, je saurais noter le nom si on me l'épelle lentement, mais pas le numéro de téléphone.", 0.5],
    ["Je décroche avec le nom de l'entreprise et « How can I help you? », je fais répéter poliment avec « Could you say that again, please? », je note le nom, le numéro et l'objet, puis je relis le message : « So, you'd like Mr Martin to call you back before Friday? ». Je le fais, mais avec beaucoup de stress.", 1],
    ["Laisser un message sur un répondeur en anglais, je n'ai jamais osé, je raccroche.", 0],
    ["Je comprends mieux en face à face qu'au téléphone, parce que je vois la personne.", 0.5],
    ["Je ne connais pas bien l'alphabet en anglais, je confonds le E et le I quand on épelle.", 0.5],
    ["Je prépare toutes mes phrases par écrit, mais si la personne dit quelque chose d'imprévu, je suis perdu{e}.", 0.5],
    ["Je pense qu'il faut parler fort et lentement pour être compris{e}, même si c'est l'autre qui ne parle pas bien.", 0],
    ["Je dis « I call you back » quand je n'ai pas compris, et je rappelle rarement.", 0],
    ["Je n'ai jamais téléphoné en anglais, je ne sais pas du tout comment je réagirais.", 0],
  ],
  // Q7 — C3 visioconférence
  [
    ["En visio, je coupe ma caméra et mon micro et j'écoute. Je ne parle que si on me pose une question directe.", 0.5],
    ["Je ne prépare pas les visios, je me connecte à l'heure et je découvre le sujet.", 0],
    ["Je sais dire « Can you hear me? », c'est à peu près tout.", 0.5],
    ["Quand la connexion coupe, je ne sais pas comment demander de répéter, alors je fais semblant d'avoir compris.", 0],
    ["Je préfère la visio au téléphone parce qu'on peut écrire dans le chat. J'écris souvent mes questions plutôt que de les dire.", 0.5],
    ["Je n'ai jamais mené de visio en anglais, j'y ai seulement assisté.", 0],
    ["Je sais partager mon écran, mais je ne sais pas présenter ce que je montre en anglais.", 0.5],
    ["Je pense que la visio c'est comme une réunion normale, pas besoin de préparer davantage.", 0],
    ["Je prépare une feuille avec les mots-clés à côté de l'écran, mais je n'ose pas couper la parole.", 0.5],
    ["Je me suis déjà trompé{e} d'heure pour une visio avec les États-Unis, à cause du décalage horaire.", 0],
    ["Je dis « Sorry, sorry » quand je veux parler, mais personne ne me laisse la place.", 0.5],
    ["Je ne vois pas la différence entre animer une visio et y participer.", 0],
  ],
  // Q8 — C4 réunion
  [
    ["En réunion, je ne donne pas mon avis en anglais, j'ai peur de faire des fautes devant les autres.", 0],
    ["Je dis « I agree » ou « I don't agree », sans expliquer pourquoi.", 0.5],
    ["Je dis souvent « I am agree », je ne savais pas que c'était faux.", 0],
    ["Pour reformuler, je répète exactement ce que la personne a dit, avec un ton de question.", 0.5],
    ["Je ne sais pas exprimer un désaccord poliment, alors je me tais même si je ne suis pas d'accord.", 0],
    ["Je connais « I think that… » pour donner mon avis, c'est tout.", 0.5],
    ["Je pense qu'en anglais on peut être direct, donc je dis « No, it's not possible » sans problème.", 0],
    ["J'ai déjà entendu « I see your point, but… » chez un collègue, je trouve ça bien mais je ne l'utilise pas.", 0.5],
    ["Je ne comprends pas assez vite pour réagir au bon moment, la discussion est déjà passée à autre chose.", 0.5],
    ["Je prépare mes arguments par écrit, mais je n'ose pas les placer.", 0.5],
    ["Je ne vois pas pourquoi il faudrait des formules de politesse en réunion, c'est une perte de temps.", 0],
    ["Quand je ne suis pas d'accord, je l'écris par email après la réunion, en français.", 0],
  ],
  // Q9 — C5 présentation
  [
    ["Je n'ai jamais présenté en anglais. Je lirais mes slides mot à mot.", 0],
    ["Je mettrais tout le texte sur les slides pour ne rien oublier.", 0],
    ["Je sais dire « Today I will present… », mais après je ne connais pas les transitions.", 0.5],
    ["Pour commenter un graphique, je ne connais pas les verbes pour dire augmenter ou baisser.", 0],
    ["Je connais « increase » et « decrease », mais je ne sais pas les utiliser avec des pourcentages.", 0.5],
    ["Je préparerais un texte complet et je l'apprendrais par cœur.", 0.5],
    ["Je ne sais pas comment terminer une présentation, à part « That's all ».", 0.5],
    ["Je pense qu'une présentation en anglais doit être longue pour paraître sérieuse.", 0],
    ["J'ai déjà présenté en anglais sur un salon, mais je parlais très vite pour finir le plus tôt possible.", 0.5],
    ["Quand on me pose une question après la présentation, je réponds en français.", 0],
    ["Je ne sais pas prononcer les chiffres et les dates en anglais, ça me bloque.", 0],
    ["Je ferais une présentation très visuelle, avec peu de mots, mais je ne sais pas quoi dire entre deux slides.", 0.5],
  ],
  // Q10 — C6 négociation, objections et réclamations
  [
    ["Si un client dit que c'est trop cher, je propose tout de suite une remise.", 0],
    ["Je ne négocie jamais en anglais, je transfère à mon responsable.", 0],
    ["Face à une réclamation, je m'excuse beaucoup, « Sorry, sorry », mais je ne propose pas de solution.", 0.5],
    ["Je sais qu'il faut écouter le client avant de répondre, mais en anglais je n'arrive pas à le suivre.", 0.5],
    ["Je dirais « It's not my fault » si ce n'est pas notre erreur.", 0],
    ["Je connais « discount » et « price », mais je ne sais pas faire une proposition sous condition.", 0.5],
    ["Quand un partenaire est en colère, je raccroche et je réponds par email le lendemain.", 0],
    ["Je pense qu'il faut toujours dire oui au client étranger pour garder le marché.", 0],
    ["J'ai déjà dû gérer une réclamation en anglais : j'ai répondu par écrit avec le traducteur, ça m'a pris une journée.", 0.5],
    ["Je sais dire « We will check and come back to you », ça me laisse du temps.", 0.5],
    ["Une objection, je ne sais pas exactement ce que c'est dans une négociation.", 0],
    ["Je reformule la plainte du client en français dans ma tête, mais je ne trouve pas les mots en anglais.", 0.5],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["Mon diagnostic de départ montrait un niveau A2 à l'oral et B1 à l'écrit. Après six jours, je mène un appel complet sans préparer chaque phrase, par exemple « Let me check and call you back within the hour ».", 1],
    ["Au départ, j'écrivais surtout par copier-coller. Aujourd'hui je rédige mes emails moi-même et je sais écrire « I'm writing to follow up on our order ».", 1],
    ["Mon diagnostic montrait que je bloquais au téléphone. J'ai travaillé ce point en priorité et je sais maintenant faire répéter poliment : « Could you speak a bit more slowly, please? ».", 1],
    ["J'ai identifié mes trois usages principaux : emails clients, visios avec le groupe, salons. Ce sont ceux que j'ai travaillés pendant les exercices.", 0.5],
    ["Je me situais entre A2 et B1 ; je pense être aujourd'hui B1 à l'écrit et en progrès à l'oral, surtout en réunion.", 0.5],
    ["Le diagnostic m'a fait prendre conscience de mes erreurs récurrentes, comme « I am agree » ; je les ai listées et je les corrige à la relecture.", 1],
    ["Mon objectif de départ était de tenir une visio de suivi en anglais ; je l'ai fait en simulation, avec ordre du jour et compte rendu.", 1],
    ["J'ai comparé mes productions du premier et du dernier jour : phrases plus longues, temps mieux choisis, beaucoup moins de traducteur.", 1],
    ["Mon point faible reste la compréhension des accents américains rapides ; j'ai prévu des podcasts professionnels pour progresser.", 0.5],
    ["Au départ, je disais « yes » sans comprendre. Maintenant je reformule : « So, if I understand correctly, you need the parts by Friday? ».", 1],
    ["Le diagnostic a servi de base à mon plan de progression : téléphone, réunion, négociation, dans cet ordre.", 0.5],
    ["Je sous-estimais mon niveau au départ ; le diagnostic a montré une bonne base en compréhension écrite, sur laquelle je me suis appuyé{e}.", 0.5],
  ],
  [
    ["« I'm the export sales assistant at Agrimeca, a family company that designs and manufactures haymaking equipment. We have 85 employees and we export 40 % of our production. »", 1],
    ["Je présente l'entreprise en trois points : activité, chiffres, marchés. « We specialise in plastic injection moulding, with a turnover of 28 million euros. »", 1],
    ["J'utilise le present perfect pour mon parcours : « I've been working here since 2019 », et plus « I work here since 2019 ».", 1],
    ["Je termine ma présentation par une question pour lancer l'échange : « How long have you been working with French suppliers? ».", 1],
    ["Je présente mon rôle sans m'excuser de mon anglais : « I'm your main point of contact for spare parts. »", 1],
    ["Je sais donner les chiffres de l'entreprise : « We have 210 employees and two plants. »", 0.5],
    ["J'ai remplacé « We are leader on this market » par « We are one of the leading suppliers in Europe ».", 1],
    ["J'épelle le nom de l'entreprise avec l'alphabet radio, très utile pour un premier contact au téléphone.", 0.5],
    ["Ma présentation tient en 45 secondes et je l'adapte selon que je parle à un client, à un fournisseur ou à un candidat.", 1],
    ["« We are a software publisher based in Toulouse; we help logistics companies plan their teams and their warehouses. »", 1],
    ["Je mets l'article devant le métier : « I'm a technician », « I'm a buyer ».", 0.5],
    ["Je présente l'entreprise avec une preuve concrète : « We deliver within 48 hours anywhere in Europe. »", 1],
  ],
  [
    ["Mon glossaire compte 45 mots : « lead time », « purchase order », « credit note », « due date »… je les utilise dans mes emails.", 1],
    ["Je choisis le temps selon la situation : « We shipped the goods yesterday » au prétérit, « The payment has been received » au present perfect.", 1],
    ["J'utilise « going to » pour un plan décidé : « We are going to deliver the first batch in March. »", 1],
    ["Je connais maintenant les faux amis : « actually » veut dire « en fait », « eventually » veut dire « finalement ».", 1],
    ["La voix passive m'aide à rester neutre : « The invoice was paid on 3 May. »", 1],
    ["J'ai corrigé « The goods has been shipped » : « goods » est pluriel, donc « have ».", 0.5],
    ["Le conditionnel me sert pour négocier : « If you ordered 20 tons, we could offer a discount. »", 1],
    ["Les prépositions de temps sont maîtrisées : « on Monday », « at 9 am », « by Friday », « within 48 hours ».", 1],
    ["J'utilise les modaux de politesse : « Could you…? », « Would it be possible to…? ».", 1],
    ["Je fais encore des erreurs sur les verbes irréguliers, mais je les repère à la relecture.", 0.5],
    ["J'ai partagé mon glossaire avec l'équipe et nous l'enrichissons chaque semaine.", 0.5],
    ["L'impératif avec « please » pour les consignes techniques : « Please switch off the machine and wait ten seconds. »", 1],
  ],
  [
    ["Structure : salutation, objet en une phrase, détails, demande claire, formule de fin. « I am writing to inform you that the shipment will be delayed. »", 1],
    ["Pour une mauvaise nouvelle : « Unfortunately… We sincerely apologise for the inconvenience. », suivi d'une solution concrète.", 1],
    ["J'adapte la salutation : « Dear Mr Nowak » pour un premier contact, « Dear Sarah » quand on se connaît.", 1],
    ["J'ai remplacé « I write you because » par « I am writing to… ».", 0.5],
    ["Pour adoucir une demande : « We would appreciate it if you could confirm the new date. »", 1],
    ["Une idée par paragraphe, des phrases courtes, et une seule demande claire à la fin de l'email.", 1],
    ["Je relance sans agressivité : « I'm just following up on my email of 3 May regarding invoice 2318. »", 1],
    ["Je reste factuel{le} dans une réclamation : « Three pallets were damaged, as shown on the attached photos. »", 1],
    ["J'évite les formules trop françaises comme « remain at your disposal » et j'écris « Please let me know if you have any questions ».", 1],
    ["Je relis mes emails en vérifiant les temps et les pluriels avant l'envoi.", 0.5],
    ["Formules de fin : « Kind regards » ou « Best regards » ; « Yours sincerely » pour un courrier très formel.", 0.5],
    ["J'écris les montants avec la ponctuation anglaise : « 1,250 USD », « 6.40 EUR per m² ».", 1],
  ],
  [
    ["Ordre du jour numéroté avec « AOB » à la fin ; compte rendu en trois parties : décisions, risques, « action points » avec responsable et date.", 1],
    ["J'écris le compte rendu au passé pour ce qui a été dit et au futur pour les actions : « The supplier will add a quality check. »", 1],
    ["« Agreed action points: send the updated catalogue, me, by 20 October. » Chaque action a un nom et une échéance.", 1],
    ["J'utilise « We agreed on… » et « It was decided that… » pour les décisions.", 1],
    ["J'envoie le compte rendu le jour même, en moins d'une page.", 0.5],
    ["Je résume au lieu de tout recopier : « 14 breakdowns, 9 of them due to the same sensor. »", 1],
    ["Mon modèle d'ordre du jour sert maintenant pour toutes mes réunions avec le groupe.", 0.5],
    ["Le mot « minutes » pour le compte rendu, « attendees » pour les participants, « next steps » pour la suite.", 1],
    ["Je prends des notes en anglais pendant la réunion, avec des abréviations.", 0.5],
    ["Je mets les absents en copie avec « For your information » en tête du message.", 0.5],
    ["Je fais valider le compte rendu : « Please let me know if I missed anything. »", 1],
    ["Je numérote les points de l'ordre du jour et j'indique la durée prévue pour chacun.", 0.5],
  ],
  [
    ["« Good morning, Agrimeca, how can I help you? … Can I take a message? … Could you spell your name, please? »", 1],
    ["Je laisse un message vocal court : qui je suis, pourquoi j'appelle, ce que j'attends, mon numéro. « I'm calling about our order 5521. »", 1],
    ["Je vérifie le message en le relisant à la personne : « So, he should call you back before Thursday, is that correct? »", 1],
    ["Je fais répéter poliment : « Sorry, could you say that again? », « Could you speak a bit more slowly? ».", 1],
    ["J'épelle les adresses email avec « at » et « dot » sans hésiter.", 0.5],
    ["Je précise toujours le fuseau horaire : « Friday at 10 am, UK time ».", 1],
    ["Je ne laisse plus de silence : « Hold on, please, I'll check. »", 1],
    ["Je dis « I'll call you back » et plus « I recall you ».", 0.5],
    ["J'ai une fiche type pour noter les messages : nom, société, numéro, objet, délai.", 0.5],
    ["Quand la ligne est mauvaise : « Sorry, the line is bad, could you repeat the last part? »", 1],
    ["Je sais transférer un appel : « I'll put you through to the sales department. »", 1],
    ["Je termine l'appel en résumant : « Thank you, I'll send you the tracking number by email. »", 1],
  ],
  [
    ["Avant : ordre du jour envoyé, matériel testé, document partagé. Ouverture : « Good morning everyone, let's get started. We have 30 minutes and four points. »", 1],
    ["Je gère les incidents : « Sorry, you froze for a second », « I think you're on mute ».", 1],
    ["Je distribue la parole : « Sarah, would you like to add something? », « One at a time, please. »", 1],
    ["Je partage mon écran et je commente : « As you can see in this table… ».", 1],
    ["Je demande une confirmation écrite dans le chat pour les chiffres : « Could you type the new date in the chat? »", 1],
    ["J'indique les deux fuseaux horaires dans l'invitation.", 0.5],
    ["Je clôture en résumant : « To sum up, we agreed on two things. I'll send the minutes tonight. »", 1],
    ["Je sais guider quelqu'un qui filme une machine : « Can you turn the camera to the left? »", 1],
    ["Je participe davantage : je ne coupe plus ma caméra et je pose au moins une question.", 0.5],
    ["Je garde une liste de mots-clés à côté de l'écran, mais je ne lis plus de texte.", 0.5],
    ["Pour une question difficile : « Let me check with our engineer and come back to you tomorrow. »", 1],
    ["J'ouvre par une vérification technique : « Can everybody see my screen? »", 1],
  ],
  [
    ["Reformuler : « If I understand correctly, you want to reduce prices by 5 %. »", 1],
    ["Argumenter : « I see your point, but our transport costs went up by 8 % this year. »", 1],
    ["Réfuter avec diplomatie : « I'm afraid that won't be possible », « I see things a bit differently. »", 1],
    ["Approuver : « That's a good point, I agree with Marek. »", 1],
    ["Proposer une autre piste : « What if we gave our supplier three months to improve? »", 1],
    ["Je ne dis plus « I am agree » mais « I agree ».", 0.5],
    ["Je demande l'avis des autres : « What do you think, Anna? »", 1],
    ["J'ai pris la parole quatre fois dans la réunion simulée, contre zéro au début de la formation.", 0.5],
    ["J'évite les phrases accusatrices et je reste sur les faits : « Our data shows that 9 breakdowns out of 14 come from the same sensor. »", 1],
    ["« With respect, I'd suggest keeping the current fabric. »", 1],
    ["Je vérifie que j'ai compris : « Let me check I've understood… ».", 1],
    ["J'ose interrompre poliment : « Sorry to interrupt, but… ».", 0.5],
  ],
  [
    ["Plan annoncé : « First, I'll explain the need, then I'll compare three suppliers, and finally I'll give my recommendation. »", 1],
    ["Transitions : « Let's move on to the next slide », « That brings me to the most important point. »", 1],
    ["Commenter un graphique : « Ireland is still our first market, with 38 % of export sales, while Poland increased by 12 %. »", 1],
    ["Conclusion : « To sum up… Thank you. Are there any questions? »", 1],
    ["Je mets peu de mots sur les slides et je regarde le public au lieu de lire.", 1],
    ["Accroche par une question : « What if your filters lasted twice as long? »", 1],
    ["Je montre le chiffre important au lieu de tout lire.", 0.5],
    ["Je respecte le temps : 5 minutes, chronométrées en répétition.", 0.5],
    ["« This slide shows the schedule. The green tasks are completed, the orange ones are in progress. »", 1],
    ["Je respire entre les parties et je ralentis au début.", 0.5],
    ["Je réponds aux questions en anglais : « That's a good question; let me come back to you on that. »", 1],
    ["Je prononce correctement les chiffres, les dates et les pourcentages.", 0.5],
  ],
  [
    ["Écouter, reformuler, s'excuser, proposer : « I'm really sorry about this. We can ship the two machines by express on Monday, at our cost. »", 1],
    ["Concession conditionnelle : « If you commit to a two-year contract, we could limit the increase to 5 %. »", 1],
    ["Répondre à une objection sur le prix : « I understand that price is important. However, the total cost is lower. »", 1],
    ["Demander ce qui rendrait l'accord possible : « What would make this acceptable for you? »", 1],
    ["Je prépare ma limite et trois concessions avant chaque négociation.", 1],
    ["Je ne rejette plus la faute : « Let me check with our warehouse and call you back within an hour. »", 1],
    ["Je résume l'accord : « Let me summarise what we've agreed. »", 1],
    ["« This is our final offer » au lieu de « It's our last price ».", 0.5],
    ["Chercher un compromis : « Could we meet halfway, at 50 %? »", 1],
    ["Je ne réponds pas trop vite, je laisse un silence avant de faire une contre-proposition.", 0.5],
    ["« I understand your frustration. Let's first fix the root cause. »", 1],
    ["J'évite « Calm down » et je dis plutôt « I understand this is very frustrating for you. »", 0.5],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [54, 51, 45, 45, 4, 8, 57, 36, 47, 13];

export function getANG40AutoAnswers(
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

  // Au début, chaque question a son propre décalage de permutation (SEL_DEBUT) : les réponses
  // restent toutes différentes à la même question, et la note varie d'un stagiaire à l'autre
  // (8 stagiaires consécutifs : 8 notes différentes, jamais au-dessus de 6 / 10).
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
export function ang40NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6, soit 4 à 12/20). */
export function ang40BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((ang40NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `ang40BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function ang40ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = ang40BonnesQcmDebut(n, idx, nom, prenom);
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
 * QCM sur 10 (5 à 10), mise en situation sur 5 (2,5 à 5).
 */
const NOTES_QCM_SUR_10 = [8, 6, 9, 7, 10, 5];
const NOTES_EXERCICE_SUR_5 = [4, 3, 4.5, 3.5, 5, 2.5];
export function ang40NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet (partie stagiaire), attentes, missions et contribution (partie entreprise).
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
    besoin: "Traiter en anglais les commandes, les relances et les appels des clients étrangers sans passer par un collègue.",
    objectif: "Je veux être autonome en anglais avec nos clients export : confirmer une commande, annoncer un retard, prendre un message au téléphone.",
    projet: "Elle me permettra d'évoluer vers un poste d'assistant{e} export confirmé{e}, avec mon propre portefeuille de pays.",
    attentes: "L'entreprise attend que {le_sal} gère seul{e} les échanges écrits et téléphoniques avec les clients d'Irlande et de Pologne.",
    missions: "Saisie et confirmation des commandes export, suivi des livraisons, relances de paiement, accueil téléphonique des clients étrangers.",
    contribution: "Elle doit réduire les délais de réponse aux clients étrangers, aujourd'hui allongés par les traductions.",
  },
  {
    besoin: "Négocier en anglais avec les fournisseurs étrangers : prix, délais et réclamations qualité.",
    objectif: "Mon objectif est de mener seul{e} les négociations annuelles et les visios mensuelles avec nos fournisseurs italiens, allemands et chinois.",
    projet: "Elle m'aidera à prendre en charge le portefeuille des fournisseurs internationaux, aujourd'hui suivi par mon responsable.",
    attentes: "Nous attendons que {le_sal} conduise en anglais les revues fournisseurs et les négociations de prix sans l'appui de la direction.",
    missions: "Consultations, demandes de prix, négociation des contrats, suivi des délais et des litiges qualité avec les fournisseurs.",
    contribution: "Elle doit nous permettre de mieux défendre nos prix d'achat face aux hausses annoncées par les fournisseurs.",
  },
  {
    besoin: "Diagnostiquer une panne et guider un client étranger au téléphone et en visioconférence en anglais.",
    objectif: "Je souhaite pouvoir expliquer une procédure de dépannage pas à pas en anglais, au téléphone comme en visio, sans me déplacer.",
    projet: "Elle me permettra d'intégrer la hotline internationale du service après-vente.",
    attentes: "L'entreprise attend que {le_sal} traite en anglais les appels de dépannage des clients du Benelux et d'Irlande.",
    missions: "Diagnostic à distance, interventions sur site, rapports d'intervention, commande de pièces de rechange.",
    contribution: "Elle doit réduire le nombre de déplacements à l'étranger grâce au dépannage à distance.",
  },
  {
    besoin: "Animer en anglais les comités de projet et rédiger les comptes rendus pour un client britannique.",
    objectif: "Mon objectif est de tenir seul{e} les comités de pilotage en anglais : ordre du jour, animation, annonce des risques, compte rendu.",
    projet: "Elle m'aidera à piloter des projets internationaux plus importants, condition pour évoluer vers un poste de directeur de projets.",
    attentes: "Nous attendons que {le_sal} anime les réunions avec le client anglais et envoie des comptes rendus clairs le jour même.",
    missions: "Pilotage du planning, coordination des équipes, comités de projet, suivi des risques et des livrables.",
    contribution: "Elle doit sécuriser la relation avec notre plus gros client étranger.",
  },
  {
    besoin: "Gérer en anglais les litiges de factures et les relances de paiement avec les partenaires étrangers.",
    objectif: "Je veux rédiger moi-même les emails de relance et de litige en anglais et pouvoir en parler au téléphone sans paniquer.",
    projet: "Elle me permettra de reprendre la comptabilité fournisseurs des filiales étrangères du groupe.",
    attentes: "L'entreprise attend que {le_sal} règle en anglais les litiges de facturation avec les fournisseurs portugais et espagnols.",
    missions: "Saisie et contrôle des factures, rapprochements, relances, traitement des avoirs et des litiges.",
    contribution: "Elle doit réduire le nombre de factures bloquées et les retards de paiement.",
  },
  {
    besoin: "Mener des entretiens d'embauche en anglais et accueillir des collaborateurs étrangers.",
    objectif: "Mon objectif est de conduire un entretien de recrutement complet en anglais et d'organiser l'intégration des nouveaux arrivants étrangers.",
    projet: "Elle m'aidera à prendre en charge le recrutement international de l'entreprise.",
    attentes: "Nous attendons que {le_sal} mène les premiers entretiens en anglais avec les candidats ingénieurs venus de l'étranger.",
    missions: "Rédaction des offres, tri des candidatures, entretiens, proposition d'embauche, accueil des nouveaux salariés.",
    contribution: "Elle doit raccourcir les délais de recrutement des profils internationaux.",
  },
  {
    besoin: "Gérer en anglais les transporteurs, les retards et les litiges de livraison à l'international.",
    objectif: "Je souhaite traiter en anglais les réservations de transport, les incidents de livraison et les réclamations auprès des transporteurs.",
    projet: "Elle me permettra d'élargir nos flux vers le Royaume-Uni et l'Europe du Nord.",
    attentes: "L'entreprise attend que {le_sal} règle directement en anglais les retards et les litiges avec les transporteurs et l'entrepôt partenaire.",
    missions: "Organisation des expéditions, réservation des transports, documents douaniers, suivi des litiges.",
    contribution: "Elle doit diminuer le coût des litiges de transport non indemnisés.",
  },
  {
    besoin: "Présenter les produits et négocier les contrats annuels en anglais avec des acheteurs étrangers.",
    objectif: "Mon objectif est de présenter nos produits avec aisance et de répondre aux objections sur le prix sans me justifier trop longtemps.",
    projet: "Elle m'aidera à développer les grands comptes d'Europe du Nord et d'Amérique du Nord.",
    attentes: "Nous attendons que {le_sal} conduise en anglais les présentations sur les salons et les négociations des contrats-cadres.",
    missions: "Prospection, présentations commerciales, négociation des contrats annuels, suivi des grands comptes.",
    contribution: "Elle doit nous aider à préserver nos marges lors des renégociations annuelles.",
  },
  {
    besoin: "Organiser en anglais les déplacements, les visios et les réunions de la direction et accueillir les visiteurs étrangers.",
    objectif: "Je veux gérer en anglais l'agenda international de la direction : échanges avec les assistants des partenaires, réservations, accueil.",
    projet: "Elle me permettra d'accompagner l'ouverture de la filiale allemande de l'entreprise.",
    attentes: "L'entreprise attend que {le_sal} prenne en charge l'organisation des réunions et des visites avec les partenaires étrangers.",
    missions: "Gestion de l'agenda, organisation des déplacements et des visios, accueil des visiteurs, rédaction de courriers.",
    contribution: "Elle doit libérer du temps à la direction sur l'organisation des échanges internationaux.",
  },
  {
    besoin: "Échanger en anglais avec les clients et les fournisseurs sur les audits, les non-conformités et les plans d'action.",
    objectif: "Mon objectif est de présenter un plan d'action qualité en anglais et de mener les réunions de résolution de problèmes avec nos fournisseurs.",
    projet: "Elle m'aidera à préparer les audits de nos clients internationaux.",
    attentes: "Nous attendons que {le_sal} présente en anglais nos plans d'action lors des audits clients et des revues fournisseurs.",
    missions: "Traitement des non-conformités, audits fournisseurs, rapports d'analyse, suivi des plans d'action.",
    contribution: "Elle doit améliorer notre image auprès des clients étrangers lors des audits.",
  },
  {
    besoin: "Répondre en anglais aux réclamations des clients étrangers par email et au téléphone.",
    objectif: "Je souhaite traiter une réclamation en anglais de bout en bout : écouter, reformuler, s'excuser, proposer une solution.",
    projet: "Elle me permettra de rejoindre l'équipe du service client international.",
    attentes: "L'entreprise attend que {le_sal} traite en anglais les réclamations des clients étrangers dans les 48 heures.",
    missions: "Accueil téléphonique, traitement des réclamations, suivi des retours, mise à jour du logiciel client.",
    contribution: "Elle doit fidéliser les clients étrangers en réglant plus vite leurs réclamations.",
  },
  {
    besoin: "Présenter des solutions techniques en anglais et participer activement aux réunions avec des partenaires étrangers.",
    objectif: "Mon objectif est de défendre mes choix techniques en réunion et de présenter un dossier d'études avec des slides en anglais.",
    projet: "Elle m'aidera à travailler sur les projets européens du bureau d'études.",
    attentes: "Nous attendons que {le_sal} présente directement ses dossiers techniques aux partenaires étrangers.",
    missions: "Conception, calculs, rédaction des notes techniques, réunions de projet avec les partenaires.",
    contribution: "Elle doit éviter de faire intervenir un traducteur dans les réunions techniques.",
  },
  {
    besoin: "Présenter l'entreprise en anglais sur les salons internationaux et échanger avec les distributeurs étrangers.",
    objectif: "Je veux présenter l'entreprise et nos gammes en anglais sur les salons et animer la relation avec nos distributeurs.",
    projet: "Elle me permettra de prendre en charge le marketing international de l'entreprise.",
    attentes: "L'entreprise attend que {le_sal} anime le stand en anglais sur les deux salons internationaux de l'année.",
    missions: "Préparation des salons, supports de présentation, relation avec les distributeurs, contenus en anglais.",
    contribution: "Elle doit augmenter le nombre de contacts qualifiés recueillis sur les salons.",
  },
  {
    besoin: "Confirmer les commandes, annoncer les retards et traiter les litiges en anglais avec les clients de l'administration des ventes.",
    objectif: "Mon objectif est d'écrire et de téléphoner en anglais aux clients étrangers sans recopier d'anciens messages.",
    projet: "Elle m'aidera à reprendre le suivi des clients export, aujourd'hui partagé avec une collègue.",
    attentes: "Nous attendons {un} {collab} capable de traiter en anglais les commandes, les retards et les litiges des clients étrangers.",
    missions: "Administration des ventes, confirmation des commandes, suivi des expéditions, facturation export.",
    contribution: "Elle doit fiabiliser nos échanges écrits avec les clients étrangers.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilANG40(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

export function getANG40Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return accorder(profilANG40(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production écrite du stagiaire sur sa propre situation de travail
// Indices : 0 diagnostic, 1 C1 présentation, 2 C1 glossaire, 3 C2 email, 4 C2 ordre du jour /
//           compte rendu, 5 C3 téléphone, 6 C3 visioconférence, 7 C4 réunion, 8 C5 présentation,
//           9 C6 négociation / réclamation ; 8 productions par banque.
// La k-ième production de chaque banque suit le même salarié fictif : un stagiaire garde le même
// poste d'un exercice à l'autre.
//   0 assistant·e commercial·e export · 1 acheteur · 2 SAV · 3 chef de projet
//   4 comptable fournisseurs · 5 chargé·e de recrutement · 6 responsable logistique
//   7 commercial·e grands comptes
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Diagnostic de départ : usages et niveau
  [
    "Je suis assistant{e} commercial{e} export dans une PME de matériel agricole près d'Angers ; nos clients sont en Irlande, en Pologne et au Danemark. J'utilise l'anglais tous les jours à l'écrit (confirmations de commande, relances de paiement) et deux ou trois fois par semaine au téléphone. Mon niveau : à l'écrit je me débrouille, je copie souvent d'anciens emails ; à l'oral je bloque quand le client parle vite. Phrase que j'écris souvent : « Please find attached the order confirmation. » Phrase que je dis mal : « I call you back after » au lieu de « I'll call you back later ». Je me place entre A2 et B1. Objectif : téléphoner sans préparer chaque phrase.",
    "Je travaille aux achats d'un équipementier en plasturgie à Oyonnax. Nos fournisseurs de moules sont en Italie, ceux de granulés en Allemagne et en Chine. L'anglais me sert pour les demandes de prix, les relances de délai et deux visios par mois avec Shanghai. Mon niveau est meilleur à l'écrit qu'à l'oral : je comprends les devis, mais en visio je laisse parler mon responsable. Phrase que j'utilise : « Could you send us your best price for 5 tons? » Erreur fréquente : « We need it for the end of the month » alors que je voulais dire « by the end of the month ». Je dirais A2 à l'oral, B1 à l'écrit. Mon but : négocier un délai sans passer par mon chef.",
    "Je suis au service après-vente d'un fabricant de machines d'emballage près de Nantes. Nos clients sont en Belgique, aux Pays-Bas et en Irlande, et leurs techniciens nous parlent souvent en anglais. Je l'utilise surtout au téléphone pour diagnostiquer une panne, et pour écrire des rapports d'intervention courts. Mon niveau technique est correct : je connais « conveyor », « sensor », « spare part ». Mais je fais des phrases comme « The machine don't start since this morning » et je ne sais pas toujours poser une question polie. Je me situe à A2. Je voudrais expliquer une procédure de redémarrage étape par étape sans revenir au français.",
    "Je suis chef de projet chez un éditeur de logiciels de planification à Toulouse ; notre plus gros client est un groupe logistique de Birmingham. L'anglais me sert pour les comités de projet hebdomadaires en visio, les comptes rendus et les échanges sur Teams. Mon niveau de compréhension est correct, environ B1, mais quand il faut annoncer un retard je cherche mes mots. Exemple réel de la semaine dernière : « We have a little delay on the module, it will be ready in two weeks maybe. » Le client a demandé une date précise et je n'ai pas su reformuler. Je confonds aussi « actually » et « actuellement ». Priorité : tenir une réunion de suivi complète en anglais.",
    "Je suis comptable fournisseurs dans une maison de négoce de vins à Bordeaux. Nos fournisseurs de bouchons et de cartons sont au Portugal et en Espagne, nos importateurs aux États-Unis et au Royaume-Uni. J'écris en anglais pour les factures en litige, les relevés de compte et les avoirs. Mon niveau à l'écrit est A2 : j'utilise beaucoup le traducteur, et je l'ai vu traduire « avoir » par « to have » dans un email. Au téléphone, je panique dès que l'interlocuteur s'impatiente. Phrase que je maîtrise : « The invoice number 2318 is still unpaid. » Ce que je voudrais savoir dire : qu'une facture ne correspond pas au bon de commande, poliment.",
    "Je suis chargé{e} de recrutement dans un bureau d'études en ingénierie à Grenoble (90 salariés). Nous recrutons des ingénieurs venus d'Espagne, d'Inde et du Brésil, et plusieurs entretiens se passent en anglais. Je lis bien les CV et les profils LinkedIn, mais mon niveau à l'oral est d'environ A2 : je prépare mes questions par écrit et j'ai du mal à rebondir. Exemple : « Can you explain me your last experience? » au lieu de « Can you tell me about… ». J'écris aussi les emails de convocation en recopiant un modèle. En six jours, je voudrais gagner assez d'aisance pour mener un entretien de 30 minutes.",
    "Je suis responsable logistique dans une PME de distribution de pièces industrielles près de Lille. Je travaille avec des transporteurs anglais, allemands et néerlandais, et avec un entrepôt partenaire à Rotterdam. L'anglais me sert pour les réservations, les retards et les litiges sur la marchandise abîmée. Mon niveau est d'environ A2 : je connais le vocabulaire (« pallet », « delivery note », « customs clearance »), mais mes phrases sont courtes et parfois fausses, comme « The truck is arrived late ». Depuis le Brexit, les échanges avec le Royaume-Uni ont doublé. J'aimerais gérer un litige au téléphone sans perdre mes moyens.",
    "Je suis commercial{e} grands comptes dans une entreprise de textiles techniques à Roanne. Mes clients sont des industriels en Suède, en Finlande et aux États-Unis. Je présente nos produits en anglais deux fois par mois et je négocie les contrats annuels. Mon niveau est le plus élevé de l'équipe, autour de B1, mais je fais des fautes : « We are leader on this market since 20 years ». Je comprends bien les acheteurs scandinaves, beaucoup moins les Américains qui parlent vite. Mon point faible : répondre à une objection sur le prix sans me justifier trop longtemps. Je veux aussi rendre mes présentations moins lues.",
  ],
  // 1 — C1 se présenter et présenter son entreprise
  [
    "Ma présentation pour un nouveau distributeur irlandais : « Hello, I'm the export sales assistant at Agrimeca, a family company based near Angers. We design and manufacture haymaking equipment. We have 85 employees and we export 40 % of our production, mainly to Ireland, Poland and Denmark. I'm in charge of orders and delivery follow-up. » J'ai cherché le vocabulaire de nos produits dans le catalogue anglais. Le formateur a corrigé « I am working here since 2019 » en « I've been working here since 2019 ». J'ai ajouté une question pour relancer : « How long have you been working with French suppliers? »",
    "Ma présentation pour la visite d'un fournisseur italien de moules : « Good morning, I'm a buyer at Plastiform, a company of 140 people in Oyonnax. We produce plastic parts for the automotive and cosmetics industries. I'm responsible for moulds and raw materials. » Puis nos chiffres : « Our turnover is 28 million euros and we work with about sixty suppliers. » Ma maladresse : j'avais écrit « We are specialised in the plastic injection » ; correction : « We specialise in plastic injection moulding », sans « the ». J'ai préparé deux questions : « Where is your main production site? » et « What are your lead times at the moment? »",
    "Ma présentation pour un client néerlandais qui reçoit une nouvelle ligne : « Hi, I'm from the after-sales service of Embalnor. We are a company that builds packaging machines, with 200 machines installed in Europe. I'm the person you call when there is a breakdown or when you need a spare part. » J'ai ajouté nos horaires : « You can reach the hotline from 8 am to 6 pm, Monday to Friday. » Le formateur m'a fait remarquer que j'avais dit « I'm technician » sans article : on dit « I'm a technician ». J'ai aussi appris à présenter mon rôle sans m'excuser de mon anglais, ce que je faisais à chaque fois.",
    "Pour le lancement du nouveau lot avec Birmingham, j'ai écrit ma présentation : « Hello everyone, I'm the project manager for the Planify deployment. Our company is a software publisher based in Toulouse, with 60 employees. We help logistics companies plan their teams and their warehouses. My role is to coordinate the developers, the consultants and your team, and to make sure we deliver on time. » J'avais écrit « I will be your contact person for all the questions » ; le formateur m'a proposé « I'll be your main point of contact », plus naturel. Ma difficulté : prononcer « warehouses » ; je me suis enregistré{e} trois fois.",
    "Ma présentation pour un premier échange avec notre nouveau fournisseur de bouchons au Portugal : « Good afternoon, I work in the accounts payable department of Maison Duret, a wine trading company in Bordeaux. We sell around 3 million bottles a year, in France and abroad. I'm in charge of supplier invoices and payments. » J'ai appris que « comptabilité fournisseurs » se dit « accounts payable ». Mon erreur : « We are working with your company since two years », corrigé en « We have been working with your company for two years ». Phrase ajoutée : « If you have any question about a payment, please contact me directly. »",
    "Ma présentation pour le début des entretiens : « Hello and welcome. I'm the recruitment officer at Ingeplan, an engineering company in Grenoble. We are 90 people and we design water treatment plants for clients in France and in Africa. Today, I will present you the position and then I will ask you some questions. » Le formateur a corrigé « present you the position » en « tell you about the position ». J'ai ajouté une présentation de l'entreprise en trois temps : activité, chiffres, valeurs. J'ai encore du mal à parler sans lire mes notes, mais je connais maintenant mon texte d'ouverture.",
    "Ma présentation pour un nouveau transporteur britannique : « Hello, I'm the logistics manager at Indupièces, a distribution company near Lille. We supply spare parts to factories in France, Belgium and the UK. We ship about 40 pallets a day. I organise transport, the warehouse team and the customs documents. » J'avais dit « We are 35 in the company » ; le formateur a proposé « We have 35 employees ». J'ai aussi appris à épeler le nom de l'entreprise avec l'alphabet radio, très utile au téléphone : « I for India, N for November… ». Je suis plus à l'aise pour démarrer un premier contact.",
    "Pour le salon de Francfort, j'ai réécrit ma présentation : « Good morning, I'm the key account manager at Texinov, a French company that develops technical textiles for filtration and construction. We were founded in 1978, we have 210 employees and two plants near Roanne. Our customers are mainly in Scandinavia and North America. » Avant, je disais « We are leader on this market » ; maintenant : « We are one of the leading suppliers in Europe », plus juste. J'ai préparé une transition : « Could you tell me a little about your current supplier? », pour faire parler le client au lieu de réciter.",
  ],
  // 2 — C1 glossaire métier et structures grammaticales clés
  [
    "Mon glossaire métier compte 40 mots, classés en trois colonnes : commande, livraison, paiement. Exemples : bon de commande = purchase order, délai de livraison = lead time, acompte = down payment, échéance = due date, pièces de rechange = spare parts. Grammaire : le present perfect pour ce qui vient d'arriver (« Your order has just been shipped ») et « will » pour les engagements (« We will send you the tracking number tomorrow »). J'ai fait l'erreur « The goods has been shipped » : « goods » est pluriel, donc « have been ». J'ai déposé le glossaire dans le dossier partagé de l'équipe.",
    "J'ai construit un glossaire de 45 termes d'achat : appel d'offres = call for tenders, devis = quotation, cahier des charges = specifications, matière première = raw material, délai = lead time, pénalités de retard = late delivery penalties. En grammaire, j'ai travaillé les comparatifs pour comparer des offres : « The Turkish supplier is cheaper, but its lead time is longer than the Italian one. » Et les modaux pour demander poliment : « Could you…? », « Would it be possible to…? ». Mon erreur la plus fréquente : « more cheaper ». J'ai aussi noté un faux ami : « actually » ne veut pas dire « actuellement ».",
    "Mon glossaire SAV : panne = breakdown, pièce d'usure = wear part, capteur = sensor, tapis = conveyor belt, redémarrer = restart, mise à jour = update, garantie = warranty, intervention sur site = on-site visit. Grammaire : l'impératif pour les consignes (« Switch off the machine, wait ten seconds, then press the green button. ») et le prétérit pour décrire ce qui s'est passé (« The sensor stopped working yesterday. »). J'ai repris ma phrase « The machine don't start » : « doesn't start ». J'ai fait des fiches recto verso pour réviser le glossaire pendant les trajets ; je connais 32 mots sur 40.",
    "Dans mon glossaire projet : jalon = milestone, livrable = deliverable, cahier des charges = requirements, recette = acceptance testing, mise en production = go-live, retard = delay, périmètre = scope. Grammaire : le present continuous pour ce qui est en cours (« We are testing the new module this week ») et « going to » pour les plans (« We are going to deliver the first batch on 14 March »). Ma confusion : « the planning » ne s'emploie pas comme en français ; on dit « the schedule ». J'ai partagé le glossaire avec deux développeurs qui participent aussi aux réunions.",
    "Glossaire comptable : facture = invoice, avoir = credit note, relance = reminder, échéance = due date, virement = bank transfer, rapprochement = reconciliation, litige = dispute, acompte = deposit. Grammaire : la voix passive, très utilisée dans les échanges comptables (« The payment was made on 3 May », « The credit note has not been received yet »). J'ai découvert que « avoir » se dit « credit note » et pas « asset », comme je l'écrivais. Mon erreur à l'exercice : « We didn't received » au lieu de « We didn't receive ». Je relis désormais le glossaire avant chaque email délicat.",
    "Mon glossaire RH : poste = position, fiche de poste = job description, candidature = application, entretien = interview, période d'essai = probation period, salaire brut = gross salary, avantages = benefits, intégration = onboarding. Grammaire : les questions ouvertes (« What did you learn from this project? », « How would you handle a conflict in your team? ») et le present perfect pour l'expérience (« Have you ever managed a team? »). Mon erreur fréquente : oublier l'auxiliaire, « What you did in your last job? ». J'ai ajouté au glossaire une phrase de fin d'entretien : « We will come back to you by Friday. »",
    "Mon glossaire logistique compte 50 entrées : palette = pallet, bon de livraison = delivery note, lettre de voiture = consignment note, dédouanement = customs clearance, quai = loading dock, enlèvement = pick-up, avarie = damage. Grammaire : les prépositions de temps, mon point faible (« on Monday », « at 9 am », « by Friday », « within two days »), et le prétérit pour les incidents : « The truck arrived two hours late. » Ma phrase fausse « The truck is arrived » est corrigée. J'ai affiché le glossaire au bureau des expéditions pour toute l'équipe.",
    "Glossaire commercial : appel d'offres = tender, remise = discount, conditions de paiement = payment terms, cahier des charges = specifications, échantillon = sample, grand compte = key account, contrat-cadre = framework agreement. Grammaire : le conditionnel pour négocier (« If you ordered 20 tons, we could offer a 4 % discount ») et les adverbes de fréquence. J'ai corrigé une erreur que je faisais depuis des années : « I propose you a discount », alors qu'on dit « I can offer you a discount ». J'ai ajouté au glossaire les unités, que je prononçais mal : « square metres », « per roll ».",
  ],
  // 3 — C2 email professionnel complexe
  [
    "Email à un distributeur polonais pour un retard de livraison : « Dear Mr Nowak, Thank you for your order no. 4471. Unfortunately, due to a delay from our steel supplier, we will not be able to ship the machines on 12 June as planned. The new shipping date is 26 June. We sincerely apologise for the inconvenience. As a gesture of goodwill, we offer you free transport on this order. Please let me know if this new date is suitable for you. Kind regards » Ma première version commençait par « I write you because » : corrigé en « I am writing to inform you that ». J'ai appris à garder une idée par paragraphe.",
    "Email à un fournisseur allemand pour une hausse de prix non prévue : « Dear Ms Becker, We have received your new price list, with an increase of 12 % from 1 July. We understand that energy costs have risen; however, this increase was not announced in advance and it is not in line with our framework agreement. Could you please confirm that the current prices will apply to orders already placed? We would also appreciate a meeting to discuss a gradual increase. Best regards » Mon brouillon disait « We are not agree » : corrigé en « We do not agree ». Le formateur m'a montré comment adoucir avec « we would appreciate ».",
    "Email à un client belge après une intervention : « Dear Mr Janssens, Following my visit on Tuesday, please find below a short summary. The machine stopped because of a faulty sensor on the conveyor. I replaced it and the line is working again. I recommend replacing the second sensor during your next maintenance stop, as it shows signs of wear. The spare part can be shipped within two days. Do not hesitate to contact me if you have any questions. Best regards » Ma maladresse : « I have changed the sensor yesterday », corrigé en « I replaced the sensor yesterday », car le moment est précis.",
    "Email au client de Birmingham pour annoncer un retard : « Dear Sarah, I am writing to update you on the scheduling module. During testing, we found a performance issue with large warehouses. To fix it properly, we need two additional weeks; the new delivery date is 28 April. The other modules are on schedule. I suggest a short call on Thursday to go through the impact on your go-live. I apologise for this change. Kind regards » J'avais d'abord écrit « I remain at your disposal », très français selon le formateur ; je l'ai remplacé par « Please let me know if you have any questions ».",
    "Email à un importateur américain qui conteste une facture : « Dear Mr Collins, Thank you for your email regarding invoice 2318. After checking, we confirm that 50 cases were charged twice. We have issued a credit note of 1,250 USD, attached to this email. The remaining amount of 8,740 USD is due on 30 September. Could you please confirm the payment date? We apologise for this mistake. Best regards » Ma première version : « We are sorry for the error and we will made a credit note » ; il fallait « will make », et « we have issued » est mieux puisque c'est déjà fait. J'écris maintenant les montants à l'anglaise.",
    "Email de proposition à un candidat espagnol : « Dear Mr García, Following your interviews with our team, I am pleased to offer you the position of process engineer in our Grenoble office. Please find attached the offer letter with the gross annual salary, the benefits and the start date of 1 September. We would also like to help you with your relocation: we can put you in touch with a housing agency. Could you please confirm your decision by 15 June? Kind regards » J'avais d'abord écrit « We are happy to inform you that you are taken » ; le formateur m'a expliqué que ce n'est pas naturel du tout.",
    "Email de réclamation à un transporteur anglais : « Dear Mr Hughes, I am writing about delivery 77215, received on 4 March. Three pallets were damaged, as noted on the delivery note and shown on the attached photos. The value of the damaged goods is 3,420 GBP. We therefore request compensation under the CMR convention. Could you please confirm receipt of this claim and let us know the next steps? Kind regards » Ma première version disait « Your driver has broken three pallets » : trop accusateur. J'ai appris à rester factuel{le}. Erreur corrigée : « informations », sans s en anglais.",
    "Email à un acheteur suédois après un rendez-vous : « Dear Erik, Thank you for your time on Tuesday. As discussed, please find attached our proposal for the 2027 framework agreement: 18,000 m² of filtration fabric, delivered in four batches, at 6.40 EUR per m². This price includes a 3 % discount compared to 2026 if the agreement is signed before 15 December. I would be happy to organise a visit of our plant in January. Kind regards » Ma maladresse : « I send you in attachment » ; correction : « please find attached ». J'ai aussi supprimé deux paragraphes inutiles.",
  ],
  // 4 — C2 ordre du jour et compte rendu de réunion
  [
    "J'ai préparé l'ordre du jour de la réunion mensuelle avec notre agent irlandais : « Agenda: 1. Sales figures for Q3, 2. Stock levels in Cork, 3. New price list, 4. Trade show in November, 5. AOB. » Puis le compte rendu : « Minutes – 14 October. Decisions: the new price list will apply from 1 January. Agreed action points: send updated catalogues, me, by 20 October; confirm the stand booking, Sean, by 31 October. » J'ai découvert « AOB », any other business. Mon erreur : « The prices will increase of 3 % », corrigé en « by 3 % ».",
    "Ordre du jour de la réunion fournisseur avec le mouliste italien : « 1. Review of the last deliveries, 2. Quality issues on mould 14, 3. Prices for 2027, 4. Next steps. » Compte rendu envoyé le lendemain : « Main points: two deliveries were late in September; the supplier will add a quality check before shipping. Agreed action points: send the problem-solving report, supplier, by 10 November; validate the new prices, purchasing, by 30 November. » Le formateur m'a appris à écrire au passé ce qui a été dit et au futur les actions. J'avais écrit « The supplier promise to » : il manquait le s.",
    "Ordre du jour de la réunion trimestrielle SAV avec notre distributeur néerlandais : « 1. Breakdowns in Q2, 2. Spare parts stock, 3. Training of their technicians, 4. Questions. » Compte rendu rédigé après la visio : « Summary: 14 breakdowns, 9 of them due to the same sensor. Decision: we will send a modified sensor to all customers. Agreed action points: prepare the replacement kit, my team, by 15 July; organise a training session in Utrecht, distributor, in September. » Ma difficulté : résumer sans tout recopier. Erreur corrigée : « 9 of them was », remplacé par « were ».",
    "Ordre du jour du comité de pilotage avec Birmingham : « 1. Progress since last meeting, 2. Scheduling module delay, 3. Testing plan, 4. Risks, 5. Next steering committee. » Compte rendu : « Decisions: the go-live is moved to 12 May. Risks: availability of key users during testing. Agreed action points: share the test plan, Planify, by Friday; name two key users, client, by next Tuesday; update the schedule, project manager, by 30 April. » J'ai retenu la structure : décisions, risques, actions avec responsable et date. Ma faute : « the client has decide », corrigée en « has decided ».",
    "J'anime chaque mois un point avec le service comptable de notre importateur britannique. Ordre du jour : « 1. Open invoices, 2. Disputes, 3. Credit notes, 4. Payment forecast. » Compte rendu : « Open invoices: 6, total 21,300 GBP. Dispute on invoice 2402 still open. Agreed action points: send proof of delivery for invoice 2402, Maison Duret, by 5 March; confirm payment of the four oldest invoices, importer, by 15 March. » Erreur que j'ai faite : « the invoices who are late », corrigé en « the invoices which are overdue ». Le mot « overdue » m'était inconnu avant la formation.",
    "Réunion de lancement du recrutement de trois ingénieurs internationaux avec le directeur technique, qui est anglophone. Ordre du jour : « 1. Profiles needed, 2. Job boards, 3. Interview process, 4. Timeline. » Compte rendu : « We agreed on three profiles: process engineer, automation engineer, project engineer. Interviews will be held in English, in two rounds. Agreed action points: publish the job ads, HR, by Monday; prepare the technical test, technical director, by 20 May. » Le formateur m'a montré « We agreed on » et « It was decided that ». J'avais écrit « The candidates must to speak English ».",
    "Ordre du jour de la réunion mensuelle avec l'entrepôt de Rotterdam : « 1. Service level, 2. Damaged pallets, 3. Customs delays for the UK, 4. Peak season planning. » Compte rendu : « Service level: 96 % on-time deliveries. Two claims for damaged pallets are still open. Customs: average delay of 1.5 days. Agreed action points: send the new packing instructions, Indupièces, by 3 October; add a second team on Saturdays in November, warehouse. » Ma faute : « The delays was long », corrigé en « were ». J'utilise maintenant ce modèle pour toutes mes réunions.",
    "Ordre du jour de la revue annuelle avec notre plus gros client finlandais : « 1. Results of the year, 2. Quality feedback, 3. New products, 4. Volumes and prices for 2027, 5. AOB. » Compte rendu envoyé le soir même : « The customer is happy with delivery times but asks for better roll labelling. We presented two new fabrics. Agreed action points: send samples of the new fabric, Texinov, by 15 November; confirm next year's volumes, customer, by 1 December. » Erreur corrigée : « We have presented », remplacé par « We presented », parce que la réunion est terminée.",
  ],
  // 5 — C3 appel téléphonique, prendre et laisser un message
  [
    "Jeu de rôle : un client danois appelle pour une pièce et je dois prendre un message pour le commercial. Ce que j'ai dit : « Good morning, Agrimeca, how can I help you? … I'm sorry, Mr Durand is not available at the moment. Can I take a message? … Could you spell your name, please? … So, you need a quotation for two spare blades, and he should call you back before Thursday. Is that correct? » J'ai noté le message sur la fiche type : nom, société, numéro, objet, délai. Ma maladresse : « Can you repeat more slowly? » ; plus poli : « Could you speak a bit more slowly, please? ».",
    "J'ai préparé un appel à un fournisseur allemand pour un retard. La personne n'était pas là, j'ai laissé ce message : « Hello, this is the purchasing department of Plastiform, in France. I'm calling about our order 5521, which was due last Friday. Could you please call me back today, or send me the new delivery date by email? Thank you, goodbye. » Puis le formateur a joué le fournisseur : j'ai dû faire répéter (« Sorry, could you say that again? ») et reformuler (« So, if I understand correctly, the goods will leave on Wednesday? »). Mon erreur : « I call for the order » au lieu de « I'm calling about ».",
    "Simulation d'un appel de dépannage : un client irlandais signale une panne. J'ai dit : « After-sales service, good morning. … Can you give me the serial number of the machine? … What happens exactly when you press start? … OK, I'll check with my colleague and call you back within one hour. » Quand je n'ai pas compris, j'ai osé dire « Sorry, the line is bad, could you repeat the last part? ». Ensuite j'ai rédigé le message pour le technicien de garde : « Customer: Glenmore Dairy, line 2 stopped, error E47, call back before 11. » J'avais d'abord dit « What is exactly the problem? », une erreur d'ordre des mots.",
    "Jeu de rôle : appeler l'assistante du directeur logistique de notre client anglais pour déplacer une réunion. J'ai dit : « Hello, this is the project manager from Planify. Could I speak to Mr Clarke, please? … Oh, I see. Could you give him a message? We need to move Thursday's meeting to Friday at 10 am, UK time. Could he confirm by email? » Elle a répondu très vite et j'ai demandé : « Sorry, did you say Friday or Monday? ». J'ai appris à préciser « UK time » pour éviter les erreurs de décalage horaire. Ma maladresse : « I want to change the meeting » ; plus poli : « I'd like to reschedule the meeting ».",
    "Appel simulé à un fournisseur espagnol pour une facture reçue en double. Le standard m'a mis{e} en attente, puis j'ai laissé un message : « Good morning, this is the accounts department of Maison Duret, in Bordeaux. I'm calling about invoice 9045, which we received twice. Could someone from your accounts team call me back, or send a credit note? Thank you. » En deuxième partie, j'ai répondu à un appel en anglais et pris un message pour ma responsable. J'ai réussi à épeler une adresse email avec « at » et « dot ». Erreur : « I am calling you for a problem », corrigé en « I'm calling about an issue ».",
    "Appel simulé avec un candidat indien pour fixer un entretien. Comme il ne répondait pas, j'ai laissé un message : « Hello Mr Sharma, this is the recruitment team of Ingeplan in Grenoble. I'm calling about your application for the automation engineer position. We would like to invite you to a video interview next week. Could you call me back or reply to my email with your availability? Thank you. » Puis, en direct, j'ai proposé deux créneaux en tenant compte du décalage horaire : « Would Tuesday at 10 am French time, so 2:30 pm in Bangalore, suit you? » Ma faute : « Are you available the Tuesday? ».",
    "Jeu de rôle : un chauffeur anglais appelle, il est bloqué au port de Calais. J'ai dit : « Indupièces, logistics, good morning. … Sorry, I didn't catch your name. … OK, so the customs documents are missing. Which reference is it? … I'll send them to your dispatcher right now. » Puis j'ai laissé un message à notre transitaire : « Hello, it's Indupièces logistics. Our truck is waiting in Calais because the export declaration is missing. Please send it as soon as possible. » Le formateur a corrigé « the papers is missing ». Je sais maintenant dire « Hold on, please » au lieu de laisser un silence.",
    "Appel simulé à une acheteuse américaine qui ne répond pas. Le message que j'ai laissé : « Hi Jennifer, this is Texinov in France. I'm following up on the samples we sent last week. I'd like to have your first feedback and discuss the next steps. You can reach me on my mobile until 6 pm French time, or I'll try again on Thursday. Have a nice day. » Ensuite, appel en direct avec le formateur, qui parlait vite avec l'accent américain : j'ai reformulé deux fois (« So, you mean that… »). Ma maladresse : « I recall you Thursday » au lieu de « I'll call you back on Thursday ».",
  ],
  // 6 — C3 préparer et mener une visioconférence
  [
    "J'ai préparé ma première visio en anglais avec notre agent irlandais et le commercial. Avant : ordre du jour envoyé, micro et caméra testés, phrases clés écrites. Ouverture : « Hi Sean, can you hear me well? … Great. So today we'd like to talk about the stock and the trade show. » Quand la connexion a coupé : « Sorry, you froze for a second, could you repeat the last sentence? ». Clôture : « Thank you, I'll send you a short summary by email this afternoon. » Mon erreur : j'ai dit « Can you share me your screen? » au lieu de « Can you share your screen? ». J'ai été moins stressé{e} que prévu.",
    "Ma visio mensuelle avec notre fournisseur de granulés à Shanghai, que je mène pour la première fois seul{e}. Préparation : ordre du jour avec les horaires en heure française et chinoise, fichier des commandes partagé à l'avance. Phrases utilisées : « Let's start with the open orders », « Could you share your screen with the production plan? », « Sorry, there's an echo, could you mute your microphone? ». J'ai demandé une confirmation écrite : « Could you type the new date in the chat, please? », pour éviter les erreurs de chiffres. Mon erreur : « We will discuss about the prices ».",
    "Visio de dépannage avec un technicien néerlandais : je l'ai guidé pour remplacer un capteur pendant qu'il filmait la machine avec son téléphone. Phrases : « Can you turn the camera to the left? », « Now unscrew the two screws at the top », « Stop, don't touch the red cable ». J'ai découvert que l'impératif suffit en visio technique, mais que « please » rend l'échange plus agréable. J'ai partagé une photo annotée à l'écran. Ma maladresse : « Turn on the right » au lieu de « Turn to the right ». La réparation a pris 25 minutes au lieu d'un déplacement de deux jours.",
    "J'ai animé en simulation le comité de projet hebdomadaire en visio avec Birmingham. Avant : ordre du jour, document partagé, rôle de chacun. Ouverture : « Good morning everyone, let's wait one more minute for Tom. … OK, let's get started. We have 30 minutes and four topics. » Tours de parole : « Sarah, would you like to add something? », « Sorry Tom, you're on mute. ». Clôture : « To sum up, we agreed on two things. I'll send the minutes by tonight. » Erreur que j'ai faite : « We will begin by the planning » au lieu de « We'll start with the schedule ».",
    "Préparation d'une visio avec l'importateur britannique pour faire le tour des impayés. J'ai partagé un tableau à l'écran et j'ai commenté : « As you can see in this table, six invoices are overdue. The oldest one dates from March. » Puis : « Could you check on your side and tell me which ones are blocked? ». Quand mon interlocuteur a parlé d'un « remittance advice », j'ai demandé « Sorry, what do you mean by remittance advice? » : c'est l'avis de paiement. Ma faute : « on this table » au lieu de « in this table ». La visio m'a paru moins stressante que le téléphone grâce à l'écran partagé.",
    "J'ai simulé un entretien d'embauche en visio avec un candidat brésilien joué par un autre stagiaire. Avant : test du lien, arrière-plan neutre, questions imprimées. Début : « Hello Mr Costa, can you see and hear me properly? … Perfect. The interview will last about 45 minutes. » Questions : « Could you walk me through your experience at your last company? », « Why do you want to move to France? ». Quand la connexion a été mauvaise : « I think we lost you for a moment, could you repeat your answer? ». Mon erreur : « I let you introduce yourself », trop calqué sur le français.",
    "Ma visio hebdomadaire avec l'entrepôt de Rotterdam et le transporteur anglais. J'ai préparé l'ordre du jour et un tableau des expéditions partagé à l'écran. Phrases utilisées : « Can everybody see my screen? », « Let's look at the shipments for next week », « Peter, could you give us an update on the Dover crossing? ». Quand deux personnes parlaient en même temps : « Sorry, one at a time, please. Peter first. ». J'ai utilisé le chat pour écrire les numéros de commande. Ma faute : « I propose to make a meeting next week » ; correction : « Shall we have a quick catch-up next week? ».",
    "Visio de présentation de nos nouveaux tissus à un client de Chicago, avec 7 heures de décalage. Préparation : invitation avec les deux fuseaux horaires, échantillons envoyés avant, diaporama court. Ouverture : « Good morning from France! Thanks for joining us so early. » Pendant la visio : « Can you hold the sample up to the camera? », « Let me show you the test results on screen ». Quand le client a posé une question technique difficile : « That's a good question, let me check with our engineer and come back to you tomorrow. » Ma faute : « I will present you our news products ».",
  ],
  // 7 — C4 réunion : reformuler, argumenter, approuver, réfuter avec diplomatie
  [
    "Jeu de rôle de réunion : nos commerciaux veulent baisser les prix pour la Pologne, je dois donner mon avis. Reformuler : « If I understand correctly, you want to reduce prices by 5 % in Poland. » Argumenter : « I see your point, but our transport costs to Poland went up by 8 % this year. » Réfuter avec diplomatie : « I'm not sure that's the best option; maybe we could offer free spare parts instead. » Approuver : « That's a good idea, I agree with Marek. » Ma maladresse : « I am agree » (encore !) ; je pense maintenant à « I agree ». J'ai pris la parole quatre fois, contre zéro au début.",
    "Réunion simulée avec des collègues du groupe : le service qualité veut changer de fournisseur. Ma position : garder le fournisseur actuel. Phrases : « Let me make sure I understand: you suggest moving to the Turkish supplier because of the quality issues? », « That's a fair point; however, the switch would take six months ». Pour réfuter : « I see things a bit differently. » Pour proposer : « What if we gave our current supplier three months to improve? ». Pour approuver : « Good point, let's add it to the action plan. ». Ma faute : « I'm not agree with the price », que j'ai corrigée moi-même pendant le jeu de rôle.",
    "Réunion de service avec le responsable néerlandais sur les pannes répétées. Il proposait de remplacer toutes les machines ; moi, une modification du capteur. J'ai reformulé : « So your point is that the machines are too old? ». Argumenté : « Our data shows that 9 breakdowns out of 14 come from the same sensor. » Réfuté poliment : « I understand your concern, but replacing the machines would cost much more than the modification. » Et j'ai demandé l'avis des autres : « What do you think, Anna? ». J'ai hésité entre « The data show » et « shows » : les deux sont acceptés.",
    "Réunion de projet simulée : le client veut ajouter une fonctionnalité sans décaler la date. J'ai reformulé : « Just to be clear, you need the reporting feature for the go-live on 12 May? ». Argumenté : « Adding this feature means two more weeks of development and testing. » Réfuté avec diplomatie : « I'm afraid we can't do both without taking a risk on quality. » Proposé : « What about delivering it in a second phase, in June? ». Approuvé : « That's a very good point about user training. ». Ma maladresse : « It's not possible », trop sec au début ; remplacé par « I'm afraid that won't be possible ».",
    "Réunion simulée avec le contrôleur de gestion anglais du groupe sur les délais de paiement. Il voulait payer les fournisseurs à 90 jours ; j'ai défendu 60 jours. Reformulation : « So, your point is to improve our cash position? ». Arguments : « In France, the legal limit is 60 days, and some suppliers have already complained. » Désaccord poli : « I see what you mean, but we could have to pay penalties. » Proposition : « Maybe we could negotiate longer terms only with large suppliers. » Ma faute pendant l'exercice : « some suppliers has complained », que j'ai dû corriger en « have ».",
    "Réunion de sélection avec le directeur technique anglophone, qui voulait recruter un candidat très technique mais peu à l'aise en équipe. J'ai reformulé : « If I understand you correctly, technical skills are your priority? ». Argumenté : « That's an important point. Still, the role includes coordinating three subcontractors. » Réfuté : « I'm not entirely convinced; his answers about teamwork were quite vague. » Proposé : « Could we organise a second interview with the team? ». Ma maladresse : « He is very technic » ; correction : « He's very technical ». Le directeur a accepté la deuxième étape.",
    "Réunion avec le transporteur et l'entrepôt sur les retards vers le Royaume-Uni. Le transporteur voulait augmenter ses tarifs de 10 %. J'ai reformulé : « So, you're saying the extra cost comes from the waiting time at customs? ». Argumenté : « I take your point, but the delays are often due to missing documents on your side. » Réfuté poliment : « I'm afraid a 10 % increase is not acceptable for us. » Proposé : « Could we agree on 4 % and review it in six months? ». Ma faute : « The delays are due to your fault », trop agressif ; je l'ai reformulé pendant l'exercice.",
    "Réunion simulée avec un acheteur suédois et son responsable qualité. Ils voulaient réduire l'épaisseur du tissu pour baisser le prix. Reformulation : « Let me check I've understood: you'd like a lighter fabric at a lower price? ». Arguments : « That's a valid point, but the lighter fabric doesn't pass the 500-hour test. » Désaccord poli : « With respect, I'd suggest keeping the current fabric. » Approbation partielle : « I agree with you on the packaging, we can reduce it. » Ma faute : « It's a good remark » ; on dit plutôt « That's a good point ». J'ai gardé la parole sans me justifier trop longtemps.",
  ],
  // 8 — C5 présentation professionnelle appuyée sur des diapositives
  [
    "J'ai présenté en 5 minutes les ventes export du semestre avec six diapositives. Introduction : « Today I'm going to present our export results for the first half of the year. » Transition : « Let's move on to the next slide, which shows sales by country. » Commentaire de graphique : « As you can see, Ireland is still our first market, with 38 % of export sales, while Poland increased by 12 %. » Conclusion : « To sum up… Thank you. Are there any questions? » Ma maladresse : « Poland has increased of 12 % » ; correction : « increased by 12 % ». J'avais trop de texte : je suis passé{e} à cinq mots par ligne.",
    "Présentation de 6 minutes au comité achats sur le choix d'un nouveau fournisseur de moules. Plan annoncé : « First, I'll explain the need, then I'll compare three suppliers, and finally I'll give my recommendation. » Sur la slide de comparaison : « This table compares price, lead time and quality. The Portuguese supplier is not the cheapest, but it has the shortest lead time. » Conclusion : « My recommendation is a one-year trial with the Portuguese supplier. » Le formateur a noté que je lisais mes slides ; j'ai refait la présentation en regardant le public. Erreur corrigée : « the most short lead time ».",
    "Présentation de 5 minutes à des techniciens étrangers sur la nouvelle procédure de maintenance. Introduction : « Good morning, I'm going to show you how to replace the sensor in less than ten minutes. » Une photo sur chaque slide et des verbes simples : « First, switch off the machine. Then, open the cover. Finally, check that the light is green. » Pour les questions : « Is everything clear so far? ». Ma faute : « Look at this picture, here we see the sensor is broken » ; plus simple : « Here you can see the broken sensor ». Retour du groupe : c'est clair, mais je parle trop vite au début.",
    "J'ai présenté l'avancement du projet au comité de pilotage, en 7 minutes et six slides. Ouverture : « Thank you for having me. I'd like to give you a quick update on the project. » Commentaire du diagramme : « This slide shows the schedule. The green tasks are completed, the orange ones are in progress. » Annonce du risque : « The main risk is the availability of your key users in April. » Conclusion : « So, we are asking for your decision on two questions. » Ma maladresse : la prononciation de « schedule » ; j'ai choisi la version britannique. J'ai tenu le temps, avec 30 secondes d'avance.",
    "Présentation de 5 minutes en anglais sur le processus de paiement des fournisseurs, pour le nouveau directeur financier britannique. Plan : « I'll present the process, the figures, and our main difficulties. » Sur la slide des chiffres : « We process around 900 invoices a month. The average payment time is 52 days. » Sur les difficultés : « The main issue is invoices without a purchase order number. » Conclusion : « I suggest three improvements. » Ma faute : j'ai dit « nine hundred of invoices ». Le formateur m'a conseillé de montrer le chiffre important au lieu de tout lire, ce qui m'a beaucoup aidé{e}.",
    "J'ai présenté notre entreprise à des étudiants ingénieurs étrangers lors d'un forum, en simulation de 6 minutes. Introduction par une question : « Who here has ever worked on a water treatment project? ». Une slide sur nos projets, une sur la vie à Grenoble, une sur le processus de recrutement. Transition : « Now let's talk about what it's like to work with us. » Conclusion : « If you're interested, scan the QR code on this slide to apply. » Ma maladresse : « We are looking for persons motivated » ; correction : « motivated people ». Mes slides étaient trop chargées, je les ai allégées.",
    "Présentation de 5 minutes au transporteur et à l'entrepôt sur les résultats du trimestre. Introduction : « I'd like to share our performance figures for Q3. » Graphique : « On this slide, you can see the on-time delivery rate: it went up from 91 to 96 %. » Point négatif : « However, damaged pallets are still too high, with 14 claims. » Proposition : « So we suggest a new wrapping method, shown on the next slide. » Conclusion : « Any questions or comments? ». Ma faute : « The rate has grown from 91 to 96 », sans dire « percent » à l'oral. J'ai mieux respiré entre les parties.",
    "Présentation commerciale de 8 minutes pour un salon, devant des acheteurs scandinaves. Accroche : « What if your filters lasted twice as long? » Ensuite, une slide pour le problème du client, une pour notre tissu, une pour les résultats des tests et une pour le coût au mètre carré sur trois ans. Transition : « That brings me to the most important point: cost. » Conclusion : « We'd be happy to send you samples next week. » Ma maladresse : « Our product is more performant » ; correction : « Our product performs better ». Le formateur m'a félicité{e} pour le rythme, mais m'a conseillé de moins bouger les mains.",
  ],
  // 9 — C6 négocier et traiter une réclamation d'un partenaire international
  [
    "Jeu de rôle : un distributeur irlandais réclame après une livraison incomplète et menace de commander chez un concurrent. J'ai d'abord écouté et reformulé : « So, two machines were missing from the delivery, and your customer is waiting. » Excuse : « I'm really sorry about this. » Solution : « We can ship the two machines by express on Monday, at our cost. » Puis l'objection sur le prix : « I understand that price is important. However, our machines need fewer repairs, so the total cost is lower. » Ma maladresse : « It's not our fault, it's the transporter » ; j'ai appris à ne pas rejeter la faute, et à dire « carrier ».",
    "Négociation simulée avec un fournisseur italien qui veut augmenter ses prix de 12 %. Mon objectif : pas plus de 5 %. Ouverture : « We value our partnership, but 12 % is not acceptable for us. » Concession conditionnelle : « If you limit the increase to 5 %, we could commit to a two-year contract. » Quand il a fait l'objection « Our costs have increased a lot », j'ai répondu : « I understand. Could you show us the details of the cost increase? ». Accord final à 6 %. Ma faute : « We can accept if you make an effort » ; plus clair : « We could accept if you lowered the price ».",
    "Jeu de rôle : un client belge réclame parce que la machine est encore tombée en panne pendant la garantie, et il refuse de payer le déplacement. Reformulation : « If I understand correctly, this is the third breakdown in two months. » Excuse sincère : « I'm sorry for the trouble this has caused. » Solution : « We will cover the visit and replace the part free of charge. » L'objection du client : « We want a new machine. » Ma réponse : « I understand your frustration. Let's first fix the root cause; if it happens again, we'll discuss a replacement. » Ma maladresse : « Calm down », très mal reçu ; je l'ai retiré.",
    "Négociation simulée avec le client anglais qui demande une remise à cause du retard. Ma marge de manœuvre : des jours de formation offerts, pas de remise en argent. Phrases : « I fully understand your position. », « We can't offer a discount, but we can offer five days of training free of charge. » L'objection : « Five days is not enough. » Réponse : « What would make this acceptable for you? ». Accord : sept jours, étalés sur deux mois. J'ai conclu : « Let me summarise what we've agreed. » Ma faute : « We propose you five days » ; correction : « We can offer you five days ».",
    "Jeu de rôle : un fournisseur espagnol réclame le paiement d'une facture bloquée et menace de suspendre les livraisons. Reformulation : « So, invoice 9045 is 45 days overdue and you might stop deliveries. » Explication : « The invoice was blocked because the quantity doesn't match the delivery note. » Solution : « If you send us a corrected invoice today, we can pay it on Friday. » Son objection : « It's your warehouse's mistake. » Ma réponse : « You may be right; I'll check with our warehouse and call you back within an hour. » Ma faute : « The invoice is blocked since one month ».",
    "Négociation simulée du salaire avec un candidat espagnol. Il demandait 52 000 € ; notre budget était de 47 000 €. Phrases : « We really want you to join our team. », « Our budget for this position is 47,000 euros gross per year. » Son objection : « It's less than my current salary in Madrid. » Réponse : « I understand. On top of the salary, we offer relocation support, a thirteenth month and two extra days off. » Accord : 48 500 € et une aide au logement. Ma maladresse : « It's our last price » ; correction : « This is our final offer ». J'ai aussi appris à ne pas répondre trop vite.",
    "Jeu de rôle : un client anglais réclame après une livraison arrivée avec trois jours de retard et des cartons écrasés. Reformulation : « So the goods arrived on Thursday instead of Monday, and some boxes were damaged. » Excuse : « I apologise for the inconvenience. » Solution : « We'll replace the damaged parts at no cost and give you 10 % off the transport costs. » Son objection : « We want the full transport cost refunded. » Réponse : « I understand, but the delay was partly due to customs. Could we meet halfway, at 50 %? » Accord à 50 %. Ma faute : « We are sorry of the delay ».",
    "Négociation simulée avec l'acheteur suédois sur le contrat 2027. Il demandait 8 % de remise ; ma limite était 4 %. J'avais préparé trois concessions : délai de paiement, stock de sécurité, échantillons gratuits. Son objection : « Your competitor offers a lower price. » Réponse : « That may be true, but our fabric lasts twice as long, so your cost per year is lower. » Concession : « If you commit to 20,000 m², we can offer 4 % and keep a safety stock for you. » Accord à 4 % avec le stock. Ma maladresse : « I can't go down more » ; correction : « I can't go any lower ».",
  ],
];

const BILANS_PERSONNELS = [
  "Ce travail m'a surtout appris à oser parler avant d'avoir construit toute ma phrase dans ma tête.",
  "Le plus difficile a été de tenir le temps de l'exercice ; je reprendrai ce texte avec mon équipe la semaine prochaine.",
  "J'ai montré ma production à un collègue qui travaille avec l'étranger, il m'a fait deux remarques que j'ai intégrées.",
  "Je vais réutiliser ces phrases dès lundi avec nos partenaires étrangers.",
  "J'ai comparé ma production avec celle d'un autre stagiaire en binôme, ce qui m'a fait corriger un oubli.",
  "La correction du formateur m'a permis de repérer une erreur de grammaire que je faisais sans m'en rendre compte.",
  "J'avais des doutes sur ce sujet en arrivant, je me sens maintenant capable de le refaire seul{e}.",
  "Je me suis appuyé{e} sur les modèles de phrases fournis, que je garderai sur mon bureau.",
  "Je n'ai pas eu le temps de tout relire, mais l'essentiel du message est là.",
  "J'ai posé une question au formateur pendant l'exercice, ce qui m'a évité une formule maladroite.",
  "Je vais ajouter les nouveaux mots de cet exercice à mon glossaire personnel.",
  "Je dois encore gagner en rapidité à l'oral, mais je sais maintenant comment m'y prendre.",
];

/** Banque de la mise en situation à partir de son titre (ou de sa consigne), sinon de son rang. */
function blocExercice(contexte: string, exerciceIdx: number): number {
  const t = contexte || "";
  const num = t.match(/\bExercice\s+(\d{1,2})\b/i);
  if (num) {
    const n = parseInt(num[1], 10);
    if (n >= 1 && n <= EXERCICES_PRODUCTIONS.length) return n - 1;
  }
  const c = t.match(/\bC([1-6])\b/);
  if (/diagnostic de d[ée]part/i.test(t)) return 0;
  if (c) {
    const k = parseInt(c[1], 10);
    if (k === 1) return /glossaire|grammaire/i.test(t) ? 2 : 1;
    if (k === 2) return /compte rendu|ordre du jour/i.test(t) ? 4 : 3;
    if (k === 3) return /visio/i.test(t) ? 6 : 5;
    if (k === 4) return 7;
    if (k === 5) return 8;
    return 9;
  }
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickANG40ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isANG40Formation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);
  const bloc = blocExercice(contexte || "", exerciceIdx);

  // Production tirée par permutation du rang du stagiaire, avec le même décalage pour toutes les
  // banques : un stagiaire garde le même poste d'un exercice à l'autre, et sur un groupe de
  // 8 stagiaires les 8 productions d'un même exercice sont toutes différentes. Le bilan personnel
  // change d'un exercice à l'autre. L'entreprise du stagiaire est citée quand elle est renseignée.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[rang(stagiaireIdx, 3, pool.length)];
  const bilan = BILANS_PERSONNELS[rang(stagiaireIdx, bloc + 11, BILANS_PERSONNELS.length)];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai rattaché l'exercice à ma situation de travail chez ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "BTS Commerce international, assistant{e} export depuis 2017",
  "DUT Gestion logistique et transport, puis dix ans en entrepôt",
  "BTS Assistance technique d'ingénieur, puis dix ans en maintenance itinérante",
  "Licence professionnelle Achats et approvisionnements",
  "BTS Comptabilité et gestion, comptable fournisseurs depuis 2015",
  "Master en gestion des ressources humaines",
  "Diplôme d'ingénieur en génie des procédés",
  "Baccalauréat STMG, puis huit ans d'administration des ventes",
  "BTS Négociation et digitalisation de la relation client",
  "Diplôme d'école de commerce, spécialité marketing",
  "Licence d'économie-gestion",
  "BTS Support à l'action managériale",
  "Baccalauréat professionnel Maintenance des équipements industriels",
  "Master en management de projets informatiques",
  "BTS Gestion des transports et logistique associée",
  "DUT Qualité, logistique industrielle et organisation",
  "CAP Opérateur logistique, puis promotion interne comme chef d'équipe",
  "Licence de langues étrangères appliquées, sans pratique de l'anglais depuis dix ans",
  "BTS Électrotechnique",
  "Master en contrôle de gestion et audit",
  "Baccalauréat général, puis douze ans dans le service client d'une PME",
  "DUT Techniques de commercialisation",
  "Diplôme d'ingénieur en mécanique, bureau d'études depuis 2012",
  "BTS Conception des produits industriels",
  "Aucun diplôme supérieur : vingt ans d'expérience dans les achats industriels",
  "Licence professionnelle Management des organisations",
  "BTS Tourisme, puis reconversion dans l'assistanat de direction",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant chaque journée.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières pendant les six jours me conviennent.",
  "Non. Je porte des lunettes et j'apprécie des supports en police suffisamment grande.",
  "Non, pas de handicap. Je précise que j'entends moins bien dans les pièces bruyantes : une salle calme pour les écoutes m'aidera.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je souhaite seulement recevoir les enregistrements audio des exercices pour les réécouter.",
  "Non, aucune situation de handicap. J'ai besoin d'un peu plus de temps pour les exercices écrits, je le signalerai si besoin.",
  "Non. Je préfère avoir les supports en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté lors de l'entretien.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible les six jours de formation, dans les locaux de l'entreprise, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> (<strong>13h30 – 15h30</strong> le sixième jour).",
  "Je bloque les six jours de formation dans mon agenda (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>, fin à 15h30 le dernier jour) ; un collègue reprend mes appels pendant la formation, dans nos locaux.",
  "Je suis disponible les six jours de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>, dans la salle de réunion de l'entreprise. Le sixième jour se termine à <strong>15h30</strong>.",
  "Je peux suivre l'intégralité des six jours de formation en présentiel dans les locaux de l'entreprise, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible les six jours (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, <strong>13h30 – 15h30</strong> le dernier jour). Mon responsable a validé mon absence de poste, la formation ayant lieu dans nos locaux.",
  "Disponibilité complète sur les six jours de formation (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). La formation ayant lieu dans les locaux de l'entreprise, je préviens mon équipe que je ne serai pas joignable.",
  "Les six jours de formation, je suis disponible de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> dans les locaux de l'entreprise ; mon équipe gère les urgences pendant ces créneaux.",
  "Je suis disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> les six jours, et jusqu'à <strong>15h30</strong> le sixième jour. Je suivrai la formation dans la salle prévue dans nos locaux.",
  "Je suivrai les six jours de formation dans les locaux de l'entreprise (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) et je prévois un quart d'heure le soir pour revoir le vocabulaire.",
  "Aucune contrainte sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> des six jours, dans les locaux de l'entreprise. J'ai prévenu mes interlocuteurs habituels de mon indisponibilité.",
];

/** Réponses d'évaluation des besoins propres à la formation Anglais Professionnel 40 h, différentes pour chaque stagiaire. */
export function getANG40EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = ang40Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilANG40(idx, s.nom, s.prenom);
  const pick = (arr: string[], sel: number) => accorder(arr[rang(base, sel, arr.length)], fem);
  const ent = (txt: string) =>
    accorder(
      txt
        .replace(/\{un\}/g, fem ? "une" : "un")
        .replace(/\{collab\}/g, fem ? "collaboratrice" : "collaborateur")
        .replace(/\{le_sal\}/g, fem ? "la salariée" : "le salarié"),
      fem,
    );
  const civilite = s.civilite === "Mme" ? "Madame" : s.civilite === "M." ? "Monsieur" : (s.civilite || "Madame");

  return {
    civilite,
    raisonSociale: hasEntreprise ? (s.entreprise as string) : "/",
    attentes: ent(profil.attentes),
    missions: ent(profil.missions),
    contribution: ent(profil.contribution),
    diplome: pick(BESOINS_DIPLOMES, 4),
    objectif: ent(profil.objectif),
    budget: hasEntreprise
      ? "Formation financée par l'entreprise dans le cadre de son plan de développement des compétences."
      : "Financement personnel",
    projetPro: ent(profil.projet),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
