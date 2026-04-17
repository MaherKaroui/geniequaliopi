// Génère un pack de VEILLES (réglementaire / métier / technologique) cohérent avec la formation
// Entrée : { intitule, objectifs?, programme?, publicVise?, codeRNCP? }
// Sortie : { reglementaire: VeilleRow[], metier: VeilleRow[], technologique: VeilleRow[] }

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu es expert Qualiopi spécialisé dans la veille réglementaire, métier et technologique pour la formation professionnelle française.

Tu génères 3 tableaux de veille (réglementaire, métier, technologique) 100% COHÉRENTS avec le métier précis de la formation.

RÈGLES STRICTES :
- Chaque ligne contient : lien (URL réelle plausible), titre du texte/article, date (format "Mois AAAA"), commentaire (2-3 phrases concrètes liées au métier), exploitation Qualiopi (preuve + action).
- Veille RÉGLEMENTAIRE : 6 lignes — sources officielles obligatoires (Légifrance, Ministère du Travail, France Compétences, DGEFP, OPCO, codes métier). Inclure systématiquement 1-2 textes Qualiopi V9 récents + textes spécifiques au métier (ex: VTC = code transports, esthétique = code santé publique, IA = AI Act, conduite = code route).
- Veille MÉTIER : 6 lignes — sources professionnelles du secteur (fédérations, syndicats, observatoires métiers, presse spécialisée, APEC, France Travail). 100% lié au métier de la formation.
- Veille TECHNOLOGIQUE : 6 lignes — outils, logiciels, plateformes, méthodologies récentes du métier. Inclure 1 ressource vidéo YouTube réelle ou plausible.
- Toutes les URL doivent être en https:// et viser des sites réels du secteur.
- Dates récentes : entre 12 mois et 1 mois avant la formation.
- Commentaires en FRANÇAIS professionnel, jamais génériques.
- Exploitation Qualiopi : toujours commencer par "Preuve :" puis "Action :".
- Réponds UNIQUEMENT via l'appel d'outil, jamais en texte libre.`;

const veilleRowSchema = {
  type: "object",
  properties: {
    lien: { type: "string", description: "URL https complète plausible du site officiel/professionnel" },
    titreLien: { type: "string", description: "Libellé court affiché dans le lien (ex: 'Légifrance – Décret du ...')" },
    titre: { type: "string", description: "Titre complet de l'article ou du texte" },
    date: { type: "string", description: "Format 'Mois AAAA' en français (ex: 'Mars 2025')" },
    commentaire: { type: "string", description: "2-3 phrases concrètes liées au métier de la formation" },
    exploitation: { type: "string", description: "Format obligatoire : 'Preuve : ... Action : ...'" },
  },
  required: ["lien", "titreLien", "titre", "date", "commentaire", "exploitation"],
  additionalProperties: false,
};

const TOOL_SCHEMA = {
  type: "function",
  function: {
    name: "generate_veille_pack",
    description: "Génère 3 tableaux de veille cohérents avec la formation",
    parameters: {
      type: "object",
      properties: {
        reglementaire: { type: "array", minItems: 6, maxItems: 6, items: veilleRowSchema },
        metier: { type: "array", minItems: 6, maxItems: 6, items: veilleRowSchema },
        technologique: { type: "array", minItems: 6, maxItems: 6, items: veilleRowSchema },
      },
      required: ["reglementaire", "metier", "technologique"],
      additionalProperties: false,
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { intitule, objectifs, programme, publicVise, codeRNCP } = await req.json();
    if (!intitule) {
      return new Response(JSON.stringify({ error: "intitule requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY non configurée");

    const userPrompt = `Formation : « ${intitule} »
${codeRNCP ? `Certification : ${codeRNCP}\n` : ""}${objectifs ? `Objectifs : ${objectifs}\n` : ""}${publicVise ? `Public : ${publicVise}\n` : ""}${programme ? `Programme (extrait) : ${String(programme).slice(0, 1500)}\n` : ""}
Génère les 3 tableaux de veille (6 lignes chacun) parfaitement cohérents avec ce métier précis.`;

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools: [TOOL_SCHEMA],
        tool_choice: { type: "function", function: { name: "generate_veille_pack" } },
      }),
    });

    if (!aiResp.ok) {
      const txt = await aiResp.text();
      console.error("AI gateway error", aiResp.status, txt);
      if (aiResp.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, réessayez dans un instant." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResp.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits IA épuisés." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "Erreur passerelle IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("No tool call", JSON.stringify(data).slice(0, 500));
      return new Response(JSON.stringify({ error: "Réponse IA invalide" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const pack = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(pack), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-veille-ai error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
