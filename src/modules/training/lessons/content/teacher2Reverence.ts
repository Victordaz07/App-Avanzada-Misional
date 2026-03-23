import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonCanonicalContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { teacher2ReverenceEs } from './teacher2Reverence.es';
import { teacher2ReverenceEn } from './teacher2Reverence.en';

export function getTeacher2ReverenceContent(locale: Locale): TrainingLessonCanonicalContent {
  return mergeTrainingLesson(locale, locale === 'en' ? teacher2ReverenceEn : teacher2ReverenceEs);
}
