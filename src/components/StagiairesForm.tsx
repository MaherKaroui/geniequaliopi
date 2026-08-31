import { useRef, useState } from "react";
import { StagiaireInfo } from "@/types/qualiopi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, PenTool, Sparkles, FileUp, Loader2 } from "lucide-react";
import SignaturePad from "@/components/SignaturePad";
import { generateFakeStagiairesIDF } from "@/lib/fakeStagiaireIDF";
import { REGIONS, RegionKey } from "@/lib/fakeStagiaireRegions";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { extractConvocationFromDocx, convocationToStagiaire } from "@/lib/convocationExtractor";
import {
  extractMultipleStagiairesFromFile,
  extractionToStagiaire,
  mergeExtractions,
  type StagiaireExtraction,
} from "@/lib/stagiaireFileExtractor";



const FORMATEURS_PREDIFINIS = [
  "AHMED EL HILALI",
  "CHRISTIAN PEREZ",
  "DA COSTA DAVID",
  "HAMADI SOULEIMANI",
  "LOUIS PELEGRY",
  "PHILIPPE DYLAN",
  "SALAM ABDELLAH",
  "Thierry VANDENABEELE",
  "RENUKA CALISSTUS SURESH",
];

interface StagiairesFormProps {
  data: StagiaireInfo[];
  onChange: (data: StagiaireInfo[]) => void;
}

const emptyStagiaire: StagiaireInfo = {
  civilite: "", nom: "", prenom: "", email: "", telephone: "", entreprise: "", responsableEntreprise: "", signatureResponsableUrl: "", poste: "", dateNaissance: "", dateDebutFormation: "", dateFinFormation: "", tarifFormation: "", signatureUrl: "",
  adresse: "", codePostal: "", commune: "", nationalite: "", nir: "", departementNaissance: "", communeNaissance: "", diplome: "", rqth: "", formateur: "", formateurSignatureUrl: "", adresseEntreprise: "", siretEntreprise: "",
};

