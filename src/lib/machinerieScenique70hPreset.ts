/**
 * Preset complet « Machinerie scénique, moteurs et ponts : équipements fixes et grils provisoires – 70 h »
 * — formation professionnelle NON certifiante (aucun titre ni répertoire visé, non éligible au compte
 * personnel de formation). Évaluation interne : attestation de fin de formation et certificat de réalisation.
 * 70 heures sur 10 jours (7 h par jour, 9h00 – 12h30 / 13h30 – 17h00), groupe de 6 techniciens du
 * spectacle (intermittents et permanents) ; financement habituel : Afdas, opérateur de compétences
 * de la culture. Tarif non renseigné (aucune source) : à saisir dans le dossier.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - 6 compétences C1 à C6 = 6 chapitres du support ; fil rouge : Théâtre des Quatre Vents, salle FICTIVE
 *    de 600 places (scène de 14 m d'ouverture sur 10 m de profondeur, gril technique à 18 m)
 *  - AUCUN stagiaire pré-importé, AUCUNE donnée de satisfaction
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées et 6 QCM de 10 questions,
 *    un par compétence (bonne réponse et explication dans le corrigé)
 *  - Pack évaluation : QCM de positionnement de début « Positionnement — vos repères de départ »
 *    (10 questions expliquées), QCM de fin, cas pratique intermédiaire, évaluation finale interne
 *  - Pack veille (réglementaire / métier / technologique)
 * La modalité n'est écrite dans aucun texte : seul le champ `modalites` la porte.
 * Les valeurs chiffrées des exercices (masses, tables de charge, points d'accroche) sont des données
 * pédagogiques du cas fictif : sur le terrain, seules comptent les notices des fabricants et les notes
 * de calcul du lieu.
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
export const FORMATION_MSC70: FormationInfo = {
  intitule: "Machinerie scénique, moteurs et ponts : équipements fixes et grils provisoires – 70 h",
  codeRNCP: "",
  objectifs:
    "Formation professionnelle non certifiante. Objectif général : rendre le technicien de plateau capable de préparer, mettre en œuvre, exploiter et démonter en sécurité les équipements de machinerie scénique fixes (cage de scène, gril, porteuses contrebalancées et motorisées, rideau de fer, dessous) et les grils provisoires (ponts en aluminium suspendus à des palans électriques à chaîne ou posés sur ground support), dans le respect du cadre réglementaire, des notices des fabricants et des règles du lieu.\nÀ l'issue de la formation, le participant sera capable de :\n- C1 — Situer les responsabilités de chacun et appliquer le cadre réglementaire et les principes de prévention du levage et du travail en hauteur dans un lieu de spectacle.\n- C2 — Manœuvrer en sécurité les équipements fixes de scène : porteuses contrebalancées et motorisées, rideau de fer, rideaux, trappes et dessous.\n- C3 — Déterminer les efforts dans un élingage et choisir, contrôler et mettre au rebut les accessoires de levage.\n- C4 — Mettre en place, commander, contrôler et diagnostiquer des palans électriques à chaîne selon leur usage (D8, D8+, C1).\n- C5 — Concevoir un plan d'accroche, répartir les charges d'un gril provisoire entre ses points et vérifier les ponts selon les tables du fabricant.\n- C6 — Conduire en sécurité le montage, la levée, l'exploitation et le démontage d'une installation de levage, et réagir à un incident.",
  prerequis:
    "Expérience de plateau (machiniste, régisseur plateau, technicien polyvalent du spectacle). Aptitude au travail en hauteur. Lire un plan simple et effectuer les quatre opérations.",
  duree: "70 heures réparties sur 10 jours (7 h par jour : 9h00 – 12h30 et 13h30 – 17h00)",
  dureeSaisiePrioritaire: true,
  modalites: "distanciel",
  tarif: "",
  programme:
    "JOUR 1 — CADRE ET RESPONSABILITÉS (C1, 7 h) : QCM de positionnement « Positionnement — vos repères de départ » et recueil des expériences ; rôles de l'employeur, de l'exploitant du lieu, du régisseur général, du chef machiniste et de la compagnie accueillie ; principes généraux de prévention ; document unique d'évaluation des risques ; plan de prévention avec une entreprise extérieure ; règlement de sécurité des établissements recevant du public, type L, en grandes lignes ; présentation du fil rouge : le Théâtre des Quatre Vents.\nJOUR 2 — LEVAGE, HAUTEUR ET PREMIERS ÉQUIPEMENTS FIXES (C1 puis C2, 7 h) : équipements de travail et levage dans le Code du travail ; vérifications générales périodiques des appareils et accessoires de levage (arrêté du 1er mars 2004), registre de sécurité ; interdiction du levage de personnes sans équipement prévu à cet effet ; charges au-dessus des personnes ; travail en hauteur, protections collectives et EPI ; atelier « Accueillir une compagnie qui accroche au-dessus du public » ; QCM C1. Après-midi : la cage de scène, le gril technique, les cintres et les passerelles.\nJOUR 3 — PORTEUSES CONTREBALANCÉES (C2, 7 h) : équipes, contrepoids, frein, cordes de manœuvre ; charger et décharger une porteuse dans le bon ordre ; équilibrage ; atelier « Équilibrer une porteuse chargée d'un décor » ; vocabulaire et communication de manœuvre.\nJOUR 4 — PORTEUSES MOTORISÉES, RIDEAU DE FER ET DESSOUS (C2 puis C3, 7 h) : treuils, variateurs, commande et sécurités (fins de course, frein, détection de mou de câble, arrêt d'urgence) ; rideau de fer, rideaux et pendrillons, trappes et dessous ; atelier « Préparer la manœuvre d'une porteuse motorisée et l'essai du rideau de fer » ; QCM C2. Après-midi : masse et poids, CMU et charge minimale de rupture, coefficients d'utilisation.\nJOUR 5 — ÉLINGAGE ET ACCESSOIRES (C3 puis C4, 7 h) : angles d'élingage et facteur de mode ; élingues acier, textiles et chaînes ; manilles, crochets, colliers ; marquage CE et déclaration de conformité ; contrôle visuel avant usage et mise au rebut ; ateliers « Calculer un élingage à deux brins » et « Trier un lot d'accessoires » ; QCM C3 ; cas pratique intermédiaire. Fin de journée : présentation des palans électriques à chaîne.\nJOUR 6 — PALANS ÉLECTRIQUES À CHAÎNE (C4, 7 h) : constitution, frein, fins de course, limiteur de couple ; référentiels d'usage D8, D8+ et C1 ; commande directe et commande basse tension, pupitres ; ordre des phases et sens de marche ; atelier « Mettre en place et contrôler un palan avant usage ».\nJOUR 7 — PALANS (FIN) ET PONTS (C4 puis C5, 7 h) : contrôle de la chaîne, sac à chaîne, chaîne vrillée, défauts courants, maintenance de premier niveau ; atelier « Diagnostiquer quatre défauts de palan » ; QCM C4. Après-midi : structures en aluminium (triangulaires, carrées), assemblage par manchons et goupilles, lecture des tables de charge du fabricant (charge répartie, charge ponctuelle, portée).\nJOUR 8 — GRILS PROVISOIRES : PLAN ET CALCULS (C5, 7 h) : points d'accroche dans la structure du bâtiment et charges admissibles ; plan d'accroche ; répartition des charges entre deux, trois et quatre palans ; charges ponctuelles et règle du levier ; atelier « Répartir les charges d'un pont de 12 m ».\nJOUR 9 — GROUND SUPPORT, LEVÉE SYNCHRONISÉE ET PRÉPARATION (C5 puis C6, 7 h) : ground support (embase, tours, stabilisateurs, aplomb), mise en hauteur synchronisée par paliers ; atelier « Vérifier une configuration avec la table du fabricant » ; QCM C5. Après-midi : préparation d'une installation (plan, feuille de charges, registre), organisation de l'équipe et communication radio.\nJOUR 10 — METTRE EN ŒUVRE EN SÉCURITÉ ET ÉVALUATION (C6, 7 h) : déroulé complet montage, levée, réglage, exploitation, démontage ; consignation ; gestion d'incident ; atelier « Conduire l'installation d'un gril provisoire et gérer un incident » ; QCM C6 ; évaluation finale des acquis ; bilan de la formation.",
  methodesEvaluation:
    "Positionnement en ouverture : QCM « Positionnement — vos repères de départ » (10 questions, une seule bonne réponse chacune, corrigé et expliqué), comparé au QCM de fin pour mesurer la progression, et 10 questions ouvertes de positionnement. Évaluation formative chaque jour, en alternant mises en situation corrigées (calculs, procédures, check-lists, diagnostic) et QCM corrigés de 10 questions sur la compétence du jour (C1 à C6) ; cas pratique intermédiaire en fin de jour 5. Évaluation finale interne le jour 10 : QCM des acquis, calcul de répartition et d'élingage, feuille de charges, contrôle d'un palan et conduite d'une installation avec gestion d'un incident, notés sur une grille d'acquisition des compétences C1 à C6. Questionnaire de satisfaction en fin de formation et évaluation à froid. Formation non certifiante : attestation de fin de formation mentionnant les objectifs et le niveau d'acquisition de chaque compétence, et certificat de réalisation.",
  moyensPedagogiques:
    "Apports structurés à partir du support de cours (6 chapitres, un par compétence), démonstrations commentées, études de cas et mises en situation guidées sur le fil rouge du Théâtre des Quatre Vents, salle fictive de 600 places ; exercices de calcul (masses, angles d'élingage, répartition des charges) corrigés pas à pas ; lecture de notices de palans, de tables de charge de ponts et de rapports de vérification ; check-lists de contrôle avant usage, modèles de plan d'accroche, de feuille de charges et de plan de prévention ; QCM corrigés et expliqués. Le formateur est un professionnel de la machinerie et de l'accroche en lieu de spectacle. Livrables remis au participant : support de cours, fiches à retenir, check-lists et modèles.",
  publicVise:
    "Techniciens du spectacle, intermittents et permanents : machinistes, cintriers, régisseurs plateau, régisseurs généraux, techniciens polyvalents, techniciens lumière ou son amenés à accrocher. Groupe de 6 participants au plus, pour permettre à chacun de pratiquer chaque procédure. Financement possible par l'Afdas, opérateur de compétences de la culture, par l'employeur ou à titre personnel.",
  delaiAcces:
    "Inscription au plus tard 15 jours avant le début de la session, le temps de valider le positionnement et la prise en charge du financement ; entretien préalable pour vérifier l'expérience de plateau et l'aptitude au travail en hauteur.",
  dateDebut: "2026-11-23",
  dateFin: "2026-12-04",
  lieu: "",
  nombreParticipants: "6",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Savoir qui est responsable de quoi lors de l'accueil d'une compagnie ou d'un prestataire qui accroche dans le lieu.",
  "Connaître les obligations de vérification des appareils et accessoires de levage et savoir lire un rapport de vérification.",
  "Charger, équilibrer et manœuvrer une porteuse contrebalancée sans risque d'emballement.",
  "Préparer et annoncer la manœuvre d'une porteuse motorisée et connaître ses sécurités.",
  "Calculer l'effort dans chaque brin d'une élingue selon l'angle et choisir l'accessoire adapté.",
  "Contrôler les accessoires avant usage et décider sans hésiter d'une mise au rebut.",
  "Mettre en place et commander des palans électriques à chaîne, en connaissant les différences entre D8, D8+ et C1.",
  "Répartir les charges d'un pont entre ses palans et vérifier la configuration avec la table du fabricant.",
  "Monter, lever et démonter un gril provisoire ou un ground support en équipe, avec une communication claire.",
  "Réagir correctement à un incident de levage : arrêter, sécuriser, prévenir, consigner.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins est conduite avant la session (questionnaire préalable et entretien avec chaque participant, et avec l'employeur lorsqu'il finance la formation) puis à l'ouverture : QCM « Positionnement — vos repères de départ » (10 questions sur les notions clés des six compétences, comparé au QCM de fin pour mesurer la progression), 10 questions ouvertes sur les pratiques de chacun et tour de table des expériences de plateau. Les participants sont des techniciens du spectacle, intermittents ou permanents, dont les parcours sont très différents : certains manœuvrent chaque jour des porteuses dans une salle équipée, d'autres montent des grils provisoires en tournée ou en plein air, d'autres encore viennent de la lumière ou du son et accrochent occasionnellement.</p>
<ul>
  <li><strong>Cadre et responsabilités (C1)</strong> : besoin fréquent de savoir qui décide et qui signe lorsqu'une compagnie arrive avec son propre matériel, et de connaître les vérifications obligatoires.</li>
  <li><strong>Équipements fixes (C2)</strong> : les gestes de manœuvre sont souvent appris sur le tas ; l'ordre de chargement d'une porteuse contrebalancée et les sécurités des porteuses motorisées sont à consolider.</li>
  <li><strong>Calculs et accessoires (C3, C5)</strong> : les angles d'élingage, la répartition des charges entre palans et la lecture des tables de charge sont la principale difficulté exprimée.</li>
  <li><strong>Palans et mise en œuvre (C4, C6)</strong> : différences entre D8, D8+ et C1, commande et diagnostic des palans, organisation d'une levée en équipe et gestion d'un incident.</li>
</ul>
<p>Le Théâtre des Quatre Vents, salle fictive de 600 places (scène de 14 m d'ouverture sur 10 m de profondeur, gril technique à 18 m, 30 porteuses contrebalancées et 6 porteuses motorisées), sert de fil rouge à tous les exercices, avant la transposition aux lieux et aux tournées des participants.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Niveaux de départ différents</strong> : binômes associant un participant expérimenté en équipements fixes et un participant expérimenté en grils provisoires ; exercices de calcul proposés en deux niveaux (guidé puis autonome).</li>
  <li><strong>Calculs</strong> : rappel des quatre opérations, des fractions et de la règle du levier en début de compétence C3 ; tableau des facteurs d'angle fourni ; calculatrice autorisée à toutes les évaluations.</li>
  <li><strong>Situations réelles</strong> : chaque participant apporte, s'il le peut, un plan d'accroche, une fiche technique de tournée ou un rapport de vérification de son lieu, exploité dans les ateliers (données personnelles et noms de structures retirés).</li>
  <li><strong>Sécurité</strong> : rappel des règles de sécurité à chaque mise en situation ; aucun exercice ne demande de travailler en hauteur à un participant qui ne s'y sent pas apte ce jour-là.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, supports transmis à l'avance sur demande, temps majoré et aménagement des évaluations sur demande.</li>
</ul>`;

/** 10 mises en situation (C1 à C6), corrigés formateur. */
export const MSC70_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — C1 : accueillir une compagnie qui accroche au-dessus du public, responsabilités et prévention",
    consigne:
      "Cas : la compagnie Les Passe-Murailles (fictive) arrive au Théâtre des Quatre Vents avec un pont de 10 m chargé de 8 projecteurs, qu'elle veut suspendre au-dessus des premiers rangs du public à l'aide de deux palans électriques à chaîne de 500 kg de son parc, utilisés en D8. Sa fiche technique ne mentionne ni rapport de vérification ni masse totale. 1. Indiquez qui est responsable de quoi : employeur des techniciens de la compagnie, exploitant du lieu, régisseur général du théâtre, régisseur de la compagnie. 2. Listez les documents à demander ou à établir avant toute accroche (au moins cinq). 3. Que doit-on exiger pour des palans D8 qui maintiennent une charge au-dessus du public ? 4. Rédigez trois mesures du plan de prévention propres à cette accroche. 5. Dites ce que vous faites si la compagnie ne peut pas fournir les rapports de vérification de ses palans.",
    reponseAttendue:
      "Responsabilités : chaque employeur reste responsable de la sécurité de ses salariés ; l'exploitant du lieu (entreprise utilisatrice) coordonne les mesures de prévention et connaît la capacité de ses points d'accroche ; le régisseur général du théâtre organise l'accueil et valide le plan d'accroche avec la compagnie ; le régisseur de la compagnie fournit les informations sur son matériel et ses charges.\nDocuments : plan de prévention écrit, plan d'accroche, feuille de charges avec la masse du pont, des projecteurs et du câblage, rapports des vérifications générales périodiques des palans et des accessoires, notices des palans, déclaration de conformité, capacité des points du gril fournie par le théâtre.\nPalans D8 au-dessus du public : charge levée puis immobilisée, aucune manœuvre en présence du public, élingue de sécurité (secondaire) installée sur chaque point après la mise à hauteur ; à défaut, palans prévus pour cet usage (D8+ pour le maintien statique, C1 pour un déplacement au-dessus de personnes).\nMesures du plan de prévention : zone balisée et évacuée pendant la levée, un seul chef de manœuvre et un code de communication commun, vérification conjointe des accessoires avant usage, travail en hauteur sur le gril avec les protections du lieu.\nSans rapport de vérification : les palans ne sont pas utilisés ; on emploie le matériel vérifié du théâtre ou d'un prestataire, ou l'accroche est modifiée. Ce n'est pas négociable, même sous la pression du planning.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C2 : équilibrer une porteuse contrebalancée chargée d'un décor (contrepoids)",
    consigne:
      "Porteuse contrebalancée n° 12 du Théâtre des Quatre Vents : CMU de 250 kg répartis, équilibrée à vide par son équipe. On doit y accrocher une frise de décor de 140 kg et 4 projecteurs de 12 kg chacun. Les pains de contrepoids du théâtre pèsent 10 kg, les demi-pains 5 kg. 1. Calculez la charge ajoutée et vérifiez qu'elle respecte la CMU. 2. Calculez le nombre de pains et de demi-pains à charger dans l'équipe et le déséquilibre restant. 3. Décrivez dans l'ordre la procédure de chargement, puis celle de déchargement, en précisant la position de la porteuse et de l'équipe et le rôle de chacun (plateau, passerelle de chargement). 4. Expliquez pourquoi le frein de l'équipe ne doit pas servir à retenir un déséquilibre important. 5. Rédigez les annonces radio échangées entre le plateau et la passerelle.",
    reponseAttendue:
      "Charge ajoutée : 140 + 4 × 12 = 188 kg, inférieure à la CMU de 250 kg répartis ; les projecteurs et la frise sont répartis sur la longueur de la porteuse.\nContrepoids : 18 pains (180 kg) et 1 demi-pain (5 kg) = 185 kg ; il reste 3 kg côté porteuse, déséquilibre faible que l'on corrige si le lieu dispose de plus petits éléments ; on vise l'équilibre à quelques kilogrammes près.\nChargement : porteuse descendue à son point bas, équipe en haut au niveau de la passerelle de chargement ; frein serré et porteuse immobilisée ; on accroche d'abord le décor et les projecteurs sur la porteuse, puis on charge les contrepoids dans l'équipe depuis la passerelle, pain par pain, sur annonce ; essai de manœuvre lent avant de libérer le frein complètement.\nDéchargement : porteuse à son point bas ; on retire d'abord les contrepoids de l'équipe, puis on décroche le décor et les projecteurs ; jamais l'inverse, sinon l'équipe devient lourde et la porteuse part vers les cintres.\nFrein : il maintient une porteuse équilibrée en position ; un déséquilibre important peut le faire glisser et provoquer un emballement de la porteuse ou de l'équipe.\nAnnonces : « Passerelle, ici plateau, porteuse 12 chargée, tu peux charger dix-huit pains et un demi » ; « Plateau, ici passerelle, chargement terminé, je descends de la passerelle » ; chaque annonce reçoit une réponse avant l'action suivante.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C2 : préparer la manœuvre d'une porteuse motorisée et l'essai du rideau de fer",
    consigne:
      "Au Théâtre des Quatre Vents, la porteuse motorisée n° 3 (CMU de 500 kg) doit descendre une toile peinte de 90 kg pendant le spectacle, sur un top du régisseur. Le rideau de fer est essayé chaque jour avant l'ouverture des portes. 1. Listez les sécurités d'une porteuse motorisée que vous vérifiez avant la première manœuvre. 2. Écrivez la procédure de manœuvre en spectacle : préparation, annonce, mouvement, arrêt, confirmation. 3. Indiquez ce que vous faites si un comédien est dans la zone de descente au moment du top. 4. Décrivez l'essai quotidien du rideau de fer et ce qui doit rester dégagé sous lui en permanence. 5. Que faites-vous si le rideau de fer ne descend pas jusqu'au sol pendant l'essai ?",
    reponseAttendue:
      "Sécurités vérifiées : fins de course haute et basse (et repères de position), frein, arrêt d'urgence accessible et testé, détection de mou de câble si l'équipement en dispose, état des câbles et des poulies visibles, charge réellement accrochée inférieure à la CMU, zone de débattement libre.\nProcédure : repères vérifiés au service, conduite à jour ; annonce « Attention porteuse 3, en attente » ; contrôle visuel de la zone de descente ; mouvement sur le top, en gardant la zone sous les yeux pendant toute la manœuvre ; arrêt au repère ; confirmation « Porteuse 3 en place » au régisseur.\nPersonne dans la zone : on ne déclenche pas la manœuvre, on prévient le régisseur ; la sécurité des personnes passe avant le top. Pendant le mouvement, arrêt immédiat si quelqu'un entre dans la zone.\nRideau de fer : essai de descente quotidien selon la consigne du lieu, en présence d'une personne qui surveille la scène ; aucun décor, câble, praticable ou objet ne doit se trouver sur sa ligne de chute, marquée au sol ; essai consigné.\nRideau de fer qui ne descend pas jusqu'au sol : on cherche l'obstacle sans passer sous le rideau en mouvement ; si le défaut persiste, on prévient immédiatement l'exploitant et le responsable de la sécurité du lieu, qui décident de la suite, et on consigne l'incident dans le registre de sécurité.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C3 : calculer un élingage à deux brins selon l'angle",
    consigne:
      "On doit lever un lustre de décor de 400 kg, avec deux élingues rondes en polyester partant d'un point unique au crochet d'un palan. 1. Rappelez la différence entre masse et poids et convertissez 400 kg en newtons. 2. Calculez l'effort dans chaque brin pour un angle au sommet (entre les deux brins) de 60°, de 90° et de 120°. 3. Choisissez la couleur et la CMU des élingues rondes pour l'angle de 90° et justifiez. 4. Expliquez pourquoi on limite l'angle au sommet à 90° dans la pratique courante. 5. Les deux brins n'ont pas la même longueur : quelles conséquences et comment y remédier ?",
    reponseAttendue:
      "Masse : 400 kg (quantité de matière) ; poids : force due à la pesanteur, environ 400 × 9,81 = 3 924 N, soit environ 3,9 kN (on assimile couramment 1 daN à 1 kg).\nEffort par brin = (charge / 2) / cos (angle au sommet / 2) : à 60°, 200 / 0,866 = environ 231 kg ; à 90°, 200 / 0,707 = environ 283 kg ; à 120°, 200 / 0,5 = 400 kg, chaque brin porte autant que la charge entière.\nÉlingues rondes violettes (CMU de 1 000 kg en levage direct), largement suffisantes pour 283 kg par brin, avec des manilles de CMU adaptée ; on vérifie l'étiquette de chaque élingue.\nAu-delà de 90°, l'effort dans les brins augmente très vite et les tableaux de charge des fabricants réduisent fortement la CMU de l'ensemble ; au-delà de 120°, on ne lève pas.\nBrins inégaux : la charge penche et le brin le plus court reprend l'essentiel de l'effort ; on corrige avec des élingues de même longueur ou un réglage par manilles, et on fait un essai de décollement à quelques centimètres du sol avant la levée.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C3 : trier un lot d'accessoires de levage, contrôle visuel et mise au rebut",
    consigne:
      "Au retour d'une tournée, le magasin du Théâtre des Quatre Vents récupère : 1. une élingue ronde dont l'étiquette est illisible ; 2. une élingue acier dont le câble présente des fils cassés et un écrasement près de la cosse ; 3. une manille dont la goupille d'origine a été remplacée par un boulon du commerce ; 4. une élingue ronde dont la gaine est coupée sur deux centimètres, âme visible ; 5. un collier de fixation pour tube sans marquage de CMU ; 6. une élingue chaîne dont un maillon est visiblement allongé ; 7. une élingue polyester légèrement salie mais intacte, étiquette lisible. Pour chaque accessoire, décidez : en service, à faire examiner, ou rebut. Justifiez, puis décrivez comment vous rendez le rebut définitif et comment vous le tracez.",
    reponseAttendue:
      "1. Rebut : sans étiquette lisible, la CMU et la traçabilité sont inconnues.\n2. Rebut : fils cassés et écrasement sont des critères de mise au rebut d'un câble.\n3. Rebut ou examen par une personne compétente : un boulon du commerce ne remplace pas la goupille d'origine ; on ne remet pas la manille en service sans pièce d'origine.\n4. Rebut : âme visible, l'élingue n'est plus protégée.\n5. Hors service : un accessoire sans marquage ne doit pas servir au levage ; il est retiré et identifié, éventuellement réservé à un usage sans levage s'il est clairement marqué comme tel.\n6. Rebut : un maillon allongé révèle une surcharge ou une usure.\n7. En service après nettoyage selon la notice et contrôle visuel complet.\nRebut définitif : l'accessoire est rendu inutilisable (élingue coupée, manille marquée et isolée), retiré du stock et du parc ; inscription dans le registre ou l'inventaire du parc avec la date, la raison et la personne qui a décidé ; information de l'équipe et du responsable du magasin.",
    points: 20,
  },
  {
    titre: "Exercice 6 — C4 : mettre en place et contrôler un palan électrique à chaîne avant usage",
    consigne:
      "Vous installez au gril du Théâtre des Quatre Vents un palan électrique à chaîne de 500 kg, utilisé en D8, en commande directe depuis un pupitre 8 canaux. 1. Rédigez la check-list de contrôle avant usage (au moins huit points) en partant du rapport de vérification et de la notice. 2. Décrivez la mise en place : élingage au point du gril, orientation du palan, sac à chaîne, câble d'alimentation et de commande. 3. Expliquez comment vous contrôlez le sens de marche et le fonctionnement des fins de course, et pourquoi l'ordre des phases est déterminant en commande directe. 4. Indiquez à quel moment et comment vous installez l'élingue de sécurité.",
    reponseAttendue:
      "Check-list : rapport de vérification périodique en cours de validité et sans réserve bloquante ; plaque et marquage lisibles (CMU, numéro) ; état de la chaîne (usure, allongement, déformation, corrosion, lubrification) ; chaîne non vrillée ; crochets non ouverts et linguets fonctionnels ; sac à chaîne adapté à la longueur de chaîne et bien fixé ; câbles et connecteurs intacts ; frein qui tient la charge ; fins de course haute et basse qui coupent dans le bon sens ; absence de bruit anormal.\nMise en place : élingage du palan au point du gril avec une élingue et une manille de CMU adaptée, sans arête vive ; palan orienté pour que la chaîne entre droite dans le sac ; câbles fixés pour ne pas tirer sur les connecteurs ni gêner la chaîne ; numéro du palan reporté sur le plan d'accroche et le pupitre.\nSens et fins de course : essai à vide puis sous faible charge : la touche montée fait monter ; on vérifie que la fin de course basse coupe la descente. En commande directe, les contacteurs sont dans le pupitre : une inversion de l'ordre des phases fait partir le palan dans le mauvais sens et rend les fins de course inopérantes, puisqu'elles coupent alors le mauvais mouvement. On corrige à la source (inverseur prévu sur le pupitre ou distribution), jamais en forçant.\nÉlingue de sécurité : installée après la mise à hauteur définitive, entre le point d'accroche et la charge, avec le moins de mou possible, avant l'arrivée du public sous la charge ; elle est retirée avant toute nouvelle manœuvre.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C4 : diagnostiquer quatre défauts de palan à chaîne",
    consigne:
      "Pendant un montage au Théâtre des Quatre Vents, quatre situations se présentent. 1. Le palan n° 4 monte quand on appuie sur « descente ». 2. Sur le palan n° 2, à deux brins, la chaîne apparaît vrillée entre la noix et le crochet. 3. Le palan n° 6 s'arrête en montée sous une charge proche de sa CMU, le moteur tourne mais la charge ne monte plus. 4. Le palan n° 1 laisse descendre la charge de quelques centimètres à chaque arrêt. Pour chaque situation : cause probable, risque, conduite immédiate, et qui doit intervenir.",
    reponseAttendue:
      "1. Ordre des phases inversé (rallonge, distribution ou câblage) : en commande directe, les fins de course ne protègent plus ; arrêt immédiat, aucune manœuvre jusqu'à correction de l'ordre des phases à la source et nouvel essai des fins de course.\n2. Chaîne vrillée, souvent parce que le bloc crochet a basculé entre les brins : risque de blocage et d'usure anormale ; on ne met pas en charge, on redresse la chaîne en suivant la notice puis on contrôle.\n3. Le limiteur de couple (embrayage à friction) patine : charge réelle supérieure à ce qui était prévu ou limiteur mal réglé ; on arrête, on redescend la charge si c'est possible, on recalcule la charge ; le réglage du limiteur relève d'une personne compétente, jamais du plateau.\n4. Frein qui glisse : danger grave ; on n'utilise plus le palan, on sécurise la charge par un autre moyen ou on la pose, on balise et on retire le palan du service avec une étiquette, pour examen et réparation par une personne compétente.\nDans tous les cas : information du chef de manœuvre, inscription de l'incident et de la décision.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C5 : répartir les charges d'un pont de 12 m entre ses palans",
    consigne:
      "Pont carré en aluminium de 12 m (4 éléments de 3 m), masse linéique de 7 kg/m (donnée de l'exercice) ; 8 projecteurs automatiques de 32 kg répartis régulièrement ; câblage estimé à 2 kg/m. 1. Calculez la masse totale suspendue. 2. Calculez la charge sur chaque palan pour deux palans aux extrémités. 3. Calculez la charge de chaque palan avec trois palans (extrémités et milieu, deux travées égales de 6 m), en considérant la charge comme uniformément répartie. 4. On ajoute un écran de 120 kg suspendu à 4 m de l'extrémité gauche, sur la configuration à deux palans : calculez la part de chaque palan. 5. Les points du gril ont une charge admissible de 750 kg et les palans une CMU de 500 kg : concluez et rédigez la ligne correspondante de la feuille de charges.",
    reponseAttendue:
      "Masse totale : pont 12 × 7 = 84 kg ; projecteurs 8 × 32 = 256 kg ; câblage 12 × 2 = 24 kg ; total 364 kg.\nDeux palans aux extrémités : 364 / 2 = 182 kg par palan.\nTrois palans : la poutre continue sur trois appuis reprend 3/16 de la charge à chaque extrémité et 5/8 au milieu : 364 × 3/16 = environ 68 kg à chaque extrémité, 364 × 5/8 = 227,5 kg au milieu ; total 68,25 + 68,25 + 227,5 = 364 kg. Le palan du milieu est le plus chargé, ce qu'oublie un partage en trois parts égales.\nÉcran de 120 kg à 4 m de la gauche : par la règle du levier, gauche 120 × 8 / 12 = 80 kg, droite 120 × 4 / 12 = 40 kg ; avec le pont, gauche 182 + 80 = 262 kg, droite 182 + 40 = 222 kg.\nConclusion : toutes les charges restent sous la CMU de 500 kg des palans et la charge admissible de 750 kg des points ; le pont lui-même doit encore être vérifié avec la table du fabricant. Ligne de feuille de charges : point, palan, charge calculée, CMU du palan, charge admissible du point, accessoires, visa.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C5 : vérifier une configuration de pont avec la table du fabricant",
    consigne:
      "Extrait de la table de charge du pont de l'exercice 8 (valeurs de l'exercice, charge utile hors poids propre, pont suspendu à ses deux extrémités) : portée 6 m, charge uniformément répartie admissible 1 400 kg ou charge ponctuelle centrale 900 kg ; portée 12 m, charge uniformément répartie admissible 450 kg ou charge ponctuelle centrale 300 kg. 1. La charge utile répartie de la mise en situation « répartir les charges d'un pont de 12 m » (projecteurs et câblage) est-elle admissible sur 12 m avec deux palans ? 2. On veut ajouter au centre un écran de 120 kg. En appliquant la méthode prudente indiquée par la notice de l'exercice (somme des taux d'utilisation inférieure ou égale à 1), la configuration à deux palans convient-elle ? 3. Proposez une configuration qui convient et justifiez. 4. Citez trois conditions à respecter pour que la table s'applique (assemblage, points d'élingage, état du matériel). 5. Que faites-vous si la notice ne donne pas le cas qui vous intéresse ?",
    reponseAttendue:
      "1. Charge utile répartie : 256 + 24 = 280 kg, inférieure à 450 kg : admissible sur 12 m.\n2. Taux d'utilisation : 280 / 450 = 0,62 environ ; 120 / 300 = 0,40 ; somme 1,02 : supérieure à 1, la configuration à deux palans ne convient pas.\n3. Trois palans (extrémités et milieu) : chaque travée mesure 6 m, les valeurs admissibles sont beaucoup plus élevées (1 400 kg répartis, 900 kg ponctuels) ; l'écran peut aussi être suspendu près d'un point de levage. On refait la répartition entre palans.\n4. Conditions : éléments du même fabricant et de la même série, assemblés avec manchons et goupilles d'origine et épingles de sûreté ; élingage aux nœuds, autour des membrures principales, conformément à la notice ; aucun élément déformé, fissuré ou réparé ; charges réellement réparties comme dans le cas de la table.\n5. On n'extrapole pas : on demande l'avis du fabricant ou d'un bureau d'études, ou on choisit une configuration couverte par la table.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C6 : conduire l'installation d'un gril provisoire et gérer un incident (registre)",
    consigne:
      "Vous êtes chef de manœuvre pour l'installation, au Théâtre des Quatre Vents, du pont de 12 m sur trois palans de l'exercice 8, au-dessus de la zone des premiers rangs. 1. Rédigez le déroulé de la journée : préparation (plan, feuille de charges, vérification des documents et du registre), montage au sol, levée, réglage, sécurisation, exploitation, démontage. 2. Rédigez le code de communication radio et les règles de balisage. 3. Pendant la levée, à 4 m du sol, le palan du milieu s'arrête et ne répond plus. Décrivez votre conduite, minute par minute. 4. Indiquez ce que vous consignez et qui vous informez. 5. Expliquez comment vous consignez électriquement les palans avant l'intervention du technicien.",
    reponseAttendue:
      "Déroulé : vérification du plan d'accroche et de la feuille de charges, des rapports de vérification et du registre ; contrôle avant usage des palans et des accessoires ; montage du pont au sol, goupilles et épingles vérifiées, projecteurs fixés avec leurs élingues de sécurité ; balisage ; levée par paliers synchronisés, contrôle de l'horizontalité ; réglage à hauteur ; élingues de sécurité installées sur chaque point ; zone rouverte ; exploitation sans manœuvre en présence du public ; démontage dans l'ordre inverse, pont redescendu et déchargé au sol avant tout démontage d'élément.\nCommunication : un seul chef de manœuvre donne les ordres ; annonces courtes, numérotées, avec réponse ; « Stop » peut être dit par tout le monde et s'applique immédiatement ; zone sous la charge balisée et interdite pendant toute manœuvre.\nIncident : arrêt de tous les palans ; personne sous la charge, zone élargie et gardée ; vérification que le pont tient sans dommage ; aucune tentative de dépannage sous la charge ; information du régisseur général ; diagnostic par une personne compétente après consignation ; descente de la charge par une solution validée ; palan retiré du service et étiqueté.\nConsignation dans le registre : date, heure, matériel, circonstances, mesures prises, personnes informées, suites données.\nConsignation électrique : séparation (pupitre et alimentation coupés), condamnation (cadenas, prise retirée), identification, vérification d'absence de tension par une personne habilitée ; intervention ensuite seulement.",
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// QCM par compétence (10 questions par compétence, bonne réponse et explication)
// Format lu par le générateur d'exercices : « 1) … A) …   B) … » + « 1-B  2-C … ».
// Aucune parenthèse fermante après A, B, C ou D dans les énoncés et les propositions
// (le parseur s'en servirait) ; les explications ne contiennent aucun « chiffre-lettre ».
// ---------------------------------------------------------------------------
type Q = [question: string, options: string[], correct: number, explication: string];
const LETTRES = ["A", "B", "C", "D"] as const;

function qcmExercice(titre: string, questions: Q[]): AIContentExercise {
  const consigne =
    `Cochez la bonne réponse pour chacune des ${questions.length} questions :\n\n` +
    questions
      .map(([q, opts], i) => `${i + 1}) ${q}\n  ${opts.map((o, oi) => `${LETTRES[oi]}) ${o}`).join("   ")}`)
      .join("\n\n");
  const reponseAttendue =
    questions.map(([, , c], i) => `${i + 1}-${LETTRES[c]}`).join("  ") +
    "\n\nExplications :\n" +
    questions.map(([, , , e], i) => `Question ${i + 1} : ${e}`).join("\n");
  return { titre, consigne, reponseAttendue, points: questions.length };
}

