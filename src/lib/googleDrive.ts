/**
 * Google Drive integration – OAuth token flow (Google Identity Services) +
 * envoi direct depuis le navigateur vers l'API Drive.
 */
import { supabase } from "@/integrations/supabase/client";

let cachedClientId: string | null = null;

/** Client ID Google : VITE_GOOGLE_CLIENT_ID, sinon le secret `google_drive_api` de l'edge function. */
export async function getGoogleClientId(): Promise<string> {
  if (cachedClientId) return cachedClientId;
  const fromEnv = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
  if (fromEnv) return (cachedClientId = fromEnv);

  // L'edge function exige un utilisateur connecté : on passe le jeton de session.
  const { data: session } = await supabase.auth.getSession();
  const token = session.session?.access_token ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const resp = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-drive-upload?action=config`,
    { headers: { Authorization: `Bearer ${token}`, apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
  );
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data.clientId) {
    throw new Error(data.error || "Client ID Google Drive non configuré (secret google_drive_api)");
  }
  cachedClientId = data.clientId;
  return data.clientId;
}

/** Load the Google Identity Services script */
function loadGisScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).google?.accounts?.oauth2) {
      resolve();
      return;
    }
    const existing = document.getElementById("gis-script");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Google Identity Services")));
      return;
    }
    const script = document.createElement("script");
    script.id = "gis-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Identity Services"));
    document.head.appendChild(script);
  });
}

/** Request an OAuth access token with Drive file scope */
export function requestDriveAccessToken(clientId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/drive.file",
      callback: (response: any) => {
        if (response.error) {
          reject(new Error(response.error));
          return;
        }
        resolve(response.access_token);
      },
      error_callback: (err: any) => reject(new Error(err?.type === "popup_failed_to_open" ? "popup" : err?.type || "popup_closed")),
    });
    tokenClient.requestAccessToken();
  });
}

/** Ouvre la fenêtre de consentement Google. À appeler dès le clic (sinon le navigateur bloque la pop-up). */
export async function connecterGoogleDrive(): Promise<string> {
  const clientId = await getGoogleClientId();
  await loadGisScript();
  return requestDriveAccessToken(clientId);
}

// ─── Envoi d'un dossier complet (arborescence du ZIP) directement dans Drive ───

const DRIVE_API = "https://www.googleapis.com/drive/v3/files";
const DRIVE_UPLOAD = "https://www.googleapis.com/upload/drive/v3/files";
const FOLDER_MIME = "application/vnd.google-apps.folder";
const SEUIL_RESUMABLE = 5 * 1024 * 1024;

async function driveFetch(url: string, init: RequestInit, accessToken: string): Promise<Response> {
  for (let essai = 0; ; essai++) {
    const resp = await fetch(url, { ...init, headers: { ...(init.headers || {}), Authorization: `Bearer ${accessToken}` } });
    if (resp.ok) return resp;
    // Quotas Google (429, 403 rateLimitExceeded) et erreurs serveur : on réessaie avec un délai croissant.
    const detail = await resp.text().catch(() => "");
    const reessayable = resp.status === 429 || resp.status >= 500 || (resp.status === 403 && /rateLimit/i.test(detail));
    if (!reessayable || essai >= 5) throw new Error(`Google Drive ${resp.status} : ${detail.slice(0, 200)}`);
    await new Promise((r) => setTimeout(r, 1000 * 2 ** essai + Math.random() * 500));
  }
}

async function creerDossierDrive(nom: string, parentId: string | null, accessToken: string): Promise<string> {
  const resp = await driveFetch(`${DRIVE_API}?fields=id`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nom, mimeType: FOLDER_MIME, ...(parentId ? { parents: [parentId] } : {}) }),
  }, accessToken);
  return (await resp.json()).id;
}

async function envoyerFichierDrive(nom: string, data: Blob, parentId: string, accessToken: string): Promise<void> {
  const metadata = { name: nom, parents: [parentId] };
  if (data.size <= SEUIL_RESUMABLE) {
    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("file", data);
    await driveFetch(`${DRIVE_UPLOAD}?uploadType=multipart&fields=id`, { method: "POST", body: form }, accessToken);
    return;
  }
  // Au-delà de 5 Mo : session « resumable », contenu envoyé en une requête.
  const init = await driveFetch(`${DRIVE_UPLOAD}?uploadType=resumable&fields=id`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(metadata),
  }, accessToken);
  const sessionUrl = init.headers.get("Location");
  if (!sessionUrl) throw new Error("Google Drive : session d'envoi non ouverte");
  await driveFetch(sessionUrl, { method: "PUT", body: data }, accessToken);
}

/**
 * Recrée l'arborescence d'un ZIP dans « Mon Drive » sous un dossier `nomRacine`
 * et y envoie chaque fichier (4 envois en parallèle). Retourne le lien du dossier.
 */
export async function envoyerZipDansDrive(
  zipBlob: Blob,
  nomRacine: string,
  accessToken: string,
  onProgress?: (fait: number, total: number) => void,
): Promise<{ folderId: string; webViewLink: string; envoyes: number }> {
  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(zipBlob);
  const fichiers = Object.values(zip.files).filter((f) => !f.dir);

  const racineId = await creerDossierDrive(nomRacine, null, accessToken);
  // Une promesse par dossier : deux fichiers du même dossier ne le créent pas deux fois.
  const dossiers = new Map<string, Promise<string>>([["", Promise.resolve(racineId)]]);
  const dossierId = (chemin: string): Promise<string> => {
    let id = dossiers.get(chemin);
    if (!id) {
      const coupe = chemin.lastIndexOf("/");
      const parent = coupe >= 0 ? chemin.slice(0, coupe) : "";
      id = dossierId(parent).then((pid) => creerDossierDrive(chemin.slice(coupe + 1), pid, accessToken));
      dossiers.set(chemin, id);
    }
    return id;
  };

  let fait = 0;
  onProgress?.(0, fichiers.length);
  const aEnvoyer = [...fichiers];
  const ouvrier = async () => {
    for (let f = aEnvoyer.shift(); f; f = aEnvoyer.shift()) {
      const coupe = f.name.lastIndexOf("/");
      const parentId = await dossierId(coupe >= 0 ? f.name.slice(0, coupe) : "");
      await envoyerFichierDrive(f.name.slice(coupe + 1), await f.async("blob"), parentId, accessToken);
      fait++;
      onProgress?.(fait, fichiers.length);
    }
  };
  await Promise.all(Array.from({ length: 4 }, ouvrier));

  return { folderId: racineId, webViewLink: `https://drive.google.com/drive/folders/${racineId}`, envoyes: fait };
}
