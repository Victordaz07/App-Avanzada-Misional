import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonCanonicalContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { highPriest1KeysEs } from './highPriest1Keys.es';
import { highPriest1KeysEn } from './highPriest1Keys.en';

export function getHighPriest1KeysContent(locale: Locale): TrainingLessonCanonicalContent {
  return mergeTrainingLesson(locale, locale === 'en' ? highPriest1KeysEn : highPriest1KeysEs);
}
