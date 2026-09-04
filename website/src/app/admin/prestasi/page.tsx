"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  Trophy,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Filter,
  Calendar,
  Tag,
  Loader2,
  X,
  RefreshCw,
  Award,
} from "lucide-react";
import { createClientSupabase } from "@/lib/supabase/client";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUploader from "@/components/admin/ImageUploader";
import type { Prestasi } from "@/lib/supabase/types";

const CATEGORY_OPTIONS = [
  "Akademik",
  "Seni & Bahasa",
  "Olahraga",
  "Teknologi",
  "Lainnya",
];

const FILTER_CATEGORIES = [
  "Semua",
  "Akademik",
  "Seni & Bahasa",
  "Olahraga",
  "Teknologi",
  "Lainnya",
];

interface PrestasiFormData {
  title: string;
  kategori: string;
  tahun: string;
  descr: string;
  image: string;
}

const INITIAL_FORM_DATA: PrestasiFormData = {
  title: "",
  kategori: "Akademik",
  tahun: new Date().getFullYear().toString(),
  descr: "",
  image: "",
};

function getCategoryBadgeColor(kategori: string | null | undefined): string {
  const norm = kategori?.toLowerCase() || "";
  if (norm.includes("akademik") && !norm.includes("non")) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
  }
  if (norm.includes("seni") || norm.includes("budaya") || norm.includes("bahasa")) {
    return "bg-purple-50 text-purple-700 border-purple-200/80";
  }
  if (norm.includes("olahraga")) {
    return "bg-amber-50 text-amber-700 border-amber-200/80";
  }
  if (norm.includes("teknologi")) {
    return "bg-blue-50 text-blue-700 border-blue-200/80";
  }
  return "bg-slate-100 text-slate-700 border-slate-200";
}

