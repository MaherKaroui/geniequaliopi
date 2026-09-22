import { ChangeEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Download, ImagePlus, Loader2, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { streamImage } from "@/lib/streamImage";
import { toast } from "sonner";

type ReferenceLogo = { file: File; preview: string };
type LogoResult = { src: string; final: boolean };
const STYLES = [
  { id: "institutionnel", label: "Institutionnel", detail: "Fiable et adapté aux documents officiels" },
  { id: "moderne", label: "Moderne", detail: "Épuré, distinctif et mémorisable" },
  { id: "humain", label: "Humain", detail: "Accessible et orienté accompagnement" },
];

const GenerateurLogo = () => {
  const navigate = useNavigate();
  const storedOrg = useMemo<Record<string, string>>(() => {
    try { return JSON.parse(sessionStorage.getItem("qualiopi_org") || "{}"); } catch { return {}; }
  }, []);
  const [name, setName] = useState(storedOrg.nom || sessionStorage.getItem("logo_prefill_name") || "");
  const [tagline, setTagline] = useState("");
  const [activity, setActivity] = useState(storedOrg.domainesFormation || "Formation professionnelle et accompagnement");
  const [style, setStyle] = useState("institutionnel");
  const [color, setColor] = useState("#1857a4");
  const [instructions, setInstructions] = useState("");
  const [references, setReferences] = useState<ReferenceLogo[]>([]);
  const [results, setResults] = useState<LogoResult[]>([]);
  const [loading, setLoading] = useState(false);

  const addReferences = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []).slice(0, Math.max(0, 3 - references.length));
    const valid = files.filter(file => file.type.startsWith("image/") && file.size <= 8 * 1024 * 1024);
    if (valid.length !== files.length) toast.error("Utilisez des images de moins de 8 Mo.");
    setReferences(current => [...current, ...valid.map(file => ({ file, preview: URL.createObjectURL(file) }))]);
    event.target.value = "";
  };

  const promptFor = (concept: number) => {
    const referenceText = references.length ? `Les ${references.length} images jointes servent uniquement de références d'ambiance. Ne copier ni leur symbole, ni leurs lettres, ni leur composition.` : "Créer une identité entièrement originale.";
    return `Créer un logo professionnel original pour un organisme de formation français. Nom exact, écrit une seule fois et sans faute : "${name.trim()}".${tagline.trim() ? ` Slogan exact sous le nom : "${tagline.trim()}".` : " Aucun autre texte."} Activité : ${activity.trim()}. Orientation : ${style}. Couleur principale : ${color}. ${instructions.trim() || "Logo clair, crédible et lisible sur documents administratifs, site web et supports imprimés."} ${referenceText} Concept ${concept === 0 ? "A : symbole compact et géométrique, composition horizontale" : "B : monogramme ou forme organique distinctive, composition différente du concept A"}. Formes nettes, excellente lisibilité en petite taille, marges généreuses, logo isolé, sans maquette, sans papier, sans mur, sans carte de visite, sans filigrane. Fond transparent.`;
  };

  const generate = async () => {
    if (!name.trim()) { toast.error("Indiquez le nom exact de l'organisme."); return; }
    setLoading(true);
    setResults([{ src: "", final: false }, { src: "", final: false }]);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) throw new Error("Connectez-vous pour créer des logos.");
      const endpoint = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-logo-ai`;
      const headers = { Authorization: `Bearer ${token}`, apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY };
      for (let concept = 0; concept < 2; concept += 1) {
        const prompt = promptFor(concept);
        const input: Record<string, unknown> | FormData = references.length ? new FormData() : { prompt };
        if (input instanceof FormData) {
          input.append("prompt", prompt);
          references.forEach(reference => input.append("image[]", reference.file));
        }
        await streamImage(endpoint, input, (src, final) => setResults(current => current.map((item, index) => index === concept ? { src, final } : item)), headers);
      }
      toast.success("Deux propositions de logo ont été créées.");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Création impossible."); }
    finally { setLoading(false); }
  };

  const download = (src: string, index: number) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `${name.trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "organisme"}-logo-${index + 1}.png`;
    link.click();
  };

  const useLogo = (src: string) => {
    try {
      sessionStorage.setItem("generated_logo_url", src);
      sessionStorage.setItem("qualiopi_org", JSON.stringify({ ...storedOrg, nom: name.trim(), logoUrl: src }));
      sessionStorage.setItem("qualiopi_started", "1");
      sessionStorage.setItem("qualiopi_step", "1");
      toast.success("Logo ajouté à votre organisme.");
      navigate("/");
    } catch { toast.error("Le logo est trop volumineux pour être ajouté automatiquement. Téléchargez-le puis chargez-le dans le formulaire."); }
  };

  return <div className="min-h-screen bg-background">
    <header className="border-b bg-card"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"><Button variant="ghost" onClick={() => navigate("/")} className="gap-2"><ArrowLeft className="h-4 w-4" /> Accueil</Button><div className="flex items-center gap-2 font-semibold"><Sparkles className="h-5 w-5 text-primary" /> Créateur de logo</div></div></header>
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="space-y-6">
        <div><h1 className="text-3xl font-bold">Votre identité visuelle</h1><p className="mt-2 text-muted-foreground">Décrivez votre organisme et ajoutez jusqu'à trois logos dont vous appréciez le style.</p></div>
        <div className="space-y-4 border-t pt-5">
          <div className="space-y-2"><Label htmlFor="logo-name">Nom exact de l'organisme *</Label><Input id="logo-name" value={name} onChange={e => setName(e.target.value)} placeholder="Ex. MS FORMATION" /></div>
          <div className="space-y-2"><Label htmlFor="tagline">Slogan (facultatif)</Label><Input id="tagline" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Ex. Apprendre, progresser, réussir" /></div>
          <div className="space-y-2"><Label htmlFor="activity">Domaines de formation</Label><Textarea id="activity" value={activity} onChange={e => setActivity(e.target.value)} rows={3} placeholder="Ex. langues, vente, ressources humaines" /></div>
          <fieldset className="space-y-3"><legend className="text-sm font-medium">Style souhaité</legend><RadioGroup value={style} onValueChange={setStyle} className="grid gap-2 sm:grid-cols-3">{STYLES.map(option => <Label key={option.id} htmlFor={option.id} className="flex cursor-pointer gap-3 rounded-md border bg-card p-3"><RadioGroupItem id={option.id} value={option.id} className="mt-0.5" /><span><span className="block font-semibold">{option.label}</span><span className="mt-1 block text-xs font-normal text-muted-foreground">{option.detail}</span></span></Label>)}</RadioGroup></fieldset>
          <div className="space-y-2"><Label htmlFor="logo-color">Couleur principale</Label><div className="flex gap-2"><input id="logo-color" type="color" value={color} onChange={e => setColor(e.target.value)} className="h-10 w-12 cursor-pointer rounded border bg-card p-1" /><Input value={color} onChange={e => setColor(e.target.value)} className="font-mono" /></div></div>
          <div className="space-y-2"><Label htmlFor="references">Logos de référence (facultatif)</Label><label htmlFor="references" className="flex min-h-24 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed bg-muted/30 text-sm text-muted-foreground"><ImagePlus className="h-5 w-5" /> Ajouter des images</label><input id="references" type="file" accept="image/*" multiple className="hidden" onChange={addReferences} disabled={references.length >= 3} />{references.length > 0 && <div className="grid grid-cols-3 gap-2">{references.map((reference, index) => <div key={`${reference.file.name}-${index}`} className="relative aspect-square overflow-hidden rounded-md border bg-card"><img src={reference.preview} alt={`Référence ${index + 1}`} className="h-full w-full object-contain p-2" /><Button variant="destructive" size="icon" className="absolute right-1 top-1 h-7 w-7" onClick={() => setReferences(current => current.filter((_, i) => i !== index))} aria-label="Retirer cette référence"><Trash2 className="h-3.5 w-3.5" /></Button></div>)}</div>}</div>
          <div className="space-y-2"><Label htmlFor="instructions">Consignes particulières</Label><Textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} rows={3} placeholder="Ex. intégrer une forme de livre, éviter les silhouettes…" /></div>
          <Button size="lg" className="w-full gap-2" onClick={generate} disabled={loading}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}{loading ? "Création en cours…" : "Créer 2 propositions"}</Button>
        </div>
      </section>
      <section aria-label="Propositions de logos" className="lg:sticky lg:top-6 lg:self-start"><div className="grid gap-4 sm:grid-cols-2">{[0, 1].map(index => { const result = results[index]; return <div key={index} className="overflow-hidden rounded-md border bg-card shadow-card"><div className="flex aspect-square items-center justify-center bg-muted/40 p-5">{result?.src ? <img src={result.src} alt={`Proposition de logo ${index + 1}`} className={`h-full w-full object-contain transition ${result.final ? "blur-0" : "blur-xl"}`} /> : <div className="text-center text-muted-foreground"><Sparkles className="mx-auto mb-3 h-8 w-8 opacity-40" /><p className="text-sm">Proposition {index + 1}</p></div>}</div><div className="border-t p-3"><p className="mb-3 text-sm font-semibold">Concept {index === 0 ? "A" : "B"}</p><div className="flex gap-2"><Button variant="outline" size="sm" className="flex-1 gap-1" disabled={!result?.final} onClick={() => result?.src && download(result.src, index)}><Download className="h-4 w-4" /> PNG</Button><Button size="sm" className="flex-1 gap-1" disabled={!result?.final} onClick={() => result?.src && useLogo(result.src)}><Check className="h-4 w-4" /> Utiliser</Button></div></div></div>; })}</div><p className="mt-4 text-center text-xs text-muted-foreground">Vérifiez toujours l'orthographe du nom avant utilisation.</p></section>
    </main>
  </div>;
};

export default GenerateurLogo;