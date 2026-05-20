import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Download, Plus, Trash2, Eye, Sparkles, Loader2, FileText } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { CVData, CVDesign, CV_DESIGNS, emptyCV, generateCVHTML } from "@/lib/cvGenerator";
import type { CVExperience } from "@/lib/cvGenerator";

// ===== Component =====
const GenerateurCV = () => {
  const navigate = useNavigate();
  const [cv, setCv] = useState<CVData>(emptyCV);
  const [selectedDesign, setSelectedDesign] = useState<CVDesign>("classique");
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const update = <K extends keyof CVData>(field: K, value: CVData[K]) =>
    setCv(prev => ({ ...prev, [field]: value }));

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("photoUrl", reader.result as string);
    reader.readAsDataURL(file);
  };

  // List helpers
  const addItem = <K extends keyof CVData>(field: K, template: CVData[K] extends (infer U)[] ? U : never) => {
    update(field, [...(cv[field] as any[]), template] as any);
  };
  const removeItem = (field: keyof CVData, index: number) => {
    update(field, (cv[field] as any[]).filter((_: any, i: number) => i !== index) as any);
  };
  const updateItem = (field: keyof CVData, index: number, key: string, value: any) => {
    const arr = [...(cv[field] as any[])];
    arr[index] = { ...arr[index], [key]: value };
    update(field, arr as any);
  };

  const handleDownloadDoc = async () => {
    const html = generateCVHTML(cv, selectedDesign);
    const { downloadAsWord } = await import("@/lib/wordExport");
    await downloadAsWord(html, `CV_${cv.prenom}_${cv.nom || "Formateur"}`);
    toast.success("CV téléchargé en DOC !");
  };

  const handleDownloadPdf = async () => {
    const html = generateCVHTML(cv, selectedDesign);
    try {
      const blob = await htmlToPdfBlob(html);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `CV_${cv.prenom}_${cv.nom || "Formateur"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("CV téléchargé en PDF !");
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors de la génération PDF");
    }
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Décrivez brièvement votre profil (ex: formateur en management, 10 ans d'expérience, Paris)");
      return;
    }
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-cv", {
        body: { description: aiPrompt },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setCv(prev => ({
        ...emptyCV,
        ...prev,
        ...data,
        experiences: Array.isArray(data?.experiences) && data.experiences.length ? data.experiences : prev.experiences,
        formations: Array.isArray(data?.formations) && data.formations.length ? data.formations : prev.formations,
        competences: Array.isArray(data?.competences) && data.competences.length ? data.competences : prev.competences,
        langues: Array.isArray(data?.langues) && data.langues.length ? data.langues : prev.langues,
        certifications: Array.isArray(data?.certifications) && data.certifications.length ? data.certifications : prev.certifications,
        photoUrl: prev.photoUrl,
      }));
      toast.success("CV généré par IA ! Vous pouvez ajuster les détails.");
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Erreur lors de la génération IA");
    } finally {
      setAiLoading(false);
    }
  };

  const previewHTML = generateCVHTML(cv, selectedDesign);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1">
              <ChevronLeft className="w-4 h-4" /> Accueil
            </Button>
            <span className="font-bold text-lg">Générateur de CV Formateur</span>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleDownloadPdf} className="gap-2 bg-gradient-hero border-0 text-primary-foreground">
              <FileText className="w-4 h-4" /> PDF
            </Button>
            <Button onClick={handleDownloadDoc} variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> DOC
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Form */}
        <div className="space-y-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)" }}>
          {/* AI Generation */}
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Génération IA rapide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                rows={3}
                placeholder="Décrivez votre profil en quelques mots... Ex: Formateur en management et leadership, 12 ans d'expérience, certifié TOSA et Qualiopi, basé à Lyon"
                className="resize-none"
              />
              <Button
                onClick={handleAIGenerate}
                disabled={aiLoading}
                className="w-full gap-2 bg-gradient-hero border-0 text-primary-foreground"
              >
                {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {aiLoading ? "Génération en cours..." : "Générer mon CV avec l'IA"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                L'IA remplit tous les champs automatiquement. Vous pourrez ensuite modifier les détails.
              </p>
            </CardContent>
          </Card>

          {/* Design picker */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Design du CV</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CV_DESIGNS.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDesign(d.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${selectedDesign === d.id ? "border-primary bg-accent/30" : "border-border hover:border-primary/40"}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ background: d.accent }} />
                      <span className="font-medium text-sm">{d.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{d.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personal info */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Informations personnelles</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <div><Label>Prénom</Label><Input value={cv.prenom} onChange={e => update("prenom", e.target.value)} placeholder="Jean" /></div>
              <div><Label>Nom</Label><Input value={cv.nom} onChange={e => update("nom", e.target.value)} placeholder="DUPONT" /></div>
              <div className="col-span-2"><Label>Titre professionnel</Label><Input value={cv.titre} onChange={e => update("titre", e.target.value)} placeholder="Formateur professionnel" /></div>
              <div><Label>Email</Label><Input value={cv.email} onChange={e => update("email", e.target.value)} placeholder="jean@email.com" /></div>
              <div><Label>Téléphone</Label><Input value={cv.telephone} onChange={e => update("telephone", e.target.value)} placeholder="06 12 34 56 78" /></div>
              <div className="col-span-2"><Label>Adresse</Label><Input value={cv.adresse} onChange={e => update("adresse", e.target.value)} placeholder="Paris, France" /></div>
              <div className="col-span-2">
                <Label>Photo</Label>
                <div className="flex items-center gap-3">
                  {cv.photoUrl && <img src={cv.photoUrl} className="w-12 h-12 rounded-full object-cover" alt="Photo" />}
                  <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  <Button variant="outline" size="sm" onClick={() => photoInputRef.current?.click()}>
                    {cv.photoUrl ? "Changer" : "Ajouter une photo"}
                  </Button>
                  {cv.photoUrl && <Button variant="ghost" size="sm" onClick={() => update("photoUrl", "")}>Supprimer</Button>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profil & Spécialités */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Profil & Spécialités</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><Label>Résumé professionnel</Label><Textarea value={cv.profil} onChange={e => update("profil", e.target.value)} rows={3} placeholder="Formateur expérimenté avec 10 ans d'expertise..." /></div>
              <div><Label>Spécialités</Label><Input value={cv.specialites} onChange={e => update("specialites", e.target.value)} placeholder="Management, Communication, Digital" /></div>
            </CardContent>
          </Card>

          {/* Expériences */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Expériences professionnelles</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => addItem("experiences", { poste: "", entreprise: "", dateDebut: "", dateFin: "", description: "" })}><Plus className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {cv.experiences.map((exp, i) => (
                <div key={i} className="border rounded-lg p-3 space-y-2 relative">
                  {cv.experiences.length > 1 && <Button variant="ghost" size="sm" className="absolute top-1 right-1 h-7 w-7 p-0" onClick={() => removeItem("experiences", i)}><Trash2 className="w-3.5 h-3.5" /></Button>}
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label>Poste</Label><Input value={exp.poste} onChange={e => updateItem("experiences", i, "poste", e.target.value)} placeholder="Formateur" /></div>
                    <div><Label>Entreprise</Label><Input value={exp.entreprise} onChange={e => updateItem("experiences", i, "entreprise", e.target.value)} /></div>
                    <div><Label>Début</Label><Input value={exp.dateDebut} onChange={e => updateItem("experiences", i, "dateDebut", e.target.value)} placeholder="2020" /></div>
                    <div><Label>Fin</Label><Input value={exp.dateFin} onChange={e => updateItem("experiences", i, "dateFin", e.target.value)} placeholder="Présent" /></div>
                  </div>
                  <div><Label>Description</Label><Textarea value={exp.description} onChange={e => updateItem("experiences", i, "description", e.target.value)} rows={2} /></div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Expérience pédagogique */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Expérience pédagogique</CardTitle></CardHeader>
            <CardContent>
              <Textarea value={cv.experiencePedagogique} onChange={e => update("experiencePedagogique", e.target.value)} rows={4} placeholder="Détaillez votre expérience en tant que formateur : publics formés, domaines, volumes horaires..." />
            </CardContent>
          </Card>

          {/* Formation */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Formation</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => addItem("formations", { diplome: "", etablissement: "", annee: "" })}><Plus className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {cv.formations.map((f, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <div className="flex-1"><Label>Diplôme</Label><Input value={f.diplome} onChange={e => updateItem("formations", i, "diplome", e.target.value)} placeholder="Master Management" /></div>
                  <div className="flex-1"><Label>Établissement</Label><Input value={f.etablissement} onChange={e => updateItem("formations", i, "etablissement", e.target.value)} /></div>
                  <div className="w-20"><Label>Année</Label><Input value={f.annee} onChange={e => updateItem("formations", i, "annee", e.target.value)} placeholder="2015" /></div>
                  {cv.formations.length > 1 && <Button variant="ghost" size="sm" className="h-9 w-9 p-0" onClick={() => removeItem("formations", i)}><Trash2 className="w-3.5 h-3.5" /></Button>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Certifications</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => addItem("certifications", { nom: "", annee: "" })}><Plus className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {cv.certifications.map((c, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <div className="flex-1"><Label>Certification</Label><Input value={c.nom} onChange={e => updateItem("certifications", i, "nom", e.target.value)} placeholder="Certification TOSA Excel" /></div>
                  <div className="w-20"><Label>Année</Label><Input value={c.annee} onChange={e => updateItem("certifications", i, "annee", e.target.value)} placeholder="2023" /></div>
                  {cv.certifications.length > 1 && <Button variant="ghost" size="sm" className="h-9 w-9 p-0" onClick={() => removeItem("certifications", i)}><Trash2 className="w-3.5 h-3.5" /></Button>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Compétences */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Compétences</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => addItem("competences", { nom: "", niveau: 3 })}><Plus className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {cv.competences.map((c, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="flex-1"><Input value={c.nom} onChange={e => updateItem("competences", i, "nom", e.target.value)} placeholder="Pédagogie" /></div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} onClick={() => updateItem("competences", i, "niveau", n)} className={`w-6 h-6 rounded-full border-2 text-xs font-bold transition-colors ${c.niveau >= n ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>{n}</button>
                    ))}
                  </div>
                  {cv.competences.length > 1 && <Button variant="ghost" size="sm" className="h-9 w-9 p-0" onClick={() => removeItem("competences", i)}><Trash2 className="w-3.5 h-3.5" /></Button>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Langues */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Langues</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => addItem("langues", { langue: "", niveau: "" })}><Plus className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {cv.langues.map((l, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <div className="flex-1"><Label>Langue</Label><Input value={l.langue} onChange={e => updateItem("langues", i, "langue", e.target.value)} placeholder="Anglais" /></div>
                  <div className="flex-1"><Label>Niveau</Label><Input value={l.niveau} onChange={e => updateItem("langues", i, "niveau", e.target.value)} placeholder="Courant (B2)" /></div>
                  {cv.langues.length > 1 && <Button variant="ghost" size="sm" className="h-9 w-9 p-0" onClick={() => removeItem("langues", i)}><Trash2 className="w-3.5 h-3.5" /></Button>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Publications */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Publications</CardTitle></CardHeader>
            <CardContent>
              <Textarea value={cv.publications} onChange={e => update("publications", e.target.value)} rows={3} placeholder="Articles, ouvrages, supports publiés..." />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="sticky top-20" style={{ height: "calc(100vh - 100px)" }}>
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2"><Eye className="w-4 h-4" /> Aperçu en direct</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-full overflow-auto bg-white border-t">
                <iframe
                  srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:0;background:#fff;}</style></head><body>${previewHTML}</body></html>`}
                  style={{ width: "100%", height: "100%", border: "none", minHeight: "900px" }}
                  title="Aperçu CV"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GenerateurCV;
