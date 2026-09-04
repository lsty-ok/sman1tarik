"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Calendar,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  Loader2,
  X,
  RefreshCw,
} from "lucide-react";
import { createClientSupabase } from "@/lib/supabase/client";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import type { Agenda } from "@/lib/supabase/types";

interface AgendaFormData {
  title: string;
  date: string;
  descr: string;
}

const INITIAL_FORM_DATA: AgendaFormData = {
  title: "",
  date: "",
  descr: "",
};

export default function AdminAgendaPage() {
  const [items, setItems] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Modal Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Agenda | null>(null);
  const [formData, setFormData] = useState<AgendaFormData>(INITIAL_FORM_DATA);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Deletion state
  const [deleteTarget, setDeleteTarget] = useState<Agenda | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const fetchAgendaList = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClientSupabase();
      const { data, error: err } = await supabase
        .from("agenda")
        .select("*")
        .order("id", { ascending: false });

      if (err) throw err;

      const mapped: Agenda[] = (data || []).map((row) => ({
        id: String(row.id),
        title: row.title || "",
        date: row.date || "",
        descr: row.descr || "",
      }));

      setItems(mapped);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat agenda kegiatan.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgendaList();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const term = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(term) ||
        item.descr.toLowerCase().includes(term) ||
        item.date.toLowerCase().includes(term)
      );
    });
  }, [items, searchQuery]);

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setFormData(INITIAL_FORM_DATA);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (item: Agenda) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      date: item.date,
      descr: item.descr,
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

  // Handle Create / Update Submit
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError("Judul agenda kegiatan wajib diisi.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError(null);
      const supabase = createClientSupabase();

      if (editingItem) {
        // Update
        const { error: updateErr } = await supabase
          .from("agenda")
          .update({
            title: formData.title.trim(),
            date: formData.date.trim(),
            descr: formData.descr.trim(),
          })
          .eq("id", editingItem.id);

        if (updateErr) throw updateErr;

        setItems((prev) =>
          prev.map((it) =>
            it.id === editingItem.id
              ? {
                  ...it,
                  title: formData.title.trim(),
                  date: formData.date.trim(),
                  descr: formData.descr.trim(),
                }
              : it
          )
        );
        showToast("Agenda berhasil diperbarui!");
      } else {
        // Create
        const { data: inserted, error: insertErr } = await supabase
          .from("agenda")
          .insert([
            {
              title: formData.title.trim(),
              date: formData.date.trim(),
              descr: formData.descr.trim(),
            },
          ])
          .select()
          .single();

        if (insertErr) throw insertErr;

        if (inserted) {
          const newAgenda: Agenda = {
            id: String(inserted.id),
            title: inserted.title || "",
            date: inserted.date || "",
            descr: inserted.descr || "",
          };
          setItems((prev) => [newAgenda, ...prev]);
        } else {
          await fetchAgendaList();
        }
        showToast("Agenda baru berhasil ditambahkan!");
      }

      handleCloseModal();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan agenda.";
      setFormError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      const supabase = createClientSupabase();
      const { error: delErr } = await supabase
        .from("agenda")
        .delete()
        .eq("id", deleteTarget.id);

      if (delErr) throw delErr;

      setItems((prev) => prev.filter((it) => it.id !== deleteTarget.id));
      showToast(`Agenda "${deleteTarget.title}" berhasil dihapus.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus agenda.";
      alert(msg);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-5 duration-200 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Calendar className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Manajemen Agenda Kegiatan
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Kelola jadwal kegiatan sekolah, kalender akademik, dan agenda penting lainnya.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs hover:shadow-md active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Agenda</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari agenda berdasarkan judul atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs text-slate-500">
          <span>
            Total: <strong>{filteredItems.length}</strong> agenda
          </span>
          <button
            type="button"
            onClick={fetchAgendaList}
            title="Muat ulang data"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Content Table & States */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          /* Loading Skeleton */
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="flex items-center gap-4 animate-pulse p-4 rounded-xl border border-slate-100"
              >
                <div className="w-10 h-10 bg-slate-200 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="w-1/3 h-4 bg-slate-200 rounded" />
                  <div className="w-2/3 h-3 bg-slate-100 rounded" />
                </div>
                <div className="w-24 h-4 bg-slate-100 rounded shrink-0" />
                <div className="w-20 h-8 bg-slate-200 rounded-lg shrink-0" />
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 mb-3">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Gagal Memuat Agenda
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mt-1">{error}</p>
            <button
              type="button"
              onClick={fetchAgendaList}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Tidak ada agenda ditemukan
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mt-1">
              {searchQuery
                ? "Tidak ada agenda kegiatan yang cocok dengan kata kunci pencarian Anda."
                : "Belum ada agenda kegiatan yang dijadwalkan. Tambahkan agenda pertama sekarang."}
            </p>
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-blue-200"
              >
                Reset Pencarian
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                + Tambah Agenda Baru
              </button>
            )}
          </div>
        ) : (
          /* Table of Agenda */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 pl-6 pr-4">Judul Agenda</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Tanggal / Waktu</th>
                  <th className="py-3.5 px-4">Deskripsi Kegiatan</th>
                  <th className="py-3.5 pr-6 pl-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Title */}
                    <td className="py-4 pl-6 pr-4 min-w-[220px] max-w-xs align-top">
                      <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-start gap-2.5">
                        <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                          <Calendar className="w-4 h-4" />
                        </span>
                        <div>
                          <span>{item.title}</span>
                        </div>
                      </div>
                    </td>

                    {/* Date / Time */}
                    <td className="py-4 px-4 whitespace-nowrap align-top">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.date || "-"}</span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-4 px-4 min-w-[260px] max-w-lg align-top">
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {item.descr || <span className="text-slate-400 italic">Tidak ada rincian kegiatan.</span>}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pr-6 pl-4 text-right whitespace-nowrap align-top">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit agenda"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus agenda"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form for Create / Edit */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-7 text-left transform transition-all animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  {editingItem ? <Edit2 className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {editingItem ? "Edit Agenda" : "Tambah Agenda Baru"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingItem
                      ? "Perbarui rincian data kegiatan yang sudah dijadwalkan."
                      : "Isi informasi untuk mempublikasikan agenda kegiatan sekolah."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error in modal */}
            {formError && (
              <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmitForm} className="mt-5 space-y-4">
              {/* Judul Kegiatan */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Judul Kegiatan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Class Meeting Semester Ganjil"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
                />
              </div>

              {/* Tanggal Pelaksanaan */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Tanggal Pelaksanaan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 15 Juli 2026 atau 12 - 14 Agustus 2026"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
                />
                <p className="text-[11px] text-slate-400">
                  misal: 15 Juli 2026 atau 12 - 14 Agustus 2026
                </p>
              </div>

              {/* Deskripsi Kegiatan */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Deskripsi / Rincian Kegiatan
                </label>
                <textarea
                  rows={4}
                  placeholder="Tulis rincian kegiatan, lokasi, peserta, atau catatan penting lainnya..."
                  value={formData.descr}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, descr: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-xs hover:shadow-md active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>Simpan Agenda</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Deletion Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Hapus Agenda Kegiatan?"
        message={`Apakah Anda yakin ingin menghapus agenda "${deleteTarget?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel={isDeleting ? "Menghapus..." : "Hapus Agenda"}
        cancelLabel="Batal"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (!isDeleting) setDeleteTarget(null);
        }}
      />
    </div>
  );
}
