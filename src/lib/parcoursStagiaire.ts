// Calcul du parcours réel d'un stagiaire (jours de formation, semaines couvertes)
// Utilisé pour dimensionner les exercices / QCM de l'indicateur 11 par stagiaire.
import type { FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { estJourFormation } from "./joursFeries";

/** Seuil séparant les parcours courts (1 exercice / jour) des parcours longs (1 exercice / semaine). */
export const SEUIL_JOURS_PARCOURS_COURT = 12;

function parseD(v: string): Date | null {
  const t = (v || "").trim();
  if (!t) return null;
  const m = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const d = m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date(t);
  return isNaN(d.getTime()) ? null : d;
}

/** Jours de formation réels du stagiaire : fériés exclus, samedi de bord inclus. */
export function getJoursStagiaire(s: StagiaireInfo | undefined, f: FormationInfo): Date[] {
  const start = parseD(s?.dateDebutFormation || f.dateDebut || "");
  const end = parseD(s?.dateFinFormation || f.dateFin || "");
  if (!start || !end || end < start) return [];
  const out: Date[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    if (estJourFormation(cur, start, end)) out.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

const fmtLong = (d: Date) => d.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
const fmtCourt = (d: Date) => d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

function lundiDe(d: Date): Date {
  const x = new Date(d);
  const jour = x.getDay(); // 0 = dimanche
  const delta = jour === 0 ? -6 : 1 - jour;
  x.setDate(x.getDate() + delta);
  x.setHours(0, 0, 0, 0);
  return x;
}

export type UniteExercice = {
  /** 'jour' pour un parcours court, 'semaine' pour un parcours long */
  type: "jour" | "semaine";
  /** Libellé « Jour 3 : mardi 5 mai 2026 » ou « Semaine 2 : du 11 mai 2026 au 15 mai 2026 » */
  label: string;
  /** Date de référence du document (jour concerné, ou lundi de la semaine) */
  date: Date | null;
};

/**
 * Unités d'évaluation IND 11 pour un stagiaire :
 *  - N <= 12 jours : une unité par jour de formation
 *  - N  > 12 jours : une unité par semaine calendaire contenant au moins un jour de formation
 * Minimum 1 unité.
 */
export function getUnitesExercices(s: StagiaireInfo | undefined, f: FormationInfo): UniteExercice[] {
  const jours = getJoursStagiaire(s, f);
  if (jours.length === 0) return [{ type: "jour", label: "Jour 1", date: null }];

  if (jours.length <= SEUIL_JOURS_PARCOURS_COURT) {
    return jours.map((d, i) => ({ type: "jour" as const, label: `Jour ${i + 1} : ${fmtLong(d)}`, date: d }));
  }

  const semaines: Date[] = [];
  jours.forEach(d => {
    const l = lundiDe(d);
    if (!semaines.some(x => x.getTime() === l.getTime())) semaines.push(l);
  });
  semaines.sort((a, b) => a.getTime() - b.getTime());
  return semaines.map((lundi, i) => {
    const vendredi = new Date(lundi);
    vendredi.setDate(vendredi.getDate() + 4);
    return {
      type: "semaine" as const,
      label: `Semaine ${i + 1} : du ${fmtCourt(lundi)} au ${fmtCourt(vendredi)}`,
      date: lundi,
    };
  });
}

/** Nombre d'exercices / QCM IND 11 d'un stagiaire. */
export function getNbExercicesStagiaire(s: StagiaireInfo | undefined, f: FormationInfo): number {
  return Math.max(1, getUnitesExercices(s, f).length);
}
