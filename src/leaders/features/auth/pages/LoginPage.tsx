/**
 * Leaders login — uses main app Firebase Auth (email/password and Google).
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SiGoogle } from 'react-icons/si';
import { useAuth } from '../../../../context/AuthContext';
import { useI18n } from '../../../context/I18nContext';
import { LEADERS_APP, LEADERS_ROOT } from '../../../leadersPaths';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const { signInWithEmail, signInWithGoogle, user, isLoading } = useAuth();
  const { t } = useI18n();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && !isLoading) {
      const target =
        returnTo && returnTo.startsWith('/') && returnTo.startsWith(LEADERS_ROOT)
          ? returnTo
          : LEADERS_APP;
      navigate(target, { replace: true });
    }
  }, [user, isLoading, navigate, returnTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password.trim()) {
      setLocalError(t('auth.login.errors.completeAllFields'));
      return;
    }

    try {
      setSubmitting(true);
      await signInWithEmail(email.trim(), password);
    } catch {
      setLocalError(t('auth.login.errors.invalidCredentials'));
    } finally {
      setSubmitting(false);
    }
  };

  const googleErrorMessage = (err: unknown): string => {
    const code =
      typeof err === 'object' && err !== null && 'code' in err
        ? String((err as { code?: string }).code)
        : '';
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
      return t('app.register.errors.googlePopupClosed');
    }
    if (code === 'auth/popup-blocked') {
      return t('app.register.errors.googlePopupBlocked');
    }
    return t('app.register.errors.googleGeneric');
  };

  const handleGoogle = async () => {
    setLocalError(null);
    try {
      setSubmitting(true);
      await signInWithGoogle();
    } catch (err: unknown) {
      console.error('Leaders Google login:', err);
      setLocalError(googleErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const busy = submitting || isLoading;
  const displayError = localError;

  return (
    <div className="login-page leaders-mint-page leaders-mint-page--inset">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">👔</div>
          <h1 className="login-title">{t('auth.login.title')}</h1>
          <p className="login-subtitle">{t('auth.login.subtitle')}</p>
        </div>

        <div className="login-oauth">
          <button
            type="button"
            className="login-google-btn"
            onClick={() => void handleGoogle()}
            disabled={busy}
          >
            <SiGoogle className="login-google-icon" aria-hidden />
            {busy ? t('app.register.googleLoading') : t('app.register.googleContinue')}
          </button>
        </div>

        <div className="login-divider" role="presentation">
          <span>{t('app.register.orWithEmail')}</span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {t('auth.login.emailLabel')}
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.login.emailPlaceholder')}
              autoComplete="email"
              disabled={busy}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              {t('auth.login.passwordLabel')}
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={busy}
            />
          </div>

          {displayError && <div className="form-error">{displayError}</div>}

          <button type="submit" className="login-button" disabled={busy}>
            {busy ? <span className="loading-spinner">⏳</span> : t('auth.login.submit')}
          </button>
        </form>

        <div className="login-footer">
          <div className="login-info">
            <span className="info-icon">ℹ️</span>
            <p className="info-text">
              {t('auth.login.infoText')}
              <strong> xTheGospel</strong>
            </p>
          </div>
          <p className="info-subtext">
            {t('auth.login.noAccountPrefix')}{' '}
            <a href="/register" className="info-link">
              xTheGospel
            </a>
            {' '}
            {t('auth.login.noAccountSuffix')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
