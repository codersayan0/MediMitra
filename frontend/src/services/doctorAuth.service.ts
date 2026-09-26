import { apiRequest } from "./api";
import { STORAGE_KEYS } from "@/constants";
import type {
  ApiResponse,
  DoctorLoginPayload,
  DoctorProfile,
  DoctorRegisterPayload,
  DoctorTokenResponse,
} from "@/types";

/**
 * Mirrors auth.service.ts exactly, but targets /auth/doctor/* and reads/writes
 * the doctor token key so a doctor session can never be confused with (or
 * overwrite) a patient session in the same browser.
 */
export const doctorAuthService = {
  register(payload: DoctorRegisterPayload): Promise<ApiResponse<null>> {
    return apiRequest("/auth/doctor/register", { method: "POST", body: JSON.stringify(payload) });
  },

  verifyEmail(email: string, otp: string): Promise<ApiResponse<DoctorTokenResponse>> {
    return apiRequest("/auth/doctor/verify-email", { method: "POST", body: JSON.stringify({ email, otp }) });
  },

  resendOtp(
    email: string,
    purpose: "doctor_register" | "doctor_reset" = "doctor_register"
  ): Promise<ApiResponse<null>> {
    return apiRequest("/auth/doctor/resend-otp", { method: "POST", body: JSON.stringify({ email, purpose }) });
  },

  login(payload: DoctorLoginPayload): Promise<ApiResponse<DoctorTokenResponse>> {
    return apiRequest("/auth/doctor/login", { method: "POST", body: JSON.stringify(payload) });
  },

  forgotPassword(email: string): Promise<ApiResponse<null>> {
    return apiRequest("/auth/doctor/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
  },

  verifyResetOtp(email: string, otp: string): Promise<ApiResponse<{ reset_token: string }>> {
    return apiRequest("/auth/doctor/verify-reset-otp", { method: "POST", body: JSON.stringify({ email, otp }) });
  },

  resetPassword(
    email: string,
    resetToken: string,
    newPassword: string,
    confirmNewPassword: string
  ): Promise<ApiResponse<null>> {
    return apiRequest("/auth/doctor/reset-password", {
      method: "POST",
      body: JSON.stringify({
        email,
        reset_token: resetToken,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
      }),
    });
  },

  me(): Promise<ApiResponse<DoctorProfile>> {
    return apiRequest("/auth/doctor/me", { auth: true, tokenKey: STORAGE_KEYS.doctorToken });
  },

  logout(): Promise<ApiResponse<null>> {
    // Same stateless-JWT logout endpoint the patient flow uses.
    return apiRequest("/auth/logout", { method: "POST" });
  },
};