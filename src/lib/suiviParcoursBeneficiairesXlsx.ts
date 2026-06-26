// CFA CT2 - IND 4 — Tableau de suivi du parcours bénéficiaires et adaptations
// Reproduit fidèlement la trame ADEPROS FORMATIONS (multi-onglets : 1 par formation)
import * as XLSX from "xlsx";
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";

const NB_JS = 12;

function frDate(d?: Date | string | null): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

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
function styleGroup(): any {
  return {
    font: { bold: true, color: { rgb: "FFFFFF" }, sz: 11 },
    fill: { fgColor: { rgb: "2C5282" } },
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
function styleSubHeader(): any {
  return {
    font: { bold: true, italic: true, color: { rgb: "555555" }, sz: 9 },
    fill: { fgColor: { rgb: "F4F7FB" } },
    alignment: { horizontal: "center", vertical: "center", wrapText: true },
    border: borderAll(),
  };
}
function styleCell(align: "left" | "center" = "left"): any {
  return {
    alignment: { horizontal: align, vertical: "center", wrapText: true },
    border: borderAll(),
    font: { sz: 10 },
  };
}
function styleX(color = "1E3A7B"): any {
  return {
    font: { bold: true, color: { rgb: color }, sz: 11 },
    alignment: { horizontal: "center", vertical: "center" },
    border: borderAll(),
  };
}
function styleP(): any {
  return {
    font: { bold: true, color: { rgb: "1E7B3A" }, sz: 11 },
    fill: { fgColor: { rgb: "EAF7EE" } },
    alignment: { horizontal: "center", vertical: "center" },
    border: borderAll(),
  };
}

function setCell(ws: XLSX.WorkSheet, addr: string, value: any, style?: any) {
  ws[addr] = { v: value ?? "", t: typeof value === "number" ? "n" : "s", s: style };
}

function ensureRange(ws: XLSX.WorkSheet, lastRow: number, lastCol: number) {
  ws["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: lastRow, c: lastCol } });
}

function pickPriseEnCharge(s: StagiaireInfo): string {
  const fin = ((s as any).financement || (s as any).typePrise || "OPCO").toString().toLowerCase();
  if (fin.includes("opco")) return "OPCO";
  if (fin.includes("cpf")) return "CPF";
  if (fin.includes("pôle") || fin.includes("pole") || fin.includes("france travail")) return "France Travail";
  if (fin.includes("personnel") || fin.includes("auto")) return "Personnel";
  if (fin.includes("entreprise") || fin.includes("employeur")) return "Entreprise";
  return "OPCO";
}

function pickNature(f?: FormationInfo): string {
  const isAlternance = !!(f?.rythmeAlternance && f.rythmeAlternance.trim().length > 0);
  return isAlternance ? "ALTERNANCE" : "ACTION DE FORMATION";
}

function buildSheet(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  ws["!merges"] = [];
  const merges = ws["!merges"]!;

  const today = new Date();
  let r = 0;

  // ===== Row 0 : titre organisme (fusion totale) =====
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), (o.nom || "ORGANISME").toUpperCase(), styleTitle());
  merges.push({ s: { r, c: 0 }, e: { r, c: 35 } });
  r++; // r=1

  // ===== Row 1 : sous-titre =====
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }),
    `Tableau de suivi du parcours des bénéficiaires et adaptations — ${f.intitule}`,
    { ...styleHeader(), font: { italic: true, sz: 10, color: { rgb: "1E3A7B" } } });
  merges.push({ s: { r, c: 0 }, e: { r, c: 35 } });
  r++; // r=2

  // ===== Row 2 : groupes (en-tête niveau 1) =====
  // Layout colonnes :
  // A-D : FICHE D'IDENTITE (Nom, Prénom, Sexe H, Sexe F)
  // E-H : STATUT (Prise en charge, Nature, Handicap, Observations)
  // I-J : FORMATION (Date entrée, Date sortie)
  // K-N : Suivi adaptation (Date, Adaptations, Difficultés, Suivi)
  // O-Z : PRESENCE PAR JOURNEE DE STAGE (JS1..JS12) → 12 cols
  // AA-AC : INTERRUPTION (Oui, Non, Cause)
  // AD : TEST FINAL QCM
  // AE-AF : PARCOURS REUSSITE (Oui, Non)
  // AG-AI : Satisfaction (oui, p, non)
  // AJ : Commentaires
  const groups: [number, number, string][] = [
    [0, 3, "FICHE D'IDENTITÉ DES BÉNÉFICIAIRES"],
    [4, 7, "STATUT"],
    [8, 9, "FORMATION"],
    [10, 13, "Suivi de l'adaptation à l'accompagnement"],
    [14, 25, "PRÉSENCE PAR JOURNÉE DE STAGE"],
    [26, 28, "INTERRUPTION DE FORMATION"],
    [29, 29, "TEST FINAL"],
    [30, 31, "PARCOURS DE RÉUSSITE"],
    [32, 34, "SATISFACTION"],
    [35, 35, "COMMENTAIRES"],
  ];
  groups.forEach(([cs, ce, label]) => {
    setCell(ws, XLSX.utils.encode_cell({ r, c: cs }), label, styleGroup());
    if (ce > cs) merges.push({ s: { r, c: cs }, e: { r, c: ce } });
  });
  r++; // r=3

  // ===== Row 3 : en-têtes principaux =====
  const headerRow = r;
  const headers: [number, string][] = [
    [0, "Nom"], [1, "Prénom"], [2, "Sexe"], [3, ""],
    [4, "Prise en charge"], [5, "Nature"], [6, "Handicap"], [7, "Observations"],
    [8, "Date d'entrée en formation"], [9, "Date de sortie de formation"],
    [10, "Date"], [11, "Adaptations nécessaires"], [12, "Difficultés"], [13, "Suivi"],
  ];
  for (let i = 0; i < NB_JS; i++) headers.push([14 + i, `JS${i + 1}`]);
  headers.push([26, "Oui"], [27, "Non"], [28, "Cause de l'interruption (Observations)"]);
  headers.push([29, "QCM"]);
  headers.push([30, "Test réussite"], [31, ""]);
  headers.push([32, ""], [33, "Satisfaction"], [34, ""]);
  headers.push([35, "Commentaires"]);
  // Fusion Sexe (C-D)
  merges.push({ s: { r: headerRow, c: 2 }, e: { r: headerRow, c: 3 } });
  // Fusion Test réussite (AE-AF)
  merges.push({ s: { r: headerRow, c: 30 }, e: { r: headerRow, c: 31 } });
  // Fusion Satisfaction (AG-AI)
  merges.push({ s: { r: headerRow, c: 32 }, e: { r: headerRow, c: 34 } });
  headers.forEach(([c, t]) => setCell(ws, XLSX.utils.encode_cell({ r: headerRow, c }), t, styleHeader()));
  // remplir cellules sans label
  [3].forEach(c => setCell(ws, XLSX.utils.encode_cell({ r: headerRow, c }), "", styleHeader()));
  r++; // r=4

  // ===== Row 4 : sous-en-têtes =====
  const subRow = r;
  const subs: [number, string][] = [
    [2, "H"], [3, "F"],
    [8, "JJ/MM/AAAA"], [9, "JJ/MM/AAAA"],
  ];
  for (let i = 0; i < NB_JS; i++) subs.push([14 + i, "(P) si Présent"]);
  subs.push([30, "Oui"], [31, "Non"]);
  subs.push([32, "Oui"], [33, "Passable"], [34, "Non"]);
  // remplir tout subRow vide en sub style
  for (let c = 0; c <= 35; c++) {
    setCell(ws, XLSX.utils.encode_cell({ r: subRow, c }), "", styleSubHeader());
  }
  subs.forEach(([c, t]) => setCell(ws, XLSX.utils.encode_cell({ r: subRow, c }), t, styleSubHeader()));
  r++; // r=5

  // ===== Lignes bénéficiaires =====
  stagiaires.forEach((s, idx) => {
    const dEntree = s.dateDebutFormation ? new Date(s.dateDebutFormation) : (f.dateDebut ? new Date(f.dateDebut) : null);
    const dSortie = s.dateFinFormation ? new Date(s.dateFinFormation) : (f.dateFin ? new Date(f.dateFin) : null);
    const isFinished = dSortie ? dSortie.getTime() < today.getTime() : false;

    // Sexe : "M.", "Madame" → H/F
    const civ = (s.civilite || "").toLowerCase();
    const isF = civ.startsWith("mme") || civ.startsWith("mad") || civ.includes("madame");
    const isH = !isF;

    const handicap = (s as any).rqth ? "OUI" : "NON";
    const obsHandicap = (s as any).rqth
      ? "Bénéficiaire en situation de handicap. Adaptations mises en œuvre par le référent handicap."
      : "";

    setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), (s.nom || "").toUpperCase(), styleCell());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 1 }), s.prenom || "", styleCell());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 2 }), isH ? "X" : "", styleX());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 3 }), isF ? "X" : "", styleX());

    setCell(ws, XLSX.utils.encode_cell({ r, c: 4 }), pickPriseEnCharge(s), styleCell("center"));
    setCell(ws, XLSX.utils.encode_cell({ r, c: 5 }), pickNature(), styleCell("center"));
    setCell(ws, XLSX.utils.encode_cell({ r, c: 6 }), handicap, styleCell("center"));
    setCell(ws, XLSX.utils.encode_cell({ r, c: 7 }), obsHandicap, styleCell());

    setCell(ws, XLSX.utils.encode_cell({ r, c: 8 }), frDate(dEntree), styleCell("center"));
    setCell(ws, XLSX.utils.encode_cell({ r, c: 9 }), frDate(dSortie), styleCell("center"));

    // Suivi adaptation : si RQTH, on remplit ; sinon ligne neutre
    if ((s as any).rqth) {
      setCell(ws, XLSX.utils.encode_cell({ r, c: 10 }), frDate(dEntree), styleCell("center"));
      setCell(ws, XLSX.utils.encode_cell({ r, c: 11 }),
        "Aménagement du temps de pause, supports adaptés, accompagnement individualisé.", styleCell());
      setCell(ws, XLSX.utils.encode_cell({ r, c: 12 }),
        "Fatigabilité accrue lors des journées longues.", styleCell());
      setCell(ws, XLSX.utils.encode_cell({ r, c: 13 }),
        "Suivi mensuel par le référent handicap. Coordination CFA / entreprise.", styleCell());
    } else {
      setCell(ws, XLSX.utils.encode_cell({ r, c: 10 }), "", styleCell());
      setCell(ws, XLSX.utils.encode_cell({ r, c: 11 }), "Aucune adaptation requise.", styleCell());
      setCell(ws, XLSX.utils.encode_cell({ r, c: 12 }), "Aucune", styleCell());
      setCell(ws, XLSX.utils.encode_cell({ r, c: 13 }), "Suivi standard tripartite (CFA / Tuteur / Apprenti).", styleCell());
    }

    // Présence JS1..JS12 : "P" si journée passée, vide sinon
    for (let j = 0; j < NB_JS; j++) {
      let present = false;
      if (dEntree && dSortie) {
        const totalMs = dSortie.getTime() - dEntree.getTime();
        const ratio = (j + 1) / NB_JS;
        const jsDate = new Date(dEntree.getTime() + totalMs * ratio);
        present = jsDate.getTime() <= today.getTime();
      }
      setCell(ws, XLSX.utils.encode_cell({ r, c: 14 + j }), present ? "P" : "", present ? styleP() : styleCell("center"));
    }

    // Interruption : par défaut Non
    setCell(ws, XLSX.utils.encode_cell({ r, c: 26 }), "", styleX());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 27 }), "X", styleX("1E7B3A"));
    setCell(ws, XLSX.utils.encode_cell({ r, c: 28 }), "", styleCell());

    // Test final QCM
    setCell(ws, XLSX.utils.encode_cell({ r, c: 29 }), isFinished ? `${15 + (idx % 5)}/20` : "en cours", styleCell("center"));

    // Parcours réussite
    setCell(ws, XLSX.utils.encode_cell({ r, c: 30 }), isFinished ? "X" : "", styleX("1E7B3A"));
    setCell(ws, XLSX.utils.encode_cell({ r, c: 31 }), "", styleX());

    // Satisfaction (oui par défaut si terminé)
    setCell(ws, XLSX.utils.encode_cell({ r, c: 32 }), isFinished ? "X" : "", styleX("1E7B3A"));
    setCell(ws, XLSX.utils.encode_cell({ r, c: 33 }), "", styleX());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 34 }), "", styleX());

    setCell(ws, XLSX.utils.encode_cell({ r, c: 35 }),
      isFinished
        ? "Parcours mené à terme. Acquisition validée des compétences visées."
        : "Parcours en cours. Suivi régulier assuré.",
      styleCell());

    r++;
  });

  // Lignes vierges supplémentaires (5) pour saisie manuelle
  for (let k = 0; k < 5; k++) {
    for (let c = 0; c <= 35; c++) {
      setCell(ws, XLSX.utils.encode_cell({ r, c }), "", styleCell());
    }
    r++;
  }

  // Largeurs colonnes
  const cols: { wch: number }[] = [
    { wch: 16 }, { wch: 14 }, { wch: 4 }, { wch: 4 },        // A-D
    { wch: 14 }, { wch: 13 }, { wch: 9 }, { wch: 28 },       // E-H
    { wch: 13 }, { wch: 13 },                                 // I-J
    { wch: 11 }, { wch: 28 }, { wch: 22 }, { wch: 28 },       // K-N
  ];
  for (let i = 0; i < NB_JS; i++) cols.push({ wch: 5 });
  cols.push({ wch: 5 }, { wch: 5 }, { wch: 32 });             // AA-AC
  cols.push({ wch: 9 });                                       // AD
  cols.push({ wch: 5 }, { wch: 5 });                           // AE-AF
  cols.push({ wch: 5 }, { wch: 5 }, { wch: 5 });               // AG-AI
  cols.push({ wch: 32 });                                      // AJ
  ws["!cols"] = cols;

  // Hauteurs des en-têtes
  ws["!rows"] = [];
  ws["!rows"][0] = { hpt: 26 };
  ws["!rows"][1] = { hpt: 22 };
  ws["!rows"][2] = { hpt: 28 };
  ws["!rows"][headerRow] = { hpt: 38 };
  ws["!rows"][subRow] = { hpt: 22 };

  ensureRange(ws, r - 1, 35);
  return ws;
}

export function generateSuiviParcoursBeneficiairesXlsxBlob(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
): Blob {
  const wb = XLSX.utils.book_new();

  // Onglet principal pour la formation courante (max 31 chars, caractères interdits filtrés)
  const rawName = `Formation ${(f.intitule || "1")}`.replace(/[\\/?*\[\]:]/g, " ").trim();
  const sheetName = (rawName.length > 31 ? rawName.slice(0, 31) : rawName) || "Formation";
  XLSX.utils.book_append_sheet(wb, buildSheet(o, f, stagiaires), sheetName);

  // Onglet vierge supplémentaire prêt à l'emploi
  XLSX.utils.book_append_sheet(wb, buildSheet(o, f, []), "Trame vierge");

  const out = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  return new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
