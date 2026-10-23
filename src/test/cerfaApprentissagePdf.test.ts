// @vitest-environment node
import { readFileSync } from "node:fs";
import { PDFDocument } from "pdf-lib";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { genCerfaApprentissagePdf } from "@/lib/cerfaApprentissage";
import { versStagiaire } from "@/lib/izilearn/mapping";
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import type { IzApprenant, IzPayload } from "@/lib/izilearn/types";

const template = readFileSync("public/pdfs/cerfa/cerfa_10103-14.pdf");
const o = { nom: "CFA Test", siret: "12345678901234", ville: "Paris" } as OrganismeInfo;
const f = { intitule: "TP transport", codeRNCP: "RNCP40989", duree: "400 heures",
  dateDebut: "2026-09-01", dateFin: "2027-08-31" } as FormationInfo;
const base: StagiaireInfo = { civilite: "Mme", nom: "TEST", prenom: "Camille",
  email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "2005-09-06" };

async function generated(s: StagiaireInfo = base) {
  const blob = await genCerfaApprentissagePdf(o, f, s);
  return (await PDFDocument.load(await blob.arrayBuffer())).getForm();
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(async (url: string) => {
    if (url !== "/pdfs/cerfa/cerfa_10103-14.pdf") throw new Error("Unexpected fetch");
    return { ok: true, arrayBuffer: async () => Uint8Array.from(template).buffer };
  }));
});
afterEach(() => vi.unstubAllGlobals());

describe("CERFA officiel depuis IZILearn", () => {
  it("applique le NIR, la commune et le sexe du contrat après le préremplissage", async () => {
    const a: IzApprenant = { inscriptionId: "i", contactId: "c", prenom: "Camille", nom: "TEST",
      civilite: "Mme", nir: "ancien", communeNaissance: "Paris", statut: "inscrit", signatures: [], connexions: [],
      cerfaChamps: { "Zone de texte 8_18": "1050993066087", "Zone de texte 8_27": "Saint-Denis",
        "Case #C3#A0 cocher 3": true, "Case #C3#A0 cocher 4": false } };
    const p = { session: { dateDebut: f.dateDebut, dateFin: f.dateFin } } as IzPayload;
    const form = await generated(versStagiaire(a, p));
    expect(form.getTextField("Zone de texte 8_18").getText()).toBe("1050993066087");
    expect(form.getTextField("Zone de texte 8_27").getText()).toBe("Saint-Denis");
    expect(form.getCheckBox("Case #C3#A0 cocher 3").isChecked()).toBe(true);
    expect(form.getCheckBox("Case #C3#A0 cocher 4").isChecked()).toBe(false);
  });
  it.each(["8_91", "8_92", "8_93", "8_94", "21_31", "21_32", "21_33", "21_34", "21_35", "21_36"])(
    "ne renseigne jamais le champ OPCO %s", async (id) => {
      const form = await generated({ ...base, cerfaChamps: { [`Zone de texte ${id}`]: "INTERDIT" } });
      expect(form.getTextField(`Zone de texte ${id}`).getText() || "").toBe("");
    });
  it.each([["5", "5_2"], ["5_3", "5_4"], ["5_5", "5_6"], ["5_7", "5_8"], ["5_9", "5_10"]])(
    "coche Non par défaut pour la paire %s / %s", async (oui, non) => {
      const form = await generated();
      expect(form.getCheckBox(`Case #C3#A0 cocher ${oui}`).isChecked()).toBe(false);
      expect(form.getCheckBox(`Case #C3#A0 cocher ${non}`).isChecked()).toBe(true);
    });
  it("sportif Oui ne coche pas RQTH Oui", async () => {
    const form = await generated({ ...base, cerfa: { sportifHautNiveau: true } });
    expect(form.getCheckBox("Case #C3#A0 cocher 5").isChecked()).toBe(true);
    expect(form.getCheckBox("Case #C3#A0 cocher 5_2").isChecked()).toBe(false);
    expect(form.getCheckBox("Case #C3#A0 cocher 5_3").isChecked()).toBe(false);
  });
  it("RQTH Oui ne coche pas équivalence jeunes Oui", async () => {
    const form = await generated({ ...base, rqth: "oui" });
    expect(form.getCheckBox("Case #C3#A0 cocher 5_3").isChecked()).toBe(true);
    expect(form.getCheckBox("Case #C3#A0 cocher 5_4").isChecked()).toBe(false);
    expect(form.getCheckBox("Case #C3#A0 cocher 5_5").isChecked()).toBe(false);
  });
  it("conserve code diplôme 58 distinct du RNCP", async () => {
    const form = await generated({ ...base, cerfaChamps: { "Zone de texte 8_77": "58" } });
    expect(form.getTextField("Zone de texte 8_77").getText()).toBe("58");
    expect(form.getTextField("Zone de texte 8_76").getText()).toBe("RNCP40989");
  });
  it("ne remplit pas la nomenclature diplôme avec le RNCP en l'absence de donnée", async () => {
    expect((await generated()).getTextField("Zone de texte 8_77").getText() || "").toBe("");
  });
  it("applique aussi les dates découpées, textes nettoyés, vides et champs absents", async () => {
    const form = await generated({ ...base, cerfaChamps: { "Zone de texte 21_7": "06",
      "Zone de texte 21_8": "09", "Zone de texte 21_9": "2005",
      "Zone de texte 8_27": "Saint–Denis", "Zone de texte 8_16": "", absent: "ignoré" } });
    expect(form.getTextField("Zone de texte 21_7").getText()).toBe("06");
    expect(form.getTextField("Zone de texte 21_8").getText()).toBe("09");
    expect(form.getTextField("Zone de texte 21_9").getText()).toBe("2005");
    expect(form.getTextField("Zone de texte 8_27").getText()).toBe("Saint-Denis");
    expect(form.getTextField("Zone de texte 8_16").getText() || "").toBe("");
  });
});