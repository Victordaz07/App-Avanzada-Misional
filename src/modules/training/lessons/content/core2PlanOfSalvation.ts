import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonCanonicalContent } from './trainingLessonContent.types';
import { mergeTrainingLesson } from './trainingLessonUi';
import { core2PlanOfSalvationEs } from './core2PlanOfSalvation.es';
import { core2PlanOfSalvationEn } from './core2PlanOfSalvation.en';

export function getCore2PlanOfSalvationContent(locale: Locale): TrainingLessonCanonicalContent {
  return mergeTrainingLesson(
    locale,
    locale === 'en' ? core2PlanOfSalvationEn : core2PlanOfSalvationEs,
  );
}
