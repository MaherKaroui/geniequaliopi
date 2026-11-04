import type { CourseChapter } from "./courseContent";
import { COH21_CHAPITRE_1 } from "./cohesionEquipe21h/chapitre1";
import { COH21_CHAPITRE_2 } from "./cohesionEquipe21h/chapitre2";
import { COH21_CHAPITRE_3 } from "./cohesionEquipe21h/chapitre3";
import { COH21_CHAPITRE_4 } from "./cohesionEquipe21h/chapitre4";
import { COH21_CHAPITRE_5 } from "./cohesionEquipe21h/chapitre5";
import { COH21_CHAPITRE_6 } from "./cohesionEquipe21h/chapitre6";

/**
 * Support de cours « Cohésion d'équipe en entreprise – 21 h » (6 chapitres, un par module de 3 h 30) :
 * 1 ce qui fait une équipe, 2 se connaître soi et les autres, 3 communiquer efficacement,
 * 4 coopérer et décider ensemble, 5 désaccords et tensions, 6 charte d'équipe et plan d'action.
 * Repris du contenu de la formation (textes des capsules vidéo, fiches à retenir, ateliers minutés,
 * QCM corrigés, positionnement et évaluation finale). Fil rouge : Maison Lumen, entreprise fictive.
 */
export function getCohesionEquipe21hChapters(): CourseChapter[] {
  return [COH21_CHAPITRE_1, COH21_CHAPITRE_2, COH21_CHAPITRE_3, COH21_CHAPITRE_4, COH21_CHAPITRE_5, COH21_CHAPITRE_6];
}
