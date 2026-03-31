import { useState } from "react";
import { DocStyleConfig, DEFAULT_DOC_STYLE } from "@/types/qualiopi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Palette, Type, Layout } from "lucide-react";

interface DocStyleConfigPanelProps {
  style: DocStyleConfig;
  onChange: (style: DocStyleConfig) => void;
}

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
      { value: "'General Sans', sans-serif", label: "General Sans" },
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

const ALL_FONTS = FONT_CATEGORIES.flatMap(c => c.fonts);

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

interface DesignPreset {
  name: string;
  description: string;
  style: Partial<DocStyleConfig>;
}

const DESIGN_PRESETS: DesignPreset[] = [
  {
    name: "Corporate classique",
    description: "Segoe UI, bleu marine, professionnel",
    style: { primaryColor: "#1e3a7b", secondaryColor: "#2d8659", fontFamily: "'Segoe UI', Arial, sans-serif", headingFont: "'Segoe UI', Arial, sans-serif", fontSize: 13 }
  },
  {
    name: "Moderne élégant",
    description: "Inter + Playfair, noir & doré",
    style: { primaryColor: "#1a1a2e", secondaryColor: "#b8860b", fontFamily: "'Inter', sans-serif", headingFont: "'Playfair Display', serif", fontSize: 13 }
  },
  {
    name: "Startup tech",
    description: "DM Sans + Space Grotesk, bleu vif",
    style: { primaryColor: "#0277bd", secondaryColor: "#ef6c00", fontFamily: "'DM Sans', sans-serif", headingFont: "'Space Grotesk', sans-serif", fontSize: 13 }
  },
  {
    name: "Académique",
    description: "EB Garamond, vert forêt",
    style: { primaryColor: "#1b5e20", secondaryColor: "#5d4037", fontFamily: "'EB Garamond', serif", headingFont: "'EB Garamond', serif", fontSize: 14 }
  },
  {
    name: "Luxe & Raffiné",
    description: "Cormorant + Raleway, prune & or",
    style: { primaryColor: "#4a148c", secondaryColor: "#c8a415", fontFamily: "'Raleway', sans-serif", headingFont: "'Cormorant Garamond', serif", fontSize: 13 }
  },
  {
    name: "Minimaliste",
    description: "Outfit, noir & gris",
    style: { primaryColor: "#212121", secondaryColor: "#616161", fontFamily: "'Outfit', sans-serif", headingFont: "'Outfit', sans-serif", fontSize: 13 }
  },
  {
    name: "Chaleureux",
    description: "Nunito + Lora, bordeaux & olive",
    style: { primaryColor: "#7b1e3a", secondaryColor: "#827717", fontFamily: "'Nunito', sans-serif", headingFont: "'Lora', serif", fontSize: 13 }
  },
  {
    name: "Institutionnel",
    description: "Source Serif + Source Sans, bleu ardoise",
    style: { primaryColor: "#37474f", secondaryColor: "#00897b", fontFamily: "'Source Sans 3', sans-serif", headingFont: "'Source Serif 4', serif", fontSize: 13 }
  },
];

