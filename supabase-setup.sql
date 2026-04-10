-- ─────────────────────────────────────────────────────────────────────────────
-- Gato Seco · Supabase Setup
-- Pega este archivo completo en: supabase.com → SQL Editor → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Tabla de productos
create table if not exists public.productos (
  id           bigint generated always as identity primary key,
  marca        text           not null,
  nombre       text           not null,
  precio       numeric(10,2)  not null,
  talla        text           not null,
  condicion    text           not null,
  disponible   boolean        not null default true,
  tag          text           not null default 'Disponible',
  foto_url     text,
  whatsapp_msg text,
  created_at   timestamptz    default now(),
  orden        int            default 0
);

-- 2. Row Level Security — lectura pública, escritura desde Next.js (anon key)
alter table public.productos enable row level security;

create policy "public_read"
  on public.productos
  for select
  to anon
  using (true);

create policy "public_write"
  on public.productos
  for all
  to anon
  using (true)
  with check (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- STORAGE: crear el bucket "fotos" manualmente en la UI de Supabase:
--   Storage → New bucket → Name: fotos → Public: ✓
--
-- Luego ejecuta esta política para permitir subida de imágenes:
-- ─────────────────────────────────────────────────────────────────────────────

create policy "public_upload"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'fotos');

create policy "public_read_fotos"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'fotos');
