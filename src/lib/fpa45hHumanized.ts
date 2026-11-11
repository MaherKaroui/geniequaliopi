// ---------------------------------------------------------------------------
// « Formation de formateur professionnel pour adultes (TP FPA – RNCP37275) » — moteur de réponses HUMANISÉES
// Formation certifiante : prépare aux compétences des 4 CCP du titre professionnel Formateur professionnel
// d'adultes (RNCP37275) ; évaluation interne + attestation de fin de formation ; épreuves devant un jury habilité.
// 45 heures, entièrement à distance en classe virtuelle (Google Meet / Zoom), formateur unique.
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes…), puis
//     parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes, dans l'ordre des 10 mises en situation, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par mise en situation + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Inès, Horizon Compétences, Rivaulieu, Logistique Morvaine, Karim, Sonia, Paul et Mélissa, cités dans
// les copies, sont des personnes et situations FICTIVES.
// ---------------------------------------------------------------------------

const normalize = (s?: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Formation de formateur professionnel pour adultes (TP FPA – RNCP37275) ».
 * Reconnue par : « formateur professionnel pour adultes », « formateur professionnel d'adultes »
 * (et au féminin), « TP FPA », ou un code / intitulé contenant « RNCP37275 » ou « 37275 »
 * (accents, apostrophes et casse indifférents). Jamais « formateur PRAP », « formateur SST » ni « formateur » seul.
 */
export function isFPA45Formation(intitule?: string, code?: string): boolean {
  const c = normalize(code).toLowerCase().replace(/[^a-z0-9]+/g, "");
  if (/(^|rncp)37275$/.test(c)) return true;
  const t = normalize(intitule).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[^a-z0-9']+/g, " ").trim();
  if (/\b(rncp ?)?37275\b/.test(t)) return true;
  if (/\btp fpa\b/.test(t)) return true;
  return /\bformat(eur|rice)s? professionnel(le)?s? (pour |d'|d |des )adultes?\b/.test(t);
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function fpa45Seed(nom?: string, prenom?: string): number {
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
  typeof idx === "number" && idx >= 0 ? idx : fpa45Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// métier et environnement de la formation, analyse de la demande et objectifs, progression et scénario
// multimodal, animation, évaluation et remédiation, accueil et parcours, tutorat à distance,
// réglementation et qualité, veille et analyse de pratique, supports et épreuves du titre
// ---------------------------------------------------------------------------
export const FPA45_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Selon vous, en quoi consiste le métier de formateur d'adultes et qui finance la formation professionnelle ?", reponseAttendue: "Repérage des activités du formateur (concevoir, animer, évaluer, accompagner) et de quelques acteurs et financements (entreprise, opérateurs de compétences, régions, France Travail, compte personnel de formation) ; idée d'un titre professionnel reconnu et d'obligations de l'organisme de formation." },
    { question: "Si une entreprise vous demandait une formation, comment vous y prendriez-vous pour définir ce qu'elle doit apporter ?", reponseAttendue: "Idée d'analyser la demande (contexte, public, compétences attendues) avant de concevoir ; distinction entre demande, besoin et objectif ; objectif formulé du point de vue de l'apprenant avec un verbe d'action." },
    { question: "Comment organiseriez-vous les étapes d'une formation qui mélange présentiel et distanciel ?", reponseAttendue: "Progression du simple au complexe, découpage en séquences, choix de modalités (présentiel, distanciel synchrone et asynchrone, situation de travail) et de méthodes ; activités d'apprentissage et d'évaluation prévues à chaque étape." },
    { question: "Comment animeriez-vous une séance pour un groupe d'adultes, en salle ou en classe virtuelle ?", reponseAttendue: "Ouverture avec objectif et déroulé, consignes claires, alternance d'apports et d'activités, interactions, gestion du temps et du groupe, adaptation aux personnes, clôture et synthèse ; outils de classe virtuelle." },
    { question: "Comment vérifieriez-vous qu'un apprenant a bien appris, et que feriez-vous s'il n'y arrive pas ?", reponseAttendue: "Évaluations diagnostique, formative et sommative ; critères observables ; feedback ; recherche de l'origine de la difficulté et remédiation adaptée." },
    { question: "Comment accueilleriez-vous un nouvel apprenant, notamment s'il est en situation de handicap ?", reponseAttendue: "Accueil et information, entretien de positionnement, parcours co-construit, contrat pédagogique ; référent handicap, compensation, partenaires comme l'Agefiph, confidentialité." },
    { question: "Comment suivriez-vous des apprenants qui travaillent seuls à distance ?", reponseAttendue: "Tutorat à distance : accueil, assistance technique et pédagogique, suivi des connexions et des activités, relances personnalisées, prévention des abandons." },
    { question: "Quelles règles et obligations un formateur doit-il respecter selon vous ?", reponseAttendue: "Obligations de l'organisme (règlement intérieur, convention ou contrat, attestation), démarche qualité Qualiopi, protection des données personnelles, accessibilité, prévention des violences et du harcèlement, réglementation de sa spécialité." },
    { question: "Comment un formateur se tient-il à jour et améliore-t-il sa pratique ?", reponseAttendue: "Veille réglementaire, pédagogique et métier sur des sources fiables ; analyse de pratique sur des situations vécues ; actions d'amélioration ; échanges entre pairs." },
    { question: "Quels supports utiliseriez-vous en formation, et savez-vous comment se passent les épreuves du titre FPA ?", reponseAttendue: "Supports variés (diaporama, visuels, ressources interactives, capsules vidéo) lisibles et accessibles ; idée d'un dossier professionnel, de dossiers techniques et d'épreuves orales devant un jury." },
  ],
  fin: [
    { question: "Comment présentez-vous désormais le titre FPA et l'environnement de la formation professionnelle ?", reponseAttendue: "Titre RNCP37275, niveau 5, ministère chargé de l'emploi, 4 CCP capitalisables, VAE possible ; action de formation (art. L6313-1 et L6313-2) ; acteurs (État, régions, France Compétences, opérateurs de compétences, France Travail, Caisse des dépôts, Agefiph) ; CPF et délai de 11 jours ouvrés ; obligations de l'organisme et Qualiopi (L6316-1)." },
    { question: "Comment analysez-vous une demande de formation et rédigez-vous les objectifs ?", reponseAttendue: "Questions au commanditaire (contexte, public, compétences attendues, contraintes, indicateurs), distinction demande, besoin, objectif ; objectif général et objectifs opérationnels (verbe observable, conditions, critères, SMART, taxonomie de Bloom) ; cahier des charges ; conditions d'apprentissage de l'adulte (Knowles)." },
    { question: "Comment construisez-vous une progression et un scénario pédagogique multimodal ?", reponseAttendue: "Démarche ADDIE, progression en séquences, répartition présentiel, distanciel synchrone et asynchrone, formation en situation de travail ; scénario (objectif, durée, phases, méthodes, activités, ressources, évaluation) ; classe inversée ; scénario d'accompagnement." },
    { question: "Comment animez-vous une séance en présentiel et en classe virtuelle ?", reponseAttendue: "Ouverture, consignes complètes, alternance des méthodes, interactions fréquentes à distance (sondages, tableau blanc, sous-groupes), gestion du groupe et des situations difficiles, adaptations individuelles, feedback, clôture." },
    { question: "Comment évaluez-vous les acquis et remédiez-vous aux difficultés ?", reponseAttendue: "Évaluations diagnostique, formative, sommative ; grille critériée (critères, indicateurs, seuil) ; feedback factuel ; analyse de l'origine de la difficulté et remédiation ; modèle de Kirkpatrick (réaction, apprentissage, comportement, résultats)." },
    { question: "Comment accueillez-vous un apprenant et co-construisez-vous son parcours ?", reponseAttendue: "Étapes de l'accueil, entretien de positionnement, parcours individualisé et contrat pédagogique ; référent handicap, compensation, Agefiph, confidentialité ; aménagements des supports, du rythme et des évaluations." },
    { question: "Comment organisez-vous le tutorat à distance et l'accompagnement du développement professionnel ?", reponseAttendue: "Assistance technique et pédagogique (art. D6313-3-1), plan de tutorat (fonctions, moments, canaux, délais), indicateurs de suivi, relances personnalisées, prévention des abandons ; bilan, portfolio, plan d'action après la formation." },
    { question: "Comment inscrivez-vous votre pratique dans la réglementation et la démarche qualité ?", reponseAttendue: "Référentiel national qualité modifié par le décret n° 2026-728 (7 critères, 33 indicateurs au 1er novembre 2026) ; règlement intérieur, convention ou contrat, attestation et certificat de réalisation ; RGPD ; accessibilité et RGAA ; prévention des violences, du harcèlement et des discriminations ; responsabilité sociale." },
    { question: "Comment organisez-vous votre veille et l'analyse de votre pratique ?", reponseAttendue: "Veille réglementaire, pédagogique, métier et technologique sur des sources fiables, fréquence, fiche datée et exploitation ; analyse de pratique selon le cycle de Kolb (expérience, observation réfléchie, conceptualisation, expérimentation active) ; actions d'amélioration tracées." },
    { question: "Comment concevez-vous vos supports et préparez-vous les épreuves du titre ?", reponseAttendue: "Supports PowerPoint, Canva, Genially et capsules vidéo lisibles, accessibles et respectueux des droits ; dossier professionnel ; dossiers techniques et durées des épreuves des 4 CCP (35 min, 30 min, 45 min, 1 h 20) ; analyse de pratique du CCP 4 ; jury habilité par la DREETS ; passage des épreuves obligatoire." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle.
// Aucune réponse à 1 au début : au plus 5 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — métier et environnement de la formation
  [
    ["Pour moi, un formateur explique ce qu'il sait ; je ne sais pas qui paie les formations.", 0],
    ["Le formateur prépare et anime des cours pour des adultes ; j'ai utilisé mon CPF pour m'inscrire, mais je ne connais pas les autres financements.", 0.5],
    ["Il suffit d'être bon dans son métier pour être formateur, il n'y a rien d'autre à apprendre.", 0],
    ["Je sais que l'entreprise peut financer, avec un organisme, je crois que ça s'appelle un OPCO.", 0.5],
    ["Je n'ai jamais entendu parler du titre FPA avant de chercher cette formation.", 0],
    ["Le formateur conçoit, anime et évalue ; pour le financement, je connais le CPF et France Travail.", 0.5],
    ["C'est l'État qui paie toutes les formations, je pense.", 0],
    ["J'ai déjà formé des collègues sur le terrain, mais je ne connais pas les règles des organismes de formation.", 0.5],
    ["Je crois que n'importe qui peut ouvrir un organisme de formation sans démarche.", 0],
    ["J'ai entendu parler de Qualiopi par mon ancien employeur, sans savoir exactement ce que c'est.", 0.5],
    ["Je ne sais pas, c'est justement pour ça que je suis cette formation.", 0],
    ["Le titre de formateur est reconnu par l'État, je crois, mais je ne connais pas son contenu.", 0.5],
  ],
  // Q2 — analyse de la demande et objectifs
  [
    ["Je ferais directement un programme avec ce que je sais du sujet.", 0],
    ["Je demanderais à l'entreprise ce qu'elle veut et combien de personnes sont concernées.", 0.5],
    ["L'objectif, c'est ce que le formateur va expliquer.", 0],
    ["Je regarderais ce que les salariés savent déjà faire avant de commencer, je pense.", 0.5],
    ["Je reprendrais un programme trouvé sur internet.", 0],
    ["Je sais qu'il faut des objectifs, mais je ne saurais pas comment les écrire.", 0.5],
    ["Ce n'est pas au formateur de définir ce que la formation doit apporter.", 0],
    ["J'essaierais de comprendre le problème de l'entreprise, par exemple des erreurs ou des accidents.", 0.5],
    ["Je ferais une formation la plus longue possible pour être sûr{e} de tout couvrir.", 0],
    ["Un objectif doit être mesurable, on me l'a dit en entreprise, mais je ne sais pas l'appliquer à une formation.", 0.5],
    ["Je n'ai aucune idée de la méthode.", 0],
    ["Je demanderais ce que les personnes devront savoir faire à la fin, sans aller plus loin.", 0.5],
  ],
  // Q3 — progression et scénario multimodal
  [
    ["Je ferais tout en présentiel, c'est plus simple.", 0],
    ["Je commencerais par les bases et j'irais vers le plus difficile, avec un peu de visio.", 0.5],
    ["Je mettrais tout le cours en vidéo et les apprenants se débrouillent.", 0],
    ["Je sais qu'on peut alterner salle et distanciel, mais je ne sais pas comment répartir.", 0.5],
    ["Je ne connais pas le mot multimodal.", 0],
    ["Je découperais en plusieurs séances avec un exercice à chaque fois.", 0.5],
    ["L'ordre des séances n'a pas d'importance.", 0],
    ["J'ai déjà suivi une formation avec des modules en ligne avant les séances, je m'en inspirerais.", 0.5],
    ["Je lirais le support du début à la fin, c'est le plus logique.", 0],
    ["Je prévoirais de la pratique sur le terrain, mais je ne sais pas si cela compte comme de la formation.", 0.5],
    ["Je ne sais pas ce qu'est un scénario pédagogique.", 0],
    ["Je ferais des séances courtes en visio et des exercices à faire seul, sans savoir comment les organiser.", 0.5],
  ],
  // Q4 — animation
  [
    ["Je parlerais pendant toute la séance, les questions à la fin.", 0],
    ["Je présenterais le programme au début et je ferais faire des exercices.", 0.5],
    ["En visio, je couperais les micros de tout le monde pour être tranquille.", 0],
    ["J'ai l'habitude d'expliquer à des collègues sur le terrain, mais jamais devant un groupe.", 0.5],
    ["Je ne sais pas animer en classe virtuelle.", 0],
    ["J'essaierais de faire participer tout le monde, avec des questions.", 0.5],
    ["Si quelqu'un parle trop, je lui demanderais de se taire devant le groupe.", 0],
    ["Je donnerais des exemples tirés de mon expérience pour rendre la séance vivante.", 0.5],
    ["Je projetterais le support et je le lirais.", 0],
    ["Je sais qu'il faut faire des pauses et varier les activités, mais je ne sais pas comment m'y prendre.", 0.5],
    ["J'ai peur de parler en public, je ne sais pas comment je ferais.", 0],
    ["En visio, j'utiliserais la conversation écrite pour les questions, je pense.", 0.5],
  ],
  // Q5 — évaluation et remédiation
  [
    ["Je demanderais aux apprenants s'ils ont compris.", 0],
    ["Je ferais un petit test à la fin pour vérifier.", 0.5],
    ["S'il n'y arrive pas, c'est qu'il n'est pas fait pour ce métier.", 0],
    ["Je réexpliquerais autrement à celui qui n'a pas compris.", 0.5],
    ["Je ne connais pas les différents types d'évaluation.", 0],
    ["Je regarderais les apprenants faire et je corrigerais au fur et à mesure.", 0.5],
    ["Je mettrais une note sans expliquer.", 0],
    ["J'ai entendu parler d'évaluation formative, sans savoir ce que c'est vraiment.", 0.5],
    ["Je referais exactement la même explication, plus lentement.", 0],
    ["Je ferais un QCM, mais je ne sais pas comment évaluer un geste professionnel.", 0.5],
    ["Je ne sais pas.", 0],
    ["Je demanderais à un autre apprenant d'aider celui qui a du mal.", 0.5],
  ],
  // Q6 — accueil, parcours, handicap
  [
    ["Je lui donnerais le planning et on commence.", 0],
    ["Je lui présenterais la formation et je lui demanderais ses attentes.", 0.5],
    ["Le handicap, c'est le problème de la médecine du travail, pas du formateur.", 0],
    ["Je sais qu'il existe un référent handicap dans les organismes, sans connaître son rôle.", 0.5],
    ["Je traiterais tout le monde exactement pareil, sans exception.", 0],
    ["J'adapterais si la personne me le demande, par exemple pour la taille des documents.", 0.5],
    ["Je parlerais de son handicap au groupe pour que tout le monde soit au courant.", 0],
    ["Je ferais un entretien au début pour connaître son parcours, je pense.", 0.5],
    ["Je ne sais pas ce qu'est un parcours individualisé.", 0],
    ["J'ai entendu parler de l'Agefiph, mais je ne sais pas ce qu'elle finance.", 0.5],
    ["L'accueil se fait par le secrétariat, je ne m'en occuperais pas.", 0],
    ["Je demanderais à la personne ce dont elle a besoin pour suivre dans de bonnes conditions.", 0.5],
  ],
  // Q7 — tutorat à distance
  [
    ["S'ils travaillent seuls, ils n'ont pas besoin de moi.", 0],
    ["Je leur enverrais un message de temps en temps pour savoir où ils en sont.", 0.5],
    ["Je regarderais seulement le résultat final.", 0],
    ["Je donnerais mon adresse e-mail pour qu'ils posent leurs questions.", 0.5],
    ["Je ne sais pas ce qu'est le tutorat à distance.", 0],
    ["Je sais que les plateformes indiquent si les gens se connectent, je m'en servirais.", 0.5],
    ["Si quelqu'un ne se connecte pas, c'est son choix, je ne relancerais pas.", 0],
    ["Je prévoirais des rendez-vous en visio réguliers.", 0.5],
    ["Je mettrais toutes les ressources en ligne d'un coup.", 0],
    ["J'ai moi-même abandonné une formation en ligne faute de suivi ; je sais que c'est important.", 0.5],
    ["Je n'y ai jamais réfléchi.", 0],
    ["Je relancerais ceux qui ont du retard par téléphone, je pense.", 0.5],
  ],
  // Q8 — réglementation et qualité
  [
    ["À part être compétent dans son domaine, je ne vois pas de règles.", 0],
    ["Je sais qu'il faut faire signer une feuille de présence.", 0.5],
    ["Les règles concernent l'organisme, pas le formateur.", 0],
    ["Je connais le RGPD dans mon ancien poste, il doit s'appliquer aussi aux apprenants.", 0.5],
    ["Je ne connais pas Qualiopi.", 0],
    ["Je sais qu'il y a un règlement intérieur dans les organismes de formation.", 0.5],
    ["On peut garder et partager les notes des apprenants comme on veut.", 0],
    ["Il faut rendre les supports lisibles pour tout le monde, je crois, mais je ne connais pas de référentiel.", 0.5],
    ["Le harcèlement en formation, ce n'est pas au formateur de s'en occuper.", 0],
    ["Je pense que Qualiopi est une certification pour les organismes, avec des contrôles.", 0.5],
    ["Je ne sais pas.", 0],
    ["Le formateur doit respecter la sécurité de son métier quand il montre des gestes, je pense.", 0.5],
  ],
  // Q9 — veille et analyse de pratique
  [
    ["Avec l'expérience, on n'a plus besoin de se mettre à jour.", 0],
    ["Je lis des articles sur mon métier de temps en temps.", 0.5],
    ["Je ne sais pas ce qu'est une veille.", 0],
    ["Je demanderais l'avis des apprenants à la fin pour m'améliorer.", 0.5],
    ["Analyser sa pratique, c'est noter ses erreurs dans un carnet, sans plus.", 0],
    ["Je suis des comptes professionnels sur les réseaux, mais je ne vérifie pas toujours les sources.", 0.5],
    ["Si une séance se passe mal, c'est souvent la faute du groupe.", 0],
    ["Je repense à ce qui n'a pas marché pour faire mieux la fois suivante.", 0.5],
    ["Je n'ai pas le temps de faire de la veille.", 0],
    ["J'ai entendu parler d'analyse de pratique dans le médico-social, sans connaître la méthode.", 0.5],
    ["Je ne vois pas à quoi cela sert.", 0],
    ["Je consulterais des sites officiels pour les changements de réglementation de mon métier.", 0.5],
  ],
  // Q10 — supports et épreuves du titre
  [
    ["Un diaporama avec beaucoup de texte suffit.", 0],
    ["Je sais faire un PowerPoint ; je ne connais pas Genially.", 0.5],
    ["Je prendrais des images sur internet sans me poser de questions.", 0],
    ["J'ai déjà utilisé Canva pour des affiches, je pourrais m'en servir.", 0.5],
    ["Je ne sais pas comment se passe l'examen du titre.", 0],
    ["Je crois qu'il faut passer devant un jury, mais je ne sais pas avec quels documents.", 0.5],
    ["Le titre est donné automatiquement à la fin de la formation, je pense.", 0],
    ["J'ai entendu parler d'un dossier professionnel à rédiger, sans savoir ce qu'il contient.", 0.5],
    ["Une vidéo d'une heure est le meilleur support.", 0],
    ["Je ferais des supports simples avec des schémas, je pense que c'est plus clair.", 0.5],
    ["Je n'ai jamais créé de support de formation.", 0],
    ["Je sais filmer avec mon téléphone ; je pourrais faire de petites vidéos de démonstration.", 0.5],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["Le titre Formateur professionnel d'adultes est enregistré sous le code RNCP37275, au niveau 5, et délivré par le ministère chargé de l'emploi ; il comprend 4 CCP capitalisables.", 1],
    ["L'action de formation est un parcours pédagogique permettant d'atteindre un objectif professionnel, au sens des articles L6313-1 et L6313-2 du Code du travail.", 1],
    ["Les principaux acteurs sont l'État, les régions, France Compétences, les opérateurs de compétences, France Travail, la Caisse des dépôts et l'Agefiph.", 1],
    ["Avec le CPF, la demande se fait sur Mon Compte Formation et l'entrée en formation intervient au plus tôt 11 jours ouvrés après sa validation.", 1],
    ["L'organisme doit avoir une déclaration d'activité, un règlement intérieur, une convention ou un contrat, et remettre une attestation et un certificat de réalisation.", 1],
    ["Qualiopi est obligatoire pour recevoir des fonds publics ou mutualisés, dont le CPF (article L6316-1).", 1],
    ["Je présente les 4 CCP : concevoir, animer et évaluer, accompagner, qualité et responsabilité sociale.", 0.5],
    ["Le titre peut aussi s'obtenir par la VAE ou CCP par CCP.", 1],
    ["L'organisme transmet chaque année un bilan pédagogique et financier.", 0.5],
    ["Le formateur peut être salarié d'un organisme, indépendant ou formateur interne en entreprise.", 0.5],
    ["France Compétences régule le système et tient les répertoires nationaux des certifications.", 1],
    ["Je sais maintenant expliquer qui finance quoi pour orienter un futur apprenant.", 0.5],
  ],
  [
    ["Je pose des questions au commanditaire sur le contexte, le public, les compétences attendues, les contraintes et les indicateurs de réussite.", 1],
    ["Je distingue la demande exprimée, le besoin réel, c'est-à-dire l'écart de compétences, et l'objectif visé.", 1],
    ["Un objectif opérationnel comporte un verbe d'action observable, des conditions de réalisation et des critères de réussite.", 1],
    ["J'utilise la taxonomie de Bloom pour choisir le bon niveau : appliquer ou analyser plutôt que connaître.", 1],
    ["Je formalise un cahier des charges : contexte, public, objectifs, contenus, modalités, évaluation, planning, budget.", 1],
    ["Selon Knowles, l'adulte a besoin de savoir pourquoi il apprend et s'appuie sur son expérience.", 1],
    ["Je vérifie qu'un objectif est SMART avant de le valider avec le commanditaire.", 0.5],
    ["J'évite les verbes comme « comprendre » ou « savoir », qu'on ne peut pas observer.", 0.5],
    ["L'objectif général décrit la finalité ; les objectifs opérationnels détaillent ce que l'apprenant fera.", 1],
    ["Je fais valider l'analyse de la demande avant de concevoir quoi que ce soit.", 0.5],
    ["Je reformule la demande pour vérifier que j'ai bien compris le problème de l'entreprise.", 0.5],
    ["Je relie chaque objectif à un indicateur que l'entreprise peut suivre après la formation.", 0.5],
  ],
  [
    ["J'applique la démarche ADDIE : analyse, conception, développement, mise en œuvre, évaluation.", 1],
    ["Je répartis les séquences entre présentiel, distanciel synchrone, distanciel asynchrone et formation en situation de travail.", 1],
    ["Le scénario précise pour chaque séquence l'objectif, la durée, les phases, la méthode, les activités, les ressources et l'évaluation.", 1],
    ["Je place les contenus de découverte avant la séance, en classe inversée, et je garde la séance pour la pratique.", 1],
    ["La formation en situation de travail alterne mises en situation et séquences réflexives (article D6313-3-2).", 1],
    ["Je construis la progression du simple au complexe et du connu vers l'inconnu.", 0.5],
    ["Je prévois des évaluations à chaque étape : diagnostique, formatives et sommative.", 1],
    ["Je choisis la méthode selon l'objectif : démonstrative pour un geste, active pour une mise en situation.", 1],
    ["Je prévois aussi un scénario d'accompagnement : tuteur, référent, assistance pour le distanciel.", 0.5],
    ["Je vérifie que la durée totale des séquences correspond à la durée prévue.", 0.5],
    ["Je prévois un plan B pour chaque séquence à distance en cas de problème technique.", 0.5],
    ["J'ai construit une progression multimodale complète dans ma spécialité.", 0.5],
  ],
  [
    ["J'ouvre la séance avec l'objectif, le déroulé et les règles de fonctionnement, puis je recueille les attentes.", 1],
    ["Une consigne complète précise la tâche, les conditions, la durée et le résultat attendu, et je la fais reformuler.", 1],
    ["En classe virtuelle, je prévois une interaction environ toutes les dix minutes : sondage, tableau blanc, sous-groupes.", 1],
    ["Face à un apprenant qui monopolise la parole, je distribue la parole et je lui confie une tâche valorisante.", 1],
    ["J'adapte ma séance aux personnes : consignes écrites pour une personne malentendante, consignes orales pour une personne peu à l'aise à l'écrit.", 1],
    ["Je termine par une synthèse faite par les apprenants et l'annonce de la suite.", 0.5],
    ["J'alterne apports courts et activités pour garder l'attention.", 0.5],
    ["Je donne un feedback rapide et centré sur la tâche pendant les exercices.", 1],
    ["Je gère le temps avec un minutage par phase.", 0.5],
    ["Je m'appuie sur l'expérience des apprenants adultes pour illustrer les apports.", 0.5],
    ["Je fais un test technique avant chaque classe virtuelle.", 0.5],
    ["J'ai animé une séance d'entraînement filmée et j'ai corrigé mes consignes.", 0.5],
  ],
  [
    ["L'évaluation diagnostique situe les acquis à l'entrée, la formative régule pendant, la sommative atteste à la fin.", 1],
    ["Une grille critériée comporte des critères, des indicateurs observables et un seuil de réussite fixé à l'avance.", 1],
    ["Le modèle de Kirkpatrick distingue la réaction, l'apprentissage, le comportement au poste et les résultats.", 1],
    ["Je cherche l'origine de la difficulté en faisant verbaliser la démarche de l'apprenant avant de remédier.", 1],
    ["Mon feedback commence par ce qui est réussi, décrit l'écart précis et propose une piste d'amélioration.", 1],
    ["La remédiation peut être une démonstration pas à pas, une fiche mémo ou un tutorat par un pair.", 1],
    ["Je propose une nouvelle évaluation après la remédiation.", 0.5],
    ["J'évalue un geste professionnel par observation avec une grille, pas seulement par un QCM.", 1],
    ["Je relie chaque critère d'évaluation à un objectif opérationnel.", 0.5],
    ["Je communique les critères aux apprenants avant l'évaluation.", 0.5],
    ["Je mesure aussi le transfert au poste avec le tuteur quelques semaines après la formation.", 0.5],
    ["J'ai construit une grille critériée pour une épreuve de ma spécialité.", 0.5],
  ],
  [
    ["L'accueil comprend l'information préalable, la présentation des interlocuteurs, la prise en main des outils et le recueil des attentes.", 1],
    ["L'entretien de positionnement permet de co-construire un parcours individualisé formalisé dans un contrat pédagogique.", 1],
    ["Pour une personne en situation de handicap, je mobilise le référent handicap et, si besoin, l'Agefiph pour la compensation.", 1],
    ["L'information sur le handicap reste confidentielle et n'est partagée qu'avec l'accord de la personne.", 1],
    ["Le contrat pédagogique fixe les objectifs, le parcours, les modalités, les engagements réciproques et le suivi.", 1],
    ["J'adapte les horaires et la part d'asynchrone pour une apprenante qui a des contraintes familiales.", 0.5],
    ["Je propose des aménagements de supports, de rythme et de durée d'évaluation.", 1],
    ["Je vérifie les prérequis et les acquis avant de fixer le parcours.", 0.5],
    ["Je remets le règlement intérieur et le livret d'accueil dès l'entrée.", 0.5],
    ["Je valide le parcours avec l'apprenant ; je ne le décide pas seul{e}.", 0.5],
    ["Je fais un point d'étape régulier pour ajuster le parcours.", 0.5],
    ["Je sais vers quels partenaires orienter une personne en difficulté avec l'écrit.", 0.5],
  ],
  [
    ["Pour une formation à distance, l'organisme assure une assistance technique et pédagogique et informe sur les activités et leur durée (article D6313-3-1).", 1],
    ["Mon plan de tutorat précise les fonctions du tuteur, les moments clés, les canaux et les délais de réponse.", 1],
    ["Je suis les connexions, les activités réalisées et les résultats des quiz pour repérer les risques d'abandon.", 1],
    ["Une relance efficace est personnalisée, bienveillante et propose une solution concrète.", 1],
    ["Le tuteur a des fonctions d'accueil, pédagogique, méthodologique, technique et motivationnelle.", 1],
    ["J'appelle l'apprenant si mon message reste sans réponse.", 0.5],
    ["En fin de parcours, je fais un bilan des acquis et un plan d'action pour la suite.", 1],
    ["J'aide l'apprenant à constituer un portfolio de ses compétences.", 0.5],
    ["Je conserve les relevés de connexion comme preuve de réalisation.", 0.5],
    ["Je fixe un seuil d'alerte d'inactivité dès le début de la formation.", 0.5],
    ["J'annonce mes délais de réponse dès l'accueil sur la plateforme.", 0.5],
    ["J'oriente vers d'autres dispositifs, comme la VAE, quand le projet de l'apprenant le justifie.", 0.5],
  ],
  [
    ["Le décret n° 2026-728 du 1er août 2026 a mis à jour le référentiel national qualité : 7 critères et 33 indicateurs au 1er novembre 2026.", 1],
    ["L'organisme remet le programme, le règlement intérieur, la convention ou le contrat, puis l'attestation et le certificat de réalisation.", 1],
    ["Pour le RGPD, j'applique la finalité, la minimisation, l'information des personnes et une durée de conservation limitée.", 1],
    ["Je rends mes supports accessibles en suivant le RGAA : contrastes, textes alternatifs, sous-titres, documents structurés.", 1],
    ["Face à des propos sexistes, je fais cesser immédiatement, je rappelle le règlement et j'applique la procédure de signalement.", 1],
    ["Le guide de lecture de novembre 2026 précise les attendus sur la prévention des violences et du harcèlement, aux indicateurs 12, 14 et 15.", 1],
    ["Je respecte aussi la réglementation de ma spécialité, notamment la sécurité quand je montre un geste.", 0.5],
    ["L'indicateur 32 est complété par une analyse des risques.", 0.5],
    ["Je ne partage jamais les résultats d'un apprenant avec le groupe.", 0.5],
    ["Le règlement intérieur est prévu par l'article L6352-3 du Code du travail.", 1],
    ["La responsabilité sociale passe par l'inclusion, la non-discrimination et la sobriété numérique.", 0.5],
    ["Je garde les preuves de ma pratique pour l'audit qualité de l'organisme.", 0.5],
  ],
  [
    ["J'analyse ma pratique avec le cycle de Kolb : expérience concrète, observation réfléchie, conceptualisation abstraite, expérimentation active.", 1],
    ["Ma veille couvre la réglementation, la pédagogie, ma spécialité et les outils, sur des sources fiables et datées.", 1],
    ["Chaque information de veille est tracée avec sa source, sa date, une synthèse et l'action décidée.", 1],
    ["Après une séance difficile, je décris les faits, j'en cherche les causes et je teste une nouvelle pratique.", 1],
    ["Je consulte Légifrance, le site du ministère du Travail, France Compétences et Centre Inffo.", 1],
    ["Je partage ma veille avec l'équipe pédagogique.", 0.5],
    ["L'analyse de pratique est aussi l'objet de l'épreuve du CCP 4.", 0.5],
    ["Je fixe une fréquence de veille mensuelle.", 0.5],
    ["Je mets à jour mes supports quand la réglementation change.", 0.5],
    ["Je distingue un fait d'une interprétation quand j'analyse une situation vécue.", 1],
    ["Les retours des apprenants alimentent mes actions d'amélioration.", 0.5],
    ["J'ai déjà rédigé deux analyses de pratique pour m'entraîner.", 0.5],
  ],
  [
    ["Je choisis PowerPoint pour un diaporama structuré, Canva pour des visuels, Genially pour des ressources interactives.", 1],
    ["Une capsule vidéo efficace est courte, centrée sur un objectif, scénarisée et sous-titrée.", 1],
    ["J'utilise des contenus libres de droits ou sous licence compatible et je cite mes sources.", 1],
    ["Le dossier professionnel présente des exemples réels de ma pratique et sert de support au jury.", 1],
    ["Épreuves : 35 min pour le CCP 1, 30 min pour le CCP 2, 45 min pour le CCP 3 et 1 h 20 pour le CCP 4.", 1],
    ["Au CCP 4, je tire un sujet parmi 6, je prépare 45 min une analyse de pratique et je la présente 10 min.", 1],
    ["Le jury est composé de professionnels habilités par la DREETS.", 0.5],
    ["Le passage des épreuves est obligatoire pour obtenir le titre.", 0.5],
    ["Les dossiers techniques font de 5 à 15 pages selon le CCP.", 0.5],
    ["Je m'entraîne à l'oral chronométré pour respecter les durées.", 0.5],
    ["J'obtiens l'accord des personnes filmées dans mes capsules.", 0.5],
    ["J'ai commencé mon dossier professionnel avec une situation réelle par activité.", 0.5],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [54, 51, 45, 45, 4, 8, 57, 36, 47, 13];

export function getFPA45AutoAnswers(
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
export function fpa45NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6). */
export function fpa45BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((fpa45NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `fpa45BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function fpa45ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = fpa45BonnesQcmDebut(n, idx, nom, prenom);
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
export function fpa45NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet (partie stagiaire), attentes, missions et contribution (partie entreprise).
// Public : professionnels expérimentés qui veulent devenir formateurs d'adultes.
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
    besoin: "Se reconvertir vers le métier de formateur d'adultes après quinze ans en logistique, en apprenant à concevoir et animer des formations.",
    objectif: "Je veux savoir construire une formation complète, de l'analyse de la demande à l'évaluation, pour former des préparateurs de commandes et des caristes.",
    projet: "Elle me permettra de devenir format{/rice} en logistique dans un organisme de formation et de préparer les épreuves du titre FPA.",
    attentes: "Formation suivie à titre personnel, dans le cadre d'une reconversion financée par le CPF : aucune attente d'employeur.",
    missions: "Ancien poste de responsable d'équipe en entrepôt : organisation des équipes, accueil et formation des nouveaux arrivants.",
    contribution: "Elle doit sécuriser un projet de reconversion vers la formation professionnelle.",
  },
  {
    besoin: "Transmettre un savoir-faire de cuisine acquis en douze ans de métier à des adultes en reconversion, avec des méthodes pédagogiques adaptées.",
    objectif: "Mon objectif est d'apprendre à rédiger des objectifs, à animer des séances de pratique et à évaluer des gestes professionnels avec une grille.",
    projet: "Elle m'aidera à intervenir comme format{/rice} en cuisine dans un organisme qui prépare au CAP et aux titres de la restauration.",
    attentes: "L'organisme partenaire attend que {le_sal} sache concevoir et évaluer des séquences de pratique professionnelle.",
    missions: "Chef de partie en restauration collective, tutorat d'apprentis en cuisine.",
    contribution: "Elle doit professionnaliser la transmission du métier auprès des apprenants adultes.",
  },
  {
    besoin: "Faire reconnaître une pratique de format{/rice} occasionnel{le} en entreprise et la structurer selon les attendus du titre FPA.",
    objectif: "Je souhaite formaliser mes pratiques d'animation, apprendre à évaluer les acquis et préparer le dossier professionnel du titre.",
    projet: "Elle me permettra d'obtenir le titre FPA et de devenir format{/rice} interne à temps plein.",
    attentes: "L'entreprise attend que {le_sal} conçoive des formations internes mesurables et suive leur transfert au poste.",
    missions: "Animation de formations internes à la sécurité et aux procédures, accueil des nouveaux salariés.",
    contribution: "Elle doit améliorer la qualité et l'efficacité des formations internes.",
  },
  {
    besoin: "Devenir format{/rice} en comptabilité et gestion après une période de recherche d'emploi, en apprenant à animer à distance.",
    objectif: "Mon objectif est de maîtriser la classe virtuelle, le tutorat à distance et la création de ressources asynchrones.",
    projet: "Elle m'aidera à proposer des formations en gestion à distance pour des organismes de formation.",
    attentes: "Formation suivie à titre personnel, pendant une période de recherche d'emploi, avec un financement par le CPF : aucune attente d'employeur.",
    missions: "Ancien poste de comptable en cabinet : tenue des dossiers, accompagnement des clients sur les logiciels.",
    contribution: "Elle doit permettre un retour à l'emploi dans le secteur de la formation.",
  },
  {
    besoin: "Structurer une activité de format{/rice} indépendant{e} en bureautique et outils numériques, et la faire reconnaître par un titre.",
    objectif: "Je veux savoir analyser une demande client, construire une progression multimodale et respecter les obligations d'un organisme de formation.",
    projet: "Elle me permettra de développer mon activité de formation auprès des entreprises et des organismes.",
    attentes: "Activité indépendante : besoin d'autonomie dans la conception et dans le respect de la réglementation et de la démarche qualité.",
    missions: "Conseil et formation en outils bureautiques auprès de petites entreprises.",
    contribution: "Elle doit sécuriser l'activité de formation sur le plan pédagogique et réglementaire.",
  },
  {
    besoin: "Passer du soin à la formation, en transmettant l'expérience d'aide-soignant{e} à de futurs professionnels du secteur sanitaire et social.",
    objectif: "Mon objectif est d'apprendre à accompagner des apprenants, à adapter la formation aux situations de handicap et à évaluer des pratiques.",
    projet: "Elle m'aidera à devenir format{/rice} dans un organisme qui prépare aux métiers de l'aide à la personne.",
    attentes: "L'établissement attend que {le_sal} accueille et forme les nouveaux professionnels avec une démarche structurée.",
    missions: "Soins d'hygiène et de confort, accueil et tutorat des stagiaires dans l'établissement.",
    contribution: "Elle doit améliorer l'accueil et la formation des nouveaux arrivants.",
  },
  {
    besoin: "Former des conducteurs et des préparateurs dans le transport après une carrière dans la conduite routière, en apprenant la pédagogie pour adultes.",
    objectif: "Je souhaite apprendre à construire des mises en situation, à donner un feedback et à évaluer des comportements professionnels.",
    projet: "Elle me permettra d'animer des formations dans un centre de formation au transport et à la logistique.",
    attentes: "Formation suivie à titre personnel, en reconversion professionnelle : aucune attente d'employeur.",
    missions: "Conduite de poids lourds, accompagnement des nouveaux conducteurs de l'entreprise.",
    contribution: "Elle doit consolider une reconversion vers la formation au transport.",
  },
  {
    besoin: "Transmettre un savoir-faire en esthétique à des adultes en reconversion, en structurant des séances de pratique et leur évaluation.",
    objectif: "Mon objectif est d'apprendre à concevoir un scénario pédagogique, à créer des supports visuels avec Canva et à évaluer avec des grilles.",
    projet: "Elle m'aidera à intervenir comme format{/rice} dans un organisme qui prépare aux certifications de l'esthétique.",
    attentes: "Gérant{e} d'institut : besoin d'autonomie pour concevoir et animer des formations en complément de l'activité.",
    missions: "Gestion d'un institut, soins esthétiques, accueil d'apprenties.",
    contribution: "Elle doit diversifier l'activité vers la formation professionnelle.",
  },
  {
    besoin: "Devenir format{/rice} en techniques de vente après une carrière commerciale, en apprenant à animer des groupes d'adultes.",
    objectif: "Je veux maîtriser l'animation de groupe, la gestion des situations difficiles et l'évaluation par mises en situation.",
    projet: "Elle me permettra de former des vendeurs et des conseillers clients dans un organisme de formation.",
    attentes: "L'entreprise attend que {le_sal} forme les nouveaux commerciaux avec des séquences structurées et évaluées.",
    missions: "Vente et négociation, animation de l'équipe commerciale, intégration des nouveaux vendeurs.",
    contribution: "Elle doit améliorer la montée en compétences des nouveaux commerciaux.",
  },
  {
    besoin: "Passer de maître d'apprentissage à format{/rice} dans le bâtiment, en maîtrisant la conception et l'évaluation des formations.",
    objectif: "Mon objectif est de construire des progressions qui alternent centre de formation et situation de travail, et d'évaluer les gestes sur chantier.",
    projet: "Elle m'aidera à devenir format{/rice} dans un organisme de formation aux métiers du bâtiment.",
    attentes: "L'entreprise attend que {le_sal} structure l'accueil et la formation des apprentis et des nouveaux compagnons.",
    missions: "Encadrement de chantier, tutorat d'apprentis, transmission des règles de sécurité.",
    contribution: "Elle doit fiabiliser la formation des apprentis et des nouveaux salariés.",
  },
  {
    besoin: "Évoluer d'un poste en ressources humaines vers l'animation de formations, en apprenant à concevoir des parcours multimodaux.",
    objectif: "Je souhaite apprendre à analyser un besoin de formation, à concevoir des ressources asynchrones et à mesurer le transfert au poste.",
    projet: "Elle me permettra de devenir format{/rice} en accompagnement de la carrière et en compétences transversales.",
    attentes: "L'entreprise attend que {le_sal} conçoive des formations internes et en évalue les effets.",
    missions: "Gestion administrative du personnel, plan de développement des compétences, intégration des salariés.",
    contribution: "Elle doit internaliser une partie des formations de l'entreprise.",
  },
  {
    besoin: "Transmettre une expérience d'agent{e} de sécurité à de futurs professionnels, en respectant la réglementation de la formation et de la spécialité.",
    objectif: "Mon objectif est de maîtriser la réglementation de la formation, la démarche qualité et l'évaluation des mises en situation professionnelles.",
    projet: "Elle m'aidera à devenir format{/rice} dans un organisme de formation aux métiers de la sécurité.",
    attentes: "Formation suivie à titre personnel, pour préparer un changement de métier : aucune attente d'employeur.",
    missions: "Surveillance de sites, accueil des nouveaux agents, rédaction de consignes de sécurité.",
    contribution: "Elle doit consolider un projet de reconversion vers la formation.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilFPA45(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

function entAccords(txt: string, fem: boolean): string {
  return accorder(
    txt.replace(/\{le_sal\}/g, fem ? "la salariée" : "le salarié"),
    fem,
  );
}

export function getFPA45Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return entAccords(profilFPA45(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — copie du stagiaire sur le fil rouge fictif
// Indices : 0 métier et environnement, 1 analyse de la demande et objectifs, 2 progression et scénario,
//           3 animation, 4 évaluation et remédiation, 5 accueil et parcours, 6 tutorat à distance,
//           7 réglementation et qualité, 8 veille et analyse de pratique, 9 supports et épreuves ;
//           8 productions par banque.
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Métier, titre FPA, environnement de la formation
  [
    "Pour la note d'Inès, j'ai présenté le titre RNCP37275 de niveau 5 et ses 4 CCP : concevoir, animer et évaluer, accompagner, qualité et responsabilité sociale. J'ai défini l'action de formation avec les articles L6313-1 et L6313-2. Pour le CPF, j'ai rappelé le délai de 11 jours ouvrés. J'avais oublié le bilan pédagogique et financier dans les obligations, je l'ai ajouté à la correction.",
    "J'ai d'abord écrit que le titre était délivré par France Compétences ; correction : il est délivré par le ministère chargé de l'emploi, France Compétences enregistre la fiche au RNCP. Le reste de ma note est juste : acteurs, financements, déclaration d'activité, règlement intérieur, convention, attestation, Qualiopi.",
    "J'ai construit un schéma des acteurs : État, régions, France Compétences, opérateurs de compétences, France Travail, Caisse des dépôts et Agefiph. Pour Horizon Compétences, Qualiopi est indispensable pour accéder au CPF et aux fonds mutualisés (article L6316-1). Le référentiel compte 33 indicateurs depuis le 1er novembre 2026.",
    "Je ne connaissais pas la définition de l'action de formation : un parcours pédagogique qui permet d'atteindre un objectif professionnel. J'ai retenu qu'elle peut être réalisée à distance ou en situation de travail. Pour le titre, j'ai cité les 4 CCP et la possibilité de la VAE.",
    "J'ai rattaché l'exercice à mon propre parcours : je finance cette formation avec mon CPF, via Mon Compte Formation, et j'ai respecté le délai d'entrée. Dans ma note, j'ai listé les obligations de l'organisme : déclaration d'activité, règlement intérieur, convention ou contrat, attestation et certificat de réalisation.",
    "Ma note présente les contextes d'exercice du métier : salarié d'organisme, indépendant ou formateur interne. Pour le titre FPA, j'ai précisé que les CCP sont capitalisables. J'avais confondu opérateurs de compétences et France Travail, le formateur m'a aidé{e} à distinguer leurs rôles.",
    "J'ai rédigé la note en une page pour les nouveaux formateurs d'Horizon Compétences : le titre RNCP37275, les acteurs et les financements, les obligations, puis Qualiopi. J'ai ajouté le décret n° 2026-728 qui a mis à jour le référentiel.",
    "Tous les éléments demandés sont présents. Je me suis trompé{e} sur le niveau du titre RNCP37275, que je pensais de niveau 4 ; c'est bien un titre de niveau 5. J'ai rappelé que le passage des épreuves est obligatoire pour obtenir le titre.",
  ],
  // 1 — Analyse de la demande et objectifs
  [
    "Pour Logistique Morvaine, j'ai listé les questions au commanditaire : turnover, erreurs, accidents, profils des nouveaux, contraintes horaires, logiciel utilisé. J'ai distingué la demande, le besoin et l'objectif. Mes objectifs opérationnels commencent par un verbe d'action observable avec un critère de réussite.",
    "J'avais écrit « comprendre les règles de sécurité » comme objectif ; correction : ce n'est pas observable. J'ai réécrit : appliquer les règles de circulation sans écart lors d'une préparation observée. J'ai situé mes objectifs au niveau appliquer de la taxonomie de Bloom.",
    "Mon cahier des charges reprend le contexte, le public, les objectifs, les contenus, la durée de 14 h, les modalités, l'évaluation et le planning. J'ai ajouté les conditions d'apprentissage de l'adulte : partir de cas réels de l'entrepôt et de l'expérience des préparateurs.",
    "J'ai eu du mal à distinguer besoin et demande. Le formateur m'a donné la règle : le besoin, c'est l'écart entre les compétences attendues et les compétences actuelles. Mes quatre objectifs sont SMART : sécurité, gestes, logiciel, contrôle qualité.",
    "J'ai rattaché l'exercice à ma spécialité : j'ai écrit l'objectif général puis trois objectifs opérationnels pour une formation de mon métier, avec des conditions et des critères. Pour Logistique Morvaine, j'ai repris la même méthode avec quatre objectifs.",
    "J'ai proposé un entretien avec le responsable de l'entrepôt et un tuteur pour analyser la demande. Les indicateurs de réussite retenus : moins d'erreurs de préparation et aucun accident lié à la circulation. Selon Knowles, l'adulte a besoin de savoir pourquoi il apprend : je l'ai intégré dans l'accroche.",
    "Ma copie est complète et mes objectifs sont validés ; j'avais oublié de demander s'il y avait des personnes en situation de handicap parmi les nouveaux préparateurs. Je l'ai ajouté dans les questions sur le public.",
    "J'ai reformulé la demande au commanditaire pour vérifier ma compréhension, puis rédigé l'objectif général. Les objectifs opérationnels sont au niveau appliquer et analyser de Bloom, avec un critère chiffré quand c'est possible.",
  ],
  // 2 — Progression et scénario multimodal
  [
    "J'ai construit une progression en six séquences pour les 14 h : sécurité et gestes en présentiel, découverte du logiciel en asynchrone, prise en main en classe virtuelle, formation en situation de travail avec un tuteur, évaluation finale en présentiel. J'ai suivi la démarche ADDIE.",
    "Mon scénario de la séquence gestes et postures précise l'objectif, la durée, les phases, la méthode démonstrative, l'activité de l'apprenant, le rôle du formateur et l'évaluation par observation. J'avais oublié les ressources, je les ai ajoutées.",
    "J'ai placé une capsule et un quiz avant la classe virtuelle : c'est la classe inversée. La séance synchrone sert à pratiquer le logiciel. Pour la situation de travail, j'ai prévu des mises en situation et des séquences réflexives avec le tuteur (article D6313-3-2).",
    "Ma première progression mettait l'évaluation au milieu ; le formateur m'a conseillé une évaluation formative à chaque séquence et une sommative à la fin. J'ai aussi ajouté un scénario d'accompagnement avec un référent et l'assistance pour le distanciel.",
    "J'ai transposé l'exercice à ma spécialité : progression multimodale de 7 h, avec une part d'asynchrone et une mise en situation professionnelle. Pour Logistique Morvaine, la répartition est équilibrée entre présentiel, distanciel et situation de travail.",
    "J'ai justifié chaque méthode : démonstrative pour les gestes, active pour les mises en situation, interrogative pour faire émerger les représentations, expositive courte pour les règles. Ma progression va du simple au complexe.",
    "J'ai eu du mal à estimer les durées ; j'ai recalculé pour atteindre exactement 14 h. Le scénario de la séquence logiciel comporte une accroche, une démonstration, un entraînement en binôme et un quiz.",
    "Ma copie présente un tableau de progression et un scénario détaillé. J'ai prévu un plan de repli en cas de problème de connexion pendant la classe virtuelle.",
  ],
  // 3 — Animation
  [
    "Pour ouvrir la séance, j'ai présenté l'objectif, le déroulé et les règles de la classe virtuelle, puis recueilli les attentes de Karim, Sonia, Paul et Mélissa. Ma consigne précise la tâche, la durée, les ressources et le résultat attendu ; je la fais reformuler.",
    "Pour Sonia, qui termine toujours la première, j'ai prévu une tâche d'approfondissement et un rôle de pair-aidante. Je distribue la parole nominativement pour que Karim participe. J'avais d'abord proposé de lui demander de se taire, le formateur m'a montré une approche plus valorisante.",
    "J'ai prévu des interactions environ toutes les dix minutes : sondage, tableau blanc, sous-groupes. Pour Paul, consignes écrites dans la conversation, sous-titrage et vérification de la compréhension. Pour Karim, consignes orales et fiche illustrée.",
    "Je ne savais pas comment clôturer une séance. Correction : synthèse faite par les apprenants, évaluation formative rapide, recueil du ressenti et annonce de la suite. J'ai réécrit ma clôture en ce sens.",
    "J'ai rattaché l'exercice à mon expérience : j'ai souvent expliqué sur le terrain, mais jamais avec une consigne aussi complète. Pour la classe virtuelle, j'ai prévu un test technique et des pauses régulières.",
    "Ma fiche de séance alterne apports courts et activités. J'ai utilisé l'expérience de Karim comme exemple pour le valoriser devant le groupe, ce qui facilite sa participation.",
    "J'ai animé la séquence en jeu de rôle avec le formateur : mes consignes étaient trop longues au début ; je les ai raccourcies et affichées à l'écran. La gestion du temps s'est améliorée avec un minutage par phase.",
    "Pour Mélissa, qui peut être interrompue par la garde de ses enfants, j'ai prévu les supports à l'avance et un enregistrement des schémas. Le groupe reste engagé grâce aux sous-groupes et aux sondages.",
  ],
  // 4 — Évaluation et remédiation
  [
    "J'ai distingué les trois évaluations : diagnostique avec le positionnement, formative avec les quiz et l'observation, sommative avec la préparation complète observée. Ma grille critériée comporte cinq critères, des indicateurs observables et un seuil de réussite.",
    "Pour Karim, mon feedback commence par ce qu'il a réussi, décrit l'étape de validation qui pose problème et propose une démonstration pas à pas. J'ai d'abord cherché la cause en lui faisant verbaliser sa démarche : c'était la lecture d'un libellé.",
    "J'ai présenté le modèle de Kirkpatrick : réaction, apprentissage, comportement au poste, résultats pour l'entrepôt. Le niveau 3 est observé par le tuteur quelques semaines après ; le niveau 4 par la baisse des erreurs de préparation.",
    "Ma première grille notait seulement juste ou faux. Correction : des critères précis, des indicateurs observables et des niveaux d'acquisition. J'ai fixé le seuil de réussite avant l'évaluation.",
    "J'ai transposé la grille critériée à une épreuve de ma spécialité. Pour la remédiation de Karim, j'ai proposé une fiche mémo illustrée, un exercice ciblé, un tutorat par Sonia et une nouvelle évaluation.",
    "J'ai bien compris que le feedback doit être factuel et rapide. Je me suis trompé{e} sur Kirkpatrick en plaçant le transfert au niveau 2 ; c'est le niveau 3.",
    "Ma copie relie chaque critère de la grille à un objectif opérationnel. Pour l'évaluation formative, j'ai prévu un quiz de cinq questions à la fin de chaque séquence.",
    "J'ai expliqué que la remédiation n'est pas la même explication répétée plus fort : elle part de l'origine de la difficulté. Pour Karim, une démonstration et un binôme ont suffi.",
  ],
  // 5 — Accueil, parcours, handicap
  [
    "J'ai décrit l'accueil : information préalable, règlement intérieur et livret d'accueil, présentation du formateur et du référent handicap, prise en main des outils, recueil des attentes. Pour Mélissa, l'entretien de positionnement a permis d'adapter les horaires et la part d'asynchrone.",
    "Pour Paul, j'ai prévu un entretien avec le référent handicap sur ses besoins de compensation, avec un lien possible avec l'Agefiph. J'ai précisé que l'information reste confidentielle. J'avais d'abord proposé d'en parler au groupe, ce qui n'est pas possible sans son accord.",
    "Mon contrat pédagogique comprend les objectifs, le parcours, le calendrier, les modalités, les engagements réciproques, l'évaluation et les aménagements. Je l'ai co-construit avec Mélissa au lieu de le lui imposer.",
    "Je ne connaissais pas le rôle du référent handicap. Correction : il accueille, recueille les besoins, mobilise les partenaires et suit les aménagements. Pour Paul : casque, sous-titrage, supports écrits.",
    "J'ai rattaché l'exercice à ma pratique : dans mon métier, j'ai accueilli des nouveaux sans entretien de positionnement ; je vois maintenant comment individualiser le parcours.",
    "Pour Mélissa, j'ai proposé des ressources asynchrones, le rattrapage des séances et des points de suivi réguliers. Pour Paul, un placement face au formateur en présentiel et la vérification de la compréhension.",
    "Ma copie présente les étapes de l'accueil dans un tableau. J'ai ajouté l'orientation possible vers Cap emploi ou le médecin du travail selon la situation de Paul.",
    "J'ai bien distingué l'entretien de positionnement, qui recueille le projet et les acquis, et le contrat pédagogique, qui formalise l'accord. Les aménagements sont validés avec chaque apprenant.",
  ],
  // 6 — Tutorat à distance
  [
    "J'ai rappelé les obligations de la formation à distance (article D6313-3-1) : assistance technique et pédagogique, information sur les activités et leur durée, évaluations. Mon plan de tutorat précise les fonctions, les moments, les canaux et les délais de réponse.",
    "Pour Mélissa, j'ai rédigé un message de relance personnalisé et bienveillant, avec une proposition de rendez-vous ; sans réponse, je l'appelle. Pour Karim, j'ai proposé de reprendre le quiz avec un tutoriel. J'avais d'abord écrit une relance collective, trop impersonnelle.",
    "Mes indicateurs de suivi : connexions, temps passé, activités réalisées, résultats des quiz, messages sans réponse. J'ai fixé un seuil d'alerte de trois jours sans connexion.",
    "Je ne connaissais pas les fonctions du tuteur à distance. Correction : accueil, pédagogique, méthodologique, technique, motivationnelle. J'ai repris mon plan de tutorat avec ces cinq fonctions.",
    "J'ai rattaché l'exercice à ma propre expérience : j'ai abandonné une formation en ligne faute de suivi. Mon plan prévoit des points d'étape et une relance dès les premiers signes d'inactivité.",
    "Pour le développement professionnel, j'ai prévu un bilan des acquis, un portfolio de compétences et un plan d'action avec le tuteur de Logistique Morvaine.",
    "Ma copie insiste sur les preuves de réalisation à distance : relevés de connexion et travaux rendus, conservés pour la démarche qualité.",
    "J'ai prévu des canaux variés : messagerie de la plateforme, forum, téléphone et visio, avec des délais de réponse annoncés dès l'accueil.",
  ],
  // 7 — Réglementation, qualité, RGPD, accessibilité, violences
  [
    "J'ai cité le décret n° 2026-728 du 1er août 2026 : référentiel de 7 critères et 33 indicateurs depuis le 1er novembre 2026, indicateur 32 complété par une analyse des risques, indicateur 33 pour les CFA. Les documents à remettre : programme, règlement intérieur, convention ou contrat, attestation et certificat de réalisation.",
    "Pour le RGPD, j'ai appliqué la finalité, la minimisation, l'information des personnes et une durée de conservation limitée. L'information sur le handicap de Paul reste confidentielle. J'avais oublié la sécurité des accès, je l'ai ajoutée.",
    "Pour l'accessibilité, je me réfère au RGAA : contrastes, police lisible, textes alternatifs, sous-titres et transcription, documents structurés. J'ai vérifié un de mes supports avec une liste de contrôle.",
    "Pour la situation de Sonia, je fais cesser immédiatement les propos, je rappelle le règlement intérieur, j'échange avec elle en privé, je consigne les faits et j'applique la procédure de signalement de l'organisme. Le guide de lecture de novembre 2026 vise les indicateurs 12, 14 et 15.",
    "J'ai rattaché l'exercice à ma spécialité : je dois aussi respecter la réglementation de sécurité de mon métier quand je montre un geste. Pour Qualiopi, j'ai listé les preuves que je peux fournir comme formateur.",
    "Je ne connaissais pas le contenu du règlement intérieur ; il est prévu par l'article L6352-3 et fixe les règles d'hygiène, de sécurité et de discipline. La convention ou le contrat relève des articles L6353-1 et suivants.",
    "Ma copie est complète ; j'ai confondu RGPD et RGAA au début. Le RGPD protège les données personnelles, le RGAA encadre l'accessibilité numérique.",
    "J'ai présenté la prévention des violences et du harcèlement comme une obligation de l'organisme et du formateur : règles claires dès l'accueil, réaction immédiate, signalement et suivi.",
  ],
  // 8 — Veille et analyse de pratique
  [
    "J'ai analysé la séance du jeudi selon le cycle de Kolb : description des faits, observation réfléchie, explication des causes, puis expérimentation de nouvelles pratiques. Actions retenues : test technique, solution de repli par téléphone, sollicitation nominative de Karim et minutage par phase.",
    "Mon dispositif de veille couvre la réglementation, la pédagogie, ma spécialité et les outils, avec des sources fiables : Légifrance, le site du ministère du Travail, France Compétences, Centre Inffo. Chaque information est tracée dans une fiche datée avec l'action décidée.",
    "J'ai d'abord écrit que la séance avait échoué à cause du groupe ; le formateur m'a montré qu'une analyse de pratique part des faits et de ses propres choix. J'ai repris mon analyse avec le cycle de Kolb.",
    "Pour la responsabilité sociale, j'ai cité l'accessibilité, l'inclusion, la non-discrimination et la sobriété numérique des supports. J'ai ajouté une action : alléger les vidéos pour les connexions faibles.",
    "J'ai rattaché l'exercice à une séance réelle que j'ai animée dans mon métier : j'en ai fait l'analyse avec le cycle de Kolb, ce qui m'entraîne pour l'épreuve du CCP 4.",
    "Ma fiche de veille mensuelle comporte la source, la date, la synthèse et l'action. Je la partage avec l'équipe pédagogique d'Horizon Compétences.",
    "J'ai distingué les faits des interprétations dans ma description, ce qui m'a demandé plusieurs essais. Les actions d'amélioration sont testées à la séance suivante.",
    "J'ai présenté la veille comme une preuve pour la démarche qualité : tableau daté, mise à jour des supports et des procédures.",
  ],
  // 9 — Supports multimodaux et épreuves du titre
  [
    "Pour la capsule sur la circulation dans l'entrepôt, j'ai rédigé un script et un storyboard, une idée par écran, sous-titres et transcription. J'ai choisi Genially pour le quiz associé et Canva pour l'affiche de rappel.",
    "J'ai présenté les épreuves : 35 min pour le CCP 1, 30 min pour le CCP 2, 45 min pour le CCP 3 avec l'entretien technique, 1 h 20 pour le CCP 4 avec l'analyse de pratique tirée au sort. J'avais oublié le volume des dossiers techniques, je l'ai ajouté.",
    "Je ne savais pas ce qu'était le dossier professionnel ; c'est le document où je décris des exemples réels de ma pratique pour chaque activité, remis au jury. J'ai commencé le mien avec la séance que j'ai animée.",
    "Pour les droits, j'utilise des images libres de droits, je cite les sources et je demande l'accord des personnes filmées. Mes supports PowerPoint respectent les contrastes et une police lisible.",
    "J'ai rattaché l'exercice à ma spécialité : j'ai créé une capsule de trois minutes sur un geste de mon métier et je l'ai testée auprès d'un proche. Le retour m'a fait raccourcir l'introduction.",
    "J'ai précisé que le jury est composé de professionnels habilités par la DREETS et que le passage des épreuves est obligatoire pour obtenir le titre. Je prépare l'oral avec un plan clair et un chronomètre.",
    "Ma copie compare PowerPoint, Canva et Genially selon l'usage. Pour le CCP 4, j'ai rappelé le tirage au sort d'un sujet parmi 6, 45 min de préparation et 10 min d'oral.",
    "J'ai conçu un planning de préparation du dossier professionnel et des quatre dossiers techniques, avec un oral blanc avant la session de validation.",
  ],
];

const BILANS_PERSONNELS = [
  "Cette mise en situation m'a surtout appris à formuler les choses du point de vue de l'apprenant.",
  "Le plus difficile a été de tenir le temps de l'exercice ; je relirai la fiche repère avant la prochaine séance.",
  "J'ai repris ma copie après la correction en classe virtuelle et j'ai ajouté ce qui manquait.",
  "Je vais réutiliser cette méthode dans ma spécialité et dans mon dossier professionnel.",
  "J'ai vérifié mes réponses dans le support de cours, ce qui m'a fait corriger un oubli.",
  "Le retour du formateur m'a permis de repérer une confusion que je faisais sans m'en rendre compte.",
  "J'avais des doutes sur ce sujet en arrivant, je me sens maintenant capable de l'expliquer.",
  "Je me suis appuyé{e} sur le modèle de document fourni, que je garderai.",
  "Je n'ai pas eu le temps de tout détailler, mais l'essentiel est là.",
  "J'ai posé une question au formateur pendant la séance, ce qui m'a évité une erreur.",
  "J'ai noté les notions nouvelles dans mon carnet de bord de futur{e} format{/rice}.",
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
  if (/environnement|titre FPA|m[ée]tier de formateur/i.test(t)) return 0;
  if (/analyse[rz]? (de )?la demande|objectifs?/i.test(t)) return 1;
  if (/progression|sc[ée]nario/i.test(t)) return 2;
  if (/animer|animation|classe virtuelle/i.test(t)) return 3;
  if (/[ée]valu|rem[ée]di/i.test(t)) return 4;
  if (/accueil|parcours|handicap/i.test(t)) return 5;
  if (/tutor|distance/i.test(t)) return 6;
  if (/r[ée]glementation|qualit[ée]|RGPD|accessibilit/i.test(t)) return 7;
  if (/veille|analyse de pratique|Kolb/i.test(t)) return 8;
  if (/supports?|capsule|[ée]preuves|dossier professionnel/i.test(t)) return 9;
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickFPA45ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isFPA45Formation(intitule, code)) return null;
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
    ? `J'ai rapproché la mise en situation des formations que je pourrais animer chez ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

// Prérequis : niveau 4 et 3 ans d'expérience dans la spécialité, ou niveau 3 et 3 à 5 ans d'expérience.
const BESOINS_DIPLOMES = [
  "Baccalauréat professionnel Logistique, puis quinze ans d'expérience en entrepôt",
  "CAP Cuisine, puis douze ans d'expérience en restauration",
  "BTS Management commercial opérationnel, puis huit ans d'expérience dans la vente",
  "Baccalauréat STMG, puis dix ans d'expérience en comptabilité",
  "DUT Gestion des entreprises et des administrations, puis six ans d'expérience en ressources humaines",
  "Diplôme d'État d'aide-soignant, puis neuf ans d'expérience en établissement",
  "CAP Esthétique, cosmétique, parfumerie, puis sept ans d'expérience en institut",
  "Titre professionnel de conducteur du transport routier de marchandises, puis douze ans d'expérience",
  "Baccalauréat professionnel Technicien du bâtiment, puis onze ans d'expérience sur chantier",
  "Licence professionnelle Métiers de l'informatique, puis cinq ans d'expérience en bureautique et support",
  "CAP Agent de sécurité, puis cinq ans d'expérience en surveillance",
  "Baccalauréat général, puis quatre ans d'expérience comme format{/rice} occasionnel{le} en entreprise",
  "BTS Support à l'action managériale, puis six ans d'expérience en assistanat de direction",
  "Brevet professionnel Coiffure, puis dix ans d'expérience en salon",
  "Licence de sciences de l'éducation, puis trois ans d'expérience en animation d'ateliers",
  "Baccalauréat professionnel Commerce, puis neuf ans d'expérience en grande distribution",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant chaque séance.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières pendant les classes virtuelles me conviennent.",
  "Non. Je porte des lunettes et j'apprécie des supports en police suffisamment grande à l'écran.",
  "Non, pas de handicap. J'utilise un casque pour bien entendre pendant les classes virtuelles.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je préfère que les modèles de documents soient envoyés dans un format modifiable.",
  "Non, aucune situation de handicap. Je signalerai au formateur toute difficulté de connexion.",
  "Non. Je préfère avoir les fiches repères en format numérique pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté avant la formation.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible pour suivre les <strong>45 heures</strong> de classe virtuelle aux horaires fixés, depuis mon domicile, avec une connexion stable.",
  "Je bloque les créneaux des classes virtuelles dans mon agenda pour suivre l'intégralité des <strong>45 heures</strong> ; je me connecte depuis un bureau au calme.",
  "Je peux suivre toutes les séances en classe virtuelle (Google Meet / Zoom) sur la période de la formation, soit <strong>45 heures</strong>.",
  "Je suis disponible sur toute la période de la formation pour les <strong>45 heures</strong> de classe virtuelle, sans contrainte particulière.",
  "J'ai organisé mon emploi du temps pour suivre l'ensemble des <strong>45 heures</strong> de classe virtuelle dans de bonnes conditions.",
  "Disponibilité complète pour les <strong>45 heures</strong> de formation à distance. J'ai testé ma connexion et mon micro avant la première séance.",
  "Je suivrai les <strong>45 heures</strong> de classe virtuelle depuis mon domicile et je prévois du temps entre les séances pour avancer mon dossier professionnel.",
  "Je suis disponible pour toutes les séances à distance pendant les <strong>45 heures</strong> de formation ; j'ai prévu une solution de garde les jours de classe virtuelle.",
  "Les créneaux de classe virtuelle me conviennent : je suivrai l'intégralité des <strong>45 heures</strong> et je travaillerai les mises en situation entre les séances.",
  "Aucune contrainte sur les horaires des classes virtuelles ; je suivrai les <strong>45 heures</strong> depuis un ordinateur équipé d'une webcam et d'un micro.",
];

/** Réponses d'évaluation des besoins propres à la formation, différentes pour chaque stagiaire. */
export function getFPA45EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = fpa45Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilFPA45(idx, s.nom, s.prenom);
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
      ? "Formation financée par mon compte personnel de formation, via Mon Compte Formation, avec l'accord de mon employeur si elle se déroule sur le temps de travail ; l'entrée en formation intervient au plus tôt 11 jours ouvrés après la validation de la demande."
      : "Formation financée par mon compte personnel de formation, via Mon Compte Formation : l'entrée en formation intervient au plus tôt 11 jours ouvrés après la validation de ma demande.",
    projetPro: entAccords(profil.projet, fem),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
