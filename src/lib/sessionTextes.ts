// Libellés dérivés des données réelles de la session (jours, tarif, moyens à distance).
// Génériques : aucune valeur n'est inventée, on reformule seulement ce qui est saisi.
import { estJourFormation, estFormationHebdo, texteHorairesHebdo } from "./joursFeries";

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const HEURES = "09h00 – 12h30 et 13h30 – 17h00";
const HEURES_LIGNE = "09h00–12h30 / 13h30–17h00";

function parseDate(v?: string): Date | null {
  const t = (v || "").trim();
  const fr = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const iso = t.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const d = fr ? new Date(+fr[3], +fr[2] - 1, +fr[1]) : iso ? new Date(+iso[1], +iso[2] - 1, +iso[3]) : null;
  return d && !isNaN(d.getTime()) ? d : null;
}

/**
 * Jours réels de la session quand ils tiennent dans une même semaine sans interruption :
 * « du mardi au jeudi (3 jours consécutifs) », « le mardi (1 jour) ». Sinon null (libellé standard).
 */
export function joursSessionLabel(dateDebut?: string, dateFin?: string): string | null {
  const a = parseDate(dateDebut);
  const b = parseDate(dateFin) || a;
  if (!a || !b || b < a) return null;
  const span = Math.round((b.getTime() - a.getTime()) / 86400000);
  if (span > 6) return null;
  let n = 0;
  const cur = new Date(a);
  while (cur <= b) {
    if (!estJourFormation(cur, a, b)) return null; // jour non travaillé au milieu : pas de plage continue
    n++;
    cur.setDate(cur.getDate() + 1);
  }
  if (n === 1) return `le ${JOURS[a.getDay()]} (1 jour)`;
  return `du ${JOURS[a.getDay()]} au ${JOURS[b.getDay()]} (${n} jours consécutifs)`;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Horaires en phrase, jours dérivés des dates de session quand c'est possible. */
export function horairesSessionTexte(
  f: { intitule?: string; dateDebut?: string; dateFin?: string },
  dateDebut?: string, dateFin?: string, suffixe = "(7 h/jour)",
): string {
  if (estFormationHebdo(f)) return texteHorairesHebdo(dateDebut || f.dateDebut);
  const j = joursSessionLabel(dateDebut || f.dateDebut, dateFin || f.dateFin);
  return `${j ? cap(j) : "Du lundi au vendredi"} : ${HEURES} ${suffixe}`;
}

/** Horaires en ligne courte (contrat, livret). */
export function horairesSessionLigne(
  f: { intitule?: string; dateDebut?: string; dateFin?: string },
  dateDebut?: string, dateFin?: string, suffixe = "(7 h/jour)",
): string {
  if (estFormationHebdo(f)) return texteHorairesHebdo(dateDebut || f.dateDebut);
  const j = joursSessionLabel(dateDebut || f.dateDebut, dateFin || f.dateFin);
  return `${j ? cap(j) + ", " : "Lun-Ven "}${HEURES_LIGNE} ${suffixe}`;
}

/** Le tarif saisi porte-t-il déjà la mention d'exonération de TVA ? */
export function tarifMentionneTva(tarif?: string): boolean {
  return /TVA\s*(non\s+applicable|0\s*%|exon)|261[\s-]*4|exon[ée]r/i.test(tarif || "");
}

/**
 * Tarif exonéré de TVA : « 1 500 € net de taxe (TVA non applicable – art. 261-4-4° a du CGI) ».
 * « TTC »/« HT » n'ont pas de sens sans TVA ; la mention n'est écrite qu'une fois.
 * Un tarif sans mention d'exonération est rendu tel quel.
 */
export function tarifNetDeTaxe(tarif?: string, avecMention = true): string {
  const t = (tarif || "").trim();
  if (!t || !tarifMentionneTva(t)) return t;
  let r = t
    .replace(/\s*\((?=[^)]*(TVA|261|exon))[^)]*\)/gi, "")
    .replace(/\s*[–—,-]?\s*TVA\s+(non\s+applicable|0\s*%)[^.;()]*[.;]?/gi, "")
    .replace(/\s*[–—,-]?\s*exon[ée]r[ée]?[e]?\s+de\s+TVA[^.;()]*[.;]?/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  if (/\b(TTC|HT|H\.T\.|T\.T\.C\.)(?=\s|$)/i.test(r)) r = r.replace(/\b(TTC|HT|H\.T\.|T\.T\.C\.)(?=\s|$)/i, "net de taxe");
  else if (!/net de taxe/i.test(r)) r = r.replace(/€/, "€ net de taxe");
  return avecMention ? `${r} (TVA non applicable – art. 261-4-4° a du CGI)` : r;
}

/** Formation 100 % à distance (ni présentiel ni mixte). */
export function estDistancielPur(f: { modalites?: string }): boolean {
  const m = (f.modalites || "").toLowerCase();
  return /distanciel|e-learning|foad|visio|classe virtuelle/.test(m) && !/mixte|pr[ée]sentiel|hybride/.test(m.replace(/distanciel/g, ""));
}

/** Moyens propres à une salle de formation (fournis par l'OF sur place). */
const RE_MOYEN_PRESENTIEL = /vid[ée]oprojecteur|[ée]cran de projection|paperboard|tableau blanc|cl[ée] usb|salle de formation|ordinateur individuel par stagiaire|poste informatique (mis à disposition|fourni)|mat[ée]riel informatique mis à disposition/i;

/**
 * Liste de moyens saisie, filtrée des moyens de présentiel quand la formation est 100 % à distance,
 * complétée par les moyens à distance réellement mobilisés (classe virtuelle, partage d'écran, poste du stagiaire).
 */
export function moyensSelonModalite(moyens: string, f: { modalites?: string; lieu?: string }): string[] {
  const items = (moyens || "")
    .split(/\n|[,;](?=\s)/)
    .map((l) => l.trim().replace(/^[-•]\s*/, "").replace(/\.$/, ""))
    .filter((l) => l.length > 3);
  if (!estDistancielPur(f)) return items;
  const garde = items.filter((l) => !RE_MOYEN_PRESENTIEL.test(l));
  const outil = (f.lieu || "").trim() && /meet|zoom|teams|visio|webex|jitsi/i.test(f.lieu || "") ? ` (${(f.lieu || "").trim()})` : "";
  const ajout = [
    `Classe virtuelle en visioconférence${outil} avec partage d'écran du formateur`,
    "Poste informatique personnel du stagiaire, connecté à internet (webcam et micro)",
  ];
  return [...ajout.filter((a) => !garde.some((g) => g.toLowerCase().startsWith(a.slice(0, 15).toLowerCase()))), ...garde];
}
