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
}

const emptyForm: NDAFormData = {
  nomOrganisme: "", siret: "", adresse: "", codePostal: "", ville: "",
  telephone: "", email: "", dirigeant: "", activitePrincipale: "",
  domainesFormation: "", publicVise: "", moyensPedagogiques: "",
  logoUrl: "", signatureUrl: "", cvFormateur: "",
  intituleFormation: "", dureeFormation: "", objectifsFormation: "",
  tarifFormation: "", programmeFormation: "",
};

const NDA_DOCUMENTS = [
  { id: "contrat", label: "Contrat de Formation", icon: "📄" },
  { id: "programme", label: "Programme de Formation", icon: "📋" },
  { id: "reglement", label: "Règlement Intérieur", icon: "📜" },
  { id: "devis", label: "Devis", icon: "💰" },
  { id: "logo", label: "Logo de l'organisme", icon: "🖼️" },
  { id: "cv", label: "CV du Formateur", icon: "👤" },
];

function generateContrat(data: NDAFormData): string {
  const today = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return `
    <div style="font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:40px;">
      ${data.logoUrl ? `<img src="${data.logoUrl}" style="max-height:80px;margin-bottom:20px;" />` : ""}
      <h1 style="text-align:center;font-size:22px;margin-bottom:30px;text-transform:uppercase;border-bottom:2px solid #2563eb;padding-bottom:10px;">Contrat de Formation Professionnelle</h1>
      <p style="text-align:right;margin-bottom:20px;">Fait à ${data.ville || "___________"}, le ${today}</p>
      <h3 style="margin-top:25px;">ENTRE LES SOUSSIGNÉS :</h3>
      <p><strong>L'organisme de formation :</strong><br/>
      ${data.nomOrganisme || "___________"}<br/>
      SIRET : ${data.siret || "___________"}<br/>
      ${data.adresse || "___________"}, ${data.codePostal || ""} ${data.ville || ""}<br/>
      ${data.telephone ? `Tél : ${data.telephone}<br/>` : ""}
      Email : ${data.email || "___________"}<br/>
      Représenté(e) par : ${data.dirigeant || "___________"}</p>
      <p><strong>ET</strong></p>
      <p><strong>Le Client :</strong><br/>
      Nom / Raison sociale : ___________<br/>
      Adresse : ___________<br/>
      Représenté(e) par : ___________</p>
      <h3>ARTICLE 1 – OBJET</h3>
      <p>Le présent contrat a pour objet la réalisation de l'action de formation suivante :</p>
      <table style="width:100%;border-collapse:collapse;margin:15px 0;">
        <tr><td style="border:1px solid #ddd;padding:8px;background:#f8fafc;width:200px;"><strong>Intitulé</strong></td><td style="border:1px solid #ddd;padding:8px;">${data.intituleFormation || "___________"}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;background:#f8fafc;"><strong>Durée</strong></td><td style="border:1px solid #ddd;padding:8px;">${data.dureeFormation || "___________"}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;background:#f8fafc;"><strong>Objectifs</strong></td><td style="border:1px solid #ddd;padding:8px;">${data.objectifsFormation || "___________"}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;background:#f8fafc;"><strong>Public visé</strong></td><td style="border:1px solid #ddd;padding:8px;">${data.publicVise || "Tout public"}</td></tr>
      </table>
      <h3>ARTICLE 2 – TARIF ET MODALITÉS DE PAIEMENT</h3>
      <p>Le coût de la formation est fixé à <strong>${data.tarifFormation || "___________"} €</strong> net de taxes.</p>
      <p>Le règlement s'effectue selon les modalités suivantes : paiement à réception de facture, sous 30 jours.</p>
      <h3>ARTICLE 3 – MOYENS PÉDAGOGIQUES</h3>
      <p>${data.moyensPedagogiques || "Supports de cours, exercices pratiques, évaluations."}</p>
      <h3>ARTICLE 4 – SANCTIONS</h3>
      <p>À l'issue de la formation, une attestation de fin de formation sera remise au stagiaire.</p>
      <h3>ARTICLE 5 – DÉDIT ET ANNULATION</h3>
      <p>En cas de renoncement par le Client, celui-ci s'engage à en informer l'organisme de formation par écrit au moins 15 jours avant le début de la formation.</p>
      <div style="display:flex;justify-content:space-between;margin-top:50px;">
        <div style="text-align:center;width:45%;">
          <p><strong>L'Organisme de Formation</strong></p>
          <p>${data.dirigeant || "___________"}</p>
          ${data.signatureUrl ? `<img src="${data.signatureUrl}" style="max-height:60px;" />` : '<p style="margin-top:40px;border-top:1px solid #999;width:200px;margin-left:auto;margin-right:auto;">Signature</p>'}
        </div>
        <div style="text-align:center;width:45%;">
          <p><strong>Le Client</strong></p>
          <p>___________</p>
          <p style="margin-top:40px;border-top:1px solid #999;width:200px;margin-left:auto;margin-right:auto;">Signature</p>
        </div>
      </div>
    </div>`;
}

