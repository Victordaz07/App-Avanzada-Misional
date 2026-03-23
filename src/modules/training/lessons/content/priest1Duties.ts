import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonCanonicalContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { priest1DutiesEs } from './priest1Duties.es';
import { priest1DutiesEn } from './priest1Duties.en';

export function getPriest1DutiesContent(locale: Locale): TrainingLessonCanonicalContent {
  return mergeTrainingLesson(locale, locale === 'en' ? priest1DutiesEn : priest1DutiesEs);
}
