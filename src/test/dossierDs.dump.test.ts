import { describe, it } from "vitest";
import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { preloadFormationsTest } from "./dossierAudit.harness";

// Export HTML d'un dossier réel : DOSSIER_JSON=<fichier> DUMP_OUT=<dossier> npx vitest run src/test/dossierDs.dump.test.ts
const SRC = process.env.DOSSIER_JSON;
const OUT = process.env.DUMP_OUT;

describe.skipIf(!SRC || !OUT)("export HTML d'un dossier", () => {
  it("dump", async () => {
    await preloadFormationsTest();
    const { organisme, formation, stagiaires } = JSON.parse(readFileSync(SRC!, "utf8"));
    const re = new RegExp(process.env.DUMP_IDS || ".");
    mkdirSync(OUT!, { recursive: true });
    const cat = getFullCatalog(organisme, formation, stagiaires);
    writeFileSync(`${OUT}/_catalog.txt`, cat.map((d) => `${d.critere}\t${d.indicateur}\t${d.template}\t${d.id}\t${d.nom}`).join("\n"), "utf8");
    for (const d of cat.filter((d) => re.test(d.id))) {
      const html = generateDocumentById(d.id, d.template, d.params, organisme, formation, stagiaires);
      writeFileSync(`${OUT}/${d.id}.html`, html || "", "utf8");
    }
  }, 900_000);
});
