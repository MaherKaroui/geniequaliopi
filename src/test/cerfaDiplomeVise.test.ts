import { describe, it, expect } from "vitest";
import { codeDiplomeVise } from "@/lib/cerfaApprentissage";
describe("codeDiplomeVise", () => {
  it("BTS → 54", () => expect(codeDiplomeVise("BTS MCO")).toBe("54"));
  it("CAP → 33", () => expect(codeDiplomeVise("CAP Esthétique")).toBe("33"));
  it("niveau 5 → 58", () => expect(codeDiplomeVise("Titre pro niveau 5")).toBe("58"));
  it("inconnu → vide", () => expect(codeDiplomeVise("Excel")).toBe(""));
});