const QCM_C1: Q[] = [
  ["Qui évalue les risques professionnels et les transcrit dans le document unique ?", ["Le régisseur plateau", "L'employeur", "Le fabricant des palans", "La compagnie accueillie"], 1, "L'évaluation des risques et sa transcription dans le document unique sont une obligation de l'employeur ; il peut s'appuyer sur ses équipes, mais la responsabilité reste la sienne."],
  ["Une compagnie extérieure monte son décor dans le théâtre. Quel document formalise les mesures de prévention communes ?", ["Le plan de prévention", "La fiche de paie", "Le contrat de cession seul", "Le programme de salle"], 0, "Lorsqu'une entreprise extérieure intervient dans un établissement, le Code du travail impose une coordination entre l'entreprise utilisatrice et l'entreprise extérieure, formalisée par un plan de prévention."],
  ["Peut-on lever un technicien avec un palan électrique à chaîne conçu pour des charges ?", ["Oui, s'il porte un harnais", "Oui, si la charge totale reste sous la CMU", "Non, le levage de personnes exige un équipement prévu à cet effet", "Oui, en présence du chef machiniste"], 2, "Le levage de personnes n'est permis qu'avec des équipements et accessoires prévus à cette fin ; un palan pour charges, même sous-chargé, n'en est pas un."],
  ["Quel texte fixe le contenu et la périodicité des vérifications des appareils et accessoires de levage ?", ["L'arrêté du 1er mars 2004", "Le règlement de sécurité des établissements recevant du public, type L", "La norme d'habilitation électrique", "Le contrat de travail du machiniste"], 0, "L'arrêté du 1er mars 2004 précise les vérifications des appareils et accessoires de levage : mise en service, remise en service et vérifications générales périodiques."],
  ["Où retrouve-t-on les résultats des vérifications des équipements de levage du théâtre ?", ["Dans le livret de la compagnie", "Sur le programme de la saison", "Nulle part, la vérification orale suffit", "Dans le registre de sécurité et les rapports tenus à disposition"], 3, "Les rapports de vérification sont conservés et les observations reportées dans le registre de sécurité, consultable par les personnes concernées et l'inspection du travail."],
  ["Une charge suspendue va rester au-dessus du public pendant la représentation. Quelle règle s'applique ?", ["Aucune règle particulière si la charge est légère", "Matériel prévu pour cet usage ou sécurité secondaire, et aucune manœuvre au-dessus du public", "Il suffit de prévenir le public au micro", "On double simplement le nombre de projecteurs"], 1, "On évite les charges au-dessus des personnes ; si c'est nécessaire, on utilise un matériel prévu pour cet usage ou une sécurité secondaire, et on ne manœuvre pas au-dessus des personnes avec un matériel qui n'est pas conçu pour cela."],
  ["Dans les principes généraux de prévention, quelle mesure passe avant le port d'un EPI ?", ["La protection collective", "La sanction disciplinaire", "L'affichage d'une consigne seule", "L'augmentation de la cadence"], 0, "Les principes généraux de prévention donnent la priorité aux mesures de protection collective sur les mesures de protection individuelle."],
  ["Pour intervenir sur une passerelle du gril, quelle protection contre les chutes est prioritaire ?", ["Un harnais attaché à n'importe quel tube", "La vigilance de chacun", "Des garde-corps ou un plan de travail protégé", "Une corde tenue par un collègue"], 2, "Pour les travaux en hauteur, les protections collectives comme les garde-corps sont prioritaires ; le harnais n'intervient que lorsqu'elles ne peuvent pas être mises en place, avec un point d'ancrage adapté."],
  ["Que désigne le type L du règlement de sécurité des établissements recevant du public ?", ["Les magasins de vente", "Les hôtels", "Les établissements d'enseignement", "Les salles d'auditions, de conférences, de réunions, de spectacles ou à usage multiple"], 3, "Le type L regroupe les salles d'auditions, de conférences, de réunions, de spectacles ou à usage multiple, dont les théâtres."],
  ["Un technicien reste suspendu dans son harnais après une chute arrêtée. Quel est l'enjeu principal ?", ["Le laisser se reposer avant d'agir", "Le secourir très rapidement, selon une procédure prévue à l'avance", "Attendre la fin de la répétition", "Le faire remonter seul par ses propres moyens"], 1, "La suspension prolongée dans un harnais est dangereuse : le secours doit être organisé avant le début des travaux et déclenché sans délai."],
];

