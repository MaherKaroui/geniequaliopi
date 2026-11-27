/**
 * Preset complet « Intelligence artificielle en entreprise : déployer les usages de l'IA dans les métiers – 67 h » —
 * action de formation NON CERTIFIANTE (BPF cadre F-3 ligne d ; spécialité 100 Formations générales).
 * Aucun code de répertoire : l'organisme évalue les acquis en interne et remet une attestation de fin de formation
 * et un certificat de réalisation.
 * 67 h = 10 jours ouvrés (9 jours de 7 h + 1 dernier jour de 4 h), 100 % à distance en classes virtuelles
 * synchrones (Google Meet / Zoom) ; 840 € HT par stagiaire ; financement par l'employeur (plan de développement
 * des compétences, convention entreprise). Formateur : Julien LOUBINOUX.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - fil rouge FICTIF : Claire, directrice des opérations d'« Arvelia Services » (entreprise fictive, 45 salariés,
 *    services B2B de maintenance et d'installation d'équipements de bureau, siège fictif dans le Val-de-Marne),
 *    qui pilote le déploiement de l'IA dans 4 services (relation client, commercial et marketing,
 *    administration et finance, ressources humaines)
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation sous forme de QCM d'entraînement de 10 questions
 *    corrigées (une par jour du jour 1 au jour 9, deux le jour 3) puis un QCM de 10 questions par compétence (C1 à C6)
 *  - Pack évaluation : QCM de positionnement de début et de fin (10 questions), cas pratique intermédiaire
 *    (fin du jour 5, C1 à C3), évaluation finale interne (jour 10, C1 à C6)
 *  - Pack veille (réglementaire / métier / technologique) : règlement (UE) 2024/1689, RGPD et CNIL, ANSSI…
 * Le support de cours (9 chapitres) est dans `iaEntreprise67h/` ; les réponses propres à chaque stagiaire dans
 * `iaEntreprise67hHumanized.ts`. Aucune donnée de satisfaction ni aucun taux de réussite n'est pré-rempli.
 */
import type { FormationInfo } from "@/types/qualiopi";
import type { AIContentPack, AIContentExercise } from "./aiContentPack";
import type { AIEvalPack, AIQCMQuestion } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";

// ---------------------------------------------------------------------------
// Formation
// ---------------------------------------------------------------------------
export const FORMATION_IAE67: FormationInfo = {
  intitule: "Intelligence artificielle en entreprise : déployer les usages de l'IA dans les métiers – 67 h",
  codeRNCP: "",
  objectifs:
    "Action de formation non certifiante. Objectif général : comprendre l'intelligence artificielle et ses limites, l'utiliser avec méthode dans ses tâches quotidiennes et conduire le déploiement de ses usages dans son service, dans le respect du cadre légal et éthique, avec un contrôle humain systématique.\nÀ l'issue de la formation, le stagiaire sera capable de :\n- C1 — Expliquer le fonctionnement, les apports et les limites de l'IA (apprentissage automatique, IA générative, grands modèles de langage, hallucinations, biais) pour en parler juste dans l'entreprise.\n- C2 — Rédiger des requêtes (prompts) efficaces et vérifier les productions de l'IA générative (texte, image, synthèse, traduction) dans ses tâches quotidiennes.\n- C3 — Utiliser l'IA pour produire et analyser : rédaction et communication, marketing et relation client, analyse de données et reporting (tableurs, tableaux de bord).\n- C4 — Automatiser des tâches et des processus métiers avec des outils d'IA et d'automatisation sans code (assistants intégrés aux suites bureautiques, agents, workflows), en gardant un contrôle humain.\n- C5 — Utiliser l'IA dans le respect du cadre légal et éthique : RGPD et CNIL, règlement européen sur l'IA (UE 2024/1689), propriété intellectuelle, confidentialité, cybersécurité, charte d'usage.\n- C6 — Conduire un projet de déploiement de l'IA dans son service : identifier et prioriser les cas d'usage, mesurer les gains (ROI, indicateurs), accompagner le changement, gouvernance et charte IA.",
  prerequis:
    "Aucun prérequis technique. Maîtriser les bases de la bureautique (traitement de texte, tableur, messagerie) et la navigation sur Internet. Disposer d'un ordinateur avec caméra, micro et connexion Internet pour suivre les classes virtuelles. Un entretien préalable vérifie la situation professionnelle du stagiaire, ses usages actuels et ses besoins.",
  duree: "67 heures (10 jours : 9 × 7 h + 1 × 4 h)",
  dureeSaisiePrioritaire: true,
  modalites: "distanciel",
  tarif: "840 € HT par stagiaire",
  programme:
    "Formation 100 % à distance en classes virtuelles synchrones (Google Meet / Zoom), 10 jours ouvrés : 9 jours de 7 h et un dernier jour de 4 h. Fil rouge : Claire, directrice des opérations d'« Arvelia Services », entreprise de 45 salariés qui assure la maintenance et l'installation d'équipements de bureau pour des clients professionnels (personnage et entreprise fictifs), pilote le déploiement de l'IA dans quatre services : relation client, commercial et marketing, administration et finance, ressources humaines.\nJour 1 — Comprendre l'IA : notions clés et limites (C1, 7 h) : accueil, présentation du parcours et QCM de positionnement ; histoire de l'IA ; IA symbolique et apprentissage automatique ; apprentissage profond ; IA générative et grands modèles de langage (tokens, fenêtre de contexte, probabilités) ; limites : hallucinations, biais, données datées, absence de compréhension ; parler juste de l'IA dans l'entreprise.\nJour 2 — Panorama des outils d'IA et des usages par métier (C1 et C2, 7 h) : assistants conversationnels (ChatGPT, Claude, Gemini, Mistral Le Chat), assistants intégrés aux suites bureautiques (Microsoft 365 Copilot, Gemini pour Google Workspace), outils d'image, de transcription et de traduction ; usages par service ; critères de choix d'un outil : besoin, version entreprise, hébergement et protection des données, intégration, coût ; cartographie des usages d'Arvelia Services.\nJour 3 — L'art du prompt : méthodes, itération et vérification (C2, 7 h) : structure d'un prompt (rôle, contexte, tâche, format, contraintes, exemples) ; prompts itératifs et reformulation ; demander des sources et des hypothèses ; vérification des faits, des chiffres et des citations ; relecture humaine ; bibliothèque de prompts du service ; mesure du temps gagné.\nJour 4 — IA pour rédiger, communiquer, faire du marketing et de la relation client (C3, 7 h) : courriels, comptes rendus, notes et procédures ; adaptation du ton et traduction ; contenus marketing et réseaux sociaux ; visuels générés et précautions ; réponses aux clients, base de connaissances et FAQ ; transparence vis-à-vis des clients ; relecture systématique.\nJour 5 — IA pour analyser les données et produire le reporting (C3, 7 h) : préparer et nettoyer des données ; formules et tableaux croisés dynamiques assistés ; synthèse d'un fichier d'interventions ; analyse des réponses à une enquête ; tableaux de bord et indicateurs ; contrôle des calculs ; cas pratique intermédiaire (C1 à C3).\nJour 6 — Automatiser les tâches et les processus (C4, 7 h) : repérer les tâches répétitives ; assistants intégrés et agents ; workflows sans code (Power Automate, Make, Zapier, n8n) : déclencheur, actions, conditions ; traitement d'une demande client de bout en bout ; points de validation humaine, journalisation et gestion des erreurs ; documentation d'une automatisation.\nJour 7 — Cadre légal et éthique de l'IA (C5, 7 h) : RGPD et recommandations de la CNIL (finalité, minimisation, information, sécurité, sous-traitants) ; règlement (UE) 2024/1689 sur l'IA : niveaux de risque, pratiques interdites et obligation de maîtrise de l'IA (article 4) applicables depuis le 2 février 2025, modèles d'IA à usage général depuis le 2 août 2025, majorité des autres obligations prévues au 2 août 2026, reports proposés par la Commission fin 2025 à suivre ; propriété intellectuelle et droit d'auteur ; confidentialité et secret des affaires ; cybersécurité (fuite de données, hameçonnage, injection de prompt) ; charte d'usage.\nJour 8 — Conduire un projet IA dans son service (C6, 7 h) : identifier les cas d'usage ; prioriser selon la valeur, la faisabilité et le risque ; projet pilote ; indicateurs et calcul du ROI ; conduite du changement : communication, formation, ambassadeurs, résistances ; gouvernance : rôles, validation des outils, charte IA, revue régulière.\nJour 9 — Projet fil rouge : feuille de route IA du service (C1 à C6, 7 h) : chaque stagiaire construit la feuille de route IA de son propre service : diagnostic, cas d'usage priorisés, prompts et automatisations prototypés, règles de conformité, indicateurs, plan d'accompagnement ; ateliers en sous-groupes et retours individualisés.\nJour 10 — Présentation, évaluation finale et bilan (C1 à C6, 4 h) : présentation orale de la feuille de route ; évaluation finale interne ; QCM de fin ; bilan de la formation et questionnaire de satisfaction.",
  methodesEvaluation:
    "Positionnement en ouverture : QCM de positionnement de 10 questions (une seule bonne réponse chacune, corrigé et expliqué), comparé au QCM de fin pour mesurer la progression, et 10 questions ouvertes sur les usages actuels de l'IA ; 10 mises en situation sous forme de QCM d'entraînement de 10 questions corrigés au fil des jours et un QCM de 10 questions par compétence (C1 à C6), sur le fil rouge de Claire et d'« Arvelia Services » (personnage et entreprise fictifs) ; cas pratique intermédiaire en fin de jour 5 (C1 à C3) ; évaluation finale interne le jour 10 : présentation de la feuille de route IA du service et étude de cas, grille d'acquisition des compétences C1 à C6 (acquis, en cours d'acquisition, non acquis) ; test de positionnement de fin. Évaluation à chaud (questionnaire de satisfaction en fin de formation) et évaluation à froid. Action de formation non certifiante : l'organisme remet à chaque stagiaire une attestation de fin de formation précisant les compétences évaluées et un certificat de réalisation.",
  moyensPedagogiques:
    "Formation entièrement à distance en classes virtuelles synchrones (Google Meet ou Zoom) avec le formateur en direct, partage d'écran, caméra et micro des stagiaires actifs, salles de sous-groupes. Méthodes actives : apports courts illustrés, démonstrations en direct, ateliers pratiques sur les outils d'IA (assistants conversationnels, assistants intégrés aux suites bureautiques, outils d'automatisation sans code), études de cas sur le fil rouge de Claire et d'« Arvelia Services » (personnage et entreprise fictifs), transposition aux tâches réelles de chaque stagiaire, QCM d'entraînement corrigés en direct, retours individualisés. Règle d'atelier : aucune donnée personnelle ni confidentielle n'est saisie dans un outil ; les exercices utilisent des données fictives. Supports remis : support de cours en 9 chapitres, bibliothèque de modèles de prompts, grille de vérification des productions, modèle de fiche d'automatisation, modèle de charte d'usage de l'IA, matrice de priorisation des cas d'usage, modèle de feuille de route IA. Ressources officielles : EUR-Lex (règlement (UE) 2024/1689 et RGPD), CNIL, ANSSI, France Num, Légifrance.",
  publicVise:
    "Salariés et managers d'entreprise (TPE, PME, ETI) de toutes fonctions — administration, commercial, marketing, ressources humaines, finance, support, production — qui veulent déployer l'IA dans leur métier. Accessibilité : formation ouverte aux personnes en situation de handicap ; le référent handicap de l'organisme étudie avec chaque stagiaire, au cas par cas, les adaptations utiles.",
  delaiAcces:
    "Inscription sous réserve de places disponibles, de l'entretien préalable et de la signature de la convention de formation avec l'employeur (plan de développement des compétences). Les liens des classes virtuelles et le test de connexion sont envoyés avant le premier jour.",
  dateDebut: "2025-03-03",
  dateFin: "2025-03-14",
  lieu: "Google Meet / Zoom",
  nombreParticipants: "6",
  formateur: "Julien LOUBINOUX",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Comprendre ce qu'est l'IA, l'apprentissage automatique et l'IA générative, et en connaître les limites (hallucinations, biais).",
  "Choisir un outil d'IA adapté à son métier et à la politique de l'entreprise en matière de données.",
  "Rédiger des prompts structurés, les améliorer par itération et vérifier systématiquement les réponses.",
  "Gagner du temps sur la rédaction : courriels, comptes rendus, procédures, contenus marketing, réponses aux clients.",
  "Analyser des données et produire un reporting fiable avec l'aide de l'IA dans le tableur.",
  "Automatiser des tâches répétitives avec des outils sans code, en gardant des points de validation humaine.",
  "Respecter le RGPD, le règlement européen sur l'IA, la propriété intellectuelle et la confidentialité dans ses usages.",
  "Repérer les risques de cybersécurité liés à l'IA : fuite de données, hameçonnage, injection de prompt.",
  "Identifier, prioriser et chiffrer les cas d'usage de l'IA dans son service.",
  "Conduire le changement auprès de son équipe et construire la feuille de route IA et la charte d'usage du service.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins est conduite avant la formation (entretien préalable avec chaque stagiaire et son employeur : fonction, service, usages actuels de l'IA, politique de l'entreprise en matière d'outils et de données, équipement pour les classes virtuelles) puis à l'ouverture du jour 1 : QCM de positionnement de 10 questions sur les notions clés des six compétences (comparé au QCM de fin pour mesurer la progression), 10 questions ouvertes et tour de table sur les tâches que chacun souhaite améliorer.</p>
<ul>
  <li><strong>Comprendre et bien utiliser (C1, C2)</strong> : les usages sont souvent spontanés, sans méthode de prompt ni vérification des réponses ; les limites des outils (hallucinations, biais) sont mal connues.</li>
  <li><strong>Produire, analyser, automatiser (C3, C4)</strong> : les stagiaires attendent des gains concrets sur la rédaction, le reporting et les tâches répétitives ; la formation part de leurs propres tâches, avec des données fictives.</li>
  <li><strong>Encadrer et déployer (C5, C6)</strong> : le cadre légal (RGPD, règlement européen sur l'IA, droit d'auteur) et les règles de confidentialité sont rarement formalisés ; peu de services disposent d'une charte d'usage ou d'une feuille de route.</li>
</ul>
<p>Claire, directrice des opérations d'« Arvelia Services » (personnage et entreprise fictifs, 45 salariés, maintenance et installation d'équipements de bureau pour des clients professionnels), sert de point de départ à chaque étude de cas, avant la transposition au service réel de chaque stagiaire.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Tâches réelles</strong> : chaque atelier est transposé à une tâche du stagiaire (courriel type, compte rendu, tableau de suivi, processus à automatiser), avec des données fictives ou anonymisées.</li>
  <li><strong>Outils de l'entreprise</strong> : les démonstrations privilégient les outils autorisés par l'employeur de chaque stagiaire ; à défaut, des versions gratuites sont utilisées sans aucune donnée réelle.</li>
  <li><strong>Niveaux hétérogènes</strong> : binômes mêlant débutants et utilisateurs réguliers, défis complémentaires pour les plus avancés.</li>
  <li><strong>Classe virtuelle</strong> : test de connexion proposé avant le premier jour, pauses régulières, sous-groupes pour faire participer chacun.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage ; supports transmis à l'avance sur demande, sous-titres activés si besoin, adaptations étudiées au cas par cas.</li>
