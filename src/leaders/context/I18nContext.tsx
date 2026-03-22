import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { StorageService } from '../utils/storage';
import {
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  LOCALE_STORAGE_KEY,
  isSupportedLocale,
  type Locale,
} from '../i18n/locales';

// Import translation files
import esTranslations from '../i18n/es.json';
import enTranslations from '../i18n/en.json';
import appEs from '../../i18n/app.es.json';
import appEn from '../../i18n/app.en.json';

const dictionaries: Record<string, Record<string, any>> = {
  es: esTranslations,
  en: enTranslations,
};

/** Shared app UI strings (profile blocks, onboarding labels, etc.) */
const appUiByLocale: Record<string, Record<string, any>> = {
  es: appEs as Record<string, any>,
  en: appEn as Record<string, any>,
};

export type { Locale } from '../i18n/locales';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => Promise<void>;
  t: (path: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Helper to get nested value from object using dot notation
const getNestedValue = (obj: Record<string, any>, path: string): any => {
  if (obj && typeof obj === 'object' && path in obj) {
    return obj[path];
  }

  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  return current;
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    loadLocale();
  }, []);

  const loadLocale = async () => {
    try {
      const storedLocale = StorageService.getItem(LOCALE_STORAGE_KEY);
      if (isSupportedLocale(storedLocale)) {
        setLocaleState(storedLocale);
      } else {
        setLocaleState(DEFAULT_LOCALE);
        StorageService.setItem(LOCALE_STORAGE_KEY, DEFAULT_LOCALE);
      }
    } catch (error) {
      console.error('Error loading locale:', error);
      setLocaleState(DEFAULT_LOCALE);
    }
  };

  const setLocale = async (newLocale: Locale) => {
    try {
      if (!isSupportedLocale(newLocale)) return;
      StorageService.setItem(LOCALE_STORAGE_KEY, newLocale);
      setLocaleState(newLocale);
    } catch (error) {
      console.error('Error saving locale:', error);
    }
  };

  const t = (path: string, vars?: Record<string, string | number>): string => {
    const resolve = (dict: Record<string, any>, p: string): unknown => getNestedValue(dict, p);

    let value: unknown;

    if (path.startsWith('app.')) {
      value = resolve(appUiByLocale[locale] || {}, path);
      if (value === undefined) {
        value = resolve(appUiByLocale[FALLBACK_LOCALE] || {}, path);
      }
    }

    if (value === undefined) {
      const currentTranslations = dictionaries[locale] || {};
      value = resolve(currentTranslations, path);
    }

    if (value === undefined) {
      const englishTranslations = dictionaries[FALLBACK_LOCALE] || {};
      value = resolve(englishTranslations, path);
    }

    if (value === undefined) {
      return path;
    }

    if (vars && typeof value === 'string') {
      return value.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return vars[key]?.toString() || match;
      });
    }

    return value?.toString() || path;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
