"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  Newspaper,
  Calendar,
  Filter,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { createClientSupabase } from "@/lib/supabase/client";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import type { Berita } from "@/lib/supabase/types";

const CATEGORIES = [
  "Semua",
  "Kesiswaan",
  "Akademik",
  "Prestasi",
  "Informasi",
  "Ekstrakurikuler",
];

function getCategoryBadgeColor(category: string | null | undefined): string {
  switch (category?.toLowerCase()) {
    case "kesiswaan":
      return "bg-blue-50 text-blue-700 border-blue-200/60";
    case "akademik":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
    case "prestasi":
      return "bg-amber-50 text-amber-700 border-amber-200/60";
    case "informasi":
      return "bg-indigo-50 text-indigo-700 border-indigo-200/60";
    case "ekstrakurikuler":
      return "bg-rose-50 text-rose-700 border-rose-200/60";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200/60";
  }
}

function formatDateIndonesian(dateString: string | null | undefined): string {
  if (!dateString) return "-";
  try {
    const d = new Date(dateString.includes("T") ? dateString : `${dateString}T00:00:00`);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return dateString;
  }
}

export default function AdminBeritaPage() {
  const [items, setItems] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Deletion state
  const [deleteTarget, setDeleteTarget] = useState<Berita | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchBeritaList = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClientSupabase();
      const { data, error: err } = await supabase
        .from("berita")
        .select("*")
        .order("date", { ascending: false });

      if (err) throw err;

      const mapped: Berita[] = (data || []).map((row) => ({
        id: String(row.id),
        title: row.title || "",
        date: String(row.date || ""),
        category: row.category || "Informasi",
        excerpt: row.excerpt || "",
        image: row.image || "",
        content: Array.isArray(row.content) ? row.content : [],
      }));

      setItems(mapped);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat daftar berita.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeritaList();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      const supabase = createClientSupabase();
      const { error: delErr } = await supabase
        .from("berita")
        .delete()
        .eq("id", deleteTarget.id);

      if (delErr) throw delErr;

      setItems((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      setToastMessage(`Berita "${deleteTarget.title}" berhasil dihapus.`);
      setDeleteTarget(null);

      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus berita.";
      alert(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-xl shadow-emerald-900/20 text-sm font-medium animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Berita & Artikel
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola publikasi berita, pengumuman resmi, dan liputan kegiatan sekolah.
          </p>
        </div>

        <Link
          href="/admin/berita/baru"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/20 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tulis Berita Baru</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari berita berdasarkan judul atau ringkasan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2 sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 pl-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Kategori:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={fetchBeritaList}
            title="Muat Ulang"
            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="flex-1">{error}</span>
          <button
            onClick={fetchBeritaList}
            className="text-xs font-semibold underline hover:no-underline"
          >
            Coba lagi
          </button>
        </div>
      )}

      {/* Table & Content Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          /* Loading skeleton */
          <div className="p-6 space-y-4">
            <div className="h-6 w-48 bg-slate-200 rounded animate-pulse mb-6" />
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 py-3 border-b border-slate-100 animate-pulse"
              >
                <div className="w-16 h-12 bg-slate-200 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="w-2/3 h-4 bg-slate-200 rounded" />
                  <div className="w-1/3 h-3 bg-slate-100 rounded" />
                </div>
                <div className="w-20 h-6 bg-slate-200 rounded-full shrink-0" />
                <div className="w-24 h-4 bg-slate-100 rounded shrink-0" />
                <div className="w-20 h-8 bg-slate-200 rounded-lg shrink-0" />
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
              <Newspaper className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Tidak ada berita ditemukan
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mt-1">
              {searchQuery || selectedCategory !== "Semua"
                ? "Tidak ada berita yang cocok dengan kriteria pencarian Anda. Coba sesuaikan kata kunci atau filter kategori."
                : "Belum ada berita atau artikel yang dipublikasikan. Mulai buat berita baru sekarang."}
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
                Reset Pencarian
              </button>
            ) : (
              <Link
                href="/admin/berita/baru"
                className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                Tulis Berita Baru
              </Link>
            )}
          </div>
        ) : (
          /* Table of News */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 pl-6 pr-3">Sampul</th>
                  <th className="py-3.5 px-4">Judul & Ringkasan</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Tanggal Terbit</th>
                  <th className="py-3.5 pr-6 pl-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Thumbnail */}
                    <td className="py-3 pl-6 pr-3 shrink-0">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                            <Newspaper className="w-5 h-5 opacity-40" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title + Excerpt */}
                    <td className="py-3 px-4 min-w-[240px] max-w-md">
                      <h4 className="font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {item.excerpt || "Tidak ada ringkasan."}
                      </p>
                    </td>

                    {/* Category pill */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeColor(
                          item.category
                        )}`}
                      >
                        {item.category || "Umum"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 whitespace-nowrap text-xs text-slate-500">
                      <div className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formatDateIndonesian(item.date)}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 pr-6 pl-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Lihat di Web */}
                        <Link
                          href={`/berita/${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Lihat di Web publik"
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="hidden xl:inline">Web</span>
                        </Link>

                        {/* Edit button */}
                        <Link
                          href={`/admin/berita/${item.id}`}
                          title="Edit Berita"
                          className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                        >
                          <Edit className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </Link>

                        {/* Hapus button */}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          title="Hapus Berita"
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
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

        {/* Footer Summary */}
        {!loading && filteredItems.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-500 flex items-center justify-between">
            <span>
              Menampilkan {filteredItems.length} dari {items.length} total berita
            </span>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Hapus Berita?"
        message={`Apakah Anda yakin ingin menghapus berita "${deleteTarget?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel={isDeleting ? "Menghapus..." : "Hapus Berita"}
        cancelLabel="Batal"
        isDestructive
        onConfirm={handleDeleteConfirm}
        onCancel={() => !isDeleting && setDeleteTarget(null)}
      />
    </div>
  );
}
