import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = "Tu es un accompagnateur VAE expérimenté. Tu rédiges TOUJOURS à la première personne du point de vue du candidat, en reliant chaque expérience du CV aux blocs de compétences du référentiel RNCP. Tu produis un texte ENTIÈREMENT rédigé, sans jamais laisser de pointillés, de placeholders, de parenthèses vides, de mentions '(à compléter)', 'À rédiger', 'À compléter', 'À rédiger avec le candidat', ni aucune phrase inachevée. Quand une donnée précise manque, tu inventes de façon plausible et cohérente avec le métier (outils métier standards, procédures classiques, exemples génériques du secteur). RÈGLE DE GENRE ABSOLUE : tu accordes systématiquement TOUS les adjectifs, participes passés et noms au genre exact du candidat (civilité M. = masculin, Mme = féminin). Tu écris directement 'né', 'salarié', 'engagé', 'responsable', 'formé' pour un homme, et 'née', 'salariée', 'engagée', 'responsable', 'formée' pour une femme. INTERDICTION FORMELLE d'utiliser des formes inclusives entre parenthèses comme '(e)', '(le)', '(la)', 'né(e)', 'salarié(e)', 'engagé(e)', 'diplômé(e)', ni le point médian (·), ni la barre oblique (/). Le texte doit se lire naturellement à la première personne avec un accord de genre unique et cohérent du début à la fin. Tu termines toujours tes phrases proprement.";

const MODEL = "google/gemini-2.5-flash";

async function callAI(key: string, userPrompt: string, tool: any, toolName: string, maxTokens = 8000): Promise<any> {
  const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      tools: [tool],
      tool_choice: { type: "function", function: { name: toolName } },
      max_tokens: maxTokens,
    }),
  });
  if (!r.ok) {
    if (r.status === 429) throw new Error("__RATE__");
    if (r.status === 402) throw new Error("__CREDITS__");
    throw new Error("AI gateway error " + r.status);
  }
  const data = await r.json();
  const msg = data.choices?.[0]?.message;
  let payload: string | undefined = msg?.tool_calls?.[0]?.function?.arguments;
  if (!payload && typeof msg?.content === "string") {
    const m = msg.content.match(/\{[\s\S]*\}/);
    if (m) payload = m[0];
  }
  if (!payload) {
    console.error("No tool call. finish_reason:", data.choices?.[0]?.finish_reason, "raw:", JSON.stringify(data).slice(0, 2000));
    throw new Error("Réponse IA vide");
  }
  return JSON.parse(payload);
}

const MAIN_TOOL = {
  type: "function",
  function: {
    name: "generate_vae_main",
    parameters: {
      type: "object",
      properties: {
        motivation: { type: "string" },
        parcours: { type: "string" },
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
      required: ["motivation", "parcours", "besoins", "planAccompagnement", "synthese"],
    },
  },
};

const BLOC_TOOL = {
  type: "function",
  function: {
    name: "generate_vae_bloc",
    parameters: {
      type: "object",
      properties: {
        codeBloc: { type: "string" },
        intitule: { type: "string" },
        situations: { type: "string" },
      },
      required: ["codeBloc", "intitule", "situations"],
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { candidat, certification, organisme, session } = await req.json();
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) throw new Error("LOVABLE_API_KEY not configured");

    const ctx = `ORGANISME : ${JSON.stringify(organisme)}
CERTIFICATION : ${JSON.stringify(certification)}
CANDIDAT : ${JSON.stringify(candidat)}
SESSION : ${JSON.stringify(session)}`;

    // 1) Main sections
    const mainPrompt = `${ctx}

Rédige les sections principales du dossier VAE à la première personne (candidat), en français professionnel, sans aucun placeholder ni marqueur "À rédiger"/"À compléter". Longueurs :
- motivation : ~12 lignes reliant le projet aux compétences du référentiel visé
- parcours : ~12 lignes synthétisant le parcours en cohérence avec le CV
- besoins (attentes, freins, disponibilites, materiel, handicap) : 3 à 5 lignes chacun, entièrement rédigés
- planAccompagnement : ~10 lignes
- synthese : ~8 lignes

TOUT doit être complet et rédigé. Si une info manque, invente de façon plausible et cohérente avec le métier. Renvoie via l'outil generate_vae_main.`;

    const main = await callAI(key, mainPrompt, MAIN_TOOL, "generate_vae_main", 6000);

    // 2) One call per bloc (guarantees no truncation)
    const blocs: any[] = Array.isArray(certification?.blocs) ? certification.blocs : [];
    const situationsParBloc: any[] = [];

    for (const b of blocs) {
      const blocPrompt = `${ctx}

BLOC À TRAITER : code=${b.code || b.codeBloc || ""} — intitulé="${b.intitule || b.libelle || ""}"
Compétences du bloc : ${JSON.stringify(b.competences || b.criteres || [])}

Rédige UNIQUEMENT le champ "situations" pour CE bloc, à la première personne, ENTIÈREMENT rédigé, sans aucun placeholder, "À rédiger", pointillés ou parenthèses vides. Décris 2 à 4 situations concrètes reliant les expériences du CV aux compétences du bloc.

FORMAT OBLIGATOIRE : 4 sous-sections marquées par ces balises littérales dans cet ordre, séparées par une ligne vide, chacune ENTIÈREMENT rédigée :

[CONTEXTE]
(8-12 lignes : secteur, employeur, période, objectifs, place dans l'organisation)

[DESCRIPTION]
(12-18 lignes : activités concrètes exercées, étapes, tâches, interlocuteurs, missions représentatives, période et employeur cités)

[MOYENS]
(6-10 lignes : outils logiciels, méthodes, procédures, référentiels, appuis)

[ANALYSE]
(10-15 lignes : nommer chaque compétence du bloc et expliquer comment je l'ai mobilisée, avec preuve du CV)

Reprends codeBloc="${b.code || b.codeBloc || ""}" et intitule="${b.intitule || b.libelle || ""}" à l'identique. Renvoie via l'outil generate_vae_bloc.`;

      try {
        const bloc = await callAI(key, blocPrompt, BLOC_TOOL, "generate_vae_bloc", 8000);
        situationsParBloc.push({
          codeBloc: bloc.codeBloc || b.code || b.codeBloc || "",
          intitule: bloc.intitule || b.intitule || b.libelle || "",
          situations: bloc.situations || "",
        });
      } catch (e) {
        console.error("Bloc failed", b.code, e);
        throw e;
      }
    }

    const result = { ...main, situationsParBloc };
    return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    const m = (e as Error).message;
    if (m === "__RATE__") return new Response(JSON.stringify({ error: "Trop de requêtes, réessayez dans un instant" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (m === "__CREDITS__") return new Response(JSON.stringify({ error: "Crédits IA épuisés" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    console.error("vae-generate-contents error", e);
    return new Response(JSON.stringify({ error: m }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
