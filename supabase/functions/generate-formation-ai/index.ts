// Edge function: Génération automatique d'une formation complète via Lovable AI
// Entrée : { nom, codeRNCP?, model? }
// Sortie : { formation: FormationInfo } — tous les champs pédagogiques remplis et cohérents

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es un expert ingénieur pédagogique français spécialisé en conformité Qualiopi (référentiel national qualité v9, 7 critères / 32 indicateurs) et en construction de référentiels de formation professionnelle (RNCP, RS, blocs de compétences France Compétences).

Ta mission : à partir d'un simple INTITULÉ de formation (et éventuellement d'un code RNCP ou RS), tu dois rédiger un programme de formation COMPLET, RÉALISTE, COHÉRENT et AUDIT-READY, prêt à être utilisé dans un dossier Qualiopi officiel.

RÈGLES STRICTES :
- Tout le contenu est rédigé en français professionnel impeccable.
- Si un code RNCP/RS est fourni : tu structures le programme par BLOCS DE COMPÉTENCES officiels du référentiel et tu cites le code dans le titre.
- Si pas de code : tu construis un programme générique mais détaillé jour par jour.
- Le PROGRAMME doit OBLIGATOIREMENT être ventilé JOUR PAR JOUR avec créneaux horaires PRÉCIS au format suivant (à reproduire EXACTEMENT) :

  Jour 1 – [Titre du jour] (7h) :
  09h00–09h30 : [Activité courte d'accueil ou intro]
  09h30–10h30 : [Activité 1]
  10h30–11h30 : [Activité 2]
  11h30–13h00 : [Activité 3]
  14h00–15h30 : [Activité 4 après pause déjeuner]
  15h30–16h00 : [Activité 5 courte]
  16h00–17h00 : [Exercices pratiques guidés]

  Jour 2 – [Titre du jour] (7h) :
  09h00–11h00 : [Activité 1]
  11h00–12h00 : [Activité 2]
  13h00–14h30 : [Activité 3]
  14h30–15h30 : [Activité 4 + test de positionnement fin si dernier jour]
  15h30–16h30 : [Évaluation finale et bilan si dernier jour]
  16h30–17h00 : [Grille d'acquisition si dernier jour]

  RÈGLES STRICTES DU PROGRAMME :
  * Chaque jour fait 7h effectives (pause déjeuner 13h00-14h00 NON comptée).
  * Les créneaux utilisent le tiret demi-cadratin "–" (PAS le tiret simple "-") entre les heures.
  * Le format horaire est OBLIGATOIREMENT "09h00–10h30" (avec "h" minuscule, sans espace).
  * Le PREMIER jour commence par "Accueil, présentation de la formation et des objectifs" (09h00–09h30) puis "test de positionnement" dans le créneau suivant.
  * Le DERNIER jour finit par : test de positionnement fin de formation, évaluation finale et bilan de formation, grille d'acquisition.
  * Chaque jour a un titre thématique cohérent avec la progression pédagogique.
  * Le nombre de jours doit correspondre à la durée totale (ex: 14h = 2 jours, 21h = 3 jours, 35h = 5 jours, 140h VTC = 20 jours).
  * Sépare chaque jour par une LIGNE VIDE (\\n\\n).
  * Sépare chaque créneau par un saut de ligne simple (\\n).
- Les OBJECTIFS PÉDAGOGIQUES sont formulés avec des verbes opérationnels (Bloom : maîtriser, identifier, analyser, mettre en œuvre, évaluer...).
- Les PRÉREQUIS sont concrets (niveau scolaire, expérience, prérequis techniques, médicaux, juridiques selon le métier).
- Les MÉTHODES D'ÉVALUATION incluent : QCM de positionnement initial, évaluations formatives intermédiaires, évaluation finale (pratique + théorique selon métier), grille d'acquisition, bilan à chaud / à froid.
- Les MOYENS PÉDAGOGIQUES sont matériels et concrets (salle équipée, plateforme LMS, supports, équipements métier spécifiques, EPI si nécessaire).
- La DURÉE est cohérente avec le métier (ex: VTC 140h, Bac Pro 1850h, formation courte 14-21h).
- Le TARIF est réaliste pour le marché français (HT, par stagiaire).
- Le PUBLIC VISÉ est précis (profils, secteurs, statuts).
- Les MODALITÉS sont "présentiel", "distanciel" ou "mixte" selon le métier (la conduite VTC = mixte, langue = distanciel possible, esthétique = présentiel obligatoire).
- Le DÉLAI D'ACCÈS est toujours "14 jours avant le début de la session" (norme Qualiopi).
- Les DATES DE DÉBUT/FIN sont cohérentes : début dans 1 mois, fin selon la durée.
- Le LIEU mentionne "Paris" par défaut.
- Le NOMBRE DE PARTICIPANTS est entre 6 et 12.
- Le RYTHME D'ALTERNANCE n'est rempli QUE pour les formations CFA/apprentissage (sinon chaîne vide).

Tu utilises OBLIGATOIREMENT l'outil generate_formation pour structurer ta réponse.`;

const FORMATION_TOOL = {
  type: "function",
  function: {
    name: "generate_formation",
    description:
      "Génère une fiche formation Qualiopi complète, structurée et cohérente avec tous les champs requis pour un dossier d'audit.",
    parameters: {
      type: "object",
      properties: {
        intitule: {
          type: "string",
          description:
            "Intitulé officiel et complet de la formation (avec code RNCP/RS entre parenthèses si fourni)",
        },
        objectifs: {
          type: "string",
          description:
            "Objectifs pédagogiques détaillés (verbes opérationnels Bloom). 4 à 8 phrases minimum.",
        },
        prerequis: {
          type: "string",
          description:
            "Prérequis concrets : niveau scolaire, expérience, conditions médicales/juridiques selon le métier.",
        },
        duree: {
          type: "string",
          description:
            "Durée totale au format 'XXX heures (XX jours)' cohérente avec le métier.",
        },
        modalites: {
          type: "string",
          enum: ["présentiel", "distanciel", "mixte"],
          description: "Modalité principale de la formation",
        },
        tarif: {
          type: "string",
          description:
            "Tarif réaliste au format 'X XXX € HT par stagiaire' (marché français)",
        },
        programme: {
          type: "string",
          description:
            "Programme DÉTAILLÉ ventilé JOUR PAR JOUR avec créneaux horaires PRÉCIS au format EXACT 'Jour N – Titre (7h) :' suivi de créneaux 'HHhMM–HHhMM : activité' (tiret demi-cadratin –, h minuscule). Pause déjeuner 13h00–14h00 non comptée. Le 1er jour commence par accueil + test de positionnement. Le dernier jour finit par test de positionnement fin, évaluation finale, bilan, grille d'acquisition. Séparer chaque jour par une ligne vide (\\n\\n).",
        },
        methodesEvaluation: {
          type: "string",
          description:
            "Méthodes d'évaluation : QCM positionnement, évaluations formatives, évaluation finale, grille d'acquisition, bilan à chaud/à froid.",
        },
        moyensPedagogiques: {
          type: "string",
          description:
            "Moyens pédagogiques matériels concrets adaptés au métier (salle, équipements, plateforme LMS, supports, EPI...).",
        },
        publicVise: {
          type: "string",
          description:
            "Public cible précis : profils, secteurs, statuts (salariés, demandeurs d'emploi, indépendants, apprentis...).",
        },
        delaiAcces: {
          type: "string",
          description: "Toujours '14 jours avant le début de la session'",
        },
        dateDebut: {
          type: "string",
          description: "Date de début au format ISO YYYY-MM-DD (dans 1-2 mois)",
        },
        dateFin: {
          type: "string",
          description:
            "Date de fin au format ISO YYYY-MM-DD (cohérente avec la durée)",
        },
        lieu: {
          type: "string",
          description:
            "Adresse complète du lieu de formation (Paris par défaut)",
        },
        nombreParticipants: {
          type: "string",
          description: "Nombre de participants entre 6 et 12 (ex: '8')",
        },
        formateur: {
          type: "string",
          description:
            "Nom complet réaliste d'un formateur expert du domaine (Prénom Nom)",
        },
        rythmeAlternance: {
          type: "string",
          description:
            "Rythme d'alternance UNIQUEMENT si CFA/apprentissage (ex: '1 semaine CFA / 3 semaines entreprise'). Sinon chaîne vide.",
        },
        codeRNCP: {
          type: "string",
          description:
            "Code RNCP ou RS s'il s'agit d'une certification, sinon chaîne vide.",
        },
      },
      required: [
        "intitule",
        "objectifs",
        "prerequis",
        "duree",
        "modalites",
        "tarif",
        "programme",
        "methodesEvaluation",
        "moyensPedagogiques",
        "publicVise",
        "delaiAcces",
        "dateDebut",
        "dateFin",
        "lieu",
        "nombreParticipants",
        "formateur",
        "rythmeAlternance",
        "codeRNCP",
      ],
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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders }

  const __authErr = await __requireAuth(req);
  if (__authErr) return __authErr;
);
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY non configurée");
    }

    const body = await req.json();
    const nom = String(body?.nom || "").trim();
    const codeRNCP = String(body?.codeRNCP || "").trim();
    const ALLOWED_MODELS = new Set([
      "google/gemini-2.5-flash",
      "google/gemini-2.5-flash-lite",
      "google/gemini-2.5-pro",
    ]);
    const requestedModel = String(body?.model || "google/gemini-2.5-flash").trim();
    const model = ALLOWED_MODELS.has(requestedModel) ? requestedModel : "google/gemini-2.5-flash";

    if (!nom || nom.length < 3) {
      return new Response(
        JSON.stringify({
          error: "Le nom de la formation est requis (3 caractères minimum)",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const userPrompt = codeRNCP
      ? `Génère la fiche formation complète pour : "${nom}"\n\nCertification officielle : ${codeRNCP}\n\nStructure le programme par BLOCS DE COMPÉTENCES officiels de ce référentiel. Cite le code dans l'intitulé. Sois extrêmement précis et exhaustif.`
      : `Génère la fiche formation complète pour : "${nom}"\n\nPas de certification officielle : construis un programme professionnel détaillé jour par jour, cohérent avec les pratiques du métier en France.`;

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
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
          tools: [FORMATION_TOOL],
          tool_choice: {
            type: "function",
            function: { name: "generate_formation" },
          },
        }),
      },
    );

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({
            error:
              "Limite de requêtes IA atteinte. Réessayez dans quelques instants.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({
            error:
              "Crédits IA épuisés. Ajoutez des crédits dans Lovable Cloud (Settings > Workspace > Usage).",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      return new Response(
        JSON.stringify({ error: "Erreur du service IA" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const data = await aiResponse.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("Réponse IA invalide:", JSON.stringify(data));
      return new Response(
        JSON.stringify({
          error: "L'IA n'a pas retourné de structure valide. Réessayez.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    let formation;
    try {
      formation = JSON.parse(toolCall.function.arguments);
    } catch (e) {
      console.error("JSON parse error:", e, toolCall.function.arguments);
      return new Response(
        JSON.stringify({ error: "Réponse IA mal formée" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ formation }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-formation-ai error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Erreur inconnue",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
