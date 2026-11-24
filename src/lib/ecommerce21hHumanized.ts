// ---------------------------------------------------------------------------
// « Créer et développer une e-boutique professionnelle (RS6475) – 21 h » — moteur de réponses HUMANISÉES
// Formation certifiante (Répertoire spécifique RS6475, certificateur DIDACTIZ) : 21 h sur 4 semaines,
// 6 classes virtuelles de 3 h 30 (09h00 – 12h30), 100 % à distance.
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes…), puis parcours /
//     diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes, dans l'ordre des 10 mises en situation, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par mise en situation + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Inès et sa boutique « Lueur d'Inès », citées dans les copies, sont FICTIVES (fil rouge du support de cours).
// ---------------------------------------------------------------------------

const normalize = (s?: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Créer et développer une e-boutique professionnelle (RS6475) – 21 h ».
 * Vrai si : le code RS6475 est saisi, ou l'intitulé contient « RS6475 », ou l'intitulé contient à la fois
 * « e-boutique » et la durée de 21 heures (« 21 h », « 21h », « 21 heures »). Accents et casse indifférents.
 * Jamais pour : un autre code de répertoire saisi, un intitulé « e-commerce » quelconque sans RS6475 ni
 * « e-boutique 21 h », le webmarketing, la création d'entreprise, le titre de négociateur technico-commercial,
 * le CRM, les réseaux sociaux, un bilan de compétences ou une VAE.
 * À tester AVANT les règles génériques « e-commerce », « web », « commerce ».
 */
export function isECO21Formation(intitule?: string, code?: string): boolean {
  const c = (code || "").toUpperCase().replace(/\s/g, "");
  if (c === "RS6475") return true;
  const t = normalize(intitule).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[^a-z0-9']+/g, " ").trim();
  if (!t) return false;
  if (/^R[N]CP\d|^R[S]\d/.test(c)) return false;
  if (/\brs ?6475\b/.test(t)) return true;
  if (/\b(webmarketing|creation d'entreprise|negociateur|crm|reseaux sociaux|bilan de competences|vae)\b/.test(t)) return false;
  return /\be boutiques?\b/.test(t) && /\b21 ?h(eures?)?\b/.test(t);
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function eco21Seed(nom?: string, prenom?: string): number {
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
  typeof idx === "number" && idx >= 0 ? idx : eco21Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// plateforme et arborescence, fiche produit, paramétrage et obligations, référencement, réseaux sociaux et
// publicité, accessibilité, stocks et livraison, statistiques, fidélisation, RGPD et sécurité
// ---------------------------------------------------------------------------
export const ECO21_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Quelle solution envisagez-vous pour créer votre boutique en ligne, et comment l'organiseriez-vous ?", reponseAttendue: "Comparaison argumentée de Shopify, WooCommerce (WordPress) et PrestaShop selon la prise en main, le coût, la personnalisation et la maintenance ; arborescence claire (catégories, pages légales, contact) et parcours d'achat simple." },
    { question: "Selon vous, qu'est-ce qui donne envie d'acheter sur une fiche produit ?", reponseAttendue: "Titre précis, description utile, caractéristiques et prix TTC visibles, photos de qualité avec texte alternatif, disponibilité, frais et délais de livraison, réassurance et bouton d'action explicite." },
    { question: "Que faut-il paramétrer et afficher avant d'ouvrir une boutique en ligne ?", reponseAttendue: "Paiement sécurisé avec authentification forte, modes et frais de livraison, mentions légales (LCEN), CGV, information précontractuelle, droit de rétractation de 14 jours, garantie légale de conformité, médiateur de la consommation, politique de confidentialité et cookies." },
    { question: "Comment feriez-vous pour que votre boutique soit trouvée sur Google ?", reponseAttendue: "Choix de mots-clés selon l'intention de recherche, dont la longue traîne ; balises title et meta description ; contenus utiles et structurés ; Google Search Console pour l'indexation et le suivi des requêtes." },
    { question: "Comment comptez-vous faire connaître votre boutique sur les réseaux sociaux et par la publicité ?", reponseAttendue: "Choix d'un ou deux réseaux adaptés à la cible ; planning de publication avec thèmes, formats et dates ; campagne publicitaire avec objectif, cible, budget et indicateur suivi ; emailing dans le respect du consentement." },
    { question: "Que savez-vous de l'accessibilité d'un site pour les personnes en situation de handicap ?", reponseAttendue: "RGAA 4.1 fondé sur les WCAG 2.1 ; contrastes, textes alternatifs, navigation au clavier, formulaires étiquetés, vidéos sous-titrées ; European Accessibility Act applicable au commerce électronique depuis le 28 juin 2025, avec exemption des microentreprises de services." },
    { question: "Comment éviteriez-vous de vendre un produit que vous n'avez plus en stock ?", reponseAttendue: "Suivi des stocks dans la plateforme, stock de sécurité et point de commande, alertes de stock bas, mise en indisponibilité automatique, anticipation des pics saisonniers, information du client en cas de retard." },
    { question: "Comment sauriez-vous si votre boutique et vos actions de communication fonctionnent ?", reponseAttendue: "Outil de mesure d'audience (Google Analytics 4 ou Matomo) et Search Console ; sessions, sources de trafic, taux de conversion, panier moyen, abandons de panier ; tableau de bord et ajustements." },
    { question: "Comment donneriez-vous envie à vos clients de revenir commander ?", reponseAttendue: "Segmentation des clients, actions adaptées à chaque segment, avis clients, messages commerciaux dans le respect du consentement, indicateurs de fidélité suivis dans le temps." },
    { question: "Quelles données de vos clients devrez-vous protéger, et comment ?", reponseAttendue: "RGPD et loi Informatique et Libertés : finalités, registre, durées de conservation, droits des personnes, cookies avec consentement ; comptes nominatifs, double authentification, mises à jour, sauvegardes, données de carte confiées à un prestataire conforme PCI DSS ; conduite à tenir en cas de fuite." },
  ],
  fin: [
    { question: "Quelle plateforme avez-vous retenue pour votre boutique, et quelle arborescence avez-vous construite ?", reponseAttendue: "Plateforme choisie et argumentée (prise en main, coût, personnalisation, maintenance) ; arborescence logique avec catégories, pages légales, contact et accessibilité ; parcours d'achat court et clair." },
    { question: "Comment rédigez-vous une fiche produit attrayante et lisible par tous ?", reponseAttendue: "Titre précis, description orientée bénéfices puis caractéristiques, prix TTC, disponibilité, livraison et retours, photos avec textes alternatifs utiles, réassurance, bouton nommé explicitement et utilisable au clavier." },
    { question: "Quels paramétrages et quelles pages légales avez-vous mis en place avant l'ouverture ?", reponseAttendue: "Paiement sécurisé avec DSP2 et 3-D Secure, données de carte confiées au prestataire ; livraison et frais affichés avant la commande ; mentions légales LCEN, CGV, information précontractuelle, rétractation de 14 jours, garantie légale de conformité de 2 ans, médiateur ; extensions limitées et testées." },
    { question: "Quelle stratégie de référencement naturel appliquez-vous à votre boutique ?", reponseAttendue: "Mots-clés choisis selon l'intention de recherche, dont des expressions de longue traîne et locales ; balises title et meta description uniques ; contenus et liens internes ; sitemap soumis et indexation suivie dans Google Search Console." },
    { question: "Quel plan de communication sur les réseaux sociaux et quelle publicité avez-vous prévus ?", reponseAttendue: "Réseaux choisis selon la cible ; planning de publication daté avec thèmes et formats ; campagne avec objectif, cible, budget, durée et indicateur ; outils de programmation et de création ; emailing conforme au consentement." },
    { question: "Comment avez-vous vérifié et amélioré l'accessibilité de votre boutique ?", reponseAttendue: "Tests au clavier, contrastes, textes alternatifs, formulaires, sous-titres ; corrections selon les critères du RGAA 4.1 ; situation de l'entreprise au regard de l'European Accessibility Act ; déclaration d'accessibilité." },
    { question: "Comment gérez-vous vos stocks et vos livraisons pour éviter les ruptures ?", reponseAttendue: "Point de commande = consommation pendant le délai de réapprovisionnement + stock de sécurité ; alertes et mise en indisponibilité automatique ; anticipation des fêtes ; préparation vérifiée, suivi de colis, information du client et solutions en cas de retard." },
    { question: "Quels indicateurs statistiques suivez-vous et comment les interprétez-vous ?", reponseAttendue: "Sessions et sources de trafic, taux de conversion global et par source, panier moyen, abandons de panier ; lecture dans Google Analytics 4 ou Matomo et Search Console ; ajustements décidés à partir des chiffres." },
    { question: "Quelles actions de fidélisation avez-vous construites à partir des données ?", reponseAttendue: "Segments de clients, action adaptée à chaque segment, recueil et réponse aux avis, indicateurs de fidélité suivis, respect du consentement et des durées de conservation." },
    { question: "Quelles mesures RGPD et de sécurité appliquez-vous à votre boutique ?", reponseAttendue: "Registre des traitements, politique de confidentialité, bandeau de cookies conforme aux recommandations de la CNIL, comptes nominatifs et double authentification, mises à jour et sauvegardes, vigilance face à l'hameçonnage, notification à la CNIL dans les 72 heures en cas de violation à risque." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle.
// Aucune réponse à 1 au début : au plus 5 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — plateforme et arborescence
  [
    ["J'ai entendu parler de Shopify, je crois que c'est simple, mais je ne connais pas les autres solutions.", 0.5],
    ["Je pensais vendre seulement sur les réseaux sociaux, sans site.", 0],
    ["Je compte utiliser WordPress, mais je ne sais pas comment y ajouter une boutique.", 0.5],
    ["Je ne sais pas ce qu'est une plateforme de e-commerce.", 0],
    ["Je ferai des catégories de produits et une page de contact, sans plus de détails.", 0.5],
    ["Je mettrai tous mes produits sur une seule page, ce sera plus simple.", 0],
    ["Je sais qu'il existe des solutions payantes par abonnement et d'autres à installer soi-même.", 0.5],
    ["Un ami développeur fera tout, je n'ai pas besoin de comprendre.", 0],
    ["J'hésite entre PrestaShop et Shopify, sans savoir lequel me convient.", 0.5],
    ["Je copierai le site d'un concurrent.", 0],
    ["Il faudrait un menu clair et un panier facile à trouver, je pense.", 0.5],
    ["Je ne sais pas par où commencer.", 0],
  ],
  // Q2 — fiche produit
  [
    ["De belles photos, c'est le plus important.", 0.5],
    ["Le prix le plus bas possible, le reste ne compte pas.", 0],
    ["Une description qui explique comment utiliser le produit.", 0.5],
    ["Je ne sais pas, je mettrai juste le nom et le prix.", 0],
    ["Le prix et les frais de livraison visibles tout de suite.", 0.5],
    ["Beaucoup d'animations pour attirer l'œil.", 0],
    ["Les avis des autres clients, je regarde toujours ça.", 0.5],
    ["Un texte très long avec tous les mots-clés possibles.", 0],
    ["Plusieurs photos sous différents angles.", 0.5],
    ["Rien de particulier, les clients savent ce qu'ils veulent.", 0],
    ["Savoir si le produit est disponible et quand il arrivera.", 0.5],
    ["Je mettrai la description dans une image pour que ce soit joli.", 0],
  ],
  // Q3 — paramétrage et obligations
  [
    ["Il faut un moyen de paiement par carte, je ne sais pas lequel.", 0.5],
    ["Rien de spécial, on met les produits en ligne et c'est tout.", 0],
    ["Je sais qu'il faut des mentions légales, sans savoir ce qu'elles contiennent.", 0.5],
    ["Les conditions générales de vente ne sont obligatoires que pour les grandes entreprises.", 0],
    ["Les clients peuvent renvoyer un produit acheté en ligne, je crois sous quelques jours.", 0.5],
    ["Je n'accepterai aucun retour.", 0],
    ["Il faut choisir un transporteur et afficher les frais de port.", 0.5],
    ["Je ne connais aucune obligation.", 0],
    ["Je crois qu'il faut une page sur les données personnelles.", 0.5],
    ["Le paiement en espèces à la livraison suffira.", 0],
    ["Je sais qu'il existe une garantie, sans en connaître la durée.", 0.5],
    ["Je mettrai les prix hors taxes, comme mon fournisseur.", 0],
  ],
  // Q4 — référencement naturel
  [
    ["Il faut payer Google pour apparaître, je crois.", 0],
    ["Il faut utiliser les bons mots-clés dans les textes.", 0.5],
    ["Je ne sais pas ce qu'est le référencement.", 0],
    ["J'ai entendu parler du SEO, sans savoir comment ça marche.", 0.5],
    ["Le site apparaîtra tout seul dès qu'il sera en ligne.", 0],
    ["Écrire des articles de blog aide à être trouvé, d'après ce que j'ai lu.", 0.5],
    ["Je répéterai le nom de ma marque partout.", 0],
    ["Il existe un outil de Google pour suivre son site, mais je ne l'ai jamais utilisé.", 0.5],
    ["Je compte uniquement sur le bouche-à-oreille.", 0],
    ["Le titre des pages doit être clair, je pense.", 0.5],
    ["Le référencement ne concerne que les gros sites.", 0],
    ["Il faut que le site soit rapide sur mobile, je crois que ça compte.", 0.5],
  ],
  // Q5 — réseaux sociaux et publicité
  [
    ["Je publierai sur Instagram de temps en temps.", 0.5],
    ["Je serai présent{e} sur tous les réseaux, tous les jours.", 0],
    ["J'ai déjà une page Facebook pour mon activité.", 0.5],
    ["Je ne sais pas comment fonctionne la publicité en ligne.", 0],
    ["Je pense faire une petite publicité payante au lancement.", 0.5],
    ["J'achèterai un fichier d'adresses pour envoyer des courriels.", 0],
    ["Il faudrait prévoir ce qu'on publie à l'avance, mais je ne l'ai jamais fait.", 0.5],
    ["Les réseaux sociaux ne servent à rien pour vendre.", 0],
    ["Je ferai des visuels avec Canva, je connais un peu.", 0.5],
    ["Je publierai seulement quand j'aurai le temps.", 0],
    ["Je voudrais cibler les personnes de ma région.", 0.5],
    ["Je dépenserai tout mon budget le premier jour.", 0],
  ],
  // Q6 — accessibilité
  [
    ["Je n'y ai jamais pensé.", 0],
    ["Il faut des textes assez grands et bien contrastés, je pense.", 0.5],
    ["L'accessibilité concerne seulement les bâtiments.", 0],
    ["Je sais que les personnes aveugles utilisent un logiciel qui lit les pages.", 0.5],
    ["Ce n'est pas utile, mes clients n'ont pas de handicap.", 0],
    ["J'ai entendu parler d'une loi européenne récente, sans en connaître le contenu.", 0.5],
    ["Je ne sais pas ce que veut dire RGAA.", 0],
    ["Les vidéos devraient avoir des sous-titres.", 0.5],
    ["Un site accessible est forcément moche.", 0],
    ["Il faut pouvoir naviguer sans souris, je crois.", 0.5],
    ["C'est au développeur de s'en occuper, pas à moi.", 0],
    ["Les images doivent avoir une description, je l'ai lu quelque part.", 0.5],
  ],
  // Q7 — stocks et livraison
  [
    ["Je regarde mon stock à la main de temps en temps.", 0.5],
    ["Je vendrai et je fabriquerai après, on verra.", 0],
    ["La plateforme doit pouvoir indiquer quand un produit est épuisé.", 0.5],
    ["Je ne sais pas.", 0],
    ["Je garderai toujours un peu d'avance sur les produits qui se vendent le mieux.", 0.5],
    ["Si je n'ai plus le produit, j'annulerai la commande sans prévenir.", 0],
    ["Il faut prévoir plus de stock avant Noël.", 0.5],
    ["Le stock ne m'inquiète pas, je fais tout sur commande sans délai.", 0],
    ["Je préviendrai le client s'il y a un retard.", 0.5],
    ["Le transporteur s'occupe de tout, ce n'est plus mon problème.", 0],
    ["Je noterai mes ventes dans un tableau pour savoir quand refaire un lot.", 0.5],
    ["Je n'ai jamais entendu parler de stock de sécurité.", 0],
  ],
  // Q8 — statistiques
  [
    ["Je regarderai mon chiffre d'affaires à la fin du mois.", 0.5],
    ["Je ne sais pas comment mesurer.", 0],
    ["J'ai entendu parler de Google Analytics, sans l'avoir utilisé.", 0.5],
    ["Si j'ai des likes, c'est que ça marche.", 0],
    ["Je compterai le nombre de visiteurs du site.", 0.5],
    ["Les statistiques, c'est trop compliqué pour moi.", 0],
    ["Je voudrais savoir d'où viennent mes visiteurs.", 0.5],
    ["Je ne pense pas que ce soit utile au début.", 0],
    ["Il existe un taux de conversion, mais je ne sais pas le calculer.", 0.5],
    ["Je me fierai à mon intuition.", 0],
    ["Je regarderai combien de personnes abandonnent leur panier.", 0.5],
    ["Je demanderai à mes amis s'ils aiment le site.", 0],
  ],
  // Q9 — fidélisation
  [
    ["Je ferai une carte de fidélité, comme sur les marchés.", 0.5],
    ["Les clients reviendront s'ils sont contents, je n'ai rien à faire.", 0],
    ["J'enverrai une newsletter de temps en temps.", 0.5],
    ["Je ne sais pas.", 0],
    ["Je mettrai un petit mot dans chaque colis.", 0.5],
    ["J'enverrai des promotions tous les jours à tout le monde.", 0],
    ["Je demanderai un avis après la livraison.", 0.5],
    ["La fidélisation, c'est pour les grandes marques.", 0],
    ["Je proposerai des nouveautés à chaque saison.", 0.5],
    ["Je baisserai mes prix en permanence.", 0],
    ["Je garderai le contact des clients qui commandent souvent.", 0.5],
    ["Je n'ai pas prévu de recontacter mes clients.", 0],
  ],
  // Q10 — RGPD et sécurité
  [
    ["Je sais qu'il existe le RGPD, sans connaître les règles.", 0.5],
    ["Les données de mes clients m'appartiennent, j'en fais ce que je veux.", 0],
    ["Il faut un mot de passe solide pour le site.", 0.5],
    ["Je ne sais pas ce qu'est une donnée personnelle.", 0],
    ["Il y a un bandeau de cookies sur tous les sites, je ne sais pas pourquoi.", 0.5],
    ["Je garderai les numéros de carte des clients pour aller plus vite.", 0],
    ["Je pense qu'il faut demander l'accord avant d'envoyer de la publicité par courriel.", 0.5],
    ["La sécurité, c'est l'affaire de la plateforme seulement.", 0],
    ["Il faudrait faire des sauvegardes, mais je ne l'ai jamais fait.", 0.5],
    ["Je partagerai mon mot de passe avec ceux qui m'aident, c'est plus pratique.", 0],
    ["Je crois que les clients peuvent demander la suppression de leurs données.", 0.5],
    ["Je n'ai rien à protéger, je suis une petite entreprise.", 0],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["J'ai choisi Shopify pour sa prise en main rapide et sa maintenance assurée par l'éditeur.", 1],
    ["J'ai retenu WooCommerce sur WordPress pour la liberté de personnalisation, en prévoyant les mises à jour et les sauvegardes.", 1],
    ["Mon arborescence : accueil, catégories, idées cadeaux, à propos, contact, et les pages légales en pied de page.", 1],
    ["J'ai comparé Shopify, WooCommerce et PrestaShop sur le coût, la prise en main et la maintenance.", 1],
    ["PrestaShop convient à mon catalogue large, mais demande plus de compétences techniques.", 0.5],
    ["Mon parcours d'achat va de la catégorie au paiement en peu d'étapes, avec une commande sans compte.", 1],
    ["J'ai prévu une page accessibilité et une page livraison et retours dans mon menu.", 0.5],
    ["Mon thème est choisi pour sa lisibilité sur mobile et ses contrastes.", 1],
    ["J'ai dessiné l'arborescence avant d'installer quoi que ce soit.", 0.5],
    ["Le choix de la plateforme dépend de mon budget, de mon autonomie technique et de mon catalogue.", 1],
    ["J'ai limité le menu à cinq entrées pour que la navigation reste simple.", 0.5],
    ["J'ai testé une version d'essai avant de choisir ma solution.", 0.5],
  ],
  [
    ["Ma fiche produit a un titre précis, une description utile, le prix TTC et la disponibilité.", 1],
    ["Chaque photo a un texte alternatif qui décrit l'information utile.", 1],
    ["J'affiche les frais et délais de livraison et les retours possibles sous 14 jours près du bouton.", 1],
    ["Le bouton s'appelle « Ajouter au panier » et fonctionne au clavier.", 1],
    ["Je commence la description par les bénéfices, puis les caractéristiques.", 1],
    ["J'ai trois photos par produit : seul, en situation, en détail.", 0.5],
    ["Les variantes sont choisies dans des listes utilisables au clavier.", 1],
    ["Les précautions d'emploi sont écrites en texte, pas dans une image.", 1],
    ["J'affiche les avis clients honnêtement, même les moins bons.", 0.5],
    ["Mes titres de fiches reprennent les mots-clés que les clients recherchent.", 0.5],
    ["La disponibilité n'est jamais indiquée seulement par une couleur.", 1],
    ["J'ai relu mes fiches avec la grille fournie en formation.", 0.5],
  ],
  [
    ["Le paiement passe par un prestataire conforme PCI DSS, avec l'authentification forte de la DSP2.", 1],
    ["Mes mentions légales LCEN, mes CGV et mon formulaire de rétractation sont en ligne.", 1],
    ["J'ai indiqué le médiateur de la consommation dans mes CGV.", 1],
    ["Les frais de livraison sont affichés avant la validation de la commande.", 1],
    ["Le client a 14 jours pour se rétracter et la garantie légale de conformité dure 2 ans.", 1],
    ["Je n'installe que les extensions utiles, testées sur une copie du site.", 1],
    ["J'ai deux modes de livraison : point relais et domicile.", 0.5],
    ["Ma politique de confidentialité et mon bandeau de cookies sont en place.", 0.5],
    ["L'information précontractuelle est donnée avant le paiement : prix TTC, frais, délais.", 1],
    ["J'utilise le client FTP seulement pour les fichiers du thème, avec une sauvegarde avant.", 0.5],
    ["Je ne stocke aucun numéro de carte sur mon site.", 1],
    ["J'ai fait une commande test complète avant l'ouverture.", 0.5],
  ],
  [
    ["J'ai choisi mes mots-clés selon l'intention de recherche, dont des expressions de longue traîne.", 1],
    ["Chaque page a une balise title et une meta description uniques.", 1],
    ["J'ai soumis mon sitemap dans Google Search Console et je suis l'indexation.", 1],
    ["J'ai ajouté des mots-clés locaux, avec le nom de ma ville.", 1],
    ["Mes catégories ont un texte d'introduction utile, pas une liste de mots-clés.", 1],
    ["J'écris un article par mois relié à un mot-clé et à une catégorie.", 1],
    ["Mes images ont des textes alternatifs, ce qui aide aussi le référencement.", 0.5],
    ["Je vérifie dans Search Console les requêtes qui amènent des visiteurs.", 1],
    ["J'ai ajouté des liens internes entre les fiches et les catégories.", 0.5],
    ["Mes adresses de pages sont courtes et lisibles.", 0.5],
    ["Je sais que le référencement naturel prend du temps et je le suis chaque mois.", 0.5],
    ["Mes pages sont rapides sur mobile, je l'ai vérifié.", 0.5],
  ],
  [
    ["Je publie sur Instagram et Facebook, deux à trois fois par semaine, selon mon planning de publication.", 1],
    ["Mon planning de publication alterne coulisses, produits, conseils et avis clients.", 1],
    ["Ma campagne a un objectif de ventes, une cible régionale, un budget réparti et un suivi du coût par clic.", 1],
    ["Je programme mes publications avec Meta Business Suite.", 1],
    ["Mes visuels sont faits avec Canva, dans ma charte graphique.", 0.5],
    ["Je n'envoie mes courriels qu'aux personnes qui ont accepté, avec un lien de désinscription.", 1],
    ["J'ai choisi deux réseaux plutôt que d'être partout.", 0.5],
    ["Mes publications renvoient vers les pages produits concernées.", 0.5],
    ["Je mesure les clics et les ventes de chaque campagne avant d'en relancer une.", 1],
    ["Mon calendrier éditorial est daté sur un mois.", 1],
    ["J'adapte le format à chaque réseau : photo, carrousel ou vidéo courte.", 0.5],
    ["J'ai prévu un message de lancement pour mes clients des marchés qui ont donné leur accord.", 0.5],
  ],
  [
    ["J'ai testé ma boutique au clavier et corrigé le menu qui ne s'ouvrait qu'au survol.", 1],
    ["J'ai renforcé les contrastes et ajouté les textes alternatifs, selon le RGAA.", 1],
    ["Le RGAA 4.1 s'appuie sur les WCAG 2.1 : je me sers de ses critères comme grille.", 1],
    ["L'European Accessibility Act s'applique depuis le 28 juin 2025 ; ma microentreprise est exemptée, mais je rends quand même mon site accessible.", 1],
    ["Mes vidéos de fabrication sont sous-titrées.", 0.5],
    ["Chaque champ de formulaire a une étiquette visible.", 1],
    ["J'ai écouté mes pages avec le lecteur d'écran de mon ordinateur.", 1],
    ["J'ai publié une déclaration d'accessibilité avec un contact pour signaler une difficulté.", 0.5],
    ["L'information n'est jamais donnée seulement par la couleur sur mon site.", 0.5],
    ["Je refais les tests après chaque changement de thème ou d'extension.", 1],
    ["L'accessibilité m'ouvre une clientèle plus large.", 0.5],
    ["Le texte reste lisible quand on l'agrandit fortement.", 0.5],
  ],
  [
    ["Point de commande = ventes pendant le délai de réapprovisionnement + stock de sécurité ; pour Inès, 80 bougies.", 1],
    ["Le suivi des stocks est activé, avec une alerte de stock bas par courriel.", 1],
    ["Un produit épuisé passe automatiquement en indisponible ou en précommande annoncée.", 1],
    ["J'augmente mon stock avant les fêtes de fin d'année.", 0.5],
    ["En cas de retard, je préviens le client et je propose un nouveau délai, un autre produit ou le remboursement.", 1],
    ["Chaque commande est vérifiée avec une liste de préparation avant l'envoi.", 1],
    ["J'envoie le numéro de suivi du colis au client.", 0.5],
    ["J'ai un emballage protecteur adapté à mes produits fragiles.", 0.5],
    ["Je calcule un stock de sécurité pour mes produits phares.", 1],
    ["Je propose le point relais et le domicile, avec des délais réalistes.", 0.5],
    ["Ma procédure de retour est simple et décrite dans les CGV.", 1],
    ["Je suis mes ventes par semaine pour lancer mes lots à temps.", 0.5],
  ],
  [
    ["Taux de conversion = commandes divisées par sessions ; panier moyen = chiffre d'affaires divisé par commandes.", 1],
    ["Je compare le taux de conversion de chaque source de trafic pour juger mes actions.", 1],
    ["J'utilise Matomo pour mesurer l'audience et Search Console pour l'indexation.", 1],
    ["J'ai configuré Google Analytics 4 pour suivre les achats.", 1],
    ["Les réseaux sociaux m'apportent des visites mais peu de ventes : j'ai changé mes messages.", 1],
    ["Je suis les paniers abandonnés et j'affiche les frais de port plus tôt.", 1],
    ["Mon tableau de bord mensuel reprend cinq indicateurs.", 0.5],
    ["Je décide de mes ajustements à partir des chiffres, pas de mon intuition.", 0.5],
    ["Je regarde les pages les plus vues et celles qu'on quitte vite.", 0.5],
    ["Je mesure le coût de chaque campagne au regard des ventes qu'elle apporte.", 1],
    ["J'ai appris à lire les requêtes de recherche dans Search Console.", 0.5],
    ["Je compare chaque mois au mois précédent.", 0.5],
  ],
  [
    ["J'ai trois segments : clients d'une commande, réguliers et inactifs, avec une action pour chacun.", 1],
    ["Je demande un avis après la livraison et je réponds à chaque avis avec courtoisie.", 1],
    ["Je suis la part des clients qui commandent à nouveau.", 1],
    ["Mes clients réguliers reçoivent les nouveautés en avant-première.", 1],
    ["J'envoie mes offres seulement aux clients qui ne s'y sont pas opposés, avec un lien de désinscription.", 1],
    ["Je mets un mot personnalisé et un conseil d'utilisation dans chaque colis.", 0.5],
    ["Je relance les clients inactifs avec une nouveauté de saison.", 0.5],
    ["Je compare le panier moyen des clients fidèles et des nouveaux clients.", 1],
    ["J'utilise les remarques des avis pour améliorer mes produits.", 0.5],
    ["J'ai lancé un parrainage simple entre clients.", 0.5],
    ["Je ne garde les données de prospection que pendant une durée définie.", 1],
    ["Mes actions de fidélisation ont un indicateur suivi chaque mois.", 0.5],
  ],
  [
    ["J'ai rédigé mon registre des traitements avec les finalités et les durées de conservation.", 1],
    ["Mon bandeau de cookies propose « Tout accepter » et « Tout refuser » de façon équivalente.", 1],
    ["Chaque personne qui m'aide a son propre compte, et j'ai activé la double authentification.", 1],
    ["Je fais des sauvegardes régulières et je mets à jour le site, le thème et les extensions.", 1],
    ["Je ne stocke aucune donnée de carte : le prestataire de paiement s'en charge.", 1],
    ["Ma politique de confidentialité explique les droits des clients et comment les exercer.", 1],
    ["Face à un courriel suspect, je ne clique pas et je vérifie directement sur la plateforme.", 0.5],
    ["En cas de fuite à risque, je notifie la CNIL dans les 72 heures.", 1],
    ["Je limite les données collectées à ce qui est nécessaire pour la commande.", 0.5],
    ["Mes mots de passe sont longs et différents pour chaque service.", 0.5],
    ["Je sais que le RGPD s'applique aussi aux petites entreprises.", 0.5],
    ["Aucun cookie publicitaire n'est déposé avant le choix du visiteur.", 1],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [54, 51, 45, 45, 4, 8, 57, 36, 47, 13];

export function getECO21AutoAnswers(
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
export function eco21NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6). */
export function eco21BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((eco21NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `eco21BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function eco21ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = eco21BonnesQcmDebut(n, idx, nom, prenom);
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
export function eco21NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
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
    besoin: "Ouvrir une boutique en ligne pour vendre ses créations artisanales au-delà des marchés et des salons.",
    objectif: "Je veux mettre en ligne une boutique complète, avec paiement et livraison, à la fin de la formation.",
    projet: "Elle me permettra de vendre toute l'année et dans toute la France.",
    attentes: "Il est attendu que {le_sal} mette en ligne une boutique opérationnelle et se présente à la certification.",
    missions: "Création de la boutique, mise en ligne du catalogue, paramétrage du paiement et de la livraison.",
    contribution: "Elle doit ouvrir un nouveau canal de vente à l'activité.",
  },
  {
    besoin: "Choisir la bonne plateforme de vente en ligne avant d'investir du temps et de l'argent.",
    objectif: "Mon objectif est de comparer Shopify, WooCommerce et PrestaShop et de choisir en connaissance de cause.",
    projet: "Elle m'aidera à éviter de changer de solution après quelques mois.",
    attentes: "Il est attendu que {le_sal} justifie le choix de sa plateforme au regard de son projet.",
    missions: "Étude des solutions, choix de la plateforme, installation et paramétrage de la boutique.",
    contribution: "Elle doit sécuriser l'investissement de départ.",
  },
  {
    besoin: "Rendre visible une boutique déjà en ligne qui reçoit très peu de visites.",
    objectif: "Je souhaite apprendre le référencement naturel et construire un planning de publication.",
    projet: "Elle me permettra d'augmenter le nombre de visiteurs et de commandes.",
    attentes: "Il est attendu que {le_sal} mette en œuvre une stratégie de marketing en ligne mesurable.",
    missions: "Référencement des pages, animation des réseaux sociaux, campagnes publicitaires ciblées.",
    contribution: "Elle doit améliorer le chiffre d'affaires de la boutique en ligne.",
  },
  {
    besoin: "Connaître les obligations légales du vendeur en ligne pour ouvrir sa boutique sans risque.",
    objectif: "Mon objectif est de rédiger mes mentions légales et mes CGV et de bien paramétrer le paiement.",
    projet: "Elle m'aidera à vendre en ligne en toute conformité.",
    attentes: "Il est attendu que {le_sal} ouvre une boutique conforme au droit de la consommation.",
    missions: "Rédaction des pages légales, paramétrage du paiement sécurisé, gestion des retours.",
    contribution: "Elle doit éviter les litiges avec les clients.",
  },
  {
    besoin: "Rendre sa boutique accessible aux personnes en situation de handicap.",
    objectif: "Je veux comprendre le RGAA et corriger les défauts d'accessibilité de mon site.",
    projet: "Elle me permettra d'accueillir tous les clients, sans exclure personne.",
    attentes: "Il est attendu que {le_sal} réalise un premier audit d'accessibilité et corrige les défauts majeurs.",
    missions: "Vérification de l'accessibilité, correction des fiches produits et des formulaires, déclaration d'accessibilité.",
    contribution: "Elle doit élargir la clientèle et améliorer l'image de l'entreprise.",
  },
  {
    besoin: "Créer une activité de vente en ligne après une période sans emploi.",
    objectif: "Mon objectif est de lancer ma boutique et d'obtenir la certification pour crédibiliser mon projet.",
    projet: "Elle m'aidera à devenir créat{/rice} d'entreprise dans le commerce en ligne.",
    attentes: "Il est attendu que {le_sal} présente un projet de boutique réaliste et se présente aux épreuves.",
    missions: "Construction du projet, création de la boutique, préparation du lancement.",
    contribution: "Elle doit permettre un retour à l'emploi par la création d'activité.",
  },
  {
    besoin: "Éviter les ruptures de stock et les retards de livraison qui génèrent des réclamations.",
    objectif: "Je souhaite organiser le suivi de mes stocks et fiabiliser mes expéditions.",
    projet: "Elle me permettra de tenir mes délais, même pendant les fêtes.",
    attentes: "Il est attendu que {le_sal} mette en place un suivi des stocks et une procédure d'expédition fiable.",
    missions: "Gestion des stocks, préparation des commandes, relation avec les transporteurs.",
    contribution: "Elle doit réduire les annulations et les réclamations.",
  },
  {
    besoin: "Comprendre les statistiques de sa boutique pour savoir quelles actions fonctionnent.",
    objectif: "Mon objectif est de lire Google Analytics 4 ou Matomo et de suivre un tableau de bord mensuel.",
    projet: "Elle m'aidera à dépenser mon budget de communication là où il est utile.",
    attentes: "Il est attendu que {le_sal} suive des indicateurs et ajuste ses actions à partir des chiffres.",
    missions: "Suivi de l'audience, analyse des sources de trafic, tableau de bord commercial.",
    contribution: "Elle doit améliorer la rentabilité des actions de communication.",
  },
  {
    besoin: "Développer la vente en ligne d'un commerce de proximité existant.",
    objectif: "Je veux proposer mes produits en ligne avec retrait en magasin et livraison.",
    projet: "Elle me permettra de compléter les ventes du magasin.",
    attentes: "Il est attendu que {le_sal} ouvre une boutique en ligne cohérente avec l'offre du magasin.",
    missions: "Mise en ligne du catalogue, gestion des commandes en ligne, retrait et livraison.",
    contribution: "Elle doit augmenter le chiffre d'affaires du commerce.",
  },
  {
    besoin: "Protéger les données de ses clients et se mettre en conformité avec le RGPD.",
    objectif: "Mon objectif est de rédiger ma politique de confidentialité, mon registre et de régler mon bandeau de cookies.",
    projet: "Elle m'aidera à rassurer mes clients sur l'usage de leurs données.",
    attentes: "Il est attendu que {le_sal} mette en conformité la boutique avec le RGPD et sécurise ses accès.",
    missions: "Registre des traitements, politique de confidentialité, gestion des cookies, sécurité des comptes.",
    contribution: "Elle doit prévenir les fuites de données et les sanctions.",
  },
  {
    besoin: "Fidéliser une clientèle en ligne qui commande une fois puis ne revient pas.",
    objectif: "Je souhaite construire des actions de fidélisation à partir des données de ma boutique.",
    projet: "Elle me permettra de stabiliser mes ventes d'un mois à l'autre.",
    attentes: "Il est attendu que {le_sal} mette en place des actions de fidélisation mesurées.",
    missions: "Segmentation des clients, courriels de fidélisation, gestion des avis.",
    contribution: "Elle doit augmenter la part des clients qui commandent à nouveau.",
  },
  {
    besoin: "Reprendre en main une boutique en ligne créée par un prestataire, sans dépendre de lui.",
    objectif: "Mon objectif est de savoir ajouter des produits, installer des extensions et mettre à jour le site.",
    projet: "Elle m'aidera à gérer seul{e} ma boutique au quotidien.",
    attentes: "Il est attendu que {le_sal} gère la boutique en autonomie.",
    missions: "Administration de la boutique, mises à jour, ajout de produits et d'extensions ciblées.",
    contribution: "Elle doit réduire les coûts de prestation et les délais d'intervention.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilECO21(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

function entAccords(txt: string, fem: boolean): string {
  return accorder(txt.replace(/\{le_sal\}/g, fem ? "la stagiaire" : "le stagiaire"), fem);
}

export function getECO21Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return entAccords(profilECO21(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production du stagiaire sur le cas d'Inès puis son propre projet
// Indices : 0 plateforme et arborescence, 1 fiche produit, 2 paiement, livraison et pages légales,
//           3 référencement naturel, 4 réseaux sociaux et publicité, 5 accessibilité, 6 stocks,
//           7 statistiques, 8 fidélisation, 9 RGPD et sécurité ; 8 productions par banque.
// La k-ième production de chaque banque suit le même stagiaire fictif : un stagiaire garde le même
// parcours d'un exercice à l'autre.
//   0 artisan·e créat·eur·rice · 1 commerçant·e de proximité · 2 demandeur·se d'emploi qui crée son activité
//   3 salarié·e chargé·e de la boutique de son employeur · 4 indépendant·e qui a déjà une boutique peu visible
//   5 porteur·se d'un projet de revente · 6 ancien·ne vendeur·se en magasin · 7 débutant·e en informatique
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Plateforme et arborescence
  [
    "Comme Inès, je fabrique moi-même mes produits. J'ai choisi Shopify parce que je débute seul{e} et que la maintenance est assurée. Mon arborescence : accueil, trois catégories, idées cadeaux, l'atelier, contact, et les pages légales en pied de page.",
    "J'ai un magasin et un site WordPress : WooCommerce est la plateforme la plus logique pour moi. J'ai repris l'arborescence d'Inès en ajoutant une page « Retrait en magasin ».",
    "Je ne connaissais aucune plateforme. Après la comparaison, je retiens Shopify pour la prise en main et je garde WooCommerce en tête si je veux plus de liberté. J'ai dessiné mon arborescence sur papier avant de commencer.",
    "Pour la boutique de mon employeur, j'ai comparé les trois plateformes sur le coût et la maintenance : PrestaShop convient à notre gros catalogue. J'ai proposé une arborescence par familles de produits.",
    "Ma boutique existe déjà, mais l'arborescence était confuse. J'ai réduit le menu à cinq entrées et regroupé mes produits en catégories claires, comme pour Lueur d'Inès.",
    "Pour mon projet de revente, la plateforme doit gérer beaucoup de variantes : j'ai choisi WooCommerce et listé les extensions nécessaires. Mon parcours d'achat tient en quatre étapes.",
    "J'ai travaillé en magasin : j'ai organisé mon arborescence comme les rayons d'une boutique, avec une recherche visible. Ma plateforme sera Shopify, pour démarrer vite.",
    "Je suis débutant{e} en informatique : j'ai choisi la plateforme la plus simple et un thème lisible sur mobile. Mon arborescence reste courte pour que la navigation soit facile.",
  ],
  // 1 — Fiche produit
  [
    "J'ai rédigé la fiche produit de la bougie Figuier : titre précis, description qui parle d'abord de l'ambiance, puis les caractéristiques, le prix TTC et la durée de combustion indicative.",
    "Sur ma fiche produit, j'ai ajouté le retrait en magasin, les frais de livraison et la disponibilité à côté du bouton « Ajouter au panier ».",
    "Je mettais la description dans une image ; j'ai appris que le texte doit être en texte. Ma fiche produit a maintenant trois photos avec un texte alternatif utile.",
    "Pour les fiches produits de mon employeur, j'ai créé un modèle commun : titre, bénéfices, caractéristiques, conseils, livraison et retours.",
    "J'ai réécrit mes anciennes descriptions trop courtes : chaque fiche produit indique désormais les caractéristiques essentielles et les précautions d'emploi.",
    "Mes fiches produits ont des variantes de taille et de couleur : je les ai rendues utilisables au clavier et je n'indique jamais la disponibilité seulement par une couleur.",
    "Comme en magasin, je réponds dans la fiche produit aux questions que les clients posent souvent : entretien, taille, délai de livraison.",
    "J'ai suivi la trame de fiche produit fournie : titre, description, prix TTC, photos avec texte alternatif, réassurance. C'est ma première fiche complète.",
  ],
  // 2 — Paiement, livraison et pages légales
  [
    "J'ai activé le paiement par carte avec un prestataire conforme : le client valide l'authentification forte dans l'application de sa banque. Mes CGV rappellent le droit de rétractation de 14 jours.",
    "J'ai paramétré deux modes de livraison : retrait en magasin et domicile, avec les frais affichés avant la validation. Mes mentions légales indiquent l'identité de l'entreprise et l'hébergeur.",
    "Je pensais que les CGV étaient réservées aux grandes entreprises ; j'ai rédigé les miennes avec l'information précontractuelle, la garantie légale de conformité de 2 ans et le médiateur de la consommation.",
    "Pour la boutique de mon employeur, j'ai vérifié que les numéros de carte ne sont jamais stockés : le paiement passe par le prestataire. J'ai aussi testé une commande complète avant l'ouverture.",
    "Ma boutique n'affichait pas les frais de livraison avant le paiement : c'est corrigé, et j'ai ajouté le formulaire de rétractation.",
    "Pour mon projet, j'installe seulement trois extensions utiles, testées sur une copie du site : avis clients, suivi des colis et bandeau de cookies. Les modes de livraison sont point relais et domicile.",
    "J'ai expliqué le droit de rétractation et la garantie légale de conformité en deux phrases simples, comme je le faisais au comptoir du magasin.",
    "J'ai suivi la check-list d'ouverture : mentions légales, CGV, paiement sécurisé, livraison, politique de confidentialité. Il me manquait le médiateur, je l'ai ajouté.",
  ],
  // 3 — Référencement naturel
  [
    "Mes mots-clés : « bougie artisanale », « savon fait main », et deux expressions de longue traîne avec le nom de ma ville. Ma balise title reprend le mot-clé principal de la catégorie.",
    "J'ai ajouté le nom de mon quartier dans mes mots-clés pour le référencement local, et j'ai rédigé une meta description unique pour chaque catégorie.",
    "Je ne savais pas ce qu'était le référencement naturel. J'ai validé mon site dans Google Search Console et soumis le sitemap ; je suis maintenant l'indexation de mes pages.",
    "Pour mon employeur, j'ai rédigé un texte d'introduction pour chaque catégorie autour d'un mot-clé, avec des liens internes vers les fiches.",
    "Search Console m'a montré que mes pages n'étaient pas toutes indexées : j'ai corrigé le sitemap et réécrit les balises title de mes catégories.",
    "Pour la revente, je choisis mes mots-clés selon l'intention de recherche : les expressions précises de longue traîne attirent des visiteurs prêts à acheter.",
    "J'ai prévu un article de blog par mois relié à un mot-clé, sur les questions que mes clients me posaient en magasin.",
    "J'ai appris à remplir la balise title et la meta description dans ma plateforme. Mes mots-clés sont notés dans un tableau avec la page cible.",
  ],
  // 4 — Réseaux sociaux et publicité
  [
    "J'ai choisi Instagram et Facebook, adaptés à mes produits visuels. Mon planning de publication prévoit deux à trois posts par semaine : atelier, produits, conseils et avis.",
    "Je publie sur Facebook pour ma clientèle locale et je programme mes publications avec Meta Business Suite. Ma campagne publicitaire cible un rayon autour du magasin.",
    "Je ne savais pas comment fonctionne la publicité en ligne. J'ai paramétré une campagne avec un objectif de visites, une cible et un petit budget réparti sur deux semaines.",
    "Pour mon employeur, j'ai construit un planning de publication sur un mois et un calendrier éditorial partagé avec l'équipe.",
    "Mes publications n'avaient aucun lien vers la boutique ; maintenant chaque post renvoie vers la fiche concernée, et je suis le coût par clic de mes campagnes.",
    "Pour mon projet, je n'achète aucun fichier d'adresses : j'envoie mes courriels seulement aux personnes qui ont accepté, avec un lien de désinscription. Mes réseaux sont choisis selon ma cible.",
    "J'ai créé mes visuels avec Canva dans ma charte graphique et je publie selon mon planning, plutôt que quand j'ai le temps.",
    "Je commence avec un seul réseau social pour tenir le rythme ; mon planning de publication est noté dans un calendrier simple.",
  ],
  // 5 — Accessibilité
  [
    "Sur la page du savon, j'ai relevé six défauts d'accessibilité et proposé une correction pour chacun : contraste, texte alternatif, bouton nommé, menu au clavier, sous-titres, étiquette du champ quantité.",
    "J'ai testé mon site avec la touche Tabulation : le focus disparaissait sur le menu. Je l'ai signalé à mon prestataire avec le critère du RGAA concerné.",
    "Je ne connaissais pas le RGAA. J'ai retenu qu'il s'appuie sur les WCAG 2.1 et j'ai fait les trois tests simples sur ma future boutique.",
    "Pour mon employeur, qui compte plus de dix salariés, j'ai vérifié si l'European Accessibility Act s'applique : la boutique est concernée depuis le 28 juin 2025, et j'ai lancé un audit d'accessibilité.",
    "Mes vidéos de produits n'avaient pas de sous-titres ; c'est corrigé. J'ai aussi renforcé les contrastes pour respecter l'accessibilité.",
    "Ma microentreprise est exemptée de l'European Accessibility Act, mais je travaille quand même l'accessibilité de ma boutique : c'est attendu par la certification et cela élargit ma clientèle.",
    "En magasin, j'accueillais des clients malvoyants : j'ai écouté mes pages avec le lecteur d'écran et ajouté des textes alternatifs pour améliorer l'accessibilité.",
    "J'ai appliqué la grille d'audit d'accessibilité fournie : contrastes, textes alternatifs, clavier, formulaires. J'ai trouvé trois défauts à corriger.",
  ],
  // 6 — Stocks et livraison
  [
    "Pour Inès : 6 × 10 + 20 = 80 bougies de point de commande. Avec 95 en stock, elle relance un lot au plus tard le troisième jour. J'ai fait le même calcul pour mes produits phares.",
    "J'ai relié le stock du magasin et celui de la boutique pour ne pas vendre deux fois le même article ; une alerte de stock bas m'arrive par courriel.",
    "Je ne savais pas ce qu'était un stock de sécurité ; je l'ai calculé pour mes trois produits principaux et j'ai activé le suivi de stock dans la plateforme.",
    "Pour mon employeur, j'ai proposé un inventaire du stock chaque semaine, une liste de préparation vérifiée et l'envoi systématique du numéro de suivi, pour réduire les erreurs et les réclamations.",
    "Mes produits épuisés restaient en vente ; avec le suivi du stock, ils passent maintenant automatiquement en indisponible, et je préviens les clients en cas de retard.",
    "Pour la revente, mon délai de réapprovisionnement dépend du fournisseur : j'ai fixé un point de commande et un stock de sécurité pour chaque produit.",
    "J'ai prévu un stock plus important avant les fêtes et un emballage protecteur pour les produits fragiles.",
    "J'ai appris à calculer le point de commande avec un tableau simple : ventes par jour, délai, stock de sécurité.",
  ],
  // 7 — Statistiques
  [
    "Pour Inès : 40 commandes pour 2 000 sessions, soit un taux de conversion de 2 pour cent, et un panier moyen de 35 €. Les réseaux sociaux apportent des visites mais convertissent peu.",
    "Dans Google Analytics 4, je compare les sources de trafic de ma boutique : la recherche locale convertit le mieux, j'y concentre mes efforts.",
    "Je n'avais jamais lu de statistiques. Je sais maintenant calculer le taux de conversion et le panier moyen, et je les note chaque mois dans un tableau.",
    "Pour mon employeur, j'ai construit un tableau de bord avec les sessions, les sources, le taux de conversion et les paniers abandonnés.",
    "Mes statistiques montraient beaucoup de paniers abandonnés : j'ai affiché les frais de port plus tôt et simplifié la commande.",
    "J'utiliserai Matomo pour mesurer l'audience et Search Console pour suivre l'indexation et les requêtes.",
    "Je juge chaque campagne sur les ventes qu'elle apporte et sur son coût, pas sur les likes : les statistiques par source me servent à ajuster.",
    "J'ai appris à retrouver dans l'outil statistique le nombre de sessions et de commandes, et à calculer le taux de conversion.",
  ],
  // 8 — Fidélisation
  [
    "J'ai défini trois segments pour Inès : une commande, réguliers, inactifs. Pour la fidélisation, chacun reçoit un message adapté, et je suis la part des clients qui commandent à nouveau.",
    "Je fidélise mes clients du magasin et du site avec les nouveautés en avant-première et un petit mot dans chaque colis.",
    "Je n'avais pas prévu de recontacter mes clients ; j'ai construit un plan de fidélisation simple : remerciement, demande d'avis, nouveauté de saison.",
    "Pour mon employeur, j'ai proposé des indicateurs de fidélisation : taux de clients qui commandent à nouveau et panier moyen par segment.",
    "Mes avis clients étaient sans réponse ; je réponds désormais à chacun, ce qui participe à la fidélisation.",
    "Pour la fidélisation, je relance les clients inactifs seulement s'ils ne s'y sont pas opposés, avec un lien de désinscription.",
    "Comme en magasin, je connais mes clients fidèles : je leur propose un parrainage simple pour développer la fidélisation.",
    "J'ai commencé la fidélisation par une seule action : un courriel de remerciement avec un conseil d'utilisation après la première commande.",
  ],
  // 9 — RGPD et sécurité
  [
    "J'ai listé les traitements de données de la boutique d'Inès et leur finalité dans un registre. Chaque personne qui l'aide doit avoir son propre compte, avec la double authentification.",
    "Mon bandeau de cookies propose « Tout accepter » et « Tout refuser » de la même façon, et aucun cookie publicitaire n'est déposé avant le choix : c'est conforme au RGPD et aux recommandations de la CNIL.",
    "Je pensais n'avoir aucune donnée à protéger ; j'ai rédigé ma politique de confidentialité avec les droits des clients et les durées de conservation des données.",
    "Pour mon employeur, j'ai proposé des comptes nominatifs, des sauvegardes régulières et les mises à jour des extensions, pour éviter une fuite de données.",
    "J'ai reçu un faux courriel de « confirmation d'identifiants » : je n'ai pas cliqué et j'ai changé mon mot de passe. Je sais qu'en cas de fuite de données à risque, il faut notifier la CNIL dans les 72 heures.",
    "Pour mon projet, les données de carte ne passent jamais par mon site : le prestataire de paiement s'en charge. Je limite les données collectées au nécessaire.",
    "En magasin, je gardais les fiches clients sans limite ; j'applique désormais des durées de conservation et je respecte les demandes de suppression des données, comme le prévoit le RGPD.",
    "J'ai créé des mots de passe longs et différents et activé la double authentification. Mon registre des traitements de données est simple mais complet.",
  ],
];

const BILANS_PERSONNELS = [
  "Cette mise en situation m'a appris à justifier mes choix avec la règle ou le chiffre exact.",
  "Le plus difficile a été de tout faire dans le temps imparti ; je reprends l'exercice sur la plateforme e-learning.",
  "J'ai comparé ma réponse avec celle d'un autre stagiaire en sous-groupe, ce qui m'a fait corriger un oubli.",
  "Je vais appliquer cette méthode à ma propre boutique dès la semaine prochaine.",
  "Le corrigé du formateur m'a permis de repérer une erreur que je faisais sans le savoir.",
  "J'avais des doutes sur ce sujet en arrivant, je me sens maintenant capable de l'expliquer.",
  "Je me suis appuyé{e} sur le modèle fourni sur la plateforme e-learning, que je vais adapter à mon projet.",
  "Je n'ai pas eu le temps de tout détailler, mais l'essentiel est là.",
  "J'ai posé une question au formateur pendant la classe virtuelle, ce qui m'a évité une erreur.",
  "Je vais retravailler ce point avec les QCM d'entraînement avant les épreuves.",
  "Je dois encore revoir quelques notions, mais je sais où trouver les textes officiels.",
  "J'ai revu le replay de la séance pour compléter mes notes.",
];

/** Banque de la mise en situation à partir de son titre (ou de sa consigne), sinon de son rang. */
function blocExercice(contexte: string, exerciceIdx: number): number {
  const t = contexte || "";
  const num = t.match(/\bExercice\s+(\d{1,2})\b/i);
  if (num) {
    const n = parseInt(num[1], 10);
    if (n >= 1 && n <= EXERCICES_PRODUCTIONS.length) return n - 1;
  }
  if (/RGPD|s[ée]curis/i.test(t)) return 9;
  if (/fid[ée]lis/i.test(t)) return 8;
  if (/statistique|analytics|matomo/i.test(t)) return 7;
  if (/stock|rupture/i.test(t)) return 6;
  if (/accessib|RGAA/i.test(t)) return 5;
  if (/r[ée]seaux sociaux|publicit[ée]|planning/i.test(t)) return 4;
  if (/r[ée]f[ée]rencement|mots-cl[ée]s/i.test(t)) return 3;
  if (/paiement|livraison|l[ée]gal/i.test(t)) return 2;
  if (/fiche produit/i.test(t)) return 1;
  if (/plateforme|arborescence/i.test(t)) return 0;
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickECO21ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isECO21Formation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);
  const bloc = blocExercice(contexte || "", exerciceIdx);

  // Production tirée par permutation du rang du stagiaire, avec le même décalage pour toutes les
  // banques : un stagiaire garde le même parcours d'un exercice à l'autre, et sur un groupe de
  // 8 stagiaires les 8 productions d'un même exercice sont toutes différentes. Le bilan personnel
  // change d'un exercice à l'autre. L'entreprise du stagiaire est citée quand elle est renseignée.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[rang(stagiaireIdx, 3, pool.length)];
  const bilan = BILANS_PERSONNELS[rang(stagiaireIdx, bloc + 11, BILANS_PERSONNELS.length)];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai transposé la mise en situation à mon projet, au sein de ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "CAP Métiers d'art, puis activité de créat{/rice} artisanal{e}",
  "Baccalauréat professionnel Métiers du commerce et de la vente",
  "BTS Management commercial opérationnel",
  "Baccalauréat général",
  "BTS Négociation et digitalisation de la relation client",
  "Licence d'arts appliqués",
  "Aucun diplôme : plusieurs années d'expérience dans la vente en magasin",
  "Baccalauréat STMG",
  "DUT Techniques de commercialisation",
  "CAP Employé de vente spécialisé",
  "Master en communication",
  "Diplôme obtenu à l'étranger, puis expérience dans le commerce",
  "BTS Communication",
  "Brevet des collèges, puis expérience dans la logistique",
  "Licence professionnelle e-commerce et marketing numérique",
  "Baccalauréat professionnel Logistique",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant chaque séance.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières devant l'écran me conviennent.",
  "Non. Je porte des lunettes et j'apprécie des supports en police suffisamment grande.",
  "Non, pas de handicap. J'entends moins bien avec certains casques : j'aimerais pouvoir activer les sous-titres.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je lis plus lentement : j'apprécie de pouvoir revoir les replays des classes virtuelles.",
  "Non, aucune situation de handicap. Je préfère manipuler moi-même pendant les démonstrations.",
  "Non. Je préfère avoir les fiches en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté avant la formation.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible pour les 6 classes virtuelles, de <strong>09h00 à 12h30</strong>, sur les 4 semaines de la formation.",
  "J'ai bloqué les 6 classes virtuelles dans mon agenda (<strong>09h00 – 12h30</strong>) et je travaillerai sur la plateforme e-learning l'après-midi.",
  "Je suis disponible de <strong>09h00 à 12h30</strong> pour les 6 classes virtuelles, depuis un endroit calme avec une bonne connexion.",
  "Je peux suivre les 6 classes virtuelles de <strong>09h00 à 12h30</strong> sans contrainte particulière.",
  "Je suis disponible pour les 6 classes virtuelles (<strong>09h00 – 12h30</strong>) ; j'ai décalé mes rendez-vous après la formation.",
  "Disponibilité complète pour les 6 classes virtuelles, de <strong>09h00 à 12h30</strong>. J'ai fait le test de connexion proposé.",
  "Pour les 6 classes virtuelles, je suis disponible de <strong>09h00 à 12h30</strong> ; j'ai organisé la garde de mes enfants.",
  "Je suis disponible de <strong>09h00 à 12h30</strong> pour les 6 classes virtuelles, et je consulterai les replays si besoin.",
  "Je suivrai les 6 classes virtuelles (<strong>09h00 – 12h30</strong>) et je prévois de refaire les QCM d'entraînement le soir.",
  "Aucune contrainte pour les 6 classes virtuelles, de <strong>09h00 à 12h30</strong>. Mon employeur a validé mon absence.",
];

/** Réponses d'évaluation des besoins propres à la formation e-boutique 21 h, différentes pour chaque stagiaire. */
export function getECO21EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = eco21Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilECO21(idx, s.nom, s.prenom);
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
