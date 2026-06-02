// src/pages/auth/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Shield, AlertCircle, Loader2 } from "lucide-react";
import { loginWithEmail } from "../../lib/firebase/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Email atau password salah. Silakan coba lagi.");
          break;
        case "auth/too-many-requests":
          setError("Terlalu banyak percobaan login. Coba beberapa saat lagi.");
          break;
        case "auth/user-disabled":
          setError("Akun ini telah dinonaktifkan. Hubungi administrator.");
          break;
        default:
          setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sidebar via-[#16213e] to-[#0f3460] flex">
      {/* ── Left Panel: Branding ── */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-12 relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-[-80px] left-[-80px] w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-72 h-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <Shield size={22} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-xl tracking-tight">Bawaslu RI</p>
            <p className="text-white/50 text-xs">Content Management System</p>
          </div>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-semibold tracking-wide uppercase">
                Portal Internal
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Kelola Konten<br />
              <span className="text-primary">dengan Mudah</span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-sm">
              Platform terpusat untuk manajemen informasi, berita, dan data
              Bawaslu Republik Indonesia.
            </p>
          </div>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-2">
            {["Manajemen Berita", "Kelola Pengguna", "Upload Media", "Laporan Real-time"].map((f) => (
              <span
                key={f}
                className="bg-white/10 backdrop-blur text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/10"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-white/30 text-xs relative z-10">
          © 2025 Badan Pengawas Pemilihan Umum Republik Indonesia
        </p>
      </div>

      {/* ── Right Panel: Login Form ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Shield size={18} className="text-white" />
              </div>
              <p className="text-gray-800 font-bold text-lg">Bawaslu CMS</p>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Selamat Datang</h2>
              <p className="text-gray-500 text-sm mt-1">
                Masuk ke akun admin Anda untuk melanjutkan
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6 animate-in fade-in">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bawaslu.go.id"
                  disabled={loading}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                             disabled:bg-gray-50 disabled:cursor-not-allowed
                             placeholder:text-gray-300 transition-all duration-150"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:text-primary-700 font-medium transition-colors"
                    onClick={() => {
                      /* TODO: implement reset password modal */
                    }}
                  >
                    Lupa Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    className="w-full pl-4 pr-11 py-3 text-sm border border-gray-300 rounded-xl
                               focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                               disabled:bg-gray-50 disabled:cursor-not-allowed
                               placeholder:text-gray-300 transition-all duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    disabled={loading}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400
                               hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="btn-login"
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4
                           bg-primary hover:bg-primary-700 active:bg-primary-800
                           text-white font-semibold text-sm rounded-xl
                           shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40
                           transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                           mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    <LogIn size={17} />
                    Masuk
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">Akses terbatas</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Info */}
            <p className="text-center text-xs text-gray-400 leading-relaxed">
              Sistem ini hanya untuk personel internal Bawaslu RI yang berwenang.
              Untuk akses akun, hubungi administrator IT.
            </p>
          </div>

          {/* Below card */}
          <p className="text-center text-white/30 text-xs mt-6">
            v1.0.0 · Bawaslu CMS · 2025
          </p>
        </div>
      </div>
    </div>
  );
}
