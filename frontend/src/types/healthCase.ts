export type HealthCaseStatus =
  | "draft"
  | "interviewing"
  | "documents_pending"
  | "analyzing"
  | "review"
  | "ready"
  | "appointment_requested"
  | "completed"
  | "archived";

export type HealthCaseLanguage = "en" | "bn" | "hi";

export interface HealthCase {
  id: string;
  case_id: string;
  patient_id: string;

  title: string;
  problem_description?: string;

  language: HealthCaseLanguage;

  status: HealthCaseStatus;

  interview_status: "not_started" | "in_progress" | "completed" | "skipped";

  documents_status: "not_started" | "pending" | "completed" | "skipped";

  created_at: string;
  updated_at?: string;
}

export interface CreateHealthCasePayload {
  title: string;
  problem_description?: string;
  language: HealthCaseLanguage;
}

export interface CreateHealthCaseResponse {
  case: HealthCase;
}