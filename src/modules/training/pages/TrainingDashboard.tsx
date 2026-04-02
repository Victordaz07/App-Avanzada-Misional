/**
 * TrainingDashboard - Hub de capacitación personal (Fundamentos + Sacerdocio).
 * La zona de líderes está en perfil → «Líderes y maestros», no aquí.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa6';
import { useTrainingUnlockStage } from '../../../hooks/useMemberSpiritualPath';
import { useTrainingStore } from '../store/useTrainingStore';
import {
  paths,
  tracksById,
  lessonsById,
  getNodeById,
  getAggregatedPathProgress,
  trainingNodeTitle,
  trainingNodeDescription,
} from '../data/trainingPaths';
import { getRecommendedTrainingNodeIds } from '../data/callingTrainingRecommendations';
import { useUserRoleStore } from '../../../leaders/state/user/useUserRoleStore';
import { isPathUnlocked, isTrackUnlocked } from '../utils/unlockLogic';
import type { UnlockContext } from '../utils/unlockLogic';
import { TrainingCard } from '../components';
import { useI18n } from '../../../context/I18nContext';
import './TrainingDashboard.css';

const PRIESTHOOD_TRACK_ORDER = [
  'aaronic-deacon',
  'aaronic-teacher',
  'aaronic-priest',
  'melchizedek-elder',
  'melchizedek-high-priest',
] as const;

function getNextTrackAfter(trackId: string): string | null {
  const idx = PRIESTHOOD_TRACK_ORDER.findIndex((id) => id === trackId);
  if (idx < 0 || idx >= PRIESTHOOD_TRACK_ORDER.length - 1) return null;
  return PRIESTHOOD_TRACK_ORDER[idx + 1];
}

const TOAST_DURATION_MS = 4000;

export default function TrainingDashboard(): JSX.Element {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const stage = useTrainingUnlockStage();
  const completedLessons = useTrainingStore((s) => s.completedLessons);
  const getProgressForNode = useTrainingStore((s) => s.getProgressForNode);
  const getNextLessonToContinue = useTrainingStore((s) => s.getNextLessonToContinue);
  const lastCompletedEventId = useTrainingStore((s) => s.lastCompletedEventId);
  const lastAckedCompletedEventId = useTrainingStore((s) => s.lastAckedCompletedEventId);
  const lastCompletedNodeId = useTrainingStore((s) => s.lastCompletedNodeId);
  const ackLastCompletedEvent = useTrainingStore((s) => s.ackLastCompletedEvent);

  const leadershipRole = useUserRoleStore((s) => s.role);
  const recommendedNodeIds = useMemo(
    () => getRecommendedTrainingNodeIds(leadershipRole),
    [leadershipRole],
  );

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (
      stage === 'covenanted' &&
      lastCompletedEventId > lastAckedCompletedEventId &&
      lastCompletedNodeId
    ) {
      setShowToast(true);
      ackLastCompletedEvent(lastCompletedEventId);
    }
  }, [stage, lastCompletedEventId, lastAckedCompletedEventId, lastCompletedNodeId, ackLastCompletedEvent]);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), TOAST_DURATION_MS);
    return () => clearTimeout(t);
  }, [showToast]);

  const ctx: UnlockContext = {
    stage,
    completedLessons,
    paths,
    tracksById,
    lessonsById,
  };

  const tswPathMeta = paths.find((p) => p.id === 'teaching-saviors-way');
  const auxPathMeta = paths.find((p) => p.id === 'auxiliary-organizations');
  const wardLeadershipPathMeta = paths.find((p) => p.id === 'ward-leadership');

  if (stage !== 'covenanted') {
    navigate('/home', { replace: true });
    return <div className="tr-dashboard" />;
  }

  const next = getNextLessonToContinue(ctx);
  const coreProgress = getProgressForNode('core-foundations');
  const isCoreDone = coreProgress.total > 0 && coreProgress.completed === coreProgress.total;

  const isNodeDone = (nodeId: string) => {
    const p = getProgressForNode(nodeId);
    return p.total > 0 && p.completed === p.total;
  };

  const lastCompletedPriesthoodTrack = [...PRIESTHOOD_TRACK_ORDER]
    .reverse()
    .find((id) => isNodeDone(id));
  const nextTrackId = lastCompletedPriesthoodTrack
    ? getNextTrackAfter(lastCompletedPriesthoodTrack)
    : null;
  const lastTrack = lastCompletedPriesthoodTrack ? tracksById[lastCompletedPriesthoodTrack] : null;
  const nextTrack = nextTrackId ? tracksById[nextTrackId] : null;
  const isNextUnlocked = nextTrackId ? isTrackUnlocked(nextTrackId, ctx) : false;
  const isPriesthoodComplete = lastCompletedPriesthoodTrack === 'melchizedek-high-priest';

  const completedNodeTitle = lastCompletedNodeId
    ? (getNodeById(lastCompletedNodeId)?.title ?? (locale === 'es' ? 'Track completado' : 'Track completed'))
    : (locale === 'es' ? 'Track completado' : 'Track completed');

  const ui = locale === 'es'
    ? {
        toastTitle: 'Track completado ✓',
        toastAria: `Track completado. Completaste: ${completedNodeTitle}`,
        toastBodyPrefix: 'Completaste:',
        title: 'Capacitación',
        coreDoneTitle: 'Fundamentos Básicos completados ✓',
        coreDoneSubtitle: 'Ya tienes la base: Restauración, Plan, Sacerdocio y Ordenanzas.',
        coreBullets: [
          'Entendiste el "por qué" de la Restauración y el papel del Libro de Mormón.',
          'Ubicaste el Plan de Salvación y cómo la Expiación te sostiene.',
          'Aprendiste cómo prepararte con reverencia para convenios y ordenanzas.',
        ],
        startPriesthood: 'Iniciar Sacerdocio',
        coreSummary: 'Ver resumen de Fundamentos',
        readyToAdvance: 'Listo para avanzar',
        priesthoodCompleted: 'Sacerdocio completado ✓',
        completedPrefix: 'Completaste:',
        nextPrefix: 'Siguiente:',
        nextTrack: 'Siguiente track',
        unlockHintPrefix: 'Completa',
        unlockHintSuffix: 'al 100% para desbloquearlo.',
        continueWhereLeft: 'Continuar donde dejaste',
        continue: 'Continuar',
        startTraining: 'Comenzar tu capacitación',
        startCore: 'Comenzar Fundamentos Básicos',
        coreSection: 'Fundamentos Básicos',
        coreCardTitle: 'Fundamentos Básicos',
        coreCardDesc: 'Preparación esencial para el sacerdocio',
        priesthoodSection: 'Capacitación del Sacerdocio',
        previousTrack: 'el track anterior',
      }
    : {
        toastTitle: 'Track completed ✓',
        toastAria: `Track completed. You completed: ${completedNodeTitle}`,
        toastBodyPrefix: 'You completed:',
        title: 'Training',
        coreDoneTitle: 'Core Foundations completed ✓',
        coreDoneSubtitle: 'You now have the base: Restoration, Plan, Priesthood, and Ordinances.',
        coreBullets: [
          'You understood the "why" of the Restoration and the role of the Book of Mormon.',
          'You mapped the Plan of Salvation and how the Atonement sustains you.',
          'You learned how to prepare reverently for covenants and ordinances.',
        ],
        startPriesthood: 'Start Priesthood',
        coreSummary: 'View Core summary',
        readyToAdvance: 'Ready to move forward',
        completedPrefix: 'Completed:',
        nextPrefix: 'Next:',
        nextTrack: 'Next track',
        unlockHintPrefix: 'Complete',
        unlockHintSuffix: '100% to unlock it.',
        continueWhereLeft: 'Continue where you left off',
        continue: 'Continue',
        startTraining: 'Start your training',
        startCore: 'Start Core Foundations',
        coreSection: 'Core Foundations',
        coreCardTitle: 'Core Foundations',
        coreCardDesc: 'Essential preparation for priesthood growth',
        priesthoodSection: 'Priesthood Training',
        previousTrack: 'the previous track',
      };

  return (
    <div className="tr-dashboard">
      {showToast && (
        <div
          className="tr-dashboard__toast"
          role="status"
          aria-live="polite"
          aria-label={ui.toastAria}
        >
          <p className="tr-dashboard__toast-title">{ui.toastTitle}</p>
          <p className="tr-dashboard__toast-body">{ui.toastBodyPrefix} {completedNodeTitle}</p>
        </div>
      )}

      <header className="tr-dashboard__header">
        <h1 className="tr-dashboard__title">{ui.title}</h1>
        <p className="tr-dashboard__subtitle">{t('app.training.dashboard.subtitle')}</p>
      </header>

      {recommendedNodeIds.length > 0 && (
        <section className="tr-dashboard__section tr-dashboard__section--calling">
          <h2 className="tr-dashboard__section-title">
            {t('app.training.dashboard.callingSectionTitle')}
          </h2>
          <p className="tr-dashboard__calling-hint">{t('app.training.dashboard.callingSectionHint')}</p>
          <div className="tr-dashboard__cards">
            {recommendedNodeIds.map((nodeId) => {
              const node = getNodeById(nodeId);
              if (!node) return null;
              const pathMeta = paths.find((p) => p.id === nodeId);
              const isPathRoot = Boolean(pathMeta);
              const unlocked = isPathRoot
                ? isPathUnlocked(nodeId, ctx)
                : isTrackUnlocked(nodeId, ctx);
              const progress =
                pathMeta && pathMeta.trackIds.length > 0
                  ? getAggregatedPathProgress(nodeId, completedLessons)
                  : getProgressForNode(nodeId);
              return (
                <TrainingCard
                  key={nodeId}
                  nodeId={nodeId}
                  title={trainingNodeTitle(node, locale)}
                  description={trainingNodeDescription(node, locale)}
                  status={unlocked ? 'in_progress' : 'locked'}
                  progress={progress}
                  to={`/training/${nodeId}`}
                  badge={{
                    label: t('app.training.dashboard.callingBadge'),
                    variant: 'neutral',
                  }}
                />
              );
            })}
          </div>
        </section>
      )}

      {stage === 'covenanted' && isCoreDone && (
        <div className="tr-dashboard__core-done">
          <h2 className="tr-dashboard__core-done-title">{ui.coreDoneTitle}</h2>
          <p className="tr-dashboard__core-done-subtitle">
            {ui.coreDoneSubtitle}
          </p>
          <ul className="tr-dashboard__core-done-bullets">
            {ui.coreBullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
          <div className="tr-dashboard__core-done-actions">
            <Link to="/training/aaronic-deacon" className="tr-dashboard__core-done-btn">
              {ui.startPriesthood}
            </Link>
            <Link to="/training/teaching-saviors-way" className="tr-dashboard__core-done-btn">
              {t('app.training.dashboard.openTeachingManualPath')}
            </Link>
            <Link to="/training/core-foundations" className="tr-dashboard__core-done-link">
              {ui.coreSummary}
            </Link>
          </div>
        </div>
      )}

      {lastCompletedPriesthoodTrack && (
        <div className="tr-dashboard__next-track">
          <h2 className="tr-dashboard__next-track-title">{ui.readyToAdvance}</h2>
          {isPriesthoodComplete ? (
            <p className="tr-dashboard__next-track-body">
              {t('app.training.dashboard.priesthoodTracksComplete')}
            </p>
          ) : (
            <>
              <p className="tr-dashboard__next-track-body">
                {ui.completedPrefix} {lastTrack?.title ?? ''}
              </p>
              <p className="tr-dashboard__next-track-body">
                {ui.nextPrefix}{' '}
                {isNextUnlocked && nextTrackId ? (
                  <Link
                    to={`/training/${nextTrackId}`}
                    className="tr-dashboard__next-track-link"
                  >
                    {nextTrack?.title ?? ''}
                  </Link>
                ) : (
                  nextTrack?.title ?? ''
                )}
              </p>
              {isNextUnlocked && nextTrackId ? (
                <Link
                  to={`/training/${nextTrackId}`}
                  className="tr-dashboard__next-track-btn"
                >
                  {ui.nextTrack}
                </Link>
              ) : (
                <p className="tr-dashboard__next-track-locked">
                  <FaLock aria-hidden />
                  {ui.unlockHintPrefix} {lastTrack?.title ?? ui.previousTrack} {ui.unlockHintSuffix}
                </p>
              )}
            </>
          )}
        </div>
      )}

      <div className="tr-dashboard__cta">
        {next ? (
          <>
            <p className="tr-dashboard__cta-label">{ui.continueWhereLeft}</p>
            <Link
              to={`/training/${next.nodeId}/${next.lessonId}`}
              className="tr-dashboard__cta-card"
            >
              <span className="tr-dashboard__cta-text">{ui.continue}</span>
              <span className="tr-dashboard__cta-arrow">→</span>
            </Link>
          </>
        ) : (
          <>
            <p className="tr-dashboard__cta-label">{ui.startTraining}</p>
            <Link to="/training/core-foundations" className="tr-dashboard__cta-card">
              <span className="tr-dashboard__cta-text">{ui.startCore}</span>
              <span className="tr-dashboard__cta-arrow">→</span>
            </Link>
          </>
        )}
      </div>

      <section className="tr-dashboard__section">
        <h2 className="tr-dashboard__section-title">{ui.coreSection}</h2>
        <div className="tr-dashboard__cards">
          <TrainingCard
            nodeId="core-foundations"
            title={ui.coreCardTitle}
            description={ui.coreCardDesc}
            status={isPathUnlocked('core-foundations', ctx) ? 'in_progress' : 'locked'}
            progress={getProgressForNode('core-foundations')}
            to="/training/core-foundations"
          />
        </div>
      </section>

      <section className="tr-dashboard__section">
        <h2 className="tr-dashboard__section-title">
          {t('app.training.dashboard.sectionTeachingSaviorsWay')}
        </h2>
        <div className="tr-dashboard__cards">
          {tswPathMeta ? (
            <TrainingCard
              nodeId={tswPathMeta.id}
              title={trainingNodeTitle(tswPathMeta, locale)}
              description={trainingNodeDescription(tswPathMeta, locale)}
              status={isPathUnlocked(tswPathMeta.id, ctx) ? 'in_progress' : 'locked'}
              progress={getAggregatedPathProgress(tswPathMeta.id, completedLessons)}
              to={`/training/${tswPathMeta.id}`}
            />
          ) : null}
        </div>
      </section>

      <section className="tr-dashboard__section">
        <h2 className="tr-dashboard__section-title">{ui.priesthoodSection}</h2>
        <div className="tr-dashboard__cards">
          {paths
            .find((p) => p.id === 'priesthood')
            ?.trackIds.map((trackId) => {
              const track = tracksById[trackId];
              if (!track) return null;
              const unlocked = isTrackUnlocked(trackId, ctx);
              const trackProgress = getProgressForNode(trackId);
              return (
                <TrainingCard
                  key={trackId}
                  nodeId={trackId}
                  title={trainingNodeTitle(track, locale)}
                  description={trainingNodeDescription(track, locale)}
                  status={unlocked ? 'in_progress' : 'locked'}
                  progress={trackProgress}
                  to={`/training/${trackId}`}
                />
              );
            })}
        </div>
      </section>

      <section className="tr-dashboard__section">
        <h2 className="tr-dashboard__section-title">
          {t('app.training.dashboard.sectionAuxiliaryOrgs')}
        </h2>
        <div className="tr-dashboard__cards">
          {auxPathMeta ? (
            <TrainingCard
              nodeId={auxPathMeta.id}
              title={trainingNodeTitle(auxPathMeta, locale)}
              description={trainingNodeDescription(auxPathMeta, locale)}
              status={isPathUnlocked(auxPathMeta.id, ctx) ? 'in_progress' : 'locked'}
              progress={getAggregatedPathProgress(auxPathMeta.id, completedLessons)}
              to={`/training/${auxPathMeta.id}`}
            />
          ) : null}
        </div>
      </section>

      <section className="tr-dashboard__section">
        <h2 className="tr-dashboard__section-title">
          {t('app.training.dashboard.sectionWardLeadership')}
        </h2>
        <div className="tr-dashboard__cards">
          {wardLeadershipPathMeta ? (
            <TrainingCard
              nodeId={wardLeadershipPathMeta.id}
              title={trainingNodeTitle(wardLeadershipPathMeta, locale)}
              description={trainingNodeDescription(wardLeadershipPathMeta, locale)}
              status={isPathUnlocked(wardLeadershipPathMeta.id, ctx) ? 'in_progress' : 'locked'}
              progress={getAggregatedPathProgress(wardLeadershipPathMeta.id, completedLessons)}
              to={`/training/${wardLeadershipPathMeta.id}`}
            />
          ) : null}
        </div>
      </section>
    </div>
  );
}
