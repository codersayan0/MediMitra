import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Button } from "@/components/ui/Button";
import { profileImageService } from "@/services/profileImage.service";
import { ROUTES } from "@/constants";

export function PatientDashboard() {
  const { t } = useLanguage();
  const { patient, logout } = useAuth();
  const navigate = useNavigate();
  const avatar = profileImageService.get();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.patient.login);
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header container">
        <div className="dashboard__brand">
          <span className="navbar__logo-icon" aria-hidden="true">+</span> MediMitra
        </div>
        <div className="dashboard__actions">
          <LanguageSelector />
          <ThemeToggle />
          <div className="dashboard__avatar" aria-hidden="true">
            {avatar ? <img src={avatar} alt="" /> : <span>🧑</span>}
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>{t.auth.dashboard.logout}</Button>
        </div>
      </header>

      <main className="dashboard__body container">
        <div className="dashboard__card">
          <div className="dashboard__illustration" aria-hidden="true">🩺</div>
          <p className="eyebrow">{t.auth.dashboard.welcome}</p>
          <h1>{t.auth.dashboard.title}</h1>
          <p className="dashboard__patient-name">
            {patient ? `${patient.title} ${patient.first_name} ${patient.last_name} · ${patient.patient_id}` : ""}
          </p>
          <span className="dashboard__badge">{t.auth.dashboard.comingSoon}</span>
          <p className="dashboard__desc">{t.auth.dashboard.desc}</p>
        </div>
      </main>
    </div>
  );
}