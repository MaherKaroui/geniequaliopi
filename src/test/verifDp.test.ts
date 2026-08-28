import { describe, it, expect } from "vitest";
import { HAYB_FORMATIONS_ORG, STAGIAIRES_GOTRM_SEPTEMBRE, SAMPLE_FORMATIONS } from "@/lib/sampleData";
import { controlerSessionDp } from "@/lib/dp/dpControles";
import { buildDpDossier } from "@/lib/gotrm/ecfDp";

const f = SAMPLE_FORMATIONS.find((x: any) => /Session intensive/.test(x.intitule))!;

describe("DP session GOTRM", () => {
  it("aucune duplication >40 caractères", () => {
    const r = controlerSessionDp(HAYB_FORMATIONS_ORG, f, STAGIAIRES_GOTRM_SEPTEMBRE);
    const dup = r.anomalies.filter((a) => /Duplication/.test(a.regle));
    console.log("ANOMALIES:", r.anomalies.map((a) => `${a.regle} | ${a.candidat} | ${a.message.slice(0,120)}`).join("\n"));
    expect(dup).toEqual([]);
  });
  it("périodes issues d'une seule expérience", () => {
    STAGIAIRES_GOTRM_SEPTEMBRE.forEach((_, i) => {
      const d = buildDpDossier(HAYB_FORMATIONS_ORG, f, STAGIAIRES_GOTRM_SEPTEMBRE, i);
      console.log(`${d.stagiaire.nom} | ${d.entreprise.nom} | ${d.periodeExercice} | AT1=${d.exemples[0]?.intitule.slice(0,50)}`);
    });
  });
});
