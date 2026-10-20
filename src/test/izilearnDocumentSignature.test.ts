import { describe, it, expect } from "vitest";
import { applyDocumentSignature, signatureKey } from "@/lib/izilearn/documentSignature";
import type { IzPayload } from "@/lib/izilearn/types";
import type { Piece } from "@/lib/izilearn/pieces";

const payload = { source: { orgId: "org", sessionId: "session" }, apprenants: [{ inscriptionId: "enrollment", contactId: "contact" }, { inscriptionId: "other", contactId: "other" }] } as IzPayload;
const piece: Piece = { id: "connexion_0", categorie: "connexion", titre: "Connexion", fichier: "CONNEXION_CAMILLE", apprenantIdx: 0, source: "trame", rendre: () => "" };
const signature = { image: "data:image/png;base64,aGVsbG8=", signedAt: "2026-10-20T14:30:00Z", name: "Camille TEST" };

describe("Signatures manuelles IZILearn", () => {
  it("isole la signature du document choisi des autres stagiaires et sessions", () => {
    const key = signatureKey(payload, piece);
    expect(key).not.toBeNull();
    expect(key).not.toBe(signatureKey(payload, { ...piece, apprenantIdx: 1 }));
    expect(key).not.toBe(signatureKey({ ...payload, source: { ...payload.source, sessionId: "other" } }, piece));
    expect(key).not.toBe(signatureKey(payload, { ...piece, fichier: "AUTRE_DOCUMENT" }));
    expect(signatureKey(payload, { ...piece, apprenantIdx: null })).toBeNull();
  });
  it("ajoute seulement la signature apposée maintenant sans changer les preuves de présence", () => {
    const html = '<body><table><tr><td>Non relevé</td><td></td></tr></table><footer>Organisme</footer></body>';
    const result = applyDocumentSignature(html, signature);
    expect(result).toContain(signature.image);
    expect(result).toContain("20 octobre 2026");
    expect(result).toContain('<tr><td>Non relevé</td><td></td></tr>');
    expect(result.indexOf(signature.image)).toBeLessThan(result.indexOf("<footer>"));
    expect(applyDocumentSignature(html)).toBe(html);
  });
  it("refuse les images actives ou invalides", () => {
    expect(applyDocumentSignature("original", { ...signature, image: 'data:image/svg+xml,<svg onload="alert(1)"/>' })).toBe("original");
    expect(applyDocumentSignature("original", { ...signature, signedAt: "invalid" })).toBe("original");
  });
});