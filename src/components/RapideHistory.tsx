import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FolderOpen, Trash2, History, ChevronDown, ChevronUp, RefreshCw, Search } from "lucide-react";

interface RapideHistoryProps {
  userId: string;
  refreshKey: number;
  onLoad: (org: OrganismeInfo, form: FormationInfo, stag: StagiaireInfo[]) => void;
}

interface RapideGeneration {
  id: string;
  name: string;
  organisme: OrganismeInfo;
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
  nb_documents?: number;
  created_at: string;
  updated_at: string;
}

const RapideHistory = ({ userId, refreshKey, onLoad }: RapideHistoryProps) => {
  const [items, setItems] = useState<RapideGeneration[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("rapide_generations")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setItems((data as unknown as RapideGeneration[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [userId, refreshKey]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("rapide_generations").delete().eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Supprimé" });
      setItems((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleLoad = (d: RapideGeneration) => {
    onLoad(d.organisme, d.formation, d.stagiaires || []);
    toast({ title: "Chargé", description: `Génération "${d.name}" restaurée.` });
  };

  const q = search.trim().toLowerCase();
  const visible = items.filter((d) => {
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

  return (
    <div className="bg-card rounded-xl border shadow-card p-4 mb-6">
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2 font-semibold text-sm">
          <History className="w-4 h-4 text-primary" />
          Historique des générations rapides
          {items.length > 0 && (
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{items.length}</span>
          )}
        </div>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-background"
                placeholder="Rechercher une génération, un organisme, une formation ou un stagiaire..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button size="sm" variant="outline" onClick={fetchItems} disabled={loading} className="gap-1 shrink-0">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Actualiser
            </Button>
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">Chargement...</p>
          ) : visible.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune génération rapide enregistrée pour le moment.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {visible.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{d.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(d.updated_at || d.created_at).toLocaleDateString("fr-FR")} – {(d.stagiaires as any[])?.length || 0} stagiaire(s)
                      {d.nb_documents ? ` – ${d.nb_documents} document(s)` : ""}
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

export default RapideHistory;
