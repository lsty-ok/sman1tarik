export interface Berita {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  content: string[];
}

export interface Agenda {
  id: string;
  title: string;
  date: string;
  descr: string;
}

export interface Prestasi {
  id: string;
  title: string;
  descr: string;
  tahun: string;
  kategori: string;
  image: string;
}

export interface GaleriItem {
  id: string;
  src: string;
  alt: string;
}

export interface FasilitasItem {
  id: string;
  title: string;
  image: string;
  hasImage: boolean;
}

export interface Sambutan {
  nama: string;
  jabatan: string;
  foto: string;
  isi: string[];
}

export interface Kurikulum {
  nama: string;
  deskripsi: string;
  prinsip: { title: string; desc: string }[];
  integritas: string;
}

export interface MataPelajaran {
  faseE: string;
  faseF: string;
  wajib: string[];
  pilihan: string[];
}

export interface JadwalSekolah {
  sistem: string;
  jamMasuk: string;
  jamPulang: string;
  catatan: string[];
}

export interface EkskulDetailItem {
  icon: string;
  name: string;
  desc: string;
}

export interface StatisItem {
  icon: string;
  name: string;
  desc: string;
}

export interface FasilitasRow {
  id: string;
  title: string;
  image: string;
  hasImage: boolean;
}

export interface IdentitasRow {
  id: string;
  label: string;
  value: string;
}

export interface GuruStafRow {
  id?: string;
  nama: string;
  peran: string;
}

export interface PpdbJalurRow {
  id: string;
  nama: string;
  descr: string;
}

export interface PpdbFaqRow {
  id: string;
  q: string;
  a: string;
}

export interface VisiMisi {
  visi: string;
  misi: string[];
  tujuan: string[];
}

export interface ProgramUnggulanAkademikItem {
  icon: string;
  title: string;
  desc: string;
}

export interface OrganisasiItem {
  icon: string;
  name: string;
  desc: string;
}

export interface KegiatanItem {
  icon: string;
  name: string;
  desc: string;
}
