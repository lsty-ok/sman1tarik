# SMAN 1 Tarik Reborn Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun ulang website publik SMAN 1 Tarik menggunakan arsitektur modern (Next.js) dengan tampilan 4-Zona yang dioptimalkan untuk PPDB dan *School Branding*, didukung data statis/riset terstruktur.

**Architecture:** Frontend Next.js (App Router) dibangun statis di awal (SSG/statis) dengan komponen UI dari Shadcn UI dan Tailwind CSS. Data konten sementara disimpan dalam file konstanta (JSON/TS) untuk mensimulasikan database, mempermudah transisi ke CMS di Fase 2.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS, Shadcn UI, TypeScript, Lucide React (Icons).

## Global Constraints
- Framework: Next.js App Router (folder `src/app/`).
- Styling: Tailwind CSS & Shadcn UI.
- Semua data konten (Angka, Berita, Fasilitas) harus berada di file terpisah (`src/data/`) untuk mensimulasikan CMS.
- Tidak ada data *Lorem Ipsum* atau angka palsu (semua disiapkan berdasarkan format data riset).
- Floating WhatsApp button wajib diimplementasikan secara global.

---

### Task 1: Setup Proyek Next.js, Tailwind, & Shadcn UI

**Files:**
- Create/Modify: `package.json`, `tailwind.config.ts`, `components.json`, `src/app/layout.tsx`, `src/app/globals.css`

**Interfaces:**
- Produces: Base project structure ready for UI component integration.

- [ ] **Step 1: Inisialisasi Next.js**
Jalankan command setup (jika belum ada): `npx create-next-app@latest website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`

- [ ] **Step 2: Inisialisasi Shadcn UI**
Masuk ke folder `website` dan inisialisasi shadcn: `npx shadcn-ui@latest init` (pilih gaya default/slate).

- [ ] **Step 3: Sesuaikan layout.tsx**
Tambahkan metadata dasar SMAN 1 Tarik di `src/app/layout.tsx`.
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SMAN 1 Tarik | Unggul Prestasi, Luhur Budi Pekerti',
  description: 'Website Resmi SMA Negeri 1 Tarik Sidoarjo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "chore: setup nextjs, tailwind, and shadcn"
```

---

### Task 2: Setup Struktur Data & Aset (Simulasi CMS)

**Files:**
- Create: `src/data/siteData.ts`

**Interfaces:**
- Produces: `siteData` object yang berisi struktur data untuk PPDB, Fasilitas, Ekskul, Prestasi, dan Berita yang akan di-*consume* oleh komponen UI.

- [ ] **Step 1: Buat struktur data**
Buat file `src/data/siteData.ts` yang berisi kerangka data riset.
```typescript
export const siteData = {
  stats: {
    siswaAktif: "1.000+",
    guruTendik: "70+",
    prestasi: "50+",
    alumni: "10.000+",
  },
  fasilitas: [
    { title: "Perpustakaan", image: "/images/fasilitas-perpus.jpg" },
    { title: "Lab Komputer", image: "/images/fasilitas-komputer.jpg" },
    { title: "Lab IPA", image: "/images/fasilitas-ipa.jpg" },
    { title: "Lapangan Olahraga", image: "/images/fasilitas-lapangan.jpg" },
  ],
  berita: [
    { id: 1, title: "Pendaftaran PPDB Dibuka", date: "2024-05-01", category: "Pengumuman", image: "/images/berita-1.jpg" },
    { id: 2, title: "Siswa SMAN 1 Tarik Juara Olimpiade", date: "2024-04-15", category: "Prestasi", image: "/images/berita-2.jpg" },
    { id: 3, title: "Kegiatan P5 Berjalan Lancar", date: "2024-03-20", category: "Akademik", image: "/images/berita-3.jpg" },
  ]
};
```
*(Catatan untuk developer: placeholder gambar perlu ditambahkan nanti di folder `public/images/`)*

- [ ] **Step 2: Commit**
```bash
git add src/data/siteData.ts
git commit -m "feat: add simulated cms data structure"
```

---

### Task 3: Komponen Global (Navbar, Footer, & Floating WA)

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/FloatingWhatsApp.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `layout.tsx` akan me-*wrap* `children` dengan Navbar dan Footer.
- Produces: `<Navbar />`, `<Footer />`, `<FloatingWhatsApp />`

- [ ] **Step 1: Install & Buat Floating WhatsApp**
Install icon: `npm install lucide-react`
Buat `src/components/layout/FloatingWhatsApp.tsx`:
```tsx
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20mendapatkan%20informasi%20mengenai%20PPDB%20SMAN%201%20Tarik." 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center gap-2"
    >
      <MessageCircle size={24} />
      <span className="hidden md:inline font-semibold">Tanya PPDB</span>
    </a>
  );
}
```

- [ ] **Step 2: Buat Navbar Sederhana**
Buat `src/components/layout/Navbar.tsx` dengan struktur menu yang disepakati:
*Beranda | Profil | PPDB | Akademik | Kesiswaan | Fasilitas | Galeri | Kontak*

- [ ] **Step 3: Buat Footer Sederhana**
Buat `src/components/layout/Footer.tsx`.

- [ ] **Step 4: Integrasi ke Root Layout**
Update `src/app/layout.tsx` untuk memasukkan komponen tersebut.
```tsx
// ... imports
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
```

- [ ] **Step 5: Commit**
```bash
git add .
git commit -m "feat: implement global layout components"
```

---

### Task 4: Membangun Zona 1 - First Impression (Hero & PPDB)

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/QuickInfoPPDB.tsx`

