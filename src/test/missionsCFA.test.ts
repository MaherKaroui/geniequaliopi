import { describe, it, expect, beforeAll } from "vitest";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { MISSIONS_QCM, pickStudentAnswers } from "@/lib/templatesCFA14Missions";
import { MISSIONS_REF } from "@/lib/missionsCFA2026";
import { dateQCMMission } from "@/lib/calendrierMissionsCFA";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST, preloadFormationsTest } from "./dossierAudit.harness";

const org = { ...ORG_TEST, typesActions: ["apprentissage" as const] };
const f = FORMATIONS_TEST["apprentissage"];
const texte = (h: string) => h.replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

describe("14 missions CFA (art. L.6231-2)", () => {
  beforeAll(async () => { await preloadFormationsTest(); }, 120_000);

  it("classe aussi une convention de formation par apprenti dans l'indicateur 9", () => {
    const conventions = getFullCatalog(org, f, STAGIAIRES_TEST).filter(
      (d) => d.indicateur === 9 && d.template === "convention_formation_cfa",
    );
    expect(conventions).toHaveLength(STAGIAIRES_TEST.length);
    expect(conventions.every((d) => d.nom.startsWith("CT3 - IND 9 CONVENTION DE FORMATION PAR APPRENTISSAGE"))).toBe(true);
  });

  it("les 14 missions sont présentes avec fiche, émargement, QCM, newsletter et visuel", () => {
    const cat = getFullCatalog(org, f, STAGIAIRES_TEST);
    expect(MISSIONS_REF.map((m) => m.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    for (let n = 1; n <= 14; n++) {
      expect(cat.some((d) => d.template === "fiche_mission_cfa" && d.params?.missionNumero === n)).toBe(true);
      expect(cat.some((d) => d.template === "emargement_atelier_mission_cfa" && d.params?.missionNumero === n)).toBe(true);
      expect(cat.filter((d) => d.template === "qcm_mission_cfa" && d.params?.missionNumero === n).length).toBe(STAGIAIRES_TEST.length);
      expect(cat.some((d) => d.template === "newsletter_mission_cfa" && d.nom.includes(`Mission ${n} –`))).toBe(true);
      expect(cat.some((d) => d.template === "visuel_mission_cfa" && d.nom.includes(`Mission ${n} –`))).toBe(true);
    }
    for (const t of ["tableau_bord_14_missions_cfa", "plan_annuel_14_missions_cfa", "procedure_accompagnement_social_cfa", "procedure_evaluation_competences_cfa"]) {
      expect(cat.some((d) => d.template === t)).toBe(true);
    }
  });

  it("aucune date de mission dans le futur n'est présentée comme réalisée", () => {
    const now = new Date();
    const cat = getFullCatalog(org, f, STAGIAIRES_TEST);
    for (const d of cat.filter((x) => x.template === "qcm_mission_cfa")) {
      const s = STAGIAIRES_TEST[d.params!.stagiaireIdx as number];
      const futur = dateQCMMission(f, d.params!.missionNumero as number, s).getTime() > now.getTime();
      const t = texte(generateDocumentById(d.id, d.template, d.params, org, f, STAGIAIRES_TEST));
      if (futur) expect(t).not.toMatch(/Score : \d/);
      else expect(t).toMatch(/Score : \d/);
    }
    const bord = texte(generateDocumentById("x", "tableau_bord_14_missions_cfa", {}, org, f, STAGIAIRES_TEST));
    for (const m of bord.matchAll(/(\d{2})\/(\d{2})\/(\d{4})/g)) {
      expect(new Date(+m[3], +m[2] - 1, +m[1]).getTime()).toBeLessThanOrEqual(now.getTime());
    }
  });

  it("les réponses aux QCM diffèrent d'un apprenti à l'autre", () => {
    for (const m of MISSIONS_QCM) {
      const rep = STAGIAIRES_TEST.map((s) => pickStudentAnswers(s, m.numero, m.questions).join(","));
      expect(new Set(rep).size).toBeGreaterThan(1);
    }
  });

  it("pas d'aide supprimée ni d'aide francilienne pour un CFA hors Île-de-France", () => {
    const cat = getFullCatalog(org, f, STAGIAIRES_TEST).filter((d) => /mission|14_missions/i.test(d.template) || /14 MISSIONS/.test(d.nom));
    for (const d of cat) {
      const t = texte(generateDocumentById(d.id, d.template, d.params, org, f, STAGIAIRES_TEST));
      const hit = t.match(/.{0,60}(Imagine R|\bARA\b|prime IDF|68 %|720 €|1 200 € pour 4 semaines).{0,40}/);
      expect(hit ? `${d.id} :: ${hit[0]}` : "").toBe("");
      expect(t).not.toMatch(/aide (au|de 500 € au) permis[^.]*(500 €|versée)/i);
    }
  });
});
