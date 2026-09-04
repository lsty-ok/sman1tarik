import type { MetadataRoute } from "next";
import { getBerita } from "@/lib/data";

const BASE_URL = "https://sman1tarik.type3core.my.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/profil/sambutan", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/profil/visi-misi", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/profil/identitas", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/profil/guru", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/akademik/kurikulum", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/akademik/mata-pelajaran", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/akademik/jadwal", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/akademik/program-unggulan", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/kesiswaan/organisasi", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/kesiswaan/ekskul", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/kesiswaan/prestasi", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/kesiswaan/kegiatan", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/fasilitas", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/galeri", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/berita", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/agenda", changeFrequency: "daily" as const, priority: 0.8 },
    { path: "/kontak", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/ppdb", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/ppdb/persyaratan", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/ppdb/jalur", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/ppdb/brosur", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/ppdb/faq", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  let dynamicBerita: MetadataRoute.Sitemap = [];
  try {
    const beritaList = await getBerita();
    dynamicBerita = beritaList.map((item) => ({
      url: `${BASE_URL}/berita/${item.id}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    dynamicBerita = [];
  }

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticEntries, ...dynamicBerita];
}
