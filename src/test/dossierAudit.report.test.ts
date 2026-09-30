import { describe, it, beforeAll } from "vitest";
import { writeFileSync } from "fs";
import { auditType, preloadFormationsTest, type TypeAction } from "./dossierAudit.harness";

// Rapport complet (non bloquant) : AUDIT_OUT=<dossier> npx vitest run src/test/dossierAudit.report.test.ts
const OUT = process.env.AUDIT_OUT;
const TYPES: TypeAction[] = ["actions-formation", "apprentissage", "vae", "bilans-competences"];

describe.skipIf(!OUT)("rapport d'audit des dossiers", () => {
  beforeAll(async () => { await preloadFormationsTest(); }, 120_000);
  for (const t of TYPES) {
    it(t, () => {
      const r = auditType(t);
      writeFileSync(`${OUT}/audit_${t}.json`, JSON.stringify(r, null, 1), "utf8");
    }, 900_000);
  }
});
