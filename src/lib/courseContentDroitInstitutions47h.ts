import type { CourseChapter } from "./courseContent";
import { DRI47_CHAPITRE_1 } from "./droitInstitutions47h/chapitre1";
import { DRI47_CHAPITRE_2 } from "./droitInstitutions47h/chapitre2";
import { DRI47_CHAPITRE_3 } from "./droitInstitutions47h/chapitre3";
import { DRI47_CHAPITRE_4 } from "./droitInstitutions47h/chapitre4";
import { DRI47_CHAPITRE_5 } from "./droitInstitutions47h/chapitre5";
import { DRI47_CHAPITRE_6 } from "./droitInstitutions47h/chapitre6";

/**
 * Support de cours « Enseignement : fondamentaux du droit et des institutions » (6 chapitres, un par module) :
 * 1 fondements du droit, sources et hiérarchie des normes, 2 les branches du droit,
 * 3 la Constitution de la Ve République, 4 institutions politiques et territoriales, citoyenneté et libertés,
 * 5 ordre interne, droit de l'Union européenne et traités, 6 organisation juridictionnelle.
 * Cas pratiques fictifs : Camille, la commune de Valmont-sur-Seine, l'entreprise Atelier Valmontais.
 */
export function getDroitInstitutions47hChapters(): CourseChapter[] {
  return [DRI47_CHAPITRE_1, DRI47_CHAPITRE_2, DRI47_CHAPITRE_3, DRI47_CHAPITRE_4, DRI47_CHAPITRE_5, DRI47_CHAPITRE_6];
}
