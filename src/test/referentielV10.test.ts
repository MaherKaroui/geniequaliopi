import { describe, it, expect } from "vitest";
import { versionReferentiel, attenduSelonAudit, indicateursNouvelEntrant } from "@/lib/typeAudit";
import { referencesReglementaires } from "@/lib/qualite2026";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const texte = (h: string) => h.replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

describe("référentiel Qualiopi V9 / V10", () => {
  it("auto : V10 pour un nouvel entrant, V9 en surveillance ; choix manuel prioritaire", () => {
    expect(versionReferentiel({ typeAudit: "initial" })).toBe("V10");
    expect(versionReferentiel({ typeAudit: "surveillance" })).toBe("V9");
    expect(versionReferentiel({ typeAudit: "renouvellement" })).toBe("V9");
    expect(versionReferentiel({ typeAudit: "initial", referentielQualiopi: "V9" })).toBe("V9");
    expect(versionReferentiel({ typeAudit: "surveillance", referentielQualiopi: "V10" })).toBe("V10");
  });

  it("V10 : les indicateurs 22 et 32 sont audités dès l'audit initial", () => {
    expect(indicateursNouvelEntrant("V9")).toEqual(expect.arrayContaining([22, 32]));
    expect(indicateursNouvelEntrant("V10")).not.toContain(22);
    expect(indicateursNouvelEntrant("V10")).not.toContain(32);
    expect(attenduSelonAudit("initial", 32, "V9")).toMatch(/audit de surveillance/);
    expect(attenduSelonAudit("initial", 32, "V10")).toMatch(/dès l'audit initial/);
  });

  it("références : guide V10 et arrêté du 28/10/2026 seulement en V10", () => {
    expect(referencesReglementaires({ typeAudit: "surveillance" }).some((r) => /V10/.test(r.texte))).toBe(false);
    const v10 = referencesReglementaires({ typeAudit: "initial" });
    expect(v10.some((r) => /Guide de lecture/.test(r.texte))).toBe(false);
    expect(v10.some((r) => /28 octobre 2026/.test(r.texte))).toBe(true);
  });

  for (const t of ["actions-formation", "apprentissage", "vae", "bilans-competences"] as const) {
    it(`catalogue et pièces V10 — ${t}`, () => {
      const f = FORMATIONS_TEST[t];
      const ne = { ...ORG_TEST, typesActions: [t], typeAudit: "initial" as const };
      const surv = { ...ne, referentielQualiopi: "V9" as const };
      const catV10 = getFullCatalog(ne, f, STAGIAIRES_TEST);
      const catV9 = getFullCatalog(surv, f, STAGIAIRES_TEST);
      expect(catV9.some((d) => d.template.startsWith("v10_"))).toBe(false);
      for (const tpl of ["v10_procedure_violences", "v10_registre_signalements", "v10_note_veille", "v10_audit_interne", "v10_suivi_heures"]) {
        const d = catV10.find((x) => x.template === tpl);
        expect(d, tpl).toBeTruthy();
        const h = texte(generateDocumentById(d!.id, d!.template, d!.params, ne, f, STAGIAIRES_TEST));
        expect(h.length).toBeGreaterThan(300);
      }
      expect(catV10.some((d) => /v9_guide_lecture/.test(String(d.params?.pdfFile || "")))).toBe(false);
      const proc = catV10.find((x) => x.template === "v10_procedure_violences")!;
      const hp = texte(generateDocumentById(proc.id, proc.template, proc.params, ne, f, STAGIAIRES_TEST));
      expect(hp).toMatch(/violences sexistes et sexuelles/);
      expect(hp).toMatch(/Référent chargé des signalements/);
      expect(hp).toMatch(/registre des signalements/);
    });
  }

  it("V10 : signature du référent qualité = celle du dirigeant s'il s'agit de la même personne, sinon celle du formulaire", () => {
    const f = FORMATIONS_TEST["actions-formation"];
    const SIG_DIR = "data:image/png;base64,SIGDIRIGEANT", SIG_RQ = "data:image/png;base64,SIGREFQUALITE";
    const base = { ...ORG_TEST, typesActions: ["actions-formation" as const], typeAudit: "initial" as const, signatureUrl: SIG_DIR, tamponUrl: "" };
    const note = (o: typeof base & Record<string, unknown>) => {
      const d = getFullCatalog(o, f, STAGIAIRES_TEST).find((x) => x.template === "v10_note_veille")!;
      return generateDocumentById(d.id, d.template, d.params, o, f, STAGIAIRES_TEST);
    };
    const meme = { ...base, dirigeant: "Valentin PROVENIER", referentQualite: "PROVENIER Valentin" };
    expect(note(meme)).toContain(SIG_DIR);
    const autre = { ...base, dirigeant: "Valentin PROVENIER", referentQualite: "Inès MARCHAND", referentQualiteSignatureUrl: SIG_RQ };
    const h = note(autre);
    expect(h).toContain(SIG_RQ);
    expect(h).not.toContain(SIG_DIR);
  });
});
