/**
 * Preset complet « Formation de formateur professionnel pour adultes (TP FPA – RNCP37275) » — formation
 * CERTIFIANTE préparant aux compétences des 4 CCP du titre professionnel Formateur professionnel d'adultes
 * (RNCP37275, niveau 5, Ministère du Travail, du Plein emploi et de l'Insertion).
 * Données de l'organisme (bilan pédagogique et financier 2025 et tableau de suivi) :
 * 45 heures, entièrement à distance en classe virtuelle (Google Meet / Zoom), formateur unique, 1 stagiaire,
 * tarif 2 870 €, financement CPF, spécialité 333 « Enseignement, formation », session du 07/04/2025 au 17/04/2025.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - 6 modules (C1 à C6 = modules 1 à 6 : 2 h, 12 h, 12 h, 9 h, 7 h, 3 h)
 *  - fil rouge FICTIF (personnes et situations fictives : Inès, formatrice en devenir ; l'organisme
 *    Horizon Compétences à Rivaulieu ; le commanditaire Logistique Morvaine ; les apprenants Karim, Sonia,
 *    Paul et Mélissa)
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées et 6 QCM de 10 questions,
 *    un par compétence
 *  - Pack évaluation : QCM de positionnement de début (10 questions), QCM de fin (12 questions),
 *    cas pratique intermédiaire, évaluation finale interne
 *  - Pack veille (réglementaire / métier / technologique), sources officielles uniquement
 * La formation de 45 h prépare aux compétences des 4 CCP ; elle ne remplace ni le parcours complet ni la
 * période en entreprise ; le passage des épreuves devant un jury habilité est obligatoire pour obtenir le titre.
 * Réglementation en vigueur au 11 novembre 2026. Le support de cours (6 chapitres) est dans `fpa45h/` ;
 * les réponses propres à chaque stagiaire dans `fpa45hHumanized.ts`. Aucune donnée de satisfaction n'est pré-remplie.
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
export const FORMATION_FPA45: FormationInfo = {
  intitule: "Formation de formateur professionnel pour adultes (TP FPA – RNCP37275)",
  codeRNCP: "RNCP37275",
  objectifs:
    "Formation certifiante. Objectif général : préparer aux compétences du titre professionnel Formateur professionnel d'adultes (RNCP37275, niveau 5), pour concevoir, animer, évaluer et accompagner des formations multimodales destinées à des adultes, dans une démarche de qualité et de responsabilité sociale des entreprises. La formation prépare aux 4 certificats de compétences professionnelles (CCP) du titre : CCP 1 (RNCP37275BC01) Concevoir et préparer la formation ; CCP 2 (RNCP37275BC02) Animer une formation et évaluer les acquis des apprenants ; CCP 3 (RNCP37275BC03) Accompagner les apprenants en formation ; CCP 4 (RNCP37275BC04) Inscrire sa pratique professionnelle dans une démarche de qualité et de responsabilité sociale des entreprises.\nÀ l'issue de la formation, le stagiaire sera capable de :\n- C1 — Situer le métier de formateur, le titre FPA (RNCP37275) et l'environnement de la formation professionnelle (acteurs, financements dont le CPF, obligations de l'organisme, Qualiopi).\n- C2 — Concevoir et préparer une formation multimodale : analyse de la demande, objectifs, progression, scénario pédagogique et d'accompagnement, activités d'apprentissage et d'évaluation.\n- C3 — Animer une formation en présentiel et à distance, évaluer les acquis et remédier aux difficultés individuelles.\n- C4 — Accueillir un apprenant, co-construire son parcours, le tutorer à distance et accompagner son développement professionnel.\n- C5 — Inscrire sa pratique dans une démarche de qualité et de RSE : réglementation de la formation (Code du travail, Qualiopi), accessibilité et handicap, RGPD, prévention des violences et du harcèlement, veille, analyse de pratique.\n- C6 — Créer des supports et ressources asynchrones (PowerPoint, Canva, Genially, capsule vidéo) et préparer le dossier professionnel, les dossiers techniques et l'oral devant le jury.",
  prerequis:
    "Être titulaire d'un diplôme ou d'un titre de niveau 4 (baccalauréat) et justifier d'au moins 3 ans d'expérience professionnelle dans un domaine précis (la spécialité que le futur formateur enseignera), ou d'un niveau 3 (CAP, BEP) avec 3 à 5 ans d'expérience professionnelle dans ce domaine. Maîtrise des outils bureautiques (traitement de texte, tableur, logiciel de présentation) et de la navigation sur internet. Bonne maîtrise du français à l'oral et à l'écrit. Disposer d'un ordinateur avec webcam, micro et connexion internet stable pour les classes virtuelles.",
  duree: "45 heures",
  dureeSaisiePrioritaire: true,
  modalites: "distanciel",
  tarif: "2 870 €",
  programme:
    "Module 1 — Le métier de formateur d'adultes, le titre FPA et l'environnement de la formation professionnelle (C1, 2 h) : QCM de positionnement et questions ouvertes ; présentation du titre professionnel Formateur professionnel d'adultes (RNCP37275, niveau 5), de ses 4 CCP et de la session de validation ; activités et contextes d'exercice du formateur (salarié d'organisme, indépendant, formateur interne) ; acteurs de la formation professionnelle (État, régions, France Compétences, opérateurs de compétences, France Travail, Caisse des dépôts, Agefiph) ; financements dont le compte personnel de formation (Mon Compte Formation) ; définition de l'action de formation (art. L6313-1 et L6313-2 du Code du travail) ; obligations de l'organisme (déclaration d'activité, règlement intérieur, convention ou contrat, attestation, bilan pédagogique et financier) ; certification Qualiopi ; présentation du fil rouge fictif (Inès, Horizon Compétences, Logistique Morvaine) ; mise en situation 1 ; QCM C1.\nModule 2 — CCP 1 (RNCP37275BC01) Concevoir et préparer la formation (C2, 12 h) : analyse d'une demande de formation et rédaction d'un cahier des charges ; conditions d'apprentissage de l'adulte (Knowles) ; ingénierie ADDIE ; objectifs pédagogiques opérationnels et SMART, taxonomie de Bloom ; progression pédagogique d'une formation multimodale (présentiel, distanciel synchrone et asynchrone, formation en situation de travail) ; scénario pédagogique et d'accompagnement ; méthodes pédagogiques (expositive, démonstrative, interrogative, active, expérientielle, classe inversée) ; conception d'activités d'apprentissage et d'évaluation, grilles critériées ; préparation des séances et de la logistique ; mises en situation 2 et 3 ; QCM C2.\nModule 3 — CCP 2 (RNCP37275BC02) Animer une formation et évaluer les acquis des apprenants (C3, 12 h) : posture du formateur, ouverture et clôture de séance, consignes, gestion du temps ; animation en présentiel et en classe virtuelle (outils collaboratifs, interactions, engagement à distance) ; dynamique et gestion de groupe, situations difficiles ; feedback ; évaluation diagnostique, formative et sommative ; construction et correction d'une évaluation ; modèle de Kirkpatrick (4 niveaux) ; repérage des difficultés individuelles et remédiation ; mises en situation 4 et 5 ; QCM C3 ; cas pratique intermédiaire (fin du module 3).\nModule 4 — CCP 3 (RNCP37275BC03) Accompagner les apprenants en formation (C4, 9 h) : accueil d'un apprenant, entretien de positionnement et co-construction du parcours individualisé ; contrat pédagogique ; adaptation aux personnes en situation de handicap (référent handicap, compensation, Agefiph) et aux publics éloignés de l'écrit ou du numérique ; tutorat à distance et assistance technique et pédagogique en formation à distance (art. D6313-3-1) ; relances, suivi de l'assiduité et prévention des abandons ; accompagnement du développement professionnel (projet, portfolio de compétences, insertion) ; mises en situation 6 et 7 ; QCM C4.\nModule 5 — CCP 4 (RNCP37275BC04) Qualité, RSE, réglementation, veille et analyse de pratique (C5, 7 h) : réglementation de la formation (Code du travail) et de sa spécialité ; référentiel national qualité mis à jour par le décret n° 2026-728 du 1er août 2026 (7 critères, 33 indicateurs, en vigueur au 1er novembre 2026) et guide de lecture de novembre 2026 ; accessibilité et handicap, accessibilité numérique (RGAA) ; protection des données personnelles (RGPD) ; sécurité, santé, prévention des violences, du harcèlement et des discriminations ; responsabilité sociale des entreprises ; veille pédagogique, réglementaire et métier ; analyse de pratique (cycle de Kolb) ; mises en situation 8 et 9 ; QCM C5.\nModule 6 — Supports multimodaux et préparation aux épreuves du titre (C6, 3 h) : conception de supports et ressources asynchrones (PowerPoint, Canva, Genially, capsule vidéo), règles de lisibilité et d'accessibilité, droits d'auteur ; préparation du dossier professionnel, des dossiers techniques des 4 CCP et de l'oral devant le jury ; mise en situation 10 ; QCM C6 ; évaluation finale interne ; bilan de la formation.",
  methodesEvaluation:
    "Positionnement à l'entrée : QCM de positionnement de 10 questions (corrigé et expliqué) et 10 questions ouvertes, comparés à l'évaluation de fin pour mesurer la progression ; 10 mises en situation corrigées sur un fil rouge fictif ; un QCM de 10 questions à la fin de chaque module, un par compétence (C1 à C6) ; cas pratique intermédiaire à la fin du module 3 ; évaluation finale interne à la fin du module 6 (QCM de fin de 12 questions et cas pratiques) ; test de positionnement de fin. Évaluation à chaud (questionnaire de satisfaction en fin de formation) et évaluation à froid. Attestation de fin de formation mentionnant les objectifs et le niveau d'acquisition, et certificat de réalisation.\nCertification : titre professionnel Formateur professionnel d'adultes (RNCP37275), délivré par le ministère chargé de l'emploi, composé de 4 CCP capitalisables. Épreuves officielles : CCP 1 (RNCP37275BC01) Concevoir et préparer la formation — présentation d'un projet réalisé en amont (dossier technique de 8 à 12 pages, oral de 25 min, questionnement de 10 min), soit 35 min ; CCP 2 (RNCP37275BC02) Animer une formation et évaluer les acquis des apprenants — présentation d'un projet (dossier technique de 5 à 8 pages, oral de 20 min, questionnement de 10 min), soit 30 min ; CCP 3 (RNCP37275BC03) Accompagner les apprenants en formation — présentation d'un projet (dossier technique de 7 à 10 pages, oral de 15 min, questionnement de 10 min) et entretien technique de 20 min, soit 45 min ; CCP 4 (RNCP37275BC04) Inscrire sa pratique professionnelle dans une démarche de qualité et de responsabilité sociale des entreprises — mise en situation professionnelle de 55 min (tirage au sort d'un sujet parmi 6, 45 min de préparation d'une analyse de pratique sur une situation vécue, 10 min d'oral, au début de l'examen) et questionnement à partir de production (dossier technique de 10 à 15 pages, oral de 15 min, questionnement de 10 min), soit 1 h 20. Session de validation devant un jury de professionnels habilité par le représentant territorial du ministère chargé de l'emploi (DREETS), sur la base du dossier professionnel (DP) et des résultats des évaluations passées en cours de formation. Le passage des épreuves est obligatoire pour obtenir le titre ; la formation de 45 h prépare aux compétences des 4 CCP et ne remplace ni le parcours complet ni la période en entreprise. Le titre peut aussi être obtenu par CCP capitalisables ou par la validation des acquis de l'expérience.",
  moyensPedagogiques:
    "Formation entièrement à distance, en classe virtuelle synchrone (Google Meet / Zoom) animée par un formateur unique. Apports structurés appuyés sur un support de cours en 6 chapitres, mises en situation sur un fil rouge fictif (personnes et situations fictives : Inès, formatrice en devenir ; l'organisme Horizon Compétences à Rivaulieu ; le commanditaire Logistique Morvaine ; les apprenants Karim, Sonia, Paul et Mélissa), QCM corrigés. Outils de conception de supports : PowerPoint, Canva, Genially, outil de capsule vidéo. Modèles de documents fournis : cahier des charges, progression, scénario pédagogique, grilles d'évaluation, contrat pédagogique, plan de tutorat, modèles de dossier professionnel (DP) et de dossiers techniques des 4 CCP. Partage d'écran, tableau blanc et documents partagés ; supports transmis au format numérique. Le stagiaire dispose d'un ordinateur avec webcam, micro et connexion internet ; un test technique est proposé avant la première séance.",
  publicVise:
    "Professionnels expérimentés dans un métier qui souhaitent transmettre leur savoir-faire et devenir formateurs d'adultes : personnes en reconversion, salariés appelés à former en interne, formateurs occasionnels ou indépendants souhaitant faire reconnaître leurs compétences, demandeurs d'emploi. Formation individuelle, en classe virtuelle.",
  delaiAcces: "14 jours minimum entre la demande d'inscription et l'entrée en formation (11 jours ouvrés minimum pour un financement CPF).",
  dateDebut: "2025-04-07",
  dateFin: "2025-04-17",
  lieu: "Google Meet / Zoom",
  nombreParticipants: "1",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Comprendre le métier de formateur d'adultes, le titre FPA (RNCP37275) et ses 4 CCP.",
  "Se repérer dans l'environnement de la formation professionnelle : acteurs, financements, CPF, obligations de l'organisme, Qualiopi.",
  "Savoir analyser une demande de formation et rédiger des objectifs pédagogiques opérationnels.",
  "Construire une progression et un scénario pédagogique multimodal (présentiel, distanciel, situation de travail).",
  "Animer une séance en présentiel et en classe virtuelle, et gérer un groupe d'adultes.",
  "Concevoir des évaluations, corriger avec une grille critériée et remédier aux difficultés individuelles.",
  "Accueillir un apprenant, co-construire son parcours et adapter la formation aux situations de handicap.",
  "Tutorer des apprenants à distance et prévenir les abandons.",
  "Connaître la réglementation, la démarche qualité, le RGPD, l'accessibilité et la prévention des violences et du harcèlement.",
  "Réaliser des supports multimodaux et préparer le dossier professionnel, les dossiers techniques et l'oral devant le jury.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins est conduite avant l'entrée en formation (entretien individuel et questionnaire préalable, vérification des prérequis : niveau de diplôme et années d'expérience dans la spécialité) puis à l'ouverture du module 1 : QCM de positionnement de 10 questions sur les notions clés du métier de formateur, comparé à l'évaluation de fin pour mesurer la progression, et 10 questions ouvertes sur la représentation que le stagiaire se fait de la conception, de l'animation, de l'évaluation et de l'accompagnement. La formation est suivie individuellement, à distance, en classe virtuelle ; le stagiaire est un professionnel expérimenté qui veut transmettre son métier.</p>
<ul>
  <li><strong>Se situer et concevoir (C1, C2)</strong> : comprendre le titre et l'environnement de la formation, analyser une demande, rédiger des objectifs, construire une progression et un scénario multimodal.</li>
  <li><strong>Animer, évaluer et accompagner (C3, C4)</strong> : conduire une séance en présentiel et à distance, évaluer les acquis, remédier, accueillir et tutorer les apprenants.</li>
  <li><strong>Inscrire sa pratique dans la qualité et préparer le titre (C5, C6)</strong> : respecter la réglementation, conduire une veille, analyser sa pratique, produire des supports et préparer le dossier professionnel et les épreuves des 4 CCP.</li>
</ul>
<p>Les mises en situation reposent sur un fil rouge fictif (personnes et situations fictives : Inès, formatrice en devenir ; l'organisme Horizon Compétences à Rivaulieu ; le commanditaire Logistique Morvaine ; les apprenants Karim, Sonia, Paul et Mélissa) ; elles sont ensuite transposées à la spécialité professionnelle du stagiaire, qui servira de support à son dossier professionnel.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Rythme individuel</strong> : formation suivie seul avec le formateur ; les notions non acquises au positionnement sont reprises en priorité et chaque mise en situation est transposée à la spécialité du stagiaire.</li>
  <li><strong>Situation de handicap</strong> : référent handicap présenté au démarrage, entretien d'aménagement sur demande, supports adaptés (police agrandie, sous-titrage des capsules, transcription écrite), pauses supplémentaires, aménagement de la durée des évaluations ; information sur l'appui de l'Agefiph et sur les aménagements possibles des épreuves du titre.</li>
  <li><strong>Difficultés avec l'écrit (illettrisme)</strong> : consignes reformulées à l'oral, modèles de documents pré-structurés, dictée vocale autorisée pour les productions, relecture accompagnée du dossier professionnel, orientation possible vers un dispositif de remise à niveau.</li>
  <li><strong>Fracture numérique</strong> : test technique avant la première séance, tutoriel de connexion, prise en main guidée des outils (Google Meet / Zoom, Canva, Genially) en partage d'écran, solution de repli par téléphone en cas de coupure, supports téléchargeables consultables hors connexion.</li>
  <li><strong>Contraintes personnelles et professionnelles</strong> : planning des classes virtuelles fixé avec le stagiaire, supports envoyés à l'avance, travaux intersession dimensionnés.</li>
</ul>`;

/** 10 mises en situation corrigées (C1 à C6), fil rouge fictif. */
export const FPA45_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — C1 : situer le métier, le titre FPA et l'environnement de la formation professionnelle",
    consigne:
      "Personnes et situations fictives. Inès, ancienne cheffe d'équipe logistique en reconversion, rejoint l'organisme de formation fictif Horizon Compétences, à Rivaulieu (ville fictive). Sa responsable lui demande une note de présentation pour les nouveaux formateurs. 1. Présentez le titre professionnel Formateur professionnel d'adultes : code, niveau, certificateur, nombre et intitulés des CCP. 2. Qu'est-ce qu'une action de formation au sens du Code du travail ? 3. Citez cinq acteurs de la formation professionnelle et leur rôle. 4. Un futur apprenant souhaite utiliser son compte personnel de formation : comment procède-t-il et quel délai respecter avant l'entrée en formation ? 5. Citez quatre obligations administratives de l'organisme de formation. 6. Qu'apporte la certification Qualiopi à Horizon Compétences ?",
    reponseAttendue:
      "Titre : Formateur professionnel d'adultes, RNCP37275, niveau 5, délivré par le ministère chargé de l'emploi (Ministère du Travail, du Plein emploi et de l'Insertion) ; 4 CCP capitalisables : CCP 1 Concevoir et préparer la formation, CCP 2 Animer une formation et évaluer les acquis des apprenants, CCP 3 Accompagner les apprenants en formation, CCP 4 Inscrire sa pratique professionnelle dans une démarche de qualité et de responsabilité sociale des entreprises ; titre accessible aussi par la VAE.\nAction de formation (art. L6313-1 et L6313-2 du Code du travail) : parcours pédagogique permettant d'atteindre un objectif professionnel, avec des objectifs, un accompagnement et une évaluation ; elle peut être réalisée en tout ou partie à distance ou en situation de travail.\nActeurs : l'État (réglementation, titres professionnels), les régions (formation des demandeurs d'emploi), France Compétences (régulation, répertoires nationaux), les opérateurs de compétences (financement des entreprises), France Travail, la Caisse des dépôts (gestion de Mon Compte Formation), l'Agefiph (compensation du handicap), les organismes de formation.\nCPF : demande sur Mon Compte Formation, choix de la session, validation de la proposition ; l'entrée en formation intervient au plus tôt 11 jours ouvrés après la validation de la demande.\nObligations : déclaration d'activité (L6351-1), règlement intérieur (L6352-3), convention ou contrat de formation (L6353-1 et suivants), attestation de fin de formation et certificat de réalisation, bilan pédagogique et financier (L6352-11).\nQualiopi (L6316-1) : certification qualité obligatoire pour recevoir des fonds publics ou mutualisés, dont le CPF ; référentiel national qualité de 7 critères et 33 indicateurs depuis le 1er novembre 2026.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C2 : analyser la demande de Logistique Morvaine et rédiger les objectifs",
    consigne:
      "Personnes et situations fictives. Logistique Morvaine, entrepôt fictif de 80 salariés, demande à Horizon Compétences une formation multimodale de 14 h « Accueillir et former les nouveaux préparateurs de commandes » : sécurité, gestes et postures, logiciel de préparation, qualité. Inès est chargée de la conception. 1. Quelles questions pose-t-elle au commanditaire pour analyser la demande ? 2. Distinguez demande, besoin et objectif. 3. Rédigez l'objectif général et quatre objectifs pédagogiques opérationnels, en vous appuyant sur la taxonomie de Bloom et la méthode SMART. 4. Quels éléments du cahier des charges formalise-t-elle ? 5. Quelles conditions d'apprentissage de l'adulte doit-elle intégrer ?",
    reponseAttendue:
      "Questions : contexte et enjeux (turnover, erreurs de préparation, accidents), public (nombre, profils, niveau à l'écrit et au numérique, situations de handicap), compétences attendues au poste, indicateurs de réussite, contraintes (horaires d'équipe, locaux, matériel, logiciel), budget, calendrier, tuteurs disponibles dans l'entrepôt.\nDemande : ce qu'exprime le commanditaire (« former les nouveaux ») ; besoin : écart entre les compétences attendues et les compétences actuelles ; objectif : ce que l'apprenant sera capable de faire à l'issue de la formation.\nObjectif général : à l'issue de la formation, le nouveau préparateur sera capable de préparer des commandes en sécurité, dans les délais et sans erreur, avec le logiciel de l'entrepôt. Objectifs opérationnels (verbe d'action observable, conditions, critères) : appliquer les règles de circulation et de sécurité de l'entrepôt sans écart lors d'une préparation observée ; réaliser les gestes de manutention selon les principes d'économie d'effort ; utiliser le logiciel de préparation pour traiter une commande complète sans erreur ; contrôler une commande et signaler une non-conformité selon la procédure qualité. Bloom : niveaux appliquer et analyser plutôt que connaître.\nCahier des charges : contexte, public, objectifs, contenus, durée et modalités (présentiel, distanciel, situation de travail), moyens, modalités d'évaluation, indicateurs, planning, budget.\nAdulte (Knowles) : besoin de savoir pourquoi il apprend, appui sur son expérience, orientation vers des problèmes concrets, motivation interne, autonomie ; donc des cas réels de l'entrepôt et des mises en pratique.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C2 : construire la progression et le scénario pédagogique multimodal",
    consigne:
      "Personnes et situations fictives. À partir des objectifs validés avec Logistique Morvaine, Inès construit la formation de 14 h. 1. Proposez une progression en séquences en répartissant présentiel, distanciel synchrone, distanciel asynchrone et formation en situation de travail. 2. Pour une séquence, rédigez le scénario pédagogique : objectif, durée, méthode, activité de l'apprenant, rôle du formateur, ressources, évaluation. 3. Quelles méthodes pédagogiques retient-elle et pourquoi ? 4. Comment intègre-t-elle la classe inversée ? 5. Quelles activités d'évaluation prévoit-elle à chaque étape ? 6. Quels éléments du scénario d'accompagnement prévoit-elle ?",
    reponseAttendue:
      "Progression (du simple au complexe, du connu à l'inconnu) : séquence 1 accueil et sécurité dans l'entrepôt (présentiel, 3 h) ; séquence 2 gestes et postures (présentiel, démonstration et entraînement, 3 h) ; séquence 3 découverte du logiciel (capsule et quiz asynchrones, 2 h) ; séquence 4 prise en main du logiciel (classe virtuelle ou salle informatique, 2 h) ; séquence 5 formation en situation de travail avec un tuteur, mises en situation et séquences réflexives (art. D6313-3-2), 3 h ; séquence 6 qualité et évaluation finale (présentiel, 1 h).\nScénario d'une séquence : objectif opérationnel, durée, phases (accroche, découverte, apport, entraînement, synthèse, évaluation), méthode, consignes, activité de l'apprenant, rôle du formateur, supports et matériel, modalité d'évaluation.\nMéthodes : démonstrative pour les gestes (montrer, faire faire, faire reformuler), active et expérientielle pour les mises en situation, interrogative pour faire émerger les représentations, expositive courte pour les règles de sécurité.\nClasse inversée : capsule et quiz sur le logiciel avant la classe virtuelle ; la séance synchrone sert à pratiquer et lever les difficultés.\nÉvaluations : diagnostique à l'entrée (positionnement), formatives à chaque séquence (quiz, observation avec grille), sommative en fin de parcours (préparation complète observée avec grille critériée).\nAccompagnement : référent pédagogique, tuteur dans l'entrepôt, assistance technique et pédagogique pour le distanciel (art. D6313-3-1), points d'étape, adaptations pour les apprenants en difficulté.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C3 : animer une séance en présentiel et en classe virtuelle",
    consigne:
      "Personnes et situations fictives. Inès anime la séquence « prise en main du logiciel » pour Karim (42 ans, peu à l'aise à l'écrit), Sonia (24 ans, à l'aise avec le numérique), Paul (55 ans, RQTH, trouble auditif) et Mélissa (31 ans, demandeuse d'emploi, garde d'enfants). 1. Comment ouvre-t-elle la séance ? 2. Comment formule-t-elle une consigne efficace ? 3. En classe virtuelle, quels outils et règles utilise-t-elle pour maintenir l'engagement ? 4. Sonia termine toujours avant les autres et monopolise la parole : que fait Inès ? 5. Quelles adaptations prévoit-elle pour Paul et pour Karim ? 6. Comment clôt-elle la séance ?",
    reponseAttendue:
      "Ouverture : accueil, présentation de l'objectif et du déroulé, règles de fonctionnement (micro, caméra, conversation écrite, pauses), recueil des attentes et lien avec la séance précédente.\nConsigne : un objectif, une tâche, des conditions (durée, ressources, modalité individuelle ou en groupe), un résultat attendu ; formulée oralement et à l'écrit, reformulée par un apprenant.\nClasse virtuelle : interactions toutes les dix minutes environ, sondages, tableau blanc, salles de sous-groupes, partage d'écran par les apprenants, conversation écrite ; caméra recommandée ; supports partagés à l'avance.\nGestion de groupe : valoriser Sonia, lui confier une tâche d'approfondissement ou un rôle de pair-aidant, distribuer la parole nominativement, rappeler les règles sans la mettre en difficulté.\nPaul : placement face au formateur, micro de qualité, sous-titrage ou transcription, consignes écrites, vérification de la compréhension ; Karim : consignes orales, pictogrammes, modèles pré-remplis, binôme possible, valorisation de son expérience terrain.\nClôture : synthèse par les apprenants, évaluation formative rapide, recueil du ressenti, annonce de la suite et du travail intersession.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C3 : évaluer les acquis et remédier aux difficultés individuelles",
    consigne:
      "Personnes et situations fictives. À la fin de la séquence logiciel, Inès évalue les quatre apprenants. Karim échoue à l'étape de validation de la commande. 1. Distinguez évaluation diagnostique, formative et sommative avec un exemple pour chacune. 2. Construisez une grille critériée pour l'épreuve « traiter une commande complète dans le logiciel ». 3. Comment donne-t-elle un feedback à Karim ? 4. Comment identifie-t-elle l'origine de la difficulté et quelle remédiation propose-t-elle ? 5. Présentez les quatre niveaux du modèle de Kirkpatrick appliqués à la formation de Logistique Morvaine.",
    reponseAttendue:
      "Diagnostique : avant la formation, pour situer les acquis (test de positionnement) ; formative : pendant, pour réguler l'apprentissage (quiz, observation) ; sommative : à la fin, pour attester l'atteinte des objectifs (épreuve finale observée).\nGrille critériée : critères (identification de la commande, saisie des quantités, contrôle des références, validation, gestion d'une anomalie), indicateurs observables pour chaque critère, niveaux (acquis, en cours, non acquis), seuil de réussite défini à l'avance.\nFeedback : factuel, rapide et centré sur la tâche ; commencer par ce qui est réussi, décrire l'écart précis, proposer une piste d'amélioration, vérifier la compréhension, encourager.\nOrigine : observer, questionner, faire verbaliser la démarche ; la difficulté peut venir de la lecture des libellés, d'une étape non comprise ou du stress. Remédiation : démonstration pas à pas, fiche mémo illustrée, exercice ciblé, tutorat par un pair, nouvelle évaluation.\nKirkpatrick : niveau 1 réaction (satisfaction des apprenants), niveau 2 apprentissage (acquis mesurés par l'épreuve), niveau 3 comportement (transfert au poste, observé par le tuteur après quelques semaines), niveau 4 résultats (baisse des erreurs de préparation et des accidents dans l'entrepôt).",
    points: 20,
  },
  {
    titre: "Exercice 6 — C4 : accueillir un apprenant et co-construire son parcours",
    consigne:
      "Personnes et situations fictives. Mélissa, 31 ans, demandeuse d'emploi avec une garde d'enfants, et Paul, 55 ans, reconnu travailleur handicapé (RQTH) pour un trouble auditif, entrent en formation chez Horizon Compétences. 1. Décrivez les étapes de l'accueil d'un apprenant. 2. Comment Inès conduit-elle l'entretien de positionnement de Mélissa et co-construit-elle son parcours ? 3. Que contient le contrat pédagogique ? 4. Quelles démarches et quels interlocuteurs mobilise-t-elle pour Paul ? 5. Quels aménagements peut-elle proposer à chacun ?",
    reponseAttendue:
      "Accueil : information préalable (programme, règlement intérieur, livret d'accueil), présentation des interlocuteurs (formateur, référent pédagogique, référent handicap), visite ou prise en main des outils, recueil des attentes et des contraintes, signature des documents.\nPositionnement de Mélissa : entretien semi-directif, recueil de son projet, de son expérience et de ses contraintes, test de positionnement ; définition avec elle des objectifs, des modules allégés ou renforcés, des horaires compatibles avec la garde d'enfants et d'une part d'asynchrone ; validation conjointe.\nContrat pédagogique : objectifs, parcours et calendrier, modalités (présentiel, distanciel, situation de travail), engagements réciproques, modalités d'évaluation et de suivi, aménagements.\nPaul : référent handicap de l'organisme, entretien sur ses besoins de compensation, lien avec l'Agefiph pour les aides techniques ou humaines, avec Cap emploi ou le médecin du travail selon la situation ; confidentialité de l'information.\nAménagements : pour Paul, placement, boucle magnétique ou casque, sous-titrage, supports écrits, vérification de la compréhension ; pour Mélissa, horaires adaptés, ressources asynchrones, rattrapage des séances, points de suivi réguliers.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C4 : tutorer à distance et accompagner le développement professionnel",
    consigne:
      "Personnes et situations fictives. La partie asynchrone de la formation Logistique Morvaine se déroule sur une plateforme en ligne. Après une semaine, Mélissa ne s'est pas connectée et Karim a abandonné un quiz à mi-parcours. 1. Quelles obligations s'imposent à l'organisme pour une formation réalisée à distance ? 2. Rédigez le plan de tutorat d'Inès : fonctions du tuteur, moments, canaux. 3. Comment relance-t-elle Mélissa et Karim ? 4. Quels indicateurs suit-elle pour prévenir les abandons ? 5. Comment accompagne-t-elle le développement professionnel des apprenants à la fin du parcours ?",
    reponseAttendue:
      "Formation à distance (art. D6313-3-1) : assistance technique et pédagogique appropriée pour accompagner l'apprenant, information sur les activités pédagogiques à effectuer et leur durée moyenne, évaluations jalonnant ou concluant l'action ; preuves de réalisation (relevés de connexion, travaux rendus).\nPlan de tutorat : fonctions d'accueil et d'orientation, pédagogique (réponse aux questions, explication), méthodologique (organisation du travail), technique (accès à la plateforme), motivationnelle et socio-affective ; moments (démarrage, jalons, avant l'évaluation, fin) ; canaux (messagerie, forum, téléphone, visio), délais de réponse annoncés.\nRelances : message personnalisé et bienveillant, rappel de l'objectif, recherche de la cause (technique, organisation, motivation), proposition d'une solution concrète (rendez-vous, tutoriel, aménagement du calendrier) ; appel téléphonique si le message reste sans réponse.\nIndicateurs : connexions, temps passé, activités réalisées, résultats des quiz, messages sans réponse ; alerte à partir d'un seuil défini.\nDéveloppement professionnel : bilan des acquis, portfolio de compétences, plan d'action après la formation (prise de poste, tutorat, évolution), lien avec le tuteur en entreprise, orientation vers d'autres dispositifs (VAE, formation complémentaire).",
    points: 20,
  },
  {
    titre: "Exercice 8 — C5 : réglementation, qualité, accessibilité, RGPD et prévention des violences",
    consigne:
      "Personnes et situations fictives. Horizon Compétences prépare son audit de surveillance Qualiopi après l'entrée en vigueur du référentiel modifié. Inès doit vérifier sa pratique. 1. Quel texte a mis à jour le référentiel national qualité, à quelle date est-il entré en vigueur et combien compte-t-il de critères et d'indicateurs ? 2. Quels documents doit-elle remettre ou faire signer aux apprenants ? 3. Quelles règles du RGPD applique-t-elle aux données des apprenants (résultats, connexions, situation de handicap) ? 4. Comment rend-elle ses supports numériques accessibles ? 5. Sonia signale des remarques sexistes répétées d'un autre apprenant pendant une séance : que fait Inès ?",
    reponseAttendue:
      "Référentiel : décret n° 2026-728 du 1er août 2026, en vigueur au 1er novembre 2026 ; 7 critères et 33 indicateurs ; indicateur 32 complété par une analyse des risques, indicateur 33 créé pour les CFA ; guide de lecture de novembre 2026 (sécurité, santé, prévention des violences, du harcèlement et des discriminations : indicateurs 12, 14 et 15).\nDocuments : programme, règlement intérieur (L6352-3), convention ou contrat de formation (L6353-1 et suivants), feuilles d'émargement ou relevés de connexion, attestation de fin de formation et certificat de réalisation.\nRGPD (règlement UE 2016/679) : finalité pédagogique déterminée, minimisation des données, information des personnes, durée de conservation limitée, accès réservé, sécurité ; l'information sur le handicap reste confidentielle et n'est partagée qu'avec l'accord de la personne.\nAccessibilité : référentiel RGAA, contrastes suffisants, police lisible, textes alternatifs des images, sous-titres et transcription des vidéos, documents structurés (titres, listes), navigation au clavier.\nViolences et harcèlement : faire cesser immédiatement les propos, rappeler le règlement intérieur, échanger avec Sonia en privé, consigner les faits, alerter la direction ou le référent désigné selon la procédure de l'organisme, informer sur les recours ; suivi et mesures de prévention.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C5 : réaliser une veille et analyser sa pratique professionnelle",
    consigne:
      "Personnes et situations fictives. Lors de la classe virtuelle du jeudi, la connexion de Paul a coupé deux fois, Karim n'a pas pris la parole et Inès a dépassé le temps prévu de vingt minutes. 1. Conduisez l'analyse de pratique de cette séance selon le cycle de Kolb. 2. Quelles actions d'amélioration Inès retient-elle ? 3. Construisez son dispositif de veille : domaines, sources fiables, fréquence, exploitation. 4. Comment conserve-t-elle la preuve de sa veille et de ses actions pour la démarche qualité ? 5. En quoi la responsabilité sociale des entreprises concerne-t-elle sa pratique ?",
    reponseAttendue:
      "Kolb : expérience concrète (description factuelle de la séance), observation réfléchie (ce qui s'est passé, ressentis, effets sur les apprenants), conceptualisation abstraite (explications : activités trop longues, absence de plan de repli technique, interactions insuffisantes), expérimentation active (nouvelles pratiques testées à la séance suivante).\nActions : test technique et solution de repli par téléphone, sollicitation nominative et tâches courtes à l'écrit dans la conversation, minutage par phase et activité optionnelle à supprimer si retard, bilan avec les apprenants.\nVeille : réglementaire (Légifrance, travail-emploi.gouv.fr, France Compétences), pédagogique et métier (Centre Inffo, ressources sur la formation à distance), technologique (outils de classe virtuelle, accessibilité numérique), veille sur sa spécialité ; fréquence mensuelle, fiche de veille datée, partage en réunion d'équipe.\nPreuve : tableau de veille daté avec source, synthèse et action décidée, mise à jour des supports et des procédures.\nRSE : prise en compte de l'impact social et environnemental de sa pratique : accessibilité et inclusion, égalité de traitement et non-discrimination, prévention des risques, sobriété numérique des supports et des déplacements.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C6 : créer des supports multimodaux et préparer les épreuves du titre",
    consigne:
      "Personnes et situations fictives. Inès prépare une capsule vidéo de 4 minutes sur les règles de circulation dans l'entrepôt de Logistique Morvaine et finalise son dossier professionnel. 1. Décrivez les étapes de conception de la capsule et les règles de lisibilité et d'accessibilité. 2. Quand choisir PowerPoint, Canva ou Genially ? 3. Quelles règles respecter pour les images et les contenus d'autrui ? 4. Qu'est-ce que le dossier professionnel et comment l'organiser ? 5. Présentez les épreuves des 4 CCP : dossiers techniques, durées et contenu de l'épreuve du CCP 4. 6. Comment se prépare-t-elle à l'oral devant le jury ?",
    reponseAttendue:
      "Capsule : objectif unique, script et storyboard, durée courte, voix claire, une idée par écran, sous-titres et transcription, contrastes et police lisible, test auprès d'un apprenant, dépôt sur la plateforme avec un quiz associé.\nOutils : PowerPoint pour un diaporama structuré et des animations simples, Canva pour des visuels, affiches et infographies, Genially pour des ressources interactives (parcours, quiz, jeux).\nDroits : utiliser des contenus libres de droits ou sous licence compatible, citer les sources, obtenir l'accord des personnes filmées (droit à l'image), respecter le RGPD.\nDossier professionnel : document du candidat décrivant des exemples de pratique professionnelle pour chaque activité du titre, avec des preuves ; il est remis au jury et sert de support à l'entretien ; une pratique réelle par activité, présentée de façon précise.\nÉpreuves : CCP 1, dossier technique de 8 à 12 pages, oral de 25 min et questionnement de 10 min (35 min) ; CCP 2, dossier technique de 5 à 8 pages, oral de 20 min et questionnement de 10 min (30 min) ; CCP 3, dossier technique de 7 à 10 pages, oral de 15 min, questionnement de 10 min et entretien technique de 20 min (45 min) ; CCP 4, mise en situation professionnelle de 55 min (tirage au sort d'un sujet parmi 6, 45 min de préparation d'une analyse de pratique sur une situation vécue, 10 min d'oral, au début de l'examen) et questionnement à partir de production (dossier technique de 10 à 15 pages, oral de 15 min, questionnement de 10 min), soit 1 h 20 ; jury de professionnels habilité par la DREETS ; le passage des épreuves est obligatoire.\nOral : plan clair, respect du temps chronométré, supports sobres, exemples réels, entraînement à l'oral blanc et aux questions du jury.",
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// QCM par compétence (10 questions par compétence)
// Format lu par le générateur d'exercices : « 1) … A) …   B) … » + « 1-B  2-C … ».
// Aucune parenthèse fermante après A, B, C ou D dans les énoncés ni dans les propositions.
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

const QCM_C1: Q[] = [
  ["Quel est le niveau du titre professionnel Formateur professionnel d'adultes ?", ["Niveau 3", "Niveau 4", "Niveau 5", "Niveau 6"], 2],
  ["Combien de certificats de compétences professionnelles composent le titre FPA ?", ["Deux", "Trois", "Quatre", "Six"], 2],
  ["Quel ministère délivre le titre professionnel Formateur professionnel d'adultes ?", ["Le ministère chargé de l'emploi", "Le ministère de l'Enseignement supérieur", "Le ministère de la Culture", "Le ministère de l'Intérieur"], 0],
  ["Selon le Code du travail, l'action de formation se définit comme :", ["Une conférence ouverte au public", "Un parcours pédagogique permettant d'atteindre un objectif professionnel", "Une simple remise de documentation", "Un entretien annuel d'évaluation"], 1],
  ["Quelle plateforme permet à un actif de mobiliser son compte personnel de formation ?", ["Légifrance", "Mon Compte Formation", "Le site de l'Agefiph", "Le site de la CNIL"], 1],
  ["Pour un financement CPF, l'entrée en formation intervient au plus tôt :", ["Le lendemain de la demande", "11 jours ouvrés après la validation de la demande", "Six mois après la demande", "Après l'accord de l'employeur dans tous les cas"], 1],
  ["Quel document l'organisme de formation transmet-il chaque année sur son activité ?", ["Le bilan pédagogique et financier", "Le document unique d'évaluation des risques", "La déclaration de TVA intracommunautaire", "Le registre des visiteurs"], 0],
  ["Quel article du Code du travail fonde l'obligation de certification qualité des prestataires financés par des fonds publics ou mutualisés ?", ["L'article L6316-1", "L'article L1234-1", "L'article L3121-1", "L'article L4121-1"], 0],
  ["Combien d'indicateurs compte le référentiel national qualité en vigueur au 1er novembre 2026 ?", ["22", "28", "32", "33"], 3],
  ["Vrai ou faux : le titre FPA peut aussi être obtenu par la validation des acquis de l'expérience.", VF, 0],
];

const QCM_C2: Q[] = [
  ["Dans la démarche ADDIE, la première étape est :", ["L'analyse", "La diffusion", "L'évaluation", "L'implémentation"], 0],
  ["Un objectif pédagogique opérationnel décrit :", ["Le contenu du cours du formateur", "Un comportement observable de l'apprenant, avec des conditions et des critères", "Les intentions générales de l'entreprise", "Le budget de la formation"], 1],
  ["Lequel de ces verbes convient à un objectif opérationnel ?", ["Comprendre", "Savoir", "Prendre conscience", "Réaliser"], 3],
  ["Dans la taxonomie de Bloom révisée, quel niveau est le plus élevé ?", ["Se souvenir", "Comprendre", "Appliquer", "Créer"], 3],
  ["Selon Knowles, l'adulte en formation :", ["N'a pas besoin de savoir pourquoi il apprend", "S'appuie sur son expérience et veut des apprentissages utiles", "Apprend uniquement par la mémorisation", "Refuse toute autonomie"], 1],
  ["Une formation multimodale associe :", ["Un seul support écrit", "Plusieurs modalités : présentiel, distanciel synchrone ou asynchrone, situation de travail", "Uniquement des examens", "Plusieurs formateurs pour un même apprenant"], 1],
  ["La classe inversée consiste à :", ["Faire découvrir les contenus avant la séance et consacrer la séance à la pratique", "Faire animer toute la séance par les apprenants", "Supprimer toute évaluation", "Inverser l'ordre des modules"], 0],
  ["La méthode démonstrative repose principalement sur :", ["Un exposé magistral sans interaction", "Montrer, faire faire puis faire reformuler", "Une lecture individuelle", "Un débat sans consigne"], 1],
  ["Le scénario pédagogique précise notamment :", ["Le chiffre d'affaires de l'organisme", "Les séquences, les activités, les ressources et les évaluations", "Les coordonnées bancaires des apprenants", "Le règlement intérieur seulement"], 1],
  ["Vrai ou faux : une formation en situation de travail comporte des mises en situation et des séquences réflexives.", VF, 0],
];

const QCM_C3: Q[] = [
  ["L'évaluation formative sert principalement à :", ["Délivrer le titre", "Réguler l'apprentissage pendant la formation", "Sélectionner les candidats à l'entrée", "Mesurer la satisfaction"], 1],
  ["L'évaluation sommative intervient :", ["Avant la formation", "À la fin d'une séquence ou d'une formation pour attester des acquis", "Uniquement pendant les pauses", "Jamais en formation d'adultes"], 1],
  ["Une grille critériée permet :", ["D'évaluer de façon objective à partir de critères et d'indicateurs définis", "D'éviter de fixer un seuil de réussite", "De remplacer les objectifs", "De noter la présentation physique"], 0],
  ["Le niveau 3 du modèle de Kirkpatrick mesure :", ["La satisfaction", "Les connaissances acquises", "Le transfert des acquis en situation de travail", "Le coût de la formation"], 2],
  ["Un feedback efficace est :", ["Général et différé de plusieurs semaines", "Centré sur la personne plutôt que sur la tâche", "Factuel, précis et orienté vers l'amélioration", "Donné uniquement par écrit"], 2],
  ["En classe virtuelle, pour maintenir l'engagement, le formateur :", ["Parle sans interruption pendant une heure", "Propose des interactions fréquentes : sondages, tableau blanc, sous-groupes", "Désactive la conversation écrite", "Supprime les pauses"], 1],
  ["Une consigne efficace précise :", ["La tâche, les conditions et le résultat attendu", "Uniquement la durée", "Le nom du formateur", "La note maximale seulement"], 0],
  ["Face à un apprenant qui monopolise la parole, le formateur :", ["L'exclut de la séance", "L'ignore systématiquement", "Distribue la parole et lui confie une tâche valorisante", "Arrête la formation"], 2],
  ["La remédiation consiste à :", ["Proposer une nouvelle activité adaptée à l'origine de la difficulté", "Répéter exactement la même explication plus fort", "Passer à la suite sans en tenir compte", "Supprimer l'évaluation"], 0],
  ["Vrai ou faux : l'évaluation diagnostique se fait à l'entrée en formation pour situer les acquis.", VF, 0],
];

const QCM_C4: Q[] = [
  ["Le contrat pédagogique formalise :", ["Le salaire du formateur", "Les objectifs, le parcours, les engagements réciproques et les modalités de suivi", "Uniquement les horaires de la salle", "La liste des fournisseurs"], 1],
  ["Qui l'organisme désigne-t-il pour l'accueil des personnes en situation de handicap ?", ["Un commissaire aux comptes", "Un délégué syndical", "Un référent handicap", "Un huissier"], 2],
  ["Quelle structure peut financer des aides à la compensation du handicap pour un salarié du secteur privé ?", ["La CNIL", "L'Agefiph", "France Compétences", "Le tribunal administratif"], 1],
  ["L'information sur la situation de handicap d'un apprenant :", ["Est affichée dans la salle", "Est confidentielle et partagée seulement avec son accord", "Est transmise à tous les apprenants", "Est publiée sur le site de l'organisme"], 1],
  ["Pour une formation à distance, l'organisme doit prévoir notamment :", ["Une assistance technique et pédagogique de l'apprenant", "Un repas fourni", "Une salle de sport", "Un examen chaque jour"], 0],
  ["Quel indicateur alerte en priorité sur un risque d'abandon en formation à distance ?", ["La couleur du fond d'écran", "Le nombre de pages du support", "L'heure de fin de la séance", "L'absence de connexion et d'activité"], 3],
  ["Une relance efficace d'un apprenant inactif est :", ["Collective et anonyme", "Personnalisée, bienveillante et accompagnée d'une solution concrète", "Envoyée seulement à la fin de la formation", "Une sanction disciplinaire immédiate"], 1],
  ["L'entretien de positionnement permet de :", ["Fixer le tarif de la formation", "Recueillir le projet, les acquis et les contraintes pour individualiser le parcours", "Faire passer l'examen final", "Choisir les supports du formateur sans l'apprenant"], 1],
  ["Le portfolio de compétences sert à :", ["Rassembler les preuves des compétences acquises", "Stocker les factures", "Remplacer le règlement intérieur", "Noter les absences"], 0],
  ["Vrai ou faux : co-construire le parcours signifie que le formateur décide seul du parcours de l'apprenant.", VF, 1],
];

const QCM_C5: Q[] = [
  ["Quel décret a mis à jour le référentiel national qualité applicable au 1er novembre 2026 ?", ["Le décret n° 2026-728 du 1er août 2026", "Le décret n° 2019-564", "Un arrêté municipal", "Une circulaire de France Travail"], 0],
  ["Combien de critères compte le référentiel national qualité ?", ["5", "7", "9", "12"], 1],
  ["Le règlement intérieur de l'organisme de formation est prévu par :", ["L'article L6352-3 du Code du travail", "Le Code de la route", "Le Code civil uniquement", "Aucun texte"], 0],
  ["Le règlement européen qui encadre la protection des données personnelles est :", ["Le RGAA", "Le RGPD", "Le BPF", "Le DUERP"], 1],
  ["Le principe de minimisation du RGPD signifie :", ["Collecter le plus de données possible", "Ne collecter que les données nécessaires à la finalité", "Supprimer toutes les données le jour même", "Publier les données des apprenants"], 1],
  ["Le RGAA est le référentiel de :", ["L'accessibilité numérique", "La comptabilité publique", "L'hygiène alimentaire", "La sécurité incendie"], 0],
  ["Dans le cycle de Kolb, l'étape qui suit l'observation réfléchie est :", ["L'expérience concrète", "L'expérimentation active", "La conceptualisation abstraite", "L'évaluation sommative"], 2],
  ["Face à des propos sexistes répétés en séance, le formateur :", ["Les ignore pour ne pas perdre de temps", "Fait cesser les propos, rappelle le règlement et applique la procédure de signalement", "Demande à la victime de quitter la formation", "Attend la fin de la formation pour en parler"], 1],
  ["Une veille professionnelle efficace repose sur :", ["Des rumeurs sur les réseaux sociaux", "Des sources fiables, une fréquence définie et une exploitation tracée", "Une lecture occasionnelle sans trace", "Les seules opinions des apprenants"], 1],
  ["Vrai ou faux : la responsabilité sociale des entreprises ne concerne pas les organismes de formation.", VF, 1],
];

const QCM_C6: Q[] = [
  ["Quel outil est le plus adapté pour créer une ressource interactive avec parcours et quiz intégrés ?", ["Genially", "Un tableur", "Un logiciel de comptabilité", "Une messagerie"], 0],
  ["Une capsule vidéo pédagogique efficace :", ["Dure plus d'une heure", "Est courte, centrée sur un objectif unique et sous-titrée", "Ne comporte aucune consigne", "Reprend tout le cours sans structure"], 1],
  ["Pour utiliser une image trouvée sur internet dans un support, il faut :", ["La copier librement", "Vérifier sa licence ou utiliser une image libre de droits et citer la source", "Supprimer le nom de l'auteur", "La modifier pour la rendre méconnaissable"], 1],
  ["Le dossier professionnel du candidat au titre :", ["Est facultatif et jamais lu par le jury", "Remplace toutes les épreuves", "Présente des exemples de pratique professionnelle et sert de support au jury", "Est rédigé par l'organisme à la place du candidat"], 2],
  ["Quelle est la durée totale de l'épreuve du CCP 1 Concevoir et préparer la formation ?", ["20 min", "35 min", "45 min", "1 h 20"], 1],
  ["Combien de pages compte le dossier technique du CCP 2 ?", ["5 à 8 pages", "8 à 12 pages", "10 à 15 pages", "30 pages"], 0],
  ["L'épreuve du CCP 3 comprend, en plus de la présentation du projet :", ["Un QCM de 100 questions", "Une épreuve écrite de 4 h", "Aucun échange avec le jury", "Un entretien technique de 20 min"], 3],
  ["Au CCP 4, la mise en situation professionnelle porte sur :", ["Une analyse de pratique sur une situation vécue, à partir d'un sujet tiré au sort", "La création d'un site internet", "Un exposé libre sans préparation", "Une épreuve de langue étrangère"], 0],
  ["Qui habilite le jury de la session de validation du titre ?", ["L'organisme de formation", "Le représentant territorial du ministère chargé de l'emploi (DREETS)", "L'entreprise du candidat", "La mairie"], 1],
  ["Vrai ou faux : suivre la formation de 45 h suffit pour obtenir le titre sans passer les épreuves.", VF, 1],
];

export const FPA45_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Le métier de formateur, le titre FPA et l'environnement de la formation professionnelle", QCM_C1),
  qcmExercice("QCM C2 — Concevoir et préparer la formation (CCP 1)", QCM_C2),
  qcmExercice("QCM C3 — Animer une formation et évaluer les acquis (CCP 2)", QCM_C3),
  qcmExercice("QCM C4 — Accompagner les apprenants en formation (CCP 3)", QCM_C4),
  qcmExercice("QCM C5 — Qualité, RSE, réglementation, veille et analyse de pratique (CCP 4)", QCM_C5),
  qcmExercice("QCM C6 — Supports multimodaux et préparation aux épreuves du titre", QCM_C6),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (C1 à C6), alignées sur les 10 questions de
 * positionnement et sur les copies de `fpa45hHumanized.ts` ; les 6 QCM ensuite.
 */
export const FPA45_EXERCICES_COMPLETS: AIContentExercise[] = [...FPA45_EXERCICES, ...FPA45_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Formation de formateur professionnel pour adultes » (6 chapitres, un par module)</strong> : apports, schémas, exemples, mises en situation corrigées sur le fil rouge fictif et QCM de chaque module.</li>
  <li><strong>Modèles de documents</strong> : analyse de la demande et cahier des charges, progression pédagogique, scénario pédagogique et d'accompagnement, fiche de séance, grille d'évaluation critériée, contrat pédagogique, plan de tutorat, fiche de veille, grille d'analyse de pratique.</li>
  <li><strong>Préparation au titre</strong> : trame du dossier professionnel (DP), trames des dossiers techniques des 4 CCP, grille d'entraînement à l'oral et à l'analyse de pratique du CCP 4.</li>
  <li><strong>Fiches repères</strong> : taxonomie de Bloom, objectifs SMART, ADDIE, conditions d'apprentissage de l'adulte, modèle de Kirkpatrick, cycle de Kolb, référentiel national qualité.</li>
  <li><strong>Fil rouge fictif</strong> (personnes et situations fictives) : Inès, l'organisme Horizon Compétences à Rivaulieu, le commanditaire Logistique Morvaine, les apprenants Karim, Sonia, Paul et Mélissa.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Classe virtuelle Google Meet / Zoom</strong> : partage d'écran, tableau blanc, sondages, salles de sous-groupes, conversation écrite, documents partagés.</li>
  <li><strong>Outils de conception de supports</strong> : PowerPoint, Canva, Genially, outil d'enregistrement de capsule vidéo.</li>
  <li><strong>Équipement du stagiaire</strong> : ordinateur avec webcam et micro, connexion internet ; test technique proposé avant la première séance.</li>
  <li><strong>Supports numériques</strong> envoyés avant chaque module et conservés par le stagiaire.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>France Compétences — fiche RNCP37275</strong> : <a href="https://www.francecompetences.fr/recherche/rncp/37275/">https://www.francecompetences.fr/recherche/rncp/37275/</a> — compétences, blocs et modalités d'évaluation du titre Formateur professionnel d'adultes.</li>
  <li><strong>Ministère du Travail</strong> : <a href="https://travail-emploi.gouv.fr/">https://travail-emploi.gouv.fr/</a> — titres professionnels, formation professionnelle, Qualiopi.</li>
  <li><strong>Légifrance</strong> : <a href="https://www.legifrance.gouv.fr/">https://www.legifrance.gouv.fr/</a> — Code du travail (sixième partie, formation professionnelle), Journal officiel.</li>
  <li><strong>Mon Compte Formation</strong> : <a href="https://www.moncompteformation.gouv.fr/">https://www.moncompteformation.gouv.fr/</a> — compte personnel de formation.</li>
  <li><strong>Centre Inffo</strong> : <a href="https://www.centre-inffo.fr/">https://www.centre-inffo.fr/</a> — actualité de la formation professionnelle.</li>
  <li><strong>Agefiph</strong> : <a href="https://www.agefiph.fr/">https://www.agefiph.fr/</a> — compensation du handicap et formation.</li>
  <li><strong>CNIL</strong> : <a href="https://www.cnil.fr/">https://www.cnil.fr/</a> — protection des données personnelles.</li>
  <li><strong>RGAA</strong> : <a href="https://accessibilite.numerique.gouv.fr/">https://accessibilite.numerique.gouv.fr/</a> — référentiel général d'amélioration de l'accessibilité.</li>
</ul>`;

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
export const FPA45_VIDEOS = [
  { title: "Le métier de formateur professionnel d'adultes", description: "Activités, contextes d'exercice et titre professionnel FPA.", url: yt("titre professionnel formateur professionnel d'adultes métier") },
  { title: "Rédiger des objectifs pédagogiques", description: "Objectifs opérationnels, méthode SMART et taxonomie de Bloom.", url: yt("rédiger objectifs pédagogiques opérationnels taxonomie de Bloom") },
  { title: "La démarche ADDIE", description: "Analyse, conception, développement, mise en œuvre, évaluation.", url: yt("modèle ADDIE ingénierie pédagogique") },
  { title: "Construire un scénario pédagogique multimodal", description: "Progression, séquences, présentiel et distanciel.", url: yt("scénario pédagogique multimodal formation") },
  { title: "Animer une classe virtuelle", description: "Engagement, interactions et outils à distance.", url: yt("animer une classe virtuelle formateur") },
  { title: "Évaluer en formation", description: "Évaluation diagnostique, formative, sommative ; grille critériée.", url: yt("évaluation formative sommative grille critériée formation adultes") },
  { title: "Le modèle de Kirkpatrick", description: "Les quatre niveaux d'évaluation d'une formation.", url: yt("modèle de Kirkpatrick 4 niveaux évaluation formation") },
  { title: "Tutorat à distance", description: "Fonctions du tuteur, relances et prévention des abandons.", url: yt("tutorat à distance formation adultes") },
  { title: "Analyse de pratique et cycle de Kolb", description: "Apprendre de son expérience de formateur.", url: yt("cycle de Kolb analyse de pratique") },
  { title: "Créer une ressource avec Genially ou Canva", description: "Supports interactifs et visuels pour la formation.", url: yt("créer ressource pédagogique Genially Canva formateur") },
];

export const FPA45_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: FPA45_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: FPA45_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement de début (10 questions, une seule bonne réponse)
// et QCM de fin (12 questions sur l'ensemble des modules)
// ---------------------------------------------------------------------------
export const FPA45_POSITIONNEMENT_TITRE = "Positionnement — vos repères de départ sur le métier de formateur";
export const FPA45_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Combien de CCP composent le titre professionnel Formateur professionnel d'adultes ?", options: ["Deux", "Quatre", "Huit"], correctIndex: 1 },
  { question: "Un objectif pédagogique décrit avant tout :", options: ["Ce que l'apprenant sera capable de faire", "Ce que le formateur va dire", "Le prix de la formation"], correctIndex: 0 },
  { question: "Une formation multimodale combine :", options: ["Un seul lieu et un seul support", "Uniquement des cours magistraux", "Présentiel, distanciel et situation de travail"], correctIndex: 2 },
  { question: "Pour démarrer une séance, le formateur commence par :", options: ["Présenter l'objectif et le déroulé", "Distribuer l'évaluation finale", "Lire tout le support à voix haute"], correctIndex: 0 },
  { question: "Une évaluation réalisée pendant la formation pour ajuster l'apprentissage est dite :", options: ["Sommative", "Formative", "Certificative"], correctIndex: 1 },
  { question: "Qui accompagne les personnes en situation de handicap dans l'organisme de formation ?", options: ["Le comptable", "Le référent handicap", "Le fournisseur informatique"], correctIndex: 1 },
  { question: "En formation à distance, un apprenant ne se connecte plus : le premier réflexe est de :", options: ["Le désinscrire", "Attendre la fin de la formation", "Le relancer personnellement"], correctIndex: 2 },
  { question: "La certification qualité obligatoire pour recevoir des fonds publics ou le CPF s'appelle :", options: ["Qualiopi", "ISO 14001", "Label rouge"], correctIndex: 0 },
  { question: "Analyser sa pratique professionnelle consiste à :", options: ["Comparer son salaire", "Revenir sur une situation vécue pour en tirer des améliorations", "Noter les apprenants"], correctIndex: 1 },
  { question: "Le document qui présente au jury des exemples de la pratique du candidat s'appelle :", options: ["Le livret d'accueil", "Le règlement intérieur", "Le dossier professionnel"], correctIndex: 2 },
];

/** Explications du corrigé du positionnement, dans l'ordre des questions. */
export const FPA45_QCM_DEBUT_EXPLICATIONS: string[] = [
  "Le titre RNCP37275 comprend 4 CCP : concevoir, animer et évaluer, accompagner, qualité et RSE (module 1).",
  "Un objectif pédagogique est formulé du point de vue de l'apprenant, avec un verbe d'action observable (module 2).",
  "La multimodalité associe présentiel, distanciel synchrone ou asynchrone et formation en situation de travail (module 2).",
  "L'ouverture de séance présente l'objectif, le déroulé et les règles de fonctionnement (module 3).",
  "L'évaluation formative régule l'apprentissage en cours de formation ; la sommative atteste les acquis à la fin (module 3).",
  "Le référent handicap accueille, recueille les besoins de compensation et mobilise les partenaires (module 4).",
  "La relance personnalisée et bienveillante fait partie du tutorat et prévient les abandons (module 4).",
  "Qualiopi (art. L6316-1 du Code du travail) conditionne l'accès aux fonds publics et mutualisés, dont le CPF (module 5).",
  "L'analyse de pratique part d'une situation vécue pour en tirer des actions d'amélioration ; c'est l'objet de l'épreuve du CCP 4 (module 5).",
  "Le dossier professionnel (DP) présente des exemples de pratique et sert de support au jury (module 6).",
];

export const FPA45_QCM_FIN: AIQCMQuestion[] = [
  { question: "Le titre Formateur professionnel d'adultes est enregistré au RNCP sous le code :", options: ["RNCP37275", "RNCP247", "RS7013", "RNCP41480"], correctIndex: 0 },
  { question: "Selon les articles L6313-1 et L6313-2 du Code du travail, l'action de formation est :", options: ["Une information collective", "Un parcours pédagogique permettant d'atteindre un objectif professionnel", "Un entretien professionnel", "Une offre d'emploi"], correctIndex: 1 },
  { question: "Quel verbe convient le mieux à un objectif opérationnel ?", options: ["Connaître", "Sensibiliser", "Préparer une commande sans erreur", "Découvrir"], correctIndex: 2 },
  { question: "Dans la démarche ADDIE, l'étape qui suit l'analyse est :", options: ["La conception", "L'évaluation", "L'implémentation", "La diffusion"], correctIndex: 0 },
  { question: "Le niveau 4 du modèle de Kirkpatrick mesure :", options: ["La satisfaction", "Les acquis", "Le transfert au poste", "Les résultats pour l'organisation"], correctIndex: 3 },
  { question: "Une grille critériée comporte :", options: ["Des critères, des indicateurs observables et un seuil de réussite", "Uniquement une note sur 20", "Le nom des apprenants absents", "La liste des supports"], correctIndex: 0 },
  { question: "Pour une formation à distance, l'article D6313-3-1 du Code du travail prévoit notamment :", options: ["Un repas offert", "Une assistance technique et pédagogique de l'apprenant", "Un examen quotidien", "Un tuteur pour cinquante apprenants obligatoirement"], correctIndex: 1 },
  { question: "La co-construction du parcours d'un apprenant repose sur :", options: ["Une décision unilatérale du formateur", "Un tirage au sort des modules", "Un entretien de positionnement et un accord sur les objectifs et les modalités", "Le seul choix de l'employeur"], correctIndex: 2 },
  { question: "Le référentiel national qualité en vigueur au 1er novembre 2026 compte :", options: ["7 critères et 33 indicateurs", "5 critères et 20 indicateurs", "7 critères et 32 indicateurs", "10 critères et 50 indicateurs"], correctIndex: 0 },
  { question: "Dans le cycle de Kolb, l'étape qui consiste à tester de nouvelles pratiques s'appelle :", options: ["L'expérience concrète", "L'observation réfléchie", "La conceptualisation abstraite", "L'expérimentation active"], correctIndex: 3 },
  { question: "Au CCP 4, la mise en situation professionnelle dure :", options: ["20 min", "35 min", "55 min", "3 h"], correctIndex: 2 },
  { question: "La session de validation du titre se déroule devant :", options: ["Le seul formateur de l'organisme", "Un jury de professionnels habilité par la DREETS", "Les autres apprenants", "L'employeur du candidat"], correctIndex: 1 },
];

export const FPA45_EVAL_PACK: AIEvalPack = {
  qcmDebut: FPA45_QCM_DEBUT,
  qcmFin: FPA45_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du module 3) — la séquence « contrôle qualité » de Logistique Morvaine (personnes et situations fictives)",
    contexte:
      "Personnes et situations fictives. Logistique Morvaine constate encore des erreurs de préparation chez les nouveaux préparateurs et demande à Horizon Compétences une séquence complémentaire de 2 h sur le contrôle qualité des commandes, dont 30 minutes en classe virtuelle. Inès doit concevoir la séquence, l'animer pour Karim, Sonia, Paul et Mélissa, puis évaluer les acquis. Lors de l'essai, Paul a du mal à suivre les échanges oraux en classe virtuelle et Karim ne termine pas l'exercice écrit.",
    questions: [
      { question: "Rédigez l'objectif opérationnel de la séquence et justifiez le niveau de la taxonomie de Bloom retenu.", reponseAttendue: "Exemple : à l'issue de la séquence, le préparateur sera capable de contrôler une commande de 10 lignes et de signaler toute non-conformité selon la procédure qualité, sans erreur ; verbe observable, conditions, critère ; niveau appliquer ou analyser, car il s'agit d'un geste professionnel et non d'une simple connaissance.", points: 5 },
      { question: "Présentez le déroulé de la séquence (phases, méthodes, modalités) en répartissant présentiel et classe virtuelle.", reponseAttendue: "Accroche à partir d'erreurs réelles anonymisées, apport court sur la procédure, démonstration, entraînement en binôme sur des commandes fictives, classe virtuelle de 30 minutes pour une étude de cas et un quiz, synthèse par les apprenants ; méthodes démonstrative, active et interrogative ; consignes écrites et orales.", points: 5 },
      { question: "Quelles adaptations prévoyez-vous pour Paul et pour Karim ?", reponseAttendue: "Paul : sous-titrage ou transcription, consignes écrites dans la conversation, vérification de la compréhension, casque, référent handicap informé avec son accord. Karim : consignes orales, fiche illustrée, exercice découpé en étapes, binôme, temps supplémentaire ; remédiation ciblée après l'évaluation.", points: 5 },
      { question: "Construisez l'évaluation sommative de la séquence et précisez comment mesurer le transfert au poste.", reponseAttendue: "Contrôle observé d'une commande avec grille critériée (vérification des références, quantités, état, signalement, traçabilité), indicateurs observables, seuil de réussite ; feedback individuel. Transfert (niveau 3 de Kirkpatrick) : observation par le tuteur quelques semaines plus tard et suivi du taux d'erreurs de l'équipe par l'entreprise (niveau 4).", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — QCM de fin et cas pratiques (module 6), grille d'acquisition des compétences C1 à C6",
    exercices: [
      {
        titre: "Partie 1 — QCM de fin : 12 questions sur les six modules (C1 à C6, 30 minutes)",
        consigne: "Répondez individuellement aux 12 questions du QCM de fin (code du titre, action de formation, objectifs opérationnels, ADDIE, Kirkpatrick, grille critériée, formation à distance, co-construction du parcours, référentiel qualité, cycle de Kolb, épreuve du CCP 4, jury). Correction commentée avec le formateur.",
        reponseAttendue: "Réponses attendues : RNCP37275 ; parcours pédagogique permettant d'atteindre un objectif professionnel ; « préparer une commande sans erreur » ; la conception suit l'analyse ; niveau 4 = résultats pour l'organisation ; critères, indicateurs et seuil ; assistance technique et pédagogique ; entretien de positionnement et accord sur les objectifs ; 7 critères et 33 indicateurs ; expérimentation active ; 55 min ; jury habilité par la DREETS.",
        points: 20,
      },
      {
        titre: "Partie 2 — Concevoir une formation dans sa spécialité (C1, C2)",
        consigne: "À partir d'une demande de formation fictive dans votre propre spécialité professionnelle, rédigez l'analyse de la demande, l'objectif général, trois objectifs opérationnels et la progression d'une formation multimodale de 7 h (séquences, modalités, méthodes, évaluations).",
        reponseAttendue: "Analyse de la demande (contexte, public, besoin, contraintes, indicateurs) ; objectifs formulés avec un verbe d'action observable, des conditions et des critères ; progression du simple au complexe ; répartition présentiel, distanciel synchrone et asynchrone, situation de travail ; méthodes justifiées ; évaluations diagnostique, formative et sommative.",
        points: 20,
      },
      {
        titre: "Partie 3 — Animer et évaluer (C3)",
        consigne: "Rédigez la fiche de séance d'une séquence de 45 minutes en classe virtuelle issue de votre progression : ouverture, consignes, interactions prévues, gestion d'une situation difficile, évaluation formative et clôture. Joignez la grille critériée de l'évaluation sommative.",
        reponseAttendue: "Ouverture (objectif, déroulé, règles), consignes complètes (tâche, conditions, résultat), interactions toutes les dix minutes environ (sondage, tableau blanc, sous-groupes), réponse adaptée à un apprenant qui monopolise la parole ou décroche, évaluation formative et feedback, clôture avec synthèse ; grille avec critères, indicateurs et seuil.",
        points: 20,
      },
      {
        titre: "Partie 4 — Accompagner les apprenants (C4)",
        consigne: "Personnes et situations fictives. Un apprenant de votre formation est en situation de handicap et un autre ne se connecte plus à la partie asynchrone. Décrivez l'accueil, la co-construction du parcours, les aménagements, le plan de tutorat et les relances.",
        reponseAttendue: "Accueil et entretien de positionnement, contrat pédagogique ; référent handicap, besoins de compensation, Agefiph, confidentialité ; aménagements de supports, de rythme et d'évaluation ; tutorat (fonctions, moments, canaux, délais), indicateurs de suivi, relance personnalisée avec solution concrète ; obligations de la formation à distance (art. D6313-3-1).",
        points: 20,
      },
      {
        titre: "Partie 5 — Qualité, RSE, analyse de pratique et préparation du titre (C5, C6)",
        consigne: "Rédigez une analyse de pratique d'une séance que vous avez animée selon le cycle de Kolb (en 10 minutes d'oral, comme au CCP 4), puis présentez votre plan de veille, deux obligations réglementaires de l'organisme, une règle du RGPD et une règle d'accessibilité appliquées à vos supports, ainsi que votre plan de préparation du dossier professionnel et des dossiers techniques.",
        reponseAttendue: "Kolb : expérience, observation réfléchie, conceptualisation, expérimentation active, actions d'amélioration ; veille (sources fiables, fréquence, traces) ; règlement intérieur, convention ou contrat, attestation, référentiel qualité de 33 indicateurs ; RGPD : finalité, minimisation, conservation limitée ; RGAA : contrastes, sous-titres, textes alternatifs ; DP et dossiers techniques des 4 CCP avec leurs volumes et durées d'oral, entraînement à l'oral ; passage des épreuves obligatoire devant un jury habilité.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille (sources officielles uniquement)
// ---------------------------------------------------------------------------
export const FPA45_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.francecompetences.fr/recherche/rncp/37275/",
      titreLien: "France Compétences — fiche RNCP37275",
      titre: "Titre professionnel Formateur professionnel d'adultes : blocs de compétences et modalités d'évaluation",
      date: "Novembre 2026",
      commentaire: "La fiche RNCP37275 (niveau 5, enregistrée jusqu'au 29/04/2028, remplace RNCP247) décrit les 4 blocs de compétences et les épreuves de chaque CCP ; elle est vérifiée avant chaque session pour aligner le programme et la préparation aux épreuves.",
      exploitation: "Preuve : capture datée de la fiche archivée au dossier qualité. Action : contrôle des intitulés des CCP, des durées d'épreuve et du volume des dossiers techniques présentés en formation.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — Journal officiel et Code du travail",
      titre: "Référentiel national qualité modifié par le décret n° 2026-728 du 1er août 2026",
      date: "Novembre 2026",
      commentaire: "Le référentiel national qualité compte 7 critères et 33 indicateurs depuis le 1er novembre 2026 ; l'indicateur 32 est complété par une analyse des risques et un indicateur 33 est créé pour les CFA. Le guide de lecture de novembre 2026 précise les attendus en matière de sécurité, de santé et de prévention des violences, du harcèlement et des discriminations.",
      exploitation: "Preuve : note interne datée. Action : mise à jour de la procédure de prévention et de signalement, du livret d'accueil et du module 5.",
    },
    {
      lien: "https://travail-emploi.gouv.fr/",
      titreLien: "Ministère du Travail — titres professionnels et formation professionnelle",
      titre: "Organisation des sessions de validation des titres professionnels",
      date: "Octobre 2026",
      commentaire: "Les titres professionnels sont délivrés par le ministère chargé de l'emploi selon l'arrêté du 22 décembre 2015 modifié ; la session de validation se tient devant un jury habilité par la DREETS, sur la base du dossier professionnel et des résultats des évaluations passées en cours de formation.",
      exploitation: "Preuve : fiche d'information remise au stagiaire. Action : information sur l'inscription à une session de validation et sur l'obligation de passer les épreuves.",
    },
    {
      lien: "https://www.moncompteformation.gouv.fr/",
      titreLien: "Mon Compte Formation — compte personnel de formation",
      titre: "Inscription par le CPF et délai d'entrée en formation",
      date: "Septembre 2026",
      commentaire: "La formation est financée par le compte personnel de formation : la demande est faite sur Mon Compte Formation et l'entrée en formation intervient au plus tôt 11 jours ouvrés après sa validation ; la fiche de la formation reprend le code RNCP37275.",
      exploitation: "Preuve : contrôle du délai consigné dans le dossier du stagiaire. Action : planification des dates d'entrée en respectant 14 jours minimum et 11 jours ouvrés pour le CPF.",
    },
  ],
  metier: [
    {
      lien: "https://www.centre-inffo.fr/",
      titreLien: "Centre Inffo — actualité de la formation professionnelle",
      titre: "Évolutions des pratiques des formateurs et de la multimodalité",
      date: "Octobre 2026",
      commentaire: "Les publications de Centre Inffo sur la formation à distance, la formation en situation de travail et l'ingénierie multimodale alimentent les modules 2 à 4 et les exemples de la préparation au CCP 1.",
      exploitation: "Preuve : tableau de veille daté avec sources et synthèses. Action : actualisation des exemples de scénarios multimodaux du support de cours.",
    },
    {
      lien: "https://www.agefiph.fr/",
      titreLien: "Agefiph — handicap et formation",
      titre: "Compensation du handicap en formation et rôle du référent handicap",
      date: "Septembre 2026",
      commentaire: "Les aides et services de l'Agefiph pour compenser le handicap en formation sont présentés au module 4 ; ils servent de base à la mise en situation 6 (accueil de Paul, apprenant fictif reconnu travailleur handicapé).",
      exploitation: "Preuve : fiche ressource déposée avec les supports. Action : question systématique sur les besoins d'aménagement dans l'analyse des besoins et aménagement des évaluations sur demande.",
    },
    {
      lien: "https://www.cnil.fr/",
      titreLien: "CNIL — protection des données personnelles",
      titre: "Données des apprenants : finalité, minimisation et conservation",
      date: "Août 2026",
      commentaire: "Résultats d'évaluation, relevés de connexion et informations sur le handicap sont des données personnelles : finalité pédagogique, minimisation, information des personnes et durée de conservation limitée, conformément au règlement (UE) 2016/679.",
      exploitation: "Preuve : mention d'information ajoutée au livret d'accueil. Action : aucun enregistrement des séances sans accord du stagiaire ; résultats communiqués au seul stagiaire et au formateur.",
    },
    {
      lien: "https://travail-emploi.gouv.fr/",
      titreLien: "Ministère du Travail — formation professionnelle",
      titre: "Action de formation, formation à distance et formation en situation de travail",
      date: "Juillet 2026",
      commentaire: "Les règles applicables à l'action de formation (art. L6313-1 et L6313-2), à la formation à distance (art. D6313-3-1) et à la formation en situation de travail (art. D6313-3-2) sont rappelées aux modules 1, 2 et 4.",
      exploitation: "Preuve : fiche mémo archivée au dossier qualité. Action : vérification des preuves de réalisation à distance (relevés de connexion, travaux rendus) pour chaque session.",
    },
  ],
  technologique: [
    {
      lien: "https://accessibilite.numerique.gouv.fr/",
      titreLien: "RGAA — référentiel général d'amélioration de l'accessibilité",
      titre: "Accessibilité numérique des supports et des ressources asynchrones",
      date: "Octobre 2026",
      commentaire: "Le RGAA sert de référence pour rendre accessibles les supports PowerPoint, Canva et Genially et les capsules vidéo : contrastes, textes alternatifs, sous-titres, structure des documents, navigation au clavier.",
      exploitation: "Preuve : liste de contrôle d'accessibilité datée jointe aux supports. Action : vérification de chaque nouveau support avant diffusion au module 6.",
    },
    {
      lien: "https://www.cnil.fr/",
      titreLien: "CNIL — outils numériques et données",
      titre: "Classes virtuelles et outils collaboratifs : bonnes pratiques",
      date: "Septembre 2026",
      commentaire: "Le choix et le paramétrage des outils de classe virtuelle et des plateformes (Google Meet, Zoom, outils de création de ressources) tiennent compte de la protection des données et de la sécurité des accès.",
      exploitation: "Preuve : fiche de paramétrage des outils datée. Action : liens de séance individuels, salle d'attente activée, partage de documents restreint.",
    },
    {
      lien: "https://www.centre-inffo.fr/",
      titreLien: "Centre Inffo — innovation pédagogique",
      titre: "Ressources interactives et capsules vidéo en formation d'adultes",
      date: "Août 2026",
      commentaire: "Suivi des usages des capsules vidéo, des ressources interactives et des outils d'intelligence artificielle en formation : intérêt pédagogique, limites, vigilance sur les droits d'auteur et les données.",
      exploitation: "Preuve : synthèse de veille datée. Action : mise à jour de la fiche « Créer une capsule vidéo » et des exemples Genially du module 6.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedFPA45AICaches(f: FormationInfo = FORMATION_FPA45): void {
  try {
    setCachedContentPack(f, FPA45_CONTENT_PACK);
    setCachedEvalPack(f, FPA45_EVAL_PACK);
    setCachedVeillePack(f, FPA45_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
