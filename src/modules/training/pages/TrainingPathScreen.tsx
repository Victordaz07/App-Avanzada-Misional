/**
 * TrainingPathScreen - Lista lecciones de una pista, o sub-pistas de un path con trackIds.
 */

import React, { useEffect, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLock } from 'react-icons/fa6';
import { useTrainingUnlockStage } from '../../../hooks/useMemberSpiritualPath';
import { useTrainingStore } from '../store/useTrainingStore';
import {
  getNodeById,
  getLessonsForNode,
  getPathOrderedLessons,
  pathHasChildTracks,
  getAggregatedPathProgress,
  trainingNodeTitle,
  trainingNodeDescription,
  trainingLessonTitle,
  paths,
  tracksById,
  lessonsById,
} from '../data/trainingPaths';
import { getLessonStatus, isLessonUnlocked, isTrackUnlocked } from '../utils/unlockLogic';
import type { UnlockContext } from '../utils/unlockLogic';
import { LessonListItem, TrainingCard } from '../components';
import { useI18n } from '../../../context/I18nContext';
import './TrainingPathScreen.css';

const PRIESTHOOD_TRACK_ORDER = [
  'aaronic-deacon',
  'aaronic-teacher',
  'aaronic-priest',
  'melchizedek-elder',
  'melchizedek-high-priest',
] as const;

const SUMMARY_COPY_ES: Record<string, { bullets: string[] }> = {
  'core-foundations': {
    bullets: [
      'Entendiste el "por qué" de la Restauración y el papel del Libro de Mormón.',
      'Ubicaste el Plan de Salvación y cómo la Expiación te sostiene.',
      'Aprendiste cómo prepararte con reverencia para convenios y ordenanzas.',
    ],
  },
  'teaching-saviors-way': {
    bullets: [
      'Tres partes del manual oficial: Cristo al centro, principios de enseñanza, ayudas prácticas.',
      'Cada lección enlaza al manual y al Manual General (enseñar el Evangelio) sin sustituirlos.',
      'Aplica preguntas e invitaciones en tu próxima clase o charla.',
    ],
  },
  'auxiliary-organizations': {
    bullets: [
      'Una pista por organización de barrio alineada al Manual General (caps. 8–13).',
      'Propósito, enseñanza en la Iglesia y vínculo con el hogar.',
      'Completa las prácticas de cada lección a tu ritmo.',
    ],
  },
  'priesthood': {
    bullets: [
      'Avanza paso a paso por cada oficio del sacerdocio.',
      'Completa las prácticas y reflexiones de cada lección.',
      'Reflexiona y aplica esta semana lo que aprendas.',
    ],
  },
  'aaronic-deacon': {
    bullets: [
      'Servir con humildad y orden.',
      'Prepararte con reverencia (especialmente domingo).',
      'Ser confiable en tareas pequeñas.',
    ],
  },
  'aaronic-teacher': {
    bullets: [
      'Fortalecer y velar por los miembros.',
      'Corregir con amor y respeto.',
      'Preparar un plan simple de cuidado.',
    ],
  },
  'aaronic-priest': {
    bullets: [
      'Prepararte para ordenanzas (Santa Cena, bautismo).',
      'Ser digno y puntual.',
      'Acompañar y edificar a otros.',
    ],
  },
  'melchizedek-elder': {
    bullets: [
      'Ministración real (no "checklist").',
      'Bendecir con fe y dignidad.',
      'Coordinar con líderes, no improvisar.',
    ],
  },
  'melchizedek-high-priest': {
    bullets: [
      'Llaves vs autoridad vs poder.',
      'Presidir sirviendo, no controlando.',
      'Pastorear: unidad, mansedumbre y motivos puros.',
    ],
  },
  'tsw-part1': {
    bullets: [
      'Cristo como norte de toda enseñanza.',
      'Conecta el tema visible con fe, arrepentimiento y don del Espíritu.',
    ],
  },
  'tsw-part2': {
    bullets: [
      'Cuatro principios: amar a quien enseñas, invitar al Espíritu, enseñar doctrina, fomentar aprendizaje diligente.',
    ],
  },
  'tsw-part3': {
    bullets: [
      'Planificar con intención, autoevaluación honesta y apoyo entre maestros y líderes.',
    ],
  },
  'org-elders-quorum': {
    bullets: [
      'Fortalecer la fe de los élderes y su servicio en el hogar y el barrio.',
    ],
  },
  'org-relief-society': {
    bullets: [
      'Propósito de la Sociedad de Socorro y enseñanza que edifica a las hermanas.',
    ],
  },
  'org-aaronic': {
    bullets: [
      'Cuórums Aarónicos como escuela de servicio y preparación para la vida.',
    ],
  },
  'org-young-women': {
    bullets: [
      'Acompañar a las jóvenes con amor, identidad en Cristo y metas de fe.',
    ],
  },
  'org-primary': {
    bullets: [
      'Enseñanza sencilla y segura para niños, alineada al hogar.',
    ],
  },
  'org-sunday-school': {
    bullets: [
      'Escuela Dominical como apoyo al estudio personal y familiar de las Escrituras.',
    ],
  },
  'ward-leadership': {
    bullets: [
      'Liderazgo centrado en Cristo: llaves, mayordomía y cuidado de personas — no protagonismo ni burocracia.',
      'Consejo de barrio y coordinación de la obra de salvación y exaltación según el Manual General.',
      'Útil para obispados, consejo de barrio, presidencias y líderes que emergen.',
    ],
  },
  'lead-bishopric-council': {
    bullets: [
      'Deliberar con revelación; ministrar y fortalecer a miembros nuevos o que regresan.',
      'Coordinar con cuórum de élderes y Sociedad de Socorro en unidad.',
    ],
  },
};

