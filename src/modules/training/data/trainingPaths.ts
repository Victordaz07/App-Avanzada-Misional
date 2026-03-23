/**
 * Rutas de capacitación — currículo alineado a:
 * - Enseñar a la manera del Salvador (2022)
 * - Manual General (caps. 3, 8–13, 17)
 *
 * IDs de lección estables para progreso persistido en localStorage.
 */

import type {
  TrainingPath,
  TrainingTrack,
  TrainingLesson,
  CompletedLessonsMap,
} from '../types/training';

export type TrainingNode = TrainingPath | TrainingTrack;

// ═══════════════════════════════════════════════════════════════
// PATHS
// ═══════════════════════════════════════════════════════════════

export const paths: TrainingPath[] = [
  {
    id: 'core-foundations',
    title: 'Fundamentos Básicos',
    titleEn: 'Core Foundations',
    description: 'Restauración, Plan de Salvación, Sacerdocio y ordenanzas (base doctrinal).',
    descriptionEn: 'Restoration, Plan of Salvation, priesthood, and ordinances (doctrinal base).',
    category: 'core',
    trackIds: [],
  },
  {
    id: 'teaching-saviors-way',
    title: 'Enseñar a la manera del Salvador',
    titleEn: 'Teaching in the Savior’s Way',
    description:
      'Principios y prácticas del manual 2022, en armonía con el Manual General (cap. 17 — Enseñar el Evangelio).',
    descriptionEn:
      'Principles and practices from the 2022 manual, aligned with the General Handbook (section 17 — Teaching the Gospel).',
    category: 'teaching_saviors_way',
    trackIds: ['tsw-part1', 'tsw-part2', 'tsw-part3'],
  },
  {
    id: 'priesthood',
    title: 'Capacitación del Sacerdocio',
    titleEn: 'Priesthood Training',
    description:
      'Una pista por oficio: Aarónico y Melquisedec (Manual General, caps. 3 y 10; cuórum de élderes cap. 8).',
    descriptionEn:
      'One track per office: Aaronic and Melchizedek (General Handbook, secs. 3 and 10; elders quorum sec. 8).',
    category: 'priesthood',
    trackIds: [
      'aaronic-deacon',
      'aaronic-teacher',
      'aaronic-priest',
      'melchizedek-elder',
      'melchizedek-high-priest',
    ],
  },
  {
    id: 'auxiliary-organizations',
    title: 'Organizaciones auxiliares',
    titleEn: 'Auxiliary organizations',
    description:
      'Propósito y enseñanza en el hogar y en la Iglesia (Manual General, caps. 8–13).',
    descriptionEn: 'Purpose and teaching at home and at church (General Handbook, secs. 8–13).',
    category: 'auxiliary_organizations',
    trackIds: [
      'org-elders-quorum',
      'org-relief-society',
      'org-aaronic',
      'org-young-women',
      'org-primary',
      'org-sunday-school',
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// TRACKS
// ═══════════════════════════════════════════════════════════════

export const tracksById: Record<string, TrainingTrack> = {
  'tsw-part1': {
    id: 'tsw-part1',
    pathId: 'teaching-saviors-way',
    title: 'Parte 1: Centrarse en Jesucristo',
    titleEn: 'Part 1: Focus on Jesus Christ',
    description: 'Manual 2022, parte 1.',
    descriptionEn: '2022 manual, part 1.',
    lessonIds: ['tsw-1-1', 'tsw-1-2'],
  },
  'tsw-part2': {
    id: 'tsw-part2',
    pathId: 'teaching-saviors-way',
    title: 'Parte 2: Principios de la enseñanza',
    titleEn: 'Part 2: Principles of Christlike teaching',
    description: 'Amar, Espíritu, doctrina, aprendizaje diligente (Manual General 17.1).',
    descriptionEn: 'Love, Spirit, doctrine, diligent learning (Handbook 17.1).',
    lessonIds: ['tsw-2-1', 'tsw-2-2', 'tsw-2-3', 'tsw-2-4'],
  },
  'tsw-part3': {
    id: 'tsw-part3',
    pathId: 'teaching-saviors-way',
    title: 'Parte 3: Ayudas prácticas',
    titleEn: 'Part 3: Practical helps',
    description: 'Situaciones, planificación, autoevaluación, consejo de maestros, líderes.',
    descriptionEn: 'Settings, planning, self-assessment, teacher council, leader support.',
    lessonIds: ['tsw-3-1', 'tsw-3-2', 'tsw-3-3', 'tsw-3-4', 'tsw-3-5'],
  },
  'aaronic-deacon': {
    id: 'aaronic-deacon',
    pathId: 'priesthood',
    title: 'Diácono',
    titleEn: 'Deacon',
    description: 'Sacerdocio Aarónico — Manual General, cap. 10.',
    descriptionEn: 'Aaronic Priesthood — General Handbook, section 10.',
    priesthoodOffice: 'deacon',
    lessonIds: ['deacon-1', 'deacon-2'],
  },
  'aaronic-teacher': {
    id: 'aaronic-teacher',
    pathId: 'priesthood',
    title: 'Maestro',
    titleEn: 'Teacher (Aaronic)',
    description: 'Sacerdocio Aarónico — Manual General, cap. 10.',
    descriptionEn: 'Aaronic Priesthood — General Handbook, section 10.',
    priesthoodOffice: 'teacher',
    lessonIds: ['teacher-1', 'teacher-2'],
  },
  'aaronic-priest': {
    id: 'aaronic-priest',
    pathId: 'priesthood',
    title: 'Presbítero',
    titleEn: 'Priest',
    description: 'Sacerdocio Aarónico — Manual General, cap. 10.',
    descriptionEn: 'Aaronic Priesthood — General Handbook, section 10.',
    priesthoodOffice: 'priest',
    lessonIds: ['priest-1', 'priest-2'],
  },
  'melchizedek-elder': {
    id: 'melchizedek-elder',
    pathId: 'priesthood',
    title: 'Élder',
    titleEn: 'Elder',
    description: 'Sacerdocio de Melquisedec — cuórum de élderes (Manual General, cap. 8).',
    descriptionEn: 'Melchizedek Priesthood — elders quorum (General Handbook, section 8).',
    priesthoodOffice: 'elder',
    lessonIds: ['elder-1', 'elder-2'],
  },
  'melchizedek-high-priest': {
    id: 'melchizedek-high-priest',
    pathId: 'priesthood',
    title: 'Sumo sacerdote',
    titleEn: 'High Priest',
    description: 'Sacerdocio de Melquisedec — presidencias y consejos (Manual General, caps. 3–4, 7).',
    descriptionEn: 'Melchizedek Priesthood — presidencies and councils (Handbook, secs. 3–4, 7).',
    priesthoodOffice: 'high_priest',
    lessonIds: ['high-priest-1', 'high-priest-2'],
  },
  'org-elders-quorum': {
    id: 'org-elders-quorum',
    pathId: 'auxiliary-organizations',
    title: 'Cuórum de élderes',
    titleEn: 'Elders quorum',
    description: 'Manual General, cap. 8.',
    descriptionEn: 'General Handbook, section 8.',
    lessonIds: ['org-eq-1'],
  },
  'org-relief-society': {
    id: 'org-relief-society',
    pathId: 'auxiliary-organizations',
    title: 'Sociedad de Socorro',
    titleEn: 'Relief Society',
    description: 'Manual General, cap. 9.',
    descriptionEn: 'General Handbook, section 9.',
    lessonIds: ['org-rs-1'],
  },
  'org-aaronic': {
    id: 'org-aaronic',
    pathId: 'auxiliary-organizations',
    title: 'Cuórums del Sacerdocio Aarónico',
    titleEn: 'Aaronic Priesthood quorums',
    description: 'Manual General, cap. 10.',
    descriptionEn: 'General Handbook, section 10.',
    lessonIds: ['org-aa-1'],
  },
  'org-young-women': {
    id: 'org-young-women',
    pathId: 'auxiliary-organizations',
    title: 'Mujeres Jóvenes',
    titleEn: 'Young Women',
    description: 'Manual General, cap. 11.',
    descriptionEn: 'General Handbook, section 11.',
    lessonIds: ['org-yw-1'],
  },
  'org-primary': {
    id: 'org-primary',
    pathId: 'auxiliary-organizations',
    title: 'Primaria',
    titleEn: 'Primary',
    description: 'Manual General, cap. 12.',
    descriptionEn: 'General Handbook, section 12.',
    lessonIds: ['org-pr-1'],
  },
  'org-sunday-school': {
    id: 'org-sunday-school',
    pathId: 'auxiliary-organizations',
    title: 'Escuela Dominical',
    titleEn: 'Sunday School',
    description: 'Manual General, cap. 13.',
    descriptionEn: 'General Handbook, section 13.',
    lessonIds: ['org-ss-1'],
  },
};

// ═══════════════════════════════════════════════════════════════
// LESSONS
// ═══════════════════════════════════════════════════════════════

const coreLessons: TrainingLesson[] = [
  {
    id: 'core-1',
    title: 'La Restauración del Evangelio',
    titleEn: 'The Restoration of the Gospel',
    nodeId: 'core-foundations',
    order: 1,
    estimatedMinutes: 15,
    tags: ['restoration'],
  },
  {
    id: 'core-2',
    title: 'El Plan de Salvación',
    titleEn: 'The Plan of Salvation',
    nodeId: 'core-foundations',
    order: 2,
    estimatedMinutes: 15,
    tags: ['plan'],
  },
  {
    id: 'core-3',
    title: 'El Sacerdocio',
    titleEn: 'The Priesthood',
    nodeId: 'core-foundations',
    order: 3,
    estimatedMinutes: 12,
    tags: ['priesthood'],
  },
  {
    id: 'core-4',
    title: 'Preparación para las Ordenanzas',
    titleEn: 'Preparing for Ordinances',
    nodeId: 'core-foundations',
    order: 4,
    estimatedMinutes: 10,
    tags: ['ordinances'],
  },
];

const tswLessons: TrainingLesson[] = [
  {
    id: 'tsw-1-1',
    title: 'Enseñar sobre Cristo en todo lo que enseñas',
    titleEn: 'Teach about Jesus Christ in everything you teach',
    nodeId: 'tsw-part1',
    order: 1,
    estimatedMinutes: 12,
    tags: ['tsw', 'christ'],
  },
  {
    id: 'tsw-1-2',
    title: 'Ayudar a los alumnos a acercarse a Cristo',
    titleEn: 'Help learners come unto Christ',
    nodeId: 'tsw-part1',
    order: 2,
    estimatedMinutes: 12,
    tags: ['tsw', 'christ'],
  },
  {
    id: 'tsw-2-1',
    title: 'Amar a quienes enseñas',
    titleEn: 'Love those you teach',
    nodeId: 'tsw-part2',
    order: 1,
    estimatedMinutes: 10,
    tags: ['tsw', 'principle'],
  },
  {
    id: 'tsw-2-2',
    title: 'Enseñar por el Espíritu',
    titleEn: 'Teach by the Spirit',
    nodeId: 'tsw-part2',
    order: 2,
    estimatedMinutes: 10,
    tags: ['tsw', 'principle'],
  },
  {
    id: 'tsw-2-3',
    title: 'Enseñar la doctrina',
    titleEn: 'Teach doctrine',
    nodeId: 'tsw-part2',
    order: 3,
    estimatedMinutes: 10,
    tags: ['tsw', 'principle'],
  },
  {
    id: 'tsw-2-4',
    title: 'Fomentar el aprendizaje diligente',
    titleEn: 'Encourage diligent learning',
    nodeId: 'tsw-part2',
    order: 4,
    estimatedMinutes: 10,
    tags: ['tsw', 'principle'],
  },
  {
    id: 'tsw-3-1',
    title: 'Situaciones y grupos de alumnos',
    titleEn: 'Teaching situations and learner groups',
    nodeId: 'tsw-part3',
    order: 1,
    estimatedMinutes: 10,
    tags: ['tsw', 'practice'],
  },
  {
    id: 'tsw-3-2',
    title: 'Planificar una lección (bosquejo)',
    titleEn: 'Plan a lesson (outline)',
    nodeId: 'tsw-part3',
    order: 2,
    estimatedMinutes: 12,
    tags: ['tsw', 'practice'],
  },
  {
    id: 'tsw-3-3',
    title: 'Autoevaluación del maestro',
    titleEn: 'Teacher self-assessment',
    nodeId: 'tsw-part3',
    order: 3,
    estimatedMinutes: 10,
    tags: ['tsw', 'practice'],
  },
  {
    id: 'tsw-3-4',
    title: 'Consejo de maestros y apoyo mutuo',
    titleEn: 'Teacher council and mutual support',
    nodeId: 'tsw-part3',
    order: 4,
    estimatedMinutes: 10,
    tags: ['tsw', 'practice'],
  },
  {
    id: 'tsw-3-5',
    title: 'Orientación de líderes a maestros',
    titleEn: 'How leaders support teachers',
    nodeId: 'tsw-part3',
    order: 5,
    estimatedMinutes: 10,
    tags: ['tsw', 'practice'],
  },
];

const orgLessons: TrainingLesson[] = [
  {
    id: 'org-eq-1',
    title: 'Cuórum de élderes: propósito y enseñanza',
    titleEn: 'Elders quorum: purpose and teaching',
    nodeId: 'org-elders-quorum',
    order: 1,
    estimatedMinutes: 12,
    tags: ['org', 'handbook-8'],
  },
  {
    id: 'org-rs-1',
    title: 'Sociedad de Socorro: propósito y enseñanza',
    titleEn: 'Relief Society: purpose and teaching',
    nodeId: 'org-relief-society',
    order: 1,
    estimatedMinutes: 12,
    tags: ['org', 'handbook-9'],
  },
  {
    id: 'org-aa-1',
    title: 'Cuórums del Sacerdocio Aarónico: propósito y enseñanza',
    titleEn: 'Aaronic Priesthood quorums: purpose and teaching',
    nodeId: 'org-aaronic',
    order: 1,
    estimatedMinutes: 12,
    tags: ['org', 'handbook-10'],
  },
  {
    id: 'org-yw-1',
    title: 'Mujeres Jóvenes: propósito y enseñanza',
    titleEn: 'Young Women: purpose and teaching',
    nodeId: 'org-young-women',
    order: 1,
    estimatedMinutes: 12,
    tags: ['org', 'handbook-11'],
  },
  {
    id: 'org-pr-1',
    title: 'Primaria: propósito y enseñanza centrada en el hogar',
    titleEn: 'Primary: purpose and home-centered teaching',
    nodeId: 'org-primary',
    order: 1,
    estimatedMinutes: 12,
    tags: ['org', 'handbook-12'],
  },
  {
    id: 'org-ss-1',
    title: 'Escuela Dominical: propósito y mejora de la enseñanza',
    titleEn: 'Sunday School: purpose and improving teaching',
    nodeId: 'org-sunday-school',
    order: 1,
    estimatedMinutes: 12,
    tags: ['org', 'handbook-13'],
  },
];

const trackLessons: TrainingLesson[] = [
  {
    id: 'deacon-1',
    title: 'Deberes del diácono',
    titleEn: 'Duties of a deacon',
    nodeId: 'aaronic-deacon',
    order: 1,
    estimatedMinutes: 10,
  },
  {
    id: 'deacon-2',
    title: 'Servicio y reverencia como diácono',
    titleEn: 'Service and reverence as a deacon',
    nodeId: 'aaronic-deacon',
    order: 2,
    estimatedMinutes: 10,
  },
  {
    id: 'teacher-1',
    title: 'Deberes del maestro (Aarónico)',
    titleEn: 'Duties of a teacher (Aaronic)',
    nodeId: 'aaronic-teacher',
    order: 1,
    estimatedMinutes: 10,
  },
  {
    id: 'teacher-2',
    title: 'Servicio, hogares y reverencia',
    titleEn: 'Service, homes, and reverence',
    nodeId: 'aaronic-teacher',
    order: 2,
    estimatedMinutes: 10,
  },
  {
    id: 'priest-1',
    title: 'Presbítero: ordenanzas y dignidad',
    titleEn: 'Priest: ordinances and dignity',
    nodeId: 'aaronic-priest',
    order: 1,
    estimatedMinutes: 10,
  },
  {
    id: 'priest-2',
    title: 'Servicio pastoral y Santa Cena',
    titleEn: 'Pastoral ministry and the sacrament',
    nodeId: 'aaronic-priest',
    order: 2,
    estimatedMinutes: 10,
  },
  {
    id: 'elder-1',
    title: 'Élder: ministrar y bendecir',
    titleEn: 'Elder: minister and bless',
    nodeId: 'melchizedek-elder',
    order: 1,
    estimatedMinutes: 12,
  },
  {
    id: 'elder-2',
    title: 'Liderazgo servicial en el cuórum',
    titleEn: 'Service leadership in the quorum',
    nodeId: 'melchizedek-elder',
    order: 2,
    estimatedMinutes: 12,
  },
  {
    id: 'high-priest-1',
    title: 'Sumo sacerdote: presidencia y llaves',
    titleEn: 'High priest: presidency and keys',
    nodeId: 'melchizedek-high-priest',
    order: 1,
    estimatedMinutes: 12,
  },
  {
    id: 'high-priest-2',
    title: 'Pastorear con unidad y amor',
    titleEn: 'Shepherd with unity and love',
    nodeId: 'melchizedek-high-priest',
    order: 2,
    estimatedMinutes: 12,
  },
];

export const lessonsById: Record<string, TrainingLesson> = [
  ...coreLessons,
  ...tswLessons,
  ...trackLessons,
  ...orgLessons,
].reduce(
  (acc, lesson) => {
    acc[lesson.id] = lesson;
    return acc;
  },
  {} as Record<string, TrainingLesson>
);

/** Orden para «siguiente lección» y flujo sugerido. */
export const TRAINING_NODE_ORDER: readonly string[] = [
  'core-foundations',
  'aaronic-deacon',
  'aaronic-teacher',
  'aaronic-priest',
  'melchizedek-elder',
  'melchizedek-high-priest',
  'tsw-part1',
  'tsw-part2',
  'tsw-part3',
  'org-elders-quorum',
  'org-relief-society',
  'org-aaronic',
  'org-young-women',
  'org-primary',
  'org-sunday-school',
] as const;

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

export function getNodeById(nodeId: string): TrainingNode | null {
  const path = paths.find((p) => p.id === nodeId);
  if (path) return path;
  const track = tracksById[nodeId];
  return track ?? null;
}

export function pathHasChildTracks(node: TrainingNode): node is TrainingPath {
  return 'trackIds' in node && Array.isArray(node.trackIds) && node.trackIds.length > 0;
}

export function getLessonsForNode(nodeId: string): TrainingLesson[] {
  const node = getNodeById(nodeId);
  if (!node) return [];

  if ('lessonIds' in node && node.lessonIds?.length) {
    return node.lessonIds
      .map((id) => lessonsById[id])
      .filter(Boolean)
      .sort((a, b) => a.order - b.order);
  }

  return Object.values(lessonsById)
    .filter((l) => l.nodeId === nodeId)
    .sort((a, b) => a.order - b.order);
}

/** Lecciones de un path en orden de pistas (para «siguiente» y resumen). */
export function getPathOrderedLessons(pathId: string): TrainingLesson[] {
  const path = paths.find((p) => p.id === pathId);
  if (!path) return [];
  if (pathHasChildTracks(path)) {
    return path.trackIds.flatMap((tid) => getLessonsForNode(tid));
  }
  return getLessonsForNode(pathId);
}

export function getPathDescendantLessonIds(pathId: string): string[] {
  const path = paths.find((p) => p.id === pathId);
  if (!path?.trackIds?.length) return [];
  return path.trackIds.flatMap((tid) => tracksById[tid]?.lessonIds ?? []);
}

export function getAggregatedPathProgress(
  pathId: string,
  completedLessons: CompletedLessonsMap
): { completed: number; total: number; percent: number } {
  const ids = getPathDescendantLessonIds(pathId);
  const completed = ids.filter((id) => completedLessons[id]?.percent >= 100).length;
  const total = ids.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percent };
}

export function trainingNodeTitle(node: TrainingPath | TrainingTrack, locale: string): string {
  const en = locale.startsWith('en');
  if (en && node.titleEn) return node.titleEn;
  return node.title;
}

export function trainingNodeDescription(
  node: TrainingPath | TrainingTrack,
  locale: string
): string | undefined {
  const en = locale.startsWith('en');
  if (en && node.descriptionEn) return node.descriptionEn;
  return node.description;
}

export function trainingLessonTitle(lesson: TrainingLesson, locale: string): string {
  const en = locale.startsWith('en');
  if (en && lesson.titleEn) return lesson.titleEn;
  return lesson.title;
}

/** Etiqueta de categoría para el hero canónico (título del track o path). */
export function getTrainingLessonCategoryLabel(lessonId: string, locale = 'es'): string {
  const lesson = lessonsById[lessonId];
  if (!lesson) return '';
  const node = getNodeById(lesson.nodeId);
  if (!node) return '';
  return trainingNodeTitle(node, locale);
}
