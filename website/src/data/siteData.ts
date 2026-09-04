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
    // @sman1tarik = akun dengan embed di website resmi (terverifikasi).
    // @sman1tarik.official & akun ekskul (osismpk/duta/atletik) tidak
    // terverifikasi keberadaannya dari riset internet — dihindari.
    instagram: "https://www.instagram.com/sman1tarik/",
    // Handle YouTube sesuai permintaan pemilik (www.youtube.com/@smanegeri1tariksidoarjo240).
    youtube: "https://www.youtube.com/@smanegeri1tariksidoarjo240",
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

// Sambutan Kepala Sekolah (Zona 2) — data LIVE diambil dari Supabase
// (getSambutan di src/lib/data.ts). Nilai di bawah hanya struktur
// referensi; kepala sekolah saat ini: Muhammad Fadloli, S.Pd., M.M.
export const sambutan = {
  nama: "Muhammad Fadloli, S.Pd., M.M.",
  jabatan: "Kepala Sekolah",
  foto: "/images/kepala-sekolah.jpg",
  isi: [
    "Selamat datang di website SMA Negeri 1 Tarik. Kami berkomitmen mewujudkan generasi yang unggul dalam imtaq, kreativitas, prestasi, dan budaya mutu sesuai visi sekolah kami.",
    "Melalui Kurikulum Merdeka dan berbagai program unggulan, kami membina siswa tidak hanya dalam bidang akademik, tetapi juga karakter, keterampilan, dan kepedulian terhadap lingkungan. Kami percaya setiap siswa memiliki potensi yang layak untuk dikembangkan secara maksimal.",
    "Kepada para siswa, saya berpesan agar terus membangun jiwa literasi dan entrepreneurship di era digital, serta menjunjung integritas sebagai \"duta karakter\" sekolah di tengah masyarakat.",
  ],
};

