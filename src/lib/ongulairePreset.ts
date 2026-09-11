/**
 * Preset complet "Techniques de prothésie ongulaire" — RS7302 (Répertoire spécifique).
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - Formation 63 h — 9 jours (7 h/jour)
 *  - AUCUN stagiaire pré-importé (les stagiaires sont saisis librement)
 *  - Pack contenu (analyse des besoins, 10 exercices pratiques corrigés, ressources + vidéos)
 *  - Pack évaluation (QCM début/fin 10 Q, cas pratique intermédiaire 4 Q, 5 MSP finales)
 *  - Pack veille (réglementaire / métier / technologique)
 * Le référentiel de compétences C1 à C10 est repris du référentiel de certification.
 */
import type { FormationInfo } from "@/types/qualiopi";
import type { AIContentPack } from "./aiContentPack";
import type { AIEvalPack, AIQCMQuestion } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";

// ---------------------------------------------------------------------------
// Formation
// ---------------------------------------------------------------------------
export const FORMATION_ONGULAIRE: FormationInfo = {
  intitule: "Techniques de prothésie ongulaire (RS7302)",
  codeRNCP: "RS7302",
  objectifs:
    "Préparer la certification « Techniques de prothésie ongulaire » enregistrée au Répertoire spécifique sous le code RS7302.\nÀ l'issue de la formation, le/la stagiaire sera capable de :\n- Accueillir la cliente, recueillir ses attentes, examiner l'état des ongles naturels, repérer les contre-indications et valider la faisabilité de la prestation (C1).\n- Préparer et agencer l'espace de travail en choisissant les produits adaptés, y compris pour une personne en situation de handicap (C2).\n- Appliquer le protocole d'hygiène et de sécurité : désinfection, stérilisation, EPI, conformité des produits cosmétiques (C3).\n- Préparer l'ongle naturel : cuticules, bord libre, matification, dépoussiérage (C4).\n- Réaliser une extension par capsule ou par chablon (C5).\n- Construire la prothésie ongulaire : primer, base, gel de construction, apex, limage, finition (C6).\n- Réaliser une décoration : vernis semi-permanent, French, Babyboomer, effets et nail art 3D (C7).\n- Maîtriser le cycle complet de remplissage (C8).\n- Finaliser le soin par l'huile à cuticules et le modelage hydratant des mains (C9).\n- Conseiller et informer la cliente sur les soins post-prestation (C10).",
  prerequis:
    "Aucun diplôme exigé. Formation ouverte aux professionnels de l'esthétique comme aux personnes novices. Maîtrise du français lu et écrit (lecture d'une fiche technique et d'une fiche de données de sécurité), dextérité manuelle et absence d'allergie connue aux résines acryliques. Un modèle vivant est requis pour les journées de pratique.",
  duree: "63 heures réparties sur 9 jours (7 h/jour, dont 70 % de pratique sur modèle vivant)",
  modalites: "présentiel",
  tarif: "1 890 € net de taxe (éligible CPF, OPCO, France Travail ou financement personnel)",
  programme:
    "MODULE 1 — LE MÉTIER, L'ONGLE ET LA CERTIFICATION (7 h)\nJour 1 : le métier de prothésiste ongulaire et ses débouchés, présentation de la certification RS7302 et des compétences C1 à C10, anatomie et physiologie de l'ongle, pousse et cycle de renouvellement, pathologies et contre-indications (mycose, onycholyse, périonyxis, psoriasis unguéal), conduite à tenir et orientation médicale.\n\nMODULE 2 — ACCUEIL, DIAGNOSTIC ET FICHE CLIENTE (7 h)\nJour 2 : trame d'accueil et posture professionnelle, questionnement sur les habitudes et les attentes (forme, longueur, couleur, décoration), examen des ongles naturels, validation de la faisabilité, fiche diagnostique, information sur les étapes et le prix, accueil d'une personne en situation de handicap et adaptations concrètes.\n\nMODULE 3 — HYGIÈNE, SÉCURITÉ ET POSTE DE TRAVAIL (7 h)\nJour 3 : agencement du poste et ergonomie, protocole de désinfection avant et après prestation, stérilisation en autoclave et bac à ultrasons, normes NF EN des produits, EPI (masque, gants, lunettes), prévention du risque allergique aux (méth)acrylates, aspiration des poussières, réglementation cosmétique européenne, vérification des dates de péremption et de l'usure des outils.\n\nMODULE 4 — PRÉPARATION DE L'ONGLE ET EXTENSION (14 h)\nJour 4 : repoussage des cuticules, retrait du ptérygion, limage du bord libre, matification complète, dépoussiérage et déshydratation.\nJour 5 : pose de capsules (choix de la taille, positionnement, découpe, fondu du raccord) et pose de chablons (ajustement, alignement, absence d'espace sous le bord libre).\n\nMODULE 5 — CONSTRUCTION DE LA PROTHÉSIE (14 h)\nJour 6 : primer / nail prep, gel de base, gel de construction, création de l'apex, contrôle de profil et de dessus, limage de mise en forme, gel de finition et catalyse.\nJour 7 : correction des défauts de construction (apex mal placé, épaisseur irrégulière, débordement sur les cuticules), structure russe, adaptation aux ongles rongés ou très fins.\n\nMODULE 6 — DÉCORATION ET REMPLISSAGE (7 h)\nJour 8 : vernis semi-permanent sans traces, tracé de French, Babyboomer, effets (sucré, marbre, chrome, sirène, aérographe), nail art 3D et bijoux ; cycle complet de remplissage dans l'ordre imposé, traitement des décollements, dépose.\n\nÉVALUATION ET FINITION (7 h)\nJour 9 : finalisation du soin (huile à cuticules, modelage hydratant), conseils post-prestation et contre-indications, puis évaluation finale : mise en situation sur modèle vivant de l'accueil à la prestation complète (M1) et questionnaire « Techniques de prothésie ongulaire » (M2).",
  methodesEvaluation:
    "Évaluation des besoins et test de positionnement à l'entrée (10 questions ouvertes + QCM 10 questions), exercices pratiques quotidiens sur modèle vivant avec grille d'observation et corrigé formateur, cas pratique intermédiaire au jour 5, test de positionnement de fin (10 questions ouvertes + QCM 10 questions), évaluation finale au jour 9 conforme aux modalités du référentiel : M1 — mise en situation sur un modèle vivant allant de l'accueil à la réalisation de la prestation, M2 — questionnaire « Techniques de prothésie ongulaire ». Attestation de fin de formation, questionnaires de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Salle équipée de postes individuels de prothésie ongulaire (tables, lampes de travail, repose-mains, aspirateurs de poussière), lampes LED/UV, ponceuses professionnelles et jeux d'embouts, autoclave et bac à ultrasons, gammes complètes de gels (base, construction, finition), acrygel, primer et nail prep, capsules et chablons, vernis semi-permanents, pigments et accessoires de nail art, EPI fournis (masques, gants, lunettes), modèles vivants pour la pratique quotidienne, photothèque de pathologies unguéales et de défauts de construction, fiches techniques et fiches de données de sécurité des produits, supports de cours numériques et plateforme LMS.",
  publicVise:
    "Esthéticiennes, socio-esthéticiennes, coiffeuses, maquilleuses et professionnels du bien-être souhaitant ajouter la prestation ongulaire à leur offre ; personnes novices en reconversion souhaitant exercer en institut, en bar à ongles ou à leur compte ; salariés de salons de beauté, spas et parfumeries.",
  delaiAcces: "Inscription possible jusqu'à 14 jours ouvrés avant le démarrage de la session, sous réserve de places disponibles.",
  dateDebut: "",
  dateFin: "",
  lieu: "",
  nombreParticipants: "8",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Acquérir un protocole d'hygiène et de stérilisation irréprochable, condition première de l'exercice du métier.",
  "Savoir repérer une contre-indication (mycose, onycholyse, périonyxis) et refuser une pose de façon argumentée.",
  "Maîtriser la préparation de l'ongle naturel : cuticules, matification complète, dépoussiérage.",
  "Réussir une extension propre par capsule et par chablon, sans marche ni décalage d'axe.",
  "Construire un apex régulier et bien placé, principale cause de casse quand il est raté.",
  "Réaliser un vernis semi-permanent sans traces et une French au sourire net et symétrique.",
  "Maîtriser le cycle de remplissage dans l'ordre imposé et traiter correctement les décollements.",
  "Conduire un accueil structuré : questionnement, examen des ongles, fiche diagnostique, annonce du prix.",
  "Adapter la prestation à une cliente en situation de handicap.",
  "Se prémunir du risque allergique aux (méth)acrylates et travailler dans une posture ergonomique durable.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins conduite à l'entrée fait apparaître un groupe hétérogène : une partie des stagiaires vient de l'esthétique et maîtrise déjà l'accueil et l'hygiène de base, une autre découvre entièrement le métier. Trois besoins sont toutefois partagés par la quasi-totalité du groupe.</p>
<ul>
  <li><strong>La construction de l'apex</strong> : le bombé est mal situé ou irrégulier, ce qui explique la majorité des casses et des décollements constatés dans les pratiques antérieures.</li>
  <li><strong>Le protocole d'hygiène complet</strong> : la désinfection est souvent connue, la stérilisation des outils et la traçabilité le sont beaucoup moins.</li>
  <li><strong>Le diagnostic et le refus argumenté</strong> : peu de stagiaires savent nommer une contre-indication et l'expliquer à une cliente sans la braquer.</li>
</ul>
<p>Les stagiaires déjà en poste expriment en complément un besoin de rapidité d'exécution ; les stagiaires novices expriment un besoin de sécurisation du geste et de vocabulaire technique.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Stagiaires novices</strong> : fiches de vocabulaire illustrées remises au jour 1, démonstration systématique avant chaque geste, objectifs intermédiaires fractionnés, entraînement sur main d'entraînement avant le passage sur modèle vivant.</li>
  <li><strong>Stagiaires déjà en poste</strong> : travail chronométré à partir du jour 6, correction ciblée des habitudes à risque (limage dans la zone matricielle, recouvrement d'un décollement), rôle de binôme-ressource auprès des novices.</li>
  <li><strong>Difficultés de geste fin</strong> : repose-poignet, fractionnement des séquences de construction, temps supplémentaire accordé sans réduction du niveau d'exigence.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au jour 1, supports disponibles en gros caractères et fortement contrastés, poste réglable en hauteur, ventilation renforcée pour les personnes sensibles aux odeurs.</li>
  <li><strong>Sécurité individuelle</strong> : vérification à l'entrée de l'absence d'allergie connue aux acrylates ; en cas de doute, port de gants nitrile renforcé et poste placé sous aspiration directe.</li>
</ul>`;

export const ONGULAIRE_EXERCICES = [
  {
    titre: "Jour 2 — Exercice 1 : conduire un accueil et remplir une fiche diagnostique",
    consigne:
      "Sur votre modèle, conduisez l'accueil complet : questionnement, examen des dix ongles, validation de la faisabilité, annonce du déroulé et du prix. Vous remettez la fiche diagnostique renseignée.",
    reponseAttendue:
      "1. Posture d'accueil : sourire, présentation, invitation à se laver les mains, installation de la cliente et annonce du déroulé.\n2. Questionnement : habitudes (poses antérieures, technique, entretien), attentes (forme, longueur, couleur, décoration, occasion), mode de vie (métier manuel, sport, eau, produits ménagers), antécédents (allergies, décollements répétés, mycose traitée), situation de handicap éventuelle.\n3. Examen des dix ongles à la lumière : couleur, épaisseur, solidité, souplesse, état des cuticules et des replis, stries, taches, décollements, fissures.\n4. Validation de la faisabilité : l'ongle est-il sain, assez solide, et la demande est-elle réalisable sur ce support ? À défaut, proposition d'une alternative (longueur intermédiaire, reconstruction progressive) ou report avec orientation médicale.\n5. Information exhaustive avant de commencer : étapes, durée réelle, prix de la pose, prix du remplissage, fréquence d'entretien de 3 à 4 semaines, coût d'une dépose.\n6. Fiche diagnostique renseignée : date, identité, état des ongles, contre-indications, technique retenue, produits et références, forme et longueur, décoration, durée, prix, conseils remis, date de remplissage conseillée.",
    points: 20,
  },
  {
    titre: "Jour 3 — Exercice 2 : protocole d'hygiène et de stérilisation du poste",
    consigne:
      "Décrivez puis exécutez le protocole d'hygiène complet, avant et après prestation. Vous justifierez le choix de chaque produit et le sort réservé à chaque outil.",
    reponseAttendue:
      "Avant la prestation : nettoyage puis désinfection du plan de travail, de la lampe LED, de la ponceuse et du repose-main avec un produit bactéricide, fongicide et virucide aux normes NF EN ; lavage des mains de la professionnelle 1 minute à l'eau et au savon antiseptique, puis 30 secondes de solution hydroalcoolique ; désinfection des mains de la cliente ; port du masque et des gants ; vérification de l'état d'usure des outils et des dates de péremption des produits ; contrôle de la conformité cosmétique (étiquetage, INCI, numéro de lot, responsable de mise sur le marché).\nPendant : aspiration des poussières, aucun contact du gel non polymérisé avec la peau, ventilation.\nAprès : élimination des consommables à usage unique (limes carton, buffers, cotons, bâtonnets), nettoyage du périmètre (sol, poubelle fermée), stérilisation des outils métalliques en autoclave ou bac à ultrasons suivi d'un trempage désinfectant, séchage et stockage en pochette fermée, désinfection des embouts de ponceuse entre chaque cliente.\nJustification : la barrière cuticulaire est ouverte pendant la prestation ; toute contamination croisée expose à une mycose ou à un panaris, et engage la responsabilité de la professionnelle.",
    points: 15,
  },
  {
    titre: "Jour 3 — Exercice 3 : identifier une contre-indication et formuler un refus",
    consigne:
      "À partir de la photothèque de pathologies unguéales, classez dix cas en « pose possible », « pose à reporter » ou « pose interdite ». Pour chacun, rédigez la phrase que vous direz à la cliente.",
    reponseAttendue:
      "Pose interdite : onychomycose (ongle épaissi, jauni, friable, décollé), onycholyse (décollement de la tablette), périonyxis ou panaris (rougeur, chaleur, gonflement, pus), allergie connue aux acrylates, plaie ouverte du pourtour.\nPose à reporter ou à adapter : ongle très fin, rongé ou traumatisé, psoriasis unguéal et lichen (avis médical requis), verrue péri-unguéale.\nPose possible : ongle sain, même court ou strié, cuticules simplement débordantes.\nFormulation type : « Je préfère être honnête avec vous : là, l'ongle est décollé de son lit. Si je pose du gel dessus, j'enferme de l'humidité et je risque d'aggraver la situation. Je vous propose de voir un médecin, et je vous reprends dès que c'est cicatrisé — je vous note le rendez-vous. »\nRègle : jamais de refus sec ni de diagnostic médical ; on nomme ce que l'on observe, on explique la conséquence concrète, on propose une suite.",
    points: 15,
  },
  {
    titre: "Jour 4 — Exercice 4 : préparation complète de l'ongle naturel",
    consigne:
      "Réalisez la préparation des dix ongles de votre modèle. Le formateur contrôlera la matification, l'état des cuticules et l'absence d'agression de la tablette.",
    reponseAttendue:
      "Ramollir puis repousser les cuticules au repousse-cuticules ou au bâtonnet de buis, sans jamais couper ; retirer le ptérygion adhérent au pousse-cuticules ou à la ponceuse avec un embout adapté et une vitesse maîtrisée, sans entamer la matrice ; raccourcir le bord libre à la lime grain 180-240 en un mouvement d'un seul sens ; matifier toute la surface au buffer jusqu'à disparition complète de la brillance, y compris le long des replis latéraux et à la base ; dépoussiérer à la brosse ; déshydrater au cleaner.\nContrôles : aucune zone brillante résiduelle (chaque zone brillante deviendra un décollement), aucune douleur ni échauffement, tablette non amincie, contour propre et sec.",
    points: 15,
  },
  {
    titre: "Jour 5 — Exercice 5 : pose de capsules sur cinq doigts",
    consigne:
      "Posez cinq capsules en respectant le choix de taille, l'axe et la découpe. Vous justifierez chaque choix de taille.",
    reponseAttendue:
      "Choix de la taille : la capsule couvre la largeur de l'ongle d'un repli latéral à l'autre, sans les chevaucher ; si aucune taille ne convient exactement, prendre la taille au-dessus et limer les côtés.\nPose : petite quantité de colle dans le creux de la capsule, positionnement droit dans l'axe du doigt, appui au niveau du stop puis bascule progressive pour chasser les bulles, maintien quelques secondes.\nFinition : découpe au coupe-capsule à la longueur souhaitée, limage de la forme demandée, puis fondu du raccord par limage ou ponçage doux pour supprimer la marche entre capsule et ongle naturel.\nDéfauts à éviter : capsule trop étroite (décollement latéral), chevauchement des replis (douleur et inflammation), bulle d'air (point de casse), axe dévié (l'ongle « part » sur le côté).",
    points: 15,
  },
  {
    titre: "Jour 5 — Exercice 6 : pose de chablons et contrôle de l'alignement",
    consigne:
      "Posez cinq chablons et faites contrôler l'alignement avant toute application de produit.",
    reponseAttendue:
      "Ajuster la découpe du chablon à la courbure du doigt, le glisser sous le bord libre sans laisser d'espace, coller les languettes en serrant la forme voulue.\nDeux contrôles impératifs avant de construire : vu de dessus, la ligne centrale du chablon prolonge exactement l'axe du doigt ; vu de profil, le chablon prolonge la ligne du bord libre sans plonger ni remonter.\nUn chablon mal posé donne un ongle qui plonge ou qui remonte : on le repositionne avant de construire, jamais après.\nAvantage du chablon : longueur libre, architecture sur mesure, résultat plus fin et plus naturel qu'une capsule, pas de surépaisseur au raccord.",
    points: 15,
  },
  {
    titre: "Jour 6 — Exercice 7 : construction complète et création de l'apex",
    consigne:
      "Construisez la prothésie sur cinq doigts. Vous ferez valider l'apex de profil et de dessus avant la finition.",
    reponseAttendue:
      "Primer ou nail prep en fine couche sur l'ongle naturel, séchage à l'air libre. Gel de base en couche fine, sans toucher cuticules ni replis, catalyse 60 secondes. Gel de construction déposé en une ou deux gouttes travaillées à la spatule : quantité maîtrisée, aucun débordement.\nApex : point le plus épais de l'ongle, situé à la zone de stress, régulier, centré dans l'axe. Vue de profil, la ligne forme une courbe continue sans marche ni creux ; vue de dessus, la ligne centrale est droite et l'épaisseur est symétrique de part et d'autre.\nPuis limage de mise en forme (grain 100/180), dépoussiérage, gel de finition en couche moyenne, catalyse 2 × 60 secondes, retrait de la couche collante au cleaner.\nDéfauts corrigés en séance : apex trop proche de la cuticule (casse à la zone de stress), épaisseur irrégulière, gel touchant les cuticules (décollement et risque allergique).",
    points: 20,
  },
  {
    titre: "Jour 8 — Exercice 8 : vernis semi-permanent et tracé de French",
    consigne:
      "Réalisez un semi-permanent sur une main et une French sur l'autre. Le formateur contrôlera l'absence de traces et la symétrie des sourires.",
    reponseAttendue:
      "Semi-permanent : couches fines et régulières, deux passages, capsulage systématique du bord libre, aucun débordement sur les cuticules, catalyse respectée entre chaque couche, absence de traces et de raclage, résultat lisse et net.\nFrench : sourire net, régulier et identique sur les dix doigts, tracé au pinceau liner ou construit en gel dès la phase d'architecture ; les deux pointes du sourire sont à la même hauteur et alignées sur les replis latéraux.\nContrôles : symétrie d'un doigt à l'autre, brillance homogène, contours propres, absence de bulle.",
    points: 15,
  },
  {
    titre: "Jour 8 — Exercice 9 : cycle complet de remplissage",
    consigne:
      "Réalisez un remplissage sur une main déjà appareillée. Vous énoncerez les étapes dans l'ordre avant de commencer.",
    reponseAttendue:
      "Ordre imposé : désinfecter → préparer → limer → poncer → déposer l'ancienne couleur → préparer et reconstruire → remplir → catalyser → modeler et limer → nettoyer → finir.\nPoints techniques : grain de lime et embout de ponceuse adaptés, vitesse ajustée, mouvements restreints à la zone concernée, retrait complet de l'ancienne couleur mais conservation d'une fine couche de gel (l'ongle naturel n'est jamais remis à nu), repoussage des cuticules ayant poussé depuis la pose, dépoussiérage soigné, reconstruction d'un nouvel apex, respect strict des temps de catalyse, couche de finition adaptée.\nDécollements : limer jusqu'au gel sain ; ne jamais recouvrir un décollement, l'humidité emprisonnée est la première cause de mycose sous prothèse.",
    points: 20,
  },
  {
    titre: "Jour 9 — Exercice 10 : finition du soin et conseils post-prestation",
    consigne:
      "Finalisez la prestation et délivrez les conseils à votre modèle. Vous rédigerez la fiche de conseils remise à la cliente.",
    reponseAttendue:
      "Finition : une goutte d'huile à cuticules par doigt, sans débordement, massage circulaire du contour ; modelage hydratant des mains à la crème, homogène, du poignet vers les doigts ; contrôle final devant la cliente (symétrie des dix doigts, brillance, absence de poussière, contours propres, mains nettoyées).\nConseils remis : porter des gants pour les produits ménagers ; appliquer l'huile à cuticules quotidiennement ; ne pas utiliser les ongles comme outil ; ne jamais arracher ni limer soi-même un gel qui se décolle ; revenir en cas de décollement, de douleur, de rougeur ou d'odeur ; prévoir le remplissage à 3-4 semaines ; ne jamais tenter une dépose maison, la dépose se fait en institut.\nContre-indications rappelées : pas de pose sur un ongle abîmé, laisser respirer un ongle fragilisé, consulter un médecin en cas de suspicion de mycose.\nLe discours doit être clair, sans jargon, et repris par écrit sur la fiche remise.",
    points: 15,
  },
];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours numérique « Techniques de prothésie ongulaire » (6 chapitres)</strong> : métier et certification RS7302, anatomie de l'ongle, accueil et diagnostic, hygiène et sécurité, préparation et extension, construction, décoration et remplissage, finition et conseils.</li>
  <li><strong>Référentiel de certification RS7302</strong> : compétences C1 à C10, modalités M1 (mise en situation sur modèle vivant) et M2 (questionnaire), critères d'évaluation Cr1 à Cr10.</li>
  <li><strong>Fiche diagnostique cliente</strong> (trame vierge + exemple renseigné) et <strong>fiche de conseils post-prestation</strong> à remettre.</li>
  <li><strong>Photothèque</strong> : 40 pathologies unguéales commentées et 25 défauts de construction (apex mal placé, décollement, débordement cuticule, bulle, sourire asymétrique).</li>
  <li><strong>Grilles d'auto-contrôle</strong> : préparation de l'ongle, pose de capsule, pose de chablon, construction et apex, remplissage.</li>
  <li><strong>Fiches techniques et fiches de données de sécurité</strong> des gels, primers, colles et cleaners utilisés en salle.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Poste individuel</strong> : table de manucure, lampe de travail à lumière du jour, repose-main, aspirateur de poussière ou tapis aspirant.</li>
  <li><strong>Catalyse</strong> : lampe LED/UV 48 W par stagiaire.</li>
  <li><strong>Ponçage et limage</strong> : ponceuse professionnelle avec variateur, jeu d'embouts (céramique, carbure, cône, boule sécurité), limes 100/180 et 180/240, buffers, blocs polissoirs.</li>
  <li><strong>Stérilisation</strong> : autoclave, bac à ultrasons, produits désinfectants aux normes NF EN, pochettes de stockage.</li>
  <li><strong>Produits</strong> : nail prep et primer sans acide, gels de base, de construction et de finition, acrygel, colle à capsules, cleaner, vernis semi-permanents, pigments, chromes, décors 3D, huile à cuticules, crème hydratante.</li>
  <li><strong>Consommables et EPI</strong> : capsules toutes tailles, chablons papier et métal, cotons non pelucheux, bâtonnets de buis, masques FFP2, gants nitrile, lunettes de protection.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>France Compétences — fiche RS7302</strong> : <a href="https://www.francecompetences.fr/recherche/rs/7302/">https://www.francecompetences.fr/recherche/rs/7302/</a> — compétences, modalités et critères d'évaluation officiels.</li>
  <li><strong>Règlement (CE) n° 1223/2009 sur les produits cosmétiques</strong> (Légifrance / EUR-Lex) : obligations d'étiquetage, INCI, numéro de lot, responsable de mise sur le marché.</li>
  <li><strong>ANSM</strong> : <a href="https://ansm.sante.fr/">https://ansm.sante.fr/</a> — alertes et retraits de produits cosmétiques, sécurité des résines et des lampes UV.</li>
  <li><strong>INRS</strong> : <a href="https://www.inrs.fr/">https://www.inrs.fr/</a> — prévention des allergies professionnelles aux (méth)acrylates, ventilation et aspiration des poussières, troubles musculo-squelettiques des métiers de l'esthétique.</li>
  <li><strong>Société Française de Dermatologie</strong> : fiches grand public sur les mycoses et pathologies de l'ongle, utilisées pour la reconnaissance des contre-indications.</li>
  <li><strong>Convention collective nationale de l'esthétique-cosmétique</strong> (IDCC 3032) : classification, obligations de formation, hygiène des lieux recevant du public.</li>
</ul>`;

const ONGULAIRE_VIDEOS = [
  { title: "Anatomie de l'ongle expliquée simplement", description: "Matrice, lit, tablette, cuticules : les repères indispensables avant toute pose.", url: "https://www.youtube.com/results?search_query=anatomie+de+l%27ongle+proth%C3%A9siste+ongulaire" },
  { title: "Préparation de l'ongle naturel étape par étape", description: "Repoussage des cuticules, retrait du ptérygion, matification et dépoussiérage.", url: "https://www.youtube.com/results?search_query=pr%C3%A9paration+ongle+naturel+avant+pose+gel" },
  { title: "Pose de capsules : choix de la taille et fondu du raccord", description: "Éviter le chevauchement des replis, la bulle d'air et la marche au raccord.", url: "https://www.youtube.com/results?search_query=pose+capsule+ongle+tutoriel+fran%C3%A7ais" },
  { title: "Pose de chablon et contrôle de l'alignement", description: "Positionnement sous le bord libre, contrôle de profil et de dessus.", url: "https://www.youtube.com/results?search_query=pose+chablon+ongle+gel+tutoriel" },
  { title: "Construire un apex correct", description: "Placement, épaisseur, symétrie : la clé de la solidité de l'extension.", url: "https://www.youtube.com/results?search_query=apex+ongle+gel+construction+tutoriel" },
  { title: "Vernis semi-permanent sans traces", description: "Couches fines, capsulage du bord libre, catalyse et finition.", url: "https://www.youtube.com/results?search_query=vernis+semi+permanent+sans+traces+tutoriel" },
  { title: "Tracer une French parfaite", description: "Sourire net et symétrique au pinceau liner ou en construction gel.", url: "https://www.youtube.com/results?search_query=french+manucure+gel+tracer+sourire" },
  { title: "Babyboomer : le dégradé sans démarcation", description: "Technique à l'éponge et au pinceau estompeur.", url: "https://www.youtube.com/results?search_query=babyboomer+ongle+tutoriel+d%C3%A9grad%C3%A9" },
  { title: "Remplissage : le cycle complet dans l'ordre", description: "Dépose de la couleur, limage, reconstruction de l'apex, finition.", url: "https://www.youtube.com/results?search_query=remplissage+ongle+gel+tutoriel+complet" },
  { title: "Hygiène et stérilisation en prothésie ongulaire", description: "Désinfection du poste, autoclave, bac à ultrasons, usage unique.", url: "https://www.youtube.com/results?search_query=hygi%C3%A8ne+st%C3%A9rilisation+proth%C3%A9sie+ongulaire" },
  { title: "Reconnaître une mycose et les contre-indications", description: "Ce qui interdit la pose et comment l'expliquer à la cliente.", url: "https://www.youtube.com/results?search_query=mycose+ongle+contre+indication+pose+gel" },
];

export const ONGULAIRE_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: ONGULAIRE_EXERCICES,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: ONGULAIRE_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation
// ---------------------------------------------------------------------------
const QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Où se situe la matrice de l'ongle ?", options: ["Sous le bord libre", "Sous le repli sus-unguéal, à la base de l'ongle", "Au centre de la tablette", "Dans le lit de l'ongle"], correctIndex: 1 },
  { question: "À quelle vitesse pousse un ongle de la main en moyenne ?", options: ["Environ 3 mm par mois", "Environ 1 cm par mois", "Environ 3 mm par semaine", "Environ 1 mm par an"], correctIndex: 0 },
  { question: "Que faut-il faire face à un ongle jauni, épaissi et friable ?", options: ["Poser du gel pour le cacher", "Poncer davantage avant la pose", "Refuser la pose et orienter vers un médecin", "Appliquer un primer supplémentaire"], correctIndex: 2 },
  { question: "Que fait-on des cuticules lors de la préparation ?", options: ["On les coupe systématiquement", "On les repousse sans les couper", "On les laisse telles quelles", "On les lime à la ponceuse rapide"], correctIndex: 1 },
  { question: "Pourquoi matifie-t-on toute la surface de l'ongle ?", options: ["Pour l'éclaircir", "Pour l'amincir", "Pour garantir l'adhérence du produit", "Pour supprimer les stries"], correctIndex: 2 },
  { question: "Quelle règle s'applique au choix d'une capsule ?", options: ["Elle doit chevaucher les replis latéraux", "Elle doit être plus étroite que l'ongle", "Elle doit couvrir la largeur d'un repli à l'autre sans les chevaucher", "La taille n'a pas d'importance"], correctIndex: 2 },
  { question: "Qu'est-ce que l'apex ?", options: ["Le bord libre de l'ongle", "Le point le plus épais de la construction", "La cuticule", "La couche collante du gel"], correctIndex: 1 },
  { question: "Quel équipement stérilise réellement les outils métalliques ?", options: ["Un chiffon imbibé d'alcool", "L'autoclave ou le bac à ultrasons suivi d'un désinfectant", "Le passage sous la lampe UV", "Un rinçage à l'eau chaude"], correctIndex: 1 },
  { question: "Quel risque principal les (méth)acrylates font-ils courir à la professionnelle ?", options: ["Un risque de brûlure thermique", "Un risque d'allergie de contact définitive", "Un risque d'électrocution", "Aucun risque connu"], correctIndex: 1 },
  { question: "À quelle fréquence conseille-t-on un remplissage ?", options: ["Toutes les semaines", "Toutes les 3 à 4 semaines", "Tous les 3 mois", "Uniquement en cas de casse"], correctIndex: 1 },
];

const QCM_FIN: AIQCMQuestion[] = [
  { question: "Un décollement est constaté lors d'un remplissage. Que faites-vous ?", options: ["Je recouvre avec du gel neuf", "Je lime jusqu'au gel sain avant de reconstruire", "Je pose une capsule par-dessus", "Je remets du primer sur le décollement"], correctIndex: 1 },
  { question: "Quel est l'ordre correct du remplissage ?", options: ["Limer, désinfecter, remplir, préparer", "Désinfecter, préparer, limer, poncer, dépose, reconstruction, remplissage, catalyse, modelage, nettoyage, finition", "Dépose, finition, remplissage, désinfection", "Poncer, remplir, désinfecter, catalyser"], correctIndex: 1 },
  { question: "Lors d'un remplissage, jusqu'où lime-t-on l'ancien gel ?", options: ["Jusqu'à remettre l'ongle naturel à nu", "On laisse une fine couche de gel sain", "On laisse toute l'épaisseur d'origine", "On ne lime pas l'ancien gel"], correctIndex: 1 },
  { question: "Le gel touche la cuticule pendant la construction. Quelle est la conséquence ?", options: ["Aucune, cela renforce la tenue", "Décollement et risque de réaction allergique", "Une meilleure brillance", "Une catalyse plus rapide"], correctIndex: 1 },
  { question: "Un apex placé trop près de la cuticule provoque :", options: ["Une meilleure résistance", "Une casse à la zone de stress", "Un séchage plus rapide", "Un meilleur rendu du sourire"], correctIndex: 1 },
  { question: "Combien de temps catalyse-t-on le gel de finition selon le protocole vu en formation ?", options: ["10 secondes", "30 secondes une seule fois", "2 × 60 secondes", "5 minutes"], correctIndex: 2 },
  { question: "Quelle affirmation sur la French est exacte ?", options: ["Le sourire peut varier d'un doigt à l'autre", "Les deux pointes du sourire sont à la même hauteur et alignées sur les replis", "Le sourire se trace toujours après la finition", "La French ne se capsule pas"], correctIndex: 1 },
  { question: "Quelle est la conduite à tenir devant une onycholyse ?", options: ["Poser en renforçant le primer", "Reporter la pose, l'ongle doit d'abord se ressouder", "Poser un chablon plutôt qu'une capsule", "Limer la zone décollée puis poser"], correctIndex: 1 },
  { question: "Que remet-on à la cliente en fin de prestation ?", options: ["Rien, les conseils sont oraux", "Une fiche de conseils post-prestation et la date de remplissage", "Uniquement la facture", "La fiche de données de sécurité du gel"], correctIndex: 1 },
  { question: "Une cliente en fauteuil roulant se présente. Que faites-vous ?", options: ["Je refuse, le poste n'est pas adapté", "J'adapte la hauteur du plan de travail et l'espace d'accès avec elle", "Je la fais patienter jusqu'à un créneau spécial", "Je réalise une prestation allégée sans lui demander son avis"], correctIndex: 1 },
];

export const ONGULAIRE_EVAL_PACK: AIEvalPack = {
  qcmDebut: QCM_DEBUT,
  qcmFin: QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (jour 5) — de l'accueil à l'extension",
    contexte:
      "Madame L., 34 ans, aide-soignante, se présente pour une première pose. Elle se lave les mains très fréquemment, souhaite une longueur moyenne en forme amande et un semi-permanent nude. Vous constatez des ongles courts, souples, des cuticules épaisses et une légère rougeur autour de l'annulaire droit.",
    questions: [
      { question: "Quelles questions posez-vous et que notez-vous sur la fiche diagnostique ?", reponseAttendue: "Habitudes et poses antérieures, attentes précises (forme, longueur, couleur), métier et fréquence de lavage des mains, contact avec des produits désinfectants, antécédents d'allergie et de décollement, éventuelle situation de handicap. Sur la fiche : date, identité, état des dix ongles, rougeur observée à l'annulaire droit, technique retenue, produits et références, forme et longueur, durée, prix de la pose et du remplissage, conseils remis, date de remplissage conseillée.", points: 5 },
      { question: "Comment traitez-vous la rougeur constatée autour de l'annulaire droit ?", reponseAttendue: "Rougeur du pourtour = suspicion de périonyxis débutant : pas de pose sur ce doigt. Je montre la zone à la cliente, j'explique qu'une pose enfermerait l'inflammation, je propose de réaliser les neuf autres doigts et de reprendre celui-ci une fois la zone saine, ou de tout reporter selon son choix. J'oriente vers un médecin si la rougeur s'accompagne de chaleur, de douleur ou de pus. Je trace la décision sur la fiche.", points: 5 },
      { question: "Quelle technique d'extension retenez-vous et pourquoi ?", reponseAttendue: "Ongles courts et souples, lavage fréquent des mains : le chablon est préférable pour obtenir une architecture sur mesure et une base fine, sans surépaisseur au raccord ni risque de chevauchement des replis. La longueur reste modérée pour un métier manuel. Si la cliente préfère la capsule, choisir la taille couvrant exactement la largeur, fondre soigneusement le raccord et réduire la longueur.", points: 5 },
      { question: "Quels conseils spécifiques donnez-vous à cette cliente compte tenu de son métier ?", reponseAttendue: "Gants pour tout contact prolongé avec l'eau et les désinfectants, huile à cuticules quotidienne pour compenser le dessèchement lié aux lavages répétés, longueur modérée pour la sécurité au travail, ne pas utiliser les ongles comme outil, revenir immédiatement en cas de décollement, de douleur ou d'odeur, remplissage impératif à 3 semaines car le lavage fréquent accélère les soulèvements.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale (jour 9) — M1 mise en situation sur modèle vivant + M2 questionnaire",
    exercices: [
      {
        titre: "MSP 1 — Accueil, diagnostic et validation de la faisabilité (C1)",
        consigne: "Accueillez le modèle, conduisez le questionnement, examinez les dix ongles, validez la faisabilité et renseignez la fiche diagnostique devant l'évaluateur.",
        reponseAttendue: "Posture accueillante (sourire, empathie), questionnement sur les habitudes et les attentes, examen de la santé et de la solidité des ongles, repérage des contre-indications, prise en compte d'une éventuelle situation de handicap, validation de la faisabilité, fiche diagnostique renseignée, information exhaustive sur les étapes et le prix.",
        points: 20,
      },
      {
        titre: "MSP 2 — Préparation du poste et protocole d'hygiène (C2 et C3)",
        consigne: "Préparez et agencez votre poste, puis exécutez le protocole d'hygiène complet avant la prestation.",
        reponseAttendue: "Outils adaptés à la prestation choisie, consommables préparés, positionnement ergonomique, prise en compte des besoins spécifiques du modèle. Poste nettoyé et désinfecté (lampe comprise), outils stérilisés à l'autoclave ou au bac à ultrasons, produits aux normes NF, contrôle de l'usure des outils et des dates de péremption, conformité cosmétique vérifiée, mains désinfectées selon le protocole (1 min savon antiseptique + 30 s hydroalcoolique), masque et gants portés, mains du modèle désinfectées.",
        points: 20,
      },
      {
        titre: "MSP 3 — Préparation de l'ongle et extension (C4 et C5)",
        consigne: "Préparez les ongles naturels puis réalisez l'extension par capsule ou par chablon sur les dix doigts.",
        reponseAttendue: "Produits adaptés à l'ongle naturel, lime de taille et de grain appropriés, cuticules correctement repoussées, geste confortable pour le modèle, surface entièrement matifiée, dépoussiérage effectué. Capsule : bonne taille, positionnement droit, pas de dépassement des replis, découpe à la bonne longueur, raccord fondu. Chablon : positionnement correct par rapport à l'ongle, découpe ajustée, alignement contrôlé de profil et de dessus.",
        points: 20,
      },
      {
        titre: "MSP 4 — Construction et décoration (C6 et C7)",
        consigne: "Construisez la prothésie et réalisez la décoration retenue au tirage (semi-permanent, French, Babyboomer ou effet).",
        reponseAttendue: "Primer ou nail prep en fine couche séché à l'air libre, base fine sans contact avec les cuticules catalysée 60 s, gel de construction en quantité maîtrisée, apex réussi (épaisseur correcte, uniforme, centré), aucun contact avec les cuticules ni débordement latéral, gel de finition en couche moyenne catalysé 2 × 60 s. Décoration : semi-permanent sans traces ni raclage, résultat lisse ; French au sourire net ; Babyboomer au dégradé harmonieux ; effets en couche uniforme sans paquet ; 3D avec relief visible, design harmonieux et colle maîtrisée.",
        points: 20,
      },
      {
        titre: "MSP 5 — Remplissage, finition et conseils (C8, C9 et C10)",
        consigne: "Réalisez un remplissage sur la main appareillée, finalisez le soin et délivrez les conseils post-prestation.",
        reponseAttendue: "Toutes les étapes du remplissage réalisées dans l'ordre imposé, grain de lime et embout de ponceuse adaptés, vitesse ajustée, mouvements restreints à la zone concernée, fine couche de gel conservée, cuticules repoussées, ongle dépoussiéré, épaisseur suffisante, temps de catalyse respectés, finition adaptée. Finition : quantité juste d'huile à cuticules sans débordement, crème hydratante appliquée de façon homogène. Conseils : gestes d'entretien adaptés, contre-indications, discours clair, fiche remise avec la date de remplissage.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const ONGULAIRE_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.francecompetences.fr/recherche/rs/7302/",
      titreLien: "France Compétences — RS7302",
      titre: "Fiche « Techniques de prothésie ongulaire » : compétences, modalités et critères d'évaluation",
      date: "Septembre 2026",
      commentaire: "Vérification trimestrielle de la validité de l'enregistrement au Répertoire spécifique, des dix compétences C1 à C10 et des deux modalités d'évaluation (mise en situation sur modèle vivant et questionnaire).",
      exploitation: "Preuve : capture datée de la fiche RS archivée au dossier Qualiopi. Action : alignement du programme et des grilles d'évaluation sur le référentiel en vigueur.",
    },
    {
      lien: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32009R1223",
      titreLien: "EUR-Lex — Règlement (CE) n° 1223/2009",
      titre: "Réglementation européenne des produits cosmétiques appliquée aux gels, primers et colles",
      date: "Août 2026",
      commentaire: "Suivi des obligations d'étiquetage (liste INCI, numéro de lot, date de durabilité, responsable de mise sur le marché) et des substances soumises à restriction dans les produits d'ongles.",
      exploitation: "Preuve : tableau de conformité des produits utilisés en salle, mis à jour et archivé. Action : retrait des références non conformes et mise à jour du module hygiène du jour 3.",
    },
    {
      lien: "https://ansm.sante.fr/",
      titreLien: "ANSM",
      titre: "Alertes, retraits et recommandations sur les produits cosmétiques d'ongles",
      date: "Juillet 2026",
      commentaire: "Veille sur les décisions de police sanitaire touchant les résines, les colles et les lampes de catalyse, et sur les recommandations d'usage aux professionnels.",
      exploitation: "Preuve : note de veille datée diffusée à l'équipe pédagogique. Action : information immédiate des stagiaires et remplacement des produits concernés.",
    },
    {
      lien: "https://www.inrs.fr/",
      titreLien: "INRS",
      titre: "Prévention des allergies professionnelles aux (méth)acrylates et des TMS dans les métiers de l'esthétique",
      date: "Juin 2026",
      commentaire: "Les acrylates sont des sensibilisants cutanés : une allergie acquise est définitive. Suivi des recommandations sur la ventilation, l'aspiration des poussières de limage, le port des EPI et l'ergonomie du poste.",
      exploitation: "Preuve : fiche mémo « risque chimique et posture au poste ongulaire » remise au jour 3. Action : renforcement de la séquence sécurité et installation d'aspirateurs individuels.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance",
      titre: "Convention collective de l'esthétique-cosmétique (IDCC 3032) et règles d'hygiène des lieux recevant du public",
      date: "Mai 2026",
      commentaire: "Veille sur la classification des emplois, les obligations de formation continue et les règles d'hygiène applicables aux instituts et bars à ongles.",
      exploitation: "Preuve : extrait conventionnel archivé. Action : mise à jour du module « exercer et développer son activité » du jour 9.",
    },
  ],
  metier: [
    {
      lien: "https://www.francetravail.fr/",
      titreLien: "France Travail",
      titre: "Offres et tensions de recrutement sur les métiers de l'esthétique et de la prothésie ongulaire",
      date: "Août 2026",
      commentaire: "Relevé trimestriel des offres publiées sur les postes de prothésiste ongulaire et d'esthéticienne, des niveaux de rémunération observés et de la part de créations d'activité indépendante.",
      exploitation: "Preuve : extraction datée jointe au dossier. Action : atelier « statut et tarification » au jour 9 pour les stagiaires en création d'activité.",
    },
    {
      lien: "https://www.cnaib.fr/",
      titreLien: "CNAIB-SPA — Confédération nationale artisanale des instituts de beauté",
      titre: "Évolution du marché de la beauté des ongles et pratiques professionnelles de la branche",
      date: "Juillet 2026",
      commentaire: "Suivi des positions de la branche sur les qualifications requises, l'hygiène en institut et la concurrence des poses à domicile non déclarées.",
      exploitation: "Preuve : synthèse de branche remise aux stagiaires au jour 1. Action : actualisation de la présentation des débouchés et des conditions d'exercice.",
    },
    {
      lien: "https://www.dermato-info.fr/",
      titreLien: "Société Française de Dermatologie — Dermato-Info",
      titre: "Pathologies de l'ongle : reconnaître ce qui interdit une pose",
      date: "Juin 2026",
      commentaire: "Actualisation des repères cliniques permettant à la professionnelle de repérer une mycose, une onycholyse ou un périonyxis et d'orienter vers un médecin sans poser de diagnostic.",
      exploitation: "Preuve : photothèque de pathologies mise à jour et commentée. Action : refonte de l'exercice de tri « pose possible / à reporter / interdite » du jour 3.",
    },
    {
      lien: "https://bpifrance-creation.fr/",
      titreLien: "Bpifrance Création",
      titre: "Créer son activité de prothésiste ongulaire : statut, assurance et obligations",
      date: "Mai 2026",
      commentaire: "Veille sur les formalités de création en micro-entreprise, l'assurance responsabilité civile professionnelle et les obligations d'affichage des tarifs.",
      exploitation: "Preuve : fiche pratique remise lors du bilan individuel. Action : intégration d'un temps « installation » dans le module du jour 9.",
    },
  ],
  technologique: [
    {
      lien: "https://www.youtube.com/results?search_query=acrygel+technique+tutoriel",
      titreLien: "Veille technique — acrygel",
      titre: "Montée en puissance de l'acrygel face au gel traditionnel et à l'acrylique",
      date: "Août 2026",
      commentaire: "L'acrygel combine la souplesse du gel et la solidité de l'acrylique, sans odeur ni dosage liquide/poudre : il modifie les gestes de construction et les attentes clientes.",
      exploitation: "Preuve : démonstration comparative filmée au jour 7. Action : ajout d'une séquence acrygel au module construction.",
    },
    {
      lien: "https://ansm.sante.fr/",
      titreLien: "ANSM — lampes de catalyse",
      titre: "Sécurité des lampes UV et LED utilisées pour la catalyse des gels",
      date: "Juillet 2026",
      commentaire: "Suivi des travaux sur l'exposition cutanée liée aux lampes de catalyse et des recommandations pratiques (durée d'exposition, protection des mains de la cliente).",
      exploitation: "Preuve : consigne affichée au poste et intégrée au protocole. Action : mise à disposition de mitaines de protection pour les clientes.",
    },
    {
      lien: "https://www.youtube.com/results?search_query=structure+russe+ongle+tutoriel",
      titreLien: "Veille technique — manucure russe et structure",
      titre: "Techniques de manucure combinée et de construction « structure russe »",
      date: "Juin 2026",
      commentaire: "Diffusion rapide de la préparation à la ponceuse et des constructions très structurées : elles exigent une maîtrise fine des embouts et de la vitesse, sous peine d'agresser la matrice.",
      exploitation: "Preuve : séquence de démonstration encadrée au jour 7 avec rappel des limites de sécurité. Action : ajout d'un point de contrôle « profondeur de ponçage » dans la grille d'observation.",
    },
    {
      lien: "https://www.inrs.fr/",
      titreLien: "INRS — aspiration des poussières",
      titre: "Évolution des systèmes d'aspiration intégrés aux postes de manucure",
      date: "Mai 2026",
      commentaire: "Généralisation des aspirateurs intégrés et des tapis aspirants, qui réduisent l'exposition aux poussières de limage pour la professionnelle comme pour la cliente.",
      exploitation: "Preuve : équipement du plateau technique documenté. Action : intégration du réglage de l'aspiration à la check-list de préparation du poste.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedOngulaireAICaches(): void {
  try {
    setCachedContentPack(FORMATION_ONGULAIRE, ONGULAIRE_CONTENT_PACK);
    setCachedEvalPack(FORMATION_ONGULAIRE, ONGULAIRE_EVAL_PACK);
    setCachedVeillePack(FORMATION_ONGULAIRE, ONGULAIRE_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
