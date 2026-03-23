import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';

interface PageProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  rightIcon?: string;
  /** Muestra «Volver / Back» (historial o ruta de respaldo). */
  showBack?: boolean;
  /** Si no hay entradas previas en la pila de React Router (`idx`), navegar aquí. */
  backFallbackTo?: string;
  children: React.ReactNode;
}

export const XtgPage: React.FC<PageProps> = ({
  title,
  subtitle,
  badge,
  rightIcon,
  showBack = false,
  backFallbackTo = '/home',
  children,
}) => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const backLabel = t('app.common.back');

  const handleBack = useCallback(() => {
    const state = window.history.state as { idx?: number } | null;
    const canPop = typeof state?.idx === 'number' && state.idx > 0;
    if (canPop) {
      navigate(-1);
      return;
    }
    navigate(backFallbackTo);
  }, [navigate, backFallbackTo]);

  return (
    <div className="xtg-page">
      {showBack ? (
        <div className="xtg-page-back-row">
          <button type="button" className="xtg-page-back" onClick={handleBack} aria-label={backLabel}>
            <FaArrowLeft aria-hidden />
            <span>{backLabel}</span>
          </button>
        </div>
      ) : null}
      {(title || subtitle || badge || rightIcon) && (
        <header className="xtg-page-header">
          <div className="xtg-page-header-content">
            <div>
              {badge && <span className="xtg-badge">{badge}</span>}
              {title && <h1 className="xtg-page-title">{title}</h1>}
              {subtitle && <p className="xtg-page-subtitle">{subtitle}</p>}
            </div>
            {rightIcon && (
              <div className="xtg-page-right-icon">
                {rightIcon === 'bell' && '🔔'}
              </div>
            )}
          </div>
        </header>
      )}
      {children}
    </div>
  );
};

