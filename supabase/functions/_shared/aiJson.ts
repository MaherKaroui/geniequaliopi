// Appel IA (Responses API, streaming) retournant un objet JSON conforme à un schéma strict.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

export const MODEL = "openai/gpt-6-astra";

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export async function requireAuth(req: Request): Promise<Response | null> {
  const h = req.headers.get("Authorization");
  if (!h?.startsWith("Bearer ")) return json({ error: "Connexion requise" }, 401);
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data, error } = await sb.auth.getUser(h.replace("Bearer ", ""));
  if (error || !data?.user) return json({ error: "Connexion requise" }, 401);
  return null;
}

export class AiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

/** Construit le contenu utilisateur : texte + fichier (PDF → input_file, image → input_image). */
export function userContent(text: string, fileDataUrl?: string, filename = "document.pdf") {
  const content: Record<string, unknown>[] = [{ type: "input_text", text }];
  if (fileDataUrl) {
    if (fileDataUrl.startsWith("data:image/")) content.push({ type: "input_image", image_url: fileDataUrl });
    else content.push({ type: "input_file", filename, file_data: fileDataUrl });
  }
  return content;
}

export async function aiJson(
  req: Request,
  system: string,
  content: Record<string, unknown>[],
  schemaName: string,
  schema: Record<string, unknown>,
): Promise<any> {
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) throw new AiError(500, "Clé IA non configurée");
  const runId = req.headers.get("X-Lovable-AIG-Run-ID") || undefined;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Lovable-API-Key": key,
    "X-Lovable-AIG-SDK": "fetch",
  };
  if (runId) headers["X-Lovable-AIG-Run-ID"] = runId;
  const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    signal: req.signal,
    headers,
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      store: false,
      reasoning: { effort: "low", summary: "auto" },
      include: ["reasoning.encrypted_content"],
      input: [
        { role: "system", content: system },
        { role: "user", content },
      ],
      text: { format: { type: "json_schema", name: schemaName, strict: true, schema } },
    }),
  });
  if (!res.ok || !res.body) {
    const t = await res.text().catch(() => "");
    console.error("AI error", res.status, t.slice(0, 800));
    if (res.status === 429) throw new AiError(429, "Trop de requêtes IA, réessayez dans quelques instants.");
    if (res.status === 402) throw new AiError(402, "Crédits IA épuisés (Paramètres → Plans & crédits).");
    if (res.status === 403) throw new AiError(403, "Accès au modèle IA refusé pour cet espace de travail.");
    throw new AiError(res.status >= 500 ? 502 : 400, "Erreur du service IA lors de l'analyse.");
  }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "", out = "", final = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, idx).trim();
      buf = buf.slice(idx + 1);
      if (!line.startsWith("data:")) continue;
      const d = line.slice(5).trim();
      if (!d || d === "[DONE]") continue;
      try {
        const ev = JSON.parse(d);
        if (ev.type === "response.output_text.delta") out += ev.delta ?? "";
        else if (ev.type === "response.output_text.done" && ev.text) final = ev.text;
        else if (ev.type === "response.failed" || ev.type === "error") {
          console.error("AI stream error", d.slice(0, 500));
          throw new AiError(502, "L'analyse IA a échoué.");
        }
      } catch (e) { if (e instanceof AiError) throw e; }
    }
  }
  const text = final || out;
  if (!text.trim()) throw new AiError(422, "Le modèle n'a renvoyé aucune donnée.");
  try { return JSON.parse(text); } catch { throw new AiError(502, "Réponse IA illisible."); }
}

/** Utilitaires de schéma strict */
export const S = (d?: string) => ({ type: "string", ...(d ? { description: d } : {}) });
export const N = (d?: string) => ({ type: ["number", "null"], ...(d ? { description: d } : {}) });
export const obj = (props: Record<string, unknown>) => ({
  type: "object", properties: props, required: Object.keys(props), additionalProperties: false,
});
export const arr = (items: unknown) => ({ type: "array", items });
