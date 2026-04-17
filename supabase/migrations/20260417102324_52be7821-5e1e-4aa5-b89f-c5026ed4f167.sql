-- Ensure the timestamp helper function exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create saved_opco_dossiers table
CREATE TABLE public.saved_opco_dossiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL DEFAULT 'Sans titre',
  ref_dossier TEXT NOT NULL DEFAULT '',
  annee_controle TEXT NOT NULL DEFAULT '',
  organisme JSONB NOT NULL,
  formation JSONB NOT NULL,
  stagiaires JSONB NOT NULL DEFAULT '[]'::jsonb,
  doc_states JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_opco_dossiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own opco dossiers"
ON public.saved_opco_dossiers FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own opco dossiers"
ON public.saved_opco_dossiers FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own opco dossiers"
ON public.saved_opco_dossiers FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own opco dossiers"
ON public.saved_opco_dossiers FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE TRIGGER update_saved_opco_dossiers_updated_at
BEFORE UPDATE ON public.saved_opco_dossiers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();