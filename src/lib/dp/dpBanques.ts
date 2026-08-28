/**
 * Banques de phrases du moteur unique DP (45A).
 *
 * Les rubriques 1, 2, 3 et 5 ne sont plus des paragraphes fixes à deux variables :
 * elles sont recomposées à partir de FENTES indépendantes tirées séparément
 * (contexte, contrainte, méthode, outils, aléa, clôture, interlocuteurs, retour
 * d'expérience). Chaque fente a sa propre banque, ce qui rend improbable la
 * réapparition d'un même bloc de plus de 40 caractères d'un dossier à l'autre.
 *
 * Aucune banque ne contient de nom d'entreprise réelle : le DP est signé sous
 * déclaration sur l'honneur, on n'y attribue jamais une expérience à une société
 * nommée qui n'a rien demandé.
 */

import type { FormationInfo } from "@/types/qualiopi";

export interface DpBanque {
  secteur: string;
  intitules: string[];
  contexte: string[];
  contrainte: string[];
  methode: string[];
  outils: string[];
  alea: string[];
  cloture: string[];
  interlocuteurs: string[];
  retour: string[];
}

const GENERIQUE: Omit<DpBanque, "secteur" | "intitules"> = {
  contexte: [
    "La demande m'est arrivée en début de semaine, avec un délai serré et peu d'éléments écrits au départ.",
    "Le dossier m'a été confié à la suite d'un changement d'organisation dans le service.",
    "J'ai repris ce sujet en cours de route, après le départ du collègue qui le suivait.",
    "L'opération faisait suite à une réclamation qui avait été mal traitée le mois précédent.",
    "La direction m'a demandé de reprendre ce point après une remontée d'un partenaire.",
    "J'ai été sollicité un vendredi après-midi, pour une réponse attendue le lundi matin.",
    "Le besoin est apparu pendant une période de forte activité, avec des effectifs réduits.",
    "Cette mission s'est présentée alors que nous testions une nouvelle procédure interne.",
  ],
  contrainte: [
    "La principale difficulté était de tenir le délai sans dégrader la qualité attendue.",
    "Je devais composer avec un budget déjà arrêté et non négociable.",
    "Deux services avaient des attentes contradictoires qu'il fallait concilier.",
    "Les informations de départ étaient incomplètes et devaient être fiabilisées avant toute décision.",
    "Un cadre réglementaire précis s'imposait et laissait peu de marge d'interprétation.",
    "L'effectif disponible ce jour-là ne permettait pas de traiter le dossier de façon classique.",
    "Il fallait garder une traçabilité écrite complète, car le dossier pouvait être contrôlé.",
    "Le calendrier dépendait d'un tiers sur lequel je n'avais aucune prise directe.",
  ],
  methode: [
    "J'ai commencé par reprendre la demande point par point et par lister ce qui manquait.",
    "J'ai construit un tableau comparatif pour objectiver les options avant d'arbitrer.",
    "J'ai découpé la mission en étapes et posé une date cible pour chacune d'elles.",
    "J'ai repris les procédures internes pour vérifier que ma solution restait conforme.",
    "J'ai chiffré deux hypothèses et je les ai présentées à ma hiérarchie pour décision.",
    "J'ai commencé par un point rapide avec les personnes concernées pour cadrer le besoin réel.",
    "J'ai rédigé une note de cadrage courte, validée avant de lancer l'exécution.",
    "J'ai vérifié les données sources une par une avant de m'en servir pour décider.",
  ],
  outils: [
    "un tableur pour les calculs et le suivi, un traitement de texte pour les documents remis",
    "l'outil métier interne, un tableur de suivi et la messagerie professionnelle",
    "les trames internes de l'entreprise, un tableur de comparaison et un agenda partagé",
    "une base documentaire interne, un tableur et les modèles de courrier validés",
    "un espace partagé pour les pièces, un tableur de pilotage et le téléphone",
    "les procédures qualité, un tableur de contrôle et un outil de reporting",
  ],
  alea: [
    "En cours d'exécution, un des interlocuteurs a modifié sa demande, ce qui m'a obligé à reprendre une partie du travail.",
    "Un retard imprévu est intervenu et j'ai dû prévenir immédiatement pour éviter la mauvaise surprise.",
    "Une pièce manquante a bloqué le dossier deux jours ; je l'ai relancée par écrit puis par téléphone.",
    "Une erreur de saisie repérée en relecture a été corrigée avant transmission.",
    "Un désaccord est apparu sur le périmètre ; je l'ai fait trancher par ma hiérarchie plutôt que de décider seul.",
    "Une indisponibilité de dernière minute m'a conduit à réorganiser l'ordre des étapes.",
    "Aucun incident majeur, mais un point de vigilance identifié en cours de route a été signalé.",
  ],
  cloture: [
    "À la fin, j'ai vérifié que chaque engagement était tenu et j'ai classé les pièces du dossier.",
    "J'ai rédigé un court compte rendu remis à ma hiérarchie, avec les écarts constatés.",
    "J'ai clôturé le dossier après validation par le demandeur et archivage des documents.",
    "J'ai fait un point de fin avec les personnes concernées pour valider que le besoin était couvert.",
    "J'ai transmis les éléments au service suivant en signalant les deux points à surveiller.",
    "J'ai mis à jour le tableau de suivi et signalé le dossier comme soldé.",
  ],
  interlocuteurs: [
    "avec mon responsable direct, qui validait les arbitrages",
    "avec deux collègues du service et l'assistante administrative",
    "avec le demandeur, mon responsable et le service administratif",
    "en binôme avec un collègue plus expérimenté, sous la supervision du responsable de service",
    "avec l'équipe opérationnelle et le référent qualité",
    "avec mon tuteur, l'équipe du service et les interlocuteurs externes du dossier",
  ],
  retour: [
    "Ce que je retiens, c'est qu'il vaut mieux poser une question de plus au départ que corriger après coup.",
    "J'ai gardé l'habitude de confirmer par écrit tout accord donné oralement.",
    "Cette mission m'a appris à prévenir tôt quand un délai devient tendu.",
    "J'ai compris qu'un tableau simple mais tenu à jour vaut mieux qu'un outil complexe abandonné.",
    "Je note désormais systématiquement les points de vigilance pour le dossier suivant.",
    "J'ai appris à distinguer ce que je peux décider seul de ce qui doit remonter.",
  ],
};

