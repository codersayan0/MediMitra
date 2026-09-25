import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="auth-loading" role="status" aria-live="polite" />;
  }
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.patient.login} replace />;
  }
  return <>{children}</>;
}