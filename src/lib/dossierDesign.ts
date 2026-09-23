import type { DocStyleConfig, OrganismeInfo } from "@/types/qualiopi";
import { DEFAULT_DOC_STYLE } from "@/types/qualiopi";
import { getDocStyle } from "@/lib/docBuilder";

export const DOSSIER_AUTO_DESIGNS: Array<{ name: string; style: DocStyleConfig }> = [
  { name: "Classique marine", style: { ...DEFAULT_DOC_STYLE, theme: "classique", primaryColor: "#17365d", secondaryColor: "#356859", fontFamily: "'Source Sans 3', sans-serif", headingFont: "'Libre Baskerville', serif", headerStyle: "classic", headingStyle: "line-bottom", logoPosition: "center" } },
  { name: "Élégant bordeaux", style: { ...DEFAULT_DOC_STYLE, theme: "elegant", primaryColor: "#6b2737", secondaryColor: "#6b5d32", fontFamily: "'Lato', sans-serif", headingFont: "'Playfair Display', serif", headerStyle: "elegant", headingStyle: "underline-double", logoPosition: "center" } },
  { name: "Minimal graphite", style: { ...DEFAULT_DOC_STYLE, theme: "minimaliste", primaryColor: "#202124", secondaryColor: "#4d5b66", fontFamily: "'Outfit', sans-serif", headingFont: "'Outfit', sans-serif", headerStyle: "compact", headingStyle: "plain", logoPosition: "left" } },
  { name: "Académique forêt", style: { ...DEFAULT_DOC_STYLE, theme: "academique", primaryColor: "#244b3b", secondaryColor: "#705b36", fontFamily: "'EB Garamond', serif", headingFont: "'EB Garamond', serif", fontSize: 14, headerStyle: "boxed", headingStyle: "underline-double", logoPosition: "center" } },
  { name: "Monochrome officiel", style: { ...DEFAULT_DOC_STYLE, theme: "monochrome", primaryColor: "#111111", secondaryColor: "#525252", fontFamily: "'Arial', sans-serif", headingFont: "'Arial', sans-serif", headerStyle: "split", headingStyle: "line-bottom", logoPosition: "left" } },
  { name: "Papier premium", style: { ...DEFAULT_DOC_STYLE, theme: "simplepro", primaryColor: "#18324a", secondaryColor: "#806b3f", fontFamily: "'Arial', sans-serif", headingFont: "'Cormorant Garamond', serif", headerStyle: "elegant", headingStyle: "left-bar", logoPosition: "center" } },
];

export function organismeDesignSeed(o: Pick<OrganismeInfo, "nom" | "siret" | "dateMaj">): number {
  const value = `${o.nom || ""}|${o.siret || ""}|${o.dateMaj || ""}`;
  let seed = 0;
  for (let i = 0; i < value.length; i++) seed = (seed * 31 + value.charCodeAt(i)) >>> 0;
  return seed;
}

export function getAutomaticDossierDesign(o: Pick<OrganismeInfo, "nom" | "siret" | "dateMaj">, offset = 0) {
  const index = ((organismeDesignSeed(o) + offset) % DOSSIER_AUTO_DESIGNS.length + DOSSIER_AUTO_DESIGNS.length) % DOSSIER_AUTO_DESIGNS.length;
  return DOSSIER_AUTO_DESIGNS[index];
}

/** Adds a final, print-safe style layer without changing a generator's content. */
export function withActiveDossierStyle(html: string): string {
  const style = getDocStyle();
  const css = `<style data-dossier-style>
    body{font-family:${style.fontFamily};font-size:${style.fontSize}px;color:#111;background:#fff}
    h1,h2,h3,h4{font-family:${style.headingFont};color:${style.primaryColor}}
    h2,h3{border-color:${style.secondaryColor}}
    thead th,table th{border-color:${style.primaryColor}}
    a{color:${style.primaryColor}}
    .doc-header,.header{border-color:${style.primaryColor}}
    .footer{border-color:${style.secondaryColor};color:#222;background:#fff}
  </style>`;
  return /<\/head>/i.test(html) ? html.replace(/<\/head>/i, `${css}</head>`) : `${css}${html}`;
}