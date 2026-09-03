import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Scale,
  Star,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

import { getOrganisasi } from "@/lib/data";

export const metadata = {
  title: "Organisasi Siswa — SMA Negeri 1 Tarik",
  description:
    "Organisasi siswa di SMA Negeri 1 Tarik, termasuk OSIS, MPK, Duta Sekolah, dan Satgas BNN.",
};

const iconMap: Record<string, LucideIcon> = {
  Users,
  Scale,
  Star,
  ShieldAlert,
};

export default async function OrganisasiPage() {
  const organisasiSiswa = await getOrganisasi();

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
            href="/kesiswaan/ekskul"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Kesiswaan
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Organisasi Siswa
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Organisasi yang menjadi wadah kepemimpinan dan partisipasi siswa.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {organisasiSiswa.map((o) => {
              const Icon = iconMap[o.icon] ?? Users;
              return (
                <div
                  key={o.name}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                    <Icon size={24} />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-slate-900">
                    {o.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {o.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
