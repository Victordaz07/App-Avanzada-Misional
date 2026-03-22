import type { Locale } from '../../i18n/locales';
import type { StudyModule } from './types';
import { memberStudyModulesEs } from './memberStudyModules.es';
import { memberStudyModulesEn } from './memberStudyModules.en';

export { memberStudyModulesEs } from './memberStudyModules.es';
export { memberStudyModulesEn } from './memberStudyModules.en';

const MEMBER_STUDY_MODULES_BY_LOCALE: Record<Locale, StudyModule[]> = {
  es: memberStudyModulesEs,
  en: memberStudyModulesEn,
};

/**
 * Módulos de estudio doctrinal para miembros (temas/secciones por idioma).
 * Los `id` de módulo y sección deben coincidir entre locales para que el progreso sea estable.
 */
export function getMemberStudyModulesForLocale(locale: Locale): StudyModule[] {
  return MEMBER_STUDY_MODULES_BY_LOCALE[locale] ?? memberStudyModulesEn;
}

/** @deprecated Prefer `getMemberStudyModulesForLocale(locale)` para respetar el idioma activo. */
export const memberStudyModules = memberStudyModulesEs;
