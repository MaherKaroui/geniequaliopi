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
  const str = String(raw);
  // Handle M/D/YY or M/D/YYYY format
  const parts = str.split("/");
  if (parts.length === 3) {
    const month = parts[0].padStart(2, "0");
    const day = parts[1].padStart(2, "0");
    let year = parts[2];
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
    const title = getCol(row, "INTITULE_FORMATION", "INTITULE FORMATION", "INTITULE_CERTIF/THEM", "INTITULE CERTIF/THEM", "INTITULE", "Formation");
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
    const allStarts = group.rows.map(r => parseEdofDate(r["DATE_DEBUT_SESSION"])).filter(Boolean).sort();
    const allEnds = group.rows.map(r => parseEdofDate(r["DATE_FIN_SESSION"])).filter(Boolean).sort();
    const earliestStart = allStarts[0] || "";
    const latestEnd = allEnds[allEnds.length - 1] || "";

    // Collect unique locations
    const locations = [...new Set(group.rows.map(r => {
      const ville = r["LIEU_FORMATION_VILLE"] || "";
      const cp = r["LIEU_FORMATION_CODE_POSTAL"] || "";
      return ville ? `${cp} ${ville}`.trim() : "";
    }).filter(Boolean))];

    // Average tarif
    const tarifs = group.rows.map(r => parseFloat(String(r["MONTANT_FORMATION"] || "0"))).filter(t => t > 0);
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

    const stagiaires: StagiaireInfo[] = group.rows.map(row => ({
      nom: (row["NOM"] || "").toUpperCase(),
      prenom: String(row["PRENOM"] || "").charAt(0).toUpperCase() + String(row["PRENOM"] || "").slice(1).toLowerCase(),
      email: (row["COURRIEL"] || "").replace(/\\/g, ""),
      telephone: formatPhone(row["NUMERO_TELEPHONE_PORTABLE"] || row["NUMERO_TELEPHONE_FIXE"]),
      entreprise: "",
      poste: "",
      dateNaissance: parseEdofDate(row["DATE_DE_NAISSANCE"]),
      dateDebutFormation: parseEdofDate(row["DATE_DEBUT_SESSION"]),
      dateFinFormation: parseEdofDate(row["DATE_FIN_SESSION"]),
      signatureUrl: "",
    }));

    sessions.push({ formation, stagiaires });
  }

  return sessions;
}
