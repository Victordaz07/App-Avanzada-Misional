/**
 * LessonDeaconDuties - Deacon-1: Deberes del Diácono
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getDeacon1DutiesContent } from './content/deacon1Duties';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'deacon-1';

export interface LessonDeaconDutiesProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonDeaconDuties({ onPracticeProgress }: LessonDeaconDutiesProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getDeacon1DutiesContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
