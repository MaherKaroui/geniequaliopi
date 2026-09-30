// Excel/XLSX generation using HTML table format (.xls)
// This generates HTML tables that open correctly in Excel with formatting

import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { formatDate, isFormationTerminee, getStagiaireDateDebut, getStagiaireDateFin, isFacebookPage } from "./docBuilder";
import { EVAL_SCORES, getFormationDays, parseDuree } from "./sampleData";
import { getEvalContent } from "./evalContent";
import { getEvalBesoinsFinancement, getCFAWeekDates, parseRythmeAlternance } from "./documentGenerator";
import { getRNCPByCode } from "./rncpData";
import { getSatisfactionLabel, getAssiduiteLabel, getNombreStagiairesFormes, getTauxObtention, getCommentaireIndicateurs, getRepartitionParAnnee, NON_COLLECTE } from "./indicateursResultats";

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
  stagiaires.forEach((s, i) => {
    html += tableRow([`${i + 1}`, s.nom, s.prenom, s.email, s.telephone, s.entreprise, s.poste, formatDate(s.dateNaissance), "✅ Inscrit"]);
  });
  return excelWrap(`Suivi stagiaires – ${f.intitule}`, [{ name: "Stagiaires", html }]);
}

export function generateExcelAssiduite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const jours = ["Jour 1", "Jour 2", "Jour 3", "Jour 4", "Jour 5"];
  let html = tableRow(["Stagiaire", ...jours, "Total heures", "Taux présence"], true);
  stagiaires.forEach((s, i) => {
    // Synchronized: 100% attendance for all (matches émargement)
    const presences = jours.map(() => "P");
    const total = jours.length * 7;
    html += tableRow([s.prenom + " " + s.nom, ...presences, `${total}h`, "100%"]);
  });
  return excelWrap(`Assiduité – ${f.intitule}`, [{ name: "Assiduité", html }]);
}

