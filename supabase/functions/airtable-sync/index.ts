const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const META_URL = 'https://api.airtable.com/v0/meta/bases';

interface AirtableField {
  name: string;
  type: string;
}

class AirtableHttpError extends Error {
  status: number;
  body: string;

  constructor(message: string, status: number, body: string) {
    super(message);
    this.name = 'AirtableHttpError';
    this.status = status;
    this.body = body;
  }
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

const jsonResponse = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const safeJsonParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const extractBaseId = (rawValue: string) => {
  const trimmed = rawValue.trim();
  const match = trimmed.match(/app[a-zA-Z0-9]{10,}/);

  if (match) {
    return match[0];
  }

  throw new Error('AIRTABLE_BASE_ID must contain a valid Airtable base id like `app...` or a full Airtable base URL.');
};

const getErrorDetails = (error: unknown) => {
  if (error instanceof AirtableHttpError) {
    return safeJsonParse(error.body) ?? error.body ?? error.message;
  }

  return error instanceof Error ? error.message : 'Unknown error';
};

async function airtableRequest(url: string, options: RequestInit, errorLabel: string) {
  const response = await fetch(url, options);
  const text = await response.text();

  if (!response.ok) {
    throw new AirtableHttpError(
      `${errorLabel}: ${response.status} ${text || response.statusText}`,
      response.status,
      text || response.statusText,
    );
  }

  return text ? safeJsonParse(text) : null;
}

async function getAccessibleBaseIds(headers: Record<string, string>) {
  try {
    const data = await airtableRequest(META_URL, { headers }, 'Failed to list accessible bases') as { bases?: Array<{ id: string }> } | null;
    return Array.isArray(data?.bases) ? data.bases.map((base) => base.id) : [];
  } catch {
    return null;
  }
}

async function getExistingTables(baseId: string, headers: Record<string, string>) {
  const data = await airtableRequest(`${META_URL}/${baseId}/tables`, { headers }, 'Failed to list tables') as { tables?: Array<{ name: string }> } | null;
  return Array.isArray(data?.tables) ? data.tables.map((table) => table.name) : [];
}

async function createTable(baseId: string, name: string, fields: AirtableField[], headers: Record<string, string>) {
  return await airtableRequest(
    `${META_URL}/${baseId}/tables`,
    {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        fields: fields.map((field) => ({ name: field.name, type: field.type })),
      }),
    },
    `Failed to create table "${name}"`,
  );
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const airtableApiKey = Deno.env.get('AIRTABLE_API_KEY')?.trim();
  const rawAirtableBaseId = Deno.env.get('AIRTABLE_BASE_ID');

  if (!airtableApiKey) {
    return jsonResponse({ success: false, error: 'AIRTABLE_API_KEY not configured' });
  }

  if (!rawAirtableBaseId) {
    return jsonResponse({ success: false, error: 'AIRTABLE_BASE_ID not configured' });
  }

  let airtableBaseId = '';

  try {
    airtableBaseId = extractBaseId(rawAirtableBaseId);
  } catch (error: unknown) {
    return jsonResponse({ success: false, error: getErrorDetails(error) });
  }

  const authHeaders = { Authorization: `Bearer ${airtableApiKey}` };
  const baseUrl = `https://api.airtable.com/v0/${airtableBaseId}`;

  try {
    const payload = await req.json().catch(() => ({}));
    const { organisme, formation, stagiaires } = payload as {
      organisme?: Record<string, any>;
      formation?: Record<string, any>;
      stagiaires?: Array<Record<string, any>>;
    };

    const results: Record<string, unknown> = {};
    const warnings: string[] = [];
    let hasFailures = false;
    let existingTables: string[] | null = null;

    try {
      existingTables = await getExistingTables(airtableBaseId, authHeaders);
    } catch (error: unknown) {
      const accessibleBaseIds = await getAccessibleBaseIds(authHeaders);
      const baseAccessMessage = Array.isArray(accessibleBaseIds)
        ? accessibleBaseIds.includes(airtableBaseId)
          ? `Airtable metadata is unavailable for base ${airtableBaseId}.`
          : `The current Airtable token does not seem to have access to base ${airtableBaseId}.`
        : `Airtable metadata could not be verified for base ${airtableBaseId}.`;

      warnings.push(`${baseAccessMessage} The sync will continue without auto-creating missing tables.`);
      results.meta = { error: getErrorDetails(error) };
    }

    if (existingTables) {
      const tablesToCreate: Array<[string, AirtableField[]]> = [];
      const createdTables: string[] = [];

      if (!existingTables.includes('Organisme')) tablesToCreate.push(['Organisme', ORGANISME_FIELDS]);
      if (!existingTables.includes('Formation')) tablesToCreate.push(['Formation', FORMATION_FIELDS]);
      if (!existingTables.includes('Stagiaires')) tablesToCreate.push(['Stagiaires', STAGIAIRES_FIELDS]);

      for (const [name, fields] of tablesToCreate) {
        try {
          await createTable(airtableBaseId, name, fields, authHeaders);
          createdTables.push(name);
        } catch (error: unknown) {
          hasFailures = true;
          results[`create_${name}`] = { error: getErrorDetails(error) };
        }
      }

      if (createdTables.length > 0) {
        results.tablesCreated = createdTables;
      }
    }

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

      try {
        await airtableRequest(
          `${baseUrl}/Organisme`,
          {
            method: 'POST',
            headers: postHeaders,
            body: JSON.stringify({ records: [{ fields: orgFields }] }),
          },
          'Failed to insert Organisme record',
        );
        results.organisme = { success: true, count: 1 };
      } catch (error: unknown) {
        hasFailures = true;
        results.organisme = { error: getErrorDetails(error) };
      }
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

      try {
        await airtableRequest(
          `${baseUrl}/Formation`,
          {
            method: 'POST',
            headers: postHeaders,
            body: JSON.stringify({ records: [{ fields: formFields }] }),
          },
          'Failed to insert Formation record',
        );
        results.formation = { success: true, count: 1 };
      } catch (error: unknown) {
        hasFailures = true;
        results.formation = { error: getErrorDetails(error) };
      }
    }

    if (stagiaires && stagiaires.length > 0) {
      const stagRecords = stagiaires.map((stagiaire) => ({
        fields: {
          'Civilite': stagiaire.civilite || '',
          'Nom': stagiaire.nom || '',
          'Prenom': stagiaire.prenom || '',
          'Email': stagiaire.email || '',
          'Telephone': stagiaire.telephone || '',
          'Entreprise': stagiaire.entreprise || '',
          'Poste': stagiaire.poste || '',
          'Date Naissance': stagiaire.dateNaissance || '',
          'Date Debut Formation': stagiaire.dateDebutFormation || '',
          'Date Fin Formation': stagiaire.dateFinFormation || '',
          'Tarif Formation': stagiaire.tarifFormation || '',
          'Adresse': stagiaire.adresse || '',
          'Code Postal': stagiaire.codePostal || '',
          'Commune': stagiaire.commune || '',
          'Nationalite': stagiaire.nationalite || '',
          'NIR': stagiaire.nir || '',
          'Departement Naissance': stagiaire.departementNaissance || '',
          'Commune Naissance': stagiaire.communeNaissance || '',
          'Diplome': stagiaire.diplome || '',
          'RQTH': stagiaire.rqth || '',
          'Formateur': stagiaire.formateur || '',
        },
      }));

      let totalCreated = 0;
      const batchErrors: unknown[] = [];

      for (let index = 0; index < stagRecords.length; index += 10) {
        const batch = stagRecords.slice(index, index + 10);

        try {
          const data = await airtableRequest(
            `${baseUrl}/Stagiaires`,
            {
              method: 'POST',
              headers: postHeaders,
              body: JSON.stringify({ records: batch }),
            },
            'Failed to insert Stagiaires records',
          ) as { records?: unknown[] } | null;
          totalCreated += Array.isArray(data?.records) ? data.records.length : batch.length;
        } catch (error: unknown) {
          hasFailures = true;
          batchErrors.push(getErrorDetails(error));
        }
      }

      results.stagiaires = batchErrors.length > 0
        ? { error: batchErrors, created: totalCreated }
        : { success: true, count: totalCreated };
    }

    return jsonResponse({
      success: !hasFailures,
      error: hasFailures ? 'Airtable sync failed.' : null,
      warnings,
      baseId: airtableBaseId,
      results,
    });
  } catch (error: unknown) {
    return jsonResponse({
      success: false,
      error: getErrorDetails(error),
      baseId: airtableBaseId,
    });
  }
});
