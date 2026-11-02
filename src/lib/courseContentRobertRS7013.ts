import type { CourseChapter } from "./courseContent";
import { LRB_PARTIE1 } from "./robertRS7013/partie1";
import { LRB_PARTIE2 } from "./robertRS7013/partie2";
import { LRB_PARTIE3 } from "./robertRS7013/partie3";
import { LRB_PARTIE4 } from "./robertRS7013/partie4";

/**
 * Support de cours « Préparation à la Certification en langue française Le Robert (RS7013) » :
 * la certification et la méthode de préparation, orthographe lexicale et d'usage, homophones
 * grammaticaux et accords, participe passé, conjugaison et modes (C1), vocabulaire et précision
 * lexicale, construction des phrases et ponctuation, registres de langue et communication
 * professionnelle (C2), entraînement à l'épreuve et examen blanc, glossaire grammatical.
 * Fil rouge commun : Société Ardoise & Plume (Nantes), entreprise fictive.
 */
export function getRobertRS7013Chapters(): CourseChapter[] {
  return [...LRB_PARTIE1, ...LRB_PARTIE2, ...LRB_PARTIE3, ...LRB_PARTIE4];
}
