/**
 * LessonDeaconService - Deacon-2: Servicio como Diácono
 */

import React, { useMemo } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { getDeacon2ServiceContent } from './content/deacon2Service';
import { TrainingLessonBody } from './TrainingLessonBody';

const LESSON_ID = 'deacon-2';

export interface LessonDeaconServiceProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonDeaconService({ onPracticeProgress }: LessonDeaconServiceProps): JSX.Element {
  const { locale } = useI18n();
  const content = useMemo(() => getDeacon2ServiceContent(locale), [locale]);

  return (
    <TrainingLessonBody
      lessonId={LESSON_ID}
      content={content}
      onPracticeProgress={onPracticeProgress}
    />
  );
}
