import { useState, useMemo, useCallback, useRef, useEffect } from "react";

import { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, DocStyleConfig } from "@/types/qualiopi";
import { EY_DOCUMENTS, EY_CATEGORIES, EYCategory, EYDocState, EYDocStatus, EYDocumentItem } from "@/lib/eyControlData";
import { generateDocumentById, getStagiaireDays } from "@/lib/documentGenerator";
import { buildPerStagiairePdfFileName, buildDocFolderName, sanitizeFileSegment } from "@/lib/eyExport";
import { mergeStagiaires, mergeOrganisme } from "@/lib/sampleData";
import { setDocStyle } from "@/lib/docBuilder";
import { getActivePdfOptions, htmlToPdfBlob } from "@/lib/pdfExport";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Circle, Upload, Archive, Loader2, FileText, AlertTriangle, Sparkles, XCircle, ChevronDown, ChevronRight, Eye, Download, PenTool, Edit3, RotateCcw, Wand2 } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { useBackgroundJobs } from "@/lib/backgroundJobs";
import { generateAIEvalPack, getCachedPack, clearCachedPack } from "@/lib/aiEvalPack";

const yieldToBrowser = (ms = 0) => new Promise<void>(r => requestAnimationFrame(() => setTimeout(r, ms)));

type PdfBlobOptions = NonNullable<Parameters<typeof htmlToPdfBlob>[1]>;

const ZIP_EXPORT_OPTIONS = {
  type: "blob" as const,
  compression: "STORE" as const,
  streamFiles: true,
};

