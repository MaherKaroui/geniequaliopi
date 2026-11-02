-- Automatisation EDOF : historique des générations (une ligne par export traité) + ZIP en stockage privé.
create table if not exists public.saved_edof_automatisations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  name text not null,
  export_name text not null default '',
  siret text not null default '',
  centre jsonb not null default '{}'::jsonb,
  jurys jsonb not null default '{}'::jsonb,
  -- formations, sessions et candidats (sans les PDF)
  resume jsonb not null default '{}'::jsonb,
  -- chemins des fichiers dans le ZIP
  fichiers jsonb not null default '[]'::jsonb,
  zip_path text,
  -- envois de mails : [{ dossier, email, statut, date, erreur }]
  envois jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.saved_edof_automatisations enable row level security;

create policy "Users can view own edof automatisations" on public.saved_edof_automatisations
  for select using (auth.uid() = user_id);
create policy "Users can insert own edof automatisations" on public.saved_edof_automatisations
  for insert with check (auth.uid() = user_id);
create policy "Users can update own edof automatisations" on public.saved_edof_automatisations
  for update using (auth.uid() = user_id);
create policy "Users can delete own edof automatisations" on public.saved_edof_automatisations
  for delete using (auth.uid() = user_id);

insert into storage.buckets (id, name, public) values ('edof-automatisations', 'edof-automatisations', false)
  on conflict (id) do nothing;

create policy "edof-automatisations owner read" on storage.objects
  for select using (bucket_id = 'edof-automatisations' and auth.uid() = owner);
create policy "edof-automatisations owner insert" on storage.objects
  for insert with check (bucket_id = 'edof-automatisations' and auth.uid() = owner);
create policy "edof-automatisations owner delete" on storage.objects
  for delete using (bucket_id = 'edof-automatisations' and auth.uid() = owner);
