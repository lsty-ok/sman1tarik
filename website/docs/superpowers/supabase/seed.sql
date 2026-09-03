-- ============================================================
-- SMAN 1 TARIK — Seed data (Fase 2)
-- Isi tabel dari data riset `siteData.ts`. Jalankan setelah schema.sql.
-- ============================================================

-- ============================================================
-- BERITA (dinamis)
-- ============================================================
insert into public.berita (title, date, category, excerpt, image, content) values
('Kelulusan Peserta Didik SMA Negeri 1 Tarik Tahun 2025-2026', '2026-05-04', 'Pengumuman',
 'SK Kelulusan SMAN 1 Tarik Tahun 2026 telah diterbitkan. Seluruh peserta didik dinyatakan lulus.',
 '/images/berita-kelulusan.jpg',
 '["SMA Negeri 1 Tarik telah menerbitkan Surat Keputusan (SK) Kelulusan Peserta Didik Tahun Pelajaran 2025-2026. Berdasarkan hasil rapat pleno dewan guru, seluruh peserta didik dinyatakan LULUS.","Pengumuman kelulusan dapat dilihat secara daring maupun papan pengumuman sekolah. Peserta didik diharapkan membaca petunjuk pengambilan SKL dan dokumen kelulusan lainnya pada tautan yang telah disediakan.","Kepada seluruh siswa yang dinyatakan lulus, kami ucapkan selamat dan sukses. Teruslah berkarya dan mengharumkan nama sekolah di jenjang pendidikan maupun dunia kerja selanjutnya."]'::jsonb),
('Call For Alumni SMAN 1 Tarik', '2025-08-26', 'Alumni',
 'Dihimbau kepada seluruh alumni yang belum mengambil ijazah agar segera hadir ke sekolah. Pengambilan ijazah tidak dipungut biaya.',
 '/images/berita-alumni.jpg',
 '["Dihimbau kepada seluruh alumni SMA Negeri 1 Tarik yang belum mengambil ijazah untuk segera hadir ke sekolah pada jam operasional.","Pengambilan ijazah tidak dipungut biaya sepeser pun. Alumni diharapkan membawa dokumen identitas diri dan mengikuti prosedur yang diberlakukan oleh tata usaha sekolah.","Untuk informasi lebih lanjut mengenai jadwal dan tata cara pengambilan ijazah, silakan menghubungi bagian tata usaha SMA Negeri 1 Tarik."]'::jsonb),
('Daftar Siswa Diterima di PTN Jalur SNBP Tahun 2025', '2025-03-20', 'Prestasi',
 'Kami ucapkan selamat dan sukses kepada siswa-siswi yang dinyatakan diterima di Perguruan Tinggi Negeri melalui jalur SNBP.',
 '/images/berita-snbp.jpg',
 '["Prestasi membanggakan kembali ditorehkan oleh siswa-siswi SMA Negeri 1 Tarik yang dinyatakan diterima di Perguruan Tinggi Negeri melalui jalur Seleksi Nasional Berdasarkan Prestasi (SNBP) tahun 2025.","Keberhasilan ini merupakan buah dari prestasi akademik, kedisiplinan, dan dukungan penuh dari para guru serta orang tua selama proses belajar mengajar.","Kami mengucapkan selamat dan sukses kepada seluruh siswa yang diterima. Semoga menjadi motivasi bagi adik-adik kelas untuk terus berprestasi."]'::jsonb),
('Jadwal Pelaksanaan SPMB SMA Provinsi Jawa Timur 2025', '2025-05-08', 'Pendaftaran',
 'Informasi jadwal pelaksanaan SPMB (sebelumnya PPDB) SMA Provinsi Jawa Timur tahun 2025.',
 '/images/berita-spmb.jpg',
 '["Seleksi Penerimaan Murid Baru (SPMB), yang sebelumnya dikenal sebagai PPDB, untuk jenjang SMA Provinsi Jawa Timur tahun 2025 telah memasuki tahap pelaksanaan.","Calon peserta didik diharapkan memantau jadwal resmi yang ditetapkan oleh Dinas Pendidikan Provinsi Jawa Timur serta menyiapkan seluruh dokumen persyaratan dengan baik.","Informasi lebih lanjut mengenai jalur, jadwal, dan alur pendaftaran dapat dilihat pada halaman PPDB/SPMB di website ini."]'::jsonb);

