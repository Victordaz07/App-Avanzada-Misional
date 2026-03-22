/**
 * Nested routes under /leaders/app/* (relative segment after /leaders/app).
 */
import React from 'react';
import LeadershipCallingsRoutes from './LeadershipCallingsRoutes';

export default function LeadersAppRoutes(): JSX.Element {
  return <LeadershipCallingsRoutes />;
}
