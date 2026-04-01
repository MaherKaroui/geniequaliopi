const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const META_URL = 'https://api.airtable.com/v0/meta/bases';

interface AirtableField {
  name: string;
  type: string;
}

async function getExistingTables(baseId: string, headers: Record<string, string>): Promise<string[]> {
  const res = await fetch(`${META_URL}/${baseId}/tables`, { headers });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to list tables: ${res.status} ${err}`);
  }
  const data = await res.json();
  return (data.tables || []).map((t: any) => t.name);
}

async function createTable(baseId: string, name: string, fields: AirtableField[], headers: Record<string, string>) {
  const res = await fetch(`${META_URL}/${baseId}/tables`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      fields: fields.map(f => ({ name: f.name, type: f.type })),
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create table "${name}": ${res.status} ${err}`);
  }
  return await res.json();
}

const ORGANISME_FIELDS: AirtableField[] = [
  { name: 'Nom', type: 'singleLineText' },
  { name: 'SIRET', type: 'singleLineText' },
  { name: 'Adresse', type: 'singleLineText' },
  { name: 'Code Postal', type: 'singleLineText' },
  { name: 'Ville', type: 'singleLineText' },
  { name: 'Telephone', type: 'singleLineText' },
  { name: 'Email', type: 'email' },
  { name: 'Site Web', type: 'url' },
  { name: 'NDA', type: 'singleLineText' },
  { name: 'Dirigeant', type: 'singleLineText' },
  { name: 'Responsable Pedagogique', type: 'singleLineText' },
  { name: 'Referent Handicap', type: 'singleLineText' },
  { name: 'Referent Qualite', type: 'singleLineText' },
  { name: 'Domaines Formation', type: 'multilineText' },
  { name: 'Types Actions', type: 'singleLineText' },
  { name: 'Certifications', type: 'multilineText' },
  { name: 'Outils Utilises', type: 'multilineText' },
  { name: 'Version', type: 'singleLineText' },
  { name: 'Date MAJ', type: 'singleLineText' },
];

const FORMATION_FIELDS: AirtableField[] = [
  { name: 'Intitule', type: 'singleLineText' },
  { name: 'Objectifs', type: 'multilineText' },
  { name: 'Prerequis', type: 'multilineText' },
  { name: 'Duree', type: 'singleLineText' },
  { name: 'Modalites', type: 'singleLineText' },
  { name: 'Tarif', type: 'singleLineText' },
  { name: 'Programme', type: 'multilineText' },
  { name: 'Methodes Evaluation', type: 'multilineText' },
  { name: 'Moyens Pedagogiques', type: 'multilineText' },
  { name: 'Public Vise', type: 'multilineText' },
  { name: 'Delai Acces', type: 'singleLineText' },
  { name: 'Date Debut', type: 'singleLineText' },
  { name: 'Date Fin', type: 'singleLineText' },
  { name: 'Lieu', type: 'singleLineText' },
  { name: 'Nombre Participants', type: 'singleLineText' },
  { name: 'Formateur', type: 'singleLineText' },
  { name: 'Code RNCP', type: 'singleLineText' },
  { name: 'Rythme Alternance', type: 'singleLineText' },
];

const STAGIAIRES_FIELDS: AirtableField[] = [
  { name: 'Civilite', type: 'singleLineText' },
  { name: 'Nom', type: 'singleLineText' },
  { name: 'Prenom', type: 'singleLineText' },
  { name: 'Email', type: 'email' },
  { name: 'Telephone', type: 'singleLineText' },
  { name: 'Entreprise', type: 'singleLineText' },
  { name: 'Poste', type: 'singleLineText' },
  { name: 'Date Naissance', type: 'singleLineText' },
  { name: 'Date Debut Formation', type: 'singleLineText' },
  { name: 'Date Fin Formation', type: 'singleLineText' },
  { name: 'Tarif Formation', type: 'singleLineText' },
  { name: 'Adresse', type: 'singleLineText' },
  { name: 'Code Postal', type: 'singleLineText' },
  { name: 'Commune', type: 'singleLineText' },
  { name: 'Nationalite', type: 'singleLineText' },
  { name: 'NIR', type: 'singleLineText' },
  { name: 'Departement Naissance', type: 'singleLineText' },
  { name: 'Commune Naissance', type: 'singleLineText' },
  { name: 'Diplome', type: 'singleLineText' },
  { name: 'RQTH', type: 'singleLineText' },
  { name: 'Formateur', type: 'singleLineText' },
];

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
  const authHeaders = { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` };

  try {
    const { organisme, formation, stagiaires } = await req.json();

    // Step 1: Check existing tables and create missing ones
    const existingTables = await getExistingTables(AIRTABLE_BASE_ID, authHeaders);
    console.log('Existing tables:', existingTables);

    const tablesToCreate: [string, AirtableField[]][] = [];
    if (!existingTables.includes('Organisme')) tablesToCreate.push(['Organisme', ORGANISME_FIELDS]);
    if (!existingTables.includes('Formation')) tablesToCreate.push(['Formation', FORMATION_FIELDS]);
    if (!existingTables.includes('Stagiaires')) tablesToCreate.push(['Stagiaires', STAGIAIRES_FIELDS]);

    for (const [name, fields] of tablesToCreate) {
      console.log(`Creating table: ${name}`);
      await createTable(AIRTABLE_BASE_ID, name, fields, authHeaders);
    }

    const results: Record<string, any> = {};
    if (tablesToCreate.length > 0) {
      results.tablesCreated = tablesToCreate.map(([n]) => n);
    }

    // Step 2: Insert data
    const postHeaders = { ...authHeaders, 'Content-Type': 'application/json' };

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
        headers: postHeaders,
        body: JSON.stringify({ records: [{ fields: orgFields }] }),
      });
      const orgData = await orgRes.json();
      results.organisme = orgRes.ok ? { success: true, count: 1 } : { error: orgData };
    }

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
        headers: postHeaders,
        body: JSON.stringify({ records: [{ fields: formFields }] }),
      });
      const formData = await formRes.json();
      results.formation = formRes.ok ? { success: true, count: 1 } : { error: formData };
    }

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

      let totalCreated = 0;
      const errors: any[] = [];
      for (let i = 0; i < stagRecords.length; i += 10) {
        const batch = stagRecords.slice(i, i + 10);
        const stagRes = await fetch(`${BASE_URL}/Stagiaires`, {
          method: 'POST',
          headers: postHeaders,
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
