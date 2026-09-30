import { describe, it, beforeAll } from "vitest";
import { writeFileSync, mkdirSync } from "fs";
import { preloadFormationsTest } from "./dossierAudit.harness";
import { construireMatrice, texte } from "./matriceCas";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { preloadFranceCompetences } from "@/lib/franceCompetences";

// MATRICE_DUMP=<dossier> MATRICE_CAS=<regex sur l'id du cas> MATRICE_DOCS=<regex sur l'id du document>
const OUT = process.env.MATRICE_DUMP;
describe.skipIf(!OUT)("export texte de la matrice", () => {
  beforeAll(async () => { await preloadFormationsTest(); for (const c of ["RS5637", "RNCP39063", "RNCP39030"]) await preloadFranceCompetences(c); }, 120_000);
  it("dump", () => {
    const reCas = new RegExp(process.env.MATRICE_CAS || ".");
    const reDoc = new RegExp(process.env.MATRICE_DOCS || ".");
    for (const c of construireMatrice().filter((c) => reCas.test(c.id))) {
      const dir = `${OUT}/${c.id.replace(/[|]/g, "__").replace(/[^\w-]/g, "_")}`;
      mkdirSync(dir, { recursive: true });
      const cat = getFullCatalog(c.org, c.f, c.stagiaires);
      writeFileSync(`${dir}/_catalogue.txt`, cat.map((d) => `${d.indicateur}\t${d.template}\t${d.id}\t${d.nom}`).join("\n"));
      for (const d of cat.filter((d) => reDoc.test(d.id))) {
        if (/pdf_static|asset|xlsx|excel/.test(d.template)) continue;
        try { writeFileSync(`${dir}/${d.id}.txt`, texte(generateDocumentById(d.id, d.template, d.params, c.org, c.f, c.stagiaires) || "")); } catch (e) { writeFileSync(`${dir}/${d.id}.ERR.txt`, String(e)); }
      }
    }
  }, 900_000);
});
