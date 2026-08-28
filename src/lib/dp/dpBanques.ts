/**
 * Banques de phrases du moteur unique DP (45A).
 *
 * PRINCIPE ANTI-DUPLICATION
 * -------------------------
 * Le contrôle bloquant interdit toute suite de plus de 40 caractères identique
 * entre deux dossiers d'une même session. Une banque de phrases entières ne
 * peut pas tenir cette règle : dix candidats × trois exemples consomment
 * trente phrases par fente, bien plus que ce qu'une banque rédigée peut offrir.
 *
 * Chaque fente est donc composée de DEUX fragments courts (moins de 40
 * caractères chacun) : une ouverture et une suite. La phrase finale est
 * `ouverture + suite`. Comme aucun fragment n'atteint 40 caractères, toute
 * fenêtre de 40 caractères chevauche obligatoirement la jonction des deux
 * fragments : il suffit que le COUPLE (ouverture, suite) ne soit jamais réutilisé
 * dans la session pour qu'aucune collision de 40 caractères ne soit possible.
 * Avec 8 ouvertures × 8 suites, chaque fente offre 64 combinaisons distinctes.
 *
 * Aucune banque ne contient de nom d'entreprise réelle : le DP est signé sous
 * déclaration sur l'honneur, on n'y attribue jamais une expérience à une société
 * nommée qui n'a rien demandé.
 */

import type { FormationInfo } from "@/types/qualiopi";

export type DpFente =
  | "contexte"
  | "contrainte"
  | "methode"
  | "outils"
  | "alea"
  | "cloture"
  | "interlocuteurs"
  | "retour";

export interface DpFragments {
  /** Début de phrase, strictement inférieur à 40 caractères. */
  ouvertures: string[];
  /** Fin de phrase, strictement inférieure à 40 caractères. */
  suites: string[];
}

export interface DpBanque {
  secteur: string;
  /** Intitulés d'exemples par activité-type (index 0 = AT1). */
  intitulesParAT: string[][];
  fentes: Record<DpFente, DpFragments>;
}

// ───────────────────────────────────────────── banque générique

