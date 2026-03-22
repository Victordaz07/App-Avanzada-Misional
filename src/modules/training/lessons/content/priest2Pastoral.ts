import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { priest2PastoralEs } from './priest2Pastoral.es';
import { priest2PastoralEn } from './priest2Pastoral.en';

export function getPriest2PastoralContent(locale: Locale): TrainingLessonContent {
  return mergeTrainingLesson(locale, locale === 'en' ? priest2PastoralEn : priest2PastoralEs);
}
