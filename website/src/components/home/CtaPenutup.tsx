import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function CtaPenutup() {
  return (
    <section className="bg-gradient-to-br from-blue-700 to-blue-900">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white">
          <GraduationCap size={16} />
          Terakreditasi A
        </span>
        <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
          Tertarik Mengenal SMA Negeri 1 Tarik?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
          Mulailah perjalanan pendidikan yang unggul prestasi dan luhur budi
          pekerti. Jelajahi profil kami atau daftarkan dirimu melalui PPDB
          /SPMB.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/profil/visi-misi"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow hover:bg-blue-50"
          >
            Kenali Profil Kami
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/ppdb"
            className="inline-flex items-center gap-2 rounded-lg border border-white/50 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Info PPDB / SPMB
            <GraduationCap size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
