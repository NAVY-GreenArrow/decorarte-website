create table if not exists paints (
  id uuid primary key default gen_random_uuid(),
  name text not null, line text not null, description text,
  features text[] default '{}', presentations text, sheet_url text,
  active boolean not null default true, created_at timestamptz default now());
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, phone text, message text not null, created_at timestamptz default now());
alter table paints enable row level security;
alter table messages enable row level security;
create policy "ver pinturas activas" on paints for select using (active or auth.role() = 'authenticated');
create policy "admin gestiona pinturas" on paints for all to authenticated using (true) with check (true);
create policy "cualquiera escribe mensaje" on messages for insert to anon, authenticated with check (true);
create policy "admin lee mensajes" on messages for select to authenticated using (true);
insert into storage.buckets (id, name, public) values ('fichas','fichas',true) on conflict do nothing;
create policy "fichas publicas" on storage.objects for select using (bucket_id = 'fichas');
create policy "admin sube fichas" on storage.objects for all to authenticated using (bucket_id = 'fichas') with check (bucket_id = 'fichas');
