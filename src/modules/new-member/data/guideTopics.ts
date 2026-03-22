/**
 * New Member Guide Topics — ES/EN según locale de la app.
 */

import type { Locale } from '../../../i18n/locales';
import type { GuideCategory, GuideTopic } from './guideTopics.types';
import { guideTopicsEn } from './guideTopics.en';
import { guideTopicsEs } from './guideTopics.es';

export type { GuideSection, GuideTopic, GuideCategory } from './guideTopics.types';

function topicsForLocale(locale: Locale): GuideTopic[] {
  return locale === 'en' ? guideTopicsEn : guideTopicsEs;
}

/** Lista completa para el idioma activo. */
export function getAllGuideTopics(locale: Locale): GuideTopic[] {
  return topicsForLocale(locale);
}

export function getGuideTopicById(id: string, locale: Locale): GuideTopic | undefined {
  return topicsForLocale(locale).find((topic) => topic.id === id);
}

export function getGuideTopicsByCategory(category: GuideTopic['category'], locale: Locale): GuideTopic[] {
  return topicsForLocale(locale).filter((topic) => topic.category === category);
}

const CATEGORY_LABELS_EN: Record<GuideCategory, string> = {
  worship: 'Worship with the Ward',
  'covenant-living': 'Covenant Living',
  ordinances: 'Ordinances & Temple',
  belonging: 'Belonging & Support',
};

const CATEGORY_LABELS_ES: Record<GuideCategory, string> = {
  worship: 'Adoración con el barrio',
  'covenant-living': 'Vida en convenio',
  ordinances: 'Ordenanzas y templo',
  belonging: 'Pertenencia y apoyo',
};

export function getCategoryLabels(locale: Locale): Record<GuideCategory, string> {
  return locale === 'en' ? CATEGORY_LABELS_EN : CATEGORY_LABELS_ES;
}

/** @deprecated Usar `getAllGuideTopics(locale)`. */
export const guideTopics: GuideTopic[] = guideTopicsEs;
