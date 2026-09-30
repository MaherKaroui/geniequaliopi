import { describe, it, expect } from "vitest";
import { typeAuditEffectif, moisEntre } from "@/lib/typeAudit";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const TODAY = new Date(2026, 8, 30);
const moisAvant = (n: number) => { const d = new Date(TODAY); d.setMonth(d.getMonth() - n); return d.toISOString().slice(0, 10); };
const texte = (h: string) => h.replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

describe("type d'audit", () => {
  it("détection automatique d'après le certificat", () => {
    expect(typeAuditEffectif({}, TODAY)).toBe("initial");
    expect(typeAuditEffectif({ dateObtentionQualiopi: moisAvant(12), numeroCertificatQualiopi: "X" }, TODAY)).toBe("surveillance");
    expect(typeAuditEffectif({ dateObtentionQualiopi: moisAvant(40) }, TODAY)).toBe("renouvellement");
    expect(typeAuditEffectif({ dateObtentionQualiopi: moisAvant(40), typeAudit: "surveillance" }, TODAY)).toBe("surveillance");
    expect(moisEntre(new Date(2024, 0, 15), new Date(2026, 6, 14))).toBe(29);
  });

  for (const t of ["actions-formation", "apprentissage", "vae", "bilans-competences"] as const) {
    it(`contenus selon le type — ${t}`, () => {
      const f = FORMATIONS_TEST[t];
      const initial = { ...ORG_TEST, typesActions: [t], typeAudit: "initial" as const };
      const surv = { ...ORG_TEST, typesActions: [t], typeAudit: "surveillance" as const, dateObtentionQualiopi: moisAvant(15) };
      const catI = getFullCatalog(initial, f, STAGIAIRES_TEST);
      const catS = getFullCatalog(surv, f, STAGIAIRES_TEST);
      expect(catI.some((d) => d.template === "audit_revue_direction")).toBe(false);
      expect(catS.some((d) => d.template === "audit_revue_direction")).toBe(true);
      expect(catS.some((d) => d.template === "audit_bilan_plan_dev")).toBe(true);
      const ind2I = catI.find((d) => d.template === "audit_indicateurs_resultats")!;
      const ind2S = catS.find((d) => d.template === "audit_indicateurs_resultats")!;
      const hI = texte(generateDocumentById(ind2I.id, ind2I.template, ind2I.params, initial, f, STAGIAIRES_TEST));
      const hS = texte(generateDocumentById(ind2S.id, ind2S.template, ind2S.params, surv, f, STAGIAIRES_TEST));
      expect(hI).toMatch(/nouvel entrant/i);
      expect(hS).toMatch(/Audit de surveillance/);
      expect(hS).toMatch(/Nombre de .* ayant terminé leur parcours \d+/);
      const rd = catS.find((d) => d.template === "audit_revue_direction")!;
      const hR = texte(generateDocumentById(rd.id, rd.template, rd.params, surv, f, STAGIAIRES_TEST));
      expect(hR).toMatch(/REVUE DE DIRECTION/);
      const m = hR.match(/Date : (\d{2})\/(\d{2})\/(\d{4})/);
      expect(m).toBeTruthy();
      expect(new Date(+m![3], +m![2] - 1, +m![1]).getTime()).toBeLessThanOrEqual(Date.now());
    });
  }

  it("renouvellement : évolution sur le cycle sans chiffre inventé", () => {
    const f = FORMATIONS_TEST["actions-formation"];
    const o = { ...ORG_TEST, typeAudit: "renouvellement" as const, dateObtentionQualiopi: moisAvant(34) };
    const cat = getFullCatalog(o, f, STAGIAIRES_TEST);
    const d = cat.find((x) => x.template === "audit_indicateurs_resultats")!;
    const h = texte(generateDocumentById(d.id, d.template, d.params, o, f, STAGIAIRES_TEST));
    expect(h).toMatch(/Évolution sur le cycle/);
    expect(h).toMatch(/Non disponible/);
  });
});
