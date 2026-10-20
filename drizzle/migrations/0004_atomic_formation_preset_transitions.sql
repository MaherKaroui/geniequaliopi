CREATE FUNCTION public.transition_formation_preset(p_id uuid,p_user uuid,p_action text,p_index integer DEFAULT NULL) RETURNS public.formation_presets LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE r public.formation_presets; prog jsonb; content jsonb; ch jsonb; total bigint:=0; i integer; step text;
BEGIN
 SELECT * INTO r FROM public.formation_presets WHERE id=p_id AND created_by=p_user FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Formation introuvable'; END IF;
 IF EXISTS (SELECT 1 FROM jsonb_each(coalesce(r.progression->'leases','{}'::jsonb)) WHERE (value->>'expires')::timestamptz>now()) THEN RAISE EXCEPTION 'Une génération est encore en cours'; END IF;
 prog=r.progression;content=r.data;
 IF p_action='resume' THEN
  IF coalesce((prog->'error'->>'terminal')::boolean,false) THEN RAISE EXCEPTION '%',prog->'error'->>'message'; END IF;
  prog=prog||jsonb_build_object('paused',false,'error',NULL,'leases','{}'::jsonb); r.statut='generation';
 ELSIF p_action='regenerate' THEN
  IF coalesce((prog->>'paused')::boolean,false) THEN RAISE EXCEPTION 'Génération suspendue'; END IF;
  IF p_index IS NULL OR p_index<0 OR p_index>=jsonb_array_length(content->'plan'->'chapters') THEN RAISE EXCEPTION 'Chapitre introuvable'; END IF;
  step='chapter_'||p_index;content=content-step;
  prog=prog||jsonb_build_object('completed',(SELECT coalesce(jsonb_agg(value),'[]'::jsonb) FROM jsonb_array_elements(prog->'completed') WHERE value<>to_jsonb(step)),'leases','{}'::jsonb);r.statut='generation';
 ELSIF p_action IN ('validate','finalize') THEN
  IF coalesce((prog->>'paused')::boolean,false) OR content->'plan' IS NULL OR content->'evaluations' IS NULL OR content->'sources' IS NULL THEN RAISE EXCEPTION 'Terminez toutes les étapes avant la validation'; END IF;
  FOR i IN 0..jsonb_array_length(content->'plan'->'chapters')-1 LOOP
   ch=content->('chapter_'||i);IF ch IS NULL THEN RAISE EXCEPTION 'Chapitre manquant'; END IF;
   total=total+(SELECT coalesce(sum(length(value->>'contentHtml')),0) FROM jsonb_array_elements(ch->'sections'));
  END LOOP;
  IF total<500000 THEN RAISE EXCEPTION 'Le support doit contenir au moins 500 000 caractères'; END IF;
  prog=prog||jsonb_build_object('characters',total);r.statut=CASE WHEN p_action='validate' THEN 'valide' ELSE 'brouillon' END;
 ELSE RAISE EXCEPTION 'Action invalide'; END IF;
 UPDATE public.formation_presets SET data=content,progression=prog,statut=r.statut,updated_at=now() WHERE id=p_id RETURNING * INTO r;
 RETURN r;
END $$;
REVOKE ALL ON FUNCTION public.transition_formation_preset(uuid,uuid,text,integer) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.transition_formation_preset(uuid,uuid,text,integer) TO service_role;