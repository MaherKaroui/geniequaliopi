import type { CourseChapter } from "./courseContent";
import { IAP21_PARTIE1 } from "./iaPro21h/partie1";
import { IAP21_PARTIE2 } from "./iaPro21h/partie2";
import { IAP21_PARTIE3 } from "./iaPro21h/partie3";
import { IAP21_PARTIE4 } from "./iaPro21h/partie4";

/**
 * Support de cours « Intelligence artificielle : intégrer les outils d'IA dans son activité
 * professionnelle – 21 h » (non certifiante) : organisation et fondamentaux (C1), requêtes (C2),
 * contenus écrits puis synthèses, visuels et vérification (C3), intégration et automatisation (C4),
 * usage responsable et conforme (C5), évaluation finale, boîte à outils.
 * Fil rouge commun : Thermia Rénov (Saint-Genis-Laval), entreprise fictive, chiffres fictifs.
 */
export function getIAPro21hChapters(): CourseChapter[] {
  return [...IAP21_PARTIE1, ...IAP21_PARTIE2, ...IAP21_PARTIE3, ...IAP21_PARTIE4];
}
