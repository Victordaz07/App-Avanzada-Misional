/**
 * LessonHighPriestKeysPresidency - High Priest-1: Presidencia y llaves
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getHighPriest1KeysContent } from './content/highPriest1Keys';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'high-priest-1';

export interface LessonHighPriestKeysPresidencyProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonHighPriestKeysPresidency({
  onPracticeProgress,
}: LessonHighPriestKeysPresidencyProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getHighPriest1KeysContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
