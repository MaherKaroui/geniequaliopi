// ---------------------------------------------------------------------------
// Titres professionnels du catalogue IZILearn (tpFormations.ts) — réponses HUMANISÉES de
// l'évaluation des besoins (parties apprenant et entreprise) :
//   • TP Exploitant en transport routier de marchandises (RNCP40992)
//   • TP Gestionnaire comptable et fiscal (RNCP37949)
//   • TP Gestionnaire de paie (RNCP37948)
//   • TP Comptable assistant (RNCP37121)
//   • TP Secrétaire comptable (RNCP37123)
// 100 % statique, déterministe par rang du stagiaire (sinon nom + prénom) : sur un groupe de
// 10 stagiaires, deux profils ne sont jamais identiques. Aucune donnée personnelle vérifiable,
// aucune promesse de réussite au titre.
// ---------------------------------------------------------------------------

export type TPBesoinsCle = "etrm" | "gcf" | "gp" | "ca" | "sc";

const normalize = (s?: string) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim().toLowerCase();

const CODES: Record<string, TPBesoinsCle> = {
  RNCP40992: "etrm", RNCP37949: "gcf", RNCP37948: "gp", RNCP37121: "ca", RNCP37123: "sc",
};

/** Titre concerné par l'intitulé ou le code RNCP, sinon null. */
export function tpBesoinsCle(intitule?: string, code?: string): TPBesoinsCle | null {
  const c = (code || "").replace(/\s+/g, "").toUpperCase();
  if (CODES[c]) return CODES[c];
  const t = normalize(intitule);
  const m = t.match(/rncp\s*(40992|37949|37948|37121|37123)\b/);
  if (m) return CODES[`RNCP${m[1]}`];
  const titre = /^(tp|titre professionnel|titre pro)\b/.test(t);
  if (/exploitant en transport routier de marchandises/.test(t)) return "etrm";
  if (/gestionnaire comptable et fiscal/.test(t)) return "gcf";
  if (/secretaire comptable/.test(t)) return "sc";
  if (/comptable assistant/.test(t)) return "ca";
  if (titre && /gestionnaire de paie/.test(t)) return "gp";
  return null;
}

export const isTPBesoinsFormation = (intitule?: string, code?: string) => tpBesoinsCle(intitule, code) !== null;

function seed(nom?: string, prenom?: string): number {
  const src = normalize(nom) + "|" + normalize(prenom);
  let h = 2166136261;
  for (let i = 0; i < src.length; i++) { h ^= src.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}
function isFeminin(civilite?: string, prenom?: string): boolean {
  const c = (civilite || "").toLowerCase();
  if (c.startsWith("mme") || c.startsWith("madame") || c.startsWith("mlle")) return true;
  if (c.startsWith("m.") || c === "m" || c.startsWith("monsieur")) return false;
  const p = (prenom || "").trim().toLowerCase();
  return p.endsWith("a") || p.endsWith("e");
}
const PAS = [1, 3, 7, 9, 11, 13, 17, 19];
const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : a);
function rang(idx: number, sel: number, n: number): number {
  if (n <= 1) return 0;
  let pas = PAS[sel % PAS.length] % n || 1;
  while (pgcd(pas, n) !== 1) pas++;
  return (((idx * pas + sel * 7 + Math.floor(sel / 3)) % n) + n) % n;
}
const baseIndex = (idx: number | undefined, nom?: string, prenom?: string) =>
  typeof idx === "number" && idx >= 0 ? idx : seed(nom, prenom) % 9973;

/** {e} {ne} {rice} {if} {euse} {ere} accordés ; {p} = prénom du stagiaire. */
function accorder(txt: string, fem: boolean, prenom?: string): string {
  const nom = (prenom || "").trim() || (fem ? "la stagiaire" : "le stagiaire");
  // Élision devant un prénom à voyelle initiale : « qu'Anne », « qu'Yanis ».
  const elide = /^[aeiouyàâéèêëîïôöùûü]/i.test(nom);
  return txt
    .replace(/que \{p\}/g, elide ? `qu'${nom}` : `que ${nom}`)
    .replace(/\{le\}/g, fem ? "le" : "").replace(/\{e\}/g, fem ? "e" : "").replace(/\{ne\}/g, fem ? "ne" : "")
    .replace(/\{rice\}/g, fem ? "rice" : "eur").replace(/\{if\}/g, fem ? "ive" : "if")
    .replace(/\{euse\}/g, fem ? "euse" : "eur").replace(/\{ere\}/g, fem ? "ère" : "er")
    .replace(/\{p\}/g, nom);
}

interface Profil { besoin: string; objectif: string; projet: string; attentes: string; missions: string; contribution: string }

