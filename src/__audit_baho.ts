import { auditBahoParcours, bahoTrajectoire } from "./lib/baho/bahoExercices";
const rows = auditBahoParcours();
console.log("stagiaires:", rows.length);
let bad = 0, coll = 0;
for (const r of rows) {
  const n = r.notes;
  if (n.posDebut > 7 || n.posFin < 7 || n.ex1 < 3 || n.ex2 < n.ex1 || n.final < n.ex2 || n.ex1 < n.posDebut) { bad++; console.log("KO", r.stagiaire, n); }
  if (r.collisionJ2Final) coll++;
}
console.log("incohérences:", bad, "collisions J2/final:", coll);
console.log("jours ex.:", rows[0].jours, rows[0].entreprise);
console.log("\n| Stagiaire | J1 | J2 | J3 | pos.début | ex.J1 | ex.J2 | éval | pos.fin |");
for (const r of rows.slice(0,12)) console.log(`| ${r.stagiaire} | ${r.jours[0]} | ${r.jours[1]} | ${r.jours[2]} | ${r.notes.posDebut} | ${r.notes.ex1} | ${r.notes.ex2} | ${r.notes.final} | ${r.notes.posFin} |`);
const uniq = new Set(rows.map(r=>r.appreciationEx1));
console.log("\nappréciations ex1 distinctes:", uniq.size, "/", rows.length);
console.log("\nA)", rows[0].stagiaire, "→", rows[0].appreciationEx1);
console.log("\nB)", rows[1].stagiaire, "→", rows[1].appreciationEx1);
const dist: Record<string,number> = {};
for (const r of rows) { const k = [r.notes.posDebut,r.notes.ex1,r.notes.ex2,r.notes.final,r.notes.posFin].join("-"); dist[k]=(dist[k]||0)+1; }
console.log("\ntrajectoires distinctes:", Object.keys(dist).length);
