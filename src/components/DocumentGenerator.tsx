import { useState, useMemo, useCallback, useRef } from "react";
import { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, CRITERES_INFO, DocEntry, DocStyleConfig, DEFAULT_DOC_STYLE } from "@/types/qualiopi";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { generateBookQualiopi } from "@/lib/bookQualiopi";
import { setDocStyle } from "@/lib/docBuilder";
import { SAMPLE_FORMATIONS, SAMPLE_FORMATEURS, mergeStagiaires, mergeOrganisme } from "@/lib/sampleData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronRight, X, Loader2 } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import DocStyleConfigPanel from "./DocStyleConfigPanel";
import { htmlToWordBlob, downloadAsWord, htmlToWordBlobSync } from "@/lib/wordExport";
import { generateExcelTableauBordPerformance, generateExcelTableauSuiviParcours, excelToBlob } from "@/lib/xlsxGenerator";
import { downloadAsPdf, htmlToPdfBlob } from "@/lib/pdfExport";

type ExportFormat = "doc" | "pdf";

interface DocumentGeneratorProps {
  organisme: OrganismeInfo;
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
  criteres: CritereData[];
}

// Templates that should generate per-stagiaire individual files
const PER_STAGIAIRE_TEMPLATES = new Set([
  "qcm_positionnement", "qcm_final", "exercices_pratiques",
  "eval_positionnement_remplie", "eval_intermediaire_remplie", "eval_finale_remplie",
  "attestation_formation", "certificat_reussite", "convocation",
  "attestation_entree_formation", "attestation_assiduite", "certificat_realisation",
  "fiche_autoevaluation", "fiche_renseignement", "trame_eval_besoins",
  "contrat_formation_pro", "dossier_inscription",
  "contrat_apprentissage", "livret_apprentissage_cfa",
  "analyse_parcours_pro", "plan_action_bilan", "synthese_bilan",
  "livret_recevabilite_vae", "dossier_validation_vae", "accompagnement_vae",
  "attestation_inscription_cfa", "fiche_autoevaluation_apprenti",
]);

