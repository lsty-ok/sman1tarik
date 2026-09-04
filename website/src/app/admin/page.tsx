"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  Calendar,
  Trophy,
  Users,
  Image as ImageIcon,
  Building2,
  PlusCircle,
  FileEdit,
  ArrowRight,
  Database,
  ExternalLink,
  Clock,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { createClientSupabase } from "@/lib/supabase/client";

interface StatItem {
  name: string;
  count: number;
  icon: typeof Newspaper;
  href: string;
  color: string;
  bgColor: string;
  badge: string;
}

interface LatestBerita {
  id: string;
  title: string;
  date: string | null;
  category: string | null;
}

interface LatestAgenda {
  id: string;
  title: string;
  date: string | null;
  descr: string | null;
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Counts
  const [counts, setCounts] = useState({
    berita: 0,
    agenda: 0,
    prestasi: 0,
    guruStaf: 0,
    galeri: 0,
    fasilitas: 0,
  });

  // Recent data
  const [latestBerita, setLatestBerita] = useState<LatestBerita[]>([]);
  const [latestAgenda, setLatestAgenda] = useState<LatestAgenda[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        const supabase = createClientSupabase();

        // Run counts and recent lists concurrently
        const [
          beritaCountRes,
          agendaCountRes,
          prestasiCountRes,
          guruStafCountRes,
          galeriCountRes,
          fasilitasCountRes,
          latestBeritaRes,
          latestAgendaRes,
        ] = await Promise.allSettled([
          supabase.from("berita").select("*", { count: "exact", head: true }),
          supabase.from("agenda").select("*", { count: "exact", head: true }),
          supabase.from("prestasi").select("*", { count: "exact", head: true }),
          supabase.from("guru_staf").select("*", { count: "exact", head: true }),
          supabase.from("galeri").select("*", { count: "exact", head: true }),
          supabase.from("fasilitas").select("*", { count: "exact", head: true }),
          supabase
            .from("berita")
            .select("id, title, date, category")
            .order("date", { ascending: false })
            .limit(4),
          supabase
            .from("agenda")
            .select("id, title, date, descr")
            .order("date", { ascending: true })
            .limit(3),
        ]);

        if (!isMounted) return;

        // Extract counts safely
        const beritaCount =
          beritaCountRes.status === "fulfilled" && beritaCountRes.value.count !== null
            ? beritaCountRes.value.count
            : 0;
        const agendaCount =
          agendaCountRes.status === "fulfilled" && agendaCountRes.value.count !== null
            ? agendaCountRes.value.count
            : 0;
        const prestasiCount =
          prestasiCountRes.status === "fulfilled" && prestasiCountRes.value.count !== null
            ? prestasiCountRes.value.count
            : 0;
        const guruStafCount =
          guruStafCountRes.status === "fulfilled" && guruStafCountRes.value.count !== null
            ? guruStafCountRes.value.count
            : 0;
        const galeriCount =
          galeriCountRes.status === "fulfilled" && galeriCountRes.value.count !== null
            ? galeriCountRes.value.count
            : 0;
        const fasilitasCount =
          fasilitasCountRes.status === "fulfilled" && fasilitasCountRes.value.count !== null
            ? fasilitasCountRes.value.count
            : 0;

        setCounts({
          berita: beritaCount,
          agenda: agendaCount,
          prestasi: prestasiCount,
          guruStaf: guruStafCount,
          galeri: galeriCount,
          fasilitas: fasilitasCount,
        });

        // Extract latest lists safely
        if (latestBeritaRes.status === "fulfilled" && latestBeritaRes.value.data) {
          setLatestBerita(latestBeritaRes.value.data as LatestBerita[]);
        }
        if (latestAgendaRes.status === "fulfilled" && latestAgendaRes.value.data) {
          setLatestAgenda(latestAgendaRes.value.data as LatestAgenda[]);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const todayIndonesian = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const stats: StatItem[] = [
    {
      name: "Berita & Artikel",
      count: counts.berita,
      icon: Newspaper,
      href: "/admin/berita",
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-100",
      badge: "Publikasi",
    },
    {
      name: "Agenda Kegiatan",
      count: counts.agenda,
      icon: Calendar,
      href: "/admin/agenda",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 border-emerald-100",
      badge: "Jadwal",
    },
    {
      name: "Prestasi Siswa",
      count: counts.prestasi,
      icon: Trophy,
      href: "/admin/prestasi",
      color: "text-amber-600",
      bgColor: "bg-amber-50 border-amber-100",
      badge: "Pencapaian",
    },
    {
      name: "Guru & Staf",
      count: counts.guruStaf,
      icon: Users,
      href: "/admin/guru-staf",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 border-indigo-100",
      badge: "Personel",
    },
    {
      name: "Galeri Foto",
      count: counts.galeri,
      icon: ImageIcon,
      href: "/admin/galeri",
      color: "text-rose-600",
      bgColor: "bg-rose-50 border-rose-100",
      badge: "Dokumentasi",
    },
    {
      name: "Sarana & Fasilitas",
      count: counts.fasilitas,
      icon: Building2,
      href: "/admin/fasilitas",
      color: "text-sky-600",
      bgColor: "bg-sky-50 border-sky-100",
      badge: "Infrastruktur",
    },
  ];

  const quickActions = [
    {
      label: "Tulis Berita Baru",
      href: "/admin/berita/baru",
      icon: PlusCircle,
      variant: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20",
    },
    {
      label: "Tambah Agenda",
      href: "/admin/agenda",
      icon: Calendar,
      variant: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20",
    },
    {
      label: "Input Prestasi",
      href: "/admin/prestasi",
      icon: Trophy,
      variant: "bg-amber-600 text-white hover:bg-amber-700 shadow-amber-500/20",
    },
    {
      label: "Upload Foto Galeri",
      href: "/admin/galeri",
      icon: ImageIcon,
      variant: "bg-rose-600 text-white hover:bg-rose-700 shadow-rose-500/20",
    },
    {
      label: "Edit Sambutan",
      href: "/admin/sambutan",
      icon: FileEdit,
      variant: "bg-slate-800 text-white hover:bg-slate-900 shadow-slate-900/20",
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl shadow-slate-900/10 border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Database className="w-3.5 h-3.5" />
              <span>Sistem Terhubung ke Database Supabase</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Selamat Datang di Portal Manajemen SMAN 1 Tarik
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl font-medium">
              Kelola berita, pengumuman, agenda sekolah, data guru, prestasi, dan
              seluruh informasi digital sekolah dengan mudah dan terpusat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 self-start md:self-auto">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                Hari Ini
              </p>
              <p className="text-sm font-bold text-white capitalize">
                {todayIndonesian}
              </p>
            </div>
          </div>
        </div>

        {/* Ambient decorative glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Graceful Error Notification */}
      {hasError && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            Beberapa data gagal disinkronkan langsung dari server. Anda masih dapat
            mengakses menu manajemen secara manual di bawah.
          </span>
        </div>
      )}

      {/* 2. Quick Actions Bar */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Aksi Cepat
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 ${action.variant}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. Stats Grid */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Ringkasan Statistik Konten
          </h2>
          <span className="text-xs text-slate-600 font-medium">Real-time counts</span>
        </div>

        {loading ? (
          /* Loading Skeleton Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm animate-pulse space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-slate-200 rounded-xl" />
                  <div className="w-12 h-4 bg-slate-200 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-7 bg-slate-200 rounded" />
                  <div className="w-20 h-4 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link
                  key={stat.name}
                  href={stat.href}
                  className="group bg-white hover:bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stat.bgColor} ${stat.color} transition-transform group-hover:scale-105`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 group-hover:bg-slate-200 px-2 py-0.5 rounded-full transition-colors">
                      {stat.badge}
                    </span>
                  </div>

                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {stat.count}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {stat.name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Recent Activities Section (2 Columns on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Berita Terbaru */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Newspaper className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Berita Terbaru
                </h3>
                <p className="text-xs text-slate-600">4 artikel berita terkini</p>
              </div>
            </div>
            <Link
              href="/admin/berita"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-100 space-y-2 animate-pulse"
                  >
                    <div className="flex gap-2">
                      <div className="w-16 h-4 bg-slate-200 rounded" />
                      <div className="w-24 h-4 bg-slate-200 rounded" />
                    </div>
                    <div className="w-full h-5 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            ) : latestBerita.length === 0 ? (
              <div className="py-10 text-center flex flex-col items-center justify-center">
                <Newspaper className="w-10 h-10 text-slate-300 mb-2" />
                <p className="text-sm font-semibold text-slate-600">Belum ada berita</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Mulai publikasikan berita atau artikel baru untuk sekolah.
                </p>
                <Link
                  href="/admin/berita/baru"
                  className="mt-4 px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700"
                >
                  Tulis Berita
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {latestBerita.map((item) => (
                  <div
                    key={item.id}
                    className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-semibold text-[11px]">
                          {item.category || "Umum"}
                        </span>
                        <span className="text-slate-600">
                          {item.date ? String(item.date) : "Tanpa tanggal"}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors truncate">
                        {item.title}
                      </h4>
                    </div>

                    <Link
                      href={`/admin/berita`}
                      className="shrink-0 p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-colors text-xs font-medium inline-flex items-center gap-1"
                      title="Edit Berita"
                    >
                      <FileEdit className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Edit</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Agenda Mendatang */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Agenda Mendatang
                </h3>
                <p className="text-xs text-slate-600">Jadwal kegiatan sekolah</p>
              </div>
            </div>
            <Link
              href="/admin/agenda"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-100 space-y-2 animate-pulse"
                  >
                    <div className="w-24 h-4 bg-slate-200 rounded" />
                    <div className="w-3/4 h-5 bg-slate-200 rounded" />
                    <div className="w-full h-4 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            ) : latestAgenda.length === 0 ? (
              <div className="py-10 text-center flex flex-col items-center justify-center">
                <Calendar className="w-10 h-10 text-slate-300 mb-2" />
                <p className="text-sm font-semibold text-slate-600">Belum ada agenda</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Tambahkan agenda atau jadwal kegiatan resmi sekolah.
                </p>
                <Link
                  href="/admin/agenda"
                  className="mt-4 px-3.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700"
                >
                  Tambah Agenda
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {latestAgenda.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-50/70 border border-slate-100/90 hover:border-emerald-200 hover:bg-emerald-50/20 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.date || "Jadwal Belum Ditentukan"}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {item.title}
                    </h4>
                    {item.descr && (
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {item.descr}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>Kelola jadwal ujian, libur, dan event</span>
              <Link
                href="/admin/agenda"
                className="font-medium text-emerald-600 hover:underline inline-flex items-center gap-1"
              >
                <span>Kelola Agenda</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
