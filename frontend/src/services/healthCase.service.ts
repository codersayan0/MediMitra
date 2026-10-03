import { apiRequest } from "./api";
import type {
  ApiResponse,
  CreateHealthCasePayload,
  CreateHealthCaseResponse,
  HealthCase,
} from "@/types";

export const healthCaseService = {
  async create(
    payload: CreateHealthCasePayload,
  ): Promise<ApiResponse<CreateHealthCaseResponse>> {
    return apiRequest<CreateHealthCaseResponse>("/patient/health-cases", {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    });
  },

  async getMine(): Promise<ApiResponse<HealthCase[]>> {
    return apiRequest<HealthCase[]>("/patient/health-cases", {
      auth: true,
    });
  },

  async getById(
    caseId: string,
  ): Promise<ApiResponse<HealthCase>> {
    return apiRequest<HealthCase>(
      `/patient/health-cases/${encodeURIComponent(caseId)}`,
      {
        auth: true,
      },
    );
  },
};