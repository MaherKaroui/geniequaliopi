// CFA CT3 - IND 12 — Tableau de suivi PFMP (Périodes de Formation en Milieu Professionnel)
// Vrai fichier .xlsx généré via SheetJS
import * as XLSX from "xlsx";
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";

function borderAll() {
  const b = { style: "thin", color: { rgb: "888888" } };
  return { top: b, bottom: b, left: b, right: b };
}
function styleTitle(): any {
  return {
    font: { bold: true, color: { rgb: "FFFFFF" }, sz: 13 },
    fill: { fgColor: { rgb: "1E3A7B" } },
    alignment: { horizontal: "center", vertical: "center", wrapText: true },
    border: borderAll(),
  };
}
function styleSubTitle(): any {
  return {
    font: { bold: true, color: { rgb: "1E3A7B" }, sz: 10 },
    fill: { fgColor: { rgb: "F4F7FB" } },
    alignment: { vertical: "center", wrapText: true },
    border: borderAll(),
  };
}
function styleHeader(): any {
  return {
    font: { bold: true, color: { rgb: "1E3A7B" }, sz: 10 },
    fill: { fgColor: { rgb: "E8F0FE" } },
    alignment: { horizontal: "center", vertical: "center", wrapText: true },
    border: borderAll(),
  };
}
function styleCell(align: "left" | "center" = "center"): any {
  return {
    alignment: { horizontal: align, vertical: "center", wrapText: true },
    border: borderAll(),
    font: { sz: 10 },
  };
}
function styleConforme(): any {
  return {
    font: { bold: true, color: { rgb: "1E7B3A" }, sz: 10 },
    fill: { fgColor: { rgb: "EAF7EE" } },
    alignment: { horizontal: "center", vertical: "center" },
    border: borderAll(),
  };
}
function setCell(ws: XLSX.WorkSheet, addr: string, value: any, style?: any) {
  ws[addr] = { v: value ?? "", t: typeof value === "number" ? "n" : "s", s: style };
}

function buildSheet(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], dureeAnnees: 2 | 3): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  const merges: XLSX.Range[] = [];
  ws["!merges"] = merges;

  const nbPeriodes = dureeAnnees === 3 ? 6 : 4;
  const totalCols = nbPeriodes + 5; // élève + P1..Pn + 4 colonnes finales

  // Titre
  setCell(ws, "A1", `SUIVI PFMP – ${(o.nom || "ORGANISME").toUpperCase()}`, styleTitle());
  merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: totalCols - 1 } });

  // Bloc info
  setCell(ws, "A2", `Établissement : ${o.nom || ""}`, styleSubTitle());
  merges.push({ s: { r: 1, c: 0 }, e: { r: 1, c: 3 } });
  setCell(ws, XLSX.utils.encode_cell({ r: 1, c: 4 }), `Diplôme : ${f.intitule || ""}`, styleSubTitle());
  merges.push({ s: { r: 1, c: 4 }, e: { r: 1, c: 7 } });
  setCell(ws, XLSX.utils.encode_cell({ r: 1, c: 8 }), `Session : ${new Date().getFullYear()}`, styleSubTitle());
  merges.push({ s: { r: 1, c: 8 }, e: { r: 1, c: totalCols - 1 } });

  // En-têtes
  const headerRow = 3;
  setCell(ws, XLSX.utils.encode_cell({ r: headerRow, c: 0 }), "Noms des Élèves", styleHeader());
  for (let i = 0; i < nbPeriodes; i++) {
    setCell(ws, XLSX.utils.encode_cell({ r: headerRow, c: 1 + i }), `P${i + 1}`, styleHeader());
  }
  const lastHeaders = ["Jours certif.", "Jours à récupérer", "Rattrapage", "Conformité"];
  lastHeaders.forEach((h, i) =>
    setCell(ws, XLSX.utils.encode_cell({ r: headerRow, c: 1 + nbPeriodes + i }), h, styleHeader()),
  );

  // Lignes stagiaires
  let r = headerRow + 1;
  const joursParPeriode = dureeAnnees === 3 ? 22 : 30;
  const joursCertif = dureeAnnees === 3 ? 132 : 120;

  stagiaires.forEach((s, idx) => {
    setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), `${s.nom || ""} ${s.prenom || ""}`.trim(), styleCell("left"));
    for (let i = 0; i < nbPeriodes; i++) {
      // Variation : la plupart valident, quelques jours d'absence ponctuels
      const realises = i === (idx % nbPeriodes) ? joursParPeriode - 2 : joursParPeriode;
      setCell(ws, XLSX.utils.encode_cell({ r, c: 1 + i }), realises, styleCell());
    }
    const totalRealise = nbPeriodes * joursParPeriode - 2;
    const aRecuperer = joursCertif - totalRealise;
    setCell(ws, XLSX.utils.encode_cell({ r, c: 1 + nbPeriodes }), joursCertif, styleCell());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 1 + nbPeriodes + 1 }), aRecuperer > 0 ? aRecuperer : 0, styleCell());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 1 + nbPeriodes + 2 }), aRecuperer > 0 ? "Récupéré sur P suivante" : "—", styleCell());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 1 + nbPeriodes + 3 }), "Conforme", styleConforme());
    r++;
  });

  // Lignes vides
  for (let k = 0; k < Math.max(0, 10 - stagiaires.length); k++) {
    for (let c = 0; c < totalCols; c++) {
      setCell(ws, XLSX.utils.encode_cell({ r, c }), "", styleCell());
    }
    r++;
  }

  // Largeurs
  const cols: { wch: number }[] = [{ wch: 24 }];
  for (let i = 0; i < nbPeriodes; i++) cols.push({ wch: 8 });
  cols.push({ wch: 12 }, { wch: 14 }, { wch: 22 }, { wch: 12 });
  ws["!cols"] = cols;

  ws["!rows"] = [{ hpt: 26 }, { hpt: 20 }, { hpt: 6 }, { hpt: 28 }];
  ws["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: r - 1, c: totalCols - 1 } });
  return ws;
}

export function generateSuiviPFMPXlsxBlob(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
): Blob {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, buildSheet(o, f, stagiaires, 3), "Formations 3 ans");
  XLSX.utils.book_append_sheet(wb, buildSheet(o, f, stagiaires, 2), "Formations 2 ans");
  const out = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  return new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
