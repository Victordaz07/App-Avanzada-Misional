/**
 * Índice estable por semana civil local (año + número de semana aproximado).
 * Sirve para rotar textos sin servidor.
 */
export function getLocalWeekIndex(date = new Date()): number {
  const y = date.getFullYear();
  const start = new Date(y, 0, 1);
  const dayOfYear =
    Math.floor((date.getTime() - start.getTime()) / 86400000) + 1;
  const weekNum = Math.min(53, Math.max(1, Math.ceil(dayOfYear / 7)));
  return y * 100 + weekNum;
}
