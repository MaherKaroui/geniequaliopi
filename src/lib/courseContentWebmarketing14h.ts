import type { CourseChapter } from "./courseContent";
import { WM14_PARTIE1 } from "./webmarketing14h/partie1";
import { WM14_PARTIE2 } from "./webmarketing14h/partie2";
import { WM14_PARTIE3 } from "./webmarketing14h/partie3";
import { WM14_PARTIE4 } from "./webmarketing14h/partie4";

/**
 * Support de cours « Développer son activité avec le webmarketing – 14 h » (8 chapitres) :
 * 1 introduction et organisation de la formation, 2 C1 objectifs, 3 C2 stratégie, 4 C3 plan d'action,
 * 5 C4 référencement naturel, 6 C5 réseaux sociaux, 7 C6 pilotage, 8 projet final.
 * Fil rouge commun : la boulangerie-pâtisserie Maison Lenoir (Nantes), chiffres fictifs.
 */
export function getWebmarketing14hChapters(): CourseChapter[] {
  return [...WM14_PARTIE1, ...WM14_PARTIE2, ...WM14_PARTIE3, ...WM14_PARTIE4];
}
