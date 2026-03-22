export const SUPPORTED_LOCALES = ['es', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';
export const FALLBACK_LOCALE: Locale = 'en';

export const LOCALE_STORAGE_KEY = 'appLang';

export const LANGUAGE_OPTIONS: {
  code: Locale;
  label: string;
  flag: string;
  /** Código corto para listas tipo selector (p. ej. modal de idioma). */
  shortCode: string;
}[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸', shortCode: 'ES' },
  { code: 'en', label: 'English', flag: '🇺🇸', shortCode: 'EN' },
];

export function isSupportedLocale(value: string | null | undefined): value is Locale {
  if (!value) return false;
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/** Locales antiguos (fr/pt) se migran a español para usuarios existentes. */
export const LEGACY_LOCALE_TO_LOCALE: Record<string, Locale> = {
  fr: 'es',
  pt: 'es',
};

export function mapSystemLocale(systemLocale: string): Locale {
  const normalized = systemLocale.toLowerCase();
  if (normalized.startsWith('en')) return 'en';
  if (normalized.startsWith('es')) return 'es';
  if (normalized.startsWith('fr') || normalized.startsWith('pt')) return 'es';
  return DEFAULT_LOCALE;
}
