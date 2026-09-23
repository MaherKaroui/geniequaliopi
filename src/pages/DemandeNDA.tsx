import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download, FileText, Loader2, CheckCircle2, Save, FolderOpen, Trash2, Clock, Upload, X, Pencil, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, CRITERES } from "@/types/qualiopi";
import OrganismeForm from "@/components/OrganismeForm";
import FormationForm from "@/components/FormationForm";
import StagiairesForm from "@/components/StagiairesForm";
import StepIndicator from "@/components/StepIndicator";
import CVGeneratorEmbed from "@/components/CVGeneratorEmbed";
import { genContratFormationParticulier, genDevis, genFacture } from "@/lib/templatesAF";
import { courseCertificateHtml } from "@/lib/newsletterScreenshots";
import { isFormationTerminee, setDocStyle } from "@/lib/docBuilder";
import { genReglement_V2, genEmargementJour_V2 } from "@/lib/generatorsV2";
import { genContratNDA, genReglementNDA } from "@/lib/ndaContratReglement";
import { genProgrammeNDA, genDevisNDA, genEmargementNDA, genListeFormateursNDA } from "@/lib/ndaDocuments";

import { generateDocumentById } from "@/lib/documentGenerator";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { CVData, CVDesign, emptyCV, generateCVHTML } from "@/lib/cvGenerator";
import { DocStyleConfig, DEFAULT_DOC_STYLE } from "@/types/qualiopi";
import DossierOutputSettings from "@/components/DossierOutputSettings";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const NDA_STEPS = [
  { id: 1, label: "Organisme" },
  { id: 2, label: "Formation" },
  { id: 3, label: "Stagiaires" },
  { id: 4, label: "Documents" },
];

const NDA_DOCUMENTS = [
  { id: "contrat", label: "Contrat de Formation", icon: "📄" },
  { id: "programme", label: "Programme de Formation", icon: "📋" },
  { id: "reglement", label: "Règlement Intérieur", icon: "📜" },
  { id: "devis_facture", label: "Devis / Facture", icon: "💰" },
  { id: "logo", label: "Logo de l'organisme", icon: "🖼️" },
  { id: "cv", label: "CV du Formateur", icon: "👤" },
  { id: "liste_formateurs", label: "Liste des Formateurs", icon: "👥" },
  { id: "certificat_coursera", label: "Certificat Coursera / UCI", icon: "🎓" },
  { id: "emargement", label: "Feuille d'émargement / Rapport de connexion", icon: "✍️" },
];

const emptyOrganisme: OrganismeInfo = {
  nom: "", siret: "", adresse: "", codePostal: "", ville: "", telephone: "", email: "",
  siteWeb: "", nda: "", dirigeant: "", responsablePedagogique: "", referentHandicap: "",
  referentQualite: "", poleAdministratif: "", relationEntreprises: "", referentMobilite: "",
  domainesFormation: "", typesActions: ['actions-formation'],
  certifications: "", outilsUtilises: "", version: "1", dateMaj: new Date().toISOString().slice(0, 10),
};

const emptyFormation: FormationInfo = {
  intitule: "", objectifs: "", prerequis: "", duree: "", modalites: "", tarif: "",
  programme: "", methodesEvaluation: "", moyensPedagogiques: "", publicVise: "",
  delaiAcces: "", dateDebut: "", dateFin: "", lieu: "", nombreParticipants: "", formateur: "",
  rythmeAlternance: "",
};

const stripNdaText = (value: string) => value
  .replace(/\bNDA\b/gi, "")
  .replace(/\s*[–-]\s*(?=$)/g, "")
  .replace(/^(\s*[–-]\s*)+/g, "")
  .replace(/\s{2,}/g, " ")
  .trim();

const sanitizeOrganismeForDocuments = (o: OrganismeInfo): OrganismeInfo => ({
  ...o,
  nda: "",
});

