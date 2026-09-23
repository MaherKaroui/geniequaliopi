CREATE TABLE public.rapide_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  organisme JSONB,
  formation JSONB,
  stagiaires JSONB,
  nb_documents INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rapide_generations TO authenticated;
GRANT ALL ON public.rapide_generations TO service_role;
ALTER TABLE public.rapide_generations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own rapide generations" ON public.rapide_generations FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);