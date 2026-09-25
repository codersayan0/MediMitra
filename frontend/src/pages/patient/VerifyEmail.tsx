import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

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
  const [error, setError] =
    useState<string | null>(null);

  const [info, setInfo] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [cooldown, setCooldown] =
    useState(RESEND_SECONDS);

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setCooldown((seconds) => seconds - 1);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [cooldown]);

  const handleSubmit = async (
    event: FormEvent,
  ) => {
    event.preventDefault();

    setError(null);
    setInfo(null);

    if (!email) {
      setError(t.auth.errors.generic);
      return;
    }

    if (otp.length !== 6) {
      setError(t.auth.errors.generic);
      return;
    }

    setIsSubmitting(true);

    const response =
      await authService.verifyEmail(
        email,
        otp,
      );

    setIsSubmitting(false);

    if (
      response.success &&
      response.data
    ) {
      loginWithToken(response.data);

      navigate(
        ROUTES.patient.dashboard,
      );

      return;
    }

    setError(
      response.message ??
        t.auth.errors.generic,
    );
  };

  const handleResend = async () => {
    if (!email || cooldown > 0) {
      return;
    }

    setError(null);
    setInfo(null);

    const response =
      await authService.resendOtp(
        email,
        "register",
      );

    if (response.success) {
      setInfo(
        t.auth.otp.resent,
      );

      setCooldown(
        RESEND_SECONDS,
      );

      return;
    }

    setError(
      response.message ??
        t.auth.errors.generic,
    );
  };

  const minutes = String(
    Math.floor(cooldown / 60),
  ).padStart(2, "0");

  const seconds = String(
    cooldown % 60,
  ).padStart(2, "0");

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--center">
        <div
          className="otp-icon"
          aria-hidden="true"
        >
          ✉️
        </div>

        <h1 className="auth-card__title">
          {t.auth.otp.title}
        </h1>

        <p className="auth-card__subtitle">
          {t.auth.otp.subtitle.replace(
            "{email}",
            email,
          )}
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <OtpInput
            value={otp}
            onChange={setOtp}
          />

          {error && (
            <p
              className="form-error"
              role="alert"
            >
              {error}
            </p>
          )}

          {info && (
            <p
              className="form-notice"
              role="status"
            >
              {info}
            </p>
          )}

          <Button
            type="submit"
            block
            disabled={
              isSubmitting ||
              otp.length !== 6 ||
              !email
            }
          >
            {isSubmitting
              ? t.auth.otp.submitting
              : t.auth.otp.submit}
          </Button>

          <p className="auth-footer-text">
            {t.auth.otp.noCode}{" "}

            {cooldown > 0 ? (
              <span>
                {t.auth.otp.resendIn.replace(
                  "{time}",
                  `${minutes}:${seconds}`,
                )}
              </span>
            ) : (
              <button
                type="button"
                className="auth-link auth-link--button"
                onClick={handleResend}
                disabled={!email}
              >
                {t.auth.otp.resend}
              </button>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}