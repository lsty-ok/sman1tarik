// ============================================================
// SITE DATA — SMAN 1 Tarik Sidoarjo
// ------------------------------------------------------------
// Simulated CMS. Semua konten terpusat di sini agar mudah
// dipindahkan ke database (Supabase) pada Fase 2.
//
// DATA DIAMBIL DARI RISET INTERNET (sman1tarik.sch.id & data
// kemendikdasmen) — BUKAN data fiktif.
// ============================================================

export const siteInfo = {
  nama: "SMA Negeri 1 Tarik",
  npsn: "20501704",
  slogan: "UNGGUL PRESTASI, LUHUR BUDI PEKERTI",
  visi: "UNGGUL DALAM IMTAQ, KREATIFITAS, PRESTASI, DAN BUDAYA MUTU",
  alamat: "Jl. Raya Janti, Kec. Tarik, Kab. Sidoarjo, Jawa Timur 61265",
  telepon: ["(031) 70966113", "(031) 8983814"],
  email: "sman1tarik@yahoo.co.id",
  website: "https://sman1tarik.sch.id",
  sistemPenyelenggaraan: "Sehari penuh (Full Day) · 5 hari kerja",
  didirikan: "4 September 2007",
  akreditasi: "A",
  noSkAkreditasi: "164/BAP-S/M/SK/XI/2017",
  luasTanah: "14.649 m²",
  sosial: {
    instagram: "https://www.instagram.com/sman1tarik/",
    youtube: "https://www.youtube.com/channel/UCDvJCx_13xnQTmKRDaHsRlA",
    facebook: "https://web.facebook.com/sman1tarik",
  },
  // Nomor WhatsApp untuk tombol melayang (dari data sekolah).
  whatsapp: "628318983814",
};

export const stats = {
  siswa: "1.231",
  guru: "67",
  akreditasi: "A",
  luasTanah: "14.649 m²",
};

// Keunggulan / alasan memilih sekolah (Zona 2 - Branding)
export const keunggulan = [
  {
    icon: "Award",
    title: "Terakreditasi A",
    desc: "Terakreditasi A oleh BAN-S/M sejak 2017 — jaminan mutu pendidikan yang terverifikasi nasional.",
  },
  {
    icon: "BookOpen",
    title: "Kurikulum Merdeka",
    desc: "Menerapkan Kurikulum Merdeka dengan pembelajaran berbasis projek dan Profil Pelajar Pancasila.",
  },
  {
    icon: "Users",
    title: "Guru Berpengalaman",
    desc: "Didukung 67 tenaga pendidik yang kompeten dan berkomitmen membimbing prestasi siswa.",
  },
  {
    icon: "MapPin",
    title: "Lokasi Strategis",
    desc: "Berada di Jl. Raya Janti, mudah dijangkau dari berbagai arah di wilayah Sidoarjo selatan.",
  },
];

// Sambutan Kepala Sekolah (Zona 2). Teks placeholder resmi —
// isi dengan nama & sambutan aktual bila tersedia.
export const sambutan = {
  nama: "Kepala SMA Negeri 1 Tarik",
  jabatan: "Kepala Sekolah",
  foto: "/images/kepala-sekolah.jpg",
  isi: [
    "Selamat datang di website resmi SMA Negeri 1 Tarik. Kami berkomitmen mewujudkan generasi yang unggul dalam imtaq, kreativitas, prestasi, dan budaya mutu sesuai visi sekolah kami.",
    "Melalui Kurikulum Merdeka dan berbagai program unggulan, kami membina siswa tidak hanya dalam bidang akademik, tetapi juga karakter, keterampilan, dan kepedulian terhadap lingkungan. Kami percaya setiap siswa memiliki potensi yang layak untuk dikembangkan secara maksimal.",
  ],
};

