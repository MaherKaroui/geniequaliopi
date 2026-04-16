import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Download, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import LogoSignatureUpload from "@/components/LogoSignatureUpload";
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { genContratFormationParticulier, genDevis } from "@/lib/templatesAF";
import { genReglement_V2 } from "@/lib/generatorsV2";
import { generateDocumentById } from "@/lib/documentGenerator";

interface NDAFormData {
  nomOrganisme: string;
  siret: string;
  adresse: string;
  codePostal: string;
  ville: string;
  telephone: string;
  email: string;
  dirigeant: string;
  activitePrincipale: string;
  domainesFormation: string;
  publicVise: string;
  moyensPedagogiques: string;
  logoUrl: string;
  signatureUrl: string;
  cvFormateur: string;
  intituleFormation: string;
  dureeFormation: string;
  objectifsFormation: string;
  tarifFormation: string;
  programmeFormation: string;
  formateur: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  modalites: string;
  prerequis: string;
  methodesEvaluation: string;
}

const emptyForm: NDAFormData = {
  nomOrganisme: "", siret: "", adresse: "", codePostal: "", ville: "",
  telephone: "", email: "", dirigeant: "", activitePrincipale: "",
  domainesFormation: "", publicVise: "", moyensPedagogiques: "",
  logoUrl: "", signatureUrl: "", cvFormateur: "",
  intituleFormation: "", dureeFormation: "", objectifsFormation: "",
  tarifFormation: "", programmeFormation: "", formateur: "",
  dateDebut: "", dateFin: "", lieu: "", modalites: "Présentiel",
  prerequis: "", methodesEvaluation: "",
};

const NDA_DOCUMENTS = [
  { id: "contrat", label: "Contrat de Formation", icon: "📄" },
  { id: "programme", label: "Programme de Formation", icon: "📋" },
  { id: "reglement", label: "Règlement Intérieur", icon: "📜" },
  { id: "devis", label: "Devis", icon: "💰" },
  { id: "logo", label: "Logo de l'organisme", icon: "🖼️" },
  { id: "cv", label: "CV du Formateur", icon: "👤" },
];

function formToOrganisme(data: NDAFormData): OrganismeInfo {
  return {
    nom: data.nomOrganisme || "___________",
    siret: data.siret || "___________",
    adresse: data.adresse || "___________",
    codePostal: data.codePostal || "",
    ville: data.ville || "",
    telephone: data.telephone || "",
    email: data.email || "___________",
    siteWeb: "",
    nda: "",
    dirigeant: data.dirigeant || "___________",
    responsablePedagogique: data.dirigeant || "",
    referentHandicap: data.dirigeant || "",
    referentQualite: "",
    poleAdministratif: "",
    domainesFormation: data.domainesFormation || "",
    typesActions: ['actions-formation'],
    certifications: "",
    outilsUtilises: "",
    version: "1.0",
    dateMaj: new Date().toISOString().slice(0, 10),
    logoUrl: data.logoUrl || undefined,
    signatureUrl: data.signatureUrl || undefined,
  };
}

function formToFormation(data: NDAFormData): FormationInfo {
  return {
    intitule: data.intituleFormation || "Formation professionnelle",
    objectifs: data.objectifsFormation || "Maîtriser les compétences visées",
    prerequis: data.prerequis || "Aucun prérequis particulier",
    duree: data.dureeFormation || "14 heures",
    modalites: data.modalites || "Présentiel",
    tarif: data.tarifFormation || "",
    programme: data.programmeFormation || "",
    methodesEvaluation: data.methodesEvaluation || "QCM, exercices pratiques, mise en situation",
    moyensPedagogiques: data.moyensPedagogiques || "Supports de cours, exercices pratiques",
    publicVise: data.publicVise || "Tout public",
    delaiAcces: "15 jours",
    dateDebut: data.dateDebut || "",
    dateFin: data.dateFin || "",
    lieu: data.lieu || data.ville || "",
    nombreParticipants: "1",
    formateur: data.formateur || "",
  };
}

