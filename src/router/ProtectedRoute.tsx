/**
 * ProtectedRoute - Rutas que requieren autenticación
 *
 * Si el usuario no está autenticado → redirige a /login?redirect=...
 * Si está autenticado → renderiza children
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/LoadingScreen';
import { isProfileFullyOnboarded } from '../types/user';
import { pathAllowsIncompleteProfile } from './onboardingAllowedPaths';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  if (profile && !isProfileFullyOnboarded(profile)) {
    const path = location.pathname;
    if (!pathAllowsIncompleteProfile(path)) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      return <Navigate to={`/onboarding?redirect=${redirect}`} replace />;
    }
  }

  return <>{children}</>;
}
