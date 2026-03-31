CREATE TABLE public.saved_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  config JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own themes" ON public.saved_themes
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own themes" ON public.saved_themes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own themes" ON public.saved_themes
  FOR DELETE TO authenticated USING (auth.uid() = user_id);