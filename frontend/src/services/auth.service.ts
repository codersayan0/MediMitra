import { apiRequest } from "./api";
import type {
  ApiResponse,
  AuthTokenResponse,
  PatientLoginPayload,
  PatientProfile,
  PatientRegisterPayload,
} from "@/types";

export const authService = {
  register(payload: PatientRegisterPayload): Promise<ApiResponse<null>> {
    return apiRequest("/auth/patient/register", { method: "POST", body: JSON.stringify(payload) });
  },

  verifyEmail(email: string, otp: string): Promise<ApiResponse<AuthTokenResponse>> {
    return apiRequest("/auth/patient/verify-email", { method: "POST", body: JSON.stringify({ email, otp }) });
  },

  resendOtp(email: string, purpose: "register" | "reset" = "register"): Promise<ApiResponse<null>> {
    return apiRequest("/auth/patient/resend-otp", { method: "POST", body: JSON.stringify({ email, purpose }) });
  },

  login(payload: PatientLoginPayload): Promise<ApiResponse<AuthTokenResponse>> {
    return apiRequest("/auth/patient/login", { method: "POST", body: JSON.stringify(payload) });
  },

  forgotPassword(email: string): Promise<ApiResponse<null>> {
    return apiRequest("/auth/patient/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
  },

  verifyResetOtp(email: string, otp: string): Promise<ApiResponse<{ reset_token: string }>> {
    return apiRequest("/auth/patient/verify-reset-otp", { method: "POST", body: JSON.stringify({ email, otp }) });
  },

  resetPassword(
    email: string,
    resetToken: string,
    newPassword: string,
    confirmNewPassword: string
  ): Promise<ApiResponse<null>> {
    return apiRequest("/auth/patient/reset-password", {
      method: "POST",
      body: JSON.stringify({
        email,
        reset_token: resetToken,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
      }),
    });
  },

  me(): Promise<ApiResponse<PatientProfile>> {
    return apiRequest("/auth/patient/me", { auth: true });
  },

  logout(): Promise<ApiResponse<null>> {
    return apiRequest("/auth/logout", { method: "POST" });
  },
};