import { useRef } from "react";
import { StagiaireInfo } from "@/types/qualiopi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface StagiairesFormProps {
  data: StagiaireInfo[];
  onChange: (data: StagiaireInfo[]) => void;
}

const emptyStagiaire: StagiaireInfo = {
  civilite: "", nom: "", prenom: "", email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "", dateDebutFormation: "", dateFinFormation: "", tarifFormation: "", signatureUrl: ""
};

const StagiairesForm = ({ data, onChange }: StagiairesFormProps) => {
  const sigRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const addStagiaire = () => onChange([...data, { ...emptyStagiaire }]);
  const removeStagiaire = (index: number) => onChange(data.filter((_, i) => i !== index));
  const updateStagiaire = (index: number, field: keyof StagiaireInfo, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  const handleSigFile = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => updateStagiaire(index, 'signatureUrl', reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Stagiaires</h2>
          <p className="text-sm text-muted-foreground">{data.length} stagiaire(s) ajouté(s)</p>
        </div>
        <Button onClick={addStagiaire} size="sm">
          + Ajouter
        </Button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 bg-secondary/50 rounded-xl border border-dashed border-border">
          <p className="text-muted-foreground">Aucun stagiaire ajouté</p>
          <Button onClick={addStagiaire} variant="outline" size="sm" className="mt-3">
            + Ajouter un stagiaire
          </Button>
        </div>
      )}

      {data.map((stagiaire, index) => (
        <div key={index} className="p-4 bg-card rounded-xl border shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">Stagiaire {index + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => removeStagiaire(index)} className="text-destructive hover:text-destructive text-xs">
              Supprimer
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <Label>Civilité</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={stagiaire.civilite}
                onChange={e => updateStagiaire(index, 'civilite', e.target.value)}
              >
                <option value="">—</option>
                <option value="M.">M.</option>
                <option value="Mme">Mme</option>
              </select>
            </div>
            <div>
              <Label>Nom *</Label>
              <Input value={stagiaire.nom} onChange={e => updateStagiaire(index, 'nom', e.target.value)} placeholder="Nom" />
            </div>
            <div>
              <Label>Prénom *</Label>
              <Input value={stagiaire.prenom} onChange={e => updateStagiaire(index, 'prenom', e.target.value)} placeholder="Prénom" />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={stagiaire.email} onChange={e => updateStagiaire(index, 'email', e.target.value)} placeholder="email@exemple.fr" />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input value={stagiaire.telephone} onChange={e => updateStagiaire(index, 'telephone', e.target.value)} placeholder="06..." />
            </div>
            <div>
              <Label>Entreprise</Label>
              <Input value={stagiaire.entreprise} onChange={e => updateStagiaire(index, 'entreprise', e.target.value)} placeholder="Entreprise" />
            </div>
            <div>
              <Label>Poste</Label>
              <Input value={stagiaire.poste} onChange={e => updateStagiaire(index, 'poste', e.target.value)} placeholder="Poste occupé" />
            </div>
          </div>
          {/* Signature stagiaire */}
          <div className="flex items-center gap-3 mt-2 pt-2 border-t border-border/50">
            <Label className="text-xs font-semibold">Signature</Label>
            {stagiaire.signatureUrl ? (
              <div className="relative group">
                <img src={stagiaire.signatureUrl} alt="Signature" className="h-10 w-auto max-w-[120px] object-contain rounded border bg-white p-0.5" />
                <button
                  onClick={() => updateStagiaire(index, 'signatureUrl', '')}
                  className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">Aucune</span>
            )}
            <input
              ref={el => { sigRefs.current[index] = el; }}
              type="file" accept="image/*" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleSigFile(index, f); }}
            />
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => sigRefs.current[index]?.click()}>
              {stagiaire.signatureUrl ? "Changer" : "Charger"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StagiairesForm;
