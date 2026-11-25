import type { CourseChapter } from "./courseContent";
import { VTC48_CHAPITRE_1 } from "./vtc48h/chapitre1";
import { VTC48_CHAPITRE_2 } from "./vtc48h/chapitre2";
import { VTC48_CHAPITRE_3 } from "./vtc48h/chapitre3";
import { VTC48_CHAPITRE_4 } from "./vtc48h/chapitre4";
import { VTC48_CHAPITRE_5 } from "./vtc48h/chapitre5";
import { VTC48_CHAPITRE_6 } from "./vtc48h/chapitre6";

/**
 * Support de cours « Préparation à l'examen d'accès à la profession de conducteur VTC (RS5637) – 140 h »
 * (6 chapitres, un par compétence) : 1 réglementation du T3P (épreuve A), 2 gestion (épreuve B),
 * 3 sécurité routière (épreuve C), 4 français et anglais (épreuves D et E), 5 développement commercial et
 * réglementation spécifique VTC (épreuves F et G), 6 préparation à l'épreuve pratique d'admission.
 * Fil rouge : Samir, futur chauffeur VTC indépendant à Créteil, personnage fictif.
 */
export function getVtc48hChapters(): CourseChapter[] {
  return [VTC48_CHAPITRE_1, VTC48_CHAPITRE_2, VTC48_CHAPITRE_3, VTC48_CHAPITRE_4, VTC48_CHAPITRE_5, VTC48_CHAPITRE_6];
}
