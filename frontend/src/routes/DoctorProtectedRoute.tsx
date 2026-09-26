import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useDoctorAuth } from "@/hooks/useDoctorAuth";
import { ROUTES } from "@/constants";

export function DoctorProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useDoctorAuth();

  if (isLoading) {
    return <div className="auth-loading" role="status" aria-live="polite" />;
  }
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.doctor.login} replace />;
  }
  return <>{children}</>;
}