/**
 * BAHO – Exercices jour 1 / jour 2 + Évaluation finale, par stagiaire
 * - Contenu issu du déroulé pédagogique réel du pack BAHO (programme 3 jours / 21 h) :
 *     Jour 1 : organisation des services, parcours client, dysfonctionnements, transmission
 *     Jour 2 : organisation des tâches, priorisation, gestion du temps, standardisation
 *     Jour 3 : communication inter-services, réclamations (4 étapes), incidents, posture
 * - Dates : jour 1, jour 2 et dernier jour de la convention (getThreeWorkingDays)
 * - Notes & appréciations : trajectoire cohérente avec les tests de positionnement
 *   (début plafonné à 7/10, fin ≥ 7/10, progression globalement croissante)
 */
import { FORMAT_SPHERE_ORG, getBahoEntreprises, type BahoEntreprise, type BahoStagiaire } from "./bahoData";
import { BASE_CSS, header, footer, stampsBlock, formatDateLong, getThreeWorkingDays } from "./bahoStaticDocs";
import {
  BAHO_INTITULE,
  bahoScores,
  seedOf,
  pseudoIndex,
  asStagiaireInfo,
  civiliteOf,
  letter,
  diversifyWrong,
} from "./bahoTests";
import { answersForQCM, humanizedQCMComment, humanizedStudentAnswer, type AIQCMQuestion } from "@/lib/aiEvalPack";

export type BahoDocKind = "ex1" | "ex2" | "final";

/* ------------------------------------------------------------------ */
/* Contenu : QCM par document                                          */
/* ------------------------------------------------------------------ */

/** Jour 1 – organisation des services, parcours client, dysfonctionnements, transmission */
export const BAHO_QCM_EX1: AIQCMQuestion[] = [
  {
    question: "Une arrivée est annoncée à 12h alors que le check-in est prévu à 15h. Quel service doit être informé en priorité ?",
    options: ["L'hébergement (étages), pour arbitrer la mise à disposition d'une chambre prête", "La comptabilité", "Le service commercial", "Le service technique"],
    correctIndex: 0,
  },
  {
    question: "Parmi ces points de contact, lequel N'appartient PAS au parcours client d'un hôtel-restaurant ?",
    options: ["La réservation en ligne", "L'accueil au comptoir", "La commande fournisseurs en cuisine", "Le règlement et le départ"],
    correctIndex: 2,
  },
  {
    question: "Un client trouve sa chambre correcte mais se plaint d'un accueil expéditif. Ce dysfonctionnement est de nature :",
    options: ["Technique", "Relationnelle / posture d'accueil", "Comptable", "Réglementaire"],
    correctIndex: 1,
  },
  {
    question: "Quelle information doit obligatoirement circuler de la réception vers la restauration ?",
    options: ["Le nombre de petits-déjeuners et les régimes / allergies signalés", "Le mode de paiement du client", "Le numéro de plaque du véhicule", "Le tarif négocié"],
    correctIndex: 0,
  },
  {
    question: "Une même réclamation revient trois semaines de suite (linge de bain manquant). Quel est le bon réflexe vu le jour 1 ?",
    options: ["Compenser le client à chaque fois sans rien signaler", "Tracer le dysfonctionnement et remonter la cause à la source (dotation / circuit lingerie)", "Attendre un avis négatif en ligne", "Changer le client de chambre"],
    correctIndex: 1,
  },
];

