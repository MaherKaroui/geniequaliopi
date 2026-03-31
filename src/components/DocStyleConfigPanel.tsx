import { useState } from "react";
import { DocStyleConfig, DEFAULT_DOC_STYLE, DocTheme, HeadingStyle, HeaderStyle } from "@/types/qualiopi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Palette, Type, Layout, Paintbrush } from "lucide-react";

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

const DocStyleConfigPanel = ({ style, onChange }: DocStyleConfigPanelProps) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"themes" | "colors" | "fonts" | "layout">("themes");

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

                {/* Logo position */}
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
