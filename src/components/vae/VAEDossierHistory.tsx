import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, FolderOpen, Trash2, Clock, ChevronDown, ChevronUp, Plus, RefreshCw } from "lucide-react";
import type { VAEOrganisme, VAECertification, VAECandidat, VAESession, VAEContents } from "@/lib/vae/vaeTypes";

interface Props {
  /** Absent = mode sans compte : historique conservé dans ce navigateur uniquement. */
  userId?: string;
  organisme: VAEOrganisme;
  certification: VAECertification;
  candidat: VAECandidat;
  session: VAESession;
  contents: VAEContents;
  onLoad: (o: VAEOrganisme, c: VAECertification, ca: VAECandidat, s: VAESession, co: VAEContents) => void;
  /** Clé de l'historique local : un historique par plateforme reliée (IZILearn, CRM LMS…) et par organisme. */
  historyKey?: string;
}

interface SavedVAE {
  id: string;
  name: string;
  organisme: VAEOrganisme;
  certification: VAECertification;
  candidat: VAECandidat;
  session: VAESession;
  contents: VAEContents;
  created_at: string;
  updated_at: string;
}

const LOCAL_KEY = "vae_local_history";
const readLocal = (key = LOCAL_KEY): SavedVAE[] => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
const writeLocal = (list: SavedVAE[], key = LOCAL_KEY) => localStorage.setItem(key, JSON.stringify(list));

export default function VAEDossierHistory({ userId, organisme, certification, candidat, session, contents, onLoad, historyKey = LOCAL_KEY }: Props) {
  const [dossiers, setDossiers] = useState<SavedVAE[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [currentId, setCurrentId] = useState<string | null>(null);
  const { toast } = useToast();

  const local = !userId;
  const fetch = async () => {
    if (local) { setDossiers(readLocal(historyKey).sort((a, b) => b.updated_at.localeCompare(a.updated_at))); return; }
    setLoading(true);
    const { data, error } = await supabase
      .from("saved_vae_dossiers")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else setDossiers((data as unknown as SavedVAE[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, [userId]);

  const defaultName = () =>
    `${candidat.prenom || ""} ${candidat.nom || ""}`.trim() +
    (certification.intitule ? ` – ${certification.intitule}` : "") ||
    "Dossier VAE";

  const handleSave = async () => {
    setSaving(true);
    const name = saveName.trim() || defaultName();
    if (local) {
      const now = new Date().toISOString();
      const rec: SavedVAE = { id: crypto.randomUUID(), name, organisme, certification, candidat, session, contents, created_at: now, updated_at: now };
      try { writeLocal([rec, ...readLocal(historyKey)], historyKey); setCurrentId(rec.id); setSaveName(""); fetch(); toast({ title: "Sauvegardé !", description: `Dossier "${name}" enregistré sur cet appareil.` }); }
      catch { toast({ title: "Espace plein", description: "Supprimez d'anciens dossiers pour enregistrer celui-ci.", variant: "destructive" }); }
      setSaving(false); return;
    }
    const { data, error } = await supabase
      .from("saved_vae_dossiers")
      .insert({ user_id: userId, name, organisme: organisme as any, certification: certification as any, candidat: candidat as any, session: session as any, contents: contents as any })
      .select().single();
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Sauvegardé !", description: `Dossier "${name}" enregistré.` });
      setSaveName(""); if (data) setCurrentId((data as any).id); fetch();
    }
    setSaving(false);
  };

  const handleUpdate = async () => {
    if (!currentId) return;
    setSaving(true);
    const name = saveName.trim() || defaultName();
    if (local) {
      try { writeLocal(readLocal(historyKey).map(d => d.id === currentId ? { ...d, name, organisme, certification, candidat, session, contents, updated_at: new Date().toISOString() } : d), historyKey); fetch(); toast({ title: "Mis à jour", description: `Dossier "${name}" actualisé.` }); }
      catch { toast({ title: "Espace plein", description: "Supprimez d'anciens dossiers pour mettre à jour.", variant: "destructive" }); }
      setSaving(false); return;
    }
    const { error } = await supabase.from("saved_vae_dossiers").update({
      name, organisme: organisme as any, certification: certification as any, candidat: candidat as any, session: session as any, contents: contents as any,
      updated_at: new Date().toISOString(),
    }).eq("id", currentId);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else { toast({ title: "Mis à jour", description: `Dossier "${name}" actualisé.` }); fetch(); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (local) { writeLocal(readLocal(historyKey).filter(d => d.id !== id), historyKey); if (currentId === id) setCurrentId(null); fetch(); toast({ title: "Supprimé" }); return; }
    const { error } = await supabase.from("saved_vae_dossiers").delete().eq("id", id);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else { toast({ title: "Supprimé" }); if (currentId === id) setCurrentId(null); setDossiers(p => p.filter(d => d.id !== id)); }
  };

  const handleLoad = (d: SavedVAE) => {
    onLoad(d.organisme, d.certification, d.candidat, d.session, d.contents);
    setCurrentId(d.id); setSaveName(d.name);
    toast({ title: "Chargé", description: `Dossier "${d.name}" restauré.` });
  };

  return (
    <div className="bg-card rounded-xl border shadow-card p-4 mb-6">
      <button className="w-full flex items-center justify-between text-left" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-2 font-semibold text-sm">
          <Clock className="w-4 h-4 text-primary" />
          Historique des dossiers VAE
          {local && <span className="text-xs font-normal text-muted-foreground">(sur cet appareil)</span>}
          {dossiers.length > 0 && <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{dossiers.length}</span>}
          {currentId && <span className="bg-emerald-500/10 text-emerald-700 text-xs px-2 py-0.5 rounded-full">Édition en cours</span>}
        </div>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            <input className="flex-1 min-w-[200px] px-3 py-2 text-sm border rounded-lg bg-background"
              placeholder="Nom du dossier (optionnel)" value={saveName} onChange={(e) => setSaveName(e.target.value)} />
            {currentId ? (
              <>
                <Button size="sm" onClick={handleUpdate} disabled={saving} className="gap-1"><RefreshCw className="w-4 h-4" /> Mettre à jour</Button>
                <Button size="sm" variant="secondary" onClick={handleSave} disabled={saving} className="gap-1"><Save className="w-4 h-4" /> Enregistrer comme nouveau</Button>
              </>
            ) : (
              <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1"><Save className="w-4 h-4" /> Sauvegarder</Button>
            )}
            <Button size="sm" variant="outline" onClick={() => { setCurrentId(null); setSaveName(""); }} className="gap-1"><Plus className="w-4 h-4" /> Nouveau</Button>
          </div>

          {loading ? <p className="text-sm text-muted-foreground">Chargement...</p>
            : dossiers.length === 0 ? <p className="text-sm text-muted-foreground">Aucun dossier sauvegardé.</p>
            : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {dossiers.map((d) => (
                  <div key={d.id} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${currentId === d.id ? "bg-primary/5 border border-primary/30" : "bg-muted/50 hover:bg-muted"}`}>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{d.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(d.updated_at || d.created_at).toLocaleDateString("fr-FR")}
                        {d.certification?.rncp ? ` – RNCP ${d.certification.rncp}` : ""}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button size="sm" variant="ghost" onClick={() => handleLoad(d)} className="gap-1 text-xs"><FolderOpen className="w-3.5 h-3.5" /> Charger</Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(d.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      )}
    </div>
  );
}
