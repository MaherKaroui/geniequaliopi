import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import mammoth from "mammoth";
import { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, CRITERES_INFO, DocEntry, DocStyleConfig, DEFAULT_DOC_STYLE } from "@/types/qualiopi";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { generateBookQualiopi } from "@/lib/bookQualiopi";
import { generateFeuilleRouteQualiopi } from "@/lib/feuilleRouteQualiopi";
import { generateBookQualiopiCFA } from "@/lib/bookQualiopiCFA";
import { generateFeuilleRouteQualiopiCFA } from "@/lib/feuilleRouteQualiopiCFA";
import { generateGuideAuditCFA } from "@/lib/guideAuditCFA";
import { generateGuideAuditUniversal, detectTypeAction, TYPE_ACTION_LABELS, type TypeActionAudit } from "@/lib/guideAuditUniversal";
import { setDocStyle, setDocRefDate } from "@/lib/docBuilder";
import { SAMPLE_FORMATIONS, mergeStagiaires, mergeOrganisme } from "@/lib/sampleData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronRight, X, Loader2, FolderOpen, RefreshCw, Archive, AlertTriangle, Cloud } from "lucide-react";
import { saveToDrive } from "@/lib/googleDrive";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import DossierOutputSettings from "./DossierOutputSettings";

import SignatairesConnexionForm from "./SignatairesConnexionForm";
import { downloadAsWord, htmlToWordBlob, htmlToWordBlobSync } from "@/lib/wordExport";
import { generateExcelTableauBordPerformance, generateExcelTableauSuiviParcours, generateExcelIndicateursPrevisionnelsVAE, excelToBlob } from "@/lib/xlsxGenerator";
import { htmlToXlsxBlob } from "@/lib/htmlToXlsx";
import { buildBDCNTConseilsZip } from "@/lib/bdc/bdcNTConseilsZip";

// Templates qui doivent être téléchargés en VRAI fichier .xlsx (et non en .xls HTML déguisé)
// La sortie HTML générée par leurs générateurs respectifs est convertie via SheetJS.
const REAL_XLSX_TEMPLATES = new Set<string>([
  "decoupage_formation_cfa_excel",
  "matrice_competences_excel",
  "suivi_chiffre_formation_excel",
  "tableau_suivi_parcours_beneficiaires_cfa_excel",
  "calendrier_annuel_cfa",
  "tableau_suivi_parcours_excel",
  "plan_dev_competences_excel",
  "tableau_amelioration_continue_excel",
  "suivi_dysfonctionnements_excel",
  "relances_appreciations_excel",
  "indicateurs_performance",
  "vae_indicateurs_previsionnels",
  "bdc_nt_calendrier_annuel",
  "bdc_nt_suivi_adaptation",
  "bdc_nt_contacts_handicap",
  "bdc_nt_tableau_dysfonctionnements",
  "bdc_nt_stats_xlsx",
  "bdc_nt_cr6mois_stagiaire",
]);
import { downloadAsPdf, getActivePdfOptions, htmlToPdfBlob } from "@/lib/pdfExport";
import { processDocxTemplate, processMailDocxTemplate, DOCX_TEMPLATE_FILES, MAIL_TEMPLATE_FILES } from "@/lib/docxTemplateExport";
import { genCerfaApprentissagePdf } from "@/lib/cerfaApprentissage";
import { auditImportedFolder, ImportAuditResult } from "@/lib/importInspector";
import {
  buildDocumentFileName,
  buildGenericFileName,
  buildStagiaireFolderName,
  ExportFormat,
  getPreferredExtension,
  PER_STAGIAIRE_TEMPLATES,
  replaceFileExtension,
  shortCriterePath,
} from "@/lib/fileNaming";
import { useBackgroundJobs } from "@/lib/backgroundJobs";

const yieldToBrowser = (delayMs = 0) =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      window.setTimeout(resolve, delayMs);
    });
  });

// Templates générant directement un Blob .xlsx via SheetJS (sans passer par du HTML)
// Doivent être traités avant la branche REAL_XLSX_TEMPLATES dans les ZIPs.
const NATIVE_XLSX_TEMPLATES = new Set<string>([
  "outils_suivi_alternance_excel",
  "suivi_parcours_beneficiaires_excel",
  "suivi_public_beneficiaire_excel",
  "suivi_pfmp_excel",
  "suivi_inscriptions_excel",
]);

const HTML_MAIL_TEMPLATES = new Set<string>([
  "mail_mission_cfa",
  "mail_diffusion_mission_cfa",
]);

const isHtmlMailTemplate = (template: string) => HTML_MAIL_TEMPLATES.has(template);

