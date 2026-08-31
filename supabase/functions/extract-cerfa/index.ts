import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es un expert en extraction de données de formulaires CERFA français (notamment le contrat d'apprentissage Cerfa N°10103*14).
À partir du PDF fourni, extrait UNIQUEMENT les informations demandées dans le schéma. 
Règles strictes :
- N'invente JAMAIS de données. Si une info est absente, retourne une chaîne vide "".
- Dates au format ISO YYYY-MM-DD (convertis depuis DD/MM/YYYY).
- Civilité : "M." ou "Mme" uniquement.
- Téléphone : format français "01 23 45 67 89" si présent.
- Pour le NIR (numéro de sécurité sociale), retourne tel quel.
- Pour l'employeur : raison sociale, SIRET (14 chiffres), adresse complète sur une ligne.`;

const TOOL_SCHEMA = {
  type: "function",
  function: {
    name: "extract_cerfa",
    description: "Extrait les données d'un CERFA contrat d'apprentissage",
    parameters: {
      type: "object",
      properties: {
        civilite: { type: "string", enum: ["", "M.", "Mme"] },
        nom: { type: "string" },
        prenom: { type: "string" },
        email: { type: "string" },
        telephone: { type: "string" },
        dateNaissance: { type: "string", description: "YYYY-MM-DD" },
        adresse: { type: "string" },
        codePostal: { type: "string" },
        commune: { type: "string" },
        nationalite: { type: "string" },
        nir: { type: "string" },
        departementNaissance: { type: "string" },
        communeNaissance: { type: "string" },
        diplome: { type: "string", description: "Diplôme/titre visé" },
        entreprise: { type: "string", description: "Raison sociale employeur" },
        siretEntreprise: { type: "string" },
        adresseEntreprise: { type: "string" },
        responsableEntreprise: { type: "string", description: "Nom du représentant employeur" },
        poste: { type: "string", description: "Emploi occupé / poste" },
      },
      required: ["nom", "prenom"],
      additionalProperties: false,
    },
  },
};

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

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const __authErr = await __requireAuth(req);
  if (__authErr) return __authErr;

  try {
    const { fileDataUrl } = await req.json();
    if (!fileDataUrl) {
      return new Response(JSON.stringify({ error: "fileDataUrl requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY non configuré");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: "Extrait les données du stagiaire et de l'employeur depuis ce CERFA." },
              { type: "image_url", image_url: { url: fileDataUrl } },
            ],
          },
        ],
        tools: [TOOL_SCHEMA],
        tool_choice: { type: "function", function: { name: "extract_cerfa" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, réessayez plus tard." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits Lovable AI épuisés." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erreur lors de l'extraction" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("Pas de tool_call dans la réponse:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "Aucune donnée extraite du PDF" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const extracted = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(extracted), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("extract-cerfa error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
