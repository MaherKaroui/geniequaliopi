// Rapport d'audit Qualiopi — réplique le modèle officiel auditeur (ex : Charlotte Allexandre)
// Génère un .xlsx avec : Page de garde, Changements, Multisites, Marque Qualiopi,
// Évaluation des 32 indicateurs (1 onglet par critère), Conclusion / NC.
// Pré-rempli depuis sessionStorage (organisme, formation, stagiaires) + findings audit IA.

import * as XLSX from "xlsx";
import { INDICATEURS_REFERENCE, CRITERES_TITLES } from "./qualiopiReference";

export type AuditTypeLive = "AF" | "BC" | "VAE" | "CFA";

interface Finding {
  severity: "critical" | "major" | "minor" | "info";
  categorie: string;
  critere: number;
  indicateur: number;
  zone: string;
  constat: string;
  impact: string;
  action: string;
}

interface RapportInput {
  org: any;
  form: any;
  stag: any[];
  type: AuditTypeLive;
  findings?: Finding[];
  scoreGlobal?: number;
  synthese?: string;
}

const TYPE_LABEL: Record<AuditTypeLive, { label: string; cell: number }> = {
  AF: { label: "Actions de Formation (L. 6313-1-1°)", cell: 0 },
  BC: { label: "Bilans de compétences (L. 6313-1-2°)", cell: 1 },
  VAE: { label: "VAE (L. 6313-1-3°)", cell: 2 },
  CFA: { label: "Actions de formation par apprentissage (L. 6313-1-4°)", cell: 3 },
};

const TYPE_TO_REF: Record<AuditTypeLive, string> = { AF: "OF", BC: "CBC", VAE: "VAE", CFA: "CFA" };

const fr = (d?: string) => {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const num = (s?: any) => {
  if (s === undefined || s === null) return 0;
  const m = String(s).replace(/\s|\u00A0/g, "").replace(",", ".").match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
};

function styleCell(ws: XLSX.WorkSheet, addr: string, style: any) {
  const c = ws[addr];
  if (!c) return;
  c.s = { ...(c.s || {}), ...style };
}

const BORDER = {
  top: { style: "thin", color: { rgb: "94A3B8" } },
  bottom: { style: "thin", color: { rgb: "94A3B8" } },
  left: { style: "thin", color: { rgb: "94A3B8" } },
  right: { style: "thin", color: { rgb: "94A3B8" } },
};

const STY_TITLE = { font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "0B2545" } }, alignment: { horizontal: "center", vertical: "center", wrapText: true }, border: BORDER };
const STY_BANNER = { font: { bold: true, sz: 12, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "1D4ED8" } }, alignment: { horizontal: "left", vertical: "center", wrapText: true }, border: BORDER };
const STY_HEADER = { font: { bold: true, sz: 11, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "1D4ED8" } }, alignment: { horizontal: "center", vertical: "center", wrapText: true }, border: BORDER };
const STY_LABEL = { font: { bold: true, sz: 10 }, fill: { fgColor: { rgb: "DBEAFE" } }, alignment: { vertical: "center", wrapText: true }, border: BORDER };
const STY_CELL = { font: { sz: 10 }, alignment: { vertical: "top", wrapText: true }, border: BORDER };
const STY_OK = { font: { sz: 10, bold: true, color: { rgb: "065F46" } }, fill: { fgColor: { rgb: "D1FAE5" } }, alignment: { horizontal: "center", vertical: "center" }, border: BORDER };
const STY_NC = { font: { sz: 10, bold: true, color: { rgb: "991B1B" } }, fill: { fgColor: { rgb: "FECACA" } }, alignment: { horizontal: "center", vertical: "center" }, border: BORDER };
const STY_NA = { font: { sz: 10, italic: true, color: { rgb: "475569" } }, fill: { fgColor: { rgb: "F1F5F9" } }, alignment: { horizontal: "center", vertical: "center" }, border: BORDER };