export default function AdminPrestasiPage() {
  const [items, setItems] = useState<Prestasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search and Category Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Modal Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Prestasi | null>(null);
  const [formData, setFormData] = useState<PrestasiFormData>(INITIAL_FORM_DATA);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Deletion state
  const [deleteTarget, setDeleteTarget] = useState<Prestasi | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const fetchPrestasiList = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClientSupabase();
      const { data, error: err } = await supabase
        .from("prestasi")
        .select("*")
        .order("tahun", { ascending: false });

      if (err) throw err;

      const mapped: Prestasi[] = (data || []).map((row) => ({
        id: String(row.id),
        title: row.title || "",
        kategori: row.kategori || "Lainnya",
        tahun: String(row.tahun || ""),
        descr: row.descr || "",
        image: row.image || "",
      }));

      setItems(mapped);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat data prestasi.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestasiList();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const term = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(term) ||
        item.descr.toLowerCase().includes(term) ||
        item.tahun.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === "Semua" ||
        item.kategori.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setFormData({
      ...INITIAL_FORM_DATA,
      tahun: new Date().getFullYear().toString(),
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (item: Prestasi) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      kategori: item.kategori || "Akademik",
      tahun: item.tahun || "",
      descr: item.descr || "",
      image: item.image || "",
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
      setFormError("Judul prestasi wajib diisi.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError(null);
      const supabase = createClientSupabase();

      if (editingItem) {
        // Update
        const { error: updateErr } = await supabase
          .from("prestasi")
          .update({
            title: formData.title.trim(),
            kategori: formData.kategori.trim(),
            tahun: formData.tahun.trim(),
            descr: formData.descr.trim(),
            image: formData.image.trim(),
          })
          .eq("id", editingItem.id);

        if (updateErr) throw updateErr;

        setItems((prev) =>
          prev.map((it) =>
            it.id === editingItem.id
              ? {
                  ...it,
                  title: formData.title.trim(),
                  kategori: formData.kategori.trim(),
                  tahun: formData.tahun.trim(),
                  descr: formData.descr.trim(),
                  image: formData.image.trim(),
                }
              : it
          )
        );
        showToast("Prestasi berhasil diperbarui!");
      } else {
        // Create
        const { data: inserted, error: insertErr } = await supabase
          .from("prestasi")
          .insert([
            {
              title: formData.title.trim(),
              kategori: formData.kategori.trim(),
              tahun: formData.tahun.trim(),
              descr: formData.descr.trim(),
              image: formData.image.trim(),
            },
          ])
          .select()
          .single();

        if (insertErr) throw insertErr;

        if (inserted) {
          const newPrestasi: Prestasi = {
            id: String(inserted.id),
            title: inserted.title || "",
            kategori: inserted.kategori || "Lainnya",
            tahun: String(inserted.tahun || ""),
            descr: inserted.descr || "",
            image: inserted.image || "",
          };
          setItems((prev) => [newPrestasi, ...prev]);
        } else {
          await fetchPrestasiList();
        }
        showToast("Prestasi baru berhasil ditambahkan!");
      }

      handleCloseModal();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan prestasi.";
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
        .from("prestasi")
        .delete()
        .eq("id", deleteTarget.id);

      if (delErr) throw delErr;

      setItems((prev) => prev.filter((it) => it.id !== deleteTarget.id));
      showToast(`Prestasi "${deleteTarget.title}" berhasil dihapus.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus prestasi.";
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
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Trophy className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Manajemen Prestasi Siswa
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Dokumentasikan pencapaian, kejuaraan, piagam penghargaan, dan prestasi membanggakan siswa.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs hover:shadow-md active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Input Prestasi Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul prestasi, tahun..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Category Dropdown Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-48">
              <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter kategori prestasi"
                className="w-full pl-10 pr-8 py-2 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 appearance-none cursor-pointer"
              >
                {FILTER_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "Semua" ? "Semua Kategori" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs text-slate-500">
          <span>
            Total: <strong>{filteredItems.length}</strong> prestasi
          </span>
          <button
            type="button"
            onClick={fetchPrestasiList}
            title="Muat ulang data"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Content: Table / Card Display */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          /* Loading Skeleton */
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="flex items-center gap-4 animate-pulse p-4 rounded-xl border border-slate-100"
              >
                <div className="w-16 h-14 bg-slate-200 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="w-1/3 h-4 bg-slate-200 rounded" />
                  <div className="w-2/3 h-3 bg-slate-100 rounded" />
                </div>
                <div className="w-20 h-6 bg-slate-200 rounded-full shrink-0" />
                <div className="w-16 h-4 bg-slate-100 rounded shrink-0" />
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
              Gagal Memuat Prestasi
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mt-1">{error}</p>
            <button
              type="button"
              onClick={fetchPrestasiList}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Tidak ada prestasi ditemukan
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mt-1">
              {searchQuery || selectedCategory !== "Semua"
                ? "Tidak ada data prestasi yang cocok dengan pencarian atau filter kategori saat ini."
                : "Belum ada catatan prestasi yang diinputkan. Mulai dokumentasikan prestasi siswa."}
            </p>
            {searchQuery || selectedCategory !== "Semua" ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Semua");
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-blue-200"
              >
                Reset Filter & Pencarian
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                + Input Prestasi Baru
              </button>
            )}
          </div>
        ) : (
          /* Table of Prestasi */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 pl-6 pr-3">Piagam / Foto</th>
                  <th className="py-3.5 px-4">Judul & Deskripsi</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Tahun</th>
                  <th className="py-3.5 pr-6 pl-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Thumbnail / Trophy Fallback */}
                    <td className="py-3.5 pl-6 pr-3 shrink-0 align-top">
                      <div className="relative w-16 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-amber-500 bg-amber-50/80">
                            <Trophy className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title and Short Description */}
                    <td className="py-3.5 px-4 min-w-[240px] max-w-md align-top">
                      <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {item.descr || <span className="text-slate-400 italic">Tidak ada deskripsi.</span>}
                      </p>
                    </td>

                    {/* Kategori Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap align-top">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeColor(
                          item.kategori
                        )}`}
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>{item.kategori || "Lainnya"}</span>
                      </span>
                    </td>

                    {/* Tahun */}
                    <td className="py-3.5 px-4 whitespace-nowrap align-top">
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.tahun || "-"}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 pr-6 pl-4 text-right whitespace-nowrap align-top">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit prestasi"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus prestasi"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-xl my-8 overflow-hidden bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-7 text-left transform transition-all animate-in zoom-in-95 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                  {editingItem ? <Edit2 className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {editingItem ? "Edit Prestasi" : "Input Prestasi Baru"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingItem
                      ? "Perbarui detail pencapaian dan piagam prestasi siswa."
                      : "Lengkapi informasi prestasi dan upload foto/piagam bukti kejuaraan."}
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
              <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2 shrink-0">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form with internal scroll */}
            <form onSubmit={handleSubmitForm} className="mt-5 space-y-4 overflow-y-auto pr-1 flex-1">
              {/* Judul Prestasi */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Judul Prestasi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Juara 1 Lomba Cerdas Cermat Tingkat Provinsi"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
                />
              </div>

              {/* Kategori & Tahun Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Kategori */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Kategori
                  </label>
                  <select
                    value={formData.kategori}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, kategori: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 cursor-pointer"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tahun */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Tahun
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 2026"
                    value={formData.tahun}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, tahun: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
                  />
                </div>
              </div>

              {/* Deskripsi */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Deskripsi Prestasi
                </label>
                <textarea
                  rows={3}
                  placeholder="Keterangan singkat mengenai lomba, penyelenggara, atau peraih prestasi..."
                  value={formData.descr}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, descr: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 resize-none"
                />
              </div>

              {/* Foto Dokumentasi / Piagam with ImageUploader */}
              <div className="space-y-1.5 pt-1">
                <ImageUploader
                  value={formData.image}
                  onChange={(url) =>
                    setFormData((prev) => ({ ...prev, image: url }))
                  }
                  folder="prestasi"
                  label="Foto Kegiatan / Piagam"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 shrink-0">
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
                    <span>Simpan Prestasi</span>
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
        title="Hapus Prestasi Siswa?"
        message={`Apakah Anda yakin ingin menghapus data prestasi "${deleteTarget?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel={isDeleting ? "Menghapus..." : "Hapus Prestasi"}
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
