import { useLanguage } from "@/hooks/useLanguage";
import { useReveal } from "@/hooks/useReveal";

export function AISection() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLDivElement>();

  const chips = [t.ai.chip1, t.ai.chip2, t.ai.chip3, t.ai.chip4];

  return (
    <section className="section">
      <div className="container">
        <div className="ai-section reveal" ref={ref}>
          <div>
            <h2 className="ai-section__title">{t.ai.title}</h2>
            <p className="ai-section__desc">{t.ai.desc}</p>
            <div className="ai-section__chips">
              {chips.map((chip) => (
                <span className="ai-chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="ai-section__icon" aria-hidden="true">
            🤖
          </div>
        </div>
      </div>
    </section>
  );
}