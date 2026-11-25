import { describe, it, expect } from "vitest";
import type { OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import { generateDocumentById } from "@/lib/documentGenerator";
import { FORMATION_VTC48 } from "@/lib/vtc48hPreset";

// Dossier VTC 140 h sur 4 semaines (programme « SEMAINE N » / « JOURS a à b — Module … »), en présentiel.
const o = {
  nom: "IN3M FORMA", siret: "91830634100028", dirigeant: "Mohamed KADRI", dateMaj: "2025-01-02",
  typesActions: ["actions-formation"], referentQualite: "Mohamed KADRI", responsablePedagogique: "Mohamed KADRI",
  referentHandicap: "Mohamed KADRI", poleAdministratif: "Mohamed KADRI", version: "1", typeAudit: "auto",
} as unknown as OrganismeInfo;
const f = { ...FORMATION_VTC48, modalites: "presentiel", lieu: "85 avenue du Général de Gaulle, 94000 Créteil", formateur: "BOUYAHIA Aziz" };
const stagiaires = [
  { civilite: "Mme", nom: "THOMAS", prenom: "Marine", diplome: "Baccalauréat professionnel", dateDebutFormation: "2025-03-03", dateFinFormation: "2025-03-28" },
  { civilite: "M.", nom: "LIU", prenom: "Raphaël", diplome: "", dateDebutFormation: "2025-11-17", dateFinFormation: "2025-12-12" },
] as unknown as StagiaireInfo[];

describe("VTC 140 h — documents", () => {
  it("déroulé pédagogique : tous les jours 1 à 20, de la semaine 1 à la semaine 4", () => {
    const html = generateDocumentById("t", "deroule_pedagogique_detaille", {}, o, f, stagiaires) || "";
    for (let j = 1; j <= 20; j++) expect(html, `jour ${j}`).toContain(`Jour ${j} — Module`);
    expect(html).not.toContain("Jour 21 — ");
    expect(html).toMatch(/140 heures — 20 jours/);
    expect(html).not.toMatch(/SEMAINE \d —/);
  });

  it("évaluation des besoins : le dernier diplôme est suivi du permis B, pour chaque stagiaire", () => {
    stagiaires.forEach((s, si) => {
      const html = generateDocumentById("t", "trame_eval_besoins_stagiaire", { stagiaireIdx: si }, o, f, stagiaires) || "";
      const reponse = html.match(/dernier diplôme ou titre que vous avez obtenu \?<\/strong><\/p>\s*<table[^>]*><tr><td>([^<]*)<\/td>/)?.[1] || "";
      expect(reponse, s.nom).toMatch(/\S.* \+ permis B$/);
    });
  });

  it("CV d'Aziz BOUYAHIA : diplômes réels (IND 21) et besoins issus de l'écart CV / modules (IND 22)", () => {
    const plan = generateDocumentById("t", "plan_dev_competences_excel", {}, o, f, stagiaires) || "";
    expect(plan).toContain("Premiers secours : PSC1");
    expect(plan).toContain("double commande");
    expect(plan).toMatch(/CV du formateur \(IND 21\)/);
    const entretien = generateDocumentById("t", "fiche_entretien_annuel_formateur", { formateurNom: "BOUYAHIA Aziz" }, o, f, stagiaires) || "";
    expect(entretien).toContain("BOUYAHIA");
    const fiche = generateDocumentById("t", "fiche_poste_formateur", { role: "formateur", formateurNom: "BOUYAHIA Aziz" }, o, f, stagiaires) || "";
    expect(fiche).toContain("Licence Sciences de l'éducation");
    expect(fiche).toContain("GRETA MTE 93");
    const tout = plan + entretien + fiche;
    expect(tout).not.toMatch(/1978|Stains|07 69|aziz\.bouyahia@/);
  });

  it("session d'avril-mai 2026 (jours fériés, 5 semaines calendaires) : 4 évaluations hebdomadaires", async () => {
    const { getFullCatalog } = await import("@/lib/documentGenerator");
    const st = [{ civilite: "M.", nom: "EL MOUCHTABA", prenom: "Mohamed", dateDebutFormation: "2026-04-13", dateFinFormation: "2026-05-12" }] as unknown as StagiaireInfo[];
    const evals = getFullCatalog(o, f, st).filter((d) => /IND 11 ÉVALUATION \d/.test(d.nom));
    expect(evals.map((d) => d.nom.match(/Semaine \d/)?.[0])).toEqual(["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4"]);
  });
});
