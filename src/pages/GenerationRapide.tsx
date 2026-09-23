import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { toast } from "sonner";
import {
  Zap, ChevronLeft, ChevronDown, ChevronRight, Plus, Trash2, Upload, Eye, Download,
  Loader2, Sparkles, CheckCircle2, AlertTriangle, FileText, Building2, GraduationCap, Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { OrganismeInfo, FormationInfo, StagiaireInfo, DocEntry } from "@/types/qualiopi";
import { supabase } from "@/integrations/supabase/client";
import { generateDocumentById } from "@/lib/documentGenerator";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { htmlToWordBlob } from "@/lib/wordExport";
import { genCerfaApprentissagePdf } from "@/lib/cerfaApprentissage";
import { buildDocumentFileName, buildGenericFileName, buildStagiaireFolderName } from "@/lib/fileNaming";
import { useBackgroundJobs } from "@/lib/backgroundJobs";
import { parseEdofXlsx } from "@/lib/edofParser";
import { extractMultipleStagiairesFromFile, extractionToStagiaire } from "@/lib/stagiaireFileExtractor";
import LogoSignatureUpload from "@/components/LogoSignatureUpload";
import DossierHistory from "@/components/DossierHistory";
import { SAMPLE_FORMATIONS } from "@/lib/sampleData";

/* ------------------------------------------------------------------ */
/* Constantes                                                          */
/* ------------------------------------------------------------------ */

const emptyOrganisme: OrganismeInfo = {
  nom: "", siret: "", adresse: "", codePostal: "", ville: "", telephone: "", email: "",
  siteWeb: "", nda: "", dirigeant: "", responsablePedagogique: "", referentHandicap: "",
  referentQualite: "", poleAdministratif: "", relationEntreprises: "", referentMobilite: "",
  domainesFormation: "", typesActions: [], certifications: "", outilsUtilises: "",
  version: "1", dateMaj: new Date().toISOString().slice(0, 10),
};

const emptyFormation: FormationInfo = {
  intitule: "", objectifs: "", prerequis: "", duree: "", modalites: "", tarif: "",
  programme: "", methodesEvaluation: "", moyensPedagogiques: "", publicVise: "",
  delaiAcces: "", dateDebut: "", dateFin: "", lieu: "", nombreParticipants: "", formateur: "",
  rythmeAlternance: "",
};

const emptyStagiaire: StagiaireInfo = {
  civilite: "", nom: "", prenom: "", email: "", telephone: "", entreprise: "",
  poste: "", dateNaissance: "",
};

const FINANCEURS = ["CPF", "OPCO", "Entreprise", "Personnel", "France Travail", "Région", "Autre"];

interface PackDoc {
  key: string;
  label: string;
  folder: string;
  template: string;
  perStagiaire: boolean;
  params?: Record<string, any>;
}

const PACK_DOCS: PackDoc[] = [
  { key: "programme", label: "Programme de formation", folder: "01_PROGRAMME", template: "programme_formation", perStagiaire: false, params: { fi: 0 } },
  { key: "contrat", label: "Contrat de formation professionnelle", folder: "02_CONTRAT", template: "contrat_formation_pro_stagiaire", perStagiaire: true },
  { key: "convention", label: "Convention de formation tripartite", folder: "03_CONVENTION", template: "convention_formation_tripartite", perStagiaire: true },
  { key: "cgv", label: "Conditions générales de vente", folder: "04_CGV", template: "cgv_stagiaire", perStagiaire: true },
  { key: "ri", label: "Règlement intérieur", folder: "05_REGLEMENT_INTERIEUR", template: "reglement_interieur_stagiaire", perStagiaire: true },
  { key: "emargement", label: "Feuille d'émargement", folder: "06_EMARGEMENT", template: "emargement_stagiaire", perStagiaire: true },
  { key: "connexion", label: "Temps de connexion réel", folder: "07_TEMPS_CONNEXION", template: "temps_connexion_reel", perStagiaire: true, params: { fi: 0 } },
  { key: "organigramme", label: "Organigramme", folder: "08_ORGANIGRAMME", template: "organigramme", perStagiaire: false },
  { key: "ca", label: "Chiffre d'affaires de la session", folder: "09_CHIFFRE_AFFAIRES", template: "ca_session", perStagiaire: false },
  { key: "cerfa", label: "CERFA 10103*14 — contrat d'apprentissage", folder: "10_CERFA", template: "cerfa_apprentissage", perStagiaire: true },
];

const yieldToBrowser = (delayMs = 0) =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => { window.setTimeout(resolve, delayMs); });
  });

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

/**
 * Neutralise l'héritage de la formation d'exemple (SAMPLE_FORMATIONS[0]) fait par
 * _generateDocumentByIdInner : tout champ vide de la page rapide est remplacé par
 * des faits réels (organisme, stagiaires saisis) et jamais par le contenu
 * « prothésie ongulaire » de l'exemple.
 */
const buildFormationSafe = (
  formation: FormationInfo,
  organisme: OrganismeInfo,
  stagiairesValides: StagiaireInfo[],
): FormationInfo => ({
  ...formation,
  lieu: formation.lieu?.trim() || `${organisme.adresse}, ${organisme.codePostal} ${organisme.ville}`,
  formateur: formation.formateur?.trim() || organisme.responsablePedagogique?.trim() || organisme.dirigeant?.trim() || "",
  nombreParticipants: String(formation.nombreParticipants ?? "").trim() || String(stagiairesValides.length),
  rythmeAlternance: String(formation.rythmeAlternance ?? "").trim() || " ",
});

/* ------------------------------------------------------------------ */
/* Bloc repliable                                                      */
/* ------------------------------------------------------------------ */