function applyRangeStyle(ws: XLSX.WorkSheet, r1: number, c1: number, r2: number, c2: number, style: any) {
  for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) {
    const a = XLSX.utils.encode_cell({ r, c });
    if (!ws[a]) ws[a] = { t: "s", v: "" };
    styleCell(ws, a, style);
  }
}

// ============= Page de garde =============
function buildGarde(input: RapportInput): XLSX.WorkSheet {
  const { org, form, stag, type } = input;
  const today = fr(new Date().toISOString());
  const aoa: any[][] = [];
  aoa.push(["", "", "", "RAPPORT D'AUDIT", "", "", "Version", "10.5 du 04/10/2024", ""]);
  aoa.push(["", "", "", "", "", "Catégories d'activités demandées et évaluées", "", "", ""]);
  aoa.push(["", "", "", "", "", "", "", "", ""]);
  const tline = (lbl: string, key: AuditTypeLive) => type === key ? "X" : "";
  aoa.push(["ORGANISME", org?.nom || "", "", "", "", tline("AF", "AF"), TYPE_LABEL.AF.label, "", ""]);
  aoa.push(["Nom commercial", org?.nomCommercial || "", "", "", "", tline("BC", "BC"), TYPE_LABEL.BC.label, "", ""]);
  aoa.push(["Adresse du siège", `${org?.adresse || ""} ${org?.codePostal || ""} ${org?.ville || ""}`.trim(), "", "", "", tline("VAE", "VAE"), TYPE_LABEL.VAE.label, "", ""]);
  aoa.push(["NDA", org?.nda || "", "Reçu le", "", "", tline("CFA", "CFA"), TYPE_LABEL.CFA.label, "", ""]);
  aoa.push(["SIRET", org?.siret || "", "", "", "", "", "", "", ""]);
  aoa.push(["Site internet", org?.siteWeb || "", "", "", "Validité du certificat", "", "", "", ""]);
  aoa.push([]);
  aoa.push(["Type d'organisme", "Monosite", "", "Si MULTISITES Nombre de sites du contrat ?", "", "", "", "", ""]);
  aoa.push([]);
  aoa.push(["NATURE DE L'AUDIT", "", "", "", "", "", "", "", ""]);
  aoa.push(["Type d'audit", "Audit de surveillance", "", "", "", "Documents collectés", "", "", ""]);
  aoa.push(["Dates d'audit", today, "", "", "", "Organigramme", "OUI", "", ""]);
  aoa.push(["Durée", "1 jour", "", "Justifier la durée si nécessaire", "", "BPF N-1", "OUI", "", ""]);
  aoa.push(["Lieu si différent du siège", `${org?.adresse || ""} ${org?.codePostal || ""} ${org?.ville || ""}`.trim(), "", "", "", "Fiche de présence signée", "OUI", "", ""]);
  aoa.push(["Réalisé en", "Présentiel", "", "", "", "Dossier stagiaire géré à son terme", "OUI", "", ""]);
  aoa.push(["Nouvel entrant ?", "NON", "", "", "", "", "", "", ""]);
  aoa.push([]);
  aoa.push(["Équipe d'audit", "Charlotte Allexandre", "", "Responsable d'audit", "", "", "", "", ""]);
  aoa.push(["Rapport rédigé le", today, "", "", "", "", "", "", ""]);
  aoa.push([]);
  aoa.push(["Personnes auditées", "", "", "", "", "", "", "", ""]);
  aoa.push(["Nom", "Fonction", "", "Téléphone", "Email", "", "Présent", "Externe/Interne", ""]);
  aoa.push([org?.dirigeant || "", "Dirigeant", "", org?.telephone || "", org?.email || "", "", "OUI", "Interne", ""]);
  if (org?.referentQualite) aoa.push([org.referentQualite, "Référent Qualité", "", "", "", "", "OUI", "Interne", ""]);
  if (org?.referentHandicap && org.referentHandicap !== org?.referentQualite) aoa.push([org.referentHandicap, "Référent Handicap", "", "", "", "", "OUI", "Interne", ""]);
  if (org?.responsablePedagogique && org.responsablePedagogique !== org?.dirigeant) aoa.push([org.responsablePedagogique, "Responsable pédagogique", "", "", "", "", "OUI", "Interne", ""]);
  aoa.push([]);
  // CA
  const caStag = (stag || []).reduce((s, x) => s + num(x?.tarifFormation), 0);
  const caForm = num(form?.tarif) * (num(form?.nombreParticipants) || (stag?.length || 1));
  const ca = caStag > 0 ? caStag : caForm;
  aoa.push(["CA total de l'organisme", ca, "", "Documents ayant permis de valider le CA", "", "BPF " + new Date().getFullYear(), "", "", ""]);
  aoa.push(["Historique, gouvernance, organisation", "", "", "", "", "", "", "", ""]);
  aoa.push(["Activités principales", org?.domainesFormation || form?.intitule || "", "", "", "", "", "", "", ""]);
  aoa.push(["Clients et partenaires", "Particuliers / Entreprises / OPCO", "", "", "", "", "", "", ""]);
  aoa.push(["Produits Formation professionnelle", form?.intitule || "", "", "", "", "", "", "", ""]);
  aoa.push(["Projets, perspectives", "Développement portefeuille", "", "", "", "", "", "", ""]);
  aoa.push([]);
  aoa.push(["Typologie des formations", "Formations non-certifiantes", form?.codeRNCP ? "NON" : "OUI", "Formations certifiantes", form?.codeRNCP ? "OUI" : "NON", "RNCP", /RNCP/i.test(form?.codeRNCP || "") ? "OUI" : "NON", "RS", /^RS/i.test(form?.codeRNCP || "") ? "OUI" : "NON"]);
  aoa.push(["", "Formations courtes", num(form?.duree) < 100 ? "OUI" : "NON", "Formations longues", num(form?.duree) >= 100 ? "OUI" : "NON", "Alternance", type === "CFA" ? "OUI" : "NON", "Distanciel", /distanc/i.test(form?.modalites || "") ? "OUI" : "NON"]);
  aoa.push([]);
  aoa.push(["Nombre de salariés", "0", "", "", "", "", "", "", ""]);
  aoa.push(["Formateurs internes", "1", "", "", "", "", "", "", ""]);
  if (form?.formateur) aoa.push([form.formateur, "Formateur", "", "", "", "", "", "", ""]);
  aoa.push([]);
  aoa.push(["", "", "Nbe", "CA", "", "", "", "", ""]);
  aoa.push(["Nombre de stagiaires", "CPF", (stag || []).filter((s: any) => /cpf|edof/i.test(s?.financement || "")).length, "", "", "", "", "", ""]);
  aoa.push(["", "OPCO", (stag || []).filter((s: any) => /opco/i.test(s?.financement || "")).length, ca, "", "", "", "", ""]);
  aoa.push(["", "AUTRES", (stag || []).length - (stag || []).filter((s: any) => /cpf|edof|opco/i.test(s?.financement || "")).length, "", "", "", "", "", ""]);
  aoa.push([]);
  aoa.push(["OBJECTIFS DE L'AUDIT", "", "", "", "", "", "", "", ""]);
  aoa.push(["L'audit porte sur toutes les exigences du Référentiel National Qualité (Décret N°2019-565, Arrêté du 6 juin 2019 modifié, Arrêté du 31 mai 2023, Guide de lecture V9). L'audit est réalisé par échantillonnage en examinant les dossiers faisant suite à l'audit initial afin de vérifier la conformité d'application des dispositions Qualiopi.", "", "", "", "", "", "", "", ""]);

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws["!cols"] = [{ wch: 28 }, { wch: 22 }, { wch: 14 }, { wch: 24 }, { wch: 14 }, { wch: 18 }, { wch: 22 }, { wch: 14 }, { wch: 8 }];
  ws["!merges"] = [
    { s: { r: 0, c: 3 }, e: { r: 0, c: 5 } },
    { s: { r: 1, c: 5 }, e: { r: 1, c: 8 } },
    { s: { r: 11, c: 0 }, e: { r: 11, c: 8 } },
    { s: { r: 20, c: 0 }, e: { r: 20, c: 8 } },
    { s: { r: 22, c: 0 }, e: { r: 22, c: 8 } },
    { s: { r: aoa.length - 2, c: 0 }, e: { r: aoa.length - 2, c: 8 } },
    { s: { r: aoa.length - 1, c: 0 }, e: { r: aoa.length - 1, c: 8 } },
  ];
  // Apply styles
  applyRangeStyle(ws, 0, 0, aoa.length - 1, 8, STY_CELL);
  applyRangeStyle(ws, 0, 3, 0, 5, STY_TITLE);
  applyRangeStyle(ws, 11, 0, 11, 8, STY_BANNER);
  applyRangeStyle(ws, 20, 0, 20, 8, STY_BANNER);
  applyRangeStyle(ws, 22, 0, 22, 8, STY_BANNER);
  applyRangeStyle(ws, aoa.length - 2, 0, aoa.length - 2, 8, STY_BANNER);
  // Labels colonne A
  [3, 4, 5, 6, 7, 8, 10, 12, 13, 14, 15, 16, 17, 19, 21, 23, 28, 29, 30, 31, 32, 34, 35, 36, 38, 39, 40, 41, 42].forEach(r => styleCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), STY_LABEL));
  ws["!rows"] = aoa.map(() => ({ hpt: 22 }));
  ws["!rows"]![0] = { hpt: 30 };
  return ws;
}

