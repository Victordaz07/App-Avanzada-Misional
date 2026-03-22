import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { LEADERS_ROOT } from '../leaders/leadersPaths';
import { I18nProvider as LeadersI18nProvider } from '../leaders/context/I18nContext';

const FirstOpenWelcome = lazy(() => import('../leaders/components/FirstOpenWelcome'));
const LoginPage = lazy(() => import('../leaders/features/auth/pages/LoginPage'));
const RoleSelectionPage = lazy(() => import('../leaders/features/auth/pages/RoleSelectionPage'));
const WardSetupPage = lazy(() => import('../leaders/features/ward/pages/WardSetupPage'));
const JoinSessionPage = lazy(() => import('../leaders/features/teachingSessions/pages/JoinSessionPage'));
const SessionParticipantLiveView = lazy(
  () => import('../leaders/features/teachingSessions/pages/SessionParticipantLiveView')
);
const LeadersAppRoutes = lazy(() => import('../leaders/router/LeadersAppRoutes'));

import LeadersProtectedRoute from '../leaders/router/ProtectedRoute';
import RoleRequiredRoute from '../leaders/router/RoleRequiredRoute';
import WardRequiredRoute from '../leaders/router/WardRequiredRoute';
import LeadersTabShell from '../leaders/layouts/LeadersTabShell';

const leadersSuspense = (node: React.ReactNode) => (
  <Suspense fallback={<LoadingScreen />}>{node}</Suspense>
);

/**
 * Nested routes under /leaders/*. Must be rendered as element={...} of a parent <Route path="/leaders/*" /> —
 * React Router v6 only allows <Route> or <Fragment> as direct children of the root <Routes>.
 */
function LeadersNestedRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index element={<Navigate to={`${LEADERS_ROOT}/login`} replace />} />
      <Route path="welcome" element={leadersSuspense(<FirstOpenWelcome />)} />
      <Route path="login" element={leadersSuspense(<LoginPage />)} />
      <Route path="join" element={leadersSuspense(<JoinSessionPage />)} />
      <Route
        path="session/:wardId/:sessionId/live"
        element={leadersSuspense(
          <LeadersProtectedRoute>
            <SessionParticipantLiveView />
          </LeadersProtectedRoute>
        )}
      />
      <Route
        path="select-role"
        element={leadersSuspense(
          <LeadersProtectedRoute>
            <RoleSelectionPage />
          </LeadersProtectedRoute>
        )}
      />
      <Route
        element={
          <LeadersProtectedRoute>
            <RoleRequiredRoute>
              <LeadersTabShell />
            </RoleRequiredRoute>
          </LeadersProtectedRoute>
        }
      >
        <Route path="ward-setup" element={<WardSetupPage />} />
        <Route
          path="app/*"
          element={
            <WardRequiredRoute>
              <LeadersAppRoutes />
            </WardRequiredRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={`${LEADERS_ROOT}/login`} replace />} />
    </Routes>
  );
}

/**
 * Content for <Route path="/leaders/*" element={<LeadersRoutesBranch />} /> in AppRouter.
 * Do not render as <LeadersRoutesBranch /> as a direct child of <Routes> — RR v6 only accepts
 * the literal <Route> component there, not a wrapper that returns <Route>.
 */
export function LeadersRoutesBranch(): JSX.Element {
  return (
    <LeadersI18nProvider>
      <LeadersNestedRoutes />
    </LeadersI18nProvider>
  );
}
