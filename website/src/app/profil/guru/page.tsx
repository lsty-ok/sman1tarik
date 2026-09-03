import Link from "next/link";
import { ArrowLeft, User, Users, GraduationCap } from "lucide-react";

import { getGuruStaf } from "@/lib/data";

export const metadata = {
  title: "Guru & Staf — SMA Negeri 1 Tarik",
  description:
    "Informasi tenaga pendidik dan kependidikan SMA Negeri 1 Tarik Sidoarjo.",
};

// Ringkasan statistik (data branding, dipertahankan di kode)
const totalGuru = "± 60";
const totalSiswa = "± 1.268";

export default async function GuruPage() {
  const { guru, staf } = await getGuruStaf();

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
            href="/profil/identitas"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Profil
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Guru & Staf
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Tenaga pendidik dan kependidikan yang berkomitmen membimbing prestasi
            siswa.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                <GraduationCap size={24} />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-slate-900">
                {totalGuru}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Tenaga Pendidik
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                <Users size={24} />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-slate-900">
                {totalSiswa}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Peserta Didik
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
              <User size={24} />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Tenaga Pendidik (Guru)
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guru.map((g) => (
                <div
                  key={g}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    {g.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{g}</p>
                    <p className="text-xs text-slate-500">Guru</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
              <Users size={24} />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Tenaga Kependidikan (Staf)
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {staf.map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                    {s.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{s}</p>
                    <p className="text-xs text-slate-500">Staf</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
