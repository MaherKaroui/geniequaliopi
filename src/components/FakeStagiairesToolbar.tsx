import { useState } from "react";
import type { FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { generateFakeStagiairesIDF } from "@/lib/fakeStagiaireIDF";
import { REGIONS, type RegionKey } from "@/lib/fakeStagiaireRegions";
import { generateStagiairesFromReferentiel, referentielFromFormation } from "@/lib/fakeStagiaireReferentiel";

interface FakeStagiairesToolbarProps {
  value: StagiaireInfo[];
  onChange: (value: StagiaireInfo[]) => void;
  formation?: FormationInfo;
  compact?: boolean;
}

const FakeStagiairesToolbar = ({ value, onChange, formation, compact = false }: FakeStagiairesToolbarProps) => {
  const [count, setCount] = useState(5);
  const [region, setRegion] = useState<RegionKey | "all">("ile-de-france");
  const fictifs = value.filter((personne) => personne.fictif).length;
  const reels = value.length - fictifs;

  const generate = (replace: boolean) => {
    const safeCount = Math.max(1, Math.min(300, Math.floor(count) || 1));
    const generated = formation
      ? generateStagiairesFromReferentiel({
          count: safeCount,
          region,
          referentiel: formation.referentiel ?? referentielFromFormation(formation),
          formation,
        })
      : generateFakeStagiairesIDF({ count: safeCount, region }).map((personne) => ({ ...personne, fictif: true }));
    onChange(replace ? generated : [...value, ...generated]);
    toast.success(`${safeCount} stagiaire(s) fictif(s) généré(s)`);
  };

  const removeFakes = () => {
    onChange(value.filter((personne) => !personne.fictif));
    toast.success(`${fictifs} stagiaire(s) fictif(s) supprimé(s)`);
  };

  return (
    <div className={`rounded-lg border border-primary/30 bg-primary/5 ${compact ? "p-3" : "p-4"} space-y-2`}>
      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-40 flex-1">
          <Label className="text-xs">Région</Label>
          <select className="flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm" value={region} onChange={(event) => setRegion(event.target.value as RegionKey | "all")}>
            <option value="all">France entière</option>
            {Object.entries(REGIONS).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}
          </select>
        </div>
        <div>
          <Label className="text-xs">Nombre</Label>
          <Input className="h-9 w-20" type="number" min={1} max={300} value={count} onChange={(event) => setCount(Math.max(1, Math.min(300, Number(event.target.value) || 1)))} />
        </div>
        <Button type="button" size="sm" variant="outline" className="h-9 gap-1" onClick={() => generate(false)}>
          <Sparkles className="h-4 w-4" /> Générer (ajouter)
        </Button>
        <Button type="button" size="sm" className="h-9 gap-1" onClick={() => generate(true)}>
          <Sparkles className="h-4 w-4" /> Générer (remplacer)
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>{reels} réel(s) / {fictifs} fictif(s)</span>
        {formation && !formation.referentiel && <span>Aucune fiche référentiel analysée à l’étape Formation</span>}
        {fictifs > 0 && (
          <Button type="button" variant="ghost" size="sm" className="h-7 gap-1 px-2 text-xs text-destructive hover:text-destructive" onClick={removeFakes}>
            <Trash2 className="h-3.5 w-3.5" /> Supprimer tous les fictifs
          </Button>
        )}
      </div>
    </div>
  );
};

export default FakeStagiairesToolbar;