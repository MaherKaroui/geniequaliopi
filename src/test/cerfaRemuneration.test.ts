import { readFileSync } from "node:fs";
import { Blob as NodeBlob } from "node:buffer";
import { PDFDocument } from "pdf-lib";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { genCerfaApprentissagePdf, grilleRemuneration, smicMensuelAu } from "@/lib/cerfaApprentissage";
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";

const template = readFileSync("public/pdfs/cerfa/cerfa_10103-14.pdf");
const o = { nom: "CFA Test", siret: "12345678901234", ville: "Paris" } as OrganismeInfo;
const f = { intitule: "TP transport", codeRNCP: "RNCP40990", duree: "840 heures",
  dateDebut: "2026-10-05", dateFin: "2027-09-30" } as FormationInfo;
const base: StagiaireInfo = { civilite: "", nom: "TEST", prenom: "Sam", email: "", telephone: "",
  entreprise: "", poste: "", dateNaissance: "2006-08-04", nir: "106089312345678" };

async function form(s: StagiaireInfo) {
  const blob = await genCerfaApprentissagePdf(o, f, s);
  return (await PDFDocument.load(new Uint8Array(await blob.arrayBuffer()))).getForm();
}
const txt = (fm: Awaited<ReturnType<typeof form>>, n: string) => fm.getTextField(`Zone de texte ${n}`).getText() || "";

beforeEach(() => {
  vi.stubGlobal("Blob", NodeBlob);
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, arrayBuffer: async () => Uint8Array.from(template).buffer })));
});
afterEach(() => vi.unstubAllGlobals());

describe("SMIC 2026 et grille de rémunération", () => {
  it("prend le SMIC en vigueur à la date du contrat", () => {
    expect(smicMensuelAu("2025-12-31")).toBe(1801.80);
    expect(smicMensuelAu("2026-03-01")).toBe(1823.03);
    expect(smicMensuelAu("2026-10-05")).toBe(1867.02);
    expect(smicMensuelAu(undefined)).toBe(1867.02);
  });

  it("coupe l'année au 1er du mois qui suit les 21 ans", () => {
    expect(grilleRemuneration("2006-08-04", "2026-10-05", "2027-09-30")).toEqual([[
      { debut: "2026-10-05", fin: "2027-08-31", taux: 43, age: 20 },
      { debut: "2027-09-01", fin: "2027-09-30", taux: 53, age: 21 },
    ]]);
  });

  it("remplit les années suivantes avec le taux de l'année d'exécution", () => {
    const g = grilleRemuneration("2008-01-15", "2025-09-01", "2027-08-31");
    expect(g.map((l) => l.map((p) => [p.debut, p.fin, p.taux]))).toEqual([
      [["2025-09-01", "2026-01-31", 27], ["2026-02-01", "2026-08-31", 43]],
      [["2026-09-01", "2027-08-31", 51]],
    ]);
  });

  it("calcule le salaire au SMIC de juin 2026 et complète la 2e période", async () => {
    const fm = await form({ ...base, cerfaChamps: {
      "Zone de texte 21_84": "30", "Zone de texte 21_85": "09", "Zone de texte 21_86": "2027", "Zone de texte 8_95": "43",
      "Zone de texte 8_72": "802", "Zone de texte 21_73": "82",
    } });
    expect([txt(fm, "8_72"), txt(fm, "21_73")]).toEqual(["802", "82"]); // 1 867,02 × 43 %
    expect([txt(fm, "21_84"), txt(fm, "21_85"), txt(fm, "21_86"), txt(fm, "8_95")]).toEqual(["31", "08", "2027", "43"]);
    expect([txt(fm, "21_87"), txt(fm, "21_88"), txt(fm, "21_89"), txt(fm, "8_97"), txt(fm, "8_98")]).toEqual(["01", "09", "2027", "53", "SMIC"]);
    expect(txt(fm, "8_56")).toBe(""); // pas de 2e année
  });

  it("garde un taux ou un salaire contractuel supérieur au minimum", async () => {
    const fm = await form({ ...base, cerfaChamps: { "Zone de texte 8_95": "60", "Zone de texte 8_96": "SMC" } });
    expect([txt(fm, "8_95"), txt(fm, "8_96"), txt(fm, "8_72"), txt(fm, "21_73")]).toEqual(["60", "SMC", "1120", "21"]);
  });

  it("déduit le sexe et le département de naissance du NIR", async () => {
    const fm = await form(base);
    expect(fm.getCheckBox("Case #C3#A0 cocher 3").isChecked()).toBe(true);
    expect(txt(fm, "8_26")).toBe("93");
  });
});
