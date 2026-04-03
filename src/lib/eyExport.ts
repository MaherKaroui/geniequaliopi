import { StagiaireInfo } from "@/types/qualiopi";

export function sanitizeFileSegment(value: string | null | undefined, fallback = ""): string {
  const normalized = (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return normalized || fallback;
}

export function buildPerStagiairePdfFileName(
  orgSafeName: string,
  docCode: string,
  stagiaire: StagiaireInfo,
  stagiaireIdx: number,
): string {
  const indexSegment = String(stagiaireIdx + 1).padStart(3, "0");
  const actionSegment = sanitizeFileSegment(stagiaire.numeroAction);
  const identitySegment = sanitizeFileSegment(
    [stagiaire.nom, stagiaire.prenom].filter((value) => typeof value === "string" && value.trim()).join("_"),
    `stagiaire_${indexSegment}`,
  );

  return [orgSafeName, docCode, indexSegment, actionSegment, identitySegment].filter(Boolean).join("_") + ".pdf";
}

export function getYearFromDateCandidates(...values: Array<string | null | undefined>): string {
  for (const value of values) {
    const raw = String(value ?? "").trim();
    if (!raw) continue;

    const isoMatch = raw.match(/^(\d{4})-\d{2}-\d{2}/);
    if (isoMatch) return isoMatch[1];

    const frMatch = raw.match(/^\d{1,2}\/\d{1,2}\/(\d{4})$/);
    if (frMatch) return frMatch[1];

    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) return String(parsed.getFullYear());
  }

  return String(new Date().getFullYear());
}