"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { createClientSupabase } from "@/lib/supabase/client";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface GuruStafItem {
  id: string;
  nama: string;
  peran: string;
}

interface GuruStafFormData {
  nama: string;
  peran: string;
}

const INITIAL_FORM_DATA: GuruStafFormData = {
  nama: "",
  peran: "",
};

export default function AdminGuruStafPage() {
  const [items, setItems] = useState<GuruStafItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Modal Form state (Add & Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GuruStafItem | null>(null);
  const [formData, setFormData] = useState<GuruStafFormData>(INITIAL_FORM_DATA);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Deletion state
  const [deleteTarget, setDeleteTarget] = useState<GuruStafItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const fetchGuruStaf = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClientSupabase();
      const { data, error: err } = await supabase
        .from("guru_staf")
        .select("*")
        .order("id", { ascending: true });

      if (err) throw err;

      const mapped: GuruStafItem[] = (data || []).map((row) => ({
        id: String(row.id),
        nama: row.nama || "",
        peran: row.peran || "",
      }));

      setItems(mapped);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat direktori guru dan staf.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuruStaf();
  }, []);

  const filteredItems = useMemo(() => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return items;

    return items.filter(
      (item) =>
        item.nama.toLowerCase().includes(term) ||
        item.peran.toLowerCase().includes(term)
    );
  }, [items, searchQuery]);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData(INITIAL_FORM_DATA);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GuruStafItem) => {
    setEditingItem(item);
    setFormData({
      nama: item.nama,
      peran: item.peran,
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
    if (!formData.nama.trim()) {
      setFormError("Nama lengkap wajib diisi.");
      return;
    }
    if (!formData.peran.trim()) {
      setFormError("Peran / Jabatan wajib diisi.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError(null);
      const supabase = createClientSupabase();

      if (editingItem) {
        // Update operation
        const { error: err } = await supabase
          .from("guru_staf")
          .update({
            nama: formData.nama.trim(),
            peran: formData.peran.trim(),
          })
          .eq("id", editingItem.id);

        if (err) throw err;

        setItems((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  nama: formData.nama.trim(),
                  peran: formData.peran.trim(),
                }
              : item
          )
        );

        showToast("Data guru/staf berhasil diperbarui.");
      } else {
        // Insert operation
        const { data, error: err } = await supabase
          .from("guru_staf")
          .insert([
            {
              nama: formData.nama.trim(),
              peran: formData.peran.trim(),
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
              nama: data.nama || "",
              peran: data.peran || "",
            },
          ]);
        }

        showToast("Guru/staf baru berhasil ditambahkan.");
      }

      handleCloseModal();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan data.";
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
        .from("guru_staf")
        .delete()
        .eq("id", deleteTarget.id);

      if (err) throw err;

      setItems((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      showToast(`Data ${deleteTarget.nama} berhasil dihapus.`);
      setDeleteTarget(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus data.";
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
            <Users className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Pendidik & Tenaga Kependidikan
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manajemen Direktori Guru & Staf
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola daftar tenaga pendidik dan staf tata usaha SMAN 1 Tarik
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          + Tambah Guru / Staf
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama atau peran..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs text-slate-500 w-full sm:w-auto text-right font-medium">
          Total: <span className="font-semibold text-slate-800">{items.length}</span> personil
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchGuruStaf}
            className="text-xs font-semibold underline hover:no-underline cursor-pointer"
          >
            Coba lagi
          </button>
        </div>
      )}

      {/* Teachers Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6 w-16 text-center">No</th>
                <th className="py-4 px-6">Nama Lengkap & Gelar</th>
                <th className="py-4 px-6">Peran / Jabatan / Mata Pelajaran</th>
                <th className="py-4 px-6 text-right w-36">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-slate-200 rounded w-4 mx-auto" />
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 bg-slate-200 rounded w-48 mb-1.5" />
                      <div className="h-3 bg-slate-100 rounded w-24" />
                    </td>
                    <td className="py-4 px-6">
                      <div className="h-4 bg-slate-200 rounded w-36" />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="h-8 bg-slate-200 rounded-lg w-20 ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Users className="w-10 h-10 text-slate-300 stroke-1" />
                      <p className="font-medium text-slate-600">
                        {searchQuery
                          ? `Tidak ada hasil untuk pencarian "${searchQuery}"`
                          : "Belum ada data guru atau staf"}
                      </p>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="text-xs text-sky-600 hover:underline cursor-pointer"
                        >
                          Reset pencarian
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    <td className="py-4 px-6 text-center text-xs font-mono text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 text-xs font-bold">
                          {item.nama.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-slate-900">{item.nama}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                        <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                        {item.peran}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit guru/staf"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Hapus data"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form: Tambah / Edit */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-7 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingItem ? "Edit Data Guru / Staf" : "Tambah Guru / Staf Baru"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingItem
                      ? "Perbarui informasi nama atau jabatan"
                      : "Masukkan informasi guru atau pegawai baru"}
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
                  Nama Lengkap & Gelar <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nama: e.target.value }))}
                  placeholder="Contoh: Drs. Bambang Suryanto, M.Pd."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
              </div>

              {/* Input Peran */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Jabatan / Peran / Mata Pelajaran <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.peran}
                  onChange={(e) => setFormData((prev) => ({ ...prev, peran: e.target.value }))}
                  placeholder="Contoh: Guru Matematika / Kepala Sekolah / Staff TU"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
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
                  ) : editingItem ? (
                    "Simpan Perubahan"
                  ) : (
                    "Tambahkan Personil"
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
        title="Hapus Data Guru / Staf"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.nama}" (${deleteTarget?.peran}) dari direktori? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel={isDeleting ? "Menghapus..." : "Hapus Data"}
        cancelLabel="Batal"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
