/**
 * Moteur de substitution pour les templates DOCX BDC.
 * Fetch le template depuis /public, ouvre avec JSZip, remplace le texte
 * AU NIVEAU PARAGRAPHE (en fusionnant les <w:t> de chaque paragraphe pour gérer
 * les placeholders coupés entre plusieurs runs), puis recompresse.
 *
 * Le design (police, couleurs, tableaux, images, en-têtes/pieds) est préservé
 * à 100% car on n'édite QUE le contenu textuel.
 */
import JSZip from "jszip";

export type Substitution = { from: string | RegExp; to: string };

const PARSER = new DOMParser();
const SERIALIZER = new XMLSerializer();

/** Récupère tout le texte d'un <w:p>, en concaténant tous les <w:t>. */
function paragraphText(pEl: Element): string {
  const texts = pEl.getElementsByTagNameNS("*", "t");
  let s = "";
  for (let i = 0; i < texts.length; i++) s += texts[i].textContent || "";
  return s;
}

/** Remplace le texte d'un <w:p> : on met tout le nouveau texte dans le PREMIER <w:t>
 *  et on vide les autres. Préserve le formatage du premier run. */
function setParagraphText(pEl: Element, newText: string): void {
  const texts = Array.from(pEl.getElementsByTagNameNS("*", "t"));
  if (texts.length === 0) return;
  texts[0].textContent = newText;
  // xml:space="preserve" pour conserver espaces / sauts
  texts[0].setAttribute("xml:space", "preserve");
  for (let i = 1; i < texts.length; i++) {
    texts[i].textContent = "";
  }
}

/** Applique les substitutions sur tous les <w:p> d'un document XML. */
function processXmlString(xml: string, subs: Substitution[]): string {
  // DOMParser nécessite que le XML soit bien formé. Les .docx le sont.
  const doc = PARSER.parseFromString(xml, "application/xml");
  // Erreur de parsing ?
  if (doc.getElementsByTagName("parsererror").length > 0) return xml;

  const paragraphs = doc.getElementsByTagNameNS("*", "p");
  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    const original = paragraphText(p);
    if (!original) continue;
    let modified = original;
    for (const { from, to } of subs) {
      if (typeof from === "string") {
        if (modified.includes(from)) modified = modified.split(from).join(to);
      } else {
        modified = modified.replace(from, to);
      }
    }
    if (modified !== original) setParagraphText(p, modified);
  }

  return SERIALIZER.serializeToString(doc);
}

/**
 * Récupère un template depuis /public et applique les substitutions.
 * @param templateUrl ex: "/templates/bdc/ind1/presentation_bilan.docx"
 */
export async function renderDocxTemplate(
  templateUrl: string,
  subs: Substitution[],
): Promise<Blob> {
  const res = await fetch(templateUrl);
  if (!res.ok) throw new Error(`Template introuvable : ${templateUrl} (${res.status})`);
  const buf = await res.arrayBuffer();
  const zip = await JSZip.loadAsync(buf);

  // On traite document.xml + tous les headers/footers (où apparaissent
  // souvent le nom de l'organisme, SIRET, NDA, etc.)
  const targets = [
    "word/document.xml",
    ...Object.keys(zip.files).filter(p => /^word\/(header|footer)\d*\.xml$/i.test(p)),
  ];

  for (const path of targets) {
    const file = zip.file(path);
    if (!file) continue;
    const xml = await file.async("string");
    const newXml = processXmlString(xml, subs);
    zip.file(path, newXml);
  }

  return await zip.generateAsync({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
}

/**
 * Pour les .xlsx (calendrier annuel) : substitution dans sharedStrings.xml.
 */
export async function renderXlsxTemplate(
  templateUrl: string,
  subs: Substitution[],
): Promise<Blob> {
  const res = await fetch(templateUrl);
  if (!res.ok) throw new Error(`Template introuvable : ${templateUrl} (${res.status})`);
  const buf = await res.arrayBuffer();
  const zip = await JSZip.loadAsync(buf);

  const stringsFile = zip.file("xl/sharedStrings.xml");
  if (stringsFile) {
    let xml = await stringsFile.async("string");
    // sharedStrings.xml : <si><t>texte</t></si>. On peut substituer directement
    // dans la chaîne car les valeurs ne contiennent pas de balises imbriquées.
    for (const { from, to } of subs) {
      const escaped = to
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      if (typeof from === "string") xml = xml.split(from).join(escaped);
      else xml = xml.replace(from, escaped);
    }
    zip.file("xl/sharedStrings.xml", xml);
  }

  return await zip.generateAsync({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
}
