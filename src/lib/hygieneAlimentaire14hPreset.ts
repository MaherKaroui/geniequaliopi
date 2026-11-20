/**
 * Preset complet « Hygiène alimentaire en restauration commerciale – 14 h » — formation professionnelle NON
 * certifiante (aucun titre ni répertoire visé, non éligible au compte personnel de formation).
 * Formation spécifique en hygiène alimentaire adaptée à l'activité des établissements de restauration commerciale :
 * article L. 233-4 du code rural et de la pêche maritime, décret n° 2011-731 du 24 juin 2011, arrêté du 5 octobre 2011
 * relatif au cahier des charges de la formation (14 heures, référentiel de capacités en trois objectifs).
 * 14 heures sur 2 jours (7 h par jour, 9h00 – 12h30 / 13h30 – 17h00), à distance en classe virtuelle synchrone
 * (Google Meet / Zoom) avec le formateur en direct, espace e-learning complémentaire ; groupe de 1 à 12 participants ;
 * prérequis : lire et comprendre le français. Tarif : 140 € net de taxes par stagiaire.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - 4 modules de 3 h 30, compétences C1 à C6 ; fil rouge « Le Comptoir Gourmand », snack-restaurant FICTIF
 *    de 40 couverts avec vente à emporter (aucune adresse réelle)
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées et 6 QCM de 10 questions (un par compétence)
 *  - Pack évaluation : QCM de positionnement de début (10 questions, corrigé expliqué), QCM de fin (10 questions),
 *    cas pratique intermédiaire (fin du jour 1), évaluation finale interne (jour 2)
 *  - Pack veille (réglementaire / métier / technologique)
 * Évaluation interne uniquement : attestation de formation spécifique en hygiène alimentaire (modèle de l'arrêté du
 * 5 octobre 2011) et certificat de réalisation. L'attestation n'est reconnue que si l'organisme de formation est
 * enregistré auprès de la DRAAF de sa région (liste ROFHYA) : point à vérifier pour chaque organisme.
 * Le support de cours (6 chapitres) est dans `hygieneAlimentaire14h/` ; les réponses propres à chaque stagiaire
 * dans `hygieneAlimentaire14hHumanized.ts`. Aucune donnée de satisfaction n'est pré-remplie.
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
export const FORMATION_HYG14: FormationInfo = {
  intitule: "Hygiène alimentaire en restauration commerciale – 14 h",
  codeRNCP: "",
  objectifs:
    "Formation professionnelle non certifiante : formation spécifique en hygiène alimentaire adaptée à l'activité des établissements de restauration commerciale (article L. 233-4 du code rural et de la pêche maritime, décret n° 2011-731 du 24 juin 2011, cahier des charges fixé par l'arrêté du 5 octobre 2011). Objectif général : acquérir les capacités nécessaires pour organiser et gérer les activités de l'établissement dans des conditions d'hygiène conformes à la réglementation et permettant la satisfaction du client.\nÀ l'issue de la formation, le participant sera capable de :\n- C1 — Identifier les dangers (biologiques, chimiques, physiques, allergènes), expliquer comment les micro-organismes se multiplient et décrire les toxi-infections alimentaires collectives et leurs conséquences.\n- C2 — Repérer les principaux germes pathogènes et leurs toxines et relier chaque danger à une situation de cuisine.\n- C3 — Identifier les grands principes de la réglementation en hygiène alimentaire et les obligations de l'exploitant (paquet hygiène, températures, information sur les allergènes, déclaration, contrôles officiels, responsabilité).\n- C4 — Mettre en œuvre les bonnes pratiques d'hygiène en restauration commerciale (personnel, locaux, nettoyage-désinfection, nuisibles, réception, stockage, chaîne du froid et du chaud, allergènes).\n- C5 — Appliquer la méthode HACCP, la traçabilité et la gestion des non-conformités (retrait, rappel, enregistrements).\n- C6 — Construire le plan de maîtrise sanitaire de son établissement et un plan d'action pour préparer un contrôle officiel.",
  prerequis: "Lire et comprendre le français. Aucun diplôme n'est exigé. Disposer d'un ordinateur (ou d'une tablette) avec caméra, micro et connexion internet pour la classe virtuelle.",
  duree: "14 heures réparties sur 2 jours (7 h par jour : 9h00 – 12h30 et 13h30 – 17h00)",
  dureeSaisiePrioritaire: true,
  modalites: "distanciel",
  tarif: "140 € net de taxes par stagiaire",
  programme:
    "JOUR 1 — ALIMENTS, RISQUES ET RÉGLEMENTATION (7 h)\nModule 1 — Aliments et risques pour le consommateur (C1, C2, 3 h 30) : accueil, présentation du fil rouge « Le Comptoir Gourmand » (snack-restaurant fictif) et QCM de positionnement ; dangers biologiques, chimiques, physiques et allergènes ; multiplication des micro-organismes (température, temps, humidité, pH, oxygène) et zone de danger entre +4 °C et +63 °C ; principaux germes pathogènes (salmonelles, Listeria monocytogenes, Staphylococcus aureus, Clostridium perfringens, Clostridium botulinum, E. coli STEC, norovirus, Campylobacter, Bacillus cereus) et toxines ; toxi-infections alimentaires collectives et leurs conséquences sanitaires, juridiques et commerciales ; mises en situation et QCM.\nModule 2 — Les fondamentaux de la réglementation (C3, 3 h 30) : paquet hygiène (règlements (CE) n° 178/2002, 852/2004 et 853/2004), contrôles officiels (règlement (UE) 2017/625) et culture de la sécurité des denrées alimentaires (règlement (UE) 2021/382) ; arrêté du 21 décembre 2009 (températures) ; information sur les 14 allergènes (règlement (UE) n° 1169/2011 et décret n° 2015-447) ; obligation de formation (décret n° 2011-731) ; déclaration d'activité (Cerfa 13984), agrément sanitaire et dérogation ; contrôles officiels, Alim'confiance, sanctions et responsabilité de l'exploitant ; guide de bonnes pratiques d'hygiène (GBPH) du restaurateur ; cas pratique intermédiaire et QCM.\nJOUR 2 — MAÎTRISER L'HYGIÈNE DANS SON ÉTABLISSEMENT (7 h)\nModule 3 — Le plan de maîtrise sanitaire : bonnes pratiques d'hygiène (C4, 3 h 30) : retour sur le jour 1 ; méthode des 5 M ; hygiène du personnel (tenue, lavage des mains, état de santé) ; locaux et marche en avant ; plan de nettoyage-désinfection (produits, TACT) ; lutte contre les nuisibles ; eau ; réception et stockage (FIFO, FEFO, DLC, DDM) ; chaîne du froid et du chaud : +3 °C, +4 °C, -18 °C, +63 °C ; refroidissement rapide, remise en température, décongélation, déconditionnement ; gestion des allergènes en cuisine ; mises en situation et QCM.\nModule 4 — HACCP, traçabilité et plan d'action de l'établissement (C5, C6, 3 h 30) : les 7 principes et les 12 étapes de la méthode HACCP ; points critiques, limites, surveillance, actions correctives ; traçabilité, autocontrôles, enregistrements, gestion des non-conformités, retrait et rappel (RappelConso) ; construction du plan de maîtrise sanitaire du Comptoir Gourmand puis de son propre établissement ; préparation d'un contrôle officiel et plan d'action ; QCM ; évaluation finale des acquis ; bilan de la formation.",
  methodesEvaluation:
    "Positionnement en ouverture : QCM de positionnement de 10 questions (une seule bonne réponse chacune, corrigé et expliqué), comparé à l'évaluation finale pour mesurer la progression, et 10 questions ouvertes de positionnement ; 10 mises en situation corrigées sur le fil rouge du Comptoir Gourmand ; un QCM corrigé de 10 questions par compétence (C1 à C6) ; cas pratique intermédiaire en fin de jour 1 ; évaluation finale des acquis en fin de jour 2 (QCM, analyse de situations d'hygiène, plan HACCP simplifié, plan d'action pour son établissement) ; test de positionnement de fin. Évaluation à chaud (questionnaire de satisfaction en fin de formation) et évaluation à froid. Formation non certifiante : attestation de formation spécifique en hygiène alimentaire adaptée à l'activité des établissements de restauration commerciale, conforme au modèle de l'arrêté du 5 octobre 2011, et certificat de réalisation.",
  moyensPedagogiques:
    "Formation à distance en classe virtuelle synchrone (Google Meet ou Zoom), formateur en direct pendant les 14 heures, caméra et micro des participants actifs. Méthodes actives : apports courts illustrés, études de cas et mises en situation sur le fil rouge « Le Comptoir Gourmand » (snack-restaurant fictif de 40 couverts avec vente à emporter), analyses de photos et de documents d'hygiène, sondages et QCM corrigés en direct, travail en sous-groupes dans des salles virtuelles, tableau blanc collaboratif. Espace e-learning complémentaire : support de cours en 6 chapitres, fiches à retenir, modèles de documents du plan de maîtrise sanitaire (relevés de températures, plan de nettoyage, fiches de traçabilité, fiche de non-conformité), QCM et vidéos, accessibles avant, pendant et après les deux journées. Ressources officielles : textes sur Légifrance, guide de bonnes pratiques d'hygiène du restaurateur, Alim'confiance, RappelConso.",
  publicVise:
    "Exploitants, gérants, responsables et salariés d'établissements de restauration commerciale : restaurants traditionnels, restauration rapide, vente à emporter, snacking, food-trucks, cafés-brasseries, traiteurs, épiceries et supérettes disposant d'un rayon de préparation ou de restauration sur place, ainsi que les porteurs de projet de création ou de reprise d'un tel établissement. Groupe de 1 à 12 participants.",
  delaiAcces: "Inscription possible jusqu'à la veille de la session, sous réserve de places disponibles et de la signature de la convention ou du contrat de formation ; le lien de la classe virtuelle et les accès à l'espace e-learning sont envoyés avant le premier jour.",
  dateDebut: "2026-12-07",
  dateFin: "2026-12-08",
  lieu: "",
  nombreParticipants: "12",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Répondre à l'obligation de formation en hygiène alimentaire (décret n° 2011-731) avant une ouverture, une reprise ou un contrôle.",
  "Comprendre les dangers liés aux aliments et la façon dont les micro-organismes se multiplient dans une cuisine.",
  "Savoir relier les principaux germes pathogènes aux situations réelles de son établissement.",
  "Connaître les obligations de l'exploitant : déclaration, plan de maîtrise sanitaire, information sur les allergènes, contrôles officiels.",
  "Appliquer au quotidien les bonnes pratiques d'hygiène : tenue, lavage des mains, nettoyage-désinfection, marche en avant.",
  "Maîtriser les températures de réception, de stockage, de cuisson, de refroidissement et de remise en température.",
  "Gérer les 14 allergènes en cuisine et informer correctement les clients, y compris en vente à emporter.",
  "Comprendre et appliquer la méthode HACCP à ses propres recettes.",
  "Tenir les enregistrements, assurer la traçabilité et savoir réagir à une non-conformité ou à un rappel de produit.",
  "Construire le plan de maîtrise sanitaire de son établissement et préparer un contrôle officiel.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins est conduite avant la formation (questionnaire préalable et échange téléphonique avec chaque participant ou avec l'employeur) puis à l'ouverture de la classe virtuelle : QCM de positionnement de 10 questions sur les notions clés des deux jours (comparé à l'évaluation finale pour mesurer la progression), 10 questions ouvertes de positionnement, et tour de table sur le type d'établissement, le poste et l'expérience de chacun. Les participants viennent d'établissements très différents (restaurant traditionnel, restauration rapide, food-truck, café-brasserie, traiteur, épicerie avec rayon de préparation) et certains préparent une ouverture ou une reprise.</p>
<ul>
  <li><strong>Comprendre les risques (C1, C2)</strong> : les participants connaissent souvent les gestes d'hygiène sans en connaître les raisons ; la formation part des dangers et des germes pour donner du sens aux règles.</li>
  <li><strong>Connaître les obligations (C3)</strong> : déclaration d'activité, obligation de formation, information sur les allergènes, contrôles officiels et Alim'confiance sont les sujets qui inquiètent le plus les exploitants et les porteurs de projet.</li>
  <li><strong>Appliquer et prouver (C4, C5, C6)</strong> : bonnes pratiques, températures, méthode HACCP, traçabilité et plan de maîtrise sanitaire doivent être adaptés à la taille réelle de l'établissement et tenus dans la durée, avec des enregistrements simples.</li>
</ul>
<p>Le Comptoir Gourmand, snack-restaurant fictif de 40 couverts avec vente à emporter, sert de point de départ à chaque mise en situation, avant la transposition à l'établissement réel de chaque participant.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Type d'établissement</strong> : les exemples et les mises en situation sont choisis selon les activités représentées dans le groupe (cuisine sur place, vente à emporter, food-truck, rayon traiteur), et chaque participant transpose le plan de maîtrise sanitaire à son propre établissement.</li>
  <li><strong>Porteurs de projet</strong> : un temps est réservé aux démarches avant l'ouverture (déclaration d'activité, conception des locaux, marche en avant, choix des équipements de froid).</li>
  <li><strong>Classe virtuelle</strong> : test de connexion proposé avant le premier jour, pauses régulières, sondages et sous-groupes pour faire participer chacun ; le formateur vérifie la compréhension par des questions directes et des QCM corrigés en direct.</li>
  <li><strong>Maîtrise du français écrit</strong> : supports illustrés, vocabulaire technique expliqué, lecture des consignes à voix haute, réponses orales acceptées pendant les mises en situation.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, supports transmis à l'avance sur demande, sous-titres activables pendant la classe virtuelle, aménagement du temps de l'évaluation finale sur demande.</li>
</ul>`;

/** 10 mises en situation (C1 à C6) sur le fil rouge « Le Comptoir Gourmand » (fictif), corrigés formateur. */
export const HYG14_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — C1 : repérer les dangers d'une journée au Comptoir Gourmand",
    consigne:
      "Le Comptoir Gourmand (snack-restaurant fictif de 40 couverts avec vente à emporter) prépare chaque jour des burgers maison, des salades composées, un plat du jour en sauce et des desserts. 1. À partir de la description d'une matinée (livraison laissée vingt minutes sur le trottoir, commis qui coupe les crudités sur la planche ayant servi au poulet cru, bidon de dégraissant posé sur le plan de travail, agrafe trouvée dans un sachet de salade, client qui demande si le pesto contient des fruits à coque), classez chaque danger : biologique, chimique, physique ou allergène. 2. Pour chacun, indiquez la conséquence possible pour le client. 3. Expliquez ce qu'est une toxi-infection alimentaire collective, ou TIAC, et les conséquences qu'elle aurait pour l'établissement.",
    reponseAttendue:
      "Classement exact : livraison au soleil et planche de poulet cru = dangers biologiques (multiplication et contamination croisée) ; dégraissant sur le plan de travail = danger chimique ; agrafe = danger physique ; pesto = danger allergène (fruits à coque, éventuellement fromage donc lait).\nConséquences pour le client : intoxication ou infection alimentaire, intoxication chimique, blessure (bouche, dents), réaction allergique pouvant être grave.\nTIAC : apparition d'au moins deux cas groupés d'une symptomatologie similaire, en général digestive, dont on peut rapporter la cause à une même origine alimentaire ; déclaration obligatoire à l'autorité sanitaire.\nConséquences pour l'établissement : sanitaires (clients malades), juridiques (enquête, responsabilité de l'exploitant, mesures administratives pouvant aller jusqu'à la fermeture), commerciales (perte de clientèle et d'image).",
    points: 20,
  },
  {
    titre: "Exercice 2 — C1 : temps, température et multiplication des micro-organismes",
    consigne:
      "Un samedi, au Comptoir Gourmand, une grande salade de riz au poulet est préparée à 10 h et laissée sur le passe-plat jusqu'à 15 h pour la vente à emporter ; le bac de sauce du plat du jour refroidit toute la nuit sur le plan de travail, couvercle fermé. 1. Expliquez pourquoi ces deux situations sont dangereuses en citant les facteurs de multiplication des micro-organismes (température, temps, humidité, pH, oxygène). 2. Situez la zone de température dangereuse. 3. Expliquez ce que le froid et la cuisson font aux micro-organismes et ce qu'ils ne font pas. 4. Proposez pour chaque situation une organisation correcte.",
    reponseAttendue:
      "Facteurs : aliments humides, riches en nutriments, peu acides, laissés longtemps à une température favorable ; le temps passé dans la zone de danger permet une multiplication rapide ; le bac fermé et volumineux refroidit lentement.\nZone de danger : entre +4 °C et +63 °C environ, la multiplication étant la plus rapide autour de la température du corps humain.\nLe froid ralentit ou bloque la multiplication sans détruire tous les micro-organismes ; la cuisson à cœur détruit les formes végétatives de nombreuses bactéries mais pas forcément les spores ni certaines toxines déjà produites.\nOrganisation : salade conservée au froid à +3 °C et sortie par petites quantités, vitrine réfrigérée pour la vente à emporter ; sauce refroidie rapidement en cellule de refroidissement ou à défaut en petits contenants peu profonds, de +63 °C à +10 °C en moins de 2 heures, puis stockée au froid et étiquetée.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C2 : relier chaque germe à une situation de cuisine",
    consigne:
      "Associez chacun des germes suivants à la situation du Comptoir Gourmand qui l'illustre le mieux, puis donnez une mesure de prévention : Staphylococcus aureus, Clostridium perfringens, Listeria monocytogenes, Bacillus cereus, norovirus, salmonelles, E. coli STEC, Campylobacter, Clostridium botulinum. Situations : commis qui travaille avec une plaie infectée au doigt sans protection ; bœuf bourguignon préparé la veille en grande quantité et refroidi lentement ; saumon fumé gardé longtemps au réfrigérateur après ouverture ; riz cuit laissé à température ambiante ; salarié qui revient travailler malgré une gastro-entérite ; tiramisu maison aux œufs crus ; steak haché servi rosé à un enfant ; planche ayant servi à la volaille crue réutilisée pour les crudités ; conserves maison en bocaux mal stérilisées.",
    reponseAttendue:
      "Associations : Staphylococcus aureus = plaie infectée (porteur, toxine résistante à la chaleur) ; Clostridium perfringens = grande quantité de plat en sauce refroidie lentement ; Listeria monocytogenes = saumon fumé conservé longtemps au froid (germe capable de se multiplier au réfrigérateur) ; Bacillus cereus = riz cuit à température ambiante ; norovirus = salarié malade ; salmonelles = œufs crus ; E. coli STEC = steak haché insuffisamment cuit (risque grave chez l'enfant) ; Campylobacter = volaille crue et contamination croisée ; Clostridium botulinum = conserves mal stérilisées (milieu sans oxygène).\nPréventions adaptées : protection de la plaie (pansement et gant) ou écartement ; refroidissement rapide ; respect des dates après ouverture ; riz refroidi rapidement et conservé au froid ; écartement du salarié malade de la manipulation des denrées ; ovoproduits pasteurisés ou recettes adaptées ; cuisson à cœur suffisante de la viande hachée ; planches et ustensiles séparés, nettoyage-désinfection ; conserves réalisées selon un procédé maîtrisé ou achat de conserves du commerce.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C3 : les obligations de l'exploitant avant et après l'ouverture",
    consigne:
      "Sami, porteur de projet fictif, reprend le Comptoir Gourmand le mois prochain. 1. Listez les démarches et obligations réglementaires en hygiène alimentaire qu'il doit remplir avant l'ouverture et au quotidien. 2. Indiquez pour chacune le texte de référence ou l'organisme concerné. 3. Précisez qui, dans l'établissement, doit avoir suivi une formation en hygiène alimentaire et dans quels cas une personne en est dispensée. 4. Dites qui est responsable de la sécurité des aliments servis.",
    reponseAttendue:
      "Démarches : déclaration d'activité auprès de la DDPP ou de la DDETS-PP (Cerfa 13984), à mettre à jour en cas de changement d'exploitant ou d'activité ; vérification du besoin d'un agrément sanitaire ou d'une dérogation si une partie des préparations à base de produits d'origine animale est vendue à d'autres professionnels ; formation en hygiène alimentaire d'au moins une personne de l'effectif ; plan de maîtrise sanitaire (bonnes pratiques d'hygiène, procédures fondées sur les principes HACCP, traçabilité, gestion des non-conformités) ; information écrite des clients sur les 14 allergènes ; respect des températures (arrêté du 21 décembre 2009).\nTextes : paquet hygiène (règlements (CE) n° 178/2002, 852/2004, 853/2004), règlement (UE) n° 1169/2011 et décret n° 2015-447 pour les allergènes, décret n° 2011-731 et arrêté du 5 octobre 2011 pour la formation.\nDispense : personnes justifiant d'une expérience professionnelle d'au moins trois ans au sein d'une entreprise du secteur alimentaire comme gestionnaire ou exploitant, ou titulaires d'un diplôme figurant sur la liste fixée par arrêté.\nResponsabilité : l'exploitant du secteur alimentaire est responsable de la sécurité des denrées qu'il met sur le marché ; le GBPH du restaurateur l'aide à construire son plan de maîtrise sanitaire.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C3 : le contrôle officiel et Alim'confiance",
    consigne:
      "Un inspecteur de la DDPP se présente au Comptoir Gourmand un mardi à 11 h, sans prévenir. 1. Décrivez le déroulement probable du contrôle et les documents qui peuvent être demandés. 2. Expliquez ce qu'est Alim'confiance et les niveaux d'hygiène qui peuvent être publiés. 3. Indiquez les suites possibles si des manquements sont constatés. 4. Rédigez trois consignes à donner à l'équipe pour se préparer à un contrôle à tout moment.",
    reponseAttendue:
      "Déroulement : présentation de l'inspecteur, visite des locaux (stockage, cuisine, chambres froides, plonge, vestiaires), observation des pratiques, relevés de températures, examen des étiquettes et des dates, contrôle des documents (plan de maîtrise sanitaire, relevés de températures, plan de nettoyage, traçabilité, attestation de formation en hygiène alimentaire, information sur les allergènes), échange de fin de visite.\nAlim'confiance : publication des résultats des contrôles sanitaires officiels, consultable par le public, selon quatre niveaux : très satisfaisant, satisfaisant, à améliorer, à corriger de manière urgente.\nSuites : simple rappel ou avertissement, mise en demeure de corriger dans un délai fixé, mesures de police administrative pouvant aller jusqu'à la fermeture de l'établissement en cas de danger, procès-verbal et poursuites pénales selon la gravité.\nConsignes : tenir les enregistrements à jour chaque jour, garder les documents accessibles en un seul endroit, accueillir l'inspecteur et prévenir immédiatement le responsable.",
    points: 20,
  },
  {
    titre: "Exercice 6 — C4 : audit des bonnes pratiques d'hygiène pendant un service",
    consigne:
      "À partir de la description d'un service du midi au Comptoir Gourmand (cuisinier en tee-shirt sans coiffe, bijoux aux mains, lavage des mains seulement à l'eau, torchon utilisé pour s'essuyer et essuyer la vaisselle, cartons de livraison posés en cuisine, poubelle sans couvercle à pédale, traces de rongeurs derrière la réserve, produit désinfectant dilué « au jugé »), 1. classez les écarts selon la méthode des 5 M (main-d'œuvre, milieu, matériel, matières premières, méthodes) ; 2. proposez pour chacun la bonne pratique ; 3. décrivez le lavage des mains correct et les moments où il est obligatoire ; 4. expliquez le principe de la marche en avant et les quatre facteurs du nettoyage-désinfection (TACT).",
    reponseAttendue:
      "Classement 5 M cohérent : tenue, bijoux, lavage des mains = main-d'œuvre ; cartons en cuisine, poubelle, nuisibles = milieu ; torchon = matériel ; produits livrés = matières premières ; dilution au jugé = méthodes.\nBonnes pratiques : tenue propre réservée au travail, coiffe couvrant les cheveux, mains sans bijoux, essuie-mains à usage unique, déconditionnement des cartons dans une zone dédiée, poubelle à commande non manuelle, plan de lutte contre les nuisibles (prestataire ou procédure interne, pièges, relevés), dilution selon la fiche technique du produit.\nLavage des mains : eau, savon, frottage de toutes les surfaces (paumes, dos, entre les doigts, ongles, poignets), rinçage, séchage à usage unique ; à la prise de poste, après passage aux toilettes, après avoir manipulé des produits crus, des emballages, des déchets ou de l'argent, après s'être mouché, entre deux tâches différentes.\nMarche en avant : les denrées progressent du secteur sale vers le secteur propre sans croisement, dans l'espace ou dans le temps (avec nettoyage entre deux activités).\nTACT : température, action mécanique, concentration (chimie), temps de contact, à respecter selon la fiche du produit.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C4 : chaîne du froid, chaîne du chaud et allergènes en cuisine",
    consigne:
      "Complétez la fiche de températures du Comptoir Gourmand et répondez : 1. À quelles températures doivent être conservés les préparations culinaires élaborées à l'avance réfrigérées, les denrées très périssables, les produits surgelés, et à quelle température minimale les plats sont maintenus au chaud ? 2. Comment refroidir le plat du jour cuisiné en avance et comment le remettre en température ? 3. Comment décongeler les steaks hachés surgelés ? 4. Que faites-vous à la réception d'une livraison de crème fraîche à +9 °C ? 5. Comment organisez-vous la préparation d'un burger « sans gluten » demandé par un client allergique, et comment l'information allergènes est-elle donnée en vente à emporter ?",
    reponseAttendue:
      "Températures : préparations culinaires élaborées à l'avance réfrigérées à +3 °C au plus ; denrées très périssables à la température indiquée sur l'étiquette, le plus souvent +4 °C au plus ; surgelés à -18 °C ou moins ; maintien au chaud à +63 °C au moins.\nRefroidissement rapide de +63 °C à +10 °C en moins de 2 heures (cellule de refroidissement), puis stockage à +3 °C, étiquetage et date limite ; remise en température à +63 °C au moins en moins d'une heure, une seule fois.\nDécongélation au froid positif (chambre froide ou réfrigérateur), jamais à température ambiante, puis utilisation rapide sans recongélation.\nRéception : contrôle à réception, température non conforme, refus du produit ou mise à l'écart selon la procédure, fiche de non-conformité, information du fournisseur.\nAllergènes : vérification des fiches techniques et des étiquettes, nettoyage du poste et des ustensiles, préparation séparée, pain et ingrédients identifiés, emballage fermé et étiqueté ; information écrite sur les 14 allergènes disponible pour le client avant l'achat, y compris en vente à emporter ; en cas de doute, ne pas garantir l'absence d'un allergène.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C5 : appliquer la méthode HACCP au burger maison",
    consigne:
      "Pour le burger maison du Comptoir Gourmand (réception des steaks hachés, stockage, cuisson, assemblage avec crudités et sauce, vente sur place ou à emporter), 1. dessinez le diagramme de fabrication ; 2. réalisez l'analyse des dangers étape par étape ; 3. identifiez le ou les points critiques pour la maîtrise (CCP) ; 4. fixez pour chaque CCP une limite critique, une méthode de surveillance, une action corrective et l'enregistrement correspondant ; 5. rappelez les 7 principes de la méthode HACCP.",
    reponseAttendue:
      "Diagramme : réception, stockage au froid, cuisson, assemblage, maintien ou service, vente à emporter.\nAnalyse des dangers : biologiques (germes de la viande hachée, contamination croisée par les crudités, multiplication en cas de rupture de froid), chimiques (résidus de nettoyage), physiques (corps étrangers), allergènes (gluten du pain, œuf et moutarde de la sauce, sésame).\nCCP justifié : la cuisson à cœur de la viande hachée, seule étape qui élimine le danger biologique ; la réception et le stockage au froid sont maîtrisés par les bonnes pratiques ou traités comme points de vigilance selon l'analyse.\nCCP cuisson : limite critique de température à cœur définie dans le plan de maîtrise sanitaire (guide de bonnes pratiques ou fiche fournisseur), surveillance au thermomètre à sonde désinfectée, action corrective (poursuivre la cuisson jusqu'à la limite, sinon écarter le produit), enregistrement sur la fiche de cuisson.\n7 principes : analyser les dangers, déterminer les CCP, fixer les limites critiques, mettre en place la surveillance, définir les actions correctives, vérifier l'efficacité du système, documenter et enregistrer.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C5 : traçabilité, non-conformité et rappel de produit",
    consigne:
      "Un lundi matin, le gérant du Comptoir Gourmand apprend sur RappelConso qu'un lot de fromage râpé utilisé dans les salades fait l'objet d'un rappel. 1. Décrivez les actions à mener immédiatement. 2. Expliquez comment la traçabilité permet de retrouver le lot et les plats concernés. 3. Rédigez la fiche de non-conformité. 4. Indiquez les documents de traçabilité à conserver au quotidien.",
    reponseAttendue:
      "Actions immédiates : vérifier le numéro de lot et la date des produits en stock, retirer et isoler les produits concernés avec une identification « ne pas utiliser », retirer de la vente les préparations qui en contiennent, suivre les consignes du rappel et du fournisseur (retour ou destruction), informer l'équipe.\nTraçabilité : bons de livraison, étiquettes ou numéros de lot conservés, étiquetage des produits entamés et des préparations (nom, date de fabrication ou d'ouverture, date limite), permettent de relier le lot du fournisseur aux préparations et aux dates de service.\nFiche de non-conformité : date, produit et lot, origine de l'information, quantités retirées, actions menées, personne responsable, suites et vérification.\nDocuments à conserver : bons de livraison, étiquettes ou photos des étiquettes, fiches de réception, relevés de températures, enregistrements du plan de nettoyage, fiches de non-conformité ; si l'établissement découvre lui-même qu'un produit qu'il a mis sur le marché peut être dangereux, il doit le retirer et en informer l'autorité administrative.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C6 : plan de maîtrise sanitaire et plan d'action de son établissement",
    consigne:
      "1. Listez les éléments du plan de maîtrise sanitaire du Comptoir Gourmand (bonnes pratiques d'hygiène, procédures fondées sur les principes HACCP, traçabilité, gestion des non-conformités) et les documents et enregistrements correspondants. 2. Transposez à votre établissement : quels documents existent déjà, lesquels manquent ? 3. Rédigez un plan d'action de cinq actions prioritaires avec, pour chacune, le responsable, l'échéance et la preuve attendue. 4. Préparez la liste des documents à présenter lors d'un contrôle officiel.",
    reponseAttendue:
      "Éléments du plan de maîtrise sanitaire : personnel (tenue, formation, état de santé), locaux et équipements, plan de nettoyage-désinfection, lutte contre les nuisibles, eau, maîtrise des températures, réception et stockage, allergènes, analyse des dangers et CCP, traçabilité, procédure de retrait-rappel, gestion des non-conformités, autocontrôles et éventuelles analyses.\nDiagnostic de son établissement appuyé sur des faits (documents existants, enregistrements tenus ou non).\nPlan d'action : actions précises et réalisables, chacune avec un responsable, une échéance et une preuve (par exemple : relevés de températures quotidiens des enceintes froides, plan de nettoyage affiché et émargé, tableau des 14 allergènes par plat mis à jour à chaque changement de carte, attestation de formation en hygiène alimentaire classée, contrat ou procédure de lutte contre les nuisibles).\nDocuments pour un contrôle : déclaration d'activité, attestation de formation, plan de maîtrise sanitaire et ses enregistrements, documents de traçabilité, information allergènes, fiches de non-conformité.",
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// QCM par compétence (10 questions chacun)
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

const QCM_C1: Q[] = [
  ["Lequel de ces éléments est un danger physique ?", ["Une salmonelle", "Un résidu de produit de nettoyage", "Un éclat de verre", "Des arachides"], 2],
  ["Lequel de ces éléments est un danger chimique ?", ["Listeria monocytogenes", "Un résidu de désinfectant sur une planche mal rincée", "Un cheveu", "Un norovirus"], 1],
  ["Qu'appelle-t-on une toxi-infection alimentaire collective, ou TIAC ?", ["Un seul cas de troubles digestifs chez un client", "Au moins deux cas groupés de symptômes similaires, en général digestifs, dont la cause peut être rapportée à une même origine alimentaire", "Une intoxication par un produit ménager", "Une réaction allergique isolée"], 1],
  ["Dans quelle plage de température les bactéries pathogènes se multiplient-elles le plus facilement en cuisine ?", ["En dessous de -18 °C", "Au-dessus de +75 °C", "Entre +4 °C et +63 °C environ", "Uniquement autour de 0 °C"], 2],
  ["Que fait la congélation à -18 °C aux bactéries ?", ["Elle les détruit toutes", "Elle bloque leur multiplication sans toutes les détruire", "Elle détruit leurs toxines", "Elle permet de ne plus tenir compte des dates"], 1],
  ["Lequel de ces facteurs freine la multiplication des bactéries ?", ["Une humidité élevée", "Une température proche de +37 °C", "Une acidité marquée", "Un temps long à température ambiante"], 2],
  ["Vrai ou faux : un aliment contaminé par des bactéries pathogènes a toujours un aspect, une odeur ou un goût anormal.", VF, 1],
  ["Combien d'allergènes majeurs la réglementation européenne impose-t-elle de signaler au consommateur ?", ["14", "7", "10", "20"], 0],
  ["Laquelle de ces conséquences n'est pas une conséquence possible d'une TIAC pour un restaurant ?", ["Une enquête des services de contrôle", "Une fermeture administrative", "Une perte de clientèle et d'image", "Une réduction automatique de ses charges"], 3],
  ["Une cuisson à cœur suffisante permet surtout de :", ["Détruire les formes végétatives de nombreuses bactéries pathogènes", "Détruire toutes les toxines déjà produites", "Remplacer le lavage des mains", "Allonger la date limite du produit cru"], 0],
];

const QCM_C2: Q[] = [
  ["Quel germe est souvent porté par le nez, la gorge ou une plaie infectée des manipulateurs ?", ["Staphylococcus aureus", "Clostridium botulinum", "Campylobacter", "Listeria monocytogenes"], 0],
  ["Quel germe est capable de se multiplier aux températures de réfrigération ?", ["Clostridium perfringens", "Campylobacter", "Listeria monocytogenes", "Staphylococcus aureus"], 2],
  ["Un plat en sauce préparé en grande quantité et refroidi lentement fait surtout craindre :", ["Le norovirus", "Clostridium perfringens", "Campylobacter", "Listeria monocytogenes"], 1],
  ["Du riz cuit conservé plusieurs heures à température ambiante fait surtout craindre :", ["Les salmonelles", "Le norovirus", "E. coli STEC", "Bacillus cereus"], 3],
  ["Les œufs crus utilisés dans une mayonnaise ou un tiramisu maison font surtout craindre :", ["Les salmonelles", "Clostridium botulinum", "Bacillus cereus", "Listeria monocytogenes"], 0],
  ["Quel micro-organisme est un virus, transmis notamment par un salarié malade ou par des coquillages ?", ["Campylobacter", "Le norovirus", "Clostridium perfringens", "Staphylococcus aureus"], 1],
  ["Une planche ayant servi à découper de la volaille crue puis réutilisée pour des crudités fait surtout craindre :", ["Clostridium botulinum", "Bacillus cereus", "Campylobacter", "Le norovirus"], 2],
  ["Une viande hachée insuffisamment cuite, servie notamment à un enfant, fait surtout craindre :", ["Bacillus cereus", "Staphylococcus aureus", "Clostridium perfringens", "E. coli STEC"], 3],
  ["Des conserves ou bocaux maison mal stérilisés, sans oxygène, font surtout craindre :", ["Clostridium botulinum", "Campylobacter", "Le norovirus", "Les salmonelles"], 0],
  ["Vrai ou faux : la toxine produite par Staphylococcus aureus est détruite par un simple réchauffage du plat.", VF, 1],
];

const QCM_C3: Q[] = [
  ["À qui s'applique le « paquet hygiène » européen ?", ["Uniquement aux industriels", "À tous les exploitants du secteur alimentaire, restaurants compris", "Uniquement aux restaurants gastronomiques", "Uniquement à la restauration collective"], 1],
  ["Qui est responsable de la sécurité des denrées servies dans un restaurant ?", ["Le fournisseur seul", "L'inspecteur de la DDPP", "L'exploitant du secteur alimentaire", "Le client"], 2],
  ["Le règlement (CE) n° 852/2004 impose notamment aux exploitants :", ["De mettre en place des procédures fondées sur les principes HACCP", "D'obtenir une étoile au guide", "De faire analyser chaque plat servi", "De fermer une semaine par an"], 0],
  ["Selon le décret n° 2011-731, qui doit avoir suivi une formation en hygiène alimentaire dans un établissement de restauration commerciale ?", ["Tous les salariés sans exception", "Au moins une personne de l'effectif de l'établissement", "Uniquement les apprentis", "Personne si l'établissement a moins de dix salariés"], 1],
  ["Quelle est la durée de la formation spécifique en hygiène alimentaire fixée par le cahier des charges de l'arrêté du 5 octobre 2011 ?", ["7 heures", "21 heures", "14 heures", "35 heures"], 2],
  ["Quelle démarche un restaurant qui manipule des denrées d'origine animale doit-il faire avant d'ouvrir ?", ["Une déclaration d'activité (Cerfa 13984) auprès de la DDPP ou de la DDETS-PP", "Une simple déclaration à la mairie", "Aucune démarche sanitaire", "Une demande de label auprès de l'office de tourisme"], 0],
  ["Comment l'information sur les allergènes doit-elle être donnée pour les plats non préemballés ?", ["Elle n'est pas obligatoire", "Seulement à l'oral, si le client la demande", "Seulement pour l'arachide", "Par écrit, de façon accessible au client avant l'achat"], 3],
  ["Que publie le dispositif Alim'confiance ?", ["Les prix pratiqués par les restaurants", "Les avis des clients", "Les menus du jour", "Les résultats des contrôles sanitaires officiels"], 3],
  ["Depuis le 1er janvier 2024, sous quelle autorité est placée la police unique de la sécurité sanitaire des aliments ?", ["Le ministère chargé de l'agriculture", "Le ministère de la culture", "La mairie de la commune", "L'agence régionale de santé"], 0],
  ["Qu'est-ce que le guide de bonnes pratiques d'hygiène (GBPH) du restaurateur ?", ["Un texte pénal", "Un label payant", "Un guide validé par les pouvoirs publics, sur lequel l'exploitant peut s'appuyer pour construire son plan de maîtrise sanitaire", "Un logiciel de caisse"], 2],
];

const QCM_C4: Q[] = [
  ["À quelle température maximale conserve-t-on les préparations culinaires élaborées à l'avance réfrigérées ?", ["+3 °C", "+8 °C", "+10 °C", "+12 °C"], 0],
  ["À quelle température conserve-t-on les produits surgelés ?", ["-5 °C", "-18 °C ou moins", "0 °C", "+3 °C"], 1],
  ["À quelle température minimale maintient-on un plat chaud jusqu'au service ?", ["+40 °C", "+50 °C", "+63 °C", "+55 °C"], 2],
  ["Comment doit se faire le refroidissement rapide d'un plat cuisiné à l'avance ?", ["Toute la nuit sur le plan de travail", "En le passant de +63 °C à +10 °C en moins de 2 heures", "En le mettant directement au congélateur, couvercle fermé, en grand volume", "En le laissant tiédir jusqu'au lendemain"], 1],
  ["Comment doit se faire la remise en température d'un plat refroidi ?", ["À +40 °C en deux heures", "Plusieurs fois dans la journée", "À +63 °C au moins en moins d'une heure", "Au micro-ondes sans contrôle"], 2],
  ["Qu'est-ce que le principe de la marche en avant ?", ["Faire progresser les denrées du secteur sale vers le secteur propre sans croisement", "Servir les clients dans l'ordre d'arrivée", "Ranger les produits les plus récents devant", "Nettoyer la cuisine de l'entrée vers le fond"], 0],
  ["Que signifie la règle FEFO ?", ["Premier entré, dernier sorti", "Premier périmé, premier sorti", "Premier livré, premier jeté", "Premier cuit, premier servi"], 1],
  ["Que fait-on d'un produit dont la date limite de consommation est dépassée ?", ["On le sert dans la journée", "On le congèle pour le garder", "On ne l'utilise plus et on le retire", "On le cuit plus longtemps"], 2],
  ["Comment décongèle-t-on des steaks hachés surgelés ?", ["Au froid positif, en chambre froide ou au réfrigérateur", "Sur le plan de travail à température ambiante", "Dans de l'eau chaude", "Au soleil, près de la fenêtre"], 0],
  ["Un salarié atteint de gastro-entérite se présente au travail. Que faut-il faire ?", ["Le laisser travailler s'il se lave bien les mains", "Lui demander de porter un masque et de continuer", "Qu'il informe son responsable, qui l'écarte de la manipulation des denrées", "Le mettre à la plonge avec les ustensiles propres"], 2],
];

const QCM_C5: Q[] = [
  ["Que signifie HACCP ?", ["Analyse des dangers – points critiques pour leur maîtrise", "Hygiène alimentaire, contrôle et certificat de propreté", "Habilitation à la cuisine collective professionnelle", "Hygiène, accueil, cuisson, conservation, présentation"], 0],
  ["Combien la méthode HACCP compte-t-elle de principes ?", ["5", "7", "10", "12"], 1],
  ["Quel est le premier principe de la méthode HACCP ?", ["Rédiger les enregistrements", "Fixer les limites critiques", "Procéder à une analyse des dangers", "Choisir les fournisseurs"], 2],
  ["Qu'est-ce qu'un point critique pour la maîtrise (CCP) ?", ["Une étape où une mesure de maîtrise peut être appliquée et est essentielle pour prévenir ou éliminer un danger ou le ramener à un niveau acceptable", "Un point de la cuisine difficile à nettoyer", "Le moment le plus chargé du service", "Un contrôle de l'inspecteur"], 0],
  ["Lors de la surveillance d'un CCP cuisson, la température à cœur n'atteint pas la limite fixée. Quelle est l'action corrective adaptée ?", ["Servir le produit quand même", "Poursuivre la cuisson jusqu'à atteindre la limite, sinon écarter le produit, et enregistrer", "Noter une température conforme sur la fiche", "Mettre le produit au froid pour le lendemain"], 1],
  ["À quoi sert la traçabilité dans un restaurant ?", ["À fixer les prix", "À calculer les marges", "À retrouver l'origine et la destination des produits, par exemple en cas de rappel", "À organiser les plannings"], 2],
  ["Qu'est-ce que RappelConso ?", ["Le site officiel des rappels de produits", "Un guide de recettes", "Une application de réservation", "Un registre du personnel"], 0],
  ["Un produit faisant l'objet d'un rappel est encore en stock. Que faites-vous ?", ["Vous l'utilisez rapidement", "Vous le mélangez à d'autres produits", "Vous le retirez, l'isolez avec une mention « ne pas utiliser » et suivez les consignes du rappel", "Vous attendez la visite de l'inspecteur"], 2],
  ["Quel document n'est pas un enregistrement utile à la traçabilité ?", ["Un bon de livraison", "L'étiquette d'un produit entamé avec sa date d'ouverture", "Une fiche de réception", "Une affiche publicitaire du menu"], 3],
  ["Vrai ou faux : si un relevé de température n'a pas été enregistré, l'établissement ne peut pas prouver que ce contrôle a été fait.", VF, 0],
];

const QCM_C6: Q[] = [
  ["Que contient le plan de maîtrise sanitaire (PMS) d'un restaurant ?", ["Uniquement la carte des plats", "Les bonnes pratiques d'hygiène, les procédures fondées sur les principes HACCP, la traçabilité et la gestion des non-conformités", "Uniquement les contrats de travail", "Uniquement les factures fournisseurs"], 1],
  ["Lequel de ces documents ne fait pas partie du plan de maîtrise sanitaire ?", ["Le plan de nettoyage-désinfection", "Les relevés de températures", "Les fiches de traçabilité", "La carte de fidélité des clients"], 3],
  ["Qu'est-ce qu'un autocontrôle ?", ["Un contrôle réalisé par l'établissement lui-même pour vérifier qu'il maîtrise l'hygiène", "Un contrôle de l'inspecteur", "Un contrôle du client", "Un contrôle automatique de la caisse"], 0],
  ["Lors d'un contrôle officiel, que peut demander l'inspecteur ?", ["Uniquement le chiffre d'affaires", "Rien, il observe seulement", "Les documents du plan de maîtrise sanitaire et leurs enregistrements", "Le planning des congés"], 2],
  ["Comment rédiger une action efficace dans un plan d'action ?", ["« Faire attention à l'hygiène »", "Une action précise, avec un responsable, une échéance et une preuve attendue", "« Mieux nettoyer »", "Une action sans date pour garder de la souplesse"], 1],
  ["Comment l'exploitant prouve-t-il que l'obligation de formation en hygiène alimentaire est remplie ?", ["Par une déclaration orale", "Par l'attestation de formation conservée dans l'établissement, ou les justificatifs d'une dispense", "Par une photo de l'équipe", "Il n'a pas à le prouver"], 1],
  ["À quoi servent les analyses microbiologiques réalisées dans le cadre du plan de maîtrise sanitaire ?", ["À remplacer les bonnes pratiques d'hygiène", "À fixer les prix", "À vérifier l'efficacité des mesures d'hygiène mises en place", "À choisir les recettes"], 2],
  ["Que demande le règlement (UE) 2021/382 aux exploitants en matière de culture de la sécurité des denrées alimentaires ?", ["Un engagement de la direction et de tout le personnel en faveur de la sécurité des aliments", "Un concours de cuisine annuel", "Un affichage publicitaire", "Rien de particulier"], 0],
  ["Vrai ou faux : le plan de maîtrise sanitaire est un document rédigé une fois pour toutes, qui n'a pas à évoluer.", VF, 1],
  ["Un relevé montre une chambre froide à +8 °C ce matin. Quelle est la priorité du plan d'action ?", ["Attendre le prochain contrôle", "Changer la carte des plats", "Commander un nouveau logo", "Agir tout de suite : évaluer les denrées concernées, les transférer ou les écarter, faire réparer, enregistrer la non-conformité"], 3],
];

export const HYG14_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Dangers, multiplication des micro-organismes et TIAC", QCM_C1),
  qcmExercice("QCM C2 — Germes pathogènes et situations de cuisine", QCM_C2),
  qcmExercice("QCM C3 — Les fondamentaux de la réglementation", QCM_C3),
  qcmExercice("QCM C4 — Bonnes pratiques d'hygiène et températures", QCM_C4),
  qcmExercice("QCM C5 — HACCP, traçabilité et non-conformités", QCM_C5),
  qcmExercice("QCM C6 — Plan de maîtrise sanitaire et plan d'action", QCM_C6),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (C1 à C6), alignées sur les 10 questions de
 * positionnement et sur les copies de `hygieneAlimentaire14hHumanized.ts` ; les 6 QCM ensuite.
 */
export const HYG14_EXERCICES_COMPLETS: AIContentExercise[] = [...HYG14_EXERCICES, ...HYG14_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Hygiène alimentaire en restauration commerciale – 14 h » (6 chapitres, un par compétence C1 à C6)</strong> : cours détaillé, tableaux, exemples tirés du fil rouge du Comptoir Gourmand (snack-restaurant fictif), encadrés « À retenir », quiz corrigés et cas pratiques corrigés.</li>
  <li><strong>Espace e-learning complémentaire</strong> : support de cours, fiches à retenir, QCM et vidéos, accessibles avant, pendant et après les deux journées.</li>
  <li><strong>Modèles de documents du plan de maîtrise sanitaire</strong> : relevé de températures des enceintes froides, fiche de réception, fiche de cuisson et de refroidissement, plan de nettoyage-désinfection, tableau des 14 allergènes par plat, étiquette de produit entamé ou de préparation, fiche de non-conformité, procédure de retrait-rappel.</li>
  <li><strong>Fiches de travail des mises en situation</strong> : grille des 5 M, diagramme de fabrication, tableau d'analyse des dangers, plan d'action de l'établissement.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Classe virtuelle</strong> : Google Meet ou Zoom, avec partage d'écran, salles de sous-groupes, sondages et conversation écrite ; test de connexion proposé avant le premier jour.</li>
  <li><strong>Tableau blanc collaboratif</strong> pour les diagrammes de fabrication, les analyses de dangers et les plans d'action.</li>
  <li><strong>Espace e-learning</strong> de la formation (support, fiches, modèles, QCM, vidéos).</li>
  <li><strong>Matériel du participant</strong> : ordinateur ou tablette avec caméra, micro et connexion internet ; pour la transposition, photos ou documents de son propre établissement s'il le souhaite.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>Légifrance</strong> : <a href="https://www.legifrance.gouv.fr/">https://www.legifrance.gouv.fr/</a> — code rural et de la pêche maritime (article L. 233-4), décret n° 2011-731 du 24 juin 2011, arrêté du 5 octobre 2011, arrêté du 21 décembre 2009, décret n° 2015-447.</li>
  <li><strong>EUR-Lex</strong> : <a href="https://eur-lex.europa.eu/">https://eur-lex.europa.eu/</a> — règlements (CE) n° 178/2002, 852/2004, 853/2004, règlements (UE) 2017/625, 2021/382 et n° 1169/2011.</li>
  <li><strong>Ministère de l'Agriculture — alimentation</strong> : <a href="https://agriculture.gouv.fr/">https://agriculture.gouv.fr/</a> — hygiène alimentaire en restauration, guides de bonnes pratiques d'hygiène, formation spécifique et liste des organismes enregistrés auprès des DRAAF.</li>
  <li><strong>Mes démarches — ministère de l'Agriculture</strong> : <a href="https://mesdemarches.agriculture.gouv.fr/">https://mesdemarches.agriculture.gouv.fr/</a> — déclaration d'activité des établissements manipulant des denrées d'origine animale.</li>
  <li><strong>Alim'confiance</strong> : <a href="https://www.alim-confiance.gouv.fr/">https://www.alim-confiance.gouv.fr/</a> — résultats des contrôles sanitaires officiels.</li>
  <li><strong>RappelConso</strong> : <a href="https://rappel.conso.gouv.fr/">https://rappel.conso.gouv.fr/</a> — rappels de produits.</li>
  <li><strong>ANSES</strong> : <a href="https://www.anses.fr/">https://www.anses.fr/</a> — fiches de description des dangers biologiques transmissibles par les aliments.</li>
</ul>`;

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
export const HYG14_VIDEOS = [
  // Vidéos déjà référencées dans la banque « restauration » de courseContent.ts
  { title: "HACCP – Les 7 principes en restauration", description: "Comprendre la méthode HACCP et les 7 principes appliqués en restauration commerciale.", url: "https://www.youtube.com/watch?v=eEf5_T9Q4ZM" },
  { title: "Hygiène alimentaire en cuisine professionnelle", description: "Bonnes pratiques d'hygiène en cuisine : marche en avant, températures, nettoyage et désinfection.", url: "https://www.youtube.com/watch?v=DkaTrRlRrDk" },
  // Recherches YouTube ciblées (aucune vidéo précise imposée)
  { title: "Toxi-infections alimentaires collectives (TIAC)", description: "Définition, germes en cause, conséquences et prévention.", url: yt("toxi-infection alimentaire collective TIAC restauration") },
  { title: "La chaîne du froid en restauration", description: "Réception, stockage, températures des enceintes froides.", url: yt("chaîne du froid restauration températures") },
  { title: "Le lavage des mains en cuisine professionnelle", description: "Les étapes et les moments du lavage des mains.", url: yt("lavage des mains cuisine professionnelle") },
  { title: "Les 14 allergènes en restauration", description: "Information du consommateur et gestion des allergènes en cuisine.", url: yt("14 allergènes restauration information client") },
  { title: "Le plan de maîtrise sanitaire d'un restaurant", description: "Bonnes pratiques, HACCP, traçabilité et non-conformités.", url: yt("plan de maîtrise sanitaire restaurant") },
  { title: "Le contrôle sanitaire et Alim'confiance", description: "Déroulement d'un contrôle officiel et publication des résultats.", url: yt("Alim'confiance contrôle sanitaire restaurant") },
];

export const HYG14_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: HYG14_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: HYG14_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement de début (10 questions, corrigé expliqué) et QCM de fin (10 questions)
// ---------------------------------------------------------------------------
export const HYG14_POSITIONNEMENT_TITRE = "Positionnement — vos repères de départ en hygiène alimentaire";
export const HYG14_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Parmi ces dangers, lequel est un danger biologique ?", options: ["Un morceau de plastique", "Une bactérie comme la salmonelle", "Un résidu de produit vaisselle", "Une écharde de bois"], correctIndex: 1 },
  { question: "Dans quelle plage de température les bactéries se multiplient-elles le plus facilement ?", options: ["En dessous de -18 °C", "Entre +4 °C et +63 °C environ", "Au-dessus de +90 °C", "Exactement à 0 °C"], correctIndex: 1 },
  { question: "Quel germe peut se multiplier même au réfrigérateur ?", options: ["Listeria monocytogenes", "Le norovirus", "Clostridium botulinum", "Campylobacter"], correctIndex: 0 },
  { question: "Qui est responsable de la sécurité des aliments servis dans un restaurant ?", options: ["Le client", "Le fournisseur uniquement", "L'inspecteur sanitaire", "L'exploitant de l'établissement"], correctIndex: 3 },
  { question: "Combien d'allergènes majeurs doivent être signalés aux clients ?", options: ["4", "8", "14", "25"], correctIndex: 2 },
  { question: "Que signifie le principe de la « marche en avant » ?", options: ["Les denrées vont du secteur sale vers le secteur propre sans croisement", "On sert d'abord les clients pressés", "On range les produits neufs devant", "On avance les commandes du lendemain"], correctIndex: 0 },
  { question: "À quelle température minimale un plat doit-il être maintenu au chaud ?", options: ["+37 °C", "+50 °C", "+63 °C", "+45 °C"], correctIndex: 2 },
  { question: "Comment décongeler correctement un produit surgelé ?", options: ["Sur le plan de travail", "Dans un évier d'eau chaude", "À côté du four", "Au réfrigérateur ou en chambre froide positive"], correctIndex: 3 },
  { question: "Que désigne la méthode HACCP ?", options: ["Une méthode d'analyse des dangers et de maîtrise des points critiques", "Une marque de produits d'entretien", "Un diplôme de cuisinier", "Un logiciel de caisse"], correctIndex: 0 },
  { question: "Que doit faire un restaurant qui apprend qu'un produit en stock fait l'objet d'un rappel ?", options: ["L'utiliser rapidement avant la fin du rappel", "Le retirer, l'isoler et suivre les consignes du rappel", "Le congeler", "Le vendre à prix réduit"], correctIndex: 1 },
];

/** Explications du corrigé du positionnement, dans l'ordre des questions. */
export const HYG14_QCM_DEBUT_EXPLICATIONS: string[] = [
  "Les dangers biologiques sont les micro-organismes (bactéries, virus, parasites) et leurs toxines ; plastique et bois sont des dangers physiques, le produit vaisselle un danger chimique (module 1).",
  "Entre +4 °C et +63 °C environ, la plupart des bactéries pathogènes se multiplient ; c'est la zone de danger à traverser le plus vite possible (module 1).",
  "Listeria monocytogenes supporte le froid et peut se multiplier lentement au réfrigérateur : les dates après ouverture doivent être respectées (module 1).",
  "L'exploitant du secteur alimentaire est responsable de la sécurité des denrées qu'il met sur le marché ; l'inspecteur contrôle, il ne remplace pas l'exploitant (module 2).",
  "La réglementation européenne fixe une liste de 14 allergènes majeurs à signaler au consommateur, y compris pour les plats non préemballés (module 2).",
  "La marche en avant évite que le sale croise le propre, dans l'espace ou dans le temps avec un nettoyage entre deux activités (module 3).",
  "Le maintien au chaud se fait à +63 °C au moins jusqu'au service (module 3).",
  "La décongélation se fait au froid positif, jamais à température ambiante, pour que la surface du produit ne reste pas dans la zone de danger (module 3).",
  "HACCP : analyse des dangers – points critiques pour leur maîtrise ; c'est la base des procédures du plan de maîtrise sanitaire (module 4).",
  "Un produit rappelé est retiré, isolé et identifié, puis traité selon les consignes du rappel et du fournisseur ; la traçabilité permet de le retrouver (module 4).",
];

export const HYG14_QCM_FIN: AIQCMQuestion[] = [
  { question: "Une TIAC correspond à :", options: ["Au moins deux cas groupés de symptômes similaires, en général digestifs, rapportés à une même origine alimentaire", "Un client mécontent du service", "Une panne de chambre froide", "Une allergie isolée"], correctIndex: 0 },
  { question: "Quel germe associe-t-on à un plat en sauce préparé en grande quantité et refroidi lentement ?", options: ["Campylobacter", "Clostridium perfringens", "Le norovirus", "Listeria monocytogenes"], correctIndex: 1 },
  { question: "Pourquoi un manipulateur porteur d'une plaie infectée à la main présente-t-il un risque ?", options: ["Il ralentit le service", "Il peut transmettre Clostridium botulinum", "Il peut contaminer les aliments avec Staphylococcus aureus, dont la toxine résiste à la chaleur", "Il n'y a aucun risque s'il porte un tablier"], correctIndex: 2 },
  { question: "Quelle démarche administrative un restaurant manipulant des denrées d'origine animale doit-il faire avant d'ouvrir ?", options: ["Aucune", "Une déclaration à l'office de tourisme", "Une demande de label", "Une déclaration d'activité (Cerfa 13984) auprès de la DDPP ou de la DDETS-PP"], correctIndex: 3 },
  { question: "Quel niveau d'hygiène n'existe pas dans Alim'confiance ?", options: ["Très satisfaisant", "Satisfaisant", "À corriger de manière urgente", "Excellent avec mention"], correctIndex: 3 },
  { question: "Comment refroidir correctement un plat cuisiné à l'avance ?", options: ["De +63 °C à +10 °C en moins de 2 heures, puis stockage au froid", "Toute la nuit à température ambiante", "Au congélateur en grand volume, couvercle fermé", "En le laissant dans le four éteint"], correctIndex: 0 },
  { question: "Que signifient les quatre facteurs TACT du nettoyage-désinfection ?", options: ["Tenue, accueil, contrôle, traçabilité", "Température, action mécanique, concentration, temps de contact", "Tri, aération, cuisson, tranchage", "Temps, achat, coût, tarif"], correctIndex: 1 },
  { question: "Dans la méthode HACCP, que fait-on quand la limite critique d'un CCP n'est pas respectée ?", options: ["On l'ignore si le client est pressé", "On modifie l'enregistrement", "On applique l'action corrective prévue et on l'enregistre", "On attend la fin du service pour en parler"], correctIndex: 2 },
  { question: "Quel est le rôle principal de la traçabilité ?", options: ["Calculer le prix de revient", "Retrouver l'origine et la destination des produits, notamment en cas de retrait ou de rappel", "Organiser le planning des salariés", "Remplacer les relevés de températures"], correctIndex: 1 },
  { question: "Qu'est-ce qui caractérise un plan d'action efficace après un autocontrôle ?", options: ["Des intentions générales sans date", "Une liste de reproches", "Des actions précises avec un responsable, une échéance et une preuve attendue", "Une action unique : attendre le contrôle officiel"], correctIndex: 2 },
];

export const HYG14_EVAL_PACK: AIEvalPack = {
  qcmDebut: HYG14_QCM_DEBUT,
  qcmFin: HYG14_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du jour 1) — un vendredi difficile au Comptoir Gourmand, snack-restaurant fictif",
    contexte:
      "Vendredi soir, au Comptoir Gourmand, quatre clients qui ont commandé une salade de poulet à emporter le midi signalent des troubles digestifs. Le matin, la salade avait été préparée à 9 h avec du poulet cuit la veille et laissé refroidir sur le plan de travail ; la vitrine de vente à emporter était en panne depuis deux jours. Un commis, enrhumé, s'était coupé au doigt la veille. La carte ne mentionne pas les allergènes et l'établissement n'a jamais mis à jour sa déclaration d'activité depuis le changement de gérant.",
    questions: [
      { question: "S'agit-il d'une TIAC ? Justifiez et indiquez ce que l'établissement doit faire.", reponseAttendue: "Oui, a priori : au moins deux cas groupés de symptômes similaires, digestifs, rapportés à une même origine alimentaire (la salade de poulet). L'exploitant coopère avec les autorités, conserve les restes et les documents de traçabilité, retire le produit suspect, et la TIAC fait l'objet d'une déclaration obligatoire à l'autorité sanitaire.", points: 5 },
      { question: "Identifiez les dangers et les germes probables, en reliant chacun à un fait du cas.", reponseAttendue: "Danger biologique : poulet refroidi lentement (Clostridium perfringens possible, multiplication dans la zone de danger) ; vitrine en panne (multiplication, Listeria ou autres germes) ; commis coupé au doigt (Staphylococcus aureus) ; commis enrhumé (contamination par les mains). Danger allergène : absence d'information sur les allergènes.", points: 5 },
      { question: "Quels manquements réglementaires relevez-vous ?", reponseAttendue: "Refroidissement non maîtrisé (arrêté du 21 décembre 2009 : de +63 °C à +10 °C en moins de 2 heures) ; maintien au froid non assuré ; absence d'information écrite sur les 14 allergènes (règlement (UE) n° 1169/2011, décret n° 2015-447) ; déclaration d'activité non mise à jour après le changement d'exploitant ; bonnes pratiques d'hygiène du personnel non respectées.", points: 5 },
      { question: "Quelles conséquences pour l'établissement et quelles premières mesures correctives proposez-vous ?", reponseAttendue: "Conséquences : enquête et contrôle, mesures administratives possibles jusqu'à la fermeture, responsabilité de l'exploitant, publication d'un niveau d'hygiène défavorable, perte de clientèle. Mesures : réparer la vitrine ou suspendre la vente à emporter de produits froids, refroidissement rapide en petits contenants ou cellule, protection de la plaie et gestion de l'état de santé du personnel, tableau des allergènes, mise à jour de la déclaration d'activité.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — QCM des acquis, analyse de situations, plan HACCP simplifié et plan d'action (jour 2), grille d'acquisition des compétences C1 à C6",
    exercices: [
      {
        titre: "Partie 1 — QCM des acquis sur les deux jours (C1 à C6, 20 minutes)",
        consigne: "Répondez individuellement aux 10 questions du QCM de fin (TIAC, germes, réglementation, Alim'confiance, températures, nettoyage-désinfection, HACCP, traçabilité, plan d'action). Correction commentée en classe virtuelle.",
        reponseAttendue: "Réponses attendues : TIAC = au moins deux cas groupés de même origine alimentaire ; Clostridium perfringens pour un grand volume refroidi lentement ; Staphylococcus aureus et sa toxine résistante à la chaleur ; déclaration d'activité Cerfa 13984 ; quatre niveaux Alim'confiance ; refroidissement de +63 °C à +10 °C en moins de 2 heures ; TACT ; action corrective enregistrée ; rôle de la traçabilité ; action précise, responsable, échéance, preuve.",
        points: 20,
      },
      {
        titre: "Partie 2 — Analyse de photos et de situations d'hygiène (C1, C2, C4)",
        consigne: "À partir de six photos ou descriptions du Comptoir Gourmand (fictif) : chambre froide, plan de travail, tenue du personnel, étiquetage des préparations, poubelles, vitrine de vente à emporter, repérez les écarts, nommez le danger et le germe éventuellement en cause, et proposez la bonne pratique.",
        reponseAttendue: "Écarts correctement repérés et classés (5 M) ; dangers nommés (biologique, chimique, physique, allergène) ; germes reliés à bon escient ; bonnes pratiques précises (températures, étiquetage avec date, séparation cru et cuit, tenue, lavage des mains, nettoyage-désinfection, gestion des déchets).",
        points: 20,
      },
      {
        titre: "Partie 3 — Obligations réglementaires et contrôle officiel (C3)",
        consigne: "Pour un établissement de restauration commerciale de votre choix, listez les obligations de l'exploitant en hygiène alimentaire et les documents à présenter lors d'un contrôle officiel ; expliquez les suites possibles d'un contrôle défavorable.",
        reponseAttendue: "Paquet hygiène et responsabilité de l'exploitant ; déclaration d'activité ; formation d'au moins une personne de l'effectif (ou dispense justifiée) ; plan de maîtrise sanitaire et enregistrements ; information écrite sur les 14 allergènes ; températures réglementaires ; documents présentés ; suites graduées (avertissement, mise en demeure, mesures administratives jusqu'à la fermeture, poursuites) ; publication Alim'confiance.",
        points: 20,
      },
      {
        titre: "Partie 4 — Plan HACCP simplifié d'une préparation (C5)",
        consigne: "Pour une préparation de votre établissement (ou le plat du jour en sauce du Comptoir Gourmand cuisiné la veille), établissez le diagramme de fabrication, l'analyse des dangers, les CCP avec leur limite, leur surveillance, l'action corrective et l'enregistrement.",
        reponseAttendue: "Diagramme complet ; dangers identifiés à chaque étape ; CCP justifiés (cuisson, refroidissement rapide, remise en température selon la préparation) ; limites réglementaires ou issues du GBPH ; surveillance par thermomètre et enregistrement ; actions correctives réalistes ; lien avec la traçabilité.",
        points: 20,
      },
      {
        titre: "Partie 5 — Plan d'action de son établissement (C6)",
        consigne: "Rédigez le plan d'action de votre établissement : cinq actions prioritaires pour compléter le plan de maîtrise sanitaire et se préparer à un contrôle officiel, avec pour chacune le responsable, l'échéance et la preuve attendue.",
        reponseAttendue: "Diagnostic appuyé sur des faits ; cinq actions précises et réalisables ; un responsable, une échéance et une preuve pour chacune ; priorité donnée aux points qui présentent un danger immédiat (températures, état de santé du personnel, allergènes) ; prise en compte des documents à présenter lors d'un contrôle.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const HYG14_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — code rural et de la pêche maritime, article L. 233-4 ; décret n° 2011-731 du 24 juin 2011 ; arrêté du 5 octobre 2011",
      titre: "Formation spécifique en hygiène alimentaire en restauration commerciale",
      date: "Novembre 2026",
      commentaire: "Les établissements de restauration commerciale doivent compter dans leur effectif au moins une personne formée en hygiène alimentaire ; le cahier des charges fixe une durée de 14 heures et un référentiel de capacités. L'attestation remise n'est reconnue que si l'organisme de formation est enregistré auprès de la DRAAF de sa région et figure sur la liste nationale des organismes enregistrés (ROFHYA) : cet enregistrement doit être vérifié et tenu à jour avant toute session.",
      exploitation: "Preuve : copie du récépissé d'enregistrement DRAAF classée au dossier qualité, ou démarche d'enregistrement engagée. Action : vérification annuelle du programme et du modèle d'attestation au regard du cahier des charges de l'arrêté du 5 octobre 2011.",
    },
    {
      lien: "https://eur-lex.europa.eu/",
      titreLien: "EUR-Lex — règlement (UE) 2021/382",
      titre: "Culture de la sécurité des denrées alimentaires, allergènes et redistribution des denrées",
      date: "Octobre 2026",
      commentaire: "Le règlement (UE) 2021/382 modifie les annexes du règlement (CE) n° 852/2004 : obligation d'une culture de la sécurité des denrées alimentaires portée par la direction et le personnel, prévention des contaminations croisées par les allergènes, conditions de redistribution des denrées.",
      exploitation: "Preuve : chapitre 3 du support mis à jour. Action : la culture de la sécurité des aliments et la gestion des allergènes en cuisine sont intégrées au plan de maîtrise sanitaire construit en module 4.",
    },
    {
      lien: "https://agriculture.gouv.fr/",
      titreLien: "Ministère de l'Agriculture — police sanitaire unique de la sécurité des aliments",
      titre: "Police unique de la sécurité sanitaire des aliments depuis le 1er janvier 2024",
      date: "Septembre 2026",
      commentaire: "Depuis le 1er janvier 2024, les contrôles de sécurité sanitaire des aliments sont placés sous l'autorité unique du ministère chargé de l'agriculture ; les contrôles en restauration commerciale restent réalisés par les services départementaux (DDPP ou DDETS-PP).",
      exploitation: "Preuve : fiche mémo datée. Action : mise à jour du chapitre 3 (acteurs du contrôle officiel) et de la mise en situation sur le contrôle.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — décret n° 2015-447 du 17 avril 2015",
      titre: "Information des consommateurs sur les allergènes des denrées non préemballées",
      date: "Août 2026",
      commentaire: "L'information sur les 14 allergènes de l'annexe II du règlement (UE) n° 1169/2011 est obligatoire pour les denrées non préemballées, par écrit, de façon accessible au consommateur avant l'achat, y compris en vente à emporter.",
      exploitation: "Preuve : modèle de tableau des allergènes par plat intégré aux ressources. Action : mise en situation sur les allergènes en vente à emporter vérifiée à chaque session.",
    },
  ],
  metier: [
    {
      lien: "https://www.alim-confiance.gouv.fr/",
      titreLien: "Alim'confiance — résultats des contrôles sanitaires",
      titre: "Publication des résultats des contrôles officiels en restauration",
      date: "Octobre 2026",
      commentaire: "Les résultats des contrôles sanitaires officiels sont publiés selon quatre niveaux d'hygiène (très satisfaisant, satisfaisant, à améliorer, à corriger de manière urgente) : un enjeu d'image pour les établissements, utilisé pour motiver les participants.",
      exploitation: "Preuve : capture commentée utilisée dans le module 2. Action : exercice de lecture d'une fiche Alim'confiance ajouté à la mise en situation sur le contrôle officiel.",
    },
    {
      lien: "https://rappel.conso.gouv.fr/",
      titreLien: "RappelConso — rappels de produits",
      titre: "Rappels de produits alimentaires et réaction de l'établissement",
      date: "Novembre 2026",
      commentaire: "Le site officiel RappelConso recense les rappels de produits ; les restaurateurs doivent savoir retrouver un lot grâce à leur traçabilité et appliquer les consignes de retrait.",
      exploitation: "Preuve : exemples récents de rappels utilisés dans la mise en situation 9. Action : conseil donné aux participants de consulter régulièrement RappelConso et de conserver les étiquettes des produits.",
    },
    {
      lien: "https://agriculture.gouv.fr/",
      titreLien: "Ministère de l'Agriculture — guides de bonnes pratiques d'hygiène",
      titre: "Guide de bonnes pratiques d'hygiène et d'application des principes HACCP du restaurateur",
      date: "Septembre 2026",
      commentaire: "Les guides de bonnes pratiques d'hygiène validés par les pouvoirs publics sont la référence pratique pour construire le plan de maîtrise sanitaire d'un restaurant ; le guide du restaurateur est présenté et utilisé en modules 3 et 4.",
      exploitation: "Preuve : références du guide citées dans le support. Action : contrôle de la version en vigueur du guide lors de la mise à jour annuelle du support.",
    },
    {
      lien: "https://www.anses.fr/",
      titreLien: "ANSES — fiches de description de dangers biologiques transmissibles par les aliments",
      titre: "Connaissances sur les germes pathogènes d'origine alimentaire",
      date: "Juillet 2026",
      commentaire: "Les fiches de l'ANSES décrivent les principaux dangers biologiques (salmonelles, Listeria monocytogenes, Staphylococcus aureus, Clostridium perfringens, Bacillus cereus, norovirus…) : source utilisée pour le chapitre 2 du support.",
      exploitation: "Preuve : sources citées dans le chapitre 2. Action : relecture des fiches germes lors de la mise à jour annuelle.",
    },
  ],
  technologique: [
    {
      lien: "https://agriculture.gouv.fr/",
      titreLien: "Ministère de l'Agriculture — plan de maîtrise sanitaire",
      titre: "Enregistrements numériques et thermomètres connectés dans le plan de maîtrise sanitaire",
      date: "Octobre 2026",
      commentaire: "De nombreux établissements remplacent les fiches papier par des applications de suivi (relevés de températures, plan de nettoyage, traçabilité par photo des étiquettes) et des sondes connectées : l'enregistrement reste exigé, quel que soit le support, et doit pouvoir être présenté lors d'un contrôle.",
      exploitation: "Preuve : comparatif papier ou numérique présenté en module 4. Action : les modèles de documents sont proposés en version papier et en tableur.",
    },
    {
      lien: "https://www.inrs.fr/",
      titreLien: "INRS — produits chimiques et nettoyage",
      titre: "Produits de nettoyage-désinfection : efficacité et sécurité du personnel",
      date: "Août 2026",
      commentaire: "Le choix et l'usage des produits de nettoyage-désinfection (dilution, temps de contact, rinçage) conditionnent à la fois leur efficacité et la sécurité des salariés ; les fiches techniques et de données de sécurité doivent être disponibles.",
      exploitation: "Preuve : paragraphe ajouté au chapitre 4 sur le plan de nettoyage. Action : rappel du principe TACT et des fiches produits dans la mise en situation 6.",
    },
    {
      lien: "https://www.cnil.fr/fr/reglement-europeen-protection-donnees",
      titreLien: "CNIL — RGPD",
      titre: "Données personnelles en classe virtuelle et dans l'espace e-learning",
      date: "Septembre 2026",
      commentaire: "Enregistrements de séance éventuels, résultats des QCM et documents transmis par les participants contiennent des données personnelles : information des participants, finalité pédagogique, conservation limitée.",
      exploitation: "Preuve : mention d'information ajoutée à la convocation. Action : pas d'enregistrement de la classe virtuelle sans accord des participants ; résultats individuels communiqués au seul participant et au formateur.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedHYG14AICaches(f: FormationInfo = FORMATION_HYG14): void {
  try {
    setCachedContentPack(f, HYG14_CONTENT_PACK);
    setCachedEvalPack(f, HYG14_EVAL_PACK);
    setCachedVeillePack(f, HYG14_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
