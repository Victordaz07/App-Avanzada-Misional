import type { TrainingLessonContent } from './trainingLessonContent.types';
import { MANUAL_LESSONS_ES } from './manualLessons.es';
import { MANUAL_LESSONS_EN } from './manualLessons.en';

export const MANUAL_LESSON_IDS: readonly string[] = [
  ...Object.keys(MANUAL_LESSONS_ES),
] as const;

export function getManualLessonContent(
  lessonId: string,
  locale: string
): TrainingLessonContent | null {
  const useEn = locale.startsWith('en');
  const map = useEn ? MANUAL_LESSONS_EN : MANUAL_LESSONS_ES;
  return map[lessonId] ?? null;
}

export function isManualTrainingLesson(lessonId: string): boolean {
  return lessonId in MANUAL_LESSONS_ES;
}
