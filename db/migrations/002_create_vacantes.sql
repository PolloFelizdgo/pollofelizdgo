-- Migration: Create vacantes table
-- Path: db/migrations/002_create_vacantes.sql

CREATE TABLE IF NOT EXISTS vacantes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT,
  description TEXT,
  contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
