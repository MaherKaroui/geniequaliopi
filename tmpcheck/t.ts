import { GOTRM_CV_PROFILES } from "../src/lib/gotrm/cvProfiles";
import { buildEcfProfilage } from "../src/lib/dp/ecfProfilage";
import { resolveReferentiel } from "../src/lib/dp/referentielTitres";
const ref = resolveReferentiel({ intitule: "Gestionnaire des opérations de transport routier de marchandises", codeRNCP: "RNCP40990" } as any);
for (const p of GOTRM_CV_PROFILES) {
  const r = buildEcfProfilage(ref, p);
  console.log(p.nom.padEnd(11), r.renseigne ? r.signature : "(vide)");
}
