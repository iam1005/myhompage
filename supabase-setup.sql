-- Supabase Dashboard > SQL Editor에서 한 번 실행하세요.
-- 관리자 이메일: digital@ktc.ac.kr

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  course text not null check (course in ('ai', 'visualization', 'accounting', 'excel')),
  title text not null check (char_length(title) between 1 and 200),
  body text,
  is_published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.notices enable row level security;

drop policy if exists "Anyone can read published notices" on public.notices;
create policy "Anyone can read published notices"
on public.notices for select
using (is_published = true or (auth.jwt() ->> 'email') = 'digital@ktc.ac.kr');

drop policy if exists "Administrator manages notices" on public.notices;
create policy "Administrator manages notices"
on public.notices for all to authenticated
using ((auth.jwt() ->> 'email') = 'digital@ktc.ac.kr')
with check ((auth.jwt() ->> 'email') = 'digital@ktc.ac.kr');
