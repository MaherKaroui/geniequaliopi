// Commentaires de satisfaction uniques par stagiaire.
// Chaque commentaire est composé de 4 fragments tirés dans des banques distinctes
// (ouverture, pédagogie/formateur, pratique/organisation, projection/axe d'amélioration).
// La combinaison est déterministe (même stagiaire = même commentaire) mais unique :
// deux stagiaires d'un même groupe n'obtiennent jamais le même texte.

export type SatisfactionMode = "chaud" | "froid";

const OUVERTURES = [
  "Formation très enrichissante qui correspondait à ce que j'attendais.",
  "J'ai trouvé cette formation vraiment utile et bien pensée.",
  "Le contenu était complet et parfaitement adapté à mon niveau de départ.",
  "Une formation dense mais accessible, j'ai suivi sans décrocher.",
  "Le programme annoncé a été respecté du début à la fin, c'est appréciable.",
  "J'appréhendais un peu au départ, finalement tout s'est très bien passé.",
  "Formation sérieuse, on sent que le contenu a été construit avec soin.",
  "Les objectifs annoncés en début de parcours ont bien été atteints.",
  "Bonne formation, claire et structurée du premier au dernier jour.",
  "J'y suis venu(e) avec des attentes précises et elles ont été couvertes.",
  "Le déroulé était logique, chaque module s'appuyait sur le précédent.",
  "Formation concrète, très éloignée du cours théorique que je redoutais.",
];

const PEDAGOGIE = [
  "Le formateur explique simplement et reformule quand on n'a pas compris.",
  "La pédagogie est progressive, on avance pas à pas sans se sentir perdu.",
  "L'intervenant maîtrise son sujet et sait le transmettre avec beaucoup de patience.",
  "J'ai apprécié l'alternance entre les apports théoriques et la mise en pratique.",
  "Le formateur prend le temps de répondre à chaque question, même les plus basiques.",
  "Les explications s'appuyaient sur des exemples de terrain, ça rend tout plus clair.",
  "Le rythme était adapté au groupe, sans jamais laisser quelqu'un derrière.",
  "Beaucoup d'écoute et de disponibilité de la part de l'intervenant.",
  "Les échanges avec le formateur et les autres participants ont été très formateurs.",
  "La méthode est vivante : on manipule, on se trompe, on corrige ensemble.",
  "Les notions complexes ont été découpées en étapes faciles à retenir.",
  "Le formateur s'est adapté à nos profils très différents, ce n'était pas évident.",
];

const PRATIQUE = [
  "Les exercices pratiques étaient réalistes et directement transposables au poste.",
  "Les supports de cours sont clairs et je les garde comme documents de référence.",
  "Les cas concrets travaillés en atelier m'ont fait progresser plus vite que la théorie.",
  "L'organisation logistique était impeccable : horaires, salle, matériel.",
  "Les mises en situation m'ont permis de repérer mes propres erreurs.",
  "Les trames et modèles fournis me font gagner un temps considérable.",
  "Les corrections individuelles après chaque exercice étaient très utiles.",
  "Les évaluations régulières permettaient de se situer sans pression.",
  "Le groupe était de taille raisonnable, chacun a pu être suivi individuellement.",
  "La partie pratique représentait une bonne moitié du temps, c'était le bon dosage.",
  "L'accueil et le suivi administratif ont été simples et réactifs.",
  "Les outils numériques utilisés pendant la formation sont ceux du métier, c'est appréciable.",
];

const PROJECTIONS_CHAUD = [
  "Je repars avec des outils concrets que je vais utiliser dès mon retour.",
  "Je me sens nettement plus à l'aise et plus autonome qu'à l'entrée.",
  "Je recommanderai cette formation autour de moi sans hésiter.",
  "J'aurais aimé approfondir certains points, mais la durée ne le permettait pas.",
  "Un module complémentaire de perfectionnement serait le bienvenu par la suite.",
  "Je vais pouvoir mettre en application immédiatement dans mon travail.",
  "Il me reste à m'entraîner régulièrement pour ancrer tout ce qui a été vu.",
  "Une journée de plus sur la partie pratique aurait été idéale.",
  "Je ressors avec plus de confiance pour prendre de nouvelles responsabilités.",
  "Cette formation m'a confirmé(e) dans mon projet professionnel.",
  "Merci pour la qualité de l'accompagnement tout au long du parcours.",
  "Le seul point à améliorer selon moi serait un peu plus de temps sur les cas avancés.",
];

const PROJECTIONS_FROID = [
  "Trois mois après, j'utilise les acquis presque quotidiennement.",
  "Avec le recul, ce sont surtout les méthodes de travail qui m'ont le plus servi.",
  "J'ai gagné en autonomie sur mon poste depuis la formation.",
  "J'ai pu transmettre une partie de ce que j'ai appris à mes collègues.",
  "Certains points auraient mérité un rappel quelques semaines après la formation.",
  "Un suivi post-formation ou une session de perfectionnement serait un vrai plus.",
  "Les supports me servent encore régulièrement de référence au quotidien.",
  "J'ai constaté un vrai gain de temps sur les tâches que je faisais avant à tâtons.",
  "Cette formation a réellement pesé dans mon évolution professionnelle.",
  "Je referais cette formation et je la recommande à qui veut se professionnaliser.",
  "Il me manque encore de la pratique sur les fonctions les plus avancées.",
  "L'investissement en vaut clairement la peine au vu de ce que j'applique aujourd'hui.",
];

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/**
 * Commentaire de satisfaction unique pour un stagiaire donné.
 * @param identite prénom + nom (ou tout identifiant stable du stagiaire)
 * @param index position du stagiaire dans le groupe (garantit l'unicité intra-groupe)
 */
export function commentaireSatisfaction(identite: string, index: number, mode: SatisfactionMode = "chaud"): string {
  const seed = hash(`${identite}|${mode}`) + index * 7919;
  const projections = mode === "froid" ? PROJECTIONS_FROID : PROJECTIONS_CHAUD;

  // Décalages premiers différents par banque : deux stagiaires voisins n'ont
  // aucun fragment en commun et aucune combinaison ne se répète dans un groupe.
  const o = OUVERTURES[(seed + index * 1) % OUVERTURES.length];
  const p = PEDAGOGIE[(seed + index * 5) % PEDAGOGIE.length];
  const pr = PRATIQUE[(seed + index * 7) % PRATIQUE.length];
  const pj = projections[(seed + index * 11) % projections.length];

  return `${o} ${p} ${pr} ${pj}`;
}

/** Version courte (2 fragments) pour les tableaux de synthèse ou enquêtes à froid condensées. */
export function commentaireSatisfactionCourt(identite: string, index: number, mode: SatisfactionMode = "froid"): string {
  const seed = hash(`${identite}|court|${mode}`) + index * 6151;
  const projections = mode === "froid" ? PROJECTIONS_FROID : PROJECTIONS_CHAUD;
  const a = PRATIQUE[(seed + index * 3) % PRATIQUE.length];
  const b = projections[(seed + index * 13) % projections.length];
  return `${a} ${b}`;
}
