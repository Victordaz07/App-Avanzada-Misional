/**
 * Ubicación de sesiones en Firestore:
 * - users/{uid}/teachingSessions — cualquier maestro (sin barrio requerido)
 * - wards/{wardId}/teachingSessions — legado / compatibilidad
 */

export type SessionStorageParent = 'users' | 'wards';

export function parseTeachingSessionDocumentPath(
  fullPath: string
): { parent: SessionStorageParent; parentId: string; sessionId: string } | null {
  const parts = fullPath.split('/');
  if (parts.length < 4) return null;
  const [root, parentId, mid, sessionId] = parts;
  if (mid !== 'teachingSessions') return null;
  if (root === 'users' || root === 'wards') {
    return { parent: root, parentId, sessionId };
  }
  return null;
}