const FENTES_GENERIQUES: Record<DpFente, DpFragments> = {
    contexte: {
    ouvertures: [
      "La demande m'est parvenue en début de semaine,",
      "Le dossier m'a été confié par mon responsable,",
      "J'ai repris ce sujet en cours de route,",
      "L'opération faisait suite à une réclamation,",
      "La direction m'a sollicité sur ce point,",
      "Le besoin est apparu en pleine période de pointe,",
      "Ce dossier est arrivé un vendredi après-midi,",
      "La mission s'est présentée en fin de trimestre,",
      "Le besoin a été formulé oralement,",
      "J'ai récupéré ce dossier après un départ,",
      "La demande venait d'un autre service,",
    ],
    suites: [
      "avec un délai court et peu d'écrits.",
      "après un changement d'organisation.",
      "sans que le besoin soit encore cadré.",
      "dans un contexte déjà tendu.",
      "avec une réponse attendue rapidement.",
      "alors que l'équipe était réduite.",
      "en pleine mise en place d'une procédure.",
    ],
  },
    contrainte: {
    ouvertures: [
      "La difficulté principale portait",
      "Je devais composer",
      "Deux services attendaient des réponses",
      "Les informations de départ étaient partielles",
      "Un cadre réglementaire précis s'imposait",
      "L'effectif disponible ce jour-là",
      "La traçabilité écrite était exigée",
      "Le calendrier dépendait d'un tiers",
      "Le circuit de validation interne",
      "Les délais annoncés au demandeur",
      "Une contrainte budgétaire ferme",
    ],
    suites: [
      "sur le respect du délai annoncé.",
      "avec un budget déjà arrêté.",
      "difficiles à concilier entre elles.",
      "et devaient être fiabilisées avant décision.",
      "et laissait peu de marge d'appréciation.",
      "ne permettait pas un traitement habituel.",
      "car le dossier pouvait être contrôlé.",
    ],
  },
    methode: {
    ouvertures: [
      "J'ai repris la demande point par point",
      "J'ai construit un tableau comparatif",
      "J'ai découpé la mission en étapes",
      "J'ai relu les procédures internes",
      "J'ai chiffré deux hypothèses",
      "J'ai fait un point de cadrage rapide",
      "J'ai rédigé une note de cadrage courte",
      "J'ai contrôlé les données sources",
      "J'ai listé les informations manquantes",
      "J'ai proposé un rétroplanning",
      "J'ai testé la solution à petite échelle",
    ],
    suites: [
      "avant d'engager quoi que ce soit.",
      "pour objectiver l'arbitrage à rendre.",
      "avec une date cible pour chacune.",
      "afin de rester conforme aux règles.",
      "présentées à ma hiérarchie pour décision.",
      "avec les personnes directement concernées.",
      "validée avant de lancer l'exécution.",
    ],
  },
    outils: {
    ouvertures: [
      "J'ai utilisé un tableur de calcul et de suivi,",
      "J'ai utilisé l'outil métier interne,",
      "J'ai utilisé les trames validées de la structure,",
      "J'ai utilisé la base documentaire interne,",
      "J'ai utilisé un espace partagé pour les pièces,",
      "J'ai utilisé les procédures qualité,",
      "J'ai utilisé un agenda partagé,",
      "J'ai utilisé un tableau de pilotage,",
      "J'ai utilisé un tableur de suivi,",
      "J'ai utilisé l'outil métier interne,",
      "J'ai utilisé les trames validées,",
    ],
    suites: [
      "un traitement de texte et la messagerie.",
      "un tableur de suivi et le téléphone.",
      "les modèles de courrier et la messagerie.",
      "un comparatif chiffré et l'agenda partagé.",
      "un outil de reporting et le téléphone.",
      "un tableur de contrôle et les trames internes.",
      "la messagerie et un tableur de synthèse.",
    ],
  },
    alea: {
    ouvertures: [
      "En cours d'exécution, la demande a changé",
      "Un retard imprévu est survenu",
      "Une pièce manquante a bloqué le dossier",
      "Une erreur de saisie a été repérée",
      "Un désaccord est apparu sur le périmètre",
      "Une indisponibilité de dernière minute",
      "Un point de vigilance est ressorti",
      "Une information contradictoire est arrivée",
      "Un arbitrage tardif de la direction",
      "Une absence imprévue dans l'équipe",
      "Un changement de priorité",
    ],
    suites: [
      "et j'ai repris une partie du travail.",
      "et j'ai prévenu sans attendre.",
      "jusqu'à ma relance écrite puis téléphonique.",
      "et corrigée avant transmission.",
      "que j'ai fait trancher par ma hiérarchie.",
      "m'a conduit à réorganiser les étapes.",
      "et je l'ai signalé par écrit.",
    ],
  },
    cloture: {
    ouvertures: [
      "À la fin, j'ai vérifié chaque engagement",
      "J'ai rédigé un compte rendu court",
      "J'ai clôturé le dossier",
      "J'ai fait un point de fin",
      "J'ai transmis les éléments au service suivant",
      "J'ai mis à jour le tableau de suivi",
      "J'ai archivé les pièces justificatives",
      "J'ai validé le solde du dossier",
      "J'ai présenté le bilan de la mission",
      "J'ai remis les livrables attendus",
      "J'ai organisé la reprise du dossier",
    ],
    suites: [
      "puis classé les pièces produites.",
      "remis à ma hiérarchie avec les écarts.",
      "après validation du demandeur.",
      "pour confirmer que le besoin était couvert.",
      "en signalant les points à surveiller.",
      "et signalé le dossier comme soldé.",
      "dans le classement prévu par la procédure.",
    ],
  },
    interlocuteurs: {
    ouvertures: [
      "J'ai travaillé avec mon responsable direct,",
      "J'ai travaillé avec deux collègues du service,",
      "J'ai travaillé avec le demandeur,",
      "J'ai travaillé en binôme avec un collègue expérimenté,",
      "J'ai travaillé avec l'équipe opérationnelle,",
      "J'ai travaillé avec mon tuteur,",
      "J'ai travaillé avec l'assistante administrative,",
      "J'ai travaillé avec le référent qualité,",
      "J'ai travaillé avec le service support,",
      "J'ai travaillé avec la direction,",
      "J'ai travaillé avec un prestataire,",
    ],
    suites: [
      "qui validait les arbitrages retenus.",
      "et le service administratif.",
      "sous la supervision du chef de service.",
      "et les interlocuteurs externes du dossier.",
      "ainsi que le service facturation.",
      "et le correspondant du client.",
      "chargée du suivi des pièces.",
    ],
  },
    retour: {
    ouvertures: [
      "Ce que je retiens, c'est qu'une question",
      "J'ai gardé l'habitude de confirmer",
      "Cette mission m'a appris à alerter tôt",
      "J'ai compris qu'un outil simple",
      "Je note désormais les points de vigilance",
      "J'ai appris à distinguer ce que je décide",
      "Je prends le temps de relire",
      "Je formalise systématiquement",
      "Je sais désormais poser un cadre écrit",
      "J'anticipe mieux les validations",
      "Je vérifie les données avant diffusion",
    ],
    suites: [
      "posée au départ évite une reprise.",
      "par écrit tout accord donné oralement.",
      "dès qu'un délai devient tendu.",
      "mais tenu à jour vaut mieux qu'un autre.",
      "pour le dossier suivant.",
      "de ce qui doit remonter au responsable.",
      "avant toute transmission au client.",
    ],
  },
};

