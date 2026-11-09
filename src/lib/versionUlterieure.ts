/**
 * Versions ultérieures d'un document du dossier.
 *
 * Le dossier sort en V1 à la date de mise à jour (dateMaj), au siège de cette date. Un document
 * qui relate des faits postérieurs (revue de direction, veille intégrant un texte paru après la V1,
 * analyse des risques fondée sur le décret 2026-728…) devient une version ultérieure : pied
 * « V2 <date> » et siège en vigueur à cette date (organismeALaDate).
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { organismeALaDate } from "./sampleData";

const v = (x: unknown) => (x == null ? "" : String(x).trim());
const ISO = /^\d{4}-\d{2}-\d{2}$/;

/** Organisme à présenter pour un document daté `dateISO` : inchangé si la date ne dépasse pas dateMaj. */
export function orgVersionUlterieure(o: OrganismeInfo, dateISO: string | undefined): OrganismeInfo {
  const d = v(dateISO).slice(0, 10);
  const maj = v(o.dateMaj).slice(0, 10);
  if (!ISO.test(d) || (maj && d <= maj)) return o;
  const num = Number.parseInt(v(o.version), 10);
  return { ...organismeALaDate(o, d), version: String(Number.isFinite(num) && num >= 1 ? num + 1 : 2), dateMaj: d };
}

/** Date ISO la plus récente d'une liste (dates ISO ou jj/mm/aaaa), "" si aucune. */
export function dateMax(dates: (string | undefined)[]): string {
  return dates
    .map((d) => { const m = v(d).match(/^(\d{2})\/(\d{2})\/(\d{4})$/); return m ? `${m[3]}-${m[2]}-${m[1]}` : v(d).slice(0, 10); })
    .filter((d) => ISO.test(d))
    .sort()
    .pop() || "";
}

/** Personnes distinctes de l'équipe (dirigeant, responsable pédagogique, formateurs). */
export function equipeInterne(o: OrganismeInfo, f?: FormationInfo, stagiaires?: StagiaireInfo[]): string[] {
  const set = new Map<string, string>();
  const add = (n?: string) => { const t = v(n); if (t) set.set(t.toLowerCase().replace(/\s+/g, " "), t); };
  add(o.dirigeant);
  add(o.responsablePedagogique);
  add(f?.formateur);
  (stagiaires || []).forEach((s) => add(s.formateur));
  return [...set.values()];
}

/** Vrai quand une seule personne porte l'organisme (dirigeant = formateur = responsable pédagogique). */
export function intervenantUnique(o: OrganismeInfo, f?: FormationInfo, stagiaires?: StagiaireInfo[]): boolean {
  return equipeInterne(o, f, stagiaires).length <= 1;
}
