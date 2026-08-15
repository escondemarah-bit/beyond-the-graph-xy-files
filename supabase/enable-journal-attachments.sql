-- Run once in Supabase SQL Editor. This only adds tables for real shared journal posts.
create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  caption text not null check (char_length(caption) <= 3000),
  topic_slug text,
  created_at timestamptz default now()
);

create table if not exists public.journal_media (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.journal_entries(id) on delete cascade,
  media_kind text not null check (media_kind in ('image','video','audio','music_link')),
  storage_path text,
  external_url text,
  filename text,
  created_at timestamptz default now(),
  check (storage_path is not null or external_url is not null)
);

create index if not exists journal_media_entry_idx on public.journal_media(entry_id, created_at);
alter table public.journal_entries enable row level security;
alter table public.journal_media enable row level security;
create policy "public read journal entries" on public.journal_entries for select using (true);
create policy "staff manage journal entries" on public.journal_entries for all using (public.is_admin_or_teacher()) with check (public.is_admin_or_teacher());
create policy "public read journal media" on public.journal_media for select using (true);
create policy "staff manage journal media" on public.journal_media for all using (public.is_admin_or_teacher()) with check (public.is_admin_or_teacher());
