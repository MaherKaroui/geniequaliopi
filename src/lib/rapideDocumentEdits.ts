import DOMPurify from "dompurify";
import type { FormationInfo, StagiaireInfo } from "@/types/qualiopi";

/** Identity-based keys keep edits separate when the list is reordered. */
export function rapideDocumentEditKey(key: string, type: FormationInfo["typeAction"], recipients: StagiaireInfo[] = [], companyDocument = false): string {
  const identities = recipients.map(s => companyDocument && s.entreprise?.trim()
    ? ["entreprise", s.entreprise.trim().toLowerCase()]
    : ["personne", s.prenom.trim().toLowerCase(), s.nom.trim().toLowerCase(), s.email?.trim().toLowerCase() || ""]);
  return JSON.stringify([key, type || "actions-formation", [...new Set(identities.map(i => JSON.stringify(i)))].sort()]);
}

export function sanitizeRapideDocument(html: string): string {
  return DOMPurify.sanitize(html, { WHOLE_DOCUMENT: true, ADD_TAGS: ["style"], FORBID_TAGS: ["script", "iframe", "object", "embed", "form"], FORBID_ATTR: ["contenteditable"] });
}

export function resolveRapideDocument(formation: FormationInfo, key: string, generate: () => string): string {
  const saved = formation.rapideDocumentEdits?.[key];
  return typeof saved === "string" ? sanitizeRapideDocument(saved) : generate();
}