-- Contact form submissions
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service text,
  message text not null,
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Allow anonymous inserts (public contact form)
create policy "Anyone can submit contact form"
  on public.contact_submissions
  for insert
  to anon
  with check (consent = true);

-- Newsletter subscribers
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- Allow anonymous inserts (public newsletter signup)
create policy "Anyone can subscribe to newsletter"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (true);
