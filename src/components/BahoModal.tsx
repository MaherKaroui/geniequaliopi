/**
 * BAHO - Modale temporaire pour générer le pack documentaire FORMAT SPHERE
 */
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Building2, Users, FileText } from "lucide-react";
import { getBahoEntreprises, FORMAT_SPHERE_ORG } from "@/lib/baho/bahoData";
import { buildBahoZip } from "@/lib/baho/bahoGenerator";
import { useBackgroundJobs } from "@/lib/backgroundJobs";
import { toast } from "sonner";

interface BahoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BahoModal({ open, onOpenChange }: BahoModalProps) {
  const [generating, setGenerating] = useState(false);
  const { runJob } = useBackgroundJobs();
  const entreprises = getBahoEntreprises();
  const totalStagiaires = entreprises.reduce((acc, e) => acc + e.stagiaires.length, 0);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await runJob({
        label: "Pack BAHO – FORMAT SPHERE",
        fileName: `BAHO_FORMAT_SPHERE_${new Date().toISOString().slice(0, 10)}.zip`,
        autoDownload: true,
        run: async (reporter) => buildBahoZip(reporter),
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" /> Pack BAHO – FORMAT SPHERE
          </DialogTitle>
          <DialogDescription>
            Génération automatique du dossier complet AFEST hôtellerie pour les {entreprises.length} hôtels.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{entreprises.length}</div>
              <div className="text-xs text-muted-foreground">Hôtels</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalStagiaires}</div>
              <div className="text-xs text-muted-foreground">Stagiaires</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{entreprises.length * 5}</div>
              <div className="text-xs text-muted-foreground">Documents</div>
            </div>
          </div>

          <div className="text-sm space-y-2">
            <p className="font-semibold flex items-center gap-1">
              <FileText className="w-4 h-4" /> Documents générés par hôtel :
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-muted-foreground">
              <li>Convention de formation (DOCX + PDF)</li>
              <li>Devis (DOCX + PDF)</li>
              <li>Facture (PDF)</li>
              <li>Règlement intérieur (PDF)</li>
              <li>Conditions Générales de Vente (PDF)</li>
            </ul>
          </div>

          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <strong>Émetteur :</strong> {FORMAT_SPHERE_ORG.nom} – SIRET {FORMAT_SPHERE_ORG.siret} – NDA {FORMAT_SPHERE_ORG.nda}
          </div>

          <div className="max-h-40 overflow-y-auto border rounded-lg p-2 text-xs">
            {entreprises.map((e, i) => (
              <div key={e.siret} className="flex items-center justify-between py-1 border-b last:border-0">
                <span className="truncate">{i + 1}. {e.nom}</span>
                <span className="text-muted-foreground flex items-center gap-1 shrink-0 ml-2">
                  <Users className="w-3 h-3" /> {e.stagiaires.length}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={generating}>
            Annuler
          </Button>
          <Button onClick={handleGenerate} disabled={generating} className="gap-2">
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {generating ? "Lancement…" : "Générer le ZIP"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
