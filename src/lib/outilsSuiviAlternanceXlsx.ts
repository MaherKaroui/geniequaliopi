// Real .xlsx generator (SheetJS) for CT3 - IND 13 Outils de suivi alternance
// Mirrors the official OPCO/CFA template (PERFORMER SCHOOL example)
import * as XLSX from "xlsx";
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { getRNCPByCode } from "./rncpData";
import { EVAL_SCORES } from "./sampleData";

const NIVEAUX_COMP = ["Acquise", "En voie d'acquisition", "Non acquise", "Non observée"] as const;
const NIVEAUX_TRANSV = ["Très bien", "Bien", "Passable", "Insuffisant"] as const;
const COMPETENCES_TRANSVERSES = [
  "Respect des règles",
  "Respect des horaires",
  "Assiduité",
  "Respect et application des consignes",
  "Sens de l'organisation",
  "Adaptation et intégration dans l'équipe",
];

function frDate(d: Date): string {
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function pickNiveauComp(score: number): typeof NIVEAUX_COMP[number] {
  if (score >= 8) return "Acquise";
  if (score >= 6) return "En voie d'acquisition";
  if (score >= 4) return "Non acquise";
  return "Non observée";
}
function pickNiveauTransv(score: number): typeof NIVEAUX_TRANSV[number] {
  if (score >= 8) return "Très bien";
  if (score >= 6) return "Bien";
  if (score >= 4) return "Passable";
  return "Insuffisant";
}

type AOA = (string | number | null)[][];

function styleHeaderCell(): any {
  return {
    font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
    fill: { fgColor: { rgb: "1E3A7B" } },
    alignment: { horizontal: "center", vertical: "center", wrapText: true },
    border: borderAll(),
  };
}
function styleSubHeader(): any {
  return {
    font: { bold: true, color: { rgb: "1E3A7B" } },
    fill: { fgColor: { rgb: "E8F0FE" } },
    alignment: { horizontal: "center", vertical: "center", wrapText: true },
    border: borderAll(),
  };
}
function styleCell(wrap = true): any {
  return {
    alignment: { vertical: "top", wrapText: wrap },
    border: borderAll(),
    font: { sz: 10 },
  };
}
function styleLabel(): any {
  return {
    font: { bold: true, sz: 10 },
    fill: { fgColor: { rgb: "E8F0FE" } },
    alignment: { vertical: "center", wrapText: true },
    border: borderAll(),
  };
}
function styleCheck(checked: boolean, color: string): any {
  return {
    font: { bold: true, sz: 12, color: { rgb: checked ? "1E3A7B" : "999999" } },
    fill: checked ? { fgColor: { rgb: color } } : { fgColor: { rgb: "FFFFFF" } },
    alignment: { horizontal: "center", vertical: "center" },
    border: borderAll(),
  };
}
function borderAll() {
  const b = { style: "thin", color: { rgb: "888888" } };
  return { top: b, bottom: b, left: b, right: b };
}

function setCell(ws: XLSX.WorkSheet, addr: string, value: any, style?: any) {
  ws[addr] = { v: value, t: typeof value === "number" ? "n" : "s", s: style };
}

function ensureRange(ws: XLSX.WorkSheet, lastRow: number, lastCol: number) {
  ws["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: lastRow, c: lastCol } });
}

function buildInfoSheet(
  o: OrganismeInfo, f: FormationInfo, s0: StagiaireInfo | undefined,
  apprentiNom: string, tuteurNom: string, entrepriseNom: string,
  dDebut: Date, dFin: Date, isPast: boolean,
): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  let r = 0;
  // Title
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), "INFORMATIONS GÉNÉRALES", styleHeaderCell());
  ws["!merges"] = ws["!merges"] || [];
  ws["!merges"].push({ s: { r, c: 0 }, e: { r, c: 1 } });
  r++;
  // Intro
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }),
    "Document à compléter à la fin de chaque période (école ou entreprise) et à remettre à l'apprenti(e) et à l'organisme de formation.",
    { ...styleCell(), font: { italic: true, sz: 10 }, fill: { fgColor: { rgb: "F7F9FC" } } });
  ws["!merges"].push({ s: { r, c: 0 }, e: { r, c: 1 } });
  r += 2;

  const rows: [string, string][] = [
    ["Nom de l'apprenti(e)", apprentiNom],
    ["Nom de l'entreprise", entrepriseNom],
    ["Nom du tuteur", tuteurNom],
    ["Poste occupé", s0?.poste || ""],
    ["Service", (s0 as any)?.service || ""],
    ["Nom de l'organisme de formation", o.nom],
    ["Référent pédagogique", o.responsablePedagogique || ""],
    ["Certification / Titre visé", `${f.intitule}${f.codeRNCP ? ` (${f.codeRNCP})` : ""}`],
    ["Type de contrat", "Contrat d'apprentissage"],
    ["Date de début du contrat", frDate(dDebut)],
    ["Date de fin du contrat", frDate(dFin)],
    ["Motif de fin de contrat", isPast ? "Fin du parcours de formation" : ""],
    ["Remarques particulières", isPast ? "Parcours mené à terme dans de bonnes conditions." : ""],
  ];
  rows.forEach(([k, v]) => {
    setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), k, styleLabel());
    setCell(ws, XLSX.utils.encode_cell({ r, c: 1 }), v, styleCell());
    r++;
  });

  ws["!cols"] = [{ wch: 38 }, { wch: 60 }];
  ws["!rows"] = Array.from({ length: r }, () => ({ hpt: 22 }));
  ensureRange(ws, r - 1, 1);
  return ws;
}

