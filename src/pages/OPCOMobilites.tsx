import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Home, Truck, ChevronDown, ChevronRight, Upload, CheckCircle2, Circle,
  XCircle, Download, FileText, Loader2, FolderArchive, Eye,
} from "lucide-react";
import OrganismeForm from "@/components/OrganismeForm";
import FormationForm from "@/components/FormationForm";
import StagiairesForm from "@/components/StagiairesForm";
import {
  OPCO_DOCUMENTS, OPCO_CATEGORIES, type OpcoCategory,
  type OpcoDocumentItem, type OpcoDocState, type OpcoDocStatus,
} from "@/lib/opcoMobilitesCatalog";
import { buildOpcoFileName, buildOpcoZipFolder, buildOpcoRootName, type OpcoNamingContext } from "@/lib/opcoNaming";
import type { OrganismeInfo, FormationInfo, StagiaireInfo, CritereData } from "@/types/qualiopi";
import { CRITERES } from "@/types/qualiopi";
import { generateDocumentById } from "@/lib/documentGenerator";
import { mergeOrganisme, mergeStagiaires } from "@/lib/sampleData";
import { htmlToPdfBlob } from "@/lib/pdfExport";

const emptyOrganisme: OrganismeInfo = {
  nom: "", siret: "", adresse: "", codePostal: "", ville: "", telephone: "", email: "",
  siteWeb: "", nda: "", dirigeant: "", responsablePedagogique: "", referentHandicap: "",
  referentQualite: "", poleAdministratif: "", domainesFormation: "", typesActions: [],
  certifications: "", outilsUtilises: "",
  version: "1", dateMaj: new Date().toISOString().slice(0, 10),
};

const emptyFormation: FormationInfo = {
  intitule: "", objectifs: "", prerequis: "", duree: "", modalites: "", tarif: "",
  programme: "", methodesEvaluation: "", moyensPedagogiques: "", publicVise: "",
  delaiAcces: "", dateDebut: "", dateFin: "", lieu: "", nombreParticipants: "", formateur: "",
  rythmeAlternance: "",
};

const STATUS_CONFIG: Record<OpcoDocStatus, { label: string; icon: any; className: string }> = {
  pending: { label: "À fournir", icon: Circle, className: "text-muted-foreground" },
  auto: { label: "Auto-généré", icon: CheckCircle2, className: "text-primary" },
  uploaded: { label: "Uploadé", icon: CheckCircle2, className: "text-primary" },
  not_applicable: { label: "Non applicable", icon: XCircle, className: "text-muted-foreground" },
};

type Step = "setup" | "documents";

