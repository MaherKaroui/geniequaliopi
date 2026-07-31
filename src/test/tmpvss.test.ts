import { readFileSync } from "fs";
import { test } from "vitest";
import { parseSuiviVSSXlsx, genererPlanningVSS } from "@/lib/vssPlanning";
test("vss", () => {
  const buf = readFileSync("/mnt/user-uploads/SUIVI_PARCOURS_APPRENANT_VSS_25_DOSSIERS_AKTO_1785492326-2.xlsx");
  const rows = parseSuiviVSSXlsx(new Uint8Array(buf).buffer as ArrayBuffer);
  console.log(rows.slice(0,3).map(r=>({n:r.nom,h:r.heuresVSS,r:r.heuresRealisees,a:r.heuresAttendues,p:r.heuresParcours})));
  const p = genererPlanningVSS(rows[0]);
  console.log(p.totalAttendu, p.totalRealise, p.heuresAttenduesStade, p.totalPlanifie);
});
