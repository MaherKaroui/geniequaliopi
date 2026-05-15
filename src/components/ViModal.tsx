/**
 * VI - Modal : téléchargement du pack officiel Visionnaire Institute
 * (PDF + Word originaux pour 23 apprentis, signés et tamponnés)
 */
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2, GraduationCap, FileText, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Props { open: boolean; onOpenChange: (o: boolean) => void; }

const PACK_URL = "https://uwjxorvytlqqxszylxre.supabase.co/storage/v1/object/public/vi-pack/vi-output.zip";

const APPRENTIS = [
  "Adama Bakayoko", "Aminata Diallo", "Diakha Fofana", "Diye Ba", "Donovan Delion",
  "Elhadj Aymen", "Housna Galifani", "Khalil Zegrir Zohaire", "Lassana Fofana",
  "Laurie Jean Joseph", "Leni Grenet", "Lotfi Mathou", "Mamuna Khanam Mohammad",
  "Marion Lauri", "Naheed Akhtar Mohammad", "Nicolas Schouppe", "Rayane Bondroit",
  "Saliou Cisse Sall", "Sandeep Kumar", "Shaimaa Saidi", "Tacko Soumare",
  "Valentin Cutitaru", "Zouheyr Gourine",
];

export default function ViModal({ open, onOpenChange }: Props) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const a = document.createElement("a");
      a.href = PACK_URL;
      a.download = `VI_Pack_${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Téléchargement du pack lancé (≈156 Mo)");
    } catch (err) {
      console.error(err);
      toast.error("Erreur de téléchargement");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" /> Pack Visionnaire Institute (VI)
          </DialogTitle>
          <DialogDescription>
            Pack officiel pour <strong>{APPRENTIS.length} apprentis</strong> — 4 documents par apprenti
            (Livret d'apprentissage · Livret maître · Règlement intérieur · Livret d'accueil),
            disponibles en <strong>PDF signés/tamponnés</strong> et en <strong>Word</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          <div className="rounded-lg border bg-muted/30 p-3 text-sm">
            <div className="font-medium mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Contenu du pack ({APPRENTIS.length * 4 * 2} fichiers, ~156 Mo)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs">
              {APPRENTIS.map((n, i) => (
                <div key={n} className="truncate text-muted-foreground">
                  <span className="text-foreground/60 mr-1">{i + 1}.</span>{n}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-3 text-sm">
            <p className="font-medium">Structure du ZIP</p>
            <pre className="text-xs mt-1 text-muted-foreground">
{`output/
  └── [Prénom Nom]/
      ├── PDF/   (4 fichiers signés)
      └── WORD/  (4 fichiers .docx)`}
            </pre>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Fermer</Button>
          <Button asChild variant="outline" className="gap-2">
            <a href={PACK_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" /> Ouvrir
            </a>
          </Button>
          <Button onClick={handleDownload} disabled={downloading} className="gap-2">
            {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Télécharger le pack ({APPRENTIS.length * 4 * 2} fichiers)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
