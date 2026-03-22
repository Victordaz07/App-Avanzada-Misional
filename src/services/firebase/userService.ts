/**
 * User Service - xTheGospel Universal Profile
 * 
 * Manages user profiles across all xTheGospel apps.
 * Creates, updates, and retrieves universal user profiles.
 */

import { User } from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { getFirebaseDb } from './firebaseApp';
import { syncPublicUserCard } from './publicUserCardService';
import {
  UniversalUserProfile,
  ShareableProfile,
  CreateProfileInput,
  XtgAppKey,
  MemberStatus,
  DEFAULT_PROFILE_APPS,
  DEFAULT_PRIVACY_SETTINGS,
  ChurchUnit,
  OrdinanceDates,
  churchRelationshipToMemberStatus,
  COLOR_THEME_PRESET_IDS,
  type OnboardingChurchRelationship,
  type ProfileGender,
  type LearningIntensity,
  type AgeBand,
  type ColorThemePresetId,
} from '../../types/user';

/** Strip deprecated app keys from Firestore (e.g. apps.missionary → member). */
function sanitizeProfileApps(
  apps: UniversalUserProfile['apps'] | Record<string, boolean> | undefined,
): UniversalUserProfile['apps'] {
  const merged: UniversalUserProfile['apps'] = { ...DEFAULT_PROFILE_APPS };
  if (!apps || typeof apps !== 'object') return merged;
  const raw = apps as Record<string, boolean>;
  if (raw.missionary === true) {
    merged.member = true;
  }
  for (const key of Object.keys(DEFAULT_PROFILE_APPS) as XtgAppKey[]) {
    if (raw[key] === true) {
      merged[key] = true;
    }
  }
  return merged;
}

export function sanitizeUniversalProfile(raw: UniversalUserProfile): UniversalUserProfile {
  return {
    ...raw,
    apps: sanitizeProfileApps(raw.apps),
  };
}

/**
 * Generate a unique, readable xTheGospel ID
 * Format: XTG-YYYY-XXXXXX (e.g., XTG-2026-A7B3K9)
 */
export function generateXTheGospelId(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluding confusing chars (0, O, 1, I)
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `XTG-${year}-${random}`;
}

/**
 * Create a new universal user profile
 */
export async function createUniversalProfile(
  user: User,
  input: CreateProfileInput
): Promise<UniversalUserProfile> {
  const now = serverTimestamp();
  
  // Determine initial member status based on app
  const memberStatus: MemberStatus = input.memberStatus || 
    (input.initialApp === 'investigator' ? 'investigator' : 'active');
  
  const profile: UniversalUserProfile = {
    // Identification
    uid: user.uid,
    xthegospelId: generateXTheGospelId(),
    
    // Basic info
    displayName: input.displayName || user.displayName || input.email.split('@')[0],
    firstName: input.firstName || '',
    lastName: input.lastName || '',
    email: input.email,
    phone: input.phone || user.phoneNumber || '',
    photoURL: user.photoURL || '',
    
    // Dates
    createdAt: now as Timestamp,
    updatedAt: now as Timestamp,
    lastLoginAt: now as Timestamp,
    
    // Church info
    memberStatus,
    
    // Apps - Enable the initial app
    apps: {
      ...DEFAULT_PROFILE_APPS,
      [input.initialApp]: true,
    },
    
    // Roles (empty initially)
    roles: {},
    
    // Privacy
    privacy: DEFAULT_PRIVACY_SETTINGS,
    
    // Metadata
    profileComplete: false,
  };
  
  // Save to Firestore
  const db = getFirebaseDb();
  await setDoc(doc(db, 'users', user.uid), profile);

  try {
    await syncPublicUserCard(profile);
  } catch (e) {
    console.warn('syncPublicUserCard after create:', e);
  }

  console.log(`✅ Created xTheGospel profile: ${profile.xthegospelId}`);
  return profile;
}

/**
 * Get user profile by Firebase UID
 */
export async function getProfileByUid(uid: string): Promise<UniversalUserProfile | null> {
  try {
    const db = getFirebaseDb();
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return sanitizeUniversalProfile(docSnap.data() as UniversalUserProfile);
    }
    return null;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}

