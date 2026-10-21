import { describe, expect, it } from "vitest";
import { buildDocumentFileName, normalizeLooseFileName, shortCriterePath } from "@/lib/fileNaming";
import { auditImportedFolder } from "@/lib/importInspector";
import { DocEntry, StagiaireInfo } from "@/types/qualiopi";

const stagiaire: StagiaireInfo = {
  civilite: "M.",
  nom: "LAMBARKI",
  prenom: "Abdelkrim",
  email: "",
  telephone: "",
  entreprise: "SODEVA",
  poste: "",
  dateNaissance: "",
};

const doc: DocEntry = {
  id: "ct2_ind4_trame_eval",
  nom: "CT2 - IND 4 TRAME ÉVALUATION DES BESOINS – Abdelkrim LAMBARKI",
  critere: 2,
  indicateur: 4,
  template: "trame_eval_besoins_stagiaire",
  params: { stagiaireIdx: 0 },
};

describe("file naming convention", () => {
  it("builds the expected Google Drive-friendly file name", () => {
    expect(buildDocumentFileName(doc, "SODEVA", "1", "2025-03-03", ".pdf", stagiaire)).toBe(
      "TRAME_EVALUATION_BESOINS_Abdelkrim_LAMBARKI_SODEVA_V1_2025_03_03.pdf",
    );
  });

  it("raccourcit les noms des QCM des 14 missions CFA pour Google Drive", () => {
    const qcm = { ...doc, nom: "CT3 - IND 10 📁 14 MISSIONS / Mission 10 – Mobilité nationale et internationale – QCM EXERCICE – Abdelkrim LAMBARKI" };
    const name = buildDocumentFileName(qcm, "SKILLBOOSTED", "1", "2024-11-28", ".pdf", stagiaire);
    expect(name.startsWith("14_MISSIONS_")).toBe(false);
    expect(name.length).toBeLessThanOrEqual(120);
    expect(name.endsWith("_Abdelkrim_LAMBARKI_SKILLBOOSTED_V1_2024_11_28.pdf")).toBe(true);
  });

  it("normalizes accents, apostrophes and parenthesis", () => {
    expect(normalizeLooseFileName("CT2 IND 4 Trame d'évaluation (des besoins).pdf")).toBe(
      "CT2_IND_4_TRAME_EVALUATION_BESOINS",
    );
  });

  it("uses Critere/Indicateur folder structure", () => {
    expect(shortCriterePath(2, 4)).toBe("Critere_2/Indicateur_4");
  });

  it("matches a normalized file when the exact file name differs", () => {
    const file = new File([
      "demo",
    ], "Trame evaluation besoins Abdelkrim LAMBARKI SODEVA V1 2025_03_03.pdf", { type: "application/pdf" });
    Object.defineProperty(file, "webkitRelativePath", {
      value: "Critere_2/Indicateur_4/Trame evaluation besoins Abdelkrim LAMBARKI SODEVA V1 2025_03_03.pdf",
    });

    const audit = auditImportedFolder({
      catalog: [doc],
      dateMaj: "2025-03-03",
      exportFormat: "pdf",
      files: [file],
      orgName: "SODEVA",
      stagiaires: [stagiaire],
      version: "1",
    });

    expect(audit.normalizedCount).toBe(1);
    expect(audit.missingCount).toBe(0);
    expect(audit.matches[0].expected.searchedPath).toContain("Critere_2/Indicateur_4/");
  });
});
