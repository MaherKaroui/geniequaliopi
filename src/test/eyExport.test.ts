import { describe, expect, it } from "vitest";
import { buildPerStagiairePdfFileName, getYearFromDateCandidates } from "@/lib/eyExport";
import { StagiaireInfo } from "@/types/qualiopi";

describe("eyExport", () => {
  it("génère des noms de fichiers avec le bon format", () => {
    const stagiaire = {
      nom: "Mabrouk",
      prenom: "Aïcha",
      numeroAction: "ACT-42",
    } as StagiaireInfo;

    const first = buildPerStagiairePdfFileName("LA_MAISON_D_APPRENTISSAGE", "BPL_03", "Contrat de formation", stagiaire, 0, "1", "2025-07-23");
    expect(first).toBe("CONTRAT_DE_FORMATION_Aicha_MABROUK_LA_MAISON_D_APPRENTISSAGE_V1_23_07_2025.pdf");
  });

  it("retombe sur un nom vide si le stagiaire n'a pas de nom", () => {
    const fileName = buildPerStagiairePdfFileName("OF_Test", "FACTURE", "Facture", {} as StagiaireInfo, 3);
    expect(fileName).toContain("FACTURE");
    expect(fileName).toContain("OF_TEST");
  });

  it("récupère l'année de formation depuis la date disponible", () => {
    expect(getYearFromDateCandidates("2028-02-10", "10/02/2026")).toBe("2028");
    expect(getYearFromDateCandidates("", "10/02/2026")).toBe("2026");
  });
});
