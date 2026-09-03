"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { getGaleri } from "@/lib/data";
import type { GaleriItem } from "@/lib/supabase/types";

export default function GaleriPage() {
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGaleri()
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
            Dokumentasi
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Galeri Kegiatan
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Dokumentasi foto suasana dan kegiatan di lingkungan SMA Negeri 1
            Tarik.
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {loading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="aspect-square animate-pulse rounded-xl bg-slate-200"
                />
              ))}
            </div>
          )}
          {error && (
            <p className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">
              {error}
            </p>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <figure
                key={item.id}
                className={`group relative overflow-hidden rounded-xl bg-slate-200 ${
                  i % 4 === 0 ? "aspect-[4/5] lg:row-span-2" : "aspect-square"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