-- ============================================================
-- AGENDA (dinamis)
-- ============================================================
insert into public.agenda (title, date, descr) values
('Class Meeting Semester Ganjil', 'Juni 2026', 'Kegiatan class meeting antar kelas untuk menyalurkan minat dan bakat siswa.'),
('Pengambilan Ijazah Alumni', 'Agustus 2026', 'Jadwal pengambilan ijazah bagi alumni yang belum mengambilnya di sekolah.');

-- ============================================================
-- PRESTASI (dinamis, home)
-- ============================================================
insert into public.prestasi (title, descr, tahun, kategori, image) values
('Siswa Diterima di PTN Jalur SNBP 2025', 'Selamat kepada siswa-siswi SMAN 1 Tarik yang dinyatakan diterima di Perguruan Tinggi Negeri melalui jalur SNBP tahun 2025.', '2025', 'Akademik', '/images/prestasi-snbp.jpg'),
('Juara Menulis Cerpen', 'Siswi SMAN 1 Tarik meraih juara dalam lomba menulis cerpen tingkat regional.', '2020', 'Non-Akademik', '/images/prestasi-cerpen.jpg'),
('Prestasi Karya Tulis Ilmiah', 'Perwakilan siswa berprestasi dalam perlombaan Karya Tulis Ilmiah tingkat regional.', '2015', 'Akademik', '/images/prestasi-kti.jpg');

-- ============================================================
-- GALERI (dinamis)
-- ============================================================
insert into public.galeri (src, alt) values
('/images/galeri-1.jpg', 'Taman depan dengan papan Keren Tanpa Narkoba'),
('/images/galeri-2.jpg', 'Pintu gerbang dan spanduk selamat datang'),
('/images/galeri-3.jpg', 'Halaman / plaza sekolah dengan taman'),
('/images/galeri-4.jpg', 'Gedung kelas dengan selasar dan pepohonan'),
('/images/galeri-5.jpg', 'Selasar samping gedung dengan hiasan umbul-umbul');

-- ============================================================
-- VISI MISI (statis)
-- ============================================================
insert into public.visi_misi (visi, misi, tujuan) values
('Unggul dalam IMTAQ, Kreatifitas, Prestasi, dan Budaya Mutu.',
 '["Membentuk pribadi peserta didik yang beriman dan bertaqwa melalui kegiatan keagamaan sesuai dengan keyakinan dan kepercayaan masing-masing.","Meningkatkan penumbuhan budi pekerti peserta didik menjadi manusia yang berbudi pekerti luhur melalui kegiatan gerakan literasi sekolah, sekolah ramah anak, sekolah sehat, sekolah aman dan 5S (salam, senyum, salim, sapa, dan santun).","Meningkatkan peran aktif peserta didik dalam kegiatan ekstrakurikuler.","Meningkatkan jiwa kewirausahaan (entrepreneurship) kepada peserta didik dan pelibatan publik.","Meningkatkan kreatifitas pendidik dalam kegiatan pembelajaran aktif.","Meningkatkan kreatifitas kinerja tenaga kependidikan.","Meningkatkan peran aktif peserta didik dalam kegiatan intra dan ekstra kurikuler.","Meningkatkan peran aktif pendidik dan tenaga kependidikan dalam kegiatan intra dan ekstra kurikuler.","Meningkatkan prestasi peserta didik dalam bidang akademik dan non akademik di tingkat regional dan nasional.","Meningkatkan pemahaman potensi diri warga sekolah melalui sikap disiplin dan tertib dalam kehidupannya.","Meningkatkan aktualisasi potensi diri warga sekolah melalui kegiatan kurikuler.","Meningkatkan pengelolaan sekolah yang partisipatif dan demokratif seluruh warga sekolah.","Meningkatkan profesionalisme warga sekolah untuk mewujudkan nilai budaya mutu sekolah."]'::jsonb,
 '["Mempersiapkan peserta didik yang taat beribadah dan berakhlak mulia.","Membiasakan budaya literasi, ramah anak, sehat, dan aman di lingkungan sekolah.","Menumbuhkan minat, bakat, dan kreativitas peserta didik melalui kegiatan intra dan ekstrakurikuler.","Menanamkan jiwa kewirausahaan peserta didik yang kreatif dan mandiri.","Meningkatkan kompetensi dan profesionalisme pendidik serta tenaga kependidikan.","Mengoptimalkan pengelolaan sumber daya dan fasilitas sekolah secara partisipatif.","Mengantarkan peserta didik meraih prestasi akademik dan non-akademik hingga tingkat regional dan nasional.","Mewujudkan nilai budaya mutu di seluruh aspek kehidupan sekolah."]'::jsonb);

