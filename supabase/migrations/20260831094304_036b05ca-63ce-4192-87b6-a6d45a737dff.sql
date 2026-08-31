CREATE TABLE public.smic_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date_effet date NOT NULL UNIQUE,
  montant_mensuel_35h numeric(10,2) NOT NULL,
  source text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.smic_references TO authenticated;
GRANT ALL ON public.smic_references TO service_role;
ALTER TABLE public.smic_references ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated read smic references" ON public.smic_references
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage smic references" ON public.smic_references
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE TRIGGER update_smic_references_updated_at BEFORE UPDATE ON public.smic_references
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.baremes_apprentissage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tranche_age text NOT NULL,
  annee_contrat smallint NOT NULL,
  pourcentage numeric(5,2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tranche_age, annee_contrat)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.baremes_apprentissage TO authenticated;
GRANT ALL ON public.baremes_apprentissage TO service_role;
ALTER TABLE public.baremes_apprentissage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated read baremes" ON public.baremes_apprentissage
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage baremes" ON public.baremes_apprentissage
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

CREATE TRIGGER update_baremes_apprentissage_updated_at BEFORE UPDATE ON public.baremes_apprentissage
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.baremes_apprentissage (tranche_age, annee_contrat, pourcentage) VALUES
  ('-18', 1, 27), ('-18', 2, 39), ('-18', 3, 55),
  ('18-20', 1, 43), ('18-20', 2, 51), ('18-20', 3, 67),
  ('21-25', 1, 53), ('21-25', 2, 61), ('21-25', 3, 78),
  ('26+', 1, 100), ('26+', 2, 100), ('26+', 3, 100);