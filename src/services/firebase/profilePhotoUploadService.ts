/**
 * Uploads a profile photo to Firebase Storage and updates Firestore `photoURL`.
 * Requires Storage rules that allow authenticated users to write `avatars/{uid}/...`.
 */

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirebaseStorage } from './firebaseApp';
import { updateProfile } from './userService';

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export type ProfilePhotoValidationError = 'invalidType' | 'tooLarge';

export function validateProfilePhotoFile(file: File): ProfilePhotoValidationError | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return 'invalidType';
  }
  if (file.size > MAX_BYTES) {
    return 'tooLarge';
  }
  return null;
}

function extensionForMime(mime: string): string {
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  return 'jpg';
}

export async function uploadUserProfilePhoto(uid: string, file: File): Promise<string> {
  const validation = validateProfilePhotoFile(file);
  if (validation === 'invalidType') {
    throw new Error('invalidType');
  }
  if (validation === 'tooLarge') {
    throw new Error('tooLarge');
  }

  const storage = getFirebaseStorage();
  const ext = extensionForMime(file.type);
  const objectPath = `avatars/${uid}/profile.${ext}`;
  const storageRef = ref(storage, objectPath);

  await uploadBytes(storageRef, file, {
    contentType: file.type,
    cacheControl: 'public,max-age=31536000',
  });

  const url = await getDownloadURL(storageRef);
  await updateProfile(uid, { photoURL: url });
  return url;
}
