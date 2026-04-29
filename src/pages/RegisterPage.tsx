/**
 * RegisterPage - Modern xTheGospel Registration
 *
 * Registration flow:
 * 1. Login (default) - for existing users
 * 2. Select type - "Estoy conociendo la iglesia" vs "Ya soy miembro"
 * 3. Signup form - with ward code for members
 * 4. Onboarding (/onboarding) - required for email and Google sign-in
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaSpinner,
  FaSeedling,
  FaChurch,
  FaHashtag,
} from 'react-icons/fa6';
import { SiGoogle } from 'react-icons/si';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { isProfileFullyOnboarded } from '../types/user';
import { getPostLoginDestination } from '../utils/authRedirect';
import './RegisterPage.css';

type RegisterMode = 'login' | 'select-type' | 'signup-friend' | 'signup-member';

function meetsPasswordPolicy(pw: string): boolean {
  if (pw.length < 8) return false;
  if (!/\d/.test(pw)) return false;
  if (!/[^A-Za-z0-9]/.test(pw)) return false;
  return true;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useI18n();
  const { signUpWithEmail, signInWithEmail, signInWithGoogle, login, profile, user } = useAuth();
  
  const [mode, setMode] = useState<RegisterMode>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wardCode, setWardCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMember, setIsMember] = useState(false);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setWardCode('');
    setError(null);
  };

  const googleErrorMessage = (err: unknown): string => {
    const rawCode =
      typeof err === 'object' && err !== null && 'code' in err
        ? String((err as { code?: string }).code)
        : '';
    const msg =
      typeof err === 'object' && err !== null && 'message' in err
        ? String((err as { message?: string }).message)
        : '';
    const code =
      rawCode ||
      (msg.includes('unauthorized-domain') ? 'auth/unauthorized-domain' : '');
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
      return t('app.register.errors.googlePopupClosed');
    }
    if (code === 'auth/popup-blocked') {
      return t('app.register.errors.googlePopupBlocked');
    }
    if (code === 'auth/unauthorized-domain') {
      return t('app.register.errors.googleUnauthorizedDomain', {
        domain: typeof window !== 'undefined' ? window.location.hostname : '',
      });
    }
    return t('app.register.errors.googleGeneric');
  };

  useEffect(() => {
    if (!user || !profile) return;
    if (!isProfileFullyOnboarded(profile)) {
      const dest = getPostLoginDestination(searchParams);
      navigate(
        `/onboarding?redirect=${encodeURIComponent(dest)}`,
        { replace: true },
      );
    }
  }, [user, profile, navigate, searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError(t('app.register.errors.fillAll'));
      return;
    }

    try {
      setLoading(true);
      await signInWithEmail(email, password);
      const destination = getPostLoginDestination(searchParams);
      navigate(destination, { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found') {
        setError(t('app.register.errors.userNotFound'));
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError(t('app.register.errors.wrongPassword'));
      } else if (err.code === 'auth/invalid-email') {
        setError(t('app.register.errors.invalidEmail'));
      } else {
        setError(err.message || t('app.register.errors.loginGeneric'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError(t('app.register.errors.nameRequired'));
      return;
    }
    if (!email.trim()) {
      setError(t('app.register.errors.emailRequired'));
      return;
    }
    if (!meetsPasswordPolicy(password)) {
      setError(t('app.register.errors.passwordPolicy'));
      return;
    }

    // If member with ward code, validate it first
    // TODO: Implement ward code validation when service is ready
    if (isMember && wardCode.trim()) {
      // For now, just log it - will validate when wardCodeService is ready
      console.log('Ward code provided:', wardCode);
    }

    try {
      setLoading(true);
      // Pass isMember flag to set correct memberStatus
      await signUpWithEmail(email, password, fullName, isMember);

      await login(isMember ? 'member' : 'investigator');

      const dest = getPostLoginDestination(searchParams);
      navigate(`/onboarding?redirect=${encodeURIComponent(dest)}`, { replace: true });
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError(t('app.register.errors.emailInUse'));
      } else if (err.code === 'auth/invalid-email') {
        setError(t('app.register.errors.invalidEmail'));
      } else if (err.code === 'auth/weak-password') {
        setError(t('app.register.errors.weakPassword'));
      } else {
        setError(err.message || t('app.register.errors.signupGeneric'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      setLoading(true);
      await signInWithGoogle();
      const destination = getPostLoginDestination(searchParams);
      navigate(destination, { replace: true });
    } catch (err: unknown) {
      console.error('Google login error:', err);
      setError(googleErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSelectType = (memberType: boolean) => {
    setIsMember(memberType);
    resetForm();
    setMode(memberType ? 'signup-member' : 'signup-friend');
  };

  // Login Form (Default)
  const renderLogin = () => (
    <div className="reg-container">
      <div className="reg-header">
        <div className="reg-logo">
          <span className="reg-logo-icon">✦</span>
        </div>
        <h1 className="reg-title">{t('app.register.loginTitle')}</h1>
        <p className="reg-subtitle">{t('app.register.loginSubtitle')}</p>
      </div>

      <div className="reg-oauth reg-oauth--first">
        <button
          type="button"
          className="reg-google-btn"
          onClick={() => void handleGoogleLogin()}
          disabled={loading}
        >
          <SiGoogle className="reg-google-icon" aria-hidden />
          {loading ? t('app.register.googleLoading') : t('app.register.googleContinue')}
        </button>
      </div>

      <div className="reg-divider" role="presentation">
        <span>{t('app.register.orWithEmail')}</span>
      </div>

      <form className="reg-form" onSubmit={handleLogin}>
        <div className="reg-field">
          <label>{t('app.register.emailLabel')}</label>
          <div className="reg-input-wrapper">
            <FaEnvelope className="reg-input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('app.register.emailPlaceholder')}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="reg-field">
          <label>{t('app.register.passwordLabel')}</label>
          <div className="reg-input-wrapper">
            <FaLock className="reg-input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('app.register.passwordPlaceholder')}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="reg-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button type="button" className="reg-forgot">
          {t('app.register.forgotPassword')}
        </button>

        {error && (
          <div className="reg-error">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="reg-submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="reg-spinner" />
              {t('app.register.loginLoading')}
            </>
          ) : (
            t('app.register.loginSubmit')
          )}
        </button>
      </form>

      <p className="reg-switch">
        {t('app.register.noAccount')}{' '}
        <button type="button" onClick={() => { setMode('select-type'); setError(null); }}>
          {t('app.register.createAccountLink')}
        </button>
      </p>
    </div>
  );

  // Select Type Screen - Friend or Member
  const renderSelectType = () => (
    <div className="reg-container">
      <button className="reg-back" onClick={() => { setMode('login'); setError(null); }}>
        <FaArrowLeft />
        <span>{t('app.register.back')}</span>
      </button>

      <div className="reg-header">
        <div className="reg-logo">
          <span className="reg-logo-icon">✦</span>
        </div>
        <h1 className="reg-title">{t('app.register.selectTypeTitle')}</h1>
        <p className="reg-subtitle">{t('app.register.selectTypeSubtitle')}</p>
      </div>

      <div className="reg-type-options">
        <button 
          className="reg-type-option"
          onClick={() => handleSelectType(false)}
        >
          <div className="reg-type-icon reg-type-icon--friend">
            <FaSeedling />
          </div>
          <div className="reg-type-content">
            <h3>{t('app.register.friendOptionTitle')}</h3>
            <p>{t('app.register.friendOptionDesc')}</p>
          </div>
          <span className="reg-type-arrow">→</span>
        </button>

        <button 
          className="reg-type-option"
          onClick={() => handleSelectType(true)}
        >
          <div className="reg-type-icon reg-type-icon--member">
            <FaChurch />
          </div>
          <div className="reg-type-content">
            <h3>{t('app.register.memberOptionTitle')}</h3>
            <p>{t('app.register.memberOptionDesc')}</p>
          </div>
          <span className="reg-type-arrow">→</span>
        </button>
      </div>

      <div className="reg-footer">
        <p className="reg-footer-note">
          {t('app.register.selectTypeFooter')}
        </p>
      </div>
    </div>
  );

  // Signup Form for Friends (Conociendo la iglesia)
  const renderSignupFriend = () => (
    <div className="reg-container">
      <button className="reg-back" onClick={() => { setMode('select-type'); setError(null); }}>
        <FaArrowLeft />
        <span>{t('app.register.back')}</span>
      </button>

      <div className="reg-header reg-header--compact">
        <div className="reg-type-badge reg-type-badge--friend">
          <FaSeedling />
          <span>{t('app.register.badgeFriend')}</span>
        </div>
        <h1 className="reg-title">{t('app.register.signupTitle')}</h1>
        <p className="reg-subtitle">{t('app.register.signupFriendSubtitle')}</p>
      </div>

      <div className="reg-oauth reg-oauth--first">
        <button
          type="button"
          className="reg-google-btn"
          onClick={() => void handleGoogleLogin()}
          disabled={loading}
        >
          <SiGoogle className="reg-google-icon" aria-hidden />
          {loading ? t('app.register.googleLoading') : t('app.register.googleContinue')}
        </button>
      </div>

      <div className="reg-divider" role="presentation">
        <span>{t('app.register.orWithEmail')}</span>
      </div>

      <form className="reg-form" onSubmit={handleSignup}>
        <div className="reg-field">
          <label>{t('app.register.fullNameLabel')}</label>
          <div className="reg-input-wrapper">
            <FaUser className="reg-input-icon" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('app.register.namePlaceholder')}
              autoComplete="name"
            />
          </div>
        </div>

        <div className="reg-field">
          <label>{t('app.register.emailLabel')}</label>
          <div className="reg-input-wrapper">
            <FaEnvelope className="reg-input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('app.register.emailPlaceholder')}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="reg-field">
          <label>{t('app.register.passwordLabel')}</label>
          <div className="reg-input-wrapper">
            <FaLock className="reg-input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('app.register.passwordMinPlaceholder')}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="reg-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {error && (
          <div className="reg-error">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="reg-submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="reg-spinner" />
              {t('app.register.creatingAccount')}
            </>
          ) : (
            t('app.register.createSubmit')
          )}
        </button>
      </form>

      <p className="reg-terms">
        {t('app.register.termsPrefix')}{' '}
        <a href="/terms">{t('app.register.termsLink')}</a> {t('app.register.termsAnd')}{' '}
        <a href="/privacy">{t('app.register.privacyLink')}</a>
      </p>
    </div>
  );

  // Signup Form for Members
  const renderSignupMember = () => (
    <div className="reg-container">
      <button className="reg-back" onClick={() => { setMode('select-type'); setError(null); }}>
        <FaArrowLeft />
        <span>{t('app.register.back')}</span>
      </button>

      <div className="reg-header reg-header--compact">
        <div className="reg-type-badge reg-type-badge--member">
          <FaChurch />
          <span>{t('app.register.badgeMember')}</span>
        </div>
        <h1 className="reg-title">{t('app.register.signupTitle')}</h1>
        <p className="reg-subtitle">{t('app.register.signupMemberSubtitle')}</p>
      </div>

      <div className="reg-oauth reg-oauth--first">
        <button
          type="button"
          className="reg-google-btn"
          onClick={() => void handleGoogleLogin()}
          disabled={loading}
        >
          <SiGoogle className="reg-google-icon" aria-hidden />
          {loading ? t('app.register.googleLoading') : t('app.register.googleContinue')}
        </button>
      </div>

      <div className="reg-divider" role="presentation">
        <span>{t('app.register.orWithEmail')}</span>
      </div>

      <form className="reg-form" onSubmit={handleSignup}>
        <div className="reg-field">
          <label>{t('app.register.fullNameLabel')}</label>
          <div className="reg-input-wrapper">
            <FaUser className="reg-input-icon" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('app.register.namePlaceholder')}
              autoComplete="name"
            />
          </div>
        </div>

        <div className="reg-field">
          <label>{t('app.register.emailLabel')}</label>
          <div className="reg-input-wrapper">
            <FaEnvelope className="reg-input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('app.register.emailPlaceholder')}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="reg-field">
          <label>{t('app.register.passwordLabel')}</label>
          <div className="reg-input-wrapper">
            <FaLock className="reg-input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('app.register.passwordMinPlaceholder')}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="reg-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="reg-field">
          <label>
            {t('app.register.wardCodeLabel')}{' '}
            <span className="reg-optional">{t('app.register.wardOptional')}</span>
          </label>
          <div className="reg-input-wrapper">
            <FaHashtag className="reg-input-icon" />
            <input
              type="text"
              value={wardCode}
              onChange={(e) => setWardCode(e.target.value.toUpperCase())}
              placeholder={t('app.register.wardPlaceholder')}
              autoComplete="off"
            />
          </div>
          <p className="reg-field-hint">
            {t('app.register.wardHint')}
          </p>
        </div>

        {error && (
          <div className="reg-error">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="reg-submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="reg-spinner" />
              {t('app.register.creatingAccount')}
            </>
          ) : (
            t('app.register.createSubmit')
          )}
        </button>
      </form>

      <div className="reg-footer">
        <p className="reg-footer-note">
          {t('app.register.memberFooterNote')}
        </p>
      </div>

      <p className="reg-terms">
        {t('app.register.termsPrefix')}{' '}
        <a href="/terms">{t('app.register.termsLink')}</a> {t('app.register.termsAnd')}{' '}
        <a href="/privacy">{t('app.register.privacyLink')}</a>
      </p>
    </div>
  );

  return (
    <div className="reg-page">
      {mode === 'login' && renderLogin()}
      {mode === 'select-type' && renderSelectType()}
      {mode === 'signup-friend' && renderSignupFriend()}
      {mode === 'signup-member' && renderSignupMember()}
    </div>
  );
};

export default RegisterPage;
