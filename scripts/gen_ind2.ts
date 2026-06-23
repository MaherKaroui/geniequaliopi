import { Window } from "happy-dom";
const w = new Window();
(globalThis as any).DOMParser = w.DOMParser;
(globalThis as any).window = w;
(globalThis as any).document = w.document;
import { BDC_NT_STATS_FILES } from "../src/lib/bdc/bdcNTStatsXlsx";
import { htmlToXlsxBlob } from "../src/lib/htmlToXlsx";
import * as fs from "fs";
const org:any = { nom:"SELECT FORMATION", siret:"123 456 789 00012", nda:"11 75 12345 75", dateMaj:"4 novembre 2024", responsablePedagogique:"Marie MARTIN" };
const f:any = { intitule:"Bilan de compétences", dateDebut:"01/03/2024", dateFin:"30/05/2024" };
const noms=["MARTIN","DURAND","BERNARD","PETIT","ROBERT","RICHARD","DUBOIS","MOREAU","LAURENT","SIMON"];
const prenoms=["Sophie","Jean","Marie","Pierre","Claire","Thomas","Julie","Marc","Léa","Paul"];
const st = Array.from({length:10}, (_,i)=>({civilite:i%2?"Mme":"M.", nom:noms[i], prenom:prenoms[i], dateDebutFormation:"01/03/2024", dateFinFormation:"30/05/2024", poste:"Évolution professionnelle"}));
for (const file of BDC_NT_STATS_FILES) {
  const html = file.build(org, f, st);
  const blob = htmlToXlsxBlob(html);
  const buf = Buffer.from(await blob.arrayBuffer());
  fs.writeFileSync(`/mnt/documents/bdc_ind2/${file.name}`, buf);
  console.log("OK", file.name);
}
