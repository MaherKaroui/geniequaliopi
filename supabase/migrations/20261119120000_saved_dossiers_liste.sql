-- Liste légère de l'historique des dossiers : sans les images (logo, tampon, signatures) ni le contenu complet.
-- Sans elle, l'historique téléchargeait tous les dossiers en entier (≈ 80 Mo pour 339 dossiers) avant de s'afficher.
-- SECURITY INVOKER : les politiques RLS de saved_dossiers s'appliquent (chacun ne voit que ses dossiers).
CREATE OR REPLACE FUNCTION public.saved_dossiers_liste(p_user uuid)
RETURNS TABLE (
  id uuid,
  name text,
  created_at timestamptz,
  updated_at timestamptz,
  archived boolean,
  org_nom text,
  intitule text,
  type_action text,
  nb_stagiaires integer,
  noms_stagiaires text
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT
    d.id,
    d.name,
    d.created_at,
    d.updated_at,
    coalesce(d.archived, false),
    d.organisme->>'nom',
    d.formation->>'intitule',
    d.organisme->'typesActions'->>0,
    CASE WHEN jsonb_typeof(d.stagiaires) = 'array' THEN jsonb_array_length(d.stagiaires) ELSE 0 END,
    (
      SELECT string_agg(concat_ws(' ', s->>'prenom', s->>'nom'), ' ')
      FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.stagiaires) = 'array' THEN d.stagiaires ELSE '[]'::jsonb END) s
    )
  FROM public.saved_dossiers d
  WHERE d.user_id = p_user
  ORDER BY d.updated_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.saved_dossiers_liste(uuid) TO authenticated;