const Section = ({ step, icon, title, subtitle, done, children, defaultOpen = true, open: openProp, onOpenChange }: {
  step?: string; icon: React.ReactNode; title: string; subtitle?: string; done?: boolean; children: React.ReactNode; defaultOpen?: boolean;
  open?: boolean; onOpenChange?: (open: boolean) => void;
}) => {
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;
  const setOpen = (value: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof value === "function" ? value(open) : value;
    if (onOpenChange) onOpenChange(next);
    else setOpenState(next);
  };
  return (
    <div className="bg-card rounded-2xl border shadow-card overflow-hidden ring-1 ring-transparent hover:ring-primary/20 transition-shadow">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/40 transition-colors">
        {step && (
          <span className="w-9 h-9 shrink-0 rounded-xl bg-gradient-hero text-primary-foreground flex items-center justify-center text-sm font-bold shadow-card">
            {step}
          </span>
        )}
        <span className="text-primary">{icon}</span>
        <span className="flex-1 min-w-0">
          <span className="block font-semibold">{title}</span>
          {subtitle && <span className="block text-xs text-muted-foreground">{subtitle}</span>}
        </span>
        {done && (
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" /> Complet
          </span>
        )}
        {open ? <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 shrink-0 text-muted-foreground" />}
      </button>
      {open && <div className="px-5 pb-5 pt-1 space-y-4">{children}</div>}
    </div>
  );
};

const Field = ({ label, required, ...props }: { label: string; required?: boolean } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-1">
    <Label className="text-xs font-medium text-muted-foreground">{label}{required && <span className="text-destructive"> *</span>}</Label>
    <Input {...props} className="bg-background" />
  </div>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const GenerationRapide = () => {
  const navigate = useNavigate();
  const { runJob } = useBackgroundJobs();

  const [organisme, setOrganisme] = useState<OrganismeInfo>(emptyOrganisme);
  const [formation, setFormation] = useState<FormationInfo>(emptyFormation);
  const [stagiaires, setStagiaires] = useState<StagiaireInfo[]>([{ ...emptyStagiaire }]);
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [historyKey, setHistoryKey] = useState(0);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  const [selected, setSelected] = useState<Record<string, boolean>>(() => {
    try {
      const raw = sessionStorage.getItem("qualiopi_rapide_docs");
      if (raw) return { ...Object.fromEntries(PACK_DOCS.map((d) => [d.key, d.key !== "cerfa"])), ...JSON.parse(raw) };
    } catch { /* ignore */ }
    return Object.fromEntries(PACK_DOCS.map((d) => [d.key, d.key !== "cerfa"]));
  });
  const [exportFormat, setExportFormat] = useState<"pdf" | "doc">(
    () => (sessionStorage.getItem("qualiopi_rapide_fmt") as "pdf" | "doc") || "pdf",
  );
  const [zipMode, setZipMode] = useState<"zip" | "files">(
    () => (sessionStorage.getItem("qualiopi_rapide_zip") as "zip" | "files") || "zip",
  );

  const [aiLoading, setAiLoading] = useState(false);
  const aiTriggered = useRef(false);
  const [showContenu, setShowContenu] = useState(false);
  const [importing, setImporting] = useState(false);
  const [cerfaLoadingIdx, setCerfaLoadingIdx] = useState<number | null>(null);
  const [pappersUrl, setPappersUrl] = useState("");
  const [pappersLoading, setPappersLoading] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const docFileRef = useRef<HTMLInputElement>(null);
  const edofFileRef = useRef<HTMLInputElement>(null);

  /* ---------- Préremplissage / persistance ---------- */
  useEffect(() => {
    const read = <T,>(keyRapide: string, keyWizard: string, fallback: T): T => {
      for (const k of [keyRapide, keyWizard]) {
        try {
          const raw = sessionStorage.getItem(k);
          if (raw) return JSON.parse(raw) as T;
        } catch { /* ignore */ }
      }
      return fallback;
    };
    setOrganisme(read("qualiopi_rapide_org", "qualiopi_org", emptyOrganisme));
    setFormation(read("qualiopi_rapide_form", "qualiopi_form", emptyFormation));
    const st = read<StagiaireInfo[]>("qualiopi_rapide_stag", "qualiopi_stag", []);
    setStagiaires(st.length > 0 ? st : [{ ...emptyStagiaire }]);
    setLoaded(true);
  }, []);

  useEffect(() => { if (loaded) sessionStorage.setItem("qualiopi_rapide_org", JSON.stringify(organisme)); }, [organisme, loaded]);
  useEffect(() => { if (loaded) sessionStorage.setItem("qualiopi_rapide_form", JSON.stringify(formation)); }, [formation, loaded]);
  useEffect(() => { if (loaded) sessionStorage.setItem("qualiopi_rapide_stag", JSON.stringify(stagiaires)); }, [stagiaires, loaded]);
  useEffect(() => { sessionStorage.setItem("qualiopi_rapide_docs", JSON.stringify(selected)); }, [selected]);
  useEffect(() => { sessionStorage.setItem("qualiopi_rapide_fmt", exportFormat); }, [exportFormat]);
  useEffect(() => { sessionStorage.setItem("qualiopi_rapide_zip", zipMode); }, [zipMode]);

  /* ---------- Modalité → pré-cochage émargement / connexion ---------- */
  useEffect(() => {
    const m = (formation.modalites || "").toLowerCase();
    if (!m) return;
    const distanciel = m.includes("distanciel") && !m.includes("mixte");
    const mixte = m.includes("mixte");
    setSelected((prev) => ({
      ...prev,
      emargement: mixte ? true : !distanciel,
      connexion: mixte ? true : distanciel,
    }));
  }, [formation.modalites]);

  const setOrg = (patch: Partial<OrganismeInfo>) => setOrganisme((o) => ({ ...o, ...patch }));
  const setForm = (patch: Partial<FormationInfo>) => setFormation((f) => ({ ...f, ...patch }));
  const setStag = (idx: number, patch: Partial<StagiaireInfo>) =>
    setStagiaires((list) => list.map((s, i) => (i === idx ? { ...s, ...patch } : s)));

  /* ---------- Formation d'exemple ---------- */
  const loadSampleFormation = (idxStr: string) => {
    const sample = SAMPLE_FORMATIONS[Number(idxStr)];
    if (!sample) return;
    const normModalite = (m?: string) => {
      const v = (m || "").toLowerCase();
      if (v.includes("mixte")) return "Mixte (présentiel et distanciel)";
      if (v.includes("distanciel") && !v.includes("présentiel")) return "Distanciel";
      if (v) return "Présentiel";
      return "";
    };
    // Tout ce que l'utilisateur a déjà saisi reste prioritaire : seuls les champs vides sont remplis.
    setFormation((f) => ({
      ...f,
      intitule: f.intitule.trim() || sample.intitule || "",
      codeRNCP: (f.codeRNCP || "").trim() || sample.codeRNCP || "",
      duree: f.duree.trim() || sample.duree || "",
      modalites: f.modalites.trim() || normModalite(sample.modalites),
      tarif: f.tarif.trim() || sample.tarif || "",
      formateur: f.formateur.trim() || sample.formateur || "",
      nombreParticipants: f.nombreParticipants.trim() || sample.nombreParticipants || "",
      objectifs: f.objectifs.trim() || sample.objectifs || "",
      programme: f.programme.trim() || sample.programme || "",
      prerequis: f.prerequis.trim() || sample.prerequis || "",
      methodesEvaluation: f.methodesEvaluation.trim() || sample.methodesEvaluation || "",
      moyensPedagogiques: f.moyensPedagogiques.trim() || sample.moyensPedagogiques || "",
      publicVise: f.publicVise.trim() || sample.publicVise || "",
      delaiAcces: f.delaiAcces.trim() || sample.delaiAcces || "",
    }));
    setShowContenu(true);
    toast.success(`Formation d'exemple chargée : ${sample.intitule}. Vérifiez les dates, le lieu et le tarif.`);
  };


  /* ---------- Pappers ---------- */
  const importPappers = async () => {
    if (!pappersUrl.trim()) { toast.error("Collez un lien Pappers de l'entreprise"); return; }
    setPappersLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("pappers-scrape", { body: { url: pappersUrl.trim() } });
      if (error || !result?.success) throw new Error(result?.error || error?.message || "Erreur inconnue");
      const d = result.data;
      setOrg({
        nom: d.nom || organisme.nom, siret: d.siret || organisme.siret, adresse: d.adresse || organisme.adresse,
        codePostal: d.codePostal || organisme.codePostal, ville: d.ville || organisme.ville,
        dirigeant: d.dirigeant || organisme.dirigeant, nda: d.nda || organisme.nda, siteWeb: d.siteWeb || organisme.siteWeb,
      });
      toast.success("Informations de l'organisme récupérées");
    } catch (e: any) {
      toast.error("Import impossible : " + (e?.message || "erreur inconnue"));
    } finally { setPappersLoading(false); }
  };

  /* ---------- IA formation ---------- */
  const runAI = async () => {
    const nom = formation.intitule.trim();
    if (!nom) { toast.error("Renseignez d'abord l'intitulé de la formation"); return; }
    setAiLoading(true);
    const t = toast.loading("Rédaction du contenu pédagogique… (10–30 s)");
    try {
      const { data, error } = await supabase.functions.invoke("generate-formation-ai", {
        body: { nom, codeRNCP: (formation.codeRNCP || "").trim(), model: "google/gemini-2.5-flash" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const ai = data?.formation as Partial<FormationInfo> | undefined;
      if (!ai) throw new Error("Réponse vide");
      // Seuls les champs pédagogiques sont repris : tout ce qui est saisi est conservé.
      setForm({
        objectifs: ai.objectifs || formation.objectifs,
        programme: ai.programme || formation.programme,
        prerequis: ai.prerequis || formation.prerequis,
        methodesEvaluation: ai.methodesEvaluation || formation.methodesEvaluation,
        moyensPedagogiques: ai.moyensPedagogiques || formation.moyensPedagogiques,
        publicVise: ai.publicVise || formation.publicVise,
        delaiAcces: ai.delaiAcces || formation.delaiAcces,
      });
      setShowContenu(true);
      toast.success("Contenu pédagogique complété — relisez-le avant de générer", { id: t });
    } catch (e: any) {
      toast.error("Complétion impossible : " + (e?.message || "erreur inconnue"), { id: t });
    } finally { setAiLoading(false); }
  };

  const onIntituleBlur = () => {
    if (aiTriggered.current || aiLoading) return;
    if (!formation.intitule.trim()) return;
    if (formation.objectifs.trim() || formation.programme.trim()) return;
    aiTriggered.current = true;
    void runAI();
  };

  /* ---------- Imports stagiaires ---------- */
  const importDocument = async (files: FileList | null) => {
    if (!files?.length) return;
    setImporting(true);
    try {
      const ajouts: StagiaireInfo[] = [];
      for (const file of Array.from(files)) {
        const { stagiaires: extraits, entreprise } = await extractMultipleStagiairesFromFile(file);
        for (const ex of extraits) {
          ajouts.push(extractionToStagiaire(ex, { ...emptyStagiaire, entreprise: entreprise || "" }));
        }
      }
      if (ajouts.length === 0) { toast.error("Aucun stagiaire détecté dans ce document"); return; }
      setStagiaires((prev) => {
        const base = prev.filter((s) => s.nom?.trim() || s.prenom?.trim());
        return [...base, ...ajouts];
      });
      toast.success(`${ajouts.length} stagiaire(s) importé(s)`);
    } catch (e: any) {
      toast.error("Lecture impossible : " + (e?.message || "erreur inconnue"));
    } finally {
      setImporting(false);
      if (docFileRef.current) docFileRef.current.value = "";
    }
  };

  const importEdof = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const buf = await file.arrayBuffer();
      const sessions = parseEdofXlsx(buf);
      if (!sessions.length) { toast.error("Aucune session trouvée dans ce fichier EDOF"); return; }
      const s = sessions[0];
      setFormation((f) => ({ ...f, ...Object.fromEntries(Object.entries(s.formation).filter(([, v]) => v && String(v).trim())) }));
      if (s.stagiaires.length) setStagiaires(s.stagiaires);
      toast.success(`Session importée : ${s.stagiaires.length} stagiaire(s)`);
    } catch (e: any) {
      toast.error("Lecture EDOF impossible : " + (e?.message || "erreur inconnue"));
    } finally {
      setImporting(false);
      if (edofFileRef.current) edofFileRef.current.value = "";
    }
  };

  /* ---------- Import CERFA existant (par stagiaire) ---------- */
  const importCerfa = async (idx: number, file: File | undefined) => {
    if (!file) return;
    setCerfaLoadingIdx(idx);
    const t = toast.loading("Lecture du CERFA…");
    try {
      const dataUrl = await fileToDataUrl(file);
      const { data, error } = await supabase.functions.invoke("extract-cerfa", { body: { fileDataUrl: dataUrl } });
      if (error) {
        const msg = String(error.message || "");
        if (msg.includes("429")) throw new Error("Trop de demandes ou crédits épuisés — réessayez dans quelques minutes");
        throw error;
      }
      if (!data || data.error) throw new Error(data?.error || "Extraction vide");
      const patch: Partial<StagiaireInfo> = {};
      for (const [k, v] of Object.entries(data)) {
        if (typeof v === "string" && v.trim()) {
          const current = (stagiaires[idx] as any)?.[k];
          if (!current || !String(current).trim()) (patch as any)[k] = v.trim();
        }
      }
      if (patch.nom) patch.nom = patch.nom.toUpperCase();
      setStag(idx, patch);
      toast.success("CERFA lu — champs complétés", { id: t });
    } catch (e: any) {
      toast.error("Lecture du CERFA impossible : " + (e?.message || "erreur inconnue"), { id: t });
    } finally { setCerfaLoadingIdx(null); }
  };

  /* ---------- Documents effectifs ---------- */
  const stagiairesValides = useMemo(
    () => stagiaires.filter((s) => s.prenom?.trim() && s.nom?.trim()),
    [stagiaires],
  );

  const conventionPossible = (s: StagiaireInfo) => Boolean(s.entreprise?.trim());

  type PlannedDoc = { doc: PackDoc; stagiaire: StagiaireInfo | null; stagiaireIdx: number | null };

  const planned: PlannedDoc[] = useMemo(() => {
    const out: PlannedDoc[] = [];
    for (const doc of PACK_DOCS) {
      if (!selected[doc.key]) continue;
      if (doc.key === "convention" && !stagiaires.some((s) => s.prenom?.trim() && s.nom?.trim() && conventionPossible(s))) continue;
      if (!doc.perStagiaire) { out.push({ doc, stagiaire: null, stagiaireIdx: null }); continue; }
      stagiaires.forEach((s, i) => {
        if (!s.prenom?.trim() || !s.nom?.trim()) return;
        if (doc.key === "convention" && !conventionPossible(s)) return;
        out.push({ doc, stagiaire: s, stagiaireIdx: i });
      });
    }
    return out;
  }, [selected, stagiaires]);

  const estimationSec = useMemo(
    () => planned.reduce((sum, p) => sum + (p.doc.key === "cerfa" ? 3 : exportFormat === "pdf" ? 6 : 1), 0),
    [planned, exportFormat],
  );

  /* ---------- Contrôles bloquants ---------- */
  const erreurs = useMemo(() => {
    const e: string[] = [];
    const reqOrg: [keyof OrganismeInfo, string][] = [
      ["nom", "nom de l'organisme"], ["siret", "SIRET"], ["nda", "NDA"], ["adresse", "adresse"],
      ["codePostal", "code postal"], ["ville", "ville"], ["dirigeant", "dirigeant"],
    ];
    for (const [k, label] of reqOrg) if (!String(organisme[k] ?? "").trim()) e.push(`Organisme : ${label}`);

    const reqForm: [keyof FormationInfo, string][] = [
      ["intitule", "intitulé"], ["duree", "durée"], ["dateDebut", "date de début"], ["dateFin", "date de fin"],
      ["tarif", "tarif"], ["modalites", "modalité"], ["objectifs", "objectifs"], ["programme", "programme"],
    ];
    for (const [k, label] of reqForm) if (!String(formation[k] ?? "").trim()) e.push(`Formation : ${label}`);
    const reqPeda: [keyof FormationInfo, string][] = [
      ["prerequis", "prérequis"], ["methodesEvaluation", "méthodes d'évaluation"],
      ["moyensPedagogiques", "moyens pédagogiques"], ["publicVise", "public visé"], ["delaiAcces", "délai d'accès"],
    ];
    for (const [k, label] of reqPeda)
      if (!String(formation[k] ?? "").trim())
        e.push(`Formation : ${label} (cliquez sur « Compléter le contenu pédagogique avec l'IA »)`);
    if (formation.dateDebut && formation.dateFin && formation.dateDebut > formation.dateFin)
      e.push("Formation : la date de début doit précéder la date de fin");

    if (stagiairesValides.length === 0) e.push("Au moins un stagiaire avec prénom et nom");


    if (selected.cerfa) {
      stagiairesValides.forEach((s) => {
        const label = `${s.prenom} ${s.nom}`;
        if (!s.dateNaissance?.trim()) e.push(`CERFA — ${label} : date de naissance`);
        if (!s.entreprise?.trim()) e.push(`CERFA — ${label} : entreprise`);
        if (!s.siretEntreprise?.trim()) e.push(`CERFA — ${label} : SIRET entreprise`);
      });
    }
    return e;
  }, [organisme, formation, stagiairesValides, selected]);

  /* ---------- Aperçu ---------- */
  const openPreview = async (doc: PackDoc, stagiaireIdx: number | null) => {
    if (previewBlobUrl) { URL.revokeObjectURL(previewBlobUrl); setPreviewBlobUrl(null); }
    setPreviewHtml(null);
    setPreviewTitle(doc.label);
    setPreviewOpen(true);
    setPreviewLoading(true);
    try {
      const safeFormation = buildFormationSafe(formation, organisme, stagiairesValides);
      if (doc.key === "cerfa") {
        const s = stagiaires[stagiaireIdx ?? 0];
        const blob = await genCerfaApprentissagePdf(organisme, safeFormation, s);
        setPreviewBlobUrl(URL.createObjectURL(blob));
      } else {
        const params = { ...(doc.params || {}), ...(stagiaireIdx !== null ? { stagiaireIdx } : {}) };
        setPreviewHtml(generateDocumentById(doc.key, doc.template, params, organisme, safeFormation, stagiaires));
      }
    } catch (e: any) {
      toast.error("Aperçu impossible : " + (e?.message || "erreur inconnue"));
      setPreviewOpen(false);
    } finally { setPreviewLoading(false); }
  };

  /* ---------- Téléchargement d'un document seul ---------- */
  const downloadDoc = async (doc: PackDoc) => {
    const items = planned.filter((p) => p.doc.key === doc.key);
    const cible = items.length > 0
      ? items
      : doc.perStagiaire
        ? stagiairesValides.map((s) => ({ doc, stagiaire: s, stagiaireIdx: stagiaires.indexOf(s) }))
        : [{ doc, stagiaire: null as StagiaireInfo | null, stagiaireIdx: null as number | null }];
    if (doc.perStagiaire && cible.length === 0) { toast.error("Ajoutez d'abord un stagiaire"); return; }

    setDownloadingKey(doc.key);
    const t = toast.loading(`Préparation : ${doc.label}…`);
    try {
      const { saveAs } = await import("file-saver");
      const safeFormation = buildFormationSafe(formation, organisme, stagiairesValides);
      for (const { stagiaire, stagiaireIdx } of cible) {
        let blob: Blob;
        let ext: string;
        if (doc.key === "cerfa") {
          blob = await genCerfaApprentissagePdf(organisme, safeFormation, stagiaire!);
          ext = ".pdf";
        } else {
          const params = { ...(doc.params || {}), ...(stagiaireIdx !== null ? { stagiaireIdx } : {}) };
          const content = generateDocumentById(doc.key, doc.template, params, organisme, safeFormation, stagiaires);
          if (exportFormat === "pdf") { blob = await htmlToPdfBlob(content, { scale: 1.35, imageQuality: 0.84, pageYieldMs: 8 }); ext = ".pdf"; }
          else { blob = await htmlToWordBlob(content); ext = blob.type.includes("officedocument") ? ".docx" : ".doc"; }
        }
        saveAs(blob, buildFileNameStatic(doc, stagiaire ?? null, ext, organisme));
        await yieldToBrowser(16);
      }
      toast.success(`${cible.length} fichier(s) téléchargé(s)`, { id: t });
    } catch (e: any) {
      toast.error("Téléchargement impossible : " + (e?.message || "erreur inconnue"), { id: t });
    } finally {
      setDownloadingKey(null);
    }
  };

  /* ---------- Génération ---------- */


  const handleGenerate = () => {
    if (erreurs.length > 0) {
      toast.error(
        `Génération bloquée — à compléter : ${erreurs.slice(0, 8).join(" · ")}${erreurs.length > 8 ? ` · …et ${erreurs.length - 8} autre(s)` : ""}`,
        { duration: 14000 },
      );
      return;
    }
    if (planned.length === 0) { toast.error("Aucun document sélectionné"); return; }

    const snapOrg = { ...organisme };
    const snapStag = stagiaires.map((s) => ({ ...s }));
    const snapForm = buildFormationSafe(formation, snapOrg, snapStag.filter((s) => s.prenom?.trim() && s.nom?.trim()));
    const snapPlan = planned.map((p) => ({ ...p }));
    const snapFormat = exportFormat;
    const snapZip = zipMode === "zip";
    const zipName = buildGenericFileName("PACK_RAPIDE_QUALIOPI", snapOrg.nom, snapOrg.version, snapOrg.dateMaj, ".zip");

    runJob({
      label: "Pack rapide Qualiopi",
      fileName: snapZip ? zipName : undefined,
      autoDownload: snapZip,
      run: async (reporter) => {
        const { saveAs } = await import("file-saver");
        const zip = new JSZip();
        const rootFolder = `PACK_RAPIDE_${(snapOrg.nom || "ORGANISME").toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_|_$/g, "")}`;
        const failures: { name: string; reason: string }[] = [];
        const pdfOptions = { scale: 1.35, imageQuality: 0.84, pageYieldMs: 8 };

        for (let i = 0; i < snapPlan.length; i++) {
          const { doc, stagiaire, stagiaireIdx } = snapPlan[i];
          const label = stagiaire ? `${doc.label} — ${stagiaire.prenom} ${stagiaire.nom}` : doc.label;
          reporter.setProgress(Math.round((i / snapPlan.length) * 92));
          reporter.setMessage(`${i + 1}/${snapPlan.length} — ${doc.label}`);
          try {
            let blob: Blob;
            let ext: string;
            if (doc.key === "cerfa") {
              blob = await genCerfaApprentissagePdf(snapOrg, snapForm, stagiaire!);
              ext = ".pdf";
            } else {
              const params = { ...(doc.params || {}), ...(stagiaireIdx !== null ? { stagiaireIdx } : {}) };
              const content = generateDocumentById(doc.key, doc.template, params, snapOrg, snapForm, snapStag);
              if (snapFormat === "pdf") { blob = await htmlToPdfBlob(content, pdfOptions); ext = ".pdf"; }
              else { blob = await htmlToWordBlob(content); ext = blob.type.includes("officedocument") ? ".docx" : ".doc"; }
            }
            const fileName = buildFileNameStatic(doc, stagiaire, ext, snapOrg);
            const path = stagiaire
              ? `${rootFolder}/${doc.folder}/${buildStagiaireFolderName(stagiaire)}/${fileName}`
              : `${rootFolder}/${doc.folder}/${fileName}`;
            if (snapZip) zip.file(path, blob);
            else saveAs(blob, fileName);
          } catch (err) {
            console.error("[PACK RAPIDE]", label, err);
            failures.push({ name: label, reason: err instanceof Error ? err.message : String(err) });
          }
          await yieldToBrowser(snapFormat === "pdf" ? 16 : 0);
        }

        if (failures.length > 0) {
          const lines = [
            "RAPPORT DES ECHECS DE GENERATION",
            `Total : ${failures.length} document(s) en echec sur ${snapPlan.length}`,
            "",
            ...failures.map((f, i) => `${i + 1}. ${f.name}\n   -> ${f.reason}`),
          ];
          if (snapZip) zip.file(`${rootFolder}/_ECHECS_GENERATION.txt`, lines.join("\n"));
          toast.warning(`${failures.length} document(s) en échec.`);
        }

        if (!snapZip) { reporter.setProgress(100); reporter.setMessage("Terminé"); return; }
        reporter.setMessage("Compression du ZIP…");
        const blob = await zip.generateAsync({ type: "blob" }, (meta) => reporter.setProgress(92 + meta.percent * 0.08));
        return blob;
      },
    });
    void saveHistorique(snapOrg, snapForm, snapStag);
    toast.success("Génération lancée — suivez la progression en bas à droite");
  };

  /* ---------- Enregistrement automatique dans l'historique ---------- */
  const saveHistorique = async (o: OrganismeInfo, f: FormationInfo, st: StagiaireInfo[]) => {
    if (!userId) return;
    const name = `${o.nom} – ${f.intitule || "Sans formation"}`;
    try {
      const { data: existing } = await supabase
        .from("saved_dossiers")
        .select("id")
        .eq("user_id", userId)
        .eq("name", name)
        .limit(1);
      const payload = { organisme: o as any, formation: f as any, stagiaires: st as any };
      if (existing && existing.length > 0) {
        await supabase
          .from("saved_dossiers")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", (existing[0] as any).id);
      } else {
        await supabase.from("saved_dossiers").insert({ user_id: userId, name, ...payload });
      }
      setHistoryKey((k) => k + 1);
      toast.success("Dossier enregistré dans l'historique");
    } catch (e) {
      console.error("[HISTORIQUE RAPIDE]", e);
    }
  };

  const cerfaActif = selected.cerfa;
  const orgComplet = (["nom", "siret", "nda", "adresse", "codePostal", "ville", "dirigeant"] as const)
    .every((k) => String(organisme[k] ?? "").trim().length > 0);
  const formComplet = erreurs.filter((e) => e.startsWith("Formation")).length === 0;
  const stagComplet = stagiairesValides.length > 0;

  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-gradient-hero text-primary-foreground shadow-card">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-10 h-10 shrink-0 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-5 h-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-bold text-lg leading-tight">Génération rapide</span>
              <span className="block text-xs text-primary-foreground/80 truncate">Pack de documents essentiels en moins de 2 minutes</span>
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium bg-white/15 rounded-full px-3 py-1.5">
              <FileText className="w-3.5 h-3.5" /> {planned.length} document(s)
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium bg-white/15 rounded-full px-3 py-1.5">
              ≈ {estimationSec < 60 ? `${estimationSec} s` : `${Math.round(estimationSec / 60)} min`}
            </span>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1 text-primary-foreground hover:bg-white/15 hover:text-primary-foreground">
              <ChevronLeft className="w-4 h-4" /> Accueil
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5 pb-32">
        {userId && (
          <DossierHistory
            key={historyKey}
            userId={userId}
            organisme={organisme}
            formation={formation}
            stagiaires={stagiaires}
            onLoad={(org, form, stag) => {
              setOrganisme(org);
              setFormation(form);
              setStagiaires(stag.length > 0 ? stag : [{ ...emptyStagiaire }]);
              toast.success("Dossier chargé");
            }}
          />
        )}

        {/* BLOC A — ORGANISME */}
        <Section step="1" icon={<Building2 className="w-5 h-5" />} title="Organisme de formation" subtitle="Les champs marqués * sont obligatoires" done={orgComplet}>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input placeholder="Lien Pappers de l'organisme (optionnel)" value={pappersUrl} onChange={(e) => setPappersUrl(e.target.value)} />
            <Button variant="outline" onClick={importPappers} disabled={pappersLoading} className="gap-2 shrink-0">
              {pappersLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Remplir automatiquement
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Field label="Nom" required value={organisme.nom} onChange={(e) => setOrg({ nom: e.target.value })} />
            <Field label="SIRET" required value={organisme.siret} onChange={(e) => setOrg({ siret: e.target.value })} />
            <Field label="NDA" required value={organisme.nda} onChange={(e) => setOrg({ nda: e.target.value })} />
            <Field label="Adresse" required value={organisme.adresse} onChange={(e) => setOrg({ adresse: e.target.value })} />
            <Field label="Code postal" required value={organisme.codePostal} onChange={(e) => setOrg({ codePostal: e.target.value })} />
            <Field label="Ville" required value={organisme.ville} onChange={(e) => setOrg({ ville: e.target.value })} />
            <Field label="Dirigeant" required value={organisme.dirigeant} onChange={(e) => setOrg({ dirigeant: e.target.value })} />
            <Field label="Email" type="email" value={organisme.email} onChange={(e) => setOrg({ email: e.target.value })} />
            <Field label="Téléphone" value={organisme.telephone} onChange={(e) => setOrg({ telephone: e.target.value })} />
          </div>

          <Section icon={<FileText className="w-4 h-4" />} title="Champs optionnels" defaultOpen={false}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Responsable pédagogique" value={organisme.responsablePedagogique} onChange={(e) => setOrg({ responsablePedagogique: e.target.value })} />
              <Field label="Référent qualité" value={organisme.referentQualite} onChange={(e) => setOrg({ referentQualite: e.target.value })} />
              <Field label="Référent handicap" value={organisme.referentHandicap} onChange={(e) => setOrg({ referentHandicap: e.target.value })} />
              <Field label="Pôle administratif" value={organisme.poleAdministratif} onChange={(e) => setOrg({ poleAdministratif: e.target.value })} />
              <Field label="Site web" value={organisme.siteWeb} onChange={(e) => setOrg({ siteWeb: e.target.value })} />
            </div>
            <LogoSignatureUpload
              logoUrl={(organisme as any).logoUrl}
              signatureUrl={organisme.signatureUrl}
              tamponUrl={organisme.tamponUrl}
              onLogoChange={(url) => setOrg({ logoUrl: url } as Partial<OrganismeInfo>)}
              onSignatureChange={(url) => setOrg({ signatureUrl: url } as Partial<OrganismeInfo>)}
              onTamponChange={(url) => setOrg({ tamponUrl: url } as Partial<OrganismeInfo>)}
              organismePrefill={{ nom: organisme.nom, siret: organisme.siret, ville: organisme.ville, codePostal: organisme.codePostal, nda: organisme.nda }}
            />
          </Section>
        </Section>

        {/* BLOC B — FORMATION */}
        <Section step="2" icon={<GraduationCap className="w-5 h-5" />} title="Formation" subtitle="Le contenu pédagogique peut être rédigé automatiquement" done={formComplet}>
          <div className="space-y-1">
            <Label className="text-xs">Charger une formation d'exemple (remplit uniquement les champs vides)</Label>
            <Select value={sampleFormationKey} onValueChange={(v) => { setSampleFormationKey(v); loadSampleFormation(v); }}>
              <SelectTrigger><SelectValue placeholder="Choisir une formation d'exemple…" /></SelectTrigger>
              <SelectContent>
                {SAMPLE_FORMATIONS.map((sf, i) => (
                  <SelectItem key={i} value={String(i)}>{sf.intitule}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <Field label="Intitulé" required value={formation.intitule} onChange={(e) => setForm({ intitule: e.target.value })} onBlur={onIntituleBlur} />
            </div>
            <Field label="Code RNCP / RS" value={formation.codeRNCP || ""} onChange={(e) => setForm({ codeRNCP: e.target.value })} placeholder="RNCP36223 (optionnel)" />
            <Field label="Durée" required value={formation.duree} onChange={(e) => setForm({ duree: e.target.value })} placeholder="35 heures (5 jours)" />
            <Field label="Date de début" required type="date" value={formation.dateDebut} onChange={(e) => setForm({ dateDebut: e.target.value })} />
            <Field label="Date de fin" required type="date" value={formation.dateFin} onChange={(e) => setForm({ dateFin: e.target.value })} />
            <div className="space-y-1">
              <Label className="text-xs">Modalité<span className="text-destructive"> *</span></Label>
              <Select value={formation.modalites} onValueChange={(v) => setForm({ modalites: v })}>
                <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Présentiel">Présentiel</SelectItem>
                  <SelectItem value="Distanciel">Distanciel</SelectItem>
                  <SelectItem value="Mixte (présentiel et distanciel)">Mixte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Field label="Lieu" value={formation.lieu} onChange={(e) => setForm({ lieu: e.target.value })} />
            <Field label="Tarif" required value={formation.tarif} onChange={(e) => setForm({ tarif: e.target.value })} placeholder="2 100 € TTC" />
            <Field label="Formateur" value={formation.formateur} onChange={(e) => setForm({ formateur: e.target.value })} />
            <Field label="Nombre de participants" value={formation.nombreParticipants} onChange={(e) => setForm({ nombreParticipants: e.target.value })} />
          </div>

          <p className="text-xs text-muted-foreground flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
            <span>Un champ pédagogique laissé vide serait remplacé par le contenu de la formation d'exemple : complétez-les tous avant de générer.</span>
          </p>
          <button
            type="button"
            onClick={runAI}
            disabled={aiLoading}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-dashed border-primary/40 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent hover:from-primary/15 hover:via-primary/10 transition-colors text-left disabled:opacity-60 w-full"
          >
            <span className="w-9 h-9 shrink-0 rounded-xl bg-gradient-hero text-primary-foreground flex items-center justify-center shadow-card">
              {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">Compléter le contenu pédagogique avec l'IA</span>
              <span className="block text-xs text-muted-foreground">Rédige objectifs, programme, prérequis et méthodes d'évaluation (10–30 s)</span>
            </span>
          </button>

          <Section icon={<FileText className="w-4 h-4" />} title="Contenu pédagogique (relecture)" open={showContenu} onOpenChange={setShowContenu}>
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Objectifs<span className="text-destructive"> *</span></Label>
                <Textarea rows={4} value={formation.objectifs} onChange={(e) => setForm({ objectifs: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Programme<span className="text-destructive"> *</span></Label>
                <Textarea rows={6} value={formation.programme} onChange={(e) => setForm({ programme: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Prérequis</Label>
                <Textarea rows={3} value={formation.prerequis} onChange={(e) => setForm({ prerequis: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Méthodes d'évaluation</Label>
                <Textarea rows={3} value={formation.methodesEvaluation} onChange={(e) => setForm({ methodesEvaluation: e.target.value })} />
              </div>
            </div>
          </Section>
        </Section>

        {/* BLOC C — STAGIAIRES */}
        <Section step="3" icon={<Users className="w-5 h-5" />} title={`Stagiaires (${stagiairesValides.length})`} subtitle="Dates et tarif laissés vides = ceux de la formation" done={stagComplet}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <input ref={docFileRef} type="file" accept=".pdf,.docx,.xlsx,.xls" multiple className="hidden" onChange={(e) => importDocument(e.target.files)} />
            <button
              type="button"
              onClick={() => docFileRef.current?.click()}
              disabled={importing}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors text-left disabled:opacity-60"
            >
              <span className="w-9 h-9 shrink-0 rounded-xl bg-gradient-hero text-primary-foreground flex items-center justify-center shadow-card">
                {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">Importer un document</span>
                <span className="block text-xs text-muted-foreground">PDF, DOCX ou XLSX — plusieurs fichiers possibles</span>
              </span>
            </button>
            <input ref={edofFileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(e) => importEdof(e.target.files)} />
            <button
              type="button"
              onClick={() => edofFileRef.current?.click()}
              disabled={importing}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors text-left disabled:opacity-60"
            >
              <span className="w-9 h-9 shrink-0 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
                <Upload className="w-4 h-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">Importer un export EDOF (.xlsx)</span>
                <span className="block text-xs text-muted-foreground">Formation et stagiaires remplis automatiquement</span>
              </span>
            </button>
          </div>

          <div className="space-y-4">
            {stagiaires.map((s, i) => (
              <div key={i} className="rounded-xl border p-3 space-y-3 bg-muted/20 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center text-[11px] font-bold">
                      {(s.prenom?.trim()?.[0] || (i + 1).toString()).toUpperCase()}
                    </span>
                    Stagiaire {i + 1}{s.prenom?.trim() && s.nom?.trim() ? ` — ${s.prenom} ${s.nom}` : ""}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => setStagiaires((l) => l.filter((_, j) => j !== i))} disabled={stagiaires.length === 1}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Civilité</Label>
                    <Select value={s.civilite || ""} onValueChange={(v) => setStag(i, { civilite: v as StagiaireInfo["civilite"] })}>
                      <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M.">M.</SelectItem>
                        <SelectItem value="Mme">Mme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Field label="Prénom" required value={s.prenom} onChange={(e) => setStag(i, { prenom: e.target.value })} />
                  <Field label="Nom" required value={s.nom} onChange={(e) => setStag(i, { nom: e.target.value })} />
                  <Field label="Email" value={s.email} onChange={(e) => setStag(i, { email: e.target.value })} />
                  <div className="space-y-1">
                    <Label className="text-xs">Financeur</Label>
                    <Select value={s.financeur || ""} onValueChange={(v) => setStag(i, { financeur: v })}>
                      <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        {FINANCEURS.map((fin) => <SelectItem key={fin} value={fin}>{fin}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Field label="Date de début" type="date" value={s.dateDebutFormation || ""} onChange={(e) => setStag(i, { dateDebutFormation: e.target.value })} />
                  <Field label="Date de fin" type="date" value={s.dateFinFormation || ""} onChange={(e) => setStag(i, { dateFinFormation: e.target.value })} />
                  <Field label="Tarif individuel" value={s.tarifFormation || ""} onChange={(e) => setStag(i, { tarifFormation: e.target.value })} />
                  <Field label="Entreprise" value={s.entreprise} onChange={(e) => setStag(i, { entreprise: e.target.value })} />
                  <Field label="Responsable entreprise" value={s.responsableEntreprise || ""} onChange={(e) => setStag(i, { responsableEntreprise: e.target.value })} />
                </div>

                {cerfaActif && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-amber-800">Apprentissage — CERFA 10103*14</span>
                      <label className="text-xs cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-amber-300 bg-white hover:bg-amber-100">
                        {cerfaLoadingIdx === i ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                        Déposer un CERFA existant (PDF)
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => importCerfa(i, e.target.files?.[0])} />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Field label="Date de naissance" required type="date" value={s.dateNaissance} onChange={(e) => setStag(i, { dateNaissance: e.target.value })} />
                      <Field label="NIR" value={s.nir || ""} onChange={(e) => setStag(i, { nir: e.target.value })} />
                      <Field label="Nationalité" value={s.nationalite || ""} onChange={(e) => setStag(i, { nationalite: e.target.value })} />
                      <Field label="Adresse" value={s.adresse || ""} onChange={(e) => setStag(i, { adresse: e.target.value })} />
                      <Field label="Code postal" value={s.codePostal || ""} onChange={(e) => setStag(i, { codePostal: e.target.value })} />
                      <Field label="Commune" value={s.commune || ""} onChange={(e) => setStag(i, { commune: e.target.value })} />
                      <Field label="Département de naissance" value={s.departementNaissance || ""} onChange={(e) => setStag(i, { departementNaissance: e.target.value })} />
                      <Field label="Commune de naissance" value={s.communeNaissance || ""} onChange={(e) => setStag(i, { communeNaissance: e.target.value })} />
                      <Field label="Dernier diplôme" value={s.diplome || ""} onChange={(e) => setStag(i, { diplome: e.target.value })} />
                      <Field label="Entreprise" required value={s.entreprise} onChange={(e) => setStag(i, { entreprise: e.target.value })} />
                      <Field label="SIRET entreprise" required value={s.siretEntreprise || ""} onChange={(e) => setStag(i, { siretEntreprise: e.target.value })} />
                      <Field label="Adresse entreprise" value={s.adresseEntreprise || ""} onChange={(e) => setStag(i, { adresseEntreprise: e.target.value })} />
                      <Field label="Maître d'apprentissage" value={s.responsableEntreprise || ""} onChange={(e) => setStag(i, { responsableEntreprise: e.target.value })} />
                      <Field label="Naissance du maître d'apprentissage" type="date" value={s.dateNaissanceResponsable || ""} onChange={(e) => setStag(i, { dateNaissanceResponsable: e.target.value })} />
                      <Field label="Email du maître d'apprentissage" value={s.emailResponsable || ""} onChange={(e) => setStag(i, { emailResponsable: e.target.value })} />
                      <Field label="Poste occupé" value={s.poste} onChange={(e) => setStag(i, { poste: e.target.value })} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setStagiaires((l) => [...l, { ...emptyStagiaire }])}
            className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-dashed border-muted-foreground/30 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <Plus className="w-4 h-4" /> Ajouter un stagiaire
          </button>
        </Section>

        {/* DOCUMENTS DU PACK */}
        <Section step="4" icon={<FileText className="w-5 h-5" />} title="Documents du pack" subtitle={`${planned.length} document(s) · estimation ≈ ${estimationSec < 60 ? `${estimationSec} s` : `${Math.round(estimationSec / 60)} min`}`} done={erreurs.length === 0}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
            {PACK_DOCS.map((doc, docIdx) => {
              const conventionGrisee = doc.key === "convention" && stagiairesValides.length > 0 && stagiairesValides.every((s) => !conventionPossible(s));
              const count = planned.filter((p) => p.doc.key === doc.key).length;
              const firstIdx = planned.find((p) => p.doc.key === doc.key)?.stagiaireIdx ?? null;
              const actif = !!selected[doc.key] && !conventionGrisee;
              return (
                <div
                  key={doc.key}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("[data-no-check]")) return;
                    if (!conventionGrisee) setSelected((p) => ({ ...p, [doc.key]: !p[doc.key] }));
                  }}
                  className={`group flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    conventionGrisee
                      ? "opacity-60 cursor-not-allowed"
                      : actif
                        ? "border-primary/50 bg-primary/5 shadow-card ring-1 ring-primary/20"
                        : "border-border hover:border-primary/30 hover:bg-muted/30 hover:shadow-card"
                  }`}
                >
                  <span
                    className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
                      actif
                        ? "bg-gradient-hero text-primary-foreground shadow-card"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    }`}
                  >
                    {docIdx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold truncate">{doc.label}</p>
                      {actif && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/10 border border-primary/25 px-1.5 py-0.5 rounded-full shrink-0">
                          {doc.perStagiaire ? `×${count}` : "×1"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {conventionGrisee
                        ? "Sans entreprise, il s'agit d'un contrat bilatéral et non d'une convention."
                        : doc.perStagiaire ? `1 par stagiaire${actif ? ` — ${count} document(s)` : ""}` : "1 exemplaire"}
                    </p>
                  </div>
                  <Button
                    data-no-check
                    variant="outline"
                    size="sm"
                    onClick={() => openPreview(doc, doc.perStagiaire ? firstIdx ?? 0 : null)}
                    title="Aperçu"
                    aria-label={`Aperçu : ${doc.label}`}
                    className="h-8 w-8 p-0 shrink-0 rounded-lg"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    data-no-check
                    variant="outline"
                    size="sm"
                    disabled={downloadingKey !== null || conventionGrisee}
                    onClick={() => downloadDoc(doc)}
                    title={`Télécharger ${doc.perStagiaire ? "(1 fichier par stagiaire)" : ""}`}
                    aria-label={`Télécharger : ${doc.label}`}
                    className="h-8 w-8 p-0 shrink-0 rounded-lg"
                  >
                    {downloadingKey === doc.key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  </Button>
                  <Checkbox
                    checked={!!selected[doc.key]}
                    disabled={conventionGrisee}
                    onCheckedChange={(v) => setSelected((p) => ({ ...p, [doc.key]: v === true }))}
                    className="shrink-0"
                  />
                </div>
              );
            })}
          </div>

          {estimationSec > 120 && (
            <div className="flex gap-2 p-3 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>La génération dépassera 2 minutes. Passez en format Word ou réduisez le nombre de stagiaires pour aller plus vite.</p>
            </div>
          )}
        </Section>

        {/* CONFORMITÉ / ERREURS */}
        {erreurs.length > 0 ? (
          <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4">
            <p className="font-semibold text-sm text-destructive flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> À compléter avant de générer</p>
            <ul className="mt-2 text-xs text-destructive/90 list-disc pl-5 space-y-0.5">
              {erreurs.slice(0, 12).map((e, i) => <li key={i}>{e}</li>)}
              {erreurs.length > 12 && <li>…et {erreurs.length - 12} autre(s)</li>}
            </ul>
          </div>
        ) : (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900">
            <p className="font-semibold text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Conformité</p>
            <p className="text-xs mt-1">Chaque document est daté, versionné et porte le pied de page légal : nom de l'organisme, SIRET, NDA, version et date de mise à jour.</p>
          </div>
        )}
      </main>

      {/* BARRE DE GÉNÉRATION */}
      <div className="fixed bottom-0 inset-x-0 border-t bg-card/95 backdrop-blur-sm z-20 shadow-card">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Label className="text-xs">Format</Label>
            <Select value={exportFormat} onValueChange={(v) => setExportFormat(v as "pdf" | "doc")}>
              <SelectTrigger className="w-[110px] h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="doc">Word</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs">Livraison</Label>
            <Select value={zipMode} onValueChange={(v) => setZipMode(v as "zip" | "files")}>
              <SelectTrigger className="w-[160px] h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="zip">ZIP unique</SelectItem>
                <SelectItem value="files">Fichiers séparés</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-xs text-muted-foreground">{planned.length} document(s) · ≈ {estimationSec} s</span>
          <Button onClick={handleGenerate} className="ml-auto gap-2 bg-gradient-hero border-0 text-primary-foreground">
            <Zap className="w-4 h-4" /> Générer le pack rapide
          </Button>
        </div>
      </div>

      {/* APERÇU */}
      <Dialog open={previewOpen} onOpenChange={(o) => { setPreviewOpen(o); if (!o && previewBlobUrl) { URL.revokeObjectURL(previewBlobUrl); setPreviewBlobUrl(null); } }}>
        <DialogContent className="max-w-4xl h-[85vh] flex flex-col">
          <DialogHeader><DialogTitle className="text-base">{previewTitle}</DialogTitle></DialogHeader>
          <div className="flex-1 min-h-0 border rounded-lg overflow-hidden bg-white">
            {previewLoading ? (
              <div className="h-full flex items-center justify-center text-muted-foreground gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Génération de l'aperçu…</div>
            ) : previewBlobUrl ? (
              <iframe src={previewBlobUrl} title="Aperçu" className="w-full h-full" />
            ) : previewHtml ? (
              <iframe srcDoc={previewHtml} title="Aperçu" className="w-full h-full" />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

/** Nom de fichier normalisé (utilisable depuis la closure du job). */
function buildFileNameStatic(doc: PackDoc, stagiaire: StagiaireInfo | null, ext: string, org: OrganismeInfo): string {
  const entry: DocEntry = { id: doc.key, nom: doc.label, critere: 0, indicateur: 0, template: doc.template };
  return buildDocumentFileName(entry, org.nom, org.version, org.dateMaj, ext, stagiaire);
}

export default GenerationRapide;
