import { LANGUAGES } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import type { LanguageCode } from "@/types";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <label>
      <span className="sr-only">Select language</span>
      <select
        className="navbar__select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        aria-label="Select language"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );
}