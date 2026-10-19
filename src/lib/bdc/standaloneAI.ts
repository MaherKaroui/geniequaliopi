import type { StandaloneBdcData, BdcDeclarations } from "./standaloneTypes";

export function applyBdcAI(data: StandaloneBdcData, result: Record<string, unknown>): StandaloneBdcData {
  const declarations = { ...data.declarations };
  for (const key of Object.keys(declarations) as Array<keyof BdcDeclarations>) {
    if (typeof result[key] === "string") declarations[key] = result[key] as string;
  }
  return { ...data, aiDraft: true, declarations, formation: { ...data.formation, objectifs: typeof result.objectifs === "string" ? result.objectifs : data.formation.objectifs, programme: typeof result.programme === "string" ? result.programme : data.formation.programme } };
}