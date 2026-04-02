// Excel/XLSX generation using HTML table format (.xls)
// This generates HTML tables that open correctly in Excel with formatting

import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { formatDate, isFormationTerminee } from "./docBuilder";
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
  const termine = isFormationTerminee(f);
  let html = tableRow(["Stagiaire", "Positionnement", "Intermédiaire", "Finale", "Moyenne", "Progression", "Résultat"], true);
  stagiaires.slice(0, 10).forEach((s, i) => {
    if (termine) {
      const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
      const pos = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
      const inter = Math.round((pos * 10 + 10) / 10 * 10) / 10;
      const fin = Math.round((pos * 10 + 20) / 10 * 10) / 10;
      const avg = Math.round((pos + inter + fin) / 3 * 10) / 10;
      html += tableRow([s.prenom + " " + s.nom, `${pos}/10`, `${Math.min(10, inter)}/10`, `${Math.min(10, fin)}/10`, `${Math.min(10, avg)}/10`, `+${Math.round((fin - pos) * 10) / 10}`, fin >= 6 ? "✅ Validé" : "⚠️"]);
    } else {
      html += tableRow([s.prenom + " " + s.nom, "", "", "", "", "", ""]);
    }
  });
  return excelWrap(`Évaluations – ${f.intitule}`, [{ name: "Évaluations", html }]);
}

