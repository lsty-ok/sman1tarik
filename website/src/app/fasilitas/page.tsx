import Image from "next/image";
import {
  BookOpen,
  Building2,
  FlaskConical,
  Laptop,
  School,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { siteInfo } from "@/data/siteData";
import { getFasilitas } from "@/lib/data";

const placeholderIcons: Record<string, LucideIcon> = {
  "Ruang Kelas yang Nyaman": School,
  Perpustakaan: BookOpen,
  "Laboratorium IPA": FlaskConical,
  "Laboratorium Komputer": Laptop,
  "Lapangan Olahraga": Trophy,
  Musholla: Building2,
};

export default async function FasilitasPage() {
  const fasilitas = await getFasilitas();

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
            Sarana &amp; Prasarana
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Fasilitas Sekolah
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Fasilitas lengkap dan nyaman untuk mendukung proses belajar mengajar
            serta pengembangan minat dan bakat siswa di {siteInfo.nama}.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fasilitas.map((item) => {
              const Icon = placeholderIcons[item.title] ?? Building2;
              return (
                <div
                  key={item.title}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-blue-100 to-slate-200">
                    {item.hasImage ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-blue-300/70">
                        <Icon size={44} strokeWidth={1.5} />
                        <span className="px-4 text-center text-xs font-medium uppercase tracking-wide">
                          {item.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-slate-900 group-hover:text-blue-700">
                      {item.title}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
