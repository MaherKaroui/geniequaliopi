import { describe, expect, it } from "vitest";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const org = { ...ORG_TEST, typesActions: ["actions-formation" as const] };
const formation = FORMATIONS_TEST["actions-formation"];

describe("évaluations des besoins AF dans l'IND 10", () => {
  it("conserve l'IND 4 et ajoute la même évaluation et les mêmes réponses par stagiaire à l'IND 10", () => {
    const catalog = getFullCatalog(org, formation, STAGIAIRES_TEST);
    const ind4 = catalog.filter((d) => d.indicateur === 4 && d.template === "trame_eval_besoins_combine");
    const ind10 = catalog.filter((d) => d.indicateur === 10 && d.template === "trame_eval_besoins_combine");
    expect(ind4).toHaveLength(3);
    expect(ind10).toHaveLength(3);
    STAGIAIRES_TEST.forEach((_, si) => {
      const source = ind4.find((d) => d.params?.stagiaireIdx === si);
      const copy = ind10.find((d) => d.params?.stagiaireIdx === si);
      if (!source || !copy) throw new Error(`Évaluation manquante pour le stagiaire ${si}`);
      expect(copy.critere).toBe(3);
      expect(copy.id).not.toBe(source.id);
      expect(copy.params).toEqual(source.params);
      const render = (d: typeof source) => generateDocumentById(d.id, d.template, d.params, org, formation, STAGIAIRES_TEST);
      const html = render(source);
      expect(html.length).toBeGreaterThan(0);
      expect(render(copy)).toBe(html);
    });
  });

  it.each(["bilans-competences", "vae", "apprentissage"] as const)("n'ajoute pas ces pièces AF au dossier %s", (action) => {
    const catalog = getFullCatalog({ ...ORG_TEST, typesActions: [action] }, FORMATIONS_TEST[action], STAGIAIRES_TEST);
    expect(catalog.some((d) => d.id.startsWith("af_c3i10_trame_eval_besoins_"))).toBe(false);
  });
});