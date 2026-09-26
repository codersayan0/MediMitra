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

  date_of_birth: string;

  address: string;
  country: string;
  state: string;
  district: string;
  pin_code: string;

  email: string;
  phone: string;

  role: "patient";
  email_verified: boolean;

  created_at: string;
  updated_at?: string;
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

/* ---------------- Doctor auth (backend-aligned, schemas/doctor.py) ---------------- */

export type DoctorTitle = "Dr";
export type DoctorIdProofType = IdProofType;
export type DoctorConsultationType = "in_person" | "online";
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface DoctorDegree {
  degree_name: string;
  institution: string;
  passing_year: number;
}

export interface DoctorAvailability {
  day: DayOfWeek;
  start_time: string; // "HH:MM", 24-hour
  end_time: string; // "HH:MM", 24-hour
}

export interface DoctorChamber {
  name: string;
  address: string;
  country: string;
  state: string;
  district: string;
  pin_code: string;
}

export interface DoctorProfile {
  id: string;
  doctor_id: string;
  title: DoctorTitle;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specialization: string;
  consultation_type: DoctorConsultationType[];
  availability: DoctorAvailability[];
  chambers: DoctorChamber[];
  role: "doctor";
  email_verified: boolean;
  created_at: string;
}

export interface DoctorRegisterPayload {
  title: DoctorTitle;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  country: string;
  state: string;
  district: string;
  pin_code: string;
  id_proof_type: DoctorIdProofType;
  id_proof_number: string;
  medical_degree: DoctorDegree;
  medical_registration_number: string;
  specialization: string;
  consultation_type: DoctorConsultationType[];
  availability: DoctorAvailability[];
  chambers: DoctorChamber[];
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  terms_accepted: boolean;
}

export interface DoctorLoginPayload {
  email: string;
  password: string;
  remember_me: boolean;
}

export interface DoctorTokenResponse {
  access_token: string;
  token_type: "bearer";
  doctor: DoctorProfile;
}

/** Metadata + data URL for the doctor's medical document proof. LOCAL ONLY —
 * never sent to the backend, never part of DoctorRegisterPayload. */
export interface DoctorDocumentRecord {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

/* ---------------- Admin auth (backend-aligned, schemas/admin.py) ---------------- */

export interface AdminLoginPayload {
  login_id: string;
  password: string;
}

/** Safe-to-store admin shape. There is no admin collection/profile in
 * MongoDB — the role claim on the JWT is the entire "identity". */
export interface AdminProfile {
  role: "admin";
}

export interface AdminTokenResponse {
  access_token: string;
  token_type: "bearer";
  role: "admin";
}