CREATE POLICY "vi_tmp_w" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id='vi-pack');
CREATE POLICY "vi_tmp_u" ON storage.objects FOR UPDATE TO public USING (bucket_id='vi-pack');