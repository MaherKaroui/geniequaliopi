import { describe, it, expect } from "vitest";
import { mailsStagiaire, clientMailOrganisme } from "@/lib/mails/mailsAutomatiques";
import { financeursEffectifs } from "@/lib/formationResolue";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const texte = (h: string) => h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

describe("mails automatiques", () => {
  it("choisit Gmail pour une adresse Gmail, Outlook sinon", () => {
    expect(clientMailOrganisme({ email: "of@gmail.com" })).toBe("gmail");
    expect(clientMailOrganisme({ email: "contact@of.fr" })).toBe("outlook");
    expect(clientMailOrganisme({ email: "of@hotmail.fr" })).toBe("outlook");
  });

  it("AF non certifiante : financement personnel → contrat avec rétractation, jamais CPF", () => {
    const f = FORMATIONS_TEST["actions-formation"];
    const stag = financeursEffectifs(STAGIAIRES_TEST, f, ORG_TEST);
    expect(stag.every((s) => s.financeur === "Personnel")).toBe(true);
    for (const s of stag) {
      const ins = mailsStagiaire(ORG_TEST, f, s, "actions-formation").find((m) => m.key === "af_inscription")!;
      const t = texte(ins.messages[0].body);
      expect(t).toMatch(/contrat de formation professionnelle/);
      expect(t).toMatch(/rétractation de 10 jours/);
      expect(t).not.toMatch(/Mon Compte Formation/);
      expect(ins.messages[0].atts.map((a) => a.name).join(" ")).toMatch(/Programme.*|Reglement_interieur|Conditions_generales/);
    }
  });

  it("AF certifiante : CPF → pas de contrat ; OPCO → convention", () => {
    const f = { ...FORMATIONS_TEST["actions-formation"], codeRNCP: "RS5637" };
    const [a, b] = financeursEffectifs(STAGIAIRES_TEST, f, ORG_TEST);
    const ta = texte(mailsStagiaire(ORG_TEST, f, a, "actions-formation").find((m) => m.key === "af_inscription")!.messages[0].body);
    const tb = texte(mailsStagiaire(ORG_TEST, f, b, "actions-formation").find((m) => m.key === "af_inscription")!.messages[0].body);
    expect(ta).toMatch(/Mon Compte Formation/);
    expect(tb).toMatch(/convention de formation/);
  });

  it("les formulations varient d'un stagiaire à l'autre et aucun mail n'est daté dans le futur", () => {
    const f = FORMATIONS_TEST["actions-formation"];
    const corps = STAGIAIRES_TEST.map((s) => mailsStagiaire(ORG_TEST, f, s, "actions-formation").map((m) => texte(m.messages[0].body).replace(new RegExp(`${s.nom}|${s.prenom}|Madame|Monsieur`, "g"), "")).join("|"));
    expect(new Set(corps).size).toBe(STAGIAIRES_TEST.length);
    const now = new Date();
    for (const t of ["actions-formation", "apprentissage", "vae", "bilans-competences"] as const) {
      for (const s of STAGIAIRES_TEST) {
        const ms = mailsStagiaire({ ...ORG_TEST, typesActions: [t] }, FORMATIONS_TEST[t], s, t);
        expect(ms.length).toBeGreaterThan(3);
        ms.forEach((m) => m.messages.forEach((x) => {
          expect(x.date.getTime()).toBeLessThanOrEqual(now.getTime());
          expect([0, 6]).not.toContain(x.date.getDay());
        }));
      }
    }
  });
});
