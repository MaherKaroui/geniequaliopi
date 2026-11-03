import type { CourseChapter } from "./courseContent";
import { ANG40_CHAPITRE_1 } from "./anglaisPro40h/chapitre1";
import { ANG40_CHAPITRE_2 } from "./anglaisPro40h/chapitre2";
import { ANG40_CHAPITRE_3 } from "./anglaisPro40h/chapitre3";
import { ANG40_CHAPITRE_4 } from "./anglaisPro40h/chapitre4";
import { ANG40_CHAPITRE_5 } from "./anglaisPro40h/chapitre5";
import { ANG40_CHAPITRE_6 } from "./anglaisPro40h/chapitre6";

/**
 * Support de cours « Anglais Professionnel – 40 h » (6 chapitres, un par jour de formation) :
 * 1 fondamentaux (C1), 2 écrits professionnels (C2), 3 téléphone et visioconférence (C3),
 * 4 réunions (C4), 5 présentations (C5), 6 négociation, objections et réclamations (C6).
 * Chaque chapitre se termine par un quiz corrigé et un cas pratique corrigé.
 * Fil rouge commun : Lumivia, PME lyonnaise fictive de luminaires LED.
 */
export function getAnglaisPro40hChapters(): CourseChapter[] {
  return [ANG40_CHAPITRE_1, ANG40_CHAPITRE_2, ANG40_CHAPITRE_3, ANG40_CHAPITRE_4, ANG40_CHAPITRE_5, ANG40_CHAPITRE_6];
}
