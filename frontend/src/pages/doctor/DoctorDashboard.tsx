import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "@/hooks/useLanguage";
import { useDoctorAuth } from "@/hooks/useDoctorAuth";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Logo } from "@/components/ui/Logo";

import { doctorProfileImageService } from "@/services/doctorProfileImage.service";
import { ROUTES } from "@/constants";

import type { DoctorProfile } from "@/types";

import "@/styles/doctor-dashboard.css";

/* ------------------------------------------------------------------ */
/* Data shapes the dashboard is ready to consume.                      */
/*                                                                     */
/* The backend does not expose a doctor dashboard / statistics /       */
/* activity / appointments endpoint yet, so `dashboardData` below      */
/* stays `null` and every section renders a clean empty state.         */
/* Nothing here is mocked. When the endpoints exist, add a method to   */
/* a doctor service, fetch it in an effect, and call setDashboardData. */
/* ------------------------------------------------------------------ */

interface DoctorActivityItem {
  id: string;
  title: string;
  subtitle: string;
  timeLabel: string;
}

interface DoctorUpcomingAppointment {
  id: string;
  time: string;
  patientName: string;
  reason: string;
  status: "confirmed" | "pending";
}

interface DoctorDashboardData {
  totalPatients: number;
  todayAppointments: number;
  pendingRequests: number;
  completedConsultations: number;
  recentActivity: DoctorActivityItem[];
  upcomingAppointments: DoctorUpcomingAppointment[];
}

/**
 * /auth/doctor/me does not return the degree or registration number yet
 * (DoctorPublic omits them). These optional fields let the card light up
 * automatically if the backend starts returning them; until then the UI
 * shows a clean "Not available" fallback.
 */
type DoctorWithCredentials = DoctorProfile & {
  medical_degree?: { degree_name?: string; institution?: string; passing_year?: number };
  medical_registration_number?: string;
};

type IconName =
  | "home"
  | "calendar"
  | "users"
  | "records"
  | "profile"
  | "settings"
  | "logout"
  | "bell"
  | "search"
  | "arrow"
  | "shield"
  | "check"
  | "clock"
  | "menu"
  | "close"
  | "bot"
  | "activity";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
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
    focusable: false,
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
    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4M16 3v4M4 9h16" />
          <path d="M8 13h.01M12 13h.01M16 13h.01" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c.6-3 2.8-4.5 6-4.5s5.4 1.5 6 4.5" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M16.5 14.6c2.4.2 4 1.5 4.5 4.4" />
        </svg>
      );
    case "records":
      return (
        <svg {...common}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6M9 17h6" />
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
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12.3 2.7 2.7L16 9.5" />
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
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "bot":
      return (
        <svg {...common}>
          <rect x="4.5" y="7" width="15" height="11" rx="4" />
          <path d="M12 4v3" />
          <circle cx="12" cy="3.6" r="0.9" />
          <path d="M9 12v1.4M15 12v1.4" />
          <path d="M2.5 12v2M21.5 12v2" />
        </svg>
      );
    case "activity":
      return (
        <svg {...common}>
          <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />
        </svg>
      );
    default:
      return null;
  }
}

