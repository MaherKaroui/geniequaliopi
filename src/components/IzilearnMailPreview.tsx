import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { OrganismeInfo } from "@/types/qualiopi";
import type { MailModele } from "@/lib/izilearn/mails";
import { mailPourCapture } from "@/lib/izilearn/mailCapture";
import { captureMail } from "@/lib/mails/captureMail";
import { clientMailOrganisme } from "@/lib/mails/mailsAutomatiques";

export default function IzilearnMailPreview({ mail, organisme }: { mail: MailModele; organisme: OrganismeInfo }) {
  const [url, setUrl] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  useEffect(() => {
    let actif = true;
    let image: string | undefined;
    setUrl(null);
    setErreur(null);
    captureMail(mailPourCapture(mail, organisme), clientMailOrganisme(organisme)).then((blob) => {
      if (!actif) return;
      image = URL.createObjectURL(blob);
      setUrl(image);
    }).catch((e: unknown) => { if (actif) setErreur(e instanceof Error ? e.message : "Capture impossible"); });
    return () => { actif = false; if (image) URL.revokeObjectURL(image); };
  }, [mail, organisme]);
  return <div className="flex-1 min-h-0 overflow-auto bg-background p-3">
    {url ? <img src={url} alt={`Capture du mail — ${mail.objet}`} className="w-full h-auto" /> :
      <div className="flex items-center justify-center gap-2 h-full text-sm text-muted-foreground" role="status">
        {erreur || <><Loader2 className="w-5 h-5 animate-spin" />Préparation de la capture…</>}
      </div>}
  </div>;
}