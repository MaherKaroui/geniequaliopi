import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es un expert en analyse et rédaction de CV de formateurs professionnels français.

RÈGLES STRICTES :
- Si l'utilisateur fournit une description courte → invente un CV complet et réaliste.
- Si l'utilisateur fournit un CV existant (image ou PDF) → LIS ATTENTIVEMENT TOUT le document de la première à la dernière page et EXTRAIS FIDÈLEMENT TOUTES les informations visibles.

EXTRACTION OBLIGATOIRE depuis le document fourni :
1. Identité complète : prenom, nom (séparés), email, téléphone, adresse
2. Titre professionnel / poste actuel
3. Profil / résumé professionnel (synthèse de 2-4 phrases)
4. TOUTES les expériences professionnelles visibles (poste, entreprise, dates de début/fin, description des missions). Liste-les TOUTES, pas seulement quelques-unes.
5. TOUTES les formations / diplômes visibles (intitulé, établissement, année)
6. TOUTES les compétences techniques mentionnées (avec un niveau de 1 à 5 estimé selon le contexte)
7. Langues maîtrisées avec niveau (A1-C2 ou natif/courant/intermédiaire)
8. Certifications obtenues
9. Expérience pédagogique éventuelle
10. Publications éventuelles

Si une section est absente du CV original, mets une chaîne vide "" pour les textes ou un tableau vide [] pour les listes — ne romance JAMAIS, ne hallucine pas.
Si le document est un CV scanné ou en PDF, examine attentivement chaque page comme une image et lis tout le texte visible.

Réponds OBLIGATOIREMENT via l'appel d'outil generate_cv avec un JSON strict respectant le schéma.`;

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
          : "Voici le CV à analyser. Lis CHAQUE PAGE attentivement et extrais TOUT le contenu : nom, prénom, email, téléphone, TOUTES les expériences professionnelles avec leurs descriptions, TOUTES les formations/diplômes, TOUTES les compétences techniques, langues, certifications. Ne saute aucune section. Appelle ensuite l'outil generate_cv avec le JSON complet.",
      });
      // Gemini supports image_url with data URLs (image/* and application/pdf).
      userContent.push({
        type: "image_url",
        image_url: { url: fileDataUrl },
      });
    }

    // Use gemini-2.5-pro for stronger multimodal extraction (better PDF reading).
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: hasFile ? "google/gemini-2.5-pro" : "google/gemini-2.5-flash",
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
    if (!toolCall) {
      console.error("No tool call. Raw response:", JSON.stringify(data).slice(0, 2000));
      throw new Error("No tool call in response");
    }

    const cvData = JSON.parse(toolCall.function.arguments);
    console.log("Extracted CV summary:", {
      prenom: cvData.prenom, nom: cvData.nom,
      experiences: cvData.experiences?.length || 0,
      formations: cvData.formations?.length || 0,
      competences: cvData.competences?.length || 0,
    });

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
