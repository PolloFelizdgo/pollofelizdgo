-- Migration: add ticket_number and contact_type to contacts
ALTER TABLE IF EXISTS public.contacts
ADD COLUMN IF NOT EXISTS ticket_number text;

ALTER TABLE IF EXISTS public.contacts
ADD COLUMN IF NOT EXISTS contact_type text;

-- End of migration
