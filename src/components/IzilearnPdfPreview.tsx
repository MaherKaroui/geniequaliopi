import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import BdcPdfPreview from "@/components/bdc/BdcPdfPreview";

export default function IzilearnPdfPreview({ generate }: { generate: () => Promise<Blob> }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    let objectUrl = "";
    setUrl("");
    setError("");
    generate().then(blob => {
      if (!active) return;
      objectUrl = URL.createObjectURL(blob);
      setUrl(objectUrl);
    }).catch((e: unknown) => { if (active) setError(e instanceof Error ? e.message : "Aperçu indisponible"); });
    return () => { active = false; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [generate]);
  return <div className="flex flex-col flex-1 min-h-0 p-3">
    {url ? <BdcPdfPreview url={url} /> : <div role="status" className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">{error || <><Loader2 className="h-5 w-5 animate-spin" />Préparation du CERFA…</>}</div>}
  </div>;
}