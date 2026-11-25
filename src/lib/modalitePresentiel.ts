// ---------------------------------------------------------------------------
// Session en présentiel d'une formation exemple rédigée pour la classe virtuelle
// (Hygiène alimentaire 14 h, VTC RS5637) : les mentions de la classe virtuelle, de la
// visioconférence et du matériel de connexion passent en version salle de formation.
// Remplacements du plus précis au plus général ; aucun guillemet ni antislash dans les
// remplacements (appliqué aussi aux packs sérialisés en JSON).
// ---------------------------------------------------------------------------

const REGLES: [RegExp, string][] = [
  [/Formation à distance en classe virtuelle synchrone \(Google Meet ou Zoom\), formateur en direct pendant les (\d+) heures, caméra et micro des (participants|stagiaires) actifs/g,
    "Formation en présentiel, en salle de formation équipée (vidéoprojecteur, tableau blanc), formateur présent pendant les $1 heures"],
  [/ ?Disposer d'un ordinateur \(ou d'une tablette\) avec caméra, micro et connexion internet pour la classe virtuelle\./g, ""],
  [/travail en sous-groupes dans des salles virtuelles, tableau blanc collaboratif/g, "travail en sous-groupes, tableau blanc"],
  [/([Ll])e lien de la classe virtuelle et les accès/g, "$1a convocation (adresse et horaires) et les accès"],
  [/<li><strong>Classe virtuelle<\/strong> : test de connexion proposé avant le premier jour( de formation)?, pauses régulières, sondages et sous-groupes/g,
    "<li><strong>Salle de formation</strong> : pauses régulières, tours de table et sous-groupes"],
  [/sous-titres activables pendant la classe virtuelle/g, "salle accessible et place adaptée sur demande"],
  [/<li><strong>Classe virtuelle<\/strong> : Google Meet ou Zoom, avec partage d'écran, salles de sous-groupes, sondages et conversation écrite ; test de connexion proposé avant le premier jour( de formation)?\./g,
    "<li><strong>Salle de formation</strong> : salle accessible, vidéoprojecteur, tableau blanc et paperboard, documents papier pour les exercices."],
  [/<li><strong>Tableau blanc collaboratif<\/strong>/g, "<li><strong>Tableau blanc et paperboard</strong>"],
  [/ordinateur ou tablette avec caméra, micro et connexion internet/g, "de quoi prendre des notes"],
  [/<strong>à distance, en classe virtuelle synchrone<\/strong> \(Google Meet ou Zoom\) : le formateur anime en direct, partage son écran/g,
    "<strong>en présentiel, en salle de formation</strong> : le formateur anime la séance, projette le support"],
  [/en <strong>classe virtuelle synchrone<\/strong>( \(Google Meet ou Zoom\))?/g, "en <strong>présentiel</strong>, en salle de formation"],
  [/, depuis un endroit calme avec une bonne connexion/g, ", sur place en salle de formation"],
  [/ J'ai fait le test de connexion proposé\./g, " J'ai bien reçu la convocation."],
  [/Données personnelles en classe virtuelle/g, "Données personnelles en formation"],
  [/(jours|journées) de classe virtuelle/g, "$1 en salle"],
  [/Travail sur écran partagé/g, "Travail au tableau"],
  [/partage d'écran/g, "vidéoprojection"],
  [/sondage en ligne/g, "sondage à main levée"],
  [/se déroule à distance/g, "se déroule en salle"],
  [/(formation|jours) à distance/g, "$1 en salle"],
  [/(en|pendant|de) la classe virtuelle/g, "$1 la session"],
  [/En classe virtuelle/g, "En salle"],
  [/en classe virtuelle/g, "en salle"],
];

/** Adapte un texte rédigé pour la classe virtuelle à la modalité de la session (inchangé sauf en présentiel). */
export function selonModalite<T extends string | null | undefined>(modalites: string | undefined, texte: T): T {
  if (modalites !== "presentiel" || !texte) return texte;
  return REGLES.reduce((t, [re, par]) => t.replace(re, par), texte as string) as T;
}

/** Même adaptation sur un pack de contenu (objet sérialisable). */
export function packSelonModalite<T>(modalites: string | undefined, pack: T): T {
  return modalites === "presentiel" ? JSON.parse(selonModalite(modalites, JSON.stringify(pack))) : pack;
}
