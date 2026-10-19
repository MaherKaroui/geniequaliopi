import type { StandaloneBdcData, BdcDeclarations } from "./standaloneTypes";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const rowsOf = (value: unknown, keys: string[], max: number): string[][] | undefined => {
  if (!Array.isArray(value)) return undefined;
  const rows = value.slice(0, max).map(row => keys.map(k => str((row as Record<string, unknown>)?.[k]))).filter(row => row.some(Boolean));
  return rows.length ? rows : undefined;
};

/** Sessions déjà passées et dont la présence est confirmée : seules à recevoir un compte rendu. */
export function bdcHeldSessions(data: StandaloneBdcData, now = new Date()) {
  return data.sessions.filter(s => s.presence && new Date(`${s.date}T23:59:59`) < now);
}

export function applyBdcAI(data: StandaloneBdcData, result: Record<string, unknown>, now = new Date()): StandaloneBdcData {
  const declarations = { ...data.declarations };
  for (const key of Object.keys(declarations) as Array<keyof BdcDeclarations>) {
    if (typeof result[key] === "string") declarations[key] = result[key] as string;
  }
  const reponses = { ...(data.reponses || {}) };
  if (result.reponses && typeof result.reponses === "object") {
    for (const [key, value] of Object.entries(result.reponses as Record<string, unknown>)) if (/^[a-z]+_\d+$/.test(key) && str(value)) reponses[key] = str(value);
  }
  const held = new Set(bdcHeldSessions(data, now).map(s => s.numero));
  const reports = new Map<number, string>();
  if (Array.isArray(result.comptesRendus)) for (const item of result.comptesRendus as Array<Record<string, unknown>>) {
    const n = Number(item?.numero);
    if (held.has(n) && str(item?.texte)) reports.set(n, str(item.texte));
  }
  const notes = Array.isArray(result.notesSatisfaction) ? (result.notesSatisfaction as unknown[]).slice(0, 6).map(n => Math.min(5, Math.max(1, Math.round(Number(n) || 0)))) : undefined;
  return {
    ...data, aiDraft: true, declarations, reponses,
    star: rowsOf(result.star, ["situation", "actions", "resultats", "competences"], 8) || data.star,
    journal: rowsOf(result.journal, ["exercice", "enseignement", "suite"], 24) || data.journal,
    actions: rowsOf(result.actions, ["action", "echeance", "ressources", "resultat"], 10) || data.actions,
    notesSatisfaction: notes?.length === 6 && notes.every(n => n >= 1) ? notes : data.notesSatisfaction,
    sessions: data.sessions.map(s => (reports.has(s.numero) ? { ...s, compteRendu: reports.get(s.numero)! } : s)),
    formation: { ...data.formation, objectifs: typeof result.objectifs === "string" ? result.objectifs : data.formation.objectifs, programme: typeof result.programme === "string" ? result.programme : data.formation.programme },
  };
}