export function generateExcelEvaluations(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const evalData = getEvalContent(f.intitule);
  const termine = isFormationTerminee(f, stagiaires);
  let html = tableRow(["Stagiaire", "Positionnement", "Intermédiaire", "Finale", "Moyenne", "Progression", "Résultat"], true);
  stagiaires.forEach((s, i) => {
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
  const termine = isFormationTerminee(f, stagiaires);
  const criteres = ["Accueil", "Objectifs", "Contenu", "Pédagogie", "Formateur", "Supports", "Durée", "Recommandation"];
  let html = tableRow(["Stagiaire", ...criteres, "Moyenne"], true);
  stagiaires.forEach((s, i) => {
    if (termine) {
      const scores = criteres.map((_, ci) => 4 + ((i + ci) % 2));
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10;
      html += tableRow([s.prenom + " " + s.nom, ...scores.map(v => `${v}/5`), `${avg}/5`]);
    } else {
      html += tableRow([s.prenom + " " + s.nom, ...criteres.map(() => ""), ""]);
    }
  });
  if (termine) {
    html += tableRow(["MOYENNE", ...criteres.map((_, ci) => { const vals = stagiaires.map((_, i) => 4 + ((i + ci) % 2)); return `${(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1)}/5`; }), "4.5/5"]);
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
  const termine = isFormationTerminee(f, stagiaires);
  let html = tableRow(["Stagiaire", ...evalData.competences, "Moyenne", "Statut"], true);
  stagiaires.forEach((s, i) => {
    if (termine) {
      const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
      const scores = evalData.competences.map((_, ci) => Math.min(10, sc[ci % sc.length] + 2));
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10;
      html += tableRow([s.prenom + " " + s.nom, ...scores.map(v => `${v}/10`), `${avg}/10`, avg >= 7 ? "✅ Acquis" : "🔄 En cours"]);
    } else {
      html += tableRow([s.prenom + " " + s.nom, ...evalData.competences.map(() => "—"), "—", "📋 En cours de formation"]);
    }
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
  const termine = isFormationTerminee(f, stagiaires);
  let html = tableRow(["N°", "Apprenti", "Entreprise", "MA", "Assiduité CFA", "Assiduité Ent.", "Note CFA", "Éval MA", "Visite 1", "Visite 2", "Statut"], true);
  stagiaires.forEach((s, i) => {
    const sc = EVAL_SCORES[i] || [7, 8, 7, 8, 7];
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    const avgMA = Math.round(sc.map(v => Math.min(10, v + 1)).reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    html += tableRow([`${i+1}`, s.prenom + " " + s.nom, s.entreprise, f.formateur, "100%", "100%", `${avg}/10`, `${avgMA}/10`, "✅", termine ? "✅" : "📋", termine ? "✅ Terminé" : "✅ En cours"]);
  });
  return excelWrap(`Suivi apprentis – ${f.intitule}`, [{ name: "Apprentis", html }]);
}

export function generateExcelSuiviEntreprises(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const entreprises = [...new Set(stagiaires.map(s => s.entreprise).filter(Boolean))];
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
  const isCFA = o.typesActions?.includes('apprentissage') || !!(f.rythmeAlternance && f.rythmeAlternance.trim().length > 0);
  const nbStagiaires = stagiaires.filter(s => s.nom && s.nom.trim()).length || 1;
  const labelBeneficiaire = isVAE ? "candidat" : (isCFA ? "apprenti" : "stagiaire");
  const labelBeneficiaires = isVAE ? "candidats" : (isCFA ? "apprentis" : "stagiaires");
  const labelAction = isVAE ? "Accompagnement VAE" : (isCFA ? "Formation par apprentissage" : "Action de formation");

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

  const termine = isFormationTerminee(f, stagiaires);
  const enCours = "En cours – formation non terminée";

  // ═══ Variante CFA — Tableau synthétique 9 indicateurs ═══
  if (isCFA) {
    let cfaHtml = `<tr><th>Indicateur</th><th>Résultat ${annee}</th><th>Commentaire</th></tr>`;
    const rows: Array<[string, string, string]> = termine ? [
      ["Taux de satisfaction globale", "100%", `Enquête de fin de formation – ${nbStagiaires} ${labelBeneficiaire}${nbStagiaires > 1 ? "s" : ""} – note moyenne 10/10.`],
      [`Nombre de ${labelBeneficiaires}`, String(nbStagiaires), `${nbStagiaires} ${labelBeneficiaire}${nbStagiaires > 1 ? "s" : ""} formé${nbStagiaires > 1 ? "s" : ""} sur la formation ${f.intitule || ""}.`],
      ["Taux de réussite à la certification", "100%", `${nbStagiaires}/${nbStagiaires} ${labelBeneficiaire}${nbStagiaires > 1 ? "s certifiés" : " certifié"}.`],
      ["Taux national", "82%", "Donnée publiée par France Compétences (InserJeunes) – mise à jour annuelle."],
      ["Taux de retour enquêtes", "100%", `Tous les ${labelBeneficiaires} ont répondu à l'enquête de satisfaction.`],
      ["Taux d'abandon", "0%", "Aucun abandon constaté. Suivi pédagogique renforcé."],
      ["Taux d'interruption de parcours", "0%", "Aucune interruption sur la promotion."],
      ["Taux d'insertion professionnelle", "85%", "Enquête à 6 mois après la sortie de formation (référentiel InserJeunes)."],
      ["Taux de rupture en alternance", "0%", "Aucune rupture sur la promotion – objectif < 10%."],
    ] : [
      ["Taux de satisfaction globale", enCours, "Enquête à administrer en fin de formation."],
      [`Nombre de ${labelBeneficiaires} inscrits`, String(nbStagiaires), `Promotion ${annee} en cours sur la formation ${f.intitule || ""}.`],
      ["Taux de réussite à la certification", enCours, "Disponible à l'issue des examens / soutenances."],
      ["Taux national", "82%", "Donnée publiée par France Compétences (InserJeunes) – mise à jour annuelle."],
      ["Taux de retour enquêtes", enCours, "Enquête de satisfaction à administrer en fin de formation."],
      ["Taux d'abandon", "0% (à date)", "Aucun abandon constaté à ce jour – suivi pédagogique en cours."],
      ["Taux d'interruption de parcours", "0% (à date)", "Aucune interruption à ce jour."],
      ["Taux d'insertion professionnelle", enCours, "Mesuré à 6 mois après la sortie de formation."],
      ["Taux de rupture en alternance", "0% (à date)", "Aucune rupture à ce jour – objectif < 10%."],
    ];
    rows.forEach(([ind, res, com]) => {
      cfaHtml += `<tr><td>${ind}</td><td>${res}</td><td>${com}</td></tr>`;
    });
    return excelWrap(`TABLEAU DE BORD INDICATEURS DE PERFORMANCE CFA – ${annee}`, [{ name: "Indicateurs CFA", html: cfaHtml }]);
  }

  // ═══ Variante Action de formation — valeurs saisies uniquement ═══
  if (!isVAE && !isCFA) {
    const repartition = getRepartitionParAnnee(f, stagiaires.filter(s => s.nom && s.nom.trim()));
    const sat = getSatisfactionLabel(f);
    const ass = getAssiduiteLabel(f);
    const obt = getTauxObtention(f);
    const com = getCommentaireIndicateurs(f);
    const nbF = getNombreStagiairesFormes(f);
    const anneeTitre = (f.anneeIndicateurs || "").trim() || (repartition.length ? repartition.map(r => r.annee).join(" / ") : String(annee));

    let afHtml = "";
    repartition.forEach(r => {
      afHtml += tableRow([`${labelAction} – ${r.annee}`, "Indicateur", ...mois.map(m => `${m}-${String(r.annee).slice(2)}`), "Commentaires / analyse"], true);
      afHtml += tableRow([f.intitule || o.nom, `Nombre de ${labelBeneficiaires}`, ...r.parMois.map(n => n > 0 ? String(n) : ""), `${r.total} ${r.total > 1 ? labelBeneficiaires : labelBeneficiaire} sur l'année ${r.annee}.`]);
      afHtml += tableRow(["", "Taux de satisfaction appréciation des bénéficiaires", ...mois.map(() => ""), sat || NON_COLLECTE]);
      afHtml += tableRow([...Array(15).fill("")]);
    });
    if (!repartition.length) {
      afHtml += tableRow(["Aucune date de session renseignée : répartition mensuelle non établie."]);
    }
    afHtml += tableRow(["Synthèse", "Indicateur", "Résultat"], true);
    afHtml += tableRow(["", "Taux de satisfaction", sat || NON_COLLECTE]);
    afHtml += tableRow(["", "Taux d'assiduité", ass || NON_COLLECTE]);
    afHtml += tableRow(["", `Nombre de ${labelBeneficiaires} formés`, nbF || (repartition.length ? String(repartition.reduce((a, r) => a + r.total, 0)) : NON_COLLECTE)]);
    afHtml += tableRow(["", "Taux d'obtention de la certification", obt ? `${obt.taux}% (${obt.admis}/${obt.presentes})` : "Non disponible"]);
    if (com) afHtml += tableRow(["", "Commentaire", com]);

    return excelWrap(`TABLEAU DE BORD INDICATEURS DE PERFORMANCE – ${anneeTitre}`, [{ name: "Tableau de bord", html: afHtml }]);
  }

  // Header row with Année n-1 column
  let html = `<tr><th>${labelAction}</th><th>Indicateur</th><th>Année n-1 (${anneeN1})</th>`;
  mois.forEach(m => { html += `<th>${m}-${String(annee).slice(2)}</th>`; });
  html += `<th>Commentaires / analyse</th></tr>`;

  // Cell value: terminated months show value, future/ongoing months show "En cours"
  const monthIsPast = (mIdx: number): boolean => {
    // Consider a month "past" if formation is fully terminated OR globally terminated
    if (termine) return countPerMonth[mIdx] > 0;
    return false;
  };
  const satCell = (mIdx: number) => countPerMonth[mIdx] > 0 ? (monthIsPast(mIdx) ? "90%" : "En cours") : "";
  const reuCell = (mIdx: number) => countPerMonth[mIdx] > 0 ? (monthIsPast(mIdx) ? "100%" : "En cours") : "";

  // Taux de satisfaction row
  const satisfactionN1 = isVAE ? "N/A – Phase de lancement" : "";
  html += `<tr><td rowspan="3">${f.intitule || o.nom}</td><td>Taux de satisfaction appréciation des bénéficiaires</td><td>${satisfactionN1}</td>`;
  mois.forEach((_, i) => { html += `<td>${satCell(i)}</td>`; });
  html += `<td>${isVAE 
    ? `${o.nom} est en phase de lancement sur l'activité VAE. ${nbStagiaires} ${nbStagiaires > 1 ? labelBeneficiaires : labelBeneficiaire} accompagné${nbStagiaires > 1 ? "s" : ""} pour l'année ${annee}. Les indicateurs seront renseignés au fur et à mesure de l'activité et diffusés dès qu'ils seront significatifs.`
    : (termine
        ? `${f.intitule || o.nom} a reçu ${nbStagiaires} ${nbStagiaires > 1 ? labelBeneficiaires : labelBeneficiaire} pour l'année ${annee}. Nous avons été noté 9/10 sur le taux de satisfaction pour l'année ${annee} au critère 7.30. Nous communiquerons cet élément de diffusion sur notre programme de formation${o.siteWeb && o.siteWeb.trim() ? ` et sur ${isFacebookPage(o.siteWeb) ? 'notre page Facebook' : 'notre site internet'} (${o.siteWeb})` : ''}.`
        : `Formation en cours – ${nbStagiaires} ${nbStagiaires > 1 ? labelBeneficiaires : labelBeneficiaire} inscrit${nbStagiaires > 1 ? "s" : ""}. Les indicateurs définitifs seront consolidés à l'issue de la session et publiés${o.siteWeb && o.siteWeb.trim() ? ` sur ${isFacebookPage(o.siteWeb) ? 'notre page Facebook' : 'notre site internet'} (${o.siteWeb})` : ''}.`)}</td></tr>`;

  // Nombre de bénéficiaires row
  html += `<tr><td>Nombre de ${labelBeneficiaires}</td><td>${isVAE ? "0 – Phase de lancement" : "0"}</td>`;
  mois.forEach((_, i) => { html += `<td>${countPerMonth[i] > 0 ? countPerMonth[i] : ""}</td>`; });
  html += `<td>${isVAE ? `Phase de lancement VAE – aucun ${labelBeneficiaire} accompagné en ${anneeN1}. Objectif prévisionnel ${annee} : ≥ 5 ${labelBeneficiaires}.` : ""}</td></tr>`;

  // Taux de réussite row (VAE specific: certification obtenue)
  const labelReussite = isVAE ? "Taux de validation (certification obtenue)" : "Taux de réussite";
  html += `<tr><td>${labelReussite}</td><td>${isVAE ? "0 – Phase de lancement" : "0"}</td>`;
  mois.forEach((_, i) => { html += `<td>${reuCell(i)}</td>`; });
  html += `<td>${isVAE ? `Phase de lancement – aucun historique en ${anneeN1}. ${nbStagiaires} ${labelBeneficiaire}${nbStagiaires > 1 ? "s" : ""} en cours de validation pour ${annee}. Objectif prévisionnel : taux de validation totale ≥ 70%.` : ""}</td></tr>`;

  return excelWrap(`TABLEAU DE BORD INDICATEURS DE PERFORMANCE – ${annee}`, [{ name: "Tableau de bord", html }]);
}

export function generateExcelTableauSuiviParcours(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const days = getFormationDays(f);
  const isAlternance = !!(f.rythmeAlternance && f.rythmeAlternance.trim().length > 0);
  const natureValue = isAlternance ? 'Alternance' : 'Action de formation';

  // Organisme header (SIRET / NDA) — affiché comme dans les autres documents
  const orgHeaderCells = [
    `<strong>${o.nom || ''}</strong>`,
    o.siret ? `SIRET : ${o.siret}` : '',
    o.nda ? `NDA : ${o.nda}` : '',
  ].filter(Boolean).join(' &nbsp;·&nbsp; ');
  let html = `<tr><td colspan="25" style="background:#e8f0fe;color:#1e3a7b;font-weight:bold;padding:8px 12px;border:1px solid #1e3a7b">${orgHeaderCells}</td></tr>`;

  // Header row
  html += `<tr>`;
  html += `<th>Nom</th><th>Prénom</th><th>Sexe</th><th>Prise en charge</th><th>Nature</th><th>Handicap</th><th>Observations</th>`;
  html += `<th>Date entrée</th><th>Date sortie</th>`;
  html += `<th>Date adaptation</th><th>Adaptations nécessaires</th><th>Difficultés</th><th>Suivi</th>`;
  days.slice(0, 12).forEach((_, i) => { html += `<th>JS${i + 1}</th>`; });
  html += `<th>Interruption</th><th>Cause</th>`;
  html += `<th>QCM</th><th>Test réussite</th><th>Satisfaction</th>`;
  html += `</tr>`;

  stagiaires.forEach((s, si) => {
    const sc = EVAL_SCORES[si] || [7, 8, 7, 8, 7];
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    // Sexe basé sur la civilité (et non sur la terminaison du prénom)
    const civ = (s.civilite || '').toLowerCase().trim();
    const isF = civ.startsWith('mme') || civ.startsWith('mad') || civ.includes('madame');
    const sexe = civ ? (isF ? 'F' : 'M.') : (s.prenom?.endsWith('a') || s.prenom?.endsWith('e') ? 'F' : 'M.');
    const presences = days.slice(0, 12).map(() => 'X');
    const financement = getEvalBesoinsFinancement(s, f, o, si);
    html += tableRow([
      s.nom?.toUpperCase() || '', s.prenom?.toUpperCase() || '', sexe,
      financement,
      natureValue, 'non', '',
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
  let html = tableRow(["Indicateur", "Méthode de calcul", `Objectif ${annee}`, "Périodicité de suivi", "Seuil d'alerte", "Action corrective prévue si objectif non atteint"], true);
  const data: string[][] = [
    ["Nombre de candidats accompagnés", "Comptage des conventions d'accompagnement signées", "≥ 5 candidats", "Trimestriel", "< 2 candidats / trimestre", "Renforcement de la communication (site, réseaux, conseillers en évolution professionnelle, France Travail, plateforme vae.gouv.fr)"],
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
    [`T1 ${annee} (jan-mars)`, "Lancement activité, premiers accompagnements, mise en place des outils de suivi", "Nb candidats, taux de satisfaction", o.responsablePedagogique || o.dirigeant, "À renseigner"],
    [`T2 ${annee} (avr-juin)`, "Suivi des premiers dossiers, ajustements méthodologiques", "Nb candidats, complétude dossiers, taux d'abandon", o.responsablePedagogique || o.dirigeant, "À renseigner"],
    [`T3 ${annee} (juil-sept)`, "Bilan semestriel, premières présentations jury", "Taux présentation jury, satisfaction, recommandation", o.responsablePedagogique || o.dirigeant, "À renseigner"],
    [`T4 ${annee} (oct-déc)`, "Bilan annuel, diffusion des résultats, plan d'amélioration", "Tous indicateurs – bilan complet", o.referentQualite || o.dirigeant, "À renseigner"],
  ];
  planning.forEach(r => html2 += tableRow(r));

  return excelWrap(`INDICATEURS PRÉVISIONNELS VAE – ${annee}`, [
    { name: "Indicateurs prévisionnels", html },
    { name: "Planning suivi", html: html2 }
  ]);
}

export function generateExcelSuiviInscriptions(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const headers = ["SITUATION AVANT DÉMARRAGE FORMATION", "CIVILITÉ", "NOM", "PRÉNOM", "DATE DE NAISSANCE", "PAYS DE NAISSANCE", "INSCRIT SOUS QUEL STATUT", "COMMUNE", "ADRESSE", "CODE POSTAL", "TÉLÉPHONE", "MAIL", "INTITULÉ DE LA FORMATION", "DIPLÔME VISÉ", "DATE DÉBUT DE FORMATION", "DATE DE FIN DE FORMATION", "COMMENTAIRE OBSERVATION"];
  let html = tableRow(headers, true);
  const now = new Date();
  stagiaires.slice(0, 15).forEach((s, i) => {
    // Synchronized: use individual stagiaire dates
    const dateDebut = s.dateDebutFormation || f.dateDebut || "";
    const dateFin = s.dateFinFormation || f.dateFin || "";
    const debutDate = dateDebut ? new Date(dateDebut.split('/').reverse().join('-')) : null;
    const isPast = debutDate && debutDate < now;
    const situation = isPast ? "En formation" : "Inscrit";
    html += tableRow([
      situation,
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
      formatDate(dateDebut),
      formatDate(dateFin),
      isPast ? "Formation démarrée" : ""
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
  const now = new Date();
  const today = now.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const stags = stagiaires.length > 0 ? stagiaires : [{ prenom: "Martin", nom: "Dupont", civilite: "M." as const, email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "" }];
  const termine = isFormationTerminee(f, stagiaires);

  // Synchronized: use CFA week dates from alternance calendar
  const isCFA = !!(f.rythmeAlternance && f.rythmeAlternance.trim().length > 0);
  const cfaWeekDates = isCFA ? getCFAWeekDates(f) : [];
  const nbWeeks = cfaWeekDates.length > 0 ? cfaWeekDates.length : (() => {
    let w = 52;
    if (f.dateDebut && f.dateFin) {
      const start = new Date(f.dateDebut);
      const end = new Date(f.dateFin);
      w = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000)));
    }
    return w;
  })();

  // Generate week headers
  const weekHeaders = Array.from({ length: nbWeeks }, (_, i) => `<th>S${i + 1}</th>`).join("");

  let html = ``;
  const totalCols = 16 + nbWeeks + 10;
  html += `<tr><td colspan="8"><strong>${o.nom}</strong></td><td colspan="5"></td><td>Version à jour au :</td><td colspan="2">${today}</td></tr>`;
  html += `<tr><td colspan="${totalCols}"></td></tr>`;
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

  stags.forEach((s, si) => {
    // Synchronized: mark past CFA weeks as "P", future as empty
    const pastWeeks = cfaWeekDates.filter(w => w.weekEnd < now).length;
    const weekCells = Array.from({ length: nbWeeks }, (_, i) => {
      if (i < pastWeeks || termine) return `<td>P</td>`;
      return `<td></td>`;
    }).join("");
    const totalPresent = termine ? nbWeeks : pastWeeks;

    // Synchronized: use EVAL_SCORES for QCM results
    const sc = EVAL_SCORES[si] || [7, 8, 7, 8, 7];
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;

    html += `<tr>
      <td>${s.nom}</td><td></td><td>${s.prenom}</td><td>${s.civilite === 'M.' ? 'M' : 'F'}</td>
      <td>${s.dateNaissance || ''}</td><td></td><td></td>
      <td>OPCO</td><td>Apprentissage</td><td></td>
      <td>${f.dateDebut ? formatDate(f.dateDebut) : ''}</td><td>${f.dateFin ? formatDate(f.dateFin) : ''}</td>
      <td></td><td></td><td></td><td></td>
      ${weekCells}<td>${totalPresent}/${nbWeeks}</td>
      <td>Non</td><td></td>
      <td class="green">${termine ? `${avg}/10 – Validé` : pastWeeks > 0 ? "En cours" : ""}</td><td>${termine ? "Oui" : ""}</td>
      <td>${termine ? "Oui" : ""}</td><td></td><td>${termine ? "Oui" : ""}</td><td></td>
    </tr>`;
  });

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
// Structure mirroring official OPCO/CFA template:
// 1) Informations générales · 2) Entretien fin période d'essai
// 3) Bilan intermédiaire 1 · 4) Bilan intermédiaire 2 · 5) Bilan intermédiaire 3
// 6) Bilan final
// Each bilan/entretien lists chaque compétence (RNCP) avec 4 cases :
// Acquise / En voie d'acquisition / Non acquise / Non observée — cochée par "X"
// Pre-rempli si la date du bilan est passée, sinon laissé vierge.

const COMPETENCES_TRANSVERSES = [
  "Respect des règles",
  "Respect des horaires",
  "Assiduité",
  "Respect et application des consignes",
  "Sens de l'organisation",
  "Adaptation et intégration dans l'équipe",
];
const NIVEAUX_COMP = ["Acquise", "En voie d'acquisition", "Non acquise", "Non observée"] as const;
const NIVEAUX_TRANSV = ["Très bien", "Bien", "Passable", "Insuffisant"] as const;

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

function buildBilanSheet(
  titre: string,
  dateBilan: string,
  isDone: boolean,
  competencesMetier: string[],
  scores: number[],
  tuteurNom: string,
  organismeNom: string,
  apprentiNom: string,
): string {
  const cellBorder = "border:1px solid #999;padding:6px;vertical-align:top";
  const headerCell = "border:1px solid #999;padding:6px;background:#1e3a7b;color:#fff;font-weight:bold;text-align:center";
  const subHeader = "border:1px solid #999;padding:6px;background:#e8f0fe;font-weight:bold;text-align:center";
  const checkBg = "border:1px solid #999;padding:6px;text-align:center;font-weight:bold";

  let h = `<tr><td colspan="6" style="${headerCell};font-size:13pt">${titre}</td></tr>`;
  h += `<tr><td colspan="6" style="${cellBorder};background:#f7f9fc"><strong>DATE :</strong> ${dateBilan || "_____________"}</td></tr>`;
  h += `<tr><td colspan="6" style="${cellBorder};font-style:italic;background:#f7f9fc">Entretien tripartite : Tuteur entreprise — Organisme de formation — Apprenti(e)</td></tr>`;
  h += `<tr><td colspan="6" style="height:8px;border:none"></td></tr>`;

  // Compétences liées au métier
  h += `<tr><td colspan="6" style="${headerCell};background:#2c5282">COMPÉTENCES LIÉES AU MÉTIER</td></tr>`;
  h += `<tr>
      <td style="${subHeader};width:40%">Compétence</td>
      <td style="${subHeader}">Acquise</td>
      <td style="${subHeader}">En voie d'acquisition</td>
      <td style="${subHeader}">Non acquise</td>
      <td style="${subHeader}">Non observée</td>
      <td style="${subHeader};width:25%">Commentaires</td>
    </tr>`;

  competencesMetier.forEach((comp, i) => {
    const niveau = isDone ? pickNiveauComp(scores[i % scores.length] ?? 7) : null;
    const mark = (n: typeof NIVEAUX_COMP[number]) => (isDone && niveau === n) ? "X" : "";
    const commentaire = isDone
      ? (niveau === "Acquise" ? "Compétence maîtrisée en situation professionnelle."
        : niveau === "En voie d'acquisition" ? "Progression satisfaisante, à consolider."
        : niveau === "Non acquise" ? "À retravailler lors des prochaines périodes."
        : "Pas encore mise en pratique sur la période.")
      : "";
    h += `<tr>
      <td style="${cellBorder}">${comp}</td>
      <td style="${checkBg};background:${mark("Acquise")?"#d4f4dd":"#fff"}">${mark("Acquise")}</td>
      <td style="${checkBg};background:${mark("En voie d'acquisition")?"#fff7d4":"#fff"}">${mark("En voie d'acquisition")}</td>
      <td style="${checkBg};background:${mark("Non acquise")?"#fde2e2":"#fff"}">${mark("Non acquise")}</td>
      <td style="${checkBg};background:${mark("Non observée")?"#eee":"#fff"}">${mark("Non observée")}</td>
      <td style="${cellBorder}">${commentaire}</td>
    </tr>`;
  });

  // Compétences transverses
  h += `<tr><td colspan="6" style="height:8px;border:none"></td></tr>`;
  h += `<tr><td colspan="6" style="${headerCell};background:#2c5282">COMPÉTENCES TRANSVERSES</td></tr>`;
  h += `<tr>
      <td style="${subHeader};width:40%">Critère</td>
      <td style="${subHeader}">Très bien</td>
      <td style="${subHeader}">Bien</td>
      <td style="${subHeader}">Passable</td>
      <td style="${subHeader}">Insuffisant</td>
      <td style="${subHeader};width:25%">Commentaires</td>
    </tr>`;
  COMPETENCES_TRANSVERSES.forEach((crit, i) => {
    const niveau = isDone ? pickNiveauTransv((scores[i % scores.length] ?? 7) + 1) : null;
    const mark = (n: typeof NIVEAUX_TRANSV[number]) => (isDone && niveau === n) ? "X" : "";
    const commentaire = isDone
      ? (niveau === "Très bien" || niveau === "Bien" ? "Comportement professionnel conforme aux attentes." : "À améliorer.")
      : "";
    h += `<tr>
      <td style="${cellBorder}">${crit}</td>
      <td style="${checkBg};background:${mark("Très bien")?"#d4f4dd":"#fff"}">${mark("Très bien")}</td>
      <td style="${checkBg};background:${mark("Bien")?"#e0f0d4":"#fff"}">${mark("Bien")}</td>
      <td style="${checkBg};background:${mark("Passable")?"#fff7d4":"#fff"}">${mark("Passable")}</td>
      <td style="${checkBg};background:${mark("Insuffisant")?"#fde2e2":"#fff"}">${mark("Insuffisant")}</td>
      <td style="${cellBorder}">${commentaire}</td>
    </tr>`;
  });

  // Synthèse + signatures
  h += `<tr><td colspan="6" style="height:8px;border:none"></td></tr>`;
  h += `<tr><td colspan="6" style="${headerCell};background:#2c5282">SYNTHÈSE & AXES DE PROGRÈS</td></tr>`;
  const synthese = isDone
    ? "L'apprenti(e) progresse de manière satisfaisante sur l'ensemble des compétences attendues. La coordination entre l'entreprise et l'organisme de formation est effective. Poursuivre la mise en situation sur les compétences en voie d'acquisition."
    : "";
  const axes = isDone
    ? "• Renforcer l'autonomie sur les tâches complexes\n• Poursuivre la mise en pratique des compétences techniques\n• Maintenir l'implication et la régularité"
    : "";
  h += `<tr><td colspan="6" style="${cellBorder};min-height:60px"><strong>Synthèse :</strong><br/>${synthese}</td></tr>`;
  h += `<tr><td colspan="6" style="${cellBorder};min-height:60px"><strong>Axes de progrès :</strong><br/>${axes.replace(/\n/g,"<br/>")}</td></tr>`;

  // Signatures
  h += `<tr><td colspan="6" style="height:8px;border:none"></td></tr>`;
  h += `<tr>
      <td colspan="2" style="${subHeader}">Signature Apprenti(e)<br/>${apprentiNom}</td>
      <td colspan="2" style="${subHeader}">Signature Tuteur entreprise<br/>${tuteurNom}</td>
      <td colspan="2" style="${subHeader}">Signature Organisme de formation<br/>${organismeNom}</td>
    </tr>`;
  h += `<tr>
      <td colspan="2" style="${cellBorder};height:50px">Date : ${isDone ? dateBilan : ""}</td>
      <td colspan="2" style="${cellBorder};height:50px">Date : ${isDone ? dateBilan : ""}</td>
      <td colspan="2" style="${cellBorder};height:50px">Date : ${isDone ? dateBilan : ""}</td>
    </tr>`;

  return h;
}

export function generateExcelOutilsSuiviAlternance(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const now = new Date();
  const s0 = stagiaires[0];
  const apprentiNom = s0 ? `${s0.prenom} ${s0.nom}` : "";
  const tuteurNom = (s0 as any)?.tuteur || o.responsablePedagogique || "Tuteur entreprise";
  const entrepriseNom = s0?.entreprise || "";
  const rncp = getRNCPByCode(f.codeRNCP || "");
  const sc0 = EVAL_SCORES[0] || [8, 7, 8, 7, 8, 7, 8];

  // Compétences à évaluer = blocs RNCP, sinon génériques
  const competencesMetier = rncp && rncp.blocsCompetences.length > 0
    ? rncp.blocsCompetences.slice(0, 7).map(b => b.titre)
    : ["Bloc de compétences 1", "Bloc de compétences 2", "Bloc de compétences 3", "Bloc de compétences 4"];

  // Dates des bilans : période d'essai = +45j ; bilan 1 = 1/3 ; bilan 2 = 2/3 ; bilan 3 = 4/5 ; final = dateFin
  const dDebut = s0?.dateDebutFormation ? new Date(s0.dateDebutFormation) : new Date(f.dateDebut);
  const dFin = s0?.dateFinFormation ? new Date(s0.dateFinFormation) : new Date(f.dateFin);
  const totalMs = dFin.getTime() - dDebut.getTime();

  const dateEssai = new Date(dDebut.getTime() + 45 * 86400000);
  const dateB1 = new Date(dDebut.getTime() + totalMs * (1 / 3));
  const dateB2 = new Date(dDebut.getTime() + totalMs * (2 / 3));
  const dateB3 = new Date(dDebut.getTime() + totalMs * (4 / 5));
  const dateBF = dFin;

  const isPast = (d: Date) => d.getTime() < now.getTime();

  // Sheet 1 — Informations générales
  const tdb = "border:1px solid #999;padding:8px;vertical-align:top";
  const tdLabel = `${tdb};background:#e8f0fe;font-weight:bold;width:35%`;
  const headBlue = "border:1px solid #999;padding:10px;background:#1e3a7b;color:#fff;font-weight:bold;font-size:13pt;text-align:center";
  let infoHtml = `<tr><td colspan="2" style="${headBlue}">INFORMATIONS GÉNÉRALES</td></tr>`;
  infoHtml += `<tr><td colspan="2" style="${tdb};font-style:italic;background:#f7f9fc">Document à compléter à la fin de chaque période (à l'école ou en entreprise) et à remettre à l'apprenti et à l'organisme de formation. Outil de formalisation de l'acquisition des compétences destiné à faciliter la construction du parcours de formation de l'apprenti.</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Nom de l'apprenti(e)</td><td style="${tdb}">${apprentiNom}</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Nom de l'entreprise</td><td style="${tdb}">${entrepriseNom}</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Nom du tuteur</td><td style="${tdb}">${tuteurNom}</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Poste occupé</td><td style="${tdb}">${s0?.poste || ""}</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Service</td><td style="${tdb}">${(s0 as any)?.service || ""}</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Nom de l'organisme de formation</td><td style="${tdb}">${o.nom}</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Référent pédagogique</td><td style="${tdb}">${o.responsablePedagogique || ""}</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Certification / Titre visé</td><td style="${tdb}">${f.intitule}${f.codeRNCP ? ` (${f.codeRNCP})` : ""}</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Type de contrat</td><td style="${tdb}">Contrat d'apprentissage</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Date de début du contrat</td><td style="${tdb}">${frDate(dDebut)}</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Date de fin du contrat</td><td style="${tdb}">${frDate(dFin)}</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Motif de fin de contrat</td><td style="${tdb}">${isPast(dFin) ? "Fin du parcours de formation" : ""}</td></tr>`;
  infoHtml += `<tr><td style="${tdLabel}">Remarques particulières</td><td style="${tdb};height:50px">${isPast(dFin) ? "Parcours mené à terme dans de bonnes conditions." : ""}</td></tr>`;

  // Sheets 2-6
  const sheetEssai = buildBilanSheet(
    "ENTRETIEN DE FIN DE PÉRIODE D'ESSAI",
    isPast(dateEssai) ? frDate(dateEssai) : "",
    isPast(dateEssai),
    competencesMetier, sc0.map(s => Math.max(5, s - 2)), // début : niveau plus faible
    tuteurNom, o.nom, apprentiNom,
  );
  const sheetB1 = buildBilanSheet(
    "BILAN INTERMÉDIAIRE 1",
    isPast(dateB1) ? frDate(dateB1) : "",
    isPast(dateB1),
    competencesMetier, sc0.map(s => Math.max(6, s - 1)),
    tuteurNom, o.nom, apprentiNom,
  );
  const sheetB2 = buildBilanSheet(
    "BILAN INTERMÉDIAIRE 2",
    isPast(dateB2) ? frDate(dateB2) : "",
    isPast(dateB2),
    competencesMetier, sc0,
    tuteurNom, o.nom, apprentiNom,
  );
  const sheetB3 = buildBilanSheet(
    "BILAN INTERMÉDIAIRE 3",
    isPast(dateB3) ? frDate(dateB3) : "",
    isPast(dateB3),
    competencesMetier, sc0.map(s => Math.min(10, s + 1)),
    tuteurNom, o.nom, apprentiNom,
  );
  const sheetFinal = buildBilanSheet(
    "BILAN FINAL",
    isPast(dateBF) ? frDate(dateBF) : "",
    isPast(dateBF),
    competencesMetier, sc0.map(s => Math.min(10, s + 2)),
    tuteurNom, o.nom, apprentiNom,
  );

  return excelWrap(`Outils de suivi alternance — ${o.nom}`, [
    { name: "Informations générales", html: infoHtml },
    { name: "Entretien fin période essai", html: sheetEssai },
    { name: "Bilan intermédiaire 1", html: sheetB1 },
    { name: "Bilan intermédiaire 2", html: sheetB2 },
    { name: "Bilan intermédiaire 3", html: sheetB3 },
    { name: "Bilan final", html: sheetFinal },
  ]);
}

// ─── Calendrier OPCO Mobilités (B9) — un onglet par session ───
export function generateExcelCalendrierOPCO(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
): string {
  const dureeH = parseInt(f.duree) || 14;
  const defaultTotalDays = Math.max(1, Math.ceil(dureeH / 7));
  const lieu = f.lieu?.trim() || o.adresse || "À préciser";
  const isDistance = lieu.toLowerCase().includes("distance") || lieu.toLowerCase().includes("distanciel");
  const horairesMatin = "09h00 – 12h30";
  const horairesAprem = "13h30 – 17h00";

  // Parse rythme alternance — défaut 1 sem école / 3 sem entreprise (toujours commencer par école)
  const parseRythme = (txt?: string): { ecole: number; entreprise: number } => {
    if (!txt) return { ecole: 1, entreprise: 3 };
    const m = txt.match(/(\d+)\s*sem[^0-9]*?(\d+)\s*sem/i);
    if (m) return { ecole: Math.max(1, parseInt(m[1])), entreprise: Math.max(0, parseInt(m[2])) };
    return { ecole: 1, entreprise: 3 };
  };
  const rythme = parseRythme(f.rythmeAlternance);
  const cycleWeeks = rythme.ecole + rythme.entreprise;
  const rythmeLabel = `${rythme.ecole} sem école / ${rythme.entreprise} sem entreprise`;

  const parseD = (s: string): Date | null => {
    if (!s) return null;
    const t = s.trim();
    const fr = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (fr) return new Date(parseInt(fr[3]), parseInt(fr[2]) - 1, parseInt(fr[1]));
    const d = new Date(t);
    return isNaN(d.getTime()) ? null : d;
  };

  const workdaysBetween = (debut: string, fin: string): number => {
    const d1 = parseD(debut);
    const d2 = parseD(fin);
    if (!d1 || !d2) return defaultTotalDays;
    let count = 0;
    const cur = new Date(d1);
    while (cur <= d2) {
      const dow = cur.getDay();
      if (dow !== 0 && dow !== 6) count++;
      cur.setDate(cur.getDate() + 1);
    }
    return Math.max(1, count);
  };

  const buildAllWorkdays = (startStr: string, endStr: string): Date[] => {
    const out: Date[] = [];
    const cur = parseD(startStr);
    const end = parseD(endStr);
    if (!cur || !end) return out;
    while (cur <= end) {
      const dow = cur.getDay();
      if (dow !== 0 && dow !== 6) out.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return out;
  };

  const startOfWeek = (d: Date): Date => {
    const r = new Date(d);
    const dow = r.getDay();
    const diff = dow === 0 ? -6 : 1 - dow;
    r.setDate(r.getDate() + diff);
    r.setHours(0, 0, 0, 0);
    return r;
  };
  const weekIndex = (d: Date, ref: Date): number => {
    const a = startOfWeek(d).getTime();
    const b = startOfWeek(ref).getTime();
    return Math.round((a - b) / (7 * 24 * 3600 * 1000));
  };
  // Décalage : si la 1ʳᵉ semaine est partielle (<3 jours école), on prolonge l'école
  // sur la semaine suivante pour avoir une vraie semaine pleine.
  const computeWeekShift = (startStr: string): number => {
    const d = parseD(startStr);
    if (!d) return 0;
    const dow = d.getDay();
    const remaining = dow === 0 ? 0 : Math.max(0, 6 - Math.max(dow, 1));
    return remaining < 3 ? 1 : 0;
  };
  const isEcoleWeek = (wIdx: number, shift = 0): boolean => {
    const adjusted = wIdx - shift;
    if (adjusted < 0) return true;
    const pos = ((adjusted % cycleWeeks) + cycleWeeks) % cycleWeeks;
    return pos < rythme.ecole;
  };

  const fmtJour = (d: Date) => {
    const jours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    return jours[d.getDay()];
  };
  const fmtDateLong = (d: Date) => {
    const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    return `${d.getDate()} ${mois[d.getMonth()]} ${d.getFullYear()}`;
  };
  const fmtDateISO = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };
  const sanitizeSheet = (s: string) => s.replace(/[\\\/\?\*\[\]:]/g, " ").slice(0, 28).trim() || "Session";

  // Regroupement par couple (dateDebut, dateFin) — priorité dates individuelles
  type Sess = { debut: string; fin: string; nbDays: number; stagiaires: StagiaireInfo[] };
  const groupes = new Map<string, Sess>();
  stagiaires.forEach((s) => {
    const deb = s.dateDebutFormation || f.dateDebut || "";
    const fin = s.dateFinFormation || f.dateFin || "";
    const key = `${deb}__${fin}`;
    if (!groupes.has(key)) {
      groupes.set(key, { debut: deb, fin, nbDays: workdaysBetween(deb, fin), stagiaires: [] });
    }
    groupes.get(key)!.stagiaires.push(s);
  });
  if (groupes.size === 0) {
    groupes.set("__default__", { debut: f.dateDebut, fin: f.dateFin, nbDays: defaultTotalDays, stagiaires: [] });
  }

  // ── Onglet 1 : Synthèse ──
  let synthHtml = tableRow(["Champ", "Valeur"], true);
  synthHtml += tableRow(["Intitulé de la formation", f.intitule]);
  synthHtml += tableRow(["Organisme", `${o.nom}${o.nda ? ` – NDA ${o.nda}` : ""}`]);
  synthHtml += tableRow(["Modalité", `${isDistance ? "Distanciel synchrone (classe virtuelle)" : "Présentiel"} — Apprentissage en alternance`]);
  synthHtml += tableRow(["Lieu de déroulement", lieu]);
  synthHtml += tableRow(["Durée centre", `${dureeH} heures (7 h/jour)`]);
  synthHtml += tableRow(["Rythme d'alternance", `${rythmeLabel} — démarrage en semaine école`]);
  synthHtml += tableRow(["Horaires (jours école)", `Matin : ${horairesMatin} | Après-midi : ${horairesAprem} — 7 h/jour`]);
  synthHtml += tableRow(["Formateur", f.formateur || "—"]);
  synthHtml += tableRow(["Nombre de sessions", String(groupes.size)]);
  synthHtml += tableRow(["Nombre d'apprenants", String(stagiaires.length)]);

  // ── Onglet 2 : Toutes sessions consolidées (filtrable) ──
  let consolHtml = tableRow(
    ["Session", "Apprenants", "N°", "Sem.", "Type", "Date", "Date (ISO)", "Jour", "Horaires matin", "Horaires après-midi", "Volume (h)", "Lieu", "Formateur"],
    true,
  );
  const sheets: { name: string; html: string }[] = [
    { name: "Synthèse", html: synthHtml },
    { name: "Toutes sessions", html: "" },
  ];

  let sessionIdx = 0;
  for (const [, grp] of groupes) {
    sessionIdx++;
    const sessionLabel = groupes.size > 1 ? `Session ${sessionIdx}` : "Session unique";
    const apprenants = grp.stagiaires.length
      ? grp.stagiaires.map((s) => `${s.prenom} ${s.nom}`).join(", ")
      : "—";
    const allDays = buildAllWorkdays(grp.debut, grp.fin);
    const refDate = parseD(grp.debut);
    const shift = computeWeekShift(grp.debut);
    const ecoleDays = refDate ? allDays.filter((d) => isEcoleWeek(weekIndex(d, refDate), shift)) : [];
    const nbEcoleDays = ecoleDays.length;
    const volumeEcole = nbEcoleDays * 7;

    // Onglet par session
    let sheetHtml = tableRow(["Champ", "Valeur"], true);
    sheetHtml += tableRow(["Session", sessionLabel]);
    sheetHtml += tableRow(["Apprenants", apprenants]);
    sheetHtml += tableRow(["Période", `Du ${formatDate(grp.debut)} au ${formatDate(grp.fin)}`]);
    sheetHtml += tableRow(["Rythme", rythmeLabel]);
    // Volume centre retiré (demande utilisateur)
    sheetHtml += tableRow(["Lieu", lieu]);
    sheetHtml += tableRow(["Formateur", f.formateur || "—"]);
    sheetHtml += `<tr><td colspan="2" style="height:8px"></td></tr>`;
    sheetHtml += tableRow(
      ["N°", "Sem.", "Type", "Date", "Date (ISO)", "Jour", "Horaires matin", "Horaires après-midi", "Volume (h)", "Lieu"],
      true,
    );
    if (allDays.length === 0 || !refDate) {
      sheetHtml += `<tr><td colspan="10" style="text-align:center;color:#888">Dates à renseigner dans la fiche stagiaire.</td></tr>`;
    } else {
      let ecoleCounter = 0;
      let entrepriseCounter = 0;
      allDays.forEach((d) => {
        const wIdx = weekIndex(d, refDate);
        const ecole = isEcoleWeek(wIdx, shift);
        if (ecole) ecoleCounter++; else entrepriseCounter++;
        const numLabel = ecole ? `É${ecoleCounter}` : `E${entrepriseCounter}`;
        const typeLabel = ecole ? "École" : "Entreprise";
        const matin = ecole ? horairesMatin : "—";
        const aprem = ecole ? horairesAprem : "—";
        const vol = ecole ? "7" : "0";
        const lieuJour = ecole ? lieu : "Entreprise d'accueil";
        const jourLabel = fmtJour(d);
        const jourCap = jourLabel.charAt(0).toUpperCase() + jourLabel.slice(1);
        sheetHtml += tableRow([
          numLabel,
          `S${wIdx + 1}`,
          typeLabel,
          fmtDateLong(d),
          fmtDateISO(d),
          jourCap,
          matin,
          aprem,
          vol,
          lieuJour,
        ]);
        consolHtml += tableRow([
          sessionLabel,
          apprenants,
          numLabel,
          `S${wIdx + 1}`,
          typeLabel,
          fmtDateLong(d),
          fmtDateISO(d),
          jourCap,
          matin,
          aprem,
          vol,
          lieuJour,
          f.formateur || "—",
        ]);
      });
    }
    sheets.push({ name: sanitizeSheet(sessionLabel), html: sheetHtml });
  }

  // injecte le contenu consolidé maintenant que toutes les sessions ont été traitées
  sheets[1].html = consolHtml;

  return excelWrap(`Calendrier OPCO – ${f.intitule}`, sheets);
}

// Helper to generate Excel blob
export function excelToBlob(htmlContent: string): Blob {
  // Convert the HTML-based workbook into a real .xlsx file so that files
  // saved with a .xlsx extension open correctly in Excel/LibreOffice.
  // Fallback to the legacy HTML (.xls) blob if conversion fails for any reason.
  try {
    // Dynamic require to avoid a circular import at module init time.
    const { htmlToXlsxBlob } = require("./htmlToXlsx") as typeof import("./htmlToXlsx");
    return htmlToXlsxBlob(htmlContent);
  } catch (e) {
    console.warn("[excelToBlob] fallback to HTML .xls blob:", e);
    return new Blob(["\ufeff", htmlContent], { type: "application/vnd.ms-excel" });
  }
}

// ===== BDC : Registre des bénéficiaires =====
export function generateExcelRegistreBeneficiairesBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  let html = tableRow([
    "N°", "Nom", "Prénom", "Sexe", "Date entrée", "Date sortie",
    "Financement", "Phase préliminaire", "Phase investigation", "Phase conclusion",
    "Document de synthèse remis", "Plan d'action remis", "Confidentialité signée",
    "Référent handicap mobilisé", "Satisfaction à chaud /10",
    "Entretien suivi 6 mois (date prévue)", "Suivi 6 mois réalisé", "Devenir / impact",
    "Observations"
  ], true);
  stagiaires.slice(0, 30).forEach((s, i) => {
    const sc = EVAL_SCORES[i] || [8, 9, 8, 9, 8];
    const avg = Math.round(sc.reduce((a, b) => a + b, 0) / sc.length * 10) / 10;
    const sexe = s.prenom?.endsWith('a') || s.prenom?.endsWith('e') ? 'F' : 'H';
    const fin = s?.dateFinFormation || f.dateFin || "";
    let dt6m = "";
    if (fin) { const d = new Date(fin); if (!isNaN(d.getTime())) { d.setMonth(d.getMonth() + 6); dt6m = formatDate(d.toISOString().split("T")[0]); } }
    const termine = isFormationTerminee(f, stagiaires);
    html += tableRow([
      String(i + 1),
      (s.nom || "").toUpperCase(),
      (s.prenom || "").toUpperCase(),
      sexe,
      formatDate(s?.dateDebutFormation || f.dateDebut || ""),
      formatDate(fin),
      "CPF",
      "Validée",
      termine ? "Validée" : "En cours",
      termine ? "Validée" : "À venir",
      termine ? "Oui" : "À venir",
      termine ? "Oui" : "À venir",
      "Oui",
      "Non (sans objet)",
      termine ? `${avg}/10` : "—",
      dt6m,
      termine ? "À planifier" : "—",
      termine ? "Plan d'action en cours" : "—",
      ""
    ]);
  });
  return excelWrap(`REGISTRE DES BÉNÉFICIAIRES – BILAN DE COMPÉTENCES – ${o.nom || ""}`, [{ name: "Registre BDC", html }]);
}