export default function OPCOMobilites() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("setup");

  // Restore from session
  const [organisme, setOrganisme] = useState<OrganismeInfo>(() => {
    try { const s = sessionStorage.getItem("opco_org"); return s ? JSON.parse(s) : emptyOrganisme; } catch { return emptyOrganisme; }
  });
  const [formation, setFormation] = useState<FormationInfo>(() => {
    try { const s = sessionStorage.getItem("opco_form"); return s ? JSON.parse(s) : emptyFormation; } catch { return emptyFormation; }
  });
  const [stagiaires, setStagiaires] = useState<StagiaireInfo[]>(() => {
    try { const s = sessionStorage.getItem("opco_stag"); return s ? JSON.parse(s) : []; } catch { return []; }
  });

  // OPCO specific metadata
  const [refDossier, setRefDossier] = useState<string>(() => sessionStorage.getItem("opco_ref") || "");
  const [anneeControle, setAnneeControle] = useState<string>(
    () => sessionStorage.getItem("opco_annee") || String(new Date().getFullYear())
  );

  // Doc states
  const [docStates, setDocStates] = useState<Map<string, OpcoDocState>>(() => {
    const m = new Map<string, OpcoDocState>();
    OPCO_DOCUMENTS.forEach((d) => {
      const status: OpcoDocStatus = d.manualUpload ? "pending" : d.autoTemplates.length > 0 ? "auto" : "pending";
      m.set(d.code, { code: d.code, status });
    });
    return m;
  });

  const [expandedCats, setExpandedCats] = useState<Set<OpcoCategory>>(
    new Set(Object.keys(OPCO_CATEGORIES) as OpcoCategory[])
  );
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const fileInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  // Persist
  useEffect(() => { sessionStorage.setItem("opco_org", JSON.stringify(organisme)); }, [organisme]);
  useEffect(() => { sessionStorage.setItem("opco_form", JSON.stringify(formation)); }, [formation]);
  useEffect(() => { sessionStorage.setItem("opco_stag", JSON.stringify(stagiaires)); }, [stagiaires]);
  useEffect(() => { sessionStorage.setItem("opco_ref", refDossier); }, [refDossier]);
  useEffect(() => { sessionStorage.setItem("opco_annee", anneeControle); }, [anneeControle]);

  const mergedStagiaires = useMemo(
    () => mergeStagiaires(stagiaires).filter((s): s is StagiaireInfo => Boolean(s)),
    [stagiaires]
  );
  const mergedOrganisme = useMemo(() => mergeOrganisme(organisme), [organisme]);
  const criteres: CritereData[] = useMemo(() => CRITERES, []);

  const namingCtx: OpcoNamingContext = useMemo(() => ({
    anneeControle: anneeControle || new Date().getFullYear(),
    etablissement: organisme.nom,
    refDossier,
    dateMaj: organisme.dateMaj,
  }), [anneeControle, organisme.nom, organisme.dateMaj, refDossier]);

  const stats = useMemo(() => {
    let total = 0, auto = 0, uploaded = 0, pending = 0, na = 0;
    docStates.forEach((s) => {
      total++;
      if (s.status === "auto") auto++;
      else if (s.status === "uploaded") uploaded++;
      else if (s.status === "not_applicable") na++;
      else pending++;
    });
    return { total, auto, uploaded, pending, na, done: auto + uploaded + na };
  }, [docStates]);

  const updateDocState = (code: string, update: Partial<OpcoDocState>) => {
    setDocStates((prev) => {
      const next = new Map(prev);
      const current = next.get(code) || { code, status: "pending" as OpcoDocStatus };
      next.set(code, { ...current, ...update });
      return next;
    });
  };

  const handleFileUpload = (code: string, file: File) => {
    updateDocState(code, { status: "uploaded", uploadedFileName: file.name, uploadedFile: file });
    toast.success(`Document ${code} ajouté : ${file.name}`);
  };

  const toggleNA = (code: string) => {
    const current = docStates.get(code);
    if (!current) return;
    const doc = OPCO_DOCUMENTS.find((d) => d.code === code);
    const canAuto = doc && doc.autoTemplates.length > 0 && !doc.manualUpload;
    if (current.status === "not_applicable") {
      updateDocState(code, { status: canAuto ? "auto" : "pending" });
    } else {
      updateDocState(code, { status: "not_applicable", uploadedFile: undefined, uploadedFileName: undefined });
    }
  };

  const toggleCategory = (cat: OpcoCategory) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const validateSetup = (): boolean => {
    if (!organisme.nom?.trim()) { toast.error("Le nom de l'organisme est requis"); return false; }
    if (!formation.intitule?.trim()) { toast.error("L'intitulé de la formation est requis"); return false; }
    if (mergedStagiaires.length === 0) { toast.error("Au moins un apprenti est requis"); return false; }
    return true;
  };

  const generateAutoBlob = async (doc: OpcoDocumentItem, stagiaireIdx?: number): Promise<Blob | null> => {
    if (doc.autoTemplates.length === 0) return null;
    for (const template of doc.autoTemplates) {
      try {
        const params = stagiaireIdx !== undefined ? { stagiaireIdx, fi: 0 } : { fi: 0 };
        const html = generateDocumentById(`opco_${doc.code}`, template, params, mergedOrganisme, formation, mergedStagiaires);
        if (html) return await htmlToPdfBlob(html);
      } catch (e) {
        console.warn(`Template ${template} failed for ${doc.code}:`, e);
      }
    }
    return null;
  };

  const handleDownloadSingle = async (doc: OpcoDocumentItem) => {
    const state = docStates.get(doc.code);
    if (!state) return;

    if (state.status === "uploaded" && state.uploadedFile) {
      const ext = state.uploadedFileName?.split(".").pop() || "pdf";
      const fileName = buildOpcoFileName(namingCtx, doc.label, ext);
      saveAs(state.uploadedFile, fileName);
      return;
    }

    if (doc.autoTemplates.length === 0) {
      toast.error(`${doc.code} doit être uploadé manuellement`);
      return;
    }

    try {
      if (doc.perStagiaire && mergedStagiaires.length > 0) {
        const zip = new JSZip();
        for (let i = 0; i < mergedStagiaires.length; i++) {
          const blob = await generateAutoBlob(doc, i);
          if (blob) {
            const s = mergedStagiaires[i];
            const suffix = `${s.prenom || ""}_${s.nom || ""}`;
            zip.file(buildOpcoFileName(namingCtx, doc.label, "pdf", suffix), blob);
          }
        }
        const z = await zip.generateAsync({ type: "blob" });
        saveAs(z, `${buildOpcoFileName(namingCtx, doc.label, "zip")}`);
      } else {
        const blob = await generateAutoBlob(doc);
        if (!blob) { toast.error(`Génération impossible pour ${doc.code}`); return; }
        saveAs(blob, buildOpcoFileName(namingCtx, doc.label, "pdf"));
      }
      toast.success(`${doc.label} téléchargé`);
    } catch (e: any) {
      toast.error(`Erreur : ${e.message || "Inconnue"}`);
    }
  };

  const handleExportFullZip = async () => {
    setGenerating(true);
    setProgress(0);
    setProgressText("Préparation du dossier OPCO Mobilités...");

    try {
      const zip = new JSZip();
      const eligible = OPCO_DOCUMENTS.filter((d) => {
        const s = docStates.get(d.code);
        return s && s.status !== "not_applicable";
      });

      let processed = 0;
      const total = eligible.length;

      for (const doc of eligible) {
        const state = docStates.get(doc.code)!;
        const sectionLabel = OPCO_CATEGORIES[doc.category];
        const folder = buildOpcoZipFolder(namingCtx, sectionLabel);

        setProgressText(`${doc.code} — ${doc.label}`);

        // Manual upload OR uploaded file
        if (state.uploadedFile) {
          const ext = state.uploadedFileName?.split(".").pop() || "pdf";
          zip.file(`${folder}/${buildOpcoFileName(namingCtx, doc.label, ext)}`, state.uploadedFile);
        } else if (doc.autoTemplates.length > 0) {
          if (doc.perStagiaire && mergedStagiaires.length > 0) {
            for (let i = 0; i < mergedStagiaires.length; i++) {
              const blob = await generateAutoBlob(doc, i);
              if (blob) {
                const s = mergedStagiaires[i];
                const suffix = `${s.prenom || ""}_${s.nom || ""}`;
                zip.file(`${folder}/${buildOpcoFileName(namingCtx, doc.label, "pdf", suffix)}`, blob);
              }
              await new Promise((r) => setTimeout(r, 50));
            }
          } else {
            const blob = await generateAutoBlob(doc);
            if (blob) zip.file(`${folder}/${buildOpcoFileName(namingCtx, doc.label, "pdf")}`, blob);
          }
        } else {
          // Missing manual doc - add placeholder note
          zip.file(`${folder}/MANQUANT_${doc.code}_${doc.label}.txt`,
            `Document à fournir manuellement : ${doc.longLabel}\n\n${doc.description}`);
        }

        processed++;
        setProgress((processed / total) * 100);
        await new Promise((r) => setTimeout(r, 0));
      }

      setProgressText("Compression du ZIP...");
      const blob = await zip.generateAsync({ type: "blob" }, (meta) => {
        setProgress(meta.percent);
      });

      saveAs(blob, `${buildOpcoRootName(namingCtx)}.zip`);
      toast.success("Dossier OPCO Mobilités exporté !");
    } catch (e: any) {
      toast.error(`Erreur d'export : ${e.message || "Inconnue"}`);
    } finally {
      setGenerating(false);
      setProgress(0);
      setProgressText("");
    }
  };

  // ─────────── SETUP STEP ───────────
  if (step === "setup") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">OPCO Mobilités — Contrôle de service fait</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-1" /> Accueil
            </Button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Référence du contrôle OPCO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ref">Référence dossier OPCO</Label>
                <Input id="ref" value={refDossier} onChange={(e) => setRefDossier(e.target.value)}
                  placeholder="ex : 202604140414_1_49428" />
                <p className="text-xs text-muted-foreground mt-1">Référence figurant sur le courrier OPCO Mobilités.</p>
              </div>
              <div>
                <Label htmlFor="annee">Année du contrôle</Label>
                <Input id="annee" value={anneeControle} onChange={(e) => setAnneeControle(e.target.value)}
                  placeholder={String(new Date().getFullYear())} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <OrganismeForm data={organisme} onChange={setOrganisme} />
          </Card>
          <Card className="p-6">
            <FormationForm data={formation} onChange={setFormation} onImportStagiaires={setStagiaires} />
          </Card>
          <Card className="p-6">
            <StagiairesForm data={stagiaires} onChange={setStagiaires} />
          </Card>

          <div className="flex justify-end gap-2">
            <Button onClick={() => { if (validateSetup()) setStep("documents"); }} size="lg" className="gap-2">
              Accéder à la checklist OPCO <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // ─────────── DOCUMENTS STEP ───────────
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">OPCO Mobilités</span>
            {refDossier && <Badge variant="outline" className="ml-2">Réf. {refDossier}</Badge>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setStep("setup")}>
              Modifier les infos
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-1" /> Accueil
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <Card className="p-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-semibold">{organisme.nom || "Organisme"} — {formation.intitule || "Formation"}</h2>
              <p className="text-sm text-muted-foreground">
                {mergedStagiaires.length} apprenti(s) • {stats.done}/{stats.total} documents prêts
              </p>
            </div>
            <div className="flex gap-2 text-xs">
              <Badge variant="outline" className="gap-1">{stats.auto} auto</Badge>
              <Badge variant="outline" className="gap-1 border-primary/40">{stats.uploaded} uploadés</Badge>
              <Badge variant="outline" className="gap-1">{stats.pending} en attente</Badge>
              {stats.na > 0 && <Badge variant="outline" className="gap-1">{stats.na} N/A</Badge>}
            </div>
          </div>
          <Progress value={(stats.done / stats.total) * 100} className="mt-3" />
        </Card>

        {/* Export bar */}
        <Card className="p-4 flex items-center justify-between flex-wrap gap-3 bg-muted/30">
          <div className="text-sm">
            <p className="font-medium">Export du dossier OPCO complet</p>
            <p className="text-xs text-muted-foreground">
              ZIP organisé en sections A/B/C avec nomenclature stricte OPCO :{" "}
              <code className="bg-background px-1 rounded">{anneeControle}_{(organisme.nom || "ETAB").replace(/\s+/g, "_")}_[Pièce]_AAAA.MM.JJ</code>
            </p>
          </div>
          <Button onClick={handleExportFullZip} disabled={generating} className="gap-2">
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FolderArchive className="w-4 h-4" />}
            {generating ? "Export en cours..." : "Exporter le dossier ZIP"}
          </Button>
        </Card>

        {generating && (
          <Card className="p-4">
            <p className="text-sm mb-2">{progressText}</p>
            <Progress value={progress} />
          </Card>
        )}

        {/* Documents par section */}
        {(Object.keys(OPCO_CATEGORIES) as OpcoCategory[]).map((cat) => {
          const docs = OPCO_DOCUMENTS.filter((d) => d.category === cat);
          const isOpen = expandedCats.has(cat);
          const catDone = docs.filter((d) => {
            const s = docStates.get(d.code);
            return s && s.status !== "pending";
          }).length;

          return (
            <Card key={cat} className="overflow-hidden">
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full px-5 py-3 flex items-center justify-between hover:bg-muted/50 transition"
              >
                <div className="flex items-center gap-2">
                  {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <h3 className="font-semibold">{OPCO_CATEGORIES[cat]}</h3>
                  <Badge variant="outline" className="ml-2">{catDone}/{docs.length}</Badge>
                </div>
              </button>

              {isOpen && (
                <div className="border-t divide-y">
                  {docs.map((doc) => {
                    const state = docStates.get(doc.code)!;
                    const Icon = STATUS_CONFIG[state.status].icon;
                    return (
                      <div key={doc.code} className="px-5 py-3 flex items-start gap-3 hover:bg-muted/20">
                        <div className="pt-1">
                          <Icon className={`w-5 h-5 ${STATUS_CONFIG[state.status].className}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{doc.code}</span>
                            <span className="font-medium text-sm">{doc.longLabel}</span>
                            {doc.perStagiaire && <Badge variant="secondary" className="text-xs">par apprenti</Badge>}
                            {doc.manualUpload && <Badge variant="outline" className="text-xs">upload requis</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
                          {state.uploadedFileName && (
                            <p className="text-xs text-primary mt-1 flex items-center gap-1">
                              <FileText className="w-3 h-3" /> {state.uploadedFileName}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <input
                            ref={(el) => { if (el) fileInputRefs.current.set(doc.code, el); }}
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleFileUpload(doc.code, f);
                              e.target.value = "";
                            }}
                          />
                          <Button
                            variant="ghost" size="sm"
                            onClick={() => fileInputRefs.current.get(doc.code)?.click()}
                            title="Uploader"
                          >
                            <Upload className="w-4 h-4" />
                          </Button>
                          {doc.autoTemplates.length > 0 && (
                            <Button
                              variant="ghost" size="sm"
                              onClick={() => handleDownloadSingle(doc)}
                              title="Télécharger"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                          <div className="flex items-center gap-1 text-xs">
                            <Checkbox
                              checked={state.status === "not_applicable"}
                              onCheckedChange={() => toggleNA(doc.code)}
                              id={`na-${doc.code}`}
                            />
                            <label htmlFor={`na-${doc.code}`} className="cursor-pointer text-muted-foreground">N/A</label>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </main>
    </div>
  );
}
