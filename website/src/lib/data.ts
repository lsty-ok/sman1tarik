import { createClientSupabase } from "@/lib/supabase/client";
import { createServerSupabase } from "@/lib/supabase/server";
import type {
  Berita,
  Agenda,
  Prestasi,
  GaleriItem,
  FasilitasItem,
  VisiMisi,
  IdentitasRow,
  GuruStafRow,
  Sambutan,
  Kurikulum,
  ProgramUnggulanAkademikItem,
  MataPelajaran,
  JadwalSekolah,
  EkskulDetailItem,
  OrganisasiItem,
  KegiatanItem,
  PpdbJalurRow,
  PpdbFaqRow,
} from "@/lib/supabase/types";

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((v) => String(v)) : [];
}

// ============================================================
// DATA DINAMIS — client-side (anon + RLS)
// ============================================================

export async function getBerita(): Promise<Berita[]> {
  const supabase = createClientSupabase();
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: String(row.id),
    title: row.title,
    date: String(row.date),
    category: row.category,
    excerpt: row.excerpt,
    image: row.image,
    content: asStringArray(row.content),
  }));
}

export async function getAgenda(): Promise<Agenda[]> {
  const supabase = createClientSupabase();
  const { data, error } = await supabase.from("agenda").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: String(row.id),
    title: row.title,
    date: row.date,
    descr: row.descr,
  }));
}

export async function getPrestasi(): Promise<Prestasi[]> {
  const supabase = createClientSupabase();
  const { data, error } = await supabase.from("prestasi").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: String(row.id),
    title: row.title,
    descr: row.descr,
    tahun: row.tahun,
    kategori: row.kategori,
    image: row.image,
  }));
}

export async function getGaleri(): Promise<GaleriItem[]> {
  const supabase = createClientSupabase();
  const { data, error } = await supabase.from("galeri").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: String(row.id),
    src: row.src,
    alt: row.alt,
  }));
}

// ============================================================
// DATA STATIS — server-side (service role)
// ============================================================

export async function getVisiMisi(): Promise<VisiMisi> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("visi_misi")
    .select("*")
    .limit(1)
    .single();
  if (error) throw new Error(error.message);
  return {
    visi: data.visi,
    misi: asStringArray(data.misi),
    tujuan: asStringArray(data.tujuan),
  };
}

export async function getIdentitas(): Promise<IdentitasRow[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("identitas").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: String(row.id),
    label: row.label,
    value: row.value,
  }));
}

export async function getGuruStaf(): Promise<{ guru: string[]; staf: string[] }> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("guru_staf").select("*").order("peran");
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as GuruStafRow[];
  return {
    guru: rows.filter((r) => r.peran === "Guru").map((r) => r.nama),
    staf: rows.filter((r) => r.peran === "Staf").map((r) => r.nama),
  };
}

export async function getSambutan(): Promise<Sambutan> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("sambutan")
    .select("*")
    .limit(1)
    .single();
  if (error) throw new Error(error.message);
  return {
    nama: data.nama,
    jabatan: data.jabatan,
    foto: data.foto,
    isi: asStringArray(data.isi),
  };
}

export async function getKurikulum(): Promise<Kurikulum> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("kurikulum")
    .select("*")
    .limit(1)
    .single();
  if (error) throw new Error(error.message);
  const prinsip = Array.isArray(data.prinsip)
    ? (data.prinsip as unknown[]).map((p) => ({
        title: (p as { title?: string }).title ?? "",
        desc: (p as { desc?: string }).desc ?? "",
      }))
    : [];
  return {
    nama: data.nama,
    deskripsi: data.deskripsi,
    prinsip,
    integritas: data.integritas,
  };
}

export async function getProgramUnggulanAkademik(): Promise<ProgramUnggulanAkademikItem[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("program_unggulan_akademik")
    .select("*");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    icon: row.icon,
    title: row.title,
    desc: row.descr,
  }));
}

export async function getMataPelajaran(): Promise<MataPelajaran> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("mata_pelajaran")
    .select("*")
    .limit(1)
    .single();
  if (error) throw new Error(error.message);
  return {
    faseE: data.fase_e,
    faseF: data.fase_f,
    wajib: asStringArray(data.wajib),
    pilihan: asStringArray(data.pilihan),
  };
}

export async function getJadwal(): Promise<JadwalSekolah> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("jadwal").select("*").limit(1).single();
  if (error) throw new Error(error.message);
  return {
    sistem: data.sistem,
    jamMasuk: data.jam_masuk,
    jamPulang: data.jam_pulang,
    catatan: asStringArray(data.catatan),
  };
}

export async function getEkskulDetail(): Promise<EkskulDetailItem[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("ekskul_detail").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    icon: row.icon,
    name: row.name,
    desc: row.descr,
  }));
}

export async function getOrganisasi(): Promise<OrganisasiItem[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("organisasi").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    icon: row.icon,
    name: row.name,
    desc: row.descr,
  }));
}

export async function getKegiatan(): Promise<KegiatanItem[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("kegiatan").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    icon: row.icon,
    name: row.name,
    desc: row.descr,
  }));
}

export async function getFasilitas(): Promise<FasilitasItem[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("fasilitas").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: String(row.id),
    title: row.title,
    image: row.image,
    hasImage: Boolean(row.has_image),
  }));
}

export async function getPpdbAlur(): Promise<string[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("ppdb_alur").select("*").limit(1).single();
  if (error) throw new Error(error.message);
  return asStringArray(data.alur);
}

export async function getPpdbPersyaratan(): Promise<string[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("ppdb_persyaratan")
    .select("*")
    .limit(1)
    .single();
  if (error) throw new Error(error.message);
  return asStringArray(data.persyaratan);
}

export async function getPpdbJalur(): Promise<PpdbJalurRow[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("ppdb_jalur").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: String(row.id),
    nama: row.nama,
    descr: row.descr,
  }));
}

export async function getPpdbFaq(): Promise<PpdbFaqRow[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("ppdb_faq").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: String(row.id),
    q: row.q,
    a: row.a,
  }));
}
