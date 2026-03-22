import React from 'react';
import { useMemberSpiritualPath } from '../../hooks/useMemberSpiritualPath';
import InvestigatorHomePage from '../../modules/investigator/pages/InvestigatorHomePage';
import NewMemberHomePage from '../../modules/new-member/pages/NewMemberHomePage';

/**
 * Home Entry Page
 * Renders investigator vs new-member home from profile.memberStatus (see useMemberSpiritualPath).
 */
export default function HomeEntryPage(): JSX.Element {
  const { isBaptizedMemberPath } = useMemberSpiritualPath();

  if (isBaptizedMemberPath) {
    return <NewMemberHomePage />;
  }

  // Default: seeking
  return <InvestigatorHomePage />;
}