// Fasilitas (Zona 3) — berdasarkan data sarana prasarana umum
export const fasilitas = [
  { title: "Ruang Kelas yang Nyaman", image: "/images/fasilitas-kelas.jpg" },
  { title: "Perpustakaan", image: "/images/fasilitas-perpus.jpg" },
  { title: "Laboratorium IPA", image: "/images/fasilitas-ipa.jpg" },
  { title: "Laboratorium Komputer", image: "/images/fasilitas-komputer.jpg" },
  { title: "Lapangan Olahraga", image: "/images/fasilitas-lapangan.jpg" },
  { title: "Musholla", image: "/images/fasilitas-musholla.jpg" },
];

// Program Unggulan (Zona 3)
export const programUnggulan = [
  {
    icon: "FlaskConical",
    title: "Kelas Sains & Riset",
    desc: "Fokus pengembangan kompetensi sains dengan pembinaan olimpiade dan karya ilmiah remaja.",
  },
  {
    icon: "Microscope",
    title: "Kegiatan P5 (Projek)",
    desc: "Projek Penguatan Profil Pelajar Pancasila yang aplikatif dan berorientasi pada isu nyata.",
  },
  {
    icon: "BookOpenCheck",
    title: "Bimbingan PTN",
    desc: "Pendampingan intensif persiapan SNBP & SNBT; terbukti siswa diterima di PTN jalur SNBP.",
  },
  {
    icon: "Landmark",
    title: "Lingkungan Berbudaya",
    desc: "Pembiasaan nilai religius, kejujuran, dan budaya mutu dalam kehidupan sehari-hari di sekolah.",
  },
];

// Ekstrakurikuler (Zona 3) — dari riset (fspkep.id)
export const ekskul = [
  { icon: "Compass", name: "Pramuka" },
  { icon: "Users", name: "OSIS" },
  { icon: "Flag", name: "Paskibra" },
  { icon: "HeartPulse", name: "PMR" },
  { icon: "Lightbulb", name: "Karya Ilmiah Remaja" },
  { icon: "Palette", name: "Seni & Budaya" },
  { icon: "Dumbbell", name: "Olahraga" },
  { icon: "Mic2", name: "Madigstar (Media Digital)" },
];

// Prestasi (Zona 3) — dari berita resmi website sekolah
export const prestasi = [
  {
    id: 1,
    title: "Siswa Diterima di PTN Jalur SNBP 2025",
    desc: "Selamat kepada siswa-siswi SMAN 1 Tarik yang dinyatakan diterima di Perguruan Tinggi Negeri melalui jalur SNBP tahun 2025.",
    tahun: "2025",
    kategori: "Akademik",
    image: "/images/prestasi-snbp.jpg",
  },
  {
    id: 2,
    title: "Juara Menulis Cerpen",
    desc: "Siswi SMAN 1 Tarik meraih juara dalam lomba menulis cerpen tingkat regional.",
    tahun: "2020",
    kategori: "Non-Akademik",
    image: "/images/prestasi-cerpen.jpg",
  },
  {
    id: 3,
    title: "Prestasi Karya Tulis Ilmiah",
    desc: "Perwakilan siswa berprestasi dalam perlombaan Karya Tulis Ilmiah tingkat regional.",
    tahun: "2015",
    kategori: "Akademik",
    image: "/images/prestasi-kti.jpg",
  },
];

// Berita & Agenda (Zona 4) — judul asli dari website sekolah
export const berita = [
  {
    id: 1,
    title: "Kelulusan Peserta Didik SMA Negeri 1 Tarik Tahun 2025-2026",
    date: "2026-05-04",
    category: "Pengumuman",
    excerpt:
      "SK Kelulusan SMAN 1 Tarik Tahun 2026 telah diterbitkan. Seluruh peserta didik dinyatakan lulus.",
    image: "/images/berita-kelulusan.jpg",
  },
  {
    id: 2,
    title: "Call For Alumni SMAN 1 Tarik",
    date: "2025-08-26",
    category: "Alumni",
    excerpt:
      "Dihimbau kepada seluruh alumni yang belum mengambil ijazah agar segera hadir ke sekolah. Pengambilan ijazah tidak dipungut biaya.",
    image: "/images/berita-alumni.jpg",
  },
  {
    id: 3,
    title: "Daftar Siswa Diterima di PTN Jalur SNBP Tahun 2025",
    date: "2025-03-20",
    category: "Prestasi",
    excerpt:
      "Kami ucapkan selamat dan sukses kepada siswa-siswi yang dinyatakan diterima di Perguruan Tinggi Negeri melalui jalur SNBP.",
    image: "/images/berita-snbp.jpg",
  },
  {
    id: 4,
    title: "Jadwal Pelaksanaan SPMB SMA Provinsi Jawa Timur 2025",
    date: "2025-05-08",
    category: "Pendaftaran",
    excerpt:
      "Informasi jadwal pelaksanaan SPMB (sebelumnya PPDB) SMA Provinsi Jawa Timur tahun 2025.",
    image: "/images/berita-spmb.jpg",
  },
];

