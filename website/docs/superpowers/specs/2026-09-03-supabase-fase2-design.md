# Fase 2 — Migrasi ke Supabase Cloud

**Tanggal:** 2026-09-03
**Project:** SMA Negeri 1 Tarik (Next.js 16.3.4, App Router, `src/`, TypeScript)
**Status:** Design (menunggu review)

## Latar Belakang

Situs saat ini memakai `src/data/siteData.ts` sebagai "Simulated CMS" — semua konten
terpusat di satu file dan diimpor langsung oleh halaman Server Component (static
prerender). Fase 2 memindahkan seluruh konten ke **Supabase Cloud** sebagai database
asli. Constraint on-premise/offline sebelumnya **dicabut** untuk fase ini — aplikasi
boleh terhubung internet.

Project Supabase: `nhbzrsqgxvftxsxlnujs` (remote MCP read-only untuk eksplorasi;
setup skema & migrasi data via Dashboard SQL Editor / service role key).

## Tujuan

1. Seluruh data di `siteData.ts` dipindah ke tabel-tabel Supabase (satu tabel per entitas).
2. Aplikasi membaca data dari Supabase, bukan `siteData.ts`.
3. Data dinamis di-fetch **client-side** (anon key + RLS). Data statis di-fetch **server-side**
   (service role, Server Components).
4. Semua halaman tetap berfungsi dengan konten yang sama seperti sekarang.

## Keputusan Desain

- **Supabase Cloud / online** — internet diizinkan.
- **Semua data** dipindah (bukan sebagian).
- **Hybrid rendering**: dinamis → client, statis → server.
- **Satu tabel per entitas** (normal, relasional).

## Arsitektur

### Aliran data

```
Halaman statis (Server Component, async)
  └── lib/data.ts (server functions)
        └── lib/supabase/server.ts (service role client) ──> Supabase (service key)
                                                                (melewati RLS)

Halaman dinamis (Client Component, 'use client')
  └── komponen fetch → lib/supabase/client.ts (anon client) ──> Supabase (anon + RLS)
                                                                (SELECT policy untuk publik)
```

### Lapisan kode baru

| File | Peran |
|------|-------|
| `lib/supabase/client.ts` | Anon browser client (untuk komponen client / fetch dinamis) |
| `lib/supabase/server.ts` | Service role server client (untuk Server Components) |
| `lib/data.ts` | Fungsi query per entitas, dipakai halaman untuk membaca data |
| `.env.local` | Kredensial (URL, anon key, service role key) — jangan di-commit |

`siteData.ts` menjadi sumber **seeding** (data awal migrasi), bukan sumber runtime.
Halaman tidak lagi mengimpor data darinya.

## Skema Tabel

Semua tabel menggunakan UUID `id` (default `gen_random_uuid()`) + kolom `created_at`.

### Tabel dinamis (client-side, RLS `SELECT` untuk anon)

**`berita`**
- `id uuid pk`
- `title text not null`
- `date date`
- `category text`
- `excerpt text`
- `image text`
- `content jsonb` (array paragraf)

**`agenda`**
- `id uuid pk`, `title text`, `date text`, `desc text`

**`prestasi`**
- `id uuid pk`, `title text`, `desc text`, `tahun text`, `kategori text`, `image text`

**`galeri`**
- `id uuid pk`, `src text`, `alt text`

### Tabel statis (server-side, service role)

**`visi_misi`** — `visi text`, `misi jsonb`, `tujuan jsonb`
**`identitas`** — `label text`, `value text`
**`guru_staf`** — `nama text`, `peran text`
**`sambutan`** — `nama text`, `jabatan text`, `foto text`, `isi jsonb`
**`kurikulum`** — `nama text`, `deskripsi text`, `prinsip jsonb`, `integritas text`
**`program_unggulan`** — `icon text`, `title text`, `desc text`
**`mata_pelajaran`** — `fase_e text`, `fase_f text`, `wajib jsonb`, `pilihan jsonb`
**`jadwal`** — `sistem text`, `jam_masuk text`, `jam_pulang text`, `catatan jsonb`
**`ekskul`** — `icon text`, `name text`, `desc text`
**`organisasi`** — `icon text`, `name text`, `desc text`
**`kegiatan`** — `icon text`, `name text`, `desc text`
**`fasilitas`** — `title text`, `image text`, `has_image boolean`

**PPDB** — karena berisi struktur berbeda (alur list, persyaratan list, jalur list objek,
faq list objek), dipetakan sebagai:
- **`ppdb_alur`** — satu baris: `alur jsonb`
- **`ppdb_persyaratan`** — satu baris: `persyaratan jsonb`
- **`ppdb_jalur`** — `nama text`, `desc text`
- **`ppdb_faq`** — `q text`, `a text`

> Catatan: `sosial`, `stats`, `navMenu`, `siteInfo`, `ppdbInfo` (struktur navigasi &
branding statis) dibiarkan tetap di kode (bukan data konten). Keputusan ini bisa
direvisi bila dikehendaki.

## RLS & Keamanan

- Tabel **dinamis**: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` +
  `CREATE POLICY "public read" ON ... FOR SELECT USING (true);` → anon bisa baca,
  tidak bisa tulis.
- Tabel **statis**: RLS enabled dengan `DENY ALL` default. Service role (via server
  client) melewati RLS sehingga tetap bisa baca di sisi server.
- Anon key hanya ekspos ke browser (dinamis). Service role key HANYA di sisi server
  (`.env.local`, tidak pernah dikirim ke client).

## Transformasi Halaman

- **Statis** (`/profil/*`, sebagian `/akademik/*`): Server Component async memanggil
  `lib/data.ts` (service role). Data diterima synchronous sebelum render.
- **Dinamis** (`/berita`, `/agenda`, `/galeri`, `/kesiswaan/prestasi`): komponen client
  fetch via anon client; tampilkan skeleton/loading lalu data.
- Error handling: halaman server menangani kegagalan query (fallback/empty state);
  halaman client menampilkan error state + retry.

## Setup & Migrasi

1. Install `@supabase/supabase-js`.
2. Isi `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`. Pastikan `.gitignore` mengecualikan `.env*` (kecuali template).
3. Jalankan skrip SQL (schema + RLS) di Dashboard SQL Editor.
4. Seed data: migrasi konten dari `siteData.ts` ke tabel (insert).
5. Bangun `lib/supabase/*` + `lib/data.ts`.
6. Refactor halaman: ganti import `siteData` dengan pemanggilan data.
7. Verifikasi: `npx tsc --noEmit`, `npm run build`, HTTP 200 semua rute, data tampil benar.

## Penutup Skope

Tidak termasuk fase ini: admin panel CMS, autentikasi user, upload file (storage),
deploy. Fokus = migrasi baca data dari file ke Supabase + render hybrid.
