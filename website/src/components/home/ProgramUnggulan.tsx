import { FlaskConical, Microscope, BookOpenCheck, Landmark } from "lucide-react";

import { programUnggulan } from "@/data/siteData";

const iconMap: Record<string, React.ElementType> = {
  FlaskConical,
  Microscope,
  BookOpenCheck,
  Landmark,
};

export default function ProgramUnggulan() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Program
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Program Unggulan
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Program-program pilihan yang membentuk kompetensi akademik,
            karakter, dan daya saing siswa.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programUnggulan.map((item) => {
            const Icon = iconMap[item.icon] ?? FlaskConical;
            return (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3 text-blue-700">
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