const QCM_C2: Q[] = [
  ["Dans un système contrebalancé, qu'est-ce que l'équipe ?", ["Le groupe de machinistes de service", "Le tube qui porte le décor", "Le chariot ou cadre qui reçoit les contrepoids", "La corde de manœuvre"], 2, "L'équipe est le cadre guidé qui reçoit les pains de contrepoids et équilibre la porteuse ; la corde de manœuvre et le frein permettent de la déplacer et de la maintenir."],
  ["Dans quel ordre charge-t-on une porteuse contrebalancée ?", ["La porteuse d'abord, puis les contrepoids dans l'équipe", "Les contrepoids d'abord, puis la porteuse", "Les deux en même temps sans annonce", "L'ordre n'a pas d'importance"], 0, "Porteuse en position basse, on accroche d'abord la charge, puis on ajoute les contrepoids : la porteuse lourde repose à son point bas et ne peut pas partir."],
  ["On décroche le décor d'une porteuse sans avoir retiré les contrepoids. Que risque-t-on ?", ["Rien, le frein compense", "La porteuse descend lentement", "L'équipe se bloque définitivement", "L'équipe, devenue plus lourde, entraîne la porteuse vers les cintres"], 3, "Au déchargement, on retire d'abord les contrepoids ; sinon l'équipe devient lourde et la porteuse s'emballe vers le haut, avec un risque grave pour les personnes."],
  ["À quoi sert le frein d'une équipe contrebalancée ?", ["À retenir n'importe quel déséquilibre", "À maintenir en position une porteuse équilibrée", "À remplacer les contrepoids manquants", "À régler la vitesse des porteuses motorisées"], 1, "Le frein maintient une porteuse équilibrée ; il n'est pas conçu pour retenir un déséquilibre important, qui peut le faire glisser."],
  ["Parmi ces dispositifs, lequel ne fait pas partie des sécurités habituelles d'une porteuse motorisée ?", ["Les fins de course", "Le frein", "Le pendrillon", "L'arrêt d'urgence"], 2, "Fins de course, frein, arrêt d'urgence et, selon les équipements, détection de mou de câble sont des sécurités ; le pendrillon est un rideau de découverte."],
  ["Quel est le rôle du rideau de fer ?", ["Séparer la scène de la salle en cas d'incendie pour limiter la propagation du feu et des fumées", "Masquer les changements de décor", "Améliorer l'acoustique de la salle", "Protéger le public de la lumière"], 0, "Le rideau de fer est un écran de séparation entre la scène et la salle ; il doit pouvoir descendre à tout moment, donc sa ligne de chute reste toujours dégagée."],
  ["Avant de manœuvrer une porteuse, que fait le cintrier ?", ["Il manœuvre vite pour gagner du temps", "Il attend qu'on lui fasse signe sans regarder", "Il prévient après la manœuvre", "Il annonce la manœuvre, vérifie que la zone est dégagée et attend la réponse"], 3, "Annonce, contrôle visuel de la zone et réponse avant d'agir : c'est la base de la communication de manœuvre."],
  ["Qu'appelle-t-on les pendrillons ?", ["Les rideaux horizontaux qui masquent les cintres", "Les rideaux verticaux qui masquent les coulisses", "Les contrepoids de 5 kg", "Les trappes du plateau"], 1, "Les pendrillons masquent les coulisses sur les côtés ; les frises, horizontales, masquent les cintres."],
  ["Une trappe du plateau est ouverte pendant un montage. Quelle mesure s'impose ?", ["Une protection ou un balisage efficace contre la chute, et une personne qui garde l'ouverture", "Une simple consigne orale le matin", "Éteindre la lumière de service", "Rien, tout le monde la connaît"], 0, "Une trémie ouverte expose à une chute dans les dessous : protection ou balisage efficace, surveillance et fermeture dès que possible."],
  ["Où se trouve habituellement le gril technique ?", ["Sous le plateau", "Dans la fosse d'orchestre", "En partie haute de la cage de scène, au-dessus des cintres", "Dans la régie lumière"], 2, "Le gril technique est le plancher en partie haute de la cage de scène, qui porte les poulies et les points d'accroche."],
];

