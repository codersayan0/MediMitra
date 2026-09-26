import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { OtpInput } from "@/components/auth/OtpInput";
import { PasswordStrength } from "@/components/auth/PasswordStrength";

import { useLanguage } from "@/hooks/useLanguage";
import { doctorAuthService } from "@/services/doctorAuth.service";
import { ROUTES } from "@/constants";

type Step = "email" | "otp" | "password";

export function DoctorForgotPassword() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOtp = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setInfo(null);

    if (!email.trim()) {
      setError(t.auth.errors.generic);
      return;
    }

    setIsSubmitting(true);
    const response = await doctorAuthService.forgotPassword(email.trim());
    setIsSubmitting(false);

    // Deliberately generic — avoids account/email enumeration.
    setInfo(response.message ?? t.doctorAuth.forgotPassword.genericSent);
    setStep("otp");
  };

  const handleVerifyOtp = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setInfo(null);

    if (otp.length !== 6) {
      setError(t.auth.errors.generic);
      return;
    }

    setIsSubmitting(true);
    const response = await doctorAuthService.verifyResetOtp(email.trim(), otp);
    setIsSubmitting(false);

    if (response.success && response.data) {
      setResetToken(response.data.reset_token);
      setStep("password");
      return;
    }

    setError(response.message ?? t.auth.errors.generic);
  };

  const handleResetPassword = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError(t.auth.errors.passwordMismatch);
      return;
    }

    setIsSubmitting(true);
    const response = await doctorAuthService.resetPassword(email.trim(), resetToken, newPassword, confirmPassword);
    setIsSubmitting(false);

    if (response.success) {
      navigate(ROUTES.doctor.login);
      return;
    }

    setError(response.message ?? t.auth.errors.generic);
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--center">
        <h1 className="auth-card__title">{t.doctorAuth.forgotPassword.title}</h1>

        {step === "email" && (
          <form className="auth-form" onSubmit={handleSendOtp} noValidate>
            <p className="auth-card__subtitle">{t.doctorAuth.forgotPassword.emailSubtitle}</p>

            <div className="form-field">
              <label htmlFor="doc-fp-email">{t.auth.fields.email}</label>
              <input
                id="doc-fp-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <Button type="submit" block disabled={isSubmitting}>
              {isSubmitting ? t.doctorAuth.forgotPassword.sending : t.doctorAuth.forgotPassword.sendCode}
            </Button>
          </form>
        )}

        {step === "otp" && (
          <form className="auth-form" onSubmit={handleVerifyOtp} noValidate>
            <p className="auth-card__subtitle">{t.doctorAuth.otp.subtitle.replace("{email}", email)}</p>

            {info && <p className="form-notice" role="status">{info}</p>}

            <OtpInput value={otp} onChange={setOtp} />

            {error && <p className="form-error" role="alert">{error}</p>}

            <Button type="submit" block disabled={isSubmitting || otp.length !== 6}>
              {isSubmitting ? t.doctorAuth.otp.submitting : t.doctorAuth.otp.submit}
            </Button>
          </form>
        )}

        {step === "password" && (
          <form className="auth-form" onSubmit={handleResetPassword} noValidate>
            <p className="auth-card__subtitle">{t.doctorAuth.forgotPassword.newPasswordSubtitle}</p>

            <div className="form-field">
              <label htmlFor="doc-new-password">{t.doctorAuth.forgotPassword.newPassword}</label>
              <input
                id="doc-new-password"
                type="password"
                required
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <PasswordStrength password={newPassword} />
            </div>

            <div className="form-field">
              <label htmlFor="doc-confirm-new-password">{t.auth.fields.confirmPassword}</label>
              <input
                id="doc-confirm-new-password"
                type="password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <Button type="submit" block disabled={isSubmitting}>
              {isSubmitting ? t.doctorAuth.forgotPassword.updating : t.doctorAuth.forgotPassword.updatePassword}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}