import Link from "next/link";
import { ArrowLeft, Check, FileCheck2 } from "lucide-react";

import { siteInfo } from "@/data/siteData";
import { getPpdbPersyaratan } from "@/lib/data";

export default async function PersyaratanPage() {
  const ppdbPersyaratan = await getPpdbPersyaratan();

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
            Persyaratan Pendaftaran
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Siapkan dokumen berikut sebelum melakukan pendaftaran di{" "}
            {siteInfo.nama}.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex items-center gap-2 text-blue-700">
              <FileCheck2 size={20} />
              <h2 className="text-lg font-bold text-slate-900">
                Dokumen yang Disiapkan
              </h2>
            </div>
            <ul className="space-y-4">
              {ppdbPersyaratan.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <Check size={14} />
                  </span>
                  <p className="text-slate-700">{item}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-slate-100 pt-4 text-sm text-slate-500">
              Dokumen pendukung dapat berbeda sesuai jalur yang dipilih. Pastikan
              seluruh berkas difotokopi / diunggah sesuai ketentuan resmi SPMB.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
