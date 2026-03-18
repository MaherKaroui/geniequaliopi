import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, FolderOpen, Trash2, Clock, ChevronDown, ChevronUp } from "lucide-react";

interface DossierHistoryProps {
  userId: string;
  organisme: OrganismeInfo;
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
  onLoad: (org: OrganismeInfo, form: FormationInfo, stag: StagiaireInfo[]) => void;
}

interface SavedDossier {
  id: string;
  name: string;
  organisme: OrganismeInfo;
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
  created_at: string;
  updated_at: string;
}

const DossierHistory = ({ userId, organisme, formation, stagiaires, onLoad }: DossierHistoryProps) => {
  const [dossiers, setDossiers] = useState<SavedDossier[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [saveName, setSaveName] = useState("");
  const { toast } = useToast();

  const fetchDossiers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("saved_dossiers")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setDossiers((data as unknown as SavedDossier[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDossiers();
  }, [userId]);

  const handleSave = async () => {
    if (!organisme.nom) {
      toast({ title: "Erreur", description: "Remplissez au moins le nom de l'organisme", variant: "destructive" });
      return;
    }
    setSaving(true);
    const name = saveName.trim() || `${organisme.nom} – ${formation.intitule || "Sans formation"}`;
    const { error } = await supabase.from("saved_dossiers").insert({
      user_id: userId,
      name,
      organisme: organisme as any,
      formation: formation as any,
      stagiaires: stagiaires as any,
    });
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sauvegardé !", description: `Dossier "${name}" enregistré.` });
      setSaveName("");
      fetchDossiers();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("saved_dossiers").delete().eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Supprimé" });
      setDossiers((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleLoad = (d: SavedDossier) => {
    onLoad(d.organisme, d.formation, d.stagiaires);
    toast({ title: "Chargé", description: `Dossier "${d.name}" restauré.` });
  };

  return (
    <div className="bg-card rounded-xl border shadow-card p-4 mb-6">
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2 font-semibold text-sm">
          <Clock className="w-4 h-4 text-primary" />
          Historique des dossiers
          {dossiers.length > 0 && (
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{dossiers.length}</span>
          )}
        </div>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          {/* Save current */}
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 text-sm border rounded-lg bg-background"
              placeholder="Nom du dossier (optionnel)"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
            />
            <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1">
              <Save className="w-4 h-4" /> Sauvegarder
            </Button>
          </div>

          {/* List */}
          {loading ? (
            <p className="text-sm text-muted-foreground">Chargement...</p>
          ) : dossiers.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucun dossier sauvegardé.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {dossiers.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{d.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(d.created_at).toLocaleDateString("fr-FR")} – {(d.stagiaires as any[])?.length || 0} stagiaire(s)
                    </p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button size="sm" variant="ghost" onClick={() => handleLoad(d)} className="gap-1 text-xs">
                      <FolderOpen className="w-3.5 h-3.5" /> Charger
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(d.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DossierHistory;
