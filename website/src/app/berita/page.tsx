"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";

import { getBerita } from "@/lib/data";
import type { Berita } from "@/lib/supabase/types";

function formatTanggal(iso: string) {
  const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const d = new Date(`${iso}T00:00:00`);
  return `${d.getDate()} ${namaBulan[d.getMonth()]} ${d.getFullYear()}`;
}

export default function BeritaPage() {
  const [items, setItems] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBerita()
      .then(setItems)
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal memuat data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden bg-blue-700">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0, transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-100">
            Informasi &amp; Pengumuman
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Berita Sekolah
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Informasi terbaru seputar kegiatan, pengumuman, dan prestasi SMA
            Negeri 1 Tarik.
          </p>
        </div>
      </section>

      {/* News list */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {loading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-xl bg-slate-200" />
              ))}
            </div>
          )}
          {error && (
            <p className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">
              {error}
            </p>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-blue-700">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={13} />
                      {formatTanggal(item.date)}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-blue-700">
                    {item.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                    {item.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-blue-700">
                    Baca Selengkapnya
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
