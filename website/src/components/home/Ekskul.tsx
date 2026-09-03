import {
  Compass,
  Users,
  Flag,
  HeartPulse,
  Lightbulb,
  Palette,
  Dumbbell,
  Mic2,
} from "lucide-react";

import { ekskul } from "@/data/siteData";

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Users,
  Flag,
  HeartPulse,
  Lightbulb,
  Palette,
  Dumbbell,
  Mic2,
};

export default function Ekskul() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Ekstrakurikuler
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Wadah Untuk Bakat & Minat
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Beragam ekstrakurikuler untuk mengembangkan potensi siswa di luar
            jam pelajaran.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {ekskul.map((item) => {
            const Icon = iconMap[item.icon] ?? Compass;
            return (
              <div
                key={item.name}
                className="flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 p-5 text-center transition-all hover:border-blue-300 hover:bg-white hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-full bg-blue-100 p-3 text-blue-700">
                  <Icon size={24} />
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