// ============= Changements =============
function buildChangements(orgNom: string): XLSX.WorkSheet {
  const aoa: any[][] = [
    ["Nom de l'organisme", orgNom, ""],
    ["Constat sur les changements (à remplir en cas de changement majeur)", "", ""],
    ["Changements", "Constat", "Description"],
    ["Gérance de l'organisme", "NON", ""],
    ["Adresse du siège social, lieux de formation", "NON", ""],
    ["Site supplémentaire non déclaré", "NON", ""],
    ["Activité de l'organisme", "NON", ""],
    ["Ressources", "NON", ""],
    ["Autres", "NON", ""],
  ];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws["!cols"] = [{ wch: 48 }, { wch: 16 }, { wch: 60 }];
  ws["!merges"] = [{ s: { r: 1, c: 0 }, e: { r: 1, c: 2 } }];
  applyRangeStyle(ws, 0, 0, aoa.length - 1, 2, STY_CELL);
  applyRangeStyle(ws, 1, 0, 1, 2, STY_BANNER);
  applyRangeStyle(ws, 2, 0, 2, 2, STY_HEADER);
  for (let r = 3; r <= 8; r++) styleCell(ws, XLSX.utils.encode_cell({ r, c: 1 }), STY_NA);
  return ws;
}

// ============= Marque Qualiopi =============
function buildMarqueQualiopi(): XLSX.WorkSheet {
  const aoa: any[][] = [
    ["Revue de l'utilisation de la marque Qualiopi", "", ""],
    ["EXIGENCES", "Libellé NC et/ou commentaires", "Constat"],
    ["Le logo Qualiopi n'est pas utilisé dans sa version la plus récente", "Logo utilisé dans la dernière version", "Conforme"],
    ["Le logo Qualiopi respecte les catégories d'actions pour lesquelles le prestataire est certifié", "OK", "Conforme"],
    ["Le logo Qualiopi n'a pas été modifié (couleur, police, taille, cartouche blanc)", "OK", "Conforme"],
    ["Le logo Qualiopi apparaît sur les documents relatifs aux actions de formation (convention, attestation, programme…)", "Logo présent", "Conforme"],
    ["Le certificat Qualiopi est affiché dans les locaux et/ou sur le site internet", "Le certificat est envoyé au stagiaire par mail / publié sur site", "Conforme"],
  ];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws["!cols"] = [{ wch: 60 }, { wch: 50 }, { wch: 16 }];
  ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }];
  applyRangeStyle(ws, 0, 0, aoa.length - 1, 2, STY_CELL);
  applyRangeStyle(ws, 0, 0, 0, 2, STY_BANNER);
  applyRangeStyle(ws, 1, 0, 1, 2, STY_HEADER);
  for (let r = 2; r <= aoa.length - 1; r++) styleCell(ws, XLSX.utils.encode_cell({ r, c: 2 }), STY_OK);
  return ws;
}

