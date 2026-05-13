import * as XLSX from "xlsx";
import { FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { SAMPLE_FORMATIONS } from "@/lib/sampleData";

export interface EdofSession {
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
}

interface EdofRow {
  NOM: string;
  PRENOM: string;
  COURRIEL: string;
  NUMERO_TELEPHONE_PORTABLE: string;
  NUMERO_TELEPHONE_FIXE: string;
  DATE_DE_NAISSANCE: string;
  INTITULE_FORMATION: string;
  DATE_DEBUT_SESSION: string;
  DATE_FIN_SESSION: string;
  LIEU_FORMATION_VILLE: string;
  LIEU_FORMATION_CODE_POSTAL: string;
  MONTANT_FORMATION: string | number;
  CIVILITE: string;
  ADRESSE_POSTALE: string;
  ADRESSE_CODE_POSTAL: string;
  ADRESSE_VILLE: string;
}

function parseEdofDate(raw: string | number | undefined): string {
  if (!raw) return "";

  // Handle Excel serial date numbers (e.g. 45791 = days since 1899-12-30)
  if (typeof raw === 'number' || /^\d{4,5}$/.test(String(raw).trim())) {
    const serial = typeof raw === 'number' ? raw : parseInt(String(raw).trim(), 10);
    if (serial > 1000 && serial < 100000) {
      // Excel epoch: 1899-12-30
      const excelEpoch = new Date(1899, 11, 30);
      const d = new Date(excelEpoch.getTime() + serial * 86400000);
      if (!isNaN(d.getTime())) {
        return d.toISOString().slice(0, 10);
      }
    }
  }

  const str = String(raw).trim();

  // Handle ISO format (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    return str.slice(0, 10);
  }

  // Handle DD/MM/YYYY or D/M/YYYY (French format, most common in EDOF)
  const parts = str.split("/");
  if (parts.length === 3) {
    let day: string, month: string, year: string;
    // Detect format: if first part > 12, it's DD/MM/YYYY (French)
    const firstNum = parseInt(parts[0], 10);
    const secondNum = parseInt(parts[1], 10);
    if (firstNum > 12) {
      // DD/MM/YYYY (French)
      day = parts[0].padStart(2, "0");
      month = parts[1].padStart(2, "0");
      year = parts[2];
    } else if (secondNum > 12) {
      // M/D/YYYY (American)
      month = parts[0].padStart(2, "0");
      day = parts[1].padStart(2, "0");
      year = parts[2];
    } else {
      // Ambiguous — assume French DD/MM/YYYY
      day = parts[0].padStart(2, "0");
      month = parts[1].padStart(2, "0");
      year = parts[2];
    }
    if (year.length === 2) {
      year = parseInt(year) > 50 ? `19${year}` : `20${year}`;
    }
    return `${year}-${month}-${day}`;
  }
  return str;
}

function formatPhone(raw: string | number | undefined): string {
  if (!raw) return "";
  let str = String(raw).replace(/\D/g, "");
  if (str.length === 9) str = "0" + str;
  if (str.length === 10) {
    return str.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
  }
  return String(raw);
}

// Helper: find value from row by trying multiple possible column names (case-insensitive, trimmed)
function getCol(row: Record<string, any>, ...keys: string[]): any {
  for (const key of keys) {
    const kl = key.toLowerCase().trim();
    for (const col of Object.keys(row)) {
      if (col.toLowerCase().trim() === kl || col.toLowerCase().trim().replace(/[\s_]+/g, "_") === kl.replace(/[\s_]+/g, "_")) {
        if (row[col] !== "" && row[col] !== undefined && row[col] !== null) return row[col];
      }
    }
  }
  return "";
}

