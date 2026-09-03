# PRD & Design Spec: SMAN 1 Tarik Reborn

## 1. Project Overview
**Objective:** Merancang ulang dan membangun ulang website SMAN 1 Tarik menjadi aplikasi web modern yang cepat, elegan, dan dilengkapi dengan Sistem Manajemen Konten (CMS) khusus.
**Target Audience:** 
1. Calon Siswa & Orang Tua (Target Utama: PPDB & Kepercayaan)
2. Siswa/Alumni/Wali Murid (Informasi akademik & agenda)
3. Admin/Operator Sekolah (Pengelola CMS)
4. Perekrut/HRD (Penilai portofolio developer)

## 2. Tech Stack Architecture
- **Frontend & Admin Panel:** Next.js (App Router) + React + Tailwind CSS + Shadcn UI
- **Database & Authentication:** Supabase (PostgreSQL, Supabase Auth)
- **File Storage:** Supabase Storage
- **Deployment:** Vercel

## 3. Data Strategy (Portfolio Context)
Karena ini adalah proyek portofolio tanpa akses ke database asli sekolah:
- Data (Angka statistik, berita, fasilitas, ekstrakurikuler, prestasi, program unggulan) akan **di-seed (dibuat) berdasarkan riset** dari internet tentang SMAN 1 Tarik yang sebenarnya.
- Tidak menggunakan angka "dummy" palsu (seperti Lorem Ipsum) agar terlihat profesional.
- Data direpresentasikan seolah-olah ditarik dari database asli (CMS-ready).

## 4. Homepage Architecture (4 Zones)

### 🟦 ZONA 1 — FIRST IMPRESSION ("Siapa kalian dan bagaimana saya bisa masuk?")
- **Header / Navbar (Fixed)**
  - Struktur: `Beranda | Profil | PPDB | Akademik | Kesiswaan | Fasilitas | Galeri | Kontak`
- **Hero Section**
  - Gambar statis berkualitas tinggi (bukan carousel).
  - Slogan: "UNGGUL PRESTASI, LUHUR BUDI PEKERTI".
- **Quick Info / PPDB (Highlight)**
  - Link/Cards: Jadwal Pendaftaran, Persyaratan, Jalur, Cara Mendaftar, Brosur, FAQ.

### 🟩 ZONA 2 — TRUST ("Kenapa saya harus percaya sekolah ini?")
- **Branding & Keunggulan**
  - Ikon/poin: Mengapa Memilih SMAN 1 Tarik?
- **Sambutan Kepala Sekolah**
  - Foto dan pesan singkat.
- **Angka Kita (Statistik Dinamis)**
  - Diambil dari database (hasil riset): Misal, `X+ Prestasi Diraih`, `X+ Guru & Tendik`.

### 🟨 ZONA 3 — SCHOOL EXPERIENCE ("Seperti apa kehidupan saya kalau sekolah di sini?")
- **Fasilitas**
  - Layout: Grid / Horizontal Scroll (Perpustakaan, Lab, Lapangan, dll).
- **Program Unggulan**
  - Layout: Ringkas, menampilkan program spesifik SMAN 1 Tarik.
- **Ekstrakurikuler**
  - Layout: Icon/Card Grid.
- **Prestasi**
  - Layout: Featured card + pagination (Pemisahan visual yang jelas dari ekskul).
- **Galeri Preview**
  - Layout: Masonry grid (4-6 foto) + Tombol "Lihat Semua".

### 🟥 ZONA 4 — INFORMATION & ACTION ("Bagaimana saya mendapatkan informasi selanjutnya?")
- **Berita & Agenda**
  - Kiri: 3 Berita terbaru. Kanan: Agenda/Jadwal terdekat.
- **CTA Penutup**
  - "Tertarik Mengenal SMAN 1 Tarik?" -> Tombol ke Profil & PPDB.
- **Footer**
  - Detail kontak, alamat, sitemap.

**Komponen Global:**
- **Floating WhatsApp Button** (Fixed bottom-right).

## 5. Admin Dashboard (CMS Backend)
- Sistem Login (Supabase Auth).
- Manajemen Artikel (CRUD).
- Manajemen Kategori.
- (Opsional/V2) Manajemen Statistik "Angka Kita" & Data Fasilitas/Ekskul.

## 6. Security
- Supabase Row Level Security (RLS).
- Environment Variables tersembunyi.
