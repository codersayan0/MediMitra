import { apiRequest } from "./api";
import { STORAGE_KEYS } from "@/constants";
import type { AdminLoginPayload, AdminProfile, AdminTokenResponse, ApiResponse } from "@/types";

/**
 * Mirrors auth.service.ts / doctorAuth.service.ts, but targets /auth/admin/*
 * and reads/writes the admin token key so an admin session can never be
 * confused with (or overwrite) a patient or doctor session in the same
 * browser. There is no register/forgot-password flow for admin by design.
 */
export const adminAuthService = {
  login(payload: AdminLoginPayload): Promise<ApiResponse<AdminTokenResponse>> {
    return apiRequest("/auth/admin/login", { method: "POST", body: JSON.stringify(payload) });
  },

  me(): Promise<ApiResponse<AdminProfile>> {
    return apiRequest("/auth/admin/me", { auth: true, tokenKey: STORAGE_KEYS.adminToken });
  },

  logout(): Promise<ApiResponse<null>> {
    // Same stateless-JWT logout endpoint the patient/doctor flows use.
    return apiRequest("/auth/logout", { method: "POST" });
  },
};