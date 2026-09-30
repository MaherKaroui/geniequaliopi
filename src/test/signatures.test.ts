import { describe, it, expect } from "vitest";
import { buildDocument } from "@/lib/docBuilder";
import { mergeOrganisme } from "@/lib/sampleData";
import { ORG_TEST } from "./dossierAudit.harness";

const doc = (org: typeof ORG_TEST) => {
  const o = mergeOrganisme(org);
  return buildDocument({ org: o, title: "T", signatures: { type: "2", labels: ["Le dirigeant", "Le référent qualité"], names: [o.dirigeant, o.referentQualite], dates: ["01/01/2026", "01/01/2026"] } });
};

describe("signatures du dirigeant et du référent qualité", () => {
  it("tampon seul quand un tampon existe (jamais signature + tampon)", () => {
    const html = doc({ ...ORG_TEST, tamponUrl: "data:image/png;base64,TAMPON", signatureUrl: "data:image/png;base64,SIGNATURE" });
    expect(html).toContain("TAMPON");
    expect(html).not.toContain("SIGNATURE");
  });
  it("signature quand il n'y a pas de tampon", () => {
    const html = doc({ ...ORG_TEST, tamponUrl: "", signatureUrl: "data:image/png;base64,SIGNATURE" });
    expect(html).toContain("SIGNATURE");
  });
  it("tampon FD CERTIF EXPERT pour le référent qualité externe", () => {
    expect(doc({ ...ORG_TEST, referentQualite: "FD Certif Expert ( Externe )" })).toContain("/images/FD_CERTIF_TAMPON.png");
    expect(doc({ ...ORG_TEST, referentQualite: "Paul TESTARD" })).not.toContain("FD_CERTIF_TAMPON");
  });
});
