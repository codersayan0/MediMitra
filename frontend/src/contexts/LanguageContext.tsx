import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { LanguageCode } from "@/types";
import { STORAGE_KEYS } from "@/constants";
import { dictionaries, type TranslationDictionary } from "@/i18n";

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationDictionary;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEYS.language) as LanguageCode | null;
  if (saved === "en" || saved === "bn" || saved === "hi") return saved;
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.language, language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const setLanguage = useCallback((lang: LanguageCode) => setLanguageState(lang), []);

  const value = useMemo(
    () => ({ language, setLanguage, t: dictionaries[language] }),
    [language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}