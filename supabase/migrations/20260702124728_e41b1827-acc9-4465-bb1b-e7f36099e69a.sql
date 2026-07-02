CREATE TABLE public.saved_vae_dossiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  organisme JSONB NOT NULL DEFAULT '{}'::jsonb,
  certification JSONB NOT NULL DEFAULT '{}'::jsonb,
  candidat JSONB NOT NULL DEFAULT '{}'::jsonb,
  session JSONB NOT NULL DEFAULT '{}'::jsonb,
  contents JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_vae_dossiers TO authenticated;
GRANT ALL ON public.saved_vae_dossiers TO service_role;
ALTER TABLE public.saved_vae_dossiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users select own vae dossiers" ON public.saved_vae_dossiers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own vae dossiers" ON public.saved_vae_dossiers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own vae dossiers" ON public.saved_vae_dossiers FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own vae dossiers" ON public.saved_vae_dossiers FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_saved_vae_dossiers_updated_at BEFORE UPDATE ON public.saved_vae_dossiers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_saved_vae_dossiers_user ON public.saved_vae_dossiers(user_id, updated_at DESC);