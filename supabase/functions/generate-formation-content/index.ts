// Edge function : Génération IA d'un PACK CONTENU pédagogique complet via Lovable AI (modèle fort)
// - Réponses d'évaluation des besoins (synthèse + adaptations + besoins individuels)
// - Support de cours détaillé (6 chapitres x 4-6 sections = 30+ pages)
// - Exercices avec corrigés
// - Ressources pédagogiques (supports, outils, vidéos, sites)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

async function requireAuth(req: Request): Promise<Response | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data, error } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
  if (error || !data?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  return null;
}

const SYSTEM_PROMPT = `Tu es un ingénieur pédagogique français expert en conformité Qualiopi (référentiel national qualité v9). Tu rédiges des contenus de formation COMPLETS, RÉALISTES, AUDIT-READY, en français professionnel impeccable, parfaitement cohérents avec l'intitulé, les objectifs et le programme fournis.

RÈGLES STRICTES :
- Tout le contenu est dense, concret, opérationnel, et **toujours cohérent avec le métier de la formation**.
- Le HTML est propre, sans <style> inline lourd : utilise <p>, <ul><li>, <strong>, <em>, <h4>, <table>, <br>. Pas de <script>. Pas de <html>/<body>.
- Les CHAPITRES sont 5, chacun avec 3 sections, chaque section avec un contenu HTML de **200 à 300 mots** (concis mais dense).
- Les EXERCICES sont 6, progressifs (du simple au complexe), avec **corrigés détaillés** (réponse attendue + critères d'évaluation).
- Les RÉPONSES D'ÉVALUATION DES BESOINS sont synthétisées sous forme de bullet HTML cohérents avec le métier et les profils types.
- Les RESSOURCES PÉDAGOGIQUES citent des **sites officiels, livres, normes, plateformes RÉELLES** du domaine (pas de liens inventés).
- Les VIDÉOS YouTube sont 5 URLs de **recherche YouTube** (format https://www.youtube.com/results?search_query=...) ciblées sur le métier.
- Les imageQuery sont 2-4 mots-clés en anglais simple pour Unsplash (ex: "office team meeting", "esthetician at work", "vtc driver car").

Tu utilises OBLIGATOIREMENT l'outil generate_content pour structurer ta réponse.`;

