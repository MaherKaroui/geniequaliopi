const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TOOL = {
  type: "function",
  function: {
    name: "suggest_rncp",
    description: "Propose 6 à 10 certifications RNCP pertinentes pour ce candidat VAE",
    parameters: {
      type: "object",
      properties: {
        suggestions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              rncp: { type: "string", description: "Code RNCP à 5 chiffres (ex : 38362)" },
              intitule: { type: "string", description: "Intitulé exact de la certification" },
              niveau: { type: "string" },
              certificateur: { type: "string" },
              justification: { type: "string" },
            },
            required: ["rncp", "intitule", "niveau", "justification"],
          },
        },
      },
      required: ["suggestions"],
    },
  },
};

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

async function fetchRncp(rncp: string): Promise<{ ok: boolean; intitule?: string; niveau?: string; certificateur?: string; active?: boolean } | null> {
  try {
    const r = await fetch(`https://www.francecompetences.fr/recherche/rncp/${rncp}/`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LCA-VAE/1.0)" },
    });
    if (!r.ok) return { ok: false };
    const html = await r.text();
    // Detect "fiche introuvable" pages
    if (/fiche.{0,20}(introuvable|n'existe pas|inexistante)/i.test(html)) return { ok: false };
    if (!new RegExp(`RNCP${rncp}\\b`).test(html)) return { ok: false };

    let intitule = "";
    const ogTitles = Array.from(html.matchAll(/property="og:title"\s+content="([^"]+)"/gi));
    for (const m of ogTitles) {
      const mm = m[1].match(new RegExp(`RNCP${rncp}\\s*[-–]\\s*(.+)$`, "i"));
      if (mm) { intitule = stripTags(mm[1]).trim(); break; }
    }
    const niveauMatch = html.match(/Niveau\s+(\d)\b/);
    const active = /statut[^<]{0,40}(actif|active)/i.test(html) || !/statut[^<]{0,40}inactif/i.test(html);
    return { ok: true, intitule, niveau: niveauMatch?.[1] || "", active };
  } catch {
    return null;
  }
}

async function searchRncpByName(query: string): Promise<string | null> {
  try {
    const r = await fetch(`https://www.francecompetences.fr/recherche/?text=${encodeURIComponent(query)}&type_recherche=rncp`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!r.ok) return null;
    const html = await r.text();
    const m = html.match(/\/recherche\/rncp\/(\d+)\//);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { candidat } = await req.json();
    if (!candidat) throw new Error("candidat required");

    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `Analyse ce parcours et propose 6 à 10 certifications RNCP françaises (France Compétences) réellement existantes et cohérentes avec l'expérience du candidat, en vue d'une VAE.

Règles strictes :
- Codes RNCP à 5 chiffres réels et ACTIFS uniquement (pas de fiches inactives, pas d'anciens codes RS).
- Intitulé exact tel qu'il apparaît sur francecompetences.fr.
- Niveau cohérent avec le poste et l'expérience (3 à 7).
- Propose PLUSIEURS candidats (au moins 6) pour maximiser la sélection valide.
- Classe du plus au moins pertinent.

CANDIDAT :
${JSON.stringify(candidat, null, 2)}

Renvoie via l'outil suggest_rncp.`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Tu es un conseiller VAE expert du répertoire RNCP France Compétences. Tu ne proposes QUE des certifications réellement existantes et actives, avec le code RNCP exact." },
          { role: "user", content: prompt },
        ],
        tools: [TOOL],
        tool_choice: { type: "function", function: { name: "suggest_rncp" } },
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
      console.error("No tool call. raw:", JSON.stringify(data).slice(0, 2000));
      throw new Error("Réponse IA vide, réessayez");
    }

    const parsed = JSON.parse(payload);
    const raw: any[] = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];

    // Validate each suggestion against France Compétences
    const validated = await Promise.all(raw.map(async (s) => {
      const code = String(s.rncp || "").replace(/\D+/g, "");
      if (!code) return null;
      let check = await fetchRncp(code);
      let finalCode = code;
      if (!check?.ok) {
        // Try to find real code by name
        const found = await searchRncpByName(s.intitule || "");
        if (!found) return null;
        finalCode = found;
        check = await fetchRncp(found);
        if (!check?.ok) return null;
      }
      return {
        rncp: finalCode,
        intitule: check.intitule || s.intitule,
        niveau: check.niveau || s.niveau || "",
        certificateur: s.certificateur || "",
        justification: s.justification || "",
        lien: `https://www.francecompetences.fr/recherche/rncp/${finalCode}/`,
      };
    }));

    // Dedupe by code and drop nulls
    const seen = new Set<string>();
    const suggestions = validated.filter((x): x is NonNullable<typeof x> => {
      if (!x) return false;
      if (seen.has(x.rncp)) return false;
      seen.add(x.rncp);
      return true;
    }).slice(0, 5);

    if (suggestions.length === 0) {
      return new Response(JSON.stringify({ error: "Aucune fiche RNCP valide trouvée — réessayez ou saisissez le code manuellement", suggestions: [] }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ suggestions }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("vae-suggest-rncp error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