function generateProgramme(data: NDAFormData): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:40px;">
      ${data.logoUrl ? `<img src="${data.logoUrl}" style="max-height:80px;margin-bottom:20px;" />` : ""}
      <h1 style="text-align:center;font-size:22px;margin-bottom:30px;text-transform:uppercase;border-bottom:2px solid #2563eb;padding-bottom:10px;">Programme de Formation</h1>
      <table style="width:100%;border-collapse:collapse;margin:15px 0;">
        <tr><td style="border:1px solid #ddd;padding:8px;background:#f8fafc;width:200px;"><strong>Intitulé</strong></td><td style="border:1px solid #ddd;padding:8px;">${data.intituleFormation || "___________"}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;background:#f8fafc;"><strong>Durée</strong></td><td style="border:1px solid #ddd;padding:8px;">${data.dureeFormation || "___________"}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;background:#f8fafc;"><strong>Public visé</strong></td><td style="border:1px solid #ddd;padding:8px;">${data.publicVise || "Tout public"}</td></tr>
        <tr><td style="border:1px solid #ddd;padding:8px;background:#f8fafc;"><strong>Prérequis</strong></td><td style="border:1px solid #ddd;padding:8px;">Aucun prérequis particulier</td></tr>
      </table>
      <h3>Objectifs pédagogiques</h3>
      <p>${data.objectifsFormation || "À l'issue de la formation, le stagiaire sera capable de maîtriser les compétences visées."}</p>
      <h3>Contenu détaillé</h3>
      <div style="white-space:pre-wrap;">${data.programmeFormation || `Module 1 : Introduction et fondamentaux\n- Présentation du contexte\n- Définitions et concepts clés\n- Cadre réglementaire\n\nModule 2 : Approfondissement\n- Mise en pratique\n- Études de cas\n- Exercices d'application\n\nModule 3 : Évaluation et bilan\n- QCM de validation\n- Exercices pratiques\n- Bilan de formation`}</div>
      <h3>Moyens pédagogiques et techniques</h3>
      <p>${data.moyensPedagogiques || "Supports de cours projetés, exercices pratiques, mises en situation."}</p>
      <h3>Modalités d'évaluation</h3>
      <p>Évaluations formatives en cours de formation. Évaluation sommative en fin de formation (QCM, mise en situation).</p>
      <h3>Sanction de la formation</h3>
      <p>Attestation de fin de formation remise au stagiaire.</p>
      <div style="margin-top:40px;text-align:right;">
        <p>${data.nomOrganisme || "___________"}</p>
        ${data.signatureUrl ? `<img src="${data.signatureUrl}" style="max-height:60px;" />` : ""}
      </div>
    </div>`;
}

function generateReglement(data: NDAFormData): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:40px;">
      ${data.logoUrl ? `<img src="${data.logoUrl}" style="max-height:80px;margin-bottom:20px;" />` : ""}
      <h1 style="text-align:center;font-size:22px;margin-bottom:30px;text-transform:uppercase;border-bottom:2px solid #2563eb;padding-bottom:10px;">Règlement Intérieur</h1>
      <p style="text-align:center;margin-bottom:20px;"><strong>${data.nomOrganisme || "___________"}</strong><br/>SIRET : ${data.siret || "___________"}</p>
      
      <h3>ARTICLE 1 – OBJET ET CHAMP D'APPLICATION</h3>
      <p>Le présent règlement intérieur s'applique à tous les stagiaires inscrits à une session de formation dispensée par ${data.nomOrganisme || "l'organisme"}, et ce pour la durée de la formation suivie.</p>
      
      <h3>ARTICLE 2 – DISCIPLINE GÉNÉRALE</h3>
      <p>Les stagiaires doivent se conformer aux horaires fixés et communiqués en début de formation. Toute absence ou retard doit être signalé et justifié auprès du responsable de la formation.</p>
      
      <h3>ARTICLE 3 – HYGIÈNE ET SÉCURITÉ</h3>
      <p>Les consignes d'hygiène et de sécurité, propres à chaque lieu de formation, doivent être strictement respectées. Il est interdit de fumer dans les locaux de formation. L'introduction de boissons alcoolisées est interdite.</p>
      
      <h3>ARTICLE 4 – COMPORTEMENT</h3>
      <p>Il est demandé à chaque stagiaire d'avoir un comportement respectueux envers les autres stagiaires et le personnel de l'organisme. Tout comportement contraire aux règles de bienséance pourra faire l'objet d'une exclusion.</p>
      
      <h3>ARTICLE 5 – SANCTIONS</h3>
      <p>Tout manquement du stagiaire à l'une des dispositions du présent règlement pourra donner lieu à une sanction. Les sanctions applicables sont : avertissement écrit, exclusion temporaire, exclusion définitive.</p>
      
      <h3>ARTICLE 6 – REPRÉSENTATION DES STAGIAIRES</h3>
      <p>Pour les formations d'une durée supérieure à 500 heures, il est procédé à l'élection d'un délégué titulaire et d'un délégué suppléant.</p>
      
      <h3>ARTICLE 7 – RÉCLAMATIONS</h3>
      <p>Toute réclamation peut être adressée à : ${data.email || "___________"}</p>
      
      <div style="margin-top:40px;">
        <p>Fait à ${data.ville || "___________"}, le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
        <p><strong>${data.dirigeant || "Le Directeur"}</strong></p>
        ${data.signatureUrl ? `<img src="${data.signatureUrl}" style="max-height:60px;" />` : ""}
      </div>
    </div>`;
}

