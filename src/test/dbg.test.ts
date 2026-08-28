import { it } from "vitest";
import { HAYB_FORMATIONS_ORG, STAGIAIRES_GOTRM_SEPTEMBRE, SAMPLE_FORMATIONS } from "@/lib/sampleData";
import { buildDpDossier } from "@/lib/gotrm/ecfDp";
const f = SAMPLE_FORMATIONS.find((x: any) => /Session intensive/.test(x.intitule))!;
it("dbg", () => {
  [4,6,9].forEach((i) => {
    const d = buildDpDossier(HAYB_FORMATIONS_ORG, f, STAGIAIRES_GOTRM_SEPTEMBRE, i);
    console.log(i, d.stagiaire.nom, "| r1[0]:", d.exemples[0].r1.slice(0,200));
  });
});