</ul>`;

// ---------------------------------------------------------------------------
// QCM (10 questions chacun)
// Format lu par le générateur d'exercices : « 1) … A) …   B) … » + « 1-B  2-C … ».
// Aucune parenthèse fermante après A, B, C ou D dans les énoncés et les options (le parseur s'en servirait).
// ---------------------------------------------------------------------------
type Q = [question: string, options: string[], correct: number];
const LETTRES = ["A", "B", "C", "D"] as const;

function qcmExercice(titre: string, questions: Q[]): AIContentExercise {
  const consigne =
    `Cochez la bonne réponse pour chacune des ${questions.length} questions :\n\n` +
    questions
      .map(([q, opts], i) => `${i + 1}) ${q}\n  ${opts.map((o, oi) => `${LETTRES[oi]}) ${o}`).join("   ")}`)
      .join("\n\n");
  const reponseAttendue = questions.map(([, , c], i) => `${i + 1}-${LETTRES[c]}`).join("  ");
  return { titre, consigne, reponseAttendue, points: questions.length };
}

const VF = ["Vrai", "Faux"];

// ----- Mises en situation : QCM d'entraînement -----

const QCM_1: Q[] = [
  ["L'apprentissage automatique désigne :", ["Un programme dont toutes les règles sont écrites à la main", "Une méthode où un système apprend des régularités à partir d'exemples", "Un robot physique installé dans un atelier", "Un logiciel de traitement de texte"], 1],
  ["Un grand modèle de langage produit sa réponse :", ["En prédisant, morceau de mot après morceau de mot, la suite la plus probable", "En consultant une base de vérités vérifiées par un expert", "En recopiant toujours une page web précise", "En transmettant la question à un opérateur humain"], 0],
  ["Une « hallucination » d'un outil d'IA générative est :", ["Une panne du serveur", "Un refus de répondre", "Une réponse plausible mais fausse ou inventée", "Une image floue"], 2],
  ["L'IA générative se distingue d'autres IA parce qu'elle :", ["Ne fonctionne qu'avec des chiffres", "Remplace les bases de données", "Ne peut répondre que par oui ou non", "Crée de nouveaux contenus, texte, image ou son, à partir d'une consigne"], 3],
  ["Un biais d'un système d'IA provient souvent :", ["Des données d'entraînement qui reflètent des déséquilibres", "De la couleur de l'écran", "De la vitesse de la connexion Internet", "Du nombre d'utilisateurs connectés"], 0],
  ["Un « token » est, pour un modèle de langage :", ["Un mot de passe", "Une unité de texte, souvent un morceau de mot, traitée par le modèle", "Une licence d'utilisation", "Un type de fichier image"], 1],
  ["La « fenêtre de contexte » d'un modèle correspond :", ["À la taille de l'écran de l'utilisateur", "Au nombre de langues parlées par le modèle", "À la quantité de texte que le modèle peut prendre en compte dans un échange", "À la durée de l'abonnement"], 2],
  ["Un modèle entraîné sur des données arrêtées à une certaine date :", ["Connaît toujours l'actualité du jour", "Ne peut plus répondre après cette date", "Est interdit d'usage", "Peut ignorer des faits récents s'il n'accède pas à une recherche en ligne"], 3],
  ["Pourquoi dit-on qu'un modèle de langage ne « comprend » pas comme un humain ?", ["Parce qu'il calcule des probabilités sur des textes, sans conscience ni intention", "Parce qu'il ne parle qu'anglais", "Parce qu'il ne sait pas écrire de phrases complètes", "Parce qu'il refuse les questions difficiles"], 0],
  ["Vrai ou faux : une réponse rédigée avec assurance par un outil d'IA est forcément exacte.", VF, 1],
];

const QCM_2: Q[] = [
  ["Pour Claire, le premier critère de choix d'un outil d'IA pour Arvelia Services est :", ["La popularité de l'outil sur les réseaux sociaux", "Le besoin métier précis que l'outil doit couvrir", "La couleur de l'interface", "Le nombre de fonctions proposées"], 1],
  ["Une version « entreprise » d'un assistant d'IA apporte en général :", ["Des engagements contractuels sur l'usage et la protection des données", "La garantie que les réponses sont toujours exactes", "La suppression de toute relecture", "Un accès sans identifiant"], 0],
  ["Un assistant intégré à la suite bureautique, comme Microsoft 365 Copilot ou Gemini pour Google Workspace, permet surtout :", ["De remplacer le réseau informatique", "De supprimer les droits d'accès aux fichiers", "D'utiliser l'IA directement dans les documents, la messagerie et les réunions", "D'éviter toute formation des utilisateurs"], 2],
  ["Pour le service relation client d'Arvelia Services, un usage pertinent de l'IA est :", ["Signer les contrats à la place du responsable", "Décider seul des remises accordées", "Supprimer les échanges avec les clients", "Proposer un brouillon de réponse aux demandes courantes, relu avant envoi"], 3],
  ["Avant d'adopter un outil, il faut vérifier notamment :", ["Où sont hébergées les données et si elles servent à entraîner le modèle", "Le pays de naissance du fondateur de l'éditeur", "Le nombre d'abonnés de l'éditeur", "Uniquement le prix affiché"], 0],
  ["Un outil de transcription automatique est utile pour :", ["Calculer la paie", "Produire le texte d'une réunion, à relire avant diffusion", "Remplacer le procès-verbal signé", "Enregistrer une réunion sans prévenir les participants"], 1],
  ["Le service administration et finance d'Arvelia Services peut utiliser l'IA pour :", ["Valider seul les écritures comptables", "Transmettre les relevés bancaires à un outil public", "Expliquer une formule de tableur ou préparer une synthèse de dépenses à contrôler", "Supprimer les contrôles internes"], 2],
  ["Comparer deux outils d'IA sur une même tâche consiste à :", ["Choisir celui qui répond le plus vite", "Choisir le plus cher", "Demander l'avis d'un seul collègue", "Soumettre le même prompt et évaluer la qualité, l'exactitude et la facilité d'usage"], 3],
  ["La cartographie des usages d'un service recense :", ["Les tâches où l'IA peut aider, les outils envisagés et les données concernées", "Les salaires de l'équipe", "Les adresses des clients", "Les mots de passe des outils"], 0],
  ["Vrai ou faux : un seul outil d'IA suffit toujours à couvrir tous les besoins de tous les services.", VF, 1],
];

const QCM_3: Q[] = [
  ["Un prompt bien structuré précise notamment :", ["Le rôle attendu, le contexte, la tâche, le format et les contraintes", "Uniquement un mot-clé", "Le mot de passe de l'utilisateur", "Le nom du concurrent"], 0],
  ["Donner un rôle à l'outil, par exemple « tu es responsable du service client », sert à :", ["Rendre la réponse automatiquement exacte", "Orienter le ton et le niveau de la réponse", "Contourner les règles de l'entreprise", "Éviter de préciser la tâche"], 1],
  ["Pour obtenir un tableau exploitable, Claire précise dans son prompt :", ["Rien, l'outil devine", "Seulement le titre", "Le format attendu : colonnes, ordre et longueur", "Une couleur de police"], 2],
  ["Fournir un exemple de résultat attendu dans le prompt :", ["Est interdit", "Rend la réponse plus longue sans intérêt", "Supprime le besoin de relecture", "Aide l'outil à reproduire le style et la structure souhaités"], 3],
  ["Le prompt itératif consiste à :", ["Améliorer la réponse par des demandes successives de précision ou de correction", "Poser la même question cent fois", "Changer d'outil à chaque question", "Copier la première réponse sans la lire"], 0],
  ["Quelle consigne réduit le risque d'invention ?", ["« Réponds coûte que coûte »", "« Si tu ne sais pas, dis-le et indique ce qu'il faudrait vérifier »", "« Invente des chiffres réalistes »", "« Ne pose jamais de question »"], 1],
  ["Les contraintes d'un prompt peuvent porter sur :", ["Le salaire de l'utilisateur", "La météo", "La longueur, le ton, le public visé et les éléments à exclure", "Le nombre de collègues présents"], 2],
  ["Pour un compte rendu d'intervention, le meilleur prompt est :", ["« Fais un compte rendu »", "« Écris quelque chose de bien »", "« Résume »", "« À partir des notes ci-dessous, rédige un compte rendu client de 10 lignes, ton professionnel, avec actions et délais »"], 3],
  ["Une bibliothèque de prompts du service sert à :", ["Partager les prompts qui fonctionnent et harmoniser les pratiques", "Stocker les données des clients", "Remplacer la charte d'usage", "Éviter toute relecture"], 0],
  ["Vrai ou faux : il est utile de demander à l'outil de poser des questions s'il lui manque des informations.", VF, 0],
];

const QCM_4: Q[] = [
  ["Après une réponse de l'IA contenant un chiffre précis, Claire doit :", ["Le diffuser immédiatement", "Vérifier le chiffre dans une source fiable", "Demander à l'outil s'il est sûr et s'en contenter", "L'arrondir"], 1],
  ["Une source citée par un outil d'IA :", ["Doit être ouverte et vérifiée, car elle peut être inexacte ou inventée", "Est toujours authentique", "Remplace la relecture", "Ne peut jamais être consultée"], 0],
  ["La relecture humaine d'une production de l'IA vérifie :", ["Seulement l'orthographe", "La couleur du texte", "L'exactitude, la cohérence, le ton et l'adéquation au destinataire", "Le nombre de mots"], 2],
  ["Pour une traduction destinée à un client, la bonne pratique est :", ["Envoyer la traduction sans la lire", "Traduire mot à mot", "Supprimer les termes techniques", "Faire relire par une personne qui maîtrise la langue ou contrôler les termes clés"], 3],
  ["Une grille de vérification des productions comprend par exemple :", ["Faits, chiffres, noms, dates, sources, ton, données sensibles", "Uniquement la police utilisée", "Le prénom de l'auteur du prompt", "La durée de la session"], 0],
  ["Une synthèse produite par l'IA d'un document long peut :", ["Être parfaite à coup sûr", "Omettre ou déformer un point important : il faut la comparer au document", "Remplacer la lecture des clauses d'un contrat", "Être signée sans contrôle"], 1],
  ["Pour mesurer le gain de productivité d'un usage, on compare :", ["Le nombre de prompts écrits", "Le nombre d'outils installés", "Le temps passé et la qualité obtenue avant et après, relecture comprise", "Le nombre de couleurs d'un rapport"], 2],
  ["Une image générée par l'IA pour une présentation interne doit être vérifiée car :", ["Elle est toujours protégée par le droit d'auteur de l'entreprise", "Elle est toujours interdite", "Elle remplace une photo réelle d'intervention", "Elle peut contenir des erreurs visibles, des textes illisibles ou ressembler à une œuvre existante"], 3],
  ["Si deux réponses de l'IA à la même question se contredisent, Claire :", ["Vérifie l'information dans une source de référence", "Choisit la réponse la plus longue", "Choisit la première", "Mélange les deux"], 0],
  ["Vrai ou faux : la personne qui utilise l'IA reste responsable du contenu qu'elle diffuse.", VF, 0],
];

const QCM_5: Q[] = [
  ["Pour rédiger un courriel délicat à un client mécontent, l'IA est utile pour :", ["Envoyer le courriel automatiquement", "Proposer un brouillon empathique et structuré, adapté puis relu", "Décider du geste commercial", "Éviter de lire la réclamation"], 1],
  ["Avant de soumettre la réclamation d'un client à un outil d'IA public, il faut :", ["Retirer les données personnelles et les informations confidentielles", "Ajouter le numéro de téléphone du client", "Joindre le contrat signé", "Ne rien modifier"], 0],
  ["Adapter le ton d'un texte avec l'IA consiste à demander :", ["Un texte plus long", "Une traduction en anglais", "Une version plus formelle, plus simple ou plus chaleureuse selon le destinataire", "La suppression des formules de politesse"], 2],
  ["Pour la page « Services » du site d'Arvelia Services, l'IA peut :", ["Inventer des témoignages de clients", "Annoncer des certificats que l'entreprise n'a pas", "Copier le site d'un concurrent", "Proposer une structure et des formulations, à compléter avec des informations réelles"], 3],
  ["Une FAQ client produite avec l'IA doit être :", ["Validée par les personnes qui connaissent les procédures réelles", "Publiée sans relecture", "Rédigée sans lien avec les contrats", "Remplie de promesses commerciales"], 0],
  ["Un chatbot de relation client doit, au regard de la transparence :", ["Se présenter comme un humain", "Indiquer clairement à l'utilisateur qu'il échange avec un système d'IA", "Collecter le plus de données possible", "Refuser tout transfert vers un conseiller"], 1],
  ["Pour une publication sur un réseau social professionnel, la bonne démarche est :", ["Publier la première proposition de l'IA", "Demander dix publications et toutes les poster", "Fixer l'objectif, la cible et le message, puis retravailler la proposition", "Ne jamais citer l'entreprise"], 2],
  ["Un compte rendu de réunion généré à partir d'une transcription :", ["Peut être diffusé sans avoir informé les participants de l'enregistrement", "Est un document signé", "Remplace la prise de décision", "Doit être relu, notamment les décisions, les responsables et les échéances"], 3],
  ["Pour rédiger une procédure interne avec l'IA, Claire fournit :", ["Les étapes réelles, les rôles et les points de contrôle du service", "Le nom des salariés absents", "Les mots de passe des logiciels", "Une procédure d'une autre entreprise"], 0],
  ["Vrai ou faux : un texte marketing généré par l'IA peut contenir des affirmations non vérifiées qu'il faut retirer.", VF, 0],
];

const QCM_6: Q[] = [
  ["Avant d'analyser un fichier d'interventions avec l'IA, il faut d'abord :", ["Le publier en ligne", "Vérifier sa qualité et retirer ou pseudonymiser les données personnelles", "Supprimer les en-têtes", "Le convertir en image"], 1],
  ["Un tableau croisé dynamique sert à :", ["Résumer et regrouper des données selon plusieurs critères", "Mettre en couleur un texte", "Envoyer des courriels", "Créer un mot de passe"], 0],
  ["L'IA propose une formule de tableur pour calculer un délai moyen d'intervention. Claire :", ["L'utilise sans la comprendre", "La recopie dans tous les fichiers de l'entreprise", "La teste sur quelques lignes dont elle connaît le résultat", "La supprime"], 2],
  ["Un indicateur pertinent pour le service maintenance d'Arvelia Services est :", ["Le nombre de couleurs du tableau de bord", "Le nombre de prompts envoyés", "La taille du fichier", "Le délai moyen entre la demande et l'intervention"], 3],
  ["L'IA résume les réponses à une enquête de satisfaction. Il faut vérifier :", ["Que les tendances annoncées correspondent bien aux réponses réelles", "Que le résumé est très long", "Que les répondants sont nommés", "Que les chiffres sont arrondis à la dizaine"], 0],
  ["Un tableau de bord efficace présente :", ["Toutes les données disponibles", "Quelques indicateurs utiles à la décision, avec leur définition et leur période", "Des graphiques sans titre", "Des chiffres sans source"], 1],
  ["Quand l'IA commente une évolution entre deux mois, Claire se méfie :", ["Du nombre de mots", "De la police utilisée", "D'une interprétation de cause non démontrée par les données", "De l'orthographe"], 2],
  ["Pour fiabiliser un reporting mensuel assisté par l'IA, on :", ["Change de méthode chaque mois", "Supprime les données sources", "Évite de documenter les calculs", "Garde les données sources, documente les calculs et contrôle les totaux"], 3],
  ["Une donnée « aberrante » dans un fichier est :", ["Une valeur anormale à vérifier avant l'analyse", "Une donnée chiffrée", "Une donnée protégée", "Un graphique"], 0],
  ["Vrai ou faux : un graphique produit par l'IA doit toujours être contrôlé par rapport aux données d'origine.", VF, 0],
];

const QCM_7: Q[] = [
  ["Un workflow sans code est composé :", ["D'un mot de passe et d'un identifiant", "D'un déclencheur, d'actions et éventuellement de conditions", "D'un tableau de bord uniquement", "D'un prompt unique"], 1],
  ["Quelle tâche se prête bien à l'automatisation ?", ["Une tâche répétitive, fréquente et à règles claires", "Une décision de licenciement", "Une négociation commerciale complexe", "Une tâche réalisée une fois par an et toujours différente"], 0],
  ["Dans le traitement automatisé d'une demande client, le point de validation humaine sert à :", ["Ralentir le processus sans raison", "Supprimer la traçabilité", "Contrôler la réponse ou la décision avant qu'elle ne parte au client", "Éviter de répondre"], 2],
  ["Un agent d'IA se distingue d'un simple assistant parce qu'il :", ["Ne peut écrire que du texte", "Fonctionne sans aucune règle", "Est toujours gratuit", "Peut enchaîner plusieurs actions dans des outils pour atteindre un objectif"], 3],
  ["La journalisation d'une automatisation permet :", ["De retrouver ce qui a été fait, quand et avec quel résultat", "De supprimer les erreurs automatiquement", "De masquer les échecs", "D'éviter toute maintenance"], 0],
  ["Avant de connecter un outil d'automatisation à la messagerie de l'entreprise, il faut :", ["Donner tous les droits à l'outil", "Vérifier les droits accordés, l'accord du service informatique et les données concernées", "Partager son mot de passe", "Désactiver l'antivirus"], 1],
  ["Une fiche d'automatisation documente notamment :", ["Le salaire du concepteur", "Les opinions de l'équipe", "L'objectif, le déclencheur, les étapes, le responsable et la procédure en cas d'erreur", "Uniquement le nom de l'outil"], 2],
  ["Si l'automatisation échoue sur une demande client, la bonne pratique est :", ["Ne rien faire", "Supprimer la demande", "Relancer l'automatisation en boucle", "Prévoir une alerte et une reprise manuelle de la demande"], 3],
  ["Pour démarrer, Claire choisit d'automatiser :", ["Un processus simple et bien maîtrisé, testé sur un petit périmètre", "Tous les processus de l'entreprise en même temps", "Un processus qu'elle ne connaît pas", "Un processus sans responsable"], 0],
  ["Vrai ou faux : une fois une automatisation lancée, il n'est plus nécessaire de la surveiller.", VF, 1],
];

const QCM_8: Q[] = [
  ["Le règlement (UE) 2016/679, dit RGPD, s'applique à l'usage de l'IA lorsque :", ["L'outil est gratuit", "Des données personnelles sont traitées", "L'outil est utilisé le week-end", "Le texte produit dépasse une page"], 1],
  ["Le principe de minimisation du RGPD impose :", ["De ne traiter que les données nécessaires à la finalité", "De collecter un maximum de données", "De conserver les données sans limite", "De partager les données avec tous les services"], 0],
  ["Le règlement européen sur l'IA classe les systèmes :", ["Selon leur prix", "Selon le pays de l'éditeur", "Selon leur niveau de risque", "Selon leur date de création"], 2],
  ["Depuis le 2 février 2025, le règlement européen sur l'IA rend applicables :", ["Toutes ses obligations sans exception", "Uniquement des recommandations facultatives", "Aucune obligation", "Les pratiques interdites et l'obligation de maîtrise de l'IA prévue à l'article 4"], 3],
  ["L'obligation de maîtrise de l'IA impose aux fournisseurs et aux déployeurs :", ["De prendre des mesures pour assurer un niveau suffisant de maîtrise de l'IA de leur personnel", "D'interdire l'IA à leurs salariés", "D'acheter un outil précis", "De publier leurs prompts"], 0],
  ["La Commission européenne a proposé fin 2025 de reporter certaines échéances du règlement sur l'IA. Claire :", ["Considère que plus aucune obligation ne s'applique", "Suit l'adoption du texte dans les sources officielles avant de modifier ses pratiques", "Ignore le règlement", "Considère le report comme définitif"], 1],
  ["Saisir le fichier clients d'Arvelia Services dans un outil d'IA public non autorisé expose surtout à :", ["Une meilleure réponse", "Aucun risque", "Une fuite de données personnelles et confidentielles", "Une économie de temps sans contrepartie"], 2],
  ["Un contenu produit uniquement par l'IA, sans apport créatif humain :", ["Est toujours protégé au nom de l'utilisateur", "Appartient toujours à l'éditeur de l'outil", "Ne peut jamais être utilisé", "Bénéficie d'une protection par le droit d'auteur incertaine"], 3],
  ["L'injection de prompt est :", ["Une instruction malveillante cachée dans un contenu, qui détourne le comportement de l'outil", "Une méthode de rédaction recommandée", "Une mise à jour de l'outil", "Une sauvegarde des prompts"], 0],
  ["Vrai ou faux : une charte d'usage de l'IA précise les outils autorisés, les données interdites de saisie et les règles de relecture.", VF, 0],
];

const QCM_9: Q[] = [
  ["Pour identifier les cas d'usage de l'IA dans un service, Claire commence par :", ["Acheter l'outil le plus connu", "Recenser avec l'équipe les tâches chronophages, répétitives ou à faible valeur", "Demander au fournisseur ce qu'il conseille", "Lancer tous les projets à la fois"], 1],
  ["Une matrice de priorisation des cas d'usage croise par exemple :", ["La valeur attendue, la faisabilité et le niveau de risque", "Le prénom et l'âge des salariés", "Le prix et la couleur des outils", "Le nombre de réunions"], 0],
  ["Le retour sur investissement d'un projet se calcule en principe ainsi :", ["Coûts divisés par le nombre de salariés", "Gains moins coûts, sans période", "Gains moins coûts, rapportés aux coûts, sur une période donnée", "Nombre d'utilisateurs multiplié par le prix"], 2],
  ["Dans les coûts d'un projet IA, il ne faut pas oublier :", ["Uniquement l'abonnement à l'outil", "Le prix de l'électricité du domicile des salariés", "Les dépenses de l'année précédente", "Le temps de formation, de paramétrage, de relecture et de suivi"], 3],
  ["Un projet pilote sert à :", ["Tester le cas d'usage sur un périmètre limité et mesurer les résultats avant de généraliser", "Généraliser immédiatement à toute l'entreprise", "Éviter de mesurer les résultats", "Remplacer la charte d'usage"], 0],
  ["Face à un collaborateur inquiet de voir son poste remplacé par l'IA, Claire :", ["Évite le sujet", "Écoute, explique les objectifs et associe le collaborateur à l'expérimentation", "Impose l'outil sans explication", "Le retire du projet"], 1],
  ["Des « ambassadeurs » de l'IA dans les services ont pour rôle :", ["De surveiller leurs collègues", "De décider seuls des outils", "D'aider leurs collègues, de partager les bonnes pratiques et de faire remonter les difficultés", "De remplacer le manager"], 2],
  ["La gouvernance de l'IA dans l'entreprise définit notamment :", ["Les horaires de la cantine", "Le classement des salariés", "Les salaires des utilisateurs", "Qui valide les outils, qui suit les usages et comment les risques sont revus"], 3],
  ["Un indicateur de suivi d'un cas d'usage est par exemple :", ["Le temps moyen de traitement d'une demande avant et après", "Le nombre de couleurs du support", "Le nombre de comptes créés sans usage", "La durée de la réunion de lancement"], 0],
  ["Vrai ou faux : associer l'équipe dès l'identification des cas d'usage facilite l'adoption des nouveaux usages.", VF, 0],
];

const QCM_10: Q[] = [
  ["La feuille de route IA d'un service présente :", ["Le budget global de l'entreprise", "Les cas d'usage retenus, le calendrier, les responsables, les indicateurs et les règles à respecter", "La liste des outils interdits seulement", "Les résultats de la concurrence"], 1],
  ["Le diagnostic de départ de la feuille de route décrit :", ["Les tâches actuelles, les usages existants de l'IA, les outils disponibles et les irritants", "Le prénom des clients", "L'historique de l'entreprise depuis sa création", "Les vacances de l'équipe"], 0],
  ["Pour chaque cas d'usage de la feuille de route, Claire indique :", ["Seulement l'outil", "Seulement le coût", "L'objectif, l'outil, les données utilisées, le contrôle humain et l'indicateur", "Seulement le nom du service"], 2],
  ["Le calendrier de déploiement le plus réaliste prévoit :", ["Tout pour la semaine suivante", "Aucune date", "Un démarrage sans formation", "Des étapes : pilote, bilan, ajustement puis généralisation"], 3],
  ["Les règles de conformité d'un cas d'usage traitant des données personnelles comprennent :", ["Base légale, information des personnes, minimisation, sécurité et durée de conservation", "Uniquement un mot de passe", "Aucune règle si l'outil est payant", "L'accord oral d'un collègue"], 0],
  ["Pour présenter la feuille de route à la direction, Claire met en avant :", ["Le nombre de prompts écrits", "Les gains attendus, les risques maîtrisés, les moyens nécessaires et les étapes de décision", "Les fonctions techniques de chaque outil", "Les noms des fournisseurs"], 1],
  ["Le plan d'accompagnement de l'équipe prévoit par exemple :", ["Un courriel unique", "Une interdiction de poser des questions", "Des ateliers courts, des fiches pratiques et un point régulier de retour d'expérience", "Une évaluation individuelle des erreurs"], 2],
  ["La revue régulière de la feuille de route permet :", ["De ne jamais changer de cap", "De supprimer les indicateurs", "D'arrêter tout contrôle", "D'ajuster les cas d'usage selon les résultats, les retours et l'évolution des règles"], 3],
  ["Un risque à inscrire dans la feuille de route est par exemple :", ["La dépendance à un seul fournisseur et la perte de compétences internes", "La couleur des graphiques", "Le nombre de pages du support", "Le choix de la police"], 0],
  ["Vrai ou faux : une feuille de route IA doit rester figée une fois validée par la direction.", VF, 1],
];

/** 10 mises en situation sous forme de QCM d'entraînement : jours 1 à 9, deux le jour 3. */
export const IAE67_EXERCICES: AIContentExercise[] = [
  qcmExercice("QCM 1 — C1 : comprendre l'IA, l'apprentissage automatique et les grands modèles de langage", QCM_1),
  qcmExercice("QCM 2 — C1 : panorama des outils d'IA et choix d'un outil par métier", QCM_2),
  qcmExercice("QCM 3 — C2 : rédiger un prompt structuré et l'améliorer par itération", QCM_3),
  qcmExercice("QCM 4 — C2 : vérifier les productions de l'IA et mesurer les gains", QCM_4),
  qcmExercice("QCM 5 — C3 : rédiger, communiquer, marketing et relation client", QCM_5),
  qcmExercice("QCM 6 — C3 : analyser les données et produire le reporting", QCM_6),
  qcmExercice("QCM 7 — C4 : automatiser les tâches et les processus sans code", QCM_7),
  qcmExercice("QCM 8 — C5 : RGPD, règlement européen sur l'IA, propriété intellectuelle et sécurité", QCM_8),
  qcmExercice("QCM 9 — C6 : cas d'usage, priorisation, ROI et conduite du changement", QCM_9),
  qcmExercice("QCM 10 — C6 : construire la feuille de route IA du service", QCM_10),
];

// ----- QCM de révision, un par compétence -----

const QCM_C1: Q[] = [
  ["L'apprentissage profond repose sur :", ["Des fiches rédigées à la main", "Des réseaux de neurones artificiels à nombreuses couches", "Un tableur partagé", "Une base de règles fixes"], 1],
  ["Un modèle d'IA qui classe automatiquement les courriels entrants en « urgent » ou « non urgent » relève :", ["De l'apprentissage automatique appliqué à la classification", "De l'IA générative d'images", "De la robotique industrielle", "De la bureautique classique sans IA"], 0],
  ["Pour parler juste de l'IA à son équipe, Claire explique qu'un outil d'IA générative :", ["Pense comme un humain", "Ne fait jamais d'erreur", "Produit des contenus probables qui doivent être vérifiés", "Connaît tous les documents internes de l'entreprise"], 2],
  ["Quel exemple illustre un biais ?", ["Une réponse rapide", "Un texte en anglais", "Un tableau bien présenté", "Un outil de tri de candidatures qui défavorise un profil parce que les données passées étaient déséquilibrées"], 3],
  ["Un outil d'IA qui ne connaît pas les tarifs internes d'Arvelia Services :", ["Peut en inventer s'il n'a pas accès aux documents de l'entreprise", "Les connaît forcément", "Refuse toujours de répondre", "Les calcule exactement"], 0],
  ["Un apport réaliste de l'IA générative en entreprise est :", ["La suppression de toute vérification", "Un gain de temps sur les premiers jets, les synthèses et les reformulations", "La garantie de décisions parfaites", "Le remplacement de toute l'équipe"], 1],
  ["Un modèle « multimodal » est capable :", ["De fonctionner sans électricité", "De parler plusieurs langues uniquement", "De traiter plusieurs types de contenus, par exemple texte et image", "De se mettre à jour seul chaque jour"], 2],
  ["Connecter un assistant aux documents internes pour qu'il réponde à partir de ces documents s'appelle souvent :", ["Une sauvegarde", "Un pare-feu", "Un tableau croisé", "Une génération augmentée par la recherche documentaire"], 3],
  ["La qualité d'une réponse de l'IA dépend fortement :", ["De la qualité de la consigne et des informations fournies", "De la taille de l'écran", "De l'heure de la journée", "Du navigateur utilisé"], 0],
  ["Vrai ou faux : l'IA générative peut reproduire des stéréotypes présents dans les textes dont elle a appris.", VF, 0],
];

const QCM_C2: Q[] = [
  ["Quel prompt est le plus efficace pour résumer un rapport d'intervention ?", ["« Résume ça »", "« Résume ce rapport en 5 points pour un client non technicien, avec les actions prévues et leurs dates »", "« Fais court »", "« Dis-moi ce que tu en penses »"], 1],
  ["Pour réduire les erreurs, il est utile de demander à l'outil :", ["De distinguer ce qui vient du document fourni et ce qui relève de ses hypothèses", "D'être le plus créatif possible sur les faits", "De ne jamais signaler ses doutes", "D'ajouter des chiffres pour convaincre"], 0],
  ["Si la réponse est trop générale, la meilleure relance est :", ["Recommencer avec un autre outil sans changer le prompt", "Accepter la réponse", "Préciser le contexte, le public et donner un exemple attendu", "Écrire en majuscules"], 2],
  ["Découper une tâche complexe en étapes dans plusieurs prompts permet :", ["D'allonger inutilement le travail", "D'empêcher la relecture", "De supprimer le contexte", "De mieux contrôler chaque étape du résultat"], 3],
  ["Une citation attribuée à une personnalité par l'IA doit être :", ["Vérifiée dans une source d'origine avant toute utilisation", "Publiée telle quelle", "Modifiée pour être plus percutante", "Attribuée à l'entreprise"], 0],
  ["Pour une traduction technique, Claire fournit à l'outil :", ["Rien de plus que le texte", "Un glossaire des termes du métier à respecter", "Le nom du traducteur précédent", "Le mot de passe du logiciel"], 1],
  ["Un prompt réutilisable dans la bibliothèque du service contient :", ["Les données réelles d'un client", "Un nom de salarié", "Des zones à compléter entre crochets et une consigne de vérification", "Un mot de passe"], 2],
  ["Le temps gagné grâce à l'IA se mesure :", ["Sans compter la relecture", "Uniquement sur la première utilisation", "Selon l'avis de l'éditeur", "En incluant la rédaction du prompt, la relecture et les corrections"], 3],
  ["Une image générée destinée à un document client doit être contrôlée sur :", ["Les erreurs visuelles, les textes illisibles et la cohérence avec la réalité", "Le nombre de pixels uniquement", "Le nom de l'outil", "La date de création"], 0],
  ["Vrai ou faux : demander une réponse « sous forme de tableau à trois colonnes » est une contrainte de format utile.", VF, 0],
];

const QCM_C3: Q[] = [
  ["Pour répondre plus vite aux demandes fréquentes des clients, le service relation client peut :", ["Laisser l'IA répondre seule sans contrôle", "Constituer des modèles de réponses préparés avec l'IA et validés par le service", "Supprimer le formulaire de contact", "Répondre toujours de la même façon à tous"], 1],
  ["Avant d'analyser une liste de clients avec l'IA, on remplace les noms par des identifiants. On parle de :", ["Pseudonymisation", "Chiffrement de disque", "Sauvegarde", "Compression"], 0],
  ["Un premier jet d'offre commerciale produit par l'IA doit être complété par :", ["Des promesses de résultats", "Des références clients inventées", "Les conditions réelles, les prix validés et les engagements de service de l'entreprise", "Des comparaisons dénigrantes"], 2],
  ["Pour analyser les motifs de réclamation sur un trimestre, la démarche est :", ["Demander une estimation au hasard", "Supprimer les réclamations anciennes", "Compter uniquement les réclamations positives", "Préparer un fichier anonymisé, demander un regroupement par motifs, puis vérifier sur un échantillon"], 3],
  ["Un tableau de bord mensuel destiné à la direction doit :", ["Être lisible, sourcé et centré sur les décisions à prendre", "Contenir toutes les colonnes du fichier source", "Changer d'indicateurs chaque mois", "Masquer les mauvais résultats"], 0],
  ["Pour la communication interne, l'IA peut aider à :", ["Rédiger des sanctions", "Rédiger une note claire annonçant un nouveau processus, relue par le responsable", "Diffuser des informations confidentielles", "Remplacer les réunions d'équipe"], 1],
  ["Une campagne d'e-mailing préparée avec l'IA doit respecter :", ["Aucune règle particulière", "Le choix de l'outil", "Les règles de consentement et d'information des destinataires", "Uniquement la longueur du message"], 2],
  ["Quand l'IA calcule une moyenne dans un tableur, Claire vérifie :", ["La couleur des cellules", "Le nom de la feuille", "La police du tableau", "La plage de cellules prise en compte et le résultat sur un exemple connu"], 3],
  ["Une synthèse de l'enquête annuelle auprès des clients doit distinguer :", ["Les faits mesurés et les interprétations", "Les clients aimables et les autres", "Les réponses courtes et longues", "Les réponses du matin et de l'après-midi"], 0],
  ["Vrai ou faux : un contenu publié au nom de l'entreprise doit être relu par une personne responsable, même s'il a été produit avec l'IA.", VF, 0],
];

const QCM_C4: Q[] = [
  ["Dans un workflow, le déclencheur est :", ["Le résultat final", "L'événement qui lance l'automatisation, par exemple la réception d'un formulaire", "Le nom de l'outil", "Le responsable du service"], 1],
  ["Une condition dans un workflow permet :", ["De suivre un chemin différent selon une règle, par exemple le niveau d'urgence", "D'arrêter l'ordinateur", "De supprimer les données", "D'éviter les tests"], 0],
  ["Avant de mettre en production une automatisation, on :", ["La lance directement sur tous les clients", "Supprime la version manuelle", "La teste avec des cas fictifs, y compris des cas d'erreur", "Désactive les alertes"], 2],
  ["Le principe de contrôle humain signifie que :", ["Personne ne regarde jamais les résultats", "L'outil décide seul de tout", "Seul l'éditeur de l'outil peut intervenir", "Une personne compétente peut vérifier, corriger ou arrêter le traitement"], 3],
  ["Les droits accordés à un outil d'automatisation doivent être :", ["Limités au strict nécessaire pour la tâche", "Les plus larges possible", "Partagés avec tous les salariés", "Identiques pour tous les outils"], 0],
  ["Un assistant intégré à la messagerie peut aider à :", ["Signer des contrats", "Trier, résumer et proposer des réponses aux messages, à valider", "Supprimer automatiquement tous les messages", "Envoyer des messages sans destinataire"], 1],
  ["Pour Arvelia Services, une automatisation utile du service administration et finance est :", ["Le paiement automatique de toutes les factures reçues sans contrôle", "La suppression des justificatifs", "L'extraction des données des factures fournisseurs vers un tableau, avec contrôle avant validation", "L'envoi des relevés bancaires à un outil public"], 2],
  ["Documenter une automatisation permet surtout :", ["De la rendre secrète", "D'empêcher toute modification", "D'augmenter son coût", "Qu'un collègue puisse la comprendre, la maintenir et la reprendre en cas d'absence"], 3],
  ["Un indicateur de suivi d'une automatisation est :", ["Le taux de traitements terminés sans intervention manuelle, suivi dans le temps", "Le nombre de couleurs de l'interface", "Le nombre d'outils installés", "La longueur du nom du workflow"], 0],
  ["Vrai ou faux : une automatisation qui envoie des réponses aux clients doit prévoir une possibilité de transfert vers un conseiller.", VF, 0],
];

const QCM_C5: Q[] = [
  ["En France, l'autorité de contrôle chargée de la protection des données personnelles est :", ["L'ANSSI", "La CNIL", "L'URSSAF", "La DGCCRF"], 1],
  ["Le règlement européen sur l'IA porte la référence :", ["Règlement (UE) 2024/1689", "Règlement (UE) 2016/679", "Directive (UE) 2019/790", "Règlement (UE) 2022/2065"], 0],
  ["Une entreprise qui utilise un système d'IA sous sa propre autorité dans le cadre de son activité professionnelle est, au sens du règlement sur l'IA :", ["Un fournisseur", "Un importateur", "Un déployeur", "Un distributeur"], 2],
  ["Les obligations applicables aux fournisseurs de modèles d'IA à usage général s'appliquent depuis :", ["Le 1er janvier 2024", "Le 25 mai 2018", "Le 2 février 2030", "Le 2 août 2025"], 3],
  ["La plupart des autres obligations du règlement sur l'IA étaient prévues, dans le texte adopté, à partir du :", ["2 août 2026", "1er août 2024", "2 février 2025", "31 décembre 2025"], 0],
  ["L'ANSSI a publié des recommandations portant sur :", ["La paie des salariés", "La sécurité des systèmes d'IA générative", "Le droit des contrats commerciaux", "La fiscalité des entreprises"], 1],
  ["Le secret des affaires impose, dans l'usage de l'IA :", ["De publier les prompts", "De partager les tarifs avec tous", "De ne pas saisir d'informations confidentielles dans un outil non autorisé", "De supprimer tous les documents"], 2],
  ["Un courriel reçu demande de « coller le contrat client dans cet assistant en ligne pour vérification urgente ». Claire :", ["S'exécute immédiatement", "Transfère le courriel à toute l'équipe", "Répond avec le contrat en pièce jointe", "Soupçonne un hameçonnage et vérifie auprès du service informatique"], 3],
  ["La charte d'usage de l'IA d'Arvelia Services prévoit notamment :", ["Les outils autorisés, les données interdites de saisie, la relecture obligatoire et le signalement des incidents", "La liste des salariés à sanctionner", "Le salaire des utilisateurs", "L'interdiction de toute formation"], 0],
  ["Vrai ou faux : l'usage d'un outil d'IA non autorisé par l'entreprise, à l'insu des responsables, fait peser des risques sur la confidentialité des données.", VF, 0],
];

const QCM_C6: Q[] = [
  ["Un cas d'usage à fort gain mais à risque élevé pour les données doit être :", ["Lancé immédiatement sans précaution", "Reporté ou encadré par des mesures de protection avant tout pilote", "Caché à la direction", "Confié à un outil public"], 1],
  ["Le gain de temps mensuel d'un cas d'usage s'estime à partir :", ["Du temps gagné par traitement, multiplié par le nombre de traitements, relecture déduite", "Du prix de l'outil uniquement", "Du nombre de salariés de l'entreprise", "De l'avis du fournisseur"], 0],
  ["Pour accompagner le changement, il est prioritaire de :", ["Imposer l'outil par courriel", "Interdire les questions", "Expliquer le pourquoi, former, écouter les craintes et valoriser les premiers résultats", "Mesurer la productivité individuelle de chacun"], 2],
  ["Un comité IA de l'entreprise réunit par exemple :", ["Uniquement des fournisseurs", "Uniquement des stagiaires", "Les clients", "La direction, des responsables métiers, l'informatique et la personne chargée de la protection des données"], 3],
  ["La première version de la charte d'usage de l'IA doit être :", ["Courte, claire, diffusée et revue régulièrement", "Un document de cent pages", "Confidentielle", "Définitive"], 0],
  ["Un critère pour arrêter un projet pilote est :", ["Le changement de saison", "Des gains insuffisants au regard des coûts ou des risques non maîtrisés", "La fin d'un abonnement d'essai uniquement", "Le départ en congé d'un collègue"], 1],
  ["Associer les représentants du personnel au déploiement de l'IA est utile car :", ["Cela retarde inutilement le projet", "Cela n'a aucun intérêt", "Les nouvelles technologies peuvent modifier les conditions de travail et l'information-consultation peut s'imposer", "Ils choisissent l'outil à la place de la direction"], 2],
  ["Le retour d'expérience après trois mois de pilote porte sur :", ["La couleur de l'outil", "Le nombre de réunions organisées", "Le nombre de comptes créés", "Les indicateurs, la satisfaction des utilisateurs, les incidents et les ajustements"], 3],
  ["La généralisation d'un cas d'usage à toute l'entreprise suppose :", ["Un bilan positif du pilote, une formation des utilisateurs et des règles écrites", "Un simple accord oral", "L'absence de mesure", "Un seul utilisateur convaincu"], 0],
  ["Vrai ou faux : le calcul du ROI d'un projet IA ne doit tenir compte que du prix de l'abonnement.", VF, 1],
];

export const IAE67_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Expliquer le fonctionnement, les apports et les limites de l'IA", QCM_C1),
  qcmExercice("QCM C2 — Rédiger des prompts efficaces et vérifier les productions", QCM_C2),
  qcmExercice("QCM C3 — Produire et analyser avec l'IA", QCM_C3),
  qcmExercice("QCM C4 — Automatiser des tâches et des processus métiers", QCM_C4),
  qcmExercice("QCM C5 — Respecter le cadre légal et éthique de l'IA", QCM_C5),
  qcmExercice("QCM C6 — Conduire un projet de déploiement de l'IA", QCM_C6),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (C1 à C6), alignées sur les 10 questions ouvertes de
 * positionnement de `iaEntreprise67hHumanized.ts` ; les 6 QCM par compétence ensuite.
 */
export const IAE67_EXERCICES_COMPLETS: AIContentExercise[] = [...IAE67_EXERCICES, ...IAE67_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Intelligence artificielle en entreprise » (9 chapitres, du jour 1 au jour 10)</strong> : cours détaillé, tableaux, modèles de prompts, exemples tirés du fil rouge de Claire et d'« Arvelia Services » (personnage et entreprise fictifs), encadrés « À retenir », quiz et cas pratiques corrigés.</li>
  <li><strong>Modèles de documents</strong> : bibliothèque de prompts par service, grille de vérification des productions, fiche d'automatisation, modèle de charte d'usage de l'IA, matrice de priorisation des cas d'usage, modèle de calcul du ROI, modèle de feuille de route IA du service.</li>
  <li><strong>QCM d'entraînement corrigés</strong> : 10 mises en situation au fil des jours et un QCM par compétence.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Classe virtuelle</strong> : Google Meet ou Zoom, avec partage d'écran, salles de sous-groupes, sondages et conversation écrite ; test de connexion proposé avant le premier jour.</li>
  <li><strong>Outils d'IA présentés de façon neutre</strong> : assistants conversationnels (ChatGPT, Claude, Gemini, Mistral Le Chat), assistants intégrés aux suites bureautiques (Microsoft 365 Copilot, Gemini pour Google Workspace), outils d'automatisation sans code (Power Automate, Make, Zapier, n8n) ; les démonstrations utilisent uniquement des données fictives.</li>
  <li><strong>Matériel du stagiaire</strong> : ordinateur avec caméra, micro et connexion Internet, suite bureautique avec tableur.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>EUR-Lex — règlement (UE) 2024/1689 sur l'intelligence artificielle</strong> : <a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj">https://eur-lex.europa.eu/eli/reg/2024/1689/oj</a> — texte officiel, articles 4 (maîtrise de l'IA), 5 (pratiques interdites) et 50 (transparence).</li>
  <li><strong>Commission européenne — cadre réglementaire de l'IA</strong> : <a href="https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai">https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai</a> — calendrier d'application et lignes directrices.</li>
  <li><strong>CNIL — intelligence artificielle</strong> : <a href="https://www.cnil.fr/fr/intelligence-artificielle">https://www.cnil.fr/fr/intelligence-artificielle</a> — recommandations pour concilier IA et RGPD.</li>
  <li><strong>ANSSI — cyber.gouv.fr</strong> : <a href="https://cyber.gouv.fr/">https://cyber.gouv.fr/</a> — recommandations de sécurité pour un système d'IA générative.</li>
  <li><strong>France Num</strong> : <a href="https://www.francenum.gouv.fr/">https://www.francenum.gouv.fr/</a> — initiative publique d'accompagnement des TPE et PME dans le numérique et l'IA.</li>
  <li><strong>Légifrance — Code de la propriété intellectuelle</strong> : <a href="https://www.legifrance.gouv.fr/">https://www.legifrance.gouv.fr/</a> — droit d'auteur et exception de fouille de textes et de données.</li>
</ul>`;

