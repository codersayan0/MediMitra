import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { DoctorProfile, DoctorTokenResponse } from "@/types";
import { STORAGE_KEYS } from "@/constants";
import { doctorAuthService } from "@/services/doctorAuth.service";

interface DoctorAuthContextValue {
  doctor: DoctorProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithToken: (result: DoctorTokenResponse) => void;
  logout: () => Promise<void>;
}

export const DoctorAuthContext = createContext<DoctorAuthContextValue | undefined>(undefined);

export function DoctorAuthProvider({ children }: { children: ReactNode }) {
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem(STORAGE_KEYS.doctorToken);
    if (!token) {
      setIsLoading(false);
      return;
    }
    doctorAuthService.me().then((res) => {
      if (res.success && res.data) {
        setDoctor(res.data);
      } else {
        window.localStorage.removeItem(STORAGE_KEYS.doctorToken);
      }
      setIsLoading(false);
    });
  }, []);

  const loginWithToken = useCallback((result: DoctorTokenResponse) => {
    window.localStorage.setItem(STORAGE_KEYS.doctorToken, result.access_token);
    setDoctor(result.doctor);
  }, []);

  const logout = useCallback(async () => {
    await doctorAuthService.logout().catch(() => undefined);
    window.localStorage.removeItem(STORAGE_KEYS.doctorToken);
    // Profile image / medical document are intentionally kept in localStorage on logout.
    setDoctor(null);
  }, []);

  const value = useMemo(
    () => ({ doctor, isAuthenticated: !!doctor, isLoading, loginWithToken, logout }),
    [doctor, isLoading, loginWithToken, logout]
  );

  return <DoctorAuthContext.Provider value={value}>{children}</DoctorAuthContext.Provider>;
}