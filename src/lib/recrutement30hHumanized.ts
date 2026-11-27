// ---------------------------------------------------------------------------
// « Recruter et intégrer ses collaborateurs (CP-FFP) » — moteur de réponses HUMANISÉES
// Formation certifiante (Répertoire spécifique RS6168, certificateur INEA CONSEIL) : 30 h, 6 modules de 5 h,
// 100 % à distance en classes virtuelles.
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes…), puis parcours /
//     diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes, dans l'ordre des 10 QCM d'entraînement, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • notes des QCM d'entraînement (le générateur coche les réponses propres au stagiaire ; aucun corrigé
//     n'est recopié comme réponse du stagiaire)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Sophie et « Atelier Lumen », cités dans les copies, sont FICTIFS (fil rouge du support de cours).
// ---------------------------------------------------------------------------

const normalize = (s?: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation « Recruter et intégrer ses collaborateurs (CP-FFP) », code RS6168.
 * Vrai si : le code RS6168 est saisi, ou l'intitulé contient « RS6168 », ou l'intitulé contient à la fois
 * « recruter et intégrer ses collaborateurs » et « CP-FFP ». Accents, casse et tirets indifférents.
 * Jamais pour : un autre code de répertoire saisi (dont RS7332, la fiche qui remplace RS6168), un intitulé
 * « Recruter et intégrer ses collaborateurs » sans « CP-FFP », le titre d'assistant ressources humaines ou
 * toute autre formation RH, de management ou de recrutement.
 * À tester AVANT les règles génériques « recrutement », « RH », « management ».
 */
export function isREC30Formation(intitule?: string, code?: string): boolean {
  const c = (code || "").toUpperCase().replace(/\s/g, "");
  if (c === "RS6168") return true;
  const t = normalize(intitule).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[^a-z0-9']+/g, " ").trim();
  if (!t) return false;
  if (/^R[N]CP\d|^R[S]\d/.test(c)) return false;
  if (/\brs ?6168\b/.test(t)) return true;
  if (/\b(rs ?\d{3,4}|r[n]cp ?\d+)\b/.test(t)) return false;
  return /\brecruter et integrer ses collaborateurs\b/.test(t) && /\bcp ?ffp\b/.test(t);
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function rec30Seed(nom?: string, prenom?: string): number {
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
  typeof idx === "number" && idx >= 0 ? idx : rec30Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 QCM d'entraînement :
// besoin et fiche de poste, critères et grille, offre, canaux, tri et préparation, conduite de l'entretien,
// atouts de l'entreprise, objections et décision, intégration, handicap
// ---------------------------------------------------------------------------
export const REC30_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Comment préparez-vous habituellement un recrutement avant de publier une annonce ?", reponseAttendue: "Analyse du besoin (contexte, finalité du poste, missions, équipe), rédaction d'une fiche de poste précisant les compétences requises et les conditions de travail, validation avec la direction et l'équipe." },
    { question: "Sur quels critères choisissez-vous un candidat plutôt qu'un autre ?", reponseAttendue: "Critères en lien direct et nécessaire avec le poste, distingués entre indispensables et souhaitables, pondérés dans une grille de décision structurée appliquée à tous les candidats, sans critère discriminatoire." },
    { question: "Qu'est-ce qui rend, selon vous, une offre d'emploi attractive ?", reponseAttendue: "Intitulé clair, missions concrètes, équipe et conditions de travail, rémunération ou fourchette, modalités de candidature ; offre en français, sans limite d'âge ni mention discriminatoire, ouverte aux personnes en situation de handicap." },
    { question: "Où diffuseriez-vous une offre pour trouver le bon profil ?", reponseAttendue: "Canaux variés et complémentaires : job boards, réseaux sociaux professionnels, France Travail, cooptation, réseaux locaux et écoles ; outil de suivi des candidatures et information des candidats sur leurs données." },
    { question: "Comment triez-vous les candidatures et préparez-vous un entretien ?", reponseAttendue: "Tri à partir des critères de la grille ; guide d'entretien avec déroulé et questions par critère ; répartition des rôles ; préparation de l'entretien à distance ; information préalable du candidat sur les méthodes utilisées." },
    { question: "Comment conduisez-vous un entretien de recrutement, et quelles questions évitez-vous ?", reponseAttendue: "Accueil chaleureux, déroulé annoncé, questions comportementales et méthode STAR, écoute active et relances, prise de notes factuelle ; aucune question sur un critère protégé (situation de famille, grossesse, origine, santé, âge…), conformément aux articles L1132-1 et L1221-6." },
    { question: "Comment présentez-vous votre entreprise et le poste à un candidat ?", reponseAttendue: "Atouts concrets et vrais de l'entreprise et du poste, marque employeur, lien avec les motivations du candidat, présentation honnête des contraintes, rencontre de l'équipe." },
    { question: "Comment prenez-vous la décision finale et répondez-vous aux candidats ?", reponseAttendue: "Objections écoutées et traitées ; décision collégiale à partir de la grille ; proposition d'embauche écrite ; réponse rapide et courtoise à tous les candidats ; conservation des données des candidats non retenus au maximum 2 ans après le dernier contact, sauf opposition." },
    { question: "Comment se passent l'arrivée et les premières semaines d'un nouveau collaborateur chez vous ?", reponseAttendue: "Pré-boarding, premier jour préparé, formalités (DPAE, contrat, période d'essai, visite d'information et de prévention), rôle du manager et du tuteur, moments dédiés, points d'étape, rapport d'étonnement, bilan de fin de période d'essai." },
    { question: "Comment accueilleriez-vous un collaborateur en situation de handicap ?", reponseAttendue: "Échange sur les besoins avec l'accord de la personne, aménagement raisonnable du poste (article L5213-6), appui du médecin du travail, de l'Agefiph et de Cap emploi, référent handicap, confidentialité, sensibilisation de l'équipe et suivi des aménagements." },
  ],
  fin: [
    { question: "Comment avez-vous analysé le besoin et rédigé la fiche de poste de votre recrutement ?", reponseAttendue: "Contexte et finalité du poste, missions principales, compétences (savoirs, savoir-faire, savoir-être), conditions de travail ; fiche validée avec la direction et l'équipe et utilisée tout au long du recrutement." },
    { question: "Quelle grille de décision avez-vous construite, et avec quels critères ?", reponseAttendue: "Critères en lien direct avec le poste, indispensables et souhaitables, pondérés, avec indicateurs observables et échelle d'appréciation ; même grille pour tous les candidats, complétée juste après chaque entretien." },
    { question: "Comment avez-vous rédigé votre offre d'emploi pour la rendre engageante et non discriminante ?", reponseAttendue: "Intitulé neutre, missions, équipe, conditions et rémunération ; aucune limite d'âge ni mention discriminatoire ; rédigée en français ; mention d'ouverture aux personnes en situation de handicap ; modalités de candidature claires." },
    { question: "Quels canaux et quels outils digitaux avez-vous choisis pour diffuser votre offre ?", reponseAttendue: "Canaux complémentaires justifiés (job boards, réseaux sociaux professionnels, France Travail, cooptation, réseaux locaux) ; outil de suivi des candidatures ; indicateurs par canal ; information des candidats sur le traitement de leurs données." },
    { question: "Comment avez-vous trié les candidatures et préparé vos entretiens ?", reponseAttendue: "Tri selon la grille ; guide d'entretien avec questions par critère ; répartition des rôles ; information préalable du candidat sur les méthodes (L1221-8) ; préparation de l'entretien à distance avec test de l'outil." },
    { question: "Comment conduisez-vous désormais un entretien structuré et inclusif ?", reponseAttendue: "Accueil chaleureux et déroulé annoncé ; questions comportementales et méthode STAR ; écoute active, reformulation et relances ; notes factuelles ; aménagements proposés si besoin ; aucune question liée à un critère protégé." },
    { question: "Quels atouts de votre entreprise et du poste mettez-vous en avant, et comment ?", reponseAttendue: "Atouts concrets, vrais et reliés aux motivations du candidat ; marque employeur et proposition de valeur ; contraintes présentées honnêtement ; rencontre de l'équipe ou visite des lieux." },
    { question: "Comment traitez-vous les objections et répondez-vous aux candidats retenus et non retenus ?", reponseAttendue: "Écoute, reformulation et réponse transparente aux objections ; décision collégiale fondée sur la grille ; proposition écrite ; réponse rapide et courtoise à chaque candidat ; durée de conservation des données respectée." },
    { question: "Quel parcours d'intégration avez-vous construit pour votre nouveau collaborateur ?", reponseAttendue: "Pré-boarding, premier jour préparé, formalités d'embauche, tuteur désigné, objectifs progressifs, moments dédiés avec l'équipe, points d'étape réguliers, rapport d'étonnement et bilan de fin de période d'essai." },
    { question: "Quel plan d'accueil prévoyez-vous pour un collaborateur en situation de handicap ?", reponseAttendue: "Échange sur les besoins avec son accord, aménagement raisonnable, préconisations du médecin du travail, aides de l'Agefiph, appui de Cap emploi, référent handicap s'il existe, confidentialité, sensibilisation de l'équipe et points de suivi." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle.
// Aucune réponse à 1 au début : au plus 5 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — besoin et fiche de poste
  [
    ["Je reprends l'ancienne annonce et je la republie.", 0],
    ["Je note rapidement les tâches du poste avant de chercher.", 0.5],
    ["Je n'ai jamais fait de fiche de poste.", 0],
    ["J'en parle avec mon responsable pour savoir ce qu'il attend.", 0.5],
    ["Je recrute quelqu'un que je connais, c'est plus simple.", 0],
    ["Je liste les missions principales et le type de contrat.", 0.5],
    ["Je cherche d'abord un profil qui me ressemble.", 0],
    ["J'essaie de comprendre pourquoi le poste est vacant et ce qui manque à l'équipe.", 0.5],
    ["Je publie l'annonce tout de suite, on verra en entretien.", 0],
    ["Je regarde les annonces des concurrents pour m'inspirer du contenu du poste.", 0.5],
    ["Je ne prépare rien de particulier.", 0],
    ["J'écris les horaires, le lieu et les compétences dont j'ai besoin.", 0.5],
  ],
  // Q2 — critères et grille
  [
    ["Je choisis au feeling, je sens vite si ça va marcher.", 0],
    ["Je regarde surtout l'expérience sur un poste similaire.", 0.5],
    ["Je préfère les candidats jeunes, ils s'adaptent mieux.", 0],
    ["Je compare les candidats sur deux ou trois points importants.", 0.5],
    ["Je prends celui qui présente le mieux.", 0],
    ["Je note ce que j'ai pensé de chaque candidat après l'entretien.", 0.5],
    ["Je choisis le dernier que j'ai vu, je m'en souviens mieux.", 0],
    ["J'ai entendu parler de grilles d'évaluation, sans en avoir utilisé.", 0.5],
    ["Je préfère quelqu'un qui habite à côté, sans autre critère.", 0],
    ["Je vérifie que le candidat a les compétences techniques demandées.", 0.5],
    ["Je n'ai pas de critères précis.", 0],
    ["Je regarde la motivation et la capacité à travailler en équipe.", 0.5],
  ],
  // Q3 — offre
  [
    ["Une annonce courte avec le nom du poste suffit.", 0],
    ["Il faut indiquer le salaire, ça attire plus de candidats.", 0.5],
    ["Je précise que je cherche une personne jeune et dynamique.", 0],
    ["Décrire les missions et l'ambiance de l'équipe.", 0.5],
    ["Je demande une photo pour voir à qui j'ai affaire.", 0],
    ["Un titre clair et les horaires du poste.", 0.5],
    ["Je ne sais pas ce qui rend une annonce attractive.", 0],
    ["Je mettrais en avant les avantages de l'entreprise.", 0.5],
    ["Je copie une annonce trouvée sur Internet.", 0],
    ["Je pense qu'il faut éviter certains mots, mais je ne sais pas lesquels.", 0.5],
    ["J'écris en anglais, ça fait plus moderne.", 0],
    ["Je précise comment postuler et à qui envoyer sa candidature.", 0.5],
  ],
  // Q4 — canaux
  [
    ["Seulement sur ma page personnelle d'un réseau social.", 0],
    ["Sur un site d'offres d'emploi connu.", 0.5],
    ["Je n'en diffuse pas, j'attends les candidatures spontanées.", 0],
    ["Je demande à mes salariés s'ils connaissent quelqu'un.", 0.5],
    ["Je ne connais pas les sites d'emploi.", 0],
    ["Je dépose l'offre chez France Travail.", 0.5],
    ["Sur une affiche dans la vitrine, rien d'autre.", 0],
    ["Sur un réseau social professionnel, je crois que ça marche bien.", 0.5],
    ["Partout en même temps, sans suivre les réponses.", 0],
    ["J'utilise plusieurs sites, mais je m'y perds dans les réponses.", 0.5],
    ["Je n'ai jamais diffusé d'offre.", 0],
    ["Auprès des écoles de la région pour les jeunes diplômés.", 0.5],
  ],
  // Q5 — tri et préparation
  [
    ["Je lis les CV en diagonale et je garde ceux qui me plaisent.", 0],
    ["J'écarte les CV qui n'ont pas l'expérience demandée.", 0.5],
    ["Je ne prépare pas l'entretien, j'improvise.", 0],
    ["Je prépare quelques questions avant l'entretien.", 0.5],
    ["Je trie selon la photo et l'adresse.", 0],
    ["J'appelle d'abord les candidats pour un premier échange.", 0.5],
    ["Je fais confiance à la première impression.", 0],
    ["Je relis le CV juste avant de recevoir la personne.", 0.5],
    ["Je garde seulement les candidats qui ont fait les mêmes études que moi.", 0],
    ["Je compare les candidatures avec ce que je cherche.", 0.5],
    ["Je ne sais pas comment trier.", 0],
    ["Je demande à un collègue d'assister à l'entretien.", 0.5],
  ],
  // Q6 — conduite de l'entretien
  [
    ["Je demande si la personne a des enfants, pour les horaires.", 0],
    ["Je pose des questions sur le parcours du candidat.", 0.5],
    ["Je mets la pression pour voir comment il réagit.", 0],
    ["Je laisse le candidat se présenter puis je pose mes questions.", 0.5],
    ["Je demande l'âge et la situation de famille, c'est normal.", 0],
    ["J'essaie de mettre le candidat à l'aise au début.", 0.5],
    ["Je parle surtout de l'entreprise, le candidat écoute.", 0],
    ["Je demande des exemples de situations qu'il a vécues.", 0.5],
    ["Je ne sais pas quelles questions sont interdites.", 0],
    ["Je sais qu'on ne doit pas poser de questions sur la religion.", 0.5],
    ["Je demande d'où viennent ses parents pour mieux le connaître.", 0],
    ["Je prends quelques notes pendant l'entretien.", 0.5],
  ],
  // Q7 — atouts de l'entreprise
  [
    ["Je ne présente pas l'entreprise, le candidat doit la connaître.", 0],
    ["Je parle de l'ambiance et de l'équipe.", 0.5],
    ["Je promets une évolution rapide, même si ce n'est pas sûr.", 0],
    ["J'explique ce que fait l'entreprise et ses clients.", 0.5],
    ["Je ne parle jamais des contraintes du poste.", 0],
    ["Je fais visiter les locaux quand c'est possible.", 0.5],
    ["Je ne sais pas ce qu'est la marque employeur.", 0],
    ["Je mets en avant la stabilité de l'entreprise.", 0.5],
    ["Je dis que c'est le meilleur poste de la région.", 0],
    ["Je parle des avantages, comme les tickets restaurant.", 0.5],
    ["Le salaire suffit à convaincre.", 0],
    ["Je présente les projets intéressants du poste.", 0.5],
  ],
  // Q8 — objections, décision et réponse
  [
    ["Je ne réponds pas aux candidats non retenus.", 0],
    ["J'envoie un courriel de refus aux candidats que j'ai rencontrés.", 0.5],
    ["Je garde tous les CV indéfiniment, au cas où.", 0],
    ["Je prends la décision avec mon responsable.", 0.5],
    ["Si le candidat hésite, je passe à un autre sans discuter.", 0],
    ["J'essaie de comprendre pourquoi le candidat hésite.", 0.5],
    ["Je décide seul, sans relire mes notes.", 0],
    ["Je compare mes notes sur chaque candidat avant de choisir.", 0.5],
    ["Je préviens les candidats non retenus seulement s'ils appellent.", 0],
    ["Je fais une proposition écrite au candidat retenu.", 0.5],
    ["Je ne sais pas comment conserver les candidatures.", 0],
    ["Je réponds à tout le monde, même brièvement.", 0.5],
  ],
  // Q9 — intégration
  [
    ["Le nouveau se débrouille, il apprend sur le tas.", 0],
    ["Je présente l'équipe le premier jour.", 0.5],
    ["Rien de prévu, on verra le jour même.", 0],
    ["Un collègue lui montre le travail la première semaine.", 0.5],
    ["Je ne connais pas les formalités d'embauche.", 0],
    ["Je prépare son poste et ses accès avant son arrivée.", 0.5],
    ["Je fais le point seulement à la fin de la période d'essai.", 0],
    ["Je fais un point avec lui à la fin de la première semaine.", 0.5],
    ["Je lui donne le règlement intérieur à lire, c'est tout.", 0],
    ["Je sais qu'il faut faire une déclaration avant l'embauche.", 0.5],
    ["Je n'ai pas le temps de m'en occuper.", 0],
    ["J'organise un café d'accueil avec l'équipe.", 0.5],
  ],
  // Q10 — handicap
  [
    ["Je n'ai jamais eu le cas, je ne saurais pas faire.", 0],
    ["Je lui demanderais ce dont il a besoin.", 0.5],
    ["Je pense que ce serait trop compliqué pour une petite entreprise.", 0],
    ["J'ai entendu parler de l'Agefiph, sans savoir ce qu'elle fait.", 0.5],
    ["Je préviendrais toute l'équipe de son handicap.", 0],
    ["Il faudrait sans doute adapter le poste.", 0.5],
    ["Je ne sais pas ce qu'est la RQTH.", 0],
    ["Je contacterais le médecin du travail, je crois qu'il peut aider.", 0.5],
    ["Je lui confierais seulement des tâches simples.", 0],
    ["Je sais qu'il existe des aides pour les employeurs.", 0.5],
    ["Ce n'est pas un sujet chez nous.", 0],
    ["Je veillerais à ce qu'il soit bien accueilli par l'équipe.", 0.5],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["J'ai d'abord analysé le besoin avec la direction : pourquoi recruter, pour quelles missions et dans quelle équipe.", 1],
    ["Ma fiche de poste précise la finalité, les missions, les compétences et les conditions de travail.", 1],
    ["J'ai distingué les savoirs, les savoir-faire et les savoir-être attendus.", 1],
    ["J'ai fait relire la fiche de poste par deux collègues de l'équipe.", 0.5],
    ["Pour un remplacement, j'ai revu le contenu du poste au lieu de copier l'ancienne annonce.", 1],
    ["Je me suis aidé{e} d'une fiche métier de France Travail pour préciser les compétences.", 0.5],
    ["J'ai précisé le lieu, les horaires et le type de contrat dans la fiche de poste.", 1],
    ["Ma fiche de poste me sert aussi pour l'intégration et le premier bilan.", 1],
    ["J'ai listé les missions par ordre d'importance.", 0.5],
    ["J'ai interrogé l'équipe sur ses attentes concrètes avant de rédiger.", 1],
    ["Le besoin est lié à la hausse de l'activité : je l'ai écrit noir sur blanc.", 0.5],
    ["J'ai décrit les relations du poste avec les autres services.", 0.5],
  ],
  [
    ["Ma grille compte six critères liés au poste, pondérés selon leur importance.", 1],
    ["J'ai séparé les critères indispensables et souhaitables.", 1],
    ["Chaque critère a des indicateurs observables et une échelle en quatre niveaux.", 1],
    ["J'applique la même grille à tous les candidats, sans exception.", 1],
    ["Je complète la grille juste après chaque entretien, avec des faits.", 1],
    ["J'ai retiré un critère d'âge que j'utilisais sans m'en rendre compte.", 0.5],
    ["La grille m'aide à expliquer ma décision aux candidats et à l'équipe.", 0.5],
    ["J'ai construit la grille avant de lire les candidatures.", 1],
    ["Je me méfie de l'effet de première impression grâce à la grille.", 0.5],
    ["Chaque critère est en lien direct avec l'emploi proposé.", 1],
    ["J'ai limité la grille aux critères essentiels pour garder une comparaison claire.", 0.5],
    ["Nous sommes deux à remplir la grille, puis nous confrontons nos notes.", 0.5],
  ],
  [
    ["Mon offre commence par un intitulé neutre, avec la mention H/F.", 1],
    ["J'ai décrit les missions concrètes, l'équipe et les conditions de travail.", 1],
    ["J'indique une fourchette de rémunération, c'est plus transparent.", 1],
    ["Aucune limite d'âge ni mention discriminatoire dans mon annonce.", 1],
    ["J'ai ajouté que le poste est ouvert aux personnes en situation de handicap.", 1],
    ["Mon offre est rédigée en français, sans jargon interne.", 0.5],
    ["J'ai supprimé la photo obligatoire que je demandais avant.", 0.5],
    ["Les qualités demandées reprennent les critères de ma fiche de poste.", 1],
    ["Les modalités de candidature sont claires : à qui et comment postuler.", 0.5],
    ["J'ai fait relire l'offre par une personne qui connaît bien le poste.", 0.5],
    ["J'ai mis en avant ce qui rend le poste intéressant dès les premières lignes.", 1],
    ["Mon annonce est structurée en paragraphes courts, lisibles par tous.", 0.5],
  ],
  [
    ["J'ai diffusé mon offre sur un job board, un réseau social professionnel et chez France Travail.", 1],
    ["J'ai lancé la cooptation auprès de l'équipe, en gardant la même grille pour tous.", 1],
    ["Je suis les candidatures dans un tableau partagé, avec leur statut.", 1],
    ["Je mesure le nombre de candidatures pertinentes par canal.", 1],
    ["J'ai adapté le texte de l'offre au format de chaque canal.", 0.5],
    ["Mon offre indique comment les données des candidats sont traitées.", 1],
    ["J'ai contacté une école de la région pour élargir les profils.", 0.5],
    ["J'utilise l'espace recruteur de France Travail pour la présélection.", 0.5],
    ["Je publie aussi l'offre sur le site de l'entreprise.", 0.5],
    ["J'ai relancé la diffusion après deux semaines faute de profils adaptés.", 0.5],
    ["Je ne collecte que les données nécessaires à l'examen des candidatures.", 1],
    ["J'ai diversifié les canaux pour ne pas dépendre de la cooptation.", 1],
  ],
  [
    ["Je trie les candidatures avec les critères de la grille, pas sur la photo ou l'adresse.", 1],
    ["J'ai un guide d'entretien avec une ou deux questions par critère.", 1],
    ["Je préviens les candidats des méthodes de recrutement utilisées.", 1],
    ["Avant un entretien à distance, j'envoie le lien et je teste l'outil.", 1],
    ["Un pré-entretien téléphonique me permet de vérifier les points clés.", 0.5],
    ["Nous nous répartissons les rôles : l'un conduit, l'autre prend les notes.", 1],
    ["Je prépare l'accueil du candidat et le déroulé de l'entretien.", 0.5],
    ["Je prévois une solution de secours en cas de problème de connexion.", 0.5],
    ["Je ne demande que des informations en lien avec le poste.", 1],
    ["J'ai la même trame d'entretien pour tous les candidats.", 1],
    ["Je relis la fiche de poste avant chaque série d'entretiens.", 0.5],
    ["Je prévois le temps nécessaire entre deux entretiens pour compléter la grille.", 0.5],
  ],
  [
    ["J'accueille le candidat, je présente les participants et le déroulé.", 1],
    ["Je pose des questions comportementales avec la méthode STAR.", 1],
    ["Je reformule et je relance : « pouvez-vous me donner un exemple précis ? ».", 1],
    ["Je ne pose aucune question sur la famille, la santé, l'origine ou l'âge.", 1],
    ["Je prends des notes factuelles, critère par critère.", 1],
    ["Si un candidat parle de sa vie privée, je reviens aux compétences.", 0.5],
    ["Je laisse du temps au candidat pour poser ses questions.", 0.5],
    ["Je propose un aménagement de l'entretien si un candidat en a besoin.", 1],
    ["J'annonce les prochaines étapes et le délai de réponse.", 0.5],
    ["Je regarde la caméra et je limite les distractions en visioconférence.", 0.5],
    ["J'ai intégré une courte mise en situation d'appel client.", 1],
    ["Je sais qu'un candidat discriminé peut saisir le Défenseur des droits.", 0.5],
  ],
  [
    ["Je présente des atouts concrets : projets sur mesure, équipe, formation.", 1],
    ["Je relie les atouts du poste aux motivations exprimées par le candidat.", 1],
    ["Je présente honnêtement les contraintes du poste pour éviter une déception.", 1],
    ["Je fais rencontrer l'équipe au candidat finaliste.", 0.5],
    ["J'ai formalisé la proposition de valeur de l'entreprise en quelques phrases.", 1],
    ["Un salarié témoigne de son quotidien pendant la visite.", 0.5],
    ["Je soigne l'expérience de tous les candidats, même non retenus.", 1],
    ["Je mets en avant la proximité avec la direction et la variété des missions.", 0.5],
    ["Je ne promets rien que je ne puisse tenir.", 1],
    ["Je présente les perspectives d'évolution réellement possibles.", 0.5],
    ["J'organise une visite des locaux, sur place ou en vidéo.", 0.5],
    ["Notre page carrières reprend les mêmes atouts que mon discours.", 0.5],
  ],
  [
    ["J'écoute l'objection, je la reformule, puis je réponds avec transparence.", 1],
    ["La décision se prend à deux, à partir de la grille complétée.", 1],
    ["J'envoie une proposition écrite avec le poste, la rémunération et la date de début.", 1],
    ["Tous les candidats reçoivent une réponse rapide et courtoise.", 1],
    ["Je conserve les candidatures non retenues au maximum 2 ans après le dernier contact.", 1],
    ["Je préviens le candidat si je souhaite garder son CV pour un autre poste.", 0.5],
    ["Mon retour aux candidats rencontrés reste factuel et lié aux critères.", 0.5],
    ["Si le candidat retenu refuse, je reviens au suivant le mieux évalué.", 1],
    ["Je reste cohérent{e} avec la grille de rémunération de l'entreprise.", 0.5],
    ["J'ai répondu à l'objection du trajet en présentant les horaires réels.", 0.5],
    ["Je n'évoque jamais les autres candidats par leur nom.", 0.5],
    ["Je fixe un délai de décision et je le tiens.", 0.5],
  ],
  [
    ["Pendant le pré-boarding, j'envoie un message de bienvenue et le programme du premier jour.", 1],
    ["La DPAE est faite avant l'arrivée et le contrat précise la période d'essai.", 1],
    ["Le poste, les accès et le planning sont prêts le premier jour.", 1],
    ["Un tuteur accompagne le nouveau collaborateur pendant ses premières semaines.", 1],
    ["J'organise un déjeuner d'accueil avec l'équipe.", 0.5],
    ["Je fais des points réguliers et un bilan à la fin de la période d'essai.", 1],
    ["Je demande un rapport d'étonnement après un mois.", 1],
    ["Les objectifs des premières semaines sont progressifs et partagés.", 0.5],
    ["La visite d'information et de prévention est programmée dans les délais.", 0.5],
    ["Un livret d'accueil présente l'entreprise, les interlocuteurs et la sécurité.", 0.5],
    ["Je reconnais ses progrès et je lui confie vite une mission utile.", 0.5],
    ["Mon parcours d'intégration est écrit et daté.", 1],
  ],
  [
    ["Avant l'arrivée, j'échange avec la personne sur ses besoins, avec son accord.", 1],
    ["J'ai prévu un aménagement raisonnable du poste avec le médecin du travail.", 1],
    ["Je sais que l'Agefiph peut financer des aides à l'aménagement.", 1],
    ["Je respecte la confidentialité : la personne décide de ce qu'elle partage.", 1],
    ["J'ai sensibilisé l'équipe à l'inclusion sans révéler d'information de santé.", 1],
    ["Je fais des points réguliers pour ajuster les aménagements.", 1],
    ["Cap emploi peut m'accompagner pour le recrutement et le maintien dans l'emploi.", 0.5],
    ["Un handicap peut être invisible : je ne présume de rien.", 0.5],
    ["Avec 18 salariés, l'obligation d'emploi ne s'applique pas, mais l'aménagement raisonnable si.", 1],
    ["Je sais qu'un refus d'aménagement raisonnable peut constituer une discrimination.", 0.5],
    ["Je contacte le référent handicap quand l'entreprise en a un.", 0.5],
    ["J'évalue les compétences d'une candidate RQTH comme celles des autres candidats.", 0.5],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [54, 51, 45, 45, 4, 8, 57, 36, 47, 13];

export function getREC30AutoAnswers(
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
export function rec30NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6). */
export function rec30BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((rec30NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `rec30BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function rec30ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = rec30BonnesQcmDebut(n, idx, nom, prenom);
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
 * Notes des QCM d'entraînement et des QCM par compétence (10 questions : 6 à 10 bonnes réponses),
 * différentes d'un stagiaire à l'autre pour un même QCM. Les exercices rédigés éventuels sont notés sur 5.
 */
const NOTES_QCM_SUR_10 = [8, 7, 9, 6, 10];
const NOTES_EXERCICE_SUR_5 = [4, 3, 4.5, 3.5, 5, 2.5];
export function rec30NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — une situation cohérente par stagiaire : besoin principal (analyse des besoins),
// objectif et projet (partie stagiaire), attentes, missions et contribution (partie employeur ou financeur).
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
    besoin: "Structurer ses recrutements, menés jusqu'ici sans fiche de poste ni grille de décision.",
    objectif: "Je veux disposer d'une méthode complète, de la fiche de poste à la décision finale.",
    projet: "Elle me permettra de recruter plus sereinement les deux postes ouverts cette année.",
    attentes: "Il est attendu que {le_sal} conduise ses prochains recrutements avec une fiche de poste et une grille de décision.",
    missions: "Analyse des besoins en personnel, rédaction des fiches de poste, sélection des candidats.",
    contribution: "Elle doit fiabiliser les recrutements et limiter les départs en période d'essai.",
  },
  {
    besoin: "Rédiger des offres d'emploi plus attractives pour un métier en tension.",
    objectif: "Mon objectif est de recevoir davantage de candidatures adaptées grâce à des offres engageantes.",
    projet: "Elle m'aidera à pourvoir les postes restés vacants depuis plusieurs mois.",
    attentes: "Il est attendu que {le_sal} rédige et diffuse des offres conformes et attractives sur plusieurs canaux.",
    missions: "Rédaction et diffusion des offres, suivi des candidatures, relations avec France Travail.",
    contribution: "Elle doit réduire les délais de recrutement.",
  },
  {
    besoin: "Conduire des entretiens de recrutement structurés, sans questions discriminantes.",
    objectif: "Je souhaite maîtriser les questions comportementales et les règles de non-discrimination.",
    projet: "Elle me permettra de mener seul{e} les entretiens de mon service.",
    attentes: "Il est attendu que {le_sal} conduise des entretiens structurés et conformes au Code du travail.",
    missions: "Conduite des entretiens, évaluation des candidats, participation à la décision.",
    contribution: "Elle doit sécuriser l'entreprise face au risque de discrimination à l'embauche.",
  },
  {
    besoin: "Mieux intégrer les nouveaux collaborateurs, dont plusieurs sont partis pendant leur période d'essai.",
    objectif: "Mon objectif est de construire un parcours d'intégration du pré-boarding au bilan de période d'essai.",
    projet: "Elle m'aidera à fidéliser les nouvelles recrues de mon équipe.",
    attentes: "Il est attendu que {le_sal} mette en place un parcours d'intégration écrit, avec un tuteur.",
    missions: "Accueil des nouveaux salariés, organisation du tutorat, suivi de la période d'essai.",
    contribution: "Elle doit réduire le nombre de départs dans les premiers mois.",
  },
  {
    besoin: "Prendre en charge les recrutements après une nomination récente comme manager d'équipe.",
    objectif: "Je veux acquérir les bons réflexes pour recruter et intégrer mes futurs collaborateurs.",
    projet: "Elle me permettra d'assumer pleinement mon nouveau rôle de manager.",
    attentes: "Il est attendu que {le_sal} recrute et intègre en autonomie les collaborateurs de son équipe.",
    missions: "Management d'équipe, recrutement des collaborateurs, intégration et suivi.",
    contribution: "Elle doit permettre de renforcer l'équipe dans les délais prévus.",
  },
  {
    besoin: "Accueillir dans de bonnes conditions des collaborateurs en situation de handicap.",
    objectif: "Mon objectif est de connaître les aménagements possibles et les acteurs à solliciter.",
    projet: "Elle m'aidera à rendre nos recrutements plus inclusifs.",
    attentes: "Il est attendu que {le_sal} prépare l'accueil et le suivi d'un collaborateur en situation de handicap.",
    missions: "Recrutement inclusif, aménagement des postes, relation avec le médecin du travail et l'Agefiph.",
    contribution: "Elle doit améliorer l'inclusion et le maintien dans l'emploi.",
  },
  {
    besoin: "Recruter les premiers salariés de sa jeune entreprise.",
    objectif: "Je souhaite réussir mes premières embauches, des formalités à l'intégration.",
    projet: "Elle me permettra de développer mon activité avec une équipe fiable.",
    attentes: "Il est attendu que {le_sal} réalise ses premiers recrutements dans le respect de la réglementation.",
    missions: "Définition des postes, recrutement, formalités d'embauche, accueil des salariés.",
    contribution: "Elle doit accompagner la croissance de l'entreprise.",
  },
  {
    besoin: "Utiliser les outils digitaux et les réseaux sociaux pour trouver des candidats.",
    objectif: "Mon objectif est de diversifier mes canaux de diffusion et de suivre les candidatures avec méthode.",
    projet: "Elle m'aidera à toucher des profils que je n'atteins pas aujourd'hui.",
    attentes: "Il est attendu que {le_sal} diffuse les offres sur des canaux variés et suive les candidatures dans un outil.",
    missions: "Sourcing de candidats, diffusion des offres, suivi des candidatures.",
    contribution: "Elle doit augmenter le nombre de candidatures pertinentes.",
  },
  {
    besoin: "Convaincre les bons candidats de rejoindre une petite entreprise peu connue.",
    objectif: "Je veux apprendre à présenter les atouts de l'entreprise et à répondre aux objections.",
    projet: "Elle me permettra de ne plus perdre de candidats en fin de processus.",
    attentes: "Il est attendu que {le_sal} valorise la marque employeur lors des entretiens.",
    missions: "Présentation de l'entreprise aux candidats, négociation de la proposition, accueil.",
    contribution: "Elle doit améliorer l'attractivité de l'entreprise.",
  },
  {
    besoin: "Rendre ses décisions de recrutement plus objectives et mieux argumentées.",
    objectif: "Mon objectif est de décider à partir d'une grille et de répondre à chaque candidat.",
    projet: "Elle m'aidera à justifier mes choix auprès de la direction et des candidats.",
    attentes: "Il est attendu que {le_sal} fonde ses décisions sur une grille partagée et réponde à tous les candidats.",
    missions: "Évaluation des candidats, décision collégiale, réponse aux candidats.",
    contribution: "Elle doit renforcer l'équité des recrutements.",
  },
  {
    besoin: "Préparer la certification pour valoriser son expérience de recrutement.",
    objectif: "Je souhaite consolider mes pratiques et me présenter aux trois épreuves de la certification.",
    projet: "Elle me permettra de faire reconnaître mes compétences en recrutement.",
    attentes: "Il est attendu que {le_sal} se présente aux épreuves et applique la méthode dans ses recrutements.",
    missions: "Recrutement et intégration des collaborateurs de l'entreprise.",
    contribution: "Elle doit professionnaliser la fonction recrutement de l'entreprise.",
  },
  {
    besoin: "Organiser le tutorat et les moments d'accueil pour créer une bonne ambiance dans l'équipe.",
    objectif: "Mon objectif est de prévoir des moments dédiés et un suivi régulier des nouveaux arrivants.",
    projet: "Elle m'aidera à souder l'équipe autour des nouvelles recrues.",
    attentes: "Il est attendu que {le_sal} organise l'accueil des nouveaux collaborateurs et le rôle des tuteurs.",
    missions: "Accueil, tutorat, animation de l'équipe, points de suivi.",
    contribution: "Elle doit améliorer l'ambiance de travail et la motivation.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilREC30(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

function entAccords(txt: string, fem: boolean): string {
  return accorder(txt.replace(/\{le_sal\}/g, fem ? "la stagiaire" : "le stagiaire"), fem);
}

export function getREC30Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return entAccords(profilREC30(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "BTS Management commercial opérationnel",
  "Licence professionnelle Gestion des ressources humaines",
  "Baccalauréat professionnel Métiers du commerce et de la vente",
  "Master Management des organisations",
  "BTS Gestion de la PME",
  "Baccalauréat STMG",
  "Aucun diplôme : plusieurs années d'expérience comme chef d'équipe",
  "DUT Gestion des entreprises et des administrations",
  "Licence d'économie et gestion",
  "CAP, puis évolution vers un poste d'encadrement",
  "École de commerce",
  "Diplôme obtenu à l'étranger, puis expérience de management en France",
  "BTS Support à l'action managériale",
  "Baccalauréat général, puis expérience dans la restauration",
  "Licence en psychologie",
  "Baccalauréat professionnel Logistique, puis poste de responsable d'entrepôt",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant chaque module.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières devant l'écran me conviennent.",
  "Non. Je porte des lunettes et j'apprécie des supports en police suffisamment grande.",
  "Non, pas de handicap. J'entends moins bien avec certains casques : j'aimerais pouvoir activer les sous-titres.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je lis plus lentement : j'apprécie de disposer des supports après chaque module.",
  "Non, aucune situation de handicap. Je préfère participer activement aux jeux de rôle.",
  "Non. Je préfère avoir les fiches en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté avant la formation.",
  "Non. Aucune situation de handicap ; je signalerai à la formatrice toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible pour les classes virtuelles des 6 modules de 5 h, sur toute la durée de la formation.",
  "J'ai bloqué dans mon agenda les classes virtuelles des 6 modules de 5 h et je réviserai les QCM entre deux modules.",
  "Je suis disponible pour les 6 modules de 5 h, depuis un endroit calme avec une bonne connexion.",
  "Je peux suivre les classes virtuelles des 6 modules sans contrainte particulière.",
  "Je suis disponible pour les 6 modules de 5 h ; j'ai décalé mes rendez-vous professionnels.",
  "Disponibilité complète pour les classes virtuelles des 6 modules. J'ai fait le test de connexion proposé.",
  "Pour les 6 modules de 5 h, je suis disponible ; j'ai organisé la garde de mes enfants.",
  "Je suis disponible pour les 6 modules et je préviendrai la formatrice en cas d'imprévu.",
  "Je suivrai les classes virtuelles des 6 modules et je prévois de refaire les QCM d'entraînement le soir.",
  "Aucune contrainte pour les 6 modules de 5 h. Mon employeur a validé mon absence.",
];

/** Réponses d'évaluation des besoins propres à la formation « Recruter et intégrer ses collaborateurs », différentes pour chaque stagiaire. */
export function getREC30EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = rec30Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilREC30(idx, s.nom, s.prenom);
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
      : "Financement personnel ou CPF",
    projetPro: entAccords(profil.projet, fem),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
