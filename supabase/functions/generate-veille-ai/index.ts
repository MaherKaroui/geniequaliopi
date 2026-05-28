// Génère un pack de VEILLES (réglementaire / métier / technologique) cohérent avec la formation
// Entrée : { intitule, objectifs?, programme?, publicVise?, codeRNCP? }
// Sortie : { reglementaire: VeilleRow[], metier: VeilleRow[], technologique: VeilleRow[] }

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const buildSystemPrompt = (anneeN: number, anneeN_1: number) => `Tu es expert Qualiopi spécialisé dans la veille réglementaire, métier et technologique pour la formation professionnelle française (CFA / Action de formation).

Tu génères 3 tableaux de veille (réglementaire, métier, technologique) 100% COHÉRENTS avec le métier précis de la formation, pour un AUDIT DE SURVEILLANCE Qualiopi sur les années ${anneeN_1} et ${anneeN} (12 mois précédant la formation).

RÈGLES STRICTES :
- Chaque ligne contient : lien (URL réelle plausible), titre du texte/article, date (format "Mois AAAA" — UNIQUEMENT entre janvier ${anneeN_1} et le mois précédant la formation en ${anneeN}), commentaire (2-3 phrases concrètes – ANALYSE MÉTIER), exploitation Qualiopi (preuve + action concrète, ex: "sortir une version 2 du programme avec ajout d'un objectif IA dans le cycle de la vente").
- Veille RÉGLEMENTAIRE : 6 lignes — sources officielles obligatoires (Légifrance, Ministère du Travail, France Compétences, DGEFP, OPCO, codes métier). Inclure 1-2 textes Qualiopi V9 récents + textes spécifiques au métier (ex: NTC = code commerce/RGPD/IA Act, VTC = code transports, esthétique = code santé publique, conduite = code route).
- Veille MÉTIER : 6 lignes DIVERSIFIÉES — DOIT obligatoirement mélanger : 1 forum / communauté professionnelle (ex: forum-vendeurs.fr, communauté LinkedIn), 1 événement / salon professionnel daté en ${anneeN_1} ou ${anneeN} (ex: Salon Vendre, IA & Vente Summit), 1 article de presse spécialisée (Les Échos, LSA, Action Co, Chef d'Entreprise), 1 blog métier reconnu, 1 chaîne YouTube réelle/plausible du secteur, 1 ressource sur l'IA appliquée au métier (pour NTC : IA dans le cycle de la vente, prospection automatisée, ChatGPT pour commerciaux, Copilot ventes).
- Veille TECHNOLOGIQUE : 6 lignes — outils, logiciels, plateformes, méthodologies récentes du métier. Inclure au moins 2 ressources vidéo YouTube réelles ou plausibles + 1 outil IA récent.
- Toutes les URL doivent être en https:// et viser des sites réels du secteur.
- Dates UNIQUEMENT entre ${anneeN_1} et ${anneeN}, AVANT la date de début de formation — JAMAIS d'année postérieure ni antérieure à ${anneeN_1}.
- Commentaires en FRANÇAIS professionnel, jamais génériques — toujours intituler "Analyse métier : ...".
- Exploitation Qualiopi : toujours "Preuve : ... Action : ..." avec une action concrète et datée (ex: "Action : sortir version 2 du programme NTC avant la session ${anneeN} avec objectif IA dans le cycle de la vente").
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
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders }

  const __authErr = await __requireAuth(req);
  if (__authErr) return __authErr;
);

  try {
    const { intitule, objectifs, programme, publicVise, codeRNCP, dateDebut, dateFin } = await req.json();
    if (!intitule) {
      return new Response(JSON.stringify({ error: "intitule requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY non configurée");

    // Année N = année de début de formation, N-1 = année précédente. La veille doit dater AVANT la formation.
    const refDate = dateDebut ? new Date(dateDebut) : (dateFin ? new Date(dateFin) : new Date());
    const anneeN = isNaN(refDate.getTime()) ? new Date().getFullYear() : refDate.getFullYear();
    const anneeN_1 = anneeN - 1;
    const SYSTEM_PROMPT = buildSystemPrompt(anneeN, anneeN_1);

    const userPrompt = `Formation : « ${intitule} »
${codeRNCP ? `Certification : ${codeRNCP}\n` : ""}${objectifs ? `Objectifs : ${objectifs}\n` : ""}${publicVise ? `Public : ${publicVise}\n` : ""}${dateDebut ? `Période : du ${dateDebut} au ${dateFin || "(en cours)"}\n` : ""}${programme ? `Programme (extrait) : ${String(programme).slice(0, 1500)}\n` : ""}
Contexte : audit de surveillance Qualiopi. La veille doit couvrir les 12 mois précédant la formation (années ${anneeN_1} et ${anneeN}, dates AVANT le ${dateDebut || "début de session"}).
Génère les 3 tableaux de veille (6 lignes chacun) parfaitement cohérents avec ce métier précis, avec dates UNIQUEMENT entre ${anneeN_1} et ${anneeN} (avant la formation), en intégrant forums, événements/salons, articles de presse, blogs, chaînes YouTube et ressources IA appliquées au métier.`;

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