function buildBilanSheet(
  titre: string,
  dateBilan: string,
  isDone: boolean,
  competencesMetier: string[],
  scores: number[],
  apprentiNom: string,
  tuteurNom: string,
  organismeNom: string,
): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {};
  ws["!merges"] = [];
  let r = 0;

  // Title row (merge 0..5)
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), titre, styleHeaderCell());
  ws["!merges"].push({ s: { r, c: 0 }, e: { r, c: 5 } });
  r++;

  // Date row
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), `DATE : ${dateBilan || "_____________"}`,
    { ...styleCell(), font: { bold: true }, fill: { fgColor: { rgb: "F7F9FC" } } });
  ws["!merges"].push({ s: { r, c: 0 }, e: { r, c: 5 } });
  r++;

  // Sub intro
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }),
    "Entretien tripartite : Tuteur entreprise — Organisme de formation — Apprenti(e)",
    { ...styleCell(), font: { italic: true, sz: 10 }, fill: { fgColor: { rgb: "F7F9FC" } } });
  ws["!merges"].push({ s: { r, c: 0 }, e: { r, c: 5 } });
  r += 2;

  // Section: Compétences métier
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), "COMPÉTENCES LIÉES AU MÉTIER",
    { ...styleHeaderCell(), fill: { fgColor: { rgb: "2C5282" } } });
  ws["!merges"].push({ s: { r, c: 0 }, e: { r, c: 5 } });
  r++;

  // Header row
  ["Compétence", "Acquise", "En voie d'acquisition", "Non acquise", "Non observée", "Commentaires"].forEach((h, c) => {
    setCell(ws, XLSX.utils.encode_cell({ r, c }), h, styleSubHeader());
  });
  r++;

  competencesMetier.forEach((comp, i) => {
    const niveau = isDone ? pickNiveauComp(scores[i % scores.length] ?? 7) : null;
    const isMark = (n: typeof NIVEAUX_COMP[number]) => isDone && niveau === n;
    const colors = ["D4F4DD", "FFF7D4", "FDE2E2", "EEEEEE"];
    const commentaire = isDone
      ? (niveau === "Acquise" ? "Compétence maîtrisée en situation professionnelle."
        : niveau === "En voie d'acquisition" ? "Progression satisfaisante, à consolider."
        : niveau === "Non acquise" ? "À retravailler lors des prochaines périodes."
        : "Pas encore mise en pratique sur la période.")
      : "";
    setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), comp, styleCell());
    NIVEAUX_COMP.forEach((n, idx) => {
      setCell(ws, XLSX.utils.encode_cell({ r, c: 1 + idx }), isMark(n) ? "X" : "", styleCheck(isMark(n), colors[idx]));
    });
    setCell(ws, XLSX.utils.encode_cell({ r, c: 5 }), commentaire, styleCell());
    r++;
  });

  // Spacer
  r++;

  // Section: transverses
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), "COMPÉTENCES TRANSVERSES",
    { ...styleHeaderCell(), fill: { fgColor: { rgb: "2C5282" } } });
  ws["!merges"].push({ s: { r, c: 0 }, e: { r, c: 5 } });
  r++;

  ["Critère", "Très bien", "Bien", "Passable", "Insuffisant", "Commentaires"].forEach((h, c) => {
    setCell(ws, XLSX.utils.encode_cell({ r, c }), h, styleSubHeader());
  });
  r++;

  COMPETENCES_TRANSVERSES.forEach((crit, i) => {
    const niveau = isDone ? pickNiveauTransv((scores[i % scores.length] ?? 7) + 1) : null;
    const isMark = (n: typeof NIVEAUX_TRANSV[number]) => isDone && niveau === n;
    const colors = ["D4F4DD", "E0F0D4", "FFF7D4", "FDE2E2"];
    const commentaire = isDone
      ? (niveau === "Très bien" || niveau === "Bien" ? "Comportement professionnel conforme aux attentes." : "À améliorer.")
      : "";
    setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), crit, styleCell());
    NIVEAUX_TRANSV.forEach((n, idx) => {
      setCell(ws, XLSX.utils.encode_cell({ r, c: 1 + idx }), isMark(n) ? "X" : "", styleCheck(isMark(n), colors[idx]));
    });
    setCell(ws, XLSX.utils.encode_cell({ r, c: 5 }), commentaire, styleCell());
    r++;
  });

  // Spacer
  r++;

  // Synthèse
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), "SYNTHÈSE & AXES DE PROGRÈS",
    { ...styleHeaderCell(), fill: { fgColor: { rgb: "2C5282" } } });
  ws["!merges"].push({ s: { r, c: 0 }, e: { r, c: 5 } });
  r++;

  const synthese = isDone
    ? "L'apprenti(e) progresse de manière satisfaisante sur l'ensemble des compétences attendues. La coordination entre l'entreprise et l'organisme de formation est effective. Poursuivre la mise en situation sur les compétences en voie d'acquisition."
    : "";
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), `Synthèse :\n${synthese}`, styleCell());
  ws["!merges"].push({ s: { r, c: 0 }, e: { r, c: 5 } });
  ws["!rows"] = ws["!rows"] || [];
  ws["!rows"][r] = { hpt: 60 };
  r++;

  const axes = isDone
    ? "Axes de progrès :\n• Renforcer l'autonomie sur les tâches complexes\n• Poursuivre la mise en pratique des compétences techniques\n• Maintenir l'implication et la régularité"
    : "Axes de progrès :";
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), axes, styleCell());
  ws["!merges"].push({ s: { r, c: 0 }, e: { r, c: 5 } });
  ws["!rows"][r] = { hpt: 70 };
  r++;

  // Spacer
  r++;

  // Signatures header
  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), `Signature Apprenti(e)\n${apprentiNom}`, styleSubHeader());
  ws["!merges"].push({ s: { r, c: 0 }, e: { r, c: 1 } });
  setCell(ws, XLSX.utils.encode_cell({ r, c: 2 }), `Signature Tuteur entreprise\n${tuteurNom}`, styleSubHeader());
  ws["!merges"].push({ s: { r, c: 2 }, e: { r, c: 3 } });
  setCell(ws, XLSX.utils.encode_cell({ r, c: 4 }), `Signature Organisme de formation\n${organismeNom}`, styleSubHeader());
  ws["!merges"].push({ s: { r, c: 4 }, e: { r, c: 5 } });
  ws["!rows"][r] = { hpt: 35 };
  r++;

  setCell(ws, XLSX.utils.encode_cell({ r, c: 0 }), `Date : ${isDone ? dateBilan : ""}`, styleCell());
  ws["!merges"].push({ s: { r, c: 0 }, e: { r, c: 1 } });
  setCell(ws, XLSX.utils.encode_cell({ r, c: 2 }), `Date : ${isDone ? dateBilan : ""}`, styleCell());
  ws["!merges"].push({ s: { r, c: 2 }, e: { r, c: 3 } });
  setCell(ws, XLSX.utils.encode_cell({ r, c: 4 }), `Date : ${isDone ? dateBilan : ""}`, styleCell());
  ws["!merges"].push({ s: { r, c: 4 }, e: { r, c: 5 } });
  ws["!rows"][r] = { hpt: 50 };
  r++;

  ws["!cols"] = [
    { wch: 45 }, { wch: 14 }, { wch: 22 }, { wch: 14 }, { wch: 16 }, { wch: 35 },
  ];
  ensureRange(ws, r - 1, 5);
  return ws;
}

