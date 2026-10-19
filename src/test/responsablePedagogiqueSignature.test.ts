import { describe, it, expect } from "vitest";
import { buildDocument } from "@/lib/docBuilder";
import { mergeOrganisme } from "@/lib/sampleData";
import { genFicheCompetencesIntervenant } from "@/lib/piecesAF2026";
import { ORG_TEST, FORMATIONS_TEST } from "./dossierAudit.harness";

const SIG = "data:image/png;base64,SIGNATURE_DIRIGEANT";
const TAMPON = "data:image/png;base64,TAMPON_ORG";
const PEDAGOGUE = ["Le responsable pédagogique", "Le/La Stagiaire"];

const doc = (org: typeof ORG_TEST, labels = PEDAGOGUE, names?: string[]) => buildDocument({
  org: mergeOrganisme(org),
  title: "T",
  signatures: {
    type: "2",
    labels,
    names: names ?? [org.responsablePedagogique, ""],
    dates: ["01/01/2026", "01/01/2026"],
  },
});

describe("signature du responsable pédagogique", () => {
  it("reprend la signature du dirigeant du formulaire organisme", () => {
    expect(doc({ ...ORG_TEST, signatureUrl: SIG, tamponUrl: TAMPON })).toContain(SIG);
  });
  it("à défaut de signature, reprend le tampon du dirigeant", () => {
    expect(doc({ ...ORG_TEST, signatureUrl: "", tamponUrl: TAMPON })).toContain(TAMPON);
  });
  it("sans signature ni tampon, laisse une ligne pointillée", () => {
    const html = doc({ ...ORG_TEST, signatureUrl: "", tamponUrl: "" });
    expect(html).toContain("border-bottom:1px dotted");
    expect(html).not.toContain(SIG);
  });
  it("ne transforme pas l'équipe pédagogique en signataire", () => {
    expect(doc(ORG_TEST, ["Pour l'équipe pédagogique", "Le/La Stagiaire"])).toContain("border-bottom:1px dotted");
  });
  it("le référent qualité FD Certif Expert garde son tampon", () => {
    expect(
      doc({ ...ORG_TEST }, ["Le référent qualité", "Le/La Stagiaire"], [ORG_TEST.referentQualite, ""])
    ).toContain("/images/FD_CERTIF_TAMPON.png");
  });
  it("un document réel signé par le responsable pédagogique porte la signature du dirigeant", () => {
    const html = genFicheCompetencesIntervenant(
      mergeOrganisme({ ...ORG_TEST, signatureUrl: SIG, tamponUrl: "" }),
      FORMATIONS_TEST["actions-formation"],
      "Paul TESTARD"
    );
    expect(html).toContain(SIG);
  });
});