/** Jour 2 – organisation des tâches, priorisation, gestion du temps, standardisation */
export const BAHO_QCM_EX2: AIQCMQuestion[] = [
  {
    question: "9h05 : 12 départs à facturer, un client attend au comptoir, la maintenance appelle pour un radiateur. Que traitez-vous d'abord ?",
    options: ["Le client présent au comptoir, puis les départs, puis la maintenance planifiée", "La maintenance, car c'est technique", "Les 12 factures pour ne pas prendre de retard", "On traite dans l'ordre d'arrivée des demandes"],
    correctIndex: 0,
  },
  {
    question: "Qu'est-ce qu'une tâche « importante mais différable » en exploitation ?",
    options: ["Une réclamation client en cours", "La mise à jour du planning des arrivées de la semaine suivante", "Une fuite d'eau en chambre occupée", "Un client qui attend sa clé"],
    correctIndex: 1,
  },
  {
    question: "Deux réceptionnistes accueillent les clients de manière très différente. Quel outil du jour 2 permet de corriger cela ?",
    options: ["Un standard d'accueil écrit et partagé (trame de phrases, étapes, délais annoncés)", "Une sanction disciplinaire", "Un changement d'horaires", "La suppression du briefing"],
    correctIndex: 0,
  },
  {
    question: "À quoi sert le briefing d'avant-service de 10 minutes ?",
    options: ["À répartir les tâches, annoncer les particularités du jour et les priorités", "À contrôler la ponctualité", "À remplacer la passation écrite", "À valider les congés"],
    correctIndex: 0,
  },
  {
    question: "Quel indicateur montre qu'une procédure standardisée est réellement appliquée ?",
    options: ["Le nombre de salariés présents", "La stabilité du résultat quel que soit l'agent en poste (même délai, même qualité)", "Le nombre de réunions tenues", "Le volume de mails échangés"],
    correctIndex: 1,
  },
];

/** Évaluation finale – ensemble des compétences visées (jours 1 à 3) */
export const BAHO_QCM_FINAL: AIQCMQuestion[] = [
  {
    question: "Rappelez la méthode de traitement d'une réclamation client en 4 étapes :",
    options: ["Écouter – Reformuler – Traiter / proposer une solution – Vérifier la satisfaction", "Justifier – Excuser – Clôturer – Archiver", "Traiter – Facturer – Écouter – Oublier", "Renvoyer – Attendre – Justifier – Compenser"],
    correctIndex: 0,
  },
  {
    question: "Quelle trame sécurise la passation entre deux shifts de réception ?",
    options: ["Un échange oral si le temps le permet", "Une trame écrite : arrivées, départs, incidents en cours, demandes clients, consignes", "Un message vocal", "Le seul planning d'occupation"],
    correctIndex: 1,
  },
  {
    question: "Un client agressif hausse la voix devant d'autres clients. Votre première action :",
    options: ["Répondre sur le même ton", "Isoler la situation, rester factuel et calme, puis écouter et reformuler", "Ignorer le client", "Accepter immédiatement toutes ses demandes"],
    correctIndex: 1,
  },
  {
    question: "Fuite d'eau en chambre occupée pendant le séjour. La démarche complète est :",
    options: ["Sécuriser, informer le client, reloger si nécessaire, tracer l'incident, alerter la maintenance", "Attendre le départ du client", "Intervenir discrètement sans informer", "Facturer le dérangement"],
    correctIndex: 0,
  },
  {
    question: "Comment sécurise-t-on un point critique d'exploitation (chaîne du froid) ?",
    options: ["Procédure écrite + relevé de contrôle tracé + responsable désigné par service", "Confiance dans l'habitude des équipes", "Contrôle uniquement en cas d'audit", "Réduction des stocks"],
    correctIndex: 0,
  },
  {
    question: "Quel indicateur mesure l'amélioration de la coordination entre services ?",
    options: ["La baisse des réclamations liées à une information non transmise", "Le nombre de couverts servis", "Le taux d'occupation du parking", "Le nombre d'heures travaillées"],
    correctIndex: 0,
  },
  {
    question: "Dans la priorisation, que traite-t-on en premier ?",
    options: ["L'urgent à impact client présent, puis l'important différable", "L'administratif du matin", "Les tâches les plus rapides", "Ce que demande le dernier interlocuteur"],
    correctIndex: 0,
  },
  {
    question: "Quel réflexe traduit l'appropriation de l'amélioration continue à votre poste ?",
    options: ["Signaler et tracer, proposer une action corrective, vérifier son effet", "Corriger seul sans informer l'équipe", "Attendre une consigne écrite de la direction", "Reporter au bilan annuel"],
    correctIndex: 0,
  },
];

/* ------------------------------------------------------------------ */
/* Contenu : cas pratiques rédigés (mise en situation)                 */
/* ------------------------------------------------------------------ */

interface CasPratique {
  intitule: string;
  attendu: string;
}

