import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Info, Phone } from "lucide-react";

import { siteInfo } from "@/data/siteData";

export default function BrosurPage() {
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
            href="/ppdb"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke PPDB
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Brosur &amp; Juknis
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Ringkasan panduan SPMB dan cara memperoleh brosur resmi{" "}
            {siteInfo.nama}.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex items-center gap-2 text-blue-700">
              <BookOpenCheck size={20} />
              <h2 className="text-lg font-bold text-slate-900">
                Sekilas Brosur SPMB
              </h2>
            </div>
            <p className="text-slate-600">
              Brosur resmi berisi informasi lengkap mengenai profil sekolah,
              program unggulan, jalur masuk, persyaratan, serta jadwal pelaksanaan
              SPMB pada tahun ajaran berjalan.
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600">
              <li>Profil dan program unggulan sekolah.</li>
              <li>Jalur dan persyaratan pendaftaran.</li>
              <li>Jadwal resmi yang ditetapkan Dinas Pendidikan Provinsi Jawa Timur.</li>
              <li>Alur dan tata cara pendaftaran.</li>
            </ul>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
              <Info size={18} className="mt-0.5 shrink-0 text-blue-700" />
              <p>
                Brosur dan juknis resmi dapat diperoleh di kantor tata usaha
                sekolah atau mengikuti pengumuman resmi Dinas Pendidikan Provinsi
                Jawa Timur.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Butuh Brosur Cetak?</h3>
              <p className="mt-1 text-sm text-slate-600">
                Silakan hubungi bagian tata usaha {siteInfo.nama} melalui nomor{" "}
                {siteInfo.telepon[0]} untuk informasi lebih lanjut.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
