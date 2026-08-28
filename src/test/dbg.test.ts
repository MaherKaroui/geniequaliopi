import { it } from "vitest";
import { HAYB_FORMATIONS_ORG, STAGIAIRES_GOTRM_SEPTEMBRE, SAMPLE_FORMATIONS } from "@/lib/sampleData";
import { buildDpDossier } from "@/lib/gotrm/ecfDp";
const f = SAMPLE_FORMATIONS.find((x: any) => /Session intensive/.test(x.intitule))!;
it("dbg", () => {
  [0,6,9].forEach((i) => {
    const d = buildDpDossier(HAYB_FORMATIONS_ORG, f, STAGIAIRES_GOTRM_SEPTEMBRE, i);
    console.log("===", d.stagiaire.nom, "\nR1:", d.exemples[2].r1, "\nR2:", d.exemples[2].r2, "\nR3:", d.exemples[2].r3, "\nR5:", d.exemples[2].r5);
  });
});
