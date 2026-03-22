import type { Locale } from '../../i18n/locales';
import type { MemberActivity } from './activitiesTypes';
import { memberActivitiesEs } from './memberActivities.es';
import { memberActivitiesEn } from './memberActivities.en';

export { memberActivitiesEs } from './memberActivities.es';
export { memberActivitiesEn } from './memberActivities.en';

/** Actividades por idioma (mismos `id` en ES/EN para progreso estable). */
export function getMemberActivitiesForLocale(locale: Locale): MemberActivity[] {
  return locale === 'en' ? memberActivitiesEn : memberActivitiesEs;
}

/** @deprecated Usar `getMemberActivitiesForLocale(locale)`. */
export const memberActivities: MemberActivity[] = memberActivitiesEs;
