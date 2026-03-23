/**
 * Training module types — hub de capacitación para miembros (no investigadores).
 * Alineado a Enseñar a la manera del Salvador y Manual General (estructura de currículo).
 */

export type TrainingPathCategory =
  | 'core'
  | 'priesthood'
  | 'teaching_saviors_way'
  | 'auxiliary_organizations';

export type PriesthoodOffice =
  | 'deacon'
  | 'teacher'
  | 'priest'
  | 'elder'
  | 'high_priest';

export interface TrainingPath {
  id: string;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  category: TrainingPathCategory;
  trackIds: string[];
}

export interface TrainingTrack {
  id: string;
  pathId: string;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  /** Solo pistas del path «sacerdocio». */
  priesthoodOffice?: PriesthoodOffice;
  lessonIds: string[];
}

export interface TrainingLesson {
  id: string;
  title: string;
  titleEn?: string;
  nodeId: string;
  order: number;
  estimatedMinutes?: number;
  tags?: string[];
}

export type LessonStatus = 'locked' | 'in_progress' | 'completed';

export interface UserProgressEntry {
  completedAt: string;
  percent: number;
}

export type CompletedLessonsMap = Record<string, UserProgressEntry>;
