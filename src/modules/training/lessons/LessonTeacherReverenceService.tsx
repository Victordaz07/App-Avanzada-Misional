/**
 * LessonTeacherReverenceService - Teacher-2: Servicio y reverencia como Maestro
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getTeacher2ReverenceContent } from './content/teacher2Reverence';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'teacher-2';

export interface LessonTeacherReverenceServiceProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonTeacherReverenceService({
  onPracticeProgress,
}: LessonTeacherReverenceServiceProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getTeacher2ReverenceContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
