export type ThemeMode = "light" | "dark";

export type LanguageCode = "en" | "bn" | "hi";

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export type UserRole = "patient" | "doctor" | "admin";

export interface NavLink {
  key: string;
  href: string;
}

export interface RoleOption {
  role: UserRole;
  loginPath: string;
  registerPath: string;
  dashboardPath: string;
  icon: string;
  colorVar: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

/* ---------------- Patient auth (backend-aligned) ---------------- */

export type Title = "Mr" | "Mrs" | "Miss";
export type IdProofType = "aadhaar" | "voter_id" | "driving_licence";

export interface PatientProfile {
  id: string;
  patient_id: string;
  title: Title;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: "patient";
  email_verified: boolean;
  created_at: string;
}

export interface PatientRegisterPayload {
  title: Title;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  country: string;
  state: string;
  district: string;
  pin_code: string;
  id_proof_type: IdProofType;
  id_proof_number: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  terms_accepted: boolean;
}

export interface PatientLoginPayload {
  email: string;
  password: string;
  remember_me: boolean;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: "bearer";
  patient: PatientProfile;
}