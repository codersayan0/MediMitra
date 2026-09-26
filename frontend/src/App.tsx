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
              <BrowserRouter>
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