-- ============================================================
-- IDENTITAS (statis)
-- ============================================================
insert into public.identitas (label, value) values
('Nama Sekolah', 'SMA Negeri 1 Tarik'),
('NPSN', '20501704'),
('Status / Bentuk', 'Negeri / SMA'),
('Status Kepemilikan', 'Pemerintah Daerah'),
('SK Pendirian', '188/1069/404.1.1.3/2007'),
('Tanggal Didirikan', '4 September 2007'),
('Akreditasi', 'A (SK 164/BAP-S/M/SK/XI/2017)'),
('Alamat', 'Jl. Raya Janti, Kec. Tarik, Kab. Sidoarjo, Jawa Timur 61265'),
('Sistem Penyelenggaraan', 'Sehari penuh (Full Day) · 5 hari kerja'),
('Bank', 'Bank JATIM'),
('Sertifikasi ISO', 'Belum Bersertifikat'),
('Sumber Listrik', 'PLN · 39.350 Watt');

-- ============================================================
-- GURU & STAF (statis)
-- ============================================================
insert into public.guru_staf (nama, peran) values
('Ibu Guru 1', 'Guru'), ('Ibu Guru 2', 'Guru'), ('Ibu Guru 3', 'Guru'), ('Ibu Guru 4', 'Guru'),
('Bapak Guru 1', 'Guru'), ('Bapak Guru 2', 'Guru'), ('Bapak Guru 3', 'Guru'), ('Bapak Guru 4', 'Guru'),
('Operator 1', 'Staf'), ('Operator 2', 'Staf'), ('Staff TU 1', 'Staf'), ('Staff TU 2', 'Staf'),
('Staff Admin', 'Staf'), ('Staff Keuangan', 'Staf');

-- ============================================================
-- SAMBUTAN (statis)
-- ============================================================
insert into public.sambutan (nama, jabatan, foto, isi) values
('Wiwik Tri Ernawati, S.Sos.', 'Kepala Sekolah', '/images/kepala-sekolah.jpg',
 '["Selamat datang di website resmi SMA Negeri 1 Tarik. Kami berkomitmen mewujudkan generasi yang unggul dalam imtaq, kreativitas, prestasi, dan budaya mutu sesuai visi sekolah kami.","Melalui Kurikulum Merdeka dan berbagai program unggulan, kami membina siswa tidak hanya dalam bidang akademik, tetapi juga karakter, keterampilan, dan kepedulian terhadap lingkungan. Kami percaya setiap siswa memiliki potensi yang layak untuk dikembangkan secara maksimal.","Kepada para siswa, saya berpesan agar terus membangun jiwa literasi dan entrepreneurship di era digital, serta menjunjung integritas sebagai \"duta karakter\" sekolah di tengah masyarakat."]'::jsonb);

