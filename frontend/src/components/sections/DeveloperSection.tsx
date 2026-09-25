import { useLanguage } from "@/hooks/useLanguage";
import { useReveal } from "@/hooks/useReveal";
import { DEVELOPER } from "@/constants";

export function DeveloperSection() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLDivElement>();

  const initials = DEVELOPER.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <section className="section" id="developers">
      <div className="container">
        <div className="developer reveal" ref={ref}>
          {/* Developer Profile */}
          <div className="developer__profile">
            <span className="developer__avatar" aria-hidden="true">
              {initials}
            </span>

            <div>
              <p className="developer__role">
                {t.developer.title}
              </p>

              <p className="developer__name">
                {DEVELOPER.name}
              </p>

              <p className="developer__role">
                {t.developer.role}
              </p>
            </div>
          </div>

          {/* Developer Links */}
          <div className="developer__links">
            <a
              className="btn btn--outline btn--sm"
              href={DEVELOPER.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${DEVELOPER.name} on GitHub`}
            >
              🔗 {t.developer.github}
            </a>

            <a
              className="btn btn--outline btn--sm"
              href={DEVELOPER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${DEVELOPER.name} on LinkedIn`}
            >
              💼 {t.developer.linkedin}
            </a>

            <a
              className="btn btn--primary btn--sm"
              href={DEVELOPER.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${DEVELOPER.name}'s portfolio`}
            >
              🌐 {t.developer.portfolio}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