const PROFILS: Record<TPBesoinsCle, Profil[]> = {
  etrm: [
    { besoin: "Construire une offre de transport chiffrée (coût de revient kilométrique, prix de vente, marge) à partir d'une demande client", objectif: "Être capable d'analyser une demande de transport, d'en vérifier la faisabilité et de proposer un prix cohérent avec nos coûts.", projet: "Prendre en charge seul{e} les cotations clients de l'agence, puis évoluer vers un poste d'exploitant confirmé.", attentes: "Nous attendons que {p} établisse des cotations fiables, sans vendre sous notre coût de revient, et que {p} sache justifier un prix face au client.", missions: "{p} prépare aujourd'hui les ordres de transport et le suivi administratif des tournées ; après la formation, {p} traitera les demandes de cotation et les affectations.", contribution: "Des devis justes nous éviteront les trajets à perte et sécuriseront la marge de l'activité régionale." },
    { besoin: "Planifier les tournées et affecter conducteurs et véhicules en respectant les temps de conduite et de repos", objectif: "Établir un planning hebdomadaire conforme au règlement (CE) 561/2006 et à la réglementation sociale du transport.", projet: "Passer du poste de conducteur au bureau d'exploitation de mon entreprise.", attentes: "{p} connaît le terrain ; nous attendons que {p} planifie désormais les tournées sans dépassement des temps de service et avec un bon taux de remplissage.", missions: "Conducteur{rice} poids lourd depuis plusieurs années, {p} rejoint l'exploitation : plannings, affectations, relation avec les conducteurs et les clients.", contribution: "Un exploitant issu de la conduite connaît les contraintes réelles des conducteurs : moins de tensions et moins d'infractions relevées au chronotachygraphe." },
    { besoin: "Suivre l'exécution des transports et gérer les aléas (retard, panne, refus de livraison, avarie)", objectif: "Réagir rapidement à un aléa, informer le client et trouver une solution de remplacement en gardant la trace des décisions.", projet: "Devenir l'exploitant{e} référent{e} du suivi en temps réel sur une flotte d'une dizaine de véhicules.", attentes: "Nous attendons que {p} gère les imprévus de la journée sans remonter systématiquement vers le responsable d'exploitation.", missions: "{p} assure le suivi des tournées, les appels conducteurs et clients, et la mise à jour du TMS.", contribution: "Une meilleure gestion des aléas réduira les pénalités de retard et améliorera la satisfaction de nos chargeurs." },
    { besoin: "Contrôler et clôturer les dossiers de transport (lettre de voiture, réserves, facturation)", objectif: "Vérifier les documents de transport, traiter les réserves et clôturer chaque dossier pour une facturation sans erreur.", projet: "Sécuriser mon poste d'agent{e} d'exploitation et prendre plus de responsabilités dans le service.", attentes: "Nous souhaitons que {p} fiabilise la clôture des dossiers : documents complets, réserves traitées, facturation dans les délais.", missions: "{p} gère la partie administrative de l'exploitation : CMR, bons de livraison, préparation de la facturation et des litiges.", contribution: "Des dossiers complets accélèrent la facturation et réduisent les litiges non indemnisés." },
    { besoin: "Recourir à la sous-traitance et à l'affrètement en contrôlant les transporteurs (licence, assurance, obligation de vigilance)", objectif: "Choisir un sous-traitant, négocier le prix et vérifier tous ses documents avant de lui confier une marchandise.", projet: "Développer l'activité d'affrètement de l'agence en complément de notre flotte.", attentes: "Nous attendons de {p} une sélection rigoureuse des affrétés et une négociation qui préserve notre marge.", missions: "{p} recherche des transporteurs sur les bourses de fret, négocie et suit les affrètements ponctuels.", contribution: "Un contrôle sérieux des sous-traitants nous protège en cas de contrôle et d'accident et améliore notre taux de service en période de pointe." },
    { besoin: "Analyser les coûts et les indicateurs de l'activité (kilomètres à vide, taux de remplissage, consommation, qualité de service)", objectif: "Construire et commenter un tableau de bord mensuel de l'exploitation.", projet: "Évoluer à moyen terme vers un poste de responsable d'exploitation.", attentes: "Nous souhaitons que {p} produise chaque mois des indicateurs fiables et propose des actions d'amélioration.", missions: "{p} participe à l'exploitation d'une flotte régionale et prépare les reportings pour la direction.", contribution: "Suivre les kilomètres à vide et la consommation aide directement à réduire nos coûts d'exploitation." },
    { besoin: "Transmettre des instructions claires aux conducteurs et coordonner leur activité au quotidien", objectif: "Donner des consignes précises (horaires, adresses, documents, consignes de sécurité) et vérifier qu'elles sont comprises.", projet: "Me reconvertir dans l'exploitation transport, un métier qui recrute dans ma région.", attentes: "Nous attendons une communication claire avec les conducteurs et des consignes complètes dès le départ de la tournée.", missions: "{p} rejoint l'équipe d'exploitation : briefing des conducteurs, transmission des ordres de mission, suivi des retours.", contribution: "Des consignes complètes limitent les erreurs de livraison et les appels inutiles pendant la tournée." },
    { besoin: "Connaître la réglementation du transport routier de marchandises (documents, temps de travail, matières dangereuses, contrat de transport)", objectif: "Appliquer la réglementation dans mes décisions d'exploitation et savoir où trouver l'information à jour.", projet: "Obtenir un titre reconnu pour accéder à un poste d'exploitant{e} après une expérience en logistique d'entrepôt.", attentes: "Nous attendons que {p} prenne des décisions conformes à la réglementation, sans exposer l'entreprise à des sanctions.", missions: "Après plusieurs années en entrepôt (préparation, quai, expédition), {p} rejoint le service transport.", contribution: "Une exploitation conforme réduit le risque d'amendes et protège la licence de l'entreprise." },
    { besoin: "Utiliser un logiciel de gestion du transport (TMS) et les outils bureautiques pour organiser et tracer l'activité", objectif: "Saisir, suivre et retrouver toutes les informations d'un dossier de transport dans le TMS.", projet: "Reprendre un emploi stable dans le transport après une période de recherche d'emploi.", attentes: "Nous attendons que {p} soit rapidement autonome sur notre TMS et sur Excel pour le suivi quotidien.", missions: "{p} sera chargé{e} de la saisie des commandes, du suivi des tournées et de la mise à jour des tableaux de suivi.", contribution: "Une saisie fiable dans le TMS améliore la traçabilité et la qualité de l'information donnée aux clients." },
    { besoin: "Traiter les réclamations clients et les litiges (retard, manquant, avarie) jusqu'à leur résolution", objectif: "Accueillir une réclamation, établir les faits, appliquer les règles de responsabilité et proposer une réponse écrite.", projet: "Évoluer d'un poste d'assistant{e} administrat{if} vers l'exploitation transport.", attentes: "Nous souhaitons que {p} prenne en charge les réclamations de premier niveau avec une réponse argumentée et rapide.", missions: "{p} est en relation quotidienne avec nos clients chargeurs pour le suivi des livraisons et des réclamations.", contribution: "Une réponse rapide et argumentée fidélise les clients et limite les indemnisations injustifiées." },
  ],
  gcf: [
    { besoin: "Réaliser les travaux d'inventaire et l'arrêté des comptes (amortissements, provisions, régularisations)", objectif: "Être autonome sur un arrêté annuel de PME, du contrôle des comptes jusqu'aux écritures d'inventaire.", projet: "Évoluer de comptable assistant{e} vers un poste de comptable unique en PME.", attentes: "Nous attendons que {p} prenne en charge les travaux de clôture de nos dossiers clients avec une révision plus légère du chef de mission.", missions: "{p} tient aujourd'hui la comptabilité courante d'un portefeuille de TPE au cabinet ; après la formation, {p} préparera les bilans.", contribution: "Plus d'autonomie sur les clôtures permettra au cabinet de mieux absorber la période fiscale." },
    { besoin: "Établir et contrôler les déclarations de TVA, y compris les régimes et opérations particuliers", objectif: "Établir les déclarations de TVA mensuelles et annuelles et justifier chaque montant déclaré.", projet: "Sécuriser mon poste et devenir l'interlocut{rice} fiscal{e} de premier niveau de nos clients.", attentes: "Nous souhaitons que {p} fiabilise les déclarations de TVA, en particulier les opérations intracommunautaires et l'autoliquidation.", missions: "{p} gère la saisie, le lettrage et les déclarations de TVA de nos sociétés.", contribution: "Moins d'erreurs déclaratives, c'est moins de risques de redressement et de pénalités." },
    { besoin: "Préparer la liasse fiscale et calculer le résultat fiscal et l'impôt sur les sociétés", objectif: "Passer du résultat comptable au résultat fiscal (réintégrations, déductions) et préparer la liasse.", projet: "Obtenir le titre pour accéder à un poste de collaborat{rice} confirmé{e} en cabinet d'expertise comptable.", attentes: "Nous attendons que {p} prépare les liasses fiscales de nos dossiers BIC/IS avec un minimum de corrections.", missions: "{p} participe aux travaux de fin d'exercice des clients du cabinet aux côtés du chef de mission.", contribution: "La production des liasses en interne réduit les délais de dépôt et la charge des chefs de mission." },
    { besoin: "Présenter et analyser les comptes annuels (soldes intermédiaires de gestion, capacité d'autofinancement, ratios)", objectif: "Commenter un bilan et un compte de résultat devant un dirigeant, avec des indicateurs simples et justes.", projet: "Évoluer vers un rôle de conseil auprès des dirigeants de TPE.", attentes: "Nous souhaitons que {p} présente les comptes à nos clients et explique clairement leurs résultats.", missions: "{p} prépare les plaquettes annuelles et les tableaux d'analyse pour les rendez-vous bilan.", contribution: "Des clients mieux accompagnés restent fidèles et achètent davantage de missions de conseil." },
    { besoin: "Construire des budgets et des prévisions (plan de trésorerie, prévisionnel, suivi des écarts)", objectif: "Élaborer un budget annuel et un plan de trésorerie, puis analyser les écarts avec le réalisé.", projet: "Rejoindre le service contrôle de gestion de mon entreprise.", attentes: "Nous attendons que {p} construise et suive notre budget et notre plan de trésorerie mensuel.", missions: "Comptable dans notre PME, {p} prend en charge le reporting mensuel et la préparation budgétaire.", contribution: "Un suivi budgétaire régulier nous permettra d'anticiper les besoins de trésorerie et de mieux piloter les marges." },
    { besoin: "Traiter les opérations de fin d'exercice spécifiques (stocks, immobilisations, emprunts, écarts de conversion)", objectif: "Maîtriser les écritures de fin d'exercice complexes et en contrôler l'impact sur le résultat.", projet: "Reprendre la comptabilité complète d'une PME après une première expérience en saisie.", attentes: "Nous souhaitons que {p} sécurise les écritures d'inventaire, aujourd'hui revues entièrement par l'expert-comptable.", missions: "{p} tient la comptabilité générale de notre société et prépare le dossier de révision.", contribution: "Réduire les corrections de l'expert-comptable diminue nos honoraires et accélère la clôture." },
    { besoin: "Connaître la fiscalité de l'entreprise (CFE, CVAE, taxes assises sur les salaires, crédits d'impôt)", objectif: "Identifier les impôts et taxes dus par l'entreprise et respecter le calendrier fiscal.", projet: "Me reconvertir dans la comptabilité et la fiscalité après une carrière dans la banque.", attentes: "Nous attendons que {p} tienne le calendrier fiscal et prépare les déclarations annexes sans oubli.", missions: "{p} assure les déclarations fiscales courantes et les relations avec le service des impôts des entreprises.", contribution: "Un calendrier fiscal maîtrisé supprime les pénalités de retard." },
    { besoin: "Contrôler et réviser les comptes (justification des soldes, rapprochements, cohérence des comptes)", objectif: "Réviser un dossier par cycle et documenter chaque contrôle.", projet: "Préparer ensuite le DCG en parallèle de mon poste.", attentes: "Nous attendons de {p} un dossier de révision propre, documenté, prêt pour la supervision.", missions: "{p} révise les comptes de nos clients commerçants et artisans et prépare les feuilles de travail.", contribution: "Des dossiers documentés gagnent du temps à la supervision et réduisent le risque d'erreur." },
    { besoin: "Utiliser un logiciel comptable et un tableur pour automatiser les contrôles et les états de synthèse", objectif: "Être à l'aise sur notre logiciel comptable et construire des tableaux Excel de contrôle et d'analyse.", projet: "Reprendre un poste en comptabilité après une interruption de carrière, avec un titre à jour.", attentes: "Nous souhaitons que {p} exploite pleinement le logiciel comptable et automatise les contrôles répétitifs.", missions: "{p} prend en charge la tenue et la clôture des comptes de deux filiales.", contribution: "L'automatisation des contrôles libère du temps pour l'analyse et le conseil." },
    { besoin: "Établir les déclarations fiscales des entrepreneurs individuels (BIC, BNC, régime réel simplifié)", objectif: "Établir les déclarations de résultat des entreprises individuelles et en expliquer les choix aux clients.", projet: "Rejoindre un cabinet spécialisé dans les artisans et professions libérales.", attentes: "Nous attendons que {p} gère de bout en bout les déclarations BIC/BNC de son portefeuille.", missions: "{p} suit un portefeuille d'artisans et de professions libérales au cabinet.", contribution: "Un collaborateur autonome sur ces dossiers augmente la capacité du cabinet sans recrutement supplémentaire." },
  ],
  gp: [
    { besoin: "Établir des bulletins de paie complets (salaire de base, heures supplémentaires, primes, avantages en nature)", objectif: "Produire un bulletin de paie juste et pouvoir en expliquer chaque ligne à un salarié.", projet: "Me reconvertir dans la paie, un métier qui recrute, après plusieurs années en comptabilité fournisseurs.", attentes: "Nous attendons que {p} produise les bulletins de nos salariés de manière autonome et fiable.", missions: "{p} occupe un poste administratif RH (contrats, absences, mutuelle) ; après la formation, {p} prendra en charge la paie.", contribution: "Réinternaliser la paie nous rendra plus réactifs sur les questions des salariés." },
    { besoin: "Calculer les cotisations sociales (assiettes, plafond, réductions générales) et en vérifier les taux", objectif: "Comprendre et contrôler le calcul de chaque cotisation, y compris la réduction générale.", projet: "Évoluer de gestionnaire paie junior vers gestionnaire confirmé{e} en cabinet.", attentes: "Nous souhaitons que {p} contrôle le paramétrage des cotisations et repère les anomalies avant la clôture.", missions: "{p} prépare la paie d'un portefeuille de TPE au cabinet sous la supervision d'un responsable.", contribution: "Des cotisations justes évitent les régularisations URSSAF et les mécontentements clients." },
    { besoin: "Gérer les absences et leurs incidences en paie (maladie, congés payés, maternité, activité partielle)", objectif: "Calculer les retenues et indemnités liées aux absences, y compris le maintien de salaire et la subrogation.", projet: "Devenir la référente ou le référent paie de mon entreprise.", attentes: "Nous attendons que {p} traite correctement les absences et les indemnités journalières, sources fréquentes d'erreurs.", missions: "{p} collecte les variables de paie et gère les absences de nos 40 salariés.", contribution: "Moins d'erreurs sur les absences, c'est moins de réclamations des salariés et un climat social apaisé." },
    { besoin: "Établir et contrôler la DSN mensuelle et événementielle", objectif: "Transmettre une DSN conforme, traiter les retours et les anomalies et déclarer les événements (arrêt, fin de contrat).", projet: "Sécuriser mon poste actuel en maîtrisant toute la chaîne déclarative.", attentes: "Nous souhaitons que {p} prenne en charge le dépôt et le contrôle de la DSN avec le traitement des rejets.", missions: "{p} assure les déclarations sociales et le suivi des organismes (URSSAF, retraite, prévoyance).", contribution: "Une DSN fiable sécurise nos obligations déclaratives et évite les pénalités." },
    { besoin: "Gérer les entrées et sorties de salariés (contrats, solde de tout compte, documents de fin de contrat)", objectif: "Calculer un solde de tout compte et établir tous les documents de sortie sans erreur.", projet: "Rejoindre un service RH d'entreprise de taille intermédiaire.", attentes: "Nous attendons que {p} gère les départs de salariés de A à Z, du calcul des indemnités aux documents remis.", missions: "{p} prend en charge l'administration du personnel : embauches, avenants, départs.", contribution: "Des sorties bien traitées limitent les risques de contentieux prud'homal." },
    { besoin: "Appliquer la convention collective et le droit du travail en paie (minima, primes conventionnelles, temps de travail)", objectif: "Trouver et appliquer les dispositions conventionnelles qui ont un impact sur la paie.", projet: "Obtenir le titre pour travailler en cabinet d'expertise comptable sur plusieurs conventions collectives.", attentes: "Nous souhaitons que {p} applique les règles conventionnelles de nos différents clients sans erreur.", missions: "{p} gère la paie de clients relevant de conventions variées (commerce, BTP, hôtellerie-restauration).", contribution: "La maîtrise des conventions réduit les rappels de salaire et sécurise nos clients." },
    { besoin: "Contrôler la paie avant clôture (états de contrôle, cohérence des cumuls, rapprochement paie-comptabilité)", objectif: "Mettre en place des contrôles systématiques avant la validation de la paie.", projet: "Évoluer vers un poste de responsable paie à moyen terme.", attentes: "Nous attendons que {p} réalise les contrôles de cohérence et le rapprochement avec la comptabilité chaque mois.", missions: "{p} prépare la paie et les écritures de paie transmises au service comptable.", contribution: "Des contrôles réguliers évitent les erreurs coûteuses et fiabilisent les comptes." },
    { besoin: "Répondre aux questions des salariés sur leur bulletin et leur rémunération (net, prélèvement à la source, congés)", objectif: "Expliquer clairement un bulletin à un salarié et lui répondre par écrit de manière fiable.", projet: "Reprendre une activité professionnelle dans un métier stable et compatible avec du télétravail partiel.", attentes: "Nous souhaitons que {p} soit l'interlocut{rice} des salariés pour toutes les questions de paie.", missions: "{p} assure l'accueil RH et répond aux demandes des salariés sur la paie et les absences.", contribution: "Des réponses claires améliorent la confiance des salariés envers le service RH." },
    { besoin: "Paramétrer et utiliser un logiciel de paie (fiches salariés, rubriques, profils de cotisations)", objectif: "Être autonome sur un logiciel de paie, du paramétrage d'un salarié à l'édition des états.", projet: "Changer de secteur après une carrière dans le commerce et trouver un emploi de gestionnaire de paie.", attentes: "Nous attendons que {p} soit rapidement autonome sur notre logiciel de paie et ses paramétrages.", missions: "{p} rejoint le pôle social et prendra en charge un portefeuille d'environ 150 bulletins par mois.", contribution: "Un collaborateur rapidement opérationnel nous permet d'accepter de nouveaux clients paie." },
    { besoin: "Traiter les éléments particuliers de rémunération (frais professionnels, épargne salariale, saisies sur salaire)", objectif: "Traiter les éléments de paie moins courants en appliquant les règles sociales et fiscales.", projet: "Consolider mon expérience de gestionnaire paie par un titre reconnu.", attentes: "Nous souhaitons que {p} traite seul{e} les cas particuliers aujourd'hui remontés au responsable.", missions: "{p} gère la paie de nos commerciaux itinérants (frais, véhicules, primes sur objectifs).", contribution: "Une paie juste sur les cas particuliers sécurise l'entreprise en cas de contrôle URSSAF." },
  ],
  ca: [
    { besoin: "Saisir et contrôler les factures clients et fournisseurs et assurer le lettrage des comptes de tiers", objectif: "Tenir les comptes clients et fournisseurs à jour et justifier chaque solde.", projet: "Me reconvertir dans la comptabilité, un métier qui recrute, après une expérience dans la vente.", attentes: "Nous attendons que {p} tienne les comptes de tiers à jour avec un lettrage fiable chaque mois.", missions: "{p} prend en charge la saisie des achats et des ventes et le suivi des comptes de tiers.", contribution: "Des comptes de tiers propres facilitent le recouvrement et les clôtures." },
    { besoin: "Suivre les encaissements, les relances clients et les règlements fournisseurs", objectif: "Organiser les relances clients et préparer les règlements fournisseurs dans le respect des échéances.", projet: "Sécuriser mon poste d'aide-comptable et prendre davantage de responsabilités.", attentes: "Nous souhaitons que {p} prenne en charge les relances et réduise nos retards de paiement clients.", missions: "{p} suit les encaissements, prépare les relances et les règlements fournisseurs.", contribution: "Un meilleur suivi des encaissements améliore directement notre trésorerie." },
    { besoin: "Réaliser les rapprochements bancaires et suivre la trésorerie au quotidien", objectif: "Effectuer chaque mois le rapprochement bancaire et expliquer tous les écarts.", projet: "Obtenir un titre reconnu pour accéder à un premier emploi en cabinet comptable.", attentes: "Nous attendons que {p} réalise les rapprochements bancaires de nos comptes sans intervention du comptable.", missions: "{p} saisit les relevés bancaires et prépare les rapprochements des dossiers du cabinet.", contribution: "Des rapprochements réguliers fiabilisent la trésorerie et réduisent les écarts en fin d'année." },
    { besoin: "Établir les déclarations de TVA (régime réel normal et simplifié)", objectif: "Calculer, déclarer et comptabiliser la TVA en justifiant les montants.", projet: "Devenir comptable assistant{e} dans une PME de ma région.", attentes: "Nous souhaitons que {p} prépare les déclarations de TVA mensuelles de nos dossiers.", missions: "{p} prépare les déclarations de TVA et les écritures correspondantes.", contribution: "Des déclarations de TVA justes évitent les pénalités et les régularisations." },
    { besoin: "Préparer les variables de paie et comptabiliser les écritures de paie", objectif: "Collecter les éléments variables de paie et passer les écritures de salaires et de charges sociales.", projet: "Être polyvalent{e} entre comptabilité et paie dans une petite structure.", attentes: "Nous attendons que {p} prépare les variables de paie et contrôle les écritures transmises par le logiciel.", missions: "{p} assure la comptabilité générale et la transmission des éléments de paie à notre prestataire.", contribution: "Une bonne préparation des variables réduit les erreurs de paie et les corrections." },
    { besoin: "Participer aux travaux de fin d'exercice (immobilisations, stocks, charges et produits à régulariser)", objectif: "Préparer les écritures d'inventaire courantes et le dossier de clôture.", projet: "Évoluer ensuite vers le titre de gestionnaire comptable et fiscal.", attentes: "Nous souhaitons que {p} prépare les éléments de clôture (immobilisations, stocks, régularisations) pour l'expert-comptable.", missions: "{p} participe aux travaux de clôture et prépare les justificatifs demandés par l'expert-comptable.", contribution: "Un dossier de clôture préparé en interne réduit nos honoraires et les délais." },
    { besoin: "Présenter des tableaux de bord simples (chiffre d'affaires, encours clients, trésorerie)", objectif: "Construire sur tableur un tableau de bord mensuel et le commenter.", projet: "Reprendre un emploi dans la comptabilité après un congé parental.", attentes: "Nous attendons de {p} un tableau de bord mensuel fiable pour la direction.", missions: "{p} produit les états de suivi mensuels et alimente le reporting de la direction.", contribution: "Des indicateurs à jour aident la direction à prendre ses décisions plus vite." },
    { besoin: "Maîtriser un logiciel comptable et les outils bureautiques (saisie, imports, éditions, tableur)", objectif: "Être autonome sur le logiciel comptable et utiliser Excel pour les contrôles.", projet: "Changer de métier pour un poste sédentaire et stable, avec des perspectives d'évolution.", attentes: "Nous souhaitons que {p} maîtrise rapidement notre logiciel comptable et ses imports bancaires.", missions: "{p} rejoint le service comptable pour la saisie et le contrôle des pièces.", contribution: "Une saisie plus rapide et plus fiable libère du temps pour les contrôles." },
    { besoin: "Organiser le classement et l'archivage des pièces comptables et le dossier client", objectif: "Organiser la collecte et le classement des pièces pour une comptabilité à jour.", projet: "Valider mes acquis d'aide-comptable par un titre de niveau 4.", attentes: "Nous attendons que {p} organise la collecte des pièces auprès de nos clients et tienne les dossiers à jour.", missions: "{p} suit un portefeuille de petits dossiers (commerçants, artisans) au cabinet.", contribution: "Des dossiers à jour toute l'année évitent l'engorgement de la période fiscale." },
    { besoin: "Traiter les immobilisations, les emprunts et l'affectation du résultat", objectif: "Comptabiliser une acquisition, établir un plan d'amortissement et un tableau d'emprunt.", projet: "Intégrer le service comptable d'une collectivité ou d'une association.", attentes: "Nous souhaitons que {p} tienne le fichier des immobilisations et des emprunts de la structure.", missions: "{p} assure la comptabilité courante et le suivi des investissements de l'association.", contribution: "Un suivi précis des immobilisations sécurise nos comptes annuels et nos dossiers de subvention." },
  ],
  sc: [
    { besoin: "Assurer l'accueil physique et téléphonique et la gestion du courrier tout en tenant la comptabilité courante", objectif: "Concilier accueil, secrétariat et saisie comptable en organisant mes priorités.", projet: "Devenir l'unique secrétaire comptable d'une TPE et en gérer tout l'administratif.", attentes: "Nous attendons que {p} gère à la fois l'accueil, le secrétariat et la comptabilité courante de l'entreprise.", missions: "{p} assure l'accueil et le courrier ; après la formation, {p} prendra aussi en charge la saisie comptable.", contribution: "Un poste polyvalent bien tenu évite de recourir à un prestataire pour la saisie." },
    { besoin: "Produire des documents professionnels (courriers, devis, factures, tableaux) avec les outils bureautiques", objectif: "Réaliser rapidement des documents soignés sur Word et Excel, conformes à la charte de l'entreprise.", projet: "Me reconvertir vers un métier administratif après plusieurs années dans le commerce.", attentes: "Nous souhaitons que {p} produise des courriers, devis et factures sans erreur et avec une présentation professionnelle.", missions: "{p} rédige les devis, les factures et les courriers de l'entreprise.", contribution: "Des documents soignés renforcent l'image de l'entreprise auprès des clients." },
    { besoin: "Facturer, suivre les règlements clients et effectuer les relances", objectif: "Établir les factures, suivre les encaissements et relancer les impayés avec tact.", projet: "Sécuriser mon poste d'assistant{e} administrat{if} en ajoutant la compétence comptable.", attentes: "Nous attendons que {p} gère la facturation et les relances pour réduire nos retards de paiement.", missions: "{p} établit la facturation mensuelle et assure le suivi des règlements.", contribution: "Un suivi rigoureux des encaissements améliore notre trésorerie." },
    { besoin: "Saisir les achats, les ventes et la banque et effectuer le rapprochement bancaire", objectif: "Tenir la comptabilité courante à jour et rapprocher les relevés bancaires chaque mois.", projet: "Reprendre en interne la saisie comptable aujourd'hui confiée au cabinet.", attentes: "Nous souhaitons que {p} tienne la saisie à jour pour que le cabinet n'intervienne plus que sur le bilan.", missions: "{p} prend en charge la saisie des pièces et le rapprochement bancaire mensuel.", contribution: "Réinternaliser la saisie réduira nos honoraires comptables." },
    { besoin: "Organiser le classement papier et numérique et l'archivage des dossiers", objectif: "Mettre en place un classement clair et respecter les durées de conservation des documents.", projet: "Trouver un emploi stable de secrétaire comptable dans une PME proche de chez moi.", attentes: "Nous attendons que {p} réorganise notre classement et notre archivage, papier et numérique.", missions: "{p} gère le classement, l'archivage et la dématérialisation des documents.", contribution: "Retrouver un document en quelques secondes fait gagner du temps à toute l'équipe." },
    { besoin: "Préparer la déclaration de TVA et les éléments de paie", objectif: "Préparer la TVA et transmettre des éléments variables de paie complets au gestionnaire.", projet: "Évoluer vers un poste de comptable assistant{e} à moyen terme.", attentes: "Nous souhaitons que {p} prépare la TVA et les variables de paie chaque mois.", missions: "{p} collecte les absences et les heures des salariés et prépare les éléments de TVA.", contribution: "Des éléments complets et à l'heure fiabilisent la paie et les déclarations." },
    { besoin: "Gérer les agendas, organiser les réunions et rechercher et transmettre l'information", objectif: "Organiser l'agenda du dirigeant, préparer les réunions et diffuser l'information utile.", projet: "Devenir l'assistant{e} administrat{if} et comptable du dirigeant.", attentes: "Nous attendons que {p} gère l'agenda du dirigeant et les comptes rendus de réunion.", missions: "{p} assiste le dirigeant : agenda, rendez-vous, déplacements, comptes rendus.", contribution: "Le dirigeant pourra se recentrer sur le développement commercial." },
    { besoin: "Présenter des tableaux de bord simples (ventes, encaissements, trésorerie)", objectif: "Construire un tableau de suivi mensuel et le présenter au responsable.", projet: "Valider par un titre reconnu mon expérience de secrétariat dans le bâtiment.", attentes: "Nous souhaitons que {p} produise chaque mois un tableau de suivi des ventes et de la trésorerie.", missions: "{p} assure le secrétariat de l'entreprise et le suivi administratif des chantiers.", contribution: "Un suivi mensuel des chiffres aide à anticiper les besoins de trésorerie." },
    { besoin: "Gérer les fournisseurs (commandes, réception des factures, contrôle et règlements)", objectif: "Contrôler les factures fournisseurs avec les commandes et préparer les règlements.", projet: "Retrouver un emploi après une période d'inactivité avec des compétences actualisées.", attentes: "Nous attendons que {p} contrôle les factures fournisseurs et prépare les paiements dans les délais.", missions: "{p} gère les commandes, la réception des factures et le suivi fournisseurs.", contribution: "Un contrôle rigoureux évite les doubles paiements et les litiges fournisseurs." },
    { besoin: "Communiquer par écrit de manière professionnelle (e-mails, comptes rendus, notes)", objectif: "Rédiger des e-mails et des comptes rendus clairs, sans faute et adaptés au destinataire.", projet: "Travailler dans une association ou une structure médicale comme secrétaire comptable.", attentes: "Nous souhaitons que {p} rédige des écrits professionnels clairs et fiables.", missions: "{p} assure la correspondance de la structure et la comptabilité courante.", contribution: "Une communication écrite soignée améliore la relation avec nos adhérents et partenaires." },
  ],
};

