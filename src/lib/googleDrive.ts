/**
 * Google Drive integration – OAuth token flow + upload via edge function.
 */
import { supabase } from "@/integrations/supabase/client";

let cachedClientId: string | null = null;

/** Fetch the Google Client ID from the edge function */
export async function getGoogleClientId(): Promise<string> {
  if (cachedClientId) return cachedClientId;

  const resp = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-drive-upload?action=config`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
    }
  );

  if (!resp.ok) throw new Error("Failed to fetch Google Drive config");
  const data = await resp.json();
  cachedClientId = data.clientId;
  return data.clientId;
}

/** Load the Google Identity Services script */
function loadGisScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById("gis-script")) {
      resolve();
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
    });
    tokenClient.requestAccessToken();
  });
}

/** Upload a blob to Google Drive via the edge function */
export async function uploadToGoogleDrive(
  blob: Blob,
  fileName: string,
  accessToken: string,
  folderName?: string
): Promise<{ fileId: string; webViewLink: string }> {
  const formData = new FormData();
  formData.append("file", blob, fileName);
  formData.append("accessToken", accessToken);
  formData.append("fileName", fileName);
  if (folderName) formData.append("folderName", folderName);

  const resp = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-drive-upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: formData,
    }
  );

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: "Upload failed" }));
    throw new Error(err.error || "Google Drive upload failed");
  }

  return resp.json();
}

/** Full flow: load GIS → get token → upload */
export async function saveToDrive(
  blob: Blob,
  fileName: string,
  folderName?: string
): Promise<{ fileId: string; webViewLink: string }> {
  const clientId = await getGoogleClientId();
  await loadGisScript();
  const accessToken = await requestDriveAccessToken(clientId);
  return uploadToGoogleDrive(blob, fileName, accessToken, folderName);
}
