import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AuthTokenResponse, PatientProfile } from "@/types";
import { STORAGE_KEYS } from "@/constants";
import { authService } from "@/services/auth.service";

interface AuthContextValue {
  patient: PatientProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithToken: (result: AuthTokenResponse) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem(STORAGE_KEYS.token);
    if (!token) {
      setIsLoading(false);
      return;
    }
    authService.me().then((res) => {
      if (res.success && res.data) {
        setPatient(res.data);
      } else {
        window.localStorage.removeItem(STORAGE_KEYS.token);
      }
      setIsLoading(false);
    });
  }, []);

  const loginWithToken = useCallback((result: AuthTokenResponse) => {
    window.localStorage.setItem(STORAGE_KEYS.token, result.access_token);
    setPatient(result.patient);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout().catch(() => undefined);
    window.localStorage.removeItem(STORAGE_KEYS.token);
    // Profile image is intentionally kept in localStorage on logout, per spec.
    setPatient(null);
  }, []);

  const value = useMemo(
    () => ({ patient, isAuthenticated: !!patient, isLoading, loginWithToken, logout }),
    [patient, isLoading, loginWithToken, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}