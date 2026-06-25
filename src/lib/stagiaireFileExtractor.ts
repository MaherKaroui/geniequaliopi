import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { StagiaireInfo } from "@/types/qualiopi";

export interface StagiaireExtraction {
  civilite?: "M." | "Mme";
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  dateNaissance?: string;
  dateDebutFormation?: string;
  dateFinFormation?: string;
  adresse?: string;
  codePostal?: string;
  commune?: string;
  nationalite?: string;
  nir?: string;
  entreprise?: string;
  poste?: string;
  intituleFormation?: string;
}

/* ---------------- Helpers ---------------- */

const toIsoDate = (fr: string): string | undefined => {
  const m = fr.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (!m) return undefined;
  let [, d, mo, y] = m;
  if (y.length === 2) y = (parseInt(y) > 50 ? "19" : "20") + y;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
};

const titleCase = (s: string) =>
  s.toLowerCase().replace(/(^|[\s\-'])(\p{L})/gu, (_, sep, c) => sep + c.toUpperCase());

const MONTHS_FR: Record<string, string> = {
  janvier: "01", février: "02", fevrier: "02", mars: "03", avril: "04",
  mai: "05", juin: "06", juillet: "07", août: "08", aout: "08",
  septembre: "09", octobre: "10", novembre: "11", décembre: "12", decembre: "12",
};

const parseFrenchDate = (s: string): string | undefined => {
  const m = s.match(/(\d{1,2})\s+([a-zéûôA-ZÉÛÔ]+)\s+(\d{4})/);
  if (!m) return undefined;
  const month = MONTHS_FR[m[2].toLowerCase()];
  if (!month) return undefined;
  return `${m[3]}-${month}-${m[1].padStart(2, "0")}`;
};

/* ---------------- Lecteurs de fichiers ---------------- */

const readDocx = async (file: File): Promise<string> => {
  const ab = await file.arrayBuffer();
  const { value } = await mammoth.extractRawText({ arrayBuffer: ab });
  return value;
};

const readPdf = async (file: File): Promise<string> => {
  // @ts-ignore - dynamic import worker setup
  const pdfjs: any = await import("pdfjs-dist");
  // Use the bundled worker via Vite ?url import-style fallback:
  try {
    // @ts-ignore
    const workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  } catch {
    // fallback CDN
    pdfjs.GlobalWorkerOptions.workerSrc =
      "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.6.205/build/pdf.worker.min.mjs";
  }
  const ab = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: ab }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it: any) => it.str).join(" ") + "\n";
  }
  return text;
};

const readXlsx = async (file: File): Promise<string> => {
  const ab = await file.arrayBuffer();
  const wb = XLSX.read(ab, { type: "array" });
  let text = "";
  wb.SheetNames.forEach((name) => {
    const sheet = wb.Sheets[name];
    text += XLSX.utils.sheet_to_csv(sheet, { FS: " | " }) + "\n";
  });
  return text;
};

const readText = async (file: File): Promise<string> => file.text();

const readAnyFile = async (file: File): Promise<string> => {
  const name = file.name.toLowerCase();
  if (name.endsWith(".docx")) return readDocx(file);
  if (name.endsWith(".pdf")) return readPdf(file);
  if (name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".csv"))
    return readXlsx(file);
  if (name.endsWith(".txt") || name.endsWith(".html") || name.endsWith(".htm"))
    return readText(file);
  // Fallback : tenter texte brut
  try {
    return await readText(file);
  } catch {
    return "";
  }
};

/* ---------------- Extraction des champs ---------------- */

