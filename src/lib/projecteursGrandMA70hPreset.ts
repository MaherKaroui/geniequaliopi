/**
 * Preset complet « Projecteurs automatiques et pupitre grandMA – 70 h » — formation professionnelle
 * NON certifiante (aucun titre ni répertoire visé, non éligible au compte personnel de formation).
 * 70 heures sur 10 jours (7 h par jour, 9h00 – 12h30 / 13h30 – 17h00), groupe de 6 participants,
 * public de techniciens du spectacle (intermittents et permanents), financement typique Afdas.
 * Prérequis : bases d'éclairage scénique. Tarif non renseigné (aucune source) : à saisir dans le dossier.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - 6 compétences C1 à C6 (= 6 chapitres du support) ; fil rouge Théâtre des Quatre Vents, salle FICTIVE
 *    de 600 places (scène 14 m × 10 m, cintres de 18 m)
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées et 6 QCM de 10 questions,
 *    un par compétence (bonne réponse et explication dans le corrigé)
 *  - Pack évaluation : QCM de positionnement de début (10 questions, corrigé expliqué), QCM de fin,
 *    cas pratique intermédiaire, évaluation finale interne
 *  - Pack veille (réglementaire / métier / technologique)
 * Évaluation interne uniquement : attestation de fin de formation et certificat de réalisation.
 * Le support de cours (6 chapitres) est dans `projecteursGrandMA70h/` ; les réponses propres à chaque
 * stagiaire dans `projecteursGrandMA70hHumanized.ts`. Aucune donnée de satisfaction n'est pré-remplie.
 * La modalité n'est volontairement citée dans aucun texte (seul le champ `modalites` la porte).
 */
import type { FormationInfo } from "@/types/qualiopi";
import type { AIContentPack, AIContentExercise, AIContentVideo } from "./aiContentPack";
import type { AIEvalPack, AIQCMQuestion } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";

