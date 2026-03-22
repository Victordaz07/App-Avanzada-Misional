import { useAuth } from '../context/AuthContext';
import type { MemberStatus } from '../types/user';

/**
 * Training unlock logic historically used `seeking` | `covenanted`.
 * `covenanted` now means: user self-identifies as baptized member (any Firestore status except investigator).
 */
export type TrainingUnlockStage = 'seeking' | 'covenanted';

/**
 * True when profile indicates the user chose the baptized-member path (not ecclesiastical verification).
 */
export function isMemberSpiritualPath(status: MemberStatus | undefined): boolean {
  return status !== undefined && status !== 'investigator';
}

/**
 * Firestore-backed spiritual path for UI (home, profile shell, progress, training tab).
 */
export function useMemberSpiritualPath(): {
  memberStatus: MemberStatus | undefined;
  isBaptizedMemberPath: boolean;
  trainingUnlockStage: TrainingUnlockStage;
} {
  const { profile } = useAuth();
  const memberStatus = profile?.memberStatus;
  const isBaptizedMemberPath = isMemberSpiritualPath(memberStatus);
  return {
    memberStatus,
    isBaptizedMemberPath,
    trainingUnlockStage: isBaptizedMemberPath ? 'covenanted' : 'seeking',
  };
}

/** @deprecated Prefer useMemberSpiritualPath().trainingUnlockStage */
export function useTrainingUnlockStage(): TrainingUnlockStage {
  return useMemberSpiritualPath().trainingUnlockStage;
}
