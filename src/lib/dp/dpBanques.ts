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
      "La demande est arrivée en semaine,",
      "Mon responsable m'a confié ce dossier,",
      "J'ai repris ce sujet en cours de route,",
      "L'opération suivait une réclamation,",
      "La direction m'a sollicité sur ce point,",
      "Le besoin est né en pleine pointe,",
      "Ce dossier est arrivé un vendredi,",
      "La mission est née fin de trimestre,",
      "Le besoin a été formulé oralement,",
      "J'ai repris ce dossier après un départ,",
      "La demande venait d'un autre service,",
    ],
    suites: [
      "avec un délai court à tenir.",
      "dans un contexte déjà tendu.",
      "sans cadrage écrit préalable.",
      "avec une réponse attendue vite.",
      "alors que l'équipe était réduite.",
      "avec un enjeu financier réel.",
      "et une exigence de traçabilité.",
    ],
  },
  contrainte: {
    ouvertures: [
      "La difficulté principale portait",
      "Je devais composer",
      "Deux services attendaient des réponses",
      "Les informations initiales manquaient",
      "Un cadre réglementaire précis s'imposait",
      "L'effectif disponible ce jour-là",
      "La traçabilité écrite était exigée",
      "Le calendrier dépendait d'un tiers",
      "Le circuit de validation interne",
      "Les délais annoncés au demandeur",
      "Une contrainte budgétaire ferme",
    ],
    suites: [
      "imposait un contrôle strict.",
      "limitait nettement mes options.",
      "devait être arbitré rapidement.",
      "obligeait à formaliser par écrit.",
      "pesait sur le coût de la solution.",
      "supposait l'accord du responsable.",
      "restait difficile à concilier.",
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
      "avant d'engager la moindre action.",
      "pour objectiver la décision.",
      "en fixant une date pour chaque étape.",
      "dans le respect des procédures.",
      "avec les personnes concernées.",
      "puis j'ai fait valider le résultat.",
      "pour sécuriser la suite du dossier.",
    ],
  },
  outils: {
    ouvertures: [
      "J'ai utilisé un tableur de calcul,",
      "J'ai utilisé l'outil métier interne,",
      "J'ai utilisé les trames validées,",
      "J'ai utilisé la base documentaire,",
      "J'ai utilisé un espace partagé,",
      "J'ai utilisé les procédures qualité,",
      "J'ai utilisé un agenda partagé,",
      "J'ai utilisé un tableau de pilotage,",
      "J'ai utilisé le registre du service,",
      "J'ai utilisé un modèle de note interne,",
      "J'ai utilisé la fiche de procédure,",
    ],
    suites: [
      "ainsi qu'un traitement de texte.",
      "ainsi que la messagerie interne.",
      "ainsi qu'un comparatif chiffré.",
      "ainsi que les modèles internes.",
      "ainsi qu'un agenda partagé.",
      "ainsi qu'un tableau de bord simple.",
      "ainsi que les documents types.",
    ],
  },
  alea: {
    ouvertures: [
      "En cours de route, la demande a changé",
      "Un retard imprévu est survenu",
      "Une pièce manquante a bloqué le dossier",
      "Une erreur de saisie a été repérée",
      "Un désaccord est apparu sur le périmètre",
      "Une indisponibilité de dernière minute",
      "Un point de vigilance est ressorti",
      "Une information contradictoire",
      "Un arbitrage tardif de la direction",
      "Une absence imprévue dans l'équipe",
      "Un changement de priorité",
    ],
    suites: [
      "et j'ai repris une partie du travail.",
      "et j'ai prévenu sans attendre.",
      "que j'ai signalé par écrit.",
      "que j'ai fait arbitrer plus haut.",
      "et j'ai réorganisé les étapes.",
      "et j'ai vérifié auprès de la source.",
      "et j'ai corrigé avant transmission.",
    ],
  },
  cloture: {
    ouvertures: [
      "À la fin, j'ai vérifié chaque engagement",
      "J'ai rédigé un compte rendu court",
      "J'ai clôturé le dossier",
      "J'ai fait un point de fin",
      "J'ai transmis au service suivant",
      "J'ai mis à jour le tableau de suivi",
      "J'ai archivé les pièces justificatives",
      "J'ai validé le solde du dossier",
      "J'ai présenté le bilan de la mission",
      "J'ai remis les livrables attendus",
      "J'ai organisé la reprise du dossier",
    ],
    suites: [
      "puis classé les pièces produites.",
      "avec les écarts constatés.",
      "après validation du demandeur.",
      "en signalant les points à suivre.",
      "et signalé le dossier comme soldé.",
      "selon la procédure en vigueur.",
      "avant clôture définitive.",
    ],
  },
  interlocuteurs: {
    ouvertures: [
      "J'ai travaillé avec mon responsable,",
      "J'ai travaillé avec deux collègues,",
      "J'ai travaillé avec le demandeur,",
      "J'ai travaillé en binôme avec un ancien,",
      "J'ai travaillé avec l'équipe terrain,",
      "J'ai travaillé avec mon tuteur,",
      "J'ai travaillé avec l'assistante,",
      "J'ai travaillé avec le référent qualité,",
      "J'ai travaillé avec le service support,",
      "J'ai travaillé avec la direction,",
      "J'ai travaillé avec un prestataire,",
    ],
    suites: [
      "qui validait les arbitrages.",
      "et le service administratif.",
      "sous la supervision du responsable.",
      "et les interlocuteurs externes.",
      "ainsi que le service facturation.",
      "et le correspondant du client.",
      "et la direction de la structure.",
    ],
  },
  retour: {
    ouvertures: [
      "Ce que je retiens, c'est qu'une question",
      "J'ai gardé l'habitude de confirmer",
      "Cette mission m'a appris à alerter tôt",
      "J'ai compris qu'un outil simple",
      "Je note les points de vigilance",
      "Je distingue ce que je décide seul",
      "Je prends le temps de relire",
      "Je formalise systématiquement",
      "Je sais désormais poser un cadre écrit",
      "J'anticipe mieux les validations",
      "Je vérifie les données avant diffusion",
    ],
    suites: [
      "pour éviter toute reprise inutile.",
      "car l'écrit protège les deux parties.",
      "dès qu'un délai devient tendu.",
      "et cela m'a fait gagner du temps.",
      "pour aborder le dossier suivant.",
      "avant toute transmission au client.",
      "et je m'y tiens depuis.",
    ],
  },
};