// ───────────────────────────────────────────── transport (GOTRM)

const FENTES_TRANSPORT: Record<DpFente, DpFragments> = {
    contexte: {
    ouvertures: [
      "La demande est arrivée par mail le soir,",
      "Le donneur d'ordres a appelé l'exploitation,",
      "Le dossier portait sur un trafic régulier",
      "L'opération tombait en période de pointe,",
      "Le client sortait d'un incident de livraison,",
      "Le trafic avait été confié à un affrété",
      "La demande visait un secteur peu couvert,",
      "Le service venait de changer de TMS,",
      "La commande venait d'un client historique,",
      "Le dossier concernait un affrètement,",
      "La demande portait sur un lot partiel,",
    ],
    suites: [
      "pour un chargement le lendemain matin.",
      "sans passer par le service commercial.",
      "que nous venions tout juste de reprendre.",
      "avec un parc déjà fortement sollicité.",
      "et attendait une réponse irréprochable.",
      "qui a fait défaut la veille du chargement.",
      "avec peu de retours de fret possibles.",
    ],
  },
    contrainte: {
    ouvertures: [
      "Le rendez-vous de livraison imposé",
      "La chaîne du froid devait être tracée",
      "Le prix demandé par le client",
      "Aucun véhicule en propre n'était libre",
      "Les coupures et repos réglementaires",
      "Le déchargement dépendait d'un quai unique",
      "La marchandise exigeait un hayon",
      "Une restriction de port de charge",
      "Le poids total autorisé du véhicule",
      "La zone de livraison réglementée",
      "Le délai imposé par le destinataire",
    ],
    suites: [
      "ne laissait aucune marge sur la conduite.",
      "de bout en bout de l'opération.",
      "frôlait notre prix de revient.",
      "sur le créneau demandé par le client.",
      "interdisaient un aller-retour en journée.",
      "réservé par créneau chez le destinataire.",
      "et un conducteur formé à la manutention.",
    ],
  },
    methode: {
    ouvertures: [
      "J'ai rappelé le client",
      "J'ai actualisé le prix de revient au km",
      "J'ai vérifié la faisabilité réglementaire",
      "J'ai comparé la traction en propre",
      "J'ai contrôlé les pièces du sous-traitant",
      "J'ai regroupé deux livraisons proches",
      "J'ai reporté les affectations au planning",
      "J'ai repris les mouvements sur trois mois",
      "J'ai simulé deux plans de marche",
      "J'ai sécurisé un retour de fret",
      "J'ai anticipé le repos hebdomadaire",
    ],
    suites: [
      "pour compléter la demande avant chiffrage.",
      "avec l'indice gazole du mois en cours.",
      "des temps de conduite avant de m'engager.",
      "et deux solutions affrétées avant d'arbitrer.",
      "licence, assurance et attestation à jour.",
      "sur une même tournée de distribution.",
      "partagé avec le quai et les conducteurs.",
    ],
  },
    outils: {
    ouvertures: [
      "J'ai utilisé le TMS d'exploitation,",
      "J'ai utilisé une bourse de fret,",
      "J'ai utilisé le logiciel de cartes conducteurs,",
      "J'ai utilisé la lettre de voiture CMR,",
      "J'ai utilisé les extractions chiffrées du TMS,",
      "J'ai utilisé le planning hebdomadaire partagé,",
      "J'ai utilisé le dossier photos du litige,",
      "J'ai utilisé le tableur de suivi des affrétés,",
      "J'ai utilisé le TMS d'exploitation,",
      "J'ai utilisé la bourse de fret,",
      "J'ai utilisé le tableur de suivi,",
    ],
    suites: [
      "un tableur de prix de revient et Word.",
      "le tableur de suivi des sous-traitants.",
      "le tableur de contrôle des temps de service.",
      "la trame de réponse au client et l'archivage.",
      "un tableau de bord mensuel commenté.",
      "le téléphone d'exploitation et la messagerie.",
      "les réserves écrites et le suivi assurance.",
    ],
  },
    alea: {
    ouvertures: [
      "Une panne en cours de tournée",
      "Une attestation d'affrété périmée",
      "Une palette refusée au déchargement",
      "Un embouteillage imprévu",
      "Deux palettes de plus qu'annoncé",
      "Un créneau de chargement décalé",
      "Un risque récurrent sur ce créneau",
      "Une rupture de chaîne du froid évitée",
      "Un contrôle routier en cours de trajet",
      "Un refus de chargement à l'expédition",
      "Un conducteur arrêté la veille",
    ],
    suites: [
      "m'a obligé à trouver un relais dans l'heure.",
      "m'a conduit à suspendre la commande.",
      "a donné lieu à des réserves sur la CMR.",
      "a décalé la livraison : j'ai prévenu avant.",
      "m'ont fait réaffecter un second véhicule.",
      "a demandé de revoir tout le plan de marche.",
      "a été signalé par écrit à ma hiérarchie.",
    ],
  },
    cloture: {
    ouvertures: [
      "À la clôture, j'ai contrôlé les CMR",
      "J'ai renseigné les indicateurs du dossier",
      "J'ai fait un point avec le donneur d'ordres",
      "J'ai transmis le dossier à la facturation",
      "J'ai alerté sur l'écart de marge",
      "J'ai classé les pièces d'exploitation",
      "J'ai soldé le compte palettes",
      "J'ai validé la conformité de la prestation",
      "J'ai contrôlé les pièces de transport",
      "J'ai suivi le règlement de la facture",
      "J'ai bouclé le dossier d'affrètement",
    ],
    suites: [
      "levé les réserves et validé la facture.",
      "ponctualité et rentabilité, avant archivage.",
      "pour valider la conformité du service rendu.",
      "avec l'ensemble des justificatifs d'attente.",
      "en proposant un correctif chiffré.",
      "et mis à jour le suivi des litiges.",
      "après rapprochement des bons signés.",
    ],
  },
    interlocuteurs: {
    ouvertures: [
      "J'ai travaillé avec mon responsable d'exploitation,",
      "J'ai travaillé avec le chef de quai,",
      "J'ai travaillé avec la cellule affrètement,",
      "J'ai travaillé avec l'assistante d'exploitation,",
      "J'ai travaillé avec le service litiges,",
      "J'ai travaillé avec le service RH et paie,",
      "J'ai travaillé avec le conducteur affecté,",
      "J'ai travaillé avec le service commercial,",
      "J'ai travaillé avec le service qualité,",
      "J'ai travaillé avec le donneur d'ordres,",
      "J'ai travaillé avec le transporteur affrété,",
    ],
    suites: [
      "qui validait le niveau de marge retenu.",
      "et les conducteurs de distribution.",
      "et les sous-traitants réguliers.",
      "chargée des pièces des affrétés.",
      "l'assureur et le service client.",
      "pour les éléments variables de paie.",
      "informé du plan de marche avant départ.",
    ],
  },
    retour: {
    ouvertures: [
      "J'ai appris à garder une marge de moyens :",
      "Le contrôle des affrétés est un réflexe :",
      "Sans réserves écrites à la livraison,",
      "Une indexation gazole écrite au départ",
      "Un indicateur ne vaut que",
      "Répondre vite au client,",
      "Un plan de marche réaliste",
      "La traçabilité des pièces",
      "Je sécurise désormais chaque affrètement",
      "J'écris toute réserve immédiatement",
      "Je vérifie les pièces avant chargement",
    ],
    suites: [
      "il y a toujours un imprévu dans la journée.",
      "la responsabilité de l'entreprise est engagée.",
      "un litige est très difficile à défendre.",
      "évite bien des tensions en cours d'année.",
      "s'il débouche sur une action concrète.",
      "même pour dire que le dossier avance.",
      "évite la plupart des infractions sociales.",
    ],
  },
};

