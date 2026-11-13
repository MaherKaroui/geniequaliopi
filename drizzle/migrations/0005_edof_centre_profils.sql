CREATE TABLE public.edof_centre_profils (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  cle text NOT NULL,
  centre jsonb NOT NULL DEFAULT '{}'::jsonb,
  jury jsonb NOT NULL DEFAULT '[]'::jsonb,
  formateur text NOT NULL DEFAULT '',
  signatures jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, cle)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.edof_centre_profils TO authenticated;
GRANT ALL ON public.edof_centre_profils TO service_role;

ALTER TABLE public.edof_centre_profils ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own edof centre profils" ON public.edof_centre_profils
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own edof centre profils" ON public.edof_centre_profils
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own edof centre profils" ON public.edof_centre_profils
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own edof centre profils" ON public.edof_centre_profils
  FOR DELETE TO authenticated USING (auth.uid() = user_id);