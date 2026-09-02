// Generate official DP (Dossier Professionnel) content via Lovable AI
// Returns realistic per-trainee professional examples for each activité-type

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ActiviteType {
  titre: string;
  competences: string[];
}

interface ReqBody {
  intituleTitre: string;
  codeRNCP: string;
  activites: ActiviteType[];
  stagiaire: { prenom: string; nom: string; entreprise?: string; civilite?: string };
  periode: string;
  domaine: string;
}

import { createClient as __createAuthClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

async function __requireAuth(req: Request): Promise<Response | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const supabase = __createAuthClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data, error } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
  if (error || !data?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  return null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const __authErr = await __requireAuth(req);
  if (__authErr) return __authErr;


  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const body = (await req.json()) as ReqBody;
    const { intituleTitre, activites, stagiaire, periode, domaine } = body;

    const fullName = `${stagiaire.prenom} ${stagiaire.nom}`.trim();
    const civ = stagiaire.civilite === "Madame" ? "elle" : "il";
    const entreprise = stagiaire.entreprise || "[entreprise d'accueil]";

    const systemPrompt = `Tu es un expert français en rédaction de Dossiers Professionnels (DP) pour les Titres Professionnels du Ministère du Travail.
Tu rédiges du contenu RÉALISTE, PROFESSIONNEL et COHÉRENT à la première personne du singulier ("je"), comme si le candidat l'avait écrit lui-même.
Le contenu doit être FACTUEL, structuré, et adapté au métier visé. Pas de tournures génériques creuses.
Tu réponds STRICTEMENT au format JSON demandé.`;

    const userPrompt = `Rédige les exemples de pratique professionnelle pour le DP suivant :

CANDIDAT : ${fullName} (${civ})
ENTREPRISE D'ACCUEIL : ${entreprise}
TITRE VISÉ : ${intituleTitre}
DOMAINE : ${domaine}
PÉRIODE : ${periode}

ACTIVITÉS-TYPES À COUVRIR :
${activites.map((a, i) => `${i + 1}. ${a.titre}\n   Compétences associées :\n${a.competences.map(c => `   - ${c}`).join("\n")}`).join("\n\n")}

Pour CHAQUE activité-type, génère 1 exemple de pratique professionnelle CONCRET et UNIQUE comprenant :
- intitule : titre de l'opération/mission (15-25 mots, très spécifique au métier)
- tache : description de la tâche réalisée à la 1ère personne (150-200 mots, factuelle, étapes claires)
- moyens : moyens humains/matériels/techniques mobilisés (80-120 mots, outils précis du métier)
- collegues : collaborations/parties prenantes (60-90 mots, rôles précis)

Tous les exemples doivent être DIFFÉRENTS, COHÉRENTS entre eux, et adaptés à l'entreprise ${entreprise}.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_dp_examples",
              description: "Return DP professional examples per activité-type",
              parameters: {
                type: "object",
                properties: {
                  exemples: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        intitule: { type: "string" },
                        tache: { type: "string" },
                        moyens: { type: "string" },
                        collegues: { type: "string" },
                      },
                      required: ["intitule", "tache", "moyens", "collegues"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["exemples"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_dp_examples" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit dépassé, réessayez plus tard." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits Lovable AI épuisés." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("Aucun tool_call retourné");
    const parsed = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-dp-officiel error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
