-- Run once in Supabase SQL Editor after the journal attachment migration.
create table if not exists public.journal_reactions (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.journal_entries(id) on delete cascade,
  reacted_by text not null,
  reaction_type text not null default 'love',
  created_at timestamptz default now(),
  unique(entry_id, reacted_by, reaction_type)
);

create table if not exists public.journal_comments (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.journal_entries(id) on delete cascade,
  author_name text not null,
  content text not null check (char_length(content) <= 1500),
  created_at timestamptz default now()
);

alter table public.journal_reactions enable row level security;
alter table public.journal_comments enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='journal_reactions' and policyname='public read journal reactions') then
    create policy "public read journal reactions" on public.journal_reactions for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='journal_comments' and policyname='public read journal comments') then
    create policy "public read journal comments" on public.journal_comments for select using (true);
  end if;
end $$;
