import { describe, it, expect } from "vitest";
import { buildDocument } from "@/lib/docBuilder";
import { ORG_TEST } from "./dossierAudit.harness";

const SIG_DIR = "data:image/png;base64,SIGDIRIGEANT";
const SIG_HAND = "data:image/png;base64,SIGHANDICAP";
const doc = (org: Record<string, unknown>, labels: string[], names: string[]) =>
  buildDocument({ org: { ...ORG_TEST, signatureUrl: SIG_DIR, tamponUrl: "", ...org } as never, title: "T", signatures: { type: "2", labels, names } });

describe("signature des référents", () => {
  it("même nom que le dirigeant : la signature du dirigeant est reprise", () => {
    const h = doc({ dirigeant: "Lydia NGHA", referentMobilite: "NGHA Lydia" }, ["Le Référent Mobilité", "Le Stagiaire"], ["NGHA Lydia", "X"]);
    expect(h).toContain(SIG_DIR);
  });
  it("autre personne avec sa signature : sa propre signature, jamais celle du dirigeant", () => {
    const h = doc({ dirigeant: "Lydia NGHA", referentHandicap: "Cindy TAMBA", signatureReferents: { referentHandicap: SIG_HAND } }, ["Le Référent Handicap", "Le Stagiaire"], ["Cindy TAMBA", "X"]);
    expect(h).toContain(SIG_HAND);
    expect(h).not.toContain(SIG_DIR);
  });
  it("autre personne sans signature : case laissée vide", () => {
    const h = doc({ dirigeant: "Lydia NGHA", poleAdministratif: "Noémie BAZU" }, ["Pôle administratif", "Le Stagiaire"], ["Noémie BAZU", "X"]);
    expect(h).not.toContain(SIG_DIR);
  });
  it("libellé générique « Le référent » : retrouvé par le nom", () => {
    const h = doc({ dirigeant: "Lydia NGHA", relationEntreprises: "Paul MARTIN", signatureReferents: { relationEntreprises: SIG_HAND } }, ["Le référent", "Le Stagiaire"], ["Paul MARTIN", "X"]);
    expect(h).toContain(SIG_HAND);
  });
});
