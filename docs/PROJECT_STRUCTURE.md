Project structure and purpose

Overview
- This project is a Next.js 16 (App Router) application that uses Supabase for persistence and nodemailer for optional email notifications.

Key folders and files
- src/app/
  - contact/page.tsx -> Contact page that renders the client `ContactForm` component.
  - componentes/ContactForm.tsx -> Client component; collects data and POSTs to /api/supabase/insertContact.
  - api/supabase/insertContact/route.ts -> Server route that inserts to Supabase `contacts` table and optionally sends email.
- db/migrations/ -> SQL migrations for `contacts`, `vacantes` and schema changes.
- scripts/ -> utility scripts used for local testing (test-supabase-connection.js, post-test-local2.js, etc.).
- `scripts/generate-sucursales-thumbnails.js` — generates AVIF/WebP thumbnails for sucursales from OpenStreetMap static maps (writes to `public/sucursales/thumb-<slug>.(avif|webp)`).

Assets
- `public/imagenes/` — site photos (used by About, gallery components). Replace files here with same names or update components that reference them.
- `public/sucursales/` — sucursal images and thumbnails. Thumbnails follow the naming `thumb-<slug>.avif` / `.webp` (the script above generates them). Place main photos in this folder as well (e.g. `fidel_velazquez.jpg`) and update `src/app/data/sucursales.ts` `image` field to point to them.

Notes about replacing media
- When replacing images, keep names consistent or update `src/app/data/sucursales.ts` (the canonical data source for sucursales) to point to new filenames.
- For videos, add files to `public/videos/` and update `src/app/about/page.tsx` `VideoPlayerLoader` `srcBase` prop (or replace the component with an iframe for YouTube embeds).

Environment variables (dev)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY (server-side).
- Optional: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, SUPPORT_EMAIL

Notes
- Keep a single source of truth for ContactForm implementation. `ContactForm2.tsx` was converted to a re-export to maintain backwards compatibility. If no external code references `ContactForm2`, it may be removed.
- Use the Supabase migrations folder to inspect / re-apply DB schema as needed.

How to test the contact flow locally
1. Start the dev server (npm run dev).
2. Ensure `.env.local` contains the service role key for server tests.
3. Visit /contact and submit the form.
4. Or run: node scripts/post-test-local2.js to make a POST from node and inspect server logs.
