import { Route, Routes } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";

import { LandingPage } from "@/pages/LandingPage";
import { RoleSelectionPage } from "@/pages/RoleSelectionPage";

// Patient
import { PatientLogin } from "@/pages/patient/PatientLogin";
import { PatientRegister } from "@/pages/patient/PatientRegister";
import { VerifyEmail } from "@/pages/patient/VerifyEmail";
import { ForgotPassword } from "@/pages/patient/ForgotPassword";
import { PatientDashboard } from "@/pages/patient/PatientDashboard";
import PatientProfilePage from "@/pages/patient/PatientProfile";
// Doctor
import { DoctorLogin } from "@/pages/doctor/DoctorLogin";
import { DoctorRegister } from "@/pages/doctor/DoctorRegister";
import { DoctorVerifyEmail } from "@/pages/doctor/DoctorVerifyEmail";
import { DoctorForgotPassword } from "@/pages/doctor/DoctorForgotPassword";
import { DoctorDashboard } from "@/pages/doctor/DoctorDashboard";

// Admin
import { AdminLogin } from "@/pages/admin/AdminLogin";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";

// Route guards
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { DoctorProtectedRoute } from "@/routes/DoctorProtectedRoute";
import { AdminProtectedRoute } from "@/routes/AdminProtectedRoute";

import { ROUTES } from "@/constants";

export function AppRoutes() {
  return (
    <Routes>
      {/* =========================================================
          HOME
      ========================================================= */}
      <Route
        path={ROUTES.home}
        element={
          <MainLayout>
            <LandingPage />
          </MainLayout>
        }
      />

      {/* =========================================================
          ROLE SELECTION
      ========================================================= */}
      <Route
        path={ROUTES.roleSelection}
        element={
          <MainLayout>
            <RoleSelectionPage />
          </MainLayout>
        }
      />

      {/* =========================================================
          PATIENT
      ========================================================= */}

      {/* Patient Login */}
      <Route
        path={ROUTES.patient.login}
        element={
          <MainLayout>
            <PatientLogin />
          </MainLayout>
        }
      />

      {/* Patient Registration */}
      <Route
        path={ROUTES.patient.register}
        element={
          <MainLayout>
            <PatientRegister />
          </MainLayout>
        }
      />

      {/* Patient Email Verification */}
      <Route
        path={ROUTES.patient.verifyEmail}
        element={
          <MainLayout>
            <VerifyEmail />
          </MainLayout>
        }
      />

      {/* Patient Forgot Password */}
      <Route
        path={ROUTES.patient.forgotPassword}
        element={
          <MainLayout>
            <ForgotPassword />
          </MainLayout>
        }
      />

      {/* Patient Dashboard */}
      <Route
        path={ROUTES.patient.dashboard}
        element={
          <ProtectedRoute>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      {/* Patient Profile */}
      <Route
        path={ROUTES.patient.profile}
        element={
          <ProtectedRoute>
            <PatientProfilePage />
          </ProtectedRoute>
        }
      />

      {/* =========================================================
          DOCTOR
      ========================================================= */}

      {/* Doctor Login */}
      <Route
        path={ROUTES.doctor.login}
        element={
          <MainLayout>
            <DoctorLogin />
          </MainLayout>
        }
      />

      {/* Doctor Registration */}
      <Route
        path={ROUTES.doctor.register}
        element={
          <MainLayout>
            <DoctorRegister />
          </MainLayout>
        }
      />

      {/* Doctor Email Verification */}
      <Route
        path={ROUTES.doctor.verifyEmail}
        element={
          <MainLayout>
            <DoctorVerifyEmail />
          </MainLayout>
        }
      />

      {/* Doctor Forgot Password */}
      <Route
        path={ROUTES.doctor.forgotPassword}
        element={
          <MainLayout>
            <DoctorForgotPassword />
          </MainLayout>
        }
      />

      {/* Doctor Dashboard */}
      <Route
        path={ROUTES.doctor.dashboard}
        element={
          <DoctorProtectedRoute>
            <DoctorDashboard />
          </DoctorProtectedRoute>
        }
      />

      {/* =========================================================
          ADMINISTRATOR
      ========================================================= */}

      {/* Admin Login */}
      <Route
        path={ROUTES.admin.login}
        element={
          <MainLayout>
            <AdminLogin />
          </MainLayout>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path={ROUTES.admin.dashboard}
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      {/* =========================================================
          FALLBACK
      ========================================================= */}
      <Route
        path="*"
        element={
          <MainLayout>
            <LandingPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}