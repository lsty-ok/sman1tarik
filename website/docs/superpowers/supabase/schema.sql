-- ============================================================
-- SMAN 1 TARIK — Supabase schema (Fase 2)
-- Jalankan di Dashboard Supabase -> SQL Editor.
-- ============================================================

-- ============================================================
-- TABEL DINAMIS (client-side fetch, anon) — RLS SELECT publik
-- ============================================================

create table if not exists public.berita (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date,
  category text,
  excerpt text,
  image text,
  content jsonb
);
alter table public.berita enable row level security;
drop policy if exists "public read berita" on public.berita;
create policy "public read berita" on public.berita for select using (true);

create table if not exists public.agenda (
  id uuid primary key default gen_random_uuid(),
  title text,
  date text,
  descr text
);
alter table public.agenda enable row level security;
drop policy if exists "public read agenda" on public.agenda;
create policy "public read agenda" on public.agenda for select using (true);

create table if not exists public.prestasi (
  id uuid primary key default gen_random_uuid(),
  title text,
  descr text,
  tahun text,
  kategori text,
  image text
);
alter table public.prestasi enable row level security;
drop policy if exists "public read prestasi" on public.prestasi;
create policy "public read prestasi" on public.prestasi for select using (true);

create table if not exists public.galeri (
  id uuid primary key default gen_random_uuid(),
  src text,
  alt text
);
alter table public.galeri enable row level security;
drop policy if exists "public read galeri" on public.galeri;
create policy "public read galeri" on public.galeri for select using (true);

-- ============================================================
-- TABEL STATIS (server-side fetch via service role)
-- RLS enabled, TANPA policy publik (service role melewati RLS)
-- ============================================================

create table if not exists public.visi_misi (
  id uuid primary key default gen_random_uuid(),
  visi text,
  misi jsonb,
  tujuan jsonb
);
alter table public.visi_misi enable row level security;

create table if not exists public.identitas (
  id uuid primary key default gen_random_uuid(),
  label text,
  value text
);
alter table public.identitas enable row level security;

create table if not exists public.guru_staf (
  id uuid primary key default gen_random_uuid(),
  nama text,
  peran text
);
alter table public.guru_staf enable row level security;

create table if not exists public.sambutan (
  id uuid primary key default gen_random_uuid(),
  nama text,
  jabatan text,
  foto text,
  isi jsonb
);
alter table public.sambutan enable row level security;

create table if not exists public.kurikulum (
  id uuid primary key default gen_random_uuid(),
  nama text,
  deskripsi text,
  prinsip jsonb,
  integritas text
);
alter table public.kurikulum enable row level security;

create table if not exists public.program_unggulan_akademik (
  id uuid primary key default gen_random_uuid(),
  icon text,
  title text,
  descr text
);
alter table public.program_unggulan_akademik enable row level security;

create table if not exists public.mata_pelajaran (
  id uuid primary key default gen_random_uuid(),
  fase_e text,
  fase_f text,
  wajib jsonb,
  pilihan jsonb
);
alter table public.mata_pelajaran enable row level security;

create table if not exists public.jadwal (
  id uuid primary key default gen_random_uuid(),
  sistem text,
  jam_masuk text,
  jam_pulang text,
  catatan jsonb
);
alter table public.jadwal enable row level security;

create table if not exists public.ekskul_detail (
  id uuid primary key default gen_random_uuid(),
  icon text,
  name text,
  descr text
);
alter table public.ekskul_detail enable row level security;

create table if not exists public.organisasi (
  id uuid primary key default gen_random_uuid(),
  icon text,
  name text,
  descr text
);
alter table public.organisasi enable row level security;

create table if not exists public.kegiatan (
  id uuid primary key default gen_random_uuid(),
  icon text,
  name text,
  descr text
);
alter table public.kegiatan enable row level security;

create table if not exists public.fasilitas (
  id uuid primary key default gen_random_uuid(),
  title text,
  image text,
  has_image boolean
);
alter table public.fasilitas enable row level security;

create table if not exists public.ppdb_alur (
  id uuid primary key default gen_random_uuid(),
  alur jsonb
);
alter table public.ppdb_alur enable row level security;

create table if not exists public.ppdb_persyaratan (
  id uuid primary key default gen_random_uuid(),
  persyaratan jsonb
);
alter table public.ppdb_persyaratan enable row level security;

create table if not exists public.ppdb_jalur (
  id uuid primary key default gen_random_uuid(),
  nama text,
  descr text
);
alter table public.ppdb_jalur enable row level security;

create table if not exists public.ppdb_faq (
  id uuid primary key default gen_random_uuid(),
  q text,
  a text
);
alter table public.ppdb_faq enable row level security;
