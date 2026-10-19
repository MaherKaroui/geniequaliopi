import type { StandaloneBdcData } from "./standaloneTypes";
export const BDC_HISTORY_KEY = "bdc_standalone_history_v1";
export interface BdcHistoryEntry { id: string; name: string; updatedAt: string; data: StandaloneBdcData; }
export function readBdcHistory(storage: Pick<Storage, "getItem"> = localStorage): BdcHistoryEntry[] {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(BDC_HISTORY_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((entry): entry is BdcHistoryEntry => !!entry && typeof entry.id === "string" && typeof entry.name === "string" && !!entry.data?.organisme && !!entry.data?.declarations && Array.isArray(entry.data?.sessions)) : [];
  } catch { return []; }
}
export function writeBdcHistory(entries: BdcHistoryEntry[], storage: Pick<Storage, "setItem"> = localStorage) {
  storage.setItem(BDC_HISTORY_KEY, JSON.stringify(entries));
}