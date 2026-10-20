import type { CourseChapter } from "./courseContent";
import { ARH41366_PARTIE1 } from "./arh41366/partie1";
import { ARH41366_PARTIE2 } from "./arh41366/partie2";
import { ARH41366_PARTIE3 } from "./arh41366/partie3";
import { ARH41366_PARTIE4 } from "./arh41366/partie4";
import { ARH41366_PARTIE5 } from "./arh41366/partie5";

/**
 * Support de cours « Titre Professionnel Assistant Ressources Humaines (TP ARH) – RNCP41366 » (titre
 * professionnel de niveau 5, TP-01284, préparé par apprentissage en 420 h) : accueil et méthodologie,
 * CP1 gestion administrative du personnel, CP2 variables et paramètres de paie, CP3 indicateurs RH,
 * CP4 gestion des emplois et carrières, CP5 recrutement et intégration, CP6 développement des
 * compétences, préparation au titre.
 * Fil rouge commun : ALTÉA SERVICES (Créteil), entreprise fictive de propreté, salariés fictifs.
 */
export function getARH41366Chapters(): CourseChapter[] {
  return [...ARH41366_PARTIE1, ...ARH41366_PARTIE2, ...ARH41366_PARTIE3, ...ARH41366_PARTIE4, ...ARH41366_PARTIE5];
}
