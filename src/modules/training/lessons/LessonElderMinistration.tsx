/**
 * LessonElderMinistration - Elder-1: Deberes del Elder
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getElder1MinistrationContent } from './content/elder1Ministration';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'elder-1';

export interface LessonElderMinistrationProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonElderMinistration({
  onPracticeProgress,
}: LessonElderMinistrationProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getElder1MinistrationContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
