/**
 * Tarjeta pública mínima por xTheGospel ID (solo campos necesarios para amigos / QR).
 * Documento: publicUserCards/{xthegospelId}
 */

import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseDb } from './firebaseApp';
import type { MemberStatus, UniversalUserProfile } from '../../types/user';
import type { Timestamp } from 'firebase/firestore';

export interface PublicUserCard {
  uid: string;
  xthegospelId: string;
  displayName: string;
  photoURL: string;
  memberStatus: MemberStatus;
  updatedAt: Timestamp | ReturnType<typeof serverTimestamp>;
}

export function profileToPublicCard(profile: UniversalUserProfile): Omit<PublicUserCard, 'updatedAt'> {
  return {
    uid: profile.uid,
    xthegospelId: profile.xthegospelId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || '',
    memberStatus: profile.memberStatus,
  };
}

export async function syncPublicUserCard(profile: UniversalUserProfile): Promise<void> {
  const db = getFirebaseDb();
  const id = profile.xthegospelId;
  if (!id || !/^XTG-\d{4}-[A-Z0-9]{6}$/i.test(id)) return;

  const ref = doc(db, 'publicUserCards', id.toUpperCase());
  await setDoc(
    ref,
    {
      ...profileToPublicCard(profile),
      xthegospelId: id.toUpperCase(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

/** Lookup seguro: solo documento público, sin leer /users de terceros. */
export async function getPublicUserCardByXtgId(
  xthegospelId: string,
): Promise<PublicUserCard | null> {
  const raw = xthegospelId.trim().toUpperCase();
  if (!/^XTG-\d{4}-[A-Z0-9]{6}$/.test(raw)) return null;

  try {
    const db = getFirebaseDb();
    const snap = await getDoc(doc(db, 'publicUserCards', raw));
    if (!snap.exists()) return null;
    return snap.data() as PublicUserCard;
  } catch (e) {
    console.error('getPublicUserCardByXtgId:', e);
    return null;
  }
}
