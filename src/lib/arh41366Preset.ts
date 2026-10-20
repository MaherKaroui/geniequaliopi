/**
 * Preset complet « Titre Professionnel Assistant Ressources Humaines (TP ARH) – RNCP41366 »
 * — titre professionnel de niveau 5 du ministère du Travail (code titre TP-01284), enregistré au RNCP le
 * 05/11/2025 jusqu'au 04/11/2027 ; 2 blocs (CCP) et 6 compétences professionnelles (CP1 à CP6).
 * Préparé par apprentissage : 420 h au CFA sur 12 mois, 1 semaine au CFA / 3 semaines en entreprise,
 * classes virtuelles (Google Meet / Zoom).
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - Formation 420 h découpée selon le référentiel : accueil et méthodologie (14 h), CP1 (98 h), CP2 (56 h),
 *    CP3 (56 h), CP4 (49 h), CP5 (63 h), CP6 (49 h), préparation au titre (35 h)
 *  - AUCUN organisme ni apprenti pré-importé ; le formateur du dossier est conservé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées (diagnostic puis CP1 à CP6)
 *    puis 6 QCM de 10 questions, un par compétence professionnelle
 *  - Pack évaluation : QCM de positionnement début / fin, cas intermédiaire, évaluation finale sur le modèle
 *    de l'épreuve du titre (mise en situation professionnelle de 3 h 30, entretien technique, entretien final)
 *  - Pack veille (réglementaire / métier / technologique)
 * Fil rouge fictif : ALTÉA SERVICES, SAS de propreté et de services aux entreprises (Créteil, 148 salariés,
 * IDCC 3043) ; salariés et candidats fictifs. Les réponses propres à chaque apprenti sont produites par
 * `arh41366Humanized.ts`.
 */
import type { FormationInfo, ReferentielAnalyse } from "@/types/qualiopi";
import type { AIContentPack, AIContentExercise } from "./aiContentPack";
import type { AIEvalPack, AIQCMQuestion } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";
import { arh41366Production, arh41366SeanceCFA, arh41366NoteExercice } from "./arh41366Humanized";

// ---------------------------------------------------------------------------
// Référentiel officiel (fiche France Compétences RNCP41366, REAC et RE TP-01284)
// ---------------------------------------------------------------------------
export const REFERENTIEL_ARH41366: ReferentielAnalyse = {
  code: "RNCP41366",
  type: "RNCP",
  intitule: "TP - Assistant ressources humaines",
  niveau: 5,
  certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
  dateFinEnregistrement: "2027-11-04",
  actif: true,
  blocs: [
    { code: "RNCP41366BC01", intitule: "Assurer les missions opérationnelles de la gestion des ressources humaines" },
    { code: "RNCP41366BC02", intitule: "Contribuer au développement des ressources humaines" },
  ],
  prerequis: "Aucun prérequis fixé par la fiche RNCP41366 ; prérequis d'entrée définis par l'organisme (voir fiche formation).",
  publicVise: "Apprentis, salariés, demandeurs d'emploi, candidats individuels et candidats à la VAE.",
  codesRome: ["M1501", "M1502"],
  metiers: [
    "Assistant ressources humaines",
    "Assistant formation",
    "Assistant recrutement",
    "Assistant RH et paie",
    "Gestionnaire des emplois et carrières",
    "Chargé des ressources humaines",
  ],
  secteurs: [
    "Entreprises privées et publiques, cabinets de recrutement, entreprises d'emploi et associations de tous les secteurs d'activité",
  ],
  modalitesEvaluation:
    "Titre : mise en situation professionnelle (étude de cas, 3 h 30, précédée de 15 min de prise en main du poste ; documentation et notes professionnelles autorisées), entretien technique (30 min : 10 min sur les choix opérés lors de la mise en situation, 20 min sur CP1 et CP5), entretien final (20 min, avec le dossier professionnel) ; durée totale 4 h 20. Le jury s'appuie aussi sur le dossier professionnel et les résultats des évaluations passées en cours de formation. CCP1 : mise en situation professionnelle de 2 h et entretien technique de 20 min (CP1), soit 2 h 20. CCP2 : mise en situation professionnelle de 2 h et entretien technique de 20 min (CP5), soit 2 h 20.",
};

