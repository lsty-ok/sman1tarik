import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Users,
} from "lucide-react";

import { siteInfo, stats } from "@/data/siteData";
import { Reveal } from "@/components/ui/Reveal";

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
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="max-w-3xl">
          {/* Trust badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              <ShieldCheck size={14} className="text-yellow-300" />
              Terakreditasi {siteInfo.akreditasi} · BAN-S/M
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
              <Users size={13} />
              {stats.siswa} Siswa Aktif · {stats.guru} Guru & Staf
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            SMA Negeri 1 Tarik
          </h1>
          <p className="mt-3 text-lg font-semibold text-blue-100 sm:text-xl">
            {siteInfo.slogan}
          </p>
          <p className="mt-4 max-w-2xl text-base text-blue-50/90 sm:text-lg">
            Sekolah menengah atas negeri di Kecamatan Tarik, Sidoarjo yang
            membina generasi unggul dalam imtaq, kreativitas, prestasi, dan
            budaya mutu melalui Kurikulum Merdeka.
          </p>

          {/* Call-to-Action (CTA) Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/ppdb"
              role="button"
              aria-label="Informasi dan Pendaftaran PPDB SMA Negeri 1 Tarik"
              className="cta-button group inline-flex items-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 shadow-lg shadow-blue-900/30 transition-all duration-200 hover:bg-blue-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
            >
              <GraduationCap size={20} className="text-blue-600" />
              <span>Daftar / Info PPDB</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/profil/visi-misi"
              role="button"
              aria-label="Lihat Profil dan Visi Misi Sekolah"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/50 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              Profil Sekolah
            </Link>
            <Link
              href="/kontak"
              role="button"
              aria-label="Hubungi Kontak Sekolah"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-100 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Quick Contact & Info Bar */}
          <div className="mt-10 border-t border-white/15 pt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-blue-100/90">
            <div className="flex items-center gap-1.5">
              <Phone size={14} className="text-blue-300" />
              <span>{siteInfo.telepon[1] || siteInfo.telepon[0]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail size={14} className="text-blue-300" />
              <span>{siteInfo.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-blue-300" />
              <span>Tarik, Sidoarjo (NPSN {siteInfo.npsn})</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
