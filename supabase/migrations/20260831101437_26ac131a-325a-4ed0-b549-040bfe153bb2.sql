CREATE TABLE public.profils_employeurs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nom text NOT NULL DEFAULT '',
  donnees jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profils_employeurs TO authenticated;
GRANT ALL ON public.profils_employeurs TO service_role;
ALTER TABLE public.profils_employeurs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own employer profiles" ON public.profils_employeurs FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_profils_employeurs_updated BEFORE UPDATE ON public.profils_employeurs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.modeles_formation (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nom text NOT NULL DEFAULT '',
  donnees jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.modeles_formation TO authenticated;
GRANT ALL ON public.modeles_formation TO service_role;
ALTER TABLE public.modeles_formation ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own formation templates" ON public.modeles_formation FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_modeles_formation_updated BEFORE UPDATE ON public.modeles_formation FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();