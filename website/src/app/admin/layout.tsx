"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { createClientSupabase } from "@/lib/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

function getPageTitle(pathname: string): string {
  if (pathname === "/admin") return "Dashboard";
  if (pathname.startsWith("/admin/berita")) return "Manajemen Berita";
  if (pathname.startsWith("/admin/agenda")) return "Manajemen Agenda";
  if (pathname.startsWith("/admin/prestasi")) return "Manajemen Prestasi";
  if (pathname.startsWith("/admin/galeri")) return "Manajemen Galeri Foto";
  if (pathname.startsWith("/admin/guru-staf")) return "Manajemen Guru & Staf";
  if (pathname.startsWith("/admin/fasilitas")) return "Manajemen Fasilitas";
  if (pathname.startsWith("/admin/sambutan")) return "Sambutan Kepala Sekolah";
  return "Portal Admin";
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const supabase = createClientSupabase();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);

      if (!session && pathname !== "/admin/login") {
        router.replace("/admin/login");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && pathname !== "/admin/login") {
        router.replace("/admin/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  // If on login page, allow through without shell or redirect
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Full-screen loading skeleton/spinner while verifying session
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm font-medium text-slate-300">
            Memverifikasi sesi admin...
          </p>
        </div>
      </div>
    );
  }

  // If authenticated but router redirect hasn't completed yet (no session)
  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    const supabase = createClientSupabase();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const title = getPageTitle(pathname || "/admin");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar
        currentPath={pathname || "/admin"}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader
          userEmail={session.user.email}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          title={title}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
