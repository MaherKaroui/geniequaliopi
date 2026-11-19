import type { CourseChapter } from "./courseContent";
import { GMA70_CHAPITRE_1 } from "./projecteursGrandMA70h/chapitre1";
import { GMA70_CHAPITRE_2 } from "./projecteursGrandMA70h/chapitre2";
import { GMA70_CHAPITRE_3 } from "./projecteursGrandMA70h/chapitre3";
import { GMA70_CHAPITRE_4 } from "./projecteursGrandMA70h/chapitre4";
import { GMA70_CHAPITRE_5 } from "./projecteursGrandMA70h/chapitre5";
import { GMA70_CHAPITRE_6 } from "./projecteursGrandMA70h/chapitre6";

/** Support de cours « Projecteurs automatiques et pupitre grandMA – 70 h » (6 chapitres, un par compétence C1 à C6). Fil rouge : Théâtre des Quatre Vents, salle fictive. */
export function getProjecteursGrandMA70hChapters(): CourseChapter[] {
  return [GMA70_CHAPITRE_1, GMA70_CHAPITRE_2, GMA70_CHAPITRE_3, GMA70_CHAPITRE_4, GMA70_CHAPITRE_5, GMA70_CHAPITRE_6];
}
