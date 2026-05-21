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

    // Use the official French government API (recherche-entreprises) — free, no key
    const apiUrl = `https://recherche-entreprises.api.gouv.fr/search?q=${siren}&page=1&per_page=1`;
    const resp = await fetch(apiUrl, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0' },
    });

    if (!resp.ok) {
      const errBody = await resp.text();
      console.error('API error:', resp.status, errBody);
      return new Response(
        JSON.stringify({ success: false, error: `Erreur API: ${resp.status}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiData = await resp.json();
    console.log('API response:', JSON.stringify(apiData).slice(0, 1000));

    const company = apiData?.results?.[0];

    if (!company) {
      return new Response(
        JSON.stringify({ success: false, error: 'Entreprise non trouvée pour ce SIREN' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const siege = company.siege || {};
    const adresse = siege.adresse
      || [siege.numero_voie, siege.type_voie, siege.libelle_voie].filter(Boolean).join(' ').trim();

    const result = {
      nom: company.nom_complet || company.nom_raison_sociale || '',
      siret: siege.siret || '',
      siren: company.siren || siren,
      adresse,
      codePostal: siege.code_postal || '',
      ville: siege.libelle_commune || siege.commune || '',
      dirigeant: extractDirigeant(company),
      domainesFormation: company.activite_principale || siege.activite_principale || '',
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
  const reps = data.dirigeants || data.representants || [];
  if (reps.length > 0) {
    const r = reps[0];
    const prenom = r.prenoms || r.prenom || '';
    const nom = r.nom || r.nom_complet || '';
    return `${prenom} ${nom}`.trim();
  }
  return '';
}
