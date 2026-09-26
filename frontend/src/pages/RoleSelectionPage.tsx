import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { RoleIcon, TrustIcon } from "@/components/ui/RoleIcon";
import { IMAGES, ROLE_OPTIONS } from "@/constants";
import type { UserRole } from "@/types";

/**
 * Phase 3 — "Choose Your Role" page.
 * Reached from the landing page's Login / Get Started actions. Presents the
 * three entry points (Patient, Doctor, Administrator) as premium cards
 * before handing off to the respective (placeholder) auth pages.
 *
 * Role glyphs come from ROLE_OPTIONS (constants/index.ts) — the same source
 * RoleSection.tsx uses on the landing page — rather than a page-local copy,
 * so the two can never silently drift out of sync.
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

  const trustItems: { key: "secure" | "ai" | "language" | "trust"; title: string; desc: string }[] = [
    { key: "secure", title: t.roleSelection.trust.secureTitle, desc: t.roleSelection.trust.secureDesc },
    { key: "ai", title: t.roleSelection.trust.aiTitle, desc: t.roleSelection.trust.aiDesc },
    { key: "language", title: t.roleSelection.trust.languageTitle, desc: t.roleSelection.trust.languageDesc },
    { key: "trust", title: t.roleSelection.trust.trustedTitle, desc: t.roleSelection.trust.trustedDesc },
  ];

  return (
    <div className="role-select">
      <span className="role-select__ambient role-select__ambient--a" aria-hidden="true" />
      <span className="role-select__ambient role-select__ambient--b" aria-hidden="true" />
      <span className="role-select__ambient role-select__ambient--c" aria-hidden="true" />

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
            {ROLE_OPTIONS.map((option, index) => {
              const copy = roleCopy[option.role];
              const cardStyle = {
                "--role-color": option.colorVar,
                "--card-index": index,
              } as CSSProperties;

              return (
                <article className="role-select-card" key={option.role} style={cardStyle}>
                  <span className="role-select-card__glow" aria-hidden="true" />
                  <div className="role-select-card__icon">
                    <RoleIcon role={option.role} size={26} />
                  </div>
                  <h2 className="role-select-card__title">{copy.title}</h2>
                  <p className="role-select-card__desc">{copy.desc}</p>

                  <ul className="role-select-card__features">
                    {copy.features.map((feature) => (
                      <li key={feature}>
                        <span className="role-select-card__check" aria-hidden="true">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M4.5 12.5l5 5 10-11"
                              stroke="#fff"
                              strokeWidth="2.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
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
            <div className="role-select__trust-item" key={item.key}>
              <span className="role-select__trust-icon" aria-hidden="true">
                <TrustIcon trustKey={item.key} size={19} />
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