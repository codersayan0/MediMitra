import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/constants";

export function About() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const ref = useReveal<HTMLDivElement>();

  const aboutImage = theme === "dark" ? IMAGES.aboutDark : IMAGES.aboutLight;

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about__inner reveal" ref={ref}>
          <div>
            <h2 className="about__title">{t.about.title}</h2>
            <p className="about__desc">{t.about.desc}</p>
            <Button variant="outline">{t.about.cta} →</Button>
          </div>

          <div className="about__media">
            <img
              src={aboutImage}
              alt="Doctor consulting with a patient during an appointment"
              width={1666}
              height={944}
              loading="lazy"
            />
            <div className="about__badge">
              <span aria-hidden="true">💙</span> {t.about.mediaCaption}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}