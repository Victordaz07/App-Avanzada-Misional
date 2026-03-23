/**
 * Requisitos para flujos de enseñanza en vivo:
 * - Aprender (unirse): Fundamentos Básicos (core-foundations) al 100 %.
 * - Enseñar (crear sesión): Enseñar a la manera del Salvador al 100 %.
 */

import type { CompletedLessonsMap } from '../types/training';
import {
  getAggregatedPathProgress,
  getLessonsForNode,
} from '../data/trainingPaths';

export function isCoreFoundationsComplete(
  completedLessons: CompletedLessonsMap
): boolean {
  const lessons = getLessonsForNode('core-foundations');
  if (lessons.length === 0) return false;
  return lessons.every((l) => (completedLessons[l.id]?.percent ?? 0) >= 100);
}

export function isTeachingSaviorsWayComplete(
  completedLessons: CompletedLessonsMap
): boolean {
  const p = getAggregatedPathProgress('teaching-saviors-way', completedLessons);
  return p.total > 0 && p.percent === 100;
}
