import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { ROUTES } from "@/constants";

export function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return <div className="auth-loading" role="status" aria-live="polite" />;
  }
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.admin.login} replace />;
  }
  return <>{children}</>;
}