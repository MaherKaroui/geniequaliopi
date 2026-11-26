import { describe, it, expect } from "vitest";
import { categoriesCertificat } from "@/lib/docBuilder";
import { genTableauCroiseVTC48 } from "@/lib/vtc48h/tableauCroise";
import { genInscriptionExamenVTC48 } from "@/lib/vtc48h/certification";
import { FORMATION_VTC48 } from "@/lib/vtc48hPreset";
import { genPlanningIntervenants, genCRReunionPedagogique } from "@/lib/piecesAF2026";
import type { OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";

const org = { nom: "OF TEST", dirigeant: "Jean TEST", typesActions: ["actions-formation"] } as unknown as OrganismeInfo;
const stag = (nom: string, debut: string, fin: string, rqth = "non") =>
  ({ nom, prenom: "Test", dateDebutFormation: debut, dateFinFormation: fin, rqth }) as unknown as StagiaireInfo;

describe("écarts de l'audit blanc IN3M", () => {
  it("pied de page : catégorie lue dans le certificat cité", () => {
    const o = { ...org, certifications: "Qualiopi AB Certification n° RNQ 6068 — catégorie « actions de formation » (L. 6313-1, 1°). Qualiopi BCI France n° CW202415-5336 — catégorie « actions de formation par apprentissage »." } as OrganismeInfo;
    expect(categoriesCertificat(o, "CW202415-5336")).toBe("actions de formation par apprentissage");
    expect(categoriesCertificat(o, "RNQ 6068")).toBe("actions de formation");
    expect(categoriesCertificat({ ...org, typesActions: ["apprentissage"] } as unknown as OrganismeInfo, "X")).toBe("actions de formation par apprentissage");
  });

  it("IND 7 VTC : épreuves A à G, épreuve pratique et examen CMA", () => {
    const html = genTableauCroiseVTC48(org, FORMATION_VTC48);
    for (const e of ["A —", "B —", "C —", "D —", "E —", "F —", "G —", "Admission"]) expect(html).toContain(e);
    expect(html).toContain("CMA");
  });

  it("IND 16 VTC : inscription par le candidat, aucune convocation émise par l'organisme", () => {
    const html = genInscriptionExamenVTC48(org, FORMATION_VTC48, stag("ZERBIB", "2025-09-15", "2025-10-10"));
    expect(html).toContain("exament3p.fr");
    expect(html).not.toMatch(/CONVOCATION AUX ÉPREUVES/);
  });

  it("IND 18 : planning jour par jour et réunion limitée à la première session", () => {
    const f = { ...FORMATION_VTC48, modalites: "presentiel" };
    const planning = genPlanningIntervenants(org, f, [stag("A", "2025-09-15", "2025-10-10")]);
    expect(planning).toContain("Jour 1 — Module 1");
    expect(planning).toContain("Jour 18 — Module 6");
    const cr = genCRReunionPedagogique(org, f, [stag("FUTUR", "2026-04-13", "2026-05-12", "oui"), stag("PREMIER", "2025-03-03", "2025-03-28")]);
    expect(cr).toContain("PREMIER");
    expect(cr).not.toContain("FUTUR");
  });
});
