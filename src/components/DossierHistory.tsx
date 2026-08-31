import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, FolderOpen, Trash2, Clock, ChevronDown, ChevronUp, Plus, RefreshCw, Archive, ArchiveRestore } from "lucide-react";

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
  archived?: boolean;
}

const DossierHistory = ({ userId, organisme, formation, stagiaires, onLoad }: DossierHistoryProps) => {
  const [dossiers, setDossiers] = useState<SavedDossier[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [currentDossierId, setCurrentDossierId] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [search, setSearch] = useState("");
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
    const { data, error } = await supabase
      .from("saved_dossiers")
      .insert({
        user_id: userId,
        name,
        organisme: organisme as any,
        formation: formation as any,
        stagiaires: stagiaires as any,
      })
      .select()
      .single();
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sauvegardé !", description: `Dossier "${name}" enregistré.` });
      setSaveName("");
      if (data) setCurrentDossierId((data as any).id);
      fetchDossiers();
    }
    setSaving(false);
  };

  const handleUpdate = async () => {
    if (!currentDossierId) return;
    setSaving(true);
    const name = saveName.trim() || `${organisme.nom} – ${formation.intitule || "Sans formation"}`;
    const { error } = await supabase
      .from("saved_dossiers")
      .update({
        name,
        organisme: organisme as any,
        formation: formation as any,
        stagiaires: stagiaires as any,
        updated_at: new Date().toISOString(),
      })
      .eq("id", currentDossierId);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Mis à jour", description: `Dossier "${name}" actualisé.` });
      fetchDossiers();
    }
    setSaving(false);
  };

  const handleNew = () => {
    setCurrentDossierId(null);
    setSaveName("");
    toast({ title: "Nouveau dossier", description: "Modifiez la formation puis cliquez sur Sauvegarder pour créer un nouveau dossier (les autres infos sont conservées)." });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("saved_dossiers").delete().eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Supprimé" });
      if (currentDossierId === id) setCurrentDossierId(null);
      setDossiers((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleToggleArchive = async (id: string, archived: boolean) => {
    const { error } = await supabase
      .from("saved_dossiers")
      .update({ archived: !archived } as any)
      .eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: "Archivage impossible", variant: "destructive" });
      return;
    }
    toast({ title: !archived ? "Dossier archivé" : "Dossier désarchivé" });
    setDossiers((prev) => prev.map((d) => (d.id === id ? { ...d, archived: !archived } : d)));
  };

  const handleLoad = (d: SavedDossier) => {
    onLoad(d.organisme, d.formation, d.stagiaires);
    setCurrentDossierId(d.id);
    setSaveName(d.name);
    toast({ title: "Chargé", description: `Dossier "${d.name}" restauré.` });
  };

  const q = search.trim().toLowerCase();
  const visible = dossiers
    .filter((d) => (showArchived ? d.archived : !d.archived))
    .filter((d) => {
      if (!q) return true;
      const stagNames = (d.stagiaires || [])
        .map((s: any) => `${s?.prenom || ""} ${s?.nom || ""}`)
        .join(" ")
        .toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        (d.organisme?.nom || "").toLowerCase().includes(q) ||
        (d.formation?.intitule || "").toLowerCase().includes(q) ||
        stagNames.includes(q)
      );
    });
  const archivedCount = dossiers.filter((d) => d.archived).length;
  const activeCount = dossiers.length - archivedCount;

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
          {currentDossierId && (
            <span className="bg-emerald-500/10 text-emerald-700 text-xs px-2 py-0.5 rounded-full">Édition en cours</span>
          )}
        </div>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          {/* Save / update / new */}
          <div className="flex flex-wrap gap-2">
            <input
              className="flex-1 min-w-[200px] px-3 py-2 text-sm border rounded-lg bg-background"
              placeholder="Nom du dossier (optionnel)"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
            />
            {currentDossierId ? (
              <>
                <Button size="sm" onClick={handleUpdate} disabled={saving} className="gap-1">
                  <RefreshCw className="w-4 h-4" /> Mettre à jour
                </Button>
                <Button size="sm" variant="secondary" onClick={handleSave} disabled={saving} className="gap-1">
                  <Save className="w-4 h-4" /> Enregistrer comme nouveau
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1">
                <Save className="w-4 h-4" /> Sauvegarder
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={handleNew} className="gap-1">
              <Plus className="w-4 h-4" /> Nouveau
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Astuce : chargez un dossier, changez uniquement la formation, puis cliquez sur <strong>Enregistrer comme nouveau</strong> pour créer une variante en gardant l'organisme et les stagiaires.
          </p>

          {/* Recherche */}
          <div className="relative border-t pt-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 mt-1.5 text-muted-foreground" />
            <input
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-background"
              placeholder="Rechercher un dossier, organisme, formation ou stagiaire..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Toggle actifs / archivés */}
          <div className="flex items-center justify-between border-t pt-3">
            <p className="text-xs font-medium text-muted-foreground">
              {showArchived ? `Dossiers archivés (${visible.length})` : `Dossiers actifs (${visible.length})`}
            </p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowArchived((s) => !s)}
              className="gap-1 text-xs h-7"
            >
              {showArchived ? (
                <><ArchiveRestore className="w-3 h-3" /> Voir actifs ({activeCount})</>
              ) : (
                <><Archive className="w-3 h-3" /> Voir archivés ({archivedCount})</>
              )}
            </Button>
          </div>

          {/* List */}
          {loading ? (
            <p className="text-sm text-muted-foreground">Chargement...</p>
          ) : visible.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {showArchived ? "Aucun dossier archivé." : "Aucun dossier sauvegardé."}
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {visible.map((d) => (
                <div key={d.id} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${currentDossierId === d.id ? "bg-primary/5 border border-primary/30" : "bg-muted/50 hover:bg-muted"}`}>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">
                      {d.name}
                      {d.archived && <span className="text-xs text-muted-foreground ml-2">(archivé)</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(d.updated_at || d.created_at).toLocaleDateString("fr-FR")} – {(d.stagiaires as any[])?.length || 0} stagiaire(s)
                    </p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button size="sm" variant="ghost" onClick={() => handleLoad(d)} className="gap-1 text-xs">
                      <FolderOpen className="w-3.5 h-3.5" /> Charger
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleToggleArchive(d.id, !!d.archived)}
                      title={d.archived ? "Désarchiver" : "Archiver"}
                    >
                      {d.archived ? <ArchiveRestore className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}
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
