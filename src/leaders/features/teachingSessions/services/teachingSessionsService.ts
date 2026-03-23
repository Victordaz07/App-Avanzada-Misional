/**
 * Teaching Sessions Service - Firestore
 *
 * Sesiones bajo users/{teacherUid}/teachingSessions (sin barrio obligatorio).
 * Compatibilidad: wards/{wardId}/teachingSessions (lectura/listado legado).
 */

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { getFirebaseDb } from '../../../services/firebase/firebaseApp';
import type {
  TeachingSession,
  TeachingSessionPart,
  CreateDraftSessionPayload,
  UpdateSessionPayload,
  CallingType,
} from '../types';
import { generateJoinCode } from '../utils/joinCode';
import type { SessionStorageParent } from './sessionStoragePaths';

const getDb = () => getFirebaseDb();

// ============================================================================
// HELPERS
// ============================================================================

function sessionDocRef(
  parent: SessionStorageParent,
  parentId: string,
  sessionId: string
) {
  return doc(getDb(), parent, parentId, 'teachingSessions', sessionId);
}

function mapDocToSession(
  parentId: string,
  sessionId: string,
  data: Record<string, unknown>
): TeachingSession {
  return {
    id: sessionId,
    title: String(data.title ?? ''),
    description: data.description ? String(data.description) : undefined,
    classWithinOrganization: data.classWithinOrganization
      ? String(data.classWithinOrganization)
      : undefined,
    callingType: (data.callingType as TeachingSession['callingType']) ?? 'other',
    teacherUid: String(data.teacherUid ?? ''),
    teacherDisplayName: data.teacherDisplayName ? String(data.teacherDisplayName) : undefined,
    status: (data.status as TeachingSession['status']) ?? 'draft',
    parts: Array.isArray(data.parts) ? (data.parts as TeachingSessionPart[]) : [],
    currentPartId: data.currentPartId != null ? String(data.currentPartId) : null,
    joinCode: data.joinCode != null ? String(data.joinCode) : null,
    scheduledAt: typeof data.scheduledAt === 'number' ? data.scheduledAt : undefined,
    createdAt: Number(data.createdAt ?? 0),
    updatedAt: Number(data.updatedAt ?? 0),
  };
}

export interface ResolvedTeachingSession {
  session: TeachingSession;
  parent: SessionStorageParent;
  parentId: string;
}

// ============================================================================
// CREATE DRAFT (siempre bajo el usuario maestro — no requiere barrio)
// ============================================================================

export async function createDraftSession(
  teacherUid: string,
  teacherDisplayName: string,
  payload: CreateDraftSessionPayload
): Promise<string> {
  const ref = doc(collection(getDb(), 'users', teacherUid, 'teachingSessions'));
  const sessionId = ref.id;
  const now = Date.now();

  const session: Record<string, unknown> = {
    title: payload.title.trim(),
    callingType: payload.callingType,
    teacherUid,
    teacherDisplayName,
    status: 'draft',
    parts: payload.parts ?? [],
    currentPartId: null,
    joinCode: null,
    createdAt: now,
    updatedAt: now,
  };

  const desc = payload.description?.trim();
  if (desc) session.description = desc;

  if (payload.scheduledAt != null) session.scheduledAt = payload.scheduledAt;

  const cwo = payload.classWithinOrganization?.trim();
  if (cwo) session.classWithinOrganization = cwo;

  await setDoc(ref, session);
  return sessionId;
}

// ============================================================================
// RESOLVER sesión del maestro (user primero, luego ward legado)
// ============================================================================

/**
 * Resuelve si scopeId es users/... o wards/... (p. ej. ruta /session/:scopeId/:sessionId/live).
 */
export async function findSessionStorageByScopeId(
  scopeId: string,
  sessionId: string
): Promise<{ parent: SessionStorageParent; parentId: string } | null> {
  const u = await getSession('users', scopeId, sessionId);
  if (u) return { parent: 'users', parentId: scopeId };
  const w = await getSession('wards', scopeId, sessionId);
  if (w) return { parent: 'wards', parentId: scopeId };
  return null;
}

export async function findSessionForTeacher(
  teacherUid: string,
  wardId: string | undefined,
  sessionId: string
): Promise<ResolvedTeachingSession | null> {
  const userRef = sessionDocRef('users', teacherUid, sessionId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return {
      session: mapDocToSession(teacherUid, sessionId, userSnap.data() as Record<string, unknown>),
      parent: 'users',
      parentId: teacherUid,
    };
  }
  if (wardId) {
    const wardRef = sessionDocRef('wards', wardId, sessionId);
    const wardSnap = await getDoc(wardRef);
    if (wardSnap.exists()) {
      return {
        session: mapDocToSession(wardId, sessionId, wardSnap.data() as Record<string, unknown>),
        parent: 'wards',
        parentId: wardId,
      };
    }
  }
  return null;
}

// ============================================================================
// UPDATE SESSION
// ============================================================================

export async function updateSession(
  parent: SessionStorageParent,
  parentId: string,
  sessionId: string,
  patch: UpdateSessionPayload
): Promise<void> {
  const ref = sessionDocRef(parent, parentId, sessionId);
  const now = Date.now();

  const update: Record<string, unknown> = {
    updatedAt: now,
  };
  if (patch.title !== undefined) update.title = patch.title.trim();
  if (patch.description !== undefined) update.description = patch.description?.trim() || null;
  if (patch.classWithinOrganization !== undefined) {
    update.classWithinOrganization = patch.classWithinOrganization?.trim() || null;
  }
  if (patch.callingType !== undefined) update.callingType = patch.callingType;
  if (patch.parts !== undefined) update.parts = patch.parts;
  if (patch.scheduledAt !== undefined) update.scheduledAt = patch.scheduledAt ?? null;

  await updateDoc(ref, update);
}

