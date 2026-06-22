// Audit Fix IA — propose une correction concrète pour un finding donné.
// Renvoie un patch JSON à appliquer sur organisme / formation / stagiaires.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `Tu es un expert Qualiopi. On te donne UN finding d'audit et le contexte complet d'un dossier (organisme, formation, stagiaires).
Ta mission : proposer une correction CONCRÈTE et RÉALISTE pour résoudre ce finding.

Tu réponds UNIQUEMENT en JSON valide (pas de markdown) :
{
  "explication": "<1-2 phrases : ce que tu corriges et pourquoi>",
  "patch": {
    "organisme": { "<champ>": "<nouvelle valeur>", ... },   // optionnel
    "formation": { "<champ>": "<nouvelle valeur>", ... },   // optionnel
    "stagiaires": [                                          // optionnel — array d'updates partiels par index
      { "index": 0, "champs": { "<champ>": "<valeur>" } }
    ]
  }
}

RÈGLES :
- Ne remplis QUE les champs qui résolvent le finding. Pas de réécriture massive.
- Données réalistes (dates au format YYYY-MM-DD ou JJ/MM/AAAA selon les autres champs, SIRET 14 chiffres, NDA 11 caractères, emails plausibles, téléphones français 10 chiffres).
- Si la correction nécessite un document à générer (non un champ), explique-le dans "explication" et renvoie un patch vide {}.
- Adapte au type d'action (AF/BC/VAE/CFA).
- Reste cohérent avec les données existantes (mêmes noms, mêmes dates, même domaine).
- N'invente pas de nouveaux stagiaires.`;

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data: userData, error: authErr } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { type, finding, organisme, formation, stagiaires } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const ctx = {
      typeAction: type || "AF",
      finding,
      organisme: organisme || {},
      formation: formation || {},
      stagiaires: Array.isArray(stagiaires) ? stagiaires : [],
    };

    const userMsg = `Finding à corriger + contexte :\n\n${JSON.stringify(ctx, null, 2).slice(0, 14000)}\n\nPropose le patch JSON minimal.`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: userMsg },
        ],
        response_format: { type: "json_object" },
        max_tokens: 2000,
      }),
    });

    if (resp.status === 429) return new Response(JSON.stringify({ error: "Trop de requêtes" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (resp.status === 402) return new Response(JSON.stringify({ error: "Crédits IA épuisés" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!resp.ok) {
      const txt = await resp.text();
      return new Response(JSON.stringify({ error: txt }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try { parsed = JSON.parse(content); } catch {
      const m = content.match(/\{[\s\S]*\}/);
      if (m) { try { parsed = JSON.parse(m[0]); } catch {} }
    }
    if (!parsed || typeof parsed !== "object") parsed = {};
    if (!parsed.patch || typeof parsed.patch !== "object") parsed.patch = {};
    if (typeof parsed.explication !== "string") parsed.explication = "";

    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
