import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData, CRITERES } from "@/types/qualiopi";
import OrganismeForm from "@/components/OrganismeForm";
import FormationForm from "@/components/FormationForm";
import StagiairesForm from "@/components/StagiairesForm";
import StepIndicator from "@/components/StepIndicator";
import LogoSignatureUpload from "@/components/LogoSignatureUpload";
import { genContratFormationParticulier, genDevis } from "@/lib/templatesAF";
import { genReglement_V2 } from "@/lib/generatorsV2";
import { generateDocumentById } from "@/lib/documentGenerator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

function generateDocumentHTML(docId: string, o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo[], cvFormateur: string): string | null {
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
    case "cv":
      if (cvFormateur) return `<div style="font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:40px;white-space:pre-wrap;">${cvFormateur}</div>`;
      return null;
    default: return null;
  }
}

const DemandeNDA = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [organisme, setOrganisme] = useState<OrganismeInfo>(emptyOrganisme);
  const [formation, setFormation] = useState<FormationInfo>(emptyFormation);
  const [stagiaires, setStagiaires] = useState<StagiaireInfo[]>([]);
  const [cvFormateur, setCvFormateur] = useState("");
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [previewHTML, setPreviewHTML] = useState("");
  const [generating, setGenerating] = useState(false);

  const handlePreview = (docId: string) => {
    const html = generateDocumentHTML(docId, organisme, formation, stagiaires, cvFormateur);
    if (!html) {
      toast.error(docId === "logo" ? "Veuillez d'abord importer un logo" : "Veuillez remplir le CV du formateur");
      return;
    }
    setPreviewDoc(docId);
    setPreviewHTML(html);
  };

  const handleDownload = async (docId: string) => {
    const html = generateDocumentHTML(docId, organisme, formation, stagiaires, cvFormateur);
    if (!html) {
      toast.error("Document non disponible. Remplissez les champs requis.");
      return;
    }
    if (docId === "logo" && organisme.logoUrl) {
      const a = document.createElement("a");
      a.href = organisme.logoUrl;
      a.download = "logo_organisme.png";
      a.click();
      return;
    }
    const { downloadAsWord } = await import("@/lib/wordExport");
    const label = NDA_DOCUMENTS.find(d => d.id === docId)?.label || docId;
    await downloadAsWord(html, `${label} - ${organisme.nom || "Organisme"}`);
    toast.success(`${label} téléchargé !`);
  };

  const handleDownloadAll = async () => {
    setGenerating(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const { htmlToWordBlob } = await import("@/lib/wordExport");

      for (const doc of NDA_DOCUMENTS) {
        if (doc.id === "logo" && organisme.logoUrl) {
          try {
            const resp = await fetch(organisme.logoUrl);
            const blob = await resp.blob();
            zip.file("Logo_Organisme.png", blob);
          } catch { /* skip */ }
          continue;
        }
        const html = generateDocumentHTML(doc.id, organisme, formation, stagiaires, cvFormateur);
        if (html) {
          const blob = await htmlToWordBlob(html);
          const ext = blob.type.includes("docx") ? "docx" : "doc";
          zip.file(`${doc.label}.${ext}`, blob);
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
          {currentStep === 4 && (
            <Button onClick={handleDownloadAll} disabled={generating} className="gap-2 bg-gradient-hero border-0 text-primary-foreground">
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {generating ? "Génération..." : "Télécharger tout (ZIP)"}
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <StepIndicator steps={NDA_STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />

        <div className="bg-card rounded-2xl border shadow-card p-6 md:p-8">
          {currentStep === 1 && <OrganismeForm data={organisme} onChange={setOrganisme} hideFields={['domainesFormation', 'certifications', 'outilsUtilises', 'version', 'typesActions']} />}
          {currentStep === 2 && <FormationForm data={formation} onChange={setFormation} onImportStagiaires={setStagiaires} />}
          {currentStep === 3 && <StagiairesForm data={stagiaires} onChange={setStagiaires} />}
          {currentStep === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: CV + extras */}
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

              {/* Right: Documents list + preview */}
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
                              <Download className="w-3.5 h-3.5" /> DOC
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