**Interfaces:**
- Produces: Komponen `<Hero />` dan `<QuickInfoPPDB />` untuk dipanggil di `page.tsx`.

- [ ] **Step 1: Buat Komponen Hero**
Buat hero statis (tanpa carousel) dengan slogan.

- [ ] **Step 2: Buat Komponen QuickInfo PPDB**
Tampilkan grid card untuk: Jadwal, Persyaratan, Jalur, Cara Daftar, Brosur, FAQ.

- [ ] **Step 3: Pasang di Homepage**
Update `src/app/page.tsx`:
```tsx
import Hero from '@/components/home/Hero';
import QuickInfoPPDB from '@/components/home/QuickInfoPPDB';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <section id="zona-1">
        <Hero />
        <QuickInfoPPDB />
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "feat: implement homepage zone 1 (hero and ppdb)"
```

---

### Task 5: Membangun Zona 2 - Trust (Branding, Sambutan, Angka)

**Files:**
- Create: `src/components/home/Branding.tsx`
- Create: `src/components/home/Sambutan.tsx`
- Create: `src/components/home/Stats.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `siteData.stats` pada `Stats.tsx`.

- [ ] **Step 1: Buat Komponen Branding & Sambutan**
Buat `Branding.tsx` (Mengapa memilih SMAN 1 Tarik) dan `Sambutan.tsx` (Foto + teks sambutan Kepsek).

- [ ] **Step 2: Buat Komponen Statistik**
Buat `Stats.tsx` yang me-render data dari `siteData.stats`.

- [ ] **Step 3: Tambahkan ke Homepage**
Update `src/app/page.tsx` untuk memanggil Zona 2.

- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "feat: implement homepage zone 2 (trust)"
```

---

### Task 6: Membangun Zona 3 - School Experience (Fasilitas, Ekskul, Prestasi, Galeri)

**Files:**
- Create: `src/components/home/Fasilitas.tsx`
- Create: `src/components/home/Ekskul.tsx`
- Create: `src/components/home/Prestasi.tsx`
- Create: `src/components/home/GaleriPreview.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `siteData.fasilitas` pada `Fasilitas.tsx`.

- [ ] **Step 1: Buat Komponen**
Sesuai arahan: Fasilitas (Grid), Ekskul (Icon/Grid), Prestasi (Featured card), Galeri (Masonry 4-6 foto).

- [ ] **Step 2: Tambahkan ke Homepage**
Update `src/app/page.tsx` untuk memanggil Zona 3 secara berurutan.

- [ ] **Step 3: Commit**
```bash
git add .
git commit -m "feat: implement homepage zone 3 (school experience)"
```

---

### Task 7: Membangun Zona 4 - Information & Action (Berita & CTA)

**Files:**
- Create: `src/components/home/BeritaAgenda.tsx`
- Create: `src/components/home/CTAPenutup.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `siteData.berita` pada `BeritaAgenda.tsx`.

- [ ] **Step 1: Buat Komponen Berita & CTA**
Buat layout grid untuk berita terbaru, dan blok CTA besar di bagian bawah.

- [ ] **Step 2: Finalisasi Homepage**
Tambahkan komponen ini ke `src/app/page.tsx` sebagai section terakhir sebelum footer.

- [ ] **Step 3: Commit**
```bash
git add .
git commit -m "feat: implement homepage zone 4 and finalize page structure"
```