// ---------------------------------------------------------------------------
// Formation
// ---------------------------------------------------------------------------
export const FORMATION_GMA70: FormationInfo = {
  intitule: "Projecteurs automatiques et pupitre grandMA – 70 h",
  codeRNCP: "",
  objectifs:
    "Formation professionnelle non certifiante. Objectif général : rendre le technicien du spectacle autonome pour choisir, installer, adresser, programmer, exploiter et dépanner un parc de projecteurs automatiques piloté par un pupitre grandMA3, de la lecture de la fiche technique jusqu'à la restitution d'une conduite en conditions de spectacle.\nÀ l'issue de la formation, le participant sera capable de :\n- C1 — Identifier les familles de projecteurs automatiques, leurs sources et leurs effets, lire une fiche technique et une charte DMX et choisir un parc adapté à un projet.\n- C2 — Installer, accrocher, câbler et adresser un parc en sécurité : accroche et élingue de sécurité, travail en hauteur, distribution électrique, DMX512, RDM, réseaux Art-Net et sACN, plan de feux et patch.\n- C3 — Prendre en main le pupitre grandMA3 : architecture du système, show file, patch et bibliothèque de fixtures, vues, utilisateurs et sauvegardes.\n- C4 — Programmer : sélection et groupes, attributs, presets, cues, séquences et executors, tracking et temps de transition.\n- C5 — Créer des effets et encoder une conduite : phasers, MAtricks, pages, macros, déclenchements par timecode, à partir d'une conduite écrite.\n- C6 — Exploiter, maintenir et dépanner le parc et le pupitre en conditions de spectacle, puis archiver le spectacle.",
  prerequis:
    "Bases d'éclairage scénique : expérience de technicien lumière, de régisseur ou d'électricien du spectacle (projecteurs traditionnels, gradateurs, lecture d'un plan de feux).",
  duree: "70 heures réparties sur 10 jours (7 h par jour : 9h00 – 12h30 et 13h30 – 17h00)",
  dureeSaisiePrioritaire: true,
  modalites: "distanciel",
  tarif: "",
  programme:
    "JOUR 1 — LES PROJECTEURS AUTOMATIQUES (C1, 7 h) : QCM de positionnement et recueil des attentes ; familles d'appareils (spot, wash, beam, hybride) ; sources (lampe à décharge, LED, laser-phosphore) ; chaîne optique et effets (gobos fixes et tournants, prismes, iris, frost, mélange CMY, CTO, roues de couleurs, zoom et focus) ; mise en situation « Lire une fiche technique et une charte DMX ».\nJOUR 2 — CHOISIR UN PARC, PUIS ACCROCHER EN SÉCURITÉ (C1 et C2, 7 h) : matin, choix d'un parc pour une création au Théâtre des Quatre Vents (cahier des charges, flux, poids, consommation, bruit, budget de canaux), QCM C1 ; après-midi, accroche (crochets, colliers, oméga, élingue de sécurité), travail en hauteur et protections collectives, distribution électrique et puissances.\nJOUR 3 — CÂBLER, ADRESSER, METTRE EN RÉSEAU (C2, 7 h) : DMX512 (adresses, univers, terminaison, splitter), RDM, réseaux Art-Net et sACN, nodes ; plan de feux et patch papier ; mises en situation « Accrocher un projecteur en sécurité », « Adresser et câbler une ligne DMX » et « Plan de feux, univers et réseau » ; QCM C2.\nJOUR 4 — PRENDRE EN MAIN LE PUPITRE grandMA3 (C3, 7 h) : architecture du système (consoles, onPC, processing units, MA-Net3), show file, setup, patch et bibliothèque de fixtures, layout, vues et fenêtres, utilisateurs et profils, sauvegardes ; mise en situation « Créer le show file et patcher le parc ».\nJOUR 5 — DU PATCH À LA PREMIÈRE PROGRAMMATION (C3 et C4, 7 h) : matin, vues personnalisées, contrôle de la sortie DMX, QCM C3 ; après-midi, sélection et groupes, programmer, attributs et encodeurs ; cas pratique intermédiaire.\nJOUR 6 — PRESETS ET CUES (C4, 7 h) : presets (dimmer, position, gobo, color, beam, focus), stores de cues, séquences et executors, update et merge ; mise en situation « Groupes et presets du spectacle ».\nJOUR 7 — TRACKING ET TEMPS, PUIS PREMIERS EFFETS (C4 et C5, 7 h) : matin, tracking, temps de transition et delay, mise en situation « Cues, séquence et tracking », QCM C4 ; après-midi, phasers et effets de groupe.\nJOUR 8 — EFFETS ET ORGANISATION DU PUPITRE (C5, 7 h) : MAtricks, pages et executors, macros, déclenchements par timecode ; encodage d'une conduite écrite.\nJOUR 9 — CONDUITE COMPLÈTE, PUIS EXPLOITATION (C5 et C6, 7 h) : matin, mise en situation « Phasers, MAtricks et encodage de la conduite », QCM C5 ; après-midi, restitution en conditions de spectacle, gestion des imprévus, maintenance préventive (optiques, filtres, ventilateurs).\nJOUR 10 — DÉPANNER, ARCHIVER, ÉVALUER (C6, 7 h) : diagnostic de pannes (DMX, alimentation, moteurs, capteurs), mise à jour logicielle, archivage du spectacle ; mise en situation « Maintenance et diagnostic de panne » ; QCM C6 ; évaluation finale ; bilan de la formation.",
  methodesEvaluation:
    "Positionnement en ouverture : QCM de positionnement de 10 questions (une seule bonne réponse chacune, corrigé et expliqué), comparé à l'évaluation finale pour mesurer la progression, et 10 questions ouvertes de positionnement ; 10 mises en situation corrigées sur le parc et le pupitre ; un QCM corrigé de 10 questions à la fin de chaque compétence (C1 à C6) ; cas pratique intermédiaire en fin de jour 5 ; évaluation finale le jour 10 : QCM de fin, mise en œuvre pratique (patch, programmation et restitution d'une conduite, diagnostic d'une panne) notée sur une grille d'acquisition des compétences C1 à C6 ; test de positionnement de fin. Évaluation à chaud (questionnaire de satisfaction en fin de formation) et évaluation à froid à trois mois. Formation non certifiante : attestation de fin de formation mentionnant les objectifs et le niveau d'acquisition, et certificat de réalisation.",
  moyensPedagogiques:
    "Alternance d'apports techniques courts, de démonstrations commentées et de mises en situation progressives sur un parc de projecteurs automatiques (spots, wash, beams) et sur le pupitre grandMA3 ou le logiciel grandMA3 onPC associé à un visualiseur 3D. Fil rouge : le Théâtre des Quatre Vents, salle fictive de 600 places (scène de 14 m sur 10 m, cintres de 18 m). Ressources fournies : support de cours en six chapitres avec fiches à retenir, quiz et cas pratiques corrigés, fiches techniques et chartes DMX d'appareils courants, modèle de plan de feux et de patch, conduite écrite d'un spectacle, fiches de maintenance et de diagnostic. Matériel de sécurité présenté et manipulé : élingues de sécurité, crochets, colliers, équipements de protection individuelle.",
  publicVise:
    "Techniciens du spectacle vivant et de l'événementiel, intermittents et permanents : techniciens lumière, régisseurs lumière, électriciens du spectacle et pupitreurs qui veulent maîtriser les projecteurs automatiques et le pupitre grandMA3. Groupe de 6 participants. Financement possible par l'Afdas, opérateur de compétences de la culture, au titre du plan de développement des compétences de l'employeur ou des dispositifs ouverts aux intermittents du spectacle.",
  delaiAcces:
    "Après l'analyse des besoins et l'accord de financement (employeur ou Afdas) ; les dates des dix journées sont communiquées à l'inscription.",
  dateDebut: "2026-12-07",
  dateFin: "2026-12-18",
  lieu: "",
  nombreParticipants: "6",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Reconnaître les familles de projecteurs automatiques et savoir ce que chacune apporte à un spectacle.",
  "Lire une fiche technique et une charte DMX pour préparer un patch et une distribution électrique.",
  "Choisir un parc adapté à un projet (flux, poids, consommation, bruit, nombre de canaux).",
  "Accrocher un projecteur automatique en sécurité et travailler en hauteur sans prendre de risque.",
  "Câbler et adresser un parc en DMX512, utiliser le RDM et les réseaux Art-Net et sACN.",
  "Passer d'un pupitre traditionnel ou d'une autre marque au pupitre grandMA3 : architecture, show file, patch, vues.",
  "Programmer proprement avec des groupes et des presets pour pouvoir recaler une conduite rapidement.",
  "Créer des effets avec les phasers et les MAtricks et encoder une conduite à partir d'une conduite écrite.",
  "Garder son calme et réagir vite face à un imprévu technique pendant une représentation.",
  "Entretenir le parc, diagnostiquer une panne et archiver un spectacle pour la reprise ou la tournée.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins est conduite avant la formation (questionnaire préalable et entretien avec chaque participant et, le cas échéant, avec l'employeur) puis à l'ouverture du jour 1 : QCM de positionnement de 10 questions sur les notions clés des dix jours, comparé à l'évaluation finale pour mesurer la progression, questions ouvertes de positionnement et recueil des attentes. Les participants sont des techniciens du spectacle, intermittents ou permanents, aux parcours variés : électriciens habitués aux projecteurs traditionnels et aux gradateurs, régisseurs de salle, pupitreurs venant d'une autre console, techniciens polyvalents.</p>
<ul>
  <li><strong>Connaître et choisir le matériel (C1)</strong> : savoir ce qu'un spot, un wash, un beam ou un hybride sait faire, lire une fiche technique et une charte DMX, choisir un parc cohérent avec le projet et la salle.</li>
  <li><strong>Installer en sécurité (C2)</strong> : accroche, élingue de sécurité, travail en hauteur, puissance électrique, DMX512, RDM et réseaux sont les points où les écarts de pratique sont les plus fréquents.</li>
  <li><strong>Maîtriser le pupitre grandMA3 (C3, C4, C5)</strong> : passer d'une logique de circuits à une logique d'appareils, de groupes, de presets et de séquences, puis encoder une conduite complète avec effets.</li>
  <li><strong>Exploiter et dépanner (C6)</strong> : tenir une représentation, réagir à une panne, entretenir le parc et archiver le spectacle.</li>
</ul>
<p>Le Théâtre des Quatre Vents, salle fictive de 600 places (scène de 14 m sur 10 m, cintres de 18 m), sert de fil rouge à toutes les mises en situation avant la transposition aux salles et aux tournées des participants.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Niveau de départ hétérogène</strong> : binômes associant un participant à l'aise avec l'électricité et l'accroche et un participant plus à l'aise avec les pupitres ; exercices de programmation proposés en deux niveaux.</li>
  <li><strong>Pupitre déjà utilisé</strong> : pour les participants venant d'une autre console, tableau de correspondance des notions (séquence, cue, preset, executor) et exercices de traduction d'une conduite existante.</li>
  <li><strong>Projets réels</strong> : chaque participant peut apporter le plan de feux ou la conduite d'un spectacle sur lequel il travaille ; ils sont utilisés dans les mises en situation des jours 8 à 10.</li>
  <li><strong>Sécurité</strong> : les ateliers d'accroche se font sous la conduite du formateur, avec équipements de protection individuelle ; un participant qui ne souhaite pas monter en hauteur réalise les vérifications au sol et la préparation.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, supports transmis à l'avance sur demande, aménagement des mises en situation et de l'évaluation finale sur demande.</li>
</ul>`;

/** 10 mises en situation (C1 à C6), corrigés formateur. */
export const GMA70_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — C1 : lire une fiche technique et une charte DMX",
    consigne:
      "À partir de la fiche technique et de la charte DMX d'un spot LED de la salle (Théâtre des Quatre Vents, salle fictive) : 1. Relevez la masse, la consommation électrique maximale, la plage d'angle du zoom, le flux annoncé et le niveau sonore. 2. Listez les effets disponibles (roues de gobos, prisme, iris, frost, mélange CMY, CTO, roue de couleurs) et indiquez pour chacun s'il est indexable ou rotatif. 3. Comparez les modes DMX proposés (nombre de canaux, attributs en 8 ou 16 bits) et choisissez un mode pour le spectacle en justifiant. 4. Repérez sur la charte le canal de contrôle (reset, extinction de la source, réglages) et la valeur à éviter pendant une représentation.",
    reponseAttendue:
      "Données relevées sans erreur d'unité (kg, W, degrés, lumens, décibels) et utilisées : la masse sert à l'accroche, la consommation à la distribution électrique, le zoom à l'implantation.\nEffets correctement identifiés ; distinction entre gobo fixe, gobo tournant indexable et rotation continue.\nMode DMX choisi en fonction du besoin : le mode étendu apporte pan et tilt en 16 bits (coarse et fine) pour des mouvements lents et précis, au prix d'un plus grand nombre de canaux par univers.\nCanal de contrôle repéré, avec la règle : aucune valeur de reset ou d'extinction de la source enregistrée dans une cue de spectacle.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C1 : choisir un parc pour une création",
    consigne:
      "Le Théâtre des Quatre Vents accueille une création de théâtre musical : lumière de face sur le plateau de 14 m sur 10 m, découpes nettes au sol, faisceaux visibles dans la fumée pour deux tableaux musicaux, ambiances colorées en contre-jour, contrainte de bruit pour les scènes parlées. 1. Proposez la composition du parc (familles, nombre, emplacement : face, perches, latéraux, sol). 2. Justifiez le choix des sources (lampe à décharge, LED, laser-phosphore) au regard du bruit, de la consommation et de la maintenance. 3. Calculez la masse totale accrochée par perche et le nombre de canaux DMX nécessaires. 4. Indiquez les deux informations que vous demandez au loueur avant de valider.",
    reponseAttendue:
      "Parc cohérent avec les besoins : spots à couteaux pour les découpes et la face, wash pour les ambiances et le contre-jour, beams ou hybrides pour les faisceaux dans la fumée.\nChoix des sources argumenté : LED et laser-phosphore sans préchauffage ni temps de refroidissement, consommation plus faible ; attention au niveau sonore des ventilateurs pendant les scènes parlées (mode silencieux de l'appareil).\nCalculs justes : somme des masses par perche comparée à la charge admissible indiquée par le régisseur de la salle ; nombre de canaux selon le mode choisi et répartition par univers.\nQuestions au loueur pertinentes : versions de logiciel des appareils, modes DMX disponibles, état et date du dernier entretien, présence des accessoires d'accroche.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C2 : accrocher un projecteur automatique en sécurité",
    consigne:
      "Vous devez accrocher quatre spots de 30 kg sur la perche électrique numéro 3 du Théâtre des Quatre Vents. 1. Listez le matériel d'accroche nécessaire pour un appareil (oméga, crochets ou colliers, élingue de sécurité) et les vérifications avant usage. 2. Décrivez la procédure, de la mise à hauteur de travail de la perche à son appui en position. 3. Indiquez comment passe l'élingue de sécurité et ce qu'elle doit retenir. 4. Expliquez qui donne l'ordre de manœuvre de la perche et quelles règles s'appliquent quand on travaille sous une charge.",
    reponseAttendue:
      "Matériel complet et adapté à la masse : deux crochets ou colliers par oméga, oméga fixé sur la lyre et verrouillé (quart de tour), élingue de sécurité de charge adaptée, marquée et en bon état ; contrôle visuel avant usage (déformation, corrosion, mousqueton qui se verrouille).\nProcédure correcte : perche descendue à hauteur de travail par la personne habilitée, appareil posé en butée, serrage des crochets, élingue passée autour de la perche et dans le point prévu par le fabricant sur l'appareil, sans passer par l'oméga.\nL'élingue retient l'appareil en cas de défaillance de l'accroche principale ; elle est la plus courte possible pour limiter la chute.\nOrdre de manœuvre donné par le machiniste ou le régisseur responsable, annonce à voix haute, personne sous la charge pendant la manœuvre ; protections collectives privilégiées (perche descendue plutôt que travail en hauteur).",
    points: 20,
  },
  {
    titre: "Exercice 4 — C2 : adresser et câbler une ligne DMX",
    consigne:
      "Sur la perche 3, la ligne DMX de l'univers 2 dessert, dans l'ordre, quatre spots en mode 34 canaux puis quatre wash en mode 22 canaux. 1. Calculez l'adresse de départ de chaque appareil à partir de l'adresse 1 et vérifiez que l'univers n'est pas dépassé. 2. Indiquez le câble et les connecteurs à utiliser, l'ordre de chaînage et l'emplacement de la terminaison. 3. Un splitter est disponible : dans quel cas l'utilisez-vous ? 4. Décrivez comment vous vérifiez le travail avec un testeur ou par RDM sans monter en hauteur.",
    reponseAttendue:
      "Adresses : spots en 1, 35, 69 et 103 ; wash en 137, 159, 181 et 203 ; dernier canal utilisé 224, inférieur à 512.\nCâble DMX de 110 ohms (pas de câble micro), connecteurs XLR 5 broches ou 3 broches selon le parc, chaînage de la sortie d'un appareil vers l'entrée du suivant, terminaison de 120 ohms sur la sortie du dernier appareil.\nSplitter utilisé pour créer des branches isolées et régénérées (lignes vers plusieurs perches, plus de 32 appareils sur une ligne, isolation d'un appareil défectueux).\nVérification au sol : testeur DMX ou lecture RDM des adresses, modes et versions, contrôle de la sortie depuis le pupitre appareil par appareil.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C2 : plan de feux, univers et réseau Art-Net ou sACN",
    consigne:
      "Le parc complet du Théâtre des Quatre Vents compte 48 appareils automatiques et 60 circuits de gradateurs. 1. Établissez le patch papier : numéro d'appareil, type, mode, univers, adresse, emplacement sur le plan de feux. 2. Répartissez le parc sur les univers en laissant une réserve. 3. Proposez l'architecture réseau entre le pupitre et les nodes (switch, câblage, adressage IP, choix entre Art-Net et sACN). 4. Indiquez deux règles pour éviter qu'un problème réseau n'interrompe le spectacle.",
    reponseAttendue:
      "Patch papier complet, lisible et cohérent avec le plan de feux (même numérotation sur le plan, dans le pupitre et sur les étiquettes des appareils).\nRépartition logique par zone ou par perche, sans univers saturé, avec des adresses de réserve pour les appareils ajoutés ou remplacés.\nArchitecture cohérente : réseau dédié à la lumière, switch géré si le réseau est partagé, adresses IP fixes et notées, un seul protocole choisi pour chaque univers (Art-Net ou sACN) ; nodes placés au plus près des perches.\nRègles de fiabilité : pas d'autre trafic sur le réseau lumière, câblage repéré, sortie DMX de secours ou pupitre de secours prévus, vérification de chaque univers avant la représentation.",
    points: 20,
  },
  {
    titre: "Exercice 6 — C3 : créer le show file et patcher le parc dans grandMA3",
    consigne:
      "1. Créez un nouveau show file nommé selon la convention du théâtre (spectacle, salle, date). 2. Dans le patch, importez les types d'appareils depuis la bibliothèque, créez les 48 appareils avec leur numéro d'appareil, ou fixture ID, leur univers et leur adresse, conformément au patch papier. 3. Positionnez les appareils dans la vue layout selon le plan de feux. 4. Créez votre utilisateur et votre profil, une vue de travail pour la programmation, puis enregistrez le show et une copie sur clé USB.",
    reponseAttendue:
      "Show file nommé selon la convention et enregistré dès la création.\nPatch conforme au patch papier : bon type et bon mode d'appareil, fixture ID identiques à la numérotation du plan de feux, adresses vérifiées sans recouvrement (le pupitre signale les conflits).\nLayout lisible, qui reproduit l'implantation (perches, latéraux, sol) et permet une sélection rapide.\nUtilisateur et profil créés, vue de travail enregistrée (fenêtres de sélection, encodeurs, séquences) ; sauvegarde interne et copie externe effectuées et vérifiées.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C4 : groupes et presets du spectacle",
    consigne:
      "1. Créez les groupes utiles au spectacle (spots face, wash contre, beams, appareils jardin et cour, appareils pairs et impairs). 2. Créez les presets de position pour cinq zones de jeu du plateau, les presets de couleur de la création et trois presets de gobo. 3. Programmez une cue en utilisant uniquement des presets. 4. Le metteur en scène décale la zone de jeu centrale d'un mètre vers le lointain : montrez comment vous corrigez toutes les cues concernées en une seule opération.",
    reponseAttendue:
      "Groupes nommés clairement, avec un ordre de sélection réfléchi (de jardin à cour, par exemple) pour les effets à venir.\nPresets de position, de couleur et de gobo nommés selon les zones et les intentions du spectacle (« centre lointain », « bleu nuit »).\nCue programmée en appelant les presets, pas des valeurs brutes : les cues gardent un lien vers le preset.\nCorrection en une opération : modification du preset de position de la zone centrale puis mise à jour (update) du preset ; toutes les cues qui l'appellent sont corrigées.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C4 : cues, séquence, tracking et temps",
    consigne:
      "1. Encodez les huit premières cues de la conduite du spectacle dans une séquence affectée à un executor. 2. Donnez à chaque cue un temps de transition et, si nécessaire, un delay conforme à la conduite écrite. 3. Modifiez l'intensité d'un wash dans la cue 3 et observez l'effet du tracking sur les cues suivantes ; corrigez si la modification ne doit pas se propager. 4. Utilisez update pour corriger une cue existante, puis expliquez la différence avec un nouveau store en mode merge.",
    reponseAttendue:
      "Séquence complète affectée à un executor, cues numérotées et nommées comme dans la conduite écrite.\nTemps de transition et delays respectés ; mouvements des appareils prévus dans des cues de préparation pour éviter les mouvements visibles à la lumière (appareil éteint pendant le repositionnement).\nTracking compris : une valeur modifiée reste active dans les cues suivantes jusqu'à la prochaine valeur enregistrée ; correction limitée à la cue concernée quand c'est nécessaire (option cue only) ou valeur bloquante dans la cue suivante.\nUpdate utilisé pour modifier la cue active ou une cue désignée ; store en merge ajoute les valeurs du programmer à celles de la cue sans les effacer.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C5 : phasers, MAtricks et encodage de la conduite",
    consigne:
      "1. Créez sur les beams un effet de mouvement en vague (phaser de position) réparti de jardin à cour, puis un effet de couleur alterné sur les wash. 2. Utilisez les MAtricks pour obtenir un effet en miroir à partir du centre (wings) et un effet un appareil sur deux (interleave). 3. Placez les effets sur des executors d'une page dédiée, avec un fader de vitesse. 4. Encodez les cues 9 à 20 de la conduite écrite, dont le tableau musical déclenché par timecode, et créez une macro de remise à zéro du plateau.",
    reponseAttendue:
      "Phasers créés avec la bonne amplitude et la bonne vitesse, phase répartie sur la sélection pour obtenir la vague ; effet de couleur lisible et réglable.\nMAtricks utilisés à bon escient : wings pour le miroir, interleave pour un appareil sur deux, réglages enregistrés pour être rappelés.\nPage d'executors claire, nommée et documentée ; fader de vitesse fonctionnel.\nCues 9 à 20 conformes à la conduite écrite ; déclenchement par timecode testé sur la bande son ; macro de remise à zéro vérifiée et sans effet indésirable.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C6 : maintenance et diagnostic de panne",
    consigne:
      "Pendant la générale du Théâtre des Quatre Vents, trois incidents surviennent : quatre appareils en bout de perche 3 clignotent, un spot ne fait plus de mouvement en pan et affiche une erreur au reset, un wash s'éteint après vingt minutes de fonctionnement. 1. Pour chaque incident, proposez une hypothèse, les vérifications dans l'ordre et la mesure provisoire pour la représentation. 2. Rédigez la fiche de maintenance préventive d'un spot (optiques, filtres, ventilateurs, contrôles) avec une fréquence. 3. Décrivez les étapes d'archivage du spectacle en fin d'exploitation.",
    reponseAttendue:
      "Clignotement en bout de ligne : terminaison absente ou défectueuse, câble ou connecteur endommagé, ligne trop chargée ; vérification de la terminaison puis du câble, mise en place d'un splitter si besoin.\nErreur de pan au reset : obstacle mécanique, courroie ou capteur de position ; vérification hors tension et à froid, appareil remplacé ou mis hors conduite (parqué) pour la représentation.\nExtinction après vingt minutes : protection thermique déclenchée par des filtres ou ventilateurs encrassés ; nettoyage, contrôle de la ventilation et de la température affichée par l'appareil.\nFiche de maintenance complète (nettoyage des optiques avec produits adaptés, filtres et ventilateurs, contrôle des accessoires d'accroche, lecture des compteurs et des erreurs) ; fréquence adaptée à l'usage et à la fumée.\nArchivage : show file final, bibliothèques et version du logiciel, patch et plan de feux à jour, conduite écrite, liste des réglages particuliers et des pannes connues.",
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// QCM par compétence (10 questions chacun, bonne réponse et explication)
// Format lu par le générateur d'exercices : « 1) … A) …   B) … » + « 1-B  2-C … ».
// Aucune parenthèse fermante après A, B, C ou D dans les énoncés et les options (le parseur s'en servirait).
// Les explications suivent la clé, sous la forme « Q1 : … » (jamais « chiffre-tiret-lettre »).
// ---------------------------------------------------------------------------
type Q = [question: string, options: string[], correct: number, explication: string];
const LETTRES = ["A", "B", "C", "D"] as const;

function qcmExercice(titre: string, questions: Q[]): AIContentExercise {
  const consigne =
    `Cochez la bonne réponse pour chacune des ${questions.length} questions :\n\n` +
    questions
      .map(([q, opts], i) => `${i + 1}) ${q}\n  ${opts.map((o, oi) => `${LETTRES[oi]}) ${o}`).join("   ")}`)
      .join("\n\n");
  const cle = questions.map(([, , c], i) => `${i + 1}-${LETTRES[c]}`).join("  ");
  const explications = questions.map(([, , , e], i) => `Q${i + 1} : ${e}`).join(" ");
  return { titre, consigne, reponseAttendue: `${cle}\nExplications. ${explications}`, points: questions.length };
}

const VF = ["Vrai", "Faux"];

const QCM_C1: Q[] = [
  ["Quelle famille de projecteurs automatiques projette un faisceau à bord net capable de reproduire un gobo ?", ["Le wash", "Le spot", "Le stroboscope", "Le projecteur à faisceau diffus"], 1, "Le spot possède une optique de projection avec mise au point : il découpe et projette des gobos, alors que le wash produit un faisceau doux."],
  ["Le beam se caractérise principalement par :", ["Un faisceau très serré et très intense, visible dans la fumée", "Un faisceau large destiné au lavage du plateau", "L'absence de mouvement", "Une source obligatoirement à incandescence"], 0, "Le beam concentre la lumière dans un angle très fermé : il sert aux faisceaux aériens plus qu'à l'éclairage des comédiens."],
  ["Vrai ou faux : un projecteur hybride réunit dans un même appareil des fonctions de spot et de beam, parfois de wash.", VF, 0, "L'hybride combine plusieurs usages grâce à un zoom très étendu et à des effets complets ; il ne remplace pas pour autant un vrai wash pour un lavage homogène."],
  ["Le mélange de couleurs CMY est un mélange :", ["Additif, comme sur une source à LED rouge, verte et bleue", "Soustractif, des filtres cyan, magenta et jaune retirant des composantes du blanc", "Obtenu uniquement par une roue de couleurs fixes", "Réservé aux appareils à LED"], 1, "Les drapeaux dichroïques cyan, magenta et jaune soustraient des longueurs d'onde à la lumière blanche de la source."],
  ["À quoi sert le correcteur CTO ?", ["Augmenter la température de couleur vers un blanc froid", "Réduire le diamètre du faisceau", "Abaisser la température de couleur vers un blanc chaud", "Faire tourner le gobo"], 2, "Le CTO réchauffe le blanc de la source pour le rapprocher d'une lumière de type tungstène."],
  ["L'effet frost :", ["Change la couleur du faisceau", "Multiplie l'image projetée", "Ferme le faisceau", "Diffuse le faisceau et adoucit ses bords"], 3, "Le frost est un filtre de diffusion : il adoucit les bords et peut transformer un spot en lumière plus douce."],
  ["Le prisme d'un spot sert à :", ["Multiplier l'image du faisceau, souvent en rotation", "Corriger la température de couleur", "Régler la mise au point", "Augmenter la puissance électrique"], 0, "Le prisme démultiplie l'image projetée, par exemple en trois ou cinq faces, et peut tourner."],
  ["Dans une charte DMX, un attribut codé sur 16 bits utilise :", ["Un seul canal", "Deux canaux, l'un grossier et l'autre fin", "Quatre canaux", "Un univers complet"], 1, "Le canal grossier et le canal fin donnent 65 536 pas au lieu de 256 : indispensable pour des mouvements lents et précis."],
  ["Quelle donnée de la fiche technique sert à dimensionner la distribution électrique ?", ["L'angle du zoom", "Le nombre de gobos", "La consommation électrique maximale", "Le niveau sonore"], 2, "La puissance ou l'intensité absorbée maximale de chaque appareil permet de répartir le parc sur les lignes et de choisir les protections."],
  ["Quel est l'avantage principal d'une source à LED ou laser-phosphore par rapport à une lampe à décharge ?", ["Un flux toujours supérieur", "Aucune ventilation nécessaire", "La suppression du protocole DMX", "L'absence de temps de préchauffage et de refroidissement et une source à longue durée de vie"], 3, "Une lampe à décharge doit chauffer avant d'atteindre son flux et ne se rallume pas toujours à chaud ; la source à LED est instantanée et dure plus longtemps."],
];

const QCM_C2: Q[] = [
  ["Quel est le rôle de l'élingue de sécurité d'un projecteur ?", ["Remplacer les crochets", "Retenir l'appareil si l'accroche principale cède", "Porter le câble d'alimentation", "Servir uniquement en extérieur"], 1, "L'élingue de sécurité est une protection secondaire : elle retient l'appareil en cas de défaillance de l'accroche, elle ne remplace pas l'accroche."],
  ["Combien de canaux comporte un univers DMX512 ?", ["256", "1 024", "512", "32 768"], 2, "Un univers DMX512 transporte 512 canaux de 8 bits ; au-delà, il faut un univers supplémentaire."],
  ["En quoi consiste la terminaison d'une ligne DMX ?", ["Une résistance de 120 ohms placée en fin de ligne entre les deux fils de données", "Un câble qui revient vers le pupitre", "Un fusible de protection", "Un splitter à quatre sorties"], 0, "La terminaison absorbe le signal en bout de ligne et évite les réflexions qui provoquent des clignotements."],
  ["Combien d'appareils au plus recommande-t-on sur un même segment DMX, sans répéteur ni splitter ?", ["8", "16", "64", "32"], 3, "La couche électrique du DMX512 prévoit 32 charges par segment ; au-delà, on utilise un splitter ou un répéteur."],
  ["À quoi sert un splitter DMX ?", ["Fusionner les sorties de deux pupitres", "Diviser une ligne en plusieurs sorties isolées et régénérées", "Convertir le DMX en courant secteur", "Adresser automatiquement les appareils"], 1, "Le splitter crée des branches indépendantes : une panne sur une branche ne perturbe pas les autres."],
  ["Le RDM, normalisé sous la référence ANSI E1.20, permet :", ["De transmettre de la vidéo vers les appareils", "D'augmenter le nombre de canaux d'un univers", "De dialoguer avec les appareils sur la ligne DMX pour lire et régler l'adresse, le mode ou les capteurs", "De piloter les appareils sans câble"], 2, "Le RDM rend la ligne bidirectionnelle : on peut adresser et surveiller un appareil sans monter le voir."],
  ["Le protocole Art-Net transporte le DMX :", ["Sur un réseau Ethernet, en paquets UDP", "Uniquement sur fibre optique", "Par une liaison sans fil propriétaire", "Sur un câble XLR 3 broches"], 0, "Art-Net encapsule des univers DMX dans des paquets UDP sur un réseau Ethernet, vers des nodes qui les ressortent en DMX."],
  ["Sous quelle référence le protocole sACN est-il normalisé ?", ["ANSI E1.11", "ANSI E1.20", "IEEE 802.11", "ANSI E1.31"], 3, "ANSI E1.11 est le DMX512, ANSI E1.20 le RDM, ANSI E1.31 le sACN."],
  ["Un appareil en mode 30 canaux est adressé en 481 dans l'univers 1. Quels canaux occupe-t-il ?", ["Les canaux 481 à 510", "Les canaux 481 à 511", "Les canaux 480 à 510", "Il déborde sur l'univers 2"], 0, "Le dernier canal est l'adresse de départ plus le nombre de canaux moins un : 481 + 30 − 1 = 510."],
  ["Sur une ligne monophasée protégée en 16 ampères sous 230 volts, la puissance disponible est d'environ :", ["1 600 W", "2 300 W", "3 680 W", "7 360 W"], 2, "Puissance = tension × intensité, soit 230 × 16 = 3 680 W ; on garde une marge pour les appels de courant au démarrage."],
];

const QCM_C3: Q[] = [
  ["Qu'est-ce que grandMA3 onPC ?", ["Un logiciel du pupitre qui fonctionne sur un ordinateur", "Une console de petite taille", "Un node réseau", "Un protocole de communication"], 0, "onPC fait tourner le logiciel du pupitre sur un ordinateur ; associé à un module de commande ou à des sorties, il sert à préparer, programmer ou secourir."],
  ["À quoi sert une processing unit dans un système grandMA3 ?", ["À alimenter les projecteurs", "À ajouter de la capacité de calcul des paramètres au système", "À stocker les gobos", "À remplacer le switch réseau"], 1, "Les processing units augmentent le nombre de paramètres traités et peuvent sortir des univers sur le réseau."],
  ["MA-Net3 désigne :", ["Une ligne DMX particulière", "Le format de la bibliothèque d'appareils", "Le protocole réseau qui relie les éléments d'une session grandMA3", "Un type de câble"], 2, "MA-Net3 assure la communication entre consoles, onPC et processing units d'une même session."],
  ["Que contient le show file ?", ["Uniquement les cues", "Uniquement le patch", "Uniquement les vues", "La programmation, le patch, les réglages et la configuration du spectacle"], 3, "Le show file est l'ensemble du spectacle : perdre le show file, c'est perdre tout le travail."],
  ["Patcher un appareil, c'est :", ["L'associer à un type d'appareil de la bibliothèque, un numéro, un univers et une adresse DMX", "Le nettoyer avant le spectacle", "Lui donner une couleur", "L'accrocher sur une perche"], 0, "Le patch fait le lien entre l'appareil réel, son profil et l'adresse à laquelle le pupitre lui envoie les données."],
  ["Sur quel format ouvert de description des appareils grandMA3 s'appuie-t-il notamment ?", ["SMPTE", "GDTF", "MIDI", "PDF"], 1, "Le format GDTF décrit les appareils, leurs modes et leur géométrie ; il est utilisé par grandMA3 et par de nombreux fabricants."],
  ["Le fixture ID sert à :", ["Indiquer l'adresse DMX", "Désigner le fabricant", "Désigner l'appareil pour le sélectionner, indépendamment de son adresse DMX", "Numéroter les cues"], 2, "On sélectionne « Fixture 12 » sans se soucier de son adresse : si l'adresse change, la programmation reste valable."],
  ["Pourquoi créer un utilisateur et un profil par personne qui programme ?", ["Pour que chacun retrouve ses vues, ses réglages et ses préférences de travail", "Pour doubler la puissance du pupitre", "Pour verrouiller les projecteurs", "Parce que le pupitre ne démarre pas sans cela"], 0, "Le profil garde l'organisation de travail de chaque utilisateur sans modifier celle des autres."],
  ["Quelle pratique de sauvegarde est recommandée ?", ["Enregistrer une seule fois en fin de journée", "Garder le show uniquement dans la console", "Écraser chaque fois le même fichier sur une clé", "Enregistrer souvent, sous des noms datés, et conserver une copie sur un support externe"], 3, "Des versions datées permettent de revenir en arrière ; la copie externe protège d'une panne de la console."],
  ["À quoi sert la vue layout ?", ["À régler la puissance des gradateurs", "À représenter les appareils selon le plan de feux pour les sélectionner graphiquement", "À lire la charte DMX", "À enregistrer la bande son"], 1, "Le layout reproduit l'implantation : on sélectionne un appareil là où il se trouve sur le plan."],
];

const QCM_C4: Q[] = [
  ["Le programmer est :", ["La mémoire de travail qui contient les valeurs en cours de modification avant enregistrement", "La liste des cues", "Un module matériel", "La bibliothèque d'appareils"], 0, "Ce qui est dans le programmer est prioritaire en sortie ; il faut l'enregistrer ou le vider (clear)."],
  ["Un preset est :", ["Une cue particulière", "Une valeur nommée et réutilisable, appelée par les cues, dont la modification se répercute partout où elle est utilisée", "Un groupe d'appareils", "Un réglage du réseau"], 1, "Les cues gardent un lien vers le preset : on corrige le preset, toutes les cues sont corrigées."],
  ["Le tracking signifie que :", ["Chaque cue doit contenir toutes les valeurs de tous les appareils", "Les appareils suivent un comédien automatiquement", "Une valeur enregistrée reste active dans les cues suivantes tant qu'elle n'est pas modifiée", "Les temps sont recalculés automatiquement"], 2, "Le pupitre n'enregistre que les changements ; une valeur modifiée se propage jusqu'à la prochaine valeur enregistrée."],
  ["Quelle commande enregistre le contenu du programmer dans une cue ?", ["Go", "Clear", "Blind", "Store"], 3, "Store enregistre ; Go lance la cue suivante ; Clear vide le programmer."],
  ["La fonction update sert à :", ["Mettre à jour une cue ou un preset existant avec les valeurs modifiées dans le programmer", "Mettre à jour le logiciel du pupitre", "Effacer la séquence", "Renuméroter les appareils"], 0, "Update corrige ce qui existe sans créer de nouvelle cue."],
  ["Un groupe est :", ["Une séquence de cues", "Une sélection d'appareils enregistrée, avec son ordre de sélection, et rappelable", "Un univers DMX", "Une page d'executors"], 1, "L'ordre de sélection enregistré dans le groupe sert ensuite aux effets et aux répartitions."],
  ["Quelle saisie sélectionne les appareils 1 à 10 en ligne de commande ?", ["Fixture 1 Plus 10", "Fixture 1 At 10", "Fixture 1 Thru 10", "Fixture 1 Store 10"], 2, "Thru désigne une plage ; Plus ajoute un élément ; At donne une valeur."],
  ["Le delay d'une cue correspond :", ["À la durée totale de la transition", "Au temps de mouvement des appareils uniquement", "À la durée d'affichage de la cue", "Au temps d'attente avant que la transition commence"], 3, "Le fade est la durée de la transition ; le delay retarde son départ après le Go."],
  ["Une séquence est :", ["Une liste ordonnée de cues, affectée à un executor pour être jouée", "Un effet de mouvement", "Une sauvegarde du show", "Un groupe de presets"], 0, "La séquence porte la conduite ; l'executor permet de la jouer avec Go, fader et boutons."],
  ["Pourquoi programmer les positions en presets plutôt qu'en valeurs brutes ?", ["Parce que les valeurs brutes sont interdites", "Pour pouvoir recaler toute la conduite en modifiant quelques presets dans une nouvelle salle", "Pour économiser des canaux DMX", "Pour accélérer les mouvements"], 1, "En tournée, on recale les presets de position sur le nouveau plateau et la conduite entière suit."],
];

const QCM_C5: Q[] = [
  ["Dans grandMA3, quel outil produit les effets dynamiques, par exemple une vague de mouvement ?", ["Le patch", "Les phasers", "La bibliothèque", "Le timecode"], 1, "Les phasers font varier un attribut entre plusieurs valeurs, avec une vitesse, une forme et une répartition."],
  ["Les MAtricks permettent :", ["De mesurer la consommation électrique", "De régler l'adresse DMX", "De répartir valeurs, temps et effets sur une sélection selon des motifs", "De sauvegarder le show"], 2, "Block, groups, wings et interleave organisent la sélection pour créer des répartitions sans tout programmer à la main."],
  ["Sur dix appareils, un réglage wings à 2 donne :", ["Un effet appliqué à un seul appareil", "Un effet sur un appareil sur deux", "Un effet aléatoire", "Deux moitiés de la sélection traitées en miroir"], 3, "Wings partage la sélection en ailes symétriques : l'effet part du centre ou des bords en miroir."],
  ["Une macro est :", ["Une suite de commandes enregistrée et exécutée en une seule action", "Un très gros projecteur", "Une cue en temps zéro", "Une vue de travail"], 0, "Une macro automatise une suite d'opérations répétitives, par exemple une remise à zéro du plateau."],
  ["Le timecode SMPTE est :", ["Un protocole d'adressage des appareils", "Une référence horaire en heures, minutes, secondes et images qui permet de déclencher les cues en synchronisation avec un support son ou vidéo", "Un type de gobo", "Un mode d'économie d'énergie"], 1, "Le pupitre lit le timecode et déclenche chaque cue à l'instant prévu de la bande."],
  ["À quoi servent les pages d'executors ?", ["À imprimer la conduite", "À enregistrer les presets", "À organiser plusieurs jeux d'executors sur les mêmes faders et boutons physiques", "À choisir la langue du pupitre"], 2, "On change de page pour accéder à d'autres séquences ou effets avec les mêmes commandes physiques."],
  ["Dans une conduite écrite, le « top » donné par le régisseur correspond :", ["À l'heure de début du spectacle", "Au niveau maximal d'intensité", "À la fin de la représentation", "À l'ordre de déclencher la cue au moment précis"], 3, "Le top est l'ordre de lancer l'effet ; la cue est préparée à l'avance et lancée exactement au top."],
  ["Le réglage de phase d'un phaser réparti sur la sélection sert à :", ["Décaler l'effet d'un appareil à l'autre", "Changer la couleur", "Augmenter la puissance", "Arrêter l'effet"], 0, "Une phase répartie, par exemple de 0 à 360 degrés, crée la vague : chaque appareil est en décalage sur le suivant."],
  ["Vrai ou faux : on peut préparer ou modifier une cue sans que le changement apparaisse sur scène, en travaillant en aveugle (blind) ou en prévisualisation.", VF, 0, "Le mode blind et la prévisualisation permettent de corriger pendant une répétition sans perturber ce qui est sur scène."],
  ["Pour encoder un tableau musical déclenché par timecode, la première étape est :", ["D'augmenter la vitesse de tous les phasers", "De vérifier que le pupitre reçoit bien le timecode et que l'heure de départ de la bande est connue", "De supprimer les presets", "De désactiver le tracking"], 1, "Sans réception fiable du timecode et sans repère de départ, aucun déclenchement ne sera juste."],
];

const QCM_C6: Q[] = [
  ["À quelle fréquence nettoyer les optiques d'un projecteur automatique ?", ["Une fois par an, quel que soit l'usage", "Jamais, cela risque de les rayer", "Selon l'usage et l'environnement, notamment la fumée et la poussière, en suivant la préconisation du fabricant", "Avant chaque représentation"], 2, "La fumée de scène encrasse vite les optiques et les filtres ; la fréquence dépend de l'usage."],
  ["Avant d'ouvrir un projecteur pour une intervention, il faut :", ["Le laisser allumé pour voir la panne", "Le couper du DMX seulement", "Le mettre en mode silencieux", "Le débrancher de l'alimentation et le laisser refroidir"], 3, "Coupure de l'alimentation et refroidissement préalables : risque électrique et risque de brûlure."],
  ["Un appareil s'allume mais ne répond plus au pupitre. Que vérifiez-vous d'abord ?", ["Son adresse, son mode et son univers, puis le câble et la terminaison", "La lampe", "La couleur du gobo", "Le show file complet"], 0, "La plupart des pannes de réponse viennent de l'adressage ou de la liaison DMX."],
  ["Plusieurs appareils en bout de ligne clignotent de façon aléatoire. Hypothèse la plus probable ?", ["Une lampe en fin de vie", "Une terminaison absente ou défectueuse, ou une ligne trop chargée", "Un preset mal nommé", "Un tracking actif"], 1, "Les réflexions de signal en bout de ligne produisent ce symptôme ; on vérifie la terminaison et le câble."],
  ["Un spot affiche une erreur de pan au reset. Quelle origine est plausible ?", ["Une adresse DMX en double", "Un preset de couleur", "Un obstacle mécanique, une courroie ou un capteur de position", "Un mauvais timecode"], 2, "Au reset, l'appareil cherche ses repères mécaniques ; une gêne mécanique ou un capteur défaillant provoque l'erreur."],
  ["Des ventilateurs et filtres encrassés provoquent :", ["Une meilleure couleur", "Un adressage incorrect", "Une baisse du bruit", "Une surchauffe, le déclenchement des protections thermiques et une durée de vie réduite"], 3, "Sans circulation d'air, la température monte et l'appareil se protège en baissant son flux ou en s'éteignant."],
  ["Quand faire la mise à jour logicielle d'un pupitre ou d'un parc ?", ["En dehors de l'exploitation, après sauvegarde et vérification de la compatibilité du show file", "Juste avant une représentation", "Pendant l'entracte", "Jamais"], 0, "Une mise à jour peut modifier le comportement ; on la teste hors exploitation, sauvegarde faite."],
  ["Pendant une représentation, un projecteur reste bloqué dans une position gênante. Quelle conduite tenir ?", ["Monter le réparer immédiatement", "Le neutraliser depuis le pupitre, par exemple intensité à zéro ou parcage, poursuivre le spectacle et diagnostiquer après", "Arrêter le spectacle", "Redémarrer le pupitre"], 1, "La priorité est le spectacle et la sécurité ; le diagnostic se fait après la représentation."],
  ["Que doit contenir l'archive d'un spectacle ?", ["Le show file seulement", "Les photos du spectacle", "Le show file, la version du logiciel, les types d'appareils, le patch, le plan de feux et la conduite écrite à jour", "Le contrat de cession"], 2, "Pour une reprise ou une tournée, il faut pouvoir reconstituer le spectacle tel qu'il a été joué."],
  ["Vrai ou faux : une lampe à décharge éteinte à chaud peut nécessiter un temps de refroidissement avant de pouvoir être rallumée.", VF, 0, "Beaucoup de lampes à décharge ne se réamorcent pas à chaud ; on évite de couper la source pendant le spectacle."],
];

export const GMA70_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Projecteurs automatiques : familles, sources, effets et fiche technique", QCM_C1),
  qcmExercice("QCM C2 — Installer, accrocher, câbler et adresser en sécurité", QCM_C2),
  qcmExercice("QCM C3 — Prendre en main le pupitre grandMA3", QCM_C3),
  qcmExercice("QCM C4 — Programmer : groupes, presets, cues et séquences", QCM_C4),
  qcmExercice("QCM C5 — Effets et conduite", QCM_C5),
  qcmExercice("QCM C6 — Exploiter, maintenir et dépanner", QCM_C6),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (C1 à C6), alignées sur les 10 questions de
 * positionnement et sur les copies de `projecteursGrandMA70hHumanized.ts` ; les 6 QCM ensuite.
 */
export const GMA70_EXERCICES_COMPLETS: AIContentExercise[] = [...GMA70_EXERCICES, ...GMA70_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Projecteurs automatiques et pupitre grandMA – 70 h » (6 chapitres, un par compétence)</strong> : apports détaillés, exemples chiffrés sur le Théâtre des Quatre Vents (salle fictive), procédures pas à pas, points de vigilance sécurité, fiches à retenir, quiz et cas pratiques corrigés.</li>
  <li><strong>Documents techniques</strong> : fiches techniques et chartes DMX d'appareils courants (spots, wash, beams, hybrides), tableau de calcul des adresses et des puissances.</li>
  <li><strong>Modèles</strong> : plan de feux du Théâtre des Quatre Vents, patch papier, conduite écrite du spectacle fil rouge, fiche de maintenance préventive, fiche de diagnostic de panne, check-list d'archivage du spectacle.</li>
  <li><strong>Fiches à retenir</strong> : correspondance des notions entre pupitres (cue, séquence, preset, executor), principales commandes de la ligne de commande grandMA3, règles d'accroche et d'élingage.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Parc de projecteurs automatiques</strong> de démonstration (spots, wash, beams) avec accessoires d'accroche, élingues de sécurité, câbles DMX, splitter et terminaisons.</li>
  <li><strong>Pupitre grandMA3</strong> ou logiciel grandMA3 onPC avec module de commande, visualiseur 3D et sorties réseau (node Art-Net ou sACN).</li>
  <li><strong>Outillage de contrôle</strong> : testeur DMX avec fonctions RDM, multimètre, matériel de nettoyage des optiques.</li>
  <li><strong>Équipements de protection individuelle</strong> pour les ateliers d'accroche : casque, gants, chaussures de sécurité, harnais présenté avec son point d'ancrage.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>MA Lighting — documentation et logiciels grandMA3</strong> : <a href="https://www.malighting.com/">https://www.malighting.com/</a> — manuel utilisateur, versions du logiciel, grandMA3 onPC.</li>
  <li><strong>ESTA — Technical Standards Program</strong> : <a href="https://tsp.esta.org/">https://tsp.esta.org/</a> — normes DMX512 (ANSI E1.11), RDM (ANSI E1.20) et sACN (ANSI E1.31).</li>
  <li><strong>Art-Net</strong> : <a href="https://art-net.org.uk/">https://art-net.org.uk/</a> — spécification du protocole Art-Net.</li>
  <li><strong>GDTF</strong> : <a href="https://gdtf.eu/">https://gdtf.eu/</a> — format ouvert de description des appareils utilisé par le pupitre.</li>
  <li><strong>INRS — prévention des risques</strong> : <a href="https://www.inrs.fr/">https://www.inrs.fr/</a> — travail en hauteur, risque électrique, manutention.</li>
  <li><strong>Afdas</strong> : <a href="https://www.afdas.com/">https://www.afdas.com/</a> — opérateur de compétences de la culture, financement de la formation des techniciens du spectacle.</li>
</ul>`;

