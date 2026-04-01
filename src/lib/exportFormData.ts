import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";

const esc = (v: any) => (v == null ? "" : String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));

function row(cells: string[], tag = "td") {
  return "<tr>" + cells.map(c => `<${tag} style="border:1px solid #999;padding:6px">${esc(c)}</${tag}>`).join("") + "</tr>";
}

function sheet(title: string, headers: string[], rows: string[][]) {
  let h = `<table border="1" cellspacing="0" cellpadding="4">`;
  h += `<tr><td colspan="${headers.length}" style="font-size:14pt;font-weight:bold;background:#1a56db;color:#fff;padding:10px">${esc(title)}</td></tr>`;
  h += row(headers, "th");
  rows.forEach(r => { h += row(r); });
  h += "</table>";
  return h;
}

function downloadExcel(html: string, filename: string) {
  const full = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8"></head><body>${html}</body></html>`;
  const blob = new Blob(["\uFEFF" + full], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const ORGANISME_LABELS: [keyof OrganismeInfo, string][] = [
  ["nom", "Nom de l'organisme"], ["siret", "SIRET"], ["nda", "N° Déclaration d'activité"],
  ["adresse", "Adresse"], ["codePostal", "Code postal"], ["ville", "Ville"],
  ["telephone", "Téléphone"], ["email", "Email"], ["siteWeb", "Site web"],
  ["dirigeant", "Dirigeant"], ["responsablePedagogique", "Responsable pédagogique"],
  ["referentHandicap", "Référent handicap"], ["referentQualite", "Référent qualité"],
  ["domainesFormation", "Domaines de formation"], ["typesActions", "Types d'actions"],
  ["certifications", "Certifications"], ["outilsUtilises", "Outils utilisés"],
  ["version", "Version"], ["dateMaj", "Date de mise à jour"],
];

const FORMATION_LABELS: [keyof FormationInfo, string][] = [
  ["intitule", "Intitulé"], ["objectifs", "Objectifs"], ["prerequis", "Prérequis"],
  ["duree", "Durée"], ["modalites", "Modalités"], ["tarif", "Tarif"],
  ["programme", "Programme"], ["methodesEvaluation", "Méthodes d'évaluation"],
  ["moyensPedagogiques", "Moyens pédagogiques"], ["publicVise", "Public visé"],
  ["delaiAcces", "Délai d'accès"], ["dateDebut", "Date de début"], ["dateFin", "Date de fin"],
  ["lieu", "Lieu"], ["nombreParticipants", "Nombre de participants"], ["formateur", "Formateur"],
  ["codeRNCP", "Code RNCP"], ["rythmeAlternance", "Rythme alternance"],
];

function buildOrganismeHtml(org: OrganismeInfo) {
  const rows = ORGANISME_LABELS.map(([k, label]) => {
    const val = k === "typesActions" ? (org[k] as string[]).join(", ") : String(org[k] ?? "");
    return [label, val];
  });
  return sheet("Informations Organisme", ["Champ", "Valeur"], rows);
}

function buildFormationHtml(form: FormationInfo) {
  const rows = FORMATION_LABELS.map(([k, label]) => [label, String(form[k] ?? "")]);
  return sheet("Informations Formation", ["Champ", "Valeur"], rows);
}

function buildStagiairesHtml(stagiaires: StagiaireInfo[]) {
  const headers = ["Civilité", "Nom", "Prénom", "Email", "Téléphone", "Entreprise", "Poste",
    "Date de naissance", "Début formation", "Fin formation", "Tarif", "Adresse", "Code postal",
    "Commune", "Nationalité", "NIR", "Dép. naissance", "Commune naissance", "Diplôme", "RQTH", "Formateur"];
  const rows = stagiaires.map(s => [
    s.civilite, s.nom, s.prenom, s.email, s.telephone, s.entreprise, s.poste,
    s.dateNaissance, s.dateDebutFormation ?? "", s.dateFinFormation ?? "", s.tarifFormation ?? "",
    s.adresse ?? "", s.codePostal ?? "", s.commune ?? "", s.nationalite ?? "", s.nir ?? "",
    s.departementNaissance ?? "", s.communeNaissance ?? "", s.diplome ?? "", s.rqth ?? "", s.formateur ?? "",
  ]);
  return sheet("Stagiaires", headers, rows);
}

export function exportOrganismeToExcel(org: OrganismeInfo) {
  downloadExcel(buildOrganismeHtml(org), `Organisme_${org.nom || "Export"}.xls`);
}

export function exportFormationToExcel(form: FormationInfo) {
  downloadExcel(buildFormationHtml(form), `Formation_${form.intitule || "Export"}.xls`);
}

export function exportStagiairesToExcel(stagiaires: StagiaireInfo[]) {
  downloadExcel(buildStagiairesHtml(stagiaires), `Stagiaires_Export.xls`);
}

export function exportFormDataToExcel(org: OrganismeInfo, form: FormationInfo, stagiaires: StagiaireInfo[]) {
  exportOrganismeToExcel(org);
  setTimeout(() => exportFormationToExcel(form), 300);
  setTimeout(() => exportStagiairesToExcel(stagiaires), 600);
}
