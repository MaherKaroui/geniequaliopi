// Feuille de route Qualiopi CFA (Excel) — format Dreamers Team
// 7 colonnes : Critère · N° · Indicateur · Niveau attendu V9 · Ce qu'il faut dire ·
// Documents à présenter · Vigilance. Les 8 indicateurs CFA spécifiques (13,14,15,16,20,27,28,32)
// sont marqués en orange. Mention nouvel entrant / pondération incluse.

import * as XLSX from "xlsx";
import { OrganismeInfo, FormationInfo, StagiaireInfo, DocEntry } from "@/types/qualiopi";
import { INDICATEURS_CFA, CRITERES_CFA, getPonderationLabel, TypeAuditCFA, getTypeAuditLabel } from "./qualiopiReferenceCFA";

const CFA_SPECIFIQUES = new Set([13, 14, 15, 20, 29, 33]);

function frDate(d?: string): string {
  const dt = d ? new Date(d) : new Date();
  return dt.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export function generateFeuilleRouteQualiopiCFA(
  org: OrganismeInfo,
  catalog: DocEntry[],
  formations: FormationInfo[] = [],
  stagiaires: StagiaireInfo[] = [],
  typeAudit: TypeAuditCFA = 'initial'
): Blob {
  const isNE = typeAudit === 'initial';
  const docsByInd = new Map<number, string[]>();
  catalog.forEach(d => {
    if (!docsByInd.has(d.indicateur)) docsByInd.set(d.indicateur, []);
    docsByInd.get(d.indicateur)!.push(d.nom);
  });

  const rows: (string | number)[][] = [];
  rows.push([`PRÉPARATION AUDIT QUALIOPI — CFA ${org.nom} — ${getTypeAuditLabel(typeAudit)} — ${frDate()}`]);
  rows.push([isNE
    ? `Référentiel national qualité (décret n° 2026-728, en vigueur au 01/11/2026) — 7 critères / 33 indicateurs — guide de lecture V9. Nouvel entrant : indicateurs ${INDICATEURS_CFA.filter(i => i.nouvelEntrant).map(i => i.numero).join(", ").replace(/, (\d+)$/, " et $1")} — seule la FORMALISATION du processus est vérifiée à l'audit initial.`
    : `Référentiel national qualité (décret n° 2026-728, en vigueur au 01/11/2026) — 7 critères / 33 indicateurs — guide de lecture V9. ${getTypeAuditLabel(typeAudit)} : vérification de la MISE EN ŒUVRE effective sur tous les indicateurs.`]);
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
      const vigilance = [getPonderationLabel(ind, isNE), ind.vigilance ? `\n⚠ ${ind.vigilance}` : ""].filter(Boolean).join("");
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

  // Sheet "Contexte" — OF / Formations / Apprenants
  const ctx: (string | number)[][] = [];
  ctx.push([`CONTEXTE AUDITÉ — ${getTypeAuditLabel(typeAudit)}`]);
  ctx.push([]);
  ctx.push(["ORGANISME DE FORMATION"]);
  ctx.push(["Nom", org.nom]);
  ctx.push(["SIRET", org.siret]);
  ctx.push(["NDA", org.nda]);
  ctx.push(["Adresse", `${org.adresse || ""} ${org.codePostal || ""} ${org.ville || ""}`.trim()]);
  if (org.telephone) ctx.push(["Téléphone", org.telephone]);
  if (org.email) ctx.push(["Email", org.email]);
  if (org.siteWeb) ctx.push(["Site web", org.siteWeb]);
  ctx.push(["Dirigeant", org.dirigeant || "—"]);
  ctx.push(["Responsable pédagogique", org.responsablePedagogique || "—"]);
  ctx.push(["Référent handicap", org.referentHandicap || "—"]);
  ctx.push(["Référent qualité", org.referentQualite || "—"]);
  ctx.push(["Domaines de formation", org.domainesFormation || "—"]);
  ctx.push(["Types d'actions", (org.typesActions || []).join(", ") || "—"]);
  ctx.push(["Certifications", org.certifications || "—"]);
  ctx.push([]);
  ctx.push([`FORMATION(S) AUDITÉE(S) — ${formations.length}`]);
  ctx.push(["Intitulé", "Code RNCP", "Durée", "Modalités", "Date début", "Date fin", "Lieu", "Formateur", "Tarif", "Rythme alternance"]);
  formations.forEach(f => ctx.push([
    f.intitule || "—", f.codeRNCP || "—", f.duree || "—", f.modalites || "—",
    frDate(f.dateDebut), frDate(f.dateFin), f.lieu || "—", f.formateur || "—", f.tarif || "—", f.rythmeAlternance || "—"
  ]));
  ctx.push([]);
  ctx.push([`APPRENANT(S) — ${stagiaires.length}`]);
  ctx.push(["Civilité", "Nom", "Prénom", "Email", "Téléphone", "Entreprise", "Date début", "Date fin", "RQTH", "N° action"]);
  stagiaires.forEach(s => ctx.push([
    s.civilite || "", s.nom || "", s.prenom || "", s.email || "", s.telephone || "",
    s.entreprise || "—", frDate(s.dateDebutFormation), frDate(s.dateFinFormation),
    s.rqth === "oui" ? "Oui" : "Non", s.numeroAction || "—"
  ]));
  const wsCtx = XLSX.utils.aoa_to_sheet(ctx);
  wsCtx["!cols"] = [{ wch: 24 }, { wch: 22 }, { wch: 18 }, { wch: 22 }, { wch: 18 }, { wch: 22 }, { wch: 22 }, { wch: 22 }, { wch: 16 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsCtx, "Contexte");

  XLSX.utils.book_append_sheet(wb, ws, "Prépa audit Qualiopi CFA");

  const out = XLSX.write(wb, { type: "array", bookType: "xlsx", cellStyles: true });
  return new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
