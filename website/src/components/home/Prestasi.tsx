import Link from "next/link";
import { Trophy, Calendar, ArrowRight } from "lucide-react";

import { prestasi } from "@/data/siteData";

export default function Prestasi() {
  const featured = prestasi[0];
  const rest = prestasi.slice(1);

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Prestasi
            </span>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Prestasi Siswa
            </h2>
          </div>
          <Link
            href="/kesiswaan/prestasi"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            Lihat Semua Prestasi
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Featured card */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-1">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-blue-100 to-slate-200">
              <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-blue-300/70">
                {featured.title.charAt(0)}
              </div>
              <span className="absolute left-3 top-3 rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white">
                {featured.kategori}
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar size={14} />
                <span>{featured.tahun}</span>
              </div>
              <h3 className="mt-2 font-semibold leading-snug text-slate-900">
                {featured.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{featured.desc}</p>
            </div>
          </div>

          {/* Rest */}
          <div className="space-y-6 lg:col-span-2">
            {rest.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Trophy size={24} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                      {item.kategori}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar size={12} /> {item.tahun}
                    </span>
                  </div>
                  <h3 className="mt-1 font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
