import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Home, Truck, ChevronDown, ChevronRight, Upload, CheckCircle2, Circle,
  XCircle, Download, FileText, Loader2, FolderArchive, Eye, Pencil, Save,
  LogIn, LogOut, FolderOpen, Trash2, Plus, Palette,
} from "lucide-react";
import OrganismeForm from "@/components/OrganismeForm";
import FormationForm from "@/components/FormationForm";
import StagiairesForm from "@/components/StagiairesForm";
import DossierOutputSettings from "@/components/DossierOutputSettings";
import {
  OPCO_DOCUMENTS, OPCO_CATEGORIES, type OpcoCategory,
  type OpcoDocumentItem, type OpcoDocState, type OpcoDocStatus,
} from "@/lib/opcoMobilitesCatalog";
import { buildOpcoFileName, buildOpcoZipFolder, buildOpcoRootName, type OpcoNamingContext } from "@/lib/opcoNaming";
import type { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, DocStyleConfig } from "@/types/qualiopi";
import { CRITERES, DEFAULT_DOC_STYLE } from "@/types/qualiopi";
import { generateDocumentById, getOpcoExerciceWeeks } from "@/lib/documentGenerator";
import { setDocStyle as applyDocStyle } from "@/lib/docBuilder";
import { generateAIEvalPack, getCachedPack, clearCachedPack } from "@/lib/aiEvalPack";
import { Sparkles } from "lucide-react";
import { generateExcelCalendrierOPCO, excelToBlob } from "@/lib/xlsxGenerator";
import { exportFormDataToExcel } from "@/lib/exportFormData";
import { mergeOrganisme, mergeStagiaires } from "@/lib/sampleData";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useBackgroundJobs } from "@/lib/backgroundJobs";
import { FACTURES_AKTO_STAGIAIRES, downloadFactureAkto, downloadAllFacturesAktoZip } from "@/lib/opcoFacturesAkto";

const emptyOrganisme: OrganismeInfo = {
  nom: "", siret: "", adresse: "", codePostal: "", ville: "", telephone: "", email: "",
  siteWeb: "", nda: "", dirigeant: "", responsablePedagogique: "", referentHandicap: "",
  referentQualite: "", poleAdministratif: "", relationEntreprises: "", referentMobilite: "",
  domainesFormation: "", typesActions: [],
  certifications: "", outilsUtilises: "",
  version: "1", dateMaj: new Date().toISOString().slice(0, 10),
};

const emptyFormation: FormationInfo = {
  intitule: "", objectifs: "", prerequis: "", duree: "", modalites: "", tarif: "",
  programme: "", methodesEvaluation: "", moyensPedagogiques: "", publicVise: "",
  delaiAcces: "", dateDebut: "", dateFin: "", lieu: "", nombreParticipants: "", formateur: "",
  rythmeAlternance: "",
};

const STATUS_CONFIG: Record<OpcoDocStatus, { label: string; icon: any; className: string }> = {
  pending: { label: "À fournir", icon: Circle, className: "text-muted-foreground" },
  auto: { label: "Auto-généré", icon: CheckCircle2, className: "text-primary" },
  uploaded: { label: "Uploadé", icon: CheckCircle2, className: "text-primary" },
  not_applicable: { label: "Non applicable", icon: XCircle, className: "text-muted-foreground" },
};

type Step = "setup" | "documents";

interface SavedOpcoDossier {
  id: string;
  name: string;
  ref_dossier: string;
  annee_controle: string;
  organisme: OrganismeInfo;
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
  doc_states: Record<string, Pick<OpcoDocState, "code" | "status" | "uploadedFileName" | "note">>;
  updated_at: string;
}

