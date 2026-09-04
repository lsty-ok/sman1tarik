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

import { getFasilitas } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

const placeholderIcons: Record<string, LucideIcon> = {
  "Ruang Kelas yang Nyaman": School,
  Perpustakaan: BookOpen,
  "Laboratorium IPA": FlaskConical,
  "Laboratorium Komputer": Laptop,
  "Lapangan Olahraga": Trophy,
  Musholla: Building2,
};

export default async function Fasilitas() {
  const fasilitas = await getFasilitas();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Fasilitas
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Sarana & Prasarana
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Fasilitas lengkap dan nyaman untuk mendukung proses belajar
            mengajar serta pengembangan minat dan bakat siswa.
          </p>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fasilitas.map((item) => {
            const Icon = placeholderIcons[item.title] ?? Building2;
            return (
              <div
                key={item.title}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
                      <Icon size={40} strokeWidth={1.5} />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        {item.title}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
