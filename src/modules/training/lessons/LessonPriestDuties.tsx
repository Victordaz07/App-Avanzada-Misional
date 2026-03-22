/**
 * LessonPriestDuties - Priest-1: Deberes del Presbítero
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getPriest1DutiesContent } from './content/priest1Duties';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'priest-1';

export interface LessonPriestDutiesProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonPriestDuties({ onPracticeProgress }: LessonPriestDutiesProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getPriest1DutiesContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
