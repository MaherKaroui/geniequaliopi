import { describe, it, expect } from "vitest";
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import { normaliserFinanceur, typeFinancement, financeParEntreprise, reponseFinancement, nomFinanceur } from "@/lib/financement";
import { financeursEffectifs } from "@/lib/formationResolue";
import { genEvaluationBlocsStagiaire } from "@/lib/referentielPedagogie";
import { setDocFormation } from "@/lib/docBuilder";

const stag = (x: Partial<StagiaireInfo>): StagiaireInfo => ({ civilite: "M.", nom: "DUPONT", prenom: "Jean", entreprise: "", ...x } as StagiaireInfo);

describe("type de financement du formulaire Stagiaires", () => {
  it("normalise les anciennes saisies", () => {
    expect(normaliserFinanceur("Particulier (fonds propres)")).toBe("Personnel");
    expect(normaliserFinanceur("Entreprise")).toBe("Employeur");
    expect(normaliserFinanceur("Employeur / OPCO")).toBe("OPCO");
    expect(normaliserFinanceur("pôle emploi")).toBe("France Travail");
    expect(normaliserFinanceur("CPF")).toBe("CPF");
    expect(normaliserFinanceur("")).toBe("");
  });

  it("sans choix : entreprise → OPCO, sinon personnel (règle historique)", () => {
    expect(typeFinancement(stag({ entreprise: "ACME" }))).toBe("OPCO");
    expect(typeFinancement(stag({}))).toBe("Personnel");
  });

  it("le choix prime sur la présence d'une entreprise", () => {
    const s = stag({ entreprise: "ACME", financeur: "CPF" });
    expect(typeFinancement(s)).toBe("CPF");
    expect(financeParEntreprise(s)).toBe(false);
    expect(reponseFinancement(s)).toMatch(/Compte Personnel de Formation/);
    expect(nomFinanceur(s)).toMatch(/Caisse des Dépôts/);
    expect(financeParEntreprise(stag({ entreprise: "ACME", financeur: "Employeur" }))).toBe(true);
    expect(reponseFinancement(stag({ financeur: "France Travail" }))).toMatch(/France Travail/);
  });

  it("formation non certifiante : un CPF saisi est ignoré (règle automatique), les autres choix sont conservés", () => {
    const f = { intitule: "Initiation Word", codeRNCP: "" } as FormationInfo;
    const org = { typesActions: ["actions-formation"] } as unknown as OrganismeInfo;
    const [a, b, c] = financeursEffectifs([stag({ financeur: "CPF" }), stag({ entreprise: "ACME", financeur: "CPF" }), stag({ financeur: "France Travail" })], f, org);
    expect(typeFinancement(a)).toBe("Personnel");
    expect(typeFinancement(b)).toBe("OPCO");
    expect(typeFinancement(c)).toBe("France Travail");
  });
});

describe("signature du formateur du formulaire Formation", () => {
  it("figure sur l'évaluation des acquis par bloc de compétences", () => {
    const sig = "data:image/png;base64,SIGNATURE_FORMATEUR";
    const f = { intitule: "Créer et développer une e-boutique professionnelle (RS6475) – 21 h", codeRNCP: "RS6475", formateur: "Say LY", formateurSignatureUrl: sig, dateDebut: "2026-10-05", dateFin: "2026-10-29" } as FormationInfo;
    const o = { nom: "OFAP", dirigeant: "DANIEL MOUDAT" } as OrganismeInfo;
    setDocFormation(f);
    const html = genEvaluationBlocsStagiaire(o, f, stag({ dateDebutFormation: "2026-10-05", dateFinFormation: "2026-10-29" }));
    setDocFormation(undefined);
    expect(html).toContain(sig);
  });
});
