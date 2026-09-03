# Fase 2 — Migrasi Data ke Supabase Cloud Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pindahkan seluruh konten situs SMAN 1 Tarik dari `src/data/siteData.ts` (Simulated CMS) ke Supabase Cloud, dan alihkan semua halaman untuk membaca data dari Supabase secara hybrid (statis → server, dinamis → client).

**Architecture:** Supabase Cloud (`nhbzrsqgxvftxsxlnujs`) sebagai database. Dua klien: `lib/supabase/server.ts` (service role — Server Components, melewati RLS) untuk data statis, dan `lib/supabase/client.ts` (anon key + RLS) untuk data dinamis. Skema & migrasi data via SQL Editor Dashboard (MCP read-only). `lib/data.ts` menyediakan query typed per entitas.

**Tech Stack:** Next.js 16.3.4 (App Router, `src/`, Turbopack), TypeScript, React 19, `@supabase/supabase-js`.

## Global Constraints

- Data harus asli (dari `siteData.ts` riset internet) — BUKAN fiktif/lorem.
- Jangan tulis komentar/docstring yang tidak perlu. Komentar organisasi yang ada di `siteData.ts` boleh dipertahankan.
- Tanpa suppress type error (`as any`, `@ts-ignore`, `@ts-expect-error`).
- Kredensial di `.env.local` (sudah di-ignore oleh `.gitignore` `.env*`).
- Service role key HANYA di sisi server, tidak pernah dikirim ke client/browser.
- RLS: tabel dinamis `SELECT USING (true)` untuk anon; tabel statis deny-all + service role.
- Render hybrid: data statis → Server Component (service role), data dinamis → Client Component (anon + RLS).
- Branding/navigasi (siteInfo, stats, keunggulan, navMenu, ppdbInfo, sosial) TETAP di kode, TIDAK dipindah.
- Lingkungan Windows PowerShell 5.x — gunakan `curl.exe`, `npx`, `npm run`. Hindari `&&` antar perintah.

---

## File Structure

**Dibuat:**
- `website/.env.local` — kredensial Supabase
- `website/src/lib/supabase/client.ts` — anon browser client
- `website/src/lib/supabase/server.ts` — service role server client
- `website/src/lib/supabase/types.ts` — tipe data konten
- `website/src/lib/data.ts` — fungsi query typed per entitas
- `website/docs/superpowers/supabase/schema.sql` — DDL + RLS (dijalankan di SQL Editor)
- `website/docs/superpowers/supabase/seed.sql` — insert data dari siteData (dijalankan di SQL Editor)

**Dimodifikasi (refactor halaman — ganti import `siteData` → panggil `lib/data.ts`):**
- Dinamis (client): `src/app/berita/page.tsx`, `src/app/berita/[id]/page.tsx`, `src/app/agenda/page.tsx`, `src/app/galeri/page.tsx`, `src/app/kesiswaan/prestasi/page.tsx`, `src/components/home/Galeri.tsx`, `src/components/home/BeritaAgenda.tsx`, `src/components/home/Prestasi.tsx`
- Statis (server, async): `src/app/profil/visi-misi/page.tsx`, `src/app/profil/identitas/page.tsx`, `src/app/profil/guru/page.tsx`, `src/app/profil/sambutan/page.tsx`, `src/app/akademik/kurikulum/page.tsx`, `src/app/akademik/program-unggulan/page.tsx`, `src/app/akademik/mata-pelajaran/page.tsx`, `src/app/akademik/jadwal/page.tsx`, `src/app/kesiswaan/ekskul/page.tsx`, `src/app/kesiswaan/organisasi/page.tsx`, `src/app/kesiswaan/kegiatan/page.tsx`, `src/app/fasilitas/page.tsx`, `src/components/home/Fasilitas.tsx`, `src/components/home/Sambutan.tsx`, `src/components/home/Ekskul.tsx`, `src/components/home/ProgramUnggulan.tsx`, `src/app/ppdb/persyaratan/page.tsx`, `src/app/ppdb/jalur/page.tsx`, `src/app/ppdb/page.tsx`, `src/app/ppdb/faq/page.tsx`
- `website/package.json` — tambah `@supabase/supabase-js`
- `website/src/types/env.d.ts` (atau `next-env.d.ts` via `process.env`) — gunakan `process.env.NEXT_PUBLIC_*` langsung tanpa deklarasi khusus

