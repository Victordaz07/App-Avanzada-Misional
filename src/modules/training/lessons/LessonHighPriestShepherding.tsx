/**
 * LessonHighPriestShepherding - High Priest-2: Cuidado del rebaño
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getHighPriest2ShepherdingContent } from './content/highPriest2Shepherding';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'high-priest-2';

export interface LessonHighPriestShepherdingProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonHighPriestShepherding({
  onPracticeProgress,
}: LessonHighPriestShepherdingProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getHighPriest2ShepherdingContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
