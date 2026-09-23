import type { DocStyleConfig, OrganismeInfo } from "@/types/qualiopi";
import { DEFAULT_DOC_STYLE } from "@/types/qualiopi";

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