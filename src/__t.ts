import { SAMPLE_FORMATIONS, SAMPLE_ORGANISME, SAMPLE_STAGIAIRES } from "@/lib/sampleData";
import { genECFUnifie } from "@/lib/gotrm/ecfDp";
const f = SAMPLE_FORMATIONS.find((x:any)=>/40990/.test(x.codeRNCP||"")) || SAMPLE_FORMATIONS[0];
const st = SAMPLE_STAGIAIRES.filter((s:any)=>/ATASOY/i.test(s.nom));
const html = genECFUnifie(SAMPLE_ORGANISME as any, f as any, (st.length?st:SAMPLE_STAGIAIRES) as any, 0);
console.log("2025 occurrences:", [...html.matchAll(/\d{2}\/\d{2}\/2025/g)].map(m=>m[0]));
console.log("dates:", [...html.matchAll(/\d{2}\/\d{2}\/20\d\d/g)].map(m=>m[0]).join(" "));
console.log("unicode boxes:", (html.match(/[☐☒]/g)||[]).length, "cbx:", (html.match(/class="cbx"/g)||[]).length);
console.log("cursive:", /cursive/.test(html));
