/**
 * BAHO - DOCX template processor
 * Replace {{placeholders}} in .docx templates (Convention, Devis)
 */
import JSZip from "jszip";

export interface ConventionTemplateData {
  nom_entreprise: string;
  siretEntreprise: string;
  adresse_entreprise: string;
  directriceEntreprise: string;
  datedebut: string;
  datedefin: string;
  dateConvention: string;
}

export interface DevisTemplateData {
  numero: string;
  nomEntreprise: string;
  adresseEntreprise: string;
  siret: string;
  mailEntreprise: string;
  date_debut: string;
  date_fin: string;
  date_facture: string;
  nom: string;
  prenom: string;
  directeur: string;
  adresse: string;
}

function escapeXml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Build regex matching `{{key}}` even if Word split it across multiple <w:t> runs */
function buildSplitRegex(key: string): RegExp {
  const chars = key.split("").map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  // {{ key }} possibly broken by </w:t>...<w:t> between any chars
  const between = "(?:</w:t>[\\s\\S]*?<w:t[^>]*>)?";
  const pattern = "\\{\\{" + between + chars.join(between) + between + "\\}\\}";
  return new RegExp(pattern, "g");
}

async function fetchTemplate(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) {
    // Try URL-encoded fallback
    const encoded = url
      .split("/")
      .map((part, i) => (i < 2 ? part : encodeURIComponent(part)))
      .join("/");
    const res2 = await fetch(encoded);
    if (!res2.ok) throw new Error(`Template not found: ${url}`);
    return res2.arrayBuffer();
  }
  return res.arrayBuffer();
}

export async function processDocxTemplate(
  templateUrl: string,
  data: Record<string, string>
): Promise<Blob> {
  const buffer = await fetchTemplate(templateUrl);
  const zip = await JSZip.loadAsync(buffer);

  const xmlFiles = [
    "word/document.xml",
    "word/header1.xml",
    "word/header2.xml",
    "word/header3.xml",
    "word/footer1.xml",
    "word/footer2.xml",
    "word/footer3.xml",
  ];

  for (const path of xmlFiles) {
    const file = zip.file(path);
    if (!file) continue;
    let content = await file.async("string");

    for (const [key, value] of Object.entries(data)) {
      const escaped = escapeXml(value);
      // Simple replacement
      content = content.split(`{{${key}}}`).join(escaped);
      // Cross-run replacement
      const regex = buildSplitRegex(key);
      content = content.replace(regex, escaped);
    }

    zip.file(path, content);
  }

  return zip.generateAsync({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}
