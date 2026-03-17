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

    // Extract SIREN from Pappers URL
    const sirenMatch = url.match(/(\d{9,14})/);
    if (!sirenMatch) {
      return new Response(
        JSON.stringify({ success: false, error: 'Impossible de trouver le SIREN dans l\'URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const siren = sirenMatch[1].slice(0, 9);
    console.log('Looking up SIREN:', siren);

    // Use suggestions.pappers.fr (public, no API key needed)
    const suggestUrl = `https://suggestions.pappers.fr/v2?q=${siren}&cibles=nom_entreprise,siren,siret`;
    const suggestResp = await fetch(suggestUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://www.pappers.fr',
        'Referer': 'https://www.pappers.fr/',
      },
    });

    if (!suggestResp.ok) {
      const errBody = await suggestResp.text();
      console.error('Suggestions API error:', suggestResp.status, errBody);
      return new Response(
        JSON.stringify({ success: false, error: `Erreur API: ${suggestResp.status}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const suggestData = await suggestResp.json();
    console.log('Suggestions response:', JSON.stringify(suggestData).slice(0, 1000));

    // Find matching company
    const results = suggestData?.resultats_siren || suggestData?.resultats_nom_entreprise || suggestData || [];
    const company = Array.isArray(results) ? results[0] : results;

    if (!company) {
      return new Response(
        JSON.stringify({ success: false, error: 'Entreprise non trouvée pour ce SIREN' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = {
      nom: company.nom_complet || company.denomination || company.nom_entreprise || '',
      siret: company.siege?.siret || company.siret || '',
      siren: company.siren || siren,
      adresse: company.siege?.adresse_ligne_1 || company.siege?.adresse || '',
      codePostal: company.siege?.code_postal || '',
      ville: company.siege?.ville || company.siege?.libelle_commune || '',
      dirigeant: extractDirigeant(company),
      domainesFormation: company.libelle_activite_principale || company.siege?.libelle_activite_principale || '',
      nda: '',
      siteWeb: '',
    };

    console.log('Parsed:', JSON.stringify(result));

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

function extractDirigeant(data: any): string {
  const reps = data.representants || data.dirigeants || [];
  if (reps.length > 0) {
    const r = reps[0];
    return `${r.prenom || ''} ${r.nom || ''}`.trim();
  }
  return data.dirigeant || '';
}
