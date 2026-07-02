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
  // Intitulé réel : og:title « RNCPxxxxx - <intitulé> » (2e occurrence sur la page fiche)
  let intitule = "";
  const ogTitles = Array.from(html.matchAll(/property="og:title"\s+content="([^"]+)"/gi));
  for (const m of ogTitles) {
    const t = m[1];
    const mm = t.match(new RegExp(`RNCP${rncp}\\s*[-–]\\s*(.+)$`, "i"));
    if (mm) { intitule = stripTags(mm[1]).trim(); break; }
  }
  if (!intitule && ogTitles.length > 1) intitule = stripTags(ogTitles[1][1]);

  const niveauMatch = html.match(/Niveau\s+(\d)\b/);
  const niveau = niveauMatch ? niveauMatch[1] : "";

  // Certificateur : après le 2e "Certificateur", chercher un nom en MAJUSCULES
  let certificateur = "";
  const cert1 = html.indexOf("Certificateur");
  const cert2 = cert1 >= 0 ? html.indexOf("Certificateur", cert1 + 50) : -1;
  if (cert2 > 0) {
    const zone = stripTags(html.slice(cert2, cert2 + 3000));
    const mm = zone.match(/\b([A-ZÉÈÊÀÂÎÔÛÇ][A-ZÉÈÊÀÂÎÔÛÇ'’\-\s]{6,120}[A-ZÉÈÊÀÂÎÔÛÇ])\b/);
    if (mm) certificateur = mm[1].replace(/\s+/g, " ").trim();
  }

  const echeanceMatch = html.match(/[éÉ]ch[ée]ance[\s\S]{0,600}?(\d{2}[-/]\d{2}[-/]\d{4})/);
  const dateEcheance = echeanceMatch ? echeanceMatch[1] : "";

  // Blocs : « RNCPxxxxBCyy - <intitulé> » jusqu'à retour ligne ou balise
  const blocRegex = new RegExp(`RNCP${rncp}BC\\d+`, "g");
  const codesUnique = Array.from(new Set(html.match(blocRegex) || []));
  const blocs = codesUnique.map((code) => {
    const re = new RegExp(code + "\\s*[-–]\\s*([^<\\n\\r]{3,250})", "i");
    const m = html.match(re);
    return { code, intitule: m ? stripTags(m[1]).trim() : "" };
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
