import type { CourseChapter } from "./courseContent";
import { HYG14_CHAPITRE_1 } from "./hygieneAlimentaire14h/chapitre1";
import { HYG14_CHAPITRE_2 } from "./hygieneAlimentaire14h/chapitre2";
import { HYG14_CHAPITRE_3 } from "./hygieneAlimentaire14h/chapitre3";
import { HYG14_CHAPITRE_4 } from "./hygieneAlimentaire14h/chapitre4";
import { HYG14_CHAPITRE_5 } from "./hygieneAlimentaire14h/chapitre5";
import { HYG14_CHAPITRE_6 } from "./hygieneAlimentaire14h/chapitre6";

/**
 * Support de cours « Hygiène alimentaire en restauration commerciale – 14 h » (6 chapitres, un par compétence) :
 * 1 dangers, multiplication des micro-organismes et TIAC, 2 germes pathogènes, 3 réglementation,
 * 4 bonnes pratiques d'hygiène, 5 HACCP et traçabilité, 6 plan de maîtrise sanitaire et plan d'action.
 * Fil rouge : Le Comptoir Gourmand, snack-restaurant fictif.
 */
export function getHygieneAlimentaire14hChapters(): CourseChapter[] {
  return [HYG14_CHAPITRE_1, HYG14_CHAPITRE_2, HYG14_CHAPITRE_3, HYG14_CHAPITRE_4, HYG14_CHAPITRE_5, HYG14_CHAPITRE_6];
}
