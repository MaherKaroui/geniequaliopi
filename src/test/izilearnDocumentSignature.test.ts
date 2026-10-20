import { describe, it, expect } from "vitest";
import { applyLearnerSignatures, contexteAvecSignatures, signatureKey, validSignatureImage } from "@/lib/izilearn/documentSignature";
import type { IzPayload } from "@/lib/izilearn/types";
import { contexte, planPieces, type Piece } from "@/lib/izilearn/pieces";

const payload = { source: { orgId: "org", sessionId: "session" }, organisme: { nom: "Centre TEST" }, formation: { typeAction: "actions-formation", intitule: "Formation TEST", modules: [], blocs: [] }, session: { dateDebut: "2026-01-05", dateFin: "2026-01-06", modalite: "distanciel" }, creneaux: [], apprenants: [{ inscriptionId: "enrollment", contactId: "contact", prenom: "Camille", nom: "TEST", entreprise: { nom: "ACME", representant: "Alex TEST" }, signatures: [], connexions: [] }, { inscriptionId: "other", contactId: "other", prenom: "Autre", nom: "TEST", signatures: [], connexions: [] }] } as unknown as IzPayload;
const piece: Piece = { id: "connexion_0", categorie: "connexion", titre: "Connexion", fichier: "CONNEXION_CAMILLE", apprenantIdx: 0, source: "trame", rendre: () => "" };
const image = "data:image/png;base64,aGVsbG8=";
const companyImage = "data:image/png;base64,Y29tcGFueQ==";

describe("Signatures manuelles IZILearn", () => {
  it("reprend la signature sous le relevé uniquement pour le jour enregistré", () => {
    const p = { ...payload, apprenants: [{ ...payload.apprenants[0], signatureUrl: image, connexions: [{ debut: "2026-01-05T09:05:00", secondes: 9000, source: "lms" as const }] }] };
    const cx = contexteAvecSignatures(contexte(p), {});
    const report = planPieces(cx).find((p) => p.id === "connexion_0");
    if (!report) throw new Error("Relevé absent");
    const doc = new DOMParser().parseFromString(applyLearnerSignatures(report.rendre(), report, cx), "text/html");
    const copied = doc.querySelectorAll('img[alt="Signature stagiaire reprise"]');
    expect(copied).toHaveLength(1);
    expect(copied[0].closest("table")).toBeNull();
    expect(doc.querySelector('[data-learner-signature="recorded-connection"]')?.textContent).toContain("Signature reprise");
    expect(doc.body.textContent).toContain("Non relevé");
  });
  it("reprend la signature disponible seulement sur les jours enregistrés sans écraser une signature existante", () => {
    const cx = contexteAvecSignatures(contexte({ ...payload, apprenants: [{ ...payload.apprenants[0], signatureUrl: image }, payload.apprenants[1]] }), {});
    expect(cx.stagiaires[0].signatureUrl).toBe(image);
    const html = `<body><table><tr><td data-learner-signature="recorded-connection"></td><td data-learner-signature="recorded-connection"><img src="${companyImage}"></td><td>Non relevé</td><td></td></tr></table></body>`;
    const doc = new DOMParser().parseFromString(applyLearnerSignatures(html, piece, cx), "text/html");
    expect(doc.querySelectorAll('img[alt="Signature stagiaire reprise"]')).toHaveLength(1);
    expect(doc.querySelectorAll("img")).toHaveLength(2);
    expect(doc.querySelectorAll("td")[3].querySelector("img")).toBeNull();
    expect(doc.body.textContent).toContain("Signature reprise");
  });
  it("isole les signatures entre apprenants, entreprises et sessions", () => {
    const key = signatureKey(payload, 0, "stagiaire");
    expect(key).not.toBeNull();
    expect(key).not.toBe(signatureKey(payload, 1, "stagiaire"));
    expect(key).not.toBe(signatureKey({ ...payload, source: { ...payload.source, sessionId: "other" } }, 0, "stagiaire"));
    expect(key).not.toBe(signatureKey(payload, 0, "entreprise"));
    expect(signatureKey(payload, 1, "entreprise")).toBeNull();
  });
  it("reprend une seule signature dans tous les documents du stagiaire et celle de son responsable dans sa convention", () => {
    const key = signatureKey(payload, 0, "stagiaire");
    const company = signatureKey(payload, 0, "entreprise");
    if (!key || !company) throw new Error("Clés absentes");
    const cx = contexteAvecSignatures(contexte(payload), { [key]: image, [company]: companyImage });
    expect(cx.stagiaires[0].signatureUrl).toBe(image);
    expect(cx.stagiaires[0].signatureResponsableUrl).toBe(companyImage);
    expect(cx.stagiaires[1].signatureUrl).toBeUndefined();
    const pieces = planPieces(cx);
    for (const category of ["convention", "besoins"]) {
      const p = pieces.find((p) => p.categorie === category && p.apprenantIdx === 0);
      if (!p) throw new Error("Pièce absente");
      expect(applyLearnerSignatures(p.rendre(), p, cx)).toContain(image);
    }
    const convention = pieces.find((p) => p.categorie === "convention" && p.apprenantIdx === 0);
    expect(convention?.rendre()).toContain(companyImage);
  });
  it("remplit les cases importées sans signer les lignes de présence ou les autres rôles", () => {
    const cx = contexte(payload);
    cx.stagiaires[0].signatureUrl = image;
    const html = '<body><table><tr><td>Non relevé</td><td></td></tr></table><div class="sig-box"><p class="sig-label">L’apprenant</p></div><div class="sig-box"><p class="sig-label">Le formateur</p></div></body>';
    const result = applyLearnerSignatures(html, piece, cx);
    const doc = new DOMParser().parseFromString(result, "text/html");
    expect(doc.querySelector("table img")).toBeNull();
    expect(doc.querySelectorAll(".sig-box img")).toHaveLength(1);
    expect(applyLearnerSignatures(html, { ...piece, apprenantIdx: null }, cx)).toBe(html);
  });
  it("refuse les images actives ou invalides", () => {
    expect(validSignatureImage('data:image/svg+xml,<svg onload="alert(1)"/>')).toBe(false);
    expect(validSignatureImage(image)).toBe(true);
  });
});