-- ============================================================
-- KURIKULUM (statis)
-- ============================================================
insert into public.kurikulum (nama, deskripsi, prinsip, integritas) values
('Kurikulum Merdeka',
 'SMAN 1 Tarik menerapkan Kurikulum Merdeka dengan pembelajaran Abad 21 yang menekankan prinsip 4C (Critical Thinking, Creativity, Collaboration, and Communication). Guru berperan sebagai fasilitator dan pembelajaran didukung teknologi/digitalisasi di dalam kelas.',
 '[{"title":"Berpikir Kritis (Critical Thinking)","desc":"Melatih siswa menganalisis dan mengevaluasi informasi secara mendalam sebelum mengambil keputusan."},{"title":"Kreativitas (Creativity)","desc":"Mendorong siswa menghasilkan gagasan dan karya baru yang inovatif, termasuk produk digital."},{"title":"Kolaborasi (Collaboration)","desc":"Membiasakan kerja sama tim dalam projek dan kegiatan pembelajaran kelompok."},{"title":"Komunikasi (Communication)","desc":"Mengasah kemampuan menyampaikan ide secara efektif baik lisan maupun tulisan."}]'::jsonb,
 'Sekolah dikenal menerapkan kebijakan ketat "zero score" bagi kecurangan atau menyontek sebagai wujud implementasi nilai integritas dalam proses pembelajaran.');

-- ============================================================
-- PROGRAM UNGGULAN AKADEMIK (statis)
-- ============================================================
insert into public.program_unggulan_akademik (icon, title, descr) values
('Megaphone', 'Gelar Karya Star Day Project', 'Implementasi masif P5 dengan program andalan kewirausahaan, di mana siswa membuat inovasi produk digital, mengelola stand digital marketing, dan F&B untuk membangun jiwa entrepreneurship. Dikhususkan pada Fase E.'),
('Moon', 'Keagamaan & Karakter', 'Program Dhuha berjamaah rutin, Istighotsah mingguan, dan peringatan hari besar Islam. Terdapat juga program siswa magang menjadi penceramah/bilal di musala atau masjid sekitar.'),
('FlaskConical', 'Kelas Sains & Riset', 'Fokus pengembangan kompetensi sains dengan pembinaan olimpiade dan karya ilmiah remaja.'),
('Landmark', 'Bimbingan PTN', 'Pendampingan intensif persiapan SNBP & SNBT. Terbukti siswa diterima di PTN melalui jalur SNBP secara konsisten.');

-- ============================================================
-- MATA PELAJARAN (statis)
-- ============================================================
insert into public.mata_pelajaran (fase_e, fase_f, wajib, pilihan) values
('Kelas X menggunakan Fase E dengan mata pelajaran bersifat umum tanpa penjurusan ketat, mencakup Fisika, Kimia, Biologi, Sosiologi, Ekonomi, Geografi, dan lainnya.',
 'Kelas XI dan XII menggunakan Fase F, di mana siswa memilih mata pelajaran pilihan sesuai minat (kelompok MIPA, IPS, atau Bahasa) di samping mata pelajaran wajib.',
 '["Pendidikan Agama & Budi Pekerti","Pendidikan Pancasila (PKn)","Bahasa Indonesia","Matematika","Bahasa Inggris","Pendidikan Jasmani, Olahraga & Kesehatan (PJOK)","Sejarah","Seni Budaya"]'::jsonb,
 '["Matematika Lanjut","Fisika","Kimia","Biologi","Ekonomi","Sosiologi","Geografi","Bahasa & Sastra"]'::jsonb);