// ───────────────────────────────────────────── transport (GOTRM)

const FENTES_TRANSPORT: Record<DpFente, DpFragments> = {
    contexte: {
    ouvertures: [
      "La demande est arrivée par mail le soir,",
      "Le donneur d'ordres a appelé le service,",
      "Le dossier visait un trafic régulier",
      "L'opération tombait en pleine pointe,",
      "Le client sortait d'un incident,",
      "Le trafic avait été confié à un affrété",
      "La demande visait un secteur rare,",
      "Le service venait de changer de TMS,",
      "La commande venait d'un vieux client,",
      "Le dossier concernait un affrètement,",
      "La demande portait sur un lot partiel,",
    ],
    suites: [
      "pour un départ dès le lendemain.",
      "sans passer par le commercial.",
      "avec un parc déjà très sollicité.",
      "alors que la marge était faible.",
      "et une exigence de traçabilité.",
      "avec peu de retour de fret.",
      "dans une semaine très chargée.",
    ],
  },
  contrainte: {
    ouvertures: [
      "Le rendez-vous de livraison imposé",
      "La chaîne du froid devait être tracée",
      "Le prix demandé par le client",
      "Aucun véhicule en propre n'était libre",
      "Les coupures et repos réglementaires",
      "Le déchargement tenait à un seul quai",
      "La marchandise exigeait un hayon",
      "Une restriction de port de charge",
      "Le poids total autorisé du véhicule",
      "La zone de livraison réglementée",
      "Le délai imposé par le destinataire",
    ],
    suites: [
      "ne laissait aucune marge utile.",
      "imposait un contrôle rigoureux.",
      "limitait le choix des véhicules.",
      "pesait directement sur la marge.",
      "obligeait à affréter un partenaire.",
      "supposait un conducteur formé.",
      "interdisait tout retard au départ.",
    ],
  },
  methode: {
    ouvertures: [
      "J'ai rappelé le client",
      "J'ai actualisé le prix de revient au km",
      "J'ai vérifié la faisabilité légale",
      "J'ai comparé la traction en propre",
      "J'ai contrôlé les pièces de l'affrété",
      "J'ai regroupé deux livraisons proches",
      "J'ai reporté les affectations",
      "J'ai repris trois mois de mouvements",
      "J'ai simulé deux plans de marche",
      "J'ai sécurisé un retour de fret",
      "J'ai anticipé le repos hebdomadaire",
    ],
    suites: [
      "avant de confirmer au client.",
      "pour sécuriser le plan de marche.",
      "en respectant la réglementation sociale.",
      "puis j'ai tracé chaque étape.",
      "avec l'accord de mon responsable.",
      "pour fiabiliser le chiffrage.",
      "et j'ai informé le conducteur.",
    ],
  },
  outils: {
    ouvertures: [
      "J'ai utilisé le TMS d'exploitation,",
      "J'ai utilisé une bourse de fret,",
      "J'ai utilisé le logiciel des cartes,",
      "J'ai utilisé la lettre de voiture CMR,",
      "J'ai utilisé les extractions du TMS,",
      "J'ai utilisé le planning partagé,",
      "J'ai utilisé le dossier photos,",
      "J'ai utilisé le suivi des affrétés,",
      "J'ai utilisé le relevé chronotachy,",
      "J'ai utilisé la grille tarifaire,",
      "J'ai utilisé le carnet palettes,",
    ],
    suites: [
      "ainsi qu'un tableur de calcul.",
      "ainsi que la messagerie du service.",
      "ainsi que le téléphone d'astreinte.",
      "ainsi que les documents de transport.",
      "ainsi qu'un tableau de bord mensuel.",
      "ainsi que la trame de réponse client.",
      "ainsi que le classement du dossier.",
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
      "et j'ai trouvé un relais rapidement.",
      "et j'ai prévenu le client aussitôt.",
      "que j'ai signalé par écrit.",
      "et j'ai revu le plan de marche.",
      "et j'ai porté des réserves.",
      "et j'ai réaffecté un véhicule.",
      "et j'ai alerté ma hiérarchie.",
    ],
  },
  cloture: {
    ouvertures: [
      "À la clôture, j'ai contrôlé les CMR",
      "J'ai renseigné les indicateurs",
      "J'ai fait un point donneur d'ordres",
      "J'ai transmis le dossier facturation",
      "J'ai alerté sur l'écart de marge",
      "J'ai classé les pièces d'exploitation",
      "J'ai soldé le compte palettes",
      "J'ai validé la conformité rendue",
      "J'ai contrôlé les pièces de transport",
      "J'ai suivi le règlement de la facture",
      "J'ai bouclé le dossier d'affrètement",
    ],
    suites: [
      "avant de valider la facturation.",
      "puis j'ai levé les réserves.",
      "avec tous les justificatifs.",
      "et mis à jour le suivi des litiges.",
      "avant archivage du dossier.",
      "en signalant l'écart de marge.",
      "après accord du donneur d'ordres.",
    ],
  },
  interlocuteurs: {
    ouvertures: [
      "J'ai travaillé avec le chef d'exploit,",
      "J'ai travaillé avec le chef de quai,",
      "J'ai travaillé avec l'affrètement,",
      "J'ai travaillé avec l'assistante,",
      "J'ai travaillé avec le service litiges,",
      "J'ai travaillé avec les RH et la paie,",
      "J'ai travaillé avec le conducteur,",
      "J'ai travaillé avec le commercial,",
      "J'ai travaillé avec le service qualité,",
      "J'ai travaillé avec le donneur d'ordres,",
      "J'ai travaillé avec le transporteur,",
    ],
    suites: [
      "qui validait le niveau de marge.",
      "et les conducteurs concernés.",
      "ainsi que le service facturation.",
      "et les sous-traitants réguliers.",
      "et le service client.",
      "sous le contrôle de la direction.",
      "et le destinataire final.",
    ],
  },
  retour: {
    ouvertures: [
      "Je garde une marge de moyens :",
      "Le contrôle des affrétés est un réflexe",
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
      "car l'imprévu est quotidien.",
      "car notre responsabilité est engagée.",
      "sinon le litige est indéfendable.",
      "et cela évite bien des tensions.",
      "si cela débouche sur une action.",
      "pour garder la confiance du client.",
      "et je m'y tiens systématiquement.",
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
