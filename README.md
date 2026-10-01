# Pinturas Decorarte — sitio web

Next.js 14 + Supabase. Catálogo público con fichas técnicas en PDF y panel `/admin` para agregar pinturas.

## Puesta en marcha
1. `cp .env.example .env.local` y completa los valores.
2. En Supabase: crea un proyecto, ejecuta `supabase/schema.sql` en el SQL Editor, desactiva "Allow new users to sign up" (Auth → Providers → Email) y crea tu usuario administrador en Auth → Users.
3. `npm install && npm run dev` → http://localhost:3000 (panel en `/admin`).
4. Despliegue: importa el repo en Vercel y copia las variables de `.env.local`.

## Notas
- Sin datos en Supabase, el sitio muestra las 6 líneas como ejemplo.
- Reemplaza `public/logo.jpg` por el logo original (idealmente PNG/SVG con fondo transparente).
- El 3D es CSS ligero (sin WebGL) y respeta `prefers-reduced-motion`.
