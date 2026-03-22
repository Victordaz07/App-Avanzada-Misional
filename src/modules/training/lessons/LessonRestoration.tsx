/**
 * LessonRestoration - Core-1: La Restauración del Evangelio
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getCore1RestoreContent } from './content/core1Restore';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'core-1';

export interface LessonRestorationProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonRestoration({ onPracticeProgress }: LessonRestorationProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getCore1RestoreContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
