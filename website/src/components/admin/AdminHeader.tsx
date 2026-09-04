"use client";

import { Menu, LogOut, User } from "lucide-react";

export interface AdminHeaderProps {
  userEmail?: string;
  onLogout: () => void;
  onToggleSidebar: () => void;
  title: string;
}

export default function AdminHeader({
  userEmail,
  onLogout,
  onToggleSidebar,
  title,
}: AdminHeaderProps) {
  // Compute user initial if email is provided
  const initial = userEmail ? userEmail.trim().charAt(0).toUpperCase() : null;

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Left Side: Mobile Menu Button & Title */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Buka Menu Navigasi"
            className="lg:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="font-bold text-slate-800 text-lg sm:text-xl truncate">
            {title}
          </h1>
        </div>

        {/* Right Side: User Profile & Logout Action */}
        <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
          {/* User Display */}
          {userEmail && (
            <div className="flex items-center gap-2.5 max-w-[200px] sm:max-w-xs">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-xs flex-shrink-0 ring-2 ring-blue-50">
                {initial || <User className="w-4 h-4 text-blue-600" />}
              </div>
              <div className="hidden sm:block text-left truncate">
                <p className="text-xs font-semibold text-slate-700 truncate">
                  {userEmail}
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                  Administrator
                </p>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200 hover:border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden xs:inline sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
