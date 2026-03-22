import React from 'react';
import { useMemberSpiritualPath } from '../../hooks/useMemberSpiritualPath';
import InvestigatorProfilePage from '../../modules/investigator/pages/InvestigatorProfilePage';
import NewMemberProfilePage from '../../modules/new-member/pages/NewMemberProfilePage';

/**
 * Profile Entry Page
 * Shows different profile views based on Firestore memberStatus (self-reported path).
 */
export default function ProfileEntryPage(): JSX.Element {
  const { isBaptizedMemberPath } = useMemberSpiritualPath();

  if (isBaptizedMemberPath) {
    return <NewMemberProfilePage />;
  }

  // Default: seeking
  return <InvestigatorProfilePage />;
}
