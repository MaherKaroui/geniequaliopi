import { SAMPLE_FORMATIONS, SAMPLE_ORGANISME, SAMPLE_STAGIAIRES } from "@/lib/sampleData";
const f = SAMPLE_FORMATIONS.find((x:any)=>/40990/.test(x.codeRNCP||""));
console.log(SAMPLE_FORMATIONS.map((x:any)=>[x.intitule,x.codeRNCP,x.dateDebut,x.dateFin]));
console.log(SAMPLE_STAGIAIRES.slice(0,3).map((s:any)=>[s.nom,s.prenom,s.dateDebut,s.dateFin]));
