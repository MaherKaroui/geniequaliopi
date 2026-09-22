import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const gatewayUrl = "https://ai.gateway.lovable.dev/v1";
const model = "openai/gpt-image-2.5-sunburst";

async function requireAuth(req: Request): Promise<Response | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return new Response(JSON.stringify({ error: "Connectez-vous pour créer des logos." }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  const client = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data, error } = await client.auth.getUser(authHeader.slice(7));
  if (error || !data.user) return new Response(JSON.stringify({ error: "Votre session a expiré. Reconnectez-vous." }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  return null;
}

const forward = (upstream: Response) => new Response(upstream.body, {
  status: upstream.status,
  headers: {
    ...corsHeaders,
    "Content-Type": upstream.headers.get("Content-Type") || "application/json",
    "Cache-Control": "no-cache",
  },
});

serve(async req => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const authError = await requireAuth(req);
  if (authError) return authError;
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return new Response(JSON.stringify({ error: "La création de logo n'est pas configurée." }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const contentType = req.headers.get("Content-Type") || "";
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const prompt = form.get("prompt");
      const images = form.getAll("image[]").filter(value => value instanceof File);
      if (typeof prompt !== "string" || !prompt.trim() || images.length === 0) return new Response(JSON.stringify({ error: "Nom et images de référence requis." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      form.set("model", model);
      form.set("quality", "medium");
      form.set("size", "1024x1024");
      form.set("background", "transparent");
      form.set("output_format", "png");
      const streaming = form.get("stream") !== "false";
      if (streaming) { form.set("stream", "true"); form.set("partial_images", "1"); }
      else { form.delete("stream"); form.delete("partial_images"); }
      form.delete("image[]");
      images.forEach(image => form.append("image[]", image));
      const upstream = await fetch(`${gatewayUrl}/images/edits`, { method: "POST", headers: { Authorization: `Bearer ${apiKey}` }, body: form });
      return forward(upstream);
    }

    const body = await req.json();
    if (typeof body.prompt !== "string" || !body.prompt.trim()) return new Response(JSON.stringify({ error: "Le nom de l'organisme est requis." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const streaming = body.stream !== false;
    const upstream = await fetch(`${gatewayUrl}/images/generations`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt: body.prompt,
        quality: "medium",
        size: "1024x1024",
        background: "transparent",
        output_format: "png",
        ...(streaming ? { stream: true, partial_images: 1 } : {}),
      }),
    });
    return forward(upstream);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Création impossible.";
    return new Response(JSON.stringify({ error: message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});