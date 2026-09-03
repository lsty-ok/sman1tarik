import { GraduationCap, UserCheck, ShieldCheck, Map } from "lucide-react";

import { stats } from "@/data/siteData";

export default function AngkaKita() {
  const items = [
    {
      icon: GraduationCap,
      value: stats.siswa,
      label: "Siswa Aktif",
    },
    {
      icon: UserCheck,
      value: stats.guru,
      label: "Guru & Tendik",
    },
    {
      icon: ShieldCheck,
      value: stats.akreditasi,
      label: "Akreditasi",
    },
    {
      icon: Map,
      value: stats.luasTanah,
      label: "Luas Tanah",
    },
  ];

  return (
    <section className="bg-blue-700">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            Angka Kita
          </span>
          <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            Sekolah dalam Angka
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-xl bg-white/10 p-6 text-center backdrop-blur"
              >
                <div className="mx-auto mb-3 inline-flex rounded-full bg-white/20 p-3 text-white">
                  <Icon size={26} />
                </div>
                <p className="text-3xl font-extrabold text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-blue-100">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
