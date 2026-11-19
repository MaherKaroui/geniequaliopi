import { describe, it, expect } from "vitest";
import { FORMATION_GMA70, GMA70_EXERCICES, GMA70_EXERCICES_COMPLETS } from "@/lib/projecteursGrandMA70hPreset";
import { FORMATION_MSC70, MSC70_EXERCICES, MSC70_EXERCICES_COMPLETS } from "@/lib/machinerieScenique70hPreset";
import { pickGMA70ExerciceAnswer } from "@/lib/projecteursGrandMA70hHumanized";
import { pickMSC70ExerciceAnswer } from "@/lib/machinerieScenique70hHumanized";

const CAS = [
  { nom: "GMA70", f: FORMATION_GMA70, ex: GMA70_EXERCICES, complets: GMA70_EXERCICES_COMPLETS, pick: pickGMA70ExerciceAnswer },
  { nom: "MSC70", f: FORMATION_MSC70, ex: MSC70_EXERCICES, complets: MSC70_EXERCICES_COMPLETS, pick: pickMSC70ExerciceAnswer },
];
const estQcm = (titre: string) => /^QCM C\d/.test(titre);

describe("Formations spectacle 70 h — une évaluation par jour, exercices et QCM mêlés", () => {
  for (const { nom, f, ex, complets, pick } of CAS) {
    it(`${nom} : les 10 journées alternent mises en situation et QCM`, () => {
      expect(complets).toHaveLength(16);
      const jours = complets.slice(0, 10).map(e => e.titre);
      expect(jours.filter(estQcm)).toHaveLength(4);
      expect(jours.filter(t => t.startsWith("Mise en situation — C"))).toHaveLength(6);
      expect(estQcm(jours[0])).toBe(false);
      for (let i = 1; i < jours.length; i++) {
        expect(estQcm(jours[i]) && estQcm(jours[i - 1]), `jours ${i} et ${i + 1}`).toBe(false);
      }
      // Compétence non décroissante au fil des jours ; aucun titre numéroté.
      const comp = jours.map(t => Number(t.match(/C(\d)/)![1]));
      comp.forEach((c, i) => i && expect(c).toBeGreaterThanOrEqual(comp[i - 1]));
      complets.forEach(e => expect(e.titre).not.toMatch(/^Exercice \d/));
      expect(new Set(complets.map(e => e.titre)).size).toBe(16);
    });

    it(`${nom} : une mise en situation renommée garde la copie de son exercice d'origine`, () => {
      const s = { nom: "X", prenom: "Karim", civilite: "M." };
      ex.forEach((orig, oi) => {
        const renomme = complets.find(e => e.consigne === orig.consigne)!;
        expect(renomme.titre).toBe(orig.titre.replace(/^Exercice \d+ — /, "Mise en situation — "));
        for (const si of [0, 3]) {
          expect(pick(f.intitule, "", 99, si, s, renomme.titre), `${orig.titre}`).toBe(pick(f.intitule, "", oi, si, s, orig.titre));
        }
      });
    });
  }
});
