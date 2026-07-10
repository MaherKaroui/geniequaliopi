const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TOOL = {
  type: "function",
  function: {
    name: "suggest_rncp",
    description: "Propose 3 à 5 certifications RNCP pertinentes pour ce candidat VAE",
    parameters: {
      type: "object",
      properties: {
        suggestions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              rncp: { type: "string", description: "Code RNCP (ex : 38362)" },
              intitule: { type: "string", description: "Intitulé exact de la certification" },
              niveau: { type: "string", description: "Niveau (3, 4, 5, 6, 7)" },
              certificateur: { type: "string" },
              justification: { type: "string", description: "1-2 phrases expliquant pourquoi ce RNCP correspond au CV" },
            },
            required: ["rncp", "intitule", "niveau", "justification"],
          },
        },
      },
      required: ["suggestions"],
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { candidat } = await req.json();
    if (!candidat) throw new Error("candidat required");

    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `Analyse ce parcours professionnel et propose 3 à 5 certifications RNCP françaises (France Compétences) réellement existantes et cohérentes avec l'expérience du candidat, en vue d'une VAE.

Règles :
- Utilise des codes RNCP valides (5 chiffres) et des intitulés exacts.
- Priorise les certifications ACTIVES dont le niveau correspond au poste et à l'expérience.
- Classe les suggestions de la plus pertinente à la moins pertinente.
- Justifie chaque proposition en reliant les expériences du CV aux compétences visées.

CANDIDAT :
${JSON.stringify(candidat, null, 2)}

Renvoie via l'outil suggest_rncp.`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: "Tu es un conseiller VAE expert du répertoire RNCP France Compétences. Tu proposes uniquement des certifications réellement existantes avec leur code RNCP exact." },
          { role: "user", content: prompt },
        ],
        tools: [TOOL],
        tool_choice: { type: "function", function: { name: "suggest_rncp" } },
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
    console.error("vae-suggest-rncp error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