function generateListeFormateursHTML(o: OrganismeInfo, cv: CVData, stagiaires: StagiaireInfo[] = []): string {
  const fullName = `${cv.prenom} ${cv.nom}`.trim() || "Nom du formateur";
  const exps = cv.experiences.filter(e => e.poste || e.entreprise);
  const forms = cv.formations.filter(f => f.diplome || f.etablissement);
  const comps = cv.competences.filter(c => c.nom);
  const certs = cv.certifications.filter(c => c.nom);
  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  // IMPORTANT: do NOT wrap in a single root <div> — the PDF paginator splits at top-level nodes.
  // A single oversized root would push everything to page 2 and leave page 1 blank.
  return `<div style="text-align:center;margin:0 0 10px 0;font-family:Arial,sans-serif;font-size:12px;">
      ${o.logoUrl ? `<img src="${o.logoUrl}" style="max-height:60px;margin-bottom:8px;" />` : ""}
      <p style="font-size:11px;color:#555;margin:2px 0;"><strong>${o.nom || ""}</strong></p>
      <p style="font-size:10px;color:#666;margin:2px 0;">${o.adresse || ""} ${o.codePostal || ""} ${o.ville || ""}</p>
      ${o.siret ? `<p style="font-size:10px;color:#666;margin:2px 0;">SIRET : ${o.siret}</p>` : ""}
      ${o.email ? `<p style="font-size:10px;color:#666;margin:2px 0;">Mail : ${o.email}</p>` : ""}
      ${o.dirigeant ? `<p style="font-size:10px;color:#666;margin:2px 0;">Dirigeant : ${o.dirigeant}</p>` : ""}
    </div>

    <h1 style="text-align:center;font-family:Arial,sans-serif;font-size:18px;margin:25px 0 15px 0;text-transform:uppercase;letter-spacing:1px;">Liste des Formateurs</h1>

    <p style="font-family:Arial,sans-serif;font-size:11px;color:#444;margin:0 0 5px 0;">• INTERVENANT DANS L'ORGANISME DE FORMATION À LA DATE DE LA DÉCLARATION D'ACTIVITÉ</p>
    <p style="font-family:Arial,sans-serif;font-size:11px;color:#444;margin:0 0 20px 0;">• Dénomination et adresse de l'organisme de formation : <strong>${o.nom || ""}</strong></p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-family:Arial,sans-serif;font-size:12px;line-height:1.5;">
      <tr style="background:#1e3a7b;color:#fff;">
        <th style="padding:8px 10px;text-align:left;width:200px;border:1px solid #1e3a7b;">Nom et prénom de l'intervenant</th>
        <th style="padding:8px 10px;text-align:left;border:1px solid #1e3a7b;">${fullName}</th>
      </tr>
      <tr>
        <td style="padding:8px 10px;border:1px solid #ddd;vertical-align:top;font-weight:bold;">Expérience professionnelle</td>
        <td style="padding:8px 10px;border:1px solid #ddd;">
          ${exps.map(e =>
            `<p style="margin:2px 0;"><strong>${e.poste || ""}</strong></p>${e.entreprise ? `<p style="margin:0 0 2px 0;font-size:11px;">${e.entreprise}</p>` : ""}${e.description ? `<p style="margin:0 0 6px 0;font-size:11px;color:#444;">${e.description}</p>` : ""}`
          ).join("") || "<p style='color:#999;'>—</p>"}
          ${cv.experiencePedagogique ? `<p style="font-weight:bold;margin:10px 0 4px 0;">Expérience pédagogique</p><p style="font-size:11px;">${cv.experiencePedagogique}</p>` : ""}
        </td>
      </tr>
      <tr>
        <td style="padding:8px 10px;border:1px solid #ddd;vertical-align:top;font-weight:bold;">Parcours académique</td>
        <td style="padding:8px 10px;border:1px solid #ddd;">
          ${forms.map(f =>
            `<p style="margin:2px 0;"><strong>${f.diplome || ""}</strong></p>${f.etablissement ? `<p style="margin:0 0 6px 0;font-size:11px;">${f.etablissement}${f.annee ? ` (${f.annee})` : ""}</p>` : ""}`
          ).join("") || "<p style='color:#999;'>—</p>"}
          ${certs.length ? `<p style="font-weight:bold;margin:10px 0 4px 0;">Certifications</p>${certs.map(c => `<p style="margin:2px 0;font-size:11px;">${c.nom}${c.annee ? ` (${c.annee})` : ""}</p>`).join("")}` : ""}
        </td>
      </tr>
      <tr>
        <td style="padding:8px 10px;border:1px solid #ddd;vertical-align:top;font-weight:bold;">Compétences</td>
        <td style="padding:8px 10px;border:1px solid #ddd;">
          ${comps.map(c => `<p style="margin:2px 0;font-size:11px;">${c.nom}</p>`).join("") || "<p style='color:#999;'>—</p>"}
        </td>
      </tr>
    </table>

    <div style="margin-top:30px;font-family:Arial,sans-serif;">
      <p style="font-size:12px;margin-bottom:15px;">Fait à ${o.ville || "___________"} le ${dateStr}</p>
      <p style="font-size:12px;font-weight:bold;margin-bottom:4px;">Pour l'organisme</p>
      <p style="font-size:11px;margin:2px 0;">Nom : <strong>${o.nom || ""}</strong></p>
      <p style="font-size:11px;margin:2px 0;">Date : ${dateStr}</p>
      <p style="font-size:11px;margin:2px 0;">Signature :</p>
      ${o.tamponUrl ? `<img src="${o.tamponUrl}" style="max-height:80px;margin-top:5px;" />` : ""}
    </div>

    <div class="footer" style="margin-top:40px;border-top:1px solid #ccc;padding-top:8px;font-family:Arial,sans-serif;font-size:9px;color:#888;text-align:center;">
      <strong>${o.nom || ""}</strong>${o.siret ? ` – SIRET : ${o.siret}` : ""}
    </div>`;
}

