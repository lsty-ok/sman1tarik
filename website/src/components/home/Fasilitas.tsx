import { fasilitas } from "@/data/siteData";

export default function Fasilitas() {
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fasilitas.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-blue-100 to-slate-200">
                {/* Placeholder — ganti dengan foto fasilitas aktual */}
                <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-blue-300/70">
                  {item.title.charAt(0)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-700">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
