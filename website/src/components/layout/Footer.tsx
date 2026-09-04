import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Camera,
  Video,
  Share2,
  ArrowRight,
} from "lucide-react";

import { siteInfo, navMenu } from "@/data/siteData";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Top CTA strip */}
      <div className="bg-blue-700">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              Bergabunglah dengan SMA Negeri 1 Tarik
            </h3>
            <p className="text-sm text-blue-100">
              Info PPDB & SPMB terbaru — hubungi kami sekarang.
            </p>
          </div>
          <Link
            href="/ppdb"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          >
            Info PPDB
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                SMAN
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-bold text-white">
                  SMA Negeri 1 Tarik
                </span>
                <span className="block text-[11px] text-blue-400 font-semibold tracking-wide">
                  UNGGUL PRESTASI, LUHUR BUDI PEKERTI
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Sekolah menengah atas negeri terakreditasi A di Kecamatan Tarik,
              Kabupaten Sidoarjo — membina generasi unggul dalam imtaq,
              kreativitas, prestasi, dan budaya mutu.
            </p>
            <div className="flex gap-3">
              <a
                href={siteInfo.sosial.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full bg-slate-800 p-2 text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Camera size={16} />
              </a>
              <a
                href={siteInfo.sosial.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="rounded-full bg-slate-800 p-2 text-slate-300 hover:bg-red-600 hover:text-white transition-colors"
              >
                <Video size={16} />
              </a>
              <a
                href={siteInfo.sosial.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full bg-slate-800 p-2 text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Navigasi
            </h4>
            <ul className="space-y-2 text-sm">
              {navMenu.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href === "#" ? "/" : item.href}
                    className="hover:text-blue-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Layanan
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ppdb" className="hover:text-blue-400">
                  Informasi PPDB / SPMB
                </Link>
              </li>
              <li>
                <Link href="/ppdb/brosur" className="hover:text-blue-400">
                  Brosur & Juknis
                </Link>
              </li>
              <li>
                <Link href="/kesiswaan/prestasi" className="hover:text-blue-400">
                  Prestasi Siswa
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-blue-400">
                  Galeri Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-blue-400">
                  Kontak Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Kontak
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-blue-400" />
                <span>{siteInfo.alamat}</span>
              </li>
              <li className="flex gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-blue-400" />
                <span>{siteInfo.telepon.join(" / ")}</span>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-blue-400" />
                <span>{siteInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            © {new Date().getFullYear()} SMA Negeri 1 Tarik Sidoarjo. All rights
            reserved.
          </span>
          <span>NPSN: {siteInfo.npsn} · Terakreditasi A</span>
        </div>
        <div className="border-t border-slate-800/60">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 text-[11px] text-slate-500">
            Situs ini adalah proyek portofolio pengembangan web dan bukan situs
            resmi SMA Negeri 1 Tarik. Informasi resmi sekolah tersedia di
            situs resmi SMA Negeri 1 Tarik.
          </div>
        </div>
      </div>
    </footer>
  );
}