export function parseEdofXlsx(data: ArrayBuffer): EdofSession[] {
  const workbook = XLSX.read(data, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { defval: "" });

  // Group by formation title
  const groups = new Map<string, { rows: Record<string, any>[] }>();

  for (const row of rows) {
    const title = getCol(row, "INTITULE_FORMATION", "INTITULE FORMATION", "Intitulé Formation", "Intitule Formation", "INTITULE_CERTIF/THEM", "INTITULE CERTIF/THEM", "INTITULE", "Formation");
    if (!title) continue;
    if (!groups.has(title)) {
      groups.set(title, { rows: [] });
    }
    groups.get(title)!.rows.push(row);
  }

  const sessions: EdofSession[] = [];

  for (const [title, group] of groups) {
    // Find matching sample formation for programme/objectifs/etc
    const sampleMatch = SAMPLE_FORMATIONS.find(f => 
      f.intitule.toLowerCase().includes(title.toLowerCase().slice(0, 30)) ||
      title.toLowerCase().includes(f.intitule.toLowerCase().slice(0, 30))
    );

    // Find earliest start and latest end dates
    const allStarts = group.rows.map(r => parseEdofDate(getCol(r, "DATE_DEBUT_SESSION", "DATE DEBUT SESSION", "DATE_DEBUT", "DATE DEBUT", "Début", "Date début"))).filter(Boolean).sort();
    const allEnds = group.rows.map(r => parseEdofDate(getCol(r, "DATE_FIN_SESSION", "DATE FIN SESSION", "DATE_FIN", "DATE FIN", "Fin", "Date fin"))).filter(Boolean).sort();
    const earliestStart = allStarts[0] || "";
    const latestEnd = allEnds[allEnds.length - 1] || "";

    // Collect unique locations
    const locations = [...new Set(group.rows.map(r => {
      const ville = getCol(r, "LIEU_FORMATION_VILLE", "LIEU FORMATION VILLE", "VILLE", "Ville");
      const cp = getCol(r, "LIEU_FORMATION_CODE_POSTAL", "LIEU FORMATION CODE POSTAL", "CODE_POSTAL", "Code postal");
      return ville ? `${cp} ${ville}`.trim() : "";
    }).filter(Boolean))];

    // Average tarif
    const tarifs = group.rows.map(r => parseFloat(String(getCol(r, "MONTANT_FORMATION", "MONTANT FORMATION", "MONTANT", "Tarif", "Prix") || "0"))).filter(t => t > 0);
    const avgTarif = tarifs.length > 0 ? Math.round(tarifs.reduce((a, b) => a + b, 0) / tarifs.length) : 0;

    const formation: FormationInfo = {
      intitule: title,
      objectifs: sampleMatch?.objectifs || "",
      prerequis: sampleMatch?.prerequis || "",
      duree: sampleMatch?.duree || "",
      modalites: sampleMatch?.modalites || "présentiel",
      tarif: avgTarif > 0 ? `${avgTarif.toLocaleString("fr-FR")} € HT par stagiaire` : sampleMatch?.tarif || "",
      programme: sampleMatch?.programme || "",
      methodesEvaluation: sampleMatch?.methodesEvaluation || "",
      moyensPedagogiques: sampleMatch?.moyensPedagogiques || "",
      publicVise: sampleMatch?.publicVise || "",
      delaiAcces: sampleMatch?.delaiAcces || "14 jours après inscription",
      dateDebut: earliestStart,
      dateFin: latestEnd,
      lieu: locations.join(" / ") || sampleMatch?.lieu || "",
      nombreParticipants: String(group.rows.length),
      formateur: sampleMatch?.formateur || "",
    };

    const stagiaires: StagiaireInfo[] = group.rows.map(row => {
      const montant = getCol(row, "MONTANT_FORMATION", "MONTANT FORMATION", "MONTANT", "Tarif", "Prix", "COUT", "Coût");
      const tarifStr = montant ? `${parseFloat(String(montant)).toLocaleString("fr-FR")} € HT` : "";
      const rawCivilite = String(getCol(row, "CIVILITE", "Civilité", "Civilite") || "");
      let civilite: "" | "M." | "Mme" = "";
      if (/madame|mme/i.test(rawCivilite)) civilite = "Mme";
      else if (/monsieur|^m\.?$/i.test(rawCivilite)) civilite = "M.";
      return {
        civilite,
        nom: String(getCol(row, "NOM", "Nom") || "").toUpperCase(),
        prenom: String(getCol(row, "PRENOM", "Prénom", "Prenom") || "").charAt(0).toUpperCase() + String(getCol(row, "PRENOM", "Prénom", "Prenom") || "").slice(1).toLowerCase(),
        email: String(getCol(row, "COURRIEL", "EMAIL", "Mail", "E-mail", "Courriel") || "").replace(/\\/g, ""),
        telephone: formatPhone(getCol(row, "NUMERO_TELEPHONE_PORTABLE", "NUMERO TELEPHONE PORTABLE", "TELEPHONE", "Téléphone", "Tel", "Tél") || getCol(row, "NUMERO_TELEPHONE_FIXE", "NUMERO TELEPHONE FIXE")),
        entreprise: String(getCol(row, "ENTREPRISE", "Entreprise", "SOCIETE", "Société") || ""),
        responsableEntreprise: "",
        signatureResponsableUrl: "",
        poste: String(getCol(row, "POSTE", "Poste", "FONCTION", "Fonction") || ""),
        dateNaissance: parseEdofDate(getCol(row, "DATE_DE_NAISSANCE", "DATE DE NAISSANCE", "DATE_NAISSANCE", "Date naissance")),
        dateDebutFormation: parseEdofDate(getCol(row, "DATE_DEBUT_SESSION", "DATE DEBUT SESSION", "DATE_DEBUT", "DATE DEBUT", "Début", "Date début")),
        dateFinFormation: parseEdofDate(getCol(row, "DATE_FIN_SESSION", "DATE FIN SESSION", "DATE_FIN", "DATE FIN", "Fin", "Date fin")),
        tarifFormation: tarifStr,
        signatureUrl: "",
        adresse: String(getCol(row, "ADRESSE_POSTALE", "ADRESSE POSTALE", "Adresse") || ""),
        codePostal: String(getCol(row, "ADRESSE_CODE_POSTAL", "ADRESSE CODE POSTAL", "Code postal adresse") || ""),
        commune: String(getCol(row, "ADRESSE_VILLE", "ADRESSE VILLE", "Ville adresse") || ""),
        nationalite: String(getCol(row, "PAYS_LIEU_DE_NAISSANCE", "PAYS LIEU DE NAISSANCE", "Nationalité") || ""),
        nir: "",
        departementNaissance: String(getCol(row, "DEPARTEMENT_LIEU_DE_NAISSANCE", "DEPARTEMENT LIEU DE NAISSANCE", "Département naissance") || ""),
        communeNaissance: String(getCol(row, "VILLE_LIEU_DE_NAISSANCE", "VILLE LIEU DE NAISSANCE", "Commune naissance") || ""),
        diplome: "",
        rqth: "",
        numeroAction: String(getCol(row, "NUMERO_ACTION", "NUMERO ACTION", "NUMERO_ ACTION", "N° ACTION", "NUM_ACTION", "Numéro action") || ""),
      };
    });

    sessions.push({ formation, stagiaires });
  }

  return sessions;
}
