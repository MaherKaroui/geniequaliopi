import type { IzPayload } from "./types";
import type { Piece } from "./pieces";

export interface DocumentSignature { image: string; signedAt: string; name: string }

export function signatureKey(payload: IzPayload, piece: Piece): string | null {
  if (piece.mail || piece.apprenantIdx === null) return null;
  const learner = payload.apprenants[piece.apprenantIdx];
  if (!learner) return null;
  return JSON.stringify([payload.source.orgId, payload.source.sessionId, learner.inscriptionId, learner.contactId, piece.categorie, piece.fichier]);
}

export function validSignatureImage(image: string): boolean {
  return /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(image) && image.length <= 3_000_000;
}

const escape = (text: string) => text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] ?? c));

/** Current document acknowledgement, never copied into recorded attendance rows. */
export function applyDocumentSignature(html: string, signature?: DocumentSignature): string {
  if (!signature || !validSignatureImage(signature.image)) return html;
  const date = new Date(signature.signedAt);
  if (!Number.isFinite(date.getTime())) return html;
  const stamp = date.toLocaleString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const block = `<section data-izilearn-document-signature="true" style="break-inside:avoid;margin-top:20px"><p><strong>Signature du stagiaire — ${escape(signature.name)}</strong></p><p>Signature apposée sur ce document le ${escape(stamp)}</p><img src="${signature.image}" alt="Signature du stagiaire" style="max-width:220px;max-height:90px;object-fit:contain" /></section>`;
  // Put the acknowledgement before the legal footer, preserving its position.
  const footer = html.search(/<footer\b/i);
  if (footer >= 0) return html.slice(0, footer) + block + html.slice(footer);
  return /<\/body>/i.test(html) ? html.replace(/<\/body>/i, `${block}</body>`) : html + block;
}