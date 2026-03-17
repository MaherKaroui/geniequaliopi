const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
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

    // Extract SIREN/SIRET from Pappers URL (e.g. /entreprise/nom-123456789)
    const sirenMatch = url.match(/(\d{9,14})/);
    if (!sirenMatch) {
      return new Response(
        JSON.stringify({ success: false, error: 'Impossible de trouver le SIREN/SIRET dans l\'URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const siren = sirenMatch[1].slice(0, 9); // Take first 9 digits = SIREN
    console.log('Fetching Pappers API for SIREN:', siren);

    // Use Pappers public search page as JSON source
    const apiUrl = `https://recherche.pappers.fr/v2/entreprise?siren=${siren}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.pappers.fr/',
      },
    });

    if (!response.ok) {
      // Fallback: try the suggestions API
      const searchUrl = `https://suggestions.pappers.fr/v2?q=${siren}&cibles=nom_entreprise,siren,siret`;
      const searchResp = await fetch(searchUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      
      if (!searchResp.ok) {
        const body = await searchResp.text();
        console.error('Search API error:', searchResp.status, body);
        return new Response(
          JSON.stringify({ success: false, error: `Erreur API Pappers: ${searchResp.status}` }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const searchData = await searchResp.json();
      console.log('Search results:', JSON.stringify(searchData).slice(0, 500));
      
      const company = searchData?.resultats_siren?.[0] || searchData?.resultats_nom_entreprise?.[0] || searchData?.[0];
      
      if (!company) {
        return new Response(
          JSON.stringify({ success: false, error: 'Entreprise non trouvée' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const result = extractCompanyData(company);
      console.log('Parsed from search:', JSON.stringify(result));
      
      return new Response(
        JSON.stringify({ success: true, data: result }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('API response keys:', Object.keys(data));
    
    const result = extractCompanyData(data);
    console.log('Parsed data:', JSON.stringify(result));

    return new Response(
      JSON.stringify({ success: true, data: result }),
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

function extractCompanyData(data: any) {
  // Handle various Pappers API response formats
  const nom = data.nom_complet || data.nom_entreprise || data.denomination || '';
  const siret = data.siege?.siret || data.siret || '';
  const siren = data.siren || '';
  
  // Address
  const siege = data.siege || data;
  const adresse = siege.adresse_ligne_1 || siege.adresse || '';
  const codePostal = siege.code_postal || '';
  const ville = siege.ville || siege.libelle_commune || '';
  
  // Dirigeant
  let dirigeant = '';
  if (data.representants && data.representants.length > 0) {
    const rep = data.representants[0];
    dirigeant = `${rep.prenom || ''} ${rep.nom || ''}`.trim();
  } else if (data.dirigeants && data.dirigeants.length > 0) {
    const dir = data.dirigeants[0];
    dirigeant = `${dir.prenom || ''} ${dir.nom || ''}`.trim();
  }
  
  // Activity
  const domainesFormation = data.libelle_activite_principale || 
                             siege.libelle_activite_principale ||
                             data.activite_principale || '';

  return {
    nom,
    siret: siret || (siren ? siren : ''),
    siren,
    adresse,
    codePostal,
    ville,
    dirigeant,
    domainesFormation,
    nda: '',
    siteWeb: '',
  };
}
