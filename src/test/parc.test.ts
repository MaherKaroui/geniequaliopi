import { describe, it, expect } from "vitest";
import { HAYB_FORMATIONS_ORG, STAGIAIRES_GOTRM_SEPTEMBRE, SAMPLE_FORMATIONS } from "@/lib/sampleData";
const SAMPLE_ORGANISME:any = HAYB_FORMATIONS_ORG;
const SAMPLE_STAGIAIRES:any = STAGIAIRES_GOTRM_SEPTEMBRE;
const SAMPLE_FORMATION:any = SAMPLE_FORMATIONS.find((x:any)=>/Session intensive/.test(x.intitule));
import { buildDpDossier, genDPUnifie, genECFUnifie, A_RENSEIGNER_TXT } from "@/lib/gotrm/ecfDp";
import { controlerSessionDp } from "@/lib/dp/dpControles";
describe("parcours", () => {
  it("ok", () => {
    const st = SAMPLE_STAGIAIRES as any;
    const r = controlerSessionDp(SAMPLE_ORGANISME as any, SAMPLE_FORMATION as any, st);
    console.log("anomalies", JSON.stringify(r.anomalies, null, 1).slice(0, 3000));
    ["GIMENEZ","LEMAITRE","MANSEUR"].forEach((n) => {
      const i = st.findIndex((s: any) => (s.nom||"").toUpperCase() === n);
      const d = buildDpDossier(SAMPLE_ORGANISME as any, SAMPLE_FORMATION as any, st, i);
      console.log(n, "|", d.entreprise.nom, "|", d.periodeExercice, "|", d.exemples.map(e=>e.intitule.slice(0,40)));
      console.log("R1:", d.exemples[0].r1.slice(0,300));
      const dp = genDPUnifie(SAMPLE_ORGANISME as any, SAMPLE_FORMATION as any, st, i);
      const ecf = genECFUnifie(SAMPLE_ORGANISME as any, SAMPLE_FORMATION as any, st, i);
      expect(dp.includes(A_RENSEIGNER_TXT)).toBe(false);
      expect(ecf.includes("En attente du profil candidat")).toBe(false);
    });
    expect(r.anomalies.length).toBe(0);
  });
});
