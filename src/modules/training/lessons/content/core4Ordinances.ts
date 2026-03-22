import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { core4OrdinancesEs } from './core4Ordinances.es';
import { core4OrdinancesEn } from './core4Ordinances.en';

export function getCore4OrdinancesContent(locale: Locale): TrainingLessonContent {
  return mergeTrainingLesson(locale, locale === 'en' ? core4OrdinancesEn : core4OrdinancesEs);
}