function generateProgrammeNDA(o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo[]): string {
  // Use the rich Qualiopi program but force NDA empty so footer/header omit it.
  const cleanOrg = sanitizeOrganismeForDocuments(o);
  const html = generateDocumentById("programme_formation", "programme_formation", undefined, cleanOrg, f, s);
  // Defensive cleanup: remove any residual NDA mentions (mergeOrganisme may inject sample defaults).
  return html
    // Remove full <p>…Nda: …</p> footer line (case-insensitive)
    .replace(/<p[^>]*>\s*Nda\s*:[^<]*<\/p>/gi, "")
    // Remove full <p><strong>NDA :</strong> …</p> body line
    .replace(/<p[^>]*>\s*<strong>\s*NDA\s*:?\s*<\/strong>[^<]*<\/p>/gi, "")
    // Inline " – NDA : xxx"
    .replace(/[–-]\s*NDA\s*:\s*[^–<\n]+/gi, "")
    // Bare NDA mention
    .replace(/\bNDA\s*:\s*[^\s<–]+/gi, "")
    // Standalone NDA number pattern e.g. "11 75 123456 75" or "75 123456 75"
    .replace(/\b\d{2}\s+\d{2}\s+\d{6}\s+\d{2}\b/g, "")
    .replace(/\b\d{2}\s+\d{6}\s+\d{2}\b/g, "")
    // Residual mention
    .replace(/cet enregistrement ne vaut pas agrément de l'état/gi, "");
}

interface UploadedCV {
  dataUrl: string;
  name: string;
  type: string; // mime type
}

function generateDocumentHTML(docId: string, o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo[], cvData: CVData, cvDesign: CVDesign, uploadedCV?: UploadedCV | null): string | null {
  const cleanOrganisme = sanitizeOrganismeForDocuments(o);

  switch (docId) {
    case "contrat":
      return genContratNDA(cleanOrganisme, f, s);
    case "programme":
      return genProgrammeNDA(cleanOrganisme, f, s);
    case "reglement":
      return genReglementNDA(cleanOrganisme, f, s);

    case "devis_facture":
      return genDevisNDA(cleanOrganisme, f, s);
    case "logo":
      if (cleanOrganisme.logoUrl) return `<div style="text-align:center;padding:60px;"><img src="${cleanOrganisme.logoUrl}" style="max-width:400px;" /><p style="margin-top:20px;color:#666;">Logo de l'organisme</p></div>`;
      return null;
    case "cv": {
      // Priority 1: uploaded CV file (image rendered, PDF embedded)
      if (uploadedCV) {
        if (uploadedCV.type.startsWith("image/")) {
          return `<div style="text-align:center;padding:20px;"><img src="${uploadedCV.dataUrl}" style="max-width:100%;height:auto;" /></div>`;
        }
        if (uploadedCV.type === "application/pdf") {
          return `<div style="width:100%;height:100vh;"><embed src="${uploadedCV.dataUrl}" type="application/pdf" style="width:100%;height:100%;min-height:800px;" /></div>`;
        }
      }
      // Priority 2: generated CV
      const hasContent = cvData.prenom || cvData.nom || cvData.profil || cvData.experiences.some(e => e.poste);
      if (hasContent) return generateCVHTML(cvData, cvDesign);
      return null;
    }
    case "liste_formateurs": {
      // Toujours générer : auto-rempli à partir de l'organisme + CV (si saisi)
      const hasCV = cvData.prenom || cvData.nom || cvData.experiences.some(e => e.poste);
      return genListeFormateursNDA(cleanOrganisme, hasCV ? cvData : null, s);
    }
    case "emargement":
      return genEmargementJour_V2(cleanOrganisme, f, s, 0, "");
    case "certificat_coursera": {
      // Format A4 paysage 297x210mm (~1123x794px @96dpi).
      // Certificat source: 1100x850px (ratio 1.294). Scale ≈ 0.847 → 932x720 final.
      const inner = courseCertificateHtml(cleanOrganisme, f);
      return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="pdf-page-size" content="297x210"><style>
@page { size: 297mm 210mm; margin: 0; }
html,body { margin:0; padding:0; background:#fff; }
.cert-page { width:297mm; height:210mm; box-sizing:border-box; background:#fff; position:relative; overflow:hidden; }
.cert-wrap { position:absolute; top:50%; left:50%; width:932px; height:720px; margin-left:-466px; margin-top:-360px; }
.cert-scale { width:1100px; height:850px; transform: scale(0.847); transform-origin: top left; }
</style></head><body><div class="cert-page"><div class="cert-wrap"><div class="cert-scale">${inner}</div></div></div></body></html>`;
    }
    default: return null;
  }
}

interface SavedNDADossier {
  id: string;
  name: string;
  organisme: OrganismeInfo;
  formation: FormationInfo;
  stagiaires: StagiaireInfo[];
  cv_formateur: string;
  cv_data?: CVData;
  cv_design?: CVDesign;
  created_at: string;
  updated_at: string;
}

const DemandeNDA = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [organisme, setOrganisme] = useState<OrganismeInfo>(emptyOrganisme);
  const [formation, setFormation] = useState<FormationInfo>(emptyFormation);
  const [stagiaires, setStagiaires] = useState<StagiaireInfo[]>([]);
  const [cvData, setCvData] = useState<CVData>(emptyCV);
  const [cvDesign, setCvDesign] = useState<CVDesign>("classique");
  const [uploadedCV, setUploadedCV] = useState<UploadedCV | null>(null);
  const [extractingCV, setExtractingCV] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [previewHTML, setPreviewHTML] = useState("");
  const [editing, setEditing] = useState(false);
  const [editedDocs, setEditedDocs] = useState<Record<string, string>>({});
  const previewIframeRef = useRef<HTMLIFrameElement | null>(null);
  const [generating, setGenerating] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "doc">("pdf");
  const [docStyle, setDocStyleState] = useState<DocStyleConfig>({ ...DEFAULT_DOC_STYLE });

  const handleStyleChange = (newStyle: DocStyleConfig) => {
    setDocStyleState(newStyle);
    setDocStyle(newStyle);
  };

  // Save/load state
  const [dossiers, setDossiers] = useState<SavedNDADossier[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  // Fetch saved dossiers
  const fetchDossiers = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("saved_nda_dossiers")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });
    if (!error && data) {
      setDossiers(data as unknown as SavedNDADossier[]);
    }
  };

  useEffect(() => {
    if (user) fetchDossiers();
  }, [user]);

  const handleSave = async () => {
    if (!user) { toast.error("Connectez-vous pour sauvegarder"); return; }
    if (!organisme.nom) { toast.error("Remplissez au moins le nom de l'organisme"); return; }
    setSaving(true);
    const manualName = stripNdaText(saveName.trim());
    const fallbackName = stripNdaText(`${organisme.nom} – ${formation.intitule || "Dossier"}`);
    const name = manualName || fallbackName;
    const { error } = await supabase.from("saved_nda_dossiers").insert({
      user_id: user.id,
      name,
      organisme: organisme as any,
      formation: formation as any,
      stagiaires: stagiaires as any,
      cv_formateur: JSON.stringify(cvData),
    });
    if (error) toast.error(error.message);
    else { toast.success("Dossier sauvegardé !"); fetchDossiers(); setSaveName(""); }
    setSaving(false);
  };

  const handleLoad = (d: SavedNDADossier) => {
    setOrganisme(d.organisme);
    setFormation(d.formation);
    setStagiaires(d.stagiaires);
    // Try to parse CV data from saved string
    try {
      const parsed = JSON.parse(d.cv_formateur || "{}");
      if (parsed.prenom !== undefined) setCvData(parsed);
    } catch { /* legacy text format, ignore */ }
    setCurrentStep(1);
    setShowHistory(false);
    toast.success(`Dossier "${stripNdaText(d.name)}" chargé`);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("saved_nda_dossiers").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Dossier supprimé"); fetchDossiers(); }
  };

  const getDocHTML = (docId: string): string | null => {
    if (editedDocs[docId]) return editedDocs[docId];
    return generateDocumentHTML(docId, organisme, formation, stagiaires, cvData, cvDesign, uploadedCV);
  };

  const handlePreview = (docId: string) => {
    const html = getDocHTML(docId);
    if (!html) {
      toast.error(docId === "logo" ? "Veuillez d'abord importer un logo" : "Veuillez remplir le CV du formateur ou en uploader un");
      return;
    }
    setPreviewDoc(docId);
    setPreviewHTML(html);
    setEditing(false);
  };

  const handleEdit = (docId: string) => {
    const html = getDocHTML(docId);
    if (!html) {
      toast.error("Document non disponible.");
      return;
    }
    setPreviewDoc(docId);
    setPreviewHTML(html);
    setEditing(true);
  };

  const handleSaveEdit = () => {
    if (!previewDoc) return;
    const doc = previewIframeRef.current?.contentDocument;
    if (!doc) { toast.error("Impossible de récupérer le contenu."); return; }
    const html = "<!DOCTYPE html><html>" + doc.documentElement.innerHTML + "</html>";
    setEditedDocs(prev => ({ ...prev, [previewDoc]: html }));
    setPreviewHTML(html);
    setEditing(false);
    toast.success("Modifications enregistrées");
  };

  const handleResetEdit = (docId: string) => {
    setEditedDocs(prev => {
      const next = { ...prev };
      delete next[docId];
      return next;
    });
    const html = generateDocumentHTML(docId, organisme, formation, stagiaires, cvData, cvDesign, uploadedCV);
    if (html) setPreviewHTML(html);
    setEditing(false);
    toast.success("Document réinitialisé");
  };

  const handleDownload = async (docId: string) => {
    // For "cv" with an uploaded file, download the original file as-is
    if (docId === "cv" && uploadedCV) {
      const a = document.createElement("a");
      a.href = uploadedCV.dataUrl;
      a.download = uploadedCV.name || "CV_Formateur";
      a.click();
      toast.success("CV téléchargé !");
      return;
    }
    const html = getDocHTML(docId);
    if (!html) { toast.error("Document non disponible."); return; }
    if (docId === "logo" && organisme.logoUrl) {
      const a = document.createElement("a");
      a.href = organisme.logoUrl;
      a.download = "logo_organisme.png";
      a.click();
      return;
    }
    const label = NDA_DOCUMENTS.find(d => d.id === docId)?.label || docId;
    const filename = `${label} - ${organisme.nom || "Organisme"}`;

    const wrappedHtml = html;

    if (exportFormat === "pdf") {
      const blob = await htmlToPdfBlob(wrappedHtml);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${filename}.pdf`; a.click();
      URL.revokeObjectURL(url);
    } else {
      const { downloadAsWord } = await import("@/lib/wordExport");
      await downloadAsWord(wrappedHtml, filename);
    }
    toast.success(`${label} téléchargé !`);
  };

  const handleDownloadAll = async () => {
    setGenerating(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      for (const doc of NDA_DOCUMENTS) {
        if (doc.id === "logo" && organisme.logoUrl) {
          try {
            const resp = await fetch(organisme.logoUrl);
            const blob = await resp.blob();
            zip.file("Logo_Organisme.png", blob);
          } catch { /* skip */ }
          continue;
        }
        // Uploaded CV → include original file as-is in the ZIP
        if (doc.id === "cv" && uploadedCV) {
          try {
            const resp = await fetch(uploadedCV.dataUrl);
            const blob = await resp.blob();
            zip.file(uploadedCV.name || `CV_Formateur`, blob);
          } catch { /* skip */ }
          continue;
        }
        const html = getDocHTML(doc.id);
        if (html) {
          const wrappedHtml = html;
          if (exportFormat === "pdf") {
            const blob = await htmlToPdfBlob(wrappedHtml);
            zip.file(`${doc.label}.pdf`, blob);
          } else {
            const { htmlToWordBlob } = await import("@/lib/wordExport");
            const blob = await htmlToWordBlob(wrappedHtml);
            const ext = blob.type.includes("docx") ? "docx" : "doc";
            zip.file(`${doc.label}.${ext}`, blob);
          }
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Dossier_${organisme.nom || "Organisme"}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Dossier téléchargé !");
    } catch (err) {
      toast.error("Erreur lors de la génération du ZIP");
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1">
              <ChevronLeft className="w-4 h-4" /> Accueil
            </Button>
            <span className="font-bold text-lg">Dossier administratif</span>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <>
                <Button variant="outline" size="sm" onClick={() => setShowHistory(!showHistory)} className="gap-1">
                  <FolderOpen className="w-4 h-4" /> Mes dossiers
                </Button>
                <div className="flex items-center gap-1">
                  <Input
                    value={saveName}
                    onChange={e => setSaveName(e.target.value)}
                    placeholder="Nom du dossier"
                    className="w-36 h-8 text-xs"
                  />
                  <Button variant="outline" size="sm" onClick={handleSave} disabled={saving} className="gap-1">
                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    Sauver
                  </Button>
                </div>
              </>
            )}
            {currentStep === 4 && (
              <>
                <div className="flex border rounded-md overflow-hidden">
                  <button
                    onClick={() => setExportFormat("pdf")}
                    className={`px-3 py-1 text-xs font-medium transition-colors ${exportFormat === "pdf" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent"}`}
                  >PDF</button>
                  <button
                    onClick={() => setExportFormat("doc")}
                    className={`px-3 py-1 text-xs font-medium transition-colors ${exportFormat === "doc" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent"}`}
                  >DOC</button>
                </div>
                <Button onClick={handleDownloadAll} disabled={generating} className="gap-2 bg-gradient-hero border-0 text-primary-foreground">
                  {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  {generating ? "Génération..." : "Télécharger tout (ZIP)"}
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Saved dossiers panel */}
        {showHistory && user && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2"><Clock className="w-4 h-4" /> Dossiers sauvegardés</CardTitle>
            </CardHeader>
            <CardContent>
              {dossiers.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun dossier sauvegardé.</p>
              ) : (
                <div className="space-y-2">
                  {dossiers.map(d => (
                    <div key={d.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{stripNdaText(d.name)}</p>
                        <p className="text-xs text-muted-foreground">{new Date(d.updated_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleLoad(d)} className="gap-1">
                          <FolderOpen className="w-3.5 h-3.5" /> Charger
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(d.id)} className="text-destructive">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <StepIndicator steps={NDA_STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />

        <div className="bg-card rounded-2xl border shadow-card p-6 md:p-8">
          {currentStep === 1 && <OrganismeForm data={organisme} onChange={setOrganisme} hideFields={['nda', 'domainesFormation', 'certifications', 'outilsUtilises', 'version', 'typesActions']} />}
          {currentStep === 2 && <FormationForm data={formation} onChange={setFormation} onImportStagiaires={setStagiaires} />}
          {currentStep === 3 && <StagiairesForm data={stagiaires} onChange={setStagiaires} />}
          {currentStep === 4 && (
            <div className="space-y-8">
              {/* Style Panel */}
              <DossierOutputSettings
                organisme={organisme}
                scope="nda"
                manualStyle={docStyle}
                onManualStyleChange={handleStyleChange}
                onEffectiveStyleChange={(style) => { setDocStyleState(style); setDocStyle(style); }}
              />

              {/* CV Upload (optional) */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">CV existant (optionnel)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">
                    Si vous avez déjà un CV (PDF ou image), uploadez-le ici. Il sera utilisé en priorité dans le dossier. Sinon, le CV généré ci-dessous sera utilisé.
                  </p>
                  {uploadedCV ? (
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-accent/30">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{uploadedCV.name}</span>
                        <span className="text-xs text-muted-foreground">({uploadedCV.type})</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setUploadedCV(null)} className="text-destructive gap-1">
                        <X className="w-3.5 h-3.5" /> Retirer
                      </Button>
                    </div>
                  ) : (
                    <Label htmlFor="cv-upload" className="flex items-center gap-2 cursor-pointer p-3 border border-dashed rounded-lg hover:bg-accent/30 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Cliquez pour uploader un CV (PDF, JPG, PNG)</span>
                      <Input
                        id="cv-upload"
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > 10 * 1024 * 1024) {
                            toast.error("Fichier trop volumineux (max 10 MB)");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = async () => {
                            const dataUrl = reader.result as string;
                            setUploadedCV({
                              dataUrl,
                              name: file.name,
                              type: file.type,
                            });
                            toast.success("CV importé ! Extraction des données…");

                            // Auto-extract structured data via AI so the
                            // "Liste des Formateurs" gets real content.
                            setExtractingCV(true);
                            try {
                              const { data: extracted, error } = await supabase.functions.invoke("generate-cv", {
                                body: { fileDataUrl: dataUrl, fileType: file.type },
                              });
                              if (error) throw error;
                              if (extracted && !extracted.error) {
                                setCvData({
                                  ...emptyCV,
                                  ...extracted,
                                  experiences: extracted.experiences || [],
                                  formations: extracted.formations || [],
                                  competences: extracted.competences || [],
                                  langues: extracted.langues || [],
                                  certifications: extracted.certifications || [],
                                  photoUrl: cvData.photoUrl || "",
                                });
                                toast.success("Données du CV extraites avec succès");
                              } else {
                                toast.error(extracted?.error || "Extraction impossible");
                              }
                            } catch (err: any) {
                              console.error("CV extraction error:", err);
                              toast.error("Extraction automatique échouée");
                            } finally {
                              setExtractingCV(false);
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </Label>
                  )}
                  {extractingCV && (
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" /> Extraction des données du CV en cours…
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* CV Generator */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Ou générer un CV</h2>
                <CVGeneratorEmbed cvData={cvData} onCVChange={setCvData} selectedDesign={cvDesign} onDesignChange={setCvDesign} />
              </div>

              {/* Documents */}
              <Card>
                <CardHeader><CardTitle className="text-lg">Documents du dossier</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {NDA_DOCUMENTS.map(doc => {
                    const cvHasContent = cvData.prenom || cvData.nom || cvData.profil || cvData.experiences.some(e => e.poste);
                    const ready = doc.id === "contrat" || doc.id === "programme" || doc.id === "reglement" || doc.id === "devis_facture" || (doc.id === "logo" && !!organisme.logoUrl) || (doc.id === "cv" && (!!uploadedCV || !!cvHasContent)) || (doc.id === "liste_formateurs" && (!!cvHasContent || !!uploadedCV));
                    return (
                      <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{doc.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{doc.id === "devis_facture" ? (isFormationTerminee(formation, stagiaires) ? "Facture" : "Devis") : doc.label}</p>
                            <p className="text-xs text-muted-foreground">{ready ? "Prêt" : "À compléter"}</p>
                          </div>
                          {ready && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button variant="outline" size="sm" onClick={() => handlePreview(doc.id)} className="gap-1">
                            <FileText className="w-3.5 h-3.5" /> Aperçu
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(doc.id)} className="gap-1">
                            <Pencil className="w-3.5 h-3.5" /> Modifier
                          </Button>
                          {editedDocs[doc.id] && (
                            <Button variant="outline" size="sm" onClick={() => handleResetEdit(doc.id)} className="gap-1" title="Réinitialiser le document">
                              <RotateCcw className="w-3.5 h-3.5" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => handleDownload(doc.id)} className="gap-1">
                            <Download className="w-3.5 h-3.5" /> {exportFormat.toUpperCase()}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {previewDoc && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle className="text-lg">
                        {editing ? "Modification" : "Aperçu"} : {NDA_DOCUMENTS.find(d => d.id === previewDoc)?.label}
                        {editedDocs[previewDoc] && !editing && <span className="ml-2 text-xs text-emerald-600">(modifié)</span>}
                      </CardTitle>
                      <div className="flex gap-2">
                        {editing ? (
                          <>
                            <Button variant="default" size="sm" onClick={handleSaveEdit} className="gap-1">
                              <Save className="w-3.5 h-3.5" /> Enregistrer
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => { setEditing(false); const html = getDocHTML(previewDoc); if (html) setPreviewHTML(html); }}>Annuler</Button>
                          </>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="gap-1">
                            <Pencil className="w-3.5 h-3.5" /> Modifier
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => { setPreviewDoc(null); setEditing(false); }}>Fermer</Button>
                      </div>
                    </div>
                    {editing && (
                      <p className="text-xs text-muted-foreground mt-2">Cliquez dans le document pour modifier le texte directement, puis cliquez sur « Enregistrer ».</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg overflow-hidden bg-white" style={{ maxHeight: "600px", overflowY: "auto" }}>
                      <iframe
                        ref={previewIframeRef}
                        key={`${previewDoc}-${editing ? "edit" : "view"}-${editedDocs[previewDoc] ? "m" : "o"}`}
                        srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:0;} ${editing ? "body{outline:2px dashed hsl(var(--primary));outline-offset:-2px;} [contenteditable]:focus{outline:2px solid hsl(var(--primary));}" : ""}</style></head><body>${previewHTML}</body></html>`}
                        onLoad={(e) => {
                          if (!editing) return;
                          const doc = (e.target as HTMLIFrameElement).contentDocument;
                          if (doc) {
                            try { doc.designMode = "on"; } catch { /* noop */ }
                          }
                        }}
                        style={{ width: "100%", minHeight: "500px", border: "none" }}
                        title="Aperçu document"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setCurrentStep(s => Math.max(1, s - 1))} disabled={currentStep === 1} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Précédent
          </Button>
          <Button onClick={() => setCurrentStep(s => Math.min(4, s + 1))} disabled={currentStep === 4} className="gap-2">
            Suivant <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default DemandeNDA;
