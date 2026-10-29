import { useEffect, useState } from "react";
import { codeRNCPPourTitre, loadIndexFC } from "@/lib/franceCompetences";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Search, ExternalLink, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { VAECertification, VAECandidat } from "@/lib/vae/vaeTypes";

interface Suggestion { rncp: string; intitule: string; niveau: string; certificateur?: string; justification: string; }
interface Props { data: VAECertification; onChange: (v: VAECertification) => void; candidat?: VAECandidat; }

export default function StepCertification({ data, onChange, candidat }: Props) {
  const [query, setQuery] = useState(data.rncp || data.intitule || "");
  const [loading, setLoading] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // Titre visé sans code : le code RNCP trouvé dans la base France Compétences est mis dans la recherche.
  useEffect(() => {
    if (data.rncp || !data.intitule) return;
    let actif = true;
    loadIndexFC().then(() => {
      const code = codeRNCPPourTitre(data.intitule, data.niveau);
      if (actif && code) setQuery((q) => (q === data.intitule ? code : q));
    });
    return () => { actif = false; };
  }, [data.rncp, data.intitule, data.niveau]);

  const lookup = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("fc-rncp-lookup", { body: { query } });
      if (error) throw error;
      if (res?.error) throw new Error(res.error);
      onChange({
        intitule: res.intitule || "",
        rncp: res.rncp || "",
        niveau: res.niveau || "",
        certificateur: res.certificateur || "",
        dateEcheance: res.dateEcheance || "",
        lien: res.lien || `https://www.francecompetences.fr/recherche/rncp/${res.rncp}/`,
        blocs: res.blocs || [],
      });
      toast.success("Fiche France Compétences récupérée");
    } catch (e: any) {
      toast.error("Récupération impossible — saisie manuelle : " + (e.message || "erreur"));
    } finally {
      setLoading(false);
    }
  };

  const suggestFromCV = async () => {
    if (!candidat || (!candidat.experiences?.length && !candidat.emploiActuel)) {
      toast.error("Complétez d'abord le CV du candidat (étape précédente)");
      return;
    }
    setSuggesting(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("vae-suggest-rncp", { body: { candidat } });
      if (error) throw error;
      if (res?.error) throw new Error(res.error);
      setSuggestions(res.suggestions || []);
      if (!res.suggestions?.length) toast.info("Aucune suggestion trouvée");
    } catch (e: any) {
      toast.error("Suggestion impossible : " + (e.message || "erreur"));
    } finally {
      setSuggesting(false);
    }
  };

  const pickSuggestion = async (s: Suggestion) => {
    setQuery(s.rncp);
    setLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("fc-rncp-lookup", { body: { query: s.rncp } });
      if (error || res?.error) throw new Error(res?.error || error?.message);
      onChange({
        intitule: res.intitule || s.intitule,
        rncp: res.rncp || s.rncp,
        niveau: res.niveau || s.niveau,
        certificateur: res.certificateur || s.certificateur || "",
        dateEcheance: res.dateEcheance || "",
        lien: res.lien || `https://www.francecompetences.fr/recherche/rncp/${s.rncp}/`,
        blocs: res.blocs || [],
      });
      toast.success("Certification chargée");
    } catch {
      onChange({
        intitule: s.intitule, rncp: s.rncp, niveau: s.niveau,
        certificateur: s.certificateur || "", dateEcheance: "",
        lien: `https://www.francecompetences.fr/recherche/rncp/${s.rncp}/`, blocs: [],
      });
      toast.warning("Fiche France Compétences indisponible — champs pré-remplis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Certification visée (France Compétences)</h2>

      <div className="p-4 border rounded-lg bg-secondary/30 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm">
            <div className="font-medium">Proposition IA basée sur le CV du candidat</div>
            <div className="text-muted-foreground text-xs">L'IA analyse le parcours et propose les RNCP les plus pertinents.</div>
          </div>
          <Button onClick={suggestFromCV} disabled={suggesting} variant="outline" className="gap-2 shrink-0">
            {suggesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Proposer un RNCP
          </Button>
        </div>
        {suggestions.length > 0 && (
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <button key={i} type="button" onClick={() => pickSuggestion(s)} className="w-full text-left p-3 rounded-md border bg-background hover:bg-accent transition-colors">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs bg-primary/10 px-2 py-0.5 rounded">RNCP {s.rncp}</span>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded">Niveau {s.niveau}</span>
                  <span className="font-medium text-sm">{s.intitule}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{s.justification}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Input placeholder="Nom du titre ou code RNCP (ex. 38362)" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && lookup()} />
        <Button onClick={lookup} disabled={loading} className="gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Rechercher
        </Button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div><Label>Intitulé</Label><Input value={data.intitule} onChange={e => onChange({ ...data, intitule: e.target.value })} /></div>
        <div><Label>Code RNCP</Label><Input value={data.rncp} onChange={e => {
          const rncp = e.target.value;
          onChange({ ...data, rncp, lien: rncp ? `https://www.francecompetences.fr/recherche/rncp/${rncp}/` : "" });
        }} /></div>
        <div><Label>Niveau</Label><Input value={data.niveau} onChange={e => onChange({ ...data, niveau: e.target.value })} /></div>
        <div><Label>Certificateur</Label><Input value={data.certificateur} onChange={e => onChange({ ...data, certificateur: e.target.value })} /></div>
        <div><Label>Date d'échéance</Label><Input value={data.dateEcheance} onChange={e => onChange({ ...data, dateEcheance: e.target.value })} /></div>
        <div>
          <Label>Lien France Compétences</Label>
          <div className="flex gap-2">
            <Input value={data.lien} onChange={e => onChange({ ...data, lien: e.target.value })} />
            {data.lien && <a href={data.lien} target="_blank" rel="noopener" className="p-2"><ExternalLink className="w-4 h-4" /></a>}
          </div>
        </div>
      </div>

      {data.blocs.length > 0 && (
        <div className="pt-2">
          <Label>Blocs de compétences</Label>
          <ul className="mt-2 text-sm space-y-1 border rounded p-3 bg-secondary/30">
            {data.blocs.map((b, i) => (
              <li key={i}><span className="font-mono text-xs bg-primary/10 px-2 py-0.5 rounded mr-2">{b.code}</span>{b.intitule || <em className="text-muted-foreground">(intitulé non détecté)</em>}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