function getInitials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function DoctorDashboard() {
  const { t } = useLanguage();
  const { doctor, logout } = useDoctorAuth();
  const navigate = useNavigate();
  const d = t.doctorAuth.dashboard;

  // No real endpoint yet -> stays null -> every section shows an empty state.
  const [dashboardData] = useState<DoctorDashboardData | null>(null);

  const [navOpen, setNavOpen] = useState(false);
  const [aiNoticeVisible, setAiNoticeVisible] = useState(false);
  const aiTimer = useRef<number | undefined>(undefined);

  const avatar = doctorProfileImageService.get();
  const profile = doctor as DoctorWithCredentials | null;

  const fullName = profile
    ? `${profile.title} ${profile.first_name} ${profile.last_name}`.trim()
    : d.doctorFallback;
  const lastNameLabel = profile ? `${profile.title} ${profile.last_name}`.trim() : d.doctorFallback;
  const doctorId = profile?.doctor_id || "—";
  const isVerified = Boolean(profile?.email_verified);
  const specialization = profile?.specialization || d.notAvailable;
  const degree = profile?.medical_degree?.degree_name || d.notAvailable;
  const registration = profile?.medical_registration_number || d.notAvailable;
  const email = profile?.email || d.notAvailable;

  /* Close the mobile navigation with Escape. */
  useEffect(() => {
    if (!navOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  /* Clear the placeholder timer on unmount. */
  useEffect(() => () => window.clearTimeout(aiTimer.current), []);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.doctor.login, { replace: true });
  };

  /* Other doctor pages are built later, one at a time. */
  const comingSoon = () => undefined;

  const handleAiClick = () => {
    // The chatbot is not built yet and no AI route exists: show a small placeholder.
    setAiNoticeVisible(true);
    window.clearTimeout(aiTimer.current);
    aiTimer.current = window.setTimeout(() => setAiNoticeVisible(false), 3500);
  };

  const navItems: { key: string; icon: IconName; label: string; active?: boolean }[] = [
    { key: "overview", icon: "home", label: d.overview, active: true },
    { key: "appointments", icon: "calendar", label: d.appointments },
    { key: "patients", icon: "users", label: d.patients },
    { key: "records", icon: "records", label: d.healthRecords },
    { key: "profile", icon: "profile", label: d.profile },
    { key: "settings", icon: "settings", label: d.settings },
  ];

  const stats: {
    key: string;
    tone: "blue" | "teal" | "orange" | "purple";
    icon: IconName;
    label: string;
    value: number | undefined;
    empty: string;
  }[] = [
    {
      key: "patients",
      tone: "blue",
      icon: "users",
      label: d.totalPatients,
      value: dashboardData?.totalPatients,
      empty: d.noPatientsYet,
    },
    {
      key: "today",
      tone: "teal",
      icon: "calendar",
      label: d.todayAppointments,
      value: dashboardData?.todayAppointments,
      empty: d.noAppointmentsYet,
    },
    {
      key: "pending",
      tone: "orange",
      icon: "clock",
      label: d.pendingRequests,
      value: dashboardData?.pendingRequests,
      empty: d.noPendingRequests,
    },
    {
      key: "completed",
      tone: "purple",
      icon: "check",
      label: d.completedConsultations,
      value: dashboardData?.completedConsultations,
      empty: d.noConsultationsYet,
    },
  ];

  const quickActions: {
    key: string;
    tone: "blue" | "teal" | "orange" | "purple";
    icon: IconName;
    title: string;
    description: string;
  }[] = [
    {
      key: "patients",
      tone: "blue",
      icon: "users",
      title: d.patientManagement,
      description: d.patientManagementDescription,
    },
    {
      key: "appointments",
      tone: "teal",
      icon: "calendar",
      title: d.appointments,
      description: d.appointmentsDescription,
    },
    {
      key: "records",
      tone: "orange",
      icon: "records",
      title: d.healthRecords,
      description: d.healthRecordsDescription,
    },
    {
      key: "profile",
      tone: "purple",
      icon: "profile",
      title: d.doctorProfile,
      description: d.doctorProfileDescription,
    },
  ];

  const recentActivity = dashboardData?.recentActivity ?? [];
  const upcomingAppointments = dashboardData?.upcomingAppointments ?? [];

  return (
    <div className="doctor-dashboard">
      {/* ---------------- SIDEBAR ---------------- */}
      <aside
        id="doctor-dashboard-sidebar"
        className={`doctor-dashboard__sidebar${navOpen ? " is-open" : ""}`}
      >
        <div className="dd-brand">
          <Logo size={40} />
          <div className="dd-brand__text">
            <strong>MediMitra</strong>
            <span>{d.healthcareCompanion}</span>
          </div>

          <button
            type="button"
            className="dd-icon-btn dd-brand__close"
            onClick={() => setNavOpen(false)}
            aria-label={d.closeNavigation}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <nav className="dd-nav" aria-label={d.mainNavigation}>
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`dd-nav__item${item.active ? " is-active" : ""}`}
              aria-current={item.active ? "page" : undefined}
              aria-disabled={item.active ? undefined : true}
              title={item.active ? item.label : `${item.label} — ${d.comingSoon}`}
              onClick={() => {
                if (!item.active) comingSoon();
                setNavOpen(false);
              }}
            >
              <Icon name={item.icon} />
              <span className="dd-nav__label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="dd-sidebar-bottom">
          <button type="button" className="dd-logout" onClick={handleLogout} title={d.logout}>
            <Icon name="logout" size={18} />
            <span className="dd-nav__label">{d.logout}</span>
          </button>
        </div>
      </aside>

      {navOpen && (
        <button
          type="button"
          className="doctor-dashboard__backdrop"
          aria-label={d.closeNavigation}
          onClick={() => setNavOpen(false)}
        />
      )}

      {/* ---------------- MAIN ---------------- */}
      <div className="doctor-dashboard__main">
        <header className="dd-header">
          <button
            type="button"
            className="dd-icon-btn dd-header__menu"
            onClick={() => setNavOpen(true)}
            aria-label={d.openNavigation}
            aria-expanded={navOpen}
            aria-controls="doctor-dashboard-sidebar"
          >
            <Icon name="menu" size={20} />
          </button>

          <div className="dd-welcome">
            <span className="dd-welcome__eyebrow">{d.title}</span>
            <h1>
              {d.welcomeBack}, {fullName}
            </h1>
            <p>{d.managePractice}</p>
          </div>

          <div className="dd-header__actions">
            <label className="dd-search">
              <span className="sr-only">{d.searchLabel}</span>
              <Icon name="search" size={17} />
              <input type="search" placeholder={d.searchPlaceholder} aria-label={d.searchLabel} />
            </label>

            <button type="button" className="dd-icon-btn dd-bell" aria-label={d.notifications}>
              <Icon name="bell" size={18} />
            </button>

            <LanguageSelector />
            <ThemeToggle />

            <div className="dd-mini-profile">
              <div className="dd-avatar dd-avatar--sm">
                {avatar ? (
                  <img src={avatar} alt={`${d.profilePhoto}: ${fullName}`} />
                ) : (
                  <span aria-hidden="true">{getInitials(fullName) || "Dr"}</span>
                )}
              </div>
              <div className="dd-mini-profile__text">
                <strong>{lastNameLabel}</strong>
                <span>{profile?.specialization || d.medicalProfessional}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="dd-content" aria-label={d.doctorPortal}>
          {/* DOCTOR ID */}
          <section className="dd-id-card" aria-label={d.doctorIdLabel}>
            <div className="dd-id-card__icon">
              <Icon name="shield" size={24} />
            </div>

            <div className="dd-id-card__body">
              <span className="dd-id-card__label">{d.doctorIdLabel}</span>
              <div className="dd-id-card__row">
                <strong>{doctorId}</strong>
                <span className={`dd-chip ${isVerified ? "dd-chip--success" : "dd-chip--warning"}`}>
                  {isVerified ? d.active : d.pending}
                </span>
              </div>
            </div>

            <div
              className={`dd-id-card__status ${isVerified ? "is-verified" : "is-pending"}`}
              role="status"
            >
              <Icon name={isVerified ? "check" : "clock"} size={17} />
              <div>
                <strong>{isVerified ? d.accountVerified : d.verificationPending}</strong>
                <span>
                  {isVerified ? d.accountVerifiedDescription : d.verificationPendingDescription}
                </span>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className="dd-stats" aria-label={d.statsLabel}>
            {stats.map((stat) => (
              <article key={stat.key} className={`dd-stat dd-tone--${stat.tone}`}>
                <div className="dd-stat__icon">
                  <Icon name={stat.icon} size={20} />
                </div>
                <h2 className="dd-stat__label">{stat.label}</h2>
                <p className="dd-stat__value">
                  {stat.value === undefined ? (
                    <>
                      <span aria-hidden="true">—</span>
                      <span className="sr-only">{d.dataNotAvailable}</span>
                    </>
                  ) : (
                    stat.value
                  )}
                </p>
                {(stat.value === undefined || stat.value === 0) && (
                  <small className="dd-stat__hint">{stat.empty}</small>
                )}
              </article>
            ))}
          </section>

          {/* DOCTOR INFO + QUICK ACTIONS */}
          <div className="dd-grid dd-grid--info">
            <article className="dd-card">
              <div className="dd-card__header">
                <h2>{d.doctorInformation}</h2>
                <button type="button" className="dd-link" onClick={comingSoon} title={d.comingSoon}>
                  {d.viewProfile}
                  <Icon name="arrow" size={14} />
                </button>
              </div>

              <div className="dd-doctor">
                <div className="dd-avatar dd-avatar--lg">
                  {avatar ? (
                    <img src={avatar} alt={`${d.profilePhoto}: ${fullName}`} />
                  ) : (
                    <span aria-hidden="true">{getInitials(fullName) || "Dr"}</span>
                  )}
                  {isVerified && (
                    <span className="dd-avatar__badge" title={d.verified}>
                      <Icon name="check" size={14} />
                      <span className="sr-only">{d.verified}</span>
                    </span>
                  )}
                </div>

                <div className="dd-doctor__main">
                  <h3>{fullName}</h3>
                  <dl className="dd-doctor__list">
                    <div>
                      <dt>{d.medicalDegree}</dt>
                      <dd>{degree}</dd>
                    </div>
                    <div>
                      <dt>{d.registrationNumber}</dt>
                      <dd>{registration}</dd>
                    </div>
                    <div>
                      <dt>{d.specialization}</dt>
                      <dd>{specialization}</dd>
                    </div>
                    <div>
                      <dt>{d.email}</dt>
                      <dd className="dd-doctor__email">{email}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className={`dd-verify ${isVerified ? "is-verified" : "is-pending"}`}>
                <Icon name={isVerified ? "check" : "clock"} size={20} />
                <div>
                  <strong>{d.emailVerification}</strong>
                  <span>{isVerified ? d.verified : d.notVerified}</span>
                </div>
              </div>
            </article>

            <article className="dd-card">
              <div className="dd-card__header dd-card__header--stack">
                <h2>{d.quickActions}</h2>
                <p>{d.quickActionsDescription}</p>
              </div>

              <div className="dd-actions">
                {quickActions.map((action) => (
                  <button
                    key={action.key}
                    type="button"
                    className={`dd-action dd-tone--${action.tone}`}
                    aria-disabled="true"
                    title={`${action.title} — ${d.comingSoon}`}
                    onClick={comingSoon}
                  >
                    <span className="dd-action__icon">
                      <Icon name={action.icon} size={20} />
                    </span>
                    <span className="dd-action__text">
                      <strong>{action.title}</strong>
                      <small>{action.description}</small>
                    </span>
                    <Icon name="arrow" size={16} />
                  </button>
                ))}
              </div>
            </article>
          </div>

          {/* ACTIVITY + APPOINTMENTS */}
          <div className="dd-grid">
            <article className="dd-card">
              <div className="dd-card__header">
                <h2>{d.recentActivity}</h2>
              </div>

              {recentActivity.length === 0 ? (
                <div className="dd-empty">
                  <div className="dd-empty__icon">
                    <Icon name="activity" size={24} />
                  </div>
                  <h3>{d.noRecentActivity}</h3>
                  <p>{d.noRecentActivityDescription}</p>
                </div>
              ) : (
                <ul className="dd-list">
                  {recentActivity.map((item) => (
                    <li key={item.id} className="dd-list__item">
                      <span className="dd-list__icon">
                        <Icon name="activity" size={18} />
                      </span>
                      <div>
                        <strong>{item.title}</strong>
                        <span>
                          {item.subtitle} · {item.timeLabel}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </article>

            <article className="dd-card">
              <div className="dd-card__header">
                <h2>{d.upcomingAppointments}</h2>
              </div>

              {upcomingAppointments.length === 0 ? (
                <div className="dd-empty">
                  <div className="dd-empty__icon dd-empty__icon--purple">
                    <Icon name="calendar" size={24} />
                  </div>
                  <h3>{d.noUpcomingAppointments}</h3>
                  <p>{d.noUpcomingAppointmentsDescription}</p>
                </div>
              ) : (
                <ul className="dd-list">
                  {upcomingAppointments.map((appointment) => (
                    <li key={appointment.id} className="dd-list__item dd-list__item--appointment">
                      <time>{appointment.time}</time>
                      <div>
                        <strong>{appointment.patientName}</strong>
                        <span>{appointment.reason}</span>
                      </div>
                      <span
                        className={`dd-chip ${
                          appointment.status === "confirmed" ? "dd-chip--success" : "dd-chip--warning"
                        }`}
                      >
                        {appointment.status === "confirmed" ? d.confirmed : d.pending}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </div>
        </main>
      </div>

      {/* ---------------- FLOATING AI CHATBOT BUTTON ---------------- */}
      <div className="dd-ai">
        {aiNoticeVisible && (
          <div className="dd-ai__notice" role="status">
            {d.aiComingSoon}
          </div>
        )}
        <button
          type="button"
          className="dd-ai__button"
          aria-label={d.askMediMitraAI}
          onClick={handleAiClick}
        >
          <span className="dd-ai__label" aria-hidden="true">
            {d.askMediMitraAI}
          </span>
          <span className="dd-ai__icon">
            <Icon name="bot" size={26} />
            <span className="dd-ai__dot" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  );
}