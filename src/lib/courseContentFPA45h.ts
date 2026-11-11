import type { CourseChapter } from "./courseContent";
import { FPA45_CHAPITRE_1 } from "./fpa45h/chapitre1";
import { FPA45_CHAPITRE_2 } from "./fpa45h/chapitre2";
import { FPA45_CHAPITRE_3 } from "./fpa45h/chapitre3";
import { FPA45_CHAPITRE_4 } from "./fpa45h/chapitre4";
import { FPA45_CHAPITRE_5 } from "./fpa45h/chapitre5";
import { FPA45_CHAPITRE_6 } from "./fpa45h/chapitre6";

/**
 * Support de cours « Formation de formateur professionnel pour adultes (TP FPA – RNCP37275) » (6 chapitres,
 * un par module) : 1 le métier de formateur d'adultes, le titre FPA et l'environnement de la formation
 * professionnelle, 2 CCP 1 concevoir et préparer la formation, 3 CCP 2 animer une formation et évaluer les acquis,
 * 4 CCP 3 accompagner les apprenants, 5 CCP 4 qualité, RSE, réglementation, veille et analyse de pratique,
 * 6 supports multimodaux et préparation aux épreuves du titre.
 * Fil rouge fictif : Inès, Horizon Compétences (Rivaulieu), Logistique Morvaine, Karim, Sonia, Paul et Mélissa.
 */
export function getFPA45hChapters(): CourseChapter[] {
  return [FPA45_CHAPITRE_1, FPA45_CHAPITRE_2, FPA45_CHAPITRE_3, FPA45_CHAPITRE_4, FPA45_CHAPITRE_5, FPA45_CHAPITRE_6];
}
