// ---------------------------------------------------------------------------
// TP Responsable de petite ou moyenne structure (RNCP38575) — moteur de réponses HUMANISÉES
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins (diplôme, objectif, projet, handicap, disponibilités, employeur…)
//   • test de positionnement de DÉBUT (10 questions ouvertes : socle puis CP1 à CP9)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées)
//   • mises en situation (copie du stagiaire, une banque par compétence)
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

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 6 variantes
// Ordre : socle, CP1, CP2, CP3, CP4, CP5, CP6, CP7, CP8, CP9
// ---------------------------------------------------------------------------
const DEBUT: string[][] = [
  // Q1 — obligations du dirigeant
  [
    "Je sais qu'il y a des obligations quand on a des salariés, mais je serais incapable de dire à partir de combien de personnes il faut un CSE.",
    "J'ai entendu parler de la facture électronique au travail, sans savoir quand ça devient obligatoire pour une petite entreprise.",
    "Je connais le document unique parce que mon responsable l'a mis à jour l'an dernier. Le reste, honnêtement, c'est flou.",
    "Je pense que ces règles concernent surtout les grandes entreprises. Je découvre qu'une PME est aussi concernée.",
    "Je connais l'index égalité de nom, je ne sais pas à partir de quel effectif il s'applique.",
    "Aucune idée précise. C'est justement la partie « dirigeant » que je viens chercher.",
  ],
  // Q2 — CP1 diagnostic et veille
  [
    "J'ai fait une SWOT en BTS, mais je confondais déjà les forces et les opportunités.",
    "PESTEL, je connais le mot. Je ne saurais pas remplir les six cases pour mon entreprise.",
    "La veille, chez nous, c'est le patron qui lit la presse professionnelle. Il n'y a rien d'organisé.",
    "Je regarde ce que font les concurrents sur Internet de temps en temps, sans méthode ni outil.",
    "Les forces de Porter, je n'en ai jamais entendu parler.",
    "Je sais faire un diagnostic « au feeling » : je vois ce qui ne va pas, mais je ne sais pas l'écrire de façon structurée.",
  ],
  // Q3 — CP2 territoire et visibilité
  [
    "Je sais que la CCI existe, je ne sais pas vraiment ce qu'elle peut apporter à une entreprise comme la nôtre.",
    "Notre fiche Google a été créée il y a longtemps, les horaires ne sont même plus à jour.",
    "On a une page Facebook mais personne ne l'alimente. LinkedIn, on n'y est pas.",
    "Je ne connais pas les acteurs du territoire à part la mairie et France Travail.",
    "Le réseau, pour moi, c'est le carnet d'adresses du gérant. Je n'ai jamais participé à un club d'entreprises.",
    "Je ne sais pas ce qu'est le référencement local, ni comment on mesure la visibilité d'une entreprise.",
  ],
  // Q4 — CP3 management
  [
    "J'ai déjà encadré deux saisonniers, mais sans méthode : je leur montrais et je corrigeais au fur et à mesure.",
    "Je n'ai jamais recruté. Je ne sais pas ce qu'est une DPAE.",
    "Je connais le style directif et le style participatif. Je ne savais pas qu'il fallait adapter son style à chaque personne.",
    "Les conflits, j'ai tendance à les laisser se régler tout seuls. Je sais que ce n'est pas la bonne solution.",
    "Je fais des entretiens annuels avec mon équipe, mais je ne connais pas la différence avec l'entretien professionnel.",
    "En droit du travail, je connais les 35 heures et les congés payés, pas beaucoup plus.",
  ],
  // Q5 — CP4 offre et marché
  [
    "Je pense qu'une étude de marché, c'est un questionnaire. Je ne savais pas qu'il y avait une partie qualitative.",
    "La segmentation, je l'ai vue en cours sans jamais l'appliquer à une vraie entreprise.",
    "Je connais les 4P. Les 7P, je ne savais pas que ça existait.",
    "Chez nous, le prix est fixé en regardant la concurrence. Je ne connais pas d'autre méthode.",
    "Le mot persona ne me dit rien.",
    "Je sais qui sont nos clients, mais je serais incapable de les classer en segments ou de dire lequel est prioritaire.",
  ],
  // Q6 — CP5 diffusion commerciale
  [
    "On n'a pas de plan d'actions commerciales écrit. On répond aux demandes qui arrivent.",
    "J'ai fait de la prospection téléphonique, sans script ni méthode de découverte.",
    "Je ne savais pas qu'il y avait des règles RGPD pour envoyer des e-mails commerciaux.",
    "Nous avons un CRM mais il est mal rempli, donc personne ne s'en sert vraiment.",
    "Je connais le NPS de nom, je ne sais pas le calculer.",
    "Les objectifs SMART, je sais ce que veut dire l'acronyme, je n'en ai jamais rédigé pour de vrai.",
  ],
  // Q7 — CP6 production
  [
    "Je ne connais pas le TRS. Chez nous, on parle seulement de retards et de commandes en attente.",
    "La méthode ABC, je l'ai vue en logistique, sans faire le lien avec les ruptures de stock.",
    "Le planning est sur un tableau blanc. Gantt, je connais de nom.",
    "Je connais la roue de Deming, j'aurais du mal à l'appliquer à un vrai problème.",
    "Le 5S, je ne sais pas ce que c'est.",
    "Pour la qualité, on traite les réclamations au cas par cas, sans chercher la cause racine.",
  ],
  // Q8 — CP7 bilan
  [
    "Je sais que le bilan, c'est l'actif et le passif. Je ne saurais pas l'interpréter.",
    "Le BFR, j'en ai entendu parler sans comprendre pourquoi il pèse sur la trésorerie.",
    "Je confonds encore le bilan et le compte de résultat.",
    "Je n'ai jamais vu le bilan de mon entreprise d'accueil, c'est le comptable qui s'en occupe.",
    "Je sais qu'une entreprise peut gagner de l'argent et manquer de trésorerie, je ne sais pas l'expliquer.",
    "Les ratios financiers, je ne connais que le taux d'endettement, et encore approximativement.",
  ],
  // Q9 — CP8 compte de résultat
  [
    "Je sais calculer une marge simple. La valeur ajoutée et l'EBE, je ne saurais pas.",
    "Le seuil de rentabilité, je comprends l'idée mais je n'ai jamais fait le calcul.",
    "La CAF, je ne sais pas ce que c'est.",
    "Je ne sais pas faire la différence entre une charge fixe et une charge variable dans un vrai compte de résultat.",
    "Je regarde le chiffre d'affaires et le résultat, rien entre les deux.",
    "Les soldes intermédiaires de gestion, je les ai vus en cours, j'ai tout oublié.",
  ],
  // Q10 — CP9 rapport d'activité
  [
    "Je n'ai jamais rédigé de rapport d'activité. Chez nous, il n'en existe pas.",
    "La RSE, pour moi, c'est surtout le tri des déchets. Je ne savais pas qu'il y avait un volet social.",
    "Je ne connais pas les indicateurs sociaux à publier.",
    "J'ai déjà présenté des chiffres en réunion, mais avec un tableau Excel brut, sans graphique.",
    "La CSRD, je ne sais pas si elle concerne une PME.",
    "Je suis à l'aise à l'oral, mais je ne saurais pas structurer un rapport de plusieurs pages.",
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 6 variantes
// ---------------------------------------------------------------------------
const FIN: string[][] = [
  [
    "CSE dès 11 salariés pendant 12 mois consécutifs, DUERP dès le premier salarié, index égalité dès 50 salariés, obligation d'emploi de 6 % de travailleurs handicapés dès 20 salariés. Pour la facturation électronique, la réception est obligatoire depuis le 1er septembre 2026 et l'émission le sera pour les PME au 1er septembre 2027.",
    "J'ai construit le tableau des obligations de ma structure avec le seuil, l'échéance et la preuve à conserver. Nous avons choisi une plateforme agréée pour la facture électronique.",
    "Je sais que la CSRD ne nous concerne pas directement depuis la directive Omnibus, mais que nos gros clients nous envoient des questionnaires RSE : je prépare les réponses.",
    "Le DUERP est mis à jour chaque année à partir de 11 salariés et à chaque changement important ; je sais qu'il se conserve 40 ans.",
    "Je repère maintenant les seuils d'effectif qui déclenchent une obligation et je les anticipe avant de recruter.",
    "J'ai désigné un responsable par obligation dans le planning de la structure, avec une alerte avant chaque échéance.",
  ],
  [
    "PESTEL pour le macro-environnement, SWOT pour croiser interne et externe, Porter pour l'attractivité du secteur. Je ne confonds plus forces et opportunités : une force est interne, une opportunité externe.",
    "J'ai mis en place une veille avec Google Alerts et Feedly sur cinq sources : INSEE, CCI, fédération, BODACC et INPI. Une synthèse part chaque mois en réunion de direction.",
    "Mon diagnostic de l'entreprise d'accueil a débouché sur quatre recommandations, chacune reliée à un constat précis.",
    "La veille n'a d'intérêt que si elle est exploitée : chaque information retenue est rattachée à une décision ou à une action.",
    "J'ai appliqué les 5 forces de Porter à notre secteur : le pouvoir des clients est fort, celui des fournisseurs moyen, la menace des entrants faible.",
    "Je sais aussi intégrer la sécurité numérique au diagnostic : sauvegardes, accès, RGPD, avec la responsabilité du dirigeant en cas d'incident.",
  ],
  [
    "J'ai cartographié les acteurs : préfecture, DREETS, Région, EPCI, CCI, CMA, Bpifrance, France Travail, avec ce que chacun peut apporter à l'entreprise.",
    "Fiche Google mise à jour, NAP identique partout, page LinkedIn créée : les appels issus de la fiche ont augmenté en trois mois.",
    "J'ai bâti un plan de visibilité sur six mois avec un budget et cinq indicateurs suivis chaque mois.",
    "Nous avons adhéré à un club d'entreprises et noué un partenariat avec un CFA du secteur pour recruter des alternants.",
    "Je sais mesurer la visibilité locale : vues de la fiche, demandes d'itinéraire, appels, leads et abonnés.",
    "J'ai présenté à mon responsable trois partenariats possibles, chacun avec un bénéfice pour les deux parties.",
  ],
  [
    "Recrutement : fiche de poste, sourcing multicanal, entretien STAR identique pour tous, DPAE dans les 8 jours avant l'embauche, onboarding sur 90 jours.",
    "J'adapte mon style à la maturité de chaque collaborateur : directif avec un débutant, délégatif avec quelqu'un d'autonome.",
    "Face à un conflit, je reçois chaque personne séparément, puis je fais une médiation avec la méthode DESC et je fixe un suivi à J+15 et J+30.",
    "Je distingue l'entretien annuel, centré sur les objectifs, de l'entretien professionnel, centré sur le parcours et la formation.",
    "Je connais les bases du droit du travail du dirigeant : contrats, durée du travail, heures supplémentaires, repos, CSE, DUERP.",
    "J'ai construit un plan managérial avec des rituels, des entretiens individuels et un baromètre QVCT.",
  ],
  [
    "Une étude de marché combine du quantitatif (questionnaire, données INSEE) et du qualitatif (entretiens, observation).",
    "J'ai segmenté nos clients en trois segments, retenu une cible prioritaire avec la matrice attractivité × accessibilité et rédigé deux personas.",
    "J'ai construit le mix 7P de notre offre, avec trois actions par P.",
    "Je connais trois méthodes de fixation du prix : coût majoré, valeur perçue et alignement sur le marché.",
    "Notre formule de positionnement précise la cible, la catégorie, le bénéfice et ce qui nous différencie.",
    "J'ai estimé le CA additionnel en multipliant la taille de la cible par le taux de pénétration visé et le panier moyen.",
  ],
  [
    "J'ai rédigé un plan d'actions commerciales sur douze mois avec quatre objectifs SMART, un calendrier et des indicateurs mensuels.",
    "En prospection téléphonique j'utilise la méthode BEBEDC pour qualifier le besoin.",
    "En B2B, l'e-mail de prospection doit être en lien avec la fonction du destinataire et comporter un lien de désinscription.",
    "Nous suivons l'entonnoir dans le CRM, des suspects jusqu'aux clients gagnés, avec un taux de transformation autour de 25 %.",
    "Je calcule le NPS : pourcentage de promoteurs moins pourcentage de détracteurs.",
    "J'ai mis en place un tableau de bord commercial de dix indicateurs revu chaque mois avec l'équipe.",
  ],
  [
    "TRS = disponibilité × performance × qualité ; 62 % est faible, la cible courante est autour de 85 %.",
    "J'utilise la méthode ABC pour concentrer le suivi sur les références A, et la formule de Wilson pour la quantité économique de commande.",
    "Le planning de production est passé du tableau blanc à un Gantt partagé, avec le chemin critique identifié.",
    "J'ai mené un chantier 5S sur huit semaines dans l'atelier : trier, ranger, nettoyer, standardiser, respecter.",
    "Pour un problème qualité, je fais un Ishikawa 5M puis les 5 Pourquoi jusqu'à la cause racine, et je suis l'action avec un PDCA.",
    "J'intègre la sécurité et l'environnement : DUERP, EPI, tri des cinq flux et bilan carbone simplifié.",
  ],
  [
    "FR = ressources stables − emplois stables ; BFR = stocks + créances − dettes d'exploitation ; trésorerie nette = FR − BFR.",
    "Une entreprise rentable peut manquer de trésorerie si son BFR dépasse son fonds de roulement : c'est ce que j'ai montré sur le cas BTP.",
    "Je calcule les ratios d'autonomie, d'indépendance, d'endettement et les délais clients et fournisseurs, et je les compare aux normes.",
    "Je sais que le délai de paiement entre professionnels est plafonné à 60 jours et je le vérifie dans l'analyse.",
    "J'ai analysé le bilan de mon entreprise d'accueil avec le comptable et proposé trois préconisations.",
    "En cas de cessation de paiement, le dirigeant a 45 jours pour la déclarer ; les procédures amiables existent avant.",
  ],
  [
    "Je calcule les SIG dans l'ordre : marge commerciale, production, valeur ajoutée, EBE, résultat d'exploitation, résultat courant, résultat net.",
    "La CAF se calcule par la méthode additive, à partir du résultat net, ou soustractive, à partir de l'EBE ; les deux doivent donner le même montant.",
    "Seuil de rentabilité = charges fixes / taux de marge sur coût variable ; le point mort donne la date à laquelle il est atteint.",
    "J'ai montré sur le cas de services que le CA progressait de 9 % mais l'EBE de seulement 2 % : les charges augmentent plus vite que l'activité.",
    "Je sépare charges fixes et variables pour raisonner en marge sur coût variable.",
    "J'ai calculé le seuil de rentabilité de mon entreprise d'accueil et proposé un suivi mensuel.",
  ],
  [
    "Mon rapport d'activité suit le plan type : mot du dirigeant, présentation, activité, performance financière, RSE, perspectives, annexes.",
    "Le volet RSE couvre l'environnement, le social et le sociétal, en respectant les seuils réellement applicables à la structure.",
    "Je présente huit indicateurs sur trois exercices avec des graphiques lisibles.",
    "Je sais qu'une PME de moins de 250 salariés n'est soumise ni à la DPEF ni à la CSRD : son volet RSE est volontaire ou demandé par ses clients.",
    "J'ai préparé douze diapositives avec la règle 6×6 et anticipé les questions sensibles.",
    "J'ai rédigé le mot du dirigeant en une page : vision, faits marquants, perspectives.",
  ],
];

export function getRPMSAutoAnswers(
  nom: string | undefined,
  prenom: string | undefined,
  civilite: string | undefined,
  isDebut: boolean,
  nbQuestions = 10,
): { reponses: string[]; scores: number[] } {
  const seed = rpmsSeed(nom, prenom);
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
// Analyse des besoins — besoin principal exprimé, par stagiaire
// ---------------------------------------------------------------------------
const BESOINS_VARIANTES: string[] = [
  "Savoir lire le bilan et le compte de résultat de la structure pour prendre des décisions chiffrées.",
  "Apprendre à recruter et à animer une équipe, en particulier gérer les conflits.",
  "Construire un plan d'actions commerciales et suivre ses indicateurs.",
  "Maîtriser le seuil de rentabilité et le suivi de la trésorerie avant de reprendre une entreprise.",
  "Structurer le diagnostic stratégique et mettre en place une veille utile.",
  "Développer la visibilité locale de la structure et son réseau de partenaires.",
  "Organiser la production pour réduire les retards et les ruptures de stock.",
  "Connaître les obligations légales du dirigeant et les seuils d'effectif.",
  "Rédiger et présenter un rapport d'activité clair à la direction.",
  "Passer d'un poste d'adjoint{e} à la direction d'une agence en sécurisant le volet gestion.",
  "Préparer le Dossier Professionnel et les présentations de projet devant le jury.",
  "Adapter l'offre aux attentes des clients et fixer les prix avec méthode.",
];

export function getRPMSBesoin(nom?: string, prenom?: string, civilite?: string): string {
  const seed = rpmsSeed(nom, prenom);
  const fem = isFeminin(civilite, prenom);
  return accorder(BESOINS_VARIANTES[seed % BESOINS_VARIANTES.length], fem);
}

// ---------------------------------------------------------------------------
// Mises en situation — production écrite du stagiaire, une banque par compétence
// Indices : 0 socle, 1 à 9 = CP1 à CP9
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Socle : obligations du dirigeant
  [
    "J'ai dressé le tableau des obligations pour mon entreprise d'accueil (27 salariés). CSE : en place, effectif au-dessus de 11 depuis plus de 12 mois. DUERP : existant mais non mis à jour depuis 2024, je l'ai signalé avec une proposition de date de revue. Index égalité : non applicable sous 50 salariés. Obligation d'emploi de travailleurs handicapés : applicable, 6 % de 27 = 1,62, soit 1 bénéficiaire à employer ; la déclaration passe par la DSN. Facturation électronique : réception obligatoire depuis le 1er septembre 2026, émission au 1er septembre 2027 ; le choix de la plateforme agréée est à faire avec l'expert-comptable. CSRD : non applicable, mais un client grand compte nous a envoyé un questionnaire RSE. J'ai nommé un responsable pour chaque ligne.",
    "Ma structure d'accueil est une association de 14 salariés. J'ai vérifié chaque seuil : CSE obligatoire (plus de 11 salariés depuis plus d'un an), DUERP obligatoire et à jour, pas d'index égalité ni d'obligation d'emploi de travailleurs handicapés (moins de 20 salariés). Pour la facturation électronique, l'association n'est concernée que pour ses activités assujetties à la TVA : j'ai noté le point à faire valider. J'ai ajouté pour chaque obligation la preuve à conserver (PV d'élection, DUERP daté, registre unique du personnel).",
    "J'ai pris le cas d'une PME de 30 salariés. Tableau en six lignes avec seuil, échéance, preuve et responsable. J'ai rappelé que le DUERP se met à jour chaque année à partir de 11 salariés et se conserve 40 ans, et que la CSSCT n'est obligatoire qu'à partir de 300 salariés. Mon formateur m'a fait corriger un point : j'avais écrit que l'index égalité s'appliquait dès 20 salariés, c'est 50.",
    "Pour l'agence où je travaille (42 salariés), j'ai identifié une échéance proche : le passage aux 50 salariés prévu l'an prochain déclenchera l'index égalité et les attributions étendues du CSE. J'ai proposé d'anticiper en calculant dès maintenant les indicateurs de l'index. Pour la facturation électronique, j'ai listé trois plateformes agréées à comparer et l'impact sur le logiciel de facturation actuel.",
  ],
  // 1 — CP1 : diagnostic et veille
  [
    "PESTEL : j'ai retenu deux facteurs par dimension pour notre PME de mécanique de précision (prix de l'énergie et taux d'intérêt pour l'économique, facturation électronique et normes environnementales pour le légal…). SWOT : cinq items par case, en vérifiant que les opportunités et les menaces étaient bien externes. Porter : pouvoir des clients fort (trois donneurs d'ordre font 60 % du CA), menace des substituts faible. Veille : Google Alerts sur nos trois concurrents, Feedly sur la presse de la fédération, consultation mensuelle du BODACC. Ma note de synthèse propose de réduire la dépendance aux trois clients principaux.",
    "J'ai réalisé le diagnostic de l'entreprise d'accueil. Ma première SWOT mélangeait encore forces et opportunités ; je l'ai reprise après la correction. Les 5 forces de Porter montrent un secteur très concurrentiel avec des entrants nombreux. J'ai proposé un dispositif de veille piloté par l'assistante de direction : cinq sources, deux outils, synthèse mensuelle en réunion. Quatre recommandations, dont la diversification vers la maintenance.",
    "Mon diagnostic porte sur une PME industrielle de 38 salariés. Facteurs PESTEL sourcés (INSEE, CCI, presse sectorielle). SWOT complète. Porter noté de faible à forte pour chaque force. Veille : périmètre (concurrence, réglementation, technologie), sources, outils, fréquence hebdomadaire, pilote nommé. J'ai identifié trois acteurs du territoire à rencontrer : la CCI, l'agence régionale de développement et Bpifrance. Note de synthèse de deux pages.",
    "J'ai d'abord listé les informations disponibles sur le secteur, puis construit le PESTEL et la SWOT. Le point le plus utile a été la chaîne de valeur : elle a montré que la valeur se crée surtout dans le service après-vente. Ma recommandation principale : développer les contrats de maintenance. J'ai ajouté un volet sécurité numérique au diagnostic (sauvegardes, droits d'accès), suite à une remarque du formateur.",
  ],
  // 2 — CP2 : territoire et visibilité
  [
    "Cartographie réalisée : préfecture et DDETS pour les aides à l'embauche, Région pour les aides à l'investissement, communauté d'agglomération pour le foncier, CCI pour les formalités et le réseau, CMA pour les sous-traitants artisans. Plan numérique sur six mois : fiche Google mise à jour, dix mots-clés locaux, page LinkedIn, deux annuaires. Budget de 16 500 € HT, en dessous des 18 000 € fixés. Cinq KPI mensuels.",
    "J'ai commencé par corriger la fiche Google de l'entreprise : horaires faux, adresse différente de celle du site. J'ai appliqué la règle NAP sur tous les supports. Puis j'ai planifié huit actions physiques sur l'année (salon régional, deux afterworks du club d'entreprises, forum emploi, portes ouvertes…). Trois partenariats proposés : un CFA, un fournisseur local, une association d'insertion.",
    "Plan d'inscription territoriale pour une PME de 32 salariés en Occitanie. Chaque acteur institutionnel est présenté avec ce qu'il peut apporter. Le plan numérique est chiffré action par action. J'ai défini cinq indicateurs : vues de la fiche, appels, demandes d'itinéraire, demandes de devis, abonnés LinkedIn. Le formateur m'a demandé de dater précisément les actions physiques, je l'ai fait.",
    "J'ai mené l'exercice sur mon entreprise d'accueil, un commerce de proximité. Priorités : avis clients sur la fiche Google, présence sur Instagram, partenariat avec l'association des commerçants. J'ai proposé une adhésion à la CCI pour accéder aux ateliers numériques. Budget modeste, 4 200 € sur six mois, et suivi mensuel des indicateurs.",
  ],
  // 3 — CP3 : management
  [
    "Fiche de poste du chef de projet senior : missions, compétences, rattachement, rémunération, CDI. Sourcing : APEC, LinkedIn, cooptation avec prime, pour un budget de 2 800 €. Grille STAR de huit questions, identique pour tous les candidats. Onboarding : accueil et matériel à J1, binôme en S1, premier point à M1, bilan de période d'essai à M3. L'Ishikawa du turnover fait ressortir surtout le management et l'absence de perspectives. Plan managérial : réunion hebdomadaire, entretiens individuels mensuels, baromètre QVCT trimestriel.",
    "J'ai construit la grille d'entretien STAR en huit questions comportementales et je l'ai testée avec un collègue. Pour les formalités, j'ai rappelé la DPAE à l'URSSAF dans les 8 jours avant l'embauche, la visite d'information et de prévention et l'affiliation à la mutuelle. Les causes du turnover relevées par l'Ishikawa : charge mal répartie, absence d'entretiens, outils obsolètes. Planning des entretiens professionnels établi sur deux ans.",
    "Mon plan managérial part d'un constat : 28 % de turnover, surtout dans la première année. J'ai donc renforcé l'onboarding sur 90 jours avec des livrables à chaque étape. J'ai adapté le management situationnel à trois profils de l'équipe : directif pour la nouvelle recrue, participatif pour la chargée de projet confirmée, délégatif pour le plus ancien. J'ai rappelé la sanction de 3 000 € sur le CPF dans les entreprises d'au moins 50 salariés.",
    "Pour la gestion du conflit entre deux collaborateurs, j'ai décrit une démarche en quatre étapes : entretiens séparés, recherche des causes, médiation avec la méthode DESC, engagements écrits et suivi à J+15 et J+30. J'ai complété par une fiche de poste et un plan de sourcing multicanal. Le formateur a validé l'ensemble en me demandant de mieux chiffrer le budget de recrutement.",
  ],
  // 4 — CP4 : offre
  [
    "Étude de marché : sources INSEE, fédération de la cosmétique, Google Trends, puis 120 questionnaires et 8 entretiens en magasin. Trois segments : jeunes actives urbaines, familles attentives aux ingrédients, seniors aux peaux sensibles. Deux personas détaillés. La matrice attractivité × accessibilité fait ressortir les familles comme cible prioritaire. Mix 7P avec trois actions par P. CA additionnel estimé à 210 k€ sur douze mois.",
    "J'ai travaillé sur l'offre de mon entreprise d'accueil, un service de nettoyage professionnel. Segments : bureaux, commerces, copropriétés. Persona principal : la gestionnaire de copropriété. Positionnement : « Pour les syndics exigeants, une offre de nettoyage avec suivi en ligne et intervention sous 24 h, différente des acteurs nationaux par sa réactivité locale. » Prix fixés par la méthode du coût majoré, contrôlés par rapport au marché.",
    "Mon étude combine une partie quantitative (questionnaire en ligne, 85 réponses) et une partie qualitative (cinq entretiens semi-directifs). J'ai segmenté selon des critères socio-démographiques, psychographiques et comportementaux (RFM). La cible prioritaire retenue est justifiée par la matrice. Le mix 7P comprend une action d'écoconception sur l'emballage.",
    "J'ai d'abord mal formulé le positionnement (trop vague). Après correction : cible, catégorie, bénéfice et différence par rapport aux concurrents sont explicites. Les deux personas sont construits à partir des entretiens. Estimation du CA additionnel : 1 500 clients potentiels × 8 % de pénétration × 95 € de panier × 4 achats par an, soit environ 45 600 €.",
  ],
  // 5 — CP5 : diffusion
  [
    "Objectif global : passer de 1,1 à 1,4 M€, soit +300 k€ (+27,3 %). Quatre objectifs SMART : 18 nouveaux clients, panier moyen porté de 21 à 24 k€, taux de fidélisation de 80 %, taux de transformation de 25 %. PAC sur douze mois avec un calendrier trimestriel. Prospection : phoning BEBEDC, emailing avec lien de désinscription, social selling sur LinkedIn. CRM retenu : HubSpot Free puis version payante au deuxième semestre. Tableau de bord de dix indicateurs.",
    "J'ai construit l'entonnoir de conversion : 600 suspects, 180 prospects, 60 leads qualifiés (BANT), 30 opportunités, 15 clients gagnés, soit 25 % de transformation. Le plan de fidélisation repose sur un NPS semestriel, un CSAT après chaque projet et un traitement des réclamations selon la méthode CRAC. Le formateur m'a demandé de vérifier que les quatre objectifs atteignaient bien le total de +300 k€ : j'ai corrigé le panier moyen.",
    "Pour l'entreprise d'accueil, j'ai rédigé un PAC sur douze mois : cibles (PME industrielles du département), actions (deux salons, campagne d'e-mails, rendez-vous terrain), moyens (budget de 9 000 €, CRM Axonaut), calendrier et indicateurs. J'ai rappelé les règles RGPD en B2B et prévu un A/B test sur l'objet des e-mails.",
    "J'ai choisi Sellsy pour son module de devis intégré, budget annuel d'environ 1 400 €. Mes dix indicateurs : rendez-vous, devis envoyés, taux de signature, CA mensuel, marge, panier moyen, nouveaux clients, clients perdus, NPS et délai de réponse aux demandes. Revue mensuelle avec l'équipe et actions correctives quand un indicateur dérive.",
  ],
  // 6 — CP6 : production
  [
    "VSM simplifiée de la ligne d'usinage : flux matière et information, temps de cycle, stocks entre les postes ; le goulet est au contrôle final. TRS = disponibilité × performance × qualité ; avec une qualité de 95,2 % (rebut 4,8 %), la perte principale vient de la disponibilité. Chantier 5S sur huit semaines. ABC : 18 % des références font 79 % de la valeur, ce sont elles qui sont en rupture. Plan PDCA de cinq actions chiffrées, pour 34 000 € au total.",
    "J'ai analysé le rebut avec un Ishikawa 5M puis les 5 Pourquoi : la cause racine est un réglage de machine non standardisé entre les équipes. Action : fiche de réglage standard et formation des opérateurs. Pour les stocks, j'ai appliqué la formule de Wilson sur les références A et défini un stock de sécurité. ISO 9001 : 12 à 18 mois, coût estimé entre 15 et 25 k€ avec l'accompagnement.",
    "Dans mon entreprise d'accueil (prestations de services), j'ai adapté l'exercice : planning des interventions sous forme de Gantt, suivi des retards, Kanban pour les dossiers en cours. Le PDCA a porté sur les retards de livraison : objectif −30 % en six mois. J'ai ajouté le volet sécurité (DUERP, EPI) et le tri des cinq flux de déchets.",
    "J'ai calculé le TRS de 62 % et montré l'écart avec la cible de 85 %. Le chantier 5S est planifié semaine par semaine avec un pilote par zone. J'ai proposé une démarche d'achats responsables (fournisseurs locaux, critères RSE dans les consultations). Le formateur m'a fait compléter le plan PDCA par des indicateurs de suivi.",
  ],
  // 7 — CP7 : bilan
  [
    "Bilan fonctionnel : ressources stables 2 850 k€ (capitaux propres 1 280 + amortissements 850 + dettes LT 720), emplois stables 2 100 k€, donc FR = 750 k€. BFR = (480 + 1 920) − (980 + 310) = 1 110 k€. Trésorerie nette = 750 − 1 110 = −360 k€, ce que confirment les disponibilités de 65 k€ face à 425 k€ de concours bancaires. Le BFR est financé par le découvert.",
    "Ratios : autonomie financière 34,5 %, indépendance 64 %, capacité d'endettement 3 ans (4,8 ans avec le découvert), délai clients 74 jours, délai fournisseurs 84 jours. Trois faiblesses : trésorerie négative, clients payés trop tard, fournisseurs réglés au-delà du plafond légal de 60 jours. Préconisations : relances systématiques et affacturage, acomptes sur les chantiers, prêt à moyen terme pour consolider le découvert, réduction des stocks, échéancier fournisseurs.",
    "J'ai d'abord vérifié l'équilibre du bilan : 4 565 k€ à l'actif comme au passif. Puis FR (750), BFR (1 110) et TN (−360). Le BFR représente 51 jours de CA HT. Le risque de cessation de paiement à six mois est réel si la banque réduit le découvert autorisé : je propose un plan de trésorerie mensuel et une rencontre anticipée avec le banquier.",
    "Mon analyse insiste sur le délai fournisseurs de 84 jours : au-delà du plafond légal de 60 jours, l'entreprise s'expose à une amende administrative et à des tensions avec ses fournisseurs. Préconisations chiffrées : ramener le délai clients de 74 à 60 jours libérerait environ 365 k€ de trésorerie (14 jours de CA TTC). Le formateur a validé le calcul.",
  ],
  // 8 — CP8 : compte de résultat
  [
    "SIG : consommations en provenance des tiers 1 070, valeur ajoutée 1 330, EBE 290, résultat d'exploitation 195, résultat courant avant impôt 167, résultat avant IS 179, IS 50,1, résultat net 128,9 k€. CAF : 223,9 k€ par les deux méthodes. Taux de VA 55,4 %, taux de marge d'EBE 12,1 %, part du personnel dans la VA 73,7 %, marge nette 5,4 %.",
    "Charges variables : 690 k€ ; MCV 1 710 k€, soit un taux de 71,25 %. Charges fixes : 1 543 k€ ; contrôle 1 710 − 1 543 = 167, égal au résultat courant. Seuil de rentabilité : 2 165,6 k€ ; point mort au 325e jour, fin novembre. La structure est vulnérable : une baisse de 10 % du CA ferait passer sous le seuil.",
    "Écarts N/N-1 : CA +200 k€ (+9,1 %), EBE +5 k€ (+1,8 %), taux d'EBE en baisse de 12,95 % à 12,1 %. La croissance ne se retrouve pas dans la rentabilité, à cause du poids du personnel. Quatre préconisations : planification des équipes, révision des prix, renégociation des charges externes, suivi mensuel du seuil de rentabilité.",
    "J'avais d'abord oublié la variation de stocks dans les consommations ; après correction, la valeur ajoutée est bien de 1 330 k€. J'ai vérifié la CAF par les deux méthodes (223,9 k€). J'ai présenté le point mort sous forme de graphique pour le rendre lisible par un non-spécialiste.",
  ],
  // 9 — CP9 : rapport d'activité
  [
    "Sommaire en sept chapitres conforme au plan type. Mot du dirigeant d'une page : croissance de l'activité, arrivée de deux cadres, perspectives d'export. Tableau de huit indicateurs sur trois exercices et trois graphiques. Volet RSE : bilan carbone simplifié (scopes 1, 2 et 3), obligation d'emploi de 6 % de travailleurs handicapés respectée, index égalité non obligatoire à 42 salariés mais calculé volontairement. Pas de DPEF ni de CSRD à ce niveau d'effectif.",
    "J'ai rédigé le rapport en langage simple pour des actionnaires non financiers. Le volet social présente l'effectif, la formation, le taux de fréquence et le taux de gravité des accidents. Les perspectives sont chiffrées sur trois axes. Diaporama de douze diapositives avec la règle 6×6, et cinq questions sensibles préparées (retard d'un projet, départ d'un commercial, litige client).",
    "Pour mon entreprise d'accueil, j'ai produit une version courte du rapport d'activité, validée par le dirigeant. Les données financières reprennent les SIG de l'exercice. Le volet RSE inclut un plan de réduction des déchets et une action de mécénat local. J'ai présenté le rapport en réunion d'équipe en 20 minutes.",
    "J'ai insisté sur la vérification des seuils : la SAS de 42 salariés n'est soumise ni à la DPEF ni à la CSRD, mais un client lui demande des données RSE. J'ai donc construit un volet RSE volontaire, appuyé sur la norme ISO 26000. Le formateur m'a demandé d'ajouter une data-visualisation de l'évolution de la marge : c'est fait.",
  ],
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

  // Production indexée sur le rang du stagiaire (deux stagiaires voisins n'ont jamais la même),
  // complétée par un bilan personnel : 4 productions × 8 bilans = 8 copies distinctes par groupe
  // de 8 stagiaires, et la mention de l'entreprise d'accueil quand elle est renseignée.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[(stagiaireIdx + exerciceIdx) % pool.length];
  const bilan = BILANS_PERSONNELS[(stagiaireIdx * 3 + exerciceIdx) % BILANS_PERSONNELS.length];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai rattaché l'exercice à la situation de ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

const BILANS_PERSONNELS = [
  "Ce travail m'a surtout appris à justifier chaque choix par un chiffre ou une source.",
  "Le point le plus difficile a été de tenir le temps imparti ; je m'entraîne pour l'examen.",
  "J'ai présenté le résultat à mon maître d'apprentissage, qui m'a fait deux remarques que j'ai intégrées.",
  "Je réutiliserai cette production comme situation dans mon Dossier Professionnel.",
  "J'ai d'abord travaillé seul{e}, puis comparé ma démarche avec celle d'un binôme, ce qui m'a fait corriger un oubli.",
  "La correction m'a permis de repérer une erreur de méthode que je ne referai plus.",
  "J'ai gagné en assurance sur ce sujet, que je redoutais au début de la formation.",
  "Je me suis appuyé{e} sur les fiches méthodes du livret, que je garde à portée de main.",
];

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

const BESOINS_OBJECTIFS = [
  "Mon objectif est d'obtenir le titre RPMS pour prendre la responsabilité d'une agence de l'entreprise à l'issue de mon contrat.",
  "Je souhaite acquérir les compétences de gestion nécessaires pour reprendre l'entreprise familiale dans les trois ans.",
  "Mon objectif est d'évoluer de mon poste d'adjoint{e} vers la direction du site, avec une vraie maîtrise des chiffres.",
  "Je veux structurer ma pratique du management : recrutement, entretiens, gestion des conflits.",
  "Mon objectif est de créer ma propre structure en sachant construire un prévisionnel et suivre ma trésorerie.",
  "Je souhaite comprendre le bilan et le compte de résultat pour dialoguer d'égal à égal avec l'expert-comptable.",
  "Mon objectif est de prendre en charge le développement commercial de la structure et de le piloter par indicateurs.",
  "Je veux obtenir une certification de niveau 5 reconnue qui valide l'expérience acquise sur le terrain.",
  "Mon objectif est de diriger une association du secteur social en maîtrisant à la fois la gestion et l'animation d'équipe.",
  "Je souhaite être capable de rédiger et de présenter le rapport d'activité de la structure à sa gouvernance.",
  "Mon objectif est d'organiser la production de l'atelier pour réduire les retards et le rebut.",
  "Je veux sécuriser les obligations légales de la structure avant qu'elle ne franchisse le seuil des 50 salariés.",
];

const BESOINS_PROJETS = [
  "Cette formation correspond exactement au poste visé : responsable d'agence dans l'entreprise qui m'accueille en alternance.",
  "Elle me donnera les outils de gestion qui me manquent pour reprendre l'entreprise de mes parents dans de bonnes conditions.",
  "Elle valide mon passage vers un poste de direction et me donne la légitimité nécessaire face à l'équipe.",
  "Elle me permettra de construire un projet de création chiffré et crédible auprès des banques.",
  "Elle complète mon expérience commerciale par le management et la finance, indispensables pour diriger.",
  "Elle prépare ma prise de poste de direct{/rice} adjoint{e} prévue à la fin du contrat d'apprentissage.",
  "Elle me donnera une vision d'ensemble de la structure, au-delà de mon service actuel.",
  "Elle me permettra de présenter des projets concrets au jury, construits sur la situation réelle de mon entreprise.",
  "Elle sécurise ma reconversion vers une fonction d'encadrement dans le secteur associatif.",
  "Elle m'aidera à professionnaliser la gestion de la structure, aujourd'hui très intuitive.",
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
];

const BESOINS_DISPOS = [
  "Je suis disponible en journée du lundi au vendredi, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>. Mon employeur a validé ma présence aux séances de formation.",
  "Mes disponibilités me permettent de suivre la formation en journée (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Je bloque ces créneaux dans mon agenda professionnel.",
  "Je suis disponible du lundi au vendredi de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>. Je dispose d'un poste et d'une connexion stables pour les classes virtuelles.",
  "Je peux suivre l'intégralité des séances en journée, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible en journée (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). J'ai organisé la garde de mes enfants sur les jours de formation.",
  "Disponibilité complète en journée du lundi au vendredi (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Je réserve le vendredi après-midi au travail personnel sur le Dossier Professionnel.",
];

// Réponses employeur (partie entreprise), du point de vue de l'employeur
const BESOINS_ATTENTES_ENT = [
  "Nous attendons {un} {collab} capable de piloter l'agence en autonomie : équipe, chiffre d'affaires et indicateurs de gestion.",
  "Notre attente est de préparer la succession du responsable actuel, qui partira en retraite dans deux ans.",
  "Nous souhaitons que le/la salarié{e} prenne en charge le recrutement et l'animation de l'équipe terrain.",
  "Nous attendons une montée en compétences sur le suivi financier : tableau de bord mensuel, trésorerie, seuil de rentabilité.",
  "Notre objectif est de structurer le développement commercial avec un plan d'actions et un suivi dans le CRM.",
  "Nous attendons que la future responsable ou le futur responsable sache rédiger le rapport d'activité présenté aux associés.",
  "Nous souhaitons fiabiliser l'organisation de la production : planning, stocks et qualité.",
  "Notre attente est de disposer d'une personne qui maîtrise les obligations sociales et réglementaires de la structure.",
];

const BESOINS_MISSIONS_ENT = [
  "Encadrement d'une équipe de 6 personnes, suivi des plannings, du chiffre d'affaires et des indicateurs de l'agence.",
  "Participation au comité de direction, préparation du budget, suivi de la trésorerie et des relances clients.",
  "Recrutement et intégration des nouveaux collaborateurs, conduite des entretiens annuels, animation des réunions d'équipe.",
  "Développement commercial : prospection, devis, suivi des clients clés, mise à jour du CRM.",
  "Organisation de la production : planning de l'atelier, gestion des approvisionnements, suivi qualité.",
  "Préparation du rapport d'activité, suivi des indicateurs RSE et des obligations réglementaires.",
];

const BESOINS_CONTRIBUTION_ENT = [
  "Cette formation permettra à notre {collab} de prendre la direction de l'agence à l'issue du contrat.",
  "Elle sécurisera la transmission de l'entreprise en formant notre futur{e} dirigeant{e} à la gestion.",
  "Elle nous apportera un pilotage chiffré qui nous manque aujourd'hui.",
  "Elle structurera notre management et devrait réduire le turnover de l'équipe.",
  "Elle professionnalisera notre développement commercial, aujourd'hui dépendant de quelques clients historiques.",
  "Elle nous aidera à anticiper le passage du seuil de 50 salariés et ses obligations.",
];

/** Réponses d'évaluation des besoins propres au RNCP38575, différentes pour chaque stagiaire. */
export function getRPMSEvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = rpmsSeed(s.nom, s.prenom);
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
      ? "Formation prise en charge par l'OPCO de l'entreprise."
      : "Financement personnel",
    projetPro: pick(BESOINS_PROJETS, 13),
    handicap: pick(BESOINS_HANDICAP, 4),
    disponibilites: pick(BESOINS_DISPOS, 9),
  };
}