export const parseStagiaireFromText = (raw: string): StagiaireExtraction => {
  const text = raw
    .replace(/\u00A0/g, " ")
    .replace(/[\u2019\u2018\u02BC`]/g, "'")
    .replace(/\s+\n/g, "\n");
  const result: StagiaireExtraction = {};

  /* --- Civilité + Nom + Prénom --- */
  // Patterns tentés successivement
  // Apostrophes typographiques acceptées : ' (U+0027), ’ (U+2019), ‘ (U+2018), ʼ (U+02BC), ` (U+0060)
  const APO = "['\u2019\u2018\u02BC`]";
  const namePatterns: RegExp[] = [
    new RegExp(`[ÀA]\\s*l${APO}?\\s*attention\\s*(?:de|du|des)?\\s*:?\\s*([^\\n\\r,;]+)`, "i"),
    /(?:Nom\s+et\s+pr[ée]nom|Pr[ée]nom\s+et\s+nom|Stagiaire|B[ée]n[ée]ficiaire|Apprenant|Apprenti|Candidat|Participant|Salari[ée])\s*:\s*([^\n\r,;]+)/i,
    /Je\s+soussign[ée]\(?e?\)?\s*,?\s*((?:M\.|Mme|Madame|Monsieur|Mlle)?\s*[A-ZÉÈÀÂÔÛ][^\n\r,;]+)/,
  ];

  for (const pat of namePatterns) {
    const m = text.match(pat);
    if (m) {
      let fullName = m[1].trim().replace(/\s{2,}/g, " ").split(/\s+(?:Objet|Adresse|N[ée]\(?e?\)?\s+le|N[oôO°]|Email)\s*:/i)[0].trim();
      const civMatch = fullName.match(/^(M\.|Mme|Madame|Monsieur|Mlle)\s+/i);
      if (civMatch) {
        const c = civMatch[1].toLowerCase();
        result.civilite = (c === "mme" || c === "madame" || c === "mlle") ? "Mme" : "M.";
        fullName = fullName.replace(civMatch[0], "").trim();
      }
      const tokens = fullName.split(/\s+/).filter(Boolean);
      const upperTokens: string[] = [];
      const otherTokens: string[] = [];
      tokens.forEach((t) => {
        const letters = t.replace(/[^\p{L}]/gu, "");
        if (letters.length >= 2 && letters === letters.toUpperCase()) upperTokens.push(t);
        else otherTokens.push(t);
      });
      if (upperTokens.length && otherTokens.length) {
        result.nom = upperTokens.join(" ").toUpperCase();
        result.prenom = otherTokens.map(titleCase).join(" ");
      } else if (tokens.length >= 2) {
        const last = tokens[tokens.length - 1];
        const first = tokens.slice(0, -1).join(" ");
        result.nom = last.toUpperCase();
        result.prenom = titleCase(first);
      }
      if (result.nom) break;
    }
  }

  /* --- Civilité fallback si non détectée --- */
  if (!result.civilite) {
    if (/\b(Madame|Mme)\b/i.test(text)) result.civilite = "Mme";
    else if (/\b(Monsieur|M\.)\b/.test(text)) result.civilite = "M.";
  }

  /* --- Période de formation --- */
  const periodMatch = text.match(
    /du\s+(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})\s+au\s+(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i
  );
  if (periodMatch) {
    result.dateDebutFormation = toIsoDate(periodMatch[1]);
    result.dateFinFormation = toIsoDate(periodMatch[2]);
  } else {
    const dDeb = text.match(/(?:date\s+de?\s*d[ée]but|d[ée]but\s+(?:de\s+)?formation|d[ée]but)[^:\n]{0,30}:\s*(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i);
    const dFin = text.match(/(?:date\s+de?\s*fin|fin\s+(?:de\s+)?formation|fin)[^:\n]{0,30}:\s*(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i);
    if (dDeb) result.dateDebutFormation = toIsoDate(dDeb[1]);
    if (dFin) result.dateFinFormation = toIsoDate(dFin[1]);
  }

  /* --- Date de naissance --- */
  const naissNumMatch = text.match(/n[ée]\(?e?\)?\s+le\s+(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i)
    || text.match(/date\s+de\s+naissance\s*:?\s*(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i);
  if (naissNumMatch) {
    result.dateNaissance = toIsoDate(naissNumMatch[1]);
  } else {
    const naissFr = text.match(/n[ée]\(?e?\)?\s+le\s+(\d{1,2}\s+[a-zéûôA-ZÉÛÔ]+\s+\d{4})/i);
    if (naissFr) result.dateNaissance = parseFrenchDate(naissFr[1]);
  }

  /* --- Email (filtre les emails génériques de l'organisme) --- */
  const emailMatches = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/g) || [];
  const personalEmail = emailMatches.find(
    (e) => !/contact@|info@|formation@|hello@|admin@|secretariat@|accueil@/i.test(e)
  );
  if (personalEmail) result.email = personalEmail;

  /* --- Téléphone FR --- */
  const telMatch = text.match(/(?:0|\+33\s?)[1-9](?:[\s.\-]?\d{2}){4}/);
  if (telMatch) result.telephone = telMatch[0].replace(/\s+/g, " ").trim();

  /* --- Code postal + commune --- */
  const cpMatch = text.match(/\b(\d{5})\s+([A-ZÉÈÀÂÔÛa-zéèàâôû\-\s]{2,40})/);
  if (cpMatch) {
    result.codePostal = cpMatch[1];
    result.commune = cpMatch[2].trim().replace(/\s+/g, " ").split(/\n/)[0].trim();
  }

  /* --- Adresse (ligne contenant un numéro + rue) --- */
  const addrMatch = text.match(
    /(\d{1,4}(?:\s?(?:bis|ter))?\s+(?:rue|avenue|av\.|bd|boulevard|impasse|all[ée]e|chemin|route|place|cours|quai)\s+[^\n,;]{2,80})/i
  );
  if (addrMatch) result.adresse = addrMatch[1].trim();

  /* --- NIR (sécurité sociale 13 ou 15 chiffres) --- */
  const nirMatch = text.match(/\b([12]\s?\d{2}\s?\d{2}\s?\d{2,3}\s?\d{3}\s?\d{3}(?:\s?\d{2})?)\b/);
  if (nirMatch) result.nir = nirMatch[1].replace(/\s+/g, "");

  /* --- Nationalité --- */
  const natMatch = text.match(/nationalit[ée]\s*:?\s*([A-Za-zÀ-ÿ\-]+)/i);
  if (natMatch) result.nationalite = natMatch[1].trim();

  /* --- Entreprise / employeur --- */
  const entrMatch = text.match(/(?:Entreprise|Employeur|Soci[ée]t[ée]|Raison sociale)\s*:?\s*([^\n\r,;]+)/i);
  if (entrMatch) result.entreprise = entrMatch[1].trim();

  /* --- Poste --- */
  const posteMatch = text.match(/(?:Poste|Fonction|M[ée]tier)\s*:?\s*([^\n\r,;]+)/i);
  if (posteMatch) result.poste = posteMatch[1].trim();

  /* --- Intitulé formation --- */
  const intMatch = text.match(/(?:Intitul[ée]\s+(?:de\s+la\s+formation)?|Titre\s+Professionnel|Formation)\s*:\s*([^\n\r]+)/i);
  if (intMatch) result.intituleFormation = intMatch[1].trim().substring(0, 200);

  return result;
};

export const extractStagiaireFromFile = async (file: File): Promise<StagiaireExtraction> => {
  const text = await readAnyFile(file);
  return parseStagiaireFromText(text);
};

/* ---------------- Application au stagiaire ---------------- */

export const extractionToStagiaire = (
  extraction: StagiaireExtraction,
  base: StagiaireInfo
): StagiaireInfo => {
  const merged: StagiaireInfo = { ...base };
  (Object.keys(extraction) as (keyof StagiaireExtraction)[]).forEach((k) => {
    const v = extraction[k];
    if (v !== undefined && v !== "" && k in merged) {
      // @ts-ignore
      merged[k] = v;
    }
  });
  return merged;
};

/**
 * Fusionne plusieurs extractions provenant de différents fichiers
 * concernant potentiellement le même stagiaire.
 * Stratégie : on garde la première valeur non-vide rencontrée.
 */
export const mergeExtractions = (
  extractions: StagiaireExtraction[]
): StagiaireExtraction => {
  const out: StagiaireExtraction = {};
  for (const ex of extractions) {
    (Object.keys(ex) as (keyof StagiaireExtraction)[]).forEach((k) => {
      if (out[k] === undefined && ex[k] !== undefined && ex[k] !== "") {
        // @ts-ignore
        out[k] = ex[k];
      }
    });
  }
  return out;
};

/* ---------------- Extraction multi-stagiaires (conventions, listes) ---------------- */

export interface MultiStagiaireExtraction {
  stagiaires: StagiaireExtraction[];
  entreprise?: string;
}

const detectEntrepriseFromText = (text: string): string | undefined => {
  // Pattern 1: "NOM" s'acquittera ...
  const m1 = text.match(/["«]\s*([A-ZÉÈÀÂÔÛ0-9&\-\s]{3,60}?)\s*["»]\s*s['\u2019]?acquittera/i);
  if (m1) return m1[1].trim().replace(/\s{2,}/g, " ");

  // Pattern 2: line "FER ET ARTI" suivie d'une adresse et "Siret :"
  // On capture les blocs "NOM\n...adresse...\nSiret :"
  const blocks = [...text.matchAll(/([A-ZÉÈÀÂÔÛ][A-ZÉÈÀÂÔÛ0-9&\-\.\s]{2,60})\s*\n[^\n]{3,120}\n[^\n]{0,80}Siret\s*:/g)];
  if (blocks.length >= 2) {
    // Le 2e bloc = l'entreprise (le 1er = l'organisme de formation)
    return blocks[1][1].trim().replace(/\s{2,}/g, " ");
  }

  // Pattern 3: "Entreprise : NOM"
  const m3 = text.match(/(?:Entreprise|Employeur|Soci[ée]t[ée]|Raison sociale|Client)\s*:?\s*([^\n\r,;]{2,80})/i);
  if (m3) return m3[1].trim();

  return undefined;
};

const extractStagiairesListFromText = (text: string): StagiaireExtraction[] => {
  // Cherche la section "Article 2 - Effectif à former" ou "participants suivants"
  // jusqu'à "Article 3" ou "Dispositions financières"
  const sectionMatch = text.match(
    /(?:Article\s*2[^\n]*Effectif[^\n]*|participants?\s+suivants?\s*:?|stagiaires?\s+suivants?\s*:?|liste\s+des\s+stagiaires?\s*:?|b[ée]n[ée]ficiaires?\s+suivants?\s*:?)([\s\S]{20,2000}?)(?=Article\s*3|Dispositions\s+financ|Co[uû]t\s+p[ée]dagogique|$)/i
  );
  const section = sectionMatch ? sectionMatch[1] : text;

  // Pattern: M./Mme/Mlle NOM Prénom (NOM en majuscules, Prénom capitalisé ou mixte)
  const namePattern = /(M\.|Mme|Mlle|Madame|Monsieur)\s+([A-ZÉÈÀÂÔÛÇ][A-ZÉÈÀÂÔÛÇ\-']{1,}(?:\s+[A-ZÉÈÀÂÔÛÇ\-']{2,})*)\s+([A-ZÉÈÀÂÔÛÇa-zéèàâôûç\-']{2,}(?:[\s\-][A-ZÉÈÀÂÔÛÇa-zéèàâôûç\-']{2,})*)/g;

  const results: StagiaireExtraction[] = [];
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = namePattern.exec(section)) !== null) {
    const civRaw = m[1].toLowerCase();
    const civilite: "M." | "Mme" = (civRaw === "mme" || civRaw === "madame" || civRaw === "mlle") ? "Mme" : "M.";
    const nom = m[2].trim().toUpperCase();
    const prenom = titleCase(m[3].trim());
    const key = `${nom}|${prenom}`;
    if (seen.has(key)) continue;
    seen.add(key);
    results.push({ civilite, nom, prenom });
  }

  return results;
};

export const extractMultipleStagiairesFromFile = async (
  file: File
): Promise<MultiStagiaireExtraction> => {
  const text = await readAnyFile(file);
  const normalized = text
    .replace(/\u00A0/g, " ")
    .replace(/[\u2019\u2018\u02BC`]/g, "'");

  const entreprise = detectEntrepriseFromText(normalized);
  const liste = extractStagiairesListFromText(normalized);

  // Fallback : si aucun nom détecté dans la liste, utiliser l'extraction simple
  if (liste.length === 0) {
    const single = parseStagiaireFromText(normalized);
    if (single.nom || single.prenom) liste.push(single);
  } else {
    // Enrichir le premier stagiaire avec les autres champs détectés (dates, lieu, etc.)
    const enriched = parseStagiaireFromText(normalized);
    const first = liste[0];
    (Object.keys(enriched) as (keyof StagiaireExtraction)[]).forEach((k) => {
      if (k === "nom" || k === "prenom" || k === "civilite") return;
      if (first[k] === undefined && enriched[k] !== undefined) {
        // @ts-ignore
        first[k] = enriched[k];
      }
    });
  }

  // Appliquer l'entreprise à tous les stagiaires détectés
  if (entreprise) {
    liste.forEach((s) => {
      if (!s.entreprise) s.entreprise = entreprise;
    });
  }

  return { stagiaires: liste, entreprise };
};

