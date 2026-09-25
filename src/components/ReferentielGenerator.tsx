import { useRef, useState } from "react";
import mammoth from "mammoth";
import { FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, BookOpen, FileUp, Link2, Loader2, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { RegionKey } from "@/lib/fakeStagiaireRegions";
import {
  generateStagiairesFromReferentiel, isApprentissage, isReferentielInactif,
  referentielFromFormation, type ReferentielAnalyse,
} from "@/lib/fakeStagiaireReferentiel";

interface Props {
  formation?: FormationInfo;
  onFormationChange?: (f: FormationInfo) => void;
  count: number;
  region: RegionKey | "all";
  onGenerate: (stagiaires: StagiaireInfo[], replace: boolean) => void;
}

const readDataUrl = (file: File) => new Promise<string>((res, rej) => {
  const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = rej; r.readAsDataURL(file);
});

async function invokeErr(error: any): Promise<string> {
  try { const b = await error?.context?.json?.(); if (b?.error) return b.error; } catch { /* ignore */ }
  return error?.message || "Erreur inconnue";
}

const ReferentielGenerator = ({ formation, onFormationChange, count, region, onGenerate }: Props) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState<ReferentielAnalyse | null>(null);
  const [source, setSource] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  const analyse = async (body: Record<string, unknown>, label: string) => {
    setLoading(true);
    const t = toast.loading("Analyse du référentiel en cours (10 à 40 s)…");
    try {
      const { data, error } = await supabase.functions.invoke("analyse-referentiel", { body });
      if (error) throw new Error(await invokeErr(error));
      if (data?.error) throw new Error(data.error);
      setRef(data as ReferentielAnalyse);
      setSource(label);
      toast.success("Référentiel analysé", { id: t });
    } catch (e: any) {
      toast.error(e.message || "Analyse impossible", { id: t, duration: 8000 });
    } finally { setLoading(false); }
  };

  const onFile = async (file?: File) => {
    if (!file) return;
    if (/\.docx$/i.test(file.name)) {
      const { value } = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
      await analyse({ text: value, filename: file.name }, file.name);
    } else {
      await analyse({ fileDataUrl: await readDataUrl(file), filename: file.name }, file.name);
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  const useFormation = () => {
    if (!formation?.intitule) { toast.error("Renseignez d'abord l'intitulé à l'étape Formation."); return; }
    setRef(referentielFromFormation(formation)); setSource("Données de l'étape Formation");
  };

  const applyToFormation = () => {
    if (!ref || !formation || !onFormationChange) return;
    const next = { ...formation };
    const filled: string[] = [];
    const set = (k: keyof FormationInfo, v: string, label: string) => {
      if (v && !String(next[k] || "").trim()) { (next as any)[k] = v; filled.push(label); }
    };
    set("intitule", ref.intitule, "intitulé");
    set("prerequis", ref.prerequis, "prérequis");
    set("publicVise", ref.publicVise, "public visé");
    set("methodesEvaluation", ref.modalitesEvaluation, "méthodes d'évaluation");
    set("codeRNCP", ref.code, "code RNCP/RS");
    if (!filled.length) { toast.info("Aucun champ vide à compléter : vos saisies sont conservées."); return; }
    onFormationChange(next);
    toast.success(`Formation complétée : ${filled.join(", ")}`);
  };

  const generate = (replace: boolean) => {
    if (!ref) return;
    const n = Math.max(1, Math.min(300, Math.floor(count) || 1));
    const f = formation ?? ({} as FormationInfo);
    onGenerate(generateStagiairesFromReferentiel({ count: n, region, referentiel: ref, formation: f }), replace);
    toast.success(`${n} stagiaire(s) fictif(s) cohérent(s) avec le référentiel`);
  };

  const inactif = ref ? isReferentielInactif(ref) : false;

  return (
    <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-sm">Générer depuis le référentiel</h3>
        {formation && isApprentissage(formation) && <Badge variant="secondary">Apprentissage (16-29 ans)</Badge>}
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1">
          <Label className="text-xs">Lien France Compétences</Label>
          <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://www.francecompetences.fr/recherche/rncp/39063/" className="h-9" />
        </div>
        <div className="flex items-end gap-2 flex-wrap">
          <Button size="sm" variant="outline" className="h-9 gap-1" disabled={loading || !url.trim()} onClick={() => analyse({ url: url.trim() }, url.trim())}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />} Analyser le lien
          </Button>
          <input ref={fileRef} type="file" accept=".pdf,.docx,application/pdf" className="hidden" onChange={e => onFile(e.target.files?.[0])} />
          <Button size="sm" variant="outline" className="h-9 gap-1" disabled={loading} onClick={() => fileRef.current?.click()}>
            <FileUp className="w-4 h-4" /> PDF / DOCX
          </Button>
          <Button size="sm" variant="ghost" className="h-9 gap-1" disabled={loading} onClick={useFormation}>
            Utiliser l'étape Formation
          </Button>
        </div>
      </div>

      {ref && (
        <div className="rounded-lg border bg-card p-3 space-y-2 text-sm">
          {inactif && (
            <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-2 text-destructive text-xs font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              Fiche inactive ou date de fin d'enregistrement dépassée{ref.dateFinEnregistrement ? ` (${new Date(ref.dateFinEnregistrement).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })})` : ""} : la certification ne peut plus être délivrée.
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {ref.code && <Badge>{ref.code}</Badge>}
            {ref.niveau && <Badge variant="secondary">Niveau {ref.niveau}</Badge>}
            <span className="font-semibold">{ref.intitule || "Intitulé non détecté"}</span>
          </div>
          <p className="text-xs text-muted-foreground">Source : {source}</p>
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-1 text-xs">
            {ref.certificateur && <p><strong>Certificateur :</strong> {ref.certificateur}</p>}
            {ref.dateFinEnregistrement && <p><strong>Fin d'enregistrement :</strong> {new Date(ref.dateFinEnregistrement).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>}
            {ref.codesRome.length > 0 && <p><strong>Codes ROME :</strong> {ref.codesRome.join(", ")}</p>}
            {ref.metiers.length > 0 && <p><strong>Métiers :</strong> {ref.metiers.slice(0, 6).join(", ")}</p>}
            {ref.secteurs.length > 0 && <p><strong>Secteurs :</strong> {ref.secteurs.join(", ")}</p>}
          </div>
          {ref.blocs.length > 0 && (
            <div className="text-xs"><strong>Blocs de compétences :</strong>
              <ul className="list-disc ml-5">{ref.blocs.map((b, i) => <li key={i}>{b.code ? `${b.code} – ` : ""}{b.intitule}</li>)}</ul>
            </div>
          )}
          {ref.prerequis && <p className="text-xs"><strong>Prérequis :</strong> {ref.prerequis}</p>}
          {ref.publicVise && <p className="text-xs"><strong>Public visé :</strong> {ref.publicVise}</p>}
          {ref.modalitesEvaluation && <p className="text-xs"><strong>Évaluation :</strong> {ref.modalitesEvaluation}</p>}
          <div className="flex flex-wrap gap-2 pt-1">
            {onFormationChange && formation && (
              <Button size="sm" variant="outline" className="gap-1" onClick={applyToFormation}>
                <Wand2 className="w-4 h-4" /> Appliquer à la formation
              </Button>
            )}
            <Button size="sm" className="gap-1" onClick={() => generate(false)}><Sparkles className="w-4 h-4" /> Générer {count} (ajouter)</Button>
            <Button size="sm" variant="outline" className="gap-1" onClick={() => generate(true)}><Sparkles className="w-4 h-4" /> Générer (remplacer)</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferentielGenerator;
