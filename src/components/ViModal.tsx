/**
 * VI - Modal : preview et génération du pack ZIP (25 apprentis × 4 docs)
 */
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2, GraduationCap, FileText, Eye, ChevronDown, ChevronRight, FileSignature, ScrollText, BookOpen } from "lucide-react";
import { getViApprentis, type ViApprenti } from "@/lib/vi/viData";
import { buildViZip, buildViDocHtml, type ViDocKind } from "@/lib/vi/viGenerator";
import { htmlToPdfBlob } from "@/lib/pdfExport";
import { useBackgroundJobs } from "@/lib/backgroundJobs";
import { toast } from "sonner";

interface Props { open: boolean; onOpenChange: (o: boolean) => void; }

const KINDS: Array<{ id: ViDocKind; label: string; icon: any }> = [
  { id: "livret", label: "Livret d'apprentissage", icon: BookOpen },
  { id: "maitre", label: "Livret maître d'apprentissage", icon: FileSignature },
  { id: "reglement", label: "Règlement intérieur", icon: ScrollText },
  { id: "accueil", label: "Livret d'accueil", icon: FileText },
];

export default function ViModal({ open, onOpenChange }: Props) {
  const [generating, setGenerating] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [preview, setPreview] = useState<{ a: ViApprenti; kind: ViDocKind; url: string; loading: boolean } | null>(null);
  const { runJob } = useBackgroundJobs();
  const apprentis = getViApprentis();

  useEffect(() => () => { if (preview?.url) URL.revokeObjectURL(preview.url); }, [preview?.url]);

  const handlePreview = async (a: ViApprenti, kind: ViDocKind) => {
    if (preview?.url) URL.revokeObjectURL(preview.url);
    setPreview({ a, kind, url: "", loading: true });
    try {
      const html = buildViDocHtml(a, kind);
      const blob = await htmlToPdfBlob(html);
      const url = URL.createObjectURL(blob);
      setPreview({ a, kind, url, loading: false });
    } catch (err) {
      console.error(err);
      toast.error("Erreur aperçu");
      setPreview(null);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await runJob({
        label: "Pack Visionnaire Institute",
        fileName: `VI_Pack_${new Date().toISOString().slice(0, 10)}.zip`,
        autoDownload: true,
        run: async (reporter) => buildViZip(reporter),
      });
      toast.success("Génération lancée — voir la barre de progression.");
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Erreur de génération");
    } finally {
      setGenerating(false);
    }
  };

  const toggle = (k: string) => setExpanded(p => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" /> Pack Visionnaire Institute (VI)
          </DialogTitle>
          <DialogDescription>
            {apprentis.length} apprentis × 4 documents = <strong>{apprentis.length * 4} PDF</strong> tamponnés et signés
            (Livret apprentissage · Livret maître · Règlement intérieur · Livret d'accueil).
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-hidden">
          <div className="border rounded-lg overflow-y-auto p-2 text-sm">
            {apprentis.map((a, i) => {
              const key = `${a.prenom}_${a.nom}`;
              const isOpen = expanded.has(key);
              return (
                <div key={key} className="mb-1">
                  <button onClick={() => toggle(key)} className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-muted text-left">
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="flex-1 truncate font-medium">{i + 1}. {a.prenom} {a.nom}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded">{a.formation.code}</span>
                    <span className="text-[10px] text-muted-foreground">{a.modalite}</span>
                  </button>
                  {isOpen && (
                    <div className="ml-6 border-l pl-2 mt-1 space-y-0.5">
                      {KINDS.map(({ id, label, icon: Icon }) => (
                        <button key={id} onClick={() => handlePreview(a, id)}
                          className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-muted text-left ${
                            preview?.a === a && preview?.kind === id ? "bg-primary/10 text-primary" : ""
                          }`}>
                          <Icon className="w-3 h-3" /> {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="border rounded-lg overflow-hidden flex flex-col">
            {preview ? (
              <>
                <div className="px-3 py-2 border-b bg-muted/40 text-xs flex justify-between items-center">
                  <span className="font-medium truncate">
                    {preview.a.prenom} {preview.a.nom} — {KINDS.find(k => k.id === preview.kind)?.label}
                  </span>
                  {preview.loading && <Loader2 className="w-3 h-3 animate-spin" />}
                </div>
                {preview.loading ? (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Génération…</div>
                ) : (
                  <iframe src={preview.url} className="flex-1 w-full" title="aperçu" />
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm p-6 text-center">
                <div>
                  <Eye className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  Cliquez sur un apprenti puis sur un document pour l'aperçu.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Fermer</Button>
          <Button onClick={handleGenerate} disabled={generating} className="gap-2">
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Générer le pack ({apprentis.length * 4} PDF)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
