import { describe, expect, it } from "vitest";
import JSZip from "jszip";
import { buildDocumentFileName, limiterCheminsZip, MAX_CHEMIN_ZIP, normalizeLooseFileName, shortCriterePath } from "@/lib/fileNaming";
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
    const qcm = { ...doc, nom: "CT3 - IND 10 📁 14 MISSIONS / Mission 9 – Diversité & lutte contre les discriminations – QCM Exercice – Abdelkrim LAMBARKI", params: { stagiaireIdx: 0, missionNumero: 9, folder: "14_MISSIONS_CFA/Mission_9_Diversite_Discriminations" } };
    expect(buildDocumentFileName(qcm, "SKILLBOOSTED", "1", "2024-11-28", ".pdf", stagiaire)).toBe(
      "MISSION_9_QCM_EXERCICE_Abdelkrim_LAMBARKI_SKILLBOOSTED_V1_2024_11_28.pdf",
    );
  });

  it("garde le numéro d'exercice quand le libellé est raccourci (pas de doublon)", () => {
    const noms = [1, 2, 3, 4, 5].map((n) => buildDocumentFileName(
      { ...doc, nom: `CT3 - IND 11 EXERCICE PRATIQUE (Bloc 1 – CP3 Mettre en place et suivre les indicateurs… – Ex. ${n}/5) – Abdelkrim LAMBARKI` },
      "SKILLBOOSTED", "1", "2024-11-28", ".pdf", stagiaire,
    ));
    expect(new Set(noms).size).toBe(5);
    noms.forEach((nom, i) => expect(nom).toContain(`_EX_${i + 1}_5_Abdelkrim_LAMBARKI_`));
  });

  it("limite la longueur des chemins du ZIP sans écraser de fichier", async () => {
    const zip = new JSZip();
    const dossier = "Critere_3/Indicateur_10/14_MISSIONS_CFA/Mission_9_Diversite_Discriminations/Stephanie_MANSOURI";
    const long = (n: number) => `${dossier}/14_MISSIONS_MISSION_9_DIVERSITE_LUTTE_CONTRE_DISCRIMINATIONS_QCM_EXERCICE_VARIANTE_${n}_Stephanie_MANSOURI_SKILLBOOSTED_V1_2024_11_28.pdf`;
    zip.file(long(1), "a");
    zip.file(long(2), "b");
    zip.file("Critere_1/Indicateur_1/COURT_SKILLBOOSTED_V1_2024_11_28.pdf", "c");
    expect(await limiterCheminsZip(zip)).toBe(2);
    const chemins = Object.keys(zip.files).filter((c) => !zip.files[c].dir);
    expect(chemins).toHaveLength(3);
    chemins.forEach((c) => expect(c.length).toBeLessThanOrEqual(MAX_CHEMIN_ZIP + 3));
    expect(chemins).toContain("Critere_1/Indicateur_1/COURT_SKILLBOOSTED_V1_2024_11_28.pdf");
    expect(chemins.filter((c) => c.endsWith("_Stephanie_MANSOURI_SKILLBOOSTED_V1_2024_11_28.pdf"))).toHaveLength(2);
    const contenus = await Promise.all(chemins.map((c) => zip.file(c)!.async("string")));
    expect(contenus.sort()).toEqual(["a", "b", "c"]);
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
