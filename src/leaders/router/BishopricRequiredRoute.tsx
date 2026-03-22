/**
 * Bishopric Required Route
 *
 * Restringe acceso a usuarios con rol de obispado (obispo, consejeros, secretario).
 * Redirige a / si no es bishopric.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { LEADERS_APP } from '../leadersPaths';
import { useUserRoleStore } from '../state/user/useUserRoleStore';

interface BishopricRequiredRouteProps {
  children: React.ReactNode;
}

const BishopricRequiredRoute: React.FC<BishopricRequiredRouteProps> = ({ children }) => {
  const isBishopric = useUserRoleStore((s) => s.isBishopric);

  if (!isBishopric()) {
    return <Navigate to={LEADERS_APP} replace />;
  }

  return <>{children}</>;
};

export default BishopricRequiredRoute;