const CAS_EX1: CasPratique[] = [
  {
    intitule:
      "Mise en situation – Un client arrive à 14h30 : sa chambre n'est pas prête, la réception n'a pas été informée du retard des étages. Décrivez le parcours client concerné, les points de contact impactés et les informations qui auraient dû circuler.",
    attendu:
      "identifier les points de contact (réservation, arrivée, remise de clé), qualifier le dysfonctionnement comme organisationnel entre réception et hébergement, et proposer une transmission écrite des chambres libérées / recouches avec un point d'étape à 13h",
  },
  {
    intitule:
      "Analyse – Relevez trois sources d'insatisfaction observées dans votre établissement et rattachez chacune au service concerné ainsi qu'à son impact sur la qualité de service.",
    attendu:
      "citer des sources concrètes (attente au check-in, propreté d'une salle de bain, petit-déjeuner non réapprovisionné), les rattacher au service responsable et décrire l'impact client (avis en ligne, réclamation, perte de fidélité)",
  },
];

const CAS_EX2: CasPratique[] = [
  {
    intitule:
      "Mise en situation – Vous ouvrez le service de 7h : 15 petits-déjeuners, deux départs anticipés, un fournisseur à réceptionner et un appel de réservation. Classez ces tâches par priorité et justifiez votre ordre.",
    attendu:
      "hiérarchiser l'urgent à impact client (petits-déjeuners et départs) avant le différable (réception fournisseur planifiée, rappel de réservation), et expliquer la logique impact client / délai contraint",
  },
  {
    intitule:
      "Standardisation – Rédigez les étapes d'un standard d'accueil commun à toute l'équipe (arrivée du client jusqu'à la remise de clé), en précisant les délais annoncés.",
    attendu:
      "décrire une trame en étapes (salutation dans les 30 secondes, vérification de la réservation, présentation des services et horaires, délai annoncé si la chambre n'est pas prête, remise de clé et proposition d'accompagnement) applicable par tous",
  },
];

const CAS_FINAL: CasPratique[] = [
  {
    intitule:
      "Mise en situation globale – Un client se plaint au départ : chambre bruyante deux nuits, information non transmise entre les shifts, petit-déjeuner servi en retard. Traitez la réclamation avec la méthode en 4 étapes, puis proposez deux actions correctives durables.",
    attendu:
      "appliquer écouter / reformuler / traiter / vérifier, proposer un geste proportionné, tracer l'incident, puis deux actions correctives (trame de passation écrite entre shifts, blocage des chambres sensibles ou renfort au service du matin) avec un indicateur de suivi",
  },
  {
    intitule:
      "Transfert au poste – Identifiez un point critique d'exploitation de votre établissement et décrivez la procédure de sécurisation que vous mettrez en place à votre retour (qui, quoi, quand, quelle trace).",
    attendu:
      "choisir un point critique réel (chaîne du froid, remise des clés, gestion des objets trouvés, sécurité incendie), définir un responsable, une fréquence de contrôle, un support de traçabilité et une remontée en cas d'écart",
  },
];

/* ------------------------------------------------------------------ */
/* Trajectoire de notes (cohérence des 5 documents)                    */
/* ------------------------------------------------------------------ */

export interface BahoTrajectoire {
  posDebut: number;
  ex1: number;
  ex2: number;
  final: number;
  posFin: number;
}

/**
 * Trajectoire /10 : positionnement début (≤7) → ex. J1 → ex. J2 → évaluation finale → positionnement fin (≥7).
 * Croissance globale avec variations naturelles (paliers, petits reculs jamais sous le niveau d'entrée).
 */
export function bahoTrajectoire(s: BahoStagiaire, si: number, ctx = ""): BahoTrajectoire {
  const { debut, fin } = bahoScores(s, si, ctx);
  const r1 = seedOf(s, si, 6101, ctx) % 3; // 0..2
  const r2 = seedOf(s, si, 6203, ctx) % 3;
  const r3 = seedOf(s, si, 6307, ctx) % 4;

  // Jour 1 : proche du niveau d'entrée (un stagiaire faible ne peut pas exceller d'emblée)
  const ex1 = Math.max(3, Math.min(fin - 1, debut + (r1 === 2 ? 1 : 0)));
  // Jour 2 : appuie sur les acquis du J1 → +1 à +2, plafonné par le niveau de fin
  const ex2 = Math.max(ex1, Math.min(fin, ex1 + 1 + (r2 === 0 ? 1 : 0)));
  // Évaluation finale : au niveau de fin, avec parfois un point de moins (variation naturelle)
  const final = Math.max(ex2, Math.min(fin, ex2 + 2, fin - (r3 === 0 ? 1 : 0)));

  return { posDebut: debut, ex1, ex2, final, posFin: fin };
}

