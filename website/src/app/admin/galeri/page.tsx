"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  X,
  Upload,
} from "lucide-react";
import { createClientSupabase } from "@/lib/supabase/client";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUploader from "@/components/admin/ImageUploader";
import type { GaleriItem } from "@/lib/supabase/types";

interface GaleriFormData {
  src: string;
  alt: string;
}

const INITIAL_FORM_DATA: GaleriFormData = {
  src: "",
  alt: "",
};

export default function AdminGaleriPage() {
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Upload Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<GaleriFormData>(INITIAL_FORM_DATA);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Deletion state
  const [deleteTarget, setDeleteTarget] = useState<GaleriItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const fetchGaleri = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClientSupabase();
      const { data, error: err } = await supabase
        .from("galeri")
        .select("*")
        .order("id", { ascending: false });

      if (err) throw err;

      const mapped: GaleriItem[] = (data || []).map((row) => ({
        id: String(row.id),
        src: row.src || "",
        alt: row.alt || "",
      }));

      setItems(mapped);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat galeri foto.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  const handleOpenUploadModal = () => {
    setFormData(INITIAL_FORM_DATA);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setFormData(INITIAL_FORM_DATA);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.src.trim()) {
      setFormError("Silakan unggah foto atau masukkan URL foto terlebih dahulu.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError(null);
      const supabase = createClientSupabase();

      const { data, error: err } = await supabase
        .from("galeri")
        .insert([
          {
            src: formData.src.trim(),
            alt: formData.alt.trim(),
          },
        ])
        .select()
        .single();

      if (err) throw err;

      if (data) {
        setItems((prev) => [
          {
            id: String(data.id),
            src: data.src || "",
            alt: data.alt || "",
          },
          ...prev,
        ]);
      }

      showToast("Foto berhasil ditambahkan ke galeri.");
      handleCloseModal();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengunggah foto.";
      setFormError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      const supabase = createClientSupabase();
      const { error: err } = await supabase
        .from("galeri")
        .delete()
        .eq("id", deleteTarget.id);

      if (err) throw err;

      setItems((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      showToast("Foto berhasil dihapus dari galeri.");
      setDeleteTarget(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus foto.";
      showToast(`Error: ${msg}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl border border-slate-800 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-sky-600 mb-1">
            <ImageIcon className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Media & Dokumentasi
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Galeri Foto</h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola foto dokumentasi kegiatan, fasilitas, dan momen penting SMAN 1 Tarik
          </p>
        </div>

        <button
          onClick={handleOpenUploadModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          + Upload Foto Baru
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchGaleri}
            className="text-xs font-semibold underline hover:no-underline cursor-pointer"
          >
            Coba lagi
          </button>
        </div>
      )}

      {/* Content Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs animate-pulse"
            >
              <div className="aspect-video bg-slate-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 mx-auto flex items-center justify-center mb-4">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Belum ada foto di galeri</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Klik tombol &quot;+ Upload Foto Baru&quot; untuk menambahkan dokumentasi pertama Anda.
          </p>
          <button
            onClick={handleOpenUploadModal}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-xl hover:bg-sky-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Upload Foto Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt || "Dokumentasi Galeri"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon className="w-10 h-10" />
                  </div>
                )}

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-2.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 cursor-pointer"
                    title="Hapus foto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Caption Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug">
                  {item.alt || <span className="text-slate-400 italic">Tanpa keterangan foto</span>}
                </p>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px] truncate max-w-[150px]">ID: {item.id}</span>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="text-rose-500 hover:text-rose-600 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-7 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Upload Foto Baru</h3>
                  <p className="text-xs text-slate-500">Tambahkan foto ke galeri SMAN 1 Tarik</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Alert */}
            {formError && (
              <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{formError}</span>
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Image Uploader */}
              <ImageUploader
                value={formData.src}
                onChange={(url) => setFormData((prev) => ({ ...prev, src: url }))}
                folder="galeri"
                label="Foto Galeri"
              />

              {/* Alt / Caption Text Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Deskripsi / Keterangan Foto
                </label>
                <input
                  type="text"
                  value={formData.alt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, alt: e.target.value }))}
                  placeholder="Contoh: Upacara Hari Kemerdekaan RI di Lapangan Utama"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
                <p className="text-[11px] text-slate-400">
                  Keterangan ini akan ditampilkan sebagai teks alt dan deskripsi foto.
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan ke Galeri"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Hapus Foto Galeri"
        message={`Apakah Anda yakin ingin menghapus foto ${
          deleteTarget?.alt ? `"${deleteTarget.alt}"` : "ini"
        } dari galeri? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel={isDeleting ? "Menghapus..." : "Hapus Foto"}
        cancelLabel="Batal"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
