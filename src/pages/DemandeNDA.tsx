import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download, FileText, Loader2, CheckCircle2, Save, FolderOpen, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";
import { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, CRITERES } from "@/types/qualiopi";
import OrganismeForm from "@/components/OrganismeForm";
import FormationForm from "@/components/FormationForm";
import StagiairesForm from "@/components/StagiairesForm";
import StepIndicator from "@/components/StepIndicator";
import CVGeneratorEmbed from "@/components/CVGeneratorEmbed";
import { genContratFormationParticulier, genDevis } from "@/lib/templatesAF";
import { genReglement_V2 } from "@/lib/generatorsV2";
import { generateDocumentById } from "@/lib/documentGenerator";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { CVData, CVDesign, emptyCV, generateCVHTML } from "@/lib/cvGenerator";
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
  { id: "devis", label: "Devis", icon: "💰" },
  { id: "logo", label: "Logo de l'organisme", icon: "🖼️" },
  { id: "cv", label: "CV du Formateur", icon: "👤" },
];

const emptyOrganisme: OrganismeInfo = {
  nom: "", siret: "", adresse: "", codePostal: "", ville: "", telephone: "", email: "",
  siteWeb: "", nda: "", dirigeant: "", responsablePedagogique: "", referentHandicap: "",
  referentQualite: "", poleAdministratif: "", domainesFormation: "", typesActions: ['actions-formation'],
  certifications: "", outilsUtilises: "", version: "1", dateMaj: new Date().toISOString().slice(0, 10),
};

const emptyFormation: FormationInfo = {
  intitule: "", objectifs: "", prerequis: "", duree: "", modalites: "", tarif: "",
  programme: "", methodesEvaluation: "", moyensPedagogiques: "", publicVise: "",
  delaiAcces: "", dateDebut: "", dateFin: "", lieu: "", nombreParticipants: "", formateur: "",
  rythmeAlternance: "",
};

function generateDocumentHTML(docId: string, o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo[], cvData: CVData, cvDesign: CVDesign): string | null {
  switch (docId) {
    case "contrat":
      return genContratFormationParticulier(o, f, s);
    case "programme":
      return generateDocumentById("programme_formation", "programme_formation", undefined, o, f, s) || null;
    case "reglement":
      return genReglement_V2(o, f, s);
    case "devis":
      return genDevis(o, f, s);
    case "logo":
      if (o.logoUrl) return `<div style="text-align:center;padding:60px;"><img src="${o.logoUrl}" style="max-width:400px;" /><p style="margin-top:20px;color:#666;">Logo de l'organisme</p></div>`;
      return null;
    case "cv": {
      const hasContent = cvData.prenom || cvData.nom || cvData.profil || cvData.experiences.some(e => e.poste);
      if (hasContent) return generateCVHTML(cvData, cvDesign);
      return null;
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
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [previewHTML, setPreviewHTML] = useState("");
  const [generating, setGenerating] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "doc">("pdf");

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
    const name = saveName.trim() || `${organisme.nom} – ${formation.intitule || "NDA"}`;
    const { error } = await supabase.from("saved_nda_dossiers").insert({
      user_id: user.id,
      name,
      organisme: organisme as any,
      formation: formation as any,
      stagiaires: stagiaires as any,
      cv_formateur: JSON.stringify(cvData),
    });
    if (error) toast.error(error.message);
    else { toast.success("Dossier NDA sauvegardé !"); fetchDossiers(); setSaveName(""); }
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
    toast.success(`Dossier "${d.name}" chargé`);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("saved_nda_dossiers").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Dossier supprimé"); fetchDossiers(); }
  };

  const handlePreview = (docId: string) => {
    const html = generateDocumentHTML(docId, organisme, formation, stagiaires, cvData, cvDesign);
    if (!html) {
      toast.error(docId === "logo" ? "Veuillez d'abord importer un logo" : "Veuillez remplir le CV du formateur");
      return;
    }
    setPreviewDoc(docId);
    setPreviewHTML(html);
  };

  const handleDownload = async (docId: string) => {
    const html = generateDocumentHTML(docId, organisme, formation, stagiaires, cvData, cvDesign);
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

    if (exportFormat === "pdf") {
      const blob = await htmlToPdfBlob(html);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${filename}.pdf`; a.click();
      URL.revokeObjectURL(url);
    } else {
      const { downloadAsWord } = await import("@/lib/wordExport");
      await downloadAsWord(html, filename);
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
        const html = generateDocumentHTML(doc.id, organisme, formation, stagiaires, cvData, cvDesign);
        if (html) {
          if (exportFormat === "pdf") {
            const blob = await htmlToPdfBlob(html);
            zip.file(`${doc.label}.pdf`, blob);
          } else {
            const { htmlToWordBlob } = await import("@/lib/wordExport");
            const blob = await htmlToWordBlob(html);
            const ext = blob.type.includes("docx") ? "docx" : "doc";
            zip.file(`${doc.label}.${ext}`, blob);
          }
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Demande_NDA_${organisme.nom || "Organisme"}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Dossier NDA téléchargé !");
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
            <span className="font-bold text-lg">Demande NDA</span>
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
              <CardTitle className="text-base flex items-center gap-2"><Clock className="w-4 h-4" /> Dossiers NDA sauvegardés</CardTitle>
            </CardHeader>
            <CardContent>
              {dossiers.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun dossier sauvegardé.</p>
              ) : (
                <div className="space-y-2">
                  {dossiers.map(d => (
                    <div key={d.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{d.name}</p>
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
          {currentStep === 1 && <OrganismeForm data={organisme} onChange={setOrganisme} hideFields={['domainesFormation', 'certifications', 'outilsUtilises', 'version', 'typesActions']} />}
          {currentStep === 2 && <FormationForm data={formation} onChange={setFormation} onImportStagiaires={setStagiaires} />}
          {currentStep === 3 && <StagiairesForm data={stagiaires} onChange={setStagiaires} />}
          {currentStep === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: CV */}
              <div className="space-y-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg">CV du Formateur</CardTitle></CardHeader>
                  <CardContent>
                    <Label>CV du formateur (texte)</Label>
                    <Textarea
                      value={cvFormateur}
                      onChange={e => setCvFormateur(e.target.value)}
                      rows={8}
                      placeholder="Expérience, diplômes, compétences du formateur..."
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right: Documents */}
              <div className="space-y-6">
                <Card>
                  <CardHeader><CardTitle className="text-lg">Documents du dossier NDA</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {NDA_DOCUMENTS.map(doc => {
                      const ready = doc.id === "contrat" || doc.id === "programme" || doc.id === "reglement" || doc.id === "devis" || (doc.id === "logo" && !!organisme.logoUrl) || (doc.id === "cv" && !!cvFormateur);
                      return (
                        <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{doc.icon}</span>
                            <div>
                              <p className="font-medium text-sm">{doc.label}</p>
                              <p className="text-xs text-muted-foreground">{ready ? "Prêt" : "À compléter"}</p>
                            </div>
                            {ready && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handlePreview(doc.id)} className="gap-1">
                              <FileText className="w-3.5 h-3.5" /> Aperçu
                            </Button>
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
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Aperçu : {NDA_DOCUMENTS.find(d => d.id === previewDoc)?.label}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setPreviewDoc(null)}>Fermer</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-lg overflow-hidden bg-white" style={{ maxHeight: "600px", overflowY: "auto" }}>
                        <iframe
                          srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:0;}</style></head><body>${previewHTML}</body></html>`}
                          style={{ width: "100%", minHeight: "500px", border: "none" }}
                          title="Aperçu document"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
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
