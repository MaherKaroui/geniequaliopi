/**
 * VI - Modal : aperçu in-app de chaque PDF par apprenti + téléchargement du pack complet
 * (URLs signées — bucket `vi-pack` privé)
 */
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, GraduationCap, FileText, ExternalLink, Eye, X, ChevronRight, Loader2 } from "lucide-react";
import { VI_APPRENTIS, type ViDoc } from "@/lib/vi/viManifest";
import { getViSignedUrl } from "@/lib/vi/viSignedUrl";
import { toast } from "sonner";

interface Props { open: boolean; onOpenChange: (o: boolean) => void; }

const PACK_PATH = "vi-pdfs-only.zip";

export default function ViModal({ open, onOpenChange }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string>(VI_APPRENTIS[0]?.slug ?? "");
  const [preview, setPreview] = useState<ViDoc | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [packLoading, setPackLoading] = useState(false);

  const apprenti = useMemo(
    () => VI_APPRENTIS.find((a) => a.slug === selectedSlug) ?? VI_APPRENTIS[0],
    [selectedSlug],
  );

  useEffect(() => {
    let cancelled = false;
    if (!preview) { setPreviewUrl(null); return; }
    setPreviewLoading(true);
    setPreviewUrl(null);
    getViSignedUrl(preview.url)
      .then((u) => { if (!cancelled) setPreviewUrl(u); })
      .catch((e) => { if (!cancelled) toast.error(e?.message || "Erreur URL signée"); })
      .finally(() => { if (!cancelled) setPreviewLoading(false); });
    return () => { cancelled = true; };
  }, [preview]);

  const handleDownloadPack = async () => {
    try {
      setPackLoading(true);
      const url = await getViSignedUrl(PACK_PATH, 3600);
      const a = document.createElement("a");
      a.href = url;
      a.download = `VI_Pack_${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(a); a.click(); a.remove();
      toast.success("Téléchargement du pack PDF lancé (≈100 Mo)");
    } catch (e: any) {
      toast.error(e?.message || "Erreur téléchargement");
    } finally {
      setPackLoading(false);
    }
  };

  const downloadOne = async (doc: ViDoc) => {
    try {
      const url = await getViSignedUrl(doc.url);
      const a = document.createElement("a");
      a.href = url; a.download = doc.filename; a.target = "_blank";
      document.body.appendChild(a); a.click(); a.remove();
    } catch (e: any) {
      toast.error(e?.message || "Erreur téléchargement");
    }
  };

  const openInTab = async (doc: ViDoc) => {
    try {
      const url = await getViSignedUrl(doc.url);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e: any) {
      toast.error(e?.message || "Erreur ouverture");
    }
  };

  const openPackTab = async () => {
    try {
      const url = await getViSignedUrl(PACK_PATH, 3600);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e: any) {
      toast.error(e?.message || "Erreur ouverture");
    }
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
                  <button onClick={() => openInTab(preview)} className="text-primary hover:underline shrink-0 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> Onglet
                  </button>
                  <button onClick={() => setPreview(null)} className="hover:text-destructive shrink-0"><X className="w-4 h-4" /></button>
                </div>
                {previewLoading || !previewUrl ? (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" /> Génération de l'URL signée…
                  </div>
                ) : (
                  <iframe src={previewUrl} title={preview.filename} className="flex-1 w-full bg-white" />
                )}
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
          <Button variant="outline" className="gap-2" onClick={openPackTab}>
            <ExternalLink className="w-4 h-4" /> Ouvrir le ZIP
          </Button>
          <Button onClick={handleDownloadPack} disabled={packLoading} className="gap-2">
            {packLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Télécharger le pack PDF (~100 Mo)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
