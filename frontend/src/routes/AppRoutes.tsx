import { Navigate, Route, Routes } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";

import { LandingPage } from "@/pages/LandingPage";
import { RoleSelectionPage } from "@/pages/RoleSelectionPage";

// Patient
import { PatientLogin } from "@/pages/patient/PatientLogin";
import { PatientRegister } from "@/pages/patient/PatientRegister";
import { VerifyEmail } from "@/pages/patient/VerifyEmail";
import { ForgotPassword } from "@/pages/patient/ForgotPassword";
import { PatientLayout } from "@/layouts/PatientLayout";
import PatientOverview from "@/pages/patient/dashboard/PatientOverview";
import NewHealthProblem from "@/pages/patient/dashboard/NewHealthProblem";
import CurrentCases from "@/pages/patient/dashboard/CurrentCases";
import MedicalHistory from "@/pages/patient/dashboard/MedicalHistory";
import Documents from "@/pages/patient/dashboard/Documents";
import Appointments from "@/pages/patient/dashboard/Appointments";
import Prescriptions from "@/pages/patient/dashboard/Prescriptions";
import PatientProfileDashboard from "@/pages/patient/dashboard/PatientProfile";
import Settings from "@/pages/patient/dashboard/Settings";
import AIAssistant from "@/pages/patient/dashboard/AIAssistant";

// Doctor
import { DoctorLogin } from "@/pages/doctor/DoctorLogin";
import { DoctorRegister } from "@/pages/doctor/DoctorRegister";
import { DoctorVerifyEmail } from "@/pages/doctor/DoctorVerifyEmail";
import { DoctorForgotPassword } from "@/pages/doctor/DoctorForgotPassword";
import { DoctorLayout } from "@/layouts/DoctorLayout";
import DoctorOverview from "@/pages/doctor/dashboard/DoctorOverview";
import DoctorAppointments from "@/pages/doctor/dashboard/Appointments";
import DoctorPatients from "@/pages/doctor/dashboard/Patients";
import DoctorSchedule from "@/pages/doctor/dashboard/MySchedule";
import DoctorConsultations from "@/pages/doctor/dashboard/Consultations";
import DoctorPrescriptions from "@/pages/doctor/dashboard/Prescriptions";
import DoctorRecords from "@/pages/doctor/dashboard/MedicalRecords";
import DoctorEarnings from "@/pages/doctor/dashboard/Earnings";
import DoctorProfile from "@/pages/doctor/dashboard/Profile";
import DoctorSettings from "@/pages/doctor/dashboard/Settings";
import DoctorAIAssistant from "@/pages/doctor/dashboard/AIAssistant";

// Admin
import { AdminLogin } from "@/pages/admin/AdminLogin";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminOverview } from "@/pages/admin/AdminOverview";
import { Patients as AdminPatients } from "@/pages/admin/Patients";
import { Doctors as AdminDoctors } from "@/pages/admin/Doctors";
import { UserManagement } from "@/pages/admin/UserManagement";
import { Reports as AdminReports } from "@/pages/admin/Reports";
import { Settings as AdminSettings } from "@/pages/admin/Settings";

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

      {/* Patient Dashboard — shared shell + nested pages */}
      <Route path={ROUTES.patient.dashboard} element={<ProtectedRoute><PatientLayout /></ProtectedRoute>}>
        <Route index element={<PatientOverview />} />
        <Route path="new-health-problem" element={<NewHealthProblem />} />
        <Route path="cases" element={<CurrentCases />} />
        <Route path="history" element={<MedicalHistory />} />
        <Route path="documents" element={<Documents />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="ai-assistant" element={<AIAssistant />} />
        <Route path="profile" element={<PatientProfileDashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="new-case/*" element={<NewHealthProblem />} />
      </Route>

      <Route path={ROUTES.patient.profile} element={<Navigate to={`${ROUTES.patient.dashboard}/profile`} replace />} />

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
            <DoctorLayout />
          </DoctorProtectedRoute>
        }
      >
        <Route index element={<DoctorOverview />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="schedule" element={<DoctorSchedule />} />
        <Route path="consultations" element={<DoctorConsultations />} />
        <Route path="prescriptions" element={<DoctorPrescriptions />} />
        <Route path="records" element={<DoctorRecords />} />
        <Route path="earnings" element={<DoctorEarnings />} />
        <Route path="profile" element={<DoctorProfile />} />
        <Route path="settings" element={<DoctorSettings />} />
        <Route path="ai-assistant" element={<DoctorAIAssistant />} />
      </Route>

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

      {/* Admin Dashboard — shared shell + nested account-management pages */}
      <Route path={ROUTES.admin.dashboard} element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
        <Route index element={<AdminOverview />} />
        <Route path="patients" element={<AdminPatients />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

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