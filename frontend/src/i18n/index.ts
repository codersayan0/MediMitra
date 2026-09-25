import en from "./en.json";
import bn from "./bn.json";
import hi from "./hi.json";
import type { LanguageCode } from "@/types";

export const dictionaries: Record<LanguageCode, typeof en> = { en, bn, hi };

export type TranslationDictionary = typeof en;