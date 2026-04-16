/**
 * Replace {{variables}} in .docx template files using JSZip.
 * Keeps the original design intact — only swaps placeholder text in the XML.
 */
import JSZip from "jszip";
import type { OrganismeInfo } from "@/types/qualiopi";

/** Long French date format */
function formatDateLong(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/** Subtract N business days from a date string */
function subtractBizDays(dateStr: string, n: number): string {
  const d = new Date(dateStr);
  let count = 0;
  while (count < n) {
    d.setDate(d.getDate() - 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) count++;
  }
  return d.toISOString().slice(0, 10);
}

/** Build the replacement map from organisme data */
function buildReplacements(o: OrganismeInfo): Record<string, string> {
  const refDate = (o as any).dateMaj || new Date().toISOString().slice(0, 10);
  // date_paiement and date_facture = date de mise à jour
  const dateMajFormatted = formatDateLong(refDate);
  const siren = o.siret ? o.siret.replace(/\s/g, "").slice(0, 9) : "";
  const annee = new Date(refDate).getFullYear().toString();

  // Google Workspace billing period
  const d = new Date(subtractBizDays(refDate, 60));
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
  };
}

/**
 * Fetch a .docx template, replace all {{placeholders}}, return a Blob.
 */
export async function processDocxTemplate(
  templateUrl: string,
  organisme: OrganismeInfo
): Promise<Blob> {
  const resp = await fetch(templateUrl);
  if (!resp.ok) throw new Error(`Template introuvable: ${templateUrl}`);
  const arrayBuf = await resp.arrayBuffer();

  const zip = await JSZip.loadAsync(arrayBuf);
  const replacements = buildReplacements(organisme);

  // XML files that may contain placeholders
  const xmlPaths = [
    "word/document.xml",
    "word/header1.xml",
    "word/header2.xml",
    "word/header3.xml",
    "word/footer1.xml",
    "word/footer2.xml",
    "word/footer3.xml",
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

      // Handle placeholders split across XML tags (e.g. <w:t>{{</w:t><w:t>mail}}</w:t>)
      const splitPattern = buildSplitRegex(key);
      if (splitPattern && splitPattern.test(xml)) {
        xml = xml.replace(splitPattern, (_match) => {
          changed = true;
          // Replace the entire matched section with just the first <w:t> containing the value
          return `<w:t xml:space="preserve">${escapeXml(val)}</w:t>`;
        });
      }
    }

    if (changed) {
      zip.file(path, xml);
    }
  }

  return await zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

/**
 * Build a regex that matches a placeholder potentially split across multiple <w:t> elements.
 * E.g. {{mail}} might appear as: <w:t>{{</w:t></w:r><w:r><w:t>mail}}</w:t>
 */
function buildSplitRegex(key: string): RegExp | null {
  // Build pattern: {{ possibly separated from key by XML tags, then }}
  const chars = `\\{\\{${key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\}\\}`;
  // Insert optional XML noise between each character
  const xmlNoise = "(?:</w:t>(?:<[^>]*>)*<w:t[^>]*>)?";
  const pattern = chars.split("").join(xmlNoise);
  try {
    return new RegExp(pattern, "g");
  } catch {
    return null;
  }
}

/** Template file mapping */
export const DOCX_TEMPLATE_FILES: Record<string, string> = {
  facture_pack_office_docx: "/templates/factures/Facture_pack_office.docx",
  facture_google_workspace_docx: "/templates/factures/Facture google.docx",
  facture_make_docx: "/templates/factures/FACTURE MAKE.docx",
  facture_genspark_docx: "/templates/factures/FACTURE GENSPARK.docx",
};

/**
 * Process a .docx template and convert the result to PDF.
 */
export async function processDocxTemplateToPdf(
  templateUrl: string,
  organisme: OrganismeInfo
): Promise<Blob> {
  const docxBlob = await processDocxTemplate(templateUrl, organisme);
  const arrayBuffer = await docxBlob.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });
  const html = `<html><head><style>
    body { font-family: Arial, sans-serif; font-size: 11pt; margin: 40px; }
    table { border-collapse: collapse; width: 100%; margin: 10px 0; }
    td, th { border: 1px solid #ccc; padding: 6px 8px; }
    p { margin: 4px 0; }
  </style></head><body>${result.value}</body></html>`;
  return htmlToPdfBlob(html);
}