/* ------------------------------------------------------------------ */
/* Points faibles suivis d'un document à l'autre                        */
/* ------------------------------------------------------------------ */

const POINTS_FAIBLES = [
  "la transmission écrite des informations entre la réception et les étages",
  "la hiérarchisation des tâches lorsque plusieurs demandes arrivent en même temps",
  "la reformulation de la demande du client avant de proposer une solution",
  "la traçabilité des incidents (rien n'est écrit, tout reste oral)",
  "l'annonce d'un délai réaliste au client lorsque la chambre n'est pas prête",
  "la distinction entre l'urgent à impact client et l'important différable",
];

function pointFaible(s: BahoStagiaire, si: number, ctx: string): string {
  return POINTS_FAIBLES[seedOf(s, si, 7411, ctx) % POINTS_FAIBLES.length];
}

/* ------------------------------------------------------------------ */
/* Appréciations formateur : bandes de notes + variantes rédigées       */
/* ------------------------------------------------------------------ */

function band(note: number): "faible" | "moyen" | "bon" | "tresbon" {
  if (note <= 4) return "faible";
  if (note <= 6) return "moyen";
  if (note <= 8) return "bon";
  return "tresbon";
}

/** Observations concrètes ajoutées en fin d'appréciation : le ton suit la note */
const DETAILS: Record<string, string[]> = {
  faible: [
    "Participation en retrait pendant la mise en situation ; les réponses restent au niveau du constat.",
    "Le vocabulaire professionnel (point de contact, dysfonctionnement, traçabilité) est encore employé de façon approximative.",
    "Travail à reprendre avec le support de cours, partie « circulation de l'information ».",
    "Rendu incomplet : la deuxième mise en situation n'a été traitée qu'en partie.",
    "S'appuie beaucoup sur l'habitude du poste, peu sur la méthode vue en salle.",
    "Un accompagnement du responsable de service sera utile lors du retour au poste.",
  ],
  moyen: [
    "Bonne participation orale, mais l'écrit reste moins structuré que le raisonnement exprimé en séance.",
    "Les exemples cités sont tirés de l'établissement, ce qui rend l'analyse concrète ; la formalisation reste à développer.",
    "Raisonnement juste dans l'ensemble, avec une justification parfois trop courte.",
    "A su corriger sa réponse après échange avec le groupe.",
    "Le lien entre la cause et l'effet est posé, la solution proposée manque encore de précision opérationnelle.",
    "Rythme de travail régulier, rendu dans le temps imparti.",
  ],
  bon: [
    "Rendu clair, structuré en étapes, directement exploitable par un collègue.",
    "A pris l'initiative de proposer un support de traçabilité non demandé dans la consigne.",
    "Contribution utile au travail de groupe : a reformulé la consigne pour l'ensemble de la table.",
    "Les exemples mobilisés (check-in, petit-déjeuner, lingerie) montrent une bonne connaissance de l'exploitation.",
    "Argumentation appuyée sur les échanges de la matinée, sans se contenter de recopier le support.",
    "Rendu dans les délais, écriture professionnelle et synthétique.",
  ],
  tresbon: [
    "Sert de référence au groupe : sa trame a été reprise lors de la restitution collective.",
    "Sait passer du cas particulier à la règle générale applicable à toute l'équipe.",
    "Propose spontanément un indicateur de suivi pour vérifier l'effet de l'action.",
    "Rendu remarquable de rigueur : chaque étape est associée à un responsable et à un délai.",
  ],
};

function withDetail(text: string, note: number, s: BahoStagiaire, si: number, ctx: string, salt: number): string {
  const pool = DETAILS[band(note)];
  return `${text} ${pool[seedOf(s, si, salt, ctx) % pool.length]}`;
}


