import { describe, expect, it } from "vitest";
import { getStagiaireDuree } from "@/lib/docBuilder";
import { generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const formation = {
  ...FORMATIONS_TEST.vae,
  duree: "24 heures réparties sur 3 mois",
  dateDebut: "2026-02-02",
  dateFin: "2026-04-30",
  dureeSaisiePrioritaire: true,
};
const stagiaire = {
  ...STAGIAIRES_TEST[0],
  dateDebutFormation: "2026-03-02",
  dateFinFormation: "2026-03-06",
};

describe("durée saisie du pack rapide", () => {
  it("reprend la durée du formulaire dans les contrats IND 9 même hors pack rapide", () => {
    const jenna = { ...stagiaire, prenom: "Jenna", nom: "CHEBEL", entreprise: "",
      dateDebutFormation: "2026-03-02", dateFinFormation: "2026-04-30" };
    for (const template of ["contrat_formation_pro_stagiaire", "contrat_formation_pro"]) {
      const html = generateDocumentById("af_c3i9_contrat_formation_0", template, { stagiaireIdx: 0 },
        ORG_TEST, { ...formation, typeAction: "actions-formation", dureeSaisiePrioritaire: false }, [jenna]);
      const doc = new DOMParser().parseFromString(html, "text/html");
      const organisation = Array.from(doc.querySelectorAll("h3"))
        .find(h => h.textContent?.includes("Article 3"))?.nextElementSibling;
      expect(organisation?.childNodes[1]?.textContent?.trim(), template).toBe(formation.duree);
    }
  });

  it("conserve exactement la durée saisie malgré des dates individuelles différentes", () => {
    expect(getStagiaireDuree(stagiaire, formation)).toBe("24 heures réparties sur 3 mois");
    expect(getStagiaireDuree(stagiaire, { ...formation, duree: "14h30" })).toBe("14h30");
    expect(getStagiaireDuree(stagiaire, { ...formation, duree: "" })).toBe("");
  });

  it("ne change pas le calcul des autres générateurs", () => {
    expect(getStagiaireDuree(stagiaire, { ...formation, dureeSaisiePrioritaire: false }))
      .toBe("35 heures (5 jours)");
  });

  for (const typeAction of ["actions-formation", "bilans-competences", "vae", "apprentissage"] as const) {
    it(`transmet la durée saisie aux fichiers du pack ${typeAction}`, () => {
      for (const template of [
        "programme_formation", "contrat_formation_pro_stagiaire", "convention_formation_tripartite",
        "emargement_stagiaire", "temps_connexion_reel", "ca_session",
      ]) {
        const html = generateDocumentById("rapide", template, { fi: 0, stagiaireIdx: 0 },
          ORG_TEST, { ...formation, typeAction }, [stagiaire]);
        expect(html, template).toContain("24 heures réparties sur 3 mois");
        expect(html, template).not.toContain("35 heures (5 jours)");
      }
    });
  }
});