import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { elder2LeadershipEs } from './elder2Leadership.es';
import { elder2LeadershipEn } from './elder2Leadership.en';

export function getElder2LeadershipContent(locale: Locale): TrainingLessonContent {
  return mergeTrainingLesson(locale, locale === 'en' ? elder2LeadershipEn : elder2LeadershipEs);
}
