// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ContentListPage from "../pages/content/ContentListPage";
import ContentFormPage from "../pages/content/ContentFormPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Redirect root → dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected Routes — harus login dulu */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* ── Content Management ── */}
              <Route path="/content" element={<ContentListPage />} />
              <Route path="/content/new" element={<ContentFormPage />} />
              <Route path="/content/edit/:id" element={<ContentFormPage />} />
              {/* Tambahkan route baru di sini */}
            </Route>
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
