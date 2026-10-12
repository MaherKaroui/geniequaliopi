import type { ExperienceDeclaree } from "@/types/qualiopi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface ExperiencesEditorProps {
  value: ExperienceDeclaree[];
  onChange: (value: ExperienceDeclaree[]) => void;
  projet?: string;
  onProjetChange?: (value: string) => void;
}

const VIDE: ExperienceDeclaree = { poste: "", employeur: "", debut: "", fin: "", activites: "" };

/**
 * Expériences réelles du candidat VAE / du bénéficiaire BC. Elles alimentent le CV orienté
 * certification et le rapprochement avec les blocs de la fiche RNCP : sans saisie, les pièces
 * restent des trames à compléter (rien n'est inventé).
 */
const ExperiencesEditor = ({ value, onChange, projet, onProjetChange }: ExperiencesEditorProps) => {
  const maj = (i: number, champ: keyof ExperienceDeclaree, v: string) => onChange(value.map((e, k) => (k === i ? { ...e, [champ]: v } : e)));
  return (
    <div className="col-span-full space-y-3 rounded-md border border-dashed p-3">
      <div className="flex items-center justify-between">
        <div>
          <Label>Expériences déclarées (CV et rapprochement avec la certification)</Label>
          <p className="text-xs text-muted-foreground">Uniquement des expériences réelles, justifiables (attestation d'employeur, bulletins, contrat). Une activité par ligne.</p>
        </div>
        <Button type="button" variant="outline" size="sm" className="gap-1" onClick={() => onChange([...value, { ...VIDE }])}>
          <Plus className="w-4 h-4" /> Expérience
        </Button>
      </div>
      {value.map((e, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 border-t pt-2">
          <div>
            <Label className="text-xs">Emploi / fonction</Label>
            <Input value={e.poste} onChange={(ev) => maj(i, "poste", ev.target.value)} placeholder="Esthéticienne" />
          </div>
          <div>
            <Label className="text-xs">Employeur / structure</Label>
            <Input value={e.employeur} onChange={(ev) => maj(i, "employeur", ev.target.value)} placeholder="Institut …" />
          </div>
          <div>
            <Label className="text-xs">Début</Label>
            <Input type="month" value={e.debut} onChange={(ev) => maj(i, "debut", ev.target.value)} />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label className="text-xs">Fin (vide = en cours)</Label>
              <Input type="month" value={e.fin} onChange={(ev) => maj(i, "fin", ev.target.value)} />
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={() => onChange(value.filter((_, k) => k !== i))} aria-label="Supprimer l'expérience">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="md:col-span-4">
            <Label className="text-xs">Activités réellement exercées</Label>
            <Textarea rows={3} value={e.activites} onChange={(ev) => maj(i, "activites", ev.target.value)} placeholder={"Soins du visage et épilations\nConseil et vente de produits cosmétiques"} />
          </div>
        </div>
      ))}
      {onProjetChange && (
        <div>
          <Label className="text-xs">Motivation et projet exprimés par le candidat</Label>
          <Textarea rows={2} value={projet || ""} onChange={(ev) => onProjetChange(ev.target.value)} placeholder="Recueilli lors de l'entretien de faisabilité" />
        </div>
      )}
    </div>
  );
};

export default ExperiencesEditor;
