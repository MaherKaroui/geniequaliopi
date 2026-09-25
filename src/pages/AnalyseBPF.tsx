import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, BarChart3, Building2, CheckCircle2, ChevronDown, ChevronRight, Download, FileUp, Info,
  Loader2, Plus, Save, Search, Trash2, XCircle, AlertTriangle, ClipboardList, Rocket,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { OrganismeInfo } from "@/types/qualiopi";
import {
  analyseBpf, BpfData, C_LINES, emptyBpf, EntrepriseInfo, eur, exerciceLabel, fetchEntreprise, int,
  Level, longDate, normalizeBpf, pct, type BpfResult,
} from "@/lib/bpfAnalyse";
import { buildDocument, tableHTML } from "@/lib/docBuilder";
import { downloadAsPdf } from "@/lib/pdfExport";

const TYPE_LABELS: Record<string, string> = {
  "actions-formation": "Actions de formation",
  "bilans-competences": "Bilans de compétences",
  vae: "VAE",
  apprentissage: "Apprentissage",
};

const LEVEL_STYLE: Record<Level, { cls: string; Icon: any }> = {
  ok: { cls: "border-emerald-300 bg-emerald-50 text-emerald-900", Icon: CheckCircle2 },
  warn: { cls: "border-amber-300 bg-amber-50 text-amber-900", Icon: AlertTriangle },
  error: { cls: "border-destructive/40 bg-destructive/10 text-destructive", Icon: XCircle },
  info: { cls: "border-primary/30 bg-primary/5 text-foreground", Icon: Info },
};

const readDataUrl = (file: File) => new Promise<string>((res, rej) => {
  const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = rej; r.readAsDataURL(file);
});

async function invokeErr(error: any): Promise<string> {
  try { const b = await error?.context?.json?.(); if (b?.error) return b.error; } catch { /* ignore */ }
  return error?.message || "Erreur inconnue";
}

const emptyOrganisme: OrganismeInfo = {
  nom: "", siret: "", adresse: "", codePostal: "", ville: "", telephone: "", email: "",
  siteWeb: "", nda: "", dirigeant: "", responsablePedagogique: "", referentHandicap: "",
  referentQualite: "", poleAdministratif: "", relationEntreprises: "", referentMobilite: "",
  domainesFormation: "", typesActions: [], certifications: "", outilsUtilises: "",
  version: "1", dateMaj: new Date().toISOString().slice(0, 10),
};

type SavedRow = { id: string; organisme: string; exercice: string; donnees: any; resultats: any; created_at: string };

/* ---------- Champ numérique éditable ---------- */
const NumField = ({ label, value, onChange }: { label: string; value: number | null; onChange: (v: number | null) => void }) => (
  <div>
    <Label className="text-xs">{label}</Label>
    <Input
      className="h-8" inputMode="decimal" value={value ?? ""}
      onChange={e => { const t = e.target.value.replace(/\s/g, "").replace(",", "."); onChange(t === "" ? null : isNaN(Number(t)) ? value : Number(t)); }}
    />
  </div>
);

