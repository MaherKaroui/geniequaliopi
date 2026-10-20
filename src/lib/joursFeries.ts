/**
 * Jours fériés légaux de France métropolitaine (11 jours).
 * Pâques calculée par l'algorithme de Butcher (comput grégorien).
 */

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function cleDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Dimanche de Pâques (algorithme de Butcher). */
export function paquesGregorien(annee: number): Date {
  const a = annee % 19;
  const b = Math.floor(annee / 100);
  const c = annee % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mois = Math.floor((h + l - 7 * m + 114) / 31);
  const jour = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(annee, mois - 1, jour);
}

const cache = new Map<number, Set<string>>();

/** Ensemble des jours fériés (clés YYYY-MM-DD) pour une année. */
export function joursFeriesDeLAnnee(annee: number): Set<string> {
  const hit = cache.get(annee);
  if (hit) return hit;
  const p = paquesGregorien(annee);
  const decale = (n: number) => {
    const x = new Date(p);
    x.setDate(x.getDate() + n);
    return x;
  };
  const set = new Set<string>(
    [
      new Date(annee, 0, 1), // Jour de l'an
      decale(1), // Lundi de Pâques
      new Date(annee, 4, 1), // Fête du Travail
      new Date(annee, 4, 8), // Victoire 1945
      decale(39), // Ascension
      decale(50), // Lundi de Pentecôte
      new Date(annee, 6, 14), // Fête nationale
      new Date(annee, 7, 15), // Assomption
      new Date(annee, 10, 1), // Toussaint
      new Date(annee, 10, 11), // Armistice
      new Date(annee, 11, 25), // Noël
    ].map(cleDate),
  );
  cache.set(annee, set);
  return set;
}

export function estJourFerie(date: Date): boolean {
  return joursFeriesDeLAnnee(date.getFullYear()).has(cleDate(date));
}

/**
 * Un jour est-il un jour de formation ?
 * - dimanche : jamais
 * - samedi : uniquement s'il est la date de début ou la date de fin
 * - jour férié : jamais
 */
export function estJourFormation(
  current: Date,
  start: Date,
  end: Date,
  opts?: { includeSat?: boolean; hebdo?: boolean },
): boolean {
  if (estJourFerie(current)) return false;
  const dow = current.getDay();
  if (dow === 0) return false;
  // Rythme hebdomadaire : une seule journée par semaine, le même jour que la date de début.
  if (opts?.hebdo) return dow === start.getDay();
  if (dow === 6) {
    if (opts?.includeSat) return true;
    return cleDate(current) === cleDate(start) || cleDate(current) === cleDate(end);
  }
  return true;
}

/**
 * Formations suivies à raison d'une journée de 7 h par semaine (35 h réparties sur un mois) :
 * « Gérer son centre de formation – 35 h ». Seules ces formations passent en rythme hebdomadaire.
 */
export function estFormationHebdo(f?: { intitule?: string } | null): boolean {
  const t = (f?.intitule || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[‘’`´]/g, "'").replace(/\s+/g, " ");
  return /\bgerer (son|un|mon|votre) centre de formation\b/.test(t)
    || /\bgestion (d'un|de son|du|d'une structure de|de mon) centre de formation\b/.test(t);
}

/** Libellé des horaires d'une formation hebdomadaire : le jour de la semaine est celui de la date de début. */
export function texteHorairesHebdo(dateDebut?: string): string {
  const v = (dateDebut || "").trim();
  const fr = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const iso = v.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const d = fr ? new Date(+fr[3], +fr[2] - 1, +fr[1]) : iso ? new Date(+iso[1], +iso[2] - 1, +iso[3]) : null;
  const jours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const jour = d && !isNaN(d.getTime()) ? `, le ${jours[d.getDay()]}` : "";
  return `Une journée de 7 h par semaine${jour}, pendant 5 semaines (35 h réparties sur 1 mois) : 09h00 – 12h30 et 13h30 – 17h00`;
}
