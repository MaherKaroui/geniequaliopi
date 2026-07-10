import { useState } from "react";
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Certification visée (France Compétences)</h2>
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
