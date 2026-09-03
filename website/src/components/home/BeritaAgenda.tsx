import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronRight, Clock, ArrowRight } from "lucide-react";

import { berita, agenda } from "@/data/siteData";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

export default function BeritaAgenda() {
  const latest = berita.slice(0, 3);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Berita & Agenda
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Informasi Terbaru
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left — 3 news */}
          <div className="space-y-6 lg:col-span-2">
            {latest.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md sm:flex-row"
              >
                <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:w-32">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 128px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-semibold text-blue-700">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className="mt-2 font-semibold leading-snug text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{item.excerpt}</p>
                  <Link
                    href={`/berita/${item.id}`}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Baca selengkapnya
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
            <div className="text-center">
              <Link
                href="/berita"
                className="inline-flex items-center gap-2 rounded-lg border border-blue-700 px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                Lihat Semua Berita
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right — agenda */}
          <aside className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Clock size={20} className="text-blue-700" />
              Agenda Terdekat
            </h3>
            <div className="mt-5 space-y-4">
              {agenda.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span className="inline-block rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                    {item.date}
                  </span>
                  <h4 className="mt-2 font-semibold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
            <Link
              href="/agenda"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Lihat semua agenda
              <ChevronRight size={14} />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
