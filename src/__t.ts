import { SAMPLE_FORMATIONS, HAYB_FORMATIONS_ORG, STAGIAIRES_GOTRM_SEPTEMBRE } from "@/lib/sampleData";
import { genECFUnifie } from "@/lib/gotrm/ecfDp";
const f:any = SAMPLE_FORMATIONS.find((x:any)=>x.dateDebut==="2026-09-01" && /40990/.test(x.codeRNCP||""));
const html = genECFUnifie(HAYB_FORMATIONS_ORG as any, f, STAGIAIRES_GOTRM_SEPTEMBRE as any, 0);
console.log("dates:", [...html.matchAll(/\d{2}\/\d{2}\/20\d\d/g)].map(m=>m[0]).join(" "));
console.log("unicode:", (html.match(/[☐☒]/g)||[]).length, "cases:", (html.match(/class="cbx"/g)||[]).length, "cochées:", (html.match(/b1/g)||[]).length);
console.log("cursive:", /cursive/.test(html), "reeval:", /Réévaluation/.test(html));
for (const at of [1,2,3]) {
  const seg = html.split(`Activité-type ${at} –`)[1]?.split(`Activité-type ${at+1} –`)[0]||"";
  const grilles = seg.split("grille-comp").length-1;
  const coch = (seg.match(/b1/g)||[]).length;
  console.log(`AT${at}: grilles=${grilles} cochées_total=${coch}`);
}
require("fs").writeFileSync("/tmp/ecf.html", html);