const QCM_C3: Q[] = [
  ["Que signifie la CMU d'un accessoire de levage ?", ["La charge à laquelle il casse", "La charge maximale qu'il peut lever en service, dans la configuration indiquée par le fabricant", "Sa masse propre", "La charge moyenne habituelle"], 1, "La CMU est la charge maximale d'utilisation fixée par le fabricant pour un mode d'emploi donné ; la charge de rupture est bien plus élevée, du fait du coefficient d'utilisation."],
  ["Quel est, environ, le poids d'une masse de 500 kg ?", ["500 N", "50 N", "4,9 kN", "49 kN"], 2, "Poids = masse × 9,81 : 500 × 9,81 = 4 905 N, soit environ 4,9 kN ; en pratique, 1 kg correspond à environ 1 daN."],
  ["Quel coefficient d'utilisation minimal la réglementation des machines retient-elle pour une élingue textile ?", ["7", "4", "5", "2"], 0, "Les exigences essentielles de sécurité fixent un coefficient de 7 pour les sangles textiles, 5 pour les câbles et 4 pour les chaînes soudées et les accessoires métalliques."],
  ["Et pour un câble métallique ?", ["4", "7", "10", "5"], 3, "Le coefficient d'utilisation retenu pour les câbles métalliques est de 5."],
  ["Élingue à deux brins, angle au sommet de 120° : quel effort dans chaque brin ?", ["La moitié de la charge", "Le quart de la charge", "Autant que la charge entière", "Le double de la charge"], 2, "Effort par brin = (charge / 2) / cos 60° = (charge / 2) / 0,5 : chaque brin porte la charge entière."],
  ["Pour une élingue à deux brins dont l'angle au sommet ne dépasse pas 90°, la CMU de l'ensemble vaut environ :", ["2 fois la CMU d'un brin", "1,4 fois la CMU d'un brin", "La CMU d'un brin", "La moitié de la CMU d'un brin"], 1, "Le facteur de mode habituel est 1,4 pour deux brins jusqu'à 90° d'angle au sommet, et 1 entre 90° et 120°."],
  ["Quelle couleur porte une élingue ronde en polyester de CMU 2 000 kg en levage direct ?", ["Violet", "Jaune", "Gris", "Vert"], 3, "Code couleur normalisé des élingues rondes : violet 1 000 kg, vert 2 000 kg, jaune 3 000 kg, gris 4 000 kg."],
  ["Que doit fournir le fabricant d'un accessoire de levage mis sur le marché européen ?", ["Le marquage CE, la déclaration de conformité et une notice", "Une simple facture", "Un échantillon gratuit", "Rien si l'accessoire est en acier"], 0, "Les accessoires de levage relèvent de la réglementation des machines : marquage CE, déclaration de conformité et notice d'instructions ; le marquage de l'accessoire indique sa CMU."],
  ["L'étiquette d'une élingue textile est devenue illisible. Que faites-vous ?", ["Vous l'utilisez si elle semble neuve", "Vous la mettez au rebut", "Vous réécrivez la CMU au feutre", "Vous la réservez aux charges légères"], 1, "Sans identification lisible, la CMU et la traçabilité ne sont plus garanties : l'élingue est retirée du service."],
  ["Comment doit travailler une manille ?", ["La charge dans l'axe, goupille d'origine bien vissée", "En charge latérale pour gagner de la hauteur", "Avec n'importe quel boulon à la place de la goupille", "Ouverte, pour aller plus vite"], 0, "Une manille travaille dans son axe avec sa goupille d'origine ; une charge latérale réduit sa capacité selon les indications du fabricant."],
];

