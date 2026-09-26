import { NAV_LINKS, ROUTES, DEVELOPER } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const navLabels: Record<string, string> = {
    home: t.nav.home,
    about: t.nav.about,
    features: t.nav.features,
    howItWorks: t.nav.howItWorks,
    developers: t.nav.developers,
    contact: t.nav.contact,
  };

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <Logo size={26} /> MediMitra
            </div>
            <p className="footer__desc">{t.footer.desc}</p>
          </div>

          <div>
            <h3 className="footer__heading">{t.footer.navHeading}</h3>
            <ul className="footer__list">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a href={link.href}>{navLabels[link.key]}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">{t.footer.rolesHeading}</h3>
            <ul className="footer__list">
              <li>
                <a href={ROUTES.patient.login}>{t.roleNames.patient}</a>
              </li>
              <li>
                <a href={ROUTES.doctor.login}>{t.roleNames.doctor}</a>
              </li>
              <li>
                <a href={ROUTES.admin.login}>{t.roleNames.admin}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">{t.footer.moreHeading}</h3>
            <ul className="footer__list">
              <li>
                <a href={DEVELOPER.github} target="_blank" rel="noreferrer">
                  {t.developer.github}
                </a>
              </li>
              <li>
                <a href="#privacy">{t.footer.privacy}</a>
              </li>
              <li>
                <a href="#terms">{t.footer.terms}</a>
              </li>
            </ul>
            <p className="footer__desc" style={{ marginTop: 16 }}>
              {t.footer.languageLabel}
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} MediMitra. {t.footer.rights}
          </span>
          <span>{DEVELOPER.name}</span>
        </div>
      </div>
    </footer>
  );
}