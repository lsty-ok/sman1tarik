import Link from "next/link";
import { ArrowLeft, BookOpen, ShieldCheck, Lightbulb } from "lucide-react";

import { getKurikulum } from "@/lib/data";

export const metadata = {
  title: "Kurikulum — SMA Negeri 1 Tarik",
  description:
    "Kurikulum Merdeka dan pembelajaran Abad 21 dengan prinsip 4C di SMA Negeri 1 Tarik.",
};

export default async function KurikulumPage() {
  const kurikulum = await getKurikulum();

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
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Kurikulum
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            {kurikulum.nama} dengan pendekatan pembelajaran Abad 21.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
              <BookOpen size={24} />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              {kurikulum.nama}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {kurikulum.deskripsi}
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Prinsip Pembelajaran 4C
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {kurikulum.prinsip.map((p, i) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-5"
                >
                  <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                    <Lightbulb size={22} />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-6 shadow-sm sm:p-8">
            <div className="inline-flex rounded-lg bg-white p-3 text-blue-700">
              <ShieldCheck size={24} />
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Nilai Integritas
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {kurikulum.integritas}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