function formToStagiaires(): StagiaireInfo[] {
  return [{
    civilite: "",
    nom: "___________",
    prenom: "___________",
    email: "___________",
    telephone: "",
    entreprise: "___________",
    poste: "___________",
    dateNaissance: "",
  }];
}

function generateDocumentHTML(docId: string, data: NDAFormData): string | null {
  const o = formToOrganisme(data);
  const f = formToFormation(data);
  const s = formToStagiaires();

  switch (docId) {
    case "contrat": {
      const doc = genContratFormationParticulier(o, f, s);
      return buildDocument(doc);
    }
    case "programme": {
      const doc = generateDocumentById("programme", o, f, s, []);
      return doc || null;
    }
    case "reglement": {
      const doc = genReglement_V2(o, f, s);
      return buildDocument(doc);
    }
    case "devis": {
      const doc = genDevis(o, f, s);
      return buildDocument(doc);
    }
    case "logo":
      if (data.logoUrl) return `<div style="text-align:center;padding:60px;"><img src="${data.logoUrl}" style="max-width:400px;" /><p style="margin-top:20px;color:#666;">Logo de l'organisme</p></div>`;
      return null;
    case "cv":
      if (data.cvFormateur) return `<div style="font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:40px;white-space:pre-wrap;">${data.cvFormateur}</div>`;
      return null;
    default: return null;
  }
}