const AnalyseBPF = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bpfs, setBpfs] = useState<BpfData[]>([]);
  const [idx, setIdx] = useState(0);
  const [extracting, setExtracting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [ent, setEnt] = useState<EntrepriseInfo | null>(null);
  const [entLoading, setEntLoading] = useState(false);
  const [saved, setSaved] = useState<SavedRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const cur = bpfs[idx];
  const result: BpfResult | null = useMemo(() => (cur ? analyseBpf(cur, bpfs, ent) : null), [cur, bpfs, ent]);

  const loadSaved = async () => {
    if (!user) return;
    const { data, error } = await supabase.from("bpf_analyses").select("*").order("created_at", { ascending: false }).limit(50);
    if (!error) setSaved((data as SavedRow[]) || []);
  };
  useEffect(() => { loadSaved(); /* eslint-disable-next-line */ }, [user?.id]);

  const update = (fn: (b: BpfData) => BpfData) => setBpfs(list => list.map((b, i) => (i === idx ? fn(structuredClone(b)) : b)));

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    if (!user) { toast.error("Connectez-vous pour utiliser l'extraction IA (ou saisissez manuellement)."); return; }
    setExtracting(true);
    const added: BpfData[] = [];
    for (const file of Array.from(files)) {
      const t = toast.loading(`Extraction du BPF « ${file.name} » (20 à 60 s)…`);
      try {
        const { data, error } = await supabase.functions.invoke("extract-bpf", { body: { fileDataUrl: await readDataUrl(file), filename: file.name } });
        if (error) throw new Error(await invokeErr(error));
        if (data?.error) throw new Error(data.error);
        added.push(normalizeBpf(data));
        toast.success(`BPF extrait : ${file.name}`, { id: t });
      } catch (e: any) {
        toast.error(`${file.name} : ${e.message}. Vous pouvez saisir les champs manuellement.`, { id: t, duration: 9000 });
      }
    }
    if (added.length) {
      setBpfs(list => { const next = [...list, ...added]; setIdx(next.length - 1); return next; });
      setEnt(null);
    }
    setExtracting(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const addManual = () => {
    setBpfs(list => { const next = [...list, emptyBpf()]; setIdx(next.length - 1); return next; });
    setEditOpen(true);
  };

  const verifyEntreprise = async () => {
    if (!cur?.siret) { toast.error("Renseignez le SIRET."); return; }
    setEntLoading(true);
    try {
      const e = await fetchEntreprise(cur.siret);
      if (!e) toast.warning("Aucun établissement trouvé pour ce SIRET.");
      setEnt(e);
    } catch (e: any) { toast.error(e.message); } finally { setEntLoading(false); }
  };

  const createDossier = () => {
    if (!cur || !result) return;
    let org: OrganismeInfo = { ...emptyOrganisme };
    try { const s = sessionStorage.getItem("qualiopi_org"); if (s) org = { ...emptyOrganisme, ...JSON.parse(s) }; } catch { /* ignore */ }
    const fill = (k: keyof OrganismeInfo, val: string) => { if (val && !String(org[k] || "").trim()) (org as any)[k] = val; };
    fill("nom", cur.denomination || ent?.nom || "");
    fill("siret", cur.siret.replace(/\s/g, ""));
    fill("nda", cur.nda);
    fill("adresse", cur.adresse);
    fill("codePostal", cur.codePostal);
    fill("ville", cur.ville);
    fill("dirigeant", ent?.dirigeant ? ent.dirigeant.replace(/\s*\(.*\)$/, "") : "");
    if (!org.typesActions?.length) org.typesActions = result.typesActions;
    sessionStorage.setItem("qualiopi_org", JSON.stringify(org));
    sessionStorage.setItem("qualiopi_started", "1");
    sessionStorage.setItem("qualiopi_step", "1");
    toast.success("Organisme pré-rempli — vos saisies existantes sont conservées.");
    navigate("/");
    setTimeout(() => window.location.reload(), 50);
  };

  const save = async () => {
    if (!user) { toast.error("Connectez-vous pour enregistrer l'analyse."); return; }
    if (!cur || !result) return;
    setSaving(true);
    const { error } = await supabase.from("bpf_analyses").insert({
      user_id: user.id,
      organisme: cur.denomination || ent?.nom || "Organisme",
      exercice: exerciceLabel(cur),
      donnees: { bpf: cur, tous: bpfs, entreprise: ent } as any,
      resultats: result as any,
    });
    setSaving(false);
    if (error) { toast.error("Enregistrement impossible : " + error.message); return; }
    toast.success("Analyse enregistrée");
    loadSaved();
  };

  const loadRow = (r: SavedRow) => {
    const tous: BpfData[] = (r.donnees?.tous || [r.donnees?.bpf]).filter(Boolean).map(normalizeBpf);
    const i = Math.max(0, tous.findIndex(b => exerciceLabel(b) === r.exercice));
    setBpfs(tous); setIdx(i); setEnt(r.donnees?.entreprise || null);
    toast.success("Analyse rechargée");
  };
  const deleteRow = async (id: string) => {
    const { error } = await supabase.from("bpf_analyses").delete().eq("id", id);
    if (error) toast.error(error.message); else { setSaved(s => s.filter(x => x.id !== id)); toast.success("Analyse supprimée"); }
  };

  const exportPdf = async () => {
    if (!cur || !result) return;
    setExporting(true);
    try {
      const org: OrganismeInfo = { ...emptyOrganisme, nom: cur.denomination || ent?.nom || "Organisme", siret: cur.siret, nda: cur.nda, adresse: cur.adresse, codePostal: cur.codePostal, ville: cur.ville };
      const c = result.chiffres;
      const lvlTxt: Record<Level, string> = { ok: "Conforme", warn: "À vérifier", error: "Incohérence", info: "Information" };
      const html = buildDocument({
        org,
        title: "RAPPORT D'ANALYSE DU BILAN PÉDAGOGIQUE ET FINANCIER",
        subtitle: `Exercice : ${exerciceLabel(cur)}`,
        sections: [
          { heading: "Identité de l'organisme", content: [
            `<p><strong>Dénomination :</strong> ${cur.denomination || "—"}${cur.formeJuridique ? ` (${cur.formeJuridique})` : ""}</p>`,
            `<p><strong>SIRET :</strong> ${cur.siret || "—"} · <strong>NDA :</strong> ${cur.nda || "—"}</p>`,
            cur.adresse ? `<p><strong>Adresse :</strong> ${cur.adresse}, ${cur.codePostal} ${cur.ville}</p>` : "",
            ent ? `<p><strong>Registre SIRENE :</strong> ${ent.nom} — créé le ${longDate(ent.dateCreation)} — ${ent.etat}${ent.dirigeant ? ` — dirigeant : ${ent.dirigeant}` : ""}</p>` : "",
          ].join("") },
          { heading: "Types d'actions recommandés pour le dossier Qualiopi", content: `<ul>${result.typesMotifs.map(m => `<li>${m}</li>`).join("") || "<li>Aucun type détecté</li>"}</ul>` },
        ],
        extraHtml:
          `<h2>Chiffres clés</h2>` + tableHTML(["Indicateur", "Valeur"], [
            ["Chiffre d'affaires formation", eur(c.ca)],
            ["Nombre de stagiaires", int(c.stagiaires)],
            ["Heures stagiaires", int(c.heures)],
            ["CA moyen par stagiaire", c.caParStagiaire != null ? eur(c.caParStagiaire) : "—"],
            ["CA par heure stagiaire", c.eurParHeure != null ? `${c.eurParHeure.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €` : "—"],
            ["Part du CPF", c.partCpf != null ? pct(c.partCpf) : "—"],
            ["Part de la sous-traitance", c.partSousTraitance != null ? pct(c.partSousTraitance) : "—"],
          ]) +
          `<h2>Origine des produits (cadre C)</h2>` + tableHTML(["Origine", "Montant"], [
            ...C_LINES.filter(l => cur.cadreC[l.key] != null).map(l => [l.label, eur(cur.cadreC[l.key] as number)]),
            ["<strong>Total déclaré</strong>", cur.cadreC.total != null ? `<strong>${eur(cur.cadreC.total)}</strong>` : "—"],
          ]) +
          `<h2>Contrôles de cohérence</h2>` + tableHTML(["Statut", "Contrôle", "Détail"], result.checks.map(k => [lvlTxt[k.level], k.label, k.detail])) +
          (result.evolution.length > 1 ? `<h2>Évolution entre exercices</h2>` + tableHTML(["Exercice", "CA", "Stagiaires", "Heures"], result.evolution.map(e => [e.exercice, eur(e.ca), int(e.stagiaires), int(e.heures)])) : "") +
          `<h2>À préparer avant le dossier Qualiopi</h2><ul>${result.todo.map(t => `<li>${t}</li>`).join("")}</ul>` +
          `<p style="margin-top:16px;font-size:10px">Rapport établi le ${longDate(new Date().toISOString())} à partir du BPF (cerfa n°10443) fourni. Document d'aide à la préparation, il ne remplace pas la déclaration officielle.</p>`,
      });
      const safe = (cur.denomination || "ORGANISME").replace(/[^\w]+/g, "_").toUpperCase();
      await downloadAsPdf(html, `ANALYSE_BPF_${safe}.pdf`);
    } catch (e: any) { toast.error("Export PDF impossible : " + e.message); } finally { setExporting(false); }
  };

  /* ---------- Rendu ---------- */
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1"><ArrowLeft className="w-4 h-4" /> Accueil</Button>
            <h1 className="font-bold text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> Analyse BPF</h1>
          </div>
          {cur && (
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="outline" onClick={exportPdf} disabled={exporting} className="gap-1">
                {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Export PDF
              </Button>
              <Button size="sm" variant="outline" onClick={save} disabled={saving} className="gap-1">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Enregistrer
              </Button>
              <Button size="sm" onClick={createDossier} className="gap-1 bg-gradient-hero border-0 text-primary-foreground">
                <Rocket className="w-4 h-4" /> Créer le dossier Qualiopi avec ces données
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <section className="bg-card rounded-2xl border shadow-card p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold">Bilan Pédagogique et Financier (cerfa 10443)</h2>
            <p className="text-sm text-muted-foreground">Importez un ou plusieurs BPF (PDF ou image, un par exercice). Les données sont extraites automatiquement ; vous pouvez corriger chaque champ.</p>
          </div>
          <input ref={fileRef} type="file" multiple accept="application/pdf,image/*" className="hidden" onChange={e => onFiles(e.target.files)} />
          <div
            className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors"
            onClick={() => !extracting && fileRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); onFiles(e.dataTransfer.files); }}
          >
            {extracting ? <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" /> : <FileUp className="w-8 h-8 mx-auto text-primary" />}
            <p className="mt-2 font-medium">{extracting ? "Extraction en cours…" : "Déposer ou choisir un BPF (PDF / image)"}</p>
            <p className="text-xs text-muted-foreground">Plusieurs exercices possibles</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {bpfs.map((b, i) => (
              <Button key={i} size="sm" variant={i === idx ? "default" : "outline"} onClick={() => setIdx(i)} className="gap-2">
                {b.exerciceFin ? `Exercice ${new Date(b.exerciceFin).getFullYear() || ""}` : `BPF ${i + 1}`}
                <Trash2 className="w-3.5 h-3.5 opacity-70" onClick={e => { e.stopPropagation(); setBpfs(l => l.filter((_, j) => j !== i)); setIdx(0); }} />
              </Button>
            ))}
            <Button size="sm" variant="ghost" onClick={addManual} className="gap-1"><Plus className="w-4 h-4" /> Saisie manuelle</Button>
          </div>
        </section>

        {cur && (
          <section className="bg-card rounded-2xl border shadow-card">
            <button className="w-full flex items-center justify-between p-4 font-semibold" onClick={() => setEditOpen(o => !o)}>
              <span>Données du BPF — {exerciceLabel(cur)}</span>
              {editOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {editOpen && (
              <div className="p-4 pt-0 space-y-5">
                <div className="grid md:grid-cols-4 gap-3">
                  {([
                    ["exerciceDebut", "Début d'exercice", "date"], ["exerciceFin", "Fin d'exercice", "date"],
                    ["denomination", "Dénomination"], ["formeJuridique", "Forme juridique"],
                    ["siret", "SIRET"], ["nda", "NDA"], ["adresse", "Adresse"], ["codePostal", "Code postal"], ["ville", "Ville"],
                  ] as [keyof BpfData, string, string?][]).map(([k, l, t]) => (
                    <div key={k}><Label className="text-xs">{l}</Label>
                      <Input className="h-8" type={t || "text"} value={(cur[k] as string) || ""} onChange={e => update(b => { (b as any)[k] = e.target.value; return b; })} />
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Cadre C — Origine des produits (€)</h4>
                  <div className="grid md:grid-cols-5 gap-3">
                    {C_LINES.map(l => <NumField key={l.key} label={l.label} value={cur.cadreC[l.key]} onChange={val => update(b => { b.cadreC[l.key] = val; return b; })} />)}
                    <NumField label="Total CA" value={cur.cadreC.total} onChange={val => update(b => { b.cadreC.total = val; return b; })} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Cadre D — Charges (€)</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <NumField label="Total charges" value={cur.cadreD.totalCharges} onChange={val => update(b => { b.cadreD.totalCharges = val; return b; })} />
                      <NumField label="Salaires formateurs" value={cur.cadreD.salairesFormateurs} onChange={val => update(b => { b.cadreD.salairesFormateurs = val; return b; })} />
                      <NumField label="Achats sous-traitance" value={cur.cadreD.achatsSousTraitance} onChange={val => update(b => { b.cadreD.achatsSousTraitance = val; return b; })} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Cadre E — Formateurs</h4>
                    <div className="grid grid-cols-4 gap-3">
                      <NumField label="Internes (nb)" value={cur.cadreE.internesNombre} onChange={val => update(b => { b.cadreE.internesNombre = val; return b; })} />
                      <NumField label="Internes (h)" value={cur.cadreE.internesHeures} onChange={val => update(b => { b.cadreE.internesHeures = val; return b; })} />
                      <NumField label="Externes (nb)" value={cur.cadreE.externesNombre} onChange={val => update(b => { b.cadreE.externesNombre = val; return b; })} />
                      <NumField label="Externes (h)" value={cur.cadreE.externesHeures} onChange={val => update(b => { b.cadreE.externesHeures = val; return b; })} />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Cadre F — Stagiaires (nombre / heures)</h4>
                  {cur.cadreF1.length > 0 && (
                    <p className="text-xs text-muted-foreground mb-2">F-1 détail : {cur.cadreF1.map(r => `${r.type} ${r.nombre ?? "?"} / ${r.heures ?? "?"} h`).join(" · ")}</p>
                  )}
                  <div className="grid md:grid-cols-6 gap-3">
                    <NumField label="F-1 total (nb)" value={cur.cadreF1Total.nombre} onChange={val => update(b => { b.cadreF1Total.nombre = val; return b; })} />
                    <NumField label="F-1 total (h)" value={cur.cadreF1Total.heures} onChange={val => update(b => { b.cadreF1Total.heures = val; return b; })} />
                    <NumField label="F-2 sous-traitance (nb)" value={cur.cadreF2.nombre} onChange={val => update(b => { b.cadreF2.nombre = val; return b; })} />
                    <NumField label="F-2 (h)" value={cur.cadreF2.heures} onChange={val => update(b => { b.cadreF2.heures = val; return b; })} />
                    <NumField label="F-4 total (nb)" value={cur.cadreF4Total.nombre} onChange={val => update(b => { b.cadreF4Total.nombre = val; return b; })} />
                    <NumField label="F-4 total (h)" value={cur.cadreF4Total.heures} onChange={val => update(b => { b.cadreF4Total.heures = val; return b; })} />
                  </div>
                  <p className="text-xs font-medium mt-3 mb-1">F-3 — Objectif des prestations{cur.cadreF3.rncpNiveau.length ? ` (RNCP : ${cur.cadreF3.rncpNiveau.map(r => `niv. ${r.niveau} = ${r.nombre ?? 0}`).join(", ")})` : ""}</p>
                  <div className="grid md:grid-cols-6 gap-3">
                    {(["rs", "cqp", "autres", "bilans", "vae", "total"] as const).map(k => (
                      <NumField key={k} label={{ rs: "RS", cqp: "CQP", autres: "Autres", bilans: "Bilans", vae: "VAE", total: "Total F-3" }[k] + " (nb)"} value={cur.cadreF3[k].nombre} onChange={val => update(b => { b.cadreF3[k].nombre = val; return b; })} />
                    ))}
                  </div>
                  <div className="grid md:grid-cols-6 gap-3 mt-3">
                    <NumField label="G — confiés à un autre OF (nb)" value={cur.cadreG.nombre} onChange={val => update(b => { b.cadreG.nombre = val; return b; })} />
                    <NumField label="G (h)" value={cur.cadreG.heures} onChange={val => update(b => { b.cadreG.heures = val; return b; })} />
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {cur && result && (
          <>
            <div className="grid md:grid-cols-3 gap-4">
              <section className="bg-card rounded-2xl border shadow-card p-5 space-y-2 md:col-span-1">
                <h3 className="font-semibold flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" /> Identité de l'OF</h3>
                <p className="text-sm font-medium">{cur.denomination || "—"}</p>
                {cur.formeJuridique && <p className="text-xs text-muted-foreground">{cur.formeJuridique}</p>}
                <p className="text-xs">SIRET : {cur.siret || "—"}</p>
                <p className="text-xs">NDA : {cur.nda || "—"}</p>
                {cur.adresse && <p className="text-xs">{cur.adresse}, {cur.codePostal} {cur.ville}</p>}
                <Button size="sm" variant="outline" className="gap-1 w-full mt-2" onClick={verifyEntreprise} disabled={entLoading}>
                  {entLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Vérifier SIRET / création / dirigeant
                </Button>
                {ent && (
                  <div className="rounded-md bg-secondary/60 p-2 text-xs space-y-0.5">
                    <p><strong>{ent.nom}</strong> <Badge variant={ent.etat === "Active" ? "secondary" : "destructive"} className="ml-1 text-[10px]">{ent.etat}</Badge></p>
                    {ent.dateCreation && <p>Créé le {longDate(ent.dateCreation)}</p>}
                    {ent.dirigeant && <p>Dirigeant : {ent.dirigeant}</p>}
                    {ent.adresse && <p>{ent.adresse}</p>}
                  </div>
                )}
              </section>
              <section className="bg-card rounded-2xl border shadow-card p-5 md:col-span-2">
                <h3 className="font-semibold mb-3">Chiffres clés</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    ["CA total", eur(result.chiffres.ca)],
                    ["Stagiaires", int(result.chiffres.stagiaires)],
                    ["Heures stagiaires", int(result.chiffres.heures)],
                    ["CA / stagiaire", result.chiffres.caParStagiaire != null ? eur(result.chiffres.caParStagiaire) : "—"],
                    ["€ / heure", result.chiffres.eurParHeure != null ? `${result.chiffres.eurParHeure.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €` : "—"],
                    ["Part CPF", result.chiffres.partCpf != null ? pct(result.chiffres.partCpf) : "—"],
                    ["Part sous-traitance", result.chiffres.partSousTraitance != null ? pct(result.chiffres.partSousTraitance) : "—"],
                    ["Formateurs", `${int(result.chiffres.formateurs)} · ${int(result.chiffres.heuresFormateurs)} h`],
                  ].map(([l, val]) => (
                    <div key={l} className="rounded-xl border bg-secondary/40 p-3">
                      <p className="text-xs text-muted-foreground">{l}</p>
                      <p className="text-lg font-bold">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold mb-1">Types d'actions détectés → cases recommandées</p>
                  <div className="flex flex-wrap gap-2">
                    {result.typesActions.length ? result.typesActions.map(t => <Badge key={t}>{TYPE_LABELS[t]}</Badge>) : <span className="text-xs text-muted-foreground">Aucun</span>}
                  </div>
                  {result.typesMotifs.length > 0 && <p className="text-xs text-muted-foreground mt-1">{result.typesMotifs.join(" · ")}</p>}
                </div>
              </section>
            </div>

            <section className="bg-card rounded-2xl border shadow-card p-5">
              <h3 className="font-semibold mb-3">Contrôles de cohérence</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {result.checks.map((c, i) => {
                  const { cls, Icon } = LEVEL_STYLE[c.level];
                  return (
                    <div key={i} className={`flex gap-2 rounded-lg border p-3 text-sm ${cls}`}>
                      <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                      <div><p className="font-medium">{c.label}</p><p className="text-xs opacity-90">{c.detail}</p></div>
                    </div>
                  );
                })}
              </div>
              {result.evolution.length > 1 && (
                <div className="mt-4 overflow-x-auto">
                  <p className="text-sm font-semibold mb-1">Évolution entre exercices</p>
                  <table className="w-full text-xs">
                    <thead><tr className="text-left text-muted-foreground"><th className="p-1">Exercice</th><th className="p-1">CA</th><th className="p-1">Stagiaires</th><th className="p-1">Heures</th></tr></thead>
                    <tbody>{result.evolution.map((e, i) => <tr key={i} className="border-t"><td className="p-1">{e.exercice}</td><td className="p-1">{eur(e.ca)}</td><td className="p-1">{int(e.stagiaires)}</td><td className="p-1">{int(e.heures)}</td></tr>)}</tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="bg-card rounded-2xl border shadow-card p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><ClipboardList className="w-4 h-4 text-primary" /> À préparer avant le dossier Qualiopi</h3>
              <ul className="space-y-1.5 text-sm">
                {result.todo.map((t, i) => <li key={i} className="flex gap-2"><span className="text-primary">☐</span>{t}</li>)}
              </ul>
            </section>
          </>
        )}

        <section className="bg-card rounded-2xl border shadow-card p-5">
          <h3 className="font-semibold mb-3">Analyses précédentes</h3>
          {!user ? <p className="text-sm text-muted-foreground">Connectez-vous pour enregistrer et retrouver vos analyses.</p>
            : saved.length === 0 ? <p className="text-sm text-muted-foreground">Aucune analyse enregistrée.</p>
            : (
              <div className="divide-y">
                {saved.map(r => (
                  <div key={r.id} className="flex items-center justify-between py-2 text-sm">
                    <div>
                      <p className="font-medium">{r.organisme}</p>
                      <p className="text-xs text-muted-foreground">{r.exercice} · enregistrée le {longDate(r.created_at)}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => loadRow(r)}>Charger</Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteRow(r.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </section>
      </main>
    </div>
  );
};

export default AnalyseBPF;
