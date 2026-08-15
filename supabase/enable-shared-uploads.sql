-- Run this once in Supabase SQL Editor to enable the new shared-upload records.
-- It only ADDS tables; it does not modify or delete existing portfolio data.
create table if not exists public.teacher_comments (
  id uuid primary key default gen_random_uuid(),
  teacher_name text not null,
  comments text not null,
  recommendations text,
  created_at timestamptz default now()
);

create table if not exists public.shared_assets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  asset_type text not null,
  storage_path text not null,
  created_at timestamptz default now()
);

alter table public.teacher_comments enable row level security;
alter table public.shared_assets enable row level security;

create policy "public read teacher comments" on public.teacher_comments for select using (true);
create policy "staff manage teacher comments" on public.teacher_comments for all using (public.is_admin_or_teacher()) with check (public.is_admin_or_teacher());
create policy "public read shared assets" on public.shared_assets for select using (true);
create policy "staff manage shared assets" on public.shared_assets for all using (public.is_admin_or_teacher()) with check (public.is_admin_or_teacher());