**Tidak diubah (tetap di kode):** `siteInfo`, `stats`, `keunggulan`, `navMenu`, `ppdbInfo`, `sosial` — dipakai Navbar/Footer/Hero/AngkaKita/Keunggulan/PPDBQuickInfo.

---

### Task 1: Instalasi Supabase & Kredensial

**Files:**
- Modify: `website/package.json`
- Create: `website/.env.local`

**Interfaces:**
- Produces: `@supabase/supabase-js` terinstall; `.env.local` berisi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

- [ ] **Step 1: Install dependency**

Run: `npm install @supabase/supabase-js`
Expected: exit 0, `node_modules/@supabase/supabase-js` ada.

- [ ] **Step 2: Buat `.env.local`**

Buat file `website/.env.local` dengan isi (nilai placeholder — isi dari Dashboard Supabase → Settings → API):
```
NEXT_PUBLIC_SUPABASE_URL=https://nhbzrsqgxvftxsxlnujs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=PASTE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=PASTE_SERVICE_ROLE_KEY
```
Verifikasi `.gitignore` sudah memuat `.env*` (sudah ada — Task tidak perlu mengubahnya).

- [ ] **Step 3: Verifikasi build masih jalan**

Run: `npx tsc --noEmit`
Expected: exit 0 (belum ada perubahan kode, tidak eror baru).

---

### Task 2: Klien Supabase (client & server)

**Files:**
- Create: `website/src/lib/supabase/client.ts`
- Create: `website/src/lib/supabase/server.ts`

**Interfaces:**
- Produces: `createClientSupabase()` (anon, browser), `createServerSupabase()` (service role, server). Dipakai `lib/data.ts` pada Task 5.

- [ ] **Step 1: Tulis client.ts**

`client.ts`:
```ts
import { createBrowserClient } from "@supabase/ssr";
```
> Catatan: karena kita pakai `@supabase/supabase-js` (bukan `@supabase/ssr`), gunakan `createClient` biasa, bukan `createBrowserClient`. Implementasi di bawah.

Implementasi `client.ts` (pakai `createClient` dari supabase-js):
```ts
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createClientSupabase() {
  return createClient(url, anonKey);
}
```

- [ ] **Step 2: Tulis server.ts**

`server.ts`:
```ts
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function createServerSupabase() {
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
```

- [ ] **Step 3: Verifikasi compile**

Run: `npx tsc --noEmit`
Expected: exit 0.

---

### Task 3: Skema Database (SQL Editor)

**Files:**
- Create: `website/docs/superpowers/supabase/schema.sql`

**Interfaces:**
- Produces: DDL untuk tabel + RLS yang user jalankan di Dashboard SQL Editor. Struktur tabel dipakai query di Task 5.

- [ ] **Step 1: Tulis schema.sql**

Buat file `schema.sql` berisi (contoh; implementer harus menulis lengkap semua tabel):

```sql
-- ============================================================
-- TABEL DINAMIS  (client-side, RLS SELECT publik)
-- ============================================================
create table public.berita (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date,
  category text,
  excerpt text,
  image text,
  content jsonb
);
alter table public.berita enable row level security;
create policy "public read berita" on public.berita for select using (true);

create table public.agenda (
  id uuid primary key default gen_random_uuid(),
  title text,
  date text,
  descr text
);
alter table public.agenda enable row level security;
create policy "public read agenda" on public.agenda for select using (true);

create table public.prestasi (
  id uuid primary key default gen_random_uuid(),
  title text,
  descr text,
  tahun text,
  kategori text,
  image text
);
alter table public.prestasi enable row level security;
create policy "public read prestasi" on public.prestasi for select using (true);

create table public.galeri (
  id uuid primary key default gen_random_uuid(),
  src text,
  alt text
);
alter table public.galeri enable row level security;
create policy "public read galeri" on public.galeri for select using (true);

-- ============================================================
-- TABEL STATIS  (server-side, service role — RLS deny-all)
-- ============================================================
create table public.visi_misi (
  id uuid primary key default gen_random_uuid(),
  visi text,
  misi jsonb,
  tujuan jsonb
);
alter table public.visi_misi enable row level security;

-- (lanjutkan: identitas, guru_staf, sambutan, kurikulum,
--  program_unggulan, mata_pelajaran, jadwal, ekskul, organisasi,
--  kegiatan, fasilitas, ppdb_alur, ppdb_persyaratan, ppdb_jalur, ppdb_faq)
```

