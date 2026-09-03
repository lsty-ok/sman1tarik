import { Award, BookOpen, Users, MapPin } from "lucide-react";

import { keunggulan } from "@/data/siteData";

const iconMap: Record<string, React.ElementType> = {
  Award,
  BookOpen,
  Users,
  MapPin,
};

export default function Keunggulan() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Branding
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Mengapa Memilih SMAN 1 Tarik?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Berbagai keunggulan menjadikan SMAN 1 Tarik pilihan tepat untuk
            melanjutkan pendidikan menengah yang berkualitas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {keunggulan.map((item) => {
            const Icon = iconMap[item.icon] ?? Award;
            return (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition-all hover:border-blue-300 hover:bg-white hover:shadow-md"
              >
                <div className="mx-auto mb-4 inline-flex rounded-full bg-blue-100 p-3 text-blue-700">
                  <Icon size={28} />
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