export function generateExcelSatisfaction(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const termine = isFormationTerminee(f);
  const criteres = ["Accueil", "Objectifs", "Contenu", "Pédagogie", "Formateur", "Supports", "Durée", "Recommandation"];
  let html = tableRow(["Stagiaire", ...criteres, "Moyenne"], true);
  stagiaires.slice(0, 10).forEach((s, i) => {
    if (termine) {
      const scores = criteres.map((_, ci) => 4 + ((i + ci) % 2));
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10;
      html += tableRow([s.prenom + " " + s.nom, ...scores.map(v => `${v}/5`), `${avg}/5`]);
    } else {
      html += tableRow([s.prenom + " " + s.nom, ...criteres.map(() => ""), ""]);
    }
  });
  if (termine) {
    html += tableRow(["MOYENNE", ...criteres.map((_, ci) => { const vals = stagiaires.slice(0,10).map((_, i) => 4 + ((i + ci) % 2)); return `${(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1)}/5`; }), "4.5/5"]);
  }
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
  const isVAE = o.typesActions?.includes('vae');
  const nbStagiaires = stagiaires.filter(s => s.nom && s.nom.trim()).length || 1;
  const labelBeneficiaire = isVAE ? "candidat" : "stagiaire";
  const labelBeneficiaires = isVAE ? "candidats" : "stagiaires";
  const labelAction = isVAE ? "Accompagnement VAE" : "Action de formation";

  // Determine year
  const firstDate = stagiaires.find(s => s.dateDebutFormation)?.dateDebutFormation || f.dateDebut || f.dateFin || "";
  const parsedDate = firstDate ? new Date(firstDate + "T00:00:00") : null;
  const annee = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.getFullYear() : new Date().getFullYear();
  const anneeN1 = annee - 1;

  // Count per month based on individual dates
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

  // Header row with Année n-1 column
  let html = `<tr><th>${labelAction}</th><th>Indicateur</th><th>Année n-1 (${anneeN1})</th>`;
  mois.forEach(m => { html += `<th>${m}-${String(annee).slice(2)}</th>`; });
  html += `<th>Commentaires / analyse</th></tr>`;

  // Taux de satisfaction row
  const satisfactionN1 = isVAE ? "N/A – Nouvel entrant" : "";
  html += `<tr><td rowspan="3">${f.intitule || o.nom}</td><td>Taux de satisfaction appréciation des bénéficiaires</td><td>${satisfactionN1}</td>`;
  mois.forEach((_, i) => { html += `<td>${countPerMonth[i] > 0 ? "100%" : ""}</td>`; });
  html += `<td>${isVAE 
    ? `${o.nom} est nouvel entrant sur l'activité VAE. ${nbStagiaires} ${nbStagiaires > 1 ? labelBeneficiaires : labelBeneficiaire} accompagné${nbStagiaires > 1 ? "s" : ""} pour l'année ${annee}. Les indicateurs seront renseignés au fur et à mesure de l'activité et diffusés dès qu'ils seront significatifs.`
    : `${f.intitule || o.nom} a reçu ${nbStagiaires} ${nbStagiaires > 1 ? labelBeneficiaires : labelBeneficiaire} pour l'année ${annee}. Nous avons été noté 10/10 sur le taux de satisfaction pour l'année ${annee} au critère 7.30. Nous communiquerons cet élément de diffusion sur notre programme de formation${o.siteWeb && o.siteWeb.trim() ? ` et sur notre site internet (${o.siteWeb})` : ''}.`}</td></tr>`;

  // Nombre de bénéficiaires row
  html += `<tr><td>Nombre de ${labelBeneficiaires}</td><td>${isVAE ? "0 – Nouvel entrant" : "0"}</td>`;
  mois.forEach((_, i) => { html += `<td>${countPerMonth[i] > 0 ? countPerMonth[i] : ""}</td>`; });
  html += `<td>${isVAE ? `Nouvel entrant VAE – aucun ${labelBeneficiaire} accompagné en ${anneeN1}. Objectif prévisionnel ${annee} : ≥ 5 ${labelBeneficiaires}.` : ""}</td></tr>`;

  // Taux de réussite row (VAE specific: certification obtenue)
  const labelReussite = isVAE ? "Taux de validation (certification obtenue)" : "Taux de réussite";
  html += `<tr><td>${labelReussite}</td><td>${isVAE ? "0 – Nouvel entrant" : "0"}</td>`;
  mois.forEach((_, i) => { html += `<td>${countPerMonth[i] > 0 ? "100%" : ""}</td>`; });
  html += `<td>${isVAE ? `Nouvel entrant – aucun historique en ${anneeN1}. ${nbStagiaires} ${labelBeneficiaire}${nbStagiaires > 1 ? "s" : ""} en cours de validation pour ${annee}. Objectif prévisionnel : taux de validation totale ≥ 70%.` : ""}</td></tr>`;

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

export function generateExcelIndicateursPrevisionnelsVAE(o: OrganismeInfo, f: FormationInfo): string {
  const annee = new Date().getFullYear();
  let html = tableRow(["Indicateur", "Méthode de calcul", "Objectif 2026", "Périodicité de suivi", "Seuil d'alerte", "Action corrective prévue si objectif non atteint"], true);
  const data: string[][] = [
    ["Nombre de candidats accompagnés", "Comptage des conventions d'accompagnement signées", "≥ 5 candidats", "Trimestriel", "< 2 candidats / trimestre", "Renforcement de la communication (site, réseaux, partenaires CEP/Pôle emploi), participation à des salons professionnels esthétique"],
    ["Taux de satisfaction des candidats", "Questionnaires de satisfaction – notes ≥ 4/5 / total répondants × 100", "≥ 90%", "À chaque fin d'accompagnement", "< 80%", "Analyse des retours, entretien individuel avec les candidats insatisfaits, adaptation des méthodes d'accompagnement"],
    ["Taux de complétude des dossiers", "Dossiers complets au 1er dépôt / total dossiers déposés × 100", "≥ 85%", "À chaque dépôt de dossier", "< 70%", "Renforcement de l'accompagnement rédactionnel, checklist de contrôle, relecture systématique avant dépôt"],
    ["Taux de présentation au jury", "Candidats présentés au jury / candidats accompagnés × 100", "≥ 80%", "Annuel", "< 60%", "Suivi renforcé des candidats à risque, entretiens de remotivation, aménagement du planning"],
    ["Taux de validation totale", "Validations totales / candidats présentés au jury × 100", "≥ 70%", "Annuel", "< 50%", "Analyse des dossiers non validés, renforcement de la préparation jury, simulation d'entretien supplémentaire"],
    ["Taux de validation partielle", "Validations partielles / candidats présentés × 100", "≤ 25%", "Annuel", "> 30%", "Accompagnement complémentaire ciblé sur les blocs non validés, plan d'action personnalisé"],
    ["Taux d'abandon", "Abandons / candidats ayant débuté l'accompagnement × 100", "≤ 10%", "Trimestriel", "> 15%", "Entretiens de prévention dès le 2e signal d'alerte, aménagement du rythme, plan de remédiation individualisé"],
    ["Délai moyen de réponse aux demandes", "Moyenne des délais entre réception et 1ère réponse", "≤ 48h ouvrées", "Mensuel", "> 72h", "Mise en place d'un accusé de réception automatique, organisation de permanences dédiées"],
    ["Taux de recommandation (NPS)", "Candidats recommandant l'organisme / total interrogés × 100", "≥ 80%", "Annuel (enquête post-jury)", "< 60%", "Analyse qualitative des freins à la recommandation, plan d'amélioration de l'expérience candidat"],
    ["Taux de traitement des réclamations < 15 jours", "Réclamations traitées sous 15 jours / total réclamations × 100", "100%", "En continu", "< 90%", "Revue de la procédure de réclamation, nomination d'un référent dédié"],
  ];
  data.forEach(r => html += tableRow(r));

  // Second sheet: planning de suivi trimestriel
  let html2 = tableRow(["Trimestre", "Actions de suivi prévues", "Indicateurs à mesurer", "Responsable", "Statut"], true);
  const planning: string[][] = [
    ["T1 2026 (jan-mars)", "Lancement activité, premiers accompagnements, mise en place des outils de suivi", "Nb candidats, taux de satisfaction", o.responsablePedagogique || o.dirigeant, "À renseigner"],
    ["T2 2026 (avr-juin)", "Suivi des premiers dossiers, ajustements méthodologiques", "Nb candidats, complétude dossiers, taux d'abandon", o.responsablePedagogique || o.dirigeant, "À renseigner"],
    ["T3 2026 (juil-sept)", "Bilan semestriel, premières présentations jury", "Taux présentation jury, satisfaction, recommandation", o.responsablePedagogique || o.dirigeant, "À renseigner"],
    ["T4 2026 (oct-déc)", "Bilan annuel, diffusion des résultats, plan d'amélioration", "Tous indicateurs – bilan complet", o.referentQualite || o.dirigeant, "À renseigner"],
  ];
  planning.forEach(r => html2 += tableRow(r));

  return excelWrap(`INDICATEURS PRÉVISIONNELS VAE – NOUVEL ENTRANT ${annee}`, [
    { name: "Indicateurs prévisionnels", html },
    { name: "Planning suivi", html: html2 }
  ]);
}

export function generateExcelSuiviInscriptions(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const headers = ["SITUATION AVANT DÉMARRAGE FORMATION", "CIVILITÉ", "NOM", "PRÉNOM", "DATE DE NAISSANCE", "PAYS DE NAISSANCE", "INSCRIT SOUS QUEL STATUT", "COMMUNE", "ADRESSE", "CODE POSTAL", "TÉLÉPHONE", "MAIL", "INTITULÉ DE LA FORMATION", "DIPLÔME VISÉ", "DATE DÉBUT DE FORMATION", "DATE DE FIN DE FORMATION", "COMMENTAIRE OBSERVATION"];
  let html = tableRow(headers, true);
  stagiaires.slice(0, 15).forEach((s, i) => {
    html += tableRow([
      i === 0 ? "Demandeur d'emploi" : i === 1 ? "Salarié" : "",
      s.civilite || "",
      s.nom,
      s.prenom,
      formatDate(s.dateNaissance),
      "France",
      "Apprenti",
      o.ville || "",
      "",
      o.codePostal || "",
      s.telephone || "",
      s.email || "",
      f.intitule || "",
      f.intitule || "",
      formatDate(f.dateDebut),
      formatDate(f.dateFin),
      ""
    ]);
  });
  // Add empty rows for manual entry
  for (let i = 0; i < 15; i++) {
    html += tableRow(headers.map(() => ""));
  }
  return excelWrap(`SUIVI DES INSCRIPTIONS ${new Date().getFullYear()}-${new Date().getFullYear() + 1} ${o.nom}`, [{ name: "Inscriptions", html }]);
}

// ===== TABLEAU DE SUIVI DU PARCOURS BÉNÉFICIAIRES ET ADAPTATION (CFA IND 10) =====
export function generateExcelSuiviParcoursBeneficiairesCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const today = "31/03/2026";
  const stags = stagiaires.length > 0 ? stagiaires : [{ prenom: "Martin", nom: "Dupont", civilite: "M." as const, email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "" }];

  // Calculate number of weeks from formation dates (default 52)
  let nbWeeks = 52;
  if (f.dateDebut && f.dateFin) {
    const start = new Date(f.dateDebut);
    const end = new Date(f.dateFin);
    const diffMs = end.getTime() - start.getTime();
    nbWeeks = Math.max(1, Math.ceil(diffMs / (7 * 24 * 60 * 60 * 1000)));
  }

  // Generate week headers (S1, S2, ... Sn)
  const weekHeaders = Array.from({ length: nbWeeks }, (_, i) => `<th>S${i + 1}</th>`).join("");
  const weekCells = Array.from({ length: nbWeeks }, () => `<td>P</td>`).join("");

  let html = `<table>`;
  // Title row
  const totalCols = 16 + nbWeeks + 10;
  html += `<tr><td class="title" colspan="8">${o.nom}</td><td colspan="5"></td><td>Version à jour au :</td><td colspan="2">${today}</td></tr>`;
  html += `<tr><td colspan="${totalCols}"></td></tr>`;
  // Section headers
  html += `<tr class="header-row">
    <td colspan="4" style="text-align:center;font-weight:bold">FICHE D'IDENTITÉ DES BÉNÉFICIAIRES</td>
    <td></td>
    <td colspan="3" style="text-align:center;font-weight:bold">STATUT</td>
    <td colspan="3" style="text-align:center;font-weight:bold">FORMATION</td>
    <td colspan="3" style="text-align:center;font-weight:bold">Suivi de l'adaptation à l'accompagnement</td>
    <td colspan="${nbWeeks + 1}" style="text-align:center;font-weight:bold">PRÉSENCE PAR SEMAINE DE FORMATION</td>
    <td colspan="2" style="text-align:center;font-weight:bold">INTERRUPTION</td>
    <td colspan="2" style="text-align:center;font-weight:bold">TEST FINAL</td>
    <td colspan="2" style="text-align:center;font-weight:bold">Questionnaire satisfaction</td>
    <td colspan="4" style="text-align:center;font-weight:bold">GRILLE D'ÉVALUATION</td>
  </tr>`;
  // Column headers
  html += `<tr>
    <th>Nom</th><th>Nom de jeune fille</th><th>Prénom</th><th>Sexe</th><th>Date de naissance</th><th>Lieu de naissance</th><th>Adresse</th>
    <th>Prise en charge</th><th>Nature</th><th>Observations</th>
    <th>Date d'entrée</th><th>Date de sortie</th>
    <th>Date</th><th>Problème rencontré</th><th>Adaptation</th><th>Suivi</th>
    ${weekHeaders}<th>Total</th>
    <th>Oui/Non</th><th>Cause</th>
    <th>QCM</th><th>Envoyé</th>
    <th>À chaud</th><th>Relance</th><th>À froid</th><th>Relance</th>
  </tr>`;

  stags.forEach(s => {
    html += `<tr>
      <td>${s.nom}</td><td></td><td>${s.prenom}</td><td>${s.civilite === 'M.' ? 'M' : 'F'}</td>
      <td>${s.dateNaissance || ''}</td><td></td><td></td>
      <td>OPCO</td><td>Apprentissage</td><td></td>
      <td>${f.dateDebut ? formatDate(f.dateDebut) : ''}</td><td>${f.dateFin ? formatDate(f.dateFin) : ''}</td>
      <td></td><td></td><td></td><td></td>
      ${weekCells}<td>${nbWeeks}/${nbWeeks}</td>
      <td>Non</td><td></td>
      <td class="green">Validé</td><td>Oui</td>
      <td>Oui</td><td></td><td>Oui</td><td></td>
    </tr>`;
  });

  html += `</table>`;
  return excelWrap(`SUIVI PARCOURS BÉNÉFICIAIRES ${o.nom}`, [{ name: "Suivi Parcours", html }]);
}

