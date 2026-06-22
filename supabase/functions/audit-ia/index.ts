// Audit IA — analyse réelle du dossier Qualiopi par IA (Lovable AI Gateway)
// Reçoit le contexte complet (org, formation, stagiaires, type d'action) + liste des documents générés.
// Retourne une analyse structurée : manques, incohérences, suggestions d'amélioration par critère.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es un auditeur Qualiopi senior expert (référentiel V9, 7 critères, 32 indicateurs).
On te fournit un dossier réel (organisme, formation, stagiaires, documents générés) ET le type d'action choisi parmi :
- AF (Action de Formation classique)
- BC (Bilan de Compétences)
- VAE (Validation des Acquis de l'Expérience)
- CFA (Apprentissage)

Ta mission : auditer le dossier comme si tu étais en visite réelle.

⚠️ RÈGLE ABSOLUE — DOCUMENTS GÉNÉRÉS :
La liste "documentsGeneres" fournie est la liste EXHAUSTIVE des documents que l'application produit automatiquement pour ce dossier. Tu DOIS la considérer comme du livrable réel et présent dans le dossier.
- Ne déclare JAMAIS "manquant" un document dont le nom (ou un nom équivalent) apparaît dans documentsGeneres.
- Avant de signaler un manque, vérifie d'abord par mot-clé dans documentsGeneres (ex : "convention", "synthèse", "confidentialité", "phase préliminaire", "phase d'investigation", "phase de conclusion", "livret 1", "livret 2", "CERFA", "émargement", "bilan à chaud", "bilan à froid", "veille", "handicap", "réclamation", etc.).
- Si le document existe : ne le mets PAS dans findings. Concentre-toi sur les vraies lacunes (champs vides obligatoires, incohérences de dates, formats invalides, données incohérentes entre stagiaires et formation, etc.).

Tu dois identifier RIGOUREUSEMENT :
1. Les INFORMATIONS MANQUANTES dans les CHAMPS du dossier (org/formation/stagiaires) — pas les documents si déjà générés
2. Les INCOHÉRENCES (dates, durées, profils, doublons, valeurs improbables)
3. Les DONNÉES INCORRECTES (formats invalides : SIRET, NDA, email, téléphone, dates impossibles)
4. Les AMÉLIORATIONS QUALIOPI (preuves manquantes côté champ, indicateurs faibles)

Adapte tes contrôles au type d'action :
- AF : convention bilatérale, programme, émargements, bilans chaud/froid, certif
- BC : 3 phases (préliminaire/investigation/conclusion), 24h max, document de synthèse, confidentialité
- VAE : livret 1 et 2, 10 sessions accompagnement, jury, recevabilité France VAE
- CFA : CERFA 10103, maître d'apprentissage, livret apprenti, 14 missions CFA, SIA, visite entreprise

Réponds UNIQUEMENT en JSON valide (pas de markdown, pas de \`\`\`) avec ce schéma EXACT :
{
  "scoreGlobal": <0-100>,
  "synthese": "<2-3 phrases ton d'auditeur>",
  "findings": [
    {
      "severity": "critical" | "major" | "minor" | "info",
      "categorie": "manquant" | "incoherence" | "incorrect" | "amelioration",
      "critere": <1-7 ou 0 si transverse>,
      "indicateur": <1-32 ou 0>,
      "zone": "<Organisme|Formation|Stagiaire X|Document Y|Cohérence>",
      "constat": "<ce que tu observes>",
      "impact": "<conséquence audit Qualiopi>",
      "action": "<correction concrète à apporter>"
    }
  ]
}

Sois exhaustif (10-25 findings typiques). Ordre : critical > major > minor > info.`;

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

    const { type, organisme, formation, stagiaires, documents } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const docList = Array.isArray(documents) ? documents : [];
    const docNames = Array.from(new Set(docList.map((d: any) => (typeof d === "string" ? d : d?.nom)).filter(Boolean))).slice(0, 150);

    const ctx = {
      typeAction: type || "AF",
      organisme: organisme || {},
      formation: formation || {},
      stagiaires: Array.isArray(stagiaires) ? stagiaires : [],
      nbStagiaires: Array.isArray(stagiaires) ? stagiaires.length : 0,
      documentsGeneres: docNames,
    };

    const userMsg = `Audit du dossier suivant (type ${ctx.typeAction}) :\n\n${JSON.stringify(ctx, null, 2).slice(0, 18000)}\n\nFais l'audit complet maintenant. Limite-toi à 15 findings maximum (les plus importants).`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMsg },
        ],
        response_format: { type: "json_object" },
        max_tokens: 8000,
      }),
    });

    if (resp.status === 429) return new Response(JSON.stringify({ error: "Trop de requêtes — réessaie dans quelques secondes." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (resp.status === 402) return new Response(JSON.stringify({ error: "Crédits IA épuisés. Recharge ton workspace." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!resp.ok) {
      const txt = await resp.text();
      console.log("[audit-ia] gateway error", resp.status, txt);
      return new Response(JSON.stringify({ error: txt }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try { parsed = JSON.parse(content); } catch {
      const m = content.match(/\{[\s\S]*\}/);
      if (m) { try { parsed = JSON.parse(m[0]); } catch {} }
    }

    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
