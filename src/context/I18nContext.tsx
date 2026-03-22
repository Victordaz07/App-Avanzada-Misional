import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { StorageService } from '../utils/storage';
import { normalizeStoredRole } from '../config/roles';
import {
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  LOCALE_STORAGE_KEY,
  LEGACY_LOCALE_TO_LOCALE,
  SUPPORTED_LOCALES,
  isSupportedLocale,
  type Locale,
} from '../i18n/locales';

// Import JSON translation files
import esTranslations from '../../i18n/es.json';
import enTranslations from '../../i18n/en.json';
import memberEsTranslations from '../i18n/member.es.json';
import memberEnTranslations from '../i18n/member.en.json';
// App UI translations (shared across all roles)
import appEsTranslations from '../i18n/app.es.json';
import appEnTranslations from '../i18n/app.en.json';

export type { Locale } from '../i18n/locales';

const dictionaries = {
  es: esTranslations,
  en: enTranslations,
};

const memberDictionaries = {
  es: memberEsTranslations,
  en: memberEnTranslations,
};

// App UI translations (available to all users regardless of role)
const appDictionaries = {
  es: appEsTranslations,
  en: appEnTranslations,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => Promise<void>;
  t: (path: string, vars?: Record<string, string | number>) => string;
  setUserRole: (role: string | null) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Helper to get nested value from object using dot notation
// Primero intenta buscar la key directamente (para keys planas en JSON)
// Luego intenta buscar en estructura anidada
const getNestedValue = (obj: Record<string, any>, path: string): any => {
  // Primero intentar buscar la key directamente (para keys planas como "roleSettings.member.title")
  if (obj && typeof obj === 'object' && path in obj) {
    return obj[path];
  }

  // Si no se encuentra, intentar buscar en estructura anidada
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

// Helper to apply variable substitution
const applyVars = (
  value: any,
  vars?: Record<string, string | number>,
): string => {
  if (value === undefined || value === null) {
    return '';
  }
  const str = value.toString();
  if (vars) {
    return str.replace(/\{\{(\w+)\}\}/g, (match: string, key: string) => {
      return vars[key]?.toString() || match;
    });
  }
  return str;
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [userRole, setUserRoleState] = useState<string | null>(null);

  useEffect(() => {
    loadLocale();
    // Cargar rol desde storage y normalizarlo
    const storedRoleRaw = StorageService.getItem('userRole');
    if (storedRoleRaw) {
      // Normalize role using centralized normalizer (handles legacy values)
      const normalizedRole = normalizeStoredRole(storedRoleRaw);
      setUserRoleState(normalizedRole);
    }

    // Escuchar cambios en storage usando storage event (más eficiente)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userRole') {
        setUserRoleState(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // También escuchar cambios locales (mismo tab)
    const checkRole = () => {
      const currentRole = StorageService.getItem('userRole');
      if (currentRole !== userRole) {
        setUserRoleState(currentRole);
      }
    };

    // Usar un intervalo más largo para evitar loops
    const interval = setInterval(checkRole, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [userRole]);

  const loadLocale = async () => {
    try {
      const storedLocale = StorageService.getItem(LOCALE_STORAGE_KEY);
      if (storedLocale && storedLocale in LEGACY_LOCALE_TO_LOCALE) {
        const migrated = LEGACY_LOCALE_TO_LOCALE[storedLocale];
        StorageService.setItem(LOCALE_STORAGE_KEY, migrated);
        setLocaleState(migrated);
        return;
      }
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
      if (!SUPPORTED_LOCALES.includes(newLocale)) return;
      StorageService.setItem(LOCALE_STORAGE_KEY, newLocale);
      setLocaleState(newLocale);
    } catch (error) {
      console.error('Error saving locale:', error);
    }
  };

  // Helper para navegar objetos anidados usando path con puntos
  // Primero intenta buscar la key directamente (para keys planas en JSON)
  // Luego intenta buscar en estructura anidada
  const getNestedValue = (obj: any, path: string): any => {
    // Primero intentar buscar la key directamente (para keys planas como "roleSettings.member.title")
    if (obj && typeof obj === 'object' && path in obj) {
      return obj[path];
    }

    // Si no se encuentra, intentar buscar en estructura anidada
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current === undefined || current === null) {
        return undefined;
      }
      current = current[key];
    }
    return current;
  };

  const t = (path: string, vars?: Record<string, string | number>): string => {
    // App UI translations (available to all users)
    if (path.startsWith('app.')) {
      const appTranslations = appDictionaries[locale] as Record<string, any>;
      const appValue = getNestedValue(appTranslations, path);
      const fallbackAppTranslations = appDictionaries[FALLBACK_LOCALE] as Record<string, any>;
      const fallbackAppValue = getNestedValue(fallbackAppTranslations, path);
      
      const resolvedAppValue = appValue ?? fallbackAppValue;
      
      if (resolvedAppValue !== undefined && resolvedAppValue !== null) {
        if (vars && typeof resolvedAppValue === 'string') {
          return resolvedAppValue.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return vars[key]?.toString() || match;
          });
        }
        return resolvedAppValue.toString();
      }
    }

    if (userRole === 'member' && path.startsWith('member.')) {
      const memberTranslations = memberDictionaries[locale] as Record<
        string,
        any
      >;
      const memberValue = getNestedValue(memberTranslations, path);
      const fallbackMemberTranslations = memberDictionaries[FALLBACK_LOCALE] as Record<
        string,
        any
      >;
      const fallbackMemberValue = getNestedValue(
        fallbackMemberTranslations,
        path,
      );

      const resolvedMemberValue = memberValue ?? fallbackMemberValue;

      if (resolvedMemberValue !== undefined && resolvedMemberValue !== null) {
        if (vars && typeof resolvedMemberValue === 'string') {
          return resolvedMemberValue.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return vars[key]?.toString() || match;
          });
        }
        return resolvedMemberValue.toString();
      }
    }

    // Buscar en el diccionario principal usando getNestedValue para soportar keys anidadas
    const currentTranslations = dictionaries[locale] as Record<string, any>;
    const value = getNestedValue(currentTranslations, path);

    // Si no se encuentra en el idioma actual, buscar en inglés como fallback
    if (value === undefined) {
      const englishTranslations = dictionaries[FALLBACK_LOCALE] as Record<string, any>;
      const englishValue = getNestedValue(englishTranslations, path);
      if (englishValue === undefined) {
        return path; // Devolver la clave si no se encuentra en ningún idioma
      }

      // Aplicar variables si existen
      if (vars && typeof englishValue === 'string') {
        return englishValue.replace(/\{\{(\w+)\}\}/g, (match, key) => {
          return vars[key]?.toString() || match;
        });
      }

      return englishValue.toString();
    }

    // Aplicar variables si existen
    if (vars && typeof value === 'string') {
      return value.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return vars[key]?.toString() || match;
      });
    }

    return value.toString();
  };

  const setUserRole = (role: string | null) => {
    setUserRoleState(role);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, setUserRole }}>
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
