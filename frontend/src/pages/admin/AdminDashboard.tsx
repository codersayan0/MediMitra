import { useNavigate } from "react-router-dom";

import { useLanguage } from "@/hooks/useLanguage";
import { useAdminAuth } from "@/hooks/useAdminAuth";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Button } from "@/components/ui/Button";

import { ROUTES } from "@/constants";

/**
 * Administrative Dashboard — intentionally minimal per spec: no statistics,
 * no user/doctor lists, no charts. Just a professional "Coming Soon" state
 * that reuses the existing .dashboard CSS (see styles/auth.css) so it stays
 * visually consistent with the Patient/Doctor dashboards in both themes.
 */
export function AdminDashboard() {
  const { t } = useLanguage();
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.admin.login, { replace: true });
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header container">
        <div className="dashboard__brand">
          <span className="navbar__logo-icon" aria-hidden="true">
            +
          </span>
          MediMitra
        </div>

        <div className="dashboard__actions">
          <LanguageSelector />
          <ThemeToggle />
          <div className="dashboard__avatar" aria-hidden="true">
            <span>🛡️</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            {t.adminAuth.dashboard.logout}
          </Button>
        </div>
      </header>

      <main className="dashboard__body container">
        <div className="dashboard__card">
          <div className="dashboard__illustration" aria-hidden="true">
            🛡️
          </div>
          <p className="eyebrow">{t.adminAuth.dashboard.welcome}</p>
          <h1>{t.adminAuth.dashboard.title}</h1>

          <span className="dashboard__badge">{t.adminAuth.dashboard.comingSoon}</span>

          <p className="dashboard__desc">{t.adminAuth.dashboard.desc}</p>
        </div>
      </main>
    </div>
  );
}