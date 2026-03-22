import en from './en';
import es from './es';

export type Locale = 'es' | 'en';

export const dictionaries: Record<Locale, object> = {
  en,
  es,
};
