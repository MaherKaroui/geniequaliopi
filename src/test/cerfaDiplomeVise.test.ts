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
