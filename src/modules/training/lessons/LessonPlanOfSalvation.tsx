/**
 * LessonPlanOfSalvation - Core-2: El Plan de Salvación
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getCore2PlanOfSalvationContent } from './content/core2PlanOfSalvation';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'core-2';

export interface LessonPlanOfSalvationProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonPlanOfSalvation({ onPracticeProgress }: LessonPlanOfSalvationProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getCore2PlanOfSalvationContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
