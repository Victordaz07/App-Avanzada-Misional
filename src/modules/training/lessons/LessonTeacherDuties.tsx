/**
 * LessonTeacherDuties - Teacher-1: Deberes del Maestro
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getTeacher1DutiesContent } from './content/teacher1Duties';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'teacher-1';

export interface LessonTeacherDutiesProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonTeacherDuties({ onPracticeProgress }: LessonTeacherDutiesProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getTeacher1DutiesContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
