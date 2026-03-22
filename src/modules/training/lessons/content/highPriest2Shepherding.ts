import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { highPriest2ShepherdingEs } from './highPriest2Shepherding.es';
import { highPriest2ShepherdingEn } from './highPriest2Shepherding.en';

export function getHighPriest2ShepherdingContent(locale: Locale): TrainingLessonContent {
  return mergeTrainingLesson(locale, locale === 'en' ? highPriest2ShepherdingEn : highPriest2ShepherdingEs);
}