// ========== IND 12 — Suivi du public et du bénéficiaire (Excel) ==========
export function generateExcelSuiviPublicBeneficiaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  let html = `<table border="1" cellspacing="0" cellpadding="4">`;
  html += `<tr><td colspan="7" style="font-size:14pt;font-weight:bold;background:#1e3a7b;color:#fff;padding:10px">${o.nom} – Cahier de contact</td></tr>`;
  html += `<tr style="background:#e8f0fe;font-weight:bold"><th style="border:1px solid #999;padding:6px">Date</th><th style="border:1px solid #999;padding:6px">Thème</th><th style="border:1px solid #999;padding:6px">Raison sociale</th><th style="border:1px solid #999;padding:6px">Identité</th><th style="border:1px solid #999;padding:6px">Email</th><th style="border:1px solid #999;padding:6px">Tél</th><th style="border:1px solid #999;padding:6px">Résumé des échanges</th></tr>`;
  for (let i = 0; i < 20; i++) {
    html += `<tr>${Array.from({length:7}, () => '<td style="border:1px solid #999;padding:6px">&nbsp;</td>').join('')}</tr>`;
  }
  html += `</table>`;
  return excelWrap(`Cahier de contact ${o.nom}`, [{ name: "Cahier de contact", html }]);
}

// ========== IND 12 — Tableau de suivi PFMP (Excel) ==========
export function generateExcelSuiviPFMP(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  let html = `<table border="1" cellspacing="0" cellpadding="4">`;
  html += `<tr><td colspan="16" style="font-size:14pt;font-weight:bold;background:#1e3a7b;color:#fff;padding:10px">SUIVI PFMP – ${o.nom}</td></tr>`;
  html += `<tr><td colspan="4" style="padding:6px;border:1px solid #999"><strong>Établissement :</strong> ${o.nom}</td><td colspan="4" style="padding:6px;border:1px solid #999"><strong>Diplôme :</strong> ${f.intitule}</td><td colspan="8" style="padding:6px;border:1px solid #999"><strong>Session :</strong> ${new Date().getFullYear()}</td></tr>`;
  html += `<tr style="background:#e8f0fe;font-weight:bold"><th style="border:1px solid #999;padding:6px">Noms des Élèves</th><th style="border:1px solid #999;padding:6px">P1</th><th style="border:1px solid #999;padding:6px">P2</th><th style="border:1px solid #999;padding:6px">P3</th><th style="border:1px solid #999;padding:6px">P4</th><th style="border:1px solid #999;padding:6px">P5</th><th style="border:1px solid #999;padding:6px">P6</th><th style="border:1px solid #999;padding:6px">Jours certif.</th><th style="border:1px solid #999;padding:6px">Jours à récupérer</th><th style="border:1px solid #999;padding:6px">Rattrapage</th><th style="border:1px solid #999;padding:6px">Conformité</th></tr>`;
  stagiaires.forEach(s => {
    html += `<tr><td style="border:1px solid #999;padding:6px">${s.prenom} ${s.nom}</td>`;
    for (let i = 0; i < 10; i++) html += `<td style="border:1px solid #999;padding:6px">&nbsp;</td>`;
    html += `</tr>`;
  });
  for (let i = 0; i < Math.max(0, 10 - stagiaires.length); i++) {
    html += `<tr>${Array.from({length:11}, () => '<td style="border:1px solid #999;padding:6px">&nbsp;</td>').join('')}</tr>`;
  }
  html += `</table>`;
  return excelWrap(`Suivi PFMP ${o.nom}`, [{ name: "Formations 3 ans", html }, { name: "Formations 2 ans", html }]);
}

