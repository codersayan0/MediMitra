import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import { ROUTES } from "@/constants";

import "@/styles/patient-login.css";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 6.5h16v11H4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m5 8 7 5 7-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 3l18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.3A10.8 10.8 0 0 1 12 5c5 0 8.5 5 8.5 5a15 15 0 0 1-3.1 3.5M6.3 6.3C4.1 7.8 3 10 3 10s3.5 5 9 5c.9 0 1.8-.1 2.6-.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3 19 6v5c0 4.5-2.9 7.9-7 10-4.1-2.1-7-5.5-7-10V6l7-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m8.8 12 2.1 2.1 4.5-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.8 8.8c0 5-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.95h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.23Z"
      />
      <path
        fill="#34A853"
        d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.7Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.8A5.85 5.85 0 0 1 6.23 12c0-.62.11-1.23.31-1.8V7.68H3.3A9.73 9.73 0 0 0 2.27 12c0 1.57.38 3.06 1.03 4.32l3.24-2.52Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.17c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.26 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.38l3.24 2.52c.77-2.31 2.92-4.03 5.46-4.03Z"
      />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#F35325" d="M3 3h8.5v8.5H3z" />
      <path fill="#81BC06" d="M12.5 3H21v8.5h-8.5z" />
      <path fill="#05A6F0" d="M3 12.5h8.5V21H3z" />
      <path fill="#FFBA08" d="M12.5 12.5H21V21h-8.5z" />
    </svg>
  );
}

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError(null);
    setOauthNotice(null);
    setIsSubmitting(true);

    const response = await authService.login({
      email,
      password,
      remember_me: rememberMe,
    });

    setIsSubmitting(false);

    if (response.success && response.data) {
      loginWithToken(response.data);
      navigate(ROUTES.patient.dashboard);
      return;
    }

    setError(response.message ?? t.auth.errors.generic);
  };

  const handleOAuth = (provider: string) => {
    setOauthNotice(
      t.auth.login.oauthUnavailable.replace("{provider}", provider),
    );
  };

  return (
    <main className="patient-login">
      <div className="patient-login__ambient patient-login__ambient--one" />
      <div className="patient-login__ambient patient-login__ambient--two" />
      <div className="patient-login__ambient patient-login__ambient--three" />

      <div className="patient-login__container">
        {/* LEFT HERO */}
        <section className="patient-login__hero">
          <div className="patient-login__eyebrow">
            <span className="patient-login__eyebrow-icon">
              <HeartIcon />
            </span>
            <span>{t.auth.trust}</span>
          </div>

          <h1 className="patient-login__hero-title">
            Welcome to
            <span>MediMitra</span>
          </h1>

          <p className="patient-login__hero-text">
            {t.auth.login.subtitle}
          </p>

          <div className="patient-login__benefits">
            <div className="patient-login__benefit">
              <span className="patient-login__benefit-icon patient-login__benefit-icon--green">
                <ShieldIcon />
              </span>

              <div>
                <strong>Secure &amp; Private</strong>
                <span>Your healthcare information stays protected.</span>
              </div>
            </div>

            <div className="patient-login__benefit">
              <span className="patient-login__benefit-icon patient-login__benefit-icon--purple">
                <SparkleIcon />
              </span>

              <div>
                <strong>AI-Powered Care</strong>
                <span>Intelligent healthcare assistance when needed.</span>
              </div>
            </div>

            <div className="patient-login__benefit">
              <span className="patient-login__benefit-icon patient-login__benefit-icon--blue">
                <HeartIcon />
              </span>

              <div>
                <strong>Personalized Healthcare</strong>
                <span>A modern experience designed around you.</span>
              </div>
            </div>
          </div>

          {/* Decorative healthcare illustration */}
          <div className="patient-login__visual" aria-hidden="true">
            <div className="patient-login__visual-ring patient-login__visual-ring--one" />
            <div className="patient-login__visual-ring patient-login__visual-ring--two" />

            <div className="patient-login__person">
              <div className="patient-login__person-hair" />
              <div className="patient-login__person-face">
                <span className="patient-login__eye patient-login__eye--left" />
                <span className="patient-login__eye patient-login__eye--right" />
                <span className="patient-login__smile" />
              </div>

              <div className="patient-login__person-body">
                <div className="patient-login__person-heart">
                  <HeartIcon />
                </div>
              </div>

              <div className="patient-login__phone">
                <div className="patient-login__phone-screen">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            <div className="patient-login__float patient-login__float--heart">
              <HeartIcon />
            </div>

            <div className="patient-login__float patient-login__float--shield">
              <ShieldIcon />
            </div>

            <div className="patient-login__float patient-login__float--sparkle">
              <SparkleIcon />
            </div>
          </div>

          <div className="patient-login__stats">
            <div>
              <strong>100%</strong>
              <span>Secure Platform</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Support Available</span>
            </div>

            <div>
              <strong>Trusted</strong>
              <span>Healthcare Experience</span>
            </div>
          </div>
        </section>

        {/* LOGIN CARD */}
        <section className="patient-login__card">
          <div className="patient-login__card-brand">
            <Logo size={44} />
            <span>MediMitra</span>
          </div>

          <div className="patient-login__heading">
            <h2>
              Patient <span>Login</span>
            </h2>

            <p>{t.auth.login.subtitle}</p>
          </div>

          <div className="patient-login__security">
            <span className="patient-login__security-icon">
              <ShieldIcon />
            </span>

            <span>{t.auth.trust}</span>
          </div>

          <form
            className="patient-login__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="patient-login__field">
              <label htmlFor="patient-login-email">
                {t.auth.fields.email}
              </label>

              <div className="patient-login__input-wrap">
                <MailIcon />

                <input
                  id="patient-login-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="patient-login__field">
              <label htmlFor="patient-login-password">
                {t.auth.fields.password}
              </label>

              <div className="patient-login__input-wrap">
                <LockIcon />

                <input
                  id="patient-login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <button
                  type="button"
                  className="patient-login__password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword
                      ? t.auth.fields.hide
                      : t.auth.fields.show
                  }
                >
                  <EyeIcon hidden={showPassword} />
                </button>
              </div>
            </div>

            <div className="patient-login__options">
              <label className="patient-login__remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span className="patient-login__checkmark">
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      d="m5 10 3 3 7-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {t.auth.login.rememberMe}
              </label>

              <Link
                to={ROUTES.patient.forgotPassword}
                className="patient-login__forgot"
              >
                {t.auth.login.forgotPassword}
              </Link>
            </div>

            {error && (
              <p className="patient-login__message patient-login__message--error">
                {error}
              </p>
            )}

            {oauthNotice && (
              <p className="patient-login__message patient-login__message--notice">
                {oauthNotice}
              </p>
            )}

            <Button
              type="submit"
              block
              disabled={isSubmitting}
              className="patient-login__submit"
            >
              <span>
                {isSubmitting
                  ? t.auth.login.submitting
                  : t.auth.login.submit}
              </span>

              {!isSubmitting && (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5 12h13M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Button>

            <div className="patient-login__divider">
              <span>{t.auth.login.orContinueWith}</span>
            </div>

            <div className="patient-login__oauth">
              <button
                type="button"
                className="patient-login__oauth-button"
                onClick={() => handleOAuth("Google")}
              >
                <GoogleIcon />
                <span>{t.auth.login.google}</span>
              </button>

              <button
                type="button"
                className="patient-login__oauth-button"
                onClick={() => handleOAuth("Microsoft")}
              >
                <MicrosoftIcon />
                <span>{t.auth.login.microsoft}</span>
              </button>
            </div>

            <p className="patient-login__register">
              {t.auth.login.noAccount}{" "}
              <Link to={ROUTES.patient.register}>
                {t.auth.login.createAccount}
              </Link>
            </p>
          </form>

          <div className="patient-login__card-footer">
            <span className="patient-login__footer-lock">
              <ShieldIcon />
            </span>

            <span>{t.auth.trust}</span>
          </div>
        </section>
      </div>
    </main>
  );
}