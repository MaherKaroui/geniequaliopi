/**
 * BAHO – Génération de tampons SVG ronds (auto) pour chaque hôtel et FORMAT SPHERE.
 * Style : double cercle bleu, nom curviligne en haut, ville en bas, étoiles latérales, SIRET au centre.
 */
import { FORMAT_SPHERE_ORG, type BahoEntreprise } from "./bahoData";

const STAMP_COLOR = "#0A3D7A";
const SIZE = 220;
const CENTER = SIZE / 2;
const RADIUS_OUT = 95;
const RADIUS_IN = 80;
const TEXT_RADIUS_TOP = 88;
const TEXT_RADIUS_BOTTOM = 88;

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!));
}

/** Extract a short location/city for the curved bottom text */
function extractCity(adresse: string): string {
  if (!adresse) return "";
  // Look for "12345 VILLE" pattern at end
  const m = adresse.match(/(\d{5})\s+([A-ZÀ-ÿ][A-Za-zÀ-ÿ\s\-']+?)\s*$/);
  if (m) return m[2].toUpperCase().trim();
  // Fallback: last non-numeric segment
  const parts = adresse.split(/[,\s]+/).filter(Boolean);
  for (let i = parts.length - 1; i >= 0; i--) {
    if (!/^\d+$/.test(parts[i])) return parts[i].toUpperCase();
  }
  return "";
}

/** Truncate to fit on a curved stamp arc */
function fitName(name: string, maxLen = 38): string {
  const cleaned = name.replace(/\s+/g, " ").trim().toUpperCase();
  if (cleaned.length <= maxLen) return cleaned;
  return cleaned.slice(0, maxLen - 1) + "…";
}

interface StampData {
  topText: string;    // Nom curviligne haut
  bottomText: string; // Ville curviligne bas
  centerLine1: string; // Ligne centrale 1
  centerLine2: string; // Ligne centrale 2
  centerLine3?: string; // Optionnelle (ex: NDA)
}

function buildStampSvg(d: StampData): string {
  const top = escapeXml(fitName(d.topText));
  const bottom = escapeXml(fitName(d.bottomText, 28));
  const c1 = escapeXml(d.centerLine1);
  const c2 = escapeXml(d.centerLine2);
  const c3 = d.centerLine3 ? escapeXml(d.centerLine3) : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <defs>
    <path id="topArc" d="M ${CENTER - TEXT_RADIUS_TOP},${CENTER} A ${TEXT_RADIUS_TOP},${TEXT_RADIUS_TOP} 0 0,1 ${CENTER + TEXT_RADIUS_TOP},${CENTER}" />
    <path id="botArc" d="M ${CENTER - TEXT_RADIUS_BOTTOM},${CENTER} A ${TEXT_RADIUS_BOTTOM},${TEXT_RADIUS_BOTTOM} 0 0,0 ${CENTER + TEXT_RADIUS_BOTTOM},${CENTER}" />
  </defs>
  <circle cx="${CENTER}" cy="${CENTER}" r="${RADIUS_OUT}" fill="none" stroke="${STAMP_COLOR}" stroke-width="2.5"/>
  <circle cx="${CENTER}" cy="${CENTER}" r="${RADIUS_IN}" fill="none" stroke="${STAMP_COLOR}" stroke-width="1.2"/>
  <text fill="${STAMP_COLOR}" font-family="Arial, sans-serif" font-size="11" font-weight="bold" letter-spacing="1">
    <textPath href="#topArc" startOffset="50%" text-anchor="middle">${top}</textPath>
  </text>
  <text fill="${STAMP_COLOR}" font-family="Arial, sans-serif" font-size="9" letter-spacing="0.8">
    <textPath href="#botArc" startOffset="50%" text-anchor="middle">${bottom}</textPath>
  </text>
  <text x="${CENTER - 70}" y="${CENTER + 4}" fill="${STAMP_COLOR}" font-size="14" font-weight="bold">★</text>
  <text x="${CENTER + 64}" y="${CENTER + 4}" fill="${STAMP_COLOR}" font-size="14" font-weight="bold">★</text>
  <text x="${CENTER}" y="${CENTER - 8}" fill="${STAMP_COLOR}" font-family="Arial, sans-serif" font-size="9" font-weight="bold" text-anchor="middle">${c1}</text>
  <text x="${CENTER}" y="${CENTER + 6}" fill="${STAMP_COLOR}" font-family="Arial, sans-serif" font-size="8" text-anchor="middle">${c2}</text>
  ${c3 ? `<text x="${CENTER}" y="${CENTER + 18}" fill="${STAMP_COLOR}" font-family="Arial, sans-serif" font-size="7" text-anchor="middle">${c3}</text>` : ""}
</svg>`;
}

/** Tampon de l'hôtel (auto) */
export function getHotelStampSvg(e: BahoEntreprise): string {
  return buildStampSvg({
    topText: e.nom,
    bottomText: extractCity(e.adresse) || "FRANCE",
    centerLine1: "SIRET",
    centerLine2: e.siret,
  });
}

/** Tampon FORMAT SPHERE (organisme) */
export function getFormatSphereStampSvg(): string {
  return buildStampSvg({
    topText: FORMAT_SPHERE_ORG.nom,
    bottomText: FORMAT_SPHERE_ORG.ville || "FRANCE",
    centerLine1: `SIRET ${FORMAT_SPHERE_ORG.siret}`,
    centerLine2: `NDA ${FORMAT_SPHERE_ORG.nda}`,
  });
}

/** Encode SVG en data URI (utilisable en src d'image dans HTML/PDF) */
export function svgToDataUri(svg: string): string {
  const encoded = encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22");
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}
