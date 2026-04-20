import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import mammoth from "mammoth";
import { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, CRITERES_INFO, DocEntry, DocStyleConfig, DEFAULT_DOC_STYLE } from "@/types/qualiopi";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { generateBookQualiopi } from "@/lib/bookQualiopi";
import { setDocStyle } from "@/lib/docBuilder";
import { SAMPLE_FORMATIONS, mergeStagiaires, mergeOrganisme } from "@/lib/sampleData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronRight, X, Loader2, FolderOpen, RefreshCw, Archive, AlertTriangle, Cloud } from "lucide-react";
import { saveToDrive } from "@/lib/googleDrive";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import DocStyleConfigPanel from "./DocStyleConfigPanel";
import { downloadAsWord, htmlToWordBlob } from "@/lib/wordExport";
import { generateExcelTableauBordPerformance, generateExcelTableauSuiviParcours, generateExcelIndicateursPrevisionnelsVAE, excelToBlob } from "@/lib/xlsxGenerator";
import { downloadAsPdf, htmlToPdfBlob } from "@/lib/pdfExport";
import { processDocxTemplate, processMailDocxTemplate, DOCX_TEMPLATE_FILES, MAIL_TEMPLATE_FILES } from "@/lib/docxTemplateExport";
import { auditImportedFolder, ImportAuditResult } from "@/lib/importInspector";
import {
  buildDocumentFileName,
  buildGenericFileName,
  ExportFormat,
  getPreferredExtension,
  PER_STAGIAIRE_TEMPLATES,
  replaceFileExtension,
  shortCriterePath,
} from "@/lib/fileNaming";

const yieldToBrowser = (delayMs = 0) =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      window.setTimeout(resolve, delayMs);
    });
  });

/** Build preview title without duplicating stagiaire name already in doc.nom */
function docTitle(docNom: string, s?: StagiaireInfo | null): string {
  if (!s) return docNom;
  const fullName = `${s.prenom} ${s.nom}`.trim();
  if (!fullName) return docNom;
  if (docNom.includes(fullName)) return docNom;
  return `${docNom} – ${fullName}`;
}

interface DocumentGeneratorProps {
  organisme: OrganismeInfo;
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
  criteres: CritereData[];
}

