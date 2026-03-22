/**
 * Amigos, solicitudes, tema de estudio compartido y mensajes entre usuarios autenticados.
 */

import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import { getFirebaseDb } from './firebaseApp';
import { getPublicUserCardByXtgId } from './publicUserCardService';
import type { PublicUserCard } from './publicUserCardService';

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface FriendRequestDoc {
  fromUid: string;
  toUid: string;
  status: FriendRequestStatus;
  createdAt: unknown;
  updatedAt?: unknown;
}

export interface FriendMessageDoc {
  participantPairId: string;
  participantUid1: string;
  participantUid2: string;
  senderUid: string;
  text: string;
  createdAt: unknown;
}

export interface SharedStudyDoc {
  participantPairId: string;
  participantUid1: string;
  participantUid2: string;
  activeLessonId: string | null;
  updatedAt: unknown;
}

const FRIEND_REQUESTS = 'friendRequests';
const FRIEND_MESSAGES = 'friendMessages';
const SHARED_STUDY = 'sharedStudy';

export function participantPairId(uidA: string, uidB: string): string {
  return uidA < uidB ? `${uidA}__${uidB}` : `${uidB}__${uidA}`;
}

function sortedParticipants(uidA: string, uidB: string): { u1: string; u2: string; pairId: string } {
  const u1 = uidA < uidB ? uidA : uidB;
  const u2 = uidA < uidB ? uidB : uidA;
  return { u1, u2, pairId: `${u1}__${u2}` };
}

export async function sendFriendRequest(fromUid: string, toXtgId: string): Promise<{ ok: true } | { ok: false; reason: string }> {
  const card = await getPublicUserCardByXtgId(toXtgId);
  if (!card) return { ok: false, reason: 'not_found' };
  if (card.uid === fromUid) return { ok: false, reason: 'self' };

  if (await areAcceptedFriends(fromUid, card.uid)) return { ok: false, reason: 'already_friends' };

  const db = getFirebaseDb();
  const dup = query(
    collection(db, FRIEND_REQUESTS),
    where('fromUid', '==', fromUid),
    where('toUid', '==', card.uid),
    where('status', '==', 'pending'),
    limit(1),
  );
  const existing = await getDocs(dup);
  if (!existing.empty) return { ok: false, reason: 'duplicate' };

  await addDoc(collection(db, FRIEND_REQUESTS), {
    fromUid,
    toUid: card.uid,
    status: 'pending' as const,
    createdAt: serverTimestamp(),
  });

  return { ok: true };
}

export async function listPendingIncoming(uid: string): Promise<Array<{ id: string; data: FriendRequestDoc; fromCard: PublicUserCard | null }>> {
  const db = getFirebaseDb();
  const q = query(
    collection(db, FRIEND_REQUESTS),
    where('toUid', '==', uid),
    where('status', '==', 'pending'),
  );
  const snap = await getDocs(q);
  const out: Array<{ id: string; data: FriendRequestDoc; fromCard: PublicUserCard | null }> = [];
  for (const d of snap.docs) {
    const data = d.data() as FriendRequestDoc;
    const fromCard = await getPublicProfileForUid(data.fromUid);
    out.push({ id: d.id, data, fromCard });
  }
  return out;
}

export async function listPendingOutgoing(uid: string): Promise<Array<{ id: string; data: FriendRequestDoc; toCard: PublicUserCard | null }>> {
  const db = getFirebaseDb();
  const q = query(
    collection(db, FRIEND_REQUESTS),
    where('fromUid', '==', uid),
    where('status', '==', 'pending'),
  );
  const snap = await getDocs(q);
  const out: Array<{ id: string; data: FriendRequestDoc; toCard: PublicUserCard | null }> = [];
  for (const d of snap.docs) {
    const data = d.data() as FriendRequestDoc;
    const toCard = await getPublicProfileForUid(data.toUid);
    out.push({ id: d.id, data, toCard });
  }
  return out;
}