// ============================================================================
// ACTIVATE SESSION
// ============================================================================

export async function activateSession(
  parent: SessionStorageParent,
  parentId: string,
  sessionId: string
): Promise<string> {
  const ref = sessionDocRef(parent, parentId, sessionId);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('Sesión no encontrada');

  const data = snap.data();
  const parts = (data.parts ?? []) as TeachingSessionPart[];
  const firstPartId = parts.length > 0 ? parts[0].id : null;
  const joinCode = generateJoinCode();
  const now = Date.now();

  await updateDoc(ref, {
    status: 'active',
    joinCode,
    currentPartId: firstPartId,
    updatedAt: now,
  });

  return joinCode;
}

// ============================================================================
// SET CURRENT PART
// ============================================================================

export async function setCurrentPart(
  parent: SessionStorageParent,
  parentId: string,
  sessionId: string,
  partId: string | null
): Promise<void> {
  const ref = sessionDocRef(parent, parentId, sessionId);
  await updateDoc(ref, {
    currentPartId: partId,
    updatedAt: Date.now(),
  });
}

// ============================================================================
// COMPLETE SESSION
// ============================================================================

export async function completeSession(
  parent: SessionStorageParent,
  parentId: string,
  sessionId: string
): Promise<void> {
  const ref = sessionDocRef(parent, parentId, sessionId);
  await updateDoc(ref, {
    status: 'completed',
    updatedAt: Date.now(),
  });
}

// ============================================================================
// GET SESSION (directo por padre)
// ============================================================================

export async function getSession(
  parent: SessionStorageParent,
  parentId: string,
  sessionId: string
): Promise<TeachingSession | null> {
  const ref = sessionDocRef(parent, parentId, sessionId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return mapDocToSession(parentId, sessionId, snap.data() as Record<string, unknown>);
}

// ============================================================================
// LIST SESSIONS (teacher's sessions)
// ============================================================================

export async function listSessionsForTeacher(
  teacherUid: string,
  legacyWardId?: string | null,
  limitCount: number = 50
): Promise<TeachingSession[]> {
  const db = getDb();
  const userColl = collection(db, 'users', teacherUid, 'teachingSessions');
  const userQ = query(userColl, orderBy('updatedAt', 'desc'), limit(limitCount));
  const userSnap = await getDocs(userQ);
  const fromUser = userSnap.docs.map((d) =>
    mapDocToSession(teacherUid, d.id, d.data() as Record<string, unknown>)
  );

  if (!legacyWardId) {
    return fromUser;
  }

  const wardColl = collection(db, 'wards', legacyWardId, 'teachingSessions');
  const wardQ = query(wardColl, orderBy('updatedAt', 'desc'), limit(limitCount * 2));
  let fromWard: TeachingSession[] = [];
  try {
    const wardSnap = await getDocs(wardQ);
    fromWard = wardSnap.docs
      .filter((d) => (d.data() as { teacherUid?: string }).teacherUid === teacherUid)
      .map((d) =>
        mapDocToSession(legacyWardId, d.id, d.data() as Record<string, unknown>)
      )
      .slice(0, limitCount);
  } catch {
    fromWard = [];
  }

  const merged = new Map<string, TeachingSession>();
  [...fromUser, ...fromWard].forEach((s) => merged.set(s.id, s));
  return Array.from(merged.values())
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, limitCount);
}

// ============================================================================
// LIST SESSIONS FOR WARD (bishopric - all sessions in ward)
// ============================================================================

export interface ListSessionsForWardOptions {
  limit?: number;
  callingType?: CallingType;
  daysBack?: number;
}

export async function listSessionsForWard(
  wardId: string,
  options?: ListSessionsForWardOptions
): Promise<TeachingSession[]> {
  const coll = collection(getDb(), 'wards', wardId, 'teachingSessions');
  const limitCount = options?.limit ?? 50;
  const q = query(coll, orderBy('updatedAt', 'desc'), limit(limitCount * 2));
  const snapshot = await getDocs(q);
  let sessions = snapshot.docs.map((d) =>
    mapDocToSession(wardId, d.id, d.data() as Record<string, unknown>)
  );

  const cutoff = options?.daysBack
    ? Date.now() - options.daysBack * 24 * 60 * 60 * 1000
    : 0;
  if (cutoff > 0) {
    sessions = sessions.filter((s) => s.updatedAt >= cutoff);
  }
  if (options?.callingType) {
    sessions = sessions.filter((s) => s.callingType === options.callingType);
  }
  return sessions.slice(0, limitCount);
}

// ============================================================================
// SUBSCRIBE (real-time)
// ============================================================================

export function subscribeToSession(
  parent: SessionStorageParent,
  parentId: string,
  sessionId: string,
  callback: (session: TeachingSession | null) => void
): Unsubscribe {
  const ref = sessionDocRef(parent, parentId, sessionId);
  return onSnapshot(
    ref,
    (snap) => {
      if (!snap.exists()) {
        callback(null);
        return;
      }
      callback(mapDocToSession(parentId, sessionId, snap.data() as Record<string, unknown>));
    },
    (err) => {
      console.error('subscribeToSession error:', err);
      callback(null);
    }
  );
}
