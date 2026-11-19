import type { CourseChapter } from "./courseContent";
import { MSC70_CHAPITRE_1 } from "./machinerieScenique70h/chapitre1";
import { MSC70_CHAPITRE_2 } from "./machinerieScenique70h/chapitre2";
import { MSC70_CHAPITRE_3 } from "./machinerieScenique70h/chapitre3";
import { MSC70_CHAPITRE_4 } from "./machinerieScenique70h/chapitre4";
import { MSC70_CHAPITRE_5 } from "./machinerieScenique70h/chapitre5";
import { MSC70_CHAPITRE_6 } from "./machinerieScenique70h/chapitre6";

/** Support de cours « Machinerie scénique, moteurs et ponts : équipements fixes et grils provisoires – 70 h » (6 chapitres, un par compétence C1 à C6). Fil rouge : Théâtre des Quatre Vents, salle fictive. */
export function getMachinerieScenique70hChapters(): CourseChapter[] {
  return [MSC70_CHAPITRE_1, MSC70_CHAPITRE_2, MSC70_CHAPITRE_3, MSC70_CHAPITRE_4, MSC70_CHAPITRE_5, MSC70_CHAPITRE_6];
}
