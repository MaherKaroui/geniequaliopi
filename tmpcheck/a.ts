import { GOTRM_CV_PROFILES } from "../src/lib/gotrm/cvProfiles";
import { buildEcfProfilage } from "../src/lib/dp/ecfProfilage";
import { resolveReferentiel } from "../src/lib/dp/referentielTitres";
const ref = resolveReferentiel({ intitule:"x", codeRNCP: "RNCP40990" } as any);
const seen = new Map<string,string>();
let dup=0;
for (const p of GOTRM_CV_PROFILES) {
  const r = buildEcfProfilage(ref,p);
  if(!r.renseigne) continue;
  for (const a of [...r.appreciations, r.observation]) {
    const k=a.trim().toLowerCase();
    if(k.length>40 && seen.has(k)){console.log("DUP",seen.get(k),p.nom);dup++;}
    else seen.set(k,p.nom);
  }
}
console.log("duplications:",dup);
console.log(buildEcfProfilage(ref,GOTRM_CV_PROFILES.find(x=>x.nom==="HOUARI")!).appreciations[0]);
