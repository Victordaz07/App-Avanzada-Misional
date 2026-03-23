import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonCanonicalContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { elder2LeadershipEs } from './elder2Leadership.es';
import { elder2LeadershipEn } from './elder2Leadership.en';

export function getElder2LeadershipContent(locale: Locale): TrainingLessonCanonicalContent {
  return mergeTrainingLesson(locale, locale === 'en' ? elder2LeadershipEn : elder2LeadershipEs);
}
