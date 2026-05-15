/**
 * VI - Modal : aperçu in-app de chaque PDF par apprenti + téléchargement du pack complet
 */
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, GraduationCap, FileText, ExternalLink, Eye, X, ChevronRight } from "lucide-react";
import { VI_APPRENTIS, type ViDoc } from "@/lib/vi/viManifest";
import { toast } from "sonner";

interface Props { open: boolean; onOpenChange: (o: boolean) => void; }

const PACK_URL = "https://uwjxorvytlqqxszylxre.supabase.co/storage/v1/object/public/vi-pack/vi-output.zip";

export default function ViModal({ open, onOpenChange }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string>(VI_APPRENTIS[0]?.slug ?? "");
  const [preview, setPreview] = useState<ViDoc | null>(null);

  const apprenti = useMemo(
    () => VI_APPRENTIS.find((a) => a.slug === selectedSlug) ?? VI_APPRENTIS[0],
    [selectedSlug],
  );

  const handleDownloadPack = () => {
    const a = document.createElement("a");
    a.href = PACK_URL;
    a.download = `VI_Pack_${new Date().toISOString().slice(0, 10)}.zip`;
    document.body.appendChild(a); a.click(); a.remove();
    toast.success("Téléchargement du pack lancé (≈156 Mo)");
  };

  const downloadOne = (doc: ViDoc) => {
    const a = document.createElement("a");
    a.href = doc.url; a.download = doc.filename; a.target = "_blank";
    document.body.appendChild(a); a.click(); a.remove();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] max-h-[92vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" /> Pack Visionnaire Institute (VI)
          </DialogTitle>
          <DialogDescription>
            <strong>{VI_APPRENTIS.length} apprentis</strong> — 4 PDFs signés/tamponnés par apprenti.
            Sélectionnez un apprenti puis un document pour le prévisualiser.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-12 gap-3 flex-1 overflow-hidden">
          {/* Liste apprentis */}
          <div className="col-span-3 border rounded-lg overflow-y-auto text-sm">
            <div className="text-[10px] uppercase text-muted-foreground px-2 py-1.5 font-semibold sticky top-0 bg-background border-b">
              Apprentis ({VI_APPRENTIS.length})
            </div>
            {VI_APPRENTIS.map((a, i) => (
              <button
                key={a.slug}
                onClick={() => { setSelectedSlug(a.slug); setPreview(null); }}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-muted text-left ${
                  selectedSlug === a.slug ? "bg-primary/10 text-primary font-medium" : ""
                }`}
              >
                <span className="text-muted-foreground w-5 text-right">{i + 1}.</span>
                <span className="truncate flex-1">{a.nom}</span>
                <ChevronRight className="w-3 h-3 opacity-40" />
              </button>
            ))}
          </div>

          {/* Documents de l'apprenti sélectionné */}
          <div className="col-span-3 border rounded-lg overflow-y-auto text-sm">
            <div className="text-[10px] uppercase text-muted-foreground px-2 py-1.5 font-semibold sticky top-0 bg-background border-b truncate">
              {apprenti?.nom} — {apprenti?.docs.length} docs
            </div>
            {apprenti?.docs.map((d) => (
              <button
                key={d.filename}
                onClick={() => setPreview(d)}
                className={`w-full flex items-start gap-2 px-2 py-2 text-xs hover:bg-muted text-left border-b ${
                  preview?.filename === d.filename ? "bg-primary/10 text-primary" : ""
                }`}
              >
                <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{d.label}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{d.filename}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="col-span-6 border rounded-lg overflow-hidden flex flex-col bg-muted/30">
            {preview ? (
              <>
                <div className="px-3 py-2 border-b bg-background flex items-center justify-between text-xs gap-2">
                  <span className="truncate flex-1"><strong>{preview.label}</strong> — {apprenti?.nom}</span>
                  <button onClick={() => downloadOne(preview)} className="text-primary hover:underline shrink-0 flex items-center gap-1">
                    <Download className="w-3 h-3" /> PDF
                  </button>
                  <a href={preview.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline shrink-0 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> Onglet
                  </a>
                  <button onClick={() => setPreview(null)} className="hover:text-destructive shrink-0"><X className="w-4 h-4" /></button>
                </div>
                <iframe src={preview.url} title={preview.filename} className="flex-1 w-full bg-white" />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm p-6 text-center">
                <div>
                  <Eye className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  Sélectionnez un document à gauche pour le prévisualiser ici.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Fermer</Button>
          <Button asChild variant="outline" className="gap-2">
            <a href={PACK_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" /> Ouvrir le ZIP
            </a>
          </Button>
          <Button onClick={handleDownloadPack} className="gap-2">
            <Download className="w-4 h-4" /> Télécharger le pack complet (~156 Mo)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
