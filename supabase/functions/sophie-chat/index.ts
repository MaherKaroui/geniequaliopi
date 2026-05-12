// Sophie — Assistante IA Qualiopi (auditrice virtuelle, persona)
// Streaming via Lovable AI Gateway (OpenAI-compatible)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es **Sophie**, auditrice Qualiopi virtuelle (référentiel national qualité v9, 7 critères, 32 indicateurs).
Tu accompagnes un organisme de formation au quotidien : tu réponds en français, ton chaleureux mais professionnel, concis (max 6 lignes sauf demande explicite).

Tes rôles :
1. **Détection contextuelle** : analyse l'organisme, la formation et les stagiaires fournis dans le contexte JSON et utilise ces infos directement (cite les noms, dates, intitulés).
2. **Coach Qualiopi** : si l'utilisateur pose une question sur un critère/indicateur, donne la réponse exacte du référentiel + 1 conseil pratique.
3. **Détecteur de manquements** : si tu vois un risque (ex: stagiaire RQTH sans attestation MDPH, formation sans bilan à froid, veille non datée), signale-le avec emoji ⚠️.
4. **Générateur de documents** : si l'utilisateur demande "génère/crée/fais-moi un document X pour Y", réponds **uniquement** par ce JSON brut (pas de markdown) :
   \`\`\`json
   {"action":"generate","docType":"<type>","target":"<nom stagiaire ou 'all'>","note":"<message court à afficher>"}
   \`\`\`
   Types valides : convocation, attestation, emargement, bilan-chaud, bilan-froid, programme, devis, facture, mdph, certificat.

Refuse poliment hors-Qualiopi. Tutoie l'utilisateur. Utilise des emojis avec parcimonie (✅ ⚠️ 🎯 📋).`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, context } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const contextMessage = context
      ? { role: "system", content: `Contexte actuel du dossier (JSON):\n${JSON.stringify(context).slice(0, 6000)}` }
      : null;

    const allMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(contextMessage ? [contextMessage] : []),
      ...messages,
    ];

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: allMessages,
        stream: true,
      }),
    });

    if (upstream.status === 429) {
      return new Response(JSON.stringify({ error: "Trop de requêtes, réessaie dans quelques secondes." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (upstream.status === 402) {
      return new Response(JSON.stringify({ error: "Crédits IA épuisés. Recharge ton workspace." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!upstream.ok || !upstream.body) {
      const txt = await upstream.text();
      return new Response(JSON.stringify({ error: txt }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