// ========== IND 13 — Outils de suivi alternance (Excel) ==========
export function generateExcelOutilsSuiviAlternance(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  // Sheet 1 - Informations générales
  let infoHtml = `<table border="1" cellspacing="0" cellpadding="4">`;
  infoHtml += `<tr><td colspan="6" style="font-size:14pt;font-weight:bold;background:#1e3a7b;color:#fff;padding:10px">INFORMATIONS GÉNÉRALES</td></tr>`;
  infoHtml += `<tr><td colspan="6" style="padding:6px;border:1px solid #999;font-style:italic">Document à compléter à la fin de chaque période (à l'école ou en entreprise)</td></tr>`;
  const s0 = stagiaires[0];
  infoHtml += `<tr><td colspan="2" style="padding:6px;border:1px solid #999"><strong>Nom de l'entreprise :</strong></td><td colspan="4" style="padding:6px;border:1px solid #999">${s0?.entreprise || ''}</td></tr>`;
  infoHtml += `<tr><td colspan="2" style="padding:6px;border:1px solid #999"><strong>Nom de l'apprenti :</strong></td><td colspan="4" style="padding:6px;border:1px solid #999">${s0 ? s0.prenom + ' ' + s0.nom : ''}</td></tr>`;
  infoHtml += `<tr><td colspan="2" style="padding:6px;border:1px solid #999"><strong>Nom du tuteur :</strong></td><td colspan="4" style="padding:6px;border:1px solid #999">${o.responsablePedagogique}</td></tr>`;
  infoHtml += `<tr><td colspan="2" style="padding:6px;border:1px solid #999"><strong>Nom de l'organisme :</strong></td><td colspan="4" style="padding:6px;border:1px solid #999">${o.nom}</td></tr>`;
  infoHtml += `<tr><td colspan="2" style="padding:6px;border:1px solid #999"><strong>Référent pédagogique :</strong></td><td colspan="4" style="padding:6px;border:1px solid #999">${o.responsablePedagogique}</td></tr>`;
  infoHtml += `</table>`;

  // Sheet 2 - Entretien fin de période d'essai
  let entretienHtml = `<table border="1" cellspacing="0" cellpadding="4">`;
  entretienHtml += `<tr><td colspan="6" style="font-size:14pt;font-weight:bold;background:#1e3a7b;color:#fff;padding:10px">ENTRETIEN DE FIN DE PÉRIODE D'ESSAI</td></tr>`;
  entretienHtml += `<tr><td colspan="6" style="padding:6px;border:1px solid #999;font-style:italic">Se référer aux compétences visées par la qualification</td></tr>`;
  entretienHtml += `<tr style="background:#e8f0fe;font-weight:bold"><th style="border:1px solid #999;padding:6px">Compétences à développer</th><th style="border:1px solid #999;padding:6px">Activités à réaliser</th><th style="border:1px solid #999;padding:6px">Lieu</th><th style="border:1px solid #999;padding:6px">Date entretien</th><th style="border:1px solid #999;padding:6px">Évaluation</th><th style="border:1px solid #999;padding:6px">Observations</th></tr>`;
  for (let i = 0; i < 10; i++) {
    entretienHtml += `<tr>${Array.from({length:6}, () => '<td style="border:1px solid #999;padding:6px">&nbsp;</td>').join('')}</tr>`;
  }
  entretienHtml += `</table>`;

  // Sheet 3 - Bilan intermédiaire
  let bilanHtml = `<table border="1" cellspacing="0" cellpadding="4">`;
  bilanHtml += `<tr><td colspan="6" style="font-size:14pt;font-weight:bold;background:#1e3a7b;color:#fff;padding:10px">BILAN INTERMÉDIAIRE</td></tr>`;
  bilanHtml += `<tr style="background:#e8f0fe;font-weight:bold"><th style="border:1px solid #999;padding:6px">Compétences</th><th style="border:1px solid #999;padding:6px">Activités</th><th style="border:1px solid #999;padding:6px">Lieu</th><th style="border:1px solid #999;padding:6px">Date</th><th style="border:1px solid #999;padding:6px">Évaluation</th><th style="border:1px solid #999;padding:6px">Observations</th></tr>`;
  for (let i = 0; i < 10; i++) {
    bilanHtml += `<tr>${Array.from({length:6}, () => '<td style="border:1px solid #999;padding:6px">&nbsp;</td>').join('')}</tr>`;
  }
  bilanHtml += `</table>`;

  // Sheet 4 - Bilan final
  let finalHtml = `<table border="1" cellspacing="0" cellpadding="4">`;
  finalHtml += `<tr><td colspan="6" style="font-size:14pt;font-weight:bold;background:#1e3a7b;color:#fff;padding:10px">BILAN FINAL</td></tr>`;
  finalHtml += `<tr style="background:#e8f0fe;font-weight:bold"><th style="border:1px solid #999;padding:6px">Compétences</th><th style="border:1px solid #999;padding:6px">Activités</th><th style="border:1px solid #999;padding:6px">Lieu</th><th style="border:1px solid #999;padding:6px">Date</th><th style="border:1px solid #999;padding:6px">Évaluation</th><th style="border:1px solid #999;padding:6px">Observations</th></tr>`;
  for (let i = 0; i < 10; i++) {
    finalHtml += `<tr>${Array.from({length:6}, () => '<td style="border:1px solid #999;padding:6px">&nbsp;</td>').join('')}</tr>`;
  }
  finalHtml += `</table>`;

  return excelWrap(`Outils de suivi ${o.nom}`, [
    { name: "Informations générales", html: infoHtml },
    { name: "Entretien fin période essai", html: entretienHtml },
    { name: "Bilan intermédiaire", html: bilanHtml },
    { name: "Bilan final", html: finalHtml },
  ]);
}

// Helper to generate Excel blob
export function excelToBlob(htmlContent: string): Blob {
  return new Blob(["\ufeff", htmlContent], { type: "application/vnd.ms-excel" });
}
