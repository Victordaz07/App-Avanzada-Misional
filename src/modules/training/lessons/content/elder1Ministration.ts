import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { elder1MinistrationEs } from './elder1Ministration.es';
import { elder1MinistrationEn } from './elder1Ministration.en';

export function getElder1MinistrationContent(locale: Locale): TrainingLessonContent {
  return mergeTrainingLesson(locale, locale === 'en' ? elder1MinistrationEn : elder1MinistrationEs);
}
