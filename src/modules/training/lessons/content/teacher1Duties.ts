import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { teacher1DutiesEs } from './teacher1Duties.es';
import { teacher1DutiesEn } from './teacher1Duties.en';

export function getTeacher1DutiesContent(locale: Locale): TrainingLessonContent {
  return mergeTrainingLesson(locale, locale === 'en' ? teacher1DutiesEn : teacher1DutiesEs);
}
