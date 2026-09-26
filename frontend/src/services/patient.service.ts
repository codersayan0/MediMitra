import { apiRequest } from "@/services/api";
import type { ApiResponse, PatientProfile } from "@/types";

export interface PatientProfileUpdatePayload {
  phone?: string;
  address?: string;
  country?: string;
  state?: string;
  district?: string;
  pin_code?: string;
}

class PatientService {
  /**
   * Get patient dashboard data.
   *
   * This keeps the existing dashboard API call available so
   * PatientDashboard.tsx does not break.
   */
  async getDashboard(): Promise<ApiResponse<PatientProfile>> {
    return apiRequest<PatientProfile>(
      "/patient/dashboard",
      {
        auth: true,
      }
    );
  }

  /**
   * Get the currently authenticated patient's profile.
   */
  async getProfile(): Promise<PatientProfile> {
    const response = await apiRequest<PatientProfile>(
      "/auth/patient/me",
      {
        auth: true,
      }
    );

    if (!response.success || !response.data) {
      throw new Error(
        response.message ?? "Unable to load patient profile."
      );
    }

    return response.data;
  }

  /**
   * Update editable patient profile information.
   *
   * Profile images are intentionally NOT included here.
   * They remain stored locally in the browser.
   */
  async updateProfile(
    payload: PatientProfileUpdatePayload
  ): Promise<PatientProfile> {
    const response = await apiRequest<PatientProfile>(
      "/auth/patient/profile",
      {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(payload),
      }
    );

    if (!response.success || !response.data) {
      throw new Error(
        response.message ?? "Unable to update patient profile."
      );
    }

    return response.data;
  }
}

export const patientService = new PatientService();