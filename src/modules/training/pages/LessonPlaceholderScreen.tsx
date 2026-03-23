/**
 * Pantalla de lección de capacitación — layout Teaching Canon.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTrainingUnlockStage } from '../../../hooks/useMemberSpiritualPath';
import { useTrainingStore } from '../store/useTrainingStore';
import { isLessonUnlocked } from '../utils/unlockLogic';
import type { UnlockContext } from '../utils/unlockLogic';
import { scrollToTop } from '../utils/scrollToTop';
import {
  paths,
  tracksById,
  lessonsById,
  getLessonsForNode,
  getTrainingLessonCategoryLabel,
  TRAINING_NODE_ORDER,
  trainingLessonTitle,
} from '../data/trainingPaths';
import {
  MANUAL_LESSON_IDS,
  isManualTrainingLesson,
} from '../lessons/content/manualLessonContent';
import { LessonManualBased } from '../lessons/LessonManualBased';
import { LessonRestoration } from '../lessons/LessonRestoration';
import { LessonPlanOfSalvation } from '../lessons/LessonPlanOfSalvation';
import { LessonPriesthood } from '../lessons/LessonPriesthood';
import { LessonOrdinancesPreparation } from '../lessons/LessonOrdinancesPreparation';
import { LessonDeaconDuties } from '../lessons/LessonDeaconDuties';
import { LessonDeaconService } from '../lessons/LessonDeaconService';
import { LessonTeacherDuties } from '../lessons/LessonTeacherDuties';
import { LessonTeacherReverenceService } from '../lessons/LessonTeacherReverenceService';
import { LessonPriestDuties } from '../lessons/LessonPriestDuties';
import { LessonPriestPastoral } from '../lessons/LessonPriestPastoral';
import { LessonElderMinistration } from '../lessons/LessonElderMinistration';
import { LessonElderLeadership } from '../lessons/LessonElderLeadership';
import { LessonHighPriestKeysPresidency } from '../lessons/LessonHighPriestKeysPresidency';
import { LessonHighPriestShepherding } from '../lessons/LessonHighPriestShepherding';
import {
  TeachingCanonShell,
  TeachingCanonBackLink,
  TeachingCanonHeroHeader,
  TeachingCanonNotFound,
} from '../../../ui/teaching-canon';
import { useI18n } from '../../../context/I18nContext';
import './LessonPlaceholderScreen.css';

const LESSONS_WITH_HINT = [
  'core-1',
  'core-2',
  'core-3',
  'core-4',
  'deacon-1',
  'deacon-2',
  'teacher-1',
  'teacher-2',
  'priest-1',
  'priest-2',
  'elder-1',
  'elder-2',
  'high-priest-1',
  'high-priest-2',
  ...MANUAL_LESSON_IDS,
];

function getNextUnlockedLesson(
  nodeId: string,
  lessonId: string,
  ctx: UnlockContext
): { nodeId: string; lessonId: string } | null {
  const lessons = getLessonsForNode(nodeId);
  const currentIdx = lessons.findIndex((l) => l.id === lessonId);
  for (let i = currentIdx + 1; i < lessons.length; i++) {
    if (isLessonUnlocked(lessons[i].id, ctx)) {
      return { nodeId, lessonId: lessons[i].id };
    }
  }
  const nodeIdx = TRAINING_NODE_ORDER.indexOf(nodeId);
  for (let n = nodeIdx + 1; n < TRAINING_NODE_ORDER.length; n++) {
    const nid = TRAINING_NODE_ORDER[n];
    const nextLessons = getLessonsForNode(nid);
    for (const l of nextLessons) {
      if (isLessonUnlocked(l.id, ctx)) {
        return { nodeId: nid, lessonId: l.id };
      }
    }
  }
  return null;
}

export default function LessonPlaceholderScreen(): JSX.Element {
  const { t, locale } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const parts = location.pathname.replace(/^\/training\/?/, '').split('/').filter(Boolean);
  const nodeId = parts[0] || null;
  const lessonId = parts[1] || null;
  const stage = useTrainingUnlockStage();
  const completedLessons = useTrainingStore((s) => s.completedLessons);
  const markLessonCompleted = useTrainingStore((s) => s.markLessonCompleted);
  const setLastVisited = useTrainingStore((s) => s.setLastVisited);

  const ctx: UnlockContext = {
    stage,
    completedLessons,
    paths,
    tracksById,
    lessonsById,
  };

  useEffect(() => {
    if (nodeId && lessonId) {
      setLastVisited(nodeId, lessonId);
    }
  }, [nodeId, lessonId, setLastVisited]);

  useEffect(() => {
    if (lessonId && !LESSONS_WITH_HINT.includes(lessonId)) {
      setPracticeProgress(null);
    }
  }, [lessonId]);

  useEffect(() => {
    if (stage !== 'covenanted') {
      navigate('/home', { replace: true });
    }
  }, [stage, navigate]);

  useEffect(() => {
    if (!lessonId) return;
    scrollToTop('.unified-layout-content');
  }, [lessonId]);

  const [practiceProgress, setPracticeProgress] = useState<{ checked: number; total: number } | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const handlePracticeProgress = useCallback((checked: number, total: number) => {
    setPracticeProgress({ checked, total });
  }, []);

  const lesson = lessonId ? lessonsById[lessonId] : null;
  const nextLesson =
    nodeId && lessonId ? getNextUnlockedLesson(nodeId, lessonId, ctx) : null;

  if (stage !== 'covenanted') {
    return <div className="tr-lesson" />;
  }

  if (!nodeId || !lessonId || !lesson) {
    return (
      <TeachingCanonShell>
        <TeachingCanonBackLink to="/training">{t('app.training.lesson.backToTraining')}</TeachingCanonBackLink>
        <TeachingCanonNotFound
          title={t('app.training.lesson.notFoundTitle')}
          message={t('app.training.lesson.notFoundText')}
        />
      </TeachingCanonShell>
    );
  }

  const canCompleteByPractice =
    (practiceProgress?.total ?? 0) > 0 && practiceProgress?.checked === practiceProgress?.total;
  const isHintLesson = LESSONS_WITH_HINT.includes(lessonId ?? '');
  const isCompleteBlocked = isHintLesson && !canCompleteByPractice;
  const shouldGateNext = isCompleteBlocked;

  const primaryButtonLabel = isCompleting
    ? t('app.training.lesson.completing')
    : isHintLesson && canCompleteByPractice
      ? t('app.training.lesson.finishLesson')
      : t('app.training.lesson.markCompleted');

  const completeHintText = isCompleteBlocked
    ? practiceProgress
      ? practiceProgress.total - practiceProgress.checked === 1
        ? t('app.training.lesson.practiceRemainingOne')
        : t('app.training.lesson.practiceRemainingMany', {
            count: practiceProgress.total - practiceProgress.checked,
          })
      : t('app.training.lesson.practiceIncompleteGeneric')
    : null;

  const nextHintText =
    shouldGateNext && nextLesson
      ? practiceProgress
        ? practiceProgress.total - practiceProgress.checked === 1
          ? t('app.training.lesson.nextLessonGatedOne')
          : t('app.training.lesson.nextLessonGatedMany', {
              count: practiceProgress.total - practiceProgress.checked,
            })
        : t('app.training.lesson.practiceIncompleteGeneric')
      : null;

  const handleNextLesson = () => {
    if (nextLesson && !shouldGateNext) {
      navigate(`/training/${nextLesson.nodeId}/${nextLesson.lessonId}`);
    }
  };

  const handleMarkCompleted = () => {
    if (!lesson || isCompleting) return;
    setIsCompleting(true);
    markLessonCompleted(lesson.nodeId, lesson.id, 100);
    const updatedCompleted = useTrainingStore.getState().completedLessons;
    const updatedCtx: UnlockContext = { ...ctx, completedLessons: updatedCompleted };
    const nextAfterComplete = getNextUnlockedLesson(lesson.nodeId, lesson.id, updatedCtx);
    if (nextAfterComplete) {
      navigate(`/training/${nextAfterComplete.nodeId}/${nextAfterComplete.lessonId}`);
    } else {
      navigate('/training');
    }
  };

  const categoryLabel = getTrainingLessonCategoryLabel(lessonId, locale);
  const lessonTitleDisplay = trainingLessonTitle(lesson, locale);

  const lessonInner = isManualTrainingLesson(lessonId) ? (
    <LessonManualBased lessonId={lessonId} onPracticeProgress={handlePracticeProgress} />
  ) : lessonId === 'core-1' ? (
      <LessonRestoration onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'core-2' ? (
      <LessonPlanOfSalvation onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'core-3' ? (
      <LessonPriesthood onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'core-4' ? (
      <LessonOrdinancesPreparation onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'deacon-1' ? (
      <LessonDeaconDuties onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'deacon-2' ? (
      <LessonDeaconService onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'teacher-1' ? (
      <LessonTeacherDuties onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'teacher-2' ? (
      <LessonTeacherReverenceService onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'priest-1' ? (
      <LessonPriestDuties onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'priest-2' ? (
      <LessonPriestPastoral onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'elder-1' ? (
      <LessonElderMinistration onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'elder-2' ? (
      <LessonElderLeadership onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'high-priest-1' ? (
      <LessonHighPriestKeysPresidency onPracticeProgress={handlePracticeProgress} />
    ) : lessonId === 'high-priest-2' ? (
      <LessonHighPriestShepherding onPracticeProgress={handlePracticeProgress} />
    ) : (
      <>
        <TeachingCanonHeroHeader
          categoryLabel={categoryLabel}
          title={lessonTitleDisplay}
          subtitle={t('app.training.lesson.placeholderSubtitle')}
          heroNote={t('app.training.lesson.heroNote')}
        />
        <p className="tr-lesson__placeholder">
          {t('app.training.lesson.placeholderBody', { title: lessonTitleDisplay })}
        </p>
      </>
    );

  return (
    <TeachingCanonShell>
      <TeachingCanonBackLink to={`/training/${nodeId}`}>{t('app.training.lesson.backToNode')}</TeachingCanonBackLink>

      <div className="tr-lesson">
        {lessonInner}

        {isHintLesson && practiceProgress && practiceProgress.total > 0 && (
          <p className="tr-lesson__practice-hint" role="status" aria-live="polite">
            {practiceProgress.checked === practiceProgress.total ? (
              t('app.training.lesson.readyToFinish')
            ) : (
              t('app.training.lesson.practiceProgress', {
                done: practiceProgress.checked,
                total: practiceProgress.total,
              })
            )}
          </p>
        )}
        <div className="tr-lesson__actions">
          <button
            type="button"
            className="nm-guide-detail__btn nm-guide-detail__btn--primary"
            onClick={handleMarkCompleted}
            disabled={isCompleting || isCompleteBlocked}
            aria-disabled={isCompleting || isCompleteBlocked}
            aria-busy={isCompleting}
          >
            {primaryButtonLabel}
          </button>
          {completeHintText && (
            <p className="tr-lesson__complete-hint" role="status">
              {completeHintText}
            </p>
          )}
          {nextLesson && (
            <>
              <button
                type="button"
                className="nm-guide-detail__btn nm-guide-detail__btn--secondary"
                onClick={handleNextLesson}
                disabled={shouldGateNext}
                aria-disabled={shouldGateNext}
              >
                {t('app.training.lesson.nextLesson')}
              </button>
              {nextHintText && (
                <p className="tr-lesson__next-hint" role="status" aria-live="polite">
                  {nextHintText}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </TeachingCanonShell>
  );
}
