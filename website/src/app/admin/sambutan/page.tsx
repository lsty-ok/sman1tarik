"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  User,
  Quote,
} from "lucide-react";
import { createClientSupabase } from "@/lib/supabase/client";
import ImageUploader from "@/components/admin/ImageUploader";

interface SambutanData {
  id?: string;
  nama: string;
  jabatan: string;
  foto: string;
  isi: string[];
}

export default function AdminSambutanPage() {
  const [existingId, setExistingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SambutanData>({
    nama: "",
    jabatan: "",
    foto: "",
    isi: [],
  });
  const [isiText, setIsiText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const fetchSambutan = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClientSupabase();
      const { data, error: err } = await supabase
        .from("sambutan")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (err) throw err;

      if (data) {
        setExistingId(String(data.id));
        const rawIsi = data.isi;
        let joinedText = "";
        let parsedArray: string[] = [];

        if (Array.isArray(rawIsi)) {
          parsedArray = rawIsi.map((p) => String(p));
          joinedText = parsedArray.join("\n\n");
        } else if (typeof rawIsi === "string") {
          joinedText = rawIsi;
          parsedArray = rawIsi.split("\n").map((p) => p.trim()).filter(Boolean);
        }

        setFormData({
          id: String(data.id),
          nama: data.nama || "",
          jabatan: data.jabatan || "",
          foto: data.foto || "",
          isi: parsedArray,
        });
        setIsiText(joinedText);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat data sambutan.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSambutan();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nama.trim()) {
      setError("Nama Kepala Sekolah wajib diisi.");
      return;
    }

    const paragraphs = isiText
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    try {
      setIsSaving(true);
      setError(null);
      const supabase = createClientSupabase();

      const payload = {
        nama: formData.nama.trim(),
        jabatan: formData.jabatan.trim(),
        foto: formData.foto.trim(),
        isi: paragraphs,
      };

      if (existingId) {
        const { error: err } = await supabase
          .from("sambutan")
          .update(payload)
          .eq("id", existingId);

        if (err) throw err;
      } else {
        const { data, error: err } = await supabase
          .from("sambutan")
          .insert([payload])
          .select()
          .single();

        if (err) throw err;
        if (data) {
          setExistingId(String(data.id));
        }
      }

      setFormData((prev) => ({
        ...prev,
        isi: paragraphs,
      }));

      showToast("Sambutan Kepala Sekolah berhasil diperbarui.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan sambutan.";
      setError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const previewParagraphs = isiText
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl border border-slate-800 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div className="flex items-center gap-2 text-sky-600 mb-1">
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Profil & Pimpinan
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Manajemen Sambutan Kepala Sekolah
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Kelola profil pimpinan, foto resmi, dan narasi sambutan kepala sekolah di beranda dan profil sekolah
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-xs font-semibold underline hover:no-underline cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-xs">
          <Loader2 className="w-8 h-8 text-sky-600 animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-600">Memuat data sambutan...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (Left / Col 7) */}
          <form
            onSubmit={handleSave}
            className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-100 shadow-xs space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Form Informasi Sambutan</h2>
              <span className="text-xs text-slate-400 font-mono">
                {existingId ? `ID: ${existingId}` : "Record Baru"}
              </span>
            </div>

            {/* Input Nama */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Nama Lengkap & Gelar Kepala Sekolah <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData((prev) => ({ ...prev, nama: e.target.value }))}
                placeholder="Contoh: Muhammad Fadloli, S.Pd., M.M."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

            {/* Input Jabatan */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Jabatan Resmi <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.jabatan}
                onChange={(e) => setFormData((prev) => ({ ...prev, jabatan: e.target.value }))}
                placeholder="Contoh: Kepala SMA Negeri 1 Tarik"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

            {/* Foto Kepala Sekolah */}
            <ImageUploader
              value={formData.foto}
              onChange={(url) => setFormData((prev) => ({ ...prev, foto: url }))}
              folder="kepala-sekolah"
              label="Foto Kepala Sekolah"
            />

            {/* Isi Sambutan (Multi-paragraph textarea) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Isi Sambutan (Per Paragraf) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  Pisahkan paragraf dengan baris baru ganda (Enter dua kali)
                </span>
              </div>
              <textarea
                rows={10}
                required
                value={isiText}
                onChange={(e) => setIsiText(e.target.value)}
                placeholder={`Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\nSelamat datang di website resmi SMA Negeri 1 Tarik...\n\nKami berkomitmen untuk terus meningkatkan mutu pendidikan...`}
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-sans leading-relaxed resize-y"
              />
              <p className="text-xs text-slate-400">
                Terdeteksi:{" "}
                <span className="font-semibold text-slate-700">
                  {previewParagraphs.length}
                </span>{" "}
                paragraf
              </p>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menyimpan Perubahan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Perbarui Sambutan
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Live Preview Card (Right / Col 5) */}
          <div className="lg:col-span-5 space-y-4 sticky top-6">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider px-1">
              <Eye className="w-4 h-4 text-sky-600" />
              <span>Live Preview Sambutan</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {/* Photo Banner / Hero Preview */}
              <div className="bg-gradient-to-br from-sky-900 to-indigo-950 p-6 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Quote className="w-32 h-32" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative w-28 h-28 rounded-full ring-4 ring-white/20 overflow-hidden bg-white/10 mb-3 shadow-md">
                    {formData.foto ? (
                      <Image
                        src={formData.foto}
                        alt={formData.nama || "Kepala Sekolah"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40">
                        <User className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {formData.nama || "Nama Kepala Sekolah"}
                  </h3>
                  <p className="text-xs text-sky-200 mt-0.5">
                    {formData.jabatan || "Kepala SMA Negeri 1 Tarik"}
                  </p>
                </div>
              </div>

              {/* Body Content Preview */}
              <div className="p-6 space-y-3.5 bg-slate-50/50">
                {previewParagraphs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6">
                    Isi teks sambutan pada formulir di sebelah kiri untuk melihat preview paragraf di sini.
                  </p>
                ) : (
                  previewParagraphs.map((par, idx) => (
                    <p
                      key={idx}
                      className="text-xs text-slate-700 leading-relaxed text-justify first-letter:text-sm first-letter:font-bold first-letter:text-sky-800"
                    >
                      {par}
                    </p>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
