// CFA CT3 - IND 12 — Cahier de contact (Suivi du public et du bénéficiaire)
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
function styleHeader(): any {
  return {
    font: { bold: true, color: { rgb: "1E3A7B" }, sz: 10 },
    fill: { fgColor: { rgb: "E8F0FE" } },
    alignment: { horizontal: "center", vertical: "center", wrapText: true },
    border: borderAll(),
  };
}
function styleCell(): any {
  return {
    alignment: { vertical: "center", wrapText: true },
    border: borderAll(),
    font: { sz: 10 },
  };
}
function setCell(ws: XLSX.WorkSheet, addr: string, value: any, style?: any) {
  ws[addr] = { v: value ?? "", t: typeof value === "number" ? "n" : "s", s: style };
}

function frDate(d: Date): string {
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

const THEMES = [
  "Information formation",
  "Demande de devis",
  "Inscription apprentissage",
  "Suivi candidature",
  "Renseignement RNCP",
  "Demande financement OPCO",
  "Visite entreprise",
  "Bilan tuteur",
  "Information CFA",
  "Demande accompagnement",
];

function buildSheet(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  const merges: XLSX.Range[] = [];
  ws["!merges"] = merges;

  // Titre principal (gauche : organisme, droite : "Cahier de contact")
  setCell(ws, "A1", (o.nom || "ORGANISME").toUpperCase(), styleTitle());
  merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } });
  setCell(ws, "C1", "Cahier de contact", styleTitle());
  merges.push({ s: { r: 0, c: 2 }, e: { r: 0, c: 7 } });

  // Sous-titre formation
  setCell(ws, "A2", `Suivi du public et du bénéficiaire — ${f.intitule || ""}`,
    { ...styleHeader(), font: { italic: true, sz: 10, color: { rgb: "1E3A7B" } } });
  merges.push({ s: { r: 1, c: 0 }, e: { r: 1, c: 7 } });

  // En-têtes sur 2 lignes (ligne 4 = groupes, ligne 5 = sous-en-têtes)
  // A=Date, B=Thème, C..F=Contact (Date, Raison sociale, Identité, Email, Tel), G=Résumé
  setCell(ws, "A4", "Date", styleHeader());
  merges.push({ s: { r: 3, c: 0 }, e: { r: 4, c: 0 } });

  setCell(ws, "B4", "Thème", styleHeader());
  merges.push({ s: { r: 3, c: 1 }, e: { r: 4, c: 1 } });

  setCell(ws, "C4", "Contact", styleHeader());
  merges.push({ s: { r: 3, c: 2 }, e: { r: 3, c: 6 } });
  // Sous-en-têtes du groupe Contact
  ["Date", "Raison sociale", "Identité", "Email", "Tel"].forEach((h, i) => {
    setCell(ws, XLSX.utils.encode_cell({ r: 4, c: 2 + i }), h, styleHeader());
  });

  setCell(ws, "H4", "Résumé des échanges", styleHeader());
  merges.push({ s: { r: 3, c: 7 }, e: { r: 4, c: 7 } });

  // Lignes pré-remplies à partir des stagiaires
  const today = new Date();
  let r = 5;
  stagiaires.forEach((s, idx) => {
    const dTheme = new Date(today);
    dTheme.setDate(dTheme.getDate() - (stagiaires.length - idx) * 5);
    const dContact = new Date(dTheme);
    dContact.setDate(dContact.getDate() + 2);
    setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), frDate(dTheme), styleCell());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 1 }), THEMES[idx % THEMES.length], styleCell());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 2 }), frDate(dContact), styleCell());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 3 }), (s as any).entrepriseNom || (s as any).entreprise || "Particulier", styleCell());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 4 }), `${s.civilite || ""} ${s.nom || ""} ${s.prenom || ""}`.trim(), styleCell());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 5 }), s.email || "", styleCell());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 6 }), s.telephone || "", styleCell());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 7 }),
      `Échange concernant la formation ${f.intitule || ""}. Information transmise, candidature suivie.`,
      styleCell());
    r++;
  });

  // Lignes vierges supplémentaires
  for (let k = 0; k < 20; k++) {
    for (let c = 0; c < 8; c++) {
      setCell(ws, XLSX.utils.encode_cell({ r, c }), "", styleCell());
    }
    r++;
  }

  ws["!cols"] = [
    { wch: 12 }, { wch: 22 }, { wch: 12 }, { wch: 24 },
    { wch: 24 }, { wch: 28 }, { wch: 14 }, { wch: 50 },
  ];
  ws["!rows"] = [{ hpt: 26 }, { hpt: 20 }, { hpt: 6 }, { hpt: 22 }, { hpt: 22 }];
  ws["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: r - 1, c: 7 } });
  return ws;
}

export function generateSuiviPublicBeneficiaireXlsxBlob(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
): Blob {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, buildSheet(o, f, stagiaires), "Cahier de contact");
  const out = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  return new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
