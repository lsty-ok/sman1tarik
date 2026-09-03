import Link from "next/link";
import { ArrowLeft, Clock, CalendarDays, Moon } from "lucide-react";

import { getJadwal } from "@/lib/data";

export const metadata = {
  title: "Jadwal — SMA Negeri 1 Tarik",
  description:
    "Jadwal pembelajaran sehari penuh (full day) SMA Negeri 1 Tarik Sidoarjo.",
};

export default async function JadwalPage() {
  const jadwalSekolah = await getJadwal();

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
            href="/akademik/mata-pelajaran"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Akademik
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Jadwal Pembelajaran
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Sistem pembelajaran sehari penuh di SMA Negeri 1 Tarik.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                <CalendarDays size={24} />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-500">
                Sistem
              </p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">
                {jadwalSekolah.sistem}
              </h2>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                <Clock size={24} />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-500">
                Jam Pembelajaran
              </p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">
                {jadwalSekolah.jamMasuk}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {jadwalSekolah.jamPulang}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
              <Moon size={24} />
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-900">Catatan</h2>
            <ul className="mt-4 space-y-3">
              {jadwalSekolah.catatan.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
