import type { LanguageOption, NavLink, RoleOption } from "@/types";

export const STORAGE_KEYS = {
  theme: "medimitra_theme",
  language: "medimitra_language",
  token: "medimitra_token",
  profileImage: "medimitra_profile_image",
} as const;

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
];

export const NAV_LINKS: NavLink[] = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "features", href: "#features" },
  { key: "howItWorks", href: "#how-it-works" },
  { key: "developers", href: "#developers" },
  { key: "contact", href: "#contact" },
];

export const IMAGES = {
  heroLight: "/index/HL1.png",
  heroDark: "/index/HD1.png",
  aboutLight: "/index/HL2.png",
  aboutDark: "/index/HD2.png",
};

export const ROUTES = {
  home: "/",
  patient: {
    login: "/patient/login",
    register: "/patient/register",
    verifyEmail: "/patient/verify-email",
    forgotPassword: "/patient/forgot-password",
    dashboard: "/patient/dashboard",
  },
  doctor: {
    login: "/doctor/login",
    register: "/doctor/register",
    dashboard: "/doctor/dashboard",
  },
  admin: {
    login: "/admin/login",
    dashboard: "/admin/dashboard",
  },
} as const;

export const ROLE_OPTIONS: RoleOption[] = [
  {
    role: "patient",
    loginPath: ROUTES.patient.login,
    registerPath: ROUTES.patient.register,
    dashboardPath: ROUTES.patient.dashboard,
    icon: "🧑",
    colorVar: "#2563eb",
  },
  {
    role: "doctor",
    loginPath: ROUTES.doctor.login,
    registerPath: ROUTES.doctor.register,
    dashboardPath: ROUTES.doctor.dashboard,
    icon: "🩺",
    colorVar: "#16a34a",
  },
  {
    role: "admin",
    loginPath: ROUTES.admin.login,
    registerPath: ROUTES.admin.login,
    dashboardPath: ROUTES.admin.dashboard,
    icon: "🛡️",
    colorVar: "#d97706",
  },
];

export const DEVELOPER = {
  name: "Sayan Mandal",
  degree: "B.Tech — Computer Science & Engineering",
  github: "https://github.com/codersayan0",
  linkedin: "https://linkedin.com/in/codersayan",
  portfolio: "https://codersayan.vercel.app",
};

export const ID_PROOF_OPTIONS = [
  { value: "aadhaar", label: "Aadhaar Card" },
  { value: "voter_id", label: "Voter ID" },
  { value: "driving_licence", label: "Driving Licence" },
] as const;

export const TITLE_OPTIONS = ["Mr", "Mrs", "Miss"] as const;