const DIPLOMES: Record<TPBesoinsCle, string[]> = {
  etrm: [
    "Baccalauréat professionnel Logistique, puis 4 ans de préparation de commandes et de quai",
    "CAP Conducteur routier de marchandises et 7 ans de conduite poids lourd",
    "Baccalauréat général, expérience d'agent{e} d'exploitation en intérim",
    "Titre professionnel Conducteur du transport routier de marchandises sur porteur",
    "Baccalauréat professionnel Organisation de transport de marchandises",
    "BTS Gestion des transports et logistique associée, non validé",
    "Baccalauréat STMG, puis 3 ans d'assistanat administratif dans une PME de transport",
    "Pas de diplôme, 10 ans d'expérience en entrepôt (cariste puis chef d'équipe)",
  ],
  gcf: [
    "Titre professionnel Comptable assistant et 3 ans en cabinet d'expertise comptable",
    "BTS Comptabilité et gestion, 5 ans d'expérience en entreprise",
    "DUT GEA option gestion comptable et financière",
    "Licence d'économie, reconversion après 6 ans dans la banque de détail",
    "Baccalauréat STMG et 8 ans d'expérience en aide-comptable",
    "BTS Comptabilité et gestion obtenu il y a 10 ans, poste de comptable fournisseurs",
    "DCG partiellement validé (4 UE), collaborat{rice} junior en cabinet",
    "Baccalauréat professionnel Gestion-Administration, puis comptable unique en TPE",
  ],
  gp: [
    "BTS Comptabilité et gestion, 4 ans en comptabilité fournisseurs",
    "Baccalauréat STMG et 5 ans d'assistanat RH",
    "Licence en droit, reconversion vers la paie",
    "Titre professionnel Comptable assistant, première expérience en cabinet",
    "BTS Gestion de la PME, poste d'assistant{e} administrat{if} et RH",
    "Baccalauréat professionnel Gestion-Administration, 6 ans dans le commerce",
    "DUT GEA option ressources humaines",
    "Baccalauréat général, aide à la paie en intérim pendant 2 ans",
  ],
  ca: [
    "Baccalauréat professionnel Gestion-Administration",
    "Baccalauréat STMG, expérience de caissi{ere} puis de vend{euse}",
    "CAP Employé de commerce, 8 ans de vente, reconversion",
    "Baccalauréat général, deux années de licence de gestion non terminées",
    "Titre professionnel Secrétaire comptable",
    "Diplôme étranger de comptabilité (équivalence en cours), saisie comptable en intérim",
    "Baccalauréat professionnel Commerce, puis aide-comptable dans une PME",
    "BEP Comptabilité et 10 ans d'emploi administratif",
  ],
  sc: [
    "Baccalauréat professionnel Gestion-Administration",
    "CAP Agent d'accueil, 5 ans d'accueil en entreprise",
    "Baccalauréat STMG, assistanat dans une entreprise du bâtiment",
    "Baccalauréat général, emplois administratifs en intérim",
    "BEP Secrétariat et 12 ans d'expérience dans le commerce",
    "Titre professionnel Employé administratif et d'accueil",
    "Baccalauréat professionnel Accueil – relation clients et usagers",
    "Pas de diplôme, 6 ans de secrétariat dans une association",
  ],
};

