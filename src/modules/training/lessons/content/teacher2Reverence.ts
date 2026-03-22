import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { teacher2ReverenceEs } from './teacher2Reverence.es';
import { teacher2ReverenceEn } from './teacher2Reverence.en';

export function getTeacher2ReverenceContent(locale: Locale): TrainingLessonContent {
  return mergeTrainingLesson(locale, locale === 'en' ? teacher2ReverenceEn : teacher2ReverenceEs);
}
