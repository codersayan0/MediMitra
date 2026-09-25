import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_LINKS, ROUTES } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { t } = useLanguage();
  const navigate = useNavigate();
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

  const handleNavLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Logo */}
        <a
          href="#home"
          className="navbar__logo"
          aria-label="MediMitra home"
          onClick={handleNavLinkClick}
        >
          <span className="navbar__logo-icon" aria-hidden="true">
            +
          </span>

          <span>MediMitra</span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="navbar__links"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="navbar__link"
              onClick={handleNavLinkClick}
            >
              {navLabels[link.key]}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="navbar__actions navbar__desktop-actions">
          <LanguageSelector />

          <ThemeToggle />

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNavigation(ROUTES.roleSelection)}
          >
            {t.nav.login}
          </Button>

          <Button
            size="sm"
            onClick={() => handleNavigation(ROUTES.roleSelection)}
          >
            {t.nav.getStarted}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="navbar__burger"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`container navbar__mobile ${
          mobileOpen ? "is-open" : ""
        }`}
      >
        {/* Mobile Links */}
        {NAV_LINKS.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className="navbar__link"
            onClick={handleNavLinkClick}
          >
            {navLabels[link.key]}
          </a>
        ))}

        {/* Mobile Actions */}
        <div className="navbar__mobile-actions">
          <LanguageSelector />

          <ThemeToggle />

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNavigation(ROUTES.roleSelection)}
          >
            {t.nav.login}
          </Button>

          <Button
            size="sm"
            onClick={() => handleNavigation(ROUTES.roleSelection)}
          >
            {t.nav.getStarted}
          </Button>
        </div>
      </div>
    </header>
  );
}