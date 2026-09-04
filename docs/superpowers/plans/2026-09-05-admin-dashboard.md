# SMAN 1 Tarik Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun modul Admin Dashboard terintegrasi di rute `/admin` untuk manajemen konten sekolah (Berita, Agenda, Prestasi, Galeri, Guru/Staf, Fasilitas, dan Sambutan) dengan autentikasi Supabase Auth dan upload media ke Supabase Storage.

**Architecture:** Route group `src/app/admin/` di dalam Next.js App Router dengan layout mandiri ber-sidebar responsif dan auth guard berbasis Supabase client-side session. Operasi CRUD berkomunikasi langsung dengan Supabase PostgreSQL menggunakan `@supabase/supabase-js`, didukung komponen modular reusable (`ImageUploader`, `ConfirmDialog`, `AdminSidebar`, `AdminHeader`).

**Tech Stack:** Next.js 16.3.4 (App Router), React 19, Tailwind CSS v4, Lucide React, Supabase Auth, Supabase Storage, TypeScript.

## Global Constraints
- Target URL: `https://sman1tarik.type3core.my.id/admin`
- 100% Free tier (Vercel + Supabase), tanpa penambahan dependensi komersial/berbayar
- Tanpa data dummy/placeholder; gunakan schema tabel Supabase yang sudah ada (`berita`, `agenda`, `prestasi`, `galeri`, `guru_staf`, `fasilitas`, `sambutan`)
- Akses tulis (INSERT, UPDATE, DELETE) dilindungi otorisasi authenticated user
- Upload media mendukung file gambar langsung (Supabase Storage bucket `website-images`) atau input URL eksternal dengan live preview

---

### Task 1: Supabase Storage Bucket & Helper Upload Utility

**Files:**
- Create: `website/src/lib/storage.ts`
- Modify: `website/src/lib/supabase/client.ts`

**Interfaces:**
- Produces: `uploadImage(file: File, folder?: string): Promise<string>` — mengunggah file gambar ke bucket `website-images` dan mengembalikan URL publik.

- [ ] **Step 1: Buat helper utility `uploadImage` di `website/src/lib/storage.ts`**

```typescript
import { createClientSupabase } from "@/lib/supabase/client";

export async function uploadImage(file: File, folder: string = "general"): Promise<string> {
  const supabase = createClientSupabase();
  const fileExt = file.name.split(".").pop() || "jpg";
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("website-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Gagal upload gambar: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from("website-images").getPublicUrl(fileName);
  return data.publicUrl;
}
```

- [ ] **Step 2: Test helper dan pastikan bucket `website-images` tersedia di Supabase**

Jalankan query verifikasi bucket via tool Supabase SQL atau pastikan bucket public `website-images` terbuat dengan RLS policy upload untuk authenticated.

- [ ] **Step 3: Commit**

```bash
git add website/src/lib/storage.ts
git commit -m "feat(admin): add Supabase Storage image upload helper"
```

---

### Task 2: Shared Admin UI Components (`AdminSidebar`, `AdminHeader`, `ConfirmDialog`, `ImageUploader`)

**Files:**
- Create: `website/src/components/admin/AdminSidebar.tsx`
- Create: `website/src/components/admin/AdminHeader.tsx`
- Create: `website/src/components/admin/ConfirmDialog.tsx`
- Create: `website/src/components/admin/ImageUploader.tsx`

**Interfaces:**
- Produces:
  - `<AdminSidebar currentPath={string} isOpen={boolean} onClose={() => void} />`
  - `<AdminHeader userEmail={string} onLogout={() => void} onToggleSidebar={() => void} title={string} />`
  - `<ConfirmDialog isOpen={boolean} title={string} message={string} onConfirm={() => void} onCancel={() => void} />`
  - `<ImageUploader value={string} onChange={(url: string) => void} folder?: string label?: string />`

- [ ] **Step 1: Implementasi `AdminSidebar.tsx`**

Sidebar memuat navigasi ke:
- Dashboard (`/admin`)
- Berita (`/admin/berita`)
- Agenda (`/admin/agenda`)
- Prestasi (`/admin/prestasi`)
- Galeri Foto (`/admin/galeri`)
- Guru & Staf (`/admin/guru-staf`)
- Fasilitas (`/admin/fasilitas`)
- Sambutan (`/admin/sambutan`)
Serta link keluar ke "Lihat Website Publik" (`/`).

- [ ] **Step 2: Implementasi `AdminHeader.tsx`**

Header menampilkan judul halaman saat ini, email admin yang login, tombol toggle drawer mobile, dan tombol Logout dengan konfirmasi.

- [ ] **Step 3: Implementasi `ConfirmDialog.tsx`**

Modal dialog minimalis untuk mencegah aksi hapus data yang tidak disengaja.

