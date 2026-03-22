import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import type { LearningIntensity } from '../types/user';

const VALID: readonly LearningIntensity[] = ['low', 'moderate', 'high'];

export const DEFAULT_LEARNING_INTENSITY: LearningIntensity = 'moderate';

/**
 * Learning pace from Firestore `preferences.learningIntensity`.
 * Use for content density / recommendations — not for global layout CSS.
 */
export function useLearningIntensity(): LearningIntensity {
  const { profile } = useAuth();
  return useMemo(() => {
    const raw = profile?.preferences?.learningIntensity;
    if (raw && VALID.includes(raw)) {
      return raw;
    }
    return DEFAULT_LEARNING_INTENSITY;
  }, [profile?.preferences?.learningIntensity]);
}
