import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { DoctorProfileImageUploader } from "@/components/doctor/DoctorProfileImageUploader";
import { DoctorDocumentUploader } from "@/components/doctor/DoctorDocumentUploader";

import { useLanguage } from "@/hooks/useLanguage";
import { doctorAuthService } from "@/services/doctorAuth.service";

import {
  CONSULTATION_TYPE_OPTIONS,
  DAYS_OF_WEEK,
  DEGREE_OPTIONS,
  ID_PROOF_OPTIONS,
  ROUTES,
  SPECIALIZATION_OPTIONS,
} from "@/constants";

import type {
  DayOfWeek,
  DoctorAvailability,
  DoctorChamber,
  DoctorRegisterPayload,
} from "@/types";

const CURRENT_YEAR = new Date().getFullYear();
const TODAY = new Date().toISOString().split("T")[0];

type ConsultationMode = "in_person" | "online" | "both";

const emptyChamber: DoctorChamber = {
  name: "",
  address: "",
  country: "India",
  state: "",
  district: "",
  pin_code: "",
};

const emptySlot: DoctorAvailability = {
  day: "Monday",
  start_time: "09:00",
  end_time: "13:00",
};

const emptyForm: DoctorRegisterPayload = {
  title: "Dr",
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
  medical_degree: { degree_name: "MBBS", institution: "", passing_year: CURRENT_YEAR },
  medical_registration_number: "",
  specialization: "General Physician",
  consultation_type: ["in_person"],
  availability: [],
  chambers: [],
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
  terms_accepted: false,
};

