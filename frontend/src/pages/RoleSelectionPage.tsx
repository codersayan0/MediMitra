import type { CSSProperties, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { ROLE_OPTIONS } from "@/constants";
import type { UserRole } from "@/types";

type RoleIconProps = {
  role: UserRole;
};

function RoleIcon({ role }: RoleIconProps) {
  if (role === "patient") {
    return (
      <svg
        viewBox="0 0 64 64"
        width="34"
        height="34"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="22"
          r="9"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M15 48c1.8-9 8.2-14 17-14s15.2 5 17 14"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M46 43.5c0-4.1 3.3-7.5 7.5-7.5S61 39.4 61 43.5c0 5.2-7.5 9.5-7.5 9.5S46 48.7 46 43.5Z"
          fill="currentColor"
          opacity=".92"
        />
        <path
          d="M53.5 40.8v5.4M50.8 43.5h5.4"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (role === "doctor") {
    return (
      <svg
        viewBox="0 0 64 64"
        width="36"
        height="36"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M22 9v14a10 10 0 0 0 20 0V9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M17 9h10M37 9h10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M42 35h7a7 7 0 0 1 7 7v5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="56"
          cy="52"
          r="4"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M31 33v13M25 39h12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      width="35"
      height="35"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 7 52 15v15c0 13.5-8.2 23.4-20 27C20.2 53.4 12 43.5 12 30V15L32 7Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M25 31h14M32 24v14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="48"
        cy="46"
        r="8"
        fill="currentColor"
      />
      <path
        d="M48 42.5v7M44.5 46h7"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"
        fill="currentColor"
      />
      <path
        d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"
        fill="currentColor"
        opacity=".75"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3 20 6v5.5c0 5.2-3.2 8.7-8 10.5-4.8-1.8-8-5.3-8-10.5V6l8-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m8.5 12 2.2 2.2 4.8-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9.5 4.5a3.5 3.5 0 0 0-6 2.5 3.4 3.4 0 0 0 .7 2.1A4 4 0 0 0 5 16.8a3.5 3.5 0 0 0 5.7 2.1M14.5 4.5a3.5 3.5 0 0 1 6 2.5 3.4 3.4 0 0 1-.7 2.1A4 4 0 0 1 19 16.8a3.5 3.5 0 0 1-5.7 2.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M9 8.5c1.8.3 2.8 1.5 3 3.5M15 8.5c-1.8.3-2.8 1.5-3 3.5M12 12v7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3 12h18M12 3c2.2 2.5 3.3 5.5 3.3 9S14.2 18.5 12 21c-2.2-2.5-3.3-5.5-3.3-9S9.8 5.5 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.8 8.8c0 5.2-8.8 10.3-8.8 10.3S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

const ROLE_ICONS: Record<UserRole, ReactNode> = {
  patient: <RoleIcon role="patient" />,
  doctor: <RoleIcon role="doctor" />,
  admin: <RoleIcon role="admin" />,
};

const ROLE_TAGS: Record<UserRole, string> = {
  patient: "CARE • CONNECT • MANAGE",
  doctor: "CLINICAL • SMART • SECURE",
  admin: "CONTROL • SECURE • MANAGE",
};

const ROLE_NUMBERS: Record<UserRole, string> = {
  patient: "01",
  doctor: "02",
  admin: "03",
};

export function RoleSelectionPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const cardsRef = useReveal<HTMLDivElement>();
  const trustRef = useReveal<HTMLDivElement>();

  const roleCopy: Record<
    UserRole,
    {
      title: string;
      desc: string;
      features: string[];
      cta: string;
    }
  > = {
    patient: t.roleSelection.patient,
    doctor: t.roleSelection.doctor,
    admin: t.roleSelection.admin,
  };

  const trustItems = [
    {
      icon: <ShieldIcon />,
      title: t.roleSelection.trust.secureTitle,
      desc: t.roleSelection.trust.secureDesc,
      className: "is-secure",
    },
    {
      icon: <BrainIcon />,
      title: t.roleSelection.trust.aiTitle,
      desc: t.roleSelection.trust.aiDesc,
      className: "is-ai",
    },
    {
      icon: <GlobeIcon />,
      title: t.roleSelection.trust.languageTitle,
      desc: t.roleSelection.trust.languageDesc,
      className: "is-language",
    },
    {
      icon: <HeartIcon />,
      title: t.roleSelection.trust.trustedTitle,
      desc: t.roleSelection.trust.trustedDesc,
      className: "is-care",
    },
  ];

  return (
    <main className="role-select">
      {/* =====================================================
          Decorative background
      ====================================================== */}
      <div
        className="role-select__ambient role-select__ambient--a"
        aria-hidden="true"
      />
      <div
        className="role-select__ambient role-select__ambient--b"
        aria-hidden="true"
      />
      <div
        className="role-select__ambient role-select__ambient--c"
        aria-hidden="true"
      />

      <div
        className="role-select__grid-pattern"
        aria-hidden="true"
      />

      {/* =====================================================
          Hero
      ====================================================== */}
      <section className="role-select__hero">
        <div className="container">
          <div className="role-select__hero-content">
            <div className="role-select__badge">
              <span className="role-select__badge-icon">
                <SparkleIcon />
              </span>

              <span>{t.roleSelection.badge}</span>

              <span className="role-select__badge-dot" />
            </div>

            <h1 className="role-select__title">
              {t.roleSelection.titleLine1}{" "}
              <span className="role-select__title-gradient">
                {t.roleSelection.titleBrand}
              </span>
              {t.roleSelection.titleSuffix}
            </h1>

            <p className="role-select__desc">
              {t.roleSelection.desc}
            </p>

            <div className="role-select__hero-line">
              <span />
              <span />
              <span />
            </div>
          </div>

          {/* =================================================
              Abstract healthcare visual
              No external image used.
          ================================================== */}
          <div
            className="role-select__visual"
            aria-hidden="true"
          >
            <div className="role-select__visual-orbit role-select__visual-orbit--one" />
            <div className="role-select__visual-orbit role-select__visual-orbit--two" />

            <div className="role-select__visual-core">
              <div className="role-select__visual-core-inner">
                <span className="role-select__pulse-line">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </span>

                <span className="role-select__visual-cross">
                  +
                </span>
              </div>
            </div>

            <span className="role-select__node role-select__node--one" />
            <span className="role-select__node role-select__node--two" />
            <span className="role-select__node role-select__node--three" />
            <span className="role-select__node role-select__node--four" />

            <div className="role-select__mini-card role-select__mini-card--one">
              <ShieldIcon />
              <span>Secure</span>
            </div>

            <div className="role-select__mini-card role-select__mini-card--two">
              <BrainIcon />
              <span>AI Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Role Selection
      ====================================================== */}
      <section
        className="role-select__roles"
        aria-labelledby="role-selection-title"
      >
        <div className="container">
          <div
            id="role-selection-title"
            className="role-select__section-heading"
          >
            <span>CONTINUE WITH MEDIMITRA</span>
          </div>

          <div
            className="role-select__grid"
            ref={cardsRef}
          >
            {ROLE_OPTIONS.map((option) => {
              const copy = roleCopy[option.role];

              const cardStyle = {
                "--role-color": option.colorVar,
              } as CSSProperties;

              return (
                <article
                  className={`role-select-card role-select-card--${option.role}`}
                  key={option.role}
                  style={cardStyle}
                >
                  <div
                    className="role-select-card__glow"
                    aria-hidden="true"
                  />

                  <div className="role-select-card__top">
                    <span className="role-select-card__number">
                      {ROLE_NUMBERS[option.role]}
                    </span>

                    <span className="role-select-card__tag">
                      {ROLE_TAGS[option.role]}
                    </span>
                  </div>

                  <div className="role-select-card__icon-wrap">
                    <div className="role-select-card__icon">
                      {ROLE_ICONS[option.role]}
                    </div>

                    <span className="role-select-card__icon-ring" />
                  </div>

                  <div className="role-select-card__content">
                    <h2 className="role-select-card__title">
                      {copy.title}
                    </h2>

                    <p className="role-select-card__desc">
                      {copy.desc}
                    </p>
                  </div>

                  <ul className="role-select-card__features">
                    {copy.features.map((feature) => (
                      <li key={feature}>
                        <span
                          className="role-select-card__check"
                          aria-hidden="true"
                        >
                          ✓
                        </span>

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    block
                    onClick={() =>
                      navigate(option.loginPath)
                    }
                  >
                    <span>{copy.cta}</span>

                    <span
                      className="role-select-card__arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          Trust / Value Strip
      ====================================================== */}
      <section className="role-select__trust">
        <div className="container">
          <div
            className="role-select__trust-panel reveal"
            ref={trustRef}
          >
            {trustItems.map((item, index) => (
              <div
                className={`role-select__trust-item ${item.className}`}
                key={item.title}
              >
                <span className="role-select__trust-icon">
                  {item.icon}
                </span>

                <div className="role-select__trust-copy">
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>

                {index < trustItems.length - 1 && (
                  <span
                    className="role-select__trust-divider"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          <p className="role-select__footer-note">
            MediMitra • Your Healthcare Companion
          </p>
        </div>
      </section>
    </main>
  );
}