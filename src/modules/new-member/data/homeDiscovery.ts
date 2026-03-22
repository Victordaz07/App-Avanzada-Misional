import type { GuideCategory, GuideTopic } from './guideTopics.types';

export { getLocalDayIndex } from '../../../utils/localDayIndex';

const CATEGORY_PRIORITY: GuideCategory[] = [
  'ordinances',
  'worship',
  'covenant-living',
  'belonging',
];

function rotate<T>(arr: readonly T[], offset: number): T[] {
  const n = arr.length;
  if (n === 0) return [];
  const o = ((offset % n) + n) % n;
  return [...arr.slice(o), ...arr.slice(0, o)];
}

/**
 * Elige hasta `max` temas de la guía para el home: prioriza variedad de categoría
 * y excluye el tema que ya aparece en «continuar».
 */
export function selectHomeDiscoveryTopics(
  topics: GuideTopic[],
  options: { excludeId: string; dayIndex: number; max?: number }
): GuideTopic[] {
  const { excludeId, dayIndex, max = 3 } = options;
  const pool = topics.filter((t) => t.id !== excludeId);
  const result: GuideTopic[] = [];
  const used = new Set<string>();

  const cats = rotate(CATEGORY_PRIORITY, dayIndex);

  for (const cat of cats) {
    if (result.length >= max) break;
    const inCat = pool.filter((t) => t.category === cat && !used.has(t.id));
    if (inCat.length === 0) continue;
    const idx = (dayIndex + cat.length + cat.charCodeAt(0)) % inCat.length;
    const picked = inCat[idx];
    if (picked) {
      result.push(picked);
      used.add(picked.id);
    }
  }

  for (const t of pool) {
    if (result.length >= max) break;
    if (used.has(t.id)) continue;
    result.push(t);
    used.add(t.id);
  }

  return result.slice(0, max);
}
