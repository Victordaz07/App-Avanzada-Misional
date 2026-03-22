/**
 * LessonPriestPastoral - Priest-2: Servicio pastoral
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getPriest2PastoralContent } from './content/priest2Pastoral';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'priest-2';

export interface LessonPriestPastoralProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonPriestPastoral({ onPracticeProgress }: LessonPriestPastoralProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getPriest2PastoralContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
