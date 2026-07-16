import { useState, useEffect } from "react";
import { DocStyleConfig, DEFAULT_DOC_STYLE, DocTheme, HeadingStyle, HeaderStyle } from "@/types/qualiopi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Palette, Type, Layout, Paintbrush, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DocStyleConfigPanelProps {
  style: DocStyleConfig;
  onChange: (style: DocStyleConfig) => void;
}

interface ThemePreset {
  id: DocTheme;
  name: string;
  description: string;
  defaults: Partial<DocStyleConfig>;
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: "classique", name: "Classique",
    description: "Lignes bleues, tableaux alternés bleu/blanc, bordures fines",
    defaults: { primaryColor: "#1e3a7b", secondaryColor: "#2d8659", fontFamily: "'Segoe UI', Arial, sans-serif", headingFont: "'Segoe UI', Arial, sans-serif" }
  },
  {
    id: "moderne", name: "Moderne",
    description: "Dégradés, coins arrondis, ombres douces, titres colorés plein",
    defaults: { primaryColor: "#0277bd", secondaryColor: "#ef6c00", fontFamily: "'DM Sans', sans-serif", headingFont: "'Space Grotesk', sans-serif" }
  },
  {
    id: "elegant", name: "Élégant",
    description: "Titres italiques, bordures subtiles, tons pastel, style raffiné",
    defaults: { primaryColor: "#4a148c", secondaryColor: "#c8a415", fontFamily: "'Raleway', sans-serif", headingFont: "'Playfair Display', serif" }
  },
  {
    id: "minimaliste", name: "Minimaliste",
    description: "Pas de fond, lignes fines, noir dominant, ultra-épuré",
    defaults: { primaryColor: "#212121", secondaryColor: "#616161", fontFamily: "'Outfit', sans-serif", headingFont: "'Outfit', sans-serif" }
  },
  {
    id: "bold", name: "Bold / Impact",
    description: "En-têtes pleins, majuscules, bordures épaisses, look puissant",
    defaults: { primaryColor: "#ad1457", secondaryColor: "#00838f", fontFamily: "'Barlow', sans-serif", headingFont: "'Montserrat', sans-serif" }
  },
  {
    id: "nature", name: "Nature / Doux",
    description: "Dégradés légers, bordures pointillées, tons organiques",
    defaults: { primaryColor: "#1b5e20", secondaryColor: "#e65100", fontFamily: "'Nunito', sans-serif", headingFont: "'Lora', serif" }
  },
  {
    id: "academique", name: "Académique",
    description: "Doubles bordures, quadrillage complet, style universitaire",
    defaults: { primaryColor: "#37474f", secondaryColor: "#5d4037", fontFamily: "'EB Garamond', serif", headingFont: "'EB Garamond', serif", fontSize: 14 }
  },
  {
    id: "corporate", name: "Corporate Pro",
    description: "En-têtes avec ombre, tableaux encadrés, look entreprise premium",
    defaults: { primaryColor: "#1a237e", secondaryColor: "#00695c", fontFamily: "'Inter', sans-serif", headingFont: "'Inter', sans-serif" }
  },
  {
    id: "editorial", name: "Éditorial Magazine",
    description: "Style presse haut de gamme, serif majestueuse, filets fins, capitales espacées",
    defaults: { primaryColor: "#1a1a1a", secondaryColor: "#b8860b", fontFamily: "'Source Serif 4', serif", headingFont: "'Playfair Display', serif", fontSize: 13 }
  },
  {
    id: "neobrutaliste", name: "Néo-Brutaliste",
    description: "Aplats vifs, bordures noires épaisses, ombres dures décalées, look pop choc",
    defaults: { primaryColor: "#ff3366", secondaryColor: "#facc15", fontFamily: "'Space Grotesk', sans-serif", headingFont: "'Space Grotesk', sans-serif" }
  },
  {
    id: "futuriste", name: "Futuriste / Cyber",
    description: "Lignes néon, gradients tech, tableaux sombres, typographie monospace d'accent",
    defaults: { primaryColor: "#0ea5e9", secondaryColor: "#a855f7", fontFamily: "'Sora', sans-serif", headingFont: "'Space Grotesk', sans-serif" }
  },
  {
    id: "luxe", name: "Luxe Noir & Or",
    description: "Fond crème, accents dorés, sérif raffinée, esprit boutique-hôtel",
    defaults: { primaryColor: "#1a1a1a", secondaryColor: "#c9a14a", fontFamily: "'Cormorant Garamond', serif", headingFont: "'DM Serif Display', serif", fontSize: 14 }
  },
  {
    id: "scandinave", name: "Scandinave / Doux",
    description: "Pastels poudrés, beaucoup d'air, formes très arrondies, ambiance feutrée",
    defaults: { primaryColor: "#5b8a8a", secondaryColor: "#d4a574", fontFamily: "'Manrope', sans-serif", headingFont: "'Fraunces', serif" }
  },
  {
    id: "artdeco", name: "Art Déco",
    description: "Géométrie dorée, doubles filets, symétrie, années 1920 chic",
    defaults: { primaryColor: "#0b1d2a", secondaryColor: "#c9a14a", fontFamily: "'Cormorant Garamond', serif", headingFont: "'DM Serif Display', serif" }
  },
  {
    id: "consulting", name: "Consulting (McKinsey)",
    description: "Bandeau bleu nuit, KPI mis en avant, tableaux denses, look cabinet de conseil",
    defaults: { primaryColor: "#051c2c", secondaryColor: "#00a3e0", fontFamily: "'Inter', sans-serif", headingFont: "'Inter', sans-serif", fontSize: 12 }
  },
  {
    id: "notarial", name: "Notarial / Officiel",
    description: "Filigrane bordeaux, sérif classique, numérotation, esprit étude notariale",
    defaults: { primaryColor: "#5e1a1a", secondaryColor: "#8b6f3a", fontFamily: "'EB Garamond', serif", headingFont: "'EB Garamond', serif", fontSize: 14 }
  },
  {
    id: "techstartup", name: "Tech Startup",
    description: "Dégradés indigo/cyan, cartes arrondies, tags pilule, look SaaS moderne",
    defaults: { primaryColor: "#4f46e5", secondaryColor: "#06b6d4", fontFamily: "'Inter', sans-serif", headingFont: "'Plus Jakarta Sans', sans-serif" }
  },
  {
    id: "botanique", name: "Botanique Premium",
    description: "Vert forêt profond sur crème, sérif douce, filigranes feuilles, raffiné nature",
    defaults: { primaryColor: "#2c4a2a", secondaryColor: "#a87c4f", fontFamily: "'Lora', serif", headingFont: "'Fraunces', serif" }
  },
  {
    id: "suisse", name: "Suisse / Helvetica",
    description: "Grille stricte, rouge pur, sans-serif géométrique, design Swiss style",
    defaults: { primaryColor: "#1a1a1a", secondaryColor: "#e30613", fontFamily: "'Inter', sans-serif", headingFont: "'Inter', sans-serif" }
  },
  {
    id: "monochrome", name: "Monochrome Pro",
    description: "Noir & blanc pur, typographie forte, ultra professionnel sans couleur",
    defaults: { primaryColor: "#000000", secondaryColor: "#525252", fontFamily: "'Inter', sans-serif", headingFont: "'Inter', sans-serif" }
  },
  {
    id: "pastel", name: "Pastel Doux",
    description: "Tons pastel poudrés, formes arrondies, ambiance moderne et douce",
    defaults: { primaryColor: "#7c6fb8", secondaryColor: "#e8a87c", fontFamily: "'Manrope', sans-serif", headingFont: "'Plus Jakarta Sans', sans-serif" }
  },
  {
    id: "presse", name: "Presse / Journal",
    description: "Look journal classique, serif noire, filets, capitales — esprit éditorial",
    defaults: { primaryColor: "#1a1a1a", secondaryColor: "#8b0000", fontFamily: "'PT Serif', serif", headingFont: "'Playfair Display', serif", fontSize: 13 }
  },
  {
    id: "terracotta", name: "Terracotta Chaleureux",
    description: "Terre cuite, sable et ocre, chaleureux et artisanal",
    defaults: { primaryColor: "#a0522d", secondaryColor: "#c9a14a", fontFamily: "'Nunito', sans-serif", headingFont: "'Fraunces', serif" }
  },
  {
    id: "simplepro", name: "Papier en-tête premium",
    description: "Page A4 blanche, en-tête centré sérif, filet doré, tableaux ultra sobres — esprit papeterie haut de gamme",
    defaults: { primaryColor: "#0f2a4a", secondaryColor: "#b8924a", fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif", headingFont: "'Cormorant Garamond', 'EB Garamond', serif", fontSize: 13 }
  },
  {
    id: "epure", name: "Épuré (modèle contrat)",
    description: "Page A4 100% blanche, titre noir centré en majuscules, sans-serif, aucun fond ni couleur — style document administratif",
    defaults: { primaryColor: "#000000", secondaryColor: "#000000", fontFamily: "Arial, Helvetica, sans-serif", headingFont: "Arial, Helvetica, sans-serif", fontSize: 12 }
  },
];

