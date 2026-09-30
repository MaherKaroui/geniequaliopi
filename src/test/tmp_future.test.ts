import { it } from "vitest";
import { writeFileSync, mkdirSync } from "fs";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";
it("future", () => {
  const out = process.env.DUMP_OUT!;
  mkdirSync(out, { recursive: true });
  const org = { ...ORG_TEST, typesActions: ["actions-formation" as const] };
  const f = { ...FORMATIONS_TEST["actions-formation"], dateDebut: process.env.D1 || "2027-03-08", dateFin: process.env.D2 || "2027-03-09" };
  const cat = getFullCatalog(org, f, STAGIAIRES_TEST);
  const re = new RegExp(process.env.IDS || ".");
  const lines: string[] = [];
  for (const d of cat) {
    const html = generateDocumentById(d.id, d.template, d.params, org, f, STAGIAIRES_TEST) || "";
    const t = html.replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    lines.push(`${d.id}\t${t.length}\t${t.slice(0, 0)}`);
    if (re.test(d.id)) writeFileSync(`${out}/${d.id}.txt`, t, "utf8");
  }
  writeFileSync(`${out}/_list.txt`, lines.join("\n"), "utf8");
}, 600000);
