import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ChevronRight,
  Shield,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    label: "Konten",
    icon: FileText,
    to: "/content",
  },
  {
    label: "Pengguna",
    icon: Users,
    to: "/users",
  },
  {
    label: "Pengaturan",
    icon: Settings,
    to: "/settings",
  },
];

export default function Sidebar({ collapsed }) {
  return (
    <aside
      className={clsx(
        "flex flex-col h-screen bg-sidebar text-sidebar-text transition-all duration-300 ease-in-out flex-shrink-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* ── Logo / Brand ── */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary flex-shrink-0">
          <Shield size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm leading-tight">Bawaslu</p>
            <p className="text-sidebar-text text-xs">CMS Dashboard</p>
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group",
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-sidebar-text hover:bg-white/10 hover:text-white"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  className={clsx(
                    "flex-shrink-0 transition-transform duration-150",
                    !isActive && "group-hover:scale-110"
                  )}
                />
                {!collapsed && (
                  <span className="text-sm font-medium truncate flex-1">
                    {label}
                  </span>
                )}
                {!collapsed && isActive && (
                  <ChevronRight size={14} className="flex-shrink-0 opacity-70" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ── */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-xs text-sidebar-text/60 text-center">
            © 2025 Bawaslu RI
          </p>
        </div>
      )}
    </aside>
  );
}
