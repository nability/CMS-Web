// src/layouts/Topbar.jsx
import { Bell, Menu, Search, LogOut, User, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ onToggleSidebar }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } finally {
      setLoggingOut(false);
    }
  };

  // Ambil nama dari displayName atau bagian awal email
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Admin";

  return (
    <header className="h-16 bg-surface border-b border-gray-200 shadow-header flex items-center justify-between px-6 flex-shrink-0">
      {/* ── Left: Hamburger + Search ── */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-150"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Cari konten..."
            className="pl-9 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg w-64
                       focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20
                       transition-all duration-150"
          />
        </div>
      </div>

      {/* ── Right: Notifications + Avatar ── */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-150"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* User Avatar */}
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <User size={15} className="text-white" />
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight capitalize">
              {displayName}
            </p>
            <p className="text-xs text-gray-500 leading-tight">Bawaslu RI</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors duration-150 disabled:opacity-50"
          aria-label="Logout"
          title="Keluar"
        >
          {loggingOut ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <LogOut size={18} />
          )}
        </button>
      </div>
    </header>
  );
}
