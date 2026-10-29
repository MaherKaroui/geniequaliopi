import { describe, it, expect, beforeAll } from "vitest";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST, preloadFormationsTest } from "./dossierAudit.harness";

const org = { ...ORG_TEST, typesActions: ["apprentissage" as const] };
const texte = (h: string) => h.replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

function conventionHtml(intitule: string): string {
  const f = { ...FORMATIONS_TEST["apprentissage"], intitule };
  const d = getFullCatalog(org, f, STAGIAIRES_TEST).find((x) => x.template === "convention_formation_cfa");
  expect(d).toBeTruthy();
  return generateDocumentById(d!.id, d!.template, d!.params, org, f, STAGIAIRES_TEST);
}

describe("Convention CFA — règles OPCO 2025", () => {
  beforeAll(async () => { await preloadFormationsTest(); }, 120_000);

  it("affiche les plafonds de prise en charge OPCO par niveau (500 € / 300 € / 0 €)", () => {
    const t = texte(conventionHtml("TP NTC — Négociateur technico-commercial"));
    expect(t).toContain("1er juillet 2025");
    expect(t).toContain("Jusqu'à 500 €");
    expect(t).toContain("Jusqu'à 300 €");
    expect(t).toContain("0 € (aide supprimée)");
  });

  it("marque la ligne du niveau préparé (niveau 5 pour un BTS)", () => {
    const t = texte(conventionHtml("BTS Négociation et digitalisation de la relation client"));
    expect(t).toContain("Niveau 5 ← diplôme préparé");
  });

  it("ajoute la participation obligatoire de 750 € (200 € après rupture) pour un diplôme Bac+3 ou plus", () => {
    const t = texte(conventionHtml("Licence professionnelle management des organisations"));
    expect(t).toContain("750 €");
    expect(t).toContain("200 €");
  });

  it("n'ajoute pas la participation de 750 € pour un diplôme de niveau 5", () => {
    const t = texte(conventionHtml("TP NTC — Négociateur technico-commercial"));
    expect(t).not.toContain("750 €");
  });
});
