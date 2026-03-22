/**
 * LessonElderLeadership - Elder-2: Liderazgo servicial
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getElder2LeadershipContent } from './content/elder2Leadership';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'elder-2';

export interface LessonElderLeadershipProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonElderLeadership({ onPracticeProgress }: LessonElderLeadershipProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getElder2LeadershipContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
