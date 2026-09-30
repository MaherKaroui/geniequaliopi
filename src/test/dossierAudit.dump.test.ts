import { describe, it } from "vitest";
import { writeFileSync, mkdirSync } from "fs";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST, preloadFormationsTest, type TypeAction } from "./dossierAudit.harness";

// Export HTML de documents choisis : DUMP_OUT=<dossier> DUMP_TYPE=vae DUMP_IDS=regex npx vitest run src/test/dossierAudit.dump.test.ts
const OUT = process.env.DUMP_OUT;

describe.skipIf(!OUT)("export HTML", () => {
  it("dump", async () => {
    await preloadFormationsTest();
    const type = (process.env.DUMP_TYPE || "actions-formation") as TypeAction;
    const re = new RegExp(process.env.DUMP_IDS || ".");
    const org = { ...ORG_TEST, typesActions: [type] };
    const f = FORMATIONS_TEST[type];
    mkdirSync(`${OUT}/${type}`, { recursive: true });
    const cat = getFullCatalog(org, f, STAGIAIRES_TEST);
    writeFileSync(`${OUT}/${type}/_catalog.txt`, cat.map((d) => `${d.critere}\t${d.indicateur}\t${d.template}\t${d.id}\t${d.nom}`).join("\n"), "utf8");
    for (const d of cat.filter((d) => re.test(d.id))) {
      const html = generateDocumentById(d.id, d.template, d.params, org, f, STAGIAIRES_TEST);
      writeFileSync(`${OUT}/${type}/${d.id}.html`, html || "", "utf8");
    }
  }, 900_000);
});
