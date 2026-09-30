import { describe, it, expect, beforeAll } from "vitest";
import { writeFileSync } from "fs";
import { preloadFormationsTest } from "./dossierAudit.harness";
import { construireMatrice, auditerCas, type Violation } from "./matriceCas";
import { preloadFranceCompetences } from "@/lib/franceCompetences";

// MATRICE_OUT=<fichier.json> pour obtenir le détail des violations.
describe("matrice de cas — cohérence des trames", () => {
  beforeAll(async () => {
    await preloadFormationsTest();
    for (const c of ["RS5637", "RNCP39063", "RNCP39030"]) await preloadFranceCompetences(c);
  }, 120_000);

  it("aucune incohérence sur l'ensemble des cas", () => {
    const cas = construireMatrice();
    const toutes: Violation[] = [];
    let docs = 0;
    for (const c of cas) {
      const r = auditerCas(c);
      docs += r.total;
      toutes.push(...r.violations);
    }
    const parRegle: Record<string, number> = {};
    toutes.forEach((x) => { parRegle[x.regle] = (parRegle[x.regle] || 0) + 1; });
    if (process.env.MATRICE_OUT) writeFileSync(process.env.MATRICE_OUT, JSON.stringify({ cas: cas.length, docs, parRegle, violations: toutes }, null, 1), "utf8");
    console.log(`matrice : ${cas.length} cas, ${docs} documents, ${toutes.length} violation(s)`, parRegle);
    expect(toutes.slice(0, 15)).toEqual([]);
  }, 1_200_000);
});
