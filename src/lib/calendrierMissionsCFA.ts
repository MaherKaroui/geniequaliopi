/**
 * Calendrier des 14 missions CFA (art. L.6231-2) : chaque mission est diffusée
 * pendant une semaine « école » réelle de l'apprenti, déduite du rythme
 * d'alternance saisi, et toujours comprise entre ses dates de début et de fin.
 * Source unique pour les mails d'annonce, les mails QCM et les QCM eux-mêmes.
 */
import type { FormationInfo, StagiaireInfo } from "@/types/qualiopi";

function parseDate(s?: string): Date | null {
  const t = (s || "").trim();
  if (!t) return null;
  const m = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const d = m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date(t.length === 10 ? `${t}T00:00:00` : t);
  return isNaN(d.getTime()) ? null : d;
}

function lundiDe(d: Date): Date {
  const x = new Date(d);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  x.setHours(0, 0, 0, 0);
  return x;
}

/**
 * Cycle d'alternance exprimé en semaines : [semaines école, semaines entreprise].
 * « 1 jour CFA / 4 jours entreprise » → chaque semaine comporte une journée école : [1, 0].
 * « 1 semaine CFA / 3 semaines entreprise » → [1, 3]. Par défaut : [1, 3].
 */
export function cycleAlternance(rythme?: string): [number, number] {
  const r = (rythme || "").toLowerCase();
  if (!r.trim()) return [1, 3];
  if (/jour/.test(r) && !/semaine/.test(r)) return [1, 0];
  const nums = (r.match(/\d+/g) || []).map(Number);
  if (/semaine/.test(r) && nums.length >= 2) return [Math.max(1, nums[0]), Math.max(0, nums[1])];
  return [1, 3];
}

/** Lundis des semaines école de l'apprenti (ou de la session si pas de dates individuelles). */
export function semainesEcole(f: FormationInfo, s?: StagiaireInfo): Date[] {
  const debut = parseDate(s?.dateDebutFormation) || parseDate(f.dateDebut) || new Date();
  const fin = parseDate(s?.dateFinFormation) || parseDate(f.dateFin) || new Date(debut.getTime() + 364 * 86400000);
  const [ecole, entreprise] = cycleAlternance(f.rythmeAlternance);
  const cycle = ecole + entreprise;
  const out: Date[] = [];
  const cur = lundiDe(debut);
  let i = 0;
  while (cur <= fin && out.length < 400) {
    if (i % cycle < ecole) out.push(new Date(cur));
    cur.setDate(cur.getDate() + 7);
    i++;
  }
  return out.length ? out : [lundiDe(debut)];
}

/** Lundi de la semaine école où la mission N (1 à 14) est diffusée à l'apprenti. */
export function lundiMission(f: FormationInfo, missionNumero: number, s?: StagiaireInfo): Date {
  const semaines = semainesEcole(f, s);
  const n = Math.min(14, Math.max(1, missionNumero));
  const idx = Math.min(semaines.length - 1, Math.floor(((n - 1) * semaines.length) / 14));
  return new Date(semaines[idx]);
}

/** Date du QCM de la mission N : dernier jour école de la semaine (vendredi, ou le lundi en rythme « 1 jour »), bornée à la fin du contrat. */
export function dateQCMMission(f: FormationInfo, missionNumero: number, s?: StagiaireInfo): Date {
  const lundi = lundiMission(f, missionNumero, s);
  const [, entreprise] = cycleAlternance(f.rythmeAlternance);
  const d = new Date(lundi);
  if (entreprise > 0) d.setDate(d.getDate() + 4);
  const fin = parseDate(s?.dateFinFormation) || parseDate(f.dateFin);
  return fin && d > fin ? fin : d;
}
