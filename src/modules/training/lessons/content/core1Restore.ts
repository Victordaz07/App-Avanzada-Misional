import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonCanonicalContent } from './trainingLessonContent.types';
import { core1RestoreEs } from './core1Restore.es';
import { core1RestoreEn } from './core1Restore.en';

export function getCore1RestoreContent(locale: Locale): TrainingLessonCanonicalContent {
  return locale === 'en' ? core1RestoreEn : core1RestoreEs;
}
