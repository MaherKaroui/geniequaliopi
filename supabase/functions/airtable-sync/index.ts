const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const jsonResponse = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

import { createClient as __createAuthClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

async function __requireAuth(req: Request): Promise<Response | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const supabase = __createAuthClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data, error } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
  if (error || !data?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders }

  const __authErr = await __requireAuth(req);
  if (__authErr) return __authErr;
);
  }

  const airtableApiKey = Deno.env.get('AIRTABLE_API_KEY')?.trim();
  const baseId = Deno.env.get('AIRTABLE_BASE_ID')?.trim();

  if (!airtableApiKey) {
    return jsonResponse({ success: false, error: 'AIRTABLE_API_KEY not configured' });
  }
  if (!baseId) {
    return jsonResponse({ success: false, error: 'AIRTABLE_BASE_ID not configured' });
  }

  const baseUrl = `https://api.airtable.com/v0/${baseId}`;
  const headers = {
    Authorization: `Bearer ${airtableApiKey}`,
    'Content-Type': 'application/json',
  };

  try {
    const payload = await req.json().catch(() => ({}));
    const { organisme, formation, stagiaires } = payload as {
      organisme?: Record<string, any>;
      formation?: Record<string, any>;
      stagiaires?: Array<Record<string, any>>;
    };

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
        const res = await fetch(`${baseUrl}/Organisme`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ records: [{ fields: orgFields }] }),
        });
        const text = await res.text();
        if (!res.ok) throw new Error(`${res.status} ${text}`);
        results.organisme = { success: true, count: 1 };
      } catch (error: unknown) {
        hasFailures = true;
        results.organisme = { error: error instanceof Error ? error.message : 'Unknown error' };
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
        const res = await fetch(`${baseUrl}/Formation`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ records: [{ fields: formFields }] }),
        });
        const text = await res.text();
        if (!res.ok) throw new Error(`${res.status} ${text}`);
        results.formation = { success: true, count: 1 };
      } catch (error: unknown) {
        hasFailures = true;
        results.formation = { error: error instanceof Error ? error.message : 'Unknown error' };
      }
    }

    // Insert stagiaires
    if (stagiaires && stagiaires.length > 0) {
      const stagRecords = stagiaires.map((s) => ({
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
        },
      }));

      let totalCreated = 0;
      const batchErrors: string[] = [];

      for (let i = 0; i < stagRecords.length; i += 10) {
        const batch = stagRecords.slice(i, i + 10);
        try {
          const res = await fetch(`${baseUrl}/Stagiaires`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ records: batch }),
          });
          const text = await res.text();
          if (!res.ok) throw new Error(`${res.status} ${text}`);
          const data = JSON.parse(text);
          totalCreated += Array.isArray(data?.records) ? data.records.length : batch.length;
        } catch (error: unknown) {
          hasFailures = true;
          batchErrors.push(error instanceof Error ? error.message : 'Unknown error');
        }
      }

      results.stagiaires = batchErrors.length > 0
        ? { error: batchErrors, created: totalCreated }
        : { success: true, count: totalCreated };
    }

    return jsonResponse({
      success: !hasFailures,
      error: hasFailures ? 'Airtable sync failed.' : null,
      results,
    });
  } catch (error: unknown) {
    return jsonResponse({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
