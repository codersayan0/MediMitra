import { useLanguage } from "@/hooks/useLanguage";
import { useReveal } from "@/hooks/useReveal";

const ICON_STYLES = [
  { bg: "#e0f2fe", color: "#0369a1" },
  { bg: "#ede9fe", color: "#6d28d9" },
  { bg: "#dcfce7", color: "#15803d" },
  { bg: "#fef3c7", color: "#b45309" },
  { bg: "#fce7f3", color: "#be185d" },
  { bg: "#e0e7ff", color: "#4338ca" },
];

const ICONS = ["🩺", "🤖", "🔒", "🔗", "🌐", "⚡"];

export function Features() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLDivElement>();

  const features = [
    { title: t.features.f1Title, desc: t.features.f1Desc },
    { title: t.features.f2Title, desc: t.features.f2Desc },
    { title: t.features.f3Title, desc: t.features.f3Desc },
    { title: t.features.f4Title, desc: t.features.f4Desc },
    { title: t.features.f5Title, desc: t.features.f5Desc },
    { title: t.features.f6Title, desc: t.features.f6Desc },
  ];

  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.features.eyebrow}</span>
          <h2 className="section-title">{t.features.title}</h2>
          <p className="section-subtitle">{t.features.subtitle}</p>
        </div>

        <div className="features__grid reveal" ref={ref}>
          {features.map((feature, i) => (
            <article className="card" key={feature.title}>
              <div
                className="card__icon"
                style={{ background: ICON_STYLES[i].bg, color: ICON_STYLES[i].color }}
                aria-hidden="true"
              >
                {ICONS[i]}
              </div>
              <h3 className="card__title">{feature.title}</h3>
              <p className="card__desc">{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}