const QCM_C4: Q[] = [
  ["Comment utilise-t-on un palan à chaîne en usage D8 au-dessus de personnes ?", ["On le manœuvre librement pendant le spectacle", "On lève la charge, puis on la maintient avec une sécurité secondaire, sans manœuvre au-dessus des personnes", "On peut y suspendre un artiste", "On l'utilise sans frein"], 1, "En usage D8, la charge est levée en l'absence de personnes dessous, puis maintenue avec une élingue de sécurité ; aucune manœuvre au-dessus des personnes."],
  ["Qu'apporte en général un palan D8+ par rapport au même palan en D8 ?", ["Une vitesse doublée", "Une CMU plus élevée", "Un double frein et une CMU réduite, pour maintenir une charge au-dessus de personnes", "La possibilité de lever des personnes"], 2, "Le D8+ est surdimensionné : double frein et CMU déclassée, ce qui permet de maintenir une charge au-dessus de personnes selon les règles retenues par le lieu."],
  ["À quel usage les palans de type C1 sont-ils destinés ?", ["Au déplacement de charges au-dessus de personnes, grâce à des sécurités renforcées", "Au levage de personnes", "Aux charges posées au sol uniquement", "Au remplacement des porteuses contrebalancées"], 0, "Les palans conçus selon l'ancienne BGV C1 permettent, avec des sécurités renforcées et une commande adaptée, de déplacer des charges au-dessus de personnes ; ils ne servent pas au levage de personnes."],
  ["En commande directe, que provoque une inversion de l'ordre des phases ?", ["Rien, le palan corrige seul", "Une simple baisse de vitesse", "L'arrêt définitif du palan", "Le palan part dans le mauvais sens et les fins de course ne protègent plus"], 3, "En commande directe, les contacteurs sont dans le pupitre : avec les phases inversées, la fin de course coupe le mauvais mouvement et ne protège plus."],
  ["Qu'est-ce qui caractérise la commande basse tension d'un palan ?", ["Les contacteurs sont dans le palan, commandés en très basse tension", "Le palan fonctionne sur piles", "Il n'y a pas de fin de course", "Le moteur tourne en basse tension"], 0, "En commande basse tension, le pupitre envoie des ordres en très basse tension aux contacteurs logés dans le palan, alimenté en puissance par ailleurs."],
  ["La chaîne d'un palan à deux brins apparaît vrillée. Cause la plus fréquente ?", ["Un excès de lubrification", "Le bloc crochet a basculé entre les brins", "Une surtension", "Un sac à chaîne trop grand"], 1, "Le retournement du bloc crochet entre les brins vrille la chaîne ; on la redresse selon la notice avant toute mise en charge."],
  ["À quoi sert le sac à chaîne ?", ["À lester le palan", "À ranger les élingues", "À recueillir le brin libre de la chaîne ; il doit être adapté à sa longueur", "À protéger le moteur de la pluie"], 2, "Un sac trop petit déborde : la chaîne peut tomber ou se coincer ; il est dimensionné pour la longueur de chaîne et bien fixé."],
  ["Lequel de ces contrôles ne fait pas partie du contrôle avant usage d'un palan ?", ["L'état de la chaîne et des crochets", "Le sens de marche et les fins de course", "Le fonctionnement du frein", "Le réglage interne du limiteur de couple par le plateau"], 3, "Le réglage du limiteur de couple relève d'une personne compétente selon la notice, pas du contrôle avant usage."],
  ["Quel coefficient d'utilisation retient-on pour une chaîne de levage soudée ?", ["4", "7", "5", "1"], 0, "Le coefficient d'utilisation retenu pour les chaînes de levage soudées est de 4."],
  ["Le limiteur de couple d'un palan peut-il servir de fin de course ?", ["Oui, c'est son rôle", "Non, il protège contre la surcharge et ne doit pas être sollicité volontairement", "Oui, en montée seulement", "Oui, si la charge est légère"], 1, "Le limiteur de couple protège contre une surcharge ; le solliciter volontairement l'use et compromet la sécurité."],
];

