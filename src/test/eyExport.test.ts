import { describe, expect, it } from "vitest";
import { buildPerStagiairePdfFileName, getYearFromDateCandidates } from "@/lib/eyExport";
import { StagiaireInfo } from "@/types/qualiopi";

describe("eyExport", () => {
  it("génère des noms de fichiers uniques même si deux stagiaires ont le même nom", () => {
    const stagiaire = {
      nom: "Mabrouk",
      prenom: "Aïcha",
      numeroAction: "ACT-42",
    } as StagiaireInfo;

    const first = buildPerStagiairePdfFileName("OF_Test", "FACTURE", stagiaire, 0);
    const second = buildPerStagiairePdfFileName("OF_Test", "FACTURE", stagiaire, 1);

    expect(first).not.toBe(second);
    expect(first).toContain("_001_");
    expect(second).toContain("_002_");
  });

  it("retombe sur un identifiant indexé si le stagiaire n'a pas de nom", () => {
    const fileName = buildPerStagiairePdfFileName("OF_Test", "FACTURE", {} as StagiaireInfo, 3);

    expect(fileName).toContain("stagiaire_004");
  });

  it("récupère l'année de formation depuis la date disponible", () => {
    expect(getYearFromDateCandidates("2028-02-10", "10/02/2026")).toBe("2028");
    expect(getYearFromDateCandidates("", "10/02/2026")).toBe("2026");
  });
});