/**
 * Lógica de desbloqueo — sin llamamientos (eso vive en Líderes).
 *
 * - Fundamentos: siempre si el usuario es miembro (no investigador).
 * - Sacerdocio: tras completar fundamentos.
 * - Enseñar a la manera del Salvador: disponible al ser miembro (paralelo a fundamentos).
 * - Organizaciones auxiliares: tras completar fundamentos.
 * - Liderazgo en el barrio: tras completar fundamentos (obispado, consejo, obra de salvación).
 */

import type {
  TrainingPath,
  TrainingTrack,
  TrainingLesson,
  LessonStatus,
  CompletedLessonsMap,
} from '../types/training';
import { paths, tracksById, lessonsById } from '../data/trainingPaths';

const AARONIC_TRACK_IDS = [
  'aaronic-deacon',
  'aaronic-teacher',
  'aaronic-priest',
] as const;

const MELCHIZEDEK_TRACK_IDS = ['melchizedek-elder', 'melchizedek-high-priest'] as const;

const TSW_TRACK_IDS = ['tsw-part1', 'tsw-part2', 'tsw-part3'] as const;

const ORG_TRACK_IDS = [
  'org-elders-quorum',
  'org-relief-society',
  'org-aaronic',
  'org-young-women',
  'org-primary',
  'org-sunday-school',
] as const;

const WARD_LEADERSHIP_TRACK_IDS = ['lead-bishopric-council'] as const;

const CORE_LESSON_IDS = ['core-1', 'core-2', 'core-3', 'core-4'];

export interface UnlockContext {
  stage: 'seeking' | 'covenanted';
  completedLessons: CompletedLessonsMap;
  paths: TrainingPath[];
  tracksById: Record<string, TrainingTrack>;
  lessonsById: Record<string, TrainingLesson>;
}

function isCoreCompleted(ctx: UnlockContext): boolean {
  return CORE_LESSON_IDS.every((id) => ctx.completedLessons[id]?.percent >= 100);
}

function isAllAaronicCompleted(ctx: UnlockContext): boolean {
  const allAaronicLessonIds = AARONIC_TRACK_IDS.flatMap(
    (trackId) => tracksById[trackId]?.lessonIds ?? []
  );
  return allAaronicLessonIds.every((id) => ctx.completedLessons[id]?.percent >= 100);
}

export function isPathUnlocked(pathId: string, ctx: UnlockContext): boolean {
  if (ctx.stage !== 'covenanted') return false;
  if (pathId === 'core-foundations') return true;
  if (pathId === 'teaching-saviors-way') return true;
  if (
    pathId === 'priesthood' ||
    pathId === 'auxiliary-organizations' ||
    pathId === 'ward-leadership'
  ) {
    return isCoreCompleted(ctx);
  }
  return false;
}

export function isTrackUnlocked(trackId: string, ctx: UnlockContext): boolean {
  if (ctx.stage !== 'covenanted') return false;

  const track = ctx.tracksById[trackId];
  if (!track) return false;

  if ((TSW_TRACK_IDS as readonly string[]).includes(trackId)) {
    return true;
  }

  if ((ORG_TRACK_IDS as readonly string[]).includes(trackId)) {
    return isCoreCompleted(ctx);
  }

  if ((WARD_LEADERSHIP_TRACK_IDS as readonly string[]).includes(trackId)) {
    return isCoreCompleted(ctx);
  }

  if (AARONIC_TRACK_IDS.includes(trackId as (typeof AARONIC_TRACK_IDS)[number])) {
    return isCoreCompleted(ctx);
  }

  if (MELCHIZEDEK_TRACK_IDS.includes(trackId as (typeof MELCHIZEDEK_TRACK_IDS)[number])) {
    return isCoreCompleted(ctx) && isAllAaronicCompleted(ctx);
  }

  return false;
}

export function isLessonUnlocked(lessonId: string, ctx: UnlockContext): boolean {
  if (ctx.stage !== 'covenanted') return false;

  const lesson = ctx.lessonsById[lessonId];
  if (!lesson) return false;

  if (lesson.nodeId === 'core-foundations') return true;

  const track = ctx.tracksById[lesson.nodeId];
  if (track) return isTrackUnlocked(lesson.nodeId, ctx);

  return false;
}

export function getLessonStatus(lessonId: string, ctx: UnlockContext): LessonStatus {
  const completed = ctx.completedLessons[lessonId];
  if (completed?.percent >= 100) return 'completed';

  const unlocked = isLessonUnlocked(lessonId, ctx);
  return unlocked ? 'in_progress' : 'locked';
}
