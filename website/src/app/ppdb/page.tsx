import Link from "next/link";
import {
  BadgeCheck,
  FileText,
  HelpCircle,
  Map,
  Megaphone,
  CheckCircle2,
} from "lucide-react";

import { ppdbInfo, siteInfo } from "@/data/siteData";
import { getPpdbAlur } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  FileText,
  BadgeCheck,
  Map,
  Megaphone,
  HelpCircle,
};

export default async function PPDBPage() {
  const alurPendaftaran = await getPpdbAlur();
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
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-100">
            PPDB / SPMB
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Pendaftaran Peserta Didik Baru
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Selamat datang di halaman informasi penerimaan murid baru {siteInfo.nama}.
            Temukan jadwal, alur, persyaratan, jalur masuk, dan panduan lengkap SPMB.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ppdbInfo.map((item) => {
              const Icon = iconMap[item.icon] ?? FileText;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                >
                  <div className="mb-3 inline-flex rounded-lg bg-blue-50 p-2.5 text-blue-700">
                    <Icon size={22} />
                  </div>
                  <h2 className="font-semibold text-slate-900 group-hover:text-blue-700">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                Alur Pendaftaran
              </span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Langkah Bergabung dengan {siteInfo.nama}
              </h2>
              <p className="mt-2 text-slate-600">
                Tahapan berikut berlaku secara umum mengikuti ketentuan SPMB
                Dinas Pendidikan Provinsi Jawa Timur.
              </p>
            </div>
            <ol className="mt-8 space-y-4">
              {alurPendaftaran.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-slate-700">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-700" />
              <p>
                Pelaksanaan SPMB tidak dipungut biaya. Pantau pengumuman resmi
                Dinas Pendidikan Provinsi Jawa Timur untuk jadwal yang berlaku
                pada tahun ajaran berjalan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
