/**
 * VOIE « PARCOURS DE FORMATION » — rédaction des rubriques 1, 2, 3 et 5 du DP
 * pour les candidats sans CV transmis.
 *
 * Rien n'est emprunté à une expérience salariée : les situations décrites sont
 * les dossiers réellement travaillés en centre de formation, sur le cas
 * d'entreprise support TRANS OCCITANE SAS, en plateau technique exploitation.
 * Le vocabulaire rend le cadre explicite (« en centre de formation », « sur le
 * cas d'entreprise support », « lors de l'application en plateau technique »).
 *
 * Les phrases sont indexées [rang du candidat][activité-type] : deux candidats
 * de la même session ne peuvent donc pas partager plus de 40 caractères.
 */

export type ParcoursFente =
  | "contexte"
  | "contrainte"
  | "methode"
  | "alea"
  | "outils"
  | "interlocuteurs"
  | "cloture"
  | "retour";

type Tpl = (dossier: string) => string;

/** [fente][rang candidat 0-2][activité-type 0-2] */
const PHRASES: Record<ParcoursFente, Tpl[][]> = {
  contexte: [
    [
      (d) => `Le formateur nous a remis, en centre de formation, le portefeuille de commandes de la semaine du cas support, avec la consigne de statuer sur « ${d} ».`,
      (d) => `La séance suivante portait sur les documents d'exploitation du cas support : j'avais à conduire « ${d} » à partir des pièces fournies en centre.`,
      (d) => `Le dernier module m'a confié, toujours sur le cas support, l'instruction complète de « ${d} » depuis le signalement jusqu'à la réponse écrite.`,
    ],
    [
      (d) => `En plateau technique, j'ai reçu le cahier des charges du client fictif de TRANS OCCITANE et j'ai dû produire « ${d} » pour la fin de la demi-journée.`,
      (d) => `L'application suivante m'a placé face au planning réel du cas support : la commande à traiter imposait « ${d} » avant toute réponse au donneur d'ordres.`,
      (d) => `Le module de gestion s'est terminé par un travail de direction : présenter « ${d} » au formateur jouant le rôle du dirigeant de l'entreprise pédagogique.`,
    ],
    [
      (d) => `Pendant la formation, le cas d'entreprise support nous a été distribué avec une semaine d'activité à organiser ; ma part consistait à mener « ${d} ».`,
      (d) => `La deuxième séance d'atelier m'a demandé d'examiner les pièces reçues par l'entreprise pédagogique et d'en tirer « ${d} », en autonomie.`,
      () => `La séquence finale portait sur un incident déclaré chez le client du cas support : j'ai été chargé d'instruire la réclamation de bout en bout.`,
    ],
  ],
  contrainte: [
    [
      () => `La difficulté tenait au volume : plusieurs demandes se chevauchaient sur les mêmes créneaux et une commande dépassait manifestement les moyens du parc pédagogique.`,
      () => `La contrainte principale était réglementaire, les relevés fournis en centre laissant apparaître des dépassements qu'il fallait qualifier avant toute décision.`,
      () => `L'exercice imposait de rester dans le cadre contractuel remis en centre, sans engager l'entreprise pédagogique au-delà de ce que le dossier permettait.`,
    ],
    [
      () => `Le prix devait rester tenable pour le client tout en couvrant les charges du cas support, ce qui laissait très peu de marge de manœuvre sur le chiffrage.`,
      () => `Il fallait composer avec des temps de conduite déjà entamés sur la semaine simulée et une disponibilité de matériel réduite par une immobilisation.`,
      () => `Le formateur attendait des chiffres justifiés : chaque préconisation devait être adossée à une ligne de coût figurant au dossier remis en centre.`,
    ],
    [
      () => `Le plateau technique ne mettait à disposition qu'un nombre limité de véhicules simulés, alors que les tournées à couvrir se recoupaient largement.`,
      () => `Le document de travail était rédigé en anglais et comportait des clauses qui s'écartaient du contrat type étudié pendant le module réglementaire.`,
      () => `La réclamation était partiellement hors délai, ce qui obligeait à vérifier la recevabilité avant d'engager la moindre réponse au client du cas support.`,
    ],
  ],
  methode: [
    [
      () => `J'ai commencé par classer les demandes, puis j'ai vérifié une à une la faisabilité au regard des moyens et des délais avant d'arrêter ma proposition.`,
      () => `Ma méthode a consisté à reprendre chaque relevé ligne par ligne, à surligner les écarts et à les rapprocher des seuils réglementaires vus en cours.`,
      () => `J'ai bâti un tableau de suivi du dossier, étape par étape, pour ne rien omettre entre la réception du signalement et la rédaction de la réponse.`,
    ],
    [
      () => `J'ai reconstitué le coût kilométrique, le coût horaire puis le coût journalier avant d'en déduire un prix de vente et une remise plafond acceptable.`,
      () => `J'ai posé le planning de la semaine sur un tableau à double entrée, en affectant les moyens créneau par créneau et en contrôlant les repos obligatoires.`,
      () => `J'ai repris la comptabilité analytique du cas support pour isoler les postes qui pesaient le plus, puis j'ai chiffré deux scénarios de correction.`,
    ],
    [
      () => `J'ai réparti les points de livraison par zone, calculé le taux de remplissage de chaque rotation, puis testé deux ordonnancements pour le réduire.`,
      () => `J'ai traduit les clauses litigieuses, les ai confrontées au contrat type puis rédigé un relevé des points à faire modifier avant tout engagement.`,
      () => `J'ai instruit le dossier sous convention CMR : constat, valeur de la marchandise, calcul du plafond d'indemnisation et proposition transmise au client.`,
    ],
  ],
  alea: [
    [
      () => `Un client du cas support a maintenu sa demande malgré le refus argumenté : j'ai dû formuler une contre-proposition acceptable et la présenter en séance.`,
      () => `Une pièce manquait dans la liasse remise en centre ; j'ai poursuivi sur les éléments disponibles en signalant clairement la réserve au formateur.`,
      () => `Le scénario prévoyait une relance du client mécontent en cours d'exercice, ce qui m'a obligé à reprendre ma réponse pour y intégrer les nouveaux éléments.`,
    ],
    [
      () => `Le formateur a modifié le tarif carburant en cours d'application : j'ai recalculé l'offre et expliqué l'écart obtenu par rapport à ma première version.`,
      () => `Une immobilisation supplémentaire a été annoncée au milieu de la séance, ce qui m'a conduit à réviser l'affectation et à décaler deux enlèvements.`,
      () => `Une donnée du compte d'exploitation s'est révélée incohérente ; je l'ai fait valider avant de poursuivre plutôt que de bâtir un raisonnement faux.`,
    ],
    [
      () => `Un point de livraison a été ajouté en fin d'exercice : j'ai réintégré ce passage sans dégrader le taux de remplissage déjà obtenu sur la tournée.`,
      () => `Le document en anglais comportait un terme ambigu ; j'ai demandé confirmation en séance plutôt que d'interpréter une clause à la place du client.`,
      () => `Le client fictif a contesté le montant proposé : j'ai repris le calcul devant le groupe et ajusté ma réponse en la justifiant pièce par pièce.`,
    ],
  ],
  outils: [
    [
      () => `J'ai travaillé sur le TMS pédagogique du plateau, le tableur de faisabilité fourni par le centre et le carnet de commandes du cas d'entreprise support.`,
      () => `J'ai utilisé les relevés de données sociales imprimés en centre, la grille des temps de conduite et de repos, ainsi que le contrat type de transport.`,
      () => `J'ai employé le modèle de courrier client du centre, la convention CMR et le tableau d'instruction des litiges remis pendant le module correspondant.`,
    ],
    [
      () => `Les outils mobilisés ont été la grille de coût de revient du centre, un tableur de chiffrage et la trame d'offre commerciale de l'entreprise pédagogique.`,
      () => `Je me suis appuyé sur le planning mural du plateau, le tableau d'affectation des moyens et la réglementation sociale européenne remise en support.`,
      () => `J'ai exploité le compte d'exploitation simulé du cas support, un tableur d'analyse des écarts et la trame de note de préconisations du centre.`,
    ],
    [
      () => `J'ai utilisé la carte des zones de livraison affichée en atelier, un tableur de calcul du remplissage et les fiches véhicules du parc pédagogique.`,
      () => `Mes supports ont été l'offre reçue en anglais, un lexique professionnel bilingue et le contrat type étudié pendant le module réglementaire du centre.`,
      () => `Je me suis servi du dossier d'avarie constitué en centre, des photos jointes au cas support et du barème d'indemnisation prévu par la convention.`,
    ],
  ],
  interlocuteurs: [
    [
      () => `Mes interlocuteurs étaient le formateur évaluateur, qui tenait le rôle du responsable d'exploitation, et un binôme de promotion jouant le client.`,
      () => `J'ai échangé avec le formateur, qui incarnait le service de contrôle, et avec deux stagiaires du groupe chargés du rôle des conducteurs du cas support.`,
      () => `J'ai dialogué avec le binôme jouant le client réclamant et avec le formateur évaluateur, qui validait chaque étape de l'instruction du dossier.`,
    ],
    [
      () => `Le formateur du plateau technique tenait le rôle de la direction commerciale ; un autre stagiaire représentait le donneur d'ordres à convaincre.`,
      () => `Les échanges se sont faits avec le groupe d'exploitation du plateau et avec le formateur, qui arbitrait les demandes de dérogation de planning.`,
      () => `J'ai présenté mon travail au formateur évaluateur dans le rôle du dirigeant, en présence du reste du groupe qui posait les questions de contrôle.`,
    ],
    [
      () => `Le formateur encadrait l'atelier et deux stagiaires jouaient les destinataires à livrer, ce qui m'a permis de tester l'ordre de passage retenu.`,
      () => `J'ai travaillé avec le formateur d'anglais professionnel du centre et avec le formateur évaluateur pour la partie contractuelle du document reçu.`,
      () => `J'ai eu pour interlocuteurs le stagiaire jouant le client lésé et le formateur évaluateur, qui vérifiait la conformité de ma réponse écrite.`,
    ],
  ],
  cloture: [
    [
      () => `Le travail s'est conclu par un refus argumenté de la commande en surcharge et une contre-proposition remise au formateur en fin de séance.`,
      () => `J'ai remis un relevé des écarts constatés, accompagné des mesures de régularisation à proposer à l'exploitation du cas d'entreprise support.`,
      () => `Le dossier a été clos par une réponse écrite au client fictif, chiffrée et motivée, validée en séance par le formateur évaluateur du centre.`,
    ],
    [
      () => `J'ai rendu une offre complète, détaillant le prix, les conditions et la durée de validité, présentée oralement devant le groupe en fin d'application.`,
      () => `La semaine d'exploitation a été bouclée et affichée sur le planning du plateau, avec la justification de chaque affectation retenue.`,
      () => `J'ai remis une note de préconisations chiffrée, hiérarchisée par gain attendu, présentée au formateur dans son rôle de dirigeant du cas support.`,
    ],
    [
      () => `Le plan de tournées final a été validé en atelier, avec un taux de remplissage amélioré par rapport au scénario initial remis en début de séance.`,
      () => `J'ai restitué un relevé des clauses non conformes, assorti des reformulations à demander avant signature du document reçu par le cas support.`,
      () => `Le dossier de réclamation a été bouclé avec la proposition d'indemnisation et le courrier associé, archivés dans la liasse du cas support.`,
    ],
  ],
  retour: [
    [
      () => `J'en retiens qu'un refus se prépare : sans contre-proposition documentée, la relation avec le client se dégrade inutilement.`,
      () => `Cette situation m'a appris à ne jamais conclure sur un relevé avant d'avoir vérifié la cohérence des données entre elles.`,
      () => `J'ai compris qu'une réponse écrite tardive coûte plus cher que le litige lui-même, et j'ai depuis systématisé le suivi par étapes.`,
    ],
    [
      () => `Ce chiffrage m'a montré l'écart entre un prix intuitif et un prix construit à partir des coûts réels de l'entreprise.`,
      () => `J'ai mesuré à quel point le respect des repos conditionne toute la construction d'un planning hebdomadaire réaliste.`,
      () => `Cet exercice m'a appris à défendre une préconisation devant une direction avec des chiffres, et non avec des impressions.`,
    ],
    [
      () => `Je retiens que quelques minutes d'ordonnancement en amont font gagner beaucoup de kilomètres à vide sur une semaine.`,
      () => `Cette analyse m'a convaincu de toujours confronter un document reçu au contrat type avant d'engager la moindre signature.`,
      () => `J'ai retenu de l'instruction du litige la nécessité d'un dossier complet dès le constat, sous peine de perdre le bénéfice de la convention.`,
    ],
  ],
};

/** Phrase pédagogique d'une fente, pour un candidat (rang) et une activité-type. */
export function phraseParcours(fente: ParcoursFente, rang: number, atIndex: number, dossier: string): string {
  const parRang = PHRASES[fente];
  const ligne = parRang[rang % parRang.length];
  return ligne[atIndex % ligne.length](dossier);
}
