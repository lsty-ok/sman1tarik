import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";

import { getIdentitas } from "@/lib/data";

export const metadata = {
  title: "Identitas Sekolah — SMA Negeri 1 Tarik",
  description:
    "Identitas dan data resmi SMA Negeri 1 Tarik Sidoarjo, termasuk NPSN, akreditasi, alamat, dan status sekolah.",
};

export default async function IdentitasPage() {
  const identitasSekolah = await getIdentitas();
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
            href="/profil/visi-misi"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Profil
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Identitas Sekolah
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50/90">
            Data resmi dan identitas SMA Negeri 1 Tarik sesuai catatan Dapodik
            Kemendikbud dan website sekolah.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700">
              <Building2 size={24} />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Data Umum Sekolah
            </h2>
            <dl className="mt-6 divide-y divide-slate-100">
              {identitasSekolah.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
                >
                  <dt className="text-sm font-semibold text-slate-900">
                    {item.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-slate-600 sm:col-span-2">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
