import { useRef } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sanitizeRapideDocument } from "@/lib/rapideDocumentEdits";

interface Props { html: string; onSave: (html: string) => void; }

export default function RapideDocumentEditor({ html, onSave }: Props) {
  const frame = useRef<HTMLIFrameElement>(null);
  return <>
    <div className="flex justify-end">
      <Button className="gap-2" onClick={() => {
        const doc = frame.current?.contentDocument;
        if (doc) onSave(sanitizeRapideDocument(`<!DOCTYPE html>${doc.documentElement.outerHTML}`));
      }}><Save className="w-4 h-4" /> Enregistrer les modifications</Button>
    </div>
    <iframe ref={frame} title="Modifier le document" sandbox="allow-same-origin" srcDoc={sanitizeRapideDocument(html)}
      className="flex-1 min-h-0 w-full border rounded-lg bg-background" onLoad={() => {
        const body = frame.current?.contentDocument?.body;
        if (body) { body.contentEditable = "true"; body.setAttribute("aria-label", "Contenu du document"); }
      }} />
  </>;
}