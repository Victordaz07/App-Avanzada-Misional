import type { Locale } from '../../../../i18n/locales';
import type { TrainingLessonCanonicalContent } from './trainingLessonContent.types';

type TrainingLessonUiFields = Pick<
  TrainingLessonCanonicalContent,
  | 'objectivesHeading'
  | 'scripturesHeading'
  | 'didYouKnowHeading'
  | 'practiceHeading'
  | 'practiceHint'
  | 'practiceDone'
  | 'practicePending'
  | 'reflectionHeading'
  | 'reflectionHint'
  | 'reflectionPlaceholder'
  | 'actionHeading'
>;

const UI_ES: TrainingLessonUiFields = {
  objectivesHeading: 'Objetivos',
  scripturesHeading: 'Escrituras clave',
  didYouKnowHeading: '¿Sabías que…?',
  practiceHeading: 'Práctica',
  practiceHint: 'Marca las actividades que completes (se guardan automáticamente)',
  practiceDone: 'Completado',
  practicePending: 'Pendiente',
  reflectionHeading: 'Preguntas de reflexión',
  reflectionHint: 'Escribe tus pensamientos (se guardan automáticamente)',
  reflectionPlaceholder: 'Escribe aquí...',
  actionHeading: 'Acción esta semana',
};

const UI_EN: TrainingLessonUiFields = {
  objectivesHeading: 'Objectives',
  scripturesHeading: 'Key scriptures',
  didYouKnowHeading: 'Did you know…?',
  practiceHeading: 'Practice',
  practiceHint: 'Check off activities as you complete them (saved automatically)',
  practiceDone: 'Completed',
  practicePending: 'Pending',
  reflectionHeading: 'Reflection questions',
  reflectionHint: 'Write your thoughts (saved automatically)',
  reflectionPlaceholder: 'Write here...',
  actionHeading: 'Action this week',
};

/** Campos de lección sin las etiquetas de UI compartidas (se rellenan según locale). */
export type TrainingLessonSpecific = Omit<TrainingLessonCanonicalContent, keyof TrainingLessonUiFields>;

export function mergeTrainingLesson(
  locale: Locale,
  specific: TrainingLessonSpecific,
): TrainingLessonCanonicalContent {
  const ui: TrainingLessonUiFields = locale === 'en' ? UI_EN : UI_ES;
  return { ...ui, ...specific };
}
