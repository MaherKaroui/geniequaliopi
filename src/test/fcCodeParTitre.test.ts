import { beforeAll, describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { codeRNCPPourTitre, loadIndexFC, setFranceCompetencesReader } from "@/lib/franceCompetences";
import { certificationDepuisIntitule } from "@/lib/izilearn/generateurs";

beforeAll(async () => {
  setFranceCompetencesReader(async (p) => {
    const file = join(process.cwd(), "public", "france-competences", p);
    return existsSync(file) ? new Uint8Array(readFileSync(file)) : null;
  });
  await loadIndexFC();
});

describe("code RNCP trouvé à partir de l'intitulé VAE", () => {
  it.each([
    ["VAE – TP Responsable d’Établissement Marchand (REM) – Niveau 6", "RNCP38666"],
    ["VAE – Titre Professionnel Gestionnaire Comptable et Fiscal", "RNCP37949"],
    ["VAE – TP Responsable Coordonnateur Services au Domicile (RCSAD) – Niveau 5", "RNCP39539"],
    ["Accompagnement à la Validation des Acquis de l’Expérience (VAE)  Titre Professionnel Assistant(e) de Vie aux Familles (ADVF)", "RNCP37715"],
  ])("%s", (intitule, code) => {
    const c = certificationDepuisIntitule(intitule);
    expect(codeRNCPPourTitre(c.intitule, c.niveau)).toBe(code);
  });
  it("ne propose rien quand aucune fiche ne correspond", () => {
    expect(codeRNCPPourTitre("Responsable QHSE")).toBe("");
  });
});
