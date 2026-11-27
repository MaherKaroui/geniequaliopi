import type { CourseChapter } from "./courseContent";
import { IAE67_CHAPITRE_1 } from "./iaEntreprise67h/chapitre1";
import { IAE67_CHAPITRE_2 } from "./iaEntreprise67h/chapitre2";
import { IAE67_CHAPITRE_3 } from "./iaEntreprise67h/chapitre3";
import { IAE67_CHAPITRE_4 } from "./iaEntreprise67h/chapitre4";
import { IAE67_CHAPITRE_5 } from "./iaEntreprise67h/chapitre5";
import { IAE67_CHAPITRE_6 } from "./iaEntreprise67h/chapitre6";
import { IAE67_CHAPITRE_7 } from "./iaEntreprise67h/chapitre7";
import { IAE67_CHAPITRE_8 } from "./iaEntreprise67h/chapitre8";
import { IAE67_CHAPITRE_9 } from "./iaEntreprise67h/chapitre9";

/**
 * Support de cours « Intelligence artificielle en entreprise : déployer les usages de l'IA dans les métiers » – 67 h
 * (9 chapitres, du jour 1 au jour 10) : 1 comprendre l'IA (C1), 2 panorama des outils et usages par métier (C1-C2),
 * 3 l'art du prompt et la vérification (C2), 4 rédiger, communiquer, marketing et relation client (C3), 5 données et
 * reporting (C3), 6 automatiser les tâches et les processus (C4), 7 cadre légal et éthique (C5), 8 conduire un
 * projet IA (C6), 9 projet fil rouge : feuille de route IA du service, évaluation finale et bilan (C1 à C6, jours 9 et 10).
 * Fil rouge : Claire, directrice des opérations d'« Arvelia Services », personnage et entreprise fictifs.
 */
export function getIAEntreprise67hChapters(): CourseChapter[] {
  return [
    IAE67_CHAPITRE_1, IAE67_CHAPITRE_2, IAE67_CHAPITRE_3, IAE67_CHAPITRE_4, IAE67_CHAPITRE_5,
    IAE67_CHAPITRE_6, IAE67_CHAPITRE_7, IAE67_CHAPITRE_8, IAE67_CHAPITRE_9,
  ];
}
