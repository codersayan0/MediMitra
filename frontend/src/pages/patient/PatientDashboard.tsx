import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";

import { profileImageService } from "@/services/profileImage.service";
import { patientService } from "@/services/patient.service";

import { ROUTES } from "@/constants";

import type { PatientProfile } from "@/types";

import "@/styles/patient-dashboard.css";

type IconName =
  | "home"
  | "case"
  | "history"
  | "document"
  | "ai"
  | "calendar"
  | "profile"
  | "settings"
  | "logout"
  | "bell"
  | "search"
  | "arrow"
  | "shield"
  | "report"
  | "upload"
  | "chat"
  | "clock"
  | "menu";

function Icon({
  name,
  size = 20,
}: {
  name: IconName;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );

    case "case":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="16" height="14" rx="2" />
          <path d="M8 6V4h8v2" />
          <path d="M8 12h8" />
          <path d="M12 9v6" />
        </svg>
      );

    case "history":
      return (
        <svg {...common}>
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "document":
      return (
        <svg {...common}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6M9 17h6" />
        </svg>
      );

    case "ai":
      return (
        <svg {...common}>
          <rect x="5" y="6" width="14" height="12" rx="3" />
          <path d="M9 10h.01M15 10h.01" />
          <path d="M9 14c1.7 1.2 4.3 1.2 6 0" />
          <path d="M12 3v3M3 12h2M19 12h2" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4M16 3v4M4 9h16" />
          <path d="M8 13h.01M12 13h.01M16 13h.01" />
        </svg>
      );

    case "profile":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5" />
        </svg>
      );

    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12a7 7 0 0 0-.2-1.7l2-1.2-2-3.4-2.2 1a7 7 0 0 0-2.8-1.7L13.5 3h-3l-.3 2a7 7 0 0 0-2.8 1.7l-2.2-1-2 3.4 2 1.2A7 7 0 0 0 5 12c0 .6.1 1.2.2 1.7l-2 1.2 2 3.4 2.2-1a7 7 0 0 0 2.8 1.7l.3 2h3l.3-2a7 7 0 0 0 2.8-1.7l2.2 1 2-3.4-2-1.2c.1-.5.2-1.1.2-1.7Z" />
        </svg>
      );

    case "logout":
      return (
        <svg {...common}>
          <path d="M10 5H5v14h5" />
          <path d="m14 8 4 4-4 4" />
          <path d="M18 12H8" />
        </svg>
      );

    case "bell":
      return (
        <svg {...common}>
          <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );

    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h13" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 19 6v5c0 4.5-2.9 7.9-7 10-4.1-2.1-7-5.5-7-10V6l7-3Z" />
          <path d="m8.5 12 2.2 2.2 4.8-5" />
        </svg>
      );

    case "report":
      return (
        <svg {...common}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v5h5" />
          <path d="M9 16v-3M12 16v-6M15 16v-4" />
        </svg>
      );

    case "upload":
      return (
        <svg {...common}>
          <path d="M12 16V4" />
          <path d="m7 9 5-5 5 5" />
          <path d="M5 20h14" />
        </svg>
      );

    case "chat":
      return (
        <svg {...common}>
          <path d="M5 5h14v10H9l-4 4V5Z" />
          <path d="M9 9h6M9 12h4" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );

    default:
      return null;
  }
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function PatientDashboard() {
  const navigate = useNavigate();
  const { patient, logout } = useAuth();

  const [dashboardPatient, setDashboardPatient] =
    useState<PatientProfile | null>(patient);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const avatar = profileImageService.get();

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await patientService.getDashboard();

        if (!mounted) {
          return;
        }

        if (response.success && response.data) {
          setDashboardPatient(response.data);
        } else {
          setError(
            response.message ??
              "Unable to load dashboard information."
          );
        }
      } catch (err) {
        console.error("Dashboard loading error:", err);

        if (mounted) {
          setError("Unable to load dashboard information.");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * Use the freshly loaded dashboard patient when available.
   * Fall back to the authenticated patient from AuthContext.
   */
  const dashboardData = dashboardPatient ?? patient;

  const patientName = dashboardData
    ? `${dashboardData.title} ${dashboardData.first_name} ${dashboardData.last_name}`
    : "Patient";

  const firstName = dashboardData?.first_name || "Patient";

  const patientId =
    dashboardData?.patient_id || "Not available";

  const handleLogout = async () => {
    await logout();

    navigate(ROUTES.patient.login, {
      replace: true,
    });
  };

  const showComingSoon = () => {
    // Step 1 intentionally keeps future modules disabled.
  };

  return (
    <div className="patient-dashboard">
      {/* SIDEBAR */}
      <aside className="patient-dashboard__sidebar">
        <div className="patient-dashboard__brand">
          <Logo size={40} />

          <div>
            <strong>MediMitra</strong>
            <span>Healthcare Companion</span>
          </div>
        </div>

        <nav
          className="patient-dashboard__nav"
          aria-label="Patient navigation"
        >
          <button
            className="patient-dashboard__nav-item is-active"
            type="button"
          >
            <Icon name="home" />
            <span>Overview</span>
          </button>

          <button
            className="patient-dashboard__nav-item"
            type="button"
            onClick={showComingSoon}
          >
            <Icon name="case" />
            <span>New Health Case</span>
          </button>

          <button
            className="patient-dashboard__nav-item"
            type="button"
            onClick={showComingSoon}
          >
            <Icon name="history" />
            <span>Previous History</span>
          </button>

          <button
            className="patient-dashboard__nav-item"
            type="button"
            onClick={showComingSoon}
          >
            <Icon name="document" />
            <span>Documents</span>
          </button>

          <button
            className="patient-dashboard__nav-item"
            type="button"
            onClick={showComingSoon}
          >
            <Icon name="ai" />
            <span>AI Assistant</span>
            <small>Coming Soon</small>
          </button>

          <button
            className="patient-dashboard__nav-item"
            type="button"
            onClick={showComingSoon}
          >
            <Icon name="calendar" />
            <span>Doctor Appointment</span>
            <small>Coming Soon</small>
          </button>

          <button
            className="patient-dashboard__nav-item"
            type="button"
            onClick={showComingSoon}
          >
            <Icon name="profile" />
            <span>My Profile</span>
          </button>

          <button
            className="patient-dashboard__nav-item"
            type="button"
            onClick={showComingSoon}
          >
            <Icon name="settings" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="patient-dashboard__sidebar-bottom">
          <div className="patient-dashboard__utility">
            <span>Language</span>
            <LanguageSelector />
          </div>

          <div className="patient-dashboard__utility">
            <span>Theme</span>
            <ThemeToggle />
          </div>

          <button
            className="patient-dashboard__logout"
            type="button"
            onClick={handleLogout}
          >
            <Icon name="logout" size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="patient-dashboard__main">
        <header className="patient-dashboard__header">
          <button
            className="patient-dashboard__mobile-menu"
            type="button"
            aria-label="Open patient navigation"
          >
            <Icon name="menu" size={20} />
          </button>

          <div className="patient-dashboard__welcome">
            <span>Patient Dashboard</span>

            <h1>
              Welcome back, {firstName}
            </h1>

            <p>
              Manage your healthcare information from one place.
            </p>
          </div>

          <div className="patient-dashboard__header-actions">
            <div className="patient-dashboard__search">
              <Icon name="search" size={17} />

              <input
                type="search"
                placeholder="Search your health information..."
                aria-label="Search health information"
              />
            </div>

            <button
              className="patient-dashboard__notification"
              type="button"
              aria-label="Notifications"
            >
              <Icon name="bell" size={18} />
              <span>0</span>
            </button>

            <div className="patient-dashboard__mini-profile">
              <div className="patient-dashboard__avatar">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={`${patientName} profile`}
                  />
                ) : (
                  getInitials(patientName)
                )}
              </div>

              <div>
                <strong>{firstName}</strong>
                <span>Patient</span>
              </div>
            </div>
          </div>
        </header>

        <section className="patient-dashboard__content">
          {/* LOADING STATE */}
          {isLoading && (
            <div
              className="dashboard-status dashboard-status--loading"
              role="status"
              aria-live="polite"
            >
              <div
                className="dashboard-status__spinner"
                aria-hidden="true"
              />
              <span>Loading your dashboard...</span>
            </div>
          )}

          {/* ERROR STATE */}
          {error && !isLoading && (
            <div
              className="dashboard-status dashboard-status--error"
              role="alert"
            >
              <Icon name="shield" size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* PATIENT ID BANNER */}
          <section className="patient-id-banner">
            <div className="patient-id-banner__icon">
              <Icon name="shield" size={23} />
            </div>

            <div className="patient-id-banner__content">
              <span>Your MediMitra Patient ID</span>
              <strong>{patientId}</strong>
            </div>

            <div className="patient-id-banner__verified">
              <span />
              Secure Patient Account
            </div>
          </section>

          {/* STATISTICS */}
          <section className="patient-dashboard__stats">
            <article className="dashboard-stat dashboard-stat--teal">
              <div className="dashboard-stat__icon">
                <Icon name="shield" size={20} />
              </div>

              <div>
                <strong>Health Insights</strong>
                <span>Not available yet</span>
              </div>

              <small>
                Available after health data analysis
              </small>
            </article>

            <article className="dashboard-stat dashboard-stat--blue">
              <div className="dashboard-stat__icon">
                <Icon name="report" size={20} />
              </div>

              <div>
                <strong>Medical Reports</strong>
                <span>0</span>
              </div>

              <small>No reports uploaded yet</small>
            </article>

            <article className="dashboard-stat dashboard-stat--purple">
              <div className="dashboard-stat__icon">
                <Icon name="case" size={20} />
              </div>

              <div>
                <strong>Health Cases</strong>
                <span>0</span>
              </div>

              <small>No AI health cases yet</small>
            </article>

            <article className="dashboard-stat dashboard-stat--orange">
              <div className="dashboard-stat__icon">
                <Icon name="document" size={20} />
              </div>

              <div>
                <strong>Documents</strong>
                <span>0</span>
              </div>

              <small>No documents added yet</small>
            </article>
          </section>

          {/* MAIN GRID */}
          <section className="patient-dashboard__grid">
            {/* PROFILE */}
            <article className="dashboard-card">
              <div className="dashboard-card__header">
                <div>
                  <span className="dashboard-card__eyebrow">
                    Account
                  </span>

                  <h2>Patient Information</h2>
                </div>

                <button
                  type="button"
                  onClick={showComingSoon}
                  className="dashboard-card__link"
                >
                  View Profile
                  <Icon name="arrow" size={14} />
                </button>
              </div>

              <div className="patient-summary">
                <div className="patient-summary__avatar">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={`${patientName} profile`}
                    />
                  ) : (
                    getInitials(patientName)
                  )}
                </div>

                <div className="patient-summary__main">
                  <h3>{patientName}</h3>

                  <span>
                    Patient ID: {patientId}
                  </span>

                  <span>
                    {dashboardData?.email ||
                      "Email not available"}
                  </span>
                </div>
              </div>

              <div className="patient-summary__verification">
                <Icon name="shield" size={16} />

                <div>
                  <strong>
                    Email verification
                  </strong>

                  <span>
                    {dashboardData?.email_verified
                      ? "Verified"
                      : "Verification pending"}
                  </span>
                </div>
              </div>
            </article>

            {/* AI CARD */}
            <article className="dashboard-card dashboard-card--ai">
              <div className="dashboard-card__header">
                <div className="dashboard-ai-title">
                  <div className="dashboard-ai-icon">
                    <Icon name="ai" size={21} />
                  </div>

                  <div>
                    <span className="dashboard-card__eyebrow">
                      AI Healthcare
                    </span>

                    <h2>AI Assistant</h2>
                  </div>
                </div>

                <span className="coming-soon-pill">
                  Coming Soon
                </span>
              </div>

              <div className="dashboard-ai-body">
                <p>
                  Your MediMitra AI Assistant will help you
                  understand health information, reports and
                  prepare questions for your doctor.
                </p>

                <div className="dashboard-ai-features">
                  <span>
                    <Icon name="chat" size={14} />
                    AI Chat
                  </span>

                  <span>
                    <Icon name="report" size={14} />
                    Report Analysis
                  </span>

                  <span>
                    <Icon name="shield" size={14} />
                    Health Insights
                  </span>
                </div>

                <button
                  type="button"
                  onClick={showComingSoon}
                  className="dashboard-primary-button"
                >
                  Explore AI Assistant
                  <Icon name="arrow" size={15} />
                </button>
              </div>
            </article>
          </section>

          {/* QUICK ACTIONS */}
          <section className="dashboard-section">
            <div className="dashboard-section__header">
              <div>
                <span className="dashboard-card__eyebrow">
                  Healthcare
                </span>

                <h2>Quick Actions</h2>
              </div>
            </div>

            <div className="quick-actions">
              <button
                type="button"
                className="quick-action quick-action--teal"
                onClick={showComingSoon}
              >
                <span>
                  <Icon name="case" size={21} />
                </span>

                <div>
                  <strong>New Health Case</strong>
                  <small>
                    Start an AI health interview
                  </small>
                </div>

                <Icon name="arrow" size={16} />
              </button>

              <button
                type="button"
                className="quick-action quick-action--blue"
                onClick={showComingSoon}
              >
                <span>
                  <Icon name="upload" size={21} />
                </span>

                <div>
                  <strong>Upload Report</strong>
                  <small>
                    Add a medical report
                  </small>
                </div>

                <Icon name="arrow" size={16} />
              </button>

              <button
                type="button"
                className="quick-action quick-action--purple"
                onClick={showComingSoon}
              >
                <span>
                  <Icon name="history" size={21} />
                </span>

                <div>
                  <strong>Previous History</strong>
                  <small>
                    View your health history
                  </small>
                </div>

                <Icon name="arrow" size={16} />
              </button>

              <button
                type="button"
                className="quick-action quick-action--orange"
                onClick={showComingSoon}
              >
                <span>
                  <Icon name="chat" size={21} />
                </span>

                <div>
                  <strong>AI Assistant</strong>
                  <small>
                    Ask a healthcare question
                  </small>
                </div>

                <Icon name="arrow" size={16} />
              </button>
            </div>
          </section>

          {/* ACTIVITY */}
          <section className="patient-dashboard__grid">
            <article className="dashboard-card">
              <div className="dashboard-card__header">
                <div>
                  <span className="dashboard-card__eyebrow">
                    Activity
                  </span>

                  <h2>Recent Activity</h2>
                </div>

                <Icon
                  name="clock"
                  size={18}
                />
              </div>

              <div className="dashboard-empty">
                <div className="dashboard-empty__icon">
                  <Icon name="history" size={24} />
                </div>

                <h3>No activity yet</h3>

                <p>
                  Your health cases, reports and AI summaries
                  will appear here.
                </p>
              </div>
            </article>

            <article className="dashboard-card">
              <div className="dashboard-card__header">
                <div>
                  <span className="dashboard-card__eyebrow">
                    Coming Next
                  </span>

                  <h2>Doctor Appointment</h2>
                </div>

                <Icon
                  name="calendar"
                  size={18}
                />
              </div>

              <div className="appointment-placeholder">
                <div className="appointment-placeholder__icon">
                  <Icon name="calendar" size={25} />
                </div>

                <h3>Appointment Booking</h3>

                <p>
                  Doctor appointment booking will be available
                  in a future MediMitra release.
                </p>

                <span className="coming-soon-pill">
                  Coming Soon
                </span>
              </div>
            </article>
          </section>

          {/* PRIVACY */}
          <div className="patient-dashboard__privacy">
            <Icon name="shield" size={17} />

            <span>
              Your MediMitra account is protected by authenticated
              patient access. Medical features will be enabled in
              the upcoming development phases.
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}