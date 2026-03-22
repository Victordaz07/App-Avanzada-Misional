/**
 * Leaders subtree — requires Firebase user (main app AuthContext).
 */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LEADERS_ROOT } from '../leadersPaths';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const LeadersProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-content">
          <div className="auth-loading-spinner">⏳</div>
          <p>Cargando...</p>
        </div>
        <style>{`
          .auth-loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1F3A5F 0%, #162541 100%);
          }
          .auth-loading-content {
            text-align: center;
            color: #FFFFFF;
          }
          .auth-loading-spinner {
            font-size: 48px;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }
          .auth-loading-content p {
            font-size: 16px;
            margin: 0;
            opacity: 0.8;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${LEADERS_ROOT}/login?returnTo=${redirect}`} replace />;
  }

  return <>{children}</>;
};

export default LeadersProtectedRoute;
