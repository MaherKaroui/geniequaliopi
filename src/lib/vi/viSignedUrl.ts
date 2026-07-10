/**
 * Resolve a signed URL for a file in the private `vi-pack` bucket.
 * Accepts either a raw object path (e.g. `files/...pdf`) or a legacy
 * public URL (`.../storage/v1/object/public/vi-pack/<path>`).
 */
import { supabase } from "@/integrations/supabase/client";

const PUBLIC_PREFIX_RE = /\/storage\/v1\/object\/public\/vi-pack\//;

export function extractViPath(urlOrPath: string): string {
  const m = urlOrPath.match(PUBLIC_PREFIX_RE);
  if (m) return urlOrPath.slice(m.index! + m[0].length);
  return urlOrPath.replace(/^\/+/, "");
}

export async function getViSignedUrl(urlOrPath: string, expiresIn = 3600): Promise<string> {
  const path = extractViPath(urlOrPath);
  const { data, error } = await supabase.storage.from("vi-pack").createSignedUrl(path, expiresIn);
  if (error || !data?.signedUrl) {
    throw new Error(error?.message || "Impossible de générer l'URL signée");
  }
  return data.signedUrl;
}