const FONT_CATEGORIES = [
  {
    label: "Sans-serif modernes",
    fonts: [
      { value: "'Segoe UI', Arial, sans-serif", label: "Segoe UI" },
      { value: "'Inter', sans-serif", label: "Inter" },
      { value: "'Poppins', sans-serif", label: "Poppins" },
      { value: "'Montserrat', sans-serif", label: "Montserrat" },
      { value: "'Open Sans', sans-serif", label: "Open Sans" },
      { value: "'Lato', sans-serif", label: "Lato" },
      { value: "'Roboto', sans-serif", label: "Roboto" },
      { value: "'Nunito', sans-serif", label: "Nunito" },
      { value: "'Raleway', sans-serif", label: "Raleway" },
      { value: "'DM Sans', sans-serif", label: "DM Sans" },
      { value: "'Rubik', sans-serif", label: "Rubik" },
      { value: "'Outfit', sans-serif", label: "Outfit" },
      { value: "'Plus Jakarta Sans', sans-serif", label: "Plus Jakarta Sans" },
      { value: "'Manrope', sans-serif", label: "Manrope" },
      { value: "'Work Sans', sans-serif", label: "Work Sans" },
      { value: "'Quicksand', sans-serif", label: "Quicksand" },
      { value: "'Barlow', sans-serif", label: "Barlow" },
      { value: "'Source Sans 3', sans-serif", label: "Source Sans 3" },
      { value: "'Cabin', sans-serif", label: "Cabin" },
      { value: "'Mulish', sans-serif", label: "Mulish" },
    ]
  },
  {
    label: "Sans-serif géométriques",
    fonts: [
      { value: "'Space Grotesk', sans-serif", label: "Space Grotesk" },
      { value: "'Sora', sans-serif", label: "Sora" },
      { value: "'Figtree', sans-serif", label: "Figtree" },
      { value: "'Albert Sans', sans-serif", label: "Albert Sans" },
      { value: "'Lexend', sans-serif", label: "Lexend" },
      { value: "'Red Hat Display', sans-serif", label: "Red Hat Display" },
      { value: "'Urbanist', sans-serif", label: "Urbanist" },
    ]
  },
  {
    label: "Serif élégantes",
    fonts: [
      { value: "'Merriweather', serif", label: "Merriweather" },
      { value: "Georgia, serif", label: "Georgia" },
      { value: "'Playfair Display', serif", label: "Playfair Display" },
      { value: "'Libre Baskerville', serif", label: "Libre Baskerville" },
      { value: "'Lora', serif", label: "Lora" },
      { value: "'Source Serif 4', serif", label: "Source Serif 4" },
      { value: "'Crimson Text', serif", label: "Crimson Text" },
      { value: "'PT Serif', serif", label: "PT Serif" },
      { value: "'EB Garamond', serif", label: "EB Garamond" },
      { value: "'Cormorant Garamond', serif", label: "Cormorant Garamond" },
      { value: "'Spectral', serif", label: "Spectral" },
      { value: "'Bitter', serif", label: "Bitter" },
      { value: "'Noto Serif', serif", label: "Noto Serif" },
      { value: "'DM Serif Display', serif", label: "DM Serif Display" },
      { value: "'Fraunces', serif", label: "Fraunces" },
    ]
  },
  {
    label: "Monospace",
    fonts: [
      { value: "'Courier New', monospace", label: "Courier New" },
      { value: "'JetBrains Mono', monospace", label: "JetBrains Mono" },
      { value: "'Fira Code', monospace", label: "Fira Code" },
      { value: "'IBM Plex Mono', monospace", label: "IBM Plex Mono" },
      { value: "'Space Mono', monospace", label: "Space Mono" },
    ]
  },
];