/**
 * Vidéos : uniquement des recherches YouTube déjà utilisées ailleurs dans le dépôt (formation IA 21 h).
 * Aucune vidéo précise imposée, aucun identifiant inventé.
 */
export const IAE67_VIDEOS = [
  { title: "Comment fonctionne une IA générative", description: "Recherche YouTube : grands modèles de langage, tokens et probabilités expliqués simplement.", url: "https://www.youtube.com/results?search_query=comment+fonctionne+une+IA+g%C3%A9n%C3%A9rative+grand+mod%C3%A8le+de+langage" },
  { title: "Les hallucinations de l'IA", description: "Recherche YouTube : pourquoi un outil d'IA peut inventer une information et comment vérifier.", url: "https://www.youtube.com/results?search_query=hallucinations+IA+g%C3%A9n%C3%A9rative+v%C3%A9rifier" },
  { title: "Bien rédiger un prompt", description: "Recherche YouTube : rôle, contexte, tâche, format et contraintes.", url: "https://www.youtube.com/results?search_query=bien+r%C3%A9diger+un+prompt+r%C3%B4le+contexte+t%C3%A2che+format" },
  { title: "Copilot dans Microsoft 365", description: "Recherche YouTube : Word, Excel, Outlook et Teams, premiers usages.", url: "https://www.youtube.com/results?search_query=Copilot+Microsoft+365+Word+Excel+Outlook+Teams+tutoriel" },
  { title: "Automatiser sans code", description: "Recherche YouTube : premiers scénarios avec Power Automate, Zapier ou Make.", url: "https://www.youtube.com/results?search_query=automatiser+sans+code+Power+Automate+Zapier+Make+d%C3%A9butant" },
  { title: "Droit d'auteur et contenus générés par l'IA", description: "Recherche YouTube : ce que l'on peut publier et les précautions à prendre.", url: "https://www.youtube.com/results?search_query=droit+d%27auteur+contenus+g%C3%A9n%C3%A9r%C3%A9s+par+IA" },
];

