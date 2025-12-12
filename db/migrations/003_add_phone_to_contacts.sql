-- Migration: add phone column to contacts
-- Path: db/migrations/003_add_phone_to_contacts.sql

ALTER TABLE IF EXISTS public.contacts
ADD COLUMN IF NOT EXISTS phone text;

-- End of migration
