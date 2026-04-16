import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { description } = await req.json();
    if (!description || typeof description !== "string") {
      return new Response(JSON.stringify({ error: "Description requise" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Tu es un expert en rédaction de CV de formateurs professionnels français.
À partir d'une courte description, génère un CV complet et réaliste.
Invente des détails crédibles si nécessaire (dates, entreprises, certifications).
Réponds UNIQUEMENT avec le JSON suivant (pas de markdown, pas de commentaires) :

{
  "prenom": "string",
  "nom": "string",
  "titre": "string (titre professionnel)",
  "email": "string",
  "telephone": "string (format français)",
  "adresse": "string",
  "profil": "string (3-4 phrases résumé pro)",
  "specialites": "string (séparées par virgules)",
  "experiences": [{"poste":"string","entreprise":"string","dateDebut":"string","dateFin":"string","description":"string"}],
  "formations": [{"diplome":"string","etablissement":"string","annee":"string"}],
  "competences": [{"nom":"string","niveau":number_1_to_5}],
  "langues": [{"langue":"string","niveau":"string"}],
  "certifications": [{"nom":"string","annee":"string"}],
  "experiencePedagogique": "string (paragraphe détaillé)",
  "publications": "string"
}

Génère au moins 3 expériences, 2 formations, 5 compétences, 2 langues, 2 certifications.
Les niveaux de compétence vont de 1 à 5. Utilise des données réalistes françaises.`
          },
          {
            role: "user",
            content: description,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_cv",
              description: "Generate a complete CV from description",
              parameters: {
                type: "object",
                properties: {
                  prenom: { type: "string" },
                  nom: { type: "string" },
                  titre: { type: "string" },
                  email: { type: "string" },
                  telephone: { type: "string" },
                  adresse: { type: "string" },
                  profil: { type: "string" },
                  specialites: { type: "string" },
                  experiences: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        poste: { type: "string" },
                        entreprise: { type: "string" },
                        dateDebut: { type: "string" },
                        dateFin: { type: "string" },
                        description: { type: "string" },
                      },
                      required: ["poste", "entreprise", "dateDebut", "dateFin", "description"],
                    },
                  },
                  formations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        diplome: { type: "string" },
                        etablissement: { type: "string" },
                        annee: { type: "string" },
                      },
                      required: ["diplome", "etablissement", "annee"],
                    },
                  },
                  competences: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        nom: { type: "string" },
                        niveau: { type: "number" },
                      },
                      required: ["nom", "niveau"],
                    },
                  },
                  langues: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        langue: { type: "string" },
                        niveau: { type: "string" },
                      },
                      required: ["langue", "niveau"],
                    },
                  },
                  certifications: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        nom: { type: "string" },
                        annee: { type: "string" },
                      },
                      required: ["nom", "annee"],
                    },
                  },
                  experiencePedagogique: { type: "string" },
                  publications: { type: "string" },
                },
                required: ["prenom", "nom", "titre", "email", "telephone", "adresse", "profil", "specialites", "experiences", "formations", "competences", "langues", "certifications", "experiencePedagogique", "publications"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_cv" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, réessayez dans un instant." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits IA épuisés." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");

    const cvData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(cvData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-cv error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
