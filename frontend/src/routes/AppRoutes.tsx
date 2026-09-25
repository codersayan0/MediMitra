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

import { ProtectedRoute } from "@/routes/ProtectedRoute";

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

      {/* =========================================================
          DOCTOR
          Phase 2
      ========================================================= */}

      <Route
        path={ROUTES.doctor.login}
        element={
          <MainLayout>
            <PlaceholderPage role="doctor" kind="login" />
          </MainLayout>
        }
      />

      <Route
        path={ROUTES.doctor.register}
        element={
          <MainLayout>
            <PlaceholderPage role="doctor" kind="register" />
          </MainLayout>
        }
      />

      <Route
        path={ROUTES.doctor.dashboard}
        element={
          <MainLayout>
            <PlaceholderPage role="doctor" kind="dashboard" />
          </MainLayout>
        }
      />

      {/* =========================================================
          ADMINISTRATOR
          Phase 2
      ========================================================= */}

      <Route
        path={ROUTES.admin.login}
        element={
          <MainLayout>
            <PlaceholderPage role="admin" kind="login" />
          </MainLayout>
        }
      />

      <Route
        path={ROUTES.admin.dashboard}
        element={
          <MainLayout>
            <PlaceholderPage role="admin" kind="dashboard" />
          </MainLayout>
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