import { describe, it, expect } from "vitest";
import { genVAESatisfaction, satisfactionNotes } from "@/lib/vae/vaeDossier2026";
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";

const o = { nom: "ORAVYS", siret: "12345678900012", nda: "11755555575", adresse: "1 rue A", ville: "Paris", dirigeant: "Paul MARTIN" } as unknown as OrganismeInfo;
const f = { intitule: "CAP Esthétique", dateDebut: "2025-06-01", dateFin: "2025-11-21", formateur: "Paul MARTIN", typesActions: ["vae"] } as unknown as FormationInfo;
const mk = (prenom: string, nom: string): StagiaireInfo => ({ civilite: "Mme", prenom, nom, email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "1990-01-01", dateDebutFormation: "2025-06-01", dateFinFormation: "2025-11-21" } as StagiaireInfo);

describe("VAE — questionnaire de satisfaction", () => {
  it("accompagnement terminé : notes cochées et commentaire libre rempli", () => {
    const html = JSON.stringify(genVAESatisfaction(o, f, [mk("Océane", "LEFEBVRE")], 0));
    expect(html).toContain("Commentaire libre");
    expect(html).toContain("☒");
    expect(html).not.toContain("l'organisme ne complète jamais");
  });
  it("notes entre 4 et 5 pour chaque critère", () => {
    const n = satisfactionNotes(mk("Océane", "LEFEBVRE"), f);
    expect(n).toHaveLength(6);
    n.forEach((x) => expect(x >= 4 && x <= 5).toBe(true));
  });
  it("accompagnement futur : rien de coché, pas de commentaire", () => {
    const fut = { ...f, dateFin: "2099-12-01" } as FormationInfo;
    const s = { ...mk("Lina", "BOU"), dateFinFormation: "2099-12-01" } as StagiaireInfo;
    const html = JSON.stringify(genVAESatisfaction(o, fut, [s], 0));
    expect(html).not.toContain("Commentaire libre");
  });
});
