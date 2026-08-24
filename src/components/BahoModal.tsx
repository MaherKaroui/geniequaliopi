/**
 * BAHO – Modale : pack global ZIP + aperçu RI individualisé par stagiaire (avec tampons)
 */
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Building2, Users, FileText, Eye, ChevronDown, ChevronRight, X, Upload, Stamp, FileSignature, Receipt, ScrollText } from "lucide-react";
import { getBahoEntreprises, FORMAT_SPHERE_ORG, type BahoEntreprise, type BahoStagiaire } from "@/lib/baho/bahoData";
import { buildBahoZip } from "@/lib/baho/bahoGenerator";
import { getRIHTML, getConventionHTML, getCGVHTML, getFactureHTML, getDevisHTML, getProgrammeHTML, getConvocationHTML, getCertificatRealisationHTML } from "@/lib/baho/bahoStaticDocs";
import { getBahoStagiaireDocs, type BahoStagiaireDocKind } from "@/lib/baho/bahoStagiaireDocs";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { saveAs } from "file-saver";
import { useBackgroundJobs } from "@/lib/backgroundJobs";
import { toast } from "sonner";

interface BahoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type DocKind =
  | "ri" | "convention" | "cgv" | "facture" | "devis" | "programme" | "convocation" | "certificat"
  | BahoStagiaireDocKind;

const STAGIAIRE_DOC_KINDS: BahoStagiaireDocKind[] = [
  "besoins", "positionnement_debut", "exercice_j1", "exercice_j2", "evaluation_finale", "positionnement_fin",
];

interface PreviewState {
  entreprise: BahoEntreprise;
  stagiaire: BahoStagiaire | null; // null = doc entreprise (sans stagiaire)
  docKind: DocKind;
  pdfUrl: string;
  loading: boolean;
  fileName?: string;
}