/** Resuelve tarjeta pública por uid vía índice inverso: lista todas las cards es caro; usamos xtgId en requests. */
async function getPublicProfileForUid(targetUid: string): Promise<PublicUserCard | null> {
  const db = getFirebaseDb();
  const q = query(collection(db, 'publicUserCards'), where('uid', '==', targetUid), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as PublicUserCard;
}

export async function listAcceptedFriends(uid: string): Promise<PublicUserCard[]> {
  const db = getFirebaseDb();
  const q1 = query(
    collection(db, FRIEND_REQUESTS),
    where('fromUid', '==', uid),
    where('status', '==', 'accepted'),
  );
  const q2 = query(
    collection(db, FRIEND_REQUESTS),
    where('toUid', '==', uid),
    where('status', '==', 'accepted'),
  );
  const [s1, s2] = await Promise.all([getDocs(q1), getDocs(q2)]);
  const cards: PublicUserCard[] = [];
  const seen = new Set<string>();

  for (const d of s1.docs) {
    const data = d.data() as FriendRequestDoc;
    const other = data.toUid;
    if (seen.has(other)) continue;
    seen.add(other);
    const c = await getPublicProfileForUid(other);
    if (c) cards.push(c);
  }
  for (const d of s2.docs) {
    const data = d.data() as FriendRequestDoc;
    const other = data.fromUid;
    if (seen.has(other)) continue;
    seen.add(other);
    const c = await getPublicProfileForUid(other);
    if (c) cards.push(c);
  }
  return cards;
}

export async function acceptFriendRequest(requestId: string): Promise<void> {
  const db = getFirebaseDb();
  const ref = doc(db, FRIEND_REQUESTS, requestId);
  await updateDoc(ref, {
    status: 'accepted',
    updatedAt: serverTimestamp(),
  });
}

export async function rejectFriendRequest(requestId: string): Promise<void> {
  const db = getFirebaseDb();
  await updateDoc(doc(db, FRIEND_REQUESTS, requestId), {
    status: 'rejected',
    updatedAt: serverTimestamp(),
  });
}

export async function cancelFriendRequest(requestId: string): Promise<void> {
  const db = getFirebaseDb();
  await updateDoc(doc(db, FRIEND_REQUESTS, requestId), {
    status: 'cancelled',
    updatedAt: serverTimestamp(),
  });
}

export async function areAcceptedFriends(uidA: string, uidB: string): Promise<boolean> {
  const db = getFirebaseDb();
  const q1 = query(
    collection(db, FRIEND_REQUESTS),
    where('fromUid', '==', uidA),
    where('toUid', '==', uidB),
    where('status', '==', 'accepted'),
    limit(1),
  );
  const q2 = query(
    collection(db, FRIEND_REQUESTS),
    where('fromUid', '==', uidB),
    where('toUid', '==', uidA),
    where('status', '==', 'accepted'),
    limit(1),
  );
  const [a, b] = await Promise.all([getDocs(q1), getDocs(q2)]);
  return !a.empty || !b.empty;
}

export async function getSharedStudy(myUid: string, friendUid: string): Promise<SharedStudyDoc | null> {
  const { pairId } = sortedParticipants(myUid, friendUid);
  const db = getFirebaseDb();
  const q = query(collection(db, SHARED_STUDY), where('participantPairId', '==', pairId), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as SharedStudyDoc;
}

export async function setSharedStudyLesson(
  myUid: string,
  friendUid: string,
  lessonId: string | null,
): Promise<void> {
  const { u1, u2, pairId } = sortedParticipants(myUid, friendUid);
  const ok = await areAcceptedFriends(myUid, friendUid);
  if (!ok) throw new Error('not_friends');

  const db = getFirebaseDb();
  const q = query(collection(db, SHARED_STUDY), where('participantPairId', '==', pairId), limit(1));
  const snap = await getDocs(q);

  if (snap.empty) {
    await addDoc(collection(db, SHARED_STUDY), {
      participantPairId: pairId,
      participantUid1: u1,
      participantUid2: u2,
      activeLessonId: lessonId,
      updatedAt: serverTimestamp(),
    });
    return;
  }

  await updateDoc(snap.docs[0].ref, {
    activeLessonId: lessonId,
    updatedAt: serverTimestamp(),
  });
}

export async function sendFriendMessage(
  myUid: string,
  friendUid: string,
  text: string,
): Promise<void> {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length > 2000) return;

  const ok = await areAcceptedFriends(myUid, friendUid);
  if (!ok) throw new Error('not_friends');

  const { u1, u2, pairId } = sortedParticipants(myUid, friendUid);
  const db = getFirebaseDb();
  await addDoc(collection(db, FRIEND_MESSAGES), {
    participantPairId: pairId,
    participantUid1: u1,
    participantUid2: u2,
    senderUid: myUid,
    text: trimmed,
    createdAt: serverTimestamp(),
  });
}

export function subscribeFriendMessages(
  myUid: string,
  friendUid: string,
  onUpdate: (messages: FriendMessageDoc[]) => void,
  maxMessages = 80,
): Unsubscribe {
  const { pairId } = sortedParticipants(myUid, friendUid);
  const db = getFirebaseDb();
  const q = query(
    collection(db, FRIEND_MESSAGES),
    where('participantPairId', '==', pairId),
    orderBy('createdAt', 'desc'),
    limit(maxMessages),
  );

  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => d.data() as FriendMessageDoc).reverse();
      onUpdate(list);
    },
    (err) => {
      console.error('subscribeFriendMessages:', err);
      onUpdate([]);
    },
  );
}
