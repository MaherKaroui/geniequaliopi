// Feuille de route Qualiopi CFA (Excel) — format Dreamers Team
// 7 colonnes : Critère · N° · Indicateur · Niveau attendu V9 · Ce qu'il faut dire ·
// Documents à présenter · Vigilance. Les 8 indicateurs CFA spécifiques (13,14,15,16,20,27,28,32)
// sont marqués en orange. Mention nouvel entrant / pondération incluse.

import * as XLSX from "xlsx";
import { OrganismeInfo, DocEntry } from "@/types/qualiopi";
import { INDICATEURS_CFA, CRITERES_CFA, getPonderationLabel } from "./qualiopiReferenceCFA";

const CFA_SPECIFIQUES = new Set([13, 14, 15, 16, 20, 27, 28, 32]);

function frDate(): string {
  return new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export function generateFeuilleRouteQualiopiCFA(
  org: OrganismeInfo,
  catalog: DocEntry[]
): Blob {
  const docsByInd = new Map<number, string[]>();
  catalog.forEach(d => {
    if (!docsByInd.has(d.indicateur)) docsByInd.set(d.indicateur, []);
    docsByInd.get(d.indicateur)!.push(d.nom);
  });

  const rows: (string | number)[][] = [];
  rows.push([`PRÉPARATION AUDIT QUALIOPI — CFA ${org.nom} — Audit initial (nouvel entrant) — ${frDate()}`]);
  rows.push([`Référentiel National Qualité V9 — 7 critères / 32 indicateurs. Nouvel entrant : indicateurs 2, 3, 11, 13, 14, 19, 22, 24, 25, 26 et 32 — seule la FORMALISATION du processus est vérifiée à l'audit initial.`]);
  rows.push([]);
  const header = ["Critère", "N°", "Indicateur", "Niveau attendu par l'auditeur (V9)", "✅ Ce qu'il faut DIRE", "📁 Documents à présenter", "⚠ Vigilance / Pondération"];
  rows.push(header);

  Object.entries(CRITERES_CFA).forEach(([cNum, cTitre]) => {
    rows.push([`Critère ${cNum} — ${cTitre}`]);
    const inds = INDICATEURS_CFA.filter(i => i.critere === parseInt(cNum));
    inds.forEach(ind => {
      const docsApp = docsByInd.get(ind.numero) || [];
      const allDocs = [
        ...ind.preuves.map(p => `• ${p}`),
        ...(docsApp.length ? ["", "Documents générés par l'application :", ...docsApp.map(d => `  ✓ ${d}`)] : []),
      ].join("\n");
      const vigilance = [getPonderationLabel(ind), ind.vigilance ? `\n⚠ ${ind.vigilance}` : ""].filter(Boolean).join("");
      rows.push([
        `Critère ${cNum}`,
        ind.numero,
        ind.titre,
        ind.niveauAttendu,
        `« ${ind.ceQuIlFautDire} »`,
        allDocs,
        vigilance,
      ]);
    });
  });

  rows.push([]);
  rows.push(["SYNTHÈSE COUVERTURE DOCUMENTAIRE"]);
  rows.push(["Critère", "Indicateurs", "Docs générés", "Couverture"]);
  Object.entries(CRITERES_CFA).forEach(([cNum, cTitre]) => {
    const inds = INDICATEURS_CFA.filter(i => i.critere === parseInt(cNum));
    const totalDocs = inds.reduce((s, i) => s + (docsByInd.get(i.numero)?.length || 0), 0);
    const covered = inds.filter(i => (docsByInd.get(i.numero)?.length || 0) > 0).length;
    rows.push([`Critère ${cNum} — ${cTitre}`, inds.length, totalDocs, `${covered}/${inds.length} indicateurs couverts`]);
  });
  rows.push(["TOTAL", INDICATEURS_CFA.length, catalog.length, `${INDICATEURS_CFA.filter(i => (docsByInd.get(i.numero)?.length || 0) > 0).length}/${INDICATEURS_CFA.length} indicateurs couverts`]);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!cols"] = [
    { wch: 18 }, { wch: 6 }, { wch: 38 }, { wch: 55 }, { wch: 55 }, { wch: 55 }, { wch: 30 },
  ];

  // Merges (titre + sous-titre + section headers)
  const merges: XLSX.Range[] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } },
  ];
  // Critère banners
  let r = 4; // header row is index 3, first banner row = 4
  Object.entries(CRITERES_CFA).forEach(([cNum]) => {
    merges.push({ s: { r, c: 0 }, e: { r, c: 6 } });
    const inds = INDICATEURS_CFA.filter(i => i.critere === parseInt(cNum));
    r += 1 + inds.length;
  });
  ws["!merges"] = merges;

  // Style cells
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
  for (let R = range.s.r; R <= range.e.r; R++) {
    const indRow = rows[R];
    const isTitle = R === 0;
    const isSubtitle = R === 1;
    const isHeader = R === 3;
    // Find if it's a critère banner
    const isCritBanner = typeof indRow?.[0] === "string" && (indRow[0] as string).startsWith("Critère ") && indRow.length === 1;
    // Check if row is a CFA-specific indicator
    const indNum = typeof indRow?.[1] === "number" ? (indRow[1] as number) : 0;
    const isCfaSpe = CFA_SPECIFIQUES.has(indNum);

    for (let C = range.s.c; C <= range.e.c; C++) {
      const addr = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = ws[addr];
      if (!cell) continue;
      let fill: any;
      let font: any = { sz: 11 };
      if (isTitle) { fill = { fgColor: { rgb: "0B2545" } }; font = { bold: true, sz: 14, color: { rgb: "FFFFFF" } }; }
      else if (isSubtitle) { fill = { fgColor: { rgb: "DBEAFE" } }; font = { italic: true, sz: 10 }; }
      else if (isHeader) { fill = { fgColor: { rgb: "1D4ED8" } }; font = { bold: true, sz: 11, color: { rgb: "FFFFFF" } }; }
      else if (isCritBanner) { fill = { fgColor: { rgb: "0B2545" } }; font = { bold: true, sz: 12, color: { rgb: "FFFFFF" } }; }
      else if (isCfaSpe) { fill = { fgColor: { rgb: "FED7AA" } }; }

      cell.s = {
        alignment: { wrapText: true, vertical: "top", horizontal: isTitle || isHeader || isCritBanner ? "center" : "left" },
        font,
        fill,
        border: {
          top: { style: "thin", color: { rgb: "CBD5E1" } },
          bottom: { style: "thin", color: { rgb: "CBD5E1" } },
          left: { style: "thin", color: { rgb: "CBD5E1" } },
          right: { style: "thin", color: { rgb: "CBD5E1" } },
        },
      };
    }
  }
  ws["!rows"] = [{ hpt: 28 }, { hpt: 36 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Prépa audit Qualiopi CFA");

  const out = XLSX.write(wb, { type: "array", bookType: "xlsx", cellStyles: true });
  return new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
