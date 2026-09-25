import { apiRequest } from "./api";
import type { ApiResponse, AuthUser } from "@/types";

/** Foundation only — expand once patient/doctor/admin dashboards are built. */
export const userService = {
  getProfile(): Promise<ApiResponse<AuthUser>> {
    return apiRequest<AuthUser>("/users/me", { auth: true });
  },

  updateProfile(payload: Partial<AuthUser>): Promise<ApiResponse<AuthUser>> {
    return apiRequest<AuthUser>("/users/me", {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(payload),
    });
  },
};