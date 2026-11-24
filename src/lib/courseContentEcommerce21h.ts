import type { CourseChapter } from "./courseContent";
import { ECO21_CHAPITRE_1 } from "./ecommerce21h/chapitre1";
import { ECO21_CHAPITRE_2 } from "./ecommerce21h/chapitre2";
import { ECO21_CHAPITRE_3 } from "./ecommerce21h/chapitre3";
import { ECO21_CHAPITRE_4 } from "./ecommerce21h/chapitre4";
import { ECO21_CHAPITRE_5 } from "./ecommerce21h/chapitre5";
import { ECO21_CHAPITRE_6 } from "./ecommerce21h/chapitre6";
import { ECO21_CHAPITRE_7 } from "./ecommerce21h/chapitre7";

/**
 * Support de cours « Créer et développer une e-boutique professionnelle (RS6475) – 21 h »
 * (7 chapitres, un par compétence) : 1 conception (C1), 2 gestion du site (C2), 3 marketing en ligne (C3),
 * 4 accessibilité et RGAA (C4), 5 stocks et livraison (C5), 6 statistiques et fidélisation (C6),
 * 7 sécurité des données et RGPD, préparation aux deux épreuves du certificateur (C7).
 * Fil rouge : Inès, créatrice de bougies et savons artisanaux à Toulon, et sa boutique « Lueur d'Inès »,
 * personnage et nom fictifs.
 */
export function getEcommerce21hChapters(): CourseChapter[] {
  return [ECO21_CHAPITRE_1, ECO21_CHAPITRE_2, ECO21_CHAPITRE_3, ECO21_CHAPITRE_4, ECO21_CHAPITRE_5, ECO21_CHAPITRE_6, ECO21_CHAPITRE_7];
}
