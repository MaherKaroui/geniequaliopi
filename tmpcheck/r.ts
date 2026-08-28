import { resolveReferentiel } from "../src/lib/dp/referentielTitres";
const ref = resolveReferentiel({ intitule: "Gestionnaire des opérations de transport routier de marchandises", codeRncp: "RNCP40990" } as any);
console.log(JSON.stringify(ref.activitesTypes, null, 1));
