# SMAN 1 Tarik Admin Dashboard Design Specification

- **Date:** 2026-09-05
- **Author:** Sisyphus & Development Team
- **Target URL:** `https://sman1tarik.type3core.my.id/admin`
- **Stack:** Next.js 16.3.4 (App Router), React 19, Tailwind CSS v4, Lucide React, Supabase Auth & Storage

---

## 1. Executive Summary & Goals

Website profil SMA Negeri 1 Tarik saat ini mengandalkan Supabase Table Editor untuk memanipulasi konten dinamis. Untuk mempermudah staf sekolah yang tidak terbiasa dengan UI database mentah, modul **Admin Dashboard (`/admin`)** dibangun secara terpadu di dalam proyek Next.js yang sudah ada.

### Core Objectives
1. **0 Biaya & Open-Source:** Tetap beroperasi di free-tier Vercel + Supabase tanpa penambahan hosting server eksternal.
2. **Keamanan:** Menggunakan Supabase Auth (Email & Password) resmi untuk autentikasi dan otorisasi sesi admin.
3. **Kemudahan Pengelolaan Konten (Full-CRUD):**
   - Berita & Pengumuman (CRUD + Multi-paragraf + Upload Cover)
   - Agenda Kegiatan (CRUD + Kalender/Tanggal + Deskripsi)
   - Prestasi Siswa (CRUD + Tahun + Kategori + Cover)
   - Galeri Dokumentasi (CRUD + Upload Foto + Kategori)
   - Direktori Guru & Staf (CRUD + Jabatan + NIP + Mapel)
   - Fasilitas Sekolah (CRUD + Keterangan + Gambar)
   - Sambutan Kepala Sekolah (Edit Teks Sambutan & Data Kepala Sekolah)
4. **Media Handling:** Mendukung upload gambar langsung ke Supabase Storage (bucket `website-images`) atau input URL eksternal dengan live preview.

---

## 2. Architecture & Directory Structure

Dashboard menggunakan isolasi route group `src/app/admin/` dengan layout mandiri (bebas dari Navbar dan Footer publik sekolah).

```
website/src/app/admin/
├── layout.tsx                # Admin root shell (Sidebar, Header, Auth Guard)
├── page.tsx                  # Dashboard Overview (Statistik ringkas & Quick Actions)
├── login/
│   └── page.tsx              # Halaman Login Admin (Supabase Auth)
├── berita/
│   ├── page.tsx              # Tabel Berita (Search, Filter, List, Delete)
│   ├── baru/page.tsx         # Form Tambah Berita Baru
│   └── [id]/page.tsx         # Form Edit Berita
├── agenda/
│   └── page.tsx              # Tabel & Form Modal Agenda
├── prestasi/
│   ├── page.tsx              # Tabel Prestasi Siswa
│   └── [id]/page.tsx         # Form Tambah / Edit Prestasi
├── galeri/
│   └── page.tsx              # Grid Galeri Foto & Upload Modal
├── guru-staf/
│   └── page.tsx              # Tabel Guru & Staf + Modal Tambah/Edit
├── fasilitas/
│   └── page.tsx              # Manajemen Fasilitas Sekolah
└── sambutan/
    └── page.tsx              # Form Editor Sambutan Kepala Sekolah

website/src/components/admin/
├── AdminSidebar.tsx          # Navigasi kiri responsif
├── AdminHeader.tsx           # Breadcrumb, Akun info, Logout button
├── ImageUploader.tsx         # Reusable image uploader (File to Storage / URL + Preview)
├── ConfirmDialog.tsx         # Dialog konfirmasi aksi destruktif (Hapus data)
└── DataTable.tsx             # Komponen tabel dengan pagination & pencarian
```

---

## 3. Authentication & Security Workflow

1. **Supabase Auth Integration:**
   - Client-side auth menggunakan `createClientSupabase()` dari `@/lib/supabase/client`.
   - Menggunakan session listener `supabase.auth.onAuthStateChange` dan pengecekan `supabase.auth.getSession()`.
2. **Route Protection (Client Guard & Layout):**
   - Pada `src/app/admin/layout.tsx`:
     - Jika rute adalah `/admin/login`, render layout minimalis tanpa sidebar/header.
     - Jika rute `/admin/*` lainnya: periksa status session. Jika unauthenticated, lakukan `router.replace('/admin/login')`.
     - Tampilkan loading skeleton yang elegan saat memverifikasi sesi untuk mencegah layout shift atau flash of unauthenticated content.
3. **Row Level Security (RLS) & Storage Access:**
   - Tabel Supabase memiliki RLS. Operasi baca (SELECT) bersifat publik (anon).
   - Operasi tulis (INSERT, UPDATE, DELETE) diizinkan bagi authenticated user (`auth.role() = 'authenticated'`).
   - Bucket Supabase Storage: `website-images` dibuat bersifat public-read dengan hak upload khusus authenticated user.

---

## 4. UI/UX Design System for Admin Portal

- **Warna & Tema:**
  - Primary: Deep Navy `#1E3A8A` (Blue-900) & Royal Blue `#2563EB` (Blue-600) selaras dengan identitas SMAN 1 Tarik.
  - Surface: Slate-50 `#F8FAFC` untuk background canvas, White `#FFFFFF` untuk cards & modals.
  - Border & Dividers: Slate-200 `#E2E8F0`.
  - Accent Actions: Emerald-600 untuk Create/Save, Rose-600 untuk Delete/Danger, Amber-500 untuk Warning.
- **Sidebar:**
  - Desktop: Lebar tetap `w-64`, sticky sidebar dengan logo sekolah dan indikator status sesi.
  - Mobile: Slide-over drawer yang dapat dipicu oleh tombol hamburger di header.
- **Form Controls:**
  - Standardized input fields dengan label jelas, validation feedback inline, dan focus ring yang kontras.
  - Reusable `ImageUploader` dengan drag-and-drop zone, progress upload bar, dan fallback preview.

---

## 5. Data Flow & Reusability

- **State Management:** React 19 hooks (`useState`, `useEffect`, `useTransition`) untuk penanganan form dan feedback instan.
- **Notification Feedback:** Notifikasi toast ringan untuk konfirmasi sukses (*"Berita berhasil diterbitkan"*, *"Data guru diperbarui"*).
- **Cache Revalidation:** Setelah mutasi data berhasil di admin, panggil router refresh agar list lokal langsung tersinkronisasi.

---

## 6. Verification & Acceptance Criteria

1. **Auth Test:** Mencoba membuka `/admin` saat belum login langsung diarahkan ke `/admin/login`. Login dengan kredensial valid berhasil masuk ke `/admin`.
2. **Logout Test:** Klik tombol logout membersihkan sesi dan me-redirect pengguna kembali ke `/admin/login`.
3. **CRUD Test:**
   - Tambah berita baru dengan gambar ter-upload -> Berita langsung muncul di `/admin/berita` dan halaman publik `/berita`.
   - Edit salah satu agenda -> Perubahan langsung tercermin di web publik.
   - Hapus salah satu foto galeri -> Dialog konfirmasi muncul, setelah diiyakan baris terhapus dari Supabase.
4. **Responsive Test:** Seluruh menu dan tombol dapat dioperasikan dengan nyaman pada layar ponsel (viewport 375px).
5. **Build Test:** `npm run build` berhasil (exit code 0) dan bebas error TypeScript.
