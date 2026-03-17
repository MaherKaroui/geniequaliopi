const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url || !url.includes('pappers.fr')) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL Pappers invalide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching Pappers URL:', url);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'fr-FR,fr;q=0.9',
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ success: false, error: `Erreur HTTP ${response.status}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await response.text();

    // Extract company name from <h1> or <title>
    const nomMatch = html.match(/<h1[^>]*>([^<]+)</) || html.match(/<title>([^<|]+)/);
    const nom = nomMatch ? nomMatch[1].trim().replace(/\s*\(.*?\)\s*$/, '') : '';

    // Extract SIREN from URL or page content
    const sirenFromUrl = url.match(/(\d{9,14})/);
    let siret = '';
    let siren = sirenFromUrl ? sirenFromUrl[1] : '';
    
    // Try to find SIRET (14 digits) in page
    const siretMatch = html.match(/SIRET[^0-9]*(\d{3}\s?\d{3}\s?\d{3}\s?\d{5})/i) || 
                        html.match(/(\d{14})/);
    if (siretMatch) {
      siret = siretMatch[1].replace(/\s/g, '');
    } else if (siren.length === 9) {
      siret = siren; // We'll just use SIREN
    }

    // Extract address
    const adresseMatch = html.match(/Adresse[^:]*:\s*<\/[^>]+>\s*<[^>]+>([^<]+)/i) ||
                          html.match(/Siège social[^:]*:\s*([^<]+)/i) ||
                          html.match(/(?:adresse|siege)[^"]*"[^"]*"[^>]*>([^<]+)/i);
    let adresse = '', codePostal = '', ville = '';
    if (adresseMatch) {
      const fullAddr = adresseMatch[1].trim();
      const cpVilleMatch = fullAddr.match(/,?\s*(\d{5})\s+(.+)$/);
      if (cpVilleMatch) {
        codePostal = cpVilleMatch[1];
        ville = cpVilleMatch[2].trim();
        adresse = fullAddr.replace(/,?\s*\d{5}\s+.+$/, '').trim();
      } else {
        adresse = fullAddr;
      }
    }

    // Extract dirigeant
    const dirigeantMatch = html.match(/Dirigeants?[^:]*:\s*<\/[^>]+>\s*<[^>]+>[^>]*>([^<]+)/i) ||
                           html.match(/dirigeant[^"]*"[^"]*"[^>]*>[^>]*>([^<]+)/i);
    const dirigeant = dirigeantMatch ? dirigeantMatch[1].trim() : '';

    // Extract activity / domaine
    const activiteMatch = html.match(/Activit[ée][^:]*:\s*<\/[^>]+>\s*<[^>]+>([^<]+)/i);
    const domainesFormation = activiteMatch ? activiteMatch[1].trim() : '';

    // Try to extract NDA (Numéro de Déclaration d'Activité) - unlikely on Pappers
    const ndaMatch = html.match(/(?:NDA|déclaration d'activité)[^0-9]*(\d{11})/i);
    const nda = ndaMatch ? ndaMatch[1] : '';

    // Try site web
    const siteMatch = html.match(/site[^:]*:\s*<\/[^>]+>\s*<[^>]+href="([^"]+)"/i);
    const siteWeb = siteMatch ? siteMatch[1] : '';

    const result = {
      success: true,
      data: {
        nom,
        siret,
        siren,
        adresse,
        codePostal,
        ville,
        dirigeant,
        domainesFormation,
        nda,
        siteWeb,
      }
    };

    console.log('Parsed data:', JSON.stringify(result.data));

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
