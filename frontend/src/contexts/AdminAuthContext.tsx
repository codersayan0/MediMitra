import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AdminProfile, AdminTokenResponse } from "@/types";
import { STORAGE_KEYS } from "@/constants";
import { adminAuthService } from "@/services/adminAuth.service";

interface AdminAuthContextValue {
  admin: AdminProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithToken: (result: AdminTokenResponse) => void;
  logout: () => Promise<void>;
}

export const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem(STORAGE_KEYS.adminToken);
    if (!token) {
      setIsLoading(false);
      return;
    }
    adminAuthService.me().then((res) => {
      if (res.success && res.data) {
        setAdmin(res.data);
      } else {
        window.localStorage.removeItem(STORAGE_KEYS.adminToken);
      }
      setIsLoading(false);
    });
  }, []);

  const loginWithToken = useCallback((result: AdminTokenResponse) => {
    window.localStorage.setItem(STORAGE_KEYS.adminToken, result.access_token);
    setAdmin({ role: result.role });
  }, []);

  const logout = useCallback(async () => {
    await adminAuthService.logout().catch(() => undefined);
    window.localStorage.removeItem(STORAGE_KEYS.adminToken);
    setAdmin(null);
  }, []);

  const value = useMemo(
    () => ({ admin, isAuthenticated: !!admin, isLoading, loginWithToken, logout }),
    [admin, isLoading, loginWithToken, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}