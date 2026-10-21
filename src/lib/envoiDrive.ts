/**
 * Bouton « Envoyer dans Google Drive » commun aux dossiers AF/CFA, VAE et BDC :
 * consentement Google dès le clic, génération du ZIP, dépôt de l'arborescence
 * dans Mon Drive, suivi dans un toast. Continue onglet masqué (garderActif).
 */
import { toast } from "sonner";
import { garderActif } from "@/lib/arrierePlan";
import { connecterGoogleDrive, envoyerZipDansDrive } from "@/lib/googleDrive";

export type SuiviGeneration = (avancement: number | string) => void;

export interface DossierDrive {
  /** Nom du dossier créé à la racine de Mon Drive. */
  nomRacine: string;
  /** Construit le ZIP ; `suivi` reçoit un pourcentage ou un message. */
  construire: (suivi: SuiviGeneration) => Promise<Blob>;
}

/** Retourne true si tous les dossiers ont été déposés. */
export async function envoyerDossiersDansDrive(dossiers: DossierDrive[]): Promise<boolean> {
  const toastId = toast.loading("Connexion à Google Drive…");
  try {
    return await garderActif(async () => {
      // La fenêtre Google doit s'ouvrir pendant le clic, avant la génération.
      const accessToken = await connecterGoogleDrive();
      for (const [i, dossier] of dossiers.entries()) {
        const rang = dossiers.length > 1 ? ` (${i + 1}/${dossiers.length})` : "";
        const zipBlob = await dossier.construire((avancement) => {
          const texte = typeof avancement === "number" ? `${Math.round(avancement)} %` : avancement;
          toast.loading(`Génération du dossier${rang}… ${texte}`, { id: toastId });
        });
        const result = await envoyerZipDansDrive(zipBlob, dossier.nomRacine, accessToken, (fait, total) => {
          toast.loading(`Envoi dans Google Drive${rang}… ${fait} / ${total} fichiers`, { id: toastId });
        });
        toast.success(`Dossier déposé dans Google Drive (${result.envoyes} fichiers)`, {
          id: i === dossiers.length - 1 ? toastId : undefined,
          description: dossier.nomRacine,
          duration: 20000,
          action: { label: "Ouvrir", onClick: () => window.open(result.webViewLink, "_blank") },
        });
      }
      return true;
    });
  } catch (error: any) {
    console.error("Google Drive upload error:", error);
    const message = String(error?.message || error);
    if (/popup/i.test(message)) {
      toast.error("Autorisez la fenêtre pop-up de Google pour envoyer le dossier dans Drive.", { id: toastId });
    } else if (/access_denied/i.test(message)) {
      toast.error("Accès à Google Drive refusé.", { id: toastId });
    } else {
      toast.error(`Envoi dans Google Drive impossible : ${message}`, { id: toastId, duration: 15000 });
    }
    return false;
  }
}
