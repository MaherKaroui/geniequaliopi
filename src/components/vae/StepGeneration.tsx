import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Download, Cloud } from "lucide-react";
import { envoyerDossiersDansDrive } from "@/lib/envoiDrive";
import { garderActif } from "@/lib/arrierePlan";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { VAEData, VAEContents } from "@/lib/vae/vaeTypes";
import { buildVAEZip } from "@/lib/vae/vaeGenerator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props { data: VAEData; onContentsChange: (c: VAEContents) => void; }

export default function StepGeneration({ data, onContentsChange }: Props) {
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingZip, setLoadingZip] = useState(false);
  const [progress, setProgress] = useState("");
  const [format, setFormat] = useState<"word" | "pdf">("pdf");

  const generateContents = async () => {
    if (!data.certification.rncp || !data.candidat.nom) { toast.error("Remplissez d'abord la certification et le candidat"); return; }
    setLoadingAI(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("vae-generate-contents", {
        body: { candidat: data.candidat, certification: data.certification, organisme: data.organisme, session: data.session },
      });
      if (error) throw error;
      if (res?.error) throw new Error(res.error);
      onContentsChange(res);
      toast.success("Contenus générés — vous pouvez les modifier");
    } catch (e: any) {
      toast.error("Génération IA impossible : " + (e.message || "erreur"));
    } finally {
      setLoadingAI(false);
    }
  };

  const generateZip = async () => {
    setLoadingZip(true);
    try {
      const blob = await garderActif(() => buildVAEZip(data, setProgress, { format }));
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `VAE_${data.candidat.nom}_${data.candidat.prenom}_${data.certification.rncp}.zip`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Dossier VAE téléchargé");
    } catch (e: any) {
      toast.error("Erreur : " + (e.message || "erreur"));
    } finally {
      setLoadingZip(false);
      setProgress("");
    }
  };

  const [loadingDrive, setLoadingDrive] = useState(false);
  const sendToDrive = async () => {
    setLoadingDrive(true);
    await envoyerDossiersDansDrive([{
      nomRacine: `VAE_${data.candidat.nom}_${data.candidat.prenom}_${data.certification.rncp}`,
      construire: (suivi) => buildVAEZip(data, (msg) => suivi(msg), { format }),
    }]);
    setLoadingDrive(false);
  };

  const c = data.contents;
  const upd = (patch: Partial<VAEContents>) => onContentsChange({ ...c, ...patch });
  const updBesoin = (k: keyof VAEContents["besoins"], v: string) => upd({ besoins: { ...c.besoins, [k]: v } });
  const updBloc = (i: number, situations: string) => upd({ situationsParBloc: c.situationsParBloc.map((b, k) => k === i ? { ...b, situations } : b) });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Génération IA & aperçu</h2>

      <div className="flex flex-wrap gap-2">
        <Button onClick={generateContents} disabled={loadingAI} className="gap-2">
          {loadingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Générer les contenus IA
        </Button>
        <Select value={format} onValueChange={(value) => setFormat(value as "word" | "pdf")}>
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="pdf">PDF</SelectItem><SelectItem value="word">Word</SelectItem></SelectContent>
        </Select>
        <Button onClick={generateZip} disabled={loadingZip || loadingDrive} variant="default" className="gap-2 bg-gradient-hero border-0">
          {loadingZip ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Générer le dossier (ZIP {format === "pdf" ? "PDF" : "Word"})
        </Button>
        <Button onClick={sendToDrive} disabled={loadingZip || loadingDrive} variant="outline" className="gap-2">
          {loadingDrive ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cloud className="w-4 h-4" />}
          {loadingDrive ? "Envoi dans Drive…" : "Envoyer dans Google Drive"}
        </Button>
        {progress && <span className="text-sm text-muted-foreground self-center">{progress}</span>}
      </div>

      <div className="space-y-3">
        <div><Label>Motivation</Label><Textarea rows={5} value={c.motivation} onChange={e => upd({ motivation: e.target.value })} /></div>
        <div><Label>Parcours</Label><Textarea rows={5} value={c.parcours} onChange={e => upd({ parcours: e.target.value })} /></div>

        {c.situationsParBloc.length > 0 && (
          <div>
            <Label>Situations de travail par bloc</Label>
            {c.situationsParBloc.map((b, i) => (
              <div key={i} className="mt-2 border rounded p-3">
                <div className="text-sm font-semibold text-primary mb-1">{b.codeBloc} — {b.intitule}</div>
                <Textarea rows={6} value={b.situations} onChange={e => updBloc(i, e.target.value)} />
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><Label>Attentes</Label><Textarea rows={3} value={c.besoins.attentes} onChange={e => updBesoin("attentes", e.target.value)} /></div>
          <div><Label>Freins</Label><Textarea rows={3} value={c.besoins.freins} onChange={e => updBesoin("freins", e.target.value)} /></div>
          <div><Label>Disponibilités</Label><Textarea rows={3} value={c.besoins.disponibilites} onChange={e => updBesoin("disponibilites", e.target.value)} /></div>
          <div><Label>Matériel</Label><Textarea rows={3} value={c.besoins.materiel} onChange={e => updBesoin("materiel", e.target.value)} /></div>
          <div className="md:col-span-2"><Label>Handicap</Label><Textarea rows={2} value={c.besoins.handicap} onChange={e => updBesoin("handicap", e.target.value)} /></div>
        </div>

        <div><Label>Plan d'accompagnement</Label><Textarea rows={5} value={c.planAccompagnement} onChange={e => upd({ planAccompagnement: e.target.value })} /></div>
        <div><Label>Synthèse</Label><Textarea rows={4} value={c.synthese} onChange={e => upd({ synthese: e.target.value })} /></div>
      </div>
    </div>
  );
}
