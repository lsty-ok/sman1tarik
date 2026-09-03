import Link from "next/link";
import { FileText, BadgeCheck, Map, Megaphone, HelpCircle } from "lucide-react";

import { ppdbInfo } from "@/data/siteData";

const iconMap: Record<string, React.ElementType> = {
  FileText,
  BadgeCheck,
  Map,
  Megaphone,
  HelpCircle,
};

export default function PPDBQuickInfo() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            PPDB / SPMB
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Informasi Pendaftaran Siswa Baru
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Persiapkan dirimu bergabung bersama SMAN 1 Tarik. Cari tahu jadwal,
            persyaratan, jalur masuk, dan panduan lengkap SPMB berikut ini.
          </p>
        </div>

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
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-700">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