export const IAE67_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: IAE67_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: IAE67_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement de début et de fin (10 questions)
// ---------------------------------------------------------------------------
export const IAE67_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Qu'est-ce que l'apprentissage automatique ?", options: ["Un logiciel de bureautique", "Une méthode où un système apprend à partir de données", "Un robot de production", "Un réseau social"], correctIndex: 1 },
  { question: "Qu'appelle-t-on une « hallucination » d'un outil d'IA générative ?", options: ["Une réponse plausible mais fausse ou inventée", "Une panne de connexion", "Une image en couleur", "Une mise à jour"], correctIndex: 0 },
  { question: "Que doit préciser un bon prompt ?", options: ["Uniquement un mot-clé", "Le mot de passe de l'utilisateur", "Le rôle, le contexte, la tâche, le format et les contraintes", "Le nom de l'éditeur de l'outil"], correctIndex: 2 },
  { question: "Une réponse de l'IA contenant un chiffre précis doit être :", options: ["Diffusée telle quelle", "Arrondie", "Supprimée", "Vérifiée dans une source fiable"], correctIndex: 3 },
  { question: "À quoi sert un tableau croisé dynamique ?", options: ["À résumer des données selon plusieurs critères", "À envoyer des courriels", "À créer un visuel", "À chiffrer un fichier"], correctIndex: 0 },
  { question: "Dans un workflow d'automatisation, le déclencheur est :", options: ["Le résultat final", "L'événement qui lance l'automatisation", "Le nom de l'outil", "Le responsable informatique"], correctIndex: 1 },
  { question: "Quel texte encadre la protection des données personnelles dans l'Union européenne ?", options: ["Le Code de la route", "La directive Machines", "Le RGPD", "Le Code des marchés publics"], correctIndex: 2 },
  { question: "Le règlement européen sur l'IA classe les systèmes d'IA selon :", options: ["Leur prix", "Leur popularité", "Leur langue", "Leur niveau de risque"], correctIndex: 3 },
  { question: "Le retour sur investissement d'un projet compare :", options: ["Les gains obtenus aux coûts engagés", "Le nombre d'utilisateurs au nombre d'outils", "Les heures de réunion aux congés", "Le chiffre d'affaires au nombre de salariés"], correctIndex: 0 },
  { question: "Une charte d'usage de l'IA en entreprise précise notamment :", options: ["Le salaire des utilisateurs", "Les outils autorisés et les données à ne jamais saisir", "Le menu de la cantine", "La liste des clients"], correctIndex: 1 },
];

