import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { DoctorAuthProvider } from "@/contexts/DoctorAuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { AppRoutes } from "@/routes/AppRoutes";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <DoctorAuthProvider>
            <AdminAuthProvider>
              <BrowserRouter
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                <AppRoutes />
              </BrowserRouter>
            </AdminAuthProvider>
          </DoctorAuthProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;