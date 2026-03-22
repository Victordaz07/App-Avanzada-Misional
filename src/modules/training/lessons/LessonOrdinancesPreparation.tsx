/**
 * LessonOrdinancesPreparation - Core-4: Preparación para las Ordenanzas
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getCore4OrdinancesContent } from './content/core4Ordinances';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'core-4';

export interface LessonOrdinancesPreparationProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonOrdinancesPreparation({
  onPracticeProgress,
}: LessonOrdinancesPreparationProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getCore4OrdinancesContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
