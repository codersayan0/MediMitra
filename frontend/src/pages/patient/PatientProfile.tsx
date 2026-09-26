import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { patientService } from "@/services/patient.service";
import { profileImageService } from "@/services/profileImage.service";

import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";

import { ROUTES } from "@/constants";

import type { PatientProfile as PatientProfileType } from "@/types";

import "@/styles/patient-profile.css";

export function PatientProfilePage() {
  const navigate = useNavigate();
  const { patient, logout } = useAuth();

  const [profile, setProfile] =
    useState<PatientProfileType | null>(patient);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pinCode, setPinCode] = useState("");

  const avatar = profileImageService.get();

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await patientService.getProfile();

        if (!mounted) {
          return;
        }

        setProfile(data);
        setPhone(data.phone ?? "");
        setAddress(data.address ?? "");
        setCountry(data.country ?? "");
        setState(data.state ?? "");
        setDistrict(data.district ?? "");
        setPinCode(data.pin_code ?? "");
      } catch (err) {
        console.error("Failed to load patient profile:", err);

        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your profile."
          );
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    if (!address.trim()) {
      setError("Address is required.");
      return;
    }

    try {
      setIsSaving(true);

      const updatedProfile =
        await patientService.updateProfile({
          phone: phone.trim(),
          address: address.trim(),
          country: country.trim(),
          state: state.trim(),
          district: district.trim(),
          pin_code: pinCode.trim(),
        });

      setProfile(updatedProfile);

      setPhone(updatedProfile.phone ?? "");
      setAddress(updatedProfile.address ?? "");
      setCountry(updatedProfile.country ?? "");
      setState(updatedProfile.state ?? "");
      setDistrict(updatedProfile.district ?? "");
      setPinCode(updatedProfile.pin_code ?? "");

      setSuccess(
        "Your profile has been updated successfully."
      );
    } catch (err) {
      console.error("Profile update error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update your profile."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();

    navigate(ROUTES.patient.login, {
      replace: true,
    });
  };

  const fullName = profile
    ? `${profile.title} ${profile.first_name} ${profile.last_name}`
    : "Patient";

  return (
    <div className="patient-profile-page">
      <header className="patient-profile-header">
        <button
          type="button"
          className="patient-profile-brand"
          onClick={() =>
            navigate(ROUTES.patient.dashboard)
          }
        >
          <Logo size={38} />

          <div>
            <strong>MediMitra</strong>
            <span>Healthcare Companion</span>
          </div>
        </button>

        <div className="patient-profile-header__actions">
          <LanguageSelector />
          <ThemeToggle />

          <button
            type="button"
            className="patient-profile-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="patient-profile-main">
        <div className="patient-profile-top">
          <button
            type="button"
            className="patient-profile-back"
            onClick={() =>
              navigate(ROUTES.patient.dashboard)
            }
          >
            ← Dashboard
          </button>

          <div>
            <span className="patient-profile-eyebrow">
              Account
            </span>

            <h1>My Profile</h1>

            <p>
              View and manage your MediMitra patient
              information.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="patient-profile-status">
            Loading your profile...
          </div>
        ) : (
          <>
            <section className="patient-profile-identity">
              <div className="patient-profile-avatar">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={`${fullName} profile`}
                  />
                ) : (
                  <span>
                    {profile?.first_name?.[0] ?? "P"}
                    {profile?.last_name?.[0] ?? ""}
                  </span>
                )}
              </div>

              <div>
                <span>Patient</span>

                <h2>{fullName}</h2>

                <strong>
                  Patient ID:{" "}
                  {profile?.patient_id ?? "Not available"}
                </strong>
              </div>
            </section>

            {success && (
              <div
                className="patient-profile-alert patient-profile-alert--success"
                role="status"
              >
                {success}
              </div>
            )}

            {error && (
              <div
                className="patient-profile-alert patient-profile-alert--error"
                role="alert"
              >
                {error}
              </div>
            )}

            <form
              className="patient-profile-layout"
              onSubmit={handleSubmit}
            >
              <section className="patient-profile-card">
                <div className="patient-profile-card__header">
                  <div>
                    <span>Personal Information</span>

                    <h2>Basic Details</h2>
                  </div>
                </div>

                <div className="patient-profile-grid">
                  <div className="patient-profile-field">
                    <label htmlFor="patient-id">
                      Patient ID
                    </label>

                    <input
                      id="patient-id"
                      value={profile?.patient_id ?? ""}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="patient-profile-field">
                    <label htmlFor="full-name">
                      Full Name
                    </label>

                    <input
                      id="full-name"
                      value={fullName}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="patient-profile-field">
                    <label htmlFor="date-of-birth">
                      Date of Birth
                    </label>

                    <input
                      id="date-of-birth"
                      value={
                        profile?.date_of_birth ?? ""
                      }
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="patient-profile-field">
                    <label htmlFor="email">
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={profile?.email ?? ""}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
              </section>

              <section className="patient-profile-card">
                <div className="patient-profile-card__header">
                  <div>
                    <span>Contact Information</span>

                    <h2>Editable Details</h2>
                  </div>
                </div>

                <div className="patient-profile-grid">
                  <div className="patient-profile-field">
                    <label htmlFor="phone">
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value)
                      }
                      maxLength={15}
                      required
                    />
                  </div>

                  <div className="patient-profile-field patient-profile-field--full">
                    <label htmlFor="address">
                      Address
                    </label>

                    <textarea
                      id="address"
                      value={address}
                      onChange={(event) =>
                        setAddress(event.target.value)
                      }
                      rows={4}
                      required
                    />
                  </div>

                  <div className="patient-profile-field">
                    <label htmlFor="country">
                      Country
                    </label>

                    <input
                      id="country"
                      value={country}
                      onChange={(event) =>
                        setCountry(event.target.value)
                      }
                    />
                  </div>

                  <div className="patient-profile-field">
                    <label htmlFor="state">
                      State
                    </label>

                    <input
                      id="state"
                      value={state}
                      onChange={(event) =>
                        setState(event.target.value)
                      }
                    />
                  </div>

                  <div className="patient-profile-field">
                    <label htmlFor="district">
                      District
                    </label>

                    <input
                      id="district"
                      value={district}
                      onChange={(event) =>
                        setDistrict(event.target.value)
                      }
                    />
                  </div>

                  <div className="patient-profile-field">
                    <label htmlFor="pinCode">
                      PIN Code
                    </label>

                    <input
                      id="pinCode"
                      value={pinCode}
                      onChange={(event) =>
                        setPinCode(event.target.value)
                      }
                      maxLength={10}
                    />
                  </div>
                </div>
              </section>

              <section className="patient-profile-card">
                <div className="patient-profile-card__header">
                  <div>
                    <span>Account Security</span>

                    <h2>Verification</h2>
                  </div>
                </div>

                <div className="patient-profile-security">
                  <div>
                    <strong>Email Verification</strong>

                    <span>
                      {profile?.email_verified
                        ? "Your email address is verified."
                        : "Your email address is not verified."}
                    </span>
                  </div>

                  <span
                    className={
                      profile?.email_verified
                        ? "profile-status profile-status--verified"
                        : "profile-status"
                    }
                  >
                    {profile?.email_verified
                      ? "Verified"
                      : "Pending"}
                  </span>
                </div>

                <div className="patient-profile-security">
                  <div>
                    <strong>Password</strong>

                    <span>
                      Your password cannot be changed
                      from this profile section.
                    </span>
                  </div>

                  <button
                    type="button"
                    className="patient-profile-secondary-button"
                    onClick={() =>
                      navigate(
                        ROUTES.patient.forgotPassword
                      )
                    }
                  >
                    Change Password
                  </button>
                </div>
              </section>

              <div className="patient-profile-actions">
                <button
                  type="button"
                  className="patient-profile-secondary-button"
                  onClick={() =>
                    navigate(ROUTES.patient.dashboard)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="patient-profile-primary-button"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
}

export default PatientProfilePage;
