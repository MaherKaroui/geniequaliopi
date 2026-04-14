import { StagiaireInfo } from "@/types/qualiopi";

export function sanitizeFileSegment(value: string | null | undefined, fallback = ""): string {
  const normalized = (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`]/g, "_")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return normalized || fallback;
}

function toUpperSegment(value: string): string {
  return sanitizeFileSegment(value).toUpperCase();
}

function formatDateDMY(dateStr?: string): string {
  if (!dateStr) {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, "0")}_${String(now.getMonth() + 1).padStart(2, "0")}_${now.getFullYear()}`;
  }
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return dateStr.replace(/[^0-9]/g, "_");
  return `${String(parsed.getDate()).padStart(2, "0")}_${String(parsed.getMonth() + 1).padStart(2, "0")}_${parsed.getFullYear()}`;
}

/**
 * Build a file name like: Contrat_Formation_Prenom_NOM_LA_MAISON_D_APPRENTISSAGE_V1_23_07_2025.pdf
 */
export function buildPerStagiairePdfFileName(
  orgSafeName: string,
  _docCode: string,
  docLabel: string,
  stagiaire: StagiaireInfo,
  _stagiaireIdx: number,
  version = "1",
  dateMaj?: string,
): string {
  const docSegment = toUpperSegment(docLabel);
  const prenomSegment = sanitizeFileSegment(stagiaire.prenom);
  const nomSegment = sanitizeFileSegment(stagiaire.nom)?.toUpperCase();
  const orgSegment = toUpperSegment(orgSafeName);
  const versionSegment = `V${version.replace(/[^0-9]/g, "") || "1"}`;
  const dateSegment = formatDateDMY(dateMaj);

  const parts = [docSegment, prenomSegment, nomSegment, orgSegment, versionSegment, dateSegment].filter(Boolean);
  return parts.join("_") + ".pdf";
}

/**
 * Build a folder name from document label, e.g. "Contrat_Formation"
 */
export function buildDocFolderName(docLabel: string): string {
  return sanitizeFileSegment(docLabel) || "Document";
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