// ============= Évaluation indicateurs (1 onglet par critère) =============
function buildCritere(cNum: number, cTitre: string, input: RapportInput): XLSX.WorkSheet {
  const refCode = TYPE_TO_REF[input.type];
  const inds = INDICATEURS_REFERENCE.filter(i => i.critere === cNum && i.applicableActions.includes(refCode));
  const findingsByInd = new Map<number, Finding[]>();
  (input.findings || []).forEach(f => {
    if (!findingsByInd.has(f.indicateur)) findingsByInd.set(f.indicateur, []);
    findingsByInd.get(f.indicateur)!.push(f);
  });

  const aoa: any[][] = [];
  aoa.push([`Critère ${cNum} — ${cTitre}`, "", "", "", "", ""]);
  aoa.push(["N°", "Indicateur", "Niveau attendu (V9)", "Constat", "Preuves examinées", "Statut"]);
  inds.forEach(ind => {
    const fs = findingsByInd.get(ind.numero) || [];
    const hasCrit = fs.some(f => f.severity === "critical");
    const hasMaj = fs.some(f => f.severity === "major");
    const statut = hasCrit ? "NC MAJEURE" : hasMaj ? "NC MINEURE" : fs.length ? "REMARQUE" : "CONFORME";
    const constat = fs.length
      ? fs.map(f => `• ${f.constat}${f.action ? `\n  → ${f.action}` : ""}`).join("\n")
      : "Indicateur vérifié, processus formalisé et mis en œuvre conformément au niveau attendu V9.";
    const preuves = (ind.questionsPreuves || []).slice(0, 4).map(p => `• ${p}`).join("\n") || "—";
    aoa.push([ind.numero, ind.intitule, ind.niveauAttendu, constat, preuves, statut]);
  });

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws["!cols"] = [{ wch: 6 }, { wch: 38 }, { wch: 42 }, { wch: 48 }, { wch: 42 }, { wch: 16 }];
  ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];
  applyRangeStyle(ws, 0, 0, aoa.length - 1, 5, STY_CELL);
  applyRangeStyle(ws, 0, 0, 0, 5, STY_BANNER);
  applyRangeStyle(ws, 1, 0, 1, 5, STY_HEADER);
  // Statut coloring
  for (let r = 2; r < aoa.length; r++) {
    const v = String(aoa[r][5] || "");
    const st = v.includes("MAJEURE") ? STY_NC : v.includes("MINEURE") ? { ...STY_NC, fill: { fgColor: { rgb: "FED7AA" } }, font: { sz: 10, bold: true, color: { rgb: "9A3412" } } } : v === "CONFORME" ? STY_OK : STY_NA;
    styleCell(ws, XLSX.utils.encode_cell({ r, c: 5 }), st);
  }
  ws["!rows"] = aoa.map((_, i) => ({ hpt: i === 0 || i === 1 ? 24 : 60 }));
  return ws;
}

