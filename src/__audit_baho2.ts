import { auditBahoParcours } from "./lib/baho/bahoExercices";
const rows = auditBahoParcours();
const byEnt: Record<string, string[]> = {};
for (const r of rows) (byEnt[r.entreprise] ||= []).push(r.appreciationEx1);
let dupEnt = 0;
for (const [e, list] of Object.entries(byEnt)) if (new Set(list).size !== list.length) { dupEnt++; console.log("doublon interne:", e, list.length); }
console.log("entreprises avec doublon d'appréciation:", dupEnt, "/", Object.keys(byEnt).length);