const HANDICAP = [
  "Non, je ne suis pas en situation de handicap et je n'ai pas besoin d'adaptation.",
  "Non. Je sais que je peux contacter le référent handicap si un besoin apparaît.",
  "Non, aucun aménagement nécessaire.",
  "Oui, une fatigue visuelle : je préfère des supports numériques que je peux agrandir et des pauses écran régulières.",
  "Non, pas de besoin particulier.",
  "Non. J'aimerais seulement recevoir les supports à l'avance pour les relire.",
  "Non, aucun handicap déclaré.",
  "Oui, des douleurs dorsales : un siège ergonomique et la possibilité de me lever régulièrement me suffisent.",
  "Non, aucune adaptation à prévoir.",
  "Non. Je préfère travailler avec deux écrans quand c'est possible, sans que ce soit indispensable.",
];
const DISPOS = [
  "Je suis disponible à temps plein sur toute la durée de la formation, stage en entreprise compris.",
  "Je suis disponible du lundi au vendredi en journée ; je dois partir à 17 h 30 deux soirs par semaine pour la garde de mes enfants.",
  "Disponible à temps plein. J'ai déjà une piste de stage dans une entreprise proche de chez moi.",
  "Je suis disponible en journée et je peux réviser le soir et le week-end pour préparer les évaluations.",
  "Disponible à temps plein ; mes trajets sont d'environ 40 minutes, je serai à l'heure le matin.",
  "Je suis disponible sur toute la période ; je préviendrai à l'avance pour un rendez-vous médical prévu en cours de formation.",
  "Je suis disponible à temps plein. Mon employeur a validé les dates de formation et de stage.",
  "Disponible en journée, avec un accès à un ordinateur à domicile pour les séances à distance.",
  "Je suis disponible du lundi au vendredi. Je cherche encore mon entreprise de stage et j'aimerais être accompagné{e}.",
  "Je suis disponible à temps plein et je peux suivre des séances en distanciel si besoin.",
];