function appreciation(
  kind: BahoDocKind,
  note: number,
  traj: BahoTrajectoire,
  s: BahoStagiaire,
  si: number,
  ctx: string
): string {
  const pf = pointFaible(s, si, ctx);
  const b = band(note);
  const nom = `${civiliteOf(s)} ${(s.nom || "").toUpperCase()}`;

  if (kind === "ex1") {
    const pool: Record<string, string[]> = {
      faible: [
        `${note}/10. Le parcours client est identifié de façon partielle : les points de contact « réservation » et « départ » ont été oubliés dans le cas de la chambre non prête. Le dysfonctionnement est décrit comme une faute individuelle alors qu'il est organisationnel. Point à travailler en priorité : ${pf}.`,
        `Note de ${note}/10. La distinction entre dysfonctionnement technique et dysfonctionnement organisationnel n'est pas encore acquise ; l'analyse s'arrête au constat sans remonter à la cause. ${nom} devra consolider ${pf} avant la mise en pratique du jour 2.`,
      ],
      moyen: [
        `${note}/10. Les trois sources d'insatisfaction relevées sont concrètes (attente au check-in, propreté salle de bain, petit-déjeuner non réapprovisionné) et bien rattachées à un service. En revanche, l'impact client reste décrit en termes généraux. À renforcer : ${pf}.`,
        `Résultat de ${note}/10 : bonne lecture de l'organisation des services et des interactions réception / hébergement. Le lien entre le dysfonctionnement répété et sa cause à la source reste à formaliser, notamment sur ${pf}.`,
      ],
      bon: [
        `${note}/10. Analyse solide du cas « chambre non prête à 14h30 » : points de contact correctement listés, responsabilité située au niveau de la coordination et non de la personne, et proposition pertinente d'un point d'étape à 13h. Reste à affiner ${pf}.`,
        `Bon travail, ${note}/10. Le parcours client est reconstitué de bout en bout et les trois sources d'insatisfaction sont hiérarchisées par impact. Vigilance maintenue sur ${pf}.`,
      ],
      tresbon: [
        `${note}/10. Maîtrise déjà nette de la lecture organisationnelle : le cas de la chambre non prête est traité comme un défaut de circulation d'information, avec une solution opérationnelle immédiatement applicable. Seul axe résiduel : ${pf}.`,
      ],
    };
    return withDetail(pool[b][seedOf(s, si, 8101, ctx) % pool[b].length], note, s, si, ctx, 8111);
  }

  if (kind === "ex2") {
    const rappel =
      traj.ex2 > traj.ex1
        ? `Progression visible par rapport à l'exercice du jour 1 (${traj.ex1}/10).`
        : `Résultat au même niveau que l'exercice du jour 1 (${traj.ex1}/10).`;
    const pool: Record<string, string[]> = {
      faible: [
        `${note}/10. ${rappel} Le classement des tâches du service de 7h place la réception fournisseur avant les départs anticipés : la logique « impact client présent » n'est pas encore appliquée. Le standard d'accueil rédigé reste sans délai annoncé. ${pf} demeure le principal frein.`,
        `Note de ${note}/10. ${rappel} La priorisation est faite par ordre d'arrivée des demandes et non par impact. Le standard d'accueil est trop court pour être applicable par un nouvel arrivant. À reprendre : ${pf}.`,
      ],
      moyen: [
        `${note}/10. ${rappel} La priorisation est correcte sur les deux premières tâches (petits-déjeuners, départs) mais l'appel de réservation est traité trop tard. Le standard d'accueil comporte les étapes clés, sans les délais annoncés. Poursuivre l'effort sur ${pf}.`,
        `Résultat de ${note}/10. ${rappel} Bonne appropriation du briefing d'avant-service ; la notion d'important différable reste hésitante. ${pf} progresse mais n'est pas stabilisé.`,
      ],
      bon: [
        `${note}/10. ${rappel} Priorisation justifiée avec la bonne logique (urgent à impact client, puis différable) et standard d'accueil directement utilisable : salutation, vérification de la réservation, délai annoncé, remise de clé. ${pf} est en nette amélioration.`,
        `Bon niveau, ${note}/10. ${rappel} Les acquis du jour 1 sont réinvestis : le classement des tâches s'appuie sur les points de contact identifiés la veille. Il reste à sécuriser ${pf}.`,
      ],
      tresbon: [
        `${note}/10. ${rappel} Exercice traité avec méthode : hiérarchisation argumentée, standard d'accueil complet avec délais chiffrés et indicateur de contrôle proposé. ${pf} n'est plus un point de blocage.`,
      ],
    };
    return withDetail(pool[b][seedOf(s, si, 8203, ctx) % pool[b].length], note, s, si, ctx, 8213);
  }

  // Évaluation finale : le point faible est soit levé, soit signalé comme persistant
  const leve = traj.final - traj.ex1 >= 2;
  const echo = leve
    ? `Le point relevé lors des exercices — ${pf} — est cette fois traité correctement.`
    : `Le point relevé lors des exercices — ${pf} — reste partiellement acquis et devra être suivi au poste.`;
  const pool: Record<string, string[]> = {
    faible: [
      `${note}/10. La méthode de traitement des réclamations est citée mais appliquée dans le désordre (solution proposée avant reformulation). Les deux actions correctives attendues ne sont pas assorties d'un indicateur de suivi. ${echo}`,
    ],
    moyen: [
      `${note}/10. La réclamation du client au départ est traitée dans le bon ordre, mais la vérification de la satisfaction est omise. Une seule action corrective durable est proposée (trame de passation) sans responsable désigné. ${echo}`,
      `Note de ${note}/10. Les incidents (chambre bruyante, retard au service du matin) sont correctement qualifiés ; la sécurisation du point critique choisi reste décrite sans fréquence de contrôle. ${echo}`,
    ],
    bon: [
      `${note}/10. Réclamation traitée avec les 4 étapes, geste commercial proportionné et deux actions correctives pertinentes : trame de passation écrite entre shifts et renfort au service du petit-déjeuner. Le point critique retenu (remise des clés) est assorti d'un responsable et d'une traçabilité. ${echo}`,
      `Bon résultat, ${note}/10. L'analyse relie clairement l'insatisfaction du client à un défaut de transmission entre shifts, et la procédure proposée est applicable dès le retour au poste. ${echo}`,
    ],
    tresbon: [
      `${note}/10. Évaluation finale maîtrisée : méthode en 4 étapes appliquée avec rigueur, traçabilité de l'incident, deux actions correctives avec indicateur (nombre de réclamations liées à une information non transmise) et procédure de sécurisation complète (qui, quoi, quand, quelle trace). ${echo}`,
    ],
  };
  return withDetail(pool[b][seedOf(s, si, 8307, ctx) % pool[b].length], note, s, si, ctx, 8317);
}

