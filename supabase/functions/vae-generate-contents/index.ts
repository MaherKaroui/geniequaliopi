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
        contexte: { type: "string" },
        description: { type: "string" },
        moyens: { type: "string" },
        analyse: { type: "string" },
      },
      required: ["codeBloc", "intitule", "contexte", "description", "moyens", "analyse"],
    },
  },
};

function textOf(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function stripForbiddenPlaceholders(text: string): string {
  return text
    .replace(/à\s+rédiger(?:\s+avec\s+le\s+candidat)?/gi, "")
    .replace(/à\s+compléter/gi, "")
    .replace(/\.{3,}|…{2,}/g, "")
    .trim();
}

function extractFallbackSection(raw: string, label: string, next: string[]): string {
  const re = new RegExp(`\\[${label}\\]\\s*([\\s\\S]*?)(?=\\s*\\[(?:${next.join("|")})\\]|$)`, "i");
  return textOf(raw.match(re)?.[1]);
}

function getCandidateExperienceSummary(candidat: any): string {
  const experiences = Array.isArray(candidat?.experiences) ? candidat.experiences : [];
  if (!experiences.length) {
    return `${candidat?.emploiActuel || "mon poste"}${candidat?.employeur ? ` chez ${candidat.employeur}` : ""}`;
  }
  return experiences
    .slice(0, 3)
    .map((x: any) => `${x.poste || "poste exercé"} chez ${x.entreprise || "l'employeur"}${x.dateDebut || x.dateFin ? ` (${[x.dateDebut, x.dateFin].filter(Boolean).join(" - ")})` : ""} : ${String(x.missions || "missions opérationnelles et responsabilités professionnelles").slice(0, 260)}`)
    .join(" ; ");
}

function competencesList(bloc: any): string[] {
  const arr = bloc?.competences || bloc?.criteres || [];
  if (!Array.isArray(arr)) return [];
  return arr.map((c: any) => typeof c === "string" ? c : (c?.intitule || c?.libelle || c?.description || "")).filter(Boolean);
}

function fallbackAnalysis(candidat: any, bloc: any): string {
  const intitule = bloc?.intitule || bloc?.libelle || "ce bloc de compétences";
  const code = bloc?.code || bloc?.codeBloc || "";
  const exp = getCandidateExperienceSummary(candidat);
  const comps = competencesList(bloc);
  const compsPart = comps.length
    ? `Plus précisément, j'ai mobilisé les compétences suivantes : ${comps.slice(0, 6).map((c, i) => `(${i + 1}) ${c}`).join(" ; ")}. Pour chacune, j'ai pu m'appuyer sur des situations vécues qui prouvent une pratique régulière et réfléchie, et pas seulement une connaissance théorique.`
    : `J'ai mobilisé l'ensemble des compétences attendues par le référentiel de ce bloc, en les articulant les unes aux autres dans des situations professionnelles réelles.`;
  return `J'ai démontré ma capacité à mettre en œuvre les compétences du bloc ${code ? `${code} — ` : ""}${intitule} à partir de situations professionnelles concrètes issues de mon parcours (${exp}). ${compsPart} Mon activité m'a conduit à analyser les besoins, organiser les priorités, choisir les méthodes adaptées, coordonner les interlocuteurs concernés et produire des livrables vérifiables dans le respect des délais et de la qualité attendue. J'ai su transformer chaque demande ou objectif en un plan d'action opérationnel, en tenant compte du contexte de l'entreprise, des contraintes réglementaires et des ressources disponibles. J'ai également formalisé mes décisions, suivi les résultats obtenus, mesuré les écarts et ajusté mes pratiques lorsque cela était nécessaire, ce qui atteste d'une posture professionnelle réflexive. Cette expérience prouve que je ne me suis pas limité à exécuter des tâches : j'ai pris du recul sur les situations rencontrées, identifié les enjeux propres au bloc et apporté des réponses cohérentes, argumentées et transférables. Les activités décrites témoignent ainsi de ma maîtrise effective des compétences liées à ${intitule}, aussi bien dans la préparation que dans la mise en œuvre, le contrôle et l'amélioration continue des actions menées.`;
}

function fallbackContexte(candidat: any, bloc: any): string {
  const intitule = bloc?.intitule || bloc?.libelle || "le bloc de compétences";
  return `J'ai exercé ces activités dans un environnement professionnel directement lié à ${intitule}. Mon parcours, notamment ${getCandidateExperienceSummary(candidat)}, m'a placé dans des situations où je devais répondre à des objectifs concrets, coordonner mes actions avec différents interlocuteurs et produire des résultats utiles à l'organisation. La finalité de l'activité était de contribuer au bon fonctionnement du service, à la satisfaction des bénéficiaires ou clients, et à l'atteinte des objectifs opérationnels fixés.`;
}

function fallbackDescription(candidat: any, bloc: any): string {
  const intitule = bloc?.intitule || bloc?.libelle || "ce domaine d'activité";
  return `Dans ces situations, j'ai pris en charge plusieurs activités représentatives de ${intitule}. J'ai commencé par analyser la demande, recueillir les informations nécessaires et identifier les priorités. J'ai ensuite organisé mon travail, mobilisé les ressources disponibles, réalisé les actions prévues et assuré le suivi des résultats. Lorsque des difficultés apparaissaient, j'adaptais ma méthode, sollicitais les interlocuteurs compétents et formalisais les éléments importants afin de garantir la continuité et la qualité du travail réalisé.`;
}

function fallbackMoyens(bloc: any): string {
  const intitule = bloc?.intitule || bloc?.libelle || "l'activité";
  return `Pour réaliser ces activités, j'ai mobilisé des outils bureautiques, des supports de suivi, des échanges professionnels, des procédures internes et des méthodes d'organisation adaptées à ${intitule}. J'ai utilisé des tableaux de bord, des documents de travail, des comptes rendus, des outils numériques de communication et des référentiels métier afin de sécuriser mes actions et de conserver une traçabilité des décisions prises.`;
}

const ANALYSE_TOOL = {
  type: "function",
  function: {
    name: "generate_vae_analyse",
    parameters: {
      type: "object",
      properties: { analyse: { type: "string" } },
      required: ["analyse"],
    },
  },
};

async function regenerateAnalyse(key: string, ctx: string, bloc: any, contexte: string, description: string, moyens: string): Promise<string> {
  const comps = competencesList(bloc);
  const prompt = `${ctx}

BLOC : ${bloc?.code || bloc?.codeBloc || ""} — ${bloc?.intitule || bloc?.libelle || ""}
COMPÉTENCES DU BLOC : ${JSON.stringify(comps)}

CONTEXTE DÉJÀ RÉDIGÉ :
${contexte}

DESCRIPTION DÉJÀ RÉDIGÉE :
${description}

MOYENS DÉJÀ RÉDIGÉS :
${moyens}

Rédige UNIQUEMENT la section "Analyse des compétences que j'ai mises en œuvre" pour ce bloc, à la première personne, ENTIÈREMENT rédigée (minimum 15 lignes, ~1500 caractères), sans aucun placeholder, "À rédiger", "à compléter", pointillés ou parenthèses vides.

STRUCTURE OBLIGATOIRE :
1. Commence exactement par : "J'ai démontré ma capacité à"
2. Reprends UNE PAR UNE chaque compétence du bloc listée ci-dessus et explique comment je l'ai mobilisée, en t'appuyant sur les situations concrètes du CV et des sections ci-dessus.
3. Donne des exemples précis (outils, livrables, interlocuteurs, résultats).
4. Termine par une phrase complète de prise de recul professionnel montrant la maîtrise du bloc.

Renvoie via l'outil generate_vae_analyse.`;

  try {
    const r = await callAI(key, prompt, ANALYSE_TOOL, "generate_vae_analyse", 4000);
    return stripForbiddenPlaceholders(textOf(r?.analyse));
  } catch (e) {
    console.error("Analyse regen failed", e);
    return "";
  }
}

function normalizeBlocPayload(bloc: any, sourceBloc: any, candidat: any) {
  const raw = textOf(bloc?.situations);
  const contexte = stripForbiddenPlaceholders(textOf(bloc?.contexte) || extractFallbackSection(raw, "CONTEXTE", ["DESCRIPTION", "MOYENS", "ANALYSE"])) || fallbackContexte(candidat, sourceBloc);
  const description = stripForbiddenPlaceholders(textOf(bloc?.description) || extractFallbackSection(raw, "DESCRIPTION", ["MOYENS", "ANALYSE"])) || fallbackDescription(candidat, sourceBloc);
  const moyens = stripForbiddenPlaceholders(textOf(bloc?.moyens) || extractFallbackSection(raw, "MOYENS", ["ANALYSE"])) || fallbackMoyens(sourceBloc);
  const analyse = stripForbiddenPlaceholders(textOf(bloc?.analyse) || extractFallbackSection(raw, "ANALYSE", []));
  return { contexte, description, moyens, analyse };
}

function assembleBloc(sourceBloc: any, parts: { contexte: string; description: string; moyens: string; analyse: string }) {
  return {
    codeBloc: sourceBloc?.code || sourceBloc?.codeBloc || "",
    intitule: sourceBloc?.intitule || sourceBloc?.libelle || "",
    situations: `[CONTEXTE]\n${parts.contexte}\n\n[DESCRIPTION]\n${parts.description}\n\n[MOYENS]\n${parts.moyens}\n\n[ANALYSE]\n${parts.analyse}`,
  };
}


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

    // 2) One call per bloc, with separate fields to avoid an empty/truncated Analyse section.
    const blocs: any[] = Array.isArray(certification?.blocs) ? certification.blocs : [];
    const situationsParBloc: any[] = [];

    for (const b of blocs) {
      const blocPrompt = `${ctx}

BLOC À TRAITER : code=${b.code || b.codeBloc || ""} — intitulé="${b.intitule || b.libelle || ""}"
Compétences du bloc : ${JSON.stringify(b.competences || b.criteres || [])}

Rédige UNIQUEMENT CE bloc, à la première personne, ENTIÈREMENT rédigé, sans aucun placeholder, "À rédiger", pointillés ou parenthèses vides. Décris des situations concrètes reliant les expériences du CV aux compétences du bloc.

CHAMPS OBLIGATOIRES À REMPLIR DANS L'OUTIL :

contexte : 8-12 lignes : secteur, employeur, période, objectifs, place dans l'organisation.

description : 12-18 lignes : activités concrètes exercées, étapes, tâches, interlocuteurs, missions représentatives, période et employeur cités.

moyens : 6-10 lignes : outils logiciels, méthodes, procédures, référentiels, appuis.

analyse : 12-18 lignes OBLIGATOIRES. Ne jamais laisser vide. Commence par "J'ai démontré ma capacité à" puis nomme explicitement les compétences du bloc et explique comment je les ai mobilisées, avec preuves issues du CV. Termine par une phrase complète de prise de recul professionnel.

Reprends codeBloc="${b.code || b.codeBloc || ""}" et intitule="${b.intitule || b.libelle || ""}" à l'identique. Renvoie via l'outil generate_vae_bloc.`;

      try {
        const bloc = await callAI(key, blocPrompt, BLOC_TOOL, "generate_vae_bloc", 8000);
        const parts = normalizeBlocPayload(bloc, b, candidat);
        // If analyse is too short or doesn't start correctly, regenerate it with a dedicated call.
        const analyseOk = parts.analyse.length >= 900 && /j'ai\s+d[ée]montr[ée]/i.test(parts.analyse);
        if (!analyseOk) {
          const regen = await regenerateAnalyse(key, ctx, b, parts.contexte, parts.description, parts.moyens);
          if (regen.length >= 900) parts.analyse = regen;
          else if (parts.analyse.length < 450) parts.analyse = fallbackAnalysis(candidat, b);
        }
        situationsParBloc.push(assembleBloc(b, parts));
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
