CREATE TABLE public.formation_presets (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), intitule text NOT NULL, intitule_normalise text NOT NULL, code_rncp text, duree_heures numeric NOT NULL DEFAULT 0, type_action text NOT NULL DEFAULT 'actions-formation' CHECK (type_action IN ('actions-formation','apprentissage','vae','bilans-competences')), data jsonb NOT NULL DEFAULT '{}'::jsonb, statut text NOT NULL DEFAULT 'generation' CHECK (statut IN ('generation','brouillon','valide')), progression jsonb NOT NULL DEFAULT '{"completed":[],"leases":{},"paused":false}'::jsonb, created_by uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.formation_presets TO authenticated;
GRANT SELECT ON public.formation_presets TO anon;
GRANT ALL ON public.formation_presets TO service_role;
ALTER TABLE public.formation_presets ENABLE ROW LEVEL SECURITY;
CREATE POLICY presets_read_authenticated ON public.formation_presets FOR SELECT TO authenticated USING (true);
CREATE POLICY presets_read_validated ON public.formation_presets FOR SELECT TO anon USING (statut = 'valide');
CREATE POLICY presets_insert_owner ON public.formation_presets FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid() AND statut = 'generation');
CREATE POLICY presets_update_owner ON public.formation_presets FOR UPDATE TO authenticated USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid() AND statut <> 'valide');
CREATE POLICY presets_delete_owner ON public.formation_presets FOR DELETE TO authenticated USING (created_by = auth.uid());
CREATE UNIQUE INDEX formation_presets_identity ON public.formation_presets (intitule_normalise, (coalesce(code_rncp,'')));
CREATE INDEX formation_presets_code ON public.formation_presets (code_rncp);
CREATE FUNCTION public.claim_formation_preset_step(p_id uuid, p_user uuid, p_step text, p_lease uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r public.formation_presets; active integer;
BEGIN
 SELECT * INTO r FROM public.formation_presets WHERE id=p_id AND created_by=p_user FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Formation introuvable'; END IF;
 IF coalesce((r.progression->>'paused')::boolean,false) OR r.statut <> 'generation' THEN RETURN jsonb_build_object('claimed',false,'reason','paused_or_complete'); END IF;
 IF coalesce(r.progression->'completed','[]'::jsonb) ? p_step THEN RETURN jsonb_build_object('claimed',false,'reason','completed'); END IF;
 SELECT count(*) INTO active FROM jsonb_each(coalesce(r.progression->'leases','{}'::jsonb)) WHERE (value->>'expires')::timestamptz > now();
 IF active >= 3 OR coalesce((r.progression->'leases'->p_step->>'expires')::timestamptz > now(),false) THEN RETURN jsonb_build_object('claimed',false,'reason','busy'); END IF;
 UPDATE public.formation_presets SET progression=jsonb_set(progression,'{leases}',coalesce(progression->'leases','{}'::jsonb)||jsonb_build_object(p_step,jsonb_build_object('id',p_lease,'expires',now()+interval '15 minutes'))), updated_at=now() WHERE id=p_id;
 RETURN jsonb_build_object('claimed',true);
END $$;
REVOKE ALL ON FUNCTION public.claim_formation_preset_step(uuid,uuid,text,uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_formation_preset_step(uuid,uuid,text,uuid) TO service_role;
CREATE FUNCTION public.finish_formation_preset_step(p_id uuid,p_user uuid,p_step text,p_lease uuid,p_result jsonb,p_error jsonb DEFAULT NULL) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE r public.formation_presets; prog jsonb;
BEGIN
 SELECT * INTO r FROM public.formation_presets WHERE id=p_id AND created_by=p_user FOR UPDATE;
 IF NOT FOUND OR r.progression->'leases'->p_step->>'id' IS DISTINCT FROM p_lease::text THEN RAISE EXCEPTION 'Réservation expirée'; END IF;
 prog=jsonb_set(r.progression,'{leases}',(r.progression->'leases')-p_step);
 IF p_error IS NOT NULL THEN
   prog=prog||jsonb_build_object('paused',true,'error',p_error);
 ELSE
   prog=prog||jsonb_build_object('completed',coalesce(prog->'completed','[]'::jsonb)||to_jsonb(p_step));
 END IF;
 UPDATE public.formation_presets SET data=CASE WHEN p_error IS NULL THEN data||jsonb_build_object(p_step,p_result) ELSE data END, progression=prog,updated_at=now() WHERE id=p_id;
END $$;
REVOKE ALL ON FUNCTION public.finish_formation_preset_step(uuid,uuid,text,uuid,jsonb,jsonb) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.finish_formation_preset_step(uuid,uuid,text,uuid,jsonb,jsonb) TO service_role;
CREATE FUNCTION public.guard_formation_preset_write() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
 IF current_user IN ('anon','authenticated') THEN
  IF NEW.statut='valide' THEN RAISE EXCEPTION 'Validation serveur requise'; END IF;
  IF TG_OP='UPDATE' AND NEW.created_by IS DISTINCT FROM OLD.created_by THEN RAISE EXCEPTION 'Propriétaire non modifiable'; END IF;
 END IF;
 NEW.updated_at=now(); RETURN NEW;
END $$;
CREATE TRIGGER formation_presets_write_guard BEFORE INSERT OR UPDATE ON public.formation_presets FOR EACH ROW EXECUTE FUNCTION public.guard_formation_preset_write();