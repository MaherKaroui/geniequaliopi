
CREATE TABLE public.saved_ey_controls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Sans titre',
  organisme JSONB NOT NULL,
  formation JSONB NOT NULL,
  stagiaires JSONB NOT NULL DEFAULT '[]'::jsonb,
  doc_states JSONB NOT NULL DEFAULT '{}'::jsonb,
  doc_style JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_ey_controls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ey controls"
  ON public.saved_ey_controls FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ey controls"
  ON public.saved_ey_controls FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ey controls"
  ON public.saved_ey_controls FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ey controls"
  ON public.saved_ey_controls FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