-- ============================================================
-- JADWAL (statis)
-- ============================================================
insert into public.jadwal (sistem, jam_masuk, jam_pulang, catatan) values
('Sehari penuh · 5 hari kerja (Senin–Jumat)', 'Pukul 06.45 – 07.00 WIB', '± Pukul 15.30 WIB (Senin–Jumat)',
 '["Pembelajaran dimulai pagi hari hingga sore hari setiap hari kerja.","Istirahat diselingi pelaksanaan salat Dzuhur dan Ashar berjamaah.","Pada hari Jumat dilaksanakan salat Jumat berjamaah."]'::jsonb);

-- ============================================================
-- EKSKUL DETAIL (statis)
-- ============================================================
insert into public.ekskul_detail (icon, name, descr) values
('Flag', 'Paskibra (KOPASTAR)', 'Korps SMAN 1 Tarik, sangat dominan dan sering menjadi juara dalam berbagai lomba Paskibraka.'),
('Compass', 'Pramuka', 'Diwajibkan dalam kurikulum, berprestasi lintas kota dan menjadi wadah pengembangan kepemimpinan.'),
('Medal', 'Atletik', 'Ekskul tertua di sekolah, langganan juara pada cabang lari, cakram, lembing, dan lainnya.'),
('HeartPulse', 'PMR', 'Palang Merah Remaja yang berperan sebagai penolong pertama dan "dokter cilik" warga sekolah.'),
('Trophy', 'Bola Basket', 'Ekskul olahraga favorit yang aktif mengikuti kompetisi antar sekolah.'),
('Music', 'Al-Banjari (Al-Musthofa)', 'Sering menjadi penampil utama acara sekolah dan pernah menjadi juara 1 se-Mojokerto Sidoarjo.'),
('ShieldCheck', 'Karate', 'Sangat berprestasi hingga taraf internasional, membawa nama sekolah di kancah nasional maupun global.'),
('Lightbulb', 'Karya Ilmiah Remaja', 'Wadah pengembangan riset dan karya ilmiah siswa dalam berbagai bidang.'),
('Mic2', 'Madigstar (Media Digital)', 'Media digital sekolah untuk pengembangan kreativitas konten dan jurnalistik siswa.');

-- ============================================================
-- ORGANISASI (statis)
-- ============================================================
insert into public.organisasi (icon, name, descr) values
('Users', 'OSIS', 'Organisasi intra tertinggi sebagai wadah kepemimpinan dan berbagai program kerja siswa.'),
('Scale', 'MPK', 'Majelis Perwakilan Kelas yang menjadi mitra pengawas OSIS dan sangat berpengaruh dalam program kerja sekolah.'),
('Star', 'Duta Sekolah', 'Terlibat erat bersama OSIS dan MPK pada gelaran besar sekolah, seperti drama kolosal Islami.'),
('ShieldAlert', 'Satgas BNN', 'Sekolah pernah dinobatkan 10 besar Sekolah Bebas Narkoba se-Jawa Timur dan memiliki Satgas khusus pengetahuan Narkotika.');

-- ============================================================
-- KEGIATAN (statis)
-- ============================================================
insert into public.kegiatan (icon, name, descr) values
('Megaphone', 'Gelar Karya Star Day Project', 'Eksebisi hasil karya produk digital dan UMKM makanan-minuman dari P5 Kewirausahaan.'),
('Moon', 'Peringatan Hari Besar Islam', 'Isra'' Mi''raj dan Maulid Nabi dirayakan besar-besaran dengan drama kolosal, lomba Qiroah, Kaligrafi, Vokal Solo Islami, dan Cerita Islam.'),
('Trophy', 'Class Meeting', 'Acara rutin pasca ujian (STS/SAS) antar kelas untuk menyalurkan minat dan bakat siswa.'),
('Backpack', 'Goes to Campus & Industry', 'Kegiatan study literasi berupa kunjungan ke kampus dan industri.'),
('PartyPopper', 'Kirab Pelepasan Lulusan', 'Prosesi wisuda yang diiringi kirab kepala sekolah, tarian Rama-Shinta, dan iringan Gending Kebo Giro untuk lulusan angkatan.');

