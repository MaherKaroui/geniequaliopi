import { useEffect, useMemo, useRef, useState } from "react";
import { Palette, RefreshCw } from "lucide-react";
import type { DocStyleConfig, OrganismeInfo } from "@/types/qualiopi";
import { DEFAULT_DOC_STYLE } from "@/types/qualiopi";
import { getAutomaticDossierDesign } from "@/lib/dossierDesign";
import { PDF_QUALITY_PRESETS, setActivePdfQuality, type PdfQuality } from "@/lib/pdfExport";
import { setDocStyle } from "@/lib/docBuilder";
import DocStyleConfigPanel from "@/components/DocStyleConfigPanel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  organisme: Pick<OrganismeInfo, "nom" | "siret" | "dateMaj">;
  scope: string;
  manualStyle?: DocStyleConfig;
  onManualStyleChange?: (style: DocStyleConfig) => void;
  onEffectiveStyleChange?: (style: DocStyleConfig) => void;
  compact?: boolean;
}

export default function DossierOutputSettings({ organisme, scope, manualStyle: controlledManual, onManualStyleChange, onEffectiveStyleChange, compact = false }: Props) {
  const prefix = `dossier_output_${scope}`;
  const [quality, setQuality] = useState<PdfQuality>(() => {
    const value = sessionStorage.getItem("dossier_output_pdf_quality") as PdfQuality | null;
    return value && value in PDF_QUALITY_PRESETS ? value : "high";
  });
  const [automatic, setAutomatic] = useState(() => sessionStorage.getItem(`${prefix}_automatic`) !== "false");
  const [offset, setOffset] = useState(() => Number(sessionStorage.getItem(`${prefix}_offset`) || "0") || 0);
  const [localManual, setLocalManual] = useState<DocStyleConfig>(() => {
    try {
      const value = sessionStorage.getItem(`${prefix}_manual`);
      return value ? { ...DEFAULT_DOC_STYLE, ...JSON.parse(value) } : { ...DEFAULT_DOC_STYLE };
    } catch { return { ...DEFAULT_DOC_STYLE }; }
  });
  const manual = controlledManual ?? localManual;
  const automaticDesign = useMemo(() => getAutomaticDossierDesign(organisme, offset), [organisme, offset]);
  const effective = automatic ? automaticDesign.style : manual;
  const onEffectiveStyleChangeRef = useRef(onEffectiveStyleChange);

  useEffect(() => { onEffectiveStyleChangeRef.current = onEffectiveStyleChange; }, [onEffectiveStyleChange]);

  useEffect(() => {
    sessionStorage.setItem("dossier_output_pdf_quality", quality);
    setActivePdfQuality(quality);
  }, [prefix, quality]);
  useEffect(() => { sessionStorage.setItem(`${prefix}_automatic`, String(automatic)); }, [automatic, prefix]);
  useEffect(() => { sessionStorage.setItem(`${prefix}_offset`, String(offset)); }, [offset, prefix]);
  useEffect(() => {
    setDocStyle(effective);
    onEffectiveStyleChangeRef.current?.(effective);
  }, [effective]);

  const changeManual = (style: DocStyleConfig) => {
    setLocalManual(style);
    sessionStorage.setItem(`${prefix}_manual`, JSON.stringify(style));
    onManualStyleChange?.(style);
  };

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <div className="flex flex-wrap items-center gap-3">
        <Palette className="h-5 w-5 text-primary" />
        <div className="min-w-[220px] flex-1">
          <p className="text-sm font-semibold">Qualité et design du dossier</p>
          <p className="text-xs text-muted-foreground">{automatic ? automaticDesign.name : "Design personnalisé"} · {effective.theme}</p>
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-xs">Qualité PDF</Label>
          <Select value={quality} onValueChange={(value) => setQuality(value as PdfQuality)}>
            <SelectTrigger className="h-9 w-[205px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {(Object.keys(PDF_QUALITY_PRESETS) as PdfQuality[]).map((key) => <SelectItem key={key} value={key}>{PDF_QUALITY_PRESETS[key].label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 border-t pt-3">
        <Switch id={`${scope}-automatic-design`} checked={automatic} onCheckedChange={setAutomatic} />
        <Label htmlFor={`${scope}-automatic-design`} className="flex-1">Automatique — un design unique par organisme</Label>
        <span className="h-7 w-7 rounded-full border" style={{ backgroundColor: effective.primaryColor }} aria-label="Couleur principale" />
        <span className="h-7 w-7 rounded-full border" style={{ backgroundColor: effective.secondaryColor }} aria-label="Couleur secondaire" />
        {automatic && <Button type="button" variant="outline" size="sm" onClick={() => setOffset((value) => value + 1)} className="gap-2"><RefreshCw className="h-4 w-4" /> Autre design</Button>}
      </div>
      <p className="text-xs text-muted-foreground">La qualité Haute convient à un audit. Maximale est destinée à l'impression. Word reste sélectionnable et cherchable.</p>
      {!automatic && !compact && <DocStyleConfigPanel style={manual} onChange={changeManual} />}
    </div>
  );
}