/** Explications du corrigé du positionnement, dans l'ordre des questions. */
export const IAE67_QCM_DEBUT_EXPLICATIONS: string[] = [
  "L'apprentissage automatique permet à un système d'apprendre des régularités à partir d'exemples plutôt que de règles écrites à la main (jour 1).",
  "Un modèle de langage produit la suite la plus probable : il peut affirmer avec assurance une information fausse, d'où la vérification systématique (jour 1).",
  "Rôle, contexte, tâche, format et contraintes structurent la demande et améliorent la qualité de la réponse (jour 3).",
  "L'utilisateur reste responsable de ce qu'il diffuse : les chiffres, les noms, les dates et les sources sont contrôlés dans une source fiable (jour 3).",
  "Le tableau croisé dynamique regroupe et résume des données ; l'IA peut aider à le construire, mais les totaux sont contrôlés (jour 5).",
  "Un workflow comprend un déclencheur, des actions et éventuellement des conditions, avec des points de validation humaine (jour 6).",
  "Le règlement (UE) 2016/679, dit RGPD, s'applique dès que des données personnelles sont traitées, y compris dans un outil d'IA (jour 7).",
  "Le règlement (UE) 2024/1689 suit une approche par les risques : pratiques interdites, systèmes à haut risque, obligations de transparence, risque minimal (jour 7).",
  "Le ROI rapporte les gains nets aux coûts, sur une période donnée, en comptant aussi le temps de formation, de relecture et de suivi (jour 8).",
  "La charte d'usage fixe les outils autorisés, les données interdites de saisie, la relecture obligatoire et le signalement des incidents (jours 7 et 8).",
];

