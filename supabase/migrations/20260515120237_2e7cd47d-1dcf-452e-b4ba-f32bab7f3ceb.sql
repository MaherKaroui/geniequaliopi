DROP POLICY IF EXISTS "vi-pack public insert" ON storage.objects;
DROP POLICY IF EXISTS "vi-pack public update" ON storage.objects;
CREATE POLICY "vi_pack_all_insert" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'vi-pack');
CREATE POLICY "vi_pack_all_update" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'vi-pack') WITH CHECK (bucket_id = 'vi-pack');
CREATE POLICY "vi_pack_all_select" ON storage.objects FOR SELECT TO public USING (bucket_id = 'vi-pack');