import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useReveal } from "@/hooks/useReveal";
import { ROLE_OPTIONS } from "@/constants";
import { Button } from "@/components/ui/Button";

export function RoleSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const ref = useReveal<HTMLDivElement>();

  const copy = {
    patient: { title: t.roles.patientTitle, desc: t.roles.patientDesc, cta: t.roles.patientCta },
    doctor: { title: t.roles.doctorTitle, desc: t.roles.doctorDesc, cta: t.roles.doctorCta },
    admin: { title: t.roles.adminTitle, desc: t.roles.adminDesc, cta: t.roles.adminCta },
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.roles.eyebrow}</span>
          <h2 className="section-title">{t.roles.title}</h2>
          <p className="section-subtitle">{t.roles.subtitle}</p>
        </div>

        <div className="roles__grid reveal" ref={ref}>
          {ROLE_OPTIONS.map((option) => {
            const info = copy[option.role];
            return (
              <article className="role-card" key={option.role}>
                <div className="role-card__top">
                  <span
                    className="role-card__avatar"
                    style={{ background: option.colorVar }}
                    aria-hidden="true"
                  >
                    {option.icon}
                  </span>
                  <h3 className="role-card__title">{info.title}</h3>
                </div>
                <p className="role-card__desc">{info.desc}</p>
                <Button block onClick={() => navigate(option.loginPath)}>
                  {info.cta} →
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}