/** Format court pour éviter les chemins >259 chars sur Windows */
function buildFileName(docName: string, orgName: string, version: string, dateMaj: string, ext: string = ".doc"): string {
  const d = dateMaj ? new Date(dateMaj) : new Date();
  const maj = `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  const clean = (s: string) => s.replace(/[/\\:*?"<>|]/g, '_').substring(0, 60);
  const shortOrg = clean(orgName).substring(0, 20);
  return `${clean(docName)} - ${shortOrg} - V${version || '1'} - ${maj}${ext}`;
}

/** Shortened path for ZIP to avoid Windows 259 char limit */
function shortCriterePath(critere: number, indicateur: number): string {
  return `QUALIOPI/CT${critere}/IND${indicateur}`;
}

const DocumentGenerator = ({ organisme, formation, stagiaires }: DocumentGeneratorProps) => {
  const [expandedCriteres, setExpandedCriteres] = useState<Set<number>>(new Set());
  const [expandedIndicateurs, setExpandedIndicateurs] = useState<Set<number>>(new Set());
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState(false);
  const [editedContents, setEditedContents] = useState<Map<string, string>>(new Map());
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const [selectedStagiaire, setSelectedStagiaire] = useState<number>(0);
  const [docStyle, setDocStyleState] = useState<DocStyleConfig>({ ...DEFAULT_DOC_STYLE });
  const [exportFormat, setExportFormat] = useState<ExportFormat>("pdf");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleStyleChange = useCallback((newStyle: DocStyleConfig) => {
    setDocStyleState(newStyle);
    setDocStyle(newStyle);
    // Clear edited contents so regeneration uses new style
    setEditedContents(new Map());
  }, []);

  const allStagiaires = useMemo(() => mergeStagiaires(stagiaires), [stagiaires]);
  const catalog = useMemo(() => getFullCatalog(organisme, formation, stagiaires), [organisme, formation, stagiaires]);

  const toggleCritere = (num: number) => {
    setExpandedCriteres(prev => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  };

  const toggleIndicateur = (num: number) => {
    setExpandedIndicateurs(prev => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  };

  const generateContent = useCallback((doc: DocEntry, stagiaireIdx?: number) => {
    // Check if we have an edited version
    const editKey = `${doc.id}_s${stagiaireIdx ?? "all"}`;
    if (editedContents.has(editKey)) return editedContents.get(editKey)!;

    const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
    if (isPerStagiaire && stagiaireIdx !== undefined) {
      // Generate for a single stagiaire
      const singleStagiaire = [allStagiaires[stagiaireIdx]];
      return generateDocumentById(doc.id, doc.template, doc.params, organisme, formation, singleStagiaire);
    }
    return generateDocumentById(doc.id, doc.template, doc.params, organisme, formation, stagiaires);
  }, [organisme, formation, stagiaires, allStagiaires, editedContents]);

  const handlePreview = (doc: DocEntry) => {
    if (doc.template === "pdf_static" && doc.params?.pdfFile) {
      // Open PDF in new tab
      window.open(`/docs/${doc.params.pdfFile}`, '_blank');
      setGenerated(prev => new Set(prev).add(doc.id));
      return;
    }
    const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
    if (isPerStagiaire && selectedStagiaire === -1) {
      // Preview all stagiaires
      const allContent = allStagiaires.map((s, i) => generateContent(doc, i)).join("<hr style='border:2px solid #1e3a7b;margin:30px 0'>");
      setPreviewContent(allContent);
      setPreviewTitle(doc.nom + ` – Tous les stagiaires (${allStagiaires.length})`);
    } else {
      const content = generateContent(doc, isPerStagiaire ? selectedStagiaire : undefined);
      setPreviewContent(content);
      setPreviewTitle(doc.nom + (isPerStagiaire && selectedStagiaire >= 0 ? ` – ${allStagiaires[selectedStagiaire]?.prenom} ${allStagiaires[selectedStagiaire]?.nom}` : ""));
    }
    setCurrentDocId(doc.id);
    setEditing(false);
    setGenerated(prev => new Set(prev).add(doc.id));
  };

  const downloadFile = async (content: string, fileName: string) => {
    if (exportFormat === "pdf") {
      await downloadAsPdf(content, fileName);
    } else {
      await downloadAsWord(content, fileName);
    }
  };

  const handleDownload = async (doc: DocEntry) => {
    const o = mergeOrganisme(organisme);
    if (doc.template === "pdf_static" && doc.params?.pdfFile) {
      const resp = await fetch(`/docs/${doc.params.pdfFile}`);
      const blob = await resp.blob();
      saveAs(blob, doc.params.pdfFile);
      return;
    }
    const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
    if (isPerStagiaire && selectedStagiaire === -1) {
      for (const [i, s] of allStagiaires.entries()) {
        const content = generateContent(doc, i);
        const fileName = buildFileName(`${doc.nom} - ${s.prenom} ${s.nom}`, o.nom, o.version, o.dateMaj);
        await downloadFile(content, fileName);
      }
    } else if (doc.template === "tableau_suivi_parcours_excel" || doc.template === "plan_dev_competences_excel" || doc.template === "tableau_amelioration_continue_excel" || doc.template === "suivi_dysfonctionnements_excel" || doc.template === "relances_appreciations_excel") {
      const sf = formation.intitule
        ? { ...SAMPLE_FORMATIONS[0], ...Object.fromEntries(Object.entries(formation).filter(([, v]) => v && String(v).trim())) }
        : SAMPLE_FORMATIONS[0];
      let excelContent: string;
      if (doc.template === "tableau_suivi_parcours_excel") {
        excelContent = generateExcelTableauSuiviParcours(o, sf, allStagiaires);
      } else {
        excelContent = generateContent(doc);
      }
      const fileName = buildFileName(doc.nom, o.nom, o.version, o.dateMaj, ".xls");
      saveAs(excelToBlob(excelContent), fileName);
    } else {
      const content = generateContent(doc, isPerStagiaire ? selectedStagiaire : undefined);
      const stagSuffix = isPerStagiaire && selectedStagiaire >= 0 ? ` - ${allStagiaires[selectedStagiaire]?.prenom} ${allStagiaires[selectedStagiaire]?.nom}` : "";
      const fileName = buildFileName(doc.nom + stagSuffix, o.nom, o.version, o.dateMaj);
      await downloadFile(content, fileName);
    }
  };

  const handleToggleEdit = () => {
    if (editing && iframeRef.current) {
      // Save edited content
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        const html = `<!DOCTYPE html><html lang="fr"><head>${doc.head.innerHTML}</head><body>${doc.body.innerHTML}</body></html>`;
        const editKey = `${currentDocId}_s${PER_STAGIAIRE_TEMPLATES.has(catalog.find(d => d.id === currentDocId)?.template || "") ? selectedStagiaire : "all"}`;
        setEditedContents(prev => new Map(prev).set(editKey, html));
        setPreviewContent(html);
      }
    } else if (!editing && iframeRef.current) {
      // Enable editing in iframe
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
      const idx = parseInt(val);
      setSelectedStagiaire(idx);
    }
    // Re-generate preview if one is open and it's a per-stagiaire doc
    if (currentDocId && previewContent) {
      const doc = catalog.find(d => d.id === currentDocId);
      if (doc && PER_STAGIAIRE_TEMPLATES.has(doc.template)) {
        if (val === "all") {
          // Show all stagiaires concatenated
          const allContent = allStagiaires.map((s, i) => {
            const content = generateContent(doc, i);
            return `<div style="page-break-after:always">${content}</div>`;
          }).join("<hr style='border:2px solid #1e3a7b;margin:30px 0'>");
          setPreviewContent(allContent);
          setPreviewTitle(doc.nom + ` – Tous les stagiaires (${allStagiaires.length})`);
        } else {
          const idx = parseInt(val);
          const content = generateContent(doc, idx);
          setPreviewContent(content);
          setPreviewTitle(doc.nom + ` – ${allStagiaires[idx]?.prenom} ${allStagiaires[idx]?.nom}`);
        }
        setEditing(false);
      }
    }
  };

  const handlePreviewBook = () => {
    const o = mergeOrganisme(organisme);
    const selectedFormation = formation.intitule
      ? { ...SAMPLE_FORMATIONS[0], ...Object.fromEntries(Object.entries(formation).filter(([, v]) => v && String(v).trim())) }
      : SAMPLE_FORMATIONS[0];
    const content = generateBookQualiopi(o, [selectedFormation], allStagiaires, catalog);
    setPreviewContent(content);
    setPreviewTitle("BOOK QUALIOPI – Dossier complet");
    setCurrentDocId("book_qualiopi");
    setEditing(false);
  };

  const handleDownloadBook = async () => {
    const o = mergeOrganisme(organisme);
    const selectedFormation = formation.intitule
      ? { ...SAMPLE_FORMATIONS[0], ...Object.fromEntries(Object.entries(formation).filter(([, v]) => v && String(v).trim())) }
      : SAMPLE_FORMATIONS[0];
    const content = generateBookQualiopi(o, [selectedFormation], allStagiaires, catalog);
    const fileName = buildFileName("BOOK QUALIOPI COMPLET", o.nom, o.version, o.dateMaj);
    await downloadFile(content, fileName);
  };

  const handleDownloadAll = async () => {
    setGenerating(true);
    try {
      const zip = new JSZip();
      const o = mergeOrganisme(organisme);
      const selectedFormation = formation.intitule
        ? { ...SAMPLE_FORMATIONS[0], ...Object.fromEntries(Object.entries(formation).filter(([, v]) => v && String(v).trim())) }
        : SAMPLE_FORMATIONS[0];
      const toBlob = async (content: string): Promise<Blob> => {
        if (exportFormat === "pdf") {
          return await htmlToPdfBlob(content);
        }
        return await htmlToWordBlob(content);
      };
      const ext = exportFormat === "pdf" ? ".pdf" : ".doc";

      const bookContent = generateBookQualiopi(o, [selectedFormation], allStagiaires, catalog);
      const bookName = buildFileName("BOOK QUALIOPI", o.nom, o.version, o.dateMaj, ext);
      zip.file(`QUALIOPI/${bookName}`, await toBlob(bookContent));

      for (const doc of catalog) {
        const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
        const hasStagiaireIdx = doc.params?.stagiaireIdx !== undefined;
        const basePath = shortCriterePath(doc.critere, doc.indicateur);

        if (hasStagiaireIdx) {
          const si = doc.params!.stagiaireIdx as number;
          const s = allStagiaires[si] || allStagiaires[0];
          const stagFolder = `${basePath}/${s.nom}_${s.prenom}`.substring(0, 80);
          const content = generateContent(doc);
          const fileName = buildFileName(doc.nom, o.nom, o.version, o.dateMaj, ext);
          zip.file(`${stagFolder}/${fileName}`, await toBlob(content));
        } else if (isPerStagiaire) {
          for (let si = 0; si < allStagiaires.length; si++) {
            const s = allStagiaires[si];
            const stagFolder = `${basePath}/${s.nom}_${s.prenom}`.substring(0, 80);
            const content = generateContent(doc, si);
            const fileName = buildFileName(doc.nom, o.nom, o.version, o.dateMaj, ext);
            zip.file(`${stagFolder}/${fileName}`, await toBlob(content));
          }
        } else if (doc.template === "pdf_static" && doc.params?.pdfFile) {
          const resp = await fetch(`/docs/${doc.params.pdfFile}`);
          const pdfBlob = await resp.blob();
          zip.file(`${basePath}/${doc.params.pdfFile}`, pdfBlob);
        } else if (doc.template === "indicateurs_performance") {
          const excelContent = generateExcelTableauBordPerformance(o, selectedFormation, allStagiaires);
          const excelFileName = buildFileName(doc.nom, o.nom, o.version, o.dateMaj, ".xls");
          zip.file(`${basePath}/${excelFileName}`, excelToBlob(excelContent));
        } else if (doc.template === "tableau_suivi_parcours_excel" || doc.template === "plan_dev_competences_excel" || doc.template === "tableau_amelioration_continue_excel" || doc.template === "suivi_dysfonctionnements_excel" || doc.template === "relances_appreciations_excel") {
          let excelContent: string;
          if (doc.template === "tableau_suivi_parcours_excel") {
            excelContent = generateExcelTableauSuiviParcours(o, selectedFormation, allStagiaires);
          } else {
            excelContent = generateContent(doc);
          }
          const excelFileName = buildFileName(doc.nom, o.nom, o.version, o.dateMaj, ".xls");
          zip.file(`${basePath}/${excelFileName}`, excelToBlob(excelContent));
        } else {
          const content = generateContent(doc);
          const fileName = buildFileName(doc.nom, o.nom, o.version, o.dateMaj, ext);
          zip.file(`${basePath}/${fileName}`, await toBlob(content));
        }
        setGenerated(prev => new Set(prev).add(doc.id));
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const zipName = buildFileName("DOSSIER QUALIOPI COMPLET", o.nom, o.version, o.dateMaj, ".zip");
      saveAs(blob, zipName);
    } catch (e) {
      console.error(e);
    }
    setGenerating(false);
  };

  const getDocsForIndicateur = (indicateur: number) => catalog.filter(d => d.indicateur === indicateur);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Dossier Qualiopi Complet</h2>
          <p className="text-sm text-muted-foreground">
            {catalog.length} documents • 7 critères • 32 indicateurs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleDownloadAll} disabled={generating} className="gap-2 bg-gradient-hero text-primary-foreground border-0">
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {generating ? "Génération..." : "Télécharger tout (ZIP)"}
          </Button>
        </div>
      </div>

      {/* Format Selector */}
      <div className="p-3 bg-accent/10 rounded-xl border border-accent/30 flex items-center gap-3 flex-wrap">
        <FileDown className="w-5 h-5 text-accent shrink-0" />
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
            📄 PDF (design parfait)
          </button>
          <button
            onClick={() => setExportFormat("doc")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              exportFormat === "doc"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            📝 DOC (modifiable)
          </button>
        </div>
        <span className="text-xs text-muted-foreground">
          {exportFormat === "pdf" ? "✅ Rendu parfait sur Google Drive, email et impression" : "✏️ Modifiable dans Word / Google Docs (design peut varier)"}
        </span>
      </div>

      {/* Stagiaire Selector */}
      <div className="p-3 bg-primary/5 rounded-xl border border-primary/20 flex items-center gap-3 flex-wrap">
        <User className="w-5 h-5 text-primary shrink-0" />
        <span className="text-sm font-semibold text-primary">Stagiaire sélectionné :</span>
        <Select value={selectedStagiaire === -1 ? "all" : String(selectedStagiaire)} onValueChange={handleStagiaireChange}>
          <SelectTrigger className="w-[280px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">📋 Tous les stagiaires</SelectItem>
            {allStagiaires.map((s, i) => (
              <SelectItem key={i} value={String(i)}>
                {s.prenom} {s.nom} – {s.entreprise || "Particulier"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">
          (Prévisualisation individuelle ou groupée – Le ZIP contient tous les stagiaires)
        </span>
      </div>

      {/* Style Customizer */}
      <DocStyleConfigPanel style={docStyle} onChange={handleStyleChange} />
      <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border-2 border-primary/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-primary">📕 BOOK QUALIOPI</h3>
            <p className="text-xs text-muted-foreground">
              Dossier complet : couverture, présentation, organigramme, sommaire, 32 indicateurs avec niveaux attendus et preuves
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePreviewBook} className="gap-1">
            <Eye className="w-3 h-3" /> Aperçu
          </Button>
          <Button size="sm" onClick={handleDownloadBook} className="gap-1 bg-gradient-hero text-primary-foreground border-0">
            <Download className="w-3 h-3" /> Télécharger
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="p-3 bg-secondary rounded-xl flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-accent" />
        <div className="flex-1">
          <div className="flex justify-between text-sm">
            <span>{generated.size} / {catalog.length} documents générés</span>
            <span>{Math.round((generated.size / catalog.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(generated.size / catalog.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Tree View */}
      <div className="space-y-2">
        {CRITERES_INFO.map(critere => {
          const isExpanded = expandedCriteres.has(critere.numero);
          const critereDocs = catalog.filter(d => d.critere === critere.numero);
          const critereGenerated = critereDocs.filter(d => generated.has(d.id)).length;

          return (
            <div key={critere.numero} className="bg-card border rounded-xl overflow-hidden shadow-card">
              <button
                onClick={() => toggleCritere(critere.numero)}
                className="w-full p-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4 text-primary shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                {isExpanded ? <FolderOpen className="w-5 h-5 text-primary shrink-0" /> : <Folder className="w-5 h-5 text-muted-foreground shrink-0" />}
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold">Critère {critere.numero} – {critere.titre}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({critereDocs.length} docs, {critereGenerated} générés)
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t px-3 pb-3 space-y-1">
                  {critere.indicateurs.map(ind => {
                    const isIndExpanded = expandedIndicateurs.has(ind.numero);
                    const indDocs = getDocsForIndicateur(ind.numero);
                    const indGenerated = indDocs.filter(d => generated.has(d.id)).length;

                    return (
                      <div key={ind.numero}>
                        <button
                          onClick={() => toggleIndicateur(ind.numero)}
                          className="w-full p-2 flex items-center gap-2 hover:bg-secondary/30 rounded-lg transition-colors text-left"
                        >
                          {isIndExpanded ? <ChevronDown className="w-3 h-3 text-primary shrink-0" /> : <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />}
                          <span className="text-xs font-semibold text-primary">I{ind.numero}</span>
                          <span className="text-xs truncate flex-1">{ind.titre}</span>
                          <span className="text-xs text-muted-foreground shrink-0">{indDocs.length} docs</span>
                          {indGenerated === indDocs.length && indDocs.length > 0 && <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />}
                        </button>

                        {isIndExpanded && (
                          <div className="ml-8 space-y-0.5 mt-1">
                            {indDocs.map(doc => {
                              const isPerStagiaire = PER_STAGIAIRE_TEMPLATES.has(doc.template);
                              return (
                                <div key={doc.id} className={`flex items-center gap-2 p-1.5 rounded-md text-xs hover:bg-secondary/30 transition-colors ${generated.has(doc.id) ? "bg-accent/5" : ""}`}>
                                  {generated.has(doc.id) ? (
                                    <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                                  ) : (
                                    <FileText className="w-3 h-3 text-muted-foreground shrink-0" />
                                  )}
                                  <span className="flex-1 truncate">{doc.nom}</span>
                                  {isPerStagiaire && <span title="1 fichier par stagiaire"><User className="w-3 h-3 text-primary shrink-0" /></span>}
                                  <button onClick={() => handlePreview(doc)} className="p-1 hover:bg-secondary rounded" title="Aperçu">
                                    <Eye className="w-3 h-3 text-muted-foreground" />
                                  </button>
                                  <button onClick={() => handleDownload(doc)} className="p-1 hover:bg-secondary rounded" title="Télécharger">
                                    <Download className="w-3 h-3 text-muted-foreground" />
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

      {/* Preview */}
      {previewContent && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
            <h3 className="text-lg font-bold truncate flex-1">{previewTitle}</h3>
            <div className="flex gap-2 shrink-0">
              <Button
                variant={editing ? "default" : "outline"}
                size="sm"
                onClick={handleToggleEdit}
                className="gap-1"
              >
                {editing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                {editing ? "Enregistrer" : "Modifier"}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setPreviewContent(null); setEditing(false); }}>
                <X className="w-4 h-4 mr-1" /> Fermer
              </Button>
            </div>
          </div>
          {editing && (
            <div className="mb-2 p-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <Edit3 className="w-4 h-4 shrink-0" />
              Mode édition activé : cliquez directement dans le document pour le modifier. Les changements seront sauvegardés.
            </div>
          )}
          <div className="bg-card border rounded-xl shadow-elevated overflow-hidden">
            <iframe
              ref={iframeRef}
              srcDoc={previewContent}
              className="w-full h-[600px] border-0"
              title="Aperçu"
              onLoad={() => {
                if (editing && iframeRef.current?.contentDocument) {
                  iframeRef.current.contentDocument.designMode = "on";
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentGenerator;
