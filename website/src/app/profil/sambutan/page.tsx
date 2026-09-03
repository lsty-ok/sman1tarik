import Link from "next/link";
import { ArrowLeft, MessageSquareQuote, Quote } from "lucide-react";

import { getSambutan } from "@/lib/data";

export const metadata = {
  title: "Sambutan Kepala Sekolah — SMA Negeri 1 Tarik",
  description:
    "Sambutan Kepala SMA Negeri 1 Tarik untuk seluruh civitas akademika dan pengunjung website.",
};

export default async function SambutanPage() {
  const sambutan = await getSambutan();
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
            href="/profil/guru"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Profil
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Sambutan Kepala Sekolah
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Kata sambutan dari pimpinan SMA Negeri 1 Tarik.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr]">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-700 sm:h-28 sm:w-28">
                <UserIcon />
              </div>
              <div>
                <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
                  <MessageSquareQuote size={24} />
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {sambutan.nama}
                </h2>
                <p className="mt-1 text-sm font-semibold text-blue-700">
                  {sambutan.jabatan}
                </p>
              </div>
            </div>

            <div className="relative mt-8">
              <Quote size={40} className="text-blue-100" />
              <div className="mt-2 space-y-4">
                {sambutan.isi.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}