// ---------------------------------------------------------------------------
// Formation
// ---------------------------------------------------------------------------
export const FORMATION_ARH41366: FormationInfo = {
  intitule: "Titre Professionnel Assistant Ressources Humaines (TP ARH) – RNCP41366",
  codeRNCP: "RNCP41366",
  objectifs:
    "Formation certifiante.\nObjectif général : préparer par apprentissage le titre professionnel « Assistant ressources humaines » (RNCP41366, niveau 5, code titre TP-01284, ministère du Travail) pour assurer, dans le respect des règles juridiques et de confidentialité, les missions opérationnelles de la gestion des ressources humaines et contribuer au développement des ressources humaines.\nÀ l'issue de la formation, l'apprenti(e) sera capable de :\n- CCP1 / CP1 — Assurer la gestion administrative du personnel : formalités d'embauche (DPAE, registre unique du personnel, contrat de travail), dossiers individuels du personnel, gestion et suivi du temps de travail et des absences, évaluation des indemnités de fin de contrat, documents et procédures internes, réponses aux questions du personnel sur ses droits et obligations, préparation des élections professionnelles et des dossiers de consultation du CSE, veille juridique et sociale, protection des données personnelles (CNIL et RGPD).\n- CCP1 / CP2 — Assurer la gestion des variables et paramètres de paie : collecte et saisie des éléments variables (primes, acomptes, oppositions et saisies sur salaire, complémentaire santé et prévoyance), valorisation des événements liés au temps de travail, contrôle des congés payés, des absences et des arrêts de travail, dossier de paie numérisé et classement protégé, respect du calendrier de paie et de la DSN, confidentialité.\n- CCP1 / CP3 — Mettre en place et suivre les indicateurs ressources humaines : collecte et sélection des données internes et externes, calcul des indicateurs sociaux et des ratios (effectif, ETP, turnover, absentéisme, masse salariale), tableaux de bord et graphiques, mise à jour de la BDESE, index de l'égalité professionnelle et obligations liées à l'effectif, analyse écrite adaptée au destinataire.\n- CCP2 / CP4 — Contribuer aux opérations liées à la gestion des emplois et carrières : planification et suivi des entretiens professionnels et d'évaluation, supports d'entretien, exploitation des comptes rendus, actualisation des fiches de postes et des référentiels de compétences, communication avec les managers et les représentants du personnel, veille sur la législation.\n- CCP2 / CP5 — Contribuer au processus de recrutement et d'intégration du personnel : recueil du besoin, profil de poste, offre d'emploi non discriminante, choix des sources de recrutement, grille de présélection, guide et grille d'entretien, conduite d'entretien et synthèse, gestion administrative et logistique du recrutement, programme d'intégration du nouveau collaborateur.\n- CCP2 / CP6 — Contribuer à l'élaboration et au suivi du développement des compétences du personnel : recueil des demandes de formation, consultation des organismes de formation, information sur les dispositifs (CPF, période de reconversion, projet de transition professionnelle, VAE), calcul des coûts, traitement administratif et logistique, suivi budgétaire, évaluation des actions de formation.\n- Compétences transversales — Actualiser ses connaissances en gestion des ressources humaines : veille sociale et formation, application des modes opératoires en vigueur, attention continue et fiabilité des documents produits.",
  prerequis:
    "Niveau 4 (baccalauréat) ou expérience d'au moins un an dans un emploi administratif ; maîtrise du français écrit et des outils bureautiques (traitement de texte, tableur, messagerie) ; ordinateur et connexion internet stable pour les classes virtuelles. Contrat d'apprentissage signé avec une entreprise disposant d'une fonction ressources humaines. Entretien et test de positionnement à l'entrée.",
  duree: "420 heures",
  dureeSaisiePrioritaire: true,
  modalites: "distanciel",
  tarif:
    "Formation par apprentissage prise en charge par l'OPCO de l'employeur selon le niveau de prise en charge (NPEC) fixé pour le RNCP41366 ; aucun frais pour l'apprenti.",
  programme:
    "MODULE 0 — ACCUEIL, INTÉGRATION, MÉTHODOLOGIE DE L'ALTERNANCE ET DU DOSSIER PROFESSIONNEL (14 h)\nAccueil et présentation du CFA, du règlement intérieur, du référent handicap et du médiateur de l'apprentissage ; prise en main de la plateforme et des classes virtuelles ; analyse des besoins, entretien et test de positionnement ; le titre professionnel ARH (RNCP41366, TP-01284) : 2 CCP, 6 compétences, compétences transversales, modalités de l'épreuve, évaluations en cours de formation (ECF) et dossier professionnel (DP) ; livret d'apprentissage et rôle du maître d'apprentissage ; présentation du fil rouge ALTÉA SERVICES. Mise en situation : diagnostic de départ.\n\nBLOC 1 / CCP1 — ASSURER LES MISSIONS OPÉRATIONNELLES DE LA GESTION DES RESSOURCES HUMAINES (210 h)\n\nCP1 — Assurer la gestion administrative du personnel (98 h)\nSources du droit du travail (Code du travail, conventions et accords collectifs, IDCC, contrat, usages), recherche d'une information juridique sur Légifrance et le Code du travail numérique ; formalités d'embauche (DPAE, registre unique du personnel, visite d'information et de prévention, affiliation complémentaire santé et prévoyance) ; contrats de travail (CDI, CDD et motifs, temps partiel, intérim, contrats en alternance), mentions obligatoires et période d'essai ; dossier individuel du personnel, durées de conservation et archivage, RGPD ; durée du travail, durées maximales et repos, heures supplémentaires et complémentaires, congés payés (y compris l'acquisition pendant la maladie depuis la loi du 22 avril 2024), absences et justificatifs ; modification et suspension du contrat ; ruptures (démission, licenciement, rupture conventionnelle et TéléRC, fin de CDD), évaluation des indemnités de fin de contrat, documents de fin de contrat ; règlement intérieur, procédures internes et réponses aux questions du personnel ; CSE (seuils, attributions, consultations, BDESE), préparation des élections professionnelles ; veille juridique et sociale. Mises en situation : formalités d'embauche et dossier du personnel ; temps de travail, fin de contrat et élections du CSE.\n\nCP2 — Assurer la gestion des variables et paramètres de paie (56 h)\nStructure du bulletin de paie et règles de présentation et de diffusion (dématérialisation, conservation) ; calendrier de paie et DSN ; éléments variables collectifs et individuels : entrées et sorties, heures supplémentaires et complémentaires, primes, avantages, absences, congés payés, arrêts de travail (indemnités journalières, carence, maintien de salaire, subrogation), acomptes et avances, saisies des rémunérations, complémentaire santé et prévoyance ; justificatifs, contrôles de cohérence, transmission au service paie interne ou externe (logiciel de paie), contrôle des bulletins ; dossier paie numérisé et classement protégé ; confidentialité. Mise en situation : variables de paie du mois d'octobre chez ALTÉA SERVICES.\n\nCP3 — Mettre en place et suivre les indicateurs ressources humaines (56 h)\nIndicateurs sociaux et ratios (effectif, ETP, effectif moyen, entrées et sorties, turnover, absentéisme, ancienneté, pyramide des âges, masse salariale), règles de calcul de l'effectif ; tableaux de bord et graphiques sur tableur ; obligations liées à l'effectif : BDESE, index de l'égalité professionnelle, obligation d'emploi des travailleurs handicapés, bilan social, transparence des rémunérations (directive (UE) 2023/970), CSRD et reporting de durabilité ; analyse et note de synthèse adaptée au destinataire ; confidentialité. Mises en situation : tableau de bord RH ; obligations liées à l'effectif. Évaluation en cours de formation (ECF) du CCP1.\n\nBLOC 2 / CCP2 — CONTRIBUER AU DÉVELOPPEMENT DES RESSOURCES HUMAINES (161 h)\n\nCP4 — Contribuer aux opérations liées à la gestion des emplois et carrières (49 h)\nGestion des emplois et des parcours professionnels (GEPP) ; entretien de parcours professionnel issu de la loi du 24 octobre 2025 (dans l'année suivant l'embauche puis tous les 4 ans, état des lieux récapitulatif à 8 ans, entretien de mi-carrière, entretien avant 60 ans, abondement correctif du CPF) et entretien annuel d'évaluation ; planning, supports et relances ; exploitation des comptes rendus ; fiches de postes et référentiels de compétences ; mobilité, conseil en évolution professionnelle ; communication avec les managers, les représentants du personnel et les partenaires externes ; confidentialité. Mise en situation : rattrapage des entretiens professionnels chez ALTÉA SERVICES.\n\nCP5 — Contribuer au processus de recrutement et d'intégration du personnel (63 h)\nRecueil du besoin, profil de poste, offre d'emploi (non-discrimination, offre en français, transparence de la rémunération), sourcing (France Travail, jobboards, réseaux sociaux, cooptation), marque employeur ; grille de présélection, guide et grille d'entretien, techniques d'entretien et posture, synthèse ; gestion administrative et logistique, information des candidats et conservation de leurs données ; programme d'intégration, livret d'accueil, formation à la sécurité, rapport d'étonnement, suivi de la période d'essai. Mises en situation : profil de poste, offre et sourcing ; entretien, synthèse et intégration.\n\nCP6 — Contribuer à l'élaboration et au suivi du développement des compétences du personnel (49 h)\nCadre légal de la formation professionnelle ; plan de développement des compétences (actions obligatoires et non obligatoires) ; dispositifs : CPF et participation forfaitaire, période de reconversion, projet de transition professionnelle, VAE, bilan de compétences, alternance ; financement, OPCO et contributions ; consultation des organismes de formation et qualité (Qualiopi) ; calcul des coûts, budget, traitement administratif et logistique ; évaluations à chaud et à froid ; qualité de vie et des conditions de travail ; information et consultation du CSE. Mise en situation : plan de développement des compétences 2027. Évaluation en cours de formation (ECF) du CCP2.\n\nPRÉPARATION AU TITRE (35 h)\nFinalisation du dossier professionnel, mise en situation professionnelle blanche de 3 h 30 sur le modèle de l'épreuve, entretiens techniques blancs (CP1 et CP5), entretien final blanc, bilan de parcours et préparation de la session de validation devant le jury.",
  methodesEvaluation:
    "Analyse des besoins, entretien et test de positionnement à l'entrée (10 questions ouvertes + QCM 10 questions) ; évaluations formatives : 10 mises en situation professionnelles corrigées (diagnostic de départ puis CP1 à CP6) et un QCM de 10 questions par compétence (6 QCM) ; exercices d'application à chaque semaine au CFA ; cas pratique intermédiaire ; évaluations passées en cours de formation (ECF) pour chacun des deux CCP ; mise en situation professionnelle blanche de 3 h 30 et entretiens blancs ; test de positionnement de fin. Session de validation du titre organisée par un centre agréé devant un jury de professionnels habilité par la DREETS : mise en situation professionnelle (étude de cas de 3 h 30), entretien technique de 30 min (choix opérés lors de la mise en situation, CP1 et CP5), entretien final de 20 min, sur la base du dossier professionnel et des résultats des ECF ; le titre est obtenu en totalité ou par CCP. Livret d'apprentissage et visites en entreprise ; questionnaires de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Formation à distance en classes virtuelles synchrones (Google Meet / Zoom) avec partage d'écran, plateforme pédagogique (support de cours, cahier d'exercices, corrigés publiés après correction, QCM en ligne), assistance pédagogique et technique par mail et téléphone ; étude de cas fil rouge ALTÉA SERVICES (entreprise fictive de propreté et de services, 148 salariés) avec dossiers documentaires réalistes ; modèles et outils : check-list d'embauche, modèles de contrats et de documents de fin de contrat, tableau des variables de paie, tableau de bord RH sur tableur, trames d'entretien professionnel, profil de poste, grilles de présélection et d'entretien, programme d'intégration, plan de développement des compétences ; ressources officielles (Légifrance, Code du travail numérique, URSSAF, net-entreprises, CNIL, ministère du Travail). Livret d'apprentissage tripartite, entretiens de suivi avec l'apprenti et le maître d'apprentissage, visites en entreprise. Référent handicap : adaptation des supports, des rythmes et des modalités d'évaluation, demande d'aménagement des épreuves du titre.",
  publicVise:
    "Apprentis de 16 à 29 ans révolus (sans limite d'âge pour les personnes en situation de handicap, les sportifs de haut niveau et les créateurs ou repreneurs d'entreprise) en contrat d'apprentissage dans une entreprise disposant d'une fonction ressources humaines. Formation accessible aux personnes en situation de handicap : contacter le référent handicap pour étudier les adaptations.",
  delaiAcces:
    "Entrée après entretien, test de positionnement et signature du contrat d'apprentissage, au plus tard dans les 3 mois suivant le début d'exécution du contrat ; réponse à toute demande sous 48 heures ouvrées.",
  dateDebut: "2026-11-02",
  dateFin: "2027-10-29",
  lieu: "Google Meet / Zoom",
  nombreParticipants: "12",
  formateur: "",
  rythmeAlternance: "1 semaine au CFA / 3 semaines en entreprise",
  typeAction: "apprentissage",
  referentiel: REFERENTIEL_ARH41366,
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Acquérir les bases du droit du travail et savoir rechercher une information juridique fiable avant de répondre à un salarié.",
  "Sécuriser les formalités d'embauche et la tenue des dossiers du personnel, dans le respect du RGPD.",
  "Comprendre et contrôler les éléments variables de paie avant leur transmission au service paie.",
  "Suivre le temps de travail, les absences et les congés, et préparer les documents de fin de contrat.",
  "Construire des indicateurs RH exacts et les présenter dans un tableau de bord commenté.",
  "Connaître les obligations liées à l'effectif : CSE, BDESE, index de l'égalité, obligation d'emploi des travailleurs handicapés.",
  "Planifier et exploiter les entretiens professionnels et actualiser les fiches de postes.",
  "Participer au recrutement de façon non discriminante, de l'offre d'emploi à l'intégration.",
  "Contribuer au plan de développement des compétences et maîtriser les dispositifs de formation.",
  "Se préparer à la mise en situation professionnelle de 3 h 30, aux entretiens du titre et au dossier professionnel.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins conduite avec chaque apprenti(e) avant l'entrée en formation (entretien d'admission, vérification des prérequis, test de positionnement, échange avec le maître d'apprentissage) fait apparaître un groupe d'apprentis aux parcours variés — baccalauréat professionnel ou technologique, BTS tertiaire, début d'études de droit ou de psychologie, première expérience administrative — accueillis dans des entreprises de tailles et de secteurs différents (industrie, santé, commerce, BTP, aide à domicile, cabinet comptable, transport, hôtellerie). Trois besoins sont partagés par l'ensemble du groupe.</p>
<ul>
  <li><strong>Maîtriser le cadre juridique (CP1, CP2)</strong> : les formalités d'embauche, les règles du temps de travail, les absences et les fins de contrat sont connues de façon partielle ; les apprentis ont besoin de méthodes pour rechercher une information fiable et contrôler leurs saisies.</li>
  <li><strong>Produire des données fiables (CP2, CP3)</strong> : la collecte des variables de paie et le calcul des indicateurs RH sont les principales sources d'appréhension ; les obligations liées à l'effectif (BDESE, index, obligation d'emploi) sont peu connues.</li>
  <li><strong>Contribuer au développement des ressources humaines (CP4, CP5, CP6)</strong> : les entretiens professionnels, le recrutement non discriminant et les dispositifs de formation sont découverts en entreprise sans cadre méthodologique.</li>
</ul>
<p>Les apprentis attendent des modèles directement utilisables en entreprise, des corrections individualisées et une préparation concrète à l'épreuve du titre (mise en situation de 3 h 30, entretien technique sur CP1 et CP5, entretien final avec le dossier professionnel).</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Apprentis sans expérience administrative</strong> : fiches méthode (recherche juridique, check-lists), exercices progressifs du cas guidé au cas autonome, tutorat renforcé pendant les deux premières semaines au CFA.</li>
  <li><strong>Apprentis déjà expérimentés</strong> : cas complexes (fins de contrat, obligations liées à l'effectif, transparence salariale), rôle de binôme pendant les ateliers.</li>
  <li><strong>Alternance</strong> : chaque semaine au CFA se termine par une mission à réaliser en entreprise, validée avec le maître d'apprentissage dans le livret d'apprentissage ; les productions alimentent le dossier professionnel.</li>
  <li><strong>Distanciel</strong> : classes virtuelles courtes et interactives, pauses régulières, sondages et salles de travail en sous-groupes, supports disponibles à l'avance sur la plateforme, assistance technique.</li>
  <li><strong>Préparation au titre</strong> : ECF par CCP, mise en situation blanche de 3 h 30 en temps réel, entretiens blancs, suivi individuel du dossier professionnel.</li>
  <li><strong>Accessibilité et handicap</strong> : référent handicap présenté dès l'admission, supports adaptés (police, PDF accessibles), temps majoré pour les évaluations internes, demande d'aménagement des épreuves du titre transmise au centre d'examen.</li>
</ul>`;

/** 10 mises en situation (diagnostic de départ puis CP1 à CP6), corrigés formateur. */
export const ARH41366_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — Diagnostic de départ : mon parcours, mon entreprise d'apprentissage et mes objectifs d'assistant(e) RH",
    consigne:
      "1. Présentez votre parcours (diplômes, expériences, stages) et ce qui vous a conduit vers les ressources humaines. 2. Présentez votre entreprise d'apprentissage : activité, effectif, convention collective (intitulé et IDCC), organisation de la fonction RH (effectif du service, paie interne ou externalisée), outils utilisés (SIRH, logiciel de paie, tableur), représentants du personnel. 3. Listez les missions RH qui vous sont déjà confiées ou que vous avez observées. 4. Évaluez de 1 à 4 votre aisance sur chacune des compétences CP1 à CP6 et sur les compétences transversales. 5. Concluez par 3 forces, 3 points de vigilance et 3 objectifs pour l'année, reliés à l'épreuve du titre (ECF, dossier professionnel, mise en situation professionnelle).",
    reponseAttendue:
      "Parcours décrit de façon concrète et relié au projet professionnel.\nEntreprise présentée avec des données exactes : activité, effectif, convention collective et IDCC, organisation RH, outils, existence d'un CSE ; l'apprenti distingue ce qu'il sait de ce qu'il doit encore vérifier auprès de son maître d'apprentissage.\nMissions confiées ou observées reliées aux compétences du référentiel (par exemple : DPAE et dossiers = CP1, absences et variables = CP2, tableaux de bord = CP3, entretiens = CP4, offres et accueil = CP5, formations = CP6).\nAutoévaluation cohérente avec l'expérience décrite.\nForces, points de vigilance et objectifs tirés des constats, datés et reliés aux modalités du titre (ECF par CCP, dossier professionnel, mise en situation de 3 h 30, entretien technique sur CP1 et CP5, entretien final).\nBarème : parcours 3, entreprise 5, missions 4, autoévaluation 4, conclusion 4.",
    points: 20,
  },
  {
    titre: "Exercice 2 — CP1 : formalités d'embauche et dossier individuel du personnel",
    consigne:
      "ALTÉA SERVICES embauche le 2 novembre 2026 M. Yanis CHÉRIF, agent de propreté, en CDD de 6 mois pour accroissement temporaire d'activité (nouveau contrat de nettoyage d'un site tertiaire à Ivry-sur-Seine), à temps partiel de 24 heures par semaine. 1. Listez les formalités d'embauche avec leur échéance et la preuve à conserver (DPAE, registre unique du personnel, contrat, complémentaire santé et prévoyance, visite d'information et de prévention, informations à remettre au salarié). 2. Indiquez les mentions obligatoires de ce contrat (CDD et temps partiel) et la durée maximale de la période d'essai. 3. Décrivez la composition du dossier individuel dans Lucca, les règles d'accès et de conservation. 4. Précisez les règles de confidentialité et de protection des données applicables. 5. Rédigez le mail au chef de site confirmant la prise de poste et les documents à remettre au salarié.",
    reponseAttendue:
      "Formalités : DPAE auprès de l'URSSAF (net-entreprises) au plus tôt 8 jours avant l'embauche et au plus tard avant la prise de poste ; inscription au registre unique du personnel dès l'embauche (conservation 5 ans à compter du départ du salarié) ; contrat écrit transmis au plus tard dans les 2 jours ouvrables suivant l'embauche (article L1242-13 du Code du travail) ; affiliation à la complémentaire santé et à la prévoyance, sauf dispense demandée par écrit par le salarié dans les cas prévus ; visite d'information et de prévention dans les 3 mois suivant la prise effective du poste ; informations sur les éléments essentiels de la relation de travail dans les délais réglementaires.\nMentions : CDD (article L1242-12) — motif précis, terme ou durée minimale, poste, intitulé de la convention collective (propreté, IDCC 3043), durée de la période d'essai, rémunération, caisses de retraite complémentaire et de prévoyance ; temps partiel (article L3123-6) — durée hebdomadaire, répartition entre les jours de la semaine, cas et modalités de modification, limites des heures complémentaires ; 24 h correspond à la durée minimale légale du temps partiel (article L3123-7). Période d'essai : un jour par semaine dans la limite de deux semaines pour un CDD de 6 mois au plus (article L1242-10).\nDossier : identité et, le cas échéant, autorisation de travail, contrat et avenants, DPAE, justificatifs utiles au poste, suivi médical (sans données de santé détaillées), entretiens, formations ; accès réservé aux personnes habilitées ; durées de conservation définies et respectées.\nConfidentialité et RGPD : seules les données ayant un lien direct et nécessaire avec l'emploi sont collectées, information du salarié, sécurité des échanges (pas de pièce d'identité par mail non sécurisé), registre des traitements.\nMail clair, daté, factuel : date et heure d'arrivée, lieu, interlocuteur, documents et équipements à remettre, formation pratique à la sécurité du premier jour.\nBarème : formalités 6, mentions et essai 5, dossier 3, confidentialité 3, mail 3.",
    points: 20,
  },
  {
    titre: "Exercice 3 — CP1 : temps de travail, fin de contrat et élections du CSE",
    consigne:
      "1. Mme Sandrine LEFEVRE, cheffe d'équipe chez ALTÉA SERVICES en CDI depuis le 1er mars 2015, quitte l'entreprise par rupture conventionnelle le 31 décembre 2026 ; son salaire brut de référence est de 2 400 €. Calculez l'indemnité légale minimale et décrivez la procédure et son calendrier. 2. Listez les documents de fin de contrat à remettre. 3. Un chef de site signale qu'un agent a travaillé 11 heures le même jour et 49 heures sur une semaine : quelles règles rappelez-vous et que proposez-vous ? 4. Les mandats du CSE arrivent à échéance : listez les étapes administratives à préparer. 5. Un salarié en arrêt maladie depuis deux mois demande s'il acquiert des congés payés : rédigez la réponse écrite.",
    reponseAttendue:
      "Indemnité : ancienneté de 11 ans et 10 mois à la date de rupture ; 1/4 de mois par année jusqu'à 10 ans et 1/3 au-delà (article R1234-2), salaire de référence le plus favorable entre la moyenne des 12 et des 3 derniers mois (article R1234-4) : 2 400 × 1/4 × 10 = 6 000 € ; 2 400 × 1/3 × (1 + 10/12) = 1 466,67 € ; total minimum 7 466,67 €, sous réserve d'une indemnité conventionnelle plus favorable. Procédure : un ou plusieurs entretiens, signature de la convention, délai de rétractation de 15 jours calendaires, demande d'homologation sur TéléRC, instruction de 15 jours ouvrables par la DREETS, rupture au plus tôt le lendemain de l'homologation ; rétroplanning cohérent avec le 31 décembre.\nDocuments : certificat de travail, reçu pour solde de tout compte (dénonçable dans les 6 mois suivant la signature), attestation France Travail transmise via la DSN, information sur la portabilité de la complémentaire santé et de la prévoyance.\nTemps de travail : durée quotidienne maximale de 10 heures (article L3121-18), durée hebdomadaire maximale de 48 heures (article L3121-20) et de 44 heures en moyenne sur 12 semaines (article L3121-22), repos quotidien de 11 heures consécutives ; alerte écrite au chef de site, correction du planning, vérification des heures supplémentaires et du contingent.\nCSE : information du personnel sur l'organisation des élections, invitation des organisations syndicales à négocier le protocole d'accord préélectoral, collèges et répartition des sièges, listes électorales, calendrier, affichages, procès-verbaux transmis après le scrutin ; mandats de 4 ans.\nCongés pendant la maladie : depuis la loi du 22 avril 2024, 2 jours ouvrables par mois pour un arrêt d'origine non professionnelle, dans la limite de 24 jours ouvrables par période de référence ; information du salarié à sa reprise sur le nombre de jours et la date limite de prise ; réponse courtoise, exacte et sourcée.\nBarème : indemnité et procédure 6, documents 3, temps de travail 4, CSE 4, réponse écrite 3.",
    points: 20,
  },
  {
    titre: "Exercice 4 — CP2 : collecte et contrôle des variables de paie du mois",
    consigne:
      "Paie d'octobre 2026 chez ALTÉA SERVICES, établie par le cabinet d'expertise comptable sur Silae ; les variables doivent être transmises au plus tard le 22 octobre. Événements du mois : Mme Sandrine LEFEVRE, 10 heures supplémentaires sur une même semaine ; M. Bakary TRAORÉ, arrêt maladie du 6 au 15 octobre (4 ans d'ancienneté) ; Mme Julie MARCHAND, 5 jours de congés payés du 19 au 23 octobre ; M. Kévin DUBOIS, acompte de 600 € versé le 15 octobre ; Mme Fatou SY, acte de saisie des rémunérations reçu d'un commissaire de justice ; M. Thomas GIRARD, entré en CDI à temps plein le 12 octobre ; M. Hugo LAMBERT, prime exceptionnelle de 150 € validée par la direction. 1. Construisez le tableau des variables à transmettre avec les justificatifs. 2. Listez les contrôles à réaliser avant la transmission. 3. Décrivez la conduite à tenir pour l'arrêt maladie. 4. Expliquez le traitement de l'acompte et de la saisie. 5. Précisez les règles de confidentialité, de classement et le calendrier jusqu'à la DSN.",
    reponseAttendue:
      "Tableau : salarié, élément, quantité ou montant, période, justificatif, contrôle ; heures supplémentaires de Mme LEFEVRE (8 heures majorées à 25 % et 2 heures à 50 % à défaut d'accord, relevé validé), absence maladie de M. TRAORÉ (avis d'arrêt), congés de Mme MARCHAND (demande validée dans Lucca, solde), acompte de M. DUBOIS, saisie de Mme SY (acte), entrée de M. GIRARD (date, contrat, affiliation à la mutuelle ou dispense écrite), prime de M. LAMBERT (validation écrite de la direction).\nContrôles : cohérence absences / plannings / congés, cumul des heures supplémentaires et contingent annuel, entrées et sorties au prorata, pièces justificatives présentes, aucune variable sans justificatif.\nArrêt maladie : réception de l'avis d'arrêt, signalement en DSN pour l'attestation de salaire, délai de carence de 3 jours pour les indemnités journalières, maintien de salaire légal après un an d'ancienneté (article L1226-1) ou conventionnel s'il est plus favorable, subrogation selon la pratique de l'entreprise.\nAcompte : un salarié mensualisé peut obtenir un acompte correspondant à la moitié de sa rémunération mensuelle (article L3242-1) ; il est déduit du net à payer. Saisie : depuis le 1er juillet 2025, la saisie des rémunérations est conduite par un commissaire de justice ; l'employeur retient la fraction saisissable selon le barème réglementaire en vigueur et la verse selon l'acte ; information limitée au gestionnaire de paie.\nConfidentialité et calendrier : dossier paie numérisé par salarié, classement protégé, envoi par plateforme sécurisée ; transmission le 22 octobre au plus tard, contrôle des bulletins, mise à disposition des bulletins (dématérialisation sauf opposition du salarié), DSN au plus tard le 5 novembre pour une entreprise d'au moins 50 salariés ; double des bulletins conservé 5 ans.\nBarème : tableau 6, contrôles 4, arrêt 4, acompte et saisie 3, confidentialité et calendrier 3.",
    points: 20,
  },
  {
    titre: "Exercice 5 — CP3 : construire et commenter le tableau de bord RH",
    consigne:
      "Données 2025 d'ALTÉA SERVICES : effectif au 31 décembre 148 salariés (96 femmes, 52 hommes), 121,4 ETP, effectif moyen 145, 37 entrées et 31 sorties, 13 850 heures d'absence (maladie, accidents du travail, absences injustifiées) pour 195 090 heures théoriques, masse salariale brute 3 064 000 €. 1. Calculez le taux de rotation (turnover), le taux d'absentéisme, le taux de féminisation et le salaire brut moyen annuel par ETP. 2. Construisez le tableau de bord : indicateur, formule, valeur, source, périodicité, destinataire. 3. Choisissez et justifiez deux graphiques. 4. Rédigez une note de synthèse de 10 lignes pour la direction. 5. Indiquez les règles de confidentialité de diffusion.",
    reponseAttendue:
      "Calculs exacts : turnover = ((37 + 31) / 2) / 145 × 100 = 23,4 % ; absentéisme = 13 850 / 195 090 × 100 = 7,1 % ; féminisation = 96 / 148 × 100 = 64,9 % ; salaire brut moyen annuel par ETP = 3 064 000 / 121,4 = 25 239 €.\nTableau de bord : formules écrites, sources (SIRH Lucca, logiciel de paie, DSN), date d'extraction, périodicité (mensuelle pour l'absentéisme, annuelle pour la masse salariale), destinataires (direction, managers, CSE avec données agrégées) ; contrôle de cohérence entre sources.\nGraphiques : courbe pour une évolution dans le temps (absentéisme mensuel), histogramme horizontal par tranche d'âge et par sexe pour la pyramide des âges, barres pour une comparaison entre sites ; graphique choisi selon le message.\nNote : chiffres clés, éléments significatifs repérés (absentéisme élevé, rotation concentrée sur les contrats courts ou les premiers mois), hypothèses prudentes, propositions d'analyse ou d'action ; style factuel, adapté à la direction.\nConfidentialité : aucune donnée nominative dans le tableau diffusé, accès restreint aux fichiers sources, diffusion selon le destinataire.\nBarème : calculs 6, tableau de bord 5, graphiques 3, note 4, confidentialité 2.",
    points: 20,
  },
  {
    titre: "Exercice 6 — CP3 : obligations liées à l'effectif et transparence des rémunérations",
    consigne:
      "1. Listez les obligations d'ALTÉA SERVICES (148 salariés) qui dépendent de son effectif, et celles qui ne la concernent pas, en justifiant. 2. L'index de l'égalité professionnelle 2025 d'ALTÉA SERVICES est de 78 points sur 100 : quelles obligations en découlent ? 3. Présentez les changements à anticiper avec la directive (UE) 2023/970 sur la transparence des rémunérations. 4. Calculez le nombre de bénéficiaires de l'obligation d'emploi des travailleurs handicapés attendu et expliquez la déclaration. 5. Construisez le calendrier annuel des obligations RH d'ALTÉA SERVICES.",
    reponseAttendue:
      "Obligations : CSE (dès 11 salariés) avec les attributions des entreprises d'au moins 50 salariés et ses consultations récurrentes (orientations stratégiques, situation économique et financière, politique sociale, conditions de travail et emploi) ; BDESE (dès 50 salariés) ; index de l'égalité professionnelle (dès 50 salariés) ; règlement intérieur (dès 50 salariés) ; obligation d'emploi des travailleurs handicapés (dès 20 salariés). Non concernée : bilan social (dès 300 salariés) ; CSRD : ALTÉA SERVICES n'atteint pas les seuils, le calendrier ayant en outre été reporté en 2025 pour plusieurs catégories d'entreprises (« stop-the-clock ») ; vérification à faire selon les textes en vigueur.\nIndex 78 : publication au plus tard le 1er mars sur le site de l'entreprise et transmission à l'administration ; au-dessus de 75, pas de mesures de correction obligatoires ; sous 85, fixation et publication d'objectifs de progression pour chaque indicateur n'ayant pas atteint la note maximale.\nDirective (UE) 2023/970 : transposition attendue au plus tard le 7 juin 2026, à suivre dans le texte français ; information du candidat sur la rémunération initiale ou sa fourchette, interdiction de l'interroger sur ses rémunérations antérieures, droit des salariés à l'information sur les niveaux de rémunération, critères objectifs et non sexistes, rapport sur l'écart de rémunération selon la taille, évaluation conjointe en cas d'écart d'au moins 5 % non justifié.\nObligation d'emploi : 6 % de 148 = 8,88, arrondi à l'entier inférieur, soit 8 bénéficiaires ; déclaration annuelle via la DSN ; contribution en cas d'écart, sous réserve des modalités d'acquittement prévues.\nCalendrier : préparation des données de l'index en début d'année, publication au 1er mars, déclaration annuelle de l'obligation d'emploi en DSN, consultations récurrentes du CSE, mise à jour continue de la BDESE, veille sur la transposition de la directive.\nBarème : obligations 6, index 4, directive 4, obligation d'emploi 3, calendrier 3.",
    points: 20,
  },
  {
    titre: "Exercice 7 — CP4 : organiser et exploiter les entretiens professionnels",
    consigne:
      "ALTÉA SERVICES a pris du retard sur ses entretiens, désormais « entretiens de parcours professionnel » (loi du 24 octobre 2025) : 37 salariés n'ont pas eu leur entretien dans les délais, dont 6 arrivent en 2027 à l'échéance de l'état des lieux récapitulatif et 4 atteignent 45 ans (entretien de mi-carrière). 1. Rappelez le cadre légal de l'entretien professionnel et le risque pour l'entreprise. 2. Établissez un planning de rattrapage sur 4 mois dans Lucca. 3. Construisez la trame de l'entretien professionnel, distincte de l'entretien annuel d'évaluation. 4. Expliquez comment exploiter les comptes rendus (synthèse des souhaits, fiches de postes, plan de développement des compétences). 5. Rédigez la note d'information aux chefs de site et précisez les règles de confidentialité.",
    reponseAttendue:
      "Cadre : article L6315-1 du Code du travail modifié par la loi du 24 octobre 2025 — entretien de parcours professionnel dans l'année suivant l'embauche puis tous les 4 ans, consacré aux perspectives d'évolution professionnelle (qualifications, emploi), information sur la VAE, le CPF, les abondements de l'employeur et le conseil en évolution professionnelle ; état des lieux récapitulatif à 8 ans ; entretien de mi-carrière dans les 2 mois suivant la visite médicale des 45 ans et entretien dans les 2 ans précédant les 60 ans ; dans les entreprises d'au moins 50 salariés, abondement correctif de 3 000 € sur le CPF du salarié lorsque les conditions de l'état des lieux ne sont pas remplies ; veille sur les textes d'application de la loi du 24 octobre 2025.\nPlanning : extraction des dates, priorité aux 6 salariés concernés par l'état des lieux et aux 4 entretiens de mi-carrière, répartition réaliste par site et par manager, relances, suivi des réalisations.\nTrame : parcours, formations suivies, certifications, compétences, souhaits d'évolution, besoins de formation, dispositifs mobilisables ; aucune évaluation de la performance ; compte rendu remis au salarié.\nExploitation : synthèse des souhaits (formation, mobilité, VAE), alimentation du plan de développement des compétences, actualisation des fiches de postes et du référentiel de compétences, contribution à la gestion des emplois et des parcours professionnels.\nCommunication et confidentialité : note claire aux chefs de site (cadre, calendrier, supports, rôle de chacun), information des salariés, accès aux comptes rendus limité au salarié, au manager et au service RH, synthèses anonymisées pour la direction.\nBarème : cadre 5, planning 4, trame 4, exploitation 4, communication 3.",
    points: 20,
  },
  {
    titre: "Exercice 8 — CP5 : profil de poste, offre d'emploi et sourcing",
    consigne:
      "ALTÉA SERVICES recrute un(e) chef(fe) d'équipe propreté en CDI, 35 heures, pour les sites de Créteil et de Vitry-sur-Seine (12 agents encadrés, prise de poste à 6 h). 1. Préparez les questions de recueil du besoin auprès du manager. 2. Rédigez le profil de poste. 3. Rédigez l'offre d'emploi conforme à la réglementation. 4. Proposez un plan de sourcing justifié (France Travail, jobboards, réseaux sociaux, cooptation…). 5. Construisez la grille de présélection des CV, cohérente avec le profil.",
    reponseAttendue:
      "Recueil du besoin : raison du recrutement, missions prioritaires, compétences indispensables et souhaitées, conditions (horaires, sites, déplacements), rémunération, date d'arrivée, critères de réussite à 6 mois.\nProfil précis et synthétique : finalité, missions (encadrement de 12 agents, plannings, contrôle qualité, sécurité, relation client), compétences, rattachement, conditions d'exercice.\nOffre : rédigée en français (article L5331-4), aucune mention discriminatoire (article L1132-1) ni limite d'âge (article L5331-2), mentions utiles (contrat, durée, lieu, horaires, rémunération ou fourchette, avantages), présentation de l'entreprise ; préparation de la transparence des rémunérations.\nSourcing : France Travail et jobboards généralistes pour le volume, réseaux professionnels pour les profils d'encadrement, cooptation selon la procédure interne, salons et partenaires locaux ; choix justifiés par le public, le coût et le délai ; suivi par canal.\nGrille : critères issus du profil (expérience d'encadrement, techniques de propreté, sécurité, relation client, outils), indispensables et souhaités, pondération, application identique à toutes les candidatures.\nBarème : recueil 3, profil 4, offre 6, sourcing 4, grille 3.",
    points: 20,
  },
  {
    titre: "Exercice 9 — CP5 : conduite d'entretien, synthèse et programme d'intégration",
    consigne:
      "Suite de l'exercice 8. 1. Construisez le guide d'entretien structuré (étapes, questions, dont des questions comportementales). 2. Construisez la grille d'évaluation reliée au profil de poste. 3. Rédigez la synthèse de l'entretien de Mme Clara MENDES, candidate fictive (5 ans d'encadrement en propreté hospitalière, à l'aise avec les protocoles, peu familière des logiciels de planning). 4. Décrivez la gestion administrative et logistique du recrutement : information et réponses aux candidats, conservation des données, formalités à l'acceptation de l'offre. 5. Construisez le programme d'intégration de la nouvelle cheffe d'équipe, de J-7 à la fin de la période d'essai.",
    reponseAttendue:
      "Guide : accueil, présentation du poste et de l'entreprise, parcours, questions comportementales sur des situations vécues (méthode situation, tâche, action, résultat), motivation, questions du candidat, conclusion et suite du processus ; questions identiques pour tous les candidats ; aucune question sur la vie privée ou un critère discriminatoire.\nGrille : critères du profil, échelle définie, commentaires factuels, avis final ; cohérence avec la grille de présélection.\nSynthèse : faits observés, appréciation argumentée par critère, points de vigilance à vérifier (outils de planning, horaires), recommandation ; neutralité.\nGestion : information préalable des candidats sur les méthodes et techniques d'aide au recrutement utilisées (article L1221-8), informations demandées en lien direct et nécessaire avec l'emploi (article L1221-6), réponse à tous les candidats, conservation des données des candidats non retenus au plus 2 ans après le dernier contact selon les recommandations de la CNIL, convocations et logistique ; à l'acceptation : promesse ou proposition écrite, DPAE, dossier d'embauche.\nIntégration : acteurs (RH, manager, tuteur ou parrain, équipes), étapes (J-7 préparation des accès, du matériel et du planning ; J accueil, livret d'accueil, formation pratique à la sécurité ; S1 binôme ; M1 point d'étape et rapport d'étonnement ; avant la fin de la période d'essai, bilan), outils (check-list, livret, planning, grille de suivi), visite d'information et de prévention.\nBarème : guide 4, grille 3, synthèse 4, gestion 4, intégration 5.",
    points: 20,
  },
  {
    titre: "Exercice 10 — CP6 : plan de développement des compétences et suivi des formations",
    consigne:
      "1. Présentez la démarche de recueil des besoins de formation d'ALTÉA SERVICES pour 2027 et la structure du plan de développement des compétences. 2. Calculez le coût complet de l'action « Encadrer une équipe de propreté » : 3 jours (21 h) pour 6 chefs d'équipe, coût pédagogique de 1 890 € pour le groupe, salaire horaire chargé moyen de 16 €, frais de déplacement de 240 € ; indiquez le coût par participant. 3. Orientez vers le dispositif adapté : un agent qui souhaite obtenir le CAP Agent de propreté et d'hygiène à partir de son expérience ; une salariée qui veut se reconvertir comme aide-soignante ; un salarié qui veut passer le permis B. 4. Décrivez le traitement administratif et logistique d'une action. 5. Construisez l'évaluation de l'action (à chaud et à froid) et précisez l'information du CSE.",
    reponseAttendue:
      "Recueil : synthèse des entretiens professionnels, demandes des managers, obligations réglementaires (sécurité, produits), orientations de la direction ; plan distinguant les actions obligatoires (conditionnant l'exercice d'une activité, temps de travail effectif avec maintien de la rémunération) et les autres actions ; priorités, publics, calendrier, budget.\nCoût : 1 890 € + (6 × 21 h × 16 € = 2 016 €) + 240 € = 4 146 €, soit 691 € par participant.\nDispositifs : VAE (information et accompagnement via le service public France VAE) ; projet de transition professionnelle instruit par l'association Transitions Pro de la région (maintien de la rémunération sous conditions) ; CPF pour le permis B, avec la participation forfaitaire du titulaire en vigueur depuis le 2 mai 2024, sauf exceptions (notamment abondement de l'employeur) ; rappel : l'OPCO finance le plan de développement des compétences des entreprises de moins de 50 salariés, ALTÉA SERVICES finance donc son plan, hors dispositifs spécifiques.\nAdministratif et logistique : comparaison de devis d'organismes certifiés Qualiopi, convention, convocations, organisation (salle ou classe virtuelle), émargements, attestations de fin de formation, suivi budgétaire, mise à jour du SIRH.\nÉvaluation : questionnaire à chaud (satisfaction, atteinte des objectifs), évaluation à froid à 2 ou 3 mois avec le manager (transfert en situation de travail), bilan de l'action ; informations transmises au CSE dans le cadre de la consultation sur la politique sociale.\nBarème : recueil et plan 5, coût 4, dispositifs 5, administratif 3, évaluation 3.",
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// QCM par compétence (10 questions chacun)
// Format lu par le générateur d'exercices : « 1) … A) …   B) …   C) …   D) … » + « 1-B  2-C … ».
// Aucune lettre A, B, C ou D suivie d'une parenthèse fermante dans les énoncés ni les options
// (le parseur s'en servirait) : pas de sigle entre parenthèses.
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

const QCM_CP1: Q[] = [
  ["La déclaration préalable à l'embauche doit être effectuée :", ["Dans le mois suivant l'embauche", "Au plus tôt 8 jours avant l'embauche et au plus tard avant la prise de poste", "Uniquement pour les CDI", "À la fin de la période d'essai"], 1],
  ["Le registre unique du personnel est conservé :", ["1 an après le départ du salarié", "Jusqu'à la fin de l'année civile", "5 ans à compter du départ du salarié", "Il n'a pas à être conservé"], 2],
  ["Le contrat à durée déterminée est transmis au salarié :", ["Au plus tard dans les 2 jours ouvrables suivant l'embauche", "Dans le mois suivant l'embauche", "À la fin du contrat", "Seulement si le salarié le demande"], 0],
  ["La visite d'information et de prévention a lieu, en principe :", ["Avant l'entretien d'embauche", "Une fois par an", "Uniquement à la demande du salarié", "Dans les 3 mois suivant la prise effective du poste"], 3],
  ["Pour les 10 premières années d'ancienneté, l'indemnité légale de licenciement est de :", ["1 mois de salaire par année", "1/4 de mois de salaire par année", "1/10 de mois de salaire par année", "Une somme forfaitaire"], 1],
  ["Le délai de rétractation d'une rupture conventionnelle est de :", ["15 jours calendaires", "8 jours ouvrés", "1 mois", "Il n'en existe pas"], 0],
  ["Le reçu pour solde de tout compte peut être dénoncé dans un délai de :", ["15 jours", "1 mois", "6 mois suivant sa signature", "3 ans"], 2],
  ["Sauf dérogation, la durée quotidienne maximale de travail effectif est de :", ["8 heures", "12 heures", "9 heures", "10 heures"], 3],
  ["Le comité social et économique est mis en place dans les entreprises qui atteignent pendant 12 mois consécutifs au moins :", ["11 salariés", "20 salariés", "50 salariés", "300 salariés"], 0],
  ["Le dossier individuel d'un salarié est accessible :", ["À tous les salariés de l'entreprise", "Aux seules personnes habilitées, dans le respect du RGPD", "Aux clients de l'entreprise", "À tous les managers sans restriction"], 1],
];

const QCM_CP2: Q[] = [
  ["Fait partie des éléments variables de paie :", ["L'adresse du siège social", "Le code APE de l'entreprise", "Les heures supplémentaires du mois", "L'intitulé de la convention collective"], 2],
  ["À défaut d'accord, les 8 premières heures supplémentaires de la semaine sont majorées de :", ["25 %", "10 %", "50 %", "100 %"], 0],
  ["Le délai de carence applicable aux indemnités journalières de la Sécurité sociale en cas de maladie est de :", ["1 jour", "7 jours", "Aucun", "3 jours"], 3],
  ["Une entreprise d'au moins 50 salariés transmet sa DSN mensuelle au plus tard :", ["Le 15 du mois suivant", "Le 5 du mois suivant", "Le dernier jour du mois", "Une fois par trimestre"], 1],
  ["Depuis la loi du 22 avril 2024, un salarié en arrêt maladie d'origine non professionnelle acquiert des congés payés à raison de :", ["Aucun jour", "2,5 jours ouvrables par mois sans limite", "2 jours ouvrables par mois, dans la limite de 24 jours", "1 jour par semaine"], 2],
  ["Un salarié mensualisé peut demander un acompte correspondant au plus à :", ["La moitié de sa rémunération mensuelle", "La totalité de son salaire", "Un quart de son salaire annuel", "Un montant libre fixé par lui"], 0],
  ["Depuis le 1er juillet 2025, la procédure de saisie des rémunérations est conduite par :", ["Le service RH seul", "L'inspection du travail", "La caisse d'allocations familiales", "Un commissaire de justice"], 3],
  ["Le bulletin de paie peut être remis sous forme électronique :", ["Jamais", "Sauf opposition du salarié", "Seulement aux cadres", "Uniquement sur demande écrite de l'inspection du travail"], 1],
  ["L'employeur conserve le double des bulletins de paie pendant :", ["5 ans", "1 an", "6 mois", "2 ans"], 0],
  ["Une dispense d'adhésion à la complémentaire santé collective :", ["Est décidée par le manager", "Est automatique pour tous les CDD", "Est demandée par écrit par le salarié, dans les cas prévus par les textes", "N'existe pas"], 2],
];

const QCM_CP3: Q[] = [
  ["Le taux d'absentéisme se calcule ainsi :", ["Nombre d'absents divisé par l'effectif", "Heures d'absence divisées par les heures théoriques de travail, multipliées par 100", "Nombre de jours fériés de l'année", "Masse salariale divisée par l'effectif"], 1],
  ["Un salarié à 24 heures par semaine, pour une durée de référence de 35 heures, représente environ :", ["0,24 ETP", "1 ETP", "0,5 ETP", "0,69 ETP"], 3],
  ["La base de données économiques, sociales et environnementales est obligatoire à partir de :", ["50 salariés", "11 salariés", "300 salariés", "1 000 salariés"], 0],
  ["L'index de l'égalité professionnelle est publié chaque année au plus tard :", ["Le 31 décembre", "Le 1er mars", "Le 30 juin", "Le 15 septembre"], 1],
  ["Avec un index inférieur à 75 points, l'entreprise doit :", ["Ne rien faire", "Fermer un établissement", "Mettre en place des mesures de correction", "Supprimer la publication"], 2],
  ["Le bilan social est obligatoire à partir de :", ["11 salariés", "20 salariés", "50 salariés", "300 salariés"], 3],
  ["Le taux de l'obligation d'emploi des travailleurs handicapés est de :", ["6 % de l'effectif", "2 % de l'effectif", "10 % de l'effectif", "15 % de l'effectif"], 0],
  ["Pour représenter une pyramide des âges, le graphique le plus adapté est :", ["Un graphique en secteurs", "Un histogramme horizontal par tranche d'âge et par sexe", "Une courbe mensuelle", "Un nuage de points"], 1],
  ["Le taux de rotation du personnel se calcule généralement ainsi :", ["Entrées moins sorties", "Sorties divisées par les entrées", "Moyenne des entrées et des sorties divisée par l'effectif moyen, multipliée par 100", "Effectif final divisé par l'effectif initial"], 2],
  ["Un tableau de bord diffusé aux managers contient des données de rémunération :", ["Nominatives pour tous", "Publiées sur l'intranet", "Envoyées aux clients", "Agrégées ou limitées aux destinataires habilités"], 3],
];

const QCM_CP4: Q[] = [
  ["Depuis la loi du 24 octobre 2025, l'entretien de parcours professionnel a lieu, après le premier entretien :", ["Tous les 4 ans", "Tous les mois", "Uniquement à l'embauche", "Tous les 10 ans"], 0],
  ["Le premier entretien de parcours professionnel d'un salarié a lieu :", ["Avant la signature du contrat", "Le jour de l'embauche", "Dans l'année suivant l'embauche", "Au bout de 8 ans"], 2],
  ["L'entretien professionnel porte sur :", ["L'évaluation de la performance et la prime", "Les perspectives d'évolution professionnelle du salarié", "Les sanctions disciplinaires", "La vie privée du salarié"], 1],
  ["Dans une entreprise d'au moins 50 salariés, le non-respect des conditions de l'état des lieux peut entraîner :", ["Une amende pour le salarié", "La nullité du contrat", "Aucune conséquence", "Un abondement de 3 000 € sur le CPF du salarié"], 3],
  ["L'entretien de mi-carrière est organisé :", ["Dans les 2 mois suivant la visite médicale des 45 ans", "Le jour des 30 ans", "À chaque changement de manager", "Uniquement à la demande du CSE"], 0],
  ["La négociation sur la gestion des emplois et des parcours professionnels est obligatoire tous les 3 ans dans les entreprises d'au moins :", ["11 salariés", "300 salariés", "50 salariés", "20 salariés"], 1],
  ["Une fiche de poste décrit notamment :", ["Le salaire de tous les salariés", "Les opinions du titulaire", "Les missions, les activités, les compétences requises et le rattachement", "Le chiffre d'affaires de l'entreprise"], 2],
  ["Le compte rendu de l'entretien professionnel :", ["Reste secret pour le salarié", "Est affiché dans l'entreprise", "Est détruit après l'entretien", "Donne lieu à une copie remise au salarié"], 3],
  ["Depuis le 1er février 2026, la période de reconversion permet à un salarié :", ["De se former pour changer de métier ou évoluer, en remplacement de Pro-A et de Transco", "De partir en congé sabbatique", "De cumuler deux emplois", "De réduire son temps de travail"], 0],
  ["Lors de l'exploitation des comptes rendus d'entretiens, l'assistant RH :", ["Diffuse les comptes rendus à toute l'équipe", "Réalise une synthèse dans le respect de la confidentialité", "Les publie sur les réseaux sociaux", "Les transmet aux clients"], 1],
];

const QCM_CP5: Q[] = [
  ["Parmi ces mentions, laquelle est interdite dans une offre d'emploi ?", ["Poste en CDI à temps plein", "Expérience de deux ans en encadrement souhaitée", "Âge maximum : 35 ans", "Lieu de travail : Créteil"], 2],
  ["Une offre d'emploi diffusée en France est rédigée :", ["En français", "En anglais obligatoirement", "Dans la langue choisie par le manager", "Sans texte, uniquement avec des pictogrammes"], 0],
  ["Les informations demandées à un candidat doivent :", ["Porter sur sa situation familiale", "Être librement choisies par le recruteur", "Inclure ses opinions politiques", "Avoir un lien direct et nécessaire avec l'emploi proposé"], 3],
  ["Selon les recommandations de la CNIL, les données d'un candidat non retenu sont conservées au plus :", ["10 ans", "2 ans après le dernier contact", "Sans limite", "1 semaine"], 1],
  ["Une grille de présélection des CV repose sur :", ["Des critères issus du profil de poste", "La photo du candidat", "Le prénom du candidat", "L'intuition du recruteur"], 0],
  ["Un entretien structuré se caractérise par :", ["Des questions différentes pour chaque candidat", "L'absence de grille d'évaluation", "Les mêmes questions et la même grille pour tous les candidats", "Une durée libre sans préparation"], 2],
  ["Une question comportementale invite le candidat à :", ["Donner son âge", "Parler de sa famille", "Citer son salaire actuel", "Décrire une situation vécue, ce qu'il a fait et le résultat obtenu"], 3],
  ["Avant leur mise en œuvre, les méthodes et techniques d'aide au recrutement :", ["Sont tenues secrètes", "Sont portées à la connaissance du candidat", "Sont choisies par le candidat", "Sont interdites"], 1],
  ["Un programme d'intégration prévoit au minimum :", ["Les acteurs, les étapes et les outils nécessaires", "Une prime d'arrivée", "Un repas d'équipe", "Une seule réunion le premier jour"], 0],
  ["Le rapport d'étonnement sert à :", ["Sanctionner le nouveau salarié", "Remplacer la période d'essai", "Recueillir le regard du nouvel arrivant après quelques semaines", "Évaluer le manager"], 2],
];

const QCM_CP6: Q[] = [
  ["Le plan de développement des compétences distingue :", ["Les formations des cadres et des non-cadres", "Les actions obligatoires et les autres actions", "Les formations payantes et gratuites", "Les formations du matin et de l'après-midi"], 1],
  ["Une formation obligatoire, conditionnant l'exercice d'une activité, constitue :", ["Un temps de travail effectif avec maintien de la rémunération", "Un temps de repos", "Un congé sans solde", "Un temps personnel non rémunéré"], 0],
  ["Pour un salarié à temps plein, le CPF est alimenté chaque année de :", ["100 €", "1 500 €", "Aucun montant", "500 €, dans la limite de 5 000 €"], 3],
  ["Depuis le 2 mai 2024, l'utilisation du CPF par son titulaire entraîne :", ["La perte de ses droits", "Une participation forfaitaire, sauf exceptions", "L'accord obligatoire de l'employeur", "Un remboursement intégral par l'URSSAF"], 1],
  ["Le projet de transition professionnelle est instruit par :", ["Le CSE", "La mairie", "L'association Transitions Pro de la région", "L'inspection du travail"], 2],
  ["L'information et l'accompagnement des candidats à la VAE passent notamment par :", ["Le service public France VAE", "Le tribunal judiciaire", "La caisse de retraite", "Le registre du commerce"], 0],
  ["Le coût complet d'une action de formation comprend :", ["Le seul prix facturé par l'organisme", "Le seul salaire du formateur", "Le chiffre d'affaires du client", "Le coût pédagogique, les salaires maintenus et les frais annexes"], 3],
  ["L'évaluation à froid d'une formation sert à mesurer :", ["La satisfaction le jour même", "Le transfert des acquis en situation de travail quelques mois après", "Le prix de la formation", "La présence du formateur"], 1],
  ["L'OPCO finance le plan de développement des compétences des entreprises de :", ["Plus de 300 salariés", "Toutes tailles sans condition", "Moins de 50 salariés", "Plus de 1 000 salariés"], 2],
  ["La formation d'un apprenti en titre professionnel est financée :", ["Par son CPF", "Par l'apprenti lui-même", "Par le CSE", "Par l'OPCO de l'employeur selon le niveau de prise en charge du titre"], 3],
];

export const ARH41366_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM CP1 — Assurer la gestion administrative du personnel", QCM_CP1),
  qcmExercice("QCM CP2 — Assurer la gestion des variables et paramètres de paie", QCM_CP2),
  qcmExercice("QCM CP3 — Mettre en place et suivre les indicateurs ressources humaines", QCM_CP3),
  qcmExercice("QCM CP4 — Contribuer aux opérations liées à la gestion des emplois et carrières", QCM_CP4),
  qcmExercice("QCM CP5 — Contribuer au processus de recrutement et d'intégration du personnel", QCM_CP5),
  qcmExercice("QCM CP6 — Contribuer à l'élaboration et au suivi du développement des compétences du personnel", QCM_CP6),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (diagnostic puis CP1 à CP6), alignées sur les
 * 10 questions de positionnement ; les 6 QCM ensuite.
 */
export const ARH41366_EXERCICES_COMPLETS: AIContentExercise[] = [...ARH41366_EXERCICES, ...ARH41366_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Titre professionnel Assistant ressources humaines – RNCP41366 »</strong> : cadre juridique, compétences CP1 à CP6 et compétences transversales, modalités de l'épreuve du titre ; fil rouge ALTÉA SERVICES (entreprise fictive).</li>
  <li><strong>Cahier d'exercices</strong> : test de positionnement, 10 mises en situation professionnelles (diagnostic de départ puis CP1 à CP6) ; <strong>corrigés formateur</strong> publiés après correction.</li>
  <li><strong>6 QCM de 10 questions</strong>, un par compétence professionnelle (CP1 à CP6), corrigés en classe virtuelle.</li>
  <li><strong>Préparation au titre</strong> : sujets d'ECF par CCP, mise en situation professionnelle blanche de 3 h 30, guides d'entretien technique blanc (CP1 et CP5), trame du dossier professionnel.</li>
  <li><strong>Modèles de documents</strong> : check-list d'embauche, trames de contrats, documents de fin de contrat, tableau des variables de paie, tableau de bord RH, trame d'entretien professionnel, profil de poste, offre d'emploi, grilles de présélection et d'entretien, programme d'intégration, plan de développement des compétences, questionnaires d'évaluation de formation.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Classes virtuelles</strong> : Google Meet / Zoom, partage d'écran, salles de sous-groupes, tableau blanc collaboratif.</li>
  <li><strong>Plateforme pédagogique</strong> : supports, dépôts des exercices, QCM en ligne, suivi de progression, messagerie avec le formateur.</li>
  <li><strong>Outils de la fonction RH</strong> : tableur (Excel ou Google Sheets) pour les tableaux de bord et les variables de paie, démonstrations de SIRH et de logiciel de paie, espaces déclaratifs en ligne présentés à partir des guides officiels.</li>
  <li><strong>Livret d'apprentissage</strong> : missions en entreprise reliées à CP1-CP6, visa du maître d'apprentissage, suivi des visites et des entretiens tripartites.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>France Compétences — fiche RNCP41366</strong> : <a href="https://www.francecompetences.fr/recherche/rncp/41366/">https://www.francecompetences.fr/recherche/rncp/41366/</a> — blocs de compétences, modalités d'évaluation, voies d'accès du titre « Assistant ressources humaines ».</li>
  <li><strong>Légifrance</strong> : <a href="https://www.legifrance.gouv.fr/">https://www.legifrance.gouv.fr/</a> — Code du travail, conventions collectives (propreté, IDCC 3043).</li>
  <li><strong>Code du travail numérique</strong> : <a href="https://code.travail.gouv.fr/">https://code.travail.gouv.fr/</a> — fiches pratiques et convention collective applicable.</li>
  <li><strong>URSSAF</strong> : <a href="https://www.urssaf.fr/">https://www.urssaf.fr/</a> — DPAE, cotisations, montants et plafonds de l'année.</li>
  <li><strong>net-entreprises</strong> : <a href="https://www.net-entreprises.fr/">https://www.net-entreprises.fr/</a> — DSN, DPAE et déclarations sociales en ligne.</li>
  <li><strong>CNIL</strong> : <a href="https://www.cnil.fr/">https://www.cnil.fr/</a> — RGPD, gestion du personnel et recrutement.</li>
  <li><strong>Ministère du Travail</strong> : <a href="https://travail-emploi.gouv.fr/">https://travail-emploi.gouv.fr/</a> — titres professionnels, index de l'égalité, formation professionnelle.</li>
  <li><strong>Service-public.fr</strong> : <a href="https://www.service-public.fr/">https://www.service-public.fr/</a> — fiches pratiques employeurs et salariés, montants en vigueur.</li>
</ul>`;

const ARH41366_VIDEOS = [
  { title: "Le métier d'assistant ressources humaines", description: "Missions, environnement et compétences.", url: "https://www.youtube.com/results?search_query=m%C3%A9tier+assistant+ressources+humaines" },
  { title: "La DPAE et les formalités d'embauche", description: "Déclaration préalable à l'embauche et registre du personnel.", url: "https://www.youtube.com/results?search_query=DPAE+formalit%C3%A9s+embauche+employeur" },
  { title: "Le contrat à durée déterminée", description: "Motifs, mentions obligatoires, fin de contrat.", url: "https://www.youtube.com/results?search_query=contrat+CDD+mentions+obligatoires+motifs" },
  { title: "La rupture conventionnelle", description: "Procédure, délais et homologation.", url: "https://www.youtube.com/results?search_query=rupture+conventionnelle+proc%C3%A9dure+homologation" },
  { title: "Les éléments variables de paie", description: "Collecte, contrôle et transmission.", url: "https://www.youtube.com/results?search_query=%C3%A9l%C3%A9ments+variables+de+paie+collecte" },
  { title: "Construire un tableau de bord RH", description: "Indicateurs, formules et graphiques sur tableur.", url: "https://www.youtube.com/results?search_query=tableau+de+bord+RH+Excel+indicateurs" },
  { title: "L'index de l'égalité professionnelle", description: "Indicateurs, publication et mesures.", url: "https://www.youtube.com/results?search_query=index+%C3%A9galit%C3%A9+professionnelle+femmes+hommes" },
  { title: "L'entretien professionnel", description: "Entretien de parcours professionnel : périodicité et état des lieux.", url: "https://www.youtube.com/results?search_query=entretien+professionnel+obligations+employeur" },
  { title: "Conduire un entretien de recrutement", description: "Guide structuré et questions comportementales.", url: "https://www.youtube.com/results?search_query=conduire+entretien+de+recrutement+structur%C3%A9" },
  { title: "Le plan de développement des compétences", description: "Construction, dispositifs et financement.", url: "https://www.youtube.com/results?search_query=plan+de+d%C3%A9veloppement+des+comp%C3%A9tences+entreprise" },
];

export const ARH41366_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: ARH41366_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: ARH41366_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement début / fin
// ---------------------------------------------------------------------------
export const ARH41366_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "La déclaration préalable à l'embauche est adressée :", options: ["À l'URSSAF, avant la prise de poste", "Au CSE après l'embauche", "À la mairie", "Au salarié uniquement"], correctIndex: 0 },
  { question: "Un contrat à durée déterminée :", options: ["Peut être verbal", "Doit être écrit et comporter un motif précis", "N'a jamais de terme", "Ne peut pas comporter de période d'essai"], correctIndex: 1 },
  { question: "La durée légale du travail à temps plein est de :", options: ["39 heures par semaine", "40 heures par semaine", "35 heures par semaine", "32 heures par semaine"], correctIndex: 2 },
  { question: "Les éléments variables de paie sont :", options: ["Identiques chaque mois", "Fixés par la convention collective uniquement", "Choisis par le salarié", "Les événements du mois qui modifient le bulletin : absences, heures supplémentaires, primes"], correctIndex: 3 },
  { question: "ETP signifie :", options: ["Équivalent temps plein", "Effectif total permanent", "Entretien de travail professionnel", "État des temps partiels"], correctIndex: 0 },
  { question: "Le comité social et économique représente :", options: ["Les clients", "Les salariés auprès de l'employeur", "Les actionnaires", "Les fournisseurs"], correctIndex: 1 },
  { question: "L'entretien professionnel a pour objet :", options: ["La fixation du salaire", "La sanction d'une faute", "Les perspectives d'évolution professionnelle du salarié", "Le contrôle des absences"], correctIndex: 2 },
  { question: "Une offre d'emploi peut mentionner :", options: ["Le sexe souhaité du candidat", "Un âge maximum", "La nationalité exigée", "Le type de contrat, le lieu et les horaires"], correctIndex: 3 },
  { question: "Le CPF est :", options: ["Un compte personnel de formation alimenté en euros", "Un contrat de travail", "Une cotisation patronale", "Un congé payé"], correctIndex: 0 },
  { question: "Les données personnelles des salariés sont protégées notamment par :", options: ["Le Code de la route", "Le RGPD", "Le Code de commerce uniquement", "Aucune règle"], correctIndex: 1 },
];

export const ARH41366_QCM_FIN: AIQCMQuestion[] = [
  { question: "Pour un CDD de 6 mois, la période d'essai est au plus de :", options: ["1 mois", "2 mois", "1 jour par semaine, dans la limite de 2 semaines", "3 semaines"], correctIndex: 2 },
  { question: "L'indemnité légale de licenciement au-delà de 10 ans d'ancienneté est de :", options: ["1/3 de mois de salaire par année au-delà de 10 ans", "1/4 de mois par année", "1/2 mois par année", "1 mois par année"], correctIndex: 0 },
  { question: "La durée hebdomadaire moyenne de travail ne peut dépasser, sur 12 semaines consécutives :", options: ["40 heures", "44 heures", "48 heures", "50 heures"], correctIndex: 1 },
  { question: "Le signalement d'un arrêt de travail pour l'attestation de salaire est transmis :", options: ["Par courrier au médecin", "Par le salarié lui-même", "Au CSE", "Via la DSN"], correctIndex: 3 },
  { question: "Avec un index de l'égalité de 78 points, l'entreprise doit :", options: ["Fixer et publier des objectifs de progression", "Mettre en place des mesures de correction", "Ne rien publier", "Payer une pénalité immédiate"], correctIndex: 0 },
  { question: "La directive (UE) 2023/970 porte sur :", options: ["La durée du travail", "Le télétravail", "La transparence des rémunérations entre les femmes et les hommes", "Les congés payés"], correctIndex: 2 },
  { question: "Dans une entreprise de 148 salariés, l'obligation d'emploi des travailleurs handicapés porte sur :", options: ["6 bénéficiaires", "8 bénéficiaires", "15 bénéficiaires", "Aucun bénéficiaire"], correctIndex: 1 },
  { question: "L'entretien technique de l'épreuve du titre ARH porte, après les choix de la mise en situation, sur :", options: ["CP2 et CP3", "CP4 et CP6", "Toutes les compétences au choix du candidat", "CP1 et CP5"], correctIndex: 3 },
  { question: "La mise en situation professionnelle de l'épreuve du titre ARH dure :", options: ["1 h", "2 h", "3 h 30", "6 h"], correctIndex: 2 },
  { question: "Le projet de transition professionnelle permet :", options: ["De se former pour changer de métier, avec maintien de la rémunération sous conditions", "De prendre des congés supplémentaires", "De réduire son salaire", "De quitter l'entreprise sans préavis"], correctIndex: 0 },
];

export const ARH41366_EVAL_PACK: AIEvalPack = {
  qcmDebut: ARH41366_QCM_DEBUT,
  qcmFin: ARH41366_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du bloc 1, avant l'ECF du CCP1) — l'embauche et la première paie de M. Moussa KONÉ",
    contexte:
      "Cas fictif. ALTÉA SERVICES embauche le 16 novembre 2026 M. Moussa KONÉ, agent de propreté en CDI à temps partiel de 26 heures par semaine sur le site de Créteil. Il signale lors de l'accueil qu'il est déjà couvert par la mutuelle de son épouse en tant qu'ayant droit. Le 23 novembre, il est en arrêt maladie pendant 4 jours. La direction demande en fin de mois l'effectif, les ETP et l'absentéisme de novembre.",
    questions: [
      { question: "Quelles formalités d'embauche réalisez-vous et dans quels délais ?", reponseAttendue: "DPAE au plus tôt 8 jours avant l'embauche et avant la prise de poste ; inscription au registre unique du personnel ; contrat écrit à temps partiel avec la durée hebdomadaire, sa répartition, les modalités de modification et les limites des heures complémentaires ; visite d'information et de prévention dans les 3 mois ; dossier individuel dans le SIRH avec accès restreint ; informations sur les éléments essentiels de la relation de travail.", points: 5 },
      { question: "Comment traitez-vous sa situation au regard de la complémentaire santé ?", reponseAttendue: "Une dispense d'adhésion est possible si le salarié est couvert en tant qu'ayant droit par la complémentaire collective obligatoire de son conjoint ; elle doit être demandée par écrit par le salarié, avec le justificatif, et conservée ; à défaut, affiliation dès l'embauche ; information transmise au service paie.", points: 5 },
      { question: "Quelles variables transmettez-vous pour la paie de novembre ?", reponseAttendue: "Date d'entrée pour le calcul au prorata, durée contractuelle, arrêt maladie de 4 jours avec l'avis d'arrêt, signalement en DSN pour l'attestation de salaire, carence de 3 jours pour les indemnités journalières ; pas de maintien légal de salaire faute d'un an d'ancienneté, sauf disposition conventionnelle plus favorable à vérifier ; statut de la mutuelle (dispense).", points: 5 },
      { question: "Comment calculez-vous et présentez-vous les indicateurs demandés ?", reponseAttendue: "Effectif en fin de mois selon les règles applicables ; ETP = durée contractuelle / durée de référence (26 / 35 = 0,74 ETP pour M. KONÉ) ; absentéisme = heures d'absence / heures théoriques × 100 ; sources (SIRH, paie), contrôle de cohérence, présentation agrégée sans donnée nominative de santé, commentaire court pour la direction.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale — mise en situation professionnelle blanche de 3 h 30, entretien technique et entretien final blancs (préparation au titre)",
    exercices: [
      {
        titre: "Partie 1 — Étude de cas : administration du personnel (CP1)",
        consigne: "À partir du dossier ALTÉA SERVICES remis en début d'épreuve (après 15 minutes de prise en main du poste), traitez les formalités d'embauche d'un salarié, une question d'un salarié sur ses droits, le calcul d'une indemnité de fin de contrat et la préparation d'un dossier de consultation du CSE. Documentation et notes professionnelles autorisées.",
        reponseAttendue: "Formalités et documents conformes aux obligations légales, échéances respectées, réponse sourcée et exacte, calcul juste avec la méthode, dossier du CSE structuré ; confidentialité respectée. Critères de performance du référentiel : cadres juridiques et conventionnels respectés, documents conformes, informations fiables et exhaustives.",
        points: 20,
      },
      {
        titre: "Partie 2 — Étude de cas : variables de paie (CP2)",
        consigne: "Collectez et contrôlez les éléments variables du mois à partir des pièces du dossier (absences, heures, congés, primes, acompte, saisie, entrées et sorties), puis préparez le fichier de transmission au service paie et contrôlez un bulletin.",
        reponseAttendue: "Éléments variables collectifs et individuels collectés, justificatifs identifiés, contrôles de cohérence, bulletin conforme aux paramètres individuels, délais respectés, confidentialité. Critères du référentiel CP2.",
        points: 20,
      },
      {
        titre: "Partie 3 — Étude de cas : indicateurs et tableau de bord (CP3)",
        consigne: "Calculez les indicateurs demandés, construisez le tableau de bord et un graphique, puis rédigez une note d'analyse pour la direction, en tenant compte des obligations liées à l'effectif de l'entreprise.",
        reponseAttendue: "Données sélectionnées selon l'objectif, calculs exacts, éléments significatifs repérés, analyse cohérente, résultats exploitables et adaptés au destinataire, confidentialité. Critères du référentiel CP3.",
        points: 20,
      },
      {
        titre: "Partie 4 — Étude de cas : emplois et carrières, développement des compétences (CP4, CP6)",
        consigne: "Établissez le planning des entretiens professionnels à réaliser, exploitez trois comptes rendus fournis, puis préparez le dossier d'une action de formation (dispositif, coût, logistique, évaluation).",
        reponseAttendue: "Planning conforme au cadre légal, exploitation des entretiens en fonction des objectifs donnés, informations fiables et diffusées dans le respect du cadre légal ; documents de formation renseignés de façon exhaustive, coût exact, dispositif adapté. Critères des référentiels CP4 et CP6.",
        points: 20,
      },
      {
        titre: "Partie 5 — Étude de cas et entretien technique blanc : recrutement et intégration (CP5)",
        consigne: "Rédigez le profil de poste, l'offre et la grille de présélection d'un recrutement du dossier, puis le programme d'intégration. Entretien technique blanc de 30 minutes : 10 minutes sur vos choix lors de la mise en situation, 20 minutes sur CP1 et CP5.",
        reponseAttendue: "Profil précis et synthétique, offre conforme à la législation, grille cohérente avec le profil, programme d'intégration prévoyant acteurs, étapes et outils ; explication argumentée des choix ; posture professionnelle. Critères du référentiel CP5.",
        points: 20,
      },
      {
        titre: "Partie 6 — Entretien final blanc (20 minutes) avec le dossier professionnel",
        consigne: "Présentez votre représentation de l'emploi d'assistant ressources humaines et des comportements professionnels attendus, en vous appuyant sur votre dossier professionnel et sur vos missions en entreprise. La session de validation du titre a lieu devant un jury de professionnels habilité par la DREETS, selon le calendrier du centre d'examen.",
        reponseAttendue: "Vision juste du métier et de ses limites (confidentialité, rôle d'assistance, relations internes et externes), exemples concrets tirés du dossier professionnel, compétences transversales (veille, modes opératoires, attention continue), projet professionnel argumenté.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const ARH41366_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — loi du 22 avril 2024",
      titre: "Congés payés pendant la maladie : application de la loi n° 2024-364 du 22 avril 2024",
      date: "Janvier 2026",
      commentaire: "Relecture des règles d'acquisition des congés payés pendant un arrêt maladie (2 jours ouvrables par mois pour une maladie non professionnelle, dans la limite de 24 jours par période de référence), de l'information du salarié à sa reprise et de la période de report de 15 mois.",
      exploitation: "Preuve : fiche mémo datée archivée au dossier Qualiopi. Action : mise à jour du chapitre CP1 sur les congés payés, de l'exercice 3 et du QCM CP2.",
    },
    {
      lien: "https://eur-lex.europa.eu/eli/dir/2023/970/oj",
      titreLien: "EUR-Lex — directive (UE) 2023/970",
      titre: "Transparence des rémunérations : transposition de la directive attendue au plus tard le 7 juin 2026",
      date: "Février 2026",
      commentaire: "Suivi de la transposition en droit français : information des candidats sur la rémunération, interdiction de les interroger sur leurs rémunérations antérieures, droit à l'information des salariés, rapports sur les écarts et évaluation conjointe. Le texte français applicable est vérifié à chaque session.",
      exploitation: "Preuve : note de veille datée. Action : mise à jour de l'exercice 6, de l'exercice 8 (offre d'emploi) et du QCM de fin.",
    },
    {
      lien: "https://egapro.travail.gouv.fr/",
      titreLien: "Egapro — index de l'égalité professionnelle",
      titre: "Index de l'égalité professionnelle : publication au plus tard le 1er mars",
      date: "Mars 2026",
      commentaire: "Rappel des règles de calcul et de publication de l'index dans les entreprises d'au moins 50 salariés, des mesures de correction sous 75 points et des objectifs de progression sous 85 points ; articulation avec la future transposition de la directive sur la transparence des rémunérations.",
      exploitation: "Preuve : capture datée du site. Action : actualisation du chapitre CP3 et du QCM CP3.",
    },
    {
      lien: "https://www.urssaf.fr/",
      titreLien: "URSSAF",
      titre: "Montants et plafonds de l'année : SMIC, plafond de la Sécurité sociale, seuils",
      date: "Avril 2026",
      commentaire: "Vérification des montants en vigueur utilisés dans les exercices de paie et d'indicateurs ; les valeurs de l'année précédente sont présentées avec leur année et la mention de vérification sur urssaf.fr et service-public.fr.",
      exploitation: "Preuve : tableau des montants daté. Action : contrôle des données chiffrées de l'exercice 4 et du support de cours CP2.",
    },
    {
      lien: "https://www.francecompetences.fr/recherche/rncp/41366/",
      titreLien: "France Compétences — fiche RNCP41366",
      titre: "Titre professionnel Assistant ressources humaines : enregistrement du 05/11/2025 au 04/11/2027",
      date: "Mai 2026",
      commentaire: "La fiche RNCP41366 remplace la fiche RNCP35030 ; elle reprend les deux blocs (missions opérationnelles de la gestion des ressources humaines ; contribution au développement des ressources humaines) et les modalités d'évaluation par CCP. L'échéance d'enregistrement du 04/11/2027 est à surveiller pour les apprentis dont le contrat se termine fin 2027.",
      exploitation: "Preuve : capture datée de la fiche. Action : vérification à chaque session de l'état de la fiche et information des apprentis sur le calendrier des sessions de validation.",
    },
  ],
  metier: [
    {
      lien: "https://travail-emploi.gouv.fr/",
      titreLien: "Ministère du Travail",
      titre: "Titres professionnels : référentiels, dossier professionnel et sessions de validation",
      date: "Juin 2026",
      commentaire: "Relecture du référentiel emploi activités compétences et du référentiel d'évaluation du titre (TP-01284) : critères de performance, épreuve de 4 h 20 (mise en situation de 3 h 30, entretien technique de 30 min, entretien final de 20 min), épreuves des CCP de 2 h 20.",
      exploitation: "Preuve : tableau de correspondance compétences / séquences daté. Action : ajustement de la mise en situation blanche et des grilles d'entretien technique.",
    },
    {
      lien: "https://www.cnil.fr/",
      titreLien: "CNIL",
      titre: "Gestion du personnel et recrutement : durées de conservation et droits des personnes",
      date: "Juillet 2026",
      commentaire: "Rappel des recommandations de la CNIL sur les traitements RH : données strictement nécessaires, information des salariés et des candidats, conservation limitée (notamment 2 ans au plus pour les candidats non retenus après le dernier contact), sécurité des accès.",
      exploitation: "Preuve : extrait archivé. Action : actualisation des exercices 2 et 9 et du QCM CP5.",
    },
    {
      lien: "https://www.service-public.fr/",
      titreLien: "Service-public.fr",
      titre: "Entretien professionnel et compte personnel de formation : fiches pratiques à jour",
      date: "Août 2026",
      commentaire: "Vérification des fiches sur l'entretien de parcours professionnel issu de la loi du 24 octobre 2025 (premier entretien dans l'année suivant l'embauche, puis tous les 4 ans, état des lieux à 8 ans, mi-carrière, abondement correctif), sur la participation forfaitaire du CPF en vigueur depuis le 2 mai 2024 et sur la période de reconversion qui remplace Pro-A et Transco depuis le 1er février 2026.",
      exploitation: "Preuve : journal de veille. Action : mise à jour des exercices 7 et 10 et des QCM CP4 et CP6.",
    },
  ],
  technologique: [
    {
      lien: "https://www.net-entreprises.fr/",
      titreLien: "net-entreprises",
      titre: "DSN et DPAE : cahier technique et calendrier des déclarations",
      date: "Septembre 2026",
      commentaire: "Suivi des évolutions de la DSN (signalements d'arrêt de travail et de fin de contrat, échéances du 5 ou du 15) et des modalités de la DPAE en ligne, utiles pour les démonstrations en classe virtuelle.",
      exploitation: "Preuve : synthèse archivée. Action : mise à jour des démonstrations du chapitre CP2 et de la check-list d'embauche.",
    },
    {
      lien: "https://www.cnil.fr/",
      titreLien: "CNIL — intelligence artificielle",
      titre: "Outils d'intelligence artificielle dans le recrutement et la gestion RH",
      date: "Octobre 2026",
      commentaire: "Veille sur les recommandations relatives aux outils d'aide au tri de candidatures et aux SIRH utilisant l'intelligence artificielle : information des candidats, intervention humaine, absence de discrimination, analyse d'impact.",
      exploitation: "Preuve : note de veille. Action : ajout d'un point de vigilance dans le chapitre CP5 et dans l'exercice 8.",
    },
    {
      lien: "https://code.travail.gouv.fr/",
      titreLien: "Code du travail numérique",
      titre: "Recherche juridique : simulateurs et fiches de la convention collective",
      date: "Octobre 2026",
      commentaire: "Présentation aux apprentis des outils de recherche (convention collective par IDCC, simulateurs d'indemnités et de préavis) et de leurs limites : vérification systématique de la source sur Légifrance.",
      exploitation: "Preuve : journal de veille. Action : fiche méthode « rechercher une information juridique » remise lors du module d'accueil.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Exercices CFA par matière (IND 11) : consigne de la mise en situation de la compétence, copie de
// l'apprenti propre à son terrain et note variée.
// ---------------------------------------------------------------------------
export function getARH41366ExerciceCFA(
  matiereTitre: string,
  exInMatiere: number,
  stagiaireIdx: number,
  s: { civilite?: string; prenom?: string; entreprise?: string },
): { consigne: string; reponse: string; note: number } | null {
  const seance = arh41366SeanceCFA(matiereTitre, exInMatiere);
  if (!seance) return null;
  const ex = ARH41366_EXERCICES[seance.miseEnSituation];
  return {
    consigne: `${seance.seance}. ${ex.titre}\n\n${ex.consigne}`,
    reponse: arh41366Production(seance.miseEnSituation, stagiaireIdx, s, seance.miseEnSituation + exInMatiere),
    note: arh41366NoteExercice(stagiaireIdx, seance.miseEnSituation * 5 + exInMatiere, false),
  };
}

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedARH41366AICaches(f: FormationInfo = FORMATION_ARH41366): void {
  try {
    setCachedContentPack(f, ARH41366_CONTENT_PACK);
    setCachedEvalPack(f, ARH41366_EVAL_PACK);
    setCachedVeillePack(f, ARH41366_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
