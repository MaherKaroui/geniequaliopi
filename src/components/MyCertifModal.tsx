/**
 * MyCertif – Modale d'automatisation : génère 4 docs par stagiaire + 1 émargement par session
 */
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Award, Eye, X, FileText, ScrollText, FileSignature, ListChecks } from "lucide-react";
import { STAGIAIRES, CERTIFICATION, ORG_FORMATION, type CertifStagiaire } from "@/lib/myCertif/myCertifData";
import {
  getAttestationDelivranceHTML, getEmargementJuryHTML, getGrilleEvaluationHTML,
  getAttestationHonneurHTML, getQuestionnaireHTML,
} from "@/lib/myCertif/myCertifTemplates";
import { buildMyCertifZip } from "@/lib/myCertif/myCertifGenerator";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { useBackgroundJobs } from "@/lib/backgroundJobs";
import { toast } from "sonner";

type DocKind = "attestation" | "grille" | "honneur" | "questionnaire" | "emargement";

const DOC_LABELS: Record<DocKind, string> = {
  attestation: "Attestation de délivrance",
  grille: "Grille d'évaluation",
  honneur: "Attestation sur l'honneur",
  questionnaire: "Questionnaire rempli",
  emargement: "Feuille d'émargement jury",
};

const DOC_ICONS: Record<DocKind, React.ReactNode> = {
  attestation: <Award className="w-3.5 h-3.5" />,
  grille: <ListChecks className="w-3.5 h-3.5" />,
  honneur: <FileSignature className="w-3.5 h-3.5" />,
  questionnaire: <FileText className="w-3.5 h-3.5" />,
  emargement: <ScrollText className="w-3.5 h-3.5" />,
};

interface Preview {
  stagiaire: CertifStagiaire | null;
  sessionDate?: string;
  docKind: DocKind;
  pdfUrl: string;
  loading: boolean;
}

