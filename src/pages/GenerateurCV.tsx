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

// ===== CV Data Types =====
interface CVExperience {
  poste: string;
  entreprise: string;
  dateDebut: string;
  dateFin: string;
  description: string;
}
interface CVFormation {
  diplome: string;
  etablissement: string;
  annee: string;
}
interface CVCompetence {
  nom: string;
  niveau: number; // 1-5
}
interface CVLangue {
  langue: string;
  niveau: string;
}
interface CVCertification {
  nom: string;
  annee: string;
}
interface CVData {
  prenom: string;
  nom: string;
  titre: string; // ex: Formateur professionnel
  email: string;
  telephone: string;
  adresse: string;
  photoUrl: string;
  profil: string; // résumé
  specialites: string;
  experiences: CVExperience[];
  formations: CVFormation[];
  competences: CVCompetence[];
  langues: CVLangue[];
  certifications: CVCertification[];
  experiencePedagogique: string;
  publications: string;
}

const emptyCV: CVData = {
  prenom: "", nom: "", titre: "Formateur professionnel", email: "", telephone: "",
  adresse: "", photoUrl: "", profil: "", specialites: "",
  experiences: [{ poste: "", entreprise: "", dateDebut: "", dateFin: "", description: "" }],
  formations: [{ diplome: "", etablissement: "", annee: "" }],
  competences: [{ nom: "", niveau: 3 }],
  langues: [{ langue: "Français", niveau: "Langue maternelle" }],
  certifications: [{ nom: "", annee: "" }],
  experiencePedagogique: "",
  publications: "",
};

// ===== CV Design Templates =====
type CVDesign = "classique" | "moderne" | "minimaliste" | "elegant" | "colore" | "sidebar";

const CV_DESIGNS: { id: CVDesign; label: string; description: string; accent: string }[] = [
  { id: "classique", label: "Classique", description: "Sobre et professionnel", accent: "#1e3a7b" },
  { id: "moderne", label: "Moderne", description: "Design épuré avec accents", accent: "#2563eb" },
  { id: "minimaliste", label: "Minimaliste", description: "Ultra-clean et aéré", accent: "#111827" },
  { id: "elegant", label: "Élégant", description: "Touches dorées raffinées", accent: "#92700C" },
  { id: "colore", label: "Coloré", description: "Palette vive et dynamique", accent: "#dc2626" },
  { id: "sidebar", label: "Sidebar", description: "Colonne latérale moderne", accent: "#0f766e" },
];

// ===== HTML Generators =====
function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function skillBar(level: number, accent: string, style: "bar" | "dots" | "line" = "bar") {
  if (style === "dots") {
    return `<span>${Array.from({ length: 5 }, (_, i) => `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:3px;background:${i < level ? accent : '#ddd'}"></span>`).join("")}</span>`;
  }
  if (style === "line") {
    return `<div style="background:#e5e7eb;border-radius:4px;height:4px;width:100%;margin-top:4px;"><div style="background:${accent};height:100%;border-radius:4px;width:${level * 20}%"></div></div>`;
  }
  return `<div style="background:#e5e7eb;border-radius:4px;height:8px;width:100%;margin-top:4px;"><div style="background:${accent};height:100%;border-radius:4px;width:${level * 20}%"></div></div>`;
}

function photoBlock(url: string, size = 100, round = true) {
  if (!url) return "";
  return `<img src="${url}" style="width:${size}px;height:${size}px;${round ? "border-radius:50%;" : "border-radius:8px;"}object-fit:cover;display:block;" />`;
}

function sectionTitle(text: string, accent: string, style: "underline" | "filled" | "plain" | "leftbar" = "underline") {
  if (style === "filled") return `<h2 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;background:${accent};color:#fff;padding:6px 12px;margin:18px 0 10px 0;border-radius:3px;">${text}</h2>`;
  if (style === "leftbar") return `<h2 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-left:4px solid ${accent};padding-left:10px;margin:18px 0 10px 0;color:${accent};">${text}</h2>`;
  if (style === "plain") return `<h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:18px 0 8px 0;color:${accent};">${text}</h2>`;
  return `<h2 style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid ${accent};padding-bottom:4px;margin:18px 0 10px 0;color:${accent};">${text}</h2>`;
}

