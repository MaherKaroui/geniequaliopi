import type { CourseChapter } from "./courseContent";
import { MSP21_PARTIE1 } from "./msp21/partie1";
import { MSP21_PARTIE2 } from "./msp21/partie2";
import { MSP21_PARTIE3 } from "./msp21/partie3";
import { MSP21_PARTIE4 } from "./msp21/partie4";

/**
 * Support de cours « Techniques de maquillage semi-permanent (RS6459) – 21 h » (certifiante RS) :
 * organisation et cadre réglementaire, besoins de la cliente (C1), évaluation de la peau et documents
 * légaux (C2), poste de travail et hygiène (C3), préparation de la zone (C4), colorimétrie (C5),
 * dermographe et aiguilles (C6), sourcils (C7), eye-liner (C8), lèvres (C9), taches de rousseur (C10),
 * soins post-prestation (C11), préparation à la certification et boîte à outils.
 * Fil rouge commun : Institut Ligne & Teint (Argenteuil), institut fictif, clientes fictives.
 */
export function getMSP21Chapters(): CourseChapter[] {
  return [...MSP21_PARTIE1, ...MSP21_PARTIE2, ...MSP21_PARTIE3, ...MSP21_PARTIE4];
}
