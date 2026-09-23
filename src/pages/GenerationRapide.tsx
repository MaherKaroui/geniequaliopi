import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { toast } from "sonner";
import {
  Zap, ChevronLeft, ChevronDown, ChevronRight, Plus, Trash2, Upload, Eye,
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

/* ------------------------------------------------------------------ */
/* Bloc repliable                                                      */
/* ------------------------------------------------------------------ */

const Section = ({ icon, title, subtitle, children, defaultOpen = true }: {
  icon: React.ReactNode; title: string; subtitle?: string; children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-card rounded-2xl border shadow-card overflow-hidden">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/40 transition-colors">
        <span className="text-primary">{icon}</span>
        <span className="flex-1">
          <span className="block font-semibold">{title}</span>
          {subtitle && <span className="block text-xs text-muted-foreground">{subtitle}</span>}
        </span>
        {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
};

const Field = ({ label, required, ...props }: { label: string; required?: boolean } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-1">
    <Label className="text-xs">{label}{required && <span className="text-destructive"> *</span>}</Label>
    <Input {...props} />
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

  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(PACK_DOCS.map((d) => [d.key, d.key !== "cerfa"])),
  );
  const [exportFormat, setExportFormat] = useState<"pdf" | "doc">("pdf");
  const [zipMode, setZipMode] = useState<"zip" | "files">("zip");

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
    if (formation.dateDebut && formation.dateFin && formation.dateDebut > formation.dateFin)
      e.push("Formation : la date de début doit précéder la date de fin");

    if (stagiairesValides.length === 0) e.push("Au moins un stagiaire avec prénom et nom");

    if (selected.convention) {
      const sansEntreprise = stagiairesValides.filter((s) => !conventionPossible(s));
      if (sansEntreprise.length === stagiairesValides.length && stagiairesValides.length > 0)
        e.push("Convention cochée : aucun stagiaire n'a d'entreprise renseignée");
    }

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
      if (doc.key === "cerfa") {
        const s = stagiaires[stagiaireIdx ?? 0];
        const blob = await genCerfaApprentissagePdf(organisme, formation, s);
        setPreviewBlobUrl(URL.createObjectURL(blob));
      } else {
        const params = { ...(doc.params || {}), ...(stagiaireIdx !== null ? { stagiaireIdx } : {}) };
        setPreviewHtml(generateDocumentById(doc.key, doc.template, params, organisme, formation, stagiaires));
      }
    } catch (e: any) {
      toast.error("Aperçu impossible : " + (e?.message || "erreur inconnue"));
      setPreviewOpen(false);
    } finally { setPreviewLoading(false); }
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
    const snapForm = { ...formation };
    const snapStag = stagiaires.map((s) => ({ ...s }));
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
              else { blob = await htmlToWordBlob(content); ext = ".doc"; }
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
    toast.success("Génération lancée — suivez la progression en bas à droite");
  };

  const cerfaActif = selected.cerfa;

  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-semibold">Génération rapide</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">— pack de documents essentiels en moins de 2 minutes</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1">
            <ChevronLeft className="w-4 h-4" /> Accueil
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5 pb-32">
        {/* BLOC A — ORGANISME */}
        <Section icon={<Building2 className="w-5 h-5" />} title="Organisme de formation" subtitle="Les champs marqués * sont obligatoires">
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
        <Section icon={<GraduationCap className="w-5 h-5" />} title="Formation" subtitle="Le contenu pédagogique peut être rédigé automatiquement">
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

          <Button variant="outline" onClick={runAI} disabled={aiLoading} className="gap-2">
            {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Compléter le contenu pédagogique avec l'IA
          </Button>

          <Section icon={<FileText className="w-4 h-4" />} title="Contenu pédagogique (relecture)" defaultOpen={showContenu}>
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
        <Section icon={<Users className="w-5 h-5" />} title={`Stagiaires (${stagiairesValides.length})`} subtitle="Dates et tarif laissés vides = ceux de la formation">
          <div className="flex flex-wrap gap-2">
            <input ref={docFileRef} type="file" accept=".pdf,.docx,.xlsx,.xls" multiple className="hidden" onChange={(e) => importDocument(e.target.files)} />
            <Button variant="outline" size="sm" onClick={() => docFileRef.current?.click()} disabled={importing} className="gap-2">
              {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Importer un document
            </Button>
            <input ref={edofFileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(e) => importEdof(e.target.files)} />
            <Button variant="outline" size="sm" onClick={() => edofFileRef.current?.click()} disabled={importing} className="gap-2">
              <Upload className="w-4 h-4" /> Importer un export EDOF (.xlsx)
            </Button>
          </div>

          <div className="space-y-4">
            {stagiaires.map((s, i) => (
              <div key={i} className="rounded-xl border p-3 space-y-3 bg-muted/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">Stagiaire {i + 1}</span>
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

          <Button variant="outline" size="sm" onClick={() => setStagiaires((l) => [...l, { ...emptyStagiaire }])} className="gap-2">
            <Plus className="w-4 h-4" /> Ajouter un stagiaire
          </Button>
        </Section>

        {/* DOCUMENTS DU PACK */}
        <Section icon={<FileText className="w-5 h-5" />} title="Documents du pack" subtitle={`${planned.length} document(s) · estimation ≈ ${estimationSec} s`}>
          <div className="space-y-2">
            {PACK_DOCS.map((doc) => {
              const conventionGrisee = doc.key === "convention" && stagiairesValides.length > 0 && stagiairesValides.every((s) => !conventionPossible(s));
              const count = planned.filter((p) => p.doc.key === doc.key).length;
              const firstIdx = planned.find((p) => p.doc.key === doc.key)?.stagiaireIdx ?? null;
              return (
                <div key={doc.key} className={`flex items-center gap-3 p-3 rounded-lg border ${conventionGrisee ? "opacity-60" : ""}`}>
                  <Checkbox
                    checked={!!selected[doc.key]}
                    disabled={conventionGrisee}
                    onCheckedChange={(v) => setSelected((p) => ({ ...p, [doc.key]: v === true }))}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{doc.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {conventionGrisee
                        ? "Sans entreprise, il s'agit d'un contrat bilatéral et non d'une convention."
                        : doc.perStagiaire ? `1 par stagiaire${selected[doc.key] ? ` — ${count} document(s)` : ""}` : "1 exemplaire"}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => openPreview(doc, doc.perStagiaire ? firstIdx ?? 0 : null)} title="Aperçu">
                    <Eye className="w-4 h-4" />
                  </Button>
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
      <div className="fixed bottom-0 inset-x-0 border-t bg-card/95 backdrop-blur-sm z-20">
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
