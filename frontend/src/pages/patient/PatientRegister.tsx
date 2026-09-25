import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { ProfileImageUploader } from "@/components/patient/ProfileImageUploader";
import { useLanguage } from "@/hooks/useLanguage";
import { authService } from "@/services/auth.service";
import { ID_PROOF_OPTIONS, ROUTES, TITLE_OPTIONS } from "@/constants";
import type { PatientRegisterPayload } from "@/types";

const emptyForm: PatientRegisterPayload = {
  title: "Mr",
  first_name: "",
  last_name: "",
  date_of_birth: "",
  address: "",
  country: "India",
  state: "",
  district: "",
  pin_code: "",
  id_proof_type: "aadhaar",
  id_proof_number: "",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
  terms_accepted: false,
};

export function PatientRegister() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState<PatientRegisterPayload>(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const update = <K extends keyof PatientRegisterPayload>(key: K, value: PatientRegisterPayload[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setAlreadyExists(false);

    if (form.password !== form.confirm_password) {
      setError(t.auth.errors.passwordMismatch);
      return;
    }
    if (!form.terms_accepted) {
      setError(t.auth.errors.termsRequired);
      return;
    }

    setIsSubmitting(true);
    const res = await authService.register(form);
    setIsSubmitting(false);

    if (res.success) {
      navigate(`${ROUTES.patient.verifyEmail}?email=${encodeURIComponent(form.email)}`);
      return;
    }

    if (res.message?.toLowerCase().includes("already exists")) {
      setAlreadyExists(true);
    }
    setError(res.message ?? t.auth.errors.generic);
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <h1 className="auth-card__title">{t.auth.register.title}</h1>
        <p className="auth-card__subtitle">{t.auth.register.subtitle}</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="form-section">
            <legend><span className="form-section__num">01</span> {t.auth.register.sectionPersonal}</legend>
            <div className="form-grid">
              <div className="form-field form-field--sm">
                <label htmlFor="title">{t.auth.fields.title}</label>
                <select id="title" value={form.title} onChange={(e) => update("title", e.target.value as PatientRegisterPayload["title"])}>
                  {TITLE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="first_name">{t.auth.fields.firstName}</label>
                <input id="first_name" required value={form.first_name} onChange={(e) => update("first_name", e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="last_name">{t.auth.fields.lastName}</label>
                <input id="last_name" required value={form.last_name} onChange={(e) => update("last_name", e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="dob">{t.auth.fields.dob}</label>
                <input id="dob" type="date" required value={form.date_of_birth} onChange={(e) => update("date_of_birth", e.target.value)} />
              </div>
            </div>
            <ProfileImageUploader />
          </fieldset>

          <fieldset className="form-section">
            <legend><span className="form-section__num">02</span> {t.auth.register.sectionAddress}</legend>
            <div className="form-field">
              <label htmlFor="address">{t.auth.fields.address}</label>
              <input id="address" required value={form.address} onChange={(e) => update("address", e.target.value)} />
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="country">{t.auth.fields.country}</label>
                <input id="country" required value={form.country} onChange={(e) => update("country", e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="state">{t.auth.fields.state}</label>
                <input id="state" required value={form.state} onChange={(e) => update("state", e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="district">{t.auth.fields.district}</label>
                <input id="district" required value={form.district} onChange={(e) => update("district", e.target.value)} />
              </div>
              <div className="form-field form-field--sm">
                <label htmlFor="pin_code">{t.auth.fields.pinCode}</label>
                <input id="pin_code" required value={form.pin_code} onChange={(e) => update("pin_code", e.target.value)} />
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend><span className="form-section__num">03</span> {t.auth.register.sectionIdentity}</legend>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="id_type">{t.auth.fields.idType}</label>
                <select id="id_type" value={form.id_proof_type} onChange={(e) => update("id_proof_type", e.target.value as PatientRegisterPayload["id_proof_type"])}>
                  {ID_PROOF_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="id_number">{t.auth.fields.idNumber}</label>
                <input id="id_number" required value={form.id_proof_number} onChange={(e) => update("id_proof_number", e.target.value)} />
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend><span className="form-section__num">04</span> {t.auth.register.sectionContact}</legend>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="reg-email">{t.auth.fields.email}</label>
                <input id="reg-email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="phone">{t.auth.fields.phone}</label>
                <input id="phone" required placeholder="+91XXXXXXXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend><span className="form-section__num">05</span> {t.auth.register.sectionSecurity}</legend>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="reg-password">{t.auth.fields.password}</label>
                <div className="input-with-action">
                  <input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                  />
                  <button type="button" className="input-action" onClick={() => setShowPassword((v) => !v)}>
                    {showPassword ? t.auth.fields.hide : t.auth.fields.show}
                  </button>
                </div>
                <PasswordStrength password={form.password} />
              </div>
              <div className="form-field">
                <label htmlFor="confirm_password">{t.auth.fields.confirmPassword}</label>
                <input
                  id="confirm_password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.confirm_password}
                  onChange={(e) => update("confirm_password", e.target.value)}
                />
              </div>
            </div>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.terms_accepted}
                onChange={(e) => update("terms_accepted", e.target.checked)}
              />
              {t.auth.register.terms}
            </label>
          </fieldset>

          <div className="auth-trust">🔒 {t.auth.trust}</div>

          {error && (
            <p className="form-error" role="alert">
              {error}{" "}
              {alreadyExists && <Link to={ROUTES.patient.login}>{t.auth.login.submit}</Link>}
            </p>
          )}

          <Button type="submit" block disabled={isSubmitting}>
            {isSubmitting ? t.auth.register.submitting : t.auth.register.submit}
          </Button>

          <p className="auth-footer-text">
            {t.auth.register.haveAccount} <Link to={ROUTES.patient.login}>{t.auth.login.submit}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}