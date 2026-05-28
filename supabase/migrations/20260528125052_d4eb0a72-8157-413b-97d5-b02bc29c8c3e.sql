DROP POLICY IF EXISTS "vi-pack public read" ON storage.objects;

CREATE POLICY "vi-pack owner read"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'vi-pack' AND auth.uid() = owner);