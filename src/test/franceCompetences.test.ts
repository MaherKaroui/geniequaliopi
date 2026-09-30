import { describe, it, expect, beforeAll } from "vitest";
import { writeFileSync, mkdirSync } from "fs";
import { useFranceCompetencesFromDisk, ORG_TEST, STAGIAIRES_TEST, FORMATIONS_TEST } from "./dossierAudit.harness";
import { preloadFranceCompetences, statutFC, getFicheFC, rechercherFC, loadIndexFC } from "@/lib/franceCompetences";
import { getRNCPByCode } from "@/lib/rncpData";
import { genFicheCertificationFC, genBanqueExercicesFC, genEvaluationBlocsStagiaire, genTableauCroiseFC, resultatsStagiaire } from "@/lib/referentielPedagogie";

describe("base France Compétences synchronisée", () => {
  beforeAll(async () => {
    useFranceCompetencesFromDisk();
    await loadIndexFC();
    for (const c of ["RNCP39063", "RNCP39030", "RNCP31041", "RS5637"]) await preloadFranceCompetences(c);
  });

  it("charge les fiches officielles", () => {
    expect(getFicheFC("RNCP39063")?.blocs.length).toBe(2);
    expect(getFicheFC("RNCP39030")?.fin).toBe("2028-12-31");
    expect(getRNCPByCode("RNCP39030")?.certificateur).toMatch(/EDUCATION NATIONALE/);
  });

  it("signale une fiche inactive et sa remplaçante", () => {
    const st = statutFC("RNCP31041");
    expect(st.actif).toBe(false);
    expect(st.remplacePar).toContain("RNCP39030");
  });

  it("recherche par intitulé", () => {
    expect(rechercherFC("négociateur technico").some((e) => e.c === "RNCP39063")).toBe(true);
  });

  it("génère des évaluations différentes par stagiaire", () => {
    const f = { ...FORMATIONS_TEST["apprentissage"], dateFin: "2026-06-01" };
    const a = resultatsStagiaire(f, STAGIAIRES_TEST[0]).map((x) => x.total).join(",");
    const b = resultatsStagiaire(f, STAGIAIRES_TEST[1]).map((x) => x.total).join(",");
    expect(a).not.toBe(b);
    const out = process.env.DUMP_OUT;
    if (out) {
      mkdirSync(`${out}/fc`, { recursive: true });
      for (const code of ["RNCP39063", "RNCP39030", "RS5637"]) {
        const ff = { ...f, codeRNCP: code, intitule: getFicheFC(code)?.i || code };
        writeFileSync(`${out}/fc/${code}_fiche.html`, genFicheCertificationFC(ORG_TEST, ff));
        writeFileSync(`${out}/fc/${code}_croise.html`, genTableauCroiseFC(ORG_TEST, ff));
        writeFileSync(`${out}/fc/${code}_exercices.html`, genBanqueExercicesFC(ORG_TEST, ff));
        writeFileSync(`${out}/fc/${code}_eval_s0.html`, genEvaluationBlocsStagiaire(ORG_TEST, ff, STAGIAIRES_TEST[0]));
      }
    }
  });
});
