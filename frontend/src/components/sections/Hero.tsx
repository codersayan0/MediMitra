import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { IMAGES, ROUTES } from "@/constants";

export function Hero() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const statsRef = useReveal<HTMLDivElement>();

  const heroImage = theme === "dark" ? IMAGES.heroDark : IMAGES.heroLight;

  const stats = [
    { icon: "🧑‍🤝‍🧑", value: t.hero.stat1Value, label: t.hero.stat1Label },
    { icon: "🩺", value: t.hero.stat2Value, label: t.hero.stat2Label },
    { icon: "🌐", value: t.hero.stat3Value, label: t.hero.stat3Label },
    { icon: "🔒", value: t.hero.stat4Value, label: t.hero.stat4Label },
  ];

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero__inner">
          <div>
            <span className="eyebrow">
              <span aria-hidden="true">❤</span> {t.hero.badge}
            </span>
            <h1 className="hero__headline">
              {t.hero.titleLine1} <span className="text-gradient">{t.hero.titleBrand}</span>
            </h1>
            <p className="hero__desc">{t.hero.desc}</p>

            <div className="hero__ctas">
              <Button onClick={() => navigate(ROUTES.roleSelection)}>
                {t.hero.ctaPrimary} →
              </Button>
              <Button variant="outline" onClick={() => navigate(ROUTES.roleSelection)}>
                {t.hero.ctaSecondary}
              </Button>
            </div>

            <ul className="hero__trust">
              <li>✅ {t.hero.trust1}</li>
              <li>✅ {t.hero.trust2}</li>
              <li>✅ {t.hero.trust3}</li>
              <li>✅ {t.hero.trust4}</li>
            </ul>
          </div>

          <div className="hero__visual">
            <img
              src={heroImage}
              alt="MediMitra AI healthcare assistant, doctor consultation and secure health records preview"
              width={1470}
              height={1070}
            />
          </div>
        </div>

        <div className="hero__stats reveal" ref={statsRef}>
          {stats.map((stat) => (
            <div className="hero__stat" key={stat.label}>
              <span className="hero__stat-icon" aria-hidden="true">
                {stat.icon}
              </span>
              <div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}