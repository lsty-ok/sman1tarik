import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Layers, Sparkles } from "lucide-react";

import { getMataPelajaran } from "@/lib/data";

export const metadata = {
  title: "Mata Pelajaran — SMA Negeri 1 Tarik",
  description:
    "Struktur mata pelajaran Kurikulum Merdeka di SMA Negeri 1 Tarik (Fase E dan Fase F).",
};

export default async function MataPelajaranPage() {
  const mataPelajaran = await getMataPelajaran();

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
            href="/akademik/program-unggulan"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Akademik
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Mata Pelajaran
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Struktur mata pelajaran sesuai Kurikulum Merdeka.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
              <Layers size={24} />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">Fase E</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {mataPelajaran.faseE}
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
              <Sparkles size={24} />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">Fase F</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {mataPelajaran.faseF}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                <BookOpenCheck size={24} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900">
                Mata Pelajaran Wajib
              </h2>
              <ul className="mt-4 space-y-2">
                {mataPelajaran.wajib.map((m, i) => (
                  <li
                    key={m}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      {i + 1}
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                <Sparkles size={24} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900">
                Mata Pelajaran Pilihan
              </h2>
              <ul className="mt-4 space-y-2">
                {mataPelajaran.pilihan.map((m, i) => (
                  <li
                    key={m}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      {i + 1}
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
