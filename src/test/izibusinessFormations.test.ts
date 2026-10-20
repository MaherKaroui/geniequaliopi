import { describe, expect, it } from "vitest";
import { formationsIziRealisees, genAttestationIzibusiness, formatDateIzi as formatDate } from "@/lib/attestationIzibusiness";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { planDevActions } from "@/lib/templatesCritere5";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const org = { ...ORG_TEST, dateMaj: "2025-05-20" };

describe("attestation IZIBUSINESS regroupée et plans IND 22", () => {
  it("regroupe les deux formations de 14 heures en une attestation de 28 heures personnalisée", () => {
    const html = genAttestationIzibusiness(org);
    const document = new DOMParser().parseFromString(html, "text/html");
    const text = document.body.textContent || "";
    expect(text).toContain("Gérer son centre de formation");
    expect(text).toContain("Automatiser la gestion de son centre avec Make et Airtable");
    expect(text).toContain("4 jours (28 heures)");
    expect(text).toContain(org.dirigeant);
    expect(text).toContain(org.nom);
    expect(text).not.toContain("EMI EVOLUTION");
    expect(document.querySelectorAll('img[alt="Tampon IZIBUSINESS"]')).toHaveLength(1);
  });

  it("date les deux formations et l'attestation strictement avant la mise à jour, même un lundi ou à cheval sur une année", () => {
    for (const dateMaj of ["2025-05-20", "2026-01-05", "2026-10-19", "20/05/2025"]) {
      const o = { ...org, dateMaj };
      const records = formationsIziRealisees(o);
      const reference = dateMaj.includes("/") ? "2025-05-20" : dateMaj;
      records.forEach(fi => {
        expect(fi.debut < fi.fin).toBe(true);
        expect(fi.fin < reference).toBe(true);
        expect(fi.heures).toBe(14);
        expect([0, 6]).not.toContain(new Date(`${fi.debut}T12:00:00`).getDay());
        expect([0, 6]).not.toContain(new Date(`${fi.fin}T12:00:00`).getDay());
      });
      expect(genAttestationIzibusiness(o)).toContain(`Fait à Paris, le ${formatDate(records[1].fin)}`);
    }
  });

  for (const type of ["actions-formation", "apprentissage", "bilans-competences", "vae"] as const) {
    it(`${type} : une seule attestation et mêmes dates de réalisation dans le plan`, () => {
      const o = { ...org, typesActions: [type] };
      const f = FORMATIONS_TEST[type];
      const catalog = getFullCatalog(o, f, STAGIAIRES_TEST);
      const attestations = catalog.filter(d => d.template === "attestation_izibusiness");
      expect(attestations).toHaveLength(1);
      const plans = catalog.filter(d => d.indicateur === 22 && /plan de développement/i.test(d.nom));
      expect(plans.length).toBeGreaterThan(0);
      const html = plans.map(d => generateDocumentById(d.id, d.template, d.params, o, f, STAGIAIRES_TEST)).join("\n");
      formationsIziRealisees(o).forEach(fi => {
        expect(html).toContain(fi.nom);
        expect(html).toContain(formatDate(fi.debut));
        expect(html).toContain(formatDate(fi.fin));
      });
      expect(html).toContain("Réalisée");
      expect(html).toContain("28 heures");
    });
  }

  it("ne remplace pas les dates réalisées par les trimestres prévisionnels du plan", () => {
    const actions = planDevActions(org, FORMATIONS_TEST["actions-formation"], []);
    const records = formationsIziRealisees(org);
    records.forEach(fi => {
      const action = actions.find(a => a.nom === fi.nom);
      expect(action?.realisee).toBe(true);
      expect(action?.periode).toBe(`Du ${formatDate(fi.debut)} au ${formatDate(fi.fin)}`);
    });
  });
});