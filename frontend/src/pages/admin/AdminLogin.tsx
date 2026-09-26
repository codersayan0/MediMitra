import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { adminAuthService } from "@/services/adminAuth.service";
import { ROUTES } from "@/constants";

/**
 * Administrative Login — mirrors PatientLogin/DoctorLogin's structure and
 * CSS classes (auth-page / auth-card / auth-form), but only ever sends
 * { login_id, password } to POST /auth/admin/login. The frontend never
 * knows, stores, or displays the real admin credentials — those live only
 * in backend/.env and are checked server-side.
 */
export function AdminLogin() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, loginWithToken } = useAdminAuth();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Already-authenticated admins visiting /admin/login go straight to the dashboard.
  if (!isLoading && isAuthenticated) {
    return <Navigate to={ROUTES.admin.dashboard} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await adminAuthService.login({ login_id: loginId, password });
    setIsSubmitting(false);

    if (res.success && res.data) {
      loginWithToken(res.data);
      navigate(ROUTES.admin.dashboard);
    } else {
      // Backend always returns a single generic message — never reveals
      // whether the Admin ID or the password was the one that was wrong.
      setError(res.message ?? t.auth.errors.generic);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="otp-icon" aria-hidden="true">
          🛡️
        </div>
        <h1 className="auth-card__title">{t.adminAuth.login.title}</h1>
        <p className="auth-card__subtitle">{t.adminAuth.login.subtitle}</p>

        <div className="auth-trust">🔒 {t.auth.trust}</div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="admin-login-id">{t.adminAuth.login.adminId}</label>
            <input
              id="admin-login-id"
              type="text"
              required
              autoComplete="username"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="admin-login-password">{t.auth.fields.password}</label>
            <div className="input-with-action">
              <input
                id="admin-login-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="input-action"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? t.auth.fields.hide : t.auth.fields.show}
              </button>
            </div>
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" block disabled={isSubmitting}>
            {isSubmitting ? t.adminAuth.login.submitting : t.adminAuth.login.submit}
          </Button>

          <p className="auth-footer-text">
            <Link to={ROUTES.roleSelection} className="auth-link">
              {t.adminAuth.login.backToRoleSelection}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}