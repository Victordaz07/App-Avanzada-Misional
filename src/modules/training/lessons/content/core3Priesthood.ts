import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { core3PriesthoodEs } from './core3Priesthood.es';
import { core3PriesthoodEn } from './core3Priesthood.en';

export function getCore3PriesthoodContent(locale: Locale): TrainingLessonContent {
  return mergeTrainingLesson(locale, locale === 'en' ? core3PriesthoodEn : core3PriesthoodEs);
}
