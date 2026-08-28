import { it } from "vitest";
import { HAYB_FORMATIONS_ORG, STAGIAIRES_GOTRM_SEPTEMBRE, SAMPLE_FORMATIONS } from "@/lib/sampleData";
import { buildDpDossier } from "@/lib/gotrm/ecfDp";
const f = SAMPLE_FORMATIONS.find((x: any) => /Session intensive/.test(x.intitule))!;
it("dbg", () => {
  const needle = "sans passer par le service commercial";
  [4,6,9].forEach((i) => {
    const d = buildDpDossier(HAYB_FORMATIONS_ORG, f, STAGIAIRES_GOTRM_SEPTEMBRE, i);
    d.exemples.forEach((e) => {
      [["r1",e.r1],["r2",e.r2],["r3",e.r3],["r5",e.r5]].forEach(([k,v]) => {
        if ((v as string).toLowerCase().includes(needle)) console.log(i, d.stagiaire.nom, "AT"+e.atIndex, k, "→", v);
      });
    });
  });
});
