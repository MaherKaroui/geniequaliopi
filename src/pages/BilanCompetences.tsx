import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness, ChevronLeft, ChevronRight, Download, Eye, Home, Loader2, Save, Trash2, FolderOpen, RefreshCw, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import DossierOutputSettings from "@/components/DossierOutputSettings";
import BdcImageInput from "@/components/bdc/BdcImageInput";
import BdcPdfPreview from "@/components/bdc/BdcPdfPreview";
import { emptyBdcData, BDC_DECLARATION_FIELDS, type StandaloneBdcData } from "@/lib/bdc/standaloneTypes";
import { generateStandaloneBdcPlanning, validateStandaloneBdc, bdcFollowupDate, bdcIsFinished, bdcFollowupDue } from "@/lib/bdc/standaloneModel";
import { BDC_STANDALONE_DOCUMENTS, bdcDocumentTitle, type BdcDocumentId } from "@/lib/bdc/standaloneDocuments";
import { exportStandaloneBdcDocument, exportStandaloneBdcZip, downloadBdcBlob, bdcFileTag } from "@/lib/bdc/standaloneExport";
import { readBdcHistory, writeBdcHistory, type BdcHistoryEntry } from "@/lib/bdc/standaloneHistory";
import type { Jour, Creneau } from "@/lib/bdc/bdcModel";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { applyBdcAI } from "@/lib/bdc/standaloneAI";

const STEPS = [{ id: 1, label: "Organisme" }, { id: 2, label: "Bénéficiaire" }, { id: 3, label: "Bilan et planning" }, { id: 4, label: "Réponses et séances" }, { id: 5, label: "Documents" }];
const DRAFT_KEY = "bdc_standalone_draft_v1";
const field = (label: string, value: string | undefined, onChange: (value: string) => void, type = "text") => <div className="space-y-1"><Label htmlFor={`bdc-${label}`}>{label}</Label><Input id={`bdc-${label}`} type={type} value={value || ""} onChange={e => onChange(e.target.value)} /></div>;

