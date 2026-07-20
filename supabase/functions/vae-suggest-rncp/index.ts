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

function decodeHtml(s: string): string {
  return (s || "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(html: string): string {
  return decodeHtml(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
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

function normalize(s: string): string {
  return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
}
const STOP = new Set(["de","du","des","la","le","les","un","une","et","en","d","l","a","au","aux","pour","dans","par","sur","avec","fiche","nationale","titre","master","licence","bts","bac","pro","professionnel","professionnelle","diplome","certificat","specialite","ingenieur"]);
function tokens(s: string): Set<string> {
  return new Set(normalize(s).split(" ").filter(w => w.length >= 3 && !STOP.has(w)));
}
function titleSimilarity(a: string, b: string): number {
  const ta = tokens(a), tb = tokens(b);
  if (!ta.size || !tb.size) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  return inter / Math.min(ta.size, tb.size);
}

interface RncpSuggestion {
  rncp: string;
  intitule: string;
  niveau: string;
  certificateur?: string;
  justification: string;
  lien: string;
  score?: number;
  sourceQuery?: string;
}

function candidateText(candidat: any): string {
  return [
    candidat.emploiActuel,
    candidat.employeur,
    candidat.niveauFormation,
    ...(candidat.competences || []),
    ...(candidat.diplomes || []).map((d: any) => `${d.intitule || ""} ${d.etablissement || ""}`),
    ...(candidat.experiences || []).flatMap((e: any) => [e.poste, e.entreprise, e.missions]),
  ].filter(Boolean).join(" ");
}

function inferDomains(text: string): string[] {
  const n = normalize(text);
  const domains: Record<string, string[]> = {
    formation: ["formation", "formateur", "pedagog", "enseignement", "apprentissage", "ingenierie", "referent"],
    beaute: ["maquill", "esthet", "cosmet", "beaute", "perruquier", "visage", "artistique"],
    commerce: ["commercial", "vente", "client", "negociation", "prospection", "marketing", "business"],
    rh: ["ressources humaines", "recrutement", "paie", "rh", "personnel"],
    administratif: ["secretair", "administr", "assistant", "comptable", "gestion", "facturation"],
    restauration: ["restaurant", "cuisine", "culinaire", "service", "haccp", "alimentaire"],
    logistique: ["logistique", "transport", "stock", "magasin", "supply", "livraison"],
    sante_social: ["social", "medico", "sante", "soin", "educateur", "accompagnement"],
    informatique: ["informatique", "developp", "reseau", "systeme", "cyber", "data", "logiciel"],
    batiment: ["batiment", "chantier", "construction", "electric", "plomberie", "peinture"],
    securite: ["securite", "surveillance", "gardiennage", "incendie"],
  };
  return Object.entries(domains).filter(([, words]) => words.some(w => n.includes(w))).map(([d]) => d);
}

function domainScore(domains: string[], title: string): number {
  if (!domains.length) return 0;
  const t = normalize(title);
  const domainWords: Record<string, string[]> = {
    formation: ["formation", "formateur", "pedagog", "enseignement", "apprentissage", "ingenierie"],
    beaute: ["maquill", "esthet", "cosmet", "beaute", "perruquier"],
    commerce: ["commercial", "vente", "client", "negociateur", "marketing", "business"],
    rh: ["ressources humaines", "paie", "recrutement", "rh"],
    Subsidiary: [],
    administratif: ["secretair", "administr", "assistant", "comptable", "gestion"],
    restauration: ["restaurant", "cuisine", "culinaire", "service", "alimentaire"],
    logistique: ["logistique", "transport", "stock", "supply"],
    sante_social: ["social", "medico", "sante", "soin", "educateur"],
    informatique: ["informatique", "developp", "reseau", "cyber", "data", "logiciel"],
    batiment: ["batiment", "chantier", "construction", "electric", "plomberie", "peinture"],
    securite: ["securite", "surveillance", "incendie"],
  };
  return domains.some(d => (domainWords[d] || []).some(w => t.includes(w))) ? 0.65 : -0.35;
}

function topMissionWords(text: string, limit = 5): string[] {
  const counts = new Map<string, number>();
  for (const w of normalize(text).split(" ")) {
    if (w.length < 5 || STOP.has(w)) continue;
    counts.set(w, (counts.get(w) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([w]) => w);
}

function buildSearchQueries(candidat: any, aiSuggestions: any[]): string[] {
  const rawText = candidateText(candidat);
  const domains = inferDomains(rawText);
  const queries: string[] = [];
  const add = (q?: string) => {
    const clean = stripTags(String(q || "")).replace(/\s+/g, " ").trim();
    if (clean.length >= 4 && !queries.some(x => normalize(x) === normalize(clean))) queries.push(clean.slice(0, 120));
  };

  add(candidat.emploiActuel);
  for (const e of (candidat.experiences || []).slice(0, 5)) {
    add(e.poste);
    const words = topMissionWords(e.missions || "", 4).join(" ");
    add(`${e.poste || ""} ${words}`);
  }
  for (const s of aiSuggestions) add(s.intitule);

  if (domains.includes("formation")) {
    add("formateur professionnel adultes");
    add("responsable pédagogique formation");
    add("responsable de dispositifs de formation");
    add("responsable projets ingénierie formation");
    add("consultant formateur");
  }
  if (domains.includes("beaute")) {
    add("maquilleur professionnel");
    add("maquilleur artistique professionnel");
    add("esthétique cosmétique");
  }
  if (domains.includes("commerce")) {
    add("négociateur technico commercial");
    add("manager unité marchande");
    add("responsable développement commercial");
  }
  if (domains.includes("rh")) {
    add("assistant ressources humaines");
    add("chargé ressources humaines");
    add("gestionnaire de paie");
  }
  if (domains.includes("administratif")) {
    add("secrétaire assistant");
    add("secrétaire comptable");
    add("assistant de gestion");
  }

  if (!queries.length) add(topMissionWords(rawText, 6).join(" "));
  return queries.slice(0, 12);
}

async function searchFranceCompetences(query: string): Promise<RncpSuggestion[]> {
  try {
    const url = `https://www.francecompetences.fr/recherche-resultats/?types=certification&search=${encodeURIComponent(query)}&pageType=certification&active=1`;
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; LCA-VAE/1.0)" } });
    if (!r.ok) return [];
    const html = await r.text();
    const cards = html.split("card--results--certification--essential__wrapper").slice(1);
    const out: RncpSuggestion[] = [];
    for (const card of cards.slice(0, 12)) {
      const code = card.match(/href="\/recherche\/rncp\/(\d+)"/)?.[1]
        || card.match(/RNCP\s*(\d{3,6})/i)?.[1];
      const title = stripTags(card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1] || "");
      const status = stripTags(card.match(/__status[^>]*>([\s\S]*?)<\/span>/i)?.[1] || "");
      if (!code || !title || !/active/i.test(status) || /inactive/i.test(status)) continue;
      const niveau = card.match(/Niveau\s+(\d)/i)?.[1] || "";
      const cert = stripTags(card.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i)?.[1] || "");
      const date = stripTags(card.match(/Ech[ée]ance[\s\S]{0,900}?highlighted[^>]*>([\s\S]*?)<\/span>/i)?.[1] || "");
      out.push({
        rncp: code,
        intitule: title,
        niveau,
        certificateur: cert,
        justification: `Correspondance détectée avec le parcours renseigné, via la recherche « ${query} » sur les certifications actives.`,
        lien: `https://www.francecompetences.fr/recherche/rncp/${code}/`,
        sourceQuery: query,
        ...(date ? { dateEcheance: date } : {} as any),
      });
    }
    return out;
  } catch (e) {
    console.error("FC search failed", query, e);
    return [];
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { candidat } = await req.json();
    if (!candidat) throw new Error("candidat required");

    const key = Deno.env.get("LOVABLE_API_KEY");

    // Distillation du parcours pour forcer l'IA à raisonner sur l'expérience réelle
    const expLines = (candidat.experiences || []).map((e: any) =>
      `• ${e.poste || "?"} — ${e.entreprise || "?"} (${e.dateDebut || "?"} → ${e.dateFin || "présent"})\n  Missions : ${(e.missions || "").slice(0, 800)}`
    ).join("\n");
    const totalMonths = (candidat.experiences || []).reduce((acc: number, e: any) => {
      const d1 = new Date(e.dateDebut || ""); const d2 = e.dateFin ? new Date(e.dateFin) : new Date();
      if (isNaN(+d1) || isNaN(+d2)) return acc;
      return acc + Math.max(0, (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth()));
    }, 0);

    const prompt = `Tu dois proposer des certifications RNCP France Compétences pour une VAE, en te basant STRICTEMENT sur les missions réellement exercées par le candidat.

MÉTHODE OBLIGATOIRE (raisonne étape par étape avant de proposer) :
1. Identifie le métier dominant (celui exercé le plus longtemps et le plus récent).
2. Extrais les activités-clés récurrentes dans les missions (verbes d'action + objets).
3. Détermine le secteur (commerce, RH, industrie, tertiaire, santé, IT, hôtellerie, bâtiment, transport, esthétique, etc.).
4. Estime le niveau (3=CAP/BEP, 4=Bac, 5=Bac+2, 6=Licence/Bachelor, 7=Master) selon les responsabilités RÉELLES (encadrement, autonomie, pilotage, expertise).
5. Ne propose QUE des titres dont le référentiel d'activités recouvre >70 % des missions listées. INTERDICTION de suggérer un titre juste parce que le mot-clé apparaît dans l'intitulé du poste.

CANDIDAT
========
Civilité/Nom : ${candidat.civilite || ""} ${candidat.prenom || ""} ${candidat.nom || ""}
Poste actuel : ${candidat.emploiActuel || "?"} chez ${candidat.employeur || "?"}
Statut : ${candidat.statut || "?"}
Niveau de formation : ${candidat.niveauFormation || "?"}
Diplômes : ${(candidat.diplomes || []).map((d: any) => `${d.intitule} (${d.annee || "?"})`).join(" ; ") || "—"}
Compétences déclarées : ${(candidat.competences || []).join(", ") || "—"}
Ancienneté cumulée : ~${Math.round(totalMonths / 12)} ans (${totalMonths} mois)

EXPÉRIENCES DÉTAILLÉES
======================
${expLines || "(aucune expérience renseignée)"}

CONSIGNES DE SORTIE
- Propose 6 à 10 certifications RNCP réellement existantes, actives, avec code à 5 chiffres exact.
- Intitulé EXACT tel que publié sur francecompetences.fr.
- Classe du plus pertinent au moins pertinent.
- Dans "justification", explique en 1-2 phrases quelles missions du candidat couvrent quels blocs/activités du titre — cite des éléments concrets du parcours (pas de généralités).
- Rejette tout titre hors du champ d'activité réel.`;

    let raw: any[] = [];
    if (key) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 22000);
        const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: "Tu es un conseiller VAE expert du RNCP France Compétences. Tu analyses le parcours en profondeur avant de proposer, et tu ne suggères QUE des titres dont le référentiel correspond réellement aux activités exercées. Tu refuses de te fier aux intitulés de poste : seules les missions comptent." },
              { role: "user", content: prompt },
            ],
            tools: [TOOL],
            tool_choice: { type: "function", function: { name: "suggest_rncp" } },
          }),
        });
        clearTimeout(timer);

        if (r.ok) {
          const data = await r.json();
          const msg = data.choices?.[0]?.message;
          let payload: string | undefined = msg?.tool_calls?.[0]?.function?.arguments;
          if (!payload && typeof msg?.content === "string") {
            const m = msg.content.match(/\{[\s\S]*\}/);
            if (m) payload = m[0];
          }
          if (payload) {
            const parsed = JSON.parse(payload);
            raw = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];
          } else {
            console.error("No tool call. raw:", JSON.stringify(data).slice(0, 1200));
          }
        } else {
          console.error("AI gateway skipped", r.status, await r.text());
        }
      } catch (e) {
        console.error("AI suggestion skipped", e);
      }
    }

    // Validate each suggestion: the code MUST exist AND its real title must match the IA-proposed title
    const validated = await Promise.all(raw.map(async (s) => {
      const code = String(s.rncp || "").replace(/\D+/g, "");
      if (!code || code.length < 4) return null;
      const check = await fetchRncp(code);
      if (!check?.ok) return null;
      const realTitle = (check.intitule || "").trim();
      if (!realTitle) return null;
      const sim = titleSimilarity(realTitle, s.intitule || "");
      // Reject any code whose real title has < 40% token overlap with what the IA proposed
      if (sim < 0.3) {
        console.log(`Dropped RNCP${code}: IA said "${s.intitule}" but FC says "${realTitle}" (sim=${sim.toFixed(2)})`);
        return null;
      }
      return {
        rncp: code,
        intitule: realTitle,
        niveau: check.niveau || s.niveau || "",
        certificateur: s.certificateur || "",
        justification: s.justification || "",
        lien: `https://www.francecompetences.fr/recherche/rncp/${code}/`,
        score: 1.2 + sim,
      };
    }));

    // Ne dépend plus uniquement des codes inventés par l'IA : on interroge aussi
    // les résultats actifs France Compétences à partir des métiers/missions du CV.
    const text = candidateText(candidat);
    const domains = inferDomains(text);
    const searchQueries = buildSearchQueries(candidat, raw);
    const fcResults = (await Promise.all(searchQueries.map(searchFranceCompetences))).flat();
    const scoredFc = fcResults.map((s, idx) => {
      const queryBoost = s.sourceQuery ? titleSimilarity(s.sourceQuery, s.intitule) : 0;
      const cvBoost = titleSimilarity(text, s.intitule);
      const aiBoost = raw.reduce((best, ai) => Math.max(best, titleSimilarity(ai.intitule || "", s.intitule)), 0);
      return {
        ...s,
        score: domainScore(domains, s.intitule) + queryBoost * 0.7 + cvBoost * 0.55 + aiBoost * 0.35 + Math.max(0, 0.2 - idx * 0.002),
      };
    });

    // Dedupe by code and drop nulls
    const seen = new Set<string>();
    const suggestions = [...validated.filter(Boolean), ...scoredFc]
      .filter((x): x is NonNullable<typeof x> => Boolean(x))
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .filter((x) => (x.score || 0) > 0.05)
      .filter((x) => {
      if (!x) return false;
      if (seen.has(x.rncp)) return false;
      seen.add(x.rncp);
      return true;
    }).slice(0, 5).map(({ score, sourceQuery, ...x }) => x);

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
