/**
 * RS7650 « Mettre en valeur le regard par la pose d'extensions et le rehaussement de cils » (EYES PERFECT).
 * Réponses propres à chaque candidat, tirées d'une graine (n° de dossier + nom) : le même export
 * redonne toujours les mêmes documents, et deux candidats n'ont jamais la même copie.
 *
 * Règles du règlement d'évaluation (V07/24) et des exemples annotés du certificateur :
 * - théorie notée /37, avis favorable seulement au-dessus de 20/37 ;
 * - une compétence pratique est refusée si les cases « NA » dépassent 50 % de ses critères ;
 * - prérequis : diplôme esthétique/coiffure listé OU au moins 1 an d'expérience en esthétique.
 */
import { ageAu, type EdofCandidat } from "./candidats";
import { hashSeed } from "@/lib/bdc/bdcModel";

export function rng(seed: string): () => number {
  let a = hashSeed(seed);
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = <T,>(r: () => number, arr: T[]): T => arr[Math.floor(r() * arr.length)];
const shuffle = <T,>(r: () => number, arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

// ─── Évaluation théorique FS063 ───────────────────────────────────────────────

/** Corrigé du certificateur (CORRECTION EVALUATION THÉORIQUE), dans l'ordre de THEO_QUESTIONS ; null = réponse rédigée. */
export const CORRIGE_THEO: (number[] | null)[] = [
  [2], [1], [2], [2], [2], [2], [2], // page 1
  [1, 3], [3], [2, 3], [1, 2], [2, 3], null, null, [3], [2], [1, 3], [3, 4], // page 2
  [2], [2], null, [3], null, [1], [3, 4], // page 3
  [1], [2], [1], // page 4 : mises en situation
  [2], [3, 4], // page 5
  [2], [2], [2], [2], [2], [1], [2], // page 6 : rehaussement
];
export const NOTE_MAX_THEO = CORRIGE_THEO.length; // 37
export const SEUIL_THEO = 20; // « note supérieure à 20/37 »

/** Réponses rédigées justes (plusieurs formulations) et incomplètes, par index de question. */
const REDIGEES: Record<number, { justes: string[][]; fausses: string[][] }> = {
  12: {
    justes: [
      ["Cils cassés, tordus ou déformés, trous dans la frange de cils."],
      ["Cils fins et cassants, cils abîmés par le recourbe-cils, frange clairsemée."],
      ["Cils fragilisés ou cassés, chute excessive, trous dans la frange."],
      ["Cils tordus, cassés, très fins ou en chute importante."],
    ],
    fausses: [["Cils trop longs."], ["Cils foncés et épais."]],
  },
  13: {
    justes: [["Anagène", "Catagène", "Télogène"], ["Anagène (croissance)", "Catagène (transition)", "Télogène (chute)"]],
    fausses: [["Anagène", "Télogène", ""], ["Croissance", "Repos", ""]],
  },
  20: {
    justes: [
      ["Technique où plusieurs extensions très fines formant un bouquet", "sont posées sur un seul cil naturel pour créer volume et densité."],
      ["Pose de bouquets de 2 à 15 extensions fines sur chaque cil naturel,", "pour un effet de volume et de densité."],
      ["Un éventail de plusieurs extensions légères est fixé sur un cil naturel", "afin de donner du volume sans l'alourdir."],
    ],
    fausses: [["Pose d'une extension sur chaque cil naturel."], ["Une pose avec des cils plus longs."]],
  },
  22: {
    justes: [
      ["L'humidité régule la vitesse de séchage de la colle. Un taux adapté", "garantit une bonne adhérence et une meilleure tenue des extensions."],
      ["Elle agit sur la polymérisation de la colle : trop d'humidité la fait", "sécher trop vite, pas assez la ralentit (idéal 40 à 60 %)."],
      ["Elle conditionne le séchage de la colle cyanoacrylate et donc", "l'adhérence et la durée de tenue de la pose."],
    ],
    fausses: [["L'humidité n'a pas d'influence sur la pose."], ["Elle sert à hydrater les cils."]],
  },
};

export interface ReponseTheo { choix: number[]; texte: string[]; juste: boolean }

export interface ReponsesCandidat {
  theo: ReponseTheo[];
  noteTheo: number;
  /** par compétence C1→C6 : true = « A » (acquis), false = « NA » */
  pratique: boolean[][];
  competencesValidees: boolean[];
  noteMiseEnSituation: number; // /6
  admis: boolean;
  commentaireJury: string;
  positionnement: Positionnement;
}

function reponseFausse(r: () => number, juste: number[], nbOptions: number): number[] {
  if (juste.length > 1) return [pick(r, juste)]; // combinaison incomplète = 0 point
  const autres = Array.from({ length: nbOptions }, (_, i) => i + 1).filter((n) => !juste.includes(n));
  return [pick(r, autres)];
}

/** Nombre d'options par question (pour tirer une mauvaise réponse plausible). */
export function genererTheo(r: () => number, nbOptions: number[]): { reponses: ReponseTheo[]; note: number } {
  // 26 à 37 : jamais sous le seuil de 20/37, rarement la note parfaite
  const note = Math.min(NOTE_MAX_THEO, 26 + Math.floor(r() * 12));
  const fausses = new Set(shuffle(r, CORRIGE_THEO.map((_, i) => i)).slice(0, NOTE_MAX_THEO - note));
  const reponses = CORRIGE_THEO.map((juste, i): ReponseTheo => {
    const ok = !fausses.has(i);
    if (juste === null) return { choix: [], texte: pick(r, ok ? REDIGEES[i].justes : REDIGEES[i].fausses), juste: ok };
    return { choix: ok ? juste : reponseFausse(r, juste, nbOptions[i]), texte: [], juste: ok };
  });
  return { reponses, note };
}

// ─── Grille pratique FS055 ────────────────────────────────────────────────────

export const CRITERES_PAR_COMPETENCE = [5, 5, 7, 9, 11, 5];

export const competenceValidee = (criteres: boolean[]) => criteres.filter((a) => !a).length <= criteres.length / 2;

const COMMENTAIRES = [
  "Prestations réalisées dans le temps imparti, protocole d'hygiène rigoureux. Mapping cohérent avec la morphologie du modèle, résultat symétrique et naturel.",
  "Entretien et diagnostic bien menés. Isolation précise, collage maîtrisé. Rehaussement régulier, conseils post-soins clairs et adaptés.",
  "Bonne organisation du poste et gestes sûrs. Choix des longueurs et courbures argumentés ; courbure du rehaussement homogène sur la frange.",
  "Candidate à l'écoute du modèle, contre-indications vérifiées. Pose propre sans adhérence entre cils, recommandations d'entretien complètes.",
  "Travail soigné et sécurisé. Quelques hésitations sur la gestion du temps de pose, sans incidence sur le résultat final, conforme au projet validé.",
  "Maîtrise des deux techniques. Diagnostic écrit complet, traçabilité assurée, explications formulées avec un vocabulaire professionnel.",
];

function genererPratique(r: () => number): boolean[][] {
  return CRITERES_PAR_COMPETENCE.map((n) => {
    const criteres = Array<boolean>(n).fill(true);
    // Chaque compétence a 1 ou 2 critères « NA » à des places tirées au hasard (toujours ≤ 50 % : compétence validée)
    const nbNA = Math.min(r() < 0.6 ? 1 : 2, Math.floor(n / 2));
    shuffle(r, Array.from({ length: n }, (_, i) => i)).slice(0, nbNA).forEach((i) => { criteres[i] = false; });
    return criteres;
  });
}

// ─── Questionnaire de positionnement ──────────────────────────────────────────

export interface Positionnement {
  age: number | null;
  activite: boolean;
  activiteDetail: string;
  demandeurEmploi: boolean;
  demandeurDepuis: string;
  diplome: string;
  experienceEsthetique: boolean;
  experienceDetail: string;
  dejaPratique: boolean;
  nbModeles: string;
  dejaFormee: boolean;
  formationDetail: string;
  clientele: boolean;
  prerequisLus: boolean;
  prerequisRemplis: "Oui" | "Partiellement" | "Non";
  objectifs: number[]; // 1..5
  confiance: number; // 1..5
  rythme: number; // 1 = 3 j, 2 = 4 j, 3 = 5 j
  accompagnement: number[]; // 1..6
  apprehensions: string;
  amenagement: boolean;
  amenagementDetail: string;
}

const DIPLOMES_ESTHETIQUE = [
  { nom: "CAP Esthétique – Cosmétique – Parfumerie", age: 17 },
  { nom: "Bac Pro Esthétique – Cosmétique – Parfumerie", age: 18 },
  { nom: "BTS Métiers de l'Esthétique – Cosmétique – Parfumerie", age: 20 },
  { nom: "CAP Métiers de la coiffure", age: 17 },
  { nom: "BP Coiffure", age: 19 },
];
const DIPLOMES_AUTRES = [
  { nom: "Baccalauréat général", age: 18 },
  { nom: "Bac Pro Accueil – Relation clients et usagers", age: 18 },
  { nom: "BTS Management commercial opérationnel", age: 20 },
  { nom: "CAP Équipier polyvalent du commerce", age: 17 },
];
const EMPLOIS_ESTHETIQUE = [
  "CDI – esthéticienne en institut de beauté",
  "CDI – conseillère beauté en parfumerie",
  "Auto-entrepreneuse – soins esthétiques à domicile",
  "CDD – esthéticienne en spa",
  "CDI – coiffeuse en salon",
  "Auto-entrepreneuse – prothésiste ongulaire",
];
const EXPERIENCES_SANS_DIPLOME = [
  "{n} ans en institut comme assistante esthéticienne : épilations, soins des mains, maquillage",
  "{n} ans d'activité en auto-entreprise : beauté des mains et des pieds, onglerie",
  "{n} ans en salon de beauté : épilations, teintures de cils et sourcils",
];
const APPREHENSIONS = [
  "Peur de coller les cils entre eux ou de toucher l'œil du modèle.",
  "Gérer le temps de pose sur une pose complète.",
  "Trouver des modèles régulièrement pour m'entraîner.",
  "Aucune appréhension particulière.",
  "Réussir un résultat symétrique entre les deux yeux.",
  "Le contact avec la colle et le risque d'allergie chez la cliente.",
];

function genererPositionnement(r: () => number, c: EdofCandidat): Positionnement {
  const age = ageAu(c.dateNaissance, c.dateDebut);
  const anneeDebut = +(c.dateDebut || new Date().toISOString()).slice(0, 4);
  const anneeNaissance = /^\d{4}/.test(c.dateNaissance) ? +c.dateNaissance.slice(0, 4) : anneeDebut - 30;
  const parDiplome = r() < 0.7; // sinon accès par l'expérience (≥ 1 an)
  const d = pick(r, parDiplome ? DIPLOMES_ESTHETIQUE : DIPLOMES_AUTRES);
  const anneeMin = Math.min(anneeNaissance + d.age, anneeDebut - 1);
  const anneeDiplome = anneeMin + Math.floor(r() * Math.max(1, Math.min(anneeDebut - 1, anneeNaissance + d.age + 12) - anneeMin + 1));
  const ansExp = Math.max(1, Math.min(anneeDebut - anneeDiplome, 2 + Math.floor(r() * 8)));
  const activite = r() < 0.65;
  const dejaPratique = r() < 0.35;
  const dejaFormee = dejaPratique && r() < 0.6;
  const jours = c.dateDebut && c.dateFin ? Math.round((Date.parse(c.dateFin) - Date.parse(c.dateDebut)) / 86400000) + 1 : 4;
  const objectifs = new Set<number>([dejaPratique ? 2 : 1]);
  objectifs.add(pick(r, [3, 4, 5]));
  if (r() < 0.3) objectifs.add(pick(r, [3, 4, 5]));
  const accompagnement = new Set<number>([pick(r, [1, 2, 3, 4, 5, 6])]);
  if (r() < 0.6) accompagnement.add(pick(r, [1, 2, 3, 4, 5, 6]));
  const experienceDetail = parDiplome
    ? `${d.nom}, ${ansExp} an${ansExp > 1 ? "s" : ""} d'expérience : ${pick(r, ["soins du visage, épilations", "beauté des mains, maquillage", "coiffure, coloration, soins", "épilations, teintures, onglerie"])}`
    : pick(r, EXPERIENCES_SANS_DIPLOME).replace("{n}", String(ansExp));
  return {
    age,
    activite,
    activiteDetail: activite ? pick(r, EMPLOIS_ESTHETIQUE) : "",
    demandeurEmploi: !activite,
    demandeurDepuis: !activite ? `${pick(r, [3, 4, 6, 8, 10, 12])} mois` : "",
    diplome: `${d.nom} – ${anneeDiplome}`,
    experienceEsthetique: true,
    experienceDetail,
    dejaPratique,
    nbModeles: dejaPratique ? pick(r, ["3 modèles (entourage)", "5 à 6 modèles", "une dizaine de modèles"]) : "",
    dejaFormee,
    formationDetail: dejaFormee ? pick(r, [
      "1 jour, cil à cil ; il m'a manqué de la pratique sur modèle.",
      "2 jours, cil à cil et rehaussement ; pas de volume russe abordé.",
      "Formation en ligne, cil à cil ; aucun retour sur ma technique.",
    ]) : "",
    clientele: activite,
    prerequisLus: true,
    prerequisRemplis: "Oui",
    objectifs: [...objectifs].sort(),
    confiance: Math.min(5, (dejaPratique ? 3 : 2) + Math.floor(r() * 3)),
    rythme: jours <= 3 ? 1 : jours >= 5 ? 3 : 2,
    accompagnement: [...accompagnement].sort(),
    apprehensions: pick(r, APPREHENSIONS),
    amenagement: false,
    amenagementDetail: "",
  };
}

// ─── Assemblage ───────────────────────────────────────────────────────────────

export function genererReponses(c: EdofCandidat, nbOptions: number[]): ReponsesCandidat {
  const r = rng(`RS7650|${c.numeroDossier}|${c.nom}|${c.prenom}|${c.dateNaissance}`);
  const { reponses, note } = genererTheo(r, nbOptions);
  const pratique = genererPratique(r);
  const competencesValidees = pratique.map(competenceValidee);
  const noteMiseEnSituation = competencesValidees.filter(Boolean).length;
  return {
    theo: reponses,
    noteTheo: note,
    pratique,
    competencesValidees,
    noteMiseEnSituation,
    admis: note > SEUIL_THEO && competencesValidees.every(Boolean),
    commentaireJury: pick(r, COMMENTAIRES),
    positionnement: genererPositionnement(r, c),
  };
}