PENTING: implementer harus menulis **semua tabel** berikut, kolom wajib sesuai data di `siteData.ts`:
`berita, agenda, prestasi, galeri` (dinamis + RLS publik), dan statis:
`visi_misi, identitas, guru_staf, sambutan, kurikulum, program_unggulan_akademik,
mata_pelajaran, jadwal, ekskul_detail, organisasi, kegiatan, fasilitas,
ppdb_alur, ppdb_persyaratan, ppdb_jalur, ppdb_faq` (service role, deny-all RLS).

Tabel statis TIDAK perlu policy SELECT publik (diakses via service role yang melewati RLS).

- [ ] **Step 2: (Manual oleh user) Jalankan schema di SQL Editor**

User menempel `schema.sql` ke Supabase Dashboard → SQL Editor → Run.
Konfirmasi tidak ada error.

---

### Task 4: Seed Data (SQL Editor)

**Files:**
- Create: `website/docs/superpowers/supabase/seed.sql`

**Interfaces:**
- Produces: Statement INSERT yang mengisi semua tabel dari data `siteData.ts` (data asli riset).

- [ ] **Step 1: Tulis seed.sql**

Buat file `seed.sql` dengan INSERT untuk setiap tabel, nilainya diambil dari `src/data/siteData.ts` (salin persis konten — jangan diubah/dibuat-buat). Untuk kolom jsonb (mis. content, misi, tujuan), gunakan CAST literal JSON:
```sql
insert into public.berita (title, date, category, excerpt, image, content) values
('Kelulusan Peserta Didik SMA Negeri 1 Tarik Tahun 2025-2026', '2026-05-04', 'Pengumuman',
 'SK Kelulusan SMAN 1 Tarik Tahun 2026 telah diterbitkan. Seluruh peserta didik dinyatakan lulus.',
 '/images/berita-kelulusan.jpg',
 '[{"p":"SMA Negeri 1 Tarik telah menerbitkan Surat Keputusan ..."}]'::jsonb);
```
> Catatan: karena `content` di `siteData.ts` adalah `string[]` (bukan object array), simpan sebagai JSON array string: `'["paragraf1", "paragraf2", ...]'::jsonb`. Pemetaan ini dipakai query di Task 5 — `data.ts` harus mengembalikannya sebagai `string[]`.

- [ ] **Step 2: (Manual) Jalankan seed di SQL Editor**

User menempel `seed.sql` → Run. Konfirmasi baris ter-insert (gunakan `select count(*) from public.berita;` dst. untuk verifikasi).

---

### Task 5: Tipe & Fungsi Akses Data

**Files:**
- Create: `website/src/lib/supabase/types.ts`
- Create: `website/src/lib/data.ts`

**Interfaces:**
- Consumes: `createClientSupabase()`, `createServerSupabase()` (Task 2).
- Produces: tipe per entitas (`Berita`, `Agenda`, `Prestasi`, `Galeri`, `VisiMisi`, `Identitas`, …) dan fungsi `getBerita()`, `getAgenda()`, `getPrestasi()`, `getGaleri()`, `getVisiMisi()`, `getIdentitas()`, `getGuruStaf()`, `getSambutan()`, `getKurikulum()`, `getProgramUnggulanAkademik()`, `getMataPelajaran()`, `getJadwal()`, `getEkskulDetail()`, `getOrganisasi()`, `getKegiatan()`, `getFasilitas()`, `getPpdbAlur()`, `getPpdbPersyaratan()`, `getPpdbJalur()`, `getPpdbFaq()`.

- [ ] **Step 1: Tulis types.ts**

`types.ts` — tipe TS minimal untuk setiap entitas Senyawa dengan data `siteData.ts`. Contoh:
```ts
export interface Berita {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  content: string[];
}

export interface FasilitasItem {
  title: string;
  image: string;
  hasImage: boolean;
}
```
(Implementer menulis tipe untuk semua entitas sesuai bentuk data di `siteData.ts`.)

