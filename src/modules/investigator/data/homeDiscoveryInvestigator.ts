import type { Lesson } from './lessons';

function rotate<T>(arr: T[], offset: number): T[] {
  const n = arr.length;
  if (n === 0) return [];
  const o = ((offset % n) + n) % n;
  return [...arr.slice(o), ...arr.slice(0, o)];
}

/**
 * Hasta `max` lecciones del camino misional, rotación diaria, excluye la lección «continuar».
 */
export function selectInvestigatorDiscoveryLessons(
  coreLessons: Lesson[],
  options: { excludeId: string; dayIndex: number; max?: number }
): Lesson[] {
  const { excludeId, dayIndex, max = 3 } = options;
  const pool = coreLessons.filter((l) => l.id !== excludeId);
  if (pool.length === 0) return [];
  const rotated = rotate([...pool], dayIndex % pool.length);
  return rotated.slice(0, Math.min(max, rotated.length));
}
