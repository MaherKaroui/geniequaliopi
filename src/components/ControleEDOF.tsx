import { useState, useMemo, useCallback, useRef } from "react";
import { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, DocStyleConfig } from "@/types/qualiopi";
import { EY_DOCUMENTS, EY_CATEGORIES, EYCategory, EYDocState, EYDocStatus, EYDocumentItem } from "@/lib/eyControlData";
import { generateDocumentById } from "@/lib/documentGenerator";
import { mergeStagiaires, mergeOrganisme } from "@/lib/sampleData";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Circle, Upload, Archive, Loader2, FileText, AlertTriangle, Sparkles, XCircle, ChevronDown, ChevronRight, Eye, Download, PenTool } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const yieldToBrowser = (ms = 0) => new Promise<void>(r => requestAnimationFrame(() => setTimeout(r, ms)));

type PdfBlobOptions = NonNullable<Parameters<typeof htmlToPdfBlob>[1]>;

const MASS_EXPORT_PDF_OPTIONS = {
  scale: 1,
  imageQuality: 0.72,
  pageYieldMs: 20,
} satisfies PdfBlobOptions;

const ZIP_EXPORT_OPTIONS = {
  type: "blob" as const,
  compression: "STORE" as const,
  streamFiles: true,
};

const hasStagiaireIdentity = (stagiaire: StagiaireInfo | null | undefined): stagiaire is StagiaireInfo => {
  if (!stagiaire) return false;
  return [stagiaire.nom, stagiaire.prenom, stagiaire.email, stagiaire.telephone].some(
    (value) => typeof value === "string" && value.trim().length > 0
  );
};

interface ControleEDOFProps {
  organisme: OrganismeInfo;
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
  criteres: CritereData[];
  docStyle?: DocStyleConfig;
  signature?: string;
}

const STATUS_CONFIG: Record<EYDocStatus, { label: string; icon: React.ReactNode; color: string }> = {
  pending: { label: "À fournir", icon: <Circle className="w-4 h-4 text-muted-foreground" />, color: "bg-muted text-muted-foreground" },
  auto: { label: "Auto-généré", icon: <Sparkles className="w-4 h-4 text-primary" />, color: "bg-primary/10 text-primary" },
  uploaded: { label: "Fourni", icon: <CheckCircle2 className="w-4 h-4 text-green-600" />, color: "bg-green-100 text-green-700" },
  not_applicable: { label: "N/A", icon: <XCircle className="w-4 h-4 text-muted-foreground" />, color: "bg-muted text-muted-foreground" },
};

