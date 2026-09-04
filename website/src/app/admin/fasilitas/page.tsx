"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { createClientSupabase } from "@/lib/supabase/client";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUploader from "@/components/admin/ImageUploader";

interface FasilitasItem {
  id: string;
  title: string;
  image: string;
  has_image: boolean;
}

interface FasilitasFormData {
  title: string;
  image: string;
}

const INITIAL_FORM_DATA: FasilitasFormData = {
  title: "",
  image: "",
};

export default function AdminFasilitasPage() {
  const [items, setItems] = useState<FasilitasItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal Form state (Add & Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FasilitasItem | null>(null);
  const [formData, setFormData] = useState<FasilitasFormData>(INITIAL_FORM_DATA);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Deletion state
  const [deleteTarget, setDeleteTarget] = useState<FasilitasItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const fetchFasilitas = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClientSupabase();
      const { data, error: err } = await supabase
        .from("fasilitas")
        .select("*")
        .order("id", { ascending: true });

      if (err) throw err;

      const mapped: FasilitasItem[] = (data || []).map((row) => ({
        id: String(row.id),
        title: row.title || "",
        image: row.image || "",
        has_image: Boolean(row.has_image || row.image),
      }));

      setItems(mapped);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat data fasilitas.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFasilitas();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData(INITIAL_FORM_DATA);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: FasilitasItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      image: item.image,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(INITIAL_FORM_DATA);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError("Nama fasilitas wajib diisi.");
      return;
    }

    const trimmedTitle = formData.title.trim();
    const trimmedImage = formData.image.trim();
    const hasImage = Boolean(trimmedImage);

    try {
      setIsSubmitting(true);
      setFormError(null);
      const supabase = createClientSupabase();

      if (editingItem) {
        // Update operation
        const { error: err } = await supabase
          .from("fasilitas")
          .update({
            title: trimmedTitle,
            image: trimmedImage,
            has_image: hasImage,
          })
          .eq("id", editingItem.id);

        if (err) throw err;

        setItems((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  title: trimmedTitle,
                  image: trimmedImage,
                  has_image: hasImage,
                }
              : item
          )
        );

        showToast("Data fasilitas berhasil diperbarui.");
      } else {
        // Insert operation
        const { data, error: err } = await supabase
          .from("fasilitas")
          .insert([
            {
              title: trimmedTitle,
              image: trimmedImage,
              has_image: hasImage,
            },
          ])
          .select()
          .single();

        if (err) throw err;

        if (data) {
          setItems((prev) => [
            ...prev,
            {
              id: String(data.id),
              title: data.title || "",
              image: data.image || "",
              has_image: Boolean(data.has_image || data.image),
            },
          ]);
        }

        showToast("Fasilitas baru berhasil ditambahkan.");
      }

      handleCloseModal();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan data fasilitas.";
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
        .from("fasilitas")
        .delete()
        .eq("id", deleteTarget.id);

      if (err) throw err;

      setItems((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      showToast(`Fasilitas "${deleteTarget.title}" berhasil dihapus.`);
      setDeleteTarget(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus fasilitas.";
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
            <Building2 className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Sarana & Prasarana
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manajemen Fasilitas & Sarana Sekolah
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola data dan foto sarana prasarana penunjang pembelajaran SMAN 1 Tarik
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          + Tambah Fasilitas
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
            onClick={fetchFasilitas}
            className="text-xs font-semibold underline hover:no-underline cursor-pointer"
          >
            Coba lagi
          </button>
        </div>
      )}

      {/* Facilities Grid / Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs animate-pulse"
            >
              <div className="aspect-video bg-slate-200" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-100 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 mx-auto flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Belum ada data fasilitas</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Tambahkan sarana dan prasarana sekolah agar siswa dan wali murid dapat melihat fasilitas yang tersedia.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-xl hover:bg-sky-700 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Tambah Fasilitas Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-1">
                      <ImageIcon className="w-10 h-10" />
                      <span className="text-xs text-slate-400">Tidak ada foto</span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    {item.has_image ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-xs shadow-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        Ada Gambar
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-700/80 text-white backdrop-blur-xs shadow-xs">
                        Tanpa Gambar
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3.5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400">ID: {item.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit fasilitas"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus fasilitas"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form: Tambah / Edit */}
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
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingItem ? "Edit Fasilitas Sekolah" : "Tambah Fasilitas Baru"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingItem
                      ? "Perbarui nama atau gambar fasilitas"
                      : "Tambahkan ruangan atau sarana sekolah"}
                  </p>
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
              {/* Input Nama */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Nama Fasilitas / Sarana <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Contoh: Laboratorium Komputer Modern"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
              </div>

              {/* Image Uploader */}
              <ImageUploader
                value={formData.image}
                onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
                folder="fasilitas"
                label="Foto Fasilitas"
              />

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
                  ) : editingItem ? (
                    "Simpan Perubahan"
                  ) : (
                    "Tambahkan Fasilitas"
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
        title="Hapus Fasilitas"
        message={`Apakah Anda yakin ingin menghapus fasilitas "${deleteTarget?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel={isDeleting ? "Menghapus..." : "Hapus Fasilitas"}
        cancelLabel="Batal"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
