import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonCanonicalContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { deacon1DutiesEs } from './deacon1Duties.es';
import { deacon1DutiesEn } from './deacon1Duties.en';

export function getDeacon1DutiesContent(locale: Locale): TrainingLessonCanonicalContent {
  return mergeTrainingLesson(locale, locale === 'en' ? deacon1DutiesEn : deacon1DutiesEs);
}
