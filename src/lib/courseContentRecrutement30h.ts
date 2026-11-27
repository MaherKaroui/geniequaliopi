import type { CourseChapter } from "./courseContent";
import { REC30_CHAPITRE_1 } from "./recrutement30h/chapitre1";
import { REC30_CHAPITRE_2 } from "./recrutement30h/chapitre2";
import { REC30_CHAPITRE_3 } from "./recrutement30h/chapitre3";
import { REC30_CHAPITRE_4 } from "./recrutement30h/chapitre4";
import { REC30_CHAPITRE_5 } from "./recrutement30h/chapitre5";
import { REC30_CHAPITRE_6 } from "./recrutement30h/chapitre6";

/**
 * Support de cours « Recruter et intégrer ses collaborateurs (CP-FFP) » – 30 h (6 chapitres, un par compétence) :
 * 1 besoin, fiche de poste et grille de décision (C1), 2 offre et canaux de diffusion (C2), 3 entretien structuré
 * et non discriminant (C3), 4 atouts de l'entreprise et décision (C4), 5 intégration du collaborateur (C5),
 * 6 accueil d'un collaborateur en situation de handicap et préparation des épreuves E1, E2, E3 (C6).
 * Fil rouge : Sophie, gérante d'« Atelier Lumen », PME de luminaires sur mesure, personnage et entreprise fictifs.
 */
export function getRecrutement30hChapters(): CourseChapter[] {
  return [REC30_CHAPITRE_1, REC30_CHAPITRE_2, REC30_CHAPITRE_3, REC30_CHAPITRE_4, REC30_CHAPITRE_5, REC30_CHAPITRE_6];
}
