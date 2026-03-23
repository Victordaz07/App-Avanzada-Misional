import type { TrainingLessonCanonicalContent, TrainingLessonContent } from './trainingLessonContent.types';

export type {
  TrainingLessonCanonicalContent,
  TrainingLessonContent,
  TrainingLessonScripture,
} from './trainingLessonContent.types';

/** Alias histórico para la lección core-1 (siempre formato canónico). */
export type Core1Content = TrainingLessonCanonicalContent;
