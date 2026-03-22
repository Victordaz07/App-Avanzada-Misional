import React from 'react';
import { useLocation } from 'react-router-dom';
import { useMemberSpiritualPath } from '../../hooks/useMemberSpiritualPath';
import BaptismPreparationScreen from '../../modules/investigator/pages/BaptismPreparationScreen';
import InvestigatorProgressPage from '../../modules/investigator/pages/InvestigatorProgressPage';
import NewMemberProgressPage from '../../modules/new-member/pages/NewMemberProgressPage';

/**
 * Progress Entry Page
 * /progress + friend path → BaptismPreparationScreen
 * /progress/baptism-preparation → BaptismPreparationScreen (alias)
 */
export default function ProgressEntryPage(): JSX.Element {
  const location = useLocation();
  const { isBaptizedMemberPath } = useMemberSpiritualPath();
  const path = location.pathname;

  if (path === '/progress/baptism-preparation') return <BaptismPreparationScreen />;
  if (path === '/progress' && !isBaptizedMemberPath) return <BaptismPreparationScreen />;
  if (isBaptizedMemberPath) return <NewMemberProgressPage />;

  return <InvestigatorProgressPage />;
}
