
-- Fix VAE policies: restrict to authenticated role
DROP POLICY IF EXISTS "Users delete own vae dossiers" ON public.saved_vae_dossiers;
DROP POLICY IF EXISTS "Users insert own vae dossiers" ON public.saved_vae_dossiers;
DROP POLICY IF EXISTS "Users select own vae dossiers" ON public.saved_vae_dossiers;
DROP POLICY IF EXISTS "Users update own vae dossiers" ON public.saved_vae_dossiers;

CREATE POLICY "Users select own vae dossiers" ON public.saved_vae_dossiers
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own vae dossiers" ON public.saved_vae_dossiers
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own vae dossiers" ON public.saved_vae_dossiers
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own vae dossiers" ON public.saved_vae_dossiers
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Add SELECT policy so users can read their own activity logs
CREATE POLICY "Users read own logs" ON public.activity_logs
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Restrict EXECUTE on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
-- keep EXECUTE for authenticated so RLS policies calling has_role() still work
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