function expBlock(exp: CVExperience) {
  return `<div style="margin-bottom:10px;"><strong>${escapeHtml(exp.poste)}</strong>${exp.entreprise ? ` — ${escapeHtml(exp.entreprise)}` : ""}${exp.dateDebut ? `<br><span style="color:#666;font-size:11px;">${exp.dateDebut}${exp.dateFin ? ` – ${exp.dateFin}` : " – Présent"}</span>` : ""}${exp.description ? `<p style="margin:4px 0 0 0;font-size:12px;color:#444;">${escapeHtml(exp.description)}</p>` : ""}</div>`;
}

function generateCVHTML(data: CVData, design: CVDesign): string {
  const d = CV_DESIGNS.find(dd => dd.id === design)!;
  const accent = d.accent;
  const fullName = `${data.prenom} ${data.nom}`.trim() || "Votre Nom";

  const contactInfo = [data.email, data.telephone, data.adresse].filter(Boolean).join(" • ");
  const exps = data.experiences.filter(e => e.poste || e.entreprise);
  const forms = data.formations.filter(f => f.diplome || f.etablissement);
  const comps = data.competences.filter(c => c.nom);
  const langs = data.langues.filter(l => l.langue);
  const certs = data.certifications.filter(c => c.nom);

  // Common blocks
  const profilSection = data.profil ? `${sectionTitle("Profil", accent, design === "moderne" ? "leftbar" : design === "colore" ? "filled" : design === "minimaliste" ? "plain" : "underline")}<p style="font-size:12px;line-height:1.6;color:#333;">${escapeHtml(data.profil)}</p>` : "";
  const speSection = data.specialites ? `${sectionTitle("Spécialités", accent, design === "moderne" ? "leftbar" : design === "colore" ? "filled" : design === "minimaliste" ? "plain" : "underline")}<p style="font-size:12px;color:#333;">${escapeHtml(data.specialites)}</p>` : "";
  const expSection = exps.length ? `${sectionTitle("Expérience professionnelle", accent, design === "moderne" ? "leftbar" : design === "colore" ? "filled" : design === "minimaliste" ? "plain" : "underline")}${exps.map(expBlock).join("")}` : "";
  const pedSection = data.experiencePedagogique ? `${sectionTitle("Expérience pédagogique", accent, design === "moderne" ? "leftbar" : design === "colore" ? "filled" : design === "minimaliste" ? "plain" : "underline")}<p style="font-size:12px;line-height:1.6;color:#333;">${escapeHtml(data.experiencePedagogique)}</p>` : "";
  const formSection = forms.length ? `${sectionTitle("Formation", accent, design === "moderne" ? "leftbar" : design === "colore" ? "filled" : design === "minimaliste" ? "plain" : "underline")}${forms.map(f => `<div style="margin-bottom:6px;"><strong>${escapeHtml(f.diplome)}</strong>${f.etablissement ? ` — ${escapeHtml(f.etablissement)}` : ""}${f.annee ? ` <span style="color:#666;font-size:11px;">(${f.annee})</span>` : ""}</div>`).join("")}` : "";
  const certSection = certs.length ? `${sectionTitle("Certifications", accent, design === "moderne" ? "leftbar" : design === "colore" ? "filled" : design === "minimaliste" ? "plain" : "underline")}${certs.map(c => `<div style="margin-bottom:4px;font-size:12px;">• ${escapeHtml(c.nom)}${c.annee ? ` (${c.annee})` : ""}</div>`).join("")}` : "";
  const compSection = comps.length ? `${sectionTitle("Compétences", accent, design === "moderne" ? "leftbar" : design === "colore" ? "filled" : design === "minimaliste" ? "plain" : "underline")}${comps.map(c => `<div style="margin-bottom:6px;"><span style="font-size:12px;">${escapeHtml(c.nom)}</span>${skillBar(c.niveau, accent, design === "minimaliste" ? "line" : design === "elegant" ? "dots" : "bar")}</div>`).join("")}` : "";
  const langSection = langs.length ? `${sectionTitle("Langues", accent, design === "moderne" ? "leftbar" : design === "colore" ? "filled" : design === "minimaliste" ? "plain" : "underline")}${langs.map(l => `<div style="font-size:12px;margin-bottom:3px;">${escapeHtml(l.langue)} — <em>${escapeHtml(l.niveau)}</em></div>`).join("")}` : "";
  const pubSection = data.publications ? `${sectionTitle("Publications", accent, design === "moderne" ? "leftbar" : design === "colore" ? "filled" : design === "minimaliste" ? "plain" : "underline")}<p style="font-size:12px;color:#333;white-space:pre-wrap;">${escapeHtml(data.publications)}</p>` : "";

  if (design === "sidebar") {
    // Two-column layout with sidebar
    return `<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:800px;margin:0 auto;display:flex;min-height:1100px;">
      <div style="width:260px;background:${accent};color:#fff;padding:30px 20px;">
        <div style="text-align:center;margin-bottom:20px;">${photoBlock(data.photoUrl, 120, true)}</div>
        <h1 style="font-size:20px;margin:0 0 4px 0;text-align:center;">${escapeHtml(fullName)}</h1>
        <p style="text-align:center;font-size:12px;opacity:0.85;margin:0 0 20px 0;">${escapeHtml(data.titre)}</p>
        <div style="border-top:1px solid rgba(255,255,255,0.3);padding-top:15px;font-size:11px;">
          ${data.email ? `<p style="margin:4px 0;">✉ ${escapeHtml(data.email)}</p>` : ""}
          ${data.telephone ? `<p style="margin:4px 0;">☎ ${escapeHtml(data.telephone)}</p>` : ""}
          ${data.adresse ? `<p style="margin:4px 0;">📍 ${escapeHtml(data.adresse)}</p>` : ""}
        </div>
        ${comps.length ? `<h3 style="font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:20px 0 8px 0;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:4px;">Compétences</h3>${comps.map(c => `<div style="margin-bottom:6px;font-size:11px;">${escapeHtml(c.nom)}${skillBar(c.niveau, "rgba(255,255,255,0.5)", "line").replace(/#e5e7eb/g, "rgba(255,255,255,0.2)").replace(new RegExp(accent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), "rgba(255,255,255,0.85)")}</div>`).join("") }` : ""}
        ${langs.length ? `<h3 style="font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:20px 0 8px 0;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:4px;">Langues</h3>${langs.map(l => `<div style="font-size:11px;margin-bottom:3px;">${escapeHtml(l.langue)}<br><em style="opacity:0.8">${escapeHtml(l.niveau)}</em></div>`).join("")}` : ""}
        ${certs.length ? `<h3 style="font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:20px 0 8px 0;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:4px;">Certifications</h3>${certs.map(c => `<div style="font-size:11px;margin-bottom:3px;">${escapeHtml(c.nom)}${c.annee ? ` (${c.annee})` : ""}</div>`).join("")}` : ""}
      </div>
      <div style="flex:1;padding:30px 25px;">
        ${profilSection}${speSection}${expSection}${pedSection}${formSection}${pubSection}
      </div>
    </div>`;
  }

  // Header based on design
  let header = "";
  if (design === "classique") {
    header = `<div style="text-align:center;border-bottom:3px solid ${accent};padding-bottom:15px;margin-bottom:15px;">
      ${photoBlock(data.photoUrl, 90, true) ? `<div style="display:flex;justify-content:center;margin-bottom:10px;">${photoBlock(data.photoUrl, 90, true)}</div>` : ""}
      <h1 style="font-size:26px;color:${accent};margin:0;">${escapeHtml(fullName)}</h1>
      <p style="font-size:14px;color:#555;margin:4px 0;">${escapeHtml(data.titre)}</p>
      <p style="font-size:11px;color:#888;margin:4px 0;">${contactInfo}</p>
    </div>`;
  } else if (design === "moderne") {
    header = `<div style="display:flex;align-items:center;gap:20px;border-bottom:2px solid ${accent};padding-bottom:15px;margin-bottom:15px;">
      ${photoBlock(data.photoUrl, 80, false)}
      <div>
        <h1 style="font-size:28px;margin:0;color:#111;">${escapeHtml(fullName)}</h1>
        <p style="font-size:15px;color:${accent};margin:2px 0;font-weight:600;">${escapeHtml(data.titre)}</p>
        <p style="font-size:11px;color:#888;">${contactInfo}</p>
      </div>
    </div>`;
  } else if (design === "minimaliste") {
    header = `<div style="margin-bottom:20px;">
      <h1 style="font-size:30px;font-weight:300;margin:0;letter-spacing:2px;color:#111;">${escapeHtml(fullName)}</h1>
      <p style="font-size:13px;color:#666;margin:4px 0;letter-spacing:1px;">${escapeHtml(data.titre)}</p>
      <p style="font-size:11px;color:#999;margin:4px 0;">${contactInfo}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin-top:15px;" />
    </div>`;
  } else if (design === "elegant") {
    header = `<div style="text-align:center;margin-bottom:20px;">
      ${photoBlock(data.photoUrl, 100, true) ? `<div style="display:flex;justify-content:center;margin-bottom:10px;">${photoBlock(data.photoUrl, 100, true)}</div>` : ""}
      <h1 style="font-size:28px;color:${accent};margin:0;font-family:Georgia,serif;">${escapeHtml(fullName)}</h1>
      <p style="font-size:14px;color:#666;font-style:italic;margin:4px 0;">${escapeHtml(data.titre)}</p>
      <p style="font-size:11px;color:#999;margin:4px 0;">${contactInfo}</p>
      <div style="width:60px;height:2px;background:${accent};margin:12px auto;"></div>
    </div>`;
  } else if (design === "colore") {
    header = `<div style="background:${accent};color:#fff;padding:25px 30px;margin:-30px -30px 20px -30px;display:flex;align-items:center;gap:20px;">
      ${photoBlock(data.photoUrl, 90, true)}
      <div>
        <h1 style="font-size:26px;margin:0;color:#fff;">${escapeHtml(fullName)}</h1>
        <p style="font-size:14px;margin:4px 0;opacity:0.9;">${escapeHtml(data.titre)}</p>
        <p style="font-size:11px;opacity:0.8;">${contactInfo}</p>
      </div>
    </div>`;
  }

  const body = `${profilSection}${speSection}${expSection}${pedSection}${formSection}${certSection}${compSection}${langSection}${pubSection}`;

  return `<div style="font-family:${design === "elegant" ? "Georgia,'Times New Roman',serif" : "'Segoe UI',Arial,sans-serif"};max-width:800px;margin:0 auto;padding:30px;color:#222;font-size:12px;line-height:1.5;">
    ${header}${body}
  </div>`;
}

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

  const handleDownload = async () => {
    const html = generateCVHTML(cv, selectedDesign);
    const { downloadAsWord } = await import("@/lib/wordExport");
    await downloadAsWord(html, `CV_${cv.prenom}_${cv.nom || "Formateur"}`);
    toast.success("CV téléchargé !");
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
      setCv(prev => ({ ...prev, ...data, photoUrl: prev.photoUrl }));
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
          <Button onClick={handleDownload} className="gap-2 bg-gradient-hero border-0 text-primary-foreground">
            <Download className="w-4 h-4" /> Télécharger DOC
          </Button>
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
