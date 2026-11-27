// ---------------------------------------------------------------------------
// « Intelligence artificielle en entreprise : déployer les usages de l'IA dans les métiers – 67 h »
// Moteur de réponses HUMANISÉES — action de formation non certifiante, 67 h en 10 jours
// (9 jours de 7 h + 1 jour de 4 h), 100 % à distance en classes virtuelles.
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes…), puis parcours /
//     diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes, dans l'ordre des 10 mises en situation, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • notes des QCM d'entraînement (le générateur coche les réponses propres au stagiaire ; aucun corrigé
//     n'est recopié comme réponse du stagiaire)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Claire et « Arvelia Services », cités dans les copies, sont FICTIFS (fil rouge du support de cours).
// ---------------------------------------------------------------------------

const normalize = (s?: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation « Intelligence artificielle en entreprise : déployer les usages de l'IA dans les
 * métiers – 67 h ». Vrai si l'intitulé contient « intelligence artificielle en entreprise » ou « IA en
 * entreprise », ET « 67 h » (ou « 67h »). Accents, casse, apostrophes et tirets indifférents.
 * Jamais pour : la formation IA de 21 h (« intégrer les outils d'IA dans son activité professionnelle »), la
 * formation « IA générative » du Répertoire spécifique, un intitulé sans durée de 67 h, ni lorsqu'un code de
 * répertoire est saisi (formation non certifiante).
 * À tester AVANT les règles génériques « intelligence artificielle » / « IA générative ».
 */
export function isIAE67Formation(intitule?: string, code?: string): boolean {
  const c = (code || "").toUpperCase().replace(/\s/g, "");
  if (/^R[N]CP\d|^R[S]\d/.test(c)) return false;
  const t = normalize(intitule).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[^a-z0-9']+/g, " ").trim();
  if (!t) return false;
  const theme = /\bintelligence artificielle en entreprise\b/.test(t) || /\bia en entreprise\b/.test(t);
  return theme && /\b67 ?h\b/.test(t);
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function iae67Seed(nom?: string, prenom?: string): number {
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
const pgcd = (x: number, y: number): number => (y === 0 ? x : pgcd(y, x % y));

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
  typeof idx === "number" && idx >= 0 ? idx : iae67Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// notions d'IA, choix des outils, prompt, vérification, rédaction et relation client, données et reporting,
// automatisation, cadre légal, projet IA, feuille de route
// ---------------------------------------------------------------------------
export const IAE67_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Comment expliqueriez-vous à un collègue ce qu'est l'intelligence artificielle générative ?", reponseAttendue: "Système qui a appris à partir d'un très grand volume de données et qui produit du texte, des images ou du son en prédisant la suite la plus probable ; il ne comprend pas comme un humain, peut halluciner et reproduire des biais." },
    { question: "Quels outils d'IA utilisez-vous ou connaissez-vous, et pour quelles tâches ?", reponseAttendue: "Assistants conversationnels, assistants intégrés à la suite bureautique, outils de transcription, de traduction ou d'image ; usages reliés à des tâches précises du métier ; choix selon le besoin, la version entreprise et la protection des données." },
    { question: "Comment formulez-vous une demande à un outil d'IA pour obtenir une réponse utile ?", reponseAttendue: "Prompt structuré : rôle, contexte, tâche, format, contraintes, exemple ; itération par demandes de précision ; demander à l'outil de signaler ce qu'il ne sait pas." },
    { question: "Comment vérifiez-vous une réponse produite par un outil d'IA avant de l'utiliser ?", reponseAttendue: "Contrôle des faits, chiffres, noms, dates et sources dans des références fiables ; relecture du ton et de l'adéquation au destinataire ; grille de vérification ; l'utilisateur reste responsable du contenu diffusé." },
    { question: "Pour quelles tâches de rédaction ou de relation client l'IA pourrait-elle vous aider ?", reponseAttendue: "Brouillons de courriels, comptes rendus, procédures, contenus marketing, réponses aux demandes courantes, FAQ ; données personnelles retirées ; relecture avant envoi ; transparence vis-à-vis des clients." },
    { question: "Comment produisez-vous aujourd'hui vos tableaux de suivi et votre reporting ?", reponseAttendue: "Données nettoyées et anonymisées, formules et tableaux croisés dynamiques assistés par l'IA, indicateurs définis, contrôle des calculs et des totaux, commentaire distinguant faits et interprétations." },
    { question: "Quelles tâches répétitives de votre service aimeriez-vous automatiser ?", reponseAttendue: "Tâches fréquentes à règles claires ; workflow avec déclencheur, actions et conditions ; points de validation humaine ; droits limités ; journalisation, alertes et reprise manuelle ; documentation." },
    { question: "Quelles règles faut-il respecter, selon vous, quand on utilise l'IA au travail ?", reponseAttendue: "RGPD et recommandations de la CNIL (minimisation, outil autorisé), règlement (UE) 2024/1689 (pratiques interdites, maîtrise de l'IA, transparence), propriété intellectuelle, secret des affaires, cybersécurité, charte d'usage de l'entreprise." },
    { question: "Comment choisiriez-vous un premier projet d'IA dans votre service ?", reponseAttendue: "Recensement des tâches avec l'équipe, priorisation selon la valeur, la faisabilité et le risque, projet pilote limité, indicateurs avant et après, calcul du ROI avec tous les coûts, accompagnement de l'équipe." },
    { question: "Comment organiseriez-vous le déploiement de l'IA dans votre équipe sur plusieurs mois ?", reponseAttendue: "Feuille de route : diagnostic, cas d'usage priorisés, calendrier par étapes (pilote, bilan, généralisation), responsables, indicateurs, règles de conformité, plan d'accompagnement, gouvernance et revue régulière." },
  ],
  fin: [
    { question: "Comment présentez-vous désormais le fonctionnement et les limites de l'IA à votre équipe ?", reponseAttendue: "Apprentissage automatique et IA générative expliqués simplement ; modèle de langage qui prédit du texte probable ; apports réalistes ; limites : hallucinations, biais, données datées, confidentialité ; exemple concret du métier." },
    { question: "Quels outils d'IA avez-vous retenus pour votre service, et selon quels critères ?", reponseAttendue: "Outils reliés à des besoins précis ; version entreprise, hébergement et usage des données, intégration aux outils existants, coût, documentation du fournisseur ; comparaison sur une même tâche." },
    { question: "Quelle méthode de prompt appliquez-vous maintenant dans vos tâches quotidiennes ?", reponseAttendue: "Rôle, contexte, tâche, format, contraintes et exemple ; découpage en étapes ; itération ; consigne de signaler les informations manquantes ; prompts réutilisables partagés dans la bibliothèque du service." },
    { question: "Comment vérifiez-vous et mesurez-vous l'apport des productions de l'IA ?", reponseAttendue: "Grille de vérification (faits, chiffres, noms, dates, sources, ton, données sensibles) ; comparaison avec le document source ; relecture par une personne compétente ; temps gagné mesuré relecture comprise." },
    { question: "Quels usages de rédaction, de marketing ou de relation client avez-vous mis en place ?", reponseAttendue: "Modèles de réponses validés, comptes rendus et procédures relus, contenus marketing vérifiés, aucune affirmation inventée, données personnelles retirées, transparence sur l'usage d'un assistant vis-à-vis des clients." },
    { question: "Comment produisez-vous maintenant un reporting fiable avec l'aide de l'IA ?", reponseAttendue: "Données sources conservées et anonymisées, formules testées sur des exemples connus, tableaux croisés dynamiques, indicateurs définis avec leur période, contrôle des totaux, faits distingués des interprétations." },
    { question: "Quelle automatisation avez-vous conçue, et comment gardez-vous le contrôle humain ?", reponseAttendue: "Processus répétitif choisi, déclencheur, actions et conditions, validation humaine avant toute action vers un client, droits limités, journalisation, alerte et reprise manuelle, fiche d'automatisation à jour." },
    { question: "Quelles règles légales et éthiques appliquez-vous dans vos usages de l'IA ?", reponseAttendue: "Outils autorisés uniquement, minimisation des données, information des personnes, rôle de déployeur au sens du règlement (UE) 2024/1689, maîtrise de l'IA, transparence, droit d'auteur, secret des affaires, vigilance face au hameçonnage et à l'injection de prompt, charte d'usage." },
    { question: "Comment avez-vous priorisé et chiffré les cas d'usage de votre service ?", reponseAttendue: "Matrice valeur, faisabilité, risque ; projet pilote limité ; indicateurs avant et après ; ROI = gains moins coûts rapportés aux coûts, tous les coûts compris ; association de l'équipe et des ambassadeurs." },
    { question: "Que contient la feuille de route IA que vous avez construite pour votre service ?", reponseAttendue: "Diagnostic, cas d'usage priorisés, calendrier par étapes, responsables, indicateurs, règles de conformité, plan d'accompagnement de l'équipe, risques identifiés, gouvernance et revue régulière." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle.
// Aucune réponse à 1 au début : au plus 5 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — notions d'IA
  [
    ["C'est un robot qui pense tout seul.", 0],
    ["Un logiciel qui écrit des textes à partir d'une question.", 0.5],
    ["Je ne saurais pas l'expliquer.", 0],
    ["Un programme qui a appris à partir de beaucoup de textes sur Internet.", 0.5],
    ["C'est un moteur de recherche plus rapide que les autres.", 0],
    ["Un outil qui produit du texte ou des images, mais qui peut se tromper.", 0.5],
    ["L'IA sait tout, c'est pour ça qu'elle répond à tout.", 0],
    ["Je sais qu'elle invente parfois des choses, sans savoir pourquoi.", 0.5],
    ["C'est un logiciel de bureautique comme les autres.", 0],
    ["Une technologie qui imite le langage humain.", 0.5],
    ["Je pense qu'elle comprend ce qu'on lui dit comme une personne.", 0],
    ["J'ai entendu parler de modèles de langage, sans bien savoir ce que c'est.", 0.5],
  ],
  // Q2 — outils
  [
    ["Je n'utilise aucun outil d'IA.", 0],
    ["J'utilise parfois un assistant conversationnel pour reformuler des courriels.", 0.5],
    ["Je ne connais aucun nom d'outil.", 0],
    ["Je connais ChatGPT, je l'ai essayé à titre personnel.", 0.5],
    ["J'utilise le premier outil gratuit que je trouve.", 0],
    ["Notre messagerie propose des suggestions automatiques, je m'en sers un peu.", 0.5],
    ["Je pense que tous les outils se valent.", 0],
    ["J'ai testé un outil de traduction automatique pour des documents.", 0.5],
    ["Je ne sais pas si mon entreprise autorise ces outils.", 0],
    ["Un collègue utilise un outil de transcription des réunions.", 0.5],
    ["L'IA, c'est surtout pour les informaticiens.", 0],
    ["J'ai vu qu'il existe un assistant dans la suite bureautique, sans l'avoir utilisé.", 0.5],
  ],
  // Q3 — prompt
  [
    ["J'écris un mot-clé, comme dans un moteur de recherche.", 0],
    ["Je pose ma question en une phrase.", 0.5],
    ["Je ne sais pas comment m'y prendre.", 0],
    ["Je précise un peu le contexte quand la réponse ne me convient pas.", 0.5],
    ["Je tape « fais-moi un texte » et je prends ce qui sort.", 0],
    ["Je demande parfois une réponse plus courte.", 0.5],
    ["Je copie la question d'un collègue sans la changer.", 0],
    ["J'indique à qui le texte est destiné.", 0.5],
    ["Je n'ai jamais rédigé de demande à un outil d'IA.", 0],
    ["Je reformule ma question si la réponse est à côté.", 0.5],
    ["Plus la question est courte, mieux c'est.", 0],
    ["Je donne un exemple de ce que j'attends, de temps en temps.", 0.5],
  ],
  // Q4 — vérification
  [
    ["Je fais confiance à la réponse, l'outil est fiable.", 0],
    ["Je relis rapidement avant d'envoyer.", 0.5],
    ["Je ne vérifie pas, je n'ai pas le temps.", 0],
    ["Je vérifie les chiffres quand ils me paraissent bizarres.", 0.5],
    ["Si la réponse est bien écrite, c'est qu'elle est juste.", 0],
    ["Je compare parfois avec une recherche sur Internet.", 0.5],
    ["Je demande à l'outil s'il est sûr, et ça me suffit.", 0],
    ["Je fais relire par un collègue les textes importants.", 0.5],
    ["Je copie-colle la réponse directement.", 0],
    ["Je sais qu'il faut vérifier les sources, sans le faire systématiquement.", 0.5],
    ["Je ne saurais pas comment vérifier.", 0],
    ["Je corrige le ton quand le texte ne me ressemble pas.", 0.5],
  ],
  // Q5 — rédaction et relation client
  [
    ["Je ne vois pas à quoi l'IA pourrait me servir.", 0],
    ["Pour reformuler des courriels un peu délicats.", 0.5],
    ["L'IA pourrait répondre seule aux clients, ça ferait gagner du temps.", 0],
    ["Pour rédiger des comptes rendus de réunion.", 0.5],
    ["Je colle les réclamations des clients telles quelles dans l'outil.", 0],
    ["Pour préparer des publications pour les réseaux sociaux.", 0.5],
    ["Je laisserais l'IA décider des gestes commerciaux.", 0],
    ["Pour corriger l'orthographe de mes documents.", 0.5],
    ["Aucune idée pour l'instant.", 0],
    ["Pour préparer des réponses types aux questions fréquentes.", 0.5],
    ["Je publierais directement ce que l'outil propose.", 0],
    ["Pour traduire des messages à des clients étrangers.", 0.5],
  ],
  // Q6 — données et reporting
  [
    ["Je recopie les chiffres à la main chaque mois.", 0],
    ["J'utilise un tableur avec quelques formules simples.", 0.5],
    ["Je ne fais pas de reporting.", 0],
    ["Je fais des tableaux croisés dynamiques, mais j'ai du mal à les mettre à jour.", 0.5],
    ["Je copierais tout le fichier clients dans l'outil d'IA pour l'analyser.", 0],
    ["Je fais des graphiques pour la réunion mensuelle.", 0.5],
    ["Je ne sais pas ce qu'est un indicateur.", 0],
    ["Je demande parfois à un collègue de m'expliquer une formule.", 0.5],
    ["Je laisse le service informatique s'en occuper.", 0],
    ["Je suis quelques indicateurs dans un tableau partagé.", 0.5],
    ["Je fais confiance aux totaux sans les contrôler.", 0],
    ["J'ai entendu dire que l'IA peut écrire des formules de tableur.", 0.5],
  ],
  // Q7 — automatisation
  [
    ["Je ne vois pas ce qu'on pourrait automatiser.", 0],
    ["La saisie des demandes reçues par courriel dans notre tableau de suivi.", 0.5],
    ["Tout, il faudrait que plus rien ne passe par nous.", 0],
    ["L'envoi des relances de factures.", 0.5],
    ["Je ne sais pas ce qu'est un workflow.", 0],
    ["Le classement des pièces jointes dans les bons dossiers.", 0.5],
    ["L'envoi automatique de réponses aux clients sans relecture.", 0],
    ["La préparation des comptes rendus d'intervention.", 0.5],
    ["L'automatisation, c'est réservé aux grandes entreprises.", 0],
    ["Les rappels de rendez-vous aux clients.", 0.5],
    ["Je donnerais tous les accès à un outil pour qu'il se débrouille.", 0],
    ["J'ai entendu parler de Power Automate, sans l'avoir utilisé.", 0.5],
  ],
  // Q8 — cadre légal
  [
    ["Il n'y a pas de règles, ce sont des outils comme les autres.", 0],
    ["Il ne faut pas mettre de données personnelles dans les outils, je crois.", 0.5],
    ["Je ne sais pas.", 0],
    ["Le RGPD s'applique sûrement, sans que je sache comment.", 0.5],
    ["Tant que l'outil est gratuit, on peut tout y mettre.", 0],
    ["J'ai entendu parler d'une loi européenne sur l'IA.", 0.5],
    ["Les textes produits par l'IA m'appartiennent toujours.", 0],
    ["Il faut faire attention aux informations confidentielles de l'entreprise.", 0.5],
    ["Ce n'est pas mon problème, c'est celui du service informatique.", 0],
    ["Je pense qu'il faut prévenir les clients quand on utilise l'IA.", 0.5],
    ["Je n'ai jamais entendu parler de règles sur l'IA.", 0],
    ["Je sais que la CNIL s'intéresse à l'IA.", 0.5],
  ],
  // Q9 — projet IA
  [
    ["J'achèterais l'outil le plus connu pour tout le monde.", 0],
    ["Je demanderais à l'équipe quelles tâches lui prennent le plus de temps.", 0.5],
    ["Je ne saurais pas par où commencer.", 0],
    ["Je testerais un outil sur une tâche simple.", 0.5],
    ["Je lancerais plusieurs projets en même temps pour aller vite.", 0],
    ["Je choisirais une tâche répétitive qui agace tout le monde.", 0.5],
    ["Je laisserais le fournisseur décider.", 0],
    ["Je regarderais combien de temps on pourrait gagner.", 0.5],
    ["Je n'en parlerais pas à l'équipe avant que ce soit prêt.", 0],
    ["Je commencerais par un petit groupe de volontaires.", 0.5],
    ["Le coût ne compte pas, l'IA rapporte toujours.", 0],
    ["Je demanderais l'avis de ma direction sur les priorités.", 0.5],
  ],
  // Q10 — feuille de route
  [
    ["Je n'ai jamais fait de feuille de route.", 0],
    ["Je ferais un planning avec quelques étapes.", 0.5],
    ["J'imposerais l'outil à tout le monde le même jour.", 0],
    ["Je prévoirais une formation pour l'équipe.", 0.5],
    ["Je ne sais pas ce qu'il faudrait y mettre.", 0],
    ["Je fixerais quelques objectifs à atteindre.", 0.5],
    ["Une fois lancé, il n'y a plus rien à suivre.", 0],
    ["Je ferais un point régulier avec l'équipe.", 0.5],
    ["Je laisserais chacun se débrouiller avec l'outil.", 0],
    ["Je désignerais une personne référente dans l'équipe.", 0.5],
    ["Je n'en vois pas l'utilité.", 0],
    ["J'écrirais quelques règles simples d'utilisation.", 0.5],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["Un modèle de langage prédit la suite de texte la plus probable : il ne comprend pas comme un humain.", 1],
    ["J'explique la différence entre l'apprentissage automatique et l'IA générative avec un exemple de notre métier.", 1],
    ["Je présente les hallucinations : une réponse plausible peut être fausse, d'où la vérification.", 1],
    ["Je rappelle que les biais viennent souvent des données d'entraînement.", 1],
    ["Je montre qu'un outil sans accès à nos contrats peut inventer un délai ou un prix.", 1],
    ["J'insiste sur les apports réalistes : premiers jets, synthèses, reformulations.", 0.5],
    ["J'explique que les données d'entraînement s'arrêtent à une date.", 0.5],
    ["Je parle des tokens et de la fenêtre de contexte avec des mots simples.", 0.5],
    ["Je suis convaincu{e} qu'il faut démystifier l'outil sans le diaboliser.", 0.5],
    ["Je compare l'outil à un stagiaire brillant mais qu'on relit toujours.", 1],
    ["Je cite un exemple de stéréotype reproduit par un outil.", 0.5],
    ["J'explique pourquoi une réponse sûre d'elle n'est pas forcément exacte.", 1],
  ],
  [
    ["J'ai retenu l'assistant intégré à notre suite bureautique, autorisé par l'entreprise.", 1],
    ["J'ai comparé deux outils sur la même tâche avant de choisir.", 1],
    ["J'ai vérifié où sont hébergées les données et si elles servent à l'entraînement.", 1],
    ["Je choisis l'outil selon le besoin précis, pas selon sa popularité.", 1],
    ["Notre version entreprise offre des engagements contractuels sur les données.", 0.5],
    ["J'ai cartographié les usages de mon service avec les outils envisagés.", 1],
    ["Un outil de transcription sert pour nos réunions, avec information des participants.", 0.5],
    ["J'ai écarté un outil gratuit qui réutilisait les données saisies.", 0.5],
    ["J'ai vérifié l'intégration avec nos logiciels existants.", 0.5],
    ["Je tiens compte du coût réel, abonnement et temps d'apprentissage compris.", 0.5],
    ["Je consulte la documentation du fournisseur avant de valider un outil.", 1],
    ["J'ai choisi deux outils différents selon les tâches : rédaction et transcription.", 0.5],
  ],
  [
    ["Je précise le rôle, le contexte, la tâche, le format et les contraintes.", 1],
    ["Je donne un exemple du résultat attendu.", 1],
    ["J'améliore la réponse par des demandes successives.", 1],
    ["Je demande à l'outil de dire s'il lui manque une information.", 1],
    ["Je découpe les tâches complexes en plusieurs étapes.", 1],
    ["J'utilise des prompts réutilisables avec des zones entre crochets.", 0.5],
    ["J'indique le public visé et la longueur souhaitée.", 0.5],
    ["J'ai alimenté la bibliothèque de prompts de mon service.", 0.5],
    ["Je fournis un glossaire pour les traductions techniques.", 0.5],
    ["Je suis habitué{e} maintenant à demander un tableau à colonnes précises.", 0.5],
    ["Je demande de distinguer ce qui vient du document et ce qui est supposé.", 1],
    ["Je précise ce que l'outil ne doit surtout pas promettre.", 0.5],
  ],
  [
    ["Je vérifie chaque chiffre, nom et date dans une source fiable.", 1],
    ["J'ouvre les sources citées, car elles peuvent être inventées.", 1],
    ["J'applique la grille de vérification du service avant toute diffusion.", 1],
    ["Je compare la synthèse au document d'origine.", 1],
    ["Je mesure le temps gagné en comptant la relecture.", 1],
    ["Je fais relire les traductions destinées aux clients.", 0.5],
    ["Je contrôle les images générées avant de les utiliser.", 0.5],
    ["Je reste responsable de ce que je diffuse, même produit avec l'IA.", 1],
    ["Quand deux réponses se contredisent, je vérifie dans une source de référence.", 0.5],
    ["Je vérifie aussi le ton et l'adéquation au destinataire.", 0.5],
    ["Je note les erreurs fréquentes pour améliorer mes prompts.", 0.5],
    ["Je fais plus attention aux citations attribuées à des personnes.", 0.5],
  ],
  [
    ["J'ai préparé des modèles de réponses aux demandes courantes, validés par le service.", 1],
    ["Je retire toujours les données personnelles avant de soumettre une réclamation.", 1],
    ["Je fais rédiger un brouillon empathique que je retravaille et relis.", 1],
    ["Notre FAQ a été validée par les personnes qui connaissent les procédures.", 1],
    ["Je supprime toute affirmation non vérifiée des textes marketing.", 1],
    ["Nos comptes rendus de réunion sont relus avant diffusion.", 0.5],
    ["J'adapte le ton selon le destinataire : client, collègue ou direction.", 0.5],
    ["Je prépare les publications à partir de l'objectif et de la cible.", 0.5],
    ["Le client est informé quand il échange avec un assistant automatique.", 1],
    ["Je complète les offres avec nos prix et conditions réels.", 0.5],
    ["J'ai rédigé une procédure interne avec l'IA à partir des étapes réelles.", 0.5],
    ["Je ne publie jamais la première proposition sans la retravailler.", 0.5],
  ],
  [
    ["Je pseudonymise le fichier avant toute analyse.", 1],
    ["Je teste chaque formule proposée sur des lignes dont je connais le résultat.", 1],
    ["Mon tableau de bord présente quelques indicateurs définis avec leur période.", 1],
    ["Je contrôle les totaux et je garde les données sources.", 1],
    ["Je distingue les faits mesurés des interprétations dans mes commentaires.", 1],
    ["J'utilise des tableaux croisés dynamiques pour regrouper les données.", 0.5],
    ["Je repère et vérifie les valeurs aberrantes avant l'analyse.", 0.5],
    ["Je documente mes calculs pour que le reporting soit reproductible.", 0.5],
    ["Je vérifie un échantillon quand l'IA regroupe des réponses par thème.", 1],
    ["Je contrôle chaque graphique par rapport aux données d'origine.", 0.5],
    ["Je me méfie d'une explication de cause que les données ne démontrent pas.", 0.5],
    ["Je suis le délai moyen d'intervention chaque mois.", 0.5],
  ],
  [
    ["Mon workflow enregistre chaque demande reçue dans le tableau de suivi.", 1],
    ["Une personne valide la réponse avant tout envoi au client.", 1],
    ["J'ai limité les droits de l'outil au strict nécessaire.", 1],
    ["Une alerte prévient en cas d'échec et la demande est reprise à la main.", 1],
    ["La fiche d'automatisation décrit le déclencheur, les étapes et le responsable.", 1],
    ["J'ai testé l'automatisation avec des cas fictifs, y compris des erreurs.", 0.5],
    ["L'automatisation est journalisée : on sait ce qui a été fait et quand.", 0.5],
    ["J'ai obtenu l'accord du service informatique avant de connecter la messagerie.", 0.5],
    ["Une condition oriente les demandes urgentes vers un conseiller.", 1],
    ["Je suis chaque mois la part des traitements sans intervention manuelle.", 0.5],
    ["J'ai commencé par un processus simple, sur un petit périmètre.", 0.5],
    ["Un collègue sait reprendre l'automatisation en mon absence.", 0.5],
  ],
  [
    ["J'utilise uniquement les outils autorisés par l'entreprise.", 1],
    ["Je ne saisis que les données nécessaires, jamais de données sensibles.", 1],
    ["Notre entreprise est déployeur au sens du règlement européen sur l'IA.", 1],
    ["L'obligation de maîtrise de l'IA s'applique depuis le 2 février 2025.", 1],
    ["Je vérifie le calendrier du règlement dans les sources officielles, car des reports ont été proposés.", 1],
    ["La protection d'un contenu produit sans apport humain par le droit d'auteur est incertaine.", 0.5],
    ["Je ne colle jamais d'information confidentielle dans un outil non autorisé.", 0.5],
    ["Je me méfie des courriels qui demandent de coller des documents dans un outil.", 0.5],
    ["Je connais le risque d'injection de prompt dans les documents reçus.", 0.5],
    ["Notre charte d'usage précise les outils, les données interdites et la relecture.", 1],
    ["Je consulte les recommandations de la CNIL sur l'IA.", 0.5],
    ["Je signale tout incident lié à un outil d'IA.", 0.5],
  ],
  [
    ["J'ai recensé les tâches avec l'équipe avant de choisir.", 1],
    ["J'ai classé les cas d'usage selon la valeur, la faisabilité et le risque.", 1],
    ["Mon ROI compte l'outil, la formation, le paramétrage et la relecture.", 1],
    ["Le pilote porte sur un seul cas d'usage pendant deux mois.", 1],
    ["Je mesure le temps de traitement avant et après.", 1],
    ["Deux ambassadeurs aident leurs collègues et font remonter les difficultés.", 0.5],
    ["J'ai écouté les craintes de l'équipe sur l'emploi.", 0.5],
    ["J'ai reporté un cas d'usage trop risqué pour les données.", 0.5],
    ["J'ai fixé des critères d'arrêt du pilote.", 0.5],
    ["J'ai présenté les premiers résultats à l'équipe pour l'encourager.", 0.5],
    ["J'ai associé les représentants du personnel au projet.", 1],
    ["Le gain mensuel est estimé à partir du nombre de traitements.", 0.5],
  ],
  [
    ["Ma feuille de route part d'un diagnostic des tâches et des usages actuels.", 1],
    ["Chaque cas d'usage a un objectif, un outil, un contrôle humain et un indicateur.", 1],
    ["Le calendrier prévoit un pilote, un bilan, des ajustements puis la généralisation.", 1],
    ["J'ai désigné un responsable pour chaque étape.", 1],
    ["Les règles de conformité figurent pour chaque cas d'usage.", 1],
    ["Le plan d'accompagnement prévoit des ateliers courts et des fiches pratiques.", 0.5],
    ["Une revue est prévue chaque trimestre avec la direction.", 0.5],
    ["J'ai inscrit les risques, dont la dépendance à un seul fournisseur.", 0.5],
    ["La charte d'usage du service est annexée à la feuille de route.", 0.5],
    ["J'ai présenté les gains attendus et les moyens nécessaires à la direction.", 1],
    ["Je suis décidé{e} à faire vivre la feuille de route avec l'équipe.", 0.5],
    ["Les indicateurs sont suivis dans un tableau de bord partagé.", 0.5],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [54, 51, 45, 45, 4, 8, 57, 36, 47, 13];

export function getIAE67AutoAnswers(
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
export function iae67NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6). */
export function iae67BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((iae67NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `iae67BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function iae67ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = iae67BonnesQcmDebut(n, idx, nom, prenom);
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
export function iae67NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — une situation cohérente par stagiaire salarié : besoin principal (analyse des besoins),
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
    besoin: "Comprendre ce que l'IA peut réellement apporter à son service avant d'en généraliser l'usage.",
    objectif: "Je veux comprendre le fonctionnement et les limites de l'IA pour en parler juste avec mon équipe.",
    projet: "Elle me permettra de lancer un premier usage encadré dans mon service.",
    attentes: "Il est attendu que {le_sal} présente à son équipe les apports et les limites de l'IA et propose un premier cas d'usage.",
    missions: "Encadrement d'une équipe administrative, organisation du travail, suivi des indicateurs du service.",
    contribution: "Elle doit permettre un usage maîtrisé de l'IA dans le service.",
  },
  {
    besoin: "Gagner du temps sur la rédaction des courriels, comptes rendus et procédures.",
    objectif: "Mon objectif est d'utiliser l'IA avec méthode pour mes écrits professionnels, sans perdre en qualité.",
    projet: "Elle m'aidera à consacrer plus de temps aux échanges avec les clients.",
    attentes: "Il est attendu que {le_sal} rédige plus vite des écrits professionnels fiables avec l'aide de l'IA.",
    missions: "Assistanat de direction, rédaction des courriers, comptes rendus et notes internes.",
    contribution: "Elle doit réduire le temps consacré aux tâches de rédaction.",
  },
  {
    besoin: "Améliorer la qualité et la rapidité des réponses aux demandes des clients.",
    objectif: "Je souhaite préparer des réponses types fiables et une FAQ client avec l'aide de l'IA.",
    projet: "Elle me permettra de réduire les délais de réponse de mon service.",
    attentes: "Il est attendu que {le_sal} mette en place des modèles de réponses validés et relus.",
    missions: "Traitement des demandes et réclamations des clients, suivi de la satisfaction.",
    contribution: "Elle doit améliorer la satisfaction des clients et les délais de réponse.",
  },
  {
    besoin: "Produire plus rapidement des contenus marketing et des publications pour les réseaux sociaux.",
    objectif: "Mon objectif est de créer des contenus marketing de qualité avec l'IA, en restant fidèle à notre image.",
    projet: "Elle m'aidera à publier plus régulièrement sans y passer mes journées.",
    attentes: "Il est attendu que {le_sal} produise des contenus marketing vérifiés et conformes à la charte de l'entreprise.",
    missions: "Communication, marketing digital, animation des réseaux sociaux et du site Internet.",
    contribution: "Elle doit renforcer la visibilité de l'entreprise.",
  },
  {
    besoin: "Fiabiliser et accélérer le reporting mensuel à partir des tableurs du service.",
    objectif: "Je veux analyser les données et produire mes tableaux de bord avec l'aide de l'IA, en contrôlant les calculs.",
    projet: "Elle me permettra de livrer un reporting mensuel plus rapide et plus lisible.",
    attentes: "Il est attendu que {le_sal} produise un reporting fiable, avec des indicateurs définis et contrôlés.",
    missions: "Contrôle de gestion, suivi budgétaire, production des tableaux de bord.",
    contribution: "Elle doit améliorer la qualité des informations transmises à la direction.",
  },
  {
    besoin: "Automatiser des tâches répétitives de saisie et de suivi des demandes.",
    objectif: "Mon objectif est de concevoir des automatisations sans code, avec un contrôle humain à chaque étape clé.",
    projet: "Elle m'aidera à libérer du temps pour des tâches à plus forte valeur.",
    attentes: "Il est attendu que {le_sal} conçoive et documente une première automatisation sécurisée.",
    missions: "Gestion administrative, saisie et suivi des dossiers, relations avec les prestataires.",
    contribution: "Elle doit réduire les erreurs de saisie et les délais de traitement.",
  },
  {
    besoin: "Encadrer les usages de l'IA dans le respect du RGPD et du règlement européen sur l'IA.",
    objectif: "Je souhaite connaître les règles à respecter et rédiger la charte d'usage de l'IA de notre service.",
    projet: "Elle me permettra de sécuriser les usages déjà présents dans l'équipe.",
    attentes: "Il est attendu que {le_sal} rédige la charte d'usage de l'IA et en explique les règles à l'équipe.",
    missions: "Qualité, conformité, suivi des procédures internes et de la protection des données.",
    contribution: "Elle doit limiter les risques juridiques et de fuite de données.",
  },
  {
    besoin: "Conduire le déploiement de l'IA dans son service, de l'identification des cas d'usage au suivi des gains.",
    objectif: "Mon objectif est de construire une feuille de route IA réaliste et chiffrée pour mon service.",
    projet: "Elle m'aidera à convaincre ma direction et à accompagner mon équipe.",
    attentes: "Il est attendu que {le_sal} présente une feuille de route IA chiffrée à la direction.",
    missions: "Direction d'un service, pilotage des projets d'amélioration, management d'équipe.",
    contribution: "Elle doit permettre un déploiement de l'IA mesuré et accepté par l'équipe.",
  },
  {
    besoin: "Utiliser l'IA dans les processus des ressources humaines sans risque de discrimination.",
    objectif: "Je veux identifier les usages utiles en ressources humaines et les précautions à prendre.",
    projet: "Elle me permettra de gagner du temps sur les tâches administratives du service.",
    attentes: "Il est attendu que {le_sal} propose des usages de l'IA en ressources humaines, encadrés et conformes.",
    missions: "Gestion administrative du personnel, recrutement, formation, communication interne.",
    contribution: "Elle doit moderniser les pratiques du service dans le respect des règles.",
  },
  {
    besoin: "Préparer des offres et des synthèses commerciales plus rapidement.",
    objectif: "Mon objectif est d'utiliser l'IA pour préparer mes rendez-vous, mes offres et mes comptes rendus.",
    projet: "Elle m'aidera à consacrer plus de temps à mes clients.",
    attentes: "Il est attendu que {le_sal} utilise l'IA pour préparer des documents commerciaux fiables.",
    missions: "Prospection, rendez-vous clients, rédaction des offres, suivi des opportunités.",
    contribution: "Elle doit améliorer l'efficacité commerciale.",
  },
  {
    besoin: "Repérer les risques de cybersécurité liés aux outils d'IA utilisés par les équipes.",
    objectif: "Je souhaite connaître les risques de fuite de données et d'injection de prompt, et les bonnes pratiques.",
    projet: "Elle me permettra de sensibiliser mes collègues aux bons réflexes.",
    attentes: "Il est attendu que {le_sal} sensibilise l'équipe aux risques et aux règles de sécurité des outils d'IA.",
    missions: "Support informatique, gestion des accès, assistance aux utilisateurs.",
    contribution: "Elle doit réduire les risques de sécurité liés aux nouveaux outils.",
  },
  {
    besoin: "Former et accompagner son équipe dans l'adoption des outils d'IA.",
    objectif: "Mon objectif est de devenir la personne ressource de mon équipe sur les usages de l'IA.",
    projet: "Elle m'aidera à jouer le rôle d'ambassadeur de l'IA dans mon service.",
    attentes: "Il est attendu que {le_sal} accompagne ses collègues et partage une bibliothèque de prompts.",
    missions: "Coordination d'équipe, formation interne des nouveaux arrivants, amélioration continue.",
    contribution: "Elle doit faciliter l'adoption des nouveaux outils par l'équipe.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilIAE67(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

function entAccords(txt: string, fem: boolean): string {
  return accorder(txt.replace(/\{le_sal\}/g, fem ? "la stagiaire" : "le stagiaire"), fem);
}

export function getIAE67Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return entAccords(profilIAE67(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "BTS Gestion de la PME",
  "Licence professionnelle Métiers de la communication",
  "Baccalauréat professionnel Assistance à la gestion des organisations",
  "Master Management des organisations",
  "BTS Support à l'action managériale",
  "Baccalauréat STMG",
  "Aucun diplôme : plusieurs années d'expérience dans la gestion administrative",
  "BUT Gestion des entreprises et des administrations",
  "Licence d'économie et gestion",
  "BTS Négociation et digitalisation de la relation client",
  "École de commerce",
  "Diplôme obtenu à l'étranger, puis expérience en entreprise en France",
  "BTS Services informatiques aux organisations",
  "Baccalauréat général, puis expérience dans la relation client",
  "Licence de ressources humaines",
  "DUT Techniques de commercialisation",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant chaque journée.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières devant l'écran me conviennent.",
  "Non. Je porte des lunettes et j'apprécie des supports en police suffisamment grande.",
  "Non, pas de handicap. J'entends moins bien avec certains casques : j'aimerais pouvoir activer les sous-titres.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je lis plus lentement : j'apprécie de disposer des supports après chaque journée.",
  "Non, aucune situation de handicap. Je préfère participer activement aux ateliers pratiques.",
  "Non. Je préfère avoir les fiches en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté avant la formation.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible pour les classes virtuelles des 10 jours de formation, du premier au dernier jour.",
  "J'ai bloqué les 10 jours de formation dans mon agenda et je refais les QCM le soir.",
  "Je suis disponible pour les 10 jours de formation, depuis un bureau calme avec une bonne connexion.",
  "Je peux suivre les classes virtuelles des 10 jours sans contrainte particulière.",
  "Je suis disponible pour les 10 jours de formation ; mon responsable a réorganisé mes dossiers.",
  "Disponibilité complète pour les 10 jours de formation. J'ai fait le test de connexion proposé.",
  "Pour les 10 jours de formation, je suis disponible ; mes rendez-vous ont été décalés.",
  "Je suis disponible pour les 10 jours et je préviendrai le formateur en cas d'imprévu.",
  "Je suivrai les classes virtuelles des 10 jours depuis mon poste, avec un casque.",
  "Aucune contrainte pour les 10 jours de formation. Mon employeur a validé mon absence du service.",
];

/** Réponses d'évaluation des besoins propres à la formation « Intelligence artificielle en entreprise – 67 h », différentes pour chaque stagiaire. */
export function getIAE67EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = iae67Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilIAE67(idx, s.nom, s.prenom);
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
    budget: "Formation financée par l'employeur dans le cadre de son plan de développement des compétences (convention de formation).",
    projetPro: entAccords(profil.projet, fem),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
