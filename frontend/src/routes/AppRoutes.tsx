import { Route, Routes } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";

import { LandingPage } from "@/pages/LandingPage";
import { RoleSelectionPage } from "@/pages/RoleSelectionPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";

import { PatientLogin } from "@/pages/patient/PatientLogin";
import { PatientRegister } from "@/pages/patient/PatientRegister";
import { VerifyEmail } from "@/pages/patient/VerifyEmail";
import { ForgotPassword } from "@/pages/patient/ForgotPassword";
import { PatientDashboard } from "@/pages/patient/PatientDashboard";

import { DoctorLogin } from "@/pages/doctor/DoctorLogin";
import { DoctorRegister } from "@/pages/doctor/DoctorRegister";
import { DoctorVerifyEmail } from "@/pages/doctor/DoctorVerifyEmail";
import { DoctorForgotPassword } from "@/pages/doctor/DoctorForgotPassword";
import { DoctorDashboard } from "@/pages/doctor/DoctorDashboard";

import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { DoctorProtectedRoute } from "@/routes/DoctorProtectedRoute";

import { ROUTES } from "@/constants";

export function AppRoutes() {
  return (
    <Routes>
      {/* ========================================================= HOME */}
      <Route path={ROUTES.home} element={<MainLayout><LandingPage /></MainLayout>} />

      {/* ========================================================= ROLE SELECTION */}
      <Route path={ROUTES.roleSelection} element={<MainLayout><RoleSelectionPage /></MainLayout>} />

      {/* ========================================================= PATIENT */}
      <Route path={ROUTES.patient.login} element={<MainLayout><PatientLogin /></MainLayout>} />
      <Route path={ROUTES.patient.register} element={<MainLayout><PatientRegister /></MainLayout>} />
      <Route path={ROUTES.patient.verifyEmail} element={<MainLayout><VerifyEmail /></MainLayout>} />
      <Route path={ROUTES.patient.forgotPassword} element={<MainLayout><ForgotPassword /></MainLayout>} />
      <Route
        path={ROUTES.patient.dashboard}
        element={
          <ProtectedRoute>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      {/* ========================================================= DOCTOR */}
      <Route path={ROUTES.doctor.login} element={<MainLayout><DoctorLogin /></MainLayout>} />
      <Route path={ROUTES.doctor.register} element={<MainLayout><DoctorRegister /></MainLayout>} />
      <Route path={ROUTES.doctor.verifyEmail} element={<MainLayout><DoctorVerifyEmail /></MainLayout>} />
      <Route path={ROUTES.doctor.forgotPassword} element={<MainLayout><DoctorForgotPassword /></MainLayout>} />
      <Route
        path={ROUTES.doctor.dashboard}
        element={
          <DoctorProtectedRoute>
            <DoctorDashboard />
          </DoctorProtectedRoute>
        }
      />

      {/* ========================================================= ADMINISTRATOR (Phase 2) */}
      <Route path={ROUTES.admin.login} element={<MainLayout><PlaceholderPage role="admin" kind="login" /></MainLayout>} />
      <Route path={ROUTES.admin.dashboard} element={<MainLayout><PlaceholderPage role="admin" kind="dashboard" /></MainLayout>} />

      {/* ========================================================= FALLBACK */}
      <Route path="*" element={<MainLayout><LandingPage /></MainLayout>} />
    </Routes>
  );
}