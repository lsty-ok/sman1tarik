"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  Medal,
  Trophy,
  PenLine,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

import { getPrestasi } from "@/lib/data";
import type { Prestasi } from "@/lib/supabase/types";

const icons: LucideIcon[] = [GraduationCap, Medal, Trophy, PenLine, BookOpen];

export default function PrestasiPage() {
  const [items, setItems] = useState<Prestasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPrestasi()
      .then(setItems)
      .catch((e) => setError(e instanceof Error ? e.message : "Gagal memuat data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-blue-700">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0, transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href="/kesiswaan/organisasi"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Kesiswaan
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Prestasi
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Capaian membanggakan siswa SMAN 1 Tarik di berbagai bidang.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          {loading && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-xl bg-slate-200" />
              ))}
            </div>
          )}
          {error && (
            <p className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">
              {error}
            </p>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {items.map((p, i) => {
              const Icon = icons[i] ?? Trophy;
              return (
                <div
                  key={p.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                      <Icon size={22} />
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {p.kategori}
                    </span>
                  </div>
                  <h2 className="mt-4 text-base font-bold text-slate-900">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {p.descr}
                  </p>
                  {p.tahun !== "—" && (
                    <p className="mt-3 text-xs font-semibold text-slate-400">
                      Tahun {p.tahun}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
