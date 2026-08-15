-- Run once in Supabase SQL Editor. Adds shared folder files and saved check-ins only.
create table if not exists public.folder_files (
  id uuid primary key default gen_random_uuid(),
  folder_type text not null check (folder_type in ('topic','member')),
  folder_key text not null,
  title text not null,
  file_kind text not null check (file_kind in ('image','pdf','video','file')),
  storage_bucket text not null,
  storage_path text not null,
  created_at timestamptz default now()
);
create index if not exists folder_files_scope_idx on public.folder_files(folder_type,folder_key,created_at desc);
alter table public.folder_files drop constraint if exists folder_files_folder_type_check;
alter table public.folder_files add constraint folder_files_folder_type_check check (folder_type in ('topic','member','media'));

create table if not exists public.group_checkins (
  id uuid primary key default gen_random_uuid(),
  member_name text not null,
  week_label text,
  mood text not null,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table public.folder_files enable row level security;
alter table public.group_checkins enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='folder_files' and policyname='public read folder files') then create policy "public read folder files" on public.folder_files for select using (true); end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='group_checkins' and policyname='public read group checkins') then create policy "public read group checkins" on public.group_checkins for select using (true); end if;
end $$;
