CREATE TABLE public.saved_nda_dossiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  organisme JSONB NOT NULL,
  formation JSONB NOT NULL,
  stagiaires JSONB NOT NULL DEFAULT '[]'::jsonb,
  cv_formateur TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_nda_dossiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own NDA dossiers"
  ON public.saved_nda_dossiers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own NDA dossiers"
  ON public.saved_nda_dossiers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own NDA dossiers"
  ON public.saved_nda_dossiers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own NDA dossiers"
  ON public.saved_nda_dossiers FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);