const QCM_C5: Q[] = [
  ["Un pont suspendu à ses deux extrémités porte une charge uniformément répartie de 400 kg, poids propre compris. Quelle charge sur chaque palan ?", ["400 kg", "100 kg", "133 kg", "200 kg"], 3, "Charge symétrique sur deux appuis : chaque palan reprend la moitié, soit 200 kg."],
  ["Même pont sur trois palans équidistants, charge uniformément répartie : quelle part reprend le palan du milieu ?", ["Un tiers", "5/8 de la charge", "La moitié", "Un quart"], 1, "Une poutre continue sur trois appuis égaux reporte 3/16 de la charge sur chaque extrémité et 5/8 au milieu : le palan central est le plus chargé."],
  ["Pont de 9 m sur deux palans A et B, charge ponctuelle de 90 kg à 3 m de A. Quelle part reprend A ?", ["60 kg", "30 kg", "45 kg", "90 kg"], 0, "Règle du levier : A reprend 90 × 6 / 9 = 60 kg et B reprend 90 × 3 / 9 = 30 kg."],
  ["Comment utilise-t-on la table de charge d'un pont ?", ["On extrapole librement entre les portées", "On applique les valeurs de la configuration exacte : portée, type de charge, mode d'appui", "On double les valeurs pour un pont neuf", "On prend la plus grande valeur du tableau"], 1, "La table vaut pour une configuration donnée ; hors de ces cas, on demande l'avis du fabricant ou d'un bureau d'études."],
  ["Comment assemble-t-on les éléments d'un pont à manchons ?", ["Avec des vis du commerce", "Avec du ruban adhésif renforcé", "Avec les manchons, goupilles et épingles de sûreté d'origine", "En emboîtant sans goupille"], 2, "Seules les pièces d'assemblage d'origine du fabricant garantissent les valeurs de la table ; chaque goupille reçoit son épingle de sûreté."],
  ["Qui fournit la charge admissible des points d'accroche dans la structure du bâtiment ?", ["La compagnie accueillie", "L'exploitant du lieu, sur la base d'une étude de la structure", "Le fabricant des projecteurs", "Le public"], 1, "La capacité des points d'accroche dépend de la structure du bâtiment ; elle est connue et communiquée par l'exploitant, à partir d'une étude."],
  ["Avant de lever un pont sur ground support, que vérifie-t-on ?", ["Seulement la couleur des tours", "Le nombre de projecteurs", "Rien, les tours sont autostables", "L'aplomb des tours, les embases, les stabilisateurs et le lestage ou haubanage prévus par la notice"], 3, "Un ground support doit être d'aplomb, sur un sol capable de reprendre les charges, avec stabilisateurs, lestage ou haubanage selon la notice."],
  ["Pourquoi lève-t-on un pont sur plusieurs palans par paliers ?", ["Parce que les palans n'ont jamais exactement la même vitesse et que l'horizontalité doit être contrôlée", "Pour économiser l'électricité", "Parce que c'est plus rapide", "Pour user les freins de façon égale"], 0, "De petites différences de vitesse créent un dévers et surchargent certains points ; on monte par paliers et on corrige palan par palan."],
  ["Où élingue-t-on un pont triangulaire ou carré ?", ["Sur une diagonale seule", "Au milieu d'un élément, n'importe où", "Autour des membrures principales, au niveau d'un nœud, selon la notice", "Sur une goupille"], 2, "Les élingues entourent les membrures principales près d'un nœud ; une diagonale seule n'est pas faite pour reprendre la charge."],
  ["Un élément de pont présente une membrure enfoncée. Que faites-vous ?", ["Vous l'écartez du service pour examen", "Vous l'utilisez en bout de pont", "Vous le redressez au marteau", "Vous l'utilisez avec moins de projecteurs"], 0, "Une déformation modifie la résistance du pont : l'élément est retiré et identifié jusqu'à l'avis d'une personne compétente ou du fabricant."],
];

const QCM_C6: Q[] = [
  ["Que contient une feuille de charges ?", ["La liste des points, des charges calculées, des palans et des accessoires, avec leurs capacités", "Les horaires des repas", "Les noms des comédiens", "Le plan de feux uniquement"], 0, "La feuille de charges rassemble, point par point, la charge calculée, la capacité du point, la CMU du palan et des accessoires ; elle est visée avant la levée."],
  ["Pendant la levée d'un pont, que doit-il se trouver sous la charge ?", ["Les techniciens qui guident le pont à la main", "Personne : la zone est balisée et dégagée", "Le matériel en attente", "Le régisseur pour mieux voir"], 1, "Personne ne stationne sous une charge en mouvement ; la zone est balisée et gardée pendant toute la manœuvre."],
  ["Qui donne les ordres de manœuvre pendant une levée ?", ["Chacun selon ce qu'il voit", "Le plus ancien du plateau", "Un seul chef de manœuvre, identifié de tous", "La compagnie et le théâtre en même temps"], 2, "Un seul chef de manœuvre donne les ordres ; les autres rendent compte. C'est la condition d'une communication sans ambiguïté."],
  ["Qui peut dire « Stop » pendant une manœuvre ?", ["Seulement le chef de manœuvre", "Seulement le régisseur général", "Personne, il faut finir la manœuvre", "Tout le monde, et l'arrêt est immédiat"], 3, "N'importe quel intervenant qui voit un danger peut et doit dire « Stop » ; l'arrêt est immédiat, les explications viennent ensuite."],
  ["Quelles sont les étapes d'une consignation électrique avant une intervention sur un palan ?", ["Séparer, condamner, identifier, vérifier l'absence de tension", "Débrancher et intervenir aussitôt", "Prévenir oralement l'équipe", "Couper le pupitre seulement"], 0, "La consignation suit des étapes précises et relève d'une personne habilitée : séparation, condamnation, identification, vérification d'absence de tension."],
  ["Un palan s'arrête avec la charge en l'air. Premier réflexe ?", ["Passer sous la charge pour regarder le moteur", "Relancer plusieurs fois", "Arrêter, éloigner tout le monde, baliser et prévenir le responsable", "Couper l'élingue de sécurité"], 2, "On sécurise d'abord la zone et on prévient ; le diagnostic se fait ensuite, après consignation, sans jamais se placer sous la charge."],
  ["Quand installe-t-on les élingues de sécurité secondaires d'un pont suspendu à des palans D8 ?", ["Avant de lever le pont", "Après la mise à hauteur définitive, avant l'arrivée des personnes sous la charge", "Jamais", "Pendant la levée"], 1, "L'élingue de sécurité est posée une fois le pont à sa hauteur définitive, avec le moins de mou possible, et retirée avant toute nouvelle manœuvre."],
  ["Comment démonte-t-on un gril provisoire ?", ["On démonte les éléments en hauteur", "On retire d'abord les goupilles", "On coupe les palans et on laisse descendre", "Dans l'ordre inverse : élingues de sécurité retirées, descente par paliers, pont déchargé au sol avant démontage"], 3, "Le démontage suit l'ordre inverse du montage ; le pont n'est démonté qu'au sol, une fois déchargé."],
  ["Un accessoire est tombé du gril sans blesser personne. Que faites-vous ?", ["Arrêter, sécuriser, déclarer, analyser les causes et consigner", "Rien, puisqu'il n'y a pas de blessé", "Le ramasser et continuer", "Attendre la fin du spectacle pour en parler"], 0, "Un presque-accident est une alerte : on arrête, on sécurise, on déclare et on analyse les causes pour éviter qu'il se reproduise ; l'événement est consigné."],
  ["Le rapport de vérification d'un palan mentionne une observation sur le frein. Que faites-vous ?", ["Vous l'utilisez jusqu'à la prochaine vérification", "Vous ne l'utilisez pas tant que l'observation n'est pas levée", "Vous l'utilisez à mi-charge", "Vous ignorez l'observation"], 1, "Une observation sur un organe de sécurité comme le frein impose de retirer l'appareil du service jusqu'à la réparation et la levée de l'observation."],
];

export const MSC70_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Cadre réglementaire et prévention", QCM_C1),
  qcmExercice("QCM C2 — Équipements fixes de scène", QCM_C2),
  qcmExercice("QCM C3 — Charges, élingage et accessoires de levage", QCM_C3),
  qcmExercice("QCM C4 — Moteurs à chaîne", QCM_C4),
  qcmExercice("QCM C5 — Ponts et grils provisoires", QCM_C5),
  qcmExercice("QCM C6 — Mettre en œuvre en sécurité", QCM_C6),
];

/** Explications du corrigé des 6 QCM de compétence, une liste par compétence (C1 à C6). */
export const MSC70_QCM_COMPETENCES_EXPLICATIONS: string[][] = [QCM_C1, QCM_C2, QCM_C3, QCM_C4, QCM_C5, QCM_C6]
  .map(qs => qs.map(q => q[3]));

/** Bonnes réponses des 6 QCM de compétence (indice 0 à 3), dans l'ordre des questions. */
export const MSC70_QCM_COMPETENCES_REPONSES: number[][] = [QCM_C1, QCM_C2, QCM_C3, QCM_C4, QCM_C5, QCM_C6]
  .map(qs => qs.map(q => q[2]));

/**
 * Une évaluation par jour : le générateur prend les 10 premiers éléments, un par journée.
 * Exercices et QCM alternent, chacun sur la compétence travaillée ce jour-là ; les éléments
 * suivants restent au pack (réutilisés si le parcours compte plus de journées).
 * `E` = mise en situation n° (1 à 10), `Q` = QCM de la compétence n° (1 à 6).
 */
const MSC70_PLAN_JOURS: Array<["E" | "Q", number]> = [
  ["E", 1], ["Q", 1], ["E", 2], ["Q", 2], ["E", 4],
  ["E", 6], ["Q", 4], ["E", 8], ["Q", 5], ["E", 10],
];

const MSC70_PLAN_ITEMS = MSC70_PLAN_JOURS.map(([type, n]) => (type === "E" ? MSC70_EXERCICES : MSC70_QCM_COMPETENCES)[n - 1]);

/** Sans son numéro d'origine, qui ne correspond plus au rang du jour (« Exercice 4 » le jour 3). */
const sansNumero = (e: AIContentExercise): AIContentExercise =>
  ({ ...e, titre: e.titre.replace(/^Exercice \d+ — /, "Mise en situation — ") });