export const IAE67_QCM_FIN: AIQCMQuestion[] = [
  { question: "Un grand modèle de langage produit sa réponse :", options: ["En prédisant la suite de texte la plus probable", "En consultant une base de vérités", "En recopiant une page web précise", "En appelant un opérateur"], correctIndex: 0 },
  { question: "Un biais d'un système d'IA provient souvent :", options: ["De la taille de l'écran", "De la vitesse du réseau", "Des données d'entraînement déséquilibrées", "Du nombre d'utilisateurs"], correctIndex: 2 },
  { question: "Le prompt itératif consiste à :", options: ["Poser une seule question", "Améliorer la réponse par des demandes successives de précision", "Changer d'outil à chaque fois", "Copier la première réponse"], correctIndex: 1 },
  { question: "Avant d'analyser un fichier clients avec l'IA, il faut :", options: ["Le publier en ligne", "Ajouter les numéros de téléphone", "Le transmettre à un outil public", "Retirer ou pseudonymiser les données personnelles"], correctIndex: 3 },
  { question: "Le principe de contrôle humain d'une automatisation signifie :", options: ["Qu'une personne compétente peut vérifier, corriger ou arrêter le traitement", "Que l'outil décide seul", "Que personne ne regarde les résultats", "Que l'éditeur seul intervient"], correctIndex: 0 },
  { question: "Depuis le 2 février 2025, le règlement européen sur l'IA rend applicables :", options: ["Toutes ses obligations", "Aucune obligation", "Les pratiques interdites et l'obligation de maîtrise de l'IA", "Uniquement les sanctions"], correctIndex: 2 },
  { question: "Au sens du règlement sur l'IA, une entreprise qui utilise un système d'IA dans son activité est :", options: ["Un fournisseur", "Un déployeur", "Un importateur", "Un distributeur"], correctIndex: 1 },
  { question: "L'injection de prompt est :", options: ["Une méthode de rédaction", "Une sauvegarde", "Une mise à jour", "Une instruction malveillante cachée dans un contenu, qui détourne l'outil"], correctIndex: 3 },
  { question: "Une matrice de priorisation des cas d'usage croise :", options: ["La valeur, la faisabilité et le risque", "Le prix et la couleur des outils", "L'âge et le prénom des salariés", "Le nombre de réunions"], correctIndex: 0 },
  { question: "Un projet pilote sert à :", options: ["Généraliser immédiatement", "Tester sur un périmètre limité et mesurer avant de généraliser", "Éviter toute mesure", "Remplacer la charte d'usage"], correctIndex: 1 },
];

