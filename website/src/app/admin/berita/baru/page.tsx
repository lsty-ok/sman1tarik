"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Send, AlertCircle } from "lucide-react";
import { createClientSupabase } from "@/lib/supabase/client";
import ImageUploader from "@/components/admin/ImageUploader";

const CATEGORY_OPTIONS = [
  "Kesiswaan",
  "Akademik",
  "Prestasi",
  "Informasi",
  "Ekstrakurikuler",
];

export default function AdminTambahBeritaPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Informasi");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState("");
  const [rawContent, setRawContent] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Judul berita wajib diisi.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Convert multiline text to string array of paragraphs
      const paragraphs = rawContent
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean);

      const supabase = createClientSupabase();

      // Ensure id exists or generated; we can generate slug/uuid or let default gen_random_uuid if table does,
      // or compute an id timestamp/slug string. Let's check how id is defined in existing rows or use crypto.randomUUID().
      const id = `${Date.now()}-${title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .slice(0, 40)}`;

      const { error: insertError } = await supabase.from("berita").insert({
        id,
        title: title.trim(),
        category,
        date,
        excerpt: excerpt.trim(),
        image: image.trim(),
        content: paragraphs,
      });

      if (insertError) throw insertError;

      startTransition(() => {
        router.push("/admin/berita");
        router.refresh();
      });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Gagal menerbitkan berita. Silakan periksa kembali formulir.";
      setError(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back Link */}
      <div>
        <Link
          href="/admin/berita"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke Daftar Berita</span>
        </Link>
      </div>

      {/* Card Form */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Card Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Tulis Berita & Artikel Baru
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Lengkapi informasi di bawah ini untuk menerbitkan berita baru di portal website sekolah.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">Terjadi Kesalahan</p>
                <p className="text-xs mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Judul Berita */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-bold text-slate-700">
              Judul Berita <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              placeholder="Contoh: SMAN 1 Tarik Raih Juara 1 Lomba Sains Tingkat Provinsi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Kategori & Tanggal (2 columns on tablet/desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-bold text-slate-700">
                Kategori <span className="text-rose-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-bold text-slate-700">
                Tanggal Terbit <span className="text-rose-500">*</span>
              </label>
              <input
                id="date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* Ringkasan / Excerpt */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="excerpt" className="block text-sm font-bold text-slate-700">
                Ringkasan Berita (Excerpt)
              </label>
              <span className="text-xs text-slate-400">Ditampilkan pada kartu preview</span>
            </div>
            <textarea
              id="excerpt"
              rows={3}
              placeholder="Tuliskan ringkasan singkat 2-3 kalimat mengenai isi berita..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 leading-relaxed"
            />
          </div>

          {/* Gambar Sampul */}
          <div className="space-y-2">
            <ImageUploader
              label="Gambar Sampul Berita"
              value={image}
              onChange={(url) => setImage(url)}
              folder="berita"
            />
          </div>

          {/* Isi Berita Lengkap */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="rawContent" className="block text-sm font-bold text-slate-700">
                Isi Berita Lengkap
              </label>
              <span className="text-xs text-slate-400">Gunakan Enter untuk pemisah paragraf</span>
            </div>
            <textarea
              id="rawContent"
              rows={10}
              placeholder="Tuliskan paragraf berita di sini. Gunakan enter untuk memisahkan paragraf."
              value={rawContent}
              onChange={(e) => setRawContent(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-sans leading-relaxed"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <Link
              href="/admin/berita"
              className="w-full sm:w-auto px-5 py-2.5 text-center text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full sm:w-auto px-6 py-2.5 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
            >
              {isSubmitting || isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan Berita...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Terbitkan Berita</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
