import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function requireAuth(req: Request): Promise<Response | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data, error } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
  if (error || !data?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  return null;
}

const TOOL = {
  type: "function",
  function: {
    name: "generate_vae_contents",
    parameters: {
      type: "object",
      properties: {
        motivation: { type: "string", description: "Motivation du candidat (10-15 lignes)" },
        parcours: { type: "string", description: "Synthèse du parcours professionnel (10-15 lignes)" },
        situationsParBloc: {
          type: "array",
          items: {
            type: "object",
            properties: {
              codeBloc: { type: "string" }, intitule: { type: "string" },
              situations: { type: "string", description: "Description détaillée des situations de travail (15-25 lignes)" },
            },
            required: ["codeBloc", "intitule", "situations"],
          },
        },
        besoins: {
          type: "object",
          properties: {
            attentes: { type: "string" }, freins: { type: "string" }, disponibilites: { type: "string" },
            materiel: { type: "string" }, handicap: { type: "string" },
          },
          required: ["attentes", "freins", "disponibilites", "materiel", "handicap"],
        },
        planAccompagnement: { type: "string" },
        synthese: { type: "string" },
      },
      required: ["motivation", "parcours", "situationsParBloc", "besoins", "planAccompagnement", "synthese"],
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const authErr = await requireAuth(req);
  if (authErr) return authErr;

  try {
    const { candidat, certification, organisme, session } = await req.json();
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `Contexte : dossier VAE.

ORGANISME : ${JSON.stringify(organisme)}
CERTIFICATION : ${JSON.stringify(certification)}
CANDIDAT : ${JSON.stringify(candidat)}
SESSION : ${JSON.stringify(session)}

Rédige les contenus personnalisés du dossier VAE (français professionnel, ton adapté à un jury de certification). 
Pour situationsParBloc, produis UNE entrée par bloc de compétences de la certification, décrivant précisément comment le candidat a exercé les activités correspondantes dans son parcours réel (en t'appuyant sur ses expériences).
Renvoie via generate_vae_contents.`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: "Tu es un accompagnateur VAE expérimenté qui rédige des contenus de dossier crédibles et personnalisés." },
          { role: "user", content: prompt },
        ],
        tools: [TOOL],
        tool_choice: { type: "function", function: { name: "generate_vae_contents" } },
      }),
    });

    if (!r.ok) {
      if (r.status === 429) return new Response(JSON.stringify({ error: "Trop de requêtes" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (r.status === 402) return new Response(JSON.stringify({ error: "Crédits IA épuisés" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error("AI gateway error");
    }
    const data = await r.json();
    const tc = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!tc) throw new Error("No tool call");
    return new Response(tc.function.arguments, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("vae-generate-contents error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
