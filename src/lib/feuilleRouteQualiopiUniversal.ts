// Feuille de route Qualiopi AF / BDC / VAE (Excel) — même format que la version CFA
// 7 colonnes : Critère · N° · Indicateur · Niveau attendu V9 · Ce qu'il faut dire ·
// Documents à présenter · Vigilance. Indicateurs spécifiques au type d'action marqués en orange.

import { isStagiaireFormationTerminee } from "./docBuilder";
import { typeAuditEffectif, attenduSelonAudit, LIBELLES_AUDIT, type TypeAudit } from "./typeAudit";
import * as XLSX from "xlsx";
import { OrganismeInfo, FormationInfo, StagiaireInfo, DocEntry } from "@/types/qualiopi";
import { INDICATEURS_REFERENCE, CRITERES_TITLES } from "./qualiopiReference";
import {
  TypeActionAudit,
  TYPE_ACTION_LABELS,
  scriptParIndicateur,
  preuvesParIndicateur,
  pointVigilance,
} from "./guideAuditUniversal";

const ACTION_TO_REF_CODE: Record<TypeActionAudit, string> = {
  AF: "OF", CFA: "CFA", BDC: "CBC", VAE: "VAE",
};

const ACTION_BENEFICIAIRE: Record<TypeActionAudit, string> = {
  AF: "Stagiaire", CFA: "Apprenti", BDC: "Bénéficiaire", VAE: "Candidat",
};

