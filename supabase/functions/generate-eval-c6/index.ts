// Generate Qualiopi/EDOF/OPCO C6 evaluation pack via Lovable AI (Gemini)
// Returns: { qcmDebut[10], qcmFin[10], exerciceIntermediaire(4 questions), evaluationFinale(5 exercises) }

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu es expert formation professionnelle Qualiopi.
Tu génères un pack d'évaluation 100% cohérent avec l'intitulé de formation fourni.
RÈGLES STRICTES :
- Toutes les questions doivent porter sur le métier/contenu réel de la formation (pas générique).
- QCM : 4 options A/B/C/D, une seule réponse correcte, indique correctIndex (0-3).
- Pour exerciceIntermediaire et evaluationFinale : questions ouvertes avec correction détaillée (3-6 lignes).
- Réponse en FRANÇAIS uniquement.
- Niveau adapté : positionnement début = bases, positionnement fin = avancé/synthèse.
- Pour chaque exercice de evaluationFinale, produis un corrigé formateur COMPLET en 4 parties :
  1) consigneDetaillee : situation professionnelle, matériel/documents fournis, livrable attendu, durée allouée, conditions (individuel/binôme, documents autorisés, poste)
  2) reponseDeveloppee : déroulé complet étape par étape dans l'ordre opératoire, avec valeurs, seuils, références et gestes techniques précis du métier (plusieurs paragraphes)
  3) criteresEvaluation : 5 à 7 critères OBSERVABLES avec indicateur de réussite et points, total EXACTEMENT 20, + seuilValidation et criteresEliminatoires (sécurité)
  4) erreursFrequentes : 3 à 5 erreurs réelles, lacune révélée, remédiation proposée
