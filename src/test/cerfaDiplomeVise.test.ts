import { describe, it, expect } from "vitest";
import { codeDiplomeVise } from "@/lib/cerfaApprentissage";
describe("codeDiplomeVise", () => {
  it("BTS → 54", () => expect(codeDiplomeVise("BTS MCO")).toBe("54"));
  it("CAP → 33", () => expect(codeDiplomeVise("CAP Esthétique")).toBe("33"));
  it("niveau 5 → 58", () => expect(codeDiplomeVise("Titre pro niveau 5")).toBe("58"));
  it("inconnu → vide", () => expect(codeDiplomeVise("Excel")).toBe(""));
});
describe("TP", () => {
  it("TP NTC → 58", () => expect(codeDiplomeVise("TP Négociateur Technico-Commercial (NTC)")).toBe("58"));
});
import { codeDiplomeOfficiel } from "@/lib/cerfaApprentissage";
describe("code diplôme officiel", () => {
  it("NTC → 36T31203", () => expect(codeDiplomeOfficiel("TP Négociateur technico-commercial")).toBe("36T31203"));
  it("inconnu → vide", () => expect(codeDiplomeOfficiel("Excel")).toBe(""));
});
import { chargerCodesDiplomes } from "@/lib/cerfaApprentissage";
describe("base Éducation nationale", () => {
  it("TP Gestionnaire de paie", async () => {
    const b = await chargerCodesDiplomes();
    expect(codeDiplomeOfficiel("TP Gestionnaire de paie", "", b)).toMatch(/^.{8}$/);
  });
});
describe("codes TP précis", () => {
  it("paie → 36T31501, transport → 46T31102", async () => {
    const b = await chargerCodesDiplomes();
    expect(codeDiplomeOfficiel("TP Gestionnaire de paie", "", b)).toBe("36T31501");
    expect(codeDiplomeOfficiel("TP Exploitant en transport routier de marchandises", "", b)).toBe("46T31102");
  });
});
import { niveauDiplome } from "@/lib/cerfaApprentissage";
describe("niveau maître", () => {
  it("BTS → 5, Master → 7, CAP → 3, Bac+3 → 6", () => {
    expect(niveauDiplome("BTS MCO")).toBe("5");
    expect(niveauDiplome("Master RH")).toBe("7");
    expect(niveauDiplome("CAP cuisine")).toBe("3");
    expect(niveauDiplome("Bac+3 commerce")).toBe("6");
  });
});