function generateDevis(data: NDAFormData): string {
  const today = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const numDevis = `DEV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000 + 1000))}`;
  return `
    <div style="font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:40px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px;">
        <div>
          ${data.logoUrl ? `<img src="${data.logoUrl}" style="max-height:80px;margin-bottom:10px;" />` : ""}
          <p><strong>${data.nomOrganisme || "___________"}</strong><br/>
          ${data.adresse || "___________"}<br/>
          ${data.codePostal || ""} ${data.ville || ""}<br/>
          ${data.telephone ? `Tél : ${data.telephone}<br/>` : ""}
          ${data.email || "___________"}<br/>
          SIRET : ${data.siret || "___________"}</p>
        </div>
        <div style="text-align:right;">
          <h2 style="font-size:24px;color:#2563eb;margin:0;">DEVIS</h2>
          <p>N° ${numDevis}<br/>Date : ${today}</p>
        </div>
      </div>
      <div style="background:#f8fafc;padding:15px;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:25px;">
        <p><strong>Client :</strong><br/>
        Nom / Raison sociale : ___________<br/>
        Adresse : ___________</p>
      </div>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <thead>
          <tr style="background:#2563eb;color:#fff;">
            <th style="padding:10px;text-align:left;border:1px solid #1d4ed8;">Désignation</th>
            <th style="padding:10px;text-align:center;border:1px solid #1d4ed8;">Durée</th>
            <th style="padding:10px;text-align:right;border:1px solid #1d4ed8;">Prix unitaire</th>
            <th style="padding:10px;text-align:right;border:1px solid #1d4ed8;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:10px;border:1px solid #ddd;">${data.intituleFormation || "Formation professionnelle"}</td>
            <td style="padding:10px;text-align:center;border:1px solid #ddd;">${data.dureeFormation || "___"}</td>
            <td style="padding:10px;text-align:right;border:1px solid #ddd;">${data.tarifFormation || "___"} €</td>
            <td style="padding:10px;text-align:right;border:1px solid #ddd;"><strong>${data.tarifFormation || "___"} €</strong></td>
          </tr>
        </tbody>
      </table>
      <div style="text-align:right;margin:20px 0;">
        <p>TVA non applicable, art. 261 du CGI</p>
        <p style="font-size:18px;"><strong>Total net : ${data.tarifFormation || "___"} €</strong></p>
      </div>
      <p style="font-size:11px;color:#666;margin-top:20px;">Validité du devis : 30 jours. Conditions de règlement : paiement à réception de facture sous 30 jours.</p>
      <div style="display:flex;justify-content:space-between;margin-top:40px;">
        <div>
          <p><strong>Bon pour accord :</strong></p>
          <p>Date : ___________</p>
          <p style="margin-top:30px;border-top:1px solid #999;width:200px;">Signature du Client</p>
        </div>
        <div style="text-align:right;">
          <p><strong>${data.dirigeant || "___________"}</strong></p>
          ${data.signatureUrl ? `<img src="${data.signatureUrl}" style="max-height:60px;" />` : ""}
        </div>
      </div>
    </div>`;
}

function generateDocumentHTML(docId: string, data: NDAFormData): string | null {
  switch (docId) {
    case "contrat": return generateContrat(data);
    case "programme": return generateProgramme(data);
    case "reglement": return generateReglement(data);
    case "devis": return generateDevis(data);
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
