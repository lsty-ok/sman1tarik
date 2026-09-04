"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Save,
  AlertCircle,
  ExternalLink,
  SearchX,
} from "lucide-react";
import { createClientSupabase } from "@/lib/supabase/client";
import ImageUploader from "@/components/admin/ImageUploader";
import type { Berita } from "@/lib/supabase/types";

const CATEGORY_OPTIONS = [
  "Kesiswaan",
  "Akademik",
  "Prestasi",
  "Informasi",
  "Ekstrakurikuler",
];

export default function AdminEditBeritaPage() {
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Informasi");
  const [date, setDate] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState("");
  const [rawContent, setRawContent] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    async function loadItem() {
      try {
        setLoading(true);
        setError(null);
        const supabase = createClientSupabase();
        const { data, error: fetchErr } = await supabase
          .from("berita")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (fetchErr) throw fetchErr;

        if (!data) {
          if (isMounted) setNotFound(true);
          return;
        }

        if (isMounted) {
          setTitle(data.title || "");
          setCategory(data.category || "Informasi");
          setDate(data.date ? String(data.date) : "");
          setExcerpt(data.excerpt || "");
          setImage(data.image || "");

          const contentArr = Array.isArray(data.content) ? data.content : [];
          setRawContent(contentArr.join("\n\n"));
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Gagal memuat rincian berita.";
        if (isMounted) setError(msg);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadItem();

    return () => {
      isMounted = false;
    };
  }, [id]);

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

      const { error: updateError } = await supabase
        .from("berita")
        .update({
          title: title.trim(),
          category,
          date,
          excerpt: excerpt.trim(),
          image: image.trim(),
          content: paragraphs,
        })
        .eq("id", id);

      if (updateError) throw updateError;

      startTransition(() => {
        router.push("/admin/berita");
        router.refresh();
      });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Gagal menyimpan perubahan berita.";
      setError(msg);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-semibold text-slate-500">
          Memuat data berita...
        </p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Berita Tidak Ditemukan
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Berita dengan ID <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono text-xs">{id}</code> tidak ditemukan di database. Kemungkinan telah dihapus.
        </p>
        <Link
          href="/admin/berita"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Berita</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/berita"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke Daftar Berita</span>
        </Link>

        <Link
          href={`/berita/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          <span>Lihat di Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Card Form */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Card Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Edit Berita
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ubah rincian, kategori, gambar sampul, atau konten berita yang telah dipublikasikan.
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
              placeholder="Judul Berita..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Kategori & Tanggal */}
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
              placeholder="Tuliskan ringkasan singkat mengenai isi berita..."
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
                  <span>Menyimpan Perubahan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
