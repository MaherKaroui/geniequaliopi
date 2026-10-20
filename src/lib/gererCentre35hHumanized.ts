// ---------------------------------------------------------------------------
// « Gérer son centre de formation – 35 h » — moteur de réponses HUMANISÉES
// Formation professionnelle non certifiante : évaluation interne + attestation de fin de formation.
// Public : particuliers à leurs propres frais (porteurs de projet, formateurs indépendants,
// dirigeants de petits organismes de formation, personnes en reconversion).
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes…),
//     puis parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes : diagnostic puis C1 à C6, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par exercice + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Les organismes, les personnes et les chiffres cités dans les copies sont fictifs.
// ---------------------------------------------------------------------------

const normalize = (s: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Gérer son centre de formation – 35 h ». L'intitulé normalisé
 * (minuscules, sans accents, apostrophes droites) doit contenir « gerer son centre de formation »,
 * « gerer un centre de formation », ou bien « centre de formation » précédé de « gestion d'un » /
 * « gestion de son » / « gestion du ». Les autres formations du catalogue (gestion d'entreprise, paie,
 * création d'entreprise, formation de formateurs…) ne sont pas concernées.
 */
export function isGSC35Formation(intitule?: string, code?: string): boolean {
  void code;
  const t = normalize(intitule || "").toLowerCase().replace(/[’‘`´]/g, "'").replace(/\s+/g, " ");
  if (/\bgerer (son|un|mon|votre) centre de formation\b/.test(t)) return true;
  if (/\bgestion (d'un|de son|du|d'une structure de|de mon) centre de formation\b/.test(t)) return true;
  return false;
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function gsc35Seed(nom?: string, prenom?: string): number {
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
 * {e} → e au féminin ; {ne} → ne ; {le} → le ; {/rice} → rice (sinon eur) ; {if} → ive (sinon if) ;
 * {er} → ère (sinon er) ; {eur} → euse (sinon eur) ; {eux} → euse (sinon eux)
 */
function accorder(txt: string, fem: boolean): string {
  return txt
    .replace(/\{er\}/g, fem ? "ère" : "er")
    .replace(/\{eur\}/g, fem ? "euse" : "eur")
    .replace(/\{eux\}/g, fem ? "euse" : "eux")
    .replace(/\{\/rice\}/g, fem ? "rice" : "eur")
    .replace(/\{if\}/g, fem ? "ive" : "if")
    .replace(/\{ne\}/g, fem ? "ne" : "")
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
  typeof idx === "number" && idx >= 0 ? idx : gsc35Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// diagnostic, C1 statut et déclaration d'activité, C1 obligations légales et contrôles,
// C2 programme conforme, C2 contrat et convention, C3 référentiel et autodiagnostic,
// C3 audit et non-conformités, C4 coût de revient, financement et commercialisation,
// C5 gestion administrative et BPF, C6 pilotage et amélioration continue
// ---------------------------------------------------------------------------
export const GSC35_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Présentez votre projet ou votre activité de formation : domaines, public, clients, et où en êtes-vous de vos démarches ?", reponseAttendue: "Domaines et public visés, modalités, volume d'activité réel ou visé, intervenants, statut choisi ou envisagé, déclaration d'activité faite ou non, documents existants, financements visés, premières difficultés rencontrées." },
    { question: "Quelles démarches faut-il accomplir pour exercer légalement comme organisme de formation ?", reponseAttendue: "Choix d'un statut (entreprise individuelle, micro-entreprise, société, association), immatriculation, déclaration d'activité en ligne sur Mon Activité Formation dans les trois mois suivant la première convention ou le premier contrat, numéro de déclaration d'activité qui ne vaut pas agrément de l'État." },
    { question: "Quelles obligations légales un organisme de formation doit-il respecter au quotidien ?", reponseAttendue: "Règlement intérieur remis aux stagiaires, bilan pédagogique et financier annuel, comptabilité, documents remis aux stagiaires, attestation de fin de formation, conservation des pièces, exonération de TVA sous conditions, contrôles de l'État et sanctions possibles." },
    { question: "Comment rédigez-vous un programme de formation et ses objectifs ?", reponseAttendue: "Objectifs opérationnels et évaluables (verbe d'action, contexte, critère), public, prérequis, durée, modalités, contenu, méthodes, positionnement et évaluation, délai d'accès, tarif, accessibilité, contact ; adaptation selon l'analyse des besoins." },
    { question: "Quel document faites-vous signer à un particulier qui paie lui-même sa formation, et quelles règles s'appliquent ?", reponseAttendue: "Contrat de formation professionnelle (art. L.6353-3 à L.6353-7) : mentions obligatoires, délai de rétractation de dix jours, aucun paiement avant son expiration, acompte limité à 30 % du prix, solde échelonné, règles en cas d'abandon ou de force majeure ; convention pour une entreprise." },
    { question: "Que savez-vous de la certification Qualiopi et du référentiel national qualité ?", reponseAttendue: "Obligation pour accéder aux fonds publics ou mutualisés (art. L.6316-1), 7 critères, 33 indicateurs à compter du 1er novembre 2026 (décret n° 2026-728), preuves attendues, indicateurs non applicables justifiés, situation du nouvel entrant." },
    { question: "Comment se déroule un audit qualité et que se passe-t-il en cas d'écart ?", reponseAttendue: "Organisme certificateur accrédité, audit initial, audit de surveillance entre le 14e et le 22e mois, renouvellement tous les trois ans, non-conformités mineures et majeures, plan d'actions correctives, organisation des preuves." },
    { question: "Comment fixez-vous le prix de vos formations et comment les financez-vous et les faites-vous connaître ?", reponseAttendue: "Calcul du coût de revient (coûts directs et frais fixes), seuil de rentabilité, prix argumenté ; financements selon le client et leurs conditions ; site internet et mentions obligatoires, prospection loyale, interdiction du démarchage pour le compte personnel de formation." },
    { question: "Comment organisez-vous la gestion administrative et financière d'une session et le bilan pédagogique et financier ?", reponseAttendue: "Parcours administratif complet (devis, contrat, convocation, émargement, attestation, facture), mentions de la facture et exonération de TVA, tableau de bord et trésorerie, bilan pédagogique et financier annuel, archivage, protection des données personnelles." },
    { question: "Comment pilotez-vous votre activité, vos formateurs et l'amélioration continue ?", reponseAttendue: "Contrats avec les formateurs (salariés, indépendants, sous-traitance), vérification et développement des compétences, référent handicap, veilles, appréciations et réclamations, indicateurs de résultats, plan d'amélioration avec analyse des risques, plan de développement." },
  ],
  fin: [
    { question: "Présentez le diagnostic de votre projet ou de votre organisme et les priorités que vous en tirez.", reponseAttendue: "Projet décrit, état exact des démarches, clients et financements distingués, risques repérés, 3 forces, 3 points de vigilance et 3 priorités reliées aux compétences C1 à C6." },
    { question: "Quel statut avez-vous retenu et comment se déroule la déclaration d'activité ?", reponseAttendue: "Statut justifié ; déclaration d'activité en ligne sur Mon Activité Formation dans les trois mois suivant la première convention ou le premier contrat, pièces jointes (dont pièce d'identité et extrait de casier judiciaire), délai de deux mois pour le préfet de région (décret n° 2025-728), numéro et mention « ne vaut pas agrément de l'État », caducité." },
    { question: "Présentez le registre des obligations légales de votre organisme et les contrôles possibles.", reponseAttendue: "Règlement intérieur, bilan pédagogique et financier, comptabilité, documents remis, attestation, conservation des pièces ; exonération de TVA (art. 261-4-4° du CGI) et mention sur la facture ; contrôles des services de l'État et de la Caisse des Dépôts, sanctions." },
    { question: "Présentez le programme conforme que vous avez rédigé et ses objectifs.", reponseAttendue: "Objectifs opérationnels et évaluables, programme complet (public, prérequis, durée, modalités, contenu, méthodes, évaluation, délai d'accès, tarif, accessibilité, contact), adaptation aux besoins, indicateurs de résultats publiés." },
    { question: "Comment rédigez-vous le contrat d'un particulier et la convention d'une entreprise ?", reponseAttendue: "Mentions des articles L.6353-3 et L.6353-4, délai de rétractation de dix jours, aucun paiement avant son expiration, acompte limité à 30 %, solde échelonné, abandon et force majeure ; convention et conditions générales de vente ; attestation de fin de formation et certificat de réalisation." },
    { question: "Présentez votre autodiagnostic au regard du référentiel national qualité.", reponseAttendue: "7 critères, 33 indicateurs à compter du 1er novembre 2026, évolutions du décret n° 2026-728 (analyse des risques à l'indicateur 32, indicateur 27, nouvel indicateur 33 pour les centres de formation d'apprentis), preuves, écarts, actions, indicateurs non applicables, nouvel entrant." },
    { question: "Comment préparez-vous l'audit et traitez-vous une non-conformité ?", reponseAttendue: "Choix d'un organisme certificateur accrédité, cycle d'audit, classement des preuves, qualification mineure ou majeure, délais, plan d'actions correctives avec cause, action, responsable, échéance et preuve." },
    { question: "Présentez le coût de revient, le prix, les financements et le plan commercial d'une de vos formations.", reponseAttendue: "Coût de revient et seuil de rentabilité justes, prix argumenté, financements avec leurs conditions réelles (le compte personnel de formation comme perspective), mentions obligatoires du site, plan commercial loyal et chiffré." },
    { question: "Comment organisez-vous le parcours administratif d'un stagiaire et le bilan pédagogique et financier ?", reponseAttendue: "Parcours tracé du premier contact à l'archivage, facture conforme avec mention de l'exonération, tableau de bord et trésorerie, cadres du bilan pédagogique et financier et transmission annuelle, archivage et protection des données." },
    { question: "Présentez votre tableau de pilotage et votre plan d'amélioration continue.", reponseAttendue: "Contrats et compétences des formateurs, référent handicap, veilles, réclamations, indicateurs et cibles, plan d'amélioration et analyse des risques sur la qualité des formations, plan de développement à un an." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle, 1 = juste.
// Une seule réponse à 1 dans deux questions seulement (C1 statut, C2 contrat) : au plus 6 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — diagnostic du projet
  [
    ["J'ai l'idée de créer un centre de formation, mais je n'ai encore rien formalisé.", 0],
    ["Je donne déjà des formations en bureautique comme indépendant{e}, sans programme écrit ; mes clients sont surtout des particuliers.", 0.5],
    ["Mon projet porte sur l'anglais professionnel ; j'ai créé ma micro-entreprise, mais je ne sais pas encore si je dois faire autre chose.", 0.5],
    ["Je pense qu'il suffit d'être bon dans son métier pour ouvrir un centre de formation.", 0],
    ["Je dirige un petit organisme déclaré depuis deux ans, avec deux formateurs indépendants ; nous n'avons pas de démarche qualité.", 0.5],
    ["Je ne sais pas encore quel public viser ni quelles formations proposer.", 0],
    ["J'interviens en sous-traitance pour deux organismes ; je veux maintenant vendre mes propres formations.", 0.5],
    ["Je n'ai aucune idée des documents qu'il faut avoir.", 0],
    ["Je compte me lancer le mois prochain, je verrai l'administratif plus tard.", 0],
    ["Je suis en reconversion après quinze ans en ressources humaines ; j'ai un projet précis en accueil et bureautique, mais aucune démarche n'est faite.", 0.5],
    ["Je pense que tous les stagiaires pourront utiliser leur compte personnel de formation.", 0],
    ["Nous sommes une association qui forme des bénévoles ; nous voulons ouvrir nos formations au public.", 0.5],
  ],
  // Q2 — C1 statut et déclaration d'activité
  [
    ["Je crois qu'il faut un agrément du ministère avant de commencer.", 0],
    ["Je ne connais pas la déclaration d'activité.", 0],
    ["Il faut un numéro d'organisme de formation, mais je ne sais pas comment l'obtenir.", 0.5],
    ["Je pense qu'il faut obligatoirement créer une société pour être organisme de formation.", 0],
    ["J'ai entendu parler de Mon Activité Formation, sans savoir à quel moment déposer la demande.", 0.5],
    ["Je sais qu'une micro-entreprise peut faire de la formation, mais je ne connais pas les démarches propres à la formation.", 0.5],
    ["Le numéro de déclaration, je crois qu'il prouve que l'État a validé nos formations.", 0.5],
    ["Il faut choisir un statut, s'immatriculer, puis déposer la déclaration d'activité en ligne sur Mon Activité Formation dans les trois mois qui suivent la première convention ou le premier contrat de formation ; le numéro attribué ne vaut pas agrément de l'État.", 1],
    ["Je pense qu'on dépose la déclaration une fois qu'on a beaucoup de stagiaires.", 0],
    ["Je sais qu'il faut déclarer son activité, mais je pensais que c'était auprès de la mairie.", 0.5],
    ["Je n'ai jamais réfléchi à la différence entre entreprise individuelle et société.", 0],
    ["Je crois que le numéro de déclaration est donné automatiquement avec le SIRET.", 0],
  ],
  // Q3 — C1 obligations légales et contrôles
  [
    ["Je sais qu'il faut tenir une comptabilité, comme toute entreprise.", 0.5],
    ["Je ne vois pas d'obligation particulière à part facturer.", 0],
    ["Je ne sais pas ce qu'est un règlement intérieur pour des stagiaires.", 0],
    ["Je pense que les formations ne sont jamais contrôlées.", 0],
    ["J'ai entendu parler d'un bilan annuel à envoyer, sans savoir lequel.", 0.5],
    ["Je facture avec de la TVA, je ne savais pas qu'il pouvait y avoir une exonération.", 0],
    ["Je garde mes feuilles de présence, je pense que c'est utile en cas de contrôle.", 0.5],
    ["Je crois que seules les grandes structures doivent avoir un règlement intérieur.", 0],
    ["Je sais que la formation est exonérée de TVA sous conditions, sans connaître lesquelles.", 0.5],
    ["Je ne conserve pas les documents après la formation.", 0],
    ["Je ne sais pas qui contrôle les organismes de formation.", 0],
    ["Je sais qu'il faut remettre une attestation en fin de formation, je ne sais pas ce qu'elle doit contenir.", 0.5],
  ],
  // Q4 — C2 programme conforme
  [
    ["Je n'ai pas de programme écrit, j'adapte au jour le jour.", 0],
    ["Mon programme liste les thèmes abordés, sans objectifs.", 0],
    ["J'écris des objectifs comme « découvrir » ou « sensibiliser », je ne sais pas s'ils conviennent.", 0.5],
    ["Je pense que le prix doit rester « sur demande ».", 0],
    ["J'indique la durée et le lieu, mais pas les prérequis ni le délai d'accès.", 0.5],
    ["Je ne savais pas qu'il fallait parler de l'accessibilité aux personnes en situation de handicap.", 0],
    ["Je sais qu'un objectif doit pouvoir être évalué, sans savoir comment le formuler.", 0.5],
    ["J'utilise le programme d'un autre organisme que je modifie un peu.", 0.5],
    ["Je fais un test au début de mes formations, mais je n'en tiens pas compte dans le programme.", 0.5],
    ["Je ne connais pas les mentions attendues dans un programme.", 0],
    ["Je mets un contact et un tarif, le reste me paraît secondaire.", 0.5],
    ["Je ne vois pas la différence entre un objectif et un contenu.", 0],
  ],
  // Q5 — C2 contrat et convention
  [
    ["Je fais simplement un devis signé.", 0],
    ["Je fais signer une convention à tout le monde, particulier ou entreprise.", 0.5],
    ["Je sais qu'il existe un contrat spécifique pour les particuliers, sans en connaître les règles.", 0.5],
    ["Je demande le paiement complet à l'inscription pour réserver la place.", 0],
    ["Le particulier signe un contrat de formation professionnelle ; il a dix jours pour se rétracter, je ne peux rien encaisser avant, puis l'acompte est limité à 30 % du prix et le solde est échelonné. Je ne connais pas encore toutes les mentions du contrat.", 1],
    ["Je ne connais pas de délai de rétractation pour la formation.", 0],
    ["Je pense que le délai de rétractation est de quatorze jours, comme pour les achats en ligne.", 0],
    ["Je sais qu'on ne peut pas tout encaisser tout de suite, sans connaître la règle exacte.", 0.5],
    ["Je n'ai pas de conditions générales de vente.", 0],
    ["J'ai des conditions générales de vente reprises d'un modèle trouvé en ligne, je ne les ai pas vérifiées.", 0.5],
    ["En cas d'abandon, je garde toute la somme versée.", 0],
    ["Je ne fais aucun document avec les particuliers, ils paient par virement.", 0],
  ],
  // Q6 — C3 référentiel et autodiagnostic
  [
    ["Je sais que Qualiopi est demandé pour certains financements.", 0.5],
    ["Je crois que Qualiopi est obligatoire pour toute formation.", 0.5],
    ["Je ne sais pas ce qu'est Qualiopi.", 0],
    ["Je pense que c'est un logiciel.", 0],
    ["J'ai entendu dire qu'il y avait des critères et des indicateurs, je ne sais pas combien.", 0.5],
    ["Je pense qu'il suffit de payer pour l'obtenir.", 0],
    ["Je crois que c'est une formation à suivre.", 0],
    ["Je sais qu'il faut des preuves pour chaque exigence, sans savoir lesquelles.", 0.5],
    ["Je n'ai jamais vu le référentiel.", 0],
    ["Je sais que le référentiel a changé récemment, sans connaître les changements.", 0.5],
    ["Je pense que Qualiopi concerne seulement les grands organismes.", 0],
    ["Je ne sais pas si mon organisme en a besoin.", 0],
  ],
  // Q7 — C3 audit et non-conformités
  [
    ["Je ne sais pas qui réalise les audits.", 0],
    ["Je crois qu'un auditeur vient vérifier les documents, une fois.", 0.5],
    ["Je pense que l'audit est fait par l'OPCO.", 0],
    ["Je sais qu'il existe des non-conformités mineures et majeures.", 0.5],
    ["Je sais que le certificat a une durée limitée et qu'il y a un audit en cours de route.", 0.5],
    ["Je n'ai aucune idée de ce qui se passe en cas d'écart.", 0],
    ["Je sais qu'il faut un organisme certificateur reconnu, sans savoir lequel choisir.", 0.5],
    ["Je pense qu'on peut préparer l'audit la veille.", 0],
    ["Je sais qu'il faut corriger les écarts relevés, sans connaître les délais.", 0.5],
    ["Je ne sais pas comment ranger les preuves.", 0],
    ["Je pense qu'un écart fait perdre la certification à coup sûr.", 0],
    ["Un ami formateur m'a raconté son audit ; je sais qu'il faut des preuves classées par critère.", 0.5],
  ],
  // Q8 — C4 coût de revient, financement et commercialisation
  [
    ["Je fixe mes prix d'après ceux des concurrents.", 0],
    ["Je ne sais pas comment calculer un prix.", 0],
    ["Je pense que l'OPCO paiera toutes mes formations.", 0],
    ["Je calcule ce que me coûtent la salle et le formateur, mais j'oublie les autres frais.", 0.5],
    ["Je sais qu'il existe plusieurs financements selon le client, je les confonds souvent.", 0.5],
    ["J'ai un site internet, je ne sais pas quelles mentions y mettre.", 0.5],
    ["Je pense que le compte personnel de formation finance toutes les formations.", 0],
    ["Je sais que le démarchage pour le compte personnel de formation pose problème, sans connaître la règle.", 0.5],
    ["Je prospecte par téléphone en promettant un financement à chacun.", 0],
    ["Je fais des devis, mais je ne connais pas ma marge.", 0.5],
    ["Je n'ai pas de stratégie commerciale.", 0],
    ["Je compte sur le bouche-à-oreille uniquement.", 0],
  ],
  // Q9 — C5 gestion administrative et BPF
  [
    ["Je n'ai pas de procédure, je gère au cas par cas.", 0],
    ["J'envoie une convocation et je fais signer une feuille de présence.", 0.5],
    ["Je ne connais pas le bilan pédagogique et financier.", 0],
    ["Je sais qu'il faut un bilan annuel, sans savoir quoi y mettre.", 0.5],
    ["Je fais mes factures dans un tableur, sans vérifier les mentions.", 0],
    ["Je suis ma trésorerie sur mon compte bancaire, sans prévisionnel.", 0.5],
    ["Je garde les dossiers des stagiaires dans un carton, sans durée définie.", 0],
    ["Je ne sais pas ce qu'est un registre des traitements de données.", 0],
    ["Je sais que les données des stagiaires doivent être protégées, sans savoir comment.", 0.5],
    ["Je n'ai pas d'assurance professionnelle.", 0],
    ["Je ne sais pas qui remplit le bilan annuel ni quand.", 0],
    ["J'utilise un outil en ligne pour les factures, mais je ne connais pas les mentions propres à la formation.", 0.5],
  ],
  // Q10 — C6 pilotage et amélioration continue
  [
    ["Je travaille seul{e}, je ne vois pas ce qu'il faut piloter.", 0],
    ["Je fais remplir un questionnaire de satisfaction à la fin.", 0.5],
    ["Je ne sais pas quel contrat signer avec un formateur indépendant.", 0],
    ["Je recrute les formateurs par connaissance, sans vérifier leur CV.", 0.5],
    ["Je traite les réclamations à l'oral, sans trace.", 0.5],
    ["Je ne connais pas le rôle d'un référent handicap.", 0],
    ["Je suis quelques actualités sur les réseaux sociaux, sans organisation.", 0.5],
    ["Je sais qu'il faut s'améliorer, mais je n'ai pas de plan.", 0.5],
    ["Je pense que les indicateurs sont réservés aux grands organismes.", 0.5],
    ["Je ne publie aucun résultat.", 0],
    ["Je n'ai jamais pensé aux risques qui peuvent empêcher une formation de bien se dérouler.", 0],
    ["Je ne sais pas ce qu'est une veille.", 0],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  // Q1 — diagnostic
  [
    ["Mon diagnostic : projet en accueil et bureautique, aucune démarche faite au départ ; mes priorités sont le statut et la déclaration d'activité, un programme et un contrat conformes, puis la préparation de Qualiopi.", 1],
    ["J'ai décrit mon activité de formateur indépendant et repéré trois risques : pas de contrat avec les particuliers, prix inférieur au coût de revient, pièces non conservées.", 1],
    ["Mes clients sont surtout des particuliers à leurs propres frais ; les financements publics viendront après la certification.", 1],
    ["Je sais maintenant décrire mon projet ; il me reste à préciser mon volume d'activité.", 0.5],
    ["Trois forces : expertise métier, réseau, rigueur. Trois points de vigilance : contrats, prix, qualité. Chaque priorité est reliée à une compétence.", 1],
    ["J'ai listé les documents existants et manquants : programme, contrat, règlement intérieur, conditions générales de vente.", 1],
    ["Mon diagnostic distingue ce que je fais en sous-traitance et ce que je veux vendre en direct.", 1],
    ["J'ai un plan à 30, 60 et 90 jours qui reprend mes priorités.", 1],
    ["J'ai fait le diagnostic ; je dois encore vérifier le choix du statut avec un expert-comptable.", 0.5],
    ["Le diagnostic m'a montré que je n'avais aucun document conforme avec mes clients particuliers.", 1],
    ["J'ai compris que mes stagiaires ne pourront pas utiliser leur compte personnel de formation pour l'instant.", 0.5],
    ["Mes priorités sont écrites et datées dans mon plan d'action.", 1],
  ],
  // Q2 — C1 statut et déclaration d'activité
  [
    ["J'ai retenu la micro-entreprise pour démarrer ; je déposerai la déclaration d'activité sur Mon Activité Formation dans les trois mois qui suivent mon premier contrat, avec sa copie et le programme.", 1],
    ["Le préfet de région dispose de deux mois pour enregistrer ou refuser la déclaration ; le numéro s'accompagne de la mention « cet enregistrement ne vaut pas agrément de l'État ».", 1],
    ["La déclaration devient caduque si le bilan pédagogique et financier n'est pas transmis ou ne montre aucune activité.", 1],
    ["J'ai comparé l'entreprise individuelle, la SASU et l'association : je choisis la SASU pour accueillir un associé plus tard.", 1],
    ["Mon activité relève bien de l'action de formation : objectif professionnel, programme, évaluation des acquis.", 1],
    ["Je connais les étapes de la déclaration ; je dois encore préparer les justificatifs des intervenants.", 0.5],
    ["La liste publique des organismes de formation permet à mes clients de vérifier ma déclaration.", 1],
    ["Je joins à la déclaration la copie de la première convention ou du premier contrat.", 1],
    ["Je sais qu'il faut déclarer, mais je confonds encore certaines pièces à fournir.", 0.5],
    ["Le statut ne change pas l'obligation de déclaration : elle vaut pour tous les organismes.", 1],
    ["J'ai noté le délai de trois mois, j'ai encore un doute sur le moment exact du dépôt.", 0.5],
    ["Je déclare aussi toute modification de mon organisme à l'administration.", 1],
  ],
  // Q3 — C1 obligations et contrôles
  [
    ["Mon registre : règlement intérieur remis avant l'entrée, bilan pédagogique et financier chaque année, comptabilité, attestation de fin de formation, pièces archivées.", 1],
    ["Le règlement intérieur fixe l'hygiène, la sécurité, la discipline, les sanctions et les garanties de procédure.", 1],
    ["L'exonération de TVA de l'article 261-4-4° du CGI suppose l'attestation de l'administration ; la mention figure sur mes factures.", 1],
    ["Les services régionaux de contrôle de la DREETS peuvent contrôler l'organisme sur pièces et sur place.", 1],
    ["Sanctions : remboursement des sommes non justifiées, versement au Trésor public, annulation de la déclaration.", 1],
    ["Je connais mes obligations ; la partie contrôle me demande encore des lectures.", 0.5],
    ["La Caisse des Dépôts contrôle les actions financées par le compte personnel de formation.", 1],
    ["Chaque obligation de mon registre a une preuve et une échéance.", 1],
    ["Je sais que la TVA est exonérée sous conditions ; je dois vérifier ma situation avec mon comptable.", 0.5],
    ["Je conserve tous les documents d'une session pour pouvoir justifier la réalisation.", 1],
    ["J'ai rédigé mon règlement intérieur ; il me reste à le faire relire.", 0.5],
    ["Le contrôle se déroule de façon contradictoire : l'organisme peut présenter ses observations.", 1],
  ],
  // Q4 — C2 programme
  [
    ["Mes objectifs ont un verbe d'action, un contexte et un critère de réussite, par exemple « traiter un appel entrant en reformulant la demande ».", 1],
    ["Mon programme indique public, prérequis, durée, modalités, contenu, méthodes, évaluation, délai d'accès, tarif, accessibilité et contact.", 1],
    ["Le délai d'accès tient compte des dix jours de rétractation pour un particulier.", 1],
    ["L'analyse des besoins et le positionnement me servent à adapter les exemples et le rythme, avec une trace écrite.", 1],
    ["Je publie mes indicateurs : satisfaction, atteinte des objectifs, abandons, avec la période de calcul.", 1],
    ["Mon programme est complet ; je dois encore améliorer la formulation de certains objectifs.", 0.5],
    ["J'ai supprimé « prix sur demande » : le tarif est indiqué clairement.", 1],
    ["Le contact du référent handicap figure sur chaque programme.", 1],
    ["Je sais construire un programme ; les indicateurs de résultats restent à calculer.", 0.5],
    ["Chaque séquence a un contenu, une méthode et une modalité d'évaluation.", 1],
    ["Je relis mes programmes avec la liste des mentions attendues avant de les publier.", 1],
    ["J'ai réécrit le programme de ma formation phare avec des objectifs évaluables.", 0.5],
  ],
  // Q5 — C2 contrat et convention
  [
    ["Pour un particulier, contrat de formation professionnelle avec les mentions des articles L.6353-3 et L.6353-4 ; dix jours de rétractation, aucun encaissement avant, acompte de 30 % au plus, solde échelonné.", 1],
    ["Pour une entreprise, convention de formation avec intitulé, dates, durée, prix, conditions d'annulation et numéro de déclaration d'activité.", 1],
    ["En cas de force majeure, seules les prestations effectivement dispensées sont dues au prorata.", 1],
    ["L'attestation de fin de formation mentionne les objectifs, la nature, la durée et les résultats de l'évaluation des acquis.", 1],
    ["Mes conditions générales de vente sont loyales et ne privent pas le particulier de ses droits.", 1],
    ["Je maîtrise le contrat ; les conditions d'annulation de mes CGV doivent encore être reprises.", 0.5],
    ["Le certificat de réalisation sert au financeur, l'attestation au stagiaire.", 1],
    ["Pour Leïla, l'acompte ne peut pas dépasser 252 € sur un prix de 840 €.", 1],
    ["J'ai encore un doute sur la rédaction de la clause d'abandon.", 0.5],
    ["Je remets le programme et le règlement intérieur avec chaque contrat.", 1],
    ["Je n'encaisse plus rien à l'inscription : j'attends la fin du délai de rétractation.", 0.5],
    ["Mon contrat indique les références des intervenants et les conditions de déroulement.", 1],
  ],
  // Q6 — C3 référentiel et autodiagnostic
  [
    ["La certification est exigée pour accéder aux fonds publics ou mutualisés (art. L.6316-1) ; le référentiel compte 7 critères et 33 indicateurs à compter du 1er novembre 2026.", 1],
    ["Le décret n° 2026-728 du 1er août 2026 complète l'indicateur 32 par une analyse des risques et crée un indicateur 33 propre aux CFA.", 1],
    ["Mon autodiagnostic : pour chaque indicateur, l'attendu, la preuve, l'écart et l'action datée.", 1],
    ["Les indicateurs non applicables, par exemple ceux des formations certifiantes ou de l'apprentissage, sont justifiés.", 1],
    ["Comme nouvel entrant, certains indicateurs de résultats seront vérifiés à l'audit de surveillance.", 1],
    ["Le critère 1 porte sur l'information du public : mon programme et mon site doivent être complets.", 1],
    ["Je connais les critères ; je dois encore compléter les preuves de la veille.", 0.5],
    ["L'indicateur 27 est étendu au portage salarial ; il ne me concerne pas.", 1],
    ["Je me réfère au guide de lecture publié par le ministère du Travail.", 1],
    ["J'ai identifié mes écarts ; le plan d'actions reste à dater.", 0.5],
    ["Mon organisme travaille avec des particuliers : la certification n'est pas obligatoire, mais je la vise pour me développer.", 1],
    ["Les critères 5 et 6 m'obligent à suivre les compétences de mes formateurs et l'environnement professionnel.", 1],
  ],
  // Q7 — C3 audit et non-conformités
  [
    ["Je choisis un organisme certificateur accrédité par le COFRAC ; audit initial, audit de surveillance entre le 14e et le 22e mois, renouvellement tous les trois ans.", 1],
    ["Une non-conformité mineure est corrigée et vérifiée à l'audit suivant ; une majeure doit être levée dans le délai fixé.", 1],
    ["Mes preuves sont classées par critère et par indicateur, et par session.", 1],
    ["Mon plan d'actions correctives indique la cause, l'action, le responsable, l'échéance et la preuve.", 1],
    ["J'ai préparé les questions probables de l'auditeur et les preuves qui y répondent.", 1],
    ["Je compare les organismes certificateurs sur le prix, les délais et la durée d'audit.", 1],
    ["Je sais préparer l'audit ; la qualification des écarts reste difficile pour moi.", 0.5],
    ["Chaque document est daté et versionné.", 1],
    ["J'ai vérifié la liste des organismes certificateurs, il me reste à demander des devis.", 0.5],
    ["L'absence totale de recueil des appréciations serait une non-conformité majeure.", 1],
    ["Je prépare un dossier par stagiaire pour l'audit.", 0.5],
    ["Le certificat est valable trois ans, sous réserve de l'audit de surveillance.", 1],
  ],
  // Q8 — C4 coût de revient, financement, commercialisation
  [
    ["Coût de revient de la session : 2 310 €, soit 385 € par stagiaire ; à 480 €, mon seuil de rentabilité est de 5 stagiaires.", 1],
    ["Le coût de revient comprend les coûts directs et une quote-part des frais fixes : assurance, logiciel, comptabilité, site.", 1],
    ["Financements : particulier à ses frais, entreprise sur son plan de développement des compétences, OPCO selon ses critères si je suis certifié{e}.", 1],
    ["Le compte personnel de formation reste une perspective : il faut une action inscrite aux répertoires nationaux et la certification qualité.", 1],
    ["Mon site indique SIRET, numéro de déclaration d'activité, CGV, programme, tarif, délai d'accès, accessibilité et contact.", 1],
    ["Je ne fais aucun démarchage pour le compte personnel de formation : il est interdit depuis la loi du 19 décembre 2022.", 1],
    ["Je calcule mes coûts ; mon positionnement commercial reste à affiner.", 0.5],
    ["Mon plan commercial sur trois mois a des cibles, des canaux, des actions datées et des indicateurs.", 1],
    ["Je ne publie aucun faux avis et je ne promets aucun financement non vérifié.", 1],
    ["Je connais les financements ; j'ai encore du mal à présenter leurs conditions aux clients.", 0.5],
    ["Mes devis indiquent l'intitulé, la durée, les dates, le prix et les conditions.", 1],
    ["J'ai relevé mon prix de 390 € à 480 € après le calcul du coût de revient.", 1],
  ],
  // Q9 — C5 gestion et BPF
  [
    ["Parcours : entretien, analyse des besoins, programme et devis, contrat, rétractation, convocation, émargement, évaluations, attestation, satisfaction, facture, archivage.", 1],
    ["Ma facture mentionne SIRET, numéro de déclaration d'activité, intitulé, dates, durée, prix, exonération de TVA et échéances.", 1],
    ["Le bilan pédagogique et financier se transmet chaque année en ligne sur Mon Activité Formation ; sinon la déclaration devient caduque.", 1],
    ["Dans le bilan pédagogique et financier, les produits figurent par origine de financement, les stagiaires et les heures-stagiaires dans les données pédagogiques.", 1],
    ["Mon tableau de bord suit les heures réalisées, le chiffre d'affaires facturé et encaissé, la trésorerie et la satisfaction.", 1],
    ["Registre des traitements, information des stagiaires, collecte limitée, accès restreint, durées de conservation définies.", 1],
    ["Je maîtrise le parcours ; le bilan pédagogique et financier me demandera encore de l'aide la première année.", 0.5],
    ["J'ai souscrit une assurance responsabilité civile professionnelle.", 0.5],
    ["Mes dossiers sont archivés par session, avec les émargements et les attestations.", 1],
    ["Ma trésorerie prévisionnelle tient compte de l'échéancier des particuliers.", 1],
    ["Le formateur indépendant apparaît dans les charges et les personnes extérieures du bilan.", 1],
    ["J'utilise un outil de gestion dont j'ai vérifié la protection des données.", 1],
  ],
  // Q10 — C6 pilotage et amélioration continue
  [
    ["Paul RENAUD intervient en contrat de prestation, sans lien de subordination ; je conserve son CV daté et signé et ses références.", 1],
    ["La réclamation est enregistrée, analysée, traitée par écrit, suivie d'une action corrective et tracée dans le registre.", 1],
    ["Mon tableau de pilotage suit la satisfaction, les abandons, l'atteinte des objectifs, les réclamations et la trésorerie.", 1],
    ["Mon plan d'amélioration intègre une analyse des risques : absence d'un formateur, salle indisponible, panne, stagiaire en difficulté.", 1],
    ["J'ai désigné un référent handicap et constitué un réseau de partenaires.", 1],
    ["Mes veilles légale, métier, technologique et handicap ont des sources, une fréquence et des traces.", 1],
    ["En sous-traitance, je vérifie que l'organisme partenaire respecte les exigences de qualité.", 1],
    ["Je sais piloter ; le plan de développement à un an reste à chiffrer.", 0.5],
    ["Les appréciations des stagiaires, des financeurs et des formateurs alimentent le plan d'amélioration.", 1],
    ["J'ai des indicateurs ; je dois encore fixer des cibles réalistes.", 0.5],
    ["Mes indicateurs publiés sont datés et calculés sur une période précisée.", 1],
    ["Mon plan de développement prévoit la certification qualité et un nouveau domaine de formation.", 1],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [48, 51, 45, 10, 4, 58, 45, 36, 47, 42];

export function getGSC35AutoAnswers(
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
export function gsc35NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6, soit 4 à 12/20). */
export function gsc35BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((gsc35NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `gsc35BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function gsc35ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = gsc35BonnesQcmDebut(n, idx, nom, prenom);
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
export function gsc35NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet, attentes, situation actuelle et apport attendu de la formation.
// Les stagiaires financent eux-mêmes leur formation : les « attentes » sont les leurs.
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
    besoin: "Créer mon organisme de formation en reconversion et réussir les démarches de déclaration d'activité.",
    objectif: "Je veux choisir mon statut, déposer ma déclaration d'activité au bon moment et démarrer avec des documents conformes.",
    projet: "Ouvrir d'ici six mois un organisme de formation en accueil et bureautique pour les salariés de TPE.",
    attentes: "J'attends une méthode pas à pas pour la création et des modèles de documents directement utilisables.",
    missions: "Quinze ans d'expérience en ressources humaines et en formation interne, aujourd'hui en reconversion.",
    contribution: "La formation doit me permettre de lancer mon activité sans erreur juridique dès le premier contrat.",
  },
  {
    besoin: "Structurer mon activité de formateur indépendant avec des programmes, des contrats et des tarifs conformes.",
    objectif: "Mon objectif est de disposer d'un programme, d'un contrat et de conditions générales de vente conformes pour chacune de mes formations.",
    projet: "Vendre directement mes formations en management plutôt que de passer uniquement par la sous-traitance.",
    attentes: "J'attends des trames de programme et de contrat et une relecture de mes documents actuels.",
    missions: "Formation en management et en communication interne, en micro-entreprise, pour des organismes et des entreprises.",
    contribution: "La formation doit sécuriser mes ventes directes et améliorer ma marge.",
  },
  {
    besoin: "Comprendre le référentiel national qualité et préparer l'audit initial Qualiopi de mon organisme.",
    objectif: "Je souhaite réaliser l'autodiagnostic de mon organisme et préparer un audit initial dans l'année.",
    projet: "Obtenir la certification qualité pour accéder aux financements des OPCO et de France Travail.",
    attentes: "J'attends une lecture claire des 33 indicateurs applicables à compter du 1er novembre 2026 et des exemples de preuves.",
    missions: "Direction d'un petit organisme de formation déclaré depuis deux ans, avec deux formateurs indépendants.",
    contribution: "La formation doit m'éviter des non-conformités majeures lors du premier audit.",
  },
  {
    besoin: "Calculer le coût de revient de mes formations et fixer des prix rentables.",
    objectif: "Mon objectif est de connaître le coût réel de chaque session et de fixer un prix qui dégage une marge.",
    projet: "Rendre mon organisme rentable dès la deuxième année d'activité.",
    attentes: "J'attends un outil de calcul du coût de revient et du seuil de rentabilité adapté à un petit organisme.",
    missions: "Formation en langues, organisme créé l'an dernier, résultat encore déficitaire.",
    contribution: "La formation doit m'aider à revoir mes tarifs sans perdre mes clients.",
  },
  {
    besoin: "Rédiger un contrat de formation conforme avec les particuliers qui financent eux-mêmes leur formation.",
    objectif: "Je veux appliquer correctement le délai de rétractation, les règles d'acompte et l'échéancier du solde.",
    projet: "Développer une offre destinée aux particuliers en reconversion.",
    attentes: "J'attends une trame de contrat de formation avec un particulier, commentée article par article.",
    missions: "Formation en relation client pour des particuliers, inscriptions gérées jusqu'ici par simple devis.",
    contribution: "La formation doit mettre mes inscriptions en conformité et éviter les litiges.",
  },
  {
    besoin: "Organiser la gestion administrative et financière de mon organisme et préparer mon bilan pédagogique et financier.",
    objectif: "Mon objectif est de mettre en place un parcours administratif complet et de remplir seul{e} mon bilan pédagogique et financier.",
    projet: "Gagner du temps sur l'administratif pour me consacrer à l'animation des formations.",
    attentes: "J'attends un tableau de bord simple et une explication des cadres du bilan pédagogique et financier.",
    missions: "Gestion d'un petit organisme de formation en informatique, factures et dossiers gérés au cas par cas.",
    contribution: "La formation doit fiabiliser ma facturation et mon archivage.",
  },
  {
    besoin: "Connaître les financements accessibles à mon offre et leurs conditions réelles.",
    objectif: "Je souhaite présenter à chaque client le financement qui lui correspond, sans promesse non vérifiée.",
    projet: "Diversifier mes clients : particuliers, entreprises, demandeurs d'emploi.",
    attentes: "J'attends une carte claire des financements et des conditions liées à la certification qualité.",
    missions: "Formation en vente et relation client, clientèle composée surtout de particuliers.",
    contribution: "La formation doit m'aider à élargir ma clientèle de façon loyale.",
  },
  {
    besoin: "Développer la communication et la prospection de mon organisme dans le respect des règles.",
    objectif: "Mon objectif est d'avoir un site conforme et un plan commercial sur trois mois.",
    projet: "Faire connaître mon organisme auprès des entreprises de mon département.",
    attentes: "J'attends la liste des mentions obligatoires du site et des exemples d'actions commerciales.",
    missions: "Ancienne activité commerciale, création récente d'un organisme de formation en vente.",
    contribution: "La formation doit transformer davantage de demandes en inscriptions.",
  },
  {
    besoin: "Travailler avec des formateurs indépendants et sous-traitants de façon sécurisée.",
    objectif: "Je veux rédiger des contrats de prestation et de sous-traitance clairs, avec les preuves attendues.",
    projet: "Étoffer mon équipe de trois intervenants pour couvrir de nouveaux domaines.",
    attentes: "J'attends des modèles de contrats et une méthode de vérification des compétences des formateurs.",
    missions: "Direction d'un organisme de formation en informatique, EURL, trois intervenants occasionnels.",
    contribution: "La formation doit sécuriser mes relations avec mes intervenants.",
  },
  {
    besoin: "Mettre en place l'amélioration continue : appréciations, réclamations, indicateurs et plan d'amélioration.",
    objectif: "Mon objectif est de disposer d'un tableau de pilotage et d'un plan d'amélioration avec analyse des risques.",
    projet: "Préparer l'audit de surveillance et améliorer la qualité de mes formations.",
    attentes: "J'attends des outils de suivi simples et des exemples d'analyse des risques.",
    missions: "Responsable pédagogique d'une association de formation aux savoirs de base.",
    contribution: "La formation doit rendre visible l'amélioration de nos actions.",
  },
  {
    besoin: "Comprendre le système de formation professionnelle et ses acteurs avant de me lancer.",
    objectif: "Je souhaite situer mon projet dans le système de formation et connaître le rôle de chaque acteur.",
    projet: "Valider la faisabilité de mon projet d'organisme de formation en anglais professionnel.",
    attentes: "J'attends une vision d'ensemble et des repères fiables pour décider.",
    missions: "Enseignement de l'anglais pendant dix ans, aujourd'hui porteur ou porteuse de projet.",
    contribution: "La formation doit m'aider à décider si je crée mon organisme cette année.",
  },
  {
    besoin: "Rédiger des programmes avec des objectifs opérationnels et évaluables.",
    objectif: "Mon objectif est de réécrire mes programmes pour qu'ils répondent aux attentes des clients et du référentiel.",
    projet: "Publier un catalogue de six formations sur mon site.",
    attentes: "J'attends une trame de programme et des exemples d'objectifs bien formulés.",
    missions: "Formation en communication et prise de parole, en sous-traitance pour deux organismes.",
    contribution: "La formation doit rendre mon catalogue plus lisible et plus crédible.",
  },
  {
    besoin: "Respecter les obligations légales de mon organisme et me préparer à un contrôle.",
    objectif: "Je veux établir le registre de mes obligations et classer mes preuves.",
    projet: "Être serein ou sereine en cas de contrôle de l'administration.",
    attentes: "J'attends une liste complète des obligations, des textes et des preuves à conserver.",
    missions: "Organisme de formation déclaré depuis un an, aucune procédure écrite à ce jour.",
    contribution: "La formation doit limiter mes risques juridiques et financiers.",
  },
  {
    besoin: "Ouvrir les formations d'une association au public et en structurer la gestion.",
    objectif: "Mon objectif est de doter l'association d'un cadre conforme pour vendre ses formations.",
    projet: "Déclarer l'activité de formation de l'association et proposer trois formations au public.",
    attentes: "J'attends des repères sur le statut associatif, la déclaration et la gestion.",
    missions: "Coordination bénévole d'une association qui forme ses membres depuis plusieurs années.",
    contribution: "La formation doit donner à l'association de nouvelles ressources.",
  },
  {
    besoin: "Accueillir les personnes en situation de handicap et organiser les veilles de mon organisme.",
    objectif: "Je souhaite organiser l'accessibilité de mes formations et des veilles régulières tracées.",
    projet: "Rendre toutes mes formations accessibles et devenir référent ou référente handicap de mon organisme.",
    attentes: "J'attends des outils pour l'accessibilité, le réseau de partenaires et la veille.",
    missions: "Formation en bureautique, public varié, aucune procédure d'adaptation formalisée.",
    contribution: "La formation doit améliorer l'accueil de tous mes stagiaires.",
  },
  {
    besoin: "Bâtir le plan de développement de mon organisme à un an.",
    objectif: "Mon objectif est de fixer mes priorités : offre, qualité, financements, partenariats.",
    projet: "Doubler le nombre de stagiaires accueillis en deux ans.",
    attentes: "J'attends un plan d'action daté avec des indicateurs.",
    missions: "Direction d'un organisme de formation en gestion et comptabilité pour les TPE, SASU.",
    contribution: "La formation doit me donner une feuille de route claire.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilGSC35(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

export function getGSC35Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return accorder(profilGSC35(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production écrite du stagiaire (cas fil rouge ou projet personnel)
// Indices : 0 diagnostic, 1 C1 statut et déclaration d'activité, 2 C1 obligations et contrôles,
//           3 C2 programme, 4 C2 contrat et convention, 5 C3 autodiagnostic Qualiopi,
//           6 C3 audit et non-conformités, 7 C4 coût de revient, financement et commercialisation,
//           8 C5 gestion administrative et BPF, 9 C6 pilotage et amélioration continue ;
//           8 productions par banque.
// La k-ième production de chaque banque suit le même projet : un stagiaire garde le même terrain
// d'un exercice à l'autre (organismes et chiffres fictifs).
//   0 reconversion, projet en accueil et bureautique, Évry-Courcouronnes · 1 formateur indépendant en
//   management, micro-entreprise, Versailles · 2 porteur de projet en anglais professionnel, Palaiseau
//   3 dirigeant d'une EURL de formation informatique, Créteil · 4 formatrice ou formateur indépendant
//   en communication, sous-traitant, Corbeil-Essonnes · 5 responsable d'une association de formation
//   aux savoirs de base, Melun · 6 ancien commercial, projet en vente et relation client, Orléans
//   7 dirigeant d'une SASU de formation en gestion pour les TPE, Étampes
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Diagnostic de départ
  [
    "Mon projet : en reconversion après quinze ans comme ancien{ne} assistant{e} RH, je veux créer à Évry-Courcouronnes un organisme de formation en accueil et bureautique pour les salariés de TPE et les particuliers. Démarches : aucune pour l'instant, ni statut ni déclaration d'activité. Clients visés : particuliers à leurs propres frais d'abord, entreprises ensuite. Risques : démarrer sans contrat conforme, sous-estimer mes coûts, ne pas conserver les pièces. Forces : expérience de la formation interne, réseau, organisation. Vigilance : cadre juridique, prix, temps de prospection. Mes priorités : statut et déclaration d'activité, programme et contrat conformes, calcul du prix.",
    "Je suis format{/rice} indépendant{e} en management depuis trois ans, en micro-entreprise à Versailles ; 70 % de mon activité passe par la sous-traitance pour deux organismes. Je suis déclaré{e}, mais mes programmes tiennent en une page sans objectifs évaluables et je fais signer un simple devis aux particuliers. Risques : contrat non conforme, prix trop bas en vente directe, absence de règlement intérieur. Forces : expertise, références clients, aisance en animation. Vigilance : documents, tarification, dépendance à la sous-traitance. Mes priorités : programmes et contrats conformes, coût de revient, plan de prospection.",
    "Porteur ou porteuse d'un projet en anglais professionnel à Palaiseau, je suis ancien{ne} enseignant{e} et je n'ai encore ni statut ni client. Public visé : salariés et particuliers, en petits groupes et en présentiel. Documents : aucun. Financements : je pensais que le compte personnel de formation financerait tout, ce qui n'est pas le cas pour une formation non inscrite aux répertoires nationaux. Risques : mauvais choix de statut, offre mal positionnée, attentes de financement irréalistes. Forces : pédagogie, maîtrise de la langue. Vigilance : réglementation, prix, prospection. Mes priorités : comprendre le système, choisir le statut, construire une première offre conforme.",
    "Dirigeant{e} d'une EURL de formation informatique à Créteil, déclarée depuis deux ans, avec trois formateurs indépendants occasionnels. Activité : 22 sessions par an, clients surtout des entreprises sur fonds propres. Démarches : déclaration faite, bilan pédagogique et financier transmis, mais aucune démarche qualité. Risques : contrats d'intervenants incomplets, preuves dispersées, perte de clients faute de certification. Forces : réseau d'entreprises, offre technique solide. Vigilance : qualité, pilotage, trésorerie. Mes priorités : autodiagnostic Qualiopi, contrats des intervenants, tableau de pilotage.",
    "Format{/rice} indépendant{e} en communication et prise de parole à Corbeil-Essonnes, je travaille en sous-traitance pour deux organismes certifiés qui me demandent de plus en plus de preuves. Je n'ai pas de déclaration d'activité propre. Risques : dépendance à deux donneurs d'ordre, preuves incomplètes, tarif journalier non calculé. Forces : savoir-faire, adaptabilité, retours positifs des stagiaires. Vigilance : contrat de sous-traitance, documents, prix. Mes priorités : comprendre les obligations du sous-traitant, calculer mon prix de journée, préparer une offre en direct.",
    "Responsable pédagogique bénévole d'une association de formation aux savoirs de base à Melun, je veux ouvrir nos formations au public. L'association forme ses membres depuis cinq ans sans déclaration d'activité. Risques : activité de formation non déclarée, absence de contrat, aucune règle d'archivage. Forces : équipe motivée, expérience pédagogique, partenaires locaux. Vigilance : statut associatif, gestion, accessibilité. Mes priorités : déclaration d'activité de l'association, programmes et contrats, gestion administrative.",
    "Ancien{ne} commercial{e} en reconversion, je prépare à Orléans un organisme de formation en vente et relation client. J'ai créé ma micro-entreprise mais je n'ai encore vendu aucune formation. Mes premiers contacts sont des particuliers et deux petites entreprises. Risques : promettre des financements, prospecter de façon trop insistante, fixer un prix au hasard. Forces : sens de la vente, réseau, connaissance du terrain. Vigilance : pratiques commerciales, contrats, qualité. Mes priorités : contrat conforme avec les particuliers, coût de revient et prix, plan de prospection loyal.",
    "Dirigeant{e} d'une SASU de formation en gestion et comptabilité pour les TPE à Étampes, je réalise une trentaine de sessions par an avec un intervenant extérieur. Démarches : déclaration et bilan pédagogique et financier à jour, première certification qualité en préparation. Risques : indicateurs de résultats non calculés, réclamations non tracées, trésorerie tendue en été. Forces : clientèle fidèle, expertise. Vigilance : amélioration continue, pilotage, temps disponible. Mes priorités : préparer l'audit, bâtir le tableau de pilotage, plan de développement.",
  ],
  // 1 — C1 statut et déclaration d'activité
  [
    "Pour Inès comme pour mon projet, je retiens l'entreprise individuelle au régime de la micro-entreprise pour démarrer : création simple, patrimoine professionnel séparé, plafonds à vérifier sur le site officiel. Mon activité relève de l'action de formation : objectif professionnel, programme, évaluation. Je déposerai la déclaration d'activité en ligne sur Mon Activité Formation dans les trois mois qui suivent mon premier contrat, avec sa copie, le programme, ma pièce d'identité et l'extrait de casier judiciaire ; le préfet de région a deux mois pour répondre. Le numéro portera la mention « cet enregistrement ne vaut pas agrément de l'État ». Caducité si le bilan pédagogique et financier n'est pas transmis ou ne montre aucune activité.",
    "Déjà en micro-entreprise, je garde ce statut tant que mon chiffre d'affaires reste sous les plafonds ; je comparerai avec une SASU si je recrute. Ma déclaration d'activité existe : j'ai vérifié qu'elle figure sur la liste publique des organismes de formation et que mes documents portent la mention obligatoire. Je dois déclarer à l'administration le changement d'adresse de mon activité. Je sais que la déclaration devient caduque sans bilan pédagogique et financier transmis.",
    "J'ai comparé les options : micro-entreprise pour tester l'activité, SASU si je m'associe à une autre formatrice ou un autre formateur, association exclue car mon projet est lucratif. Je vérifie que mes ateliers de conversation à visée professionnelle relèvent bien de l'action de formation. La déclaration d'activité se dépose après la signature de mon premier contrat, au plus tard dans les trois mois, sur Mon Activité Formation. La liste publique permettra à mes clients de me vérifier.",
    "Mon EURL est déclarée ; j'ai relu le dossier de déclaration d'activité de départ : copie de la première convention, programme, justificatifs des intervenants. J'ai ajouté la mention « ne vaut pas agrément de l'État » sur mes conventions, où elle manquait. Je garde l'EURL, adaptée à une équipe et à un futur associé. Pour la caducité, mon bilan pédagogique et financier annuel est suivi dans mon registre.",
    "Comme sous-traitant{e}, je n'étais pas obligé{e} de me déclarer tant que je n'avais pas de contrat ou de convention en direct ; dès ma première vente directe, je déposerai ma déclaration d'activité sur Mon Activité Formation dans les trois mois. Je reste en micro-entreprise. J'ai vérifié que mes interventions relèvent de l'action de formation et je préparerai les pièces : contrat, programme, titres et qualités.",
    "Pour l'association, le statut est déjà fixé ; la formation ouverte au public doit être déclarée. Nous déposerons la déclaration d'activité au nom de l'association, avec la copie de la première convention, le programme et les justificatifs des intervenants. Le numéro figurera sur nos documents avec la mention obligatoire. Le bureau désigne un responsable de la transmission du bilan pédagogique et financier pour éviter la caducité.",
    "J'ai choisi la micro-entreprise ; une SASU serait plus lourde pour un démarrage seul{e}. Mes formations en vente ont un objectif professionnel et une évaluation des acquis : ce sont des actions de formation. Je déposerai la déclaration d'activité sur Mon Activité Formation dans les trois mois suivant mon premier contrat ; réponse du préfet de région sous deux mois ; mention « ne vaut pas agrément de l'État » sur mon site et mes contrats.",
    "Ma SASU est déclarée ; j'ai vérifié sur la liste publique que la déclaration d'activité est active. Je déclare chaque modification : nouveau formateur, nouvelle adresse de formation. J'explique aux nouveaux clients que le numéro ne vaut pas agrément de l'État. Je surveille la transmission annuelle du bilan pédagogique et financier, condition du maintien de la déclaration.",
  ],
  // 2 — C1 obligations légales et contrôles
  [
    "Mon registre des obligations, sous forme de tableau : règlement intérieur remis avant l'entrée ; bilan pédagogique et financier chaque année ; comptabilité ; programme, contrat, convocation, émargements, attestation et facture archivés ; déclaration des modifications. Le règlement intérieur reprend l'hygiène, la sécurité, la discipline, les sanctions et les garanties de procédure. Exonération de TVA de l'article 261-4-4° du CGI sous réserve de l'attestation de l'administration, mention sur la facture. Contrôles des services régionaux de contrôle et de la Caisse des Dépôts ; sanctions : remboursement, versement au Trésor public, annulation de la déclaration.",
    "J'ai découvert que je n'avais pas de règlement intérieur : je l'ai rédigé à partir du modèle et je le remettrai avec chaque contrat. Mon registre précise pour chaque obligation le texte, l'échéance et la preuve. J'ai vérifié avec mon comptable mon exonération de TVA. En cas de contrôle, la procédure est contradictoire et je peux présenter mes observations.",
    "Pour mon futur organisme, le registre est prêt avant même le premier stagiaire : règlement intérieur, archivage, bilan pédagogique et financier, comptabilité. J'ai noté les sanctions possibles, dont l'obligation de rembourser les sommes non justifiées. La TVA : exonération possible sous conditions, que je vérifierai au moment de la déclaration.",
    "Dans mon EURL, le registre m'a montré deux manques : le règlement intérieur n'était pas remis aux stagiaires des sessions intra-entreprise et les émargements n'étaient pas tous archivés. J'ai corrigé les deux. Mes factures mentionnent l'exonération de TVA. J'ai préparé un dossier de contrôle type par session.",
    "En sous-traitance, c'est le règlement intérieur du donneur d'ordre qui s'applique ; pour mes ventes directes, j'aurai le mien. Mon registre distingue les deux situations. Je conserve mes propres preuves de réalisation. TVA : exonération à demander lors de ma déclaration, avec mention sur mes factures.",
    "Pour l'association, le registre attribue chaque obligation à un membre du bureau : règlement intérieur, bilan pédagogique et financier, comptabilité distincte de l'activité de formation, archivage. J'ai noté les contrôles possibles et leurs suites. L'exonération de TVA et la situation fiscale de l'association seront vérifiées avec un conseil.",
    "Mon registre des obligations tient sur une page et je le relis chaque mois. Le règlement intérieur est rédigé ; il s'applique à tous mes stagiaires. J'ai bien compris qu'un contrôle peut porter sur la réalité des formations et des dépenses : je garde toutes les pièces. Ma facture type comporte la mention d'exonération de TVA.",
    "Ma SASU applique déjà la plupart des obligations ; le registre m'a permis de dater chaque preuve. Le règlement intérieur est mis à jour, attestation de fin de formation complétée avec les résultats de l'évaluation. Les sanctions m'ont convaincu{e} de tracer davantage. J'ai vérifié que l'option pour la TVA n'était pas intéressante pour mes clients.",
  ],
  // 3 — C2 programme conforme
  [
    "Le brouillon d'Inès manquait d'objectifs évaluables, de public, de prérequis, de délai d'accès, d'évaluation, d'accessibilité et de tarif. Mes trois objectifs : accueillir un visiteur selon la procédure en moins de deux minutes ; traiter un appel entrant en reformulant la demande ; gérer un mécontentement avec la méthode vue en formation. Programme complet : public, prérequis, 21 h en présentiel, séquences, méthodes, positionnement, évaluation, délai d'accès intégrant la rétractation, tarif, référent handicap, contact. Indicateurs publiés : satisfaction, atteinte des objectifs, abandons.",
    "J'ai réécrit le programme de ma formation en management : trois objectifs opérationnels avec un critère de réussite, contenu par séquence, méthodes actives, évaluation par mise en situation. J'ai ajouté le délai d'accès, l'accessibilité et le contact. L'analyse des besoins adapte les cas pratiques au secteur des stagiaires.",
    "Pour l'anglais professionnel, mes objectifs sont formulés en situations : se présenter en réunion, rédiger un mail de relance, conduire un appel simple. Le positionnement à l'entrée fixe le groupe de niveau. Programme complet avec tarif clair et délai d'accès. Je publierai mes indicateurs dès la première année.",
    "Notre programme informatique avait des objectifs du type « découvrir Excel » : je les ai remplacés par des objectifs évaluables, par exemple « construire un tableau croisé dynamique à partir d'une base fournie ». J'ai complété les mentions manquantes. Les indicateurs de résultats seront publiés sur le site avec la période de calcul.",
    "Mon programme de prise de parole comporte désormais trois objectifs mesurables, un positionnement filmé et une évaluation finale par présentation. Prérequis, durée, modalités, délai d'accès, tarif et accessibilité sont indiqués. Les adaptations sont tracées après l'analyse des besoins.",
    "Pour l'association, chaque programme indique le public, les prérequis, les objectifs en situations de la vie professionnelle, la durée, le contenu, l'évaluation et le contact du référent handicap. Le délai d'accès tient compte des inscriptions individuelles. Indicateurs : satisfaction et atteinte des objectifs.",
    "Mon programme de vente : objectifs avec verbe d'action, contexte et critère, comme « conduire un entretien de découverte en posant cinq questions ouvertes ». Toutes les mentions y sont, dont le tarif et le délai d'accès. J'adapte les jeux de rôle au secteur de chaque stagiaire.",
    "J'ai revu mes programmes de gestion : objectifs évaluables, prérequis précis, évaluation par cas pratique. J'ai ajouté un encadré accessibilité et le contact. Mes indicateurs de résultats sont calculés sur l'année civile précédente et datés.",
  ],
  // 4 — C2 contrat et convention
  [
    "Leïla signe un contrat de formation professionnelle, la Société Vergers de l'Yvette une convention. Le contrat de Leïla reprend les mentions des articles L.6353-3 et L.6353-4. Délai de rétractation de dix jours par lettre recommandée ; rien n'est encaissé avant ; ensuite acompte de 30 % au plus, soit 252 € sur 840 €, et solde échelonné pendant la formation. En cas de force majeure, seules les prestations dispensées sont dues au prorata. Convention et CGV : annulation, report, absences. L'attestation va au stagiaire, le certificat de réalisation au financeur.",
    "Je remplace mon devis par un vrai contrat pour les particuliers, avec le délai de rétractation de dix jours et l'échéancier ; pour les entreprises, une convention. Mes CGV prévoient l'annulation et le report de façon équilibrée. Je remets le programme et le règlement intérieur avec chaque contrat.",
    "Pour mes futurs stagiaires particuliers, la trame de contrat est prête : objet, durée, effectif, prérequis, intervenants, prix, échéancier, abandon. La rétractation de dix jours fixe ma date d'entrée au plus tôt. Je n'encaisserai rien avant son expiration.",
    "Nos conventions entreprises étaient correctes ; il manquait un contrat pour les deux particuliers inscrits cette année. Je l'ai rédigé, avec la rétractation et l'acompte limité à 30 %. Les CGV ont été mises à jour sur l'annulation tardive. Attestation et certificat de réalisation distingués.",
    "En sous-traitance, je signe un contrat avec l'organisme donneur d'ordre ; pour mes ventes directes, contrat avec le particulier ou convention avec l'entreprise. J'ai repris la règle : pas de paiement pendant la rétractation, acompte plafonné, solde échelonné. Mes CGV couvrent l'absence et le report.",
    "L'association utilisera le contrat de formation professionnelle pour les personnes qui s'inscrivent elles-mêmes, avec dix jours de rétractation, et une convention pour les structures partenaires. Les tarifs solidaires figurent dans les CGV. L'attestation de fin de formation sera remise à chacun.",
    "Je ne demande plus le paiement à l'inscription : la rétractation de dix jours s'applique, puis 30 % d'acompte au plus. Mon contrat précise le prix et l'échéancier. Pour les deux entreprises, convention avec mes conditions d'annulation.",
    "Mes contrats particuliers sont revus : mentions complètes, rétractation, acompte et échéancier, clause d'abandon et de force majeure. Les conventions entreprises citent mon numéro de déclaration d'activité. L'attestation de fin de formation reprend les résultats de l'évaluation.",
  ],
  // 5 — C3 autodiagnostic Qualiopi
  [
    "La certification est exigée pour les fonds publics et mutualisés (art. L.6316-1) ; un organisme qui ne travaille qu'avec des particuliers n'y est pas tenu. 7 critères ; 33 indicateurs à compter du 1er novembre 2026 (décret n° 2026-728 du 1er août 2026) : analyse des risques à l'indicateur 32, indicateur 27 étendu au portage salarial, nouvel indicateur 33 pour les CFA. Mon autodiagnostic sur dix indicateurs : attendu, preuve, écart, action datée. Indicateurs non applicables justifiés. Comme nouvel entrant, certains indicateurs de résultats seront vérifiés en surveillance.",
    "Mon autodiagnostic montre trois écarts : pas d'analyse des besoins écrite, pas de veille tracée, pas de recueil des appréciations des entreprises. Pour chaque indicateur concerné, j'ai fixé l'action et la preuve. Je vise la certification pour pouvoir être financé{e} par les OPCO.",
    "Mon organisme n'existe pas encore : je ferai l'audit en tant que nouvel entrant. J'ai lu les 7 critères et repéré les indicateurs applicables à mes futures formations ; ceux des formations certifiantes et de l'apprentissage ne s'appliquent pas. Je constitue dès maintenant les preuves de veille.",
    "Pour l'EURL, l'autodiagnostic sur les 33 indicateurs fait apparaître des preuves solides sur les moyens, plus faibles sur l'amélioration continue. L'indicateur 32 et son analyse des risques sont mon chantier principal. Je me réfère au guide de lecture du ministère.",
    "En sous-traitance, mes donneurs d'ordre me demandent des preuves pour plusieurs indicateurs : CV, veille, développement de mes compétences. Mon autodiagnostic porte sur ces indicateurs ; je les classe pour chaque client.",
    "Pour l'association, l'autodiagnostic sert d'abord à décider : la certification est utile si nous voulons des financements publics. Les indicateurs sur l'accessibilité et l'environnement professionnel sont nos points forts ; la veille et le recueil des appréciations sont à construire.",
    "Mon autodiagnostic porte sur dix indicateurs du critère 1 au critère 7 ; pour chacun, la preuve existante ou à créer. J'ai noté que les indicateurs des CFA ne me concernent pas. Je vise la certification d'ici dix-huit mois.",
    "La SASU prépare sa première certification : autodiagnostic complet, preuves rassemblées, écarts sur la publication des indicateurs de résultats et sur l'analyse des risques. Plan d'actions daté avant l'audit initial.",
  ],
  // 6 — C3 audit et non-conformités
  [
    "Je choisis un organisme certificateur accrédité par le COFRAC après comparaison des devis et des délais. Cycle : audit initial, audit de surveillance entre le 14e et le 22e mois, renouvellement, certificat de trois ans. Preuves classées par critère et indicateur, et par session. L'absence de recueil des appréciations des financeurs est une non-conformité majeure si l'exigence n'est pas du tout prise en compte ; les CV non datés, une non-conformité mineure. Plan d'actions correctives : cause, action, responsable, échéance, preuve. Cinq questions de l'auditeur préparées avec leurs preuves.",
    "J'ai organisé mes preuves dans une arborescence par critère. Pour la non-conformité sur les CV, j'ai fait dater et signer ceux de mes intervenants. Pour le recueil des appréciations, j'ai créé un questionnaire envoyé aux entreprises clientes. Chaque action est datée.",
    "Je prépare l'audit initial comme nouvel entrant : liste de l'organisme certificateur, demande de devis, preuves de conception. Je sais qu'une non-conformité majeure doit être levée dans le délai fixé ; je préfère corriger avant l'audit.",
    "Lors de l'audit simulé, deux écarts : appréciations des financeurs non recueillies, non-conformité mineure car partielle ; CV non signés, mineure aussi. Plan d'actions avec responsable et échéance. J'ai préparé les réponses aux questions sur l'analyse des besoins et la veille.",
    "Comme sous-traitant{e}, je ne suis pas audité{e} directement, mais mes donneurs d'ordre peuvent l'être sur mes interventions. J'ai préparé un dossier de preuves par client. Je connais la différence entre non-conformité mineure et majeure.",
    "Pour l'association, j'ai préparé une arborescence de preuves et un calendrier : choix du certificateur, audit initial, puis surveillance. L'audit simulé a relevé une non-conformité sur la veille : action corrective, abonnement aux sources officielles et compte rendu trimestriel.",
    "J'ai classé mes premières preuves, daté chaque document et rédigé le plan d'actions correctives sur les deux écarts du cas : chaque non-conformité a sa cause, son action et son échéance. Mes réponses aux questions de l'auditeur s'appuient chacune sur une preuve. Je sais que le certificat dure trois ans.",
    "Pour la SASU, j'ai demandé trois devis à des certificateurs accrédités. L'audit blanc a relevé une non-conformité majeure sur les indicateurs de résultats non publiés ; corrigée avant l'audit. Les écarts mineurs sont suivis dans le plan d'amélioration.",
  ],
  // 7 — C4 coût de revient, financement et commercialisation
  [
    "Coût de revient : 420 + 1 260 + 90 + 540 = 2 310 € par session, soit 385 € par stagiaire pour 6. Prix proposé : 480 €, marge de 570 € ; seuil de rentabilité : 2 310 / 480 ≈ 4,8, donc 5 stagiaires. Financements : particulier à ses frais, entreprise sur son plan de développement des compétences, OPCO selon ses critères si l'organisme est certifié, France Travail et Région sous condition de certification, Agefiph selon ses critères ; compte personnel de formation en perspective seulement. Site : SIRET, numéro de déclaration, CGV, programme, tarif, délai, accessibilité, contact. Plan commercial loyal, sans démarchage pour le compte personnel de formation.",
    "Pour ma formation en management, le coût de revient d'une journée inclut ma rémunération, la salle, les supports et les frais fixes ; il dépasse mon tarif actuel de sous-traitance. En vente directe, je fixe un prix au-dessus du seuil de rentabilité. Plan commercial : réseau d'anciens clients, deux conférences, publications régulières, indicateurs de transformation.",
    "Mon coût de revient prévisionnel pour un groupe de 6 en anglais : salle, supports, quote-part des frais fixes et ma rémunération. Seuil de rentabilité : 5 stagiaires. Mes premiers clients seront des particuliers à leurs frais ; je ne promettrai aucun financement. Site conforme avec toutes les mentions.",
    "Coût de revient de nos sessions informatiques recalculé avec la location des postes ; deux formations étaient vendues à perte. Nouveaux prix fixés au-dessus du seuil de rentabilité. Plan commercial vers les entreprises du département, avec les OPCO comme perspective après la certification.",
    "J'ai calculé mon coût de revient journalier en tant que sous-traitant{e} : temps de préparation, déplacements, assurance, frais fixes. Mon tarif était trop bas. Pour mes ventes directes, prix argumenté et devis types. Prospection loyale, sans faux avis.",
    "Pour l'association, le coût de revient intègre la salle mise à disposition et les intervenants rémunérés ; le prix solidaire couvre au moins les coûts directs. Financements : particuliers, partenaires, aides publiques après certification. Le site de l'association portera les mentions obligatoires.",
    "Mon coût de revient sur une session de 6 : 2 310 € ; seuil de rentabilité à 5 stagiaires pour un prix de 480 €. En prospection, je présente les financements avec leurs vraies conditions et je refuse tout démarchage pour le compte personnel de formation. Plan sur trois mois : réseau, salons, réseaux sociaux, indicateurs.",
    "Pour la SASU, j'ai recalculé le coût de revient par formation et supprimé une remise systématique. Les financements visés sont les entreprises et, après certification, les OPCO. Plan commercial avec indicateurs de demandes, devis et inscriptions.",
  ],
  // 8 — C5 gestion administrative et BPF
  [
    "Parcours de Leïla : entretien, analyse des besoins, programme et devis, contrat, délai de rétractation, convocation avec règlement intérieur, émargement par demi-journée, évaluations, attestation, satisfaction, facture selon l'échéancier, archivage. Facture : SIRET, numéro de déclaration d'activité, intitulé, dates, durée, prix, mention d'exonération de TVA (art. 261-4-4° du CGI), échéances. Tableau de bord mensuel. Dans le bilan pédagogique et financier : produits par origine (particuliers, entreprises), 17 stagiaires et 455 heures-stagiaires dans les données pédagogiques, formateur indépendant dans les personnes extérieures ; transmission annuelle sur Mon Activité Formation. Archivage et protection des données organisés.",
    "Mon parcours administratif est désormais écrit, avec un responsable et un délai à chaque étape. Ma facture type est conforme. Pour le bilan pédagogique et financier, j'ai repéré où inscrire mes produits de sous-traitance et ceux des particuliers. Registre des traitements créé.",
    "Pour mon futur organisme, j'ai préparé la procédure du premier contact à l'archivage, la facture type et le tableau de bord. Le bilan pédagogique et financier sera à transmettre dès ma première année d'activité, en ligne, dans le délai fixé.",
    "Dans l'EURL, le bilan pédagogique et financier était rempli à la hâte ; j'ai repris les cadres avec les données de l'année : ressources par origine, stagiaires, heures, intervenants extérieurs. Tableau de bord mensuel et trésorerie prévisionnelle mis en place. Archivage par session.",
    "Pour mes ventes directes, procédure administrative complète et facture conforme ; pour la sous-traitance, je facture l'organisme donneur d'ordre. Mon bilan pédagogique et financier distinguera les deux. Protection des données : je ne garde que le nécessaire.",
    "Pour l'association, le trésorier tient le tableau de bord et la comptabilité distincte de la formation ; le bilan pédagogique et financier sera préparé avec lui. Archivage des dossiers dans une armoire fermée et un dossier numérique à accès limité.",
    "Mon parcours stagiaire est tracé ; ma facture mentionne l'exonération de TVA. Le tableau de bord suit les inscriptions, le chiffre d'affaires et la trésorerie. Je sais lire les cadres du bilan pédagogique et financier et la date de transmission est dans mon agenda.",
    "Pour la SASU, le bilan pédagogique et financier est prérempli à partir du tableau de bord tout au long de l'année. Assurance responsabilité civile professionnelle vérifiée. Règles de conservation et de protection des données écrites et communiquées au formateur.",
  ],
  // 9 — C6 pilotage et amélioration continue
  [
    "Paul RENAUD intervient en contrat de prestation, sans lien de subordination : objet, dates, programme, preuves attendues, rémunération, confidentialité, assurance, résiliation. Compétences vérifiées : CV daté et signé, références, observation en séance. Réclamation sur la salle : accusé de réception, analyse, réponse écrite, procédure de réservation, trace dans le registre. Tableau de pilotage : satisfaction, abandons, objectifs atteints, réclamations, trésorerie. Plan d'amélioration avec analyse des risques. Plan de développement à un an : certification, référent handicap, veilles organisées.",
    "Mon plan d'amélioration part des appréciations de mes stagiaires et de mes donneurs d'ordre. Je trace désormais chaque réclamation. Pour mes futurs intervenants, contrat de prestation type. Analyse des risques : mon absence pour maladie, une salle indisponible ; mesures de prévention notées.",
    "Mon organisme démarre : tableau de pilotage simple avec cinq indicateurs, registre des réclamations prêt, veilles organisées sur des sources officielles. Plan d'amélioration revu à chaque fin de session. Je serai moi-même référent{e} handicap, formé{e} et entouré{e} de partenaires.",
    "Pour l'EURL : contrats des trois intervenants repris, CV datés, plan de développement de leurs compétences. Tableau de pilotage mensuel. Plan d'amélioration avec analyse des risques : panne du matériel, absence d'un formateur, groupe hétérogène.",
    "Comme sous-traitant{e}, je participe à l'amélioration continue de mes donneurs d'ordre ; pour mon activité directe, j'ai mon propre registre des réclamations et mon plan d'amélioration. Je me forme chaque année et je garde la preuve de ma veille.",
    "L'association désigne un référent handicap et une personne chargée des réclamations. Tableau de pilotage trimestriel présenté au bureau. Plan d'amélioration avec analyse des risques : départ d'un bénévole, salle prêtée indisponible.",
    "Mon tableau de pilotage suit la satisfaction, les abandons et les réclamations ; le plan d'amélioration en tire des actions datées. Analyse des risques sur la qualité de mes formations faite. Plan de développement : premier intervenant extérieur dans un an.",
    "Pour la SASU, les indicateurs publiés sont datés ; le plan d'amélioration est revu chaque trimestre avec le formateur. Analyse des risques ajoutée conformément à l'indicateur 32. Plan de développement : nouvelle formation et partenariat avec un réseau d'entreprises.",
  ],
];

const BILANS_PERSONNELS = [
  "Ce travail m'a surtout appris à vérifier chaque règle à la source avant de l'appliquer.",
  "Le plus difficile a été de tenir dans le temps de l'atelier ; je reprendrai la fiche chez moi.",
  "J'ai comparé ma production avec le modèle fourni, ce qui m'a fait corriger deux oublis.",
  "Cette partie servira directement pour le dossier présenté à l'évaluation finale du jour 5.",
  "J'ai travaillé en binôme avec un autre stagiaire, ce qui m'a fait voir mon projet autrement.",
  "La correction de la formatrice m'a permis de repérer une erreur que je ne referai plus.",
  "J'avais des doutes sur ce sujet en arrivant, je me sens maintenant capable de le refaire seul{e}.",
  "Je me suis appuyé{e} sur les modèles de la boîte à outils, que je réutiliserai.",
  "Je n'ai pas eu le temps de finaliser la mise en forme, mais le fond est complet.",
  "J'ai posé une question pendant l'atelier, ce qui m'a évité de partir dans la mauvaise direction.",
  "Je vais appliquer cette méthode dès le lancement de mon activité.",
  "Je dois encore gagner en rapidité, mais la démarche est claire pour moi.",
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
    if (k === 1) return /registre|obligation|TVA|contr[ôo]le/i.test(t) ? 2 : 1;
    if (k === 2) return /contrat|convention|r[ée]tractation/i.test(t) ? 4 : 3;
    if (k === 3) return /audit|non-conformit/i.test(t) ? 6 : 5;
    if (k === 4) return 7;
    if (k === 5) return 8;
    return 9;
  }
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickGSC35ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isGSC35Formation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);
  const bloc = blocExercice(contexte || "", exerciceIdx);

  // Production tirée par permutation du rang du stagiaire, avec le même décalage pour toutes les
  // banques : un stagiaire garde le même projet d'un exercice à l'autre, et sur un groupe de
  // 8 stagiaires les 8 productions d'un même exercice sont toutes différentes. Le bilan personnel
  // change d'un exercice à l'autre. La structure du stagiaire est citée quand elle est renseignée.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[rang(stagiaireIdx, 3, pool.length)];
  const bilan = BILANS_PERSONNELS[rang(stagiaireIdx, bloc + 11, BILANS_PERSONNELS.length)];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai rattaché l'exercice à la situation de ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "Licence professionnelle Métiers de la gestion des ressources humaines ; quinze ans en ressources humaines",
  "Master en management des organisations ; consultant{e} puis format{/rice} indépendant{e}",
  "Licence de langues étrangères appliquées ; enseignant{e} d'anglais pendant dix ans",
  "BTS Services informatiques aux organisations ; technicien{ne} puis format{/rice} en informatique",
  "Licence d'information et communication ; chargé{e} de communication en entreprise",
  "Diplôme d'État de conseiller ou conseillère en économie sociale familiale",
  "BTS Négociation et digitalisation de la relation client ; dix ans de vente",
  "Diplôme de comptabilité et de gestion ; collaborat{/rice} de cabinet comptable",
  "BTS Support à l'action managériale ; assistant{e} de direction",
  "Baccalauréat professionnel Commerce, puis responsable de magasin",
  "Licence de sciences de l'éducation",
  "Master en ingénierie de la formation",
  "Titre professionnel de formateur ou formatrice professionnelle d'adultes",
  "BTS Gestion de la PME",
  "Licence d'économie-gestion",
  "Diplôme d'infirmier ou infirmière, reconversion vers la formation en prévention",
  "Baccalauréat général, puis quinze ans d'expérience en accueil et secrétariat",
  "DUT Gestion des entreprises et des administrations",
  "Master en droit social",
  "BTS Comptabilité et gestion",
  "Diplôme d'école de commerce",
  "CAP Esthétique, puis gérant{e} d'institut et intervenant{e} en formation",
  "Licence professionnelle Commerce et distribution",
  "Diplôme d'études supérieures obtenu à l'étranger, en cours de reconnaissance",
  "Aucun diplôme dans le domaine : vingt ans d'expérience comme dirigeant{e} de TPE",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant chaque journée hebdomadaire.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières loin de l'écran me conviennent.",
  "Non. Je porte des lunettes et j'apprécie une taille d'affichage suffisamment grande.",
  "Non, pas de handicap. Je suis peu à l'aise avec le tableur ; un binôme me rassurerait sur les calculs.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je souhaite seulement disposer des modèles en version numérique pour les reprendre.",
  "Non, aucune situation de handicap. J'ai besoin d'un peu de temps sur les textes juridiques, je m'y préparerai.",
  "Non. Je préfère avoir les supports en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté lors de l'entretien préalable.",
  "Non. Aucune situation de handicap ; je signalerai à la formatrice toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible une journée par semaine pendant cinq semaines, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, en salle de formation.",
  "J'ai bloqué le même jour chaque semaine pendant un mois (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) ; ce rythme me permet de continuer mes autres activités le reste de la semaine.",
  "Je suis disponible les cinq journées, une par semaine, de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>. J'apporterai les documents de mon projet à chaque séance.",
  "Je peux suivre les cinq journées hebdomadaires en présentiel, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible une journée par semaine sur le mois (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>) ; j'ai organisé la garde de mes enfants ces jours-là.",
  "Disponibilité complète sur les cinq journées réparties sur un mois (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Je viendrai en transports en commun.",
  "Un jour par semaine pendant cinq semaines, je suis disponible de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; je consulterai mes messages pendant les pauses seulement.",
  "Je suis disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> une journée par semaine. Je dois seulement partir à 16h45 lors d'une des séances, ce que je signalerai à l'avance.",
  "Je suivrai les cinq journées hebdomadaires en salle (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) et je retravaillerai mon dossier entre deux séances.",
  "Aucune contrainte sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, une journée par semaine pendant un mois. J'ai prévenu mes clients de mon indisponibilité ces jours-là.",
];

/** Réponses d'évaluation des besoins propres à la formation « Gérer son centre de formation – 35 h », différentes pour chaque stagiaire. */
export function getGSC35EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = gsc35Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilGSC35(idx, s.nom, s.prenom);
  const pick = (arr: string[], sel: number) => accorder(arr[rang(base, sel, arr.length)], fem);
  const ent = (txt: string) => accorder(txt, fem);
  const civilite = s.civilite === "Mme" ? "Madame" : s.civilite === "M." ? "Monsieur" : (s.civilite || "Madame");

  return {
    civilite,
    raisonSociale: hasEntreprise ? (s.entreprise as string) : "/",
    attentes: ent(profil.attentes),
    missions: ent(profil.missions),
    contribution: ent(profil.contribution),
    diplome: pick(BESOINS_DIPLOMES, 4),
    objectif: ent(profil.objectif),
    budget: "Formation financée à titre personnel, à mes propres frais, dans le cadre d'un contrat de formation professionnelle (art. L.6353-3 du Code du travail) : paiement après le délai de rétractation de dix jours, acompte limité à 30 % du prix, solde échelonné pendant la formation.",
    projetPro: ent(profil.projet),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
