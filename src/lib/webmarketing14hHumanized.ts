// ---------------------------------------------------------------------------
// « Développer son activité avec le webmarketing – 14 h » — moteur de réponses HUMANISÉES
// Formation professionnelle non certifiante : évaluation interne + attestation de fin de formation.
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
 * Vrai pour la formation exemple « Développer son activité avec le webmarketing – 14 h ».
 * L'ancien exemple « Développer son activité avec le webmarketing » (sans durée) garde son contenu
 * d'origine : seule la mention « 14 h » dans l'intitulé déclenche ce moteur.
 */
export function isWM14Formation(intitule?: string, code?: string): boolean {
  void code;
  const t = (intitule || "").toLowerCase();
  return t.includes("webmarketing") && /\b14\s?h\b/.test(t);
}

const normalize = (s: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function wm14Seed(nom?: string, prenom?: string): number {
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
  typeof idx === "number" && idx >= 0 ? idx : wm14Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// diagnostic, C1, C2, C3 plan, C3 emailing, C3 Google Ads, C4 audit, C4 éditorial/netlinking, C5, C6
// ---------------------------------------------------------------------------
export const WM14_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Comment décririez-vous aujourd'hui la présence en ligne de votre entreprise : site, fiche Google, réseaux sociaux, avis clients, outils de mesure ?", reponseAttendue: "Inventaire des points de contact (site mobile et sécurisé, fiche Google Business Profile, réseaux actifs ou abandonnés, annuaires, avis et réponses), cohérence nom / adresse / téléphone, comparaison avec les concurrents, présence ou absence de GA4 et de la Search Console." },
    { question: "Quels sont le positionnement, la cible et les objectifs webmarketing de votre entreprise ? Savez-vous formuler un objectif SMART ?", reponseAttendue: "Positionnement en une phrase (cible, catégorie, bénéfice, différence, preuve), personas fondés sur des données, parcours client en 4 étapes, objectifs spécifiques, mesurables, atteignables, réalistes et datés, reliés à la notoriété, à l'acquisition ou à la fidélisation." },
    { question: "Quels leviers d'acquisition en ligne connaissez-vous et comment choisiriez-vous ceux de votre entreprise et leur budget ?", reponseAttendue: "Site et SEO, SEO local, Google Ads, réseaux sociaux organiques et sponsorisés, emailing, contenus, avis, partenariats, places de marché ; avantages, limites, délai et coût de chacun ; choix selon le marché, la cible, le budget et le temps disponible ; budget incluant le temps interne valorisé et coût par acquisition visé." },
    { question: "Comment organiseriez-vous un plan d'action webmarketing dans le temps, et que savez-vous de l'accessibilité des contenus aux personnes en situation de handicap ?", reponseAttendue: "Actions par levier (quoi, qui, quand, coût, indicateur), planning ou Gantt avec jalons, charge compatible avec le temps disponible ; accessibilité : textes alternatifs, contrastes, titres hiérarchisés, sous-titres, liens explicites ; European Accessibility Act applicable depuis le 28 juin 2025, RGAA, WCAG." },
    { question: "Quelles règles connaissez-vous pour envoyer une newsletter ou un email commercial : constitution du fichier, consentement, désinscription, délivrabilité ?", reponseAttendue: "B2C : consentement préalable sauf clients existants pour des produits analogues ; B2B : information et droit d'opposition, message lié à la fonction ; lien de désinscription dans chaque envoi ; pas d'achat de fichier ; authentification SPF, DKIM, DMARC ; segmentation et scénarios automatisés." },
    { question: "Comment fonctionne une campagne Google Ads et comment éviteriez-vous de gaspiller votre budget ?", reponseAttendue: "Enchères sur des mots-clés, paiement au clic, structure campagne / groupes d'annonces / annonces ; types de correspondance, mots-clés négatifs, ciblage géographique et horaire, budget quotidien plafonné, annonces responsives, suivi des conversions et coût par conversion comparé à la marge." },
    { question: "Comment Google choisit-il les pages qu'il affiche, et comment vérifieriez-vous que votre site est bien indexé et techniquement en bonne santé ?", reponseAttendue: "Exploration, indexation, classement ; audit sémantique des requêtes par intention ; Search Console (pages indexées et exclues, sitemap), PageSpeed Insights, Core Web Vitals (LCP, INP, CLS), mobile, HTTPS, balises title et meta description, Hn, images." },
    { question: "Comment amélioreriez-vous le contenu de vos pages, les liens vers votre site et votre visibilité locale sur Google ?", reponseAttendue: "Title, meta description, H1 et H2 autour de la requête principale, contenu utile (E-E-A-T), maillage interne, données structurées ; calendrier éditorial ; netlinking éthique (annuaires sérieux, partenaires, presse locale) sans achat de liens ; fiche Google Business Profile complète et avis ; suivi Search Console et GA4." },
    { question: "Sur quels réseaux sociaux votre entreprise devrait-elle être présente, avec quel rythme, et que savez-vous des règles pour travailler avec un influenceur ?", reponseAttendue: "Choix des réseaux selon la cible (grand public et professionnel), ligne éditoriale (piliers, ton, formats, fréquence tenable), calendrier, modération ; influence : sélection sur l'audience et l'engagement, contrat écrit, mention « publicité » ou « collaboration commerciale » (loi du 9 juin 2023) ; suivi par liens UTM." },
    { question: "Comment mesurez-vous aujourd'hui les résultats de vos actions en ligne : trafic, contacts, ventes, coût ?", reponseAttendue: "GA4 avec événements clés, Search Console, statistiques des réseaux et de l'emailing ; tableau de bord de 8 à 10 KPI reliés aux objectifs ; coût par acquisition, ROI et ROAS en intégrant le temps interne ; décisions de renforcer, ajuster ou arrêter un levier." },
  ],
  fin: [
    { question: "Présentez le diagnostic de départ de la présence en ligne de votre entreprise et les priorités que vous en tirez.", reponseAttendue: "Inventaire daté et noté des points de contact, cohérence NAP, benchmark de 3 concurrents, position sur la recherche « activité + ville », état de la mesure (GA4, Search Console), 3 forces, 3 faiblesses et 3 priorités tirées des constats." },
    { question: "Quels positionnement, personas et objectifs SMART avez-vous définis pour votre entreprise ?", reponseAttendue: "Formule de positionnement complète et prouvée, personas fondés sur les clients réels avec leurs requêtes et leurs canaux, parcours client en 4 étapes, 3 objectifs SMART (notoriété, acquisition, fidélisation) avec indicateur, valeur cible et échéance." },
    { question: "Quels leviers avez-vous retenus, pourquoi, et avec quel budget ?", reponseAttendue: "Comparatif d'au moins 6 leviers, 3 à 4 leviers retenus et justifiés par la cible, le marché, le budget et le temps ; budget annuel ventilé (outils, publicité, prestataires, temps interne valorisé) ; estimation des résultats et coût par acquisition visé comparé à la marge." },
    { question: "Présentez votre plan d'action sur 6 mois, son planning et les mesures d'accessibilité prévues.", reponseAttendue: "Actions par levier avec responsable, échéance, coût et indicateur, fondations d'abord ; planning ou Gantt avec jalons ; au moins 6 mesures d'accessibilité (alt, contrastes, titres, sous-titres, formulaires, CamelCase) avec EAA depuis le 28 juin 2025, RGAA 4.1, WCAG niveau AA ; 3 risques et parades." },
    { question: "Comment avez-vous conçu votre campagne d'email marketing pour qu'elle soit conforme et efficace ?", reponseAttendue: "Base conforme au RGPD (consentement en B2C, opposition en B2B, preuve conservée), 3 segments, scénario de 3 emails avec objet, appel à l'action et délai, SPF, DKIM, DMARC, désinscription en un clic, indicateurs (délivrabilité, clic, conversion, désinscription, plainte) et seuils d'alerte." },
    { question: "Décrivez la campagne Google Ads de test que vous avez préparée et la règle de décision associée.", reponseAttendue: "Campagne sur le Réseau de Recherche, groupes thématiques, mots-clés en expression ou exacte, mots-clés négatifs, annonce responsive et composants, ciblage de la zone et des horaires, budget quotidien, stratégie d'enchères, conversion suivie avec Consent Mode v2, CTR, CPC, coût par conversion et règle écrite pour poursuivre ou arrêter." },
    { question: "Quels résultats a donnés l'audit sémantique et technique de votre site, et quelles corrections avez-vous priorisées ?", reponseAttendue: "Requêtes classées par intention avec page cible, arborescence cible, Core Web Vitals (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1), mobile, HTTPS, pages indexées et exclues, sitemap, robots.txt, balises, images ; corrections classées impact × effort." },
    { question: "Comment avez-vous optimisé une page stratégique, votre fiche Google et votre netlinking, et comment suivez-vous le référencement ?", reponseAttendue: "Title, meta description, H1/H2, contenu utile E-E-A-T, maillage, données structurées ; 6 contenus planifiés ; 10 sources de liens réalistes et pratiques proscrites ; fiche Google complète, réponse à tous les avis ; suivi mensuel clics, impressions, CTR, position, conversions GA4." },
    { question: "Présentez votre plan d'action réseaux sociaux et la collaboration avec un influenceur que vous avez préparée.", reponseAttendue: "2 ou 3 réseaux justifiés par la cible, piliers de contenu, ton, formats, fréquence, calendrier d'un mois, modération et réponse aux avis négatifs, micro-influenceur choisi sur l'audience et l'engagement, brief et contrat écrits, mention obligatoire (loi du 9 juin 2023), indicateurs et liens UTM suivis dans GA4." },
    { question: "Présentez votre tableau de bord et les décisions que vous en tirez.", reponseAttendue: "8 à 10 KPI reliés aux objectifs SMART, sessions par canal, événements clés GA4, taux de conversion, CPA = coût total (externe + temps interne) / conversions, ROI = (marge − coût) / coût, ROAS, limites de l'attribution, 3 décisions chiffrées et datées." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Ordre : diagnostic, C1, C2, C3 plan, C3 emailing, C3 Google Ads, C4 audit, C4 éditorial, C5, C6
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle, 1 = juste.
// Une seule réponse à 1 dans deux questions seulement (C1 et C3 emailing) : au plus 6 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — diagnostic de la présence en ligne
  [
    ["On a un site fait par un neveu il y a cinq ou six ans, je ne sais même plus qui a les codes. Pour le reste, une page Facebook que je n'alimente plus.", 0],
    ["J'ai une fiche Google, je crois, parce que des clients me disent qu'ils m'ont trouvé{e} sur Maps. Je ne l'ai jamais modifiée moi-même.", 0.5],
    ["Notre site existe, il est joli, mais je ne sais pas s'il nous apporte des clients. On n'a aucun outil pour le savoir.", 0.5],
    ["Je n'ai pas de site, je travaille uniquement avec Instagram et le bouche-à-oreille. Ça marche, mais ça plafonne.", 0],
    ["On est présents un peu partout : Facebook, Instagram, LinkedIn, un site, Pages Jaunes… mais rien n'est à jour en même temps. Les horaires ne sont pas les mêmes partout.", 0.5],
    ["Le site est sur Wix, je le mets à jour moi-même deux fois par an. Je ne sais pas ce que veut dire Search Console.", 0],
    ["Nous avons 23 avis Google avec 4,2 de moyenne, je n'ai jamais répondu à aucun. Je ne savais pas qu'il fallait le faire.", 0.5],
    ["Je n'ai jamais regardé ce que font les concurrents en ligne. Je suppose qu'ils font à peu près comme nous.", 0],
    ["Pour moi, la présence en ligne c'est surtout avoir un site. Je ne pensais pas que la fiche Google comptait autant.", 0],
    ["J'ai Google Analytics installé par l'agence qui a fait le site, mais je ne l'ouvre jamais et je ne sais pas si c'est encore l'ancienne version.", 0.5],
    ["Je projette de créer mon activité, donc pour l'instant je n'ai rien : ni site, ni page, ni fiche. Je pars de zéro.", 0],
    ["Quand je tape mon métier et ma ville sur Google, je n'apparais pas sur la première page. Je ne sais pas pourquoi les concurrents sont devant.", 0.5],
  ],
  // Q2 — C1 positionnement, cible, objectifs SMART
  [
    ["Ma cible, c'est tout le monde. Tous ceux qui ont besoin d'un plombier sont des clients potentiels.", 0],
    ["Mon objectif, c'est d'avoir plus de clients. Je n'ai jamais mis de chiffre dessus.", 0],
    ["SMART, je crois que c'est spécifique, mesurable… je ne me souviens plus de la suite.", 0.5],
    ["Je connais le mot persona, je ne saurais pas en construire un pour ma boutique.", 0],
    ["Nos clients sont surtout des femmes de 30 à 50 ans du quartier, mais je ne l'ai jamais écrit nulle part.", 0.5],
    ["Mon positionnement, c'est la qualité. Mais tous mes concurrents disent la même chose, donc je ne sais pas comment me différencier.", 0.5],
    ["Je voudrais « être plus visible sur internet ». Je me rends compte que ce n'est pas vraiment un objectif.", 0.5],
    ["Un objectif SMART doit être spécifique, mesurable, atteignable, réaliste et limité dans le temps, par exemple « 10 demandes de devis par mois d'ici juin ». Je n'en ai jamais posé pour mon entreprise.", 1],
    ["Pour moi, notoriété et acquisition c'est la même chose : se faire connaître pour vendre.", 0],
    ["J'ai deux types de clients, les particuliers et les entreprises, mais je leur parle exactement de la même façon.", 0.5],
    ["Le parcours client, je ne vois pas trop ce que ça recouvre. Le client nous appelle, on fait un devis, c'est tout.", 0],
    ["Mon objectif c'est 1 000 abonnés sur Instagram. Je ne sais pas si ça rapportera des clients.", 0],
  ],
  // Q3 — C2 leviers et budget
  [
    ["Je connais le SEO et la publicité Facebook, le reste je ne saurais pas le citer.", 0.5],
    ["Je pense que la publicité payante est la seule façon d'être vu quand on démarre.", 0],
    ["Je ne fais pas la différence entre SEO et SEA, pour moi c'est le même Google.", 0],
    ["On n'a pas de budget webmarketing. On dépense quand une occasion se présente, un encart ou un sponsoring.", 0],
    ["Je sais que le référencement naturel est gratuit mais lent, et que Google Ads est payant mais rapide. Je ne saurais pas choisir entre les deux.", 0.5],
    ["L'emailing, je pensais que c'était dépassé, que plus personne ne lisait les newsletters.", 0],
    ["J'ai payé 1 200 € une agence pour des publications sur les réseaux, je n'ai jamais su ce que ça avait rapporté.", 0.5],
    ["Mon temps passé sur Instagram, je ne le compte pas : c'est gratuit puisque c'est moi qui le fais.", 0],
    ["J'ai entendu parler des places de marché comme Amazon ou Etsy, je ne sais pas si c'est rentable pour un petit vendeur.", 0.5],
    ["Je ne vois pas comment fixer un budget. Je mettrais un montant au hasard, peut-être 100 € par mois.", 0],
    ["Les avis clients, pour moi ce n'est pas un levier, c'est juste une note.", 0],
    ["Je sais qu'il faut choisir les canaux où sont mes clients, mais je ne sais pas comment le vérifier.", 0.5],
  ],
  // Q4 — C3 plan d'action et accessibilité
  [
    ["Je publie quand j'ai le temps, souvent le dimanche soir. Il n'y a pas de plan.", 0],
    ["J'ai un agenda papier, j'y note parfois « faire un post ». C'est tout mon planning.", 0],
    ["Un diagramme de Gantt, j'en ai vu au travail pour des chantiers, jamais pour de la communication.", 0.5],
    ["L'accessibilité, pour moi, c'est la rampe pour les fauteuils dans le magasin. Je ne voyais pas le lien avec le site.", 0],
    ["Je sais qu'on peut mettre un texte sur les images pour les personnes malvoyantes, je ne l'ai jamais fait.", 0.5],
    ["Je pense que l'accessibilité numérique est obligatoire seulement pour les sites des administrations.", 0],
    ["J'ai entendu parler d'une directive européenne sur l'accessibilité en 2025, sans savoir si elle concerne une petite entreprise.", 0.5],
    ["Je fais des listes de choses à faire, mais sans dates ni responsable, donc ça glisse de semaine en semaine.", 0.5],
    ["Je mets des sous-titres sur mes vidéos parce que les gens regardent sans le son, pas pour l'accessibilité.", 0.5],
    ["Le plan d'action, je pensais le confier à une agence, je ne me sens pas capable de l'écrire moi-même.", 0],
    ["Je sais que le texte doit être assez contrasté sur le fond pour être lu, c'est à peu près tout ce que je sais.", 0.5],
    ["Je n'ai aucune idée du temps que prend chaque action, donc je ne sais pas ce qui est tenable pour moi.", 0],
  ],
  // Q5 — C3 email marketing et RGPD
  [
    ["J'envoie des promotions par mail à tous mes clients depuis ma boîte Gmail, en copie cachée. Je ne savais pas qu'il y avait des règles.", 0],
    ["Je sais qu'il faut un lien pour se désinscrire en bas des emails, c'est obligatoire je crois.", 0.5],
    ["Le RGPD, je sais que ça existe, j'ai ajouté une case à cocher sur le formulaire du site, sans savoir si c'est suffisant.", 0.5],
    ["Un prestataire m'a proposé d'acheter un fichier de 5 000 adresses d'entreprises. Je pensais que c'était autorisé.", 0],
    ["Pour les particuliers, il faut leur accord avant de leur envoyer de la prospection ; entre professionnels c'est plus souple, il faut surtout pouvoir s'opposer et que le message concerne leur métier. Je ne l'ai jamais mis en pratique.", 1],
    ["La délivrabilité, je ne sais pas ce que c'est. Je sais juste que certains de mes mails arrivent en spam.", 0],
    ["J'ai un compte Mailchimp gratuit créé il y a deux ans, je n'ai jamais envoyé de campagne.", 0],
    ["Je pense que si quelqu'un m'a donné sa carte de visite, je peux lui envoyer ma newsletter.", 0.5],
    ["Segmenter une liste d'emails, je ne vois pas ce que ça veut dire concrètement.", 0],
    ["Je sais qu'on regarde le taux d'ouverture, je ne connais pas les autres indicateurs.", 0.5],
    ["Les scénarios automatiques, je les reçois des grandes marques, je pensais que c'était réservé à elles.", 0],
    ["Je crois que le RGPD interdit complètement l'emailing commercial, c'est pour ça que je n'en fais pas.", 0],
  ],
  // Q6 — C3 Google Ads
  [
    ["Je crois qu'on paie Google pour être en haut, mais je ne sais pas si on paie à l'affichage ou au clic.", 0.5],
    ["J'ai déjà dépensé 400 € en un mois sur Google Ads avec une campagne créée en dix minutes ; j'ai eu des clics mais aucun appel.", 0.5],
    ["Je ne connais pas du tout Google Ads.", 0],
    ["Je pensais que plus on paie, plus le site remonte aussi dans les résultats naturels.", 0],
    ["Je sais qu'on choisit des mots-clés, je ne savais pas qu'on pouvait en exclure.", 0.5],
    ["J'ai reçu un bon de 400 € offert par Google, je ne l'ai jamais utilisé par peur de me faire prélever.", 0],
    ["Pour moi Google Ads et la publicité Facebook c'est la même chose.", 0],
    ["Je sais qu'on peut limiter la publicité à une zone autour de chez nous, je ne l'ai jamais fait.", 0.5],
    ["Un conseiller Google m'a appelé{e} pour me proposer de tout gérer, j'ai refusé parce que je ne comprenais rien.", 0],
    ["Je sais qu'il y a un budget quotidien, je ne sais pas comment on décide qu'une campagne est rentable.", 0.5],
    ["Je n'ai jamais su ce qu'était une conversion. Je regardais seulement les clics.", 0],
    ["Je pense qu'il faut au moins 1 000 € par mois pour que Google Ads serve à quelque chose.", 0],
  ],
  // Q7 — C4 fonctionnement de Google, indexation, technique
  [
    ["Je pense que Google classe les sites selon leur ancienneté. Les plus vieux sont devant.", 0],
    ["Je sais que Google passe sur les sites avec des robots, je ne sais pas ce qu'il fait ensuite.", 0.5],
    ["La Search Console, je ne connais pas.", 0],
    ["Je sais qu'un site lent ou mal affiché sur téléphone est moins bien classé, sans connaître les critères exacts.", 0.5],
    ["Pour savoir si mon site est sur Google, je tape son nom. S'il apparaît, c'est bon.", 0.5],
    ["Le cadenas dans la barre d'adresse, je sais que c'est la sécurité ; je ne sais pas si mon site l'a.", 0],
    ["J'ai entendu parler des Core Web Vitals dans un webinaire, je ne saurais pas dire ce qu'ils mesurent.", 0.5],
    ["Je pensais qu'il suffisait de mettre beaucoup de mots-clés dans les pages pour remonter.", 0],
    ["Un sitemap, c'est le plan du site, je crois. Je ne sais pas à qui on l'envoie.", 0.5],
    ["Je ne savais pas que certaines pages d'un site pouvaient ne pas être dans Google.", 0],
    ["Mon site a été fait par une agence, je pensais que le référencement était inclus automatiquement.", 0],
    ["Je sais que les gens tapent des recherches différentes selon ce qu'ils veulent, mais je n'ai jamais cherché lesquelles.", 0.5],
  ],
  // Q8 — C4 contenus, netlinking, référencement local
  [
    ["J'écris peu sur le site, je préfère mettre des photos. Je ne savais pas que le texte comptait autant.", 0],
    ["Le netlinking, je ne sais pas ce que c'est.", 0],
    ["J'ai reçu des offres pour acheter 500 liens à 49 €, j'ai hésité. Je ne savais pas si c'était risqué.", 0],
    ["Je sais qu'il faut que le titre de la page contienne ce que les gens cherchent, je ne sais pas où il se modifie.", 0.5],
    ["La fiche Google, je l'ai remplie au minimum : nom, adresse, téléphone. Pas de photos ni de publications.", 0.5],
    ["Je pense qu'il faut demander des avis aux clients, mais j'ai du mal à oser le faire.", 0.5],
    ["Je pensais que le blog servait à parler de l'entreprise, pas à répondre aux questions des clients.", 0],
    ["On est dans deux annuaires locaux, avec une ancienne adresse sur l'un des deux.", 0.5],
    ["Les liens d'autres sites vers le mien, je ne savais pas que Google en tenait compte.", 0],
    ["Je réponds aux avis négatifs, parfois un peu sèchement je l'avoue.", 0.5],
    ["Je ne vois pas comment un artisan pourrait obtenir des liens de journaux ou d'autres sites.", 0],
    ["J'ai copié les descriptions de produits de mon fournisseur sur le site, je ne sais pas si c'est un problème.", 0],
  ],
  // Q9 — C5 réseaux sociaux et influence
  [
    ["Je suis sur Facebook parce que tout le monde y est. Je ne me suis jamais demandé si mes clients y étaient.", 0],
    ["Je publie sur Instagram quand j'y pense, parfois trois fois dans la semaine, parfois rien pendant un mois.", 0.5],
    ["LinkedIn, pour moi c'est pour chercher du travail, pas pour une entreprise comme la mienne.", 0],
    ["Je sais que les vidéos courtes marchent mieux en ce moment, je n'ose pas me filmer.", 0.5],
    ["Un influenceur, je pensais qu'il suffisait de lui envoyer des produits gratuits.", 0],
    ["J'ai entendu parler d'une loi sur les influenceurs, je crois qu'il faut indiquer quand c'est payé.", 0.5],
    ["Je regarde le nombre de likes, c'est mon seul indicateur.", 0],
    ["Une ligne éditoriale, je ne sais pas ce que c'est.", 0],
    ["Je sais qu'on peut programmer les publications à l'avance avec Meta Business Suite, je ne l'utilise pas.", 0.5],
    ["Je pense qu'il faut être sur tous les réseaux pour ne rater personne, même TikTok.", 0],
    ["Quand quelqu'un laisse un commentaire négatif, je le supprime. Je ne savais pas que ce n'était pas conseillé.", 0],
    ["Ma cible est plutôt professionnelle, donc je me doute que LinkedIn serait mieux, mais je ne sais pas quoi y publier.", 0.5],
  ],
  // Q10 — C6 mesure et tableau de bord
  [
    ["Je ne mesure rien. Je vois juste si le mois a été bon ou pas sur le compte bancaire.", 0],
    ["Je demande parfois aux clients comment ils nous ont connus, sans noter les réponses.", 0.5],
    ["Google Analytics est installé, je crois, mais je ne me suis jamais connecté{e}.", 0],
    ["Je regarde les statistiques Instagram de temps en temps : abonnés et vues. Je ne sais pas ce qu'elles valent.", 0.5],
    ["Le ROI, je sais que c'est le retour sur investissement, je ne saurais pas le calculer pour un post Facebook.", 0.5],
    ["Je ne savais pas que l'ancienne version de Google Analytics avait disparu.", 0],
    ["J'ai un fichier Excel avec le chiffre d'affaires mensuel, rien sur l'origine des clients.", 0.5],
    ["Un KPI, c'est un indicateur, mais je ne saurais pas lesquels choisir pour mon activité.", 0.5],
    ["Je compte les appels reçus sur un carnet, sans savoir s'ils viennent du site ou de la fiche Google.", 0.5],
    ["Le tableau de bord, chez nous, c'est le relevé de caisse du soir.", 0],
    ["Je pense que le nombre de visites sur le site suffit pour savoir si ça marche.", 0],
    ["Je ne sais pas ce que veut dire taux de conversion.", 0],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["J'ai fait l'inventaire complet : site WordPress noté 2 sur 5 (pas de HTTPS sur deux pages, lent sur mobile), fiche Google 3 sur 5, Facebook abandonné depuis 2024, deux annuaires avec une ancienne adresse. Mes trois priorités : installer GA4 et la Search Console, corriger le NAP, compléter la fiche Google.", 1],
    ["Sur la recherche « coiffeur + ma ville », je suis 6e dans le pack local alors que deux concurrents ont trois fois plus d'avis. Ma faiblesse principale vient des avis, pas du site.", 1],
    ["Le benchmark de trois concurrents m'a montré qu'aucun ne publie sur LinkedIn : c'est une opportunité pour toucher les entreprises.", 1],
    ["Je sais maintenant distinguer les constats internes, comme un site lent, des éléments externes, comme un concurrent qui fait beaucoup de publicité.", 0.5],
    ["Mon diagnostic tient en un tableau : point de contact, URL, dernière mise à jour, note sur 5, action. Je le referai tous les six mois.", 1],
    ["Première priorité tirée du diagnostic : mettre en place la mesure. Sans GA4 ni Search Console, je ne pouvais pas savoir ce que rapportait le site.", 1],
    ["J'ai vérifié la cohérence nom, adresse, téléphone sur sept supports : trois étaient faux. Corrigés en une heure.", 1],
    ["J'ai noté chaque point de contact et repéré que la page Instagram, que je croyais secondaire, apporte la moitié des prises de rendez-vous.", 1],
    ["Je sais faire l'inventaire et le benchmark ; je dois encore progresser pour analyser la page de résultats Google concurrent par concurrent.", 0.5],
    ["Trois forces, trois faiblesses, trois priorités : chaque priorité répond à une faiblesse constatée, pas à une envie.", 1],
    ["Le diagnostic m'a fait fermer deux comptes inutiles plutôt qu'en ouvrir de nouveaux.", 0.5],
    ["Mes 41 avis Google ont maintenant tous une réponse, et la fiche affiche les bons horaires, les services et 20 photos récentes.", 1],
  ],
  [
    ["Positionnement : « Pour les propriétaires de maisons des années 70 autour d'Angers, nous sommes le plombier-chauffagiste qui remplace la chaudière par une pompe à chaleur en une semaine, contrairement aux réseaux nationaux, parce que nous gérons nous-mêmes le dossier d'aides. »", 1],
    ["J'ai construit deux personas à partir de mes vrais clients et de leurs questions : une cliente particulière de 45 ans et un gérant de syndic. Chacun a ses requêtes Google et ses réseaux.", 1],
    ["Mes trois objectifs SMART : 15 demandes de devis par mois via le site d'ici le 30 juin, 60 avis Google au 31 mars, 25 % de clients qui reviennent dans l'année.", 1],
    ["Le parcours client en quatre étapes m'a montré que je n'avais rien pour l'étape de considération : pas d'avis mis en avant, pas de réalisations.", 1],
    ["Je relie chaque objectif à un résultat : notoriété, acquisition ou fidélisation, avec un indicateur et une date.", 1],
    ["Je sais rédiger un objectif SMART ; le persona B2B me demande encore des données plus précises sur mes clients entreprises.", 0.5],
    ["Ma cible n'est plus « tout le monde » : ce sont les actifs du quartier de 25 à 45 ans qui réservent en ligne le soir.", 1],
    ["« 40 commandes en click & collect par mois d'ici le 31 mars » : spécifique, mesurable dans la caisse, atteignable avec 25 aujourd'hui, réaliste et daté.", 1],
    ["Je différencie maintenant notoriété, acquisition et fidélisation, et je sais lequel est prioritaire pour moi : l'acquisition.", 0.5],
    ["Les personas sont faits avec les vraies questions reçues par téléphone et dans les avis, pas avec mon imagination.", 1],
    ["Mon positionnement tient en une phrase avec une preuve : « préparé le matin même sur place ».", 1],
    ["Mon objectif de notoriété est mesuré par les recherches de mon nom dans la Search Console et la portée sur Instagram.", 1],
  ],
  [
    ["J'ai comparé huit leviers et retenu trois : fiche Google et SEO local, Instagram, et une newsletter mensuelle. Google Ads seulement en test plafonné, car ma zone est petite.", 1],
    ["Budget annuel : 1 900 € de coûts externes (outils, 600 € de publicité) et 3 h par semaine de mon temps valorisées à 35 €, soit environ 5 000 €. Je ne compte plus mon temps comme gratuit.", 1],
    ["Le SEO prend plusieurs mois mais coûte peu ; Google Ads apporte des clics tout de suite mais s'arrête avec le budget ; c'est pour ça que je les combine.", 1],
    ["J'ai estimé : 900 visites par mois × 2 % de conversion = 18 demandes, avec un coût par acquisition visé de 40 € pour une marge moyenne de 300 € par chantier.", 1],
    ["J'ai abandonné TikTok : ma cible n'y est pas et je n'ai pas le temps de produire des vidéos chaque jour.", 1],
    ["J'ai choisi LinkedIn et l'emailing B2B parce que mes clients sont des dirigeants de PME, pas des particuliers.", 1],
    ["Les avis clients sont devenus un levier à part entière : ils jouent sur le référencement local et sur la décision.", 1],
    ["Je sais comparer les leviers ; l'estimation du nombre de ventes reste approximative faute d'historique.", 0.5],
    ["Mon choix croise la cible, la concurrence sur les mots-clés, le budget de 2 400 € et mes 3 heures par semaine.", 1],
    ["Les médias propres, comme le site et la newsletter, sont ma priorité parce que je ne dépends pas d'un algorithme.", 0.5],
    ["J'ai gardé une réserve de 300 € pour tester la publicité sociale avant de décider d'aller plus loin.", 1],
    ["Pour la boutique en ligne, j'ai écarté Amazon : la commission de 15 % mange ma marge sur les petits paniers.", 1],
  ],
  [
    ["Mon plan sur six mois commence par les fondations : mesure, fiche Google, pages de services. Les contenus et la publicité viennent seulement au troisième mois.", 1],
    ["Chaque action a un responsable, une échéance, un coût et un indicateur. Le Gantt tient sur une page et je le revois le premier lundi du mois.", 1],
    ["Accessibilité : texte alternatif sur toutes les images, contrastes vérifiés, titres hiérarchisés, sous-titres sur les vidéos, formulaire étiqueté, hashtags en CamelCase.", 1],
    ["L'European Accessibility Act s'applique depuis le 28 juin 2025 ; je m'appuie sur le RGAA 4.1 et les WCAG niveau AA pour vérifier mes pages.", 1],
    ["J'ai identifié trois risques : manque de temps, publicité mal calibrée, publications irrégulières ; parades : une demi-journée de production par mois, budget plafonné, calendrier éditorial.", 1],
    ["J'ai calibré le plan sur 3 heures par semaine, ce que je peux réellement tenir à côté des chantiers.", 1],
    ["Je sais faire le plan et le planning ; je dois encore tester mon site au clavier et avec un lecteur d'écran.", 0.5],
    ["Les jalons du planning : mise en ligne des pages refaites fin novembre, première newsletter en janvier, bilan à trois mois en février.", 1],
    ["Je ne mets plus de texte important dans les images, et mes liens disent où ils mènent au lieu de « cliquez ici ».", 1],
    ["Les microentreprises de services sont exemptées de l'EAA, mais j'applique quand même les bonnes pratiques : c'est aussi meilleur pour le référencement.", 1],
    ["Mon plan d'action est découpé par levier, et chaque levier par mois.", 0.5],
    ["J'ai ajouté une vérification d'accessibilité avant chaque publication : alt, contraste, sous-titres, emojis limités.", 1],
  ],
  [
    ["En B2C, je recueille le consentement par une case non pré-cochée et je garde la preuve ; mes clients existants peuvent recevoir des offres sur des produits analogues s'ils ont pu s'y opposer.", 1],
    ["En B2B, le message doit être en rapport avec la fonction du destinataire, avec information et droit d'opposition ; je n'achète plus de fichier.", 1],
    ["Mon scénario de trois emails : bienvenue à J0, offre à J+3, relance à J+10, un seul appel à l'action par email.", 1],
    ["J'ai fait authentifier mon domaine avec SPF, DKIM et DMARC ; la désinscription se fait en un clic, comme l'exigent Gmail et Yahoo pour les envois en nombre.", 1],
    ["Trois segments : clients de l'année, anciens clients, prospects inscrits sans achat. Chacun reçoit un message différent.", 1],
    ["Je suis le taux de clic et la conversion plutôt que l'ouverture, faussée par la protection de la confidentialité d'Apple Mail.", 1],
    ["Mes seuils d'alerte : désinscription au-dessus de 0,5 %, plainte au-dessus de 0,1 %, délivrabilité sous 97 %.", 1],
    ["Je sais constituer une base conforme ; la configuration DMARC, je l'ai faite avec l'aide de mon hébergeur.", 0.5],
    ["Je supprime les adresses inactives depuis douze mois pour protéger la délivrabilité.", 1],
    ["Ma newsletter part depuis Brevo et non plus depuis ma boîte Gmail en copie cachée.", 0.5],
    ["Le formulaire d'inscription indique la finalité, la fréquence d'envoi et le lien vers la politique de confidentialité.", 1],
    ["Mon objet d'email fait moins de 45 caractères et annonce le bénéfice, pas le nom de l'entreprise.", 1],
  ],
  [
    ["Ma campagne de test : Réseau de Recherche uniquement, trois groupes d'annonces thématiques, chacun avec sa page de destination.", 1],
    ["J'utilise des mots-clés en expression ou exacte pour garder la main sur le budget, et 12 mots-clés négatifs comme gratuit, emploi, formation, tuto.", 1],
    ["Budget de 300 € sur un mois, soit 10 € par jour, diffusion de 7 h à 20 h et dans un rayon de 25 km.", 1],
    ["La conversion suivie est la demande de devis, importée depuis GA4, avec le Consent Mode v2 en place sur le site.", 1],
    ["Règle de décision : si le coût par demande de devis dépasse 45 € au bout d'un mois, j'arrête ou je corrige les annonces.", 1],
    ["Mon annonce responsive a 12 titres de 30 caractères maximum et 4 descriptions, avec les composants lieu, appel et liens annexes.", 1],
    ["Au démarrage, j'enchéris en « Maximiser les clics » avec un CPC plafonné, puis je passerai aux conversions quand j'en aurai assez.", 1],
    ["Je sais structurer une campagne ; le niveau de qualité et ses trois composantes me sont encore un peu flous.", 0.5],
    ["Je regarde CTR, CPC moyen, taux de conversion et coût par conversion, comparés à ma marge par client.", 1],
    ["Les termes de recherche sont relus chaque semaine pour ajouter des mots-clés négatifs.", 1],
    ["J'ai refusé la requête large proposée par défaut : sans historique de conversions, elle aurait dépensé le budget sur des recherches hors sujet.", 1],
    ["Je n'utilise plus le bon de 400 € au hasard : il servira pour la campagne de test, avec un suivi.", 0.5],
  ],
  [
    ["Google explore les pages, les indexe puis les classe. Mon audit sémantique a classé 20 requêtes par intention, chacune avec sa page cible.", 1],
    ["La Search Console m'a montré 14 pages exclues, dont 9 en « Explorée, actuellement non indexée » : des pages trop pauvres que je vais fusionner.", 1],
    ["Core Web Vitals : LCP de 3,8 s sur mobile, au-dessus des 2,5 s attendues ; INP de 140 ms, correct sous les 200 ms ; CLS de 0,02.", 1],
    ["L'INP a remplacé le FID en mars 2024 : il mesure la réactivité de la page quand on clique ou qu'on tape.", 1],
    ["Sitemap XML déclaré, robots.txt vérifié : il bloquait le dossier des images, je l'ai corrigé.", 1],
    ["Huit pages avaient le même title ; je les ai rendus uniques avec la requête principale de chaque page.", 1],
    ["J'ai classé les corrections par impact et effort : d'abord l'indexation et les titles, les images ensuite, le netlinking en dernier.", 1],
    ["Je fais la différence entre une recherche informationnelle, commerciale, transactionnelle et locale.", 0.5],
    ["Mon arborescence cible ajoute une page par service et une page par ville principale, et supprime trois pages en doublon.", 1],
    ["Je sais lire le rapport d'indexation ; les données structurées me demandent encore l'outil de test.", 0.5],
    ["Les images pesaient jusqu'à 4 Mo : compressées en WebP, la page d'accueil est passée de 5,1 à 2,4 s.", 1],
    ["Un seul H1 par page, des H2 qui suivent les questions des clients, et le HTTPS partout.", 1],
  ],
  [
    ["Page « pompe à chaleur Angers » : title de 56 caractères, meta description avec un bénéfice, un H1, cinq H2 tirés des questions clients, et le balisage LocalBusiness validé.", 1],
    ["J'ai planifié six contenus sur trois mois, chacun relié à une requête et à une étape du parcours client.", 1],
    ["Netlinking : annuaires sérieux, fournisseurs, club d'entreprises, presse locale, association de commerçants ; jamais d'achat de liens en masse, Google pénalise.", 1],
    ["Ma fiche Google a maintenant la bonne catégorie principale, les services, 25 photos et une publication par semaine ; je réponds à tous les avis sous 48 h.", 1],
    ["Je suis chaque mois les clics, impressions, CTR et position moyenne dans la Search Console, et les demandes de devis organiques dans GA4.", 1],
    ["J'écris des contenus qui montrent mon expérience réelle, avec des photos de chantiers : c'est ce que Google appelle E-E-A-T.", 1],
    ["Je ne copie plus les fiches produits du fournisseur : j'ai réécrit les 20 meilleures ventes.", 1],
    ["J'ai obtenu quatre liens en un mois : deux fournisseurs, le club d'entreprises et un article du journal local.", 1],
    ["Je sais optimiser une page ; je dois encore régulariser le rythme de publication sur le blog.", 0.5],
    ["Le maillage interne relie chaque article à la page de service correspondante avec un lien descriptif.", 1],
    ["Je demande un avis à chaque client satisfait par SMS le lendemain, avec le lien direct vers la fiche.", 0.5],
    ["Après deux mois, la page refaite est passée de la 18e à la 7e position sur sa requête principale.", 1],
  ],
  [
    ["J'ai choisi Instagram pour les particuliers et LinkedIn, page entreprise plus mon profil, pour les entreprises. J'ai fermé le compte TikTok.", 1],
    ["Ma ligne éditoriale repose sur quatre piliers : coulisses, réalisations, conseils, clients. Deux publications par semaine, tenables en une demi-journée de production par mois.", 1],
    ["Pour l'influence, j'ai choisi une micro-influenceuse locale de 6 000 abonnés avec un fort engagement, plutôt qu'un compte de 100 000 abonnés dispersés.", 1],
    ["Contrat écrit, brief écrit, et mention « Publicité » ou « Collaboration commerciale » visible, comme le prévoit la loi du 9 juin 2023.", 1],
    ["Face à un avis négatif, je réponds publiquement de façon factuelle et courtoise, puis je propose un échange en privé.", 1],
    ["Tous mes liens portent des paramètres UTM, source, medium et campaign, pour retrouver les visites et les conversions dans GA4.", 1],
    ["Mon calendrier d'un mois prévoit deux temps forts : la fête des pères et les portes ouvertes de l'atelier.", 1],
    ["Je suis la portée, le taux d'engagement, les clics et les demandes venues des réseaux, pas les likes seuls.", 1],
    ["Je sais construire la ligne éditoriale ; la vidéo courte reste un format où je manque d'aisance.", 0.5],
    ["Sur LinkedIn, je publie un post d'expertise par semaine et je commente les publications de mes clients.", 1],
    ["J'ai une charte de modération simple : délai de réponse de 24 h, pas de suppression sauf insultes.", 0.5],
    ["Je vérifie que l'influenceur ne fait pas la promotion de produits interdits et que son audience est bien dans ma zone.", 1],
  ],
  [
    ["Mon tableau de bord Looker Studio a neuf indicateurs reliés à mes objectifs : sessions par canal, demandes de devis, taux de conversion, coût par demande, avis, position moyenne…", 1],
    ["CPA = coût total du levier, temps interne compris, divisé par les conversions. Pour Google Ads : (300 € + 4 h × 35 €) / 9 demandes = 49 €.", 1],
    ["ROI = (marge générée − coût) / coût ; ROAS = chiffre d'affaires attribué / dépense publicitaire. Mon ROAS Google Ads est de 4,2.", 1],
    ["Dans GA4, les demandes de devis et les clics sur le téléphone sont déclarés comme événements clés.", 1],
    ["Le rapprochement ressources / résultats m'a fait réduire Facebook, qui me prenait 2 h par semaine pour une demande par mois.", 1],
    ["Je signale les limites de l'attribution : visiteurs qui refusent les cookies, clients qui voient Instagram puis appellent.", 1],
    ["Ma note mensuelle d'une page se termine par trois décisions chiffrées et datées.", 1],
    ["Je compare chaque mois à l'objectif et au mois précédent, avec un code couleur.", 0.5],
    ["Je sais construire le tableau de bord ; le calcul du ROI avec le temps interne me demande encore de vérifier mes chiffres.", 0.5],
    ["Le taux d'engagement de GA4 me sert plus que l'ancien taux de rebond pour juger une page.", 1],
    ["Décisions du premier bilan : renforcer la fiche Google, garder Google Ads à 10 € par jour, arrêter les publications Facebook.", 1],
    ["La Search Console et GA4 alimentent le tableau automatiquement ; je n'ajoute à la main que les données de la caisse.", 1],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [48, 51, 45, 10, 4, 58, 45, 36, 47, 42];

export function getWM14AutoAnswers(
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
export function wm14NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6, soit 4 à 12/20). */
export function wm14BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((wm14NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `wm14BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function wm14ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = wm14BonnesQcmDebut(n, idx, nom, prenom);
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
export function wm14NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
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
    besoin: "Obtenir des demandes de devis de particuliers par Google dans un rayon de 30 km, sans passer par les plateformes de mise en relation.",
    objectif: "Je veux que mon entreprise de plomberie-chauffage apparaisse sur Google dans mon secteur et reçoive des demandes de devis régulières par le site et la fiche Google.",
    projet: "Elle me permettra de remplir le planning de l'équipe avec des chantiers de pompes à chaleur, plus rentables que le dépannage.",
    attentes: "L'entreprise attend un plan concret pour obtenir 10 à 15 demandes de devis qualifiées par mois depuis le site et la fiche Google.",
    missions: "Gestion du site et de la fiche Google, réponse aux demandes de devis, demande d'avis après chantier.",
    contribution: "Elle doit réduire notre dépendance aux plateformes, qui prennent une commission sur chaque chantier.",
  },
  {
    besoin: "Faire venir en boutique les clientes qui la découvrent sur Instagram, et mesurer ce que rapportent les publications.",
    objectif: "Mon objectif est de transformer les abonnés Instagram de la boutique en clientes qui se déplacent, avec un rythme de publication que je peux tenir.",
    projet: "Elle m'aidera à faire vivre la boutique de prêt-à-porter face aux enseignes et aux sites de vente en ligne.",
    attentes: "Nous attendons une ligne éditoriale tenable et un suivi des ventes venues des réseaux sociaux.",
    missions: "Animation du compte Instagram et de la page Facebook, vitrines, accueil des clientes, programme de fidélité.",
    contribution: "Elle doit augmenter la fréquentation de la boutique en semaine, aujourd'hui trop faible.",
  },
  {
    besoin: "Trouver des clients PME par LinkedIn et par le site au lieu de dépendre uniquement du réseau personnel.",
    objectif: "Je souhaite structurer ma prospection en ligne de consultant{e} indépendant{e} : profil LinkedIn, contenus d'expertise, page de contact qui convertit.",
    projet: "Elle me permettra de sécuriser mon activité d'indépendant{e} en régularisant les missions d'une année sur l'autre.",
    attentes: "L'activité attend 4 rendez-vous qualifiés par mois issus de LinkedIn et du site.",
    missions: "Prospection, publication de contenus d'expertise, rendez-vous de découverte, rédaction des propositions.",
    contribution: "Elle doit réduire les mois creux entre deux missions.",
  },
  {
    besoin: "Rentrer plus de mandats de vente grâce à l'estimation en ligne et au référencement local de l'agence.",
    objectif: "Mon objectif est de générer des demandes d'estimation de propriétaires vendeurs par le site de l'agence et la fiche Google.",
    projet: "Elle me prépare à reprendre la communication de l'agence, que le gérant me confie à partir de l'an prochain.",
    attentes: "Nous attendons que {le_sal} prenne en charge la visibilité locale de l'agence et le suivi des demandes d'estimation.",
    missions: "Mise en ligne des annonces, gestion de la fiche Google et des avis, publications sur les réseaux, suivi des contacts vendeurs.",
    contribution: "Elle doit nous aider à rentrer des mandats sans dépendre uniquement des portails d'annonces payants.",
  },
  {
    besoin: "Remplir le restaurant en semaine et développer les commandes traiteur des entreprises du quartier.",
    objectif: "Je veux augmenter les réservations en ligne du midi et lancer une offre traiteur pour les entreprises, en m'appuyant sur Google et les avis.",
    projet: "Elle m'aidera à diversifier le chiffre d'affaires du restaurant, trop dépendant du week-end.",
    attentes: "L'entreprise attend une hausse des réservations du midi et une dizaine de commandes traiteur par mois.",
    missions: "Gestion des réservations, réponses aux avis, publications Instagram, contacts avec les entreprises voisines.",
    contribution: "Elle doit lisser l'activité sur la semaine et mieux occuper l'équipe en cuisine.",
  },
  {
    besoin: "Fidéliser la clientèle de l'institut par une newsletter conforme et augmenter les prises de rendez-vous en ligne.",
    objectif: "Mon objectif est de faire revenir plus souvent mes clientes et de remplir les créneaux creux grâce à l'emailing et à la prise de rendez-vous en ligne.",
    projet: "Elle me permettra d'embaucher une deuxième esthéticienne si le planning se remplit.",
    attentes: "L'institut attend un fichier clientes conforme au RGPD et une newsletter mensuelle qui remplit les créneaux du mardi et du mercredi.",
    missions: "Soins, accueil, gestion du planning en ligne, réseaux sociaux de l'institut.",
    contribution: "Elle doit augmenter le taux de clientes qui reviennent dans les trois mois.",
  },
  {
    besoin: "Rendre rentables les campagnes Google Ads et l'emailing de la boutique en ligne.",
    objectif: "Je souhaite piloter mes campagnes Google Ads et mes scénarios d'emails avec des indicateurs de rentabilité, plutôt qu'au ressenti.",
    projet: "Elle m'aidera à faire passer la boutique en ligne à un chiffre d'affaires qui me permette d'en vivre à temps plein.",
    attentes: "L'entreprise attend un ROAS d'au moins 4 sur Google Ads et un scénario de relance de panier abandonné.",
    missions: "Gestion de la boutique en ligne, campagnes publicitaires, newsletter, service client.",
    contribution: "Elle doit stopper les dépenses publicitaires qui ne rapportent rien.",
  },
  {
    besoin: "Attirer des créateurs d'entreprise et des artisans comme nouveaux clients du cabinet par LinkedIn et des contenus utiles.",
    objectif: "Mon objectif est de développer la présence du cabinet sur LinkedIn et sur son site avec des contenus qui répondent aux questions des créateurs.",
    projet: "Elle me permettra d'évoluer vers un poste de chargé{e} de développement au sein du cabinet.",
    attentes: "Nous attendons que {le_sal} anime la page LinkedIn du cabinet et produise un contenu utile par semaine.",
    missions: "Accueil des nouveaux clients, rédaction de contenus, animation de la page LinkedIn, organisation des webinaires.",
    contribution: "Elle doit nous apporter des clients créateurs, segment sur lequel nous sommes peu visibles.",
  },
  {
    besoin: "Faire connaître l'association, recruter des bénévoles et développer les dons en ligne avec un tout petit budget.",
    objectif: "Je veux construire un plan de communication en ligne pour l'association, tenable par une équipe de bénévoles, et mesurer ce qu'il rapporte.",
    projet: "Elle me permettra de professionnaliser la communication de l'association, dont j'assure la coordination.",
    attentes: "L'association attend une hausse des dons en ligne et une dizaine de nouveaux bénévoles dans l'année.",
    missions: "Coordination des bénévoles, newsletter, réseaux sociaux, relation avec les partenaires et les financeurs.",
    contribution: "Elle doit rendre l'association plus visible auprès des habitants et des entreprises du territoire.",
  },
  {
    besoin: "Préparer la présence en ligne de mon entreprise avant son ouverture, avec un budget de lancement réaliste.",
    objectif: "Mon objectif est d'arriver à l'ouverture avec un site, une fiche Google, des réseaux en place et un plan d'action chiffré sur six mois.",
    projet: "Elle sécurise le lancement de mon activité de traiteur en me donnant une méthode et un budget crédibles.",
    attentes: "Le projet attend des premières commandes dès le premier mois grâce à une présence en ligne prête le jour de l'ouverture.",
    missions: "Création de l'entreprise, construction de l'offre, mise en place des outils de vente et de communication.",
    contribution: "Elle doit éviter de dépenser le budget de lancement dans des actions non mesurées.",
  },
  {
    besoin: "Être trouvé{e} sur Google pour mes prestations de photographe et faire de mon site un vrai outil de prise de contact.",
    objectif: "Je souhaite améliorer le référencement naturel de mon site portfolio et obtenir des demandes de mariage et d'entreprise sans passer par les annuaires payants.",
    projet: "Elle me permettra de vivre de mon activité de photographe indépendant{e} sans multiplier les commissions des plateformes.",
    attentes: "L'activité attend 8 demandes de devis par mois en haute saison, issues du site.",
    missions: "Prises de vue, retouche, gestion du site, Instagram et Pinterest, devis.",
    contribution: "Elle doit faire du site la première source de contacts.",
  },
  {
    besoin: "Construire un tableau de bord fiable pour savoir quels leviers apportent des contacts à l'entreprise.",
    objectif: "Mon objectif est de mettre en place GA4, la Search Console et un tableau de bord mensuel pour l'entreprise industrielle où je travaille.",
    projet: "Elle m'aidera à prendre en charge le marketing digital, aujourd'hui géré au coup par coup par la direction commerciale.",
    attentes: "Nous attendons que {le_sal} présente chaque mois un tableau de bord des contacts entrants et du coût de chaque action.",
    missions: "Assistance commerciale, mise à jour du site, salons, suivi des demandes entrantes.",
    contribution: "Elle doit permettre à la direction d'arbitrer le budget marketing sur des chiffres.",
  },
  {
    besoin: "Augmenter les réservations directes des chambres d'hôtes et réduire la part des plateformes.",
    objectif: "Je veux que les voyageurs réservent directement sur mon site, grâce à Google, aux avis et à une newsletter pour les anciens clients.",
    projet: "Elle m'aidera à améliorer la marge de mes chambres d'hôtes en payant moins de commissions.",
    attentes: "L'activité attend 40 % de réservations directes d'ici la prochaine saison.",
    missions: "Accueil des voyageurs, gestion des réservations, site, fiche Google, réseaux sociaux.",
    contribution: "Elle doit faire baisser les commissions versées aux plateformes de réservation.",
  },
  {
    besoin: "Valoriser les avis clients du garage et apparaître dans les recherches locales d'entretien et de réparation.",
    objectif: "Mon objectif est de faire remonter le garage dans les recherches locales et de faire prendre les rendez-vous d'entretien en ligne.",
    projet: "Elle me permettra de reprendre la communication du garage que mon père dirige encore.",
    attentes: "Nous attendons que {le_sal} gère la fiche Google, les avis et la prise de rendez-vous en ligne.",
    missions: "Accueil clientèle, devis, planning de l'atelier, fiche Google et page Facebook du garage.",
    contribution: "Elle doit remplir le planning de l'atelier en début de semaine.",
  },
  {
    besoin: "Recruter de nouveaux abonnés pour la salle de sport par les réseaux sociaux et un partenariat avec un influenceur local.",
    objectif: "Je souhaite lancer un plan d'action réseaux sociaux et une collaboration d'influence conforme à la loi pour la salle de sport.",
    projet: "Elle m'aidera à faire grandir la salle face aux chaînes à bas prix.",
    attentes: "L'entreprise attend 60 nouveaux abonnements sur la rentrée grâce aux réseaux sociaux.",
    missions: "Coaching, accueil, animation des réseaux sociaux, organisation des événements de la salle.",
    contribution: "Elle doit renforcer l'image de proximité de la salle et attirer un public plus jeune.",
  },
  {
    besoin: "Reprendre en main le site de l'entreprise, le rendre accessible et l'inscrire dans un plan d'action daté.",
    objectif: "Mon objectif est de construire le plan d'action webmarketing de l'entreprise de négoce où je travaille et de mettre le site aux normes d'accessibilité.",
    projet: "Elle me permettra d'évoluer vers un poste de chargé{e} de communication digitale.",
    attentes: "Nous attendons {un} {collab} capable de planifier les actions en ligne et de rendre le site conforme aux bonnes pratiques d'accessibilité.",
    missions: "Mise à jour du site et du catalogue, newsletter clients, supports commerciaux.",
    contribution: "Elle doit donner de la régularité à notre communication, aujourd'hui très irrégulière.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilWM14(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

export function getWM14Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return accorder(profilWM14(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production écrite du stagiaire sur sa propre entreprise
// Indices : 0 diagnostic, 1 C1, 2 C2, 3 C3 plan, 4 C3 emailing, 5 C3 Google Ads,
//           6 C4 audit, 7 C4 éditorial/netlinking, 8 C5, 9 C6 ; 8 productions par banque.
// La k-ième production de chaque banque suit la même entreprise : un stagiaire garde le même
// terrain d'un exercice à l'autre.
//   0 plomberie-chauffage · 1 institut de beauté · 2 boutique en ligne de thés · 3 cabinet comptable
//   4 bistrot · 5 agence immobilière · 6 consultant indépendant · 7 recyclerie associative
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Diagnostic de départ
  [
    "Mon entreprise : plomberie-chauffage, 4 salariés, près d'Angers. Inventaire : site WordPress de 2019 (2/5, lent sur mobile, formulaire de devis cassé), fiche Google (3/5, 18 avis, aucune réponse), page Facebook arrêtée en 2024 (1/5), Pages Jaunes avec un ancien numéro. Concurrents : deux ont plus de 80 avis et une page par ville, le troisième fait de la publicité Google. Sur « plombier + ma commune », je suis 5e dans le pack local et absent{e} de la première page en naturel. Mesure : aucune, ni GA4 ni Search Console. Forces : 4,8 de note, savoir-faire pompe à chaleur, réactivité. Faiblesses : formulaire cassé, peu d'avis, aucune mesure. Priorités : réparer le formulaire et installer la mesure, demander des avis, corriger le NAP.",
    "J'ai fait l'état des lieux de mon institut de beauté (2 salariées, Villeurbanne). Instagram 4/5 (2 300 abonnés, publications régulières), fiche Google 3/5 (horaires faux le samedi), prise de rendez-vous en ligne 4/5, site vitrine 2/5 jamais mis à jour, pas de newsletter. Les trois concurrents du quartier ont tous plus d'avis que moi ; un seul a un site à jour. Sur « institut de beauté Villeurbanne », j'apparais en 7e position sur la carte. Pas de GA4. Forces : Instagram vivant, clientèle fidèle, réservation en ligne. Faiblesses : avis, site, aucune mesure. Priorités : corriger la fiche, relancer les avis, créer un fichier clientes conforme.",
    "Ma boutique en ligne de thés bio (Shopify, 180 k€ de CA, 1 salarié). Inventaire : site 4/5 mais fiches produits copiées du fournisseur, Instagram 3/5, newsletter de 1 400 inscrits envoyée irrégulièrement (2/5), Google Ads actif sans suivi des conversions (1/5), Amazon abandonné. Concurrents : deux marques plus grosses avec blog et programme de fidélité. Sur « thé bio en ligne », je ne suis pas dans les 30 premiers résultats. Mesure : GA4 installé mais sans événement d'achat. Mes trois priorités : brancher les conversions, réécrire les fiches les plus vendues, structurer la newsletter.",
    "Je travaille dans un cabinet d'expertise comptable de 11 personnes à Rennes. Site 3/5 (propre mais aucune page par profil de client), fiche Google 3/5, LinkedIn 2/5 (une publication par trimestre), pas de newsletter, annuaire de l'Ordre à jour. Les trois cabinets concurrents publient chaque semaine sur LinkedIn, deux ont un simulateur en ligne. Sur « expert-comptable création entreprise Rennes », nous sommes en deuxième page. Search Console non installée. Forces : réputation, 4,7 sur Google, équipe jeune. Faiblesses : pas de contenus, LinkedIn inactif, pas de mesure. Priorités : Search Console et GA4, une page par profil, rythme LinkedIn.",
    "Mon bistrot à Bordeaux, 45 couverts, 7 salariés. Fiche Google 4/5 (312 avis, 4,4) mais seulement un tiers de réponses, Instagram 3/5, site 2/5 avec un menu en PDF illisible sur téléphone, TheFork 3/5. Concurrents : deux restaurants voisins ont un menu en ligne et proposent un service traiteur. Sur « restaurant midi Chartrons », nous sommes 4e sur la carte. Mesure : seulement les statistiques de la fiche Google. Forces : avis nombreux, emplacement, cuisine maison. Faiblesses : menu PDF, pas d'offre entreprise en ligne, aucune mesure du site. Priorités : menu en page web, page traiteur, GA4.",
    "Agence immobilière indépendante à Annecy, 5 négociateurs. Site 3/5 (annonces à jour, mais aucune page pour les vendeurs), fiche Google 4/5 (96 avis), Facebook 2/5, Instagram 3/5, présence sur les portails payants. Concurrents : deux réseaux nationaux avec estimation en ligne, une agence locale très active sur Instagram. Sur « estimation appartement Annecy », nous n'apparaissons pas en première page. GA4 installé par l'éditeur du site, jamais consulté. Forces : avis, connaissance du marché local. Faiblesses : rien pour capter les vendeurs, pas de suivi. Priorités : page estimation avec formulaire suivi, contenus quartiers, tableau de bord.",
    "Je suis consultant{e} indépendant{e} en organisation pour les PME, à Lille. Site 2/5 (une page, aucun cas client), profil LinkedIn 3/5 (1 100 relations, publications rares), pas de fiche Google, pas de newsletter. Trois consultants concurrents : deux publient des cas clients, un anime une newsletter. Sur « consultant organisation PME Lille », je n'apparais nulle part. Aucune mesure. Forces : références solides, réseau. Faiblesses : site vide, pas de preuve en ligne, dépendance au bouche-à-oreille. Priorités : fiche Google, trois pages de cas clients, rythme LinkedIn d'une publication par semaine.",
    "La recyclerie associative où je coordonne la communication (12 salariés en insertion, Grenoble). Facebook 4/5 (3 800 abonnés), Instagram 2/5, site 2/5 avec des horaires faux, fiche Google 3/5, newsletter aux adhérents envoyée depuis une boîte mail perso. Comparaison avec deux ressourceries voisines : l'une a une boutique en ligne, l'autre des avis nombreux. Sur « ressourcerie Grenoble », nous sommes 3e sur la carte. Pas de GA4. Forces : communauté Facebook, image positive, événements. Faiblesses : site, newsletter non conforme, aucune mesure des dons. Priorités : corriger horaires et NAP, outil d'emailing, suivi des dons en ligne.",
  ],
  // 1 — C1 positionnement, personas, objectifs SMART
  [
    "Positionnement : « Pour les propriétaires de maisons des années 70 autour d'Angers, nous sommes le plombier-chauffagiste qui remplace la chaudière fioul par une pompe à chaleur en une semaine, contrairement aux réseaux nationaux, parce que nous montons nous-mêmes le dossier d'aides. » Persona B2C : Nathalie, 52 ans, maison de 1976, facture de fioul qui explose, cherche « remplacement chaudière fioul prix ». Persona B2B : un gestionnaire de syndic qui veut un plombier réactif. Parcours : découverte par Google, considération par les avis et les photos de chantiers, décision au devis, fidélisation par le contrat d'entretien. Objectifs : 12 demandes de devis PAC par mois d'ici le 30 juin, 60 avis Google au 31 mars, 40 contrats d'entretien signés dans l'année.",
    "Positionnement de mon institut : « Pour les actives du quartier qui ont peu de temps, nous sommes l'institut qui réserve en ligne jusqu'à 20 h, contrairement aux franchises, parce que chaque cliente garde la même esthéticienne. » Personas : Inès, 34 ans, cadre, réserve le soir sur son téléphone ; Monique, 61 ans, fidèle, préfère appeler. Parcours : découverte sur Instagram, comparaison des avis, réservation en ligne, fidélisation par la carte et la newsletter. Objectifs SMART : 25 réservations en ligne de plus par mois d'ici fin mars, 500 inscrites à la newsletter au 30 juin, 60 % de clientes qui reviennent dans les 3 mois.",
    "« Pour les amateurs de thé qui veulent comprendre ce qu'ils boivent, nous sommes la boutique en ligne de thés bio sourcés en direct, contrairement aux grandes marques, parce que chaque thé a sa fiche producteur. » Persona 1 : Julien, 29 ans, curieux, cherche « thé vert japonais bio ». Persona 2 : un comité d'entreprise qui commande des coffrets en décembre. Parcours : découverte par Google et Instagram, considération par les fiches et les avis, achat, fidélisation par la newsletter et l'abonnement. Objectifs : taux de conversion de 1,2 à 1,8 % d'ici le 30 juin, 30 abonnements mensuels au 31 décembre, 35 % de clients qui recommandent dans les 90 jours.",
    "Positionnement du cabinet : « Pour les créateurs et artisans d'Ille-et-Vilaine, nous sommes le cabinet qui répond sous 24 h et explique chaque chiffre, contrairement aux cabinets en ligne, parce qu'un conseiller dédié suit chaque dossier. » Personas : Karim, 31 ans, crée son entreprise de menuiserie et tape « expert-comptable création SASU Rennes » ; Sylvie, gérante d'une boulangerie, cherche à changer de cabinet. Parcours : article ou post LinkedIn, page du profil, rendez-vous découverte, newsletter fiscale. Objectifs : 8 rendez-vous de créateurs par mois d'ici septembre, 1 000 abonnés LinkedIn au 31 décembre, 90 % de clients renouvelés à la lettre de mission.",
    "Positionnement : « Pour les salariés du quartier des Chartrons, nous sommes le bistrot qui sert un plat du jour fait maison en 40 minutes, contrairement aux chaînes de restauration rapide, parce que tout est cuisiné le matin sur place. » Personas : Clara, 38 ans, pause déjeuner courte, cherche sur Maps ; Thomas, office manager d'une PME, commande des buffets. Parcours : Maps, avis et photos, réservation ou appel, fidélisation par la carte du midi. Objectifs : 30 couverts de plus par semaine le midi d'ici fin mars, 10 commandes traiteur par mois au 30 juin, 80 % des avis avec une réponse sous 48 h.",
    "Positionnement de l'agence : « Pour les propriétaires annéciens qui vendent, nous sommes l'agence indépendante qui estime en 48 h avec des ventes réelles du quartier, contrairement aux réseaux nationaux, parce que nos négociateurs habitent le secteur. » Persona vendeur : Philippe, 63 ans, vend un T3 pour se rapprocher de ses enfants. Persona acquéreur : un couple de frontaliers. Parcours : recherche « estimation appartement Annecy », avis, formulaire d'estimation, suivi par newsletter du marché. Objectifs : 20 demandes d'estimation par mois d'ici le 30 juin, 6 mandats exclusifs par trimestre, 150 avis Google au 31 décembre.",
    "Mon positionnement : « Pour les dirigeants de PME industrielles de 20 à 100 salariés, je suis le consultant qui remet l'organisation à plat en 60 jours, contrairement aux grands cabinets, parce que j'interviens moi-même du diagnostic au suivi. » Persona : Laurent, 48 ans, directeur d'usine, actif sur LinkedIn, cherche « réduire les délais de production ». Parcours : post LinkedIn, cas client sur le site, appel découverte, newsletter trimestrielle. Objectifs SMART : 4 rendez-vous qualifiés par mois d'ici avril, 2 000 abonnés à mon profil au 31 décembre, 2 clients sur 3 qui reviennent pour une deuxième mission.",
    "Positionnement de la recyclerie : « Pour les habitants du sud de Grenoble, nous sommes la boutique solidaire où chaque achat finance un emploi en insertion, contrairement aux sites d'occasion entre particuliers, parce que tout est trié et réparé par nos salariés. » Personas : Léa, 27 ans, étudiante, chine sur Instagram ; Gérard, retraité, donne des meubles et veut devenir bénévole. Parcours : réseaux et bouche-à-oreille, page du site, visite ou don, newsletter. Objectifs : 15 nouveaux bénévoles d'ici juin, 2 000 € de dons en ligne sur l'année, 20 % de visiteurs en plus le samedi au 30 avril.",
  ],
  // 2 — C2 leviers et budget
  [
    "J'ai comparé huit leviers. Retenus : SEO local et fiche Google (coût faible, résultats en 3 à 6 mois), Google Ads en test (immédiat mais payant), demandes d'avis par SMS (confiance et référencement local), contrat d'entretien relancé par email. Écartés : Instagram (ma cible n'y cherche pas un plombier), places de marché (commission). Budget annuel : refonte des pages de services 1 500 €, Google Ads 1 800 €, outil d'avis 240 €, mon temps 3 h par semaine à 45 € soit environ 7 000 €. Estimation : 40 demandes par mois sur l'année en fin de période, 25 % signées, coût par chantier visé de 120 € pour une marge moyenne de 1 800 €.",
    "Leviers comparés : Instagram, fiche Google, SEO, Google Ads, emailing, avis, partenariat avec la salle de sport voisine, publicité Instagram. Je garde Instagram (là où sont mes clientes), la fiche Google, la newsletter et le partenariat. Google Ads écarté : trop cher pour des soins à 45 €. Budget : Brevo gratuit, 50 € par mois de publicité Instagram en test, 300 € de visuels, mon temps 2 h par semaine valorisé 30 €, soit environ 4 000 € par an. Résultat attendu : 25 rendez-vous de plus par mois, coût par nouvelle cliente visé de 15 €.",
    "Sur dix leviers, je retiens : SEO des fiches produits, Google Ads Shopping, emailing automatisé, Instagram organique. J'arrête Amazon (15 % de commission) et la publicité Facebook sans suivi. Budget : Google Ads 9 600 € par an, Klaviyo 600 €, rédaction de fiches 1 200 €, mon temps 5 h par semaine à 30 €, soit environ 19 000 €. Estimation : 2 500 visites par mois, conversion visée 1,8 %, panier moyen 38 €, soit 1 710 € de CA par mois venu de Google Ads ; coût par vente visé sous 10 € pour une marge de 19 € par commande.",
    "Pour le cabinet, j'ai retenu LinkedIn (page et profils des associés), le SEO avec une page par profil de client, une newsletter fiscale mensuelle et des webinaires avec la CCI. Google Ads écarté : les clics sur « expert-comptable » coûtent plus de 6 €. Budget : 2 400 € de rédaction, 600 € d'outils, 4 h par semaine de mon temps valorisées à 40 €, environ 11 000 € par an. Estimation : 800 visites mensuelles, 1,5 % de prise de rendez-vous, 12 rendez-vous, 4 lettres de mission ; coût par client visé de 230 € pour un honoraire annuel moyen de 2 800 €.",
    "Leviers retenus pour le bistrot : fiche Google et avis (premier levier pour le midi), Instagram, emailing vers les entreprises voisines, partenariat avec le coworking du quartier. TheFork conservé seulement pour le soir à cause de la commission. Budget : nouveau site avec menu en page web 900 €, photos 400 €, Brevo gratuit, 2 h par semaine de mon temps à 25 €, soit environ 3 900 € par an. Estimation : 30 couverts de plus par semaine à 16 € de ticket, plus 10 buffets traiteur à 250 € par mois.",
    "J'ai comparé portails payants, SEO, Google Ads, Facebook, Instagram, emailing, avis et partenariats avec les notaires. Je garde : page estimation et SEO local, Google Ads sur « estimation » en test, newsletter du marché aux propriétaires, avis. Budget : Google Ads 3 600 €, contenus quartiers 2 000 €, outil d'emailing 400 €, temps 3 h par semaine à 35 €, soit environ 11 500 € par an. Estimation : 20 demandes d'estimation par mois, 15 % de mandats, honoraires moyens de 9 000 € : un coût par mandat visé de 400 € est très rentable.",
    "Leviers comparés : LinkedIn organique, LinkedIn Ads, SEO, Google Ads, newsletter, webinaires, partenariats avec des experts-comptables, salons. Retenus : LinkedIn organique, cas clients sur le site, newsletter trimestrielle, deux partenaires prescripteurs. LinkedIn Ads écarté : coût par clic au-dessus de 8 € pour mon petit budget. Budget : 1 200 € de site, 300 € d'outils, 4 h par semaine à 60 €, soit environ 13 000 € de temps valorisé. Estimation : 4 rendez-vous par mois, 1 mission sur 4 rendez-vous, mission moyenne de 12 000 €.",
    "Pour l'association, j'ai comparé huit leviers avec un budget de 1 500 € par an. Retenus : Facebook et Instagram (communauté déjà là), fiche Google, newsletter avec un outil conforme, partenariats avec les mairies et les entreprises mécènes. Google Ads classique écarté, mais nous avons demandé le programme Google Ad Grants pour les associations. Budget : outil d'emailing 0 €, visuels 300 €, impression 400 €, temps des bénévoles et de mon poste 3 h par semaine valorisé 20 €. Objectif : 15 bénévoles et 2 000 € de dons en ligne.",
  ],
  // 3 — C3 plan d'action, planning, accessibilité
  [
    "Plan sur six mois. Mois 1 : réparer le formulaire, installer GA4 et Search Console, corriger le NAP (moi, 0 €). Mois 2 : réécrire 4 pages de services avec le rédacteur (1 500 €). Mois 3 : lancer Google Ads en test (150 € par mois). Mois 2 à 6 : SMS de demande d'avis après chaque chantier (20 € par mois). Mois 4 à 6 : une page par commune. Gantt mensuel avec jalons : pages en ligne fin du mois 2, premier bilan Ads fin du mois 4. Accessibilité : alt sur toutes les photos de chantiers, contraste du bouton orange corrigé, H1 et H2 en ordre, formulaire étiqueté, vidéo sous-titrée, liens explicites. Références : EAA depuis le 28/06/2025, RGAA 4.1, WCAG AA. Risques : chantiers en retard, budget Ads mal réglé, rédacteur en retard ; parades : créneau fixe le vendredi matin, plafond quotidien, échéance contractuelle.",
    "Mon plan sur six mois pour l'institut : mois 1 fiche Google corrigée et campagne d'avis, mois 2 fichier clientes nettoyé et formulaire conforme, mois 3 première newsletter, mois 4 partenariat avec la salle de sport, mois 5 et 6 publicité Instagram en test. Chaque action a un responsable (moi ou ma salariée), un coût et un indicateur. Accessibilité : textes alternatifs sur les photos de soins, sous-titres sur les Reels, hashtags en CamelCase, contrastes de la charte vérifiés, emails lisibles sans images, emojis limités à deux par post. Références : RGAA 4.1 et WCAG. Risques : planning plein, manque d'idées, publicité qui ne rapporte pas ; parades : 2 h bloquées le lundi, banque de 20 idées, test plafonné à 50 €.",
    "J'ai découpé le plan de la boutique en ligne par levier. SEO : réécriture de 20 fiches en deux mois. Google Ads : passage en Shopping avec suivi des achats au mois 1. Emailing : scénario de bienvenue au mois 2, panier abandonné au mois 3. Instagram : trois publications par semaine. Gantt avec quatre jalons. Comme je vends en ligne aux particuliers, l'European Accessibility Act me concerne depuis le 28 juin 2025 : alt des images produits, contrastes du thème, navigation au clavier du tunnel de commande, étiquettes des champs, messages d'erreur explicites, emails en texte. Risques : saisonnalité de décembre, budget Ads, temps ; parades : préparation dès octobre, plafond, rédacteur freelance.",
    "Plan du cabinet sur six mois, validé avec l'associé : mois 1 Search Console et GA4, mois 2 trois pages par profil (créateur, artisan, profession libérale), mois 3 à 6 deux posts LinkedIn par semaine, mois 4 premier webinaire, newsletter mensuelle à partir du mois 3. Gantt partagé dans Teams. Accessibilité : PDF des guides balisés, alt sur les infographies, contrastes de la charte bleu clair corrigés, sous-titres des webinaires, titres hiérarchisés, liens explicites. Références : RGAA 4.1, WCAG 2.2 AA, EAA. Risques : période fiscale chargée, manque de sujets, faible participation aux webinaires ; parades : contenus préparés en mars, liste de 30 questions clients, partenariat CCI.",
    "Plan d'action du bistrot sur six mois : menu en page web et GA4 en mois 1, réponses aux avis chaque lundi, page traiteur et mailing aux 60 entreprises du quartier en mois 2, partenariat coworking en mois 3, deux posts Instagram par semaine, bilan au mois 6. Chaque ligne : qui, quand, coût, indicateur. Accessibilité : menu en texte et plus en PDF image, allergènes lisibles, photos avec alt, contraste du texte sur l'ardoise en photo évité, vidéo sous-titrée, horaires en texte. Références : RGAA, WCAG AA, EAA du 28 juin 2025. Risques : coup de feu en salle, saison creuse d'août, oubli des avis ; parades : rappel hebdomadaire, contenus préparés en juillet, réponses types.",
    "Plan de l'agence : mois 1 page estimation avec formulaire et suivi GA4, mois 2 trois pages quartiers, mois 3 Google Ads sur « estimation », mois 4 newsletter du marché, mois 5 et 6 demande d'avis systématique après signature. Gantt avec jalons et un responsable par action (moi, un négociateur, l'assistante). Accessibilité : visites virtuelles avec description texte, alt sur les photos d'annonces, contrastes vérifiés, formulaire navigable au clavier, PDF des diagnostics accessibles, liens explicites. Références : EAA, RGAA 4.1, WCAG. Risques : négociateurs qui ne demandent pas les avis, budget Ads, retards de rédaction ; parades : rappel dans le logiciel, plafond, rédaction en interne.",
    "Plan sur six mois en solo : mois 1 fiche Google et refonte de la page d'accueil, mois 2 trois cas clients, mois 1 à 6 une publication LinkedIn le mardi et des commentaires le jeudi, mois 3 première newsletter trimestrielle, mois 4 et 5 rencontre de deux experts-comptables prescripteurs. Gantt sur une page. Accessibilité : alt sur les schémas, contrastes vérifiés, PDF des cas clients balisés, sous-titres de mes vidéos, emojis limités, hashtags en CamelCase. En tant que microentreprise de services, je suis exempté{e} de l'EAA, mais j'applique le RGAA par cohérence. Risques : missions prenantes, panne d'inspiration, newsletter sans lecteurs ; parades : 2 h fixes le lundi, sujets tirés des questions clients, inscription proposée à chaque rendez-vous.",
    "Plan sur six mois pour la recyclerie : mois 1 horaires et NAP corrigés, outil d'emailing conforme ; mois 2 page bénévoles et formulaire ; mois 3 campagne de dons en ligne ; mois 4 événement « réparer plutôt que jeter » ; publications Facebook et Instagram 3 fois par semaine par un binôme de bénévoles. Accessibilité : alt sur les photos d'objets, sous-titres des vidéos, contrastes de l'affiche corrigés, texte simple et facile à lire, formulaire de don navigable au clavier, PDF accessibles. Références : RGAA 4.1, WCAG AA, EAA. Risques : turnover des bénévoles, budget, oubli des publications ; parades : guide de publication, outils gratuits, calendrier partagé.",
  ],
  // 4 — C3 email marketing conforme
  [
    "Base : clients existants (devis signés) pour l'entretien, ce qui est possible pour des services analogues avec opposition proposée à chaque envoi ; prospects uniquement par formulaire avec case non cochée. Pour les syndics, en B2B, message en rapport avec leur fonction et droit d'opposition. Segments : clients PAC, clients chaudière gaz, syndics. Scénario : J0 bienvenue avec le guide « entretenir sa pompe à chaleur », J+7 offre contrat d'entretien à 149 €, J+21 relance avec avis clients. Délivrabilité : SPF, DKIM, DMARC configurés chez l'hébergeur, lien de désinscription en un clic. Indicateurs : délivrabilité > 97 %, clic > 3 %, désinscription < 0,5 %, contrats signés.",
    "Pour l'institut, la base vient de la fiche cliente : j'ajoute une case non pré-cochée pour la newsletter et je garde la date du consentement. Les clientes existantes peuvent recevoir des offres sur des soins similaires si elles ont pu refuser. Segments : clientes fidèles, clientes absentes depuis 6 mois, nouvelles inscrites. Scénario : bienvenue avec 10 % sur le premier soin, offre « créneaux du mardi » à J+5, relance à J+14. Brevo avec un domaine authentifié par SPF, DKIM et DMARC. Indicateurs : taux de clic, réservations issues des emails, désinscriptions, plaintes ; alerte si désinscription au-dessus de 0,8 %.",
    "J'avais 1 400 inscrits dont 300 sans preuve de consentement : je les ai retirés. Désormais, case non cochée au paiement et pop-up d'inscription avec la finalité. Segments : clients ayant acheté du thé vert, acheteurs de coffrets, inscrits sans achat. Scénario Klaviyo : bienvenue J0 avec l'histoire des producteurs, J+3 sélection découverte, J+10 relance avec avis ; plus le panier abandonné à 4 h. Délivrabilité : SPF, DKIM et DMARC en place, désinscription en un clic, nettoyage des inactifs à 12 mois. Indicateurs : clic, CA par email, désinscription, plaintes sous 0,1 %.",
    "Pour le cabinet, la newsletter est envoyée aux clients (intérêt légitime, avec opposition) et aux contacts des webinaires qui ont coché la case. En B2B, le contenu fiscal est en rapport avec la fonction de dirigeant. Segments : créateurs de moins d'un an, artisans, professions libérales. Scénario : bienvenue avec le calendrier fiscal, J+7 article « choisir son statut », J+21 proposition de rendez-vous gratuit. Domaine authentifié SPF, DKIM, DMARC par le prestataire informatique. Indicateurs : clic, rendez-vous pris, désinscriptions ; je ne me fie pas à l'ouverture.",
    "Base du bistrot : cartes de visite récoltées au comptoir, mais seulement avec une case cochée sur le formulaire papier daté et conservé. Les entreprises du quartier reçoivent un email B2B lié à leur fonction (office manager), avec désinscription. Segments : habitués du midi, entreprises, clients du soir. Scénario : bienvenue avec la carte de la semaine, J+5 offre café offert le mardi, J+15 brochure traiteur pour les entreprises. Brevo, SPF et DKIM configurés, DMARC ajouté avec l'aide de l'hébergeur. Indicateurs : clic, réservations avec le code email, commandes traiteur.",
    "Base de l'agence : propriétaires ayant demandé une estimation (case non cochée pour la newsletter), anciens clients vendeurs et acquéreurs. Segments : propriétaires vendeurs potentiels, acquéreurs en recherche, anciens clients. Scénario : J0 envoi de l'estimation avec les ventes du quartier, J+10 « les prix dans votre quartier ce trimestre », J+30 proposition de rendez-vous. Domaine authentifié, désinscription en un clic, envoi via l'outil du logiciel métier. Indicateurs : délivrabilité, clic, rendez-vous, mandats issus des emails ; alerte si plainte > 0,1 %.",
    "En B2B, je peux écrire à des dirigeants de PME si le message concerne leur fonction et s'ils peuvent s'opposer facilement ; je n'utilise pas de fichier acheté. Segments : anciens clients, prospects rencontrés en salon, abonnés venus de LinkedIn. Scénario : bienvenue avec un guide « 5 signaux d'une organisation à revoir », J+7 cas client, J+21 proposition d'appel de 30 minutes. Mon domaine est authentifié avec SPF, DKIM et DMARC. Indicateurs : clic, réponses, rendez-vous ; seuil d'alerte : désinscription au-dessus de 1 %.",
    "Pour l'association, la newsletter partait d'une boîte perso en copie cachée : j'ai migré vers Brevo et demandé à chaque adhérent de confirmer son inscription. Segments : adhérents, donateurs, bénévoles. Scénario : bienvenue avec la présentation de l'équipe, J+7 appel aux bénévoles pour l'atelier réparation, J+20 campagne de dons avec le reçu fiscal. Domaine de l'association authentifié avec SPF, DKIM et DMARC. Indicateurs : délivrabilité, clic, inscriptions bénévoles, dons ; désinscription à surveiller au-dessus de 0,5 %.",
  ],
  // 5 — C3 Google Ads
  [
    "Campagne sur le Réseau de Recherche, 300 € sur un mois. Groupes : « pompe à chaleur », « remplacement chaudière », « dépannage chauffage », chacun avec sa page. Mots-clés en expression ou exacte, dont « installateur pompe à chaleur Angers » ; négatifs : gratuit, prix pompe à chaleur leroy, emploi, formation, CAP, tuto, notice, occasion, location, aides seules. Annonce : 12 titres dont « Pompe à chaleur en 1 semaine », 4 descriptions, composants lieu, appel et liens annexes. Ciblage 25 km, 7 h à 20 h, 10 € par jour, « Maximiser les clics » avec CPC max de 2,50 €. Conversion : demande de devis et appel, Consent Mode v2 activé. Règle : si coût par demande > 60 € après un mois, j'arrête.",
    "Avec 300 €, je teste une campagne de recherche limitée à 5 km autour de l'institut. Groupes : « épilation », « soin visage », « institut de beauté ». Mots-clés exacts et expression ; négatifs : formation, CAP esthétique, emploi, à domicile, gratuit, recette, maison, tuto, prix, avis. Annonce responsive : titres comme « Réservez en ligne jusqu'à 20 h », descriptions avec l'avantage de la même esthéticienne. Diffusion de 9 h à 21 h, 10 € par jour. Conversion : réservation confirmée sur l'outil de prise de rendez-vous, importée dans GA4. Règle : je continue si le coût par réservation reste sous 12 €.",
    "Pour la boutique, je teste le Réseau de Recherche sur les requêtes de marque de thé et de type de thé, 300 € sur un mois. Groupes : « thé vert japonais bio », « coffret thé cadeau », « rooibos bio ». Négatifs : bienfaits, recette, gratuit, emploi, théière, bouilloire, Lipton, avis, définition, wikipedia. Annonce : titres avec livraison offerte dès 39 €, preuve producteurs. Ciblage France, budget 10 € par jour, enchères au CPC max puis passage en ROAS cible quand j'aurai 30 conversions. Conversion : achat avec valeur, suivi GA4 et Consent Mode v2. Règle : ROAS minimum de 4 au bout du mois.",
    "Je propose une campagne test pour le cabinet malgré le coût : 300 € ciblés sur « expert-comptable création entreprise Rennes » et « comptable SASU Rennes », en exact. Négatifs : gratuit, en ligne, emploi, stage, salaire, formation, logiciel, BTS, cours, définition. Annonce : 10 titres (« Conseiller dédié », « Réponse sous 24 h »), composants appel et liens vers les pages profils. Rennes Métropole, jours ouvrés 8 h à 19 h, 10 € par jour, CPC max 6 €. Conversion : prise de rendez-vous. Règle : si moins de 3 rendez-vous dans le mois, on reste sur le SEO et LinkedIn.",
    "Campagne locale du bistrot : 300 € en recherche, rayon de 2 km, de 10 h à 13 h et de 17 h à 20 h. Groupes : « restaurant midi Chartrons », « traiteur entreprise Bordeaux », « plateau repas bureau ». Négatifs : recette, emploi, serveur, gratuit, livraison Uber, menu McDo, avis, CAP, école, fermeture. Annonce avec plat du jour, prix, composants lieu et appel. Enchères « Maximiser les clics » avec plafond de CPC. Conversions : clic sur réserver, appel, demande de devis traiteur. Règle : coût par réservation sous 4 € et par devis traiteur sous 30 €.",
    "Campagne test de l'agence : 300 € sur « estimation appartement Annecy », « estimer sa maison Annecy », « agence immobilière Annecy vendre ». Négatifs : location, louer, gratuit en ligne, notaire, emploi, négociateur, formation, simulateur crédit, DPE, Seloger. Annonce : « Estimation en 48 h par un expert du quartier », 4 descriptions, liens annexes vers les avis et les ventes récentes. Rayon 15 km, 7 jours sur 7, 10 € par jour. Conversion : formulaire d'estimation envoyé, suivi GA4 avec Consent Mode v2. Règle : poursuivre si le coût par estimation est sous 50 €.",
    "Pour mon activité de consultant{e}, j'ai préparé une campagne test de 300 € sur des requêtes de problème : « réduire délais production PME », « réorganisation atelier consultant ». Correspondance exacte et expression ; négatifs : formation, emploi, salaire, gratuit, PDF, cours, définition, master, alternance, stage. Annonce : titres « Diagnostic en 10 jours », « 15 PME accompagnées ». Hauts-de-France, jours ouvrés, 10 € par jour. Conversion : prise d'appel sur Calendly suivie dans GA4. Règle : si aucun rendez-vous qualifié après un mois, je réaffecte le budget à LinkedIn.",
    "Pour l'association, j'ai préparé la campagne dans le cadre de Google Ad Grants, mais j'ai aussi chiffré un test de 300 € en compte classique. Groupes : « ressourcerie Grenoble », « don meubles Grenoble », « bénévolat Grenoble ». Négatifs : vente en ligne, Leboncoin, emploi, déchetterie horaires, gratuit à donner, Emmaüs, location, achat neuf, IKEA, recrutement. Annonce : « Donnez, achetez, créez de l'emploi local ». Rayon 20 km. Conversions : formulaire bénévole et don en ligne. Règle : continuer si le coût par inscription bénévole reste sous 20 €.",
  ],
  // 6 — C4 audit sémantique et technique
  [
    "Audit sémantique : 20 requêtes classées, par exemple « prix pompe à chaleur air eau » (informationnelle), « installateur pompe à chaleur Angers » (locale, vers la page pompe à chaleur), « contrat entretien chaudière » (transactionnelle). Volumes estimés avec Keyword Planner, de 30 à 1 900 par mois. Arborescence : une page par service, cinq pages communes, fusion de deux pages « chauffage » en doublon. Technique : LCP mobile 4,1 s, INP 180 ms, CLS 0,08 ; HTTPS absent sur deux pages ; 11 pages exclues dans la Search Console ; sitemap non déclaré ; 6 titles identiques ; images de 3 Mo. Priorités : HTTPS et sitemap, titles, images, puis pages communes.",
    "Pour le site de l'institut : 20 requêtes, « épilation laser Villeurbanne » (transactionnelle locale), « soin visage peau sèche » (informationnelle), « institut beauté ouvert le soir » (locale). Arborescence : une page par famille de soins et une page « tarifs ». Technique : site Wix, LCP 3,2 s, INP 120 ms, CLS 0,15 à cause d'une bannière ; 4 pages non indexées ; meta descriptions vides ; deux H1 sur l'accueil ; images sans alt. Priorités : meta descriptions et titres, bannière qui fait bouger la page, alt des images, pages de soins.",
    "Audit de la boutique : 20 requêtes, de « bienfaits du thé vert » (informationnelle, article) à « acheter sencha bio » (transactionnelle, fiche produit). Pas de cannibalisation sauf deux catégories « thé vert » que je fusionne. Technique Shopify : LCP 2,9 s, INP 210 ms à cause d'une application de chat, CLS 0,05 ; 37 pages exclues, surtout des variantes et des filtres, ce qui est normal ; sitemap automatique déclaré ; titles produits trop longs. Priorités : retirer l'application lourde, réécrire les titles, fusionner les catégories.",
    "Audit sémantique du cabinet : 20 requêtes, « comment créer une SASU » (informationnelle), « expert-comptable artisan Rennes » (locale), « tarif expert-comptable auto-entrepreneur » (commerciale). Arborescence cible : trois pages profils, une page tarifs, un blog. Technique : LCP 2,2 s, INP 90 ms, CLS 0,01, HTTPS correct ; mais robots.txt bloquait le dossier /blog/ depuis la refonte : 18 articles non indexés. Sitemap déclaré, titles corrects, H1 absent sur les pages de services. Priorité absolue : robots.txt, puis H1, puis pages profils.",
    "Pour le bistrot, 20 requêtes, surtout locales : « restaurant Chartrons midi », « bistrot fait maison Bordeaux », « traiteur entreprise Bordeaux ». Arborescence : accueil, carte en texte, page midi, page traiteur, page contact. Technique : le menu était un PDF de 6 Mo non lisible par Google, LCP 5,3 s ; INP correct ; pas de sitemap ; site en HTTP. Priorités : passer le site en HTTPS, mettre la carte en page web, déclarer le sitemap, puis créer la page traiteur. La Search Console ne montrait que 3 pages indexées.",
    "Audit de l'agence : 20 requêtes classées, « prix m2 Annecy » (informationnelle), « estimation maison Annecy » (commerciale), « agence immobilière Annecy-le-Vieux » (locale). Arborescence : page estimation, une page par quartier, guides vendeurs. Technique : 1 200 pages d'annonces dont beaucoup expirées en 404 ; LCP 3,6 s à cause des photos ; INP 150 ms ; CLS 0,12. Priorités : redirection 301 des annonces vendues vers la page quartier, compression des photos, puis pages quartiers.",
    "Pour mon site de consultant{e} : 20 requêtes, beaucoup en longue traîne, « réduire délais de production PME », « consultant lean Lille », « audit organisation atelier ». Arborescence : accueil, trois pages d'offre, cas clients, articles. Technique : site d'une page, donc une seule requête possible ; LCP 1,9 s, INP 80 ms, CLS 0 ; HTTPS correct ; pas de sitemap, Search Console non installée. Priorités : installer la Search Console, créer les pages d'offre, déclarer le sitemap.",
    "Audit de la recyclerie : 20 requêtes, « ressourcerie Grenoble horaires » (locale), « où donner ses meubles Grenoble » (informationnelle), « bénévolat recyclage Grenoble » (locale). Arborescence : horaires et accès, donner, acheter, devenir bénévole, faire un don. Technique : LCP 4,4 s, images non compressées, INP 160 ms, CLS 0,09 ; 9 pages exclues dont l'ancienne page des horaires toujours indexée avec de fausses heures. Priorités : redirection 301 de l'ancienne page, compression, pages bénévoles et dons.",
  ],
  // 7 — C4 optimisation éditoriale, netlinking, suivi
  [
    "Page optimisée : « Installation pompe à chaleur à Angers », title de 54 caractères, meta description « Devis en 48 h, dossier d'aides inclus, 60 chantiers réalisés », H1 unique, H2 sur prix, aides, délais, entretien, photos de nos chantiers, balisage LocalBusiness validé. Six contenus sur trois mois : prix d'une PAC, aides, entretien, bruit, chaudière gaz ou PAC, témoignage. Netlinking : fournisseur, fabricant, club d'entreprises, Ouest-France local, CAPEB, mairie, annuaire RGE, deux partenaires électriciens, salon de l'habitat ; jamais d'achat de liens. Fiche Google complétée. Suivi mensuel Search Console et GA4.",
    "J'ai optimisé la page « épilation » : title « Épilation à Villeurbanne – institut ouvert jusqu'à 20 h », meta description avec réservation en ligne, H2 par zone et par technique, FAQ des clientes, liens vers les tarifs, balisage BeautySalon. Six contenus : préparer sa peau, épilation et été, soin du visage selon la saison… Netlinking : salle de sport partenaire, association des commerçants, marque de cosmétiques, blog local, annuaire de la ville, presse de quartier. Fiche Google : catégories, services avec prix, 30 photos, réponse à tous les avis. Suivi mensuel.",
    "Fiche produit « Sencha bio de Shizuoka » réécrite : title de 58 caractères, description propre, H2 sur goût, préparation, producteur, conseils, maillage vers la catégorie et vers l'article sur la préparation, balisage Product avec prix et avis validé. Six articles sur trois mois liés aux requêtes informationnelles. Netlinking : producteurs partenaires, blogs thé sérieux, salon du thé, interview dans un podcast, épicerie fine partenaire ; pas d'achat de liens. Pas de fiche Google, car pas de boutique physique. Suivi : clics, positions et achats organiques dans GA4.",
    "Page « Expert-comptable pour créateurs à Rennes » : title, meta description, H1, H2 sur statuts, tarifs, accompagnement, simulateur, cas d'un client artisan, balisage AccountingService. Six articles de l'équipe signés par l'expert-comptable, pour montrer l'expertise réelle. Netlinking : CCI, BGE, Ordre régional, incubateur, banque partenaire, CMA, presse éco locale. Fiche Google : catégorie exacte, services, publications mensuelles, réponse à tous les avis. Suivi dans la Search Console : la page profil créateurs est passée de 0 à 340 impressions en six semaines.",
    "Page « Traiteur entreprise Bordeaux » : title de 52 caractères, meta description avec le minimum de commande et la livraison, H2 sur les formules, les prix, les allergènes et les délais, photos des buffets, balisage Restaurant et menu en texte. Six contenus : formules de saison, buffet de fin d'année… Netlinking : coworking partenaire, office de tourisme, association des commerçants, guide gastronomique local, fournisseurs. Fiche Google : produits, menu, photos chaque semaine, réponse à tous les avis. Suivi mensuel des clics et des demandes de devis.",
    "Page quartier « Vendre à Annecy-le-Vieux » : title, meta description avec les prix récents, H2 sur prix au m², délais de vente, écoles, transports, ventes réalisées, balisage RealEstateAgent. Six contenus : un par quartier et un guide du vendeur. Netlinking : notaires partenaires, diagnostiqueurs, club d'entreprises, presse locale, associations de quartier, banque. Fiche Google : catégories, photos de l'équipe, publication de chaque vente, avis demandés après signature. Suivi Search Console et formulaires d'estimation dans GA4.",
    "J'ai optimisé ma page « Diagnostic d'organisation pour PME » : title de 55 caractères, meta description avec la durée et le résultat, H2 sur méthode, livrables, cas clients, prix indicatif, balisage ProfessionalService. Six articles tirés des questions de mes clients, avec mes chiffres réels. Netlinking : deux experts-comptables partenaires, CCI, réseau d'entrepreneurs, podcast local, intervention en école de commerce, article invité dans un média industriel. Fiche Google créée. Suivi mensuel des clics et des prises de rendez-vous.",
    "Page « Faire un don à la recyclerie » optimisée : title, meta description, H2 sur l'utilisation des dons, la réduction d'impôt, les emplois financés, balisage NGO. Six contenus : réparer un meuble, histoire d'un salarié en insertion… Netlinking : mairie, métropole, réseau des ressourceries, presse locale, entreprises mécènes, université ; pas d'échanges de liens systématiques. Fiche Google : horaires justes, photos, réponse à tous les avis. Suivi mensuel des clics et des dons.",
  ],
  // 8 — C5 réseaux sociaux et influence
  [
    "Réseaux choisis : Facebook pour les propriétaires de 45 à 65 ans de mon secteur, LinkedIn pour les syndics. Pas d'Instagram ni de TikTok. Ligne éditoriale : avant/après de chantiers, conseils économies d'énergie, coulisses de l'équipe, avis clients ; ton simple et rassurant ; deux posts par semaine. Calendrier d'un mois avec un temps fort sur l'entretien avant l'hiver. Avis négatif : réponse publique factuelle puis appel. Influence : un artisan rénovateur local de 8 000 abonnés, brief écrit, contrat, mention « Collaboration commerciale » (loi du 9 juin 2023). Suivi : portée, clics, demandes de devis avec UTM.",
    "Instagram reste mon réseau principal, avec Facebook pour les clientes plus âgées. Piliers : avant/après, conseils, coulisses, clientes. Trois posts et des Stories quotidiennes, un Reel par semaine. Calendrier d'un mois avec la fête des mères. Modération : réponse sous 24 h, jamais de suppression d'une critique. Influence : une micro-influenceuse beauté de Villeurbanne, 5 400 abonnés, 6 % d'engagement ; brief, contrat écrit et mention « Publicité » visible. Suivi : portée, engagement, réservations via un lien UTM.",
    "Instagram et Pinterest pour les particuliers, LinkedIn pour les coffrets d'entreprise. Ligne éditoriale : producteurs, rituels de préparation, recettes, clients ; ton chaleureux et pédagogique ; 3 posts Instagram, 10 épingles et 1 post LinkedIn par semaine. Calendrier d'un mois autour du Nouvel An chinois. Influence : une créatrice de contenu thé de 12 000 abonnés, contrat avec mention « Collaboration commerciale », code promo dédié. Suivi : clics UTM, ventes avec le code, engagement.",
    "LinkedIn d'abord : page du cabinet et profils des deux associés ; Instagram écarté. Piliers : actualité fiscale expliquée, coulisses du cabinet, témoignages de clients, conseils de création. Deux posts par semaine sur la page, un par associé. Calendrier d'un mois avec la date limite de la liasse. Modération : réponse factuelle sous 24 h. Influence : un entrepreneur rennais suivi sur LinkedIn pour un webinaire commun, partenariat écrit, mention claire du partenariat. Suivi : impressions, engagement, clics vers la page créateurs.",
    "Instagram pour les habitués et Facebook pour les plus de 40 ans, LinkedIn pour les entreprises clientes du traiteur. Piliers : plat du jour, coulisses de la cuisine, producteurs, clients. Une Story par jour, deux posts par semaine, un post LinkedIn traiteur par mois. Avis négatif sur un temps d'attente : excuses, explication, invitation. Influence : un compte food bordelais de 9 000 abonnés, repas offert et rémunération, contrat et mention « Publicité ». Suivi : réservations avec lien UTM et code.",
    "Instagram pour les biens et la vie des quartiers, Facebook pour les propriétaires plus âgés, LinkedIn pour les relations avec les notaires. Piliers : biens vendus, quartiers, conseils vendeurs, équipe. Trois posts par semaine. Calendrier d'un mois avec le bilan des prix du trimestre. Modération : charte et délai de 24 h. Influence : un créateur de contenu annécien de 15 000 abonnés pour une série sur les quartiers, contrat, mention « Collaboration commerciale ». Suivi : formulaires d'estimation venus des liens UTM.",
    "LinkedIn uniquement : mon profil d'abord, une page entreprise ensuite. Piliers : cas clients, idées reçues sur l'organisation, coulisses d'une mission, outils. Une publication le mardi, commentaires chez mes clients le jeudi. Calendrier d'un mois avec un carrousel par semaine. Modération : réponse argumentée aux désaccords. Influence : un dirigeant de PME très suivi pour un live commun, accord écrit et mention du partenariat. Suivi : impressions, visites de profil, rendez-vous via lien UTM.",
    "Facebook et Instagram pour les habitants, LinkedIn pour les entreprises mécènes. Piliers : objets du jour, avant/après réparation, portraits de salariés en insertion, événements. Quatre posts par semaine tenus par un binôme de bénévoles. Calendrier d'un mois autour de la semaine de réduction des déchets. Modération : réponse factuelle et bienveillante. Influence : une créatrice locale « seconde main » de 7 000 abonnés, bénévole, mais avec un accord écrit et une mention claire du partenariat. Suivi : visiteurs du samedi, dons et inscriptions bénévoles via UTM.",
  ],
  // 9 — C6 tableau de bord et analyse
  [
    "Tableau de bord Looker Studio de 9 KPI : sessions par canal, demandes de devis (événement clé GA4), taux de conversion, appels depuis la fiche, avis, position moyenne, coût Google Ads, coût par demande, chantiers signés. Calculs sur trois mois : Google Ads (900 € + 12 h × 45 €) / 21 demandes = 69 € ; SEO local (14 h × 45 €) / 33 demandes = 19 €. ROAS Google Ads : 18 400 € de chantiers / 900 € = 20. Décisions : renforcer la fiche Google, garder Google Ads plafonné à 8 € par jour, arrêter Facebook organique qui n'apporte rien. Limite : les appels directs ne sont pas tous attribués.",
    "Tableau de bord de l'institut sur trois mois, 8 KPI : réservations en ligne, réservations par source, clientes revenues, abonnées, engagement, clic des newsletters, avis, coût par nouvelle cliente. Calculs : publicité Instagram (150 € + 6 h × 30 €) / 11 nouvelles clientes = 30 € ; newsletter (9 h × 30 €) / 26 réservations = 10 €. ROI newsletter = (26 × 22 € de marge − 270 €) / 270 € = 1,1. Décisions : garder la newsletter, couper la publicité Instagram, renforcer le partenariat avec la salle de sport.",
    "Tableau de bord de la boutique, 10 KPI : sessions par canal, taux de conversion, panier moyen, CA par canal, ROAS, coût par vente, CA email, taux de clic email, abonnements, clients récurrents. Google Ads : 2 400 € de dépenses pour 11 600 € de CA, ROAS 4,8 ; emailing : 3 900 € de CA pour 15 h × 30 €, ROI largement positif ; Instagram : 6 % du CA pour 30 h de travail. Décisions : augmenter Google Ads Shopping de 20 %, ajouter un scénario d'anniversaire, réduire Instagram à deux posts par semaine.",
    "Tableau de bord mensuel du cabinet : impressions et clics Search Console, sessions organiques, rendez-vous pris (événement clé), abonnés LinkedIn, engagement, inscrits webinaire, lettres de mission signées, coût par client. Trois mois : LinkedIn (40 h × 40 €) / 5 clients = 320 € ; webinaires (12 h × 40 € + 200 €) / 3 clients = 227 € ; SEO (rédaction 1 200 € + 10 h) / 4 clients = 400 €. Décisions présentées à l'associé : un webinaire par mois, LinkedIn maintenu, pages SEO à rentabiliser sur l'année.",
    "Tableau de bord du bistrot sur trois mois, 8 KPI : vues et appels de la fiche, réservations en ligne, couverts du midi, commandes traiteur, avis, engagement Instagram, coût par commande traiteur. Mailing entreprises : 6 h × 25 € = 150 € pour 9 commandes traiteur, soit 17 € par commande et 2 250 € de CA. Instagram : 24 h pour une hausse non mesurable. Décisions : relancer le mailing chaque trimestre, ajouter un lien UTM dans la bio Instagram, viser 40 avis supplémentaires.",
    "Tableau de bord de l'agence : demandes d'estimation par source, coût par estimation, mandats, honoraires attribués, avis, position moyenne des pages quartiers. Google Ads : (900 € + 8 h × 35 €) / 24 estimations = 49 € ; pages quartiers : 31 estimations pour 2 000 € de rédaction. Mandats : 9, dont 4 venus de Google Ads. ROAS : 36 000 € d'honoraires / 900 € = 40. Décisions : garder Google Ads, ajouter deux pages quartiers, demander l'avis à chaque vente. Limite : certains vendeurs appellent après avoir vu le site.",
    "Tableau de bord sur trois mois : visites du profil LinkedIn, impressions, abonnés, rendez-vous pris, rendez-vous par source, missions signées, CA, temps passé. LinkedIn : 48 h à 60 € = 2 880 € pour 2 missions de 12 000 € ; Google Ads test : 300 € pour 0 rendez-vous, arrêté ; newsletter : 1 mission. ROI LinkedIn = (24 000 × 40 % de marge − 2 880) / 2 880 = 2,3. Décisions : garder LinkedIn, arrêter Google Ads, deux newsletters par an au lieu de quatre.",
    "Tableau de bord de la recyclerie, 8 KPI : visiteurs du samedi, dons en ligne, bénévoles inscrits, abonnés, engagement, clic de la newsletter, coût par bénévole, temps bénévole engagé. Sur trois mois : 640 € de dons en ligne, 7 bénévoles, 48 h de bénévolat sur les réseaux. Coût par bénévole recruté : 48 h × 20 € / 7 = 137 € de temps valorisé. Décisions : concentrer Instagram sur les appels à bénévoles, relancer la campagne de dons en novembre, réduire Facebook à deux posts par semaine.",
  ],
];

const BILANS_PERSONNELS = [
  "Ce travail m'a surtout appris à justifier chaque choix par un chiffre de mon entreprise.",
  "Le plus difficile a été de tout faire tenir dans le temps de l'atelier ; je reprendrai ce document la semaine prochaine.",
  "J'ai montré le résultat à mon associé, qui m'a fait deux remarques que j'ai intégrées.",
  "Cette partie entre directement dans mon projet final.",
  "J'ai comparé ma production avec celle d'un autre stagiaire en sous-groupe, ce qui m'a fait corriger un oubli.",
  "La correction du formateur m'a permis de repérer une erreur de méthode que je ne referai plus.",
  "J'avais des doutes sur ce sujet en arrivant, je me sens maintenant capable de le refaire seul{e}.",
  "Je me suis appuyé{e} sur les modèles fournis, que je réutiliserai dans l'entreprise.",
  "Je n'ai pas eu le temps de finaliser la mise en forme, mais le fond est complet.",
  "J'ai posé une question au formateur pendant l'atelier, ce qui m'a évité de partir dans la mauvaise direction.",
  "Je vais appliquer la première action dès lundi.",
  "Je dois encore gagner en rapidité sur les outils, mais la démarche est claire pour moi.",
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
    if (k === 1) return 1;
    if (k === 2) return 2;
    if (k === 3) return /email|e-mail|emailing/i.test(t) ? 4 : /google ads/i.test(t) ? 5 : 3;
    if (k === 4) return /netlinking|[ée]ditorial/i.test(t) ? 7 : 6;
    if (k === 5) return 8;
    return 9;
  }
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickWM14ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isWM14Formation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);
  const bloc = blocExercice(contexte || "", exerciceIdx);

  // Production tirée par permutation du rang du stagiaire, avec le même décalage pour toutes les
  // banques : un stagiaire garde la même entreprise d'un exercice à l'autre, et sur un groupe de
  // 8 stagiaires les 8 productions d'un même exercice sont toutes différentes. Le bilan personnel
  // change d'un exercice à l'autre. L'entreprise du stagiaire est citée quand elle est renseignée.
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
  "CAP Installateur thermique, puis brevet professionnel ; à mon compte depuis 2014",
  "BTS Management commercial opérationnel ; gérant{e} de boutique depuis six ans",
  "Licence professionnelle Commerce électronique",
  "Baccalauréat STMG, puis dix ans de vente en grande distribution",
  "CAP Esthétique cosmétique parfumerie et brevet professionnel",
  "Master en gestion des ressources humaines, consultant{e} indépendant{e} depuis 2019",
  "BTS Comptabilité et gestion, collaborat{/rice} de cabinet depuis 2018",
  "BTS Professions immobilières",
  "CAP Cuisine, puis quinze ans en restauration traditionnelle",
  "Licence d'économie sociale et solidaire",
  "Baccalauréat professionnel Commerce, reconversion vers la création d'une activité de traiteur",
  "BTS Communication, photographe indépendant{e} depuis 2020",
  "BTS Assistance technique d'ingénieur, assistant{e} commercial{e} en PME industrielle",
  "Diplôme d'école de commerce, reconversion dans l'accueil touristique",
  "CAP Maintenance des véhicules, puis brevet professionnel",
  "BPJEPS Activités de la forme",
  "BTS Support à l'action managériale",
  "Baccalauréat général, puis plusieurs années de vente à distance",
  "DUT Techniques de commercialisation",
  "Licence d'information-communication",
  "Diplôme d'études supérieures obtenu à l'étranger, en cours de reconnaissance",
  "Aucun diplôme dans le commerce : vingt ans d'expérience comme artisan menuisier",
  "BTS Négociation et digitalisation de la relation client",
  "Master en marketing, à mon compte depuis la fin de mes études",
  "BTS Tourisme, puis gestion d'un gîte familial",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant les classes virtuelles.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières pendant les classes virtuelles me conviennent.",
  "Non. Je porte des lunettes et j'apprécie des supports en police suffisamment grande pour la lecture à l'écran.",
  "Non, pas de handicap. Je précise que je suis moins à l'aise avec les outils informatiques, le tutoriel de prise en main me sera utile.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je souhaite seulement que les classes virtuelles soient enregistrées pour revoir les manipulations des outils.",
  "Non, aucune situation de handicap. J'ai besoin d'un peu de temps pour prendre en main les outils Google, je m'y préparerai.",
  "Non. Je préfère avoir les supports en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté lors de l'entretien.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible les deux jours de formation, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, en classe virtuelle depuis mon bureau.",
  "Je bloque les deux journées dans mon agenda (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) ; mon associé assure les rendez-vous clients pendant ces deux jours.",
  "Je suis disponible les deux jours de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>. Je dispose d'un ordinateur avec webcam et d'une connexion stable.",
  "Je peux suivre l'intégralité des deux journées à distance, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible les deux jours (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). J'ai fermé l'agenda de rendez-vous ces jours-là.",
  "Disponibilité complète sur les deux journées (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Je suivrai la formation depuis une pièce au calme, à l'écart de la boutique.",
  "Les deux jours de formation, je suis disponible de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; mon équipe gère les urgences pendant mon absence.",
  "Je suis disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> les deux jours. Je me connecterai depuis mon domicile.",
  "Je suivrai les deux journées en classe virtuelle (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) et je prévois une heure le soir pour avancer mon projet.",
  "Aucune contrainte sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> des deux jours. J'ai prévenu mes clients habituels de mon absence.",
];

/** Réponses d'évaluation des besoins propres à la formation webmarketing 14 h, différentes pour chaque stagiaire. */
export function getWM14EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = wm14Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilWM14(idx, s.nom, s.prenom);
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
      ? "Formation prise en charge par l'OPCO de l'entreprise."
      : "Financement personnel",
    projetPro: ent(profil.projet),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
