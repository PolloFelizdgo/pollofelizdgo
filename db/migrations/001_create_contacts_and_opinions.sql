-- 001_create_contacts_and_opinions.sql
-- Migration: create contacts and opinions tables for the contact form and user feedback

-- Enable pgcrypto for gen_random_uuid() (Supabase supports this)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table: contacts
CREATE TABLE IF NOT EXISTS public.contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Basic index for email lookups
CREATE INDEX IF NOT EXISTS contacts_email_idx ON public.contacts (email);

-- Table: opinions (feedback)
CREATE TABLE IF NOT EXISTS public.opinions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  source text, -- optional: where the feedback came from (menu, sitio, app)
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS opinions_rating_idx ON public.opinions (rating);

-- Optional: grant minimal privileges to anon/public role depending on use-case
-- NOTE: On Supabase you may prefer to use RLS (row level security) and policies instead
-- GRANT SELECT, INSERT ON public.contacts TO authenticated;
-- GRANT SELECT, INSERT ON public.opinions TO authenticated;

-- End of migration
