import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { Blob as NodeBlob } from "node:buffer";
import { PDFDocument } from "pdf-lib";
import { contexte, planPieces } from "@/lib/izilearn/pieces";
import { contexteAvecSignatures, signatureKey } from "@/lib/izilearn/documentSignature";
import { mailPourCapture } from "@/lib/izilearn/mailCapture";
import { lienMailto } from "@/lib/izilearn/mails";
import { payloadCapture } from "@/lib/mails/mailsAutomatiques";
import type { IzPayload } from "@/lib/izilearn/types";

const image = `data:image/png;base64,${readFileSync("public/mycertif/president_signature.png").toString("base64")}`;
const dossier = (): IzPayload => ({
  version: 1, source: { app: "izilearn", url: "http://localhost:8080", orgId: "org", sessionId: "session" },
  organisme: { id: "org", nom: "CFA TEST", email: "cfa@example.fr", siret: "12345678900011", uai: "0751234A", ville: "Paris", tamponUrl: image },
  formation: { id: "f", intitule: "Négociateur technico-commercial", typeAction: "apprentissage", codeCertification: "RNCP39063", dureeHeures: 400, modules: [], blocs: [] },
  session: { id: "session", dateDebut: "2026-01-05", dateFin: "2026-12-18", modalite: "presentiel" }, creneaux: [],
  apprenants: [{ inscriptionId: "e", contactId: "c", prenom: "Lina", nom: "TEST", email: "lina@example.fr", statut: "inscrit", signatures: [], connexions: [], nir: "299010012345678", entreprise: { nom: "ENTREPRISE TEST", siret: "98765432100011", email: "rh@example.fr", representant: "Nora TEST" }, contratApprentissage: { dateDebut: "2025-12-01", dateFin: "2026-12-31", dateConclusion: "2025-11-28", typeContrat: "11", heuresHebdomadaires: "35", salaireBrut: "1200,50" } }],
});

afterEach(() => vi.unstubAllGlobals());

async function cerfa(p: IzPayload, signatures: Record<string, string> = {}) {
  vi.stubGlobal("Blob", NodeBlob);
  vi.stubGlobal("fetch", vi.fn(async () => new Response(readFileSync("public/pdfs/cerfa/cerfa_10103-14.pdf"))));
  const cx = contexteAvecSignatures(contexte(p), signatures);
  const piece = planPieces(cx).find(x => x.id === "cerfa_0");
  if (!piece?.pdf) throw new Error("CERFA absent");
  const blob = await piece.pdf();
  return PDFDocument.load(await blob.arrayBuffer());
}

describe("CERFA et mails entreprise IZILearn", () => {
  it("ajoute un CERFA PDF par apprenant uniquement en CFA", () => {
    const p = dossier();
    expect(planPieces(contexte(p)).filter(x => x.categorie === "cerfa").map(x => x.apprenantIdx)).toEqual([0]);
    p.formation.typeAction = "actions-formation";
    expect(planPieces(contexte(p)).some(x => x.categorie === "cerfa")).toBe(false);
  });

  it("remplit les identités, UAI, NIR, durée et dates du contrat distinctes de la session", async () => {
    const pdf = await cerfa(dossier());
    const form = pdf.getForm();
    expect(pdf.getPageCount()).toBe(2);
    expect(form.getTextField("Zone de texte 8").getText()).toBe("ENTREPRISE TEST");
    expect(form.getTextField("Zone de texte 8_17").getText()).toBe("Lina");
    expect(form.getTextField("Zone de texte 8_18").getText()).toBe("299010012345678");
    expect(form.getTextField("Zone de texte 8_73").getText()).toBe("0751234A");
    expect(form.getTextField("Zone de texte 21_80").getText()).toBe("400");
    expect(form.getTextField("Zone de texte 21_20").getText()).toBe("12");
    expect(form.getTextField("Zone de texte 21_26").getText()).toBe("01");
    expect(form.getTextField("Zone de texte 8_72").getText()).toBe("1200");
    expect(form.getTextField("Zone de texte 21_73").getText()).toBe("50");
  });

  it("reprend les deux signatures disponibles et le cachet sans signature inventée", async () => {
    const p = dossier();
    const stagiaire = signatureKey(p, 0, "stagiaire");
    const entreprise = signatureKey(p, 0, "entreprise");
    if (!stagiaire || !entreprise) throw new Error("Identité absente");
    const signed = await cerfa(p, { [stagiaire]: image, [entreprise]: image });
    const unsigned = await cerfa(p);
    expect(signed.getPage(1).node.Resources()?.lookupMaybe).toBeDefined();
    const count = (pdf: PDFDocument) => pdf.getPage(1).node.Resources()?.toString().match(/\/Image-/g)?.length || 0;
    expect(count(signed)).toBe(3);
    expect(count(unsigned)).toBe(1);
  });

  it("ne remplace pas les déclarations contractuelles absentes par des valeurs présumées", async () => {
    const p = dossier();
    delete p.apprenants[0].contratApprentissage;
    const pdf = await cerfa(p);
    const form = pdf.getForm();
    for (const field of ["Zone de texte 8_71", "Zone de texte 8_68", "Zone de texte 8_72", "Zone de texte 8_95", "Zone de texte 21_19"]) expect(form.getTextField(field).getText() || "").toBe("");
    expect(form.getCheckBox("Case #C3#A0 cocher 8").isChecked()).toBe(false);
  });

  it("adresse le mail CERFA à l’entreprise et garde l’apprenant en CC dans les captures et mailto", () => {
    const cx = contexte(dossier());
    const m = planPieces(cx).find(x => x.mail?.key === "cfa_convention")?.mail;
    if (!m) throw new Error("Mail entreprise absent");
    const capture = mailPourCapture(m, cx.o);
    expect(capture.messages[0].fromEmail).toBe("cfa@example.fr");
    expect(capture.messages[0].toEmail).toBe("rh@example.fr");
    expect(capture.messages[0].cc).toEqual([{ name: "Lina TEST", email: "lina@example.fr" }]);
    expect(m.piecesJointes.some(x => x.includes("CERFA"))).toBe(true);
    expect(lienMailto(m)).toContain("&cc=lina%40example.fr");
    for (const client of ["gmail", "outlook"] as const) expect(JSON.stringify(payloadCapture(capture, client))).toContain('"cc":[{"name":"Lina TEST","email":"lina@example.fr"}]');
  });

  it("n’utilise jamais l’adresse de l’apprenant comme adresse entreprise manquante", () => {
    const p = dossier();
    if (p.apprenants[0].entreprise) delete p.apprenants[0].entreprise.email;
    const m = planPieces(contexte(p)).find(x => x.mail?.key === "cfa_convention")?.mail;
    expect(m?.destinataireEmail).toBe("");
    expect(m?.cc?.[0].email).toBe("lina@example.fr");
  });
});