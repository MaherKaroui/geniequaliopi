import { describe, it, expect } from "vitest";
import { sanitizeBdcMarkdown } from "@/lib/bdc/bdcCompliance";

describe("Vocabulaire BC : la raison sociale n'est jamais réécrite", () => {
  it("garde « NEXUS FORMATION » mais remplace « formation » dans le texte courant", () => {
    const md = "NEXUS FORMATION organise la formation. Nexus Formation vous accueille.";
    const out = sanitizeBdcMarkdown(md, { titre: "Livret d'accueil", categorieAction: "BC", raisonSociale: "Nexus Formation" });
    expect(out).toContain("NEXUS FORMATION organise la prestation.");
    expect(out).toContain("Nexus Formation vous accueille.");
    expect(out).not.toMatch(/NEXUS prestation/i);
  });

  it("protège un nom en capitales même sans raison sociale fournie", () => {
    const out = sanitizeBdcMarkdown("Organisme : ALPHA FORMATIONS", { titre: "CGV", categorieAction: "BC" });
    expect(out).toContain("ALPHA FORMATIONS");
  });
});
