/**
 * Replace {{variables}} in .docx template files using JSZip.
 * Keeps the original design intact — only swaps placeholder text in the XML.
 */
import JSZip from "jszip";
import type { OrganismeInfo, StagiaireInfo, FormationInfo } from "@/types/qualiopi";
import { subtractBusinessDays, formatDate } from "@/lib/docBuilder";

/** Long French date format */
function formatDateLong(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/** Short French date "4 nov. 2025" */
function formatDateShort(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

/** Build the replacement map from organisme data (for factures) */
function buildReplacements(o: OrganismeInfo): Record<string, string> {
  const refDate = (o as any).dateMaj || new Date().toISOString().slice(0, 10);
  const dateMajFormatted = formatDateLong(refDate);
  const siren = o.siret ? o.siret.replace(/\s/g, "").slice(0, 9) : "";
  const annee = new Date(refDate).getFullYear().toString();

  // Google Workspace billing period: dateMaj + 1 month
  const ref = new Date(refDate);
  const d = new Date(ref.getFullYear(), ref.getMonth() + 1, 1);
  const d1Start = new Date(d); d1Start.setDate(1);
  const d1End = new Date(d); d1End.setDate(15);
  const d2Start = new Date(d); d2Start.setDate(16);
  const d2End = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  const fmt = (dt: Date, opts?: Intl.DateTimeFormatOptions) =>
    dt.toLocaleDateString("fr-FR", opts || { day: "numeric", month: "short" });

  return {
    nom_organisme: o.nom || "",
    mail: o.email || "",
    adresse: `${o.adresse || ""}, ${o.codePostal || ""} ${o.ville || ""}`.replace(/^,\s*/, "").trim(),
    president: o.dirigeant || "",
    siren,
    siret: o.siret || "",
    date_facture: dateMajFormatted,
    date_paiement: dateMajFormatted,
    "année de formtion": annee,
    datedebutdefacture: d1Start.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
    dateFindefacture: d2End.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
    "mois1-jours1": fmt(d1Start),
    "mois2-jours2": fmt(d1End, { day: "numeric", month: "short", year: "numeric" }),
    "mois3-jours3": fmt(d2Start),
    "mois4-jours4": fmt(d2End, { day: "numeric", month: "short", year: "numeric" }),
    // Diplôme Référent Handicap: dateMaj - 1 mois (2 jours consécutifs)
    "nom et prenom de referent handicap": o.referentHandicap || o.dirigeant || "",
    datedebut: (() => {
      const dd = new Date(ref.getFullYear(), ref.getMonth() - 1, ref.getDate());
      return dd.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    })(),
    datefin: (() => {
      const dd = new Date(ref.getFullYear(), ref.getMonth() - 1, ref.getDate() + 1);
      return dd.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    })(),
  };
}

/** Build replacement map for mail templates (per-stagiaire) */
function buildMailReplacements(
  o: OrganismeInfo,
  f: FormationInfo,
  s: StagiaireInfo
): Record<string, string> {
  const refDate = (o as any).dateMaj || new Date().toISOString().slice(0, 10);
  const dateDebut = s.dateDebutFormation || f.dateDebut || "";
  const dateFin = s.dateFinFormation || f.dateFin || "";

  // Dates d'envoi calculées à partir des dates de formation
  const dateEnvoiePreInscrit = dateDebut ? formatDateShort(subtractBusinessDays(dateDebut, 20)) : formatDateShort(refDate);
  const dateInscrit = dateDebut ? formatDateShort(subtractBusinessDays(dateDebut, 14)) : formatDateShort(refDate);
  const dateEnvoieConvocation = dateDebut ? formatDateShort(subtractBusinessDays(dateDebut, 7)) : formatDateShort(refDate);
  const dateEnvoie = dateDebut ? formatDateShort(dateDebut) : formatDateShort(refDate);
  const dateEnvoieBilan = dateFin ? formatDateShort(dateFin) : formatDateShort(refDate);
  // date_repond: stagiaire répond 2 jours après pré-inscription
  const dateRepond = dateDebut ? formatDateShort(subtractBusinessDays(dateDebut, 18)) : formatDateShort(refDate);

  return {
    // Organisme
    nom_organisme: o.nom || "",
    mail_organisme: o.email || "",
    "tél_organisme": o.telephone || "",
    tel_organisme: o.telephone || "",
    mail: o.email || "",
    // Stagiaire
    nom: s.nom || "",
    prenom: s.prenom || "",
    nom_stagiaire: s.nom || "",
    prenom_stagiaire: s.prenom || "",
    mail_stagiaire: s.email || "",
    // Formation
    formation_intitule: f.intitule || "",
    date_debut: dateDebut ? formatDateLong(dateDebut) : "",
    date_fin: dateFin ? formatDateLong(dateFin) : "",
    // Dates d'envoi
    date_envoie_pre_inscrit: dateEnvoiePreInscrit,
    date_inscrit: dateInscrit,
    date_envoie_convocation: dateEnvoieConvocation,
    date_envoie: dateEnvoie,
    date_envoie_blian: dateEnvoieBilan,
    date_repond: dateRepond,
  };
}

/**
 * Replace placeholders in a docx ZIP and return blob.
 */
async function replaceInZip(zip: JSZip, replacements: Record<string, string>): Promise<Blob> {
  const xmlPaths = [
    "word/document.xml",
    "word/header1.xml", "word/header2.xml", "word/header3.xml",
    "word/footer1.xml", "word/footer2.xml", "word/footer3.xml",
  ];

  for (const path of xmlPaths) {
    const file = zip.file(path);
    if (!file) continue;

    let xml = await file.async("string");
    let changed = false;

    for (const [key, val] of Object.entries(replacements)) {
      const placeholder = `{{${key}}}`;
      if (xml.includes(placeholder)) {
        xml = xml.split(placeholder).join(escapeXml(val));
        changed = true;
      }

      const splitPattern = buildSplitRegex(key);
      if (splitPattern && splitPattern.test(xml)) {
        xml = xml.replace(splitPattern, () => {
          changed = true;
          return `<w:t xml:space="preserve">${escapeXml(val)}</w:t>`;
        });
      }
    }

    if (changed) zip.file(path, xml);
  }

  return zip.generateAsync({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}

/**
 * Fetch a .docx template, replace all {{placeholders}} with organisme data, return a Blob.
 */
function encodeTemplateUrl(url: string): string {
  // Encode spaces and special chars in path segments while preserving slashes
  return url.split("/").map((seg, i) => (i === 0 && seg === "" ? "" : encodeURIComponent(seg))).join("/");
}

async function fetchTemplate(templateUrl: string): Promise<ArrayBuffer> {
  const tryUrls = [encodeTemplateUrl(templateUrl), templateUrl];
  let lastErr = "";
  for (const url of tryUrls) {
    try {
      const resp = await fetch(url);
      if (resp.ok) return await resp.arrayBuffer();
      lastErr = `HTTP ${resp.status} sur ${url}`;
    } catch (e) {
      lastErr = (e as Error).message;
    }
  }
  throw new Error(`Template introuvable: ${templateUrl} (${lastErr})`);
}

export async function processDocxTemplate(
  templateUrl: string,
  organisme: OrganismeInfo
): Promise<Blob> {
  const buffer = await fetchTemplate(templateUrl);
  const zip = await JSZip.loadAsync(buffer);
  return replaceInZip(zip, buildReplacements(organisme));
}

/**
 * Fetch a mail .docx template, replace placeholders with organisme + formation + stagiaire data.
 */
export async function processMailDocxTemplate(
  templateUrl: string,
  organisme: OrganismeInfo,
  formation: FormationInfo,
  stagiaire: StagiaireInfo
): Promise<Blob> {
  const buffer = await fetchTemplate(templateUrl);
  const zip = await JSZip.loadAsync(buffer);
  return replaceInZip(zip, buildMailReplacements(organisme, formation, stagiaire));
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function buildSplitRegex(key: string): RegExp | null {
  const placeholder = `{{${key}}}`;
  const xmlNoise = "(?:<[^>]+>)*";
  const pattern = Array.from(placeholder)
    .map((char) => char.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"))
    .join(xmlNoise);
  try {
    return new RegExp(pattern, "g");
  } catch {
    return null;
  }
}

/** Template file mapping — factures IND 17 */
export const DOCX_TEMPLATE_FILES: Record<string, string> = {
};

/** Template file mapping — mails (per-stagiaire) */
export const MAIL_TEMPLATE_FILES: Record<string, string> = {
  mail_pre_inscription: "/templates/mails/mail_pre_inscription.docx",
  mail_inscription: "/templates/mails/mail_inscription.docx",
  mail_convocation: "/templates/mails/mail_convocation.docx",
  mail_envoie_sc_ressources: "/templates/mails/mail_envoie_sc_ressources.docx",
  mail_fin_formation: "/templates/mails/mail_fin_formation.docx",
};