- [ ] **Step 2: Tulis data.ts — fungsi dinamis (client)**

Fungsi dinamis memakai `createClientSupabase()` (anon + RLS):
```ts
import { createClientSupabase } from "@/lib/supabase/client";
import type { Berita } from "@/lib/supabase/types";

export async function getBerita(): Promise<Berita[]> {
  const supabase = createClientSupabase();
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(hydrateBerita);
}

function hydrateBerita(row: any): Berita {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    category: row.category,
    excerpt: row.excerpt,
    image: row.image,
    content: Array.isArray(row.content) ? row.content : [],
  };
}
```

- [ ] **Step 3: Tulis data.ts — fungsi statis (server)**

Fungsi statis memakai `createServerSupabase()` (service role):
```ts
import { createServerSupabase } from "@/lib/supabase/server";

export async function getVisiMisi() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("visi_misi").select("*").limit(1).single();
  if (error) throw new Error(error.message);
  return {
    visi: data.visi,
    misi: (data.misi ?? []) as string[],
    tujuan: (data.tujuan ?? []) as string[],
  };
}
```

- [ ] **Step 4: Verifikasi compile**

Run: `npx tsc --noEmit`
Expected: exit 0.

---

### Task 6: Refactor Halaman Dinamis → Client

**Files:**
- Modify: `src/app/berita/page.tsx`, `src/app/berita/[id]/page.tsx`, `src/app/agenda/page.tsx`, `src/app/galeri/page.tsx`, `src/app/kesiswaan/prestasi/page.tsx`, `src/components/home/Galeri.tsx`, `src/components/home/BeritaAgenda.tsx`, `src/components/home/Prestasi.tsx`

**Interfaces:**
- Consumes: `getBerita()`, `getAgenda()`, `getPrestasi()`, `getGaleri()` (Task 5).

- [ ] **Step 1: Berita list → client**

Ubah `src/app/berita/page.tsx` menjadi `"use client"` component. Pindahkan `typeof` cuplikan header/JSX tetap. Fetch `getBerita()` di dalam `useEffect`/`use` dengan state `loading`/`data`/`error`. Tampilkan skeleton saat loading, data saat siap, pesan error saat gagal.

- [ ] **Step 2: Berita detail → client**

Ubah `src/app/berita/[id]/page.tsx`. Karena `[id]` butuh data per id, buat komponen client penerima `id` yang fetch `getBerita()` lalu cari item. **Pertahankan** `generateMetadata` bila memungkinkan, atau ganti menjadi client page dengan `useParams`. Konversi `item.content` (jsonb → `string[]`) untuk render paragraf.

- [ ] **Step 3: Halaman dinamis lain → client**

Refactor `agenda`, `galeri`, `prestasi`, dan home `Galeri`, `BeritaAgenda`, `Prestasi` menjadi client-fetch serupa (skeleton/loading/error).

- [ ] **Step 4: Verifikasi**

Run: `npx tsc --noEmit` (exit 0), lalu `npm run build`. Jalankan dev server & cek HTTP 200 pada rute dinamis.

---

### Task 7: Refactor Halaman Statis → Server Async

**Files:**
- Modify: `src/app/profil/*` (visi-misi, identitas, guru, sambutan), `src/app/akademik/*` (kurikulum, program-unggulan, mata-pelajaran, jadwal), `src/app/kesiswaan/*` (ekskul, organisasi, kegiatan), `src/app/fasilitas/page.tsx`, `src/components/home/Fasilitas.tsx`, `src/components/home/Sambutan.tsx`, `src/components/home/Ekskul.tsx`, `src/components/home/ProgramUnggulan.tsx`, `src/app/ppdb/*` (persyaratan, jalur, page, faq)

**Interfaces:**
- Consumes: fungsi statis di Task 5 (`getVisiMisi()`, `getIdentitas()`, `getGuruStaf()`, `getSambutan()`, `getKurikulum()`, `getProgramUnggulanAkademik()`, `getMataPelajaran()`, `getJadwal()`, `getEkskulDetail()`, `getOrganisasi()`, `getKegiatan()`, `getFasilitas()`, `getPpdbAlur()`, `getPpdbPersyaratan()`, `getPpdbJalur()`, `getPpdbFaq()`).

