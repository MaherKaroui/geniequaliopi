const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const META_URL = 'https://api.airtable.com/v0/meta';

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

async function getWorkspaceId(headers: Record<string, string>): Promise<string | null> {
  try {
    const data = await airtableRequest(
      `${META_URL}/workspaces`,
      { headers },
      'Failed to list workspaces',
    ) as { workspaces?: Array<{ id: string; name: string }> } | null;

    if (Array.isArray(data?.workspaces) && data.workspaces.length > 0) {
      return data.workspaces[0].id;
    }
    return null;
  } catch {
    return null;
  }
}

async function createBase(
  name: string,
  workspaceId: string,
  headers: Record<string, string>,
): Promise<{ id: string; tables: Array<{ id: string; name: string }> }> {
  const data = await airtableRequest(
    `${META_URL}/bases`,
    {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        workspaceId,
        tables: [
          { name: 'Organisme', fields: ORGANISME_FIELDS },
          { name: 'Formation', fields: FORMATION_FIELDS },
          { name: 'Stagiaires', fields: STAGIAIRES_FIELDS },
        ],
      }),
    },
    'Failed to create base',
  );

  return data as { id: string; tables: Array<{ id: string; name: string }> };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const airtableApiKey = Deno.env.get('AIRTABLE_API_KEY')?.trim();

  if (!airtableApiKey) {
    return jsonResponse({ success: false, error: 'AIRTABLE_API_KEY not configured' });
  }

  const authHeaders = { Authorization: `Bearer ${airtableApiKey}` };

  try {
    const payload = await req.json().catch(() => ({}));
    const { organisme, formation, stagiaires } = payload as {
      organisme?: Record<string, any>;
      formation?: Record<string, any>;
      stagiaires?: Array<Record<string, any>>;
    };

    // Determine base name from organisme
    const baseName = organisme?.nom?.trim() || `Dossier ${new Date().toISOString().slice(0, 10)}`;

    // Get workspace ID
    const workspaceId = Deno.env.get('AIRTABLE_WORKSPACE_ID')?.trim()
      || Deno.env.get('AIRTABLE_BASE_ID')?.trim()
      || null;

    let resolvedWorkspaceId = workspaceId;

    // If no workspace ID in env, try to fetch from API
    if (!resolvedWorkspaceId || !resolvedWorkspaceId.startsWith('wsp')) {
      const fetched = await getWorkspaceId(authHeaders);
      if (!fetched) {
        return jsonResponse({
          success: false,
          error: 'Impossible de trouver le workspace Airtable. Vérifiez que votre token a les permissions "schema:bases:write" et accès aux workspaces.',
        });
      }
      resolvedWorkspaceId = fetched;
    }

    // Create a new base
    const newBase = await createBase(baseName, resolvedWorkspaceId, authHeaders);
    const newBaseId = newBase.id;
    const baseUrl = `https://api.airtable.com/v0/${newBaseId}`;
    const postHeaders = { ...authHeaders, 'Content-Type': 'application/json' };

    const results: Record<string, unknown> = {};
    let hasFailures = false;

    // Insert organisme
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

    // Insert formation
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

    // Insert stagiaires
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
      baseName,
      baseId: newBaseId,
      results,
    });
  } catch (error: unknown) {
    return jsonResponse({
      success: false,
      error: getErrorDetails(error),
    });
  }
});
