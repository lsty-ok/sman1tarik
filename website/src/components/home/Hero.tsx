import Link from "next/link";
import { ArrowRight, ShieldCheck, GraduationCap } from "lucide-react";

import { siteInfo } from "@/data/siteData";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-blue-700">
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            <ShieldCheck size={14} />
            Terakreditasi A · NPSN {siteInfo.npsn}
          </span>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            SMA Negeri 1 Tarik
          </h1>
          <p className="mt-3 text-lg font-semibold text-blue-100 sm:text-xl">
            {siteInfo.slogan}
          </p>
          <p className="mt-5 max-w-2xl text-base text-blue-50/90 sm:text-lg">
            Sekolah menengah atas negeri di Kecamatan Tarik, Sidoarjo yang
            membina generasi unggul dalam imtaq, kreativitas, prestasi, dan
            budaya mutu melalui Kurikulum Merdeka.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/ppdb"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow hover:bg-blue-50"
            >
              <GraduationCap size={18} />
              Info PPDB / SPMB
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/profil/visi-misi"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Profil Sekolah
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