- [ ] **Step 4: Implementasi `ImageUploader.tsx`**

Mendukung 2 mode tab:
1. "Upload File": drag-and-drop / file input yang memanggil `uploadImage()`.
2. "Gunakan URL": text input URL langsung.
Menampilkan live preview gambar dan tombol hapus/reset.

- [ ] **Step 5: Verifikasi typecheck dan commit**

```bash
git add website/src/components/admin/
git commit -m "feat(admin): add reusable admin components (Sidebar, Header, Dialog, Uploader)"
```

---

### Task 3: Admin Root Shell & Auth Guard Layout

**Files:**
- Create: `website/src/app/admin/layout.tsx`
- Create: `website/src/app/admin/login/page.tsx`

**Interfaces:**
- Consumes: `createClientSupabase()`, `AdminSidebar`, `AdminHeader`
- Produces: Rute `/admin/*` yang otomatis terproteksi dan redirect ke `/admin/login` jika unauthenticated.

- [ ] **Step 1: Buat halaman `website/src/app/admin/login/page.tsx`**

Form login email & password dengan:
- Logo SMAN 1 Tarik
- Validasi input
- Tombol "Masuk ke Dashboard" dengan loading spinner
- Feedback error jika password salah
- Redirect ke `/admin` jika login sukses

- [ ] **Step 2: Buat `website/src/app/admin/layout.tsx`**

Logika layout:
- Periksa sesi `supabase.auth.getSession()` dan subscribe `onAuthStateChange`.
- Jika pathname adalah `/admin/login`, render children langsung (tanpa sidebar/header).
- Jika pathname di bawah `/admin` dan tidak ada sesi: tampilkan skeleton loader lalu redirect ke `/admin/login`.
- Jika authenticated: render layout lengkap (Sidebar desktop/mobile + Header + Main container).

- [ ] **Step 3: Verifikasi build lokal**

Run: `npm run build` di folder `website/`
Expected: Rute `/admin` dan `/admin/login` terdeteksi dan build exit 0.

- [ ] **Step 4: Commit**

```bash
git add website/src/app/admin/layout.tsx website/src/app/admin/login/page.tsx
git commit -m "feat(admin): implement admin layout shell and login authentication page"
```

---

### Task 4: Dashboard Overview Home (`/admin/page.tsx`)

**Files:**
- Create: `website/src/app/admin/page.tsx`

**Interfaces:**
- Consumes: Supabase tables (`berita`, `agenda`, `prestasi`, `guru_staf`, `galeri`, `fasilitas`)
- Produces: Ringkasan total data per modul, shortcut tambah cepat (*Quick Actions*), dan daftar aktivitas berita/agenda terbaru.

- [ ] **Step 1: Implementasi fetch counter data di `website/src/app/admin/page.tsx`**

Ambil jumlah baris untuk masing-masing tabel:
- Total Berita
- Total Agenda Mendatang
- Total Prestasi
- Total Guru & Staf
- Total Foto Galeri
- Total Fasilitas

- [ ] **Step 2: Desain cards statistik dan quick links**

Tampilkan kartu metrik dengan ikon Lucide, persentase kelengkapan, dan tombol cepat "Tambah Berita", "Tambah Prestasi", atau "Edit Sambutan".

- [ ] **Step 3: Commit**

```bash
git add website/src/app/admin/page.tsx
git commit -m "feat(admin): implement admin dashboard overview page"
```

---

### Task 5: Modul Manajemen Berita (`/admin/berita`)

**Files:**
- Create: `website/src/app/admin/berita/page.tsx`
- Create: `website/src/app/admin/berita/baru/page.tsx`
- Create: `website/src/app/admin/berita/[id]/page.tsx`

**Interfaces:**
- Consumes: Tabel `berita` (`id`, `title`, `date`, `category`, `excerpt`, `image`, `content`), `ImageUploader`, `ConfirmDialog`
- Produces: Halaman daftar berita (search & filter, delete), form tambah berita baru, dan form edit berita yang sudah ada.

- [ ] **Step 1: Buat daftar berita di `website/src/app/admin/berita/page.tsx`**

Tabel dengan kolom: Cover Thumbnail, Judul, Kategori, Tanggal, Aksi (Edit & Hapus). Dilengkapi kolom pencarian instan berdasarkan judul.

- [ ] **Step 2: Buat form tambah berita di `website/src/app/admin/berita/baru/page.tsx`**

Form dengan field:
- Judul Berita
- Tanggal Terbit (date input)
- Kategori (Akademik, Kesiswaan, Prestasi, Pengumuman, dll.)
- Ringkasan (Excerpt)
- Cover Gambar (`ImageUploader` folder: `berita`)
- Konten Lengkap (Textarea multi-paragraf)
- Tombol Simpan & Batal