export default function BilanCompetences() {
  const navigate = useNavigate();
  const [data, setData] = useState<StandaloneBdcData>(() => {
    try { const saved = localStorage.getItem(DRAFT_KEY); return saved ? { ...emptyBdcData(), ...JSON.parse(saved) } : emptyBdcData(); } catch { return emptyBdcData(); }
  });
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState<BdcHistoryEntry[]>(readBdcHistory);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState<string | null>(null);
  const [selected, setSelected] = useState<BdcDocumentId[]>(BDC_STANDALONE_DOCUMENTS.map(d => d.id));
  const [format, setFormat] = useState<"pdf" | "word">("pdf");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [preview, setPreview] = useState<{ title: string; url: string } | null>(null);
  const [draftFailed, setDraftFailed] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiContext, setAiContext] = useState("");
  const generateAI = async () => {
    if (!data.beneficiaire.nom.trim() || !data.beneficiaire.prenom.trim() || aiContext.trim().length < 20) { setAiError("Renseignez le prénom, le nom et le parcours ou projet (20 caractères minimum)."); return; }
    if (Object.values(data.declarations).some(Boolean) && !window.confirm("L’IA va reformuler les contenus existants. Continuer ?")) return;
    setLoadingAI(true); setAiError("");
    try {
      const b = data.beneficiaire, f = data.formation;
      const { data: result, error } = await supabase.functions.invoke("bdc-generate-contents", { body: { contexte: aiContext, beneficiaire: { prenom: b.prenom, nom: b.nom, civilite: b.civilite || "", poste: b.poste || "", diplome: b.diplome || "", entreprise: b.entreprise || "" }, formation: { intitule: f.intitule, duree: f.duree, modalites: f.modalites, objectifs: f.objectifs, programme: f.programme }, declarations: data.declarations } });
      if (error) { let message = error.message; try { const body = await error.context?.json(); message = body?.error || message; } catch { /* keep original */ } throw new Error(message); }
      if (!result || result.error) throw new Error(result?.error || "Réponse IA vide");
      setData(d => applyBdcAI(d, result)); toast.success("Contenus IA générés — prêts à relire et modifier");
    } catch (error) { setAiError(error instanceof Error ? error.message : "Génération IA impossible"); } finally { setLoadingAI(false); }
  };
  useEffect(() => { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); setDraftFailed(false); } catch { setDraftFailed(true); } }, [data]);
  useEffect(() => () => { if (preview?.url) URL.revokeObjectURL(preview.url); }, [preview]);
  const org = data.organisme, b = data.beneficiaire, f = data.formation;
  const updateOrg = (patch: Partial<typeof org>) => setData(d => ({ ...d, organisme: { ...d.organisme, ...patch } }));
  const updateBenef = (patch: Partial<typeof b>) => setData(d => ({ ...d, beneficiaire: { ...d.beneficiaire, ...patch }, sessions: Object.keys(patch).some(k => ["dateDebutFormation", "dateFinFormation"].includes(k)) ? [] : d.sessions }));
  const updateFormation = (patch: Partial<typeof f>) => setData(d => ({ ...d, formation: { ...d.formation, ...patch }, sessions: Object.keys(patch).some(k => ["duree", "dateDebut", "dateFin", "modalites"].includes(k)) ? [] : d.sessions }));
  const errors = validateStandaloneBdc(data);
  const save = (update = false) => {
    const entry: BdcHistoryEntry = { id: update && loaded ? loaded : crypto.randomUUID(), name: name.trim() || `${b.prenom} ${b.nom} — ${f.intitule}`, updatedAt: new Date().toISOString(), data: structuredClone(data) };
    const next = [entry, ...history.filter(item => item.id !== entry.id)];
    try { writeBdcHistory(next); setHistory(next); setLoaded(entry.id); setName(entry.name); toast.success(update ? "Dossier mis à jour" : "Dossier enregistré dans ce navigateur"); } catch { toast.error("Espace du navigateur insuffisant. Supprimez un ancien dossier ou réduisez les images."); }
  };
  const load = (item: BdcHistoryEntry) => { setData(structuredClone(item.data)); setLoaded(item.id); setName(item.name); setStep(1); toast.success("Dossier chargé"); };
  const remove = (item: BdcHistoryEntry) => {
    if (!window.confirm(`Supprimer le dossier « ${item.name} » ?`)) return;
    const next = history.filter(h => h.id !== item.id);
    try { writeBdcHistory(next); setHistory(next); if (loaded === item.id) setLoaded(null); } catch { toast.error("Suppression impossible."); }
  };
  const generatePlanning = () => {
    if (data.sessions.some(s => s.presence || s.compteRendu) && !window.confirm("Remplacer le planning et effacer ses comptes rendus et présences ?")) return;
    try { const sessions = generateStandaloneBdcPlanning(data); setData(d => ({ ...d, sessions })); toast.success(`${sessions.length} séances planifiées`); } catch (error) { toast.error(error instanceof Error ? error.message : "Planning impossible"); }
  };
  const exportOne = async (id: BdcDocumentId, show = false) => {
    setBusy(true); setProgress(bdcDocumentTitle(id, data));
    try {
      const result = await exportStandaloneBdcDocument(data, id, show ? "pdf" : format);
      if (show) setPreview({ title: bdcDocumentTitle(id, data), url: URL.createObjectURL(result.blob) });
      else downloadBdcBlob(result.blob, result.filename);
    } catch (error) { toast.error(error instanceof Error ? error.message : "Document impossible à générer"); } finally { setBusy(false); setProgress(""); }
  };
  const exportZip = async () => {
    setBusy(true);
    try {
      const blob = await exportStandaloneBdcZip(data, format, setProgress, selected);
      downloadBdcBlob(blob, `BDC_${bdcFileTag(b.nom)}_${bdcFileTag(b.prenom)}_${org.dateMaj}.zip`);
      toast.success("Dossier Bilan de compétences téléchargé");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Dossier impossible à générer"); } finally { setBusy(false); setProgress(""); }
  };
  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b bg-card sticky top-0 z-10"><div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-3"><h1 className="text-lg sm:text-xl font-bold flex items-center gap-2"><BriefcaseBusiness className="h-6 w-6 text-primary shrink-0" /> Bilan de compétences</h1><Button variant="ghost" size="sm" onClick={() => navigate("/")}><Home className="h-4 w-4 mr-2" /> Accueil</Button></div></header>
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <details className="border-b pb-4"><summary className="cursor-pointer font-semibold flex items-center gap-2"><FolderOpen className="h-4 w-4 text-primary" /> Historique des dossiers BDC ({history.length})</summary><div className="pt-4 space-y-3">
        <p className="text-xs text-muted-foreground">Dossiers confidentiels conservés uniquement dans ce navigateur, sur cet appareil.</p>
        <div className="flex flex-wrap gap-2"><Input aria-label="Nom du dossier" placeholder="Nom du dossier" value={name} onChange={e => setName(e.target.value)} className="flex-1 min-w-40" /><Button onClick={() => save()} disabled={busy}><Save className="h-4 w-4 mr-2" /> Enregistrer</Button><Button variant="outline" disabled={!loaded || busy} onClick={() => save(true)}><RefreshCw className="h-4 w-4 mr-2" /> Mettre à jour</Button></div>
        <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input aria-label="Rechercher un dossier" className="pl-9" placeholder="Rechercher un dossier, un organisme ou un bénéficiaire" value={search} onChange={e => setSearch(e.target.value)} /></div>
        {history.filter(item => `${item.name} ${item.data.organisme.nom} ${item.data.beneficiaire.nom} ${item.data.beneficiaire.prenom}`.toLocaleLowerCase("fr").includes(search.toLocaleLowerCase("fr"))).map(item => <div key={item.id} className="flex flex-wrap justify-between items-center gap-2 border-b py-2"><div className="min-w-0"><p className="font-medium break-words">{item.name}</p><p className="text-xs text-muted-foreground">{item.data.organisme.nom} · {new Date(item.updatedAt).toLocaleDateString("fr-FR")}</p></div><div className="flex gap-1"><Button variant="outline" size="sm" onClick={() => load(item)} disabled={busy}><FolderOpen className="h-4 w-4 mr-2" /> Charger</Button><Button variant="ghost" size="icon" title="Supprimer" aria-label={`Supprimer ${item.name}`} onClick={() => remove(item)} disabled={busy}><Trash2 className="h-4 w-4" /></Button></div></div>)}
      </div></details>
      {draftFailed && <p role="alert" className="text-destructive text-sm">La sauvegarde automatique est impossible : l’espace du navigateur est plein.</p>}
      <nav aria-label="Étapes du bilan" className="grid grid-cols-5 gap-1 border-b pb-4">{STEPS.map(item => <Button key={item.id} variant={step === item.id ? "default" : "ghost"} disabled={busy} aria-current={step === item.id ? "step" : undefined} aria-label={item.label} onClick={() => setStep(item.id)} className="min-w-0 h-auto flex-col gap-1 px-1 py-2 text-xs sm:flex-row sm:gap-2"><span className="h-6 w-6 shrink-0 rounded-full border border-current flex items-center justify-center">{step > item.id ? "✓" : item.id}</span><span className="hidden md:inline whitespace-normal">{item.label}</span></Button>)}</nav>
      <section className="py-2 space-y-5">
        {step === 1 && <><h2 className="text-xl font-semibold">Organisme prestataire</h2><div className="grid sm:grid-cols-2 gap-4">
          {field("Nom de l’organisme *", org.nom, v => updateOrg({ nom: v }))}{field("SIRET *", org.siret, v => updateOrg({ siret: v }))}
          {field("Adresse *", org.adresse, v => updateOrg({ adresse: v }))}{field("Code postal *", org.codePostal, v => updateOrg({ codePostal: v }))}
          {field("Ville *", org.ville, v => updateOrg({ ville: v }))}{field("N° déclaration d’activité", org.nda, v => updateOrg({ nda: v }))}
          {field("Dirigeant *", org.dirigeant, v => updateOrg({ dirigeant: v }))}{field("Email de l’organisme *", org.email, v => updateOrg({ email: v }), "email")}
          {field("Téléphone (optionnel)", org.telephone, v => updateOrg({ telephone: v }), "tel")}{field("Référent handicap", org.referentHandicap, v => updateOrg({ referentHandicap: v }))}
          {field("Version des documents", org.version, v => updateOrg({ version: v }))}{field("Date de mise à jour *", org.dateMaj, v => updateOrg({ dateMaj: v }), "date")}
          {field("Médiateur désigné et coordonnées", data.mediateur, v => setData(d => ({ ...d, mediateur: v })))}
          <div className="space-y-1"><Label>Régime TVA</Label><Select value={org.regimeTva || "exonere"} onValueChange={v => updateOrg({ regimeTva: v as "exonere" | "assujetti" })}><SelectTrigger aria-label="Régime TVA"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="exonere">Exonération déclarée — art. 261-4-4°a</SelectItem><SelectItem value="assujetti">Assujetti — TVA 20 %</SelectItem></SelectContent></Select></div>
        </div><div className="grid sm:grid-cols-3 gap-4"><BdcImageInput label="Logo de l’organisme" value={org.logoUrl} onChange={v => updateOrg({ logoUrl: v })} /><BdcImageInput label="Tampon de l’organisme" value={org.tamponUrl} onChange={v => updateOrg({ tamponUrl: v })} /><BdcImageInput label="Signature du dirigeant (si aucun tampon)" signature value={org.signatureUrl} onChange={v => updateOrg({ signatureUrl: v })} /></div></>}
        {step === 2 && <><h2 className="text-xl font-semibold">Bénéficiaire</h2><div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1"><Label>Civilité</Label><Select value={b.civilite || "none"} onValueChange={v => updateBenef({ civilite: v === "none" ? "" : v as "M." | "Mme" })}><SelectTrigger aria-label="Civilité"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Non précisée</SelectItem><SelectItem value="M.">M.</SelectItem><SelectItem value="Mme">Mme</SelectItem></SelectContent></Select></div>
          {field("Prénom *", b.prenom, v => updateBenef({ prenom: v }))}{field("Nom *", b.nom, v => updateBenef({ nom: v }))}{field("Date de naissance", b.dateNaissance, v => updateBenef({ dateNaissance: v }), "date")}
          {field("Email du bénéficiaire *", b.email, v => updateBenef({ email: v }), "email")}{field("Téléphone du bénéficiaire", b.telephone, v => updateBenef({ telephone: v }), "tel")}
          {field("Adresse du bénéficiaire", b.adresse, v => updateBenef({ adresse: v }))}{field("Code postal du bénéficiaire", b.codePostal, v => updateBenef({ codePostal: v }))}{field("Commune", b.commune, v => updateBenef({ commune: v }))}{field("Diplôme / niveau d’études", b.diplome, v => updateBenef({ diplome: v }))}
          {field("Poste actuel", b.poste, v => updateBenef({ poste: v }))}{field("Entreprise (si concernée)", b.entreprise, v => updateBenef({ entreprise: v }))}
          {b.entreprise.trim() && <>{field("Adresse de l’entreprise *", b.adresseEntreprise, v => updateBenef({ adresseEntreprise: v }))}{field("Représentant de l’entreprise *", b.responsableEntreprise, v => updateBenef({ responsableEntreprise: v }))}</>}
          {field("Date de début individuelle (optionnelle)", b.dateDebutFormation, v => updateBenef({ dateDebutFormation: v }), "date")}{field("Date de fin individuelle (optionnelle)", b.dateFinFormation, v => updateBenef({ dateFinFormation: v }), "date")}{field("Tarif individuel HT / net de taxe (optionnel)", b.tarifFormation, v => updateBenef({ tarifFormation: v }), "number")}
          <div className="space-y-1"><Label>Financeur *</Label><Select value={b.financeur || "Personnel"} onValueChange={v => updateBenef({ financeur: v })}><SelectTrigger aria-label="Financeur"><SelectValue /></SelectTrigger><SelectContent>{["Personnel", "CPF", "Entreprise", "OPCO", "France Travail", "Transitions Pro", "Région"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div>
        </div><p className="text-sm font-medium text-primary">{b.entreprise.trim() ? "Convention tripartite : organisme, entreprise et bénéficiaire." : "Contrat bilatéral : organisme et bénéficiaire."}</p><div className="grid sm:grid-cols-2 gap-4"><BdcImageInput label="Signature du bénéficiaire" signature value={b.signatureUrl} onChange={v => updateBenef({ signatureUrl: v })} />{b.entreprise.trim() && <BdcImageInput label="Signature du représentant de l’entreprise" signature value={b.signatureResponsableUrl} onChange={v => updateBenef({ signatureResponsableUrl: v })} />}</div></>}
        {step === 3 && <><h2 className="text-xl font-semibold">Bilan et planning individuel</h2><div className="grid sm:grid-cols-2 gap-4">
          {field("Intitulé du bilan *", f.intitule, v => updateFormation({ intitule: v }))}{field("Consultant référent *", f.formateur, v => updateFormation({ formateur: v }))}
          {field("Durée totale en heures (3 à 24) *", f.duree, v => updateFormation({ duree: v }), "number")}{field("Prix HT / net de taxe *", f.tarif, v => updateFormation({ tarif: v }), "number")}
          {field("Date de début *", f.dateDebut, v => updateFormation({ dateDebut: v }), "date")}{field("Date de fin *", f.dateFin, v => updateFormation({ dateFin: v }), "date")}
          {field("Date d’entretien préalable *", data.dateEntretien, v => setData(d => ({ ...d, dateEntretien: v })), "date")}{field("Date de signature *", data.dateSignature, v => setData(d => ({ ...d, dateSignature: v })), "date")}
          {field("Lieu du bilan (sinon adresse de l’organisme)", f.lieu, v => updateFormation({ lieu: v }))}
          <div className="space-y-1"><Label>Modalité</Label><Select value={f.modalites} onValueChange={v => updateFormation({ modalites: v })}><SelectTrigger aria-label="Modalité"><SelectValue /></SelectTrigger><SelectContent>{["Présentiel", "Distanciel", "Mixte"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div>
        </div><div className="grid sm:grid-cols-2 gap-4"><div className="space-y-1"><Label htmlFor="bdc-objectifs">Objectifs personnalisés</Label><Textarea id="bdc-objectifs" value={f.objectifs} onChange={e => updateFormation({ objectifs: e.target.value })} /></div><div className="space-y-1"><Label htmlFor="bdc-paiement">Modalités de paiement convenues</Label><Textarea id="bdc-paiement" value={data.paiement} onChange={e => setData(d => ({ ...d, paiement: e.target.value }))} /></div></div>
          <fieldset><legend className="font-medium text-sm mb-2">Jours disponibles</legend><div className="flex flex-wrap gap-4">{(["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"] as Jour[]).map(day => <label key={day} className="flex items-center gap-2 text-sm"><Checkbox checked={data.jours.includes(day)} onCheckedChange={checked => setData(d => ({ ...d, jours: checked ? [...d.jours, day] : d.jours.filter(v => v !== day), sessions: [] }))} />{day}</label>)}</div></fieldset>
          <fieldset><legend className="font-medium text-sm mb-2">Créneaux disponibles</legend><div className="flex flex-wrap gap-4">{(["matin", "apres-midi", "soir"] as Creneau[]).map(slot => <label key={slot} className="flex items-center gap-2 text-sm"><Checkbox checked={data.creneaux.includes(slot)} onCheckedChange={checked => setData(d => ({ ...d, creneaux: checked ? [...d.creneaux, slot] : d.creneaux.filter(v => v !== slot), sessions: [] }))} />{slot === "apres-midi" ? "Après-midi" : slot === "matin" ? "Matin" : "Soir"}</label>)}</div></fieldset>
          <Button onClick={generatePlanning}><RefreshCw className="h-4 w-4 mr-2" /> {data.sessions.length ? "Recalculer le planning" : "Générer le planning individuel"}</Button>
          {data.sessions.length > 0 && <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-muted"><tr>{["Séance", "Phase", "Date", "Début", "Fin", "Heures"].map(title => <th key={title} className="p-2 text-left">{title}</th>)}</tr></thead><tbody>{data.sessions.map((s, i) => <tr key={s.numero} className="border-b"><td className="p-2">{s.numero}</td><td className="p-2">{s.phase}</td>{(["date", "heureDebut", "heureFin"] as const).map(key => <td key={key} className="p-2 min-w-36"><Input aria-label={`${key} séance ${s.numero}`} type={key === "date" ? "date" : "time"} value={s[key]} onChange={e => setData(d => ({ ...d, sessions: d.sessions.map((session, k) => k === i ? { ...session, [key]: e.target.value } : session) }))} /></td>)}<td className="p-2">{s.duree}</td></tr>)}</tbody></table><p className="text-sm font-medium mt-3">{data.sessions.reduce((sum, s) => sum + s.duree, 0)} heures · {data.sessions.length} séances · suivi proposé le {bdcFollowupDate(data)?.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p></div>}
        </>}
        {step === 4 && <><h2 className="text-xl font-semibold">Génération IA et relecture</h2><div className="space-y-3 border-b pb-5"><Label htmlFor="bdc-ai-context">Parcours, projet professionnel et éléments recueillis</Label><Textarea id="bdc-ai-context" rows={5} value={aiContext} disabled={loadingAI} onChange={e => setAiContext(e.target.value)} /><Button onClick={generateAI} disabled={loadingAI || busy} className="gap-2">{loadingAI ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} {loadingAI ? "Rédaction en cours…" : "Générer les contenus IA"}</Button>{aiError && <p role="alert" className="text-sm text-destructive">{aiError}</p>}<p className="text-xs text-muted-foreground">Propositions IA à relire avec le bénéficiaire. Les présences et signatures ne sont jamais inventées.</p></div><div className="grid sm:grid-cols-2 gap-4">{BDC_DECLARATION_FIELDS.map(item => <div key={item.key} className="space-y-1"><Label htmlFor={`declaration-${item.key}`}>{item.label}</Label><Textarea id={`declaration-${item.key}`} rows={5} disabled={loadingAI} value={data.declarations[item.key]} onChange={e => setData(d => ({ ...d, declarations: { ...d.declarations, [item.key]: e.target.value } }))} /></div>)}</div>
          <h3 className="font-semibold text-lg pt-4">Suivi des séances</h3>{data.sessions.map((s, i) => <div key={s.numero} className="border-t pt-4 space-y-2"><h4 className="font-medium">Séance {s.numero} — {s.date} · {s.heureDebut} – {s.heureFin}</h4><label className="flex items-center gap-2 text-sm"><Checkbox checked={s.presence} disabled={new Date(`${s.date}T23:59:59`) >= new Date()} onCheckedChange={v => setData(d => ({ ...d, sessions: d.sessions.map((session, k) => k === i ? { ...session, presence: v === true } : session) }))} />Présence confirmée après la séance</label><Textarea aria-label={`Compte rendu séance ${s.numero}`} rows={3} value={s.compteRendu} disabled={new Date(`${s.date}T23:59:59`) >= new Date()} placeholder="Compte rendu recueilli après l’entretien" onChange={e => setData(d => ({ ...d, sessions: d.sessions.map((session, k) => k === i ? { ...session, compteRendu: e.target.value } : session) }))} /></div>)}
          <div className="space-y-1"><Label htmlFor="bdc-reglement">Règlement intérieur de l’organisme (si spécifique)</Label><Textarea id="bdc-reglement" rows={5} value={data.reglement} onChange={e => setData(d => ({ ...d, reglement: e.target.value }))} /></div>
        </>}
        {step === 5 && <><h2 className="text-xl font-semibold">Dossier individuel — 18 pièces</h2><DossierOutputSettings organisme={org} scope="bdc-standalone" compact />
          {errors.length > 0 ? <div role="alert" className="border-l-4 border-destructive pl-4 py-2"><p className="font-semibold">Informations à compléter</p><ul className="text-sm list-disc pl-5">{errors.map((error, i) => <li key={i}>{error}</li>)}</ul></div> : <p className="text-primary font-medium">Dossier prêt à générer · {b.prenom} {b.nom}</p>}
          <p className="text-sm text-muted-foreground">{bdcIsFinished(data) ? "Bilan terminé." : "Bilan en cours : conclusions et satisfaction restent à compléter."} {!bdcFollowupDue(data) && "Le suivi à six mois n’est pas encore échu."}</p>
          <div className="flex flex-wrap gap-3 items-center"><Select value={format} onValueChange={v => setFormat(v as "pdf" | "word")}><SelectTrigger aria-label="Format des documents" className="w-36"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pdf">PDF</SelectItem><SelectItem value="word">Word</SelectItem></SelectContent></Select><Button disabled={busy || !!errors.length || !selected.length} onClick={exportZip}>{busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />} Télécharger le dossier ZIP ({selected.length})</Button><span aria-live="polite" className="text-sm text-muted-foreground">{progress}</span></div>
          <div className="divide-y border-y">{BDC_STANDALONE_DOCUMENTS.map((doc, i) => <div key={doc.id} className="flex gap-3 items-center py-3"><Checkbox aria-label={`Inclure ${doc.title}`} checked={selected.includes(doc.id)} onCheckedChange={v => setSelected(ids => v ? [...ids, doc.id] : ids.filter(id => id !== doc.id))} /><span className="text-xs text-muted-foreground w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span><p className="flex-1 min-w-0 text-sm font-medium">{bdcDocumentTitle(doc.id, data)}</p><Button variant="ghost" size="icon" title="Voir le PDF" aria-label={`Voir ${doc.title}`} disabled={busy || !!errors.length} onClick={() => exportOne(doc.id, true)}><Eye className="h-4 w-4" /></Button><Button variant="outline" size="icon" title="Télécharger" aria-label={`Télécharger ${doc.title}`} disabled={busy || !!errors.length} onClick={() => exportOne(doc.id)}><Download className="h-4 w-4" /></Button></div>)}</div>
        </>}
      </section>
      <div className="flex justify-between gap-3 border-t pt-5"><Button variant="outline" disabled={step === 1 || busy} onClick={() => setStep(s => s - 1)}><ChevronLeft className="h-4 w-4 mr-2" /> Précédent</Button><Button disabled={step === 5 || busy} onClick={() => setStep(s => s + 1)}>Suivant<ChevronRight className="h-4 w-4 ml-2" /></Button></div>
    </main>
    <Dialog open={!!preview} onOpenChange={open => { if (!open) setPreview(null); }}><DialogContent className="max-w-5xl w-[calc(100%-2rem)] h-[85vh] flex flex-col"><DialogTitle className="pr-6">{preview?.title}</DialogTitle><DialogDescription className="sr-only">Aperçu du PDF du dossier individuel</DialogDescription>{preview && <BdcPdfPreview url={preview.url} />}</DialogContent></Dialog>
  </div>;
}