const TRANSPORT: DpBanque = {
  secteur: "Exploitation transport routier de marchandises",
  intitules: [
    "Traitement d'une demande de transport de lot complet et remise d'une offre chiffrée",
    "Tarification d'un transport sous température dirigée et proposition technique au donneur d'ordres",
    "Affectation des moyens et planification d'une semaine d'exploitation",
    "Recours à l'affrètement et contrôle administratif des sous-traitants",
    "Encadrement des conducteurs et construction des plans de marche",
    "Négociation et contractualisation d'un trafic régulier sous-traité",
    "Supervision d'un arrivage messagerie et optimisation des tournées de distribution",
    "Traitement d'un litige transport avec réserves CMR et suivi de l'indemnisation",
    "Suivi des supports de charge et régularisation d'un compte palettes client",
    "Animation de l'équipe d'exploitation et suivi des obligations sociales",
    "Construction d'un tableau de bord d'exploitation et préconisation de mesures correctives",
    "Gestion d'un aléa d'exploitation et réorganisation d'une tournée en cours de journée",
  ],
  contexte: [
    "La demande est arrivée par mail en fin de journée, pour un chargement le lendemain matin.",
    "Le donneur d'ordres a appelé directement l'exploitation, sans passer par le commercial.",
    "Le dossier concernait un trafic régulier que nous venions de reprendre.",
    "L'opération s'inscrivait dans une période de pointe, avec un parc déjà très sollicité.",
    "Le client venait de signaler un incident sur la livraison précédente, la vigilance était maximale.",
    "Le trafic avait été confié à un sous-traitant qui a fait défaut la veille.",
    "La demande portait sur un secteur géographique que nous couvrions rarement.",
    "Le service venait de changer de TMS, les habitudes n'étaient pas encore prises.",
  ],
  contrainte: [
    "Le rendez-vous de livraison imposé ne laissait aucune marge sur les temps de conduite.",
    "Il fallait respecter la chaîne du froid et tracer les températures de bout en bout.",
    "Le prix demandé par le client était très proche de notre prix de revient.",
    "Aucun véhicule en propre n'était disponible sur le créneau, il fallait affréter.",
    "Les coupures et repos réglementaires interdisaient un aller-retour dans la journée.",
    "Le déchargement dépendait d'un créneau de quai unique chez le destinataire.",
    "La marchandise nécessitait un hayon et un conducteur formé à la manutention.",
    "Un conducteur avec restriction de port de charge devait être pris en compte dans l'affectation.",
  ],
  methode: [
    "J'ai rappelé le client pour compléter les informations manquantes avant tout chiffrage.",
    "J'ai repris le prix de revient kilométrique et je l'ai actualisé avec l'indice gazole du mois.",
    "J'ai vérifié la faisabilité réglementaire (temps de conduite, repos, amplitude) avant de m'engager.",
    "J'ai comparé la solution en propre et deux solutions affrétées avant d'arbitrer.",
    "J'ai contrôlé la licence, l'assurance et l'attestation de vigilance du sous-traitant avant confirmation.",
    "J'ai regroupé deux livraisons proches sur une même tournée pour libérer un véhicule.",
    "J'ai reporté toutes les affectations sur le planning partagé pour que le quai ait la même information.",
    "J'ai reconstitué les mouvements sur trois mois à partir des bons de livraison pour objectiver l'écart.",
  ],
  outils: [
    "le TMS d'exploitation, un tableur pour le prix de revient, un traitement de texte pour l'offre",
    "le TMS, une bourse de fret pour l'affrètement et le tableur de suivi des sous-traitants",
    "le logiciel de téléchargement des cartes conducteurs, le tableur de contrôle RSE et le planning partagé",
    "la lettre de voiture CMR, le dossier litige photos à l'appui et la trame de réponse client",
    "le tableur de tableau de bord, les extractions du TMS et les indices professionnels de référence",
    "le planning hebdomadaire partagé, le téléphone d'exploitation et la messagerie professionnelle",
  ],
  alea: [
    "Une panne en cours de tournée m'a obligé à trouver une solution de substitution dans l'heure.",
    "Un sous-traitant m'a transmis une attestation périmée : j'ai suspendu la commande et prévenu ma hiérarchie.",
    "Le destinataire a refusé une palette abîmée ; j'ai fait porter les réserves sur la CMR.",
    "Un embouteillage imprévu a décalé la livraison ; j'ai informé le client avant qu'il ne nous appelle.",
    "Le volume annoncé au départ était supérieur de deux palettes, j'ai réaffecté un véhicule.",
    "Le créneau de chargement a été décalé de trois heures par l'expéditeur.",
    "Aucun incident sur cette opération, mais j'ai signalé un risque récurrent sur ce créneau.",
  ],
  cloture: [
    "À la clôture, j'ai contrôlé les CMR, levé les réserves et validé la facturation.",
    "J'ai renseigné les indicateurs de ponctualité et de rentabilité du dossier avant archivage.",
    "J'ai fait un point avec le donneur d'ordres pour valider que la prestation était conforme.",
    "J'ai transmis le dossier complet à la facturation avec les justificatifs d'attente.",
    "J'ai alerté ma hiérarchie sur l'écart de marge constaté et proposé un correctif.",
    "J'ai classé les pièces du dossier et mis à jour le suivi des litiges.",
  ],
  interlocuteurs: [
    "avec mon responsable d'exploitation, qui validait le niveau de marge, et le conducteur affecté",
    "avec le chef de quai, les conducteurs de distribution et le service commercial",
    "avec la cellule affrètement, les sous-traitants réguliers et le service facturation",
    "avec l'assistante administrative qui suivait les pièces des affrétés et deux collègues exploitants",
    "avec le service litiges, l'assureur et le service client",
    "avec le service RH et le service paie pour les éléments variables, et l'équipe de conducteurs",
  ],
  retour: [
    "J'ai appris à garder une marge d'un véhicule ou d'un sous-traitant : il y a toujours un imprévu dans la journée.",
    "Le contrôle administratif des sous-traitants est devenu un réflexe, la responsabilité de l'entreprise est engagée.",
    "Sans réserves écrites au moment de la livraison, un litige est très difficile à défendre.",
    "Une indexation gazole écrite dès le départ évite beaucoup de tensions en cours d'année.",
    "Un indicateur n'a de valeur que s'il débouche sur une action concrète.",
    "Répondre vite au client, même pour dire que le dossier est en cours, désamorce la plupart des tensions.",
  ],
};