const SUMMARY_COPY_EN: Record<string, { bullets: string[] }> = {
  'core-foundations': {
    bullets: [
      'You grasped the “why” of the Restoration and the Book of Mormon’s role.',
      'You mapped the Plan of Salvation and how the Atonement sustains you.',
      'You learned to prepare reverently for covenants and ordinances.',
    ],
  },
  'teaching-saviors-way': {
    bullets: [
      'Three parts of the official manual: Christ at the center, teaching principles, practical helps.',
      'Each lesson links to the manual and General Handbook (teaching the gospel) without replacing them.',
      'Apply questions and invitations in your next class or talk.',
    ],
  },
  'auxiliary-organizations': {
    bullets: [
      'One track per ward organization aligned with the General Handbook (secs. 8–13).',
      'Purpose, teaching at church, and connection with home.',
      'Complete each lesson’s practices at your own pace.',
    ],
  },
  'priesthood': {
    bullets: [
      'Move step by step through each priesthood office.',
      'Complete the practices and reflections in each lesson.',
      'Reflect and apply what you learn this week.',
    ],
  },
  'aaronic-deacon': {
    bullets: [
      'Serve with humility and order.',
      'Prepare reverently (especially on Sunday).',
      'Be dependable in small tasks.',
    ],
  },
  'aaronic-teacher': {
    bullets: [
      'Strengthen and watch over members.',
      'Correct with love and respect.',
      'Prepare a simple care plan.',
    ],
  },
  'aaronic-priest': {
    bullets: [
      'Prepare for ordinances (sacrament, baptism).',
      'Be worthy and punctual.',
      'Accompany and build up others.',
    ],
  },
  'melchizedek-elder': {
    bullets: [
      'Real ministering (not a checklist).',
      'Bless with faith and dignity.',
      'Coordinate with leaders; don’t improvise alone.',
    ],
  },
  'melchizedek-high-priest': {
    bullets: [
      'Keys vs authority vs power.',
      'Preside by serving, not controlling.',
      'Shepherd: unity, meekness, pure motives.',
    ],
  },
  'tsw-part1': {
    bullets: [
      'Christ as the aim of all teaching.',
      'Connect the visible topic with faith, repentance, and the gift of the Holy Ghost.',
    ],
  },
  'tsw-part2': {
    bullets: [
      'Four principles: love those you teach, invite the Spirit, teach doctrine, nurture diligent learning.',
    ],
  },
  'tsw-part3': {
    bullets: [
      'Plan with intent, honest self-assessment, and support among teachers and leaders.',
    ],
  },
  'org-elders-quorum': {
    bullets: [
      'Build elders’ faith and service in the home and ward.',
    ],
  },
  'org-relief-society': {
    bullets: [
      'Relief Society purpose and teaching that strengthens sisters.',
    ],
  },
  'org-aaronic': {
    bullets: [
      'Aaronic quorums as a school of service and preparation for life.',
    ],
  },
  'org-young-women': {
    bullets: [
      'Accompany young women with love, identity in Christ, and faith goals.',
    ],
  },
  'org-primary': {
    bullets: [
      'Simple, safe teaching for children, aligned with the home.',
    ],
  },
  'org-sunday-school': {
    bullets: [
      'Sunday School as support for personal and family scripture study.',
    ],
  },
  'ward-leadership': {
    bullets: [
      'Christ-centered leadership: keys, stewardship, and care for people—not ego or bureaucracy.',
      'Ward council and coordination of the work of salvation and exaltation per the General Handbook.',
      'Useful for bishoprics, ward council, organization presidencies, and emerging leaders.',
    ],
  },
  'lead-bishopric-council': {
    bullets: [
      'Counsel together by revelation; minister to and strengthen new and returning members.',
      'Coordinate in unity with the elders quorum and Relief Society.',
    ],
  },
};