// 40 combinaisons distinctes par titre : 10 profils × 4 variantes (contexte d'entrée, projet,
// horizon). Le rang dans la session parcourt une permutation de 0 à 39 : jusqu'à 40 stagiaires,
// aucune copie n'est identique ; au-delà, le cycle reprend avec un ordre décalé.
const NB_VARIANTES = 4;
const CONTEXTES = [
  "dans le cadre d'une reconversion professionnelle", "pour consolider une première expérience en poste",
  "à la demande de mon employeur", "pour sécuriser et faire reconnaître ma pratique",
];
const HORIZONS = [
  "Je vise une prise de poste dès la fin de la formation.", "Je souhaite être opérationnel{le} sur ces tâches dès la période en entreprise.",
  "Mon objectif est d'être autonome dans les six mois qui suivent la formation.", "J'aimerais ensuite évoluer vers davantage de responsabilités d'ici deux à trois ans.",
];
interface Choix { p: Profil; projet: string; v: number }
function choix(cle: TPBesoinsCle, idx: number | undefined, nom?: string, prenom?: string): Choix {
  const liste = PROFILS[cle];
  const n = liste.length * NB_VARIANTES;
  const base = baseIndex(idx, nom, prenom);
  const k = rang(base % n, 2, n);
  const tour = Math.floor(base / n);
  const ip = (k + tour) % liste.length;
  const v = Math.floor(k / liste.length) % NB_VARIANTES;
  // Projet emprunté à un autre profil du même titre selon la variante (v = 0 : le sien).
  const projet = liste[(ip + v * 3) % liste.length].projet;
  return { p: liste[ip], projet, v };
}