-- ============================================================
-- FASILITAS (statis)
-- ============================================================
insert into public.fasilitas (title, image, has_image) values
('Ruang Kelas yang Nyaman', '/images/fasilitas-kelas.jpg', true),
('Perpustakaan', '/images/fasilitas-perpus.jpg', false),
('Laboratorium IPA', '/images/fasilitas-ipa.jpg', false),
('Laboratorium Komputer', '/images/fasilitas-komputer.jpg', false),
('Lapangan Olahraga', '/images/fasilitas-lapangan.jpg', true),
('Musholla', '/images/fasilitas-musholla.jpg', false);

-- ============================================================
-- PPDB (statis)
-- ============================================================
insert into public.ppdb_alur (alur) values
('["Menyiapkan seluruh dokumen persyaratan yang telah ditentukan.","Memantau jadwal resmi SPMB yang diumumkan oleh Dinas Pendidikan Provinsi Jawa Timur.","Melakukan pendaftaran melalui laman resmi SPMB pada periode pendaftaran.","Memilih sekolah dan jalur sesuai dengan ketentuan yang berlaku.","Menunggu hasil seleksi yang diumumkan sesuai jadwal resmi.","Melakukan daftar ulang bagi calon siswa yang dinyatakan diterima."]'::jsonb);

insert into public.ppdb_persyaratan (persyaratan) values
('["Ijazah atau Surat Keterangan Lulus (SKL) SMP/MTs sederajat.","Akta Kelahiran calon peserta didik.","Kartu Keluarga (KK) yang masih berlaku.","Kartu Identitas (KTP/KK) orang tua atau wali.","Dokumen pendukung sesuai jalur pendaftaran yang dipilih (misal: sertifikat prestasi, SK pindah tugas, dll)."]'::jsonb);

insert into public.ppdb_jalur (nama, descr) values
('Jalur Domisili (Zonasi)', 'Diperuntukkan bagi calon peserta didik berdasarkan jarak domisili tempat tinggal ke sekolah, sesuai dengan ketentuan zonasi.'),
('Jalur Afirmasi', 'Diperuntukkan bagi calon peserta didik dari keluarga ekonomi tidak mampu dan/atau penyandang disabilitas sesuai ketentuan.'),
('Jalur Prestasi', 'Diperuntukkan bagi calon peserta didik dengan prestasi akademik maupun non-akademik yang dibuktikan dengan sertifikat/piagam.'),
('Jalur Perpindahan Tugas Orang Tua/Wali', 'Diperuntukkan bagi calon peserta didik yang mengikuti perpindahan tugas orang tua/wali antar daerah.');

insert into public.ppdb_faq (q, a) values
('Apa perbedaan PPDB dan SPMB?', 'SPMB (Seleksi Penerimaan Murid Baru) adalah istilah terbaru yang menggantikan PPDB untuk jenjang yang dikelola oleh pemerintah provinsi, termasuk SMA di Jawa Timur. Secara prinsip, keduanya adalah mekanisme penerimaan murid baru yang berbasis domisili, afirmasi, prestasi, dan perpindahan tugas.'),
('Bagaimana cara mengetahui jadwal pendaftaran?', 'Jadwal resmi SPMB diumumkan oleh Dinas Pendidikan Provinsi Jawa Timur melalui laman resminya. Pantau pengumuman resmi dan hubungi bagian tata usaha sekolah untuk informasi lebih lanjut.'),
('Apakah pendaftaran dipungut biaya?', 'Tidak. Pelaksanaan SPMB diselenggarakan tanpa dipungut biaya sepeser pun. Waspadai pihak-pihak yang meminta pungutan terkait penerimaan murid baru.'),
('Dokumen apa saja yang harus disiapkan?', 'Dokumen pokok meliputi ijazah/SKL, akta kelahiran, kartu keluarga, dan identitas orang tua/wali, serta dokumen pendukung sesuai jalur yang dipilih.');
