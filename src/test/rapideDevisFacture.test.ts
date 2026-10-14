import { describe, expect, it } from "vitest";
import { generateDocumentById } from "@/lib/documentGenerator";
import { grouperStagiairesParClient } from "@/lib/rapideFacturation";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const formation = { ...FORMATIONS_TEST.vae, typeAction: "actions-formation" as const, intitule: "Excel avancé", tarif: "1 000 €", dateDebut: "2026-11-02", dateFin: "2026-11-06", dureeSaisiePrioritaire: true };
const base = STAGIAIRES_TEST[0];
const stagiaires = [
  { ...base, prenom: "Alice", nom: "Martin", entreprise: "ACME SAS", responsableEntreprise: "Paul Durand" },
  { ...base, prenom: "Bruno", nom: "Petit", entreprise: "", email: "bruno@example.com" },
  { ...base, prenom: "Chloé", nom: "Roux", entreprise: " acme sas ", tarifFormation: "1 500 €" },
  { ...base, prenom: "", nom: "" },
];

describe("génération rapide : regroupement par client", () => {
  it("réunit les stagiaires d'une même entreprise et garde les particuliers à part", () => {
    const g = grouperStagiairesParClient(stagiaires);
    expect(g.map((c) => c.idxs)).toEqual([[0, 2], [1]]);
    expect(g.map((c) => c.entreprise)).toEqual([true, false]);
    expect(g[0].label).toBe("ACME SAS");
  });

  it("produit une seule convention pour l'entreprise, avec tous ses stagiaires et le total", () => {
    const html = generateDocumentById("convention", "convention_formation_tripartite", { stagiaireIdxs: [0, 2] }, ORG_TEST, formation, stagiaires);
    expect(html).toContain("Alice Martin");
    expect(html).toContain("Chloé Roux");
    expect(html).not.toContain("Bruno Petit");
    expect(html).toMatch(/2\s500,00\s€/);
    expect(html).toContain("Paul Durand");
    // Deux signataires seulement : l'organisme et l'entreprise.
    expect(html).toContain("Pour l'Organisme de formation");
    expect(html).toContain("Pour l'Entreprise");
    expect(html).not.toContain("Le/La Stagiaire");
    expect(html).not.toContain("TRIPARTITE");
  });

  it("garde la convention individuelle à l'identique pour un seul stagiaire", () => {
    const seul = generateDocumentById("convention", "convention_formation_tripartite", { stagiaireIdx: 0, stagiaireIdxs: [0] }, ORG_TEST, formation, stagiaires);
    const avant = generateDocumentById("convention", "convention_formation_tripartite", { stagiaireIdx: 0 }, ORG_TEST, formation, stagiaires);
    expect(seul).toBe(avant);
  });

  for (const template of ["devis_client", "facture_client"]) {
    it(`${template} : un document par client avec le total du groupe`, () => {
      const ent = generateDocumentById("x", template, { stagiaireIdxs: [0, 2], clientNo: 1 }, ORG_TEST, formation, stagiaires);
      expect(ent).toContain("ACME SAS");
      expect(ent).toContain("Alice");
      expect(ent).toContain("Chloé");
      expect(ent).toMatch(/2\s500,00\s€/);
      expect(ent).toContain(template === "devis_client" ? "DEV-2026-001" : "FAC-2026-001");

      const part = generateDocumentById("x", template, { stagiaireIdx: 1, stagiaireIdxs: [1], clientNo: 2 }, ORG_TEST, formation, stagiaires);
      expect(part).toContain("bruno@example.com");
      expect(part).not.toContain("ACME");
      expect(part).toMatch(/1\s000,00\s€/);

      // Tampon de l'organisme sur le devis et la facture.
      const org = { ...ORG_TEST, tamponUrl: "data:image/png;base64,TAMPON" };
      const avecTampon = generateDocumentById("x", template, { stagiaireIdxs: [0, 2], clientNo: 1 }, org, formation, stagiaires);
      expect(avecTampon).toContain("data:image/png;base64,TAMPON");
      if (template === "facture_client") expect(avecTampon).not.toContain("Financement prévu");

      // Dates calculées depuis la formation : facture au dernier jour, devis sans date à remplir.
      if (template === "facture_client") expect(ent).toContain("FAC-2026-001 — 06/11/2026");
      else expect(ent).not.toContain("Date : ____");
    });
  }
});
