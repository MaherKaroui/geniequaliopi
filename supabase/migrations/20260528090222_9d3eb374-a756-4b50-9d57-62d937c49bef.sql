
-- 1. Add missing UPDATE policy on saved_themes
CREATE POLICY "Users can update their own themes"
ON public.saved_themes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 2. Revoke EXECUTE on SECURITY DEFINER trigger functions from API roles
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- 3. Add RLS policies on storage.objects for vi-pack bucket
-- Keep public read (bucket remains public for downloads), but restrict writes to owner only
CREATE POLICY "vi-pack public read"
ON storage.objects
FOR SELECT
USING (bucket_id = 'vi-pack');

CREATE POLICY "vi-pack owner insert"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'vi-pack' AND auth.uid() = owner);

CREATE POLICY "vi-pack owner update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'vi-pack' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'vi-pack' AND auth.uid() = owner);

CREATE POLICY "vi-pack owner delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'vi-pack' AND auth.uid() = owner);
