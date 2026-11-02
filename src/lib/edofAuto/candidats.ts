/**
 * Automatisation EDOF — lecture des dossiers d'un export « Tous les dossiers » (CSV ou XLSX)
 * et regroupement en sessions d'examen (même certification, même date de fin de session).
 */
import { formatPhone, getCol, parseEdofDate, readEdofRows } from "@/lib/edofParser";

export interface EdofCandidat {
  numeroDossier: string;
  civilite: "Mme" | "M." | "";
  nom: string;
  prenom: string;
  dateNaissance: string; // ISO
  adresse: string;
  codePostal: string;
  ville: string;
  email: string;
  telephone: string;
  codeCertif: string;
  intitule: string;
  numeroSession: string;
  dateDebut: string; // ISO
  dateFin: string; // ISO
  lieuVille: string;
  statut: string;
  dateInscription: string; // ISO
}

export interface EdofExport {
  siret: string;
  candidats: EdofCandidat[];
}

/** Dossiers dont la formation a eu lieu (ou est en cours) : seuls ceux-là passent l'examen. */
export function formationRealisee(statut: string): boolean {
  const s = statut.toLowerCase();
  if (/annul|refus|rejet|expir/.test(s)) return false;
  return /service fait|sortie|en formation|termin|factur|pay/.test(s);
}

const capitalize = (s: string) =>
  s.toLowerCase().replace(/(^|[\s'-])(\p{L})/gu, (_, sep, c) => sep + c.toUpperCase());

/** SIRET de l'organisme lu dans le nom de fichier « Export_Tous les dossiers_<SIRET>_<date>.csv ». */
export function siretDepuisNomFichier(nom: string): string {
  const m = nom.match(/(\d{14})/);
  return m ? m[1] : "";
}

export function lireExportEdof(data: ArrayBuffer, nomFichier = ""): EdofExport {
  const rows = readEdofRows(data);
  const candidats: EdofCandidat[] = rows
    .map((row) => {
      const civ = String(getCol(row, "CIVILITE", "Civilité") || "");
      const nom = String(getCol(row, "NOM", "Nom") || "").trim();
      const prenom = String(getCol(row, "PRENOM", "Prénom", "Prenom") || "").trim();
      return {
        numeroDossier: String(getCol(row, "NUMERO_DOSSIER", "N° DOSSIER", "Numéro dossier") || "").trim(),
        civilite: (/madame|mme/i.test(civ) ? "Mme" : /monsieur|^m\.?$/i.test(civ) ? "M." : "") as EdofCandidat["civilite"],
        nom: nom.toUpperCase(),
        prenom: capitalize(prenom),
        dateNaissance: parseEdofDate(getCol(row, "DATE_DE_NAISSANCE", "DATE DE NAISSANCE", "Date de naissance")),
        adresse: String(getCol(row, "ADRESSE_POSTALE", "ADRESSE POSTALE", "Adresse") || "").trim(),
        codePostal: String(getCol(row, "ADRESSE_CODE_POSTAL", "ADRESSE CODE POSTAL", "Code postal") || "").trim(),
        ville: String(getCol(row, "ADRESSE_VILLE", "ADRESSE VILLE", "Ville") || "").trim(),
        email: String(getCol(row, "COURRIEL", "EMAIL", "E-mail") || "").replace(/\\/g, "").trim(),
        telephone: formatPhone(getCol(row, "NUMERO_TELEPHONE_PORTABLE", "TELEPHONE", "Téléphone") || getCol(row, "NUMERO_TELEPHONE_FIXE")),
        codeCertif: String(getCol(row, "CODE_CERTIF/THEM", "CODE CERTIF/THEM", "CODE_CERTIF") || "").trim().toUpperCase(),
        intitule: String(getCol(row, "INTITULE_CERTIF/THEM", "INTITULE_FORMATION", "INTITULE FORMATION", "FORMATION") || "").trim(),
        numeroSession: String(getCol(row, "NUMERO_SESSION", "NUMERO SESSION") || "").trim(),
        dateDebut: parseEdofDate(getCol(row, "DATE_DEBUT_SESSION", "DATE DEBUT SESSION", "Début session")),
        dateFin: parseEdofDate(getCol(row, "DATE_FIN_SESSION", "DATE FIN SESSION", "Fin session")),
        lieuVille: String(getCol(row, "LIEU_FORMATION_VILLE", "LIEU FORMATION VILLE") || "").trim(),
        statut: String(getCol(row, "STATUT_DOSSIER", "STATUT DOSSIER", "Statut") || "").trim(),
        dateInscription: parseEdofDate(getCol(row, "DATE_INSCRIPTION", "DATE INSCRIPTION")),
      };
    })
    .filter((c) => c.nom || c.prenom);
  return { siret: siretDepuisNomFichier(nomFichier), candidats };
}

export interface SessionExamen {
  cle: string;
  codeCertif: string;
  dateExamen: string; // ISO = dernier jour de formation
  candidats: EdofCandidat[];
}

/** Une session d'examen = même certification + même dernier jour de formation (règle du PV EYES PERFECT). */
export function grouperSessions(candidats: EdofCandidat[]): SessionExamen[] {
  const map = new Map<string, SessionExamen>();
  for (const c of candidats) {
    const cle = `${c.codeCertif}|${c.dateFin}`;
    if (!map.has(cle)) map.set(cle, { cle, codeCertif: c.codeCertif, dateExamen: c.dateFin, candidats: [] });
    map.get(cle)!.candidats.push(c);
  }
  return [...map.values()]
    .map((s) => ({ ...s, candidats: [...s.candidats].sort((a, b) => `${a.nom} ${a.prenom}`.localeCompare(`${b.nom} ${b.prenom}`, "fr")) }))
    .sort((a, b) => a.dateExamen.localeCompare(b.dateExamen));
}

export const frDate = (iso: string) => (/^\d{4}-\d{2}-\d{2}/.test(iso) ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : iso);

/** Âge révolu à une date donnée (ISO). */
export function ageAu(naissance: string, date: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}/.test(naissance) || !/^\d{4}-\d{2}-\d{2}/.test(date)) return null;
  let age = +date.slice(0, 4) - +naissance.slice(0, 4);
  if (date.slice(5, 10) < naissance.slice(5, 10)) age--;
  return age;
}
