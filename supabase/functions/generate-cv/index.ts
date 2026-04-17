import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es un expert en analyse et rédaction de CV de formateurs professionnels français.
- Si l'utilisateur fournit une description courte → invente un CV complet et réaliste.
- Si l'utilisateur fournit un CV existant (texte, image ou PDF) → EXTRAIS fidèlement les informations réelles présentes dans le document. Ne change RIEN aux données réelles. Complète uniquement les champs manquants si vraiment vides.

Réponds via l'appel d'outil generate_cv avec un JSON strict.
Les niveaux de compétence vont de 1 à 5. Génère au moins 3 expériences, 2 formations, 5 compétences, 2 langues, 2 certifications quand c'est possible.`;

const TOOL_SCHEMA = {
  type: "function",
  function: {
    name: "generate_cv",
    description: "Generate or extract a complete CV",
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
            properties: { nom: { type: "string" }, niveau: { type: "number" } },
            required: ["nom", "niveau"],
          },
        },
        langues: {
          type: "array",
          items: {
            type: "object",
            properties: { langue: { type: "string" }, niveau: { type: "string" } },
            required: ["langue", "niveau"],
          },
        },
        certifications: {
          type: "array",
          items: {
            type: "object",
            properties: { nom: { type: "string" }, annee: { type: "string" } },
            required: ["nom", "annee"],
          },
        },
        experiencePedagogique: { type: "string" },
        publications: { type: "string" },
      },
      required: ["prenom", "nom", "titre", "email", "telephone", "adresse", "profil", "specialites", "experiences", "formations", "competences", "langues", "certifications", "experiencePedagogique", "publications"],
    },
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { description, fileDataUrl, fileType } = body;

    const hasDesc = typeof description === "string" && description.trim().length > 0;
    const hasFile = typeof fileDataUrl === "string" && fileDataUrl.startsWith("data:");

    if (!hasDesc && !hasFile) {
      return new Response(JSON.stringify({ error: "Description ou fichier requis" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build user message - supports image/PDF input via Gemini multimodal.
    const userContent: any[] = [];
    if (hasDesc) {
      userContent.push({ type: "text", text: description });
    }
    if (hasFile) {
      userContent.push({
        type: "text",
        text: hasDesc
          ? "Extrait fidèlement les infos du CV ci-joint, complète avec la description ci-dessus si besoin."
          : "Extrait fidèlement TOUTES les informations de ce CV (nom, prénom, expériences, formations, compétences, langues, certifications, contact). Ne romance pas, garde les vraies données.",
      });
      // Gemini supports image_url with data URLs (image/* and application/pdf).
      userContent.push({
        type: "image_url",
        image_url: { url: fileDataUrl },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
        tools: [TOOL_SCHEMA],
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
