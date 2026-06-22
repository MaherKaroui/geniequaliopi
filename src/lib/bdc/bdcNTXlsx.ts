// Générateurs Excel BDC NT Conseils — sortie HTML pour le moteur xlsx existant.
// Les 4 trames officielles (Calendrier, Suivi adaptation, Contacts handicap,
// Tableau dysfonctionnements) sont rendues dynamiquement avec les infos de
// l'organisme et des bénéficiaires, et exportées en vrai .xlsx via htmlToXlsxBlob.

import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { BDC_NT_CALENDRIER, BDC_NT_MONTHS, BDC_NT_MDPH, BDC_NT_AGEFIPH } from "./bdcNTData";

function wrap(title: string, subtitle: string, sheets: { name: string; html: string }[], colspan = 12): string {
  const sheetDefs = sheets.map(s => `<x:ExcelWorksheet><x:Name>${s.name}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>`).join("");
  let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8">
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>${sheetDefs}</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
<style>
table{border-collapse:collapse;font-family:Calibri,Arial,sans-serif;font-size:11pt}
th{background:#1e3a7b;color:white;padding:8px 10px;text-align:left;border:1px solid #1e3a7b;font-weight:bold;vertical-align:top}
td{padding:6px 9px;border:1px solid #d0d0d0;vertical-align:top}
tr:nth-child(even) td{background:#f2f6fc}
.title{font-size:14pt;font-weight:bold;color:#1e3a7b;padding:10px;background:#fff}
.subtitle{font-size:10pt;color:#666;padding:4px 10px;background:#fff}
.label td{background:#e8f0fe;font-weight:bold}
.empty td{background:#fafafa;color:#bbb;font-style:italic}
</style></head><body>`;
  sheets.forEach((s, i) => {
    html += `<div id="sheet${i}"><table>`;
    html += `<tr><td class="title" colspan="${colspan}">${title}</td></tr>`;
    html += `<tr><td class="subtitle" colspan="${colspan}">${subtitle} — Onglet : ${s.name}</td></tr>`;
    html += `<tr><td colspan="${colspan}" style="height:6px"></td></tr>`;
    html += s.html;
    html += `</table></div>`;
    if (i < sheets.length - 1) html += `<br style="page-break-after:always">`;
  });
  return html + `</body></html>`;
}

const esc = (v: any) => (v === null || v === undefined ? "" : String(v))
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function row(cells: any[], header = false): string {
  const tag = header ? "th" : "td";
  return `<tr>${cells.map(c => `<${tag}>${esc(c)}</${tag}>`).join("")}</tr>`;
}

/* ============================================================== */
/* 1. Calendrier annuel                                            */
/* ============================================================== */
export function generateBdcNTCalendrierAnnuel(org: OrganismeInfo): string {
  const annee = new Date().getFullYear();
  const months = BDC_NT_MONTHS as string[];
  let html = row(["Thématique", ...months], true);
  (BDC_NT_CALENDRIER as (string | null)[][]).forEach(rec => {
    // rec[0] = null, rec[1] = thématique, rec[2..] = 12 mois
    const theme = rec[1] || "";
    const cells = months.map((_, i) => rec[2 + i] || "");
    html += row([theme, ...cells]);
  });
  const title = `CALENDRIER ANNUEL ${(org.nom || "").toUpperCase()} — ${annee}`;
  const subtitle = `Organisme : ${org.nom || ""} · SIRET : ${org.siret || ""} · NDA : ${org.nda || ""}`;
  return wrap(title, subtitle, [{ name: "Calendrier", html }], months.length + 1);
}

/* ============================================================== */
/* 2. Suivi de l'adaptation à l'accompagnement                     */
/* ============================================================== */
export function generateBdcNTSuiviAdaptation(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
): string {
  const headers = ["Date", "Bénéficiaire", "Prestation", "Problème rencontré", "Adaptation mise en place", "Suivi", "Statut", "Satisfaction"];
  let html = row(headers, true);
  const dDebut = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const prest = f.intitule || "Bilan de compétences";
  stagiaires.forEach((s, i) => {
    const d = new Date(dDebut); d.setDate(d.getDate() + i * 7);
    html += row([
      d.toLocaleDateString("fr-FR"),
      `${s.prenom || ""} ${s.nom || ""}`.trim(),
      prest,
      "Aucun problème signalé",
      "Sans objet",
      "Suivi régulier en entretien individuel",
      "Conforme",
      "★★★★★",
    ]);
  });
  if (stagiaires.length === 0) {
    html += row(["", "", prest, "", "", "", "", ""]);
  }
  const title = `SUIVI DE L'ADAPTATION À L'ACCOMPAGNEMENT — ${(org.nom || "").toUpperCase()}`;
  const subtitle = `Référent : ${org.referentPedagogique || org.responsablePedagogique || org.dirigeant || ""}`;
  return wrap(title, subtitle, [{ name: "Suivi", html }], headers.length);
}

/* ============================================================== */
/* 3. Contacts & suivi handicap                                    */
/* ============================================================== */
export function generateBdcNTContactsHandicap(org: OrganismeInfo): string {
  const headHandi = ["Structure", "Adresse", "Téléphone", "Email", "Site web"];
  const buildList = (data: any[][]) => {
    let h = row(headHandi, true);
    data.forEach(r => h += row([r[0] || "", r[1] || "", r[2] || "", r[3] || "", r[4] || ""]));
    return h;
  };
  const headSuivi = ["Date", "Organisme", "Type contact", "Contact", "Objet", "Commentaire"];
  let suivi = row(headSuivi, true);
  // Une ligne d'exemple + lignes vides à compléter
  suivi += row([new Date().toLocaleDateString("fr-FR"), "Agefiph Ile-de-France", "Email", `Référent ${org.referentHandicap || org.dirigeant || ""}`, "Information formation handicap", "Documentation envoyée"]);
  for (let i = 0; i < 8; i++) suivi += `<tr class="empty"><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td></tr>`;

  const title = `CONTACTS & SUIVI HANDICAP — ${(org.nom || "").toUpperCase()}`;
  const subtitle = `Référent handicap : ${org.referentHandicap || org.dirigeant || "À désigner"}`;
  return wrap(title, subtitle, [
    { name: "MDPH", html: buildList(BDC_NT_MDPH as any[][]) },
    { name: "Agefiph", html: buildList(BDC_NT_AGEFIPH as any[][]) },
    { name: "Suivi des contacts", html: suivi },
  ], 6);
}

/* ============================================================== */
/* 4. Tableau dysfonctionnements / appréciations & réclamations    */
/* ============================================================== */
export function generateBdcNTTableauDysfonctionnements(org: OrganismeInfo): string {
  const headers = ["Date", "Nom", "Adresse e-mail", "Téléphone", "Motif contact", "Interlocuteur", "Action", "Qui", "Date de la réponse", "Statut", "Satisfaction client"];
  let html = row(headers, true);
  // Trame vide à compléter (10 lignes)
  for (let i = 0; i < 10; i++) {
    html += `<tr class="empty">${headers.map(() => "<td>&nbsp;</td>").join("")}</tr>`;
  }
  const annee = new Date().getFullYear();
  const title = `TABLEAU D'ANALYSE ET DE GESTION DES APPRÉCIATIONS & RÉCLAMATIONS — ${annee}`;
  const subtitle = `Organisme : ${org.nom || ""} · Référent qualité : ${org.referentQualite || org.dirigeant || ""}`;
  return wrap(title, subtitle, [{ name: "Appréciations et réclamations", html }], headers.length);
}