/** Aucune vidéo pré-sélectionnée pour cette formation. */
export const GMA70_VIDEOS: AIContentVideo[] = [];

export const GMA70_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: GMA70_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: GMA70_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement de début (10 questions, une seule bonne réponse, corrigé
// expliqué) ; QCM de fin (10 questions)
// ---------------------------------------------------------------------------
export const GMA70_POSITIONNEMENT_TITRE = "Positionnement — vos repères de départ";
export const GMA70_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Quel type de projecteur automatique projette un gobo net sur le plateau ?", options: ["Le wash", "Le spot", "Le stroboscope"], correctIndex: 1 },
  { question: "Que signifie un mélange de couleurs CMY ?", options: ["Un mélange soustractif par filtres cyan, magenta et jaune", "Un mélange additif rouge, vert et bleu", "Une roue de couleurs fixes"], correctIndex: 0 },
  { question: "À quoi sert l'élingue de sécurité d'un projecteur accroché ?", options: ["À tenir le câble DMX", "À régler l'inclinaison de l'appareil", "À retenir l'appareil si l'accroche principale cède"], correctIndex: 2 },
  { question: "Combien de canaux contient un univers DMX512 ?", options: ["512", "256", "1 024"], correctIndex: 0 },
  { question: "Que place-t-on en fin de ligne DMX ?", options: ["Un gradateur", "Une terminaison de 120 ohms", "Un deuxième pupitre"], correctIndex: 1 },
  { question: "Qu'est-ce que le patch dans un pupitre ?", options: ["La liste des cues", "Un effet de couleur", "L'association de chaque appareil à un type, un numéro, un univers et une adresse"], correctIndex: 2 },
  { question: "Qu'est-ce qu'un preset ?", options: ["Une valeur nommée réutilisée par les cues", "Un groupe de gradateurs", "Une sauvegarde du show"], correctIndex: 0 },
  { question: "Avec le tracking, une valeur modifiée dans une cue :", options: ["Disparaît à la cue suivante", "Reste active dans les cues suivantes tant qu'elle n'est pas modifiée", "Est effacée du show"], correctIndex: 1 },
  { question: "À quoi sert le timecode dans une conduite ?", options: ["À adresser les projecteurs", "À régler le zoom", "À déclencher les cues en synchronisation avec un support son ou vidéo"], correctIndex: 2 },
  { question: "Avant d'intervenir à l'intérieur d'un projecteur, il faut d'abord :", options: ["Le débrancher et le laisser refroidir", "Le mettre en mode silencieux", "Retirer l'adresse DMX"], correctIndex: 0 },
];