/**
 * Get user profile by xTheGospel ID (full `users` doc).
 * Prefer `getPublicUserCardByXtgId` from publicUserCardService for cross-user discovery (amigos).
 */
export async function getProfileByXtgId(xthegospelId: string): Promise<UniversalUserProfile | null> {
  try {
    // Note: For production, create a Firestore index or use a separate collection
    // This is a simple implementation for demonstration
    const { collection, query, where, getDocs } = await import('firebase/firestore');
    const db = getFirebaseDb();
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('xthegospelId', '==', xthegospelId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as UniversalUserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting profile by XTG ID:', error);
    return null;
  }
}

/**
 * Update user profile
 */
export async function updateProfile(
  uid: string,
  updates: Partial<UniversalUserProfile>
): Promise<void> {
  try {
    const db = getFirebaseDb();
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    const refreshed = await getProfileByUid(uid);
    if (refreshed) {
      try {
        await syncPublicUserCard(refreshed);
      } catch (e) {
        console.warn('syncPublicUserCard after update:', e);
      }
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

const LEARNING_INTENSITY_VALUES: readonly LearningIntensity[] = [
  'low',
  'moderate',
  'high',
];

/** Partial update of `users/{uid}.preferences` without replacing the whole object. */
export interface UserPreferencePatch {
  colorThemePreset?: ColorThemePresetId;
  preferredLocale?: 'es' | 'en';
  learningIntensity?: LearningIntensity;
}

export async function patchUserPreferences(
  uid: string,
  patch: UserPreferencePatch,
): Promise<void> {
  const updates: Record<string, unknown> = { updatedAt: serverTimestamp() };

  if (patch.colorThemePreset !== undefined) {
    if (!COLOR_THEME_PRESET_IDS.includes(patch.colorThemePreset)) {
      throw new Error('Invalid color theme preset');
    }
    updates['preferences.colorThemePreset'] = patch.colorThemePreset;
  }
  if (patch.preferredLocale !== undefined) {
    if (patch.preferredLocale !== 'es' && patch.preferredLocale !== 'en') {
      throw new Error('Invalid locale');
    }
    updates['preferences.preferredLocale'] = patch.preferredLocale;
  }
  if (patch.learningIntensity !== undefined) {
    if (!LEARNING_INTENSITY_VALUES.includes(patch.learningIntensity)) {
      throw new Error('Invalid learning intensity');
    }
    updates['preferences.learningIntensity'] = patch.learningIntensity;
  }

  const changedKeys = Object.keys(updates).filter((k) => k !== 'updatedAt');
  if (changedKeys.length === 0) {
    return;
  }

  try {
    const db = getFirebaseDb();
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, updates);

    const refreshed = await getProfileByUid(uid);
    if (refreshed) {
      try {
        await syncPublicUserCard(refreshed);
      } catch (e) {
        console.warn('syncPublicUserCard after patchUserPreferences:', e);
      }
    }
  } catch (error) {
    console.error('Error patching user preferences:', error);
    throw error;
  }
}

/**
 * Update last login timestamp
 */
export async function updateLastLogin(uid: string): Promise<void> {
  try {
    const db = getFirebaseDb();
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      lastLoginAt: serverTimestamp(),
    });
  } catch (error) {
    // Non-critical, just log
    console.warn('Could not update last login:', error);
  }
}

/** Payload to finish the post-signup onboarding wizard. */
export interface CompleteOnboardingPayload {
  churchRelationship: OnboardingChurchRelationship;
  gender: ProfileGender;
  learningIntensity: LearningIntensity;
  ageBand: AgeBand;
  preferredLocale: 'es' | 'en';
  colorThemePreset: ColorThemePresetId;
  /** Required when `ageBand` is `child_8_12` (COPPA / guardian supervision). */
  guardianSupervisionConfirmed: boolean;
}

/**
 * Persist onboarding preferences, member status, app flags, and mark profile complete.
 */
export async function completeOnboarding(
  uid: string,
  payload: CompleteOnboardingPayload,
): Promise<void> {
  if (payload.ageBand === 'child_8_12' && !payload.guardianSupervisionConfirmed) {
    throw new Error('Guardian supervision must be confirmed for this age band');
  }
  if (!COLOR_THEME_PRESET_IDS.includes(payload.colorThemePreset)) {
    throw new Error('Invalid color theme preset');
  }

  const memberStatus = churchRelationshipToMemberStatus(payload.churchRelationship);
  const db = getFirebaseDb();
  const docRef = doc(db, 'users', uid);

  const preferences: Record<string, unknown> = {
    gender: payload.gender,
    learningIntensity: payload.learningIntensity,
    ageBand: payload.ageBand,
    preferredLocale: payload.preferredLocale,
    colorThemePreset: payload.colorThemePreset,
  };
  if (payload.ageBand === 'child_8_12') {
    preferences.guardianSupervisionAcknowledgedAt = serverTimestamp();
  }

  await updateDoc(docRef, {
    memberStatus,
    'apps.member': memberStatus !== 'investigator',
    'apps.investigator': memberStatus === 'investigator',
    preferences,
    profileComplete: true,
    updatedAt: serverTimestamp(),
  });

  const refreshed = await getProfileByUid(uid);
  if (refreshed) {
    try {
      await syncPublicUserCard(refreshed);
    } catch (e) {
      console.warn('syncPublicUserCard after onboarding:', e);
    }
  }
}

/**
 * Enable an app for a user
 */
export async function enableApp(uid: string, app: XtgAppKey): Promise<void> {
  try {
    const db = getFirebaseDb();
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      [`apps.${app}`]: true,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error enabling app:', error);
    throw error;
  }
}

/**
 * Update member status (e.g., after baptism)
 */
export async function updateMemberStatus(
  uid: string,
  status: MemberStatus
): Promise<void> {
  try {
    const db = getFirebaseDb();
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      memberStatus: status,
      updatedAt: serverTimestamp(),
    });

    const refreshed = await getProfileByUid(uid);
    if (refreshed) {
      try {
        await syncPublicUserCard(refreshed);
      } catch (e) {
        console.warn('syncPublicUserCard after memberStatus:', e);
      }
    }
  } catch (error) {
    console.error('Error updating member status:', error);
    throw error;
  }
}