- [ ] **Step 1: Jadikan Server Component async**

Konversi setiap halaman statis menjadi `async function ...Page()` yang memanggil fungsi `lib/data.ts` di awal, lalu render dengan data. Hapus import dari `@/data/siteData`.

Contoh (`visi-misi/page.tsx`):
```tsx
import { getVisiMisi } from "@/lib/data";

export default async function VisiMisiPage() {
  const { visi, misi, tujuan } = await getVisiMisi();
  // render sesuai JSX lama, pakai data
}
```

- [ ] **Step 2: Refactor home components statis**

`Sambutan.tsx`, `Fasilitas.tsx`, `Ekskul.tsx`, `ProgramUnggulan.tsx` menjadi async server components yang menerima data (bisa fetch dari `lib/data.ts`, karena Home page adalah server component). Sesuaikan pemanggil di `src/app/page.tsx` bila perlu.

- [ ] **Step 3: Refactor halaman PPDB statis**

`ppdb` (alur), `persyaratan`, `jalur`, `faq` → server async memakai `getPpdbAlur()`, `getPpdbPersyaratan()`, `getPpdbJalur()`, `getPpdbFaq()`. Pertahankan `siteInfo` import (tetap di kode).

- [ ] **Step 4: Verifikasi**

Run: `npx tsc --noEmit` → exit 0. `npm run build` → exit 0. Dev server → HTTP 200 semua rute. Pastikan data tampil sama seperti sebelum migrasi.

---

### Task 8: Verifikasi Akhir & Cleanup

**Files:**
- Modify: none (verifikasi saja). Opsional: arsip `src/data/siteData.ts` menjadi `src/data/seedSource.ts` (tanpa import) bila masih dibutuhkan dokumentasi/perbandingan.

- [ ] **Step 1: Type & build**

Run: `npx tsc --noEmit` → exit 0
Run: `npm run build` → exit 0
Run: `curl.exe -s -o NUL -w "%{http_code}" http://localhost:3000/<route>` → `200` untuk: `/`, `/berita`, `/berita/1`, `/agenda`, `/galeri`, `/profil/visi-misi`, `/profil/identitas`, `/profil/guru`, `/profil/sambutan`, `/akademik/kurikulum`, `/akademik/program-unggulan`, `/akademik/mata-pelajaran`, `/akademik/jadwal`, `/kesiswaan/ekskul`, `/kesiswaan/organisasi`, `/kesiswaan/prestasi`, `/kesiswaan/kegiatan`, `/fasilitas`, `/ppdb`, `/ppdb/persyaratan`, `/ppdb/jalur`, `/ppdb/faq`.

- [ ] **Step 2: Verifikasi data benar**

Di tiap page, pastikan konten yang dirender sama dengan `siteData.ts` (bandingkan judul berita, misi, identitas, ekskul, dll.).

- [ ] **Step 3: Selesai**

Rekap perubahan, catat bahwa `siteData.ts` bukan lagi sumber runtime (opsional diarsip). Tutup plan.

---

## Self-Review

**1. Spec coverage:** Spec menuntut — semua data dipindah ✅ (Task 4 seed), hybrid render ✅ (Task 6 dinamis client, Task 7 statis server), satu tabel per entitas ✅ (Task 3 schema), RLS ✅ (Task 3), lapisan `lib/supabase/*` + `lib/data.ts` ✅ (Task 2, 5), kredensial `.env.local` ✅ (Task 1), transformasi halaman ✅ (Task 6, 7), verifikasi ✅ (Task 8). Branding/nav tetap di kode ✅ (dinyatakan di File Structure).

**2. Placeholder scan:** Tidak ada TBD/TODO di langkah. Placeholder kredensial di `.env.local` diberi label `PASTE_...` eksplisit (disengaja — user isi dari Dashboard). ✅

**3. Type consistency:** `getBerita()` didefinisikan di Task 5, dipakai Task 6. `content` jsonb → `string[]` konsisten (Task 4 & 5 selaras). Fungsi statis (`getVisiMisi()` dsb.) konsisten dipakai Task 7. ✅