export default function MyCertifModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [signature, setSignature] = useState<string | null>(() => typeof localStorage !== "undefined" ? localStorage.getItem("mycertif_signature_presidente") : null);
  const { runJob } = useBackgroundJobs();
  const sessions = Array.from(new Set(STAGIAIRES.map(s => s.sessionDate)));

  useEffect(() => () => { if (preview?.pdfUrl) URL.revokeObjectURL(preview.pdfUrl); }, [preview?.pdfUrl]);

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      localStorage.setItem("mycertif_signature_presidente", dataUrl);
      setSignature(dataUrl);
      toast.success("Signature enregistrée");
    };
    reader.readAsDataURL(file);
  };

  const clearSignature = () => {
    localStorage.removeItem("mycertif_signature_presidente");
    setSignature(null);
    toast.success("Signature supprimée");
  };

  const showPreview = async (docKind: DocKind, stagiaire: CertifStagiaire | null, sessionDate?: string) => {
    if (preview?.pdfUrl) URL.revokeObjectURL(preview.pdfUrl);
    setPreview({ stagiaire, sessionDate, docKind, pdfUrl: "", loading: true });
    try {
      let html = "";
      if (docKind === "emargement") html = getEmargementJuryHTML(sessionDate || stagiaire?.sessionDate || "");
      else if (stagiaire) {
        html = docKind === "attestation" ? getAttestationDelivranceHTML(stagiaire)
          : docKind === "grille" ? getGrilleEvaluationHTML(stagiaire)
          : docKind === "honneur" ? getAttestationHonneurHTML(stagiaire)
          : getQuestionnaireHTML(stagiaire);
      }
      const blob = await htmlToPdfBlob(html);
      const url = URL.createObjectURL(blob);
      setPreview({ stagiaire, sessionDate, docKind, pdfUrl: url, loading: false });
    } catch (err) {
      console.error(err);
      toast.error("Erreur de génération de l'aperçu");
      setPreview(null);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await runJob({
        label: `Pack MyCertif – ${CERTIFICATION.code}`,
        fileName: `MyCertif_${CERTIFICATION.code.replace(/\s/g, "")}_${new Date().toISOString().slice(0, 10)}.zip`,
        autoDownload: true,
        run: (reporter) => buildMyCertifZip(reporter),
      });
      toast.success("Génération lancée — voir la barre de progression en bas.");
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la génération");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-pink-600" /> MyCertif – Pack {CERTIFICATION.code}
          </DialogTitle>
          <DialogDescription>
            <strong>{CERTIFICATION.intitule}</strong> — {STAGIAIRES.length} stagiaires • {sessions.length} sessions de jury.
            4 documents par stagiaire + 1 émargement par session = <strong>{STAGIAIRES.length * 4 + sessions.length} PDF</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-hidden">
          <div className="border rounded-lg overflow-y-auto p-2 text-sm">
            <div className="text-[10px] uppercase text-muted-foreground px-2 py-1 font-semibold">Émargements jury (par session)</div>
            {sessions.map((d) => (
              <button key={d} onClick={() => showPreview("emargement", null, d)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-muted text-left ${preview?.docKind === "emargement" && preview?.sessionDate === d ? "bg-primary/10 text-primary" : ""}`}>
                <ScrollText className="w-3.5 h-3.5 text-pink-600" /> Session du {d}
              </button>
            ))}

            <div className="text-[10px] uppercase text-muted-foreground px-2 pt-3 pb-1 font-semibold">Stagiaires ({STAGIAIRES.length})</div>
            {STAGIAIRES.map((s, i) => (
              <div key={i} className="border-l-2 border-pink-200 ml-2 pl-2 mb-2">
                <div className="px-2 py-1 text-xs font-medium">{i + 1}. {s.prenom} {s.nom} <span className="text-muted-foreground">— {s.sessionDate}</span></div>
                {(["attestation", "grille", "honneur", "questionnaire"] as DocKind[]).map(k => (
                  <button key={k} onClick={() => showPreview(k, s)}
                    className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted text-left ${preview?.stagiaire === s && preview?.docKind === k ? "bg-primary/10 text-primary" : ""}`}>
                    {DOC_ICONS[k]} {DOC_LABELS[k]}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="border rounded-lg overflow-hidden flex flex-col bg-muted/30">
            {preview ? (
              <>
                <div className="px-3 py-2 border-b bg-background flex items-center justify-between text-xs">
                  <span className="truncate">
                    <strong>{DOC_LABELS[preview.docKind]}</strong>
                    {preview.stagiaire && ` – ${preview.stagiaire.prenom} ${preview.stagiaire.nom}`}
                    {preview.sessionDate && ` – ${preview.sessionDate}`}
                  </span>
                  <button onClick={() => setPreview(null)} className="hover:text-destructive shrink-0 ml-2"><X className="w-4 h-4" /></button>
                </div>
                {preview.loading
                  ? <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm"><Loader2 className="w-4 h-4 animate-spin mr-2" /> Génération PDF…</div>
                  : <iframe src={preview.pdfUrl} title="Aperçu" className="flex-1 w-full bg-white" />}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm p-6 text-center">
                <div><Eye className="w-8 h-8 mx-auto mb-2 opacity-40" />Sélectionnez un document à gauche pour le prévisualiser.</div>
              </div>
            )}
          </div>
        </div>

        <div className="text-xs bg-muted/50 p-2 rounded flex items-center justify-between gap-3 flex-wrap">
          <span><strong>Émetteur :</strong> {ORG_FORMATION.nom} – SIRET {ORG_FORMATION.siret} – NDA {ORG_FORMATION.nda}</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Signature Présidente :</span>
            {signature ? (
              <>
                <img src={signature} alt="sig" className="h-8 bg-white border rounded px-1" />
                <button onClick={clearSignature} className="text-destructive hover:underline text-[11px]">Retirer</button>
              </>
            ) : (
              <label className="cursor-pointer text-primary hover:underline text-[11px]">
                Importer (PNG)
                <input type="file" accept="image/*" className="hidden" onChange={handleSignatureUpload} />
              </label>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={generating}>Fermer</Button>
          <Button onClick={handleGenerate} disabled={generating} className="gap-2 bg-pink-600 hover:bg-pink-700">
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {generating ? "Lancement…" : `Générer le ZIP (${STAGIAIRES.length * 4 + sessions.length} PDF)`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
