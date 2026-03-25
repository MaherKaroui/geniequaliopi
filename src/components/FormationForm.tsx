import { useRef, useState } from "react";
import { FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SAMPLE_FORMATIONS } from "@/lib/sampleData";
import { parseEdofXlsx, EdofSession } from "@/lib/edofParser";
import { RNCP_FICHES } from "@/lib/rncpData";
import { toast } from "sonner";

interface FormationFormProps {
  data: FormationInfo;
  onChange: (data: FormationInfo) => void;
  onImportStagiaires?: (stagiaires: StagiaireInfo[]) => void;
}

const FormationForm = ({ data, onChange, onImportStagiaires }: FormationFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formateurSigRef = useRef<HTMLInputElement>(null);
  const [importedSessions, setImportedSessions] = useState<EdofSession[]>([]);
  const [importing, setImporting] = useState(false);

  const handleFormateurSigFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange({ ...data, formateurSignatureUrl: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const update = (field: keyof FormationInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleSelectFormation = (index: string) => {
    const selected = SAMPLE_FORMATIONS[parseInt(index)];
    if (selected) {
      onChange({ ...selected });
    }
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImporting(true);
    try {
      const buffer = await file.arrayBuffer();
      const sessions = parseEdofXlsx(buffer);
      
      if (sessions.length === 0) {
        toast.error("Aucune formation trouvée dans le fichier");
        return;
      }

      setImportedSessions(sessions);

      if (sessions.length === 1) {
        applySession(sessions[0]);
      } else {
        toast.success(`${sessions.length} formations trouvées – sélectionnez celle à importer`);
      }
    } catch (err) {
      console.error("Import error:", err);
      toast.error("Erreur lors de la lecture du fichier XLSX");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const applySession = (session: EdofSession) => {
    onChange(session.formation);
    if (onImportStagiaires) {
      onImportStagiaires(session.stagiaires);
    }
    toast.success(
      `✅ Formation importée : ${session.formation.intitule.slice(0, 50)}... avec ${session.stagiaires.length} stagiaires`
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Informations de la formation</h2>
        <p className="text-sm text-muted-foreground">Choisissez une formation exemple, importez un fichier EDOF ou remplissez manuellement</p>
      </div>

      {/* EDOF Import */}
      <div className="p-4 bg-accent/30 border-2 border-accent rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-semibold text-primary">Importer un fichier EDOF</Label>
            <p className="text-xs text-muted-foreground">Import automatique des stagiaires, dates, tarifs depuis votre export EDOF (.xlsx)</p>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleFileImport}
            />
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => fileInputRef.current?.click()}
              disabled={importing}
            >
              <Upload className="w-4 h-4" />
              {importing ? "Import en cours..." : "Charger un fichier XLSX"}
            </Button>
          </div>
        </div>

        {/* Session selector when multiple formations found */}
        {importedSessions.length > 1 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-primary">{importedSessions.length} formations trouvées :</p>
            {importedSessions.map((session, i) => (
              <button
                key={i}
                onClick={() => applySession(session)}
                className="w-full text-left p-3 rounded-lg border bg-card hover:bg-primary/5 hover:border-primary/40 transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="font-medium text-sm">{session.formation.intitule}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({session.stagiaires.length} stagiaires • {session.formation.dateDebut} → {session.formation.dateFin} • {session.formation.tarif})
                  </span>
                </div>
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold">✓</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Formation selector dropdown */}
      <div className="p-4 bg-primary/5 border-2 border-primary/20 rounded-xl">
        <Label htmlFor="formation-select" className="font-semibold text-primary">Choisir une formation exemple</Label>
        <p className="text-xs text-muted-foreground mb-2">Tous les documents du dossier seront générés uniquement pour cette formation.</p>
        <Select onValueChange={handleSelectFormation}>
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Sélectionner une formation..." />
          </SelectTrigger>
          <SelectContent>
            {SAMPLE_FORMATIONS.map((f, i) => (
              <SelectItem key={i} value={String(i)}>{f.intitule}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* RNCP Code Selector */}
      <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl">
        <Label className="font-semibold text-orange-700 dark:text-orange-400">Code RNCP (certification)</Label>
        <p className="text-xs text-muted-foreground mb-2">Sélectionnez un titre RNCP pour générer automatiquement la Fiche Titre RNCP, la Matière et le Tableau croisé.</p>
        <div className="flex gap-2">
          <Select
            value={data.codeRNCP || ""}
            onValueChange={(val) => {
              if (val === "__custom__") return;
              update("codeRNCP", val);
              const fiche = RNCP_FICHES.find(f => f.code === val);
              if (fiche) {
                toast.success(`Fiche RNCP ${fiche.code} – ${fiche.intitule} sélectionnée`);
              }
            }}
          >
            <SelectTrigger className="bg-card flex-1">
              <SelectValue placeholder="Choisir un titre RNCP..." />
            </SelectTrigger>
            <SelectContent>
              {RNCP_FICHES.map((f) => (
                <SelectItem key={f.code} value={f.code}>
                  {f.code} – {f.intitule}
                </SelectItem>
              ))}
              <SelectItem value="__custom__" disabled className="text-muted-foreground italic">
                ── ou saisissez un code ci-dessous ──
              </SelectItem>
            </SelectContent>
          </Select>
          <Input
            className="w-40 bg-card"
            placeholder="Ex: RNCP12345"
            value={data.codeRNCP || ""}
            onChange={e => update("codeRNCP", e.target.value.toUpperCase())}
          />
        </div>
        {data.codeRNCP && (
          <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
            Code sélectionné : <strong>{data.codeRNCP}</strong>
            {RNCP_FICHES.find(f => f.code === data.codeRNCP)
              ? ` – ${RNCP_FICHES.find(f => f.code === data.codeRNCP)!.intitule}`
              : " (code personnalisé)"}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="intitule">Intitulé de la formation *</Label>
          <Input id="intitule" value={data.intitule} onChange={e => update('intitule', e.target.value)} placeholder="Ex: Formation Management d'équipe" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="objectifs">Objectifs pédagogiques *</Label>
          <Textarea id="objectifs" value={data.objectifs} onChange={e => update('objectifs', e.target.value)} placeholder="À l'issue de la formation, le stagiaire sera capable de..." rows={3} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="prerequis">Prérequis</Label>
          <Textarea id="prerequis" value={data.prerequis} onChange={e => update('prerequis', e.target.value)} placeholder="Ex: Aucun prérequis ou expérience de 2 ans..." rows={2} />
        </div>
        <div>
          <Label htmlFor="duree">Durée *</Label>
          <Input id="duree" value={data.duree} onChange={e => update('duree', e.target.value)} placeholder="Ex: 14 heures (2 jours)" />
        </div>
        <div>
          <Label htmlFor="modalites">Modalités</Label>
          <Select value={data.modalites} onValueChange={v => update('modalites', v)}>
            <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="presentiel">Présentiel</SelectItem>
              <SelectItem value="distanciel">Distanciel</SelectItem>
              <SelectItem value="mixte">Mixte</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tarif">Tarif</Label>
          <Input id="tarif" value={data.tarif} onChange={e => update('tarif', e.target.value)} placeholder="Ex: 1 200 € HT" />
        </div>
        <div>
          <Label htmlFor="delaiAcces">Délai d'accès</Label>
          <Input id="delaiAcces" value={data.delaiAcces} onChange={e => update('delaiAcces', e.target.value)} placeholder="Ex: 15 jours avant le début" />
        </div>
        <div>
          <Label htmlFor="dateDebut">Date de début</Label>
          <Input id="dateDebut" type="date" value={data.dateDebut} onChange={e => update('dateDebut', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="dateFin">Date de fin</Label>
          <Input id="dateFin" type="date" value={data.dateFin} onChange={e => update('dateFin', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="lieu">Lieu</Label>
          <Input id="lieu" value={data.lieu} onChange={e => update('lieu', e.target.value)} placeholder="Ex: 12 rue de la Formation, Paris" />
        </div>
        <div>
          <Label htmlFor="nombreParticipants">Nombre de participants</Label>
          <Input id="nombreParticipants" value={data.nombreParticipants} onChange={e => update('nombreParticipants', e.target.value)} placeholder="Ex: 8" />
        </div>
        <div>
          <Label htmlFor="formateur">Formateur</Label>
          <Input id="formateur" value={data.formateur} onChange={e => update('formateur', e.target.value)} placeholder="Nom du formateur" />
        </div>
        <div>
          <Label htmlFor="publicVise">Public visé</Label>
          <Input id="publicVise" value={data.publicVise} onChange={e => update('publicVise', e.target.value)} placeholder="Ex: Managers, chefs d'équipe" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="programme">Programme détaillé *</Label>
          <Textarea id="programme" value={data.programme} onChange={e => update('programme', e.target.value)} placeholder="Jour 1 : Introduction au management..." rows={5} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="moyensPedagogiques">Moyens pédagogiques</Label>
          <Textarea id="moyensPedagogiques" value={data.moyensPedagogiques} onChange={e => update('moyensPedagogiques', e.target.value)} placeholder="Ex: Supports de cours, vidéoprojecteur, exercices pratiques..." rows={2} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="rythmeAlternance">Rythme d'alternance (CFA)</Label>
          <Input id="rythmeAlternance" value={data.rythmeAlternance || ''} onChange={e => update('rythmeAlternance', e.target.value)} placeholder="Ex: 1 semaine CFA / 3 semaines entreprise" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="methodesEvaluation">Méthodes d'évaluation</Label>
          <Textarea id="methodesEvaluation" value={data.methodesEvaluation} onChange={e => update('methodesEvaluation', e.target.value)} placeholder="Ex: QCM, mise en situation, étude de cas..." rows={2} />
        </div>
        <div className="md:col-span-2">
          <Label>Signature du formateur</Label>
          <div className="flex items-center gap-4 mt-1">
            {data.formateurSignatureUrl ? (
              <div className="relative">
                <img src={data.formateurSignatureUrl} alt="Signature formateur" className="h-16 border rounded p-1" />
                <button type="button" onClick={() => onChange({ ...data, formateurSignatureUrl: '' })} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
              </div>
            ) : null}
            <Button type="button" variant="outline" size="sm" onClick={() => formateurSigRef.current?.click()}>
              <Upload className="w-4 h-4 mr-1" /> Importer signature
            </Button>
            <input ref={formateurSigRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFormateurSigFile(e.target.files[0]); }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationForm;