const DocStyleConfigPanel = ({ style, onChange }: DocStyleConfigPanelProps) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"presets" | "colors" | "fonts" | "layout">("presets");

  const update = (field: keyof DocStyleConfig, value: string | number) => {
    onChange({ ...style, [field]: value });
  };

  const applyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    onChange({ ...style, primaryColor: preset.primary, secondaryColor: preset.secondary });
  };

  const applyDesignPreset = (preset: DesignPreset) => {
    onChange({ ...style, ...preset.style });
  };

  const tabs = [
    { id: "presets" as const, label: "Designs", icon: Layout },
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
          <span className="text-xs text-muted-foreground ml-2">Couleurs, polices, mise en page</span>
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
            {/* PRESETS TAB */}
            {activeTab === "presets" && (
              <div className="space-y-4">
                <Label className="text-xs font-semibold text-muted-foreground">DESIGNS COMPLETS PRÉDÉFINIS</Label>
                <div className="grid grid-cols-2 gap-3">
                  {DESIGN_PRESETS.map(preset => {
                    const isActive = style.primaryColor === preset.style.primaryColor
                      && style.fontFamily === preset.style.fontFamily;
                    return (
                      <button
                        key={preset.name}
                        onClick={() => applyDesignPreset(preset)}
                        className={`text-left p-3 rounded-lg border transition-all hover:shadow-md ${
                          isActive ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex gap-0.5">
                            <div className="w-3 h-3 rounded-full" style={{ background: preset.style.primaryColor }} />
                            <div className="w-3 h-3 rounded-full" style={{ background: preset.style.secondaryColor }} />
                          </div>
                          <span className="text-xs font-semibold">{preset.name}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground">{preset.description}</div>
                        {/* Mini preview */}
                        <div className="mt-2 p-2 bg-white rounded border" style={{ fontSize: 9 }}>
                          <div style={{ fontFamily: preset.style.headingFont, color: preset.style.primaryColor, fontWeight: 700, fontSize: 11 }}>
                            Titre exemple
                          </div>
                          <div style={{ fontFamily: preset.style.fontFamily, fontSize: 9, marginTop: 2 }}>
                            Corps du texte <span style={{ color: preset.style.secondaryColor, fontWeight: 600 }}>accentué</span>
                          </div>
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
                        onClick={() => applyPreset(preset)}
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
                {/* Body font */}
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

                {/* Heading font */}
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

                {/* Font size */}
                <div>
                  <Label className="text-xs mb-1 block font-semibold">Taille de police : {style.fontSize}px</Label>
                  <Slider min={10} max={18} step={1} value={[style.fontSize]} onValueChange={([v]) => update("fontSize", v)} />
                </div>

                {/* Quick font pairings */}
                <div>
                  <Label className="text-xs mb-2 block font-semibold text-muted-foreground">COMBINAISONS RECOMMANDÉES</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { body: "'Inter', sans-serif", heading: "'Playfair Display', serif", label: "Inter + Playfair" },
                      { body: "'DM Sans', sans-serif", heading: "'Space Grotesk', sans-serif", label: "DM Sans + Space Grotesk" },
                      { body: "'Lato', sans-serif", heading: "'Merriweather', serif", label: "Lato + Merriweather" },
                      { body: "'Nunito', sans-serif", heading: "'Lora', serif", label: "Nunito + Lora" },
                      { body: "'Raleway', sans-serif", heading: "'Cormorant Garamond', serif", label: "Raleway + Cormorant" },
                      { body: "'Source Sans 3', sans-serif", heading: "'Source Serif 4', serif", label: "Source Sans + Serif" },
                      { body: "'Outfit', sans-serif", heading: "'Fraunces', serif", label: "Outfit + Fraunces" },
                      { body: "'Manrope', sans-serif", heading: "'DM Serif Display', serif", label: "Manrope + DM Serif" },
                    ].map(pair => (
                      <button
                        key={pair.label}
                        onClick={() => onChange({ ...style, fontFamily: pair.body, headingFont: pair.heading })}
                        className={`text-left p-2 rounded-lg border text-xs transition-all hover:shadow-sm ${
                          style.fontFamily === pair.body && style.headingFont === pair.heading
                            ? "border-primary ring-1 ring-primary/20 bg-primary/5"
                            : "hover:border-primary/30"
                        }`}
                      >
                        <div style={{ fontFamily: pair.heading, fontWeight: 700, fontSize: 11 }}>Titre</div>
                        <div style={{ fontFamily: pair.body, fontSize: 10, color: "#666" }}>{pair.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* LAYOUT TAB */}
            {activeTab === "layout" && (
              <div className="space-y-5">
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
                        {pos === "left" ? "⬅ Gauche" : pos === "center" ? "⬛ Centre" : "➡ Droite"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Live preview */}
            <div className="mt-4 p-4 bg-white rounded-lg border">
              <div className="text-[10px] text-muted-foreground mb-2 font-semibold">APERÇU EN DIRECT</div>
              <div style={{ fontFamily: style.headingFont, color: style.primaryColor, fontSize: style.fontSize + 6, fontWeight: 700 }}>
                Titre du document
              </div>
              <div style={{ fontFamily: style.headingFont, color: style.primaryColor, fontSize: style.fontSize + 2, fontWeight: 600, marginTop: 8, opacity: 0.8 }}>
                Sous-titre de section
              </div>
              <div style={{ fontFamily: style.fontFamily, fontSize: style.fontSize, marginTop: 6, lineHeight: 1.6 }}>
                Corps du texte avec la police sélectionnée. Exemple de contenu pour visualiser le rendu final.
                <span style={{ color: style.secondaryColor, fontWeight: 600 }}> Texte accentué en couleur secondaire.</span>
              </div>
              <div style={{ marginTop: 8, padding: "6px 10px", background: `${style.primaryColor}10`, borderLeft: `3px solid ${style.primaryColor}`, borderRadius: 4, fontSize: style.fontSize - 1, fontFamily: style.fontFamily }}>
                Section de contenu avec le style appliqué.
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10, fontSize: style.fontSize - 1, fontFamily: style.fontFamily }}>
                <thead>
                  <tr>
                    <th style={{ background: style.primaryColor, color: "white", padding: "5px 8px", textAlign: "left", fontSize: style.fontSize - 1 }}>Colonne A</th>
                    <th style={{ background: style.primaryColor, color: "white", padding: "5px 8px", textAlign: "left", fontSize: style.fontSize - 1 }}>Colonne B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: "5px 8px", borderBottom: "1px solid #e0e0e0" }}>Donnée 1</td><td style={{ padding: "5px 8px", borderBottom: "1px solid #e0e0e0" }}>Valeur</td></tr>
                  <tr style={{ background: "#f0f4fa" }}><td style={{ padding: "5px 8px", borderBottom: "1px solid #e0e0e0" }}>Donnée 2</td><td style={{ padding: "5px 8px", borderBottom: "1px solid #e0e0e0" }}>Valeur</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocStyleConfigPanel;
