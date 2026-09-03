"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

import { getAgenda } from "@/lib/data";
import type { Agenda } from "@/lib/supabase/types";

export default function AgendaPage() {
  const [items, setItems] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAgenda()
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
            Kalender Kegiatan
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Agenda Sekolah
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Jadwal kegiatan mendatang yang diselenggarakan oleh SMA Negeri 1
            Tarik.
          </p>
        </div>
      </section>

      {/* Agenda list */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          {loading && (
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-xl bg-slate-200"
                />
              ))}
            </div>
          )}
          {error && (
            <p className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">
              {error}
            </p>
          )}
          {!loading && !error && items.length === 0 && (
            <p className="text-center text-slate-500">
              Belum ada agenda yang dijadwalkan.
            </p>
          )}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center"
              >
                <div className="inline-flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-700 text-white">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-100">
                    Jadwal
                  </span>
                  <span className="mt-0.5 text-center text-[11px] font-bold leading-tight">
                    {item.date}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700">
                    <CalendarDays size={14} />
                    Kegiatan
                  </div>
                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{item.descr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
