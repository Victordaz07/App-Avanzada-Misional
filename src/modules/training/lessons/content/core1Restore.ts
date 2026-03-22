import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonContent } from './trainingLessonContent.types';
import { core1RestoreEs } from './core1Restore.es';
import { core1RestoreEn } from './core1Restore.en';

export function getCore1RestoreContent(locale: Locale): TrainingLessonContent {
  return locale === 'en' ? core1RestoreEn : core1RestoreEs;
}