// Agenda mendatang (Zona 4)
export const agenda = [
  {
    id: 1,
    title: "Class Meeting Semester Ganjil",
    date: "Juni 2026",
    desc: "Kegiatan class meeting antar kelas untuk menyalurkan minat dan bakat siswa.",
  },
  {
    id: 2,
    title: "Pengambilan Ijazah Alumni",
    date: "Agustus 2026",
    desc: "Jadwal pengambilan ijazah bagi alumni yang belum mengambilnya di sekolah.",
  },
];

// Menu navigasi utama
export const navMenu = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    href: "#",
    children: [
      { label: "Visi & Misi", href: "/profil/visi-misi" },
      { label: "Identitas Sekolah", href: "/profil/identitas" },
      { label: "Guru & Staf", href: "/profil/guru" },
      { label: "Sambutan Kepala Sekolah", href: "/profil/sambutan" },
    ],
  },
  { label: "PPDB", href: "/ppdb" },
  {
    label: "Akademik",
    href: "#",
    children: [
      { label: "Kurikulum", href: "/akademik/kurikulum" },
      { label: "Program Unggulan", href: "/akademik/program-unggulan" },
      { label: "Mata Pelajaran", href: "/akademik/mata-pelajaran" },
      { label: "Jadwal", href: "/akademik/jadwal" },
    ],
  },
  {
    label: "Kesiswaan",
    href: "#",
    children: [
      { label: "Ekstrakurikuler", href: "/kesiswaan/ekskul" },
      { label: "Organisasi Siswa", href: "/kesiswaan/organisasi" },
      { label: "Prestasi", href: "/kesiswaan/prestasi" },
      { label: "Kegiatan Siswa", href: "/kesiswaan/kegiatan" },
    ],
  },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

// Galeri preview (Zona 3) — potongan gambar slider sekolah
export const galeri = [
  { src: "/images/galeri-1.jpg", alt: "Kegiatan sekolah SMAN 1 Tarik" },
  { src: "/images/galeri-2.jpg", alt: "Kegiatan sekolah SMAN 1 Tarik" },
  { src: "/images/galeri-3.jpg", alt: "Kegiatan sekolah SMAN 1 Tarik" },
  { src: "/images/galeri-4.jpg", alt: "Kegiatan sekolah SMAN 1 Tarik" },
  { src: "/images/galeri-5.jpg", alt: "Kegiatan sekolah SMAN 1 Tarik" },
];

// Quick Info PPDB (Zona 1)
export const ppdbInfo = [
  {
    title: "Pendaftaran",
    desc: "Informasi jadwal dan alur pendaftaran siswa baru.",
    href: "/ppdb",
  },
  {
    title: "Persyaratan",
    desc: "Dokumen dan syarat yang harus disiapkan calon siswa.",
    href: "/ppdb/persyaratan",
  },
  {
    title: "Jalur Masuk",
    desc: "Jalur zonasi, afirmasi, prestasi, dan perpindahan tugas.",
    href: "/ppdb/jalur",
  },
  {
    title: "Brosur",
    desc: "Unduh brosur & juknis SPMB untuk panduan lengkap.",
    href: "/ppdb/brosur",
  },
  {
    title: "FAQ",
    desc: "Pertanyaan yang sering diajukan seputar PPDB.",
    href: "/ppdb/faq",
  },
];