const CONTENT_TOOL = {
  type: "function",
  function: {
    name: "generate_content",
    description: "Génère un pack pédagogique complet pour une formation Qualiopi.",
    parameters: {
      type: "object",
      properties: {
        besoins: {
          type: "object",
          properties: {
            besoinsList: {
              type: "array",
              items: { type: "string" },
              description: "10-12 besoins individuels typiques (1 phrase chacun)",
            },
            syntheseHtml: { type: "string", description: "Synthèse HTML des besoins (5-7 bullets <br>)" },
            adaptationsHtml: { type: "string", description: "Adaptations pédagogiques (5-7 bullets <br>)" },
          },
          required: ["besoinsList", "syntheseHtml", "adaptationsHtml"],
        },
        chapters: {
          type: "array",
          description: "6 à 8 chapitres",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              imageQuery: { type: "string", description: "Mots-clés Unsplash en anglais" },
              sections: {
                type: "array",
                description: "4 à 6 sections par chapitre",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    contentHtml: { type: "string", description: "HTML dense 300-500 mots" },
                  },
                  required: ["title", "contentHtml"],
                },
              },
            },
            required: ["title", "description", "imageQuery", "sections"],
          },
        },
        exercises: {
          type: "array",
          description: "8 à 12 exercices progressifs",
          items: {
            type: "object",
            properties: {
              titre: { type: "string" },
              consigne: { type: "string" },
              reponseAttendue: { type: "string" },
              points: { type: "number" },
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
        guidePassation: {
          type: "string",
          description: "Guide de passation à l'usage du formateur : comment introduire l'exercice, ce qu'il peut ou ne peut pas aider, comment tracer l'observation, comment restituer au stagiaire. 10-15 lignes, spécifique au métier.",
        },
        ressources: {
          type: "object",
          properties: {
            supportsHtml: { type: "string" },
            outilsHtml: { type: "string" },
            ressourcesComplHtml: { type: "string" },
            videos: {
              type: "array",
              description: "5-6 vidéos YouTube",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  url: { type: "string" },
                },
                required: ["title", "description", "url"],
              },
            },
          },
          required: ["supportsHtml", "outilsHtml", "ressourcesComplHtml", "videos"],
        },
      },
      required: ["besoins", "chapters", "exercises", "ressources", "guidePassation"],
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  const authErr = await requireAuth(req);
  if (authErr) return authErr;

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY non configurée");

    const body = await req.json();
    const intitule = String(body?.intitule || "").trim();
    const objectifs = String(body?.objectifs || "").trim();
    const programme = String(body?.programme || "").trim();
    const publicVise = String(body?.publicVise || "").trim();
    const prerequis = String(body?.prerequis || "").trim();
    const nbStagiaires = Number(body?.nbStagiaires || 1);
    const humanizeBesoins = body?.humanizeBesoins !== false;

    const humanizeInstruction = humanizeBesoins
      ? `\n\nTON HUMANISÉ POUR LES BESOINS (obligatoire) :
- Les "besoinsList" sont rédigés à la 1ʳᵉ personne, avec un ton naturel, oral, spontané (comme si le stagiaire parlait à son formateur en RDV).
- Utilise des formulations variées : "J'aimerais vraiment…", "Franchement, j'ai du mal avec…", "Ce qui me bloque, c'est…", "Je voudrais gagner en confiance sur…", "Mon objectif c'est de…", "J'espère qu'à la fin je saurai…".
- Autorise petites hésitations, contractions ("j'ai", "c'est", "y'a"), et évite le style corporate/scolaire.
- La "syntheseHtml" mentionne des proportions ("6 stagiaires sur 6", "4 sur 6") avec des verbatims entre guillemets français « … », comme des extraits d'entretiens.
- Les "adaptationsHtml" restent professionnelles mais concrètes (pas de langue de bois).
- INTERDIT : "Il convient de", "Il est nécessaire de", "Par conséquent", "Notamment", "Afin de".`
      : "";


    if (!intitule || intitule.length < 3) {
      return new Response(JSON.stringify({ error: "intitule requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Modèle fort par défaut : gemini-2.5-pro
    const model = String(body?.model || "google/gemini-2.5-flash").trim();

    const userPrompt = `Génère le PACK CONTENU PÉDAGOGIQUE COMPLET pour la formation suivante :

INTITULÉ : ${intitule}
OBJECTIFS : ${objectifs || "(à déduire de l'intitulé)"}
PROGRAMME : ${programme || "(à déduire de l'intitulé)"}
PUBLIC VISÉ : ${publicVise || "(à déduire)"}
PRÉREQUIS : ${prerequis || "(à déduire)"}
NOMBRE DE STAGIAIRES : ${nbStagiaires}

Tu dois OBLIGATOIREMENT produire :
1. besoins (10 besoins individuels + synthèse + adaptations)
2. chapters : **5 chapitres**, **3 sections par chapitre**, **200-300 mots de HTML par section**
3. exercises : **6 exercices** progressifs. Pour CHAQUE exercice, un corrigé formateur en 4 parties :
   a) consigneDetaillee : situation professionnelle, matériel/documents fournis, livrable, durée, conditions de réalisation
   b) reponseDeveloppee : déroulé complet étape par étape dans l'ordre opératoire, avec valeurs, seuils, références et gestes techniques PRÉCIS du métier (plusieurs paragraphes)
   c) criteresEvaluation : 5 à 7 critères observables + indicateur de réussite + points, TOTAL EXACTEMENT 20, avec seuilValidation et criteresEliminatoires (sécurité)
   d) erreursFrequentes : 3 à 5 erreurs réelles, la lacune qu'elles révèlent, la remédiation du formateur
5. guidePassation : guide formateur pour la passation des exercices
4. ressources : supports, outils, 5 vidéos YouTube (URLs de recherche), sites/livres réels du domaine

Tout doit être 100% cohérent avec le métier "${intitule}".${humanizeInstruction}`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools: [CONTENT_TOOL],
        tool_choice: { type: "function", function: { name: "generate_content" } },
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requêtes IA atteinte." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits IA épuisés." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      return new Response(JSON.stringify({ error: "Erreur du service IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResponse.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("Réponse IA invalide:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "L'IA n'a pas retourné de structure valide." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let pack;
    try {
      pack = JSON.parse(toolCall.function.arguments);
    } catch (e) {
      console.error("JSON parse error:", e);
      return new Response(JSON.stringify({ error: "Réponse IA mal formée" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ pack }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-formation-content error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