/**
 * Intitulés d'exemples STRICTEMENT rattachés à leur activité-type.
 * GOTRM : AT1 = compétences 1 à 4, AT2 = compétences 5 à 7, AT3 = 8 et 9.
 */
const INTITULES_TRANSPORT: string[][] = [
  [
    "Traitement d'une demande de transport de lot complet et remise d'une offre chiffrée",
    "Tarification d'un transport sous température dirigée et proposition technique au donneur d'ordres",
    "Affectation des moyens et planification d'une semaine d'exploitation",
    "Encadrement des conducteurs et construction des plans de marche",
    "Gestion d'un aléa d'exploitation et réorganisation d'une tournée en cours de journée",
    "Coordination d'une opération de transport et suivi des objectifs de qualité et de rentabilité",
    "Étude de faisabilité d'une demande urgente et réponse écrite argumentée au client",
    "Suivi des temps de conduite et de repos d'une équipe de conducteurs sur une semaine",
    "Chiffrage d'un transport exceptionnel et proposition technique détaillée",
    "Clôture d'un dossier de transport et contrôle des documents d'exécution",
  ],
  [
    "Recours à l'affrètement et contrôle administratif des sous-traitants",
    "Négociation et contractualisation d'un trafic régulier sous-traité",
    "Supervision d'un arrivage messagerie et optimisation des tournées de distribution",
    "Traitement d'un litige transport avec réserves CMR et suivi de l'indemnisation",
    "Suivi des supports de charge et régularisation d'un compte palettes client",
    "Organisation d'une opération de groupage et dégroupage sur plateforme",
    "Mise en place d'un contrat de sous-traitance et suivi des engagements de service",
    "Traitement d'une réclamation après livraison et réponse au donneur d'ordres",
    "Contrôle des pièces réglementaires d'un nouveau transporteur partenaire",
    "Suivi des retours de marchandises et gestion du service après-vente transport",
  ],
  [
    "Construction d'un tableau de bord d'exploitation et préconisation de mesures correctives",
    "Animation de l'équipe d'exploitation et suivi des obligations sociales",
    "Analyse des écarts de rentabilité d'un trafic et plan d'actions correctives",
    "Organisation du travail du service exploitation sur une période de forte activité",
    "Reconstitution des indicateurs de performance mensuels et restitution à la direction",
    "Accompagnement d'un exploitant débutant et suivi de sa montée en compétences",
    "Optimisation du taux de remplissage et du kilométrage à vide sur un mois",
    "Mise en place d'un suivi des consommations et des coûts d'exploitation",
  ],
];