/** Explications du corrigé du positionnement, dans l'ordre des questions. */
export const GMA70_QCM_DEBUT_EXPLICATIONS: string[] = [
  "Le spot possède une optique de projection et une mise au point ; le wash donne un faisceau doux sans gobo net (compétence C1, jour 1).",
  "Les filtres cyan, magenta et jaune retirent des composantes de la lumière blanche : c'est un mélange soustractif (compétence C1, jour 1).",
  "L'élingue de sécurité est une protection secondaire qui retient l'appareil en cas de défaillance de l'accroche (compétence C2, jour 2).",
  "Un univers DMX512 transporte 512 canaux ; au-delà, on ajoute un univers (compétence C2, jour 3).",
  "La terminaison de 120 ohms évite les réflexions du signal qui font clignoter les appareils en bout de ligne (compétence C2, jour 3).",
  "Le patch relie l'appareil réel, son profil et son adresse : sans patch juste, rien ne répond (compétence C3, jour 4).",
  "Le preset est appelé par les cues : on le corrige une fois et toutes les cues suivent (compétence C4, jour 6).",
  "Le pupitre n'enregistre que les changements : une valeur se propage jusqu'à la prochaine valeur enregistrée (compétence C4, jour 7).",
  "Le timecode donne une référence horaire commune qui déclenche les cues au bon moment de la bande (compétence C5, jour 8).",
  "Coupure de l'alimentation et refroidissement évitent le risque électrique et les brûlures (compétence C6, jour 9).",
];

