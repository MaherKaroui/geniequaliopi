// Convertit la sortie HTML multi-feuilles produite par xlsxGenerator/documentGenerator
// (avec balises Excel <x:ExcelWorkbook> et plusieurs <div id="sheetN"><table>...</table></div>)
// en un vrai fichier .xlsx via SheetJS (Blob téléchargeable).
//
// Utilisation : remplace `excelToBlob(html)` par `htmlToXlsxBlob(html)` partout où
// l'on souhaite générer un fichier .xlsx natif (au lieu d'un .xls HTML déguisé).

import * as XLSX from "xlsx";

interface SheetSpec {
  name: string;
  table: HTMLTableElement;
}

// Nettoie / tronque le nom de feuille pour respecter les contraintes Excel (≤ 31 chars, pas de caractères interdits)
function sanitizeSheetName(name: string, fallback: string): string {
  const cleaned = (name || fallback).replace(/[\\\/\?\*\[\]:]/g, " ").trim();
  return (cleaned || fallback).substring(0, 31);
}

// Extrait les noms de feuilles déclarés dans le bloc <x:ExcelWorkbook>
function extractSheetNamesFromXml(html: string): string[] {
  const names: string[] = [];
  const re = /<x:Name>([\s\S]*?)<\/x:Name>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    names.push(m[1].trim());
  }
  return names;
}

function parseHtmlToSheets(html: string): SheetSpec[] {
  const declaredNames = extractSheetNamesFromXml(html);

  // Parse le HTML hors-document via DOMParser
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // 1) Cherche les divs id="sheetN" (cas multi-feuilles produit par xlsxGenerator/documentGenerator)
  const sheetDivs = Array.from(doc.querySelectorAll('[id^="sheet"]')) as HTMLElement[];
  const sheets: SheetSpec[] = [];

  if (sheetDivs.length > 0) {
    sheetDivs.forEach((div, idx) => {
      const table = div.querySelector("table") as HTMLTableElement | null;
      if (table) {
        sheets.push({
          name: sanitizeSheetName(declaredNames[idx] || `Feuille ${idx + 1}`, `Feuille ${idx + 1}`),
          table,
        });
      }
    });
  }

  // 2) Fallback : prend toutes les <table> du document
  if (sheets.length === 0) {
    const tables = Array.from(doc.querySelectorAll("table")) as HTMLTableElement[];
    tables.forEach((table, idx) => {
      sheets.push({
        name: sanitizeSheetName(declaredNames[idx] || `Feuille ${idx + 1}`, `Feuille ${idx + 1}`),
        table,
      });
    });
  }

  // 3) Garde-fou final : au moins une feuille vide
  if (sheets.length === 0) {
    const empty = doc.createElement("table");
    const tr = doc.createElement("tr");
    const td = doc.createElement("td");
    td.textContent = "(aucune donnée)";
    tr.appendChild(td);
    empty.appendChild(tr);
    sheets.push({ name: "Feuille 1", table: empty });
  }

  return sheets;
}

/**
 * Typage des cellules lues en texte brut. Sans cela, SheetJS (raw: false) interprète « 22/09/2025 »
 * comme une date américaine (jour et mois inversés) et la convertit à minuit heure locale
 * (« 22:00 / 23:00 » la veille une fois relue en UTC). Ici :
 * - jj/mm/aaaa → vraie date Excel (numéro de série calculé en UTC, format jj/mm/aaaa) ;
 * - nombre simple (« 12 », « 4,5 ») → nombre ; tout le reste reste du texte.
 */
function typerCellules(ws: XLSX.WorkSheet) {
  const ref = ws["!ref"];
  if (!ref) return;
  const range = XLSX.utils.decode_range(ref);
  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
      if (!cell || cell.t !== "s" || typeof cell.v !== "string") continue;
      const t = cell.v.trim();
      const d = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (d) {
        const j = Number(d[1]), m = Number(d[2]), a = Number(d[3]);
        const utc = Date.UTC(a, m - 1, j);
        const verif = new Date(utc);
        if (verif.getUTCDate() === j && verif.getUTCMonth() === m - 1) {
          cell.t = "n";
          cell.v = Math.round((utc - Date.UTC(1899, 11, 30)) / 86400000);
          cell.z = "dd/mm/yyyy";
          delete cell.w;
        }
        continue;
      }
      if (/^-?\d{1,12}([.,]\d+)?$/.test(t) && !/^0\d/.test(t)) {
        cell.t = "n";
        cell.v = Number(t.replace(",", "."));
        delete cell.w;
      }
    }
  }
}

function applyAutoColumnWidths(ws: XLSX.WorkSheet) {
  const ref = ws["!ref"];
  if (!ref) return;
  const range = XLSX.utils.decode_range(ref);
  const colWidths: { wch: number }[] = [];
  for (let C = range.s.c; C <= range.e.c; C++) {
    let max = 10;
    for (let R = range.s.r; R <= range.e.r; R++) {
      const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
      if (cell && cell.v != null) {
        const text = cell.z === "dd/mm/yyyy" ? "00/00/0000" : String(cell.v);
        // approx largeur : longueur de la plus longue ligne
        const longest = text.split(/\r?\n/).reduce((m, l) => Math.max(m, l.length), 0);
        if (longest > max) max = longest;
      }
    }
    colWidths.push({ wch: Math.min(60, max + 2) });
  }
  ws["!cols"] = colWidths;
}

/**
 * Convertit la sortie HTML multi-feuilles en un Blob .xlsx réel.
 * - Préserve les noms de feuilles déclarés dans <x:ExcelWorkbook>
 * - Conserve les fusions (colspan/rowspan) grâce à `table_to_sheet`
 * - Calcule des largeurs de colonnes automatiques pour la lisibilité
 */
export function htmlToXlsxBlob(html: string): Blob {
  const sheets = parseHtmlToSheets(html);
  const wb = XLSX.utils.book_new();
  const usedNames = new Set<string>();

  sheets.forEach((spec, idx) => {
    // raw: true → aucune conversion automatique (dates US, fuseau) ; typage explicite ensuite.
    const ws = XLSX.utils.table_to_sheet(spec.table, { raw: true });
    typerCellules(ws);

    // Nettoie les fusions qui dépassent le range réel des données
    // (sinon Excel refuse d'ouvrir le fichier comme corrompu)
    const ref = ws["!ref"];
    if (ref && ws["!merges"]) {
      const range = XLSX.utils.decode_range(ref);
      ws["!merges"] = ws["!merges"].filter((m) =>
        m.s.r >= range.s.r && m.e.r <= range.e.r &&
        m.s.c >= range.s.c && m.e.c <= range.e.c
      );
    }

    applyAutoColumnWidths(ws);

    // Garantit un nom unique
    let name = spec.name || `Feuille ${idx + 1}`;
    let suffix = 1;
    while (usedNames.has(name.toLowerCase())) {
      const base = (spec.name || `Feuille ${idx + 1}`).substring(0, 28);
      name = `${base} ${++suffix}`;
    }
    usedNames.add(name.toLowerCase());

    XLSX.utils.book_append_sheet(wb, ws, name);
  });

  const out = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  return new Blob([out], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}
