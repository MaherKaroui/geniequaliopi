import { describe, it } from "vitest";
import { generateStagiaireOpenAnswers, getQuestionsOuvertes } from "@/lib/evalContent";
import { getVitrageBesoin, isVitrageFormation, pickVitrageExerciceAnswer } from "@/lib/vitrageHumanized";

describe("vitrage", () => {
  it("varie", () => {
    const f = { intitule: "remplacement et réparation de vitrage automobile", codeRNCP: "RNCP36223" };
    console.log("detect", isVitrageFormation(f.intitule, f.codeRNCP));
    const qs = getQuestionsOuvertes(f.intitule).debut;
    console.log("nbQ", qs.length);
    for (const s of [{nom:"DUPONT",prenom:"Marc",civilite:"M."},{nom:"MARTIN",prenom:"Sophie",civilite:"Mme"}]) {
      const a = generateStagiaireOpenAnswers(qs, 0, true, s, f);
      console.log(s.nom, "=>", a[0].reponse.slice(0,90));
      console.log("besoin:", getVitrageBesoin(s.nom, s.prenom, s.civilite));
      console.log("ex:", (pickVitrageExerciceAnswer(f.intitule, f.codeRNCP, 0, 0, s)||"").slice(0,80));
    }
  });
});