const COLOR_PRESETS = [
  { name: "Bleu classique", primary: "#1e3a7b", secondary: "#2d8659" },
  { name: "Marine & Or", primary: "#1a237e", secondary: "#c8a415" },
  { name: "Bordeaux", primary: "#7b1e3a", secondary: "#2d5986" },
  { name: "Vert forêt", primary: "#1b5e20", secondary: "#e65100" },
  { name: "Noir élégant", primary: "#212121", secondary: "#1565c0" },
  { name: "Violet pro", primary: "#4a148c", secondary: "#00695c" },
  { name: "Bleu tech", primary: "#0277bd", secondary: "#ef6c00" },
  { name: "Rose entreprise", primary: "#ad1457", secondary: "#00838f" },
  { name: "Bleu pétrole", primary: "#004d61", secondary: "#bf360c" },
  { name: "Olive doré", primary: "#5d4037", secondary: "#827717" },
  { name: "Bleu ardoise", primary: "#37474f", secondary: "#00897b" },
  { name: "Prune & Menthe", primary: "#6a1b9a", secondary: "#26a69a" },
];

// Mini preview renderer per theme
function HeadingMiniPreview({ headingStyle, primary, secondary, headFont }: { headingStyle: HeadingStyle; primary: string; secondary: string; headFont: string }) {
  const base = { fontFamily: headFont, fontWeight: 700, fontSize: 10 } as React.CSSProperties;
  const styles: Record<HeadingStyle, React.CSSProperties> = {
    'line-bottom': { ...base, color: primary, borderBottom: `2px solid ${primary}`, paddingBottom: 2 },
    'filled': { ...base, background: primary, color: "white", padding: "3px 8px", borderRadius: 4 },
    'gradient': { ...base, background: `linear-gradient(135deg,${primary},${secondary})`, color: "white", padding: "3px 8px", borderRadius: 6 },
    'left-bar': { ...base, borderLeft: `3px solid ${primary}`, paddingLeft: 8, color: primary, background: `${primary}08` },
    'underline-double': { ...base, color: primary, borderBottom: `3px double ${primary}`, paddingBottom: 2 },
    'plain': { ...base, color: primary },
    'pill': { ...base, background: `${primary}12`, color: primary, padding: "3px 12px", borderRadius: 20 },
  };
  return <div style={styles[headingStyle]}>Titre</div>;
}

function HeaderMiniPreview({ headerStyle, primary, headFont }: { headerStyle: HeaderStyle; primary: string; headFont: string }) {
  const nameStyle = { fontFamily: headFont, fontWeight: 700, fontSize: 10 } as React.CSSProperties;
  const subStyle = { fontSize: 7, color: "#888", marginTop: 1 } as React.CSSProperties;
  if (headerStyle === 'banner') {
    return (<div style={{ background: primary, color: "white", padding: "4px 8px", borderRadius: 5 }}>
      <div style={{ ...nameStyle, color: "white" }}>ORGANISME</div>
      <div style={{ ...subStyle, color: "rgba(255,255,255,0.8)" }}>NDA – SIRET</div>
    </div>);
  }
  if (headerStyle === 'compact') {
    return (<div style={{ display: "flex", alignItems: "center", gap: 6, borderBottom: `1.5px solid ${primary}`, paddingBottom: 3 }}>
      <div style={{ width: 14, height: 14, borderRadius: 3, background: `${primary}20`, flexShrink: 0 }} />
      <div><div style={{ ...nameStyle, color: primary }}>ORGANISME</div><div style={subStyle}>NDA – SIRET</div></div>
    </div>);
  }
  if (headerStyle === 'elegant') {
    return (<div style={{ textAlign: "center" }}>
      <div style={{ ...nameStyle, color: primary, fontStyle: "italic" }}>ORGANISME</div>
      <div style={{ width: 20, height: 1.5, background: primary, margin: "3px auto", opacity: 0.5 }} />
      <div style={{ ...subStyle, letterSpacing: 0.3 }}>NDA – SIRET</div>
    </div>);
  }
  if (headerStyle === 'boxed') {
    return (<div style={{ border: `1.5px solid ${primary}`, borderRadius: 6, padding: "4px 8px", textAlign: "center" }}>
      <div style={{ ...nameStyle, color: primary }}>ORGANISME</div>
      <div style={subStyle}>NDA – SIRET</div>
    </div>);
  }
  if (headerStyle === 'split') {
    return (<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `2px solid ${primary}`, borderBottom: `2px solid ${primary}`, padding: "3px 0" }}>
      <div style={{ ...nameStyle, color: primary }}>ORGANISME</div>
      <div style={{ fontSize: 6, color: "#888", textAlign: "right" }}>NDA<br/>SIRET</div>
    </div>);
  }
  return (<div style={{ textAlign: "center" }}>
    <div style={{ ...nameStyle, color: primary }}>ORGANISME</div>
    <div style={subStyle}>NDA – SIRET</div>
  </div>);
}

