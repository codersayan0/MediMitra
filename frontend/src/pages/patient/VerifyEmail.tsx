import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { OtpInput } from "@/components/auth/OtpInput";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";
import { ROUTES } from "@/constants";

const RESEND_SECONDS = 60;

export function VerifyEmail() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const [params] = useSearchParams();
  const email = params.get("email") ?? "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const res = await authService.verifyEmail(email, otp);
    setIsSubmitting(false);

    if (res.success && res.data) {
      loginWithToken(res.data);
      navigate(ROUTES.patient.dashboard);
    } else {
      setError(res.message ?? t.auth.errors.generic);
    }
  };

  const handleResend = async () => {
    setError(null);
    setInfo(null);
    const res = await authService.resendOtp(email, "register");
    if (res.success) {
      setInfo(t.auth.otp.resent);
      setCooldown(RESEND_SECONDS);
    } else {
      setError(res.message ?? t.auth.errors.generic);
    }
  };

  const mm = String(Math.floor(cooldown / 60)).padStart(2, "0");
  const ss = String(cooldown % 60).padStart(2, "0");

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--center">
        <div className="otp-icon" aria-hidden="true">✉️</div>
        <h1 className="auth-card__title">{t.auth.otp.title}</h1>
        <p className="auth-card__subtitle">{t.auth.otp.subtitle.replace("{email}", email)}</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <OtpInput value={otp} onChange={setOtp} />

          {error && <p className="form-error" role="alert">{error}</p>}
          {info && <p className="form-notice" role="status">{info}</p>}

          <Button type="submit" block disabled={isSubmitting || otp.length !== 6}>
            {isSubmitting ? t.auth.otp.submitting : t.auth.otp.submit}
          </Button>

          <p className="auth-footer-text">
            {t.auth.otp.noCode}{" "}
            {cooldown > 0 ? (
              <span>{t.auth.otp.resendIn.replace("{time}", `${mm}:${ss}`)}</span>
            ) : (
              <button type="button" className="auth-link auth-link--button" onClick={handleResend}>
                {t.auth.otp.resend}
              </button>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}