export const MSC70_EXERCICES_COMPLETS: AIContentExercise[] = [
  ...MSC70_PLAN_ITEMS,
  ...[...MSC70_EXERCICES, ...MSC70_QCM_COMPETENCES].filter(e => !MSC70_PLAN_ITEMS.includes(e)),
].map(sansNumero);

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Machinerie scénique, moteurs et ponts : équipements fixes et grils provisoires – 70 h » (6 chapitres, un par compétence)</strong> : apports, exemples chiffrés sur le Théâtre des Quatre Vents (salle fictive), procédures pas à pas, fiches à retenir, quiz et cas pratiques corrigés.</li>
  <li><strong>Check-lists</strong> : contrôle avant usage d'un palan à chaîne, contrôle visuel des accessoires de levage et critères de mise au rebut, contrôle d'un pont avant montage, préparation d'une manœuvre de porteuse.</li>
  <li><strong>Modèles</strong> : plan d'accroche, feuille de charges, plan de prévention pour l'accueil d'une compagnie, fiche d'incident et page de registre.</li>
  <li><strong>Aides au calcul</strong> : tableau des facteurs d'angle d'élingage, répartition des charges sur deux, trois et quatre appuis, règle du levier, conversion masse et poids.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Documents techniques</strong> : notices de palans électriques à chaîne et de pupitres de commande, tables de charge de ponts en aluminium, rapports de vérification anonymisés, plans de cage de scène.</li>
  <li><strong>Matériel de démonstration</strong> : accessoires de levage en bon état et accessoires réformés (pour l'exercice de tri), éléments de pont, palan et pupitre, élingues de sécurité, radios.</li>
  <li><strong>Outils de calcul</strong> : calculatrice, tableur de répartition des charges fourni avec le support.</li>
  <li><strong>Équipements de protection</strong> : casques, gants, chaussures de sécurité, harnais et longes, à adapter à chaque participant.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>Légifrance — Code du travail</strong> : <a href="https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072050/">https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072050/</a> — principes généraux de prévention, équipements de travail, levage et travail en hauteur, entreprises extérieures.</li>
  <li><strong>Légifrance — arrêté du 1er mars 2004 relatif aux vérifications des appareils et accessoires de levage</strong> : <a href="https://www.legifrance.gouv.fr/search/all?query=arr%C3%AAt%C3%A9%20du%201er%20mars%202004%20appareils%20et%20accessoires%20de%20levage">recherche Légifrance</a>.</li>
  <li><strong>INRS</strong> : <a href="https://www.inrs.fr/">https://www.inrs.fr/</a> — dossiers sur les chutes de hauteur, le levage et la manutention mécanique, la coactivité.</li>
  <li><strong>EUR-Lex — règlement (UE) 2023/1230 sur les machines</strong> : <a href="https://eur-lex.europa.eu/eli/reg/2023/1230/oj">https://eur-lex.europa.eu/eli/reg/2023/1230/oj</a> — remplace la directive 2006/42/CE à compter du 20 janvier 2027.</li>
  <li><strong>Afdas</strong> : <a href="https://www.afdas.com/">https://www.afdas.com/</a> — opérateur de compétences de la culture, financement de la formation des techniciens du spectacle.</li>
</ul>`;

/** Aucune vidéo pré-sélectionnée : le champ est requis par le pack contenu. */
export const MSC70_VIDEOS: { title: string; description: string; url: string }[] = [];

export const MSC70_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: MSC70_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: MSC70_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — positionnement de début (10 questions, une seule bonne réponse, expliquées)
// et QCM de fin (10 questions)
// ---------------------------------------------------------------------------
export const MSC70_POSITIONNEMENT_TITRE = "Positionnement — vos repères de départ";
export const MSC70_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Qui est responsable de la sécurité des techniciens salariés d'une compagnie accueillie dans un théâtre ?", options: ["Le public", "Leur employeur, en coordination avec l'exploitant du lieu", "Le fabricant du décor"], correctIndex: 1 },
  { question: "Peut-on lever une personne avec un palan prévu pour lever des charges ?", options: ["Non, il faut un équipement prévu pour le levage de personnes", "Oui, si elle porte un harnais", "Oui, si elle est légère"], correctIndex: 0 },
  { question: "Que signifie CMU ?", options: ["Coefficient maximal d'usure", "Contrôle mensuel d'utilisation", "Charge maximale d'utilisation"], correctIndex: 2 },
  { question: "Quand on charge une porteuse contrebalancée, que charge-t-on en premier ?", options: ["La porteuse, avant les contrepoids", "Les contrepoids, avant la porteuse", "Peu importe"], correctIndex: 0 },
  { question: "À quoi sert le rideau de fer ?", options: ["À masquer les changements de décor", "À séparer la scène de la salle en cas d'incendie", "À régler l'acoustique"], correctIndex: 1 },
  { question: "Quand l'angle entre les deux brins d'une élingue augmente, l'effort dans chaque brin :", options: ["Diminue", "Reste le même", "Augmente"], correctIndex: 2 },
  { question: "Quelle différence principale y a-t-il entre un palan D8 et un palan D8+ ?", options: ["Le D8+ est plus rapide", "Le D8+ dispose d'un double frein et d'une CMU réduite", "Aucune"], correctIndex: 1 },
  { question: "Un pont est suspendu à ses deux extrémités avec une charge répartie régulièrement. Chaque palan reprend :", options: ["Toute la charge", "Un quart de la charge", "La moitié de la charge"], correctIndex: 2 },
  { question: "Que doit-il se trouver sous une charge pendant qu'on la lève ?", options: ["Personne, la zone est balisée", "Un technicien pour la guider", "Le matériel en attente"], correctIndex: 0 },
  { question: "Une élingue textile n'a plus d'étiquette lisible. Que fait-on ?", options: ["On l'utilise pour les charges légères", "On la retire du service", "On réécrit la CMU dessus"], correctIndex: 1 },
];

/** Explications du corrigé du positionnement, dans l'ordre des questions. */
export const MSC70_QCM_DEBUT_EXPLICATIONS: string[] = [
  "Chaque employeur reste responsable de ses salariés ; l'exploitant coordonne la prévention avec un plan de prévention (jours 1 et 2).",
  "Le levage de personnes exige des équipements prévus à cette fin ; un palan pour charges n'en est pas un (jour 2).",
  "La CMU est la charge maximale d'utilisation indiquée par le fabricant pour une configuration donnée (jour 4).",
  "Porteuse en position basse, on accroche la charge avant d'ajouter les contrepoids ; au déchargement, on fait l'inverse (jour 3).",
  "Le rideau de fer limite la propagation du feu et des fumées vers la salle ; sa ligne de chute reste toujours dégagée (jour 4).",
  "Plus l'angle au sommet est ouvert, plus l'effort dans chaque brin augmente ; à 120°, chaque brin porte la charge entière (jour 5).",
  "Le D8+ a un double frein et une CMU déclassée, pour maintenir une charge au-dessus de personnes selon les règles du lieu (jour 6).",
  "Charge symétrique sur deux appuis : chaque palan en reprend la moitié ; sur trois appuis, le palan du milieu en reprend 5/8 (jour 8).",
  "Personne ne stationne sous une charge en mouvement : la zone est balisée et gardée pendant toute la manœuvre (jour 10).",
  "Sans identification lisible, la CMU n'est plus connue : l'élingue est retirée du service et mise au rebut (jour 5).",
];

export const MSC70_QCM_FIN: AIQCMQuestion[] = [
  { question: "Une compagnie extérieure accroche son matériel dans le théâtre. Quel document organise la prévention commune ?", options: ["Le contrat de cession", "Le plan de prévention", "La feuille de route", "Le programme de salle"], correctIndex: 1 },
  { question: "Quel texte encadre les vérifications des appareils et accessoires de levage ?", options: ["L'arrêté du 1er mars 2004", "Le règlement intérieur du lieu", "La convention collective", "La fiche technique de la compagnie"], correctIndex: 0 },
  { question: "Au déchargement d'une porteuse contrebalancée, que retire-t-on en premier ?", options: ["Le décor", "Les projecteurs", "Les contrepoids de l'équipe", "La corde de manœuvre"], correctIndex: 2 },
  { question: "Élingue à deux brins, charge de 400 kg, angle au sommet de 90° : effort dans chaque brin ?", options: ["200 kg", "400 kg", "566 kg", "Environ 283 kg"], correctIndex: 3 },
  { question: "Quel coefficient d'utilisation retient-on pour une élingue textile ?", options: ["4", "5", "7", "10"], correctIndex: 2 },
  { question: "En commande directe, pourquoi vérifie-t-on l'ordre des phases avant la première manœuvre ?", options: ["Parce qu'une inversion rend les fins de course inopérantes", "Pour économiser l'énergie", "Pour régler la vitesse", "Pour éviter le bruit"], correctIndex: 0 },
  { question: "Pont de 12 m sur trois palans équidistants, charge répartie de 320 kg : charge du palan du milieu ?", options: ["107 kg", "160 kg", "200 kg", "320 kg"], correctIndex: 2 },
  { question: "La table de charge d'un pont ne couvre pas votre configuration. Que faites-vous ?", options: ["J'extrapole à partir de la portée la plus proche", "Je demande l'avis du fabricant ou d'un bureau d'études, ou je change de configuration", "Je divise la charge par deux", "Je prends la valeur de la plus petite portée"], correctIndex: 1 },
  { question: "Quand pose-t-on l'élingue de sécurité d'un pont suspendu à des palans D8 ?", options: ["Avant la levée", "Pendant la levée", "Jamais", "Après la mise à hauteur définitive, avant l'arrivée de personnes dessous"], correctIndex: 3 },
  { question: "Un palan s'arrête avec la charge en l'air. Que faites-vous d'abord ?", options: ["Je passe dessous pour voir", "Je relance le moteur", "J'arrête tout, j'éloigne les personnes, je balise et je préviens le responsable", "Je retire l'élingue de sécurité"], correctIndex: 2 },
];

export const MSC70_EVAL_PACK: AIEvalPack = {
  qcmDebut: MSC70_QCM_DEBUT,
  qcmFin: MSC70_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du jour 5) — la toile de fond de la compagnie Les Passe-Murailles au Théâtre des Quatre Vents, salle fictive",
    contexte:
      "La compagnie Les Passe-Murailles (fictive) joue trois soirs au Théâtre des Quatre Vents. Sa fiche technique demande : une toile de fond de 60 kg et un cadre de décor de 110 kg sur la porteuse contrebalancée n° 20 (CMU de 250 kg répartis, équilibrée à vide) ; un lustre de décor de 300 kg, levé par une élingue à deux brins sur le crochet de la porteuse motorisée n° 5 (CMU de 500 kg), avec un angle au sommet annoncé de 90° ; quatre élingues rondes et quatre manilles apportées par la compagnie, sans document. Les pains de contrepoids du théâtre pèsent 10 kg et les demi-pains 5 kg.",
    questions: [
      { question: "Vérifiez la charge de la porteuse n° 20 et calculez les contrepoids à charger. Indiquez l'ordre de chargement.", reponseAttendue: "Charge : 60 + 110 = 170 kg, inférieure à 250 kg répartis. Contrepoids : 17 pains de 10 kg = 170 kg. Porteuse en position basse : on accroche d'abord la toile et le cadre, puis on charge les 17 pains dans l'équipe depuis la passerelle, sur annonce ; essai lent ensuite. Au démontage, contrepoids retirés en premier.", points: 5 },
      { question: "Calculez l'effort dans chaque brin de l'élingue du lustre et dites quelle élingue ronde convient.", reponseAttendue: "Effort par brin = (300 / 2) / cos 45° = 150 / 0,707 = environ 212 kg. Une élingue ronde violette (CMU de 1 000 kg en levage direct) convient largement, avec des manilles de CMU adaptée ; la charge totale reste sous la CMU de 500 kg de la porteuse motorisée.", points: 5 },
      { question: "Que faites-vous des quatre élingues et des quatre manilles apportées sans document ?", reponseAttendue: "Elles ne sont utilisées que si leur marquage est lisible (CMU, identification), si leur état est bon au contrôle visuel et si la compagnie fournit la preuve de leur vérification ; sinon on utilise les accessoires vérifiés du théâtre. La décision est notée dans le plan de prévention.", points: 5 },
      { question: "Rédigez les trois annonces radio de la manœuvre de la porteuse n° 20 pendant le spectacle.", reponseAttendue: "« Attention porteuse 20, en attente » ; sur le top : « Porteuse 20, top » et mouvement en surveillant la zone ; « Porteuse 20 en place ». Chaque annonce reçoit une réponse ; arrêt immédiat sur « Stop ».", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — QCM des acquis, calculs, feuille de charges, contrôle d'un palan et conduite d'une installation (jour 10), grille d'acquisition des compétences C1 à C6",
    exercices: [
      {
        titre: "Partie 1 — QCM final des acquis (10 questions sur les six compétences, 20 minutes)",
        consigne: "Répondez individuellement aux 10 questions du QCM de fin (plan de prévention, vérifications, porteuse contrebalancée, élingage, coefficients, ordre des phases, répartition sur trois palans, table de charge, élingue de sécurité, incident). Correction commentée en groupe.",
        reponseAttendue: "Plan de prévention ; arrêté du 1er mars 2004 ; contrepoids retirés en premier ; environ 283 kg par brin ; coefficient de 7 pour le textile ; une inversion des phases rend les fins de course inopérantes ; 5/8 de 320 kg = 200 kg au milieu ; pas d'extrapolation de la table ; élingue de sécurité après la mise à hauteur ; arrêt, éloignement, balisage, information.",
        points: 20,
      },
      {
        titre: "Partie 2 — Calcul d'élingage et de répartition (C3, C5)",
        consigne: "Pont de 10 m sur deux palans aux extrémités : masse du pont 70 kg, 6 projecteurs de 25 kg répartis, câblage 20 kg, et un élément de décor de 100 kg suspendu à 2,5 m de l'extrémité gauche. Calculez la charge de chaque palan. Le décor est suspendu par une élingue à deux brins avec un angle au sommet de 60° : calculez l'effort par brin.",
        reponseAttendue: "Charge répartie : 70 + 150 + 20 = 240 kg, soit 120 kg par palan. Décor : gauche 100 × 7,5 / 10 = 75 kg, droite 100 × 2,5 / 10 = 25 kg. Totaux : gauche 195 kg, droite 145 kg. Élingue : (100 / 2) / cos 30° = 50 / 0,866 = environ 58 kg par brin.",
        points: 20,
      },
      {
        titre: "Partie 3 — Plan d'accroche et feuille de charges (C1, C5)",
        consigne: "À partir du résultat de la partie 2, rédigez la feuille de charges (points, charges, CMU des palans, charge admissible des points du gril de 750 kg, accessoires) et listez les documents à réunir avant la levée.",
        reponseAttendue: "Une ligne par point avec charge calculée, CMU du palan, capacité du point, élingues et manilles avec leur CMU, visa ; documents : plan d'accroche, notices, rapports de vérification en cours de validité, table de charge du pont, plan de prévention s'il y a une entreprise extérieure, registre de sécurité.",
        points: 20,
      },
      {
        titre: "Partie 4 — Contrôle avant usage d'un palan et diagnostic (C4)",
        consigne: "Présentez le contrôle avant usage d'un palan électrique à chaîne en commande directe et expliquez la conduite à tenir face à deux défauts tirés au sort (chaîne vrillée, sens inversé, frein qui glisse, limiteur qui patine).",
        reponseAttendue: "Contrôle complet : rapport de vérification, marquage, chaîne, crochets et linguets, sac à chaîne, câbles, frein, sens de marche, fins de course. Défauts : cause, risque, arrêt, mise hors service ou correction selon la notice, intervention d'une personne compétente lorsque c'est nécessaire, information et consignation.",
        points: 20,
      },
      {
        titre: "Partie 5 — Conduire une installation et gérer un incident (C2, C6)",
        consigne: "Vous êtes chef de manœuvre : présentez la levée du pont de la partie 2 (balisage, annonces, paliers, sécurisation) puis réagissez à l'incident annoncé par le formateur (palan arrêté charge en l'air, accessoire tombé, personne entrée dans la zone).",
        reponseAttendue: "Un seul chef de manœuvre ; zone balisée et gardée ; annonces avec réponse ; levée par paliers et contrôle de l'horizontalité ; élingues de sécurité après la mise à hauteur ; face à l'incident : arrêt immédiat, éloignement des personnes, sécurisation, information du responsable, consignation électrique avant toute intervention, inscription dans le registre et analyse des causes.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const MSC70_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://eur-lex.europa.eu/eli/reg/2023/1230/oj",
      titreLien: "EUR-Lex — règlement (UE) 2023/1230 sur les machines",
      titre: "Le règlement européen sur les machines remplace la directive 2006/42/CE",
      date: "Octobre 2026",
      commentaire: "Le règlement (UE) 2023/1230 s'applique à compter du 20 janvier 2027 aux machines et aux accessoires de levage mis sur le marché. Les exigences sur les coefficients d'utilisation et les notices restent le socle de la compétence C3 ; les documents des fabricants vont évoluer.",
      exploitation: "Preuve : fiche mémo datée dans le dossier de veille. Action : mise à jour du chapitre 3 et de l'exercice sur le marquage CE et la déclaration de conformité.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/search/all?query=arr%C3%AAt%C3%A9%20du%201er%20mars%202004%20appareils%20et%20accessoires%20de%20levage",
      titreLien: "Légifrance — arrêté du 1er mars 2004",
      titre: "Vérifications des appareils et accessoires de levage",
      date: "Septembre 2026",
      commentaire: "Relecture annuelle de l'arrêté du 1er mars 2004 : vérifications de mise en service, de remise en service et vérifications générales périodiques, contenu des rapports. Utilisé pour l'atelier sur la lecture des rapports de vérification des palans.",
      exploitation: "Preuve : note de relecture archivée. Action : contrôle de l'exactitude des fiches à retenir du chapitre 1.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072050/",
      titreLien: "Légifrance — Code du travail",
      titre: "Équipements de travail, levage, travail en hauteur et entreprises extérieures",
      date: "Novembre 2026",
      commentaire: "Suivi des dispositions du Code du travail sur l'utilisation des équipements de travail, le levage de charges et de personnes, les travaux temporaires en hauteur et la coordination avec les entreprises extérieures (plan de prévention), au cœur des compétences C1 et C6.",
      exploitation: "Preuve : tableau de suivi des textes. Action : modèle de plan de prévention pour l'accueil d'une compagnie revu chaque année.",
    },
  ],
  metier: [
    {
      lien: "https://www.inrs.fr/",
      titreLien: "INRS — chutes de hauteur, levage et coactivité",
      titre: "Ressources de prévention pour le travail en hauteur et la manutention mécanique",
      date: "Octobre 2026",
      commentaire: "Les dossiers de l'INRS sur les chutes de hauteur, le levage et l'intervention des entreprises extérieures complètent le chapitre 1 et donnent des repères partagés avec les services de prévention.",
      exploitation: "Preuve : sélection de ressources ajoutée au support. Action : renvoi vers ces ressources dans la fiche à retenir de la compétence C1.",
    },
    {
      lien: "https://www.afdas.com/",
      titreLien: "Afdas — opérateur de compétences de la culture",
      titre: "Besoins de formation des techniciens du spectacle et conditions de prise en charge",
      date: "Septembre 2026",
      commentaire: "Suivi des conditions de prise en charge de la formation des intermittents et des permanents du spectacle, et des besoins exprimés par les employeurs du secteur en matière de sécurité du levage.",
      exploitation: "Preuve : note interne datée. Action : information des candidats sur le financement dès l'entretien préalable.",
    },
    {
      lien: "https://www.boutique.afnor.org/",
      titreLien: "AFNOR — normes de la machinerie de scène",
      titre: "NF EN 17206 : machinerie pour scènes et autres zones de production",
      date: "Juillet 2026",
      commentaire: "La norme NF EN 17206 traite des exigences de sécurité et des inspections de la machinerie de scène ; elle sert de référence aux échanges avec les installateurs et les bureaux de contrôle sur les porteuses motorisées.",
      exploitation: "Preuve : référence citée dans le chapitre 2. Action : vérification de la cohérence du vocabulaire du support avec la norme lors de la mise à jour annuelle.",
    },
  ],
  technologique: [
    {
      lien: "https://www.boutique.afnor.org/",
      titreLien: "AFNOR — EN 17115, ponts en aluminium et en acier",
      titre: "Conception et fabrication des structures de ponts pour le spectacle",
      date: "Août 2026",
      commentaire: "La norme EN 17115 encadre la conception et la fabrication des ponts en aluminium et en acier utilisés dans le spectacle ; les tables de charge des fabricants et leurs notices en découlent.",
      exploitation: "Preuve : fiche mémo jointe au chapitre 5. Action : rappel de la lecture des tables de charge et des conditions d'assemblage.",
    },
    {
      lien: "https://www.inrs.fr/",
      titreLien: "INRS — commandes et sécurités des machines",
      titre: "Commandes de palans, variateurs et mesure de charge en temps réel",
      date: "Octobre 2026",
      commentaire: "Les pupitres de palans évoluent : commande à vitesse variable, positionnement, cellules de charge qui affichent la charge réelle de chaque point. Ces outils aident à vérifier la répartition calculée mais ne remplacent ni le calcul ni la feuille de charges.",
      exploitation: "Preuve : démonstration ajoutée au chapitre 4. Action : exercice comparant charges calculées et charges mesurées.",
    },
    {
      lien: "https://www.cnil.fr/fr/reglement-europeen-protection-donnees",
      titreLien: "CNIL — RGPD",
      titre: "Données personnelles dans les dossiers de formation et les registres",
      date: "Août 2026",
      commentaire: "Plans d'accroche, rapports et registres apportés par les participants peuvent contenir des noms et des coordonnées : ils sont anonymisés avant usage pédagogique, et les résultats individuels du positionnement restent confidentiels.",
      exploitation: "Preuve : mention d'information dans le livret d'accueil. Action : consigne d'anonymisation rappelée à l'ouverture.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedMSC70AICaches(f: FormationInfo = FORMATION_MSC70): void {
  try {
    setCachedContentPack(f, MSC70_CONTENT_PACK);
    setCachedEvalPack(f, MSC70_EVAL_PACK);
    setCachedVeillePack(f, MSC70_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