function ThemeMiniPreview({ theme, primary, secondary, bodyFont, headFont }: { theme: DocTheme; primary: string; secondary: string; bodyFont: string; headFont: string; fontSize: number }) {
  const common = { fontSize: 8, lineHeight: "1.4" };

  const h1Styles: Record<DocTheme, React.CSSProperties> = {
    classique: { borderBottom: `2px solid ${primary}`, paddingBottom: 3, color: primary, fontFamily: headFont, fontWeight: 700, fontSize: 11 },
    moderne: { background: `linear-gradient(135deg,${primary},${secondary})`, color: "white", padding: "4px 8px", borderRadius: 6, fontFamily: headFont, fontWeight: 700, fontSize: 11 },
    elegant: { borderBottom: `1px solid ${primary}60`, color: primary, fontFamily: headFont, fontWeight: 600, fontStyle: "italic", fontSize: 11 },
    minimaliste: { color: "#111", fontFamily: headFont, fontWeight: 800, letterSpacing: -0.5, fontSize: 11 },
    bold: { background: primary, color: "white", padding: "4px 8px", fontFamily: headFont, fontWeight: 800, textTransform: "uppercase" as const, letterSpacing: 0.5, fontSize: 10 },
    nature: { background: `${primary}15`, borderLeft: `3px solid ${primary}`, padding: "3px 8px", color: primary, fontFamily: headFont, fontWeight: 700, fontSize: 11, borderRadius: "0 4px 4px 0" },
    academique: { borderBottom: `3px double ${primary}`, paddingBottom: 3, color: primary, fontFamily: headFont, fontWeight: 600, fontSize: 11 },
    corporate: { background: primary, color: "white", padding: "5px 8px", borderRadius: 4, boxShadow: `0 1px 4px ${primary}50`, fontFamily: headFont, fontWeight: 700, fontSize: 11 },
    editorial: { color: primary, fontFamily: headFont, fontWeight: 700, fontStyle: "italic", fontSize: 13, borderBottom: `0.5px solid ${primary}`, paddingBottom: 3, letterSpacing: -0.3 },
    neobrutaliste: { background: primary, color: "#fff", padding: "4px 8px", border: "2px solid #000", boxShadow: "3px 3px 0 #000", fontFamily: headFont, fontWeight: 800, fontSize: 11, textTransform: "uppercase" as const },
    futuriste: { background: `linear-gradient(90deg,${primary},${secondary})`, color: "#fff", padding: "4px 8px", fontFamily: headFont, fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" as const, clipPath: "polygon(0 0,100% 0,98% 100%,2% 100%)" },
    luxe: { color: primary, fontFamily: headFont, fontWeight: 400, fontSize: 13, borderTop: `1px solid ${secondary}`, borderBottom: `1px solid ${secondary}`, padding: "3px 0", textAlign: "center" as const, letterSpacing: 2, textTransform: "uppercase" as const },
    scandinave: { background: `${primary}18`, color: primary, padding: "4px 10px", borderRadius: 20, fontFamily: headFont, fontWeight: 600, fontSize: 11 },
    artdeco: { color: secondary, fontFamily: headFont, fontWeight: 700, fontSize: 12, textAlign: "center" as const, borderTop: `3px double ${secondary}`, borderBottom: `3px double ${secondary}`, padding: "3px 0", letterSpacing: 3, textTransform: "uppercase" as const },
    consulting: { background: primary, color: "#fff", padding: "5px 10px", fontFamily: headFont, fontWeight: 700, fontSize: 11, borderLeft: `4px solid ${secondary}` },
    notarial: { color: primary, fontFamily: headFont, fontWeight: 700, fontSize: 12, fontStyle: "italic" as const, borderBottom: `2px solid ${primary}`, paddingBottom: 3, textAlign: "center" as const },
    techstartup: { background: `linear-gradient(135deg,${primary},${secondary})`, color: "#fff", padding: "5px 12px", borderRadius: 10, fontFamily: headFont, fontWeight: 700, fontSize: 11 },
    botanique: { color: primary, fontFamily: headFont, fontWeight: 600, fontSize: 12, fontStyle: "italic" as const, borderBottom: `1px solid ${secondary}80`, paddingBottom: 3 },
    suisse: { color: "#111", fontFamily: headFont, fontWeight: 800, fontSize: 14, letterSpacing: -0.5, borderLeft: `4px solid ${secondary}`, paddingLeft: 6 },
    monochrome: { color: "#000", fontFamily: headFont, fontWeight: 900, fontSize: 13, textTransform: "uppercase" as const, letterSpacing: 1, borderBottom: "3px solid #000", paddingBottom: 3 },
    pastel: { background: `${primary}20`, color: primary, padding: "5px 12px", borderRadius: 14, fontFamily: headFont, fontWeight: 700, fontSize: 11 },
    presse: { color: "#000", fontFamily: headFont, fontWeight: 900, fontSize: 14, textAlign: "center" as const, borderTop: "2px solid #000", borderBottom: "0.5px solid #000", padding: "4px 0", textTransform: "uppercase" as const, letterSpacing: 1 },
    terracotta: { background: `${primary}15`, color: primary, padding: "4px 10px", borderLeft: `4px solid ${secondary}`, fontFamily: headFont, fontWeight: 700, fontSize: 11, borderRadius: "0 8px 8px 0" },
    simplepro: { color: primary, fontFamily: headFont, fontWeight: 700, fontSize: 12, borderBottom: `1.5px solid ${primary}`, paddingBottom: 3, letterSpacing: 0.2 },
    epure: { color: "#000", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 700, fontSize: 13, textAlign: "center" as const, textTransform: "uppercase" as const, letterSpacing: 1.5, padding: "4px 0" },
  };

  const thStyles: Record<DocTheme, React.CSSProperties> = {
    classique: { background: primary, color: "white", padding: "2px 4px", fontSize: 7 },
    moderne: { background: `linear-gradient(135deg,${primary},${primary}dd)`, color: "white", padding: "2px 4px", fontSize: 7, textTransform: "uppercase" as const, letterSpacing: 0.3 },
    elegant: { background: `${primary}12`, color: primary, padding: "2px 4px", fontSize: 7, borderBottom: `1px solid ${primary}40` },
    minimaliste: { background: "none", color: "#111", padding: "2px 4px", fontSize: 7, borderBottom: "1.5px solid #111", fontWeight: 700 },
    bold: { background: primary, color: "white", padding: "2px 4px", fontSize: 7, textTransform: "uppercase" as const, fontWeight: 800 },
    nature: { background: `${primary}18`, color: primary, padding: "2px 4px", fontSize: 7, borderBottom: `1px solid ${primary}30` },
    academique: { background: `${primary}10`, color: primary, padding: "2px 4px", fontSize: 7, borderBottom: `1.5px solid ${primary}`, borderRight: `0.5px solid ${primary}20` },
    corporate: { background: primary, color: "white", padding: "3px 4px", fontSize: 7 },
    editorial: { background: "none", color: primary, padding: "2px 4px", fontSize: 7, borderBottom: `1.5px solid ${primary}`, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1 },
    neobrutaliste: { background: secondary, color: "#000", padding: "3px 4px", fontSize: 7, border: "1.5px solid #000", fontWeight: 800 },
    futuriste: { background: `${primary}30`, color: primary, padding: "2px 4px", fontSize: 7, borderBottom: `1px solid ${primary}`, textTransform: "uppercase" as const, letterSpacing: 0.5 },
    luxe: { background: "none", color: primary, padding: "3px 4px", fontSize: 7, borderBottom: `0.5px solid ${secondary}`, fontStyle: "italic" as const, fontWeight: 600 },
    scandinave: { background: `${primary}10`, color: primary, padding: "3px 6px", fontSize: 7, borderRadius: 6 },
    artdeco: { background: primary, color: secondary, padding: "3px 4px", fontSize: 7, borderTop: `1px solid ${secondary}`, borderBottom: `1px solid ${secondary}`, textTransform: "uppercase" as const, letterSpacing: 0.5 },
    consulting: { background: primary, color: "#fff", padding: "3px 5px", fontSize: 7, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 0.5 },
    notarial: { background: `${primary}10`, color: primary, padding: "3px 5px", fontSize: 7, borderBottom: `1.5px solid ${primary}`, fontStyle: "italic" as const, fontWeight: 700 },
    techstartup: { background: `${primary}12`, color: primary, padding: "3px 5px", fontSize: 7, fontWeight: 700, borderRadius: 4 },
    botanique: { background: `${primary}15`, color: primary, padding: "3px 5px", fontSize: 7, fontWeight: 600, borderBottom: `1px solid ${primary}40` },
    suisse: { background: "#111", color: "#fff", padding: "3px 5px", fontSize: 7, fontWeight: 700, textTransform: "uppercase" as const },
    monochrome: { background: "#000", color: "#fff", padding: "3px 5px", fontSize: 7, fontWeight: 800, textTransform: "uppercase" as const, letterSpacing: 0.5 },
    pastel: { background: `${primary}15`, color: primary, padding: "3px 6px", fontSize: 7, fontWeight: 600, borderRadius: 6 },
    presse: { background: "none", color: "#000", padding: "2px 4px", fontSize: 7, borderTop: "1px solid #000", borderBottom: "1px solid #000", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 0.8 },
    terracotta: { background: `${primary}18`, color: primary, padding: "3px 5px", fontSize: 7, fontWeight: 700, borderBottom: `1px solid ${primary}50` },
    simplepro: { background: primary, color: "#fff", padding: "3px 5px", fontSize: 7, fontWeight: 600, letterSpacing: 0.2 },
    epure: { background: "#fff", color: "#000", padding: "3px 5px", fontSize: 7, fontWeight: 700, borderBottom: "1px solid #000" },
  };

  const sectionStyles: Record<DocTheme, React.CSSProperties> = {
    classique: { background: "#f8f9fa", borderLeft: `3px solid ${primary}`, borderRadius: 4, padding: "3px 6px", ...common, fontFamily: bodyFont },
    moderne: { background: `linear-gradient(135deg,${primary}08,${secondary}08)`, borderLeft: `3px solid ${primary}`, borderRadius: 6, padding: "3px 6px", ...common, fontFamily: bodyFont },
    elegant: { background: `${primary}06`, borderLeft: `2px solid ${primary}60`, borderRight: `2px solid ${primary}20`, borderRadius: 2, padding: "3px 6px", ...common, fontFamily: bodyFont },
    minimaliste: { borderLeft: `1.5px solid #111`, padding: "3px 6px", ...common, fontFamily: bodyFont },
    bold: { background: `${primary}08`, borderLeft: `4px solid ${primary}`, padding: "3px 6px", ...common, fontFamily: bodyFont },
    nature: { background: `linear-gradient(to right,${primary}08,${secondary}05)`, borderLeft: `3px solid ${secondary}`, borderRadius: 4, padding: "3px 6px", ...common, fontFamily: bodyFont },
    academique: { border: `0.5px solid ${primary}25`, borderLeft: `3px solid ${primary}`, padding: "3px 6px", ...common, fontFamily: bodyFont },
    corporate: { background: "#f4f7fb", borderLeft: `3px solid ${secondary}`, borderRadius: 4, padding: "3px 6px", boxShadow: "0 0.5px 2px rgba(0,0,0,0.04)", ...common, fontFamily: bodyFont },
    editorial: { borderTop: `0.5px solid ${primary}`, borderBottom: `0.5px solid ${primary}`, padding: "5px 6px", ...common, fontFamily: bodyFont, color: "#222", fontStyle: "italic" as const },
    neobrutaliste: { background: "#fff", border: "2px solid #000", boxShadow: "3px 3px 0 #000", padding: "3px 6px", ...common, fontFamily: bodyFont, color: "#000", fontWeight: 600 },
    futuriste: { background: "linear-gradient(135deg,#0f172a,#1e293b)", borderLeft: `2px solid ${secondary}`, borderRadius: 3, padding: "4px 6px", ...common, fontFamily: bodyFont, color: "#e2e8f0" },
    luxe: { background: "#faf6ee", borderLeft: `2px solid ${secondary}`, padding: "4px 8px", ...common, fontFamily: bodyFont, color: primary, fontStyle: "italic" as const },
    scandinave: { background: `${primary}10`, padding: "5px 10px", ...common, fontFamily: bodyFont, color: primary, borderRadius: 12 },
    artdeco: { background: "#fbf7ee", border: `1px solid ${secondary}80`, padding: "4px 8px", ...common, fontFamily: bodyFont, color: primary },
    consulting: { background: "#f4f6f9", borderLeft: `4px solid ${secondary}`, padding: "4px 8px", ...common, fontFamily: bodyFont, color: primary, fontWeight: 500 },
    notarial: { background: "#fbf8f3", border: `0.5px solid ${primary}40`, padding: "4px 8px", ...common, fontFamily: bodyFont, color: primary, fontStyle: "italic" as const },
    techstartup: { background: `linear-gradient(135deg,${primary}10,${secondary}10)`, border: `1px solid ${primary}20`, borderRadius: 10, padding: "4px 8px", ...common, fontFamily: bodyFont, color: primary },
    botanique: { background: "#f7f3ea", borderLeft: `3px solid ${primary}`, padding: "4px 8px", ...common, fontFamily: bodyFont, color: primary, fontStyle: "italic" as const },
    suisse: { background: "#fff", borderLeft: `4px solid ${secondary}`, padding: "4px 8px", ...common, fontFamily: bodyFont, color: "#111", fontWeight: 500 },
    monochrome: { background: "#fafafa", borderLeft: "3px solid #000", padding: "4px 8px", ...common, fontFamily: bodyFont, color: "#000" },
    pastel: { background: `${primary}12`, borderRadius: 12, padding: "5px 10px", ...common, fontFamily: bodyFont, color: primary },
    presse: { background: "#fcfaf5", borderTop: "0.5px solid #000", borderBottom: "0.5px solid #000", padding: "5px 8px", ...common, fontFamily: bodyFont, color: "#222", fontStyle: "italic" as const },
    terracotta: { background: `${primary}10`, borderLeft: `3px solid ${secondary}`, borderRadius: "0 6px 6px 0", padding: "4px 8px", ...common, fontFamily: bodyFont, color: primary },
    simplepro: { background: "#f5f8fc", borderLeft: `3px solid ${primary}`, padding: "4px 8px", ...common, fontFamily: bodyFont, color: "#1a1a1a" },
    epure: { background: "#fff", padding: "3px 0", ...common, fontFamily: "Arial, Helvetica, sans-serif", color: "#000" },
  };

  return (
    <div className="bg-white rounded border p-2 space-y-1.5" style={{ minHeight: 90 }}>
      <div style={h1Styles[theme]}>Titre principal</div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 7, fontFamily: bodyFont }}>
        <thead><tr>
          <th style={thStyles[theme]}>Colonne</th>
          <th style={thStyles[theme]}>Valeur</th>
        </tr></thead>
        <tbody>
          <tr><td style={{ padding: "1px 4px", borderBottom: "0.5px solid #eee" }}>Ligne 1</td><td style={{ padding: "1px 4px", borderBottom: "0.5px solid #eee" }}>Données</td></tr>
          <tr style={{ background: theme === "minimaliste" ? "transparent" : `${primary}06` }}><td style={{ padding: "1px 4px" }}>Ligne 2</td><td style={{ padding: "1px 4px" }}>Données</td></tr>
        </tbody>
      </table>
      <div style={sectionStyles[theme]}>Section encadrée</div>
    </div>
  );
}

