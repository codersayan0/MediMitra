import { apiRequest } from "./api";

import type {
  ApiResponse,
  PatientProfile,
} from "@/types";

export const patientService = {
  getDashboard(): Promise<ApiResponse<PatientProfile>> {
    return apiRequest("/patient/dashboard", {
      auth: true,
    });
  },
};