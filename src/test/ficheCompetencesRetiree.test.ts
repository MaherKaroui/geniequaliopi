import { describe, it, expect } from "vitest";
import { getFullCatalog } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

describe("fiche de compétences des intervenants retirée du dossier", () => {
  it("l'indicateur 21 ne contient plus de fiche de compétences", () => {
    for (const cle of ["actions-formation", "apprentissage", "bilans-competences", "vae"] as const) {
      const catalog = getFullCatalog(ORG_TEST, FORMATIONS_TEST[cle], STAGIAIRES_TEST);
      expect(catalog.filter((d) => d.template === "fiche_competences_intervenant")).toEqual([]);
      expect(catalog.filter((d) => /FICHE DE COMPÉTENCES/i.test(d.nom))).toEqual([]);
    }
  });
  it("les autres pièces de l'indicateur 21 restent au dossier", () => {
    const catalog = getFullCatalog(ORG_TEST, FORMATIONS_TEST["actions-formation"], STAGIAIRES_TEST);
    const ind21 = catalog.filter((d) => d.indicateur === 21);
    expect(ind21.length).toBeGreaterThan(0);
    expect(ind21.some((d) => /FICHE DE POSTE/i.test(d.nom))).toBe(true);
  });
});
