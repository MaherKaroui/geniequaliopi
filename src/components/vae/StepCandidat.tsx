import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, Sparkles, Download, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { VAECandidat, VAECertification } from "@/lib/vae/vaeTypes";
import { downloadCVWord } from "@/lib/vae/vaeGenerator";
import FakeStagiairesToolbar from "@/components/FakeStagiairesToolbar";
import { Badge } from "@/components/ui/badge";
import type { FormationInfo, StagiaireInfo } from "@/types/qualiopi";

interface Props { data: VAECandidat; onChange: (v: VAECandidat) => void; certification: VAECertification; }

async function fileToDataUrl(f: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(f);
  });
}

export default function StepCandidat({ data, onChange, certification }: Props) {
  const [loading, setLoading] = useState(false);
  const [genOpen, setGenOpen] = useState(false);
  const [questionnaire, setQuestionnaire] = useState("");

  const upload = async (file: File) => {
    setLoading(true);
    try {
      const fileDataUrl = await fileToDataUrl(file);
      const { data: res, error } = await supabase.functions.invoke("vae-extract-cv", { body: { fileDataUrl, fileName: file.name } });
      if (error) throw error;
      if (res?.error) throw new Error(res.error);
      onChange({ ...data, ...res });
      toast.success("CV extrait avec succès");
    } catch (e: any) {
      toast.error("Extraction impossible : " + (e.message || "erreur"));
    } finally {
      setLoading(false);
    }
  };

  const genererCV = async () => {
    if (!questionnaire.trim()) { toast.error("Décrivez votre parcours"); return; }
    setLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("vae-generate-cv", { body: { questionnaire, certification } });
      if (error) throw error;
      if (res?.error) throw new Error(res.error);
      onChange({ ...data, ...res.candidat });
      if (res.cvHtml) await downloadCVWord(res.cvHtml, `CV_${res.candidat.prenom}_${res.candidat.nom}`);
      toast.success("CV généré et téléchargé");
      setGenOpen(false);
    } catch (e: any) {
      toast.error("Génération impossible : " + (e.message || "erreur"));
    } finally {
      setLoading(false);
    }
  };

  const addExp = () => onChange({ ...data, experiences: [...data.experiences, { poste: "", entreprise: "", dateDebut: "", dateFin: "", missions: "" }] });
  const removeExp = (i: number) => onChange({ ...data, experiences: data.experiences.filter((_, k) => k !== i) });
  const updateExp = (i: number, key: string, v: string) => onChange({ ...data, experiences: data.experiences.map((e, k) => k === i ? { ...e, [key]: v } : e) });

  const addDip = () => onChange({ ...data, diplomes: [...data.diplomes, { intitule: "", etablissement: "", annee: "" }] });
  const removeDip = (i: number) => onChange({ ...data, diplomes: data.diplomes.filter((_, k) => k !== i) });
  const updateDip = (i: number, key: string, v: string) => onChange({ ...data, diplomes: data.diplomes.map((e, k) => k === i ? { ...e, [key]: v } : e) });

  const formationVae: FormationInfo = {
    intitule: certification.intitule || "Certification visée par la VAE",
    objectifs: certification.blocs.map((bloc) => bloc.intitule).join(" ; "),
    prerequis: "Expérience professionnelle en rapport avec la certification visée",
    duree: "", modalites: "VAE", tarif: "", programme: certification.blocs.map((bloc) => bloc.intitule).join("\n"),
    methodesEvaluation: "Validation des acquis de l'expérience", moyensPedagogiques: "Accompagnement VAE",
    publicVise: "Candidat disposant d'une expérience en rapport avec la certification", delaiAcces: "",
    dateDebut: "", dateFin: "", lieu: "", nombreParticipants: "1", formateur: "", codeRNCP: certification.rncp,
  };
  const candidatAsStagiaire: StagiaireInfo[] = data.prenom || data.nom ? [{
    civilite: data.civilite, prenom: data.prenom, nom: data.nom, email: data.email, telephone: data.telephone,
    entreprise: data.employeur, poste: data.emploiActuel, dateNaissance: data.dateNaissance,
    adresse: data.adresse, codePostal: data.codePostal, commune: data.ville, fictif: data.fictif,
  }] : [];
  const applyFakeCandidate = (generated: StagiaireInfo[]) => {
    const person = generated[0];
    if (!person) { onChange({ ...data, fictif: false }); return; }
    const job = person.poste || certification.intitule || "Professionnel du secteur";
    onChange({
      ...data,
      civilite: person.civilite, prenom: person.prenom, nom: person.nom, dateNaissance: person.dateNaissance,
      adresse: person.adresse || "", codePostal: person.codePostal || "", ville: person.commune || "",
      telephone: person.telephone, email: person.email, emploiActuel: job, employeur: person.entreprise,
      statut: person.entreprise ? "Salarié" : "Demandeur d'emploi", fictif: true,
      experiences: [{
        poste: job, entreprise: person.entreprise || "Entreprise du secteur", dateDebut: "2019", dateFin: "Aujourd'hui",
        missions: certification.blocs.length ? certification.blocs.map((bloc) => bloc.intitule).join(" ; ") : `Activités professionnelles en lien avec ${certification.intitule || "la certification visée"}`,
      }],
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">Candidat et CV {data.fictif && <Badge variant="secondary">Fictif</Badge>}</h2>

      <FakeStagiairesToolbar value={candidatAsStagiaire} onChange={applyFakeCandidate} formation={formationVae} compact />

      <div className="flex flex-wrap gap-3 p-4 border rounded-lg bg-secondary/30">
        <label className="cursor-pointer">
          <input type="file" accept=".pdf,.doc,.docx,image/*" className="hidden" onChange={e => e.target.files?.[0] && upload(e.target.files[0])} />
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            Uploader le CV (PDF, Word, image)
          </span>
        </label>
        <Button variant="outline" onClick={() => setGenOpen(!genOpen)} className="gap-2">
          <Sparkles className="w-4 h-4" /> Je n'ai pas de CV — le générer par IA
        </Button>
      </div>

      {genOpen && (
        <div className="p-4 border rounded-lg space-y-3">
          <Label>Décrivez votre parcours (identité, coordonnées, postes avec dates et entreprises, formations, compétences clés)</Label>
          <Textarea rows={6} value={questionnaire} onChange={e => setQuestionnaire(e.target.value)} placeholder="Ex : Je m'appelle Marie Dupont, née le 12/03/1985, j'habite Lyon…" />
          <Button onClick={genererCV} disabled={loading} className="gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Générer le CV
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div><Label>Civilité</Label>
          <select className="w-full h-10 border rounded px-3" value={data.civilite} onChange={e => onChange({ ...data, civilite: e.target.value as any })}>
            <option value="">—</option><option value="M.">M.</option><option value="Mme">Mme</option>
          </select>
        </div>
        <div><Label>Prénom</Label><Input value={data.prenom} onChange={e => onChange({ ...data, prenom: e.target.value })} /></div>
        <div><Label>Nom</Label><Input value={data.nom} onChange={e => onChange({ ...data, nom: e.target.value })} /></div>
        <div><Label>Date de naissance</Label><Input type="date" value={data.dateNaissance} onChange={e => onChange({ ...data, dateNaissance: e.target.value })} /></div>
        <div><Label>Lieu de naissance</Label><Input value={data.lieuNaissance || ""} onChange={e => onChange({ ...data, lieuNaissance: e.target.value })} /></div>
        <div><Label>Téléphone</Label><Input value={data.telephone} onChange={e => onChange({ ...data, telephone: e.target.value })} /></div>
        <div className="md:col-span-2"><Label>Adresse</Label><Input value={data.adresse} onChange={e => onChange({ ...data, adresse: e.target.value })} /></div>
        <div><Label>Code postal</Label><Input value={data.codePostal} onChange={e => onChange({ ...data, codePostal: e.target.value })} /></div>
        <div><Label>Ville</Label><Input value={data.ville} onChange={e => onChange({ ...data, ville: e.target.value })} /></div>
        <div className="md:col-span-2"><Label>Email</Label><Input value={data.email} onChange={e => onChange({ ...data, email: e.target.value })} /></div>
        <div><Label>Statut</Label>
          <select className="w-full h-10 border rounded px-3" value={data.statut} onChange={e => onChange({ ...data, statut: e.target.value as any })}>
            <option value="">—</option><option value="Salarié">Salarié</option><option value="Demandeur d'emploi">Demandeur d'emploi</option><option value="Autre">Autre</option>
          </select>
        </div>
        <div><Label>Emploi actuel</Label><Input value={data.emploiActuel} onChange={e => onChange({ ...data, emploiActuel: e.target.value })} /></div>
        <div><Label>Employeur</Label><Input value={data.employeur} onChange={e => onChange({ ...data, employeur: e.target.value })} /></div>
        <div className="md:col-span-3"><Label>Niveau de formation initiale</Label><Input value={data.niveauFormation} onChange={e => onChange({ ...data, niveauFormation: e.target.value })} /></div>
      </div>

      <div className="pt-2">
        <div className="border rounded p-3 space-y-2 md:max-w-md">
          <Label>Signature du candidat (image PNG/JPG)</Label>
          <input type="file" accept="image/*" onChange={async e => { const f = e.target.files?.[0]; if (f) onChange({ ...data, signature: await fileToDataUrl(f) }); }} />
          {data.signature && <div className="flex items-center gap-2"><img src={data.signature} alt="signature" className="max-h-16 border rounded bg-white p-1" /><Button size="sm" variant="ghost" onClick={() => onChange({ ...data, signature: "" })}>Retirer</Button></div>}
        </div>
      </div>


      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Diplômes</h3>
          <Button size="sm" variant="outline" onClick={addDip} className="gap-1"><Plus className="w-3 h-3" /> Ajouter</Button>
        </div>
        {data.diplomes.map((d, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-7 gap-2 mb-2">
            <Input className="md:col-span-3" placeholder="Intitulé" value={d.intitule} onChange={e => updateDip(i, "intitule", e.target.value)} />
            <Input className="md:col-span-2" placeholder="Établissement" value={d.etablissement} onChange={e => updateDip(i, "etablissement", e.target.value)} />
            <Input placeholder="Année" value={d.annee} onChange={e => updateDip(i, "annee", e.target.value)} />
            <Button size="icon" variant="ghost" onClick={() => removeDip(i)}><Trash2 className="w-4 h-4" /></Button>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Expériences professionnelles</h3>
          <Button size="sm" variant="outline" onClick={addExp} className="gap-1"><Plus className="w-3 h-3" /> Ajouter</Button>
        </div>
        {data.experiences.map((x, i) => (
          <div key={i} className="border rounded p-3 mb-2 space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <Input placeholder="Poste" value={x.poste} onChange={e => updateExp(i, "poste", e.target.value)} />
              <Input placeholder="Entreprise" value={x.entreprise} onChange={e => updateExp(i, "entreprise", e.target.value)} />
              <Input placeholder="Début" value={x.dateDebut} onChange={e => updateExp(i, "dateDebut", e.target.value)} />
              <div className="flex gap-2">
                <Input placeholder="Fin" value={x.dateFin} onChange={e => updateExp(i, "dateFin", e.target.value)} />
                <Button size="icon" variant="ghost" onClick={() => removeExp(i)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
            <Textarea rows={3} placeholder="Missions" value={x.missions} onChange={e => updateExp(i, "missions", e.target.value)} />
          </div>
        ))}
      </div>
    </div>
  );
}