/* ------------------------------------------------------------------ */
/* Rendu HTML                                                          */
/* ------------------------------------------------------------------ */

const META: Record<BahoDocKind, { titre: string; qcm: AIQCMQuestion[]; cas: CasPratique[]; dayIdx: number; themes: string[] }> = {
  ex1: {
    titre: "EXERCICE PRATIQUE – JOUR 1",
    qcm: BAHO_QCM_EX1,
    cas: CAS_EX1,
    dayIdx: 1,
    themes: [
      "Organisation des services et répartition des rôles",
      "Interactions réception / hébergement / restauration",
      "Parcours client et points de contact",
      "Typologie des dysfonctionnements et impacts qualité",
      "Transmission de l'information entre services",
    ],
  },
  ex2: {
    titre: "EXERCICE PRATIQUE – JOUR 2",
    qcm: BAHO_QCM_EX2,
    cas: CAS_EX2,
    dayIdx: 2,
    themes: [
      "Organisation des tâches",
      "Priorisation (urgent à impact client / important différable)",
      "Gestion du temps en pic d'activité",
      "Méthodes de travail communes et standardisation",
      "Briefing d'avant-service",
    ],
  },
  final: {
    titre: "ÉVALUATION FINALE DE FORMATION",
    qcm: BAHO_QCM_FINAL,
    cas: CAS_FINAL,
    dayIdx: 3,
    themes: [
      "Méthode de traitement des réclamations (4 étapes)",
      "Passation écrite entre shifts et coordination inter-services",
      "Gestion des incidents et sécurisation des points critiques",
      "Posture professionnelle en situation sensible",
      "Priorisation et amélioration continue (indicateurs)",
    ],
  },
};