/** Besoin principal du stagiaire (tableau de l'analyse des besoins), cohérent avec son évaluation. */
export function getTPBesoinsPrincipal(intitule: string | undefined, code: string | undefined, nom?: string, prenom?: string, civilite?: string, idx?: number): string | null {
  const cle = tpBesoinsCle(intitule, code);
  if (!cle) return null;
  const c = choix(cle, idx, nom, prenom);
  return accorder(`${c.p.besoin}, ${CONTEXTES[c.v]}`, isFeminin(civilite, prenom), prenom) + ".";
}

const TITRE: Record<TPBesoinsCle, string> = {
  etrm: "Exploitant en transport routier de marchandises (RNCP40992)",
  gcf: "Gestionnaire comptable et fiscal (RNCP37949)",
  gp: "Gestionnaire de paie (RNCP37948)",
  ca: "Comptable assistant (RNCP37121)",
  sc: "Secrétaire comptable (RNCP37123)",
};

/** Réponses d'évaluation des besoins (apprenant + entreprise), différentes pour chaque stagiaire. */
export function getTPEvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean, idx: number | undefined, intitule?: string, code?: string,
) {
  const cle = tpBesoinsCle(intitule, code) || "ca";
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const { p, projet, v } = choix(cle, idx, s.nom, s.prenom);
  const acc = (txt: string) => accorder(txt, fem, s.prenom);
  const pick = (arr: string[], sel: number) => arr[rang(base, sel, arr.length)];
  const civ = s.civilite === "Mme" ? "Madame" : s.civilite === "M." ? "Monsieur" : (s.civilite || "Madame");
  return {
    civilite: civ,
    raisonSociale: hasEntreprise ? (s.entreprise as string) : "/",
    attentes: acc(p.attentes),
    missions: acc(p.missions),
    contribution: acc(p.contribution),
    diplome: acc(pick(DIPLOMES[cle], 4)),
    objectif: acc(`${p.objectif} ${HORIZONS[v]} À terme, je souhaite présenter le titre professionnel ${TITRE[cle]}, complet ou par CCP.`),
    budget: hasEntreprise
      ? "Formation prise en charge par l'OPCO de mon employeur (plan de développement des compétences ou alternance), sans frais pour moi."
      : "Formation financée par mon compte personnel de formation (CPF), complété si nécessaire par une aide de France Travail.",
    projetPro: acc(`${projet} Je suis cette formation ${CONTEXTES[v]}.`),
    handicap: acc(pick(HANDICAP, 6)),
    // Suit le nom (lu aussi hors de la session, sans rang) : identique partout.
    disponibilites: acc(DISPOS[seed(s.nom, s.prenom) % DISPOS.length]),
  };
}
