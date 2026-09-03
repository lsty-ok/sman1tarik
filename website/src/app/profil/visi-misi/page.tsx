import Link from "next/link";
import { ArrowLeft, Eye, Target, ListChecks } from "lucide-react";

import { getVisiMisi } from "@/lib/data";

export const metadata = {
  title: "Visi & Misi — SMA Negeri 1 Tarik",
  description:
    "Visi, misi, dan tujuan SMA Negeri 1 Tarik Sidoarjo dalam mewujudkan sekolah yang unggul dalam imtaq, kreativitas, prestasi, dan budaya mutu.",
};

export default async function VisiMisiPage() {
  const visiMisi = await getVisiMisi();
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
            Visi, Misi & Tujuan
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Landasan arah dan cita-cita SMA Negeri 1 Tarik dalam menyelenggarakan
            pendidikan yang bermutu.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
              <Eye size={24} />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">Visi</h2>
            <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-800">
              “{visiMisi.visi}”
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
              <Target size={24} />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">Misi</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5">
              {visiMisi.misi.map((m, i) => (
                <li key={i} className="text-sm leading-relaxed text-slate-600">
                  {m}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
              <ListChecks size={24} />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">Tujuan</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5">
              {visiMisi.tujuan.map((t, i) => (
                <li key={i} className="text-sm leading-relaxed text-slate-600">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
