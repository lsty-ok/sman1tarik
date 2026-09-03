import Image from "next/image";
import { Quote } from "lucide-react";

import { sambutan } from "@/data/siteData";

export default function Sambutan() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Foto */}
          <div className="relative mx-auto max-w-sm">
            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-slate-200">
              <Image
                src={sambutan.foto}
                alt={`Foto ${sambutan.jabatan} SMA Negeri 1 Tarik`}
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white shadow-lg">
              {sambutan.jabatan}
            </div>
          </div>

          {/* Teks */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Sambutan
            </span>
            <h2 className="mt-1 flex items-center gap-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              <Quote size={28} className="text-blue-700" />
              {sambutan.nama}
            </h2>
            <div className="mt-4 space-y-4 text-slate-600">
              {sambutan.isi.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-6 rounded-lg border-l-4 border-blue-700 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                “{sambutan.nama}”
              </p>
              <p className="text-xs text-slate-500">SMAN 1 Tarik</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