- Ajoute un guidePassation formateur pour l'ensemble de la formation.
- Jamais de formulation générique : cite le matériel, les normes, les valeurs et les gestes du métier concerné.
- Réponds UNIQUEMENT via l'appel d'outil, jamais en texte libre.`;

const TOOL_SCHEMA = {
  type: "function",
  function: {
    name: "generate_eval_pack",
    description: "Génère le pack d'évaluation complet pour la formation",
    parameters: {
      type: "object",
      properties: {
        qcmDebut: {
          type: "array",
          minItems: 10,
          maxItems: 10,
          items: {
            type: "object",
            properties: {
              question: { type: "string" },
              options: { type: "array", minItems: 4, maxItems: 4, items: { type: "string" } },
              correctIndex: { type: "integer", minimum: 0, maximum: 3 },
            },
            required: ["question", "options", "correctIndex"],
          },
        },
        qcmFin: {
          type: "array",
          minItems: 10,
          maxItems: 10,
          items: {
            type: "object",
            properties: {
              question: { type: "string" },
              options: { type: "array", minItems: 4, maxItems: 4, items: { type: "string" } },
              correctIndex: { type: "integer", minimum: 0, maximum: 3 },
            },
            required: ["question", "options", "correctIndex"],
          },
        },
        exerciceIntermediaire: {
          type: "object",
          properties: {
            titre: { type: "string" },
            contexte: { type: "string", description: "Mise en situation professionnelle (3-5 lignes)" },
            questions: {
              type: "array",
              minItems: 4,
              maxItems: 4,
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  reponseAttendue: { type: "string", description: "Corrigé attendu (3-5 lignes)" },
                  points: { type: "integer", minimum: 2, maximum: 10 },
                },
                required: ["question", "reponseAttendue", "points"],
              },
            },
          },
          required: ["titre", "contexte", "questions"],
        },
        evaluationFinale: {
          type: "object",
          properties: {
            titre: { type: "string" },
            exercices: {
              type: "array",
              minItems: 5,
              maxItems: 5,
              items: {
                type: "object",
                properties: {
                  titre: { type: "string" },
                  consigne: { type: "string", description: "Consigne pratique détaillée (4-8 lignes)" },
                  reponseAttendue: { type: "string", description: "Corrigé/critères de réussite (4-8 lignes)" },
                  points: { type: "integer", minimum: 2, maximum: 10 },
                  consigneDetaillee: { type: "string", description: "Situation professionnelle complète : contexte, matériel/documents mis à disposition, livrable attendu, conditions (individuel/binôme, documents autorisés, poste de travail). 6-10 lignes, spécifique au métier." },
                  dureeAllouee: { type: "string", description: "Durée allouée, ex. « 1 h 30 »" },
                  conditionsRealisation: { type: "string" },
                  materielFourni: { type: "string" },
                  livrableAttendu: { type: "string" },
                  reponseDeveloppee: { type: "string", description: "Déroulé complet, étape par étape, dans l'ordre opératoire, avec valeurs, seuils, références normatives et gestes techniques précis du métier. Plusieurs paragraphes (15-25 lignes), jamais générique." },
                  criteresEvaluation: {
                    type: "array",
                    description: "5 à 7 critères OBSERVABLES ; le total des points fait exactement 20",
                    items: {
                      type: "object",
                      properties: {
                        critere: { type: "string" },
                        indicateur: { type: "string", description: "Indicateur de réussite observable par le formateur" },
                        points: { type: "number" },
                      },
                      required: ["critere", "indicateur", "points"],
                    },
                  },
                  seuilValidation: { type: "string", description: "Ex. « 12/20 »" },
                  criteresEliminatoires: { type: "array", items: { type: "string" }, description: "Typiquement sécurité / EPI / respect d'un temps de sécurité" },
                  erreursFrequentes: {
                    type: "array",
                    description: "3 à 5 erreurs réellement observées sur ce type d'exercice",
                    items: {
                      type: "object",
                      properties: {
                        erreur: { type: "string" },
                        lacune: { type: "string" },
                        remediation: { type: "string" },
                      },
                      required: ["erreur", "lacune", "remediation"],
                    },
                  },
                },
                required: ["titre", "consigne", "reponseAttendue", "points", "consigneDetaillee", "reponseDeveloppee", "criteresEvaluation", "seuilValidation", "erreursFrequentes"],
              },
            },
          },
          required: ["titre", "exercices"],
        },
      },
        guidePassation: {
          type: "string",
          description: "Guide de passation formateur : introduction de l'exercice, aides autorisées et interdites, traçage de l'observation, restitution au stagiaire (10-15 lignes, spécifique au métier).",
        },
      },
      required: ["qcmDebut", "qcmFin", "exerciceIntermediaire", "evaluationFinale", "guidePassation"],
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const __authErr = await __requireAuth(req);
  if (__authErr) return __authErr;


  try {
    const { intitule, objectifs, contenu, publicVise, prerequis } = await req.json();
    if (!intitule) {
      return new Response(JSON.stringify({ error: "intitule requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY non configurée");

    const userPrompt = `Formation : « ${intitule} »
${objectifs ? `Objectifs : ${objectifs}\n` : ""}${contenu ? `Contenu : ${contenu}\n` : ""}${publicVise ? `Public : ${publicVise}\n` : ""}${prerequis ? `Prérequis : ${prerequis}\n` : ""}
Génère le pack d'évaluation complet (positionnement début 10 QCM, positionnement fin 10 QCM, exercice intermédiaire 4 questions ouvertes, évaluation finale 5 exercices pratiques) parfaitement cohérent avec ce métier/contenu.`;

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools: [TOOL_SCHEMA],
        tool_choice: { type: "function", function: { name: "generate_eval_pack" } },
      }),
    });

    if (!aiResp.ok) {
      const txt = await aiResp.text();
      console.error("AI gateway error", aiResp.status, txt);
      if (aiResp.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, réessayez dans un instant." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResp.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits IA épuisés. Ajoutez du crédit dans Lovable AI." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "Erreur passerelle IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("No tool call", JSON.stringify(data).slice(0, 500));
      return new Response(JSON.stringify({ error: "Réponse IA invalide" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const pack = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(pack), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-eval-c6 error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