export function DoctorRegister() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState<DoctorRegisterPayload>(emptyForm);
  const [degreeOther, setDegreeOther] = useState("");
  const [specializationOther, setSpecializationOther] = useState("");
  const [consultationMode, setConsultationMode] = useState<ConsultationMode>("in_person");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const update = <K extends keyof DoctorRegisterPayload>(key: K, value: DoctorRegisterPayload[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateDegreeField = <K extends keyof DoctorRegisterPayload["medical_degree"]>(
    key: K,
    value: DoctorRegisterPayload["medical_degree"][K]
  ) => {
    setForm((prev) => ({ ...prev, medical_degree: { ...prev.medical_degree, [key]: value } }));
  };

  const handleConsultationChange = (mode: ConsultationMode) => {
    setConsultationMode(mode);
    update(
      "consultation_type",
      mode === "both" ? ["in_person", "online"] : [mode]
    );
  };

  // ---- Availability slots ----
  const addSlot = () => update("availability", [...form.availability, { ...emptySlot }]);
  const removeSlot = (index: number) =>
    update("availability", form.availability.filter((_, i) => i !== index));
  const updateSlot = <K extends keyof DoctorAvailability>(index: number, key: K, value: DoctorAvailability[K]) => {
    const next = form.availability.map((slot, i) => (i === index ? { ...slot, [key]: value } : slot));
    update("availability", next);
  };

  // ---- Chambers ----
  const addChamber = () => update("chambers", [...form.chambers, { ...emptyChamber }]);
  const removeChamber = (index: number) => update("chambers", form.chambers.filter((_, i) => i !== index));
  const updateChamber = <K extends keyof DoctorChamber>(index: number, key: K, value: DoctorChamber[K]) => {
    const next = form.chambers.map((chamber, i) => (i === index ? { ...chamber, [key]: value } : chamber));
    update("chambers", next);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
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

    const payload: DoctorRegisterPayload = {
      ...form,
      medical_degree: {
        ...form.medical_degree,
        degree_name: form.medical_degree.degree_name === "Other" ? degreeOther : form.medical_degree.degree_name,
      },
      specialization: form.specialization === "Other" ? specializationOther : form.specialization,
    };

    setIsSubmitting(true);
    const response = await doctorAuthService.register(payload);
    setIsSubmitting(false);

    if (response.success) {
      navigate(`${ROUTES.doctor.verifyEmail}?email=${encodeURIComponent(form.email)}`);
      return;
    }

    if (response.message?.toLowerCase().includes("already exists")) {
      setAlreadyExists(true);
    }

    setError(response.message ?? t.auth.errors.generic);
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <h1 className="auth-card__title">{t.doctorAuth.register.title}</h1>
        <p className="auth-card__subtitle">{t.doctorAuth.register.subtitle}</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* ============ 01 — PERSONAL INFORMATION ============ */}
          <fieldset className="form-section">
            <legend><span className="form-section__num">01</span> {t.doctorAuth.register.section01}</legend>

            <div className="form-grid">
              <div className="form-field form-field--sm">
                <label>{t.auth.fields.title}</label>
                <input value="Dr" disabled readOnly />
              </div>

              <div className="form-field">
                <label htmlFor="doc-first-name">{t.auth.fields.firstName}</label>
                <input
                  id="doc-first-name"
                  required
                  value={form.first_name}
                  onChange={(e) => update("first_name", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="doc-last-name">{t.auth.fields.lastName}</label>
                <input
                  id="doc-last-name"
                  required
                  value={form.last_name}
                  onChange={(e) => update("last_name", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="doc-dob">{t.auth.fields.dob}</label>
                <input
                  id="doc-dob"
                  type="date"
                  required
                  max={TODAY}
                  value={form.date_of_birth}
                  onChange={(e) => update("date_of_birth", e.target.value)}
                />
              </div>
            </div>

            <DoctorProfileImageUploader />
          </fieldset>

          {/* ============ 02 — ADDRESS ============ */}
          <fieldset className="form-section">
            <legend><span className="form-section__num">02</span> {t.doctorAuth.register.section02}</legend>

            <div className="form-field">
              <label htmlFor="doc-address">{t.auth.fields.address}</label>
              <input id="doc-address" required value={form.address} onChange={(e) => update("address", e.target.value)} />
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="doc-country">{t.auth.fields.country}</label>
                <input id="doc-country" required value={form.country} onChange={(e) => update("country", e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="doc-state">{t.auth.fields.state}</label>
                <input id="doc-state" required value={form.state} onChange={(e) => update("state", e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="doc-district">{t.auth.fields.district}</label>
                <input id="doc-district" required value={form.district} onChange={(e) => update("district", e.target.value)} />
              </div>
              <div className="form-field form-field--sm">
                <label htmlFor="doc-pin">{t.auth.fields.pinCode}</label>
                <input
                  id="doc-pin"
                  required
                  inputMode="numeric"
                  value={form.pin_code}
                  onChange={(e) => update("pin_code", e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          {/* ============ 03 — IDENTITY VERIFICATION ============ */}
          <fieldset className="form-section">
            <legend><span className="form-section__num">03</span> {t.doctorAuth.register.section03}</legend>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="doc-id-type">{t.auth.fields.idType}</label>
                <select
                  id="doc-id-type"
                  value={form.id_proof_type}
                  onChange={(e) => update("id_proof_type", e.target.value as DoctorRegisterPayload["id_proof_type"])}
                >
                  {ID_PROOF_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="doc-id-number">{t.auth.fields.idNumber}</label>
                <input
                  id="doc-id-number"
                  required
                  value={form.id_proof_number}
                  onChange={(e) => update("id_proof_number", e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          {/* ============ 04 — MEDICAL QUALIFICATION ============ */}
          <fieldset className="form-section">
            <legend><span className="form-section__num">04</span> {t.doctorAuth.register.section04}</legend>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="doc-degree">{t.doctorAuth.register.degree}</label>
                <select
                  id="doc-degree"
                  value={form.medical_degree.degree_name}
                  onChange={(e) => updateDegreeField("degree_name", e.target.value)}
                >
                  {DEGREE_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {form.medical_degree.degree_name === "Other" && (
                <div className="form-field">
                  <label htmlFor="doc-degree-other">{t.doctorAuth.register.degreeOther}</label>
                  <input
                    id="doc-degree-other"
                    required
                    value={degreeOther}
                    onChange={(e) => setDegreeOther(e.target.value)}
                  />
                </div>
              )}

              <div className="form-field">
                <label htmlFor="doc-institution">{t.doctorAuth.register.institution}</label>
                <input
                  id="doc-institution"
                  required
                  value={form.medical_degree.institution}
                  onChange={(e) => updateDegreeField("institution", e.target.value)}
                />
              </div>

              <div className="form-field form-field--sm">
                <label htmlFor="doc-passing-year">{t.doctorAuth.register.passingYear}</label>
                <input
                  id="doc-passing-year"
                  type="number"
                  min={1950}
                  max={CURRENT_YEAR}
                  required
                  value={form.medical_degree.passing_year}
                  onChange={(e) => updateDegreeField("passing_year", Number(e.target.value))}
                />
              </div>

              <div className="form-field">
                <label htmlFor="doc-specialization">{t.doctorAuth.register.specialization}</label>
                <select
                  id="doc-specialization"
                  value={form.specialization}
                  onChange={(e) => update("specialization", e.target.value)}
                >
                  {SPECIALIZATION_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {form.specialization === "Other" && (
                <div className="form-field">
                  <label htmlFor="doc-specialization-other">{t.doctorAuth.register.specializationOther}</label>
                  <input
                    id="doc-specialization-other"
                    required
                    value={specializationOther}
                    onChange={(e) => setSpecializationOther(e.target.value)}
                  />
                </div>
              )}
            </div>
          </fieldset>

          {/* ============ 05 — PROFESSIONAL REGISTRATION ============ */}
          <fieldset className="form-section">
            <legend><span className="form-section__num">05</span> {t.doctorAuth.register.section05}</legend>

            <div className="form-field">
              <label htmlFor="doc-reg-number">{t.doctorAuth.register.registrationNumber}</label>
              <input
                id="doc-reg-number"
                required
                value={form.medical_registration_number}
                onChange={(e) => update("medical_registration_number", e.target.value)}
              />
            </div>

            <DoctorDocumentUploader />
          </fieldset>

          {/* ============ 06 — CONSULTATION & AVAILABILITY ============ */}
          <fieldset className="form-section">
            <legend><span className="form-section__num">06</span> {t.doctorAuth.register.section06}</legend>

            <div className="form-field">
              <label>{t.doctorAuth.register.consultationType}</label>
              <div className="segmented">
                {CONSULTATION_TYPE_OPTIONS.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={`segmented__option ${consultationMode === option.value ? "is-active" : ""}`}
                    onClick={() => handleConsultationChange(option.value)}
                  >
                    {option.value === "in_person"
                      ? t.doctorAuth.register.consultationInPerson
                      : option.value === "online"
                      ? t.doctorAuth.register.consultationOnline
                      : t.doctorAuth.register.consultationBoth}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field" style={{ marginTop: 16 }}>
              <label>{t.doctorAuth.register.availability}</label>

              <div className="repeatable-list">
                {form.availability.map((slot, index) => (
                  <div className="repeatable-card" key={index}>
                    <button
                      type="button"
                      className="repeatable-card__remove"
                      onClick={() => removeSlot(index)}
                      aria-label={t.doctorAuth.register.removeSlot}
                    >
                      ✕
                    </button>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>{t.doctorAuth.register.day}</label>
                        <select
                          value={slot.day}
                          onChange={(e) => updateSlot(index, "day", e.target.value as DayOfWeek)}
                        >
                          {DAYS_OF_WEEK.map((day) => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-field">
                        <label>{t.doctorAuth.register.startTime}</label>
                        <input
                          type="time"
                          value={slot.start_time}
                          onChange={(e) => updateSlot(index, "start_time", e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label>{t.doctorAuth.register.endTime}</label>
                        <input
                          type="time"
                          value={slot.end_time}
                          onChange={(e) => updateSlot(index, "end_time", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button type="button" className="repeatable-add" onClick={addSlot}>
                {t.doctorAuth.register.addSlot}
              </button>
            </div>
          </fieldset>

          {/* ============ 07 — CHAMBER INFORMATION ============ */}
          <fieldset className="form-section">
            <legend><span className="form-section__num">07</span> {t.doctorAuth.register.section07}</legend>

            <div className="repeatable-list">
              {form.chambers.map((chamber, index) => (
                <div className="repeatable-card" key={index}>
                  <button
                    type="button"
                    className="repeatable-card__remove"
                    onClick={() => removeChamber(index)}
                    aria-label={t.doctorAuth.register.removeChamber}
                  >
                    ✕
                  </button>

                  <div className="form-field">
                    <label>{t.doctorAuth.register.chamberName}</label>
                    <input
                      required
                      value={chamber.name}
                      onChange={(e) => updateChamber(index, "name", e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>{t.auth.fields.address}</label>
                    <input
                      required
                      value={chamber.address}
                      onChange={(e) => updateChamber(index, "address", e.target.value)}
                    />
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label>{t.auth.fields.country}</label>
                      <input
                        required
                        value={chamber.country}
                        onChange={(e) => updateChamber(index, "country", e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label>{t.auth.fields.state}</label>
                      <input
                        required
                        value={chamber.state}
                        onChange={(e) => updateChamber(index, "state", e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label>{t.auth.fields.district}</label>
                      <input
                        required
                        value={chamber.district}
                        onChange={(e) => updateChamber(index, "district", e.target.value)}
                      />
                    </div>
                    <div className="form-field form-field--sm">
                      <label>{t.auth.fields.pinCode}</label>
                      <input
                        required
                        inputMode="numeric"
                        value={chamber.pin_code}
                        onChange={(e) => updateChamber(index, "pin_code", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="repeatable-add" onClick={addChamber}>
              {t.doctorAuth.register.addChamber}
            </button>
          </fieldset>

          {/* ============ 08 — CONTACT INFORMATION ============ */}
          <fieldset className="form-section">
            <legend><span className="form-section__num">08</span> {t.doctorAuth.register.section08}</legend>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="doc-reg-email">{t.auth.fields.email}</label>
                <input
                  id="doc-reg-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="doc-phone">{t.auth.fields.phone}</label>
                <input
                  id="doc-phone"
                  required
                  placeholder="+91XXXXXXXXXX"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          {/* ============ 09 — ACCOUNT SECURITY ============ */}
          <fieldset className="form-section">
            <legend><span className="form-section__num">09</span> {t.doctorAuth.register.section09}</legend>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="doc-reg-password">{t.auth.fields.password}</label>
                <div className="input-with-action">
                  <input
                    id="doc-reg-password"
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
                <label htmlFor="doc-confirm-password">{t.auth.fields.confirmPassword}</label>
                <input
                  id="doc-confirm-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.confirm_password}
                  onChange={(e) => update("confirm_password", e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          {/* ============ 10 — TERMS & CONSENT ============ */}
          <fieldset className="form-section">
            <legend><span className="form-section__num">10</span> {t.doctorAuth.register.section10}</legend>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.terms_accepted}
                onChange={(e) => update("terms_accepted", e.target.checked)}
              />
              {t.doctorAuth.register.terms}
            </label>
          </fieldset>

          <div className="auth-trust">🔒 {t.auth.trust}</div>

          {error && (
            <p className="form-error" role="alert">
              {error}{" "}
              {alreadyExists && <Link to={ROUTES.doctor.login}>{t.doctorAuth.login.submit}</Link>}
            </p>
          )}

          <Button type="submit" block disabled={isSubmitting}>
            {isSubmitting ? t.doctorAuth.register.submitting : t.doctorAuth.register.submit}
          </Button>

          <p className="auth-footer-text">
            {t.doctorAuth.register.haveAccount} <Link to={ROUTES.doctor.login}>{t.doctorAuth.login.submit}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}