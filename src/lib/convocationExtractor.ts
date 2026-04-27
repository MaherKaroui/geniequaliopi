import mammoth from "mammoth";
import { StagiaireInfo } from "@/types/qualiopi";

/**
 * Extrait les informations stagiaire depuis un fichier Convocation .docx
 * Champs extraits : nom, prenom, civilite, dateDebutFormation, dateFinFormation,
 * adresse formation (lieu), email, téléphone éventuels.
 */
export interface ConvocationExtraction {
  civilite?: string;
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  dateDebutFormation?: string;
  dateFinFormation?: string;
  adresse?: string;
  // Métadonnées formation (non stockées sur stagiaire mais retournées)
  intituleFormation?: string;
  centreFormation?: string;
}

const toIsoDate = (fr: string): string | undefined => {
  // jj/mm/aaaa -> aaaa-mm-jj
  const m = fr.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (!m) return undefined;
  let [_, d, mo, y] = m;
  if (y.length === 2) y = (parseInt(y) > 50 ? "19" : "20") + y;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
};

const titleCase = (s: string) =>
  s.toLowerCase().replace(/(^|[\s\-'])(\p{L})/gu, (_, sep, c) => sep + c.toUpperCase());

export const extractConvocationFromDocx = async (
  file: File
): Promise<ConvocationExtraction> => {
  const arrayBuffer = await file.arrayBuffer();
  const { value: text } = await mammoth.extractRawText({ arrayBuffer });
  return parseConvocationText(text);
};

export const parseConvocationText = (raw: string): ConvocationExtraction => {
  const text = raw.replace(/\u00A0/g, " ").replace(/\s+\n/g, "\n");
  const result: ConvocationExtraction = {};

  // --- Nom complet via "À l'attention de :" ou "A l'attention de :"
  const attRegex = /[ÀA]\s*l['']\s*attention\s*de\s*:?\s*([^\n\r]+)/i;
  const attMatch = text.match(attRegex);
  if (attMatch) {
    let fullName = attMatch[1].trim();
    // Nettoyer
    fullName = fullName.replace(/\s{2,}/g, " ").split(/\s+Objet\s*:/i)[0].trim();

    // Détection civilité éventuelle
    const civMatch = fullName.match(/^(M\.|Mme|Madame|Monsieur|Mlle)\s+/i);
    if (civMatch) {
      const c = civMatch[1].toLowerCase();
      result.civilite = c.startsWith("m") && (c === "mme" || c === "madame") ? "Madame" : "Monsieur";
      fullName = fullName.replace(civMatch[0], "").trim();
    }

    // Heuristique : NOM en MAJUSCULES = mots tout en capitales
    const tokens = fullName.split(/\s+/);
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
    } else {
      // Fallback : dernier token = nom, le reste = prénom
      const last = tokens[tokens.length - 1] || "";
      const first = tokens.slice(0, -1).join(" ");
      result.nom = last.toUpperCase();
      result.prenom = titleCase(first);
    }
  }

  // --- Dates "du 19/02/2024 au 04/11/2024" ou "Période : du ... au ..."
  const periodRegex =
    /du\s+(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})\s+au\s+(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i;
  const periodMatch = text.match(periodRegex);
  if (periodMatch) {
    result.dateDebutFormation = toIsoDate(periodMatch[1]);
    result.dateFinFormation = toIsoDate(periodMatch[2]);
  } else {
    // Fallback : chercher "Date de début" / "Date de fin"
    const dDeb = text.match(/date\s+de?\s*d[ée]but[^:]*:\s*(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i);
    const dFin = text.match(/date\s+de?\s*fin[^:]*:\s*(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})/i);
    if (dDeb) result.dateDebutFormation = toIsoDate(dDeb[1]);
    if (dFin) result.dateFinFormation = toIsoDate(dFin[1]);
  }

  // --- Email
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  if (emailMatch && !/contact@|info@|formation@/i.test(emailMatch[0])) {
    result.email = emailMatch[0];
  }

  // --- Téléphone (FR)
  const telMatch = text.match(/(?:0|\+33\s?)[1-9](?:[\s.\-]?\d{2}){4}/);
  if (telMatch) result.telephone = telMatch[0].replace(/\s+/g, " ").trim();

  // --- Lieu de formation
  const lieuMatch = text.match(/Lieu\s*:\s*([^\n\r]+)/i);
  if (lieuMatch) result.adresse = lieuMatch[1].trim();

  // --- Intitulé
  const intMatch = text.match(/(?:Intitul[ée]|Titre Professionnel)\s*:\s*([^\n\r]+)/i);
  if (intMatch) result.intituleFormation = intMatch[1].trim();

  // --- Centre
  const centreMatch = text.match(/Centre de formation\s*:\s*([^\n\r]+)/i);
  if (centreMatch) result.centreFormation = centreMatch[1].trim();

  return result;
};

export const convocationToStagiaire = (
  extraction: ConvocationExtraction,
  base: StagiaireInfo
): StagiaireInfo => ({
  ...base,
  ...(extraction.civilite ? { civilite: extraction.civilite } : {}),
  ...(extraction.nom ? { nom: extraction.nom } : {}),
  ...(extraction.prenom ? { prenom: extraction.prenom } : {}),
  ...(extraction.email ? { email: extraction.email } : {}),
  ...(extraction.telephone ? { telephone: extraction.telephone } : {}),
  ...(extraction.dateDebutFormation ? { dateDebutFormation: extraction.dateDebutFormation } : {}),
  ...(extraction.dateFinFormation ? { dateFinFormation: extraction.dateFinFormation } : {}),
});
