// Excel/XLSX generation using HTML table format (.xls)
// This generates HTML tables that open correctly in Excel with formatting

import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { formatDate } from "./docBuilder";
import { EVAL_SCORES, getFormationDays } from "./sampleData";
import { getEvalContent } from "./evalContent";
import { getEvalBesoinsFinancement } from "./documentGenerator";

function excelWrap(title: string, sheets: { name: string; html: string }[]): string {
  // Multi-sheet Excel HTML workbook
  const sheetDefs = sheets.map((s, i) => `<x:ExcelWorksheet><x:Name>${s.name}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>`).join("");
  
  let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>${sheetDefs}</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
<style>
  table { border-collapse: collapse; font-family: Calibri, Arial, sans-serif; font-size: 11pt; }
  th { background-color: #1e3a7b; color: white; padding: 8px 12px; text-align: left; font-weight: bold; border: 1px solid #1e3a7b; }
  td { padding: 6px 10px; border: 1px solid #d0d0d0; }
  tr:nth-child(even) { background-color: #f2f6fc; }
  .title { font-size: 14pt; font-weight: bold; color: #1e3a7b; padding: 10px; }
  .subtitle { font-size: 10pt; color: #666; padding: 5px 10px; }
  .header-row td { background-color: #e8f0fe; font-weight: bold; }
  .total-row td { background-color: #1e3a7b; color: white; font-weight: bold; }
  .green { color: #2d8659; font-weight: bold; }
  .red { color: #c0392b; font-weight: bold; }
  .orange { color: #e67e22; font-weight: bold; }
</style>
</head><body>`;

  sheets.forEach((s, i) => {
    html += `<div id="sheet${i}">`;
    html += `<table><tr><td class="title" colspan="10">${title}</td></tr>`;
    html += `<tr><td class="subtitle" colspan="10">Onglet : ${s.name}</td></tr>`;
    html += `<tr><td colspan="10"></td></tr>`;
    html += s.html;
    html += `</table></div>`;
    if (i < sheets.length - 1) html += `<br style="page-break-after:always">`;
  });

  html += `</body></html>`;
  return html;
}

function tableRow(cells: string[], isHeader = false): string {
  const tag = isHeader ? 'th' : 'td';
  return `<tr>${cells.map(c => `<${tag}>${c}</${tag}>`).join("")}</tr>`;
}

export function generateExcelSuiviStagiaires(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  let html = tableRow(["N°", "Nom", "Prénom", "Email", "Téléphone", "Entreprise", "Poste", "Date naissance", "Statut"], true);
  stagiaires.slice(0, 10).forEach((s, i) => {
    html += tableRow([`${i + 1}`, s.nom, s.prenom, s.email, s.telephone, s.entreprise, s.poste, formatDate(s.dateNaissance), "✅ Inscrit"]);
  });
  return excelWrap(`Suivi stagiaires – ${f.intitule}`, [{ name: "Stagiaires", html }]);
}

export function generateExcelAssiduite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const jours = ["Jour 1", "Jour 2", "Jour 3", "Jour 4", "Jour 5"];
  let html = tableRow(["Stagiaire", ...jours, "Total heures", "Taux présence"], true);
  stagiaires.slice(0, 10).forEach((s, i) => {
    const presences = jours.map(() => i % 10 < 9 ? "P" : "A");
    const total = presences.filter(p => p === "P").length * 7;
    const taux = Math.round(total / (jours.length * 7) * 100);
    html += tableRow([s.prenom + " " + s.nom, ...presences, `${total}h`, `${taux}%`]);
  });
  return excelWrap(`Assiduité – ${f.intitule}`, [{ name: "Assiduité", html }]);
}

export function generateExcelEvaluations(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const evalData = getEvalContent(f.intitule);
  let html = tableRow(["Stagiaire", "Positionnement", "Intermédiaire", "Finale", "Moyenne", "Progression", "Résultat"], true);
  stagiaires.slice(0, 10).forEach((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const pos = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    const inter = Math.round((pos * 10 + 10) / 10 * 10) / 10;
    const fin = Math.round((pos * 10 + 20) / 10 * 10) / 10;
    const avg = Math.round((pos + inter + fin) / 3 * 10) / 10;
    html += tableRow([s.prenom + " " + s.nom, `${pos}/10`, `${Math.min(10, inter)}/10`, `${Math.min(10, fin)}/10`, `${Math.min(10, avg)}/10`, `+${Math.round((fin - pos) * 10) / 10}`, fin >= 6 ? "✅ Validé" : "⚠️"]);
  });
  return excelWrap(`Évaluations – ${f.intitule}`, [{ name: "Évaluations", html }]);
}

export function generateExcelSatisfaction(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const criteres = ["Accueil", "Objectifs", "Contenu", "Pédagogie", "Formateur", "Supports", "Durée", "Recommandation"];
  let html = tableRow(["Stagiaire", ...criteres, "Moyenne"], true);
  stagiaires.slice(0, 10).forEach((s, i) => {
    const scores = criteres.map((_, ci) => 4 + ((i + ci) % 2));
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10;
    html += tableRow([s.prenom + " " + s.nom, ...scores.map(v => `${v}/5`), `${avg}/5`]);
  });
  html += tableRow(["MOYENNE", ...criteres.map((_, ci) => { const vals = stagiaires.slice(0,10).map((_, i) => 4 + ((i + ci) % 2)); return `${(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1)}/5`; }), "4.5/5"]);
  return excelWrap(`Satisfaction – ${f.intitule}`, [{ name: "Satisfaction", html }]);
}

export function generateExcelReclamations(o: OrganismeInfo): string {
  let html = tableRow(["N°", "Date", "Réclamant", "Type", "Objet", "Traitement", "Délai", "Satisfaction post", "Statut"], true);
  const data = [
    ["1", "15/01/2024", "M. Dupont", "Technique", "Problème connexion LMS", "Réinitialisation accès", "24h", "5/5", "✅ Clôturé"],
    ["2", "03/02/2024", "Mme Bernard", "Pédagogie", "Support incomplet", "Envoi version complète", "4h", "4/5", "✅ Clôturé"],
    ["3", "22/03/2024", "Entreprise GreenTech", "Admin", "Facturation incorrecte", "Avoir + nouvelle facture", "48h", "4/5", "✅ Clôturé"],
    ["4", "10/04/2024", "M. Roux", "Logistique", "Salle bruyante", "Changement de salle", "24h", "5/5", "✅ Clôturé"],
    ["5", "05/06/2024", "Mme Lambert", "Admin", "Retard convocation", "Excuses + envoi express", "12h", "4/5", "✅ Clôturé"],
  ];
  data.forEach(r => html += tableRow(r));
  return excelWrap("Registre des réclamations 2024", [{ name: "Réclamations", html }]);
}

export function generateExcelIndicateursQualite(o: OrganismeInfo): string {
  let html = tableRow(["Indicateur", "Objectif", "T1 2024", "T2 2024", "T3 2024", "T4 2024", "Annuel", "Atteint"], true);
  const data = [
    ["Taux satisfaction", "≥ 90%", "96%", "97%", "96%", "98%", "97%", "✅"],
    ["Taux réussite", "≥ 80%", "88%", "89%", "90%", "91%", "89%", "✅"],
    ["Taux insertion", "≥ 75%", "80%", "82%", "83%", "84%", "82%", "✅"],
    ["Taux abandon", "≤ 5%", "3%", "2%", "4%", "2%", "3%", "✅"],
    ["Réclamations < 48h", "100%", "100%", "100%", "100%", "100%", "100%", "✅"],
    ["Nb formations", "≥ 40", "12", "14", "11", "10", "47", "✅"],
    ["Nb stagiaires", "≥ 450", "135", "142", "128", "118", "523", "✅"],
  ];
  data.forEach(r => html += tableRow(r));
  return excelWrap("Indicateurs qualité 2024", [{ name: "Indicateurs", html }]);
}

export function generateExcelSuiviCompetences(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const evalData = getEvalContent(f.intitule);
  let html = tableRow(["Stagiaire", ...evalData.competences, "Moyenne", "Statut"], true);
  stagiaires.slice(0, 10).forEach((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const scores = evalData.competences.map((_, ci) => Math.min(10, sc[ci % sc.length] + 2));
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10;
    html += tableRow([s.prenom + " " + s.nom, ...scores.map(v => `${v}/10`), `${avg}/10`, avg >= 7 ? "✅ Acquis" : "🔄 En cours"]);
  });
  return excelWrap(`Suivi compétences – ${f.intitule}`, [{ name: "Compétences", html }]);
}

export function generateExcelVeille(o: OrganismeInfo): string {
  let html = tableRow(["Date", "Type", "Source", "Objet", "Impact", "Action", "Responsable", "Statut"], true);
  const data = [
    ["15/01/2024", "Réglementaire", "DGEFP", "Modification CPF – reste à charge", "Mise à jour CGV", "MAJ CGV et communication", o.referentQualite, "✅"],
    ["20/02/2024", "Pédagogique", "Centre Inffo", "IA générative en formation", "Innovation pédagogique", "Formation formateurs IA", o.responsablePedagogique, "✅"],
    ["15/03/2024", "Métier", "DARES", "Évolution emploi secteur numérique", "Nouvelle formation", "Création formation Data Analyst", o.responsablePedagogique, "🔄"],
    ["10/04/2024", "Réglementaire", "France Compétences", "Nouvelle fiche RS", "Enregistrement RS", "Dépôt dossier RS", o.dirigeant, "🔄"],
    ["20/05/2024", "Pédagogique", "Salon EdTech", "Adaptive learning", "Innovation", "Étude de faisabilité", o.responsablePedagogique, "📋"],
    ["15/06/2024", "Réglementaire", "AFNOR", "Évolution RNQ V9", "Conformité", "Mise à jour procédures", o.referentQualite, "✅"],
  ];
  data.forEach(r => html += tableRow(r));
  return excelWrap("Veille réglementaire, pédagogique et métier 2024", [{ name: "Veille", html }]);
}

export function generateExcelPlanActions(o: OrganismeInfo): string {
  let html = tableRow(["N°", "Action", "Origine", "Responsable", "Priorité", "Échéance", "Avancement", "Résultat", "Statut"], true);
  const data = [
    ["1", "MAJ supports bureautique", "Enquêtes satisfaction", "P. Martin", "Haute", "T1 2024", "100%", "Satisfaction +0.5pt", "✅"],
    ["2", "Amélioration LMS", "Réclamation", "A. Petit", "Haute", "T1 2024", "100%", "0 réclamation connexion", "✅"],
    ["3", "Évaluations interactives", "Innovation pédagogique", "C. Dubois", "Moyenne", "T2 2024", "100%", "Engagement +25%", "✅"],
    ["4", "Insonorisation salle", "Réclamation", "Service technique", "Haute", "T2 2024", "100%", "Bruit -60%", "✅"],
    ["5", "Formation IA formateurs", "Veille pédagogique", o.responsablePedagogique, "Moyenne", "T3 2024", "100%", "5/5 formés", "✅"],
    ["6", "Auto convocations", "Réclamation", "Admin", "Haute", "T2 2024", "100%", "0 retard", "✅"],
    ["7", "Nouveau programme digital", "Veille métiers", "A. Petit", "Moyenne", "T3 2024", "100%", "15 inscrits", "✅"],
    ["8", "Audit accessibilité LMS", "Veille réglementaire", o.referentHandicap, "Haute", "T4 2024", "70%", "En cours", "🔄"],
  ];
  data.forEach(r => html += tableRow(r));
  return excelWrap("Plan d'actions correctives 2024", [{ name: "Actions", html }]);
}

export function generateExcelSuiviApprentis(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  let html = tableRow(["N°", "Apprenti", "Entreprise", "MA", "Assiduité CFA", "Assiduité Ent.", "Note CFA", "Éval MA", "Visite 1", "Visite 2", "Statut"], true);
  stagiaires.slice(0, 10).forEach((s, i) => {
    html += tableRow([`${i+1}`, s.prenom + " " + s.nom, s.entreprise, f.formateur, `${95+(i%5)}%`, `${97+(i%3)}%`, `${7+(i%3)}/10`, `${8+(i%2)}/10`, "✅", i < 7 ? "✅" : "📋", "✅ En cours"]);
  });
  return excelWrap(`Suivi apprentis – ${f.intitule}`, [{ name: "Apprentis", html }]);
}

export function generateExcelSuiviEntreprises(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const entreprises = [...new Set(stagiaires.slice(0, 10).map(s => s.entreprise).filter(Boolean))];
  let html = tableRow(["Entreprise", "Nb apprentis", "Satisfaction", "Visites réalisées", "Convention signée", "Renouvellement"], true);
  entreprises.forEach((ent, i) => {
    html += tableRow([ent, `${1 + (i % 3)}`, `${4 + (i % 2)}/5`, `${2 + (i % 2)}`, "✅ Oui", "✅ Oui"]);
  });
  return excelWrap(`Suivi entreprises – ${f.intitule}`, [{ name: "Entreprises", html }]);
}

export function generateExcelSuiviInsertionCFA(o: OrganismeInfo): string {
  let html = tableRow(["Promotion", "Diplômés", "CDI", "CDD", "Intérim", "Poursuite études", "Recherche", "Taux insertion"], true);
  const data = [
    ["2022", "58", "25 (43%)", "15 (26%)", "5 (9%)", "5 (9%)", "8 (14%)", "86%"],
    ["2023", "62", "30 (48%)", "14 (23%)", "6 (10%)", "4 (6%)", "8 (13%)", "89%"],
    ["2024", "65", "32 (49%)", "16 (25%)", "5 (8%)", "4 (6%)", "8 (12%)", "89%"],
  ];
  data.forEach(r => html += tableRow(r));
  return excelWrap("Suivi insertion CFA", [{ name: "Insertion", html }]);
}

export function generateExcelSuiviRupturesCFA(o: OrganismeInfo): string {
  let html = tableRow(["N°", "Apprenti", "Entreprise", "Formation", "Date rupture", "Motif", "Action CFA", "Issue", "Délai résolution"], true);
  const data = [
    ["1", "Anonymisé A.", "Ent. X", "Formation 1", "15/11/2024", "Difficultés relationnelles", "Médiation + recherche", "Nouveau contrat", "3 semaines"],
    ["2", "Anonymisé B.", "Ent. Y", "Formation 2", "20/01/2025", "Réorientation", "Accompagnement", "Nouvelle formation", "2 semaines"],
  ];
  data.forEach(r => html += tableRow(r));
  return excelWrap("Suivi ruptures CFA", [{ name: "Ruptures", html }]);
}

export function generateExcelTableauBordPerformance(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const mois = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  const nbStagiaires = stagiaires.filter(s => s.nom && s.nom.trim()).length || 1;

  // Determine year
  const firstDate = stagiaires.find(s => s.dateDebutFormation)?.dateDebutFormation || f.dateDebut || f.dateFin || "";
  const parsedDate = firstDate ? new Date(firstDate + "T00:00:00") : null;
  const annee = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.getFullYear() : new Date().getFullYear();

  // Count stagiaires per month based on individual dates
  const countPerMonth = new Array(12).fill(0);
  const hasIndividualDates = stagiaires.some(s => s.dateDebutFormation);

  if (hasIndividualDates) {
    stagiaires.filter(s => s.nom && s.nom.trim()).forEach(s => {
      const d = s.dateDebutFormation || f.dateDebut || "";
      if (d) {
        const pd = new Date(d + "T00:00:00");
        if (!isNaN(pd.getTime())) countPerMonth[pd.getMonth()]++;
      }
    });
  } else {
    const fallbackDate = f.dateDebut || f.dateFin || "";
    const pd = fallbackDate ? new Date(fallbackDate + "T00:00:00") : null;
    const moisF = pd && !isNaN(pd.getTime()) ? pd.getMonth() : new Date().getMonth();
    countPerMonth[moisF] = nbStagiaires;
  }

  // Header row
  let html = `<tr><th>Action de formation</th><th>Indicateur</th>`;
  mois.forEach(m => { html += `<th>${m}-${String(annee).slice(2)}</th>`; });
  html += `<th>Commentaires / analyse</th></tr>`;

  // Taux de satisfaction row
  html += `<tr><td rowspan="2">${f.intitule || o.nom}</td><td>Taux de satisfaction appréciation des bénéficiaires</td>`;
  mois.forEach((_, i) => { html += `<td>${countPerMonth[i] > 0 ? "100%" : ""}</td>`; });
  html += `<td>${f.intitule || o.nom} a reçu ${nbStagiaires} stagiaire${nbStagiaires > 1 ? "s" : ""} pour l'année ${annee}. Nous avons été noté 10/10 sur le taux de satisfaction pour l'année ${annee} au critère 7.30. Nous communiquerons cet élément de diffusion sur notre site internet et sur notre programme de formation.</td></tr>`;

  // Nombre de stagiaires row
  html += `<tr><td>Nombre de stagiaires</td>`;
  mois.forEach((_, i) => { html += `<td>${countPerMonth[i] > 0 ? countPerMonth[i] : ""}</td>`; });
  html += `<td></td></tr>`;

  return excelWrap(`TABLEAU DE BORD INDICATEURS DE PERFORMANCE – ${annee}`, [{ name: "Tableau de bord", html }]);
}

export function generateExcelTableauSuiviParcours(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const days = getFormationDays(f);
  
  // Header row
  let html = `<tr>`;
  html += `<th>Nom</th><th>Prénom</th><th>Sexe</th><th>Prise en charge</th><th>Nature</th><th>Handicap</th><th>Observations</th>`;
  html += `<th>Date entrée</th><th>Date sortie</th>`;
  html += `<th>Date adaptation</th><th>Adaptations nécessaires</th><th>Difficultés</th><th>Suivi</th>`;
  days.slice(0, 12).forEach((_, i) => { html += `<th>JS${i + 1}</th>`; });
  html += `<th>Interruption</th><th>Cause</th>`;
  html += `<th>QCM</th><th>Test réussite</th><th>Satisfaction</th>`;
  html += `</tr>`;

  stagiaires.slice(0, 10).forEach((s, si) => {
    const sc = EVAL_SCORES[si] || [7, 8, 7, 8, 7];
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    const sexe = s.prenom?.endsWith('a') || s.prenom?.endsWith('e') ? 'F' : 'H';
    const presences = days.slice(0, 12).map(() => 'X');
    const financement = getEvalBesoinsFinancement(s, f, o, si);
    html += tableRow([
      s.nom?.toUpperCase() || '', s.prenom?.toUpperCase() || '', sexe,
      financement,
      'numéraires', 'non', '',
      formatDate(f.dateDebut), formatDate(f.dateFin),
      formatDate(f.dateDebut), 'aucune', 'aucune', 'aucune',
      ...presences,
      '', '',
      `${avg}/10`, avg >= 6 ? 'oui' : 'non', 'oui'
    ]);
  });

  return excelWrap(`TABLEAU DE SUIVI DU PARCOURS BÉNÉFICIAIRES ET ADAPTATIONS – ${f.intitule}`, [{ name: "Suivi parcours", html }]);
}

// Helper to generate Excel blob
export function excelToBlob(htmlContent: string): Blob {
  return new Blob(["\ufeff", htmlContent], { type: "application/vnd.ms-excel" });
}
