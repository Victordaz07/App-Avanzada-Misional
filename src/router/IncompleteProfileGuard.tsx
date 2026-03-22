import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/LoadingScreen';
import { isProfileFullyOnboarded } from '../types/user';
import { pathAllowsIncompleteProfile } from './onboardingAllowedPaths';

/**
 * Redirects authenticated users with incomplete onboarding away from main app shells.
 * Anonymous users pass through (e.g. public home preview if ever enabled).
 */
export function IncompleteProfileGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user && profile && !isProfileFullyOnboarded(profile)) {
    const path = location.pathname;
    if (!pathAllowsIncompleteProfile(path)) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      return <Navigate to={`/onboarding?redirect=${redirect}`} replace />;
    }
  }

  return <>{children}</>;
}
