// CFA CT3 - IND 9 — SUIVI DES INSCRIPTIONS
// Vrai fichier .xlsx généré via SheetJS (pas un HTML déguisé).
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
function styleSubtitle(): any {
  return {
    font: { italic: true, sz: 10, color: { rgb: "1E3A7B" } },
    alignment: { horizontal: "center", vertical: "center", wrapText: true },
    border: borderAll(),
  };
}
function styleHeader(): any {
  return {
    font: { bold: true, color: { rgb: "FFFFFF" }, sz: 10 },
    fill: { fgColor: { rgb: "1E3A7B" } },
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
function styleEmpty(): any {
  return {
    fill: { fgColor: { rgb: "FAFAFA" } },
    border: borderAll(),
    font: { sz: 10 },
  };
}

function setCell(ws: XLSX.WorkSheet, addr: string, value: any, style?: any) {
  ws[addr] = { v: value ?? "", t: typeof value === "number" ? "n" : "s", s: style };
}

function frDate(d?: string): string {
  if (!d) return "";
  // Accept "yyyy-mm-dd" or "dd/mm/yyyy"
  const iso = /^\d{4}-\d{2}-\d{2}/.test(d);
  const dt = iso ? new Date(d) : new Date(d.split("/").reverse().join("-"));
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function buildSheet(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  const merges: XLSX.Range[] = [];
  ws["!merges"] = merges;

  const headers = [
    "SITUATION AVANT DÉMARRAGE FORMATION",
    "CIVILITÉ",
    "NOM",
    "PRÉNOM",
    "DATE DE NAISSANCE",
    "PAYS DE NAISSANCE",
    "INSCRIT SOUS QUEL STATUT",
    "COMMUNE",
    "ADRESSE",
    "CODE POSTAL",
    "TÉLÉPHONE",
    "MAIL",
    "INTITULÉ DE LA FORMATION",
    "DIPLÔME VISÉ",
    "DATE DÉBUT DE FORMATION",
    "DATE DE FIN DE FORMATION",
    "COMMENTAIRE OBSERVATION",
  ];
  const lastCol = headers.length - 1;

  // Titre
  const annee = new Date().getFullYear();
  setCell(ws, "A1", `SUIVI DES INSCRIPTIONS ${annee}-${annee + 1} — ${(o.nom || "ORGANISME").toUpperCase()}`, styleTitle());
  merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: lastCol } });

  setCell(ws, "A2", `Formation : ${f.intitule || ""}`, styleSubtitle());
  merges.push({ s: { r: 1, c: 0 }, e: { r: 1, c: lastCol } });

  // En-têtes (ligne 4 / index 3)
  headers.forEach((h, i) => setCell(ws, XLSX.utils.encode_cell({ r: 3, c: i }), h, styleHeader()));

  // Lignes pré-remplies
  const now = new Date();
  let r = 4;
  stagiaires.slice(0, 30).forEach((s) => {
    const dateDebut = (s as any).dateDebutFormation || f.dateDebut || "";
    const dateFin = (s as any).dateFinFormation || f.dateFin || "";
    const debutDate = dateDebut ? new Date(dateDebut.split("/").reverse().join("-")) : null;
    const isPast = debutDate && !isNaN(debutDate.getTime()) && debutDate < now;
    const situation = isPast ? "En formation" : "Inscrit";

    const row = [
      situation,
      s.civilite || "",
      s.nom || "",
      s.prenom || "",
      frDate((s as any).dateNaissance),
      "France",
      "Apprenti",
      o.ville || "",
      "",
      o.codePostal || "",
      s.telephone || "",
      s.email || "",
      f.intitule || "",
      f.intitule || "",
      frDate(dateDebut),
      frDate(dateFin),
      isPast ? "Formation démarrée" : "",
    ];
    row.forEach((v, c) => setCell(ws, XLSX.utils.encode_cell({ r, c }), v, styleCell()));
    r++;
  });

  // Lignes vides pour saisie manuelle
  for (let i = 0; i < 15; i++) {
    headers.forEach((_, c) => setCell(ws, XLSX.utils.encode_cell({ r, c }), "", styleEmpty()));
    r++;
  }

  // Largeurs colonnes
  ws["!cols"] = [
    { wch: 32 }, { wch: 10 }, { wch: 18 }, { wch: 16 }, { wch: 14 },
    { wch: 14 }, { wch: 22 }, { wch: 16 }, { wch: 28 }, { wch: 10 },
    { wch: 14 }, { wch: 28 }, { wch: 32 }, { wch: 24 }, { wch: 14 },
    { wch: 14 }, { wch: 28 },
  ];

  // Hauteurs
  ws["!rows"] = [{ hpt: 26 }, { hpt: 18 }, { hpt: 8 }, { hpt: 36 }];

  ws["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: r - 1, c: lastCol } });
  return ws;
}

export function generateSuiviInscriptionsXlsxBlob(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
): Blob {
  const wb = XLSX.utils.book_new();
  const ws = buildSheet(o, f, stagiaires);
  XLSX.utils.book_append_sheet(wb, ws, "Inscriptions");

  const out = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  return new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
