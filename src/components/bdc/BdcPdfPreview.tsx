import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import workerUrl from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
import type { PDFDocumentProxy } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = workerUrl;

export default function BdcPdfPreview({ url }: { url: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    const task = getDocument(url);
    task.promise.then(doc => { if (active) { setPdf(doc); setPageNumber(1); } }).catch(() => { if (active) { setError("L’aperçu est indisponible. Le PDF peut être téléchargé."); setLoading(false); } });
    return () => { active = false; void task.destroy(); };
  }, [url]);
  useEffect(() => {
    if (!pdf) return;
    let active = true;
    let render: ReturnType<Awaited<ReturnType<PDFDocumentProxy["getPage"]>>["render"]> | undefined;
    setLoading(true);
    setError("");
    pdf.getPage(pageNumber).then(page => {
      const element = canvas.current;
      if (!active || !element) return;
      const context = element.getContext("2d");
      if (!context) return;
      const viewport = page.getViewport({ scale: 1.6 });
      element.width = viewport.width; element.height = viewport.height;
      render = page.render({ canvasContext: context, canvas: element, viewport });
      return render.promise;
    }).then(() => { if (active) setLoading(false); }).catch(e => { if (active && e?.name !== "RenderingCancelledException") { console.error("BDC PDF preview", e); setError("Cette page ne peut pas être affichée."); setLoading(false); } });
    return () => { active = false; render?.cancel(); };
  }, [pdf, pageNumber]);
  return <div className="flex flex-col flex-1 min-h-0 gap-2">
    <div className="flex items-center justify-center gap-3"><Button size="icon" variant="outline" aria-label="Page précédente" disabled={pageNumber <= 1 || loading} onClick={() => setPageNumber(n => n - 1)}><ChevronLeft className="h-4 w-4" /></Button><span className="text-sm">Page {pageNumber} / {pdf?.numPages || "…"}</span><Button size="icon" variant="outline" aria-label="Page suivante" disabled={!pdf || pageNumber >= pdf.numPages || loading} onClick={() => setPageNumber(n => n + 1)}><ChevronRight className="h-4 w-4" /></Button>{loading && <Loader2 aria-label="Chargement de la page" className="h-4 w-4 animate-spin" />}</div>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <div className="overflow-auto flex-1 min-h-0 border rounded bg-muted p-2"><canvas ref={canvas} aria-label={`Page PDF ${pageNumber}`} className="w-full h-auto block" /></div>
  </div>;
}