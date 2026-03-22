/**
 * Ward context route — ya no bloquea el acceso.
 * Intenta cargar membresía en segundo plano; sin barrio, la app queda en modo exploración
 * (dashboard, guías, UI) y las funciones que requieren wardId muestran estado vacío amable.
 */

import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { useWardStore } from '../state/ward/useWardStore';
import { useWardLoadStatusStore } from '../state/ward/useWardLoadStatusStore';
import '../layouts/LeadershipCallingsLayout.css';

interface WardRequiredRouteProps {
  children: React.ReactNode;
}

const WardRequiredRoute: React.FC<WardRequiredRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const { isWardMember, isLoading, loadWardMembership } = useWardStore();
  const { status, errorMessage, isStale, clearError } = useWardLoadStatusStore();
  useEffect(() => {
    if (user && !isWardMember) {
      loadWardMembership(user.uid);
    }
  }, [user, isWardMember, loadWardMembership]);

  const handleRetry = () => {
    clearError();
    if (user) loadWardMembership(user.uid);
  };

  // Con barrio confirmado: breve carga mientras se refresca membresía
  if (isWardMember && (isLoading || status === 'loading')) {
    return (
      <div
        className="ward-load-screen"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1F3A5F 0%, #162541 100%)',
          color: 'white',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
        <div style={{ fontSize: '16px', opacity: 0.8 }}>{t('ward.exploration.loadingWard')}</div>
      </div>
    );
  }

  if (!isWardMember) {
    return (
      <>
        {status === 'offline' && (
          <div className="ward-explore-banner ward-explore-banner--offline" role="status">
            {t('ward.exploration.offlineBanner')}
          </div>
        )}
        {status === 'error' && (
          <div className="ward-explore-banner ward-explore-banner--error" role="alert">
            <span className="ward-explore-banner__text">
              {errorMessage || t('ward.exploration.errorGeneric')}
            </span>
            <button type="button" className="ward-explore-banner__retry" onClick={handleRetry}>
              {t('ward.exploration.retry')}
            </button>
          </div>
        )}
        {children}
      </>
    );
  }

  return (
    <>
      {isStale && (
        <div
          className="ward-stale-banner"
          role="status"
          style={{
            padding: '8px 16px',
            fontSize: 13,
            textAlign: 'center',
            background: '#F59E0B',
            color: '#1F2937',
          }}
        >
          {t('ward.exploration.staleBanner')}
        </div>
      )}
      {children}
    </>
  );
};

export default WardRequiredRoute;
