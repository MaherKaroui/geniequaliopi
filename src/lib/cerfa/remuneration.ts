/**
 * Découpage automatique de la rémunération d'un contrat d'apprentissage :
 *  - années de contrat de 12 mois glissants à partir de la date de début d'exécution
 *  - re-découpage à chaque anniversaire faisant changer l'apprenti de tranche d'âge
 * Les pourcentages proviennent exclusivement de la table `baremes_apprentissage`.
 */
import type { BaremeApprentissage, TrancheAge } from "./referentiels";
import { pourcentageBareme } from "./referentiels";

export interface PeriodeRemuneration {
  anneeContrat: number;
  debut: string; // YYYY-MM-DD
  fin: string; // YYYY-MM-DD
  trancheAge: TrancheAge;
  pourcentage: number | null; // null = barème absent en base
  base: "SMIC" | "SMIC ou SMC";
}

const iso = (d: Date) => d.toISOString().slice(0, 10);
const parse = (s: string) => new Date(`${s}T00:00:00Z`);

export function addDays(s: string, n: number): string {
  const d = parse(s);
  d.setUTCDate(d.getUTCDate() + n);
  return iso(d);
}
export function addMonths(s: string, n: number): string {
  const d = parse(s);
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + n);
  const lastDay = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, lastDay));
  return iso(d);
}
export function addYears(s: string, n: number): string {
  return addMonths(s, 12 * n);
}

export function ageA(dateNaissance: string | undefined, dateRef: string | undefined): number | null {
  if (!dateNaissance || !dateRef) return null;
  const b = parse(dateNaissance);
  const r = parse(dateRef);
  if (isNaN(b.getTime()) || isNaN(r.getTime())) return null;
  let age = r.getUTCFullYear() - b.getUTCFullYear();
  const m = r.getUTCMonth() - b.getUTCMonth();
  if (m < 0 || (m === 0 && r.getUTCDate() < b.getUTCDate())) age--;
  return age;
}

export function trancheAge(age: number): TrancheAge {
  if (age < 18) return "-18";
  if (age < 21) return "18-20";
  if (age < 26) return "21-25";
  return "26+";
}

export function calculePeriodesRemuneration(params: {
  dateDebut: string;
  dateFin: string;
  dateNaissance: string;
  baremes: BaremeApprentissage[];
}): PeriodeRemuneration[] {
  const { dateDebut, dateFin, dateNaissance, baremes } = params;
  if (!dateDebut || !dateFin || dateFin < dateDebut) return [];

  // 1. Années de contrat de 12 mois glissants
  const bornes: { annee: number; debut: string; fin: string }[] = [];
  let k = 1;
  let debut = dateDebut;
  while (debut <= dateFin && k <= 8) {
    const finAnnee = addDays(addMonths(dateDebut, 12 * k), -1);
    bornes.push({ annee: k, debut, fin: finAnnee < dateFin ? finAnnee : dateFin });
    debut = addDays(finAnnee, 1);
    k++;
  }

  // 2. Anniversaires changeant la tranche d'âge
  const ruptures = dateNaissance
    ? [18, 21, 26].map((n) => addYears(dateNaissance, n)).filter((d) => d > dateDebut && d <= dateFin)
    : [];

  const periodes: PeriodeRemuneration[] = [];
  for (const b of bornes) {
    const coupes = ruptures.filter((d) => d > b.debut && d <= b.fin).sort();
    let curDebut = b.debut;
    for (const c of [...coupes, null]) {
      const curFin = c ? addDays(c, -1) : b.fin;
      if (curFin < curDebut) continue;
      const age = ageA(dateNaissance, curDebut);
      const tranche = age === null ? "21-25" : trancheAge(age);
      periodes.push({
        anneeContrat: b.annee,
        debut: curDebut,
        fin: curFin,
        trancheAge: tranche,
        pourcentage: pourcentageBareme(baremes, tranche, b.annee),
        base: tranche === "26+" ? "SMIC ou SMC" : "SMIC",
      });
      if (!c) break;
      curDebut = c;
    }
  }
  return periodes;
}
