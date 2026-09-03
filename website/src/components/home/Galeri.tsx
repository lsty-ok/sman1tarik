import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { galeri } from "@/data/siteData";

export default function Galeri() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Galeri
            </span>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Dokumentasi Kegiatan
            </h2>
          </div>
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            Lihat Semua
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {galeri.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-xl bg-slate-100 ${
                (i === 0 || i === 3) ? "aspect-[4/5]" : "aspect-square"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