function domaine(secteur: string, intitulesParAT: string[][]): DpBanque {
  return { secteur, intitulesParAT, fentes: FENTES_GENERIQUES };
}

/** Répartit une liste plate d'intitulés en trois groupes d'activités-types. */
function repartir(liste: string[], groupes = 3): string[][] {
  const out: string[][] = Array.from({ length: groupes }, () => []);
  liste.forEach((x, i) => out[i % groupes].push(x));
  return out;
}

export const DP_BANQUES: Record<string, DpBanque> = {
  transport: {
    secteur: "Exploitation transport routier de marchandises",
    intitulesParAT: INTITULES_TRANSPORT,
    fentes: FENTES_TRANSPORT,
  },
  commercial: domaine(
    "Service commercial",
    repartir([
      "Conquête d'un nouveau client sur le marché B2B",
      "Mise en place d'une démarche de prospection digitale",
      "Négociation d'un contrat-cadre avec un distributeur",
      "Lancement commercial d'une nouvelle gamme",
      "Développement d'un portefeuille de clients PME en région",
      "Traitement d'une réclamation client et plan de fidélisation",
      "Construction d'un argumentaire de vente et suivi des indicateurs",
      "Préparation et conduite d'un rendez-vous de négociation",
      "Analyse du portefeuille et priorisation des actions commerciales",
    ]),
  ),
  conduite: domaine(
    "Service pédagogique",
    repartir([
      "Animation d'une action de sensibilisation à la sécurité routière",
      "Préparation et conduite d'une leçon individuelle",
      "Évaluation pédagogique d'un élève en difficulté et plan d'accompagnement",
      "Organisation d'une action collective de prévention des risques routiers",
      "Encadrement d'une formation post-permis",
      "Construction d'une progression pédagogique individualisée",
    ]),
  ),
  management: domaine(
    "Direction / encadrement",
    repartir([
      "Pilotage de la performance opérationnelle d'une équipe",
      "Mise en place d'un plan d'actions correctives après un audit",
      "Recrutement et intégration d'un nouveau collaborateur",
      "Élaboration et présentation d'un budget prévisionnel",
      "Conduite d'un projet de réorganisation interne",
      "Conduite d'entretiens annuels et plan de développement des compétences",
    ]),
  ),
  esthetique: domaine(
    "Service soins et bien-être",
    repartir([
      "Mise en place d'un protocole de soins adapté en établissement",
      "Animation d'un atelier bien-être pour un public fragilisé",
      "Accompagnement individuel d'une bénéficiaire en parcours de soins",
      "Conception d'une offre de soins adaptée",
      "Mise en œuvre d'un partenariat avec un service de santé",
    ]),
  ),
  numerique: domaine(
    "Service développement / numérique",
    repartir([
      "Développement d'une application web responsive",
      "Migration d'une base de données vers une architecture cloud",
      "Refonte de l'expérience utilisateur d'un site e-commerce",
      "Mise en production d'un module applicatif avec intégration continue",
      "Audit de sécurité et mise en conformité RGPD d'une plateforme",
    ]),
  ),
  default: domaine(
    "Service opérations",
    repartir([
      "Mise en œuvre d'une procédure interne d'amélioration des processus",
      "Conduite d'un projet transversal au sein de la structure",
      "Accompagnement individualisé d'un bénéficiaire",
      "Élaboration d'un plan d'actions annuel",
      "Mise en place d'une démarche qualité et de son suivi",
      "Traitement d'un dysfonctionnement et mise en place d'un correctif",
    ]),
  ),
};

