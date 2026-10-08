import type { CourseChapter } from "./courseContent";
import { TVTE_PARTIE1 } from "./ventesEnergie35h/partie1";
import { TVTE_PARTIE2 } from "./ventesEnergie35h/partie2";
import { TVTE_PARTIE3 } from "./ventesEnergie35h/partie3";
import { TVTE_PARTIE4 } from "./ventesEnergie35h/partie4";

/**
 * Support de cours « Techniques de vente dans le secteur des travaux énergétiques – 35 h » :
 * introduction et organisation de la formation, C1 cadre technique et réglementaire, C2 découverte
 * des besoins B2C / B2B, C3 argumentaire et proposition, C4 objections et négociation, C5 prospection
 * sans démarchage téléphonique, C6 conclusion et fidélisation, évaluation finale.
 * Fil rouge commun : Thermia Rénov (Saint-Genis-Laval), entreprise fictive, chiffres fictifs.
 */
export function getVentesEnergie35hChapters(): CourseChapter[] {
  return [...TVTE_PARTIE1, ...TVTE_PARTIE2, ...TVTE_PARTIE3, ...TVTE_PARTIE4];
}
