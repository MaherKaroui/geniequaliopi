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
    name: "generate_vae_cv",
    description: "Génère un CV VAE orienté vers la certification",
    parameters: {
      type: "object",
      properties: {
        candidat: {
          type: "object",
          properties: {
            civilite: { type: "string" }, prenom: { type: "string" }, nom: { type: "string" },
            dateNaissance: { type: "string" }, adresse: { type: "string" }, codePostal: { type: "string" },
            ville: { type: "string" }, telephone: { type: "string" }, email: { type: "string" },
            emploiActuel: { type: "string" }, employeur: { type: "string" }, statut: { type: "string" },
            niveauFormation: { type: "string" },
            diplomes: { type: "array", items: { type: "object", properties: { intitule: { type: "string" }, etablissement: { type: "string" }, annee: { type: "string" } }, required: ["intitule", "etablissement", "annee"] } },
            experiences: { type: "array", items: { type: "object", properties: { poste: { type: "string" }, entreprise: { type: "string" }, dateDebut: { type: "string" }, dateFin: { type: "string" }, missions: { type: "string" } }, required: ["poste", "entreprise", "dateDebut", "dateFin", "missions"] } },
            competences: { type: "array", items: { type: "string" } },
          },
          required: ["prenom", "nom", "email", "diplomes", "experiences"],
        },
        cvHtml: { type: "string", description: "CV professionnel complet au format HTML" },
      },
      required: ["candidat", "cvHtml"],
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const authErr = await requireAuth(req);
  if (authErr) return authErr;

  try {
    const { questionnaire, certification } = await req.json();
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `Rédige un CV professionnel complet, réaliste et orienté vers la certification suivante :
${JSON.stringify(certification, null, 2)}

À partir des informations fournies par le candidat :
${JSON.stringify(questionnaire, null, 2)}

Le CV doit :
- Reprendre l'identité et les coordonnées exactes
- Développer chaque expérience avec des missions détaillées et vocabulaire du métier visé
- Mettre en valeur les compétences alignées avec le référentiel de la certification
- Être au format HTML propre (balises h2/h3/p/ul), sans <html> ni <body>
Renvoie via l'outil generate_vae_cv.`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Tu rédiges des CV professionnels français pour dossiers VAE." },
          { role: "user", content: prompt },
        ],
        tools: [TOOL],
        tool_choice: { type: "function", function: { name: "generate_vae_cv" } },
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
    console.error("vae-generate-cv error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
