import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import { ROUTES } from "@/constants";

export function PatientLogin() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [oauthNotice, setOauthNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const res = await authService.login({ email, password, remember_me: rememberMe });
    setIsSubmitting(false);

    if (res.success && res.data) {
      loginWithToken(res.data);
      navigate(ROUTES.patient.dashboard);
    } else {
      setError(res.message ?? t.auth.errors.generic);
    }
  };

  const handleOAuth = (provider: string) => {
    setOauthNotice(t.auth.login.oauthUnavailable.replace("{provider}", provider));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__title">{t.auth.login.title}</h1>
        <p className="auth-card__subtitle">{t.auth.login.subtitle}</p>

        <div className="auth-trust">🔒 {t.auth.trust}</div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="login-email">{t.auth.fields.email}</label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="login-password">{t.auth.fields.password}</label>
            <div className="input-with-action">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="input-action" onClick={() => setShowPassword((v) => !v)}>
                {showPassword ? t.auth.fields.hide : t.auth.fields.show}
              </button>
            </div>
          </div>

          <div className="auth-form__row">
            <label className="checkbox">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              {t.auth.login.rememberMe}
            </label>
            <Link to={ROUTES.patient.forgotPassword} className="auth-link">
              {t.auth.login.forgotPassword}
            </Link>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}
          {oauthNotice && <p className="form-notice" role="status">{oauthNotice}</p>}

          <Button type="submit" block disabled={isSubmitting}>
            {isSubmitting ? t.auth.login.submitting : t.auth.login.submit}
          </Button>

          <div className="auth-divider"><span>{t.auth.login.orContinueWith}</span></div>

          <div className="oauth-buttons">
            <button type="button" className="btn btn--outline btn--block" onClick={() => handleOAuth("Google")}>
              {t.auth.login.google}
            </button>
            <button type="button" className="btn btn--outline btn--block" onClick={() => handleOAuth("Microsoft")}>
              {t.auth.login.microsoft}
            </button>
          </div>

          <p className="auth-footer-text">
            {t.auth.login.noAccount} <Link to={ROUTES.patient.register}>{t.auth.login.createAccount}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}