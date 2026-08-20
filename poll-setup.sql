create table if not exists public.live_polls (
  id uuid primary key default gen_random_uuid(),
  access_code text not null unique check (access_code ~ '^[0-9]{6}$'),
  question text not null check (char_length(question) between 1 and 300),
  poll_type text not null check (poll_type in ('choice','word')),
  options jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table if not exists public.live_poll_responses (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.live_polls(id) on delete cascade,
  response text not null check (char_length(response) between 1 and 80),
  participant_key text not null,
  created_at timestamptz not null default now(),
  unique (poll_id, participant_key)
);

alter table public.live_polls enable row level security;
alter table public.live_poll_responses enable row level security;
