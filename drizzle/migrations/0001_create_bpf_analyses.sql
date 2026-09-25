CREATE TABLE public.bpf_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organisme text NOT NULL DEFAULT '',
  exercice text NOT NULL DEFAULT '',
  donnees jsonb NOT NULL DEFAULT '{}'::jsonb,
  resultats jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bpf_analyses TO authenticated;
GRANT ALL ON public.bpf_analyses TO service_role;
ALTER TABLE public.bpf_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bpf select own" ON public.bpf_analyses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "bpf insert own" ON public.bpf_analyses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bpf update own" ON public.bpf_analyses FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "bpf delete own" ON public.bpf_analyses FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX bpf_analyses_user_idx ON public.bpf_analyses(user_id, created_at DESC);