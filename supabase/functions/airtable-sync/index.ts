const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const AIRTABLE_API_KEY = Deno.env.get('AIRTABLE_API_KEY');
  const AIRTABLE_BASE_ID = Deno.env.get('AIRTABLE_BASE_ID');

  if (!AIRTABLE_API_KEY) {
    return new Response(JSON.stringify({ error: 'AIRTABLE_API_KEY not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  if (!AIRTABLE_BASE_ID) {
    return new Response(JSON.stringify({ error: 'AIRTABLE_BASE_ID not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;
  const headers = {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  };

  try {
    const { organisme, formation, stagiaires } = await req.json();

    const results: Record<string, any> = {};

    // 1. Upsert Organisme (single record)
    if (organisme) {
      const orgFields: Record<string, string> = {
        'Nom': organisme.nom || '',
        'SIRET': organisme.siret || '',
        'Adresse': organisme.adresse || '',
        'Code Postal': organisme.codePostal || '',
        'Ville': organisme.ville || '',
        'Telephone': organisme.telephone || '',
        'Email': organisme.email || '',
        'Site Web': organisme.siteWeb || '',
        'NDA': organisme.nda || '',
        'Dirigeant': organisme.dirigeant || '',
        'Responsable Pedagogique': organisme.responsablePedagogique || '',
        'Referent Handicap': organisme.referentHandicap || '',
        'Referent Qualite': organisme.referentQualite || '',
        'Domaines Formation': organisme.domainesFormation || '',
        'Types Actions': (organisme.typesActions || []).join(', '),
        'Certifications': organisme.certifications || '',
        'Outils Utilises': organisme.outilsUtilises || '',
        'Version': organisme.version || '',
        'Date MAJ': organisme.dateMaj || '',
      };

      const orgRes = await fetch(`${BASE_URL}/Organisme`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ records: [{ fields: orgFields }] }),
      });
      const orgData = await orgRes.json();
      if (!orgRes.ok) {
        results.organisme = { error: orgData };
      } else {
        results.organisme = { success: true, count: 1 };
      }
    }

    // 2. Upsert Formation (single record)
    if (formation) {
      const formFields: Record<string, string> = {
        'Intitule': formation.intitule || '',
        'Objectifs': formation.objectifs || '',
        'Prerequis': formation.prerequis || '',
        'Duree': formation.duree || '',
        'Modalites': formation.modalites || '',
        'Tarif': formation.tarif || '',
        'Programme': formation.programme || '',
        'Methodes Evaluation': formation.methodesEvaluation || '',
        'Moyens Pedagogiques': formation.moyensPedagogiques || '',
        'Public Vise': formation.publicVise || '',
        'Delai Acces': formation.delaiAcces || '',
        'Date Debut': formation.dateDebut || '',
        'Date Fin': formation.dateFin || '',
        'Lieu': formation.lieu || '',
        'Nombre Participants': formation.nombreParticipants || '',
        'Formateur': formation.formateur || '',
        'Code RNCP': formation.codeRNCP || '',
        'Rythme Alternance': formation.rythmeAlternance || '',
      };

      const formRes = await fetch(`${BASE_URL}/Formation`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ records: [{ fields: formFields }] }),
      });
      const formData = await formRes.json();
      if (!formRes.ok) {
        results.formation = { error: formData };
      } else {
        results.formation = { success: true, count: 1 };
      }
    }

    // 3. Upsert Stagiaires (batch, max 10 per request)
    if (stagiaires && stagiaires.length > 0) {
      const stagRecords = stagiaires.map((s: any) => ({
        fields: {
          'Civilite': s.civilite || '',
          'Nom': s.nom || '',
          'Prenom': s.prenom || '',
          'Email': s.email || '',
          'Telephone': s.telephone || '',
          'Entreprise': s.entreprise || '',
          'Poste': s.poste || '',
          'Date Naissance': s.dateNaissance || '',
          'Date Debut Formation': s.dateDebutFormation || '',
          'Date Fin Formation': s.dateFinFormation || '',
          'Tarif Formation': s.tarifFormation || '',
          'Adresse': s.adresse || '',
          'Code Postal': s.codePostal || '',
          'Commune': s.commune || '',
          'Nationalite': s.nationalite || '',
          'NIR': s.nir || '',
          'Departement Naissance': s.departementNaissance || '',
          'Commune Naissance': s.communeNaissance || '',
          'Diplome': s.diplome || '',
          'RQTH': s.rqth || '',
          'Formateur': s.formateur || '',
        }
      }));

      // Airtable allows max 10 records per request
      let totalCreated = 0;
      const errors: any[] = [];
      for (let i = 0; i < stagRecords.length; i += 10) {
        const batch = stagRecords.slice(i, i + 10);
        const stagRes = await fetch(`${BASE_URL}/Stagiaires`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ records: batch }),
        });
        const stagData = await stagRes.json();
        if (!stagRes.ok) {
          errors.push(stagData);
        } else {
          totalCreated += (stagData.records || []).length;
        }
      }
      results.stagiaires = errors.length > 0
        ? { error: errors, created: totalCreated }
        : { success: true, count: totalCreated };
    }

    return new Response(JSON.stringify({ success: true, results }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Airtable sync error:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
