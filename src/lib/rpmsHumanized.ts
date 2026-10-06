// ---------------------------------------------------------------------------
// TP Responsable de petite ou moyenne structure (RNCP38575) — moteur de réponses HUMANISÉES
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes
//     de l'employeur…), puis diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes : socle puis CP1 à CP9, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par compétence + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// ---------------------------------------------------------------------------

/**
 * Vrai pour la formation exemple RNCP38575 et toute formation portant l'intitulé officiel.
 * L'ancien exemple « Responsable de Petite et Moyenne Structure » garde son contenu d'origine :
 * seul l'intitulé officiel (« petite OU moyenne structure ») ou la mention du code déclenche ce moteur.
 */
export function isRPMSFormation(intitule?: string, code?: string): boolean {
  const t = (intitule || "").toLowerCase();
  if (t.includes("petite ou moyenne structure")) return true;
  const c = (code || "").toUpperCase().replace(/\s/g, "");
  return t.includes("rncp38575") && (c === "" || c === "RNCP38575");
}

const normalize = (s: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function rpmsSeed(nom?: string, prenom?: string): number {
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
  typeof idx === "number" && idx >= 0 ? idx : rpmsSeed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Ordre : socle, CP1, CP2, CP3, CP4, CP5, CP6, CP7, CP8, CP9
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle, 1 = juste.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — obligations du dirigeant
  [
    ["Je sais qu'il y a des obligations quand on a des salariés, mais je serais incapable de dire à partir de combien de personnes il faut un CSE.", 0],
    ["J'ai entendu parler de la facture électronique au travail, sans savoir quand ça devient obligatoire pour une petite entreprise.", 0],
    ["Je connais le document unique parce que mon responsable l'a mis à jour l'an dernier. Le reste, honnêtement, c'est flou.", 0.5],
    ["Je pense que ces règles concernent surtout les grandes entreprises. Je découvre qu'une PME est aussi concernée.", 0],
    ["Je connais l'index égalité de nom, je ne sais pas à partir de quel effectif il s'applique.", 0],
    ["Aucune idée précise. C'est justement la partie « dirigeant » que je viens chercher.", 0],
    ["Je crois que le CSE devient obligatoire à 50 salariés. Pour le reste je ne sais pas.", 0],
    ["Chez nous, on est 23 et il y a un CSE ; je n'ai jamais cherché à savoir à partir de quand c'était obligatoire.", 0],
    ["Je sais qu'il faut employer 6 % de travailleurs handicapés, sans savoir à partir de quel effectif.", 0.5],
    ["Notre expert-comptable nous a parlé de la facturation électronique pour 2026, mais je ne saurais pas expliquer ce qui change.", 0.5],
    ["CSE à partir de 11 salariés, ça je le sais. L'index égalité, je crois que c'est à partir de 50. Le reste, je le découvrirai.", 1],
    ["J'ai déjà rempli la DSN avec le cabinet comptable, mais je ne fais pas le lien avec des seuils d'effectif.", 0],
  ],
  // Q2 — CP1 diagnostic et veille
  [
    ["J'ai fait une SWOT en BTS, mais je confondais déjà les forces et les opportunités.", 0.5],
    ["PESTEL, je connais le mot. Je ne saurais pas remplir les six cases pour mon entreprise.", 0],
    ["La veille, chez nous, c'est le patron qui lit la presse professionnelle. Il n'y a rien d'organisé.", 0],
    ["Je regarde ce que font les concurrents sur Internet de temps en temps, sans méthode ni outil.", 0],
    ["Les forces de Porter, je n'en ai jamais entendu parler.", 0],
    ["Je sais faire un diagnostic « au feeling » : je vois ce qui ne va pas, mais je ne sais pas l'écrire de façon structurée.", 0],
    ["Une SWOT, c'est forces, faiblesses, opportunités, menaces. Je sais que les deux premières sont internes, je ne l'ai jamais fait sur un cas réel.", 1],
    ["J'ai déjà mis une alerte Google sur le nom de notre entreprise, c'est tout ce que je fais comme veille.", 0.5],
    ["Le diagnostic stratégique, pour moi, c'est regarder le chiffre d'affaires. Je ne vois pas trop ce qu'il y a d'autre.", 0],
    ["J'ai vu le PESTEL en cours : politique, économique, social, technologique… je ne me souviens plus des deux derniers.", 0.5],
    ["Je confonds un peu tous ces outils, je ne saurais pas dire lequel utiliser pour quelle question.", 0],
    ["Je lis les newsletters de notre fédération, mais je ne les partage avec personne et je n'en tire pas de décisions.", 0.5],
  ],
  // Q3 — CP2 territoire et visibilité
  [
    ["Je sais que la CCI existe, je ne sais pas vraiment ce qu'elle peut apporter à une entreprise comme la nôtre.", 0],
    ["Notre fiche Google a été créée il y a longtemps, les horaires ne sont même plus à jour.", 0],
    ["On a une page Facebook mais personne ne l'alimente. LinkedIn, on n'y est pas.", 0],
    ["Je ne connais pas les acteurs du territoire à part la mairie et France Travail.", 0],
    ["Le réseau, pour moi, c'est le carnet d'adresses du gérant. Je n'ai jamais participé à un club d'entreprises.", 0],
    ["Je ne sais pas ce qu'est le référencement local, ni comment on mesure la visibilité d'une entreprise.", 0],
    ["Je gère déjà la page Instagram de la boutique, mais je ne regarde jamais les statistiques.", 0.5],
    ["Je sais que la Région donne des aides aux entreprises, je ne saurais pas dire lesquelles ni comment les demander.", 0.5],
    ["Je connais la CMA parce que mon père est artisan. Pour une PME, je ne sais pas à qui s'adresser.", 0.5],
    ["Le SEO, c'est être bien placé sur Google. Je ne sais pas comment on fait concrètement.", 0.5],
    ["Nous avons participé à un salon il y a deux ans ; personne n'a suivi les contacts après.", 0],
    ["Je sais qu'il faut que le nom, l'adresse et le téléphone soient les mêmes partout sur Internet, j'ignore pourquoi.", 0.5],
  ],
  // Q4 — CP3 management
  [
    ["J'ai déjà encadré deux saisonniers, mais sans méthode : je leur montrais et je corrigeais au fur et à mesure.", 0.5],
    ["Je n'ai jamais recruté. Je ne sais pas ce qu'est une DPAE.", 0],
    ["Je connais le style directif et le style participatif. Je ne savais pas qu'il fallait adapter son style à chaque personne.", 0.5],
    ["Les conflits, j'ai tendance à les laisser se régler tout seuls. Je sais que ce n'est pas la bonne solution.", 0],
    ["Je fais des entretiens annuels avec mon équipe, mais je ne connais pas la différence avec l'entretien professionnel.", 0.5],
    ["En droit du travail, je connais les 35 heures et les congés payés, pas beaucoup plus.", 0],
    ["J'ai participé à des entretiens de recrutement avec ma responsable, je posais les questions qui me venaient.", 0],
    ["Je sais qu'il faut déclarer un salarié à l'URSSAF avant son arrivée ; je ne connais pas le délai.", 0.5],
    ["Je n'ai jamais managé personne, mais c'est souvent moi qui forme les nouveaux.", 0],
    ["L'intégration d'un nouveau, chez nous, c'est une journée avec un collègue. Ensuite il se débrouille.", 0],
    ["Je sais que l'entretien professionnel a lieu tous les deux ans et porte sur la formation ; je n'en ai jamais mené.", 1],
    ["Je suis plutôt à l'écoute, mais j'ai du mal à recadrer quelqu'un quand c'est nécessaire.", 0],
  ],
  // Q5 — CP4 offre et marché
  [
    ["Je pense qu'une étude de marché, c'est un questionnaire. Je ne savais pas qu'il y avait une partie qualitative.", 0.5],
    ["La segmentation, je l'ai vue en cours sans jamais l'appliquer à une vraie entreprise.", 0],
    ["Je connais les 4P. Les 7P, je ne savais pas que ça existait.", 0.5],
    ["Chez nous, le prix est fixé en regardant la concurrence. Je ne connais pas d'autre méthode.", 0.5],
    ["Le mot persona ne me dit rien.", 0],
    ["Je sais qui sont nos clients, mais je serais incapable de les classer en segments ou de dire lequel est prioritaire.", 0],
    ["Le positionnement, c'est l'image qu'on veut donner. Je ne saurais pas l'écrire en une phrase.", 0.5],
    ["Je calcule un prix en ajoutant une marge au coût d'achat ; je ne sais pas si c'est la bonne méthode.", 0.5],
    ["Je n'ai jamais lu d'étude de l'INSEE. Je ne sais pas où trouver des chiffres sur notre marché.", 0],
    ["Pour moi, l'offre, c'est le catalogue de produits. Je n'avais pas pensé au service autour.", 0],
    ["Je connais les critères socio-démographiques comme l'âge et le revenu ; les critères comportementaux, moins.", 0.5],
    ["Je ne vois pas comment estimer un chiffre d'affaires futur autrement qu'en ajoutant un pourcentage à l'année passée.", 0],
  ],
  // Q6 — CP5 diffusion commerciale
  [
    ["On n'a pas de plan d'actions commerciales écrit. On répond aux demandes qui arrivent.", 0],
    ["J'ai fait de la prospection téléphonique, sans script ni méthode de découverte.", 0.5],
    ["Je ne savais pas qu'il y avait des règles RGPD pour envoyer des e-mails commerciaux.", 0],
    ["Nous avons un CRM mais il est mal rempli, donc personne ne s'en sert vraiment.", 0.5],
    ["Je connais le NPS de nom, je ne sais pas le calculer.", 0],
    ["Les objectifs SMART, je sais ce que veut dire l'acronyme, je n'en ai jamais rédigé pour de vrai.", 0.5],
    ["Je suis les ventes dans un fichier Excel, sans indicateurs particuliers.", 0],
    ["Je fais du porte-à-porte chez les commerçants du quartier pour présenter nos services ; je ne note pas les résultats.", 0.5],
    ["Le tunnel de conversion, je l'ai vu dans une vidéo sur le e-commerce, je ne sais pas l'appliquer à du B2B.", 0],
    ["La fidélisation, chez nous, c'est une carte de fidélité. Je n'ai jamais mesuré la satisfaction.", 0],
    ["Je sais qu'un e-mail de prospection doit contenir un lien de désinscription, le reste du RGPD je ne le connais pas.", 0.5],
    ["Nous n'avons pas d'objectifs chiffrés : le gérant dit seulement qu'il faut « faire mieux que l'an dernier ».", 0],
  ],
  // Q7 — CP6 production
  [
    ["Je ne connais pas le TRS. Chez nous, on parle seulement de retards et de commandes en attente.", 0],
    ["La méthode ABC, je l'ai vue en logistique, sans faire le lien avec les ruptures de stock.", 0.5],
    ["Le planning est sur un tableau blanc. Gantt, je connais de nom.", 0],
    ["Je connais la roue de Deming, j'aurais du mal à l'appliquer à un vrai problème.", 0.5],
    ["Le 5S, je ne sais pas ce que c'est.", 0],
    ["Pour la qualité, on traite les réclamations au cas par cas, sans chercher la cause racine.", 0],
    ["J'ai fait un inventaire de fin d'année, c'est mon seul contact avec la gestion des stocks.", 0],
    ["Je sais ce qu'est un Kanban parce que l'équipe l'utilise sur un tableau Trello ; je ne connais pas le reste du Lean.", 0.5],
    ["Le diagramme d'Ishikawa, c'est l'arête de poisson ; je ne me rappelle plus les catégories.", 0.5],
    ["Chez nous, quand une machine tombe en panne, on appelle le dépanneur ; il n'y a pas de maintenance préventive.", 0],
    ["ISO 9001, je sais que c'est une norme qualité, je ne sais pas ce qu'elle demande.", 0.5],
    ["Je n'ai jamais travaillé en production, je suis plutôt côté commercial. Tout est nouveau pour moi.", 0],
  ],
  // Q8 — CP7 bilan
  [
    ["Je sais que le bilan, c'est l'actif et le passif. Je ne saurais pas l'interpréter.", 0.5],
    ["Le BFR, j'en ai entendu parler sans comprendre pourquoi il pèse sur la trésorerie.", 0],
    ["Je confonds encore le bilan et le compte de résultat.", 0],
    ["Je n'ai jamais vu le bilan de mon entreprise d'accueil, c'est le comptable qui s'en occupe.", 0],
    ["Je sais qu'une entreprise peut gagner de l'argent et manquer de trésorerie, je ne sais pas l'expliquer.", 0.5],
    ["Les ratios financiers, je ne connais que le taux d'endettement, et encore approximativement.", 0.5],
    ["Le fonds de roulement, je crois que c'est l'argent disponible sur le compte en banque.", 0],
    ["J'ai suivi les relances clients en stage, je sais que des clients qui paient tard posent problème, sans le chiffrer.", 0.5],
    ["L'actif, c'est ce que l'entreprise possède, le passif ce qu'elle doit. Je n'irais pas plus loin.", 0.5],
    ["Je ne sais pas lire une liasse fiscale, les numéros de lignes me perdent.", 0],
    ["Je sais que les amortissements existent, je ne sais pas où ils apparaissent dans le bilan.", 0],
    ["Le BFR, c'est le besoin de financer les stocks et les créances clients moins ce qu'on doit aux fournisseurs ; je n'ai jamais fait le calcul.", 1],
  ],
  // Q9 — CP8 compte de résultat
  [
    ["Je sais calculer une marge simple. La valeur ajoutée et l'EBE, je ne saurais pas.", 0.5],
    ["Le seuil de rentabilité, je comprends l'idée mais je n'ai jamais fait le calcul.", 0.5],
    ["La CAF, je ne sais pas ce que c'est.", 0],
    ["Je ne sais pas faire la différence entre une charge fixe et une charge variable dans un vrai compte de résultat.", 0],
    ["Je regarde le chiffre d'affaires et le résultat, rien entre les deux.", 0],
    ["Les soldes intermédiaires de gestion, je les ai vus en cours, j'ai tout oublié.", 0],
    ["Le seuil de rentabilité, c'est le chiffre d'affaires à partir duquel on ne perd plus d'argent ; je ne connais pas la formule.", 0.5],
    ["Je sais que le loyer est une charge fixe et les achats de marchandises une charge variable.", 0.5],
    ["L'EBE, je l'entends en réunion avec le banquier, je ne sais pas comment il est calculé.", 0],
    ["Je pense que le résultat, c'est ce qui reste sur le compte en fin d'année.", 0],
    ["Je sais calculer un taux de marge sur un produit, je n'ai jamais raisonné sur toute l'entreprise.", 0.5],
    ["Le point mort, je ne connais pas ce terme.", 0],
  ],
  // Q10 — CP9 rapport d'activité
  [
    ["Je n'ai jamais rédigé de rapport d'activité. Chez nous, il n'en existe pas.", 0],
    ["La RSE, pour moi, c'est surtout le tri des déchets. Je ne savais pas qu'il y avait un volet social.", 0.5],
    ["Je ne connais pas les indicateurs sociaux à publier.", 0],
    ["J'ai déjà présenté des chiffres en réunion, mais avec un tableau Excel brut, sans graphique.", 0.5],
    ["La CSRD, je ne sais pas si elle concerne une PME.", 0],
    ["Je suis à l'aise à l'oral, mais je ne saurais pas structurer un rapport de plusieurs pages.", 0],
    ["J'ai rédigé des comptes rendus de réunion, jamais un document destiné aux associés.", 0.5],
    ["Je fais des graphiques sur Excel, mais je ne sais pas lesquels choisir pour quels chiffres.", 0.5],
    ["Le bilan carbone, je ne sais pas comment on le calcule ni si une PME doit le faire.", 0],
    ["Pour moi, la RSE est un sujet de grands groupes. Je ne vois pas ce qu'une petite structure peut écrire.", 0],
    ["Je prépare les diapositives de la réunion mensuelle, souvent trop chargées d'après mon responsable.", 0.5],
    ["Je sais que la RSE couvre l'environnement, le social et le sociétal ; je ne saurais pas quoi mettre dans chaque partie.", 1],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["CSE dès 11 salariés pendant 12 mois consécutifs, DUERP dès le premier salarié, index égalité dès 50 salariés, obligation d'emploi de 6 % de travailleurs handicapés dès 20 salariés. Pour la facturation électronique, la réception est obligatoire depuis le 1er septembre 2026 et l'émission le sera pour les PME au 1er septembre 2027.", 1],
    ["J'ai construit le tableau des obligations de ma structure avec le seuil, l'échéance et la preuve à conserver. Nous avons choisi une plateforme agréée pour la facture électronique.", 1],
    ["Je sais que la CSRD ne nous concerne pas directement depuis la directive Omnibus, mais que nos gros clients nous envoient des questionnaires RSE : je prépare les réponses.", 1],
    ["Le DUERP est mis à jour chaque année à partir de 11 salariés et à chaque changement important ; je sais qu'il se conserve 40 ans.", 1],
    ["Je repère maintenant les seuils d'effectif qui déclenchent une obligation et je les anticipe avant de recruter.", 0.5],
    ["J'ai désigné un responsable par obligation dans le planning de la structure, avec une alerte avant chaque échéance.", 0.5],
    ["Pour la structure de 27 salariés où je suis, j'ai vérifié : CSE oui, DUERP oui, emploi de travailleurs handicapés oui (1 bénéficiaire à employer), index égalité non, CSRD non.", 1],
    ["La facture électronique se fait par une plateforme agréée ; il faut aussi l'e-reporting pour les ventes aux particuliers et à l'international.", 1],
    ["J'ai appris que l'index égalité se publie au 1er mars et seulement à partir de 50 salariés ; avant, on peut le calculer volontairement.", 1],
    ["L'obligation d'emploi de travailleurs handicapés se déclare dans la DSN ; à défaut d'emploi direct, il y a une contribution.", 1],
    ["CSE dès 11 salariés, index égalité dès 50 ; je dois encore revoir le calendrier exact de la facturation électronique.", 0.5],
    ["J'ai présenté à mon responsable les obligations qui arriveront si nous passons le seuil de 50 salariés : index égalité, attributions élargies du CSE.", 1],
  ],
  [
    ["PESTEL pour le macro-environnement, SWOT pour croiser interne et externe, Porter pour l'attractivité du secteur. Je ne confonds plus forces et opportunités : une force est interne, une opportunité externe.", 1],
    ["J'ai mis en place une veille avec Google Alerts et Feedly sur cinq sources : INSEE, CCI, fédération, BODACC et INPI. Une synthèse part chaque mois en réunion de direction.", 1],
    ["Mon diagnostic de l'entreprise d'accueil a débouché sur quatre recommandations, chacune reliée à un constat précis.", 1],
    ["La veille n'a d'intérêt que si elle est exploitée : chaque information retenue est rattachée à une décision ou à une action.", 0.5],
    ["J'ai appliqué les 5 forces de Porter à notre secteur : le pouvoir des clients est fort, celui des fournisseurs moyen, la menace des entrants faible.", 1],
    ["Je sais aussi intégrer la sécurité numérique au diagnostic : sauvegardes, accès, RGPD, avec la responsabilité du dirigeant en cas d'incident.", 0.5],
    ["Je commence par le PESTEL, puis la SWOT, puis la chaîne de valeur pour voir où l'entreprise crée vraiment sa valeur.", 1],
    ["Je relis chaque facteur de la SWOT en me demandant : est-ce qu'on le maîtrise ? Si oui c'est interne, sinon externe.", 1],
    ["Le BODACC me sert à suivre les créations, les redressements et les cessions chez les concurrents et les clients.", 1],
    ["La veille est confiée à une personne nommée, avec une fréquence et un support de diffusion ; sinon elle s'arrête au bout de deux mois.", 1],
    ["Je sais faire le PESTEL et la SWOT ; Porter, je le maîtrise moins bien pour noter chaque force.", 0.5],
    ["J'ai présenté mon diagnostic en réunion : la dépendance à trois clients ressort comme la principale faiblesse.", 1],
  ],
  [
    ["J'ai cartographié les acteurs : préfecture, DREETS, Région, EPCI, CCI, CMA, Bpifrance, France Travail, avec ce que chacun peut apporter à l'entreprise.", 1],
    ["Fiche Google mise à jour, NAP identique partout, page LinkedIn créée : les appels issus de la fiche ont augmenté en trois mois.", 1],
    ["J'ai bâti un plan de visibilité sur six mois avec un budget et cinq indicateurs suivis chaque mois.", 1],
    ["Nous avons adhéré à un club d'entreprises et noué un partenariat avec un CFA du secteur pour recruter des alternants.", 0.5],
    ["Je sais mesurer la visibilité locale : vues de la fiche, demandes d'itinéraire, appels, leads et abonnés.", 1],
    ["J'ai présenté à mon responsable trois partenariats possibles, chacun avec un bénéfice pour les deux parties.", 0.5],
    ["La CCI pour les formalités et les ateliers, la Région pour les aides à l'investissement, Bpifrance pour le financement, France Travail pour le recrutement.", 1],
    ["Le SEO local repose sur la fiche Google, les avis clients, des mots-clés avec la ville et la cohérence du NAP.", 1],
    ["J'ai répondu à tous les avis Google de l'entreprise, y compris les négatifs, avec une réponse type adaptée à chaque cas.", 0.5],
    ["J'ai daté huit actions de terrain sur l'année : salon, afterworks, forum emploi, portes ouvertes.", 1],
    ["Un partenariat doit apporter quelque chose aux deux parties, sinon il ne dure pas ; je l'écris noir sur blanc dans la proposition.", 1],
    ["Je connais les acteurs institutionnels ; je dois encore progresser sur le chiffrage du budget de visibilité.", 0.5],
  ],
  [
    ["Recrutement : fiche de poste, sourcing multicanal, entretien STAR identique pour tous, DPAE dans les 8 jours avant l'embauche, onboarding sur 90 jours.", 1],
    ["J'adapte mon style à la maturité de chaque collaborateur : directif avec un débutant, délégatif avec quelqu'un d'autonome.", 1],
    ["Face à un conflit, je reçois chaque personne séparément, puis je fais une médiation avec la méthode DESC et je fixe un suivi à J+15 et J+30.", 1],
    ["Je distingue l'entretien annuel, centré sur les objectifs, de l'entretien professionnel, centré sur le parcours et la formation.", 1],
    ["Je connais les bases du droit du travail du dirigeant : contrats, durée du travail, heures supplémentaires, repos, CSE, DUERP.", 0.5],
    ["J'ai construit un plan managérial avec des rituels, des entretiens individuels et un baromètre QVCT.", 1],
    ["La grille STAR fait décrire une situation vécue : situation, tâche, action, résultat. Les mêmes questions pour tous les candidats.", 1],
    ["J'ai organisé l'arrivée d'une nouvelle collègue : poste prêt à J1, binôme la première semaine, point à un mois, bilan avant la fin de la période d'essai.", 1],
    ["Un Ishikawa sur le turnover m'a montré que la cause principale était le manque de perspectives, pas le salaire.", 1],
    ["Dans une entreprise d'au moins 50 salariés, l'absence d'entretiens professionnels coûte 3 000 € d'abondement CPF par salarié concerné.", 1],
    ["Je sais mener un recrutement de bout en bout ; la gestion des conflits reste l'exercice où je suis le moins à l'aise.", 0.5],
    ["Je fais un point individuel mensuel avec chaque membre de l'équipe ; les sujets sont notés et suivis d'une fois sur l'autre.", 1],
  ],
  [
    ["Une étude de marché combine du quantitatif (questionnaire, données INSEE) et du qualitatif (entretiens, observation).", 1],
    ["J'ai segmenté nos clients en trois segments, retenu une cible prioritaire avec la matrice attractivité × accessibilité et rédigé deux personas.", 1],
    ["J'ai construit le mix 7P de notre offre, avec trois actions par P.", 1],
    ["Je connais trois méthodes de fixation du prix : coût majoré, valeur perçue et alignement sur le marché.", 1],
    ["Notre formule de positionnement précise la cible, la catégorie, le bénéfice et ce qui nous différencie.", 1],
    ["J'ai estimé le CA additionnel en multipliant la taille de la cible par le taux de pénétration visé et le panier moyen.", 0.5],
    ["Les 7P ajoutent aux 4P le personnel, les processus et la preuve physique : pour une entreprise de services, ce sont souvent eux qui font la différence.", 1],
    ["Un persona, c'est un client type avec un prénom, un métier, des objectifs, des freins et un parcours d'achat ; je les construis à partir d'entretiens réels.", 1],
    ["J'utilise aussi la segmentation RFM sur notre fichier clients : récence, fréquence, montant.", 1],
    ["Je vérifie qu'un prix couvre le coût complet, puis je le compare à la valeur perçue par le client et aux prix du marché.", 1],
    ["Je sais segmenter et rédiger un persona ; l'estimation du chiffre d'affaires additionnel me demande encore l'aide du formateur.", 0.5],
    ["J'ai mené six entretiens clients ; ils ont fait apparaître un besoin de service après-vente que le questionnaire n'avait pas montré.", 1],
  ],
  [
    ["J'ai rédigé un plan d'actions commerciales sur douze mois avec quatre objectifs SMART, un calendrier et des indicateurs mensuels.", 1],
    ["En prospection téléphonique j'utilise la méthode BEBEDC pour qualifier le besoin.", 1],
    ["En B2B, l'e-mail de prospection doit être en lien avec la fonction du destinataire et comporter un lien de désinscription.", 1],
    ["Nous suivons l'entonnoir dans le CRM, des suspects jusqu'aux clients gagnés, avec un taux de transformation autour de 25 %.", 1],
    ["Je calcule le NPS : pourcentage de promoteurs moins pourcentage de détracteurs.", 1],
    ["J'ai mis en place un tableau de bord commercial de dix indicateurs revu chaque mois avec l'équipe.", 0.5],
    ["BEBEDC : besoin, enjeux, budget, échéance, décideurs, concurrence. Je ne fais pas de devis tant que ces six points ne sont pas clairs.", 1],
    ["Les promoteurs notent 9 ou 10, les détracteurs de 0 à 6 ; un NPS de +30 est déjà correct dans notre secteur.", 1],
    ["J'ai vérifié que la somme de nos quatre objectifs SMART redonnait bien l'objectif global de chiffre d'affaires.", 1],
    ["Je traite les réclamations avec la méthode CRAC : calmer, reformuler, agir, conclure.", 1],
    ["Le PAC est rédigé, mais le CRM reste mal rempli par l'équipe ; c'est mon prochain chantier.", 0.5],
    ["Sur LinkedIn, je publie une fois par semaine et je contacte les décideurs après une interaction, pas à froid.", 1],
  ],
  [
    ["TRS = disponibilité × performance × qualité ; 62 % est faible, la cible courante est autour de 85 %.", 1],
    ["J'utilise la méthode ABC pour concentrer le suivi sur les références A, et la formule de Wilson pour la quantité économique de commande.", 1],
    ["Le planning de production est passé du tableau blanc à un Gantt partagé, avec le chemin critique identifié.", 1],
    ["J'ai mené un chantier 5S sur huit semaines dans l'atelier : trier, ranger, nettoyer, standardiser, respecter.", 1],
    ["Pour un problème qualité, je fais un Ishikawa 5M puis les 5 Pourquoi jusqu'à la cause racine, et je suis l'action avec un PDCA.", 1],
    ["J'intègre la sécurité et l'environnement : DUERP, EPI, tri des cinq flux et bilan carbone simplifié.", 0.5],
    ["La VSM fait apparaître le flux matière et le flux d'information ; c'est elle qui m'a montré le goulet au contrôle final.", 1],
    ["Wilson : Q* = racine de (2 × demande × coût de commande / coût de possession) ; je l'applique seulement aux références A.", 1],
    ["Un PDCA sans indicateur ne sert à rien : à chaque action j'associe un indicateur et une date de vérification.", 1],
    ["ISO 9001 demande 12 à 18 mois ; c'est utile si nos clients l'exigent, sinon une démarche qualité interne suffit dans un premier temps.", 1],
    ["Je maîtrise le 5S et le PDCA ; le calcul du TRS me pose encore des difficultés sur la partie performance.", 0.5],
    ["Dans une entreprise de services, j'applique les mêmes outils aux interventions : planning, délais, réclamations, causes racines.", 1],
  ],
  [
    ["FR = ressources stables − emplois stables ; BFR = stocks + créances − dettes d'exploitation ; trésorerie nette = FR − BFR.", 1],
    ["Une entreprise rentable peut manquer de trésorerie si son BFR dépasse son fonds de roulement : c'est ce que j'ai montré sur le cas BTP.", 1],
    ["Je calcule les ratios d'autonomie, d'indépendance, d'endettement et les délais clients et fournisseurs, et je les compare aux normes.", 1],
    ["Je sais que le délai de paiement entre professionnels est plafonné à 60 jours et je le vérifie dans l'analyse.", 1],
    ["J'ai analysé le bilan de mon entreprise d'accueil avec le comptable et proposé trois préconisations.", 0.5],
    ["En cas de cessation de paiement, le dirigeant a 45 jours pour la déclarer ; les procédures amiables existent avant.", 1],
    ["Je contrôle toujours la trésorerie nette de deux façons : FR − BFR, et disponibilités moins concours bancaires.", 1],
    ["Délai clients = créances TTC / CA TTC × 360 ; sur le cas BTP, 74 jours, bien au-delà de ce qui est souhaitable.", 1],
    ["Pour réduire le BFR : relancer les clients, demander des acomptes, réduire les stocks, sans payer les fournisseurs au-delà de 60 jours.", 1],
    ["Un découvert permanent qui finance le BFR est un signal d'alerte : je propose un prêt à moyen terme pour le consolider.", 1],
    ["Je sais calculer FR, BFR et trésorerie ; l'interprétation des ratios d'endettement reste à consolider.", 0.5],
    ["J'exprime le BFR en jours de chiffre d'affaires pour le rendre parlant au dirigeant.", 1],
  ],
  [
    ["Je calcule les SIG dans l'ordre : marge commerciale, production, valeur ajoutée, EBE, résultat d'exploitation, résultat courant, résultat net.", 1],
    ["La CAF se calcule par la méthode additive, à partir du résultat net, ou soustractive, à partir de l'EBE ; les deux doivent donner le même montant.", 1],
    ["Seuil de rentabilité = charges fixes / taux de marge sur coût variable ; le point mort donne la date à laquelle il est atteint.", 1],
    ["J'ai montré sur le cas de services que le CA progressait de 9 % mais l'EBE de seulement 2 % : les charges augmentent plus vite que l'activité.", 1],
    ["Je sépare charges fixes et variables pour raisonner en marge sur coût variable.", 0.5],
    ["J'ai calculé le seuil de rentabilité de mon entreprise d'accueil et proposé un suivi mensuel.", 0.5],
    ["L'EBE mesure ce que dégage l'exploitation avant amortissements et financement ; c'est l'indicateur que regarde le banquier.", 1],
    ["Je n'oublie plus la variation de stocks dans les consommations : c'est l'erreur que j'avais faite au premier exercice.", 1],
    ["Un point mort au 325e jour veut dire que l'entreprise ne gagne de l'argent qu'en décembre : la marge de sécurité est faible.", 1],
    ["La part du personnel dans la valeur ajoutée, 73,7 % sur le cas, montre que la productivité est le premier levier.", 1],
    ["Je sais calculer les SIG ; la CAF par la méthode soustractive me demande encore de vérifier chaque ligne.", 0.5],
    ["Je présente le seuil de rentabilité sous forme de graphique pour que l'équipe le comprenne.", 1],
  ],
  [
    ["Mon rapport d'activité suit le plan type : mot du dirigeant, présentation, activité, performance financière, RSE, perspectives, annexes.", 1],
    ["Le volet RSE couvre l'environnement, le social et le sociétal, en respectant les seuils réellement applicables à la structure.", 1],
    ["Je présente huit indicateurs sur trois exercices avec des graphiques lisibles.", 1],
    ["Je sais qu'une PME de moins de 250 salariés n'est soumise ni à la DPEF ni à la CSRD : son volet RSE est volontaire ou demandé par ses clients.", 1],
    ["J'ai préparé douze diapositives avec la règle 6×6 et anticipé les questions sensibles.", 1],
    ["J'ai rédigé le mot du dirigeant en une page : vision, faits marquants, perspectives.", 0.5],
    ["Un graphique par message : courbe pour une évolution, barres pour comparer, jamais de camembert à plus de cinq parts.", 1],
    ["Le bilan carbone simplifié distingue les scopes 1, 2 et 3 ; pour une PME, le scope 3 (achats, déplacements) pèse souvent le plus.", 1],
    ["Le volet social reprend l'effectif, la formation, les taux de fréquence et de gravité des accidents et l'emploi de travailleurs handicapés.", 1],
    ["Je prépare les questions difficiles avant l'assemblée : écarts au prévisionnel, départs, litiges.", 1],
    ["Je sais construire le plan et les indicateurs ; la rédaction du volet sociétal me prend encore beaucoup de temps.", 0.5],
    ["Les perspectives sont chiffrées sur trois axes, avec les moyens nécessaires pour chacun.", 1],
  ],
];

export function getRPMSAutoAnswers(
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
    const [txt, score] = pool[rang(base, q + (isDebut ? 0 : 5), pool.length)];
    reponses.push(accorder(txt, fem));
    scores.push(score);
  }
  return { reponses, scores };
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet (partie apprenant), attentes, missions et contribution (partie employeur).
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
    besoin: "Savoir lire le bilan et le compte de résultat de la structure pour prendre des décisions chiffrées.",
    objectif: "Je souhaite comprendre le bilan et le compte de résultat pour dialoguer d'égal à égal avec l'expert-comptable.",
    projet: "Elle m'aidera à professionnaliser la gestion de la structure, aujourd'hui très intuitive.",
    attentes: "Nous attendons une montée en compétences sur le suivi financier : tableau de bord mensuel, trésorerie, seuil de rentabilité.",
    missions: "Participation au comité de direction, préparation du budget, suivi de la trésorerie et des relances clients.",
    contribution: "Elle nous apportera un pilotage chiffré qui nous manque aujourd'hui.",
  },
  {
    besoin: "Apprendre à recruter et à animer une équipe, en particulier gérer les conflits.",
    objectif: "Je veux structurer ma pratique du management : recrutement, entretiens, gestion des conflits.",
    projet: "Elle valide mon passage vers un poste d'encadrement et me donne la légitimité nécessaire face à l'équipe.",
    attentes: "Nous souhaitons que {le_sal} prenne en charge le recrutement et l'animation de l'équipe terrain.",
    missions: "Recrutement et intégration des nouveaux collaborateurs, conduite des entretiens annuels, animation des réunions d'équipe.",
    contribution: "Elle structurera notre management et devrait réduire le turnover de l'équipe.",
  },
  {
    besoin: "Construire un plan d'actions commerciales et suivre ses indicateurs.",
    objectif: "Mon objectif est de prendre en charge le développement commercial de la structure et de le piloter par indicateurs.",
    projet: "Elle complète mon expérience commerciale par le management et la finance, indispensables pour diriger.",
    attentes: "Notre objectif est de structurer le développement commercial avec un plan d'actions et un suivi dans le CRM.",
    missions: "Développement commercial : prospection, devis, suivi des clients clés, mise à jour du CRM.",
    contribution: "Elle professionnalisera notre développement commercial, aujourd'hui dépendant de quelques clients historiques.",
  },
  {
    besoin: "Maîtriser le seuil de rentabilité et le suivi de la trésorerie avant de reprendre une entreprise.",
    objectif: "Je souhaite acquérir les compétences de gestion nécessaires pour reprendre l'entreprise familiale dans les trois ans.",
    projet: "Elle me donnera les outils de gestion qui me manquent pour reprendre l'entreprise de mes parents dans de bonnes conditions.",
    attentes: "Notre attente est de préparer la succession du dirigeant actuel, qui souhaite transmettre l'entreprise dans trois ans.",
    missions: "Suivi de la trésorerie, préparation des rendez-vous avec la banque et l'expert-comptable, encadrement de l'équipe en l'absence du gérant.",
    contribution: "Elle sécurisera la transmission de l'entreprise en formant {notre_futur} à la gestion.",
  },
  {
    besoin: "Structurer le diagnostic stratégique et mettre en place une veille utile.",
    objectif: "Mon objectif est d'aider la direction à faire des choix stratégiques argumentés, à partir d'un diagnostic et d'une veille organisée.",
    projet: "Elle me donnera une vision d'ensemble de la structure, au-delà de mon service actuel.",
    attentes: "Nous attendons {un} {collab} capable de réaliser le diagnostic de la structure et d'alimenter une veille concurrentielle et réglementaire.",
    missions: "Veille sur le secteur et la concurrence, préparation des réunions de direction, suivi des projets de développement.",
    contribution: "Elle nous permettra de prendre nos décisions sur la base d'analyses, et non plus seulement d'intuitions.",
  },
  {
    besoin: "Développer la visibilité locale de la structure et son réseau de partenaires.",
    objectif: "Je souhaite développer la notoriété locale de la structure et construire un réseau de partenaires durable.",
    projet: "Elle me permettra de devenir l'interlocut{/rice} de la structure auprès des acteurs du territoire.",
    attentes: "Nous attendons que {le_sal} représente la structure auprès des acteurs locaux et pilote sa présence en ligne.",
    missions: "Gestion de la fiche Google et des réseaux sociaux, participation aux événements du club d'entreprises, relations avec la CCI.",
    contribution: "Elle renforcera notre ancrage local et notre visibilité auprès de nouveaux clients.",
  },
  {
    besoin: "Organiser la production pour réduire les retards et les ruptures de stock.",
    objectif: "Mon objectif est d'organiser la production de l'atelier pour réduire les retards et le rebut.",
    projet: "Elle me permettra de passer de chef d'équipe à responsable de production, puis à la direction du site.",
    attentes: "Nous souhaitons fiabiliser l'organisation de la production : planning, stocks et qualité.",
    missions: "Organisation de la production : planning de l'atelier, gestion des approvisionnements, suivi qualité.",
    contribution: "Elle doit nous aider à tenir les délais promis aux clients et à réduire les pertes.",
  },
  {
    besoin: "Connaître les obligations légales du dirigeant et les seuils d'effectif.",
    objectif: "Je veux sécuriser les obligations légales de la structure avant qu'elle ne franchisse le seuil des 50 salariés.",
    projet: "Elle prépare ma prise de poste de direct{/rice} adjoint{e} prévue à la fin du contrat d'apprentissage.",
    attentes: "Notre attente est de disposer d'une personne qui maîtrise les obligations sociales et réglementaires de la structure.",
    missions: "Préparation du rapport d'activité, suivi des indicateurs RSE et des obligations réglementaires.",
    contribution: "Elle nous aidera à anticiper le passage du seuil de 50 salariés et ses obligations.",
  },
  {
    besoin: "Rédiger et présenter un rapport d'activité clair à la direction.",
    objectif: "Je souhaite être capable de rédiger et de présenter le rapport d'activité de la structure à sa gouvernance.",
    projet: "Elle me permettra de présenter des projets concrets au jury, construits sur la situation réelle de mon entreprise.",
    attentes: "Nous attendons que {la_future} sache rédiger le rapport d'activité présenté aux associés.",
    missions: "Collecte des indicateurs d'activité, rédaction des synthèses mensuelles, préparation de l'assemblée annuelle.",
    contribution: "Elle améliorera la qualité de l'information présentée à nos associés et à nos partenaires financiers.",
  },
  {
    besoin: "Passer d'un poste d'adjoint{e} à la direction d'une agence en sécurisant le volet gestion.",
    objectif: "Mon objectif est d'évoluer de mon poste d'adjoint{e} vers la direction du site, avec une vraie maîtrise des chiffres.",
    projet: "Cette formation correspond exactement au poste visé : responsable d'agence dans l'entreprise qui m'accueille en alternance.",
    attentes: "Nous attendons {un} {collab} capable de piloter l'agence en autonomie : équipe, chiffre d'affaires et indicateurs de gestion.",
    missions: "Encadrement d'une équipe de 6 personnes, suivi des plannings, du chiffre d'affaires et des indicateurs de l'agence.",
    contribution: "Cette formation permettra à notre {collab} de prendre la direction de l'agence à l'issue du contrat.",
  },
  {
    besoin: "Préparer le Dossier Professionnel et les présentations de projet devant le jury.",
    objectif: "Je veux obtenir une certification de niveau 5 reconnue qui valide l'expérience acquise sur le terrain.",
    projet: "Elle valorise des années d'expérience sans diplôme de gestion et m'ouvre des postes de responsable.",
    attentes: "Nous souhaitons reconnaître par un titre les responsabilités déjà exercées par {le_sal} et les élargir à la gestion.",
    missions: "Gestion du site au quotidien, encadrement de l'équipe, relation avec les clients et les fournisseurs.",
    contribution: "Elle consolidera une personne clé de l'entreprise et facilitera sa reconnaissance par l'équipe.",
  },
  {
    besoin: "Adapter l'offre aux attentes des clients et fixer les prix avec méthode.",
    objectif: "Mon objectif est de revoir l'offre de la structure à partir d'une vraie étude de marché et de fixer des prix rentables.",
    projet: "Elle me permettra de porter le lancement de la nouvelle gamme prévue l'an prochain.",
    attentes: "Nous attendons une analyse de notre clientèle et des propositions d'évolution de l'offre et des tarifs.",
    missions: "Étude de la clientèle, construction des grilles tarifaires, lancement de nouvelles offres, suivi des ventes.",
    contribution: "Elle nous aidera à mieux cibler nos clients et à protéger nos marges.",
  },
  {
    besoin: "Construire un prévisionnel solide pour créer ma structure.",
    objectif: "Mon objectif est de créer ma propre structure en sachant construire un prévisionnel et suivre ma trésorerie.",
    projet: "Elle me permettra de construire un projet de création chiffré et crédible auprès des banques.",
    attentes: "Nous accompagnons le projet de création de {le_sal} : nous lui confions un périmètre complet avant son installation.",
    missions: "Gestion d'un point de vente : équipe, achats, caisse, suivi du chiffre d'affaires et des marges.",
    contribution: "Elle permettra un vrai transfert d'expérience pendant le contrat, au bénéfice des deux parties.",
  },
  {
    besoin: "Diriger une structure associative en maîtrisant gestion, financements et animation d'équipe.",
    objectif: "Mon objectif est de diriger une association du secteur social en maîtrisant à la fois la gestion et l'animation d'équipe.",
    projet: "Elle sécurise ma reconversion vers une fonction d'encadrement dans le secteur associatif.",
    attentes: "Notre association attend une personne capable de suivre le budget, les financements publics et d'animer l'équipe salariée.",
    missions: "Suivi budgétaire, dossiers de subvention, coordination des salariés et des bénévoles, lien avec le conseil d'administration.",
    contribution: "Elle renforcera la gestion de l'association et la qualité des comptes rendus faits aux financeurs.",
  },
  {
    besoin: "Mettre en place des outils qualité et des indicateurs de pilotage.",
    objectif: "Je souhaite mettre en place des indicateurs de pilotage et une démarche qualité dans la structure.",
    projet: "Elle me permettra d'évoluer vers un poste de responsable des opérations.",
    attentes: "Nous attendons la mise en place d'un tableau de bord et d'une démarche d'amélioration continue.",
    missions: "Suivi des réclamations clients, animation des réunions qualité, construction du tableau de bord mensuel.",
    contribution: "Elle doit nous préparer à une éventuelle certification ISO 9001 demandée par nos clients.",
  },
  {
    besoin: "Prendre la responsabilité d'un second établissement et en piloter les résultats.",
    objectif: "Mon objectif est de prendre la responsabilité du second établissement que l'entreprise ouvre l'an prochain.",
    projet: "Elle prépare directement le poste qui m'est proposé à l'ouverture du nouveau site.",
    attentes: "Nous attendons {un} {collab} capable d'ouvrir et de piloter notre second établissement.",
    missions: "Préparation de l'ouverture : recrutement de l'équipe, plan de communication locale, budget de démarrage.",
    contribution: "Elle sécurisera l'ouverture de notre nouvel établissement avec un responsable formé.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilRPMS(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

export function getRPMSBesoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return accorder(profilRPMS(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production écrite du stagiaire, une banque par compétence
// Indices : 0 socle, 1 à 9 = CP1 à CP9 ; 8 productions par banque
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Socle : obligations du dirigeant
  [
    "J'ai dressé le tableau des obligations pour mon entreprise d'accueil (27 salariés). CSE : en place, effectif au-dessus de 11 depuis plus de 12 mois. DUERP : existant mais non mis à jour depuis 2024, je l'ai signalé avec une proposition de date de revue. Index égalité : non applicable sous 50 salariés. Obligation d'emploi de travailleurs handicapés : applicable, 6 % de 27 = 1,62, soit 1 bénéficiaire à employer ; la déclaration passe par la DSN. Facturation électronique : réception obligatoire depuis le 1er septembre 2026, émission au 1er septembre 2027 ; le choix de la plateforme agréée est à faire avec l'expert-comptable. CSRD : non applicable, mais un client grand compte nous a envoyé un questionnaire RSE. J'ai nommé un responsable pour chaque ligne.",
    "Ma structure d'accueil est une association de 14 salariés. J'ai vérifié chaque seuil : CSE obligatoire (plus de 11 salariés depuis plus d'un an), DUERP obligatoire et à jour, pas d'index égalité ni d'obligation d'emploi de travailleurs handicapés (moins de 20 salariés). Pour la facturation électronique, l'association n'est concernée que pour ses activités assujetties à la TVA : j'ai noté le point à faire valider. J'ai ajouté pour chaque obligation la preuve à conserver (PV d'élection, DUERP daté, registre unique du personnel).",
    "J'ai pris le cas d'une PME de 30 salariés. Tableau en six lignes avec seuil, échéance, preuve et responsable. J'ai rappelé que le DUERP se met à jour chaque année à partir de 11 salariés et se conserve 40 ans, et que la CSSCT n'est obligatoire qu'à partir de 300 salariés. Mon formateur m'a fait corriger un point : j'avais écrit que l'index égalité s'appliquait dès 20 salariés, c'est 50.",
    "Pour l'agence où je travaille (42 salariés), j'ai identifié une échéance proche : le passage aux 50 salariés prévu l'an prochain déclenchera l'index égalité et les attributions étendues du CSE. J'ai proposé d'anticiper en calculant dès maintenant les indicateurs de l'index. Pour la facturation électronique, j'ai listé trois plateformes agréées à comparer et l'impact sur le logiciel de facturation actuel.",
    "Mon entreprise d'accueil compte 9 salariés : pas de CSE (seuil de 11 non atteint), pas d'index égalité, pas d'obligation d'emploi de travailleurs handicapés. Le DUERP, en revanche, est obligatoire dès le premier salarié et n'existait pas : j'en ai proposé une première version avec le gérant, à partir de la trame de l'INRS. Facturation électronique : réception depuis le 1er septembre 2026, émission au 1er septembre 2027. J'ai présenté le tableau sous forme de calendrier sur deux ans.",
    "J'ai travaillé sur la PME de 30 salariés proposée dans la consigne. Pour chaque obligation, j'ai distingué ce que l'entreprise doit faire, ce qu'elle doit pouvoir prouver lors d'un contrôle et qui s'en occupe. L'obligation d'emploi de travailleurs handicapés donne 1,8 bénéficiaire, donc 1 en arrondi inférieur. Pour la CSRD, j'ai expliqué que la directive Omnibus réserve désormais le reporting aux grandes entreprises, mais que les questionnaires des clients restent à traiter.",
    "Ma structure (21 salariés, commerce de gros) venait de franchir le seuil de 20 salariés. J'ai repéré la nouvelle obligation d'emploi de travailleurs handicapés : 6 % de 21 = 1,26, soit 1 bénéficiaire, déclaré dans la DSN. J'ai aussi vérifié que le CSE avait bien été mis en place. Le tableau comprend une colonne « prochaine action » avec une date, que le gérant a reprise dans son agenda.",
    "Je me suis appuyé{e} sur un tableau existant de l'entreprise, que j'ai corrigé : il indiquait encore une émission de factures électroniques obligatoire en 2024, calendrier abandonné depuis. J'ai mis à jour les dates (réception au 1er septembre 2026, émission des PME au 1er septembre 2027) et ajouté l'e-reporting. Les six obligations demandées sont traitées avec seuil, échéance, preuve et responsable interne.",
  ],
  // 1 — CP1 : diagnostic et veille
  [
    "PESTEL : j'ai retenu deux facteurs par dimension pour notre PME de mécanique de précision (prix de l'énergie et taux d'intérêt pour l'économique, facturation électronique et normes environnementales pour le légal…). SWOT : cinq items par case, en vérifiant que les opportunités et les menaces étaient bien externes. Porter : pouvoir des clients fort (trois donneurs d'ordre font 60 % du CA), menace des substituts faible. Veille : Google Alerts sur nos trois concurrents, Feedly sur la presse de la fédération, consultation mensuelle du BODACC. Ma note de synthèse propose de réduire la dépendance aux trois clients principaux.",
    "J'ai réalisé le diagnostic de l'entreprise d'accueil. Ma première SWOT mélangeait encore forces et opportunités ; je l'ai reprise après la correction. Les 5 forces de Porter montrent un secteur très concurrentiel avec des entrants nombreux. J'ai proposé un dispositif de veille piloté par l'assistante de direction : cinq sources, deux outils, synthèse mensuelle en réunion. Quatre recommandations, dont la diversification vers la maintenance.",
    "Mon diagnostic porte sur une PME industrielle de 38 salariés. Facteurs PESTEL sourcés (INSEE, CCI, presse sectorielle). SWOT complète. Porter noté de faible à forte pour chaque force. Veille : périmètre (concurrence, réglementation, technologie), sources, outils, fréquence hebdomadaire, pilote nommé. J'ai identifié trois acteurs du territoire à rencontrer : la CCI, l'agence régionale de développement et Bpifrance. Note de synthèse de deux pages.",
    "J'ai d'abord listé les informations disponibles sur le secteur, puis construit le PESTEL et la SWOT. Le point le plus utile a été la chaîne de valeur : elle a montré que la valeur se crée surtout dans le service après-vente. Ma recommandation principale : développer les contrats de maintenance. J'ai ajouté un volet sécurité numérique au diagnostic (sauvegardes, droits d'accès), suite à une remarque du formateur.",
    "Pour la PME de 38 salariés et 6,2 M€ de CA, j'ai commencé par Porter : fournisseurs d'acier peu nombreux (pouvoir fort), clients industriels exigeants (pouvoir fort), substituts limités. La SWOT en découle : savoir-faire reconnu et parc machines récent en forces, dépendance aux matières premières en menace. Ma veille repose sur Feedly et un tableau partagé, alimenté chaque lundi par le responsable des achats. Trois rencontres prévues : CCI, Région, pôle de compétitivité mécanique.",
    "J'ai organisé mon diagnostic en entonnoir : environnement (PESTEL), secteur (Porter), entreprise (SWOT). Pour chaque facteur, j'ai noté la source et la date, comme demandé. Les quatre recommandations portent sur la diversification des clients, la formation des régleurs, l'économie d'énergie et un partenariat avec un lycée professionnel. Le formateur m'a demandé de relier explicitement chaque recommandation à une case de la SWOT, ce que j'ai fait dans la version finale.",
    "Dans ma note de synthèse, j'ai mis en avant un constat : 40 % des salariés partiront en retraite dans les huit ans. C'est la principale faiblesse interne, et la tension sur le recrutement industriel est une menace externe. Recommandation : plan de transmission des savoir-faire et partenariat avec un CFA. Veille : INSEE, CCI, fédération, BODACC et INPI, deux outils, diffusion mensuelle en réunion de direction.",
    "J'ai appliqué l'exercice à mon entreprise d'accueil, une PME de négoce. Le PESTEL a fait ressortir la hausse des coûts de transport et la facturation électronique. La SWOT montre une très bonne relation client mais un site internet daté. Porter : clients au pouvoir fort, fournisseurs au pouvoir moyen. Dispositif de veille piloté par moi-même, synthèse de deux pages chaque mois.",
  ],
  // 2 — CP2 : territoire et visibilité
  [
    "Cartographie réalisée : préfecture et DDETS pour les aides à l'embauche, Région pour les aides à l'investissement, communauté d'agglomération pour le foncier, CCI pour les formalités et le réseau, CMA pour les sous-traitants artisans. Plan numérique sur six mois : fiche Google mise à jour, dix mots-clés locaux, page LinkedIn, deux annuaires. Budget de 16 500 € HT, en dessous des 18 000 € fixés. Cinq KPI mensuels.",
    "J'ai commencé par corriger la fiche Google de l'entreprise : horaires faux, adresse différente de celle du site. J'ai appliqué la règle NAP sur tous les supports. Puis j'ai planifié huit actions physiques sur l'année (salon régional, deux afterworks du club d'entreprises, forum emploi, portes ouvertes…). Trois partenariats proposés : un CFA, un fournisseur local, une association d'insertion.",
    "Plan d'inscription territoriale pour une PME de 32 salariés en Occitanie. Chaque acteur institutionnel est présenté avec ce qu'il peut apporter. Le plan numérique est chiffré action par action. J'ai défini cinq indicateurs : vues de la fiche, appels, demandes d'itinéraire, demandes de devis, abonnés LinkedIn. Le formateur m'a demandé de dater précisément les actions physiques, je l'ai fait.",
    "J'ai mené l'exercice sur mon entreprise d'accueil, un commerce de proximité. Priorités : avis clients sur la fiche Google, présence sur Instagram, partenariat avec l'association des commerçants. J'ai proposé une adhésion à la CCI pour accéder aux ateliers numériques. Budget modeste, 4 200 € sur six mois, et suivi mensuel des indicateurs.",
    "Pour la PME implantée en Occitanie, j'ai construit la cartographie sous forme de tableau : acteur, rôle, contact, intérêt pour l'entreprise. Le plan numérique commence par la fiche Google et les dix mots-clés locaux (activité + ville + département), puis LinkedIn au troisième mois. Le budget total est de 17 200 € HT, dont 6 000 € pour un salon régional. Les cinq KPI sont relevés le premier lundi de chaque mois.",
    "J'ai donné la priorité à la présence physique, plus adaptée à une clientèle locale de professionnels : huit actions datées, dont deux réunions du club d'entreprises et une porte ouverte en juin. Côté numérique, j'ai harmonisé le NAP sur six annuaires. Les trois partenariats retenus : un CFA pour les alternants, une entreprise complémentaire pour des offres groupées, la communauté d'agglomération pour un événement emploi. Budget de 15 800 € HT.",
    "Ma production met en avant le rôle de la Région et de Bpifrance pour financer l'installation, et de France Travail pour les premiers recrutements. Le plan de visibilité suit trois phases : mise en place (mois 1 et 2), animation (mois 3 à 5), mesure (mois 6). J'ai prévu une réponse systématique aux avis Google. Le formateur a validé le budget mais m'a demandé un indicateur de leads plus précis : j'ai ajouté les demandes de devis issues du site.",
    "J'ai appliqué le plan à mon entreprise d'accueil, une agence de services implantée depuis deux ans. Diagnostic de départ : fiche Google sans avis, pas de page LinkedIn, aucun partenariat local. Plan sur six mois avec un budget de 9 600 € HT, cinq KPI et huit actions physiques. J'ai présenté le plan au gérant, qui a validé l'adhésion au club d'entreprises.",
  ],
  // 3 — CP3 : management
  [
    "Fiche de poste du chef de projet senior : missions, compétences, rattachement, rémunération, CDI. Sourcing : APEC, LinkedIn, cooptation avec prime, pour un budget de 2 800 €. Grille STAR de huit questions, identique pour tous les candidats. Onboarding : accueil et matériel à J1, binôme en S1, premier point à M1, bilan de période d'essai à M3. L'Ishikawa du turnover fait ressortir surtout le management et l'absence de perspectives. Plan managérial : réunion hebdomadaire, entretiens individuels mensuels, baromètre QVCT trimestriel.",
    "J'ai construit la grille d'entretien STAR en huit questions comportementales et je l'ai testée avec un collègue. Pour les formalités, j'ai rappelé la DPAE à l'URSSAF dans les 8 jours avant l'embauche, la visite d'information et de prévention et l'affiliation à la mutuelle. Les causes du turnover relevées par l'Ishikawa : charge mal répartie, absence d'entretiens, outils obsolètes. Planning des entretiens professionnels établi sur deux ans.",
    "Mon plan managérial part d'un constat : 28 % de turnover, surtout dans la première année. J'ai donc renforcé l'onboarding sur 90 jours avec des livrables à chaque étape. J'ai adapté le management situationnel à trois profils de l'équipe : directif pour la nouvelle recrue, participatif pour la chargée de projet confirmée, délégatif pour le plus ancien. J'ai rappelé la sanction de 3 000 € sur le CPF dans les entreprises d'au moins 50 salariés.",
    "Pour la gestion du conflit entre deux collaborateurs, j'ai décrit une démarche en quatre étapes : entretiens séparés, recherche des causes, médiation avec la méthode DESC, engagements écrits et suivi à J+15 et J+30. J'ai complété par une fiche de poste et un plan de sourcing multicanal. Le formateur a validé l'ensemble en me demandant de mieux chiffrer le budget de recrutement.",
    "La fiche de poste précise le rattachement au directeur d'agence, la gestion de trois à cinq projets simultanés et une rémunération de 42 à 48 k€ brut annuels. Sourcing : France Travail (gratuit), APEC, une annonce sur un jobboard spécialisé (900 €) et la cooptation (prime de 1 000 €). L'Ishikawa montre que le turnover vient d'abord du milieu (open space bruyant) et du management (pas de retours réguliers). Le plan managérial prévoit un point d'équipe le lundi et un entretien individuel par mois.",
    "J'ai commencé par l'Ishikawa, pour que le recrutement ne reproduise pas les causes du turnover. Trois causes principales : intégration bâclée, absence de perspectives, outils de gestion de projet mal maîtrisés. L'onboarding sur 90 jours répond aux deux premières, une formation à l'outil répond à la troisième. La grille STAR comprend une question sur la gestion d'un client mécontent, que j'ai ajoutée après la correction.",
    "Mon plan managérial sur six mois comporte trois rituels (réunion hebdomadaire de 30 minutes, revue de projets mensuelle, séminaire semestriel), un entretien individuel mensuel et un baromètre QVCT trimestriel de dix questions. Les entretiens professionnels des 24 collaborateurs sont répartis sur l'année, deux par mois. J'ai vérifié les formalités d'embauche : DPAE, contrat écrit, visite d'information et de prévention, mutuelle.",
    "J'ai transposé l'exercice à mon entreprise d'accueil, où j'encadre quatre personnes. J'ai rédigé la fiche de poste d'un futur technicien et une grille STAR de huit questions, que nous avons utilisée pour un vrai recrutement le mois suivant. L'onboarding sur 90 jours a été adopté par le gérant. Pour le turnover, plus faible chez nous, j'ai surtout travaillé les entretiens individuels.",
  ],
  // 4 — CP4 : offre
  [
    "Étude de marché : sources INSEE, fédération de la cosmétique, Google Trends, puis 120 questionnaires et 8 entretiens en magasin. Trois segments : jeunes actives urbaines, familles attentives aux ingrédients, seniors aux peaux sensibles. Deux personas détaillés. La matrice attractivité × accessibilité fait ressortir les familles comme cible prioritaire. Mix 7P avec trois actions par P. CA additionnel estimé à 210 k€ sur douze mois.",
    "J'ai travaillé sur l'offre de mon entreprise d'accueil, un service de nettoyage professionnel. Segments : bureaux, commerces, copropriétés. Persona principal : la gestionnaire de copropriété. Positionnement : « Pour les syndics exigeants, une offre de nettoyage avec suivi en ligne et intervention sous 24 h, différente des acteurs nationaux par sa réactivité locale. » Prix fixés par la méthode du coût majoré, contrôlés par rapport au marché.",
    "Mon étude combine une partie quantitative (questionnaire en ligne, 85 réponses) et une partie qualitative (cinq entretiens semi-directifs). J'ai segmenté selon des critères socio-démographiques, psychographiques et comportementaux (RFM). La cible prioritaire retenue est justifiée par la matrice. Le mix 7P comprend une action d'écoconception sur l'emballage.",
    "J'ai d'abord mal formulé le positionnement (trop vague). Après correction : cible, catégorie, bénéfice et différence par rapport aux concurrents sont explicites. Les deux personas sont construits à partir des entretiens. Estimation du CA additionnel : 1 500 clients potentiels × 8 % de pénétration × 95 € de panier × 4 achats par an, soit environ 45 600 €.",
    "Pour la PME cosmétique bio (28 salariés, 1,8 M€), j'ai retenu trois segments : hommes de 25 à 40 ans qui découvrent les soins, femmes de 35 à 55 ans fidèles au bio, parents qui cherchent des produits pour bébé. La matrice désigne les parents comme cible prioritaire : segment en croissance et accessible par les pharmacies. Persona : Claire, 33 ans, infirmière, deux enfants, attentive aux labels. Mix 7P orienté pharmacie, avec formation des préparateurs (personnel) et coffret découverte (preuve physique).",
    "Mon étude de marché repose sur des sources secondaires (INSEE, fédération, études Xerfi consultées à la CCI) et sur une enquête de 95 questionnaires en sortie de magasin bio. J'ai trouvé difficile de séparer les critères psychographiques des critères comportementaux ; la correction m'a aidé{e} à les classer. Le positionnement final met en avant la fabrication française et la traçabilité des ingrédients. Le potentiel estimé est de 180 k€ sur douze mois.",
    "J'ai construit le mix 7P avec trois actions par P, dont un abonnement trimestriel (prix), un parcours client en ligne simplifié (processus) et des ateliers en boutique animés par les conseillères (personnel). Pour le prix, j'ai comparé le coût majoré et la valeur perçue mesurée dans le questionnaire : les clients acceptent un prix 10 % supérieur à celui de la concurrence pour un produit certifié. CA additionnel calculé avec la formule cible × pénétration × panier × fréquence.",
    "J'ai appliqué la méthode à mon entreprise d'accueil, une boulangerie-pâtisserie de 11 salariés. Segments : actifs du midi, familles du week-end, entreprises pour les commandes de réception. Cible prioritaire : les entreprises, peu exploitées et accessibles par prospection directe. Positionnement et 7P adaptés, avec un catalogue traiteur en ligne. Estimation : 40 entreprises × 6 commandes par an × 180 € = 43 200 € de CA additionnel.",
  ],
  // 5 — CP5 : diffusion
  [
    "Objectif global : passer de 1,1 à 1,4 M€, soit +300 k€ (+27,3 %). Quatre objectifs SMART : 18 nouveaux clients, panier moyen porté de 21 à 24 k€, taux de fidélisation de 80 %, taux de transformation de 25 %. PAC sur douze mois avec un calendrier trimestriel. Prospection : phoning BEBEDC, emailing avec lien de désinscription, social selling sur LinkedIn. CRM retenu : HubSpot Free puis version payante au deuxième semestre. Tableau de bord de dix indicateurs.",
    "J'ai construit l'entonnoir de conversion : 600 suspects, 180 prospects, 60 leads qualifiés (BANT), 30 opportunités, 15 clients gagnés, soit 25 % de transformation. Le plan de fidélisation repose sur un NPS semestriel, un CSAT après chaque projet et un traitement des réclamations selon la méthode CRAC. Le formateur m'a demandé de vérifier que les quatre objectifs atteignaient bien le total de +300 k€ : j'ai corrigé le panier moyen.",
    "Pour l'entreprise d'accueil, j'ai rédigé un PAC sur douze mois : cibles (PME industrielles du département), actions (deux salons, campagne d'e-mails, rendez-vous terrain), moyens (budget de 9 000 €, CRM Axonaut), calendrier et indicateurs. J'ai rappelé les règles RGPD en B2B et prévu un A/B test sur l'objet des e-mails.",
    "J'ai choisi Sellsy pour son module de devis intégré, budget annuel d'environ 1 400 €. Mes dix indicateurs : rendez-vous, devis envoyés, taux de signature, CA mensuel, marge, panier moyen, nouveaux clients, clients perdus, NPS et délai de réponse aux demandes. Revue mensuelle avec l'équipe et actions correctives quand un indicateur dérive.",
    "Pour atteindre 1,4 M€, j'ai réparti les +300 k€ : 200 k€ par la conquête (10 nouveaux clients à 20 k€) et 100 k€ par le développement des clients existants (hausse du panier moyen). Mes quatre objectifs SMART sont datés au 31 décembre et suivis chaque mois. Le script de phoning suit la méthode BEBEDC ; les e-mails sont envoyés aux décideurs marketing, avec un lien de désinscription. CRM : Axonaut, environ 1 200 € par an, choisi parce qu'il intègre la facturation.",
    "Mon plan de prospection alterne les canaux : LinkedIn en janvier et février (social selling, publications hebdomadaires), campagne d'e-mails en mars, salon professionnel en avril, phoning de relance en mai. L'entonnoir vise 25 % de transformation des opportunités. Le plan de fidélisation comprend un NPS semestriel et un petit-déjeuner clients par trimestre. Le tableau de bord tient sur une page, avec un code couleur par indicateur.",
    "J'ai d'abord rédigé des objectifs trop vagues (« augmenter les ventes ») ; la correction m'a fait reprendre chaque critère SMART. Version finale : 15 nouveaux clients, panier moyen de 23 k€, fidélisation de 85 %, transformation de 25 %, ce qui redonne bien +300 k€. J'ai choisi HubSpot Free pour démarrer sans coût, avec un passage à la version payante si l'équipe l'adopte.",
    "J'ai appliqué l'exercice à mon entreprise d'accueil, une agence de 9 salariés. Objectif : +15 % de CA. Le PAC comprend une campagne d'e-mails vers 400 entreprises du département, deux salons, un programme de parrainage client. Le CRM existant (Sellsy) était sous-utilisé : j'ai formé l'équipe et défini les champs obligatoires. Dix indicateurs, revus le premier lundi du mois.",
  ],
  // 6 — CP6 : production
  [
    "VSM simplifiée de la ligne d'usinage : flux matière et information, temps de cycle, stocks entre les postes ; le goulet est au contrôle final. TRS = disponibilité × performance × qualité ; avec une qualité de 95,2 % (rebut 4,8 %), la perte principale vient de la disponibilité. Chantier 5S sur huit semaines. ABC : 18 % des références font 79 % de la valeur, ce sont elles qui sont en rupture. Plan PDCA de cinq actions chiffrées, pour 34 000 € au total.",
    "J'ai analysé le rebut avec un Ishikawa 5M puis les 5 Pourquoi : la cause racine est un réglage de machine non standardisé entre les équipes. Action : fiche de réglage standard et formation des opérateurs. Pour les stocks, j'ai appliqué la formule de Wilson sur les références A et défini un stock de sécurité. ISO 9001 : 12 à 18 mois, coût estimé entre 15 et 25 k€ avec l'accompagnement.",
    "Dans mon entreprise d'accueil (prestations de services), j'ai adapté l'exercice : planning des interventions sous forme de Gantt, suivi des retards, Kanban pour les dossiers en cours. Le PDCA a porté sur les retards de livraison : objectif −30 % en six mois. J'ai ajouté le volet sécurité (DUERP, EPI) et le tri des cinq flux de déchets.",
    "J'ai calculé le TRS de 62 % et montré l'écart avec la cible de 85 %. Le chantier 5S est planifié semaine par semaine avec un pilote par zone. J'ai proposé une démarche d'achats responsables (fournisseurs locaux, critères RSE dans les consultations). Le formateur m'a fait compléter le plan PDCA par des indicateurs de suivi.",
    "Pour la PME de 45 salariés, j'ai décomposé le TRS : qualité 95,2 % (rebut de 4,8 %), et j'ai supposé une performance de 90 %, ce qui donne une disponibilité d'environ 72 % pour retrouver 62 %. Les pannes et les changements de série sont donc la première cible : action SMED sur les changements de série. Les cinq actions du PDCA totalisent 29 500 €, dont 12 000 € de maintenance préventive.",
    "Ma VSM montre trois stocks intermédiaires importants entre l'usinage et l'assemblage. L'Ishikawa du rebut fait ressortir la matière (lots fournisseurs irréguliers) et la méthode (contrôle en fin de ligne seulement). Les 5 Pourquoi aboutissent à l'absence de contrôle à réception. Actions : contrôle des lots entrants, autocontrôle par les opérateurs, 5S en zone d'assemblage. Wilson appliqué aux six références A.",
    "J'ai commencé par la méthode ABC sur le fichier des références : 21 % des références représentent 80 % de la valeur, et toutes les ruptures concernent cette classe. Pour elles, stock de sécurité et quantité de Wilson ; pour les références C, réapprovisionnement simplifié deux fois par an. Le chantier 5S est découpé en huit semaines avec un audit à la fin. ISO 9001 jugée pertinente car deux clients l'exigent.",
    "J'ai transposé l'exercice à mon entreprise d'accueil, un atelier de 12 personnes. Le TRS n'y était pas mesuré : j'ai mis en place un relevé simple des arrêts machines pendant quatre semaines. Résultat : 58 %, avec la disponibilité comme principale perte. Plan PDCA de cinq actions pour 11 000 € et chantier 5S lancé sur le poste de découpe.",
  ],
  // 7 — CP7 : bilan
  [
    "Bilan fonctionnel : ressources stables 2 850 k€ (capitaux propres 1 280 + amortissements 850 + dettes LT 720), emplois stables 2 100 k€, donc FR = 750 k€. BFR = (480 + 1 920) − (980 + 310) = 1 110 k€. Trésorerie nette = 750 − 1 110 = −360 k€, ce que confirment les disponibilités de 65 k€ face à 425 k€ de concours bancaires. Le BFR est financé par le découvert.",
    "Ratios : autonomie financière 34,5 %, indépendance 64 %, capacité d'endettement 3 ans (4,8 ans avec le découvert), délai clients 74 jours, délai fournisseurs 84 jours. Trois faiblesses : trésorerie négative, clients payés trop tard, fournisseurs réglés au-delà du plafond légal de 60 jours. Préconisations : relances systématiques et affacturage, acomptes sur les chantiers, prêt à moyen terme pour consolider le découvert, réduction des stocks, échéancier fournisseurs.",
    "J'ai d'abord vérifié l'équilibre du bilan : 4 565 k€ à l'actif comme au passif. Puis FR (750), BFR (1 110) et TN (−360). Le BFR représente 51 jours de CA HT. Le risque de cessation de paiement à six mois est réel si la banque réduit le découvert autorisé : je propose un plan de trésorerie mensuel et une rencontre anticipée avec le banquier.",
    "Mon analyse insiste sur le délai fournisseurs de 84 jours : au-delà du plafond légal de 60 jours, l'entreprise s'expose à une amende administrative et à des tensions avec ses fournisseurs. Préconisations chiffrées : ramener le délai clients de 74 à 60 jours libérerait environ 365 k€ de trésorerie (14 jours de CA TTC). Le formateur a validé le calcul.",
    "J'avais d'abord oublié de reclasser les amortissements dans les ressources stables, ce qui me donnait un FR négatif. Après correction : ressources stables 2 850 k€, emplois stables 2 100 k€, FR 750 k€, BFR 1 110 k€, TN −360 k€. Les ratios confirment une structure correcte (indépendance financière de 64 %) mais un cycle d'exploitation trop lourd. Mes cinq préconisations sont classées par délai de mise en œuvre.",
    "J'ai présenté l'analyse sous forme de schéma en trois étages (FR, BFR, TN) pour la rendre lisible au dirigeant. Constat : l'entreprise n'a pas un problème de rentabilité (CAF de 240 k€) mais un problème de financement du cycle d'exploitation. Délai clients 74 jours, délai fournisseurs 84 jours. Préconisations : acomptes de 30 % à la commande sur les chantiers, affacturage sur les grands comptes, prêt de 300 k€ sur cinq ans pour consolider le découvert.",
    "Mon évaluation du risque à six mois s'appuie sur un scénario : si la banque réduit le découvert autorisé de 425 à 250 k€, il manque 175 k€. Je propose donc d'agir d'abord sur les créances clients (relances, acomptes) et de rencontrer le banquier avant la clôture. Les ratios d'autonomie (34,5 %) et d'indépendance (64 %) sont comparés aux normes usuelles. Faiblesses et préconisations sont reliées une à une.",
    "J'ai complété l'exercice par l'analyse du bilan de mon entreprise d'accueil, avec l'accord du gérant et l'aide de l'expert-comptable. Sa situation est plus saine : FR positif couvrant le BFR, trésorerie nette positive, mais un délai clients de 68 jours. J'ai proposé une procédure de relance en trois étapes. Le cas BTP est traité en entier : FR 750, BFR 1 110, TN −360 k€, ratios et préconisations.",
  ],
  // 8 — CP8 : compte de résultat
  [
    "SIG : consommations en provenance des tiers 1 070, valeur ajoutée 1 330, EBE 290, résultat d'exploitation 195, résultat courant avant impôt 167, résultat avant IS 179, IS 50,1, résultat net 128,9 k€. CAF : 223,9 k€ par les deux méthodes. Taux de VA 55,4 %, taux de marge d'EBE 12,1 %, part du personnel dans la VA 73,7 %, marge nette 5,4 %.",
    "Charges variables : 690 k€ ; MCV 1 710 k€, soit un taux de 71,25 %. Charges fixes : 1 543 k€ ; contrôle 1 710 − 1 543 = 167, égal au résultat courant. Seuil de rentabilité : 2 165,6 k€ ; point mort au 325e jour, fin novembre. La structure est vulnérable : une baisse de 10 % du CA ferait passer sous le seuil.",
    "Écarts N/N-1 : CA +200 k€ (+9,1 %), EBE +5 k€ (+1,8 %), taux d'EBE en baisse de 12,95 % à 12,1 %. La croissance ne se retrouve pas dans la rentabilité, à cause du poids du personnel. Quatre préconisations : planification des équipes, révision des prix, renégociation des charges externes, suivi mensuel du seuil de rentabilité.",
    "J'avais d'abord oublié la variation de stocks dans les consommations ; après correction, la valeur ajoutée est bien de 1 330 k€. J'ai vérifié la CAF par les deux méthodes (223,9 k€). J'ai présenté le point mort sous forme de graphique pour le rendre lisible par un non-spécialiste.",
    "J'ai présenté les SIG dans un tableau en cascade, du chiffre d'affaires de 2 400 k€ jusqu'au résultat net de 128,9 k€. L'EBE de 290 k€ couvre largement les dotations aux amortissements (95 k€). La CAF de 223,9 k€ est identique par les deux méthodes. Le ratio qui m'a le plus frappé{e} est la part du personnel dans la valeur ajoutée : 73,7 %, ce qui laisse peu de marge de manœuvre.",
    "Je me suis concentré{e} sur le seuil de rentabilité : 1 543 / 71,25 % = 2 165,6 k€, soit une marge de sécurité de 234,4 k€ (9,8 % du CA). Point mort au 325e jour. J'ai montré que la hausse de 9,1 % du CA n'a fait progresser l'EBE que de 1,8 %, et proposé de suivre chaque mois le CA cumulé par rapport au seuil. Les quatre préconisations sont chiffrées quand c'est possible.",
    "Ma première version de la CAF soustractive oubliait le résultat exceptionnel de +12 k€ ; je retrouvais 211,9 au lieu de 223,9. Après correction, les deux méthodes concordent. Les ratios : taux de VA 55,4 %, taux de marge d'EBE 12,1 %, marge nette 5,4 %. Préconisations : révision des prix de 3 %, planification des équipes, renégociation de deux contrats de charges externes, tableau de bord mensuel.",
    "J'ai traité le cas en entier, puis j'ai calculé les SIG de mon entreprise d'accueil à partir de sa dernière liasse, avec l'expert-comptable. Sur le cas : VA 1 330, EBE 290, résultat net 128,9 k€, seuil de rentabilité 2 165,6 k€, point mort fin novembre. Pour mon entreprise, le taux de marge d'EBE est plus élevé (15 %), mais les charges externes progressent plus vite que le CA.",
  ],
  // 9 — CP9 : rapport d'activité
  [
    "Sommaire en sept chapitres conforme au plan type. Mot du dirigeant d'une page : croissance de l'activité, arrivée de deux cadres, perspectives d'export. Tableau de huit indicateurs sur trois exercices et trois graphiques. Volet RSE : bilan carbone simplifié (scopes 1, 2 et 3), obligation d'emploi de 6 % de travailleurs handicapés respectée, index égalité non obligatoire à 42 salariés mais calculé volontairement. Pas de DPEF ni de CSRD à ce niveau d'effectif.",
    "J'ai rédigé le rapport en langage simple pour des actionnaires non financiers. Le volet social présente l'effectif, la formation, le taux de fréquence et le taux de gravité des accidents. Les perspectives sont chiffrées sur trois axes. Diaporama de douze diapositives avec la règle 6×6, et cinq questions sensibles préparées (retard d'un projet, départ d'un commercial, litige client).",
    "Pour mon entreprise d'accueil, j'ai produit une version courte du rapport d'activité, validée par le dirigeant. Les données financières reprennent les SIG de l'exercice. Le volet RSE inclut un plan de réduction des déchets et une action de mécénat local. J'ai présenté le rapport en réunion d'équipe en 20 minutes.",
    "J'ai insisté sur la vérification des seuils : la SAS de 42 salariés n'est soumise ni à la DPEF ni à la CSRD, mais un client lui demande des données RSE. J'ai donc construit un volet RSE volontaire, appuyé sur la norme ISO 26000. Le formateur m'a demandé d'ajouter une data-visualisation de l'évolution de la marge : c'est fait.",
    "Mon sommaire suit les sept chapitres attendus. Les huit KPI retenus : CA, EBE, résultat net, effectif, taux de marge, délai clients, NPS, émissions de CO₂ par salarié. Trois graphiques : courbe du CA sur trois ans, barres comparant EBE et résultat, jauge du NPS. Les perspectives N+1 portent sur l'export, un nouvel outil de production et le recrutement de quatre personnes, chacune chiffrée.",
    "J'ai consacré le plus de temps au volet RSE. Environnement : bilan carbone simplifié dont le scope 3 représente près des trois quarts des émissions (achats et transport). Social : index égalité calculé volontairement, emploi de travailleurs handicapés à 7 %, baromètre QVCT. Sociétal : 60 % d'achats auprès de fournisseurs de la région et partenariat avec un lycée professionnel. Seuils DPEF et CSRD vérifiés : non applicables.",
    "Le mot du dirigeant m'a demandé trois versions : la première était trop longue et trop technique. La version finale tient en une page : vision, trois faits marquants, perspectives. Le diaporama de douze diapositives respecte la règle 6×6 et tient en 25 minutes ; je l'ai répété deux fois en chronométrant. Les cinq questions anticipées ont chacune une réponse rédigée en trois lignes.",
    "J'ai appliqué la trame à mon entreprise d'accueil, une SARL de 16 salariés qui n'avait jamais produit de rapport d'activité. Avec le gérant, nous avons retenu six indicateurs disponibles sur trois exercices, puis j'ai complété le cas de la SAS de 42 salariés pour respecter la consigne (huit KPI, trois graphiques, volet RSE complet). Seuils DPEF et CSRD : non applicables dans les deux cas.",
  ],
];

const BILANS_PERSONNELS = [
  "Ce travail m'a surtout appris à justifier chaque choix par un chiffre ou une source.",
  "Le point le plus difficile a été de tenir le temps imparti ; je m'entraîne pour l'examen.",
  "J'ai présenté le résultat à mon maître d'apprentissage, qui m'a fait deux remarques que j'ai intégrées.",
  "Je réutiliserai cette production comme situation dans mon Dossier Professionnel.",
  "J'ai d'abord travaillé seul{e}, puis comparé ma démarche avec celle d'un binôme, ce qui m'a fait corriger un oubli.",
  "La correction m'a permis de repérer une erreur de méthode que je ne referai plus.",
  "J'ai gagné en assurance sur ce sujet, que je redoutais au début de la formation.",
  "Je me suis appuyé{e} sur les fiches méthodes du livret, que je garde à portée de main.",
  "Je n'ai pas eu le temps de mettre en forme la dernière partie autant que je l'aurais voulu.",
  "J'ai posé deux questions au formateur pendant la séance, ce qui m'a évité de partir dans la mauvaise direction.",
  "Ce sujet est directement utile dans mon poste : j'en ai déjà parlé à mon responsable.",
  "Je dois encore gagner en rapidité sur les calculs, mais la démarche est maintenant claire pour moi.",
];

export function pickRPMSExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isRPMSFormation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);

  const t = contexte || "";
  const cp = t.match(/\bCP\s?([1-9])\b/);
  let bloc: number;
  if (cp) bloc = parseInt(cp[1], 10);
  else if (/socle|obligations du dirigeant/i.test(t)) bloc = 0;
  else bloc = exerciceIdx % EXERCICES_PRODUCTIONS.length;

  // Production et bilan tirés par permutation du rang du stagiaire : sur un groupe de 8 stagiaires,
  // les 8 productions d'une même compétence sont toutes différentes, et le bilan personnel change
  // d'un exercice à l'autre. L'entreprise d'accueil est citée quand elle est renseignée.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[rang(stagiaireIdx, bloc + 3, pool.length)];
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
  "Baccalauréat professionnel Métiers du commerce et de la vente, session 2023",
  "BTS Management commercial opérationnel obtenu en alternance",
  "BTS Gestion de la PME, session 2024",
  "Baccalauréat STMG, spécialité gestion et finance",
  "Licence professionnelle Commerce et distribution",
  "Baccalauréat professionnel Assistance à la gestion des organisations et de leurs activités",
  "BTS Négociation et digitalisation de la relation client",
  "Titre professionnel Manager d'unité marchande",
  "Baccalauréat général, première année de licence d'économie-gestion validée",
  "BTS Comptabilité et gestion",
  "Titre professionnel Assistant{e} de direction",
  "Baccalauréat professionnel Logistique, puis trois ans de chef d'équipe en entrepôt",
  "DUT Gestion des entreprises et des administrations",
  "CAP Pâtisserie et brevet professionnel, projet de reprise d'une boulangerie",
  "Baccalauréat professionnel Métiers de l'accueil",
  "BTS Support à l'action managériale",
  "Licence d'administration économique et sociale",
  "Titre professionnel Négociateur technico-commercial",
  "Baccalauréat technologique STI2D, puis cinq ans de technicien en PME industrielle",
  "BTS Tourisme, expérience de responsable adjoint{e} d'agence",
  "Diplôme d'études supérieures obtenu à l'étranger, en cours de reconnaissance",
  "Baccalauréat professionnel Commerce, quatre ans de responsable de rayon",
  "BTS Professions immobilières",
  "Titre professionnel Gestionnaire comptable et fiscal",
  "Brevet de technicien supérieur Hôtellerie-restauration",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance, je travaille mieux en les lisant avant la séance.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières pendant les classes virtuelles me conviennent.",
  "Non. Je porte des lunettes et j'apprécie des supports en police suffisamment grande pour la lecture à l'écran.",
  "Non, pas de handicap. Je précise que je suis plus à l'aise avec les chiffres à l'écrit qu'à l'oral.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je souhaite seulement que les classes virtuelles soient enregistrées pour revoir les passages de calcul financier.",
  "Non, aucune situation de handicap. J'ai simplement besoin d'un peu plus de temps pour les exercices de calcul, je m'y entraînerai.",
  "Non. Je préfère les supports imprimés pour annoter ; j'imprimerai les fiches méthodes.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté lors de l'entretien.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible en journée du lundi au vendredi, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. Mon employeur a validé ma présence aux séances de formation.",
  "Mes disponibilités me permettent de suivre la formation en journée (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Je bloque ces créneaux dans mon agenda professionnel.",
  "Je suis disponible du lundi au vendredi de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>. Je dispose d'un poste et d'une connexion stables pour les classes virtuelles.",
  "Je peux suivre l'intégralité des séances en journée, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible en journée (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). J'ai organisé la garde de mes enfants sur les jours de formation.",
  "Disponibilité complète en journée du lundi au vendredi (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Je réserve le vendredi après-midi au travail personnel sur le Dossier Professionnel.",
  "Les jours de formation, je suis disponible de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; mon responsable a réorganisé les plannings de l'équipe en conséquence.",
  "Je suis disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. J'habite à 25 minutes du centre, le trajet ne pose pas de difficulté.",
  "Je suivrai les séances en journée (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Je prévois une à deux heures par semaine en soirée pour reprendre les exercices.",
  "Aucune contrainte sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. J'ai prévenu mes clients habituels de mes jours d'absence.",
];

/** Réponses d'évaluation des besoins propres au RNCP38575, différentes pour chaque stagiaire. */
export function getRPMSEvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = rpmsSeed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilRPMS(idx, s.nom, s.prenom);
  const pick = (arr: string[], sel: number) => accorder(arr[rang(base, sel, arr.length)], fem);
  const ent = (txt: string) =>
    accorder(
      txt
        .replace(/\{un\}/g, fem ? "une" : "un")
        .replace(/\{collab\}/g, fem ? "collaboratrice" : "collaborateur")
        .replace(/\{le_sal\}/g, fem ? "la salariée" : "le salarié")
        .replace(/\{la_future\}/g, fem ? "la future responsable" : "le futur responsable")
        .replace(/\{notre_futur\}/g, fem ? "notre future dirigeante" : "notre futur dirigeant"),
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
      ? "Formation prise en charge par l'OPCO de l'entreprise."
      : "Financement personnel",
    projetPro: ent(profil.projet),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
