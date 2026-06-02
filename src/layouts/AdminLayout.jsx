import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Sidebar ── */}
      <Sidebar collapsed={sidebarCollapsed} />

      {/* ── Main Area (Topbar + Content) ── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)} />

        {/* ── Scrollable Page Content ── */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
