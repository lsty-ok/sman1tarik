import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";

import { siteInfo } from "@/data/siteData";
import { getPpdbFaq } from "@/lib/data";

export default async function FaqPage() {
  const ppdbFaq = await getPpdbFaq();

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
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Jawaban atas pertanyaan umum seputar PPDB/SPMB di {siteInfo.nama}.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {ppdbFaq.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-slate-200 bg-white shadow-sm open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-slate-900">
                  {item.q}
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-blue-700 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