export default function OPCOMobilites() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { runJob, hasActive } = useBackgroundJobs();
  const [step, setStep] = useState<Step>("setup");

  // Restore from session
  const [organisme, setOrganisme] = useState<OrganismeInfo>(() => {
    try { const s = sessionStorage.getItem("opco_org"); return s ? JSON.parse(s) : emptyOrganisme; } catch { return emptyOrganisme; }
  });
  const [formation, setFormation] = useState<FormationInfo>(() => {
    try { const s = sessionStorage.getItem("opco_form"); return s ? JSON.parse(s) : emptyFormation; } catch { return emptyFormation; }
  });
  const [stagiaires, setStagiaires] = useState<StagiaireInfo[]>(() => {
    try { const s = sessionStorage.getItem("opco_stag"); return s ? JSON.parse(s) : []; } catch { return []; }
  });

  // OPCO specific metadata
  const [refDossier, setRefDossier] = useState<string>(() => sessionStorage.getItem("opco_ref") || "");
  const [anneeControle, setAnneeControle] = useState<string>(
    () => sessionStorage.getItem("opco_annee") || String(new Date().getFullYear())
  );

  // Doc states
  const [docStates, setDocStates] = useState<Map<string, OpcoDocState>>(() => {
    const m = new Map<string, OpcoDocState>();
    OPCO_DOCUMENTS.forEach((d) => {
      const status: OpcoDocStatus = d.manualUpload ? "pending" : d.autoTemplates.length > 0 ? "auto" : "pending";
      m.set(d.code, { code: d.code, status });
    });
    return m;
  });

  // Document style (visual theme engine)
  const [docStyle, setDocStyleState] = useState<DocStyleConfig>(() => {
    try { const s = sessionStorage.getItem("opco_style"); return s ? JSON.parse(s) : DEFAULT_DOC_STYLE; }
    catch { return DEFAULT_DOC_STYLE; }
  });
  const handleStyleChange = useCallback((style: DocStyleConfig) => {
    setDocStyleState(style);
    sessionStorage.setItem("opco_style", JSON.stringify(style));
  }, []);
  // Apply theme globally before any generation
  useEffect(() => { applyDocStyle(docStyle); }, [docStyle]);

  const [expandedCats, setExpandedCats] = useState<Set<OpcoCategory>>(
    new Set(Object.keys(OPCO_CATEGORIES) as OpcoCategory[])
  );
  const [generating, setGenerating] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiPackReady, setAiPackReady] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  // Detect cached AI pack on formation change
  useEffect(() => {
    setAiPackReady(!!getCachedPack(formation));
  }, [formation]);

  const handleGenerateAIPack = async () => {
    if (!formation.intitule?.trim()) {
      toast.error("Renseignez d'abord l'intitulé de la formation");
      return;
    }
    setGeneratingAI(true);
    try {
      await generateAIEvalPack(formation, true);
      setAiPackReady(true);
      toast.success("Pack d'évaluation IA généré avec succès — les documents C6 sont maintenant remplis.");
    } catch (e: any) {
      toast.error(e?.message || "Erreur génération IA");
    } finally {
      setGeneratingAI(false);
    }
  };
  const [progressText, setProgressText] = useState("");
  const fileInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  // Persist
  useEffect(() => { sessionStorage.setItem("opco_org", JSON.stringify(organisme)); }, [organisme]);
  useEffect(() => { sessionStorage.setItem("opco_form", JSON.stringify(formation)); }, [formation]);
  useEffect(() => { sessionStorage.setItem("opco_stag", JSON.stringify(stagiaires)); }, [stagiaires]);
  useEffect(() => { sessionStorage.setItem("opco_ref", refDossier); }, [refDossier]);
  useEffect(() => { sessionStorage.setItem("opco_annee", anneeControle); }, [anneeControle]);

  // Preview / edit dialog
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<OpcoDocumentItem | null>(null);
  const [previewTemplateIdx, setPreviewTemplateIdx] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const previewIframeRef = useRef<HTMLIFrameElement>(null);

  // Saved dossiers
  const [dossierName, setDossierName] = useState("");
  const [currentDossierId, setCurrentDossierId] = useState<string | null>(null);
  const [savedList, setSavedList] = useState<SavedOpcoDossier[]>([]);
  const [savingDossier, setSavingDossier] = useState(false);

  const mergedStagiaires = useMemo(
    () => mergeStagiaires(stagiaires).filter((s): s is StagiaireInfo => Boolean(s)),
    [stagiaires]
  );
  const mergedOrganisme = useMemo(() => mergeOrganisme(organisme), [organisme]);
  const criteres: CritereData[] = useMemo(() => CRITERES, []);

  const namingCtx: OpcoNamingContext = useMemo(() => ({
    anneeControle: anneeControle || new Date().getFullYear(),
    etablissement: organisme.nom,
    refDossier,
    dateMaj: organisme.dateMaj,
  }), [anneeControle, organisme.nom, organisme.dateMaj, refDossier]);

  const stats = useMemo(() => {
    let total = 0, auto = 0, uploaded = 0, pending = 0, na = 0;
    docStates.forEach((s) => {
      total++;
      if (s.status === "auto") auto++;
      else if (s.status === "uploaded") uploaded++;
      else if (s.status === "not_applicable") na++;
      else pending++;
    });
    return { total, auto, uploaded, pending, na, done: auto + uploaded + na };
  }, [docStates]);

  const updateDocState = (code: string, update: Partial<OpcoDocState>) => {
    setDocStates((prev) => {
      const next = new Map(prev);
      const current = next.get(code) || { code, status: "pending" as OpcoDocStatus };
      next.set(code, { ...current, ...update });
      return next;
    });
  };

  const handleFileUpload = (code: string, file: File) => {
    updateDocState(code, { status: "uploaded", uploadedFileName: file.name, uploadedFile: file });
    toast.success(`Document ${code} ajouté : ${file.name}`);
  };

  const toggleNA = (code: string) => {
    const current = docStates.get(code);
    if (!current) return;
    const doc = OPCO_DOCUMENTS.find((d) => d.code === code);
    const canAuto = doc && doc.autoTemplates.length > 0 && !doc.manualUpload;
    if (current.status === "not_applicable") {
      updateDocState(code, { status: canAuto ? "auto" : "pending" });
    } else {
      updateDocState(code, { status: "not_applicable", uploadedFile: undefined, uploadedFileName: undefined });
    }
  };

  const toggleCategory = (cat: OpcoCategory) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const validateSetup = (): boolean => {
    if (!organisme.nom?.trim()) { toast.error("Le nom de l'organisme est requis"); return false; }
    if (!formation.intitule?.trim()) { toast.error("L'intitulé de la formation est requis"); return false; }
    if (mergedStagiaires.length === 0) { toast.error("Au moins un apprenti est requis"); return false; }
    return true;
  };

  // ─────────── Génération ───────────
  const generateAutoBlob = async (doc: OpcoDocumentItem, stagiaireIdx?: number): Promise<Blob | null> => {
    if (doc.autoTemplates.length === 0) return null;
    for (const template of doc.autoTemplates) {
      try {
        const params = stagiaireIdx !== undefined ? { stagiaireIdx, fi: 0, forceFilled: true, isCFA: true } : { fi: 0, forceFilled: true, isCFA: true };
        const html = generateDocumentById(`opco_${doc.code}`, template, params, mergedOrganisme, formation, mergedStagiaires);
        if (html) return await htmlToPdfBlob(html);
      } catch (e) {
        console.warn(`Template ${template} failed for ${doc.code}:`, e);
      }
    }
    return null;
  };

  // ─────────── Documents générés UN FICHIER PAR SESSION ───────────
  // Pour B9 (calendrier), C11 (temps connexion), C12 (exercices) :
  // → 1 fichier PDF par session (= groupe de stagiaires partageant les mêmes dates).
  const PER_SESSION_DOCS = new Set(["B9", "C11", "C12"]);

  type SessionGroup = { key: string; debut: string; fin: string; stagiaires: StagiaireInfo[] };

  const groupStagiairesBySession = (): SessionGroup[] => {
    const map = new Map<string, SessionGroup>();
    mergedStagiaires.forEach((s) => {
      const deb = s.dateDebutFormation || formation.dateDebut || "";
      const fin = s.dateFinFormation || formation.dateFin || "";
      const key = `${deb}__${fin}`;
      if (!map.has(key)) map.set(key, { key, debut: deb, fin, stagiaires: [] });
      map.get(key)!.stagiaires.push(s);
    });
    return Array.from(map.values());
  };

  const formatSessionSuffix = (g: SessionGroup, idx: number): string => {
    const fmt = (s: string) => {
      if (!s) return "";
      const t = s.trim();
      const fr = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (fr) return `${fr[3]}-${fr[2].padStart(2, "0")}-${fr[1].padStart(2, "0")}`;
      const d = new Date(t);
      if (isNaN(d.getTime())) return "";
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    };
    const a = fmt(g.debut), b = fmt(g.fin);
    return a && b ? `Session_${idx + 1}_${a}_au_${b}` : `Session_${idx + 1}`;
  };

  const generateAutoBlobForSession = async (doc: OpcoDocumentItem, sessionStagiaires: StagiaireInfo[]): Promise<Blob | null> => {
    if (doc.autoTemplates.length === 0) return null;
    for (const template of doc.autoTemplates) {
      try {
        // On passe UNIQUEMENT les stagiaires de cette session → le doc ne contiendra qu'1 session
        const html = generateDocumentById(`opco_${doc.code}`, template, { fi: 0, forceFilled: true, isCFA: true }, mergedOrganisme, formation, sessionStagiaires);
        if (html) return await htmlToPdfBlob(html);
      } catch (e) {
        console.warn(`Template ${template} failed for ${doc.code} (session):`, e);
      }
    }
    return null;
  };

  /** C12 : génère 1 PDF pour UNE semaine école ET UN stagiaire donnés. */
  const generateC12WeekBlob = async (
    stagiaire: StagiaireInfo,
    weekIdx: number,
  ): Promise<Blob | null> => {
    try {
      const html = generateDocumentById(
        "opco_C12",
        "exercices_opco_semaine",
        { weekIdx, fi: 0, forceFilled: true, isCFA: true },
        mergedOrganisme,
        formation,
        [stagiaire],
      );
      if (html) return await htmlToPdfBlob(html);
    } catch (e) {
      console.warn(`C12 semaine ${weekIdx} failed for ${stagiaire.prenom} ${stagiaire.nom}:`, e);
    }
    return null;
  };

  /** Format date pour suffixe fichier : YYYY-MM-DD */
  const fmtDateForFile = (d: Date): string => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  /** Génère la trame VIERGE pour B9 (calendrier) ou C11 (temps de connexion). Retourne null si non applicable. */
  const generateViergeBlobForSession = async (
    docCode: string,
    sessionStagiaires: StagiaireInfo[]
  ): Promise<Blob | null> => {
    const template =
      docCode === "B9" ? "calendrier_formation_opco_vierge" :
      docCode === "C11" ? "temps_connexion_opco_vierge" : null;
    if (!template) return null;
    try {
      const html = generateDocumentById(`opco_${docCode}_vierge`, template, { fi: 0, forceFilled: true, isCFA: true }, mergedOrganisme, formation, sessionStagiaires);
      if (html) return await htmlToPdfBlob(html);
    } catch (e) {
      console.warn(`Trame vierge ${template} failed for ${docCode}:`, e);
    }
    return null;
  };

  /** Pour C6 : libellés courts par sous-template (positionnement début/fin, exercice intermédiaire, évaluation finale) */
  const TEMPLATE_LABELS: Record<string, string> = {
    ai_test_positionnement_debut: "QCM_Positionnement_Debut",
    ai_test_positionnement_fin: "QCM_Positionnement_Fin",
    ai_exercice_intermediaire: "Exercice_Intermediaire",
    ai_evaluation_finale: "Evaluation_Finale",
  };

  /** Génère TOUS les sous-templates d'un doc (utile pour C6 qui regroupe 4 évaluations distinctes) */
  const generateAllTemplateBlobs = async (
    doc: OpcoDocumentItem,
    stagiaireIdx?: number
  ): Promise<Array<{ template: string; blob: Blob }>> => {
    const out: Array<{ template: string; blob: Blob }> = [];
    for (const template of doc.autoTemplates) {
      try {
        const params = stagiaireIdx !== undefined ? { stagiaireIdx, fi: 0, forceFilled: true, isCFA: true } : { fi: 0, forceFilled: true, isCFA: true };
        const html = generateDocumentById(`opco_${doc.code}`, template, params, mergedOrganisme, formation, mergedStagiaires);
        if (html) {
          const blob = await htmlToPdfBlob(html);
          out.push({ template, blob });
        }
      } catch (e) {
        console.warn(`Template ${template} failed for ${doc.code}:`, e);
      }
    }
    return out;
  };

  // ─────────── Aperçu + Édition ───────────
  const renderPreviewForTemplate = (doc: OpcoDocumentItem, templateIdx: number): string | null => {
    const params = doc.perStagiaire && mergedStagiaires.length > 0 ? { stagiaireIdx: 0, fi: 0, forceFilled: true, isCFA: true } : { fi: 0, forceFilled: true, isCFA: true };
    // C6 : on respecte le template choisi par l'utilisateur
    if (doc.code === "C6") {
      const tpl = doc.autoTemplates[templateIdx] || doc.autoTemplates[0];
      try {
        return generateDocumentById(`opco_${doc.code}`, tpl, params, mergedOrganisme, formation, mergedStagiaires);
      } catch (e) {
        console.warn(`Preview template ${tpl} failed for ${doc.code}:`, e);
        return null;
      }
    }
    // Cas général : premier template qui marche
    for (const template of doc.autoTemplates) {
      try {
        const html = generateDocumentById(`opco_${doc.code}`, template, params, mergedOrganisme, formation, mergedStagiaires);
        if (html) return html;
      } catch (e) {
        console.warn(`Preview template ${template} failed for ${doc.code}:`, e);
      }
    }
    return null;
  };

  const handlePreview = async (doc: OpcoDocumentItem) => {
    if (doc.autoTemplates.length === 0) {
      toast.error("Ce document doit être uploadé manuellement");
      return;
    }
    setPreviewDoc(doc);
    setPreviewTemplateIdx(0);
    setIsEditing(false);
    setPreviewTitle(`${doc.code} — ${doc.longLabel}`);
    setPreviewHtml("");
    setPreviewOpen(true);
    setPreviewLoading(true);
    const html = renderPreviewForTemplate(doc, 0);
    setPreviewLoading(false);
    if (!html) {
      toast.error(`Aucun aperçu disponible pour ${doc.code}`);
      setPreviewOpen(false);
      return;
    }
    setPreviewHtml(html);
  };

  const handleSelectPreviewTemplate = (idx: number) => {
    if (!previewDoc) return;
    setPreviewTemplateIdx(idx);
    setIsEditing(false);
    setPreviewLoading(true);
    const html = renderPreviewForTemplate(previewDoc, idx);
    setPreviewLoading(false);
    setPreviewHtml(html || "");
  };

  // Toggle edit mode on iframe body
  useEffect(() => {
    const iframe = previewIframeRef.current;
    if (!iframe?.contentDocument?.body) return;
    if (isEditing) {
      requestAnimationFrame(() => {
        const body = previewIframeRef.current?.contentDocument?.body;
        if (body) {
          body.contentEditable = "true";
          body.style.outline = "none";
          body.focus();
        }
      });
    } else {
      const body = iframe.contentDocument.body;
      body.contentEditable = "false";
    }
  }, [isEditing, previewHtml]);

  const handleIframeLoad = useCallback(() => {
    if (!isEditing) return;
    requestAnimationFrame(() => {
      const body = previewIframeRef.current?.contentDocument?.body;
      if (body) {
        body.contentEditable = "true";
        body.style.outline = "none";
      }
    });
  }, [isEditing]);

  const getCurrentEditedHtml = (): string => {
    const iframe = previewIframeRef.current;
    if (iframe?.contentDocument?.documentElement) {
      return `<!DOCTYPE html><html>${iframe.contentDocument.documentElement.innerHTML}</html>`;
    }
    return previewHtml;
  };

  const handleDownloadEdited = async () => {
    if (!previewDoc) return;
    try {
      const html = getCurrentEditedHtml();
      const blob = await htmlToPdfBlob(html);
      saveAs(blob, buildOpcoFileName(namingCtx, previewDoc.label, "pdf", "edite"));
      toast.success("Version éditée téléchargée");
    } catch (e: any) {
      toast.error(`Erreur : ${e.message || "Inconnue"}`);
    }
  };

  // ─────────── Téléchargement direct ───────────
  const handleDownloadSingle = (doc: OpcoDocumentItem) => {
    const state = docStates.get(doc.code);
    if (!state) return;

    if (state.status === "uploaded" && state.uploadedFile) {
      const ext = state.uploadedFileName?.split(".").pop() || "pdf";
      const fileName = buildOpcoFileName(namingCtx, doc.label, ext);
      saveAs(state.uploadedFile, fileName);
      return;
    }

    if (doc.autoTemplates.length === 0) {
      toast.error(`${doc.code} doit être uploadé manuellement`);
      return;
    }

    const ctxSnap = namingCtx;
    const stagiairesSnap = mergedStagiaires;
    const sessionsSnap = groupStagiairesBySession();
    const orgSnap = mergedOrganisme;
    const formSnap = formation;

    const isC6 = doc.code === "C6" && stagiairesSnap.length > 0;
    const isPerSession = PER_SESSION_DOCS.has(doc.code) && stagiairesSnap.length > 0;
    const isPerStag = doc.perStagiaire && stagiairesSnap.length > 0;
    const isZip = isC6 || isPerSession || isPerStag;
    const fileName = isZip
      ? buildOpcoFileName(ctxSnap, doc.label, "zip")
      : buildOpcoFileName(ctxSnap, doc.label, "pdf");

    runJob({
      label: `${doc.code} — ${doc.label}`,
      fileName,
      run: async (reporter) => {
        if (isC6) {
          const zip = new JSZip();
          const total = stagiairesSnap.length;
          for (let i = 0; i < stagiairesSnap.length; i++) {
            const s = stagiairesSnap[i];
            const stagFolder = `${s.prenom || ""}_${s.nom || ""}`.trim() || `Stagiaire_${i + 1}`;
            reporter.setMessage(`C6 — ${stagFolder} (${i + 1}/${total})`);
            const blobs = await generateAllTemplateBlobs(doc, i);
            for (const { template, blob } of blobs) {
              const subLabel = TEMPLATE_LABELS[template] || template;
              zip.file(`${stagFolder}/${buildOpcoFileName(ctxSnap, subLabel, "pdf", stagFolder)}`, blob);
            }
            reporter.setProgress(((i + 1) / total) * 90);
            await new Promise((r) => setTimeout(r, 0));
          }
          reporter.setMessage("Compression du ZIP...");
          return await zip.generateAsync({ type: "blob" }, (meta) => reporter.setProgress(90 + meta.percent * 0.1));
        }
        if (isPerSession) {
          const zip = new JSZip();
          // B9, C11, C12 : 1 PDF par stagiaire + 1 trame vierge par session.
          const totalUnits = sessionsSnap.reduce(
            (acc, g) => acc + g.stagiaires.length + 1,
            0,
          ) || 1;
          let processedUnits = 0;
          for (let i = 0; i < sessionsSnap.length; i++) {
            const g = sessionsSnap[i];
            const suffix = formatSessionSuffix(g, i);
            const folder = zip.folder(suffix)!;

            // C12 : 1 PDF par semaine école PASSÉE × stagiaire (au lieu d'un seul PDF tout-en-un)
            if (doc.code === "C12") {
              const weeks = getOpcoExerciceWeeks(formSnap, g.stagiaires);
              for (const s of g.stagiaires) {
                const stagSuffix = `${s.prenom || ""}_${s.nom || ""}`.trim() || "Stagiaire";
                const stagFolder = folder.folder(stagSuffix)!;
                for (let wi = 0; wi < weeks.length; wi++) {
                  const w = weeks[wi];
                  reporter.setMessage(
                    `C12 — Session ${i + 1}/${sessionsSnap.length} — ${s.prenom} ${s.nom} — Semaine ${wi + 1}/${weeks.length}`,
                  );
                  const blob = await generateC12WeekBlob(s, w.weekIdx);
                  if (blob) {
                    const wkSuffix = `Semaine_${String(wi + 1).padStart(2, "0")}_${fmtDateForFile(w.lastDay)}_${stagSuffix}`;
                    stagFolder.file(
                      buildOpcoFileName(ctxSnap, "Exercice_pratique_semaine", "pdf", wkSuffix),
                      blob,
                    );
                  }
                  await new Promise((r) => setTimeout(r, 0));
                }
                processedUnits++;
                reporter.setProgress((processedUnits / totalUnits) * 90);
              }
            } else {
              for (const s of g.stagiaires) {
                reporter.setMessage(`${doc.code} — Session ${i + 1}/${sessionsSnap.length} : ${s.prenom} ${s.nom}`);
                const blob = await generateAutoBlobForSession(doc, [s]);
                if (blob) {
                  const stagSuffix = `${s.prenom || ""}_${s.nom || ""}`.trim() || "Stagiaire";
                  folder.file(buildOpcoFileName(ctxSnap, doc.label, "pdf", stagSuffix), blob);
                }
                processedUnits++;
                reporter.setProgress((processedUnits / totalUnits) * 90);
                await new Promise((r) => setTimeout(r, 0));
              }
            }

            reporter.setMessage(`${doc.code} — Trame vierge session ${i + 1}/${sessionsSnap.length}`);
            const viergeBlob = await generateViergeBlobForSession(doc.code, g.stagiaires);
            if (viergeBlob) {
              folder.file(buildOpcoFileName(ctxSnap, `${doc.label} (Trame vierge)`, "pdf", suffix), viergeBlob);
            }
            processedUnits++;
            reporter.setProgress((processedUnits / totalUnits) * 90);
            await new Promise((r) => setTimeout(r, 0));
          }
          if (doc.code === "B9") {
            reporter.setMessage("B9 — Calendrier Excel consolidé...");
            const xlsHtml = generateExcelCalendrierOPCO(orgSnap, formSnap, stagiairesSnap);
            zip.file(buildOpcoFileName(ctxSnap, doc.label, "xls"), excelToBlob(xlsHtml));
          }
          reporter.setMessage("Compression du ZIP...");
          return await zip.generateAsync({ type: "blob" }, (meta) => reporter.setProgress(90 + meta.percent * 0.1));
        }
        if (isPerStag) {
          const zip = new JSZip();
          const total = stagiairesSnap.length;
          for (let i = 0; i < stagiairesSnap.length; i++) {
            const s = stagiairesSnap[i];
            reporter.setMessage(`${doc.label} : ${s.prenom} ${s.nom} (${i + 1}/${total})`);
            const blob = await generateAutoBlob(doc, i);
            if (blob) {
              const suffix = `${s.prenom || ""}_${s.nom || ""}`;
              zip.file(buildOpcoFileName(ctxSnap, doc.label, "pdf", suffix), blob);
            }
            reporter.setProgress(((i + 1) / total) * 90);
            await new Promise((r) => setTimeout(r, 0));
          }
          reporter.setMessage("Compression du ZIP...");
          return await zip.generateAsync({ type: "blob" }, (meta) => reporter.setProgress(90 + meta.percent * 0.1));
        }
        reporter.setMessage(`Génération : ${doc.label}...`);
        reporter.setProgress(40);
        const blob = await generateAutoBlob(doc);
        if (!blob) throw new Error(`Génération impossible pour ${doc.code}`);
        reporter.setProgress(95);
        return blob;
      },
    });
  };

  const handleExportFullZip = () => {
    // Snapshot des données pour que le job survive au démontage du composant
    const eligible = OPCO_DOCUMENTS.filter((d) => {
      const s = docStates.get(d.code);
      return s && s.status !== "not_applicable";
    });
    const statesSnapshot = new Map(docStates);
    const stagiairesSnap = mergedStagiaires;
    const sessionsSnap = groupStagiairesBySession();
    const ctxSnap = namingCtx;
    const orgSnap = mergedOrganisme;
    const formSnap = formation;

    runJob({
      label: "Export dossier OPCO Mobilités",
      fileName: `${buildOpcoRootName(ctxSnap)}.zip`,
      run: async (reporter) => {
        const zip = new JSZip();
        let processed = 0;
        const total = eligible.length;

        for (const doc of eligible) {
          const state = statesSnapshot.get(doc.code)!;
          const sectionLabel = OPCO_CATEGORIES[doc.category];
          const folder = buildOpcoZipFolder(ctxSnap, sectionLabel);

          reporter.setMessage(`${doc.code} — ${doc.label}`);

          if (state.uploadedFile) {
            const ext = state.uploadedFileName?.split(".").pop() || "pdf";
            zip.file(`${folder}/${buildOpcoFileName(ctxSnap, doc.label, ext)}`, state.uploadedFile);
          } else if (doc.autoTemplates.length > 0) {
            if (doc.code === "C6" && stagiairesSnap.length > 0) {
              for (let i = 0; i < stagiairesSnap.length; i++) {
                const s = stagiairesSnap[i];
                const stagFolder = `${s.prenom || ""}_${s.nom || ""}`.trim() || `Stagiaire_${i + 1}`;
                const blobs = await generateAllTemplateBlobs(doc, i);
                for (const { template, blob } of blobs) {
                  const subLabel = TEMPLATE_LABELS[template] || template;
                  zip.file(`${folder}/C6_Evaluations_IA/${stagFolder}/${buildOpcoFileName(ctxSnap, subLabel, "pdf", stagFolder)}`, blob);
                }
                await new Promise((r) => setTimeout(r, 50));
              }
            } else if (PER_SESSION_DOCS.has(doc.code) && stagiairesSnap.length > 0) {
              const subFolder = `${folder}/${doc.code}_${doc.label.replace(/\s+/g, "_")}`;
              for (let i = 0; i < sessionsSnap.length; i++) {
                const g = sessionsSnap[i];
                const suffix = formatSessionSuffix(g, i);
                const sessionFolder = `${subFolder}/${suffix}`;

                if (doc.code === "C12") {
                  const weeks = getOpcoExerciceWeeks(formSnap, g.stagiaires);
                  for (const s of g.stagiaires) {
                    const stagSuffix = `${s.prenom || ""}_${s.nom || ""}`.trim() || "Stagiaire";
                    for (let wi = 0; wi < weeks.length; wi++) {
                      const w = weeks[wi];
                      reporter.setMessage(
                        `C12 — ${suffix} — ${s.prenom} ${s.nom} — Semaine ${wi + 1}/${weeks.length}`,
                      );
                      const blob = await generateC12WeekBlob(s, w.weekIdx);
                      if (blob) {
                        const wkSuffix = `Semaine_${String(wi + 1).padStart(2, "0")}_${fmtDateForFile(w.lastDay)}_${stagSuffix}`;
                        zip.file(
                          `${sessionFolder}/${stagSuffix}/${buildOpcoFileName(ctxSnap, "Exercice_pratique_semaine", "pdf", wkSuffix)}`,
                          blob,
                        );
                      }
                      await new Promise((r) => setTimeout(r, 0));
                    }
                  }
                } else {
                  for (const s of g.stagiaires) {
                    const blob = await generateAutoBlobForSession(doc, [s]);
                    if (blob) {
                      const stagSuffix = `${s.prenom || ""}_${s.nom || ""}`.trim() || "Stagiaire";
                      zip.file(`${sessionFolder}/${buildOpcoFileName(ctxSnap, doc.label, "pdf", stagSuffix)}`, blob);
                    }
                    await new Promise((r) => setTimeout(r, 30));
                  }
                }

                const viergeBlob = await generateViergeBlobForSession(doc.code, g.stagiaires);
                if (viergeBlob) {
                  zip.file(`${sessionFolder}/${buildOpcoFileName(ctxSnap, `${doc.label} (Trame vierge)`, "pdf", suffix)}`, viergeBlob);
                }
                await new Promise((r) => setTimeout(r, 50));
              }
              if (doc.code === "B9") {
                const xlsHtml = generateExcelCalendrierOPCO(orgSnap, formSnap, stagiairesSnap);
                zip.file(`${subFolder}/${buildOpcoFileName(ctxSnap, doc.label, "xls")}`, excelToBlob(xlsHtml));
              }
            } else if (doc.perStagiaire && stagiairesSnap.length > 0) {
              for (let i = 0; i < stagiairesSnap.length; i++) {
                const blob = await generateAutoBlob(doc, i);
                if (blob) {
                  const s = stagiairesSnap[i];
                  const suffix = `${s.prenom || ""}_${s.nom || ""}`;
                  zip.file(`${folder}/${buildOpcoFileName(ctxSnap, doc.label, "pdf", suffix)}`, blob);
                }
                await new Promise((r) => setTimeout(r, 50));
              }
            } else {
              const blob = await generateAutoBlob(doc);
              if (blob) zip.file(`${folder}/${buildOpcoFileName(ctxSnap, doc.label, "pdf")}`, blob);
            }
          } else {
            zip.file(`${folder}/MANQUANT_${doc.code}_${doc.label}.txt`,
              `Document à fournir manuellement : ${doc.longLabel}\n\n${doc.description}`);
          }

          processed++;
          reporter.setProgress((processed / total) * 90);
          await new Promise((r) => setTimeout(r, 0));
        }

        reporter.setMessage("Compression du ZIP...");
        const blob = await zip.generateAsync({ type: "blob" }, (meta) => {
          reporter.setProgress(90 + meta.percent * 0.1);
        });
        return blob;
      },
    });
  };

  // ─────────── Sauvegarde dossier ───────────
  const loadSavedList = useCallback(async () => {
    if (!user) { setSavedList([]); return; }
    const { data, error } = await supabase
      .from("saved_opco_dossiers")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) { console.error(error); return; }
    setSavedList((data || []) as unknown as SavedOpcoDossier[]);
  }, [user]);

  useEffect(() => { loadSavedList(); }, [loadSavedList]);

  const serializeDocStates = (): Record<string, any> => {
    const obj: Record<string, any> = {};
    docStates.forEach((s, code) => {
      // On ne sérialise pas le File (binaire)
      obj[code] = { code: s.code, status: s.status, uploadedFileName: s.uploadedFileName, note: s.note };
    });
    return obj;
  };

  const handleSaveDossier = async (mode: "save" | "update" | "saveAsNew" = "save") => {
    if (!user) { toast.error("Connectez-vous pour sauvegarder"); navigate("/auth"); return; }
    if (!organisme.nom?.trim()) { toast.error("Nom de l'organisme requis"); return; }
    setSavingDossier(true);
    const payload = {
      user_id: user.id,
      name: dossierName.trim() || `${organisme.nom} — ${formation.intitule || "OPCO"}`,
      ref_dossier: refDossier,
      annee_controle: anneeControle,
      organisme: organisme as any,
      formation: formation as any,
      stagiaires: stagiaires as any,
      doc_states: serializeDocStates() as any,
    };
    let res;
    if (mode === "update" && currentDossierId) {
      res = await supabase.from("saved_opco_dossiers").update(payload).eq("id", currentDossierId).select().single();
    } else {
      // save or saveAsNew → toujours insert
      res = await supabase.from("saved_opco_dossiers").insert(payload).select().single();
    }
    setSavingDossier(false);
    if (res.error) { toast.error(`Erreur : ${res.error.message}`); return; }
    setCurrentDossierId((res.data as any).id);
    toast.success(mode === "update" ? "Dossier mis à jour" : mode === "saveAsNew" ? "Nouveau dossier créé" : "Dossier sauvegardé");
    loadSavedList();
  };

  const handleLoadDossier = (d: SavedOpcoDossier) => {
    setOrganisme(d.organisme);
    setFormation(d.formation);
    setStagiaires(d.stagiaires || []);
    setRefDossier(d.ref_dossier || "");
    setAnneeControle(d.annee_controle || String(new Date().getFullYear()));
    setDossierName(d.name);
    setCurrentDossierId(d.id);
    // Restore doc states (sans les fichiers binaires)
    const m = new Map<string, OpcoDocState>();
    OPCO_DOCUMENTS.forEach((doc) => {
      const saved = d.doc_states?.[doc.code];
      const defaultStatus: OpcoDocStatus = doc.manualUpload ? "pending" : doc.autoTemplates.length > 0 ? "auto" : "pending";
      m.set(doc.code, {
        code: doc.code,
        status: (saved?.status as OpcoDocStatus) || defaultStatus,
        uploadedFileName: saved?.uploadedFileName,
        note: saved?.note,
      });
    });
    setDocStates(m);
    toast.success(`Dossier "${d.name}" chargé`);
  };

  const handleDeleteDossier = async (id: string) => {
    if (!confirm("Supprimer ce dossier OPCO ?")) return;
    const { error } = await supabase.from("saved_opco_dossiers").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    if (currentDossierId === id) setCurrentDossierId(null);
    toast.success("Dossier supprimé");
    loadSavedList();
  };

  const handleNewDossier = () => {
    setCurrentDossierId(null);
    setDossierName("");
    setOrganisme(emptyOrganisme);
    setFormation(emptyFormation);
    setStagiaires([]);
    setRefDossier("");
    setAnneeControle(String(new Date().getFullYear()));
    const m = new Map<string, OpcoDocState>();
    OPCO_DOCUMENTS.forEach((d) => {
      m.set(d.code, { code: d.code, status: d.manualUpload ? "pending" : d.autoTemplates.length > 0 ? "auto" : "pending" });
    });
    setDocStates(m);
    setStep("setup");
    toast.success("Nouveau dossier OPCO");
  };

  // ─────────── SETUP STEP ───────────
  if (step === "setup") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">OPCO Mobilités — Contrôle de service fait</span>
            </div>
            <div className="flex items-center gap-2">
              {user ? (
                <Button variant="ghost" size="sm" onClick={async () => { await supabase.auth.signOut(); }}>
                  <LogOut className="w-4 h-4 mr-1" /> Déconnexion
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
                  <LogIn className="w-4 h-4 mr-1" /> Connexion
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                <Home className="w-4 h-4 mr-1" /> Accueil
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          {/* Sauvegarde */}
          <Card className="p-5 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FolderOpen className="w-5 h-5" /> Mes dossiers OPCO
              </h2>
              {currentDossierId && (
                <Badge variant="secondary" className="text-xs">Édition d'un dossier sauvegardé</Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-end">
              <div className="flex-1 min-w-[220px]">
                <Label htmlFor="dname" className="text-xs">Nom du dossier</Label>
                <Input id="dname" value={dossierName} onChange={(e) => setDossierName(e.target.value)}
                  placeholder="ex : OPCO Mob - 2026 - SELECT FORMATION" />
              </div>
              <Button onClick={() => handleSaveDossier(currentDossierId ? "update" : "save")} disabled={savingDossier} className="gap-2">
                {savingDossier ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {currentDossierId ? "Mettre à jour" : "Sauvegarder"}
              </Button>
              {currentDossierId && (
                <Button variant="secondary" onClick={() => handleSaveDossier("saveAsNew")} disabled={savingDossier} className="gap-2">
                  <Save className="w-4 h-4" /> Enregistrer comme nouveau
                </Button>
              )}
              <Button variant="outline" onClick={handleNewDossier} className="gap-2">
                <Plus className="w-4 h-4" /> Nouveau
              </Button>
            </div>
            {!user && (
              <p className="text-xs text-muted-foreground">
                Connectez-vous pour sauvegarder vos dossiers OPCO.
              </p>
            )}
            {user && savedList.length > 0 && (
              <div className="border-t pt-3 space-y-1.5 max-h-56 overflow-y-auto">
                {savedList.map((d) => (
                  <div key={d.id} className={`flex items-center justify-between gap-2 px-3 py-2 rounded hover:bg-muted/50 ${currentDossierId === d.id ? "bg-muted" : ""}`}>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{d.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {d.ref_dossier && <span>Réf. {d.ref_dossier} • </span>}
                        Maj : {new Date(d.updated_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => handleLoadDossier(d)}>
                        <FolderOpen className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteDossier(d.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Référence du contrôle OPCO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ref">Référence dossier OPCO</Label>
                <Input id="ref" value={refDossier} onChange={(e) => setRefDossier(e.target.value)}
                  placeholder="ex : 202604140414_1_49428" />
                <p className="text-xs text-muted-foreground mt-1">Référence figurant sur le courrier OPCO Mobilités.</p>
              </div>
              <div>
                <Label htmlFor="annee">Année du contrôle</Label>
                <Input id="annee" value={anneeControle} onChange={(e) => setAnneeControle(e.target.value)}
                  placeholder={String(new Date().getFullYear())} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <OrganismeForm data={organisme} onChange={setOrganisme} />
          </Card>
          <Card className="p-6">
            <FormationForm data={formation} onChange={setFormation} onImportStagiaires={setStagiaires} />
          </Card>
          <Card className="p-6">
            <StagiairesForm data={stagiaires} onChange={setStagiaires} />
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Design des documents</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Choisissez le thème visuel appliqué à l'ensemble des documents OPCO générés
              (polices, couleurs, en-têtes, styles de titres et de tableaux).
            </p>
            <DossierOutputSettings
              organisme={organisme}
              scope="opco"
              manualStyle={docStyle}
              onManualStyleChange={handleStyleChange}
              onEffectiveStyleChange={(style) => { setDocStyleState(style); applyDocStyle(style); }}
            />
          </Card>

          <div className="flex justify-end gap-2">
            <Button onClick={() => { if (validateSetup()) setStep("documents"); }} size="lg" className="gap-2">
              Accéder à la checklist OPCO <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // ─────────── DOCUMENTS STEP ───────────
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">OPCO Mobilités</span>
            {refDossier && <Badge variant="outline" className="ml-2">Réf. {refDossier}</Badge>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleSaveDossier(currentDossierId ? "update" : "save")} disabled={savingDossier} className="gap-1">
              {savingDossier ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {currentDossierId ? "Mettre à jour" : "Sauvegarder"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setStep("setup")}>
              Modifier les infos
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-1" /> Accueil
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <Card className="p-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-semibold">{organisme.nom || "Organisme"} — {formation.intitule || "Formation"}</h2>
              <p className="text-sm text-muted-foreground">
                {mergedStagiaires.length} apprenti(s) • {stats.done}/{stats.total} documents prêts
              </p>
            </div>
            <div className="flex gap-2 text-xs">
              <Badge variant="outline" className="gap-1">{stats.auto} auto</Badge>
              <Badge variant="outline" className="gap-1 border-primary/40">{stats.uploaded} uploadés</Badge>
              <Badge variant="outline" className="gap-1">{stats.pending} en attente</Badge>
              {stats.na > 0 && <Badge variant="outline" className="gap-1">{stats.na} N/A</Badge>}
            </div>
          </div>
          <Progress value={(stats.done / stats.total) * 100} className="mt-3" />
        </Card>

        {/* Export bar */}
        <Card className="p-4 flex items-center justify-between flex-wrap gap-3 bg-muted/30">
          <div className="text-sm">
            <p className="font-medium">Export du dossier OPCO complet</p>
            <p className="text-xs text-muted-foreground">
              ZIP organisé en sections A/B/C avec nomenclature stricte OPCO :{" "}
              <code className="bg-background px-1 rounded">{anneeControle}_{(organisme.nom || "ETAB").replace(/\s+/g, "_")}_[Pièce]_AAAA.MM.JJ</code>
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handleGenerateAIPack}
              disabled={generatingAI}
              variant={aiPackReady ? "outline" : "secondary"}
              className="gap-2"
              title="Génère via IA un pack C6 cohérent avec la formation"
            >
              {generatingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {generatingAI ? "Génération IA..." : aiPackReady ? "Régénérer pack IA C6" : "Générer évaluations IA (C6)"}
            </Button>
            <Button
              onClick={() => {
                exportFormDataToExcel(organisme, formation, stagiaires);
                toast.success("Export Excel lancé (3 fichiers)");
              }}
              variant="outline"
              className="gap-2"
              title="Exporter Organisme, Formation et Stagiaires au format Excel"
            >
              <FileText className="w-4 h-4" />
              Export Excel
            </Button>
            <Button onClick={handleExportFullZip} disabled={hasActive} className="gap-2">
              {hasActive ? <Loader2 className="w-4 h-4 animate-spin" /> : <FolderArchive className="w-4 h-4" />}
              {hasActive ? "Export en arrière-plan..." : "Exporter le dossier ZIP"}
            </Button>
          </div>
        </Card>

        {/* Factures AKTO — 1ère échéance (4 stagiaires prédéfinis) */}
        <Card className="p-5 space-y-3">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" /> Factures AKTO — 1ère échéance
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Génération automatique au format Word (.docx) — modèle annexe AKTO pour SKILLMASTER (RNCP39063).
              </p>
            </div>
            <Button onClick={() => { downloadAllFacturesAktoZip(); toast.success("Téléchargement ZIP des 4 factures"); }} className="gap-2">
              <FolderArchive className="w-4 h-4" /> Télécharger les 4 (ZIP)
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left px-3 py-2 border-b">Stagiaire</th>
                  <th className="text-left px-3 py-2 border-b">N° dossier</th>
                  <th className="text-left px-3 py-2 border-b">Période</th>
                  <th className="text-left px-3 py-2 border-b">Montant HT</th>
                  <th className="px-3 py-2 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {FACTURES_AKTO_STAGIAIRES.map((s) => (
                  <tr key={s.dossier} className="border-b hover:bg-muted/30">
                    <td className="px-3 py-2 font-medium">{s.nom}</td>
                    <td className="px-3 py-2 font-mono text-xs">{s.dossier}</td>
                    <td className="px-3 py-2 text-xs">{s.periodeDu} → {s.periodeAu}</td>
                    <td className="px-3 py-2">{s.montantHT} €</td>
                    <td className="px-3 py-2 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => { downloadFactureAkto(s); toast.success(`Facture ${s.nom} téléchargée`); }}
                      >
                        <Download className="w-3 h-3" /> Word
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>


        {(Object.keys(OPCO_CATEGORIES) as OpcoCategory[]).map((cat) => {
          const docs = OPCO_DOCUMENTS.filter((d) => d.category === cat);
          const isOpen = expandedCats.has(cat);
          const catDone = docs.filter((d) => {
            const s = docStates.get(d.code);
            return s && s.status !== "pending";
          }).length;

          return (
            <Card key={cat} className="overflow-hidden">
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full px-5 py-3 flex items-center justify-between hover:bg-muted/50 transition"
              >
                <div className="flex items-center gap-2">
                  {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <h3 className="font-semibold">{OPCO_CATEGORIES[cat]}</h3>
                  <Badge variant="outline" className="ml-2">{catDone}/{docs.length}</Badge>
                </div>
              </button>

              {isOpen && (
                <div className="border-t divide-y">
                  {docs.map((doc) => {
                    const state = docStates.get(doc.code)!;
                    const Icon = STATUS_CONFIG[state.status].icon;
                    return (
                      <div key={doc.code} className="px-5 py-3 flex items-start gap-3 hover:bg-muted/20">
                        <div className="pt-1">
                          <Icon className={`w-5 h-5 ${STATUS_CONFIG[state.status].className}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{doc.code}</span>
                            <span className="font-medium text-sm">{doc.longLabel}</span>
                            {doc.perStagiaire && <Badge variant="secondary" className="text-xs">par apprenti</Badge>}
                            {doc.manualUpload && <Badge variant="outline" className="text-xs">upload requis</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
                          {state.uploadedFileName && (
                            <p className="text-xs text-primary mt-1 flex items-center gap-1">
                              <FileText className="w-3 h-3" /> {state.uploadedFileName}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <input
                            ref={(el) => { if (el) fileInputRefs.current.set(doc.code, el); }}
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleFileUpload(doc.code, f);
                              e.target.value = "";
                            }}
                          />
                          <Button
                            variant="ghost" size="sm"
                            onClick={() => fileInputRefs.current.get(doc.code)?.click()}
                            title="Uploader"
                          >
                            <Upload className="w-4 h-4" />
                          </Button>
                          {doc.autoTemplates.length > 0 && (
                            <>
                              <Button
                                variant="ghost" size="sm"
                                onClick={() => handlePreview(doc)}
                                title="Aperçu / Édition"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost" size="sm"
                                onClick={() => handleDownloadSingle(doc)}
                                title={PER_SESSION_DOCS.has(doc.code) ? "Télécharger (ZIP : 1 fichier par session)" : "Télécharger"}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <div className="flex items-center gap-1 text-xs">
                            <Checkbox
                              checked={state.status === "not_applicable"}
                              onCheckedChange={() => toggleNA(doc.code)}
                              id={`na-${doc.code}`}
                            />
                            <label htmlFor={`na-${doc.code}`} className="cursor-pointer text-muted-foreground">N/A</label>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </main>

      {/* Preview / Edit Dialog */}
      <Dialog
        open={previewOpen}
        onOpenChange={(open) => {
          if (!open && isEditing) {
            // Conserver les modifications en mémoire avant fermeture
            setPreviewHtml(getCurrentEditedHtml());
            setIsEditing(false);
          }
          setPreviewOpen(open);
        }}
      >
        <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between gap-2 pr-8">
              <DialogTitle className="text-base truncate">{previewTitle}</DialogTitle>
              <div className="flex items-center gap-2 flex-shrink-0">
                {isEditing && (
                  <Badge variant="secondary" className="text-xs gap-1">
                    <Pencil className="w-3 h-3" /> Mode édition
                  </Badge>
                )}
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (isEditing) {
                      // Sauvegarder les modifs avant de quitter
                      setPreviewHtml(getCurrentEditedHtml());
                    }
                    setIsEditing(!isEditing);
                  }}
                  disabled={previewLoading}
                  className="gap-1"
                >
                  <Pencil className="w-4 h-4" />
                  {isEditing ? "Terminer" : "Éditer"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownloadEdited}
                  disabled={previewLoading || !previewDoc}
                  className="gap-1"
                >
                  <Download className="w-4 h-4" /> Télécharger {isEditing ? "édité" : "PDF"}
                </Button>
              </div>
            </div>
          </DialogHeader>
          {previewDoc?.code === "C6" && (
            <div className="flex flex-wrap gap-2 px-1 pb-2 border-b">
              {previewDoc.autoTemplates.map((tpl, idx) => {
                const labels: Record<string, string> = {
                  ai_test_positionnement_debut: "QCM Positionnement Début",
                  ai_test_positionnement_fin: "QCM Positionnement Fin",
                  ai_exercice_intermediaire: "Exercice Intermédiaire",
                  ai_evaluation_finale: "Évaluation Finale",
                };
                return (
                  <Button
                    key={tpl}
                    size="sm"
                    variant={previewTemplateIdx === idx ? "default" : "outline"}
                    onClick={() => handleSelectPreviewTemplate(idx)}
                    disabled={previewLoading}
                  >
                    {labels[tpl] || tpl}
                  </Button>
                );
              })}
            </div>
          )}
          <div className="flex-1 overflow-hidden bg-muted/20 rounded">
            {previewLoading ? (
              <div className="h-full flex items-center justify-center text-muted-foreground gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Génération de l'aperçu...
              </div>
            ) : (
              <iframe
                ref={previewIframeRef}
                srcDoc={previewHtml}
                onLoad={handleIframeLoad}
                className="w-full h-full bg-background"
                title="Aperçu OPCO"
              />
            )}
          </div>
          {isEditing && (
            <p className="text-xs text-muted-foreground px-1">
              Cliquez dans le document pour modifier le texte. Cliquez sur "Télécharger édité" pour exporter votre version.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