// Fasilitas (Zona 3) — data LIVE diambil dari Supabase (getFasilitas di
// src/lib/data.ts); nilai di bawah referensi struktur saja. Fasilitas
// tanpa foto nyata memakai ilustrasi SVG buatan internal.
export const fasilitas = [
  { title: "Ruang Kelas yang Nyaman", image: "/images/fasilitas-kelas.jpg", hasImage: true },
  { title: "Perpustakaan", image: "/images/fasilitas-perpus.svg", hasImage: true },
  { title: "Laboratorium IPA", image: "/images/fasilitas-ipa.svg", hasImage: true },
  { title: "Laboratorium Komputer", image: "/images/fasilitas-komputer.svg", hasImage: true },
  { title: "Lapangan Olahraga", image: "/images/fasilitas-lapangan.jpg", hasImage: true },
  { title: "Musholla", image: "/images/fasilitas-musholla.svg", hasImage: true },
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
    content: [
      "SMA Negeri 1 Tarik telah menerbitkan Surat Keputusan (SK) Kelulusan Peserta Didik Tahun Pelajaran 2025-2026. Berdasarkan hasil rapat pleno dewan guru, seluruh peserta didik dinyatakan LULUS.",
      "Pengumuman kelulusan dapat dilihat secara daring maupun papan pengumuman sekolah. Peserta didik diharapkan membaca petunjuk pengambilan SKL dan dokumen kelulusan lainnya pada tautan yang telah disediakan.",
      "Kepada seluruh siswa yang dinyatakan lulus, kami ucapkan selamat dan sukses. Teruslah berkarya dan mengharumkan nama sekolah di jenjang pendidikan maupun dunia kerja selanjutnya.",
    ],
  },
  {
    id: 2,
    title: "Call For Alumni SMAN 1 Tarik",
    date: "2025-08-26",
    category: "Alumni",
    excerpt:
      "Dihimbau kepada seluruh alumni yang belum mengambil ijazah agar segera hadir ke sekolah. Pengambilan ijazah tidak dipungut biaya.",
    image: "/images/berita-alumni.jpg",
    content: [
      "Dihimbau kepada seluruh alumni SMA Negeri 1 Tarik yang belum mengambil ijazah untuk segera hadir ke sekolah pada jam operasional.",
      "Pengambilan ijazah tidak dipungut biaya sepeser pun. Alumni diharapkan membawa dokumen identitas diri dan mengikuti prosedur yang diberlakukan oleh tata usaha sekolah.",
      "Untuk informasi lebih lanjut mengenai jadwal dan tata cara pengambilan ijazah, silakan menghubungi bagian tata usaha SMA Negeri 1 Tarik.",
    ],
  },
  {
    id: 3,
    title: "Daftar Siswa Diterima di PTN Jalur SNBP Tahun 2025",
    date: "2025-03-20",
    category: "Prestasi",
    excerpt:
      "Kami ucapkan selamat dan sukses kepada siswa-siswi yang dinyatakan diterima di Perguruan Tinggi Negeri melalui jalur SNBP.",
    image: "/images/berita-snbp.jpg",
    content: [
      "Prestasi membanggakan kembali ditorehkan oleh siswa-siswi SMA Negeri 1 Tarik yang dinyatakan diterima di Perguruan Tinggi Negeri melalui jalur Seleksi Nasional Berdasarkan Prestasi (SNBP) tahun 2025.",
      "Keberhasilan ini merupakan buah dari prestasi akademik, kedisiplinan, dan dukungan penuh dari para guru serta orang tua selama proses belajar mengajar.",
      "Kami mengucapkan selamat dan sukses kepada seluruh siswa yang diterima. Semoga menjadi motivasi bagi adik-adik kelas untuk terus berprestasi.",
    ],
  },
  {
    id: 4,
    title: "Jadwal Pelaksanaan SPMB SMA Provinsi Jawa Timur 2025",
    date: "2025-05-08",
    category: "Pendaftaran",
    excerpt:
      "Informasi jadwal pelaksanaan SPMB (sebelumnya PPDB) SMA Provinsi Jawa Timur tahun 2025.",
    image: "/images/berita-spmb.jpg",
    content: [
      "Seleksi Penerimaan Murid Baru (SPMB), yang sebelumnya dikenal sebagai PPDB, untuk jenjang SMA Provinsi Jawa Timur tahun 2025 telah memasuki tahap pelaksanaan.",
      "Calon peserta didik diharapkan memantau jadwal resmi yang ditetapkan oleh Dinas Pendidikan Provinsi Jawa Timur serta menyiapkan seluruh dokumen persyaratan dengan baik.",
      "Informasi lebih lanjut mengenai jalur, jadwal, dan alur pendaftaran dapat dilihat pada halaman PPDB/SPMB di website ini.",
    ],
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

// Galeri preview (Zona 3) — foto-foto asli SMA Negeri 1 Tarik
export const galeri = [
  {
    src: "/images/galeri-1.jpg",
    alt: "Taman depan dengan papan Keren Tanpa Narkoba",
  },
  {
    src: "/images/galeri-2.jpg",
    alt: "Pintu gerbang dan spanduk selamat datang",
  },
  {
    src: "/images/galeri-3.jpg",
    alt: "Halaman / plaza sekolah dengan taman",
  },
  {
    src: "/images/galeri-4.jpg",
    alt: "Gedung kelas dengan selasar dan pepohonan",
  },
  {
    src: "/images/galeri-5.jpg",
    alt: "Selasar samping gedung dengan hiasan umbul-umbul",
  },
];

// Quick Info PPDB (Zona 1)
export const ppdbInfo = [
  {
    icon: "FileText",
    title: "Pendaftaran",
    desc: "Informasi jadwal dan alur pendaftaran siswa baru.",
    href: "/ppdb",
  },
  {
    icon: "BadgeCheck",
    title: "Persyaratan",
    desc: "Dokumen dan syarat yang harus disiapkan calon siswa.",
    href: "/ppdb/persyaratan",
  },
  {
    icon: "Map",
    title: "Jalur Masuk",
    desc: "Jalur zonasi, afirmasi, prestasi, dan perpindahan tugas.",
    href: "/ppdb/jalur",
  },
  {
    icon: "Megaphone",
    title: "Brosur",
    desc: "Unduh brosur & juknis SPMB untuk panduan lengkap.",
    href: "/ppdb/brosur",
  },
  {
    icon: "HelpCircle",
    title: "FAQ",
    desc: "Pertanyaan yang sering diajukan seputar PPDB.",
    href: "/ppdb/faq",
  },
];

// Alur pendaftaran SPMB (umum, mengikuti ketentuan Dinas Pendidikan
// Provinsi Jawa Timur)
export const alurPendaftaran = [
  "Menyiapkan seluruh dokumen persyaratan yang telah ditentukan.",
  "Memantau jadwal resmi SPMB yang diumumkan oleh Dinas Pendidikan Provinsi Jawa Timur.",
  "Melakukan pendaftaran melalui laman resmi SPMB pada periode pendaftaran.",
  "Memilih sekolah dan jalur sesuai dengan ketentuan yang berlaku.",
  "Menunggu hasil seleksi yang diumumkan sesuai jadwal resmi.",
  "Melakukan daftar ulang bagi calon siswa yang dinyatakan diterima.",
];

// Syarat / dokumen umum SPMB
export const ppdbPersyaratan = [
  "Ijazah atau Surat Keterangan Lulus (SKL) SMP/MTs sederajat.",
  "Akta Kelahiran calon peserta didik.",
  "Kartu Keluarga (KK) yang masih berlaku.",
  "Kartu Identitas (KTP/KK) orang tua atau wali.",
  "Dokumen pendukung sesuai jalur pendaftaran yang dipilih (misal: sertifikat prestasi, SK pindah tugas, dll).",
];

// Jalur masuk SPMB satu pintu (umum level provinsi)
export const ppdbJalur = [
  {
    nama: "Jalur Domisili (Zonasi)",
    desc: "Diperuntukkan bagi calon peserta didik berdasarkan jarak domisili tempat tinggal ke sekolah, sesuai dengan ketentuan zonasi.",
  },
  {
    nama: "Jalur Afirmasi",
    desc: "Diperuntukkan bagi calon peserta didik dari keluarga ekonomi tidak mampu dan/atau penyandang disabilitas sesuai ketentuan.",
  },
  {
    nama: "Jalur Prestasi",
    desc: "Diperuntukkan bagi calon peserta didik dengan prestasi akademik maupun non-akademik yang dibuktikan dengan sertifikat/piagam.",
  },
  {
    nama: "Jalur Perpindahan Tugas Orang Tua/Wali",
    desc: "Diperuntukkan bagi calon peserta didik yang mengikuti perpindahan tugas orang tua/wali antar daerah.",
  },
];

// FAQ seputar PPDB/SPMB
export const ppdbFaq = [
  {
    q: "Apa perbedaan PPDB dan SPMB?",
    a: "SPMB (Seleksi Penerimaan Murid Baru) adalah istilah terbaru yang menggantikan PPDB untuk jenjang yang dikelola oleh pemerintah provinsi, termasuk SMA di Jawa Timur. Secara prinsip, keduanya adalah mekanisme penerimaan murid baru yang berbasis domisili, afirmasi, prestasi, dan perpindahan tugas.",
  },
  {
    q: "Bagaimana cara mengetahui jadwal pendaftaran?",
    a: "Jadwal resmi SPMB diumumkan oleh Dinas Pendidikan Provinsi Jawa Timur melalui laman resminya. Pantau pengumuman resmi dan hubungi bagian tata usaha sekolah untuk informasi lebih lanjut.",
  },
  {
    q: "Apakah pendaftaran dipungut biaya?",
    a: "Tidak. Pelaksanaan SPMB diselenggarakan tanpa dipungut biaya sepeser pun. Waspadai pihak-pihak yang meminta pungutan terkait penerimaan murid baru.",
  },
  {
    q: "Dokumen apa saja yang harus disiapkan?",
    a: "Dokumen pokok meliputi ijazah/SKL, akta kelahiran, kartu keluarga, dan identitas orang tua/wali, serta dokumen pendukung sesuai jalur yang dipilih.",
  },
];

// ============================================================
// SUB-JOB D — DATA PROFIL, AKADEMIK & KESISWAAN (riset)
// ============================================================

// Visi, Misi & Tujuan (sumber: sman1tarik.sch.id/about/visi-dan-misi/)
export const visiMisi = {
  visi: "Unggul dalam IMTAQ, Kreatifitas, Prestasi, dan Budaya Mutu.",
  misi: [
    "Membentuk pribadi peserta didik yang beriman dan bertaqwa melalui kegiatan keagamaan sesuai dengan keyakinan dan kepercayaan masing-masing.",
    "Meningkatkan penumbuhan budi pekerti peserta didik menjadi manusia yang berbudi pekerti luhur melalui kegiatan gerakan literasi sekolah, sekolah ramah anak, sekolah sehat, sekolah aman dan 5S (salam, senyum, salim, sapa, dan santun).",
    "Meningkatkan peran aktif peserta didik dalam kegiatan ekstrakurikuler.",
    "Meningkatkan jiwa kewirausahaan (entrepreneurship) kepada peserta didik dan pelibatan publik.",
    "Meningkatkan kreatifitas pendidik dalam kegiatan pembelajaran aktif.",
    "Meningkatkan kreatifitas kinerja tenaga kependidikan.",
    "Meningkatkan peran aktif peserta didik dalam kegiatan intra dan ekstra kurikuler.",
    "Meningkatkan peran aktif pendidik dan tenaga kependidikan dalam kegiatan intra dan ekstra kurikuler.",
    "Meningkatkan prestasi peserta didik dalam bidang akademik dan non akademik di tingkat regional dan nasional.",
    "Meningkatkan pemahaman potensi diri warga sekolah melalui sikap disiplin dan tertib dalam kehidupannya.",
    "Meningkatkan aktualisasi potensi diri warga sekolah melalui kegiatan kurikuler.",
    "Meningkatkan pengelolaan sekolah yang partisipatif dan demokratif seluruh warga sekolah.",
    "Meningkatkan profesionalisme warga sekolah untuk mewujudkan nilai budaya mutu sekolah.",
  ],
  tujuan: [
    "Mempersiapkan peserta didik yang taat beribadah dan berakhlak mulia.",
    "Membiasakan budaya literasi, ramah anak, sehat, dan aman di lingkungan sekolah.",
    "Menumbuhkan minat, bakat, dan kreativitas peserta didik melalui kegiatan intra dan ekstrakurikuler.",
    "Menanamkan jiwa kewirausahaan peserta didik yang kreatif dan mandiri.",
    "Meningkatkan kompetensi dan profesionalisme pendidik serta tenaga kependidikan.",
    "Mengoptimalkan pengelolaan sumber daya dan fasilitas sekolah secara partisipatif.",
    "Mengantarkan peserta didik meraih prestasi akademik dan non-akademik hingga tingkat regional dan nasional.",
    "Mewujudkan nilai budaya mutu di seluruh aspek kehidupan sekolah.",
  ],
};

// Identitas Sekolah (sumber: Dapodik Kemendikbud & website resmi)
export const identitasSekolah = [
  { label: "Nama Sekolah", value: "SMA Negeri 1 Tarik" },
  { label: "NPSN", value: "20501704" },
  { label: "Status / Bentuk", value: "Negeri / SMA" },
  { label: "Status Kepemilikan", value: "Pemerintah Daerah" },
  { label: "SK Pendirian", value: "188/1069/404.1.1.3/2007" },
  { label: "Tanggal Didirikan", value: "4 September 2007" },
  { label: "Akreditasi", value: "A (SK 164/BAP-S/M/SK/XI/2017)" },
  { label: "Alamat", value: "Jl. Raya Janti, Kec. Tarik, Kab. Sidoarjo, Jawa Timur 61265" },
  { label: "Sistem Penyelenggaraan", value: "Sehari penuh (Full Day) · 5 hari kerja" },
  { label: "Bank", value: "Bank JATIM" },
  { label: "Sertifikasi ISO", value: "Belum Bersertifikat" },
  { label: "Sumber Listrik", value: "PLN · 39.350 Watt" },
];

// Guru & Staf — data LIVE diambil dari Supabase (getGuruStaf di
// src/lib/data.ts). Halaman profil/guru memakai getGuruStaf; daftar
// nama fiktif pindahan dihapus agar tidak menyesatkan.
export const guruStaf = {
  guru: [] as string[],
  staf: [] as string[],
  totalGuru: "67",
  totalSiswa: "1.231",
};

// Kurikulum (sumber: Dapodik & jurnal)
export const kurikulum = {
  nama: "Kurikulum Merdeka",
  deskripsi:
    "SMAN 1 Tarik menerapkan Kurikulum Merdeka dengan pembelajaran Abad 21 yang menekankan prinsip 4C (Critical Thinking, Creativity, Collaboration, and Communication). Guru berperan sebagai fasilitator dan pembelajaran didukung teknologi/digitalisasi di dalam kelas.",
  prinsip: [
    { title: "Berpikir Kritis (Critical Thinking)", desc: "Melatih siswa menganalisis dan mengevaluasi informasi secara mendalam sebelum mengambil keputusan." },
    { title: "Kreativitas (Creativity)", desc: "Mendorong siswa menghasilkan gagasan dan karya baru yang inovatif, termasuk produk digital." },
    { title: "Kolaborasi (Collaboration)", desc: "Membiasakan kerja sama tim dalam projek dan kegiatan pembelajaran kelompok." },
    { title: "Komunikasi (Communication)", desc: "Mengasah kemampuan menyampaikan ide secara efektif baik lisan maupun tulisan." },
  ],
  integritas:
    "Sekolah dikenal menerapkan kebijakan ketat \"zero score\" bagi kecurangan atau menyontek sebagai wujud implementasi nilai integritas dalam proses pembelajaran.",
};

// Program Unggulan Akademik (sumber: Radar Jatim & jurnal)
export const programUnggulanAkademik = [
  {
    icon: "Megaphone",
    title: "Gelar Karya Star Day Project",
    desc: "Implementasi masif P5 dengan program andalan kewirausahaan, di mana siswa membuat inovasi produk digital, mengelola stand digital marketing, dan F&B untuk membangun jiwa entrepreneurship. Dikhususkan pada Fase E.",
  },
  {
    icon: "Moon",
    title: "Keagamaan & Karakter",
    desc: "Program Dhuha berjamaah rutin, Istighotsah mingguan, dan peringatan hari besar Islam. Terdapat juga program siswa magang menjadi penceramah/bilal di musala atau masjid sekitar.",
  },
  {
    icon: "FlaskConical",
    title: "Kelas Sains & Riset",
    desc: "Fokus pengembangan kompetensi sains dengan pembinaan olimpiade dan karya ilmiah remaja.",
  },
  {
    icon: "Landmark",
    title: "Bimbingan PTN",
    desc: "Pendampingan intensif persiapan SNBP & SNBT. Terbukti siswa diterima di PTN melalui jalur SNBP secara konsisten.",
  },
];

// Mata Pelajaran (Kurikulum Merdeka Fase E & F)
export const mataPelajaran = {
  faseE:
    "Kelas X menggunakan Fase E dengan mata pelajaran bersifat umum tanpa penjurusan ketat, mencakup Fisika, Kimia, Biologi, Sosiologi, Ekonomi, Geografi, dan lainnya.",
  faseF:
    "Kelas XI dan XII menggunakan Fase F, di mana siswa memilih mata pelajaran pilihan sesuai minat (kelompok MIPA, IPS, atau Bahasa) di samping mata pelajaran wajib.",
  wajib: [
    "Pendidikan Agama & Budi Pekerti",
    "Pendidikan Pancasila (PKn)",
    "Bahasa Indonesia",
    "Matematika",
    "Bahasa Inggris",
    "Pendidikan Jasmani, Olahraga & Kesehatan (PJOK)",
    "Sejarah",
    "Seni Budaya",
  ],
  pilihan: ["Matematika Lanjut", "Fisika", "Kimia", "Biologi", "Ekonomi", "Sosiologi", "Geografi", "Bahasa & Sastra"],
};

// Jadwal (sumber: Kemdikbud & web)
export const jadwalSekolah = {
  sistem: "Sehari penuh · 5 hari kerja (Senin–Jumat)",
  jamMasuk: "Pukul 06.45 – 07.00 WIB",
  jamPulang: "± Pukul 15.30 WIB (Senin–Jumat)",
  catatan: [
    "Pembelajaran dimulai pagi hari hingga sore hari setiap hari kerja.",
    "Istirahat diselingi pelaksanaan salat Dzuhur dan Ashar berjamaah.",
    "Pada hari Jumat dilaksanakan salat Jumat berjamaah.",
  ],
};

// Ekstrakurikuler detail (sumber: alumni/Radar Jatim)
export const ekskulDetail = [
  { icon: "Flag", name: "Paskibra (KOPASTAR)", desc: "Korps SMAN 1 Tarik, sangat dominan dan sering menjadi juara dalam berbagai lomba Paskibraka." },
  { icon: "Compass", name: "Pramuka", desc: "Diwajibkan dalam kurikulum, berprestasi lintas kota dan menjadi wadah pengembangan kepemimpinan." },
  { icon: "Medal", name: "Atletik", desc: "Ekskul tertua di sekolah, langganan juara pada cabang lari, cakram, lembing, dan lainnya." },
  { icon: "HeartPulse", name: "PMR", desc: "Palang Merah Remaja yang berperan sebagai penolong pertama dan \"dokter cilik\" warga sekolah." },
  { icon: "Trophy", name: "Bola Basket", desc: "Ekskul olahraga favorit yang aktif mengikuti kompetisi antar sekolah." },
  { icon: "Music", name: "Al-Banjari (Al-Musthofa)", desc: "Sering menjadi penampil utama acara sekolah dan pernah menjadi juara 1 se-Mojokerto Sidoarjo." },
  { icon: "ShieldCheck", name: "Karate", desc: "Sangat berprestasi hingga taraf internasional, membawa nama sekolah di kancah nasional maupun global." },
  { icon: "Lightbulb", name: "Karya Ilmiah Remaja", desc: "Wadah pengembangan riset dan karya ilmiah siswa dalam berbagai bidang." },
  { icon: "Mic2", name: "Madigstar (Media Digital)", desc: "Media digital sekolah untuk pengembangan kreativitas konten dan jurnalistik siswa." },
];

// Organisasi Siswa
export const organisasiSiswa = [
  { icon: "Users", name: "OSIS", desc: "Organisasi intra tertinggi sebagai wadah kepemimpinan dan berbagai program kerja siswa." },
  { icon: "Scale", name: "MPK", desc: "Majelis Perwakilan Kelas yang menjadi mitra pengawas OSIS dan sangat berpengaruh dalam program kerja sekolah." },
  { icon: "Star", name: "Duta Sekolah", desc: "Terlibat erat bersama OSIS dan MPK pada gelaran besar sekolah, seperti drama kolosal Islami." },
  { icon: "ShieldAlert", name: "Satgas BNN", desc: "Sekolah pernah dinobatkan 10 besar Sekolah Bebas Narkoba se-Jawa Timur dan memiliki Satgas khusus pengetahuan Narkotika." },
];

// Prestasi detail
export const prestasiDetail = [
  { icon: "GraduationCap", kategori: "Akademik", title: "Siswa Diterima di PTN Jalur SNBP", desc: "Publikasi khusus daftar kelulusan siswa SMAN 1 Tarik yang diterima di PTN melalui jalur SNBP (prestasi nilai rapor).", tahun: "2025" },
  { icon: "Medal", kategori: "Olahraga", title: "Karate Internasional Unesa Rektor Cup II", desc: "Memborong 10 medali (5 emas, 5 perak); 5 siswa memperoleh Golden Ticket masuk Universitas Negeri Surabaya.", tahun: "2024" },
  { icon: "Trophy", kategori: "Olahraga", title: "Porkab Sidoarjo", desc: "Memborong 8 medali (4 emas, 3 perak, 1 perunggu) pada Pekan Olahraga Kabupaten Sidoarjo.", tahun: "2024" },
  { icon: "PenLine", kategori: "Seni/Sastra", title: "Juara Menulis Cerpen", desc: "Siswi SMAN 1 Tarik meraih juara lomba menulis cerpen tingkat regional.", tahun: "—" },
  { icon: "BookOpen", kategori: "Seni/Sastra", title: "Komik Digital \"Si Pembandel\"", desc: "Siswi Mentari Ratnaning merilis komik digital berjudul \"Si Pembandel\" sebagai karya kreatif siswa.", tahun: "—" },
];

// Kegiatan Siswa
export const kegiatanSiswa = [
  { icon: "Megaphone", name: "Gelar Karya Star Day Project", desc: "Eksebisi hasil karya produk digital dan UMKM makanan-minuman dari P5 Kewirausahaan." },
  { icon: "Moon", name: "Peringatan Hari Besar Islam", desc: "Isra' Mi'raj dan Maulid Nabi dirayakan besar-besaran dengan drama kolosal, lomba Qiroah, Kaligrafi, Vokal Solo Islami, dan Cerita Islam." },
  { icon: "Trophy", name: "Class Meeting", desc: "Acara rutin pasca ujian (STS/SAS) antar kelas untuk menyalurkan minat dan bakat siswa." },
  { icon: "Backpack", name: "Goes to Campus & Industry", desc: "Kegiatan study literasi berupa kunjungan ke kampus dan industri." },
  { icon: "PartyPopper", name: "Kirab Pelepasan Lulusan", desc: "Prosesi wisuda yang diiringi kirab kepala sekolah, tarian Rama-Shinta, dan iringan Gending Kebo Giro untuk lulusan angkatan." },
];