- [ ] **Step 3: Buat form edit berita di `website/src/app/admin/berita/[id]/page.tsx`**

Mengambil data awal berdasarkan UUID `id`, mengisi form, dan menjalankan update ke tabel `berita`.

- [ ] **Step 4: Commit**

```bash
git add website/src/app/admin/berita/
git commit -m "feat(admin): implement full CRUD for news management module"
```

---

### Task 6: Modul Manajemen Agenda & Prestasi

**Files:**
- Create: `website/src/app/admin/agenda/page.tsx`
- Create: `website/src/app/admin/prestasi/page.tsx`

**Interfaces:**
- Consumes: Tabel `agenda` (`id`, `title`, `date`, `descr`) dan tabel `prestasi` (`id`, `title`, `descr`, `tahun`, `kategori`, `image`)
- Produces: Manajemen agenda kegiatan sekolah dan prestasi siswa dengan modal form cepat (Tambah, Edit, Hapus).

- [ ] **Step 1: Buat modul `website/src/app/admin/agenda/page.tsx`**

Tabel agenda dengan modal form tambah/edit untuk judul, tanggal (teks/kalender), dan deskripsi kegiatan.

- [ ] **Step 2: Buat modul `website/src/app/admin/prestasi/page.tsx`**

Tabel dan modal form prestasi siswa mencakup:
- Judul Prestasi
- Tingkat / Kategori (Nasional, Provinsi, Kabupaten, Akademik, Seni, Olahraga)
- Tahun Perolehan
- Deskripsi
- Upload Cover Piagam / Foto Kegiatan (`ImageUploader` folder: `prestasi`)

- [ ] **Step 3: Commit**

```bash
git add website/src/app/admin/agenda/ website/src/app/admin/prestasi/
git commit -m "feat(admin): implement agenda and student achievements management modules"
```

---

### Task 7: Modul Galeri, Guru & Staf, Fasilitas, dan Sambutan

**Files:**
- Create: `website/src/app/admin/galeri/page.tsx`
- Create: `website/src/app/admin/guru-staf/page.tsx`
- Create: `website/src/app/admin/fasilitas/page.tsx`
- Create: `website/src/app/admin/sambutan/page.tsx`

**Interfaces:**
- Consumes: Tabel `galeri`, `guru_staf`, `fasilitas`, dan `sambutan`
- Produces: Manajemen media galeri, direktori pendidik, sarana sekolah, dan sambutan kepala sekolah.

- [ ] **Step 1: Buat modul `website/src/app/admin/galeri/page.tsx`**

Grid foto galeri dengan badge kategori, tombol upload foto baru (dengan `ImageUploader`), dan tombol hapus.

- [ ] **Step 2: Buat modul `website/src/app/admin/guru-staf/page.tsx`**

Tabel profil guru & staf dengan modal form (Nama, NIP/NUPTK, Jabatan, Mata Pelajaran, Foto Profil).

- [ ] **Step 3: Buat modul `website/src/app/admin/fasilitas/page.tsx`**

Daftar fasilitas sekolah dengan tombol edit deskripsi dan gambar sarana prasarana.

- [ ] **Step 4: Buat modul `website/src/app/admin/sambutan/page.tsx`**

Editor sambutan kepala sekolah:
- Nama Kepala Sekolah & Gelar
- Foto Kepala Sekolah
- Paragraf 1, Paragraf 2, dan Paragraf 3 sambutan
- Tombol "Perbarui Sambutan" yang langsung memperbarui tabel `sambutan` di Supabase.

- [ ] **Step 5: Commit**

```bash
git add website/src/app/admin/galeri/ website/src/app/admin/guru-staf/ website/src/app/admin/fasilitas/ website/src/app/admin/sambutan/
git commit -m "feat(admin): implement gallery, teachers, facilities, and headmaster welcome note modules"
```

---

### Task 8: End-to-End Build Verification, RLS Policy Check, & Live Deployment

**Files:**
- Test all `/admin/*` routes in build

- [ ] **Step 1: Run local full build**

Jalankan: `npm run build` di folder `website/`
Pastikan output menunjukkan seluruh route `/admin/*` terdaftar tanpa error type.

- [ ] **Step 2: Pastikan RLS Policies Supabase mengizinkan authenticated user melakukan mutasi**

Periksa atau terapkan policy:
`CREATE POLICY "Enable all for authenticated users" ON public.<table_name> FOR ALL TO authenticated USING (true) WITH CHECK (true);`

- [ ] **Step 3: Push commit ke GitHub**

Run: `git push origin main`

- [ ] **Step 4: Verifikasi live deployment Vercel**

Pastikan status deployment Vercel `READY + PROMOTED` dan rute `https://sman1tarik.type3core.my.id/admin` dapat diakses dengan mulus.
