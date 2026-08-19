import { buildBdcContext } from "../src/lib/bdc/bdcModel";
import { validerDossierBDC } from "../src/lib/bdc/bdcValidation";
import { BDC_TEMPLATES_MANQUANTS } from "../src/lib/bdc/bdcTemplatesBC";
import { autofillDocument } from "../src/lib/autofill";

const org: any = { nom: "BAKERY SOFYIA", adresse: "1 rue X", codePostal: "94000", ville: "Créteil", siret: "123", nda: "11941044694", dirigeant: "Sofyia B", email:"a@b.fr", telephone:"01", tamponUrl:"", signatureUrl:"" };
const formation: any = { intitule: "Bilan", duree: "24", dateDebut: "2025-03-03", dateFin: "2025-05-30", tarif: "1800", modalites: "présentiel", formateur: "Yassine", lieu: "Créteil" };
const stags: any[] = [
  { civilite:"M.", nom:"EL-ARABY", prenom:"Yassine", email:"y@x.fr", entreprise:"" },
  { civilite:"Mme", nom:"CHATI", prenom:"RAHMA", email:"r@x.fr", entreprise:"" },
];
const ctx = buildBdcContext(org, formation, stags);
const rep = validerDossierBDC(ctx);
console.log("KO:", rep.bloquantes.filter(r=>!r.ok).map(r=>r.code+" "+(r.details||[]).slice(0,2).join(";")));
console.log("seances b1", ctx.seancesParBeneficiaire[Object.keys(ctx.seancesParBeneficiaire)[0]].map(s=>s.date.toLocaleDateString('fr-FR')+" "+s.heureDebut+" "+s.duree+"h").join(" | "));
console.log("seances b2", ctx.seancesParBeneficiaire[Object.keys(ctx.seancesParBeneficiaire)[1]].map(s=>s.date.toLocaleDateString('fr-FR')+" "+s.heureDebut).join(" | "));
const md = autofillDocument(BDC_TEMPLATES_MANQUANTS[0].build(ctx, ctx.beneficiaires[0]), ctx, ctx.beneficiaires[0]);
console.log(md.slice(0,300));
console.log("...SIGN...", md.slice(md.indexOf("## Signatures"), md.indexOf("## Signatures")+400));
