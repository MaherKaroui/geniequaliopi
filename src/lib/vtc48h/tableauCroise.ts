/**
 * Tableau croisé IND 7 propre à la préparation VTC (RS5637) : chaque épreuve de l'examen
 * (admissibilité A à G, admission pratique) est reliée à sa compétence, à ses jours de programme,
 * à ses évaluations formatives et à sa modalité certificative réelle (examen organisé par la CMA).
 * Remplace le tableau générique de la fiche France Compétences, qui ne reprenait que l'épreuve A.
 */
import type { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { buildDocument } from "../docBuilder";

const ECRIT = "Épreuve d'admissibilité écrite (QCM et questions à réponse courte), organisée par la CMA ; programme et notation fixés par l'arrêté du 6 avril 2017";

const LIGNES: string[][] = [
  ["A — Réglementation du transport public particulier de personnes (T3P)", "C1 — Appliquer la réglementation du T3P : professions, conditions d'accès, carte professionnelle, registre, contrôles et sanctions", "Module 1 — jours 1 à 3 (21 h)", "Exercices 1 et 2, QCM C1 (semaine 1) ; examen blanc du jour 20", ECRIT],
  ["B — Gestion", "C2 — Gérer son entreprise : statuts, comptabilité, TVA, charges, prix de revient, seuil de rentabilité", "Module 2 — jours 4 à 7 (28 h)", "Exercices 3 (entraînement) et 4, QCM C2 (semaine 2) ; examen blanc du jour 20", ECRIT],
  ["C — Sécurité routière", "C3 — Conduire en sécurité : code de la route, fatigue, alcool et stupéfiants, conduite à tenir en cas d'accident, premiers secours", "Module 3 — jours 8 à 10 (21 h)", "Exercices 5 et 6 (entraînement), QCM C3 (semaine 2) ; examen blanc du jour 20", ECRIT],
  ["D — Capacité à comprendre et à s'exprimer en français", "C4 — S'exprimer et comprendre en français dans les situations du métier", "Module 4 — jours 11 et 12 (14 h)", "Exercice 7, QCM C4 (semaine 3) ; cas pratique du jour 14 ; examen blanc du jour 20", ECRIT],
  ["E — Capacité à comprendre et à s'exprimer en anglais", "C4 — Comprendre et s'exprimer en anglais dans les situations courantes du métier (accueil, trajet, paiement)", "Module 4 — jours 13 et 14 (14 h)", "Exercice 7, QCM C4 (semaine 3) ; cas pratique du jour 14 ; examen blanc du jour 20", ECRIT],
  ["F — Développement commercial et gestion propre à l'activité de VTC", "C5 — Développer son activité commerciale (marché, clientèles, plateformes, devis, tableau de bord)", "Module 5 — jours 15 à 17 (21 h, partie commerciale)", "Exercice 8, QCM C5 (semaines 3 et 4) ; examen blanc du jour 20", ECRIT],
  ["G — Réglementation nationale spécifique à l'activité de VTC", "C5 — Appliquer la réglementation propre aux VTC : réservation préalable, retour à l'établissement, signalétique, plateformes", "Module 5 — jours 16 et 17 (partie réglementaire)", "Exercice 9, QCM C5 (semaine 4) ; examen blanc du jour 20", ECRIT],
  ["Admission — Épreuve pratique", "C6 — Réaliser une course : accueil et prise en charge du client, itinéraire, conduite souple, information, facturation, prise de congé", "Module 6 — jours 18 à 20 (21 h)", "Exercice 10, QCM C6 (semaine 4) ; simulation de l'épreuve pratique le jour 20", "Épreuve pratique d'admission en véhicule, passée après réussite aux épreuves d'admissibilité, organisée et évaluée par la CMA (véhicule à double commande) ; la conduite réelle n'est pas incluse dans la formation"],
];

export function genTableauCroiseVTC48(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o,
    title: "TABLEAU CROISÉ RÉFÉRENTIEL / PROGRAMME / ÉVALUATIONS",
    subtitle: "Indicateur 7 — adéquation aux exigences de la certification RS5637",
    sections: [{
      heading: "Certification visée",
      content: `<p><strong>${f.intitule}</strong> — <strong>RS5637</strong> « Habilitation pour l'accès à la profession de conducteur de voiture de transport avec chauffeur (VTC) » (certificateur : ministère chargé des transports). L'examen est organisé par les chambres de métiers et de l'artisanat : le candidat s'y inscrit lui-même sur exament3p.fr. L'organisme prépare à l'examen, il ne l'organise pas et ne délivre pas la certification.</p>`,
    }],
    table: { headers: ["Épreuve de l'examen", "Compétence visée", "Séquence du programme", "Évaluation formative", "Modalité de certification"], rows: LIGNES },
    extraHtml: `<p>Couverture : les 7 épreuves d'admissibilité (A à G) et l'épreuve pratique d'admission sont traitées par au moins une séquence et évaluées par au moins une mise en situation ou un QCM corrigé. Les coefficients, durées et notes éliminatoires sont ceux de l'arrêté du 6 avril 2017 et du règlement de la CMA.</p>`,
  });
}
