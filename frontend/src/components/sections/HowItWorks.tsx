import { useLanguage } from "@/hooks/useLanguage";
import { useReveal } from "@/hooks/useReveal";

export function HowItWorks() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLDivElement>();

  const steps = [
    { icon: "👤", title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
    { icon: "📝", title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
    { icon: "🛡️", title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc },
    { icon: "🚀", title: t.howItWorks.step4Title, desc: t.howItWorks.step4Desc },
  ];

  return (
    <section className="section" id="how-it-works" style={{ background: "var(--surface-secondary)" }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.howItWorks.eyebrow}</span>
          <h2 className="section-title">{t.howItWorks.title}</h2>
          <p className="section-subtitle">{t.howItWorks.subtitle}</p>
        </div>

        <div className="steps reveal" ref={ref}>
          {steps.map((step, i) => (
            <div className="step" key={step.title}>
              <div className="step__icon" aria-hidden="true">
                {step.icon}
              </div>
              <h3 className="step__title">
                {i + 1}. {step.title}
              </h3>
              <p className="step__desc">{step.desc}</p>
              <span className="step__connector" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}