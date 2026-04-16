import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Eye, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CVData, CVDesign, CV_DESIGNS, emptyCV, generateCVHTML } from "@/lib/cvGenerator";

interface CVGeneratorEmbedProps {
  cvData: CVData;
  onCVChange: (data: CVData) => void;
  selectedDesign: CVDesign;
  onDesignChange: (design: CVDesign) => void;
}

const CVGeneratorEmbed = ({ cvData, onCVChange, selectedDesign, onDesignChange }: CVGeneratorEmbedProps) => {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const update = <K extends keyof CVData>(field: K, value: CVData[K]) =>
    onCVChange({ ...cvData, [field]: value });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("photoUrl", reader.result as string);
    reader.readAsDataURL(file);
  };

  const addItem = <K extends keyof CVData>(field: K, template: CVData[K] extends (infer U)[] ? U : never) => {
    update(field, [...(cvData[field] as any[]), template] as any);
  };
  const removeItem = (field: keyof CVData, index: number) => {
    update(field, (cvData[field] as any[]).filter((_: any, i: number) => i !== index) as any);
  };
  const updateItem = (field: keyof CVData, index: number, key: string, value: any) => {
    const arr = [...(cvData[field] as any[])];
    arr[index] = { ...arr[index], [key]: value };
    update(field, arr as any);
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Décrivez brièvement votre profil");
      return;
    }
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-cv", {
        body: { description: aiPrompt },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      onCVChange({ ...cvData, ...data, photoUrl: cvData.photoUrl });
      toast.success("CV généré par IA !");
    } catch (e: any) {
      toast.error(e.message || "Erreur lors de la génération IA");
    } finally {
      setAiLoading(false);
    }
  };

  const previewHTML = generateCVHTML(cvData, selectedDesign);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT: Form */}
      <div className="space-y-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
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
              rows={2}
              placeholder="Ex: Formateur en management, 10 ans d'expérience, Lyon"
              className="resize-none"
            />
            <Button onClick={handleAIGenerate} disabled={aiLoading} className="w-full gap-2 bg-gradient-hero border-0 text-primary-foreground" size="sm">
              {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {aiLoading ? "Génération..." : "Générer avec l'IA"}
            </Button>
          </CardContent>
        </Card>

        {/* Design picker */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm">Design</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {CV_DESIGNS.map(d => (
                <button key={d.id} onClick={() => onDesignChange(d.id)}
                  className={`p-2 rounded-lg border-2 text-left transition-all ${selectedDesign === d.id ? "border-primary bg-accent/30" : "border-border hover:border-primary/40"}`}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: d.accent }} />
                    <span className="font-medium text-xs">{d.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personal info */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Informations personnelles</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <div><Label className="text-xs">Prénom</Label><Input value={cvData.prenom} onChange={e => update("prenom", e.target.value)} placeholder="Jean" className="h-8 text-sm" /></div>
            <div><Label className="text-xs">Nom</Label><Input value={cvData.nom} onChange={e => update("nom", e.target.value)} placeholder="DUPONT" className="h-8 text-sm" /></div>
            <div className="col-span-2"><Label className="text-xs">Titre</Label><Input value={cvData.titre} onChange={e => update("titre", e.target.value)} className="h-8 text-sm" /></div>
            <div><Label className="text-xs">Email</Label><Input value={cvData.email} onChange={e => update("email", e.target.value)} className="h-8 text-sm" /></div>
            <div><Label className="text-xs">Téléphone</Label><Input value={cvData.telephone} onChange={e => update("telephone", e.target.value)} className="h-8 text-sm" /></div>
            <div className="col-span-2"><Label className="text-xs">Adresse</Label><Input value={cvData.adresse} onChange={e => update("adresse", e.target.value)} className="h-8 text-sm" /></div>
            <div className="col-span-2">
              <Label className="text-xs">Photo</Label>
              <div className="flex items-center gap-2">
                {cvData.photoUrl && <img src={cvData.photoUrl} className="w-8 h-8 rounded-full object-cover" alt="Photo" />}
                <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => photoInputRef.current?.click()}>
                  {cvData.photoUrl ? "Changer" : "Photo"}
                </Button>
                {cvData.photoUrl && <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => update("photoUrl", "")}>×</Button>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profil */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Profil & Spécialités</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Textarea value={cvData.profil} onChange={e => update("profil", e.target.value)} rows={2} placeholder="Résumé professionnel..." className="text-sm" />
            <Input value={cvData.specialites} onChange={e => update("specialites", e.target.value)} placeholder="Spécialités" className="h-8 text-sm" />
          </CardContent>
        </Card>

        {/* Expériences */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Expériences</CardTitle>
            <Button variant="ghost" size="sm" className="h-7" onClick={() => addItem("experiences", { poste: "", entreprise: "", dateDebut: "", dateFin: "", description: "" })}><Plus className="w-3.5 h-3.5" /></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {cvData.experiences.map((exp, i) => (
              <div key={i} className="border rounded p-2 space-y-1 relative">
                {cvData.experiences.length > 1 && <Button variant="ghost" size="sm" className="absolute top-0.5 right-0.5 h-6 w-6 p-0" onClick={() => removeItem("experiences", i)}><Trash2 className="w-3 h-3" /></Button>}
                <div className="grid grid-cols-2 gap-1">
                  <Input value={exp.poste} onChange={e => updateItem("experiences", i, "poste", e.target.value)} placeholder="Poste" className="h-7 text-xs" />
                  <Input value={exp.entreprise} onChange={e => updateItem("experiences", i, "entreprise", e.target.value)} placeholder="Entreprise" className="h-7 text-xs" />
                  <Input value={exp.dateDebut} onChange={e => updateItem("experiences", i, "dateDebut", e.target.value)} placeholder="Début" className="h-7 text-xs" />
                  <Input value={exp.dateFin} onChange={e => updateItem("experiences", i, "dateFin", e.target.value)} placeholder="Fin" className="h-7 text-xs" />
                </div>
                <Textarea value={exp.description} onChange={e => updateItem("experiences", i, "description", e.target.value)} rows={1} placeholder="Description" className="text-xs" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Exp pédagogique */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Expérience pédagogique</CardTitle></CardHeader>
          <CardContent>
            <Textarea value={cvData.experiencePedagogique} onChange={e => update("experiencePedagogique", e.target.value)} rows={2} placeholder="Publics formés, domaines..." className="text-sm" />
          </CardContent>
        </Card>

        {/* Formation */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Formation</CardTitle>
            <Button variant="ghost" size="sm" className="h-7" onClick={() => addItem("formations", { diplome: "", etablissement: "", annee: "" })}><Plus className="w-3.5 h-3.5" /></Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {cvData.formations.map((f, i) => (
              <div key={i} className="flex gap-1 items-end">
                <Input value={f.diplome} onChange={e => updateItem("formations", i, "diplome", e.target.value)} placeholder="Diplôme" className="h-7 text-xs flex-1" />
                <Input value={f.etablissement} onChange={e => updateItem("formations", i, "etablissement", e.target.value)} placeholder="Établissement" className="h-7 text-xs flex-1" />
                <Input value={f.annee} onChange={e => updateItem("formations", i, "annee", e.target.value)} placeholder="Année" className="h-7 text-xs w-16" />
                {cvData.formations.length > 1 && <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeItem("formations", i)}><Trash2 className="w-3 h-3" /></Button>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Certifications</CardTitle>
            <Button variant="ghost" size="sm" className="h-7" onClick={() => addItem("certifications", { nom: "", annee: "" })}><Plus className="w-3.5 h-3.5" /></Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {cvData.certifications.map((c, i) => (
              <div key={i} className="flex gap-1 items-end">
                <Input value={c.nom} onChange={e => updateItem("certifications", i, "nom", e.target.value)} placeholder="Certification" className="h-7 text-xs flex-1" />
                <Input value={c.annee} onChange={e => updateItem("certifications", i, "annee", e.target.value)} placeholder="Année" className="h-7 text-xs w-16" />
                {cvData.certifications.length > 1 && <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeItem("certifications", i)}><Trash2 className="w-3 h-3" /></Button>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Compétences */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Compétences</CardTitle>
            <Button variant="ghost" size="sm" className="h-7" onClick={() => addItem("competences", { nom: "", niveau: 3 })}><Plus className="w-3.5 h-3.5" /></Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {cvData.competences.map((c, i) => (
              <div key={i} className="flex gap-1 items-center">
                <Input value={c.nom} onChange={e => updateItem("competences", i, "nom", e.target.value)} placeholder="Compétence" className="h-7 text-xs flex-1" />
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => updateItem("competences", i, "niveau", n)} className={`w-5 h-5 rounded-full border text-[10px] font-bold ${c.niveau >= n ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>{n}</button>
                  ))}
                </div>
                {cvData.competences.length > 1 && <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeItem("competences", i)}><Trash2 className="w-3 h-3" /></Button>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Langues */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Langues</CardTitle>
            <Button variant="ghost" size="sm" className="h-7" onClick={() => addItem("langues", { langue: "", niveau: "" })}><Plus className="w-3.5 h-3.5" /></Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {cvData.langues.map((l, i) => (
              <div key={i} className="flex gap-1 items-end">
                <Input value={l.langue} onChange={e => updateItem("langues", i, "langue", e.target.value)} placeholder="Langue" className="h-7 text-xs flex-1" />
                <Input value={l.niveau} onChange={e => updateItem("langues", i, "niveau", e.target.value)} placeholder="Niveau" className="h-7 text-xs flex-1" />
                {cvData.langues.length > 1 && <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeItem("langues", i)}><Trash2 className="w-3 h-3" /></Button>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Publications */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Publications</CardTitle></CardHeader>
          <CardContent>
            <Textarea value={cvData.publications} onChange={e => update("publications", e.target.value)} rows={2} placeholder="Articles, ouvrages..." className="text-sm" />
          </CardContent>
        </Card>
      </div>

      {/* RIGHT: Preview */}
      <div style={{ height: "70vh" }}>
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Eye className="w-4 h-4" /> Aperçu CV</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="h-full overflow-auto bg-white border-t">
              <iframe
                srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:0;background:#fff;}</style></head><body>${previewHTML}</body></html>`}
                style={{ width: "100%", height: "100%", border: "none", minHeight: "700px" }}
                title="Aperçu CV"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CVGeneratorEmbed;
