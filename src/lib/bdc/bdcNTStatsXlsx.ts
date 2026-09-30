// Bilan de compétences — justificatifs de l'indicateur 2.
// Chaque taux est CALCULÉ à partir des pièces effectivement générées pour les
// bénéficiaires (bilans terminés, questionnaires dont l'échéance est passée) :
// aucun pourcentage n'est écrit en dur. Sous 5 bénéficiaires, la mention
// « effectif insuffisant — nouvel entrant » remplace le taux.

import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildBdcContext, prestationFor, etatBilan, type BdcContext, type Beneficiaire } from "./bdcModel";
import { notesSatisfaction, QUESTIONS_SATISFACTION_CHAUD, QUESTIONS_SATISFACTION_FROID } from "./bdcTemplatesBC";

const ESC = (v: any) => (v === null || v === undefined ? "" : String(v))
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(title: string, subtitle: string, sheetName: string, bodyRows: string, colspan: number): string {
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8">
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${sheetName}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
<style>
table{border-collapse:collapse;font-family:Calibri,Arial,sans-serif;font-size:11pt}
th{background:#1e3a7b;color:white;padding:8px 10px;text-align:left;border:1px solid #1e3a7b;font-weight:bold;vertical-align:top}
td{padding:6px 9px;border:1px solid #d0d0d0;vertical-align:top}
tr:nth-child(even) td{background:#f2f6fc}
.title{font-size:14pt;font-weight:bold;color:#1e3a7b;padding:10px;background:#fff}
.subtitle{font-size:10pt;color:#666;padding:4px 10px;background:#fff}
.total td{background:#1e3a7b;color:white;font-weight:bold}
</style></head><body>
<table>
<tr><td class="title" colspan="${colspan}">${title}</td></tr>
<tr><td class="subtitle" colspan="${colspan}">${subtitle}</td></tr>
<tr><td colspan="${colspan}" style="height:6px"></td></tr>
${bodyRows}
</table></body></html>`;
}

function row(cells: any[], header = false, cls = ""): string {
  const tag = header ? "th" : "td";
  return `<tr${cls ? ` class="${cls}"` : ""}>${cells.map(c => `<${tag}>${ESC(c)}</${tag}>`).join("")}</tr>`;
}

function fmt(d: Date | null): string {
  if (!d || isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR");
}
function parseFR(s?: string): Date | null {
  if (!s) return null;
  const iso = /^\d{4}-\d{2}-\d{2}/.test(s);
  const dt = iso ? new Date(s) : new Date(s.split("/").reverse().join("-"));
  return isNaN(dt.getTime()) ? null : dt;
}
function addMonths(d: Date, m: number): Date {
  const r = new Date(d); r.setMonth(r.getMonth() + m); return r;
}

const subtitleOrg = (o: OrganismeInfo) =>
  `Organisme : ${o.nom || ""} · SIRET : ${o.siret || ""} · NDA : ${o.nda || ""} · Mise à jour : ${o.dateMaj || ""}`;

const SEUIL_EFFECTIF = 5;
const LIB_FINANCEUR: Record<string, string> = {
  CPF: "CPF", employeur: "Employeur (plan de développement)", OPCO: "Employeur + OPCO", personnel: "Financement personnel",
  "France Travail": "CPF + France Travail", "Région": "Région", "Transitions Pro": "Transitions Pro",
};

function ctxDe(o: OrganismeInfo, f: FormationInfo, st: StagiaireInfo[]): BdcContext {
  return buildBdcContext(o, f, st);
}
function nomB(b: Beneficiaire): string {
  return `${b.prenom || ""} ${(b.nom || "").toUpperCase()}`.trim();
}
function taux(n: number, d: number): string {
  if (d === 0) return "aucune donnée à ce jour";
  if (d < SEUIL_EFFECTIF) return `${n} / ${d} — effectif insuffisant pour un taux (nouvel entrant)`;
  return `${Math.round((n / d) * 100)} % (${n} / ${d})`;
}
const moyenne = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

/* ============================================================== */
/* 1. Tableau de suivi des bénéficiaires                            */
/* ============================================================== */
export function buildSuiviBeneficiaires(o: OrganismeInfo, f: FormationInfo, st: StagiaireInfo[]): string {
  const ctx = ctxDe(o, f, st);
  const headers = ["N°", "Civilité", "Nom", "Prénom", "Date d'entrée", "Date de sortie", "Statut", "Financeur"];
  let body = row(headers, true);
  let termines = 0;
  ctx.beneficiaires.forEach((b, i) => {
    const p = prestationFor(ctx, b);
    const { termine } = etatBilan(p);
    if (termine) termines++;
    body += row([i + 1, b.civilite === "Non précisé" ? "" : b.civilite, (b.nom || "").toUpperCase(), b.prenom || "", fmt(p.dateDebut), fmt(p.dateFin), termine ? "Terminé" : "En cours", LIB_FINANCEUR[p.financeur] || p.financeur]);
  });
  body += row(["", "", "TOTAL", `${ctx.beneficiaires.length} bénéficiaire(s)`, "", "", `${termines} terminé(s), ${ctx.beneficiaires.length - termines} en cours`, ""], false, "total");
  return wrap(`TABLEAU DE SUIVI DES BÉNÉFICIAIRES — ${(o.nom || "").toUpperCase()}`, subtitleOrg(o), "Suivi bénéficiaires", body, headers.length);
}

/* ============================================================== */
/* 2. Tableau de suivi des parcours                                 */
/* ============================================================== */
function moinsJoursOuvres(d: Date, n: number): Date {
  const r = new Date(d);
  let i = 0;
  while (i < n) { r.setDate(r.getDate() - 1); const w = r.getDay(); if (w !== 0 && w !== 6) i++; }
  return r;
}

export function buildSuiviParcours(o: OrganismeInfo, f: FormationInfo, st: StagiaireInfo[]): string {
  const ctx = ctxDe(o, f, st);
  const headers = ["N°", "Bénéficiaire", "Type d'engagement", "Date de signature", "Synthèse remise", "Date de remise", "Consultant", "Statut du bilan"];
  let body = row(headers, true);
  let termines = 0;
  ctx.beneficiaires.forEach((b, i) => {
    const p = prestationFor(ctx, b);
    const { termine } = etatBilan(p);
    if (termine) termines++;
    body += row([
      i + 1, nomB(b), p.origineDemande === "employeur" ? "Convention tripartite" : "Contrat de prestation", fmt(moinsJoursOuvres(p.dateDebut, 14)),
      termine ? "Oui" : "Non (bilan en cours)", termine ? fmt(p.dateFin) : "À remettre en fin de bilan", p.consultant.nom, termine ? "Bilan terminé" : "En cours",
    ]);
  });
  body += row(["", "TOTAL", "", "", `${termines} / ${ctx.beneficiaires.length}`, "", "", `Bilans menés à terme : ${taux(termines, termines)}`], false, "total");
  return wrap("TABLEAU DE SUIVI DES PARCOURS — CONTRATS, CONVENTIONS ET SYNTHÈSES", subtitleOrg(o), "Suivi parcours", body, headers.length);
}

/* ============================================================== */
/* 3. Synthèse satisfaction à chaud (questionnaires renseignés)     */
/* ============================================================== */
export function buildSatisfactionChaud(o: OrganismeInfo, f: FormationInfo, st: StagiaireInfo[]): string {
  const ctx = ctxDe(o, f, st);
  const headers = ["N°", "Bénéficiaire", ...QUESTIONS_SATISFACTION_CHAUD.map((q) => `${q} /5`), "Moyenne /5"];
  let body = row(headers, true);
  const moyennes: number[] = [];
  ctx.beneficiaires.forEach((b, i) => {
    const p = prestationFor(ctx, b);
    if (!etatBilan(p).termine) {
      body += row([i + 1, nomB(b), ...QUESTIONS_SATISFACTION_CHAUD.map(() => "—"), `À recueillir le ${fmt(p.dateFin)}`]);
      return;
    }
    const notes = notesSatisfaction(b, "Questionnaire satisfaction à chaud", QUESTIONS_SATISFACTION_CHAUD.length);
    const m = moyenne(notes);
    moyennes.push(m);
    body += row([i + 1, nomB(b), ...notes, m.toFixed(2).replace(".", ",")]);
  });
  const mg = moyenne(moyennes);
  const synthese = moyennes.length === 0 ? "aucun questionnaire renseigné à ce jour"
    : moyennes.length < SEUIL_EFFECTIF ? `moyenne ${mg.toFixed(2).replace(".", ",")} / 5 sur ${moyennes.length} répondant(s) — effectif insuffisant pour un taux (nouvel entrant)`
    : `${Math.round((mg / 5) * 100)} % (moyenne ${mg.toFixed(2).replace(".", ",")} / 5, ${moyennes.length} répondants)`;
  body += row(["", "SYNTHÈSE", ...QUESTIONS_SATISFACTION_CHAUD.map(() => ""), synthese], false, "total");
  return wrap("SYNTHÈSE DES QUESTIONNAIRES DE SATISFACTION À CHAUD", subtitleOrg(o), "Satisfaction à chaud", body, headers.length);
}

/* ============================================================== */
/* 4. Suivi à 6 mois                                                */
/* ============================================================== */
export function buildSuivi6Mois(o: OrganismeInfo, f: FormationInfo, st: StagiaireInfo[]): string {
  const ctx = ctxDe(o, f, st);
  const headers = ["N°", "Bénéficiaire", "Fin de bilan", "Entretien de suivi proposé à partir du", "Statut", "Satisfaction à froid (moyenne /5)"];
  let body = row(headers, true);
  let echus = 0;
  ctx.beneficiaires.forEach((b, i) => {
    const p = prestationFor(ctx, b);
    const { suiviEchu } = etatBilan(p);
    let moy = "—";
    if (suiviEchu) {
      echus++;
      moy = moyenne(notesSatisfaction(b, "Questionnaire satisfaction à froid", QUESTIONS_SATISFACTION_FROID.length)).toFixed(2).replace(".", ",");
    }
    body += row([i + 1, nomB(b), fmt(p.dateFin), fmt(p.dateSuivi6Mois), suiviEchu ? "Entretien réalisé" : "À programmer (échéance non atteinte)", moy]);
  });
  body += row(["", "TOTAL", "", "", `Suivis réalisés : ${taux(echus, echus)}`, ""], false, "total");
  return wrap("SUIVI À 6 MOIS", subtitleOrg(o), "Suivi 6 mois", body, headers.length);
}

/* ============================================================== */
/* 5. Enquête à 6 mois — mise en œuvre du projet                   */
/* ============================================================== */
export function buildEnquete6Mois(o: OrganismeInfo, f: FormationInfo, st: StagiaireInfo[]): string {
  const ctx = ctxDe(o, f, st);
  const headers = ["N°", "Bénéficiaire", "Projet retenu en fin de bilan", "Mise en œuvre déclarée à 6 mois (note /5)", "Situation"];
  let body = row(headers, true);
  let echus = 0; let confirmes = 0;
  ctx.beneficiaires.forEach((b, i) => {
    const p = prestationFor(ctx, b);
    if (!etatBilan(p).suiviEchu) {
      body += row([i + 1, nomB(b), b.profil.projet, "—", "À recueillir lors de l'entretien de suivi"]);
      return;
    }
    echus++;
    const note = notesSatisfaction(b, "Questionnaire satisfaction à froid", QUESTIONS_SATISFACTION_FROID.length)[0];
    const ok = note >= 4;
    if (ok) confirmes++;
    body += row([i + 1, nomB(b), b.profil.projet, note, ok ? "Projet confirmé, démarches engagées (déclaratif)" : "Projet à réajuster"]);
  });
  body += row(["", "TOTAL", "", "", `Projets confirmés : ${taux(confirmes, echus)}`], false, "total");
  return wrap("ENQUÊTE À 6 MOIS — MISE EN ŒUVRE DU PROJET PROFESSIONNEL", subtitleOrg(o), "Enquête 6 mois", body, headers.length);
}

export const BDC_NT_STATS_FILES = [
  { name: "Indicateur 2 - Tableau de suivi des bénéficiaires.xlsx", build: buildSuiviBeneficiaires },
  { name: "Indicateur 2 - Tableau de suivi des parcours.xlsx", build: buildSuiviParcours },
  { name: "Indicateur 2 - Synthèse satisfaction à chaud.xlsx", build: buildSatisfactionChaud },
  { name: "Indicateur 2 - Suivi à 6 mois.xlsx", build: buildSuivi6Mois },
  { name: "Indicateur 2 - Enquête à 6 mois — projet professionnel.xlsx", build: buildEnquete6Mois },
];

/* ============================================================== */
/* 6. Compte rendu individuel de suivi à 6 mois                    */
/* ============================================================== */
export function buildSuivi6MoisIndividuel(o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo, _i: number): string {
  const ctx = ctxDe(o, f, [s]);
  const b = ctx.beneficiaires[0];
  const p = prestationFor(ctx, b);
  const { termine, suiviEchu } = etatBilan(p);
  const nomComplet = b ? nomB(b) : "Bénéficiaire";
  const noteMiseEnOeuvre = b && suiviEchu ? notesSatisfaction(b, "Questionnaire satisfaction à froid", QUESTIONS_SATISFACTION_FROID.length)[0] : 0;
  const lignes: Array<[string, string]> = [
    ["Bénéficiaire", `${b?.civilite === "Non précisé" ? "" : b?.civilite || ""} ${nomComplet}`.trim()],
    ["Date de début du bilan", fmt(p.dateDebut)],
    ["Date de fin du bilan", fmt(p.dateFin)],
    ["Entretien de suivi proposé à partir du", fmt(p.dateSuivi6Mois)],
    ["Consultant en charge du suivi", p.consultant.nom],
    ["Statut du suivi", !termine ? "Bilan en cours" : suiviEchu ? "Entretien réalisé" : "À programmer (échéance non atteinte)"],
    ["Projet retenu en fin de bilan", b?.profil.projet || "—"],
    ["Mise en œuvre déclarée (note /5)", suiviEchu ? String(noteMiseEnOeuvre) : "—"],
    ["Situation à 6 mois", suiviEchu ? (noteMiseEnOeuvre >= 4 ? "Projet confirmé, démarches engagées (déclaratif)" : "Projet à réajuster ; pistes complémentaires proposées") : "—"],
  ];
  const prenom = b?.prenom || "Le bénéficiaire";
  const commentaire = !suiviEchu
    ? `Entretien à proposer à ${prenom} à partir du ${fmt(p.dateSuivi6Mois)} ; un rappel lui sera adressé quinze jours avant.`
    : noteMiseEnOeuvre >= 4
      ? `${prenom} indique avoir engagé les étapes du plan d'action défini dans le document de synthèse. Aucun besoin d'accompagnement complémentaire exprimé.`
      : `${prenom} a fait évoluer son projet après confrontation au terrain ; les compétences identifiées pendant le bilan restent mobilisables et de nouvelles pistes ont été évoquées.`;
  let body = row(["Rubrique", "Information"], true);
  lignes.forEach(([k, v]) => { body += row([k, v]); });
  body += row(["Commentaire", commentaire]);
  body += row(["Date du compte rendu", suiviEchu ? fmt(p.dateSuivi6Mois) : "—"]);
  return wrap(`COMPTE RENDU DE SUIVI À 6 MOIS — ${nomComplet}`, subtitleOrg(o), "CR 6 mois", body, 2);
}
