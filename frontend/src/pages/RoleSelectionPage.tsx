import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { IMAGES, ROLE_OPTIONS } from "@/constants";
import type { UserRole } from "@/types";

const ROLE_ICONS: Record<UserRole, string> = {
  patient: "🧑",
  doctor: "🩺",
  admin: "🛡️",
};

/**
 * Phase 3 — "Choose Your Role" page.
 * Reached from the landing page's Login / Get Started actions. Presents the
 * three entry points (Patient, Doctor, Administrator) as premium cards
 * before handing off to the respective (placeholder) auth pages.
 */
export function RoleSelectionPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const cardsRef = useReveal<HTMLDivElement>();
  const trustRef = useReveal<HTMLDivElement>();

  const heroImage = theme === "dark" ? IMAGES.heroDark : IMAGES.heroLight;

  const roleCopy: Record<UserRole, { title: string; desc: string; features: string[]; cta: string }> = {
    patient: t.roleSelection.patient,
    doctor: t.roleSelection.doctor,
    admin: t.roleSelection.admin,
  };

  const trustItems = [
    { icon: "🛡️", title: t.roleSelection.trust.secureTitle, desc: t.roleSelection.trust.secureDesc },
    { icon: "🤖", title: t.roleSelection.trust.aiTitle, desc: t.roleSelection.trust.aiDesc },
    { icon: "🌐", title: t.roleSelection.trust.languageTitle, desc: t.roleSelection.trust.languageDesc },
    { icon: "⭐", title: t.roleSelection.trust.trustedTitle, desc: t.roleSelection.trust.trustedDesc },
  ];

  return (
    <div className="role-select">
      {/* Hero */}
      <section className="role-select__hero">
        <div className="container role-select__hero-inner">
          <div>
            <span className="eyebrow">{t.roleSelection.badge}</span>
            <h1 className="role-select__title">
              {t.roleSelection.titleLine1}{" "}
              <span className="text-gradient">{t.roleSelection.titleBrand}</span>
              {t.roleSelection.titleSuffix}
            </h1>
            <p className="role-select__desc">{t.roleSelection.desc}</p>
          </div>

          <div className="role-select__hero-visual">
            <img
              src={heroImage}
              alt="MediMitra healthcare professional ready to assist patients, doctors and administrators"
              width={1470}
              height={1070}
            />
            <span className="role-select__float role-select__float--top">
              <span className="role-select__float-icon" aria-hidden="true">
                💙
              </span>
              {t.roleSelection.floatBadge1}
            </span>
            <span className="role-select__float role-select__float--bottom">
              <span className="role-select__float-icon" aria-hidden="true">
                🛡️
              </span>
              {t.roleSelection.floatBadge2}
            </span>
          </div>
        </div>
      </section>

      {/* Role cards */}
      <section className="section role-select__cards-section" aria-label="Choose your role">
        <div className="container">
          <div className="role-select__grid reveal" ref={cardsRef}>
            {ROLE_OPTIONS.map((option) => {
              const copy = roleCopy[option.role];
              const cardStyle = { "--role-color": option.colorVar } as CSSProperties;

              return (
                <article className="role-select-card" key={option.role} style={cardStyle}>
                  <div className="role-select-card__icon" aria-hidden="true">
                    {ROLE_ICONS[option.role]}
                  </div>
                  <h2 className="role-select-card__title">{copy.title}</h2>
                  <p className="role-select-card__desc">{copy.desc}</p>

                  <ul className="role-select-card__features">
                    {copy.features.map((feature) => (
                      <li key={feature}>
                        <span aria-hidden="true">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button block onClick={() => navigate(option.loginPath)}>
                    {copy.cta} →
                  </Button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="role-select__trust">
        <div className="container role-select__trust-grid reveal" ref={trustRef}>
          {trustItems.map((item) => (
            <div className="role-select__trust-item" key={item.title}>
              <span className="role-select__trust-icon" aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}