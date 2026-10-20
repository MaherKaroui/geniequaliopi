import { describe, it, expect } from "vitest";
import { estFormationHebdo, texteHorairesHebdo } from "@/lib/joursFeries";
import { getFormationDays } from "@/lib/sampleData";
import { getStagiaireDuree } from "@/lib/docBuilder";
import { FORMATION_GSC35 } from "@/lib/gererCentre35hPreset";
import type { FormationInfo, StagiaireInfo } from "@/types/qualiopi";

const stagiaire = (deb: string, fin: string) =>
  ({ civilite: "Mme", nom: "TEST", prenom: "Anna", email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "",
     dateDebutFormation: deb, dateFinFormation: fin }) as StagiaireInfo;

describe("Rythme hebdomadaire — Gérer son centre de formation – 35 h", () => {
  it("seule cette formation est hebdomadaire", () => {
    expect(estFormationHebdo(FORMATION_GSC35)).toBe(true);
    expect(estFormationHebdo({ intitule: "Initiation Word" })).toBe(false);
    expect(estFormationHebdo({ intitule: "Création d'entreprise" })).toBe(false);
  });

  it("35 h sur un mois : 5 mercredis, 7 h chacun", () => {
    const f: FormationInfo = { ...FORMATION_GSC35, dateDebut: "2025-03-05", dateFin: "2025-04-02" };
    const jours = getFormationDays(f);
    expect(jours).toHaveLength(5);
    jours.forEach((j) => expect(j.toLowerCase()).toMatch(/mercredi/));
    expect(getStagiaireDuree(stagiaire("2025-05-07", "2025-06-04"), f)).toMatch(/^35\s?h/);
    expect(texteHorairesHebdo("2025-11-05")).toMatch(/le mercredi/);
  });

  it("les autres formations gardent tous les jours ouvrés", () => {
    const f = { ...FORMATION_GSC35, intitule: "Initiation Word", dateDebut: "2025-03-05", dateFin: "2025-04-02" };
    expect(getFormationDays(f).length).toBeGreaterThan(15);
  });
});
