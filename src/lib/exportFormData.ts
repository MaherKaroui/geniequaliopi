import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { excelToBlob } from "./xlsxGenerator";

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

export function exportFormDataToExcel(org: OrganismeInfo, form: FormationInfo, stagiaires: StagiaireInfo[]) {
  // Sheet 1: Organisme (vertical key/value)
  const orgRows = ORGANISME_LABELS.map(([k, label]) => {
    const val = k === "typesActions" ? (org[k] as string[]).join(", ") : String(org[k] ?? "");
    return [label, val];
  });
  const s1 = sheet("Informations Organisme", ["Champ", "Valeur"], orgRows);

  // Sheet 2: Formation (vertical key/value)
  const formRows = FORMATION_LABELS.map(([k, label]) => [label, String(form[k] ?? "")]);
  const s2 = sheet("Informations Formation", ["Champ", "Valeur"], formRows);

  // Sheet 3: Stagiaires (horizontal table)
  const stagHeaders = ["Civilité", "Nom", "Prénom", "Email", "Téléphone", "Entreprise", "Poste",
    "Date de naissance", "Début formation", "Fin formation", "Tarif", "Adresse", "Code postal",
    "Commune", "Nationalité", "NIR", "Dép. naissance", "Commune naissance", "Diplôme", "RQTH", "Formateur"];
  const stagRows = stagiaires.map(s => [
    s.civilite, s.nom, s.prenom, s.email, s.telephone, s.entreprise, s.poste,
    s.dateNaissance, s.dateDebutFormation ?? "", s.dateFinFormation ?? "", s.tarifFormation ?? "",
    s.adresse ?? "", s.codePostal ?? "", s.commune ?? "", s.nationalite ?? "", s.nir ?? "",
    s.departementNaissance ?? "", s.communeNaissance ?? "", s.diplome ?? "", s.rqth ?? "", s.formateur ?? "",
  ]);
  const s3 = sheet("Stagiaires", stagHeaders, stagRows);

  // Build workbook
  const sheets = [
    { name: "Organisme", html: s1 },
    { name: "Formation", html: s2 },
    { name: "Stagiaires", html: s3 },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
<x:ExcelWorkbook><x:ActiveSheet>0</x:ActiveSheet></x:ExcelWorkbook>
${sheets.map(s => `<Worksheet ss:Name="${s.name}"><Table>${""}</Table><x:WorksheetOptions/></Worksheet>`).join("")}
</Workbook>`;

  // Use HTML-based approach (more compatible)
  let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>
${sheets.map(s => `<x:ExcelWorksheet><x:Name>${s.name}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>`).join("")}
</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>
${sheets.map(s => `<div id="${s.name}">${s.html}</div>`).join("<br style='page-break-after:always'/>")}
</body></html>`;

  const blob = new Blob(["\uFEFF" + html], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Données_Formulaires_${org.nom || "Export"}.xls`;
  a.click();
  URL.revokeObjectURL(url);
}
