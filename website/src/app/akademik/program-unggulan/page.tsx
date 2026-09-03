import Link from "next/link";
import {
  ArrowLeft,
  Megaphone,
  Moon,
  FlaskConical,
  Landmark,
  type LucideIcon,
} from "lucide-react";

import { getProgramUnggulanAkademik } from "@/lib/data";

export const metadata = {
  title: "Program Unggulan — SMA Negeri 1 Tarik",
  description:
    "Program unggulan akademik SMA Negeri 1 Tarik, termasuk Gelar Karya Star Day, keagamaan, sains riset, dan bimbingan PTN.",
};

const iconMap: Record<string, LucideIcon> = {
  Megaphone,
  Moon,
  FlaskConical,
  Landmark,
};

export default async function ProgramUnggulanPage() {
  const program = await getProgramUnggulanAkademik();

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
            href="/akademik/kurikulum"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Akademik
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Program Unggulan
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Program-program andalan SMA Negeri 1 Tarik untuk mengembangkan potensi
            siswa.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {program.map((p) => {
              const Icon = iconMap[p.icon] ?? Megaphone;
              return (
                <div
                  key={p.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                    <Icon size={24} />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-slate-900">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {p.desc}
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
