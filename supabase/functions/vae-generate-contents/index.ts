import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function requireAuth(req: Request): Promise<Response | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data, error } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
  if (error || !data?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  return null;
}

const TOOL = {
  type: "function",
  function: {
    name: "generate_vae_contents",
    parameters: {
      type: "object",
      properties: {
        motivation: { type: "string", description: "Motivation du candidat (10-15 lignes)" },
        parcours: { type: "string", description: "Synthèse du parcours professionnel (10-15 lignes)" },
        situationsParBloc: {
          type: "array",
          items: {
            type: "object",
            properties: {
              codeBloc: { type: "string" }, intitule: { type: "string" },
              situations: { type: "string", description: "Description détaillée des situations de travail (15-25 lignes)" },
            },
            required: ["codeBloc", "intitule", "situations"],
          },
        },
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
      required: ["motivation", "parcours", "situationsParBloc", "besoins", "planAccompagnement", "synthese"],
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const authErr = await requireAuth(req);
  if (authErr) return authErr;

  try {
    const { candidat, certification, organisme, session } = await req.json();
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `Contexte : rédaction d'un dossier VAE (Validation des Acquis de l'Expérience) à partir du CV et des informations ci-dessous.

ORGANISME ACCOMPAGNATEUR : ${JSON.stringify(organisme)}
CERTIFICATION VISÉE (référentiel RNCP, blocs de compétences inclus) : ${JSON.stringify(certification)}
CANDIDAT (extrait du CV + formulaire) : ${JSON.stringify(candidat)}
SESSION D'ACCOMPAGNEMENT : ${JSON.stringify(session)}

RÈGLES DE RÉDACTION IMPÉRATIVES :
1. Écris systématiquement à la PREMIÈRE PERSONNE ("je", "j'ai", "mon parcours…"), du point de vue du candidat s'adressant au jury de certification.
2. Français professionnel, ton posé et réflexif (registre attendu par un jury VAE), sans formule commerciale ni superlatif.
3. COHÉRENCE ABSOLUE entre toutes les sections : mêmes intitulés de postes, mêmes employeurs, mêmes dates et durées que le CV. Ne jamais renommer un poste ni décaler une date entre deux sections.
4. Pour chaque bloc de compétences du RNCP (situationsParBloc — UNE entrée par bloc listé dans la certification), tu DOIS relier explicitement les expériences réelles du CV aux compétences et activités du référentiel : reprends le libellé exact du bloc, puis décris 2 à 4 situations de travail concrètes (contexte, mission, actions menées, outils, résultats si disponibles, période et employeur) qui prouvent la maîtrise des compétences du bloc. Nomme les compétences visées telles qu'elles apparaissent dans le référentiel France Compétences.
5. Dans "motivation" et "parcours", relie de la même façon le projet professionnel du candidat aux compétences du référentiel visé.
6. NE JAMAIS INVENTER de données administratives ou factuelles absentes du CV/formulaire (n° sécurité sociale, lieu ou date de naissance, nationalité, situation familiale, adresse, diplômes non mentionnés, employeurs non cités, chiffres inventés, certifications non listées). Si une information manque, insère à la place une suite de pointillés "……………" à compléter manuellement, exactement comme dans les modèles administratifs.
7. Reste factuel : n'invente pas de résultats chiffrés ; si un chiffre n'est pas dans le CV, reste qualitatif ("j'ai contribué à…", "j'ai piloté…") sans nombre inventé.
8. Longueurs indicatives : motivation ~12 lignes, parcours ~12 lignes, chaque bloc ~15 à 25 lignes, chaque champ de besoins ~3 à 5 lignes, planAccompagnement ~10 lignes, synthese ~8 lignes.

Renvoie l'ensemble via l'appel d'outil generate_vae_contents.`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: "Tu es un accompagnateur VAE expérimenté. Tu rédiges TOUJOURS à la première personne du point de vue du candidat, en reliant chaque expérience du CV aux blocs de compétences du référentiel RNCP. Tu n'inventes JAMAIS d'informations administratives ou factuelles absentes du CV : à la place tu écris '……………' (pointillés) à compléter manuellement." },
          { role: "user", content: prompt },
        ],
        tools: [TOOL],
        tool_choice: { type: "function", function: { name: "generate_vae_contents" } },
      }),
    });

    if (!r.ok) {
      if (r.status === 429) return new Response(JSON.stringify({ error: "Trop de requêtes" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (r.status === 402) return new Response(JSON.stringify({ error: "Crédits IA épuisés" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error("AI gateway error");
    }
    const data = await r.json();
    const tc = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!tc) throw new Error("No tool call");
    return new Response(tc.function.arguments, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("vae-generate-contents error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
