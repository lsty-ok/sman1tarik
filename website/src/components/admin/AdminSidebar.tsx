"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  Trophy,
  Image as ImageIcon,
  Users,
  Building2,
  MessageSquare,
  ExternalLink,
  X,
} from "lucide-react";

export interface AdminSidebarProps {
  currentPath: string;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "Berita & Pengumuman",
    href: "/admin/berita",
    icon: Newspaper,
  },
  {
    name: "Agenda Kegiatan",
    href: "/admin/agenda",
    icon: Calendar,
  },
  {
    name: "Prestasi Siswa",
    href: "/admin/prestasi",
    icon: Trophy,
  },
  {
    name: "Galeri Foto",
    href: "/admin/galeri",
    icon: ImageIcon,
  },
  {
    name: "Guru & Staf",
    href: "/admin/guru-staf",
    icon: Users,
  },
  {
    name: "Fasilitas",
    href: "/admin/fasilitas",
    icon: Building2,
  },
  {
    name: "Sambutan Kepala Sekolah",
    href: "/admin/sambutan",
    icon: MessageSquare,
  },
];

export default function AdminSidebar({
  currentPath,
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const isLinkActive = (href: string, exact?: boolean) => {
    if (exact) {
      return currentPath === href;
    }
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-white select-none">
      {/* Header / Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden bg-white/10 p-1 flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Logo SMAN 1 Tarik"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
              Admin SMAN 1 Tarik
            </h1>
            <p className="text-xs text-slate-400 font-medium">Portal Manajemen</p>
          </div>
        </Link>
        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup Menu"
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
        {navItems.map((item) => {
          const active = isLinkActive(item.href, item.exact);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-colors ${
                  active ? "text-white" : "text-slate-400 group-hover:text-white"
                }`}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / External Link */}
      <div className="p-4 border-t border-slate-800">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors group"
        >
          <span className="flex items-center gap-2.5">
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
            <span>Lihat Website Publik</span>
          </span>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-800 group-hover:bg-slate-700 px-2 py-0.5 rounded uppercase tracking-wider">
            Web
          </span>
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 h-screen z-30 shadow-xl shadow-black/10">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-visibility duration-300 ${
          isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop blur & dark overlay */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />

        {/* Drawer panel */}
        <div
          className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] h-full shadow-2xl transition-transform duration-300 ease-out transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
}