const StagiairesForm = ({ data, onChange }: StagiairesFormProps) => {
  const sigRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const sigRespRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const sigFormateurRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const cerfaInputRef = useRef<HTMLInputElement | null>(null);
  const convocInputRef = useRef<HTMLInputElement | null>(null);
  // Track which signature pad is open: "sig-0", "resp-1", "formateur-2", etc.
  const [drawingPad, setDrawingPad] = useState<string | null>(null);
  const [fakeCount, setFakeCount] = useState<number>(5);
  const [fakeRegion, setFakeRegion] = useState<RegionKey | "all">("ile-de-france");
  const [importingCerfa, setImportingCerfa] = useState(false);
  const [importingConvoc, setImportingConvoc] = useState(false);
  const addStagiaire = () => onChange([...data, { ...emptyStagiaire }]);
  const generateFakes = (replace: boolean) => {
    const n = Math.max(1, Math.min(100, Math.floor(fakeCount) || 1));
    const fakes = generateFakeStagiairesIDF({ count: n, region: fakeRegion });
    onChange(replace ? fakes : [...data, ...fakes]);
    const regionLabel = fakeRegion === "all" ? "France entière" : REGIONS[fakeRegion].label;
    toast.success(`${n} stagiaire(s) fictif(s) généré(s) – ${regionLabel}`);
  };
  const removeStagiaire = (index: number) => onChange(data.filter((_, i) => i !== index));
  const updateStagiaire = (index: number, field: keyof StagiaireInfo, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  const handleSigFile = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => updateStagiaire(index, 'signatureUrl', reader.result as string);
    reader.readAsDataURL(file);
  };
  const handleSigRespFile = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => updateStagiaire(index, 'signatureResponsableUrl', reader.result as string);
    reader.readAsDataURL(file);
  };
  const handleSigFormateurFile = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => updateStagiaire(index, 'formateurSignatureUrl', reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCerfaImport = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setImportingCerfa(true);
    const newStagiaires: StagiaireInfo[] = [];
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const file of Array.from(files)) {
        try {
          const dataUrl: string = await new Promise((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(r.result as string);
            r.onerror = reject;
            r.readAsDataURL(file);
          });

          const { data: extracted, error } = await supabase.functions.invoke("extract-cerfa", {
            body: { fileDataUrl: dataUrl },
          });

          if (error || !extracted || extracted.error) {
            console.error("CERFA extraction error:", error || extracted?.error);
            errorCount++;
            continue;
          }

          newStagiaires.push({
            ...emptyStagiaire,
            ...extracted,
            nom: String(extracted.nom || "").toUpperCase(),
            prenom: String(extracted.prenom || "").charAt(0).toUpperCase() + String(extracted.prenom || "").slice(1).toLowerCase(),
          });
          successCount++;
        } catch (e) {
          console.error("Erreur fichier CERFA:", e);
          errorCount++;
        }
      }

      if (newStagiaires.length > 0) {
        onChange([...data, ...newStagiaires]);
      }
      if (successCount > 0) toast.success(`${successCount} CERFA importé(s) avec succès`);
      if (errorCount > 0) toast.error(`${errorCount} CERFA n'ont pas pu être lus`);
    } finally {
      setImportingCerfa(false);
      if (cerfaInputRef.current) cerfaInputRef.current.value = "";
    }
  };

  const handleConvocImport = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setImportingConvoc(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      // 1) Extraire chaque fichier (peut retourner plusieurs stagiaires + entreprise)
      const perFile: { file: File; ex: StagiaireExtraction; entreprise?: string }[] = [];
      for (const file of Array.from(files)) {
        try {
          const multi = await extractMultipleStagiairesFromFile(file);
          if (multi.stagiaires.length === 0) {
            errorCount++;
            continue;
          }
          multi.stagiaires.forEach((ex) => {
            if (multi.entreprise && !ex.entreprise) ex.entreprise = multi.entreprise;
            perFile.push({ file, ex, entreprise: multi.entreprise });
          });
        } catch (e) {
          console.error("Erreur lecture fichier:", file.name, e);
          errorCount++;
        }
      }

      // 2) Regrouper par stagiaire (clé = nom + prénom normalisés)
      const groups = new Map<string, StagiaireExtraction[]>();
      const orphelins: StagiaireExtraction[] = [];
      perFile.forEach(({ ex }) => {
        const key = `${(ex.nom || "").toUpperCase()}|${(ex.prenom || "").toUpperCase()}`.trim();
        if (key === "|" || (!ex.nom && !ex.prenom)) {
          orphelins.push(ex);
          return;
        }
        const arr = groups.get(key) ?? [];
        arr.push(ex);
        groups.set(key, arr);
      });

      // 3) Fusionner et créer les stagiaires
      const newStagiaires: StagiaireInfo[] = [];
      groups.forEach((arr) => {
        const merged = mergeExtractions(arr);
        if (merged.nom || merged.prenom) {
          newStagiaires.push(extractionToStagiaire(merged, { ...emptyStagiaire }));
          successCount++;
        } else {
          errorCount++;
        }
      });

      if (newStagiaires.length > 0) onChange([...data, ...newStagiaires]);
      if (orphelins.length > 0) {
        toast.warning(`${orphelins.length} fichier(s) sans identité détectée — ignoré(s)`);
      }
      if (successCount > 0)
        toast.success(`${successCount} stagiaire(s) importé(s) depuis ${Array.from(files).length} fichier(s)`);
      if (errorCount > 0 && successCount === 0)
        toast.error(`${errorCount} fichier(s) illisible(s)`);
    } finally {
      setImportingConvoc(false);
      if (convocInputRef.current) convocInputRef.current.value = "";
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold">Stagiaires</h2>
          <p className="text-sm text-muted-foreground">{data.length} stagiaire(s) ajouté(s)</p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <div className="flex flex-col">
            <Label className="text-xs">Région</Label>
            <select
              className="flex h-9 rounded-md border border-input bg-background px-2 text-sm"
              value={fakeRegion}
              onChange={e => setFakeRegion(e.target.value as RegionKey | "all")}
            >
              <option value="all">France entière</option>
              {Object.entries(REGIONS).map(([key, r]) => (
                <option key={key} value={key}>{r.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <Label className="text-xs">Nb fictifs</Label>
            <Input
              type="number" min={1} max={100}
              value={fakeCount}
              onChange={e => setFakeCount(parseInt(e.target.value) || 1)}
              className="h-9 w-20"
            />
          </div>
          <Button onClick={() => generateFakes(false)} size="sm" variant="outline" className="gap-1 h-9">
            <Sparkles className="w-4 h-4" /> Générer (ajouter)
          </Button>
          <Button onClick={() => generateFakes(true)} size="sm" variant="outline" className="gap-1 h-9">
            <Sparkles className="w-4 h-4" /> Générer (remplacer)
          </Button>
          <input
            ref={cerfaInputRef}
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={(e) => handleCerfaImport(e.target.files)}
          />
          <Button
            onClick={() => cerfaInputRef.current?.click()}
            size="sm"
            variant="outline"
            disabled={importingCerfa}
            className="gap-1 h-9"
          >
            {importingCerfa ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4" />}
            {importingCerfa ? "Extraction..." : "Importer CERFA"}
          </Button>
          <input
            ref={convocInputRef}
            type="file"
            accept=".docx,.pdf,.xlsx,.xls,.csv,.txt,.html,.htm,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            multiple
            className="hidden"
            onChange={(e) => handleConvocImport(e.target.files)}
          />
          <Button
            onClick={() => convocInputRef.current?.click()}
            size="sm"
            variant="outline"
            disabled={importingConvoc}
            className="gap-1 h-9"
            title="Importer n'importe quel fichier contenant des infos stagiaire (convocation, contrat, devis, attestation, CERFA, Excel…)"
          >
            {importingConvoc ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4" />}
            {importingConvoc ? "Extraction..." : "Importer fichiers stagiaire"}
          </Button>
          <Button onClick={addStagiaire} size="sm" className="h-9">
            + Ajouter
          </Button>
        </div>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 bg-secondary/50 rounded-xl border border-dashed border-border">
          <p className="text-muted-foreground">Aucun stagiaire ajouté</p>
          <Button onClick={addStagiaire} variant="outline" size="sm" className="mt-3">
            + Ajouter un stagiaire
          </Button>
        </div>
      )}

      {data.map((stagiaire, index) => (
        <div key={index} className="p-4 bg-card rounded-xl border shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">Stagiaire {index + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => removeStagiaire(index)} className="text-destructive hover:text-destructive text-xs">
              Supprimer
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <Label>Civilité</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={stagiaire.civilite}
                onChange={e => updateStagiaire(index, 'civilite', e.target.value)}
              >
                <option value="">—</option>
                <option value="M.">M.</option>
                <option value="Mme">Mme</option>
              </select>
            </div>
            <div>
              <Label>Nom *</Label>
              <Input value={stagiaire.nom} onChange={e => updateStagiaire(index, 'nom', e.target.value)} placeholder="Nom" />
            </div>
            <div>
              <Label>Prénom *</Label>
              <Input value={stagiaire.prenom} onChange={e => updateStagiaire(index, 'prenom', e.target.value)} placeholder="Prénom" />
            </div>
            <div>
              <Label>Date de naissance</Label>
              <Input type="date" value={stagiaire.dateNaissance} onChange={e => updateStagiaire(index, 'dateNaissance', e.target.value)} />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={stagiaire.email} onChange={e => updateStagiaire(index, 'email', e.target.value)} placeholder="email@exemple.fr" />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input value={stagiaire.telephone} onChange={e => updateStagiaire(index, 'telephone', e.target.value)} placeholder="06..." />
            </div>
            <div>
              <Label>Nationalité</Label>
              <Input value={stagiaire.nationalite || ""} onChange={e => updateStagiaire(index, 'nationalite', e.target.value)} placeholder="Française" />
            </div>
            <div>
              <Label>NIR (n° sécu)</Label>
              <Input value={stagiaire.nir || ""} onChange={e => updateStagiaire(index, 'nir', e.target.value)} placeholder="1 XX XX XX XXX XXX XX" />
            </div>
            <div className="md:col-span-2">
              <Label>Adresse</Label>
              <Input value={stagiaire.adresse || ""} onChange={e => updateStagiaire(index, 'adresse', e.target.value)} placeholder="12 rue de la Paix" />
            </div>
            <div>
              <Label>Code postal</Label>
              <Input value={stagiaire.codePostal || ""} onChange={e => updateStagiaire(index, 'codePostal', e.target.value)} placeholder="75001" />
            </div>
            <div>
              <Label>Commune</Label>
              <Input value={stagiaire.commune || ""} onChange={e => updateStagiaire(index, 'commune', e.target.value)} placeholder="Paris" />
            </div>
            <div>
              <Label>Département de naissance</Label>
              <Input value={stagiaire.departementNaissance || ""} onChange={e => updateStagiaire(index, 'departementNaissance', e.target.value)} placeholder="75" />
            </div>
            <div>
              <Label>Commune de naissance</Label>
              <Input value={stagiaire.communeNaissance || ""} onChange={e => updateStagiaire(index, 'communeNaissance', e.target.value)} placeholder="Paris" />
            </div>
            <div>
              <Label>Diplôme le plus élevé</Label>
              <Input value={stagiaire.diplome || ""} onChange={e => updateStagiaire(index, 'diplome', e.target.value)} placeholder="Baccalauréat, BTS..." />
            </div>
            <div>
              <Label>RQTH</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={stagiaire.rqth || ""}
                onChange={e => updateStagiaire(index, 'rqth', e.target.value)}
              >
                <option value="">—</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>
            <div>
              <Label>Entreprise</Label>
              <Input value={stagiaire.entreprise} onChange={e => updateStagiaire(index, 'entreprise', e.target.value)} placeholder="Entreprise" />
            </div>
            <div>
              <Label>Adresse entreprise</Label>
              <Input value={stagiaire.adresseEntreprise || ""} onChange={e => updateStagiaire(index, 'adresseEntreprise', e.target.value)} placeholder="Adresse de l'entreprise" />
            </div>
            <div>
              <Label>SIRET entreprise</Label>
              <Input value={stagiaire.siretEntreprise || ""} onChange={e => updateStagiaire(index, 'siretEntreprise', e.target.value)} placeholder="SIRET de l'entreprise" />
            </div>
            <div>
              <Label>Responsable entreprise</Label>
              <Input value={stagiaire.responsableEntreprise || ""} onChange={e => updateStagiaire(index, 'responsableEntreprise', e.target.value)} placeholder="Nom du responsable" />
            </div>
            <div>
              <Label>Maître d'apprentissage — Nom</Label>
              <Input value={stagiaire.maitreNom || ""} onChange={e => updateStagiaire(index, 'maitreNom', e.target.value)} placeholder="Nom du maître d'apprentissage" />
            </div>
            <div>
              <Label>Maître d'apprentissage — Prénom</Label>
              <Input value={stagiaire.maitrePrenom || ""} onChange={e => updateStagiaire(index, 'maitrePrenom', e.target.value)} placeholder="Prénom du maître d'apprentissage" />
            </div>
            <div>
              <Label>Maître d'apprentissage — Diplôme</Label>
              <Input value={stagiaire.maitreDiplome || ""} onChange={e => updateStagiaire(index, 'maitreDiplome', e.target.value)} placeholder="Intitulé du diplôme" />
            </div>
            <div>
              <Label>Maître d'apprentissage — Niveau de diplôme</Label>
              <Input value={stagiaire.maitreNiveauDiplome || ""} onChange={e => updateStagiaire(index, 'maitreNiveauDiplome', e.target.value)} placeholder="Ex : Niveau 5" />
            </div>
            <div>
              <Label>Date de conclusion du contrat</Label>
              <Input
                type="date"
                value={stagiaire.dateConclusionContrat || new Date().toISOString().slice(0, 10)}
                onChange={e => updateStagiaire(index, 'dateConclusionContrat', e.target.value)}
              />
            </div>
            <div>
              <Label>Date de naissance responsable</Label>
              <Input type="date" value={stagiaire.dateNaissanceResponsableEntreprise || ""} onChange={e => updateStagiaire(index, 'dateNaissanceResponsableEntreprise', e.target.value)} />
            </div>
            <div>
              <Label>Email responsable entreprise</Label>
              <Input type="email" value={stagiaire.emailResponsableEntreprise || ""} onChange={e => updateStagiaire(index, 'emailResponsableEntreprise', e.target.value)} placeholder="Email du responsable" />
            </div>
            <div>
              <Label>Poste</Label>
              <Input value={stagiaire.poste} onChange={e => updateStagiaire(index, 'poste', e.target.value)} placeholder="Poste occupé" />
            </div>
            <div>
              <Label>Date début formation</Label>
              <Input type="date" value={stagiaire.dateDebutFormation} onChange={e => updateStagiaire(index, 'dateDebutFormation', e.target.value)} />
            </div>
            <div>
              <Label>Date fin formation</Label>
              <Input type="date" value={stagiaire.dateFinFormation} onChange={e => updateStagiaire(index, 'dateFinFormation', e.target.value)} />
            </div>
            <div>
              <Label>Tarif formation (€)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={stagiaire.tarifFormation || ""}
                onChange={e => updateStagiaire(index, 'tarifFormation', e.target.value)}
                placeholder="Ex : 2500 (prioritaire sur le tarif global)"
              />
            </div>
          </div>
          {/* Signature stagiaire */}
          <div className="space-y-2 mt-2 pt-2 border-t border-border/50">
            <div className="flex items-center gap-3">
              <Label className="text-xs font-semibold">Signature stagiaire</Label>
              {stagiaire.signatureUrl ? (
                <div className="relative group">
                  <img src={stagiaire.signatureUrl} alt="Signature" className="h-10 w-auto max-w-[120px] object-contain rounded border bg-white p-0.5" />
                  <button
                    onClick={() => updateStagiaire(index, 'signatureUrl', '')}
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">Aucune</span>
              )}
              <input
                ref={el => { sigRefs.current[index] = el; }}
                type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleSigFile(index, f); }}
              />
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => sigRefs.current[index]?.click()}>
                {stagiaire.signatureUrl ? "Changer" : "Charger"}
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => setDrawingPad(drawingPad === `sig-${index}` ? null : `sig-${index}`)}>
                <PenTool className="w-3 h-3" /> Dessiner
              </Button>
            </div>
            {drawingPad === `sig-${index}` && (
              <SignaturePad
                label="✍️ Signature stagiaire"
                onSave={(dataUrl) => { updateStagiaire(index, 'signatureUrl', dataUrl); setDrawingPad(null); }}
                onCancel={() => setDrawingPad(null)}
              />
            )}
          </div>
          {/* Signature responsable entreprise */}
          <div className="space-y-2 mt-2 pt-2 border-t border-border/50">
            <div className="flex items-center gap-3">
              <Label className="text-xs font-semibold">Signature resp. entreprise</Label>
              {stagiaire.signatureResponsableUrl ? (
                <div className="relative group">
                  <img src={stagiaire.signatureResponsableUrl} alt="Signature responsable" className="h-10 w-auto max-w-[120px] object-contain rounded border bg-white p-0.5" />
                  <button
                    onClick={() => updateStagiaire(index, 'signatureResponsableUrl', '')}
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">Aucune</span>
              )}
              <input
                ref={el => { sigRespRefs.current[index] = el; }}
                type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleSigRespFile(index, f); }}
              />
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => sigRespRefs.current[index]?.click()}>
                {stagiaire.signatureResponsableUrl ? "Changer" : "Charger"}
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => setDrawingPad(drawingPad === `resp-${index}` ? null : `resp-${index}`)}>
                <PenTool className="w-3 h-3" /> Dessiner
              </Button>
            </div>
            {drawingPad === `resp-${index}` && (
              <SignaturePad
                label="✍️ Signature responsable entreprise"
                onSave={(dataUrl) => { updateStagiaire(index, 'signatureResponsableUrl', dataUrl); setDrawingPad(null); }}
                onCancel={() => setDrawingPad(null)}
              />
            )}
          </div>
          {/* Signature formateur */}
          <div className="space-y-2 mt-2 pt-2 border-t border-border/50">
            <div className="flex items-center gap-3">
              <Label className="text-xs font-semibold">Signature formateur</Label>
              {stagiaire.formateurSignatureUrl ? (
                <div className="relative group">
                  <img src={stagiaire.formateurSignatureUrl} alt="Signature formateur" className="h-10 w-auto max-w-[120px] object-contain rounded border bg-white p-0.5" />
                  <button
                    onClick={() => updateStagiaire(index, 'formateurSignatureUrl', '')}
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">Aucune</span>
              )}
              <input
                ref={el => { sigFormateurRefs.current[index] = el; }}
                type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleSigFormateurFile(index, f); }}
              />
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => sigFormateurRefs.current[index]?.click()}>
                {stagiaire.formateurSignatureUrl ? "Changer" : "Charger"}
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => setDrawingPad(drawingPad === `formateur-${index}` ? null : `formateur-${index}`)}>
                <PenTool className="w-3 h-3" /> Dessiner
              </Button>
            </div>
            {drawingPad === `formateur-${index}` && (
              <SignaturePad
                label="✍️ Signature formateur"
                onSave={(dataUrl) => { updateStagiaire(index, 'formateurSignatureUrl', dataUrl); setDrawingPad(null); }}
                onCancel={() => setDrawingPad(null)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StagiairesForm;