export const IAE67_EVAL_PACK: AIEvalPack = {
  qcmDebut: IAE67_QCM_DEBUT,
  qcmFin: IAE67_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du jour 5) — premiers usages de l'IA au service relation client d'Arvelia Services, cas fictif",
    contexte:
      "Claire, directrice des opérations d'« Arvelia Services » (personnage et entreprise fictifs), découvre qu'un conseiller du service relation client colle les réclamations des clients, avec leurs noms et coordonnées, dans un assistant d'IA gratuit pour rédiger ses réponses, qu'il envoie sans les relire. Une réponse a annoncé à un client un délai d'intervention de 24 heures qui n'existe dans aucun contrat. Claire veut aussi un tableau de synthèse mensuel des réclamations par motif.",
    questions: [
      { question: "Expliquez à l'équipe pourquoi l'outil a pu annoncer un délai inexistant.", reponseAttendue: "Un modèle de langage produit la suite de texte la plus probable ; sans accès aux contrats d'Arvelia Services, il peut inventer un délai plausible : c'est une hallucination. Ses réponses ne sont pas des faits vérifiés ; la relecture humaine reste obligatoire.", points: 5 },
      { question: "Rédigez un prompt structuré pour obtenir un brouillon de réponse à une réclamation.", reponseAttendue: "Rôle (conseiller du service client d'une entreprise de maintenance), contexte (réclamation anonymisée, engagements de service réels fournis), tâche (proposer une réponse empathique), format (10 lignes, ton professionnel, propositions d'actions), contraintes (ne rien promettre qui ne figure pas dans les éléments fournis, signaler les informations manquantes).", points: 5 },
      { question: "Quelles règles de vérification et de protection des données mettez-vous en place ?", reponseAttendue: "Retirer noms, coordonnées et références client avant toute saisie, ou utiliser l'outil autorisé par l'entreprise ; vérifier délais, prix et engagements dans les contrats ; relecture par le conseiller avant envoi ; grille de vérification ; signalement des erreurs.", points: 5 },
      { question: "Comment construisez-vous le tableau de synthèse mensuel des réclamations par motif ?", reponseAttendue: "Fichier anonymisé et nettoyé ; regroupement des réclamations par motif avec l'aide de l'IA ou d'un tableau croisé dynamique ; contrôle sur un échantillon ; indicateurs (nombre par motif, délai moyen de traitement) avec leur définition et leur période ; commentaire distinguant faits et interprétations.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne (jour 10) — présentation de la feuille de route IA du service et étude de cas, grille d'acquisition des compétences C1 à C6",
    exercices: [
      {
        titre: "Partie 1 — Expliquer l'IA et ses limites à son équipe (C1)",
        consigne: "En ouverture de votre présentation, expliquez en cinq minutes à l'équipe de votre service ce qu'est l'IA générative, ce qu'elle apporte et ses limites, avec un exemple tiré de votre métier.",
        reponseAttendue: "Notions justes : apprentissage automatique, IA générative, grand modèle de langage qui prédit du texte probable ; apports réalistes (premiers jets, synthèses, reformulations) ; limites (hallucinations, biais, données datées, confidentialité) ; exemple concret du métier. Grille : acquis si l'explication est juste et adaptée au public ; en cours d'acquisition si une limite essentielle manque ; non acquis si l'outil est présenté comme infaillible.",
        points: 15,
      },
      {
        titre: "Partie 2 — Prompts et vérification (C2) ; produire et analyser (C3)",
        consigne: "Présentez deux prompts de votre bibliothèque (une tâche de rédaction et une tâche d'analyse de données), le résultat obtenu sur des données fictives et les vérifications effectuées.",
        reponseAttendue: "Prompts structurés (rôle, contexte, tâche, format, contraintes) et itérés ; production de qualité adaptée au destinataire ; analyse de données avec contrôle des calculs et des totaux ; grille de vérification appliquée ; temps gagné estimé relecture comprise. Grille : acquis, en cours d'acquisition ou non acquis selon la structure des prompts, la qualité des productions et la rigueur des vérifications.",
        points: 25,
      },
      {
        titre: "Partie 3 — Automatiser un processus du service (C4)",
        consigne: "Présentez la fiche d'automatisation d'un processus de votre service : déclencheur, étapes, outils, données, points de validation humaine, gestion des erreurs et indicateur de suivi.",
        reponseAttendue: "Processus répétitif et bien choisi ; workflow cohérent ; droits limités au nécessaire ; validation humaine avant toute action vers un client ou toute décision ; alerte et reprise manuelle en cas d'erreur ; journalisation ; indicateur de suivi. Grille : acquis si le contrôle humain et la gestion des erreurs sont prévus ; en cours d'acquisition si un élément manque ; non acquis sans contrôle humain.",
        points: 20,
      },
      {
        titre: "Partie 4 — Cadre légal et éthique, charte d'usage (C5)",
        consigne: "Pour les cas d'usage de votre feuille de route, présentez les règles de conformité et les articles de la charte d'usage du service.",
        reponseAttendue: "RGPD : finalité, minimisation, information, sécurité, outil autorisé ; règlement (UE) 2024/1689 : rôle de déployeur, obligation de maîtrise de l'IA, transparence vis-à-vis des clients, calendrier à suivre dans les sources officielles ; propriété intellectuelle des contenus générés ; secret des affaires ; risques de cybersécurité ; charte : outils autorisés, données interdites, relecture, signalement. Grille : acquis, en cours d'acquisition ou non acquis selon la justesse et la complétude des règles.",
        points: 20,
      },
      {
        titre: "Partie 5 — Feuille de route IA du service : priorisation, ROI et conduite du changement (C6)",
        consigne: "Présentez votre feuille de route : diagnostic, cas d'usage priorisés, projet pilote, indicateurs et calcul du ROI, plan d'accompagnement de l'équipe et gouvernance.",
        reponseAttendue: "Diagnostic clair ; cas d'usage priorisés selon la valeur, la faisabilité et le risque ; pilote limité et daté ; indicateurs avant et après ; ROI calculé avec tous les coûts (outil, formation, paramétrage, relecture, suivi) ; plan d'accompagnement (communication, formation, ambassadeurs, écoute des craintes) ; gouvernance et revue régulière. Grille : acquis, en cours d'acquisition ou non acquis selon la cohérence et le réalisme de la feuille de route.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const IAE67_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
      titreLien: "EUR-Lex — règlement (UE) 2024/1689 sur l'intelligence artificielle",
      titre: "Règlement européen sur l'IA : pratiques interdites et obligation de maîtrise de l'IA applicables depuis le 2 février 2025",
      date: "Février 2025",
      commentaire: "Entré en vigueur le 1er août 2024, le règlement s'applique par étapes : pratiques interdites (article 5) et obligation de maîtrise de l'IA (article 4) depuis le 2 février 2025, obligations des modèles d'IA à usage général depuis le 2 août 2025, la majorité des autres obligations étant prévues au 2 août 2026 dans le texte adopté. Les entreprises qui utilisent des outils d'IA dans leur activité sont en général « déployeurs » ; l'article 4 leur demande de prendre des mesures pour assurer un niveau suffisant de maîtrise de l'IA de leur personnel.",
      exploitation: "Preuve : fiche mémo datée archivée au dossier qualité. Action : mise à jour du chapitre 7, du QCM 8 et du QCM C5 ; la formation est présentée aux employeurs comme une mesure contribuant à la maîtrise de l'IA de leur personnel.",
    },
    {
      lien: "https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai",
      titreLien: "Commission européenne — cadre réglementaire de l'IA",
      titre: "Propositions de simplification de fin 2025 : report envisagé de certaines échéances du règlement sur l'IA",
      date: "Novembre 2025",
      commentaire: "La Commission a proposé fin 2025 de simplifier plusieurs textes du numérique et de décaler certaines échéances du règlement sur l'IA, notamment pour les systèmes à haut risque. Il s'agit de propositions soumises au processus législatif : aucune nouvelle date n'est présentée comme définitive tant que le texte modificatif n'est pas adopté et publié au Journal officiel de l'Union européenne.",
      exploitation: "Preuve : note de veille datée avec l'état de la procédure. Action : vérification avant chaque session et actualisation du calendrier présenté au jour 7.",
    },
    {
      lien: "https://www.cnil.fr/fr/intelligence-artificielle",
      titreLien: "CNIL — intelligence artificielle",
      titre: "Recommandations de la CNIL pour concilier IA et RGPD",
      date: "Mars 2025",
      commentaire: "Fiches pratiques et recommandations de la CNIL sur la conception et l'usage des systèmes d'IA : finalité, base légale, minimisation, information des personnes, sécurité, exercice des droits. Elles servent de référence pour les règles de saisie des données dans les outils et pour les automatisations traitant des données personnelles.",
      exploitation: "Preuve : extrait archivé. Action : mise à jour de la check-list « données » du chapitre 7 et du modèle de charte d'usage.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — Code de la propriété intellectuelle",
      titre: "Droit d'auteur et contenus générés : originalité, fouille de textes et de données",
      date: "Avril 2025",
      commentaire: "Le droit d'auteur protège les œuvres de l'esprit originales ; la protection d'un contenu produit sans apport créatif humain reste incertaine. L'exception de fouille de textes et de données issue de la directive (UE) 2019/790 permet aux titulaires de droits de s'y opposer. Les stagiaires apprennent à vérifier les conditions d'utilisation des outils et à éviter de reproduire des œuvres protégées.",
      exploitation: "Preuve : synthèse archivée. Action : mise à jour des précautions sur les visuels du chapitre 4 et de l'article « contenus » de la charte d'usage.",
    },
    {
      lien: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
      titreLien: "EUR-Lex — règlement (UE) 2016/679, RGPD",
      titre: "RGPD : sous-traitants, transferts hors de l'Union et outils d'IA en ligne",
      date: "Mai 2025",
      commentaire: "L'usage d'un outil d'IA en ligne traitant des données personnelles fait de l'éditeur un sous-traitant ou un tiers : contrat conforme, localisation des données, encadrement des transferts hors de l'Union, information des personnes et registre des traitements sont vérifiés avant toute adoption.",
      exploitation: "Preuve : note de veille. Action : mise à jour des critères de choix d'un outil du chapitre 2 et de la fiche d'automatisation du chapitre 6.",
    },
  ],
  metier: [
    {
      lien: "https://www.francenum.gouv.fr/",
      titreLien: "France Num",
      titre: "Usages de l'IA dans les TPE et PME : guides et retours d'expérience",
      date: "Juin 2025",
      commentaire: "Guides pratiques et témoignages d'entreprises sur les usages de l'IA générative (rédaction, relation client, gestion, marketing) ; les chiffres d'adoption éventuellement cités en formation sont toujours datés et sourcés.",
      exploitation: "Preuve : extrait daté. Action : actualisation des cas d'usage par métier du chapitre 2 et des exemples du chapitre 8.",
    },
    {
      lien: "https://www.bpifrance.fr/",
      titreLien: "Bpifrance",
      titre: "Dirigeants de PME et intelligence artificielle : études et outils d'accompagnement",
      date: "Septembre 2025",
      commentaire: "Études et contenus d'accompagnement sur l'appropriation de l'IA par les dirigeants de PME, leurs freins et leurs priorités ; utilisés pour contextualiser la priorisation des cas d'usage et la conduite du changement.",
      exploitation: "Preuve : note de veille. Action : ajustement de la matrice de priorisation et du plan d'accompagnement du chapitre 8.",
    },
    {
      lien: "https://www.francetravail.fr/",
      titreLien: "France Travail",
      titre: "Compétences liées à l'IA demandées dans les offres d'emploi administratives, commerciales et support",
      date: "Octobre 2025",
      commentaire: "Relevé des compétences liées aux outils d'IA demandées dans les offres d'emploi des fonctions administratives, commerciales, marketing et support, pour relier les objectifs de la formation aux attentes du marché du travail.",
      exploitation: "Preuve : extraction datée. Action : ajustement des exemples de tâches et du plan d'action individuel de fin de formation.",
    },
  ],
  technologique: [
    {
      lien: "https://cyber.gouv.fr/",
      titreLien: "ANSSI — cyber.gouv.fr",
      titre: "Recommandations de sécurité pour un système d'IA générative",
      date: "Février 2025",
      commentaire: "L'ANSSI a publié des recommandations de sécurité pour les systèmes d'IA générative : maîtrise des données saisies, cloisonnement, droits d'accès, journalisation, risques d'injection de prompt et de fuite d'informations. Elles servent de référence pour les automatisations et les agents présentés en formation.",
      exploitation: "Preuve : extrait archivé. Action : mise à jour des règles de sécurité du chapitre 6 et du chapitre 7.",
    },
    {
      lien: "https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai",
      titreLien: "Commission européenne — modèles d'IA à usage général",
      titre: "Modèles d'IA à usage général : obligations applicables depuis le 2 août 2025 et code de bonnes pratiques",
      date: "Août 2025",
      commentaire: "Les obligations des fournisseurs de modèles d'IA à usage général s'appliquent depuis le 2 août 2025 (documentation technique, politique en matière de droit d'auteur, résumé des contenus d'entraînement) ; un code de bonnes pratiques a été publié par la Commission. Ces obligations pèsent sur les fournisseurs, mais aident les entreprises utilisatrices à choisir leurs outils.",
      exploitation: "Preuve : note de veille datée. Action : ajout d'un critère « documentation du fournisseur » dans la grille de choix d'un outil du chapitre 2.",
    },
    {
      lien: "https://www.francenum.gouv.fr/",
      titreLien: "France Num — outils numériques",
      titre: "Assistants intégrés aux suites bureautiques et agents : nouvelles fonctions à évaluer",
      date: "Octobre 2025",
      commentaire: "Les éditeurs de suites bureautiques intègrent des assistants d'IA et des agents capables d'enchaîner des actions. Les fonctions évoluent rapidement : la formation présente les principes communs (droits d'accès, contrôle humain, journalisation) plutôt qu'un menu figé, et chaque démonstration est vérifiée avant la session.",
      exploitation: "Preuve : fiche de veille datée. Action : mise à jour des démonstrations des jours 2 et 6.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedIAE67AICaches(f: FormationInfo = FORMATION_IAE67): void {
  try {
    setCachedContentPack(f, IAE67_CONTENT_PACK);
    setCachedEvalPack(f, IAE67_EVAL_PACK);
    setCachedVeillePack(f, IAE67_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
