import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRoleStore } from '../store/useRoleStore';
import { RoleSelectionScreen } from '../pages/auth/RoleSelectionScreen';
import RegisterPage from '../pages/RegisterPage';
import OnboardingPage from '../pages/OnboardingPage';
import InvestigatorLayout from '../layouts/LearningLayout';
import MemberLayout from '../layouts/MemberLayout';
import LoadingScreen from '../components/LoadingScreen';
import { PrivacyPage } from '../pages/legal/PrivacyPage';
import { TermsPage } from '../pages/legal/TermsPage';
import { SupportPage } from '../pages/support/SupportPage';

// Strangler Fig: New Investigator module (MVP)
import InvestigatorRoutes from './InvestigatorRoutes';

// Strangler Fig: New Member (Vineyard) module (MVP)
import NewMemberRoutes from './NewMemberRoutes';

// Unified Routes: profile.memberStatus drives investigator vs member home/training
import UnifiedRoutes from './UnifiedRoutes';
import { LeadersRoutesBranch } from './LeadersRouteGroup';
import { ProtectedRoute } from './ProtectedRoute';
import { IncompleteProfileGuard } from './IncompleteProfileGuard';
import { StorageService } from '../utils/storage';
import { FIRST_OPEN_WELCOME_KEY } from '../config/welcome';
import FirstOpenWelcome from '../components/FirstOpenWelcome';

const AppRouter: React.FC = () => {
  const { userRole, isLoading } = useAuth();
  const location = useLocation();
  const appRole = useRoleStore((s) => s.role);
  const isHydrated = useRoleStore((s) => s.isHydrated);
  const hydrateRole = useRoleStore((s) => s.hydrateRole);

  useEffect(() => {
    if (!isHydrated) {
      hydrateRole();
    }
  }, [isHydrated, hydrateRole]);

  console.log('🔀 AppRouter - userRole:', userRole, 'appRole:', appRole, 'isLoading:', isLoading, 'pathname:', location.pathname);

  if (isLoading || !isHydrated) {
    console.log('⏳ Mostrando pantalla de carga...');
    return <LoadingScreen />;
  }

  const hasSeenWelcome = StorageService.getItem(FIRST_OPEN_WELCOME_KEY) === 'true';
  if (!hasSeenWelcome && location.pathname !== '/welcome') {
    return <Navigate to="/welcome" replace />;
  }
  if (hasSeenWelcome && location.pathname === '/welcome') {
    return <Navigate to="/register" replace />;
  }

  // Check if user is on a unified route (these are always accessible regardless of userRole)
  const isOnUnifiedRoute =
    location.pathname === '/' ||
    location.pathname.startsWith('/home') ||
    location.pathname.startsWith('/lessons') ||
    location.pathname.startsWith('/study') ||
    location.pathname.startsWith('/journal') ||
    location.pathname.startsWith('/progress') ||
    location.pathname.startsWith('/profile') ||
    location.pathname.startsWith('/friends') ||
    location.pathname.startsWith('/training') ||
    location.pathname.startsWith('/leaders');

  // Skip role-based redirects for unified routes - let them pass through
  if (!isOnUnifiedRoute && userRole) {
    // LEGACY ROUTE PROTECTION: Only applies to legacy routes (/member, etc.)
    const defaultRoute = '/home';
    const isOnMemberRoute = location.pathname.startsWith('/member');
    const isOnMissionaryRoute = location.pathname.startsWith('/missionary');

    // Old missionary app URLs → unified home
    if (isOnMissionaryRoute) {
      return <Navigate to={defaultRoute} replace />;
    }

    // Redirect non-member users away from member routes
    if (userRole !== 'member' && isOnMemberRoute) {
      return <Navigate to={defaultRoute} replace />;
    }
  }

  return (
    <Routes>
      {/* ROOT: Redirect to unified home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* First open welcome */}
      <Route path="/welcome" element={<FirstOpenWelcome />} />

      {/* UNIFIED ROUTES: Main app flow - stage-based content switching */}
      <Route
        path="/home/*"
        element={
          <IncompleteProfileGuard>
            <UnifiedRoutes />
          </IncompleteProfileGuard>
        }
      />
      <Route
        path="/lessons/*"
        element={
          <IncompleteProfileGuard>
            <UnifiedRoutes />
          </IncompleteProfileGuard>
        }
      />
      <Route path="/study/*" element={<ProtectedRoute><UnifiedRoutes /></ProtectedRoute>} />
      <Route path="/journal/*" element={<ProtectedRoute><UnifiedRoutes /></ProtectedRoute>} />
      <Route path="/progress/*" element={<ProtectedRoute><UnifiedRoutes /></ProtectedRoute>} />
      <Route path="/profile/*" element={<ProtectedRoute><UnifiedRoutes /></ProtectedRoute>} />
      <Route path="/friends/*" element={<ProtectedRoute><UnifiedRoutes /></ProtectedRoute>} />
      <Route path="/training/*" element={<ProtectedRoute><UnifiedRoutes /></ProtectedRoute>} />

      {/* Auth: Registration and Login with Firebase */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<RegisterPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      <Route path="/leaders/*" element={<LeadersRoutesBranch />} />

      {/* LEGACY: Auth/Role selection - moved to /legacy/auth */}
      <Route path="/legacy/auth" element={<RoleSelectionScreen />} />
      <Route path="/auth" element={<Navigate to="/register" replace />} />

      {/* DEV-ONLY: Direct module access (keep for testing) */}
      <Route path="/investigator/*" element={<InvestigatorRoutes />} />
      <Route path="/new-member/*" element={<NewMemberRoutes />} />

      {/* Legal pages - accessible to everyone */}
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/support" element={<SupportPage />} />

      {/* LEGACY ROLE-BASED LAYOUTS */}
      {userRole ? (
        userRole === 'investigator' ? (
          <Route path="/legacy/*" element={<InvestigatorLayout />} />
        ) : (
          <Route path="/member/*" element={<MemberLayout />} />
        )
      ) : null}

      {/* Catch-all: redirect unknown routes to unified home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRouter;