const DocumentGenerator = ({ organisme, formation, stagiaires }: DocumentGeneratorProps) => {
  const [expandedCriteres, setExpandedCriteres] = useState<Set<number>>(new Set());
  
  const [expandedIndicateurs, setExpandedIndicateurs] = useState<Set<number>>(new Set());
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState(false);
  const [editedContents, setEditedContents] = useState<Map<string, string>>(new Map());
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [selectedStagiaire, setSelectedStagiaire] = useState<number>(0);
  const [docStyle, setDocStyleState] = useState<DocStyleConfig>({ ...DEFAULT_DOC_STYLE });
  const [exportFormat, setExportFormat] = useState<ExportFormat>("pdf");
  const [importAudit, setImportAudit] = useState<ImportAuditResult | null>(null);
  const [importingFolder, setImportingFolder] = useState(false);
  const [renamingFolder, setRenamingFolder] = useState(false);
  const [uploadingDrive, setUploadingDrive] = useState(false);
  const [generationProgressText, setGenerationProgressText] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (folderInputRef.current) {
      folderInputRef.current.setAttribute("webkitdirectory", "");
      folderInputRef.current.setAttribute("directory", "");
    }
  }, []);

  const handleStyleChange = useCallback((newStyle: DocStyleConfig) => {
    setDocStyleState(newStyle);
    setDocStyle(newStyle);
    setEditedContents(new Map());
  }, []);

  const mergedOrganisme = useMemo(() => mergeOrganisme(organisme), [organisme]);
  const selectedFormation = useMemo(() => (
    formation.intitule
      ? { ...SAMPLE_FORMATIONS[0], ...Object.fromEntries(Object.entries(formation).filter(([, value]) => value && String(value).trim())) }
      : SAMPLE_FORMATIONS[0]
  ), [formation]);
  const allStagiaires = useMemo(() => mergeStagiaires(stagiaires), [stagiaires]);
  const catalog = useMemo(() => getFullCatalog(organisme, formation, stagiaires), [organisme, formation, stagiaires]);
  const progress = catalog.length ? Math.round((generated.size / catalog.length) * 100) : 0;
  const importIssues = useMemo(
    () => importAudit?.matches.filter((match) => match.status === "missing" || match.status === "near") ?? [],
    [importAudit],
  );

  const getStaticFileUrl = useCallback((doc: DocEntry): string | null => {
    if (doc.template !== "pdf_static") return null;
    if (doc.params?.pdfFile) return `/docs/${doc.params.pdfFile}`;
    if (doc.params?.pdfUrl) return String(doc.params.pdfUrl);
    return null;
  }, []);

  const getStaticFileName = useCallback((doc: DocEntry): string | null => {
    if (doc.params?.pdfFile) return String(doc.params.pdfFile);
    if (doc.params?.pdfUrl) return String(doc.params.pdfUrl).split('/').pop() || null;
    return null;
  }, []);

  const getDocExtension = useCallback((doc: DocEntry) => {
    const staticFile = getStaticFileName(doc);
    if (doc.template === "pdf_static" && staticFile) {
      return staticFile.match(/\.[^.]+$/)?.[0]?.toLowerCase() || ".pdf";
    }
    return getPreferredExtension(doc.template, exportFormat);
  }, [exportFormat, getStaticFileName]);

  const getDocStagiaire = useCallback((doc: DocEntry, fallbackIdx?: number) => {
    const paramIdx = typeof doc.params?.stagiaireIdx === "number" ? doc.params.stagiaireIdx : undefined;
    const resolvedIdx = paramIdx ?? fallbackIdx;
    return typeof resolvedIdx === "number" && resolvedIdx >= 0 ? (allStagiaires[resolvedIdx] ?? null) : null;
  }, [allStagiaires]);

  const buildCatalogFileName = useCallback((doc: DocEntry, stagiaire?: StagiaireInfo | null, extension?: string) => {
    return buildDocumentFileName(
      doc,
      mergedOrganisme.nom,
      mergedOrganisme.version,
      mergedOrganisme.dateMaj,
      extension ?? getDocExtension(doc),
      stagiaire,
    );
  }, [mergedOrganisme, getDocExtension]);

  const toggleCritere = (num: number) => {
    setExpandedCriteres((prev) => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  };

  const toggleIndicateur = (num: number) => {
    setExpandedIndicateurs((prev) => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  };

  const generateContent = useCallback((doc: DocEntry, stagiaireIdx?: number) => {
    const editKey = `${doc.id}_s${stagiaireIdx ?? "all"}`;
    if (editedContents.has(editKey)) return editedContents.get(editKey)!;

    const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
    if (isPerStagiaire && stagiaireIdx !== undefined) {
      const singleStagiaire = [allStagiaires[stagiaireIdx]];
      const overriddenParams = { ...doc.params, stagiaireIdx: 0 };
      return generateDocumentById(doc.id, doc.template, overriddenParams, organisme, formation, singleStagiaire);
    }
    return generateDocumentById(doc.id, doc.template, doc.params, organisme, formation, stagiaires);
  }, [organisme, formation, stagiaires, allStagiaires, editedContents]);

  const buildImportReport = useCallback((audit: ImportAuditResult) => {
    const lines = [
      "RAPPORT DE PRE-CONTROLE IMPORT",
      audit.sourceMessage,
      `Fichiers attendus : ${audit.totalExpected}`,
      `Fichiers presents : ${audit.totalImported}`,
      `Correspondances exactes : ${audit.exactCount}`,
      `Correspondances normalisees : ${audit.normalizedCount}`,
      `Fichiers proches : ${audit.nearCount}`,
      `Fichiers manquants : ${audit.missingCount}`,
      "",
    ];

    const issues = audit.matches.filter((match) => match.status === "missing" || match.status === "near");
    if (issues.length === 0) {
      lines.push("Aucune anomalie detectee.");
      return lines.join("\n");
    }

    issues.forEach((match, index) => {
      lines.push(`ANOMALIE ${index + 1}`);
      lines.push(`Nom demande : ${match.expected.requestedName}`);
      lines.push(`Chemin recherche : ${match.expected.searchedPath}`);
      lines.push(`Fichier proche trouve : ${match.closestFile?.relativePath ?? "Aucun"}`);
      lines.push(`Raison probable : ${match.probableReason}`);
      lines.push("");
    });

    return lines.join("\n");
  }, []);

  const handlePreview = async (doc: DocEntry) => {
    // Clean up previous blob URL
    if (previewBlobUrl) { URL.revokeObjectURL(previewBlobUrl); setPreviewBlobUrl(null); }

    // Static PDF → embed in iframe
    if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
      const pdfUrl = getStaticFileUrl(doc)!;
      setPreviewContent(null);
      setPreviewBlobUrl(pdfUrl);
      setPreviewTitle(doc.nom);
      setCurrentDocId(doc.id);
      setEditing(false);
      setGenerated((prev) => new Set(prev).add(doc.id));
      return;
    }

    // DOCX template files (factures, diplôme) → convert to HTML via mammoth
    if (DOCX_TEMPLATE_FILES[doc.template]) {
      try {
        const blob = await processDocxTemplate(DOCX_TEMPLATE_FILES[doc.template], mergedOrganisme);
        const arrayBuffer = await blob.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setPreviewBlobUrl(null);
        setPreviewContent(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;padding:24px;max-width:800px;margin:auto}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccc;padding:6px 10px}img{max-width:100%}</style></head><body>${result.value}</body></html>`);
        setPreviewTitle(doc.nom);
        setCurrentDocId(doc.id);
        setEditing(false);
        setGenerated((prev) => new Set(prev).add(doc.id));
      } catch (e) {
        toast.error("Impossible de prévisualiser ce fichier DOCX");
      }
      return;
    }

    // Mail DOCX templates → convert to HTML via mammoth
    if (MAIL_TEMPLATE_FILES[doc.template] && typeof doc.params?.stagiaireIdx === "number") {
      const s = allStagiaires[doc.params.stagiaireIdx];
      if (s) {
        try {
          const blob = await processMailDocxTemplate(MAIL_TEMPLATE_FILES[doc.template], mergedOrganisme, selectedFormation, s);
          const arrayBuffer = await blob.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer });
          setPreviewBlobUrl(null);
          setPreviewContent(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;padding:24px;max-width:800px;margin:auto}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccc;padding:6px 10px}img{max-width:100%}</style></head><body>${result.value}</body></html>`);
          setPreviewTitle(doc.nom);
          setCurrentDocId(doc.id);
          setEditing(false);
          setGenerated((prev) => new Set(prev).add(doc.id));
        } catch (e) {
          toast.error("Impossible de prévisualiser ce fichier DOCX");
        }
      }
      return;
    }

    // Standard HTML-generated documents
    setPreviewBlobUrl(null);
    const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
    const hasOwnStagiaire = typeof doc.params?.stagiaireIdx === "number";
    if (hasOwnStagiaire) {
      const content = generateDocumentById(doc.id, doc.template, doc.params, organisme, formation, allStagiaires);
      const currentStagiaire = allStagiaires[doc.params!.stagiaireIdx as number] || null;
      setPreviewContent(content);
      setPreviewTitle(docTitle(doc.nom, currentStagiaire));
    } else if (isPerStagiaire && selectedStagiaire === -1) {
      const allContent = allStagiaires.map((_, index) => generateContent(doc, index)).join("<hr style='border:2px solid #1e3a7b;margin:30px 0'>");
      setPreviewContent(allContent);
      setPreviewTitle(`${doc.nom} – Tous les stagiaires (${allStagiaires.length})`);
    } else {
      const content = generateContent(doc, isPerStagiaire ? selectedStagiaire : undefined);
      const currentStagiaire = getDocStagiaire(doc, isPerStagiaire ? selectedStagiaire : undefined);
      setPreviewContent(content);
      setPreviewTitle(docTitle(doc.nom, currentStagiaire));
    }
    setCurrentDocId(doc.id);
    setEditing(false);
    setGenerated((prev) => new Set(prev).add(doc.id));
  };

  const downloadFile = async (content: string, fileName: string) => {
    if (exportFormat === "pdf") {
      await downloadAsPdf(content, fileName);
      return;
    }
    await downloadAsWord(content, fileName);
  };

  const handleDownload = async (doc: DocEntry) => {
    if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
      const resp = await fetch(getStaticFileUrl(doc)!);
      const blob = await resp.blob();
      saveAs(blob, buildCatalogFileName(doc));
      return;
    }

    // Handle .docx template files (factures IND 17)
    if (DOCX_TEMPLATE_FILES[doc.template]) {
      const blob = await processDocxTemplate(DOCX_TEMPLATE_FILES[doc.template], mergedOrganisme);
      saveAs(blob, buildCatalogFileName(doc, undefined, ".docx"));
      return;
    }

    // Handle mail .docx templates (per-stagiaire)
    if (MAIL_TEMPLATE_FILES[doc.template] && typeof doc.params?.stagiaireIdx === "number") {
      const s = allStagiaires[doc.params.stagiaireIdx];
      if (s) {
        const blob = await processMailDocxTemplate(MAIL_TEMPLATE_FILES[doc.template], mergedOrganisme, selectedFormation, s);
        saveAs(blob, buildCatalogFileName(doc, s, ".docx"));
      }
      return;
    }

    const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
    const hasOwnStagiaire = typeof doc.params?.stagiaireIdx === "number";
    if (hasOwnStagiaire) {
      const content = generateDocumentById(doc.id, doc.template, doc.params, organisme, formation, allStagiaires);
      const stagiaire = allStagiaires[doc.params!.stagiaireIdx as number] || null;
      await downloadFile(content, buildCatalogFileName(doc, stagiaire));
      return;
    }
    if (isPerStagiaire && selectedStagiaire === -1) {
      for (const [index, stagiaire] of allStagiaires.entries()) {
        const content = generateContent(doc, index);
        await downloadFile(content, buildCatalogFileName(doc, stagiaire));
      }
      return;
    }

    if (
      doc.template === "tableau_suivi_parcours_excel"
      || doc.template === "plan_dev_competences_excel"
      || doc.template === "tableau_amelioration_continue_excel"
      || doc.template === "suivi_dysfonctionnements_excel"
      || doc.template === "relances_appreciations_excel"
      || doc.template === "indicateurs_performance"
      || doc.template === "vae_indicateurs_previsionnels"
      || doc.template === "decoupage_formation_cfa_excel"
      || doc.template === "matrice_competences_excel"
      || doc.template === "suivi_chiffre_formation_excel"
    ) {
      let excelContent: string;
      if (doc.template === "tableau_suivi_parcours_excel") {
        excelContent = generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires);
      } else if (doc.template === "indicateurs_performance") {
        excelContent = generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires);
      } else if (doc.template === "vae_indicateurs_previsionnels") {
        excelContent = generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation);
      } else {
        excelContent = generateContent(doc);
      }
      saveAs(excelToBlob(excelContent), buildCatalogFileName(doc, getDocStagiaire(doc), ".xls"));
      return;
    }

    const currentStagiaire = getDocStagiaire(doc, isPerStagiaire ? selectedStagiaire : undefined);
    const content = generateContent(doc, isPerStagiaire ? selectedStagiaire : undefined);
    await downloadFile(content, buildCatalogFileName(doc, currentStagiaire));
  };

  const handleToggleEdit = () => {
    if (editing && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        const html = `<!DOCTYPE html><html lang="fr"><head>${doc.head.innerHTML}</head><body>${doc.body.innerHTML}</body></html>`;
        const editKey = `${currentDocId}_s${PER_STAGIAIRE_TEMPLATES.has(catalog.find((item) => item.id === currentDocId)?.template || "") ? selectedStagiaire : "all"}`;
        setEditedContents((prev) => new Map(prev).set(editKey, html));
        setPreviewContent(html);
      }
    } else if (!editing && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.designMode = "on";
      }
    }
    setEditing(!editing);
  };

  const handleStagiaireChange = (val: string) => {
    if (val === "all") {
      setSelectedStagiaire(-1);
    } else {
      setSelectedStagiaire(parseInt(val, 10));
    }

    if (currentDocId && previewContent) {
      const doc = catalog.find((item) => item.id === currentDocId);
      if (doc && PER_STAGIAIRE_TEMPLATES.has(doc.template)) {
        if (val === "all") {
          const allContent = allStagiaires.map((_, index) => `<div style="page-break-after:always">${generateContent(doc, index)}</div>`).join("<hr style='border:2px solid #1e3a7b;margin:30px 0'>");
          setPreviewContent(allContent);
          setPreviewTitle(`${doc.nom} – Tous les stagiaires (${allStagiaires.length})`);
        } else {
          const index = parseInt(val, 10);
          const content = generateContent(doc, index);
          setPreviewContent(content);
          setPreviewTitle(docTitle(doc.nom, allStagiaires[index]));
        }
        setEditing(false);
      }
    }
  };

  const handleFolderImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setImportingFolder(true);
    try {
      const audit = auditImportedFolder({
        catalog,
        dateMaj: mergedOrganisme.dateMaj,
        exportFormat,
        files,
        orgName: mergedOrganisme.nom,
        stagiaires: allStagiaires,
        version: mergedOrganisme.version,
      });
      setImportAudit(audit);

      if (audit.sourceCheck === "warning" || audit.missingCount > 0 || audit.nearCount > 0) {
        toast.error(`Pré-contrôle terminé : ${audit.missingCount} manquants, ${audit.nearCount} proches, ${audit.normalizedCount} retrouvés après normalisation.`);
      } else {
        toast.success(`Pré-contrôle OK : ${audit.exactCount + audit.normalizedCount} fichiers reconnus sur ${audit.totalExpected}.`);
      }
    } catch (error) {
      console.error("Folder audit error:", error);
      toast.error("Erreur pendant l'analyse du dossier source.");
    } finally {
      setImportingFolder(false);
      if (folderInputRef.current) folderInputRef.current.value = "";
    }
  };

  const handleDownloadRenamedZip = async () => {
    if (!importAudit) return;

    setRenamingFolder(true);
    try {
      const zip = new JSZip();
      const assignedFileIds = new Set<string>();

      for (const match of importAudit.matches) {
        if (!match.matchedFile) continue;
        const renamedName = replaceFileExtension(match.expected.requestedName, match.matchedFile.extension || match.expected.extension);
        zip.file(`RENOMMES/${renamedName}`, await match.matchedFile.file.arrayBuffer());
        assignedFileIds.add(match.matchedFile.id);
      }

      for (const file of importAudit.importedFiles.filter((item) => !assignedFileIds.has(item.id))) {
        zip.file(`A_VERIFIER/${file.relativePath}`, await file.file.arrayBuffer());
      }

      zip.file("RAPPORT_IMPORT.txt", buildImportReport(importAudit));
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, buildGenericFileName("DOSSIER_RENOMME", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".zip"));
      toast.success("ZIP renommé prêt au téléchargement.");
    } catch (error) {
      console.error("Mass rename error:", error);
      toast.error("Erreur pendant le renommage automatique.");
    } finally {
      setRenamingFolder(false);
    }
  };

  const handlePreviewBook = () => {
    const content = generateBookQualiopi(mergedOrganisme, [selectedFormation], allStagiaires, catalog);
    setPreviewContent(content);
    setPreviewTitle("BOOK QUALIOPI – Dossier complet");
    setCurrentDocId("book_qualiopi");
    setEditing(false);
  };

  const handleDownloadBook = async () => {
    const content = generateBookQualiopi(mergedOrganisme, [selectedFormation], allStagiaires, catalog);
    await downloadFile(content, buildGenericFileName("BOOK_QUALIOPI_COMPLET", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".doc"));
  };

  const handleDownloadAll = async () => {
    setGenerating(true);
    setGenerationProgressText("");
    try {
      const generatedIds = new Set(generated);
      const totalFiles = 1 + catalog.reduce((count, doc) => {
        const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
        const hasStagiaireIdx = doc.params?.stagiaireIdx !== undefined;
        return count + (isPerStagiaire && !hasStagiaireIdx ? allStagiaires.length : 1);
      }, 0);

      const bulkPdfOptions = { scale: 1.35, imageQuality: 0.84, pageYieldMs: 8 };
      const zip = new JSZip();

      const addFileToZip = (path: string, payload: Blob | ArrayBuffer | string) => {
        zip.file(path, payload);
      };

      let processedFiles = 0;
      const updateProgress = async () => {
        processedFiles += 1;
        if (processedFiles % (exportFormat === "pdf" ? 1 : 4) === 0 || processedFiles === totalFiles) {
          setGenerationProgressText(`${processedFiles}/${totalFiles}`);
          await yieldToBrowser(exportFormat === "pdf" ? 24 : 0);
        }
      };

      const toWordBlob = async (content: string) => {
        const blob = await htmlToWordBlob(content);
        const extension = blob.type.includes("officedocument") ? ".docx" : ".doc";
        return { blob, extension };
      };

      const bookContent = generateBookQualiopi(mergedOrganisme, [selectedFormation], allStagiaires, catalog);
      if (exportFormat === "pdf") {
        addFileToZip(
          `QUALIOPI/${buildGenericFileName("BOOK_QUALIOPI", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".pdf")}`,
          await htmlToPdfBlob(bookContent, bulkPdfOptions),
        );
      } else {
        const bookBlob = await toWordBlob(bookContent);
        addFileToZip(
          `QUALIOPI/${buildGenericFileName("BOOK_QUALIOPI", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, bookBlob.extension)}`,
          bookBlob.blob,
        );
      }
      await updateProgress();

      for (const doc of catalog) {
        const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
        const hasStagiaireIdx = doc.params?.stagiaireIdx !== undefined;
        const isMail = doc.critere === 0 && !!MAIL_TEMPLATE_FILES[doc.template];
        const basePath = isMail ? "MAILS" : shortCriterePath(doc.critere, doc.indicateur);

        if (hasStagiaireIdx) {
          const si = doc.params!.stagiaireIdx as number;
          const stagiaire = allStagiaires[si] || allStagiaires[0];
          const stagFolder = `${basePath}/${stagiaire.nom}_${stagiaire.prenom}`.substring(0, 80);

          if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
            const resp = await fetch(getStaticFileUrl(doc)!);
            const fileBlob = await resp.blob();
            addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire)}`, fileBlob);
            await updateProgress();
          } else if (
            doc.template === "indicateurs_performance"
            || doc.template === "tableau_suivi_parcours_excel"
            || doc.template === "plan_dev_competences_excel"
            || doc.template === "tableau_amelioration_continue_excel"
            || doc.template === "suivi_dysfonctionnements_excel"
            || doc.template === "relances_appreciations_excel"
            || doc.template === "vae_indicateurs_previsionnels"
            || doc.template === "decoupage_formation_cfa_excel"
      || doc.template === "matrice_competences_excel"
      || doc.template === "suivi_chiffre_formation_excel"
          ) {
            const excelContent = doc.template === "indicateurs_performance"
              ? generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires)
              : doc.template === "tableau_suivi_parcours_excel"
                ? generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires)
                : doc.template === "vae_indicateurs_previsionnels"
                  ? generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation)
                  : generateContent(doc);
            addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".xls")}`, excelToBlob(excelContent));
            await updateProgress();
          } else {
            const content = generateContent(doc);
            if (exportFormat === "pdf") {
              addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".pdf")}`, await htmlToPdfBlob(content, bulkPdfOptions));
            } else {
              const wordBlob = await toWordBlob(content);
              addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, wordBlob.extension)}`, wordBlob.blob);
            }
            await updateProgress();
          }
        } else if (isPerStagiaire) {
          for (let si = 0; si < allStagiaires.length; si++) {
            const stagiaire = allStagiaires[si];
            const stagFolder = `${basePath}/${stagiaire.nom}_${stagiaire.prenom}`.substring(0, 80);
            const content = generateContent(doc, si);
            if (exportFormat === "pdf") {
              addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".pdf")}`, await htmlToPdfBlob(content, bulkPdfOptions));
            } else {
              const wordBlob = await toWordBlob(content);
              addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, wordBlob.extension)}`, wordBlob.blob);
            }
            await updateProgress();
          }
        } else if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
          const resp = await fetch(getStaticFileUrl(doc)!);
          const fileBlob = await resp.blob();
          addFileToZip(`${basePath}/${buildCatalogFileName(doc)}`, fileBlob);
          await updateProgress();
        } else if (DOCX_TEMPLATE_FILES[doc.template]) {
          const docxBlob = await processDocxTemplate(DOCX_TEMPLATE_FILES[doc.template], mergedOrganisme);
          addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, ".docx")}`, docxBlob);
          await updateProgress();
        } else if (MAIL_TEMPLATE_FILES[doc.template] && typeof doc.params?.stagiaireIdx === "number") {
          const s = allStagiaires[doc.params.stagiaireIdx];
          if (s) {
            const mailBlob = await processMailDocxTemplate(MAIL_TEMPLATE_FILES[doc.template], mergedOrganisme, selectedFormation, s);
            addFileToZip(`${basePath}/${buildCatalogFileName(doc, s, ".docx")}`, mailBlob);
          }
          await updateProgress();
        } else if (
          doc.template === "indicateurs_performance"
          || doc.template === "tableau_suivi_parcours_excel"
          || doc.template === "plan_dev_competences_excel"
          || doc.template === "tableau_amelioration_continue_excel"
          || doc.template === "suivi_dysfonctionnements_excel"
          || doc.template === "relances_appreciations_excel"
          || doc.template === "vae_indicateurs_previsionnels"
          || doc.template === "decoupage_formation_cfa_excel"
      || doc.template === "matrice_competences_excel"
      || doc.template === "suivi_chiffre_formation_excel"
        ) {
          const excelContent = doc.template === "indicateurs_performance"
            ? generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires)
            : doc.template === "tableau_suivi_parcours_excel"
              ? generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires)
              : doc.template === "vae_indicateurs_previsionnels"
                ? generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation)
                : generateContent(doc);
          addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, ".xls")}`, excelToBlob(excelContent));
          await updateProgress();
        } else {
          const content = generateContent(doc);
          if (exportFormat === "pdf") {
            addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, ".pdf")}`, await htmlToPdfBlob(content, bulkPdfOptions));
          } else {
            const wordBlob = await toWordBlob(content);
            addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, wordBlob.extension)}`, wordBlob.blob);
          }
          await updateProgress();
        }
        generatedIds.add(doc.id);
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, buildGenericFileName("DOSSIER_QUALIOPI_COMPLET", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".zip"));
      setGenerated(generatedIds);
      toast.success("ZIP généré avec la convention de nommage compatible import.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur pendant la génération du ZIP.");
    } finally {
      setGenerating(false);
      setGenerationProgressText("");
    }
  };

  const handleDownloadCritere = async (critereNum: number) => {
    setGenerating(true);
    setGenerationProgressText("");
    try {
      const critereDocs = catalog.filter((doc) => doc.critere === critereNum);
      const totalFiles = critereDocs.reduce((count, doc) => {
        const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
        const hasStagiaireIdx = doc.params?.stagiaireIdx !== undefined;
        return count + (isPerStagiaire && !hasStagiaireIdx ? allStagiaires.length : 1);
      }, 0);

      if (totalFiles === 0) {
        toast.info(`Aucun fichier à exporter pour le Critère ${critereNum}.`);
        return;
      }

      const bulkPdfOptions = { scale: 1.35, imageQuality: 0.84, pageYieldMs: 8 };
      const zip = new JSZip();
      let processedFiles = 0;

      const toWordBlob = async (content: string) => {
        const blob = await htmlToWordBlob(content);
        const extension = blob.type.includes("officedocument") ? ".docx" : ".doc";
        return { blob, extension };
      };

      const updateProgress = async () => {
        processedFiles += 1;
        setGenerationProgressText(`${processedFiles}/${totalFiles}`);
        await yieldToBrowser(exportFormat === "pdf" ? 24 : 0);
      };

      for (const doc of critereDocs) {
        const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
        const hasStagiaireIdx = doc.params?.stagiaireIdx !== undefined;
        const basePath = shortCriterePath(doc.critere, doc.indicateur);

        if (hasStagiaireIdx) {
          const si = doc.params!.stagiaireIdx as number;
          const stagiaire = allStagiaires[si] || allStagiaires[0];
          const stagFolder = `${basePath}/${stagiaire.nom}_${stagiaire.prenom}`.substring(0, 80);

          if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
            const resp = await fetch(getStaticFileUrl(doc)!);
            zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire)}`, await resp.blob());
          } else if (["indicateurs_performance", "tableau_suivi_parcours_excel", "plan_dev_competences_excel", "tableau_amelioration_continue_excel", "suivi_dysfonctionnements_excel", "relances_appreciations_excel", "vae_indicateurs_previsionnels"].includes(doc.template)) {
            const excelContent = doc.template === "indicateurs_performance"
              ? generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires)
              : doc.template === "tableau_suivi_parcours_excel"
                ? generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires)
                : doc.template === "vae_indicateurs_previsionnels"
                  ? generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation)
                  : generateContent(doc);
            zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".xls")}`, excelToBlob(excelContent));
          } else {
            const content = generateContent(doc);
            if (exportFormat === "pdf") {
              zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".pdf")}`, await htmlToPdfBlob(content, bulkPdfOptions));
            } else {
              const wordBlob = await toWordBlob(content);
              zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, wordBlob.extension)}`, wordBlob.blob);
            }
          }
          await updateProgress();
        } else if (isPerStagiaire) {
          for (let si = 0; si < allStagiaires.length; si++) {
            const stagiaire = allStagiaires[si];
            const stagFolder = `${basePath}/${stagiaire.nom}_${stagiaire.prenom}`.substring(0, 80);
            const content = generateContent(doc, si);
            if (exportFormat === "pdf") {
              zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".pdf")}`, await htmlToPdfBlob(content, bulkPdfOptions));
            } else {
              const wordBlob = await toWordBlob(content);
              zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, wordBlob.extension)}`, wordBlob.blob);
            }
            await updateProgress();
          }
        } else if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
          const resp = await fetch(getStaticFileUrl(doc)!);
          zip.file(`${basePath}/${buildCatalogFileName(doc)}`, await resp.blob());
          await updateProgress();
        } else if (DOCX_TEMPLATE_FILES[doc.template]) {
          const docxBlob = await processDocxTemplate(DOCX_TEMPLATE_FILES[doc.template], mergedOrganisme);
          zip.file(`${basePath}/${buildCatalogFileName(doc, null, ".docx")}`, docxBlob);
          await updateProgress();
        } else if (MAIL_TEMPLATE_FILES[doc.template] && typeof doc.params?.stagiaireIdx === "number") {
          const s = allStagiaires[doc.params.stagiaireIdx];
          if (s) {
            const mailBlob = await processMailDocxTemplate(MAIL_TEMPLATE_FILES[doc.template], mergedOrganisme, selectedFormation, s);
            zip.file(`${basePath}/${buildCatalogFileName(doc, s, ".docx")}`, mailBlob);
          }
          await updateProgress();
        } else if (["indicateurs_performance", "tableau_suivi_parcours_excel", "plan_dev_competences_excel", "tableau_amelioration_continue_excel", "suivi_dysfonctionnements_excel", "relances_appreciations_excel", "vae_indicateurs_previsionnels"].includes(doc.template)) {
          const excelContent = doc.template === "indicateurs_performance"
            ? generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires)
            : doc.template === "tableau_suivi_parcours_excel"
              ? generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires)
              : doc.template === "vae_indicateurs_previsionnels"
                ? generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation)
                : generateContent(doc);
          zip.file(`${basePath}/${buildCatalogFileName(doc, null, ".xls")}`, excelToBlob(excelContent));
          await updateProgress();
        } else {
          const content = generateContent(doc);
          if (exportFormat === "pdf") {
            zip.file(`${basePath}/${buildCatalogFileName(doc, null, ".pdf")}`, await htmlToPdfBlob(content, bulkPdfOptions));
          } else {
            const wordBlob = await toWordBlob(content);
            zip.file(`${basePath}/${buildCatalogFileName(doc, null, wordBlob.extension)}`, wordBlob.blob);
          }
          await updateProgress();
        }
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, buildGenericFileName(`CRITERE_${critereNum}`, mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".zip"));
      toast.success(`ZIP Critère ${critereNum} téléchargé.`);
    } catch (error) {
      console.error(error);
      toast.error(`Erreur pendant la génération du ZIP Critère ${critereNum}.`);
    } finally {
      setGenerating(false);
      setGenerationProgressText("");
    }
  };

  const handleDownloadIndicateur = async (critereNum: number, indicateurNum: number) => {
    setGenerating(true);
    setGenerationProgressText("");
    try {
      const indDocs = catalog.filter((doc) => doc.critere === critereNum && doc.indicateur === indicateurNum);
      const totalFiles = indDocs.reduce((count, doc) => {
        const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
        const hasStagiaireIdx = doc.params?.stagiaireIdx !== undefined;
        return count + (isPerStagiaire && !hasStagiaireIdx ? allStagiaires.length : 1);
      }, 0);

      if (totalFiles === 0) {
        toast.info(`Aucun fichier pour l'indicateur ${indicateurNum}.`);
        return;
      }

      const bulkPdfOptions = { scale: 1.35, imageQuality: 0.84, pageYieldMs: 8 };
      const zip = new JSZip();
      let processedFiles = 0;

      const toWordBlob = async (content: string) => {
        const blob = await htmlToWordBlob(content);
        const extension = blob.type.includes("officedocument") ? ".docx" : ".doc";
        return { blob, extension };
      };

      const updateProgress = async () => {
        processedFiles += 1;
        setGenerationProgressText(`${processedFiles}/${totalFiles}`);
        await yieldToBrowser(exportFormat === "pdf" ? 24 : 0);
      };

      for (const doc of indDocs) {
        const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
        const hasStagiaireIdx = doc.params?.stagiaireIdx !== undefined;
        const basePath = shortCriterePath(doc.critere, doc.indicateur);

        if (hasStagiaireIdx) {
          const si = doc.params!.stagiaireIdx as number;
          const stagiaire = allStagiaires[si] || allStagiaires[0];
          const stagFolder = `${basePath}/${stagiaire.nom}_${stagiaire.prenom}`.substring(0, 80);

          if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
            const resp = await fetch(getStaticFileUrl(doc)!);
            zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire)}`, await resp.blob());
          } else if (["indicateurs_performance", "tableau_suivi_parcours_excel", "plan_dev_competences_excel", "tableau_amelioration_continue_excel", "suivi_dysfonctionnements_excel", "relances_appreciations_excel", "vae_indicateurs_previsionnels", "decoupage_formation_cfa_excel", "matrice_competences_excel", "suivi_chiffre_formation_excel"].includes(doc.template)) {
            const excelContent = doc.template === "indicateurs_performance"
              ? generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires)
              : doc.template === "tableau_suivi_parcours_excel"
                ? generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires)
                : doc.template === "vae_indicateurs_previsionnels"
                  ? generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation)
                  : generateContent(doc);
            zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".xls")}`, excelToBlob(excelContent));
          } else {
            const content = generateContent(doc);
            if (exportFormat === "pdf") {
              zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".pdf")}`, await htmlToPdfBlob(content, bulkPdfOptions));
            } else {
              const wordBlob = await toWordBlob(content);
              zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, wordBlob.extension)}`, wordBlob.blob);
            }
          }
          await updateProgress();
        } else if (isPerStagiaire) {
          for (let si = 0; si < allStagiaires.length; si++) {
            const stagiaire = allStagiaires[si];
            const stagFolder = `${basePath}/${stagiaire.nom}_${stagiaire.prenom}`.substring(0, 80);
            const content = generateContent(doc, si);
            if (exportFormat === "pdf") {
              zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".pdf")}`, await htmlToPdfBlob(content, bulkPdfOptions));
            } else {
              const wordBlob = await toWordBlob(content);
              zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, wordBlob.extension)}`, wordBlob.blob);
            }
            await updateProgress();
          }
        } else if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
          const resp = await fetch(getStaticFileUrl(doc)!);
          zip.file(`${basePath}/${buildCatalogFileName(doc)}`, await resp.blob());
          await updateProgress();
        } else if (DOCX_TEMPLATE_FILES[doc.template]) {
          const docxBlob = await processDocxTemplate(DOCX_TEMPLATE_FILES[doc.template], mergedOrganisme);
          zip.file(`${basePath}/${buildCatalogFileName(doc, null, ".docx")}`, docxBlob);
          await updateProgress();
        } else if (MAIL_TEMPLATE_FILES[doc.template] && typeof doc.params?.stagiaireIdx === "number") {
          const s = allStagiaires[doc.params.stagiaireIdx];
          if (s) {
            const mailBlob = await processMailDocxTemplate(MAIL_TEMPLATE_FILES[doc.template], mergedOrganisme, selectedFormation, s);
            zip.file(`MAIL/${buildCatalogFileName(doc, s, ".docx")}`, mailBlob);
          }
          await updateProgress();
        } else if (["indicateurs_performance", "tableau_suivi_parcours_excel", "plan_dev_competences_excel", "tableau_amelioration_continue_excel", "suivi_dysfonctionnements_excel", "relances_appreciations_excel", "vae_indicateurs_previsionnels", "decoupage_formation_cfa_excel", "matrice_competences_excel", "suivi_chiffre_formation_excel"].includes(doc.template)) {
          const excelContent = doc.template === "indicateurs_performance"
            ? generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires)
            : doc.template === "tableau_suivi_parcours_excel"
              ? generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires)
              : doc.template === "vae_indicateurs_previsionnels"
                ? generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation)
                : generateContent(doc);
          zip.file(`${basePath}/${buildCatalogFileName(doc, null, ".xls")}`, excelToBlob(excelContent));
          await updateProgress();
        } else {
          const content = generateContent(doc);
          if (exportFormat === "pdf") {
            zip.file(`${basePath}/${buildCatalogFileName(doc, null, ".pdf")}`, await htmlToPdfBlob(content, bulkPdfOptions));
          } else {
            const wordBlob = await toWordBlob(content);
            zip.file(`${basePath}/${buildCatalogFileName(doc, null, wordBlob.extension)}`, wordBlob.blob);
          }
          await updateProgress();
        }
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, buildGenericFileName(`CT${critereNum}_IND_${indicateurNum}`, mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".zip"));
      toast.success(`ZIP Indicateur ${indicateurNum} téléchargé.`);
    } catch (error) {
      console.error(error);
      toast.error(`Erreur pendant la génération du ZIP Indicateur ${indicateurNum}.`);
    } finally {
      setGenerating(false);
      setGenerationProgressText("");
    }
  };

  const handleUploadToDrive = async () => {
    setUploadingDrive(true);
    try {
      const zip = new JSZip();
      const toWordBlob = async (content: string) => {
        const blob = await htmlToWordBlob(content);
        const extension = blob.type.includes("officedocument") ? ".docx" : ".doc";
        return { blob, extension };
      };

      const bookContent = generateBookQualiopi(mergedOrganisme, [selectedFormation], allStagiaires, catalog);
      if (exportFormat === "pdf") {
        zip.file(`BOOK_QUALIOPI.pdf`, await htmlToPdfBlob(bookContent));
      } else {
        const wordBlob = await toWordBlob(bookContent);
        zip.file(`BOOK_QUALIOPI${wordBlob.extension}`, wordBlob.blob);
      }

      for (const critere of CRITERES_INFO) {
        for (const ind of critere.indicateurs) {
          const docs = catalog.filter((d) => d.indicateur === ind.numero);
          for (const doc of docs) {
            const basePath = shortCriterePath(critere.numero, ind.numero);
            const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);

            if (isPerStagiaire) {
              for (let si = 0; si < allStagiaires.length; si++) {
                const stagiaire = allStagiaires[si];
                const stagFolder = `${basePath}/${stagiaire.nom}_${stagiaire.prenom}`.substring(0, 80);
                const content = generateContent(doc, si);
                if (exportFormat === "pdf") {
                  zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".pdf")}`, await htmlToPdfBlob(content));
                } else {
                  const wordBlob = await toWordBlob(content);
                  zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, wordBlob.extension)}`, wordBlob.blob);
                }
              }
            } else if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
              const resp = await fetch(getStaticFileUrl(doc)!);
              const fileBlob = await resp.blob();
              zip.file(`${basePath}/${buildCatalogFileName(doc)}`, fileBlob);
            } else if (
              ["indicateurs_performance", "tableau_suivi_parcours_excel", "plan_dev_competences_excel", "tableau_amelioration_continue_excel", "suivi_dysfonctionnements_excel", "relances_appreciations_excel", "vae_indicateurs_previsionnels"].includes(doc.template)
            ) {
              const excelContent = doc.template === "indicateurs_performance"
                ? generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires)
                : doc.template === "tableau_suivi_parcours_excel"
                  ? generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires)
                  : doc.template === "vae_indicateurs_previsionnels"
                    ? generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation)
                    : generateContent(doc);
              zip.file(`${basePath}/${buildCatalogFileName(doc, null, ".xls")}`, excelToBlob(excelContent));
            } else {
              const content = generateContent(doc);
              if (exportFormat === "pdf") {
                zip.file(`${basePath}/${buildCatalogFileName(doc, null, ".docx")}`, await htmlToPdfBlob(content));
              } else {
                const wordBlob = await toWordBlob(content);
                zip.file(`${basePath}/${buildCatalogFileName(doc, null, wordBlob.extension)}`, wordBlob.blob);
              }
            }
          }
        }
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipName = buildGenericFileName("DOSSIER_QUALIOPI_COMPLET", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".zip");
      const folderName = `Qualiopi_${mergedOrganisme.nom}`.substring(0, 60);

      const result = await saveToDrive(zipBlob, zipName, folderName);
      toast.success("Dossier envoyé sur Google Drive !", {
        description: "Cliquez pour ouvrir",
        action: result.webViewLink ? { label: "Ouvrir", onClick: () => window.open(result.webViewLink, "_blank") } : undefined,
      });
    } catch (error: any) {
      console.error("Google Drive upload error:", error);
      if (error?.message?.includes("popup")) {
        toast.error("Veuillez autoriser la fenêtre pop-up pour Google Drive.");
      } else {
        toast.error("Erreur lors de l'envoi sur Google Drive.");
      }
    }
    setUploadingDrive(false);
  };

  const getDocsForIndicateur = (indicateur: number) => catalog.filter((doc) => doc.indicateur === indicateur);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Dossier Qualiopi Complet</h2>
          <p className="text-sm text-muted-foreground">
            {catalog.length} documents • 7 critères • 32 indicateurs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleDownloadAll} disabled={generating || uploadingDrive} className="gap-2 bg-gradient-hero text-primary-foreground border-0">
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {generating ? `Génération...${generationProgressText ? ` ${generationProgressText}` : ""}` : "Télécharger tout (ZIP)"}
          </Button>
          <Button onClick={handleUploadToDrive} disabled={generating || uploadingDrive} variant="outline" className="gap-2">
            {uploadingDrive ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cloud className="w-4 h-4" />}
            {uploadingDrive ? "Envoi…" : "Google Drive"}
          </Button>
        </div>
      </div>

      <div className="p-3 bg-accent/10 rounded-xl border border-accent/30 flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold text-accent">Format d'export :</span>
        <div className="flex gap-2">
          <button
            onClick={() => setExportFormat("pdf")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              exportFormat === "pdf"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            PDF
          </button>
          <button
            onClick={() => setExportFormat("doc")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              exportFormat === "doc"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            DOC
          </button>
        </div>
        <span className="text-xs text-muted-foreground">
          {exportFormat === "pdf" ? "Compatible Google Drive avec nommage normalisé" : "Import tolérant aux variantes de noms DOC/DOCX"}
        </span>
      </div>

      <div className="p-3 bg-primary/5 rounded-xl border border-primary/20 flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold text-primary">Stagiaire sélectionné :</span>
        <Select value={selectedStagiaire === -1 ? "all" : String(selectedStagiaire)} onValueChange={handleStagiaireChange}>
          <SelectTrigger className="w-[280px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les stagiaires</SelectItem>
            {allStagiaires.map((stagiaire, index) => (
              <SelectItem key={index} value={String(index)}>
                {stagiaire.prenom} {stagiaire.nom} – {stagiaire.entreprise || "Particulier"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">
          Prévisualisation individuelle ou groupée – le ZIP contient tous les stagiaires.
        </span>
      </div>

      <DocStyleConfigPanel style={docStyle} onChange={handleStyleChange} />
      <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border-2 border-primary/20 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-primary">BOOK QUALIOPI</h3>
          <p className="text-xs text-muted-foreground">
            Dossier complet : couverture, présentation, organigramme, sommaire, 32 indicateurs avec niveaux attendus et preuves
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePreviewBook}>
            Aperçu
          </Button>
          <Button size="sm" onClick={handleDownloadBook} className="bg-gradient-hero text-primary-foreground border-0">
            Télécharger
          </Button>
        </div>
      </div>

      <div className="p-3 bg-secondary rounded-xl flex items-center gap-3">
        <div className="flex-1">
          <div className="flex justify-between text-sm">
            <span>{generated.size} / {catalog.length} documents générés</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {/* === ALL DOCUMENTS BY CRITÈRE === */}
        <div className="space-y-2">
          {CRITERES_INFO.map((critere) => {
            const isExpanded = expandedCriteres.has(critere.numero);
            const critereDocs = catalog.filter((doc) => doc.critere === critere.numero);
            if (critereDocs.length === 0) return null;
            const critereGenerated = critereDocs.filter((doc) => generated.has(doc.id)).length;

            return (
              <div key={critere.numero} className="bg-card border rounded-xl overflow-hidden shadow-card">
                <div className="flex items-center">
                  <button
                    onClick={() => toggleCritere(critere.numero)}
                    className="flex-1 p-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-primary shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                    <span className="text-sm font-semibold">Critère {critere.numero} – {critere.titre}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({critereDocs.length} docs, {critereGenerated} générés)
                    </span>
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mr-2 text-xs gap-1 shrink-0"
                    disabled={generating}
                    onClick={(e) => { e.stopPropagation(); handleDownloadCritere(critere.numero); }}
                  >
                    <Archive className="w-3 h-3" /> ZIP
                  </Button>
                </div>

                {isExpanded && (
                  <div className="border-t px-3 pb-3 space-y-1">
                    {critere.indicateurs.map((indicateur) => {
                      const isIndExpanded = expandedIndicateurs.has(indicateur.numero);
                      const indDocs = catalog.filter((doc) => doc.critere === critere.numero && doc.indicateur === indicateur.numero);
                      if (indDocs.length === 0) return null;
                      const indGenerated = indDocs.filter((doc) => generated.has(doc.id)).length;

                      return (
                        <div key={indicateur.numero}>
                          <button
                            onClick={() => toggleIndicateur(indicateur.numero)}
                            className="w-full p-2 flex items-center gap-2 hover:bg-secondary/30 rounded-lg transition-colors text-left"
                          >
                            {isIndExpanded ? <ChevronDown className="w-3 h-3 text-primary shrink-0" /> : <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />}
                            <span className="text-xs font-semibold text-primary">I{indicateur.numero}</span>
                            <span className="text-xs truncate flex-1">{indicateur.titre}</span>
                            <span className="text-xs text-muted-foreground shrink-0">{indDocs.length} docs</span>
                            {indGenerated === indDocs.length && indDocs.length > 0 && <span className="text-xs text-accent font-bold shrink-0">✓</span>}
                            {critere.numero === 3 && indDocs.length > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs gap-1 shrink-0 h-6 px-1.5"
                                disabled={generating}
                                onClick={(e) => { e.stopPropagation(); handleDownloadIndicateur(critere.numero, indicateur.numero); }}
                              >
                                <Archive className="w-3 h-3" /> ZIP
                              </Button>
                            )}
                          </button>

                          {isIndExpanded && (
                            <div className="ml-8 space-y-0.5 mt-1">
                              {indDocs.map((doc) => {
                                const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
                                return (
                                  <div key={doc.id} className={`flex items-center gap-2 p-1.5 rounded-md text-xs hover:bg-secondary/30 transition-colors ${generated.has(doc.id) ? "bg-accent/5" : ""}`}>
                                    <span className={`shrink-0 ${generated.has(doc.id) ? "text-accent font-bold" : "text-muted-foreground"}`}>
                                      {generated.has(doc.id) ? "✓" : "•"}
                                    </span>
                                    <span className="flex-1 truncate">{doc.nom}</span>
                                    {isPerStagiaire && <span title="1 fichier par stagiaire" className="text-xs text-primary shrink-0">👤</span>}
                                    <button onClick={() => handlePreview(doc)} className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground" title="Aperçu">
                                      Voir
                                    </button>
                                    <button onClick={() => handleDownload(doc)} className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground" title="Télécharger">
                                      DL
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* === MAIL SECTION (outside critères) === */}
      {(() => {
        const mailDocs = catalog.filter((doc) => doc.critere === 0 && MAIL_TEMPLATE_FILES[doc.template]);
        if (mailDocs.length === 0) return null;
        const isMailExpanded = expandedCriteres.has(99);
        const mailGenerated = mailDocs.filter((doc) => generated.has(doc.id)).length;

        return (
          <div className="bg-card border rounded-xl overflow-hidden shadow-card">
            <div className="flex items-center">
              <button
                onClick={() => toggleCritere(99)}
                className="flex-1 p-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left"
              >
                {isMailExpanded ? <ChevronDown className="w-4 h-4 text-primary shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                <span className="text-sm font-semibold">📧 MAIL – Mails d'envoi</span>
                <span className="text-xs text-muted-foreground ml-2">
                  ({mailDocs.length} docs, {mailGenerated} générés)
                </span>
              </button>
              <Button
                variant="ghost"
                size="sm"
                className="mr-2 text-xs gap-1 shrink-0"
                disabled={generating}
                onClick={async (e) => {
                  e.stopPropagation();
                  setGenerating(true);
                  try {
                    const zip = new JSZip();
                    for (const doc of mailDocs) {
                      if (MAIL_TEMPLATE_FILES[doc.template] && typeof doc.params?.stagiaireIdx === "number") {
                        const s = allStagiaires[doc.params.stagiaireIdx];
                        if (s) {
                          const blob = await processMailDocxTemplate(MAIL_TEMPLATE_FILES[doc.template], mergedOrganisme, selectedFormation, s);
                          zip.file(buildCatalogFileName(doc, s, ".docx"), blob);
                        }
                      }
                    }
                    const blob = await zip.generateAsync({ type: "blob" });
                    saveAs(blob, buildGenericFileName("MAIL", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".zip"));
                    toast.success("ZIP MAIL téléchargé.");
                  } catch (err) {
                    console.error(err);
                    toast.error("Erreur pendant la génération du ZIP MAIL.");
                  } finally {
                    setGenerating(false);
                  }
                }}
              >
                <Archive className="w-3 h-3" /> ZIP
              </Button>
            </div>

            {isMailExpanded && (
              <div className="border-t px-3 pb-3 space-y-0.5">
                {mailDocs.map((doc) => (
                  <div key={doc.id} className={`flex items-center gap-2 p-1.5 rounded-md text-xs hover:bg-secondary/30 transition-colors ${generated.has(doc.id) ? "bg-accent/5" : ""}`}>
                    <span className={`shrink-0 ${generated.has(doc.id) ? "text-accent font-bold" : "text-muted-foreground"}`}>
                      {generated.has(doc.id) ? "✓" : "•"}
                    </span>
                    <span className="flex-1 truncate">{doc.nom}</span>
                    <span title="1 fichier par stagiaire" className="text-xs text-primary shrink-0">👤</span>
                    <button onClick={() => handleDownload(doc)} className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground" title="Télécharger">
                      DL
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {(previewContent || previewBlobUrl) && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
            <h3 className="text-lg font-bold truncate flex-1">{previewTitle}</h3>
            <div className="flex gap-2 shrink-0">
              {!previewBlobUrl && (
                <Button
                  variant={editing ? "default" : "outline"}
                  size="sm"
                  onClick={handleToggleEdit}
                >
                  {editing ? "Enregistrer" : "Modifier"}
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => { setPreviewContent(null); setPreviewBlobUrl(null); setEditing(false); }}>
                <X className="w-4 h-4 mr-1" /> Fermer
              </Button>
            </div>
          </div>
          {editing && (
            <div className="mb-2 p-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-700 dark:text-amber-400">
              Mode édition activé : cliquez directement dans le document pour le modifier. Les changements seront sauvegardés.
            </div>
          )}
          <div className="bg-card border rounded-xl shadow-elevated overflow-hidden">
            {previewBlobUrl ? (
              <iframe
                src={previewBlobUrl}
                className="w-full h-[700px] border-0"
                title="Aperçu PDF"
              />
            ) : (
              <iframe
                ref={iframeRef}
                srcDoc={previewContent!}
                className="w-full h-[600px] border-0"
                title="Aperçu"
                onLoad={() => {
                  if (editing && iframeRef.current?.contentDocument) {
                    iframeRef.current.contentDocument.designMode = "on";
                  }
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentGenerator;