const DemandeNDA = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<NDAFormData>(emptyForm);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [previewHTML, setPreviewHTML] = useState<string>("");
  const [generating, setGenerating] = useState(false);

  const update = (field: keyof NDAFormData, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handlePreview = (docId: string) => {
    const html = generateDocumentHTML(docId, form);
    if (!html) {
      toast.error(docId === "logo" ? "Veuillez d'abord importer un logo" : "Veuillez remplir le CV du formateur");
      return;
    }
    setPreviewDoc(docId);
    setPreviewHTML(html);
  };

  const handleDownload = async (docId: string) => {
    const html = generateDocumentHTML(docId, form);
    if (!html) {
      toast.error("Document non disponible. Remplissez les champs requis.");
      return;
    }
    if (docId === "logo" && form.logoUrl) {
      const a = document.createElement("a");
      a.href = form.logoUrl;
      a.download = "logo_organisme.png";
      a.click();
      return;
    }
    const { downloadAsWord } = await import("@/lib/wordExport");
    const label = NDA_DOCUMENTS.find(d => d.id === docId)?.label || docId;
    await downloadAsWord(html, `${label} - ${form.nomOrganisme || "Organisme"}`);
    toast.success(`${label} téléchargé !`);
  };

  const handleDownloadAll = async () => {
    setGenerating(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const { htmlToWordBlob } = await import("@/lib/wordExport");
      
      for (const doc of NDA_DOCUMENTS) {
        if (doc.id === "logo" && form.logoUrl) {
          try {
            const resp = await fetch(form.logoUrl);
            const blob = await resp.blob();
            zip.file("Logo_Organisme.png", blob);
          } catch { /* skip */ }
          continue;
        }
        const html = generateDocumentHTML(doc.id, form);
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
      a.download = `Demande_NDA_${form.nomOrganisme || "Organisme"}.zip`;
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
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1">
              <ChevronLeft className="w-4 h-4" /> Accueil
            </Button>
            <span className="font-bold text-lg">Demande NDA</span>
          </div>
          <Button onClick={handleDownloadAll} disabled={generating} className="gap-2 bg-gradient-hero border-0 text-primary-foreground">
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {generating ? "Génération..." : "Télécharger tout (ZIP)"}
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Informations de l'organisme</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Label>Nom de l'organisme *</Label><Input value={form.nomOrganisme} onChange={e => update("nomOrganisme", e.target.value)} placeholder="Mon Organisme de Formation" /></div>
              <div><Label>SIRET *</Label><Input value={form.siret} onChange={e => update("siret", e.target.value)} placeholder="123 456 789 00012" /></div>
              <div><Label>Dirigeant *</Label><Input value={form.dirigeant} onChange={e => update("dirigeant", e.target.value)} placeholder="Jean DUPONT" /></div>
              <div className="sm:col-span-2"><Label>Adresse</Label><Input value={form.adresse} onChange={e => update("adresse", e.target.value)} /></div>
              <div><Label>Code Postal</Label><Input value={form.codePostal} onChange={e => update("codePostal", e.target.value)} /></div>
              <div><Label>Ville</Label><Input value={form.ville} onChange={e => update("ville", e.target.value)} /></div>
              <div><Label>Téléphone</Label><Input value={form.telephone} onChange={e => update("telephone", e.target.value)} /></div>
              <div><Label>Email *</Label><Input value={form.email} onChange={e => update("email", e.target.value)} placeholder="contact@organisme.fr" /></div>
              <div className="sm:col-span-2"><Label>Activité principale</Label><Input value={form.activitePrincipale} onChange={e => update("activitePrincipale", e.target.value)} placeholder="Formation professionnelle continue" /></div>
              <div className="sm:col-span-2"><Label>Domaines de formation</Label><Textarea value={form.domainesFormation} onChange={e => update("domainesFormation", e.target.value)} placeholder="Bureautique, Langues, Management..." rows={2} /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Formation</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Label>Intitulé de la formation *</Label><Input value={form.intituleFormation} onChange={e => update("intituleFormation", e.target.value)} /></div>
              <div><Label>Durée</Label><Input value={form.dureeFormation} onChange={e => update("dureeFormation", e.target.value)} placeholder="35 heures (5 jours)" /></div>
              <div><Label>Tarif (€)</Label><Input value={form.tarifFormation} onChange={e => update("tarifFormation", e.target.value)} placeholder="1500" /></div>
              <div className="sm:col-span-2"><Label>Objectifs</Label><Textarea value={form.objectifsFormation} onChange={e => update("objectifsFormation", e.target.value)} rows={3} /></div>
              <div className="sm:col-span-2"><Label>Public visé</Label><Input value={form.publicVise} onChange={e => update("publicVise", e.target.value)} placeholder="Tout public" /></div>
              <div className="sm:col-span-2"><Label>Moyens pédagogiques</Label><Textarea value={form.moyensPedagogiques} onChange={e => update("moyensPedagogiques", e.target.value)} rows={2} /></div>
              <div className="sm:col-span-2"><Label>Programme détaillé</Label><Textarea value={form.programmeFormation} onChange={e => update("programmeFormation", e.target.value)} rows={6} placeholder={"Module 1 : Introduction\n- Point 1\n- Point 2\n\nModule 2 : Approfondissement\n- Point 1\n- Point 2"} /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Logo, Signature & CV</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <LogoSignatureUpload
                logoUrl={form.logoUrl}
                signatureUrl={form.signatureUrl}
                onLogoChange={url => update("logoUrl", url)}
                onSignatureChange={url => update("signatureUrl", url)}
              />
              <div>
                <Label>CV du formateur (texte)</Label>
                <Textarea value={form.cvFormateur} onChange={e => update("cvFormateur", e.target.value)} rows={6} placeholder="Expérience, diplômes, compétences du formateur..." />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Documents */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Documents du dossier NDA</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {NDA_DOCUMENTS.map(doc => {
                const html = generateDocumentHTML(doc.id, form);
                const ready = doc.id === "contrat" || doc.id === "programme" || doc.id === "reglement" || doc.id === "devis" || (doc.id === "logo" && !!form.logoUrl) || (doc.id === "cv" && !!form.cvFormateur);
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

          {/* Preview */}
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
      </main>
    </div>
  );
};

export default DemandeNDA;
