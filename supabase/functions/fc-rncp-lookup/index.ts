const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};


function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

async function fetchRncpPage(rncp: string): Promise<string | null> {
  const url = `https://www.francecompetences.fr/recherche/rncp/${rncp}/`;
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; LCA-VAE/1.0)" } });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  }
}

function parseRncp(html: string, rncp: string) {
  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const intitule = titleMatch ? stripTags(titleMatch[1]) : "";

  const niveauMatch = html.match(/Niveau\s*(?:de qualification)?\s*[:\-]?\s*<[^>]*>?\s*(\d)/i);
  const niveau = niveauMatch ? niveauMatch[1] : "";

  const certifMatch = html.match(/Certificateur[^<]*<[^>]*>([\s\S]{0,400}?)</i);
  const certificateur = certifMatch ? stripTags(certifMatch[1]).slice(0, 200) : "";

  const echeanceMatch = html.match(/(?:Date d['’]échéance|échéance de l['’]enregistrement)[^<]*<[^>]*>([\s\S]{0,80}?)</i);
  const dateEcheance = echeanceMatch ? stripTags(echeanceMatch[1]) : "";

  // Blocs : chercher "RNCPxxxxBCyy" et intitulés qui suivent
  const blocRegex = /RNCP\d+BC\d+/g;
  const codesUnique = Array.from(new Set(html.match(blocRegex) || []));
  const blocs = codesUnique.map((code) => {
    const re = new RegExp(code + "[\\s\\S]{0,300}?<[^>]+>([^<]{5,200})<", "i");
    const m = html.match(re);
    return { code, intitule: m ? stripTags(m[1]) : "" };
  });

  return {
    intitule,
    rncp,
    niveau,
    certificateur,
    dateEcheance,
    lien: `https://www.francecompetences.fr/recherche/rncp/${rncp}/`,
    blocs,
  };
}

async function searchRncpByName(query: string): Promise<string | null> {
  // Utilise la recherche interne du site
  const url = `https://www.francecompetences.fr/recherche/?text=${encodeURIComponent(query)}&type_recherche=rncp`;
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
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
  const authErr = await requireAuth(req);
  if (authErr) return authErr;

  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string") {
      return new Response(JSON.stringify({ error: "query required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    let rncp = query.replace(/\D+/g, "");
    if (!rncp || rncp.length < 3) {
      const found = await searchRncpByName(query);
      if (!found) {
        return new Response(JSON.stringify({ error: "Fiche introuvable — saisissez le code RNCP directement" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      rncp = found;
    }

    const html = await fetchRncpPage(rncp);
    if (!html) {
      return new Response(JSON.stringify({ error: "Impossible d'accéder à France Compétences", lien: `https://www.francecompetences.fr/recherche/rncp/${rncp}/` }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const parsed = parseRncp(html, rncp);
    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("fc-rncp-lookup error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
