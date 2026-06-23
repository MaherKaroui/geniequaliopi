import { buildRecommandations } from "../src/lib/bdc/bdcNTStatsXlsx";
const o:any = { nom:"TEST", siret:"123", nda:"456", dateMaj:"2025-01-01" };
const f:any = { dateDebut:"01/01/2024", dateFin:"01/06/2024" };
const st:any = Array.from({length:100},(_,i)=>({prenom:`P${i}`,nom:`N${i}`}));
const html = buildRecommandations(o,f,st);
const rows = html.match(/<tr>[\s\S]*?<\/tr>/g) || [];
const comments:string[] = [];
rows.forEach(r=>{
  const tds = [...r.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m=>m[1]);
  if (tds.length===5 && /^\d+$/.test(tds[0])) comments.push(`#${tds[0]} [${tds[2]}] ${tds[4]}`);
});
console.log(comments.join("\n"));
console.log("\nUnique:", new Set(comments.map(c=>c.split("] ")[1])).size, "/", comments.length);
