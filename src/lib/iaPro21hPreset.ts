/**
 * Preset complet « Intelligence artificielle : intégrer les outils d'IA dans son activité professionnelle – 21 h »
 * — formation professionnelle continue NON certifiante (catégorie « autres formations professionnelles »
 * du BPF) : salariés et dirigeants de TPE/PME, financement par l'employeur au titre du plan de
 * développement des compétences (prise en charge OPCO possible selon ses critères), présentiel.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - Formation 21 h (3 jours de 7 h) : J1 accueil, positionnement, C1 fonctionnement et limites de l'IA
 *    générative puis C2 bases du prompt ; J2 C2 avancé et C3 contenus professionnels vérifiés ;
 *    J3 C4 intégration et automatisation, C5 usage responsable et conforme, évaluation finale et bilan
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées (diagnostic de départ puis
 *    C1 à C5) et 5 QCM de 10 questions, un par compétence
 *  - Pack évaluation : QCM de positionnement début / fin, cas intermédiaire, évaluation finale
 *    interne (mise en situation complète observée avec grille + QCM de fin)
 *  - Pack veille (réglementaire / métier / technologique)
 * Fil rouge : Thermia Rénov, PME FICTIVE de rénovation énergétique (Saint-Genis-Laval, 14 salariés) ;
 * tous ses chiffres sont fictifs. Les outils sont cités sans prix : leurs offres et leurs conditions
 * d'utilisation changent souvent et se vérifient sur le site de chaque éditeur.
 * Les réponses propres à chaque stagiaire sont dans `iaPro21hHumanized.ts`.
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
export const FORMATION_IAP21: FormationInfo = {
  intitule: "Intelligence artificielle : intégrer les outils d'IA dans son activité professionnelle – 21 h",
  codeRNCP: "",
  objectifs:
    "Formation professionnelle non certifiante. Objectif général : utiliser les outils d'intelligence artificielle générative dans son activité professionnelle de façon efficace, vérifiée et responsable, pour gagner du temps sur les tâches d'écriture, de synthèse, d'analyse et d'organisation, sans exposer les données de l'entreprise ni de ses clients.\nÀ l'issue de la formation, le/la stagiaire sera capable de :\n- C1 — Comprendre le fonctionnement, les possibilités et les limites de l'IA générative : intelligence artificielle, apprentissage automatique, grands modèles de langage, tokens, contexte, probabilités, hallucinations, biais, date de connaissance, IA connectées au web, multimodalité, panorama des outils et cas d'usage en TPE/PME.\n- C2 — Rédiger des requêtes (prompts) efficaces et améliorer les réponses par itération : structure Rôle / Contexte / Tâche / Format / Contraintes, exemples, étapes, reformulation, critique, bibliothèque de prompts, assistants personnalisés.\n- C3 — Produire et vérifier des contenus professionnels avec l'IA : mails clients, courriers, comptes rendus, synthèses de documents, FAQ, contenus pour les réseaux sociaux, visuels, tableaux et données ; relecture, vérification des faits, des chiffres et des sources, du ton et des mentions obligatoires, sans jamais de promesse commerciale inventée.\n- C4 — Intégrer l'IA dans ses processus de travail et automatiser des tâches simples : cartographie des tâches, choix des tâches où l'IA apporte un gain, Copilot dans Word, Excel, Outlook et Teams, formules et analyses dans un tableur, transcription de réunions, automatisations sans code, mesure du temps gagné, plan d'action.\n- C5 — Utiliser l'IA de façon responsable et conforme à la réglementation : RGPD et données personnelles, secret des affaires et confidentialité, recommandations de la CNIL, règlement européen sur l'IA (UE) 2024/1689 et son calendrier d'application, droit d'auteur et contenus générés, transparence vis-à-vis des clients, charte d'usage interne, impact environnemental, éthique et biais.",
  prerequis:
    "Utilisation courante d'un ordinateur, d'un navigateur internet et d'une messagerie électronique ; maîtrise du français écrit. Aucune connaissance technique en intelligence artificielle n'est requise.",
  duree: "21 heures (3 jours de 7 h)",
  modalites: "présentiel",
  tarif: "455 € HT par stagiaire",
  programme:
    "JOUR 1 — ACCUEIL ET POSITIONNEMENT · C1 : COMPRENDRE L'IA GÉNÉRATIVE · C2 : BASES DU PROMPT (7 h)\nMatin : accueil, présentation des objectifs et du déroulé, analyse des besoins, QCM de positionnement. C1 : de l'intelligence artificielle à l'IA générative ; apprentissage automatique et grands modèles de langage ; tokens, fenêtre de contexte et probabilités ; hallucinations, biais et date de connaissance ; IA connectées au web et IA multimodales ; panorama des outils (ChatGPT, Microsoft Copilot, Google Gemini, Le Chat de Mistral AI, Claude, Perplexity, fonctions IA de Canva, outils d'automatisation sans code) et cas d'usage en TPE/PME. Mises en situation : diagnostic de ses usages ; analyser une réponse fausse ; choisir l'outil adapté à chaque besoin de Thermia Rénov.\nAprès-midi : C2 : anatomie d'une requête efficace (Rôle / Contexte / Tâche / Format / Contraintes), exemples et étapes, ateliers de réécriture de requêtes. Mise en situation : structurer une requête.\n\nJOUR 2 — C2 AVANCÉ · C3 : PRODUIRE ET VÉRIFIER DES CONTENUS PROFESSIONNELS (7 h)\nMatin : itération, reformulation et autocritique ; faire poser des questions par l'IA ; bibliothèque de prompts ; assistants personnalisés. C3 : mails clients, courriers, comptes rendus, contenus pour les réseaux sociaux ; ton, mentions, relecture. Mises en situation : améliorer une réponse par itération et constituer la bibliothèque de prompts ; produire quatre écrits professionnels.\nAprès-midi : C3 : synthèse de documents et FAQ, visuels, tableaux et données ; vérification des faits, des chiffres et des sources ; aucune promesse commerciale inventée. Mise en situation : synthétiser, illustrer, analyser des données et vérifier. Cas pratique intermédiaire.\n\nJOUR 3 — C4 : INTÉGRER ET AUTOMATISER · C5 : USAGE RESPONSABLE ET CONFORME · ÉVALUATION FINALE (7 h)\nMatin : C4 : cartographie des tâches, matrice fréquence / gain / risque ; Copilot dans Word, Excel, Outlook et Teams ; formules et analyses dans un tableur ; transcription de réunions ; automatisations sans code (Power Automate, Zapier, Make) ; mesure du temps gagné. Mises en situation : cartographier ses tâches et intégrer l'IA dans ses outils ; automatiser une tâche simple et bâtir son plan d'action.\nAprès-midi : C5 : RGPD et données personnelles, secret des affaires, recommandations de la CNIL ; règlement européen sur l'IA (entrée en vigueur le 1er août 2024, interdictions et obligation de maîtrise de l'IA depuis le 2 février 2025, obligations des modèles d'IA à usage général depuis le 2 août 2025, obligations de transparence et la plupart des autres obligations à partir du 2 août 2026) ; droit d'auteur, transparence envers les clients, impact environnemental, biais ; charte d'usage interne. Mise en situation : rédiger la charte d'usage de Thermia Rénov. Évaluation finale interne (mise en situation complète observée avec grille + QCM de fin), bilan, plan d'action individuel et questionnaire de satisfaction à chaud.",
  methodesEvaluation:
    "Analyse des besoins et test de positionnement à l'entrée (10 questions ouvertes + QCM 10 questions), mises en situation tout au long de la formation (10 mises en situation corrigées : diagnostic de départ puis C1 à C5), un quiz de 10 questions par compétence, cas pratique intermédiaire à la fin du jour 2, test de positionnement de fin (10 questions ouvertes + QCM 10 questions). Évaluation finale interne le jour 3 : mise en situation professionnelle complète observée par le formateur avec grille d'évaluation par compétence (requêtes, contenus produits et vérifiés, intégration dans un processus, règles de conformité appliquées) et QCM de fin. Formation non certifiante : attestation de fin de formation mentionnant les objectifs, la nature, la durée et les résultats de l'évaluation des acquis. Questionnaires de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Formation en présentiel, en salle, dans les locaux de l'organisme ou de l'entreprise cliente : vidéoprojecteur, paperboard, connexion internet, un poste informatique connecté par stagiaire ; démonstrations et ateliers sur des outils d'IA générative en version gratuite ou professionnelle (ChatGPT, Microsoft Copilot, Google Gemini, Le Chat de Mistral AI, Claude, Perplexity, fonctions IA de Canva, Power Automate, Zapier ou Make), avec rappel systématique des conditions d'utilisation et du paramétrage de confidentialité ; support de cours remis à chaque stagiaire, cahier d'exercices et corrigés, modèles (trame de requête, fiche de bibliothèque de prompts, check-list de vérification, matrice des tâches, fiche d'automatisation, trame de charte d'usage, plan d'action individuel) ; travail sur le cas fil rouge Thermia Rénov (entreprise fictive) puis sur des documents anonymisés des stagiaires ; feuilles d'émargement papier signées par demi-journée. Groupe de 4 à 8 personnes. Suivi par mail après la formation pour la mise en œuvre du plan d'action.",
  publicVise:
    "Salariés et dirigeants de TPE/PME, en particulier du bâtiment et de la rénovation énergétique : commerciaux, assistants administratifs, conducteurs de travaux, chargés d'affaires, dirigeants. Formation financée par l'employeur au titre du plan de développement des compétences, avec une prise en charge possible par son OPCO selon les critères de celui-ci (convention de formation avec l'entreprise).",
  delaiAcces: "14 jours après signature de la convention de formation avec l'entreprise, sous réserve de places disponibles.",
  dateDebut: "2026-09-28",
  dateFin: "2026-09-30",
  lieu: "",
  nombreParticipants: "8",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Comprendre comment fonctionne un outil d'IA générative pour savoir quand lui faire confiance et quand vérifier.",
  "Choisir le bon outil selon la tâche (rédaction, synthèse, recherche sourcée, visuel, tableur, automatisation) parmi une offre foisonnante.",
  "Rédiger des requêtes précises au lieu de questions vagues qui donnent des réponses génériques.",
  "Gagner du temps sur les mails clients, les courriers et les comptes rendus de chantier sans perdre en qualité.",
  "Résumer des documents longs (guides, réglementations, cahiers des charges) et en vérifier l'exactitude.",
  "Produire des contenus pour les réseaux sociaux et des visuels simples dans le respect du droit d'auteur.",
  "Exploiter un tableur avec l'aide de l'IA : formules, tableaux de suivi, analyse des devis.",
  "Automatiser des tâches répétitives simples (demandes entrantes, relances, classement) sans compétence en programmation.",
  "Savoir quelles données de l'entreprise et des clients peuvent ou non être saisies dans un outil d'IA (RGPD, secret des affaires).",
  "Connaître les obligations du règlement européen sur l'IA qui concernent une TPE/PME et se doter d'une charte d'usage interne.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins conduite avec l'entreprise employeur et avec chaque stagiaire (entretien préalable, test de positionnement, inventaire des tâches et des usages actuels) fait apparaître un groupe de salariés et de dirigeants de TPE/PME aux profils variés : commerciaux, assistants administratifs, conducteurs de travaux, chargés d'affaires et dirigeants, la plupart issus du bâtiment et de la rénovation énergétique. Les usages de départ vont de l'absence totale d'utilisation à un usage personnel régulier mais non encadré. Trois besoins sont partagés par la quasi-totalité du groupe.</p>
<ul>
  <li><strong>Comprendre pour bien utiliser (C1, C2)</strong> : les stagiaires attribuent souvent à l'IA une fiabilité qu'elle n'a pas ; les requêtes sont courtes et vagues, les réponses jugées « trop générales » et peu retravaillées.</li>
  <li><strong>Produire plus vite sans perdre en qualité (C3, C4)</strong> : mails, courriers, comptes rendus, devis et tableaux de suivi prennent une part importante du temps ; les gains possibles sont réels mais la vérification des chiffres, des faits et du ton est rarement faite.</li>
  <li><strong>Utiliser l'IA en conformité (C5)</strong> : des données de clients ou des documents internes ont déjà été copiés dans des outils grand public ; les règles du RGPD, le secret des affaires et le calendrier du règlement européen sur l'IA sont mal connus ; aucune entreprise du groupe n'a de charte d'usage.</li>
</ul>
<p>Les employeurs attendent en complément un gain de temps mesurable sur les tâches administratives et commerciales, des écrits plus homogènes et des règles claires sur les données ; les stagiaires souhaitent repartir avec des requêtes prêtes à l'emploi, une méthode de vérification et un plan d'action applicable dès leur retour en poste.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Documents réels anonymisés</strong> : les mises en situation sont réalisées sur le cas fil rouge Thermia Rénov (entreprise fictive) puis transposées sur un document réel de chaque stagiaire, préalablement anonymisé (aucun nom, adresse, téléphone ni chiffre confidentiel) ; elles alimentent l'évaluation finale du jour 3.</li>
  <li><strong>Débutants</strong> : prise en main guidée de l'interface d'un outil le premier matin, binôme avec un stagiaire plus à l'aise, fiches pas à pas.</li>
  <li><strong>Utilisateurs réguliers</strong> : ateliers avancés sur l'itération, les assistants personnalisés et les automatisations sans code.</li>
  <li><strong>Postes de terrain (conducteurs de travaux, commerciaux)</strong> : usages sur smartphone, dictée et transcription des notes de chantier ou de rendez-vous.</li>
  <li><strong>Comptes et outils</strong> : travail sur les outils et les comptes professionnels déjà fournis par l'employeur quand ils existent, sinon sur des versions gratuites avec paramétrage de confidentialité vérifié en début de séance ; aucune donnée réelle non anonymisée n'est saisie.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, salle accessible aux personnes à mobilité réduite, supports remis à l'avance et en version numérique, taille d'affichage et lecteur d'écran sur demande, temps majoré pour les exercices.</li>
</ul>`;

/** 10 mises en situation (diagnostic de départ puis C1 à C5), corrigés formateur. */
export const IAP21_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — Diagnostic de départ : mes tâches et mes usages actuels de l'IA",
    consigne:
      "Pour votre poste (ou, à défaut, celui de Julie, assistante administrative chez Thermia Rénov, PME fictive de rénovation énergétique de 14 salariés à Saint-Genis-Laval) : 1. Listez vos 10 tâches les plus fréquentes et le temps hebdomadaire estimé pour chacune. 2. Indiquez les outils d'IA que vous avez déjà utilisés, pour quoi faire et avec quel compte (personnel, gratuit, professionnel). 3. Décrivez une utilisation réussie et une déception, en expliquant pourquoi. 4. Indiquez quelles données vous avez déjà saisies dans un outil d'IA (noms de clients, chiffres, documents internes) et si l'entreprise a fixé des règles. 5. Concluez par 3 forces, 3 points de vigilance et 3 priorités pour les trois jours de formation.",
    reponseAttendue:
      "Tâches listées de façon concrète, avec un temps estimé réaliste (ex. : mails clients 4 h, comptes rendus 2 h, relances de devis 1 h 30, mise à jour de tableaux 2 h par semaine).\nOutils cités avec leur usage et le type de compte ; distinction faite entre compte personnel gratuit et compte professionnel fourni par l'employeur.\nAnalyse d'une réussite et d'une déception reliée à une cause identifiable (requête vague, absence de contexte, information fausse non vérifiée).\nInventaire honnête des données déjà saisies ; repérage des situations à risque (données personnelles de clients, chiffres confidentiels) et constat de l'absence ou de l'existence de règles internes.\nForces, points de vigilance et priorités tirés des constats et reliés aux compétences C1 à C5.\nBarème : tâches 5, outils 4, réussite et déception 3, données 4, conclusion 4.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C1 : comprendre pourquoi une IA se trompe",
    consigne:
      "Karim, commercial chez Thermia Rénov, a demandé à un assistant conversationnel : « Donne-moi le montant exact de l'aide pour une pompe à chaleur et la référence du texte officiel. » La réponse cite un montant précis, une référence de texte et un lien qui n'existent pas. 1. Expliquez simplement comment un grand modèle de langage produit une réponse (apprentissage sur de grands volumes de textes, tokens, probabilités, fenêtre de contexte). 2. Expliquez pourquoi la réponse de Karim est fausse (hallucination, date de connaissance, absence d'accès au web, question qui appelle une donnée qui change souvent). 3. Distinguez : intelligence artificielle, apprentissage automatique, IA générative, moteur de recherche, IA connectée au web. 4. Donnez deux exemples de biais possibles dans une réponse d'IA. 5. Rédigez 5 règles de vérification pour l'équipe.",
    reponseAttendue:
      "Fonctionnement : le modèle a été entraîné sur de très grands volumes de textes ; il découpe le texte en tokens (morceaux de mots) et prédit, token après token, la suite la plus probable compte tenu du contexte fourni (la requête, la conversation, les documents joints, dans la limite de la fenêtre de contexte) ; il ne « sait » pas, il calcule une suite plausible.\nCauses de l'erreur : hallucination (production d'une information plausible mais inventée, y compris des références et des liens) ; date de connaissance (le modèle ignore les changements postérieurs à son entraînement) ; pas de recherche sur le web dans ce mode ; donnée réglementaire qui évolue souvent et doit être lue à la source officielle.\nDistinctions : l'IA est le domaine général ; l'apprentissage automatique est la méthode qui fait apprendre un système à partir de données ; l'IA générative produit du texte, des images ou du son ; un moteur de recherche renvoie vers des pages existantes ; une IA connectée au web recherche des pages puis les résume en citant ses sources, qu'il faut ouvrir et lire.\nBiais : surreprésentation de certaines sources ou d'une langue, stéréotypes (métiers associés à un genre), réponses calées sur un contexte étranger (droit d'un autre pays).\nRègles : ne jamais reprendre un chiffre, une date ou un texte de loi sans l'avoir vérifié à la source officielle ; ouvrir chaque lien cité ; demander à l'outil ses sources et ses incertitudes ; croiser avec une deuxième source ; faire relire par un humain compétent avant tout envoi.\nBarème : fonctionnement 5, causes 5, distinctions 4, biais 2, règles 4.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C1 : choisir le bon outil pour chaque cas d'usage",
    consigne:
      "Sandrine MOREL, dirigeante de Thermia Rénov, veut savoir quel type d'outil utiliser pour 8 besoins : a. répondre à un mail de client mécontent ; b. obtenir le compte rendu d'une réunion d'équipe sur Teams ; c. faire une veille sourcée sur une évolution réglementaire ; d. créer un visuel pour un post sur un chantier d'isolation ; e. analyser un tableau de 60 devis ; f. transcrire les notes vocales de Thomas, conducteur de travaux ; g. résumer un guide officiel de 40 pages ; h. enregistrer automatiquement chaque demande du formulaire du site dans un tableau. Pour chaque besoin : 1. type d'outil (assistant conversationnel, assistant intégré à la bureautique, moteur de réponse connecté au web, outil de création visuelle, outil d'automatisation sans code) et un ou deux exemples ; 2. gain attendu ; 3. limite ou risque principal ; 4. données autorisées ou à anonymiser. 5. Expliquez ce qu'apporte une IA multimodale dans ces cas.",
    reponseAttendue:
      "Correspondances pertinentes : a. assistant conversationnel (ChatGPT, Le Chat de Mistral AI, Claude, Gemini) ou Copilot dans Outlook ; b. Copilot dans Teams ou fonction de transcription de l'outil de visioconférence, avec information préalable des participants ; c. moteur de réponse connecté au web (Perplexity, mode recherche des assistants) avec lecture des sources officielles ; d. fonctions IA de Canva ou générateur d'images d'un assistant ; e. Copilot dans Excel ou assistant conversationnel sur un fichier anonymisé ; f. dictée et transcription puis mise en forme par un assistant ; g. assistant conversationnel acceptant les documents longs, avec contrôle des passages clés ; h. Power Automate, Zapier ou Make.\nGains réalistes : temps de premier jet, mise en forme, recherche, structuration ; pas de gain de fiabilité sans vérification.\nRisques : informations fausses, sources mal lues, données personnelles ou confidentielles exposées, droits sur les images, erreur d'automatisation non surveillée.\nDonnées : anonymiser les noms, adresses, téléphones et montants des clients dans les outils grand public ; privilégier les comptes professionnels dont les conditions de confidentialité ont été vérifiées ; toujours lire les conditions d'utilisation.\nMultimodal : l'outil peut traiter texte, image, son et document (photo d'un tableau, note vocale, plan scanné), ce qui évite des ressaisies, sous les mêmes réserves de vérification et de confidentialité.\nBarème : types et exemples 6, gains 3, risques 4, données 4, multimodal 3.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C2 : structurer une requête efficace",
    consigne:
      "Julie a écrit la requête suivante : « fais un mail pour un client pas content du retard ». La réponse obtenue est longue, impersonnelle et promet une date de fin de chantier que personne n'a fixée. 1. Analysez ce qui manque à la requête. 2. Réécrivez-la selon la structure Rôle / Contexte / Tâche / Format / Contraintes, à partir des éléments fictifs suivants : chantier d'isolation des combles chez M. Garnier, retard de 10 jours dû à une livraison d'isolant, nouvelle date à confirmer par Thomas, ton courtois, 12 lignes au plus. 3. Ajoutez un exemple de formulation attendue et demandez à l'outil de procéder par étapes. 4. Comparez les deux réponses obtenues avec une grille (exactitude, ton, longueur, engagements pris). 5. Indiquez ce qui ne doit jamais figurer dans la requête.",
    reponseAttendue:
      "Manques : pas de rôle, pas de contexte (quel chantier, quelle cause, quelle étape), pas de format, pas de contraintes ; l'outil comble les vides par des généralités et invente un engagement.\nRequête structurée, par exemple : Rôle « Tu es assistante administrative d'une entreprise de rénovation énergétique » ; Contexte « chantier d'isolation des combles, retard de 10 jours lié à une livraison d'isolant, nouvelle date en cours de confirmation par le conducteur de travaux » ; Tâche « rédige la réponse au client » ; Format « mail de 12 lignes au plus, objet compris, formule de politesse » ; Contraintes « ton courtois et factuel, reconnaître la gêne, ne promettre aucune date ni aucun geste commercial, proposer un appel ».\nExemple de phrase attendue fourni et demande de procéder par étapes (analyser la situation, proposer un plan, rédiger).\nComparaison argumentée : la requête structurée donne une réponse plus juste, plus courte, sans engagement inventé.\nÀ ne jamais écrire : nom complet, adresse, téléphone ou mail du client, montant du devis, informations confidentielles de l'entreprise dans un outil non validé ; utiliser des repères entre crochets à compléter après coup.\nBarème : analyse 3, requête structurée 7, exemple et étapes 3, comparaison 4, données exclues 3.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C2 : améliorer une réponse par itération et constituer la bibliothèque de prompts",
    consigne:
      "Karim veut un argumentaire pour présenter l'isolation des combles à un client particulier ; la première réponse est trop longue et trop technique. 1. Conduisez au moins trois itérations : précision de la cible, contrainte de format, demande d'autocritique (« relis ta réponse et signale les affirmations à vérifier »). 2. Faites poser par l'outil les questions dont il a besoin avant de répondre. 3. Rédigez 5 fiches pour la bibliothèque de prompts de Thermia Rénov (titre, usage, requête avec les variables entre crochets, points de vérification). 4. Décrivez le paramétrage d'un assistant personnalisé pour l'équipe (instructions, documents de référence autorisés, limites). 5. Expliquez comment la bibliothèque sera tenue à jour.",
    reponseAttendue:
      "Itérations visibles et justifiées : chaque nouvelle requête corrige un défaut précis de la réponse précédente (cible, longueur, vocabulaire, structure) ; l'autocritique fait apparaître les affirmations à vérifier (chiffres, aides, performances), qui sont ensuite contrôlées à la source.\nQuestions préalables obtenues (type de logement, attentes du client, éléments à mettre en avant) et utilisées.\nCinq fiches complètes et réutilisables : par exemple réponse à une réclamation, relance de devis, compte rendu de chantier à partir de notes, post pour les réseaux sociaux, synthèse d'un document ; variables entre crochets ; points de vérification propres à chaque fiche.\nAssistant personnalisé : instructions claires (rôle, ton, interdits : pas de chiffres non sourcés, pas de promesse commerciale), documents de référence non confidentiels (charte rédactionnelle, présentation de l'entreprise), rappel que l'assistant ne remplace pas la relecture ; vérification de qui peut y accéder.\nMise à jour : un responsable, un emplacement partagé, une date de révision, retours des utilisateurs.\nBarème : itérations 6, questions préalables 2, fiches 6, assistant personnalisé 4, mise à jour 2.",
    points: 20,
  },
  {
    titre: "Exercice 6 — C3 : produire des écrits professionnels relus et fiables",
    consigne:
      "Avec l'outil de votre choix et des données anonymisées, produisez pour Thermia Rénov : 1. la réponse au mail de réclamation de M. Garnier (retard de chantier) ; 2. un courrier de relance d'un devis envoyé il y a trois semaines ; 3. le compte rendu de chantier rédigé à partir des notes brutes de Thomas (« combles OK, trappe à reprendre, client absent, livraison laine mardi, prévoir 2 h ») ; 4. un post pour les réseaux sociaux présentant un chantier terminé. Pour chaque écrit : la requête utilisée, le texte final et la liste des corrections apportées à la relecture. 5. Listez les vérifications obligatoires avant envoi ou publication.",
    reponseAttendue:
      "Quatre écrits adaptés à leur destinataire : réponse courtoise qui reconnaît la gêne sans promettre de date non confirmée ; relance polie avec rappel de l'objet et proposition d'échange, sans pression ni fausse urgence ; compte rendu structuré (date, chantier, travaux réalisés, réserves, prochaines étapes, responsables) qui n'ajoute aucun fait absent des notes ; post factuel, sans donnée personnelle ni photo reconnaissable sans accord.\nRequêtes structurées et corrections de relecture tracées (faits ajoutés par l'outil supprimés, ton ajusté, longueur réduite, coordonnées et mentions de l'entreprise vérifiées).\nVérifications : faits et chiffres conformes au dossier, aucune promesse commerciale inventée (délai, prix, aide, performance), ton conforme à l'image de l'entreprise, orthographe, mentions obligatoires et coordonnées exactes, accord du client pour toute photo ou témoignage, relecture humaine finale et signature d'un responsable.\nBarème : quatre écrits 12 (3 chacun), requêtes et corrections 4, vérifications 4.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C3 : synthétiser, illustrer, analyser des données et vérifier",
    consigne:
      "1. Faites résumer en 10 lignes un guide public de plusieurs pages remis par le formateur, puis vérifiez la synthèse phrase par phrase contre le document source et corrigez-la. 2. Faites produire une FAQ de 8 questions pour les clients à partir de ce guide et signalez les réponses qui demandent une validation interne. 3. Créez un visuel simple pour le site avec un outil d'IA ; indiquez les précautions sur les droits et la mention éventuelle du recours à l'IA. 4. À partir du tableau fictif de 60 devis de Thermia Rénov (sans nom de client), faites calculer le taux de transformation par commercial et par type de travaux, faites expliquer la formule utilisée et recalculez à la main deux résultats. 5. Rédigez la méthode de vérification que vous appliquerez désormais.",
    reponseAttendue:
      "Synthèse fidèle : chaque phrase retrouvée dans la source, contresens et ajouts supprimés, chiffres et dates recopiés depuis le document et non depuis la réponse de l'outil.\nFAQ claire ; questions sensibles (prix, délais, aides, garanties) signalées pour validation par un responsable.\nVisuel : vérification des conditions d'utilisation de l'outil, absence de logo, de marque ou de personne réelle reconnaissable, pas d'imitation du style d'un auteur identifiable ; mention du recours à l'IA quand le visuel pourrait être pris pour une photo réelle.\nDonnées : taux de transformation = devis signés / devis émis ; formule de tableur expliquée (par exemple NB.SI.ENS ou tableau croisé dynamique) ; recalcul manuel concordant ou écart expliqué et corrigé.\nMéthode : retour systématique à la source, contrôle des chiffres par recalcul ou échantillon, lecture des liens cités, relecture par une deuxième personne pour les documents sensibles, conservation de la source avec le document produit.\nBarème : synthèse et vérification 6, FAQ 3, visuel 3, données 5, méthode 3.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C4 : cartographier ses tâches et intégrer l'IA dans ses outils de travail",
    consigne:
      "À partir de votre diagnostic de départ (ou de celui de Julie) : 1. Classez vos 10 tâches dans une matrice fréquence / gain possible / risque (données, erreur, image de l'entreprise). 2. Retenez les 3 tâches où l'IA apporte le meilleur gain pour un risque maîtrisé et justifiez. 3. Pour chacune, décrivez la nouvelle façon de faire dans vos outils (par exemple Copilot dans Word, Excel, Outlook ou Teams, ou un assistant conversationnel) étape par étape, en indiquant le point de contrôle humain. 4. Écrivez une formule ou une analyse de tableur obtenue avec l'aide de l'IA et expliquez-la. 5. Mesurez le temps avant et après sur une tâche testée pendant l'atelier.",
    reponseAttendue:
      "Matrice complète et argumentée : les tâches fréquentes, répétitives et peu risquées (premiers jets de mails, mise en forme, comptes rendus, synthèses, formules) ressortent en priorité ; les tâches engageant juridiquement ou commercialement l'entreprise (devis, contrats, réponses à un litige) restent sous contrôle strict.\nTrois tâches retenues avec justification par le gain et le risque.\nNouvelles façons de faire décrites précisément : par exemple Copilot dans Outlook pour résumer un fil de mails et proposer une réponse relue ; Copilot dans Teams pour le récapitulatif d'une réunion transcrite, participants informés ; Copilot dans Word pour une première version de compte rendu ; dans tous les cas un point de contrôle humain identifié ; rappel que Copilot dans Microsoft 365 suppose une licence et qu'il accède aux documents auxquels l'utilisateur a lui-même accès, d'où l'importance des droits de partage.\nFormule juste et comprise (par exemple SOMME.SI.ENS, RECHERCHEX, NB.SI.ENS) ou analyse expliquée ; test sur quelques lignes.\nMesure du temps : durée avant et après, chiffrée, avec le temps de vérification inclus.\nBarème : matrice 5, choix 3, nouvelles façons de faire 6, formule 3, mesure 3.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C4 : automatiser une tâche simple et bâtir son plan d'action",
    consigne:
      "Thermia Rénov reçoit ses demandes de devis par le formulaire de son site ; Julie les recopie à la main dans un tableau puis prévient le commercial. 1. Concevez une automatisation sans code (Power Automate, Zapier ou Make) : déclencheur, actions, données transmises, message d'accusé de réception, notification au commercial. 2. Indiquez où une IA peut intervenir dans le scénario (classement de la demande, résumé) et où elle ne doit pas intervenir. 3. Prévoyez le test, la surveillance et le point de contrôle humain. 4. Listez les précautions sur les données personnelles. 5. Rédigez votre plan d'action individuel à 30, 60 et 90 jours avec un indicateur de temps gagné.",
    reponseAttendue:
      "Scénario clair : déclencheur (nouvelle réponse au formulaire), actions (ajout d'une ligne dans le tableau partagé, mail d'accusé de réception au demandeur, notification au commercial du secteur), données transmises limitées au nécessaire.\nIA à bon escient : classement par type de travaux ou résumé de la demande, avec vérification ; jamais de réponse commerciale envoyée automatiquement au client sans relecture, jamais de décision sur le client prise par l'outil seul.\nTest sur des demandes fictives, journal des exécutions, alerte en cas d'erreur, responsable désigné, vérification hebdomadaire.\nDonnées : information des personnes sur le formulaire, minimisation, durée de conservation définie, accès limité, outil et localisation des données vérifiés, sous-traitants identifiés, ajout au registre des traitements.\nPlan d'action réaliste : actions datées, ressources, indicateurs (temps gagné par semaine, nombre de requêtes de la bibliothèque utilisées, erreurs évitées), point d'étape avec le responsable.\nBarème : automatisation 6, place de l'IA 3, test et contrôle 3, données 4, plan d'action 4.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C5 : utiliser l'IA de façon responsable et rédiger la charte d'usage",
    consigne:
      "Sandrine MOREL vous confie la rédaction de la charte d'usage de l'IA de Thermia Rénov. 1. Classez les situations suivantes en « autorisé », « autorisé sous conditions » ou « interdit », en justifiant : coller le devis nominatif d'un client dans un outil grand public ; résumer un guide public ; faire rédiger un post à partir d'une photo de chantier où l'on reconnaît le client ; transcrire une réunion sans prévenir les participants ; faire générer un visuel « dans le style » d'un illustrateur connu ; publier un témoignage client inventé par l'IA ; utiliser un compte professionnel validé pour reformuler un compte rendu ; laisser un agent conversationnel répondre aux clients sans indiquer qu'il s'agit d'une IA. 2. Rappelez les principes du RGPD et le secret des affaires applicables. 3. Présentez le calendrier du règlement européen sur l'IA et ce qu'il implique pour l'entreprise. 4. Expliquez les règles de droit d'auteur sur les contenus générés. 5. Rédigez la charte en 10 règles, incluant transparence, biais et impact environnemental.",
    reponseAttendue:
      "Classement : devis nominatif dans un outil grand public = interdit (données personnelles et confidentielles) ; résumé d'un guide public = autorisé avec vérification ; photo où le client est reconnaissable = sous conditions (accord écrit, sinon flouter ou ne pas utiliser) ; transcription sans information = interdit, information préalable obligatoire ; visuel imitant un artiste identifiable = interdit ou à proscrire (risque de contrefaçon et d'atteinte à la réputation) ; témoignage inventé = interdit (pratique commerciale trompeuse) ; compte professionnel validé = autorisé avec relecture ; agent conversationnel non signalé = interdit, l'utilisateur doit savoir qu'il échange avec une IA.\nRGPD (règlement (UE) 2016/679) : base légale, finalité déterminée, minimisation, durée de conservation, sécurité, information des personnes, sous-traitants et transferts hors Union européenne vérifiés ; recommandations de la CNIL sur l'IA consultées ; secret des affaires : prix, marges, fichiers clients, dossiers techniques ne sortent pas dans des outils non validés.\nRèglement (UE) 2024/1689 : entrée en vigueur le 1er août 2024 ; interdictions de certaines pratiques et obligation de maîtrise de l'IA (article 4 : former et sensibiliser le personnel qui utilise l'IA) applicables depuis le 2 février 2025 ; obligations des fournisseurs de modèles d'IA à usage général depuis le 2 août 2025 ; obligations de transparence (article 50 : informer qu'on échange avec une IA, signaler certains contenus générés) et la plupart des autres obligations à partir du 2 août 2026 ; Thermia Rénov est en général « déployeur » ; la proposition de la Commission de fin 2025 (« omnibus numérique ») visant à décaler certaines échéances des systèmes à haut risque est présentée comme une proposition dont l'état doit être vérifié, pas comme une règle adoptée.\nDroit d'auteur : la protection suppose une création originale d'un auteur humain ; un contenu entièrement généré peut ne pas être protégé ; un contenu généré peut reproduire une œuvre existante : vérifier, retravailler, ne pas imiter un auteur identifiable, respecter les conditions de l'outil.\nCharte en 10 règles claires : outils et comptes autorisés, données interdites, anonymisation, vérification et relecture humaine, transparence envers les clients, aucune promesse ni témoignage inventés, droits sur les images, vigilance sur les biais, usage sobre (impact environnemental des calculs), référent et mise à jour.\nBarème : classement 6, RGPD et secret des affaires 4, règlement européen 4, droit d'auteur 2, charte 4.",
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// QCM par compétence (10 questions chacun)
// Format lu par le générateur d'exercices : « 1) … A) …   B) …   C) …   D) … » + « 1-B  2-C … ».
// Aucune parenthèse fermante après A, B, C ou D dans les énoncés (le parseur s'en servirait).
// ---------------------------------------------------------------------------
type Q = [question: string, options: [string, string, string, string], correct: 0 | 1 | 2 | 3];
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

const QCM_C1: Q[] = [
  ["Un grand modèle de langage produit sa réponse en :", ["Recopiant une page web précise", "Prédisant la suite de texte la plus probable, morceau par morceau", "Interrogeant un expert humain", "Consultant une base de données officielle"], 1],
  ["Une hallucination d'IA désigne :", ["Une information plausible mais inventée", "Une panne du service", "Un virus informatique", "Une image animée"], 0],
  ["Les tokens sont :", ["Des abonnements payants", "Des mots de passe", "Des morceaux de texte que le modèle traite", "Des serveurs"], 2],
  ["La fenêtre de contexte correspond à :", ["La taille de l'écran", "La durée de l'abonnement", "Le nombre d'utilisateurs autorisés", "La quantité de texte que le modèle peut prendre en compte à la fois"], 3],
  ["La date de connaissance d'un modèle signifie qu'il :", ["Peut ignorer les faits postérieurs à son entraînement", "Connaît toujours l'actualité du jour", "Ne fonctionne plus après cette date", "Est mis à jour chaque matin"], 0],
  ["Une IA connectée au web :", ["Ne se trompe jamais", "Recherche des pages et les résume, sources à ouvrir et à vérifier", "Remplace un moteur de recherche sans aucune limite", "N'a pas besoin de requête"], 1],
  ["Une IA multimodale peut traiter :", ["Uniquement du texte", "Uniquement des chiffres", "Du texte, des images, du son ou des documents", "Uniquement des vidéos"], 2],
  ["Un biais dans une réponse d'IA peut venir :", ["De la couleur de l'écran", "Du navigateur utilisé", "De l'heure de la requête", "Des données sur lesquelles le modèle a été entraîné"], 3],
  ["L'apprentissage automatique est :", ["Une méthode qui fait apprendre un système à partir de données", "Un logiciel de traitement de texte", "Une marque d'ordinateur", "Une obligation légale"], 0],
  ["Pour une TPE du bâtiment, un cas d'usage pertinent de l'IA générative est :", ["Signer un contrat à la place du dirigeant", "Préparer un premier jet de compte rendu de chantier à relire", "Fixer seule les prix des devis", "Remplacer l'assurance décennale"], 1],
];

const QCM_C2: Q[] = [
  ["Une requête efficace précise en général :", ["Uniquement la tâche", "Le rôle, le contexte, la tâche, le format et les contraintes", "Le nom complet du client", "Le mot de passe de l'outil"], 1],
  ["Donner un exemple de réponse attendue dans la requête permet :", ["D'orienter le style et la forme de la réponse", "De ralentir l'outil", "De supprimer le contexte", "D'éviter toute relecture"], 0],
  ["Demander à l'outil de procéder par étapes sert à :", ["Allonger inutilement la réponse", "Masquer le raisonnement", "Obtenir une réponse plus structurée et plus facile à contrôler", "Payer moins cher"], 2],
  ["Itérer consiste à :", ["Recommencer sans rien changer", "Changer d'outil à chaque question", "Copier la première réponse", "Améliorer la réponse par des demandes successives ciblées"], 3],
  ["Demander à l'outil « quelles informations te manque-t-il pour répondre ? » permet :", ["De compléter le contexte avant la réponse", "De supprimer la conversation", "D'obtenir une réponse garantie", "D'éviter de relire"], 0],
  ["Une bibliothèque de prompts est :", ["Une liste de sites web", "Un ensemble de requêtes testées et réutilisables, avec leurs points de vérification", "Un logiciel payant obligatoire", "Un livre sur l'histoire de l'IA"], 1],
  ["Dans une requête modèle, les éléments variables s'écrivent de préférence :", ["Avec les vraies données du client", "En majuscules", "Entre crochets, à compléter au moment de l'usage", "En anglais"], 2],
  ["Un assistant personnalisé se configure avec :", ["Le fichier clients complet", "Les mots de passe de l'équipe", "Les relevés bancaires", "Des instructions et des documents de référence non confidentiels"], 3],
  ["Demander à l'outil de critiquer sa propre réponse permet surtout :", ["De repérer des affirmations à vérifier", "De rendre la réponse exacte", "D'éviter tout contrôle humain", "De la traduire"], 0],
  ["Si une réponse est trop générale, le plus efficace est de :", ["Abandonner l'outil", "Ajouter du contexte et des contraintes précises", "Poser la même question plus fort", "Accepter la réponse"], 1],
];

const QCM_C3: Q[] = [
  ["Avant d'envoyer un mail rédigé avec l'IA à un client, il faut :", ["L'envoyer tel quel", "Le relire et vérifier faits, ton, engagements et coordonnées", "Le traduire en anglais", "Supprimer la formule de politesse"], 1],
  ["Si l'IA ajoute dans un courrier une date de fin de chantier non fixée, il faut :", ["Supprimer cet engagement non validé", "La garder pour rassurer le client", "Doubler le délai", "Envoyer le courrier en recommandé"], 0],
  ["Un compte rendu produit à partir de notes brutes doit :", ["Ajouter des détails plausibles", "Être plus long que possible", "Rester fidèle aux notes sans inventer de faits", "Éviter les dates"], 2],
  ["Pour vérifier une synthèse de document, on :", ["Fait confiance à l'outil", "Demande une deuxième synthèse", "Lit seulement le titre", "Compare chaque affirmation au document source"], 3],
  ["Un chiffre obtenu par l'IA dans un tableau doit être :", ["Contrôlé par un recalcul ou un échantillon", "Arrondi", "Supprimé", "Mis en gras"], 0],
  ["Publier un faux témoignage client généré par l'IA est :", ["Une bonne pratique marketing", "Une pratique commerciale trompeuse à proscrire", "Autorisé s'il est positif", "Obligatoire sur les réseaux sociaux"], 1],
  ["Avant de publier la photo d'un chantier où l'on reconnaît le client, il faut :", ["La retoucher avec l'IA", "La publier en petit format", "Obtenir son accord", "Ajouter un filtre"], 2],
  ["Une FAQ client produite avec l'IA :", ["Peut promettre des aides garanties", "Ne demande aucune validation", "Remplace le devis", "Doit être validée en interne sur les sujets sensibles comme les prix et les délais"], 3],
  ["Les sources citées par un outil d'IA doivent être :", ["Ouvertes et lues pour vérifier qu'elles existent et disent bien cela", "Recopiées sans vérification", "Supprimées", "Remplacées par d'autres au hasard"], 0],
  ["Le taux de transformation des devis se calcule par :", ["Devis émis × devis signés", "Devis signés / devis émis", "Chiffre d'affaires / nombre de salariés", "Devis refusés / 12"], 1],
];

const QCM_C4: Q[] = [
  ["Pour choisir où utiliser l'IA, on croise en priorité :", ["Le prix de l'outil et sa couleur", "La fréquence de la tâche, le gain possible et le risque", "L'âge des salariés", "Le nombre d'outils disponibles"], 1],
  ["Une tâche à confier en priorité à l'IA, sous contrôle, est :", ["Un premier jet de compte rendu répétitif", "La signature d'un contrat", "La décision de licencier", "La fixation seule du prix d'un devis"], 0],
  ["Copilot dans Microsoft 365 accède :", ["À tous les fichiers de toutes les entreprises", "À aucun fichier", "Aux documents auxquels l'utilisateur a lui-même accès", "Uniquement à internet"], 2],
  ["Avant de transcrire une réunion Teams, il faut :", ["Couper le son", "Désactiver les caméras", "Supprimer l'ordre du jour", "Informer les participants"], 3],
  ["Une automatisation sans code repose sur :", ["Un déclencheur suivi d'une ou plusieurs actions", "Un langage de programmation obligatoire", "Une intervention manuelle à chaque étape", "Un serveur installé dans l'entreprise"], 0],
  ["Power Automate, Zapier et Make sont des outils :", ["De dessin", "D'automatisation de tâches entre applications", "De comptabilité", "De visioconférence"], 1],
  ["Dans une automatisation, le point de contrôle humain sert à :", ["Ralentir le travail", "Supprimer les données", "Vérifier les résultats avant qu'ils engagent l'entreprise", "Changer d'outil"], 2],
  ["Pour mesurer le gain de temps, on compare :", ["Le prix des abonnements", "Le nombre de clics", "La taille des fichiers", "Le temps de la tâche avant et après, vérification comprise"], 3],
  ["La formule NB.SI.ENS d'un tableur sert à :", ["Compter les lignes qui remplissent plusieurs critères", "Additionner deux cellules", "Trier un tableau", "Imprimer une feuille"], 0],
  ["Un plan d'action individuel efficace comporte :", ["Uniquement des intentions", "Des actions datées, des ressources et des indicateurs", "La liste de tous les outils existants", "Aucune date"], 1],
];

const QCM_C5: Q[] = [
  ["Saisir le devis nominatif d'un client dans un outil d'IA grand public non validé :", ["Est sans risque", "Expose des données personnelles et confidentielles : à proscrire", "Est obligatoire", "Est autorisé le week-end"], 1],
  ["Le règlement européen sur l'IA (UE) 2024/1689 est entré en vigueur le :", ["1er août 2024", "1er janvier 2023", "25 mai 2018", "1er janvier 2030"], 0],
  ["L'obligation de maîtrise de l'IA par le personnel (article 4) s'applique depuis le :", ["1er août 2024", "2 août 2027", "2 février 2025", "1er janvier 2026"], 2],
  ["Les obligations de transparence (article 50) s'appliquent à partir du :", ["2 février 2025", "1er août 2024", "25 mai 2018", "2 août 2026"], 3],
  ["Le principe de minimisation du RGPD impose de :", ["Ne traiter que les données nécessaires à la finalité", "Collecter le plus de données possible", "Conserver les données sans limite", "Partager les données avec tous les outils"], 0],
  ["La proposition « omnibus numérique » de la Commission européenne de fin 2025 :", ["A supprimé le règlement sur l'IA", "Est une proposition visant notamment à décaler certaines échéances, dont l'état doit être vérifié", "Est entrée en vigueur en 2024", "Concerne seulement la fiscalité"], 1],
  ["Un contenu entièrement généré par une IA, sans apport créatif humain :", ["Est toujours protégé par le droit d'auteur", "Appartient à l'éditeur de l'outil dans tous les cas", "Peut ne pas être protégé, la protection supposant une création originale humaine", "Est interdit"], 2],
  ["Lorsqu'un client échange avec un agent conversationnel de l'entreprise, il doit :", ["Ignorer qu'il s'agit d'une IA", "Payer un supplément", "Donner son mot de passe", "Être informé qu'il échange avec une IA"], 3],
  ["La CNIL publie sur l'IA :", ["Des recommandations et fiches pratiques pour respecter le RGPD", "Des tarifs d'abonnement", "Des classements d'outils", "Des modèles de devis"], 0],
  ["Une charte d'usage interne de l'IA précise notamment :", ["Le salaire des utilisateurs", "Les outils autorisés, les données interdites et les règles de vérification", "Le prix de vente des produits", "Les horaires d'ouverture"], 1],
];

export const IAP21_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Comprendre le fonctionnement, les possibilités et les limites de l'IA générative", QCM_C1),
  qcmExercice("QCM C2 — Rédiger des requêtes efficaces et améliorer les réponses par itération", QCM_C2),
  qcmExercice("QCM C3 — Produire et vérifier des contenus professionnels avec l'IA", QCM_C3),
  qcmExercice("QCM C4 — Intégrer l'IA dans ses processus de travail et automatiser des tâches simples", QCM_C4),
  qcmExercice("QCM C5 — Utiliser l'IA de façon responsable et conforme à la réglementation", QCM_C5),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (diagnostic puis C1 à C5), alignées sur les
 * 10 questions de positionnement et sur les copies de `iaPro21hHumanized.ts` ; les 5 QCM ensuite.
 */
export const IAP21_EXERCICES_COMPLETS: AIContentExercise[] = [...IAP21_EXERCICES, ...IAP21_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Intelligence artificielle : intégrer les outils d'IA dans son activité professionnelle »</strong> : organisation de la formation, compétences C1 à C5 et évaluation finale ; quiz et cas pratiques corrigés pour chaque compétence ; fil rouge Thermia Rénov (entreprise fictive).</li>
  <li><strong>Cahier d'exercices</strong> : test de positionnement, 10 mises en situation professionnelles (diagnostic de départ puis C1 à C5) ; <strong>corrigés formateur</strong> remis après correction.</li>
  <li><strong>5 QCM de 10 questions</strong>, un par compétence (C1 à C5), corrigés en séance.</li>
  <li><strong>Grille d'évaluation de la mise en situation finale</strong> et grille d'autoévaluation, critères par compétence.</li>
  <li><strong>Modèles</strong> : trame de requête Rôle / Contexte / Tâche / Format / Contraintes, fiche de bibliothèque de prompts, check-list de vérification avant envoi, matrice des tâches fréquence / gain / risque, fiche de conception d'une automatisation, trame de charte d'usage de l'IA, plan d'action individuel à 30, 60 et 90 jours.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Salle de formation</strong> : vidéoprojecteur, paperboard, connexion internet, un poste informatique connecté par stagiaire.</li>
  <li><strong>Assistants conversationnels</strong> : ChatGPT, Microsoft Copilot, Google Gemini, Le Chat de Mistral AI, Claude ; moteur de réponse connecté au web : Perplexity. Versions gratuites ou comptes professionnels de l'employeur ; conditions d'utilisation et paramètres de confidentialité vérifiés en début de séance.</li>
  <li><strong>Bureautique</strong> : Copilot dans Word, Excel, Outlook et Teams lorsque l'entreprise dispose des licences, sinon démonstration par le formateur ; tableur pour les formules et analyses.</li>
  <li><strong>Création visuelle</strong> : fonctions IA de Canva.</li>
  <li><strong>Automatisation sans code</strong> : Power Automate, Zapier ou Make, sur des comptes de démonstration et des données fictives.</li>
  <li><strong>Jeux de données fictifs</strong> : tableau de 60 devis de Thermia Rénov sans nom de client, notes de chantier, mails de réclamation, guide public à résumer.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>CNIL — intelligence artificielle</strong> : <a href="https://www.cnil.fr/fr/intelligence-artificielle">https://www.cnil.fr/fr/intelligence-artificielle</a> — recommandations et fiches pratiques pour concilier IA et RGPD.</li>
  <li><strong>Règlement (UE) 2024/1689 sur l'intelligence artificielle</strong> : <a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj">https://eur-lex.europa.eu/eli/reg/2024/1689/oj</a> — texte officiel publié au Journal officiel de l'Union européenne.</li>
  <li><strong>Commission européenne — cadre réglementaire de l'IA</strong> : <a href="https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai">https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai</a> — calendrier d'application et documents d'orientation.</li>
  <li><strong>Entreprendre.Service-Public.fr</strong> : <a href="https://entreprendre.service-public.fr/">https://entreprendre.service-public.fr/</a> — RGPD, obligations des entreprises, protection des données.</li>
  <li><strong>France Num</strong> : <a href="https://www.francenum.gouv.fr/">https://www.francenum.gouv.fr/</a> — initiative publique d'accompagnement des TPE/PME dans le numérique et l'IA.</li>
  <li><strong>ANSSI — cyber.gouv.fr</strong> : <a href="https://cyber.gouv.fr/">https://cyber.gouv.fr/</a> — recommandations de sécurité pour l'usage des systèmes d'IA générative.</li>
</ul>`;

const IAP21_VIDEOS = [
  { title: "Comment fonctionne une IA générative", description: "Grands modèles de langage, tokens et probabilités expliqués simplement.", url: "https://www.youtube.com/results?search_query=comment+fonctionne+une+IA+g%C3%A9n%C3%A9rative+grand+mod%C3%A8le+de+langage" },
  { title: "Les hallucinations de l'IA", description: "Pourquoi un outil d'IA peut inventer une information et comment vérifier.", url: "https://www.youtube.com/results?search_query=hallucinations+IA+g%C3%A9n%C3%A9rative+v%C3%A9rifier" },
  { title: "Bien rédiger un prompt", description: "Rôle, contexte, tâche, format et contraintes.", url: "https://www.youtube.com/results?search_query=bien+r%C3%A9diger+un+prompt+r%C3%B4le+contexte+t%C3%A2che+format" },
  { title: "Copilot dans Microsoft 365", description: "Word, Excel, Outlook et Teams : premiers usages.", url: "https://www.youtube.com/results?search_query=Copilot+Microsoft+365+Word+Excel+Outlook+Teams+tutoriel" },
  { title: "Les fonctions IA de Canva", description: "Créer un visuel simple et l'adapter à sa charte.", url: "https://www.youtube.com/results?search_query=Canva+fonctions+IA+tutoriel+fran%C3%A7ais" },
  { title: "Automatiser sans code", description: "Premiers scénarios avec Power Automate, Zapier ou Make.", url: "https://www.youtube.com/results?search_query=automatiser+sans+code+Power+Automate+Zapier+Make+d%C3%A9butant" },
  { title: "IA et RGPD : les recommandations de la CNIL", description: "Données personnelles et outils d'IA.", url: "https://www.cnil.fr/fr/intelligence-artificielle" },
  { title: "Le règlement européen sur l'IA expliqué", description: "Niveaux de risque, transparence et calendrier d'application.", url: "https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai" },
  { title: "Droit d'auteur et contenus générés par l'IA", description: "Ce que l'on peut publier et les précautions à prendre.", url: "https://www.youtube.com/results?search_query=droit+d%27auteur+contenus+g%C3%A9n%C3%A9r%C3%A9s+par+IA" },
  { title: "Impact environnemental de l'IA", description: "Pourquoi un usage sobre et réfléchi compte.", url: "https://www.youtube.com/results?search_query=impact+environnemental+intelligence+artificielle+g%C3%A9n%C3%A9rative" },
];

export const IAP21_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: IAP21_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: IAP21_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement début / fin
// ---------------------------------------------------------------------------
export const IAP21_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Que signifie « IA générative » ?", options: ["Une IA qui produit du texte, des images ou du son", "Une IA qui répare les ordinateurs", "Un logiciel de comptabilité", "Un réseau social"], correctIndex: 0 },
  { question: "Une réponse d'un outil d'IA générative est :", options: ["Toujours exacte", "À vérifier, car elle peut contenir des erreurs", "Validée par un expert", "Une citation officielle"], correctIndex: 1 },
  { question: "Parmi ces outils, lequel est un assistant conversationnel d'IA générative ?", options: ["Un antivirus", "Un tableur", "Le Chat de Mistral AI", "Un lecteur PDF"], correctIndex: 2 },
  { question: "Un « prompt » est :", options: ["Un virus", "Un format d'image", "Un abonnement", "La consigne ou la question donnée à l'outil d'IA"], correctIndex: 3 },
  { question: "Pour obtenir une réponse utile, il vaut mieux :", options: ["Donner du contexte et préciser le résultat attendu", "Écrire un seul mot", "Poser la question en majuscules", "Ne rien préciser"], correctIndex: 0 },
  { question: "Avant d'envoyer à un client un mail rédigé avec l'IA, il faut :", options: ["L'envoyer tel quel", "Le relire et vérifier son contenu", "Le traduire", "Ajouter des emojis"], correctIndex: 1 },
  { question: "Copilot est intégré notamment à :", options: ["Un logiciel de dessin industriel uniquement", "Une console de jeux", "Microsoft 365 (Word, Excel, Outlook, Teams)", "Un GPS de voiture"], correctIndex: 2 },
  { question: "Automatiser une tâche simple consiste à :", options: ["Supprimer la tâche", "La confier à un stagiaire", "La faire deux fois", "La faire exécuter par un outil selon un déclencheur et des actions"], correctIndex: 3 },
  { question: "Coller le fichier clients complet de l'entreprise dans un outil d'IA grand public est :", options: ["Risqué au regard du RGPD et de la confidentialité", "Recommandé", "Sans conséquence", "Obligatoire"], correctIndex: 0 },
  { question: "Il existe un règlement européen qui encadre l'intelligence artificielle :", options: ["Non, aucun texte n'existe", "Oui, le règlement (UE) 2024/1689", "Oui, mais seulement aux États-Unis", "Seulement pour les jeux vidéo"], correctIndex: 1 },
];

export const IAP21_QCM_FIN: AIQCMQuestion[] = [
  { question: "Une hallucination d'IA est :", options: ["Une information inventée présentée comme vraie", "Une mise à jour du logiciel", "Un écran noir", "Une image en couleur"], correctIndex: 0 },
  { question: "La structure de requête vue en formation comprend :", options: ["Nom / Prénom / Adresse", "Rôle / Contexte / Tâche / Format / Contraintes", "Titre / Date / Signature", "Question / Réponse"], correctIndex: 1 },
  { question: "Pour améliorer une réponse trop générale, on :", options: ["Change d'ordinateur", "Accepte la réponse", "Itère en ajoutant contexte et contraintes", "Supprime la conversation"], correctIndex: 2 },
  { question: "Une synthèse de document produite par l'IA se vérifie :", options: ["En lisant le titre", "En demandant à l'outil s'il est sûr", "En comptant les lignes", "En comparant chaque affirmation au document source"], correctIndex: 3 },
  { question: "Copilot dans Microsoft 365 accède :", options: ["Aux documents auxquels l'utilisateur a lui-même accès", "À tous les documents de l'entreprise sans exception", "À aucun document", "Aux documents des autres entreprises"], correctIndex: 0 },
  { question: "Dans une automatisation sans code, le point de départ s'appelle :", options: ["L'action", "Le déclencheur", "Le filtre final", "La licence"], correctIndex: 1 },
  { question: "L'obligation de maîtrise de l'IA par le personnel (article 4 du règlement (UE) 2024/1689) s'applique depuis le :", options: ["1er août 2024", "2 août 2026", "2 février 2025", "2 août 2027"], correctIndex: 2 },
  { question: "Les obligations de transparence du règlement européen sur l'IA (article 50) s'appliquent à partir du :", options: ["1er août 2024", "2 février 2025", "25 mai 2018", "2 août 2026"], correctIndex: 3 },
  { question: "Avant de saisir un document client dans un outil d'IA grand public, il faut :", options: ["L'anonymiser ou utiliser un outil validé par l'entreprise", "L'imprimer", "Le renommer", "Le compresser"], correctIndex: 0 },
  { question: "Publier un témoignage client inventé par l'IA est :", options: ["Une bonne pratique", "Une pratique commerciale trompeuse à proscrire", "Autorisé s'il est court", "Obligatoire"], correctIndex: 1 },
];

export const IAP21_EVAL_PACK: AIEvalPack = {
  qcmDebut: IAP21_QCM_DEBUT,
  qcmFin: IAP21_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du jour 2) — la réclamation de M. Garnier",
    contexte:
      "Cas fictif. M. Garnier, client de Thermia Rénov, écrit un mail mécontent : le chantier d'isolation de ses combles a pris du retard et il n'a pas reçu le compte rendu de la dernière visite. Thomas, conducteur de travaux, a laissé des notes brutes ; Julie doit préparer la réponse et le compte rendu avec un outil d'IA, sans exposer les données du client.",
    questions: [
      { question: "Expliquez pourquoi l'outil pourrait inventer une date ou un fait dans sa réponse, et comment l'éviter.", reponseAttendue: "Le modèle produit la suite la plus probable et comble les vides du contexte : il peut inventer une date de fin, une cause ou un geste commercial (hallucination). On l'évite en donnant les faits exacts, en interdisant explicitement tout engagement non validé et en relisant la réponse contre le dossier.", points: 5 },
      { question: "Rédigez la requête structurée pour la réponse au client.", reponseAttendue: "Rôle (assistante administrative d'une entreprise de rénovation énergétique), contexte (retard de 10 jours dû à une livraison, nouvelle date à confirmer), tâche (répondre au client), format (12 lignes au plus, objet, formule de politesse), contraintes (ton courtois et factuel, aucune date ni geste commercial promis, proposer un appel), sans nom ni coordonnées du client : repères entre crochets.", points: 5 },
      { question: "Listez les vérifications à faire sur le compte rendu produit à partir des notes de Thomas.", reponseAttendue: "Fidélité aux notes (aucun fait ajouté), dates et prochaines étapes exactes, réserves bien reprises, responsables identifiés, ton neutre, relecture par Thomas avant envoi, coordonnées de l'entreprise exactes.", points: 5 },
      { question: "Quelles données ne doivent pas être saisies dans l'outil et pourquoi ?", reponseAttendue: "Nom, adresse, téléphone, mail et montant du devis du client, informations internes confidentielles : ce sont des données personnelles (RGPD) ou relevant du secret des affaires ; on anonymise ou on utilise un compte professionnel validé par l'entreprise dont les conditions de confidentialité ont été vérifiées.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — mise en situation professionnelle complète observée avec grille et QCM de fin (jour 3)",
    exercices: [
      {
        titre: "Partie 1 — Analyse de la situation et choix de l'outil (C1)",
        consigne: "À partir du dossier tiré au sort (fictif : demande d'un client, documents et notes de Thermia Rénov), présentez la situation, le ou les outils adaptés, leurs limites et les risques d'erreur.",
        reponseAttendue: "Choix d'outil justifié par la tâche, limites expliquées (hallucinations, date de connaissance, sources à vérifier, biais), données sensibles repérées. Critères de la grille : justesse du choix, explication des limites, repérage des risques.",
        points: 20,
      },
      {
        titre: "Partie 2 — Requêtes et itérations (C2)",
        consigne: "Rédigez les requêtes nécessaires, améliorez au moins une réponse par itération et enregistrez une fiche pour la bibliothèque de prompts.",
        reponseAttendue: "Requêtes structurées (rôle, contexte, tâche, format, contraintes), itérations ciblées et justifiées, autocritique demandée, fiche réutilisable avec variables entre crochets et points de vérification. Critères de la grille : structure, pertinence des itérations, réutilisabilité.",
        points: 20,
      },
      {
        titre: "Partie 3 — Contenus produits et vérifiés (C3)",
        consigne: "Produisez la réponse au client, le compte rendu et un contenu de communication ; présentez vos vérifications.",
        reponseAttendue: "Contenus adaptés au destinataire, faits et chiffres contrôlés à la source, aucune promesse commerciale inventée, mentions et coordonnées exactes, droits sur les images respectés, corrections de relecture tracées. Critères de la grille : qualité rédactionnelle, exactitude, conformité.",
        points: 20,
      },
      {
        titre: "Partie 4 — Intégration dans le processus et automatisation (C4)",
        consigne: "Montrez comment la tâche s'intègre dans le processus de l'entreprise (outils bureautiques, tableur, automatisation éventuelle) et chiffrez le temps gagné.",
        reponseAttendue: "Étapes décrites avec le point de contrôle humain, usage pertinent de Copilot ou d'un assistant, formule ou automatisation simple et testée, mesure du temps avant et après vérification comprise. Critères de la grille : réalisme, contrôle humain, mesure.",
        points: 20,
      },
      {
        titre: "Partie 5 — Conformité, charte et plan d'action (C5), puis QCM de fin",
        consigne: "Indiquez les règles de conformité appliquées (RGPD, secret des affaires, transparence, droit d'auteur, règlement européen sur l'IA), les règles de la charte d'usage concernées et votre plan d'action individuel ; répondez ensuite au QCM de fin.",
        reponseAttendue: "Données minimisées ou anonymisées, outil validé, information du client lorsqu'un contenu ou un échange relève de l'IA, droits respectés, calendrier du règlement européen exact (1er août 2024, 2 février 2025, 2 août 2025, 2 août 2026) et proposition « omnibus numérique » présentée comme non adoptée sauf vérification contraire ; plan d'action daté avec indicateurs. Critères de la grille : exactitude réglementaire, application concrète, plan d'action réaliste.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const IAP21_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
      titreLien: "EUR-Lex — règlement (UE) 2024/1689",
      titre: "Règlement européen sur l'intelligence artificielle : obligations applicables au 2 août 2026",
      date: "Août 2026",
      commentaire: "Entré en vigueur le 1er août 2024, le règlement s'applique par étapes : interdictions et obligation de maîtrise de l'IA (article 4) depuis le 2 février 2025, obligations des modèles d'IA à usage général depuis le 2 août 2025, obligations de transparence (article 50) et la plupart des autres obligations à partir du 2 août 2026. Les entreprises clientes sont en général « déployeurs ».",
      exploitation: "Preuve : fiche mémo datée archivée au dossier Qualiopi. Action : mise à jour de l'exercice 10 (charte d'usage), du QCM C5 et de la partie 5 de l'évaluation finale.",
    },
    {
      lien: "https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai",
      titreLien: "Commission européenne — cadre réglementaire de l'IA",
      titre: "Proposition « omnibus numérique » : report envisagé de certaines échéances des systèmes à haut risque",
      date: "Septembre 2026",
      commentaire: "La Commission a proposé fin 2025 de simplifier plusieurs textes du numérique et de décaler certaines échéances applicables aux systèmes d'IA à haut risque. Il s'agit d'une proposition soumise au processus législatif : son état d'avancement est vérifié à chaque session et elle n'est jamais présentée comme adoptée sans source officielle.",
      exploitation: "Preuve : note de veille datée avec l'état de la procédure. Action : actualisation de la séquence C5 du jour 3 et de la réponse attendue de l'exercice 10.",
    },
    {
      lien: "https://www.cnil.fr/fr/intelligence-artificielle",
      titreLien: "CNIL — intelligence artificielle",
      titre: "Recommandations de la CNIL pour concilier IA et RGPD",
      date: "Juillet 2026",
      commentaire: "Fiches pratiques et recommandations de la CNIL sur l'usage des systèmes d'IA : finalité, base légale, minimisation, information des personnes, sécurité, exercice des droits. Elles servent de référence pour les règles de saisie des données dans les outils.",
      exploitation: "Preuve : extrait archivé. Action : mise à jour de la partie RGPD de l'exercice 9 (automatisation) et de l'exercice 10.",
    },
    {
      lien: "https://www.culture.gouv.fr/",
      titreLien: "Ministère de la Culture",
      titre: "Droit d'auteur et intelligence artificielle : travaux et rapports publics",
      date: "Juin 2026",
      commentaire: "Suivi des travaux publics sur la protection des contenus générés, la transparence sur les données d'entraînement et le droit d'opposition des titulaires de droits à la fouille de textes et de données (directive (UE) 2019/790).",
      exploitation: "Preuve : synthèse archivée. Action : mise à jour des précautions sur les visuels de l'exercice 7 et du chapitre C5.",
    },
    {
      lien: "https://entreprendre.service-public.fr/",
      titreLien: "Entreprendre.Service-Public.fr",
      titre: "RGPD : obligations des TPE/PME et registre des traitements",
      date: "Mai 2026",
      commentaire: "Fiches officielles sur les obligations des entreprises en matière de données personnelles (registre, information, durée de conservation, sous-traitants), utiles pour les automatisations et les outils d'IA connectés aux données clients.",
      exploitation: "Preuve : note de veille. Action : mise à jour de la check-list « données » de l'exercice 9.",
    },
  ],
  metier: [
    {
      lien: "https://www.francenum.gouv.fr/",
      titreLien: "France Num",
      titre: "Usages de l'IA dans les TPE/PME : guides et retours d'expérience",
      date: "Août 2026",
      commentaire: "Guides pratiques et témoignages d'entreprises sur les premiers usages de l'IA générative (rédaction, relation client, gestion) ; les chiffres d'adoption cités en formation sont toujours datés et sourcés.",
      exploitation: "Preuve : extrait daté. Action : actualisation des cas d'usage de l'exercice 3 et de l'introduction du jour 1.",
    },
    {
      lien: "https://www.bpifrance.fr/",
      titreLien: "Bpifrance",
      titre: "Dirigeants de PME et intelligence artificielle : études et outils d'accompagnement",
      date: "Juillet 2026",
      commentaire: "Études et contenus d'accompagnement sur l'appropriation de l'IA par les dirigeants de PME, freins et priorités ; utilisés pour contextualiser le diagnostic de départ.",
      exploitation: "Preuve : note de veille. Action : ajustement des priorités de l'analyse des besoins.",
    },
    {
      lien: "https://www.capeb.fr/",
      titreLien: "CAPEB",
      titre: "Numérique et IA dans l'artisanat du bâtiment",
      date: "Juin 2026",
      commentaire: "Suivi des contenus de la confédération sur la numérisation des entreprises artisanales du bâtiment (devis, suivi de chantier, relation client), proches des situations du fil rouge.",
      exploitation: "Preuve : extrait archivé. Action : mise à jour des exemples de comptes rendus de chantier de l'exercice 6.",
    },
    {
      lien: "https://www.francetravail.fr/",
      titreLien: "France Travail",
      titre: "Compétences numériques et IA demandées dans les offres d'emploi administratives et commerciales",
      date: "Mai 2026",
      commentaire: "Relevé des compétences liées aux outils d'IA demandées dans les offres d'assistant administratif, de commercial et de chargé d'affaires.",
      exploitation: "Preuve : extraction datée. Action : ajustement des objectifs du plan d'action individuel.",
    },
  ],
  technologique: [
    {
      lien: "https://cyber.gouv.fr/",
      titreLien: "ANSSI — cyber.gouv.fr",
      titre: "Recommandations de sécurité pour l'usage des systèmes d'IA générative",
      date: "Septembre 2026",
      commentaire: "Recommandations de l'agence nationale sur les risques de sécurité liés aux outils d'IA générative (fuite de données, injection de requêtes, dépendance à un fournisseur) et sur les bonnes pratiques de déploiement.",
      exploitation: "Preuve : journal de veille. Action : mise à jour de la charte d'usage type et des règles de l'exercice 10.",
    },
    {
      lien: "https://learn.microsoft.com/fr-fr/copilot/",
      titreLien: "Microsoft Learn — Copilot",
      titre: "Évolution des fonctions de Copilot dans Word, Excel, Outlook et Teams",
      date: "Août 2026",
      commentaire: "Suivi de la documentation officielle de l'éditeur : nouvelles fonctions, conditions d'accès, gestion des droits sur les documents et protection des données des comptes professionnels.",
      exploitation: "Preuve : note de veille. Action : actualisation des démonstrations de l'exercice 8.",
    },
    {
      lien: "https://docs.mistral.ai/",
      titreLien: "Mistral AI — documentation",
      titre: "Nouvelles versions des modèles et fonctions de Le Chat",
      date: "Juillet 2026",
      commentaire: "Suivi des évolutions d'un éditeur européen : fonctions de recherche, d'analyse de documents et d'agents ; les conditions d'utilisation sont relues à chaque nouvelle version présentée.",
      exploitation: "Preuve : synthèse archivée. Action : mise à jour du panorama des outils de l'exercice 3.",
    },
    {
      lien: "https://www.ademe.fr/",
      titreLien: "ADEME",
      titre: "Impact environnemental du numérique et de l'IA : travaux de l'agence",
      date: "Juin 2026",
      commentaire: "Travaux sur l'empreinte environnementale des services numériques et des usages de l'IA, utilisés pour la règle d'usage sobre de la charte, sans chiffre non sourcé.",
      exploitation: "Preuve : extrait archivé. Action : mise à jour de la partie impact environnemental du chapitre C5.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedIAP21AICaches(f: FormationInfo = FORMATION_IAP21): void {
  try {
    setCachedContentPack(f, IAP21_CONTENT_PACK);
    setCachedEvalPack(f, IAP21_EVAL_PACK);
    setCachedVeillePack(f, IAP21_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