const DEFAULT_BULLETS_ES = [
  'Avanza paso a paso.',
  'Completa las prácticas.',
  'Reflexiona y aplica esta semana.',
];

const DEFAULT_BULLETS_EN = [
  'Move step by step.',
  'Complete the practices.',
  'Reflect and apply this week.',
];

export default function TrainingPathScreen(): JSX.Element {
  const { locale, t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const nodeId = location.pathname.replace(/^\/training\/?/, '').split('/')[0] || null;
  const stage = useTrainingUnlockStage();
  const completedLessons = useTrainingStore((s) => s.completedLessons);
  const getProgressForNode = useTrainingStore((s) => s.getProgressForNode);

  useEffect(() => {
    if (stage !== 'covenanted') {
      navigate('/home', { replace: true });
    }
  }, [stage, navigate]);

  const ctx: UnlockContext = {
    stage,
    completedLessons,
    paths,
    tracksById,
    lessonsById,
  };

  const node = nodeId ? getNodeById(nodeId) : null;
  const pathAsPath = node && pathHasChildTracks(node) ? node : null;
  const hasTrackChildren = Boolean(pathAsPath);

  const orderedLessons = useMemo(() => {
    if (!nodeId) return [];
    if (hasTrackChildren) {
      return getPathOrderedLessons(nodeId);
    }
    return getLessonsForNode(nodeId);
  }, [nodeId, hasTrackChildren]);

  const lessons = nodeId ? getLessonsForNode(nodeId) : [];

  const ui = locale.startsWith('en')
    ? {
        back: 'Back to Training',
        routeNotFound: 'Route not found',
        summaryTitle: 'Track summary',
        trackCompleted: 'Track completed ✓',
        missingLessons: 'You have',
        continue: 'Continue',
        reviewLessons: 'Review lessons',
        nextRecommended: 'Next recommended',
        unlockPrevious: 'Unlocks after completing the previous track',
        subtracksHeading: 'Tracks in this path',
      }
    : {
        back: 'Volver a Capacitación',
        routeNotFound: 'Ruta no encontrada',
        summaryTitle: 'Resumen del track',
        trackCompleted: 'Track completado ✓',
        missingLessons: 'Te faltan',
        continue: 'Continuar',
        reviewLessons: 'Revisar lecciones',
        nextRecommended: 'Siguiente recomendado',
        unlockPrevious: 'Se desbloquea al completar el track anterior',
        subtracksHeading: 'Pistas en esta ruta',
      };

  if (stage !== 'covenanted') {
    return <div className="tr-path" />;
  }

  if (!node || !nodeId) {
    return (
      <div className="tr-path">
        <Link to="/training" className="tr-path__back">
          <FaArrowLeft /> {ui.back}
        </Link>
        <div className="tr-path__not-found">
          <p>{ui.routeNotFound}</p>
        </div>
      </div>
    );
  }

  const title = trainingNodeTitle(node, locale);
  const description = trainingNodeDescription(node, locale);

  const summaryTable = locale.startsWith('en') ? SUMMARY_COPY_EN : SUMMARY_COPY_ES;
  const defaultBullets = locale.startsWith('en') ? DEFAULT_BULLETS_EN : DEFAULT_BULLETS_ES;
  const copy = summaryTable[nodeId] ?? { bullets: defaultBullets };
  const bullets = copy.bullets;

  const progress = pathAsPath
    ? getAggregatedPathProgress(nodeId, completedLessons)
    : getProgressForNode(nodeId);

  const isComplete = progress.total > 0 && progress.completed === progress.total;
  const remaining = progress.total - progress.completed;

  const nextLesson =
    orderedLessons.find(
      (l) => isLessonUnlocked(l.id, ctx) && (completedLessons[l.id]?.percent ?? 0) < 100,
    ) ?? null;

  const firstLesson = orderedLessons[0] ?? null;

  const trackIdx = PRIESTHOOD_TRACK_ORDER.indexOf(nodeId as (typeof PRIESTHOOD_TRACK_ORDER)[number]);
  const nextTrackId =
    trackIdx >= 0 && trackIdx < PRIESTHOOD_TRACK_ORDER.length - 1
      ? PRIESTHOOD_TRACK_ORDER[trackIdx + 1]
      : null;
  const nextTrack = nextTrackId ? tracksById[nextTrackId] : null;
  const nextTrackUnlocked = nextTrackId ? isTrackUnlocked(nextTrackId, ctx) : false;
  const showNextPriesthoodTrack =
    PRIESTHOOD_TRACK_ORDER.includes(nodeId as (typeof PRIESTHOOD_TRACK_ORDER)[number]);

  const showSummary = stage === 'covenanted' && progress.total > 0;

  const lessonWord =
    locale.startsWith('en') ? (remaining !== 1 ? 'lessons' : 'lesson') : remaining !== 1 ? 'lecciones' : 'lección';

  return (
    <div className="tr-path">
      <Link to="/training" className="tr-path__back">
        <FaArrowLeft /> {ui.back}
      </Link>

      <header className="tr-path__header">
        <h1 className="tr-path__title">{title}</h1>
        {description ? <p className="tr-path__subtitle">{description}</p> : null}
      </header>

      {showSummary && (
        <div className="tr-path__summary">
          <h2 className="tr-path__summary-title">{ui.summaryTitle}</h2>
          <div className="tr-path__summary-progress">
            <span className="tr-path__summary-count">
              {progress.completed}/{progress.total}
            </span>
            <span className="tr-path__summary-percent">({progress.percent}%)</span>
          </div>
          <p className="tr-path__summary-status">
            {isComplete
              ? ui.trackCompleted
              : `${ui.missingLessons} ${remaining} ${lessonWord}`}
          </p>
          <ul className="tr-path__summary-bullets">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="tr-path__summary-actions">
            {nextLesson ? (
              <Link
                to={`/training/${nextLesson.nodeId}/${nextLesson.id}`}
                className="tr-path__summary-btn"
              >
                {ui.continue}
              </Link>
            ) : firstLesson ? (
              <Link
                to={`/training/${firstLesson.nodeId}/${firstLesson.id}`}
                className="tr-path__summary-btn tr-path__summary-btn--secondary"
              >
                {ui.reviewLessons}
              </Link>
            ) : null}
          </div>
          {isComplete && showNextPriesthoodTrack && nextTrack && (
            <div className="tr-path__summary-next">
              <p className="tr-path__summary-next-label">{ui.nextRecommended}</p>
              {nextTrackUnlocked ? (
                <Link to={`/training/${nextTrackId}`} className="tr-path__summary-next-link">
                  {trainingNodeTitle(nextTrack, locale)} →
                </Link>
              ) : (
                <span className="tr-path__summary-next-locked">
                  <FaLock aria-hidden /> {trainingNodeTitle(nextTrack, locale)} — {ui.unlockPrevious}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {pathAsPath ? (
        <>
          <h2 className="tr-path__subtracks-heading">{ui.subtracksHeading}</h2>
          <div className="tr-path__track-cards">
            {pathAsPath.trackIds.map((trackId) => {
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
        </>
      ) : (
        <div className="tr-path__lessons">
          {lessons.map((lesson) => (
            <LessonListItem
              key={lesson.id}
              lessonId={lesson.id}
              title={trainingLessonTitle(lesson, locale)}
              status={getLessonStatus(lesson.id, ctx)}
              to={`/training/${lesson.nodeId}/${lesson.id}`}
            />
          ))}
        </div>
      )}

      {/* Reservado: mensaje si una pista queda sin lecciones */}
      {!pathAsPath && lessons.length === 0 ? (
        <p className="tr-path__not-found">{t('app.training.path.emptyTrack')}</p>
      ) : null}
    </div>
  );
}