// ============= Conclusion =============
function buildConclusion(input: RapportInput): XLSX.WorkSheet {
  const ncMaj = (input.findings || []).filter(f => f.severity === "critical").length;
  const ncMin = (input.findings || []).filter(f => f.severity === "major").length;
  const rem = (input.findings || []).filter(f => f.severity === "minor").length;
  const decision = ncMaj === 0 ? (ncMin === 0 ? "Certification accordée sans réserve" : "Certification accordée sous réserve de levée des NC mineures sous 3 mois") : "Certification suspendue — NC majeure à lever sous 3 mois";

  const aoa: any[][] = [];
  aoa.push(["CONCLUSION DE L'AUDIT", "", ""]);
  aoa.push(["Organisme", input.org?.nom || "", ""]);
  aoa.push(["Type d'audit", "Audit de surveillance", ""]);
  aoa.push(["Date", fr(new Date().toISOString()), ""]);
  aoa.push([]);
  aoa.push(["Synthèse globale", input.synthese || "Le système qualité est opérationnel. Les processus sont formalisés, déployés et tracés.", ""]);
  aoa.push(["Score global auditeur", `${input.scoreGlobal ?? 90}%`, ""]);
  aoa.push([]);
  aoa.push(["Bilan des écarts", "", ""]);
  aoa.push(["Non-conformités majeures", ncMaj, ""]);
  aoa.push(["Non-conformités mineures", ncMin, ""]);
  aoa.push(["Remarques / pistes de progrès", rem, ""]);
  aoa.push([]);
  aoa.push(["DÉCISION", decision, ""]);
  aoa.push([]);
  aoa.push(["Détail des écarts relevés", "", ""]);
  aoa.push(["Sévérité", "Critère / Indicateur", "Constat & action corrective"]);
  (input.findings || []).slice().sort((a, b) => {
    const o = { critical: 0, major: 1, minor: 2, info: 3 } as const;
    return o[a.severity] - o[b.severity];
  }).forEach(f => {
    const sev = f.severity === "critical" ? "NC MAJEURE" : f.severity === "major" ? "NC MINEURE" : f.severity === "minor" ? "REMARQUE" : "INFO";
    aoa.push([sev, `C${f.critere} · IND ${f.indicateur}`, `${f.constat}\n→ ${f.action}`]);
  });

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws["!cols"] = [{ wch: 26 }, { wch: 36 }, { wch: 80 }];
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
    { s: { r: 8, c: 0 }, e: { r: 8, c: 2 } },
    { s: { r: 13, c: 0 }, e: { r: 13, c: 2 } },
  ];
  applyRangeStyle(ws, 0, 0, aoa.length - 1, 2, STY_CELL);
  applyRangeStyle(ws, 0, 0, 0, 2, STY_TITLE);
  applyRangeStyle(ws, 8, 0, 8, 2, STY_BANNER);
  applyRangeStyle(ws, 13, 0, 13, 2, STY_BANNER);
  applyRangeStyle(ws, 15, 0, 15, 2, STY_HEADER);
  styleCell(ws, "B13", { ...STY_TITLE, fill: { fgColor: { rgb: ncMaj ? "991B1B" : ncMin ? "B45309" : "065F46" } } });
  // Color severity column
  for (let r = 16; r < aoa.length; r++) {
    const v = String(aoa[r][0] || "");
    const st = v === "NC MAJEURE" ? STY_NC : v === "NC MINEURE" ? { ...STY_NC, fill: { fgColor: { rgb: "FED7AA" } }, font: { sz: 10, bold: true, color: { rgb: "9A3412" } } } : STY_NA;
    styleCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), st);
  }
  return ws;
}

export function generateRapportAudit(input: RapportInput): Blob {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, buildGarde(input), "Page de garde");
  XLSX.utils.book_append_sheet(wb, buildChangements(input.org?.nom || ""), "Changements");
  XLSX.utils.book_append_sheet(wb, buildMarqueQualiopi(), "Marque Qualiopi");
  const refCode = TYPE_TO_REF[input.type];
  Object.entries(CRITERES_TITLES).forEach(([cNum, cTitre]) => {
    const inds = INDICATEURS_REFERENCE.filter(i => i.critere === parseInt(cNum) && i.applicableActions.includes(refCode));
    if (inds.length) XLSX.utils.book_append_sheet(wb, buildCritere(parseInt(cNum), cTitre, input), `Critère ${cNum}`);
  });
  XLSX.utils.book_append_sheet(wb, buildConclusion(input), "Conclusion");
  const out = XLSX.write(wb, { type: "array", bookType: "xlsx", cellStyles: true });
  return new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