const hasStagiaireIdentity = (stagiaire: StagiaireInfo | null | undefined): stagiaire is StagiaireInfo => {
  if (!stagiaire) return false;
  // Check any non-empty string field on the stagiaire object
  return Object.values(stagiaire).some(
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

export default function ControleEDOF({ organisme, formation, stagiaires, docStyle, signature }: ControleEDOFProps) {
  const { runJob, hasActive } = useBackgroundJobs();
  // Apply docStyle to the document builder whenever it changes
  useEffect(() => {
    if (docStyle) setDocStyle(docStyle);
  }, [docStyle]);
  const [docStates, setDocStates] = useState<Map<string, EYDocState>>(() => {
    const m = new Map<string, EYDocState>();
    EY_DOCUMENTS.forEach(d => {
      const canAuto = d.autoTemplates.length > 0;
      const hasStatic = !!d.staticFile;
      m.set(d.code, { code: d.code, status: hasStatic ? "uploaded" : canAuto ? "auto" : "pending", uploadedFileName: hasStatic ? d.staticFile?.split("/").pop() : undefined });
    });
    return m;
  });

  const [expandedCats, setExpandedCats] = useState<Set<EYCategory>>(new Set(Object.keys(EY_CATEGORIES) as EYCategory[]));
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const fileInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const [aiPackReady, setAiPackReady] = useState<boolean>(() => !!getCachedPack(formation));
  const [aiPackLoading, setAiPackLoading] = useState(false);

  useEffect(() => {
    setAiPackReady(!!getCachedPack(formation));
  }, [formation]);

  const handleGenerateAIPack = useCallback(async (force = false) => {
    if (!formation.intitule?.trim()) {
      toast.error("Renseignez d'abord l'intitulé de la formation");
      return;
    }
    setAiPackLoading(true);
    try {
      if (force) clearCachedPack(formation);
      await generateAIEvalPack(formation, force);
      setAiPackReady(true);
      toast.success("Pack d'évaluation IA généré — tests de positionnement et exercices prêts ✅");
    } catch (e: any) {
      toast.error("Erreur IA : " + (e?.message || "Échec de génération"));
    } finally {
      setAiPackLoading(false);
    }
  }, [formation]);

  // Preview state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [editedHtml, setEditedHtml] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<EYDocumentItem | null>(null);
  const previewIframeRef = useRef<HTMLIFrameElement>(null);

  // Persistent per-document edited HTML (survives dialog close + reused in exports)
  // Key: `${code}` for non-perStagiaire, `${code}:${stagiaireIdx}` for perStagiaire
  const [editedByDoc, setEditedByDoc] = useState<Map<string, string>>(new Map());
  const editKeyFor = useCallback((code: string, stagIdx?: number) => {
    return typeof stagIdx === "number" ? `${code}:${stagIdx}` : code;
  }, []);
  const saveEditedHtml = useCallback((code: string, html: string, stagIdx?: number) => {
    const key = editKeyFor(code, stagIdx);
    setEditedByDoc(prev => {
      const next = new Map(prev);
      next.set(key, html);
      return next;
    });
  }, [editKeyFor]);
  const clearEditedHtml = useCallback((code: string, stagIdx?: number) => {
    const key = editKeyFor(code, stagIdx);
    setEditedByDoc(prev => {
      if (!prev.has(key)) return prev;
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  }, [editKeyFor]);
  const orgName = organisme.nom || "Organisme";
  const safeName = useMemo(() => orgName.replace(/[^a-zA-Z0-9_-]/g, "_"), [orgName]);
  // Organisme enrichi avec la signature EY (utilisée pour DP/ECF/PV comme signature du dirigeant/représentant)
  const organismeWithSignature = useMemo<OrganismeInfo>(() => {
    if (!signature) return organisme;
    return { ...organisme, signatureUrl: organisme.signatureUrl || signature };
  }, [organisme, signature]);
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
      const o = mergeOrganisme(organismeWithSignature);
      const params = { stagiaireIdx, fi: 0 };
      const editedOverride = editedByDoc.get(editKeyFor(eyDoc.code, stagiaireIdx));
      const html = editedOverride || generateDocumentById(`ey_${eyDoc.code}`, template, params, o, formation, sourceStagiaires);
      if (!html) return null;
      const blob = await htmlToPdfBlob(html, options?.pdfOptions);
      return {
        blob,
        fileName: buildPerStagiairePdfFileName(safeName, eyDoc.code, eyDoc.label, currentStagiaire, stagiaireIdx, "1", formation.dateDebut),
      };
    } catch (e) {
      console.error(`Error generating ${eyDoc.code} for stagiaire ${stagiaireIdx}:`, e);
      return null;
    }
  }, [organisme, organismeWithSignature, formation, exportStagiaires, safeName, editedByDoc, editKeyFor]);

  const generateAutoDoc = useCallback(async (
    eyDoc: EYDocumentItem,
    options?: { pdfOptions?: PdfBlobOptions; sourceStagiaires?: StagiaireInfo[] }
  ): Promise<{ blob: Blob; fileName: string } | null> => {
    if (eyDoc.autoTemplates.length === 0) return null;
    const template = eyDoc.autoTemplates[0];
    const sourceStagiaires = options?.sourceStagiaires ?? exportStagiaires;
    try {
      const o = mergeOrganisme(organismeWithSignature);
      const params = eyDoc.perStagiaire && sourceStagiaires.length > 0 ? { stagiaireIdx: 0, fi: 0 } : { fi: 0 };
      const editedOverride = editedByDoc.get(editKeyFor(eyDoc.code));
      const html = editedOverride || generateDocumentById(`ey_${eyDoc.code}`, template, params, o, formation, sourceStagiaires);
      if (!html) return null;
      const blob = await htmlToPdfBlob(html, options?.pdfOptions);
      return { blob, fileName: `${safeName}_${eyDoc.code}.pdf` };
    } catch (e) {
      console.error(`Error generating ${eyDoc.code}:`, e);
      return null;
    }
  }, [organisme, organismeWithSignature, formation, exportStagiaires, safeName, editedByDoc, editKeyFor]);

  const appendAutoDocToZip = useCallback(async (
    zip: JSZip,
    eyDoc: EYDocumentItem,
    options?: {
      pdfOptions?: PdfBlobOptions;
      sourceStagiaires?: StagiaireInfo[];
      onItemDone?: (current: number, total: number) => void;
      folderByDocument?: boolean;
    }
  ) => {
    const sourceStagiaires = options?.sourceStagiaires ?? exportStagiaires;

    if (eyDoc.perStagiaire && sourceStagiaires.length > 0) {
      const docFolder = options?.folderByDocument ? buildDocFolderName(eyDoc.label) : "";

      for (let si = 0; si < sourceStagiaires.length; si++) {
        const stagiaire = sourceStagiaires[si];

        // ----- Mode "un fichier par jour de formation" -----
        if (eyDoc.perDay) {
          const days = getStagiaireDays(stagiaire, formation);
          const stagFolder = `${sanitizeFileSegment(`${stagiaire.prenom || ""}_${stagiaire.nom || ""}`) || `stagiaire_${si + 1}`}`;
          for (let di = 0; di < days.length; di++) {
            try {
              const o = mergeOrganisme(organismeWithSignature);
              const params = { stagiaireIdx: si, fi: 0, dayIdx: di };
              const html = generateDocumentById(`ey_${eyDoc.code}`, eyDoc.autoTemplates[0], params, o, formation, sourceStagiaires);
              if (html) {
                const blob = await htmlToPdfBlob(html, options?.pdfOptions);
                const dayName = `${eyDoc.code}_${stagFolder}_Jour_${String(di + 1).padStart(2, "0")}.pdf`;
                const filePath = docFolder ? `${docFolder}/${stagFolder}/${dayName}` : `${stagFolder}/${dayName}`;
                zip.file(filePath, blob);
              }
            } catch (e) {
              console.error(`Error generating ${eyDoc.code} day ${di + 1} for stagiaire ${si}:`, e);
            }
            await yieldToBrowser((di + 1) % 3 === 0 ? 200 : 50);
          }
          options?.onItemDone?.(si + 1, sourceStagiaires.length);
          continue;
        }

        const result = await generateAutoDocForStagiaire(eyDoc, si, {
          pdfOptions: options?.pdfOptions,
          sourceStagiaires,
        });
        if (result) {
          const filePath = docFolder ? `${docFolder}/${result.fileName}` : result.fileName;
          zip.file(filePath, result.blob);
        }
        options?.onItemDone?.(si + 1, sourceStagiaires.length);
        // More aggressive GC pauses for mass export
        const yieldMs = (si + 1) % 5 === 0 ? 400 : 100;
        await yieldToBrowser(yieldMs);
      }
      return;
    }

    const result = await generateAutoDoc(eyDoc, {
      pdfOptions: options?.pdfOptions,
      sourceStagiaires,
    });

    if (result) zip.file(result.fileName, result.blob);
    options?.onItemDone?.(1, 1);
  }, [exportStagiaires, generateAutoDoc, generateAutoDocForStagiaire, formation, organismeWithSignature]);

  const handleDownloadDoc = useCallback(async (eyDoc: EYDocumentItem, state: EYDocState) => {
    if (state.status === "uploaded" && state.uploadedFile) {
      saveAs(state.uploadedFile, state.uploadedFileName || `${eyDoc.code}.pdf`);
      return;
    }

    // Handle static file download
    if (eyDoc.staticFile) {
      try {
        const response = await fetch(eyDoc.staticFile);
        const blob = await response.blob();
        const fileName = eyDoc.staticFile.split("/").pop() || `${eyDoc.code}.docx`;
        saveAs(blob, fileName);
        toast.success(`${eyDoc.label} téléchargé !`);
      } catch (e: any) {
        toast.error("Erreur de téléchargement : " + (e.message || "Erreur inconnue"));
      }
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
        const isBacPro = eyDoc.category === "controle_bac_pro";
        await appendAutoDocToZip(zip, eyDoc, {
          pdfOptions: MASS_EXPORT_PDF_OPTIONS,
          folderByDocument: isBacPro,
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

  const downloadSelectedZip = useCallback(() => {
    if (selectedDocs.size === 0) {
      toast.error("Sélectionnez au moins un document");
      return;
    }
    const docsToProcess = EY_DOCUMENTS.filter(d => selectedDocs.has(d.code));
    const statesSnap = new Map(docStates);
    const stagSnap = exportStagiaires;
    const safeNameSnap = safeName;

    runJob({
      label: `Sélection EY (${docsToProcess.length} docs)`,
      fileName: `${safeNameSnap}_Selection_EY.zip`,
      run: async (reporter) => {
        const zip = new JSZip();
        const totalItems = docsToProcess.reduce((count, eyDoc) => {
          const state = statesSnap.get(eyDoc.code);
          if (state?.status === "uploaded" || eyDoc.autoTemplates.length === 0 || !eyDoc.perStagiaire || stagSnap.length === 0) {
            return count + 1;
          }
          return count + stagSnap.length;
        }, 0);
        let completedItems = 0;

        const advanceProgress = (label: string) => {
          completedItems += 1;
          reporter.setProgress((completedItems / Math.max(totalItems, 1)) * 95);
          reporter.setMessage(label);
        };

        for (const eyDoc of docsToProcess) {
          const state = statesSnap.get(eyDoc.code);

          if (state?.status === "uploaded" && state.uploadedFile) {
            const buf = await state.uploadedFile.arrayBuffer();
            const ext = state.uploadedFileName?.split(".").pop() || "pdf";
            zip.file(`${safeNameSnap}_${eyDoc.code}.${ext}`, buf);
            advanceProgress(`${eyDoc.code} — fichier fourni`);
          } else if (eyDoc.staticFile) {
            try {
              const response = await fetch(eyDoc.staticFile);
              const blob = await response.blob();
              const fileName = eyDoc.staticFile.split("/").pop() || `${eyDoc.code}.docx`;
              zip.file(fileName, blob);
            } catch (e) {
              console.error(`Error fetching static file ${eyDoc.staticFile}:`, e);
            }
            advanceProgress(`${eyDoc.code} — fichier pré-fourni`);
          } else if (eyDoc.autoTemplates.length > 0) {
            const isBacPro = eyDoc.category === "controle_bac_pro";
            await appendAutoDocToZip(zip, eyDoc, {
              pdfOptions: getActivePdfOptions(),
              sourceStagiaires: stagSnap,
              folderByDocument: isBacPro,
              onItemDone: (current, total) => {
                advanceProgress(total > 1 ? `${eyDoc.code} — ${current}/${total}` : `${eyDoc.code} — ${eyDoc.label}`);
              },
            });
          } else {
            advanceProgress(`${eyDoc.code} — aucun fichier à ajouter`);
          }
        }

        reporter.setMessage("Compression du ZIP...");
        return await zip.generateAsync(ZIP_EXPORT_OPTIONS);
      },
    });
  }, [selectedDocs, docStates, safeName, exportStagiaires, appendAutoDocToZip, runJob]);

  // Preview a document (reuses persisted edits if any)
  const handlePreview = useCallback(async (eyDoc: EYDocumentItem) => {
    if (eyDoc.autoTemplates.length === 0) return;
    setPreviewLoading(true);
    setPreviewTitle(`${eyDoc.code} — ${eyDoc.label}`);
    setPreviewDoc(eyDoc);
    setPreviewOpen(true);
    setIsEditing(false);
    try {
      const template = eyDoc.autoTemplates[0];
      const o = mergeOrganisme(organismeWithSignature);
      const s = exportStagiaires;
      const params = eyDoc.perStagiaire && s.length > 0 ? { stagiaireIdx: 0, fi: 0 } : { fi: 0 };
      const html = generateDocumentById(`ey_${eyDoc.code}`, template, params, o, formation, s);
      const content = html || "<p>Impossible de générer l'aperçu</p>";
      setPreviewHtml(content);
      const key = eyDoc.perStagiaire ? editKeyFor(eyDoc.code, 0) : editKeyFor(eyDoc.code);
      const savedEdit = editedByDoc.get(key);
      setEditedHtml(savedEdit || content);
    } catch (e) {
      console.error("Preview error:", e);
      const err = "<p>Erreur lors de la génération de l'aperçu</p>";
      setPreviewHtml(err);
      setEditedHtml(err);
    } finally {
      setPreviewLoading(false);
    }
  }, [organisme, organismeWithSignature, formation, exportStagiaires, editedByDoc, editKeyFor]);

  // Persist current iframe content into the store for the previewed doc
  const persistCurrentEdit = useCallback(() => {
    if (!previewDoc) return;
    const iframe = previewIframeRef.current;
    if (!iframe?.contentDocument?.body) return;
    const updatedHtml = `<!DOCTYPE html><html>${iframe.contentDocument.documentElement.innerHTML}</html>`;
    setEditedHtml(updatedHtml);
    const stagIdx = previewDoc.perStagiaire ? 0 : undefined;
    if (updatedHtml && updatedHtml !== previewHtml) {
      saveEditedHtml(previewDoc.code, updatedHtml, stagIdx);
    }
  }, [previewDoc, previewHtml, saveEditedHtml]);

  // Toggle edit mode — sync content from iframe when entering/exiting
  const toggleEditMode = useCallback(() => {
    if (isEditing) {
      const iframe = previewIframeRef.current;
      if (iframe?.contentDocument?.body) {
        iframe.contentDocument.body.contentEditable = "false";
      }
      persistCurrentEdit();
      setIsEditing(false);
      toast.success("Modifications enregistrées pour ce document");
    } else {
      setIsEditing(true);
      requestAnimationFrame(() => {
        const iframe = previewIframeRef.current;
        if (iframe?.contentDocument?.body) {
          iframe.contentDocument.body.contentEditable = "true";
          iframe.contentDocument.body.style.outline = "none";
          iframe.contentDocument.body.focus();
        }
      });
    }
  }, [isEditing, persistCurrentEdit]);

  // Enable contentEditable on iframe load when in edit mode
  const handleIframeLoad = useCallback(() => {
    if (!isEditing) return;
    requestAnimationFrame(() => {
      const iframe = previewIframeRef.current;
      if (iframe?.contentDocument?.body) {
        iframe.contentDocument.body.contentEditable = "true";
        iframe.contentDocument.body.style.outline = "none";
      }
    });
  }, [isEditing]);

  // Get the current HTML for export (edited or original)
  const getCurrentHtml = useCallback((): string => {
    if (isEditing) {
      const iframe = previewIframeRef.current;
      if (iframe?.contentDocument?.body) {
        return `<!DOCTYPE html><html>${iframe.contentDocument.documentElement.innerHTML}</html>`;
      }
    }
    return editedHtml;
  }, [isEditing, editedHtml]);

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
    if (!previewDoc) return;
    const html = getCurrentHtml();
    if (!html) return;
    try {
      const blob = await htmlToPdfBlob(html);
      saveAs(blob, `${safeName}_${previewDoc.code}.pdf`);
      toast.success("Document téléchargé !");
    } catch (e: any) {
      toast.error("Erreur : " + (e.message || "Erreur inconnue"));
    }
  }, [getCurrentHtml, previewDoc, safeName]);

  // Download with signature
  const handleSignAndDownload = useCallback(async () => {
    if (!previewDoc || !signature) return;
    const html = getCurrentHtml();
    if (!html) return;
    try {
      const signedHtml = injectSignatureIntoHtml(html, signature);
      const blob = await htmlToPdfBlob(signedHtml);
      saveAs(blob, `${safeName}_${previewDoc.code}_signe.pdf`);
      toast.success("Document signé et téléchargé !");
    } catch (e: any) {
      toast.error("Erreur : " + (e.message || "Erreur inconnue"));
    }
  }, [getCurrentHtml, previewDoc, safeName, signature, injectSignatureIntoHtml]);

  const downloadZip = useCallback(async () => {
    setGenerating(true);
    setProgress(0);
    setProgressText("Préparation du dossier contrôle EY...");

    try {
      const zip = new JSZip();
      const docsToProcess = EY_DOCUMENTS.filter(d => {
        const state = docStates.get(d.code);
        return state && state.status !== "not_applicable";
      });
      const totalItems = docsToProcess.reduce((count, eyDoc) => {
        const state = docStates.get(eyDoc.code);
        if (!state) return count;
        if (state.status === "uploaded" || state.status === "pending" || eyDoc.autoTemplates.length === 0 || !eyDoc.perStagiaire || exportStagiaires.length === 0) {
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

      for (let i = 0; i < docsToProcess.length; i++) {
        const eyDoc = docsToProcess[i];
        const state = docStates.get(eyDoc.code)!;

        if (state.status === "uploaded" && state.uploadedFile) {
          const buf = await state.uploadedFile.arrayBuffer();
          const ext = state.uploadedFileName?.split(".").pop() || "pdf";
          zip.file(`${safeName}_${eyDoc.code}.${ext}`, buf);
          advanceProgress(`${eyDoc.code} — fichier fourni`);
        } else if (state.status === "auto") {
          const isBacPro = eyDoc.category === "controle_bac_pro";
          await appendAutoDocToZip(zip, eyDoc, {
            pdfOptions: MASS_EXPORT_PDF_OPTIONS,
            sourceStagiaires: exportStagiaires,
            folderByDocument: isBacPro,
            onItemDone: (current, total) => {
              advanceProgress(total > 1 ? `${eyDoc.code} — ${current}/${total}` : `${eyDoc.code} — ${eyDoc.label}`);
            },
          });
        }
        // pending docs → add a placeholder text file
        else if (state.status === "pending") {
          zip.file(`${safeName}_${eyDoc.code}_A_FOURNIR.txt`,
            `Document à fournir :\nCode : ${eyDoc.code}\nLibellé : ${eyDoc.label}\nDescription : ${eyDoc.description}\n\nNote : ${state.note || "Aucune"}`
          );
          advanceProgress(`${eyDoc.code} — à fournir`);
        }

        // Longer pause between document types for GC
        await yieldToBrowser(i % 3 === 0 ? 300 : 50);
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
  }, [appendAutoDocToZip, docStates, exportStagiaires, safeName]);

  const groupedDocs = useMemo(() => {
    const groups = new Map<EYCategory, EYDocumentItem[]>();
    for (const cat of Object.keys(EY_CATEGORIES) as EYCategory[]) {
      groups.set(cat, EY_DOCUMENTS.filter(d => d.category === cat));
    }
    return groups;
  }, []);

  // Flat list sorted numerically 1-68 for sequential display (supports suffixes like "34B")
  const sequentialDocs = useMemo(() => {
    return [...EY_DOCUMENTS]
      .filter(d => /^\d+[A-Z]?$/.test(d.code))
      .sort((a, b) => {
        const na = parseInt(a.code);
        const nb = parseInt(b.code);
        if (na !== nb) return na - nb;
        return a.code.localeCompare(b.code);
      });
  }, []);

  // Bac Pro Logistique documents (BPL codes)
  const bacProDocs = useMemo(() => {
    return EY_DOCUMENTS.filter(d => d.category === "controle_bac_pro");
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
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={() => handleGenerateAIPack(!aiPackReady ? false : true)}
            disabled={aiPackLoading}
            variant={aiPackReady ? "outline" : "default"}
            className="gap-2"
            title="Génère 10 QCM début, 10 QCM fin, exercice intermédiaire et évaluation finale cohérents avec la formation"
          >
            {aiPackLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            {aiPackLoading
              ? "Génération IA..."
              : aiPackReady
                ? "Régénérer pack IA"
                : "Générer évaluations IA"}
            {aiPackReady && !aiPackLoading && <CheckCircle2 className="w-4 h-4 text-green-600" />}
          </Button>
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

      {!aiPackReady && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <strong>Pack d'évaluation IA non généré.</strong> Les documents IA (tests de positionnement, exercices, évaluation finale) afficheront un message vide.
            Cliquez sur <em>« Générer évaluations IA »</em> en haut à droite pour produire un contenu 100% cohérent avec la formation « {formation.intitule || "(intitulé à renseigner)"} ».
          </div>
        </div>
      )}

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
      {/* Sequential document list 1-68 */}
      <div className="border rounded-xl overflow-hidden">
        <div className="w-full flex items-center justify-between p-4 bg-card">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={sequentialDocs.length > 0 && sequentialDocs.every(d => selectedDocs.has(d.code))}
              ref={el => { if (el) el.indeterminate = sequentialDocs.some(d => selectedDocs.has(d.code)) && !sequentialDocs.every(d => selectedDocs.has(d.code)); }}
              onChange={() => {
                setSelectedDocs(prev => {
                  const next = new Set(prev);
                  const allSelected = sequentialDocs.every(d => next.has(d.code));
                  if (allSelected) {
                    sequentialDocs.forEach(d => next.delete(d.code));
                  } else {
                    sequentialDocs.forEach(d => next.add(d.code));
                  }
                  return next;
                });
              }}
              className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
            />
            <span className="font-semibold">Documents EDOF — 1 à 68</span>
            <Badge variant="secondary" className="text-xs">
              {sequentialDocs.filter(d => {
                const s = docStates.get(d.code);
                return s && (s.status === "auto" || s.status === "uploaded" || s.status === "not_applicable");
              }).length}/{sequentialDocs.length}
            </Badge>
          </div>
        </div>

        <div className="divide-y">
          {sequentialDocs.map(eyDoc => {
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
                      <Badge variant="outline" className="text-xs text-muted-foreground">
                        {EY_CATEGORIES[eyDoc.category]}
                      </Badge>
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
                    {eyDoc.staticFile && state.status !== "uploaded" && (
                      <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Fichier pré-fourni (DOCX)
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
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
                  {(eyDoc.autoTemplates.length > 0 || state.status === "uploaded" || eyDoc.staticFile) && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-xs"
                      disabled={generating}
                      onClick={() => handleDownloadDoc(eyDoc, state)}
                    >
                      <Download className="w-3 h-3" />
                      {eyDoc.staticFile ? "DOCX" : "PDF"}
                    </Button>
                  )}
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
      </div>

      {/* Bac Pro Logistique section */}
      {bacProDocs.length > 0 && (
        <div className="border rounded-xl overflow-hidden">
          <div className="w-full flex items-center justify-between p-4 bg-card">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={bacProDocs.length > 0 && bacProDocs.every(d => selectedDocs.has(d.code))}
                ref={el => { if (el) el.indeterminate = bacProDocs.some(d => selectedDocs.has(d.code)) && !bacProDocs.every(d => selectedDocs.has(d.code)); }}
                onChange={() => {
                  setSelectedDocs(prev => {
                    const next = new Set(prev);
                    const allSelected = bacProDocs.every(d => next.has(d.code));
                    if (allSelected) {
                      bacProDocs.forEach(d => next.delete(d.code));
                    } else {
                      bacProDocs.forEach(d => next.add(d.code));
                    }
                    return next;
                  });
                }}
                className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
              />
              <span className="font-semibold">{EY_CATEGORIES["controle_bac_pro"]}</span>
              <Badge variant="secondary" className="text-xs">
                {bacProDocs.filter(d => {
                  const s = docStates.get(d.code);
                  return s && (s.status === "auto" || s.status === "uploaded" || s.status === "not_applicable");
                }).length}/{bacProDocs.length}
              </Badge>
            </div>
          </div>

          <div className="divide-y">
            {bacProDocs.map(eyDoc => {
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
                      {eyDoc.staticFile && state.status !== "uploaded" && (
                        <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                          <FileText className="w-3 h-3" /> Fichier pré-fourni (DOCX)
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
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
                    {(eyDoc.autoTemplates.length > 0 || state.status === "uploaded" || eyDoc.staticFile) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-xs"
                        disabled={generating}
                        onClick={() => handleDownloadDoc(eyDoc, state)}
                      >
                        <Download className="w-3 h-3" />
                        {eyDoc.staticFile ? "DOCX" : "PDF"}
                      </Button>
                    )}
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
        </div>
      )}


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

      {/* Preview / Edit Dialog */}
      <Dialog open={previewOpen} onOpenChange={(open) => {
        if (!open) {
          // Save any pending edits into the persistent store before closing
          if (isEditing) {
            persistCurrentEdit();
            setIsEditing(false);
          }
        }
        setPreviewOpen(open);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {previewTitle}
              {isEditing && (
                <Badge variant="secondary" className="text-xs ml-2">Mode édition</Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {isEditing && (
            <div className="flex items-center gap-2 px-1 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
              <Edit3 className="w-3.5 h-3.5 shrink-0" />
              <span>Cliquez directement dans le document pour modifier le texte. Les modifications seront conservées pour l'export.</span>
            </div>
          )}

          <div className="flex-1 overflow-auto border rounded-lg bg-white">
            {previewLoading ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Génération de l'aperçu...</span>
              </div>
            ) : (
              <iframe
                ref={previewIframeRef}
                srcDoc={editedHtml}
                className="w-full h-[60vh] border-0"
                title="Aperçu du document"
                sandbox="allow-same-origin"
                onLoad={handleIframeLoad}
              />
            )}
          </div>

          {signature && (
            <div className="flex items-center gap-3 border rounded-lg p-3 bg-muted/30">
              <img src={signature} alt="Signature" className="h-10 border rounded bg-white p-1" />
              <span className="text-xs text-muted-foreground">Signature enregistrée — sera appliquée au téléchargement</span>
            </div>
          )}

          <div className="flex justify-between gap-2 pt-2">
            <div className="flex gap-2">
              {/* Edit toggle */}
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                onClick={toggleEditMode}
                className="gap-1"
              >
                <Edit3 className="w-4 h-4" />
                {isEditing ? "Terminer l'édition" : "Éditer"}
              </Button>

              {/* Reset to original — also clears persisted edit */}
              {editedHtml !== previewHtml && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditedHtml(previewHtml);
                    setIsEditing(false);
                    if (previewDoc) {
                      const stagIdx = previewDoc.perStagiaire ? 0 : undefined;
                      clearEditedHtml(previewDoc.code, stagIdx);
                      toast.info("Modifications réinitialisées");
                    }
                  }}
                  className="gap-1 text-muted-foreground"
                >
                  <RotateCcw className="w-4 h-4" />
                  Réinitialiser
                </Button>
              )}
            </div>

            <div className="flex gap-2">
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