interface SavedTheme {
  id: string;
  name: string;
  config: DocStyleConfig;
}

const DocStyleConfigPanel = ({ style, onChange }: DocStyleConfigPanelProps) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"themes" | "colors" | "fonts" | "layout">("themes");
  const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);
  const [saveName, setSaveName] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);

  useEffect(() => {
    if (expanded) loadSavedThemes();
  }, [expanded]);

  const loadSavedThemes = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("saved_themes").select("id, name, config").eq("user_id", user.id).order("created_at", { ascending: false });
    if (data) setSavedThemes(data.map(d => ({ id: d.id, name: d.name, config: d.config as unknown as DocStyleConfig })));
  };

  const handleSave = async () => {
    if (!saveName.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error("Connectez-vous pour sauvegarder"); return; }
    const { error } = await supabase.from("saved_themes").insert({
      user_id: user.id,
      name: saveName.trim(),
      config: style as unknown as Record<string, unknown>
    } as any);
    if (error) { toast.error("Erreur de sauvegarde"); return; }
    toast.success(`Thème "${saveName.trim()}" sauvegardé`);
    setSaveName("");
    setShowSaveInput(false);
    loadSavedThemes();
  };

  const handleDelete = async (id: string, name: string) => {
    const { error } = await supabase.from("saved_themes").delete().eq("id", id);
    if (error) { toast.error("Erreur"); return; }
    toast.success(`Thème "${name}" supprimé`);
    loadSavedThemes();
  };

  const update = (field: keyof DocStyleConfig, value: string | number) => {
    onChange({ ...style, [field]: value });
  };

  const applyTheme = (preset: ThemePreset) => {
    onChange({ ...style, ...preset.defaults, theme: preset.id });
  };

  const tabs = [
    { id: "themes" as const, label: "Thèmes", icon: Paintbrush },
    { id: "colors" as const, label: "Couleurs", icon: Palette },
    { id: "fonts" as const, label: "Polices", icon: Type },
    { id: "layout" as const, label: "Mise en page", icon: Layout },
  ];

  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-card">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left"
      >
        {expanded ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        <div className="flex-1">
          <span className="text-sm font-semibold">Personnaliser le design des documents</span>
          <span className="text-xs text-muted-foreground ml-2">Thèmes, couleurs, polices</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={(e) => { e.stopPropagation(); onChange({ ...DEFAULT_DOC_STYLE }); }}
        >
          Réinitialiser
        </Button>
      </button>

      {expanded && (
        <div className="border-t">
          {/* Tabs */}
          <div className="flex border-b bg-muted/30">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-primary text-primary bg-background"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 space-y-4">
            {/* THEMES TAB */}
            {activeTab === "themes" && (
              <div className="space-y-3">
                <Label className="text-xs font-semibold text-muted-foreground">CHOISISSEZ UN DESIGN COMPLET</Label>
                <div className="grid grid-cols-2 gap-3">
                  {THEME_PRESETS.map(preset => {
                    const isActive = style.theme === preset.id;
                    const p = preset.defaults;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => applyTheme(preset)}
                        className={`text-left rounded-lg border transition-all hover:shadow-md overflow-hidden ${
                          isActive ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/30"
                        }`}
                      >
                        <div className="p-2.5 pb-1.5">
                          <div className="flex items-center gap-2 mb-0.5">
                            <div className="flex gap-0.5">
                              <div className="w-3 h-3 rounded-full" style={{ background: p.primaryColor }} />
                              <div className="w-3 h-3 rounded-full" style={{ background: p.secondaryColor }} />
                            </div>
                            <span className="text-xs font-bold">{preset.name}</span>
                            {isActive && <span className="text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full ml-auto">Actif</span>}
                          </div>
                          <div className="text-[9px] text-muted-foreground mb-1.5">{preset.description}</div>
                        </div>
                        <div className="px-2.5 pb-2.5">
                          <ThemeMiniPreview
                            theme={preset.id}
                            primary={p.primaryColor || "#1e3a7b"}
                            secondary={p.secondaryColor || "#2d8659"}
                            bodyFont={p.fontFamily || "'Segoe UI'"}
                            headFont={p.headingFont || "'Segoe UI'"}
                            fontSize={p.fontSize || 13}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Save current theme */}
                <div className="border-t pt-3 mt-3">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Nom du thème à sauvegarder..."
                      value={saveName}
                      onChange={e => setSaveName(e.target.value)}
                      className="text-xs h-8 flex-1"
                      onKeyDown={e => e.key === "Enter" && handleSave()}
                    />
                    <Button size="sm" className="h-8 text-xs gap-1" onClick={handleSave} disabled={!saveName.trim()}>
                      <Save className="w-3 h-3" /> Sauvegarder
                    </Button>
                  </div>
                </div>

                {/* Saved themes */}
                {savedThemes.length > 0 && (
                  <div className="border-t pt-3 mt-3">
                    <Label className="text-xs font-semibold text-muted-foreground mb-2 block">MES THÈMES SAUVEGARDÉS</Label>
                    <div className="space-y-1.5">
                      {savedThemes.map(st => (
                        <div key={st.id} className="flex items-center gap-2 p-2 rounded-lg border hover:border-primary/30 transition-all group">
                          <div className="flex gap-0.5 flex-shrink-0">
                            <div className="w-3 h-3 rounded-full" style={{ background: st.config.primaryColor }} />
                            <div className="w-3 h-3 rounded-full" style={{ background: st.config.secondaryColor }} />
                          </div>
                          <button
                            onClick={() => onChange({ ...st.config })}
                            className="flex-1 text-left text-xs font-medium hover:text-primary transition-colors"
                          >
                            {st.name}
                          </button>
                          <button
                            onClick={() => handleDelete(st.id, st.name)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* COLORS TAB */}
            {activeTab === "colors" && (
              <div className="space-y-5">
                <div>
                  <Label className="mb-2 block text-xs font-semibold text-muted-foreground">PALETTES PRÉDÉFINIES</Label>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PRESETS.map(preset => (
                      <button
                        key={preset.name}
                        onClick={() => onChange({ ...style, primaryColor: preset.primary, secondaryColor: preset.secondary })}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-all hover:shadow-md ${
                          style.primaryColor === preset.primary ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "hover:border-primary/30"
                        }`}
                      >
                        <div className="flex gap-0.5">
                          <div className="w-3 h-3 rounded-full" style={{ background: preset.primary }} />
                          <div className="w-3 h-3 rounded-full" style={{ background: preset.secondary }} />
                        </div>
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs mb-1 block">Couleur principale</Label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={style.primaryColor} onChange={e => update("primaryColor", e.target.value)} className="w-8 h-8 rounded-md border cursor-pointer" />
                      <Input value={style.primaryColor} onChange={e => update("primaryColor", e.target.value)} className="text-xs h-8 font-mono" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">Couleur secondaire</Label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={style.secondaryColor} onChange={e => update("secondaryColor", e.target.value)} className="w-8 h-8 rounded-md border cursor-pointer" />
                      <Input value={style.secondaryColor} onChange={e => update("secondaryColor", e.target.value)} className="text-xs h-8 font-mono" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FONTS TAB */}
            {activeTab === "fonts" && (
              <div className="space-y-5">
                <div>
                  <Label className="text-xs mb-1 block font-semibold">Police du corps</Label>
                  <Select value={style.fontFamily} onValueChange={v => update("fontFamily", v)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {FONT_CATEGORIES.map(cat => (
                        <div key={cat.label}>
                          <div className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{cat.label}</div>
                          {cat.fonts.map(f => (
                            <SelectItem key={f.value} value={f.value} className="text-xs">
                              <span style={{ fontFamily: f.value }}>{f.label}</span>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs mb-1 block font-semibold">Police des titres</Label>
                  <Select value={style.headingFont} onValueChange={v => update("headingFont", v)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {FONT_CATEGORIES.map(cat => (
                        <div key={cat.label}>
                          <div className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{cat.label}</div>
                          {cat.fonts.map(f => (
                            <SelectItem key={f.value} value={f.value} className="text-xs">
                              <span style={{ fontFamily: f.value }}>{f.label}</span>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs mb-1 block font-semibold">Taille de police : {style.fontSize}px</Label>
                  <Slider min={10} max={18} step={1} value={[style.fontSize]} onValueChange={([v]) => update("fontSize", v)} />
                </div>
              </div>
            )}

            {/* LAYOUT TAB */}
            {activeTab === "layout" && (
              <div className="space-y-5">
                {/* Heading style */}
                <div>
                  <Label className="text-xs mb-2 block font-semibold">Style des en-têtes (H1 / H2)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      { id: "line-bottom" as HeadingStyle, label: "Ligne dessous" },
                      { id: "filled" as HeadingStyle, label: "Fond plein" },
                      { id: "gradient" as HeadingStyle, label: "Dégradé" },
                      { id: "left-bar" as HeadingStyle, label: "Barre gauche" },
                      { id: "underline-double" as HeadingStyle, label: "Double ligne" },
                      { id: "plain" as HeadingStyle, label: "Sans décoration" },
                      { id: "pill" as HeadingStyle, label: "Pilule / Badge" },
                    ]).map(opt => {
                      const isActive = (style.headingStyle || 'line-bottom') === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => onChange({ ...style, headingStyle: opt.id })}
                          className={`text-left p-2 rounded-lg border text-xs transition-all ${
                            isActive ? "border-primary ring-2 ring-primary/20 bg-primary/5 font-semibold" : "hover:border-primary/30"
                          }`}
                        >
                          <HeadingMiniPreview headingStyle={opt.id} primary={style.primaryColor} secondary={style.secondaryColor} headFont={style.headingFont} />
                          <div className="mt-1 text-[10px] text-muted-foreground">{opt.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Header style (en-tête du document) */}
                <div>
                  <Label className="text-xs mb-2 block font-semibold">Style de l'en-tête du document</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      { id: "classic" as HeaderStyle, label: "Classique", desc: "Logo + nom centré + ligne NDA" },
                      { id: "banner" as HeaderStyle, label: "Bannière", desc: "Fond plein coloré, texte blanc" },
                      { id: "compact" as HeaderStyle, label: "Compact", desc: "Logo à gauche, infos à droite" },
                      { id: "elegant" as HeaderStyle, label: "Élégant", desc: "Trait fin décoratif, italique" },
                      { id: "boxed" as HeaderStyle, label: "Encadré", desc: "Bordure autour de l'en-tête" },
                      { id: "split" as HeaderStyle, label: "Séparé", desc: "Logo + nom | NDA/SIRET à droite" },
                      { id: "gradient" as HeaderStyle, label: "Dégradé", desc: "Bannière dégradée + ombre" },
                      { id: "minimal" as HeaderStyle, label: "Minimal", desc: "Nom fin en majuscules espacées" },
                      { id: "corporate" as HeaderStyle, label: "Corporate", desc: "Fond gris + barre latérale colorée" },
                      { id: "ribbon" as HeaderStyle, label: "Ruban", desc: "Ruban Qualiopi + bloc central" },
                      { id: "monogram" as HeaderStyle, label: "Monogramme", desc: "Cercle initiales + nom aligné" },
                      { id: "stacked" as HeaderStyle, label: "Encadré double", desc: "Lignes doubles + titre espacé" },
                    ]).map(opt => {
                      const isActive = (style.headerStyle || 'classic') === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => onChange({ ...style, headerStyle: opt.id })}
                          className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                            isActive ? "border-primary ring-2 ring-primary/20 bg-primary/5 font-semibold" : "hover:border-primary/30"
                          }`}
                        >
                          <HeaderMiniPreview headerStyle={opt.id} primary={style.primaryColor} headFont={style.headingFont} />
                          <div className="mt-1.5 font-semibold text-[11px]">{opt.label}</div>
                          <div className="text-[9px] text-muted-foreground">{opt.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label className="text-xs mb-1 block font-semibold">Position du logo</Label>
                  <div className="flex gap-2">
                    {(["left", "center", "right"] as const).map(pos => (
                      <button
                        key={pos}
                        onClick={() => update("logoPosition", pos)}
                        className={`flex-1 py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                          style.logoPosition === pos
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:border-primary/30"
                        }`}
                      >
                        {pos === "left" ? "Gauche" : pos === "center" ? "Centre" : "Droite"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section border toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-semibold block">Barre latérale des sections</Label>
                    <span className="text-[10px] text-muted-foreground">Bordure colorée à gauche des blocs de contenu</span>
                  </div>
                  <Switch
                    checked={style.showSectionBorder !== false}
                    onCheckedChange={(v) => onChange({ ...style, showSectionBorder: v })}
                  />
                </div>
              </div>
            )}

            {/* Live preview */}
            <div className="mt-4 p-4 bg-white rounded-lg border">
              <div className="text-[10px] text-muted-foreground mb-2 font-semibold">APERÇU DU THÈME « {THEME_PRESETS.find(t => t.id === style.theme)?.name || "Classique"} »</div>
              <ThemeMiniPreview
                theme={style.theme || "classique"}
                primary={style.primaryColor}
                secondary={style.secondaryColor}
                bodyFont={style.fontFamily}
                headFont={style.headingFont}
                fontSize={style.fontSize}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocStyleConfigPanel;
