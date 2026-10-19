import { describe, it, expect } from "vitest";
import { getFullCatalog } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

describe("registre de sous-traitance et de portage salarial retiré du dossier", () => {
  it("aucun dossier ne contient le registre", () => {
    for (const cle of ["actions-formation", "apprentissage", "bilans-competences", "vae"] as const) {
      const catalog = getFullCatalog(ORG_TEST, FORMATIONS_TEST[cle], STAGIAIRES_TEST);
      expect(catalog.filter((d) => /registre_sous_traitance/i.test(d.template))).toEqual([]);
      expect(catalog.filter((d) => /registre de sous-traitance/i.test(d.nom))).toEqual([]);
    }
  });
  it("l'indicateur 27 garde les autres pièces", () => {
    const catalog = getFullCatalog(ORG_TEST, FORMATIONS_TEST["actions-formation"], STAGIAIRES_TEST);
    const ind27 = catalog.filter((d) => d.indicateur === 27);
    expect(ind27.length).toBeGreaterThan(0);
    expect(ind27.some((d) => /PARTENAIRES/i.test(d.nom))).toBe(true);
  });
});
