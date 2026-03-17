import { useState } from "react";
import { DocStyleConfig, DEFAULT_DOC_STYLE } from "@/types/qualiopi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

interface DocStyleConfigPanelProps {
  style: DocStyleConfig;
  onChange: (style: DocStyleConfig) => void;
}

const FONT_OPTIONS = [
  { value: "'Segoe UI', Arial, sans-serif", label: "Segoe UI (défaut)" },
  { value: "'Inter', sans-serif", label: "Inter" },
  { value: "'Poppins', sans-serif", label: "Poppins" },
  { value: "'Montserrat', sans-serif", label: "Montserrat" },
  { value: "'Open Sans', sans-serif", label: "Open Sans" },
  { value: "'Lato', sans-serif", label: "Lato" },
  { value: "'Roboto', sans-serif", label: "Roboto" },
  { value: "'Space Grotesk', sans-serif", label: "Space Grotesk" },
  { value: "'Merriweather', serif", label: "Merriweather (serif)" },
  { value: "Georgia, serif", label: "Georgia (serif)" },
  { value: "'Courier New', monospace", label: "Courier New (mono)" },
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
];

const DocStyleConfigPanel = ({ style, onChange }: DocStyleConfigPanelProps) => {
  const [expanded, setExpanded] = useState(false);

  const update = (field: keyof DocStyleConfig, value: string | number) => {
    onChange({ ...style, [field]: value });
  };

  const applyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    onChange({ ...style, primaryColor: preset.primary, secondaryColor: preset.secondary });
  };

  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-card">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left"
      >
        {expanded ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        <div className="flex-1">
          <span className="text-sm font-semibold">Personnaliser le design des documents</span>
          <span className="text-xs text-muted-foreground ml-2">Couleurs, polices, taille</span>
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
        <div className="border-t p-4 space-y-5">
          {/* Color presets */}
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

          {/* Custom colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs mb-1 block">Couleur principale</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={style.primaryColor}
                  onChange={e => update("primaryColor", e.target.value)}
                  className="w-8 h-8 rounded-md border cursor-pointer"
                />
                <Input
                  value={style.primaryColor}
                  onChange={e => update("primaryColor", e.target.value)}
                  className="text-xs h-8 font-mono"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs mb-1 block">Couleur secondaire</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={style.secondaryColor}
                  onChange={e => update("secondaryColor", e.target.value)}
                  className="w-8 h-8 rounded-md border cursor-pointer"
                />
                <Input
                  value={style.secondaryColor}
                  onChange={e => update("secondaryColor", e.target.value)}
                  className="text-xs h-8 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Fonts */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs mb-1 flex items-center gap-1">
                <Type className="w-3 h-3" /> Police du corps
              </Label>
              <Select value={style.fontFamily} onValueChange={v => update("fontFamily", v)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FONT_OPTIONS.map(f => (
                    <SelectItem key={f.value} value={f.value} className="text-xs">
                      <span style={{ fontFamily: f.value }}>{f.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs mb-1 flex items-center gap-1">
                <Type className="w-3 h-3" /> Police des titres
              </Label>
              <Select value={style.headingFont} onValueChange={v => update("headingFont", v)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FONT_OPTIONS.map(f => (
                    <SelectItem key={f.value} value={f.value} className="text-xs">
                      <span style={{ fontFamily: f.value }}>{f.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Font size */}
          <div>
            <Label className="text-xs mb-1 block">Taille de police : {style.fontSize}px</Label>
            <Slider
              min={10}
              max={18}
              step={1}
              value={[style.fontSize]}
              onValueChange={([v]) => update("fontSize", v)}
            />
          </div>

          {/* Logo position */}
          <div>
            <Label className="text-xs mb-1 block">Position du logo</Label>
            <div className="flex gap-2">
              {(["left", "center", "right"] as const).map(pos => (
                <button
                  key={pos}
                  onClick={() => update("logoPosition", pos)}
                  className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-medium transition-all ${
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

          {/* Live preview mini */}
          <div className="mt-3 p-3 bg-white rounded-lg border">
            <div className="text-[10px] text-muted-foreground mb-1">Aperçu :</div>
            <div style={{ fontFamily: style.headingFont, color: style.primaryColor, fontSize: style.fontSize + 4, fontWeight: 700 }}>
              Titre du document
            </div>
            <div style={{ fontFamily: style.fontFamily, fontSize: style.fontSize, marginTop: 4 }}>
              Corps du texte avec la police sélectionnée.
              <span style={{ color: style.secondaryColor, fontWeight: 600 }}> Texte accentué.</span>
            </div>
            <div style={{ marginTop: 6, padding: "4px 8px", background: `${style.primaryColor}10`, borderLeft: `3px solid ${style.primaryColor}`, borderRadius: 4, fontSize: style.fontSize - 1, fontFamily: style.fontFamily }}>
              Section de contenu avec le style appliqué.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocStyleConfigPanel;
