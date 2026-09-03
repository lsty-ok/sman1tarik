"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays, Tag, SearchX } from "lucide-react";

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

export default function BeritaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [items, setItems] = useState<Berita[]>([]);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    params.then(({ id: routeId }) => {
      if (active) setId(routeId);
      getBerita()
        .then((data) => {
          if (active) setItems(data);
        })
        .catch((e) => {
          if (active) setError(e instanceof Error ? e.message : "Gagal memuat data");
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    });
    return () => {
      active = false;
    };
  }, [params]);

  const item = items.find((b) => b.id === id);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-16">
        <div className="h-48 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-6 animate-pulse rounded bg-slate-200" />
        <div className="h-4 animate-pulse rounded bg-slate-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</p>
        <Link
          href="/berita"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          <ArrowLeft size={16} /> Kembali ke Berita
        </Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <SearchX size={48} className="mx-auto text-slate-300" />
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Berita tidak ditemukan
        </h1>
        <p className="mt-2 text-slate-500">
          Berita yang Anda cari mungkin telah dihapus atau dipindahkan.
        </p>
        <Link
          href="/berita"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          <ArrowLeft size={16} /> Kembali ke Berita
        </Link>
      </div>
    );
  }

  const lainnya = items.filter((b) => b.id !== item.id).slice(0, 3);

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
          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Berita
          </Link>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {item.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-blue-100">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={16} />
              {formatTanggal(item.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Tag size={16} />
              {item.category}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-white">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-200">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
          <p className="mt-6 text-lg font-medium text-slate-700">
            {item.excerpt}
          </p>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
            {item.content.map((paragraf, i) => (
              <p key={i}>{paragraf}</p>
            ))}
          </div>
        </article>
      </section>

      {/* Other news */}
      {lainnya.length > 0 && (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900">Berita Lainnya</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lainnya.map((b) => (
                <Link
                  key={b.id}
                  href={`/berita/${b.id}`}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200">
                    <Image
                      src={b.image}
                      alt={b.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-blue-700">
                      {b.category}
                    </p>
                    <h3 className="mt-1 line-clamp-2 font-semibold text-slate-900 group-hover:text-blue-700">
                      {b.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