/** Répartit la note /10 entre QCM et cas pratiques */
function splitNote(note: number, nbQcm: number, nbCas: number): { qcmPts: number; casPts: number[] } {
  const qcmMax = nbQcm;
  const casMaxTotal = 10 - qcmMax;
  const qcmPts = Math.max(0, Math.min(qcmMax, Math.round((note * qcmMax) / 10)));
  let reste = Math.max(0, Math.min(casMaxTotal, note - qcmPts));
  const perCas = Math.floor(casMaxTotal / nbCas);
  const casPts: number[] = [];
  for (let i = 0; i < nbCas; i++) {
    const max = i === nbCas - 1 ? casMaxTotal - perCas * (nbCas - 1) : perCas;
    const v = Math.min(max, reste);
    casPts.push(v);
    reste -= v;
  }
  return { qcmPts, casPts };
}

function buildHTML(e: BahoEntreprise, s: BahoStagiaire, si: number, kind: BahoDocKind, customFsStamp?: string): string {
  const days = getThreeWorkingDays(e.dateDebut);
  const date = kind === "ex1" ? days[0] || e.dateDebut : kind === "ex2" ? days[1] || e.dateDebut : days[2] || e.dateFin;
  const ctx = e.siret || e.nom;
  const traj = bahoTrajectoire(s, si, ctx);
  const target = kind === "ex1" ? traj.ex1 : kind === "ex2" ? traj.ex2 : traj.final;
  const meta = META[kind];

  const { qcmPts, casPts } = splitNote(target, meta.qcm.length, meta.cas.length);
  const raw = answersForQCM(meta.qcm, pseudoIndex(s, si, ctx + kind), asStagiaireInfo(s, ctx + kind), kind === "ex1" ? "debut" : "fin", false, qcmPts);
  const answers = diversifyWrong(meta.qcm, raw, s, si, kind === "ex1" ? 9101 : kind === "ex2" ? 9203 : 9307, ctx + kind);
  const qcmObtained = answers.reduce((a, v, i) => a + (v === meta.qcm[i].correctIndex ? 1 : 0), 0);
  const casTotal = casPts.reduce((a, v) => a + v, 0);
  const note = qcmObtained + casTotal;

  const fullName = `${civiliteOf(s)} ${(s.nom || "").toUpperCase()} ${s.prenom || ""}`.trim();
  const casMaxTotal = 10 - meta.qcm.length;
  const perCasMax = Math.floor(casMaxTotal / meta.cas.length);

  const qcmRows = meta.qcm
    .map((q, qi) => {
      const chosen = answers[qi];
      const ok = chosen === q.correctIndex;
      const opts = q.options.map((o, oi) => `<div>${oi === chosen ? "☒" : "☐"} <strong>${letter(oi)}.</strong> ${o}</div>`).join("");
      return `
      <tr>
        <td style="width:4%; text-align:center; font-weight:bold; background:#f6f8fc;">${qi + 1}</td>
        <td style="width:54%;"><strong>${q.question}</strong><div style="margin-top:6px;">${opts}</div></td>
        <td style="width:12%; text-align:center;">${letter(chosen)}</td>
        <td style="width:10%; text-align:center; font-weight:bold; color:${ok ? "#1a6e3a" : "#a12a2a"};">${ok ? "1" : "0"}</td>
        <td style="width:20%; font-size:10pt; font-style:italic;">${humanizedQCMComment(ok, asStagiaireInfo(s, ctx + kind), si, meta.dayIdx + qi)}</td>
      </tr>`;
    })
    .join("");

  const casBlocks = meta.cas
    .map((c, ci) => {
      const max = ci === meta.cas.length - 1 ? casMaxTotal - perCasMax * (meta.cas.length - 1) : perCasMax;
      const quality = max > 0 ? casPts[ci] / max : 0;
      const reponse = humanizedStudentAnswer(c.attendu, asStagiaireInfo(s, ctx + kind + ci), si, meta.dayIdx * 3 + ci, quality);
      return `
      <div style="margin-top:14px; border:1px solid #ccd6e6; padding:10px 12px;">
        <p style="margin:0 0 6px;"><strong>Cas pratique ${ci + 1} (${max} pts) :</strong> ${c.intitule}</p>
        <p style="margin:0 0 6px;"><strong>Réponse du stagiaire :</strong> <em>${reponse}</em></p>
        <p style="margin:0;"><strong>Points attribués :</strong> ${casPts[ci]}/${max}</p>
      </div>`;
    })
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}
  <style>
    .qcm-table th { background:#1a3a6e; color:#fff; text-align:center; }
    .score-box { margin-top:16px; padding:10px 14px; border-left:4px solid #1a3a6e; background:#f6f8fc; }
  </style>
  </head><body>
  ${header()}
  <h1>${meta.titre}</h1>
  <p style="text-align:center; font-style:italic; color:#555;">Action de formation en présentiel intra-entreprise – 21 heures sur 3 jours</p>

  <p><strong>Intitulé :</strong> ${BAHO_INTITULE}<br/>
  <strong>Organisme :</strong> ${FORMAT_SPHERE_ORG.nom} – SIRET ${FORMAT_SPHERE_ORG.siret} – NDA ${FORMAT_SPHERE_ORG.nda}<br/>
  <strong>Entreprise bénéficiaire :</strong> ${e.nom} – SIRET ${e.siret}<br/>
  <strong>Formateur :</strong> Paolo FEOLA<br/>
  <strong>Stagiaire :</strong> ${fullName}${s.emploi ? ` – ${s.emploi}` : ""} (code ${s.codeStagiaire})<br/>
  <strong>Date :</strong> ${formatDateLong(date)}</p>

  <p style="font-size:10pt;"><em>Thèmes évalués : ${meta.themes.join(" • ")}.</em></p>

  <h2>Partie 1 – Questions à choix unique (${meta.qcm.length} pts)</h2>
  <table class="qcm-table">
    <thead>
      <tr><th>N°</th><th>Question et propositions</th><th>Réponse</th><th>Note</th><th>Commentaire du stagiaire</th></tr>
    </thead>
    <tbody>${qcmRows}</tbody>
  </table>

  <h2>Partie 2 – Mises en situation (${casMaxTotal} pts)</h2>
  ${casBlocks}

  <div class="score-box">
    <p><strong>Note finale :</strong> ${note}/10 <span style="font-size:10pt; color:#555;">(QCM ${qcmObtained}/${meta.qcm.length} + mises en situation ${casTotal}/${casMaxTotal})</span></p>
    <p><strong>Appréciation du formateur :</strong> ${appreciation(kind, note, traj, s, si, ctx)}</p>
  </div>

  <p style="margin-top:20px;"><strong>Fait à ${(e.adresse || "").split(" ").slice(-1)[0] || FORMAT_SPHERE_ORG.ville}, le ${formatDateLong(date)}</strong></p>

  ${stampsBlock(e, customFsStamp)}

  ${footer()}
  </body></html>`;
}

export function getExerciceJour1HTML(e: BahoEntreprise, s: BahoStagiaire, si: number, customFsStamp?: string): string {
  return buildHTML(e, s, si, "ex1", customFsStamp);
}
export function getExerciceJour2HTML(e: BahoEntreprise, s: BahoStagiaire, si: number, customFsStamp?: string): string {
  return buildHTML(e, s, si, "ex2", customFsStamp);
}
export function getEvaluationFinaleHTML(e: BahoEntreprise, s: BahoStagiaire, si: number, customFsStamp?: string): string {
  return buildHTML(e, s, si, "final", customFsStamp);
}

/** Contrôle interne : trajectoire complète (5 documents) par stagiaire */
export function auditBahoParcours(): Array<{
  entreprise: string;
  stagiaire: string;
  jours: string[];
  collisionJ2Final: boolean;
  notes: BahoTrajectoire;
  appreciationEx1: string;
}> {
  const out: any[] = [];
  for (const e of getBahoEntreprises() as BahoEntreprise[]) {
    const days = getThreeWorkingDays(e.dateDebut);
    e.stagiaires.forEach((s, si) => {
      const ctx = e.siret || e.nom;
      const traj = bahoTrajectoire(s, si, ctx);
      out.push({
        entreprise: e.nom,
        stagiaire: `${s.nom} ${s.prenom}`.trim(),
        jours: days,
        collisionJ2Final: !!days[1] && days[1] === days[2],
        notes: traj,
        appreciationEx1: appreciation("ex1", traj.ex1, traj, s, si, ctx),
      });
    });
  }
  return out;
}