async function generateNativeXlsxBlob(
  template: string,
  organisme: OrganismeInfo,
  formation: FormationInfo,
  stagiaires: StagiaireInfo[],
  targetStagiaire?: StagiaireInfo | null,
): Promise<Blob | null> {
  if (template === "outils_suivi_alternance_excel") {
    const { generateOutilsSuiviAlternanceXlsxBlob } = await import("@/lib/outilsSuiviAlternanceXlsx");
    const list = targetStagiaire ? [targetStagiaire] : stagiaires;
    return generateOutilsSuiviAlternanceXlsxBlob(organisme, formation, list);
  }
  if (template === "suivi_parcours_beneficiaires_excel") {
    const { generateSuiviParcoursBeneficiairesXlsxBlob } = await import("@/lib/suiviParcoursBeneficiairesXlsx");
    return generateSuiviParcoursBeneficiairesXlsxBlob(organisme, formation, stagiaires);
  }
  if (template === "suivi_public_beneficiaire_excel") {
    const { generateSuiviPublicBeneficiaireXlsxBlob } = await import("@/lib/suiviPublicBeneficiaireXlsx");
    return generateSuiviPublicBeneficiaireXlsxBlob(organisme, formation, stagiaires);
  }
  if (template === "suivi_pfmp_excel") {
    const { generateSuiviPFMPXlsxBlob } = await import("@/lib/suiviPFMPXlsx");
    return generateSuiviPFMPXlsxBlob(organisme, formation, stagiaires);
  }
  if (template === "suivi_inscriptions_excel") {
    const { generateSuiviInscriptionsXlsxBlob } = await import("@/lib/suiviInscriptionsXlsx");
    return generateSuiviInscriptionsXlsxBlob(organisme, formation, stagiaires);
  }
  return null;
}

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
  const { runJob, hasActive } = useBackgroundJobs();
  const [expandedCriteres, setExpandedCriteres] = useState<Set<number>>(new Set());
  
  const [expandedIndicateurs, setExpandedIndicateurs] = useState<Set<number>>(new Set());
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const previewTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  // La date de MAJ du dossier borne les dates des documents préparatoires
  useEffect(() => {
    setDocRefDate(mergedOrganisme?.dateMaj);
  }, [mergedOrganisme?.dateMaj]);
  const selectedFormation = useMemo(() => (
    formation.intitule
      ? { ...SAMPLE_FORMATIONS[0], ...Object.fromEntries(Object.entries(formation).filter(([, value]) => value && String(value).trim())) }
      : SAMPLE_FORMATIONS[0]
  ), [formation]);
  const allStagiaires = useMemo(() => mergeStagiaires(stagiaires), [stagiaires]);
  const catalog = useMemo(() => getFullCatalog(organisme, formation, stagiaires), [organisme, formation, stagiaires]);
  const progress = catalog.length ? Math.round((generated.size / catalog.length) * 100) : 0;
  // Index critère → indicateur → documents (évite de re-filtrer le catalogue à chaque rendu)
  const docsIndex = useMemo(() => {
    const byCritere = new Map<number, DocEntry[]>();
    const byInd = new Map<string, DocEntry[]>();
    catalog.forEach(doc => {
      if (doc.id.startsWith("cfa_siteweb_")) return;
      if (!byCritere.has(doc.critere)) byCritere.set(doc.critere, []);
      byCritere.get(doc.critere)!.push(doc);
      const k = `${doc.critere}-${doc.indicateur}`;
      if (!byInd.has(k)) byInd.set(k, []);
      byInd.get(k)!.push(doc);
    });
    return { byCritere, byInd };
  }, [catalog]);
  // Rendu paresseux : on n'affiche qu'un lot de documents par indicateur déplié
  const PAGE_DOCS = 100;
  const [visibleDocs, setVisibleDocs] = useState<Record<string, number>>({});
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

  /**
   * Calcule le chemin de base d'un document dans le ZIP.
   * Si `doc.params.folder` est défini (ex: "14_MISSIONS_CFA/Mission_4_..."),
   * le document est placé dans CT{c}_IND_{i}/{folder}/ pour regrouper les missions.
   */
  const getDocBasePath = useCallback((doc: DocEntry): string => {
    // Tous les mails (DOCX ou générés en HTML) sont conservés dans le dossier MAILS.
    const isMail = doc.critere === 0 && (!!MAIL_TEMPLATE_FILES[doc.template] || isHtmlMailTemplate(doc.template));
    const isSiteWeb = doc.id.startsWith("cfa_siteweb_");
    const root = isSiteWeb ? "Documents site web" : (isMail ? "MAILS" : shortCriterePath(doc.critere, doc.indicateur));
    const subFolder = typeof doc.params?.folder === "string" ? doc.params.folder : null;
    return subFolder ? `${root}/${subFolder}` : root;
  }, []);

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

    // Reset/start loading state with a 30s timeout fallback
    setPreviewError(null);
    setPreviewLoading(true);
    setPreviewTitle(doc.nom);
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
    previewTimeoutRef.current = setTimeout(() => {
      setPreviewLoading(false);
      setPreviewError("La génération de l'aperçu prend trop de temps. Réessayez ou choisissez un autre document.");
    }, 30000);

    try {
      await handlePreviewInner(doc);
    } catch (e) {
      console.error("Preview error", e);
      setPreviewError(e instanceof Error ? e.message : "Erreur lors de la génération de l'aperçu.");
    } finally {
      if (previewTimeoutRef.current) { clearTimeout(previewTimeoutRef.current); previewTimeoutRef.current = null; }
      setPreviewLoading(false);
    }
  };

  const handlePreviewInner = async (doc: DocEntry) => {

    // CERFA Apprentissage rempli → PDF dans iframe
    if (doc.template === "cerfa_apprentissage" && typeof doc.params?.stagiaireIdx === "number") {
      const s = allStagiaires[doc.params.stagiaireIdx];
      if (s) {
        try {
          const blob = await genCerfaApprentissagePdf(mergedOrganisme, selectedFormation, s);
          const url = URL.createObjectURL(blob);
          setPreviewContent(null);
          setPreviewBlobUrl(url);
          setPreviewTitle(docTitle(doc.nom, s));
          setCurrentDocId(doc.id);
          setEditing(false);
          setGenerated((prev) => new Set(prev).add(doc.id));
        } catch (e) {
          console.error(e);
          toast.error("Erreur lors de la génération du CERFA");
        }
      }
      return;
    }

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
      const editKey = `${doc.id}_sall`;
      const content = editedContents.has(editKey)
        ? editedContents.get(editKey)!
        : generateDocumentById(doc.id, doc.template, doc.params, organisme, formation, allStagiaires);
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
    // CERFA Apprentissage rempli (PDF par stagiaire)
    if (doc.template === "cerfa_apprentissage" && typeof doc.params?.stagiaireIdx === "number") {
      const s = allStagiaires[doc.params.stagiaireIdx];
      if (s) {
        const blob = await genCerfaApprentissagePdf(mergedOrganisme, selectedFormation, s);
        saveAs(blob, buildCatalogFileName(doc, s, ".pdf"));
      }
      return;
    }

    if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
      const resp = await fetch(getStaticFileUrl(doc)!);
      const blob = await resp.blob();
      saveAs(blob, buildCatalogFileName(doc));
      return;
    }

    // BDC NT Conseils — ressources statiques (Excel/PDF officielles)
    if (doc.template === "bdc_nt_asset" && doc.params?.assetSrc) {
      const src = doc.params.assetSrc as string;
      const name = (doc.params.assetName as string) || src.split("/").pop() || "ressource";
      const resp = await fetch(src);
      const blob = await resp.blob();
      const ext = "." + (name.split(".").pop() || "bin");
      saveAs(blob, buildCatalogFileName(doc, undefined, ext));
      return;
    }


    // Handle .docx template files (factures IND 17)
    if (DOCX_TEMPLATE_FILES[doc.template]) {
      const blob = await processDocxTemplate(DOCX_TEMPLATE_FILES[doc.template], mergedOrganisme);
      saveAs(blob, buildCatalogFileName(doc, undefined, ".docx"));
      return;
    }

    // Handle real .xlsx (SheetJS) templates
    if (doc.template === "outils_suivi_alternance_excel") {
      const { generateOutilsSuiviAlternanceXlsxBlob } = await import("@/lib/outilsSuiviAlternanceXlsx");
      const idx = typeof doc.params?.stagiaireIdx === "number" ? doc.params.stagiaireIdx : -1;
      const targetStagiaire = idx >= 0 ? allStagiaires[idx] : null;
      const stagListe = targetStagiaire ? [targetStagiaire] : allStagiaires;
      const blob = generateOutilsSuiviAlternanceXlsxBlob(mergedOrganisme, selectedFormation, stagListe);
      saveAs(blob, buildCatalogFileName(doc, targetStagiaire ?? undefined, ".xlsx"));
      return;
    }
    if (doc.template === "suivi_parcours_beneficiaires_excel") {
      const { generateSuiviParcoursBeneficiairesXlsxBlob } = await import("@/lib/suiviParcoursBeneficiairesXlsx");
      const blob = generateSuiviParcoursBeneficiairesXlsxBlob(mergedOrganisme, selectedFormation, allStagiaires);
      saveAs(blob, buildCatalogFileName(doc, undefined, ".xlsx"));
      return;
    }
    if (doc.template === "suivi_public_beneficiaire_excel") {
      const { generateSuiviPublicBeneficiaireXlsxBlob } = await import("@/lib/suiviPublicBeneficiaireXlsx");
      const blob = generateSuiviPublicBeneficiaireXlsxBlob(mergedOrganisme, selectedFormation, allStagiaires);
      saveAs(blob, buildCatalogFileName(doc, undefined, ".xlsx"));
      return;
    }
    if (doc.template === "suivi_pfmp_excel") {
      const { generateSuiviPFMPXlsxBlob } = await import("@/lib/suiviPFMPXlsx");
      const blob = generateSuiviPFMPXlsxBlob(mergedOrganisme, selectedFormation, allStagiaires);
      saveAs(blob, buildCatalogFileName(doc, undefined, ".xlsx"));
      return;
    }
    if (doc.template === "suivi_inscriptions_excel") {
      const { generateSuiviInscriptionsXlsxBlob } = await import("@/lib/suiviInscriptionsXlsx");
      const blob = generateSuiviInscriptionsXlsxBlob(mergedOrganisme, selectedFormation, allStagiaires);
      saveAs(blob, buildCatalogFileName(doc, undefined, ".xlsx"));
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
      const editKey = `${doc.id}_sall`;
      const content = editedContents.has(editKey)
        ? editedContents.get(editKey)!
        : generateDocumentById(doc.id, doc.template, doc.params, organisme, formation, allStagiaires);
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
      || REAL_XLSX_TEMPLATES.has(doc.template)
    ) {
      let excelContent: string;
      const editKeyXls = `${doc.id}_sall`;
      if (editedContents.has(editKeyXls)) {
        excelContent = editedContents.get(editKeyXls)!;
      } else if (doc.template === "tableau_suivi_parcours_excel") {
        excelContent = generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires);
      } else if (doc.template === "indicateurs_performance") {
        excelContent = generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires);
      } else if (doc.template === "vae_indicateurs_previsionnels") {
        excelContent = generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation);
      } else {
        excelContent = generateContent(doc);
      }
      if (REAL_XLSX_TEMPLATES.has(doc.template)) {
        saveAs(htmlToXlsxBlob(excelContent), buildCatalogFileName(doc, getDocStagiaire(doc), ".xlsx"));
      } else {
        saveAs(excelToBlob(excelContent), buildCatalogFileName(doc, getDocStagiaire(doc), ".xls"));
      }
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

  const handleDownloadFeuilleRoute = async () => {
    try {
      const { generateFeuilleRouteQualiopiUniversal } = await import("@/lib/feuilleRouteQualiopiUniversal");
      const { detectTypeAction } = await import("@/lib/guideAuditUniversal");
      const t = detectTypeAction(mergedOrganisme);
      const type = t === "CFA" ? "AF" : t;
      const blob = generateFeuilleRouteQualiopiUniversal(mergedOrganisme, catalog, [selectedFormation], allStagiaires, type);
      saveAs(blob, buildGenericFileName(`FEUILLE_ROUTE_QUALIOPI_${type}`, mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".xlsx"));
      toast.success("Feuille de route Qualiopi téléchargée");
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors de la génération de la feuille de route");
    }
  };

  const isCFAOrg = (mergedOrganisme.typesActions || []).includes("apprentissage");

  const [loadingBookCFA, setLoadingBookCFA] = useState(false);
  const [loadingFeuilleRouteCFA, setLoadingFeuilleRouteCFA] = useState(false);
  const [loadingGuideAuditCFA, setLoadingGuideAuditCFA] = useState(false);
  const [typeAuditCFA, setTypeAuditCFA] = useState<'initial' | 'surveillance' | 'renouvellement'>('initial');

  const handleDownloadBookCFA = async () => {
    setLoadingBookCFA(true);
    try {
      const content = generateBookQualiopiCFA(mergedOrganisme, [selectedFormation], allStagiaires, catalog, typeAuditCFA);
      await downloadFile(content, buildGenericFileName("BOOK_QUALIOPI_CFA", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".doc"));
      toast.success("Book Qualiopi CFA téléchargé");
    } catch (e) {
      console.error(e);
      toast.error("Erreur génération Book CFA : " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setLoadingBookCFA(false);
    }
  };

  const handlePreviewBookCFA = () => {
    const content = generateBookQualiopiCFA(mergedOrganisme, [selectedFormation], allStagiaires, catalog, typeAuditCFA);
    setPreviewContent(content);
    setPreviewTitle("BOOK QUALIOPI CFA – Prépa audit");
    setCurrentDocId("book_qualiopi_cfa");
    setEditing(false);
  };

  const handleDownloadFeuilleRouteCFA = async () => {
    setLoadingFeuilleRouteCFA(true);
    try {
      const blob = generateFeuilleRouteQualiopiCFA(mergedOrganisme, catalog, [selectedFormation], allStagiaires, typeAuditCFA);
      saveAs(blob, buildGenericFileName("FEUILLE_ROUTE_QUALIOPI_CFA", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".xlsx"));
      toast.success("Feuille de route Qualiopi CFA téléchargée");
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors de la génération de la feuille de route CFA");
    } finally {
      setLoadingFeuilleRouteCFA(false);
    }
  };

  const handlePreviewFeuilleRouteCFA = async () => {
    try {
      const XLSX = await import("xlsx");
      const blob = generateFeuilleRouteQualiopiCFA(mergedOrganisme, catalog, [selectedFormation], allStagiaires, typeAuditCFA);
      const buf = await blob.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      let html = `<html><head><meta charset="utf-8"><style>
        body{font-family:Arial,sans-serif;padding:20px;color:#111}
        h2{color:#c2410c;border-bottom:2px solid #c2410c;padding-bottom:6px;margin-top:24px}
        table{border-collapse:collapse;width:100%;margin-bottom:24px;font-size:11px}
        td,th{border:1px solid #ccc;padding:6px 8px;vertical-align:top}
        th{background:#fed7aa;color:#7c2d12}
        tr:nth-child(even){background:#fff7ed}
      </style></head><body><h1 style="color:#c2410c">Feuille de route Qualiopi CFA</h1>`;
      for (const name of wb.SheetNames) {
        html += `<h2>${name}</h2>` + XLSX.utils.sheet_to_html(wb.Sheets[name]).replace(/<\/?html[^>]*>|<\/?body[^>]*>|<\/?head[^>]*>/g, "");
      }
      html += "</body></html>";
      setPreviewContent(html);
      setPreviewTitle("Feuille de route Qualiopi CFA (Excel)");
      setCurrentDocId("feuille_route_cfa");
      setEditing(false);
    } catch (e) {
      console.error(e);
      toast.error("Aperçu indisponible : " + (e instanceof Error ? e.message : String(e)));
    }
  };

  const handleDownloadGuideAuditCFA = async () => {
    setLoadingGuideAuditCFA(true);
    try {
      const content = generateGuideAuditCFA(mergedOrganisme, [selectedFormation], catalog, allStagiaires, typeAuditCFA);
      const baseName = buildGenericFileName("GUIDE_AUDIT_CFA_QUOI_DIRE", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, "");
      if (exportFormat === "pdf") {
        const blob = await htmlToPdfBlob(content);
        saveAs(blob, baseName + ".pdf");
      } else {
        // Use the sync .doc fallback: more reliable than TurboDocx for large styled guides
        const blob = htmlToWordBlobSync(content);
        saveAs(blob, baseName + ".doc");
      }
      toast.success("Guide audit CFA téléchargé");
    } catch (e) {
      console.error("Guide audit CFA error:", e);
      toast.error("Erreur génération guide audit : " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setLoadingGuideAuditCFA(false);
    }
  };

  const handlePreviewGuideAuditCFA = () => {
    const content = generateGuideAuditCFA(mergedOrganisme, [selectedFormation], catalog, allStagiaires, typeAuditCFA);
    setPreviewContent(content);
    setPreviewTitle("Guide audit CFA – Quoi dire");
    setCurrentDocId("guide_audit_cfa");
    setEditing(false);
  };

  const isBDCOrg = (mergedOrganisme.typesActions || []).includes("bilans-competences");

  // ============ Guide Prépa Qualiopi universel (AF / CFA / BDC / VAE) ============
  const [typeActionPrepa, setTypeActionPrepa] = useState<TypeActionAudit>(() => detectTypeAction(mergedOrganisme));
  const [loadingGuidePrepa, setLoadingGuidePrepa] = useState(false);


  const handlePreviewGuidePrepa = () => {
    const content = generateGuideAuditUniversal(mergedOrganisme, [selectedFormation], catalog, allStagiaires, typeActionPrepa, typeAuditCFA);
    setPreviewContent(content);
    setPreviewTitle(`Guide Prépa Qualiopi — ${TYPE_ACTION_LABELS[typeActionPrepa]}`);
    setCurrentDocId(`guide_prepa_${typeActionPrepa.toLowerCase()}`);
    setEditing(false);
  };

  const handleDownloadGuidePrepa = async () => {
    setLoadingGuidePrepa(true);
    try {
      const content = generateGuideAuditUniversal(mergedOrganisme, [selectedFormation], catalog, allStagiaires, typeActionPrepa, typeAuditCFA);
      const baseName = buildGenericFileName(`GUIDE_PREPA_QUALIOPI_${typeActionPrepa}`, mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, "");
      if (exportFormat === "pdf") {
        const blob = await htmlToPdfBlob(content);
        saveAs(blob, baseName + ".pdf");
      } else {
        const blob = htmlToWordBlobSync(content);
        saveAs(blob, baseName + ".doc");
      }
      toast.success(`Guide Prépa Qualiopi ${typeActionPrepa} téléchargé`);
    } catch (e) {
      console.error("Guide prépa universel error:", e);
      toast.error("Erreur génération guide prépa : " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setLoadingGuidePrepa(false);
    }
  };

  const runBdcExport = () => {
    runJob({
      label: "Dossier Bilan de compétences",
      fileName: buildGenericFileName("BDC_DOSSIER_COMPLET", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".zip"),
      autoDownload: true,
      run: async (reporter) => {
        return await buildBDCNTConseilsZip(mergedOrganisme, selectedFormation, allStagiaires, reporter);
      },
    });
  };

  /** Pré-contrôle bloquant AF : stagiaire sans nom, prénom, dates, ou dates incohérentes. */
  const controlerStagiairesAF = (): string[] => {
    const erreurs: string[] = [];
    const parse = (v?: string): Date | null => {
      if (!v || !v.trim()) return null;
      const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      const d = m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date(v);
      return isNaN(d.getTime()) ? null : d;
    };
    (allStagiaires || []).forEach((s, i) => {
      const label = `${s.prenom || ""} ${s.nom || ""}`.trim() || `Stagiaire ${i + 1}`;
      if (!s.nom || !s.nom.trim()) erreurs.push(`${label} : nom manquant`);
      if (!s.prenom || !s.prenom.trim()) erreurs.push(`${label} : prénom manquant`);
      const deb = parse(s.dateDebutFormation || selectedFormation?.dateDebut);
      const fin = parse(s.dateFinFormation || selectedFormation?.dateFin);
      if (!deb || !fin) erreurs.push(`${label} : dates de formation manquantes`);
      else if (fin < deb) erreurs.push(`${label} : date de fin antérieure à la date de début`);
    });
    return erreurs;
  };

  const handleDownloadAll = () => {
    // Un bilan de compétences peut être exporté pendant son déroulement.
    if (isBDCOrg) {
      runBdcExport();
      return;
    }

    const erreurs = controlerStagiairesAF();
    if (erreurs.length > 0) {
      toast.error(
        `Génération bloquée — ${erreurs.length} anomalie(s) à corriger dans la fiche stagiaire : ${erreurs.slice(0, 5).join(" · ")}${erreurs.length > 5 ? " …" : ""}`,
        { duration: 12000 }
      );
      return;
    }


    runJob({
      label: "Dossier Qualiopi complet (ZIP)",
      fileName: buildGenericFileName("DOSSIER_QUALIOPI_COMPLET", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".zip"),
      autoDownload: true,
      run: async (reporter) => {
        return await buildFullDossierZip(reporter);
      },
    });
  };

  /** Construit le ZIP complet ; retourne le Blob (ne déclenche pas le saveAs). */
  const buildFullDossierZip = async (reporter?: { setProgress: (n: number) => void; setMessage: (s: string) => void }): Promise<Blob> => {
    const failures: { name: string; reason: string }[] = [];
    const generatedIds = new Set(generated);
    const totalFiles = 1 + catalog.reduce((count, doc) => {
      const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
      const hasStagiaireIdx = doc.params?.stagiaireIdx !== undefined;
      return count + (isPerStagiaire && !hasStagiaireIdx ? allStagiaires.length : 1);
    }, 0);

    const bulkPdfOptions = getActivePdfOptions();
    const zip = new JSZip();

    const addFileToZip = (path: string, payload: Blob | ArrayBuffer | string) => {
      zip.file(path, payload);
    };

    let processedFiles = 0;
    const updateProgress = async () => {
      processedFiles += 1;
      const pct = totalFiles > 0 ? (processedFiles / totalFiles) * 95 : 0;
      reporter?.setProgress(pct);
      if (processedFiles % (exportFormat === "pdf" ? 1 : 4) === 0 || processedFiles === totalFiles) {
        reporter?.setMessage(`${processedFiles}/${totalFiles}`);
        await yieldToBrowser(exportFormat === "pdf" ? 24 : 0);
      }
    };

    const safeRun = async (label: string, fn: () => Promise<void>) => {
        try {
          await fn();
        } catch (err) {
          console.error(`[ZIP] échec sur "${label}"`, err);
          const reason = err instanceof Error ? err.message : String(err);
          failures.push({ name: label, reason });
        } finally {
          await updateProgress();
        }
      };

      const toWordBlob = async (content: string) => {
        const blob = await htmlToWordBlob(content);
        const extension = blob.type.includes("officedocument") ? ".docx" : ".doc";
        return { blob, extension };
      };

      await safeRun("BOOK_QUALIOPI", async () => {
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
      });

      for (const doc of catalog) {
        const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
        const hasStagiaireIdx = doc.params?.stagiaireIdx !== undefined;
        const basePath = isBDCOrg && doc.indicateur === 2 ? "Indicateur 2" : getDocBasePath(doc);

        if (MAIL_TEMPLATE_FILES[doc.template] && typeof doc.params?.stagiaireIdx === "number") {
          const s = allStagiaires[doc.params.stagiaireIdx];
          const mailFolder = s ? `${basePath}/${buildStagiaireFolderName(s)}` : basePath;
          await safeRun(`${doc.nom} (mail)`, async () => {
            if (s) {
              const mailBlob = await processMailDocxTemplate(MAIL_TEMPLATE_FILES[doc.template], mergedOrganisme, selectedFormation, s);
              addFileToZip(`${mailFolder}/${buildCatalogFileName(doc, s, ".docx")}`, mailBlob);
            }
          });
        } else if (hasStagiaireIdx) {
          const si = doc.params!.stagiaireIdx as number;
          const stagiaire = allStagiaires[si] || allStagiaires[0];
          const stagFolder = `${basePath}/${buildStagiaireFolderName(stagiaire)}`;

          if (doc.template === "cerfa_apprentissage") {
            await safeRun(`${doc.nom} (${stagiaire.nom})`, async () => {
              const blob = await genCerfaApprentissagePdf(mergedOrganisme, selectedFormation, stagiaire);
              addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".pdf")}`, blob);
            });
          } else if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
            await safeRun(`${doc.nom} (${stagiaire.nom})`, async () => {
              const resp = await fetch(getStaticFileUrl(doc)!);
              const fileBlob = await resp.blob();
              addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire)}`, fileBlob);
            });
          } else if (NATIVE_XLSX_TEMPLATES.has(doc.template)) {
            await safeRun(`${doc.nom} (${stagiaire.nom})`, async () => {
              const blob = await generateNativeXlsxBlob(doc.template, mergedOrganisme, selectedFormation, allStagiaires, stagiaire);
              if (blob) addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".xlsx")}`, blob);
            });
          } else if (
            doc.template === "indicateurs_performance"
            || doc.template === "tableau_suivi_parcours_excel"
            || doc.template === "plan_dev_competences_excel"
            || doc.template === "tableau_amelioration_continue_excel"
            || doc.template === "suivi_dysfonctionnements_excel"
            || doc.template === "relances_appreciations_excel"
            || doc.template === "vae_indicateurs_previsionnels"
            || REAL_XLSX_TEMPLATES.has(doc.template)
          ) {
            await safeRun(`${doc.nom} (${stagiaire.nom})`, async () => {
              const excelContent = doc.template === "indicateurs_performance"
                ? generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires)
                : doc.template === "tableau_suivi_parcours_excel"
                  ? generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires)
                  : doc.template === "vae_indicateurs_previsionnels"
                    ? generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation)
                    : generateContent(doc);
              if (REAL_XLSX_TEMPLATES.has(doc.template)) {
                addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".xlsx")}`, htmlToXlsxBlob(excelContent));
              } else {
                addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".xls")}`, excelToBlob(excelContent));
              }
            });
          } else {
            await safeRun(`${doc.nom} (${stagiaire.nom})`, async () => {
              const content = generateContent(doc);
              if (exportFormat === "pdf") {
                addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".pdf")}`, await htmlToPdfBlob(content, bulkPdfOptions));
              } else {
                const wordBlob = await toWordBlob(content);
                addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, wordBlob.extension)}`, wordBlob.blob);
              }
            });
          }
        } else if (isPerStagiaire) {
          for (let si = 0; si < allStagiaires.length; si++) {
            const stagiaire = allStagiaires[si];
            const stagFolder = `${basePath}/${buildStagiaireFolderName(stagiaire)}`;
            await safeRun(`${doc.nom} (${stagiaire.nom})`, async () => {
              const content = generateContent(doc, si);
              if (exportFormat === "pdf") {
                addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".pdf")}`, await htmlToPdfBlob(content, bulkPdfOptions));
              } else {
                const wordBlob = await toWordBlob(content);
                addFileToZip(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, wordBlob.extension)}`, wordBlob.blob);
              }
            });
          }
        } else if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
          await safeRun(doc.nom, async () => {
            const resp = await fetch(getStaticFileUrl(doc)!);
            const fileBlob = await resp.blob();
            addFileToZip(`${basePath}/${buildCatalogFileName(doc)}`, fileBlob);
          });
        } else if (DOCX_TEMPLATE_FILES[doc.template]) {
          await safeRun(doc.nom, async () => {
            const docxBlob = await processDocxTemplate(DOCX_TEMPLATE_FILES[doc.template], mergedOrganisme);
            addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, ".docx")}`, docxBlob);
          });
        } else if (doc.template === "suivi_parcours_beneficiaires_excel") {
          await safeRun(doc.nom, async () => {
            const { generateSuiviParcoursBeneficiairesXlsxBlob } = await import("@/lib/suiviParcoursBeneficiairesXlsx");
            const blob = generateSuiviParcoursBeneficiairesXlsxBlob(mergedOrganisme, selectedFormation, allStagiaires);
            addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, ".xlsx")}`, blob);
          });
        } else if (doc.template === "suivi_public_beneficiaire_excel") {
          await safeRun(doc.nom, async () => {
            const { generateSuiviPublicBeneficiaireXlsxBlob } = await import("@/lib/suiviPublicBeneficiaireXlsx");
            const blob = generateSuiviPublicBeneficiaireXlsxBlob(mergedOrganisme, selectedFormation, allStagiaires);
            addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, ".xlsx")}`, blob);
          });
        } else if (doc.template === "suivi_pfmp_excel") {
          await safeRun(doc.nom, async () => {
            const { generateSuiviPFMPXlsxBlob } = await import("@/lib/suiviPFMPXlsx");
            const blob = generateSuiviPFMPXlsxBlob(mergedOrganisme, selectedFormation, allStagiaires);
            addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, ".xlsx")}`, blob);
          });
        } else if (doc.template === "suivi_inscriptions_excel") {
          await safeRun(doc.nom, async () => {
            const { generateSuiviInscriptionsXlsxBlob } = await import("@/lib/suiviInscriptionsXlsx");
            const blob = generateSuiviInscriptionsXlsxBlob(mergedOrganisme, selectedFormation, allStagiaires);
            addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, ".xlsx")}`, blob);
          });
        } else if (
          doc.template === "indicateurs_performance"
          || doc.template === "tableau_suivi_parcours_excel"
          || doc.template === "plan_dev_competences_excel"
          || doc.template === "tableau_amelioration_continue_excel"
          || doc.template === "suivi_dysfonctionnements_excel"
          || doc.template === "relances_appreciations_excel"
          || doc.template === "vae_indicateurs_previsionnels"
          || REAL_XLSX_TEMPLATES.has(doc.template)
        ) {
          await safeRun(doc.nom, async () => {
            const excelContent = doc.template === "indicateurs_performance"
              ? generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires)
              : doc.template === "tableau_suivi_parcours_excel"
                ? generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires)
                : doc.template === "vae_indicateurs_previsionnels"
                  ? generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation)
                  : generateContent(doc);
            if (REAL_XLSX_TEMPLATES.has(doc.template)) {
              addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, ".xlsx")}`, htmlToXlsxBlob(excelContent));
            } else {
              addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, ".xls")}`, excelToBlob(excelContent));
            }
          });
        } else {
          await safeRun(doc.nom, async () => {
            const content = generateContent(doc);
            if (exportFormat === "pdf") {
              addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, ".pdf")}`, await htmlToPdfBlob(content, bulkPdfOptions));
            } else {
              const wordBlob = await toWordBlob(content);
              addFileToZip(`${basePath}/${buildCatalogFileName(doc, null, wordBlob.extension)}`, wordBlob.blob);
            }
          });
        }
        generatedIds.add(doc.id);
      }

      if (failures.length > 0) {
        const reportLines = [
          "RAPPORT DES ECHECS DE GENERATION",
          `Total : ${failures.length} document(s) en echec sur ${totalFiles}`,
          "",
          ...failures.map((f, i) => `${i + 1}. ${f.name}\n   -> ${f.reason}`),
        ];
        zip.file("_ECHECS_GENERATION.txt", reportLines.join("\n"));
      }

    reporter?.setMessage("Compression du ZIP...");
    const blob = await zip.generateAsync({ type: "blob" }, (meta) => {
      reporter?.setProgress(95 + meta.percent * 0.05);
    });
    setGenerated(generatedIds);
    if (failures.length > 0) {
      toast.warning(`${failures.length} document(s) en échec. Voir _ECHECS_GENERATION.txt dans le ZIP.`);
    }
    return blob;
  };

  const handleDownloadCritere = async (critereNum: number) => {
    setGenerating(true);
    setGenerationProgressText("");
    try {
      const critereDocs = catalog.filter((doc) => doc.critere === critereNum && !doc.id.startsWith("cfa_siteweb_"));
      const totalFiles = critereDocs.reduce((count, doc) => {
        const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
        const hasStagiaireIdx = doc.params?.stagiaireIdx !== undefined;
        return count + (isPerStagiaire && !hasStagiaireIdx ? allStagiaires.length : 1);
      }, 0);
      const directBDCInd2 = isBDCOrg && critereNum === 1;

      if (totalFiles === 0) {
        toast.info(`Aucun fichier à exporter pour le Critère ${critereNum}.`);
        return;
      }

      const bulkPdfOptions = getActivePdfOptions();
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
        const basePath = directBDCInd2 && doc.indicateur === 2 ? "Indicateur 2" : getDocBasePath(doc);

        if (MAIL_TEMPLATE_FILES[doc.template] && typeof doc.params?.stagiaireIdx === "number") {
          const s = allStagiaires[doc.params.stagiaireIdx];
          const mailFolder = s ? `${basePath}/${buildStagiaireFolderName(s)}` : basePath;
          if (s) {
            const mailBlob = await processMailDocxTemplate(MAIL_TEMPLATE_FILES[doc.template], mergedOrganisme, selectedFormation, s);
            zip.file(`${mailFolder}/${buildCatalogFileName(doc, s, ".docx")}`, mailBlob);
          }
          await updateProgress();
        } else if (hasStagiaireIdx) {
          const si = doc.params!.stagiaireIdx as number;
          const stagiaire = allStagiaires[si] || allStagiaires[0];
          const stagFolder = `${basePath}/${buildStagiaireFolderName(stagiaire)}`;

          if (doc.template === "cerfa_apprentissage") {
            const blob = await genCerfaApprentissagePdf(mergedOrganisme, selectedFormation, stagiaire);
            zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".pdf")}`, blob);
          } else if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
            const resp = await fetch(getStaticFileUrl(doc)!);
            zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire)}`, await resp.blob());
          } else if (NATIVE_XLSX_TEMPLATES.has(doc.template)) {
            const blob = await generateNativeXlsxBlob(doc.template, mergedOrganisme, selectedFormation, allStagiaires, stagiaire);
            if (blob) zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".xlsx")}`, blob);
          } else if (["indicateurs_performance", "tableau_suivi_parcours_excel", "plan_dev_competences_excel", "tableau_amelioration_continue_excel", "suivi_dysfonctionnements_excel", "relances_appreciations_excel", "vae_indicateurs_previsionnels"].includes(doc.template) || REAL_XLSX_TEMPLATES.has(doc.template)) {
            const excelContent = doc.template === "indicateurs_performance"
              ? generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires)
              : doc.template === "tableau_suivi_parcours_excel"
                ? generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires)
                : doc.template === "vae_indicateurs_previsionnels"
                  ? generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation)
                  : generateContent(doc);
            if (REAL_XLSX_TEMPLATES.has(doc.template)) {
              zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".xlsx")}`, htmlToXlsxBlob(excelContent));
            } else {
              zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".xls")}`, excelToBlob(excelContent));
            }
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
            const stagFolder = `${basePath}/${buildStagiaireFolderName(stagiaire)}`;
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
        } else if (NATIVE_XLSX_TEMPLATES.has(doc.template)) {
          const blob = await generateNativeXlsxBlob(doc.template, mergedOrganisme, selectedFormation, allStagiaires);
          if (blob) zip.file(`${basePath}/${buildCatalogFileName(doc, null, ".xlsx")}`, blob);
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
      const indDocs = catalog.filter((doc) => doc.critere === critereNum && doc.indicateur === indicateurNum && !doc.id.startsWith("cfa_siteweb_"));
      const totalFiles = indDocs.reduce((count, doc) => {
        const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
        const hasStagiaireIdx = doc.params?.stagiaireIdx !== undefined;
        return count + (isPerStagiaire && !hasStagiaireIdx ? allStagiaires.length : 1);
      }, 0);

      if (totalFiles === 0) {
        toast.info(`Aucun fichier pour l'indicateur ${indicateurNum}.`);
        return;
      }

      const bulkPdfOptions = getActivePdfOptions();
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
        const basePath = isBDCOrg && indicateurNum === 2 ? "Indicateur 2" : getDocBasePath(doc);

        if (MAIL_TEMPLATE_FILES[doc.template] && typeof doc.params?.stagiaireIdx === "number") {
          const s = allStagiaires[doc.params.stagiaireIdx];
          const mailFolder = s ? `${basePath}/${buildStagiaireFolderName(s)}` : basePath;
          if (s) {
            const mailBlob = await processMailDocxTemplate(MAIL_TEMPLATE_FILES[doc.template], mergedOrganisme, selectedFormation, s);
            zip.file(`${mailFolder}/${buildCatalogFileName(doc, s, ".docx")}`, mailBlob);
          }
          await updateProgress();
        } else if (hasStagiaireIdx) {
          const si = doc.params!.stagiaireIdx as number;
          const stagiaire = allStagiaires[si] || allStagiaires[0];
          const stagFolder = `${basePath}/${buildStagiaireFolderName(stagiaire)}`;

          if (doc.template === "cerfa_apprentissage") {
            const blob = await genCerfaApprentissagePdf(mergedOrganisme, selectedFormation, stagiaire);
            zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".pdf")}`, blob);
          } else if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
            const resp = await fetch(getStaticFileUrl(doc)!);
            zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire)}`, await resp.blob());
          } else if (NATIVE_XLSX_TEMPLATES.has(doc.template)) {
            const blob = await generateNativeXlsxBlob(doc.template, mergedOrganisme, selectedFormation, allStagiaires, stagiaire);
            if (blob) zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".xlsx")}`, blob);
          } else if (["indicateurs_performance", "tableau_suivi_parcours_excel", "plan_dev_competences_excel", "tableau_amelioration_continue_excel", "suivi_dysfonctionnements_excel", "relances_appreciations_excel", "vae_indicateurs_previsionnels"].includes(doc.template) || REAL_XLSX_TEMPLATES.has(doc.template)) {
            const excelContent = doc.template === "indicateurs_performance"
              ? generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires)
              : doc.template === "tableau_suivi_parcours_excel"
                ? generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires)
                : doc.template === "vae_indicateurs_previsionnels"
                  ? generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation)
                  : generateContent(doc);
            if (REAL_XLSX_TEMPLATES.has(doc.template)) {
              zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".xlsx")}`, htmlToXlsxBlob(excelContent));
            } else {
              zip.file(`${stagFolder}/${buildCatalogFileName(doc, stagiaire, ".xls")}`, excelToBlob(excelContent));
            }
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
            const stagFolder = `${basePath}/${buildStagiaireFolderName(stagiaire)}`;
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
        } else if (NATIVE_XLSX_TEMPLATES.has(doc.template)) {
          const blob = await generateNativeXlsxBlob(doc.template, mergedOrganisme, selectedFormation, allStagiaires);
          if (blob) zip.file(`${basePath}/${buildCatalogFileName(doc, null, ".xlsx")}`, blob);
          await updateProgress();
        } else if (["indicateurs_performance", "tableau_suivi_parcours_excel", "plan_dev_competences_excel", "tableau_amelioration_continue_excel", "suivi_dysfonctionnements_excel", "relances_appreciations_excel", "vae_indicateurs_previsionnels"].includes(doc.template) || REAL_XLSX_TEMPLATES.has(doc.template)) {
          const excelContent = doc.template === "indicateurs_performance"
            ? generateExcelTableauBordPerformance(mergedOrganisme, selectedFormation, allStagiaires)
            : doc.template === "tableau_suivi_parcours_excel"
              ? generateExcelTableauSuiviParcours(mergedOrganisme, selectedFormation, allStagiaires)
              : doc.template === "vae_indicateurs_previsionnels"
                ? generateExcelIndicateursPrevisionnelsVAE(mergedOrganisme, selectedFormation)
                : generateContent(doc);
          if (REAL_XLSX_TEMPLATES.has(doc.template)) {
            zip.file(`${basePath}/${buildCatalogFileName(doc, null, ".xlsx")}`, htmlToXlsxBlob(excelContent));
          } else {
            zip.file(`${basePath}/${buildCatalogFileName(doc, null, ".xls")}`, excelToBlob(excelContent));
          }
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
            // Utilise getDocBasePath pour respecter les sous-dossiers (ex: 14_MISSIONS_CFA/Mission_X)
            // Évite les collisions de noms de fichiers (notamment dans IND 10 qui a 50+ documents)
            const basePath = getDocBasePath(doc);
            const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);

            if (isPerStagiaire) {
              for (let si = 0; si < allStagiaires.length; si++) {
                const stagiaire = allStagiaires[si];
                const stagFolder = `${basePath}/${buildStagiaireFolderName(stagiaire)}`;
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

      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900 flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">Date d'arrêté (temps de connexion / émargement) :</span>
        <input
          type="date"
          defaultValue={typeof window !== 'undefined' ? (window.sessionStorage.getItem('connexion_as_of') || '') : ''}
          onChange={(e) => {
            const v = e.target.value;
            if (v) window.sessionStorage.setItem('connexion_as_of', v);
            else window.sessionStorage.removeItem('connexion_as_of');
            toast.success(v ? `Documents arrêtés au ${v}` : "Date d'arrêté réinitialisée (= aujourd'hui)");
          }}
          className="px-3 py-1.5 rounded-lg text-sm border border-blue-300 bg-white dark:bg-background"
        />
        <span className="text-xs text-muted-foreground">
          Remplit les jours ≤ cette date (par défaut = aujourd'hui). Utile pour simuler une formation en cours.
        </span>
      </div>

      <SignatairesConnexionForm />




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

      <DossierOutputSettings
        organisme={mergedOrganisme}
        scope="qualiopi"
        manualStyle={docStyle}
        onManualStyleChange={handleStyleChange}
      />

      {/* ========== PRÉPA QUALIOPI UNIVERSEL (AF / CFA / BDC / VAE) ========== */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-blue-400/50 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100/60 shadow-md">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <div className="relative p-5 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[260px]">
              <h3 className="font-bold text-blue-800 flex items-center gap-2 text-base">
                <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded tracking-wider">PRÉPA</span>
                GUIDE PRÉPA QUALIOPI — Quoi dire à l'auditeur
              </h3>
              <p className="text-xs text-blue-900/70 mt-1.5 leading-relaxed">
                Fonctionne pour <strong>AF</strong> (Actions de Formation), <strong>CFA</strong> (Apprentissage),
                <strong> BDC</strong> (Bilan de compétences) et <strong>VAE</strong>. Indicateurs filtrés selon le périmètre,
                avec niveau attendu, script « ce qu'il faut dire », documents-preuves et points de vigilance.
              </p>
            </div>
            <div className="flex flex-col gap-1 min-w-[220px]">
              <label className="text-[11px] font-semibold text-blue-900 uppercase tracking-wide">Type d'action</label>
              <Select value={typeActionPrepa} onValueChange={(v) => setTypeActionPrepa(v as TypeActionAudit)}>
                <SelectTrigger className="h-9 bg-white border-blue-300 text-blue-900 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AF">Actions de formation (AF)</SelectItem>
                  <SelectItem value="CFA">Apprentissage (CFA)</SelectItem>
                  <SelectItem value="BDC">Bilan de compétences (BDC)</SelectItem>
                  <SelectItem value="VAE">Validation des Acquis (VAE)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-blue-200 p-3 flex gap-1.5 flex-wrap">
            <Button variant="ghost" size="sm" onClick={handlePreviewGuidePrepa} className="flex-1 h-9 text-xs text-blue-700 hover:bg-blue-100 min-w-[120px]">
              Aperçu du guide
            </Button>
            <Button size="sm" onClick={handleDownloadGuidePrepa} disabled={loadingGuidePrepa} className="flex-1 h-9 text-xs bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]">
              {loadingGuidePrepa ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : null}
              Télécharger ({exportFormat === "pdf" ? "PDF" : "Word"})
            </Button>
            <Button size="sm" onClick={handleDownloadFeuilleRoute} className="flex-1 h-9 text-xs bg-emerald-600 hover:bg-emerald-700 text-white min-w-[180px]">
              Feuille de route Excel (32 indicateurs)
            </Button>
          </div>
        </div>
      </div>

      {isCFAOrg && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-orange-400/50 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/60 shadow-md">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <div className="relative p-5 space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-[260px]">
                <h3 className="font-bold text-orange-800 flex items-center gap-2 text-base">
                  <span className="text-[10px] font-bold bg-orange-600 text-white px-2 py-0.5 rounded tracking-wider">CFA</span>
                  PRÉPA AUDIT QUALIOPI CFA
                </h3>
                <p className="text-xs text-orange-900/70 mt-1.5 leading-relaxed">
                  Pack spécial CFA : 32 indicateurs V9 avec niveau attendu,
                  script « ce qu'il faut dire », preuves et points de vigilance. Format Dreamers Team.
                  Inclut les détails de l'organisme, de la formation et des apprenants audités.
                </p>
              </div>
              <div className="flex flex-col gap-1 min-w-[220px]">
                <label className="text-[11px] font-semibold text-orange-900 uppercase tracking-wide">Type d'audit</label>
                <Select value={typeAuditCFA} onValueChange={(v) => setTypeAuditCFA(v as any)}>
                  <SelectTrigger className="h-9 bg-white border-orange-300 text-orange-900 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="initial">Audit initial (nouvel entrant)</SelectItem>
                    <SelectItem value="surveillance">Audit de surveillance</SelectItem>
                    <SelectItem value="renouvellement">Audit de renouvellement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Guide audit */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-orange-200 p-3 flex flex-col gap-2 hover:border-orange-400 transition-colors">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-orange-900">Guide audit</h4>
                  <p className="text-[11px] text-orange-900/60 leading-snug">Quoi dire à l'auditeur, indicateur par indicateur</p>
                </div>
                <div className="flex gap-1.5">
                  <Button variant="ghost" size="sm" onClick={handlePreviewGuideAuditCFA} className="flex-1 h-8 text-xs text-orange-700 hover:bg-orange-100">
                    Aperçu
                  </Button>
                  <Button size="sm" onClick={handleDownloadGuideAuditCFA} disabled={loadingGuideAuditCFA} className="flex-1 h-8 text-xs bg-orange-600 hover:bg-orange-700 text-white">
                    {loadingGuideAuditCFA ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : null}
                    Télécharger
                  </Button>
                </div>
              </div>

              {/* Feuille de route */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-orange-200 p-3 flex flex-col gap-2 hover:border-orange-400 transition-colors">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-orange-900">Feuille de route</h4>
                  <p className="text-[11px] text-orange-900/60 leading-snug">Tableau Excel de suivi des 32 indicateurs</p>
                </div>
                <div className="flex gap-1.5">
                  <Button variant="ghost" size="sm" onClick={handlePreviewFeuilleRouteCFA} className="flex-1 h-8 text-xs text-orange-700 hover:bg-orange-100">
                    Aperçu
                  </Button>
                  <Button size="sm" onClick={handleDownloadFeuilleRouteCFA} disabled={loadingFeuilleRouteCFA} className="flex-1 h-8 text-xs bg-orange-600 hover:bg-orange-700 text-white">
                    {loadingFeuilleRouteCFA ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : null}
                    Excel
                  </Button>
                </div>
              </div>

              {/* Book Qualiopi CFA */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-orange-200 p-3 flex flex-col gap-2 hover:border-orange-400 transition-colors">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-orange-900">Book Qualiopi CFA</h4>
                  <p className="text-[11px] text-orange-900/60 leading-snug">Dossier complet relié, prêt pour audit</p>
                </div>
                <div className="flex gap-1.5">
                  <Button variant="ghost" size="sm" onClick={handlePreviewBookCFA} className="flex-1 h-8 text-xs text-orange-700 hover:bg-orange-100">
                    Aperçu
                  </Button>
                  <Button size="sm" onClick={handleDownloadBookCFA} disabled={loadingBookCFA} className="flex-1 h-8 text-xs bg-orange-600 hover:bg-orange-700 text-white">
                    {loadingBookCFA ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : null}
                    Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
            const critereDocs = docsIndex.byCritere.get(critere.numero) || [];
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
                      const indDocs = docsIndex.byInd.get(`${critere.numero}-${indicateur.numero}`) || [];
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

                          {isIndExpanded && (() => {
                            const key = `${critere.numero}-${indicateur.numero}`;
                            const limit = visibleDocs[key] ?? PAGE_DOCS;
                            const shown = indDocs.slice(0, limit);
                            return (
                            <div className="ml-8 space-y-0.5 mt-1">
                              {shown.map((doc) => {
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
                              {indDocs.length > shown.length && (
                                <button
                                  className="text-xs text-primary underline p-1.5"
                                  onClick={() => setVisibleDocs(v => ({ ...v, [key]: limit + PAGE_DOCS }))}
                                >
                                  Afficher {Math.min(PAGE_DOCS, indDocs.length - shown.length)} documents de plus ({shown.length} / {indDocs.length})
                                </button>
                              )}
                            </div>
                            );
                          })()}
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
        const mailDocs = catalog.filter((doc) => doc.critere === 0 && (!!MAIL_TEMPLATE_FILES[doc.template] || isHtmlMailTemplate(doc.template)));
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
                      } else if (isHtmlMailTemplate(doc.template) && typeof doc.params?.stagiaireIdx === "number") {
                        const s = allStagiaires[doc.params.stagiaireIdx];
                        if (s) {
                          const html = generateContent(doc, doc.params.stagiaireIdx);
                          const ext = exportFormat === "pdf" ? ".pdf" : ".doc";
                          const blob = exportFormat === "pdf"
                            ? await htmlToPdfBlob(html)
                            : new Blob([html], { type: "application/msword" });
                          zip.file(buildCatalogFileName(doc, s, ext), blob);
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

      {/* === SITE WEB SECTION (outside critères) === */}
      {(() => {
        const siteWebDocs = catalog.filter((doc) => doc.id.startsWith("cfa_siteweb_"));
        if (siteWebDocs.length === 0) return null;
        const isSWExpanded = expandedCriteres.has(98);
        const swGenerated = siteWebDocs.filter((doc) => generated.has(doc.id)).length;

        return (
          <div className="bg-card border rounded-xl overflow-hidden shadow-card">
            <div className="flex items-center">
              <button
                onClick={() => toggleCritere(98)}
                className="flex-1 p-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left"
              >
                {isSWExpanded ? <ChevronDown className="w-4 h-4 text-primary shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                <span className="text-sm font-semibold">📁 SITE WEB – Documents publics du site</span>
                <span className="text-xs text-muted-foreground ml-2">
                  ({siteWebDocs.length} docs, {swGenerated} générés)
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
                    for (const doc of siteWebDocs) {
                      try {
                        if (doc.template === "pdf_static" && getStaticFileUrl(doc)) {
                          const resp = await fetch(getStaticFileUrl(doc)!);
                          const fileBlob = await resp.blob();
                          zip.file(buildCatalogFileName(doc), fileBlob);
                        } else {
                          const content = generateContent(doc);
                          if (exportFormat === "pdf") {
                            zip.file(buildCatalogFileName(doc, null, ".pdf"), await htmlToPdfBlob(content));
                          } else {
                            const wBlob = await htmlToWordBlob(content);
                            const ext = wBlob.type.includes("officedocument") ? ".docx" : ".doc";
                            zip.file(buildCatalogFileName(doc, null, ext), wBlob);
                          }
                        }
                      } catch (err) {
                        console.error(`[SITE WEB] échec ${doc.nom}`, err);
                      }
                    }
                    const blob = await zip.generateAsync({ type: "blob" });
                    saveAs(blob, buildGenericFileName("DOCUMENTS_SITE_WEB", mergedOrganisme.nom, mergedOrganisme.version, mergedOrganisme.dateMaj, ".zip"));
                    toast.success("ZIP SITE WEB téléchargé.");
                  } catch (err) {
                    console.error(err);
                    toast.error("Erreur pendant la génération du ZIP SITE WEB.");
                  } finally {
                    setGenerating(false);
                  }
                }}
              >
                <Archive className="w-3 h-3" /> ZIP
              </Button>
            </div>

            {isSWExpanded && (
              <div className="border-t px-3 pb-3 space-y-0.5">
                {siteWebDocs.map((doc) => (
                  <div key={doc.id} className={`flex items-center gap-2 p-1.5 rounded-md text-xs hover:bg-secondary/30 transition-colors ${generated.has(doc.id) ? "bg-accent/5" : ""}`}>
                    <span className={`shrink-0 ${generated.has(doc.id) ? "text-accent font-bold" : "text-muted-foreground"}`}>
                      {generated.has(doc.id) ? "✓" : "•"}
                    </span>
                    <span className="flex-1 truncate">{doc.nom}</span>
                    <button onClick={() => handlePreview(doc)} className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground" title="Aperçu">
                      Voir
                    </button>
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

      {(previewContent || previewBlobUrl || previewLoading || previewError) && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
            <h3 className="text-lg font-bold truncate flex-1">{previewTitle || "Aperçu"}</h3>
            <div className="flex gap-2 shrink-0">
              {!previewBlobUrl && !previewLoading && !previewError && previewContent && (
                <Button
                  variant={editing ? "default" : "outline"}
                  size="sm"
                  onClick={handleToggleEdit}
                >
                  {editing ? "Enregistrer" : "Modifier"}
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => {
                if (previewTimeoutRef.current) { clearTimeout(previewTimeoutRef.current); previewTimeoutRef.current = null; }
                setPreviewContent(null); setPreviewBlobUrl(null); setEditing(false);
                setPreviewLoading(false); setPreviewError(null);
              }}>
                <X className="w-4 h-4 mr-1" /> Fermer
              </Button>
            </div>
          </div>
          {editing && (
            <div className="mb-2 p-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-700 dark:text-amber-400">
              Mode édition activé : cliquez directement dans le document pour le modifier. Les changements seront sauvegardés.
            </div>
          )}
          <div className="bg-card border rounded-xl shadow-elevated overflow-hidden relative">
            {previewLoading && (
              <div className="flex flex-col items-center justify-center h-[600px] gap-3 bg-muted/30">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Génération de l'aperçu en cours…</p>
                <p className="text-xs text-muted-foreground">Cela peut prendre quelques secondes pour les gros documents.</p>
              </div>
            )}
            {!previewLoading && previewError && (
              <div className="flex flex-col items-center justify-center h-[400px] gap-3 bg-destructive/5 px-6 text-center">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="w-6 h-6 text-destructive" />
                </div>
                <p className="text-sm font-semibold text-destructive">Aperçu indisponible</p>
                <p className="text-xs text-muted-foreground max-w-md">{previewError}</p>
                <Button variant="outline" size="sm" onClick={() => setPreviewError(null)}>Fermer le message</Button>
              </div>
            )}
            {!previewLoading && !previewError && previewBlobUrl && (
              <iframe
                src={previewBlobUrl}
                className="w-full h-[700px] border-0"
                title="Aperçu PDF"
              />
            )}
            {!previewLoading && !previewError && !previewBlobUrl && previewContent && (
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
