import { describe, it, expect } from "vitest";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

describe("IND 26 — veille handicap", () => {
  for (const cle of ["actions-formation", "apprentissage", "vae"] as const) {
    it(`le dossier ${cle} contient une veille handicap exploitée`, () => {
      const org = { ...ORG_TEST, typesActions: [cle] };
      const catalog = getFullCatalog(org, FORMATIONS_TEST[cle], STAGIAIRES_TEST);
      const veille = catalog.find((d) => d.indicateur === 26 && d.template === "tableau_veille" && d.params?.type === "handicap");
      expect(veille).toBeDefined();
      const html = generateDocumentById(veille!.id, veille!.template, veille!.params, org, FORMATIONS_TEST[cle], STAGIAIRES_TEST) || "";
      expect(html).toContain("VEILLE HANDICAP");
      expect(html).toContain("Loi n° 2005-102");
      expect(html).toContain("Agefiph");
      expect(html).not.toContain("SOURCES ET RÉSEAUX SUIVIS");
    });
  }
  it("le dossier CFA cite le référent handicap obligatoire des CFA", () => {
    const org = { ...ORG_TEST, typesActions: ["apprentissage" as const] };
    const veille = getFullCatalog(org, FORMATIONS_TEST.apprentissage, STAGIAIRES_TEST).find((d) => d.indicateur === 26 && d.params?.type === "handicap")!;
    const html = generateDocumentById(veille.id, veille.template, veille.params, org, FORMATIONS_TEST.apprentissage, STAGIAIRES_TEST) || "";
    expect(html).toContain("L.6231-2");
  });
});
