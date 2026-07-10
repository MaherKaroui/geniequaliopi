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
6. INTERDICTION ABSOLUE d'insérer des pointillés "……………", des espaces à compléter, "(..................)", "[à compléter]" ou toute marque de champ vide. TOUT doit être rédigé et complet. Si une donnée précise manque dans le CV, tu inventes de manière PLAUSIBLE et COHÉRENTE avec le métier et le secteur (nom d'outil métier crédible, procédure standard, exemple générique du secteur) — jamais de trou visible dans le texte final. Seules restent interdites les données strictement personnelles sensibles (n° sécurité sociale, date/lieu de naissance exact, adresse personnelle) : dans ces cas très rares, reformule pour ne pas en avoir besoin plutôt que de laisser un vide.
7. Les résultats chiffrés inventés sont autorisés s'ils restent réalistes et modestes (ex. "une équipe d'environ 5 personnes", "un portefeuille d'une trentaine de clients"). Ne jamais laisser une phrase inachevée faute de chiffre.
8. Longueurs indicatives : motivation ~12 lignes, parcours ~12 lignes, chaque bloc ~40 à 60 lignes au total (4 sous-parties), chaque champ de besoins ~3 à 5 lignes, planAccompagnement ~10 lignes, synthese ~8 lignes. Aucune section ne doit être vide ni contenir de placeholder.
9. FORMAT OBLIGATOIRE du champ "situations" de chaque bloc : structure en 4 sous-sections marquées par des balises littérales (ne pas les traduire, ne pas les omettre, une seule fois chacune, dans cet ordre, séparées par une ligne vide) :

[CONTEXTE]
(8-12 lignes : contexte et finalité de l'activité — secteur, employeur, période, objectifs poursuivis, place dans l'organisation)

[DESCRIPTION]
(12-18 lignes : description détaillée des activités que j'ai exercées — étapes concrètes, tâches, interlocuteurs, exemples de missions représentatives, période et employeur cités)

[MOYENS]
(6-10 lignes : moyens et ressources que j'ai mobilisés — outils logiciels, méthodes, procédures, référentiels, appuis humains, matériels)

[ANALYSE]
(10-15 lignes : analyse des compétences que j'ai mises en œuvre en lien avec le référentiel du bloc — nommer chaque compétence du bloc et expliquer comment je l'ai mobilisée, avec preuve tirée du CV)

Aucune des 4 balises ne doit être vide ; toutes les sous-sections doivent être entièrement rédigées, sans pointillés ni marqueurs "à compléter".

Renvoie l'ensemble via l'appel d'outil generate_vae_contents.`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Tu es un accompagnateur VAE expérimenté. Tu rédiges TOUJOURS à la première personne du point de vue du candidat, en reliant chaque expérience du CV aux blocs de compétences du référentiel RNCP. Tu produis un texte ENTIÈREMENT rédigé, sans jamais laisser de pointillés, de placeholders, de parenthèses vides ni de mentions '(à compléter)'. Quand une donnée précise manque, tu inventes de façon plausible et cohérente avec le métier (outils métier standards, procédures classiques, exemples génériques du secteur). RÈGLE DE GENRE ABSOLUE : tu accordes systématiquement TOUS les adjectifs, participes passés et noms au genre exact du candidat (civilité M. = masculin, Mme = féminin). Tu écris directement 'né', 'salarié', 'engagé', 'responsable', 'formé' pour un homme, et 'née', 'salariée', 'engagée', 'responsable', 'formée' pour une femme. INTERDICTION FORMELLE d'utiliser des formes inclusives entre parenthèses comme '(e)', '(le)', '(la)', 'né(e)', 'salarié(e)', 'engagé(e)', 'diplômé(e)', ni le point médian (·), ni la barre oblique (/). Le texte doit se lire naturellement à la première personne avec un accord de genre unique et cohérent du début à la fin." },
          { role: "user", content: prompt },
        ],
        tools: [TOOL],
        tool_choice: { type: "function", function: { name: "generate_vae_contents" } },
        max_tokens: 16000,
      }),
    });

    if (!r.ok) {
      if (r.status === 429) return new Response(JSON.stringify({ error: "Trop de requêtes" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (r.status === 402) return new Response(JSON.stringify({ error: "Crédits IA épuisés" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error("AI gateway error");
    }
    const data = await r.json();
    const msg = data.choices?.[0]?.message;
    let payload: string | undefined = msg?.tool_calls?.[0]?.function?.arguments;
    if (!payload && typeof msg?.content === "string") {
      const m = msg.content.match(/\{[\s\S]*\}/);
      if (m) payload = m[0];
    }
    if (!payload) {
      console.error("No tool call. finish_reason:", data.choices?.[0]?.finish_reason, "raw:", JSON.stringify(data).slice(0, 3000));
      throw new Error("La réponse IA était vide (contenu probablement trop long). Réessayez ou réduisez le CV.");
    }
    return new Response(payload, { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("vae-generate-contents error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
