// src/pages/content/ContentFormPage.jsx
// Halaman form untuk BUAT dan EDIT artikel
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { createArticle, updateArticle, getArticle } from "../../lib/firebase/content";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";

const CATEGORIES = ["Berita", "Pengumuman", "Siaran Pers", "Panduan", "Laporan", "Infografis"];

const INITIAL_FORM = {
  title: "",
  category: "Berita",
  content: "",
  excerpt: "",
  status: "draft",
  tags: "",
};

export default function ContentFormPage() {
  const { id } = useParams();        // Ada id → mode Edit, tidak ada → mode Buat
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(isEdit);  // loading saat fetch data edit
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(false);

  // ── Load data jika mode Edit ──────────────────────────────────
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const article = await getArticle(id);
        if (!article) { navigate("/content", { replace: true }); return; }
        setForm({
          title:    article.title    ?? "",
          category: article.category ?? "Berita",
          content:  article.content  ?? "",
          excerpt:  article.excerpt  ?? "",
          status:   article.status   ?? "draft",
          tags:     Array.isArray(article.tags) ? article.tags.join(", ") : (article.tags ?? ""),
        });
      } catch (err) {
        console.error(err);
        navigate("/content", { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit, navigate]);

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.title.trim())   e.title   = "Judul wajib diisi.";
    if (!form.content.trim()) e.content = "Konten wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e, overrideStatus) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const payload = {
        ...form,
        status: overrideStatus ?? form.status,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        author: user?.displayName || user?.email?.split("@")[0] || "Admin",
      };

      if (isEdit) {
        await updateArticle(id, payload);
      } else {
        await createArticle(payload);
      }
      navigate("/content");
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      setErrors({ form: "Terjadi kesalahan saat menyimpan. Coba lagi." });
    } finally {
      setSaving(false);
    }
  };

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner label="Memuat data..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* ── Header ── */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/content")}
          className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">
            {isEdit ? "Edit Konten" : "Buat Konten Baru"}
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <Badge variant={form.status} />
            {isEdit && <span className="text-xs text-gray-400">ID: {id}</span>}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPreview((v) => !v)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors px-3 py-2 rounded-xl hover:bg-gray-100"
        >
          {preview ? <EyeOff size={16} /> : <Eye size={16} />}
          {preview ? "Edit" : "Preview"}
        </button>
      </div>

      {/* ── Global Error ── */}
      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Main Content ── */}
        <div className="lg:col-span-2 space-y-4">
          {preview ? (
            /* Preview Mode */
            <div className="bg-white rounded-2xl shadow-card p-8 min-h-[400px]">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {form.title || <span className="text-gray-300">Judul belum diisi</span>}
              </h2>
              {form.excerpt && (
                <p className="text-gray-500 text-sm italic border-l-4 border-primary pl-3 mb-4">
                  {form.excerpt}
                </p>
              )}
              <div className="prose prose-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {form.content || <span className="text-gray-300">Konten belum diisi</span>}
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
              <Input
                label="Judul"
                required
                placeholder="Masukkan judul konten..."
                value={form.title}
                onChange={set("title")}
                error={errors.title}
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Ringkasan / Excerpt
                </label>
                <textarea
                  placeholder="Ringkasan singkat konten (opsional)..."
                  value={form.excerpt}
                  onChange={set("excerpt")}
                  rows={2}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Konten <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Tulis konten lengkap di sini..."
                  value={form.content}
                  onChange={set("content")}
                  rows={14}
                  className={`w-full px-4 py-3 text-sm border rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all placeholder:text-gray-300 font-mono leading-relaxed ${
                    errors.content ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.content && (
                  <p className="text-xs text-red-500">{errors.content}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Sidebar Meta ── */}
        <div className="space-y-4">
          {/* Publish Card */}
          <div className="bg-white rounded-2xl shadow-card p-5 space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm">Penerbitan</h3>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                value={form.status}
                onChange={set("status")}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              >
                <option value="draft">Draft</option>
                <option value="review">Kirim ke Review</option>
                <option value="published">Terbitkan</option>
                <option value="archived">Arsipkan</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <Button
                type="submit"
                icon={Save}
                loading={saving}
                fullWidth
              >
                {isEdit ? "Simpan Perubahan" : "Simpan"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                fullWidth
                disabled={saving}
                onClick={() => navigate("/content")}
              >
                Batal
              </Button>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl shadow-card p-5 space-y-3">
            <h3 className="font-semibold text-gray-800 text-sm">Kategori & Tags</h3>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Kategori</label>
              <select
                value={form.category}
                onChange={set("category")}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <Input
              label="Tags"
              placeholder="pemilu, pengawasan, bawaslu"
              value={form.tags}
              onChange={set("tags")}
              hint="Pisahkan dengan koma"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
