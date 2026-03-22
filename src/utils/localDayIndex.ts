/** Día local estable (no hora) para variar listas en home sin llamadas a red. */
export function getLocalDayIndex(date = new Date()): number {
  return date.getFullYear() * 366 + date.getMonth() * 31 + date.getDate();
}
