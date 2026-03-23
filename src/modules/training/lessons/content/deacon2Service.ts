import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonCanonicalContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { deacon2ServiceEs } from './deacon2Service.es';
import { deacon2ServiceEn } from './deacon2Service.en';

export function getDeacon2ServiceContent(locale: Locale): TrainingLessonCanonicalContent {
  return mergeTrainingLesson(locale, locale === 'en' ? deacon2ServiceEn : deacon2ServiceEs);
}
