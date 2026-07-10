
DROP POLICY IF EXISTS "vi-pack public read" ON storage.objects;
DROP POLICY IF EXISTS "vi_pack_all_select" ON storage.objects;
DROP POLICY IF EXISTS "vi-pack authenticated read" ON storage.objects;

CREATE POLICY "vi-pack authenticated read"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'vi-pack');