export const GMA70_QCM_FIN: AIQCMQuestion[] = [
  { question: "Quel appareil choisir pour des faisceaux très serrés et visibles dans la fumée ?", options: ["Un wash à LED", "Un beam", "Un projecteur à faisceau diffus", "Un gradateur"], correctIndex: 1 },
  { question: "Un attribut de pan en 16 bits utilise :", options: ["Un canal", "Deux canaux, grossier et fin", "Trois canaux", "Un univers"], correctIndex: 1 },
  { question: "Quelle affirmation sur l'accroche d'un projecteur automatique est juste ?", options: ["L'élingue de sécurité peut remplacer un crochet manquant", "L'élingue passe par l'oméga", "L'élingue de sécurité, de charge adaptée, relie l'appareil à la structure indépendamment de l'accroche principale", "L'élingue est facultative sous 20 kg"], correctIndex: 2 },
  { question: "Quatre appareils en mode 25 canaux sont chaînés à partir de l'adresse 1. Quelle est l'adresse du quatrième ?", options: ["76", "75", "100", "101"], correctIndex: 0 },
  { question: "Quel protocole est normalisé sous la référence ANSI E1.31 ?", options: ["Le DMX512", "Le RDM", "Art-Net", "Le sACN"], correctIndex: 3 },
  { question: "Dans grandMA3, que garantit une programmation par presets ?", options: ["Des transitions plus rapides", "Une consommation réduite", "La possibilité de corriger toutes les cues en modifiant le preset", "L'absence de tracking"], correctIndex: 2 },
  { question: "Quelle commande vide le programmer ?", options: ["Clear", "Store", "Update", "Go"], correctIndex: 0 },
  { question: "Quel réglage des MAtricks donne un effet en miroir à partir du centre ?", options: ["Interleave", "Wings", "Block", "Fade"], correctIndex: 1 },
  { question: "Un wash s'éteint après vingt minutes de fonctionnement. Hypothèse la plus probable ?", options: ["Une adresse en double", "Un preset effacé", "Une erreur de timecode", "Une protection thermique déclenchée par des filtres ou ventilateurs encrassés"], correctIndex: 3 },
  { question: "Quand mettre à jour le logiciel d'un pupitre ?", options: ["Pendant l'entracte", "Juste avant la générale", "Hors exploitation, après sauvegarde et vérification de la compatibilité du show file", "Pendant la représentation"], correctIndex: 2 },
];

