import Link from "next/link";
import {
  Camera,
  Clock,
  Mail,
  MapPin,
  Phone,
  Play,
  Share2,
} from "lucide-react";

import { siteInfo } from "@/data/siteData";

export default function KontakPage() {
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
            Hubungi Kami
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Kontak {siteInfo.nama}
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Silakan hubungi kami melalui informasi kontak berikut apabila Anda
            memiliki pertanyaan atau keperluan lainnya.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                <MapPin size={22} />
              </div>
              <h2 className="font-bold text-slate-900">Alamat</h2>
              <p className="mt-2 text-slate-600">{siteInfo.alamat}</p>
              <p className="mt-2 text-sm text-slate-500">
                NPSN {siteInfo.npsn}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                <Phone size={22} />
              </div>
              <h2 className="font-bold text-slate-900">Telepon</h2>
              <p className="mt-2 text-slate-600">
                {siteInfo.telepon[0]}
              </p>
              <p className="mt-1 text-slate-600">
                {siteInfo.telepon[1]}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                <Mail size={22} />
              </div>
              <h2 className="font-bold text-slate-900">Email</h2>
              <p className="mt-2 text-slate-600">{siteInfo.email}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                <Clock size={22} />
              </div>
              <h2 className="font-bold text-slate-900">Jam Operasional</h2>
              <p className="mt-2 text-slate-600">
                {siteInfo.sistemPenyelenggaraan}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Senin s.d. Jumat
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Media Sosial</h2>
            <p className="mt-1 text-sm text-slate-500">
              Ikuti kami untuk informasi dan kegiatan terbaru.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={siteInfo.sosial.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
              >
                <Camera size={16} />
                Instagram
              </Link>
              <Link
                href={siteInfo.sosial.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
              >
                <Play size={16} />
                YouTube
              </Link>
              <Link
                href={siteInfo.sosial.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
              >
                <Share2 size={16} />
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