export default function ControleEDOF({ organisme, formation, stagiaires, signature }: ControleEDOFProps) {
  const [docStates, setDocStates] = useState<Map<string, EYDocState>>(() => {
    const m = new Map<string, EYDocState>();
    EY_DOCUMENTS.forEach(d => {
      const canAuto = d.autoTemplates.length > 0;
      m.set(d.code, { code: d.code, status: canAuto ? "auto" : "pending" });
    });
    return m;
  });

  const [expandedCats, setExpandedCats] = useState<Set<EYCategory>>(new Set(Object.keys(EY_CATEGORIES) as EYCategory[]));
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const fileInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());

  // Preview state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<EYDocumentItem | null>(null);
  const orgName = organisme.nom || "Organisme";
  const safeName = useMemo(() => orgName.replace(/[^a-zA-Z0-9_-]/g, "_"), [orgName]);
  const mergedStagiaires = useMemo(
    () => mergeStagiaires(stagiaires).filter((stagiaire): stagiaire is StagiaireInfo => Boolean(stagiaire)),
    [stagiaires]
  );
  const exportStagiaires = useMemo(() => {
    const identified = mergedStagiaires.filter(hasStagiaireIdentity);
    return identified.length > 0 ? identified : mergedStagiaires;
  }, [mergedStagiaires]);

  const stats = useMemo(() => {
    let total = 0, auto = 0, uploaded = 0, pending = 0, na = 0;
    docStates.forEach(s => {
      total++;
      if (s.status === "auto") auto++;
      else if (s.status === "uploaded") uploaded++;
      else if (s.status === "not_applicable") na++;
      else pending++;
    });
    return { total, auto, uploaded, pending, na, done: auto + uploaded + na };
  }, [docStates]);

  const toggleCategory = (cat: EYCategory) => {
    setExpandedCats(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  };

  const updateDocState = useCallback((code: string, update: Partial<EYDocState>) => {
    setDocStates(prev => {
      const next = new Map(prev);
      const current = next.get(code) || { code, status: "pending" as EYDocStatus };
      next.set(code, { ...current, ...update });
      return next;
    });
  }, []);

  const handleFileUpload = useCallback((code: string, file: File) => {
    updateDocState(code, { status: "uploaded", uploadedFileName: file.name, uploadedFile: file });
    toast.success(`Document ${code} ajouté : ${file.name}`);
  }, [updateDocState]);

  const toggleNA = useCallback((code: string) => {
    const current = docStates.get(code);
    if (!current) return;
    const eyDoc = EY_DOCUMENTS.find(d => d.code === code);
    const canAuto = eyDoc && eyDoc.autoTemplates.length > 0;
    if (current.status === "not_applicable") {
      updateDocState(code, { status: canAuto ? "auto" : "pending" });
    } else {
      updateDocState(code, { status: "not_applicable", uploadedFile: undefined, uploadedFileName: undefined });
    }
  }, [docStates, updateDocState]);

  const toggleSelectDoc = useCallback((code: string) => {
    setSelectedDocs(prev => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code); else next.add(code);
      return next;
    });
  }, []);

  const generateAutoDocForStagiaire = useCallback(async (
    eyDoc: EYDocumentItem,
    stagiaireIdx: number,
    options?: { pdfOptions?: PdfBlobOptions; sourceStagiaires?: StagiaireInfo[] }
  ): Promise<{ blob: Blob; fileName: string } | null> => {
    if (eyDoc.autoTemplates.length === 0) return null;
    const template = eyDoc.autoTemplates[0];
    const sourceStagiaires = options?.sourceStagiaires ?? exportStagiaires;
    const currentStagiaire = sourceStagiaires[stagiaireIdx];
    if (!currentStagiaire) return null;
    try {
      const o = mergeOrganisme(organisme);
      const params = { stagiaireIdx, fi: 0 };
      const html = generateDocumentById(`ey_${eyDoc.code}`, template, params, o, formation, sourceStagiaires);
      if (!html) return null;
      const blob = await htmlToPdfBlob(html, options?.pdfOptions);
      const stagName = `${currentStagiaire.nom}_${currentStagiaire.prenom}`.replace(/[^a-zA-Z0-9_-]/g, "_") || `stagiaire_${stagiaireIdx + 1}`;
      return { blob, fileName: `${safeName}_${eyDoc.code}_${stagName}.pdf` };
    } catch (e) {
      console.error(`Error generating ${eyDoc.code} for stagiaire ${stagiaireIdx}:`, e);
      return null;
    }
  }, [organisme, formation, exportStagiaires, safeName]);

  const generateAutoDoc = useCallback(async (
    eyDoc: EYDocumentItem,
    options?: { pdfOptions?: PdfBlobOptions; sourceStagiaires?: StagiaireInfo[] }
  ): Promise<{ blob: Blob; fileName: string } | null> => {
    if (eyDoc.autoTemplates.length === 0) return null;
    const template = eyDoc.autoTemplates[0];
    const sourceStagiaires = options?.sourceStagiaires ?? exportStagiaires;
    try {
      const o = mergeOrganisme(organisme);
      const params = eyDoc.perStagiaire && sourceStagiaires.length > 0 ? { stagiaireIdx: 0, fi: 0 } : { fi: 0 };
      const html = generateDocumentById(`ey_${eyDoc.code}`, template, params, o, formation, sourceStagiaires);
      if (!html) return null;
      const blob = await htmlToPdfBlob(html, options?.pdfOptions);
      return { blob, fileName: `${safeName}_${eyDoc.code}.pdf` };
    } catch (e) {
      console.error(`Error generating ${eyDoc.code}:`, e);
      return null;
    }
  }, [organisme, formation, exportStagiaires, safeName]);

  const appendAutoDocToZip = useCallback(async (
    zip: JSZip,
    eyDoc: EYDocumentItem,
    options?: {
      pdfOptions?: PdfBlobOptions;
      sourceStagiaires?: StagiaireInfo[];
      onItemDone?: (current: number, total: number) => void;
    }
  ) => {
    const sourceStagiaires = options?.sourceStagiaires ?? exportStagiaires;

    if (eyDoc.perStagiaire && sourceStagiaires.length > 0) {
      for (let si = 0; si < sourceStagiaires.length; si++) {
        const result = await generateAutoDocForStagiaire(eyDoc, si, {
          pdfOptions: options?.pdfOptions,
          sourceStagiaires,
        });
        if (result) zip.file(result.fileName, result.blob);
        options?.onItemDone?.(si + 1, sourceStagiaires.length);
        await yieldToBrowser(32);
      }
      return;
    }

    const result = await generateAutoDoc(eyDoc, {
      pdfOptions: options?.pdfOptions,
      sourceStagiaires,
    });

    if (result) zip.file(result.fileName, result.blob);
    options?.onItemDone?.(1, 1);
  }, [exportStagiaires, generateAutoDoc, generateAutoDocForStagiaire]);

  const handleDownloadDoc = useCallback(async (eyDoc: EYDocumentItem, state: EYDocState) => {
    if (state.status === "uploaded" && state.uploadedFile) {
      saveAs(state.uploadedFile, state.uploadedFileName || `${eyDoc.code}.pdf`);
      return;
    }

    if (eyDoc.autoTemplates.length === 0) return;

    toast.info(`Génération de ${eyDoc.code}...`);

    try {
      if (eyDoc.perStagiaire && exportStagiaires.length > 0) {
        setGenerating(true);
        setProgress(0);
        setProgressText(`Préparation de ${eyDoc.code}...`);

        const zip = new JSZip();
        await appendAutoDocToZip(zip, eyDoc, {
          pdfOptions: MASS_EXPORT_PDF_OPTIONS,
          onItemDone: (current, total) => {
            setProgress(Math.round((current / Math.max(total, 1)) * 100));
            setProgressText(`${eyDoc.code} — ${current}/${total}`);
          },
        });

        const content = await zip.generateAsync(ZIP_EXPORT_OPTIONS);
        saveAs(content, `${safeName}_${eyDoc.code}.zip`);
      } else {
        const result = await generateAutoDoc(eyDoc, { sourceStagiaires: exportStagiaires });
        if (!result) {
          toast.error("Impossible de générer ce document");
          return;
        }
        saveAs(result.blob, result.fileName);
      }

      toast.success(`${eyDoc.code} téléchargé !`);
    } catch (e: any) {
      toast.error("Erreur : " + (e.message || "Erreur inconnue"));
    } finally {
      setGenerating(false);
      setProgress(0);
      setProgressText("");
    }
  }, [appendAutoDocToZip, exportStagiaires, generateAutoDoc, safeName]);

  const downloadSelectedZip = useCallback(async () => {
    if (selectedDocs.size === 0) {
      toast.error("Sélectionnez au moins un document");
      return;
    }
    setGenerating(true);
    setProgress(0);
    setProgressText("Préparation des documents sélectionnés...");
    try {
      const zip = new JSZip();
      const docsToProcess = EY_DOCUMENTS.filter(d => selectedDocs.has(d.code));
      const totalItems = docsToProcess.reduce((count, eyDoc) => {
        const state = docStates.get(eyDoc.code);
        if (state?.status === "uploaded" || eyDoc.autoTemplates.length === 0 || !eyDoc.perStagiaire || exportStagiaires.length === 0) {
          return count + 1;
        }
        return count + exportStagiaires.length;
      }, 0);
      let completedItems = 0;

      const advanceProgress = (label: string) => {
        completedItems += 1;
        setProgress(Math.round((completedItems / Math.max(totalItems, 1)) * 100));
        setProgressText(label);
      };

      for (const eyDoc of docsToProcess) {
        const state = docStates.get(eyDoc.code);

        if (state?.status === "uploaded" && state.uploadedFile) {
          const buf = await state.uploadedFile.arrayBuffer();
          const ext = state.uploadedFileName?.split(".").pop() || "pdf";
          zip.file(`${safeName}_${eyDoc.code}.${ext}`, buf);
          advanceProgress(`${eyDoc.code} — fichier fourni`);
        } else if (eyDoc.autoTemplates.length > 0) {
          await appendAutoDocToZip(zip, eyDoc, {
            pdfOptions: MASS_EXPORT_PDF_OPTIONS,
            sourceStagiaires: exportStagiaires,
            onItemDone: (current, total) => {
              advanceProgress(total > 1 ? `${eyDoc.code} — ${current}/${total}` : `${eyDoc.code} — ${eyDoc.label}`);
            },
          });
        } else {
          advanceProgress(`${eyDoc.code} — aucun fichier à ajouter`);
        }
      }

      const content = await zip.generateAsync(ZIP_EXPORT_OPTIONS);
      saveAs(content, `${safeName}_Selection_EY.zip`);
      toast.success(`${docsToProcess.length} document(s) exporté(s) !`);
    } catch (e: any) {
      console.error(e);
      toast.error("Erreur : " + (e.message || "Erreur inconnue"));
    } finally {
      setGenerating(false);
      setProgress(0);
      setProgressText("");
    }
  }, [selectedDocs, docStates, safeName, exportStagiaires, appendAutoDocToZip]);

  // Preview a document
  const handlePreview = useCallback(async (eyDoc: EYDocumentItem) => {
    if (eyDoc.autoTemplates.length === 0) return;
    setPreviewLoading(true);
    setPreviewTitle(`${eyDoc.code} — ${eyDoc.label}`);
    setPreviewDoc(eyDoc);
    setPreviewOpen(true);
    try {
      const template = eyDoc.autoTemplates[0];
      const o = mergeOrganisme(organisme);
      const s = exportStagiaires;
      const params = eyDoc.perStagiaire && s.length > 0 ? { stagiaireIdx: 0, fi: 0 } : { fi: 0 };
      const html = generateDocumentById(`ey_${eyDoc.code}`, template, params, o, formation, s);
      setPreviewHtml(html || "<p>Impossible de générer l'aperçu</p>");
    } catch (e) {
      console.error("Preview error:", e);
      setPreviewHtml("<p>Erreur lors de la génération de l'aperçu</p>");
    } finally {
      setPreviewLoading(false);
    }
  }, [organisme, formation, exportStagiaires]);

  // Inject signature into HTML before PDF export
  const injectSignatureIntoHtml = useCallback((html: string, sigDataUrl: string): string => {
    // Find empty signature placeholders and inject the signature image
    // Look for sig-box divs that have "Signature :" and inject after it
    return html.replace(
      /(Signature\s*:?\s*<\/p>)(\s*(?:<p[^>]*style="min-height:\d+px"[^>]*><\/p>)?)/gi,
      `$1<img src="${sigDataUrl}" alt="Signature" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px" />`
    );
  }, []);

  // Download single preview document as PDF
  const handleDownloadPreview = useCallback(async () => {
    if (!previewHtml || !previewDoc) return;
    try {
      const blob = await htmlToPdfBlob(previewHtml);
      saveAs(blob, `${safeName}_${previewDoc.code}.pdf`);
      toast.success("Document téléchargé !");
    } catch (e: any) {
      toast.error("Erreur : " + (e.message || "Erreur inconnue"));
    }
  }, [previewHtml, previewDoc, safeName]);

  // Download with signature
  const handleSignAndDownload = useCallback(async () => {
    if (!previewHtml || !previewDoc || !signature) return;
    try {
      const signedHtml = injectSignatureIntoHtml(previewHtml, signature);
      const blob = await htmlToPdfBlob(signedHtml);
      saveAs(blob, `${safeName}_${previewDoc.code}_signe.pdf`);
      toast.success("Document signé et téléchargé !");
    } catch (e: any) {
      toast.error("Erreur : " + (e.message || "Erreur inconnue"));
    }
  }, [previewHtml, previewDoc, safeName, signature, injectSignatureIntoHtml]);

  const downloadZip = useCallback(async () => {
    setGenerating(true);
    setProgress(0);
    setProgressText("Préparation du dossier contrôle EY...");

    try {
      const zip = new JSZip();
      const safeName = orgName.replace(/[^a-zA-Z0-9_-]/g, "_");
      const docsToProcess = EY_DOCUMENTS.filter(d => {
        const state = docStates.get(d.code);
        return state && state.status !== "not_applicable";
      });
      const total = docsToProcess.length;

      for (let i = 0; i < docsToProcess.length; i++) {
        const eyDoc = docsToProcess[i];
        const state = docStates.get(eyDoc.code)!;
        setProgress(Math.round(((i + 1) / total) * 100));
        setProgressText(`${eyDoc.code} — ${eyDoc.label}`);

        if (state.status === "uploaded" && state.uploadedFile) {
          const buf = await state.uploadedFile.arrayBuffer();
          const ext = state.uploadedFileName?.split(".").pop() || "pdf";
          zip.file(`${safeName}_${eyDoc.code}.${ext}`, buf);
        } else if (state.status === "auto") {
          const result = await generateAutoDoc(eyDoc);
          if (result) {
            zip.file(result.fileName, result.blob);
          }
        }
        // pending docs → add a placeholder text file
        else if (state.status === "pending") {
          zip.file(`${safeName}_${eyDoc.code}_A_FOURNIR.txt`,
            `Document à fournir :\nCode : ${eyDoc.code}\nLibellé : ${eyDoc.label}\nDescription : ${eyDoc.description}\n\nNote : ${state.note || "Aucune"}`
          );
        }

        if (i % 3 === 0) await yieldToBrowser(5);
      }

      const content = await zip.generateAsync(ZIP_EXPORT_OPTIONS);
      saveAs(content, `${safeName}_Controle_EDOF_EY.zip`);
      toast.success("Dossier de contrôle EY exporté !");
    } catch (e: any) {
      console.error(e);
      toast.error("Erreur lors de l'export : " + (e.message || "Erreur inconnue"));
    } finally {
      setGenerating(false);
      setProgress(0);
      setProgressText("");
    }
  }, [docStates, orgName, generateAutoDoc]);

  const groupedDocs = useMemo(() => {
    const groups = new Map<EYCategory, EYDocumentItem[]>();
    for (const cat of Object.keys(EY_CATEGORIES) as EYCategory[]) {
      groups.set(cat, EY_DOCUMENTS.filter(d => d.category === cat));
    }
    return groups;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Contrôle EDOF EY
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Liste exhaustive des éléments probants (contrôle EY/Sauléa — RNCP/RS)
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedDocs.size > 0 && (
            <Button onClick={downloadSelectedZip} disabled={generating} variant="default" className="gap-2">
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {generating ? "Export..." : `Télécharger ${selectedDocs.size} sélectionné(s)`}
            </Button>
          )}
          <Button onClick={downloadZip} disabled={generating} variant="outline" className="gap-2">
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Archive className="w-4 h-4" />}
            {generating ? "Export en cours..." : "Exporter tout ZIP"}
          </Button>
        </div>
      </div>

      {/* Progress */}
      {generating && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">{progressText}</p>
        </div>
      )}

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-card border rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary">{stats.auto}</div>
          <div className="text-xs text-primary">Auto-générés</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-700">{stats.uploaded}</div>
          <div className="text-xs text-green-600">Fournis</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          <div className="text-xs text-orange-500">À fournir</div>
        </div>
        <div className="bg-card border rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-muted-foreground">{stats.na}</div>
          <div className="text-xs text-muted-foreground">N/A</div>
        </div>
      </div>

      {/* Completion bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Complétion du dossier</span>
          <span className="text-muted-foreground">{stats.done}/{stats.total} ({Math.round((stats.done / stats.total) * 100)}%)</span>
        </div>
        <Progress value={(stats.done / stats.total) * 100} className="h-3" />
      </div>

      {/* Document list by category */}
      {Array.from(groupedDocs.entries()).map(([cat, docs]) => {
        const expanded = expandedCats.has(cat);
        const catDone = docs.filter(d => {
          const s = docStates.get(d.code);
          return s && (s.status === "auto" || s.status === "uploaded" || s.status === "not_applicable");
        }).length;
        const allCatSelected = docs.every(d => selectedDocs.has(d.code));
        const someCatSelected = docs.some(d => selectedDocs.has(d.code));
        return (
          <div key={cat} className="border rounded-xl overflow-hidden">
            <div className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={allCatSelected}
                  ref={el => { if (el) el.indeterminate = someCatSelected && !allCatSelected; }}
                  onChange={() => {
                    setSelectedDocs(prev => {
                      const next = new Set(prev);
                      if (allCatSelected) {
                        docs.forEach(d => next.delete(d.code));
                      } else {
                        docs.forEach(d => next.add(d.code));
                      }
                      return next;
                    });
                  }}
                  className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                />
                <button onClick={() => toggleCategory(cat)} className="flex items-center gap-3 flex-1 text-left">
                  {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span className="font-semibold">{EY_CATEGORIES[cat]}</span>
                  <Badge variant="secondary" className="text-xs">{catDone}/{docs.length}</Badge>
                </button>
              </div>
            </div>

            {expanded && (
              <div className="divide-y">
                {docs.map(eyDoc => {
                  const state = docStates.get(eyDoc.code) || { code: eyDoc.code, status: "pending" as EYDocStatus };
                  const cfg = STATUS_CONFIG[state.status];
                  return (
                    <div key={eyDoc.code} className="p-4 flex flex-col sm:flex-row items-start gap-3 bg-background">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={selectedDocs.has(eyDoc.code)}
                          onChange={() => toggleSelectDoc(eyDoc.code)}
                          className="w-4 h-4 mt-0.5 rounded border-border accent-primary cursor-pointer shrink-0"
                        />
                        {cfg.icon}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs font-mono shrink-0">
                              {eyDoc.code}
                            </Badge>
                            <span className="font-medium text-sm">{eyDoc.label}</span>
                            {eyDoc.perStagiaire && (
                              <Badge variant="secondary" className="text-xs">Par stagiaire</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{eyDoc.description}</p>
                          {state.uploadedFileName && (
                            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> {state.uploadedFileName}
                            </p>
                          )}
                          {state.status === "auto" && eyDoc.autoTemplates.length > 0 && (
                            <p className="text-xs text-primary mt-1 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Généré automatiquement par l'application
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Preview button */}
                        {eyDoc.autoTemplates.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-xs"
                            onClick={() => handlePreview(eyDoc)}
                          >
                            <Eye className="w-3 h-3" />
                            Aperçu
                          </Button>
                        )}
                        {/* Download single doc */}
                        {(eyDoc.autoTemplates.length > 0 || state.status === "uploaded") && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-xs"
                            disabled={generating}
                            onClick={() => handleDownloadDoc(eyDoc, state)}
                          >
                            <Download className="w-3 h-3" />
                            PDF
                          </Button>
                        )}
                        {/* Upload button */}
                        <input
                          type="file"
                          className="hidden"
                          ref={el => { if (el) fileInputRefs.current.set(eyDoc.code, el); }}
                          onChange={e => {
                            const f = e.target.files?.[0];
                            if (f) handleFileUpload(eyDoc.code, f);
                            e.target.value = "";
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-xs"
                          onClick={() => fileInputRefs.current.get(eyDoc.code)?.click()}
                        >
                          <Upload className="w-3 h-3" />
                          Fournir
                        </Button>

                        {/* N/A toggle */}
                        <Button
                          variant={state.status === "not_applicable" ? "secondary" : "ghost"}
                          size="sm"
                          className="text-xs"
                          onClick={() => toggleNA(eyDoc.code)}
                        >
                          N/A
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Naming convention reminder */}
      <div className="bg-muted/50 border rounded-lg p-4 text-sm">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Convention de nommage EY</p>
            <p className="text-muted-foreground mt-1">
              Les fichiers sont automatiquement nommés au format <code className="bg-background px-1 rounded text-xs">
              {orgName.replace(/[^a-zA-Z0-9_-]/g, "_")}_Code-document.pdf</code> conformément aux exigences EY/Sauléa.
              Les documents manquants génèrent un fichier <code className="bg-background px-1 rounded text-xs">_A_FOURNIR.txt</code> de rappel.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {previewTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto border rounded-lg bg-white">
            {previewLoading ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Génération de l'aperçu...</span>
              </div>
            ) : (
              <iframe
                srcDoc={previewHtml}
                className="w-full h-[60vh] border-0"
                title="Aperçu du document"
                sandbox="allow-same-origin"
              />
            )}
          </div>

          {signature && (
            <div className="flex items-center gap-3 border rounded-lg p-3 bg-muted/30">
              <img src={signature} alt="Signature" className="h-10 border rounded bg-white p-1" />
              <span className="text-xs text-muted-foreground">Signature enregistrée — sera appliquée au téléchargement</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Fermer
            </Button>
            {signature ? (
              <Button onClick={handleSignAndDownload} className="gap-1">
                <PenTool className="w-4 h-4" />
                Télécharger signé
              </Button>
            ) : (
              <Button onClick={handleDownloadPreview} className="gap-1">
                <Download className="w-4 h-4" />
                Télécharger en PDF
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