/** Détecte le domaine professionnel à partir de la formation saisie. */
export function detectDomaine(f: FormationInfo): keyof typeof DP_BANQUES {
  const t = `${f.intitule || ""} ${f.codeRNCP || ""}`.toLowerCase();
  if (/gotrm|gestionnaire.*transport|transport.*routier.*marchandises|exploitant.*transport|affr[ée]teur|rncp40990|tp-?01329/i.test(t)) return "transport";
  if (/n[ée]goci|commercial|vente|technico/i.test(t)) return "commercial";
  if (/conduite|ecsr|enseignant.*conduite|s[ée]curit[ée] routi/i.test(t)) return "conduite";
  if (/responsable|petite.*moyenne|management|dirigeant|rpms|assistant.*direction/i.test(t)) return "management";
  if (/esth[ée]ti|massage|bien.?[êe]tre|socio/i.test(t)) return "esthetique";
  if (/d[ée]veloppeur|web|num[ée]rique|informatique|infographiste/i.test(t)) return "numerique";
  return "default";
}

export function getBanque(f: FormationInfo): DpBanque {
  return DP_BANQUES[detectDomaine(f)] || DP_BANQUES.default;
}

/** Intitulés disponibles pour une activité-type donnée (jamais ceux d'une autre AT). */
export function intitulesPourAT(banque: DpBanque, atIndex: number, nbAT: number): string[] {
  if (banque.intitulesParAT.length >= nbAT) return banque.intitulesParAT[atIndex] || [];
  const plat = banque.intitulesParAT.flat();
  return repartir(plat, Math.max(1, nbAT))[atIndex] || plat;
}