function domaine(secteur: string, intitules: string[]): DpBanque {
  return { secteur, intitules, ...GENERIQUE };
}

export const DP_BANQUES: Record<string, DpBanque> = {
  transport: TRANSPORT,
  commercial: domaine("Service commercial", [
    "Conquête d'un nouveau client sur le marché B2B",
    "Mise en place d'une démarche de prospection digitale",
    "Négociation d'un contrat-cadre avec un distributeur",
    "Lancement commercial d'une nouvelle gamme",
    "Développement d'un portefeuille de clients PME en région",
    "Traitement d'une réclamation client et plan de fidélisation",
    "Construction d'un argumentaire de vente et suivi des indicateurs",
  ]),
  conduite: domaine("Service pédagogique", [
    "Animation d'une action de sensibilisation à la sécurité routière",
    "Préparation et conduite d'une leçon individuelle",
    "Évaluation pédagogique d'un élève en difficulté et plan d'accompagnement",
    "Organisation d'une action collective de prévention des risques routiers",
    "Encadrement d'une formation post-permis",
    "Construction d'une progression pédagogique individualisée",
  ]),
  management: domaine("Direction / encadrement", [
    "Pilotage de la performance opérationnelle d'une équipe",
    "Mise en place d'un plan d'actions correctives après un audit",
    "Recrutement et intégration d'un nouveau collaborateur",
    "Élaboration et présentation d'un budget prévisionnel",
    "Conduite d'un projet de réorganisation interne",
    "Conduite d'entretiens annuels et plan de développement des compétences",
  ]),
  esthetique: domaine("Service soins et bien-être", [
    "Mise en place d'un protocole de soins adapté en établissement",
    "Animation d'un atelier bien-être pour un public fragilisé",
    "Accompagnement individuel d'une bénéficiaire en parcours de soins",
    "Conception d'une offre de soins adaptée",
    "Mise en œuvre d'un partenariat avec un service de santé",
  ]),
  numerique: domaine("Service développement / numérique", [
    "Développement d'une application web responsive",
    "Migration d'une base de données vers une architecture cloud",
    "Refonte de l'expérience utilisateur d'un site e-commerce",
    "Mise en production d'un module applicatif avec intégration continue",
    "Audit de sécurité et mise en conformité RGPD d'une plateforme",
  ]),
  default: domaine("Service opérations", [
    "Mise en œuvre d'une procédure interne d'amélioration des processus",
    "Conduite d'un projet transversal au sein de la structure",
    "Accompagnement individualisé d'un bénéficiaire",
    "Élaboration d'un plan d'actions annuel",
    "Mise en place d'une démarche qualité et de son suivi",
    "Traitement d'un dysfonctionnement et mise en place d'un correctif",
  ]),
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
