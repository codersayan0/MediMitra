import { useNavigate } from "react-router-dom";

import { useLanguage } from "@/hooks/useLanguage";
import { useDoctorAuth } from "@/hooks/useDoctorAuth";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Button } from "@/components/ui/Button";

import { doctorProfileImageService } from "@/services/doctorProfileImage.service";
import { ROUTES } from "@/constants";

export function DoctorDashboard() {
  const { t } = useLanguage();
  const { doctor, logout } = useDoctorAuth();
  const navigate = useNavigate();

  const avatar = doctorProfileImageService.get();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.doctor.login, { replace: true });
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header container">
        <div className="dashboard__brand">
          <span className="navbar__logo-icon" aria-hidden="true">+</span>
          MediMitra
        </div>

        <div className="dashboard__actions">
          <LanguageSelector />
          <ThemeToggle />
          <div className="dashboard__avatar" aria-hidden="true">
            {avatar ? <img src={avatar} alt="" /> : <span>🩺</span>}
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            {t.doctorAuth.dashboard.logout}
          </Button>
        </div>
      </header>

      <main className="dashboard__body container">
        <div className="dashboard__card">
          <div className="dashboard__illustration" aria-hidden="true">🩺</div>
          <p className="eyebrow">{t.doctorAuth.dashboard.welcome}</p>
          <h1>{t.doctorAuth.dashboard.title}</h1>

          <p className="dashboard__patient-name">
            {doctor
              ? `${doctor.title} ${doctor.first_name} ${doctor.last_name} · ${doctor.doctor_id}`
              : ""}
          </p>

          {doctor?.specialization && <span className="dashboard__badge">{doctor.specialization}</span>}

          <span className="dashboard__badge">{t.doctorAuth.dashboard.comingSoon}</span>

          <p className="dashboard__desc">{t.doctorAuth.dashboard.desc}</p>
        </div>
      </main>
    </div>
  );
}