/**
 * Update church unit information
 */
export async function updateChurchUnit(
  uid: string,
  unit: ChurchUnit
): Promise<void> {
  try {
    const db = getFirebaseDb();
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      unit,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating church unit:', error);
    throw error;
  }
}

/**
 * Record ordinance date (baptism, confirmation, etc.)
 */
export async function recordOrdinance(
  uid: string,
  ordinances: Partial<OrdinanceDates>
): Promise<void> {
  try {
    const profile = await getProfileByUid(uid);
    if (!profile) throw new Error('Profile not found');
    
    const db = getFirebaseDb();
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      ordinances: {
        ...profile.ordinances,
        ...ordinances,
      },
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error recording ordinance:', error);
    throw error;
  }
}

/**
 * Mark profile as verified by a leader
 */
export async function verifyProfile(
  uid: string,
  leaderUid: string
): Promise<void> {
  try {
    const db = getFirebaseDb();
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      verifiedByLeader: true,
      verifiedAt: serverTimestamp(),
      verifiedBy: leaderUid,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error verifying profile:', error);
    throw error;
  }
}

/**
 * Get shareable profile (minimal info for QR/sharing)
 */
export function getShareableProfile(profile: UniversalUserProfile): ShareableProfile {
  return {
    xthegospelId: profile.xthegospelId,
    displayName: profile.displayName,
    photoURL: profile.photoURL,
    memberStatus: profile.memberStatus,
    unit: profile.unit ? {
      wardName: profile.unit.wardName,
      stakeName: profile.unit.stakeName,
    } : undefined,
  };
}

/**
 * Check if profile exists for a user
 */
export async function profileExists(uid: string): Promise<boolean> {
  try {
    const db = getFirebaseDb();
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch {
    return false;
  }
}

/**
 * Get or create profile (ensures profile exists)
 */
export async function getOrCreateProfile(
  user: User,
  initialApp: XtgAppKey = 'member'
): Promise<UniversalUserProfile> {
  const existing = await getProfileByUid(user.uid);
  
  if (existing) {
    // Update last login
    await updateLastLogin(user.uid);
    return existing;
  }
  
  // Create new profile
  return createUniversalProfile(user, {
    email: user.email || '',
    displayName: user.displayName || undefined,
    initialApp,
  });
}