export default function BahoModal({ open, onOpenChange }: BahoModalProps) {
  const [generating, setGenerating] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [fsStamp, setFsStamp] = useState<string | null>(null); // data URI tampon FORMAT SPHERE custom
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { runJob } = useBackgroundJobs();
  const entreprises = getBahoEntreprises();
  const totalStagiaires = entreprises.reduce((acc, e) => acc + e.stagiaires.length, 0);

  // Cleanup blob URL on unmount/preview change
  useEffect(() => {
    return () => {
      if (preview?.pdfUrl) URL.revokeObjectURL(preview.pdfUrl);
    };
  }, [preview?.pdfUrl]);

  const toggleExpand = (siret: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(siret)) next.delete(siret);
      else next.add(siret);
      return next;
    });
  };

  const handleStampUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image (PNG, JPG, SVG).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFsStamp(reader.result as string);
      toast.success("Tampon FORMAT SPHERE chargé. Re-cliquez sur un stagiaire pour voir l'aperçu.");
    };
    reader.readAsDataURL(file);
  };

  const handlePreview = async (entreprise: BahoEntreprise, stagiaire: BahoStagiaire | null, docKind: DocKind = "ri") => {
    if (preview?.pdfUrl) URL.revokeObjectURL(preview.pdfUrl);
    setPreview({ entreprise, stagiaire, docKind, pdfUrl: "", loading: true });
    try {
      let html = "";
      let fileName: string | undefined;
      if ((STAGIAIRE_DOC_KINDS as string[]).includes(docKind)) {
        if (!stagiaire) throw new Error("Stagiaire requis");
        const si = entreprise.stagiaires.findIndex((x) => x.codeStagiaire === stagiaire.codeStagiaire);
        const doc = getBahoStagiaireDocs(entreprise, stagiaire, Math.max(0, si)).find((d) => d.kind === docKind)!;
        html = doc.render(fsStamp ?? undefined);
        fileName = doc.fileName;
        const blobS = await htmlToPdfBlob(html);
        setPreview({ entreprise, stagiaire, docKind, pdfUrl: URL.createObjectURL(blobS), loading: false, fileName });
        return;
      }
      switch (docKind) {
        case "convention":
          html = getConventionHTML(entreprise, fsStamp ?? undefined);
          break;
        case "cgv":
          html = getCGVHTML(entreprise, fsStamp ?? undefined);
          break;
        case "facture":
          html = getFactureHTML(entreprise, `BAHO-${new Date().getFullYear()}-PREV`, fsStamp ?? undefined);
          break;
        case "devis":
          html = getDevisHTML(entreprise, `BAHO-${new Date().getFullYear()}-PREV`, fsStamp ?? undefined);
          break;
        case "programme":
          html = getProgrammeHTML(entreprise, fsStamp ?? undefined);
          break;
        case "convocation":
          if (!stagiaire) throw new Error("Stagiaire requis pour convocation");
          html = getConvocationHTML(entreprise, stagiaire, fsStamp ?? undefined);
          break;
        case "certificat":
          if (!stagiaire) throw new Error("Stagiaire requis pour certificat");
          html = getCertificatRealisationHTML(entreprise, stagiaire, fsStamp ?? undefined);
          break;
        case "ri":
        default:
          html = getRIHTML(entreprise, stagiaire ?? undefined, fsStamp ?? undefined);
      }
      const blob = await htmlToPdfBlob(html);
      const url = URL.createObjectURL(blob);
      setPreview({ entreprise, stagiaire, docKind, pdfUrl: url, loading: false });
    } catch (err) {
      console.error("Preview error:", err);
      toast.error("Erreur lors de la génération de l'aperçu");
      setPreview(null);
    }
  };

  const docLabels: Record<DocKind, string> = {
    programme: "Programme de formation",
    convention: "Convention de formation",
    devis: "Devis",
    cgv: "CGV",
    facture: "Facture",
    ri: "Règlement intérieur",
    convocation: "Convocation",
    certificat: "Certificat de réalisation",
    besoins: "Évaluation des besoins",
    positionnement_debut: "Test de positionnement – début",
    exercice_j1: "Exercice du jour 1",
    exercice_j2: "Exercice du jour 2",
    evaluation_finale: "Évaluation finale",
    positionnement_fin: "Test de positionnement – fin",
  };

  const handleDownloadPreview = async () => {
    if (!preview || preview.loading || !preview.pdfUrl) return;
    const blob = await fetch(preview.pdfUrl).then((r) => r.blob());
    saveAs(blob, preview.fileName || `${docLabels[preview.docKind]}.pdf`);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await runJob({
        label: "Pack BAHO – FORMAT SPHERE",
        fileName: `BAHO_FORMAT_SPHERE_${new Date().toISOString().slice(0, 10)}.zip`,
        autoDownload: true,
        run: async (reporter) => buildBahoZip(reporter, fsStamp ?? undefined),
      });
      toast.success("Génération lancée — voir la barre de progression en bas.");
      onOpenChange(false);
    } catch (err) {
      console.error("BAHO generation error:", err);
      toast.error("Erreur lors de la génération du pack BAHO");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" /> Pack BAHO – FORMAT SPHERE
          </DialogTitle>
          <DialogDescription>
            Pack AFEST hôtellerie : {entreprises.length} hôtels, {totalStagiaires} stagiaires. Programme, Convention, Devis, Facture (avec liste participants + présentiel), CGV, RI par hôtel + <strong>Convocation et Certificat de réalisation par stagiaire</strong> ({totalStagiaires * 8} docs individuels : convocation, certificat, évaluation des besoins, 2 tests de positionnement, 2 exercices, évaluation finale) — tous tamponnés (hôtel + FORMAT SPHERE).
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-hidden">
          {/* Liste hiérarchique */}
          <div className="border rounded-lg overflow-y-auto p-2 text-sm">
            {entreprises.map((e, i) => {
              const isOpen = expanded.has(e.siret);
              return (
                <div key={e.siret} className="mb-1">
                  <button
                    onClick={() => toggleExpand(e.siret)}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-muted text-left"
                  >
                    {isOpen ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0" />}
                    <Building2 className="w-4 h-4 shrink-0 text-primary" />
                    <span className="flex-1 truncate font-medium">{i + 1}. {e.nom}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                      <Users className="w-3 h-3" /> {e.stagiaires.length}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="ml-6 border-l pl-2 mt-1 space-y-0.5">
                      {/* Documents par hôtel */}
                      <button
                        onClick={() => handlePreview(e, null, "programme")}
                        className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted text-left ${
                          preview?.entreprise.siret === e.siret && preview?.docKind === "programme" ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        <FileText className="w-3 h-3 shrink-0" /> Programme de formation
                      </button>
                      <button
                        onClick={() => handlePreview(e, null, "convention")}
                        className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted text-left ${
                          preview?.entreprise.siret === e.siret && preview?.docKind === "convention" ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        <FileSignature className="w-3 h-3 shrink-0" /> Convention (avec {e.stagiaires.length} participants)
                      </button>
                      <button
                        onClick={() => handlePreview(e, null, "devis")}
                        className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted text-left ${
                          preview?.entreprise.siret === e.siret && preview?.docKind === "devis" ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        <FileText className="w-3 h-3 shrink-0" /> Devis
                      </button>
                      <button
                        onClick={() => handlePreview(e, null, "cgv")}
                        className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted text-left ${
                          preview?.entreprise.siret === e.siret && preview?.docKind === "cgv" ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        <ScrollText className="w-3 h-3 shrink-0" /> CGV
                      </button>
                      <button
                        onClick={() => handlePreview(e, null, "facture")}
                        className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted text-left ${
                          preview?.entreprise.siret === e.siret && preview?.docKind === "facture" ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        <Receipt className="w-3 h-3 shrink-0" /> Facture
                      </button>
                      <div className="text-[10px] text-muted-foreground px-2 pt-1.5 pb-0.5 uppercase">Règlements intérieurs</div>
                      <button
                        onClick={() => handlePreview(e, null, "ri")}
                        className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted text-left ${
                          preview?.entreprise.siret === e.siret && preview?.stagiaire === null && preview?.docKind === "ri" ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        <FileText className="w-3 h-3 shrink-0" /> RI entreprise (sans stagiaire)
                      </button>
                      {e.stagiaires.map((s) => (
                        <button
                          key={`ri-${s.codeStagiaire}`}
                          onClick={() => handlePreview(e, s, "ri")}
                          className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted text-left ${
                            preview?.entreprise.siret === e.siret && preview?.stagiaire?.codeStagiaire === s.codeStagiaire && preview?.docKind === "ri"
                              ? "bg-primary/10 text-primary"
                              : ""
                          }`}
                        >
                          <Eye className="w-3 h-3 shrink-0" />
                          <span className="truncate">{s.prenom} {s.nom}</span>
                          <span className="text-muted-foreground shrink-0">#{s.codeStagiaire}</span>
                        </button>
                      ))}
                      <div className="text-[10px] text-muted-foreground px-2 pt-1.5 pb-0.5 uppercase">Convocations (1 par stagiaire)</div>
                      {e.stagiaires.map((s) => (
                        <button
                          key={`convoc-${s.codeStagiaire}`}
                          onClick={() => handlePreview(e, s, "convocation")}
                          className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted text-left ${
                            preview?.entreprise.siret === e.siret && preview?.stagiaire?.codeStagiaire === s.codeStagiaire && preview?.docKind === "convocation"
                              ? "bg-primary/10 text-primary"
                              : ""
                          }`}
                        >
                          <FileText className="w-3 h-3 shrink-0" />
                          <span className="truncate">Convocation – {s.prenom} {s.nom}</span>
                        </button>
                      ))}
                      <div className="text-[10px] text-muted-foreground px-2 pt-1.5 pb-0.5 uppercase">Certificats de réalisation (1 par stagiaire)</div>
                      {e.stagiaires.map((s) => (
                        <button
                          key={`certif-${s.codeStagiaire}`}
                          onClick={() => handlePreview(e, s, "certificat")}
                          className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted text-left ${
                            preview?.entreprise.siret === e.siret && preview?.stagiaire?.codeStagiaire === s.codeStagiaire && preview?.docKind === "certificat"
                              ? "bg-primary/10 text-primary"
                              : ""
                          }`}
                        >
                          <ScrollText className="w-3 h-3 shrink-0" />
                          <span className="truncate">Certificat – {s.prenom} {s.nom}</span>
                        </button>
                      ))}
                      <div className="text-[10px] text-muted-foreground px-2 pt-1.5 pb-0.5 uppercase">
                        Évaluations &amp; exercices (6 par stagiaire)
                      </div>
                      {e.stagiaires.map((s, si) =>
                        getBahoStagiaireDocs(e, s, si).map((doc) => (
                          <button
                            key={`${doc.kind}-${s.codeStagiaire}`}
                            onClick={() => handlePreview(e, s, doc.kind)}
                            className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted text-left ${
                              preview?.entreprise.siret === e.siret &&
                              preview?.stagiaire?.codeStagiaire === s.codeStagiaire &&
                              preview?.docKind === doc.kind
                                ? "bg-primary/10 text-primary"
                                : ""
                            }`}
                          >
                            <FileText className="w-3 h-3 shrink-0" />
                            <span className="truncate">
                              {docLabels[doc.kind]} – {s.prenom} {s.nom}
                            </span>
                            <span className="text-muted-foreground shrink-0">
                              {new Date(doc.date).toLocaleDateString("fr-FR")}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Aperçu PDF */}
          <div className="border rounded-lg overflow-hidden flex flex-col bg-muted/30">
            {preview ? (
              <>
                <div className="px-3 py-2 border-b bg-background flex items-center justify-between text-xs">
                  <span className="truncate">
                    <strong>{docLabels[preview.docKind]}</strong> – {preview.entreprise.nom}
                    {preview.stagiaire && ` – ${preview.stagiaire.prenom} ${preview.stagiaire.nom}`}
                  </span>
                  <span className="flex items-center gap-1 shrink-0 ml-2">
                    <Button variant="outline" size="sm" className="h-6 gap-1 text-[11px]" disabled={preview.loading} onClick={handleDownloadPreview}>
                      <Download className="w-3 h-3" /> Télécharger
                    </Button>
                    <button onClick={() => setPreview(null)} className="hover:text-destructive">
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                </div>
                {preview.loading ? (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" /> Génération PDF…
                  </div>
                ) : (
                  <iframe src={preview.pdfUrl} title="Aperçu RI" className="flex-1 w-full bg-white" />
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm p-6 text-center">
                <div>
                  <Eye className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  Sélectionnez un stagiaire à gauche pour prévisualiser son Règlement Intérieur avec tampons.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs bg-muted/50 p-2 rounded">
          <div className="flex-1">
            <strong>Émetteur :</strong> {FORMAT_SPHERE_ORG.nom} – SIRET {FORMAT_SPHERE_ORG.siret} – NDA {FORMAT_SPHERE_ORG.nda}
          </div>
          <div className="flex items-center gap-2">
            <Stamp className="w-4 h-4 text-primary shrink-0" />
            <span className="text-muted-foreground">
              Tampon FORMAT SPHERE :{" "}
              <strong className={fsStamp ? "text-primary" : ""}>
                {fsStamp ? "Personnalisé ✓" : "Auto-généré"}
              </strong>
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleStampUpload}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-7 gap-1"
            >
              <Upload className="w-3 h-3" /> {fsStamp ? "Changer" : "Importer"}
            </Button>
            {fsStamp && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFsStamp(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="h-7 px-2"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={generating}>
            Fermer
          </Button>
          <Button onClick={handleGenerate} disabled={generating} className="gap-2">
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {generating ? "Lancement…" : `Générer le ZIP complet (${entreprises.length * 6 + totalStagiaires * 8} docs)`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
