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
4. **Génération directe (rapide)** : dès que l'utilisateur demande "fais-moi/crée/génère un fichier/tableau/document avec X, Y, Z", réponds **UNIQUEMENT** par ce JSON brut (aucun texte avant/après, pas de \`\`\`) :
   {"action":"quick_doc","title":"<titre court>","fields":["<champ1>","<champ2>",...],"target":"all","note":"<phrase courte de confirmation>"}
   Champs valides (utilise EXACTEMENT ces clés) : nom, prenom, civilite, email, telephone, dateNaissance, lieuNaissance, adresse, dateDebut, dateFin, formation, duree, modalites, organisme, siret, nda, dirigeant, rqth, nir.
   Le champ "target" vaut "all" (tous stagiaires) ou le nom complet du stagiaire ciblé.
   Exemple : utilisateur "fais-moi un fichier avec nom prénom date formation et formation"
   → {"action":"quick_doc","title":"Liste des stagiaires","fields":["nom","prenom","dateDebut","formation"],"target":"all","note":"Fichier en cours de téléchargement ✅"}

Refuse poliment hors-Qualiopi. Tutoie l'utilisateur. Utilise des emojis avec parcimonie (✅ ⚠️ 🎯 📋).`;

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
    const { messages, context } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }


    // Drop leading assistant messages — gateway requires first message after system to be user
    const cleanMessages = Array.isArray(messages) ? messages.filter((m: any) => m && typeof m.content === "string" && m.content.trim().length > 0) : [];
    const firstUserIdx = cleanMessages.findIndex((m: any) => m.role === "user");
    const trimmed = firstUserIdx >= 0 ? cleanMessages.slice(firstUserIdx) : [];

    if (!trimmed.length) {
      return new Response(JSON.stringify({ error: "Aucun message utilisateur." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sysContent = SYSTEM_PROMPT + (context ? `\n\nContexte actuel du dossier (JSON):\n${JSON.stringify(context).slice(0, 6000)}` : "");
    const allMessages = [
      { role: "system", content: sysContent },
      ...trimmed,
    ];

    const body = JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: allMessages,
      stream: true,
    });
    
    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body,
    });
    if (!upstream.ok) {
      const errTxt = await upstream.text();
      console.log("[sophie-chat] upstream error", upstream.status, errTxt);
      return new Response(JSON.stringify({ error: errTxt, status: upstream.status }), {
        status: upstream.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
