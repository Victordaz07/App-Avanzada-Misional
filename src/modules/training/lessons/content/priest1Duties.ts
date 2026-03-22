import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { priest1DutiesEs } from './priest1Duties.es';
import { priest1DutiesEn } from './priest1Duties.en';

export function getPriest1DutiesContent(locale: Locale): TrainingLessonContent {
  return mergeTrainingLesson(locale, locale === 'en' ? priest1DutiesEn : priest1DutiesEs);
}
