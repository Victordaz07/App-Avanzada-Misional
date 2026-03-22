import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { deacon1DutiesEs } from './deacon1Duties.es';
import { deacon1DutiesEn } from './deacon1Duties.en';

export function getDeacon1DutiesContent(locale: Locale): TrainingLessonContent {
  return mergeTrainingLesson(locale, locale === 'en' ? deacon1DutiesEn : deacon1DutiesEs);
}
