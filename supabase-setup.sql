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

-- QR 출석 시스템 테이블. 이 테이블들은 Vercel 서버 함수만 접근합니다.
create table if not exists public.course_roster (
  course text not null check (course in ('ai', 'visualization', 'accounting', 'excel')),
  student_id text not null check (student_id ~ '^[0-9]{9}$'),
  name text not null,
  phone text not null check (phone ~ '^01[0-9]{8,9}$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (course, student_id)
);

create table if not exists public.attendance_sessions (
  id uuid primary key default gen_random_uuid(),
  course text not null check (course in ('ai', 'visualization', 'accounting', 'excel')),
  week smallint not null check (week between 1 and 15),
  period smallint not null check (period between 1 and 3),
  mode text not null check (mode in ('pc', 'wireless')),
  token uuid not null unique,
  access_code text not null check (access_code ~ '^[0-9]{6}$'),
  active boolean not null default true,
  starts_at timestamptz not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.attendance_sessions(id) on delete cascade,
  course text not null check (course in ('ai', 'visualization', 'accounting', 'excel')),
  student_id text not null check (student_id ~ '^[0-9]{9}$'),
  name text not null,
  phone text not null,
  client_ip inet,
  checked_at timestamptz not null default now(),
  unique (session_id, student_id)
);

create index if not exists attendance_sessions_course_time_idx on public.attendance_sessions (course, starts_at);
create index if not exists attendance_records_course_student_idx on public.attendance_records (course, student_id);
alter table public.course_roster enable row level security;
alter table public.attendance_sessions enable row level security;
alter table public.attendance_records enable row level security;