export function generateOutilsSuiviAlternanceXlsxBlob(
  o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[],
): Blob {
  const now = new Date();
  const s0 = stagiaires[0];
  const apprentiNom = s0 ? `${s0.prenom} ${s0.nom}` : "";
  const tuteurNom = (s0 as any)?.tuteur || o.responsablePedagogique || "Tuteur entreprise";
  const entrepriseNom = s0?.entreprise || "";
  const rncp = getRNCPByCode(f.codeRNCP || "");
  const sc0 = EVAL_SCORES[0] || [8, 7, 8, 7, 8, 7, 8];

  const competencesMetier = rncp && rncp.blocsCompetences.length > 0
    ? rncp.blocsCompetences.slice(0, 7).map(b => b.titre)
    : ["Bloc de compétences 1", "Bloc de compétences 2", "Bloc de compétences 3", "Bloc de compétences 4"];

  const dDebut = s0?.dateDebutFormation ? new Date(s0.dateDebutFormation) : new Date(f.dateDebut);
  const dFin = s0?.dateFinFormation ? new Date(s0.dateFinFormation) : new Date(f.dateFin);
  const totalMs = dFin.getTime() - dDebut.getTime();

  const dateEssai = new Date(dDebut.getTime() + 45 * 86400000);
  const dateB1 = new Date(dDebut.getTime() + totalMs * (1 / 3));
  const dateB2 = new Date(dDebut.getTime() + totalMs * (2 / 3));
  const dateB3 = new Date(dDebut.getTime() + totalMs * (4 / 5));
  const dateBF = dFin;
  const isPast = (d: Date) => d.getTime() < now.getTime();

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,
    buildInfoSheet(o, f, s0, apprentiNom, tuteurNom, entrepriseNom, dDebut, dFin, isPast(dFin)),
    "Informations générales");

  XLSX.utils.book_append_sheet(wb,
    buildBilanSheet("ENTRETIEN DE FIN DE PÉRIODE D'ESSAI",
      isPast(dateEssai) ? frDate(dateEssai) : "", isPast(dateEssai),
      competencesMetier, sc0.map(s => Math.max(5, s - 2)),
      apprentiNom, tuteurNom, o.nom),
    "Entretien fin période essai");

  XLSX.utils.book_append_sheet(wb,
    buildBilanSheet("BILAN INTERMÉDIAIRE 1",
      isPast(dateB1) ? frDate(dateB1) : "", isPast(dateB1),
      competencesMetier, sc0.map(s => Math.max(6, s - 1)),
      apprentiNom, tuteurNom, o.nom),
    "Bilan intermédiaire 1");

  XLSX.utils.book_append_sheet(wb,
    buildBilanSheet("BILAN INTERMÉDIAIRE 2",
      isPast(dateB2) ? frDate(dateB2) : "", isPast(dateB2),
      competencesMetier, sc0,
      apprentiNom, tuteurNom, o.nom),
    "Bilan intermédiaire 2");

  XLSX.utils.book_append_sheet(wb,
    buildBilanSheet("BILAN INTERMÉDIAIRE 3",
      isPast(dateB3) ? frDate(dateB3) : "", isPast(dateB3),
      competencesMetier, sc0.map(s => Math.min(10, s + 1)),
      apprentiNom, tuteurNom, o.nom),
    "Bilan intermédiaire 3");

  XLSX.utils.book_append_sheet(wb,
    buildBilanSheet("BILAN FINAL",
      isPast(dateBF) ? frDate(dateBF) : "", isPast(dateBF),
      competencesMetier, sc0.map(s => Math.min(10, s + 2)),
      apprentiNom, tuteurNom, o.nom),
    "Bilan final");

  const out = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  return new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
