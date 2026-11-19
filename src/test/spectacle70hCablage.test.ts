import { describe, it, expect } from "vitest";
import type { OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import { seedGMA70AICaches } from "@/lib/projecteursGrandMA70hPreset";
import { seedMSC70AICaches } from "@/lib/machinerieScenique70hPreset";

const INTERDITS = /RNCP|RSs?d{3,4}|CPF|France Compétences|jury|formation certifiante|titre professionnel|TOEIC/i;
const DOCS_ORGANISME = /^af_c(1i2|5i21|5i22|6i23|7i32)_/;
const HORS_FORMATION = /TOEIC|VTest/i;
import { FORMATION_GMA70, GMA70_EXERCICES_COMPLETS } from "@/lib/projecteursGrandMA70hPreset";
import { FORMATION_MSC70, MSC70_EXERCICES_COMPLETS } from "@/lib/machinerieScenique70hPreset";
import { isGMA70Formation } from "@/lib/projecteursGrandMA70hHumanized";
import { isMSC70Formation } from "@/lib/machinerieScenique70hHumanized";

const CAS = [
  { f: FORMATION_GMA70, complets: GMA70_EXERCICES_COMPLETS, is: isGMA70Formation },
  { f: FORMATION_MSC70, complets: MSC70_EXERCICES_COMPLETS, is: isMSC70Formation },
];

describe("Formations spectacle 70 h — câblage", () => {
  it("chaque exemple n'est reconnu que par son propre détecteur", async () => {
    const { SAMPLE_FORMATIONS } = await import("@/lib/sampleData");
    for (const { f, is } of CAS) {
      expect(SAMPLE_FORMATIONS.some(s => s.intitule === f.intitule)).toBe(true);
      expect(SAMPLE_FORMATIONS.filter(s => is(s.intitule, s.codeRNCP)).map(s => s.intitule)).toEqual([f.intitule]);
    }
    expect(isGMA70Formation(FORMATION_MSC70.intitule)).toBe(false);
    expect(isMSC70Formation(FORMATION_GMA70.intitule)).toBe(false);
  });

  it("support de cours propre : 6 chapitres, plus de 500 000 caractères", async () => {
    const { getCourseChapters } = await import("@/lib/courseContent");
    for (const { f } of CAS) {
      const ch = getCourseChapters(f.intitule);
      expect(ch).toHaveLength(6);
      const total = ch.reduce((n, c) => n + c.sections.reduce((m, s) => m + s.content.length, 0), 0);
      expect(total).toBeGreaterThan(500_000);
      expect(JSON.stringify(ch)).not.toMatch(/présentiel|distanciel|RNCP|CPF/i);
    }
  }, 30_000);

  it("contenu d'évaluation propre : exercices du preset et 6 compétences", async () => {
    const { getEvalContent } = await import("@/lib/evalContent");
    for (const { f, complets } of CAS) {
      const ev = getEvalContent(f.intitule);
      expect(ev.exercices.map(e => e.titre)).toEqual(complets.map(e => e.titre));
      expect(ev.competences).toHaveLength(6);
      expect(ev.appreciations).toHaveLength(6);
    }
  }, 30_000);

  for (const [nom, seed, getF] of [["GMA70", seedGMA70AICaches, () => FORMATION_GMA70], ["MSC70", seedMSC70AICaches, () => FORMATION_MSC70]] as const) {
    it(`${nom} : dossier AF complet généré sans mention RNCP, RS, CPF, France Compétences ou jury`, async () => {
      const { getFullCatalog, generateDocumentById } = await import("@/lib/documentGenerator");
      const org: OrganismeInfo = {
        nom: "ORGANISME TEST SPECTACLE", siret: "912 345 678 00019", adresse: "1 rue de l'Essai", codePostal: "92800", ville: "Puteaux",
        telephone: "01 00 00 00 00", email: "contact@organisme-test.fr", siteWeb: "", nda: "11 92 99999 92",
        dirigeant: "Paul TESTARD", responsablePedagogique: "Paul TESTARD", referentHandicap: "Paul TESTARD",
        referentQualite: "Paul TESTARD", poleAdministratif: "Paul TESTARD", relationEntreprises: "", referentMobilite: "",
        domainesFormation: "85.59A", typesActions: ["actions-formation"], certifications: "", outilsUtilises: "", version: "1", dateMaj: "2023-09-09",
      };
      const f = { ...getF(), formateur: "Paul TESTARD", lieu: "Google Meet / Zoom" };
      const stagiaires: StagiaireInfo[] = [
        { civilite: "M.", nom: "ALPHA", prenom: "Marc", email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "", financeur: "Afdas" },
        { civilite: "Mme", nom: "BRAVO", prenom: "Lina", email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "", financeur: "Afdas" },
      ];
      seed(f);
      const fuites: string[] = [];
      const catalogue = getFullCatalog(org, f, stagiaires);
      let generes = 0;
      for (const d of catalogue) {
        let html = "";
        try { html = generateDocumentById(d.id, d.template, d.params, org, f, stagiaires) || ""; } catch { continue; }
        if (html) generes++;
        const texte = html.replace(/<[^>]+>/g, " ").replace(/s+/g, " ")
          .replace(/certifications+(qualit[ée]s+)?(«s*)?Qualiopi/gi, "").replace(/marque de certification/gi, "");
        const re = DOCS_ORGANISME.test(d.id) ? HORS_FORMATION : INTERDITS;
        const m = texte.match(new RegExp(`.{0,60}(${re.source}).{0,60}`, "i"));
        if (m) fuites.push(`${d.id} — ${d.nom} : …${m[0]}…`);
      }
      expect(generes).toBeGreaterThan(50);
      expect(fuites).toEqual([]);
    }, 600_000);
  }
});
