import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_LINKS, ROUTES } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const navLabels: Record<string, string> = {
    home: t.nav.home,
    about: t.nav.about,
    features: t.nav.features,
    howItWorks: t.nav.howItWorks,
    developers: t.nav.developers,
    contact: t.nav.contact,
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  /**
   * Section anchors (#about, #features, etc.) only exist on
   * the landing page.
   *
   * If already on the homepage:
   *   → smoothly scroll to the section.
   *
   * If on another page:
   *   → navigate to homepage and pass the target section
   *      through router state.
   */
  const handleSectionLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    event.preventDefault();
    setMobileOpen(false);

    if (location.pathname === ROUTES.home) {
      const id = hash.replace("#", "");

      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    navigate(ROUTES.home, {
      state: {
        scrollTo: hash,
      },
    });
  };

  /**
   * Handle MediMitra logo click.
   */
  const handleLogoClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setMobileOpen(false);

    if (location.pathname === ROUTES.home) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    navigate(ROUTES.home);
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">

        {/* =====================================================
            Logo
        ====================================================== */}
        <a
          href={ROUTES.home}
          className="navbar__logo"
          aria-label="MediMitra home"
          onClick={handleLogoClick}
        >
          <span
            className="navbar__logo-icon"
            aria-hidden="true"
          >
            +
          </span>

          <span className="navbar__logo-text">
            MediMitra
          </span>
        </a>

        {/* =====================================================
            Desktop Navigation
        ====================================================== */}
        <nav
          className="navbar__links"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={`navbar__link ${
                location.pathname === ROUTES.home &&
                link.href === "#home"
                  ? "is-active"
                  : ""
              }`}
              onClick={(event) =>
                handleSectionLink(event, link.href)
              }
            >
              {navLabels[link.key]}
            </a>
          ))}
        </nav>

        {/* =====================================================
            Desktop Actions
        ====================================================== */}
        <div className="navbar__actions navbar__desktop-actions">
          <LanguageSelector />

          <ThemeToggle />

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleNavigation(ROUTES.roleSelection)
            }
          >
            {t.nav.login}
          </Button>

          <Button
            size="sm"
            onClick={() =>
              handleNavigation(ROUTES.roleSelection)
            }
          >
            {t.nav.getStarted}
          </Button>
        </div>

        {/* =====================================================
            Mobile Menu Button
        ====================================================== */}
        <button
          type="button"
          className={`navbar__burger ${
            mobileOpen ? "is-open" : ""
          }`}
          aria-label={
            mobileOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() =>
            setMobileOpen((value) => !value)
          }
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* =====================================================
          Mobile Navigation
      ====================================================== */}
      <div
        id="mobile-navigation"
        className={`container navbar__mobile ${
          mobileOpen ? "is-open" : ""
        }`}
      >
        {/* Mobile Links */}
        <nav
          className="navbar__mobile-links"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="navbar__link"
              onClick={(event) =>
                handleSectionLink(event, link.href)
              }
            >
              {navLabels[link.key]}
            </a>
          ))}
        </nav>

        {/* Mobile Actions */}
        <div className="navbar__mobile-actions">
          <LanguageSelector />

          <ThemeToggle />

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleNavigation(ROUTES.roleSelection)
            }
          >
            {t.nav.login}
          </Button>

          <Button
            size="sm"
            onClick={() =>
              handleNavigation(ROUTES.roleSelection)
            }
          >
            {t.nav.getStarted}
          </Button>
        </div>
      </div>
    </header>
  );
}