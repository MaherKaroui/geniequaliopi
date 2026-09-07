import { SAMPLE_ORGANISME, SAMPLE_FORMATIONS, SAMPLE_STAGIAIRES } from "../src/lib/sampleData";
import { generateDocumentById } from "../src/lib/documentGenerator";
const f = SAMPLE_FORMATIONS.find((x:any)=>x.intitule==="Initiation Word");
const html = generateDocumentById("programme_formation","",{organisme:SAMPLE_ORGANISME,formation:f,stagiaires:SAMPLE_STAGIAIRES.slice(0,2)} as any);
console.log(String(html).replace(/<[^>]+>/g," ").replace(/\s+/g," ").slice(0,6000));