function frDate(d?: string): string {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "—";
  return dt.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export function generateFeuilleRouteQualiopiUniversal(
  org: OrganismeInfo,
  catalog: DocEntry[],
  formations: FormationInfo[] = [],
  stagiaires: StagiaireInfo[] = [],
  type: TypeActionAudit = "AF",
  typeAudit: TypeAudit = typeAuditEffectif(org)
): Blob {
  const refCode = ACTION_TO_REF_CODE[type];
  const label = TYPE_ACTION_LABELS[type];
  const ben = ACTION_BENEFICIAIRE[type];

  const indicateurs = INDICATEURS_REFERENCE.filter((i) => i.applicableActions.includes(refCode));
  const specifiques = new Set(indicateurs.filter((i) => i.type === "specifique").map((i) => i.numero));

  const docsByInd = new Map<number, string[]>();
  catalog.forEach((d) => {
    if (!docsByInd.has(d.indicateur)) docsByInd.set(d.indicateur, []);
    docsByInd.get(d.indicateur)!.push(d.nom);
  });

  const rows: (string | number)[][] = [];
  rows.push([`PRÉPARATION AUDIT QUALIOPI — ${label} — ${org.nom} — ${LIBELLES_AUDIT[typeAudit]} — ${frDate(new Date().toISOString())}`]);
  rows.push([`Référentiel national qualité (décret n° 2026-728, guide de lecture V9) — 7 critères / ${indicateurs.length} indicateurs applicables au périmètre « ${label} ». Indicateurs spécifiques surlignés en orange.`]);
  if (typeAudit !== "initial" && !stagiaires.some((s) => (s.nom || "").trim() && isStagiaireFormationTerminee(s, formations[0] || ({} as FormationInfo)))) {
    rows.push([`⚠ ${LIBELLES_AUDIT[typeAudit]} : aucun ${ben.toLowerCase()} du dossier n'a terminé son parcours — l'auditeur attend des preuves de mise en œuvre sur la période. Ajouter les sessions réalisées avant l'audit.`]);
  }
  rows.push([]);
  const header = ["Critère", "N°", "Indicateur", "Niveau attendu par l'auditeur (V9)", "✅ Ce qu'il faut DIRE", "📁 Documents à présenter", "⚠ Vigilance / Type"];
  rows.push(header);

  // Pour les merges des bannières de critère, on retient l'index de chaque ligne bannière
  const bannerRows: number[] = [];
  const critEntries = Object.entries(CRITERES_TITLES).filter(([cNum]) =>
    indicateurs.some((i) => i.critere === parseInt(cNum))
  );

  critEntries.forEach(([cNum, cTitre]) => {
    bannerRows.push(rows.length);
    rows.push([`Critère ${cNum} — ${cTitre}`]);
    const inds = indicateurs.filter((i) => i.critere === parseInt(cNum));
    inds.forEach((ind) => {
      const docsApp = docsByInd.get(ind.numero) || [];
      const preuves = preuvesParIndicateur(ind.numero, type, ind.questionsPreuves);
      const allDocs = [
        ...preuves.map((p) => `• ${p}`),
        ...(docsApp.length ? ["", "Documents générés par l'application :", ...docsApp.map((d) => `  ✓ ${d}`)] : []),
      ].join("\n");
      const script = scriptParIndicateur(ind.numero, type, ind.niveauAttendu);
      const vig = pointVigilance(ind.numero, type);
      const typeLbl = ind.type === "specifique" ? `Spécifique ${refCode}` : "Commun";
      const vigilance = [typeLbl, vig ? `\n⚠ ${vig}` : ""].filter(Boolean).join("");
      rows.push([
        `Critère ${cNum}`,
        ind.numero,
        ind.intitule,
        `${ind.niveauAttendu}

${attenduSelonAudit(typeAudit, ind.numero)}`,
        `« ${script} »`,
        allDocs,
        vigilance,
      ]);
    });
  });

  // Synthèse couverture
  rows.push([]);
  const synthHeaderRow = rows.length;
  rows.push(["SYNTHÈSE COUVERTURE DOCUMENTAIRE"]);
  rows.push(["Critère", "Indicateurs", "Docs générés", "Couverture"]);
  critEntries.forEach(([cNum, cTitre]) => {
    const inds = indicateurs.filter((i) => i.critere === parseInt(cNum));
    const totalDocs = inds.reduce((s, i) => s + (docsByInd.get(i.numero)?.length || 0), 0);
    const covered = inds.filter((i) => (docsByInd.get(i.numero)?.length || 0) > 0).length;
    rows.push([`Critère ${cNum} — ${cTitre}`, inds.length, totalDocs, `${covered}/${inds.length} indicateurs couverts`]);
  });
  const totalCovered = indicateurs.filter((i) => (docsByInd.get(i.numero)?.length || 0) > 0).length;
  rows.push(["TOTAL", indicateurs.length, catalog.length, `${totalCovered}/${indicateurs.length} indicateurs couverts`]);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!cols"] = [
    { wch: 18 }, { wch: 6 }, { wch: 50 }, { wch: 50 }, { wch: 55 }, { wch: 55 }, { wch: 30 },
  ];

  const merges: XLSX.Range[] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } },
    { s: { r: synthHeaderRow, c: 0 }, e: { r: synthHeaderRow, c: 6 } },
  ];
  bannerRows.forEach((r) => merges.push({ s: { r, c: 0 }, e: { r, c: 6 } }));
  ws["!merges"] = merges;

  // Styles
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
  for (let R = range.s.r; R <= range.e.r; R++) {
    const row = rows[R];
    const isTitle = R === 0;
    const isSubtitle = R === 1;
    const isHeader = R === 3;
    const isBanner = bannerRows.includes(R);
    const isSynthBanner = R === synthHeaderRow;
    const indNum = typeof row?.[1] === "number" ? (row[1] as number) : 0;
    const isSpec = specifiques.has(indNum);

    for (let C = range.s.c; C <= range.e.c; C++) {
      const addr = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = ws[addr];
      if (!cell) continue;
      let fill: any;
      let font: any = { sz: 11 };
      if (isTitle) { fill = { fgColor: { rgb: "0B2545" } }; font = { bold: true, sz: 14, color: { rgb: "FFFFFF" } }; }
      else if (isSubtitle) { fill = { fgColor: { rgb: "DBEAFE" } }; font = { italic: true, sz: 10 }; }
      else if (isHeader) { fill = { fgColor: { rgb: "1D4ED8" } }; font = { bold: true, sz: 11, color: { rgb: "FFFFFF" } }; }
      else if (isBanner || isSynthBanner) { fill = { fgColor: { rgb: "0B2545" } }; font = { bold: true, sz: 12, color: { rgb: "FFFFFF" } }; }
      else if (isSpec) { fill = { fgColor: { rgb: "FED7AA" } }; }

      cell.s = {
        alignment: { wrapText: true, vertical: "top", horizontal: isTitle || isHeader || isBanner || isSynthBanner ? "center" : "left" },
        font, fill,
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

  // Onglet Contexte
  const ctx: (string | number)[][] = [];
  ctx.push([`CONTEXTE AUDITÉ — ${label}`]);
  ctx.push([]);
  ctx.push(["ORGANISME"]);
  ctx.push(["Nom", org.nom || "—"]);
  ctx.push(["SIRET", org.siret || "—"]);
  ctx.push(["NDA", org.nda || "—"]);
  ctx.push(["Adresse", `${org.adresse || ""} ${org.codePostal || ""} ${org.ville || ""}`.trim() || "—"]);
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
  ctx.push(["Version SMQ", `${org.version || "—"} · MAJ ${frDate(org.dateMaj)}`]);
  ctx.push([]);
  ctx.push([`PRESTATION(S) AUDITÉE(S) — ${formations.length}`]);
  ctx.push(["Intitulé", "Code RNCP/RS", "Public visé", "Durée", "Modalités", "Date début", "Date fin", "Lieu", "Formateur", "Tarif"]);
  formations.forEach((f) => ctx.push([
    f.intitule || "—", f.codeRNCP || "—", f.publicVise || "—", f.duree || "—", f.modalites || "—",
    frDate(f.dateDebut), frDate(f.dateFin), f.lieu || "—", f.formateur || "—", f.tarif || "—",
  ]));
  ctx.push([]);
  ctx.push([`${ben.toUpperCase()}(S) — ${stagiaires.length}`]);
  ctx.push(["Civilité", "Nom", "Prénom", "Email", "Téléphone", "Entreprise", "Date début", "Date fin", "RQTH", "Tarif"]);
  stagiaires.forEach((s) => ctx.push([
    s.civilite || "", s.nom || "", s.prenom || "", s.email || "", s.telephone || "",
    s.entreprise || "—", frDate(s.dateDebutFormation), frDate(s.dateFinFormation),
    s.rqth === "oui" ? "Oui" : "Non", s.tarifFormation || "—",
  ]));

  // KPIs
  const parseNum = (s?: string): number => {
    if (!s) return 0;
    const m = String(s).replace(/\s|\u00A0/g, "").replace(",", ".").match(/(\d+(?:\.\d+)?)/);
    return m ? parseFloat(m[1]) : 0;
  };
  const caStag = stagiaires.reduce((sum, s) => sum + parseNum(s.tarifFormation), 0);
  let caForm = 0;
  formations.forEach((f) => { caForm += parseNum(f.tarif) * (parseNum(f.nombreParticipants) || 1); });
  const caTotal = caStag > 0 ? caStag : caForm;
  const totalH = formations.reduce((s, f) => s + parseNum(f.duree), 0);
  const psh = stagiaires.filter((s) => s.rqth === "oui").length;
  ctx.push([]);
  ctx.push(["INDICATEURS CLÉS"]);
  ctx.push(["Chiffre d'affaires audité (€)", caTotal || "—"]);
  ctx.push(["Volume horaire total (h)", totalH || "—"]);
  ctx.push([`${ben}s — total`, stagiaires.length]);
  ctx.push([`${ben}s RQTH`, psh]);
  ctx.push(["Documents produits par l'application", catalog.length]);
  ctx.push(["Indicateurs couverts", `${totalCovered}/${indicateurs.length}`]);
  ctx.push(["Taux de couverture", indicateurs.length ? `${Math.round((totalCovered / indicateurs.length) * 100)} %` : "—"]);

  const wsCtx = XLSX.utils.aoa_to_sheet(ctx);
  wsCtx["!cols"] = [{ wch: 28 }, { wch: 22 }, { wch: 22 }, { wch: 22 }, { wch: 18 }, { wch: 22 }, { wch: 22 }, { wch: 22 }, { wch: 16 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsCtx, "Contexte");

  XLSX.utils.book_append_sheet(wb, ws, `Prépa audit ${type}`);

  const out = XLSX.write(wb, { type: "array", bookType: "xlsx", cellStyles: true });
  return new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