export const GMA70_EVAL_PACK: AIEvalPack = {
  qcmDebut: GMA70_QCM_DEBUT,
  qcmFin: GMA70_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du jour 5) — l'implantation de la perche 3 au Théâtre des Quatre Vents, salle fictive",
    contexte:
      "La compagnie arrive demain pour la création. Sur la perche électrique 3 (charge admissible communiquée par le régisseur de la salle), vous devez installer quatre spots LED de 30 kg en mode 34 canaux et quatre wash de 20 kg en mode 22 canaux, alimentés par deux lignes monophasées de 16 ampères. La ligne DMX de l'univers 2 arrive au pied de la perche ; le pupitre grandMA3 est en régie, relié à un node par le réseau lumière. Le show file de la création n'existe pas encore.",
    questions: [
      { question: "Listez le matériel d'accroche par appareil et les vérifications avant de monter la perche.", reponseAttendue: "Oméga verrouillé et deux crochets ou colliers par appareil, élingue de sécurité de charge adaptée passée autour de la perche et dans le point prévu sur l'appareil ; contrôle visuel du matériel ; masse totale (4 × 30 + 4 × 20 = 200 kg, plus câbles) comparée à la charge admissible ; personne sous la perche pendant la manœuvre, ordre donné par le responsable.", points: 5 },
      { question: "Calculez les adresses DMX des huit appareils et indiquez où placer la terminaison.", reponseAttendue: "Spots en 1, 35, 69 et 103 ; wash en 137, 159, 181 et 203 ; dernier canal 224. Terminaison de 120 ohms sur la sortie du dernier wash ; câble DMX de 110 ohms.", points: 5 },
      { question: "Répartissez les appareils sur les deux lignes de 16 ampères à partir des consommations de la fiche technique.", reponseAttendue: "Puissance disponible d'environ 3 680 W par ligne ; somme des puissances maximales de la fiche technique par ligne, avec une marge pour les appels de courant ; répartition équilibrée (par exemple deux spots et deux wash par ligne) ; aucune ligne au-delà de sa capacité.", points: 5 },
      { question: "Décrivez les étapes pour créer le show file et patcher ces huit appareils, puis vérifier qu'ils répondent.", reponseAttendue: "Nouveau show file nommé selon la convention ; import des types d'appareils et des bons modes depuis la bibliothèque ; création des fixture ID selon le plan de feux, univers 2 et adresses calculées ; positionnement dans le layout ; contrôle de la sortie appareil par appareil (intensité, mouvement, couleur) ; sauvegarde et copie externe.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — QCM de fin, mise en œuvre pratique et diagnostic (jour 10), grille d'acquisition des compétences C1 à C6",
    exercices: [
      {
        titre: "Partie 1 — QCM de fin sur les six compétences (C1 à C6, 20 minutes)",
        consigne: "Répondez individuellement aux 10 questions du QCM de fin (familles d'appareils, DMX et 16 bits, accroche, adressage, protocoles réseau, presets, programmer, MAtricks, diagnostic, mise à jour logicielle). Correction commentée en groupe.",
        reponseAttendue: "Réponses attendues : beam ; deux canaux grossier et fin ; élingue indépendante de l'accroche principale et de charge adaptée ; adresse 76 ; sACN ; correction de toutes les cues par le preset ; Clear ; wings ; protection thermique due à l'encrassement ; mise à jour hors exploitation après sauvegarde.",
        points: 20,
      },
      {
        titre: "Partie 2 — Choisir, installer et adresser (C1, C2)",
        consigne: "À partir d'une fiche technique et d'un plan de feux partiel du Théâtre des Quatre Vents (salle fictive), choisissez le mode DMX des appareils, établissez le patch papier d'une perche, préparez la répartition électrique et décrivez l'accroche d'un appareil.",
        reponseAttendue: "Mode DMX justifié ; patch sans recouvrement d'adresses et cohérent avec le plan ; répartition électrique calculée avec marge ; accroche complète (oméga, crochets, élingue de sécurité) et règles de sécurité énoncées (charge au-dessus des personnes, protections collectives, ordre de manœuvre).",
        points: 20,
      },
      {
        titre: "Partie 3 — Programmer une séquence (C3, C4)",
        consigne: "Sur le pupitre grandMA3, patchez le parc fourni, créez les groupes et les presets nécessaires, puis encodez une séquence de dix cues conforme à la conduite écrite, avec temps et delays.",
        reponseAttendue: "Patch juste ; groupes ordonnés ; presets nommés ; cues programmées par presets ; temps et delays conformes ; tracking maîtrisé (aucune valeur indésirable propagée) ; show enregistré et copié.",
        points: 20,
      },
      {
        titre: "Partie 4 — Effets et restitution de la conduite (C5)",
        consigne: "Ajoutez à la séquence un effet de mouvement et un effet de couleur créés avec les phasers et les MAtricks, placez-les sur une page d'executors, puis restituez la conduite complète aux tops du formateur.",
        reponseAttendue: "Effets lisibles, réglables en vitesse et répartis correctement ; page d'executors claire ; restitution sans erreur de déclenchement, tops respectés, gestion propre des executors et des effets.",
        points: 20,
      },
      {
        titre: "Partie 5 — Diagnostic d'une panne et archivage (C6)",
        consigne: "Le formateur provoque une panne sur le parc (liaison DMX, adressage ou appareil). Diagnostiquez-la, décrivez la mesure provisoire pour la représentation et la réparation, puis listez le contenu de l'archive du spectacle.",
        reponseAttendue: "Démarche de diagnostic ordonnée (symptôme, hypothèses, vérifications du plus simple au plus complexe, en sécurité) ; mesure provisoire adaptée sans arrêter le spectacle ; réparation ou remplacement ; archive complète (show file, version du logiciel, types d'appareils, patch, plan de feux, conduite écrite, réglages particuliers).",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const GMA70_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000037385728/",
      titreLien: "Légifrance — Code du travail, actions concourant au développement des compétences",
      titre: "Définition de l'action de formation et obligations de l'organisme",
      date: "Octobre 2026",
      commentaire: "Articles L. 6313-1 et suivants : l'action de formation est un parcours pédagogique permettant d'atteindre un objectif professionnel ; programme, convention, émargement, attestation de fin de formation et certificat de réalisation.",
      exploitation: "Preuve : fiche mémo archivée au dossier qualité. Action : vérification du programme des dix jours, de la convention et des documents de fin de formation remis aux participants.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072050/",
      titreLien: "Légifrance — Code du travail, travaux temporaires en hauteur",
      titre: "Travail en hauteur : priorité aux protections collectives",
      date: "Septembre 2026",
      commentaire: "Les articles R. 4323-58 et suivants du Code du travail encadrent les travaux temporaires en hauteur : ils doivent être réalisés depuis un plan de travail conçu et équipé de protections collectives ; les équipements de protection individuelle ne viennent qu'à défaut. Application directe aux ateliers d'accroche sur perches et ponts.",
      exploitation: "Preuve : procédure d'atelier d'accroche mise à jour. Action : perche descendue à hauteur de travail chaque fois que c'est possible, nacelle ou protection collective sinon, harnais en dernier recours.",
    },
    {
      lien: "https://travail-emploi.gouv.fr/",
      titreLien: "Ministère du Travail — référentiel national qualité",
      titre: "Évolution du référentiel national qualité au 1er novembre 2026",
      date: "Novembre 2026",
      commentaire: "Le référentiel national qualité applicable aux organismes de formation évolue au 1er novembre 2026 ; suivi des indicateurs relatifs à l'analyse des besoins, au positionnement, à l'évaluation des acquis et à la satisfaction.",
      exploitation: "Preuve : note interne datée. Action : mise à jour de la procédure d'analyse des besoins et du QCM de positionnement de la formation.",
    },
    {
      lien: "https://agefiph.fr/",
      titreLien: "Agefiph — compensation du handicap en formation",
      titre: "Accueil des personnes en situation de handicap en formation",
      date: "Juillet 2026",
      commentaire: "Aménagements possibles : supports adaptés, adaptation des mises en situation techniques et de l'évaluation finale, rôle du référent handicap.",
      exploitation: "Preuve : question systématique dans l'analyse des besoins. Action : procédure d'adaptation appliquée aux ateliers d'accroche et de programmation.",
    },
  ],
  metier: [
    {
      lien: "https://www.afdas.com/",
      titreLien: "Afdas — opérateur de compétences de la culture",
      titre: "Financement de la formation des techniciens du spectacle",
      date: "Octobre 2026",
      commentaire: "L'Afdas accompagne les entreprises du spectacle et les intermittents du spectacle dans le financement de leurs formations : suivi des conditions de prise en charge et des priorités de la branche.",
      exploitation: "Preuve : fiche d'information remise lors de l'analyse des besoins. Action : vérification, avec chaque participant, de la voie de financement avant l'inscription.",
    },
    {
      lien: "https://www.inrs.fr/",
      titreLien: "INRS — prévention des risques professionnels",
      titre: "Travail en hauteur, risque électrique et manutention dans le spectacle",
      date: "Septembre 2026",
      commentaire: "Ressources de l'INRS sur le travail en hauteur, la manutention des charges et le risque électrique, utiles pour les ateliers d'accroche et la distribution électrique.",
      exploitation: "Preuve : sélection de ressources ajoutée aux supports du chapitre 2. Action : rappel des règles de prévention à chaque atelier d'accroche.",
    },
    {
      lien: "https://tsp.esta.org/",
      titreLien: "ESTA — Technical Standards Program",
      titre: "Normes DMX512, RDM et sACN",
      date: "Août 2026",
      commentaire: "Suivi des normes du spectacle publiées par l'ESTA : DMX512 (ANSI E1.11), RDM (ANSI E1.20) et sACN (ANSI E1.31), citées dans le chapitre 2.",
      exploitation: "Preuve : références vérifiées dans le support. Action : contrôle des références normatives lors de la mise à jour annuelle du support.",
    },
  ],
  technologique: [
    {
      lien: "https://www.malighting.com/",
      titreLien: "MA Lighting — grandMA3",
      titre: "Versions du logiciel grandMA3 et évolutions des fonctions",
      date: "Octobre 2026",
      commentaire: "Suivi des nouvelles versions du logiciel grandMA3 et de grandMA3 onPC : nouvelles fonctions, changements de comportement, compatibilité des show files entre versions.",
      exploitation: "Preuve : version du logiciel notée dans le support et dans la fiche d'archivage. Action : mise à jour des postes de formation hors session, après test du show file fil rouge.",
    },
    {
      lien: "https://art-net.org.uk/",
      titreLien: "Art-Net — spécification du protocole",
      titre: "Réseaux lumière : Art-Net et sACN",
      date: "Septembre 2026",
      commentaire: "Suivi de la spécification Art-Net et des usages réseau en régie lumière (nodes, switchs gérés, séparation des réseaux), en complément du sACN.",
      exploitation: "Preuve : schéma réseau type mis à jour dans le chapitre 2. Action : exercice réseau adapté aux équipements les plus courants chez les loueurs.",
    },
    {
      lien: "https://gdtf.eu/",
      titreLien: "GDTF — format ouvert de description des appareils",
      titre: "Bibliothèques d'appareils au format GDTF",
      date: "Août 2026",
      commentaire: "Le format GDTF décrit les appareils, leurs modes DMX et leur géométrie ; il est utilisé par le pupitre grandMA3 et par les visualiseurs. Suivi des profils publiés par les fabricants.",
      exploitation: "Preuve : procédure d'import des types d'appareils décrite dans le chapitre 3. Action : vérification des profils des appareils du parc de formation avant chaque session.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedGMA70AICaches(f: FormationInfo = FORMATION_GMA70): void {
  try {
    setCachedContentPack(f, GMA70_CONTENT_PACK);
    setCachedEvalPack(f, GMA70_EVAL_PACK);
    setCachedVeillePack(f, GMA70_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
