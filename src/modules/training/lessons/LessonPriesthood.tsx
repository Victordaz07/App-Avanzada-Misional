/**
 * LessonPriesthood - Core-3: El Sacerdocio
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getCore3PriesthoodContent } from './content/core3Priesthood';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'core-3';

export interface LessonPriesthoodProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonPriesthood({ onPracticeProgress }: LessonPriesthoodProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getCore3PriesthoodContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
