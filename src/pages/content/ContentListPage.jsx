// src/pages/content/ContentListPage.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Pencil, Trash2, ToggleLeft, ToggleRight, Search, RefreshCw } from "lucide-react";
import { getArticles, deleteArticle, toggleArticleStatus } from "../../lib/firebase/content";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import Table from "../../components/ui/Table";

const CATEGORIES = ["Semua", "Berita", "Pengumuman", "Siaran Pers", "Panduan", "Laporan", "Infografis"];

function formatDate(ts) {
  if (!ts) return "-";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function ContentListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      console.error("Gagal memuat artikel:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  // ── Filter & Search ───────────────────────────────────────────────
  const filtered = articles.filter((a) => {
    const matchSearch = a.title?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "Semua" || a.category === filterCategory;
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  // ── Handlers ─────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteArticle(deleteTarget.id);
      setArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggle = async (article) => {
    setTogglingId(article.id);
    try {
      const newStatus = await toggleArticleStatus(article.id, article.status);
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, status: newStatus } : a))
      );
    } finally {
      setTogglingId(null);
    }
  };

  // ── Table Columns ─────────────────────────────────────────────────
  const columns = [
    {
      key: "title",
      label: "Judul",
      className: "min-w-[260px]",
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-800 line-clamp-1">{row.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{row.category} · {row.author || "—"}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <Badge variant={row.status} />,
    },
    {
      key: "views",
      label: "Views",
      render: (row) => (
        <span className="text-gray-500">{(row.views ?? 0).toLocaleString("id-ID")}</span>
      ),
    },
    {
      key: "createdAt",
      label: "Tanggal",
      className: "hidden md:table-cell",
      render: (row) => (
        <span className="text-gray-400 text-xs whitespace-nowrap">{formatDate(row.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      label: "",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); handleToggle(row); }}
            disabled={togglingId === row.id}
            className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-orange-50 transition-colors"
            title={row.status === "published" ? "Jadikan Draft" : "Terbitkan"}
          >
            {togglingId === row.id
              ? <RefreshCw size={15} className="animate-spin" />
              : row.status === "published"
                ? <ToggleRight size={18} className="text-emerald-500" />
                : <ToggleLeft size={18} />
            }
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/content/edit/${row.id}`); }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setDeleteTarget(row); }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Hapus"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manajemen Konten</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {articles.length} konten terdaftar
          </p>
        </div>
        <Button
          icon={PlusCircle}
          onClick={() => navigate("/content/new")}
        >
          Tulis Konten Baru
        </Button>
      </div>

      {/* ── Filters ── */}
      <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari judul konten..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Status filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-gray-700"
        >
          <option value="all">Semua Status</option>
          <option value="published">Diterbitkan</option>
          <option value="draft">Draft</option>
          <option value="review">Review</option>
          <option value="archived">Diarsipkan</option>
        </select>

        {/* Category filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-gray-700"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <Table
          columns={columns}
          data={filtered}
          keyField="id"
          loading={loading}
          emptyText={
            search || filterCategory !== "Semua" || filterStatus !== "all"
              ? "Tidak ada konten yang cocok dengan filter."
              : "Belum ada konten. Buat konten pertama!"
          }
          onRowClick={(row) => navigate(`/content/edit/${row.id}`)}
        />
      </div>

      {/* ── Delete Confirmation Modal ── */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Hapus Konten"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
              Batal
            </Button>
            <Button variant="danger" loading={deleting} onClick={handleDelete}>
              Ya, Hapus
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-600">
          Yakin ingin menghapus konten{" "}
          <span className="font-semibold text-gray-800">"{deleteTarget?.title}"</span>?
          Tindakan ini tidak bisa dibatalkan.
        </p>
      </Modal>
    </div>
  );
}
