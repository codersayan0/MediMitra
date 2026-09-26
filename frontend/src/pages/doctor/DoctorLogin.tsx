import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { useDoctorAuth } from "@/hooks/useDoctorAuth";
import { doctorAuthService } from "@/services/doctorAuth.service";
import { ROUTES } from "@/constants";

export function DoctorLogin() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { loginWithToken } = useDoctorAuth();

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
    const res = await doctorAuthService.login({ email, password, remember_me: rememberMe });
    setIsSubmitting(false);

    if (res.success && res.data) {
      loginWithToken(res.data);
      navigate(ROUTES.doctor.dashboard);
    } else {
      setError(res.message ?? t.auth.errors.generic);
    }
  };

  const handleOAuth = (provider: string) => {
    setOauthNotice(t.doctorAuth.login.oauthUnavailable.replace("{provider}", provider));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="otp-icon" aria-hidden="true">🩺</div>
        <h1 className="auth-card__title">{t.doctorAuth.login.title}</h1>
        <p className="auth-card__subtitle">{t.doctorAuth.login.subtitle}</p>

        <div className="auth-trust">🔒 {t.auth.trust}</div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="doc-login-email">{t.auth.fields.email}</label>
            <input
              id="doc-login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="doc-login-password">{t.auth.fields.password}</label>
            <div className="input-with-action">
              <input
                id="doc-login-password"
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
              {t.doctorAuth.login.rememberMe}
            </label>
            <Link to={ROUTES.doctor.forgotPassword} className="auth-link">
              {t.doctorAuth.login.forgotPassword}
            </Link>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}
          {oauthNotice && <p className="form-notice" role="status">{oauthNotice}</p>}

          <Button type="submit" block disabled={isSubmitting}>
            {isSubmitting ? t.doctorAuth.login.submitting : t.doctorAuth.login.submit}
          </Button>

          <div className="auth-divider"><span>{t.doctorAuth.login.orContinueWith}</span></div>

          <div className="oauth-buttons">
            <button type="button" className="btn btn--outline btn--block" onClick={() => handleOAuth("Google")}>
              {t.doctorAuth.login.google}
            </button>
            <button type="button" className="btn btn--outline btn--block" onClick={() => handleOAuth("Microsoft")}>
              {t.doctorAuth.login.microsoft}
            </button>
          </div>

          <p className="auth-footer-text">
            {t.doctorAuth.login.noAccount} <Link to={ROUTES.doctor.register}>{t.doctorAuth.login.createAccount}</Link>
          </p>
          <p className="auth-footer-text">
            <Link to={ROUTES.roleSelection} className="auth-link">
              {t.doctorAuth.login.backToRoleSelection}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}