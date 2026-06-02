// src/pages/dashboard/DashboardPage.jsx
import { useMemo } from "react";
import {
  FileText,
  CheckCircle2,
  Clock,
  Users,
  PlusCircle,
  UsersRound,
  BarChart3,
  Eye,
  Calendar,
  ArrowRight,
} from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import Badge from "../../components/ui/Badge";
import { useAuth } from "../../context/AuthContext";

// ── Mock data ─────────────────────────────────────────────────────────────────
// TODO: Ganti dengan data real dari Firestore setelah Firebase dikonfigurasi
const MOCK_STATS = [
  {
    label: "Total Konten",
    value: "128",
    icon: FileText,
    color: "orange",
    trend: "up",
    trendLabel: "+12 bulan ini",
  },
  {
    label: "Diterbitkan",
    value: "94",
    icon: CheckCircle2,
    color: "emerald",
    trend: "up",
    trendLabel: "+8 bulan ini",
  },
  {
    label: "Menunggu Review",
    value: "17",
    icon: Clock,
    color: "blue",
    trend: "neutral",
    trendLabel: "Tidak ada perubahan",
  },
  {
    label: "Total Pengguna",
    value: "32",
    icon: Users,
    color: "violet",
    trend: "up",
    trendLabel: "+3 bulan ini",
  },
];

const MOCK_RECENT = [
  {
    id: 1,
    title: "Bawaslu Gelar Rapat Koordinasi Pengawasan Pemilu 2025",
    category: "Berita",
    status: "published",
    author: "Ahmad Fauzi",
    views: 1240,
    date: "10 Mei 2025",
  },
  {
    id: 2,
    title: "Panduan Teknis Pelaporan Pelanggaran Pemilu",
    category: "Panduan",
    status: "draft",
    author: "Siti Rahayu",
    views: 0,
    date: "9 Mei 2025",
  },
  {
    id: 3,
    title: "Hasil Pengawasan Tahap Kampanye Wilayah Jabodetabek",
    category: "Laporan",
    status: "review",
    author: "Budi Santoso",
    views: 0,
    date: "8 Mei 2025",
  },
  {
    id: 4,
    title: "Siaran Pers: Bawaslu Terima 340 Laporan Pelanggaran",
    category: "Siaran Pers",
    status: "published",
    author: "Dewi Kartika",
    views: 3870,
    date: "7 Mei 2025",
  },
  {
    id: 5,
    title: "Infografis: Tahapan Pengawasan Pemilihan Kepala Daerah",
    category: "Infografis",
    status: "published",
    author: "Rizky Pratama",
    views: 650,
    date: "6 Mei 2025",
  },
];

const QUICK_ACTIONS = [
  {
    label: "Tulis Konten Baru",
    desc: "Buat artikel atau berita",
    icon: PlusCircle,
    color: "bg-primary",
    to: "/content/new",
  },
  {
    label: "Kelola Pengguna",
    desc: "Atur akun dan hak akses",
    icon: UsersRound,
    color: "bg-blue-500",
    to: "/users",
  },
  {
    label: "Lihat Laporan",
    desc: "Statistik dan performa konten",
    icon: BarChart3,
    color: "bg-violet-500",
    to: "/reports",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours();
  if (h < 11) return "Selamat Pagi";
  if (h < 15) return "Selamat Siang";
  if (h < 18) return "Selamat Sore";
  return "Selamat Malam";
}

function formatDate() {
  return new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Admin";
  const greeting = useMemo(getGreeting, []);

  return (
    <div className="space-y-6">
      {/* ── Welcome Banner ───────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-sidebar to-[#16213e] rounded-2xl p-6 flex items-center justify-between overflow-hidden relative">
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-primary/10 pointer-events-none" />
        <div className="absolute bottom-0 right-24 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10">
          <p className="text-white/60 text-sm font-medium">{greeting},</p>
          <h1 className="text-2xl font-bold text-white mt-0.5 capitalize">
            {displayName} 👋
          </h1>
          <div className="flex items-center gap-2 mt-2 text-white/50 text-xs">
            <Calendar size={13} />
            <span>{formatDate()}</span>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end relative z-10 gap-1">
          <div className="bg-primary/20 border border-primary/30 rounded-xl px-4 py-2 text-center">
            <p className="text-primary text-lg font-bold leading-none">94</p>
            <p className="text-white/60 text-xs mt-0.5">Konten Aktif</p>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ───────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Ringkasan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {MOCK_STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* ── Bottom Row ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Content Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Konten Terbaru</h3>
            <a
              href="/content"
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              Lihat semua <ArrowRight size={13} />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-full">
                    Judul
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                    Views
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                    Tanggal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_RECENT.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/70 transition-colors duration-100"
                  >
                    <td className="px-6 py-3.5">
                      <p className="font-medium text-gray-800 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.category} · {item.author}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={item.status} />
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Eye size={13} />
                        <span>{item.views.toLocaleString("id-ID")}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-400 text-xs hidden lg:table-cell whitespace-nowrap">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Aksi Cepat</h3>
            <div className="space-y-3">
              {QUICK_ACTIONS.map((action) => (
                <a
                  key={action.label}
                  href={action.to}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-orange-50/50 transition-all duration-150 group"
                >
                  <div
                    className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <action.icon size={17} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">
                      {action.label}
                    </p>
                    <p className="text-xs text-gray-400">{action.desc}</p>
                  </div>
                  <ArrowRight
                    size={15}
                    className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Status Summary */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Status Konten
            </h3>
            <div className="space-y-3">
              {[
                { label: "Diterbitkan", count: 94, pct: 73, color: "bg-emerald-500" },
                { label: "Draft",       count: 17, pct: 14, color: "bg-amber-400"   },
                { label: "Review",      count: 11, pct: 9,  color: "bg-blue-500"    },
                { label: "Diarsipkan",  count: 6,  pct: 4,  color: "bg-gray-300"    },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">{s.label}</span>
                    <span className="text-gray-400">{s.count}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${s.color} rounded-full transition-all duration-500`}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
