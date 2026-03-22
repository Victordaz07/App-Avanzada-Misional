import React, { useState, useMemo, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useI18n, Locale } from '../../context/I18nContext';
import { useRoleStore } from '../../store/useRoleStore';
import { XtgPage } from '../../components/layout/XtgPage';
import { XtgCard } from '../../components/ui/XtgCard';
import { DataPrivacySection } from '../../components/profile/DataPrivacySection';
import { LANGUAGE_OPTIONS } from '../../i18n/locales';
import { LanguageSelectModal } from '../../components/ui/LanguageSelectModal';
import '../../styles/xthegospel-ui.css';
import './MissionaryProfileScreen.css';

type ActiveAppRole = 'INVESTIGATOR' | 'MEMBER';

const DEFAULT_AVATAR =
  'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg';

const MP = 'app.missionaryProfileWeb';

export const MissionaryProfileScreen: React.FC = () => {
  const { userRole, logout } = useAuth();
  const { locale, setLocale, t } = useI18n();
  const navigate = useNavigate();
  const appRole = useRoleStore(s => s.role);
  const setRole = useRoleStore(s => s.setRole);

  const [formState, setFormState] = useState({
    fullName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 987-6543',
    address: '123 Mission Street · Salt Lake City, UT',
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    DEFAULT_AVATAR,
  );

  const activeAppRole: ActiveAppRole = useMemo(() => {
    if (userRole === 'investigator') return 'INVESTIGATOR';
    return 'MEMBER';
  }, [userRole]);

  const memberSinceLabel = useMemo(() => {
    const date = new Date('2023-06-01');
    return new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(date);
  }, [locale]);

  const handleChange =
    (field: keyof typeof formState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState(prev => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setShowSavedMessage(false);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSavingProfile(false);
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 3000);
  };

  const handleChangeActiveRole = () => {
    navigate('/register');
  };

  const handleChangeLanguage = () => {
    setShowLanguageModal(true);
  };

  const handleLanguageSelect = async (code: Locale) => {
    await setLocale(code);
    setShowLanguageModal(false);
  };

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const appRoleLabel =
    activeAppRole === 'INVESTIGATOR'
      ? t(`${MP}.roleFriend`)
      : t(`${MP}.roleMember`);

  const settingsRoleSummary =
    userRole === 'member' && appRole === 'leader'
      ? t(`${MP}.wardLeadershipActiveTitle`)
      : appRoleLabel;

  const currentLanguage = LANGUAGE_OPTIONS.find((opt) => opt.code === locale);
  const langLabel = currentLanguage
    ? `${currentLanguage.shortCode} ${currentLanguage.label}`
    : t(`${MP}.defaultLanguageLabel`);

  return (
    <div className="xtg-screen xtg-profile-screen">
      <XtgPage title={t(`${MP}.pageTitle`)} subtitle={t(`${MP}.pageSubtitle`)}>
        <div className="xtg-section xtg-stack-lg">
          <section className="xtg-card xtg-profile-identity-card">
            <div className="xtg-profile-identity-main">
              <div className="xtg-profile-avatar-wrapper">
                <div className="xtg-profile-avatar">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={formState.fullName} />
                  ) : (
                    <span>{formState.fullName.charAt(0)}</span>
                  )}
                </div>
                <button
                  type="button"
                  className="xtg-profile-avatar-button"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  {t(`${MP}.changePhoto`)}
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarUpload}
                />
              </div>

              <div className="xtg-profile-identity-text">
                <h2 className="xtg-profile-name">{formState.fullName}</h2>

                <div className="xtg-profile-badges">
                  <span className="xtg-badge xtg-badge-primary">
                    {appRoleLabel}
                  </span>
                </div>

                <p className="xtg-profile-member-since">
                  {userRole === 'investigator'
                    ? t(`${MP}.memberSinceFriend`)
                    : t(`${MP}.memberSinceMember`)}{' '}
                  {memberSinceLabel}
                </p>
              </div>
            </div>
          </section>

          <XtgCard title={t(`${MP}.personalCardTitle`)}>
            <div>
              <p className="xtg-card-subtitle">
                {t(`${MP}.personalCardSubtitle`)}
              </p>

              <form onSubmit={handleSubmit} className="xtg-form">
                <label className="xtg-field">
                  <span className="xtg-field-label">{t(`${MP}.fullName`)}</span>
                  <input
                    type="text"
                    value={formState.fullName}
                    onChange={handleChange('fullName')}
                    className="xtg-input"
                  />
                </label>

                <label className="xtg-field">
                  <span className="xtg-field-label">{t(`${MP}.email`)}</span>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={handleChange('email')}
                    className="xtg-input"
                  />
                </label>

                <label className="xtg-field">
                  <span className="xtg-field-label">{t(`${MP}.phone`)}</span>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange('phone')}
                    className="xtg-input"
                  />
                </label>

                <label className="xtg-field">
                  <span className="xtg-field-label">{t(`${MP}.addressOptional`)}</span>
                  <input
                    type="text"
                    value={formState.address}
                    onChange={handleChange('address')}
                    className="xtg-input"
                  />
                </label>

                <button
                  type="submit"
                  className="xtg-button-primary xtg-button-full"
                  disabled={isSavingProfile}
                >
                  {isSavingProfile ? t(`${MP}.saving`) : t(`${MP}.saveProfile`)}
                </button>
                {showSavedMessage && (
                  <p className="xtg-form-message xtg-form-message-success">
                    {t(`${MP}.saved`)}
                  </p>
                )}
              </form>
            </div>
          </XtgCard>

          {userRole === 'member' && (
            <XtgCard title={t(`${MP}.memberLeadershipCardTitle`)}>
              <div>
                <p className="xtg-card-subtitle">
                  {t(`${MP}.memberLeadershipSubtitle`)}
                </p>

                <div className="xtg-profile-row">
                  <div>
                    <p className="xtg-profile-row-title">
                      {appRole === 'leader'
                        ? t(`${MP}.wardLeadershipActiveTitle`)
                        : t(`${MP}.wardLeadershipInactiveTitle`)}
                    </p>
                    <p className="xtg-profile-row-text">
                      {appRole === 'leader'
                        ? t(`${MP}.wardLeadershipActiveHelp`)
                        : t(`${MP}.wardLeadershipInactiveHelp`)}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="xtg-button-ghost"
                    onClick={() => {
                      if (appRole === 'leader') {
                        setRole('member');
                      } else {
                        setRole('leader');
                      }
                      navigate('/home');
                    }}
                  >
                    {appRole === 'leader'
                      ? t(`${MP}.exitLeadershipMode`)
                      : t(`${MP}.activateLeadershipMode`)}
                  </button>
                </div>
              </div>
            </XtgCard>
          )}

          <XtgCard title={t(`${MP}.settingsCardTitle`)}>
            <div>
              <p className="xtg-card-subtitle">
                {t(`${MP}.settingsCardSubtitle`)}
              </p>

              <div className="xtg-profile-row">
                <div>
                  <p className="xtg-profile-row-title">
                    {t(`${MP}.currentAppRoleTitle`)}
                  </p>
                  <p className="xtg-profile-row-text">
                    {t(`${MP}.currentAppRoleBody`, { role: settingsRoleSummary })}
                  </p>
                </div>
                <button
                  type="button"
                  className="xtg-button-ghost"
                  onClick={handleChangeActiveRole}
                >
                  {t(`${MP}.changeRole`)}
                </button>
              </div>

              <div className="xtg-profile-row">
                <div>
                  <p className="xtg-profile-row-title">
                    {t(`${MP}.preferredLanguageTitle`)}
                  </p>
                  <p className="xtg-profile-row-text">{langLabel}</p>
                </div>
                <button
                  type="button"
                  className="xtg-button-ghost"
                  onClick={handleChangeLanguage}
                >
                  {t(`${MP}.changeLanguageButton`)}
                </button>
              </div>
            </div>
          </XtgCard>

          <DataPrivacySection />

          <XtgCard title={t(`${MP}.privacySecurityTitle`)}>
            <div>
              <p className="xtg-card-subtitle">
                {t(`${MP}.privacySecuritySubtitle`)}
              </p>

              <div className="xtg-profile-links-row">
                <button
                  type="button"
                  className="xtg-link-button"
                  onClick={() => navigate('/privacy')}
                >
                  {t(`${MP}.linkPrivacy`)}
                </button>
                <span className="xtg-dot">•</span>
                <button
                  type="button"
                  className="xtg-link-button"
                  onClick={() => navigate('/terms')}
                >
                  {t(`${MP}.linkTerms`)}
                </button>
                <span className="xtg-dot">•</span>
                <button
                  type="button"
                  className="xtg-link-button"
                  onClick={() => navigate('/support')}
                >
                  {t(`${MP}.linkSupport`)}
                </button>
              </div>
            </div>
          </XtgCard>

          <section className="xtg-profile-logout-section">
            <button
              type="button"
              className="xtg-button-danger xtg-button-full"
              onClick={logout}
            >
              {t(`${MP}.logout`)}
            </button>
          </section>
        </div>
      </XtgPage>

      <LanguageSelectModal
        open={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        title={t('app.profile.language')}
        selectedLocale={locale}
        onSelect={handleLanguageSelect}
        cancelLabel={t('common.cancel')}
        closeAriaLabel={t('common.close')}
      />
    </div>
  );
};
