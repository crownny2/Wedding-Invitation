-- RSVP table for the wedding invitation site.
-- Run this in the Supabase SQL editor (or via `supabase db push`) once you've
-- created a project and added its URL/anon key to .env.local.

-- name/guest_count are nullable: the "no" flow intentionally collects no
-- guest information (per the RSVP spec), so decline rows store neither.
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text,
  guest_count integer,
  message text,
  attending boolean not null,
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

-- Guests submit the RSVP form without signing in. Uses "public" (not just
-- "anon") so it also works if the site is opened in a browser tab that
-- happens to have an active admin session (e.g. the admin testing the form).
create policy "Anyone can submit an RSVP"
  on public.rsvps
  for insert
  to public
  with check (true);

-- Only signed-in admins can read responses (the /admin/rsvp dashboard).
create policy "Authenticated users can read RSVPs"
  on public.rsvps
  for select
  to authenticated
  using (true);
