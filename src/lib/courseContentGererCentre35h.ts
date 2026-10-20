import type { CourseChapter } from "./courseContent";
import { GSC35_PARTIE1 } from "./gererCentre35h/partie1";
import { GSC35_PARTIE2 } from "./gererCentre35h/partie2";
import { GSC35_PARTIE3 } from "./gererCentre35h/partie3";
import { GSC35_PARTIE4 } from "./gererCentre35h/partie4";

/**
 * Support de cours « Gérer son centre de formation – 35 h » (non certifiante) : organisation de la
 * formation et système de formation professionnelle, cadre juridique et administratif (C1), offre et
 * contractualisation (C2), démarche qualité et Qualiopi (C3), financement et commercialisation (C4),
 * gestion administrative et financière (C5), pilotage et amélioration continue (C6), projet final,
 * évaluation finale, boîte à outils et glossaire.
 * Fil rouge commun : Atelier Sésame Formation (Massy), organisme fictif, chiffres fictifs.
 */
export function getGererCentre35hChapters(): CourseChapter[] {
  return [...GSC35_PARTIE1, ...GSC35_PARTIE2, ...GSC35_PARTIE3, ...GSC35_PARTIE4];
}
