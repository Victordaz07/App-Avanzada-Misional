/**
 * Lección con contenido desde manualLessonContent (TSW / organizaciones).
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getManualLessonContent } from './content/manualLessonContent';
import { isStructuredTrainingLesson } from './content/trainingLessonContent.types';
import { TrainingLessonBody } from './TrainingLessonBody';
import { TrainingLessonStructuredBody } from './TrainingLessonStructuredBody';

export interface LessonManualBasedProps {
  lessonId: string;
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonManualBased({
  lessonId,
  onPracticeProgress,
}: LessonManualBasedProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getManualLessonContent(lessonId, locale), [lessonId, locale]);

  if (!content) {
    return <></>;
  }

  if (isStructuredTrainingLesson(content)) {
    return (
      <TrainingLessonStructuredBody
        lessonId={lessonId}
        content={content}
        onPracticeProgress={onPracticeProgress}
      />
    );
  }

  return (
    <TrainingLessonBody
      lessonId={lessonId}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
