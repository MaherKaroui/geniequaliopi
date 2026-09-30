/**
 * Capture d'un mail dans la réplique Gmail ou Outlook embarquée (public/mail-sites/).
 * La page est chargée dans une iframe hors écran (même origine), pré-remplie via
 * window.__prefill, agrandie à la hauteur de son contenu puis rendue en PNG
 * (modern-screenshot : rendu fidèle par le navigateur lui-même).
 */
import { domToBlob } from "modern-screenshot";
import { payloadCapture, type ClientMail, type MailAuto } from "./mailsAutomatiques";

const LARGEUR = 1400;
const HAUTEUR_MIN = 900;

function chargerIframe(client: ClientMail): Promise<HTMLIFrameElement> {
  return new Promise((resolve, reject) => {
    const f = document.createElement("iframe");
    f.setAttribute("aria-hidden", "true");
    f.style.cssText = `position:fixed;left:-20000px;top:0;width:${LARGEUR}px;height:${HAUTEUR_MIN}px;border:0;visibility:visible;pointer-events:none`;
    const timer = setTimeout(() => reject(new Error("Chargement du modèle de mail trop long")), 20000);
    f.onload = () => {
      clearTimeout(timer);
      const w = f.contentWindow as any;
      if (!w || !w.__prefill) { reject(new Error("Modèle de mail invalide")); return; }
      resolve(f);
    };
    f.src = `/mail-sites/${client}.html?capture=1&t=${Date.now()}`;
    document.body.appendChild(f);
  });
}

const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Rend un mail en image PNG. `precedents` alimente la liste de gauche d'Outlook. */
export async function captureMail(m: MailAuto, client: ClientMail, precedents: MailAuto[] = [], scale = 1.5): Promise<Blob> {
  const iframe = await chargerIframe(client);
  try {
    const w = iframe.contentWindow as any;
    const doc = iframe.contentDocument!;
    w.__prefill(payloadCapture(m, client, precedents));
    try { await (doc as any).fonts?.ready; } catch { /* sans objet */ }
    await pause(250);
    // Hauteur : toute la conversation doit être visible.
    let hauteur = HAUTEUR_MIN;
    if (client === "outlook") {
      const lecture = doc.querySelector(".reading") as HTMLElement | null;
      if (lecture) hauteur += Math.max(0, lecture.scrollHeight - lecture.clientHeight);
    } else {
      hauteur = Math.max(HAUTEUR_MIN, doc.documentElement.scrollHeight);
    }
    hauteur = Math.min(hauteur, 4000);
    iframe.style.height = `${hauteur}px`;
    await pause(150);
    // Rendu par le moteur du navigateur (SVG foreignObject) : polices, icônes et
    // interlignes identiques à l'écran, contrairement à html2canvas.
    return await domToBlob(doc.documentElement, {
      width: LARGEUR, height: hauteur, scale, backgroundColor: "#ffffff", type: "image/png",
    });
  } finally {
    iframe.remove();
  }
}
