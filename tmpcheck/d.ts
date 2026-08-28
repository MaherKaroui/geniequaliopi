import { GOTRM_CV_PROFILES } from "../src/lib/gotrm/cvProfiles";
import { buildEcfProfilage } from "../src/lib/dp/ecfProfilage";
import { resolveReferentiel } from "../src/lib/dp/referentielTitres";
const ref = resolveReferentiel({ intitule: "x", codeRNCP: "RNCP40990" } as any);
for (const n of ["HACHMI","KACIMI"]) {
  const p = GOTRM_CV_PROFILES.find(x=>x.nom===n)!;
  const r = buildEcfProfilage(ref,p);
  console.log("==",n);
  r.parAT.flat().forEach(c=>console.log(" ",c.niveau.padEnd(22),c.libelle.slice(0,70)));
}
